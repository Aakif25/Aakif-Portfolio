"""Build the portfolio hero from the supplied avatar intro.

Install: python -m pip install numpy Pillow opencv-python-headless imageio-ffmpeg
Run: python scripts/build-hero-assets.py --input /path/to/intro.mp4
A system ffmpeg may be selected with --ffmpeg. No video/audio retiming occurs.
"""
from pathlib import Path
import argparse, json, shutil, subprocess, tempfile, wave
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', required=True, type=Path)
    parser.add_argument('--ffmpeg', default=None)
    parser.add_argument('--crop', default='864:1080:528:0', help='width:height:x:y; manually reviewed full-body crop for supplied 1920x1080 source')
    parser.add_argument('--seconds', default=10.0, type=float)
    parser.add_argument('--portrait-time', default=8.0, type=float, help='Reviewed neutral expression with eyes open in the supplied clip')
    args = parser.parse_args()
    ffmpeg = args.ffmpeg or shutil.which('ffmpeg')
    if not ffmpeg:
        import imageio_ffmpeg
        ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    def run(*params):
        subprocess.run([ffmpeg, '-hide_banner', '-loglevel', 'error', '-y', *map(str, params)], check=True)
    cap = cv2.VideoCapture(str(args.input))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = min(args.seconds, cap.get(cv2.CAP_PROP_FRAME_COUNT) / fps)
    if duration < 1.5:
        raise ValueError('Need at least 1.5 seconds for a 0.5-second circular crossfade')
    fade = round(0.5 * fps) / fps
    duration = int(duration * fps) / fps
    crop = tuple(map(int, args.crop.split(':')))
    cw, ch, cx, cy = crop
    if cw <= 0 or ch <= 0 or cx < 0 or cy < 0 or cx + cw > cap.get(3) or cy + ch > cap.get(4):
        raise ValueError('Crop must stay inside the source frame')
    hero = ROOT / 'public' / 'hero'
    hero.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='hero-assets-') as temp:
        temp = Path(temp)
        pcm = temp / 'source.f32'
        run('-i', args.input, '-t', duration, '-vn', '-ar', 48000, '-ac', 2, '-f', 'f32le', pcm)
        audio = np.fromfile(pcm, dtype='<f4').reshape(-1, 2)
        total, overlap = round(duration * 48000), round(fade * 48000)
        audio = np.pad(audio, ((0, max(0, total-len(audio))), (0,0)))[:total]
        # Starts at source t=fade, then crossfades its tail into t=0..fade.
        # The following loop begins at t=fade again, contiguous in both streams.
        ramp = np.linspace(0, 1, overlap, endpoint=False, dtype=np.float32)[:, None]
        blended = audio[-overlap:] * (1-ramp) + audio[:overlap] * ramp
        loop_audio = np.concatenate((audio[overlap:-overlap], blended))
        wav = temp / 'loop.wav'
        with wave.open(str(wav), 'wb') as out:
            out.setnchannels(2); out.setsampwidth(2); out.setframerate(48000)
            out.writeframes((np.clip(loop_audio,-1,1)*32767).astype('<i2').tobytes())
        filt = (f'[0:v]trim=duration={duration},setpts=PTS-STARTPTS,crop={args.crop},'
                'scale=768:960:flags=lanczos,colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,'
                'hue=s=0,setsar=1,format=yuv420p,split=2[base][head];'
                f'[base]trim=start={fade},setpts=PTS-STARTPTS,fps={fps}[b];'
                f'[head]trim=end={fade},setpts=PTS-STARTPTS,fps={fps}[h];'
                f'[b][h]xfade=transition=fade:duration={fade}:offset={duration-2*fade},format=yuv420p[v]')
        shared = ['-i', args.input, '-i', wav, '-filter_complex', filt, '-map', '[v]', '-map', '1:a:0', '-t', duration-fade]
        run(*shared, '-c:v', 'libx264', '-crf', 24, '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', hero/'hero.mp4')
        run(*shared, '-c:v', 'libvpx-vp9', '-crf', 36, '-b:v', 0, '-row-mt', 1, '-deadline', 'good', '-cpu-used', 2, '-c:a', 'libopus', '-b:a', '80k', hero/'hero.webm')
    # Smaller sources reduce mobile transfer size without changing playback timing.
    run('-i', hero/'hero.mp4', '-vf', 'scale=480:600:flags=lanczos', '-c:v', 'libx264', '-crf', 24, '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-movflags', '+faststart', hero/'hero-mobile.mp4')
    run('-i', hero/'hero.webm', '-vf', 'scale=480:600:flags=lanczos', '-c:v', 'libvpx-vp9', '-crf', 36, '-b:v', 0, '-row-mt', 1, '-deadline', 'good', '-cpu-used', 2, '-c:a', 'copy', hero/'hero-mobile.webm')
    # This frame was selected from a contact sheet for open eyes and a neutral mouth.
    portrait_time = min(args.portrait_time, duration - 1/fps)
    cap.set(cv2.CAP_PROP_POS_MSEC, portrait_time*1000)
    ok, frame = cap.read()
    if not ok:
        raise RuntimeError('Cannot read portrait frame')
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = np.minimum(gray.astype(np.float32)/0.98,255).astype(np.uint8)
    original = Image.fromarray(gray).convert('RGB')
    # Head-to-shirt crop reviewed against supplied avatar; retains hair margin.
    portrait = original.crop((760,0,1160,500)).resize((480,600),Image.Resampling.LANCZOS)
    portrait.save(ROOT/'public'/'portrait-bust.webp', quality=90)
    poster = original.crop((cx,cy,cx+cw,cy+ch)).resize((768,960),Image.Resampling.LANCZOS)
    poster.save(hero/'poster.webp',quality=86)
    og = Image.new('RGB',(1200,630),'#f4f2ee')
    art = poster.resize((504,630),Image.Resampling.LANCZOS)
    # Multiply white backdrop into paper to match the website's compositing.
    art = Image.fromarray((np.asarray(art,dtype=np.float32)*np.array([244,242,238])/255).astype(np.uint8))
    og.paste(art,(696,0))
    draw=ImageDraw.Draw(og)
    fonts=Path('C:/Windows/Fonts')
    try:
        title=ImageFont.truetype(str(fonts/'arialbd.ttf'),68)
        body=ImageFont.truetype(str(fonts/'arial.ttf'),26)
        small=ImageFont.truetype(str(fonts/'consola.ttf'),20)
    except OSError:
        title=ImageFont.load_default(size=68);body=ImageFont.load_default(size=26);small=ImageFont.load_default(size=20)
    draw.text((68,72),'AA / PORTFOLIO',font=small,fill='#3a3a3a')
    draw.text((64,208),'Aakif\nAhamed.',font=title,fill='#0d0d0d',spacing=0)
    draw.text((68,400),'IT Undergraduate · Student Developer',font=body,fill='#3a3a3a')
    draw.text((68,442),'Aspiring Cybersecurity Professional',font=body,fill='#3a3a3a')
    draw.line((68,542,645,542),fill='#b8b7b3',width=1)
    draw.text((68,560),'SRI LANKA',font=small,fill='#3a3a3a')
    og.save(ROOT/'public'/'og.jpg',quality=92)
    cap.release()
    metadata={'source':args.input.name,'sourceDuration':duration,'fps':fps,'loopDuration':duration-fade,'crossfadeSeconds':fade,'crop':args.crop,'dimensions':[768,960],'portraitTimestamp':portrait_time,'audioSampleRate':48000,'audioSamples':len(loop_audio),'content':'Stylized animated avatar supplied by the user; portrait extracted from the same clip.','notes':'Circular crossfade removes a hard boundary; overlapping motion and words can be perceptible during the 0.5-second dissolve. No retiming.'}
    (hero/'metadata.json').write_text(json.dumps(metadata,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(metadata,indent=2))

if __name__ == '__main__':
    main()




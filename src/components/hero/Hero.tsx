"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE, COPY } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/hooks";
export default function Hero() {
  const video = useRef<HTMLVideoElement>(null);
  const section = useRef<HTMLElement>(null);
  const [sound, setSound] = useState(false);
  const [blocked, setBlocked] = useState(true);
  const [failed, setFailed] = useState(false);
  const visible = useRef(true);
  const wanted = useRef(false);
  const explicit = useRef(false);
  useEffect(() => {
    const v = video.current;
    if (!v || !section.current) return;
    let alive = true;
    const play = async (withSound: boolean) => {
      if (!visible.current || document.hidden) return;
      v.muted = !withSound;
      try {
        await v.play();
        if (alive) {
          setSound(!v.muted);
          setBlocked(v.muted);
          wanted.current = !v.muted;
        }
      } catch {
        v.muted = true;
        if (alive) setSound(false);
        try {
          await v.play();
        } catch {
          if (alive) setBlocked(true);
        }
      }
    };
    const start = () => {
      if (!prefersReducedMotion()) void play(true);
    };
    v.addEventListener("loadeddata", start, { once: true });
    if (v.readyState >= 2) start();
    const unlock = (e: Event) => {
      if (explicit.current || (e.target as HTMLElement)?.closest("button"))
        return;
      if (!visible.current) return;
      wanted.current = true;
      void play(true);
      removeEventListener("pointerdown", unlock);
      removeEventListener("keydown", unlock);
      removeEventListener("touchend", unlock);
    };
    addEventListener("pointerdown", unlock);
    addEventListener("keydown", unlock);
    addEventListener("touchend", unlock);
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio >= 0.35;
        if (visible.current && !document.hidden) {
          if (!prefersReducedMotion() || wanted.current)
            void play(wanted.current || (!explicit.current && !v.muted));
        } else {
          v.pause();
          setSound(false);
        }
      },
      { threshold: [0, 0.35, 1] },
    );
    io.observe(section.current);
    const visibility = () => {
      if (document.hidden) {
        v.pause();
        setSound(false);
      } else if (visible.current && !prefersReducedMotion())
        void play(wanted.current);
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      alive = false;
      io.disconnect();
      v.pause();
      v.removeEventListener("loadeddata", start);
      removeEventListener("pointerdown", unlock);
      removeEventListener("keydown", unlock);
      removeEventListener("touchend", unlock);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const toggle = async () => {
    const v = video.current;
    if (!v) return;
    explicit.current = true;
    wanted.current = !sound;
    v.muted = sound;
    if (wanted.current) {
      try {
        await v.play();
        setSound(true);
        setBlocked(false);
      } catch {
        setBlocked(true);
      }
    } else {
      setSound(false);
      setBlocked(false);
      if (prefersReducedMotion()) v.pause();
    }
  };
  return (
    <section id="top" tabIndex={-1} ref={section} className="hero">
      <div className="hero-ghost" aria-hidden>
        {PROFILE.firstName.toUpperCase()}
      </div>
      <div className="hero-media">
        {!failed ? (
          <video
            ref={video}
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero/poster.webp"
            aria-label="Aakif Ahamed’s animated introduction"
            onError={() => setFailed(true)}
          >
            <source src="/hero/hero-mobile.webm" media="(max-width:650px)" type="video/webm" />
            <source src="/hero/hero-mobile.mp4" media="(max-width:650px)" type="video/mp4" />
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
            <track
              kind="captions"
              src="/hero/captions.vtt"
              srcLang="en"
              label="English"
            />
          </video>
        ) : (
          <img src="/portrait-bust.webp" alt={PROFILE.portraitAlt} />
        )}
      </div>
      <div className="hero-content container">
        <div className="hero-title">
          <p className="mono hero-eyebrow">
            {PROFILE.location} <span aria-hidden>↗</span>
          </p>
          <h1>
            Aakif
            <br />
            <em>Ahamed</em>
          </h1>
          <p className="hero-subtitle">{COPY.heroSubtitle}</p>
          <div className="hero-actions">
            <a
              href="#work"
              className="button primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("work");
              }}
            >
              Explore work <span aria-hidden>↗</span>
            </a>
            <a
              href="#contact"
              className="hero-talk"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("contact");
              }}
            >
              Let’s talk <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
        <div className="hero-note">
          <span className="mono">{PROFILE.specialization}</span>
          <p>
            IT Undergraduate
            <br />
            {PROFILE.institution.replace(
              "Sri Lanka Institute of Information Technology (SLIIT)",
              "SLIIT",
            )}
          </p>
          <a className="resume-link" href={PROFILE.resume} download>
            Résumé <span aria-hidden>↓</span>
          </a>
        </div>
        <div className="hero-bottom">
          <span className="mono">{PROFILE.name}</span>
          <div className="hero-sound">
            <button
              className={`sound-button ${blocked ? "ping" : ""}`}
              onClick={toggle}
              aria-label={
                sound ? "Mute introduction" : "Play introduction with sound"
              }
              aria-pressed={sound}
            >
              <span aria-hidden>{sound ? "❚❚" : "▶"}</span>
            </button>
          </div>
          <span className="mono hero-bottom-right">
            {PROFILE.degree}
            <br />
            {PROFILE.specialization}
          </span>
        </div>
      </div>
      <style>{`.hero{position:relative;min-height:min(100svh,1120px);isolation:isolate;overflow:hidden}.hero-ghost{position:absolute;top:16%;left:50%;transform:translateX(-50%);font-weight:600;font-size:clamp(150px,25.6vw,490px);line-height:1;letter-spacing:-.075em;color:transparent;-webkit-text-stroke:1px #d9d6d0;white-space:nowrap;z-index:-2}.hero-media{position:absolute;height:min(96svh,1040px);aspect-ratio:768/960;left:50%;bottom:0;transform:translateX(-50%);mix-blend-mode:multiply;z-index:-1;pointer-events:none}.hero-media video{height:100%;width:100%;object-fit:contain}.hero-content{min-height:min(100svh,1120px);position:relative;display:flex;align-items:center;justify-content:space-between;padding-top:100px;padding-bottom:120px}.hero-title{width:37%;padding-top:70px}.hero-eyebrow{margin-bottom:27px;color:var(--mute);display:flex;gap:25px}.hero h1{font-size:clamp(58px,6.8vw,110px);letter-spacing:-.065em;line-height:.98;font-weight:600}.hero h1 em{font-family:var(--font-serif);font-weight:400;color:var(--mute);letter-spacing:-.045em;line-height:1.12}.hero-subtitle{font-size:14px;line-height:1.6;max-width:235px;color:var(--mute);margin-top:25px}.hero-actions{margin-top:32px;display:flex;align-items:center;gap:23px}.hero-talk{font-size:14px;white-space:nowrap}.hero-talk span{margin-left:7px}.hero-note{width:165px;align-self:center;margin-top:160px}.hero-note>.mono{font-size:9px}.hero-note p{font-size:18px;line-height:1.45;margin-top:16px}.resume-link{display:flex;justify-content:space-between;font-size:13px;margin-top:36px;padding-bottom:13px;border-bottom:1px solid var(--line)}.hero-bottom{position:absolute;bottom:32px;left:var(--gutter);right:var(--gutter);display:flex;align-items:end;justify-content:space-between}.hero-bottom>.mono{font-size:9px;color:var(--mute)}.hero-bottom-right{text-align:right;line-height:1.7}.hero-sound{position:absolute;left:50%;bottom:14px;transform:translateX(-50%)}.sound-button{width:46px;height:46px;border-radius:50%;background:var(--ink);color:white;display:grid;place-items:center;position:relative;font-size:13px}.ping::after{content:'';position:absolute;inset:-6px;border:1px solid #7776;border-radius:50%;animation:sound-ping 2.5s infinite}@keyframes sound-ping{0%,100%{opacity:.2;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}@media(min-width:1600px){.hero-title{padding-top:100px}.hero-note{margin-right:40px}}@media(max-width:1050px){.hero h1{font-size:72px}.hero-title{width:42%}.hero-note{width:130px}.hero-actions{gap:15px}.hero-actions .button{padding:14px 18px}.hero-media{left:57%;height:83svh}.hero-ghost{top:21%}.hero-note{display:none}}@media(max-width:650px){.hero{min-height:920px;min-height:110svh}.hero-content{min-height:920px;min-height:110svh;align-items:flex-start;padding-top:125px;padding-bottom:60px}.hero-title{padding-top:0;width:100%;position:relative;z-index:1}.hero h1{font-size:clamp(59px,16.2vw,82px)}.hero-eyebrow{margin-bottom:20px;font-size:9px}.hero-subtitle{max-width:230px;margin-top:16px;font-size:13px}.hero-actions{margin-top:23px;gap:24px}.hero-media{height:62svh;left:61%;bottom:34px;max-height:630px;min-height:420px}.hero-ghost{font-size:31vw;top:auto;bottom:38%;left:48%}.hero-bottom{bottom:24px}.hero-bottom-right{display:none}.hero-bottom>.mono{font-size:9px}.hero-sound{left:auto;right:10px;bottom:36px;transform:none}.hero-content .hero-title{pointer-events:none}.hero-title a{pointer-events:auto}}@media(max-width:650px) and (max-height:730px){.hero,.hero-content{min-height:850px}.hero-media{height:470px}}`}</style>
    </section>
  );
}

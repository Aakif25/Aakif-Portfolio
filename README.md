# Aakif Ahamed · Portfolio

A light, monochrome portfolio built with Next.js 15, React 19, TypeScript, Tailwind CSS 4, and Lenis. The supplied animated avatar is the hero visual. All biographical content is in `src/lib/data.ts`.

## Run locally

Requires Node.js 20.9 or newer (Node.js 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000. To verify and produce the static deployment:

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

The production site is generated into `out/`. The automatic postbuild step discovers emitted font URLs and adds any missing preload links (a Windows Next.js 15 manifest workaround). Serve that directory with any static web server; `npm start` runs the included static preview server. All fonts, images, logos, video, and scripts are self-hosted. No external runtime services or tracking are used.

## Sections

| Section | Component | Interaction |
| --- | --- | --- |
| Hero | `hero/Hero.tsx` | Captioned avatar loop, sound toggle, visibility pause, résumé download |
| About | `sections/About.tsx` | Spring-damped hanging ID card; hover, tap, Enter and Space flip |
| Skills | `sections/Skills.tsx` | 13 user-selected skills in five editorial rows with local logos and restrained hover motion |
| Work | `sections/Work.tsx` | Nine expanding project panels; vertical mobile accordion; labelled illustrative UIs |
| Completed courses | `sections/Certifications.tsx` | Two University of Moratuwa courses, ink-fill focus/hover |
| Experience | `sections/Experience.tsx` | Education by year; undated freelance experience grouped separately; scroll-drawn path |
| Achievements | `sections/Achievements.tsx` | Pinned horizontal gallery with counters for documented model metrics and user-supplied CGPA |
| Contact | `sections/Contact.tsx` | Email, clipboard action, telephone, letter hover, back to top |

## Content provenance

- `public/resume.pdf` is a byte-for-byte copy of the newly supplied `AAKIF AHAMED.pdf`, used by every résumé download. Existing biography and project content remain based on the original résumé; the download replacement does not rewrite them.
- The résumé’s only embedded hyperlink is its email address. GitHub, LinkedIn, repository URLs and certificate URLs are absent, so no such links were invented.
- User-supplied additions: graduation year **2029**, CGPA **3.4**, student ID **IT25103780**. No CGPA denominator is assumed.
- Courses are labelled **Completed courses**, not represented as issued certifications.
- **98.56% test accuracy** and **98.53% Macro F1** apply only to the best-performing ObesiSense AI SVM model on the project’s test data. No clinical accuracy claim is made.
- Freelance roles have no dated chronology in the source. They appear after the dated education path with their original project-based/ongoing status.
- UI headings, controls and illustration labels are presentation copy requested in the brief; illustrations are not actual screenshots. Illustrative bars are decorative and do not represent additional measured results.
- No testimonials, employers, repositories, clients, platform ranks or awards were fabricated.

## Rebuild the hero

```sh
python -m pip install -r scripts/requirements.txt
python scripts/build-hero-assets.py --input "/path/to/intro.mp4"
```

The original source is a 1920×1080, 24 fps, 10-second animated avatar with 48 kHz stereo audio. The reviewed crop `864:1080:528:0` retains the entire body. The output is 768×960. Use `--crop width:height:x:y` to adjust for a different source, and `--portrait-time 8` to select the portrait frame. The script checks crop boundaries.

Processing normalizes near-white pixels, converts the illustration to grayscale, and rotates the source by 0.5 seconds to make a circular crossfade. The last 0.5 seconds blends into the first 0.5 seconds using FFmpeg `xfade`. Audio uses a matching sample-accurate NumPy crossfade at 48 kHz; no `acrossfade`, stretch or retiming is used. Final length is **9.5 seconds**. Outputs:

- `public/hero/hero.mp4`: H.264, CRF 24, slow, yuv420p, AAC 96 kbps, faststart.
- `public/hero/hero.webm`: VP9, CRF 36, Opus 80 kbps.
- `public/hero/hero-mobile.mp4` and `hero-mobile.webm`: 480×600 versions with the same duration/frame rate and original audio, selected by a source media query on phones.
- `public/hero/poster.webp`, `public/portrait-bust.webp` (480×600), `public/og.jpg` (1200×630).
- `public/hero/metadata.json`: frame, crop and encoding metadata.

`public/hero/captions.vtt` is transcribed from the exported loop and timed to it. If you replace the video, re-transcribe the captions. A picture/audio dissolve softens the loop boundary; continuous speech and pose changes can still make the overlap perceptible. A source with silent, matching start/end poses would produce a cleaner loop.

Browsers control audible autoplay. The page attempts sound, falls back to muted playback, and unlocks audio after a visitor gesture. The icon-only sound control explicitly overrides that choice. Playback pauses below 35% hero visibility or when the tab is hidden. Reduced-motion users see the poster until they explicitly play the introduction.

## Accessibility and motion

Semantic sections, one h1, visible keyboard focus, menu focus containment, Escape dismissal, scroll locking, live clipboard feedback, English video captions, native links and labelled controls. Reduced motion disables Lenis, automatic video playback, decorative movement and gallery pinning. No GSAP, 3D library, WebGL, analytics, CDN images or external runtime scripts are included. The card’s flip uses CSS transforms only.

## Assets and licences

- **Inter Tight**, **Instrument Serif** (regular and italic), **JetBrains Mono** are bundled from Fontsource and loaded with `next/font/local`. Their SIL Open Font License files are alongside the fonts in `src/fonts/`.
- Microsoft Word, PowerPoint and Excel marks come from Simple Icons 11.15.0 (CC0; `public/logos/LICENSE-simple-icons.md`), shown in their brand colours.
- Official-colour technology SVGs are copied from [Devicon](https://github.com/devicons/devicon), licensed under MIT; full licence at `public/logos/LICENSE-devicon.txt`. Brand names and logos remain the property of their respective owners and imply no endorsement. No logo is fetched at runtime.
- Concept icons are original thin-line SVGs. Avatar/video and résumé are user-supplied; derived images preserve those source rights.
- Lenis is MIT-licensed; Next.js and React are MIT-licensed. Package licences remain in their distributions.

## Deployment

`out/` can be hosted on a static host. `.openai/hosting.json` records the private Sites deployment for this project. Change the metadata base URL in `src/app/layout.tsx` when moving to another domain. The source contains no authentication credentials.

The lockfile pins the tested dependency tree. PostCSS is overridden to the patched 8.5.29-compatible line while preserving the requested Next.js 15 stack. Production dependency audit is clean. The Next.js ESLint development dependency currently inherits a `braces` advisory without a patched upstream release; it is not shipped in the static site. Do not run lint against untrusted glob patterns.

## Verification

See `QA.md` for the final build, browser and Lighthouse results and any limitations.

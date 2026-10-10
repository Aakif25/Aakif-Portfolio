"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";
export default function About() {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const card = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);
  const previous = useRef<number | null>(null);
  useEffect(() => {
    const el = card.current;
    if (!el) return;
    let frame = 0,
      angle = 0,
      last = 0;
    let visible = false;
    const tick = (time: number) => {
      if (!visible || prefersReducedMotion()) { frame = 0; return; }
      const dt = Math.min((time - last) / 16.67, 2) || 1;
      last = time;
      if (visible && !prefersReducedMotion()) {
        velocity.current +=
          (-angle * 0.018 + Math.sin(time / 1600) * 0.004) * dt;
        velocity.current *= Math.pow(0.94, dt);
        angle += velocity.current * dt;
        el.style.transform = `rotate(${Math.max(-12, Math.min(12, angle))}deg)`;
      }
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
      if (!visible) { cancelAnimationFrame(frame); frame = 0; }
    }, {rootMargin:'100px'});
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);
  const facts = [
    ["Location", PROFILE.location],
    ["Education", "BSc (Hons) · Cyber Security"],
    ["Current work", "Freelance development & design"],
    ["Email", PROFILE.email],
  ];
  return (
    <section className="section container about" id="about" tabIndex={-1}>
      <SectionHeading id="about" />
      <div className="about-grid">
        <div className="about-story rv">
          <p className="body-copy">{PROFILE.resumeSummary}</p>
          <p className="about-extra">
            {PROFILE.studyStatus} · {PROFILE.institution}
          </p>
          <a href={PROFILE.resume} download className="button small">
            Résumé <span aria-hidden>↓</span>
          </a>
        </div>
        <div
          className="id-stage rv"
          onPointerMove={(e) => {
            if (e.pointerType === "mouse" && previous.current !== null)
              velocity.current += (e.clientX - previous.current) * 0.015;
            previous.current = e.clientX;
          }}
          onPointerLeave={() => (previous.current = null)}
        >
          <div className="lanyard">
            <div className="strap">
              <span>
                {PROFILE.name} · {PROFILE.heroRole} · {PROFILE.name} ·{" "}
                {PROFILE.heroRole}
              </span>
            </div>
            <div className="metal-clip" />
          </div>
          <div className="id-swing" ref={card}>
            <button
              className="id-flip"
              aria-label={`${flipped ? "Show front of" : "Flip"} developer ID card`}
              aria-pressed={flipped}
              onClick={() => setFlipped(!flipped)}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovered(true);
              }}
              onPointerLeave={() => setHovered(false)}
            >
              <div
                className={`id-rotator ${flipped || hovered ? "flipped" : ""}`}
              >
                <div
                  className="id-face id-front"
                  aria-hidden={flipped || hovered}
                >
                  <div className="id-band mono">
                    Developer ID <span>{PROFILE.initials}</span>
                  </div>
                  <div className="id-photo">
                    <img
                      src="/portrait-bust.webp"
                      alt={PROFILE.portraitAlt}
                      width="128"
                      height="156"
                      loading="lazy"
                    />
                  </div>
                  <h3>{PROFILE.name}</h3>
                  <p className="id-role">{PROFILE.heroRole}</p>
                  <dl>
                    <div>
                      <dt>ID No.</dt>
                      <dd>{PROFILE.studentId}</dd>
                    </div>
                    <div>
                      <dt>Dept.</dt>
                      <dd>{PROFILE.specialization}</dd>
                    </div>
                    <div>
                      <dt>Valid till</dt>
                      <dd>{PROFILE.graduationYear}</dd>
                    </div>
                  </dl>
                  <div className="id-bottom">
                    <svg viewBox="0 0 130 26" className="barcode" aria-hidden>
                      {Array.from({ length: 38 }, (_, i) => (
                        <rect
                          key={i}
                          x={i * 3.4}
                          width={i % 3 === 0 ? 2.5 : 1}
                          height="26"
                        />
                      ))}
                    </svg>
                    <span className="id-sticker" aria-hidden>
                      AA
                    </span>
                  </div>
                </div>
                <div
                  className="id-face id-back"
                  aria-hidden={!(flipped || hovered)}
                >
                  <span className="mono">What I am</span>
                  <h3>
                    Developer.
                    <br />
                    <em>Always learning.</em>
                  </h3>
                  <ul>
                    <li>{PROFILE.role}</li>
                    <li>
                      {PROFILE.degree} · CGPA {PROFILE.cgpa}
                    </li>
                    <li>
                      {PROFILE.specialization} · {PROFILE.institution}
                    </li>
                  </ul>
                  <div className="id-signature">{PROFILE.name}</div>
                  <p>
                    If found, say hello ·<br />
                    {PROFILE.email}
                  </p>
                </div>
              </div>
            </button>
          </div>
          <span className="id-hint mono">Hover or tap to flip ↻</span>
        </div>
        <div className="quick-facts rv">
          <h3 className="mono">Quick facts</h3>
          <dl>
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="mono">{label}</dt>
                <dd>
                  {label === "Email" ? (
                    <a href={`mailto:${value}`}>{value}</a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <blockquote>{PROFILE.quote}</blockquote>
        </div>
      </div>
      <style>{`.about{border-top:1px solid var(--line)}.about>.section-header{margin-bottom:54px}.about-grid{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:clamp(28px,4.5vw,72px);align-items:stretch}.about-story .body-copy{font-size:16px;line-height:1.7}.about-extra{font-size:12px;line-height:1.6;color:var(--mute);margin:22px 0}.id-stage{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:58px;margin-top:-72px}.lanyard{position:absolute;top:0;left:50%;transform:translateX(-50%);z-index:2}.strap{height:56px;width:30px;background:#252525;overflow:hidden;color:#ccc}.strap span{display:block;writing-mode:vertical-rl;white-space:nowrap;font-size:7px;letter-spacing:1px;margin:auto;animation:strap-drift 14s linear infinite}.metal-clip{width:23px;height:30px;background:#b7b7b7;border:3px solid #e0e0e0;border-radius:6px;margin:-4px auto 0;box-shadow:0 2px 3px #0003}.id-swing{width:300px;height:412px;transform-origin:50% -30px}.id-flip{display:block;padding:0;width:100%;height:100%;text-align:left;perspective:1100px;border-radius:22px}.id-rotator{position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform .8s var(--ease)}.id-rotator.flipped{transform:rotateY(180deg)}.id-face{position:absolute;inset:0;border-radius:22px;overflow:hidden;background:white;backface-visibility:hidden;box-shadow:0 22px 48px #0000000d,inset 0 0 0 1px #00000017}.id-band{background:var(--ink);color:white;padding:16px 22px;display:flex;justify-content:space-between;font-size:9px}.id-photo{width:128px;height:156px;border:5px solid #e8e8e8;outline:1px solid #c4c4c4;border-radius:15px;margin:20px auto 13px;overflow:hidden;box-shadow:0 0 28px #00000008}.id-photo img{object-fit:cover;width:100%;height:100%;transition:transform .8s}.id-flip:hover img{transform:scale(1.07)}.id-front h3{text-align:center;font-size:20px;letter-spacing:-.04em}.id-role{text-align:center;font-size:11px;color:var(--mute);margin-top:3px}.id-front dl{margin:17px 25px 0;display:grid;gap:6px;font-family:var(--font-mono);font-size:8px}.id-front dl div{display:flex;justify-content:space-between}.id-front dt{color:var(--mute)}.id-front dd{margin:0}.id-bottom{display:flex;justify-content:space-between;align-items:center;margin:16px 25px}.barcode{width:125px;height:23px}.id-sticker{height:29px;width:29px;display:grid;place-items:center;border-radius:50%;background:#d3d3d3;border:3px double #999;color:#666;font-size:9px}.id-back{transform:rotateY(180deg);padding:28px}.id-back h3{font-size:26px;letter-spacing:-.04em;margin-top:16px;line-height:1.15}.id-back h3 em{font-family:var(--font-serif);font-weight:400;color:var(--mute)}.id-back ul{padding-left:14px;font-size:11px;line-height:1.5;display:grid;gap:10px;margin-top:20px}.id-signature{font-family:var(--font-serif);font-style:italic;font-size:26px;margin-top:16px}.id-back>p{font-size:9px;color:var(--mute);line-height:1.7;border-top:1px solid var(--line);padding-top:12px;margin-top:8px}.id-hint{font-size:8px;color:var(--mute);margin-top:29px}.quick-facts>h3{margin-bottom:19px;font-size:10px}.quick-facts dl{margin:0}.quick-facts dl>div{padding:17px 0;border-bottom:1px solid var(--line)}.quick-facts dt{font-size:9px;color:var(--mute);margin-bottom:8px}.quick-facts dd{margin:0;font-size:15px;line-height:1.4;overflow-wrap:anywhere}.quick-facts blockquote{margin:28px 0 0;font-size:27px;line-height:1.15;letter-spacing:-.02em;font-family:var(--font-serif);font-style:italic;color:var(--mute)}@keyframes strap-drift{to{transform:translateY(-50%)}}@media(max-width:1050px){.about-grid{grid-template-columns:1fr 320px;gap:40px}.quick-facts{grid-column:1/-1;display:grid;grid-template-columns:1fr 2fr;gap:0 50px}.quick-facts dl{grid-column:2;grid-row:1/3}.quick-facts blockquote{grid-column:1;grid-row:2}}@media(max-width:700px){.about-grid{grid-template-columns:1fr;gap:55px}.id-stage{margin:0;padding-top:70px}.quick-facts{grid-column:auto;display:block}.about>.section-header{margin-bottom:30px}.about-story .body-copy{font-size:16px}.quick-facts dl>div{display:grid;grid-template-columns:100px 1fr;gap:15px}.quick-facts blockquote{font-size:31px;max-width:290px}}`}</style>
    </section>
  );
}

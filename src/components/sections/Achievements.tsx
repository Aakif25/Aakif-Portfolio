"use client";
import { useEffect, useRef } from "react";
import { ACHIEVEMENTS, type Achievement } from "@/lib/data";
import {
  useInView,
  useReducedMotion,
  useScrollProgress,
  prefersReducedMotion,
} from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import TechLogo from "../ui/TechLogo";
function Metric({ item, index }: { item: Achievement; index: number }) {
  const { ref, inView } = useInView<HTMLElement>(0.65);
  const number = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!inView || !number.current) return;
    let frame = 0;
    const start = performance.now();
    if (reduced) {
      number.current.textContent = item.value.toFixed(item.decimals);
      return;
    }
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1400);
      if (number.current)
        number.current.textContent = (
          item.value *
          (1 - Math.pow(1 - progress, 4))
        ).toFixed(item.decimals);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, item.value, item.decimals, reduced]);
  return (
    <article className="achievement-card card" ref={ref}>
      <div className="metric-top">
        <span className="metric-logo">
          {item.logo ? (
            <TechLogo name={item.logo} size={43} />
          ) : (
            <span className="degree-mark" aria-hidden>
              ∑
            </span>
          )}
        </span>
        <span className="mono muted">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(ACHIEVEMENTS.length).padStart(2, "0")}
        </span>
      </div>
      <div className="metric-bottom">
        <div>
          <p className="mono muted">{item.caption}</p>
          <h3>{item.label}</h3>
          <p className="metric-detail">{item.detail}</p>
        </div>
        <p className="metric-value">
          <span className="sr-only">{item.value}{item.suffix}</span>
          <span ref={number} aria-hidden>
            {item.value.toFixed(item.decimals)}
          </span>
          <small aria-hidden>{item.suffix}</small>
        </p>
      </div>
    </article>
  );
}
export default function Achievements() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const travel = useRef(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const measure = () => {
      if (!section.current || !track.current) return;
      travel.current = Math.max(
        0,
        track.current.scrollWidth - track.current.parentElement!.clientWidth,
      );
      section.current.style.height = reduced
        ? "auto"
        : `${innerHeight + travel.current}px`;
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      removeEventListener("resize", measure);
    };
  }, [reduced]);
  useScrollProgress(() => {
    if (!section.current || !track.current) return;
    const y = section.current.getBoundingClientRect().top;
    const p = travel.current
      ? Math.min(1, Math.max(0, -y / travel.current))
      : 0;
    track.current.style.transform = prefersReducedMotion()
      ? "none"
      : `translateX(${-p * travel.current}px)`;
    if (progress.current) progress.current.style.transform = `scaleX(${p})`;
    track.current
      .querySelectorAll<HTMLElement>(".achievement-card")
      .forEach((card) => {
        const b = card.getBoundingClientRect();
        card.classList.toggle(
          "central",
          Math.abs(b.left + b.width / 2 - innerWidth / 2) < b.width * 0.7,
        );
      });
  });
  return (
    <section
      className="achievements"
      id="achievements"
      tabIndex={-1}
      ref={section}
    >
      <div className="achievements-sticky">
        <div className="container">
          <div className="achievement-heading">
            <SectionHeading id="achievements" />
            <div className="achievement-progress" aria-hidden>
              <div ref={progress} />
            </div>
          </div>
          <div className="achievement-viewport">
            <div className="achievement-track" ref={track}>
              {ACHIEVEMENTS.map((a, i) => (
                <Metric key={a.label} item={a} index={i} />
              ))}
              <div className="and-counting">
                and
                <br />
                <em>counting</em>
                <span aria-hidden>↗</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.achievements{position:relative;border-block:1px solid var(--line)}.achievements-sticky{position:sticky;top:0;height:100svh;min-height:650px;display:flex;align-items:center;overflow:hidden}.achievement-heading{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:55px}.achievement-heading .section-heading{font-size:clamp(44px,5vw,72px)}.achievement-progress{width:150px;height:2px;background:var(--line);margin-bottom:12px}.achievement-progress>div{height:100%;background:var(--ink);transform:scaleX(0);transform-origin:left}.achievement-viewport{overflow:visible}.achievement-track{display:flex;gap:20px;width:100%;will-change:transform}.achievement-card{flex:0 0 clamp(340px,40vw,540px);height:clamp(280px,36vh,310px);padding:28px;transition:transform .6s var(--ease),box-shadow .6s;box-shadow:inset 0 0 0 1px #00000007}.achievement-card.central{transform:translateY(-12px);box-shadow:0 22px 50px #00000008,inset 0 0 0 1px #00000006}.metric-top{display:flex;align-items:center;justify-content:space-between}.metric-top>.mono{font-size:9px}.metric-logo{width:65px;height:65px;display:grid;place-items:center;background:#f8f8f6;border-radius:17px}.degree-mark{font-family:var(--font-serif);font-size:42px}.metric-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-top:34px}.metric-bottom .mono{font-size:7px;max-width:210px;line-height:1.6}.metric-bottom h3{font-size:23px;letter-spacing:-.035em;font-weight:500;margin-top:7px}.metric-detail{font-size:10px;line-height:1.5;color:var(--mute);margin-top:8px;max-width:185px}.metric-value{font-size:clamp(40px,4.5vw,68px);line-height:1;letter-spacing:-.065em;white-space:nowrap}.metric-value small{font-size:.37em;letter-spacing:-.02em}.and-counting{flex:0 0 260px;display:flex;flex-direction:column;justify-content:center;font-size:57px;letter-spacing:-.04em;padding-left:30px;line-height:1.1}.and-counting em{font-family:var(--font-serif);font-weight:400;color:var(--mute)}.and-counting>span{margin-top:20px;font-size:35px}@media(max-width:650px){.achievements-sticky{min-height:640px}.achievement-heading{margin-bottom:43px}.achievement-progress{width:45px;margin-left:15px}.achievement-card{padding:25px;flex-basis:340px;height:285px}.metric-value{font-size:45px}.metric-bottom h3{font-size:22px}.metric-bottom{gap:10px}.metric-detail{max-width:145px;font-size:9px}.metric-logo{width:60px;height:60px}.metric-bottom .mono{max-width:160px}.and-counting{flex-basis:230px}}@media(prefers-reduced-motion:reduce){.achievements{height:auto!important;padding-block:96px}.achievements-sticky{position:relative;height:auto;min-height:0;overflow:visible}.achievement-track{flex-wrap:wrap;transform:none!important;will-change:auto}.achievement-card{flex:1 1 340px;max-width:100%;transform:none!important}.achievement-progress{display:none}.and-counting{font-size:38px;padding:20px 0}}`}</style>
    </section>
  );
}

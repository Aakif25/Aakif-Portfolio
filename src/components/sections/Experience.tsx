"use client";
import { useRef } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { useScrollProgress, prefersReducedMotion } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";
export default function Experience() {
  const section = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const path = useRef<HTMLDivElement>(null);
  useScrollProgress(() => {
    if (!path.current || !line.current) return;
    const rect = path.current.getBoundingClientRect();
    const progress = prefersReducedMotion()
      ? 1
      : Math.min(1, Math.max(0, (innerHeight * 0.65 - rect.top) / rect.height));
    line.current.style.transform = `scaleY(${progress})`;
    path.current
      .querySelectorAll<HTMLElement>(".path-stop")
      .forEach((el) =>
        el.classList.toggle(
          "reached",
          prefersReducedMotion() ||
            el.getBoundingClientRect().top < innerHeight * 0.65,
        ),
      );
  });
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section container experience"
      ref={section}
    >
      <div className="experience-heading">
        <SectionHeading id="experience" />
      </div>
      <div className="timeline" ref={path}>
        <div className="timeline-track">
          <div ref={line} />
        </div>
        {EDUCATION.map((entry, i) => (
          <article className="path-stop rv" key={entry.title}>
            <span className="path-dot" aria-hidden />
            <p className="mono path-date">{entry.date}</p>
            <h3>{entry.title}</h3>
            <p className="path-place">{entry.place}</p>
            <ul>
              {entry.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            {i === 2 && <span className="pill">Ongoing</span>}
          </article>
        ))}
        <div className="path-group-label mono rv">
          Project-based experience · Dates not specified
        </div>
        {EXPERIENCE.map((entry) => (
          <article className="path-stop rv" key={entry.title}>
            <span className="path-dot" aria-hidden />
            <p className="mono path-date">{entry.date}</p>
            <h3>{entry.title}</h3>
            <p className="path-place">{entry.place}</p>
            <ul>
              {entry.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <div className="path-tech">
              {entry.tech?.map((t) => (
                <span className="pill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
        <a className="next-stop rv" href="#contact">
          <span className="mono muted">Next</span>
          <span>Your team?</span>
          <span aria-hidden>↗</span>
        </a>
      </div>
      <style>{`.experience{display:grid;grid-template-columns:1fr 1.25fr;gap:90px}.experience-heading{position:sticky;top:115px;align-self:start}.timeline{position:relative;padding-left:40px}.timeline-track{position:absolute;top:7px;bottom:0;left:5px;width:1px;background:var(--line)}.timeline-track>div{height:100%;background:var(--ink);transform:scaleY(0);transform-origin:top}.path-stop{position:relative;padding:0 0 48px}.path-dot{position:absolute;left:-39px;top:5px;width:9px;height:9px;background:var(--paper);border:1px solid #aaa;border-radius:50%;transition:background .4s,box-shadow .4s}.reached .path-dot{background:var(--ink);border-color:var(--ink);box-shadow:0 0 0 5px var(--paper)}.path-date{font-size:9px;color:var(--mute);margin-bottom:15px}.path-stop h3{font-size:29px;line-height:1.15;letter-spacing:-.035em;font-weight:500}.path-place{font-size:14px;color:var(--mute);margin-top:10px;line-height:1.5}.path-stop ul{font-size:13px;line-height:1.7;color:var(--ink-2);padding-left:16px;margin:18px 0}.path-stop li+li{margin-top:5px}.path-stop>.pill{font-size:9px;display:inline-block}.path-tech{display:flex;flex-wrap:wrap;gap:5px}.path-tech .pill{font-size:9px;padding:5px 9px}.path-group-label{padding:5px 0 40px;font-size:9px;color:var(--mute);line-height:1.5}.next-stop{display:flex;align-items:center;gap:23px;border:1px dashed #aaa;border-radius:20px;padding:30px}.next-stop>span:nth-child(2){font-size:24px;letter-spacing:-.035em}.next-stop>span:last-child{margin-left:auto;font-size:24px}.next-stop:hover{background:white}@media(max-width:800px){.experience{grid-template-columns:1fr;gap:50px}.experience-heading{position:static}.timeline{padding-left:32px}.path-dot{left:-31px}.path-stop h3{font-size:26px}.path-stop{padding-bottom:40px}.next-stop{padding:25px 18px;gap:17px}}`}</style>
    </section>
  );
}

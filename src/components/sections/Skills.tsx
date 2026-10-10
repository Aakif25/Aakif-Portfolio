import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import TechLogo from "../ui/TechLogo";

export default function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="section container skills">
      <SectionHeading id="skills" />
      <div className="skill-collection">
        {SKILL_GROUPS.map((group, index) => (
          <div className="skill-row rv" key={group.family} style={{ "--i": index } as CSSProperties}>
            <h3 className="skill-category">{group.family}</h3>
            <ul className="skill-list" aria-label={group.family}>
              {group.skills.map((name) => (
                <li className="skill-item" key={name}>
                  <span className="skill-mark" aria-hidden="true"><TechLogo name={name} size={34} /></span>
                  <span className="skill-name">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <style>{`
        .skills > .section-header { margin-bottom: 64px; }
        .skill-collection { border-top: 1px solid var(--line); }
        .skill-row { display: grid; grid-template-columns: minmax(180px, .8fr) minmax(0, 2fr); gap: 45px; align-items: center; padding: 31px 0; border-bottom: 1px solid var(--line); }
        .skill-category { font-size: clamp(20px, 2.2vw, 29px); font-weight: 500; letter-spacing: -.035em; line-height: 1.2; }
        .skill-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 22px; }
        .skill-item { min-width: 0; display: flex; align-items: center; gap: 13px; }
        .skill-mark { width: 58px; height: 58px; flex-shrink: 0; display: grid; place-items: center; border-radius: 17px; background: var(--card); box-shadow: inset 0 0 0 1px rgba(13,13,13,.045); transition: transform .5s var(--ease), box-shadow .5s var(--ease); }
        .skill-name { font-size: 14px; font-weight: 500; line-height: 1.4; letter-spacing: -.01em; }
        @media (hover:hover) { .skill-item:hover .skill-mark { transform: translateY(-4px); box-shadow: 0 10px 25px #00000008, inset 0 0 0 1px var(--line); } }
        @media (max-width:1100px) { .skill-row { grid-template-columns: 190px minmax(0,1fr); gap:25px; }.skill-list { gap:16px; }.skill-item { flex-direction:column; align-items:flex-start; gap:12px; }.skill-name { font-size:13px; } }
        @media (max-width:650px) { .skills > .section-header { margin-bottom:42px; }.skill-row { grid-template-columns:1fr; gap:26px; padding:29px 0 32px; }.skill-category { font-size:23px; }.skill-list { grid-template-columns:repeat(2,minmax(0,1fr)); gap:24px 18px; }.skill-item { flex-direction:row; align-items:center; gap:12px; }.skill-mark { width:49px; height:49px; border-radius:14px; }.skill-mark img { width:29px!important; height:29px!important; }.skill-name { font-size:13px; } }
        @media (prefers-reduced-motion:reduce) { .skill-mark { transition:none; }.skill-item:hover .skill-mark { transform:none; } }
      `}</style>
    </section>
  );
}

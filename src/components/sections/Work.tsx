"use client";
import { useEffect, useState } from "react";
import { PROJECTS, type Project } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
import TechLogo from "../ui/TechLogo";
function ProjectIllustration({ project }: { project: Project }) {
  const i = Number(project.index);
  return (
    <figure className={`project-illustration illustration-${i}`}>
      <div className="mini-window">
        <div className="mini-toolbar">
          <span />
          <span />
          <span />
          <span className="mini-window-name">{project.title}</span>
        </div>
        <div className="mini-body">
          {i === 7 ? (
            <>
              <div className="mini-model" aria-hidden>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <span className="mono">Support Vector Machines</span>
              <div className="mini-stat">
                98.56<small>%</small>
              </div>
              <span className="mini-description">
                Test accuracy · project test data
              </span>
              <div className="mini-data-bars" aria-hidden>
                {[44, 62, 39, 84, 55, 71, 95].map((h, j) => (
                  <i key={j} style={{ height: h }} />
                ))}
              </div>
            </>
          ) : i === 8 ? (
            <>
              <div className="bin-diagram" aria-hidden>
                <div>
                  <span />
                  <span />
                </div>
                <div />
                <div />
              </div>
              <div className="mini-labels">
                <span>Wet waste</span>
                <span>Dry waste</span>
              </div>
              <p className="mono">Sensor integration</p>
            </>
          ) : i === 9 ? (
            <>
              <div className="design-art" aria-hidden>
                <div>Aa</div>
                <div />
                <div />
                <div />
              </div>
              <p className="mono">Logo design · Branding</p>
            </>
          ) : (
            <>
              <p className="mono mini-eyebrow">
                {project.kicker.split(" | ")[0]}
              </p>
              <div className="mini-app-heading">
                {project.title.replace(" System", "").replace(" Software", "")}
              </div>
              <div className="mini-app-grid" aria-hidden>
                <div />
                <div />
                <div />
              </div>
              <div className="mini-lines" aria-hidden>
                {[0, 1, 2, 3].map((x) => (
                  <div key={x}>
                    <i />
                    <span />
                    <b />
                  </div>
                ))}
              </div>
              <div className="mini-chip-row">
                {project.features.slice(0, 2).map((_, j) => (
                  <span key={j} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <figcaption className="mono">
        Illustrative UI · not a product screenshot
      </figcaption>
    </figure>
  );
}
export default function Work() {
  const [active, setActive] = useState(6);
  useEffect(() => {
    const fromHash = () => {
      const i = PROJECTS.findIndex((p) => `#${p.id}` === location.hash);
      if (i >= 0) setActive(i);
    };
    fromHash();
    addEventListener("hashchange", fromHash);
    return () => removeEventListener("hashchange", fromHash);
  }, []);
  return (
    <section className="section container work" id="work" tabIndex={-1}>
      <SectionHeading id="work" />
      <div className="project-gallery rv">
        {PROJECTS.map((p, i) => (
          <article
            className={`project-panel ${active === i ? "expanded" : ""}`}
            id={p.id}
            key={p.id}
            onMouseEnter={() => {
              if (matchMedia("(hover:hover)").matches) setActive(i);
            }}
            onFocus={() => setActive(i)}
          >
            <button
              className="project-spine"
              aria-label={`${p.index} ${p.title}`}
              aria-expanded={active === i}
              aria-controls={`${p.id}-content`}
              onClick={() => setActive(i)}
            >
              <span className="mono">{p.index}</span>
              <span className="spine-title">{p.title}</span>
              <span className="spine-plus" aria-hidden>
                {active === i ? "−" : "+"}
              </span>
            </button>
            <div
              id={`${p.id}-content`}
              className="project-detail"
              hidden={active !== i}
            >
              {active === i && <>
              <div className="project-copy">
                <span className="mono project-kicker">
                  {p.index} / {p.kicker}
                </span>
                <h3>{p.title}</h3>
                {p.role && <p className="project-role mono">{p.role}</p>}
                <p className="project-description">{p.description}</p>
                <ul>
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t}>
                      <TechLogo name={t} size={13} />
                      {t}
                    </span>
                  ))}
                </div>
                {p.github && (
                  <a
                    href={p.github}
                    className="button small"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on GitHub ↗
                  </a>
                )}
              </div>
              <ProjectIllustration project={p} />
              </>}
            </div>
          </article>
        ))}
      </div>
      <p className="work-note mono muted">
        {PROJECTS.length.toString().padStart(2, "0")} projects · Academic,
        client & freelance work
      </p>
      <style>{`.work>.section-header{margin-bottom:45px}.project-gallery{display:flex;gap:7px;height:min(78svh,650px);min-height:590px}.project-panel{flex:0 0 43px;min-width:0;position:relative;background:#e9e6e080;border:1px solid var(--line);border-radius:25px;overflow:hidden;transition:flex .75s var(--ease),background .4s;scroll-margin-top:120px}.project-panel.expanded{flex:8 1 0%;background:white}.project-spine{width:100%;height:100%;display:flex;align-items:center;flex-direction:column;padding:23px 8px;gap:20px;text-align:left}.project-spine>.mono{font-size:9px}.spine-title{writing-mode:vertical-rl;transform:rotate(180deg);font-size:15px;letter-spacing:-.02em;flex:1}.spine-plus{font-size:22px;font-weight:300;transition:transform .3s}.project-spine:hover .spine-plus{transform:rotate(90deg)}.expanded .project-spine{position:absolute;top:15px;right:16px;width:26px;height:26px;padding:0;z-index:2}.expanded .project-spine>.mono,.expanded .spine-title{display:none}.expanded .project-spine .spine-plus{font-size:25px}.project-detail{height:100%;display:grid;grid-template-columns:1.1fr .9fr;min-width:0;gap:22px;padding:35px 30px}.project-detail[hidden]{display:none}.project-copy{display:flex;flex-direction:column;align-items:flex-start;min-width:0}.project-kicker{font-size:7px;line-height:1.7;color:var(--mute);max-width:95%;margin-bottom:23px}.project-copy h3{font-size:clamp(25px,2.5vw,38px);line-height:1.06;font-weight:500;letter-spacing:-.045em}.project-role{font-size:8px;margin-top:12px;color:var(--mute)}.project-description{font-size:13px;line-height:1.55;margin-top:19px;color:var(--ink-2)}.project-copy ul{margin:20px 0;padding:0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:13px 15px;font-size:10px;line-height:1.5;color:var(--mute)}.project-copy li{padding-top:10px;border-top:1px solid var(--line)}.project-tech{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding-top:15px}.project-tech>span{display:inline-flex;align-items:center;gap:5px;padding:6px 8px;border:1px solid var(--line);border-radius:99px;font-size:8px}.project-illustration{min-width:0;margin:auto 0;width:100%;animation:ui-wipe .8s var(--ease);}.mini-window{background:#f7f7f5;border:1px solid #deded9;border-radius:10px;box-shadow:0 25px 40px #0000000b;overflow:hidden;transform:rotate(-3deg)}.mini-toolbar{display:flex;align-items:center;gap:3px;padding:10px;border-bottom:1px solid var(--line)}.mini-toolbar>span:not(.mini-window-name){width:3px;height:3px;border-radius:50%;background:#aaa}.mini-window-name{font-size:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-left:6px}.mini-body{padding:23px 17px;min-height:275px}.mini-body>.mono{font-size:6px}.mini-stat{font-size:clamp(32px,4.1vw,64px);letter-spacing:-.06em;margin-top:15px;line-height:1}.mini-stat small{font-size:22px}.mini-description{font-size:7px;display:block;margin-top:7px;color:var(--mute)}.mini-data-bars{display:flex;gap:6px;align-items:flex-end;margin-top:26px;height:95px;border-bottom:1px solid #bbb}.mini-data-bars i{flex:1;background:#b9b9b4;border-radius:3px 3px 0 0}.mini-data-bars i:last-child{background:#292929}.mini-model{display:flex;margin-bottom:30px;gap:5px}.mini-model span{width:9px;height:9px;border:1px solid #777;border-radius:50%}.mini-model span:nth-child(2n){background:#ddd;transform:translateY(10px)}.project-illustration figcaption{font-size:6px;text-align:center;margin-top:25px;color:var(--mute);line-height:1.7}.mini-app-heading{font-size:20px;letter-spacing:-.04em;line-height:1.1;margin-top:12px}.mini-app-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:20px 0}.mini-app-grid>div{height:47px;background:#e5e5e1;border-radius:5px;border:1px solid #ddd}.mini-app-grid>div:first-child{background:#2b2b2b}.mini-lines>div{display:flex;align-items:center;gap:7px;padding:9px 0;border-bottom:1px solid var(--line)}.mini-lines i{width:12px;height:12px;background:#ddd;border-radius:3px}.mini-lines span{height:3px;width:55%;background:#ccc}.mini-lines b{height:3px;width:20%;margin-left:auto;background:#ddd}.mini-chip-row{display:flex;gap:5px;margin-top:20px}.mini-chip-row span{width:40px;height:12px;border-radius:99px;background:#e0e0dc}.bin-diagram{height:180px;display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:15px}.bin-diagram>div:first-child{grid-column:1/-1;height:40px;background:#333;border-radius:15px;display:flex;align-items:center;justify-content:center;gap:9px}.bin-diagram span{height:12px;width:12px;border:1px solid #bbb;border-radius:50%}.bin-diagram>div:not(:first-child){height:90px;border:2px solid #aaa;border-radius:5px 5px 20px 20px}.mini-labels{display:flex;justify-content:space-around;font-size:7px;margin-bottom:28px}.design-art{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:23px}.design-art>div{height:80px;border:1px solid #ccc;border-radius:3px}.design-art>div:first-child{grid-column:1/-1;height:110px;display:grid;place-items:center;background:#333;color:white;font-family:var(--font-serif);font-size:75px}.design-art>div:nth-child(2){background:#ddd}.design-art>div:last-child{display:none}.work-note{font-size:9px;margin-top:23px}@keyframes ui-wipe{from{clip-path:inset(100% 0 0 0);opacity:0}to{clip-path:inset(0);opacity:1}}@media(max-width:1190px){.project-gallery{min-height:620px}.project-panel{flex-basis:35px}.project-detail{padding:29px 23px;grid-template-columns:1fr}.project-illustration{display:none}.project-copy h3{font-size:38px}.project-copy ul{font-size:12px}.project-description{font-size:15px}.spine-title{font-size:13px}.project-tech>span{font-size:10px}}@media(max-width:760px){.project-gallery{display:flex;flex-direction:column;height:auto;gap:10px}.project-panel,.project-panel.expanded{flex:none;min-height:66px;border-radius:20px}.project-spine{flex-direction:row;padding:21px 19px;gap:14px}.spine-title{writing-mode:horizontal-tb;transform:none;font-size:14px;line-height:1.3}.spine-plus{margin-left:auto}.expanded .project-spine{top:18px;right:18px}.project-detail{display:flex;flex-direction:column;padding:30px 23px}.project-copy h3{font-size:35px;max-width:90%}.project-kicker{font-size:8px;max-width:85%}.project-copy ul{font-size:11px;margin-top:22px}.project-description{font-size:14px}.project-illustration{display:block;width:min(250px,90%);margin:25px auto 0}.mini-stat{font-size:56px}.mini-body{min-height:230px}.project-illustration figcaption{font-size:7px}.project-tech>span{font-size:9px}.work>.section-header{margin-bottom:30px}}`}</style>
    </section>
  );
}

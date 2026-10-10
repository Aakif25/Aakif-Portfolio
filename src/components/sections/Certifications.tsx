import { CERTIFICATIONS } from "@/lib/data";
import SectionHeading from "../ui/SectionHeading";
export default function Certifications() {
  return (
    <section id="certifications" tabIndex={-1} className="section courses">
      <div className="container courses-layout">
        <div className="courses-heading">
          <SectionHeading id="certifications" />
          <p className="mono muted">
            {String(CERTIFICATIONS.length).padStart(2, "0")} completed courses
          </p>
        </div>
        <div className="course-list">
          {CERTIFICATIONS.map((course, i) => (
            <article className="course-row rv" key={course.title} tabIndex={0}>
              <span className="course-index mono">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{course.title}</h3>
                <p>{course.issuer}</p>
                <span className="mono">{course.status}</span>
                <ul>
                  {course.details.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <span className="course-arrow" aria-hidden>
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>
      <style>{`.courses{background:#fff;border-block:1px solid var(--line)}.courses-layout{display:grid;grid-template-columns:1fr 1.4fr;gap:70px}.courses-heading{position:sticky;top:115px;align-self:start}.courses-heading>p{margin-top:33px;font-size:9px}.course-row{position:relative;isolation:isolate;padding:32px 24px;display:grid;grid-template-columns:25px 1fr 25px;gap:20px;border-top:1px solid var(--line);overflow:hidden;transition:color .4s}.course-row::before{content:'';position:absolute;inset:0;background:var(--ink);z-index:-1;transform:scaleX(0);transform-origin:left;transition:transform .55s var(--ease)}.course-row:hover::before,.course-row:focus-visible::before{transform:scaleX(1)}.course-row:hover,.course-row:focus-visible{color:#fff}.course-index{padding-top:4px;font-size:10px;opacity:.6}.course-row h3{font-size:27px;font-weight:500;letter-spacing:-.03em;line-height:1.15}.course-row p{font-size:13px;margin-top:12px;opacity:.7}.course-row div>.mono{display:block;font-size:8px;margin-top:8px;opacity:.6}.course-row ul{list-style:none;display:flex;flex-wrap:wrap;gap:7px 17px;padding:0;margin:25px 0 0;font-size:11px;opacity:.7}.course-arrow{font-size:26px;opacity:0;transform:translateX(-12px);transition:opacity .4s,transform .4s}.course-row:hover .course-arrow,.course-row:focus-visible .course-arrow{opacity:1;transform:none}@media(max-width:800px){.courses-layout{grid-template-columns:1fr;gap:40px}.courses-heading{position:static}.courses-heading>p{margin-top:24px}.course-row{padding:28px 12px;gap:13px}.course-row h3{font-size:25px}.course-arrow{opacity:1}}`}</style>
    </section>
  );
}

"use client";
import { useState } from "react";
import { COPY, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
export default function Contact() {
  const [copy, setCopy] = useState("Copy");
  const letters = (text: string) =>
    Array.from(text).map((c, i) => (
      <span
        aria-hidden
        key={i}
        className={c === " " ? "letter-space" : "hop-letter"}
      >
        {c === " " ? "\u00a0" : c}
      </span>
    ));
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopy("Copied ✓");
    } catch {
      setCopy("Select email to copy");
    }
    setTimeout(() => setCopy("Copy"), 3500);
  }
  return (
    <>
      <section id="contact" tabIndex={-1} className="section container contact">
        <p className="section-tag mono rv">
          <span>07</span>
          <span>{COPY.sectionLabels.contact}</span>
        </p>
        <div className="contact-top">
          <h2
            className="contact-heading rv"
            aria-label={COPY.headings.contact.join(" ")}
          >
            <span>{letters(COPY.headings.contact[0])}</span>
            <em>{letters(COPY.headings.contact[1])}</em>
          </h2>
          <a
            className="hello-badge"
            href={`mailto:${PROFILE.email}`}
            aria-label={`Say hello to ${PROFILE.name}`}
          >
            <svg viewBox="0 0 120 120" aria-hidden>
              <defs>
                <path
                  id="hello-circle"
                  d="M60 60 m-43 0 a43 43 0 1 1 86 0 a43 43 0 1 1 -86 0"
                />
              </defs>
              <text>
                <textPath href="#hello-circle" textLength="270">
                  SAY HELLO · SAY HELLO · SAY HELLO ·{" "}
                </textPath>
              </text>
            </svg>
            <span aria-hidden>↗</span>
          </a>
        </div>
        <div className="contact-links rv">
          <div className="email-row">
            <a className="email-link" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <button
              className="pill copy-button"
              onClick={copyEmail}
              aria-live="polite"
            >
              {copy}
            </button>
          </div>
          <a className="phone-link" href={PROFILE.phoneHref}>
            {PROFILE.phone} <span aria-hidden>↗</span>
          </a>
        </div>
      </section>
      <footer className="footer container">
        <span>
          © {new Date().getFullYear()} {PROFILE.name}
        </span>
        <span className="built-with">Built with Next.js</span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("top");
          }}
        >
          Back to top <span aria-hidden>↑</span>
        </a>
      </footer>
      <style>{`.contact{padding-top:140px;padding-bottom:100px}.contact-top{display:flex;justify-content:space-between;align-items:center;gap:40px}.contact-heading{font-size:clamp(50px,7.8vw,112px);font-weight:500;line-height:1.07;letter-spacing:-.055em}.contact-heading>span,.contact-heading>em{display:block}.contact-heading>em{font-family:var(--font-serif);font-weight:400;color:var(--mute);letter-spacing:-.035em;line-height:1.12;padding-bottom:8px}.hop-letter{display:inline-block}.hop-letter:hover{animation:letter-hop .6s var(--ease)}.hello-badge{width:120px;height:120px;flex-shrink:0;position:relative;display:grid;place-items:center}.hello-badge svg{width:120px;height:120px;animation:hello-spin 26s linear infinite;font-family:var(--font-mono);font-size:10px;letter-spacing:2px;fill:var(--mute)}.hello-badge>span{position:absolute;font-size:37px}.contact-links{margin-top:57px;display:flex;justify-content:space-between;align-items:center;gap:30px}.email-row{display:flex;gap:20px;align-items:center;min-width:0}.email-link{font-size:clamp(19px,2.8vw,40px);letter-spacing:-.025em;border-bottom:1px solid var(--ink);padding-bottom:7px;overflow-wrap:anywhere}.copy-button{font-size:10px;white-space:nowrap;min-width:55px}.copy-button:hover{background:var(--ink);color:white}.phone-link{font-size:14px;white-space:nowrap}.phone-link span{margin-left:15px}.footer{border-top:1px solid var(--line);padding-block:27px;display:flex;justify-content:space-between;gap:20px;font-size:11px;color:var(--mute)}.footer a{color:var(--ink)}.footer a span{margin-left:14px}.built-with{font-size:10px}@keyframes hello-spin{to{transform:rotate(360deg)}}@keyframes letter-hop{0%,100%{transform:translateY(0)}35%{transform:translateY(-15px)}65%{transform:translateY(4px)}}@media(max-width:800px){.hello-badge{display:none}.contact-heading{font-size:clamp(45px,8.4vw,68px)}.contact-links{align-items:flex-start;flex-direction:column;gap:30px}.email-link{font-size:clamp(20px,5.4vw,34px)}.email-row{gap:13px;width:100%}.contact{padding-top:100px;padding-bottom:75px}.footer{flex-wrap:wrap;font-size:10px}.built-with{order:3;width:100%;font-size:9px}}@media(max-width:400px){.contact-heading{font-size:42px}.copy-button{padding:7px 9px;font-size:9px}.email-link{font-size:20px}}`}</style>
    </>
  );
}

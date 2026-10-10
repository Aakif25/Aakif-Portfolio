"use client";
import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget, setScrollLocked } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";
export default function Navigation() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  useScrollProgress(() => {
    nav.current?.classList.toggle("scrolled", scrollY > 40);
    if (progress.current)
      progress.current.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
  });
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...NAV.map((n) => n.id), "certifications"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    const update = () => {
      const item = pill.current?.querySelector<HTMLElement>(
        `[href="#${active}"]`,
      );
      if (indicator.current) {
        indicator.current.style.opacity = item ? "1" : "0";
        if (item) {
          indicator.current.style.width = `${item.offsetWidth}px`;
          indicator.current.style.transform = `translateX(${item.offsetLeft}px)`;
        }
      }
    };
    update();
    addEventListener("resize", update);
    return () => removeEventListener("resize", update);
  }, [active]);
  useEffect(() => {
    setScrollLocked(open);
    if (!open) return;
    const before = document.activeElement as HTMLElement;
    const d = dialog.current;
    d?.querySelector<HTMLElement>("button,a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && d) {
        const els = Array.from(d.querySelectorAll<HTMLElement>("button,a"));
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      setScrollLocked(false);
      document.removeEventListener("keydown", key);
      before?.focus();
    };
  }, [open]);
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    setScrollLocked(false);
    requestAnimationFrame(() => scrollToTarget(id));
  };
  return (
    <>
      <div className="page-progress" ref={progress} />
      <nav
        className="navigation container"
        ref={nav}
        aria-label="Main navigation"
      >
        <a
          className="identity"
          href="#top"
          onClick={(e) => go(e, "top")}
          aria-label={`${PROFILE.name}, back to top`}
        >
          <span className="initials" aria-hidden>{PROFILE.initials}</span>
          <span className="identity-name">{PROFILE.name}</span>
        </a>
        <div className="nav-pill" ref={pill}>
          <span className="nav-indicator" ref={indicator} />
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              onClick={(e) => go(e, n.id)}
            >
              {n.label}
            </a>
          ))}
        </div>
        <button
          className="button small mobile-menu"
          ref={menu}
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          Menu <span aria-hidden>+</span>
        </button>
      </nav>
      {open && (
        <div
          className="menu-overlay"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={dialog}
        >
          <div className="menu-top">
            <span className="initials">{PROFILE.initials}</span>
            <button className="button small" onClick={() => setOpen(false)}>
              Close <span aria-hidden>×</span>
            </button>
          </div>
          <div className="menu-links">
            {NAV.map((n, i) => (
              <a
                href={`#${n.id}`}
                key={n.id}
                style={{ "--i": i } as React.CSSProperties}
                onClick={(e) => go(e, n.id)}
              >
                <span className="mono">0{i + 1}</span>
                {n.label}
                <span aria-hidden>↗</span>
              </a>
            ))}
          </div>
          <a className="menu-email" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
          </a>
        </div>
      )}
      <style>{`.page-progress{position:fixed;top:0;left:0;right:0;height:2px;background:var(--ink);z-index:50;transform:scaleX(0);transform-origin:left}.navigation{position:fixed;top:22px;left:0;right:0;z-index:30;display:flex;align-items:center;justify-content:space-between;pointer-events:none}.navigation>*{pointer-events:auto}.identity{display:flex;align-items:center;gap:13px}.initials{display:grid;place-items:center;width:43px;height:43px;border:1px solid var(--ink);border-radius:50%;font-size:15px;letter-spacing:-1px;transition:transform .7s var(--ease),background .4s,color .4s}.identity:hover .initials{transform:rotate(360deg)}.identity-name{font-size:14px;font-weight:500;transition:opacity .4s}.scrolled .identity-name{opacity:0;pointer-events:none}.scrolled .initials{background:var(--ink);color:white}.nav-pill{display:flex;position:relative;padding:6px;border-radius:99px;border:1px solid var(--line);transition:background .4s,box-shadow .4s}.scrolled .nav-pill{background:rgba(255,255,255,.85);backdrop-filter:blur(12px);box-shadow:0 6px 25px #00000006}.nav-pill a{font-size:12px;position:relative;padding:11px 17px;z-index:1;transition:color .3s}.nav-pill a[aria-current]{color:white}.nav-indicator{position:absolute;height:36px;left:0;top:6px;background:var(--ink);border-radius:99px;opacity:0;transition:transform .5s var(--ease),width .5s var(--ease),opacity .2s}.mobile-menu{display:none}.menu-overlay{position:fixed;inset:0;z-index:60;background:var(--paper);padding:22px var(--gutter) 35px;display:flex;flex-direction:column;animation:menu-open .5s var(--ease);overflow:auto}.menu-top{display:flex;justify-content:space-between;align-items:center}.menu-links{margin:auto 0;padding-block:35px}.menu-links a{display:flex;align-items:center;gap:22px;font-size:clamp(32px,7vh,62px);letter-spacing:-.05em;padding-block:9px;animation:menu-link .7s var(--ease) both;animation-delay:calc(var(--i)*60ms)}.menu-links a>span:last-child{margin-left:auto;font-size:28px}.menu-email{font-size:17px}@keyframes menu-open{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}}@keyframes menu-link{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}@media(max-width:850px){.nav-pill{display:none}.mobile-menu{display:flex;background:var(--paper)}.navigation{top:18px}.identity-name{font-size:13px}}`}</style>
    </>
  );
}

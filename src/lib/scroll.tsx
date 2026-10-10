"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "./hooks";
let scroller: Lenis | undefined;
export function scrollToTarget(id: string) {
  // Resolve cached offscreen layout before computing a long-distance anchor.
  document.querySelectorAll<HTMLElement>('main > section').forEach(section => {section.style.contentVisibility='visible'});
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 84;
  if (scroller && !prefersReducedMotion())
    scroller.scrollTo(top, { duration: 1.2 });
  else window.scrollTo({ top, behavior: "instant" });
  history.replaceState(null, "", `#${id}`);
  el.focus({ preventScroll: true });
}
export function setScrollLocked(locked: boolean) {
  if (locked) scroller?.stop();
  else scroller?.start();
  document.body.style.overflow = locked ? "hidden" : "";
}
export function SmoothScroll() {
  useEffect(() => {
    const q = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const configure = () => {
      cancelAnimationFrame(frame);
      scroller?.destroy();
      scroller = undefined;
      if (q.matches) return;
      scroller = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
      const raf = (time: number) => {
        scroller?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    };
    configure();
    q.addEventListener("change", configure);
    return () => {
      cancelAnimationFrame(frame);
      scroller?.destroy();
      scroller = undefined;
      q.removeEventListener("change", configure);
    };
  }, []);
  return null;
}

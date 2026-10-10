"use client";
import { useEffect } from "react";
export default function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll(".rv,.rv-mask");
    document.documentElement.classList.add("motion-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -20px 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return null;
}

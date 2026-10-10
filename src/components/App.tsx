import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Certifications from "./sections/Certifications";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import RevealObserver from "./ui/RevealObserver";
import { SmoothScroll } from "@/lib/scroll";
import { Suspense } from "react";
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SmoothScroll />
      <Navigation />
      <main id="main">
        <Hero />
        <Suspense><About /></Suspense>
        <Suspense><Skills /></Suspense>
        <Suspense><Work /></Suspense>
        <Certifications />
        <Suspense><Experience /></Suspense>
        <Suspense><Achievements /></Suspense>
        <Suspense><Contact /></Suspense>
      </main>
      <RevealObserver />
    </>
  );
}

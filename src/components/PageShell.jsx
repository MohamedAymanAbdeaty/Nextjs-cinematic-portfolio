"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import Lightbox from "./Lightbox";
import StoryChat from "./StoryChat";

export default function PageShell({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      lerp: reduce ? 1 : 0.1,
      smoothWheel: !reduce,
      wheelMultiplier: 1,
    });
    window.__lenis = lenis;

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.__lenis = undefined;
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <StoryChat />
      <Lightbox />
      <div className="relative z-10">{children}</div>
    </main>
  );
}

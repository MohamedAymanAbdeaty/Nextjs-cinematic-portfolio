"use client";
import { useEffect, useRef, useState } from "react";

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -48, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  mask = false,
  threshold = 0.15,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (mask) {
    // clip must live on an inner wrapper: clipped elements never intersect
    // the IntersectionObserver (and lazy images inside never load).
    return (
      <Tag ref={ref} className={`${visible ? "is-visible" : ""} ${className}`}>
        <div
          className={`reveal-mask ${visible ? "is-visible" : ""}`}
          style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={`reveal-up ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Chapter transition system — one deliberately chosen entrance per chapter.
 *
 * Variants:
 *  - editorial : typography sequence, children rise into place (stagger)
 *  - spatial   : children ease up from depth (translate + scale), slower stagger
 *  - expand    : single media child — frame expands from an inset, smaller state
 *  - strip     : single media child — photograph opens from a horizontal strip
 *  - gallery   : single block — rises with a restrained perspective tilt
 *  - rule      : section rule line draws left to right (chapter punctuation)
 *
 * All variants are transform/opacity/clip-path only: no layout shift, no
 * pinned scenes, no scroll hijacking. Reduced motion renders content
 * immediately and the global reduced-motion CSS neutralises every state.
 */
export default function ChapterReveal({
  children,
  variant = "editorial",
  className = "",
  delay = 0,
  threshold = 0.16,
  as: Tag = "div",
  ...rest
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
      { threshold, rootMargin: "0px 0px -36px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const mediaFrame = variant === "expand" || variant === "strip";

  return (
    <Tag
      ref={ref}
      className={`chapter-reveal chapter-reveal--${variant}${visible ? " is-in" : ""} ${className}`}
      style={delay ? { "--cr-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {mediaFrame ? <div className="chapter-reveal__frame">{children}</div> : children}
    </Tag>
  );
}

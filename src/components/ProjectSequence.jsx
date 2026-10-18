"use client";
import { useEffect, useRef, useState } from "react";

/**
 * The one horizontal chapter: a snap-scrolling strip of closely related builds.
 * - Mouse/pen: drag to scrub, released strip settles on the nearest card.
 * - Touch: native swipe (page scroll stays vertical).
 * - Keyboard: focus the strip or any card and use ← / →.
 * - Explicit prev/next controls always available.
 * No pinning, no scroll hijacking — the page keeps scrolling vertically.
 */
export default function ProjectSequence({ projects }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: 0 });
  const [dragging, setDragging] = useState(false);
  const [index, setIndex] = useState(0);

  const nearestIndex = () => {
    const track = trackRef.current;
    if (!track) return 0;
    const cards = [...track.querySelectorAll("[data-project-card]")];
    if (!cards.length) return 0;
    if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 24) return cards.length - 1;
    const left = track.getBoundingClientRect().left;
    let best = 0;
    let bestDistance = Infinity;
    cards.forEach((card, i) => {
      const d = Math.abs(card.getBoundingClientRect().left - left);
      if (d < bestDistance) {
        bestDistance = d;
        best = i;
      }
    });
    return best;
  };

  const scrollToIndex = (i) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll("[data-project-card]");
    const last = cards.length - 1;
    if (last < 0) return;
    const idx = Math.max(0, Math.min(i, last));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const max = track.scrollWidth - track.clientWidth;
    let left = max;
    if (idx !== last) {
      const target = cards[idx];
      left = Math.max(
        0,
        Math.min(
          target.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft,
          max
        )
      );
    }
    track.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  };

  const settle = () => {
    const track = trackRef.current;
    if (!track) return;
    const restore = () => {
      track.style.scrollSnapType = "";
      track.removeEventListener("scrollend", restore);
    };
    track.addEventListener("scrollend", restore);
    setTimeout(restore, 800);
    scrollToIndex(nearestIndex());
  };

  const step = (dir) => scrollToIndex(nearestIndex() + dir);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onPointerDown = (e) => {
      if (e.pointerType === "touch") return;
      drag.current = { active: true, startX: e.clientX, startLeft: track.scrollLeft, moved: 0 };
      track.style.scrollSnapType = "none";
      setDragging(true);
    };
    const onPointerMove = (e) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
      if (drag.current.moved > 6) track.scrollLeft = drag.current.startLeft - dx;
    };
    const onPointerUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      setDragging(false);
      if (drag.current.moved > 6) {
        settle();
      } else {
        track.style.scrollSnapType = "";
      }
    };
    const onScroll = () => setIndex(nearestIndex());
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickCapture = (e) => {
    if (drag.current.moved > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
    drag.current.moved = 0;
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <div className="project-seq">
      <ul
        ref={trackRef}
        className={`project-seq__track${dragging ? " is-dragging" : ""}`}
        tabIndex={0}
        role="list"
        aria-label="Selected projects — horizontal sequence"
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {projects.map((project) => (
          <li key={project.title} className="project-seq__item" data-project-card>
            <a className="project-card" href={project.href} target="_blank" rel="noopener noreferrer" draggable={false}>
              <span className={`project-card__media${project.image ? "" : " project-card__media--empty"}`}>
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.image} alt={project.alt || ""} loading="lazy" draggable={false} />
                ) : (
                  <span aria-hidden="true">↗</span>
                )}
              </span>
              <span className="project-card__body">
                <span className="project-card__head">
                  <strong>{project.title}</strong>
                  <span aria-hidden="true">↗</span>
                </span>
                <small>{project.type}</small>
                <span className="project-card__description">{project.description}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="project-seq__controls">
        <button type="button" className="project-seq__nav" aria-label="Previous project" onClick={() => step(-1)}>
          ‹
        </button>
        <p className="project-seq__hint">
          <span className="project-seq__counter">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <span>Drag, swipe, or use ← →</span>
        </p>
        <button type="button" className="project-seq__nav" aria-label="Next project" onClick={() => step(1)}>
          ›
        </button>
      </div>
    </div>
  );
}

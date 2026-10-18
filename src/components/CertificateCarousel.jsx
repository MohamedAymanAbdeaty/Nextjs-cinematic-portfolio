"use client";

import { useEffect, useRef, useState } from "react";
import { openLightbox } from "./Lightbox";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const R2D = 180 / Math.PI;
const IDLE_SPEED = 4.5;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export default function CertificateCarousel({ certificates }) {
  const count = certificates.length;
  const step = count ? 360 / count : 360;

  const stageRef = useRef(null);
  const ringRef = useRef(null);
  const cardRefs = useRef([]);
  const goToRef = useRef(() => {});
  const [index, setIndex] = useState(0);

  const s = useRef(null);
  if (s.current === null) {
    s.current = {
      rot: 0,
      vel: 0,
      idx: 0,
      step,
      count,
      drag: false,
      moved: 0,
      lastX: 0,
      lastT: 0,
      tween: null,
      hover: false,
      focus: false,
      reduced: false,
      visible: true,
      radius: 700,
      lastRenderRot: null,
    };
  }
  s.current.step = step;
  s.current.count = count;

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    const st = s.current;
    if (!stage || !ring || !count) return undefined;

    /* reduced motion preference */
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    st.reduced = mqReduce.matches;
    const onReduce = (e) => { st.reduced = e.matches; };
    mqReduce.addEventListener("change", onReduce);

    /* responsive geometry — radius and card size derive from count & stage width */
    const computeMetrics = () => {
      const w = stage.clientWidth || 1200;
      const cardW = clamp(w * 0.16, 108, 210);
      const metaH = clamp(cardW * 0.48, 88, 94);
      const cardH = cardW * 0.75 + metaH + 24;
      const ringCirc = (count * cardW * 1.18) / (2 * Math.PI);
      st.radius = clamp(ringCirc, cardW * 1.4, Math.min(980, Math.max(w * 0.62, cardW * 1.4)));
      stage.style.perspective = `${Math.round(st.radius * 2.4)}px`;
      stage.style.setProperty("--card-w", `${cardW.toFixed(1)}px`);
      stage.style.setProperty("--card-meta-h", `${metaH.toFixed(1)}px`);
      stage.style.setProperty("--card-h", `${cardH.toFixed(1)}px`);
      stage.style.setProperty("--radius", `${st.radius.toFixed(1)}px`);
    };
    const ro = new ResizeObserver(computeMetrics);
    ro.observe(stage);
    computeMetrics();

    /* pause simulation while offscreen */
    const io = new IntersectionObserver(
      ([entry]) => { st.visible = entry ? entry.isIntersecting : true; },
      { rootMargin: "160px 0px" }
    );
    io.observe(stage);

    /* per-frame DOM updates, no React re-renders */
    const render = () => {
      if (st.lastRenderRot === st.rot) return;
      st.lastRenderRot = st.rot;
      ring.style.transform = `rotateY(${((st.rot % 360) + 360) % 360}deg)`;
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length; i += 1) {
        const el = cards[i];
        if (!el) continue;
        const dim = (Math.cos((i * st.step + st.rot) * (Math.PI / 180)) + 1) / 2;
        el.style.setProperty("--dim", dim.toFixed(3));
      }
      const idx = ((Math.round(-st.rot / st.step) % count) + count) % count;
      if (idx !== st.idx) {
        st.idx = idx;
        setIndex(idx);
      }
    };

    /* eased rotation to a given card index */
    const goTo = (i) => {
      const target = -i * st.step;
      const to = target + Math.round((st.rot - target) / 360) * 360;
      st.vel = 0;
      if (st.reduced) {
        st.tween = null;
        st.rot = to;
        render();
        return;
      }
      st.tween = {
        from: st.rot,
        to,
        start: performance.now(),
        duration: 820 + Math.min(Math.abs(to - st.rot) * 1.6, 460),
      };
    };
    goToRef.current = goTo;

    /* drag to rotate — capture is intentionally avoided so plain taps still
       reach the certificate buttons and open the lightbox */
    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      st.drag = true;
      st.moved = 0;
      st.tween = null;
      st.vel = 0;
      st.lastX = e.clientX;
      st.lastT = performance.now();
      stage.classList.add("is-dragging");
    };

    const onPointerMove = (e) => {
      if (!st.drag) return;
      const now = performance.now();
      const dx = e.clientX - st.lastX;
      const dtms = Math.max(now - st.lastT, 1);
      st.moved += Math.abs(dx);
      const dRot = dx * (R2D / st.radius) * 1.35;
      st.rot += dRot;
      st.vel = st.vel * 0.7 + ((dRot / dtms) * 1000) * 0.3;
      st.lastX = e.clientX;
      st.lastT = now;
    };

    const endDrag = () => {
      if (!st.drag) return;
      st.drag = false;
      stage.classList.remove("is-dragging");
      st.vel = st.reduced ? 0 : clamp(st.vel, -400, 400);
    };

    /* horizontal trackpad / wheel support — vertical scrolling stays with the page */
    const onWheel = (e) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      st.tween = null;
      st.vel = clamp(st.vel + e.deltaX * (R2D / st.radius) * 40, -400, 400);
    };

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(st.idx - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(st.idx + 1);
      }
    };

    const onEnter = (e) => { if (e.pointerType === "mouse") st.hover = true; };
    const onLeave = () => { st.hover = false; };
    const onFocusIn = (e) => {
      st.focus = true;
      const raw = e.target && e.target.dataset ? e.target.dataset.certIndex : undefined;
      if (raw !== undefined && e.target.matches && e.target.matches(":focus-visible")) {
        goTo(Number(raw));
      }
    };
    const onFocusOut = () => { st.focus = false; };
    const onDragStart = (e) => e.preventDefault();

    stage.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("keydown", onKeyDown);
    stage.addEventListener("pointerenter", onEnter);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("focusin", onFocusIn);
    stage.addEventListener("focusout", onFocusOut);
    stage.addEventListener("dragstart", onDragStart);

    /* physics loop: inertia → idle rotation */
    let raf = 0;
    let prevT = performance.now();
    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const dt = clamp((t - prevT) / 1000, 0, 0.05);
      prevT = t;
      if (!st.visible || document.hidden) return;

      if (st.tween) {
        const p = clamp((t - st.tween.start) / st.tween.duration, 0, 1);
        st.rot = st.tween.from + (st.tween.to - st.tween.from) * easeInOutCubic(p);
        if (p >= 1) st.tween = null;
      } else if (!st.drag) {
        if (Math.abs(st.vel) > 2) {
          st.rot += st.vel * dt;
          st.vel *= Math.exp(-2.4 * dt);
        } else {
          st.vel = 0;
          if (!st.reduced && !st.hover && !st.focus) st.rot -= IDLE_SPEED * dt;
        }
      }
      render();
    };
    raf = requestAnimationFrame(tick);
    render();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mqReduce.removeEventListener("change", onReduce);
      stage.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("pointerenter", onEnter);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("focusin", onFocusIn);
      stage.removeEventListener("focusout", onFocusOut);
      stage.removeEventListener("dragstart", onDragStart);
      stage.classList.remove("is-dragging");
    };
  }, [count]);

  return (
    <div className="cert-carousel">
      <div
        ref={stageRef}
        className="cert-carousel__stage"
        role="region"
        aria-roledescription="carousel"
        aria-label={`Certificate carousel — ${count} verified credentials`}
        tabIndex={0}
      >
        <div className="cert-carousel__scene">
          <div className="cert-carousel__tilt">
            <div ref={ringRef} className="cert-carousel__ring">
              {certificates.map((cert, i) => (
                <button
                  key={cert.id}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  type="button"
                  className="cert-carousel__card"
                  data-cert-index={i}
                  style={{ transform: `rotateY(${(i * step).toFixed(3)}deg) translateZ(var(--radius, 640px))` }}
                  aria-label={`Open ${cert.name}, issued by ${cert.issuer} (${cert.date})`}
                  onClick={() => {
                    if (s.current.moved > 8) return;
                    openLightbox(cert.image, cert.name, `${cert.issuer} · ${cert.date}`);
                  }}
                >
                  <span className="cert-carousel__plate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cert.image} alt="" loading="lazy" decoding="async" draggable={false} />
                  </span>
                  <span className="cert-carousel__meta" aria-hidden="true">
                    <span className="cert-carousel__issuer">{cert.issuer}</span>
                    <span className="cert-carousel__name">{cert.name}</span>
                    <span className="cert-carousel__date">{cert.date}</span>
                  </span>
                </button>
              ))}
            </div>
            <span className="cert-carousel__edge cert-carousel__edge--top" aria-hidden="true" />
            <span className="cert-carousel__edge cert-carousel__edge--bottom" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className="cert-carousel__controls">
        <button
          type="button"
          className="cert-carousel__nav"
          aria-label="Previous certificate"
          onClick={() => goToRef.current(s.current.idx - 1)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p className="cert-carousel__hint">
          <span>Drag to explore</span>
          <span className="cert-carousel__counter">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </p>
        <button
          type="button"
          className="cert-carousel__nav"
          aria-label="Next certificate"
          onClick={() => goToRef.current(s.current.idx + 1)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {certificates[index] ? `Certificate ${index + 1} of ${count}: ${certificates[index].name}` : ""}
      </p>
    </div>
  );
}

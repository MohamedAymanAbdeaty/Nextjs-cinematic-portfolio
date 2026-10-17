"use client";
import { useEffect, useState } from "react";

export function openLightbox(src, title, sub) {
  window.dispatchEvent(new CustomEvent("lightbox:open", { detail: { src, title, sub } }));
}

export default function Lightbox() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const onOpen = (e) => {
      setState(e.detail);
      document.body.style.overflow = "hidden";
    };
    const onClose = () => {
      setState(null);
      document.body.style.overflow = "";
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("lightbox:open", onOpen);
    window.addEventListener("lightbox:close", onClose);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("lightbox:open", onOpen);
      window.removeEventListener("lightbox:close", onClose);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  if (!state) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-ink/92 backdrop-blur-md flex items-center justify-center p-4"
      onClick={() => window.dispatchEvent(new CustomEvent("lightbox:close"))}
      role="dialog"
      aria-modal="true"
      aria-label={state.title || "Credential viewer"}
    >
      <div
        className="max-w-4xl w-full bg-ink-2/95 rounded-3xl p-4 sm:p-5 border border-line shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("lightbox:close"))}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-ink-2 border border-line text-paper font-bold flex items-center justify-center text-xs hover:border-sig/60 hover:text-sig transition"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="w-full max-h-[76vh] flex items-center justify-center bg-black/50 rounded-2xl p-2 overflow-hidden">
          {/* zero-crop: full document always visible */}
          <img
            src={state.src}
            alt={state.title || "Full document view"}
            className="max-w-full max-h-[72vh] object-contain rounded-xl"
          />
        </div>
        <div className="mt-3 text-left px-1">
          <h4 className="text-paper text-sm sm:text-base font-bold font-display">
            {state.title}
          </h4>
          {state.sub && (
            <p className="text-mute text-xs mt-0.5 font-mono">{state.sub}</p>
          )}
        </div>
      </div>
    </div>
  );
}

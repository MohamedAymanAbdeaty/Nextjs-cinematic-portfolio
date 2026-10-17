"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "./Reveal";
import { site } from "@/data/profile";

const ACTS = [
  { id: "identity", numeral: "I", label: "Identity" },
  { id: "microsoft", numeral: "II", label: "Leadership" },
  { id: "research", numeral: "III", label: "Research" },
  { id: "projects", numeral: "IV", label: "Projects" },
  { id: "next", numeral: "V", label: "Next" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const barRef = useRef(null);
  const [active, setActive] = useState("identity");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // scroll progress + active act (rAF throttled)
  useEffect(() => {
    if (!isHome) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (barRef.current) barRef.current.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
      setScrolled(y > 24);

      let current = ACTS[0].id;
      for (const a of ACTS) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= 140) current = a.id;
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    if (isHome) scrollToSection(id);
    else window.location.href = `/#${id}`;
  };

  const ask = () => {
    setOpen(false);
    window.dispatchEvent(new CustomEvent("chat:open"));
  };

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-300 ${
          scrolled ? "bg-ink/85 backdrop-blur-md" : "bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <div className="relative flex items-center justify-between gap-4 px-5 sm:px-8 lg:px-14 h-16">
          {/* Identity */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Mohamed Ayman — home">
            <span className="w-8 h-8 rounded-lg bg-paper text-ink flex items-center justify-center font-display font-extrabold text-[0.65rem] group-hover:bg-sig transition-colors">
              {site.monogram}
            </span>
            <span className="hidden sm:block font-display font-bold text-[0.82rem] tracking-tight text-paper whitespace-nowrap">
              {site.shortName}
            </span>
          </Link>

          {/* Act index (home, desktop) */}
          {isHome && (
            <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
              {ACTS.map((a) => {
                const on = active === a.id;
                return (
                  <li key={a.id}>
                    <button
                      onClick={() => go(a.id)}
                      aria-current={on ? "true" : undefined}
                      className={`px-2.5 py-1.5 font-mono text-[0.64rem] tracking-[0.16em] uppercase transition-colors duration-200 border-b ${
                        on
                          ? "text-sig border-sig/70"
                          : "text-faint border-transparent hover:text-paper"
                      }`}
                    >
                      <span className="text-[0.72rem] mr-1.5">{a.numeral}</span>
                      <span className="hidden xl:inline">{a.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Right cluster */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link
              href="/about"
              className={`hidden sm:inline-block px-2.5 py-1.5 font-mono text-[0.64rem] tracking-[0.16em] uppercase transition-colors ${
                pathname === "/about" ? "text-sig" : "text-faint hover:text-paper"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hidden sm:inline-block px-2.5 py-1.5 font-mono text-[0.64rem] tracking-[0.16em] uppercase transition-colors ${
                pathname === "/contact" ? "text-sig" : "text-faint hover:text-paper"
              }`}
            >
              Contact
            </Link>
            <button
              onClick={ask}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-line text-[0.7rem] font-semibold text-paper hover:border-sig hover:text-sig transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sig" aria-hidden="true" />
              Ask
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden relative flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[70]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={`block w-5 h-[1.5px] bg-paper transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[3.25px]" : ""}`} />
              <span className={`block w-5 h-[1.5px] bg-paper transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[3.25px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* progress hairline */}
        <div className="h-px bg-line/60 relative" aria-hidden="true">
          <div ref={barRef} className="progress-hairline" />
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-[65] bg-ink/97 backdrop-blur-xl sm:hidden overflow-y-auto py-20 px-6">
          {isHome && (
            <div className="mb-8">
              <p className="eyebrow-mute mb-4">Index</p>
              <ul className="list-none m-0 p-0 space-y-1">
                {ACTS.map((a, i) => (
                  <li key={a.id}>
                    <button
                      onClick={() => go(a.id)}
                      className="flex items-baseline gap-4 w-full text-left py-2 border-b border-line group"
                      style={{ animation: `none` }}
                    >
                      <span className="font-mono text-[0.62rem] text-sig w-6">{a.numeral}</span>
                      <span className="font-serif text-[1.6rem] leading-none text-paper group-hover:text-sig transition-colors">
                        {a.label}
                      </span>
                      <span className="ml-auto font-mono text-[0.58rem] text-faint">0{i + 1}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="space-y-4">
            <Link href="/about" onClick={() => setOpen(false)} className="block font-mono text-[0.72rem] tracking-[0.2em] uppercase text-faint">
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block font-mono text-[0.72rem] tracking-[0.2em] uppercase text-faint">
              Contact
            </Link>
            <button onClick={ask} className="btn-solid w-full justify-center">
              Ask Mohamed
            </button>
          </div>
        </div>
      )}
    </>
  );
}

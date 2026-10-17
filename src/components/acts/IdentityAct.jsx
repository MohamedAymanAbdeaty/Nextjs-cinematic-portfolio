"use client";
import Reveal, { scrollToSection } from "@/components/Reveal";
import { openLightbox } from "@/components/Lightbox";
import { identity } from "@/data/acts";
import { site } from "@/data/profile";

export default function IdentityAct() {
  return (
    <section id="identity" className="relative min-h-[100svh] flex flex-col justify-center px-5 sm:px-8 lg:px-14 pt-28 pb-16">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div className="lg:col-span-7 xl:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-sig" aria-hidden="true" />
              {identity.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display mt-7 text-[clamp(2.7rem,7.4vw,5.6rem)] text-paper">
              {identity.headline[0]}
              <br />
              {identity.headline[1]}{" "}
              <em>{identity.headline[2]}</em>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-8 max-w-[54ch] text-[0.98rem] leading-[1.75] text-mute">
              {identity.philosophy}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <ul className="mt-8 space-y-2">
              {identity.meta.map((m) => (
                <li key={m} className="font-mono text-[0.7rem] tracking-[0.08em] text-faint">
                  <span className="text-sig mr-2">—</span>
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button className="btn-solid" onClick={() => scrollToSection("work")}>
                {identity.ctaPrimary} <span aria-hidden="true">↓</span>
              </button>
              <a className="btn-ghost" href={`mailto:${site.email}`}>
                {identity.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>

        {/* Dominant visual */}
        <div className="lg:col-span-5">
          <Reveal delay={160} mask className="doc-figure doc-figure--tall max-w-[26rem] lg:max-w-none mx-auto lg:mx-0 lg:ml-auto">
            <button
              type="button"
              className="absolute inset-0 z-10"
              aria-label="View photograph full size"
              onClick={() => openLightbox(identity.image, identity.imageAlt, identity.imageCaption)}
            >
              <span className="sr-only">View full size</span>
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={identity.image} alt={identity.imageAlt} loading="eager" fetchPriority="high" />
          </Reveal>
          <Reveal delay={280}>
            <p className="doc-caption max-w-[26rem] mx-auto lg:mx-0 lg:ml-auto lg:text-right">
              {identity.imageCaption}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="max-w-[1400px] mx-auto w-full mt-14 lg:mt-4 flex items-center gap-4 text-faint">
        <span className="font-mono text-[0.62rem] tracking-[0.28em] uppercase">Scroll</span>
        <span className="h-px w-16 bg-line relative overflow-hidden" aria-hidden="true">
          <span className="cue-sweep absolute inset-y-0 left-0 w-1/3 bg-sig" />
        </span>
      </div>
    </section>
  );
}

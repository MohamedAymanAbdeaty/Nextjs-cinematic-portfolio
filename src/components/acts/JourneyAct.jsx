"use client";
import Reveal, { scrollToSection } from "@/components/Reveal";
import { openLightbox } from "@/components/Lightbox";
import { moments, endorsement } from "@/data/acts";

function Metrics({ metrics }) {
  return (
    <dl className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5 border-t border-line pt-5">
      {metrics.map((m) => (
        <div key={m.value}>
          <dt className="metric-value">{m.value}</dt>
          <dd className="metric-label m-0">{m.label}</dd>
        </div>
      ))}
    </dl>
  );
}

function Lesson({ children }) {
  return (
    <p className="mt-6 pl-4 border-l border-sig/60 font-serif italic text-[1.02rem] leading-relaxed text-paper/85">
      {children}
    </p>
  );
}

function MomentHead({ moment, align = "left" }) {
  return (
    <header className={align === "right" ? "lg:text-right" : ""}>
      <p className="eyebrow-mute flex items-center gap-3 flex-wrap" style={align === "right" ? { justifyContent: "flex-end" } : undefined}>
        <span className="act-numeral text-sig text-[0.8rem]">{moment.index}</span>
        <span aria-hidden="true" className="w-6 h-px bg-line inline-block" />
        {moment.org}
      </p>
      <h3 className="display mt-4 text-[clamp(1.9rem,4vw,3.1rem)] text-paper">{moment.title}</h3>
      <p className="mt-2 font-mono text-[0.66rem] tracking-[0.14em] text-faint uppercase">{moment.period}</p>
    </header>
  );
}

function Figure({ image, className = "", ratio = "wide" }) {
  if (!image) return null;
  if (image.uncropped) {
    return (
      <Reveal className={className}>
        <button
          type="button"
          className="art-frame w-full text-left block group"
          onClick={() => openLightbox(image.src, image.alt, image.caption)}
          aria-label={`Inspect: ${image.alt}`}
        >
          <span className="art-frame__plate block aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt} loading="lazy" />
          </span>
        </button>
      </Reveal>
    );
  }
  return (
    <div className={className}>
      <Reveal mask className={`doc-figure doc-figure--${ratio} relative`}>
        <button
          type="button"
          className="absolute inset-0 z-10"
          aria-label={`View photo: ${image.alt}`}
          onClick={() => openLightbox(image.src, image.alt, image.caption)}
        >
          <span className="sr-only">View full size</span>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} loading="lazy" />
      </Reveal>
    </div>
  );
}

export default function JourneyAct() {
  const [m1, m2, m3, m4, m5] = moments;

  return (
    <section id="journey" className="relative scroll-mt-16">
      {/* Act header */}
      <div className="px-5 sm:px-8 lg:px-14 pt-24 lg:pt-32 pb-10 border-t border-line">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Act II — The Journey</p>
              <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] text-paper">
                Experience, <em>documented.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 self-end">
            <Reveal delay={100}>
              <p className="text-mute text-[0.97rem] leading-[1.8] max-w-[60ch]">
                Five moments from the last three years — competitions, production backends,
                corporate intensives, research labs, and lecture halls. Each one changed how I
                build.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 01 — Feature: large image + text */}
      <article id={m1.id} className="px-5 sm:px-8 lg:px-14 py-14 lg:py-20 scroll-mt-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <Reveal mask className="doc-figure doc-figure--wide">
              <button
                type="button"
                className="absolute inset-0 z-10"
                aria-label={`View photo: ${m1.image.alt}`}
                onClick={() => openLightbox(m1.image.src, m1.image.alt, m1.image.caption)}
              >
                <span className="sr-only">View full size</span>
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m1.image.src} alt={m1.image.alt} loading="lazy" />
            </Reveal>
            <Reveal delay={80}>
              <p className="doc-caption">{m1.image.caption}</p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={60}>
              <MomentHead moment={m1} />
              <p className="mt-5 text-mute text-[0.95rem] leading-[1.8]">{m1.lede}</p>
              <Lesson>{m1.lesson}</Lesson>
              <Metrics metrics={m1.metrics} />
            </Reveal>
          </div>
        </div>
      </article>

      {/* 02 — Typographic interlude (no photo) */}
      <article id={m2.id} className="bg-ink-2 scroll-mt-16 border-y border-line">
        <div className="px-5 sm:px-8 lg:px-14 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-3">
              <Reveal>
                <span className="act-numeral block text-sig text-[clamp(3.5rem,7vw,5.5rem)] leading-none opacity-80">
                  {m2.index}
                </span>
              </Reveal>
            </div>
            <div className="lg:col-span-9">
              <Reveal delay={60}>
                <MomentHead moment={m2} />
                <p className="mt-6 text-mute text-[1rem] leading-[1.85] max-w-[68ch]">{m2.lede}</p>
                <Lesson>{m2.lesson}</Lesson>
                <Metrics metrics={m2.metrics} />
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* 03 — Offset: text left, tall image right pushed down */}
      <article id={m3.id} className="px-5 sm:px-8 lg:px-14 py-14 lg:py-24 scroll-mt-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <MomentHead moment={m3} />
              <p className="mt-5 text-mute text-[0.95rem] leading-[1.8]">{m3.lede}</p>
              <Lesson>{m3.lesson}</Lesson>
              <Metrics metrics={m3.metrics} />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:mt-20">
            <Figure image={m3.image} ratio="tall" className="max-w-[24rem] lg:max-w-none" />
            <Reveal delay={80}>
              <p className="doc-caption max-w-[24rem] lg:max-w-none">{m3.image.caption}</p>
            </Reveal>
          </div>
        </div>
      </article>

      {/* 04 — Split: text + uncropped document */}
      <article id={m4.id} className="bg-ink-2 scroll-mt-16 border-y border-line">
        <div className="px-5 sm:px-8 lg:px-14 py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <MomentHead moment={m4} />
                <p className="mt-5 text-mute text-[0.97rem] leading-[1.85]">{m4.lede}</p>
                <Lesson>{m4.lesson}</Lesson>
                <Metrics metrics={m4.metrics} />
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Figure image={m4.image} className="max-w-[30rem] lg:max-w-none lg:ml-auto" />
              <Reveal delay={80}>
                <p className="doc-caption max-w-[30rem] lg:max-w-none lg:ml-auto">{m4.image.caption}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* 05 — Diptych: two documentary images */}
      <article id={m5.id} className="px-5 sm:px-8 lg:px-14 py-14 lg:py-24 scroll-mt-16">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <MomentHead moment={m5} align="left" />
          </Reveal>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-8">
            <div>
              <Figure image={m5.images[0]} ratio="wide" />
              <Reveal delay={60}>
                <p className="doc-caption">{m5.images[0].caption}</p>
              </Reveal>
            </div>
            <div className="sm:mt-10">
              <Figure image={m5.images[1]} ratio="wide" />
              <Reveal delay={140}>
                <p className="doc-caption">{m5.images[1].caption}</p>
              </Reveal>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-mute text-[0.97rem] leading-[1.8]">{m5.lede}</p>
                <Lesson>{m5.lesson}</Lesson>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <Metrics metrics={m5.metrics} />
              </Reveal>
            </div>
          </div>
        </div>
      </article>

      {/* Endorsement */}
      <div className="px-5 sm:px-8 lg:px-14 pb-20 lg:pb-28">
        <Reveal className="max-w-[1400px] mx-auto border-t border-line pt-12 lg:pt-16">
          <figure className="max-w-[62ch]">
            <blockquote className="pull-quote">“{endorsement.text}”</blockquote>
            <figcaption className="mt-6 font-mono text-[0.66rem] leading-relaxed tracking-[0.12em] uppercase text-faint">
              {endorsement.author}
              <br />
              <span className="text-sig">{endorsement.role}</span>
            </figcaption>
          </figure>
          <div className="mt-10">
            <button className="btn-ghost" onClick={() => scrollToSection("proof")}>
              Continue to the proof <span aria-hidden="true">↓</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

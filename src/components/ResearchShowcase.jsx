"use client";
import Reveal from "@/components/Reveal";
import ChapterReveal from "@/components/ChapterReveal";
import { openLightbox } from "@/components/Lightbox";

/* Lightweight inline research glyphs — no icon dependency, currentColor stroke. */
const GLYPHS = {
  atom: (
    <>
      <circle cx="12" cy="12" r="1.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.3" transform="rotate(120 12 12)" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6" />
      <path d="M10 3v6l-5.1 9A2 2 0 0 0 6.6 21h10.8a2 2 0 0 0 1.7-3L13 9V3" />
      <path d="M7.6 14.5h8.8" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M11 6.3 5.7 17M13 6.3 18.3 17M7 19h10" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V11M10 20V5M16 20v-6.5M22 20H2" />
    </>
  ),
  microscope: (
    <>
      <path d="M6 21h12" />
      <path d="M9 21a6 6 0 0 0 9.2-7" />
      <path d="M12.5 3.5 16 7l-4.2 4.2-3.5-3.5z" />
      <path d="M7.2 15.2h4.6" />
    </>
  ),
  orbit: (
    <>
      <circle cx="12" cy="12" r="3.1" />
      <ellipse cx="12" cy="12" rx="10" ry="4.6" transform="rotate(-24 12 12)" />
      <circle cx="20.1" cy="8.4" r="1.3" />
    </>
  ),
  molecule: (
    <>
      <circle cx="12" cy="12" r="1.9" />
      <circle cx="12" cy="3.7" r="1.5" />
      <circle cx="19.2" cy="16.2" r="1.5" />
      <circle cx="4.8" cy="16.2" r="1.5" />
      <path d="M12 10.1V5.3M13.6 13.2l4.2 2.4M10.4 13.2 6.2 15.6" />
    </>
  ),
};

/* Atmospheric field: edge-weighted so the certificate never sits behind clutter.
 * `tier` controls how much survives on smaller screens (base / md / lg). */
const FLOATING = [
  { glyph: "atom", top: "8%", left: "4%", size: 46, dur: "24s", delay: "-2s", spin: 5, tier: "" },
  { glyph: "orbit", top: "30%", left: "93%", size: 34, dur: "21s", delay: "-8s", spin: -6, tier: "lg" },
  { glyph: "network", top: "70%", left: "3%", size: 42, dur: "27s", delay: "-4s", spin: 4, tier: "md" },
  { glyph: "molecule", top: "88%", left: "20%", size: 34, dur: "23s", delay: "-11s", spin: -5, tier: "" },
  { glyph: "flask", top: "82%", left: "55%", size: 40, dur: "29s", delay: "-6s", spin: 6, tier: "md" },
  { glyph: "chart", top: "12%", left: "62%", size: 34, dur: "26s", delay: "-14s", spin: -4, tier: "lg" },
  { glyph: "microscope", top: "58%", left: "96%", size: 36, dur: "31s", delay: "-3s", spin: 3, tier: "lg" },
  { glyph: "orbit", top: "94%", left: "78%", size: 30, dur: "25s", delay: "-9s", spin: -3, tier: "" },
];

function FloatingField() {
  return (
    <div className="research__field" aria-hidden="true">
      <span className="research__orbit research__orbit--a" />
      <span className="research__orbit research__orbit--b" />
      {FLOATING.map((n, i) => (
        <span
          key={`${n.glyph}-${i}`}
          className={`research__icon${n.tier ? ` research__icon--${n.tier}` : ""}`}
          style={{
            top: n.top,
            left: n.left,
            width: n.size,
            height: n.size,
            "--drift-dur": n.dur,
            "--drift-delay": n.delay,
            "--drift-spin": `${n.spin}deg`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            {GLYPHS[n.glyph]}
          </svg>
        </span>
      ))}
    </div>
  );
}

export default function ResearchShowcase({ section, index }) {
  const { certificate, paper, context } = section;

  const openCertificate = () =>
    openLightbox(certificate.image, paper.title, `${paper.author} · ${paper.venue}`);

  const details = [
    { label: "Paper", value: paper.title },
    { label: "Field", value: paper.field },
    { label: "Author", value: paper.author },
    { label: "Programme", value: paper.programme },
    paper.venue && { label: "Conference", value: paper.venue },
    paper.status && { label: "Status", value: paper.status },
  ].filter(Boolean);

  return (
    <section id={section.id} className="portfolio-section research">
      <FloatingField />

      <div className="portfolio-section__index">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <ChapterReveal as="span" variant="rule" className="portfolio-section__rule" aria-hidden="true" />
        <span>{section.eyebrow}</span>
      </div>

      <div className="research__grid">
        <div className="research__info">
          <ChapterReveal variant="editorial">
            <p className="eyebrow">{section.eyebrow}</p>
            <h2 className="display research__title">{section.title}</h2>
          </ChapterReveal>

          <Reveal delay={120}>
            <p className="research__summary">{section.summary}</p>
          </Reveal>

          <Reveal delay={180}>
            <dl className="research__meta">
              {details.map((d) => (
                <div key={d.label} className="research__meta-row">
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {context ? (
            <Reveal delay={220}>
              <figure className="research__context">
                <button
                  type="button"
                  className="research__context-figure"
                  onClick={() => openLightbox(context.image, context.caption, paper.programme)}
                  aria-label={`View image: ${context.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={context.image} alt={context.alt} loading="lazy" />
                </button>
                <figcaption>{context.caption}</figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>

        <ChapterReveal variant="gallery" className="research__cert">
          <figure className="research__frame">
            <button
              type="button"
              className="research__frame-hit"
              onClick={openCertificate}
              aria-label={`View certificate full size: ${paper.title}`}
            />
            <span className="research__plate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={certificate.image} alt={certificate.alt} loading="lazy" />
            </span>
            <span className="research__frame-mark research__frame-mark--tl" aria-hidden="true" />
            <span className="research__frame-mark research__frame-mark--br" aria-hidden="true" />
          </figure>
          <figcaption className="research__cert-caption">
            <span>{certificate.caption}</span>
            <button type="button" className="research__view" onClick={openCertificate}>
              View full size <span aria-hidden="true">↗</span>
            </button>
          </figcaption>
        </ChapterReveal>
      </div>
    </section>
  );
}

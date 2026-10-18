"use client";
import Reveal from "@/components/Reveal";
import { openLightbox } from "@/components/Lightbox";
import { experienceEntries } from "@/data/portfolio";

function Gallery({ entry }) {
  const [main, ...rest] = entry.gallery;
  const openMain = () => openLightbox(main.src, main.alt, entry.organization);

  return (
    <div className="portfolio-section__media experience-card__media">
      <Reveal mask className={`doc-figure doc-figure--tall${main.plate ? " doc-figure--plate" : ""}`}>
        <button
          type="button"
          className="absolute inset-0 z-10"
          aria-label={`View full size: ${main.alt}`}
          onClick={openMain}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={main.src} alt={main.alt} loading="lazy" />
      </Reveal>
      {rest.length ? (
        <Reveal delay={120}>
          <ul className="evidence-cards">
            {rest.map((item) => (
              <li key={item.src}>
                <button
                  type="button"
                  className={`evidence-card${item.fit === "contain" ? " evidence-card--contain" : ""}`}
                  onClick={() => openLightbox(item.src, item.alt, entry.organization)}
                  aria-label={`View full size: ${item.alt}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.alt} loading="lazy" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="portfolio-section">
      <div className="portfolio-section__index">
        <span>01</span>
        <span className="portfolio-section__rule" aria-hidden="true" />
        <span>EXPERIENCE — ORGANIZATIONS</span>
      </div>

      <Reveal>
        <h2 className="display portfolio-section__title">Experience.</h2>
        <p className="portfolio-section__summary">
          Two mandates, one through-line: building AI communities and the organizational work
          that keeps them moving.
        </p>
      </Reveal>

      <div className="experience-timeline">
        {experienceEntries.map((entry) => (
          <article key={entry.id} id={entry.id} className="experience-card">
            <header className="experience-card__head">
              <Reveal>
                <p className="eyebrow">{entry.organization}</p>
              </Reveal>
              <Reveal delay={70}>
                <h3 className="display experience-card__role">{entry.role}</h3>
              </Reveal>
              <Reveal delay={130}>
                <p className="experience-card__meta">
                  <span>{entry.location}</span>
                  <span aria-hidden="true">·</span>
                  <span className="experience-card__period">{entry.period}</span>
                </p>
              </Reveal>
            </header>

            <div className="portfolio-section__grid experience-card__grid">
              <div>
                <Reveal delay={80}>
                  <p className="portfolio-section__summary">{entry.description}</p>
                </Reveal>
                <Reveal delay={150}>
                  <ul className="portfolio-section__details">
                    {entry.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
              <Gallery entry={entry} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

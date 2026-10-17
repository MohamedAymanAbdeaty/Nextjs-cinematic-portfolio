"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import Lightbox, { openLightbox } from "@/components/Lightbox";
import Reveal from "@/components/Reveal";
import StoryChat from "@/components/StoryChat";
import { site } from "@/data/profile";
import { portfolioProjects, portfolioSections } from "@/data/portfolio";
import { certifications, certCategories } from "@/data/certifications";

const FEATURED_CERTS = ["v-utokyo", "v-samsung", "v-msc", "v-future-aws", "v-nvidia-llm", "v-shell"];

function Media({ section }) {
  if (!section.image) return null;
  return (
    <>
      <Reveal mask className={`doc-figure doc-figure--tall${section.imagePlate ? " doc-figure--plate" : ""}`}>
        <button
          type="button"
          className="absolute inset-0 z-10"
          aria-label={`View ${section.imageAlt} full size`}
          onClick={() => openLightbox(section.image, section.imageAlt, section.organization)}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={section.image} alt={section.imageAlt} loading="lazy" />
      </Reveal>
      {section.evidence?.length ? (
        <Reveal delay={120}>
          <ul className="evidence-cards">
            {section.evidence.map((item) => (
              <li key={item.src}>
                <button
                  type="button"
                  className="evidence-card"
                  onClick={() => openLightbox(item.src, item.label, section.organization)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.src} alt={item.label} loading="lazy" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}
    </>
  );
}

function ExperienceSection({ section, index }) {
  return (
    <section id={section.id} className="portfolio-section">
      <div className="portfolio-section__index">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="portfolio-section__rule" aria-hidden="true" />
        <span>{section.eyebrow}</span>
      </div>
      <div className="portfolio-section__grid">
        <div>
          <Reveal>
            <h2 className="display portfolio-section__title">{section.title}</h2>
            <p className="portfolio-section__organization">{section.organization}</p>
            <p className="portfolio-section__period">{section.period}</p>
            <p className="portfolio-section__summary">{section.summary}</p>
            <ul className="portfolio-section__details">
              {section.details.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </Reveal>
        </div>
        <div className="portfolio-section__media">
          {section.image ? <Media section={section} /> : <div className="portfolio-section__signal" aria-hidden="true">The work is the evidence.</div>}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  const featured = FEATURED_CERTS.map((id) => certifications.find((c) => c.id === id)).filter(Boolean);
  return (
    <section id="certifications" className="portfolio-section portfolio-section--proof">
      <div className="portfolio-section__index">
        <span>09</span>
        <span className="portfolio-section__rule" aria-hidden="true" />
        <span>PROOF // CREDENTIALS</span>
      </div>
      <div className="portfolio-section__grid">
        <div>
          <Reveal>
            <p className="eyebrow">VERIFIED LEARNING</p>
            <h2 className="display portfolio-section__title">Curated evidence, not a wall.</h2>
            <p className="portfolio-section__summary">
              21 verified credentials, grouped by what they prove. Six are featured below because
              they mark the largest jumps; every original document stays one click away, uncropped
              and readable.
            </p>
            <ul className="cert-groups">
              {certCategories.filter((c) => c.key !== "all").map((c) => (
                <li key={c.key}><span>{c.label}</span><span>{String(c.count).padStart(2, "0")}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="portfolio-section__media portfolio-section__media--certs">
          <div className="cred-grid">
            {featured.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 60}>
                <button
                  type="button"
                  className="cred-card"
                  onClick={() => openLightbox(cert.image, cert.name, `${cert.issuer} · ${cert.date}`)}
                >
                  <span className="cred-card__plate">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cert.image} alt={cert.name} loading="lazy" />
                  </span>
                  <span className="cred-card__kicker">{cert.issuer}</span>
                  <span className="cred-card__name">{cert.name}</span>
                  <span className="cred-card__date">{cert.date}</span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: reduce ? 1 : 0.1, smoothWheel: !reduce, wheelMultiplier: 1 });
    window.__lenis = lenis;
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.__lenis = undefined;
    };
  }, []);

  return (
    <main className="relative">
      <div className="vignette" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
      <Cursor />
      <Navbar />
      <StoryChat />
      <Lightbox />
      <div className="relative z-10">
        <section id="identity" className="portfolio-hero">
          <div className="portfolio-hero__copy">
            <Reveal><p className="eyebrow">WHO AM I</p></Reveal>
            <Reveal delay={90}>
              <h1 className="display portfolio-hero__title">
                I build AI systems<br />that <em>hold up.</em>
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="portfolio-hero__lede">
                Grounded retrieval instead of guesswork. Agents that refuse to answer without
                evidence. Infrastructure you can re-apply with a single command — across AI
                engineering, research, and technical leadership.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="portfolio-hero__meta">
                <span>AI Engineer — ELITE.Org &amp; Sprints</span>
                <span>Data Science — University of Tokyo</span>
                <span>Head of AI — Microsoft Student Club</span>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <a className="btn-solid" href="#microsoft">Enter the experience <span aria-hidden="true">↓</span></a>
            </Reveal>
          </div>
          <div className="portfolio-hero__media">
            <Reveal mask className="hero-figure">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.heroFigure} alt={`${site.name} speaking with a microphone at a student session`} fetchPriority="high" />
            </Reveal>
            <p className="doc-caption">Cairo &amp; New Mansoura, Egypt — in front of the room, and inside the system.</p>
            <p className="hero-cue" aria-hidden="true">SCROLL TO EXPLORE <span>↓</span></p>
          </div>
        </section>

        <section className="portfolio-intro">
          <p className="eyebrow">THE THREAD</p>
          <h2 className="display">From the room where ideas are taught to the systems where they have to hold.</h2>
          <p>Each chapter below keeps a role, an organization, and an image in their proper place. The visual language is borrowed from editorial storytelling; the evidence is Mohamed&rsquo;s own.</p>
        </section>

        {portfolioSections.map((section, index) => <ExperienceSection key={section.id} section={section} index={index} />)}

        <Certifications />

        <section id="projects" className="portfolio-section">
          <div className="portfolio-section__index">
            <span>10</span>
            <span className="portfolio-section__rule" aria-hidden="true" />
            <span>SELECTED PROJECTS</span>
          </div>
          <div className="portfolio-section__grid">
            <div>
              <Reveal>
                <p className="eyebrow">10 // SELECTED BUILDS</p>
                <h2 className="display portfolio-section__title">Systems that explain themselves.</h2>
                <p className="portfolio-section__summary">
                  Selected for range: cloud AI infrastructure, agentic workflows with guardrails,
                  and kernel-level systems code. Each line links to the repository — nothing is
                  claimed beyond what the code shows.
                </p>
              </Reveal>
            </div>
            <div className="portfolio-section__media portfolio-section__media--certs">
              <ul className="project-list">
                {portfolioProjects.map((project) => (
                  <li key={project.title}>
                    <a className="project-row" href={project.href} target="_blank" rel="noopener noreferrer">
                      {project.image ? (
                        <span className="project-row__thumb">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={project.image} alt={project.alt || ""} loading="lazy" />
                        </span>
                      ) : (
                        <span className="project-row__thumb project-row__thumb--empty" aria-hidden="true">↗</span>
                      )}
                      <span className="project-row__body">
                        <strong>{project.title}</strong>
                        <small>{project.type}</small>
                        <span className="project-row__description">{project.description}</span>
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="next" className="portfolio-contact">
          <div>
            <p className="eyebrow">11 // THE NEXT CHAPTER</p>
            <h2 className="display">Let&rsquo;s build something that can be trusted.</h2>
            <p>Open to AI engineering roles, research collaboration, and focused product work.</p>
          </div>
          <div className="portfolio-contact__links">
            <a className="btn-solid" href={`mailto:${site.email}`}>Start a conversation ↗</a>
            <a className="btn-ghost" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="btn-ghost" href={site.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="btn-ghost" href="/about">About</a>
            <a className="btn-ghost" href="/contact">Contact page</a>
          </div>
        </section>
        <footer className="portfolio-footer"><span>{site.copyright}</span><span>{site.email}</span></footer>
      </div>
    </main>
  );
}

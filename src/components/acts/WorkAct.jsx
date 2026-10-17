"use client";
import Reveal, { scrollToSection } from "@/components/Reveal";
import { featuredWork, supportingWork } from "@/data/acts";

function CaseStudy({ item, index, flip = false }) {
  const p = item.project;
  return (
    <article
      className={`py-16 lg:py-24 border-t border-line scroll-mt-16 ${flip ? "" : ""}`}
      id={`work-${item.id}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Header */}
        <div className={`lg:col-span-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4`}>
          <Reveal className={flip ? "lg:order-2 lg:text-right" : ""}>
            <p className="case-index flex items-center gap-3 lg:justify-end" style={flip ? { justifyContent: "flex-end" } : undefined}>
              <span className="act-numeral text-[0.8rem]">0{index + 1}</span>
              <span aria-hidden="true" className="w-6 h-px bg-line inline-block" />
              {item.role}
            </p>
            <h3 className={`case-title mt-4 text-paper ${flip ? "lg:ml-auto" : ""}`}>{p.title}</h3>
          </Reveal>
          <Reveal delay={90} className={flip ? "lg:order-1" : ""}>
            <a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Repository <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>

        {/* Problem */}
        <div className="lg:col-span-5">
          <Reveal delay={60}>
            <h4 className="eyebrow-mute text-faint">The problem</h4>
            <p className="mt-3 text-mute text-[0.97rem] leading-[1.8] max-w-[46ch]">{item.problem}</p>

            <h4 className="eyebrow-mute text-faint mt-8">Stack</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5 list-none p-0 m-0">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="font-mono text-[0.62rem] tracking-wide border border-line text-mute px-2.5 py-1"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Decisions + outcomes */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={120}>
            <h4 className="eyebrow-mute text-faint">Engineering decisions</h4>
            <ul className="case-decisions mt-3 list-none p-0 space-y-2.5">
              {item.decisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>

            <h4 className="eyebrow-mute text-faint mt-8">Outcomes</h4>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
              {item.outcome.map((o) => (
                <li key={o} className="border-t border-sig/50 pt-3 text-paper text-[0.9rem] leading-snug">
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Impact line from source data */}
        <div className="lg:col-span-12">
          <Reveal delay={160}>
            <p className="font-mono text-[0.66rem] tracking-[0.1em] text-faint border-t border-line pt-4">
              <span className="text-sig">Measured: </span>
              {p.impact}
            </p>
          </Reveal>
        </div>
      </div>
    </article>
  );
}

export default function WorkAct() {
  return (
    <section id="work" className="relative scroll-mt-16 px-5 sm:px-8 lg:px-14 pt-24 lg:pt-32">
      <div className="max-w-[1400px] mx-auto">
        {/* Act header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-4">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Act IV — The Work</p>
              <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] text-paper">
                Three systems, <em>in depth.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <Reveal delay={100}>
              <p className="text-mute text-[0.97rem] leading-[1.8] max-w-[58ch]">
                Selected for range: cloud AI infrastructure, agentic workflows with guardrails,
                and kernel-level systems code. Each case states the problem, the decisions, and
                what was measured — nothing invented beyond the repository.
              </p>
            </Reveal>
          </div>
        </div>

        {featuredWork.map((item, i) => (
          <CaseStudy key={item.id} item={item} index={i} flip={i % 2 === 1} />
        ))}

        {/* Supporting work */}
        <div className="border-t border-line py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <Reveal>
              <h3 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-faint">
                Supporting projects
              </h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-mute">
                Three more builds with the same engineering standards, in compact form.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            {supportingWork.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-b border-line py-6 transition-colors hover:border-sig/50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-baseline">
                    <div className="md:col-span-4">
                      <span className="block font-serif text-[1.3rem] leading-tight text-paper group-hover:text-sig transition-colors">
                        {p.title}
                      </span>
                      <span className="block mt-1 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-faint">
                        {p.category}
                      </span>
                    </div>
                    <p className="md:col-span-6 text-[0.88rem] leading-relaxed text-mute m-0">
                      {p.description}
                    </p>
                    <div className="md:col-span-2 md:text-right">
                      <span className="block font-mono text-[0.66rem] text-sig">View repo ↗</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="pb-16">
          <Reveal>
            <button className="btn-ghost" onClick={() => scrollToSection("next")}>
              The next chapter <span aria-hidden="true">↓</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

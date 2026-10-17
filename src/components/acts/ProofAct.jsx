"use client";
import Reveal from "@/components/Reveal";
import { openLightbox } from "@/components/Lightbox";
import { featuredCredentials, proofGroups, certTotal } from "@/data/acts";
import { certById } from "@/data/certifications";

export default function ProofAct() {
  return (
    <section id="proof" className="relative scroll-mt-16 px-5 sm:px-8 lg:px-14 py-24 lg:py-32 border-t border-line">
      <div className="max-w-[1400px] mx-auto">
        {/* Act header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Act III — The Proof</p>
              <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.8rem)] text-paper">
                Curated evidence, <em>not a wall.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 self-end">
            <Reveal delay={100}>
              <p className="text-mute text-[0.97rem] leading-[1.8] max-w-[58ch]">
                {certTotal} verified credentials, grouped by what they prove. Four are featured
                below because they mark the largest jumps; the rest are one click away, uncropped
                and readable.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Featured credentials */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
          {featuredCredentials.map((f, i) => {
            const cert = certById[f.id];
            return (
              <Reveal key={f.id} delay={i * 90}>
                <button
                  type="button"
                  onClick={() => openLightbox(cert.image, cert.name, `${cert.issuer} • ${cert.date}`)}
                  className="art-frame w-full text-left block h-full group"
                  aria-label={`Inspect credential: ${cert.name}`}
                >
                  <span className="art-frame__plate block aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cert.image} alt={cert.name} loading="lazy" />
                  </span>
                  <span className="block mt-4">
                    <span className="eyebrow-mute block text-sig">{f.kicker}</span>
                    <span className="block mt-2 font-semibold text-[0.95rem] leading-snug text-paper">
                      {cert.name}
                    </span>
                    <span className="block mt-1.5 font-mono text-[0.65rem] tracking-wide text-faint">
                      {cert.issuer} · {cert.date}
                    </span>
                    <span className="block mt-3 text-[0.82rem] leading-relaxed text-mute">{f.blurb}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Compact supporting collection */}
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <Reveal>
              <h3 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-faint">
                Supporting credentials
              </h3>
              <p className="mt-3 text-[0.85rem] leading-relaxed text-mute">
                Everything else, grouped. Click any row to inspect the original document.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {proofGroups.map((group, gi) => (
              <Reveal key={group.key} delay={gi * 70}>
                <div>
                  <div className="flex items-baseline justify-between border-b border-line pb-2">
                    <h4 className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-sig">
                      {group.label}
                    </h4>
                    <span className="font-mono text-[0.62rem] text-faint">
                      {group.certs.length}
                    </span>
                  </div>
                  <ul className="mt-1 list-none p-0 m-0">
                    {group.certs.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          className="cert-row group"
                          onClick={() => openLightbox(c.image, c.name, `${c.issuer} • ${c.date}`)}
                          aria-label={`Inspect: ${c.name}`}
                        >
                          <span className="min-w-0">
                            <span className="block text-[0.88rem] leading-snug text-paper/90 group-hover:text-paper transition-colors truncate">
                              {c.name}
                            </span>
                            <span className="block font-mono text-[0.62rem] tracking-wide text-faint truncate mt-0.5">
                              {c.issuer}
                            </span>
                          </span>
                          <span className="font-mono text-[0.62rem] text-faint whitespace-nowrap">
                            {c.date}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

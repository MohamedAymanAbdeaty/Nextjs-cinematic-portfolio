"use client";
import Reveal from "@/components/Reveal";
import { closing } from "@/data/acts";
import { site } from "@/data/profile";

export default function NextAct() {
  return (
    <section id="next" className="relative scroll-mt-16 border-t border-line bg-ink-2">
      <div className="px-5 sm:px-8 lg:px-14 py-24 lg:py-36">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Closing statement */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Act V — The Next Chapter</p>
              <h2 className="display mt-7 text-[clamp(2.4rem,6vw,4.8rem)] text-paper">
                {closing.headline[0]}
                <br />
                <em>{closing.headline[1]}</em>
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-8 max-w-[52ch] text-[1rem] leading-[1.8] text-mute">{closing.body}</p>
              <p className="mt-4 font-mono text-[0.7rem] tracking-[0.1em] text-sig">
                ● {closing.availability}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className="btn-solid" href={`mailto:${site.email}`}>
                  Start a conversation
                </a>
                <a className="btn-ghost" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Channels */}
          <div className="lg:col-span-5">
            <Reveal delay={90}>
              <h3 className="font-mono text-[0.68rem] tracking-[0.2em] uppercase text-faint">
                Direct channels
              </h3>
            </Reveal>
            <div className="mt-4">
              {closing.channels.map((c, i) => (
                <Reveal key={c.label} delay={120 + i * 70}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group block border-t border-line py-4 transition-colors hover:border-sig/50"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-faint group-hover:text-sig transition-colors">
                        {c.label}
                      </span>
                      <span className="font-mono text-[0.62rem] text-faint">{c.note}</span>
                    </span>
                    <span className="block mt-1.5 text-[0.95rem] text-paper break-all">{c.value}</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="px-5 sm:px-8 lg:px-14 border-t border-line">
        <div className="max-w-[1400px] mx-auto py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-paper text-ink flex items-center justify-center font-display font-extrabold text-[0.65rem]">
              {site.monogram}
            </span>
            <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-faint">
              {site.copyright}
            </span>
          </div>
          <nav className="flex items-center gap-5" aria-label="Footer">
            <a className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-faint hover:text-sig transition-colors" href="/about">
              About
            </a>
            <a className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-faint hover:text-sig transition-colors" href="/contact">
              Contact
            </a>
            <a className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-faint hover:text-sig transition-colors" href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-faint hover:text-sig transition-colors" href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </nav>
        </div>
      </footer>
    </section>
  );
}

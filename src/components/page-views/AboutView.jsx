"use client";
import PageShell from "@/components/PageShell";
import Reveal, { scrollToSection } from "@/components/Reveal";
import { about, site } from "@/data/profile";

function rich(text, key) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) =>
    p.startsWith("*") && p.endsWith("*") ? (
      <em key={`${key}-${i}`} className="font-serif not-italic italic text-sig">
        {p.slice(1, -1)}
      </em>
    ) : (
      <span key={`${key}-${i}`}>{p}</span>
    )
  );
}

const SKILL_GROUPS = [
  { title: "Build", items: about.skills.build, tone: "text-sig" },
  { title: "AI & Agents", items: about.skills.ai, tone: "text-sig" },
  { title: "Systems & Cloud", items: about.skills.systems, tone: "text-sig" },
];

export default function AboutView() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        {/* Header */}
        <Reveal>
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.24em] text-sig block mb-4">
            {about.label}
          </span>
          <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white leading-[1.03] max-w-3xl">
            {about.heading[0]}{" "}
            <span className="ghost block">{about.heading[1]}</span>
          </h1>
        </Reveal>

        {/* Card + bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-14">
          <div className="lg:col-span-5">
            <Reveal delay={80}>
              <figure>
                <div className="doc-figure doc-figure--tall rounded-2xl border border-line">
                  <img
                    src={site.portrait}
                    alt={`${site.name} — ${site.location}`}
                    loading="lazy"
                  />
                </div>
                <figcaption className="doc-caption flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="text-paper">{site.name}</span>
                  <span>AI Engineer &amp; Systems Thinker</span>
                </figcaption>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <span className="text-[11px] font-mono text-sig">
                    ● Open to AI roles
                  </span>
                  <a
                    href="/contact"
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-paper text-[11px] font-bold hover:border-sig/60 hover:text-sig transition"
                  >
                    Let&apos;s talk →
                  </a>
                </div>
              </figure>
            </Reveal>

            <Reveal delay={160}>
              <div className="grid grid-cols-2 gap-3 mt-5">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-stage rounded-2xl p-4 hover:-translate-y-1 transition-transform duration-500"
                >
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-faint">
                    GitHub
                  </span>
                  <span className="block text-xs font-bold text-white mt-1">
                    @{site.githubHandle}
                  </span>
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-stage rounded-2xl p-4 hover:-translate-y-1 transition-transform duration-500"
                >
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-faint">
                    LinkedIn
                  </span>
                  <span className="block text-xs font-bold text-white mt-1">/mohamed-ayman-abdelaty</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {about.bio.map((p, i) => (
              <Reveal key={i} delay={60 + i * 60}>
                <p className="text-sm sm:text-base text-mute leading-relaxed">
                  {rich(p, i)}
                </p>
              </Reveal>
            ))}

            <Reveal delay={120}>
              <div className="flex flex-wrap gap-3 pt-3">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-5 py-3 rounded-full bg-paper text-ink text-xs font-bold hover:bg-sig transition"
                >
                  Read the story ↓
                </button>
                <a
                  href={`mailto:${site.email}`}
                  className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-white text-xs font-bold hover:border-sig/60 transition"
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-24">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-8">
              Where I&apos;ve Built <span className="ghost">& Led</span>
            </h2>
          </Reveal>
          <div className="space-y-3">
            {about.experience.map((job, i) => (
              <Reveal key={job.role} delay={i * 70}>
                <div className="glass-stage rounded-2xl p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-start hover:border-white/20 transition">
                  <div className="md:col-span-3">
                    <span className="text-[11px] font-mono text-sig font-bold">
                      {job.period}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-sm font-extrabold text-white">{job.role}</h3>
                    <p className="text-xs text-mute mt-0.5">{job.org}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-xs text-mute leading-relaxed">{job.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white mb-8">
              The Stack <span className="ghost-accent">Behind the Story</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SKILL_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 80}>
                <div className="glass-stage rounded-2xl p-5 h-full">
                  <h3 className={`text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 ${g.tone}`}>
                    {g.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-mute"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

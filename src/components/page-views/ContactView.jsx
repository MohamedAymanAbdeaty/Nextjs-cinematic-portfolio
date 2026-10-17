"use client";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/data/profile";

const CHANNELS = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Fastest for roles & project briefs",
  },
  {
    label: "WhatsApp",
    value: site.phone,
    href: `https://wa.me/${site.whatsapp}`,
    note: "Cairo (GMT+2) — usually quick",
  },
  {
    label: "LinkedIn",
    value: "/mohamed-ayman-abdelaty",
    href: site.linkedin,
    note: "140K+ weekly post reach",
  },
  {
    label: "GitHub",
    value: `@${site.githubHandle}`,
    href: site.github,
    note: "Production systems & research code",
  },
];

export default function ContactView() {
  const [form, setForm] = useState({ name: "", from: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.from ? ` (${form.from})` : ""}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-faint focus:outline-none focus:border-sig/60 transition";

  return (
    <PageShell>
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-24">
        <Reveal>
          <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.24em] text-sig block mb-4">
            {contact.eyebrow}
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl text-paper leading-[1.03] max-w-3xl">
            Let&apos;s build the next system,{" "}
            <em className="italic text-sig">together.</em>
          </h1>
          <p className="text-mute text-sm sm:text-base max-w-2xl mt-5 leading-relaxed">
            {contact.body}
          </p>
          <p className="text-xs font-mono text-sig mt-3">● {contact.availability}</p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14">
          {/* Channels */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 content-start">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.label} delay={i * 70}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="glass-stage rounded-2xl p-5 block h-full hover:-translate-y-1 transition-transform duration-500 group"
                >
                  <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-faint group-hover:text-sig transition-colors">
                    {c.label}
                  </span>
                  <span className="block text-xs font-extrabold text-white mt-2 break-all">
                    {c.value}
                  </span>
                  <span className="block text-[11px] text-faint mt-1.5">{c.note}</span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* Form → mailto */}
          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <form onSubmit={submit} className="glass-stage rounded-3xl p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-faint mb-2">
                      Your name
                    </span>
                    <input
                      required
                      className={field}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-faint mb-2">
                      Email or company
                    </span>
                    <input
                      className={field}
                      value={form.from}
                      onChange={(e) => setForm({ ...form, from: e.target.value })}
                      placeholder="jane@company.com"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-faint mb-2">
                    What are we building?
                  </span>
                  <textarea
                    required
                    rows={5}
                    className={`${field} resize-none`}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Multi-agent RAG workflow, cloud backend, AI product, research collab…"
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <span className="text-[11px] font-mono text-faint">
                    Opens your mail client — no middlemen.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-white text-ink-2 text-xs font-extrabold hover:bg-sig transition"
                  >
                    Send message →
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

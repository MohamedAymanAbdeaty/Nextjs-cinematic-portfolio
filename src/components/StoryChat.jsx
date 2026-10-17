"use client";
import { useEffect, useRef, useState } from "react";
import { chat, matchAnswer } from "@/data/chat";
import { site } from "@/data/profile";

export default function StoryChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: chat.welcome },
  ]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("chat:open", onOpen);
    return () => window.removeEventListener("chat:open", onOpen);
  }, []);

  const send = (text) => {
    const value = String(text || "").trim();
    if (!value) return;
    setMessages((m) => [...m, { from: "user", text: value }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: matchAnswer(value) }]);
    }, 400);
  };

  return (
    <>
      {/* Floating action */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 px-4 py-2.5 rounded-full bg-paper text-ink font-semibold text-[0.72rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-sig transition-colors flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-sig" aria-hidden="true" />
        Ask Mohamed
      </button>

      {/* Drawer */}
      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-96 bg-ink/95 backdrop-blur-xl shadow-2xl flex flex-col border-l border-line transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-paper flex items-center justify-center font-display font-bold text-xs text-ink">
              {site.monogram}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm leading-tight text-paper">
                {site.shortName} — Story Guide
              </h3>
              <span className="text-[11px] text-sig">
                ● Online • Ask about any chapter or project
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/5 text-paper text-xs font-bold"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div ref={listRef} className="flex-1 p-4 overflow-y-auto space-y-3 custom-scroll">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[88%] ${
                m.from === "user"
                  ? "bg-paper text-ink rounded-br-none ml-auto font-medium"
                  : "bg-white/5 text-paper/90 rounded-bl-none border border-line"
              }`}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-white/[0.03] border-t border-line flex flex-wrap gap-1.5">
          {chat.quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              className="text-[11px] bg-white/5 border border-line hover:border-sig/70 px-2.5 py-1 rounded-full text-mute font-medium transition"
            >
              {q.length > 30 ? q.slice(0, 28) + "…" : q}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-line flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about any chapter, skill, or project..."
            className="flex-1 text-xs bg-white/5 border border-line rounded-xl px-3 py-2.5 text-paper placeholder:text-faint focus:outline-none focus:border-sig/70 transition"
          />
          <button
            onClick={() => send(input)}
            className="px-4 py-2.5 rounded-xl bg-paper text-ink font-bold text-xs hover:bg-sig transition"
          >
            Send
          </button>
        </div>
      </aside>

      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-[65] bg-ink/70 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

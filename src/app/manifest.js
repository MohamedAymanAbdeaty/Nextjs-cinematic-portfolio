import { site } from "@/data/profile";

export default function manifest() {
  return {
    name: `${site.name} — AI Engineer & Systems Thinker`,
    short_name: site.shortName,
    description:
      "A cinematic five-act portfolio: AI engineering, systems thinking, research and leadership.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a09",
    theme_color: "#0a0a09",
    lang: "en",
    icons: [
      { src: "/favicon.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

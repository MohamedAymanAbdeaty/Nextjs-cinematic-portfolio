import { site } from "@/data/profile";

const BASE = site.baseUrl;

export default function sitemap() {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];
}

import { Syne, Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/profile";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const BASE = site.baseUrl;

export const viewport = {
  themeColor: "#080808",
};

export const metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: "Mohamed Ayman Abdelaty — AI Engineer, Multi-Agent RAG Architect & Polymath",
    template: "%s — Mohamed Ayman Abdelaty",
  },
  description:
    "The cinematic scrollytelling portfolio of Mohamed Ayman Abdelaty — AI Engineer, Multi-Agent RAG Architect and Polymath. Five acts, 21 verified credentials, three in-depth case studies.",
  keywords: [
    "Mohamed Ayman Abdelaty",
    "AI Engineer",
    "Multi-Agent RAG Architect",
    "LangGraph",
    "AWS Bedrock",
    "Systems Thinker",
    "Polymath",
    "Next.js Portfolio",
    "Cinematic Scrollytelling",
  ],
  authors: [{ name: site.name, url: BASE }],
  creator: site.name,
  publisher: site.name,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: `${site.name} — AI Engineer & Systems Thinker`,
    title: `${site.name} — AI Engineer, Multi-Agent RAG Architect & Polymath`,
    description:
      "A cinematic five-act portfolio covering AI engineering, systems thinking, research and leadership.",
    images: [
      {
        url: "/images/photo_samsung_cohort.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — AI Engineer`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Engineer & Systems Thinker`,
    description:
      "Cinematic five-act portfolio: AI engineering, 21 verified credentials, three in-depth case studies.",
    images: ["/images/photo_samsung_cohort.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: "/favicon.png",
  },

  alternates: { canonical: BASE },
  category: "portfolio",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE}/#person`,
      name: site.name,
      url: BASE,
      jobTitle: "AI Engineer",
      description:
        "AI Engineer, Multi-Agent RAG Architect and Polymath. Graduate of The University of Tokyo's Matsuo-Iwasawa Laboratory and Head of AI at Microsoft Student Club.",
      knowsAbout: [
        "Artificial Intelligence",
        "Retrieval-Augmented Generation",
        "Multi-Agent Systems",
        "LangGraph",
        "Amazon Bedrock",
        "Terraform",
        "PostgreSQL",
        "Systems Thinking",
        "Software Engineering",
        "Data Science",
      ],
      sameAs: [site.linkedin, site.github],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
      email: `mailto:${site.email}`,
    },
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: `${site.name} — Portfolio`,
      description:
        "Cinematic scrollytelling portfolio of Mohamed Ayman Abdelaty, AI Engineer and Systems Thinker.",
      publisher: { "@id": `${BASE}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM-readable site info" />
      </head>
      <body>{children}</body>
    </html>
  );
}

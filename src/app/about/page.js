import AboutView from "@/components/page-views/AboutView";

export const metadata = {
  title: "About",
  description:
    "Mohamed Ayman Abdelaty — AI Engineer, Multi-Agent RAG Architect and Polymath. Graduate of The University of Tokyo's Matsuo-Iwasawa Lab, Head of AI at Microsoft Student Club.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Mohamed Ayman Abdelaty, AI Engineer & Systems Thinker",
    description:
      "The engineer behind the chapters: background, experience, skills and the route from C++ and databases to multi-agent AI.",
  },
};

export default function Page() {
  return <AboutView />;
}

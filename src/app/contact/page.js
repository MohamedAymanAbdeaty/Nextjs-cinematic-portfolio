import ContactView from "@/components/page-views/ContactView";

export const metadata = {
  title: "Contact",
  description:
    "Contact Mohamed Ayman Abdelaty for AI engineering roles, research collaboration, or select freelance builds — email, WhatsApp, LinkedIn or GitHub.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Mohamed Ayman Abdelaty, AI Engineer",
    description:
      "Open to AI engineering roles, research collaboration, and select freelance builds. Fast response via email or WhatsApp.",
  },
};

export default function Page() {
  return <ContactView />;
}

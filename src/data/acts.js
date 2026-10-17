import { chapters } from "./chapters";
import { projects } from "./projects";
import { certifications, certCategories, certById } from "./certifications";
import { contact, site } from "./profile";

const ch = (id) => chapters.find((c) => c.id === id);
const proj = (id) => projects.find((p) => p.id === id);

/* ── ACT I — Identity ──────────────────────────────────────────── */
export const identity = {
  eyebrow: "AI Engineer — Cairo & New Mansoura, Egypt",
  headline: ["I engineer AI systems", "that hold up", "in production."],
  philosophy:
    "Grounded retrieval instead of vibes. Agents that refuse to answer without evidence. Infrastructure you can re-apply with a single command. I work across AI engineering, software engineering, research, and technical leadership — and the evidence for each is below.",
  meta: [
    "AI Engineer — ELITE.Org & Sprints",
    "Data Science — University of Tokyo, Matsuo-Iwasawa Lab",
    "Head of AI — Microsoft Student Club, NMU",
    "Co-author — IEEE MIUCC26 research",
  ],
  image: "/images/photo_microsoft_stage.jpg",
  imageAlt: "Mohamed Ayman leading an AI workshop at New Mansoura University",
  imageCaption: "Weekly AI session — Microsoft Student Club, New Mansoura University",
  ctaPrimary: "See the work",
  ctaSecondary: "Get in touch",
};

/* ── ACT II — Journey ──────────────────────────────────────────── */
export const moments = [
  {
    id: "moment-foundation",
    index: "01",
    layout: "feature",
    title: "The algorithmic crucible",
    org: "Samsung Innovation Campus — Top 5% nationwide",
    period: ch("chapter-1").period,
    lede:
      "Two hundred hours of C++, object-oriented programming, dynamic programming, and capstone pitching — selected into 70 scholars from thousands of applicants across Egypt.",
    lesson:
      "Discipline under complexity constraints. Every system I build since still rests on that foundation.",
    image: {
      src: "/images/photo_samsung_team.jpg",
      alt: "Presenting at Samsung Innovation Campus with capstone teammates",
      caption:
        "Capstone teammates in front of the 'Meet Our Team' wall — Ministry of Communications, Smart Village.",
    },
    metrics: ch("chapter-1").metrics,
  },
  {
    id: "moment-backend",
    index: "02",
    layout: "text",
    title: "Architecting the backbone",
    org: "ITI — Back-End Developer Intern",
    period: ch("chapter-2").period,
    lede:
      "Unoptimized schemas and N+1 ORM queries pushed response times past 3.2 seconds on a platform serving 500+ users. I refused to treat the database as a black box — T-SQL at ITI, IBM's relational theory, Redis caching, and query-level surgery down to 1.4 seconds.",
    lesson:
      "Relational rigor is not legacy knowledge. It is what makes vector databases, message queues, and production RAG possible.",
    metrics: ch("chapter-2").metrics,
  },
  {
    id: "moment-shell",
    index: "03",
    layout: "offset",
    title: "Systems thinking at Shell HQ",
    org: "Shell NXplorers Pro — New Cairo",
    period: "Nov 26–29, 2025 · Full-time intensive",
    lede:
      "Three full-time days mapping causal loops, leverage points, and twenty-year scenarios across the water-energy-food nexus — with cross-disciplinary innovators at Shell's headquarters.",
    lesson:
      "Before I architect an agent or data pipeline, I map its second-order effects on users, latency, cost, and sustainability.",
    image: {
      src: "/images/photo_shell_award.jpg",
      alt: "Receiving the Shell NXplorers Pro certification onstage",
      caption: "Certified onstage by Shell Egypt leadership — New Cairo, November 2025.",
    },
    metrics: ch("chapter-3").metrics,
  },
  {
    id: "moment-research",
    index: "04",
    layout: "split",
    title: "Research frontier — Tokyo & IEEE",
    org: "University of Tokyo, Matsuo-Iwasawa Lab · IEEE MIUCC26",
    period: ch("chapter-5").period,
    lede:
      "Graduate-level data science inside U-Tokyo's Matsuo-Iwasawa Laboratory — and, with peers at New Mansoura University, co-authoring research on seasonal pattern discovery across 19,000+ search terms using the Kepler Optimization Algorithm, presented at IEEE MIUCC26.",
    lesson:
      "Competing at international research standards raised the bar for everything I ship afterwards.",
    image: {
      src: "/images/cert_utokyo_gci.jpg",
      alt: "University of Tokyo GCI World completion certificate",
      caption: "Signed by Prof. Yutaka Matsuo and Prof. Yusuke Iwasawa — August 2026.",
      uncropped: true,
    },
    metrics: ch("chapter-5").metrics,
  },
  {
    id: "moment-lead",
    index: "05",
    layout: "diptych",
    title: "Leading & multiplying builders",
    org: "Microsoft Student Club · Creativa Innovation Hub",
    period: "2025 — Present",
    lede:
      "A 12-week AI roadmap for 30+ members, weekly lectures from ELIZA to vibe coding, and three 100+ attendee workshops at Creativa — plus 140,066 weekly impressions writing about the work in public.",
    lesson:
      "Teaching forces clarity. If I cannot explain it to a first-year student, I do not understand it yet.",
    images: [
      {
        src: "/images/portrait.jpg",
        alt: "Mohamed Ayman speaking at a Microsoft Student Club session at New Mansoura University",
        caption: "In front of the room — Microsoft Student Club, New Mansoura University.",
      },
      {
        src: "/images/photo_creativa_volunteer.jpg",
        alt: "Volunteering at Creativa Innovation Hub",
        caption: "On the ground at Creativa Innovation Hub — Mansoura.",
      },
    ],
    metrics: ch("chapter-6").metrics,
  },
];

export const endorsement = ch("chapter-6").quote;

/* ── ACT III — Proof ───────────────────────────────────────────── */
export const featuredCredentials = [
  {
    id: "v-utokyo",
    kicker: "Graduate research tier",
    blurb:
      "Seven months inside the Matsuo-Iwasawa Laboratory's GCI World program — machine learning, exploratory data analysis, and data-driven strategy.",
  },
  {
    id: "v-samsung",
    kicker: "Selection & discipline",
    blurb:
      "Top 5% of applicants nationwide: 70 scholars, 200 intensive hours, three capstones pitched to technical juries.",
  },
  {
    id: "v-nvidia-llm",
    kicker: "Applied GenAI",
    blurb:
      "NVIDIA Deep Learning Institute — large-language-model workflows taken from notebook to production habits.",
  },
  {
    id: "v-future-aws",
    kicker: "Cloud AI",
    blurb:
      "Udacity & AWS Future AI Engineer scholarship — selected among 1,500 learners worldwide.",
  },
];

const featuredIds = new Set(featuredCredentials.map((c) => c.id));

export const proofGroups = certCategories
  .filter((c) => c.key !== "all")
  .map((cat) => ({
    key: cat.key,
    label: cat.label,
    certs: certifications
      .filter((c) => c.category === cat.key && !featuredIds.has(c.id))
      .map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        date: c.date,
        image: c.image,
        note: c.note,
      })),
  }))
  .filter((g) => g.certs.length > 0);

export const certTotal = certifications.length;

/* ── ACT IV — Work ─────────────────────────────────────────────── */
export const featuredWork = [
  {
    id: "aws-query-system",
    role: "Cloud AI · RAG infrastructure",
    problem:
      "Raw language models drift without evidence — and cloud AI stacks are slow to reproduce across environments.",
    decisions: [
      "Amazon Bedrock grounded with Aurora Serverless v2 (pgvector) retrieval and S3 data lakes.",
      "Semantic chunking and structured prompting: +30% retrieval precision, −25% inference latency during the ITI GenAI work.",
      "The entire VPC, S3, IAM, and Bedrock stack encoded as Terraform — −90% deployment time via a single apply.",
    ],
    outcome: ["Sub-second grounded query responses", "Reproducible one-command infrastructure"],
    project: proj("aws-query-system"),
  },
  {
    id: "bookmind-ai",
    role: "Agentic workflows · Guardrails",
    problem:
      "Single-turn retrieval cannot self-correct, and unsupported claims still slip through into answers.",
    decisions: [
      "LangGraph researcher–reviewer pipeline where a reviewer agent challenges every claim.",
      "Qdrant vector search with Redis caching for repeatable retrieval.",
      "NeMo Guardrails blocks unsupported output; typed FastAPI contracts; automated RAGAS evaluation.",
    ],
    outcome: ["Zero unsupported hallucinations in evaluation", "Typed, testable agent contracts"],
    project: proj("bookmind-ai"),
  },
  {
    id: "usb-kernel-driver",
    role: "Systems programming · C & Linux",
    problem: "Userspace intuition breaks at the kernel boundary — and so do careless references.",
    decisions: [
      "Kernel module in C on the USB core API for Sandisk Ultra Fit hardware (0x0781:0x5567).",
      "Probe/disconnect lifecycle with full usb_put_dev reference safety.",
      "Bulk IN/OUT endpoint handling under real hardware conditions.",
    ],
    outcome: ["Zero memory leaks across 200+ plug/unplug cycles", "Validated on physical hardware, not emulators"],
    project: proj("usb-kernel-driver"),
  },
];

export const supportingWork = ["habit-tracker", "heart-disease", "jobfiy"].map(proj);

/* ── ACT V — Next chapter ──────────────────────────────────────── */
export const closing = {
  headline: ["The next chapter", "is a system worth building."],
  body:
    "I'm looking for teams pushing multi-agent AI, grounded RAG, and cloud backends into production — and research collaborations where engineering rigor meets real users.",
  availability: contact.availability,
  channels: [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, note: "Fastest for roles & project briefs" },
    { label: "WhatsApp", value: site.phone, href: `https://wa.me/${site.whatsapp}`, note: "Cairo (GMT+2) — usually quick" },
    { label: "LinkedIn", value: "/mohamed-ayman-abdelaty", href: site.linkedin, note: "140K+ weekly post reach" },
    { label: "GitHub", value: `@${site.githubHandle}`, href: site.github, note: "Production systems & research code" },
  ],
};

export { certById };

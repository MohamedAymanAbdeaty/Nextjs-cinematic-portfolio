/* Verified professional narrative.
 * Order follows the required sequence: Experience (MLSA → S.T.A.R Union) →
 * Internship → Systems thinking → Research → Samsung → Volunteering →
 * Certifications → Projects → Contact.
 * Every claim below is supported by an approved asset in /public/images or the
 * existing data layer. Nothing is invented.
 */

/* ── Experience — consolidated leadership (two organizations) ─────── */
export const experienceEntries = [
  {
    id: "experience-mlsa",
    organization: "Microsoft Learn Student Ambassadors (MLSA)",
    role: "AI Head — Microsoft Learn Student Ambassadors, New Mansoura University",
    location: "New Mansoura University",
    period: "2025 — 2026",
    description:
      "I lead AI-related activities and support technical learning within the Microsoft Learn Student Ambassadors community at New Mansoura University. My role involves facilitating AI learning sessions, contributing to technical events, and helping students engage with emerging technologies.",
    highlights: [
      "Authored the 12-week AI roadmap and mentored 30+ members building their first projects.",
      "Weekly sessions and 100+ attendee workshops — teaching in public while writing about it for a 140K+ weekly audience.",
      "Season 2025/2026 role verified by the club's signed certificate.",
    ],
    gallery: [
      {
        src: "/images/microsoft/1772371239731.jpeg",
        label: "Tech expo — club flag",
        alt: "Mohamed Ayman holding the Microsoft Student Clubs — New Mansoura University flag at a technology expo",
      },
      {
        src: "/images/microsoft/photo_microsoft_stage.jpg",
        label: "Live AI session — NMU",
        alt: "Live AI session at New Mansoura University",
      },
      {
        src: "/images/microsoft/all.jpeg",
        label: "Techne Summit — team",
        alt: "Microsoft Student Clubs team at Techne Summit",
      },
      {
        src: "/images/microsoft/cert_microsoft_ai_head.jpg",
        label: "AI Head certificate (2025/2026)",
        alt: "Head of Artificial Intelligence certificate — season 2025/2026",
        fit: "contain",
      },
    ],
  },
  {
    id: "experience-star-union",
    organization: "S.T.A.R Union",
    role: "AI Vice Head and organizational leadership",
    location: "Cairo",
    period: "2025 — 2026",
    description:
      "I contribute to AI initiatives, technical activities, and mentoring opportunities within S.T.A.R Union. Alongside technical leadership, I support team coordination, student engagement, and the planning and execution of collaborative activities.",
    highlights: [
      "AI Vice Head for the 2025 — 2026 season — role documented by the union's own announcement poster.",
      "Mentoring program (2026): technical sessions with union members.",
      "Team coordination, student engagement, and collaborative activity planning.",
    ],
    gallery: [
      {
        src: "/images/star-union/558161862_122208285998047131_4299714710762306921_n - Copy.jpg",
        label: "AI Vice Head — announcement",
        alt: "S.T.A.R Union announcement poster naming Mohamed Ayman as AI Vice Head",
        fit: "contain",
        plate: true,
      },
      {
        src: "/images/star-union/photo_2026-10-17_21-04-36.jpg",
        label: "Mentoring program (2026)",
        alt: "Mentoring session with union members",
      },
      {
        src: "/images/star-union/photo_2026-10-17_21-04-11.jpg",
        label: "Study & planning",
        alt: "Team study and planning session",
      },
      {
        src: "/images/star-union/photo_2026-10-17_21-03-48.jpg",
        label: "Working session",
        alt: "Collaborative working session and problem-solving activities",
      },
    ],
  },
];

export const portfolioSections = [
  {
    id: "internship",
    index: "04",
    eyebrow: "ENGINEERING PRACTICE",
    title: "From notebooks to systems.",
    organization: "AI Engineering Intern — Sprints Virtual Internship",
    period: "2026",
    summary:
      "An intensive engineering sprint graded as an AI Engineer internship: a 120-hour workload delivered on open-source AI projects, with the certificate signed by the program's CEO.",
    details: [
      "Sprints Virtual Internship — AI Engineer, 120-hour internship workload, certificate of achievement.",
      "Built and contributed to open-source AI projects across an intensive one-month engineering sprint.",
      "Earlier engineering practice: back-end internship at ITI — authenticated REST APIs, Redis caching, and the Jobfiy query work that cut page latency 56%.",
    ],
    image: "/images/sprints/1791333991556.jpeg",
    imageAlt: "Sprints Virtual Internship certificate of achievement — AI Engineer, 120 hours",
    imagePlate: true,
    evidence: [
      { src: "/images/sprints/1787796191109.jpeg", label: "Sprints virtual internship — AI engineering" },
      { src: "/images/cert_iti_tsql.jpg", label: "Back-end engineering practice — T-SQL at ITI" },
    ],
  },
  {
    id: "shell",
    index: "05",
    eyebrow: "SYSTEMS THINKING",
    title: "Mapping the system before touching it.",
    organization: "Shell NXplorers Pro — Shell HQ, New Cairo",
    period: "Nov 2025",
    summary:
      "A three-day full-time intensive mapping causal loops, leverage points, and twenty-year scenarios across the water–energy–food nexus — the mental model that precedes good architecture.",
    details: [
      "Completed the Shell NXplorers Pro workshop and graduated in November 2025.",
      "Causal-loop mapping and scenario planning with cross-disciplinary innovators.",
      "Before architecting an agent or data pipeline, map its second-order effects on users, latency, cost, and sustainability.",
    ],
    image: "/images/photo_shell_award.jpg",
    imageAlt: "Mohamed Ayman receiving the Shell NXplorers Pro certificate with the cohort",
    evidence: [
      { src: "/images/cert_shell_nxplorers.jpg", label: "Shell NXplorers Pro certificate" },
      { src: "/images/photo_shell_logo.jpg", label: "Shell HQ — New Cairo" },
    ],
  },
  {
    id: "research",
    variant: "research-showcase",
    eyebrow: "RESEARCH CONTRIBUTIONS",
    title: "Evidence before certainty.",
    organization: "University of Tokyo GCI World (Matsuo-Iwasawa Lab) · IEEE MIUCC26",
    period: "2026",
    summary:
      "A research-facing chapter that separates coursework, collaboration, and research status instead of treating every promising idea as a publication.",
    details: [
      "Graduate of the University of Tokyo's GCI World program, Matsuo-Iwasawa Laboratory — machine learning, exploratory data analysis, data-driven strategy.",
      "Co-author on seasonal-pattern research using the Kepler Optimization Algorithm (IEEE MIUCC26).",
      "Multilingual, low-resource AI research proposals (SINA) remain proposals — they are labelled as such, never as completed results.",
    ],
    paper: {
      title:
        "Adaptive Noise Differential Privacy for Optimizing Privacy–Utility Trade-off in Federated Learning Systems",
      field: "Federated learning · differential privacy",
      author: "Mohamed Ayman",
      programme:
        "MIUCC 26 — 6th International Mobile, Intelligent, and Ubiquitous Computing Conference",
      venue: "Misr International University · IEEE Egypt Section (Record #70118)",
      status: "Certificate for Contribution — September 16–17, 2026",
    },
    certificate: {
      image: "/images/research/cert_federated_learning_dp.jpg",
      alt: "MIUCC 26 Certificate for Contribution awarded to Mohamed Ayman for the federated learning differential privacy paper",
      caption: "MIUCC 26 — Certificate for Contribution · signed by Prof. Ayman Bahaa-Eldin, Conference Chair",
    },
    context: {
      image: "/images/research/photo_2026-09-17_15-26-58.jpg",
      alt: "University of Tokyo graduate research programme documentation",
      caption: "GCI World programme documentation — Matsuo-Iwasawa Laboratory",
    },
  },
  {
    id: "samsung",
    index: "07",
    eyebrow: "OPPORTUNITY",
    title: "The discipline underneath the intelligence.",
    organization: "Samsung Innovation Campus — Coding & Programming Track",
    period: "2025",
    summary:
      "Two hundred intensive hours of C++, object-oriented programming, dynamic programming, and capstone pitching — selected among the top 5% of applicants nationwide.",
    details: [
      "Selected among the top 5% of applicants nationwide (70 scholars from thousands of applicants).",
      "Three capstones pitched to technical juries; certified graduate of the Coding & Programming track.",
      "Presented as a training programme, not reinterpreted as employment or an internship.",
    ],
    image: "/images/samsung/photo_samsung_pitch.jpg",
    imageAlt: "Mohamed Ayman presenting a Samsung Innovation Campus capstone",
    evidence: [
      { src: "/images/samsung/photo_samsung_team.jpg", label: "Capstone team — Smart Village" },
      { src: "/images/samsung/photo_samsung_cohort.jpg", label: "Samsung Innovation Campus cohort" },
      { src: "/images/samsung/cert_samsung_cp.jpg", label: "Coding & Programming track — Top 5%" },
    ],
  },
  {
    id: "volunteering",
    index: "08",
    eyebrow: "COMMUNITY CONTRIBUTION",
    title: "Build the room you needed.",
    organization: "Creativa Innovation Hub — Mansoura",
    period: "2025 — Present",
    summary:
      "Volunteering as technical service: showing up, supporting workshops, helping people find a path through the tools, and keeping the work grounded in a community.",
    details: [
      "Technology volunteer and data analyst at Creativa Innovation Hub, Mansoura.",
      "Supported workshops and mentored peers through hands-on technical sessions.",
      "Kept separate from student-club leadership and from ordinary event attendance.",
    ],
    image: "/images/volunteering/photo_creativa_volunteer.jpg",
    imageAlt: "Mohamed Ayman volunteering at Creativa Innovation Hub",
  },
];

export const portfolioProjects = [
  {
    title: "BookMind AI",
    type: "Agentic workflows · grounded retrieval",
    description:
      "A researcher–reviewer pipeline on LangGraph with Qdrant, Redis, NeMo Guardrails and RAGAS evaluation — a reviewer agent challenges every claim, so zero unsupported hallucinations pass evaluation.",
    image: "/images/projects/bookmind/book mind.jpeg",
    alt: "BookMind AI architecture — ingestion pipeline and researcher–reviewer request lifecycle",
    href: "https://github.com/MohamedAymanAbdeaty/BOOK-MIND-AI-Project",
  },
  {
    title: "AWS Intelligent Query System",
    type: "Cloud AI · infrastructure as code",
    description:
      "Bedrock grounded with Aurora Serverless v2 (pgvector) retrieval and S3 data lakes — the whole VPC, S3, IAM and Bedrock stack encoded in Terraform for reproducible one-command deploys.",
    image: null,
    href: "https://github.com/MohamedAymanAbdeaty/Mohamed_Ayman_intelligent-query-sys",
  },
  {
    title: "Jobfiy",
    type: "Backend engineering · Laravel",
    description:
      "A recruitment platform serving 500+ users: authenticated REST APIs, RBAC, Redis queues, and query-level surgery that cut page latency from 3.2s to 1.4s.",
    image: null,
    href: "https://github.com/MM877/jobfiy",
  },
  {
    title: "Smart Budget",
    type: "Product engineering · interface",
    description:
      "A focused budget-tracking build used to practise interface design and state-heavy product flows end to end.",
    image: "/images/projects/smart budget/smart budget .jpeg",
    href: "https://github.com/MohamedAymanAbdeaty",
  },
];

export const researchPapers = [
  { title: "Adaptive Noise — MIUCC 2026", status: "Conference paper · co-author" },
  { title: "Seasonal patterns via Kepler Optimization Algorithm", status: "Research contribution" },
  { title: "SINA — multilingual, low-resource AI", status: "Research proposal" },
];

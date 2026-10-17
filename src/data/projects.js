export const projects = [
  {
    id: "aws-query-system",
    title: "AWS Intelligent Query System",
    category: "Cloud AI & Terraform IaC",
    chapterRef: "Chapter 04",
    chapterId: "chapter-4",
    description:
      "Production-grade Retrieval-Augmented Generation system wiring Amazon Bedrock with Aurora Serverless v2 (pgvector) and S3 data lakes. Provisioned 100% via Terraform IaC.",
    impact: "Sub-second grounded query responses • 90% faster cloud deployment via single terraform apply",
    stack: ["Python", "AWS Bedrock", "Aurora pgvector", "Terraform", "S3", "IAM"],
    github: "https://github.com/MohamedAymanAbdeaty/Mohamed_Ayman_intelligent-query-sys",
  },
  {
    id: "bookmind-ai",
    title: "BookMind AI",
    category: "Agentic Workflows & Guardrails",
    chapterRef: "Chapter 05",
    chapterId: "chapter-5",
    description:
      "Multi-agent LangGraph researcher–reviewer pipeline backed by Qdrant vector search, Redis caching, and NeMo Guardrails that strictly blocks unsupported hallucinations.",
    impact: "Zero unsupported hallucinations • Typed FastAPI contracts & automated RAGAS evaluation",
    stack: ["LangGraph", "Qdrant", "Redis", "NeMo Guardrails", "FastAPI", "Python"],
    github: "https://github.com/MohamedAymanAbdeaty/BOOK-MIND-AI-Project",
  },
  {
    id: "habit-tracker",
    title: "MERN AI Habit Tracker",
    category: "Full-Stack & Gemini 2.5 Flash",
    chapterRef: "Chapter 05",
    chapterId: "chapter-5",
    description:
      "End-to-end habit intelligence platform integrating Google Gemini 2.5 Flash to power 5 AI features (weekly reports, habit wizard, streak recovery coach, analytics chat) with a 90-day activity heatmap.",
    impact: "Timezone-safe aggregation across 10+ regions • JWT RBAC & interactive Recharts analytics",
    stack: ["React", "Node.js", "Express", "MongoDB", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/MohamedAymanAbdeaty/Full-Stack-AI-Habit-Tracker-App",
  },
  {
    id: "heart-disease",
    title: "Heart Disease Diagnostic Classifier",
    category: "Machine Learning & Healthcare",
    chapterRef: "Chapter 05",
    chapterId: "chapter-5",
    description:
      "Clinical binary classification pipeline comparing Logistic Regression and Random Forest across 14 UCI medical attributes, tuned via GridSearchCV to prioritize Recall (Sensitivity).",
    impact: "88% diagnostic accuracy • Minimized false negatives for high-stakes clinical screening",
    stack: ["Python", "Scikit-Learn", "Pandas", "Seaborn", "ROC-AUC"],
    github: "https://github.com/MohamedAymanAbdeaty/Heart_Disease_project",
  },
  {
    id: "jobfiy",
    title: "Jobfiy — Job Portal",
    category: "Backend Engineering & Laravel",
    chapterRef: "Chapter 02",
    chapterId: "chapter-2",
    description:
      "Full-stack recruitment platform serving 500+ active users and 100+ concurrent job listings with Role-Based Access Control (RBAC) and asynchronous email queues.",
    impact: "56% faster page load (3.2s → 1.4s via Eloquent ORM & query optimization)",
    stack: ["PHP", "Laravel", "MySQL", "Redis Queues", "Tailwind CSS"],
    github: "https://github.com/MM877/jobfiy",
  },
  {
    id: "usb-kernel-driver",
    title: "Linux Custom USB Kernel Driver",
    category: "Systems Programming & C",
    chapterRef: "Chapter 01",
    chapterId: "chapter-1",
    description:
      "Custom Linux kernel module written in C using the kernel USB core API for Sandisk Ultra Fit hardware (0x0781:0x5567), managing probe, disconnect, and Bulk IN/OUT endpoints.",
    impact: "Zero memory leaks across 200+ physical plug/unplug cycles • Full usb_put_dev reference safety",
    stack: ["C", "Linux Kernel API", "USB Protocol", "Memory Safety"],
    github: "https://github.com/MM877/USB-Driver-C-lang-",
  },
];

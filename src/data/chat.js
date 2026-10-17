export const chat = {
  welcome:
    "Hi! I'm Mohamed Ayman's story guide. Ask me about Samsung's Top 5% scholarship, Shell NXplorers, the U-Tokyo Matsuo Lab, multi-agent RAG, or why he studied Sales as an AI Engineer.",
  quickPrompts: [
    "What was the biggest lesson at Shell NXplorers?",
    "Why did you study Sales as an AI Engineer?",
    "Tell me about The University of Tokyo Matsuo Lab",
    "How can I contact Mohamed for a role or project?",
  ],
  responses: [
    {
      keys: ["shell", "nxplorer", "system", "thinking"],
      text: "In November 2025 I joined Shell NXplorers Pro — a 3-day full-time intensive at Shell HQ in New Cairo. We mapped causal feedback loops, hidden leverage points, and 20-year future scenarios across the Water-Energy-Food nexus. The lesson that stuck: before writing a line of code, ask what solving one part of the system breaks in three others. I now map second-order effects on users, latency, cost, and sustainability before architecting any LLM agent.",
    },
    {
      keys: ["sales", "pitch", "business", "why sales", "talentex", "icareer", "agile"],
      text: "Honestly? It's the plot twist of my journey. I completed the Sales Specialists Track at Talentex Academy & iCareer (July 2026) — B2B/B2C models, objection handling, discovery calls, value-driven storytelling — plus HP LIFE's Agile Project Management cert. Brilliant code is worthless if you can't explain why it matters. It's why I can bridge the engineering room and the boardroom.",
    },
    {
      keys: ["samsung", "5%", "scholarship", "smart village", "top 5"],
      text: "I was selected into the Top 5% nationwide for the Samsung Innovation Campus scholarship — just 70 scholars out of thousands of applicants across Egypt. 200 intensive hours of C++, Python, OOP, Dynamic Programming and DSA at Smart Village in Giza, ending with 3 capstone projects pitched to technical juries.",
    },
    {
      keys: ["tokyo", "japan", "matsuo", "gci", "research", "ieee", "university"],
      text: "I graduated from the GCI World program (April 2026 cohort) at The University of Tokyo's Matsuo-Iwasawa Laboratory — a 7-month intensive in machine learning, exploratory data analysis, and data-driven business strategy, signed by Prof. Yutaka Matsuo and Assoc. Prof. Yusuke Iwasawa. I also co-authored IEEE MIUCC26 research on seasonal pattern discovery in 19,000+ search terms using the Kepler Optimization Algorithm.",
    },
    {
      keys: ["rag", "bedrock", "aws", "agent", "bookmind", "sprints", "langgraph", "project"],
      text: "Multi-agent AI is my current focus. At Sprints I built distributed agents on Mattermost with Kafka brokers, and 'BookMind AI' — a LangGraph researcher-reviewer pipeline over Qdrant + Redis with NeMo Guardrails that refuses to answer unless grounded. On AWS I wired Bedrock to Aurora Serverless v2 (pgvector) and provisioned the whole stack with Terraform — 90% faster deploys, sub-second grounded answers.",
    },
    {
      keys: ["contact", "hire", "email", "phone", "linkedin", "reach", "role", "job"],
      text: "mohamedayman3873@gmail.com · +20 115 750 9803 · linkedin.com/in/mohamed-ayman-abdelaty · github.com/MohamedAymanAbdeaty — I'm open to AI engineering roles, research collaboration, and select freelance builds.",
    },
  ],
  fallback:
    "Good question — the fastest way to get the full story is to scroll the chapters, where each beat syncs to uncropped certificates and live photos. For anything specific, reach Mohamed directly at mohamedayman3873@gmail.com.",
};

export function matchAnswer(input) {
  const lower = String(input || "").toLowerCase();
  for (const r of chat.responses) {
    if (r.keys.some((k) => lower.includes(k))) return r.text;
  }
  return chat.fallback;
}

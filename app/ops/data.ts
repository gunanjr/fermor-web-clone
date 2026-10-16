export type TermLine = { mark: string; text: string; color: string };

export const TERM: TermLine[] = [
  { mark: "$", text: "Initializing Kanso CMO...", color: "#4ade80" },
  { mark: ">", text: "Let me take a look at fermor.in...", color: "#dcdce1" },
  { mark: ">", text: "Starting my deep dive - crawling all your pages", color: "#dcdce1" },
  { mark: ">", text: "Crawl complete. 41 pages indexed.", color: "#dcdce1" },
  { mark: ">", text: "Pulling Search Console data...", color: "#dcdce1" },
  { mark: "×", text: "GA4 property not connected - using search data only.", color: "#ff6666" },
  { mark: ">", text: "Reading your SEO report...", color: "#dcdce1" },
  { mark: ">", text: "Extracting key signals and opportunities...", color: "#dcdce1" },
  { mark: "✓", text: "Done!", color: "#4ade80" },
  { mark: ">", text: "Loading documents and initializing AI Chat...", color: "#dcdce1" },
  { mark: "✓", text: "AI Chat initialized", color: "#4ade80" },
];

export type AgentItem = { title: string; meta: string; action: string };
export type Agent = {
  key: string;
  name: string;
  bg: string;
  status: string;
  items: AgentItem[];
};

export const AGENTS: Agent[] = [
  {
    key: "seo",
    name: "SEO Agent",
    bg: "#2563eb",
    status: "12 recommendations ready",
    items: [
      { title: "Fix layout shift on 9 calculator pages (CLS 0.534 → target below 0.1)", meta: "Critical · affects 9 URLs", action: "Open" },
      { title: "Add FAQ schema to the EPF and VPF pages", meta: "High impact · 2 pages", action: "Draft" },
      { title: "Internal link “gold rate today” → SIP calculator", meta: "Quick win", action: "Apply" },
    ],
  },
  {
    key: "geo",
    name: "GEO Agent",
    bg: "#7c3aed",
    status: "11 citation gaps detected",
    items: [
      { title: "ChatGPT does not cite Fermor for “best SIP calculator India”", meta: "Competitor cited: Groww", action: "Plan" },
      { title: "Add Organization + WebApplication structured data", meta: "Blocks 6 of 11 gaps", action: "Draft" },
    ],
  },
  {
    key: "competitor",
    name: "Competitor Pulse Agent",
    bg: "#0891b2",
    status: "Checks your tracked competitors for real changes",
    items: [
      { title: "ClearTax -- new SIP calculator landing page went live", meta: "Worth watching", action: "Read" },
      { title: "BankBazaar -- home loan EMI page pricing copy updated", meta: "Medium", action: "Read" },
    ],
  },
  {
    key: "reddit",
    name: "Reddit Agent",
    bg: "#ff4500",
    status: "8 opportunities ready",
    items: [
      { title: "r/IndiaInvestments -- “Is ET Money's SIP calculator accurate?”", meta: "312 upvotes · 4h ago", action: "Reply" },
      { title: "r/personalfinanceindia -- new vs old regime thread", meta: "89 comments · 1d ago", action: "Reply" },
    ],
  },
  {
    key: "x",
    name: "X Agent",
    bg: "#000000",
    status: "6 ideas ready",
    items: [
      { title: "“I paid ₹18,000 more tax than I had to. Here's the math.”", meta: "Thread · 5 posts", action: "Review" },
      { title: "Screen recording: both tax regimes side by side in 11 seconds", meta: "Single post + video", action: "Review" },
    ],
  },
  {
    key: "linkedin",
    name: "LinkedIn Agent",
    bg: "#0a66c2",
    status: "Set up your brand voice to get started",
    items: [
      { title: "Founder profile is thin -- 3 posts drafted on building in public", meta: "Needs brand voice doc", action: "Set up" },
    ],
  },
  {
    key: "hn",
    name: "Hacker News Agent",
    bg: "#ff6600",
    status: "1 post ready",
    items: [
      { title: "Show HN: 25 finance calculators that run entirely in your browser", meta: "Best window: Tue 08:30 IST", action: "Review" },
    ],
  },
  {
    key: "articles",
    name: "Articles Agent",
    bg: "#8b5cf6",
    status: "4 topics ready",
    items: [
      { title: "New vs old tax regime: the break-even salary, calculated", meta: "1,900 words · 2 competitors rank", action: "Draft" },
      { title: "VPF vs NPS for the extra ₹50,000 deduction", meta: "1,400 words · gap in top 10", action: "Draft" },
    ],
  },
  {
    key: "ugc",
    name: "UGC Videos Agent",
    bg: "#e11d48",
    status: "1 Draft ready",
    items: [
      { title: "tax-regime-explainer -- 9:16, script approved", meta: "480p · ready to preview", action: "Preview" },
    ],
  },
  {
    key: "email",
    name: "Email Agent",
    bg: "#0d9488",
    status: "2 sequences drafted",
    items: [
      { title: "Welcome sequence for saved-calculation signups", meta: "3 emails · 5 day cadence", action: "Review" },
      { title: "Monthly financial-health digest", meta: "Template + first send", action: "Review" },
    ],
  },
];

export const REPLIES: string[] = [
  "Looking at the last 7 days: impressions fell 40% while clicks rose 67%. That is not a penalty -- it is Google trimming low-intent impressions on the gold-rate pages while your calculator pages started converting. I would not touch the gold-rate content yet.\n\nThe thing I would fix today is CLS 0.534 on the calculator pages. It is the one critical issue in the audit and it sits on your highest-intent URLs.",
  "Three things are true right now: organic is your only working channel, Reddit and X are not set up, and the LinkedIn company page is new. I would not spread across all three.\n\nPut September into search plus Reddit -- your commission-free positioning is literally what r/IndiaInvestments argues about weekly.",
  "Google AI cites fermor.in 50 times a month; ChatGPT twice. That gap is almost entirely structured data -- you have no Organization or WebApplication schema.\n\nThe GEO agent has the markup drafted. It is a one-PR change.",
];

export const AGENT_ICON_PATHS: Record<string, { path?: string; fill?: string; stroke?: string }> = {
  competitor: { path: "M22 12h-4l-3 9L9 3l-3 9H2" },
  linkedin: { path: "M4.6 9.1h3.1V19H4.6zM6.1 4.3a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6M9.7 9.1h3v1.4c.5-.9 1.6-1.6 3.1-1.6 2.3 0 3.3 1.4 3.3 3.9V19h-3.1v-5.6c0-1.3-.5-1.9-1.5-1.9-1.1 0-1.7.7-1.7 1.9V19H9.7z", fill: "#fff", stroke: "none" },
  geo: { path: "M12 3.2l2.1 5.4 5.4 2.1-5.4 2.1L12 18.2l-2.1-5.4L4.5 10.7l5.4-2.1z", fill: "#fff", stroke: "none" },
  x: { path: "M4.6 4.2h4.1l3.9 5.4 4.8-5.4h2.1l-5.8 6.9 6.1 8.7h-4.1L11.6 14l-5.5 5.8H4l6.2-7.2z", fill: "#fff", stroke: "none" },
  hn: { path: "M6 5.5l6 7.6 6-7.6M12 13.1V19" },
  articles: { path: "M6.2 3.4h8.6l4 4v13.2H6.2zM14.8 3.4v4h4M9.2 12.4h7M9.2 16.2h5" },
  ugc: { path: "M3.4 7.8a2.4 2.4 0 0 1 2.4-2.4h7.6a2.4 2.4 0 0 1 2.4 2.4v8.4a2.4 2.4 0 0 1-2.4 2.4H5.8a2.4 2.4 0 0 1-2.4-2.4zM15.8 10.6l4.8-2.8v8.4l-4.8-2.8z" },
  email: { path: "M3.4 7a1.6 1.6 0 0 1 1.6-1.6h14a1.6 1.6 0 0 1 1.6 1.6v10a1.6 1.6 0 0 1-1.6 1.6H5A1.6 1.6 0 0 1 3.4 17zM4 7.8l8 5.6 8-5.6" },
};

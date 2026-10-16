// Shared shapes for the Competitive Intelligence module -- mirrors the real Prisma
// models (CiCompetitor, CiEvidence) and the OpsFeedItem rows Competitor Pulse writes,
// not the design prototype's demo data shape.

export type CiCategory =
  | "DIRECT" | "INDIRECT" | "PERCEIVED" | "ASPIRATIONAL" | "EMERGING"
  | "SUBSTITUTE" | "ADJACENT" | "POTENTIAL_FUTURE" | "NEEDS_RESEARCH";

export type CiCompetitorStatus = "ACTIVE_TRACKING" | "NEEDS_RESEARCH" | "ARCHIVED";
export type CiConfidence = "LOW" | "MEDIUM" | "HIGH";

// ── Deep-research shapes (added 31 Aug 2026) ─────────────────────────────────
// Mirrors the real backend's Json columns exactly -- populated from a real, cited
// multi-source research pass (see the master research-prompt output format), never
// fabricated. Every field is optional/nullable since research lands per-competitor,
// over time -- a competitor with none of this yet is a real, honest "not researched"
// state, not an error.
export type CiLatestRound = { name: string; amount_usd: number | null; date: string; lead_investors: string[]; source_url: string };
export type CiUsersMetric = { count: number | null; metric: string; as_of: string; source_url: string };
export type CiGrowthMetric = { metric: string; value: string; period: string; source_url: string };
export type CiEmployeeCount = { count: number | null; source_url: string; as_of: string };
export type CiSocialPresence = { platform: string; followers: number | null; as_of: string; source_url: string };
export type CiPricingPlan = { name: string; price: string; billing_period: string; includes: string };
export type CiLaunch = { name: string; date: string; description: string; source_url: string };
export type CiMovement = { date: string; headline: string; description: string; source_url: string };
export type CiNextMove = { prediction: string; reasoning_basis: string; confidence: "LOW" | "MEDIUM" | "HIGH" };
export type CiMaActivity = { target: string; date: string; description: string; source_url: string };
export type CiSwotPoint = { point: string; evidence: string };

export type CiPositioning = {
  real_quote: string; quote_source_url: string; value_prop: string; differentiators: string[];
  market_perception: string | null; one_liner: string;
};
export type CiFocus = {
  primary_market: string; target_audience: string; use_cases: string[]; geographies: string[];
  customer_segment: string; strategic_focus: string;
};
export type CiBusiness = {
  total_funding_usd: number | null; total_funding_source_url: string;
  latest_round: CiLatestRound; valuation_usd: number | null; valuation_as_of: string; valuation_source_url: string;
  revenue_usd: number | null; revenue_source_url: string; users_or_customers: CiUsersMetric; growth_rate: CiGrowthMetric;
  key_investors: string[]; employee_count: CiEmployeeCount; geographic_presence: string[];
};
export type CiProduct = {
  core_products: string[]; feature_highlights: string[]; ai_capabilities: string | null;
  integrations: string[]; platforms: string[]; recent_launches: CiLaunch[];
};
export type CiMarketing = {
  content_strategy: string | null; seo_strength: string | null; social_presence: CiSocialPresence[];
  paid_marketing_signals: string | null; primary_channels: string[]; notable_campaigns: string[];
};
export type CiPricingDetail = { model: string; plans: CiPricingPlan[]; promotions: string | null };
export type CiStrategyInferred = {
  stated_direction: string; growth_strategy: string; ai_strategy: string | null; expansion_plans: string | null;
  partnerships: string[]; ma_activity: CiMaActivity[];
};
export type CiSwotInferred = { strengths: CiSwotPoint[]; weaknesses: CiSwotPoint[]; opportunities: CiSwotPoint[]; threats: CiSwotPoint[] };
export type CiLandscapeAxisScores = {
  product_breadth_vs_depth: number | null; ai_native_vs_traditional: number | null; self_service_vs_managed: number | null;
  consumer_vs_enterprise: number | null; low_cost_vs_premium: number | null; generalist_vs_specialist: number | null; simple_vs_complex: number | null;
};

export type CiCompetitor = {
  id: string;
  projectId: string;
  name: string;
  domain: string;
  category: CiCategory;
  status: CiCompetitorStatus;
  threatScore: number | null;
  relevanceScore: number | null;
  oneLiner: string | null;
  funding: string | null;
  founded: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;

  // Deep research (all null until a research pass has populated this competitor)
  hqLocation: string | null;
  legalType: string | null;
  ownershipType: string | null;
  founders: string[];
  foundedYear: number | null;
  totalFundingUsd: number | null; // BigInt DB column, serialized as a plain number over JSON (see prisma.ts's BigInt.prototype.toJSON)
  valuationUsd: number | null;
  positioning: CiPositioning | null;
  focus: CiFocus | null;
  business: CiBusiness | null;
  product: CiProduct | null;
  marketing: CiMarketing | null;
  pricingDetail: CiPricingDetail | null;
  strategyInferred: CiStrategyInferred | null;
  swotInferred: CiSwotInferred | null;
  recentMovements: CiMovement[] | null;
  likelyNextMoves: CiNextMove[] | null;
  landscapeAxisScores: CiLandscapeAxisScores | null;
  strategicCluster: string | null;
  strategicClusterReasoning: string | null;
  threatScoreReasoning: string | null;
  relevanceScoreReasoning: string | null;
  additionalNotes: string | null;
};

export type CiEvidence = {
  id: string;
  projectId: string;
  competitorId: string | null;
  source: string;
  url: string | null;
  sourceType: string;
  publishedAt: string | null;
  retrievedAt: string;
  lastVerifiedAt: string;
  confidence: CiConfidence;
  snippet: string | null;
  analystNote: string | null;
  createdAt: string;
};

export type CiSignal = {
  id: string;
  agentType: string;
  status: string;
  title: string;
  summary: string;
  content: string;
  metadata: { estimatedImpact?: string; competitor?: string } | null;
  createdAt: string;
  ciCompetitor: { id: string; name: string; domain: string; category: CiCategory } | null;
};

// Real, human-facing labels for the enum values -- the enum itself stays
// SCREAMING_CASE (matches Prisma/Postgres convention), this is only ever for display.
export const CATEGORY_LABEL: Record<CiCategory, string> = {
  DIRECT: "Direct",
  INDIRECT: "Indirect",
  PERCEIVED: "Perceived",
  ASPIRATIONAL: "Aspirational",
  EMERGING: "Emerging",
  SUBSTITUTE: "Substitute",
  ADJACENT: "Adjacent",
  POTENTIAL_FUTURE: "Potential Future",
  NEEDS_RESEARCH: "Needs research",
};

export const STATUS_LABEL: Record<CiCompetitorStatus, string> = {
  ACTIVE_TRACKING: "Active tracking",
  NEEDS_RESEARCH: "Needs research",
  ARCHIVED: "Archived",
};

// Same palette family as the design handoff's category colors (see README's Design
// Tokens) -- NEEDS_RESEARCH gets a neutral, not a color implying it's been assessed.
export const CATEGORY_COLOR: Record<CiCategory, string> = {
  DIRECT: "#ff6666",
  INDIRECT: "#f59e0b",
  PERCEIVED: "#60a5fa",
  ASPIRATIONAL: "#a78bfa",
  EMERGING: "#4ade80",
  SUBSTITUTE: "#fb923c",
  ADJACENT: "#56d2c0",
  POTENTIAL_FUTURE: "#9b9ba3",
  NEEDS_RESEARCH: "#6e6e77",
};

export function threatColor(score: number | null): string {
  if (score === null) return "#6e6e77";
  if (score >= 70) return "#ff6666";
  if (score >= 40) return "#f59e0b";
  return "#4ade80";
}

export function threatLevel(score: number | null): string {
  if (score === null) return "Not scored";
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Low";
}

// A deterministic (not random) fallback color per domain, same technique already used
// for the Company panel's competitor favicon fallback -- so the same competitor gets
// the same avatar color every time, with no server-side state needed for it.
const MONO_COLORS = ["#1d4ed8", "#b91c1c", "#0f766e", "#5b21b6", "#c2410c", "#0369a1", "#7c3aed", "#166534", "#a21caf", "#b45309", "#334155", "#9d174d", "#065f46", "#4338ca", "#7f1d1d"];
export function monoColorFor(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return MONO_COLORS[hash % MONO_COLORS.length];
}
export function monoLetterFor(name: string): string {
  return (name.trim().charAt(0) || "?").toUpperCase();
}

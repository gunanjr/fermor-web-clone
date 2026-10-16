import { ARTICLES, type NewsArticle } from "./articles";
import type { ResourceItem } from "./ResourcesPageClient";

/**
 * The 31 articles migrated from the old /news listing, split into the three editorial
 * categories that make up the /blogs page (see CLAUDE.md-style reasoning: grouped by actual
 * subject, not by forcing an even three-way split). Every slug in ARTICLES appears in exactly
 * one of these three sets; `assertFullCoverage()` below fails loudly at build time if that ever
 * drifts (a new article added to articles.ts without being placed in a category, a typo'd slug,
 * or a slug listed twice).
 */

/** Category 1 -- white section, first: Income Tax and TDS explainers. */
const CATEGORY_1_SLUGS = new Set([
  "section-44ada-presumptive-taxation-professionals",
  "lta-exemption-rules-claim",
  "residential-status-section-6-income-tax-act",
  "section-54f-capital-gains-exemption",
  "section-80d-health-insurance-deduction",
  "form-16",
  "section-194c-tds-on-contractors",
  "tax-audit-section-44ab",
  "tds-tax-deducted-at-source",
  "partners-remuneration-section-40b",
  "section-10-income-tax-act-exemptions",
  "pan-card-number-search",
  "pan-card-update-correction",
  "section-87a-rebate",
  "section-194j-tds-professional-fees",
  "section-194i-tds-on-rent",
  "cost-inflation-index-fy-2026-27",
  "pan-card-download",
  "old-vs-new-tax-regime",
  "section-115bac-new-tax-regime",
  "itr-filing-last-date",
  "income-tax-slabs-fy-2025-26",
  "tds-rate-chart",
]);

/** Category 2 -- black section, middle: time-sensitive markets, macro and current-affairs
    coverage (the site's actual "news of the day" cluster, mostly dated Jun-Jul 2026). */
const CATEGORY_2_SLUGS = new Set([
  "us-perm-green-card-suspension-october-2026",
  "sensex-nifty-crash-september-2026",
  "bank-strike-september-2026",
  "india-vs-japan-t20i-2026",
  "upi-charges-above-2000",
  "spain-vs-argentina-fifa-world-cup-2026-final",
  "world-gdp-ranking-2026",
  "sensex-nifty-market-crash-it-stocks-june-2026",
  "reliance-agm-2026-jio-ipo-drhp",
  "accenture-shares-india-it-sector-q3-fy26",
  "epfo-8-25-percent-interest-rate-fy26",
  "rbi-financial-product-mis-selling-rules",
  "tata-motors-pv-stock-crash-jlr-fy27-outlook",
]);

/** Category 3 -- white section, last: EPF, GST, utility-booking and government-scheme
    how-to guides -- practical steps for dealing with a government or utility portal. */
const CATEGORY_3_SLUGS = new Set([
  "e-way-bill-gst-rules-compliance",
  "gstr-9-annual-return",
  "7th-pay-commission-pay-matrix",
  "indane-gas-booking-number",
  "epfo-claim-status",
  "pf-balance-check",
  "gst-rates",
  "bharat-gas-booking-number",
  "pf-withdrawal-claim-online",
  "ration-card-ekyc",
  "epic-number-voter-id-card",
  "jai-bangla-pension-scheme-2026",
  "epfo-login-uan-passbook",
  "gst-number-search",
  "annapurna-bhandar-2026",
  "aadhaar-card-update",
  "pm-kisan-samman-nidhi-scheme",
  "sukanya-samriddhi-yojana-2026",
]);

function assertFullCoverage() {
  const all = [CATEGORY_1_SLUGS, CATEGORY_2_SLUGS, CATEGORY_3_SLUGS];
  const seen = new Map<string, number>();
  for (const set of all) {
    for (const slug of set) seen.set(slug, (seen.get(slug) ?? 0) + 1);
  }
  const duplicates = [...seen.entries()].filter(([, count]) => count > 1).map(([slug]) => slug);
  if (duplicates.length > 0) {
    throw new Error(`blogCategories: slug(s) listed in more than one category: ${duplicates.join(", ")}`);
  }
  const missing = ARTICLES.filter((article) => !seen.has(article.slug)).map((a) => a.slug);
  if (missing.length > 0) {
    throw new Error(`blogCategories: article(s) not assigned to any category: ${missing.join(", ")}`);
  }
  const unknown = [...seen.keys()].filter((slug) => !ARTICLES.some((a) => a.slug === slug));
  if (unknown.length > 0) {
    throw new Error(`blogCategories: category slug(s) with no matching article: ${unknown.join(", ")}`);
  }
}
assertFullCoverage();

function articlesFor(slugs: Set<string>): NewsArticle[] {
  // Preserve ARTICLES' own newest-first order rather than the Set's insertion order.
  return ARTICLES.filter((article) => slugs.has(article.slug));
}

export const CATEGORY_1_ARTICLES = articlesFor(CATEGORY_1_SLUGS);
export const CATEGORY_2_ARTICLES = articlesFor(CATEGORY_2_SLUGS);
export const CATEGORY_3_ARTICLES = articlesFor(CATEGORY_3_SLUGS);

export const CATEGORY_1_NAME = "Tax & Compliance Guides";
export const CATEGORY_2_NAME = "Markets & Current Affairs";
export const CATEGORY_3_NAME = "Government & Utility Services";

function toIsoDate(dateLabel: string): string {
  const parsed = new Date(dateLabel.replace(/^Updated\s+/, ""));
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

/** Same parsing rule as toIsoDate (strip a leading "Updated "), as a comparable number for
    sorting. Unparseable dates sort to the very end rather than throwing or corrupting the sort. */
function articleDateValue(article: NewsArticle): number {
  const parsed = new Date(article.date.replace(/^Updated\s+/, ""));
  return Number.isNaN(parsed.getTime()) ? -Infinity : parsed.getTime();
}

/** Which of the three /blogs categories a given article slug belongs to. The one place this
    mapping is computed - every UI element (filter dropdown, category sections, Featured
    Articles) reads it from here rather than re-deriving or hardcoding it. */
export function categoryNameForSlug(slug: string): string {
  if (CATEGORY_1_SLUGS.has(slug)) return CATEGORY_1_NAME;
  if (CATEGORY_2_SLUGS.has(slug)) return CATEGORY_2_NAME;
  return CATEGORY_3_NAME;
}

export const CATEGORY_NAMES: string[] = [CATEGORY_1_NAME, CATEGORY_2_NAME, CATEGORY_3_NAME];

/** First sentence of the lead, trimmed to a card-friendly length. */
export function excerpt(lead: string, maxLen = 160): string {
  const firstSentenceMatch = lead.match(/^.*?[.!?](?:\s|$)/);
  const firstSentence = (firstSentenceMatch ? firstSentenceMatch[0] : lead).trim();
  if (firstSentence.length <= maxLen) return firstSentence;
  const truncated = firstSentence.slice(0, maxLen);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
}

/** The one place a NewsArticle becomes a ResourceItem (the shape ResourcesPageClient's
    hero/filter/grid section renders). `type` is the article's real category name, not a
    hardcoded placeholder - this is what lets the "All types" dropdown filter across all three
    categories instead of the old five make-believe resource types. */
function toResourceItem(article: NewsArticle): ResourceItem {
  return {
    id: article.slug,
    type: categoryNameForSlug(article.slug),
    title: article.title,
    description: excerpt(article.lead),
    publicationLabel: "Article",
    href: `/blogs/${article.slug}`,
    date: article.date,
    isoDate: toIsoDate(article.date),
    searchText: [
      article.lead,
      article.category,
      article.slug.replace(/-/g, " "),
      ...article.tickers.map((ticker) => ticker.symbol),
    ].join(" "),
  };
}

/** All 31 migrated articles, shaped for ResourcesPageClient's hero/filter/grid section. This is
    the single dataset the "All types" filter runs over - selecting a category filters this same
    list by `type`, it is never a separate hardcoded list per category. */
export function getAllResourceItems(): ResourceItem[] {
  return ARTICLES.map(toResourceItem);
}

/** The 3 latest articles by real publication date, newest first, across all 31 - never
    hand-picked and never assumed from array order (even though ARTICLES happens to already be
    authored newest-first; `articleDateValue` above is the actual sort key). */
export function getFeaturedArticles(count = 3): NewsArticle[] {
  return [...ARTICLES].sort((a, b) => articleDateValue(b) - articleDateValue(a)).slice(0, count);
}

/** Featured Articles, shaped as ResourceItems so it can reuse the exact same ResourceCard the
    rest of the page uses. */
export function getFeaturedResourceItems(count = 3): ResourceItem[] {
  return getFeaturedArticles(count).map(toResourceItem);
}

/** Precomputed once at module load, matching the CATEGORY_1_ARTICLES / CATEGORY_2_CARDS style
    already used in this file, since the "3 latest overall" result never depends on props or
    user interaction. */
export const FEATURED_RESOURCE_ITEMS: ResourceItem[] = getFeaturedResourceItems(3);

/** Shape shared by the Category 2 (NewsPressSection) and Category 3 (WebinarsReportsSection)
    cards -- lighter than ResourceItem since those two components never had a type filter. */
export type BlogCategoryCard = {
  slug: string;
  /** The article's own sub-category (e.g. "Stock Market", "GST"), shown as the card's kind/label. */
  kind: string;
  title: string;
  date: string;
  description: string;
  href: string;
};

function toCards(articles: NewsArticle[]): BlogCategoryCard[] {
  return articles.map((article) => ({
    slug: article.slug,
    kind: article.category,
    title: article.title,
    date: article.date,
    description: excerpt(article.lead),
    href: `/blogs/${article.slug}`,
  }));
}

export const CATEGORY_2_CARDS = toCards(CATEGORY_2_ARTICLES);
export const CATEGORY_3_CARDS = toCards(CATEGORY_3_ARTICLES);

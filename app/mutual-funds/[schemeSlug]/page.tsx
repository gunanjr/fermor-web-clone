import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { parseSchemeCodeFromSlug, isCanonicalVariant, buildSchemeSlug } from '../../../src/utils/mutualFundSlug';
import { riskProfile } from '../../../src/utils/mutualFundRisk';
import { NavHistoryChart, type NavPoint } from './NavHistoryChart';
import { InvestmentGrowthCalculator } from './InvestmentGrowthCalculator';
import { ReturnsRankingsTable, type BenchmarkPeriod } from './ReturnsRankingsTable';
import { StickyNavBar } from './StickyNavBar';
import { SaveFundCard } from './SaveFundCard';
import { BookmarkButton } from './BookmarkButton';
import { CompareSimilarFunds } from './CompareSimilarFunds';
import { MutualFundsHeader, MutualFundsFooter, MUTUAL_FUNDS_CHROME_CSS } from '../MutualFundsChrome';
import { FAQBox } from '@/components/common/FAQBox';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.fermor.in';
const INTER = "system-ui, -apple-system, sans-serif";

interface SchemeReturn {
  label: string;
  returnPct: number | null;
  anchorNav: number | null;
  anchorDate: string | null;
}
interface SimilarFund {
  schemeCode: string; schemeName: string; amcName: string | null; nav: number; navDate: string; oneYearReturnPct: number | null;
}
interface AmcFund { schemeCode: string; schemeName: string; category: string; nav: number }

interface RiskRatios {
  alpha: number | null;
  beta: number | null;
  sharpe: number | null;
  sortino: number | null;
  windowDays: number;
  alignedPoints: number;
  riskFreeRatePct: number;
}

interface MutualFundNav {
  schemeCode: string;
  isinGrowth: string | null;
  isinReinvestment: string | null;
  schemeName: string;
  amcName: string | null;
  category: string;
  nav: number;
  navDate: string;
  updatedAt: string;
  returns: SchemeReturn[];
  similarFunds: SimilarFund[];
  amcFunds: AmcFund[];
  categoryBenchmark: BenchmarkPeriod[];
  aaumCr: number | null;
  aaumPeriodLabel: string | null;
  riskRatios: RiskRatios | null;
  navHistory: { date: string; nav: number }[];
}

const MF = {
  green: '#2D9970',
  greenDark: '#1f7a58',
  ink: '#101214',
  ink2: '#565c62',
  ink3: '#80868c',
  border: '#e3e6e8',
  panel: '#f4f5f6',
  bg: '#f4f5f6',
  darkHeader: '#101214',
  riskBg: '#FCEEEC',
  riskBorder: '#F3D6D2',
  riskText: '#B4463B',
};

// Shared prose rhythm for the article body - matches the breathable, mostly-unboxed pacing of
// the annapurna-bhandar-2026 reference page: plain H2 + paragraph flow, no card wrapper per
// section. Boxes are reserved for genuinely tabular data (TableWrap) and the interactive tool.
const hStyle: React.CSSProperties = { fontFamily: 'system-ui, sans-serif', fontSize: 21, fontWeight: 700, color: MF.ink, marginTop: 58, marginBottom: 18, letterSpacing: '-0.01em' };
const pStyle: React.CSSProperties = { fontSize: 15.5, color: MF.ink2, lineHeight: 1.8, marginBottom: 20, maxWidth: '68ch' };

const RETURN_LABELS: Record<string, string> = {
  '1M': '1 Month', '3M': '3 Months', '6M': '6 Months',
  '1Y': '1 Year', '3Y': '3 Years (annualised)', '5Y': '5 Years (annualised)',
};

export const dynamicParams = true;

// A genuine "scheme code doesn't exist" (backend 404) and a transient backend hiccup (Supabase
// connection blip, cold start, a 5xx) used to be treated identically here - both returned null,
// which the caller turns into a real notFound(), i.e. a real 404 HTTP status handed to whoever
// asked, including Googlebot. Once cached for the hour this route revalidates on, that false 404
// can sit there and get recorded in Google's index - explaining scheme pages that show up as
// "Not found (404)" in Search Console weeks after they were confirmed live again, because nothing
// forces Google to recrawl a page it already believes is gone. Only a real 404 from the backend
// short-circuits immediately; anything else gets one silent retry first, same reasoning as the
// single retry already used in MutualFundsSearchClient.tsx.
async function getScheme(schemeSlug: string): Promise<MutualFundNav | null> {
  const schemeCode = parseSchemeCodeFromSlug(schemeSlug);
  if (!schemeCode) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const attempt = async (): Promise<{ ok: true; data: any } | { ok: false; notFound: boolean }> => {
    try {
      const res = await fetch(`${API_BASE}/mutual-funds/${schemeCode}`, { next: { revalidate: 3600 } });
      if (res.status === 404) return { ok: false, notFound: true };
      if (!res.ok) return { ok: false, notFound: false };
      return { ok: true, data: await res.json() };
    } catch {
      return { ok: false, notFound: false };
    }
  };

  let result = await attempt();
  if (!result.ok && !result.notFound) {
    await new Promise(r => setTimeout(r, 400));
    result = await attempt();
  }
  if (!result.ok) return null;

  return { similarFunds: [], amcFunds: [], categoryBenchmark: [], aaumCr: null, aaumPeriodLabel: null, riskRatios: null, navHistory: [], ...result.data };
}

// A real freshness signal, not just a static NAV date: tells a reader (and a crawler comparing
// this page against a competitor's) how recently Fermor's own daily refresh actually ran, computed
// from the real `updatedAt` timestamp the backend sets on every refresh - not implied by NAV date
// alone, since NAV date reflects the trading day AMFI published, not when Fermor last fetched it.
function formatRelativeTime(date: Date): string {
  const diffMin = Math.round((Date.now() - date.getTime()) / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;
  const diffDay = Math.round(diffHr / 24);
  return `${diffDay} day${diffDay === 1 ? '' : 's'} ago`;
}

// A scheme whose most recent AMFI-published NAV is this old is not "delayed" - AMFI publishes
// NAV on every trading day, so 30+ days with no new figure means the scheme has almost certainly
// matured, closed, or merged and AMFI is carrying its final NAV forward unchanged. Verified
// directly against AMFI's own live NAVAll.txt for several such schemes: the frozen NAV in
// Fermor's database matches exactly what AMFI itself still publishes today, so this is not a
// Fermor pipeline gap, it's what "no new data exists" looks like. Threshold picked from the
// real distribution across all ~14,000 schemes on record: 8,578 have a NAV within the last 7
// days and only 39 fall in the 8-30 day gap, so 30 days cleanly separates actively-reporting
// schemes from the (large, roughly 40% of all schemes) genuinely inactive ones.
const STALE_NAV_THRESHOLD_DAYS = 30;
function isStaleNav(navDate: string): boolean {
  const ageDays = (Date.now() - new Date(navDate).getTime()) / 86_400_000;
  return ageDays > STALE_NAV_THRESHOLD_DAYS;
}

function formatAumCr(aumCr: number): string {
  return `₹${aumCr.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
}

function shortCategory(category: string): string {
  return category.replace(/^(Open|Close|Interval) ?Ended Schemes?\(/i, '').replace(/\)$/, '');
}

function explainCategory(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('elss')) return 'ELSS funds invest predominantly in equities and qualify for a Section 80C tax deduction up to Rs 1.5 lakh, with a mandatory 3-year lock-in on every investment.';
  if (c.includes('liquid') || c.includes('money market') || c.includes('overnight')) return 'This category invests in short-duration debt and money market instruments, prioritising capital safety and liquidity over high returns, typically used for parking money for under a year.';
  if (c.includes('gilt')) return 'Gilt funds invest only in government securities, carrying no credit risk but remaining sensitive to interest rate changes.';
  if (c.includes('banking') && c.includes('psu')) return 'This category invests in debt instruments issued by banks, public sector undertakings, and public financial institutions, aiming for relatively lower credit risk within the debt fund universe.';
  if (c.includes('debt')) return 'Debt fund categories invest in bonds and fixed-income instruments rather than equities, with returns driven mainly by interest accrual and interest rate movements rather than market growth.';
  if (c.includes('index') || c.includes('etf')) return 'Index funds and ETFs replicate a market index rather than being actively managed, aiming to match the index return minus a small tracking error and expense ratio.';
  if (c.includes('hybrid')) return 'Hybrid funds invest across both equity and debt in a defined proportion, aiming to balance growth potential against downside volatility.';
  if (c.includes('large cap')) return 'Large cap funds invest predominantly in India\'s largest, most established companies by market capitalisation, generally showing lower volatility than mid or small cap funds.';
  if (c.includes('mid cap')) return 'Mid cap funds invest in mid-sized companies, which typically carry higher growth potential and higher volatility than large cap stocks.';
  if (c.includes('small cap')) return 'Small cap funds invest in smaller companies by market capitalisation, the highest-volatility segment of the equity fund universe.';
  if (c.includes('flexi cap') || c.includes('multi cap')) return 'This category can invest across large, mid, and small cap stocks without a fixed allocation mandate, giving the fund manager flexibility to shift market-cap exposure.';
  if (c.includes('equity')) return 'This is an equity scheme, investing predominantly in listed stocks, with returns tied to broader equity market performance.';
  if (c.includes('fund of fund') || c.includes('fof')) return 'A fund of funds invests in units of other mutual funds or ETFs rather than buying securities directly, adding an extra layer of expense ratio from the underlying funds.';
  return 'This scheme is classified under AMFI\'s official mutual fund categorisation, which groups schemes by their investment mandate and risk profile.';
}

// LTCG/STCG rates confirmed current for FY2026-27: Budget 2026 left mutual fund capital gains
// taxation unchanged from the framework introduced in July 2024 (12.5% equity LTCG above the
// Rs 1.25 lakh annual exemption, 20% equity STCG; debt funds bought on/after 1 April 2023 taxed
// at slab rate with no indexation, regardless of holding period).
function taxTreatment(category: string): { isEquityOriented: boolean | null; paragraphs: string[] } {
  const c = category.toLowerCase();
  const isDebtLike = c.includes('debt') || c.includes('gilt') || c.includes('liquid') || c.includes('money market')
    || c.includes('overnight') || c.includes('banking') || c.includes('corporate bond') || c.includes('credit risk')
    || c.includes('short duration') || c.includes('low duration') || c.includes('ultra short') || c.includes('floater')
    || c.includes('medium duration') || c.includes('long duration') || c.includes('dynamic bond');
  const isEquityLike = c.includes('elss') || c.includes('large cap') || c.includes('mid cap') || c.includes('small cap')
    || c.includes('flexi cap') || c.includes('multi cap') || c.includes('sectoral') || c.includes('thematic')
    || c.includes('focused') || c.includes('value') || c.includes('contra') || c.includes('dividend yield')
    || c.includes('arbitrage') || (c.includes('equity') && !c.includes('equity savings'));

  if (isEquityLike) {
    return {
      isEquityOriented: true,
      paragraphs: [
        'This is an equity-oriented scheme for tax purposes. Gains on units held for more than 12 months are long-term capital gains (LTCG), exempt up to Rs 1.25 lakh in aggregate per financial year across all equity shares and equity mutual funds, and taxed at 12.5% on the excess.',
        'Gains on units sold within 12 months are short-term capital gains (STCG), taxed at a flat 20%. These rates have been unchanged since the Union Budget in July 2024 and were left untouched again in the 2026 Budget.',
      ],
    };
  }
  if (isDebtLike || c.includes('fund of fund') || c.includes('fof')) {
    return {
      isEquityOriented: false,
      paragraphs: [
        'This scheme is taxed as a debt-oriented fund under current rules. For units bought on or after 1 April 2023, the Finance Act 2023 removed both indexation benefit and long-term capital gains treatment: every gain, regardless of how long the units are held, is added to the investor\'s income and taxed at their applicable income tax slab rate.',
        'The 2026 Budget did not restore indexation or a separate long-term rate for this category, despite industry representations from AMFI requesting it.',
      ],
    };
  }
  return {
    isEquityOriented: null,
    paragraphs: [
      'Tax treatment for hybrid schemes depends on the fund\'s actual average equity allocation during the year, not just its category label: funds that maintain 65% or more in equity and equity derivatives are taxed as equity-oriented funds, while funds below that threshold are taxed as debt-oriented funds under the post-April 2023 rules.',
      'Check the scheme\'s factsheet for its disclosed average equity allocation, or consult a SEBI-registered investment adviser or CA, to confirm which treatment applies before estimating post-tax returns.',
    ],
  };
}

function planLabel(schemeName: string): string {
  const lower = schemeName.toLowerCase();
  const plan = /\bdirect\b/.test(lower) ? 'Direct' : 'Regular';
  const option = /\bidcw\b|\bdividend\b/.test(lower) ? 'IDCW (payout/reinvestment)' : /\bgrowth\b/.test(lower) ? 'Growth' : 'Growth/IDCW not specified in scheme name';
  return `${plan} Plan, ${option} option`;
}

export async function generateMetadata({ params }: { params: Promise<{ schemeSlug: string }> }): Promise<Metadata> {
  const { schemeSlug } = await params;
  const scheme = await getScheme(schemeSlug);
  if (!scheme) return { title: 'Scheme Not Found' };

  const oneYear = scheme.returns.find(r => r.label === '1Y');
  const threeYear = scheme.returns.find(r => r.label === '3Y');
  const headline = oneYear?.returnPct != null ? oneYear : threeYear;
  const returnClause = headline?.returnPct != null
    ? `${headline.returnPct >= 0 ? '+' : ''}${headline.returnPct}% ${RETURN_LABELS[headline.label]}.`
    : '';
  const title = `${scheme.schemeName} NAV & Returns`;
  const freshnessClause = isStaleNav(scheme.navDate)
    ? 'AMFI has not published a newer NAV since this date.'
    : 'Updated daily from AMFI.';
  const description = `${scheme.schemeName}: NAV Rs ${scheme.nav.toFixed(4)} as of ${new Date(scheme.navDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}. ${returnClause} Category, risk profile, tax treatment, category ranking and a real investment growth calculator. ${freshnessClause}`.trim();

  const canIndex = isCanonicalVariant(scheme.schemeName) && scheme.returns.some(r => r.returnPct !== null);

  return {
    title: title.length > 60 ? `${scheme.schemeName} NAV Today` : title,
    description: description.length > 300 ? description.slice(0, 297) + '...' : description,
    keywords: [
      scheme.schemeName, `${scheme.schemeName} NAV`, `${scheme.schemeName} returns`,
      `${scheme.amcName ?? ''} mutual fund`, `${shortCategory(scheme.category)} funds India`,
      'mutual fund nav today', 'mutual fund returns calculator', 'sip calculator', 'mutual fund tax on returns',
    ].filter(Boolean),
    alternates: { canonical: `https://fermor.in/mutual-funds/${schemeSlug}` },
    openGraph: { title, description, type: 'website', url: `https://fermor.in/mutual-funds/${schemeSlug}` },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: canIndex, follow: true },
  };
}

export default async function MutualFundSchemePage({ params }: { params: Promise<{ schemeSlug: string }> }) {
  const { schemeSlug } = await params;
  const scheme = await getScheme(schemeSlug);
  if (!scheme) notFound();

  const navDateLabel = new Date(scheme.navDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const updatedLabel = new Date(scheme.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const refreshedRelative = formatRelativeTime(new Date(scheme.updatedAt));
  const staleNav = isStaleNav(scheme.navDate);
  const pageUrl = `https://fermor.in/mutual-funds/${schemeSlug}`;
  const categoryExplanation = explainCategory(scheme.category);
  const categoryShort = shortCategory(scheme.category);
  const plan = planLabel(scheme.schemeName);
  const risk = riskProfile(scheme.category);
  const tax = taxTreatment(scheme.category);
  const canIndex = isCanonicalVariant(scheme.schemeName);

  const headlineReturn = scheme.returns.find(r => r.label === '1Y' && r.returnPct !== null)
    ?? scheme.returns.find(r => r.returnPct !== null);
  const performanceIntro = headlineReturn?.returnPct != null
    ? `${scheme.schemeName} has returned ${headlineReturn.returnPct >= 0 ? '+' : ''}${headlineReturn.returnPct}% over the ${RETURN_LABELS[headlineReturn.label].toLowerCase()} to ${navDateLabel}, based on AMFI's historical NAV data.`
    : `${scheme.schemeName} does not yet have enough historical NAV data on Fermor to show a period return; only its current NAV is available.`;

  // Real dense daily history (scheme.navHistory, ~1 year deep, same data the risk-ratio math
  // uses) merged with the 6 return-period anchors - not either alone. Beyond a year back, only
  // the anchor points exist (the backfill windows around each anchor, not a continuous series),
  // so the chart legitimately gets sparser for 3Y/5Y/All, same as before, but 1Y and shorter now
  // plot from real daily data instead of a single anchor point per period.
  const dateKey = (d: string) => new Date(d).toISOString().slice(0, 10);
  const navPointsMap = new Map<string, NavPoint>();
  for (const h of scheme.navHistory) navPointsMap.set(dateKey(h.date), { label: '', date: h.date, nav: h.nav });
  for (const r of scheme.returns) {
    if (r.anchorNav !== null && r.anchorDate !== null) navPointsMap.set(dateKey(r.anchorDate), { label: r.label, date: r.anchorDate, nav: r.anchorNav });
  }
  navPointsMap.set(dateKey(scheme.navDate), { label: 'Now', date: scheme.navDate, nav: scheme.nav });
  const navPoints: NavPoint[] = Array.from(navPointsMap.values()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const initials = (scheme.amcName ?? scheme.schemeName).split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Mutual Funds', item: 'https://fermor.in/mutual-funds' },
      { '@type': 'ListItem', position: 3, name: scheme.schemeName, item: pageUrl },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
    sameAs: ['https://fermor.in', 'https://fermor.in/about'],
    knowsAbout: ['Mutual Fund NAV', 'AMFI Guidelines', 'SEBI Regulations', 'Indian Investment Products', 'Capital Gains Tax on Mutual Funds', scheme.category],
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${scheme.schemeName} NAV and Returns`,
    description: `NAV, historical returns, category ranking, risk profile, tax treatment, and peer comparison for ${scheme.schemeName}.`,
    url: pageUrl,
    inLanguage: 'en-IN',
    dateModified: scheme.updatedAt,
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.article-lead', '#performance p:first-of-type'] },
    about: [{ '@type': 'DefinedTerm', name: 'Net Asset Value', alternateName: 'NAV' }],
    audience: {
      '@type': 'Audience',
      audienceType: 'Indian retail investors, mutual fund investors',
      geographicArea: { '@type': 'Country', name: 'India' },
    },
    hasPart: [
      { '@type': 'WebPageElement', cssSelector: '#hero', name: 'NAV and Performance' },
      { '@type': 'WebPageElement', cssSelector: '#investment-growth-calculator', name: 'Investment Growth Calculator' },
      { '@type': 'WebPageElement', cssSelector: '#returns-rankings', name: 'Returns and Rankings' },
      { '@type': 'WebPageElement', cssSelector: '#advanced-ratios', name: 'Advanced Ratios' },
      { '@type': 'WebPageElement', cssSelector: '#taxation', name: 'Exit Load, Stamp Duty and Tax' },
      { '@type': 'WebPageElement', cssSelector: '#compare-similar-funds', name: 'Compare Similar Funds' },
      { '@type': 'WebPageElement', cssSelector: '#what-is-nav', name: 'What Is NAV' },
      { '@type': 'WebPageElement', cssSelector: '#how-to-invest', name: 'How to Invest' },
      { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
    ],
  };

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'NAV',
    alternateName: 'Net Asset Value',
    description: 'The per-unit market value of a mutual fund scheme, calculated by dividing total scheme assets minus liabilities by the number of outstanding units.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Investment and Finance Terms', url: 'https://fermor.in/mutual-funds' },
    sameAs: ['https://en.wikipedia.org/wiki/Net_asset_value', 'https://www.wikidata.org/wiki/Q1153672'],
  };

  const similarFundsItemList = scheme.similarFunds.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Funds similar to ${scheme.schemeName}`,
    itemListElement: scheme.similarFunds.map((f, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://fermor.in/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`,
      name: f.schemeName,
    })),
  } : null;

  const oneYearBenchmark = scheme.categoryBenchmark.find(b => b.label === '1Y');
  const threeYearBenchmark = scheme.categoryBenchmark.find(b => b.label === '3Y');

  // Only scheme- or category-specific questions live here. Fully generic mutual fund mechanics
  // (what is NAV, how returns are calculated, Direct vs Regular, Growth vs IDCW, what is Fermor)
  // used to be repeated byte-for-byte in this array on all ~14,000 scheme pages - moved once to
  // /mutual-funds/guide and linked from here instead, so each page's FAQPage schema is now made
  // entirely of content that's actually unique to this scheme, not a duplicated boilerplate block.
  const faqItems = [
    { q: `What is the NAV of ${scheme.schemeName}?`, a: `The NAV of ${scheme.schemeName} is Rs ${scheme.nav.toFixed(4)} per unit as of ${navDateLabel}, per AMFI's daily NAV data.` },
    ...(headlineReturn?.returnPct != null ? [{
      q: `What has been the return of ${scheme.schemeName}?`,
      a: `${scheme.schemeName} returned ${headlineReturn.returnPct >= 0 ? '+' : ''}${headlineReturn.returnPct}% over the ${RETURN_LABELS[headlineReturn.label].toLowerCase()} to ${navDateLabel}. Periods of 1 year or longer are annualised; shorter periods are point-to-point.`,
    }] : []),
    ...(threeYearBenchmark?.rank != null ? [{
      q: `How does ${scheme.schemeName} rank against similar funds?`,
      a: `Over 3 years, ${scheme.schemeName} ranks ${threeYearBenchmark.rank} of ${threeYearBenchmark.peerCount} Direct Plan, Growth option schemes in the "${categoryShort}" category, computed live from real AMFI NAV data across every fund in the category.`,
    }] : []),
    { q: `What does the category "${categoryShort}" mean?`, a: categoryExplanation },
    { q: `How risky is ${scheme.schemeName}?`, a: risk.tier ? `Funds in the "${categoryShort}" category are typically placed at ${risk.tier} risk on SEBI's mandatory product riskometer. ${risk.note}` : risk.note },
    { q: `How are gains from ${scheme.schemeName} taxed?`, a: tax.paragraphs[0] },
    ...(scheme.similarFunds.length > 0 ? [{
      q: `What are similar funds to ${scheme.schemeName}?`,
      a: `Other AMCs run schemes in the same "${categoryShort}" category, including ${scheme.similarFunds.slice(0, 3).map(f => f.schemeName).join(', ')}. Compare their NAV and 1-year returns in the "Compare Similar Funds" section on this page.`,
    }] : []),
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      {similarFundsItemList && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(similarFundsItemList) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <style>{`
        .mf2-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 52px; align-items: start; }
        @media (max-width: 900px) { .mf2-grid { grid-template-columns: 1fr !important; } }
        .mf2-sidebar {
          position: sticky; top: 76px; align-self: start;
          max-height: calc(100vh - 96px); overflow-y: auto; padding-right: 2px;
          display: flex; flex-direction: column; gap: 20px;
          scrollbar-width: thin; scrollbar-color: #C4C9C4 transparent;
        }
        .mf2-sidebar > * { flex-shrink: 0; }
        .mf2-sidebar::-webkit-scrollbar { width: 5px; }
        .mf2-sidebar::-webkit-scrollbar-track { background: transparent; }
        .mf2-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .mf2-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) { .mf2-sidebar { position: static; max-height: none; overflow-y: visible; } }
        input[type=range] { -webkit-appearance: none; appearance: none; background: transparent; }
        input[type=range]::-webkit-slider-runnable-track { height: 6px; border-radius: 3px; background: #DDE7D8; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #2D9970; border: 3px solid #fff; box-shadow: 0 1px 4px rgba(0,0,0,.25); margin-top: -7px; cursor: pointer; }
        a.mf2-link { color: ${MF.ink}; text-decoration: underline; text-decoration-color: #B9BEC3; text-underline-offset: 3px; }
        a.mf2-link:hover { color: #1F7A58; text-decoration-color: #1F7A58; }
        .mf2-stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .mf2-amc-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; }
        .mf2-calc-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: start; }
        @media (max-width: 640px) {
          .mf2-stat-grid { grid-template-columns: repeat(2,1fr) !important; }
          .mf2-amc-grid { grid-template-columns: 1fr !important; }
          .mf2-calc-grid { grid-template-columns: 1fr !important; }
        }
        ${MUTUAL_FUNDS_CHROME_CSS}
      `}</style>

      <div style={{ fontFamily: INTER, background: MF.bg, color: MF.ink, minHeight: '100vh', lineHeight: 1.5 }}>

        <MutualFundsHeader signupHref="#save-fund" />

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px 0', font: '13px system-ui,sans-serif', color: '#565c62', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Fermor</Link>
          <span>/</span>
          <Link href="/mutual-funds" target="_blank" rel="noopener noreferrer" style={{ color: '#565c62', textDecoration: 'none' }}>Mutual Funds</Link>
          <span>/</span>
          <span style={{ color: MF.ink, fontWeight: 600, overflowWrap: 'anywhere', minWidth: 0 }} aria-current="page">{scheme.schemeName}</span>
        </div>

        {/* Plain top header band, not a card - matches how Groww's own page and the Annapurna
            reference both present the H1 directly on the page background. */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px 28px', borderBottom: `1px solid ${MF.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f1f3f4', display: 'flex', alignItems: 'center', justifyContent: 'center', font: '700 16px system-ui', color: MF.greenDark, flex: 'none' }}>
                {initials}
              </div>
              <div>
                <h1 style={{ margin: '0 0 10px', font: '700 27px/1.3 system-ui,sans-serif', letterSpacing: '-0.01em', color: MF.ink }}>{scheme.schemeName}</h1>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Chip label={categoryShort} />
                  <Chip label={plan} />
                  {risk.tier && <Chip label={`${risk.tier} Risk`} risk />}
                  {!canIndex && <Chip label="Non-canonical variant" />}
                </div>
              </div>
            </div>
            <BookmarkButton schemeCode={scheme.schemeCode} />
          </div>
        </div>

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px 0' }}>
          <div className="mf2-grid">
            <div style={{ minWidth: 0 }}>

              <section id="hero" aria-label="NAV and performance">
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
                  <span style={{ font: '700 40px/1 system-ui,sans-serif', letterSpacing: '-0.02em', color: MF.ink }}>&#8377;{scheme.nav.toFixed(2)}</span>
                  <span style={{ font: '600 15px system-ui', color: '#565c62' }}>NAV as of {navDateLabel}</span>
                  {staleNav ? (
                    <span style={{ font: '500 12.5px system-ui', color: MF.ink3, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: MF.ink3, display: 'inline-block' }} aria-hidden="true" />
                      No newer NAV published by AMFI
                    </span>
                  ) : (
                    <span style={{ font: '500 12.5px system-ui', color: MF.greenDark, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: MF.green, display: 'inline-block' }} aria-hidden="true" />
                      Data refreshed {refreshedRelative}
                    </span>
                  )}
                </div>

                {staleNav && (
                  <div style={{ marginTop: 18, background: MF.panel, border: `1px solid ${MF.border}`, borderRadius: 10, padding: '14px 18px' }}>
                    <p style={{ margin: 0, font: '13px/1.6 system-ui', color: MF.ink2 }}>
                      AMFI has not published a newer NAV for this scheme since {navDateLabel}. This usually means the scheme has matured, closed, or merged into another fund. Fermor checks AMFI&apos;s daily feed for this scheme every day and will update this page automatically the moment a new NAV appears; the figures below reflect the last real NAV AMFI published.
                    </p>
                  </div>
                )}

                <div style={{ marginTop: 34 }}>
                  <NavHistoryChart points={navPoints} schemeName={scheme.schemeName} />
                </div>

                <div className="mf2-stat-grid" style={{ marginTop: 36, paddingTop: 28, borderTop: `1px solid ${MF.border}` }}>
                  <Stat label="NAV date" value={navDateLabel} />
                  {scheme.aaumCr != null && <Stat label="Fund size (AUM)" value={formatAumCr(scheme.aaumCr)} />}
                  <Stat label="Plan / option" value={plan} />
                  <Stat label="Risk (category)" value={risk.tier ?? 'Varies'} />
                </div>
              </section>

              {/* Interactive tool - the one section besides genuinely tabular data that keeps a
                  bordered box, since it's a distinct utility, not prose. */}
              <section id="investment-growth-calculator" aria-labelledby="calc-h2" style={{ border: `1px solid ${MF.border}`, borderRadius: 14, padding: 30, marginTop: 48, marginBottom: 28 }}>
                <h2 id="calc-h2" style={{ margin: '0 0 6px', font: '700 19px system-ui', color: MF.ink }}>Investment growth calculator</h2>
                <p style={{ margin: '0 0 22px', font: '14px/1.6 system-ui', color: '#565c62', maxWidth: '60ch' }}>
                  See what a monthly SIP could grow to using this fund&apos;s own trailing returns, or check what a real historical lumpsum investment would be worth today.
                </p>
                <InvestmentGrowthCalculator schemeName={scheme.schemeName} returns={scheme.returns} />
              </section>


              {scheme.categoryBenchmark.length > 0 && (
                <section id="returns-rankings" aria-labelledby="returns-h2">
                  <h2 id="returns-h2" style={hStyle}>Returns and Rankings</h2>
                  <p style={pStyle}>{performanceIntro}</p>
                  <TableWrap label="Returns and Rankings">
                    <ReturnsRankingsTable periods={scheme.categoryBenchmark} categoryShort={categoryShort} />
                  </TableWrap>
                </section>
              )}

              {scheme.riskRatios && scheme.riskRatios.alpha != null && (
                <section id="advanced-ratios" aria-labelledby="ratios-h2">
                  <h2 id="ratios-h2" style={hStyle}>Advanced Ratios</h2>
                  {/* Definition-block treatment (left border, single tint) - the one sanctioned
                      colored-box pattern for genuinely load-bearing methodology, not decoration. */}
                  <div style={{ background: '#f4f5f6', borderLeft: `3px solid ${MF.green}`, borderRadius: '0 8px 8px 0', padding: '16px 20px', margin: '0 0 20px', maxWidth: '68ch' }}>
                    <p style={{ margin: 0, fontSize: 14, color: MF.ink, lineHeight: 1.75 }}>
                      Computed over the last <strong>{Math.round(scheme.riskRatios.windowDays / 30)} months ({scheme.riskRatios.windowDays} days, {scheme.riskRatios.alignedPoints} aligned NAV points)</strong> of
                      this fund&apos;s own real daily NAV against the Nifty 50, using India&apos;s 10-year G-Sec yield (<strong>{scheme.riskRatios.riskFreeRatePct}%</strong>) as the risk-free rate.
                      This is a shorter window than most competitor sites use (typically 3-5 years), so Sharpe and Sortino can look quite different when recent returns have been weak: we&apos;d rather show the window than hide it.
                    </p>
                  </div>
                  <TableWrap label="Advanced Ratios (1Y)">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, padding: 18 }}>
                      <RatioStat label="Alpha" value={scheme.riskRatios.alpha} />
                      <RatioStat label="Beta" value={scheme.riskRatios.beta} />
                      <RatioStat label="Sharpe" value={scheme.riskRatios.sharpe} />
                      <RatioStat label="Sortino" value={scheme.riskRatios.sortino} />
                    </div>
                  </TableWrap>
                  <p style={{ font: '11.5px system-ui', color: '#80868c', margin: '10px 0 0' }}>
                    1-year window &middot; vs Nifty 50 &middot; risk-free rate {scheme.riskRatios.riskFreeRatePct}% (10Y G-Sec).
                  </p>
                </section>
              )}

              <section id="taxation" aria-labelledby="tax-h2">
                <h2 id="tax-h2" style={hStyle}>Exit Load, Stamp Duty and Tax</h2>
                <p style={pStyle}>
                  Every purchase carries a flat 0.005% stamp duty. Exit load, charged only within a certain holding period, is set by the AMC per scheme
                  and disclosed in its SID: check there before redeeming if timing matters.
                </p>
                <p style={pStyle}>{tax.paragraphs[0]}</p>
              </section>

              {scheme.similarFunds.length > 0 && (
                <section id="compare-similar-funds" aria-labelledby="compare-h2">
                  <h2 id="compare-h2" style={hStyle}>Compare Similar Funds</h2>
                  <CompareSimilarFunds
                    mainFund={{
                      schemeCode: scheme.schemeCode,
                      schemeName: scheme.schemeName,
                      nav: scheme.nav,
                      oneYearReturnPct: scheme.returns.find(r => r.label === '1Y')?.returnPct ?? null,
                      aaumCr: scheme.aaumCr,
                      riskTier: risk.tier,
                    }}
                    peers={scheme.similarFunds}
                  />
                </section>
              )}

              <section id="what-is-nav" aria-labelledby="edu-h2">
                <h2 id="edu-h2" style={hStyle}>What Is NAV?</h2>
                <p style={pStyle}>
                  NAV is the per-unit price of {scheme.schemeName}, published daily under <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>SEBI</a> and{' '}
                  <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>AMFI</a> rules.
                  See how <Link href="/mutual-funds/guide#what-is-nav" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>mutual fund NAV is calculated</Link> for the full mechanics.
                </p>
                <p style={pStyle}>{categoryExplanation}</p>
              </section>

              <section id="how-to-invest" aria-labelledby="invest-h2">
                <h2 id="invest-h2" style={hStyle}>How to Invest in {scheme.schemeName}</h2>
                <p style={pStyle}>
                  Investing follows the same five-step process for any AMFI-registered scheme: complete KYC once, choose Direct or Regular,
                  decide lumpsum or SIP using the calculator above, choose Growth or IDCW, then submit through the AMC, a registered platform, or an RTA.
                  See the full <Link href="/mutual-funds/guide#how-to-invest" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>step-by-step guide to investing in mutual funds</Link> for
                  detail on each step, including the Direct vs Regular and Growth vs IDCW tradeoffs.
                </p>
                <p style={{ font: '12.5px system-ui', color: '#80868c', margin: 0 }}>
                  Minimum investment amounts (commonly Rs 100-500 for SIPs and Rs 1,000-5,000 for a lumpsum) are set by each AMC and disclosed in the SID; confirm the exact figure for this scheme before investing.
                </p>
              </section>

              {scheme.amcFunds.length > 0 && (
                <section id="more-from-amc" aria-labelledby="more-h2">
                  <h2 id="more-h2" style={hStyle}>More Funds From {scheme.amcName}</h2>
                  <div className="mf2-amc-grid">
                    {scheme.amcFunds.map(f => (
                      <Link key={f.schemeCode} href={`/mutual-funds/${buildSchemeSlug(f.schemeCode, f.schemeName)}`} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'block', border: `1px solid ${MF.border}`, borderRadius: 10, padding: 14, fontSize: 13, textDecoration: 'none' }}>
                        <div style={{ fontWeight: 600, color: MF.ink, marginBottom: 4 }}>{f.schemeName}</div>
                        <div style={{ color: '#80868c' }}>{shortCategory(f.category)}</div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <p style={{ ...pStyle, marginTop: 24, maxWidth: '70ch' }}>
                Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>SIP Calculator</Link> to
                project returns from a monthly investment in this category, the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>Lumpsum Calculator</Link> for
                a one-time investment, the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>CAGR Calculator</Link> to
                work out the annualised return you have actually earned, and the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link" style={{ fontWeight: 600 }}>XIRR Calculator</Link> for
                a series of SIP instalments made on different dates.
              </p>


              <section id="faq" aria-labelledby="faq-h2">
                <h2 id="faq-h2" style={hStyle}>Frequently Asked Questions</h2>
                <FAQBox items={faqItems} marginTop={16} />
              </section>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${MF.border}`, paddingTop: 20, marginTop: 32, marginBottom: 40 }}>
                <p style={{ margin: 0, font: '11.5px/1.65 system-ui', color: '#80868c' }}>
                  <strong>Disclaimer:</strong> NAV and historical return data is sourced from AMFI{staleNav ? ', checked daily against AMFI\'s feed for a newer figure' : ' and refreshed daily'}. Risk profile and tax treatment
                  described on this page are general, category-level information, not this specific scheme&apos;s officially disclosed riskometer level
                  or individualised tax advice. Category average and rank are computed live from real AMFI NAV data across the category and may include
                  or exclude schemes depending on what history Fermor has recorded for each one. Mutual fund investments are subject to market risk. Past
                  performance does not indicate future returns. This page is for informational purposes only and does not constitute investment advice.
                  Consult a SEBI-registered investment adviser or a chartered accountant before making investment or tax decisions.
                </p>
              </div>
            </div>

            <aside className="mf2-sidebar" aria-label="Sidebar">
              <SaveFundCard schemeCode={scheme.schemeCode} />

              <div style={{ background: '#fff', border: `1px solid ${MF.border}`, borderRadius: 16, padding: 22 }}>
                <h2 style={{ margin: '0 0 14px', font: '700 13px system-ui', color: '#565c62', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Quick Facts</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <FactRow label="AMC" value={scheme.amcName ?? '-'} />
                  {scheme.aaumCr != null && <FactRow label="Fund size" value={formatAumCr(scheme.aaumCr)} />}
                  <FactRow label="Category" value={categoryShort} />
                  <FactRow label="Plan" value={plan} />
                  <FactRow label="Scheme code" value={scheme.schemeCode} />
                  {scheme.isinGrowth && <FactRow label="ISIN" value={scheme.isinGrowth} />}
                  {risk.tier && <FactRow label="Risk" value={risk.tier} riskColor />}
                  <FactRow label={staleNav ? 'Last checked' : 'Updated'} value={staleNav ? `${refreshedRelative}, no new NAV` : `${refreshedRelative} (${updatedLabel})`} />
                </div>
              </div>

              <nav aria-label="Related Calculators" style={{ background: '#fff', border: `1px solid ${MF.border}`, borderRadius: 16, padding: 22 }}>
                <h2 style={{ margin: '0 0 14px', font: '700 13px system-ui', color: '#565c62', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Popular Calculators</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, font: '14px system-ui' }}>
                  <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link">SIP calculator</Link>
                  <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link">Lumpsum calculator</Link>
                  <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link">CAGR calculator</Link>
                  <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link">XIRR calculator</Link>
                  <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" className="mf2-link">Income tax calculator</Link>
                </div>
              </nav>
            </aside>
          </div>
        </main>

        <MutualFundsFooter />

        <StickyNavBar schemeName={scheme.schemeName} nav={scheme.nav} />
      </div>
    </>
  );
}

// Bordered box with a small uppercase label header - reserved for genuinely tabular data
// (returns/rankings, fund comparison), matching the TableWrap pattern used on the
// annapurna-bhandar-2026 reference page rather than a heavy padded card per section.
function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${MF.border}`, borderRadius: 10, overflow: 'hidden', margin: '16px 0 20px' }}>
      {label && (
        <div style={{ background: MF.panel, padding: '10px 16px', borderBottom: `1px solid ${MF.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#565c62' }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function Chip({ label, risk }: { label: string; risk?: boolean }) {
  return (
    <span style={{
      background: risk ? MF.riskBg : '#f4f5f6',
      border: `1px solid ${risk ? MF.riskBorder : MF.border}`,
      color: risk ? MF.riskText : '#565c62',
      font: '500 12px system-ui', padding: '5px 12px', borderRadius: 20,
    }}>
      {label}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ font: '500 12px system-ui', color: '#565c62', marginBottom: 5 }}>{label}</div>
      <div style={{ font: '600 16px system-ui' }}>{value}</div>
    </div>
  );
}

function RatioStat({ label, value }: { label: string; value: number | null }) {
  return (
    <div>
      <div style={{ font: '500 12px system-ui', color: '#565c62', marginBottom: 5 }}>{label}</div>
      <div style={{ font: '700 18px system-ui', color: MF.ink }}>{value == null ? '--' : value.toFixed(2)}</div>
    </div>
  );
}

function FactRow({ label, value, riskColor }: { label: string; value: string; riskColor?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: '13px system-ui' }}>
      <span style={{ color: '#565c62' }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: 'right', color: riskColor ? MF.riskText : MF.ink }}>{value}</span>
    </div>
  );
}


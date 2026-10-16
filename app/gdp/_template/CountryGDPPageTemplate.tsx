import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { GDPLineChart, GDPGrowthBarChart } from './GDPCharts';
import { CountryGDPTableClient } from './CountryGDPTableClient';
import { INRConversionLine } from './INRConversionLine';
import { LocalCurrencyConversionLine } from './LocalCurrencyConversionLine';
import type { CountryGDPData } from './country-types';

// Rotates the in-content calculator CTA by country rank, so the 218 country pages don't all
// push the same single calculator (spammy, and wastes the internal-link variety opportunity).
const CALC_POOL = [
  { label: 'SIP Calculator', desc: 'See what a monthly investment could grow to over a similar multi-decade horizon.', href: '/calculators/sip-calculator' },
  { label: 'Lumpsum Calculator', desc: 'Model a one-time investment growing over 10, 20, or 30 years.', href: '/calculators/lumpsum-calculator' },
  { label: 'CAGR Calculator', desc: 'Work out the compound annual growth rate behind any investment or income change.', href: '/calculators/cagr-calculator' },
  { label: 'Mutual Fund Calculator', desc: 'Project mutual fund SIP or lumpsum growth at a chosen return rate.', href: '/calculators/mutual-fund-calculator' },
  { label: 'PPF Calculator', desc: 'Estimate a guaranteed-return 15-year PPF maturity value.', href: '/calculators/ppf-calculator' },
  { label: 'FD Calculator', desc: 'Compare fixed deposit maturity value across tenures and rates.', href: '/calculators/fd-calculator' },
  { label: 'Retirement Calculator', desc: 'Check whether your current savings rate is on track for retirement.', href: '/calculators/retirement-calculator' },
  { label: 'Income Tax Calculator', desc: 'Compare old and new regime tax liability for FY 2025-26.', href: '/calculators/income-tax-calculator' },
  { label: 'EMI Calculator', desc: 'Work out the monthly EMI on a home loan at current interest rates.', href: '/calculators/mortgage-calculator' },
  { label: 'NPS Calculator', desc: 'Project retirement corpus and annuity from National Pension System contributions.', href: '/calculators/nps-calculator' },
  { label: 'SWP Calculator', desc: 'Plan a systematic withdrawal from an existing lump sum investment.', href: '/calculators/swp-calculator' },
  { label: 'Step-Up SIP Calculator', desc: 'Model a SIP that increases every year in line with rising income.', href: '/calculators/step-up-sip-calculator' },
  { label: 'Compound Interest Calculator', desc: 'See how compounding frequency changes long-term growth.', href: '/calculators/compound-interest-calculator' },
  { label: 'Rule of 72 Calculator', desc: 'Estimate how many years it takes an investment to double at a given rate.', href: '/calculators/rule-of-72-calculator' },
  { label: 'Inflation Calculator', desc: "See what today's amount will be worth in the future after inflation.", href: '/calculators/inflation-calculator' },
  { label: 'Inflation-Adjusted Return Calculator', desc: 'Convert a nominal investment return into its real, inflation-adjusted value.', href: '/calculators/inflation-adjusted-return-calculator' },
  { label: 'Real Return Calculator', desc: 'Work out the real rate of return after accounting for inflation.', href: '/calculators/real-return-calculator' },
  { label: 'XIRR Calculator', desc: 'Calculate the annualized return on irregular, multi-date cash flows.', href: '/calculators/xirr-calculator' },
  { label: 'Future Value Calculator', desc: 'Project the future value of a lump sum or series of investments.', href: '/calculators/future-value-calculator' },
  { label: 'Present Value Calculator', desc: "Work out today's value of a future sum of money.", href: '/calculators/present-value-calculator' },
  { label: 'Index Fund Return Calculator', desc: 'Project long-term index fund growth at a chosen return rate.', href: '/calculators/index-fund-return-calculator' },
  { label: 'ETF Return Calculator', desc: 'Estimate ETF investment growth over a chosen holding period.', href: '/calculators/etf-return-calculator' },
  { label: 'ELSS Calculator', desc: 'Project ELSS mutual fund growth alongside its Section 80C tax benefit.', href: '/calculators/elss-calculator' },
  { label: 'Wealth Growth Calculator', desc: 'Model long-term wealth accumulation from combined savings and returns.', href: '/calculators/wealth-growth-calculator' },
  { label: 'Money Doubling Calculator', desc: 'Find out exactly how long it takes your money to double at a given rate.', href: '/calculators/money-doubling-calculator' },
  { label: 'EPF Calculator', desc: 'Project Employee Provident Fund maturity value at retirement.', href: '/calculators/epf-calculator' },
  { label: 'VPF Calculator', desc: 'Model Voluntary Provident Fund contributions on top of mandatory EPF.', href: '/calculators/vpf-calculator' },
  { label: 'Gratuity Calculator', desc: 'Estimate the gratuity payout due at retirement or resignation.', href: '/calculators/gratuity-calculator' },
  { label: 'RD Calculator', desc: 'Calculate recurring deposit maturity value across banks and tenures.', href: '/calculators/rd-calculator' },
  { label: 'SCSS Calculator', desc: 'Estimate Senior Citizen Savings Scheme quarterly payouts.', href: '/calculators/scss-calculator' },
  { label: 'NSC Calculator', desc: 'Project National Savings Certificate maturity value.', href: '/calculators/nsc-calculator' },
  { label: 'Home Loan Calculator', desc: 'Work out EMI, total interest, and payoff schedule on a home loan.', href: '/calculators/home-loan-calculator' },
  { label: 'Home Loan Eligibility Calculator', desc: 'Check how much home loan you could qualify for based on income.', href: '/calculators/home-loan-eligibility-calculator' },
  { label: 'Car Loan Calculator', desc: 'Calculate EMI and total interest on a car loan.', href: '/calculators/car-loan-calculator' },
  { label: 'Personal Loan Calculator', desc: 'Work out EMI and total repayment on a personal loan.', href: '/calculators/personal-loan-calculator' },
  { label: 'Loan Prepayment Calculator', desc: 'See how much interest a lump-sum prepayment can save.', href: '/calculators/loan-prepayment-calculator' },
  { label: 'Capital Gains Calculator', desc: 'Calculate short-term and long-term capital gains tax on investments.', href: '/calculators/capital-gains-calculator' },
  { label: 'Old vs New Tax Regime Calculator', desc: 'Compare which income tax regime results in lower tax for FY 2025-26.', href: '/calculators/old-vs-new-tax-regime-calculator' },
  { label: 'Net Worth Calculator', desc: 'Add up assets and liabilities to track your net worth over time.', href: '/calculators/net-worth-calculator' },
  { label: 'Goal Planning Calculator', desc: 'Work out the monthly investment needed to hit a specific financial goal.', href: '/calculators/goal-planning-calculator' },
  { label: 'Emergency Fund Calculator', desc: 'Work out how many months of expenses your emergency fund covers.', href: '/calculators/emergency-fund-calculator' },
  { label: 'Portfolio Return Calculator', desc: 'Calculate the blended return across a multi-asset portfolio.', href: '/calculators/portfolio-return-calculator' },
  { label: 'Asset Allocation Calculator', desc: 'Work out an equity-debt split based on age and risk appetite.', href: '/calculators/asset-allocation-calculator' },
];
// The first CTA's calculator is a straight rotation by rank. The second is offset by an amount
// that itself depends on rank, not a fixed number, so the exact (calc1, calc2) pair has a much
// longer repeat cycle (up to pool.length * (pool.length - 1) ranks) instead of repeating every
// pool.length countries, which a fixed offset would produce.
// Top-ranked economies get the most search traffic, so their two CTAs are drawn from a smaller
// "flagship" pool of Fermor's highest-intent calculators, not whatever the full 44-item rotation
// happens to land on (which could put something as niche as Rule of 72 on the United States page).
const STRONG_CALC_LABELS = new Set([
  'SIP Calculator', 'Lumpsum Calculator', 'EMI Calculator', 'Home Loan Calculator',
  'Home Loan Eligibility Calculator', 'Income Tax Calculator', 'Old vs New Tax Regime Calculator',
  'Mutual Fund Calculator', 'PPF Calculator', 'NPS Calculator', 'Retirement Calculator', 'FD Calculator',
]);
const STRONG_CALC_POOL = CALC_POOL.filter(c => STRONG_CALC_LABELS.has(c.label));
const STRONG_RANK_THRESHOLD = 30;

// The first CTA is tailored to the country's own growth profile, not just rotated: a
// fast-growing economy (>=5%) points at growth-oriented tools, a contracting one (<0%) points
// at capital-preservation tools, and everything in between falls back to the rank-based rotation.
const GROWTH_ORIENTED_LABELS = new Set(['SIP Calculator', 'Lumpsum Calculator', 'Mutual Fund Calculator', 'Step-Up SIP Calculator', 'Index Fund Return Calculator', 'ETF Return Calculator']);
const SAFETY_ORIENTED_LABELS = new Set(['FD Calculator', 'PPF Calculator', 'RD Calculator', 'NSC Calculator', 'SCSS Calculator']);

function pickCalc(rank: number, slot: 0 | 1, growth: number | null, override?: (typeof CALC_POOL)[number]) {
  if (override) return override;
  const pool = rank <= STRONG_RANK_THRESHOLD ? STRONG_CALC_POOL : CALC_POOL;

  if (slot === 0 && growth !== null) {
    const contextPool = growth >= 5
      ? pool.filter(c => GROWTH_ORIENTED_LABELS.has(c.label))
      : growth < 0
        ? pool.filter(c => SAFETY_ORIENTED_LABELS.has(c.label))
        : [];
    if (contextPool.length > 0) return contextPool[rank % contextPool.length];
  }

  const idx1 = rank % pool.length;
  if (slot === 0) return pool[idx1];
  const offset2 = 1 + (rank % (pool.length - 1));
  return pool[(idx1 + offset2) % pool.length];
}

const C = {
  dark:   '#111111',
  dg:     '#101214',
  ink:    '#333333',
  ink2:   '#555555',
  ink3:   '#888888',
  border: '#E5E5E5',
  bg:     '#F7F7F7',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.85, marginBottom: 20 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 40, marginBottom: 16, letterSpacing: '-0.01em' };

function formatGDP(billions: number): string {
  if (billions >= 1000) return `$${(billions / 1000).toFixed(2)} trillion`;
  return `$${billions.toFixed(2)} billion`;
}

export default function CountryGDPPageTemplate({ data }: { data: CountryGDPData }) {
  const latest = data.history[data.history.length - 1];
  const prevYear = data.history[data.history.length - 2];
  const yoyChange = prevYear ? (((latest.perCapita ?? 0) - (prevYear.perCapita ?? 0)) / (prevYear.perCapita ?? 1)) * 100 : null;
  const allRows = [...data.history, ...data.projections];

  const growthRows = data.history.filter(r => r.growth !== null) as (typeof data.history[number] & { growth: number })[];
  const avgGrowth = growthRows.length > 0 ? growthRows.reduce((s, r) => s + r.growth, 0) / growthRows.length : null;
  const bestYear = growthRows.length > 0 ? growthRows.reduce((a, b) => (b.growth > a.growth ? b : a)) : null;
  const worstYear = growthRows.length > 0 ? growthRows.reduce((a, b) => (b.growth < a.growth ? b : a)) : null;
  const contractionCount = growthRows.filter(r => r.growth < 0).length;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
      { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
      { '@type': 'ListItem', position: 3, name: 'World GDP Ranking', item: 'https://fermor.in/blogs/world-gdp-ranking-2026' },
      { '@type': 'ListItem', position: 4, name: `${data.name} GDP`, item: `https://fermor.in/gdp/${data.slug}` },
    ],
  };

  const faqItems = [
    { q: `What is the GDP of ${data.name}?`, a: `The nominal GDP of ${data.name} in ${latest.year} is ${formatGDP(latest.gdp)}, according to the IMF World Economic Outlook (April 2026). This ranks ${data.name} ${data.rank2026}${data.rank2026 === 1 ? 'st' : data.rank2026 === 2 ? 'nd' : data.rank2026 === 3 ? 'rd' : 'th'} in the world by nominal GDP.` },
    { q: `What is the GDP growth rate of ${data.name}?`, a: latest.growth !== null ? `The GDP growth rate of ${data.name} in ${latest.year} is ${latest.growth}%, per IMF estimates.` : `IMF does not publish a ${latest.year} growth estimate for ${data.name} in this dataset.` },
    { q: `What is the GDP per capita of ${data.name}?`, a: latest.perCapita !== null ? `GDP per capita in ${data.name} in ${latest.year} is $${Math.round(latest.perCapita).toLocaleString('en-US')}, per IMF data.` : `IMF does not publish a ${latest.year} per capita estimate for ${data.name} in this dataset.` },
    { q: `Is the GDP of ${data.name} expected to grow?`, a: data.projections.length > 0 ? `IMF projects the nominal GDP of ${data.name} to reach ${formatGDP(data.projections[data.projections.length - 1].gdp)} by ${data.projections[data.projections.length - 1].year}, up from ${formatGDP(latest.gdp)} in ${latest.year}.` : `IMF projection data is not available for ${data.name} in this dataset.` },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://fermor.in/gdp/${data.slug}`,
    name: `${data.name} GDP (${latest.year}): History, Growth Rate, and IMF Projections - Fermor`,
    url: `https://fermor.in/gdp/${data.slug}`,
    inLanguage: 'en-IN',
    datePublished: data.datePublished,
    dateModified: data.dateModified,
    isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
    publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
    about: [{
      '@type': 'DefinedTerm',
      name: `${data.name} GDP`,
      description: `Gross Domestic Product of ${data.name}: ${formatGDP(latest.gdp)} nominal in ${latest.year}, per IMF World Economic Outlook.`,
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'World GDP Data', url: 'https://fermor.in/blogs/world-gdp-ranking-2026' },
    }],
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
    description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors.',
    knowsAbout: ['World GDP Rankings', 'Macroeconomics', 'India GDP', 'Personal Finance India'],
  };

  // Dataset schema: tells Google Dataset Search and AI crawlers this page is backed by a real,
  // sourced, structured time series, not just prose. A genuine GEO signal Worldometer-style pages
  // often carry implicitly but rarely mark up explicitly.
  const datasetSchema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${data.name} GDP Time Series, ${data.history[0]?.year}-${data.projections[data.projections.length - 1]?.year ?? latest.year}`,
    description: `Nominal GDP, real GDP growth rate, and GDP per capita for ${data.name}, ${data.history[0]?.year} to ${latest.year}, with IMF projections through ${data.projections[data.projections.length - 1]?.year ?? latest.year}.`,
    url: `https://fermor.in/gdp/${data.slug}`,
    keywords: [`${data.name} GDP`, `${data.name} economy`, 'nominal GDP', 'GDP growth rate', 'GDP per capita'],
    license: 'https://www.imf.org/external/terms.htm',
    creator: { '@type': 'Organization', name: 'International Monetary Fund', url: 'https://www.imf.org' },
    distribution: { '@type': 'DataDownload', encodingFormat: 'text/html', contentUrl: `https://fermor.in/gdp/${data.slug}` },
    temporalCoverage: `${data.history[0]?.year}/${data.projections[data.projections.length - 1]?.year ?? latest.year}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />

      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3, flexWrap: 'wrap' }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>World GDP Ranking</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>{data.name} GDP</li>
            </ol>
          </nav>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 44, lineHeight: 1 }}>{data.flagEmoji}</span>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6, flexShrink: 0 }}>Rank #{data.rank2026}</span>
            <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.4vw, 36px)', fontWeight: 700, color: C.dark, lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
              {data.name} GDP ({latest.year})
            </h1>
          </div>
          <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated <time dateTime={data.dateModified} style={{ fontWeight: 700, color: C.ink }}>{new Date(data.dateModified).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time> · Source: IMF World Economic Outlook, April 2026</p>
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div className="gdp-country-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 20 }}>
              <p className="article-lead" itemProp="description" style={{ fontSize: 16, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                Nominal Gross Domestic Product (GDP) of {data.name} is {formatGDP(latest.gdp)} as of {latest.year}, according to the International Monetary Fund (IMF).
                {latest.growth !== null && ` The GDP growth rate in ${latest.year} is ${latest.growth}%.`}
                {latest.perCapita !== null && ` GDP per capita is $${Math.round(latest.perCapita).toLocaleString('en-US')}.`}
              </p>
            </div>
            {/* Charts sit immediately after the lead block, not after five paragraphs of prose, so
                the page reads as data-first in the same above-the-fold pattern Worldometer uses
                (headline stats, then a chart already partly visible) rather than a text-first page. */}
            <h2 style={hStyle}>{data.name} GDP Trend</h2>
            <p style={pStyle}>
              Nominal GDP of {data.name} has grown from {formatGDP(data.history[0]?.gdp ?? 0)} in {data.history[0]?.year} to {formatGDP(latest.gdp)} in {latest.year}.
            </p>
            <GDPLineChart rows={data.history} countryName={data.name} />

            <h2 style={hStyle}>{data.name} GDP Growth Rate (%)</h2>
            <p style={pStyle}>
              This chart shows the year-over-year real GDP growth rate of {data.name}. Hover any bar to see the exact value for that year.
            </p>
            {avgGrowth !== null && bestYear && worstYear && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 20 }}>
                {[
                  { label: 'Average Growth', value: `${avgGrowth.toFixed(2)}%` },
                  { label: 'Best Year', value: `${bestYear.year} (+${bestYear.growth}%)` },
                  { label: 'Worst Year', value: `${worstYear.year} (${worstYear.growth}%)` },
                  { label: 'Years of Contraction', value: `${contractionCount} of ${growthRows.length}` },
                ].map(s => (
                  <div key={s.label} style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', background: '#fff' }}>
                    <div style={{ fontSize: 11, color: C.ink3, fontFamily: INTER, marginBottom: 3 }}>{s.label}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: C.dg, fontFamily: POPPINS }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}
            <GDPGrowthBarChart rows={data.history} countryName={data.name} />

            {latest.perCapita !== null && yoyChange !== null && prevYear?.perCapita && (
              <p style={pStyle}>
                GDP per capita in {data.name} rose from ${Math.round(prevYear.perCapita).toLocaleString('en-US')} in {prevYear.year} to ${Math.round(latest.perCapita).toLocaleString('en-US')} in {latest.year}, {yoyChange >= 0 ? 'an increase' : 'a decrease'} of {Math.abs(yoyChange).toFixed(1)}%.
              </p>
            )}
            <p style={pStyle}>
              &quot;{data.name} GDP&quot;, &quot;{data.name} gross domestic product&quot;, and &quot;{data.name} economy size&quot; all refer to the same nominal GDP figure.
            </p>
            {data.iso3 === 'IND' ? (
              // India's own page: the lakh-crore-formatted INR line already IS the local-currency
              // conversion here, so showing LocalCurrencyConversionLine too would just duplicate
              // it in a different (less India-appropriate) number format.
              <INRConversionLine countryName={data.name} gdpUsdBillions={latest.gdp} year={latest.year} pStyle={pStyle} />
            ) : (
              <LocalCurrencyConversionLine iso3={data.iso3} countryName={data.name} gdpUsdBillions={latest.gdp} year={latest.year} pStyle={pStyle} />
            )}

            <h2 style={hStyle}>Gross Domestic Product (GDP) of {data.name}</h2>
            <p style={pStyle}>
              The table below shows nominal and PPP GDP, growth rate, and GDP per capita for {data.name} for every year IMF has published data, from {data.history[0]?.year} to {latest.year}. Click any column header to sort, or search by year.
            </p>
            <CountryGDPTableClient nominal={data.history} ppp={data.pppHistory} countryName={data.name} hasPPP={data.pppHistory.length > 0} />

            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{pickCalc(data.rank2026, 0, latest.growth, data.calcOverride?.[0]).label}</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{pickCalc(data.rank2026, 0, latest.growth, data.calcOverride?.[0]).desc}</p>
              </div>
              <Link className="fx-btn" href={pickCalc(data.rank2026, 0, latest.growth, data.calcOverride?.[0]).href} target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            {data.projections.length > 0 && (
              <>
                <h2 style={hStyle}>{data.name} GDP Projections (IMF)</h2>
                <p style={pStyle}>
                  IMF projects nominal GDP for {data.name} through {data.projections[data.projections.length - 1].year}, based on current growth and inflation assumptions.
                </p>
                <CountryGDPTableClient nominal={data.projections} ppp={data.pppProjections} countryName={data.name} hasPPP={data.pppProjections.length > 0} />
              </>
            )}

            {data.neighbors.length > 0 && (
              <>
                <h2 style={hStyle}>Compare {data.name} to Nearby-Ranked Economies</h2>
                <p style={pStyle}>
                  {data.name} ranks #{data.rank2026} in the world by nominal GDP. See how it compares to the economies ranked just above and below it.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
                  {data.neighbors.map(n => (
                    <Link key={n.slug} href={`/gdp/${n.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', background: '#fff' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3 }}>#{n.rank}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{n.name} GDP</span>
                    </Link>
                  ))}
                </div>
              </>
            )}

            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 8, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{pickCalc(data.rank2026, 1, latest.growth, data.calcOverride?.[1]).label}</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{pickCalc(data.rank2026, 1, latest.growth, data.calcOverride?.[1]).desc}</p>
              </div>
              <Link className="fx-btn" href={pickCalc(data.rank2026, 1, latest.growth, data.calcOverride?.[1]).href} target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none', lineHeight: 1.4 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
              <p style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: '0 0 10px' }}>
                <strong>Sources:</strong> IMF, World Economic Outlook (April 2026).
              </p>
              <p style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                <strong>See also:</strong>{' '}
                <Link href="/gdp" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>GDP by Country (all countries)</Link>
                {' · '}
                <Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>Full World GDP Ranking Analysis</Link>
                {' · '}
                <Link href="/blogs/world-gdp-ranking-2026#what-is-gdp" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>What is GDP?</Link>
              </p>
            </div>

            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 20 }}>
              <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
                <strong style={{ color: C.ink2 }}>Disclaimer:</strong> GDP figures are IMF World Economic Outlook (April 2026) estimates and projections, subject to revision in future WEO releases. This page is for informational purposes only and is not investment or economic advice.
              </p>
            </div>
          </article>

          <aside
            className="gdp-country-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Quick Facts</span>
              </div>
              {[
                { label: `${latest.year} GDP`, value: formatGDP(latest.gdp) },
                { label: 'World Rank', value: `#${data.rank2026}` },
                { label: 'Region', value: data.region },
                { label: 'Growth Rate', value: latest.growth !== null ? `${latest.growth}%` : 'N/A' },
                { label: 'GDP per Capita', value: latest.perCapita !== null ? `$${Math.round(latest.perCapita).toLocaleString('en-US')}` : 'N/A' },
              ].map((f, i, arr) => (
                <div key={f.label} style={{ padding: '11px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12.5, color: C.ink2 }}>{f.label}</span>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: C.dg, fontFamily: POPPINS, flexShrink: 0 }}>{f.value}</span>
                </div>
              ))}
            </div>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, flexShrink: 0 }}>
              <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
              </div>
              {[
                { label: 'SIP Calculator', desc: 'Project long-term investment growth', href: '/calculators/sip-calculator' },
                { label: 'Income Tax Calculator', desc: 'Compare old and new regime for FY 2025-26', href: '/calculators/income-tax-calculator' },
              ].map((tool, i, arr) => (
                <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
                    <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Link>
              ))}
            </div>
            <div style={{ padding: '16px 0 8px', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/gdp" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                GDP by Country
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
              <Link href="/blogs/world-gdp-ranking-2026" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                Full GDP Ranking Analysis
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .gdp-country-sidebar::-webkit-scrollbar { width: 5px; }
        .gdp-country-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gdp-country-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gdp-country-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) { .gdp-country-grid { grid-template-columns: 1fr !important; } }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}

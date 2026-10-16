import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

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

const INCOME_TAX_DEPT = 'https://www.incometax.gov.in';

export const metadata: Metadata = {
  title: 'Cost Inflation Index FY 2026-27: CII Table & Meaning',
  description: 'Cost Inflation Index FY 2026-27 is 384 (CBDT Notification 85/2026). Full CII table from 2001-02, indexation rules post-2024, and verified worked examples.',
  alternates: { canonical: 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27' },
  openGraph: {
    title: 'Cost Inflation Index FY 2026-27: CII Table & Meaning - Fermor',
    description: 'CII for FY 2026-27 is 384. Full historical table, what indexation still applies to after the July 2024 changes, and verified worked examples.',
    type: 'article',
    url: 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cost Inflation Index FY 2026-27: CII Table & Meaning - Fermor',
    description: 'CII for FY 2026-27 is 384, notified by CBDT. Full table since 2001-02 and what still qualifies for indexation.',
  },
};

const faqItems = [
  { q: 'What is the Cost Inflation Index for FY 2026-27?', a: 'The Cost Inflation Index (CII) for FY 2026-27 is 384, notified by the CBDT via Notification No. 85/2026-Income Tax dated July 15, 2026, applicable to the tax year 2026-27 from April 1, 2026 onward.' },
  { q: 'What is the Cost Inflation Index for FY 2025-26?', a: 'The CII for FY 2025-26 is 376, up from 363 in FY 2024-25.' },
  { q: 'What is Cost Inflation Index?', a: 'Cost Inflation Index is a government-notified figure used to adjust the purchase price of a long-term capital asset for inflation before calculating capital gains, so tax is levied only on real profit rather than the portion of the gain caused purely by rising prices.' },
  { q: 'What is the formula for Cost Inflation Index?', a: 'CII is defined as 75% of the average rise in the Consumer Price Index (urban) for the immediately preceding financial year. In practice, the exact figure is fixed and notified each year by the Central Board of Direct Taxes rather than computed independently by taxpayers.' },
  { q: 'What is the formula to calculate indexed cost of acquisition?', a: 'Indexed cost of acquisition equals the original cost multiplied by the CII of the year of sale, divided by the CII of the year of purchase.' },
  { q: 'What is the base year for Cost Inflation Index, and why does it matter?', a: 'The base year is 2001-02, with a CII value of 100. For any asset purchased before April 1, 2001, a taxpayer can use the higher of the actual cost or the Fair Market Value as on April 1, 2001, as the cost of acquisition before applying indexation.' },
  { q: 'Why was the Cost Inflation Index base year changed from 1981 to 2001?', a: 'The original base year was 1981-82, but taxpayers and tax authorities both struggled to reliably value properties acquired before April 1981, since supporting records and comparable valuations from that era were hard to obtain. The government shifted the base year to 2001 to make Fair Market Value determination faster and more reliable.' },
  { q: 'Does indexation still apply to capital gains in 2026?', a: 'Only in a narrow set of cases. For land or building acquired before July 23, 2024, a resident individual or HUF can still choose between 20% tax with indexation or 12.5% without it, whichever is lower. Property acquired on or after July 23, 2024, along with gold, unlisted shares, and other assets, is taxed at a flat 12.5% with no indexation option at all.' },
  { q: 'Is indexation available on debt mutual funds?', a: 'No. Debt mutual fund units purchased on or after April 1, 2023 are treated as short-term capital gains regardless of holding period, taxed at the investor\'s income tax slab rate, with no indexation benefit and no long-term category available.' },
  { q: 'Is indexation available on listed equity shares?', a: 'No. Long-term capital gains on listed equity shares and equity-oriented mutual fund units are computed under Section 112A without any indexation benefit, taxed at a flat rate above the exemption threshold. Indexation under the Cost Inflation Index applies to Section 112 assets such as unlisted shares, not to listed equity covered by Section 112A.' },
  { q: 'Are Sovereign Gold Bonds exempt from capital gains tax on redemption?', a: 'Only under specific conditions since Budget 2026. Effective April 1, 2026, the capital gains exemption on SGB redemption by the RBI applies only if the investor subscribed at the original issue and holds the bond continuously until maturity. An investor who bought the bond on the secondary market, or who redeems it prematurely rather than holding to maturity, no longer qualifies for the exemption and must pay capital gains tax on the redemption gain.' },
  { q: 'How do I calculate the indexed cost of acquisition for an inherited property?', a: 'For property received through a will or inheritance, use the Cost Inflation Index for the year the previous owner originally purchased the property, not the year you inherited it. The cost of acquisition also carries over from the previous owner\'s original purchase price, or the Fair Market Value as on April 1, 2001 if purchased before that date.' },
  { q: 'Who notifies the Cost Inflation Index every year?', a: 'The Central Board of Direct Taxes (CBDT) notifies the Cost Inflation Index for each financial year through an official notification published in the Gazette of India, typically issued a few months into the financial year it applies to.' },
  { q: 'Can I ignore improvement costs incurred before April 1, 2001?', a: 'Yes. Any cost of improvement incurred before April 1, 2001 is ignored entirely when computing capital gains; only improvement costs incurred on or after that date are eligible for indexation.' },
  { q: 'Is indexation available on bonds and debentures?', a: 'Generally no, with two exceptions: capital indexation bonds and Sovereign Gold Bonds issued by the RBI. Ordinary corporate bonds and debentures do not get indexation benefit on capital gains.' },
  { q: 'What is the difference between CII and CPI?', a: 'The Consumer Price Index (CPI) measures the change in prices of a basket of goods and services over time and is published monthly by the National Statistical Office. The Cost Inflation Index is a separate, once-a-year figure the CBDT derives with reference to CPI movement specifically for capital gains indexation; the two numbers are related in concept but serve entirely different purposes and are not interchangeable.' },
  { q: 'How much tax do I save by using indexation compared to the flat rate?', a: 'It depends entirely on how much your asset\'s CII-adjusted cost has risen relative to its sale price. On assets where the price has risen only modestly above inflation, the 20%-with-indexation option usually produces less tax than the 12.5%-flat option; on assets that have appreciated sharply well beyond inflation, the flat 12.5% rate without indexation often works out cheaper despite the higher nominal rate.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, investments, and capital gains. It combines free calculators with guides on tax provisions that affect real estate, mutual fund, and asset sale decisions.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Cost Inflation Index for FY 2026-27: Full Table, Meaning, and Calculation',
  url: 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27',
  datePublished: '2026-07-29T23:33:21+05:30',
  dateModified: '2026-07-29T23:33:21+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete Cost Inflation Index guide: CII for FY 2026-27 is 384 per CBDT Notification No. 85/2026, up from 376 in FY 2025-26. Covers the full historical CII table from FY 2001-02, the base year change from 1981 to 2001, the narrow set of assets that still qualify for indexation after the July 2024 capital gains overhaul (only land/building acquired before July 23, 2024), why listed equity and debt funds never get indexation, the Budget 2026 tightening of the Sovereign Gold Bond redemption exemption, and independently verified worked examples of indexed cost of acquisition.',
  articleSection: 'Income Tax',
  keywords: 'cost inflation index, cii index, cii index table, cii index chart, capital gain index, capital gain indexation chart, capital gain indexation table, index cost of acquisition, calculate cost inflation index, cost inflation index chart, capital gains tax indexation, cii for capital gain',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Cost Inflation Index', item: 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Indexed Cost of Acquisition Using the Cost Inflation Index',
  description: 'Step-by-step process to compute the indexed cost of acquisition for a long-term capital asset.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm the asset is indexation-eligible', text: 'Only land or building acquired before July 23, 2024 still qualifies for indexation as an option; most other assets no longer do.' },
    { '@type': 'HowToStep', position: 2, name: 'Find the CII for the year of purchase', text: 'Look up the Cost Inflation Index for the financial year you originally acquired the asset.' },
    { '@type': 'HowToStep', position: 3, name: 'Find the CII for the year of sale', text: 'Look up the Cost Inflation Index for the financial year you are selling or transferring the asset.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply the formula', text: 'Multiply the original cost by the sale-year CII, then divide by the purchase-year CII, to get the indexed cost of acquisition.' },
    { '@type': 'HowToStep', position: 5, name: 'Compare with the non-indexed option', text: 'Compute tax at 20% on the indexed gain and at 12.5% on the non-indexed gain, then choose whichever is lower, where the choice is available.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27',
  name: 'Cost Inflation Index for FY 2026-27: Full Table, Meaning, and Calculation - Fermor',
  url: 'https://fermor.in/blogs/cost-inflation-index-fy-2026-27',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T23:33:21+05:30',
  dateModified: '2026-07-29T23:33:21+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Cost Inflation Index',
      alternateName: 'CII',
      description: 'A figure notified annually by the CBDT that adjusts the purchase price of a long-term capital asset for inflation, used to compute indexed cost of acquisition for capital gains tax.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Property sellers, investors, and taxpayers computing long-term capital gains in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#cii-fy2026-27', name: 'CII for FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-cii', name: 'What Is Cost Inflation Index' },
    { '@type': 'WebPageElement', cssSelector: '#cii-table', name: 'CII Table' },
    { '@type': 'WebPageElement', cssSelector: '#base-year', name: 'The Base Year' },
    { '@type': 'WebPageElement', cssSelector: '#cii-formula', name: 'CII Formula' },
    { '@type': 'WebPageElement', cssSelector: '#what-qualifies', name: 'What Still Qualifies for Indexation' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#points-to-note', name: 'Points to Note' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: ['Cost Inflation Index', 'Capital Gains Tax', 'Indexation', 'Sovereign Gold Bonds', 'Section 112A', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function InfoTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalcCTA({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <div style={{ background: C.paleDg, border: `1px solid #c9ced2`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{label}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{note}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
    </div>
  );
}

function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} open={i === 0} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.6, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains the Cost Inflation Index and its use in capital gains tax for general informational purposes and is not tax advice. Indexation eligibility and the choice between tax regimes depend on your specific asset type and acquisition date; verify your exact liability using the calculator linked on this page or consult a chartered accountant before filing. Figures reflect CBDT notifications as of the date above and may change with future notifications.
      </p>
    </div>
  );
}

const CII_TABLE: [string, number][] = [
  ['2001-02 (Base year)', 100], ['2002-03', 105], ['2003-04', 109], ['2004-05', 113],
  ['2005-06', 117], ['2006-07', 122], ['2007-08', 129], ['2008-09', 137],
  ['2009-10', 148], ['2010-11', 167], ['2011-12', 184], ['2012-13', 200],
  ['2013-14', 220], ['2014-15', 240], ['2015-16', 254], ['2016-17', 264],
  ['2017-18', 272], ['2018-19', 280], ['2019-20', 289], ['2020-21', 301],
  ['2021-22', 317], ['2022-23', 331], ['2023-24', 348], ['2024-25', 363],
  ['2025-26', 376], ['2026-27', 384],
];

export default function CostInflationIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* Nav */}
      <PageNav />

      {/* Breadcrumb */}
      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Cost Inflation Index</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-07-29T23:33:21+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 29, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Cost Inflation Index for FY 2026-27: Full Table, Meaning, and Calculation
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              The Cost Inflation Index for FY 2026-27 is 384, notified by the CBDT and applicable from April 1, 2026, up from 376 in FY 2025-26.
            </p>
            <p style={pStyle}>
              CII adjusts a long-term asset's purchase price for inflation before calculating capital gains, so tax falls only on real profit rather than the part of the gain that's simply inflation.
            </p>
            <p style={pStyle}>
              Since the July 2024 capital gains overhaul, indexation is available only in a narrow set of cases, covered in detail below alongside verified worked examples.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for capital gains and indexation"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Calculate capital gains tax with or without indexation', <Link key="l2" href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Capital Gains Calculator</Link>],
                ]}
              />
            </div>

            {/* SECTION: CII FY2026-27 */}
            <h2 id="cii-fy2026-27" style={hStyle}>Cost Inflation Index for FY 2026-27</h2>
            <p style={pStyle}>
              The CBDT notified the Cost Inflation Index for FY 2026-27 as 384, via Notification No. 85/2026-Income Tax dated July 15, 2026, applicable to the tax year 2026-27 from April 1, 2026 onward.
            </p>
            <InfoTable
              caption="Cost Inflation Index: FY 2024-25 through FY 2026-27"
              headers={['Financial Year', 'CII']}
              rows={[
                ['2024-25', '363'],
                ['2025-26', '376'],
                ['2026-27', '384'],
              ]}
            />

            {/* SECTION: What is CII */}
            <h2 id="what-is-cii" style={hStyle}>What Is Cost Inflation Index?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Cost Inflation Index is a figure the CBDT notifies every year to adjust a long-term capital asset's purchase price for inflation, so that capital gains tax is calculated on real profit rather than on gains caused purely by rising prices.
              </p>
            </div>
            <p style={pStyle}>
              Assets are recorded in books at their original cost and are never revalued upward for inflation on their own. Without an adjustment, a property or asset held for decades would show an inflated paper profit at sale, and the tax bill would include a share of gain that reflects nothing more than the rupee losing purchasing power over time.
            </p>
            <p style={pStyle}>
              Applying CII to the purchase price raises the recorded cost of acquisition, which lowers the taxable gain and, in turn, the tax owed, wherever indexation is still available.
            </p>

            {/* SECTION: CII Table */}
            <h2 id="cii-table" style={hStyle}>Cost Inflation Index Table: FY 2001-02 to FY 2026-27</h2>
            <InfoTable
              caption="Full Cost Inflation Index table, base year 2001-02 to FY 2026-27"
              headers={['Financial Year', 'Cost Inflation Index (CII)']}
              rows={CII_TABLE.map(([fy, cii]) => [fy, String(cii)])}
            />

            {/* SECTION: Base year */}
            <h2 id="base-year" style={hStyle}>The Base Year: Why It's 2001, Not 1981</h2>
            <p style={pStyle}>
              The base year is the first year of the index, fixed at a CII value of 100; every other year's index is measured relative to it. The Cost Inflation Index originally used 1981-82 as the base year.
            </p>
            <p style={pStyle}>
              The government shifted the base year to 2001-02 because taxpayers and tax authorities both struggled to reliably value assets acquired before April 1981; supporting valuation records from that era were often unavailable or unreliable.
            </p>
            <p style={pStyle}>
              For any asset acquired before April 1, 2001, a taxpayer can use the higher of the actual cost or the Fair Market Value as on April 1, 2001, as the starting cost of acquisition, based on a registered valuer's report, before applying indexation from the base year onward.
            </p>

            {/* SECTION: Formula */}
            <h2 id="cii-formula" style={hStyle}>How the Cost Inflation Index Is Calculated</h2>
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
              <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                CII = 75% of the average rise in the Consumer Price Index (urban) for the immediately preceding financial year
              </code>
            </div>
            <p style={pStyle}>
              In practice, taxpayers don't compute this formula themselves; the CBDT applies it internally and notifies the final figure in the Gazette of India each year, which is the number used for all indexation calculations.
            </p>
            <p style={pStyle}>
              Once CII is applied to the cost of acquisition, the resulting figure is called the indexed cost of acquisition, calculated as the original cost multiplied by the sale-year CII, divided by the purchase-year CII.
            </p>

            <CalcCTA
              href="/calculators/capital-gains-calculator"
              label="Capital Gains Calculator"
              note="Compute your exact long-term capital gains tax, with or without indexation, for property, gold, and other assets."
            />

            {/* SECTION: What still qualifies */}
            <h2 id="what-qualifies" style={hStyle}>What Still Qualifies for Indexation After the July 2024 Changes</h2>
            <p style={pStyle}>
              Budget 2024 narrowed indexation sharply, effective July 23, 2024. Only one category of asset retains a genuine choice today.
            </p>
            <InfoTable
              caption="Indexation eligibility by asset type, current rules"
              headers={['Asset', 'Indexation Available?', 'Tax Treatment']}
              rows={[
                ['Land or building acquired before July 23, 2024', 'Yes, as an option', 'Choice of 20% with indexation or 12.5% without, whichever is lower'],
                ['Land or building acquired on or after July 23, 2024', 'No', 'Flat 12.5%, no indexation'],
                ['Gold, unlisted shares, other assets', 'No', 'Flat 12.5%, no indexation'],
                ['Debt mutual funds purchased on or after April 1, 2023', 'No', 'Taxed at slab rate, no long-term category at all'],
                ['Listed equity shares and equity mutual fund units', 'No', 'Section 112A flat rate above the exemption threshold, indexation never applied here'],
                ['Sovereign Gold Bonds and capital indexation bonds issued by RBI', 'Conditional', 'See the SGB rules below'],
              ]}
            />
            <p style={pStyle}>
              Listed equity is a common point of confusion: gains on listed shares and equity fund units have always been computed under Section 112A, a separate regime from ordinary long-term capital assets that never included indexation, even before the 2024 changes. Indexation under the Cost Inflation Index applies to Section 112 assets, such as unlisted shares, property, and gold, not to listed equity.
            </p>
            <p style={pStyle}>
              Sovereign Gold Bonds carry their own rule, updated again by Budget 2026: the capital gains exemption on RBI redemption now applies only if the investor subscribed at the original issue and holds the bond until maturity. An investor who bought on the secondary market, or who redeems prematurely rather than holding to maturity, no longer qualifies for the exemption from April 1, 2026 onward and must pay capital gains tax on the redemption gain.
            </p>

            {/* SECTION: Worked examples */}
            <h2 id="worked-examples" style={hStyle}>Worked Examples: Indexed Cost of Acquisition</h2>
            <p style={pStyle}>
              Each example below has been independently recomputed to confirm the arithmetic before publishing.
            </p>
            <InfoTable
              caption="Example 1: property purchased in the base year, sold in FY 2017-18"
              headers={['Particulars', 'Value']}
              rows={[
                ['Purchase price, FY 2001-02', 'Rs 10,00,000'],
                ['CII for FY 2001-02 (base year)', '100'],
                ['CII for FY 2017-18 (year of sale)', '272'],
                ['Indexed cost of acquisition (10,00,000 x 272/100)', 'Rs 27,20,000'],
              ]}
            />
            <InfoTable
              caption="Example 2: asset purchased before the base year, using Fair Market Value"
              headers={['Particulars', 'Value']}
              rows={[
                ['Actual purchase cost, FY 1995-96', 'Rs 2,00,000'],
                ['Fair Market Value as on April 1, 2001', 'Rs 3,20,000'],
                ['Cost of acquisition used (higher of the two)', 'Rs 3,20,000'],
                ['CII for FY 2001-02', '100'],
                ['CII for FY 2016-17 (year of sale)', '264'],
                ['Indexed cost of acquisition (3,20,000 x 264/100)', 'Rs 8,44,800'],
              ]}
            />
            <InfoTable
              caption="Example 3: unlisted equity shares purchased in FY 2014-15, sold in FY 2020-21"
              headers={['Particulars', 'Value']}
              rows={[
                ['Purchase cost, March 2015 (FY 2014-15)', 'Rs 1,00,000'],
                ['CII for FY 2014-15', '240'],
                ['CII for FY 2020-21 (year of sale)', '301'],
                ['Indexed cost of acquisition (1,00,000 x 301/240)', 'Rs 1,25,417'],
              ]}
            />
            <p style={pStyle}>
              This example only applies to unlisted equity shares. Listed equity shares and equity mutual fund units never receive indexation, since they fall under Section 112A's separate flat-rate regime regardless of holding period.
            </p>
            <InfoTable
              caption="Example 4: house purchased in FY 2012-13, sold in FY 2023-24"
              headers={['Particulars', 'Value']}
              rows={[
                ['Purchase cost, December 2012 (FY 2012-13)', 'Rs 20,00,000'],
                ['CII for FY 2012-13', '200'],
                ['CII for FY 2023-24 (year of sale)', '348'],
                ['Indexed cost of acquisition (20,00,000 x 348/200)', 'Rs 34,80,000'],
              ]}
            />
            <InfoTable
              caption="Example 5: land/building sold in FY 2024-25, purchased in FY 2001-02, tax computed both ways"
              headers={['Particulars', 'With Indexation (20%)', 'Without Indexation (12.5%)']}
              rows={[
                ['Sale consideration', 'Rs 10,00,000', 'Rs 10,00,000'],
                ['Cost of acquisition used', 'Rs 7,26,000 (2,00,000 x 363/100)', 'Rs 2,00,000'],
                ['Long-term capital gain', 'Rs 2,74,000', 'Rs 8,00,000'],
                ['Tax payable', 'Rs 54,800 (20% of 2,74,000)', 'Rs 1,00,000 (12.5% of 8,00,000)'],
              ]}
            />
            <p style={pStyle}>
              In this example, the indexed option results in lower tax, since the property's price rise between 2001-02 and 2024-25 stayed close to what the CII itself captured as inflation over that period. Where an asset appreciates well beyond inflation, the flat 12.5% option can work out cheaper despite the higher nominal rate on the smaller, non-indexed gain base.
            </p>

            {/* SECTION: Points to note */}
            <h2 id="points-to-note" style={hStyle}>Points to Note on Indexation</h2>
            <BulletList items={[
              'For property received through inheritance or a will, use the CII of the year the previous owner originally purchased it, not the year you inherited it.',
              'Any improvement cost incurred before April 1, 2001 is ignored entirely; only improvement costs from that date onward are eligible for indexation.',
              'Indexation is not available on ordinary bonds or debentures, with the exception of capital indexation bonds and Sovereign Gold Bonds issued by the RBI, and even the SGB exemption is now conditional since Budget 2026.',
              'Debt mutual fund units purchased on or after April 1, 2023 never get indexation and are always taxed at slab rate as short-term gains, regardless of holding period.',
              'Land or building acquired on or after July 23, 2024 has no indexation choice at all; it is always taxed at a flat 12.5%.',
            ]} />

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Cost Inflation Index</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="cii-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            {/* Ad banner */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, marginBottom: 20 }}>
            </div>

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>CII Quick Reference</div>
              {([
                ['CII FY 2026-27', '384'],
                ['CII FY 2025-26', '376'],
                ['CII FY 2024-25', '363'],
                ['Base year', '2001-02 (CII 100)'],
                ['Indexation now applies to', 'Land/building bought before Jul 23, 2024'],
                ['Notifying authority', 'CBDT'],
                ['With indexation rate', '20%'],
                ['Without indexation rate', '12.5%'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTAs */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Tax Calculators</div>
                <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Capital Gains Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/inflation-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Inflation Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/section-194i-tds-on-rent', 'Section 194I TDS on Rent'],
                ['/blogs/section-115bac-new-tax-regime', 'Section 115BAC New Tax Regime'],
              ] as [string, string][]).map(([href, title], i) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i === 0 ? `1px solid ${C.border}` : 'none' }}>
                  <Link href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 13, fontWeight: 500, color: C.dark, textDecoration: 'none', lineHeight: 1.5 }}>
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .cii-sidebar::-webkit-scrollbar { width: 5px; }
        .cii-sidebar::-webkit-scrollbar-track { background: transparent; }
        .cii-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .cii-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        @media (max-width: 900px) {
          article { grid-column: 1 / -1; }
          aside { display: none; }
        }
      `}</style>
    </>
  );
}

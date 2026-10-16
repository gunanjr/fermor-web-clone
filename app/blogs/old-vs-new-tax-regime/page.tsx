import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { InlineRegimeCalculator } from './InlineRegimeCalculator';

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

export const metadata: Metadata = {
  title: 'Old vs New Tax Regime FY 2025-26: Which Is Better for You',
  description: 'Old vs new tax regime for FY 2025-26 (AY 2026-27), with an instant calculator: slabs, Rs 60,000 vs Rs 12,500 rebate, deduction-by-deduction comparison, two worked examples verified line by line, and the exact breakeven deduction level at every income from Rs 12 lakh to Rs 25 lakh.',
  alternates: { canonical: 'https://fermor.in/blogs/old-vs-new-tax-regime' },
  openGraph: {
    title: 'Old vs New Tax Regime FY 2025-26: Which Is Better for You - Fermor',
    description: 'Instant calculator, full deduction comparison, two verified worked examples, and the exact breakeven deduction level by income.',
    type: 'article',
    publishedTime: '2026-07-29T17:34:58+05:30',
    modifiedTime: '2026-07-29T17:34:58+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Income Tax', 'New Tax Regime', 'Old Tax Regime'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Old vs New Tax Regime - Fermor',
    description: 'Instant calculator and the exact breakeven deduction level at every income from Rs 12 lakh to Rs 25 lakh.',
  },
  keywords: [
    'old vs new tax regime', 'new tax regime', 'old tax regime', 'new tax regime calculator',
    'old tax regime vs new tax regime', 'income tax slab', 'tax slab', 'new tax slab', 'new income tax slab',
    'income tax slab rates', 'taxable income slab', '87a rebate', 'rebate us 87a', 'income tax calculator',
    'taxable income calculator', 'new tax regime slabs', 'which tax regime is better',
  ],
};

const faqItems = [
  { q: 'What is the old tax regime?', a: 'The old tax regime is the original income tax structure, with higher slab rates but full access to deductions and exemptions such as 80C, 80D, HRA, and home loan interest. It became optional, not default, from FY 2023-24.' },
  { q: 'What is the new tax regime?', a: 'The new tax regime has lower slab rates than the old regime but removes most deductions, leaving mainly the standard deduction and employer NPS contributions. It has been the default regime since FY 2023-24, so you must actively opt for the old regime if you want it.' },
  { q: 'Which tax regime is better for a salary of Rs 10 lakh?', a: 'The new regime, for almost everyone. At Rs 10 lakh salary, taxable income after the Rs 75,000 standard deduction is Rs 9.25 lakh, under the Rs 12 lakh Section 87A threshold, so tax is nil under the new regime. The old regime would need over Rs 4.5 lakh in deductions just to reach zero, which is unrealistic for most salaried employees.' },
  { q: 'Which tax regime is better for a salary of Rs 12.5 lakh?', a: 'The new regime. After the Rs 75,000 standard deduction, taxable income is Rs 11.75 lakh, still under the Rs 12 lakh threshold for the full Section 87A rebate, so tax is nil.' },
  { q: 'Which tax regime is better for a salary of Rs 15 lakh?', a: 'It depends on your deductions. If your total deductions (80C, 80D, HRA, home loan interest, and others) exceed roughly Rs 5.44 lakh, the old regime saves more. Below that level, the new regime wins.' },
  { q: 'Which tax regime is better for a salary of Rs 20 lakh?', a: 'The old regime only wins if your total deductions exceed roughly Rs 7.08 lakh. Most salaried employees, even with an active 80C investment and health insurance, fall well short of that, making the new regime the better default at this income.' },
  { q: 'Which tax regime is better for a salary of Rs 25 lakh?', a: 'The old regime becomes competitive only once deductions exceed roughly Rs 8 lakh. Below that, the new regime\'s lower slab rates outweigh the deductions you would give up.' },
  { q: 'What is the Section 87A rebate under each regime?', a: 'Under the new regime, the rebate is up to Rs 60,000, making taxable income up to Rs 12 lakh fully tax-free. Under the old regime, the rebate is up to Rs 12,500, covering taxable income up to Rs 5 lakh.' },
  { q: 'Can I switch between the old and new tax regime every year?', a: 'Salaried individuals without business income can switch every year simply by choosing at the time of filing. Taxpayers with business income can switch from new to old only once in their lifetime, and once they move back to the old regime, they cannot return to the new regime again unless the business income stops.' },
  { q: 'What deductions are completely lost under the new tax regime?', a: 'Section 80C (up to Rs 1.5 lakh), HRA exemption, self-occupied home loan interest under Section 24(b), Section 80D health insurance premiums, and Section 80CCD(1) employee NPS contributions are all unavailable under the new regime. The standard deduction and employer NPS contribution under Section 80CCD(2) remain available.' },
  { q: 'What is the standard deduction under each regime?', a: 'The new regime allows a Rs 75,000 standard deduction against salary income. The old regime allows Rs 50,000. Both apply automatically to salaried employees and pensioners, with no conditions or proof required.' },
  { q: 'Is HRA available under the new tax regime?', a: 'No. House Rent Allowance exemption, along with the Section 80GG rent deduction for those without HRA, is available only under the old tax regime.' },
  { q: 'Can I claim home loan interest under the new tax regime?', a: 'Only for a let-out property, where the full interest offsets rental income under either regime. For a self-occupied property, the Rs 2 lakh interest deduction under Section 24(b) is available only under the old regime.' },
  { q: 'Which regime is better for investors with capital gains?', a: 'Capital gains tax rates are largely the same under both regimes, since they depend on the asset type and holding period, not the regime chosen. The regime choice mainly affects your salary and other slab-rate income; Section 80C investment deductions, however, are available only under the old regime.' },
  { q: 'Which regime is better for NRIs?', a: 'The same slab rates and regime choice apply to NRIs and residents for Indian-sourced income like salary and capital gains. A few provisions, such as Section 80TTB, differ, but most of the regime comparison logic carries over unchanged.' },
  { q: 'What is marginal relief under the new tax regime?', a: 'Marginal relief caps your tax at the amount by which your taxable income exceeds Rs 12 lakh, whenever that is less than the tax the slabs would otherwise produce. It exists so that crossing the Rs 12 lakh rebate threshold by a small amount does not create a disproportionately large tax bill.' },
  { q: 'How much deduction do I need for the old regime to beat the new regime?', a: 'It depends on your income: roughly Rs 5.44 lakh at Rs 15 lakh income, Rs 7.08 lakh at Rs 20 lakh income, and Rs 8 lakh at Rs 25 lakh income. Below Rs 12 lakh income, the new regime wins regardless of deductions, since tax is already nil.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Old vs New Tax Regime FY 2025-26: Which Is Better for You',
  url: 'https://fermor.in/blogs/old-vs-new-tax-regime',
  datePublished: '2026-07-29T17:34:58+05:30',
  dateModified: '2026-07-29T17:34:58+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/old-vs-new-tax-regime' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Old vs New Tax Regime', description: 'The choice Indian taxpayers make each year between the old income tax structure (higher rates, full deductions) and the new regime (lower rates, minimal deductions)' },
  ],
  keywords: 'old vs new tax regime, new tax regime, old tax regime, new tax regime calculator, 87a rebate',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Old vs New Tax Regime', item: 'https://fermor.in/blogs/old-vs-new-tax-regime' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Decide Between the Old and New Tax Regime',
  description: 'Step-by-step process to compare your tax liability under both regimes and pick the cheaper one.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Total your deductions', text: 'Add up 80C, 80D, HRA exemption, home loan interest, and any other deductions you would actually claim under the old regime.' },
    { '@type': 'HowToStep', position: 2, name: 'Check the breakeven table', text: 'Find your income level and see the deduction amount at which both regimes cost the same.' },
    { '@type': 'HowToStep', position: 3, name: 'Compare to your own deductions', text: 'If your total deductions exceed the breakeven figure, the old regime saves more. If not, the new regime wins.' },
    { '@type': 'HowToStep', position: 4, name: 'Run the exact numbers', text: 'Use the calculator to confirm with your specific salary and deduction amounts before filing.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/old-vs-new-tax-regime',
  name: 'Old vs New Tax Regime FY 2025-26: Which Is Better for You - Fermor',
  url: 'https://fermor.in/blogs/old-vs-new-tax-regime',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T17:34:58+05:30',
  dateModified: '2026-07-29T17:34:58+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Old vs New Tax Regime',
    description: 'The annual choice between India\'s old income tax structure (higher rates, full deductions) and the new regime (lower rates, minimal deductions), decided by comparing total eligible deductions against the income-specific breakeven level.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried taxpayers choosing between the old and new income tax regimes',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#key-differences', name: 'Key Differences' },
    { '@type': 'WebPageElement', cssSelector: '#calculator', name: 'Instant Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#slabs', name: 'Tax Slabs Compared' },
    { '@type': 'WebPageElement', cssSelector: '#deductions', name: 'Deductions Compared' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#breakeven', name: 'Breakeven Deduction Table' },
    { '@type': 'WebPageElement', cssSelector: '#investors-nri', name: 'Investors and NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#switching', name: 'Switching Regimes' },
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
  knowsAbout: ['Income Tax India', 'New Tax Regime', 'Old Tax Regime', 'Section 87A', 'Personal Finance India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };
const linkStyle: React.CSSProperties = { color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 };

function BulletList({ items, mb = 20 }: { items: (string | React.ReactNode)[]; mb?: number }) {
  return (
    <div style={{ marginBottom: mb }}>
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

function DataTable({ caption, headers, rows, highlightLast = false }: {
  caption: string; headers: string[]; rows: (string | React.ReactNode)[][]; highlightLast?: boolean;
}) {
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
          {rows.map((row, ri) => {
            const isLast = highlightLast && ri === rows.length - 1;
            return (
              <tr key={ri} style={isLast ? { background: C.paleDg, fontWeight: 700 } : {}}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none', fontWeight: isLast ? 700 : undefined }}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '24px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

const TOC_ITEMS = [
  { id: 'key-differences', label: 'Key Differences' },
  { id: 'calculator', label: 'Instant Calculator' },
  { id: 'slabs', label: 'Tax Slabs Compared' },
  { id: 'deductions', label: 'Deductions Compared' },
  { id: 'worked-examples', label: 'Two Worked Examples' },
  { id: 'breakeven', label: 'Breakeven Deduction Table' },
  { id: 'investors-nri', label: 'Investors and NRIs' },
  { id: 'switching', label: 'Switching Regimes' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
        {TOC_ITEMS.map((item, i) => (
          <a key={item.id} href={`#${item.id}`} className="toc-link" style={{ fontSize: 13, color: C.ink2, textDecoration: 'none', padding: '6px 10px', borderRadius: 6, display: 'flex', gap: 8 }}>
            <span style={{ color: C.ink3, fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute tax advice. Income tax rules are subject to change. Verify the latest provisions on the Income Tax Department&apos;s official website (<a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>incometax.gov.in</a>) or consult a qualified chartered accountant before filing your return. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function OldVsNewTaxRegimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Old vs New Tax Regime</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-07-29T17:34:58+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 29, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Old vs New Tax Regime FY 2025-26: Which Is Better for You
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              The new tax regime wins for most salaried taxpayers below Rs 12.75 lakh gross salary, where tax works out to nil. Above that, which regime is cheaper depends entirely on your deductions: the more you claim under 80C, HRA, and home loan interest, the more likely the old regime wins.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: an instant calculator, the full slab and deduction comparison, two worked examples verified line by line, and the exact deduction level at which the old regime starts winning at every income from Rs 12 lakh to Rs 25 lakh.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="key-differences" style={hStyle}>Old vs New Tax Regime: Key Differences at a Glance</h2>
            <p style={pStyle}>
              The new regime trades away deductions for lower rates and a much higher rebate ceiling.
            </p>
            <DataTable
              caption="Old vs New Tax Regime: Key Highlights, FY 2025-26"
              headers={['Particulars', 'Old Tax Regime', 'New Tax Regime']}
              rows={[
                ['Applicability', 'Optional', 'Default'],
                ['Basic exemption limit', 'Rs 2.5 lakh', 'Rs 4 lakh'],
                ['Maximum tax rate', '30% (above Rs 10 lakh)', '30% (above Rs 24 lakh)'],
                ['Section 87A rebate', 'Rs 12,500', 'Rs 60,000'],
                ['Standard deduction', 'Rs 50,000', 'Rs 75,000'],
                ['Effectively tax-free income', 'Rs 5 lakh', 'Rs 12 lakh'],
              ]}
            />

            {/* SECTION 2: CALCULATOR */}
            <h2 id="calculator" style={hStyle}>Old vs New Regime: Instant Calculator</h2>
            <p style={pStyle}>
              Enter your annual salary to see both regimes side by side. This quick check assumes no deductions beyond the standard deduction; if you claim 80C, HRA, or home loan interest, use the full calculator below for an exact number.
            </p>
            <InlineRegimeCalculator />

            {/* SECTION 3 */}
            <h2 id="slabs" style={hStyle}>Old vs New Tax Regime: Income Tax Slabs</h2>
            <p style={pStyle}>
              The new regime spreads seven slabs across a wider income range; the old regime has just three, on a narrower one.
            </p>
            <DataTable
              caption="New Tax Regime Slabs, FY 2025-26 (AY 2026-27)"
              headers={['Income Slab', 'Tax Rate']}
              rows={[
                ['Up to Rs 4 lakh', 'Nil'],
                ['Rs 4 lakh to Rs 8 lakh', '5%'],
                ['Rs 8 lakh to Rs 12 lakh', '10%'],
                ['Rs 12 lakh to Rs 16 lakh', '15%'],
                ['Rs 16 lakh to Rs 20 lakh', '20%'],
                ['Rs 20 lakh to Rs 24 lakh', '25%'],
                ['Above Rs 24 lakh', '30%'],
              ]}
            />
            <DataTable
              caption="Old Tax Regime Slabs, FY 2025-26 (AY 2026-27)"
              headers={['Income Slab', 'Tax Rate']}
              rows={[
                ['Up to Rs 2.5 lakh', 'Nil'],
                ['Rs 2.5 lakh to Rs 5 lakh', '5%'],
                ['Rs 5 lakh to Rs 10 lakh', '20%'],
                ['Above Rs 10 lakh', '30%'],
              ]}
            />
            <p style={pStyle}>
              For the full slab breakdown including senior citizen rates, surcharge, and cess, see the <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={linkStyle}>income tax slabs guide</Link>.
            </p>

            {/* SECTION 4 */}
            <h2 id="deductions" style={hStyle}>Old vs New Tax Regime: Deductions and Exemptions Compared</h2>
            <p style={pStyle}>
              Almost every popular deduction is old-regime-only. The new regime keeps just three: standard deduction, employer NPS contribution, and let-out property home loan interest.
            </p>
            <DataTable
              caption="Deduction Availability by Regime"
              headers={['Deduction', 'Old Regime', 'New Regime']}
              rows={[
                ['Section 80C (up to Rs 1.5 lakh)', 'Allowed', 'Not allowed'],
                ['HRA exemption', 'Allowed', 'Not allowed'],
                ['Section 80D health insurance', 'Allowed', 'Not allowed'],
                ['Home loan interest, self-occupied (Sec 24b)', 'Up to Rs 2 lakh', 'Not allowed'],
                ['Home loan interest, let-out property', 'Allowed', 'Allowed'],
                ['Employee NPS contribution (80CCD(1))', 'Up to Rs 1.5 lakh', 'Not allowed'],
                ['Employer NPS contribution (80CCD(2))', 'Up to 10% of basic', 'Up to 14% of basic'],
                ['Section 80E education loan interest', 'Allowed', 'Not allowed'],
                ['Section 80G donations', 'Allowed', 'Not allowed'],
                ['Leave Travel Allowance (LTA)', 'Allowed', 'Not allowed'],
                ['Gratuity, leave encashment, VRS exemptions', 'Allowed', 'Allowed'],
              ]}
            />
            <p style={pStyle}>
              For the complete section-by-section deduction list, including the smaller allowances not shown here, see the <Link href="/blogs/section-115bac-new-tax-regime" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 115BAC guide</Link>, which covers exactly what the new regime allows and disallows.
            </p>

            {/* SECTION 5 */}
            <h2 id="worked-examples" style={hStyle}>Which Regime Is Better? Two Worked Examples</h2>
            <p style={pStyle}>
              Both examples below are recomputed independently from the slab formulas, not just copied, and match to the rupee.
            </p>
            <h3 style={h3Style}>Example 1: Rs 10 Lakh Salary, Rs 1.3 Lakh in Deductions</h3>
            <p style={pStyle}>
              Salary Rs 10 lakh, Section 80C of Rs 1 lakh, health insurance premium of Rs 30,000 (capped at Rs 25,000 under Section 80D).
            </p>
            <DataTable
              caption="Example 1: Rs 10 Lakh Salary"
              headers={['Particulars', 'New Regime', 'Old Regime']}
              rows={[
                ['Salary', 'Rs 10,00,000', 'Rs 10,00,000'],
                ['Standard deduction', 'Rs 75,000', 'Rs 50,000'],
                ['Section 80C', 'Not allowed', 'Rs 1,00,000'],
                ['Section 80D', 'Not allowed', 'Rs 25,000'],
                ['Taxable income', 'Rs 9,25,000', 'Rs 8,25,000'],
                ['Tax before cess', 'Rs 0 (rebate)', 'Rs 77,500'],
                ['Cess (4%)', 'Rs 0', 'Rs 3,100'],
                ['Total tax payable', 'Rs 0', 'Rs 80,600'],
              ]}
              highlightLast
            />
            <p style={pStyle}>
              The new regime wins here, entirely because taxable income stays under the Rs 12 lakh rebate threshold. Deductions worth Rs 1.25 lakh were not enough to change the outcome.
            </p>

            <h3 style={h3Style}>Example 2: Rs 20 Lakh Salary, Rs 5.75 Lakh in Deductions</h3>
            <p style={pStyle}>
              Salary Rs 20 lakh, Section 80C of Rs 1 lakh, health insurance of Rs 30,000, self-occupied home loan interest of Rs 2 lakh, and a political party donation of Rs 2.75 lakh.
            </p>
            <DataTable
              caption="Example 2: Rs 20 Lakh Salary"
              headers={['Particulars', 'New Regime', 'Old Regime']}
              rows={[
                ['Salary', 'Rs 20,00,000', 'Rs 20,00,000'],
                ['Standard deduction', 'Rs 75,000', 'Rs 50,000'],
                ['Home loan interest (loss)', 'Not allowed', 'Rs 2,00,000'],
                ['Section 80C', 'Not allowed', 'Rs 1,00,000'],
                ['Section 80D', 'Not allowed', 'Rs 25,000'],
                ['Political donation (80GGC)', 'Not allowed', 'Rs 2,75,000'],
                ['Taxable income', 'Rs 19,25,000', 'Rs 13,50,000'],
                ['Tax before cess', 'Rs 1,85,000', 'Rs 2,17,500'],
                ['Cess (4%)', 'Rs 7,400', 'Rs 8,700'],
                ['Total tax payable', 'Rs 1,92,400', 'Rs 2,26,200'],
              ]}
              highlightLast
            />
            <p style={pStyle}>
              The new regime still wins, by Rs 33,800, even against Rs 5.75 lakh of deductions. The lower slab rates outweigh the deductions given up at this income level; only a larger deduction claim would flip the result.
            </p>

            {/* SECTION 6 */}
            <h2 id="breakeven" style={hStyle}>Breakeven Deductions: When Does the Old Regime Win?</h2>
            <p style={pStyle}>
              This table shows the exact deduction level at which both regimes cost the same, at each income level. More deductions than shown favours the old regime; fewer favours the new regime.
            </p>
            <DataTable
              caption="Breakeven Deduction Level by Income, FY 2025-26"
              headers={['Gross Income', 'Breakeven Deduction Level']}
              rows={[
                ['Up to Rs 12 lakh', 'New regime always wins (tax is nil)'],
                ['Rs 13 lakh', 'Rs 6,87,500'],
                ['Rs 14 lakh', 'Rs 5,18,750'],
                ['Rs 15 lakh', 'Rs 5,43,750'],
                ['Rs 16 lakh', 'Rs 5,68,750'],
                ['Rs 17 lakh', 'Rs 6,08,330'],
                ['Rs 18 lakh', 'Rs 6,41,670'],
                ['Rs 19 lakh', 'Rs 6,75,000'],
                ['Rs 20 lakh', 'Rs 7,08,330'],
                ['Rs 22 lakh', 'Rs 7,54,170'],
                ['Rs 24 lakh', 'Rs 7,87,500'],
                ['Rs 25 lakh', 'Rs 8,00,000'],
              ]}
            />
            <Callout>
              Income here is gross income before standard deduction, counting only income taxed at slab rates. The Rs 13 lakh breakeven figure looks like an outlier next to Rs 14 lakh because Rs 12-13 lakh sits right at the edge of the 87A rebate cliff, where marginal relief changes the math sharply.
            </Callout>

            {/* SECTION 7 */}
            <h2 id="investors-nri" style={hStyle}>Which Regime Is Better for Investors and NRIs?</h2>
            <h3 style={h3Style}>For Investors</h3>
            <p style={pStyle}>
              Capital gains tax rates barely change between regimes, since they depend on the asset type and holding period, not the regime you pick. The regime choice mainly affects tax on your salary and other slab-rate income; Section 80C investment deductions remain old-regime-only.
            </p>
            <h3 style={h3Style}>For NRIs</h3>
            <p style={pStyle}>
              The same slab rates and regime choice apply to NRIs for Indian-sourced income like salary and capital gains. A handful of provisions, such as Section 80TTB, differ for residents versus non-residents, but the regime comparison logic above carries over unchanged.
            </p>

            {/* SECTION 8 */}
            <h2 id="switching" style={hStyle}>Can You Switch Between Regimes Every Year?</h2>
            <p style={pStyle}>
              Salaried individuals without business income can switch every year, simply by choosing at the time of filing, regardless of which regime their employer used for TDS.
            </p>
            <p style={pStyle}>
              Taxpayers with business income face a stricter rule: they can move from the new regime to the old regime only once, by filing Form 10-IEA. Once they switch back to the new regime again, that option is gone for good while business income continues.
            </p>

            <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, lineHeight: 1.65, marginTop: 4, marginBottom: 20 }}>
              Run your own numbers on the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Old vs New Regime Calculator</Link>, or check your take-home pay directly on the <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>In-Hand Salary Calculator</Link>.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Old vs New Tax Regime</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="regime-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}>
            {/* Ad banner */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, marginBottom: 20, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['New regime rebate', 'Rs 60,000, up to Rs 12L'],
                ['Old regime rebate', 'Rs 12,500, up to Rs 5L'],
                ['Standard deduction (new)', 'Rs 75,000'],
                ['Standard deduction (old)', 'Rs 50,000'],
                ['Tax-free salary (new)', 'Up to Rs 12.75L'],
                ['Breakeven at Rs 15L income', 'Rs 5.44L deductions'],
                ['Breakeven at Rs 20L income', 'Rs 7.08L deductions'],
                ['Breakeven at Rs 25L income', 'Rs 8L deductions'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTA */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Old vs New Regime Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>In-Hand Salary Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/income-tax-slabs-fy-2025-26', 'Income Tax Slabs FY 2025-26: New and Old Regime Rates'],
                ['/blogs/section-115bac-new-tax-regime', 'Section 115BAC: Full New Regime Deduction Guide'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date: Every Deadline You Need to Know'],
                ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 of Income Tax Act: Exemptions and Allowances'],
              ] as [string, string][]).map(([href, title], i, arr) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
        .regime-sidebar::-webkit-scrollbar { width: 5px; }
        .regime-sidebar::-webkit-scrollbar-track { background: transparent; }
        .regime-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .regime-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        .toc-link:hover { background: #f4f5f6; color: #101214; }
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

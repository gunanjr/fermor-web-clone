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
  title: 'Section 87A Rebate: Limit, Marginal Relief (FY 2025-26)',
  description: 'Section 87A rebate guide: Rs 60,000 up to Rs 12 lakh (new regime), Rs 12,500 up to Rs 5 lakh (old regime), with a verified marginal relief example.',
  alternates: { canonical: 'https://fermor.in/blogs/section-87a-rebate' },
  openGraph: {
    title: 'Section 87A Rebate: Limit, Marginal Relief (FY 2025-26) - Fermor',
    description: 'Section 87A rebate limits for both tax regimes, who is eligible, what income it excludes, and marginal relief with a verified worked example.',
    type: 'article',
    url: 'https://fermor.in/blogs/section-87a-rebate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 87A Rebate: Limit, Marginal Relief (FY 2025-26) - Fermor',
    description: 'Rs 60,000 rebate up to Rs 12 lakh under the new regime, Rs 12,500 up to Rs 5 lakh under the old regime, and how marginal relief works.',
  },
};

const faqItems = [
  { q: 'What is the rebate under Section 87A?', a: 'Section 87A gives resident individuals a rebate that reduces their income tax liability to nil, up to Rs 60,000 for taxable income up to Rs 12 lakh under the new tax regime, or up to Rs 12,500 for taxable income up to Rs 5 lakh under the old tax regime.' },
  { q: 'What is the Section 87A rebate limit for FY 2025-26?', a: 'For FY 2025-26 (AY 2026-27), the new regime allows a rebate of up to Rs 60,000 for taxable income up to Rs 12 lakh, and the old regime allows a rebate of up to Rs 12,500 for taxable income up to Rs 5 lakh.' },
  { q: 'Can non-resident Indians (NRIs) claim the Section 87A rebate?', a: 'No. The rebate under Section 87A is available only to resident individuals. Non-resident taxpayers cannot claim it, regardless of their income level.' },
  { q: 'Can HUFs, firms, or companies claim the Section 87A rebate?', a: 'No. Section 87A is available only to individuals. Hindu Undivided Families, partnership firms, and companies cannot claim this rebate under any circumstances.' },
  { q: 'Is the rebate calculated before or after cess?', a: 'The rebate is applied to the total tax liability before adding the 4% Health and Education Cess. Cess is calculated on whatever tax remains after the rebate, not on the pre-rebate tax figure.' },
  { q: 'What income is not eligible for the Section 87A rebate?', a: 'The rebate cannot be adjusted against tax on long-term capital gains under Section 112A, short-term capital gains under Section 111A, or income taxed at special flat rates, such as lottery or game show winnings.' },
  { q: 'Is Section 87A rebate available on long-term capital gains?', a: 'It depends on which section governs the gain. Long-term capital gains under Section 112A, mainly listed equity shares and equity mutual funds, are specifically excluded from rebate eligibility. Long-term gains taxed under other provisions are not automatically excluded the same way, but the rebate can still only reduce tax up to the specified income limit for the regime chosen.' },
  { q: 'What is marginal relief under Section 87A?', a: 'Marginal relief prevents a taxpayer whose income crosses Rs 12 lakh (new regime) by a small margin from facing a disproportionately large tax bill. Where the extra tax on the amount above Rs 12 lakh exceeds the extra income itself, the rebate is adjusted so the taxpayer only pays tax equal to the amount their income exceeds Rs 12 lakh.' },
  { q: 'How do I calculate marginal relief on the Section 87A rebate?', a: 'First calculate the excess income above Rs 12 lakh (A). Then calculate the tax liability on total income before cess (B). If B is greater than A, the rebate equals B minus A, and the tax payable equals A, the excess income itself.' },
  { q: 'What is a worked example of marginal relief under Section 87A?', a: 'For a resident individual with total income of Rs 12,15,000 under the new regime: excess above Rs 12 lakh is Rs 15,000 (A), tax on Rs 12,15,000 before cess is Rs 62,250 (B), and since B exceeds A, the rebate equals Rs 47,250 (B minus A), leaving tax payable of exactly Rs 15,000, plus 4% cess of Rs 600, for a final tax liability of Rs 15,600.' },
  { q: 'Does the Rs 12 lakh rebate limit include the standard deduction?', a: 'No, the Rs 12 lakh threshold applies to taxable income after all applicable deductions, including the Rs 75,000 standard deduction for salaried individuals under the new regime. This effectively pushes the tax-free gross salary for salaried taxpayers to Rs 12.75 lakh.' },
  { q: 'Is a surcharge levied for taxpayers claiming the Section 87A rebate?', a: 'No. Surcharge under the Income Tax Act only applies once taxable income crosses much higher thresholds, well beyond the Rs 12 lakh or Rs 5 lakh limits where Section 87A rebate applies, so anyone eligible for the rebate never faces a surcharge.' },
  { q: 'What is the difference between a tax rebate and a tax deduction?', a: 'A deduction reduces your taxable income before tax is calculated, and is available under various sections depending on your investments and expenses. A rebate directly reduces the tax liability itself, after it has already been computed, and under the Income Tax Act is available only through Section 87A, and only to resident individuals.' },
  { q: 'How do I claim the Section 87A rebate while filing my ITR?', a: 'Calculate your gross total income, subtract eligible deductions to arrive at taxable income, and declare both in your ITR. If your taxable income falls within the specified limit for your chosen regime, the income tax e-filing portal automatically computes and applies the rebate; no separate claim form is needed.' },
  { q: 'Which section of the Income Tax Act, 2025 replaces Section 87A?', a: 'Section 156 of the Income Tax Act, 2025 carries forward the same rebate provisions currently under Section 87A of the 1961 Act, effective from the tax season covering FY 2026-27 income. The current AY 2026-27 filing season, covering income up to March 31, 2026, still falls under Section 87A of the 1961 Act.' },
  { q: 'Can I claim Section 87A rebate under both the old and new tax regime in the same year?', a: 'No, the rebate is calculated under whichever single regime you have chosen to be taxed under for that year. You cannot combine the new regime\'s Rs 12 lakh limit with the old regime\'s deduction structure; the rebate eligibility and limit follow the regime you actually opted into.' },
  { q: 'Is the Section 87A rebate available to senior citizens?', a: 'Yes, on the same terms as any other resident individual, based on which regime they choose and their taxable income relative to that regime\'s rebate limit. Senior citizens under the old regime also benefit from a higher basic exemption limit before the rebate calculation even begins.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, investments, and filing their returns. It combines free calculators with guides on tax provisions that affect real take-home income.' },
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
  headline: 'Income Tax Rebate Under Section 87A: Limits and Marginal Relief',
  url: 'https://fermor.in/blogs/section-87a-rebate',
  datePublished: '2026-07-29T23:53:18+05:30',
  dateModified: '2026-07-29T23:53:18+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete Section 87A rebate guide for FY 2025-26 (AY 2026-27): the Rs 60,000 rebate up to Rs 12 lakh taxable income under the new regime, the Rs 12,500 rebate up to Rs 5 lakh under the old regime, eligibility limited to resident individuals, income excluded from rebate eligibility (Section 112A and 111A capital gains, special-rate income), a step-by-step marginal relief calculation with an independently verified worked example, and the Section 156 renumbering under the Income Tax Act 2025.',
  articleSection: 'Income Tax',
  keywords: '87a rebate, rebate under section 87a, rebate us 87a, us 87a rebate, 87a income tax, 87a of income tax act, 87a rebate in new tax regime, rebate section 87a, section 87a, section 87a of income tax act, tax rebate under section 87a, income tax rebate under section 87a, sec 87a, tax rebate us 87a, relief under section 87a',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 87A Rebate', item: 'https://fermor.in/blogs/section-87a-rebate' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Marginal Relief on the Section 87A Rebate',
  description: 'Step-by-step process to calculate marginal relief when income slightly exceeds the Section 87A rebate threshold.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Calculate the excess income above Rs 12 lakh', text: 'Subtract Rs 12 lakh from your total taxable income under the new regime; call this figure A.' },
    { '@type': 'HowToStep', position: 2, name: 'Calculate tax liability on total income', text: 'Compute income tax on your full taxable income at the new regime slab rates, before cess; call this figure B.' },
    { '@type': 'HowToStep', position: 3, name: 'Compare B to A', text: 'If B is greater than A, marginal relief applies, and the rebate equals B minus A.' },
    { '@type': 'HowToStep', position: 4, name: 'Determine final tax payable', text: 'Tax payable after marginal relief equals A, the excess income itself, before adding 4% Health and Education Cess.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-87a-rebate',
  name: 'Income Tax Rebate Under Section 87A: Limits and Marginal Relief - Fermor',
  url: 'https://fermor.in/blogs/section-87a-rebate',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T23:53:18+05:30',
  dateModified: '2026-07-29T23:53:18+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Section 87A',
      alternateName: 'Income Tax Rebate',
      description: 'A provision that reduces a resident individual\'s income tax liability to nil, up to Rs 60,000 for taxable income up to Rs 12 lakh under the new tax regime, or up to Rs 12,500 for taxable income up to Rs 5 lakh under the old regime.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Marginal Relief',
      description: 'A tax adjustment ensuring a taxpayer whose income crosses the Section 87A rebate threshold by a small amount does not pay more additional tax than the additional income itself.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Resident individual taxpayers in India filing income tax returns',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-87a', name: 'What Is Section 87A Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Eligibility Criteria' },
    { '@type': 'WebPageElement', cssSelector: '#rebate-limits', name: 'Rebate Limits: New vs Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-claim', name: 'How to Claim the Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#not-eligible', name: 'Income Not Eligible' },
    { '@type': 'WebPageElement', cssSelector: '#marginal-relief', name: 'Marginal Relief' },
    { '@type': 'WebPageElement', cssSelector: '#section-156', name: 'Section 156 Renumbering' },
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
  knowsAbout: ['Section 87A', 'Marginal Relief', 'New Tax Regime', 'Old Tax Regime', 'Section 112A', 'Section 111A', 'Account Aggregator Framework'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains the Section 87A rebate for general informational purposes and is not tax advice. Rebate eligibility and marginal relief depend on your complete income profile and chosen tax regime; verify your exact liability using the calculator linked on this page or consult a chartered accountant before filing. Figures reflect the law as of the date above and may change with future notifications.
      </p>
    </div>
  );
}

export default function Section87ARebatePage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 87A Rebate</li>
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
            <time dateTime="2026-07-29T23:53:18+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 29, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Income Tax Rebate Under Section 87A: Limits and Marginal Relief
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 87A gives resident individuals a rebate that brings tax liability to nil: up to Rs 60,000 for taxable income up to Rs 12 lakh under the new regime, or up to Rs 12,500 for taxable income up to Rs 5 lakh under the old regime.
            </p>
            <p style={pStyle}>
              Marginal relief protects anyone whose income crosses Rs 12 lakh by just a small amount, so a few thousand rupees of extra income never triggers a disproportionately large tax bill.
            </p>
            <p style={pStyle}>
              This guide covers exact eligibility, what income the rebate can't offset, and a fully verified step-by-step marginal relief calculation.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for Section 87A rebate"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Calculate your exact tax with the rebate applied', <Link key="l2" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Income Tax Calculator</Link>],
                  ['Compare old vs new regime for your income', <Link key="l3" href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Old vs New Tax Regime Calculator</Link>],
                ]}
              />
            </div>

            {/* SECTION: What is 87A */}
            <h2 id="what-is-87a" style={hStyle}>What Is the Section 87A Rebate?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 87A gives resident individuals a rebate that directly cancels out income tax liability, up to Rs 60,000 under the new regime for taxable income up to Rs 12 lakh, or up to Rs 12,500 under the old regime for taxable income up to Rs 5 lakh.
              </p>
            </div>
            <p style={pStyle}>
              The rebate is applied to the tax computed before the 4% Health and Education Cess is added, so cess is calculated only on whatever tax remains after the rebate reduces the liability.
            </p>

            {/* SECTION: Eligibility */}
            <h2 id="eligibility" style={hStyle}>Eligibility Criteria for Section 87A</h2>
            <BulletList items={[
              'Only resident individuals can claim this rebate; non-resident individuals, HUFs, firms, and companies are all excluded.',
              'Taxable income must not exceed Rs 12 lakh under the new regime, or Rs 5 lakh under the old regime, depending on which regime the taxpayer has chosen.',
              'The rebate amount is capped at the lower of the specified limit (Rs 60,000 or Rs 12,500) or the actual total tax payable before cess, whichever is less.',
              'The rebate cannot be adjusted against tax computed under Section 112A on long-term capital gains from listed equity and equity mutual funds.',
            ]} />

            {/* SECTION: Rebate limits */}
            <h2 id="rebate-limits" style={hStyle}>Section 87A Rebate Limit: New vs Old Tax Regime</h2>
            <InfoTable
              caption="Section 87A rebate limits, FY 2025-26 (AY 2026-27)"
              headers={['Regime', 'Rebate Amount', 'Taxable Income Limit']}
              rows={[
                ['New tax regime', 'Up to Rs 60,000', 'Up to Rs 12 lakh'],
                ['Old tax regime', 'Up to Rs 12,500', 'Up to Rs 5 lakh'],
              ]}
            />
            <p style={pStyle}>
              Under the new regime, a salaried individual's Rs 75,000 standard deduction is subtracted before this Rs 12 lakh threshold is tested, which effectively pushes tax-free gross salary to Rs 12.75 lakh for salaried taxpayers specifically.
            </p>

            <CalcCTA
              href="/calculators/old-vs-new-tax-regime-calculator"
              label="Old vs New Tax Regime Calculator"
              note="See exactly which regime, and which rebate limit, results in lower tax for your specific income and deductions."
            />

            {/* SECTION: How to claim */}
            <h2 id="how-to-claim" style={hStyle}>How to Claim the Section 87A Rebate</h2>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Calculate gross total income:</strong> add up all sources of income for the financial year.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Subtract eligible deductions:</strong> apply Section 80C, 80D, and other deductions available under your chosen regime.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Arrive at total taxable income:</strong> this is the figure tested against the Rs 12 lakh or Rs 5 lakh limit.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Declare income and deductions in your ITR:</strong> the e-filing portal automatically computes and applies the rebate if your taxable income qualifies.
              </li>
            </ol>

            {/* SECTION: Worked examples */}
            <h2 id="worked-examples" style={hStyle}>Worked Examples: Section 87A Rebate</h2>
            <InfoTable
              caption="New regime example: gross income Rs 12,00,000, AY 2026-27"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Gross total income', '12,00,000'],
                ['Total taxable income (no 80C under new regime)', '12,00,000'],
                ['Tax liability as per slabs', '60,000'],
                ['Less: Rebate under Section 87A', '60,000'],
                ['Tax payable', '0'],
              ]}
            />
            <InfoTable
              caption="Old regime example: gross income Rs 6,50,000, AY 2026-27"
              headers={['Particulars', 'Amount (Rs)']}
              rows={[
                ['Gross total income', '6,50,000'],
                ['Less: Deduction under Section 80C', '1,50,000'],
                ['Total taxable income', '5,00,000'],
                ['Tax liability as per slabs', '12,500'],
                ['Less: Rebate under Section 87A', '12,500'],
                ['Tax payable', '0'],
              ]}
            />

            {/* SECTION: Not eligible */}
            <h2 id="not-eligible" style={hStyle}>Income Not Eligible for Section 87A Rebate</h2>
            <BulletList items={[
              'Long-term capital gains under Section 112A of the Income Tax Act, mainly listed equity shares and equity mutual funds.',
              'Short-term capital gains under Section 111A.',
              'Income taxed at special flat rates, such as winnings from lotteries or game shows.',
            ]} />

            {/* SECTION: Marginal relief */}
            <h2 id="marginal-relief" style={hStyle}>Marginal Relief in the New Tax Regime</h2>
            <p style={pStyle}>
              If income slightly exceeds Rs 12 lakh and the extra tax on that excess is more than the excess income itself, marginal relief limits the tax to just the amount by which income exceeds Rs 12 lakh.
            </p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Calculate excess above Rs 12 lakh (A):</strong> total income minus Rs 12,00,000.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Compute tax liability on total income before cess (B).</strong>
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>If B is greater than A, the rebate equals (B minus A).</strong>
              </li>
            </ol>
            <p style={pStyle}>
              For a resident individual, Mr. Ravi, age 36, with total income of Rs 12,15,000 under the new regime for AY 2026-27, the calculation runs as follows, independently recomputed and confirmed correct.
            </p>
            <InfoTable
              caption="Marginal relief calculation for total income of Rs 12,15,000"
              headers={['Step', 'Calculation', 'Amount (Rs)']}
              rows={[
                ['Excess above Rs 12 lakh (A)', '12,15,000 - 12,00,000', '15,000'],
                ['Tax on total income before cess (B)', 'Tax on Rs 12,15,000 at new regime slabs', '62,250'],
                ['Rebate under Section 87A (B - A, since B > A)', '62,250 - 15,000', '47,250'],
                ['Tax payable (before cess)', '62,250 - 47,250', '15,000'],
                ['Add: Health and Education Cess at 4%', '15,000 x 4%', '600'],
                ['Total tax liability', '15,000 + 600', '15,600'],
              ]}
            />
            <p style={pStyle}>
              The final tax payable of Rs 15,000 before cess is exactly equal to the excess income of Rs 15,000, which is the entire point of marginal relief: the taxpayer never pays more additional tax than the additional income that pushed them past Rs 12 lakh.
            </p>

            {/* SECTION: Section 156 */}
            <h2 id="section-156" style={hStyle}>Section 87A Under the Income Tax Act, 2025</h2>
            <p style={pStyle}>
              Section 156 of the Income Tax Act, 2025 carries forward the same rebate provisions currently under Section 87A of the 1961 Act, effective from the tax season covering FY 2026-27 income.
            </p>
            <p style={pStyle}>
              For income earned up to March 31, 2026, covered by the current AY 2026-27 filing season, the provisions of Section 87A under the 1961 Act still apply, since that income was earned before the new Act took effect.
            </p>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 87A Rebate</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s87a-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>87A Quick Reference</div>
              {([
                ['New regime rebate', 'Up to Rs 60,000'],
                ['New regime limit', 'Rs 12 lakh'],
                ['Old regime rebate', 'Up to Rs 12,500'],
                ['Old regime limit', 'Rs 5 lakh'],
                ['Salaried tax-free (new regime)', 'Rs 12.75 lakh'],
                ['Eligible taxpayers', 'Resident individuals only'],
                ['Excluded', 'Section 112A and 111A gains'],
                ['Renumbered as', 'Section 156, from AY 2027-28'],
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
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Old vs New Tax Regime</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Capital Gains Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/section-115bac-new-tax-regime', 'Section 115BAC New Tax Regime'],
                ['/blogs/cost-inflation-index-fy-2026-27', 'Cost Inflation Index FY 2026-27'],
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
        .s87a-sidebar::-webkit-scrollbar { width: 5px; }
        .s87a-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s87a-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s87a-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

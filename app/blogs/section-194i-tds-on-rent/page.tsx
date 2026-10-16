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
  title: 'Section 194I TDS on Rent: Rates, Limit, Examples (2026)',
  description: 'Section 194I guide: 2% and 10% TDS rates, the Rs 50,000/month threshold since Budget 2025, the 194-IB comparison, and a verified worked example.',
  alternates: { canonical: 'https://fermor.in/blogs/section-194i-tds-on-rent' },
  openGraph: {
    title: 'Section 194I TDS on Rent: Rates, Limit, Examples (2026) - Fermor',
    description: 'TDS on rent under Section 194I: current rates, the Budget 2025 threshold change, 194-IB comparison, and a verified worked example.',
    type: 'article',
    url: 'https://fermor.in/blogs/section-194i-tds-on-rent',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 194I TDS on Rent: Rates, Limit, Examples (2026) - Fermor',
    description: 'Current TDS on rent rates and threshold under Section 194I, with the 194-IB comparison and a verified worked example.',
  },
};

const faqItems = [
  { q: 'What is Section 194I of the Income Tax Act?', a: 'Section 194I requires any person, other than an individual or HUF not subject to tax audit, to deduct TDS on rent paid for land, building, machinery, plant, equipment, furniture, or fittings, at 10% for land, building, furniture, and fittings, or 2% for plant, machinery, and equipment.' },
  { q: 'What is the current threshold limit for TDS on rent under Section 194I?', a: 'Since Budget 2025, effective April 1, 2025, TDS applies whenever rent credited or paid for a month, or part of a month, exceeds Rs 50,000, which works out to Rs 6 lakh a year. This replaced the earlier annual threshold of Rs 2,40,000 that applied from FY 2019-20 through FY 2024-25.' },
  { q: 'Why did the TDS on rent threshold change from Rs 2,40,000 to Rs 6 lakh?', a: 'Budget 2025 rationalised several TDS thresholds to reduce compliance burden and the cash-flow lock-up TDS creates for smaller payments. The annual test of Rs 2,40,000 was replaced with a monthly test of Rs 50,000, aligning the trigger point with the monthly rent cycle most tenancies actually follow.' },
  { q: 'What is the TDS rate on rent for machinery, plant, or equipment?', a: 'TDS on rent for plant, machinery, or equipment is 2% under Section 194I, lower than the 10% rate that applies to land, building, furniture, and fittings.' },
  { q: 'What is the TDS rate on rent paid to an NRI landlord?', a: 'Rent paid to a non-resident landlord does not fall under Section 194I at all. It is covered by Section 195, which requires TDS at 30% plus applicable surcharge and 4% Health and Education Cess, with no minimum threshold exemption.' },
  { q: 'Who is exempt from deducting TDS under Section 194I?', a: 'Individuals and Hindu Undivided Families whose business turnover does not exceed Rs 1 crore, or whose professional gross receipts do not exceed Rs 50 lakh, in the immediately preceding financial year are not covered by Section 194I. They fall instead under Section 194-IB, which has its own threshold and rate.' },
  { q: 'What is the difference between Section 194I and Section 194-IB?', a: 'Section 194I applies to companies, firms, and individuals or HUFs subject to tax audit, at 10% or 2% depending on the asset, once monthly rent exceeds Rs 50,000. Section 194-IB applies specifically to individuals and HUFs not subject to tax audit, at a flat 2% once monthly rent exceeds Rs 50,000, and unlike Section 194I, does not require the tenant to obtain a TAN.' },
  { q: 'What was the TDS rate under Section 194-IB before it was reduced?', a: 'Section 194-IB carried a 5% TDS rate until September 30, 2024. The Finance (No. 2) Act, 2024 reduced it to 2%, effective October 1, 2024, and that 2% rate remains current.' },
  { q: 'Does the Rs 50,000 monthly limit mean TDS is only deducted on the amount above Rs 50,000?', a: 'No. Once monthly rent exceeds Rs 50,000, TDS applies to the entire rent amount for that month, not just the portion above the threshold. This is a common point of confusion, since many other TDS provisions do work on an excess-over-threshold basis.' },
  { q: 'What happens if the landlord does not provide a PAN?', a: 'Under Section 206AA, if the landlord does not furnish a valid PAN, TDS must be deducted at 20% instead of the usual 10% or 2% rate under Section 194I.' },
  { q: 'Is TDS deducted on a refundable security deposit?', a: 'No. A refundable security deposit is not income in the landlord\'s hands, so no TDS applies. Advance rent that is not refundable, however, is treated as rental income and is subject to TDS at the time of payment or credit.' },
  { q: 'When exactly must TDS on rent be deducted?', a: 'TDS must be deducted at the earlier of two events: when the rent is credited to the landlord\'s account, including a suspense account, or when the rent is actually paid, whichever happens first.' },
  { q: 'What is the due date for depositing TDS on rent with the government?', a: 'TDS deducted in any month other than March must be deposited by the 7th of the following month. TDS deducted in March has a longer window, due by April 30.' },
  { q: 'What is the penalty for not deducting or not depositing TDS on rent?', a: 'Failing to deduct TDS when required attracts interest of 1% per month, calculated from the date TDS should have been deducted to the date it is actually deducted. Deducting TDS but failing to deposit it attracts a higher 1.5% per month, calculated from the deduction date to the actual deposit date.' },
  { q: 'How do I avoid TDS on rent if my total income is below the taxable limit?', a: 'A landlord whose total income falls below the basic exemption limit can submit Form 15G, or Form 15H if a senior citizen, to the tenant, requesting that no TDS be deducted despite the rent exceeding the threshold.' },
  { q: 'Can a landlord apply for a lower or nil TDS deduction certificate?', a: 'Yes. The landlord can apply in Form 13 to the Assessing Officer under Section 197. If satisfied that the landlord\'s total income justifies it, the officer issues a certificate in Form 15AA directing the tenant to deduct TDS at a lower rate, or not at all.' },
  { q: 'Which TDS return form covers rent payments under Section 194I?', a: 'Form 26Q covers all non-salary TDS deductions, including rent under Section 194I, and must be filed quarterly. The due date is the last day of the month following the quarter, except for the January-March quarter, which is due by May 31.' },
  { q: 'Does Section 194I apply to service charges paid to a business centre?', a: 'Yes. Service charges payable to a business centre fall within the definition of rent under Section 194I, since the section covers any payment "by whatever name called" for the use of premises or facilities.' },
  { q: 'Does TDS under Section 194I apply to cold storage charges?', a: 'No, not under Section 194I. Cold storage arrangements are contractual service agreements rather than a lease or tenancy, so payments to a cold storage facility fall under Section 194C instead.' },
  { q: 'How is TDS handled when a hotel bills for both a hall and catering for an event?', a: 'The hall or room rental portion is covered by Section 194I, while the catering or food portion is covered separately by Section 194C. A single hotel invoice for an event often needs to be split between the two sections for correct TDS treatment.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on tax provisions that affect everyday financial decisions like renting property.' },
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
  headline: 'Section 194I TDS on Rent: Rates, Threshold, and a Worked Example',
  url: 'https://fermor.in/blogs/section-194i-tds-on-rent',
  datePublished: '2026-07-29T23:33:21+05:30',
  dateModified: '2026-07-29T23:33:21+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete Section 194I guide covering the 2% and 10% TDS rates on rent, the Budget 2025 change that replaced the old Rs 2,40,000 annual threshold with a Rs 50,000-per-month test (Rs 6 lakh a year), the comparison with Section 194-IB for non-audit individuals and HUFs, the flat 30% NRI landlord rate under Section 195, PAN non-furnishing consequences under Section 206AA, a verified worked example, and specific-circumstance rules for factory buildings, business centre service charges, cold storage, and hotel event billing.',
  articleSection: 'Income Tax',
  keywords: 'tds rent, 194i, 194i of income tax act, 194i tds, sec 194i, tds on rent income, tds on rent paid, tds on rent payment, 194i tds on rent, tds deducted on rent, tds on 194i, tds on rent 194ib, tds on rent building, tds on rent by individual, tds on rent for residential property, tds on rent of commercial property, section 194i tds on rent, tds under 194i',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 194I TDS on Rent', item: 'https://fermor.in/blogs/section-194i-tds-on-rent' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate TDS on Rent Under Section 194I',
  description: 'Step-by-step process to determine whether TDS applies and calculate the amount for rent payments.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check who is paying the rent', text: 'Confirm the payer is not an individual or HUF exempt from tax audit; those cases fall under Section 194-IB instead.' },
    { '@type': 'HowToStep', position: 2, name: 'Check the monthly rent amount', text: 'TDS applies once the rent for a month, or part of a month, exceeds Rs 50,000.' },
    { '@type': 'HowToStep', position: 3, name: 'Identify the asset type', text: 'Use 10% for land, building, furniture, or fittings, and 2% for plant, machinery, or equipment.' },
    { '@type': 'HowToStep', position: 4, name: 'Confirm the landlord\'s PAN', text: 'If PAN is not furnished, deduct at 20% under Section 206AA instead of the standard rate.' },
    { '@type': 'HowToStep', position: 5, name: 'Deduct and deposit on time', text: 'Deduct TDS at the earlier of credit or payment, and deposit it by the 7th of the following month, or April 30 for March deductions.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-194i-tds-on-rent',
  name: 'Section 194I TDS on Rent: Rates, Threshold, and a Worked Example - Fermor',
  url: 'https://fermor.in/blogs/section-194i-tds-on-rent',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T23:33:21+05:30',
  dateModified: '2026-07-29T23:33:21+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Section 194I',
      alternateName: 'TDS on Rent',
      description: 'A provision of the Income Tax Act, 1961 requiring TDS deduction on rent paid for land, building, machinery, plant, equipment, furniture, or fittings, at 10% or 2% depending on the asset, once monthly rent exceeds Rs 50,000.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Section 194-IB',
      alternateName: 'TDS on Rent by Individuals and HUFs',
      description: 'A provision requiring individuals and HUFs not subject to tax audit to deduct 2% TDS on rent once monthly payments exceed Rs 50,000, without needing a TAN.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Tenants, landlords, businesses, and tax professionals in India dealing with rent payments',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#threshold-change', name: 'The Budget 2025 Threshold Change' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-194i', name: 'What Is Section 194I' },
    { '@type': 'WebPageElement', cssSelector: '#meaning-of-rent', name: 'Meaning of Rent' },
    { '@type': 'WebPageElement', cssSelector: '#who-must-deduct', name: 'Who Must Deduct TDS' },
    { '@type': 'WebPageElement', cssSelector: '#194i-vs-194ib', name: '194I vs 194-IB' },
    { '@type': 'WebPageElement', cssSelector: '#nri-rent', name: 'Rent Paid to NRI' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-deduct', name: 'When to Deduct' },
    { '@type': 'WebPageElement', cssSelector: '#deposit-deadlines', name: 'Deposit Deadlines and Penalties' },
    { '@type': 'WebPageElement', cssSelector: '#lower-deduction', name: 'Lower or Nil Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#special-cases', name: 'Specific Circumstances' },
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
  knowsAbout: ['Section 194I', 'Section 194-IB', 'TDS on Rent', 'Section 195', 'Section 206AA', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };

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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains Section 194I of the Income Tax Act, 1961 for general informational purposes and is not tax advice. TDS obligations depend on your specific payer category, rent amount, and payment pattern; verify your exact liability using the calculator linked on this page or consult a chartered accountant before deducting or filing. Figures reflect the law as of the date above and may change with future notifications.
      </p>
    </div>
  );
}

export default function Section194IPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 194I</li>
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
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Section 194I TDS on Rent: Rates, Threshold, and a Worked Example
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 194I of the Income Tax Act requires TDS on rent at 10% for land, building, furniture, and fittings, or 2% for plant, machinery, and equipment.
            </p>
            <p style={pStyle}>
              Since Budget 2025, the threshold for deduction is Rs 50,000 in rent for any month, working out to Rs 6 lakh a year, replacing the older annual test of Rs 2,40,000 that applied from FY 2019-20 through FY 2024-25.
            </p>
            <p style={pStyle}>
              This guide covers exactly who must deduct, how it differs from Section 194-IB, the NRI landlord rate, and a fully verified worked example.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for TDS on rent"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Calculate TDS on rent and other payments', <Link key="l2" href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>TDS Calculator</Link>],
                ]}
              />
            </div>

            {/* SECTION: Threshold change */}
            <h2 id="threshold-change" style={hStyle}>The Budget 2025 Threshold Change: What's Different Now</h2>
            <p style={pStyle}>
              Budget 2025 replaced Section 194I's old annual threshold of Rs 2,40,000 with a monthly test of Rs 50,000, effective April 1, 2025.
            </p>
            <InfoTable
              caption="Section 194I threshold: before and after Budget 2025"
              headers={['Period', 'Threshold', 'Test Basis']}
              rows={[
                ['FY 2019-20 through FY 2024-25', 'Rs 2,40,000 per year', 'Annual aggregate rent to a single payee'],
                ['FY 2025-26 onward', 'Rs 50,000 per month (Rs 6 lakh per year)', 'Rent credited or paid for any single month, or part of a month'],
              ]}
            />
            <p style={pStyle}>
              Once monthly rent crosses Rs 50,000, TDS applies to the full month's rent, not just the amount above the threshold. This monthly test now matches the structure Section 194-IB has always used for individual and HUF tenants.
            </p>

            {/* SECTION: What is 194I */}
            <h2 id="what-is-194i" style={hStyle}>What Is Section 194I?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 194I mandates TDS deduction on rent paid for land, building, machinery, plant, equipment, furniture, or fittings, at 10% for immovable property and 10%-class assets, or 2% for movable plant and machinery.
              </p>
            </div>
            <p style={pStyle}>
              The provision brings rental income onto the tax department's formal record. Since house property income isn't otherwise subject to books of account for most landlords, rent has historically been an income category prone to under-reporting, and TDS creates a paper trail at the source.
            </p>
            <InfoTable
              caption="TDS rates under Section 194I"
              headers={['Nature of Payment', 'TDS Rate']}
              rows={[
                ['Rent of plant, machinery, or equipment', '2%'],
                ['Rent of land, building, furniture, or fittings', '10%'],
              ]}
            />
            <p style={pStyle}>
              No surcharge or cess is added on top of these rates for resident landlords; the 10% or 2% figure is the final rate deducted.
            </p>

            {/* SECTION: Meaning of rent */}
            <h2 id="meaning-of-rent" style={hStyle}>What Counts as 'Rent' Under Section 194I</h2>
            <p style={pStyle}>
              Rent covers any payment made under a lease, sub-lease, tenancy, or similar arrangement, for the use of a defined set of assets.
            </p>
            <BulletList items={[
              'Land, or land appurtenant to a building, such as a parking lot or garden.',
              'Building, including a factory building.',
              'Machinery, plant, or equipment.',
              'Furniture or fittings.',
            ]} />
            <p style={pStyle}>
              A refundable security deposit is not treated as rent, since it isn&apos;t income to the recipient, so no TDS applies. Advance rent that is not refundable, however, is taxed as rental income and attracts TDS at the time of payment or credit, including when the amount is routed through a suspense account.
            </p>

            {/* SECTION: Who must deduct */}
            <h2 id="who-must-deduct" style={hStyle}>Who Must Deduct TDS Under Section 194I?</h2>
            <p style={pStyle}>
              Any payer, companies, firms, trusts, associations of persons, and local authorities among them, must deduct TDS on rent under Section 194I once the monthly threshold is crossed.
            </p>
            <p style={pStyle}>
              The one carve-out is individuals and Hindu Undivided Families whose business turnover does not exceed Rs 1 crore, or whose professional gross receipts do not exceed Rs 50 lakh, in the immediately preceding financial year. These taxpayers are not covered by Section 194I at all; instead, they deduct under Section 194-IB.
            </p>

            {/* SECTION: 194I vs 194-IB */}
            <h2 id="194i-vs-194ib" style={hStyle}>Section 194I vs Section 194-IB: What's the Difference?</h2>
            <InfoTable
              caption="Section 194I compared with Section 194-IB"
              headers={['Particulars', 'Section 194I', 'Section 194-IB']}
              rows={[
                ['Who deducts', 'Companies, firms, and individuals/HUFs subject to tax audit', 'Individuals and HUFs not subject to tax audit'],
                ['TDS rate', '10% (land/building/furniture) or 2% (machinery/plant)', '2% flat, regardless of asset type'],
                ['Threshold', 'Rs 50,000 per month (Rs 6 lakh per year)', 'Rs 50,000 per month'],
                ['TAN required', 'Yes', 'No'],
                ['Return form', 'Form 26Q, quarterly', 'Form 26QC, once per year or on vacating'],
              ]}
            />

            <CalcCTA
              href="/calculators/tds-calculator"
              label="TDS Calculator"
              note="Work out the exact TDS amount on your rent, salary, professional fees, or contractor payments."
            />

            {/* SECTION: NRI */}
            <h2 id="nri-rent" style={hStyle}>TDS on Rent Paid to an NRI Landlord</h2>
            <p style={pStyle}>
              Rent paid to a non-resident landlord falls outside Section 194I entirely. It is governed by Section 195, which requires TDS at 30%, plus applicable surcharge and a 4% Health and Education Cess, with no minimum rent threshold.
            </p>
            <p style={pStyle}>
              This means even a modest monthly rent paid to an NRI landlord attracts TDS from the very first rupee, unlike the Rs 50,000 monthly exemption available for resident landlords.
            </p>

            {/* SECTION: Worked example */}
            <h2 id="worked-example" style={hStyle}>Worked Example: TDS on Rent Under Section 194I</h2>
            <p style={pStyle}>
              ABC Pvt Ltd pays Mr. Joy, a resident property owner, Rs 75,000 a month for a building. Since this exceeds the Rs 50,000 monthly threshold, TDS applies to the full monthly amount at 10%, the rate for land and building.
            </p>
            <InfoTable
              caption="TDS calculation on Rs 75,000 monthly rent for a building"
              headers={['Particulars', 'Amount']}
              rows={[
                ['Monthly rent', 'Rs 75,000'],
                ['Annual rent (Rs 75,000 x 12)', 'Rs 9,00,000'],
                ['TDS rate applicable', '10% (land/building)'],
                ['TDS deducted per month (Rs 75,000 x 10%)', 'Rs 7,500'],
                ['Net rent paid to Mr. Joy per month', 'Rs 67,500'],
              ]}
            />
            <p style={pStyle}>
              If Mr. Joy has not furnished his PAN, ABC Pvt Ltd would instead deduct 20% under Section 206AA, reducing the net monthly payment to Rs 60,000.
            </p>

            {/* SECTION: When to deduct */}
            <h2 id="when-to-deduct" style={hStyle}>When TDS Must Be Deducted</h2>
            <p style={pStyle}>
              TDS is deducted at the earlier of two events: when rental income is credited to the landlord's account, including a suspense account, or when the payment is actually made.
            </p>
            <p style={pStyle}>
              Section 194I does not require monthly deduction specifically. If rent is credited quarterly, TDS is deducted quarterly; if it's credited annually, TDS is deducted once a year, based on the actual credit or payment pattern used.
            </p>

            {/* SECTION: Deposit deadlines */}
            <h2 id="deposit-deadlines" style={hStyle}>Deposit Deadlines and Penalties for Late TDS</h2>
            <InfoTable
              caption="TDS on rent: deposit deadlines and penalty rates"
              headers={['Situation', 'Rule']}
              rows={[
                ['TDS deducted in any month except March', 'Deposit by the 7th of the following month'],
                ['TDS deducted in March', 'Deposit by April 30'],
                ['Quarterly TDS return', 'Form 26Q, due by the month-end following the quarter (May 31 for the January-March quarter)'],
                ['TDS not deducted when required', 'Interest at 1% per month from the date it should have been deducted to the actual deduction date'],
                ['TDS deducted but not deposited', 'Interest at 1.5% per month from the deduction date to the actual deposit date'],
              ]}
            />

            {/* SECTION: Lower deduction */}
            <h2 id="lower-deduction" style={hStyle}>No Deduction or Lower Deduction Under Section 197</h2>
            <p style={pStyle}>
              A landlord whose total income doesn't justify full TDS can apply in Form 13 to the Assessing Officer under Section 197. If satisfied, the officer issues a certificate in Form 15AA directing the tenant to deduct at a lower rate or not at all.
            </p>
            <p style={pStyle}>
              A simpler route exists for landlords whose income falls below the basic taxable limit: submitting Form 15G, or Form 15H for senior citizens, to the tenant avoids TDS deduction without involving the Assessing Officer.
            </p>

            {/* SECTION: Special cases */}
            <h2 id="special-cases" style={hStyle}>Specific Circumstances Under Section 194I</h2>
            <h3 style={h3Style}>Factory Building Rental Income</h3>
            <p style={pStyle}>
              Rent from a let-out factory building is usually business income for the owner rather than house property income, but TDS under Section 194I still applies regardless of which head the income falls under in the landlord's hands.
            </p>
            <h3 style={h3Style}>Business Centre Service Charges</h3>
            <p style={pStyle}>
              Service charges paid to a business centre fall within the definition of rent, since the section covers any payment "by whatever name called" for the use of premises.
            </p>
            <h3 style={h3Style}>Building and Furniture Let Out by Separate Owners</h3>
            <p style={pStyle}>
              If one person owns the building and a different person owns the furniture inside it, TDS must be deducted separately against each owner's share of the rent.
            </p>
            <h3 style={h3Style}>Cold Storage Charges</h3>
            <p style={pStyle}>
              Cold storage arrangements are contractual service agreements, not a lease or tenancy, so payments to a cold storage facility fall under Section 194C rather than Section 194I.
            </p>
            <h3 style={h3Style}>Hall Rent Paid by an Association</h3>
            <p style={pStyle}>
              An association of persons is treated as a distinct assessee, not an individual or HUF, so it must deduct TDS on hall rental once payment for the use of the hall exceeds Rs 50,000 in a month.
            </p>
            <h3 style={h3Style}>Hotel Bills for Seminars Including Catering</h3>
            <p style={pStyle}>
              Where a hotel bills separately for room or hall use and for catering, Section 194I applies only to the premises portion. The catering portion falls under Section 194C instead.
            </p>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 194I</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s194i-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>194I Quick Reference</div>
              {([
                ['Rate: land/building/furniture', '10%'],
                ['Rate: plant/machinery', '2%'],
                ['Threshold', 'Rs 50,000/month'],
                ['Annual equivalent', 'Rs 6 lakh'],
                ['No PAN rate', '20%'],
                ['NRI landlord rate', '30% + surcharge + 4% cess'],
                ['Deposit due (non-March)', '7th of next month'],
                ['Deposit due (March)', 'April 30'],
                ['Return form', 'Form 26Q, quarterly'],
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
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
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
                ['/blogs/tds-rate-chart', 'TDS Rate Chart FY 2026-27'],
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
        .s194i-sidebar::-webkit-scrollbar { width: 5px; }
        .s194i-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s194i-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s194i-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';

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

const NOW = '2026-10-12T16:08:30+05:30';

export const metadata: Metadata = {
  title: 'Section 80D Deduction: Limits, Eligibility, Examples FY 2025-26',
  description: 'Section 80D lets you deduct health insurance premiums up to Rs 1 lakh in the old regime. Limits for self, parents and seniors, examples and how to claim.',
  alternates: { canonical: 'https://fermor.in/blogs/section-80d-health-insurance-deduction' },
  openGraph: {
    title: 'Section 80D Deduction: Limits, Eligibility, Examples FY 2025-26 | Fermor',
    description: 'How much health insurance premium you can deduct for self, family and parents, which payments qualify, and why the new regime gets nothing.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['Section 80D', 'Health Insurance', 'Income Tax Deductions'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 80D Deduction | Fermor',
    description: 'Rs 25,000 to Rs 1 lakh deduction on health insurance premiums: who qualifies, what counts and how to claim it.',
  },
  keywords: [
    'section 80d', 'section 80d of income tax act', '80d deduction', '80d deduction limit',
    'section 80d deduction for parents', 'section 80d senior citizen', 'health insurance tax deduction india',
    'medical insurance premium tax benefit', 'medical insurance premium', 'mediclaim tax benefit',
    'mediclaim policy for family', 'best mediclaim policy for family', 'mediclaim policy',
    'health insurance for parents', 'health insurance for senior citizens', 'family health insurance',
    'health insurance policy', 'medical insurance for family', 'buy health insurance',
    'critical illness cover tax benefit', 'preventive health checkup 80d', 'section 126 income tax act 2025',
    '80d old regime', 'health insurance premium deduction old tax regime',
  ],
};

const faqItems = [
  { q: 'What is Section 80D of the Income Tax Act?', a: 'Section 80D lets an individual or HUF deduct health insurance premiums and certain medical expenses from taxable income. The deduction is over and above the Rs 1.5 lakh limit under Section 80C and is available only under the old tax regime.' },
  { q: 'What is the maximum deduction under Section 80D?', a: 'The maximum is Rs 1 lakh a year, which applies when you and your parents are both senior citizens. The limit is Rs 25,000 for self, spouse and children below 60, Rs 50,000 if that group includes a senior citizen, and the same Rs 25,000 or Rs 50,000 again for parents.' },
  { q: 'Who can claim the Section 80D deduction?', a: 'Only individuals and Hindu Undivided Families can claim it. A company, firm or other entity cannot, and the higher senior citizen limit needs the person insured to be 60 or older at any time during the financial year.' },
  { q: 'Can I claim Section 80D under the new tax regime?', a: 'No. Section 115BAC removes the Section 80D deduction for anyone who files under the new regime. If you want the deduction, you must choose the old regime for that year.' },
  { q: 'Can I claim Section 80D for my parents?', a: 'Yes. You can claim premiums you pay for your father, mother or both, whether or not they depend on you. The parents\' limit is separate from your own and is Rs 25,000, or Rs 50,000 if a parent is 60 or older.' },
  { q: 'Can I claim 80D for in-laws, siblings or grandparents?', a: 'No. Section 80D covers self, spouse, dependent children and parents only. Premiums you pay for in-laws, brothers, sisters, grandparents or any other relative do not qualify.' },
  { q: 'Is the preventive health check-up Rs 5,000 over and above the limit?', a: 'No. The Rs 5,000 for preventive health check-ups sits inside the overall limit and is not extra. It is a total across you and your parents, and it is the only payment you can make in cash and still claim.' },
  { q: 'Can I pay the premium in cash and claim 80D?', a: 'No. A health insurance premium must be paid by cheque, card, net banking, UPI or any other mode except cash. Cash payment is accepted only for preventive health check-ups.' },
  { q: 'Can I claim 80D if my employer pays the premium?', a: 'No. A premium paid by your employer under a group policy, or reimbursed by your employer, is not your payment and cannot be claimed. You can claim only the premium you pay from your own money.' },
  { q: 'How is a multi-year health insurance premium treated under Section 80D?', a: 'The premium is spread evenly across the years of cover. If you pay Rs 30,000 upfront for a 2-year policy, you claim Rs 15,000 in each of the two years, still within the annual limit.' },
  { q: 'Can I claim 80D for a top-up or super top-up health plan?', a: 'Yes. A top-up or super top-up policy is health insurance, so its premium counts toward the same Section 80D limit as your base policy. The combined premium on both is capped at the applicable limit.' },
  { q: 'Is a family floater policy eligible for Section 80D?', a: 'Yes. The full premium of a family floater covering you, your spouse and your children counts toward the Rs 25,000 limit, or Rs 50,000 if any covered member is a senior citizen. Parents on a separate policy get their own limit.' },
  { q: 'Can a senior citizen without health insurance claim Section 80D?', a: 'Yes. A senior citizen with no health insurance can claim actual medical expenditure up to Rs 50,000 inside the applicable limit. This applies to a resident senior citizen, and it is safest to pay these bills by cheque, card or UPI.' },
  { q: 'Is critical illness cover eligible for Section 80D?', a: 'Yes, when it is sold as a health insurance policy by an insurer approved by the Insurance Regulatory and Development Authority of India (IRDAI). Premium on a standalone critical illness plan counts toward the same limit as other health premiums.' },
  { q: 'Which documents do I need to claim Section 80D?', a: 'Keep the premium receipt or certificate from the insurer, proof of payment other than cash, and the preventive check-up bill. Salaried employees submit these to the employer with the investment declaration, and the ITR itself does not require attaching them.' },
  { q: 'How much tax does Section 80D actually save?', a: 'It saves your marginal tax rate on the amount claimed, plus 4% cess. A Rs 25,000 deduction saves Rs 7,800 at the 30% slab, and a Rs 1 lakh deduction saves Rs 31,200, before any surcharge.' },
  { q: 'Which section replaces Section 80D in the Income-tax Act 2025?', a: 'The Income-tax Act, 2025 carries the health insurance deduction in Section 126. It applies from 1 April 2026, so Section 80D still governs income earned up to 31 March 2026, which is returns for FY 2025-26 (AY 2026-27).' },
  { q: 'Can I claim 80D if I get treatment outside India?', a: 'Yes. The law does not restrict Section 80D to treatment in India. The premium must still be paid to an eligible insurer by a mode other than cash.' },
  { q: 'Can I claim both 80C and 80D?', a: 'Yes. Section 80D is a separate deduction from the Rs 1.5 lakh limit under Section 80C, so a taxpayer can use both in full under the old regime.' },
  { q: 'What if both I and my parent paid part of the premium?', a: 'Each person claims the amount they paid, within their own limit. The premium must be paid by the person claiming, from their own money, and not in cash.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
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
  headline: 'Section 80D of Income Tax Act: Health Insurance Deduction, Limits and Eligibility',
  url: 'https://fermor.in/blogs/section-80d-health-insurance-deduction',
  datePublished: NOW,
  dateModified: NOW,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/section-80d-health-insurance-deduction' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Section 80D', description: 'The income tax deduction for health insurance premiums and preventive health check-ups paid by individuals and HUFs, available under the old tax regime' },
    { '@type': 'Thing', name: 'Health insurance in India', description: 'Medical insurance policies regulated by IRDAI, including family floater, top-up and senior citizen plans' },
  ],
  keywords: 'section 80d, 80d deduction limit, health insurance tax deduction, medical insurance premium, mediclaim policy for family, health insurance for parents, section 126',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 80D Health Insurance Deduction', item: 'https://fermor.in/blogs/section-80d-health-insurance-deduction' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Claim the Section 80D Deduction',
  description: 'Steps to claim the health insurance deduction under Section 80D, through your employer and in your income tax return.',
  totalTime: 'PT15M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick the old tax regime', text: 'Section 80D is available only under the old regime, so compare both regimes before choosing.' },
    { '@type': 'HowToStep', position: 2, name: 'Pay the premium by a mode other than cash', text: 'Pay the premium by cheque, card, net banking or UPI before 31 March of the financial year.' },
    { '@type': 'HowToStep', position: 3, name: 'Collect the proof', text: 'Keep the insurer premium receipt or certificate, and the bill for any preventive health check-up.' },
    { '@type': 'HowToStep', position: 4, name: 'Declare it to your employer', text: 'Submit the proofs with your investment declaration so TDS is calculated after the deduction.' },
    { '@type': 'HowToStep', position: 5, name: 'Report it in the ITR', text: 'Enter the amounts under the Section 80D rows of the deductions schedule when you file the return.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-80d-health-insurance-deduction',
  name: 'Section 80D Deduction: Limits, Eligibility, Examples FY 2025-26 | Fermor',
  url: 'https://fermor.in/blogs/section-80d-health-insurance-deduction',
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Health insurance',
    description: 'A contract in which an insurer covers the cost of medical treatment in exchange for a premium. In India, premiums paid for eligible health policies qualify for a deduction under Section 80D of the Income Tax Act, 1961.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Health_insurance_in_India',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers who pay health insurance premiums for themselves, family or parents',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'What Is Section 80D' },
    { '@type': 'WebPageElement', cssSelector: '#limits', name: 'Section 80D Deduction Limits' },
    { '@type': 'WebPageElement', cssSelector: '#who-can-claim', name: 'Who Can Claim and For Whom' },
    { '@type': 'WebPageElement', cssSelector: '#eligible-payments', name: 'Eligible Payments and Payment Mode' },
    { '@type': 'WebPageElement', cssSelector: '#examples', name: 'Section 80D Examples' },
    { '@type': 'WebPageElement', cssSelector: '#tax-saved', name: 'How Much Tax 80D Saves' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizens', name: 'Senior Citizens and Parents' },
    { '@type': 'WebPageElement', cssSelector: '#policy-types', name: 'Policy Types That Qualify' },
    { '@type': 'WebPageElement', cssSelector: '#not-allowed', name: 'What Does Not Qualify' },
    { '@type': 'WebPageElement', cssSelector: '#regime', name: 'Old Regime vs New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-claim', name: 'How to Claim 80D' },
    { '@type': 'WebPageElement', cssSelector: '#new-act', name: 'Section 126 of the Income-tax Act 2025' },
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
  knowsAbout: ['Section 80D', 'Income Tax Deductions India', 'Health Insurance India', 'Old vs New Tax Regime', 'Personal Finance India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
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

function Step({ n, title, children }: { n: number; title?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{n}</div>
      <div style={{ paddingTop: 3, fontFamily: INTER }}>
        {title && <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{title}</p>}
        <p style={{ fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{children}</p>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13, border: `1px solid ${C.border}`, borderRadius: 8 }}>
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
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{label}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{note}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Open calculator
      </Link>
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
  { id: 'overview', label: 'What Is Section 80D' },
  { id: 'limits', label: 'Deduction Limits' },
  { id: 'who-can-claim', label: 'Who Can Claim' },
  { id: 'eligible-payments', label: 'Eligible Payments' },
  { id: 'examples', label: 'Worked Examples' },
  { id: 'tax-saved', label: 'Tax Saved' },
  { id: 'senior-citizens', label: 'Senior Citizens, Parents' },
  { id: 'policy-types', label: 'Policy Types That Qualify' },
  { id: 'not-allowed', label: 'What Does Not Qualify' },
  { id: 'regime', label: 'Old vs New Regime' },
  { id: 'how-to-claim', label: 'How to Claim' },
  { id: 'new-act', label: 'Section 126, Act 2025' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Limits and conditions reflect the Income Tax Act, 1961 for FY 2025-26 and can change with each Finance Act. Confirm the current rules on the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Department website</a> or with a qualified Chartered Accountant before claiming. This page is general information and not tax or insurance advice.
      </p>
    </div>
  );
}

export default function Section80DPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 80D Health Insurance Deduction</li>
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
            <time dateTime={NOW} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 12, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Section 80D of Income Tax Act: Health Insurance Deduction, Limits and Eligibility
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 80D lets you deduct health insurance premiums from taxable income, up to Rs 25,000 for self and family and another Rs 25,000 for parents. Both limits double to Rs 50,000 when the person insured is a senior citizen, so the ceiling is Rs 1 lakh.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              The deduction works only under the old tax regime. Below: the limits by age, who you can claim for, worked examples, the tax you save and how to claim it.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>What Is Section 80D of the Income Tax Act?</h2>
            <p style={pStyle}>
              Section 80D is the provision of the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Act, 1961</a> that allows individuals and HUFs to deduct health insurance premiums and certain medical costs. It sits in Chapter VI-A and is separate from the Rs 1.5 lakh limit under Section 80C.
            </p>
            <DataTable
              caption="Section 80D at a Glance"
              headers={['Particulars', 'Details']}
              rows={[
                ['Who can claim', 'Individuals and Hindu Undivided Families'],
                ['What is deductible', 'Health insurance premium, preventive health check-up, medical expenditure of uninsured senior citizens'],
                ['Maximum deduction', 'Rs 1,00,000 a year'],
                ['Tax regime', 'Old regime only'],
                ['Payment mode', 'Any mode except cash for premiums; cash allowed for preventive check-ups'],
                ['Counts for FY 2025-26', 'Section 80D of the Income Tax Act, 1961 (AY 2026-27)'],
                ['Equivalent in new Act', 'Section 126 of the Income-tax Act, 2025, from 1 April 2026'],
              ]}
            />
            <CalcCTA href="/calculators/section-80d-calculator" label="Work out your own 80D limit" note="Enter your age, your parents' age and the premiums you pay to see the deduction and the tax saved." />

            {/* SECTION 2 */}
            <h2 id="limits" style={hStyle}>Section 80D Deduction Limits</h2>
            <p style={pStyle}>
              The 80D limit depends on the age of the people insured, and the limit for you and the limit for your parents are counted separately. A person aged 60 or more at any time in the year is treated as a senior citizen.
            </p>
            <DataTable
              caption="Section 80D Deduction Limits by Age (FY 2025-26)"
              headers={['Who is insured', 'Self, spouse and children', 'Parents', 'Maximum']}
              rows={[
                ['You and parents all below 60', 'Rs 25,000', 'Rs 25,000', 'Rs 50,000'],
                ['You below 60, parent is a senior citizen', 'Rs 25,000', 'Rs 50,000', 'Rs 75,000'],
                ['You are a senior citizen, parents below 60', 'Rs 50,000', 'Rs 25,000', 'Rs 75,000'],
                ['You and parents are all senior citizens', 'Rs 50,000', 'Rs 50,000', 'Rs 1,00,000'],
                ['No parents covered, you below 60', 'Rs 25,000', 'Nil', 'Rs 25,000'],
                ['No parents covered, you are a senior citizen', 'Rs 50,000', 'Nil', 'Rs 50,000'],
              ]}
            />
            <p style={pStyle}>
              The Rs 5,000 for a preventive health check-up is part of these limits and not an addition to them. It is also one Rs 5,000 across you and your parents together.
            </p>

            {/* SECTION 3 */}
            <h2 id="who-can-claim" style={hStyle}>Who Can Claim Section 80D and For Whom?</h2>
            <p style={pStyle}>
              Only an individual or a HUF can claim Section 80D, and the cover must be for a person the section names. You must pay the premium yourself, from your own money.
            </p>
            <DataTable
              caption="Who You Can Claim 80D For"
              headers={['Person insured', 'Claimable?', 'Note']}
              rows={[
                ['Self', 'Yes', 'Your own policy or your share of a floater'],
                ['Spouse', 'Yes', 'Whether or not the spouse earns'],
                ['Dependent children', 'Yes', 'Premium for a working, non-dependent child does not count'],
                ['Parents', 'Yes', 'Whether or not they depend on you'],
                ['Parents-in-law', 'No', 'Not named in the section'],
                ['Brother, sister, grandparents, other relatives', 'No', 'Not named in the section'],
                ['HUF member', 'Yes', 'HUF claims for any of its members, same limits'],
              ]}
            />

            {/* SECTION 4 */}
            <h2 id="eligible-payments" style={hStyle}>Which Payments Qualify and in What Mode?</h2>
            <p style={pStyle}>
              Premiums on health insurance, preventive check-ups and medical bills of uninsured senior citizens qualify, and the payment mode differs for each. Premium must be paid before the financial year ends, so a premium due but unpaid on 31 March is not claimable.
            </p>
            <DataTable
              caption="Eligible Payments Under Section 80D and Mode of Payment"
              headers={['Payment', 'Allowed Mode', 'Condition']}
              rows={[
                ['Health insurance premium', 'Any mode except cash', 'Policy from an insurer approved by IRDAI'],
                ['Contribution to CGHS or a notified scheme', 'Any mode except cash', 'Counts toward the self and family limit'],
                ['Preventive health check-up', 'Any mode, cash included', 'Up to Rs 5,000 in total, inside the limit'],
                ['Medical expenditure of a senior citizen', 'Pay by cheque, card or UPI', 'Only if no health insurance is in force for that person'],
              ]}
            />
            <p style={pStyle}>
              The <a href="https://irdai.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Insurance Regulatory and Development Authority of India</a> (IRDAI) regulates the insurers whose policies qualify. Check that the insurer holds an IRDAI licence before you buy.
            </p>

            {/* SECTION 5 */}
            <h2 id="examples" style={hStyle}>Section 80D Examples With Calculations</h2>
            <p style={pStyle}>
              These three examples show how the limits, the check-up cap and the separate allowance for parents combine. Each assumes the old regime and payment by a mode other than cash.
            </p>
            <DataTable
              caption="Example 1: Meera, 38, pays for family and a senior citizen father"
              headers={['Item', 'Amount Paid', 'Allowed']}
              rows={[
                ['Premium for self, spouse and child', 'Rs 22,000', 'Rs 22,000'],
                ['Preventive check-up for self', 'Rs 5,000', 'Rs 3,000 (balance of the Rs 25,000 limit)'],
                ['Self and family total', 'Rs 27,000', 'Rs 25,000'],
                ['Premium for father, aged 68', 'Rs 41,000', 'Rs 41,000 (limit Rs 50,000)'],
                ['Total Section 80D deduction', 'Rs 68,000', 'Rs 66,000'],
              ]}
            />
            <DataTable
              caption="Example 2: Both taxpayer and parent are senior citizens"
              headers={['Item', 'Amount Paid', 'Allowed']}
              rows={[
                ['Premium for self, aged 62, and spouse', 'Rs 48,000', 'Rs 48,000 (limit Rs 50,000)'],
                ['Premium for mother, aged 85', 'Rs 62,000', 'Rs 50,000 (limit)'],
                ['Total Section 80D deduction', 'Rs 1,10,000', 'Rs 98,000'],
              ]}
            />
            <DataTable
              caption="Example 3: Multi-year premium paid upfront"
              headers={['Item', 'Amount']}
              rows={[
                ['Two-year policy, premium paid in one go', 'Rs 30,000'],
                ['Claim in year 1', 'Rs 15,000'],
                ['Claim in year 2', 'Rs 15,000'],
              ]}
            />

            {/* SECTION 6 */}
            <h2 id="tax-saved" style={hStyle}>How Much Tax Does Section 80D Save?</h2>
            <p style={pStyle}>
              Section 80D saves your marginal tax rate multiplied by the deduction, plus 4% health and education cess. The table ignores surcharge and assumes you are in the old regime slab shown.
            </p>
            <DataTable
              caption="Tax Saved by Section 80D Deduction (old regime, including 4% cess, before surcharge)"
              headers={['Deduction Claimed', 'At 5% slab', 'At 20% slab', 'At 30% slab']}
              rows={[
                ['Rs 25,000', 'Rs 1,300', 'Rs 5,200', 'Rs 7,800'],
                ['Rs 50,000', 'Rs 2,600', 'Rs 10,400', 'Rs 15,600'],
                ['Rs 75,000', 'Rs 3,900', 'Rs 15,600', 'Rs 23,400'],
                ['Rs 1,00,000', 'Rs 5,200', 'Rs 20,800', 'Rs 31,200'],
              ]}
            />
            <p style={pStyle}>
              The <Link href="/calculators/tax-saving-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Tax Saving Calculator</Link> shows how 80D stacks with 80C and other deductions.
            </p>

            {/* SECTION 7 */}
            <h2 id="senior-citizens" style={hStyle}>Section 80D for Senior Citizens and Parents</h2>
            <p style={pStyle}>
              A senior citizen gets a Rs 50,000 limit instead of Rs 25,000, and a senior citizen with no insurance can claim medical bills instead. Buying health insurance for parents is the most common way to use the second limit.
            </p>
            <BulletList items={[
              <><strong>Insured senior citizen:</strong> premium up to Rs 50,000 is deductible, including the preventive check-up.</>,
              <><strong>Uninsured senior citizen:</strong> actual medical expenditure up to Rs 50,000 is deductible, in place of the premium.</>,
              <><strong>Parents who live separately:</strong> you can still claim, because dependence is not a condition for parents.</>,
              <><strong>Cost to plan for:</strong> premiums rise steeply with age, so policies for parents often hit the Rs 50,000 cap on their own.</>,
            ]} />

            {/* SECTION 8 */}
            <h2 id="policy-types" style={hStyle}>Which Health Policies Qualify for Section 80D?</h2>
            <p style={pStyle}>
              Any health insurance policy from an IRDAI-approved insurer qualifies, whether you buy it online or through an agent. The premium of each policy adds toward the same limit.
            </p>
            <DataTable
              caption="Policy Types and Section 80D Eligibility"
              headers={['Policy Type', 'Eligible?', 'Note']}
              rows={[
                ['Individual health policy', 'Yes', 'Covers one person'],
                ['Family floater, mediclaim policy for family', 'Yes', 'One sum insured shared by self, spouse and children'],
                ['Health insurance for parents', 'Yes', 'Separate limit of Rs 25,000 or Rs 50,000'],
                ['Senior citizen health plan', 'Yes', 'Up to Rs 50,000 for the senior citizen'],
                ['Top-up and super top-up plan', 'Yes', 'Premium adds to the same limit'],
                ['Critical illness cover (health policy)', 'Yes', 'Standalone plan from an approved insurer'],
                ['Employer group health policy', 'No', 'Premium paid by the employer is not yours'],
                ['Life insurance premium', 'No', 'Claimed under Section 80C, not 80D'],
              ]}
            />
            <p style={pStyle}>
              A mediclaim policy and a health insurance policy are the same thing for tax purposes. Compare cover, waiting periods and claim settlement record before you buy, and treat the tax deduction as a bonus, not the reason to buy.
            </p>

            {/* SECTION 9 */}
            <h2 id="not-allowed" style={hStyle}>What Does Not Qualify Under Section 80D?</h2>
            <p style={pStyle}>
              Cash premiums, premiums for non-eligible relatives and any amount your employer paid do not qualify. These are the mistakes that most often cause a claim to be reduced.
            </p>
            <BulletList items={[
              'Health insurance premium paid in cash.',
              'Premium paid for in-laws, siblings, grandparents or other relatives.',
              'Premium paid for a working child who does not depend on you.',
              'Group health premium paid by your employer, or any premium your employer reimbursed.',
              'A premium due for the year but not paid by 31 March.',
              'Medical expenses of a person who is below 60 and has no policy, apart from the preventive check-up.',
              'Expenses the insurer already covered, since the claim would be double counting.',
            ]} />

            {/* SECTION 10 */}
            <h2 id="regime" style={hStyle}>Section 80D Under the Old and New Tax Regime</h2>
            <p style={pStyle}>
              Section 80D is available only under the old tax regime, and the new regime under Section 115BAC gives no deduction for health insurance. You pick a regime each year, so the premium helps only in a year you choose the old one.
            </p>
            <p style={pStyle}>
              The <Link href="/blogs/section-115bac-new-tax-regime" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 115BAC guide</Link> explains what the new regime allows. The <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Old vs New Tax Regime Calculator</Link> tells you which one leaves you with more money after 80D, 80C and HRA.
            </p>
            <Callout>
              <strong>Check the regime before the premium.</strong> A Rs 1 lakh deduction saves at most Rs 31,200 at the 30% slab, which may be less than the new regime saves through its lower slab rates.
            </Callout>

            {/* SECTION 11 */}
            <h2 id="how-to-claim" style={hStyle}>How to Claim the Section 80D Deduction</h2>
            <p style={pStyle}>
              You claim Section 80D through your employer during the year and again in your income tax return. Keep the insurer receipts, because the Income Tax Department can ask for them later.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Choose the old regime">Compare both regimes first, since 80D has no value under the new one.</Step>
              <Step n={2} title="Pay by a mode other than cash">Pay the premium by cheque, card, net banking or UPI before 31 March.</Step>
              <Step n={3} title="Collect the proof">Keep the premium receipt or certificate from the insurer and the bill for any preventive check-up.</Step>
              <Step n={4} title="Declare it to your employer">Submit the proofs with your investment declaration so TDS is cut after the deduction.</Step>
              <Step n={5} title="Report it in the ITR">Enter the amounts under the Section 80D rows of the deductions schedule when you <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>file on the e-Filing portal</a>.</Step>
            </div>
            <p style={pStyle}>
              The <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing last date</Link> page lists the deadline that applies to your return.
            </p>

            {/* SECTION 12 */}
            <h2 id="new-act" style={hStyle}>Section 126 of the Income-tax Act, 2025</h2>
            <p style={pStyle}>
              The Income-tax Act, 2025 carries the health insurance deduction in Section 126, and it applies from 1 April 2026. Section 80D still governs income earned up to 31 March 2026, which covers returns for FY 2025-26.
            </p>
            <DataTable
              caption="Old and New Section Numbers"
              headers={['Topic', 'Income Tax Act 1961', 'Income-tax Act 2025']}
              rows={[
                ['Health insurance deduction', 'Section 80D', 'Section 126'],
                ['New tax regime', 'Section 115BAC', 'Renumbered in the new Act'],
              ]}
            />


            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 80D</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s80d-sidebar"
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
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20, flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['Self, family below 60', 'Rs 25,000'],
                ['Self, family 60+', 'Rs 50,000'],
                ['Parents below 60', 'Rs 25,000'],
                ['Parents 60+', 'Rs 50,000'],
                ['Maximum', 'Rs 1,00,000'],
                ['Preventive check-up', 'Rs 5,000 (inside limit)'],
                ['Tax regime', 'Old regime only'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                {([
                  ['/calculators/section-80d-calculator', 'Section 80D Calculator'],
                  ['/calculators/tax-saving-calculator', 'Tax Saving Calculator'],
                  ['/calculators/old-vs-new-tax-regime-calculator', 'Old vs New Regime Calculator'],
                ] as [string, string][]).map(([href, label], i) => (
                  <Link key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: i < 2 ? 8 : 0 }}>
                    <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>{label}</span>
                    <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px', flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/section-115bac-new-tax-regime', 'Section 115BAC: The New Tax Regime Explained'],
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Should You Choose'],
                ['/blogs/section-87a-rebate', 'Section 87A Rebate'],
                ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 Income Tax Act Exemptions'],
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

      <SiteFooter />

      <style>{`
        .s80d-sidebar::-webkit-scrollbar { width: 5px; }
        .s80d-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s80d-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s80d-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

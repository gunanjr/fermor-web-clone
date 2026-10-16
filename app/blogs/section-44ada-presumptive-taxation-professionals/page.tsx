import type { Metadata } from 'next';
import Link from 'next/link';
import { Children } from 'react';
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
  paleDg: '#F1F3F4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const URL_ = 'https://fermor.in/blogs/section-44ada-presumptive-taxation-professionals';
const NOW = '2026-10-14T16:14:32+05:30';

export const metadata: Metadata = {
  title: 'Section 44ADA: Presumptive Tax for Professionals, Limit, ITR-4',
  description: 'Section 44ADA taxes professionals on 50% of receipts up to Rs 75 lakh. See eligible professions, cash test, examples, audit rules, advance tax and ITR-4.',
  alternates: { canonical: URL_ },
  openGraph: {
    title: 'Section 44ADA: Presumptive Tax for Professionals, Limit, ITR-4 - Fermor',
    description: 'Who can opt for Section 44ADA, the Rs 50 lakh and Rs 75 lakh limits, how the 50% income is calculated, worked examples, audit rules and how to file.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['Section 44ADA', 'Presumptive Taxation', 'ITR-4'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 44ADA Presumptive Tax - Fermor',
    description: 'Doctors, lawyers, CAs and other professionals: pay tax on 50% of receipts with no books and no audit.',
  },
  keywords: [
    'section 44ada', 'section 44ada of income tax act', '44ada', '44ada income tax', '44ada presumptive taxation',
    'presumptive taxation for professionals', 'presumptive tax scheme for professionals', 'presumptive income 50% of gross receipts',
    '44ada limit', '44ada turnover limit', '44ada 75 lakh', '44ada eligible professions', 'professions covered under 44ada',
    '44ada itr form', 'itr 4 44ada', '44ada audit', '44ada advance tax', '44ada vs 44ad', 'section 44ad and 44ada',
    '44ada for doctors', '44ada for lawyers', '44ada for chartered accountants', '44ada for freelancers',
    '44ada with salary', '44ada new tax regime', '44ada deductions', 'section 44ada example', 'section 44ada calculation',
    'presumptive taxation 44ad 44ada 44ae',
  ],
};

const faqItems = [
  { q: 'What is Section 44ADA of the Income Tax Act?', a: "Section 44ADA is the presumptive taxation scheme for specified professionals. It lets an eligible professional declare 50% of gross receipts as taxable income, skip detailed books of account and avoid a tax audit." },
  { q: 'Who can opt for Section 44ADA?', a: "A resident individual, HUF or partnership firm other than an LLP can opt for Section 44ADA, provided the person carries on a specified profession. Non-residents, LLPs and companies cannot." },
  { q: 'Which professions are eligible under Section 44ADA?', a: "Legal, medical, engineering, architecture, accountancy, technical consultancy and interior decoration qualify, along with authorised representatives, film artists and other professions notified by the CBDT. Business income and agency or commission work fall outside the scheme." },
  { q: 'What is the turnover limit for Section 44ADA?', a: "The limit is Rs 50 lakh of gross receipts, rising to Rs 75 lakh when cash receipts are not more than 5% of the total. Above the applicable limit you cannot use Section 44ADA." },
  { q: 'What is the 5% cash condition for the Rs 75 lakh limit?', a: "Cash receipts must not exceed 5% of total gross receipts in the year, and amounts received through banking channels count as non-cash. If cash goes above 5%, the limit falls back to Rs 50 lakh." },
  { q: 'How is income calculated under Section 44ADA?', a: "Income is 50% of gross receipts, or any higher amount you choose to declare. The scheme treats every business expense, including depreciation, as already allowed within the other 50%." },
  { q: 'Can I declare less than 50% of receipts under Section 44ADA?', a: "You can declare less, but then you lose the exemption from books and audit. If your declared income is below 50% and total income exceeds the basic exemption limit, you must maintain books and get a tax audit under Section 44AB." },
  { q: 'Do I need to maintain books of account under Section 44ADA?', a: "No. If you opt for Section 44ADA and stay within the limits, you do not need to maintain books under Section 44AA. It is still sensible to keep invoices and bank statements." },
  { q: 'Is a tax audit required under Section 44ADA?', a: "No, not while you declare at least 50% income and stay within the limit. An audit under Section 44AB applies when receipts cross the limit or when you declare less than 50% and your income is above the basic exemption limit." },
  { q: 'Which ITR form applies to Section 44ADA?', a: "ITR-4 (Sugam) is the return form for a resident individual, HUF or firm using Section 44ADA with total income up to Rs 50 lakh. Firms other than LLPs use ITR-4 as well." },
  { q: 'Can I claim 80C and 80D under Section 44ADA?', a: "Yes under the old tax regime. Section 44ADA fixes your professional income, but Chapter VI-A deductions such as 80C and 80D still apply, and they are not available under the new regime." },
  { q: 'Is Section 44ADA available under the new tax regime?', a: "Yes. The presumptive scheme works under both regimes, and the new regime is the default. Only the Chapter VI-A deductions are lost when you choose the new regime." },
  { q: 'Is the standard deduction available to a 44ADA professional?', a: "No. The standard deduction applies only to salary and pension income. A professional on Section 44ADA gets no separate deduction from the 50% presumptive income." },
  { q: 'Do I pay advance tax under Section 44ADA?', a: "Yes, if your tax liability is Rs 10,000 or more. A 44ADA professional can pay the whole advance tax in one instalment on or before 15 March, which avoids interest under Section 234C." },
  { q: 'Can I opt out of Section 44ADA?', a: "Yes. Section 44ADA does not carry the five-year lock-in that applies to Section 44AD, so you can choose it year by year. Opting out means keeping books, and an audit may follow if your income is above the basic exemption limit." },
  { q: 'Can I use Section 44AD and Section 44ADA in the same year?', a: "Yes. A person with both business and professional income can apply Section 44AD to the business and Section 44ADA to the profession in the same year." },
  { q: 'What is the difference between Section 44AD and Section 44ADA?', a: "Section 44AD is for small businesses, taxes 6% or 8% of turnover and has a five-year lock-in. Section 44ADA is for professionals, taxes 50% of receipts, and has no lock-in." },
  { q: 'Is TDS deducted if I use Section 44ADA?', a: "Yes. Clients still deduct TDS on professional fees under Section 194J, and you claim that TDS as credit against your tax. The credit shows in Form 26AS and the Annual Information Statement." },
  { q: 'Can a freelancer or content creator use Section 44ADA?', a: "Only if the work falls within a specified profession, such as technical consultancy or architecture. Other freelancers may qualify for Section 44AD instead, so check the nature of the work with your CA." },
  { q: 'Can a doctor with a salary also use Section 44ADA?', a: "Yes. Salary is taxed under the salary head as usual, and private practice receipts can be taxed under Section 44ADA. Both go into the same return." },
  { q: 'Where is the presumptive scheme for professionals in the Income-tax Act 2025?', a: "The Income-tax Act, 2025 carries the scheme forward from 1 April 2026. Section 44ADA of the 1961 Act still governs income earned up to 31 March 2026, which covers returns for FY 2025-26." },
  { q: 'What is Fermor?', a: "Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it." },
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
  headline: 'Section 44ADA: Presumptive Taxation for Professionals, Eligibility, Limit and ITR-4',
  url: URL_,
  datePublished: NOW,
  dateModified: NOW,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': URL_ },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Section 44ADA', description: 'The presumptive taxation scheme under which specified professionals declare 50% of gross receipts as income and are exempt from maintaining books and a tax audit within the prescribed limits' },
    { '@type': 'Thing', name: 'Presumptive taxation in India', description: 'Simplified tax schemes under Sections 44AD, 44ADA and 44AE that presume a share of turnover as taxable income' },
  ],
  keywords: 'section 44ada, presumptive taxation for professionals, 44ada limit, 44ada eligible professions, itr 4, 44ada vs 44ad',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 44ADA Presumptive Taxation', item: URL_ },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Opt for Section 44ADA Presumptive Taxation',
  description: 'Steps for a professional to compute income and file the return under Section 44ADA.',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check eligibility', text: 'Confirm you are a resident individual, HUF or non-LLP firm in a specified profession.' },
    { '@type': 'HowToStep', position: 2, name: 'Test the limit', text: 'Gross receipts must be within Rs 50 lakh, or Rs 75 lakh when cash receipts are 5% or less.' },
    { '@type': 'HowToStep', position: 3, name: 'Compute presumptive income', text: 'Take 50% of gross receipts, or a higher figure if you choose to declare more.' },
    { '@type': 'HowToStep', position: 4, name: 'Pay advance tax', text: 'Pay the full advance tax in one instalment on or before 15 March if liability is Rs 10,000 or more.' },
    { '@type': 'HowToStep', position: 5, name: 'File ITR-4', text: 'Report gross receipts and presumptive income in ITR-4 and claim TDS credit.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL_,
  name: 'Section 44ADA: Presumptive Tax for Professionals, Limit, ITR-4 - Fermor',
  url: URL_,
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Income tax in India',
    description: 'The tax levied by the Government of India on the income of individuals, HUFs and firms under the Income Tax Act, including presumptive schemes such as Section 44ADA that assume income as a share of gross receipts.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Income_tax_in_India',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian doctors, lawyers, chartered accountants, architects, consultants and other self-employed professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'What Is Section 44ADA' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Who Can Opt' },
    { '@type': 'WebPageElement', cssSelector: '#professions', name: 'Eligible Professions' },
    { '@type': 'WebPageElement', cssSelector: '#limits', name: 'Turnover Limit and Cash Test' },
    { '@type': 'WebPageElement', cssSelector: '#calculation', name: 'How Income Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#vs-44ad', name: 'Section 44AD vs 44ADA' },
    { '@type': 'WebPageElement', cssSelector: '#deductions', name: 'Deductions and Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#audit', name: 'Books and Audit' },
    { '@type': 'WebPageElement', cssSelector: '#advance-tax', name: 'Advance Tax' },
    { '@type': 'WebPageElement', cssSelector: '#filing', name: 'ITR-4 Filing and TDS' },
    { '@type': 'WebPageElement', cssSelector: '#opt-out', name: 'Opting Out' },
    { '@type': 'WebPageElement', cssSelector: '#new-act', name: 'Income-tax Act 2025' },
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
  knowsAbout: ['Section 44ADA', 'Presumptive Taxation India', 'Income Tax for Professionals', 'ITR-4', 'Personal Finance India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const linkStyle: React.CSSProperties = { color: C.dg, fontWeight: 600 };

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
      <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: C.dg, color: '#fff', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{n}</div>
      <div style={{ paddingTop: 3, fontFamily: INTER }}>
        {title && <p style={{ fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{title}</p>}
        <p style={{ fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{children}</p>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

/** Keeps hyphenated codes (GSTR-9A, FY 2019-20) and "Rs 5 crore" amounts on one line, and stops a table cell ending on a one-word orphan. */
function nb(text: string, glue = true): React.ReactNode {
  const tidy = text.replace(/\bRs (?=\d)/g, 'Rs\u00A0');
  const joined = glue ? tidy.replace(/ (\S+)$/, '\u00A0$1') : tidy;
  return joined.split(/(\S+-\S+)/g).map((part, i) =>
    i % 2 ? <span key={i} style={{ whiteSpace: 'nowrap' }}>{part}</span> : part
  );
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const kids = Children.map(children, c => (typeof c === 'string' ? nb(c, false) : c));
  return <p style={{ ...pStyle, ...style }}>{kids}</p>;
}

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 20 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 6, captionSide: 'top', paddingBottom: 6 }}>{caption}</caption>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} scope="col" style={{ ...thStyle, borderRight: i < headers.length - 1 ? `1px solid ${C.border}` : 'none', whiteSpace: h.length <= 16 ? 'nowrap' : 'normal' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none', whiteSpace: typeof cell === 'string' && cell.length <= 24 ? 'nowrap' : 'normal' }}>{typeof cell === 'string' ? nb(cell) : cell}</td>
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
    <div style={{ background: '#F4F5F6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
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


const TOC_ITEMS = [
  { id: 'overview', label: 'What Is Section 44ADA' },
  { id: 'eligibility', label: 'Who Can Opt' },
  { id: 'professions', label: 'Eligible Professions' },
  { id: 'limits', label: 'Limit and Cash Test' },
  { id: 'calculation', label: 'How Income Is Calculated' },
  { id: 'examples', label: 'Worked Examples' },
  { id: 'vs-44ad', label: 'Section 44AD vs 44ADA' },
  { id: 'deductions', label: 'Deductions, Tax Regime' },
  { id: 'audit', label: 'Books and Audit' },
  { id: 'advance-tax', label: 'Advance Tax' },
  { id: 'filing', label: 'ITR-4 and TDS' },
  { id: 'opt-out', label: 'Opting Out' },
  { id: 'new-act', label: 'Income-tax Act 2025' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Limits and conditions reflect the Income Tax Act, 1961 for FY 2025-26, and the worked examples are illustrations that assume no other income. Rules change with each Finance Act, so confirm the current position on the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax e-Filing portal</a> or with a qualified Chartered Accountant before opting in. This page is general information and not tax advice.
      </p>
    </div>
  );
}

export default function Section44ADAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 44ADA Presumptive Taxation</li>
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
            <time dateTime={NOW} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 14, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Section 44ADA: Presumptive Taxation for Professionals, Eligibility, Limit and ITR-4
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 44ADA lets a specified professional declare 50% of gross receipts as taxable income, with no books of account and no tax audit. The limit is Rs 50 lakh of receipts, or Rs 75 lakh when cash receipts are 5% or less.
            </p>
            <P style={{ fontSize: 16.5 }}>
              Below: who qualifies, the professions covered, the cash test, three worked examples, audit rules, advance tax and how to file in ITR-4.
            </P>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>What Is Section 44ADA of the Income Tax Act?</h2>
            <P>
              Section 44ADA is the presumptive taxation scheme in the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Act, 1961</a> for professionals who earn fees rather than run a trading business. It presumes your income at 50% of gross receipts, so you do not compute profit from books.
            </P>
            <P>
              The other 50% is treated as spent on running the practice, including rent, staff, travel and depreciation. You cannot claim those costs separately.
            </P>
            <DataTable
              caption="Section 44ADA at a Glance (FY 2025-26)"
              headers={['Particulars', 'Details']}
              rows={[
                ['Who can opt', 'Resident individual, HUF or partnership firm other than an LLP'],
                ['Who it is for', 'Specified professions such as legal, medical, engineering, architecture and accountancy'],
                ['Presumed income', '50% of gross receipts, or a higher figure if you declare more'],
                ['Receipts limit', 'Rs 50 lakh, or Rs 75 lakh if cash receipts are 5% or less'],
                ['Books and audit', 'Not required while you stay within the scheme'],
                ['Return form', 'ITR-4 (Sugam), if total income is up to Rs 50 lakh'],
                ['Advance tax', 'One instalment on or before 15 March'],
                ['Lock-in', 'None, unlike Section 44AD'],
              ]}
            />
            <CalcCTA href="/calculators/income-tax-calculator" label="See your tax on 50% presumptive income" note="Enter your presumed income and compare the old and new regime in the Income Tax Calculator." />

            {/* SECTION 2 */}
            <h2 id="eligibility" style={hStyle}>Who Can Opt for Section 44ADA?</h2>
            <P>
              A resident individual, a Hindu Undivided Family or a partnership firm can opt for Section 44ADA. Limited Liability Partnerships, companies and non-residents cannot.
            </P>
            <DataTable
              caption="Eligibility Under Section 44ADA"
              headers={['Taxpayer', 'Eligible?', 'Note']}
              rows={[
                ['Resident individual', 'Yes', 'In a specified profession'],
                ['Hindu Undivided Family', 'Yes', 'In a specified profession'],
                ['Partnership firm', 'Yes', 'LLPs are excluded'],
                ['Limited Liability Partnership', 'No', 'Must keep books'],
                ['Company', 'No', 'Not covered'],
                ['Non-resident', 'No', 'Only residents can opt'],
              ]}
            />

            {/* SECTION 3 */}
            <h2 id="professions" style={hStyle}>Which Professions Are Eligible Under Section 44ADA?</h2>
            <P>
              Legal, medical, engineering, architecture, accountancy, technical consultancy and interior decoration are covered, along with authorised representatives and film artists. The CBDT can notify more professions.
            </P>
            <DataTable
              caption="Professions Covered by Section 44ADA"
              headers={['Profession', 'Examples']}
              rows={[
                ['Legal', 'Advocates and legal consultants'],
                ['Medical', 'Doctors, dentists and other practitioners'],
                ['Engineering', 'Consulting and practising engineers'],
                ['Architecture', 'Architects and designers of buildings'],
                ['Accountancy', 'Chartered accountants and accountants'],
                ['Technical consultancy', 'Consultants giving technical advice'],
                ['Interior decoration', 'Interior designers and decorators'],
                ['Film artists', 'Actors, directors, editors, singers and writers'],
                ['Authorised representatives', 'People who represent others before a tribunal for a fee'],
              ]}
            />
            <P>
              Trading, commission and agency income is business income and does not qualify. A freelancer outside these professions may fit Section 44AD instead.
            </P>

            {/* SECTION 4 */}
            <h2 id="limits" style={hStyle}>Section 44ADA Turnover Limit and the 5% Cash Test</h2>
            <P>
              The limit is Rs 50 lakh of gross receipts, and it rises to Rs 75 lakh when cash receipts are not more than 5% of the total. The Rs 75 lakh limit applies from FY 2023-24.
            </P>
            <DataTable
              caption="Section 44ADA Limit by Cash Receipts"
              headers={['Cash Receipts', 'Gross Receipts Limit']}
              rows={[
                ['5% or less of total receipts', 'Rs 75 lakh'],
                ['More than 5% of total receipts', 'Rs 50 lakh'],
              ]}
            />
            <P>
              Amounts you receive through banking channels, such as an account payee cheque, bank transfer or UPI, count as non-cash. Track the cash share before the year ends, because one large cash fee can pull you down to the Rs 50 lakh limit.
            </P>

            {/* SECTION 5 */}
            <h2 id="calculation" style={hStyle}>How Income Is Calculated Under Section 44ADA</h2>
            <P>
              Taxable professional income is 50% of gross receipts, or a higher amount if you choose to declare more. Tax then applies at your slab rate.
            </P>
            <div style={{ background: '#F4F5F6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', marginBottom: 20, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13.5, color: C.dark, overflowX: 'auto' }}>
              Presumptive income = Gross receipts x 50%
            </div>
            <P>
              Depreciation is treated as already allowed, so the written down value of your assets is reduced as if you had claimed it. Interest on a practice loan and salaries to staff cannot be claimed on top.
            </P>

            {/* SECTION 6 */}
            <h2 id="examples" style={hStyle}>Section 44ADA Examples With Tax Calculation</h2>
            <P>
              These examples compare tax on presumptive income with tax on actual profit under the new regime, including 4% cess, with no other income and no Chapter VI-A deductions.
            </P>
            <DataTable
              caption="Example 1: Interior designer with Rs 30 lakh receipts"
              headers={['Particulars', 'Normal Books', 'Section 44ADA']}
              rows={[
                ['Gross receipts', 'Rs 30,00,000', 'Rs 30,00,000'],
                ['Actual expenses', 'Rs 10,00,000', 'Not claimed'],
                ['Taxable income', 'Rs 20,00,000', 'Rs 15,00,000'],
                ['Tax with 4% cess', 'Rs 2,08,000', 'Rs 1,09,200'],
                ['Tax saved', 'Nil', 'Rs 98,800'],
              ]}
            />
            <DataTable
              caption="Example 2: Doctor with Rs 55 lakh receipts and Rs 2.5 lakh in cash"
              headers={['Particulars', 'Normal Books', 'Section 44ADA']}
              rows={[
                ['Gross receipts', 'Rs 55,00,000', 'Rs 55,00,000'],
                ['Cash receipts', 'Rs 2,50,000', 'Rs 2,50,000 (4.5%)'],
                ['Actual expenses', 'Rs 9,00,000', 'Not claimed'],
                ['Taxable income', 'Rs 46,00,000', 'Rs 27,50,000'],
                ['Tax with 4% cess', 'Rs 9,98,400', 'Rs 4,21,200'],
                ['Tax saved', 'Nil', 'Rs 5,77,200'],
              ]}
            />
            <P>
              Cash of Rs 2,50,000 is 4.5% of Rs 55 lakh, so the Rs 75 lakh limit applies and the doctor qualifies.
            </P>
            <DataTable
              caption="Example 3: Consultant who fails the cash test"
              headers={['Particulars', 'Amount']}
              rows={[
                ['Gross receipts', 'Rs 60,00,000'],
                ['Cash receipts', 'Rs 4,00,000 (6.7%)'],
                ['Applicable limit', 'Rs 50 lakh'],
                ['Section 44ADA available?', 'No'],
                ['What applies instead', 'Books of account and a tax audit'],
              ]}
            />
            <P>
              The scheme saves most when your real costs are well below half of your receipts. If your costs run above 50%, declaring less than 50% brings back the books and audit.
            </P>

            {/* SECTION 7 */}
            <h2 id="vs-44ad" style={hStyle}>Section 44AD vs Section 44ADA</h2>
            <P>
              Section 44AD covers small businesses and Section 44ADA covers professionals, and they presume income at very different rates. Pick the one that matches the nature of your work.
            </P>
            <DataTable
              caption="Section 44AD vs Section 44ADA"
              headers={['Basis', 'Section 44AD', 'Section 44ADA']}
              rows={[
                ['Meant for', 'Small businesses', 'Specified professionals'],
                ['Presumed income', '6% digital, 8% other', '50% of receipts'],
                ['Receipts limit', 'Rs 2 crore or Rs 3 crore', 'Rs 50 lakh or Rs 75 lakh'],
                ['Cash condition', '5% or less for higher limit', '5% or less for higher limit'],
                ['Lock-in on opting out', 'Five years', 'None'],
                ['Return form', 'ITR-4', 'ITR-4'],
                ['Advance tax', 'One instalment by 15 March', 'One instalment by 15 March'],
              ]}
            />
            <P>
              A person with both business and professional income can use Section 44AD for the business and Section 44ADA for the profession in the same year.
            </P>

            {/* SECTION 8 */}
            <h2 id="deductions" style={hStyle}>Deductions and Tax Regime Under Section 44ADA</h2>
            <P>
              Section 44ADA works under both tax regimes, and the new regime is the default. Deductions under 80C, 80D and similar sections are available only if you choose the old regime.
            </P>
            <BulletList items={[
              <><strong>Business expenses:</strong> not claimable, because the 50% presumption already covers them.</>,
              <><strong>Chapter VI-A deductions:</strong> 80C and 80D apply under the old regime only.</>,
              <><strong>Standard deduction:</strong> not available, since it applies only to salary and pension.</>,
              <><strong>Rebate:</strong> the Section 87A rebate can apply if your total income is within the limit.</>,
            ]} />
            <P>
              The <Link href="/blogs/section-80d-health-insurance-deduction" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 80D guide</Link> explains the health insurance deduction, and the <Link href="/blogs/old-vs-new-tax-regime" target="_blank" rel="noopener noreferrer" style={linkStyle}>old vs new regime comparison</Link> helps you pick a regime.
            </P>

            {/* SECTION 9 */}
            <h2 id="audit" style={hStyle}>Books of Account and Tax Audit Under Section 44ADA</h2>
            <P>
              You need no books under Section 44AA and no tax audit under Section 44AB while you stay within the scheme. Both come back if you declare less than 50% or cross the limit.
            </P>
            <DataTable
              caption="When Books and Audit Apply"
              headers={['Situation', 'Books and Audit?']}
              rows={[
                ['50% or more declared, receipts within limit', 'Not required'],
                ['Receipts above the applicable limit', 'Required'],
                ['Less than 50% declared, income above the basic exemption limit', 'Required'],
                ['Less than 50% declared, income below the basic exemption limit', 'Books may still apply'],
              ]}
            />
            <P>
              Keep invoices, bank statements and a simple receipts register even though the law does not ask for books. They answer a notice faster than memory does.
            </P>

            {/* SECTION 10 */}
            <h2 id="advance-tax" style={hStyle}>Advance Tax Under Section 44ADA</h2>
            <P>
              A 44ADA professional with tax liability of Rs 10,000 or more must pay advance tax, and can pay the whole amount in one instalment on or before 15 March. Paying by that date avoids interest under Section 234C.
            </P>
            <P>
              Interest under Section 234B can still apply if the advance tax paid by 31 March is less than 90% of the assessed tax. The <Link href="/calculators/advance-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Advance Tax Calculator</Link> shows the amount and the interest.
            </P>

            {/* SECTION 11 */}
            <h2 id="filing" style={hStyle}>ITR-4 Filing and TDS Credit</h2>
            <P>
              Professionals on Section 44ADA file ITR-4 (Sugam) when total income is up to Rs 50 lakh. The form asks for gross receipts and presumptive income under the professional income schedule.
            </P>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Total your gross receipts">Add every fee received in the year, including amounts received by bank transfer and cash.</Step>
              <Step n={2} title="Run the limit test">Check receipts against Rs 50 lakh, or Rs 75 lakh when cash is 5% or less.</Step>
              <Step n={3} title="Compute 50% income">Take 50% of gross receipts, or a higher figure if you choose.</Step>
              <Step n={4} title="Pay advance tax by 15 March">Pay the full amount in one instalment if liability is Rs 10,000 or more.</Step>
              <Step n={5} title="File ITR-4">Report receipts and income, claim TDS credit, and <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>file on the e-Filing portal</a>.</Step>
            </div>
            <P>
              Clients deduct TDS on professional fees under <Link href="/blogs/section-194j-tds-professional-fees" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 194J</Link>, and you claim that TDS as credit. The <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing last date</Link> page lists the due date for your category.
            </P>

            {/* SECTION 12 */}
            <h2 id="opt-out" style={hStyle}>Can You Opt Out of Section 44ADA?</h2>
            <P>
              Yes, and Section 44ADA has no five-year lock-in. You can choose it one year and keep books the next.
            </P>
            <P>
              The catch is the audit rule. If you opt out and declare less than 50% while your income is above the basic exemption limit, books and a tax audit follow.
            </P>

            {/* SECTION 13 */}
            <h2 id="new-act" style={hStyle}>Section 44ADA Under the Income-tax Act, 2025</h2>
            <P>
              The Income-tax Act, 2025 carries the presumptive scheme for professionals forward from 1 April 2026. Section 44ADA of the 1961 Act still governs income earned up to 31 March 2026.
            </P>
            <P>
              That means returns for FY 2025-26 are filed under Section 44ADA, and the rules in this guide apply to them. Check the new Act on the Income Tax Department website before you plan for FY 2026-27.
            </P>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 44ADA</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s44ada-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Section 44ADA at a Glance</div>
              {([
                ['Presumed income', '50% of receipts'],
                ['Receipts limit', 'Rs 50 lakh'],
                ['Limit if cash is 5% or less', 'Rs 75 lakh'],
                ['Books and audit', 'Not required'],
                ['Return form', 'ITR-4'],
                ['Advance tax', 'By 15 March'],
                ['Lock-in', 'None'],
                ['Not eligible', 'LLPs, companies'],
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
                  ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
                  ['/calculators/advance-tax-calculator', 'Advance Tax Calculator'],
                  ['/calculators/tds-calculator', 'TDS Calculator'],
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
                ['/blogs/section-194j-tds-professional-fees', 'Section 194J: TDS on Professional Fees'],
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date'],
                ['/blogs/section-87a-rebate', 'Section 87A Rebate'],
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
        .s44ada-sidebar::-webkit-scrollbar { width: 5px; }
        .s44ada-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s44ada-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s44ada-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        .toc-link:hover { background: #F4F5F6; color: #101214; }
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

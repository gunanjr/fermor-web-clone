import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

const SLUG = 'section-194c-tds-on-contractors';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const TITLE = 'Section 194C TDS on Contractors: Rate, Limit, Due Date and Examples';
const PUBLISHED = '2026-10-09T11:28:42+05:30';
const MODIFIED = '2026-10-09T11:28:42+05:30';

export const metadata: Metadata = {
  title: 'Section 194C TDS on Contractors: Rate, Limit & Due Date (2026)',
  description:
    'Section 194C TDS on payments to contractors explained: the 1% and 2% rates, the Rs 30,000 single-payment and Rs 1 lakh aggregate limits, who must deduct, what counts as "work", composite contracts, deposit due dates and Section 271B-style consequences for non-compliance.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Section 194C TDS on Contractors: Rate, Limit, Due Date and Examples',
    description:
      'Who must deduct TDS under Section 194C, the 1%/2% rates, the Rs 30,000 and Rs 1,00,000 thresholds, exemptions, composite contract rules, deposit and return due dates, with worked examples.',
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Fermor Analysis'],
    tags: ['Section 194C', 'TDS on Contractors', 'Form 26Q', 'TDS India', 'Income Tax India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 194C TDS on Contractors: Rate, Limit and Due Date',
    description: 'Full Section 194C guide: TDS rate, thresholds, exemptions, composite contracts and due dates.',
  },
  keywords: [
    'section 194c', '194c', 'section 194', '194c income tax', 'section 194c of income tax act',
    'tds on contractor', 'tds on contractor payment', 'section 194c tds rate', '194c tds rate',
    'section 194c limit', 'tds on contractor limit', 'section 194c threshold', '194c threshold limit',
    'tds on payment to contractor', 'tds on works contract', 'tds on sub contractor',
    'section 194c applicability', 'who deducts tds under 194c', 'tds rate for contractors',
    'tds on contractor 1%', 'tds on contractor 2%', 'section 194c exemption',
    'section 194c rs 30000 limit', 'section 194c 1 lakh limit', 'form 26q', 'tds return 194c',
    'tds certificate form 16a', 'tds on composite contract', 'tds on manpower supply',
    'tds on catering services', 'tds on advertising services', 'tds on transportation of goods',
    'tds deposit due date', 'tds on goods carriage 44ae', 'contractor pan not available tds rate',
    'difference between 194c and 194j', 'section 194c vs 194j', 'section 194c vs 194i',
    'tds on construction contract', 'tds on home construction contractor', '194c tds calculation',
    'section 194c meaning', 'what is section 194c', 'section 194c sub contractor',
    'tds on labour contract', 'section 194c penalty', 'tds non deduction consequences',
  ],
};

const faqItems = [
  { q: 'What is Section 194C of the Income Tax Act?', a: 'Section 194C requires any specified person, such as a company, government body, firm, or an individual or HUF whose turnover crosses the prescribed limit, to deduct TDS when paying a resident contractor or sub-contractor for carrying out work under a contract, including the supply of labour. TDS must be deducted at the time of credit to the contractor\'s account or payment, whichever is earlier.' },
  { q: 'What is the TDS rate under Section 194C?', a: 'TDS is deducted at 1% when payment is made to a resident individual or HUF contractor, and at 2% when payment is made to any other resident person, such as a company, firm or LLP. If the contractor does not provide a valid PAN, TDS is deducted at 20% regardless of the actual contract value.' },
  { q: 'What is the threshold limit for TDS under Section 194C?', a: 'No TDS is required if a single payment under a contract does not exceed Rs 30,000. Even if every individual payment stays under Rs 30,000, TDS becomes applicable once the aggregate of all payments to that contractor during the financial year exceeds Rs 1,00,000, and in that case TDS applies to the full aggregate amount, not just the portion above the limit.' },
  { q: 'When should TDS under Section 194C be deducted?', a: 'TDS must be deducted at the earlier of two events: the time the amount is credited to the contractor\'s account in the payer\'s books, or the time of actual payment, whether in cash, by cheque, or by any other mode. If the amount is credited to a suspense account instead of the contractor\'s account, it is still treated as credited to the contractor for this purpose, and TDS applies.' },
  { q: 'What is considered "work" under Section 194C?', a: 'Work under Section 194C includes advertising, broadcasting and telecasting (including production of programmes), carriage of goods or passengers by any mode other than railways, catering, and manufacturing or supplying a product as per a customer\'s specification using material purchased from that customer. Pure labour supply contracts for any of these purposes are also covered. Manufacturing using material purchased from someone other than the customer is excluded.' },
  { q: 'Are sub-contractors covered under Section 194C?', a: 'Yes. The definition of "contract" under Section 194C explicitly includes sub-contracts. When a main contractor engages a sub-contractor to carry out all or part of the work, the main contractor must deduct TDS on payments to the sub-contractor in the same way the original payer deducted TDS on payments to the main contractor, creating a cascading TDS obligation through the contracting chain.' },
  { q: 'Who is required to deduct TDS under Section 194C?', a: 'The Central or State Government, local authorities, statutory corporations, companies, co-operative societies, trusts, universities, firms, registered societies, and foreign governments or enterprises are all required to deduct TDS under Section 194C. Individuals, HUFs, AOPs or BOIs are also covered, but only if their business turnover exceeded Rs 1 crore or professional gross receipts exceeded Rs 50 lakh in the immediately preceding financial year.' },
  { q: 'Is TDS deductible if an individual builds or renovates their own house?', a: 'No. Section 194C specifically exempts individuals and HUFs from deducting TDS when the payment to a contractor is made exclusively for personal purposes, such as constructing or renovating their own residence. This exemption applies even if the individual separately runs a business or profession, as long as the specific payment is for personal, non-business use.' },
  { q: 'What happens if a contractor does not provide their PAN?', a: 'If the contractor does not furnish a valid PAN, the payer must deduct TDS at 20% instead of the standard 1% (individual or HUF) or 2% (other persons) under Section 206AA. This higher rate applies regardless of the actual contract value, which makes PAN verification an essential first step before releasing any contractor payment.' },
  { q: 'Does Section 194C apply to goods transport contractors?', a: 'TDS under Section 194C does not apply to payments to a contractor in the business of plying, hiring or leasing goods carriages if that contractor owns 10 or fewer goods carriages at any time during the previous year and is eligible for presumptive taxation under Section 44AE. The contractor must furnish a declaration to this effect along with their PAN to the person making the payment.' },
  { q: 'How is TDS calculated on a composite contract with materials and labour?', a: 'If the contract invoice separately states the value of materials, TDS applies only to the labour or service component, excluding the material value. If the invoice does not separately mention the material value, TDS is deducted on the entire invoice amount, including materials. This is why a clear, itemised invoice from the contractor materially affects the TDS the payer must deduct.' },
  { q: 'Is TDS under Section 194C deducted on the GST component of an invoice?', a: 'No. TDS under Section 194C is deducted on the contract value excluding GST, provided the GST amount is shown separately in the invoice, following CBDT Circular No. 23/2017. If GST is not separately indicated on the invoice, TDS may need to be calculated on the gross invoice amount including GST, so contractor invoices should always bifurcate the service value and the GST component.' },
  { q: 'What is the due date for depositing TDS under Section 194C?', a: 'Where the payer is the government or a person paying on behalf of the government, TDS must be deposited on the same day. For all other payers, TDS deducted in any month other than March must be deposited within 7 days from the end of that month, while TDS deducted in March must be deposited by 30th April of the following financial year.' },
  { q: 'What is the due date for filing the TDS return under Section 194C?', a: 'TDS deducted under Section 194C is reported quarterly in Form 26Q. The due dates are 31st July for the April-June quarter, 31st October for July-September, 31st January for October-December, and 30th April for January-March. Form 16A, the TDS certificate for the deductee, is issued within 15 days of each quarterly return\'s due date.' },
  { q: 'What is the difference between Section 194C and Section 194J?', a: 'Section 194C covers payments for "work" under a contract, such as construction, advertising, catering, transportation and labour supply, at 1% or 2%. Section 194J covers payments for professional or technical services, such as legal, medical, engineering, architectural or consultancy fees, at a different rate. Payments to a manpower recruitment agency, for instance, generally fall under Section 194J rather than 194C, since the agency is providing a professional placement service rather than carrying out work itself.' },
  { q: 'What is the difference between Section 194C and Section 194I?', a: 'Section 194C applies to payments for carrying out work under a contract, while Section 194I applies specifically to rent paid for the use of land, building, plant, machinery, furniture or fittings. A common point of confusion is a tenant paying for maintenance along with rent; if these are genuinely separate services under separate agreements, 194C may apply to the maintenance charges while 194I applies to the rent itself.' },
  { q: 'What are the consequences of not deducting or depositing TDS under Section 194C?', a: 'Failure to deduct or deposit TDS within the prescribed timeframe attracts interest at 1% per month (for non-deduction) or 1.5% per month (for deduction but late deposit), calculated from the date the tax was deductible or deducted until it is actually paid. Disallowance of the expense under Section 40(a)(ia) and penalties ranging from Rs 10,000 to Rs 1,00,000 can also apply, along with potential prosecution in serious cases.' },
  { q: 'Can TDS be deducted at a lower rate or nil rate under Section 194C?', a: 'Yes. If the Assessing Officer is satisfied that the contractor\'s total income justifies a lower TDS rate or no deduction at all, the officer can issue a lower or nil deduction certificate under Section 197. The contractor furnishes this certificate to the payer, who then deducts TDS at the rate specified in the certificate instead of the standard 1% or 2%.' },
  { q: 'Does Section 194C apply to payments to travel agents or airlines?', a: 'No, under a CBDT clarification, payments made by passengers to travel agents or airlines for purchasing tickets in the normal course are not subject to TDS under Section 194C. However, if a bus, aircraft or other mode of transport is specifically chartered for exclusive use, TDS under Section 194C does apply to that chartered hiring payment.' },
  { q: 'Is TDS applicable on courier charges and restaurant catering?', a: 'Courier payments are liable to TDS under Section 194C since they involve the carriage of goods. Payment for serving food in a restaurant during the normal course of business, however, is not subject to TDS under this section, while catering services supplied under a specific contract, such as for an event or office cafeteria, are covered.' },
  { q: 'Is a written contract mandatory for Section 194C to apply?', a: 'No. Section 194C does not require a written contract. Even a verbal agreement between the payer and the contractor triggers the TDS obligation once the payment or credit conditions are met. A written contract makes compliance easier to document, but its absence does not exempt the payer from deducting TDS.' },
  { q: 'What is the upcoming change to Section 194C under Budget 2026?', a: 'Budget 2026 proposes to formally classify manpower supply services under the "works contract" definition within Section 194C, confirming that payments to manpower supply agencies attract TDS at 1% for individual and HUF payees and 2% for others, rather than being treated under Section 194J. This change is proposed to take effect from the upcoming tax year.' },
  { q: 'How does Section 194C apply to a builder or developer versus an individual homeowner?', a: 'An individual building or renovating a personal residence is generally exempt from deducting TDS on contractor payments, since Section 194C excludes personal, non-business payments by individuals and HUFs. A builder, developer, company or large-turnover individual engaging contractors for a construction project meant for business or sale must deduct TDS under Section 194C in full, including the cascading obligation on any sub-contractors engaged for the project.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for Indian taxpayers, offering free calculators for income tax, loans, investments and insurance, and tools to help you understand and act on your financial decisions with clarity.' },
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description:
    'Complete guide to Section 194C TDS on payments to contractors: who must deduct, the 1% and 2% rates, the Rs 30,000 and Rs 1,00,000 thresholds, what counts as "work", sub-contractor obligations, composite contract and GST treatment, deposit and Form 26Q return due dates, and the consequences of non-compliance.',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Section 194C of the Income Tax Act, 1961', description: 'TDS provision for payments made to resident contractors and sub-contractors for carrying out work' },
    { '@type': 'Thing', name: 'Form 26Q', description: 'Quarterly TDS return for non-salary payments, including Section 194C deductions' },
    { '@type': 'Thing', name: 'Form 16A', description: 'TDS certificate issued to the deductee for non-salary TDS deductions' },
  ],
  keywords: 'section 194c, 194c, tds on contractor, section 194c tds rate, section 194c limit, form 26q, tds on works contract, section 194c of income tax act',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 194C TDS on Contractors', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Deduct and Deposit TDS Under Section 194C',
  description: 'Steps to check applicability, deduct the correct rate, deposit TDS and file the return for contractor payments under Section 194C',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check applicability and PAN', text: 'Confirm the payer is a specified person, the payment is for "work", and collect the contractor\'s valid PAN before release of payment.' },
    { '@type': 'HowToStep', position: 2, name: 'Check the threshold', text: 'Deduct TDS if a single payment exceeds Rs 30,000, or if aggregate payments to that contractor in the financial year exceed Rs 1,00,000.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply the correct rate', text: 'Deduct 1% for individual or HUF contractors, 2% for other persons, or 20% if PAN is not available.' },
    { '@type': 'HowToStep', position: 4, name: 'Deposit TDS', text: 'Deposit the deducted amount by the 7th of the following month (30th April for March deductions), or the same day for government payers.' },
    { '@type': 'HowToStep', position: 5, name: 'File Form 26Q and issue Form 16A', text: 'File the quarterly TDS return in Form 26Q and issue Form 16A to the contractor within the prescribed due dates.' },
  ],
};

const TOC_ITEMS = [
  { id: 'what-is-194c', label: 'What is Section 194C?' },
  { id: 'who-deducts', label: 'Who must deduct TDS' },
  { id: 'what-is-work', label: 'What counts as "work"' },
  { id: 'sub-contractors', label: 'Sub-contractors' },
  { id: 'rate-limit', label: 'TDS rate and threshold' },
  { id: 'when-deduct', label: 'When to deduct' },
  { id: 'exemptions', label: 'When TDS is not deductible' },
  { id: 'worked-examples', label: 'Worked examples' },
  { id: 'composite-gst', label: 'Composite contracts and GST' },
  { id: 'due-dates', label: 'Deposit and return due dates' },
  { id: '194c-vs-others', label: '194C vs 194J vs 194I' },
  { id: 'home-construction', label: 'Home construction contracts' },
  { id: 'consequences', label: 'Consequences of non-compliance' },
  { id: 'mistakes', label: 'Common mistakes' },
  { id: 'faq', label: 'FAQs' },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: TITLE,
  url: PAGE_URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'TDS on Contractors',
      alternateName: 'Section 194C',
      description: 'Tax deducted at source on payments made to resident contractors and sub-contractors for carrying out work under a contract, under Section 194C of the Income Tax Act, 1961.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Form 26Q',
      description: 'The quarterly TDS return filed for non-salary deductions, including those made under Section 194C.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: { '@type': 'Audience', audienceType: 'Businesses, contractors, developers and taxpayers in India', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    ...TOC_ITEMS.map(t => ({ '@type': 'WebPageElement', cssSelector: `#${t.id}`, name: t.label })),
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
  knowsAbout: [
    'Income Tax India',
    'TDS on Contractors',
    'Section 194C',
    'Form 26Q',
    'Chartered Accountant Compliance',
    'Income-tax Act 2025',
    'Personal Finance India',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const C = {
  dark: '#111111',
  dg: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  green: '#166534',
  paleDg: '#f1f3f4',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em', scrollMarginTop: 80 } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;
const linkStyle = { color: C.dg, fontWeight: 600 } as React.CSSProperties;

const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, verticalAlign: 'middle' } as React.CSSProperties;
const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'left', lineHeight: 1.55 } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'right', lineHeight: 1.55 } as React.CSSProperties;

type Col = { label: string; num?: boolean };

function DataTable({ caption, cols, rows, minWidth = 520 }: { caption: string; cols: Col[]; rows: React.ReactNode[][]; minWidth?: number }) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0', fontFamily: INTER, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <table style={{ width: '100%', minWidth, borderCollapse: 'collapse', fontSize: 13, captionSide: 'bottom' }}>
        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 2px 0' }}>{caption}</caption>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.label} scope="col" style={c.num ? { ...thS, textAlign: 'right' } : thS}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={cols[j].num ? tdR : j === 0 ? { ...tdL, color: C.ink, fontWeight: 600 } : tdL}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function L({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</Link>;
}

function ExtL({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>;
}

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Section 194C TDS on Contractors' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
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

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function KeyLimits() {
  const rows = [
    { label: 'Individual/HUF rate', value: '1%' },
    { label: 'Other persons rate', value: '2%' },
    { label: 'No PAN rate', value: '20%' },
    { label: 'Single payment limit', value: 'Rs 30,000' },
    { label: 'Aggregate annual limit', value: 'Rs 1,00,000' },
    { label: 'Deposit due (non-govt)', value: '7th of next month' },
    { label: 'March deposit due', value: '30 April' },
  ];
  return (
    <SidebarCard title="Key Limits at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{r.value}</span>
        </div>
      ))}
    </SidebarCard>
  );
}

function ReturnDueDates() {
  const rows = [
    { label: 'Apr - Jun', value: 'Return: 31 Jul' },
    { label: 'Jul - Sep', value: 'Return: 31 Oct' },
    { label: 'Oct - Dec', value: 'Return: 31 Jan' },
    { label: 'Jan - Mar', value: 'Return: 30 Apr' },
  ];
  return (
    <SidebarCard title="Form 26Q Due Dates">
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 12, color: C.ink3 }}>{r.label}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.dark, marginTop: 2 }}>{r.value}</div>
        </div>
      ))}
    </SidebarCard>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Income Tax Calculator', desc: 'Compute total tax liability and compare regimes', href: '/calculators/income-tax-calculator' },
    { label: 'TDS Rate Chart', desc: 'All TDS sections and rates in one table', href: '/blogs/tds-rate-chart' },
    { label: 'GST Number Search', desc: 'Verify a GSTIN and business details', href: '/blogs/gst-number-search' },
    { label: 'In-Hand Salary Calculator', desc: 'Take-home pay after deductions', href: '/calculators/in-hand-salary-calculator' },
    { label: 'Old vs New Tax Regime Calculator', desc: 'See which regime leaves more in hand', href: '/calculators/old-vs-new-tax-regime-calculator' },
  ];
  return (
    <SidebarCard title="Fermor Calculators">
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </SidebarCard>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/section-194j-tds-professional-fees', label: 'Section 194J: TDS on Professional Fees' },
    { href: '/blogs/section-194i-tds-on-rent', label: 'Section 194I: TDS on Rent' },
    { href: '/blogs/tds-rate-chart', label: 'TDS Rate Chart: All Sections and Rates' },
    { href: '/blogs/tax-audit-section-44ab', label: 'Section 44AB Tax Audit: Limits, Due Date and Penalty' },
    { href: '/blogs/gst-number-search', label: 'GST Number Search and GSTIN Verification' },
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Last Date: Due Dates and Penalties' },
  ];
  return (
    <SidebarCard title="Related Articles">
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </SidebarCard>
  );
}

function BulletList({ items, mb = 20 }: { items: React.ReactNode[]; mb?: number }) {
  return (
    <ul style={{ margin: `0 0 ${mb}px`, padding: 0, listStyleType: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 9 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '8px 0 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
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
            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
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
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for general information and is not tax advice. TDS rates, thresholds and due dates can change through Finance Acts and CBDT notifications. Verify the current position on the official{' '}
        <ExtL href="https://www.incometax.gov.in">Income Tax Department portal</ExtL> or with a Chartered Accountant before relying on it. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function Section194CPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Income Tax</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            Section 194C TDS on Contractors: Rate, Limit, Due Date and Examples
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Who must deduct TDS on payments to contractors and sub-contractors, the 1% and 2% rates, the Rs 30,000 and Rs 1,00,000 thresholds, what counts as &quot;work&quot;, composite contracts, deposit due dates and worked examples.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime={MODIFIED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 9, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>16 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 194C of the Income Tax Act, 1961 requires specified payers to deduct TDS at 1% (individual or HUF contractors) or 2% (other contractors) when paying a resident contractor or sub-contractor for carrying out work under a contract, including supply of labour.
            </p>
            <p style={pStyle}>
              No TDS applies if a single payment stays within Rs 30,000, but once aggregate payments to that contractor cross Rs 1,00,000 in a financial year, TDS applies to the full amount. This guide covers who must deduct, what counts as work, exemptions, composite contracts, and every due date you need.
            </p>

            <TableOfContents />

            <h2 id="what-is-194c" style={hStyle}>What is Section 194C?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 194C requires any specified person paying a resident contractor for work carried out under a contract, including labour supply, to deduct TDS at the time of credit to the contractor&apos;s account or payment, whichever is earlier.
              </p>
            </div>
            <p style={pStyle}>
              The provision exists to collect tax at source on contractual income as it is earned, rather than waiting for the contractor to file a return and pay tax at year end. It applies across a wide range of payers, from government bodies and companies to individuals and HUFs once their own turnover crosses a prescribed limit.
            </p>
            <p style={pStyle}>
              The{' '}
              <ExtL href="https://www.indiacode.nic.in">bare text of Section 194C</ExtL>{' '}
              in the Income Tax Act, 1961 defines the specified persons, the meaning of &quot;work&quot;, and the thresholds that this guide walks through below.
            </p>

            <h2 id="who-deducts" style={hStyle}>Who Must Deduct TDS Under Section 194C?</h2>
            <p style={pStyle}>
              The obligation to deduct TDS under Section 194C falls on a defined list of &quot;specified persons&quot;. Most government and institutional payers are covered automatically, while individuals and HUFs are covered only once their own turnover crosses a threshold.
            </p>
            <DataTable
              caption="Specified persons required to deduct TDS under Section 194C."
              minWidth={700}
              cols={[{ label: 'Category' }, { label: 'Covered automatically?' }]}
              rows={[
                ['Central or State Government', 'Yes'],
                ['Local authorities', 'Yes'],
                ['Statutory corporations, companies', 'Yes'],
                ['Co-operative societies, registered societies', 'Yes'],
                ['Trusts, universities, firms', 'Yes'],
                ['Foreign governments or enterprises', 'Yes'],
                ['Individual, HUF, AOP or BOI', 'Only if business turnover > Rs 1 crore or professional receipts > Rs 50 lakh in the preceding FY'],
              ]}
            />
            <p style={pStyle}>
              This individual/HUF threshold mirrors the tax audit limits under Section 44AB, so most individuals and HUFs already subject to a{' '}
              <L href="/blogs/tax-audit-section-44ab">Section 44AB tax audit</L> are automatically specified persons for TDS purposes as well.
            </p>

            <h2 id="what-is-work" style={hStyle}>What Counts as &quot;Work&quot; Under Section 194C?</h2>
            <p style={pStyle}>
              &quot;Work&quot; under Section 194C is defined broadly to cover a specific list of activities, plus labour supply for any of them. Activities outside this list, most notably professional and technical services, fall under Section 194J instead.
            </p>
            <BulletList
              items={[
                <span key="w1"><strong style={{ color: C.ink }}>Advertising</strong>, including creative, media buying and campaign execution.</span>,
                <span key="w2"><strong style={{ color: C.ink }}>Broadcasting and telecasting</strong>, including production of programmes for that purpose.</span>,
                <span key="w3"><strong style={{ color: C.ink }}>Carriage of goods or passengers</strong> by any mode of transport other than railways.</span>,
                <span key="w4"><strong style={{ color: C.ink }}>Catering</strong>, for events, offices or institutional dining.</span>,
                <span key="w5"><strong style={{ color: C.ink }}>Manufacturing or supplying a product to customer specification</strong>, using material purchased from that same customer (job-work style contracts).</span>,
                <span key="w6"><strong style={{ color: C.ink }}>Supply of pure labour</strong> for any of the above purposes.</span>,
              ]}
            />
            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>What is excluded.</strong> If a product is manufactured to a customer&apos;s specification using material the manufacturer purchased itself (not from the customer), that is treated as a sale, not a works contract, and falls outside Section 194C. Section 194J payments (such as those covered under{' '}
              <L href="/blogs/section-194j-tds-professional-fees">Section 194J professional fees</L>) are explicitly excluded from this definition too.
            </Callout>

            <h2 id="sub-contractors" style={hStyle}>Are Sub-Contractors Covered Under Section 194C?</h2>
            <p style={pStyle}>
              Yes. The definition of &quot;contract&quot; under Section 194C explicitly includes sub-contracts, creating a cascading TDS effect through the entire contracting chain.
            </p>
            <BulletList
              items={[
                <span key="s1">When a client pays the <strong style={{ color: C.ink }}>main contractor</strong>, the client deducts TDS on that payment.</span>,
                <span key="s2">When the main contractor pays a <strong style={{ color: C.ink }}>sub-contractor</strong> for part of the same work, the main contractor must separately deduct TDS on that payment.</span>,
                <span key="s3">This chain continues at every level, relevant in construction projects where a primary contractor often engages multiple sub-contractors for plumbing, electrical and finishing work.</span>,
              ]}
            />

            <h2 id="rate-limit" style={hStyle}>TDS Rate and Threshold Limit Under Section 194C</h2>
            <p style={pStyle}>
              The applicable rate depends on whether the contractor is an individual/HUF or any other person, and whether a valid PAN is on file.
            </p>
            <DataTable
              caption="Section 194C TDS rates by payee type."
              minWidth={700}
              cols={[{ label: 'Nature of payment' }, { label: 'TDS rate (PAN available)' }, { label: 'TDS rate (no PAN)' }]}
              rows={[
                ['Payment to resident individual or HUF', '1%', '20%'],
                ['Payment to any other resident person (company, firm, LLP)', '2%', '20%'],
                ['Payment to goods transport contractor eligible under Section 44AE (≤10 carriages, with declaration)', 'NIL', '20%'],
              ]}
            />
            <p style={pStyle}>
              No surcharge, education cess or SHEC is added to these rates. The threshold limit works in two parts, and either one alone is enough to trigger TDS.
            </p>
            <DataTable
              caption="Section 194C threshold limits."
              minWidth={600}
              cols={[{ label: 'Basis' }, { label: 'Threshold' }]}
              rows={[
                ['Single payment under a contract', 'Exceeds Rs 30,000'],
                ['Aggregate payments to the same contractor in a financial year', 'Exceeds Rs 1,00,000'],
              ]}
            />

            <h2 id="when-deduct" style={hStyle}>When Should TDS Under Section 194C Be Deducted?</h2>
            <p style={pStyle}>
              TDS must be deducted at the earlier of crediting the amount to the contractor&apos;s account in the payer&apos;s books, or actual payment in cash, by cheque, or by any other mode. If the amount is credited to a &quot;suspense account&quot; or any similarly named account instead of the contractor&apos;s account directly, it is still deemed to be credited to the contractor, and TDS applies regardless.
            </p>

            <PromoBar name="Income Tax Calculator" desc="Work out your total tax liability under both regimes before you decide how to structure contract payments." href="/calculators/income-tax-calculator" />

            <h2 id="exemptions" style={hStyle}>When is TDS Under Section 194C Not Deductible?</h2>
            <p style={pStyle}>
              A handful of specific situations fall outside Section 194C entirely, even where a payment is made to a contractor.
            </p>
            <DataTable
              caption="Situations where Section 194C TDS does not apply."
              minWidth={700}
              cols={[{ label: 'Situation' }, { label: 'Outcome' }]}
              rows={[
                ['Single payment ≤ Rs 30,000 and aggregate ≤ Rs 1,00,000 for the year', 'No TDS required'],
                ['Individual or HUF payment for personal, non-business purposes', 'Exempt, e.g. getting your own house painted or vehicle repaired'],
                ['Goods transport contractor with 10 or fewer carriages under Section 44AE', 'Exempt, subject to a declaration with PAN furnished to the payer'],
              ]}
            />
            <p style={pStyle}>
              Even where no TDS deduction is required, maintaining proper documentation is still advisable in case the Income Tax Department seeks clarification during assessment.
            </p>

            <h2 id="worked-examples" style={hStyle}>Worked Examples: When Does TDS Kick In?</h2>
            <p style={pStyle}>
              The aggregate Rs 1,00,000 threshold is the one that trips up most payers, since individual payments can each stay comfortably under Rs 30,000 while still triggering TDS once totalled across the year.
            </p>
            <DataTable
              caption="Example 1: payments crossing the aggregate threshold mid-year."
              minWidth={640}
              cols={[{ label: 'Payment date' }, { label: 'Amount' }, { label: 'TDS applicable?' }]}
              rows={[
                ['12 May 2026', 'Rs 25,000', 'No'],
                ['28 Jun 2026', 'Rs 32,000', 'Yes, single payment exceeds Rs 30,000'],
                ['25 Oct 2026', 'Rs 20,000', 'Yes, deduction already triggered'],
                ['20 Dec 2026', 'Rs 25,000', 'Yes, aggregate exceeds Rs 1 lakh; TDS also due on the earlier Rs 25,000 not deducted'],
              ]}
            />
            <DataTable
              caption="Example 2: TDS on the full aggregate once the Rs 1,00,000 threshold is crossed."
              minWidth={600}
              cols={[{ label: 'Item' }, { label: 'Amount' }]}
              rows={[
                ['Total payments in the year (4 payments of Rs 25k-30k each)', 'Rs 1,08,000'],
                ['TDS rate (individual/HUF contractor)', '1%'],
                ['TDS payable', 'Rs 1,080'],
                ['Net payment on the triggering date (Rs 28,000 - Rs 1,080)', 'Rs 26,920'],
              ]}
            />

            <h2 id="composite-gst" style={hStyle}>Composite Contracts and GST Treatment</h2>
            <p style={pStyle}>
              Many contracts combine materials and labour in a single invoice. Whether TDS applies to the full invoice or only the service portion depends entirely on how the invoice is structured.
            </p>
            <DataTable
              caption="TDS treatment on composite contracts."
              minWidth={700}
              cols={[{ label: 'Invoice structure' }, { label: 'TDS base' }]}
              rows={[
                ['Material value shown separately on the invoice', 'TDS on invoice value excluding material cost'],
                ['Material value not shown separately', 'TDS on the entire invoice value, including materials'],
                ['GST shown separately on the invoice', 'TDS on the contract value excluding GST, per CBDT Circular 23/2017'],
                ['GST not shown separately', 'TDS may be calculated on the gross invoice amount including GST'],
              ]}
            />
            <p style={pStyle}>
              The practical takeaway: always request contractor invoices that separately itemise materials and GST. A poorly structured invoice can push TDS, and therefore the contractor&apos;s net payment, meaningfully higher than intended.
            </p>

            <h2 id="due-dates" style={hStyle}>TDS Deposit and Form 26Q Return Due Dates</h2>
            <p style={pStyle}>
              Deducted TDS must be deposited with the government, and then reported quarterly through Form 26Q, with Form 16A issued to the contractor as proof of deduction.
            </p>
            <DataTable
              caption="Section 194C deposit due dates."
              minWidth={560}
              cols={[{ label: 'Payer and month' }, { label: 'Deposit due date' }]}
              rows={[
                ['Government payer (any month)', 'Same day'],
                ['Other payers, deduction in March', '30 April'],
                ['Other payers, any other month', 'Within 7 days from month end'],
              ]}
            />
            <DataTable
              caption="Form 26Q (TDS return) and Form 16A (TDS certificate) due dates by quarter."
              minWidth={640}
              cols={[{ label: 'Quarter' }, { label: 'Form 26Q due' }, { label: 'Form 16A due' }]}
              rows={[
                ['April - June', '31 July', '15 August'],
                ['July - September', '31 October', '15 November'],
                ['October - December', '31 January', '15 February'],
                ['January - March', '30 April', '15 June'],
              ]}
            />

            <h2 id="194c-vs-others" style={hStyle}>Section 194C vs Section 194J vs Section 194I</h2>
            <p style={pStyle}>
              The most common classification error is choosing between 194C, 194J and 194I for a payment that could plausibly fit more than one. The distinguishing question is what the payment is actually for.
            </p>
            <DataTable
              caption="Section 194C compared with 194J and 194I."
              minWidth={760}
              cols={[{ label: 'Section' }, { label: 'Covers' }, { label: 'Typical rate' }]}
              rows={[
                ['194C', 'Work under a contract: construction, advertising, catering, transport, labour supply', '1% / 2%'],
                ['194J', 'Professional or technical services: legal, medical, engineering, consultancy, recruitment agency fees', 'See the Section 194J guide'],
                ['194I', 'Rent for land, building, plant, machinery, furniture or fittings', 'See the Section 194I guide'],
              ]}
            />
            <p style={pStyle}>
              A recruitment or manpower-supply agency providing placement or consultancy services generally falls under{' '}
              <L href="/blogs/section-194j-tds-professional-fees">Section 194J</L>, while an agency physically supplying labour to carry out work under your direction falls under Section 194C. A landlord collecting rent is covered by{' '}
              <L href="/blogs/section-194i-tds-on-rent">Section 194I</L>, even if a separate maintenance charge under the same arrangement is a 194C matter.
            </p>

            <h2 id="home-construction" style={hStyle}>How Section 194C Applies to Home Construction Contracts</h2>
            <p style={pStyle}>
              If you are an individual building or renovating a personal residence, Section 194C generally does not apply to you, since the Act specifically exempts personal, non-business payments made by individuals and HUFs.
            </p>
            <p style={pStyle}>
              This changes once your own business or professional turnover from other activities crosses Rs 1 crore (business) or Rs 50 lakh (profession) in the preceding financial year, which makes you a specified person for all contractor payments, including construction. A builder, developer, company, or any large-turnover individual engaging contractors for a construction project meant for business or resale must deduct TDS under Section 194C in full, including the cascading obligation on any sub-contractors engaged for that project.
            </p>

            <h2 id="consequences" style={hStyle}>Consequences of Not Deducting or Depositing TDS</h2>
            <p style={pStyle}>
              Failing to deduct, or deducting but depositing late, carries both an interest cost and a penalty risk under the Income Tax Act.
            </p>
            <DataTable
              caption="Consequences of Section 194C non-compliance."
              minWidth={700}
              cols={[{ label: 'Failure' }, { label: 'Consequence' }]}
              rows={[
                ['Failure to deduct TDS', 'Interest at 1% per month or part thereof, from the date deductible to the date actually deducted'],
                ['Deducted but deposited late', 'Interest at 1.5% per month or part thereof, from the date deducted to the date actually deposited'],
                ['Expense disallowance', 'Up to 30% of the expense can be disallowed under Section 40(a)(ia) if TDS was not deducted or deposited'],
                ['Penalty', 'Rs 10,000 to Rs 1,00,000 under relevant provisions, with prosecution possible in serious cases'],
              ]}
            />

            <h2 id="mistakes" style={hStyle}>Common Mistakes in Section 194C Compliance</h2>
            <p style={pStyle}>
              Most Section 194C disputes trace back to a handful of avoidable errors in how payments are tracked and invoices are structured.
            </p>
            <BulletList
              items={[
                <span key="m1"><strong style={{ color: C.ink }}>Missing the aggregate threshold:</strong> treating each payment in isolation and failing to deduct TDS once the Rs 1,00,000 annual aggregate is crossed, even though no single payment exceeded Rs 30,000.</span>,
                <span key="m2"><strong style={{ color: C.ink }}>Not deducting on earlier payments:</strong> once the threshold is crossed, TDS is due on the full aggregate, including payments made earlier in the year that were not deducted at the time.</span>,
                <span key="m3"><strong style={{ color: C.ink }}>Skipping PAN verification:</strong> failing to collect a valid PAN before payment, which forces a 20% deduction instead of the standard 1% or 2%.</span>,
                <span key="m4"><strong style={{ color: C.ink }}>Unbifurcated invoices:</strong> accepting contractor invoices that don&apos;t separately state material cost or GST, which forces TDS on the full invoice value.</span>,
                <span key="m5"><strong style={{ color: C.ink }}>Misclassifying 194J payments as 194C:</strong> applying 194C rates to genuinely professional or technical service payments that belong under Section 194J.</span>,
                <span key="m6"><strong style={{ color: C.ink }}>Missing sub-contractor TDS:</strong> deducting TDS correctly on payments to the main contractor but forgetting the main contractor&apos;s own obligation to deduct TDS on payments to sub-contractors.</span>,
              ]}
            />


            <h2 id="faq" style={hStyle}>Frequently Asked Questions on Section 194C TDS on Contractors</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          <aside
            className="s194c-sidebar"
            style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><KeyLimits /></div>
            <div style={{ flexShrink: 0 }}><ReturnDueDates /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .s194c-sidebar::-webkit-scrollbar { width: 5px; }
        .s194c-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s194c-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s194c-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .toc-link:hover { background: #f4f5f6; color: #101214 !important; }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}

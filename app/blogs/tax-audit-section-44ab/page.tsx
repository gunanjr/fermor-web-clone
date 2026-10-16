import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

const SLUG = 'tax-audit-section-44ab';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const TITLE = 'Section 44AB Tax Audit: Turnover Limits, Due Date, Form 3CD and Penalty';
const PUBLISHED = '2026-10-09T11:01:46+05:30';
const MODIFIED = '2026-10-09T11:01:46+05:30';

export const metadata: Metadata = {
  title: 'Section 44AB Tax Audit: Limits, Due Date, Forms & Penalty (2026)',
  description:
    'Section 44AB tax audit explained: who needs it, the Rs 1 crore and Rs 10 crore business turnover limits, the Rs 50 lakh professional limit, presumptive scheme (44AD, 44ADA, 44AE) triggers, Form 3CA/3CB/3CD, the 30 September 2026 due date and Section 271B penalty.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Section 44AB Tax Audit: Turnover Limits, Due Date, Form 3CD and Penalty',
    description:
      'Who is covered by Section 44AB, the turnover and gross receipts limits for FY 2025-26, presumptive taxation triggers, Form 3CA vs 3CB vs 3CD, filing due dates and the Section 271B penalty for missing the tax audit.',
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Fermor Analysis'],
    tags: ['Section 44AB', 'Tax Audit', 'Form 3CD', 'Income Tax Audit', 'Income Tax India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 44AB Tax Audit: Limits, Due Date, Forms and Penalty',
    description: 'Full Section 44AB guide: turnover limits, Form 3CA/3CB/3CD, due dates and Section 271B penalty.',
  },
  keywords: [
    'section 44ab', 'section 44ab of income tax act', '44ab of income tax act', 'section 44ab audit',
    'tax audit section 44ab', 'tax audit under section 44ab', 'income tax audit section 44ab',
    '44ab tax audit', '44ab audit', '44ab income tax', 'tax audit us 44ab',
    'section 44ab turnover limit', 'tax audit limit for ay 2026 27', 'tax audit limits for business and profession',
    'section 44ab applicability', 'what is tax audit', 'tax audit meaning', 'tax audit due date',
    'tax audit under income tax act 1961', 'form 3ca 3cb', 'difference between form 3ca and 3cb',
    'form 3cd', 'form 3ce', 'tax audit report', 'section 271b', 'section 271b penalty',
    'penalty for not getting tax audit done', 'presumptive taxation 44ad', 'section 44ada tax audit',
    'section 44ae tax audit', 'tax audit for professionals', 'tax audit for business',
    'who needs tax audit', 'tax audit applicability', 'gross receipts limit professionals',
    'turnover limit for tax audit', '10 crore turnover limit audit', '1 crore turnover limit audit',
    '50 lakh professional limit', 'statutory audit vs tax audit', 'who can conduct tax audit',
    'tax audit ca', 'hire ca for section 44ab audit', 'section 44ab tax audit fees',
    'income tax audit ca consultant', 'tax audit chartered accountant near me',
    'section 92e transfer pricing audit', 'tax audit certified accountant',
  ],
};

const faqItems = [
  { q: 'What is Section 44AB of the Income Tax Act?', a: 'Section 44AB of the Income Tax Act, 1961 requires specified taxpayers carrying on business or a profession to get their books of accounts audited by a Chartered Accountant once their turnover, gross receipts or income crosses a prescribed limit. The audit, commonly called a tax audit, checks whether income, expenses and deductions have been correctly reported, and the result is filed as an audit report before the income tax return.' },
  { q: 'What is the turnover limit for tax audit under Section 44AB?', a: 'For a business, the standard turnover limit is Rs 1 crore in a financial year. This limit rises to Rs 10 crore if cash receipts and cash payments each stay within 5% of the total receipts and total payments for the year, meaning more than 95% of transactions run through banking channels. For a profession, the gross receipts limit is Rs 50 lakh under section 44AB(b).' },
  { q: 'What is the tax audit due date for FY 2025-26?', a: 'The tax audit report for FY 2025-26 (AY 2026-27) must be completed and filed by 30th September 2026 for most taxpayers. Where the taxpayer has entered into an international transaction and is covered by the transfer pricing audit under Section 92E, the due date extends to 31st October 2026. The income tax return itself is due by 31st October 2026 for taxpayers subject to tax audit.' },
  { q: 'What documents and accounts does a tax auditor examine?', a: 'A tax auditor examines the cash book, ledgers, journals, bank statements, stock records and sales and purchase invoices to authenticate the state of a business as on the last day of the financial year. The auditor also checks compliance with TDS provisions, depreciation claims under the Income Tax Act, disallowances and other particulars that go into Form 3CD.' },
  { q: 'What is the penalty for not getting a tax audit done?', a: 'Under Section 271B, if a taxpayer required to get a tax audit fails to do so, the lower of 0.5% of total sales, turnover or gross receipts, or Rs 1,50,000, becomes payable. Budget 2026 reclassified this amount from a penalty to a fee to reduce litigation, though the computation stays the same. No amount is levied if the taxpayer can show a reasonable cause for the delay under Section 273B.' },
  { q: 'Is tax audit applicable to salaried individuals?', a: 'A salaried individual with only salary income is not subject to tax audit, since Section 44AB applies only to business or professional income. If the same person also runs a business with turnover above Rs 1 crore (or Rs 10 crore for mostly digital transactions) or a profession with gross receipts above Rs 50 lakh, or declares presumptive income below the prescribed rate while their total income exceeds the basic exemption limit, tax audit becomes applicable on that business or professional income.' },
  { q: 'What is Form 3CA, Form 3CB and Form 3CD?', a: 'Form 3CA is filed when the taxpayer is already required to get accounts audited under another law, such as the Companies Act. Form 3CB is filed when no other law mandates an audit. Form 3CD is the detailed statement of particulars, covering depreciation, disallowances, TDS compliance, related-party transactions, GST details and other specifics, and it is filed along with either Form 3CA or Form 3CB. Form 3CE applies separately to non-residents and foreign companies receiving royalty or technical service fees.' },
  { q: 'Who can conduct a tax audit under Section 44AB?', a: 'Only a Chartered Accountant holding a valid Certificate of Practice, as defined under Section 288(2) of the Income Tax Act, can conduct a tax audit. An internal auditor of the same entity, a person disqualified under the Chartered Accountants Act, or anyone with a substantial interest in the business cannot be appointed as the tax auditor, since independence is mandatory.' },
  { q: 'Does a company need a separate tax audit if it is already audited under the Companies Act?', a: 'No. If a taxpayer is required by any other law to get accounts audited, it is enough to get that audit done before the due date and furnish the resulting report under the Income Tax Act as well. In practice this means the taxpayer files Form 3CA (acknowledging the other-law audit) along with Form 3CD, rather than undergoing two separate audits of the same books.' },
  { q: 'How does presumptive taxation under Section 44AD trigger a tax audit?', a: 'A business eligible for presumptive taxation under Section 44AD normally declares profit at 6% (digital receipts) or 8% (cash receipts) of turnover without needing a tax audit, as long as turnover stays within Rs 2 crore. Tax audit becomes mandatory if the taxpayer declares profit lower than this prescribed rate and total income exceeds the basic exemption limit, or if the taxpayer opts out of Section 44AD during the five-year lock-in period and income again exceeds the basic exemption limit in that period.' },
  { q: 'How does Section 44ADA for professionals trigger a tax audit?', a: 'Under Section 44ADA, a professional with gross receipts up to Rs 50 lakh can declare 50% of receipts as presumptive profit without a tax audit. If the professional claims profit lower than 50% of receipts and total income exceeds the basic exemption limit, a tax audit under Section 44AB becomes mandatory, even though gross receipts are within the Rs 50 lakh limit.' },
  { q: 'What is the difference between a tax audit and a statutory audit?', a: 'A tax audit is conducted under Section 44AB of the Income Tax Act specifically to verify tax compliance, deductions and income computation, and it applies only once prescribed turnover or receipt limits are crossed. A statutory audit is conducted under a different law, such as the Companies Act, 2013 for every company regardless of turnover, and it verifies that financial statements present a true and fair view for shareholders and regulators rather than for tax purposes alone.' },
  { q: 'Can the same Chartered Accountant do both the statutory audit and the tax audit?', a: 'Yes, the same Chartered Accountant can be appointed as both the statutory auditor and the tax auditor for the same entity, provided they meet the independence conditions for a tax auditor. Many businesses use the statutory audit as the base and have the same CA additionally prepare the Form 3CD particulars, since this avoids duplicating the examination of the same books of accounts.' },
  { q: 'What happens if the taxpayer rejects the uploaded tax audit report?', a: 'The tax auditor uploads the audit report online using their Chartered Accountant login, and the taxpayer must then accept or reject it from their own income tax portal login. If the taxpayer rejects the report for any reason, the auditor has to re-upload a corrected report and the acceptance step repeats until the taxpayer accepts it before the due date.' },
  { q: 'What reasonable causes are accepted for delay in filing a tax audit report?', a: 'Tribunals and courts have accepted causes such as natural calamities, sudden resignation of the tax auditor, resignation of key accounting staff, extended labour strikes or lock-outs, loss of accounts due to theft or fire, and the physical inability or death of the person in charge of accounts. Each case under Section 273B is examined on its own facts, and the taxpayer has to demonstrate the cause rather than merely claim it.' },
  { q: 'Is tax audit mandatory for a business showing a loss?', a: 'Yes, in two situations. If a non-presumptive business shows turnover above Rs 1 crore, tax audit applies regardless of profit or loss. Separately, if a presumptive business under Section 44AD, 44ADA or 44AE reports a loss or income below the prescribed presumptive rate and total income still exceeds the basic exemption limit after setting off that loss, tax audit becomes mandatory even though no tax may ultimately be payable.' },
  { q: 'What is the gross receipts limit for professionals under Section 44AB(b)?', a: 'Under section 44AB(b) of the Income Tax Act, a person carrying on a profession, such as a doctor, lawyer, architect, consultant or Chartered Accountant, must get a tax audit done if gross receipts exceed Rs 50 lakh in a financial year. Unlike the business threshold, there is currently no higher digital-transaction limit for professionals.' },
  { q: 'How are cash receipts and cash payments calculated for the Rs 10 crore limit?', a: 'The Rs 10 crore limit applies only if the aggregate of all cash received, including cash sales and cash collections during the year, does not exceed 5% of total receipts, and the aggregate of all cash paid, including cash expenses, does not exceed 5% of total payments. A cheque or bank draft that is not account-payee is treated as a cash transaction for this calculation, so even non-cash instruments can push a business past the 5% threshold.' },
  { q: 'Does GST turnover affect the Section 44AB limit?', a: 'Section 44AB looks at turnover, sales or gross receipts as computed under the Income Tax Act, not the GST turnover reported in GST returns. In practice the two figures are usually close for most businesses, so a mismatch between GST returns and the tax audit\'s reported turnover is one of the first things an assessing officer checks, and reconciling the two before filing avoids a notice later.' },
  { q: 'What is Form 26 and does it replace Form 3CA, 3CB and 3CD?', a: 'Under the Income-tax Rules, 2026 framed for the Income-tax Act, 2025, Forms 3CA, 3CB and 3CD have been consolidated into a single Form 26 for income earned from 1 April 2026 onward. Income earned up to 31 March 2026, reported for AY 2026-27, is still audited and filed using the existing Form 3CA, 3CB and 3CD under the 1961 Act.' },
  { q: 'What is Form 3CE used for?', a: 'Form 3CE is a separate audit report required when a non-resident or a foreign company receives royalty or fees for technical services from the Government of India or an Indian concern. It is distinct from the Form 3CA/3CB and 3CD combination used for resident taxpayers audited under Section 44AB.' },
  { q: 'Can a tax audit be done after the due date?', a: 'A tax audit report can technically be uploaded after the due date, but doing so attracts the Section 271B fee (0.5% of turnover or Rs 1,50,000, whichever is lower) unless a reasonable cause under Section 273B is accepted. Filing late also risks the income tax return itself becoming a belated or defective return, since the audit report ordinarily has to be filed before or along with the return.' },
  { q: 'Does a partnership firm or LLP need a tax audit under Section 44AB?', a: 'Yes, a partnership firm or LLP is subject to Section 44AB exactly like any other person carrying on business or profession, once its turnover, gross receipts or presumptive-income conditions cross the prescribed limits. An LLP separately audited under the LLP Act, 2008 for exceeding its own turnover or contribution thresholds can use that audit as the "other law" audit and file Form 3CA along with Form 3CD, instead of undergoing two full independent audits.' },
  { q: 'What is the audit limit for businesses under Section 44AE, 44BB and 44BBB?', a: 'Taxpayers eligible for the presumptive schemes under Sections 44AE (goods carriages), 44BB (non-residents providing services for mineral oil exploration) or 44BBB (foreign companies in turnkey power projects) do not need a tax audit if they declare income at or above the prescribed presumptive rate for that scheme. If they claim income lower than the deemed presumptive profit, Section 44AB makes a tax audit mandatory regardless of actual turnover.' },
  { q: 'How much does a Section 44AB tax audit cost?', a: 'Tax audit fees are not fixed by law and vary by the Chartered Accountant, the complexity of accounts, and the city, typically ranging from a few thousand rupees for a small proprietorship to a substantially higher fee for a company with multiple locations, large turnover or group entities. ICAI issues only non-binding recommended fee guidelines, not a mandatory tariff, so fees are negotiated between the taxpayer and the Chartered Accountant.' },
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
    'Complete guide to Section 44AB tax audit: who is covered, turnover and gross receipts limits for FY 2025-26, presumptive taxation triggers under 44AD/44ADA/44AE, Form 3CA/3CB/3CD, the 30 September 2026 due date, who can conduct the audit, and the Section 271B penalty for non-compliance.',
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
    { '@type': 'Thing', name: 'Section 44AB of the Income Tax Act, 1961', description: 'Mandatory tax audit provision for businesses and professionals above prescribed turnover or receipt limits' },
    { '@type': 'Thing', name: 'Form 3CD', description: 'Statement of particulars filed with a Section 44AB tax audit report' },
    { '@type': 'Thing', name: 'Section 271B', description: 'Penalty/fee provision for failure to get accounts audited under Section 44AB' },
  ],
  keywords: 'section 44ab, section 44ab of income tax act, tax audit, tax audit section 44ab, form 3cd, form 3ca, form 3cb, section 271b, tax audit due date, tax audit turnover limit',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 44AB Tax Audit', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Complete a Section 44AB Tax Audit',
  description: 'Steps to determine applicability, appoint a Chartered Accountant and file a Section 44AB tax audit report before the due date',
  totalTime: 'PT45M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check applicability', text: 'Compare your turnover, gross receipts or presumptive income against the Rs 1 crore, Rs 10 crore or Rs 50 lakh limits to see whether Section 44AB applies.' },
    { '@type': 'HowToStep', position: 2, name: 'Appoint a Chartered Accountant', text: 'Engage a practising Chartered Accountant with a valid Certificate of Practice who has no disqualifying interest in the business, and add their details on the income tax portal.' },
    { '@type': 'HowToStep', position: 3, name: 'Complete the audit', text: 'The auditor examines books of accounts, bank statements and supporting records, and prepares Form 3CD along with Form 3CA or Form 3CB.' },
    { '@type': 'HowToStep', position: 4, name: 'Upload and accept the report', text: 'The auditor uploads the report using their CA login; the taxpayer must accept it from their own portal login before the due date.' },
    { '@type': 'HowToStep', position: 5, name: 'File the income tax return', text: 'File the return referencing the accepted audit report by 31st October 2026 for FY 2025-26, and e-verify it.' },
  ],
};

const TOC_ITEMS = [
  { id: 'what-is-tax-audit', label: 'What is a tax audit?' },
  { id: 'objectives', label: 'Objectives of tax audit' },
  { id: 'applicability', label: 'Who needs a tax audit' },
  { id: 'limits-table', label: 'Turnover and receipt limits' },
  { id: 'presumptive', label: 'Presumptive scheme triggers' },
  { id: 'other-laws', label: 'Accounts audited under other laws' },
  { id: 'forms', label: 'Form 3CA, 3CB, 3CD, 3CE' },
  { id: 'who-can-audit', label: 'Who can conduct the audit' },
  { id: 'due-dates', label: 'Due dates for FY 2025-26' },
  { id: 'how-to-file', label: 'How and when to file' },
  { id: 'penalty', label: 'Section 271B penalty' },
  { id: 'reasonable-cause', label: 'Reasonable cause exceptions' },
  { id: 'tax-audit-vs-statutory', label: 'Tax audit vs statutory audit' },
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
      name: 'Tax Audit',
      alternateName: 'Section 44AB Audit',
      description: 'An examination of a taxpayer\'s books of accounts by a Chartered Accountant, required under Section 44AB of the Income Tax Act, 1961 once prescribed turnover or receipt limits are crossed.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Form 3CD',
      description: 'The statement of particulars filed with a Section 44AB tax audit report, detailing depreciation, disallowances, TDS compliance and other prescribed information.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: { '@type': 'Audience', audienceType: 'Business owners, professionals, Chartered Accountants and tax practitioners in India', geographicArea: { '@type': 'Country', name: 'India' } },
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
    'Section 44AB Tax Audit',
    'Form 3CD',
    'Presumptive Taxation',
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
    { label: 'Section 44AB Tax Audit' },
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
    { label: 'Business (normal)', value: 'Rs 1 crore' },
    { label: 'Business (95%+ digital)', value: 'Rs 10 crore' },
    { label: 'Profession', value: 'Rs 50 lakh' },
    { label: '44AD opt-out income', value: '> exemption limit' },
    { label: 'Audit due date', value: '30 Sep 2026' },
    { label: 'With transfer pricing', value: '31 Oct 2026' },
    { label: 'Section 271B fee', value: 'Lower of 0.5% or Rs 1.5L' },
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

function FormsSnapshot() {
  const rows = [
    { label: 'Audited under other law', value: 'Form 3CA + 3CD' },
    { label: 'No other law audit', value: 'Form 3CB + 3CD' },
    { label: 'Non-resident royalty/FTS', value: 'Form 3CE' },
    { label: 'From AY 2027-28 (new Act)', value: 'Form 26 (combined)' },
  ];
  return (
    <SidebarCard title="Which Form Applies">
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
    { label: 'Old vs New Tax Regime Calculator', desc: 'See which regime leaves more in hand', href: '/calculators/old-vs-new-tax-regime-calculator' },
    { label: 'GST Number Search', desc: 'Verify a GSTIN and business details', href: '/blogs/gst-number-search' },
    { label: 'HRA Calculator', desc: 'Exempt and taxable HRA for your rent', href: '/calculators/hra-calculator' },
    { label: 'In-Hand Salary Calculator', desc: 'Take-home pay after deductions', href: '/calculators/in-hand-salary-calculator' },
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
    { href: '/blogs/old-vs-new-tax-regime', label: 'Old vs New Tax Regime: Which One to Choose' },
    { href: '/blogs/section-10-income-tax-act-exemptions', label: 'Section 10 of Income Tax Act: Exemptions List' },
    { href: '/blogs/section-87a-rebate', label: 'Income Tax Rebate Under Section 87A' },
    { href: '/blogs/gst-number-search', label: 'GST Number Search and GSTIN Verification' },
    { href: '/blogs/itr-filing-last-date', label: 'ITR Filing Last Date: Due Dates and Penalties' },
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for general information and is not tax advice. Turnover limits, due dates and penalty amounts can change through Finance Acts and CBDT notifications. Verify the current position on the official{' '}
        <ExtL href="https://www.incometax.gov.in">Income Tax Department portal</ExtL> or with a Chartered Accountant before relying on it. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function TaxAuditSection44ABPage() {
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
            Section 44AB Tax Audit: Turnover Limits, Due Date, Form 3CD and Penalty
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            Who needs a tax audit under Section 44AB, the Rs 1 crore, Rs 10 crore and Rs 50 lakh limits, how presumptive taxation changes the trigger, which form applies, the FY 2025-26 due dates and the Section 271B penalty for missing them.
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
              Section 44AB of the Income Tax Act, 1961 makes a tax audit mandatory once a business crosses Rs 1 crore turnover (Rs 10 crore if transactions are mostly digital) or a profession crosses Rs 50 lakh gross receipts in a financial year. It also applies to anyone declaring profit below the rate prescribed under presumptive taxation.
            </p>
            <p style={pStyle}>
              The audit must be done by a practising Chartered Accountant, filed online as Form 3CA or 3CB along with Form 3CD, and completed before the due date. For FY 2025-26 (AY 2026-27), that due date is 30th September 2026 for most taxpayers. Missing it attracts a fee under Section 271B unless a reasonable cause applies.
            </p>

            <TableOfContents />

            <h2 id="what-is-tax-audit" style={hStyle}>What is a Tax Audit?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                A tax audit is an examination of a taxpayer&apos;s books of accounts, carried out by a Chartered Accountant, to verify that income, expenses and deductions have been correctly reported for income tax purposes.
              </p>
            </div>
            <p style={pStyle}>
              The Chartered Accountant conducting this audit, called the tax auditor, checks the cash book, ledgers, bank statements, stock records and sales and purchase invoices against the return a taxpayer intends to file. The findings go into a prescribed audit report, which must be filed online before the return itself.
            </p>
            <p style={pStyle}>
              A tax audit is distinct from a statutory audit. It exists purely to verify tax compliance under the Income Tax Act, while a statutory audit under the Companies Act or another law verifies the financial statements more broadly for shareholders and regulators. See the <L href="#tax-audit-vs-statutory">statutory audit comparison</L> below.
            </p>

            <h2 id="objectives" style={hStyle}>Objectives of Tax Audit Under Section 44AB</h2>
            <p style={pStyle}>
              A tax audit exists to make sure books of accounts are properly maintained and to let an independent Chartered Accountant certify that the figures used to compute tax are accurate. The main objectives are set out below.
            </p>
            <BulletList
              items={[
                <span key="o1"><strong style={{ color: C.ink }}>Verify accuracy of accounts:</strong> the auditor confirms that books of accounts are maintained correctly and reflect the business or profession&apos;s actual financial position.</span>,
                <span key="o2"><strong style={{ color: C.ink }}>Report discrepancies:</strong> any inconsistency found during examination is reported, giving the taxpayer a chance to correct it before filing the return.</span>,
                <span key="o3"><strong style={{ color: C.ink }}>Prescribed disclosures:</strong> the audit reports specific particulars, such as depreciation claimed and compliance with various provisions of income tax law, in a standard format.</span>,
                <span key="o4"><strong style={{ color: C.ink }}>Simplify tax computation:</strong> with audited figures already verified, computing tax liability and eligible deductions becomes faster and less error-prone.</span>,
                <span key="o5"><strong style={{ color: C.ink }}>Enable verification by the department:</strong> the Income Tax Department relies on audit reports to cross-check the income, tax and deductions a taxpayer has reported in the return.</span>,
              ]}
            />

            <h2 id="applicability" style={hStyle}>Who Needs a Tax Audit Under Section 44AB?</h2>
            <p style={pStyle}>
              Section 44AB covers any person, individual, HUF, partnership firm, LLP or company, carrying on business or a profession, once turnover, gross receipts or presumptive income crosses the limit that applies to them. The exact condition depends on whether the taxpayer runs a business or a profession, and whether they use a presumptive taxation scheme.
            </p>
            <DataTable
              caption="Section 44AB applicability by category. Source: Income Tax Act, 1961, Section 44AB."
              minWidth={760}
              cols={[{ label: 'Category' }, { label: 'Condition' }, { label: 'Tax audit applicable when' }]}
              rows={[
                ['Business (not presumptive)', 'Carrying on business', 'Turnover exceeds Rs 1 crore in FY'],
                ['Business (95%+ digital)', 'Cash receipts and payments each ≤ 5% of total', 'Turnover exceeds Rs 10 crore'],
                ['Business - Presumptive (44AD)', 'Declares profit lower than prescribed rate', 'Income exceeds basic exemption limit'],
                ['Business - Opted out of 44AD', 'Within the 5-year lock-in period', 'Income exceeds basic exemption limit'],
                ['Business - Presumptive (44AE/44BB/44BBB)', 'Claims income lower than prescribed rate', 'Tax audit required'],
                ['Profession', 'Carrying on profession', 'Gross receipts exceed Rs 50 lakh'],
                ['Profession - Presumptive (44ADA)', 'Declares profit below 50% of receipts', 'Income exceeds basic exemption limit'],
                ['Business loss (non-presumptive)', 'Turnover exceeds Rs 1 crore', 'Tax audit required regardless of profit/loss'],
              ]}
            />
            <p style={pStyle}>
              The Income Tax Department&apos;s own{' '}
              <ExtL href="https://www.incometax.gov.in">tax audit FAQs</ExtL> confirm the same coverage: businesses above the turnover limit, professions above Rs 50 lakh, and anyone opting out of a presumptive scheme or declaring income below its prescribed rate while total income exceeds the basic exemption limit.
            </p>

            <h2 id="limits-table" style={hStyle}>Turnover and Gross Receipts Limits for FY 2025-26</h2>
            <p style={pStyle}>
              The headline numbers are Rs 1 crore for business, Rs 10 crore if the business runs almost entirely through banking channels, and Rs 50 lakh for a profession. Whether the higher Rs 10 crore business limit applies depends entirely on how much of the turnover and payments happen in cash.
            </p>
            <DataTable
              caption="Turnover and receipt thresholds that trigger Section 44AB for FY 2025-26 (AY 2026-27)."
              minWidth={600}
              cols={[{ label: 'Taxpayer type' }, { label: 'Threshold' }, { label: 'Condition' }]}
              rows={[
                ['Business (standard)', 'Rs 1 crore', 'Turnover or gross receipts in business'],
                ['Business (mostly digital)', 'Rs 10 crore', 'Cash receipts ≤ 5% of total AND cash payments ≤ 5% of total'],
                ['Profession', 'Rs 50 lakh', 'Gross receipts in profession under section 44AB(b)'],
              ]}
            />
            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>How the 5% cash test works.</strong> Add up every cash receipt, including cash sales, during the year and divide by total receipts. Do the same for cash payments against total payments. Both ratios must stay at or below 5% for the Rs 10 crore limit to apply instead of Rs 1 crore. A cheque or bank draft that is not account-payee is treated as cash for this calculation, so non-account-payee instruments can silently push a business over the 5% mark.
            </Callout>

            <h2 id="presumptive" style={hStyle}>How Presumptive Taxation (44AD, 44ADA, 44AE) Triggers a Tax Audit</h2>
            <p style={pStyle}>
              Presumptive taxation schemes let small businesses and professionals declare income at a fixed rate without maintaining detailed books. A tax audit becomes necessary specifically when a taxpayer eligible for one of these schemes claims profit below that fixed rate, since the Income Tax Department then needs to verify the lower figure.
            </p>
            <DataTable
              caption="Presumptive scheme conditions that trigger Section 44AB."
              minWidth={700}
              cols={[{ label: 'Section' }, { label: 'Normal presumptive rate' }, { label: 'Tax audit trigger' }]}
              rows={[
                ['44AD (business)', '6% of digital turnover, 8% of cash turnover', 'Declares lower profit and income exceeds exemption limit, or turnover exceeds Rs 2 crore'],
                ['44ADA (profession)', '50% of gross receipts', 'Declares lower profit and income exceeds exemption limit'],
                ['44AE (goods carriages)', 'Fixed amount per vehicle per month', 'Claims lower income than the prescribed presumptive amount'],
                ['44BB / 44BBB (non-resident/foreign co.)', 'Fixed percentage of specified receipts', 'Claims lower income than the prescribed presumptive amount'],
              ]}
            />
            <p style={pStyle}>
              There is also a five-year lock-in under Section 44AD: once an eligible business declares income under the presumptive scheme and then opts out by declaring lower profit in any of the following five years, it cannot go back to presumptive taxation for the remaining years of that block, and a tax audit applies for each year within that lock-in where income exceeds the basic exemption limit.
            </p>

            <h2 id="other-laws" style={hStyle}>Accounts Already Audited Under Another Law</h2>
            <p style={pStyle}>
              If a taxpayer is required by any other law, such as the Companies Act, 2013 or the LLP Act, 2008, to get accounts audited, a second independent tax audit is not required. It is enough to get the accounts audited under that other law before the due date and furnish that audit report, along with a further report by an accountant, in the form prescribed under Section 44AB.
            </p>
            <p style={pStyle}>
              In practice, this is where Form 3CA comes in: it lets a company or LLP attach its existing statutory audit report and simply add the Form 3CD particulars on top, rather than duplicating the full examination of books that a statutory audit already covered.
            </p>

            <h2 id="forms" style={hStyle}>Form 3CA, Form 3CB, Form 3CD and Form 3CE Explained</h2>
            <p style={pStyle}>
              The tax auditor furnishes the audit report in one of two forms depending on whether the taxpayer&apos;s accounts are already audited under another law, and every audit report is accompanied by Form 3CD, the detailed statement of particulars.
            </p>
            <DataTable
              caption="Which audit report form applies, and what Form 3CD and 3CE cover."
              minWidth={700}
              cols={[{ label: 'Form' }, { label: 'When used' }]}
              rows={[
                ['Form 3CA', 'Person carrying on business or profession is already required to get accounts audited under another law (e.g. Companies Act)'],
                ['Form 3CB', 'Person is not required to get accounts audited under any other law'],
                ['Form 3CD', 'Detailed statement of particulars (depreciation, disallowances, TDS compliance, related-party transactions, GST data) filed with either 3CA or 3CB'],
                ['Form 3CE', 'Non-residents and foreign companies receiving royalty or fees for technical services from the government or an Indian concern'],
              ]}
            />
            <p style={pStyle}>
              Under the Income-tax Rules, 2026 framed for the Income-tax Act, 2025, Forms 3CA, 3CB and 3CD have been consolidated into a single Form 26 for income earned from 1 April 2026 onward. Income earned up to 31 March 2026, reported in the return for AY 2026-27, is still governed by the existing Form 3CA/3CB and 3CD under the 1961 Act, which is what this guide covers.
            </p>

            <PromoBar name="Income Tax Calculator" desc="Work out your total tax liability under both regimes before you decide how to structure income." href="/calculators/income-tax-calculator" />

            <h2 id="who-can-audit" style={hStyle}>Who Can Conduct a Tax Audit Under Section 44AB?</h2>
            <p style={pStyle}>
              Only a Chartered Accountant holding a valid Certificate of Practice, as defined under Section 288(2) of the Income Tax Act, is eligible to conduct a tax audit. The audit has to follow the standards issued by the Institute of Chartered Accountants of India.
            </p>
            <p style={pStyle}>
              Independence is mandatory, so certain people cannot be appointed as the tax auditor for a given entity: an internal auditor of that same entity, a person disqualified under the Chartered Accountants Act, and anyone holding a substantial interest in the business being audited.
            </p>

            <h2 id="due-dates" style={hStyle}>Tax Audit Due Dates for FY 2025-26 (AY 2026-27)</h2>
            <p style={pStyle}>
              The due date to complete and file the tax audit report for FY 2025-26 is 30th September 2026 for most taxpayers. Where the taxpayer has entered into an international transaction and is covered by the transfer pricing audit under Section 92E, the due date extends to 31st October 2026. The income tax return itself is due by 31st October 2026 for taxpayers subject to tax audit.
            </p>
            <DataTable
              caption="Key due dates for FY 2025-26 (AY 2026-27)."
              minWidth={560}
              cols={[{ label: 'Compliance' }, { label: 'Due date' }]}
              rows={[
                ['Tax audit report (standard)', '30 September 2026'],
                ['Tax audit report (Section 92E transfer pricing cases)', '31 October 2026'],
                ['ITR filing (taxpayers subject to tax audit)', '31 October 2026'],
              ]}
            />

            <h2 id="how-to-file" style={hStyle}>How and When Tax Audit Reports Are Furnished</h2>
            <p style={pStyle}>
              The tax auditor furnishes the audit report online, logging into the income tax portal in the capacity of a Chartered Accountant. The taxpayer separately adds the CA&apos;s details against their own account so the auditor can attach the report to the right taxpayer.
            </p>
            <p style={pStyle}>
              Once uploaded, the taxpayer must either accept or reject the report from their own portal login. If it is rejected for any reason, the auditor has to correct and re-upload it, and the acceptance step repeats until the taxpayer accepts the report before the due date.
            </p>

            <h2 id="penalty" style={hStyle}>Penalty for Non-Filing or Delay Under Section 271B</h2>
            <p style={pStyle}>
              If a taxpayer required to get a tax audit done fails to do so, or files the audit report late, Section 271B levies the lower of 0.5% of total sales, turnover or gross receipts, or Rs 1,50,000. Budget 2026 reclassified this amount from a penalty to a fee specifically to reduce litigation, though the computation itself is unchanged.
            </p>
            <DataTable
              caption="Section 271B fee calculation for non-compliance."
              minWidth={500}
              cols={[{ label: 'Basis' }, { label: 'Amount' }]}
              rows={[
                ['0.5% of turnover/gross receipts', 'Varies by turnover'],
                ['Fixed cap', 'Rs 1,50,000'],
                ['Amount actually levied', 'Lower of the two above'],
              ]}
            />
            <p style={pStyle}>
              No fee is levied if the taxpayer demonstrates a reasonable cause for the delay under Section 273B, covered next.
            </p>

            <h2 id="reasonable-cause" style={hStyle}>Reasonable Cause Exceptions Accepted by Tribunals and Courts</h2>
            <p style={pStyle}>
              Section 273B protects a taxpayer from the Section 271B fee if they can show a reasonable cause for missing the deadline. Tribunals and courts have repeatedly accepted a specific set of circumstances.
            </p>
            <BulletList
              items={[
                <span key="r1"><strong style={{ color: C.ink }}>Natural calamities</strong> that disrupted business operations or record-keeping.</span>,
                <span key="r2"><strong style={{ color: C.ink }}>Sudden resignation of the tax auditor,</strong> leaving insufficient time to appoint a replacement.</span>,
                <span key="r3"><strong style={{ color: C.ink }}>Resignation of accountants or key employees</strong> responsible for maintaining the books.</span>,
                <span key="r4"><strong style={{ color: C.ink }}>Extended labour problems,</strong> such as strikes or lock-outs, that halted normal operations.</span>,
                <span key="r5"><strong style={{ color: C.ink }}>Loss of accounting records</strong> due to theft, fire or other circumstances beyond the taxpayer&apos;s control.</span>,
                <span key="r6"><strong style={{ color: C.ink }}>Physical inability or death</strong> of the partner or person in charge of the accounts.</span>,
              ]}
            />
            <p style={pStyle}>
              Each case is examined individually, and the burden is on the taxpayer to demonstrate the cause with supporting evidence rather than merely claiming it in the return.
            </p>

            <h2 id="tax-audit-vs-statutory" style={hStyle}>Tax Audit vs Statutory Audit: What's the Difference?</h2>
            <p style={pStyle}>
              A tax audit under Section 44AB exists purely to verify income tax compliance and applies only once turnover or receipt limits are crossed. A statutory audit is required under a separate law, most commonly the Companies Act, 2013, regardless of turnover, and it verifies that financial statements present a true and fair view for shareholders and regulators.
            </p>
            <DataTable
              caption="Tax audit (Section 44AB) compared with statutory audit."
              minWidth={720}
              cols={[{ label: 'Basis' }, { label: 'Tax audit' }, { label: 'Statutory audit' }]}
              rows={[
                ['Governing law', 'Section 44AB, Income Tax Act', 'Companies Act, LLP Act or other applicable law'],
                ['Objective', 'Verify tax compliance and computation', 'True and fair view of financial statements'],
                ['Applicability', 'Only if turnover/receipts cross prescribed limit', 'Mandatory for companies regardless of turnover'],
                ['Report format', 'Form 3CA/3CB with Form 3CD', 'Format prescribed under the governing law'],
                ['Filed with', 'Income tax e-filing portal', 'Shareholders, Registrar of Companies or relevant regulator'],
              ]}
            />

            <h2 id="mistakes" style={hStyle}>Common Mistakes in Section 44AB Compliance</h2>
            <p style={pStyle}>
              Most tax audit notices trace back to a handful of avoidable errors in how turnover is calculated or how the audit report is filed.
            </p>
            <BulletList
              items={[
                <span key="m1"><strong style={{ color: C.ink }}>Miscounting cash transactions:</strong> treating a non-account-payee cheque as a non-cash receipt when calculating the 5% test for the Rs 10 crore limit.</span>,
                <span key="m2"><strong style={{ color: C.ink }}>Missing the opt-out lock-in:</strong> forgetting that declaring lower profit after using Section 44AD triggers a tax audit for the remaining years of the five-year block.</span>,
                <span key="m3"><strong style={{ color: C.ink }}>Delayed auditor appointment:</strong> waiting too close to the due date to engage a Chartered Accountant, leaving no time to correct errors flagged during the audit.</span>,
                <span key="m4"><strong style={{ color: C.ink }}>Incorrect Form 3CD particulars:</strong> errors in depreciation, disallowances or related-party disclosures that do not match the books or the return.</span>,
                <span key="m5"><strong style={{ color: C.ink }}>Forgetting to accept the report:</strong> the auditor&apos;s upload alone is not enough; the taxpayer must separately accept it on the portal before the due date.</span>,
                <span key="m6"><strong style={{ color: C.ink }}>GST-income tax turnover mismatch:</strong> reporting a different turnover figure in the tax audit than what GST returns show for the same period, which is one of the first things an assessing officer checks.</span>,
              ]}
            />


            <h2 id="faq" style={hStyle}>Frequently Asked Questions on Section 44AB Tax Audit</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          <aside
            className="s44ab-sidebar"
            style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><KeyLimits /></div>
            <div style={{ flexShrink: 0 }}><FormsSnapshot /></div>
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
        .s44ab-sidebar::-webkit-scrollbar { width: 5px; }
        .s44ab-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s44ab-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s44ab-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

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

const SLUG = 'tds-tax-deducted-at-source';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const PUBLISHED = '2026-10-12T11:05:19+05:30';
const INCOME_TAX_DEPT = 'https://www.incometax.gov.in';
const TRACES = 'https://www.tdscpc.gov.in';

export const metadata: Metadata = {
  title: 'TDS: Meaning, Due Dates, Returns and Penalty (FY 2026-27)',
  description: 'TDS explained: what it is, who deducts it, deposit due dates (7th of next month), quarterly return dates, Form 16 and 26AS, the Rs 200 a day late fee, and how to claim a refund.',
  keywords: 'tds, tds meaning, tax deducted at source, tds due dates, tds due date, tds return due date, tds return filing, tds filing, form 16, form 16a, form 26as, form 26q, form 24q, tds late fee section 234e, tds rate, tds calculator, tds certificate, tds refund, form 15g, form 15h, form 121, tds vs income tax, income tax form, itr filing',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'TDS Explained: Meaning, Due Dates, Returns, Form 16 and Penalty | Fermor',
    description: 'How TDS works, when to deposit it, when to file the quarterly return, how to read Form 26AS and what late filing costs.',
    type: 'article',
    url: PAGE_URL,
    publishedTime: PUBLISHED,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDS Explained: Meaning, Due Dates, Returns, Form 16 and Penalty | Fermor',
    description: 'TDS deposit and return due dates, certificates, Form 26AS and late fees in one guide.',
  },
};

const faqItems = [
  { q: `What is TDS?`, a: `TDS (Tax Deducted at Source) is income tax that the person making a specified payment deducts before paying you, and deposits with the government on your behalf. It applies to salary, interest, rent, commission, professional fees and similar payments.` },
  { q: `What is the full form of TDS?`, a: `TDS stands for Tax Deducted at Source. The tax is collected at the point where the income arises, rather than waiting for the recipient to pay it later.` },
  { q: `Who is liable to deduct TDS?`, a: `Any person making a specified payment above the prescribed threshold is liable to deduct TDS and deposit it with the government. This includes employers, banks, companies, firms and, for certain payments such as rent above Rs 50,000 a month, even individuals and HUFs.` },
  { q: `What is the due date to deposit TDS?`, a: `TDS must be deposited by the 7th of the month following the month of deduction. TDS deducted in March is the exception and can be deposited up to 30 April.` },
  { q: `What are the due dates for filing TDS returns in FY 2026-27?`, a: `Quarterly TDS returns are due on 31 July 2026 for Q1, 31 October 2026 for Q2, 31 January 2027 for Q3 and 31 May 2027 for Q4. These dates are the same for the salary return (Form 24Q) and the non-salary return (Form 26Q).` },
  { q: `Can TDS deducted in March be deposited by 31 May?`, a: `No. The deposit deadline for March TDS is 30 April. The 31 May date is the due date for filing the Q4 TDS return, which is a separate obligation, and some guides confuse the two.` },
  { q: `What is the penalty for filing a TDS return late?`, a: `A late fee of Rs 200 a day applies under Section 234E until the return is filed, capped at the total TDS amount in that return. The fee must be paid before the return is accepted.` },
  { q: `Is there any other penalty for TDS return defaults?`, a: `Yes. Under Section 271H, a penalty of Rs 10,000 to Rs 1,00,000 can be levied if the return is not filed within one year of the due date or contains incorrect information. Interest also applies at 1% a month for late deduction and 1.5% a month for late deposit.` },
  { q: `What is Form 16?`, a: `Form 16 is the TDS certificate an employer issues to an employee showing salary paid and tax deducted and deposited during the year. It is due by 15 June after the financial year ends. Under the Income-tax Act, 2025 the salary certificate is Form 130.` },
  { q: `What is the difference between Form 16 and Form 16A?`, a: `Form 16 certifies TDS on salary and is issued once a year. Form 16A certifies TDS on non-salary payments such as interest, commission or professional fees and is issued quarterly, within 15 days of the due date for filing the quarterly return.` },
  { q: `What is Form 26AS?`, a: `Form 26AS is a consolidated tax statement tied to your PAN that lists all TDS, TCS, advance tax and self-assessment tax credited to you. You can claim credit in your ITR only for tax that appears there or in the AIS. The statement is called Form 168 under the new Act.` },
  { q: `What should I do if TDS is deducted but missing from Form 26AS?`, a: `Contact the deductor and check that they filed the TDS return and quoted your PAN correctly. Credit can be claimed only after the amount reflects in Form 26AS or the AIS, so do not file your ITR against a figure that has not been reported.` },
  { q: `What is the TDS rate if I do not give my PAN?`, a: `If you do not furnish a PAN, TDS is deducted at the higher of the normal rate, the rate in force, or 20%, under Section 206AA. This can sharply cut the cash you receive.` },
  { q: `Can I claim a refund of TDS?`, a: `Yes. If the total TDS deducted in the year exceeds your actual tax liability, you claim the excess as a refund by filing your ITR. You cannot ask the Income Tax Department to reverse the deduction directly.` },
  { q: `How can I avoid TDS if my income is below the taxable limit?`, a: `Submit Form 15G (below 60 years) or Form 15H (senior citizens) to the deductor, declaring that your estimated total tax liability for the year is nil. Under the Income-tax Act, 2025 both are replaced by a single declaration, Form 121.` },
  { q: `Can I submit Form 15G or 15H after TDS has already been deducted?`, a: `No. The declaration only prevents future deductions. TDS already deducted can only be recovered as a refund when you file your ITR.` },
  { q: `What is the difference between TDS and income tax?`, a: `TDS is a method of collecting income tax in advance at the time of payment, while income tax is the final tax computed on your total income for the year. The TDS you bear is adjusted against your final liability.` },
  { q: `What is the difference between TDS and advance tax?`, a: `TDS is deducted and deposited by the payer on your behalf, while advance tax is paid by you directly in instalments during the year when your liability exceeds Rs 10,000. Both count as credit against your final tax.` },
  { q: `What is the TDS rate on salary?`, a: `There is no flat rate. The employer estimates your total tax for the year at slab rates under the regime you have chosen and deducts it in monthly instalments. This works out to your average rate of tax on estimated income.` },
  { q: `Is TDS deducted on savings account interest?`, a: `Banks generally do not deduct TDS on savings account interest, but the interest is taxable and must be reported in your ITR. TDS applies on fixed deposit interest above Rs 50,000 a year (Rs 1,00,000 for senior citizens).` },
  { q: `How do I find the TDS rate for a payment?`, a: `Look up the section for the payment type and read its threshold and rate. The TDS rate chart for FY 2026-27 lists every section, and the TDS Calculator works out the exact deduction for you.` },
  { q: `Which Income Tax Act section governs TDS from April 2026?`, a: `The Income-tax Act, 2025 consolidates salary TDS into Section 392 and all non-salary TDS into Section 393 from 1 April 2026. Deposit and return due dates are unchanged, and most people still refer to sections by their old numbers such as 194C or 194J.` },
  { q: `What is Fermor?`, a: `Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on tax provisions that affect businesses, professionals, and salaried taxpayers.` },
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
  headline: 'TDS (Tax Deducted at Source): Meaning, Due Dates, Returns, Form 16 and Penalty',
  url: PAGE_URL,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    { '@type': 'Thing', name: 'Tax Deducted at Source' },
    { '@type': 'Thing', name: 'TDS return filing' },
    { '@type': 'Thing', name: 'Form 16 and Form 26AS' },
  ],
  description: 'Plain-language guide to TDS: what it is, who deducts it, the 7th-of-next-month deposit deadline and the 30 April exception for March, quarterly return due dates for FY 2026-27, Form 24Q and 26Q, TDS certificates, how to read Form 26AS, the Rs 200 a day Section 234E late fee, TDS versus income tax and advance tax, and how to avoid or recover excess TDS.',
  articleSection: 'Income Tax',
  keywords: metadata.keywords as string,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'TDS Explained', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Deduct, Deposit and Report TDS',
  description: 'The compliance cycle a deductor follows for every TDS payment, from deduction to certificate.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Check the section and threshold', text: 'Identify the section that applies to the payment and confirm the amount has crossed its threshold.' },
    { '@type': 'HowToStep', position: 2, name: 'Deduct at the right rate', text: 'Deduct TDS at the prescribed rate, or at 20% if the payee has not given a PAN.' },
    { '@type': 'HowToStep', position: 3, name: 'Deposit by the 7th of next month', text: 'Pay through Challan 281 on the e-filing portal by the 7th of the next month, or by 30 April for March deductions.' },
    { '@type': 'HowToStep', position: 4, name: 'File the quarterly TDS return', text: 'File Form 24Q for salary or Form 26Q for other payments by 31 July, 31 October, 31 January and 31 May.' },
    { '@type': 'HowToStep', position: 5, name: 'Issue the TDS certificate', text: 'Issue Form 16 for salary by 15 June and Form 16A for other payments within 15 days of the return due date.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: 'TDS (Tax Deducted at Source): Meaning, Due Dates, Returns and Penalty | Fermor',
  url: PAGE_URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Tax Deducted at Source',
      alternateName: 'TDS',
      description: 'A mechanism under the Income Tax Act where the person paying specified income such as salary, interest, rent or professional fees deducts tax at the time of payment and deposits it with the government on the recipient\'s behalf.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, freelancers, businesses and tax professionals in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-tds', name: 'What Is TDS' },
    { '@type': 'WebPageElement', cssSelector: '#how-tds-works', name: 'How TDS Works' },
    { '@type': 'WebPageElement', cssSelector: '#applicability', name: 'Where TDS Applies' },
    { '@type': 'WebPageElement', cssSelector: '#due-dates', name: 'TDS Due Dates' },
    { '@type': 'WebPageElement', cssSelector: '#returns', name: 'TDS Returns' },
    { '@type': 'WebPageElement', cssSelector: '#certificates', name: 'TDS Certificates' },
    { '@type': 'WebPageElement', cssSelector: '#form-26as', name: 'Form 26AS' },
    { '@type': 'WebPageElement', cssSelector: '#penalty', name: 'Late Fee and Penalty' },
    { '@type': 'WebPageElement', cssSelector: '#tds-vs-income-tax', name: 'TDS vs Income Tax' },
    { '@type': 'WebPageElement', cssSelector: '#avoid-and-refund', name: 'Avoiding TDS and Claiming a Refund' },
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
  knowsAbout: ['TDS', 'Tax Deducted at Source', 'Form 16', 'Form 26AS', 'TDS Return Filing', 'Section 234E', 'Section 393'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const linkStyle: React.CSSProperties = { color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 };

const TOC_ITEMS = [
  { id: 'what-is-tds', label: 'What Is TDS' },
  { id: 'how-tds-works', label: 'How TDS Works' },
  { id: 'applicability', label: 'Where TDS Applies' },
  { id: 'when-deducted', label: 'When to Deduct' },
  { id: 'due-dates', label: 'TDS Due Dates' },
  { id: 'returns', label: 'TDS Return Forms' },
  { id: 'certificates', label: 'TDS Certificates' },
  { id: 'form-26as', label: 'Form 26AS and AIS' },
  { id: 'penalty', label: 'Late Fee and Penalty' },
  { id: 'tds-vs-income-tax', label: 'TDS vs Income Tax' },
  { id: 'avoid-and-refund', label: 'Avoid TDS, Claim Refund' },
  { id: 'paying-tds', label: 'Deposit TDS Online' },
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

function PromoBar({ href, label, note }: { href: string; label: string; note: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains TDS for general informational purposes and is not tax advice. Rates, thresholds, due dates and form numbers can change through notifications, and the Income-tax Act, 2025 renumbers sections and forms from 1 April 2026. Verify the current position on the Income Tax Department website or with a chartered accountant before deducting, depositing or filing. Figures reflect the law as of the date above.
      </p>
    </div>
  );
}

export default function TdsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />

      <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '10px 24px' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3 }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>TDS Explained</li>
            </ol>
          </nav>
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              TDS
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime={PUBLISHED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 12, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            TDS (Tax Deducted at Source): Meaning, Due Dates, Returns and Penalty
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              TDS (Tax Deducted at Source) is income tax that the person paying you deducts at the time of payment and deposits with the government on your behalf.
            </p>
            <p style={pStyle}>
              The deductor deposits it by the 7th of the next month and files a quarterly return, and you claim credit for it through Form 26AS when you file your ITR.
            </p>
            <p style={pStyle}>
              This guide covers how TDS works, the FY 2026-27 due dates, returns, certificates, the Rs 200 a day late fee, and how to recover excess TDS.
            </p>

            <TableOfContents />

            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for TDS"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing, Form 26AS, AIS)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={linkStyle}>incometax.gov.in</Link>],
                  ['TRACES (TDS returns, certificates, corrections)', <Link key="l2" href={TRACES} target="_blank" rel="noopener noreferrer" style={linkStyle}>tdscpc.gov.in</Link>],
                  ['Section-wise TDS rates and thresholds', <Link key="l3" href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS Rate Chart FY 2026-27</Link>],
                  ['Calculate the exact TDS on a payment', <Link key="l4" href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS Calculator</Link>],
                ]}
              />
            </div>

            <h2 id="what-is-tds" style={hStyle}>What Is TDS (Tax Deducted at Source)?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                TDS is a tax collection mechanism under the Income Tax Act where tax is deducted from specified payments at the time they are made, such as salary, interest, rent, commission and professional fees.
              </p>
            </div>
            <p style={pStyle}>
              The government gets its tax early and the payer, not the recipient, carries the compliance load. The recipient simply receives the net amount and claims credit for the tax deducted.
            </p>
            <BulletList items={[
              'TDS applies to specified payments once they cross a threshold.',
              'The deducted tax is a credit against your final tax, not an extra cost.',
              'Excess TDS is refunded when you file your ITR.',
              'Form 15G, 15H or Form 121 can stop deduction if your tax liability is nil.',
              'Form 26AS shows every TDS credit against your PAN.',
            ]} />

            <h2 id="how-tds-works" style={hStyle}>How Does TDS Work? A Worked Example</h2>
            <p style={pStyle}>
              The payer deducts tax at the prescribed rate, pays the balance to the recipient, deposits the tax with the government, and reports it on a quarterly return.
            </p>
            <p style={pStyle}>
              Take a company paying Rs 80,000 a month in office rent. Rent above Rs 50,000 a month attracts TDS at 10% under Section 194-I.
            </p>
            <InfoTable
              caption="TDS on monthly rent of Rs 80,000"
              headers={['Step', 'Amount']}
              rows={[
                ['Gross rent', 'Rs 80,000'],
                ['TDS deducted at 10%', 'Rs 8,000'],
                ['Net paid to the landlord', 'Rs 72,000'],
                ['Income the landlord reports', 'Rs 80,000 (the gross amount)'],
                ['Credit the landlord claims against final tax', 'Rs 8,000'],
              ]}
            />
            <p style={pStyle}>
              The landlord adds the full Rs 80,000 to income and sets off the Rs 8,000 against the final liability. The company deposits the Rs 8,000 by the 7th of the following month.
            </p>

            <h2 id="applicability" style={hStyle}>On Which Payments Is TDS Deducted?</h2>
            <p style={pStyle}>
              TDS applies to a long list of payments, and each has its own section, threshold and rate. The most common ones are below.
            </p>
            <InfoTable
              caption="Common TDS sections (old numbering, still used on returns)"
              headers={['Section', 'Payment', 'Typical rate']}
              rows={[
                ['192', 'Salary', 'Slab rates'],
                ['194', 'Dividend', '10%'],
                ['194A', 'Interest other than on securities', '10%'],
                ['194B', 'Winnings from lottery, games and gambling', '30%'],
                ['194C', 'Payments to contractors', '1% (individual/HUF), 2% (others)'],
                ['194H', 'Commission or brokerage', '2%'],
                ['194-I', 'Rent', '2% (machinery), 10% (land, building)'],
                ['194J', 'Professional and technical fees', '10% or 2%'],
                ['194N', 'Cash withdrawal above the limit', '2% or 5%'],
              ]}
            />
            <p style={pStyle}>
              Thresholds and the full list, including the 194T rule for partners, sit in the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS rate chart for FY 2026-27</Link>. Contractor payments are explained in the <Link href="/blogs/section-194c-tds-on-contractors" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 194C guide</Link>. The professional fees rules have their own <Link href="/blogs/section-194j-tds-professional-fees" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 194J guide</Link>, and rent is covered in the <Link href="/blogs/section-194i-tds-on-rent" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 194I guide</Link>.
            </p>

            <h2 id="when-deducted" style={hStyle}>When Must TDS Be Deducted?</h2>
            <p style={pStyle}>
              TDS must be deducted at the earlier of the date the amount is credited in the books or the date it is actually paid. For salary, it is deducted at the time of payment.
            </p>
            <p style={pStyle}>
              If the payee has not given a valid PAN, the deduction is at the higher of the normal rate or 20% under Section 206AA.
            </p>

            <PromoBar
              href="/calculators/tds-calculator"
              label="TDS Calculator"
              note="Pick the payment type, enter the amount and see the TDS to deduct and the net payout."
            />

            <h2 id="due-dates" style={hStyle}>TDS Due Dates for FY 2026-27</h2>
            <p style={pStyle}>
              TDS must be deposited by the 7th of the month following the month of deduction, and the quarterly return is due by 31 July, 31 October, 31 January and 31 May.
            </p>
            <InfoTable
              caption="TDS deposit due dates"
              headers={['Situation', 'Deposit due date']}
              rows={[
                ['TDS deducted in April to February', '7th of the following month'],
                ['TDS deducted in March', '30 April'],
                ['TDS on property purchase (Form 26QB)', '30 days from the end of the month of deduction'],
                ['TDS on rent by individuals (Form 26QC)', '30 days from the end of the month of deduction'],
              ]}
            />
            <p style={pStyle}>
              Some guides state that March TDS can be deposited by 31 May. That date is the Q4 return deadline, not the deposit deadline, and depositing in May would attract interest.
            </p>
            <InfoTable
              caption="Quarterly TDS return due dates for FY 2026-27"
              headers={['Quarter', 'Period', 'Return due date']}
              rows={[
                ['Q1', 'April to June 2026', '31 July 2026'],
                ['Q2', 'July to September 2026', '31 October 2026'],
                ['Q3', 'October to December 2026', '31 January 2027'],
                ['Q4', 'January to March 2027', '31 May 2027'],
              ]}
            />
            <p style={pStyle}>
              Missing a due date attracts interest and a late fee. The <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing last date</Link> that applies to the recipient is a separate deadline.
            </p>

            <h2 id="returns" style={hStyle}>TDS Return Forms: 24Q, 26Q, 27Q, 26QB and 26QC</h2>
            <p style={pStyle}>
              A TDS return is a quarterly statement listing the TAN, the tax deducted, the nature of payment and each deductee&apos;s PAN, filed on TRACES or the e-filing portal. The form depends on what was paid.
            </p>
            <InfoTable
              caption="TDS return forms and what they report"
              headers={['Form', 'Reports', 'Due date']}
              rows={[
                ['Form 24Q', 'TDS on salary', 'Quarterly: 31 Jul, 31 Oct, 31 Jan, 31 May'],
                ['Form 26Q', 'TDS on all payments except salary, to residents', 'Quarterly: 31 Jul, 31 Oct, 31 Jan, 31 May'],
                ['Form 27Q', 'TDS on payments to non-residents except salary', 'Quarterly: 31 Jul, 31 Oct, 31 Jan, 31 May'],
                ['Form 26QB', 'TDS on sale of property', '30 days from the end of the month of deduction'],
                ['Form 26QC', 'TDS on rent', '30 days from the end of the month of deduction'],
              ]}
            />
            <p style={pStyle}>
              From FY 2026-27, the Income-tax Rules, 2026 introduce new form numbers, with the salary return becoming Form 138 and the main non-salary return Form 140. The older names remain the ones most deductors and software still use, so confirm the number on TRACES before you file.
            </p>

            <h2 id="certificates" style={hStyle}>TDS Certificates: Form 16, 16A, 16B and 16C</h2>
            <p style={pStyle}>
              A TDS certificate is the document the deductor gives you to prove the tax they deducted and deposited, and Form 16 is the one salaried employees receive.
            </p>
            <InfoTable
              caption="TDS certificates and their due dates"
              headers={['Form', 'Certifies', 'Frequency', 'Due date']}
              rows={[
                ['Form 16', 'TDS on salary', 'Yearly', '15 June after the financial year'],
                ['Form 16A', 'TDS on non-salary payments', 'Quarterly', '15 days from the due date of the return'],
                ['Form 16B', 'TDS on sale of property', 'Every transaction', '15 days from the due date of the challan-cum-statement'],
                ['Form 16C', 'TDS on rent', 'Every transaction', '15 days from the due date of the challan-cum-statement'],
              ]}
            />
            <p style={pStyle}>
              The <Link href="/blogs/form-16" target="_blank" rel="noopener noreferrer" style={linkStyle}>Form 16 guide</Link> covers download, password and issue date. Under the Income-tax Act, 2025 the salary certificate is Form 130 and the non-salary one is Form 131. Use the certificate to cross-check the TDS in Form 26AS before you file your <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>income tax</Link> return.
            </p>

            <h2 id="form-26as" style={hStyle}>How to Check TDS Credit in Form 26AS and AIS</h2>
            <p style={pStyle}>
              Form 26AS is the consolidated statement of all tax credited against your PAN, and you can claim TDS credit in your ITR only for amounts that appear in it or in the AIS.
            </p>
            <BulletList items={[
              'Log in at incometax.gov.in and open the tax credit statement for the assessment year.',
              'Compare each entry with your Form 16 or Form 16A.',
              'Check the Annual Information Statement for interest, dividends and securities transactions reported by third parties.',
              'If TDS is missing, ask the deductor to file a correction and confirm they quoted your PAN correctly.',
            ]} />
            <p style={pStyle}>
              Reconciling before filing prevents a mismatched claim and the notices that follow. This matters most for businesses whose several clients each deduct TDS.
            </p>

            <h2 id="penalty" style={hStyle}>Late Fee and Penalty for TDS Defaults</h2>
            <p style={pStyle}>
              A late fee of Rs 200 a day applies under Section 234E for filing a TDS return after the due date, capped at the total TDS amount in that return. The fee must be paid before the return is filed.
            </p>
            <InfoTable
              caption="Consequences of TDS defaults"
              headers={['Default', 'Consequence']}
              rows={[
                ['Return filed late', 'Rs 200 a day under Section 234E, up to the TDS amount'],
                ['Return not filed within a year, or incorrect', 'Penalty of Rs 10,000 to Rs 1,00,000 under Section 271H'],
                ['TDS not deducted', 'Interest at 1% a month, and 30% of the expense disallowed'],
                ['TDS deducted but deposited late', 'Interest at 1.5% a month'],
                ['TDS not deposited at all', 'Prosecution risk, and the deductor is treated as in default'],
              ]}
            />
            <p style={pStyle}>
              Interest is charged per month or part of a month, so a one-day delay costs a full month. The full interest and penalty rules are in the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS rate chart</Link>.
            </p>

            <h2 id="tds-vs-income-tax" style={hStyle}>TDS vs Income Tax vs Advance Tax</h2>
            <p style={pStyle}>
              TDS is a way of collecting income tax in advance, while income tax is the final amount due on your total income, so TDS is simply credited against it.
            </p>
            <InfoTable
              caption="How TDS differs from income tax and advance tax"
              headers={['Basis', 'TDS', 'Income tax', 'Advance tax']}
              rows={[
                ['What it is', 'Tax deducted at the time of payment', 'Final tax on total income', 'Tax you pay yourself during the year'],
                ['Who pays', 'The payer deposits it for you', 'You, on your total income', 'You, in instalments'],
                ['Who files', 'Deductor files TDS returns', 'You file the ITR annually', 'Reported in your ITR'],
                ['Treatment', 'Credited against final liability', 'Final liability after credits', 'Credited against final liability'],
              ]}
            />


            <h2 id="avoid-and-refund" style={hStyle}>How to Avoid Excess TDS or Claim a Refund</h2>
            <p style={pStyle}>
              You can stop TDS before it happens by submitting a nil-tax declaration, and recover any excess afterwards by filing your ITR.
            </p>
            <BulletList items={[
              <span key="a1"><strong>Form 15G or 15H:</strong> give it to the bank or payer at the start of the year if your total tax liability will be nil. Form 15H is for senior citizens, and Form 121 replaces both under the new Act.</span>,
              <span key="a2"><strong>Lower deduction certificate:</strong> apply to the assessing officer for a lower or nil rate if your actual tax is less than the TDS rate.</span>,
              <span key="a3"><strong>Refund through the ITR:</strong> if total TDS exceeds your final tax, claim the difference when you file. The refund is credited to your bank account after processing.</span>,
              <span key="a4"><strong>Quote your PAN:</strong> giving the PAN avoids the 20% no-PAN rate.</span>,
            ]} />
            <p style={pStyle}>
              A declaration cannot undo TDS already deducted. It works only for future payments, so submit it before the interest is credited or the payment is made.
            </p>

            <h2 id="paying-tds" style={hStyle}>How to Deposit TDS Online</h2>
            <p style={pStyle}>
              The deductor deposits TDS through Challan 281 on the e-filing portal and notes the CIN for the quarterly return. The steps are laid out in the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS rate chart guide on paying TDS online</Link>.
            </p>

            <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, lineHeight: 1.65, marginTop: 8, marginBottom: 20 }}>
              Partnership firms also owe TDS on payments to their partners, covered in the <Link href="/blogs/partners-remuneration-section-40b" target="_blank" rel="noopener noreferrer" style={linkStyle}>partner&apos;s remuneration guide</Link>.
            </p>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions: TDS</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          <aside
            className="tds-sidebar"
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
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20, flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['Deposit (Apr to Feb)', '7th of next month'],
                ['Deposit (March)', '30 April'],
                ['Q1 return', '31 July'],
                ['Q2 return', '31 October'],
                ['Q3 return', '31 January'],
                ['Q4 return', '31 May'],
                ['Form 16', '15 June'],
                ['Late fee (234E)', 'Rs 200 a day'],
                ['No PAN rate', '20% minimum'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Tax Calculators</div>
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/advance-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Advance Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/tds-rate-chart', 'TDS Rate Chart FY 2026-27'],
                ['/blogs/section-194j-tds-professional-fees', 'Section 194J TDS on Professional Fees'],
                ['/blogs/form-16', 'Form 16: Download and Guide'],
                ['/blogs/section-194i-tds-on-rent', 'Section 194I TDS on Rent'],
                ['/blogs/partners-remuneration-section-40b', 'Partner\'s Remuneration and Section 40(b)'],
              ] as [string, string][]).map(([href, title], i, arr) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
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
        .tds-sidebar::-webkit-scrollbar { width: 5px; }
        .tds-sidebar::-webkit-scrollbar-track { background: transparent; }
        .tds-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .tds-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

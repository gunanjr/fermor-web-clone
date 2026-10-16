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
  green:  '#166534',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

export const metadata: Metadata = {
  title: 'TDS Rate Chart FY 2026-27: Section 393 Rates, Thresholds, New Act Changes',
  description: 'TDS rate chart for FY 2026-27 under the new Income Tax Act 2025 (Section 393): every section, threshold and rate for salary, rent, commission, professional fees, contractors, property, FD interest and NRI payments, plus how to pay TDS online, late-payment interest, and the TCS chart.',
  alternates: { canonical: 'https://fermor.in/blogs/tds-rate-chart' },
  openGraph: {
    title: 'TDS Rate Chart FY 2026-27: Complete Section-Wise Rates and Thresholds - Fermor',
    description: 'Every TDS section, rate and threshold for FY 2026-27 under Section 393 of the Income Tax Act 2025, plus TCS rates, Challan 281 payment steps, and late-deduction interest rules.',
    type: 'article',
    url: 'https://fermor.in/blogs/tds-rate-chart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TDS Rate Chart FY 2026-27 - Fermor',
    description: 'Section 393 TDS rates, thresholds, TCS chart, and how to pay TDS online for FY 2026-27.',
  },
  keywords: [
    'tds rate chart', 'tds rate chart pdf', 'tds rate chart fy 2026-27', 'current tds rate chart',
    'latest tds rate chart', 'new tds rate chart', 'tds chart', 'tds percentage chart', 'tds section chart',
    'tds slab rates', 'tds deduction chart', 'tds tax rates', 'tds rate', 'tds online', 'deposit tds online',
    'tds paid online', 'tds chart download', 'tds chart for fy 2021-22', 'tds chart for fy 2022-23',
    'tds chart for fy 2020-21', 'salary tds rate chart', '194c tds rate', '194j tds rate', '194h tds rate',
    'commission tds rate', 'tds limit on rent', 'tds on fd interest', 'tds on company', 'tds on sales',
    'tds on service', 'dtaa tds rate chart', 'tcs chart', 'section 393 income tax act 2025', 'tds calculator',
  ],
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'TDS Rate Chart FY 2026-27: Section 393 Rates, Thresholds and New Income Tax Act Changes',
  url: 'https://fermor.in/blogs/tds-rate-chart',
  datePublished: '2026-07-27T20:28:14+05:30',
  dateModified: '2026-08-16T22:45:01+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete TDS rate chart for FY 2026-27 under Section 393 of the Income Tax Act 2025: section-wise rates and thresholds for salary, interest, rent, commission, professional fees, property, e-commerce, NRI payments, a year-by-year rate history back to FY 2020-21, plus TCS chart and Challan 281 payment steps.',
  articleSection: 'TDS',
  keywords: 'tds rate chart, tds rate chart fy 2026-27, tds rate chart pdf, current tds rate chart, latest tds rate chart, tds slab rates, tds percentage chart, tds section chart, tds rate, deposit tds online, tds paid online, tds online, 194c tds rate, 194j tds rate, 194h tds rate, tds chart for fy 2021-22, tds chart for fy 2022-23, tds chart for fy 2020-21, tds limit on rent, tds on fd interest, interest on tds calculator, section 393 income tax act 2025, tds calculator',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const faqItems = [
  { q: 'What is the TDS rate chart for FY 2026-27?', a: 'The TDS rate chart for FY 2026-27 lists the tax rate and threshold limit for every category of payment under Section 393 of the Income Tax Act, 2025 (which replaced the section-wise structure of the 1961 Act from April 1, 2026). Common rates: 10% on professional fees and rent on land/building, 2% on contractor payments and commission, 1% on contractor payments to individuals and on purchase of goods, and slab rates on salary.' },
  { q: 'What changed in TDS rules for FY 2026-27?', a: 'The Income Tax Act, 2025 consolidated all non-salary TDS sections (194, 194A through 194T) into one section, Section 393, built from six tables covering different payment categories. Salary TDS moved to Section 392 and TCS moved to Section 394. The underlying rates and threshold limits are almost entirely unchanged; the change is structural renumbering, not a rate cut or hike.' },
  { q: 'How do I pay TDS online?', a: 'Log in to the Income Tax e-filing portal (incometax.gov.in), go to e-Pay Tax, select Challan 281 (or its Section 393 equivalent), enter your TAN, choose the payment code for the deduction category, and pay via net banking, debit card, or the payment gateway. Save the CIN (Challan Identification Number) since it is required for the quarterly TDS return.' },
  { q: 'What is the TDS limit on rent for FY 2026-27?', a: 'For rent paid by a company, firm, or individual under audit (Section 194-I), TDS applies once rent in any month exceeds Rs 50,000, which works out to Rs 6 lakh a year. The rate is 10% for land, building, and furniture, and 2% for plant and machinery. For an individual or HUF not covered by 194-I, Section 194-IB applies the same Rs 50,000-a-month threshold at a 2% rate.' },
  { q: 'What is the TDS rate on FD interest for FY 2026-27?', a: 'Banks and post offices deduct 10% TDS on fixed deposit interest once it crosses Rs 50,000 in a year for individuals below 60, and Rs 1 lakh for senior citizens. If the depositor does not furnish PAN, the rate rises to 20%. Interest below the threshold has no TDS deducted, though it is still taxable income that must be declared in the ITR.' },
  { q: 'What is the TDS rate under Section 194C for contractors?', a: 'Section 194C applies 1% TDS when the contractor or sub-contractor is an individual or HUF, and 2% for any other entity (company, firm, LLP). It triggers when a single payment exceeds Rs 30,000, or when total payments to the same contractor in the year exceed Rs 1 lakh.' },
  { q: 'What is the TDS rate on professional fees under Section 194J?', a: 'Section 194J(b) deducts 10% on fees for professional services (legal, medical, engineering, accountancy, consultancy) once payments to one payee exceed Rs 50,000 in a year. Section 194J(a) applies a lower 2% rate specifically to technical services, call centre payments, and royalty for the sale or distribution of films, at the same Rs 50,000 threshold.' },
  { q: 'What is the TDS rate on commission and brokerage under Section 194H?', a: 'Section 194H deducts TDS at 2% on commission or brokerage once total payments to one payee cross Rs 20,000 in a financial year. The rate was cut from 5% to 2% effective October 2024, and the threshold was raised from Rs 15,000 to Rs 20,000 effective April 2025; both apply unchanged for FY 2026-27.' },
  { q: 'What is the TDS rate when a seller does not furnish PAN?', a: 'Under Section 206AA (now folded into Section 393), if the payee does not provide a valid PAN, TDS is deducted at the highest of the rate specified in that provision, the rate in force, or 20%. For purchase of goods under Section 194Q specifically, the no-PAN rate is capped at 5% instead of 20%.' },
  { q: 'How is TDS different for NRIs selling property compared to resident sellers?', a: 'A resident seller falls under Section 194-IA: a flat 1% TDS on the sale price, only if it exceeds Rs 50 lakh. An NRI seller falls under Section 195 instead: there is no minimum threshold, TDS applies on the full capital gain (not the sale price), and the rate is 12.5% for long-term gains (property held over 24 months) or the buyer\'s slab rate withholding for short-term gains, before surcharge and cess. NRI sellers can apply for a lower or nil TDS certificate under Section 395 to avoid over-deduction.' },
  { q: 'What is the interest for late deduction or late payment of TDS?', a: 'Interest under Section 201 is 1% per month (or part of a month) for late deduction, calculated from the date TDS was deductible to the date it was actually deducted. For late payment after deduction, interest is 1.5% per month, calculated from the date of deduction to the date of actual deposit. Both are calculated on a monthly basis, not daily, so even a one-day delay counts as a full month.' },
  { q: 'What are Form 121, Form 149 and Form 168 under the Income Tax Act 2025?', a: 'Form 121 is a single unified declaration under Section 393(6) that replaces both Form 15G (below 60 years) and Form 15H (senior citizens) for declaring nil TDS on estimated income. Form 149 is the renumbered version of the old Form 26A, the accountant\'s certificate a deductor files to avoid being treated as an assessee in default for a TDS shortfall. Form 168 replaces Form 26AS as the consolidated statement showing tax credited against a PAN.' },
  { q: 'What is the TDS rate on purchase of goods under Section 194Q?', a: 'Section 194Q applies 0.1% TDS on purchase of goods from a resident seller once purchases from that seller exceed Rs 50 lakh in a financial year, but only if the buyer\'s turnover in the preceding year exceeded Rs 10 crore. Where both Section 194Q and Section 206C(1H) TCS could apply to the same transaction, TDS under 194Q takes priority and the seller does not also collect TCS.' },
  { q: 'What is the TDS rate on e-commerce transactions under Section 194O?', a: 'Section 194O requires e-commerce operators to deduct 0.1% TDS on the gross amount paid to an e-commerce participant for goods or services sold through the platform. For individual and HUF sellers, TDS applies only once payments exceed Rs 5 lakh in the year; for all other sellers (companies, firms), there is no threshold and TDS applies from the first rupee.' },
  { q: 'How do I check my TDS credit and claim a refund?', a: 'TDS credited against your PAN shows up in Form 26AS (moving to Form 168 under the new Act) and the Annual Information Statement, both downloadable from the Income Tax e-filing portal. If total TDS deducted during the year exceeds your final tax liability, file your ITR and claim the excess as a refund; it is processed and credited directly to your bank account after the return is verified.' },
  { q: 'Is the TDS threshold on dividends different for FY 2026-27?', a: 'No change for FY 2026-27. Budget 2025 raised the dividend TDS threshold under Section 194 from Rs 5,000 to Rs 10,000 effective April 1, 2025, and that Rs 10,000 threshold (checked per company, not across your full portfolio) carries forward unchanged into FY 2026-27.' },
  { q: 'Is a TDS rate chart PDF available for download?', a: 'This page is kept current online rather than as a static PDF, since a downloaded PDF goes out of date the moment CBDT notifies a rate or threshold change, as happened twice in the last two years. Every table on this page can be saved as a PDF directly from your browser\'s print menu. For the original government notifications and circulars, the CBDT publishes them at incometax.gov.in.' },
  { q: 'What was the TDS rate chart for FY 2021-22?', a: 'FY 2021-22 rates matched the standard, pre-Budget-2025 rates: 1% (individual/HUF) or 2% (others) for contractors under 194C, 5% for commission under 194H above a Rs 15,000 threshold, 10% for professional fees under 194J(b) above Rs 30,000, and 10% for rent on land/building under 194-I once annual rent crossed Rs 2.4 lakh. Section 194Q on purchase of goods started mid-year, from 1 July 2021, at 0.1% above a Rs 50 lakh threshold. See the TDS rate chart history table above for the full year-by-year comparison.' },
  { q: 'What was the TDS rate during COVID, for FY 2020-21?', a: 'The CBDT cut most non-salary TDS rates to three-fourths of the standard rate for payments made between 14 May 2020 and 31 March 2021, as a pandemic liquidity measure confirmed in an official Press Information Bureau release. Contractor TDS under 194C fell to 0.75%/1.5%, commission under 194H fell to 3.75%, and professional fees under 194J(b) fell to 7.5%. All rates reverted to the standard level from 1 April 2021.' },
  { q: 'What are the TDS slab rates on salary?', a: 'Salary under Section 192 is the one major TDS category without a fixed percentage: the employer deducts tax based on the employee\'s estimated total annual income and the income tax slab rates for whichever regime applies, spread evenly across the months remaining in the financial year. There is no flat TDS percentage or fixed threshold for salary the way there is for contractor or rent payments.' },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'TDS Rate Chart FY 2026-27', item: 'https://fermor.in/blogs/tds-rate-chart' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Pay TDS Online for FY 2026-27',
  description: 'Step-by-step process to deposit TDS through Challan 281 on the Income Tax e-filing portal.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Log in to the e-filing portal', text: 'Go to incometax.gov.in and log in with your TAN-linked credentials.' },
    { '@type': 'HowToStep', position: 2, name: 'Open e-Pay Tax', text: 'Navigate to e-File > e-Pay Tax, then select Challan 281 (TDS/TCS payment).' },
    { '@type': 'HowToStep', position: 3, name: 'Enter TAN and assessment details', text: 'Fill in your TAN, the assessment year, and the type of deductee (company or non-company).' },
    { '@type': 'HowToStep', position: 4, name: 'Select the payment code', text: 'Choose the correct minor head: 200 for TDS payable by the deductor, or 400 for TDS payable on a regular assessment/demand.' },
    { '@type': 'HowToStep', position: 5, name: 'Enter the amount and pay', text: 'Enter the deducted amount, choose net banking, debit card, or payment gateway, and complete the payment.' },
    { '@type': 'HowToStep', position: 6, name: 'Save the CIN', text: 'Download the challan receipt and note the CIN (Challan Identification Number). This is required when filing the quarterly TDS return (Form 24Q/26Q/27Q).' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/tds-rate-chart',
  name: 'TDS Rate Chart FY 2026-27: Section 393 Rates and Thresholds - Fermor',
  url: 'https://fermor.in/blogs/tds-rate-chart',
  inLanguage: 'en-IN',
  datePublished: '2026-07-27T20:28:14+05:30',
  dateModified: '2026-08-16T22:45:01+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'TDS Rate Chart FY 2026-27',
    alternateName: 'Section 393 TDS Table',
    description: 'The TDS rate chart lists the rate and threshold at which tax must be deducted at source under Section 393 of the Income Tax Act, 2025, for FY 2026-27. It replaces the individually numbered sections (194, 194A through 194T) of the Income Tax Act, 1961.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried taxpayers, business owners, freelancers, chartered accountants, and NRIs computing TDS obligations for FY 2026-27',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-changed', name: "What's New in TDS for FY 2026-27" },
    { '@type': 'WebPageElement', cssSelector: '#new-act-structure', name: 'Income Tax Act 2025: Section 392, 393, 394' },
    { '@type': 'WebPageElement', cssSelector: '#how-tds-works', name: 'How TDS Works' },
    { '@type': 'WebPageElement', cssSelector: '#master-chart', name: 'TDS Rate Chart FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#rate-history', name: 'TDS Rate Chart History: FY 2020-21 to FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#rent-tds', name: 'TDS on Rent' },
    { '@type': 'WebPageElement', cssSelector: '#property-tds', name: 'TDS on Property: Resident vs NRI' },
    { '@type': 'WebPageElement', cssSelector: '#nri-table', name: 'TDS Rates for Non-Residents' },
    { '@type': 'WebPageElement', cssSelector: '#tcs-chart', name: 'TCS Rate Chart FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-pay', name: 'How to Pay TDS Online' },
    { '@type': 'WebPageElement', cssSelector: '#interest-penalty', name: 'Interest for Late TDS Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#check-credit', name: 'How to Check TDS Credit and Claim Refund' },
    { '@type': 'WebPageElement', cssSelector: '#new-forms', name: 'New Forms Under Income Tax Act 2025' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'TDS Worked Example' },
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
  knowsAbout: ['TDS India', 'Section 393 Income Tax Act 2025', 'TCS Rate Chart', 'Income Tax India', 'Personal Finance India', 'NRI Taxation'],
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

function TaxTable({ caption, headers, rows, highlightLast = false }: {
  caption: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
  highlightLast?: boolean;
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute tax advice. TDS rates, thresholds, and section numbers are subject to change through Finance Act amendments and CBDT notifications. Always verify the current provisions on the Income Tax Department&apos;s official website (<a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>incometax.gov.in</a>) or consult a qualified chartered accountant before deducting or depositing TDS. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function TDSRateChartPage() {
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
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>TDS Rate Chart FY 2026-27</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              TDS
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-08-16T22:45:01+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Aug 16, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>19 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            TDS Rate Chart FY 2026-27: Section 393 Rates, Thresholds and Every New Income Tax Act Change
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              TDS for FY 2026-27 runs under a new legal structure: the Income Tax Act, 2025 folds every payment-specific section (192, 194, 194A through 194T) into one Section 393 from April 1, 2026. The rates and thresholds themselves are almost entirely unchanged from FY 2025-26.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: the full section-wise chart under both old and new numbering, the two areas where most charts get it wrong (rent thresholds and NRI property sales), the TCS chart, and how to pay TDS online.
            </p>

            {/* SECTION 1 */}
            <h2 id="what-changed" style={hStyle}>What&apos;s New in TDS for FY 2026-27</h2>
            <p style={pStyle}>
              Nothing changed in FY 2026-27 itself beyond the section renumbering. The rate cuts and threshold increases that actually moved the numbers all took effect a year earlier, under Budget 2025, and simply carry forward:
            </p>
            <BulletList items={[
              <span key="1"><strong>Commission and brokerage (194H):</strong> rate cut from 5% to 2% (Oct 2024); threshold raised from Rs 15,000 to Rs 20,000 (Apr 2025).</span>,
              <span key="2"><strong>Insurance commission (194D):</strong> rate for individual/HUF agents cut from 5% to 2% (Apr 2025); companies still deducted at 10%.</span>,
              <span key="3"><strong>Rent (194-I):</strong> annual threshold raised from Rs 2.4 lakh to Rs 6 lakh, i.e. Rs 50,000 a month (Apr 2025).</span>,
              <span key="4"><strong>Professional and technical fees (194J):</strong> threshold raised from Rs 30,000 to Rs 50,000 (Apr 2025).</span>,
              <span key="5"><strong>Dividends (194):</strong> threshold raised from Rs 5,000 to Rs 10,000, checked per company (Apr 2025).</span>,
              <span key="6"><strong>Foreign remittance TCS (206C(1G)):</strong> threshold raised from Rs 7 lakh to Rs 10 lakh; TCS on education-loan-funded remittances removed entirely (Apr 2025).</span>,
              <span key="7"><strong>Partner payments (194T):</strong> a new 10% TDS on salary, remuneration, commission, bonus, or interest paid by a firm to its partners, above Rs 20,000 a year (Apr 2025).</span>,
            ]} />

            {/* SECTION 2 */}
            <h2 id="new-act-structure" style={hStyle}>How the Income Tax Act 2025 Reorganizes TDS: Section 392, 393 and 394</h2>
            <p style={pStyle}>
              The Income Tax Act, 2025 replaces the scattered section numbers of the 1961 Act with three consolidated sections, effective for transactions from April 1, 2026 onward. Transactions before that date are still governed by the 1961 Act&apos;s original section numbers.
            </p>
            <TaxTable
              caption="TDS/TCS Structure Under the Income Tax Act, 2025"
              headers={['New Section', 'Covers', 'Old Sections It Replaces']}
              rows={[
                ['Section 392', 'TDS on salary', '192, 192A'],
                ['Section 393', 'TDS on all non-salary payments (six tables inside one section)', '193, 194, 194A through 194T, 195, 206AA'],
                ['Section 394', 'TCS on specified goods and transactions', '206C(1) through 206C(1H)'],
              ]}
            />
            <p style={pStyle}>
              This is a structural renumbering, not a substantive rewrite. TDS return filings for Q1 FY 2026-27 onward reference the new section codes; deductors still commonly refer to transactions by the old, more familiar numbers (194C, 194J, 194Q), which is why this chart lists both throughout.
            </p>

            {/* SECTION 3 */}
            <h2 id="how-tds-works" style={hStyle}>How TDS Works: Threshold, Rate and the No-PAN Rule</h2>
            <p style={pStyle}>
              TDS is deducted by the person making the payment, not the person receiving it. Every row in the chart below has a threshold below which no TDS applies, a rate deducted once that threshold is crossed, and a higher no-PAN rate if the payee has not furnished a valid PAN.
            </p>
            <p style={pStyle}>
              Section 206AA (now inside Section 393) sets that no-PAN rate at the highest of the rate specified for that payment, the rate in force under the Finance Act, or a flat 20%. Section 194Q on purchase of goods is the one common exception, capped at 5% instead of 20%.
            </p>

            {/* SECTION 4: MASTER CHART */}
            <h2 id="master-chart" style={hStyle}>TDS Rate Chart for FY 2026-27: Complete Section-Wise Table</h2>
            <p style={pStyle}>
              The table below covers every common category of TDS for resident payees, organised by the payment type you are actually looking for. Old section numbers (still used on Form 26Q/24Q return filings and by most accounting software) are shown alongside the payment category.
            </p>

            <h3 style={h3Style}>Salary, Provident Fund and Interest</h3>
            <TaxTable
              caption="TDS on Salary, EPF and Interest, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['192', 'Salary', 'Basic exemption limit', 'Slab rates'],
                ['192A', 'Premature EPF withdrawal (before 5 years\' service)', 'Rs 50,000', '10% (20% without PAN)'],
                ['193', 'Interest on securities', 'Rs 10,000', '10%'],
                ['194A', 'Interest on bank/post office deposits', 'Rs 50,000 (Rs 1,00,000 for senior citizens)', '10%'],
                ['194A', 'Interest other than on securities (loans, company deposits)', 'Rs 10,000', '10%'],
              ]}
            />

            <p style={pStyle}>
              A fixed deposit paying close to the Rs 50,000 interest threshold is worth checking against the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>FD Calculator</Link> before renewal, since splitting a large deposit across two banks (each with its own independent Rs 50,000 threshold) can legally keep both below the point where TDS applies.
            </p>

            <h3 style={h3Style}>Dividends and Mutual Funds</h3>
            <TaxTable
              caption="TDS on Dividends and Mutual Fund Income, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194', 'Dividend paid by a company', 'Rs 10,000 (per company)', '10%'],
                ['194K', 'Income from mutual fund units', 'Rs 10,000', '10%'],
              ]}
            />

            <h3 style={h3Style}>Contractors, Commission and Professional Fees</h3>
            <TaxTable
              caption="TDS on Contractors, Commission and Professional Fees, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194C', 'Payment to contractors/sub-contractors', 'Rs 30,000 (single) or Rs 1,00,000 (aggregate)', '1% individual/HUF, 2% others'],
                ['194D', 'Insurance commission', 'Rs 20,000', '2% individual/HUF, 10% company'],
                ['194G', 'Commission on sale of lottery tickets', 'Rs 20,000', '2%'],
                ['194H', 'Commission or brokerage', 'Rs 20,000', '2%'],
                ['194J(a)', 'Technical services, call centre, royalty for film distribution', 'Rs 50,000', '2%'],
                ['194J(b)', 'Professional fees (legal, medical, engineering, accountancy, etc.)', 'Rs 50,000', '10%'],
                ['194M', 'Contract, brokerage, professional fees paid by individual/HUF (not under 194C/H/J audit)', 'Rs 50,00,000', '2%'],
              ]}
            />

            <CalcCTA
              href="/calculators/tds-calculator"
              label="TDS Calculator"
              note="Enter the payment type and amount to see the exact TDS deducted for FY 2026-27."
            />

            <h3 style={h3Style}>Property, Rent and Compensation</h3>
            <TaxTable
              caption="TDS on Rent, Property and Compensation, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194-I(a)', 'Rent for plant and machinery', 'Rs 50,000/month (Rs 6,00,000/year)', '2%'],
                ['194-I(b)', 'Rent for land, building and furniture', 'Rs 50,000/month (Rs 6,00,000/year)', '10%'],
                ['194-IA', 'Transfer of immovable property (resident seller, non-agricultural land)', 'Rs 50,00,000', '1%'],
                ['194-IB', 'Rent paid by individual/HUF not covered under 194-I', 'Rs 50,000/month', '2%'],
                ['194-IC', 'Payment under a specified Joint Development Agreement', 'No threshold', '10%'],
                ['194LA', 'Compensation for compulsory acquisition of immovable property', 'Rs 5,00,000', '10%'],
              ]}
            />

            <h3 style={h3Style}>Winnings, Lottery and Gaming</h3>
            <TaxTable
              caption="TDS on Winnings and Gaming, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194B', 'Lottery, game shows, card games, gambling', 'Rs 10,000 (aggregate in the year)', '30%'],
                ['194BA', 'Online gaming winnings', 'No threshold (deducted on every net win)', '30%'],
                ['194BB', 'Winnings from horse races', 'Rs 10,000 (aggregate in the year)', '30%'],
              ]}
            />

            <h3 style={h3Style}>E-Commerce, Goods and Digital Assets</h3>
            <TaxTable
              caption="TDS on E-Commerce, Goods and Digital Assets, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194O', 'Payment to e-commerce participants', 'Rs 5,00,000 for individuals/HUF; no threshold for others', '0.1%'],
                ['194Q', 'Purchase of goods (buyer turnover above Rs 10 crore)', 'Rs 50,00,000 from one seller', '0.1%'],
                ['194R', 'Benefits or perquisites arising from business or profession', 'Rs 20,000', '10%'],
                ['194S', 'Transfer of virtual digital assets (crypto, NFTs)', 'Rs 50,000 (specified persons) or Rs 10,000 (others)', '1%'],
              ]}
            />

            <h3 style={h3Style}>Other Common Payments</h3>
            <TaxTable
              caption="TDS on Other Payments, FY 2026-27"
              headers={['Section', 'Nature of Payment', 'Threshold', 'TDS Rate']}
              rows={[
                ['194DA', 'Life insurance policy payout (taxable portion, Sec 10(10D) not applicable)', 'Rs 1,00,000', '2%'],
                ['194EE', 'Withdrawal from National Savings Scheme (NSS)', 'Rs 2,500', '10%'],
                ['194LBA/B/C', 'Income from business trust units, investment funds, securitisation trusts', 'No threshold', '10%'],
                ['194N', 'Cash withdrawal from a bank/co-op society', 'Rs 1 crore (Rs 3 crore for co-op societies)', '2%'],
                ['194N', 'Cash withdrawal if ITR not filed for preceding 3 years', 'Rs 20 lakh to Rs 1 crore / above Rs 1 crore', '2% / 5%'],
                ['194P', 'Salary and interest for specified senior citizens (75+), ITR filing waived', 'No threshold', 'Slab rates'],
                ['194T', 'Salary, remuneration, commission, bonus or interest paid by a firm to its partners', 'Rs 20,000', '10%'],
              ]}
            />

            {/* SECTION 4B: HISTORICAL CHART */}
            <h2 id="rate-history" style={hStyle}>TDS Rate Chart History: FY 2020-21 to FY 2026-27</h2>
            <p style={pStyle}>
              TDS rates on the most-searched sections have moved three times since FY 2020-21: a temporary COVID relief cut, the removal of that relief a year later, and the Budget 2025 rate and threshold changes described above. The table below tracks five commonly used sections across every affected year.
            </p>
            <TaxTable
              caption="TDS rate by financial year for the five sections most frequently searched by year. Rates below are inclusive of the CBDT-notified 25% COVID reduction where applicable; all rates exclude surcharge and cess."
              headers={['Section', 'FY 2020-21 (14 May 2020 to 31 Mar 2021)', 'FY 2021-22 to FY 2023-24', 'FY 2024-25', 'FY 2025-26 and FY 2026-27']}
              rows={[
                ['194C (contractor, individual/HUF)', '0.75%', '1%', '1%', '1%'],
                ['194C (contractor, others)', '1.5%', '2%', '2%', '2%'],
                ['194H (commission/brokerage)', '3.75%, Rs 15,000 threshold', '5%, Rs 15,000 threshold', '2% from Oct 2024, Rs 15,000 threshold', '2%, Rs 20,000 threshold'],
                ['194J(b) (professional fees)', '7.5%, Rs 30,000 threshold', '10%, Rs 30,000 threshold', '10%, Rs 30,000 threshold', '10%, Rs 50,000 threshold'],
                ['194-I(b) (rent, land/building)', '7.5%, Rs 2.4 lakh/year threshold', '10%, Rs 2.4 lakh/year threshold', '10%, Rs 2.4 lakh/year threshold', '10%, Rs 50,000/month threshold'],
                ['194Q (purchase of goods)', 'Not yet introduced', '0.1%, Rs 50 lakh threshold (from 1 Jul 2021)', '0.1%, Rs 50 lakh threshold', '0.1%, Rs 50 lakh threshold'],
              ]}
            />
            <p style={pStyle}>
              The CBDT cut most non-salary TDS and TCS rates to three-fourths of the standard rate for payments between 14 May 2020 and 31 March 2021, as a liquidity measure during the pandemic, confirmed in a <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=1623745" target="_blank" rel="noopener noreferrer" style={linkStyle}>Press Information Bureau release</a>. The relief lapsed on 31 March 2021 and every section reverted to its standard rate from 1 April 2021 (FY 2021-22) onward. Section 194Q on purchase of goods did not exist during the COVID relief period; it was introduced only from 1 July 2021.
            </p>
            <p style={pStyle}>
              A rate chart for FY 2022-23 or FY 2023-24 specifically will match the FY 2021-22 to FY 2023-24 column above, since none of these five sections changed again until the Budget 2025 amendments took effect. TCS rates under Section 206C followed the same 25% COVID-period reduction and the same 1 April 2021 reversion as the TDS sections shown here.
            </p>

            {/* SECTION 5 */}
            <h2 id="rent-tds" style={hStyle}>TDS on Rent for FY 2026-27: Section 194-I and 194-IB, and the Threshold Most Charts Get Wrong</h2>
            <p style={pStyle}>
              The Section 194-I rent threshold is Rs 50,000 per month, not a flat Rs 50,000 for the year, a distinction several rate charts still get wrong. The comparison base since Budget 2025 is monthly rent, so the annual equivalent is written as Rs 6,00,000.
            </p>
            <TaxTable
              caption="194-I vs 194-IB: Who Deducts, and at What Threshold"
              headers={['Feature', 'Section 194-I', 'Section 194-IB']}
              rows={[
                ['Who deducts', 'Companies, firms, and individuals/HUF liable to tax audit', 'Individuals/HUF not liable to tax audit'],
                ['Threshold', 'Rent above Rs 50,000 in any month', 'Rent above Rs 50,000 in any month'],
                ['Rate: land, building, furniture', '10%', '2%'],
                ['Rate: plant and machinery', '2%', 'Not applicable'],
                ['Return filed', 'Form 26Q (quarterly)', 'Form 26QC (once, within 30 days of deduction)'],
              ]}
            />
            <p style={pStyle}>
              The month-by-month test means a tenant paying Rs 45,000 for eleven months and Rs 55,000 in one month crosses the threshold only for that one month, not the whole tenancy; TDS is deducted only on the month that exceeds Rs 50,000, not retroactively on prior months.
            </p>

            {/* SECTION 6 */}
            <h2 id="property-tds" style={hStyle}>TDS on Sale of Property: Resident Sellers vs NRI Sellers</h2>
            <p style={pStyle}>
              A resident seller and an NRI seller of the same property are taxed under two entirely different sections, with different thresholds, different rates, and a different calculation base. Confusing the two is the most common (and most expensive) TDS mistake in property transactions.
            </p>
            <TaxTable
              caption="Section 194-IA (Resident Seller) vs Section 195 (NRI Seller)"
              headers={['Feature', 'Section 194-IA (Resident)', 'Section 195 (NRI)']}
              rows={[
                ['Threshold', 'Applies only if sale price exceeds Rs 50 lakh', 'No threshold; applies to any amount'],
                ['TDS calculated on', 'Full sale price', 'The capital gain, not the sale price'],
                ['Rate', 'Flat 1%', '12.5% on long-term gains (held over 24 months); slab-based withholding on short-term gains'],
                ['Surcharge and cess', 'Not applicable at 1%', 'Applicable; effective rate can reach approximately 14.95% at the top slab'],
                ['Relief for over-deduction', 'Not usually needed at 1%', 'Apply for a lower/nil TDS certificate under Section 395 before the sale'],
              ]}
            />
            <p style={pStyle}>
              Section 195 has no minimum threshold, so a buyer purchasing even a modest property from an NRI seller must deduct TDS, register for a TAN, and file the applicable TDS return. A buyer of the same property from a resident seller would only face those obligations above Rs 50 lakh.
            </p>

            <CalcCTA
              href="/calculators/capital-gains-calculator"
              label="Capital Gains Calculator"
              note="Estimate the actual long-term or short-term capital gain a property sale will generate, before applying the TDS rate."
            />

            {/* SECTION 7 */}
            <h2 id="nri-table" style={hStyle}>TDS Rates for Non-Residents, FY 2026-27</h2>
            <p style={pStyle}>
              Section 195 governs TDS on nearly every payment made to a non-resident, at rates that differ sharply from the resident TDS chart above. There is generally no threshold: TDS applies from the first rupee unless a specific carve-out or lower-deduction certificate applies.
            </p>
            <TaxTable
              caption="TDS Rates for Payments to Non-Residents, FY 2026-27"
              headers={['Payment Type', 'TDS Rate']}
              rows={[
                ['Salary', 'Normal slab rate'],
                ['Winnings: lottery, card games, betting', '30%'],
                ['Winnings: online games', '30%'],
                ['Winnings: horse races', '30%'],
                ['Payment to non-resident sportsmen/sports associations', '20%'],
                ['Long-term capital gains (property, unlisted shares, Section 112)', '12.5%'],
                ['Long-term capital gains on listed equity/equity funds above Rs 1.25 lakh (Section 112A)', '12.5%'],
                ['Short-term capital gains on listed equity/equity funds (Section 111A)', '20%'],
                ['Interest on foreign currency borrowings (Government/Indian concern)', '20%'],
                ['Royalty and fees for technical services (government-approved agreement)', '20%'],
                ['Dividend income', '10% (20% for income from units under Section 196A)'],
                ['Interest on rupee-denominated bonds/government securities (FII/QFI)', '5%'],
                ['Any other income', '20%'],
              ]}
            />
            <p style={pStyle}>
              A lower rate under a Double Taxation Avoidance Agreement (DTAA) applies wherever it is more favourable than the flat Section 195 rate, provided the recipient furnishes a Tax Residency Certificate and Form 10F.
            </p>

            {/* SECTION 8 */}
            <h2 id="tcs-chart" style={hStyle}>TCS Rate Chart for FY 2026-27</h2>
            <p style={pStyle}>
              Tax Collected at Source (TCS) sits under Section 394 of the Income Tax Act, 2025 (previously Section 206C). Unlike TDS, TCS is collected by the seller from the buyer, not deducted by the payer from the payee.
            </p>
            <TaxTable
              caption="TCS Rate Chart, FY 2026-27"
              headers={['Section', 'Particulars', 'Threshold', 'TCS Rate']}
              rows={[
                ['206C(1)', 'Alcoholic liquor for human consumption', 'No threshold', '1%'],
                ['206C(1)', 'Tendu leaves', 'No threshold', '5%'],
                ['206C(1)', 'Timber and other forest produce (forest lease)', 'No threshold', '2%'],
                ['206C(1)', 'Scrap', 'No threshold', '2%'],
                ['206C(1)', 'Minerals: coal, lignite, iron ore', 'No threshold', '1%'],
                ['206C(1C)', 'Parking lot, toll plaza, mining and quarrying (license/lease/contract)', 'No threshold', '2%'],
                ['206C(1F)', 'Sale of a motor vehicle', 'Rs 10,00,000', '1%'],
                ['206C(1G)', 'LRS foreign remittance: education (self-funded) or medical treatment', 'Rs 10,00,000 (cumulative)', '2%'],
                ['206C(1G)', 'LRS foreign remittance: education funded by an approved loan', 'No TCS', 'Nil'],
                ['206C(1G)', 'LRS foreign remittance: other purposes', 'Rs 10,00,000 (cumulative)', '20%'],
                ['206C(1G)', 'Overseas tour programme package', 'Rs 10,00,000 per traveller', '5% up to Rs 10L, 20% above'],
              ]}
            />
            <p style={pStyle}>
              The Rs 10 lakh LRS threshold is cumulative across every purpose in the year: Rs 6 lakh for education plus Rs 5 lakh for medical treatment totals Rs 11 lakh, so TCS applies on the Rs 1 lakh above the limit. It is credited against your final tax liability, not an extra cost.
            </p>

            {/* SECTION 9 */}
            <h2 id="how-to-pay" style={hStyle}>How to Pay TDS Online: Challan 281, Step by Step</h2>
            <p style={pStyle}>
              TDS deducted in a month must be deposited with the government by the 7th of the following month (the 30th of April for TDS deducted in March). Payment is made entirely online through the Income Tax e-filing portal.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Log in to the e-filing portal', text: 'Go to incometax.gov.in and log in using your TAN-linked credentials.' },
                { title: 'Open e-Pay Tax', text: 'Navigate to e-File > e-Pay Tax, then select Challan 281 for TDS/TCS payment.' },
                { title: 'Enter TAN and assessment details', text: 'Fill in your TAN, the assessment year, and whether the deductee is a company or non-company.' },
                { title: 'Select the payment code', text: 'Choose minor head 200 for regular TDS payable by the deductor, or 400 for TDS payable on a demand/regular assessment.' },
                { title: 'Enter the amount and pay', text: 'Enter the deducted amount and complete payment via net banking, debit card, or the payment gateway.' },
                { title: 'Save the CIN', text: 'Download the challan receipt and note the CIN (Challan Identification Number). You will need it to file the quarterly TDS return (Form 24Q for salary, 26Q for other payments, 27Q for non-residents).' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p style={pStyle}>
              For property transactions under Section 194-IA, the buyer files Form 26QB (a combined challan-cum-return) instead of a separate challan and quarterly return, within 30 days of the end of the month in which TDS was deducted.
            </p>

            {/* SECTION 10 */}
            <h2 id="interest-penalty" style={hStyle}>Interest and Penalty for Late TDS Deduction or Payment</h2>
            <p style={pStyle}>
              Late TDS carries two different interest rates depending on which step was late: deducting the tax, or depositing it after deduction. Both are calculated per calendar month or part of a month, so a delay of even one day is charged as a full month.
            </p>
            <TaxTable
              caption="Interest for Late TDS Deduction and Payment"
              headers={['Default', 'Interest Rate', 'Calculated From', 'Calculated To']}
              rows={[
                ['Failure to deduct TDS on time', '1% per month', 'Date TDS was deductible', 'Date TDS is actually deducted'],
                ['Failure to deposit TDS after deduction', '1.5% per month', 'Date of deduction', 'Date of actual deposit'],
              ]}
            />
            <p style={pStyle}>
              Beyond interest, a deductor who fails to deduct or deposit TDS can be treated as an &quot;assessee in default&quot; under Section 201, face a penalty under Section 271C up to the tax not deducted, and lose the expense deduction under Section 40(a)(ia) until it is deposited.
            </p>

            {/* SECTION 11 */}
            <h2 id="check-credit" style={hStyle}>How to Check TDS Credit and Claim a Refund</h2>
            <p style={pStyle}>
              Every rupee of TDS deducted against your PAN is visible in two places on the e-filing portal: Form 26AS and the Annual Information Statement (AIS). Both update automatically once the deductor files their quarterly TDS return and it processes at the TDS reconciliation system.
            </p>
            <BulletList items={[
              'Log in at incometax.gov.in, go to e-File > Income Tax Returns > View Form 26AS, and select the relevant assessment year.',
              'Cross-check the AIS (Services > Annual Information Statement) for the same figures; it also shows dividends, interest, and mutual fund transactions reported by third parties.',
              'If the TDS shown does not match your payslip or Form 16, ask the deductor to file a correction statement; do not file your ITR against a figure the deductor has not actually reported.',
              'If total TDS and TCS for the year exceeds your final computed tax liability, the excess is claimed as a refund when you file your ITR, and is credited directly to your bank account after verification.',
            ]} />
            <p style={pStyle}>
              Run your numbers through the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Calculator</Link> to see whether the TDS already deducted leaves you with a refund or a balance still payable.
            </p>

            {/* SECTION 12 */}
            <h2 id="new-forms" style={hStyle}>New Forms Under the Income Tax Act 2025: Form 121, 149 and 168</h2>
            <p style={pStyle}>
              The Income Tax Act, 2025 renamed several TDS-related forms alongside the section renumbering. These are the three most relevant to a payer or payee working through TDS compliance.
            </p>
            <TaxTable
              caption="Form Changes Under the Income Tax Act, 2025"
              headers={['New Form', 'Old Form It Replaces', 'Purpose']}
              rows={[
                ['Form 121', 'Form 15G / Form 15H', 'A single unified declaration under Section 393(6) that a recipient\'s estimated total income for the year will be nil, so no TDS should be deducted. Covers both the below-60 and senior-citizen cases that were previously two separate forms.'],
                ['Form 149', 'Form 26A', 'An accountant\'s certificate the deductor files to prove a TDS shortfall does not make them an "assessee in default," typically because the payee has already paid tax on that income directly.'],
                ['Form 168', 'Form 26AS', 'The consolidated annual statement showing all tax (TDS, TCS, advance tax, self-assessment tax) credited against a PAN.'],
              ]}
            />
            <p style={pStyle}>
              Form 121 and Form 149 are easy to conflate but serve different purposes. Form 121 is filed by the payee to prevent deduction in the first place; Form 149 is filed by the payer afterward, to resolve a shortfall that already happened.
            </p>

            {/* SECTION 13 */}
            <h2 id="worked-example" style={hStyle}>TDS Worked Example: A Freelancer&apos;s Invoice Under Section 194J</h2>
            <p style={pStyle}>
              A company pays a freelance consultant Rs 80,000 for a project. Since this is professional services, Section 194J(b) applies at 10% once payments in the year cross Rs 50,000.
            </p>
            <TaxTable
              caption="TDS on a Rs 80,000 Professional Fee, Section 194J(b)"
              headers={['Step', 'Amount']}
              rows={[
                ['Invoice amount', 'Rs 80,000'],
                ['Threshold check', 'Exceeds Rs 50,000, so TDS applies on the full amount, not just the excess'],
                ['TDS rate', '10%'],
                ['TDS deducted', 'Rs 8,000'],
                ['Net amount paid to the consultant', 'Rs 72,000'],
              ]}
              highlightLast
            />
            <p style={pStyle}>
              Unlike a slab-based tax, once the Rs 50,000 threshold is crossed, TDS applies to the entire payment, not just the portion above it. The consultant then claims the Rs 8,000 as tax already paid when filing their ITR.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: TDS Rate Chart FY 2026-27</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="tds-chart-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>FY 2026-27 Quick Reference</div>
              {([
                ['Contractor TDS (194C)', '1% / 2%'],
                ['Commission (194H)', '2%, Rs 20K limit'],
                ['Professional fees (194J)', '10%, Rs 50K limit'],
                ['Rent (194-I)', '10% / 2%, Rs 50K/month'],
                ['FD interest (194A)', '10%, Rs 50K limit'],
                ['Property, resident (194-IA)', '1%, Rs 50L limit'],
                ['Property, NRI (195)', '12.5% LTCG, no limit'],
                ['Purchase of goods (194Q)', '0.1%, Rs 50L limit'],
                ['No-PAN rate (206AA)', '20% (or 5% for 194Q)'],
                ['Late deduction interest', '1% per month'],
                ['Late deposit interest', '1.5% per month'],
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
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Capital Gains Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>FD Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/income-tax-slabs-fy-2025-26', 'Income Tax Slabs FY 2025-26: New and Old Regime Rates'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date: Every Deadline You Need to Know'],
                ['/blogs/gst-rates', 'GST Rates in India: Complete List Under GST 2.0'],
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
        .tds-chart-sidebar::-webkit-scrollbar { width: 5px; }
        .tds-chart-sidebar::-webkit-scrollbar-track { background: transparent; }
        .tds-chart-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .tds-chart-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

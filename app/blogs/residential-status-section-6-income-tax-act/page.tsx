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
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const URL_ = 'https://fermor.in/blogs/residential-status-section-6-income-tax-act';
const NOW = '2026-10-12T17:25:36+05:30';

export const metadata: Metadata = {
  title: 'Residential Status Under Section 6 of Income Tax Act: NRI Rules',
  description: 'Residential status under Section 6 decides what India taxes. Learn the 182, 60 and 120 day tests, ROR vs RNOR vs NRI, the deemed resident rule and examples.',
  alternates: { canonical: URL_ },
  openGraph: {
    title: 'Residential Status Under Section 6 of Income Tax Act: NRI Rules | Fermor',
    description: 'How to find your residential status for tax in India: day-count tests, ROR, RNOR and non-resident rules, deemed residents and worked examples.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['Residential Status', 'Section 6', 'NRI Taxation'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Residential Status Under Section 6 | Fermor',
    description: 'The 182-day, 60-day and 120-day tests, ROR vs RNOR vs NRI and what India taxes in each case.',
  },
  keywords: [
    'residential status', 'residential status in income tax', 'section 6 income tax act',
    'residential status under section 6 of income tax act', 'residential status of individual',
    'residential status meaning', 'residential status calculation', 'how to find out residential status of an individual',
    'residential status in taxation law', 'residential status income tax notes', 'tax residency india',
    'india tax residency rules', 'tax residency in india', 'resident for tax purposes india',
    'indian resident for tax purposes', 'tax resident in india', 'tax residential status',
    'nri status criteria', 'nri residential status rules', 'how many days to become nri',
    '182 days tax rule in india', 'resident and ordinarily resident', 'resident but not ordinarily resident',
    'ror rnor nri', 'deemed resident india', 'nri taxation in india', 'nri tax in india',
    'income tax for nri in india', 'income tax rules for non resident indian', 'non resident indian taxation',
    'nri income is taxable in india', 'income earned abroad taxable in india', 'tax on foreign income of resident indian',
    'tax on income earned outside india', 'nri tax on capital gains in india', 'nri sell property in india tax',
    'residential status in kyc form', 'residential status in form 15g', 'expat taxation in india',
  ],
};

const faqItems = [
  { q: 'What is residential status under Section 6 of the Income Tax Act?', a: "Residential status under Section 6 is the classification that decides how much of your income India can tax in a financial year. It has three outcomes: resident and ordinarily resident (ROR), resident but not ordinarily resident (RNOR) and non-resident (NR), and it is worked out afresh every year." },
  { q: 'How many days do you need to stay in India to be a resident?', a: "You are a resident if you stay in India for 182 days or more in the financial year. You are also a resident if you stay 60 days or more in the year and 365 days or more in the 4 years before it." },
  { q: 'How many days to become an NRI?', a: "You become a non-resident for tax when you meet neither residency test: fewer than 182 days in India in the year, and either fewer than 60 days in the year or fewer than 365 days in the 4 earlier years. An Indian citizen who leaves for work abroad needs only to stay under 182 days." },
  { q: 'What is the 182 days rule for tax in India?', a: "The 182 days rule says a person present in India for 182 days or more in a financial year is a resident for that year. Both the day of arrival and the day of departure count as days in India." },
  { q: 'What is the difference between ROR, RNOR and NRI?', a: "A ROR is taxed on global income, an RNOR is taxed on Indian income and on foreign income only from a business controlled in India or a profession set up in India, and an NRI is taxed only on income received or earned in India. The three differ in how much foreign income India can reach." },
  { q: 'When is a resident treated as RNOR?', a: "A resident is an RNOR if they were non-resident in 9 of the 10 earlier years, or stayed in India 729 days or less in the 7 earlier years. Indian citizens who qualify under the 120-day rule, and deemed residents, are also RNOR." },
  { q: 'What is the 120 days rule for NRIs?', a: "The 120 days rule applies to an Indian citizen or person of Indian origin whose Indian income exceeds Rs 15 lakh and who visits India. Such a person is a resident if they stay 120 days or more in the year and 365 days or more in the 4 earlier years, and is classed RNOR if the stay is under 182 days." },
  { q: 'Who is a deemed resident under Section 6(1A)?', a: "A deemed resident is an Indian citizen whose Indian income exceeds Rs 15 lakh and who is not liable to tax in any other country because of domicile or residence there. A deemed resident is always an RNOR, whatever the number of days spent in India." },
  { q: 'Does the Rs 15 lakh limit include foreign income?', a: "No. The Rs 15 lakh limit is counted on total income other than income from foreign sources. Foreign income does not push you over the limit." },
  { q: 'Is residential status the same as citizenship?', a: "No. Residential status depends on days of stay and not on citizenship, birthplace or domicile. An Indian citizen can be a non-resident, and a foreign citizen can be a resident of India for a year." },
  { q: 'Does the stay in India have to be continuous?', a: "No. Days are added up across the year, and the stay need not be continuous or for any specific purpose. Presence in India's territorial waters up to 12 nautical miles also counts." },
  { q: 'Is the residential status decided once or every year?', a: "It is decided every financial year, separately. You can be a resident one year and a non-resident the next, which is why the earlier 4, 7 and 10 year tests exist." },
  { q: 'What income is taxable for a non-resident in India?', a: "A non-resident is taxed on income received or deemed to be received in India, and on income that accrues or arises in India or is deemed to do so. Examples are rent from an Indian property, interest on Indian bank deposits and fees from an Indian payer." },
  { q: 'Is foreign income taxable for a resident Indian?', a: "Yes, for a ROR. A resident and ordinarily resident is taxed on global income, with relief from double taxation through a tax treaty or Sections 90 and 91. An RNOR is not taxed on foreign income unless it comes from a business controlled in India or a profession set up in India." },
  { q: 'How is the residential status of a company decided?', a: "An Indian company is always resident. A foreign company is resident only if its place of effective management during the year is in India." },
  { q: 'How is the residential status of a HUF decided?', a: "A HUF is a resident unless its affairs are controlled and managed wholly from outside India. A resident HUF is ROR if the Karta is resident in at least 2 of the 10 earlier years and stayed 730 days or more in the 7 earlier years, otherwise it is RNOR." },
  { q: 'Is the NRI definition under FEMA the same as under the Income Tax Act?', a: "No. The Foreign Exchange Management Act uses a separate test, so you can be an NRI for bank accounts and investments and a resident for income tax in the same year. The Reserve Bank of India notifies the FEMA rules, and banks use them for KYC." },
  { q: 'Can an NRI file Form 15G?', a: "No. Form 15G and Form 15H are for resident individuals who want no TDS deducted. A non-resident cannot submit them, so the residential status declared on the form must be accurate." },
  { q: 'Which ITR form does an NRI or RNOR use?', a: "An NRI or RNOR cannot use ITR-1. They file ITR-2 when they have no business income, or ITR-3 when they have business or professional income." },
  { q: 'Do residents have to report foreign assets in the ITR?', a: "Yes. A resident other than an RNOR must disclose foreign assets and foreign income in Schedule FA, and non-disclosure can attract a penalty of Rs 10 lakh under the Black Money Act. Non-immovable foreign assets worth up to Rs 20 lakh in aggregate are exempt from that penalty, but foreign immovable property is not." },
  { q: 'What changes under the Income-tax Act, 2025?', a: "The Income-tax Act, 2025 applies from 1 April 2026 and keeps the same residence tests, now written in terms of the tax year. Section 6 of the 1961 Act still governs FY 2025-26, which is the year you report in the return for AY 2026-27." },
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
  headline: 'Residential Status Under Section 6 of Income Tax Act: ROR, RNOR and NRI Rules',
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
    { '@type': 'Thing', name: 'Section 6 of the Income Tax Act', description: 'The provision that decides whether a person is resident, resident but not ordinarily resident, or non-resident in India for a financial year' },
    { '@type': 'Thing', name: 'NRI taxation in India', description: 'How income of non-resident Indians is taxed, based on residential status and the source and place of receipt of income' },
  ],
  keywords: 'residential status, section 6 income tax act, ROR RNOR NRI, 182 days rule, deemed resident, tax residency india, nri taxation',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Residential Status Under Section 6', item: URL_ },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Determine Your Residential Status Under Section 6',
  description: 'Steps to work out whether you are a resident and ordinarily resident, a resident but not ordinarily resident, or a non-resident for a financial year.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Count your days in India', text: 'Add the days you were in India in the financial year, counting both the arrival and departure days, from your passport stamps and travel records.' },
    { '@type': 'HowToStep', position: 2, name: 'Count your days in the 4 earlier years', text: 'Add the days of stay in the 4 financial years before the current one.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply the two basic tests', text: 'You are a resident if you stayed 182 days or more, or 60 days or more with 365 days or more in the 4 earlier years. Use 182 days only if you are an Indian citizen who left for work abroad, and 120 days if you are a citizen or person of Indian origin visiting with Indian income above Rs 15 lakh.' },
    { '@type': 'HowToStep', position: 4, name: 'Check the deemed resident rule', text: 'If you are an Indian citizen with Indian income above Rs 15 lakh and are not taxed in any other country, you are a deemed resident and an RNOR.' },
    { '@type': 'HowToStep', position: 5, name: 'Split resident into ROR or RNOR', text: 'A resident is an RNOR if non-resident in 9 of the last 10 years or in India 729 days or less in the last 7 years. Otherwise the person is ROR.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL_,
  name: 'Residential Status Under Section 6 of Income Tax Act: NRI Rules | Fermor',
  url: URL_,
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Tax residency',
    description: 'The status that determines which country has the right to tax a person on their worldwide income. In India, residential status for income tax is set each financial year under Section 6 of the Income Tax Act, 1961.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Tax_residence',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian citizens, NRIs, returning NRIs and foreign nationals who earn income in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'What Is Residential Status' },
    { '@type': 'WebPageElement', cssSelector: '#resident-tests', name: 'Tests for Resident' },
    { '@type': 'WebPageElement', cssSelector: '#exceptions', name: 'Exceptions: Citizens Leaving or Visiting India' },
    { '@type': 'WebPageElement', cssSelector: '#ror-rnor', name: 'ROR vs RNOR' },
    { '@type': 'WebPageElement', cssSelector: '#non-resident', name: 'Non-Resident and NRI Status' },
    { '@type': 'WebPageElement', cssSelector: '#deemed', name: 'Deemed Resident' },
    { '@type': 'WebPageElement', cssSelector: '#counting', name: 'How to Count Days' },
    { '@type': 'WebPageElement', cssSelector: '#taxability', name: 'Taxability by Status' },
    { '@type': 'WebPageElement', cssSelector: '#examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#entities', name: 'HUF, Company and Firm' },
    { '@type': 'WebPageElement', cssSelector: '#nri-practical', name: 'What NRIs Must Know' },
    { '@type': 'WebPageElement', cssSelector: '#fema', name: 'Income Tax vs FEMA' },
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
  knowsAbout: ['Residential Status', 'Section 6 Income Tax Act', 'NRI Taxation India', 'Income Tax Deductions India', 'Personal Finance India'],
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
  { id: 'overview', label: 'What Is Residential Status' },
  { id: 'resident-tests', label: 'Tests for Resident' },
  { id: 'exceptions', label: 'Citizens Leaving or Visiting' },
  { id: 'ror-rnor', label: 'ROR vs RNOR' },
  { id: 'non-resident', label: 'Non-Resident and NRI' },
  { id: 'deemed', label: 'Deemed Resident' },
  { id: 'counting', label: 'How to Count Days' },
  { id: 'taxability', label: 'Taxability by Status' },
  { id: 'examples', label: 'Worked Examples' },
  { id: 'entities', label: 'HUF, Company, Firm' },
  { id: 'nri-practical', label: 'What NRIs Must Know' },
  { id: 'fema', label: 'Income Tax vs FEMA' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Rules reflect Section 6 of the Income Tax Act, 1961 for FY 2025-26 and can change with each Finance Act. Confirm the current position on the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Department website</a> or with a qualified Chartered Accountant, especially for cross-border cases. This page is general information and not tax advice.
      </p>
    </div>
  );
}

export default function ResidentialStatusPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Residential Status Under Section 6</li>
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
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Residential Status Under Section 6 of Income Tax Act: ROR, RNOR and NRI Rules
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Residential status under Section 6 of the Income Tax Act decides how much of your income India can tax, and you are a resident if you spend 182 days or more in India in a financial year. You are also a resident with 60 days in the year and 365 days in the 4 years before it.
            </p>
            <P style={{ fontSize: 16.5 }}>
              Citizenship does not decide it. Below: the day-count tests, the exceptions for people leaving or visiting India, the deemed resident rule, ROR vs RNOR vs NRI, and worked examples.
            </P>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>What Is Residential Status Under Section 6?</h2>
            <P>
              Residential status is the label the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Act, 1961</a> gives a person for one financial year, and it sets the reach of Indian tax on their income. Section 6 defines three outcomes for an individual: resident and ordinarily resident (ROR), resident but not ordinarily resident (RNOR) and non-resident (NR).
            </P>
            <P>
              The status is worked out again every year. It is not the same as being an NRI under foreign exchange law, which uses a different test (see the FEMA section below).
            </P>
            <DataTable
              caption="Residential Status Under Section 6 at a Glance"
              headers={['Status', 'Short form', 'Taxed in India on']}
              rows={[
                ['Resident and ordinarily resident', 'ROR', 'Global income'],
                ['Resident but not ordinarily resident', 'RNOR', 'Indian income, plus foreign income only from a business controlled in India or a profession set up in India'],
                ['Non-resident', 'NR (NRI)', 'Income received, accruing or arising in India, or deemed to'],
              ]}
            />
            <CalcCTA href="/calculators/income-tax-calculator" label="Estimate your Indian tax" note="Enter your Indian income and deductions to see the tax a resident would pay." />

            {/* SECTION 2 */}
            <h2 id="resident-tests" style={hStyle}>Which Tests Make an Individual a Resident?</h2>
            <P>
              An individual is a resident if either of two conditions is met, and a person who meets neither is a non-resident. Both look at days of physical stay in India.
            </P>
            <DataTable
              caption="Basic Conditions Under Section 6(1)"
              headers={['Condition', 'Days in India this year', 'Days in India in the 4 earlier years']}
              rows={[
                ['Condition 1', '182 days or more', 'Not relevant'],
                ['Condition 2', '60 days or more', '365 days or more'],
              ]}
            />
            <P>
              Meeting any one condition makes you a resident for the year. The 4 earlier years are the 4 financial years immediately before the current one.
            </P>

            {/* SECTION 3 */}
            <h2 id="exceptions" style={hStyle}>Exceptions for Indian Citizens Who Leave or Visit India</h2>
            <P>
              Indian citizens who leave India for work, or who visit India from abroad, get a longer threshold than the basic 60 days. The change from the 60 day test is the single most important rule for NRIs.
            </P>
            <DataTable
              caption="Modified Day Tests for Indian Citizens and Persons of Indian Origin"
              headers={['Situation', 'Test for resident', 'Result if the test is met']}
              rows={[
                ['Citizen leaves India for employment abroad, or as crew of an Indian ship', '182 days or more in the year (the 60 day test is dropped)', 'Resident'],
                ['Citizen or person of Indian origin living abroad visits India, Indian income Rs 15 lakh or less', '182 days or more in the year (the 60 day test is dropped)', 'Resident'],
                ['Citizen or person of Indian origin living abroad visits India, Indian income above Rs 15 lakh', '120 days or more in the year and 365 days or more in the 4 earlier years', 'Resident, and RNOR if the stay is under 182 days'],
              ]}
            />
            <P>
              The Rs 15 lakh limit is counted on total income other than income from foreign sources. A person of Indian origin is someone whose parents or grandparents were born in undivided India.
            </P>
            <P>
              For crew members, Rule 126 of the Income-tax Rules, 1962 excludes the period between joining and signing off on an eligible voyage, as recorded in the Continuous Discharge Certificate.
            </P>

            {/* SECTION 4 */}
            <h2 id="ror-rnor" style={hStyle}>ROR vs RNOR: When Is a Resident Not Ordinarily Resident?</h2>
            <P>
              A resident individual is an ROR only if both of two additional conditions are met, and is an RNOR if either fails. These tests look back further than the residency tests do.
            </P>
            <DataTable
              caption="Conditions for Resident and Ordinarily Resident (Section 6(6))"
              headers={['Condition', 'ROR needs']}
              rows={[
                ['Residence in the 10 earlier years', 'Resident in at least 2 of the 10 years'],
                ['Stay in the 7 earlier years', '730 days or more in total'],
              ]}
            />
            <P>
              So a resident is an RNOR when they were non-resident in 9 of the 10 earlier years, or stayed 729 days or less in the 7 earlier years. There are two more routes to RNOR, covered below: the 120 day citizen rule and the deemed resident rule.
            </P>
            <BulletList items={[
              <><strong>Typical RNOR:</strong> an NRI who returns to India for good after many years abroad.</>,
              <><strong>120 day citizen:</strong> a citizen or person of Indian origin with Indian income above Rs 15 lakh who stays 120 to 181 days.</>,
              <><strong>Deemed resident:</strong> an Indian citizen taxed nowhere else, with Indian income above Rs 15 lakh.</>,
            ]} />
            <P>
              Only individuals and HUFs can be RNOR. Every other kind of taxpayer is either resident or non-resident.
            </P>

            {/* SECTION 5 */}
            <h2 id="non-resident" style={hStyle}>Non-Resident and NRI Status: How Many Days to Become an NRI?</h2>
            <P>
              You become a non-resident for tax when you fail both resident tests, which means under 182 days in India and either under 60 days or under 365 days in the 4 earlier years. For an Indian citizen who left for work abroad, staying under 182 days is enough.
            </P>
            <DataTable
              caption="Quick Answer: Days in India and Tax Status (individual, current financial year)"
              headers={['Who you are', 'Days in India this year', 'Status']}
              rows={[
                ['Indian citizen working abroad', 'Under 182', 'Non-resident'],
                ['Indian citizen visiting, Indian income Rs 15 lakh or less', 'Under 182', 'Non-resident'],
                ['Indian citizen visiting, Indian income above Rs 15 lakh', 'Under 120', 'Non-resident'],
                ['Indian citizen visiting, Indian income above Rs 15 lakh', '120 to 181, with 365+ days in the 4 earlier years', 'Resident, RNOR'],
                ['Foreign citizen', 'Under 60, or 60+ with under 365 in the 4 earlier years', 'Non-resident'],
                ['Anyone', '182 or more', 'Resident'],
              ]}
            />

            {/* SECTION 6 */}
            <h2 id="deemed" style={hStyle}>Deemed Resident Under Section 6(1A)</h2>
            <P>
              A deemed resident is an Indian citizen whose Indian income exceeds Rs 15 lakh and who is not liable to tax in any other country because of domicile, residence or a similar criterion. The rule applies from FY 2020-21 and is aimed at people living in countries that levy no income tax.
            </P>
            <P>
              A deemed resident is a resident only for tax purposes and is always an RNOR. That means foreign income stays outside Indian tax, but Indian income does not.
            </P>
            <Callout>
              <strong>Citizenship matters here, and only here.</strong> The deemed resident rule is the one place where being an Indian citizen changes the answer, because a foreign citizen cannot be a deemed resident.
            </Callout>

            {/* SECTION 7 */}
            <h2 id="counting" style={hStyle}>How to Count Days of Stay in India</h2>
            <P>
              Count every day you were physically in India, including the day of arrival and the day of departure. The stay does not need to be continuous or for any particular purpose.
            </P>
            <BulletList items={[
              'Stay in the territorial waters of India, up to 12 nautical miles from the coast, counts as stay in India.',
              'Citizenship, place of birth and domicile are not part of the count.',
              'Use passport stamps, e-gate records and flight bookings to build the count, and keep them for assessment purposes.',
              'Count the financial year, 1 April to 31 March, and not the calendar year.',
            ]} />
            <P>
              A person can be a tax resident of more than one country in the same year. A tax treaty then decides which country gets the primary right to tax.
            </P>

            {/* SECTION 8 */}
            <h2 id="taxability" style={hStyle}>What Income Is Taxable for ROR, RNOR and Non-Residents?</h2>
            <P>
              A ROR is taxed on worldwide income, an RNOR on income with an Indian link, and a non-resident only on income received or earned in India. Section 5 of the Act sets this out and Section 7 adds income deemed to be received.
            </P>
            <DataTable
              caption="Taxability of Income by Residential Status"
              headers={['Type of income', 'ROR', 'RNOR', 'Non-resident']}
              rows={[
                ['Received or deemed received in India', 'Taxable', 'Taxable', 'Taxable'],
                ['Accrues or arises in India (even if received abroad)', 'Taxable', 'Taxable', 'Taxable'],
                ['Accrues abroad, received in India', 'Taxable', 'Taxable', 'Taxable'],
                ['Accrues abroad, from a business controlled in India or a profession set up in India', 'Taxable', 'Taxable', 'Not taxable'],
                ['Accrues abroad and is received abroad, no Indian link', 'Taxable', 'Not taxable', 'Not taxable'],
              ]}
            />
            <P>
              Interest on a fixed deposit with an Indian bank is received in India, so it is taxable for all three. A payment from an Indian company into a foreign bank account for services given to it accrues from India, so it is also taxable for all three.
            </P>
            <P>
              Resident individuals get relief for tax already paid abroad under Sections 90 and 91, and claim it by filing Form 67 on the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>e-Filing portal</a>. The <Link href="/blogs/section-10-income-tax-act-exemptions" target="_blank" rel="noopener noreferrer" style={linkStyle}>Section 10 exemptions guide</Link> lists the income that stays exempt whatever your status.
            </P>

            {/* SECTION 9 */}
            <h2 id="examples" style={hStyle}>Residential Status Examples for FY 2025-26</h2>
            <P>
              Each example below applies the tests in order: basic day test, exception for citizens, then ROR or RNOR. The days are illustrative.
            </P>
            <DataTable
              caption="Example 1: Rohan, Indian citizen working in Dubai, visits India for 90 days"
              headers={['Step', 'Check', 'Result']}
              rows={[
                ['Left India for employment abroad', 'Only the 182 day test applies', '90 days is under 182'],
                ['Status', 'Fails the test', 'Non-resident'],
                ['Taxed in India on', 'Indian rent and interest only', 'His Dubai salary stays outside Indian tax'],
              ]}
            />
            <DataTable
              caption="Example 2: Priya, a foreign citizen, stays 75 days and 380 days in the 4 earlier years"
              headers={['Step', 'Check', 'Result']}
              rows={[
                ['Condition 2', '75 days (60+) and 380 days (365+)', 'Resident'],
                ['10 earlier years', 'Non-resident in 9 of the 10 years', 'Fails the ROR test'],
                ['Status', 'Resident but fails ROR', 'RNOR'],
              ]}
            />
            <DataTable
              caption="Example 3: Arjun, Indian citizen in Singapore, stays 130 days with 400 days in the 4 earlier years"
              headers={['Indian income', 'Test applied', 'Status']}
              rows={[
                ['Rs 18 lakh (above Rs 15 lakh)', '120 days and 365 days in 4 years: both met', 'Resident, RNOR (stay under 182)'],
                ['Rs 12 lakh (Rs 15 lakh or less)', '182 days: 130 is under 182', 'Non-resident'],
              ]}
            />
            <DataTable
              caption="Example 4: Meera returns to India in August 2025 after 12 years abroad and stays 236 days"
              headers={['Step', 'Check', 'Result']}
              rows={[
                ['Days from 8 Aug 2025 to 31 Mar 2026', '236 days, which is 182 or more', 'Resident'],
                ['10 earlier years', 'Non-resident in all 10, so resident in fewer than 2', 'Fails the ROR test'],
                ['Status', 'Resident but fails ROR', 'RNOR for FY 2025-26'],
              ]}
            />
            <DataTable
              caption="Example 5: Kabir, Indian citizen in a country with no income tax, Indian income Rs 20 lakh, stays 40 days"
              headers={['Step', 'Check', 'Result']}
              rows={[
                ['Basic and citizen tests', '40 days is under every threshold', 'Would be non-resident'],
                ['Deemed resident rule', 'Citizen, Indian income above Rs 15 lakh, not taxed elsewhere', 'Deemed resident'],
                ['Status', 'Deemed resident', 'RNOR'],
              ]}
            />
            <P>
              The Indian income in these examples still has to be taxed at slab rates. The <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Calculator</Link> gives the figure for a resident, and the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Old vs New Tax Regime Calculator</Link> shows which regime suits you.
            </P>

            {/* SECTION 10 */}
            <h2 id="entities" style={hStyle}>Residential Status of HUF, Company, Firm and LLP</h2>
            <P>
              Entities are tested on where they are managed and not on days of stay. Only a HUF can be an RNOR among them.
            </P>
            <DataTable
              caption="Residential Status of Non-Individual Taxpayers"
              headers={['Taxpayer', 'Resident if', 'Otherwise']}
              rows={[
                ['HUF', 'Control and management is wholly or partly in India', 'Non-resident'],
                ['HUF: ROR vs RNOR', 'Karta resident in 2 of 10 earlier years and 730+ days in the 7 earlier years', 'RNOR'],
                ['Indian company', 'Always', 'Not applicable'],
                ['Foreign company', 'Place of effective management is in India during the year', 'Non-resident'],
                ['Firm, LLP, AOP, BOI, local authority', 'Control and management is not wholly outside India', 'Non-resident'],
              ]}
            />
            <P>
              Place of effective management is where key management and commercial decisions are made, and a foreign company that has even a part of the year managed from India is at risk. Under CBDT guidelines, the test is not applied to a foreign company with turnover or gross receipts of Rs 50 crore or less in the year.
            </P>

            {/* SECTION 11 */}
            <h2 id="nri-practical" style={hStyle}>What NRIs and Returning NRIs Must Know</h2>
            <P>
              Your status changes what you file, what tax is deducted and what you must disclose. These are the points that cause the most notices.
            </P>
            <BulletList items={[
              <><strong>ITR form:</strong> NRIs and RNORs cannot use ITR-1. File ITR-2, or ITR-3 if you have business or professional income.</>,
              <><strong>Foreign assets:</strong> a resident other than RNOR must disclose foreign assets in Schedule FA. Non-disclosure can draw a Rs 10 lakh penalty under the Black Money Act, though non-immovable assets up to Rs 20 lakh in total are exempt from it.</>,
              <><strong>Property sale:</strong> the buyer deducts TDS under Section 195 when an NRI sells property in India. The long-term capital gains rate is 12.5%, plus surcharge and cess, and a lower deduction certificate under Section 197 can reduce the TDS.</>,
              <><strong>Forms 15G and 15H:</strong> these are for residents only, and an NRI cannot submit them.</>,
              <><strong>Treaty relief:</strong> to claim a tax treaty benefit abroad you need a tax residency certificate from the other country and Form 10F.</>,
              <><strong>New regime:</strong> an NRI can choose either regime, so compare them as a resident would.</>,
            ]} />
            <P>
              The <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Capital Gains Calculator</Link> estimates the gain on a property or shares sale, and the <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS Calculator</Link> shows how much a payer will deduct. The <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={linkStyle}>TDS rate chart</Link> lists the rates by section.
            </P>
            <P>
              Declare the right status on KYC forms, since banks and mutual funds use it to decide on TDS and account type. The deadline for your return is on the <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing last date</Link> page.
            </P>

            {/* SECTION 12 */}
            <h2 id="fema" style={hStyle}>Income Tax Residency vs FEMA: Are They the Same?</h2>
            <P>
              No, the Income Tax Act and the Foreign Exchange Management Act (FEMA) use different tests, so you can be a resident for one and an NRI for the other. The Income Tax Act counts days in the financial year, while FEMA looks at your stay in the preceding year and the purpose of travel.
            </P>
            <DataTable
              caption="Income Tax Act vs FEMA on Residence"
              headers={['Point', 'Income Tax Act, Section 6', 'FEMA']}
              rows={[
                ['Purpose', 'Decides which income India taxes', 'Governs bank accounts, investments and remittances'],
                ['Test', 'Days of stay and look-back years', 'Stay in the preceding year and purpose such as employment abroad'],
                ['Where it is used', 'Income tax return, TDS', 'NRE and NRO accounts, KYC, investing in India'],
              ]}
            />
            <P>
              The <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Reserve Bank of India</a> issues the FEMA rules. Check them before you open or convert an NRE or NRO account.
            </P>

            {/* SECTION 13 */}
            <h2 id="new-act" style={hStyle}>Residential Status Under the Income-tax Act, 2025</h2>
            <P>
              The Income-tax Act, 2025 keeps the same residence tests and applies from 1 April 2026. It speaks of the tax year in place of the previous year, and the sub-section numbers change.
            </P>
            <P>
              Section 6 of the 1961 Act still governs income earned up to 31 March 2026. That covers the return for FY 2025-26 (AY 2026-27), so the rules in this guide apply to it directly.
            </P>

            <h3 style={{ ...hStyle, fontSize: 17, marginTop: 24 }}>How to find your residential status in 5 steps</h3>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Count days this year">Add every day in India from 1 April to 31 March, including arrival and departure days.</Step>
              <Step n={2} title="Count days in the 4 earlier years">Add your stay in each of the 4 financial years before this one.</Step>
              <Step n={3} title="Apply the tests">Use 182 days, or 60 days with 365 days in 4 years. Swap in 182 days if you left for work abroad, or 120 days if you visit with Indian income above Rs 15 lakh.</Step>
              <Step n={4} title="Check deemed residence">An Indian citizen with Indian income above Rs 15 lakh and no tax liability elsewhere is an RNOR.</Step>
              <Step n={5} title="Split resident into ROR or RNOR">Look back 10 and 7 years to decide, then file the right ITR form.</Step>
            </div>


            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Residential Status</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="resstat-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Key Limits at a Glance</div>
              {([
                ['Resident, basic test', '182 days'],
                ['Resident, 2nd test', '60 + 365 days'],
                ['Citizen leaving or visiting', '182 days'],
                ['Citizen, income above Rs 15 lakh', '120 + 365 days'],
                ['ROR needs', '2 of 10 yrs, 730 of 7 yrs'],
                ['Deemed resident limit', 'Rs 15 lakh'],
                ['Status reviewed', 'Every year'],
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
                  ['/calculators/capital-gains-calculator', 'Capital Gains Calculator'],
                  ['/calculators/tds-calculator', 'TDS Calculator'],
                  ['/calculators/old-vs-new-tax-regime-calculator', 'Old vs New Regime Calculator'],
                ] as [string, string][]).map(([href, label], i) => (
                  <Link key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: i < 3 ? 8 : 0 }}>
                    <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>{label}</span>
                    <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                  </Link>
                ))}
              </div>
            </nav>

            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px', flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 Income Tax Act Exemptions'],
                ['/blogs/section-115bac-new-tax-regime', 'Section 115BAC: The New Tax Regime Explained'],
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Should You Choose'],
                ['/blogs/tds-rate-chart', 'TDS Rate Chart'],
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
        .resstat-sidebar::-webkit-scrollbar { width: 5px; }
        .resstat-sidebar::-webkit-scrollbar-track { background: transparent; }
        .resstat-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .resstat-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

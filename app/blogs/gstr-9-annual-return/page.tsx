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

const URL_ = 'https://fermor.in/blogs/gstr-9-annual-return';
const NOW = '2026-10-12T17:37:13+05:30';

export const metadata: Metadata = {
  title: 'GSTR-9 Annual Return: Due Date, Turnover Limit, Late Fee, Filing',
  description: 'GSTR-9 is due 31 December 2026 for FY 2025-26. See who must file, the Rs 2 crore and Rs 5 crore limits, late fee slabs, GSTR-9C, format and filing steps.',
  alternates: { canonical: URL_ },
  openGraph: {
    title: 'GSTR-9 Annual Return: Due Date, Turnover Limit, Late Fee, Filing | Fermor',
    description: 'Who must file GSTR-9 and GSTR-9C, the due date for FY 2025-26, late fee by turnover, table-wise format and step by step filing on the GST portal.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['GSTR-9', 'GST Annual Return', 'GSTR-9C'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GSTR-9 Annual Return | Fermor',
    description: 'Due date, turnover limit, late fee, GSTR-9C and filing steps for the GST annual return.',
  },
  keywords: [
    'gstr 9', 'gstr 9 annual return', 'gstr-9', 'gst annual return', 'gst annual return filing',
    'gstr 9 due date', 'gst annual return due date', 'gst annual return last date', 'gstr 9 extension',
    'gst annual return extension', 'gstr 9 late fees', 'gstr 9 late filing fees', 'gstr 9 filing online',
    'file gstr 9', 'how to file gstr 9', 'gstr 9 how to file', 'gstr 9c', 'gstr 9 and 9c', 'gstr9 and gstr9c',
    'gstr 9c filing', 'gstr 9a', 'gstr9a', 'gst r 9', 'gst r9', 'form gstr 9', 'gst form 9', 'gstr 9 format',
    'gstr 9 format in excel', 'gstr 9 excel format', 'gstr 9 working format in excel', 'gstr 9 reconciliation',
    'gstr 9 itc reconciliation', 'gstr 9 mandatory', 'gstr 9 turnover limit', 'gstr 9 filing requirements',
    'gstr 9 filing rules', 'gstr 9 with example', 'gstr 9 pdf', 'gstr 9 software', 'gstr 9 filing fees',
    'composition scheme annual return', 'gstr 4 annual return', 'annual return under gst', 'annual gst return',
    'gst yearly return', 'gst yearly return due date', '9c gst', 'gstr 9 nil return',
  ],
};

const faqItems = [
  { q: 'What is GSTR-9?', a: "GSTR-9 is the annual return under GST that a regular taxpayer files for each financial year. It consolidates the outward and inward supplies, tax paid and input tax credit (ITC) already reported in GSTR-1, GSTR-3B and GSTR-2B during the year." },
  { q: 'What is the GSTR-9 due date for FY 2025-26?', a: "The GSTR-9 due date for FY 2025-26 is 31 December 2026. The annual return for any financial year is due on 31 December of the following year, unless the government extends it by notification." },
  { q: 'What was the GSTR-9 due date for FY 2024-25?', a: "The statutory due date for the FY 2024-25 annual return was 31 December 2025. If you have not filed it, file now, because late fee and interest keep running." },
  { q: 'Is GSTR-9 mandatory?', a: "GSTR-9 is mandatory for regular taxpayers whose aggregate turnover is above Rs 2 crore in the financial year. Below that, the government has exempted taxpayers from filing it through an annual notification, so filing is optional." },
  { q: 'What is the turnover limit for GSTR-9?', a: "The turnover limit for mandatory GSTR-9 filing is Rs 2 crore, and the exemption below it has been renewed through a yearly notification. For FY 2024-25 it was CBIC Notification 15/2025-Central Tax, and the notification for FY 2025-26 should be checked on the CBIC website." },
  { q: 'Is GSTR-9 optional for turnover below Rs 2 crore?', a: "Yes. A regular taxpayer with aggregate turnover up to Rs 2 crore can skip GSTR-9 once the exemption notification covers that year. Filing voluntarily is still allowed and helps you reconcile your records." },
  { q: 'Who is not required to file GSTR-9?', a: "Composition taxpayers, casual taxable persons, input service distributors, non-resident taxable persons, and persons who deduct TDS under Section 51 or collect TCS under Section 52 do not file GSTR-9. Composition taxpayers file the annual return in GSTR-4 instead." },
  { q: 'What is GSTR-9C and who must file it?', a: "GSTR-9C is the reconciliation statement between your audited financial statements and your GSTR-9. It must be filed by taxpayers whose aggregate turnover exceeds Rs 5 crore, and it is self-certified, with no CA certificate needed." },
  { q: 'What is the difference between GSTR-9 and GSTR-9C?', a: "GSTR-9 is the annual return of your GST filings, while GSTR-9C reconciles the books of account with that return. A taxpayer above Rs 5 crore files both, and the GSTR-9C is uploaded after GSTR-9 data is ready." },
  { q: 'What is GSTR-9A?', a: "GSTR-9A was the annual return for composition taxpayers up to FY 2018-19. From FY 2019-20 it was replaced by the annual return in Form GSTR-4, due 30 April after the year ends." },
  { q: 'What is the late fee for GSTR-9?', a: "The GSTR-9 late fee depends on turnover for FY 2022-23 onwards: Rs 50 a day up to Rs 5 crore, Rs 100 a day from Rs 5 crore to Rs 20 crore, and Rs 200 a day above Rs 20 crore. Half is paid under CGST and half under SGST, subject to a cap on turnover." },
  { q: 'What is the maximum late fee for GSTR-9?', a: "The cap is 0.04% of turnover in the State or Union Territory for taxpayers up to Rs 20 crore, and 0.50% for those above Rs 20 crore. The cap is split equally between CGST and SGST." },
  { q: 'Is there late fee on IGST for GSTR-9?', a: "No. Section 47 charges the late fee only under the CGST and SGST (or UTGST) Acts, so there is no separate IGST component." },
  { q: 'Is interest charged if GSTR-9 is filed late?', a: "Interest at 18% a year under Section 50 is charged on any unpaid tax from the date it was due, and it is separate from the late fee. A delay in filing the annual return does not by itself attract interest if no tax is short paid." },
  { q: 'Can GSTR-9 be revised after filing?', a: "No. A GSTR-9 cannot be revised once it is filed, so reconcile fully and check every table before you submit. Any mistake has to be handled through later returns or a DRC-03 payment." },
  { q: 'How do I pay tax found short in GSTR-9?', a: "You pay tax short paid or ITC claimed in excess through the electronic cash ledger, by Form DRC-03 or in the payment section of Table 9 while filing. Interest under Section 50 applies on the amount." },
  { q: 'Is GSTR-9 filed at PAN level or GSTIN level?', a: "GSTR-9 is filed separately for each GSTIN. A business with registrations in several states files one annual return for every registration." },
  { q: 'Do I file GSTR-9 if I registered during the year?', a: "Yes, if your aggregate turnover is above the limit. A taxpayer registered for only part of the year files for that part of the financial year." },
  { q: 'Can I file a nil GSTR-9?', a: "Yes. A registered person with no business activity in the year can file a nil GSTR-9, or skip it if turnover is below the exemption limit." },
  { q: 'How many parts and tables does GSTR-9 have?', a: "GSTR-9 has 6 parts and 19 tables, numbered 4 to 19 after the basic details in Tables 1 to 3. They cover outward supplies, ITC, tax paid, previous year adjustments, other information and the HSN summary." },
  { q: 'Which data does GSTR-9 auto-populate?', a: "The GST portal pre-fills GSTR-9 from your filed GSTR-1, GSTR-3B and GSTR-2B for the year. You must check these figures against your books and correct them where they differ." },
  { q: 'Where can I download GSTR-9 in Excel?', a: "The GST portal offers an offline utility for GSTR-9 and GSTR-9C that you download from the Downloads section of gst.gov.in. The Excel work file prepares the data, which you then upload as JSON." },
  { q: 'Is there a time limit for filing an old GSTR-9?', a: "Yes. Under amendments to Section 44, an annual return cannot be furnished after 3 years from its due date, and the portal enforces this. File any pending return before that window closes." },
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
  headline: 'GSTR-9 Annual Return: Due Date, Applicability, Turnover Limit, Late Fee and Filing Steps',
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
  articleSection: 'GST',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'GSTR-9 annual return', description: 'The annual return under Section 44 of the CGST Act that regular taxpayers file each financial year' },
    { '@type': 'Thing', name: 'GSTR-9C reconciliation statement', description: 'The self-certified reconciliation of audited financial statements with the annual return, for turnover above Rs 5 crore' },
  ],
  keywords: 'gstr 9, gst annual return, gstr 9 due date, gstr 9 late fee, gstr 9c, gstr 9 turnover limit, gstr 9 format',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'GSTR-9 Annual Return', item: URL_ },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to File GSTR-9 on the GST Portal',
  description: 'Steps to reconcile your data and file the GSTR-9 annual return, and GSTR-9C if turnover is above Rs 5 crore.',
  totalTime: 'PT3H',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'File all monthly or quarterly returns', text: 'Make sure GSTR-1 and GSTR-3B for every period of the financial year are filed.' },
    { '@type': 'HowToStep', position: 2, name: 'Reconcile sales and ITC', text: 'Match GSTR-1 against GSTR-3B and your books, and GSTR-2B against ITC claimed in GSTR-3B and your purchase register.' },
    { '@type': 'HowToStep', position: 3, name: 'Settle differences', text: 'Pay any short paid tax or excess ITC through the cash ledger, with interest, using DRC-03 or the payment table.' },
    { '@type': 'HowToStep', position: 4, name: 'Prepare the return', text: 'On gst.gov.in go to Services, Returns, Annual Return, choose the year, and prepare GSTR-9 online or with the offline utility.' },
    { '@type': 'HowToStep', position: 5, name: 'Review, compute and file', text: 'Check the auto-populated tables, compute liability, pay any late fee and file with a digital signature or EVC. File GSTR-9C as well if turnover is above Rs 5 crore.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': URL_,
  name: 'GSTR-9 Annual Return: Due Date, Turnover Limit, Late Fee, Filing | Fermor',
  url: URL_,
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Goods and Services Tax',
    description: 'An indirect tax levied on the supply of goods and services in India. Regular taxpayers registered under GST file an annual return in Form GSTR-9 under Section 44 of the CGST Act, 2017.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian GST Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Goods_and_Services_Tax_(India)',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'GST registered businesses, accountants and Chartered Accountants in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'What Is GSTR-9' },
    { '@type': 'WebPageElement', cssSelector: '#due-date', name: 'GSTR-9 Due Date' },
    { '@type': 'WebPageElement', cssSelector: '#applicability', name: 'Who Must File GSTR-9' },
    { '@type': 'WebPageElement', cssSelector: '#types', name: 'GSTR-9, 9A, 9B and 9C' },
    { '@type': 'WebPageElement', cssSelector: '#format', name: 'GSTR-9 Format and Tables' },
    { '@type': 'WebPageElement', cssSelector: '#reconciliation', name: 'Reconciliation Before Filing' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-file', name: 'How to File GSTR-9' },
    { '@type': 'WebPageElement', cssSelector: '#late-fee', name: 'GSTR-9 Late Fee' },
    { '@type': 'WebPageElement', cssSelector: '#mistakes', name: 'Common Mistakes' },
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
  knowsAbout: ['GSTR-9 Annual Return', 'GST Compliance India', 'GSTR-9C', 'Input Tax Credit', 'Personal Finance India'],
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
  { id: 'overview', label: 'What Is GSTR-9' },
  { id: 'due-date', label: 'Due Date' },
  { id: 'applicability', label: 'Who Must File' },
  { id: 'types', label: 'GSTR-9, 9A, 9B, 9C' },
  { id: 'format', label: 'Format and Tables' },
  { id: 'reconciliation', label: 'Reconciliation' },
  { id: 'how-to-file', label: 'How to File' },
  { id: 'late-fee', label: 'Late Fee and Interest' },
  { id: 'mistakes', label: 'Common Mistakes' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Dates, limits and late fee slabs reflect the CGST Act, 2017 and CBIC notifications as understood for FY 2025-26, and can change by notification. Confirm the current position on the <a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST portal</a> or the <a href="https://www.cbic.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>CBIC website</a>, or with a qualified Chartered Accountant, before filing. This page is general information and not tax advice.
      </p>
    </div>
  );
}

export default function GSTR9Page() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>GSTR-9 Annual Return</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              GST
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime={NOW} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 12, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            GSTR-9 Annual Return: Due Date, Applicability, Turnover Limit, Late Fee and Filing Steps
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              GSTR-9 is the annual GST return, mandatory for regular taxpayers with aggregate turnover above Rs 2 crore, and the due date for FY 2025-26 is 31 December 2026. Taxpayers above Rs 5 crore must also file the GSTR-9C reconciliation statement.
            </p>
            <P style={{ fontSize: 16.5 }}>
              A GSTR-9 cannot be revised once filed. Below: who must file, the due date, the format, reconciliation, late fee by turnover and the filing steps.
            </P>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>What Is the GSTR-9 Annual Return?</h2>
            <P>
              GSTR-9 is the annual return under Section 44 of the CGST Act, 2017 and Rule 80 of the CGST Rules, filed once for each financial year by a regular taxpayer. It consolidates the outward supplies, inward supplies, tax paid and input tax credit (ITC) already reported in GSTR-1, GSTR-3B and GSTR-2B.
            </P>
            <P>
              The return adds no new tax by itself. Its job is to make you reconcile the year, and any short paid tax or excess ITC it exposes has to be paid to the government.
            </P>
            <DataTable
              caption="GSTR-9 at a Glance (FY 2025-26)"
              headers={['Particulars', 'Details']}
              rows={[
                ['Legal basis', 'Section 44 of the CGST Act, 2017 and Rule 80 of the CGST Rules'],
                ['Who files', 'Regular taxpayers, GSTIN by GSTIN'],
                ['Mandatory above', 'Aggregate turnover of Rs 2 crore'],
                ['GSTR-9C needed above', 'Aggregate turnover of Rs 5 crore, self-certified'],
                ['Due date', '31 December 2026 for FY 2025-26'],
                ['Revision after filing', 'Not allowed'],
                ['Filed on', 'GST portal, gst.gov.in'],
              ]}
            />
            <CalcCTA href="/calculators/gst-calculator" label="Work out GST on a supply" note="Add or remove GST at any rate to check the tax you report in your returns." />

            {/* SECTION 2 */}
            <h2 id="due-date" style={hStyle}>GSTR-9 Due Date and Extension</h2>
            <P>
              The GSTR-9 due date for FY 2025-26 is 31 December 2026, because the annual return is due on 31 December of the year after the financial year. The FY 2024-25 return was due on 31 December 2025.
            </P>
            <DataTable
              caption="GSTR-9 and GSTR-9C Due Dates"
              headers={['Financial year', 'Statutory due date', 'Status']}
              rows={[
                ['FY 2025-26', '31 December 2026', 'Open'],
                ['FY 2024-25', '31 December 2025', 'Passed, late fee runs from 1 January 2026 unless a notification extended it'],
                ['FY 2023-24', '31 December 2024', 'Passed'],
              ]}
            />
            <P>
              The government has extended this date in some years by notification, so check the <a href="https://www.cbic.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>CBIC notifications page</a> and the GST portal before you rely on any extension. Treat news of an extension as unconfirmed until a notification number is published.
            </P>
            <P>
              An annual return also cannot be filed after 3 years from its due date, a limit the portal enforces under amendments to Section 44. A return that is years overdue should therefore be filed without further delay.
            </P>

            {/* SECTION 3 */}
            <h2 id="applicability" style={hStyle}>Who Must File GSTR-9? Turnover Limit and Exemptions</h2>
            <P>
              A regular taxpayer must file GSTR-9 if aggregate turnover exceeds Rs 2 crore in the financial year. Those at or below Rs 2 crore are exempt through a yearly CBIC notification, which for FY 2024-25 was Notification 15/2025-Central Tax.
            </P>
            <DataTable
              caption="Who Files What for the GST Annual Return"
              headers={['Taxpayer', 'Annual return', 'Note']}
              rows={[
                ['Regular taxpayer, turnover above Rs 2 crore', 'GSTR-9', 'Mandatory'],
                ['Regular taxpayer, turnover up to Rs 2 crore', 'GSTR-9', 'Optional once the year\'s exemption notification applies'],
                ['Regular taxpayer, turnover above Rs 5 crore', 'GSTR-9 and GSTR-9C', 'Both mandatory'],
                ['Composition taxpayer', 'GSTR-4 (annual)', 'Due 30 April after the year ends'],
                ['Casual taxable person, non-resident taxable person', 'None', 'Not required to file'],
                ['Input service distributor', 'None', 'Not required to file'],
                ['Person deducting TDS (Section 51) or collecting TCS (Section 52)', 'None', 'Not required to file'],
              ]}
            />
            <P>
              Aggregate turnover is counted on all registrations under the same PAN, and the return itself is filed separately for each GSTIN. The notification for FY 2025-26 should be confirmed on the CBIC site, since this exemption is renewed every year.
            </P>

            {/* SECTION 4 */}
            <h2 id="types" style={hStyle}>GSTR-9, GSTR-9A, GSTR-9B and GSTR-9C: What Is the Difference?</h2>
            <P>
              Rule 80 provides four annual forms, and only GSTR-9 and GSTR-9C apply to most businesses today. GSTR-9 is the return and GSTR-9C is the reconciliation statement.
            </P>
            <DataTable
              caption="Annual Return Forms Under Rule 80"
              headers={['Form', 'For', 'Status']}
              rows={[
                ['GSTR-9', 'Regular taxpayers', 'Active, mandatory above Rs 2 crore'],
                ['GSTR-9A', 'Composition taxpayers', 'Replaced by the annual return in GSTR-4 from FY 2019-20'],
                ['GSTR-9B', 'E-commerce operators who file GSTR-8', 'Filing kept on hold'],
                ['GSTR-9C', 'Taxpayers with turnover above Rs 5 crore', 'Active, reconciles audited accounts with GSTR-9, self-certified'],
              ]}
            />
            <P>
              Earlier, GSTR-9C had to be certified by a Chartered Accountant or Cost Accountant. It is now self-certified, though many businesses still take professional help to prepare it.
            </P>

            {/* SECTION 5 */}
            <h2 id="format" style={hStyle}>GSTR-9 Format: Parts and Tables</h2>
            <P>
              The GSTR-9 form has 6 parts and 19 tables, with Tables 1 to 3 holding basic details and Tables 4 to 19 holding the figures. Most numbers are pre-filled from your filed returns and you correct them against your books.
            </P>
            <DataTable
              caption="GSTR-9 Parts and Tables"
              headers={['Part', 'Tables', 'What you report']}
              rows={[
                ['Part I', '1 to 3', 'Financial year, GSTIN, legal name, trade name'],
                ['Part II', '4 and 5', 'Outward supplies that are taxable (Table 4) and those not taxable, exempt or nil rated (Table 5)'],
                ['Part III', '6 to 8', 'ITC availed, ITC reversed, ineligible ITC and a comparison with GSTR-2B'],
                ['Part IV', '9', 'Tax paid as declared, and tax paid in cash and through ITC'],
                ['Part V', '10 to 14', 'Amendments and prior year items reported in the current year, ITC reversed or claimed later, and differential tax paid'],
                ['Part VI', '15 to 19', 'Refunds and demands, supplies from composition taxpayers, HSN summary of outward and inward supplies, and late fee payable'],
              ]}
            />
            <P>
              Table 8A compares your ITC with GSTR-2B, and Table 6 reports ITC availed in GSTR-3B. Rate changes took effect on 22 September 2025, so keep your sales records split before and after that date and check them against the <Link href="/blogs/gst-rates" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST rates guide</Link>.
            </P>

            {/* SECTION 6 */}
            <h2 id="reconciliation" style={hStyle}>Reconciliation Before Filing GSTR-9</h2>
            <P>
              You must reconcile your sales and your ITC with the returns before filing, since GSTR-9 cannot be revised and errors lock in. Do the sales side and the ITC side separately.
            </P>
            <DataTable
              caption="Reconciliations to Complete Before Filing"
              headers={['Check', 'Compare', 'What a gap usually means']}
              rows={[
                ['Sales', 'Books against GSTR-1', 'Invoices missed or booked in a different year'],
                ['Tax liability', 'GSTR-1 against GSTR-3B', 'Output tax reported but not paid, or the reverse'],
                ['ITC claimed', 'GSTR-3B against GSTR-2B', 'ITC claimed that suppliers never reported'],
                ['ITC in books', 'Purchase register against GSTR-3B', 'Credit missed, or claimed twice'],
                ['Reverse charge', 'RCM ledger against GSTR-3B', 'RCM tax paid but credit not claimed, or the reverse'],
              ]}
            />
            <P>
              Excess ITC and short paid tax found at this stage are paid with interest under Section 50. Speak to suppliers about invoices missing from GSTR-2B before the year closes.
            </P>

            {/* SECTION 7 */}
            <h2 id="how-to-file" style={hStyle}>How to File GSTR-9 on the GST Portal</h2>
            <P>
              You file GSTR-9 on the <a href="https://www.gst.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST portal</a> under Services, Returns, Annual Return, either online or through the offline utility. The offline utility and its Excel work file are available from the Downloads section.
            </P>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="File all periodic returns">Complete GSTR-1 and GSTR-3B for every month or quarter of the year.</Step>
              <Step n={2} title="Reconcile sales and ITC">Match GSTR-1, GSTR-3B, GSTR-2B and your books, and sort out differences with suppliers.</Step>
              <Step n={3} title="Pay what is short">Pay short paid tax or excess ITC through the cash ledger with interest, using DRC-03 or the payment table.</Step>
              <Step n={4} title="Prepare the return">Choose the financial year, then prepare online or upload the JSON created with the offline utility.</Step>
              <Step n={5} title="Review and file">Check the pre-filled tables, compute the liability, pay any late fee and file with a digital signature or EVC. File GSTR-9C too if turnover is above Rs 5 crore.</Step>
            </div>
            <P>
              Verify the GSTIN of each supplier you claim ITC from with the <Link href="/blogs/gst-number-search" target="_blank" rel="noopener noreferrer" style={linkStyle}>GST number search guide</Link>.
            </P>

            {/* SECTION 8 */}
            <h2 id="late-fee" style={hStyle}>GSTR-9 Late Fee and Interest</h2>
            <P>
              For FY 2022-23 onwards the GSTR-9 late fee depends on turnover: Rs 50 a day up to Rs 5 crore, Rs 100 a day above Rs 5 crore and up to Rs 20 crore, and Rs 200 a day above Rs 20 crore. Half of each amount is charged under CGST and half under SGST, with no IGST component.
            </P>
            <DataTable
              caption="GSTR-9 Late Fee Slabs from FY 2022-23 (CBIC Notification 07/2023-Central Tax)"
              headers={['Aggregate turnover', 'Per day (CGST + SGST)', 'Maximum cap (of turnover in the State or UT)']}
              rows={[
                ['Up to Rs 5 crore', 'Rs 50 (Rs 25 + Rs 25)', '0.04% (0.02% + 0.02%)'],
                ['Above Rs 5 crore, up to Rs 20 crore', 'Rs 100 (Rs 50 + Rs 50)', '0.04% (0.02% + 0.02%)'],
                ['Above Rs 20 crore', 'Rs 200 (Rs 100 + Rs 100)', '0.50% (0.25% + 0.25%)'],
              ]}
            />
            <P>
              Many guides still quote a flat Rs 200 a day capped at 0.25%, which was the rule only for earlier years. Confirm the slabs in the notification before you compute a penalty.
            </P>
            <DataTable
              caption="Late Fee Examples (all figures are illustrative)"
              headers={['Turnover', 'Days late', 'Late fee at the daily rate', 'Cap', 'Fee payable']}
              rows={[
                ['Rs 3 crore', '30', 'Rs 1,500', 'Rs 12,000', 'Rs 1,500'],
                ['Rs 10 crore', '45', 'Rs 4,500', 'Rs 40,000', 'Rs 4,500'],
                ['Rs 30 crore', '60', 'Rs 12,000', 'Rs 1,50,000', 'Rs 12,000'],
                ['Rs 2.5 crore', '365', 'Rs 18,250', 'Rs 10,000', 'Rs 10,000 (capped)'],
              ]}
            />
            <P>
              Interest at 18% a year under Section 50 is charged separately on any tax that was unpaid. The late fee is paid through the electronic cash ledger and cannot be paid from the credit ledger.
            </P>

            {/* SECTION 9 */}
            <h2 id="mistakes" style={hStyle}>Common GSTR-9 Mistakes to Avoid</h2>
            <P>
              The most common GSTR-9 mistake is filing straight from the auto-populated figures without reconciling them, and since there is no revision this error stays. These are the other points that cause trouble.
            </P>
            <BulletList items={[
              <><strong>Mixing years:</strong> reporting a prior year invoice in the current year outside Tables 10 and 11.</>,
              <><strong>ITC mismatch:</strong> claiming ITC in GSTR-3B that is not in GSTR-2B and not explaining it in Table 8.</>,
              <><strong>Turnover mismatch:</strong> turnover in GSTR-9 differing from the turnover in the books and the income tax return.</>,
              <><strong>Wrong HSN summary:</strong> skipping the HSN tables or using the wrong digit level.</>,
              <><strong>Late filing of GSTR-9C:</strong> filing GSTR-9 but forgetting the reconciliation statement above Rs 5 crore.</>,
              <><strong>Ignoring the cap date:</strong> leaving a return pending until the 3 year limit has passed.</>,
            ]} />
            <Callout>
              <strong>Treat GSTR-9 as an audit of your own year.</strong> A figure you cannot tie to a return or a ledger should be fixed in the books or paid before it goes into the form.
            </Callout>


            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: GSTR-9</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="gstr9-sidebar"
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
                ['GSTR-9 mandatory above', 'Rs 2 crore'],
                ['GSTR-9C needed above', 'Rs 5 crore'],
                ['Due date, FY 2025-26', '31 Dec 2026'],
                ['Late fee up to Rs 5 cr', 'Rs 50 a day'],
                ['Late fee Rs 5 to 20 cr', 'Rs 100 a day'],
                ['Late fee above Rs 20 cr', 'Rs 200 a day'],
                ['Interest on unpaid tax', '18% a year'],
                ['Revision after filing', 'Not allowed'],
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
                  ['/calculators/gst-calculator', 'GST Calculator'],
                  ['/calculators/tds-calculator', 'TDS Calculator'],
                  ['/calculators/income-tax-calculator', 'Income Tax Calculator'],
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
                ['/blogs/gst-rates', 'GST Rates in India'],
                ['/blogs/gst-number-search', 'GST Number Search'],
                ['/blogs/tds-rate-chart', 'TDS Rate Chart'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date'],
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
        .gstr9-sidebar::-webkit-scrollbar { width: 5px; }
        .gstr9-sidebar::-webkit-scrollbar-track { background: transparent; }
        .gstr9-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .gstr9-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { ITRCountdown } from './ITRCountdown';

export const metadata: Metadata = {
  title: 'ITR Filing Last Date FY 2025-26 (AY 2026-27): July 31, August 31 & October 31 Deadlines',
  description: 'ITR filing last date for AY 2026-27: July 31 for ITR-1/ITR-2 filers, August 31 for non-audit business income (ITR-3/ITR-4), October 31 for audit cases and companies. Belated return until December 31, revised return until March 31, 2027, and ITR-U until March 31, 2031. Penalty table, historical extension record, form selection guide, and 13-item documents checklist.',
  alternates: { canonical: 'https://fermor.in/blogs/itr-filing-last-date' },
  openGraph: {
    title: 'ITR Filing Last Date FY 2025-26 (AY 2026-27): All Deadlines',
    description: 'July 31 for salaried and investors. August 31 for non-audit business. October 31 for audit cases. Belated return until December 31. Penalty guide, form selector, documents checklist.',
    type: 'article',
    publishedTime: '2026-06-29T00:43:07+05:30',
    modifiedTime: '2026-07-27T23:26:43+05:30',
    authors: ['Fermor Analysis'],
    tags: ['ITR Filing', 'Income Tax', 'AY 2026-27', 'ITR Due Date', 'Tax Filing India', 'FY 2025-26'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ITR Filing Last Date FY 2025-26 (AY 2026-27)',
    description: 'July 31 for individuals. August 31 for non-audit business. October 31 for audit cases. Belated return until December 31. Full guide with penalty table and documents checklist.',
  },
  keywords: [
    'itr filing last date', 'last date to file itr', 'itr last date', 'itr filing last date 2025',
    'itr filing last date 2026', 'last date for itr filing', 'income tax filing last date',
    'income tax return last date', 'itr due date', 'tax audit due date', 'ay 2026-27 itr filing',
    'itr filing deadline', 'due date for filing itr', 'income tax return filing due date',
    'itr filing date', 'tax audit due date fy 2025-26', 'itr filing last date for individual',
    'company itr filing last date', 'itr due date ay 2026-27', 'last date itr filing ay 2026-27',
    'last date to file income tax return', 'itr last date 2025', 'itr last date 2026',
    'income tax return extended', 'itr filing deadline extended', 'income tax due date extended',
    'it return file last date', 'income tax return due date', 'itr date extension',
    'itr due date extend', 'income tax return filing date extension', 'itr file deadline',
    'income tax return filing due date extended', 'itr final date', 'tax return last date',
    'advance tax due date', 'due date for tds return', 'it return filing due date',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'ITR Filing Last Date FY 2025-26 (AY 2026-27): July 31, August 31, and October 31 Deadlines Explained',
  description: 'Complete guide to income tax return filing deadlines for FY 2025-26 covering all taxpayer categories, late filing penalties, historical extension record, ITR form selection, and documents checklist.',
  datePublished: '2026-06-29T00:43:07+05:30',
  dateModified: '2026-07-27T23:26:43+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/itr-filing-last-date' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'ITR Filing Due Date India', description: 'The statutory deadline by which income tax returns must be filed under the Income Tax Act 1961' },
    { '@type': 'Thing', name: 'Assessment Year 2026-27', description: 'The year for assessing income earned in Financial Year 2025-26' },
  ],
  keywords: 'itr filing last date, last date to file itr, itr due date ay 2026-27, tax audit due date fy 2025-26, income tax return extended, itr filing deadline extended',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'ITR Filing Last Date FY 2025-26', item: 'https://fermor.in/blogs/itr-filing-last-date' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the ITR filing last date for FY 2025-26 (AY 2026-27)?', acceptedAnswer: { '@type': 'Answer', text: 'The ITR filing last date for FY 2025-26 depends on your return type. ITR-1 and ITR-2 filers (salary, capital gains, no business income): July 31, 2026. ITR-3 and ITR-4 filers with business income not requiring audit: August 31, 2026. Audit cases and companies: October 31, 2026. Belated return: December 31, 2026. Revised return: March 31, 2027. Updated return (ITR-U): March 31, 2031.' } },
    { '@type': 'Question', name: 'What is the last date to file ITR for salaried individuals?', acceptedAnswer: { '@type': 'Answer', text: 'The last date to file ITR for salaried individuals for AY 2026-27 is July 31, 2026. This applies to all individuals and HUFs filing ITR-1 or ITR-2, including those with salary, pension, capital gains, or house property income with no business income requiring audit.' } },
    { '@type': 'Question', name: 'What is the company ITR filing last date for AY 2026-27?', acceptedAnswer: { '@type': 'Answer', text: 'The company ITR filing last date for AY 2026-27 is October 31, 2026 for domestic and foreign companies without international transactions. Companies with international transactions requiring a transfer pricing report under Section 92E must file by November 30, 2026.' } },
    { '@type': 'Question', name: 'What is the tax audit due date for FY 2025-26?', acceptedAnswer: { '@type': 'Answer', text: 'The tax audit due date for FY 2025-26 (AY 2026-27) is October 31, 2026. Both the audit report (Form 3CA or 3CB with Form 3CD) and the income tax return must be filed by this date for taxpayers whose accounts require audit under Section 44AB.' } },
    { '@type': 'Question', name: 'What happens if I miss the July 31, 2026 ITR deadline?', acceptedAnswer: { '@type': 'Answer', text: 'If you miss the July 31 deadline, you can file a belated return until December 31, 2026 under Section 139(4). A late fee applies under Section 234F: Rs 5,000 if total income exceeds Rs 5 lakh, or Rs 1,000 if income is Rs 5 lakh or below. Interest at 1% per month on unpaid tax also applies. You also lose the right to carry forward capital gains losses and most business losses.' } },
    { '@type': 'Question', name: 'Will the ITR filing last date be extended in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'No extension has been announced for AY 2026-27, and CBDT has confirmed the e-filing portal is stable with no plans to push the July 31, 2026 date. Extensions are rare and only happen for a specific trigger: a portal outage, a late change to the ITR forms, or a natural disaster. The most recent extension was AY 2025-26, pushed from July 31 to September 16, 2025, because of structural revisions to the ITR forms themselves.' } },
    { '@type': 'Question', name: 'Has the income tax return date been extended for 2026?', acceptedAnswer: { '@type': 'Answer', text: 'No. As of the most recent update, the July 31, 2026 deadline for ITR-1 and ITR-2 filers stands unchanged, and CBDT has not issued any extension notification for AY 2026-27. If a genuine extension is ever announced, it appears as an official press release on incometax.gov.in, not as a forwarded message or social media post, so treat any other source claiming an extension as unverified until confirmed there.' } },
    { '@type': 'Question', name: 'What is a belated return and what is the last date?', acceptedAnswer: { '@type': 'Answer', text: 'A belated return is an income tax return filed after the original due date but before December 31 of the assessment year, under Section 139(4). For AY 2026-27, the belated return deadline is December 31, 2026. A late fee under Section 234F applies, and belated returns cannot carry forward capital gains and business losses.' } },
    { '@type': 'Question', name: 'What is the difference between a belated return and a revised return?', acceptedAnswer: { '@type': 'Answer', text: 'A belated return (Section 139(4)) is filed when the original deadline was missed. A revised return (Section 139(5)) corrects errors or omissions in an already-filed original or belated return. For AY 2026-27, belated returns must be filed by December 31, 2026, while revised returns can be filed until March 31, 2027.' } },
    { '@type': 'Question', name: 'What is an updated return (ITR-U) and what is the last date?', acceptedAnswer: { '@type': 'Answer', text: 'An updated return (ITR-U) under Section 139(8A) allows taxpayers to file or correct returns for any assessment year within 4 years from the end of that AY. For AY 2026-27, the ITR-U deadline is March 31, 2031. ITR-U can only be used to declare additional income, not to claim refunds. Additional tax of 25% or 50% applies depending on when it is filed.' } },
    { '@type': 'Question', name: 'What is the penalty for late ITR filing?', acceptedAnswer: { '@type': 'Answer', text: 'Under Section 234F, the late filing fee is Rs 5,000 if total income exceeds Rs 5 lakh, or Rs 1,000 if total income is Rs 5 lakh or below. If total income is below the basic exemption limit, no fee applies. Additionally, interest at 1% per month on unpaid self-assessment tax applies under Section 234A from the due date until actual payment.' } },
    { '@type': 'Question', name: 'Which ITR form should I use for AY 2026-27?', acceptedAnswer: { '@type': 'Answer', text: 'Use ITR-1 for salary and simple income up to Rs 50 lakh with no capital gains. Use ITR-2 if you have capital gains, multiple properties, or foreign assets. Use ITR-3 for business income not under presumptive taxation, including F&O trading. Use ITR-4 (Sugam) for presumptive income under 44AD or 44ADA.' } },
    { '@type': 'Question', name: 'Is ITR filing mandatory if my income is below the taxable limit?', acceptedAnswer: { '@type': 'Answer', text: 'ITR filing is mandatory if gross income exceeds the basic exemption limit. It is also mandatory regardless of income if you have foreign assets, bank deposits exceeding Rs 1 crore, electricity expenditure above Rs 1 lakh, or foreign travel expenditure above Rs 2 lakh during the year.' } },
    { '@type': 'Question', name: 'Can I choose the old tax regime when filing a belated return?', acceptedAnswer: { '@type': 'Answer', text: 'Salaried individuals (ITR-1/ITR-2) can switch between old and new regime even in a belated return. However, self-employed individuals and business owners (ITR-3/ITR-4) must opt for old regime by the original deadline (August 31 for non-audit, October 31 for audit cases) through Form 10-IEA. Missing this deadline locks them into the new regime for that year.' } },
    { '@type': 'Question', name: 'What is AIS and why does it matter for ITR filing?', acceptedAnswer: { '@type': 'Answer', text: 'The Annual Information Statement (AIS) at incometax.gov.in aggregates all your financial activity: salary TDS, bank interest, dividend income, mutual fund and equity transactions, property sales, and foreign remittances. The Income Tax Department cross-checks your ITR against AIS. Discrepancies trigger notices. Always review AIS under e-File > AIS before filing and report any incorrect entries using the feedback option.' } },
    { '@type': 'Question', name: 'What is the ITR filing last date for previous years I missed?', acceptedAnswer: { '@type': 'Answer', text: 'The belated return deadline for AY 2024-25 (December 31, 2024) and AY 2025-26 (December 31, 2025) have both passed. However, you can still file an updated return (ITR-U) for AY 2024-25 until March 31, 2028, and for AY 2025-26 until March 31, 2029. Additional tax of 25-50% on the tax due applies.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to File ITR Online for AY 2026-27',
  description: 'Step-by-step guide to filing Income Tax Return online on the Income Tax Department portal for Assessment Year 2026-27',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Log in to the income tax portal', text: 'Visit incometax.gov.in and log in using PAN as the user ID and your registered password. First-time users must register with PAN, Aadhaar, and mobile number.' },
    { '@type': 'HowToStep', position: 2, name: 'Navigate to ITR filing', text: 'Go to e-File > Income Tax Returns > File Income Tax Return.' },
    { '@type': 'HowToStep', position: 3, name: 'Select the assessment year and return type', text: 'Choose Assessment Year 2026-27, Online mode, and Original Return (or Revised if correcting a filed return).' },
    { '@type': 'HowToStep', position: 4, name: 'Choose the correct ITR form', text: 'Select ITR-1 for salary and simple income, ITR-2 for capital gains or foreign assets, ITR-3 for business income, or ITR-4 for presumptive income. Review and correct the pre-filled data from AIS.' },
    { '@type': 'HowToStep', position: 5, name: 'Fill income, deductions, and select regime', text: 'Add all income sources not pre-filled, complete all schedule sections, select old or new tax regime, and enter all applicable deductions.' },
    { '@type': 'HowToStep', position: 6, name: 'Pay balance tax and submit', text: 'If tax is payable, generate Challan 280 for self-assessment tax under AY 2026-27, pay via net banking or UPI, enter BSR code and challan details, then submit the return.' },
    { '@type': 'HowToStep', position: 7, name: 'Verify the return', text: 'Verify using Aadhaar OTP, net banking EVC, bank account, or demat account. If verifying offline, post the signed ITR-V to CPC Bengaluru within 30 days by ordinary post.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/itr-filing-last-date',
  name: 'ITR Filing Last Date FY 2025-26 (AY 2026-27): All Deadlines, Penalties, and Form Guide',
  url: 'https://fermor.in/blogs/itr-filing-last-date',
  inLanguage: 'en-IN',
  datePublished: '2026-06-29T00:43:07+05:30',
  dateModified: '2026-07-27T23:26:43+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    { '@type': 'DefinedTerm', name: 'ITR Filing Last Date', description: 'The statutory deadline by which income tax returns must be filed under the Income Tax Act 1961 for Assessment Year 2026-27.', inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' } },
  ],
  audience: { '@type': 'Audience', audienceType: 'Indian taxpayers filing income tax returns for FY 2025-26', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '.article-lead', isAccessibleForFree: true },
    { '@type': 'WebPageElement', cssSelector: '#all-due-dates', name: 'All ITR Due Dates AY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#july-31', name: 'July 31 Deadline' },
    { '@type': 'WebPageElement', cssSelector: '#aug-31', name: 'August 31 Deadline' },
    { '@type': 'WebPageElement', cssSelector: '#oct-31', name: 'October 31 Deadline' },
    { '@type': 'WebPageElement', cssSelector: '#belated-revised', name: 'Belated Revised and Updated Returns' },
    { '@type': 'WebPageElement', cssSelector: '#extension-history', name: 'Historical Extension Record' },
    { '@type': 'WebPageElement', cssSelector: '#consequences', name: 'Consequences of Missing Deadline' },
    { '@type': 'WebPageElement', cssSelector: '#it-act-2025', name: 'Income Tax Act 2025 Section Changes' },
    { '@type': 'WebPageElement', cssSelector: '#itr-form-guide', name: 'ITR Form Selection Guide' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents Checklist' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-file', name: 'How to File ITR Online' },
    { '@type': 'WebPageElement', cssSelector: '#ais-26as', name: 'AIS and Form 26AS Guide' },
    { '@type': 'WebPageElement', cssSelector: '#old-new-regime', name: 'Old vs New Regime Decision' },
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
  knowsAbout: ['Income Tax India', 'ITR Filing', 'Tax Audit', 'Capital Gains Tax', 'Personal Finance India', 'Income Tax Return Due Date'],
};

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

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;

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

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function DueDatesTable() {
  const rows = [
    { who: 'ITR-1 and ITR-2 filers (salary, pension, capital gains, house property)', deadline: 'July 31, 2026', section: '139(1)' },
    { who: 'ITR-3 and ITR-4 filers with business/professional income not requiring tax audit', deadline: 'August 31, 2026', section: '139(1)' },
    { who: 'Businesses and professionals requiring audit under Section 44AB', deadline: 'October 31, 2026', section: '139(1)' },
    { who: 'Working partners of firms whose accounts are audited', deadline: 'October 31, 2026', section: '139(1)' },
    { who: 'Domestic and foreign companies (no international transactions)', deadline: 'October 31, 2026', section: '139(1)' },
    { who: 'Businesses with international transactions requiring transfer pricing report (Section 92E)', deadline: 'November 30, 2026', section: '139(1)' },
    { who: 'Belated return (original due date missed)', deadline: 'December 31, 2026', section: '139(4)' },
    { who: 'Revised return (correcting errors in filed return)', deadline: 'March 31, 2027', section: '139(5)' },
    { who: 'Updated return / ITR-U (missed belated return deadline)', deadline: 'March 31, 2031', section: '139(8A)' },
  ];
  const highlight = (r: typeof rows[0]) => ['July 31, 2026', 'August 31, 2026'].includes(r.deadline);
  return (
    <TableWrap label="ITR Filing Due Dates for FY 2025-26 (AY 2026-27)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 2, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Taxpayer / Return Type</span>
            <span style={{ flex: '0 0 150px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Due Date</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Section</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: highlight(r) ? '#f1f3f4' : '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 2, fontSize: 13.5, color: C.ink, lineHeight: 1.5 }}>{r.who}</span>
              <span style={{ flex: '0 0 150px', fontSize: 13.5, fontWeight: 700, color: highlight(r) ? '#166534' : C.dg, fontFamily: POPPINS }}>{r.deadline}</span>
              <span style={{ flex: '0 0 90px', fontSize: 12.5, color: C.ink3 }}>Sec. {r.section}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function HistoricalTable() {
  const rows = [
    { ay: 'AY 2020-21', original: 'Jul 31, 2020', extended: 'Jan 10, 2021', reason: 'COVID-19 pandemic' },
    { ay: 'AY 2021-22', original: 'Jul 31, 2021', extended: 'Sep 30, 2021', reason: 'New ITR portal technical issues' },
    { ay: 'AY 2022-23', original: 'Jul 31, 2022', extended: 'Not extended', reason: 'No extension' },
    { ay: 'AY 2023-24', original: 'Jul 31, 2023', extended: 'Not extended', reason: 'No extension' },
    { ay: 'AY 2024-25', original: 'Jul 31, 2024', extended: 'Not extended', reason: 'No extension' },
    { ay: 'AY 2025-26', original: 'Jul 31, 2025', extended: 'Sep 16, 2025', reason: 'Structural revisions to ITR forms and utilities' },
    { ay: 'AY 2026-27', original: 'Jul 31, 2026', extended: 'TBD', reason: 'Current year' },
  ];
  return (
    <TableWrap label="History of ITR Filing Deadline Extensions (ITR-1 and ITR-2)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            {['Assessment Year', 'Original Date', 'Extended To', 'Reason'].map(h => (
              <span key={h} style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>{h}</span>
            ))}
          </div>
          {rows.map((r, i) => (
            <div key={r.ay} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: r.ay === 'AY 2026-27' ? '#f1f3f4' : '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.ay}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.original}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: r.extended === 'Not extended' ? 400 : 600, color: r.extended === 'Not extended' ? C.ink3 : r.extended === 'TBD' ? C.ink2 : '#166534', fontFamily: INTER }}>{r.extended}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.ink3, fontFamily: INTER }}>{r.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function PenaltyTable() {
  const rows = [
    { consequence: 'Late filing fee (income above Rs 5 lakh)', detail: 'Rs 5,000 flat fee', section: '234F' },
    { consequence: 'Late filing fee (income Rs 5 lakh or below)', detail: 'Rs 1,000 flat fee', section: '234F' },
    { consequence: 'Late filing fee (income below basic exemption)', detail: 'Nil', section: '234F' },
    { consequence: 'Interest on unpaid self-assessment tax', detail: '1% per month from due date to payment date', section: '234A' },
    { consequence: 'Interest on advance tax shortfall', detail: '1% per month on shortfall amount', section: '234B/234C' },
    { consequence: 'Late audit report', detail: '0.5% of turnover; maximum Rs 1.5 lakh', section: '271B' },
  ];
  return (
    <TableWrap label="Penalty for Late ITR Filing">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 480 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 2, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Consequence</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Amount</span>
            <span style={{ flex: '0 0 80px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Section</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 2, fontSize: 13.5, color: C.ink, lineHeight: 1.4 }}>{r.consequence}</span>
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700, color: r.detail === 'Nil' ? '#166534' : C.dark, fontFamily: POPPINS }}>{r.detail}</span>
              <span style={{ flex: '0 0 80px', fontSize: 12.5, color: C.ink3 }}>Sec. {r.section}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function ITActTable() {
  const rows = [
    { topic: 'Filing original return', old: 'Section 139(1)', newAct: 'Section 263(1)' },
    { topic: 'Belated return', old: 'Section 139(4)', newAct: 'Section 263(4)' },
    { topic: 'Revised return', old: 'Section 139(5)', newAct: 'Section 263(5)' },
    { topic: 'Updated return (ITR-U)', old: 'Section 139(8A)', newAct: 'Section 263(8)' },
    { topic: 'Interest on late filing', old: 'Section 234A', newAct: 'Section 423' },
    { topic: 'Late filing fee', old: 'Section 234F', newAct: 'Section 428' },
  ];
  return (
    <TableWrap label="Section References: IT Act 1961 vs IT Act 2025">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 460 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 2, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Provision</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>IT Act 1961</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>IT Act 2025</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'center' }}>
              <span style={{ flex: 2, fontSize: 13.5, color: C.ink }}>{r.topic}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.old}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.newAct}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function FormGuideTable() {
  const rows = [
    { form: 'ITR-1 (Sahaj)', who: 'Resident individuals', conditions: 'Salary, pension, one house property, other income (total up to Rs 50L). No capital gains, no business income, no foreign assets, agriculture up to Rs 5K.' },
    { form: 'ITR-2', who: 'Individuals and HUF', conditions: 'Capital gains (stocks, mutual funds, property), multiple house properties, foreign income or assets, salary above Rs 50L. No business or profession income.' },
    { form: 'ITR-3', who: 'Individuals and HUF', conditions: 'Business or professional income not covered by presumptive taxation. Required for F&O trading, intraday equity trading, consultancy not under 44ADA.' },
    { form: 'ITR-4 (Sugam)', who: 'Individuals, HUF, Firms (not LLP)', conditions: 'Presumptive income under 44AD (business turnover up to Rs 3 crore) or 44ADA (professional receipts up to Rs 75 lakh). Total income up to Rs 50L.' },
    { form: 'ITR-5', who: 'Firms, LLPs, AOPs, BOIs', conditions: 'All income types. Not for companies or trusts claiming Section 11 exemption.' },
    { form: 'ITR-6', who: 'Companies', conditions: 'All companies other than those claiming Section 11 exemption (charitable or religious trusts).' },
    { form: 'ITR-7', who: 'Trusts, political parties, institutions', conditions: 'Entities claiming exemption under Sections 139(4A) to 139(4F), including charitable trusts, political parties, universities.' },
  ];
  return (
    <TableWrap label="ITR Form Selection Guide for AY 2026-27">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Form</span>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Who Uses It</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Eligibility Criteria</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.form} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 110px', fontSize: 13.5, fontWeight: 700, color: C.dg, fontFamily: INTER }}>{r.form}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13, color: C.ink2 }}>{r.who}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.55 }}>{r.conditions}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function Breadcrumb() {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px' }}>
        <ol style={{ display: 'flex', alignItems: 'center', gap: 6, margin: 0, padding: 0, listStyle: 'none' }}>
          <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>Home</Link></li>
          <li style={{ color: C.border }}>›</li>
          <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>Blogs</Link></li>
          <li style={{ color: C.border }}>›</li>
          <li aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER, fontWeight: 500 }}>ITR Filing Last Date FY 2025-26</li>
        </ol>
      </div>
    </div>
  );
}

function KeyDates() {
  const items = [
    { date: 'Jul 31, 2026', label: 'ITR-1 & ITR-2 (salaried, investors)', urgent: true },
    { date: 'Aug 31, 2026', label: 'ITR-3 & ITR-4 (non-audit business)', urgent: true },
    { date: 'Oct 31, 2026', label: 'Audit cases, companies' },
    { date: 'Nov 30, 2026', label: 'Transfer pricing cases' },
    { date: 'Dec 31, 2026', label: 'Belated return' },
    { date: 'Mar 31, 2027', label: 'Revised return' },
    { date: 'Mar 31, 2031', label: 'Updated return (ITR-U)' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>AY 2026-27 Key Dates</span>
      </div>
      {items.map((item, i) => (
        <div key={item.label} style={{ padding: '11px 16px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: item.urgent ? '#166534' : C.dg, fontFamily: POPPINS, flexShrink: 0 }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Income Tax Calculator', desc: 'Old vs new regime for FY 2025-26', href: '/calculators/income-tax-calculator' },
    { label: 'Capital Gains Calculator', desc: 'STCG and LTCG on equity, mutual funds, property', href: '/calculators/capital-gains-calculator' },
    { label: 'In-Hand Salary Calculator', desc: 'Monthly take-home after all deductions', href: '/calculators/in-hand-salary-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedReads() {
  const links = [
    { label: 'Income Tax Slabs FY 2025-26: New and Old Regime Rates', href: '/blogs/income-tax-slabs-fy-2025-26' },
    { label: 'TDS Rate Chart FY 2026-27: Every Section and Rate', href: '/blogs/tds-rate-chart' },
    { label: 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar', href: '/blogs/pan-card-download' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dg, fontWeight: 500, lineHeight: 1.5, display: 'block' }}>{l.label}</span>
        </Link>
      ))}
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

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> Due dates are statutory deadlines under the Income Tax Act 1961. The government may extend these dates; always verify on <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'underline' }}>incometax.gov.in</a> before filing. This article is for informational purposes only and does not constitute tax advice. Consult a qualified chartered accountant for your specific situation.
      </p>
    </div>
  );
}

export default function ITRFilingLastDatePage() {
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
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: '#f1f3f4', padding: '3px 10px', borderRadius: 4 }}>Income Tax</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            ITR Filing Last Date FY 2025-26 (AY 2026-27): July 31 for Individuals, August 31 for Business, October 31 for Audit Cases
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            All ITR filing deadlines for FY 2025-26 in one place. The due date depends on your income type and return form. Filing after the deadline triggers a late fee, interest on unpaid tax, and blocks you from carrying forward capital gains losses.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-27T23:26:43+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 27, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>15 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties}
          className="article-grid"
        >
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              The ITR filing last date for FY 2025-26 (AY 2026-27) is <strong style={{ fontWeight: 700, color: C.dark }}>July 31, 2026</strong> for ITR-1 and ITR-2 filers, <strong style={{ fontWeight: 700, color: C.dark }}>August 31</strong> for non-audit ITR-3/ITR-4, and <strong style={{ fontWeight: 700, color: C.dark }}>October 31</strong> for audit cases and companies. No extension has been announced.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Missing the original deadline does not close the window entirely: a belated return is available until December 31, 2026, a revised return until March 31, 2027, and an updated return (ITR-U) until March 31, 2031.
            </p>

            <ITRCountdown />

            <h2 id="all-due-dates" style={hStyle}>ITR Filing Due Dates for AY 2026-27: All Categories</h2>
            <p style={pStyle}>
              The due date for filing an income tax return depends on which ITR form you use and whether your accounts require a tax audit. The table below covers all categories including companies, audit cases, and returns filed after the original deadline.
            </p>
            <DueDatesTable />

            <h2 id="july-31" style={hStyle}>July 31, 2026: Deadline for Salaried Individuals and Investors</h2>
            <p style={pStyle}>
              The July 31 deadline applies to the largest group of taxpayers in India: individuals, HUFs, BOIs, and AOPs filing ITR-1 or ITR-2. That covers salaried employees, pensioners, and investors with capital gains or house property income.
            </p>
            <p style={pStyle}>
              Freelancers and consultants declaring presumptive income under Section 44ADA file ITR-4, not ITR-1 or ITR-2, so their deadline is August 31, not July 31. If you are unsure which applies, check whether you are filing ITR-1/ITR-2 or ITR-3/ITR-4.
            </p>
            <Callout>
              July 31 is a hard deadline. There is no grace period, no late filing window on August 1: the moment July 31 passes, your return is officially belated and the Section 234F fee applies when you file. File before July 31 to avoid it entirely.
            </Callout>
            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="Compare old and new regime tax liability before filing. Takes under 2 minutes and shows your exact refund or balance due."
            />

            <h2 id="aug-31" style={hStyle}>August 31, 2026: Non-Audit Business Income (ITR-3 and ITR-4)</h2>
            <p style={pStyle}>
              August 31, 2026 is the due date for individuals and HUFs with business or professional income that does not require a tax audit. This group includes:
            </p>
            <BulletList items={[
              'Freelancers and consultants filing under presumptive taxation (Section 44ADA) with professional receipts below Rs 75 lakh',
              'Small business owners filing under presumptive taxation (Section 44AD) with business turnover below Rs 3 crore',
              'F&O and intraday equity traders who declare income without requiring an audit',
              'Professionals (doctors, lawyers, architects, engineers) earning below the audit threshold of Rs 50 lakh in receipts',
            ]} />
            <p style={pStyle}>
              The August 31 date is a permanent change, not a one-year extension. The Finance Act 2026 amended Section 139(1) itself, so non-audit business filers keep this later deadline in future years too, not just for AY 2026-27.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              <strong style={{ fontWeight: 700, color: C.dark }}>Critical for self-employed individuals:</strong> To opt for the old tax regime for FY 2025-26, you must file Form 10-IEA by August 31 (or October 31 for audit cases). Miss that window and you are locked into the new regime with no option to switch back.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              This restriction applies only to self-employed and business filers. Salaried individuals (ITR-1/ITR-2) can switch regimes while filing, even in a belated return.
            </p>

            <h2 id="oct-31" style={hStyle}>October 31, 2026: Audit Cases, Companies, and Partners of Audited Firms</h2>
            <p style={pStyle}>
              A tax audit under Section 44AB is mandatory when:
            </p>
            <BulletList items={[
              'Business turnover exceeds Rs 1 crore (or Rs 10 crore if at least 95% of receipts and payments are through banking channels)',
              'Professional receipts exceed Rs 50 lakh',
              'You opted for presumptive taxation (44AD or 44ADA) in any of the preceding 5 years but now want to report income below the presumptive threshold',
              'A declaration under Section 44AE (goods carriage) is made and income declared is below the prescribed limit',
            ]} />
            <p style={pStyle}>
              If your accounts require audit, both the audit report (Form 3CA or 3CB with Form 3CD) and the return must be filed by October 31. Filing the return before your CA uploads the audit report is treated as a defective return.
            </p>
            <p style={pStyle}>
              Companies must also file by October 31. The only exception is companies with international transactions: those must include a transfer pricing audit report under Section 92E, which pushes their deadline to November 30, 2026.
            </p>
            <p style={pStyle}>
              If you have gains from equity shares or mutual funds to include in your return, calculate your exact STCG and LTCG before filing.
            </p>
            <CalcCTA
              href="/calculators/capital-gains-calculator"
              label="Capital Gains Calculator"
              note="Get the exact STCG and LTCG figures you need for Schedule CG on equity, mutual funds, and property."
            />

            <h2 id="belated-revised" style={hStyle}>Belated Return, Revised Return, and Updated Return (ITR-U): What Comes After the Deadline</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              Missing the original deadline does not permanently close the filing window. Three options exist depending on when you are filing and what you need to correct:
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Belated Return (Section 139(4))', text: 'For taxpayers who missed the original due date. Must be filed by December 31, 2026 for AY 2026-27. Late fee under Section 234F applies (Rs 5,000 or Rs 1,000). Capital gains losses and most business losses cannot be carried forward. You can still revise a belated return using a revised return before March 31, 2027.' },
                { title: 'Revised Return (Section 139(5))', text: 'For correcting errors or omissions in a return already filed (original or belated). Must be filed by March 31, 2027 for AY 2026-27. No additional fee for revising; however, if the original was filed late, the Section 234F fee already applied. A revised return supersedes the original completely.' },
                { title: 'Updated Return or ITR-U (Section 139(8A))', text: 'Available for 4 years from the end of the relevant AY, which means until March 31, 2031 for AY 2026-27. Can be filed even if no original return was filed or the belated return was missed. Additional tax applies: 25% of total tax and interest due if filed within 12 months of end of AY, and 50% if filed in months 13 to 48. ITR-U cannot be used to claim additional refunds, deductions, or benefits. It is only for declaring additional income that was missed or understated.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 4px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 id="extension-history" style={hStyle}>Will the ITR Filing Deadline Be Extended in 2026?</h2>
            <p style={pStyle}>
              No, the July 31, 2026 deadline has not been extended, and CBDT has confirmed the e-filing portal is stable. Extensions happen only for a specific trigger, a portal outage, a late forms change, or a natural disaster, and none apply this year.
            </p>
            <p style={pStyle}>
              That confirmed pattern still leaves room for a late change: AY 2025-26 was extended from July 31 to September 15, 2025 (then a further single day to September 16) because of structural revisions to the ITR forms themselves. The table below is the full extension record.
            </p>
            <HistoricalTable />
            <p style={pStyle}>
              Do not delay filing in anticipation of an extension that has not been announced. If one is issued, it appears as an official CBDT press release on the <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>income tax portal</a>, never as a rumour on social media.
            </p>

            <h2 id="consequences" style={hStyle}>Consequences of Missing the ITR Filing Deadline</h2>
            <p style={pStyle}>
              Missing the deadline is not just about the fee. There are five distinct consequences, and the fee is the smallest of them:
            </p>
            <PenaltyTable />
            <p style={{ ...pStyle, marginBottom: 10 }}>Beyond the fees and interest, missing the deadline also causes:</p>
            <BulletList items={[
              'Loss of carry-forward for capital gains losses: if you sold equity shares or mutual funds at a loss in FY 2025-26, that loss can no longer be offset against future gains if you file after the due date',
              'Loss of carry-forward for business and speculation losses: trading losses, business losses, and speculative losses cannot be carried forward in a belated return',
              'Old regime option lapse: self-employed individuals and business owners (ITR-3/ITR-4 filers) cannot choose the old tax regime after the original due date if they miss filing Form 10-IEA in time',
              'Loan application friction: banks processing home loan, personal loan, or car loan applications typically ask for ITR copies for 2-3 preceding years; a late or missing ITR for AY 2026-27 will create delays in 2027 and 2028 loan processing',
              'Visa application complications: many countries ask for ITR acknowledgments as proof of income when processing visa applications; delayed filing affects international travel plans',
              'Delayed refunds: refunds from belated returns take longer to process than refunds from on-time returns; if you are owed a large TDS refund, filing early maximizes the time the department has to process it',
            ]} />

            <h2 id="it-act-2025" style={hStyle}>Income Tax Act 2025: How Section Numbers Changed</h2>
            <p style={pStyle}>
              The Income Tax Act 2025 came into effect from April 1, 2026, but AY 2026-27 returns are still filed under the 1961 Act, since the FY 2025-26 income being reported was earned before that date. The new Act applies from AY 2027-28 onward.
            </p>
            <ITActTable />

            <h2 id="itr-form-guide" style={hStyle}>Which ITR Form to Use for AY 2026-27</h2>
            <p style={pStyle}>
              Using the wrong ITR form triggers a defective return notice and forces a refile. The two most frequent errors: using ITR-1 when you have capital gains (use ITR-2 instead), and using ITR-4 when turnover exceeds the presumptive threshold (use ITR-3 instead).
            </p>
            <FormGuideTable />
            <p style={pStyle}>
              If you traded in F&O (futures and options) or intraday equity at any point during FY 2025-26, you must file ITR-3, regardless of whether you made a profit or a loss. This is because F&O income is treated as non-speculative business income, not capital gains.
            </p>

            <h2 id="documents" style={hStyle}>Documents to Gather Before Filing ITR</h2>
            <p style={pStyle}>
              Gathering these 13 documents before opening the portal avoids mid-session interruptions and reduces filing errors:
            </p>
            <BulletList items={[
              'Form 16 from your employer (Part A is the TDS summary generated from the income tax portal; Part B is the detailed salary breakup showing allowances, perquisites, and deductions claimed via Form 12BB)',
              'Form 16A from banks and NBFCs for TDS deducted on interest income from FDs, savings accounts, and non-salary payments',
              <>Annual Information Statement (AIS) from <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</a> under e-File (verify every entry and submit feedback for any incorrect entries before filing)</>,
              'Form 26AS or Taxpayer Information Summary (TIS) from the income tax portal to cross-check all TDS credits against what deductors have filed',
              'Bank statements and interest certificates for all savings accounts, FDs, and recurring deposits for FY 2025-26 (to report interest income)',
              'Capital gains statement from your broker for equity shares and mutual fund redemptions during FY 2025-26 (NSE/BSE trades and any F&O positions)',
              'CAMS or KFintech consolidated account statement for mutual fund purchases and redemptions across all fund houses',
              'Home loan interest certificate and principal repayment statement from your bank (for Section 24 interest deduction up to Rs 2 lakh and Section 80C principal deduction)',
              'Rent receipts and landlord PAN if you claim HRA exemption; rental income and expense details if you have house property income',
              '80C investment proofs: ELSS statements, PPF passbook, life insurance premium receipts, ULIP premium receipts, tuition fee receipts, and housing loan principal',
              '80D health insurance premium receipts for self, spouse, children, and parents; preventive health checkup receipts up to Rs 5,000',
              <>NPS contribution statement from <a href="https://www.npscra.proteantech.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Protean eGov (formerly NSDL) or your employer</a> for Section 80CCD(1B) deduction of up to Rs 50,000 over the Section 80C limit</>,
              'Previous year\'s ITR and computation sheet to verify carry-forward loss claims and confirm which tax regime you were in for FY 2024-25',
            ]} mb={24} />

            <h2 id="how-to-file" style={hStyle}>How to File ITR Online for AY 2026-27: Step-by-Step</h2>
            <p style={{ ...pStyle, marginBottom: 16 }}>Filing takes 20 to 40 minutes if all documents are ready in advance. The portal at <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</a> pre-fills much of your data from AIS, but you must verify every field before submission:</p>
            <div style={{ marginBottom: 24 }}>
              <Step n={1} title="Log in using your PAN">Visit incometax.gov.in and log in using PAN as your user ID and your registered password. If this is your first time, click Register, enter your PAN, and complete the OTP-based registration using your Aadhaar-linked mobile number.</Step>
              <Step n={2} title="Navigate to ITR filing">Go to e-File from the top menu, then Income Tax Returns, then File Income Tax Return.</Step>
              <Step n={3} title="Select assessment year and return type">Choose Assessment Year 2026-27. Select Online mode (unless you are filing using an offline utility). For a fresh filing, select Original Return. If you are correcting a return already filed, select Revised Return.</Step>
              <Step n={4} title="Choose the correct ITR form">Select your ITR form based on your income type. The portal may auto-suggest a form based on AIS data but verify it is correct using the form guide above. An incorrect form results in a defective return notice.</Step>
              <Step n={5} title="Review pre-filled data and add missing income">The portal pre-fills salary, TDS credits, and certain investment details from AIS. Review every section carefully. Add any income not pre-filled: rental income, freelance income, capital gains on unlisted assets, foreign income. Select old or new tax regime and complete all deduction schedules.</Step>
              <Step n={6} title="Pay balance tax and generate challan">If the portal shows tax payable after deducting TDS and advance tax, click Pay Now to generate Challan 280 for Self-Assessment Tax under AY 2026-27. Pay using net banking or UPI and enter the BSR code, date, and serial number in the ITR before submitting.</Step>
              <Step n={7} title="Submit and verify">Submit the return. Immediately verify it using Aadhaar OTP (fastest), net banking EVC, or your bank account or demat account. An unverified return is not a valid ITR. If you choose offline verification, download and print the ITR-V, sign it in blue ink, and post it to CPC Bengaluru by ordinary post within 30 days of filing.</Step>
            </div>

            <h2 id="ais-26as" style={hStyle}>AIS and Form 26AS: What to Cross-Check Before Filing</h2>
            <p style={pStyle}>
              The Annual Information Statement (AIS) on the income tax portal is the single most important document to review before filing. It aggregates salary TDS, bank interest, dividends, equity and mutual fund transactions, property sale proceeds, and foreign remittances in one place.
            </p>
            <p style={pStyle}>
              Since AY 2024-25, the AIS also includes virtual digital asset (cryptocurrency) transactions where exchanges have filed TDS under Section 194S. If you bought or sold any cryptocurrency in FY 2025-26, verify these entries carefully before filing.
            </p>
            <p style={{ ...pStyle, marginBottom: 10 }}>Before filing:</p>
            <BulletList items={[
              'Download your AIS from incometax.gov.in > e-File > AIS',
              'Compare every AIS entry against your own records and Form 16/Form 16A',
              'If an entry is incorrect (most commonly: interest or dividend credited to a different PAN, a transaction you did not make, or a duplicate entry), use the feedback option in AIS to report the error',
              'Wait for the AIS to reflect your feedback before filing, if time permits; alternatively, report the discrepancy in your ITR and file on time',
              'Discrepancies between AIS and your filed ITR trigger automated scrutiny notices; addressing them before filing is far easier than responding to a notice afterward',
            ]} />
            <p style={pStyle}>
              Form 26AS is the older counterpart to AIS, showing specifically TDS, TCS, and advance tax payments. Verify it matches your Form 16, Form 16A, and bank TDS certificates. A deductor's incorrect filing gets your credit claim rejected and triggers a demand notice.
            </p>

            <h2 id="old-new-regime" style={hStyle}>Old Regime vs New Regime: Decide Before You File</h2>
            <p style={pStyle}>
              The new tax regime is the default for AY 2026-27 under the Income Tax Act 1961. If you want to use the old regime and claim deductions under Sections 80C, 80D, HRA exemption, home loan interest, and others, you must actively select it while filing.
            </p>
            <p style={pStyle}>
              Salaried individuals can switch regimes at the time of filing, regardless of which regime their employer used for TDS. File under the old regime after new-regime TDS, and the ITR calculates the refund due on the excess.
            </p>
            <p style={pStyle}>
              Run both calculations before deciding. The <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Income Tax Calculator</Link> computes old and new regime tax side by side in under 60 seconds.
            </p>
            <p style={pStyle}>
              The break-even point for most salaried individuals is around Rs 3.75 lakh in Section 80C plus HRA deductions: above that, old regime usually wins; below it, new regime does. The exact outcome still depends on your income, HRA city, and deduction profile.
            </p>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {[
                { q: 'What is the ITR filing last date for FY 2025-26?', a: 'The ITR filing last date for FY 2025-26 (AY 2026-27) is July 31, 2026 for ITR-1 and ITR-2 filers (salaried individuals, investors). August 31, 2026 for ITR-3 and ITR-4 filers with business income not requiring a tax audit. October 31, 2026 for audit cases and companies. Belated return: December 31, 2026. Revised return: March 31, 2027. Updated return (ITR-U): March 31, 2031.' },
                { q: 'What is the last date to file ITR for salaried individuals?', a: 'The last date for salaried individuals filing ITR-1 or ITR-2 is July 31, 2026. This covers all individuals with salary, pension, capital gains, and house property income, with total income up to Rs 50 lakh (for ITR-1) or any amount (for ITR-2), as long as there is no business income.' },
                { q: 'What is the company ITR due date for AY 2026-27?', a: 'Companies must file by October 31, 2026. Companies with international transactions requiring a transfer pricing report (Section 92E) must file by November 30, 2026.' },
                { q: 'What is the tax audit due date for FY 2025-26?', a: 'The tax audit due date for FY 2025-26 is October 31, 2026. Both the audit report (Form 3CA/3CB with 3CD) and the income tax return must be filed by this date for taxpayers whose accounts require audit under Section 44AB.' },
                { q: 'What happens if I miss the July 31, 2026 ITR deadline?', a: 'You can file a belated return until December 31, 2026. A late filing fee of Rs 5,000 (income above Rs 5 lakh) or Rs 1,000 (income Rs 5 lakh or below) applies under Section 234F. Interest at 1% per month on unpaid tax also applies under Section 234A. You lose the right to carry forward capital gains and business losses.' },
                { q: 'Will the ITR filing last date be extended in 2026?', a: 'No extension has been announced for AY 2026-27, and CBDT has confirmed the e-filing portal is stable. Extensions only happen for a specific trigger: a portal outage, a late change to ITR forms, or a natural disaster. The most recent extension was AY 2025-26, pushed from July 31 to September 16, 2025, over structural changes to the ITR forms.' },
                { q: 'Has the income tax return date been extended for 2026?', a: 'No. The July 31, 2026 deadline for ITR-1 and ITR-2 filers stands unchanged as of the most recent update, and CBDT has issued no extension notification for AY 2026-27. A genuine extension always appears as an official press release on incometax.gov.in, never as a forwarded message or social media post.' },
                { q: 'What is a belated return and what is the last date?', a: 'A belated return is an ITR filed after the original due date but before December 31, 2026 (for AY 2026-27), under Section 139(4). A late fee applies. Belated returns cannot carry forward most capital gains and business losses.' },
                { q: 'What is the difference between a belated return and a revised return?', a: 'A belated return (Section 139(4)) is filed when the original deadline was missed. A revised return (Section 139(5)) corrects errors in a return already filed. For AY 2026-27: belated returns must be filed by December 31, 2026; revised returns can be filed until March 31, 2027.' },
                { q: 'What is an updated return (ITR-U) and when is the last date?', a: 'An ITR-U under Section 139(8A) lets you file or correct returns for any assessment year within 4 years of the end of that AY. For AY 2026-27, the deadline is March 31, 2031. Additional tax of 25% or 50% applies. ITR-U cannot be used to claim refunds or additional deductions.' },
                { q: 'What is the penalty for late ITR filing?', a: 'Under Section 234F: Rs 5,000 if total income exceeds Rs 5 lakh; Rs 1,000 if total income is Rs 5 lakh or below; nil if income is below the basic exemption limit. Additionally, Section 234A interest at 1% per month on unpaid tax applies from the due date until actual payment.' },
                { q: 'Which ITR form should I use for AY 2026-27?', a: 'ITR-1 for salary and simple income up to Rs 50 lakh with no capital gains. ITR-2 for capital gains, multiple properties, or foreign assets. ITR-3 for business income including F&O trading. ITR-4 (Sugam) for presumptive income under 44AD (turnover up to Rs 3 crore) or 44ADA (receipts up to Rs 75 lakh).' },
                { q: 'Is ITR filing mandatory even if I have no tax to pay?', a: 'ITR filing is mandatory if gross income exceeds the basic exemption limit (Rs 3 lakh under new regime, Rs 2.5 lakh under old regime for individuals below 60). It is also mandatory regardless of income if you have foreign assets, bank deposits above Rs 1 crore, electricity expenditure above Rs 1 lakh, or foreign travel expenditure above Rs 2 lakh.' },
                { q: 'Can I choose the old tax regime when filing a belated return?', a: 'Salaried individuals (ITR-1/ITR-2) can switch regime at any point, including in a belated return. Self-employed individuals and business owners (ITR-3/ITR-4) must opt for old regime by their original deadline (August 31 or October 31) through Form 10-IEA. Missing this deadline permanently locks them into the new regime for FY 2025-26.' },
                { q: 'What is AIS and why does it matter for ITR filing?', a: 'The Annual Information Statement (AIS) at incometax.gov.in shows all your financial activity: salary, interest, dividends, equity and mutual fund transactions, property sales, and crypto trades. The IT Department cross-checks your ITR against AIS. Discrepancies trigger notices. Review AIS before filing and submit feedback for any incorrect entries.' },
                { q: 'What is the ITR filing last date for previous years I missed?', a: 'Belated return windows for AY 2024-25 (December 31, 2024) and AY 2025-26 (December 31, 2025) have passed. You can still file an updated return (ITR-U): for AY 2024-25 until March 31, 2028, and for AY 2025-26 until March 31, 2029. Additional tax of 25-50% applies on the tax due.' },
              ].map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{ padding: '15px 18px', cursor: 'pointer', fontSize: 14.5, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none' as const, lineHeight: 1.4 }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>


            <Disclaimer />
          </article>

          <aside
            className="itr-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}>
          <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>
            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <nav style={{ flexShrink: 0 }} aria-label="Related Calculators">
              <div style={{ flexShrink: 0 }}><FermorTools /></div>
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
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
        .itr-sidebar::-webkit-scrollbar { width: 5px; }
        .itr-sidebar::-webkit-scrollbar-track { background: transparent; }
        .itr-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .itr-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) { .article-grid { grid-template-columns: 1fr !important; } }
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

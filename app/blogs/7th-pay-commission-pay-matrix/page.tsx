import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';

export const metadata: Metadata = {
  title: '7th Pay Commission Pay Matrix Table, Fitment Factor & DA 2026',
  description: 'Full 7th Pay Commission pay matrix for central government employees: 18 pay levels, the 2.57 fitment factor, minimum pay of Rs 18,000, and the 2026 DA hike to 60%. Free to use pay scale guide with allowances, gratuity, pension and insurance tables.',
  alternates: {
    canonical: 'https://fermor.in/blogs/7th-pay-commission-pay-matrix',
  },
  openGraph: {
    title: '7th Pay Commission Pay Matrix Table and Fitment Factor',
    description: '18 pay levels from Rs 18,000 to Rs 2,50,000, the 2.57 fitment factor, and the 2026 DA hike to 60% for central government employees and pensioners.',
    type: 'article',
    publishedTime: '2026-10-09T17:02:33+05:30',
    authors: ['Fermor Analysis'],
    tags: ['7th Pay Commission', 'Pay Matrix', 'Fitment Factor', 'Dearness Allowance', 'Government Employees'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '7th Pay Commission Pay Matrix Table and Fitment Factor',
    description: '18 pay levels, 2.57 fitment factor, and the 2026 DA hike to 60% for central government employees.',
  },
  keywords: [
    '7th pay commission', '7th pay commission pay matrix', '7th cpc pay matrix', 'pay scale',
    '7th pay scale', 'fitment factor', 'fitment factor 2.57', 'pay matrix table',
    'da hike 2026', 'dearness allowance 2026', '7th pay commission latest news',
    'central government employees salary', 'pay band and grade pay', 'pay level 1 to 18',
    '7th cpc pay band', 'minimum pay 18000', 'da da rate 2026', 'government salary structure',
    '7th pay commission calculator', 'pay matrix level 10', 'basic pay central government',
  ],
};

const TOC_ITEMS = [
  { id: 'what-is', label: 'What is the Pay Matrix?' },
  { id: 'da-hike-2026', label: '2026 DA Hike' },
  { id: 'pay-matrix-table', label: 'Pay Matrix Table' },
  { id: 'fitment-factor', label: 'Fitment Factor' },
  { id: 'entry-level-pay', label: 'Entry-Level Pay' },
  { id: 'how-to-read', label: 'How to Read Your Pay Level' },
  { id: 'benefits', label: 'Benefits of the Pay Matrix' },
  { id: 'defence-allowances', label: 'Defence Personnel Allowances' },
  { id: 'allowances-advances', label: 'Allowances, Advances & Medical' },
  { id: 'insurance', label: 'Insurance Coverage' },
  { id: 'pension-gratuity', label: 'Pension and Gratuity' },
  { id: 'financial-planning', label: 'Financial Planning on Revised Pay' },
  { id: 'faq', label: 'FAQs' },
];

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: '7th Pay Commission Pay Matrix Table and Fitment Factor',
  description: 'Complete guide to the 7th Pay Commission pay matrix for Indian central government employees: the 18 pay levels, the 2.57 fitment factor, minimum and maximum pay, the 2026 Dearness Allowance hike to 60%, allowances, gratuity, pension and insurance provisions.',
  datePublished: '2026-10-09T17:02:33+05:30',
  dateModified: '2026-10-09T17:02:33+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/7th-pay-commission-pay-matrix' },
  articleSection: 'Government & Utility Services',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: '7th Pay Commission', description: 'The commission that revised pay, allowances and pension for Indian central government employees, introducing a Pay Matrix in place of pay bands and grade pay' },
    { '@type': 'Thing', name: 'Fitment Factor', description: 'The multiplier (2.57 under the 7th CPC) applied to pre-revised pay to compute revised basic pay in the Pay Matrix' },
  ],
  keywords: '7th pay commission, pay matrix, fitment factor, da hike 2026, pay scale, pay level, dearness allowance',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: '7th Pay Commission Pay Matrix', item: 'https://fermor.in/blogs/7th-pay-commission-pay-matrix' },
  ],
};

const faqItems = [
  { q: 'What is the 7th Pay Commission Pay Matrix?', a: 'The 7th Pay Commission Pay Matrix is the salary structure that replaced the earlier system of pay bands and grade pay for central government employees. It arranges 18 pay levels horizontally and shows pay progression within each level vertically, with annual increments of 3%. The minimum pay starts at Rs 18,000 and the structure extends up to Level 18 at Rs 2,50,000.' },
  { q: 'What is the fitment factor in the 7th Pay Commission?', a: 'The fitment factor under the 7th Pay Commission is 2.57. To fix revised pay, the existing pre-revised pay was multiplied by 2.57, and the resulting amount was fitted into the corresponding cell of the relevant Pay Matrix level.' },
  { q: 'What is the minimum pay under the 7th CPC?', a: 'The minimum pay under the 7th Pay Commission revised pay structure is Rs 18,000 per month, effective from 1 January 2016, a significant increase from the earlier minimum of Rs 7,000.' },
  { q: 'What is the maximum pay under the 7th CPC?', a: 'The Apex Scale under the 7th CPC pays Rs 2,25,000 per month. Above that, the Cabinet Secretary and equivalent posts (Level 18) are paid Rs 2,50,000 per month, the highest basic pay in the structure.' },
  { q: 'What is the current DA rate in 2026?', a: 'Following the Union Cabinet\'s approval on 18 April 2026, the Dearness Allowance (DA) for central government employees was increased from 58% to 60% of basic pay, effective retroactively from 1 January 2026. The same 2% hike applies to Dearness Relief (DR) for pensioners.' },
  { q: 'How many central government employees and pensioners benefit from the 2026 DA hike?', a: 'The 2026 DA hike to 60% benefits approximately 50.46 lakh central government employees and 68.27 lakh pensioners, who are also entitled to arrears from the effective date of 1 January 2026.' },
  { q: 'How many pay levels are there in the 7th CPC Pay Matrix?', a: 'There are 18 pay levels in the 7th CPC Pay Matrix, numbered Level 1 through Level 18, plus a few intermediate sub-levels (such as 5A, 10A, 10B, 12A, 12B, 13A, 13B) for specific services like Defence and the Military Nursing Service.' },
  { q: 'What replaced the old pay band and grade pay system?', a: 'The Pay Matrix replaced the earlier system of pay bands (PB-1 to PB-4) and grade pay. Each combination of pay band and grade pay under the old system now maps to a specific Pay Level in the new matrix, with a defined starting basic pay for that level.' },
  { q: 'What is the annual increment rate under the 7th CPC?', a: 'The annual increment rate was retained at 3% of basic pay, applied at the time of the annual increment date, moving an employee one cell to the right within their current Pay Level.' },
  { q: 'How is Level 1 different from Level 18 in the pay matrix?', a: 'Level 1 is the entry level for the lowest category of central government posts, starting at Rs 18,000 per month. Level 18 is reserved for the Cabinet Secretary and equivalent top posts, starting at Rs 2,50,000 per month, the ceiling of the entire Pay Matrix.' },
  { q: 'What is Military Service Pay (MSP)?', a: 'Military Service Pay is an additional fixed monthly amount paid only to Defence personnel on top of their Pay Matrix basic pay, recognising the distinct nature of military service. Rates vary by category: Rs 15,500 for Service Officers, Rs 10,800 for Nursing Officers, Rs 5,200 for JCOs/ORs, and Rs 3,600 for Non-Combatants (Enrolled) in the Air Force.' },
  { q: 'What is Siachen Allowance under the 7th CPC?', a: 'Siachen Allowance is a Risk and Hardship allowance for personnel posted at the Siachen Glacier. The revised rate is Rs 31,500 per month for Service Officers and Rs 21,000 per month for JCOs/ORs, among the highest hardship allowances in the pay structure.' },
  { q: 'How many allowances were abolished under the 7th CPC?', a: '52 allowances were abolished entirely under the 7th Pay Commission recommendations, as part of a broader rationalisation. Allowances related to risk and hardship were retained but reorganised into a dedicated Risk and Hardship Matrix instead.' },
  { q: 'What is the maximum gratuity limit in 2026?', a: 'The maximum gratuity ceiling is Rs 25,00,000 as of 2026. Under 7th CPC rules, the ceiling was set to rise by 25% (from Rs 20 lakh to Rs 25 lakh) once Dearness Allowance crossed 50%. Since DA is now at 60%, the enhanced Rs 25 lakh ceiling applies.' },
  { q: 'What is the House Building Advance ceiling under the 7th CPC?', a: 'The ceiling for House Building Advance was increased to Rs 25,00,000 under the 7th Pay Commission, up from the earlier limit, to help employees fund home construction or purchase at the revised pay scales.' },
  { q: 'What insurance coverage do central government employees get?', a: 'Insurance coverage is linked to Pay Level: employees at Level 10 and above get Rs 50,00,000 assured sum with a Rs 5,000 monthly deduction, Levels 6 to 9 get Rs 25,00,000 assured sum with a Rs 2,500 deduction, and Levels 1 to 5 get Rs 15,00,000 assured sum with a Rs 1,500 deduction.' },
  { q: 'How do I find my pay level from my old pay band and grade pay?', a: 'Match your pre-revision Pay Band and Grade Pay against the 7th CPC Pay Band and Grade Pay to Pay Level mapping table. For example, PB-2 with Grade Pay Rs 4,200 maps to Level 6, with a starting basic pay of Rs 35,400.' },
  { q: 'When was the 7th Pay Commission implemented?', a: 'The 7th Pay Commission for central government employees was implemented starting 1 January 2016, with the Pay Matrix replacing the earlier pay band and grade pay system from that date.' },
  { q: 'Who decides the pay structure of central government employees?', a: 'The Government of India appoints a Pay Commission roughly once every ten years to review and recommend the salary structure, allowances and pension benefits of central government employees. The 7th Pay Commission is the one currently in force.' },
  { q: 'Is Dearness Allowance revised every year?', a: 'Dearness Allowance is typically revised twice a year, in January and July, to adjust for inflation. The 2026 revision to 60% was approved in April 2026 but applied retroactively from 1 January 2026, which is standard practice for DA revisions.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your 7th CPC Pay Level and Revised Basic Pay',
  description: 'Step-by-step method to identify your Pay Level under the 7th CPC Pay Matrix from your pre-revised pay band and grade pay',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Find your pre-revised pay band and grade pay', text: 'Check your old pay slip for your Pay Band (PB-1 to PB-4) and Grade Pay amount.' },
    { '@type': 'HowToStep', position: 2, name: 'Match to a Pay Level', text: 'Use the Pay Band and Grade Pay to Pay Level mapping table to find your corresponding 7th CPC Pay Level.' },
    { '@type': 'HowToStep', position: 3, name: 'Read the starting basic pay', text: 'Note the starting basic pay shown for that Pay Level in the Pay Matrix, which is your revised basic pay at the first cell.' },
    { '@type': 'HowToStep', position: 4, name: 'Account for increments', text: 'If you have completed one or more years of service at that level, move right along the same row by one cell per completed year to find your current basic pay.' },
    { '@type': 'HowToStep', position: 5, name: 'Add Dearness Allowance', text: 'Apply the current DA rate (60% as of January 2026) to your basic pay to estimate your gross pay before other allowances.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/7th-pay-commission-pay-matrix',
  name: '7th Pay Commission Pay Matrix Table and Fitment Factor',
  url: 'https://fermor.in/blogs/7th-pay-commission-pay-matrix',
  inLanguage: 'en-IN',
  datePublished: '2026-10-09T17:02:33+05:30',
  dateModified: '2026-10-09T17:02:33+05:30',
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
      name: '7th Pay Commission',
      alternateName: '7th CPC',
      description: 'The commission that revised the pay, allowances and pension structure of Indian central government employees from 1 January 2016, introducing a Pay Matrix in place of pay bands and grade pay.',
      sameAs: 'https://en.wikipedia.org/wiki/Pay_Commission',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Government Pay and Allowance Terms',
        url: 'https://fermor.in/blogs',
      },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Fitment Factor',
      description: 'The multiplier applied to pre-revised pay to compute the revised basic pay in the 7th CPC Pay Matrix, fixed at 2.57.',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Government Pay and Allowance Terms',
        url: 'https://fermor.in/blogs',
      },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Central government employees and pensioners in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'What is the 7th CPC Pay Matrix' },
    { '@type': 'WebPageElement', cssSelector: '#da-hike-2026', name: '2026 DA Hike' },
    { '@type': 'WebPageElement', cssSelector: '#pay-matrix-table', name: 'Pay Matrix Table' },
    { '@type': 'WebPageElement', cssSelector: '#fitment-factor', name: 'Fitment Factor' },
    { '@type': 'WebPageElement', cssSelector: '#entry-level-pay', name: 'Entry-Level Pay' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-read', name: 'How to Read Your Pay Level' },
    { '@type': 'WebPageElement', cssSelector: '#benefits', name: 'Benefits of the Pay Matrix' },
    { '@type': 'WebPageElement', cssSelector: '#defence-allowances', name: 'Defence Personnel Allowances' },
    { '@type': 'WebPageElement', cssSelector: '#allowances-advances', name: 'Allowances, Advances and Medical Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#insurance', name: 'Insurance Coverage' },
    { '@type': 'WebPageElement', cssSelector: '#pension-gratuity', name: 'Pension and Gratuity' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'Financial Planning on a Revised Pay' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
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
    '7th Pay Commission',
    'Central Government Pay Scales',
    'Dearness Allowance India',
    'Government Pension and Gratuity',
    'Salary Taxation India',
    'Income Tax India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

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

const hStyle = {
  fontFamily: POPPINS,
  fontSize: 20,
  fontWeight: 600,
  color: C.dg,
  marginTop: 40,
  marginBottom: 14,
  letterSpacing: '-.015em',
} as React.CSSProperties;

const pStyle = {
  fontSize: 15.5,
  color: C.ink,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: INTER,
} as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: '7th Pay Commission Pay Matrix' },
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
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>On this page</span>
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

function KeyFacts() {
  const rows = [
    { label: 'Implemented From', value: '1 Jan 2016' },
    { label: 'Minimum Pay', value: 'Rs 18,000' },
    { label: 'Maximum Pay (Level 18)', value: 'Rs 2,50,000' },
    { label: 'Fitment Factor', value: '2.57' },
    { label: 'Annual Increment', value: '3%' },
    { label: 'Pay Levels', value: '1 to 18' },
    { label: 'Current DA Rate', value: '60% (from Jan 2026)' },
    { label: 'Max Gratuity', value: 'Rs 25,00,000' },
  ];
  return (
    <TableWrap label="7th CPC at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'Current DA Rate' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function PayLevelTable() {
  const rows = [
    { pb: 'PB-1', gp: '1,800', service: 'Civil', level: 'Level 1', pay: '18,000' },
    { pb: 'PB-1', gp: '1,900', service: 'Civil', level: 'Level 2', pay: '19,900' },
    { pb: 'PB-1', gp: '2,000', service: 'Civil, Defence', level: 'Level 3', pay: '21,700' },
    { pb: 'PB-1', gp: '2,400', service: 'Civil', level: 'Level 4', pay: '25,500' },
    { pb: 'PB-1', gp: '2,800', service: 'Civil, Defence', level: 'Level 5', pay: '29,200' },
    { pb: 'PB-2', gp: '4,200', service: 'Civil, Defence', level: 'Level 6', pay: '35,400' },
    { pb: 'PB-2', gp: '4,600', service: 'Civil, Defence', level: 'Level 7', pay: '44,900' },
    { pb: 'PB-2', gp: '4,800', service: 'Civil, Defence', level: 'Level 8', pay: '47,600' },
    { pb: 'PB-2', gp: '5,400', service: 'Civil', level: 'Level 9', pay: '53,100' },
    { pb: 'PB-3', gp: '5,400', service: 'Civil, Defence, MNS', level: 'Level 10', pay: '56,100' },
    { pb: 'PB-3', gp: '6,600', service: 'Civil', level: 'Level 11', pay: '67,700' },
    { pb: 'PB-3', gp: '7,600', service: 'Civil', level: 'Level 12', pay: '78,800' },
    { pb: 'PB-4', gp: '8,700', service: 'Civil', level: 'Level 13', pay: '1,23,100' },
    { pb: 'PB-4', gp: '10,000', service: 'Civil, Defence', level: 'Level 14', pay: '1,44,200' },
    { pb: 'HAG', gp: 'NA', service: 'Civil, Defence', level: 'Level 15', pay: '1,82,200' },
    { pb: 'HAG+', gp: 'NA', service: 'Civil, Defence', level: 'Level 16', pay: '2,05,400' },
    { pb: 'Apex Scale', gp: 'NA', service: 'Civil, Defence', level: 'Level 17', pay: '2,25,000' },
    { pb: 'Cabinet Sec', gp: 'NA', service: 'Cabinet Secretary, Defence Chiefs', level: 'Level 18', pay: '2,50,000' },
  ];
  return (
    <TableWrap label="7th CPC Pay Band and Grade Pay to Pay Level Mapping">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 620 }}>
          <div style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 90px', fontSize: 10.5, fontWeight: 700, color: C.ink, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Pay Band</span>
            <span style={{ flex: '0 0 70px', fontSize: 10.5, fontWeight: 700, color: C.ink, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Grade Pay</span>
            <span style={{ flex: 1, fontSize: 10.5, fontWeight: 700, color: C.ink, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Service</span>
            <span style={{ flex: '0 0 80px', fontSize: 10.5, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Level</span>
            <span style={{ flex: '0 0 90px', fontSize: 10.5, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase' as const }}>Start Pay</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.level} style={{ display: 'flex', gap: 10, padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 90px', fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{r.pb}</span>
              <span style={{ flex: '0 0 70px', fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{r.gp}</span>
              <span style={{ flex: 1, fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{r.service}</span>
              <span style={{ flex: '0 0 80px', fontSize: 12.5, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.level}</span>
              <span style={{ flex: '0 0 90px', fontSize: 12.5, fontWeight: 700, color: C.dark, fontFamily: INTER }}>Rs {r.pay}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function DefenceAllowanceTable() {
  const rows = [
    { allowance: 'Military Service Pay (Service Officers)', rate: 'Rs 15,500/month' },
    { allowance: 'Military Service Pay (Nursing Officers)', rate: 'Rs 10,800/month' },
    { allowance: 'Military Service Pay (JCOs/ORs)', rate: 'Rs 5,200/month' },
    { allowance: 'Military Service Pay (Non-Combatants, Air Force)', rate: 'Rs 3,600/month' },
    { allowance: 'Siachen Allowance (Level 9 and above)', rate: 'Rs 31,500/month' },
    { allowance: 'Siachen Allowance (Level 8 and below)', rate: 'Rs 21,000/month' },
    { allowance: 'Special Forces Allowance (Level 9+)', rate: 'Rs 25,000/month' },
    { allowance: 'Sea Going Allowance (Level 9+)', rate: 'Rs 10,500/month' },
    { allowance: 'Aeronautical Allowance', rate: 'Rs 450/month' },
  ];
  return (
    <TableWrap label="Defence Personnel Allowances (Selected)">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 480 }}>
          {rows.map((r, i) => (
            <div key={r.allowance} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
              <span style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.5 }}>{r.allowance}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER, flexShrink: 0 }}>{r.rate}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function InsuranceTable() {
  const rows = [
    { level: 'Level 10 and above', deduction: 'Rs 5,000/month', sum: 'Rs 50,00,000' },
    { level: 'Level 6 to 9', deduction: 'Rs 2,500/month', sum: 'Rs 25,00,000' },
    { level: 'Level 1 to 5', deduction: 'Rs 1,500/month', sum: 'Rs 15,00,000' },
  ];
  return (
    <TableWrap label="Insurance Coverage by Pay Level">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 460 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Pay Level</span>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Monthly Deduction</span>
            <span style={{ flex: '0 0 140px', fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Assured Sum</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.level} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontFamily: INTER }}>{r.level}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.deduction}</span>
              <span style={{ flex: '0 0 140px', fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.sum}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Income Tax Calculator', desc: 'Check tax liability on your revised basic pay plus DA', href: '/calculators/income-tax-calculator' },
    { label: 'In-Hand Salary Calculator', desc: 'Estimate take-home pay after deductions', href: '/calculators/in-hand-salary-calculator' },
    { label: 'Salary Hike Calculator', desc: 'Model the effect of a DA or pay level revision', href: '/calculators/salary-hike-calculator' },
    { label: 'HRA Calculator', desc: 'Check HRA exemption at your revised basic pay', href: '/calculators/hra-calculator' },
    { label: 'Salary Breakdown Calculator', desc: 'Break your gross pay into basic, DA, HRA and allowances', href: '/calculators/salary-breakdown-calculator' },
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

function RelatedArticles() {
  const articles = [
    { href: '/blogs/form-16', label: 'Form 16: Download, Meaning, Password and TDS Guide' },
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New and Old Regime Rates' },
    { href: '/blogs/epfo-8-25-percent-interest-rate-fy26', label: 'EPFO 8.25% Interest Rate: Credit Starts Now' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function KeyDates() {
  const dates = [
    { label: '7th CPC implemented', date: '1 Jan 2016' },
    { label: 'DA hike to 60% approved', date: '18 Apr 2026' },
    { label: 'DA hike effective from', date: '1 Jan 2026', urgent: true },
    { label: 'Next DA revision due', date: 'Jul 2026' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Key Dates</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}


function PromoBar({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{title}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> All pay, allowance and DA figures are based on official 7th Pay Commission recommendations and subsequent government notifications. Rates can be revised by future government orders. Verify current figures at{' '}
        <a href="https://doe.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'underline' }}>doe.gov.in</a>{' '}
        (Department of Expenditure) before relying on them for financial decisions. This article is for informational purposes only.
      </p>
    </div>
  );
}

export default function PayCommissionPage() {
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

      {/* Article header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: C.dg,
              fontFamily: INTER,
              background: C.paleDg,
              padding: '3px 10px',
              borderRadius: 4,
            }}>Government & Utility Services</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            7th Pay Commission Pay Matrix Table and Fitment Factor
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            18 pay levels from Rs 18,000 to Rs 2,50,000, a 2.57 fitment factor, and the 2026 Dearness Allowance hike to 60% that benefits over 50 lakh central government employees and 68 lakh pensioners.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-10-09T17:02:33+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Oct 9, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>16 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties}
          className="article-grid"
        >

          {/* Article body */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              The 7th Pay Commission was constituted by the Government of India to review the pay structure, allowances and pension benefits of central government employees. It replaced the earlier system of pay bands and grade pay with a Pay Matrix, setting a minimum pay of Rs 18,000 and a fitment factor of 2.57 for pay fixation.
            </p>
            <p style={pStyle}>
              The Pay Matrix has been in force since 1 January 2016 and remains the active pay structure for central government employees as of 2026. The most recent change affecting it is the April 2026 Dearness Allowance hike, which took the DA rate to 60% of basic pay.
            </p>

            <TableOfContents />

            <h2 id="what-is" style={hStyle}>What is the 7th Pay Commission Pay Matrix?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                The 7th Pay Commission Pay Matrix is a table with 18 horizontal pay levels and vertical pay progression cells within each level, replacing the earlier pay band and grade pay system, with annual increments of 3% moving an employee one cell to the right each year.
              </p>
            </div>
            <p style={pStyle}>
              The levels are numbered from 1 to 18, with a few intermediate sub-levels for specific services such as Defence and the Military Nursing Service.
            </p>
            <p style={pStyle}>
              The minimum pay in the matrix starts at Rs 18,000, while the structure extends up to Level 18 at Rs 2,50,000. It replaces the old system where the same grade pay could map inconsistently across different pay bands.
            </p>

            <h2 id="da-hike-2026" style={hStyle}>DA Hike 2026: Salary Impact for Central Government Employees</h2>
            <p style={pStyle}>
              On 18 April 2026, the Union Cabinet approved a 2% increase in Dearness Allowance (DA) for central government employees and Dearness Relief (DR) for pensioners, taking the total rate to 60%, effective from 1 January 2026.
            </p>
            <p style={pStyle}>
              The revision applies retroactively, so eligible employees and pensioners receive arrears covering the gap between January 2026 and the month the hike was actually processed in their pay.
            </p>
            <p style={pStyle}>
              The increase benefits approximately 50.46 lakh central government employees and 68.27 lakh pensioners, since DR mirrors DA in both rate and revision timing.
            </p>
            <Callout>
              The government typically revises DA twice a year, in January and July, based on the average Consumer Price Index movement for industrial workers over the preceding months. The January 2026 revision to 60% was formally approved in April 2026 but backdated to 1 January 2026, which is the standard pattern for DA announcements.
            </Callout>

            <h2 id="pay-matrix-table" style={hStyle}>7th CPC Pay Band and Grade Pay to Pay Level Mapping</h2>
            <p style={pStyle}>
              The table below shows how each pre-revision pay band and grade pay combination maps to a specific 7th CPC Pay Level, along with that level's starting basic pay.
            </p>
            <PayLevelTable />
            <p style={pStyle}>
              The 7th CPC Pay Matrix incorporates grade pay into the corresponding Pay Level and rationalises the overall pay structure.
            </p>
            <p style={pStyle}>
              A government employee can identify their Pay Level, basic pay, and progression using this single table, instead of cross-referencing separate pay band and grade pay charts the way the pre-2016 system required.
            </p>

            <PromoBar
              title="Income Tax Calculator"
              desc="Check your tax liability on revised basic pay plus the 60% DA, under both old and new regimes."
              href="/calculators/income-tax-calculator"
            />

            <h2 id="fitment-factor" style={hStyle}>Fitment Factor in the 7th Pay Commission</h2>
            <p style={pStyle}>
              The fitment factor used for fixation of pay in the revised Pay Matrix is 2.57.
            </p>
            <p style={pStyle}>
              Under the 7th CPC recommendations, the existing pay in the pre-revised structure was multiplied by 2.57, and the resulting amount was fitted into the matching Pay Matrix cell.
            </p>
            <p style={pStyle}>
              For example, an employee on a pre-revised basic pay of Rs 7,000 under the old system would have their pay multiplied by 2.57 to arrive at approximately Rs 17,990, which was then rounded and fitted into the nearest matching cell, Rs 18,000, the Level 1 starting pay.
            </p>

            <h2 id="entry-level-pay" style={hStyle}>Entry-Level Pay and Features of the 7th Pay Commission</h2>
            <p style={pStyle}>
              The minimum pay under the revised structure is Rs 18,000 per month, effective from 1 January 2016, applying to a newly recruited employee at the lowest Pay Level.
            </p>
            <BulletList items={[
              'Minimum pay is Rs 18,000 per month',
              'Maximum pay at the Apex Scale (Level 17) is Rs 2,25,000 per month',
              'Pay of the Cabinet Secretary and equivalent posts (Level 18) is Rs 2,50,000 per month',
              'The Pay Matrix replaced the earlier system of pay bands and grade pay entirely',
              'A 2.57 fitment factor was used uniformly for fixation of pay across all levels',
              'The annual increment rate was retained at 3% of basic pay',
            ]} />

            <h2 id="how-to-read" style={hStyle}>How to Find Your Pay Level and Current Basic Pay</h2>
            <p style={pStyle}>
              If you know your pre-2016 pay band and grade pay, finding your current Pay Level and basic pay is a two-step lookup rather than a recalculation.
            </p>
            <BulletList items={[
              'Match your old Pay Band (PB-1 to PB-4) and Grade Pay against the mapping table above to find your Pay Level.',
              'Read the starting basic pay shown for that level; this is your Level\'s Cell 1 value.',
              'Count the number of annual increments you have received since placement in that level, and move that many cells to the right (each cell reflects roughly a 3% increase) to find your current basic pay.',
              'Add the current DA rate (60% from January 2026) on top of that basic pay to estimate your gross pay before HRA and other allowances.',
            ]} />
            <p style={pStyle}>
              Use the{' '}
              <Link href="/calculators/salary-breakdown-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Salary Breakdown Calculator</Link>
              {' '}to split your gross pay into basic, DA, HRA and other components once you have your current basic pay figure, and the{' '}
              <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>In-Hand Salary Calculator</Link>
              {' '}to estimate your actual take-home after statutory deductions.
            </p>

            <h2 id="benefits" style={hStyle}>Benefits of the 7th Pay Commission Pay Matrix</h2>
            <p style={pStyle}>
              The Pay Matrix structure solves several practical problems that the pay band and grade pay system created, particularly around promotions and pay anomalies.
            </p>
            <BulletList items={[
              'Minimises pay differences and anomalies that existed across different pay bands under the earlier system',
              'Simplifies pay fixation by providing clearly defined levels and cells for pay progression',
              'Avoids complications around promotion, annual progression and span of service that the grade pay system created',
              'Resolved several long-standing PB-3 and PB-4 pay band disputes by assigning each combination a single defined level',
              'Provides a clearer, more error-resistant view of the government pay system for both employees and payroll administrators',
              'Streamlined payroll administration across ministries by removing the need to track pay band and grade pay separately',
            ]} />

            <h2 id="defence-allowances" style={hStyle}>Allowances for Defence Personnel</h2>
            <p style={pStyle}>
              Defence personnel receive several allowances on top of their Pay Matrix basic pay, based on rank, area of posting, branch and designation. These are governed separately from the civil pay structure because of the distinct nature of military service.
            </p>
            <DefenceAllowanceTable />
            <p style={pStyle}>
              Risk and Hardship allowances (Siachen, Field Area, High Altitude, and Counter-Insurgency Operations Allowance) are rationalised through a 9-cell Risk and Hardship Matrix.
            </p>
            <p style={pStyle}>
              An additional RH-Max category is reserved specifically for Siachen postings, the highest-hardship category in the matrix.
            </p>

            <h2 id="allowances-advances" style={hStyle}>Allowances, Advances and Medical Benefits</h2>
            <p style={pStyle}>
              Alongside the Pay Matrix, the 7th CPC also revised the broader set of allowances, advances and medical benefits available to central government employees and pensioners.
            </p>
            <BulletList items={[
              '52 allowances were abolished outright as part of a broader rationalisation exercise.',
              'Non-interest-bearing advances were withdrawn, though Personal Computer Advance and House Building Advance were retained.',
              'The House Building Advance ceiling was increased to Rs 25,00,000.',
              'A Health Insurance Scheme now covers central government employees, and empanelled CGHS hospitals extend medical facilities to pensioners residing outside CGHS areas.',
              'Postal pensioners are also covered under the revised medical facility provisions.',
            ]} />

            <h2 id="insurance" style={hStyle}>Insurance Coverage by Pay Level</h2>
            <p style={pStyle}>
              Group insurance coverage under the 7th CPC is tiered by Pay Level, with higher levels contributing a larger monthly deduction in exchange for a proportionally larger assured sum.
            </p>
            <InsuranceTable />


            <h2 id="pension-gratuity" style={hStyle}>Pension and Gratuity Provisions</h2>
            <p style={pStyle}>
              The 7th CPC also revised pension computation and the gratuity ceiling, both directly tied to the DA rate and the revised Pay Matrix.
            </p>
            <BulletList items={[
              'Revised pension for civil and Defence personnel (including CAPF) was recommended to bring about parity across services.',
              'A slab-based system was introduced for the disability element, applied when computing disability pension.',
              'The compensation amount paid to kin in the event of death on duty is revised periodically alongside pay revisions.',
              'The maximum gratuity ceiling has been enhanced to Rs 25,00,000, up from Rs 20,00,000, now that DA has crossed the 50% threshold that triggers the enhanced ceiling.',
              'If DA rises by a further 50 percentage points from its last reset point, the gratuity ceiling is designed to increase by another 25% under the same rule.',
            ]} />

            <h2 id="financial-planning" style={hStyle}>Financial Planning on a Revised Pay Scale</h2>
            <p style={pStyle}>
              A DA revision or a pay level change is a good trigger to revisit your tax regime choice and your monthly savings rate, since both are sensitive to a change in gross pay.
            </p>
            <p style={pStyle}>
              Run your updated basic pay and DA through the{' '}
              <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Calculator</Link>
              {' '}to check whether the new or old regime now produces lower tax at your revised income.
            </p>
            <p style={pStyle}>
              If you are expecting a promotion or a DA revision applying to earlier arrears, the resulting lump-sum payment can be taxed more heavily if it all lands in one financial year.
            </p>
            <p style={pStyle}>
              The{' '}
              <Link href="/blogs/form-16" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Form 16</Link>
              {' '}guide covers how Section 89 relief works for this, including claiming it via Form 10E if your payroll has not already applied it.
            </p>
            <p style={pStyle}>
              Use the{' '}
              <Link href="/calculators/salary-hike-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Salary Hike Calculator</Link>
              {' '}to model how a DA or Pay Level revision changes your annual take-home before the arrears land.
            </p>

            

            {/* FAQ section */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{
                    padding: '15px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.4,
                  }}>
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

          {/* Sidebar */}
          <aside
            className="paycomm-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
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

      <SiteFooter />

      <style>{`
        .paycomm-sidebar::-webkit-scrollbar { width: 5px; }
        .paycomm-sidebar::-webkit-scrollbar-track { background: transparent; }
        .paycomm-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .paycomm-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
        .toc-link:hover { background: #f4f5f6; color: #101214 !important; }
      `}</style>
    </>
  );
}

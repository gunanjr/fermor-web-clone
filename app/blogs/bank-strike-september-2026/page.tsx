import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { BankStrikeLanguageSwitcher } from '../../../components/BankStrikeLanguageSwitcher';

export const metadata: Metadata = {
  title: 'Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works',
  description: 'UFBU nationwide bank strike from September 28 to 30, 2026, coinciding with the September 26-27 weekend for up to 5 days of disrupted branch banking. SBI, PNB, Bank of Baroda, Canara, Union Bank and other PSU banks affected; HDFC, ICICI, Axis and Kotak stay normal. What still works (ATMs, UPI, net banking), why banks are open on Sunday September 27, advance salary payment on September 25, and the full union demands.',
  alternates: {
    canonical: 'https://fermor.in/blogs/bank-strike-september-2026',
    languages: {
      'en-IN': 'https://fermor.in/blogs/bank-strike-september-2026',
      'hi-IN': 'https://fermor.in/blogs/bank-strike-september-2026-hi',
      'x-default': 'https://fermor.in/blogs/bank-strike-september-2026',
    },
  },
  openGraph: {
    title: 'Bank Strike September 28-30, 2026: What Works, What Doesn\'t',
    description: 'Nationwide 3-day bank strike from Sept 28-30, 2026, plus the Sept 26-27 weekend: up to 5 days of disrupted branch banking. ATMs, UPI and net banking stay live. Full guide to dates, demands, and what to do before September 28.',
    type: 'article',
    publishedTime: '2026-09-25T12:37:07+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Bank Strike', 'UFBU', 'RBI', 'SBI', 'Union Bank', 'Banking India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bank Strike September 28-30, 2026: Full Guide',
    description: 'Nationwide 3-day bank strike, Sept 28-30, 2026. Which banks, what works, what to do before Sept 28. Full details inside.',
  },
  keywords: [
    'bank strike september 2026', 'bank strike september 28 30', 'nationwide bank strike 2026',
    'banks closed september 2026', 'ufbu strike 2026', 'bank strike news today',
    'sbi bank strike', 'union bank strike', 'pnb bank strike', 'bank of india strike',
    'india', 'union bank', 'sbi', 'sbi online', 'punjab national bank', 'indian bank',
    'bank of india', 'bank of baroda', 'canara bank', 'axisbank', 'banks near me',
    'net banking', 'sbi net banking', 'hdfc netbanking', 'icici net banking',
    'sbi online banking', 'union bank internet banking', 'reserve bank of india',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works',
  description: 'Complete guide to the UFBU nationwide bank strike from September 28 to 30, 2026: which banks and days are affected, why banks are open on Sunday September 27, what still works (ATMs, UPI, net banking), the government\'s advance-salary and security measures, and the full union demands behind the strike.',
  datePublished: '2026-09-25T12:37:07+05:30',
  dateModified: '2026-09-25T12:37:07+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/bank-strike-september-2026' },
  articleSection: 'Markets & Current Affairs',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  workTranslation: [
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/bank-strike-september-2026-hi', inLanguage: 'hi-IN', name: 'बैंक हड़ताल सितंबर 2026' },
  ],
  about: [
    { '@type': 'Thing', name: 'UFBU Bank Strike September 2026', description: 'Three-day nationwide strike by bank employees and officers called by the United Forum of Bank Unions from September 28 to 30, 2026' },
    { '@type': 'Organization', name: 'United Forum of Bank Unions', description: 'A forum of nine unions representing around 90% of India\'s bank employees and officers' },
  ],
  keywords: 'bank strike september 2026, ufbu strike, nationwide bank strike, banks closed september 28 30, sbi bank strike, union bank strike, five day banking week',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Bank Strike September 2026', item: 'https://fermor.in/blogs/bank-strike-september-2026' },
  ],
};

const faqItems = [
  { q: 'When is the bank strike in September 2026?', a: 'The nationwide bank strike runs for three days: Monday September 28, Tuesday September 29, and Wednesday September 30, 2026. Combined with the preceding Saturday holiday (September 26) and Sunday (September 27), branch banking could have been disrupted for 5 consecutive days, though the government has kept banks open on September 27 to shorten that window.' },
  { q: 'Why are banks on strike in September 2026?', a: 'The United Forum of Bank Unions (UFBU) called the strike primarily over the five-day banking week, a demand agreed in principle during the March 2024 wage settlement but still not implemented. Other demands include withdrawal or revision of the performance-linked incentive (PLI) scheme, restoration of the Old Pension Scheme in place of the National Pension System, a common dearness allowance formula for retirees, and resolution of pending recruitment and staffing issues.' },
  { q: 'Is this the first bank strike in September 2026?', a: 'No. UFBU unions already held a one-day strike on September 11, 2026. When that did not resolve their demands, the three-day strike from September 28 to 30 was confirmed. Unions have also given notice of an indefinite strike starting October 26, 2026, if the demands remain unmet.' },
  { q: 'Will banks be open on Sunday, September 27, 2026?', a: 'Yes. The Reserve Bank of India has approved full operation of all bank branches, ATM-linked branches, offices, and currency chests on Sunday, September 27, 2026. This is specifically to give customers an extra window to complete essential banking before the three-day strike begins on September 28.' },
  { q: 'Which banks are affected by the September 2026 strike?', a: 'All 12 public sector banks are affected: State Bank of India, Punjab National Bank, Bank of Baroda, Canara Bank, Union Bank of India, Bank of India, Indian Bank, Central Bank of India, Indian Overseas Bank, UCO Bank, Bank of Maharashtra, and Punjab & Sind Bank. Regional Rural Banks are also affected. Employees of some older private banks, including Karnataka Bank, are participating too. Major new-generation private banks (HDFC Bank, ICICI Bank, Axis Bank, Kotak Mahindra Bank) are expected to function normally since their staff are not part of UFBU.' },
  { q: 'Will ATMs work during the bank strike?', a: 'Yes. ATMs are expected to remain fully operational throughout the strike period. Banks have been asked to ensure adequate cash availability at ATMs, though localized cash-out at individual machines cannot be ruled out if replenishment runs behind at a specific location.' },
  { q: 'Will UPI, mobile banking and net banking work during the strike?', a: 'Yes. UPI, mobile banking, internet banking, and phone banking are all digital channels that do not depend on branch staff being present, so they are expected to keep working normally through September 28-30. Business Correspondent (BC) points can also handle many routine transactions.' },
  { q: 'What banking services will NOT work during the strike?', a: 'Branch-dependent services are the ones affected: cash deposits and withdrawals over the counter, cheque clearance, passbook updates, fresh loan applications and in-branch loan disbursal, locker access, and demand draft issuance. Anything that specifically needs a bank employee at a branch counter is at risk.' },
  { q: 'When will central government employees get their September salary?', a: 'The Finance Ministry has advised that central government employees, including those in Defence, Posts and Telecommunications, will get their September 2026 salary, wages, and pension disbursed early, on September 25, instead of the usual end-of-month schedule. Any adjustment needed once the full month is calculated will be made in the October 2026 payment.' },
  { q: 'What should I do before September 28, 2026?', a: 'Complete any branch-dependent transaction, cash withdrawal, cheque deposit, locker visit, or loan paperwork by September 25 or on the extended Sunday, September 27 window. Set up UPI or net banking access in advance if you have not already, and keep some cash on hand in case a specific ATM runs short during the strike.' },
  { q: 'Why does September 30 matter more than an ordinary strike day?', a: 'September 30 is the half-yearly closing day for Indian banks, when branches normally stay open later than usual to complete closing entries for the first half of the financial year. A strike landing exactly on this date adds real friction for businesses and account holders who rely on that day\'s closing-book activity, on top of the ordinary disruption from lost branch access.' },
  { q: 'Could the strike still be called off?', a: 'It is possible. The government and bank managements have publicly appealed to the unions to defer the strike, and UFBU unions have deferred similarly announced strikes in the past after receiving assurances. As of publication, the strike has not been called off, so treat September 28-30 as scheduled and check for updates closer to the date.' },
  { q: 'Does the strike affect NEFT, RTGS, and IMPS transfers?', a: 'These are largely automated, system-driven transfers that do not require a branch employee to process them, so they are expected to continue functioning. Any delay would most likely come from a bank-specific technical issue rather than the strike itself, since these rails run independently of branch staffing.' },
  { q: 'Is the government providing extra security during the strike?', a: 'Yes. The Finance Ministry has asked the Ministry of Home Affairs to advise all states and union territories to arrange adequate security at critical banking infrastructure during the strike period, a standard precaution during large-scale industrial action affecting a sector that handles cash and valuables.' },
  { q: 'What is the five-day banking week demand about?', a: 'Bank employees currently work six days a month with a working schedule that already treats the second and fourth Saturdays as holidays, but keeps the first and third Saturdays as working days. Unions want all Saturdays to be holidays, matching a five-day week already common in many other sectors. This was agreed in principle in the March 2024 wage settlement but has not yet received the government approval needed to take effect.' },
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

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/bank-strike-september-2026',
  name: 'Bank Strike September 28-30, 2026: 5 Days Banks Closed, What Works',
  url: 'https://fermor.in/blogs/bank-strike-september-2026',
  inLanguage: 'en-IN',
  datePublished: '2026-09-25T12:37:07+05:30',
  dateModified: '2026-09-25T12:37:07+05:30',
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
      name: 'United Forum of Bank Unions',
      alternateName: 'UFBU',
      description: 'A joint forum of nine bank employee and officer unions in India, together representing close to 90% of the workforce across public sector and some private banks.',
      sameAs: 'https://en.wikipedia.org/wiki/United_Forum_of_Bank_Unions',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Banking Sector Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Five-Day Banking Week',
      description: 'A demand to make all Saturdays a holiday for bank branches, replacing the current schedule where the first and third Saturdays are working days.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Banking Sector Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Bank customers, businesses, and salaried and pensioned individuals in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'What Is Happening' },
    { '@type': 'WebPageElement', cssSelector: '#days-affected', name: 'Which Days Are Affected' },
    { '@type': 'WebPageElement', cssSelector: '#sunday-banking', name: 'Why Banks Are Open on Sunday' },
    { '@type': 'WebPageElement', cssSelector: '#demands', name: 'Why Unions Are Striking' },
    { '@type': 'WebPageElement', cssSelector: '#banks-affected', name: 'Which Banks Are Affected' },
    { '@type': 'WebPageElement', cssSelector: '#what-works', name: 'What Still Works' },
    { '@type': 'WebPageElement', cssSelector: '#not-working', name: 'What Will Not Work' },
    { '@type': 'WebPageElement', cssSelector: '#govt-measures', name: 'Government Preparation' },
    { '@type': 'WebPageElement', cssSelector: '#what-to-do', name: 'What To Do Before September 28' },
    { '@type': 'WebPageElement', cssSelector: '#half-yearly-closing', name: 'Half-Yearly Closing' },
    { '@type': 'WebPageElement', cssSelector: '#could-be-called-off', name: 'Could the Strike Be Called Off' },
    { '@type': 'WebPageElement', cssSelector: '#business-impact', name: 'Impact on Businesses' },
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
  knowsAbout: [
    'Indian Banking Sector', 'Reserve Bank of India Regulations', 'Public Sector Banks India',
    'UPI and Digital Payments India', 'Personal Finance India', 'Income Tax India', 'SEBI Regulations', 'AMFI Guidelines',
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
  amber:  '#A15C00',
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
    { label: 'Bank Strike September 2026' },
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

function StrikeHighlights() {
  const rows = [
    { label: 'Strike dates', value: 'Sept 28-30, 2026 (3 days)' },
    { label: 'Called by', value: 'United Forum of Bank Unions (UFBU)' },
    { label: 'Preceded by', value: 'One-day strike, Sept 11, 2026' },
    { label: 'Threat if unresolved', value: 'Indefinite strike from Oct 26, 2026' },
    { label: 'Sept 26 (Sat)', value: 'Already a bank holiday' },
    { label: 'Sept 27 (Sun)', value: 'Banks kept open specially' },
    { label: 'ATMs, UPI, net banking', value: 'Working normally' },
    { label: 'Advance salary date', value: 'Sept 25, 2026 (central govt)' },
  ];
  return (
    <TableWrap label="Bank Strike at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'Strike dates' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function DaysTable() {
  const rows = [
    { day: 'Sat, Sep 26', status: 'Bank holiday', detail: 'Fourth Saturday of the month; already a scheduled non-working day for bank branches' },
    { day: 'Sun, Sep 27', status: 'Open specially', detail: 'RBI has approved full operation of all branches, ATM-linked branches, offices and currency chests' },
    { day: 'Mon, Sep 28', status: 'Strike day 1', detail: 'Branch banking disrupted at PSU banks and some old private banks' },
    { day: 'Tue, Sep 29', status: 'Strike day 2', detail: 'Branch banking disrupted' },
    { day: 'Wed, Sep 30', status: 'Strike day 3', detail: 'Branch banking disrupted; also the half-yearly closing day for Indian banks' },
  ];
  return (
    <TableWrap label="Day-by-Day Status">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 100px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Day</span>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Status</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Detail</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.day} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 100px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.day}</span>
              <span style={{ flex: '0 0 120px', fontSize: 13, color: r.status === 'Open specially' ? C.green : C.ink, fontFamily: INTER, fontWeight: r.status === 'Open specially' ? 600 : 400 }}>{r.status}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.55 }}>{r.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function WorksTable() {
  const works = [
    'ATMs (cash withdrawal, balance check)',
    'UPI (Google Pay, PhonePe, Paytm, BHIM)',
    'Mobile banking and net banking apps',
    'NEFT, RTGS and IMPS transfers',
    'Phone banking and IVR services',
    'Business Correspondent (BC) points',
  ];
  const doesNot = [
    'Cash deposit or withdrawal over the counter',
    'Cheque deposit and clearance',
    'Passbook updates and printing',
    'Fresh loan applications and in-branch disbursal',
    'Locker access',
    'Demand draft issuance',
  ];
  return (
    <TableWrap label="What Works vs What Does Not">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560, display: 'flex' }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.border}` }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Still works</span>
            </div>
            {works.map((w, i) => (
              <div key={w} style={{ padding: '11px 16px', borderBottom: i < works.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.5 }}>{w}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.amber, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Will not work</span>
            </div>
            {doesNot.map((w, i) => (
              <div key={w} style={{ padding: '11px 16px', borderBottom: i < doesNot.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.5 }}>{w}</div>
            ))}
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function BanksTable() {
  const affected = ['State Bank of India (SBI)', 'Punjab National Bank (PNB)', 'Bank of Baroda', 'Canara Bank', 'Union Bank of India', 'Bank of India', 'Indian Bank', 'Central Bank of India', 'Indian Overseas Bank', 'UCO Bank', 'Bank of Maharashtra', 'Punjab & Sind Bank'];
  const normal = ['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'IndusInd Bank', 'Yes Bank'];
  return (
    <TableWrap label="Which Banks Are Affected">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560, display: 'flex' }}>
          <div style={{ flex: 1, borderRight: `1px solid ${C.border}` }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>All 12 PSU banks affected</span>
            </div>
            {affected.map((b, i) => (
              <div key={b} style={{ padding: '10px 16px', borderBottom: i < affected.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{b}</div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: C.green, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Major private banks: normal</span>
            </div>
            {normal.map((b, i) => (
              <div key={b} style={{ padding: '10px 16px', borderBottom: i < normal.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13, color: C.ink2, fontFamily: INTER }}>{b}</div>
            ))}
            <div style={{ padding: '10px 16px', fontSize: 12, color: C.ink3, fontFamily: INTER, lineHeight: 1.5 }}>
              Regional Rural Banks and some older private banks (including Karnataka Bank) are also affected, since some of their staff associations are part of UFBU.
            </div>
          </div>
        </div>
      </div>
    </TableWrap>
  );
}

function DemandsList() {
  const items = [
    { t: 'Five-day banking week', d: 'All Saturdays as holidays, replacing today\'s schedule of six working Saturdays a year. Agreed in principle in the March 2024 wage settlement, still awaiting government approval.' },
    { t: 'Performance-Linked Incentive (PLI) changes', d: 'Unions want the PLI scheme withdrawn or revised, alleging its current structure was implemented unilaterally and discriminates against some categories of staff.' },
    { t: 'Pension reform', d: 'A common dearness allowance formula for retirees across banks, and restoration of the Old Pension Scheme in place of the National Pension System for employees who joined after it was introduced.' },
    { t: 'Recruitment and staffing', d: 'Faster recruitment against genuine vacancies and relief from the workload pressure unions say has built up from rising business volumes without matching headcount.' },
    { t: 'Pending wage and service matters', d: 'Settlement of several smaller service-condition and wage-related issues left unresolved from earlier rounds of negotiation.' },
  ];
  return (
    <TableWrap label="What UFBU Is Demanding">
      {items.map((it, i) => (
        <div key={it.t} style={{ padding: '13px 16px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{it.t}</div>
          <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.6 }}>{it.d}</div>
        </div>
      ))}
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Personal Loan Calculator', desc: 'Compare EMI options if you need quick cash while branches are shut', href: '/calculators/personal-loan-calculator' },
    { label: 'Gold Loan Calculator', desc: 'A fast, branch-light way to raise cash against gold if you need it urgently', href: '/calculators/gold-loan-calculator' },
    { label: 'FD Calculator', desc: 'Check maturity value if an FD is due to renew during the strike window', href: '/calculators/fd-calculator' },
    { label: 'Savings Account Interest Calculator', desc: 'See what your idle balance is actually earning', href: '/calculators/savings-account-interest-calculator' },
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
    { href: '/blogs/upi-charges-above-2000', label: 'UPI Charges Above Rs 2,000: New MDR Rule Explained' },
    { href: '/blogs/rbi-financial-product-mis-selling-rules', label: 'RBI Rules on Financial Product Mis-Selling' },
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
    { label: 'One-day warning strike', date: 'Sep 11, 2026' },
    { label: 'Advance salary credit', date: 'Sep 25, 2026' },
    { label: 'Bank holiday (Sat)', date: 'Sep 26, 2026' },
    { label: 'Banks open specially (Sun)', date: 'Sep 27, 2026' },
    { label: 'Strike begins', date: 'Sep 28, 2026', urgent: true },
    { label: 'Half-yearly closing + strike ends', date: 'Sep 30, 2026' },
    { label: 'Indefinite strike threat', date: 'Oct 26, 2026' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Key Dates</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS, textAlign: 'right' as const, flexShrink: 0 }}>{item.date}</span>
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

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> This article is based on official government communication (Ministry of Finance, PIB) and bank advisories current as of publication. Strike dates, participation, and the extent of disruption can change on short notice; confirm with your own bank\'s app, website, or branch notice before making time-sensitive plans. This article is for informational purposes only and is not financial advice.
      </p>
    </div>
  );
}

export default function BankStrikeSeptember2026Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Markets & Current Affairs</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            Bank Strike September 28-30, 2026: Which Days, Which Banks, and What Still Works
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            The United Forum of Bank Unions has called a three-day nationwide strike from September 28 to 30, 2026, landing right after the September 26-27 weekend. Here is exactly which banks are affected, what still works, and what to do before September 28.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-09-25T12:37:07+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Sep 25, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Bank employees across India go on a three-day nationwide strike from Monday, September 28 to Wednesday, September 30, 2026, called by the United Forum of Bank Unions (UFBU). Combined with the weekend just before it, branch banking could have gone dark for five straight days, but the government has stepped in to keep banks open on Sunday, September 27, so customers get one more real window to finish essential transactions.
            </p>
            <p style={pStyle}>
              This is UFBU's second strike action this month, after a one-day strike on September 11 failed to resolve the unions' core demands. If the strike does not move the government, unions have already given notice of an indefinite strike from October 26, 2026.
            </p>

            <BankStrikeLanguageSwitcher
              current="en"
              heading="This guide is also available in Hindi"
              subtext="Read it in the language you're most comfortable with. Both cover the same dates, demands, and what to do."
            />

            <h2 id="what-is" style={hStyle}>What is happening on September 28-30, 2026?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                UFBU, which represents nine unions and close to 90% of India's bank employees and officers, has called a three-day nationwide strike for September 28, 29, and 30, 2026, over the long-pending five-day banking week and a set of pension, staffing, and incentive-scheme demands.
              </p>
            </div>
            <p style={pStyle}>
              UFBU is a joint platform, not a single union, which is exactly why it can shut down branch banking across almost every public sector bank at once when its member unions act together. This particular strike follows a documented pattern: a smaller warning strike (one day, on September 11) first, then a longer three-day action when the warning does not produce a resolution, with an even bigger escalation (an indefinite, open-ended strike) held in reserve for October 26 if this one does not work either.
            </p>
            <StrikeHighlights />

            <h2 id="days-affected" style={hStyle}>Which days are affected, and why up to five in a row</h2>
            <p style={pStyle}>
              The strike itself is only three days, September 28 to 30. The reason it threatened to become a five-day banking gap is pure calendar timing: September 26 is the fourth Saturday of the month, already a scheduled bank holiday under the existing rota, and September 27 is a Sunday, normally a holiday too. Stacked back to back with the strike, that is Saturday, Sunday, Monday, Tuesday, Wednesday, five consecutive days with no branch access at all, unless someone intervened.
            </p>
            <p style={pStyle}>
              Someone did. See the next section for exactly what the government did about it.
            </p>
            <DaysTable />

            <h2 id="sunday-banking" style={hStyle}>Why banks are open on Sunday, September 27</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                The Reserve Bank of India has approved full operation of all bank branches, ATM-linked branches, offices, and currency chests on Sunday, September 27, 2026, specifically to shorten the effective banking gap ahead of the strike.
              </p>
            </div>
            <p style={pStyle}>
              This is a genuinely unusual step. RBI does not casually turn a Sunday into a working day for the entire banking system; it takes that step when the alternative, a real five-day stretch with zero branch access nationwide, right before a half-yearly closing, is judged to be worse. Public sector banks and Regional Rural Banks have been directed to function normally on the 27th so customers get one more real opportunity to complete essential transactions before the strike actually starts on the 28th.
            </p>

            <h2 id="demands" style={hStyle}>Why bank unions are striking: the full list of demands</h2>
            <p style={pStyle}>
              The headline demand is the five-day banking week: making every Saturday a holiday, not just the second and fourth. Unions say this was already agreed in principle as part of the March 2024 wage settlement and is simply awaiting the government approval needed to actually take effect, a delay of well over a year on something both sides supposedly settled already. Beyond that one issue, the demands widen into a broader set of long-running workplace grievances.
            </p>
            <DemandsList />
            <p style={pStyle}>
              Union leaders frame this as a legitimate demand stalled by delay, not a fresh ask; workplace pressure from rising transaction volumes, tighter compliance requirements, and performance targets has grown while staffing has not kept pace, and the pension-related demands in particular reflect a wider, sector-spanning debate in India about the Old Pension Scheme versus the National Pension System.
            </p>

            <h2 id="banks-affected" style={hStyle}>Which banks are affected</h2>
            <p style={pStyle}>
              All 12 public sector banks are affected, since UFBU's core membership sits inside the PSU banking workforce. Regional Rural Banks are affected too. A number of older private sector banks, including Karnataka Bank, have staff associations inside UFBU as well, so expect some disruption there. The major new-generation private banks, HDFC Bank, ICICI Bank, Axis Bank, and Kotak Mahindra Bank, are not part of UFBU and are expected to keep functioning as usual through all three strike days.
            </p>
            <BanksTable />

            <h2 id="what-works" style={hStyle}>What still works during the strike</h2>
            <p style={pStyle}>
              Every digital channel is expected to keep working normally, because none of them need a bank employee sitting at a branch counter. ATMs, UPI apps, mobile banking, net banking, phone banking, and automated transfer rails like NEFT, RTGS, and IMPS all run on infrastructure that is separate from day-to-day branch staffing.
            </p>
            <WorksTable />
            <Callout>
              If your bank account already has UPI or net banking set up, the strike changes very little about your day-to-day money movement. The real disruption lands on anything that specifically needs a person at a branch counter.
            </Callout>

            <h2 id="not-working" style={hStyle}>What will not work</h2>
            <p style={pStyle}>
              Anything genuinely branch-dependent is at risk for the three strike days: cash deposits and withdrawals over the counter, cheque deposit and clearance, passbook printing and updates, fresh loan applications and any in-branch loan disbursal, locker access, and demand draft issuance. If a service specifically requires a bank employee's sign-off at a counter, plan for it to be unavailable September 28 through 30.
            </p>

            <h2 id="govt-measures" style={hStyle}>What the government is doing to limit the disruption</h2>
            <p style={pStyle}>
              Two concrete steps stand out. First, the Finance Ministry has advised that central government employees, including staff in Defence, Posts, and Telecommunications, get their September 2026 salary, wages, and pension paid early, on September 25, instead of the usual end-of-month date. Any adjustment once the full month's figures are known gets made in the October 2026 payment.
            </p>
            <p style={pStyle}>
              Second, on the security side, the Finance Ministry has asked the Ministry of Home Affairs to advise all states and union territories to arrange adequate security at critical banking infrastructure during the strike window, a standard precaution whenever a large-scale industrial action affects a sector that physically holds cash and valuables.
            </p>
            <BulletList items={[
              'Central government salaries, wages and pensions paid early, on September 25',
              'RBI approval for full bank operations on Sunday, September 27',
              'MHA security advisory to states and union territories for banking infrastructure',
              'Public appeals from the government and bank managements for unions to defer the strike',
            ]} />

            <h2 id="what-to-do" style={hStyle}>What to do before September 28</h2>
            <p style={pStyle}>
              Treat September 25 and the special Sunday opening on September 27 as your real deadline for anything that needs a branch. If you are short on time and need cash quickly once the strike starts, a <Link href="/calculators/personal-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>personal loan</Link> or a <Link href="/calculators/gold-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 500 }}>gold loan</Link> are two of the faster, less branch-dependent routes to raise money, since several lenders process both largely online once your KYC is on file.
            </p>
            <BulletList items={[
              'Withdraw or deposit cash you genuinely need before the branch closes on Sept 25 or during the Sept 27 special opening',
              'Deposit any pending cheques early, since cheque clearance is one of the services most likely to stall',
              'Set up UPI and net banking now if you have not already, so day-to-day payments do not depend on branch access at all',
              'Check whether any loan EMI, FD renewal or maturity, or recurring payment falls in the Sept 28-30 window and plan around it',
              'Keep a small cash buffer on hand in case a specific ATM near you runs low during the strike',
            ]} />

            <h2 id="half-yearly-closing" style={hStyle}>Why September 30 matters more than an ordinary strike day</h2>
            <p style={pStyle}>
              September 30 is the half-yearly closing day for Indian banks: the date branches normally stay open later than usual to finalize the books for the first half of the financial year. A strike landing exactly on that date is not just one more lost working day; it removes the day banks specifically use to complete closing entries, reconcile accounts, and process the volume of transactions that businesses and account holders typically push through right before a half-year cutoff.
            </p>

            <h2 id="could-be-called-off" style={hStyle}>Could the strike still be called off?</h2>
            <p style={pStyle}>
              It is genuinely possible. The government and bank managements have publicly appealed to the unions to defer the action, and UFBU-affiliated unions have deferred similarly announced strikes before, after receiving assurances from the government or bank managements on specific issues. As of this article's publication, the strike has not been called off and remains scheduled for September 28-30. Given how fluid these situations can be right up to the date, it is worth checking your own bank's app, website, or branch notice board for the latest status closer to the 28th rather than relying on any single article, including this one, as the final word.
            </p>

            <h2 id="business-impact" style={hStyle}>Impact on businesses</h2>
            <p style={pStyle}>
              Trade bodies have flagged real concerns about business continuity and financial predictability wherever a multi-day banking disruption lands close to a half-yearly closing period. Businesses that rely on same-day cheque clearance, cash-heavy daily operations, or branch-processed loan disbursal are the ones most exposed; a firm moving significant daily cash volume through physical branches can see a real, multi-day delay in funds actually landing where they need to be. Businesses that already run most of their banking digitally, through net banking, UPI, and automated transfers, are far better insulated, since none of those channels depend on branch staffing at all.
            </p>

            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px',
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

          <aside
            className="bankstrike-sidebar"
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
            <div style={{ flexShrink: 0 }}><StrikeHighlights /></div>
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

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .bankstrike-sidebar::-webkit-scrollbar { width: 5px; }
        .bankstrike-sidebar::-webkit-scrollbar-track { background: transparent; }
        .bankstrike-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .bankstrike-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
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

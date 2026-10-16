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

export const metadata: Metadata = {
  title: 'PF Balance Check: 5 Ways to Check EPF Balance Online',
  description: 'Check PF balance by missed call to 9966044425, SMS to 7738299899, the EPFO Member Passbook Portal, UMANG app, or DigiLocker. Prerequisites, balance check without a registered number, exempted establishments, passbook download, and why your balance might not show. Verified against official EPFO circulars.',
  alternates: { canonical: 'https://fermor.in/blogs/pf-balance-check' },
  openGraph: {
    title: 'PF Balance Check: 5 Ways to Check EPF Balance Online - Fermor',
    description: 'Missed call, SMS, EPFO portal, UMANG app, and DigiLocker, every official way to check your PF balance, verified against EPFO circulars.',
    type: 'article',
    publishedTime: '2026-07-28T01:14:28+05:30',
    modifiedTime: '2026-07-28T01:14:28+05:30',
    authors: ['Fermor Analysis'],
    tags: ['EPF', 'PF Balance', 'EPFO', 'UAN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PF Balance Check - Fermor',
    description: 'Missed call 9966044425, SMS 7738299899, or the EPFO portal. Every way to check your PF balance.',
  },
  keywords: [
    'pf balance check', 'pf balance', 'check pf balance', 'epf balance check', 'pf balance check number',
    'pf check', 'check provident fund', 'provident fund balance check', 'uan passbook', 'epfo passbook',
    'know pf balance', 'check pf balance by pf number', 'know your uan', 'epf view balance',
    'employees provident fund balance check', 'passbook uan', 'check uan number', 'pf amount check',
    'epfo claim status', 'pf withdrawal', 'balance enquiry epf', 'check epf online', 'epf pf balance',
    'pf balance check online', 'how to check pf balance', 'epfo blc check',
  ],
};

const faqItems = [
  { q: 'How do I check my PF balance?', a: 'Give a missed call to 9966044425, send an SMS reading EPFOHO UAN to 7738299899, or log in to the EPFO Member Passbook Portal or UMANG app with your UAN and view your passbook. All four require your UAN to be activated first.' },
  { q: 'How do I check PF balance by missed call?', a: 'Give a missed call to 9966044425 from your UAN-registered mobile number. The call disconnects automatically after two rings, at no cost, and EPFO texts back your last contribution and total balance within a few minutes.' },
  { q: 'How do I check PF balance by SMS?', a: 'Send an SMS reading EPFOHO UAN to 7738299899 from your registered mobile number. For a reply in a language other than English, add the three-letter code after your UAN, for example EPFOHO UAN TAM for Tamil.' },
  { q: 'Can I check my PF balance using just my PF number, without a UAN?', a: 'No. Every online and SMS or missed-call balance check now runs through your UAN, not the older regional PF number. If you only know your PF number, use "Know Your UAN" on the EPFO Member Portal to retrieve your UAN using that PF number, your Aadhaar, or your PAN, then use your UAN for the actual balance check.' },
  { q: 'Can I check PF balance without a registered mobile number?', a: 'The missed call and SMS methods need a registered number, but you can still check your balance without one by logging into the EPFO Member Passbook Portal directly with your UAN and password. Update your mobile number on the portal afterward to unlock the missed call and SMS methods too.' },
  { q: 'What is the EPFO Member Passbook Portal?', a: 'It is the official EPFO portal at passbook.epfindia.gov.in where a UAN holder logs in with their UAN, password, and an OTP to view a detailed passbook: employee share, employer share, and the EPS pension contribution, broken down by month.' },
  { q: 'Why does my EPF passbook say "Passbook not available for this Member ID"?', a: 'This almost always means you work for an Exempted Establishment, where a company-run trust manages your PF instead of EPFO directly. Check your salary slip: an exempted PF number usually starts with your company\'s own code rather than a regional EPFO code, and often carries a "Company PF Trust" label.' },
  { q: 'How do I check my PF balance if I work for an Exempted Establishment?', a: 'You cannot check it on the EPFO portal, UMANG, missed call, or SMS, since your contributions sit with your employer\'s own trust, not EPFO. Check your salary slip, your company\'s internal HR or payroll portal, or ask your HR department directly.' },
  { q: 'Why is my PF balance not updating?', a: 'EPF balance typically reflects a contribution within 24 hours of it being credited. If it still has not appeared after two days, contact your HR department to confirm the contribution was actually remitted, or raise a complaint through the EPFO grievance portal.' },
  { q: 'What if my Aadhaar name does not match my PF account name?', a: 'A name mismatch fails KYC verification and can block online balance checks and withdrawals. File a Joint Declaration Form with your employer to correct the mismatch between your Aadhaar and EPFO records.' },
  { q: 'How do I download my EPF passbook?', a: 'On the EPFO Member Passbook Portal, log in, select your Member ID, and click "Download as PDF." On UMANG, open EPFO under Employee Centric Services, select View Passbook, and download from there. On DigiLocker, open Issued Documents and select the EPF Passbook.' },
  { q: 'How do I check my EPF balance on the UMANG app?', a: 'Open UMANG, go to Services, then Social Security, then EPFO, and select View Passbook under Employee Centric Services. Enter your UAN, verify with the OTP sent to your registered number, then choose the employer account you want to view.' },
  { q: 'Can I check my PF balance using DigiLocker?', a: 'Yes. Log in to DigiLocker with your mobile number or Aadhaar, search Issued Documents for EPFO, select Employee Provident Fund Passbook, and verify with your UAN and an OTP. Your EPF passbook then pulls in automatically.' },
  { q: 'What do I need before I can check my PF balance?', a: 'Your UAN must be activated, and at least one of Aadhaar, PAN, or your bank account must be seeded (linked) against it. Without both, the missed call, SMS, and app-based methods will not work, even if your PF number itself is correct.' },
  { q: 'How do I check my EPFO claim status?', a: 'Log in to the Member Passbook Portal, open Online Services, and select Track Claim Status to see whether a withdrawal, transfer, or advance claim is pending, approved, or rejected. The full claim-status walkthrough, including what to do if a claim is rejected, is in the EPFO login guide.' },
  { q: 'Can I transfer my PF balance when I change jobs?', a: 'Yes. Log in to the EPFO Member Portal with your UAN and submit an online transfer request, which requires an activated UAN, a registered mobile number, completed e-KYC, and both your old and new employer registered with EPFO.' },
  { q: 'How often is EPF balance updated?', a: 'Individual contributions typically reflect in your passbook within 24 hours of being credited by your employer. Annual interest is credited and shown separately once EPFO notifies the year\'s rate, usually a few months after the financial year ends.' },
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
  headline: 'PF Balance Check: 5 Ways to Check EPF Balance Online and Offline',
  url: 'https://fermor.in/blogs/pf-balance-check',
  datePublished: '2026-07-28T01:14:28+05:30',
  dateModified: '2026-07-28T01:14:28+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pf-balance-check' },
  articleSection: 'EPF',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'PF Balance Check', description: 'The official EPFO methods for a member to check their Employees Provident Fund account balance' },
  ],
  keywords: 'pf balance check, epf balance check, uan passbook, epfo passbook, check pf balance',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'PF Balance Check', item: 'https://fermor.in/blogs/pf-balance-check' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check PF Balance by Missed Call',
  description: 'Step-by-step process to check your EPF balance using the EPFO missed call facility.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm your UAN is activated', text: 'Your UAN must already be activated on the EPFO Unified Portal, with your mobile number registered against it.' },
    { '@type': 'HowToStep', position: 2, name: 'Confirm KYC is seeded', text: 'At least one of Aadhaar, PAN, or your bank account number must be linked to your UAN.' },
    { '@type': 'HowToStep', position: 3, name: 'Give a missed call to 9966044425', text: 'Call from your registered mobile number. The call disconnects automatically after two rings, at no cost.' },
    { '@type': 'HowToStep', position: 4, name: 'Receive the SMS', text: 'EPFO sends back an SMS with your last contribution and total PF balance within a few minutes.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pf-balance-check',
  name: 'PF Balance Check: 5 Ways to Check EPF Balance Online - Fermor',
  url: 'https://fermor.in/blogs/pf-balance-check',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T01:14:28+05:30',
  dateModified: '2026-07-28T01:14:28+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'PF Balance Check',
    description: 'The set of official EPFO channels, missed call, SMS, the Member Passbook Portal, the UMANG app, and DigiLocker, through which a UAN holder can view their Employees Provident Fund balance.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and UAN Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried Indian employees with an EPF account',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#quick-reference', name: 'PF Balance Check Methods' },
    { '@type': 'WebPageElement', cssSelector: '#prerequisites', name: 'UAN Activation and KYC' },
    { '@type': 'WebPageElement', cssSelector: '#epfo-portal', name: 'EPFO Member Passbook Portal' },
    { '@type': 'WebPageElement', cssSelector: '#umang-app', name: 'UMANG App' },
    { '@type': 'WebPageElement', cssSelector: '#missed-call', name: 'Missed Call' },
    { '@type': 'WebPageElement', cssSelector: '#sms', name: 'SMS' },
    { '@type': 'WebPageElement', cssSelector: '#digilocker', name: 'DigiLocker' },
    { '@type': 'WebPageElement', cssSelector: '#without-mobile', name: 'Without Registered Mobile Number' },
    { '@type': 'WebPageElement', cssSelector: '#by-pf-number', name: 'Checking by PF Number' },
    { '@type': 'WebPageElement', cssSelector: '#exempted', name: 'Exempted Establishments' },
    { '@type': 'WebPageElement', cssSelector: '#download-passbook', name: 'Download EPF Passbook' },
    { '@type': 'WebPageElement', cssSelector: '#troubleshooting', name: 'Why Balance Check Fails' },
    { '@type': 'WebPageElement', cssSelector: '#claim-status', name: 'EPF Claim Status' },
    { '@type': 'WebPageElement', cssSelector: '#transfer', name: 'EPF Balance Transfer' },
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
  knowsAbout: ['EPF India', 'EPFO', 'UAN', 'Retirement Planning India', 'Personal Finance India'],
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

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
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
  { id: 'quick-reference', label: 'All 5 Methods at a Glance' },
  { id: 'prerequisites', label: 'UAN Activation and KYC' },
  { id: 'epfo-portal', label: 'EPFO Member Passbook Portal' },
  { id: 'umang-app', label: 'UMANG App' },
  { id: 'missed-call', label: 'Missed Call: 9966044425' },
  { id: 'sms', label: 'SMS: 7738299899' },
  { id: 'digilocker', label: 'DigiLocker' },
  { id: 'without-mobile', label: 'Without Registered Mobile' },
  { id: 'by-pf-number', label: 'Checking by PF Number' },
  { id: 'exempted', label: 'Exempted Establishments' },
  { id: 'download-passbook', label: 'Download EPF Passbook' },
  { id: 'troubleshooting', label: 'Why Balance Check Fails' },
  { id: 'claim-status', label: 'EPF Claim Status' },
  { id: 'transfer', label: 'EPF Balance Transfer' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Phone numbers, portal URLs, and procedures are set by EPFO and are subject to change. Always verify current details on the official EPFO website (<a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>epfindia.gov.in</a>) before relying on any number listed here. Fermor is not affiliated with EPFO.
      </p>
    </div>
  );
}

export default function PFBalanceCheckPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>PF Balance Check</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              EPF
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-07-28T01:14:28+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 28, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            PF Balance Check: 5 Ways to Check EPF Balance Online and Offline
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              You can check your PF balance five official ways: a missed call to 9966044425, an SMS to 7738299899, the EPFO Member Passbook Portal, the UMANG app, or DigiLocker. All five need your UAN activated first.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: exact steps for each method, what to do without a registered mobile number, why exempted establishments cannot use the EPFO portal at all, and what to do when the balance check fails.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="quick-reference" style={hStyle}>PF Balance Check: All 5 Methods at a Glance</h2>
            <p style={pStyle}>
              Every method needs an activated UAN. Only the portal and DigiLocker need internet; missed call and SMS work on any basic phone.
            </p>
            <DataTable
              caption="PF Balance Check Methods"
              headers={['Method', 'UAN Required', 'Internet Required', 'Time']}
              rows={[
                ['Missed call (9966044425)', 'Yes', 'No', 'Instant'],
                ['SMS (7738299899)', 'Yes', 'No', 'Instant'],
                ['EPFO Member Passbook Portal', 'Yes', 'Yes', '2 min'],
                ['UMANG app', 'Yes', 'Yes', '2 min'],
                ['DigiLocker', 'Yes', 'Yes', '3 min'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="prerequisites" style={hStyle}>Before You Check: UAN Activation and KYC</h2>
            <p style={pStyle}>
              Two things have to be in place before any balance check works: your UAN must be activated, and at least one of Aadhaar, PAN, or your bank account must be seeded against it. Without both, the missed call and SMS methods return nothing at all.
            </p>
            <p style={pStyle}>
              Activate an inactive UAN through UMANG&apos;s Face Authentication flow, or on the EPFO Unified Member Portal directly using your UAN, Aadhaar number, and an OTP sent to your Aadhaar-linked mobile. The full activation and KYC-linking walkthrough is in the <Link href="/blogs/epfo-login-uan-passbook" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPFO login guide</Link>.
            </p>

            {/* SECTION 3 */}
            <h2 id="epfo-portal" style={hStyle}>PF Balance Check via EPFO Member Passbook Portal</h2>
            <p style={pStyle}>
              The Member Passbook Portal gives the most detail: a month-by-month breakdown, not just a total. It is the only method that shows your employee share, employer share, and EPS pension contribution as separate columns.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Visit the portal">Go to <a href="https://passbook.epfindia.gov.in/MemberPassBook/login" target="_blank" rel="noopener noreferrer" style={linkStyle}>passbook.epfindia.gov.in</a>.</Step>
              <Step n={2} title="Sign in">Enter your UAN, password, and the captcha shown.</Step>
              <Step n={3} title="Verify by OTP">Enter the OTP sent to your Aadhaar-linked mobile number.</Step>
              <Step n={4} title="Select your Member ID">If you have worked at more than one employer, choose the account you want to view.</Step>
              <Step n={5} title="View the passbook">Click "View Passbook" to see employee share, employer share, and EPS contributions by month.</Step>
            </div>

            {/* SECTION 4 */}
            <h2 id="umang-app" style={hStyle}>PF Balance Check via UMANG App</h2>
            <p style={pStyle}>
              UMANG (Unified Mobile Application for New-age Governance) also lets you activate a UAN, track claims, and file withdrawals from the same app, not just check a balance.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Download UMANG">Get it from the Play Store or App Store, or open it at <a href="https://web.umang.gov.in/landing/department/epfo.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>web.umang.gov.in</a>.</Step>
              <Step n={2} title="Navigate to EPFO">Go to Services, then Social Security, then EPFO.</Step>
              <Step n={3} title="Select View Passbook">Choose it under Employee Centric Services.</Step>
              <Step n={4} title="Verify by OTP">Enter your UAN, then the OTP sent to your registered mobile number.</Step>
              <Step n={5} title="Choose the employer account">Pick the account you want to view. Your full passbook is downloadable from here too.</Step>
            </div>

            {/* SECTION 5 */}
            <h2 id="missed-call" style={hStyle}>PF Balance Check via Missed Call: 9966044425</h2>
            <p style={pStyle}>
              A missed call gets you a quick total, not the full month-by-month breakdown. Call <strong>9966044425</strong> from your registered mobile number; the call disconnects on its own after two rings, at no cost, and EPFO texts back your last contribution and total balance within a few minutes.
            </p>
            <Callout>
              This only works if your UAN is activated and at least one of Bank Account, Aadhaar, or PAN is already seeded against it, per EPFO&apos;s own missed call service circular.
            </Callout>

            {/* SECTION 6 */}
            <h2 id="sms" style={hStyle}>PF Balance Check via SMS: 7738299899</h2>
            <p style={pStyle}>
              Send an SMS reading <strong>EPFOHO UAN</strong> to <strong>7738299899</strong> from your registered mobile number. EPFO replies in English by default, or in one of nine other languages if you add a three-letter code after your UAN.
            </p>
            <DataTable
              caption="SMS Language Codes: EPFOHO UAN [CODE] to 7738299899"
              headers={['Language', 'Code']}
              rows={[
                ['English', 'Default, no code needed'],
                ['Hindi', 'HIN'],
                ['Punjabi', 'PUN'],
                ['Gujarati', 'GUJ'],
                ['Marathi', 'MAR'],
                ['Kannada', 'KAN'],
                ['Telugu', 'TEL'],
                ['Tamil', 'TAM'],
                ['Malayalam', 'MAL'],
                ['Bengali', 'BEN'],
              ]}
            />

            <CalcCTA
              href="/calculators/epf-calculator"
              label="EPF Calculator"
              note="Once you know your current balance, project what it grows to by retirement at your current contribution rate."
            />

            {/* SECTION 7 */}
            <h2 id="digilocker" style={hStyle}>PF Balance Check via DigiLocker</h2>
            <p style={pStyle}>
              DigiLocker pulls your EPF passbook in automatically once linked, the same way it does for a driving licence or PAN card.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Log in to DigiLocker">Use your mobile number or Aadhaar.</Step>
              <Step n={2} title="Search Issued Documents">Look for EPFO under available services.</Step>
              <Step n={3} title="Select the EPF Passbook">Choose "Employee Provident Fund Passbook" from the results.</Step>
              <Step n={4} title="Verify by UAN and OTP">Enter your UAN, then the OTP sent to your registered mobile number.</Step>
              <Step n={5} title="View and download">Your passbook, including balance and interest details, is fetched automatically and can be saved as a PDF.</Step>
            </div>

            {/* SECTION 8 */}
            <h2 id="without-mobile" style={hStyle}>PF Balance Check Without a Registered Mobile Number</h2>
            <p style={pStyle}>
              Missed call and SMS need a registered number, but the Member Passbook Portal does not: log in directly with your UAN and password to view, download, or print your passbook.
            </p>
            <p style={pStyle}>
              Update your mobile number on the portal afterward so missed call and SMS work too. Both changes typically need employer approval before they take effect.
            </p>

            {/* SECTION 9 */}
            <h2 id="by-pf-number" style={hStyle}>Can I Check PF Balance Using Just My PF Number?</h2>
            <p style={pStyle}>
              No, not directly. Every current balance check method runs through your UAN, not the older region-specific PF number printed on older payslips.
            </p>
            <p style={pStyle}>
              If you only have your PF number, use "Know Your UAN" on the EPFO Member Portal: enter that PF number along with your Aadhaar or PAN, verify by OTP, and EPFO sends your UAN to your registered mobile number. Use that UAN for the actual balance check afterward.
            </p>

            {/* SECTION 10 */}
            <h2 id="exempted" style={hStyle}>PF Balance Check for Exempted Establishments</h2>
            <p style={pStyle}>
              "Passbook not available for this Member ID" almost always means you work for an Exempted Establishment, where your employer runs its own approved PF trust instead of routing contributions through EPFO.
            </p>
            <p style={pStyle}>
              An exempted PF number usually starts with a company-specific code rather than a regional EPFO code, and salary slips often carry a "Company PF Trust" label. Check your salary slip, your company&apos;s HR portal, or ask HR directly, since EPFO has no balance data to show you.
            </p>

            {/* SECTION 11 */}
            <h2 id="download-passbook" style={hStyle}>How to Download Your EPF Passbook</h2>
            <p style={pStyle}>
              All three online methods let you save a PDF copy for your records, useful for loan applications or verifying your employer actually remitted a contribution.
            </p>
            <DataTable
              caption="Passbook Download by Method"
              headers={['Method', 'Steps']}
              rows={[
                ['EPFO Member Portal', 'Log in, select your Member ID, click "Download as PDF"'],
                ['UMANG App', 'EPFO > Employee Centric Services > View Passbook > select Member ID > download'],
                ['DigiLocker', 'Issued Documents > EPF Passbook > view balance and interest > Download'],
              ]}
            />

            {/* SECTION 12 */}
            <h2 id="troubleshooting" style={hStyle}>Why Can&apos;t I Check My PF Balance?</h2>
            <p style={pStyle}>
              Four issues cause almost every failed balance check.
            </p>
            <BulletList items={[
              'Mobile number not registered: missed call and SMS only work from the exact number linked to your UAN. Update it on the portal if it has changed.',
              'UAN not activated: a UAN printed on your payslip does nothing until you activate it online.',
              'Name mismatch: if your Aadhaar name does not match your PF account name, KYC fails and online services get blocked. File a Joint Declaration Form with your employer to fix this.',
              'Too soon after activation: wait at least 24 hours after activating or registering your UAN before the passbook becomes available.',
            ]} />

            {/* SECTION 13 */}
            <h2 id="claim-status" style={hStyle}>Checking Your EPF Claim Status</h2>
            <p style={pStyle}>
              Once you have withdrawn or transferred funds, tracking the claim is a separate step from checking your balance. Log in to the Member Portal, open Online Services, and select Track Claim Status to see whether the claim is pending, approved, or rejected.
            </p>
            <p style={pStyle}>
              The full claim-status walkthrough, including what a rejection remark means and how to fix it, is in the <Link href="/blogs/epfo-login-uan-passbook" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPFO login guide</Link>.
            </p>

            {/* SECTION 14 */}
            <h2 id="transfer" style={hStyle}>Transferring EPF Balance When You Change Jobs</h2>
            <p style={pStyle}>
              Log in to the EPFO Member Portal with your UAN to submit an online transfer request when you switch employers, rather than withdrawing and losing continuity of service for pension purposes.
            </p>
            <p style={pStyle}>
              You need an activated UAN, a registered mobile number, completed e-KYC, and both your previous and current employer registered with EPFO before the transfer request can go through.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: PF Balance Check</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="pf-balance-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['Missed call', '9966044425'],
                ['SMS', '7738299899'],
                ['SMS format', 'EPFOHO UAN'],
                ['Passbook portal', 'passbook.epfindia.gov.in'],
                ['Languages supported', '10'],
                ['Balance updates within', '24 hours'],
                ['UAN length', '12 digits'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTA */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>EPF Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Retirement Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/epfo-claim-status', 'EPFO Claim Status: Check Your PF Claim Status'],
                ['/blogs/epfo-login-uan-passbook', 'EPFO Login: UAN Portal and Activation'],
                ['/blogs/pf-withdrawal-claim-online', 'PF Withdrawal Online: Claim and Status'],
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
        .pf-balance-sidebar::-webkit-scrollbar { width: 5px; }
        .pf-balance-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pf-balance-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pf-balance-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

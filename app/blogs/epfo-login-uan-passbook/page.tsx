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

const PORTAL_URL   = 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/';
const PASSBOOK_URL = 'https://passbook.epfindia.gov.in/';
const UMANG_IOS     = 'https://apps.apple.com/in/app/umang/id1236448857';
const EPFO_HOME     = 'https://www.epfindia.gov.in/site_hi/index.php';

export const metadata: Metadata = {
  title: 'EPFO Login 2026: UAN Member Portal, e-Sewa & PF Passbook Download',
  description: 'EPFO login guide, updated for the July 2026 migration: log in to the UAN Member e-Sewa portal, activate a UAN via UMANG Face Authentication, download your PF passbook, check EPF balance by SMS or missed call, and fix common login errors. Official links only.',
  alternates: { canonical: 'https://fermor.in/blogs/epfo-login-uan-passbook' },
  openGraph: {
    title: 'EPFO Login 2026: UAN Member Portal and PF Passbook Download - Fermor',
    description: 'Step-by-step EPFO login, UAN activation, PF passbook download (website and UMANG), SMS/missed-call balance check, and error fixes.',
    type: 'article',
    url: 'https://fermor.in/blogs/epfo-login-uan-passbook',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPFO Login 2026: UAN Member Portal and PF Passbook Download - Fermor',
    description: 'Log in to the UAN portal, download your PF passbook, and fix common EPFO login errors. Official links only.',
  },
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'EPFO Login 2026: UAN Member Portal, e-Sewa Login and PF Passbook Download',
  url: 'https://fermor.in/blogs/epfo-login-uan-passbook',
  datePublished: '2026-07-05T01:04:00+05:30',
  dateModified: '2026-07-05T01:32:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete EPFO login guide: UAN Member e-Sewa portal login, UAN activation via UMANG Face Authentication, PF passbook download via website and UMANG app, SMS and missed-call balance check, claim status tracking, the June to July 2026 EPFO outage, and fixes for common login errors.',
  articleSection: 'EPF',
  keywords: 'epfo login, uan login, pf login, epfo member login, epfo member portal, uan passbook, epfo passbook, uan member portal, epfo uan login, epf login, pf member login, uan passbook login, epfo down, epfo portal not working, uan activation umang, uan face authentication, epfo migration 2026',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const faqItems = [
  { q: 'How do I log in to the EPFO member portal?', a: 'Go to the UAN Member e-Sewa portal at unifiedportal-mem.epfindia.gov.in/memberinterface. Enter your 12-digit UAN, your password, and the captcha shown on screen, then click Sign In. This single portal handles EPFO login, UAN login, and what many people search for separately as the member portal login.' },
  { q: 'Are EPFO login, UAN login, and Member e-Sewa login the same thing?', a: 'Yes. EPFO runs one Member e-Sewa portal for all member-facing services. "EPFO login," "UAN login," "PF login," and "EPFO member portal login" all point to the same sign-in page, just phrased differently depending on how a person searches for it.' },
  { q: 'How do I activate my UAN before logging in for the first time?', a: 'Since August 1, 2025, UAN activation only happens through the UMANG app, verified by Aadhaar Face Authentication rather than an OTP. Open UMANG, go to EPFO Services, select "UAN Activation" under "UAN Services Through Face Auth," complete the face scan through the Aadhaar Face RD app, then set a password. That password also works for logging in on the web portal, and passbook access opens up roughly six hours after activation.' },
  { q: 'What do I do if I forgot my UAN or my EPFO password?', a: 'Both are still recoverable on the Member e-Sewa web portal. For a forgotten UAN, use "Know Your UAN" with your registered mobile number and an uploaded identity or address proof document, verified by OTP; this proof-upload step was added in the July 2026 portal upgrade. For a forgotten password, use "Forgot Password" and verify with an OTP to your registered mobile.' },
  { q: 'How do I download my PF passbook from the EPFO website?', a: 'Log in to the Member e-Sewa portal with your UAN and password, then click "View Passbook" (opens in a new tab on the passbook service). Select your member ID if you have worked at more than one establishment, and the full contribution history loads on screen. Use the download or print option to save it as a PDF.' },
  { q: 'Why can’t I see my PF passbook right after activating my UAN?', a: 'EPFO enforces a waiting period of roughly six hours between UAN activation and passbook visibility, to let the activation sync across its systems. If your passbook is still blank after six hours, confirm your UAN shows as active on the Member e-Sewa portal before raising a grievance.' },
  { q: 'Can I access the EPF passbook without a UAN?', a: 'No. The UAN is the login credential for both the Member e-Sewa portal and the UMANG app, so passbook access is not possible without it. If you do not know your UAN, use the "Know Your UAN" option with your Aadhaar or PAN and registered mobile number to retrieve it.' },
  { q: 'How do I check my PF balance by SMS without logging in?', a: 'Send an SMS to 7738299899 from your UAN-registered mobile number in the format EPFOHO UAN ENG, where ENG is replaced with a three-letter code for your preferred language. EPFO supports ten languages including Hindi, Tamil, Telugu, Bengali, and Punjabi. You get a reply SMS with your last contribution and current balance at no cost.' },
  { q: 'How do I check my PF balance by missed call?', a: 'Give a missed call to 9966044425 from your UAN-registered mobile number. The call disconnects automatically after one or two rings, and EPFO sends back an SMS with your balance. This only works if your KYC (Aadhaar, PAN, and bank account) is already linked to your UAN.' },
  { q: 'How do I view my UAN passbook on the UMANG app?', a: 'Install UMANG from the App Store or Google Play, open Services, and select Social Security, then EPFO, then View Passbook. Enter your UAN, request an OTP, verify it, and pick the establishment you want to view if you have more than one. The passbook loads on screen with a download option.' },
  { q: 'Who cannot download the EPF passbook even with an active UAN?', a: 'Three categories are excluded: members of exempted establishments (these companies run their own approved provident fund trust outside EPFO’s system), settled members (whose full PF has already been withdrawn and the account closed), and inoperative members (accounts with no contribution or withdrawal activity for an extended period, typically after retirement age without a claim filed).' },
  { q: 'What information does the UAN passbook show?', a: 'The passbook lists your establishment ID and employer name, your member ID, the EPFO office handling your account, month-by-month employee and employer contributions, the portion of the employer’s share routed to your pension account, and the annual interest credited. The date and time of printing appear at the bottom of every statement.' },
  { q: 'How do I check my EPF claim status online?', a: 'Log in to the Member e-Sewa portal, then open the "Online Services" menu and select "Track Claim Status." The screen shows whether your withdrawal, transfer, or advance claim is pending, approved, or rejected, along with the claim reference number.' },
  { q: 'Why does my EPFO passbook show missing or delayed contributions for recent months?', a: 'A missing recent month almost certainly reflects the June to July 2026 EPFO system migration, not a missed employer deposit. Contributions typically catch up within a few days once the backlog clears. There is no need to file a grievance immediately; check back after a few days first.' },
  { q: 'Was the EPFO portal down in June and July 2026?', a: 'Yes. EPFO took the Member and Employer portals offline from around June 26, 2026 for a database consolidation and software upgrade. The relaunch was delayed three times, originally targeted for June 29, then July 1, then July 3, before services came back on July 3 to 4, 2026. Core login and passbook services are live again, but EPFO has flagged a two-week stabilization period with extra verification on claims.' },
  { q: 'What is the EPFO toll-free helpline number?', a: 'EPFO’s helpdesk number is 14470, toll-free from any Indian phone line. The helpdesk is typically staffed from 7:00 AM to 9:00 PM daily for login, passbook, and claim queries.' },
  { q: 'Is there an official EPFO login app, or only the website?', a: 'UMANG is the only official mobile app for EPFO services; EPFO has publicly stated there is no other authorised app. The only official website is epfindia.gov.in. Treat any other app or lookalike site asking for your UAN, password, Aadhaar, or OTP as fraudulent.' },
  { q: 'What should I do if the EPFO portal is slow or shows an error?', a: 'Try again outside peak hours (early morning or late evening), clear the browser cache, or switch to the UMANG app, which often stays responsive when the web portal is under heavy load. If the error persists for more than a day, call the 14470 helpdesk or use EPFiGMS, EPFO’s online grievance portal, rather than repeatedly resubmitting the same request.' },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'EPFO Login 2026', item: 'https://fermor.in/blogs/epfo-login-uan-passbook' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Log In to the EPFO Member Portal and Download Your PF Passbook',
  description: 'Step-by-step process to log in to the UAN Member e-Sewa portal and download the PF passbook.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the Member e-Sewa Portal', text: 'Go to unifiedportal-mem.epfindia.gov.in/memberinterface, the official EPFO Member e-Sewa portal.' },
    { '@type': 'HowToStep', position: 2, name: 'Activate Your UAN (First-Time Users Only)', text: 'On the UMANG app, open EPFO Services, select UAN Activation, complete Aadhaar Face Authentication, and set a password. This password also works for web login.' },
    { '@type': 'HowToStep', position: 3, name: 'Sign In', text: 'Enter your UAN, password, and the captcha, then click Sign In.' },
    { '@type': 'HowToStep', position: 4, name: 'Open View Passbook', text: 'Click the View Passbook link, which opens the passbook service in a new tab already signed in.' },
    { '@type': 'HowToStep', position: 5, name: 'Select Member ID', text: 'If you have worked at more than one establishment, select the relevant member ID to view that employer’s contribution history.' },
    { '@type': 'HowToStep', position: 6, name: 'Download as PDF', text: 'Use the download or print option to save the passbook as a PDF. No password is required to open the file.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/epfo-login-uan-passbook',
  name: 'EPFO Login 2026: UAN Member Portal, e-Sewa Login and PF Passbook Download - Fermor',
  url: 'https://fermor.in/blogs/epfo-login-uan-passbook',
  inLanguage: 'en-IN',
  datePublished: '2026-07-05T01:04:00+05:30',
  dateModified: '2026-07-05T01:32:00+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'UAN',
      alternateName: 'Universal Account Number',
      description: 'A 12-digit number issued by EPFO to every EPF member, used to log in to the Member e-Sewa portal and UMANG app, view the PF passbook, and track claims across all employers held over a career.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and Retirement Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'UMANG',
      alternateName: 'Unified Mobile App for New Governance',
      description: 'The Government of India\'s single mobile app for services across ministries, including EPFO. Since August 2025 it is the only way to activate a new UAN, verified through Aadhaar Face Authentication.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and Retirement Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, EPF members, and pensioners in India managing their provident fund account online',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important EPFO Login Links' },
    { '@type': 'WebPageElement', cssSelector: '#system-status', name: '2026 EPFO System Status' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-uan', name: 'What Is UAN and EPFO Login' },
    { '@type': 'WebPageElement', cssSelector: '#login-steps', name: 'How to Log In' },
    { '@type': 'WebPageElement', cssSelector: '#activate-uan', name: 'How to Activate UAN' },
    { '@type': 'WebPageElement', cssSelector: '#forgot-password', name: 'Forgot UAN or Password' },
    { '@type': 'WebPageElement', cssSelector: '#passbook-download', name: 'Download PF Passbook' },
    { '@type': 'WebPageElement', cssSelector: '#umang-passbook', name: 'UMANG App Passbook' },
    { '@type': 'WebPageElement', cssSelector: '#sms-missed-call', name: 'SMS and Missed Call Balance Check' },
    { '@type': 'WebPageElement', cssSelector: '#passbook-contents', name: 'What the Passbook Shows' },
    { '@type': 'WebPageElement', cssSelector: '#who-cannot', name: 'Who Cannot Access the Passbook' },
    { '@type': 'WebPageElement', cssSelector: '#claim-status', name: 'Check Claim Status' },
    { '@type': 'WebPageElement', cssSelector: '#login-errors', name: 'Common Login Errors and Fixes' },
    { '@type': 'WebPageElement', cssSelector: '#terminology', name: 'EPFO Login vs UAN Portal vs Member e-Sewa' },
    { '@type': 'WebPageElement', cssSelector: '#security', name: 'Security Warning' },
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
  knowsAbout: ['EPFO', 'Universal Account Number', 'Provident Fund India', 'EPF Passbook', 'Retirement Planning India', 'UMANG App', 'Aadhaar Face Authentication', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };

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
    <div style={{ background: C.paleDg, border: `1px solid #c9ced2`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{label}</p>
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and links directly to EPFO&apos;s official portal and app. Fermor is not affiliated with EPFO, does not process logins, and never asks for your UAN, password, Aadhaar, or OTP. Portal steps, contact numbers, and system status notes reflect EPFO&apos;s published information as of the date above and may change; always verify current details on epfindia.gov.in before relying on them.
      </p>
    </div>
  );
}

export default function EpfoLoginPage() {
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
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>&rsaquo;</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>EPFO Login 2026</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              EPF
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-07-05T01:32:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 5, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            EPFO Login 2026: UAN Member Portal, e-Sewa Login and PF Passbook Download
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              EPFO login, UAN login, and PF login all point to the same page: the UAN Member e-Sewa portal at unifiedportal-mem.epfindia.gov.in.
            </p>
            <p style={pStyle}>
              UAN activation moved off the website in August 2025. It now runs entirely through the UMANG app, verified by Aadhaar Face Authentication instead of an OTP.
            </p>
            <p style={pStyle}>
              The portal itself also went offline for a database migration from late June 2026, reopening on July 3 to 4.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Direct, official EPFO login and passbook links"
                headers={['Service', 'Link']}
                rows={[
                  ['EPFO Member Login (UAN e-Sewa)', <Link key="l1" href={PORTAL_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Login to EPFO Member Portal</Link>],
                  ['UAN Passbook Login', <Link key="l2" href={PASSBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>View UAN Passbook</Link>],
                  ['EPFO Official Website', <Link key="l3" href={EPFO_HOME} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>epfindia.gov.in</Link>],
                  ['UMANG App (iOS)', <Link key="l4" href={UMANG_IOS} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Download on the App Store</Link>],
                  ['UMANG App (Android)', 'Search "UMANG" on Google Play Store'],
                  ['EPFO Helpdesk (toll-free)', '14470, daily 7:00 AM to 9:00 PM'],
                ]}
              />
            </div>

            {/* SECTION: System status */}
            <h2 id="system-status" style={hStyle}>EPFO System Status: What Changed in 2026</h2>
            <p style={pStyle}>
              EPFO took the Member and Employer portals offline from around June 26, 2026 for a major database consolidation and software upgrade. The reopening slipped three times, first from June 29 to July 1, then to July 3, before core login and passbook services came back on July 3 to 4, 2026.
            </p>
            <p style={pStyle}>
              Both portals are live again as of July 5, 2026. EPFO has flagged a two-week stabilization window from the relaunch, roughly through mid-to-late July, during which claims and service requests go through extra verification checks and can take longer than usual.
            </p>
            <p style={pStyle}>
              Repeating login attempts or resubmitting claims during peak hours only adds load without speeding anything up, so check once and wait a few days before checking again. If your passbook is missing a recent month right now, this migration is the most likely cause, not a sign your employer skipped a deposit.
            </p>
            <InfoTable
              caption="Where each EPFO service lives after the July 2026 migration"
              headers={['Service', 'Where It Lives Now', 'Verification']}
              rows={[
                ['UAN activation (first-time)', 'UMANG app only', 'Aadhaar Face Authentication'],
                ['New UAN generation', 'UMANG app only', 'Aadhaar Face Authentication'],
                ['Forgot / retrieve UAN', 'Member e-Sewa web portal', 'ID or address proof upload plus OTP'],
                ['Login (activated UAN)', 'Member e-Sewa web portal or UMANG', 'UAN, password, captcha'],
                ['Passbook viewing', 'Web portal and UMANG', 'May be slow while the system stabilizes'],
                ['Claim status tracking', 'Member e-Sewa web portal', 'Older and newer tracking pages running in parallel'],
              ]}
            />

            {/* SECTION: What is UAN */}
            <h2 id="what-is-uan" style={hStyle}>What Is a UAN and What Does EPFO Login Mean?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                A UAN (Universal Account Number) is the 12-digit ID EPFO assigns to every EPF member. It stays the same for life and links every PF account held across every employer under one login.
              </p>
            </div>
            <p style={pStyle}>
              A Provident Fund (PF) account is a retirement savings account EPFO maintains for every salaried employee covered under the EPF scheme. Employee and employer each contribute a share of basic salary every month, and the balance earns annual interest set by EPFO.
            </p>
            <p style={pStyle}>
              &quot;EPFO login&quot; simply means signing in to the Member e-Sewa portal with this UAN. Many members also hold an NPS account alongside EPF; the <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPS Calculator</Link> projects that corpus separately so you can see both retirement accounts side by side.
            </p>

            {/* SECTION: Login steps */}
            <h2 id="login-steps" style={hStyle}>How to Log In to the EPFO Member Portal: Step by Step</h2>
            <p style={pStyle}>
              Once your UAN is activated, logging in takes under a minute.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Go to the Member e-Sewa portal', text: 'Open unifiedportal-mem.epfindia.gov.in/memberinterface in a browser.' },
                { title: 'Enter your UAN and password', text: 'Type your 12-digit UAN and the password you set during activation.' },
                { title: 'Complete the captcha', text: 'Enter the characters shown in the image exactly as displayed.' },
                { title: 'Click Sign In', text: 'You land on your member dashboard, showing your profile, service history, and quick links to passbook, claims, and KYC.' },
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

            {/* SECTION: Activate UAN */}
            <h2 id="activate-uan" style={hStyle}>How to Activate Your UAN: UMANG and Face Authentication</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Since August 1, 2025, UAN activation only happens through the UMANG app, verified by Aadhaar Face Authentication. The &quot;Activate UAN&quot; option no longer exists on the Member e-Sewa website.
              </p>
            </div>
            <p style={pStyle}>
              EPFO moved the entire process to UMANG, replacing the old OTP-based web activation with a Face Authentication scan.
            </p>
            <p style={pStyle}>
              New UAN generation for members who never had one works the same way, through UMANG with Face Authentication. You need two apps on your phone: UMANG itself, and the government&apos;s Aadhaar Face RD app, which UMANG calls during the scan.
            </p>
            <BulletList items={[
              <span key="a1"><strong>Install UMANG and Aadhaar Face RD</strong> from the App Store or Google Play, if you do not have them already.</span>,
              <span key="a2"><strong>Open UMANG, then EPFO Services</strong>, and select &quot;UAN Activation&quot; under &quot;UAN Services Through Face Auth.&quot;</span>,
              <span key="a3"><strong>Enter your UAN and basic details</strong> exactly as your employer recorded them.</span>,
              <span key="a4"><strong>Complete the Face Authentication scan</strong> when UMANG hands off to the Aadhaar Face RD app; hold your phone steady in good light.</span>,
              <span key="a5"><strong>Set a password</strong> once verification succeeds. This password also works for web login on the Member e-Sewa portal.</span>,
              <span key="a6"><strong>Wait roughly six hours</strong> before passbook data becomes visible, even though login itself works right after activation.</span>,
            ]} />

            {/* SECTION: Forgot password */}
            <h2 id="forgot-password" style={hStyle}>Forgot Your UAN or EPFO Password?</h2>
            <p style={pStyle}>
              Both stay recoverable on the web portal itself, no UMANG or Face Authentication needed. The revamped portal added one extra step since the July 2026 migration: retrieving a forgotten UAN now asks for an uploaded identity or address proof, not just your Aadhaar or PAN number.
            </p>
            <InfoTable
              caption="Recovery options on the Member e-Sewa portal"
              headers={['If you have forgotten', 'What to use', 'Where']}
              rows={[
                ['Your UAN', 'Registered mobile number, an uploaded ID or address proof, plus OTP', '"Know Your UAN" link on the login page'],
                ['Your password', 'OTP sent to your registered mobile number', '"Forgot Password" link on the login page'],
                ['Both UAN and password', 'Your employer’s HR or payroll team first, since they can confirm your registered UAN', 'Employer HR, then the portal'],
              ]}
            />

            {/* SECTION: Passbook download */}
            <h2 id="passbook-download" style={hStyle}>How to Download Your PF Passbook from the EPFO Website</h2>
            <p style={pStyle}>
              The passbook is a running statement of every contribution posted to your PF account, downloadable as a PDF at no cost. It may load slowly through mid-July while EPFO&apos;s systems settle after the recent migration.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Log in to the Member e-Sewa portal', text: 'Use your UAN, password, and captcha as described above.' },
                { title: 'Click View Passbook', text: 'This redirects to EPFO’s dedicated passbook service at passbook.epfindia.gov.in, already signed in with your session.' },
                { title: 'Select your Member ID', text: 'If you have contributed under more than one employer, choose the establishment whose passbook you want to view first.' },
                { title: 'Review the statement on screen', text: 'Month-by-month contributions, interest credited, and running balance appear in a table.' },
                { title: 'Download or print as PDF', text: 'Use the on-screen download option. The file needs no password to open.' },
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

            <CalcCTA
              href="/calculators/epf-calculator"
              label="EPF Calculator"
              note="Project your EPF maturity balance from your current basic salary, contribution rate, and years left to retirement."
            />

            {/* SECTION: UMANG */}
            <h2 id="umang-passbook" style={hStyle}>How to View Your UAN Passbook on the UMANG App</h2>
            <p style={pStyle}>
              UMANG (Unified Mobile App for New Governance) is the Government of India&apos;s single app for services across ministries, including EPFO. It is the only mobile app EPFO officially endorses for these services.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Install UMANG', text: 'Download it from the App Store or Google Play Store.' },
                { title: 'Open Services, then Social Security', text: 'From the app home screen, tap Services and select the Social Security category.' },
                { title: 'Select EPFO', text: 'Choose EPFO from the list of services under Social Security.' },
                { title: 'Tap View Passbook', text: 'This sits under Employee Centric Services on the EPFO tile.' },
                { title: 'Enter your UAN and request an OTP', text: 'Enter your 12-digit UAN and tap Get OTP.' },
                { title: 'Verify the OTP', text: 'Enter the OTP received on your registered mobile and tap Submit.' },
                { title: 'Choose the establishment', text: 'If you have more than one, select the employer whose passbook you want to view.' },
                { title: 'View and download', text: 'The passbook displays on screen; tap Download to save it.' },
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

            {/* SECTION: SMS / missed call */}
            <h2 id="sms-missed-call" style={hStyle}>Check EPF Balance Without Logging In: SMS and Missed Call</h2>
            <p style={pStyle}>
              Both rely on the mobile number registered against your UAN, and both need your KYC (Aadhaar, PAN, and bank account) already linked to it.
            </p>
            <h3 style={h3Style}>SMS Balance Check</h3>
            <p style={pStyle}>
              Send an SMS to <strong>7738299899</strong> in the format <strong>EPFOHO UAN ENG</strong>, replacing ENG with the three-letter code for your preferred language. EPFO replies with your most recent contribution and current balance.
            </p>
            <InfoTable
              caption="Supported languages for SMS balance check"
              headers={['Language', 'Code']}
              rows={[
                ['English', 'ENG'], ['Hindi', 'HIN'], ['Punjabi', 'PUN'], ['Gujarati', 'GUJ'], ['Marathi', 'MAR'],
                ['Telugu', 'TEL'], ['Tamil', 'TAM'], ['Kannada', 'KAN'], ['Malayalam', 'MAL'], ['Bengali', 'BEN'],
              ]}
            />
            <h3 style={h3Style}>Missed Call Balance Check</h3>
            <p style={pStyle}>
              Give a missed call to <strong>9966044425</strong>. The call disconnects on its own after one or two rings, at no cost to you, and EPFO texts back your balance shortly after.
            </p>

            {/* SECTION: Passbook contents */}
            <h2 id="passbook-contents" style={hStyle}>What Your UAN Passbook Shows</h2>
            <BulletList items={[
              'Establishment ID and the name of your employer.',
              'Your Member ID and name as recorded with that employer.',
              'The EPFO regional office and office type handling your account.',
              'Employee and employer contribution shares for each month.',
              'The portion of the employer’s contribution routed to your Employees’ Pension Scheme (EPS) account.',
              'Interest credited annually at the rate EPFO declares for that financial year.',
              'The date and time the statement was generated, printed at the end of the document.',
            ]} />

            {/* SECTION: Who cannot */}
            <h2 id="who-cannot" style={hStyle}>Who Cannot Access the EPF Passbook</h2>
            <p style={pStyle}>
              Three categories of members will not see a passbook even with an active, correctly logged-in UAN.
            </p>
            <InfoTable
              caption="Members excluded from online passbook access"
              headers={['Category', 'Why']}
              rows={[
                ['Exempted establishment members', 'Their employer runs its own government-approved PF trust outside EPFO’s central system, so records live with the trust, not EPFO.'],
                ['Settled members', 'The full PF balance has already been withdrawn and the account closed, leaving nothing left to display.'],
                ['Inoperative members', 'No contribution or withdrawal activity for an extended period, typically after retirement age with no claim filed; these accounts are frozen pending a claim or KYC update.'],
              ]}
            />

            {/* SECTION: Claim status */}
            <h2 id="claim-status" style={hStyle}>How to Check Your EPF Claim Status Online</h2>
            <p style={pStyle}>
              If you have filed a withdrawal, transfer, or advance claim, log in to the Member e-Sewa portal, open Online Services, and select Track Claim Status to see your reference number and current stage.
            </p>
            <p style={pStyle}>
              For what each status label means, why "Settled" sometimes shows no money yet, how to fix a rejected claim, and how to check status without logging in at all (missed call, SMS, or the toll-free helplines), see the <Link href="/blogs/epfo-claim-status" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>EPFO claim status guide</Link>.
            </p>
            <p style={pStyle}>
              Once a withdrawal or transfer claim settles, a lump sum parked in the <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF Calculator</Link> shows what it grows to at PPF&apos;s current guaranteed rate, as a lower-risk alternative to reinvesting it in the market immediately.
            </p>

            {/* SECTION: Login errors */}
            <h2 id="login-errors" style={hStyle}>Common EPFO Login Errors and How to Fix Them</h2>
            <InfoTable
              caption="EPFO login and passbook errors: cause and fix"
              headers={['Error', 'Likely Cause', 'Fix']}
              rows={[
                ['"Invalid Credentials" on login', 'Wrong UAN or password, or caps lock on', 'Retype carefully, or use Forgot Password to reset via OTP'],
                ['Captcha keeps failing', 'Misreading similar characters (0/O, 1/l)', 'Click the refresh icon next to the captcha for a clearer image'],
                ['Passbook is blank after activation', 'Less than six hours since UAN activation, or account is inoperative/exempted', 'Wait six hours, then confirm your category under "Who Cannot Access"'],
                ['UAN not activated', 'Employer generated UAN but activation step was skipped', 'Complete the Activate UAN flow with Aadhaar and OTP before attempting login'],
                ['SMS or missed call gives no reply', 'KYC not linked, or mobile number changed without updating UAN', 'Update mobile number and KYC on the portal, then retry after 24 hours'],
                ['Portal not loading or timing out', 'Server load during peak hours, or scheduled maintenance', 'Retry outside 10 AM to 6 PM, or use the UMANG app instead'],
                ['Claim rejected without clear reason', 'KYC or bank details mismatch with employer records', 'Check Track Claim Status for the rejection remark, then update KYC and resubmit'],
              ]}
            />

            {/* SECTION: Terminology */}
            <h2 id="terminology" style={hStyle}>EPFO Login vs UAN Portal vs Member e-Sewa: Is There a Difference?</h2>
            <p style={pStyle}>
              No. These are four names for one sign-in page: unifiedportal-mem.epfindia.gov.in/memberinterface. People just describe it differently depending on what they already know.
            </p>
            <p style={pStyle}>
              Some say &quot;EPFO login&quot; because EPFO is the organisation. Others say &quot;UAN login&quot; or &quot;UAN portal&quot; because the UAN is the credential. &quot;Member e-Sewa&quot; is just the portal&apos;s own brand name, e-Sewa meaning &quot;e-service&quot; in Hindi.
            </p>
            <p style={pStyle}>
              A separate portal at unifiedportal-emp.epfindia.gov.in handles ECR filing for employers, not individual members. EPFO also runs a shorter domain, epfo.gov.in, which redirects to the same login and passbook services.
            </p>

            {/* SECTION: Security */}
            <h2 id="security" style={hStyle}>Security Warning: Fake Apps and Phishing</h2>
            <p style={pStyle}>
              UMANG is the only authorised app for EPFO services, and epfindia.gov.in is the only official website. Any other app or lookalike site asking you to log in with your UAN is not genuine.
            </p>
            <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', borderRadius: 4, padding: '12px 16px', marginBottom: 20 }}>
              <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.65 }}>
                <strong>Never share</strong> your UAN, password, PAN, Aadhaar number, bank account details, or OTP with anyone over a call, message, or WhatsApp claiming to be from EPFO. EPFO staff do not request these details this way. Report suspicious calls or messages to your local police or the national cyber crime helpline.
              </p>
            </div>

            <CalcCTA
              href="/calculators/retirement-calculator"
              label="Retirement Calculator"
              note="See if your EPF balance plus other savings will cover your expenses after you stop working."
            />

            

            {/* SECTION 18: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: EPFO Login and PF Passbook</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="epfo-sidebar"
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
            {/* Ad banner */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>EPFO Quick Reference</div>
              {([
                ['UAN length', '12 digits'],
                ['Passbook wait after activation', '~6 hours'],
                ['SMS balance check', '7738299899'],
                ['Missed call balance check', '9966044425'],
                ['Toll-free helpdesk', '14470'],
                ['Helpdesk hours', '7 AM to 9 PM daily'],
                ['Official app', 'UMANG only'],
                ['Official website', 'epfindia.gov.in'],
                ['Passbook portal', 'passbook.epfindia.gov.in'],
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
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Retirement Calculators</div>
                <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>EPF Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>PPF Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>NPS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/retirement-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Retirement Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/epfo-claim-status', 'EPFO Claim Status: Check Your PF Claim Status'],
                ['/blogs/pf-balance-check', 'PF Balance Check: 5 Ways to Check EPF Balance'],
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
        .epfo-sidebar::-webkit-scrollbar { width: 5px; }
        .epfo-sidebar::-webkit-scrollbar-track { background: transparent; }
        .epfo-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .epfo-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

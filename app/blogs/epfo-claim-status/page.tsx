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
  title: 'EPFO Claim Status: Check Your PF Claim Status Online',
  description: 'Check EPFO claim status via the Member Portal, UMANG app, missed call to 9966044425, SMS to 7738299899, or the 14470 helpline. What "Settled," "Pending at Employer," and "DA/AO Pending" actually mean, what to do when a claim is rejected, and how long each stage really takes.',
  alternates: { canonical: 'https://fermor.in/blogs/epfo-claim-status' },
  openGraph: {
    title: 'EPFO Claim Status: Check Your PF Claim Status Online - Fermor',
    description: 'Every way to track a PF claim, what each status label means, and what to do when a claim is rejected or stuck.',
    type: 'article',
    publishedTime: '2026-07-29T16:44:08+05:30',
    modifiedTime: '2026-07-29T16:44:08+05:30',
    authors: ['Fermor Analysis'],
    tags: ['EPF', 'EPFO', 'PF Claim', 'UAN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPFO Claim Status - Fermor',
    description: 'Track your PF claim by portal, UMANG, missed call, SMS, or helpline. What each status label actually means.',
  },
  keywords: [
    'epfo claim status', 'pf claim status', 'epf claim status', 'claim status epfo', 'claim status pf',
    'employee pf claim status', 'epfo pf claim status', 'check pf claim status', 'epfo claim status check',
    'online pf claim status', 'epfo passbook claim status', 'epfo online claim status', 'pf claim',
    'epfo claim', 'claim epfo', 'epfo claim online', 'epf claim online', 'epfo online claim',
    'know pf claim status', 'status of claim epfo', 'epfo track claim', 'pf status', 'epf status',
  ],
};

const faqItems = [
  { q: 'How do I check my EPFO claim status?', a: 'Log in to the EPFO Member Portal with your UAN, password, and captcha, then go to Online Services and select Track Claim Status. You can also check via the UMANG app, by sending an SMS to 7738299899, by giving a missed call to 9966044425, or by calling the 14470 helpline, all without logging in.' },
  { q: 'How many days does an EPF claim take to settle?', a: 'An online claim through auto-mode settlement typically takes 4 to 5 working days. A claim requiring manual review, or filed offline, can take up to 20 working days under the EPF Scheme rules, though employer verification and KYC issues commonly add delay.' },
  { q: 'What does "Payment Under Process" mean on my PF claim status?', a: 'Your claim has been approved and EPFO has started the payment file to your bank, typically taking a further 2 to 3 working days before the money leaves EPFO. It is not yet in your account at this stage.' },
  { q: 'What does "Settled" mean if I have not received the money?', a: 'Settled means EPFO has sent the payment via NEFT, which usually takes 1 to 3 more working days to actually land in your account. If it still has not arrived, check your bank details are correct, then check whether the status has changed to "Returned," which means the NEFT bounced and you need to update your bank details and reapply.' },
  { q: 'What does "Pending at Employer" mean?', a: 'Your employer has not yet digitally approved or signed off on your claim. EPFO cannot begin processing until your employer completes this step, so the timeline is indefinite until HR acts. Follow up with your employer\'s HR or payroll team directly.' },
  { q: 'What does "DA Pending" or "AO Pending" mean?', a: 'DA stands for Dealing Assistant and AO for Accounts Officer, the two EPFO staff roles that manually review a claim before approval. A claim at this stage typically takes 3 to 7 working days, longer if the reviewing office has a backlog.' },
  { q: 'My PF claim was rejected. What do I do?', a: 'Check the rejection remark shown on the portal. A name mismatch needs a Joint Declaration Form to align your EPFO record with Aadhaar; "member not exited from previous employment" needs your previous employer (or you, via the Manage tab) to mark your date of exit; a missing certificate for Form 10C usually means you have under 6 months of service, which makes you ineligible for that specific claim type.' },
  { q: 'Can I cancel a PF withdrawal claim after submitting it?', a: 'Not online, once processing has started. Raise a grievance through the EPFiGMS portal, or visit your EPFO regional office with a written request to stop processing, and it only works if the claim has not already been settled.' },
  { q: 'How do I check PF claim status by SMS?', a: 'Send an SMS reading EPFOHO UAN to 7738299899 from your UAN-registered mobile number. Add a three-letter language code after your UAN for a reply in a language other than English, for example EPFOHO UAN TAM for Tamil.' },
  { q: 'How do I check PF claim status by missed call?', a: 'Give a missed call to 9966044425 from your UAN-registered mobile number. The call disconnects automatically after two rings, at no cost, and EPFO texts back your balance and latest claim-related details shortly after.' },
  { q: 'What is the EPFO toll-free helpline number for claim status?', a: 'Call 1800 118 005, which runs an automated IVR system around the clock but has live agents only Monday to Saturday, 9:15 AM to 5:45 PM. EPFO also runs a separate multilingual helpline at 14470, available 7 AM to 9 PM in ten languages, for PF, pension, and EDLI queries.' },
  { q: 'What information do I need to check my claim status?', a: 'Your UAN, your employer\'s EPF regional office, your employer\'s establishment details, and the extension code if your employer has one. Keep these ready before calling the helpline, since an agent cannot look up your claim without at least your UAN or PF account number.' },
  { q: 'Can I track my PF claim status using a tracking ID?', a: 'Yes. Log in to the Member Portal with your UAN, password, and captcha, and select Track Claim Status or View Claim Status. Your tracking ID, form type, and current status appear on the same screen.' },
  { q: 'Do I get an SMS when my claim is processed?', a: 'Yes, if your mobile number is linked to your UAN. EPFO sends an SMS when the claim application is first received, and a second SMS when the funds are actually transferred to your bank account.' },
  { q: 'Why is my claim stuck at the same status for a long time?', a: 'The most common causes are unapproved employer verification, an incomplete KYC (Aadhaar, PAN, or bank account not linked), or additional scrutiny by EPFO staff on a high-value or unusual claim. If the delay looks excessive against the normal 20-working-day window, raise a grievance through the EPFiGMS portal.' },
  { q: 'What is the difference between Form 19, Form 10C, and Form 31?', a: 'Form 19 withdraws your Provident Fund balance, Form 10C withdraws your pension (EPS) contribution, and Form 31 requests a partial withdrawal or advance while your account stays open. Which one applies to your claim shows on the claim status screen alongside the tracking ID.' },
  { q: 'Can an employer reduce its share of EPF contribution?', a: 'No. An employer reducing its statutory EPF contribution share is illegal under the EPF and Miscellaneous Provisions Act, regardless of any agreement with the employee.' },
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
  headline: 'EPFO Claim Status: Check Your PF Claim Status Online and Offline',
  url: 'https://fermor.in/blogs/epfo-claim-status',
  datePublished: '2026-07-29T16:44:08+05:30',
  dateModified: '2026-07-29T16:44:08+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/epfo-claim-status' },
  articleSection: 'EPF',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'EPFO Claim Status', description: 'The tracking system EPFO provides for members to check the progress of a PF withdrawal, transfer, or pension claim' },
  ],
  keywords: 'epfo claim status, pf claim status, epf claim status, check pf claim status',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'EPFO Claim Status', item: 'https://fermor.in/blogs/epfo-claim-status' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check EPFO Claim Status Online',
  description: 'Step-by-step process to check a PF withdrawal, transfer, or pension claim status on the EPFO Member Portal.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit the EPFO Member Portal', text: 'Go to the Member e-Sewa portal at unifiedportal-mem.epfindia.gov.in.' },
    { '@type': 'HowToStep', position: 2, name: 'Log in', text: 'Enter your UAN, password, and the captcha shown.' },
    { '@type': 'HowToStep', position: 3, name: 'Open Online Services', text: 'From the top menu, click Online Services.' },
    { '@type': 'HowToStep', position: 4, name: 'Select Track Claim Status', text: 'Choose Track Claim Status from the dropdown menu.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your status', text: 'Your tracking ID, form type, and current status appear on screen.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/epfo-claim-status',
  name: 'EPFO Claim Status: Check Your PF Claim Status Online - Fermor',
  url: 'https://fermor.in/blogs/epfo-claim-status',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T16:44:08+05:30',
  dateModified: '2026-07-29T16:44:08+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'EPFO Claim Status',
    description: 'The stage a submitted EPF withdrawal, transfer, or pension claim has reached in EPFO\'s processing pipeline, shown on the Member Portal as a status label such as Settled, Pending at Employer, or Rejected.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian EPF and UAN Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'EPF members who have submitted a withdrawal, transfer, or pension claim',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#methods-overview', name: 'Claim Status Methods' },
    { '@type': 'WebPageElement', cssSelector: '#prerequisites', name: 'Prerequisites' },
    { '@type': 'WebPageElement', cssSelector: '#uan-portal', name: 'EPFO Member Portal' },
    { '@type': 'WebPageElement', cssSelector: '#umang-app', name: 'UMANG App' },
    { '@type': 'WebPageElement', cssSelector: '#missed-call-sms', name: 'Missed Call and SMS' },
    { '@type': 'WebPageElement', cssSelector: '#toll-free', name: 'Toll-Free Helplines' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'What Each Status Means' },
    { '@type': 'WebPageElement', cssSelector: '#settled-no-money', name: 'Settled But No Money' },
    { '@type': 'WebPageElement', cssSelector: '#rejected', name: 'Claim Rejected' },
    { '@type': 'WebPageElement', cssSelector: '#cancel-claim', name: 'Cancelling a Claim' },
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
  { id: 'methods-overview', label: 'All Methods at a Glance' },
  { id: 'prerequisites', label: 'What You Need First' },
  { id: 'uan-portal', label: 'EPFO Member Portal' },
  { id: 'umang-app', label: 'UMANG App' },
  { id: 'missed-call-sms', label: 'Missed Call and SMS' },
  { id: 'toll-free', label: 'Toll-Free Helplines' },
  { id: 'status-meanings', label: 'What Each Status Means' },
  { id: 'settled-no-money', label: '"Settled" But No Money' },
  { id: 'rejected', label: 'Claim Rejected' },
  { id: 'cancel-claim', label: 'Cancelling a Claim' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Phone numbers, helpline timings, and portal procedures are set by EPFO and are subject to change. Always verify current details on the official EPFO website (<a href="https://www.epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>epfindia.gov.in</a>) before relying on any number listed here. Fermor is not affiliated with EPFO.
      </p>
    </div>
  );
}

export default function EPFOClaimStatusPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>EPFO Claim Status</li>
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
            <time dateTime="2026-07-29T16:44:08+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 29, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            EPFO Claim Status: Check Your PF Claim Status Online and Offline
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Check your EPFO claim status by logging into the Member Portal and selecting Track Claim Status. Or skip the login entirely: the UMANG app, a missed call to 9966044425, an SMS to 7738299899, or the 14470 helpline all work too.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Online auto-mode claims settle in 4 to 5 working days. Manually reviewed claims can take up to 20.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: every tracking method, what each status label actually means, why a claim marked "Settled" sometimes has no money behind it yet, and exactly what to do when a claim gets rejected.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="methods-overview" style={hStyle}>EPFO Claim Status: All Methods at a Glance</h2>
            <p style={pStyle}>
              Every method needs your UAN. Only the portal and UMANG need internet access; missed call, SMS, and the helplines work on any basic phone.
            </p>
            <DataTable
              caption="EPFO Claim Status Tracking Methods"
              headers={['Method', 'How', 'Login Required']}
              rows={[
                ['EPFO Member Portal', 'Online Services > Track Claim Status', 'Yes'],
                ['UMANG App', 'EPFO > Employee Centric Services > Track Claim', 'Yes (UAN + OTP/MPIN)'],
                ['Missed call', '9966044425 from registered number', 'No'],
                ['SMS', 'EPFOHO UAN to 7738299899', 'No'],
                ['Toll-free helpline', '1800 118 005 or 14470', 'No'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="prerequisites" style={hStyle}>What You Need Before Checking Claim Status</h2>
            <p style={pStyle}>
              Keep four things handy, especially if you plan to call the helpline rather than use the portal.
            </p>
            <BulletList items={[
              'Your Universal Account Number (UAN)',
              'Your employer\'s EPF regional office',
              'Your employer\'s establishment details',
              'The extension code, if your employer has one',
            ]} />

            {/* SECTION 3 */}
            <h2 id="uan-portal" style={hStyle}>Check EPFO Claim Status via the Member Portal</h2>
            <p style={pStyle}>
              The Member Portal gives the most detail: your exact tracking ID, the form type filed, and the current status, all on one screen.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Visit the Member Portal">Go to <a href="https://unifiedportal-mem.epfindia.gov.in/memberinterface/" target="_blank" rel="noopener noreferrer" style={linkStyle}>unifiedportal-mem.epfindia.gov.in</a>.</Step>
              <Step n={2} title="Log in">Enter your UAN, password, and the captcha shown.</Step>
              <Step n={3} title="Open Online Services">Click Online Services on the top menu.</Step>
              <Step n={4} title="Select Track Claim Status">Choose it from the dropdown.</Step>
              <Step n={5} title="Read your status">Your tracking ID, form type, and current status appear on screen.</Step>
            </div>
            <p style={pStyle}>
              EPFO also sends SMS alerts automatically if your mobile number is linked: one when your claim application is received, and a second when funds actually transfer to your bank account.
            </p>

            {/* SECTION 4 */}
            <h2 id="umang-app" style={hStyle}>Check EPFO Claim Status via UMANG App</h2>
            <p style={pStyle}>
              UMANG works without a browser login: sign in with your registered mobile number using MPIN or OTP instead.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Install UMANG">Get it from the Play Store or App Store.</Step>
              <Step n={2} title="Log in">Use your registered mobile number with MPIN or OTP.</Step>
              <Step n={3} title="Go to Employee Centric Services">You are redirected to the EPFO section of the app.</Step>
              <Step n={4} title="Select Track Claim">Choose it to view your EPF claim status.</Step>
              <Step n={5} title="Read the result">Your claim status appears; it stays blank if you have no active claims.</Step>
            </div>

            {/* SECTION 5 */}
            <h2 id="missed-call-sms" style={hStyle}>Check EPFO Claim Status by Missed Call or SMS</h2>
            <p style={pStyle}>
              Both work without internet, and both require your Aadhaar, PAN, or bank account to already be seeded against your UAN.
            </p>
            <h3 style={{ fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, marginTop: 24, marginBottom: 10 }}>Missed Call: 9966044425</h3>
            <p style={pStyle}>
              Give a missed call to <strong>9966044425</strong> from your registered mobile number. The call disconnects automatically after two rings, at no cost, and EPFO texts back your balance and latest details shortly after.
            </p>
            <h3 style={{ fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, marginTop: 24, marginBottom: 10 }}>SMS: 7738299899</h3>
            <p style={pStyle}>
              Send an SMS reading <strong>EPFOHO UAN</strong> to <strong>7738299899</strong>. EPFO replies in English by default, or in one of nine other languages if you add a three-letter code after your UAN.
            </p>
            <DataTable
              caption="SMS Language Codes: EPFOHO UAN [CODE] to 7738299899"
              headers={['Language', 'Code']}
              rows={[
                ['English', 'Default'], ['Hindi', 'HIN'], ['Punjabi', 'PUN'], ['Gujarati', 'GUJ'], ['Marathi', 'MAR'],
                ['Kannada', 'KAN'], ['Telugu', 'TEL'], ['Tamil', 'TAM'], ['Malayalam', 'MAL'], ['Bengali', 'BEN'],
              ]}
            />

            {/* SECTION 6 */}
            <h2 id="toll-free" style={hStyle}>EPFO Toll-Free Helplines for Claim Status</h2>
            <p style={pStyle}>
              Two separate toll-free numbers exist, and they are not interchangeable in terms of availability.
            </p>
            <DataTable
              caption="EPFO Toll-Free Helplines"
              headers={['Number', 'Hours', 'Best For']}
              rows={[
                ['1800 118 005', '24/7 automated IVR; live agents Mon-Sat, 9:15 AM to 5:45 PM', 'Claim status, general PF queries'],
                ['14470', '7 AM to 9 PM daily, 10 languages', 'PF, pension, and EDLI queries in a regional language'],
              ]}
            />
            <Callout>
              A common mistake: assuming 1800 118 005 has a live agent available around the clock. The automated IVR runs 24/7, but an actual person who can pull up your claim only answers Monday to Saturday, 9:15 AM to 5:45 PM.
            </Callout>

            <CalcCTA
              href="/calculators/retirement-calculator"
              label="Retirement Calculator"
              note="If your claim is a full withdrawal, check what that gap does to your retirement corpus before you file."
            />

            {/* SECTION 7 */}
            <h2 id="status-meanings" style={hStyle}>What Each EPFO Claim Status Actually Means</h2>
            <p style={pStyle}>
              The label on your screen tells you exactly where your claim sits in EPFO&apos;s pipeline, and roughly how long the next step takes.
            </p>
            <DataTable
              caption="EPFO Claim Status Labels Explained"
              headers={['Status Shown', 'What It Means', 'Typical Time']}
              rows={[
                ['Payment Under Process', 'Approved; EPFO has started the payment file to your bank', '2-3 working days'],
                ['Settled', 'EPFO has sent the money via NEFT', 'Check your bank in 1-3 days'],
                ['Pending at Employer', 'Your employer has not digitally approved it yet', 'Indefinite until HR acts'],
                ['DA / AO Pending', 'A Dealing Assistant or Accounts Officer is reviewing your file', '3-7 working days'],
                ['Rejected', 'Claim denied; the reason is in the Remarks section', 'Application closed'],
              ]}
            />

            {/* SECTION 8 */}
            <h2 id="settled-no-money" style={hStyle}>Status Says "Settled" But You Have Not Received the Money</h2>
            <p style={pStyle}>
              NEFT transfers are not instant, so wait three working days before assuming something is wrong. Confirm the bank account details on your claim were entered correctly in the first place.
            </p>
            <p style={pStyle}>
              If the money still has not arrived after three days, log in again and check whether the status has changed from "Settled" to "Returned," which means the NEFT bounced. You will need to update your bank details on the portal and file the claim again.
            </p>

            {/* SECTION 9 */}
            <h2 id="rejected" style={hStyle}>Claim Rejected: What to Do Next</h2>
            <p style={pStyle}>
              The specific rejection reason, shown in the Remarks section on the portal, determines the fix.
            </p>
            <BulletList items={[
              <span key="1"><strong>Name mismatch:</strong> submit a Joint Declaration Form to correct your name in EPFO records to match Aadhaar.</span>,
              <span key="2"><strong>&quot;Member not exited from previous employment&quot;:</strong> ask your previous employer to mark your Date of Exit, or set it yourself under the Manage tab.</span>,
              <span key="3"><strong>&quot;Certificate not enclosed&quot; (usually Form 10C):</strong> this typically means you have under 6 months of service, which makes you ineligible for that specific claim type.</span>,
            ]} />

            {/* SECTION 10 */}
            <h2 id="cancel-claim" style={hStyle}>How to Cancel an EPFO Withdrawal Claim</h2>
            <p style={pStyle}>
              Once submitted, a claim cannot be cancelled online. Two options exist if you need to stop it before settlement.
            </p>
            <BulletList items={[
              <span key="1">Raise a grievance through the <a href="https://epfigms.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPFiGMS portal</a>, explaining that you want the claim withdrawn.</span>,
              <span key="2">Visit your EPFO regional office in person with a written request to stop processing, which only works if the claim has not already been settled.</span>,
            ]} />
            <p style={pStyle}>
              For the full withdrawal process, including which form to file and how PF withdrawal is taxed, see the <Link href="/blogs/pf-withdrawal-claim-online" target="_blank" rel="noopener noreferrer" style={linkStyle}>PF withdrawal guide</Link>. For UAN activation and login issues, see the <Link href="/blogs/epfo-login-uan-passbook" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPFO login guide</Link>.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: EPFO Claim Status</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="epfo-claim-sidebar"
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
                ['Toll-free (general)', '1800 118 005'],
                ['Toll-free (multilingual)', '14470'],
                ['Online auto-mode settlement', '4-5 days'],
                ['Manual review settlement', 'Up to 20 days'],
                ['NEFT credit after "Settled"', '1-3 days'],
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
                ['/blogs/pf-withdrawal-claim-online', 'PF Withdrawal Online: Claim, Status and EPF Scheme 2026'],
                ['/blogs/pf-balance-check', 'PF Balance Check: 5 Ways to Check EPF Balance'],
                ['/blogs/epfo-login-uan-passbook', 'EPFO Login: UAN Portal, Activation and Passbook'],
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
        .epfo-claim-sidebar::-webkit-scrollbar { width: 5px; }
        .epfo-claim-sidebar::-webkit-scrollbar-track { background: transparent; }
        .epfo-claim-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .epfo-claim-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

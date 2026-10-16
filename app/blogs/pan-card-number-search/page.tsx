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
  title: 'How to Know Your PAN Card Number: 7 Official Ways to Find It',
  description: 'Free guide to find your PAN card number online: Income Tax e-Filing profile, Verify PAN Status, Instant e-PAN via Aadhaar, UMANG app, old documents, and company PAN via GSTIN.',
  alternates: { canonical: 'https://fermor.in/blogs/pan-card-number-search' },
  openGraph: {
    title: 'How to Know Your PAN Card Number: 7 Official Ways to Find It - Fermor',
    description: 'Lost your PAN card or never wrote the number down? Every official way to find your PAN number again, plus what name-and-DOB lookup actually does and does not do.',
    type: 'article',
    publishedTime: '2026-10-06T21:26:48+05:30',
    modifiedTime: '2026-10-06T21:26:48+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PAN Card', 'Income Tax', 'KYC'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Know Your PAN Card Number - Fermor',
    description: 'Every official way to find your PAN number again: e-Filing profile, Verify PAN Status, Instant e-PAN, UMANG, old documents, and company PAN via GSTIN.',
  },
  keywords: [
    'how to know pan card number', 'how to know the pan card number', 'how to know my pan card number',
    'how to know pan card number online', 'how to know my pan card number online',
    'how to know pan card number with name', 'how to know pan card number by name',
    'how to know your pan card number', 'how to know pan number by aadhar card',
    'how to know pan card number with aadhar', 'how to know name from pan card number',
    'how to know pan card number of company', 'how to know pan card number if lost',
    'how to know pan card acknowledgement number', 'how to know pan card number by aadhar card',
    'how to know my pan number without pan card', 'how to know which number is linked with pan card',
    'how to know pan card linked mobile number', 'how to know demat account number using pan card',
    'how to know uan number by pan card', 'how to know tan number by pan card',
    'how to know valid pan card number', 'pan number search', 'know your pan',
  ],
};

const faqItems = [
  { q: 'How can I know my PAN card number?', a: 'Check the physical card itself first since the 10-character number is printed on the front. If you cannot find the card, log in to your account on the Income Tax e-Filing portal, where your PAN appears on the profile page, or check any document that already carries it: a bank passbook, Form 16, an old ITR acknowledgement, or a mutual fund or Demat statement.' },
  { q: 'How can I find my PAN card number online for free?', a: 'The Income Tax e-Filing portal is free for every PAN-related lookup that applies to you: logging in to see your profile, running Verify PAN Status if you already have a candidate number, or generating an Instant e-PAN through Aadhaar if your mobile is Aadhaar-linked. The UMANG app offers the same PAN services at no cost.' },
  { q: 'Can I find my PAN card number using only my name and date of birth?', a: 'No official, free government tool looks up an unknown PAN using name and date of birth alone. The Income Tax Department’s Verify PAN Status service needs the PAN number itself as an input alongside name and date of birth, so it confirms a PAN you already have rather than discovering one you do not.' },
  { q: 'How do I know my PAN card number if I lost my PAN card?', a: 'Log in to the Income Tax e-Filing portal; if you ever created an account, your PAN is both your login ID and the number shown on your profile page. If you never created an account, check old documents such as a bank KYC form, a previous ITR, or a loan file, or generate a fresh Instant e-PAN through Aadhaar if it is linked to your mobile number.' },
  { q: 'How can I find my PAN card number using my Aadhaar number?', a: 'On the Income Tax e-Filing portal, open Instant e-PAN, choose Check Status or Download PAN, enter your 12-digit Aadhaar number, and verify with the OTP sent to your Aadhaar-linked mobile. This works only if your PAN was originally issued, or has since been linked, through Aadhaar e-KYC.' },
  { q: 'What is a PAN card acknowledgement number, and is it the same as my PAN?', a: 'No. The acknowledgement number is a separate 15-digit number generated when you submit a new PAN application or correction request through Protean (NSDL) or UTIITSL. It tracks that application’s processing status; the PAN itself is only issued once the application is approved.' },
  { q: 'How do I find the PAN card number of a company?', a: 'Check the company’s own incorporation certificate, PAN allotment letter, or GST registration certificate, since a company’s 15-character GSTIN embeds its PAN directly: characters 3 through 12 of the GSTIN are the company’s PAN. Decode any GSTIN on the GST Number Search tool to extract it.' },
  { q: 'Can I check which mobile number is linked to my PAN card?', a: 'There is no standalone public tool that reveals the mobile number linked to someone’s PAN. You can see your own registered mobile and email under Profile on the Income Tax e-Filing portal once logged in, or check Aadhaar-PAN link status to confirm the linkage succeeded, but neither is a lookup by PAN alone.' },
  { q: 'Can I find someone’s bank account number using their PAN card?', a: 'No. Bank account numbers are not derivable from a PAN and are not exposed by any official PAN lookup tool. A bank only confirms whether a PAN is linked to an account it already holds, as part of its own KYC process, not as a public search.' },
  { q: 'Can I find my UAN or PF number using my PAN card?', a: 'Not directly. EPFO’s own "Know Your UAN" service looks up your Universal Account Number using your Aadhaar-linked mobile number and OTP, not your PAN. Your PAN does appear inside your EPFO profile once it is linked, but PAN is not the search key EPFO uses.' },
  { q: 'How do I know if a PAN card number is valid?', a: 'A valid PAN is always exactly 10 characters in the pattern AAAAA9999A: five letters, four digits, one letter. The fifth letter encodes the holder type (P for an individual, C for a company, H for a Hindu Undivided Family, F for a firm or LLP, among others). A number that does not match this pattern cannot be a genuine PAN, regardless of what the Verify PAN Status tool says.' },
  { q: 'Is my PAN card number the same as my Income Tax Department login ID?', a: 'Yes, for an individual taxpayer. The e-Filing portal uses PAN as the default login ID for individual accounts, so if you have ever registered or filed a return on the portal, the ID you log in with is your PAN.' },
  { q: 'What should I do if I entered the wrong PAN number somewhere?', a: 'Correct it immediately with whoever holds the wrong number on file: your bank, employer, broker, or the Income Tax Department. If the PAN printed on your own card has an error (wrong name, date of birth, or other detail), that is fixed through a PAN correction application, not a new PAN application.' },
  { q: 'Is it safe to share my PAN card number online?', a: 'Share it only with institutions that genuinely need it for KYC, tax, or regulatory reasons, such as a bank, broker, employer, or the Income Tax Department, and only through their official website or app. A PAN by itself cannot be used to move money, but combined with other leaked personal details it can support identity fraud, so avoid posting it publicly or emailing it unencrypted.' },
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
  headline: 'How to Know Your PAN Card Number: 7 Official Ways to Find It',
  url: 'https://fermor.in/blogs/pan-card-number-search',
  datePublished: '2026-10-06T21:26:48+05:30',
  dateModified: '2026-10-06T21:26:48+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pan-card-number-search' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'PAN Card Number Lookup', description: 'The official methods for finding or recovering a Permanent Account Number issued by the Income Tax Department of India' },
  ],
  keywords: 'how to know pan card number, know your pan, pan number search, verify pan status, instant e-pan',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'How to Know Your PAN Card Number', item: 'https://fermor.in/blogs/pan-card-number-search' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your PAN Card Number on the Income Tax e-Filing Portal',
  description: 'Step-by-step process to view your own PAN number by logging in to the Income Tax e-Filing portal.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Go to the e-Filing portal', text: 'Visit the official Income Tax e-Filing portal login page.' },
    { '@type': 'HowToStep', position: 2, name: 'Log in with your user ID', text: 'If you have ever registered on the portal, your PAN itself is usually your user ID. Enter it along with your password or OTP.' },
    { '@type': 'HowToStep', position: 3, name: 'Open your profile', text: 'Click your name or avatar in the top right, then My Profile.' },
    { '@type': 'HowToStep', position: 4, name: 'Read your PAN', text: 'Your PAN number is displayed under your personal details on the profile page.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pan-card-number-search',
  name: 'How to Know Your PAN Card Number: 7 Official Ways to Find It - Fermor',
  url: 'https://fermor.in/blogs/pan-card-number-search',
  inLanguage: 'en-IN',
  datePublished: '2026-10-06T21:26:48+05:30',
  dateModified: '2026-10-06T21:26:48+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'PAN (Permanent Account Number)',
    description: 'A 10-character alphanumeric identifier issued by the Income Tax Department of India to every taxpayer, used for filing returns, KYC, and tracking financial transactions.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian PAN holders who have lost, forgotten, or never recorded their PAN number',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#methods-overview', name: 'Every Method at a Glance' },
    { '@type': 'WebPageElement', cssSelector: '#physical-card', name: 'Check the Physical Card' },
    { '@type': 'WebPageElement', cssSelector: '#efiling-profile', name: 'e-Filing Portal Profile' },
    { '@type': 'WebPageElement', cssSelector: '#verify-pan', name: 'Verify PAN Status Tool' },
    { '@type': 'WebPageElement', cssSelector: '#instant-epan', name: 'Instant e-PAN via Aadhaar' },
    { '@type': 'WebPageElement', cssSelector: '#umang', name: 'UMANG App' },
    { '@type': 'WebPageElement', cssSelector: '#name-dob', name: 'Name and DOB Lookup' },
    { '@type': 'WebPageElement', cssSelector: '#old-documents', name: 'Old Documents' },
    { '@type': 'WebPageElement', cssSelector: '#lost-pan', name: 'Lost PAN Card' },
    { '@type': 'WebPageElement', cssSelector: '#acknowledgement', name: 'Acknowledgement Number vs PAN' },
    { '@type': 'WebPageElement', cssSelector: '#company-pan', name: 'Company or Firm PAN' },
    { '@type': 'WebPageElement', cssSelector: '#what-else', name: 'What Else a PAN Can and Cannot Reveal' },
    { '@type': 'WebPageElement', cssSelector: '#valid-pan', name: 'Checking If a PAN Is Valid' },
    { '@type': 'WebPageElement', cssSelector: '#next-steps', name: 'After You Find Your PAN' },
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
  knowsAbout: ['PAN Card India', 'Income Tax India', 'KYC Documents India', 'Personal Finance India'],
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

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '10px 14px', textAlign: 'left', verticalAlign: 'middle', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '9px 14px', textAlign: 'left', verticalAlign: 'middle', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.5 };
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
  { id: 'methods-overview', label: 'Every Method at a Glance' },
  { id: 'physical-card', label: 'Check the Physical Card' },
  { id: 'efiling-profile', label: 'e-Filing Portal Profile' },
  { id: 'verify-pan', label: 'Verify PAN Status Tool' },
  { id: 'instant-epan', label: 'Instant e-PAN via Aadhaar' },
  { id: 'umang', label: 'UMANG App' },
  { id: 'name-dob', label: 'Name and DOB Lookup' },
  { id: 'old-documents', label: 'Old Documents' },
  { id: 'lost-pan', label: 'Lost PAN Card' },
  { id: 'acknowledgement', label: 'Acknowledgement Number' },
  { id: 'company-pan', label: "A Company's PAN" },
  { id: 'what-else', label: 'What a PAN Can Reveal' },
  { id: 'valid-pan', label: 'Is a PAN Number Valid?' },
  { id: 'next-steps', label: 'After You Find It' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article covers the lookup and verification methods the Income Tax Department, Protean (NSDL), and UMANG publish officially. It does not cover every portal error message or edge case. For anything not addressed here, including a PAN that genuinely cannot be traced through any method above, confirm directly on the official Income Tax e-Filing portal (<a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>eportal.incometax.gov.in</a>) or by calling the department's own helpline. Fermor is not affiliated with the Income Tax Department, Protean, UTIITSL, or UMANG.
      </p>
    </div>
  );
}

export default function PanCardNumberSearchPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>How to Know Your PAN Card Number</li>
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
            <time dateTime="2026-10-06T21:26:48+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 6, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            How to Know Your PAN Card Number: 7 Official Ways to Find It
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Your PAN card number is printed on the card itself, saved on your Income Tax e-Filing profile if you have ever registered there, and recorded on most financial documents you already hold: bank passbooks, Form 16, old ITR filings, and investment statements.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: every official route to find or confirm a PAN number, what the e-Filing portal's "Verify PAN Status" tool actually needs as input, how Instant e-PAN via Aadhaar works, what to do if the physical card is gone, and how to find a company's PAN through its GSTIN.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="methods-overview" style={hStyle}>How to Know Your PAN Card Number: Every Method at a Glance</h2>
            <p style={pStyle}>
              Which method works depends on what you already have: the physical card, an e-Filing account, Aadhaar linkage, or just an old document with the number printed on it.
            </p>
            <DataTable
              caption="PAN Number Lookup Methods"
              headers={['Method', 'Best For', 'Required Details']}
              rows={[
                ['Physical PAN card', 'Anyone who still has the card', 'Nothing, just read it'],
                ['Income Tax e-Filing profile', 'Anyone with a registered e-Filing account', 'Login credentials'],
                ['Verify PAN Status', 'Confirming a PAN you already have', 'PAN, name, date of birth'],
                ['Instant e-PAN via Aadhaar', 'Aadhaar-linked mobile holders', 'Aadhaar number and OTP'],
                ['UMANG app', 'Mobile users who prefer an app over a browser', 'Aadhaar number and OTP'],
                ['Old financial documents', 'Anyone with bank, tax, or investment paperwork', 'Nothing, just check the document'],
                ['GSTIN decode', 'Finding a company or firm’s PAN', 'The company’s 15-character GSTIN'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="physical-card" style={hStyle}>Check the Physical PAN Card First</h2>
            <p style={pStyle}>
              A genuine PAN is always exactly 10 characters, printed clearly below your photograph and signature on the card: five letters, four digits, and one final letter.
            </p>
            <p style={pStyle}>
              If a laminated card was ever issued to you, this is the fastest method by far and needs no login, no OTP, and no waiting. Check wallets, document folders, and any file where identity documents are kept before trying an online method.
            </p>

            {/* SECTION 3 */}
            <h2 id="efiling-profile" style={hStyle}>Find Your PAN on the Income Tax e-Filing Portal</h2>
            <p style={pStyle}>
              If you have ever registered on the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax e-Filing portal</a>, whether to file a return, link Aadhaar, or check a refund, your PAN itself is normally the user ID for an individual account.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Go to the e-Filing login page">Visit the official portal and click Login.</Step>
              <Step n={2} title="Log in with your user ID">For most individual taxpayers, this user ID is the PAN itself. Enter your password or request an OTP.</Step>
              <Step n={3} title="Open My Profile">Click your name or avatar in the top right corner, then select My Profile.</Step>
              <Step n={4} title="Read your PAN">Your PAN number is displayed under your personal details on this page.</Step>
            </div>
            <p style={pStyle}>
              If you have forgotten whether you ever registered at all, the portal's own account-recovery flow (Forgot Password / Forgot User ID) still needs some other identifier, so this method only helps once you locate at least one credential tied to the account.
            </p>

            {/* SECTION 4 */}
            <h2 id="verify-pan" style={hStyle}>Verify Your PAN Using the Income Tax Department's "Verify PAN Status" Tool</h2>
            <p style={pStyle}>
              The <a href="http://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/verify-your-pan" target="_blank" rel="noopener noreferrer" style={linkStyle}>Verify PAN Status</a> service on the e-Filing portal checks whether a PAN is valid and whether its recorded name and date of birth match, by asking you to enter the PAN itself alongside your name and date of birth.
            </p>
            <p style={pStyle}>
              That input requirement matters: this tool confirms a PAN number you already have, it does not search for an unknown number using only your name. It is the right tool once you have a candidate PAN from an old document and want to confirm it is correct and active, not a way to discover a number from scratch.
            </p>

            {/* SECTION 5 */}
            <h2 id="instant-epan" style={hStyle}>Find Your PAN Through Instant e-PAN via Aadhaar</h2>
            <p style={pStyle}>
              If your mobile number is linked to Aadhaar, the Income Tax Department's Instant e-PAN facility reveals your PAN by generating or retrieving an e-PAN tied to that Aadhaar.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Open Instant e-PAN">On the Dashboard, go to Services, then View / Download e-PAN.</Step>
              <Step n={2} title="Enter your Aadhaar number">On the Enter Aadhaar Number page, type your 12-digit Aadhaar number and click Continue.</Step>
              <Step n={3} title="Verify with OTP">Enter the OTP sent to your Aadhaar-registered mobile number.</Step>
              <Step n={4} title="View or download the e-PAN">Your PAN number appears on the resulting e-PAN, which you can also save as a PDF.</Step>
            </div>
            <p style={pStyle}>
              The full download walkthrough, including the PDF password format and what to do if the OTP does not arrive, is covered in <Link href="/blogs/pan-card-download" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PAN Card Download</Link>.
            </p>

            {/* SECTION 6 */}
            <h2 id="umang" style={hStyle}>Find Your PAN Using the UMANG App</h2>
            <p style={pStyle}>
              The <a href="https://web.umang.gov.in/landing/department/my-pan.html" target="_blank" rel="noopener noreferrer" style={linkStyle}>UMANG app's My PAN service</a>, run by the Government of India, lets users apply for a new PAN, make corrections, and download an e-PAN, which is the same Aadhaar-linked route as the e-Filing portal, just inside a mobile app instead of a browser.
            </p>
            <p style={pStyle}>
              This is worth using if you already have the UMANG app installed for other government services (ration card, EPFO, utility bills) and would rather stay in one app than open a browser separately.
            </p>

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="You'll need your PAN on hand to file. Check your FY 2025-26 tax liability now that you have it."
            />

            {/* SECTION 7 */}
            <h2 id="name-dob" style={hStyle}>Can You Find Your PAN Card Number by Name and Date of Birth Alone?</h2>
            <p style={pStyle}>
              No official, free government lookup exists that returns an unknown PAN using only a name and date of birth. This is the single most-searched version of this question, and the honest answer matters more than a vague "yes."
            </p>
            <p style={pStyle}>
              Every legitimate Income Tax Department tool that accepts name and date of birth, including Verify PAN Status, also requires the PAN number as an input. Name and date of birth function as a cross-check against a PAN you supply, never as a standalone search key against the department's full taxpayer database.
            </p>
            <p style={pStyle}>
              If you genuinely cannot recall your PAN and have no document carrying it, the realistic paths are the e-Filing profile login, Instant e-PAN via Aadhaar, or an old document, covered in the sections above and below, not a name-only search.
            </p>

            {/* SECTION 8 */}
            <h2 id="old-documents" style={hStyle}>Find Your PAN Number on Documents You Already Have</h2>
            <p style={pStyle}>
              PAN is recorded on most formal financial paperwork issued to you, so an old document is often faster than any online tool.
            </p>
            <BulletList items={[
              'Bank account opening form, passbook, or statement (PAN is a mandatory KYC field)',
              'Form 16 from an employer, or Form 16A from any entity that deducted TDS on your behalf',
              'A previous year\'s ITR acknowledgement or filed return',
              'Mutual fund or Demat account statements',
              'Loan or credit card application documents',
              'Property purchase or sale agreements above the PAN-mandatory threshold',
            ]} />

            {/* SECTION 9 */}
            <h2 id="lost-pan" style={hStyle}>Lost Your PAN Card? How to Know Your PAN Number Without It</h2>
            <p style={pStyle}>
              Losing the physical card does not mean losing the number: the PAN itself never changes, only the card is a replaceable physical object.
            </p>
            <p style={pStyle}>
              Work through the other methods in order of how likely they are to apply to you: log in to the e-Filing portal if you have an account, try Instant e-PAN via Aadhaar if your mobile is linked, check any old bank or tax document, and only then consider requesting a physical duplicate card, which is a separate process covered in <Link href="/blogs/pan-card-download" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PAN Card Download</Link>'s duplicate reprint section.
            </p>

            {/* SECTION 10 */}
            <h2 id="acknowledgement" style={hStyle}>PAN Card Acknowledgement Number vs PAN Number: What's the Difference</h2>
            <p style={pStyle}>
              An acknowledgement number is a 15-digit tracking number generated the moment you submit a new PAN application or a correction request through Protean (NSDL) or UTIITSL, and it is not your PAN.
            </p>
            <p style={pStyle}>
              It tracks that specific application through processing, so you can check whether your PAN has been allotted or your correction approved. Once the PAN itself is issued, it is a separate, permanent 10-character number that has nothing in common with the acknowledgement number that got you there. Check your registered email, SMS inbox, or the application confirmation receipt from the portal you applied through if you have misplaced the acknowledgement number.
            </p>

            {/* SECTION 11 */}
            <h2 id="company-pan" style={hStyle}>How to Know a Company's or Firm's PAN Card Number</h2>
            <p style={pStyle}>
              A company's own PAN is printed on its incorporation certificate, its original PAN allotment letter, and its GST registration certificate, and it is also embedded inside the company's GSTIN itself.
            </p>
            <p style={pStyle}>
              A GSTIN is 15 characters: a 2-digit state code, followed by the 10-character PAN of the business, followed by an entity number, the letter Z, and a check digit. That means characters 3 through 12 of any GSTIN are the PAN of the entity it belongs to. Decode any company's GSTIN on the <Link href="/blogs/gst-number-search" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>GST Number Search</Link> tool to extract its PAN directly, along with its registered state and entity type.
            </p>
            <p style={pStyle}>
              If you do not have the company's GSTIN either, the practical route is to ask the company directly for a copy of its PAN card or incorporation documents. There is no public government search that returns a company's PAN from its name alone, for the same privacy reasons individual PAN lookup by name does not exist.
            </p>

            {/* SECTION 12 */}
            <h2 id="what-else" style={hStyle}>What Else Can and Cannot Be Found Using Your PAN Card Number</h2>
            <p style={pStyle}>
              A PAN number alone does not reveal a linked mobile number, bank account, UAN, or TAN through any official public tool. The table below covers each specific reverse-lookup question people search for, and the one genuine exception.
            </p>
            <DataTable
              caption="What a PAN Number Does and Does Not Reveal"
              headers={['Search', 'What actually works']}
              rows={[
                ['Mobile number linked to a PAN', 'View your own registered mobile under Profile on the e-Filing portal after logging in. No public tool looks this up for someone else’s PAN.'],
                ['Bank account number by PAN', 'Not available through any official lookup. Banks confirm PAN against an account they already hold, never the reverse, as part of KYC.'],
                ['Demat account by PAN', 'Not searchable publicly. A Demat account is held by a specific depository participant, which confirms linkage only to its own account holder.'],
                ['UAN or PF number by PAN', 'EPFO’s own "Know Your UAN" service searches by Aadhaar-linked mobile number and OTP, not by PAN.'],
                ['TAN by PAN', 'TAN (Tax Deduction Account Number) is a separate number applied for independently by any entity that deducts TDS. It is not derived from or searchable through a PAN.'],
                ['PAN-Aadhaar link status', 'This is genuinely checkable: the e-Filing portal’s Link Aadhaar Status page confirms whether a specific PAN and Aadhaar are linked.'],
              ]}
            />
            <p style={pStyle}>
              The one exception worth knowing well is TDS: if a bank, employer, or buyer does not have your PAN on file, Section 206AA of the Income Tax Act requires tax to be deducted at the highest of the specified rate, the rate in force, or a flat 20%, as covered in the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>TDS Rate Chart</Link>. Knowing and sharing your correct PAN with whoever is deducting tax on your behalf is what keeps that deduction at the normal rate.
            </p>

            <CalcCTA
              href="/calculators/tds-calculator"
              label="TDS Calculator"
              note="See exactly how much more gets deducted at source when PAN is missing versus on file."
            />

            {/* SECTION 13 */}
            <h2 id="valid-pan" style={hStyle}>How to Check If a PAN Number Is Valid or Fake</h2>
            <p style={pStyle}>
              A genuine PAN follows one fixed structure: five letters, four digits, and one letter, in that exact order, for example a pattern like AAAAA9999A.
            </p>
            <p style={pStyle}>
              The fifth letter is not random: it identifies the type of PAN holder. P marks an individual, C a company, H a Hindu Undivided Family, F a firm or LLP, A an association of persons, T a trust, and G a government entity, among other codes. A number that breaks this pattern cannot be a real PAN regardless of what anyone claims, though format alone does not confirm the PAN is actually active. For that, run it through Verify PAN Status on the e-Filing portal.
            </p>

            {/* SECTION 14 */}
            <h2 id="next-steps" style={hStyle}>What to Do After You Find Your PAN Number</h2>
            <p style={pStyle}>
              Once you have the number, write it down somewhere secure (a password manager note, not a sticky note) so this search does not repeat itself next year.
            </p>
            <BulletList items={[
              'If your PAN is correct but the name, date of birth, or address on it is wrong, that is a correction request, not a new application; see PAN Card Update and Correction for both the Protean and UTIITSL processes.',
              'If you need the physical card or a PDF copy, not just the number, see PAN Card Download for every official download route.',
              'If you are about to file a return or estimate your tax liability now that your PAN is in hand, the Income Tax Calculator gives an FY 2025-26 estimate in a few inputs.',
            ]} />

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: How to Know Your PAN Card Number</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="pan-search-sidebar"
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
                ['PAN format', '5 letters + 4 digits + 1 letter'],
                ['Fastest method', 'Check the physical card'],
                ['Has an e-Filing account?', 'PAN is usually your login ID'],
                ['Name + DOB only lookup', 'Not available officially'],
                ['Lost card, Aadhaar-linked mobile', 'Instant e-PAN via Aadhaar'],
                ['Company PAN', 'Characters 3-12 of its GSTIN'],
                ['No PAN on file for TDS', 'Deducted at 20% (Sec 206AA)'],
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
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/pan-card-download', 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar'],
                ['/blogs/pan-card-update-correction', 'PAN Card Update: How to Correct PAN Card on Protean and UTIITSL'],
                ['/blogs/gst-number-search', 'GST Number Search: Verify Any GSTIN Online'],
                ['/blogs/tds-rate-chart', 'TDS Rate Chart: Section-Wise Rates and Thresholds'],
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
        .pan-search-sidebar::-webkit-scrollbar { width: 5px; }
        .pan-search-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pan-search-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pan-search-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

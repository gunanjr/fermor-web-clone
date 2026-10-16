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
  title: 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar',
  description: 'Download e-PAN card PDF free: instant e-PAN via Aadhaar, NSDL Protean, UTIITSL or DigiLocker. Covers PAN card copy, reprint online, PDF password and the Rs 8.26 fee rule.',
  alternates: { canonical: 'https://fermor.in/blogs/pan-card-download' },
  openGraph: {
    title: 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar - Fermor',
    description: 'Every official way to download your e-PAN, free within 30 days of allotment, plus the exact PDF password format and how to fix common download errors.',
    type: 'article',
    publishedTime: '2026-07-29T18:02:04+05:30',
    modifiedTime: '2026-10-08T18:29:35+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PAN Card', 'Income Tax', 'e-PAN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAN Card Download - Fermor',
    description: 'Free e-PAN via Income Tax portal, NSDL, UTIITSL, or DigiLocker. Password format and error fixes included.',
  },
  keywords: [
    'pan card download', 'pan card', 'e pan card', 'e pan', 'instant e pan', 'download epan card',
    'pan card download pdf', 'nsdl pan card download', 'utiitsl pan card download',
    'pan card download by aadhaar number', 'pan card download by name and date of birth',
    'pan aadhaar link', 'e pancard download', 'download pan card online', 'pan card status',
    'pan number search', 'duplicate pan card', 'know your pan', 'pan verification', 'pan card apply online',
    'e pan download', 'instant e pan download', 'pan card copy', 'pan card reprint online',
    'e filing pan card download', 'duplicate pan card download pdf', 'pan card details by pan number',
    'pan no search', 'my pan card number', 'pan card verification', 'e pan card apply',
    'business pan card', 'income tax department pan card', 'pan aadhaar link status',
  ],
};

const faqItems = [
  { q: 'How do I download my PAN card online?', a: 'Download your e-PAN for free from the Income Tax e-Filing portal if you have an Aadhaar-linked instant e-PAN, or from NSDL Protean or UTIITSL if you applied through one of those two, using your PAN or acknowledgement number plus an OTP.' },
  { q: 'How do I download my PAN card using my Aadhaar number?', a: 'On the Income Tax e-Filing portal, open Instant e-PAN, select Check Status or Download PAN, enter your 12-digit Aadhaar number, verify with the OTP sent to your Aadhaar-linked mobile, and click Download e-PAN. This route works only for PAN issued through the instant e-PAN facility.' },
  { q: 'Can I download my PAN card using only my name and date of birth?', a: 'No. Every download method needs your PAN number, acknowledgement number, or Aadhaar number, with date of birth used only as a secondary identity check, never as the sole input. If you do not know your PAN, retrieve it first through "Know Your PAN" on the Income Tax portal.' },
  { q: 'Is PAN card download free?', a: 'Yes, within 30 days of your PAN being allotted or last updated. NSDL Protean allows up to three free downloads within that window; after 30 days, both NSDL and UTIITSL charge Rs 8.26 per download. Instant e-PAN via Aadhaar on the Income Tax portal is always free.' },
  { q: 'What is the PAN card PDF password?', a: 'Your date of birth (or date of incorporation for companies) in DDMMYYYY format, with no slashes or spaces. For a date of birth of June 24, 1980, the password is 24061980.' },
  { q: 'How do I download my PAN card from NSDL (Protean)?', a: 'Go to the Protean e-PAN download page, choose PAN number or acknowledgement number, enter your details plus Aadhaar (for individuals) and date of birth, verify with OTP, pay the fee if applicable, and the e-PAN PDF is emailed to your registered address.' },
  { q: 'How do I download my PAN card from UTIITSL?', a: 'Go to the UTIITSL e-PAN download page, enter your PAN number, date of birth, and GSTIN if applicable, verify with an OTP sent to your registered mobile or email, pay the fee if applicable, and download the PDF from the link sent to your email.' },
  { q: 'How do I download my PAN card from DigiLocker?', a: 'Sign in to DigiLocker, search Issued Documents for "Income Tax Department," open PAN Verification Record, enter your PAN number and the name exactly as printed on your card, give consent, and select Get Document.' },
  { q: 'Is e-PAN legally valid?', a: 'Yes. e-PAN is digitally signed by the Income Tax Department and is accepted everywhere a physical PAN card is: ITR filing, bank account opening, Demat accounts, loan and credit card applications, and property purchases.' },
  { q: 'What is the difference between e-PAN and a physical PAN card?', a: 'e-PAN is a password-protected PDF you can store in DigiLocker and use for any KYC or financial purpose. A physical PAN card is the laminated card delivered by post, needed only when an institution specifically asks for a physical identity document.' },
  { q: 'How do I download a duplicate PAN card if mine is lost or damaged?', a: 'Apply for a PAN reprint on the NSDL Protean or UTIITSL website using your PAN number and date of birth, verify by OTP, confirm your dispatch address, and pay the reprint fee. A physical duplicate card typically arrives within 15 to 20 working days; downloading the e-PAN alone does not get you a new physical card.' },
  { q: 'Why is my OTP not arriving during PAN download?', a: 'Confirm your mobile number is linked to Aadhaar and registered correctly in PAN records, check for network or SMS-blocking issues, and retry after a few minutes. If a recently allotted PAN still will not generate an OTP, wait 24 to 48 hours for it to fully activate in the system.' },
  { q: 'Why does the portal say "PAN Not Found"?', a: 'Re-check that the PAN number and Aadhaar details entered match exactly. If your PAN was allotted very recently, the record may not have propagated yet; wait 24 to 48 hours and try again.' },
  { q: 'Can NRIs download their PAN card online?', a: 'Yes, through the same NSDL Protean or UTIITSL process as residents, entering PAN, date of birth, and Aadhaar (if linked), then verifying by OTP sent to email since NRIs often cannot receive Indian SMS. The fee rules are the same 30-day free window followed by Rs 8.26 per download.' },
  { q: 'Can I download a PAN card for a minor or a company?', a: 'Yes. For a minor, use the minor\'s own PAN and date of birth. For a company, use the incorporation date in place of date of birth, and the OTP goes to the company\'s registered email rather than a mobile number.' },
  { q: 'How long is the e-PAN download link valid?', a: 'The link sent to your email is typically valid for 24 hours or as stated in the email itself. If it expires, submit a fresh download request rather than trying to reuse an old link.' },
  { q: 'How do I download my PAN card without OTP?', a: 'You cannot. Every official route, whether the Income Tax e-Filing portal, NSDL Protean, or UTIITSL, requires an OTP sent to your registered mobile number or email before it releases the e-PAN.' },
  { q: 'Can I download my PAN card with only my mobile number?', a: 'No. Your mobile number is used only to receive the OTP; you still have to enter your PAN, acknowledgement number, or Aadhaar number on the portal to identify the record.' },
  { q: 'How do I download my PAN card without Aadhaar linking?', a: 'Use the NSDL Protean or UTIITSL portal and enter your PAN or acknowledgement number with your date of birth. The OTP goes to the mobile number or email registered in your PAN record, so keep those details current.' },
  { q: 'How do I get a PAN card copy or PDF online?', a: 'Download the e-PAN PDF from the Income Tax e-Filing portal, NSDL Protean, or UTIITSL. That digitally signed PDF is your official PAN card copy, and it can be stored in DigiLocker for later use.' },
  { q: 'How do I find my PAN number online?', a: 'Use the Know Your PAN service on the Income Tax e-Filing portal, which verifies you with your name, date of birth, and mobile number. You can also find it on Form 16, Form 26AS, your AIS, or an old ITR acknowledgement.' },
  { q: 'How do I verify a PAN card online?', a: 'Use the Verify Your PAN service on the Income Tax e-Filing portal, which confirms whether a PAN is valid and active for the name and date of birth you enter. It does not display the full PAN record.' },
  { q: 'How do I check my PAN Aadhaar link status?', a: 'Open Link Aadhaar Status on the Income Tax e-Filing portal, enter your PAN and Aadhaar number, and the portal shows whether the two are linked. An unlinked PAN can become inoperative.' },
  { q: 'How do I apply for an e-PAN online?', a: 'Use Instant e-PAN on the Income Tax e-Filing portal if you do not already hold a PAN and your Aadhaar is linked to an active mobile number. The e-PAN is issued free after Aadhaar OTP verification.' },
  { q: 'How do I download a business PAN card?', a: 'Use the NSDL Protean or UTIITSL e-PAN download page, enter the entity\'s PAN with its date of incorporation, and verify with the OTP sent to the registered email. Instant e-PAN on the Income Tax portal is for individuals only.' },
  { q: 'Can I download a duplicate PAN card as a PDF?', a: 'Yes. The e-PAN PDF is the digital duplicate of your card and can be downloaded again from the portal where your PAN was issued. A physical duplicate needs a separate reprint request with a fee.' },
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
  headline: 'PAN Card Download: How to Download PAN Card from NSDL, UTIITSL, Aadhaar and DigiLocker',
  url: 'https://fermor.in/blogs/pan-card-download',
  datePublished: '2026-07-29T18:02:04+05:30',
  dateModified: '2026-10-08T18:29:35+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pan-card-download' },
  articleSection: 'Income Tax',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'PAN Card Download', description: 'The official process for downloading a digitally signed e-PAN card from the Income Tax Department, NSDL Protean, or UTIITSL' },
  ],
  keywords: 'pan card download, e pan download, e pan card, instant e pan download, nsdl pan card download, utiitsl pan card download, pan card copy, pan card download pdf',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'PAN Card Download', item: 'https://fermor.in/blogs/pan-card-download' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Download Instant e-PAN Using Aadhaar',
  description: 'Step-by-step process to download a free e-PAN from the Income Tax e-Filing portal using Aadhaar OTP verification.',
  totalTime: 'PT5M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit the Income Tax e-Filing portal', text: 'Go to the official e-PAN page and click Instant e-PAN.' },
    { '@type': 'HowToStep', position: 2, name: 'Select Check Status or Download PAN', text: 'Click Continue under this option.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter your Aadhaar number', text: 'Enter your 12-digit Aadhaar number and click Continue.' },
    { '@type': 'HowToStep', position: 4, name: 'Verify with Aadhaar OTP', text: 'Enter the OTP sent to your Aadhaar-registered mobile number and click Continue.' },
    { '@type': 'HowToStep', position: 5, name: 'Download the e-PAN', text: 'Once the status shows your PAN is allotted, click Download e-PAN to save the PDF.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pan-card-download',
  name: 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar - Fermor',
  url: 'https://fermor.in/blogs/pan-card-download',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T18:02:04+05:30',
  dateModified: '2026-10-08T18:29:35+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'e-PAN Card',
    description: 'A digitally signed electronic version of the PAN card, issued as a password-protected PDF, legally valid for all financial and KYC purposes in India.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian PAN holders, first-time applicants, and NRIs needing to download their PAN card',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#methods-overview', name: 'Download Methods' },
    { '@type': 'WebPageElement', cssSelector: '#prerequisites', name: 'Prerequisites' },
    { '@type': 'WebPageElement', cssSelector: '#income-tax-portal', name: 'Instant e-PAN via Aadhaar' },
    { '@type': 'WebPageElement', cssSelector: '#nsdl', name: 'NSDL Protean Download' },
    { '@type': 'WebPageElement', cssSelector: '#utiitsl', name: 'UTIITSL Download' },
    { '@type': 'WebPageElement', cssSelector: '#pan-card-copy', name: 'PAN Card Copy and PDF' },
    { '@type': 'WebPageElement', cssSelector: '#name-dob', name: 'Download by Name and DOB' },
    { '@type': 'WebPageElement', cssSelector: '#find-pan', name: 'Find Your PAN Number' },
    { '@type': 'WebPageElement', cssSelector: '#digilocker', name: 'DigiLocker Download' },
    { '@type': 'WebPageElement', cssSelector: '#nri', name: 'NRI PAN Download' },
    { '@type': 'WebPageElement', cssSelector: '#duplicate', name: 'Duplicate PAN Reprint' },
    { '@type': 'WebPageElement', cssSelector: '#password', name: 'PDF Password Format' },
    { '@type': 'WebPageElement', cssSelector: '#errors', name: 'Common Errors and Fixes' },
    { '@type': 'WebPageElement', cssSelector: '#verify-link', name: 'Verify PAN and Aadhaar Link Status' },
    { '@type': 'WebPageElement', cssSelector: '#apply-epan', name: 'Apply for a New e-PAN' },
    { '@type': 'WebPageElement', cssSelector: '#validity', name: 'e-PAN Legal Validity' },
    { '@type': 'WebPageElement', cssSelector: '#customer-care', name: 'Customer Care' },
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
  { id: 'methods-overview', label: 'Download Methods' },
  { id: 'prerequisites', label: 'What You Need First' },
  { id: 'income-tax-portal', label: 'Instant e-PAN via Aadhaar' },
  { id: 'nsdl', label: 'NSDL Protean Download' },
  { id: 'utiitsl', label: 'UTIITSL Download' },
  { id: 'pan-card-copy', label: 'PAN Card Copy and PDF' },
  { id: 'name-dob', label: 'By Name and DOB?' },
  { id: 'find-pan', label: 'Find Your PAN Number' },
  { id: 'digilocker', label: 'DigiLocker Download' },
  { id: 'nri', label: 'For NRIs' },
  { id: 'duplicate', label: 'Duplicate PAN Reprint' },
  { id: 'password', label: 'PDF Password Format' },
  { id: 'errors', label: 'Common Errors' },
  { id: 'verify-link', label: 'Verify PAN and Aadhaar Link' },
  { id: 'apply-epan', label: 'Apply for a New e-PAN' },
  { id: 'validity', label: 'Is e-PAN Legally Valid?' },
  { id: 'customer-care', label: 'Customer Care' },
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Portal steps, fees, and contact details are set by the Income Tax Department, NSDL Protean, and UTIITSL, and are subject to change. Always verify current details on the official Income Tax e-Filing portal (<a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>eportal.incometax.gov.in</a>) before relying on any information here. Fermor is not affiliated with the Income Tax Department, NSDL, or UTIITSL.
      </p>
    </div>
  );
}

export default function PanCardDownloadPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>PAN Card Download</li>
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
            <time dateTime="2026-10-08T18:29:35+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Oct 8, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>14 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar and DigiLocker
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Download your PAN card free through three official routes: the Income Tax e-Filing portal for instant e-PAN via Aadhaar, NSDL Protean if you applied there, or UTIITSL if you applied there. Downloads are free within 30 days of allotment; after that, both NSDL and UTIITSL charge Rs 8.26.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: exact steps for each portal, how to get a PAN card copy or PDF, finding a lost PAN number, the DDMMYYYY PDF password, duplicate PAN reprint, Aadhaar link status, and fixes for common download errors.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="methods-overview" style={hStyle}>PAN Card Download: Every Method at a Glance</h2>
            <p style={pStyle}>
              Which portal works for you depends on how your PAN was originally issued.
            </p>
            <DataTable
              caption="PAN Card Download Methods"
              headers={['Method', 'Best For', 'Required Details']}
              rows={[
                ['Income Tax e-Filing (Instant e-PAN)', 'Aadhaar-linked applicants, free', 'Aadhaar number and OTP'],
                ['NSDL Protean', 'PAN applied via NSDL', 'PAN or acknowledgement number'],
                ['UTIITSL', 'PAN applied via UTIITSL', 'PAN and date of birth'],
                ['DigiLocker', 'Anyone with an Income Tax-issued PAN', 'PAN number and name'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="prerequisites" style={hStyle}>What You Need Before Downloading Your PAN Card</h2>
            <p style={pStyle}>
              Keep these ready; which ones you actually need depends on the method you choose.
            </p>
            <BulletList items={[
              'Acknowledgement number (if you have it)',
              'PAN number',
              'Aadhaar number',
              'A working mobile number or email for OTP',
            ]} />

            {/* SECTION 3 */}
            <h2 id="income-tax-portal" style={hStyle}>Download PAN Card Online Using Aadhaar Number</h2>
            <p style={pStyle}>
              This is the only fully free route with no 30-day condition, and it works specifically for instant e-PAN issued through Aadhaar e-KYC.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Visit the Income Tax e-Filing portal">Go to the official <a href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/checkStatusDownloadEpan" target="_blank" rel="noopener noreferrer" style={linkStyle}>e-PAN status and download page</a>.</Step>
              <Step n={2} title="Select Check Status or Download PAN">Click Continue under that option.</Step>
              <Step n={3} title="Enter your Aadhaar number">Enter your 12-digit Aadhaar number and click Continue.</Step>
              <Step n={4} title="Verify with Aadhaar OTP">Enter the OTP sent to your Aadhaar-registered mobile number and click Continue.</Step>
              <Step n={5} title="Download the e-PAN">Once your PAN status shows allotted, click Download e-PAN to save the PDF.</Step>
            </div>

            {/* SECTION 4 */}
            <h2 id="nsdl" style={hStyle}>Download PAN Card from NSDL (Protean)</h2>
            <p style={pStyle}>
              Use this if you applied for your PAN through the NSDL Protean website. You can download by PAN number or by acknowledgement number.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Visit the Protean portal">Go to the official <a href="https://tinpan.proteantech.in/" target="_blank" rel="noopener noreferrer" style={linkStyle}>NSDL Protean site</a> and select the e-PAN download option matching your allotment date.</Step>
              <Step n={2} title="Choose PAN or acknowledgement number">Enter your PAN, Aadhaar (for individuals), date of birth, and GSTN if applicable, or your acknowledgement number and date of birth.</Step>
              <Step n={3} title="Choose an OTP delivery method">Select email, mobile, or both, tick the declaration, and click Generate OTP.</Step>
              <Step n={4} title="Enter the OTP">Click Validate once entered.</Step>
              <Step n={5} title="Pay if required, then download">If your free downloads are used up, pay the Rs 8.26 fee. The e-PAN PDF is emailed to your registered address.</Step>
            </div>

            {/* SECTION 5 */}
            <h2 id="utiitsl" style={hStyle}>Download PAN Card from UTIITSL</h2>
            <p style={pStyle}>
              Use this if you applied for your PAN through UTIITSL rather than NSDL.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Visit the UTIITSL e-PAN page">Go to the official <a href="https://www.pan.utiitsl.com/PAN_ONLINE/ePANCardHome" target="_blank" rel="noopener noreferrer" style={linkStyle}>UTIITSL download page</a>.</Step>
              <Step n={2} title="Enter your details">Enter your PAN number, date of birth, GSTIN if applicable, and the captcha, then submit.</Step>
              <Step n={3} title="Choose your OTP method">Select email, SMS, or both, tick the declaration, and click Get OTP.</Step>
              <Step n={4} title="Enter the OTP">Click Validate once entered.</Step>
              <Step n={5} title="Pay if required, then download">Complete payment if applicable. The e-PAN link arrives by email; click it to download.</Step>
            </div>

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="Your PAN is required for e-filing. Check your FY 2025-26 tax liability before you file."
            />

            {/* SECTION: PAN card copy */}
            <h2 id="pan-card-copy" style={hStyle}>How to Get a PAN Card Copy or PAN Card Download PDF</h2>
            <p style={pStyle}>
              The e-PAN PDF downloaded from the Income Tax e-Filing portal, NSDL Protean, or UTIITSL is your official PAN card copy, and it carries a digital signature from the Income Tax Department.
            </p>
            <p style={pStyle}>
              A photocopy of a physical card or a phone screenshot is not the same thing. Banks, brokers, and lenders that run e-KYC check the signed PDF, so keep the original file and its password handy.
            </p>
            <BulletList items={[
              <span key="a"><strong>Fastest copy:</strong> Instant e-PAN on the Income Tax e-Filing portal, using Aadhaar OTP.</span>,
              <span key="b"><strong>Copy for a PAN issued by NSDL or UTIITSL:</strong> the e-PAN link emailed after OTP verification.</span>,
              <span key="c"><strong>Copy you can share on request:</strong> the PAN record saved in DigiLocker.</span>,
            ]} />

            {/* SECTION 6 */}
            <h2 id="name-dob" style={hStyle}>Can You Download a PAN Card by Name and Date of Birth Alone?</h2>
            <p style={pStyle}>
              No. Date of birth is only ever used as a secondary identity check alongside your PAN, acknowledgement number, or Aadhaar number, never as the sole input.
            </p>
            <p style={pStyle}>
              If you do not know your PAN number, retrieve it first using &quot;Know Your PAN&quot; on the Income Tax e-Filing portal, then use that PAN with one of the download methods above.
            </p>

            {/* SECTION: find PAN */}
            <h2 id="find-pan" style={hStyle}>How to Find Your PAN Number Online</h2>
            <p style={pStyle}>
              Use the Know Your PAN service on the <a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax e-Filing portal</a>, which asks for your name, date of birth, and mobile number and confirms them with an OTP.
            </p>
            <p style={pStyle}>
              If you cannot receive the OTP, your PAN is usually printed on documents you already hold.
            </p>
            <BulletList items={[
              'Form 16 from your employer',
              'Form 26AS or your Annual Information Statement (AIS)',
              'An earlier ITR acknowledgement or filed return',
              'Your bank, demat, or mutual fund KYC records',
            ]} />
            <p style={pStyle}>
              The <Link href="/blogs/pan-card-number-search" target="_blank" rel="noopener noreferrer" style={linkStyle}>PAN card number guide</Link> lists every official way to find it. Once you have the number, return to the methods above to download the e-PAN. If your name or date of birth on the PAN record is wrong, the <Link href="/blogs/pan-card-update-correction" target="_blank" rel="noopener noreferrer" style={linkStyle}>PAN card correction guide</Link> covers the fix.
            </p>

            {/* SECTION 7 */}
            <h2 id="digilocker" style={hStyle}>Download PAN Card from DigiLocker</h2>
            <p style={pStyle}>
              This works only for a PAN issued directly by the Income Tax Department, not one issued through NSDL or UTIITSL as a separate physical card.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Sign in to DigiLocker">Use your DigiLocker account.</Step>
              <Step n={2} title="Search Issued Documents">Look for &quot;Income Tax Department&quot; and open PAN Verification Record.</Step>
              <Step n={3} title="Enter your PAN details">Enter your PAN number and the name exactly as printed on your card.</Step>
              <Step n={4} title="Give consent">Tick the consent box and click Get Document.</Step>
              <Step n={5} title="Access anytime">Your PAN record is saved in DigiLocker and can be shared with any requester who accepts DigiLocker documents.</Step>
            </div>

            {/* SECTION 8 */}
            <h2 id="nri" style={hStyle}>PAN Card Download for NRIs</h2>
            <p style={pStyle}>
              NRIs use the same NSDL Protean or UTIITSL process as residents, with one practical difference: choosing email over SMS for OTP delivery, since Indian SMS often does not reach a foreign number reliably.
            </p>
            <BulletList items={[
              'Visit the NSDL Protean or UTIITSL website.',
              'Enter PAN number, date of birth, Aadhaar number (if linked), and captcha, then submit.',
              'Select Email ID for OTP delivery, tick the declaration, and click Generate OTP.',
              'Enter the OTP and click Validate.',
              'Pay the fee if downloading more than 30 days after issuance.',
              'The e-PAN PDF arrives at your registered email; click the link to download.',
            ]} />

            {/* SECTION 9 */}
            <h2 id="duplicate" style={hStyle}>How to Download a Duplicate PAN Card</h2>
            <p style={pStyle}>
              If your PAN card is lost or damaged, apply for a reprint on either portal. Downloading the e-PAN alone does not get you a new physical card; the reprint fee covers dispatch of an actual card.
            </p>
            <DataTable
              caption="Duplicate PAN Reprint: NSDL vs UTIITSL"
              headers={['Step', 'Detail']}
              rows={[
                ['Where to apply', 'Reprint page on NSDL Protean or UTIITSL, matching your original application portal'],
                ['Verification', 'PAN number, date of birth, Aadhaar if required, OTP to registered mobile or email'],
                ['Dispatch address', 'Confirmed against your existing PAN database record'],
                ['Fee', 'Roughly Rs 50 for an Indian address, higher for a foreign address'],
                ['Delivery time', '15 to 20 working days after successful payment'],
              ]}
            />

            {/* SECTION 10 */}
            <h2 id="password" style={hStyle}>PAN Card PDF Password Format</h2>
            <p style={pStyle}>
              Every e-PAN PDF from NSDL, UTIITSL, or the Income Tax portal is password-protected, and the password is always your date of birth or date of incorporation.
            </p>
            <Callout>
              Password format: DDMMYYYY, no slashes or spaces. A date of birth of June 24, 1980 gives the password 24061980.
            </Callout>

            {/* SECTION 11 */}
            <h2 id="errors" style={hStyle}>Common PAN Card Download Errors and How to Fix Them</h2>
            <DataTable
              caption="PAN Card Download Errors and Fixes"
              headers={['Issue', 'Fix']}
              rows={[
                ['OTP not received', 'Confirm your mobile is linked to Aadhaar and registered correctly; check network or SMS-blocking settings and retry after a few minutes'],
                ['"PAN Not Found" error', 'Re-verify PAN and Aadhaar details; if recently allotted, wait 24 to 48 hours for the record to activate'],
                ['Incorrect PDF password', 'Use your date of birth or incorporation date in DDMMYYYY format, no spaces'],
                ['Broken or expired download link', 'Submit a fresh e-PAN request and use the new link immediately'],
                ['Lost acknowledgement number', 'Check your registered email or SMS inbox, or download using your PAN or Aadhaar number instead'],
              ]}
            />

            {/* SECTION: verify + link */}
            <h2 id="verify-link" style={hStyle}>How to Verify Your PAN and Check Aadhaar Link Status</h2>
            <p style={pStyle}>
              Both checks are pre-login services on the <a href="https://eportal.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax e-Filing portal</a>: Verify Your PAN for validity, and Link Aadhaar Status for the Aadhaar link.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Verify Your PAN">Enter the PAN, name, and date of birth. The portal tells you whether the PAN is valid and active.</Step>
              <Step n={2} title="Link Aadhaar Status">Enter your PAN and 12-digit Aadhaar number to see whether the two are linked.</Step>
              <Step n={3} title="Act on the result">If the PAN is not linked, complete the link on the same portal before your next filing.</Step>
            </div>
            <p style={pStyle}>
              An unlinked PAN can be made inoperative, which blocks refunds and creates trouble at ITR time. Check the status before the <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={linkStyle}>ITR filing deadline</Link>, not on the last day.
            </p>

            {/* SECTION: apply e-PAN */}
            <h2 id="apply-epan" style={hStyle}>How to Apply for a New e-PAN Online</h2>
            <p style={pStyle}>
              Apply through Instant e-PAN on the Income Tax e-Filing portal, which issues a PAN free after Aadhaar OTP verification if you do not already hold one.
            </p>
            <p style={pStyle}>
              Your Aadhaar must be linked to an active mobile number. Companies, firms, and other non-individual applicants cannot use this route and apply through NSDL Protean or UTIITSL instead.
            </p>
            <p style={pStyle}>
              Once the e-PAN is allotted, download it using the Aadhaar steps above. Then use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Calculator</Link> to estimate what you owe before your first return.
            </p>

            {/* SECTION 12 */}
            <h2 id="validity" style={hStyle}>Is e-PAN Legally Valid?</h2>
            <p style={pStyle}>
              Yes. e-PAN is digitally signed by the Income Tax Department and is accepted across India for every purpose a physical PAN card serves.
            </p>
            <BulletList items={[
              'Filing income tax returns online',
              'Opening bank accounts and completing KYC',
              'Opening a Demat account',
              'Stock market and mutual fund investments',
              'Loan and credit card applications',
              'Passport applications and property purchases',
            ]} />

            {/* SECTION 13 */}
            <h2 id="customer-care" style={hStyle}>PAN Card Customer Care</h2>
            <p style={pStyle}>
              If a download fails and the fixes above do not resolve it, contact the portal you applied through directly.
            </p>
            <DataTable
              caption="PAN Card Customer Care Numbers and Email"
              headers={['Provider', 'Phone', 'Toll-Free', 'Email']}
              rows={[
                ['NSDL Protean', '020-27218080, 08069708080', '1800-222-990', 'tininfo@proteantech.in'],
                ['UTIITSL', '033-40802999, +91-33-40802999', '1800-22-0306', 'utiitsl.gsd@utiitsl.com'],
              ]}
            />

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: PAN Card Download</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="pan-download-sidebar"
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
                ['Instant e-PAN (Aadhaar)', 'Free'],
                ['NSDL/UTIITSL, within 30 days', 'Free'],
                ['NSDL/UTIITSL, after 30 days', 'Rs 8.26'],
                ['PDF password', 'DOB as DDMMYYYY'],
                ['Duplicate PAN reprint fee', '~Rs 50 (India)'],
                ['Reprint delivery time', '15-20 working days'],
                ['Download link validity', '24 hours (typical)'],
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
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/pan-card-number-search', 'How to Know Your PAN Card Number: 7 Official Ways to Find It'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date: Every Deadline You Need to Know'],
                ['/blogs/gst-number-search', 'GST Number Search: Verify Any GSTIN Online'],
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Is Better for You'],
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
        .pan-download-sidebar::-webkit-scrollbar { width: 5px; }
        .pan-download-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pan-download-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pan-download-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

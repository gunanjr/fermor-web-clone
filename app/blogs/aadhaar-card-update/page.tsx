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

const NOW = '2026-10-08T18:29:35+05:30';

export const metadata: Metadata = {
  title: 'Aadhaar Card Update: Online & Offline Steps, Fees, Documents',
  description: 'Update Aadhaar card online via myAadhaar or the Aadhaar App, or offline at an Aadhaar Seva Kendra. Address, mobile number, name, DOB, photo, fees and SRN tracking.',
  alternates: { canonical: 'https://fermor.in/blogs/aadhaar-card-update' },
  openGraph: {
    title: 'Aadhaar Card Update: Online & Offline Steps, Fees, Documents - Fermor',
    description: 'What you can change online, what needs a centre visit, the exact fees, documents required and how to track your update request.',
    type: 'article',
    publishedTime: NOW,
    modifiedTime: NOW,
    authors: ['Fermor Analysis'],
    tags: ['Aadhaar', 'UIDAI', 'Aadhaar Update'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aadhaar Card Update - Fermor',
    description: 'Address, mobile number, name, DOB and photo: which Aadhaar updates work online and which need a centre.',
  },
  keywords: [
    'aadhaar card update', 'aadhar card update', 'adhar card update', 'update aadhaar card online',
    'aadhar card address change', 'aadhar card address change online', 'aadhar card mobile number update',
    'aadhar card mobile number change', 'change mobile number in aadhar', 'update mobile number in aadhar',
    'aadhaar mobile number update', 'aadhaar phone number change', 'aadhar card phone number change',
    'aadhar card number change', 'aadhar card correction', 'uidai aadhar update mobile number',
    'aadhaar uidai', 'uidai gov in', 'maadhaar app', 'aadhaar app', 'myaadhaar portal',
    'eaadhaar uidai gov in download', 'e aadhar card download app', 'aadhaar kyc update online',
    'aadhar card check', 'aadhar card information', 'aadhaar update status', 'aadhaar update fee',
    'aadhaar name change', 'aadhaar date of birth update', 'aadhaar photo update',
    'aadhar card pan card link', 'aadhar card link bank account', 'udyog aadhaar',
  ],
};

const faqItems = [
  { q: 'How do I update my Aadhaar card online?', a: 'Log in to the myAadhaar portal with your Aadhaar number and the OTP sent to your registered mobile, choose Address Update or Document Update, upload the supporting document, pay the fee if applicable, and save the Service Request Number (SRN). Only address and POI/POA document updates work online.' },
  { q: 'Which Aadhaar details can I update online?', a: 'You can update your address and your Proof of Identity and Proof of Address documents on the myAadhaar portal, and your address and mobile number through the Aadhaar App. Name, date of birth, gender, email ID, photograph and biometrics need an Aadhaar Seva Kendra or Enrolment Centre.' },
  { q: 'How do I change my mobile number in Aadhaar?', a: 'Open the Aadhaar App, complete Face Authentication, select Mobile Number Update, enter the new number, verify it with an OTP, complete Face Authentication again and pay the applicable fee. If you cannot access your existing registered number, or none is registered, you must visit an Aadhaar centre.' },
  { q: 'How do I change the address in my Aadhaar card online?', a: 'Log in to the myAadhaar portal, select Address Update, enter the new address, upload a valid Proof of Address document, preview the details, pay the fee if applicable and submit. Through the Aadhaar App you can also use the Head of Family method, where the HoF approves the request from their own app.' },
  { q: 'How do I update my name in Aadhaar?', a: 'Visit an Aadhaar Seva Kendra or Enrolment Centre with a valid Proof of Identity, fill the update form and complete biometric verification. UIDAI normally permits a name update twice, and further changes need the prescribed exception process with supporting documents.' },
  { q: 'How do I update my date of birth in Aadhaar?', a: 'Visit an Aadhaar Seva Kendra or Enrolment Centre with an acceptable Proof of Date of Birth, such as a birth certificate, SSLC certificate, passport or PAN card. A date of birth update is allowed once, and any further correction goes through a UIDAI exception process.' },
  { q: 'Can I update my Aadhaar photograph online?', a: 'No. The photograph is captured at an Aadhaar Seva Kendra or Enrolment Centre as part of a biometric update. UIDAI does not prescribe a limit on the number of photograph updates.' },
  { q: 'What is the fee for an Aadhaar update?', a: 'A demographic or document update costs Rs 75 at a centre, and a biometric update costs Rs 125, subject to applicable exemptions. Document updates on the myAadhaar portal are free until 14 June 2027, after which Rs 50 applies online.' },
  { q: 'Is the Aadhaar document update free?', a: 'Yes, uploading fresh Proof of Identity and Proof of Address on the myAadhaar portal is free until 14 June 2027. The same update at a physical centre costs Rs 75.' },
  { q: 'Is a demographic update free if I also update biometrics?', a: 'Yes. A demographic update done along with a biometric update carries no separate charge, and only the biometric fee applies where it is not exempt. Mandatory biometric updates are free in the applicable age bands.' },
  { q: 'How long does an Aadhaar update take?', a: 'Most online and Aadhaar App update requests are processed within 3 to 15 working days and usually no later than 30 days. The time depends on the type of update and document verification.' },
  { q: 'How do I check my Aadhaar update status?', a: 'Use the Service Request Number (SRN) or Update Request Number (URN) from your acknowledgement on the myAadhaar portal to track the request. Save the receipt at the time of submission, because the number cannot be recovered without it.' },
  { q: 'Will my Aadhaar number change after an update?', a: 'No. Your 12-digit Aadhaar number stays the same after any demographic or biometric update.' },
  { q: 'Can I edit an Aadhaar update request after submitting it?', a: 'No. A submitted request cannot be edited. If you entered wrong information, submit a fresh request after the current one is processed or rejected.' },
  { q: 'Do I need to provide my old details when updating Aadhaar?', a: 'Yes. UIDAI needs your existing details to verify your identity and process the update accurately.' },
  { q: 'Can I enter my Aadhaar address in a regional language?', a: 'Yes. You enter the address in English online, and the system transliterates it into your selected regional language, which you can review and edit before submitting.' },
  { q: 'Do I need to carry original documents to the Aadhaar centre?', a: 'Yes. The operator scans your original documents and returns them immediately after verification.' },
  { q: 'Why was my Aadhaar update rejected?', a: 'Common causes are details that do not match the document, unclear or invalid documents, missing mandatory documents, a biometric or authentication failure, or following the wrong update process. Correct the issue and resubmit, or visit an Aadhaar Seva Kendra for help.' },
  { q: 'How do I download my e-Aadhaar after the update?', a: 'Once UIDAI approves the request, log in to the myAadhaar portal and download the updated e-Aadhaar PDF. Its password is generally the first four letters of your name in capitals followed by your birth year, so check the instructions on the download page.' },
  { q: 'Is the mAadhaar app the same as the Aadhaar App?', a: 'UIDAI\'s official app has been refreshed over time, and the current version supports Face Authentication for address and mobile number updates. Install the app only from the link given on the UIDAI website, and avoid unofficial apps that ask for your Aadhaar details.' },
  { q: 'Is Udyog Aadhaar the same as an Aadhaar card?', a: 'No. Udyog Aadhaar was a business registration for small enterprises and has been replaced by Udyam Registration on the official Udyam portal. It has nothing to do with your personal 12-digit Aadhaar and cannot be updated on myAadhaar.' },
  { q: 'Should I link my Aadhaar to PAN after updating it?', a: 'Your PAN must be linked to Aadhaar to stay operative, and a name or date of birth mismatch between the two can block the link. Update Aadhaar first if the mismatch is on that side, then check your PAN Aadhaar link status on the Income Tax e-Filing portal.' },
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
  headline: 'Aadhaar Card Update: How to Update Aadhaar Online and Offline',
  url: 'https://fermor.in/blogs/aadhaar-card-update',
  datePublished: NOW,
  dateModified: NOW,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/aadhaar-card-update' },
  articleSection: 'Utility Services',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Aadhaar Card Update', description: 'The UIDAI process for updating demographic and biometric details on an Aadhaar card, online through myAadhaar and the Aadhaar App or offline at an Aadhaar Seva Kendra' },
  ],
  keywords: 'aadhaar card update, update aadhaar card online, aadhar card address change, aadhar card mobile number update, aadhaar update fee, myaadhaar, uidai',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Aadhaar Card Update', item: 'https://fermor.in/blogs/aadhaar-card-update' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Update Aadhaar Card Online on the myAadhaar Portal',
  description: 'Step-by-step process to update your Aadhaar address or documents online through the UIDAI myAadhaar portal.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the myAadhaar portal', text: 'Visit the official UIDAI myAadhaar website.' },
    { '@type': 'HowToStep', position: 2, name: 'Log in with OTP', text: 'Click Login, enter your Aadhaar number and captcha, and choose Login with OTP.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter the OTP', text: 'Enter the OTP sent to your registered mobile number and click Login.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose the update type', text: 'Select Address Update or Document Update.' },
    { '@type': 'HowToStep', position: 5, name: 'Upload supporting documents', text: 'Enter or verify the details, upload the supporting document and click Next.' },
    { '@type': 'HowToStep', position: 6, name: 'Preview, pay and submit', text: 'Preview the updated details, pay the fee if applicable and submit.' },
    { '@type': 'HowToStep', position: 7, name: 'Save the SRN', text: 'Save the Service Request Number or download the acknowledgement to track the request.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/aadhaar-card-update',
  name: 'Aadhaar Card Update: Online & Offline Steps, Fees, Documents - Fermor',
  url: 'https://fermor.in/blogs/aadhaar-card-update',
  inLanguage: 'en-IN',
  datePublished: NOW,
  dateModified: NOW,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Aadhaar',
    description: 'A 12-digit unique identification number issued by the Unique Identification Authority of India (UIDAI) to residents of India, linked to their demographic and biometric data.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Identity and KYC Terms', url: 'https://fermor.in/blogs' },
    sameAs: 'https://en.wikipedia.org/wiki/Aadhaar',
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian residents who need to correct or update their Aadhaar details',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'Aadhaar Update Overview' },
    { '@type': 'WebPageElement', cssSelector: '#what-can-be-updated', name: 'Which Details Can Be Updated' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#myaadhaar', name: 'Update via myAadhaar Portal' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-app', name: 'Update via Aadhaar App' },
    { '@type': 'WebPageElement', cssSelector: '#mobile-number', name: 'Mobile Number Update' },
    { '@type': 'WebPageElement', cssSelector: '#address-change', name: 'Address Change' },
    { '@type': 'WebPageElement', cssSelector: '#name-dob-photo', name: 'Name, DOB, Gender and Photo' },
    { '@type': 'WebPageElement', cssSelector: '#offline', name: 'Offline Update Steps' },
    { '@type': 'WebPageElement', cssSelector: '#charges', name: 'Aadhaar Update Charges' },
    { '@type': 'WebPageElement', cssSelector: '#status', name: 'Track Status and Download e-Aadhaar' },
    { '@type': 'WebPageElement', cssSelector: '#rejection', name: 'Rejection Reasons' },
    { '@type': 'WebPageElement', cssSelector: '#links', name: 'PAN, Bank and Udyog Aadhaar' },
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
  knowsAbout: ['Aadhaar', 'UIDAI', 'KYC Documents India', 'Personal Finance India'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Update processes, fees, and free-update deadlines are set by UIDAI and are subject to change. Always confirm current details on the official UIDAI website (<a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>uidai.gov.in</a>) or the myAadhaar portal before paying or submitting a request. Fermor is not affiliated with UIDAI.
      </p>
    </div>
  );
}

const TOC_ITEMS = [
  { id: 'overview', label: 'Update Overview' },
  { id: 'what-can-be-updated', label: 'What Can Be Updated' },
  { id: 'documents', label: 'Documents Required' },
  { id: 'myaadhaar', label: 'Update via myAadhaar' },
  { id: 'aadhaar-app', label: 'Update via Aadhaar App' },
  { id: 'mobile-number', label: 'Mobile Number Update' },
  { id: 'address-change', label: 'Address Change' },
  { id: 'name-dob-photo', label: 'Name, DOB, Gender, Photo' },
  { id: 'offline', label: 'Offline Update Steps' },
  { id: 'charges', label: 'Update Charges' },
  { id: 'status', label: 'Track Status, Download' },
  { id: 'rejection', label: 'Rejection Reasons' },
  { id: 'links', label: 'PAN, Bank, Udyog Aadhaar' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

export default function AadhaarCardUpdatePage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Aadhaar Card Update</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Utility Services
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime={NOW} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 8, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 900 }}>
            Aadhaar Card Update: How to Update Aadhaar Online and Offline
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              You can update your Aadhaar card online for address and mobile number through the <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>myAadhaar portal</a> or the Aadhaar App. Name, date of birth, gender, email ID, photograph and biometrics need a visit to an Aadhaar Seva Kendra or Enrolment Centre.
            </p>
            <p style={{ ...pStyle, fontSize: 16.5 }}>
              Below: what each channel can change, documents required, step-by-step instructions, the current UIDAI fees, how to track an SRN, and why updates get rejected.
            </p>

            <TableOfContents />

            {/* SECTION 1 */}
            <h2 id="overview" style={hStyle}>Aadhaar Card Update: Overview</h2>
            <p style={pStyle}>
              Address and document updates can be done online, mobile number updates work through the Aadhaar App, and every other change is offline only.
            </p>
            <DataTable
              caption="Aadhaar Card Update at a Glance"
              headers={['Particulars', 'Details']}
              rows={[
                ['Online updates', 'Address and POI/POA document update on myAadhaar'],
                ['Aadhaar App', 'Address and mobile number update with Face Authentication'],
                ['Centre updates', 'Name, date of birth, gender, email ID, photograph and biometrics'],
                ['Online document update', 'Free until 14 June 2027'],
                ['Update tracking', 'Service Request Number (SRN) or Update Request Number (URN)'],
                ['Update fee', 'Rs 75 for demographic or document update; Rs 125 for biometric update, subject to exemptions'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="what-can-be-updated" style={hStyle}>Which Aadhaar Details Can Be Updated?</h2>
            <p style={pStyle}>
              You can update both demographic and biometric details, but only a few demographic fields are available online.
            </p>
            <DataTable
              caption="Demographic Details: Where Each Update Works"
              headers={['Update Type', 'myAadhaar Portal', 'Aadhaar App', 'Aadhaar Seva Kendra']}
              rows={[
                ['Address', 'Yes', 'Yes', 'Yes'],
                ['Name', 'No', 'No', 'Yes'],
                ['Date of birth', 'No', 'No', 'Yes'],
                ['Gender', 'No', 'No', 'Yes'],
                ['Mobile number', 'No', 'Yes', 'Yes'],
                ['Email ID', 'No', 'No', 'Yes'],
                ['POI and POA document update', 'Yes', 'No', 'Yes'],
              ]}
            />
            <DataTable
              caption="Biometric Details: Where Each Update Works"
              headers={['Update Type', 'myAadhaar Portal', 'Aadhaar App', 'Offline Only']}
              rows={[
                ['Photograph', 'No', 'No', 'Yes'],
                ['Fingerprints', 'No', 'No', 'Yes'],
                ['Iris scans', 'No', 'No', 'Yes'],
              ]}
            />

            {/* SECTION 3 */}
            <h2 id="documents" style={hStyle}>Documents Required for Aadhaar Card Update</h2>
            <p style={pStyle}>
              The documents depend on which detail you are changing, and the full list is published on the <a href="https://uidai.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>UIDAI website</a>.
            </p>
            <BulletList items={[
              <span key="a"><strong>Identity proof:</strong> Voter ID, passport, PAN card, driving licence and similar documents.</span>,
              <span key="b"><strong>Relationship proof:</strong> pension card, MNREGA job card, passport, PDS card and similar documents.</span>,
              <span key="c"><strong>Date of birth proof:</strong> birth certificate, SSLC certificate, passport, PAN card and similar documents.</span>,
              <span key="d"><strong>Address proof:</strong> ration card, bank passbook or statement, voter ID, insurance policy, and category certificates issued by the Central or State government.</span>,
            ]} />
            <p style={pStyle}>
              If your voter ID is your address proof, the <Link href="/blogs/epic-number-voter-id-card" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPIC number guide</Link> shows where to find the number on it.
            </p>

            {/* SECTION 4 */}
            <h2 id="myaadhaar" style={hStyle}>How to Update Aadhaar Card Online on the myAadhaar Portal</h2>
            <p style={pStyle}>
              Log in to the myAadhaar portal with an OTP, choose Address Update or Document Update, upload the proof and submit. Document updates are free until 14 June 2027, after which the online fee is Rs 50 and the centre fee is Rs 75.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Open the portal">Go to the official <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>myAadhaar website</a>.</Step>
              <Step n={2} title="Log in with OTP">Click Login, enter your Aadhaar number and captcha, and choose Login with OTP.</Step>
              <Step n={3} title="Enter the OTP">Enter the OTP sent to your registered mobile number and click Login.</Step>
              <Step n={4} title="Choose the update">Select Address Update to change your residential address with a valid POA, or Document Update to upload fresh POI and POA documents.</Step>
              <Step n={5} title="Upload documents">Enter or verify the details, upload the supporting documents and click Next.</Step>
              <Step n={6} title="Preview, pay and submit">Preview the updated details, pay the applicable fee if any and click Submit.</Step>
              <Step n={7} title="Save the SRN">Save the Service Request Number or download the acknowledgement receipt. You need it to track the request.</Step>
            </div>

            {/* SECTION 5 */}
            <h2 id="aadhaar-app" style={hStyle}>How to Update Aadhaar Using the Aadhaar App</h2>
            <p style={pStyle}>
              The Aadhaar App updates your address and mobile number after verifying you with Face Authentication. Log in with your 6-digit PIN and open the Services section.
            </p>
            <DataTable
              caption="Aadhaar App Address Update: Two Methods"
              headers={['Method', 'What You Do']}
              rows={[
                ['Using documents', 'Enter the new address, upload a valid POA, complete Face Authentication and pay the Rs 75 fee'],
                ['Using Head of Family (HoF)', 'Enter the HoF\'s Aadhaar number, complete verification and Face Authentication, pay Rs 75; the HoF approves the request in their own Aadhaar App'],
              ]}
            />
            <p style={pStyle}>
              Review the details, submit, and download the acknowledgement with your SRN.
            </p>

            {/* SECTION 6 */}
            <h2 id="mobile-number" style={hStyle}>How to Change Your Mobile Number in Aadhaar</h2>
            <p style={pStyle}>
              Use the Aadhaar App with Face Authentication to update your Aadhaar-registered mobile number, provided you can still receive an OTP on the number you want to change from.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Open the app">Open the Aadhaar App and complete Face Authentication.</Step>
              <Step n={2} title="Pick the service">Select Mobile Number Update under Services.</Step>
              <Step n={3} title="Enter the new number">Enter the new mobile number and complete the OTP verification.</Step>
              <Step n={4} title="Face Authentication and fee">Complete Face Authentication again and pay the applicable fee.</Step>
              <Step n={5} title="Save the SRN">Keep the SRN to track the request.</Step>
            </div>
            <p style={pStyle}>
              If you have lost access to your registered number, or no number is registered with Aadhaar, you must visit an Aadhaar Seva Kendra or Enrolment Centre.
            </p>

            {/* SECTION 7 */}
            <h2 id="address-change" style={hStyle}>How to Change the Address in Your Aadhaar Card</h2>
            <p style={pStyle}>
              Change your Aadhaar address online through myAadhaar or the Aadhaar App by submitting a valid Proof of Address, or through the Head of Family method if you live with family.
            </p>
            <p style={pStyle}>
              You enter the address in English and the system transliterates it into your selected regional language. Review and edit that version before you submit, because a submitted request cannot be edited.
            </p>

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator"
              note="Your Aadhaar and PAN must match for e-filing. Check your FY 2025-26 tax liability before you file."
            />

            {/* SECTION 8 */}
            <h2 id="name-dob-photo" style={hStyle}>How to Update Name, Date of Birth, Gender and Photo in Aadhaar</h2>
            <p style={pStyle}>
              These updates cannot be done online or through the Aadhaar App, and need an Aadhaar Seva Kendra or Enrolment Centre visit with original documents.
            </p>
            <DataTable
              caption="Offline-Only Aadhaar Updates"
              headers={['Update', 'Document Needed', 'Limit']}
              rows={[
                ['Name (including after marriage)', 'Proof of Identity', 'Normally twice; further changes need the UIDAI exception process'],
                ['Date of birth', 'Proof of Date of Birth', 'Once; further correction needs an exception process'],
                ['Gender', 'Proof of Identity', 'Once; further correction needs an exception process'],
                ['Photograph', 'None generally required', 'No limit prescribed by UIDAI'],
                ['Mobile number or email ID', 'None generally required', 'Biometric verification is carried out'],
              ]}
            />

            {/* SECTION 9 */}
            <h2 id="offline" style={hStyle}>How to Update Aadhaar Card Offline</h2>
            <p style={pStyle}>
              Visit an Aadhaar Seva Kendra or authorised Enrolment Centre, submit the update form with original documents, and collect your acknowledgement. You can book an appointment on the myAadhaar portal to cut the waiting time.
            </p>
            <div style={{ marginBottom: 20 }}>
              <Step n={1} title="Find a centre">Locate the nearest Aadhaar Enrolment Centre or Seva Kendra through the UIDAI website or myAadhaar portal, and book a slot if available.</Step>
              <Step n={2} title="Carry original documents">Take the originals for the update you want: POI for a name change, proof of date of birth for a DOB change, POA for an address change.</Step>
              <Step n={3} title="Fill the form">Fill the Aadhaar Enrolment/Update Form and hand it over with the documents.</Step>
              <Step n={4} title="Verification">The operator verifies your details, scans the originals, captures biometrics if needed and returns your documents on the spot.</Step>
              <Step n={5} title="Pay and collect the receipt">Pay the fee and collect the acknowledgement with your URN or SRN.</Step>
            </div>

            {/* SECTION 10 */}
            <h2 id="charges" style={hStyle}>Charges for Aadhaar Card Update</h2>
            <p style={pStyle}>
              A demographic or document update costs Rs 75 at a centre, a biometric update costs Rs 125, and online document updates are free until 14 June 2027.
            </p>
            <DataTable
              caption="Official Aadhaar Update Charges"
              headers={['Update Type', 'Official Charge']}
              rows={[
                ['Document update (POI and POA) on myAadhaar', 'Free until 14 June 2027'],
                ['Document update at Enrolment Centre or Seva Kendra', 'Rs 75'],
                ['Demographic update (name, DOB, gender, address, mobile, email) done separately', 'Rs 75'],
                ['Demographic update done along with a biometric update', 'Free'],
                ['Biometric update (photograph, fingerprints, iris)', 'Rs 125, subject to mandatory-update exemptions'],
                ['Mandatory biometric update', 'Free in the applicable age bands'],
              ]}
            />

            {/* SECTION 11 */}
            <h2 id="status" style={hStyle}>How to Track Your Aadhaar Update and Download the Updated e-Aadhaar</h2>
            <p style={pStyle}>
              Track the request with your SRN or URN on the myAadhaar portal. Most online and app requests finish within 3 to 15 working days, and usually no later than 30 days.
            </p>
            <p style={pStyle}>
              Once UIDAI approves the update, log in to myAadhaar and download the updated e-Aadhaar PDF. Keep the acknowledgement until the status shows completed.
            </p>

            {/* SECTION 12 */}
            <h2 id="rejection" style={hStyle}>Why an Aadhaar Update Gets Rejected</h2>
            <p style={pStyle}>
              Most rejections come from details that do not match the supporting document, or from documents UIDAI cannot read or accept.
            </p>
            <DataTable
              caption="Aadhaar Update Rejection Reasons and Fixes"
              headers={['Reason for Rejection', 'Fix']}
              rows={[
                ['Incorrect or mismatched information', 'Match every detail to the supporting document before you submit'],
                ['Invalid or unclear documents', 'Upload clear copies of documents on the UIDAI accepted list'],
                ['Missing required documents', 'Attach every mandatory document for the update you requested'],
                ['Biometric or authentication failure', 'Retry the verification or visit an Aadhaar Seva Kendra'],
                ['Wrong update process', 'Follow the UIDAI procedure for that detail and resubmit'],
              ]}
            />

            {/* SECTION 13 */}
            <h2 id="links" style={hStyle}>Aadhaar Link With PAN, Bank Account and Udyog Aadhaar</h2>
            <p style={pStyle}>
              Update Aadhaar first if your name or date of birth is wrong there, then fix the link, because a mismatch between Aadhaar and PAN can block the PAN Aadhaar link.
            </p>
            <p style={pStyle}>
              The <Link href="/blogs/pan-card-download" target="_blank" rel="noopener noreferrer" style={linkStyle}>PAN card download guide</Link> explains how to check your PAN Aadhaar link status, and the <Link href="/blogs/pan-card-update-correction" target="_blank" rel="noopener noreferrer" style={linkStyle}>PAN correction guide</Link> covers fixing the PAN side.
            </p>
            <p style={pStyle}>
              Udyog Aadhaar is a different thing. It was a business registration for small enterprises and has been replaced by Udyam Registration on the <a href="https://udyamregistration.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>official Udyam portal</a>, so it cannot be updated through myAadhaar.
            </p>

            

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Aadhaar Card Update</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="aadhaar-update-sidebar"
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
            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20, flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Quick Reference</div>
              {([
                ['Online document update', 'Free to 14 Jun 2027'],
                ['Demographic update at centre', 'Rs 75'],
                ['Biometric update', 'Rs 125'],
                ['Address, online', 'myAadhaar / App'],
                ['Mobile number', 'Aadhaar App'],
                ['Name, DOB, photo', 'Centre only'],
                ['Typical processing', '3 to 15 working days'],
              ] as [string, string][]).map(([label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Calculator CTA */}
            <nav aria-label="Related Calculators">
              <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '18px 18px', marginBottom: 20, flexShrink: 0 }}>
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px', flexShrink: 0 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/pan-card-download', 'PAN Card Download: Free e-PAN from NSDL, UTIITSL, Aadhaar'],
                ['/blogs/pan-card-update-correction', 'PAN Card Update and Correction'],
                ['/blogs/ration-card-ekyc', 'Ration Card eKYC: How to Complete It Online'],
                ['/blogs/epic-number-voter-id-card', 'EPIC Number: Find Yours in Your Voter ID Card'],
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
        .aadhaar-update-sidebar::-webkit-scrollbar { width: 5px; }
        .aadhaar-update-sidebar::-webkit-scrollbar-track { background: transparent; }
        .aadhaar-update-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .aadhaar-update-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

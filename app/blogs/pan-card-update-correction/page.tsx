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

const PROTEAN_URL = 'https://www.proteantech.in/services/pan/';
const UTIITSL_URL  = 'https://www.utiitsl.com';
const INCOME_TAX_DEPT = 'https://www.incometax.gov.in';

export const metadata: Metadata = {
  title: 'PAN Card Update: Correction on Protean & UTIITSL (2026)',
  description: 'PAN card update guide: PAN CR-01/CR-02 forms effective April 2026, name/DOB/address correction steps on Protean (NSDL) and UTIITSL, fees, and documents.',
  alternates: { canonical: 'https://fermor.in/blogs/pan-card-update-correction' },
  openGraph: {
    title: 'PAN Card Update: Correction Online on Protean & UTIITSL (2026) - Fermor',
    description: 'How to correct your PAN card online: the new PAN CR-01/CR-02 forms, step-by-step Protean and UTIITSL process, fees, and required documents.',
    type: 'article',
    url: 'https://fermor.in/blogs/pan-card-update-correction',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PAN Card Update: Correction Online on Protean & UTIITSL (2026) - Fermor',
    description: 'PAN CR-01/CR-02 forms, step-by-step correction on Protean and UTIITSL, fees, and documents needed.',
  },
};

const faqItems = [
  { q: 'What form do I use to correct my PAN card details?', a: 'Individuals use Form PAN CR-01, and non-individual entities such as companies, firms, and trusts use Form PAN CR-02, both notified by the CBDT effective April 1, 2026 under the Income Tax Rules, 2026. These replaced the earlier undifferentiated correction request used under the pre-2026 framework.' },
  { q: 'Are Forms 93, 94, 95, and 96 real PAN forms?', a: 'Yes. These are the current forms for fresh PAN allocation, effective April 1, 2026, replacing the older Forms 49A and 49AA. Form 93 covers individual Indian citizens, Form 94 covers non-individual Indian entities, Form 95 covers individual foreign applicants including NRIs and OCIs, and Form 96 covers non-individual overseas entities. They apply only to new PAN applications, not to corrections on an existing PAN.' },
  { q: 'Do Forms 93-96 apply to existing PAN holders requesting a correction?', a: 'No. Forms 93 through 96 are only for fresh PAN allocation. An existing PAN holder correcting name, date of birth, address, photo, signature, or contact details uses Form PAN CR-01 (individuals) or PAN CR-02 (non-individuals) instead.' },
  { q: 'How do I update my PAN card online?', a: 'Visit the Protean (formerly NSDL) PAN services portal or the UTIITSL portal, whichever you originally applied through, select the correction option, fill in the fields you need to update, upload supporting documents, complete Aadhaar-based e-KYC or e-Sign verification, pay the fee, and submit. You will receive an acknowledgement number to track the request.' },
  { q: 'What is the fee for PAN card correction?', a: 'For a paperless application with a physical card dispatched within India, the fee is about Rs 101. For a physical-document submission with a card dispatched within India, it is about Rs 107. Dispatch outside India costs approximately Rs 1,011 to Rs 1,017. An e-PAN sent only by email costs about Rs 66 to Rs 72, whichever route applies.' },
  { q: 'How long does it take to receive an updated PAN card?', a: 'A physical PAN card dispatched within India typically arrives within about 15 working days of application. An e-PAN through paperless Aadhaar-based verification is usually available within a few working days. Overseas dispatch can take longer depending on international courier timelines.' },
  { q: 'Can I correct my PAN card details through the Income Tax e-filing portal?', a: 'No. The Income Tax e-filing portal\'s instant e-PAN facility is meant for fresh PAN allotments to eligible Aadhaar holders, not for correcting an existing PAN. Demographic corrections, updates, and reprints must go through Protean or UTIITSL instead.' },
  { q: 'Which documents do I need to change my name on my PAN card?', a: 'For a name change after marriage, submit a registered marriage certificate or a passport copy showing the spouse\'s name; a marriage invitation card is not accepted. For a legal name change, submit the Government Gazette notification. For a minor spelling correction, standard identity proof such as Aadhaar or a passport showing the corrected name is sufficient.' },
  { q: 'How do I change my date of birth on my PAN card?', a: 'Submit a valid date of birth proof such as a birth certificate, matriculation certificate or mark sheet, passport, or an affidavit sworn before a magistrate stating the date of birth. Since the April 2026 rule change, Aadhaar alone is not always sufficient as standalone date of birth proof in every correction scenario.' },
  { q: 'How do I update my address on my PAN card?', a: 'In paperless mode, your address is fetched directly from Aadhaar during the correction process. If you are not using Aadhaar-based verification, submit an accepted address proof such as a utility bill not older than three months, a bank account statement, or a passport.' },
  { q: 'How do I update my mobile number or email in my PAN card?', a: 'Enter the new mobile number or email address in the contact details section of the correction form and verify it using an OTP sent to the new number or a confirmation link sent to the new email address.' },
  { q: 'Is Aadhaar mandatory for PAN card correction?', a: 'No, other accepted proof documents can be submitted instead. However, Aadhaar is mandatory specifically if you choose the paperless e-KYC and e-Sign route, since that route verifies your identity entirely through Aadhaar-based OTP.' },
  { q: 'Can I update PAN details without an Aadhaar OTP?', a: 'Yes, by choosing the physical document submission route instead of the paperless option, uploading scanned documents or posting physical copies along with the printed acknowledgement form.' },
  { q: 'How do I track my PAN correction application status?', a: 'On the Protean portal, select "PAN - New/Change Request" and enter your acknowledgement number. On the UTIITSL portal, enter your application or PAN number along with your date of birth. You can also track by SMS, sending NSDLPAN followed by your 15-digit acknowledgement number to 57575.' },
  { q: 'Will I get a new PAN number after correction?', a: 'No. Your PAN number stays exactly the same after a correction. You receive a new physical or digital PAN card showing the same 10-character PAN with the updated details printed on it.' },
  { q: 'Can I correct multiple PAN details in a single application?', a: 'Yes. Name, date of birth, address, photograph, signature, and contact details can all be updated together in one correction application, rather than filing separate requests for each field.' },
  { q: 'What happens if my PAN details don\'t match my Aadhaar?', a: 'A mismatch between PAN and Aadhaar demographic details can cause the PAN to become inoperative for linking purposes, and can also block e-KYC based correction attempts, since the paperless route depends on the two records matching. Correcting whichever record is wrong resolves this.' },
  { q: 'Can NRIs and foreign citizens correct their PAN details?', a: 'Yes, NRIs, foreign citizens, and foreign companies can file a PAN correction through the Protean or UTIITSL portal using the same correction request, selecting the appropriate applicant category and submitting documents such as a passport, OCI or PIO card, or taxpayer identification proof from their country of residence.' },
  { q: 'What is PAN 2.0?', a: 'PAN 2.0 is the government\'s modernised PAN ecosystem, introducing QR-code-enabled verification and a more paperless application and correction process. It does not change an existing holder\'s PAN number; current PAN numbers remain valid and usable under the upgraded system.' },
  { q: 'Is the PAN correction fee refundable if my application is rejected?', a: 'No. The PAN correction fee is non-refundable once paid, regardless of whether the application is later approved, rejected, or requires resubmission with additional documents.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on government processes like PAN correction that are prerequisites for many financial applications.' },
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

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'PAN Card Update: How to Correct PAN Card on Protean and UTIITSL',
  url: 'https://fermor.in/blogs/pan-card-update-correction',
  datePublished: '2026-07-30T00:26:17+05:30',
  dateModified: '2026-07-30T00:26:17+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete PAN card update guide covering the April 2026 CBDT overhaul: PAN CR-01 (individuals) and PAN CR-02 (non-individuals) as the current correction forms, Forms 93-96 replacing 49A/49AA for fresh PAN allocation only, step-by-step correction on both the Protean (formerly NSDL) and UTIITSL portals, offline correction, documents required by category, verified current fees, status tracking, why the Income Tax e-filing portal cannot process corrections, and PAN correction for NRIs and foreign citizens.',
  articleSection: 'Income Tax',
  keywords: 'pan card update, pan card correction, correction form for pan card, correction in pan, modification of pan card, pan card amendment form, pan update, update my pan card, upgrade pan card, pan card correction online, pan card update online, pan card name correction online, pan card name change, birth date change in pan card, change dob in pan card, change name in pan, address change in pan card online, update mobile number in pan, nsdl pan card update, pan card status',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'PAN Card Update', item: 'https://fermor.in/blogs/pan-card-update-correction' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Update or Correct PAN Card Details Online',
  description: 'Step-by-step process to correct PAN card details through the Protean (NSDL) portal.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Visit the Protean PAN portal', text: 'Go to the official Protean PAN services page and select Changes or Correction in Existing PAN Data.' },
    { '@type': 'HowToStep', position: 2, name: 'Fill in applicant details', text: 'Enter your name, date of birth, email, mobile number, and existing PAN, then submit to receive a token number by email.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose a submission mode', text: 'Select paperless e-KYC and e-Sign for the fastest Aadhaar OTP-based route, or scanned documents, or physical submission.' },
    { '@type': 'HowToStep', position: 4, name: 'Update the required fields', text: 'Tick the boxes for exactly which details need correction and enter the updated information.' },
    { '@type': 'HowToStep', position: 5, name: 'Upload documents and pay', text: 'Attach proof documents, photograph, and signature, then complete the payment for your chosen delivery option.' },
    { '@type': 'HowToStep', position: 6, name: 'Complete Aadhaar e-KYC and submit', text: 'Verify with the OTP sent to your Aadhaar-registered mobile number and download the acknowledgement.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pan-card-update-correction',
  name: 'PAN Card Update: How to Correct PAN Card on Protean and UTIITSL - Fermor',
  url: 'https://fermor.in/blogs/pan-card-update-correction',
  inLanguage: 'en-IN',
  datePublished: '2026-07-30T00:26:17+05:30',
  dateModified: '2026-07-30T00:26:17+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'PAN CR-01',
      alternateName: 'PAN Correction Form for Individuals',
      description: 'The form individuals use to request corrections or updates to existing PAN data, notified by the CBDT effective April 1, 2026 under the Income Tax Rules, 2026, replacing the earlier undifferentiated correction request form.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'PAN 2.0',
      description: 'The Government of India\'s modernised PAN ecosystem, adding QR-code-enabled verification and paperless processing, without changing existing holders\' PAN numbers.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'PAN holders in India, including NRIs and foreign nationals, needing to correct or update PAN card details',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#april-2026-overhaul', name: 'April 2026 PAN Correction Overhaul' },
    { '@type': 'WebPageElement', cssSelector: '#new-allocation-forms', name: 'New PAN Allocation Forms 93-96' },
    { '@type': 'WebPageElement', cssSelector: '#common-reasons', name: 'Common Reasons for Correction' },
    { '@type': 'WebPageElement', cssSelector: '#protean-steps', name: 'Update on Protean (NSDL)' },
    { '@type': 'WebPageElement', cssSelector: '#utiitsl-steps', name: 'Update on UTIITSL' },
    { '@type': 'WebPageElement', cssSelector: '#offline-update', name: 'Offline Update' },
    { '@type': 'WebPageElement', cssSelector: '#why-not-efiling', name: 'Why Not the e-Filing Portal' },
    { '@type': 'WebPageElement', cssSelector: '#specific-corrections', name: 'Correcting Specific Details' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#fees', name: 'Fees and Charges' },
    { '@type': 'WebPageElement', cssSelector: '#track-status', name: 'Track PAN Update Status' },
    { '@type': 'WebPageElement', cssSelector: '#nri-correction', name: 'PAN Correction for NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#pan-2-0', name: 'What Is PAN 2.0' },
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
  knowsAbout: ['PAN Card Correction', 'PAN CR-01', 'PAN 2.0', 'Protean eGov Technologies', 'UTIITSL', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };

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

function NumberedSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
          <div style={{ paddingTop: 3 }}>
            <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
            <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
          </div>
        </div>
      ))}
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and links directly to the official Protean and UTIITSL portals. Fermor is not affiliated with either entity or with the Income Tax Department, does not process PAN applications, and never asks for your PAN, Aadhaar, or OTP. Forms, fees, and rules reflect published information as of the date above under the April 2026 framework and may be refined by further CBDT circulars; always verify current details on the official portals before applying.
      </p>
    </div>
  );
}

export default function PanCardUpdatePage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>PAN Card Update</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-07-30T00:26:17+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 30, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>15 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            PAN Card Update: How to Correct PAN Card on Protean and UTIITSL
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              PAN card correction is necessary whenever your name, date of birth, address, photo, signature, or contact details printed on your PAN are incorrect, outdated, or no longer match your Aadhaar.
            </p>
            <p style={pStyle}>
              Protean eGov Technologies, formerly NSDL e-Gov, and UTIITSL are the only two government-authorised platforms for PAN correction, and since April 1, 2026, corrections use the newly notified Form PAN CR-01 for individuals and PAN CR-02 for non-individuals.
            </p>
            <p style={pStyle}>
              This guide walks through both portals step by step, the exact fees, the documents each correction type needs, and how to track your application afterward.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official links for PAN card correction"
                headers={['Service', 'Link']}
                rows={[
                  ['Protean (formerly NSDL) PAN Services', <Link key="l1" href={PROTEAN_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>proteantech.in/services/pan</Link>],
                  ['UTIITSL PAN Services', <Link key="l2" href={UTIITSL_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>utiitsl.com</Link>],
                  ['Income Tax e-Filing Portal', <Link key="l3" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Protean helpline', '020-27218080'],
                  ['UTIITSL helpline', '033-40802999'],
                  ['SMS status tracking', 'NSDLPAN [15-digit acknowledgement number] to 57575'],
                ]}
              />
            </div>

            {/* SECTION: April 2026 overhaul */}
            <h2 id="april-2026-overhaul" style={hStyle}>The April 2026 PAN Correction Overhaul: PAN CR-01 and CR-02</h2>
            <p style={pStyle}>
              The CBDT notified new, dedicated PAN correction forms effective April 1, 2026, under the Income Tax Rules, 2026: Form PAN CR-01 for individuals and Form PAN CR-02 for non-individual entities.
            </p>
            <p style={pStyle}>
              These replace the earlier single, undifferentiated correction request that applied to every applicant category alike. PAN CR-01 specifically asks for a wider set of demographic fields than before, including both father's name and mother's name, with an explicit choice of which parent's name should print on the card.
            </p>
            <p style={pStyle}>
              A second, related change from the same date: PAN identity details must now align exactly with Aadhaar records during verification, and Aadhaar alone is not always treated as sufficient standalone proof for date of birth in every correction scenario, so a supporting document may still be required alongside it.
            </p>

            {/* SECTION: New allocation forms */}
            <h2 id="new-allocation-forms" style={hStyle}>New PAN Allocation Forms: 93, 94, 95, and 96</h2>
            <p style={pStyle}>
              Separately, fresh PAN allocation moved from the older Form 49A and Form 49AA to four more specific forms, also effective April 1, 2026, aligned with the Income Tax Act, 2025 framework.
            </p>
            <InfoTable
              caption="New PAN allocation forms, replacing 49A and 49AA"
              headers={['Form', 'Applicable Category', 'Replaced Legacy Form']}
              rows={[
                ['Form 93', 'Individual applicants (Indian citizens)', 'Form 49A'],
                ['Form 94', 'Non-individual Indian entities (companies, HUFs, trusts, firms registered in India)', 'Form 49A'],
                ['Form 95', 'Individual foreign applicants (foreign citizens, NRIs with foreign citizenship, OCIs)', 'Form 49AA'],
                ['Form 96', 'Non-individual overseas entities (foreign companies, firms, and organisations operating in India)', 'Form 49AA'],
              ]}
            />
            <p style={pStyle}>
              Forms 93 through 96 apply only to a fresh PAN application. An existing PAN holder who needs a correction, update, or reprint uses Form PAN CR-01 or PAN CR-02 instead, not these allocation forms. PAN numbers already issued under the old Form 49A or 49AA remain fully valid; only the application form used for new applicants has changed.
            </p>

            <CalcCTA
              href="/blogs/pan-card-download"
              label="PAN Card Download Guide"
              note="Already corrected your details? See every official way to download your updated e-PAN for free."
            />

            {/* SECTION: Common reasons */}
            <h2 id="common-reasons" style={hStyle}>Common Reasons for PAN Card Correction</h2>
            <BulletList items={[
              'Name change after marriage.',
              'Spelling mistakes in the applicant\'s or father\'s name.',
              'Incorrect date of birth.',
              'Change in residential or communication address.',
              'Mismatch between PAN and Aadhaar details.',
              'Mobile number or email ID update.',
              'Photo or signature replacement.',
              'Legal name change through a Gazette notification.',
            ]} />

            {/* SECTION: Protean steps */}
            <h2 id="protean-steps" style={hStyle}>How to Update PAN on the Protean (NSDL) Portal</h2>
            <p style={pStyle}>
              If your PAN was originally issued through Protean (formerly NSDL e-Gov), correct it through the same portal.
            </p>
            <NumberedSteps steps={[
              { title: 'Visit the Protean PAN portal', text: 'Select Changes or Correction in Existing PAN Data under PAN Application Type.' },
              { title: 'Fill in applicant details', text: 'Enter your applicant category, name, date of birth, email, mobile number, citizenship, and existing PAN, then tick the consent box and submit.' },
              { title: 'Note your token number', text: 'A token number arrives by email; click Continue with PAN Application Form to proceed, or use the token to resume later if the session times out.' },
              { title: 'Choose a submission mode', text: 'Pick Submit digitally through e-KYC & e-Sign for the fastest paperless route, submit scanned images through e-Sign, or forward documents physically.' },
              { title: 'Select a physical card option', text: 'Choose whether you need a new physical PAN card and enter the last four digits of your Aadhaar if so.' },
              { title: 'Update the required fields', text: 'Tick each box for the specific detail being corrected and enter the new information, then proceed to contact details.' },
              { title: 'Enter updated contact details', text: 'Add the new address, mobile number, or email as applicable.' },
              { title: 'Upload documents and declaration', text: 'Attach proof documents, a photograph, and a signature, then submit.' },
              { title: 'Review and confirm Aadhaar details', text: 'Enter the first eight digits of your Aadhaar number on the preview screen and verify all details are correct.' },
              { title: 'Pay the fee', text: 'Complete payment through the available gateways and save the payment receipt.' },
              { title: 'Complete Aadhaar e-KYC', text: 'Accept the terms, click Authenticate, and enter the OTP sent to your Aadhaar-registered mobile number.' },
              { title: 'Complete e-Sign verification', text: 'Accept the terms again, enter your Aadhaar number, request a fresh OTP, and verify to finish e-Signing the application.' },
            ]} />
            <p style={pStyle}>
              Download the acknowledgement once submission completes. The file opens with your date of birth as the password, in DD/MM/YYYY format.
            </p>
            <p style={pStyle}>
              If you selected the physical document route instead, print the acknowledgement and post it with your supporting documents within 15 days to: Income Tax PAN Services Unit, Protean eGov Technologies Limited, 4th Floor, Sapphire Chambers, Baner Road, Baner, Pune - 411045.
            </p>

            {/* SECTION: UTIITSL steps */}
            <h2 id="utiitsl-steps" style={hStyle}>How to Update PAN on the UTIITSL Portal</h2>
            <p style={pStyle}>
              If your PAN was issued through UTIITSL, use its portal for the correction instead.
            </p>
            <NumberedSteps steps={[
              { title: 'Visit the UTIITSL portal', text: 'Click Apply for Changes/Correction in PAN Data.' },
              { title: 'Select submission mode and enter PAN', text: 'Choose how you\'ll submit documents, enter your PAN number, select the card mode, and submit.' },
              { title: 'Note your reference number', text: 'A reference number is generated once the request registers.' },
              { title: 'Update the required fields', text: 'Tick the fields needing correction and enter updated personal details.' },
              { title: 'Confirm address and contact details', text: 'Address updates as per Aadhaar; enter contact details and proceed.' },
              { title: 'Verify PAN details', text: 'Confirm your PAN number and proceed to the next step.' },
              { title: 'Upload documents', text: 'Attach the required supporting documents and submit.' },
              { title: 'Pay and print', text: 'Verify the form, complete payment, and print a copy for your records.' },
            ]} />
            <p style={pStyle}>
              You'll receive an SMS when your PAN card is dispatched. For physical submission, post the printed form with photo, signature, and documents to the nearest UTIITSL regional office in Mumbai, Kolkata, Chennai, or New Delhi.
            </p>

            {/* SECTION: Offline */}
            <h2 id="offline-update" style={hStyle}>How to Update PAN Card Offline</h2>
            <NumberedSteps steps={[
              { title: 'Download the correction form', text: 'Get PAN CR-01 (individuals) or PAN CR-02 (non-individuals) from the Protean PAN website.' },
              { title: 'Fill and submit at a PAN centre', text: 'Complete the form and submit it with the required documents at any nearby PAN centre.' },
              { title: 'Collect your acknowledgement', text: 'After submission and payment, you receive an acknowledgement slip at the centre for tracking.' },
            ]} />

            {/* SECTION: Why not e-filing */}
            <h2 id="why-not-efiling" style={hStyle}>Why You Cannot Update PAN Through the Income Tax e-Filing Portal</h2>
            <p style={pStyle}>
              The Income Tax e-filing portal's instant e-PAN facility is built for fresh PAN allotment to eligible Aadhaar holders who never had a PAN before, not for correcting an existing one.
            </p>
            <p style={pStyle}>
              PAN profile corrections, demographic updates, and reprint requests must be processed through Protean or UTIITSL, the two entities the government has specifically authorised for this function.
            </p>

            {/* SECTION: Specific corrections */}
            <h2 id="specific-corrections" style={hStyle}>How to Correct a Specific PAN Detail</h2>
            <InfoTable
              caption="Correction type and what it needs"
              headers={['Correction Type', 'What It Needs']}
              rows={[
                ['Name change (including after marriage)', 'Identity proof plus name change proof, such as a marriage certificate or Gazette notification'],
                ['Date of birth change', 'Valid DOB proof such as a birth certificate or matriculation certificate'],
                ['Address change', 'Fetched automatically from Aadhaar in paperless mode, or a separate address proof otherwise'],
                ['Mobile number or email update', 'New contact details entered in the form, verified by OTP'],
                ['Photo or signature change', 'A new passport-size photo or signature image uploaded during submission'],
              ]}
            />

            {/* SECTION: Documents */}
            <h2 id="documents-required" style={hStyle}>Documents Required for PAN Card Correction</h2>
            <p style={pStyle}>
              Since April 1, 2026, corrections need valid identity, address, and date of birth proof, and Aadhaar alone may not fully suffice for date of birth in every case.
            </p>
            <InfoTable
              caption="Documents for individuals and HUFs"
              headers={['Proof of Identity', 'Proof of Address', 'Proof of Date of Birth']}
              rows={[
                ['Aadhaar card', 'Aadhaar card', 'Aadhaar card'],
                ['Voter\'s ID', 'Voter\'s ID', 'Voter\'s ID'],
                ['Driving licence', 'Driving licence', 'Driving licence'],
                ['Passport (mandatory for NRIs)', 'Passport (mandatory for NRIs)', 'Passport'],
                ['Ration card', 'Utility bill not older than 3 months', 'Birth certificate'],
                ['Photo ID from Central/State Government or PSU', 'Property registration document', 'Matriculation certificate or mark sheet'],
                ['Pensioner card', 'Bank account statement not older than 3 months', 'Marriage certificate'],
              ]}
            />
            <InfoTable
              caption="Documents for foreign citizens, OCIs, and PIO cardholders"
              headers={['Proof of Identity', 'Proof of Address']}
              rows={[
                ['Copy of passport', 'Copy of passport'],
                ['OCI or PIO card issued by the Government of India', 'OCI or PIO card issued by the Government of India'],
                ['Attested national identity card, taxpayer ID, or citizenship ID', 'Registration certificate from the Foreigner\'s Registration Office showing Indian address'],
                ['-', 'Bank statement in country of residence, or NRE account statement in India'],
              ]}
            />
            <InfoTable
              caption="Additional proof for name changes"
              headers={['Applicant Type', 'Documents Required']}
              rows={[
                ['Married women', 'Registered marriage certificate, or passport copy showing spouse\'s name (marriage invitation cards not accepted)'],
                ['Individuals (legal name change)', 'Publication of the name change in the Government Gazette'],
                ['Companies', 'Revised certificate issued by the Registrar of Companies'],
                ['Minor spelling corrections', 'Standard identity proof such as Aadhaar or passport showing the corrected name'],
              ]}
            />

            {/* SECTION: Fees */}
            <h2 id="fees" style={hStyle}>PAN Card Correction Fees and Charges</h2>
            <InfoTable
              caption="Current PAN correction fees, inclusive of applicable taxes"
              headers={['Submission Mode', 'Delivery Option', 'Fee']}
              rows={[
                ['Paperless (e-KYC/e-Sign)', 'Physical PAN card dispatched within India', 'Rs 101'],
                ['Physical document submission', 'Physical PAN card dispatched within India', 'Rs 107'],
                ['Either mode', 'Physical PAN card dispatched outside India', 'Rs 1,011 to Rs 1,017'],
                ['Paperless (e-KYC/e-Sign)', 'e-PAN sent only by email', 'Rs 66'],
                ['Physical document submission', 'e-PAN sent only by email', 'Rs 72'],
                ['Reprint request only, no updates', 'Physical PAN card within India', 'Rs 50'],
              ]}
            />
            <p style={pStyle}>
              Fees are set by the authorised PAN service providers and may be revised periodically; confirm the exact amount on the payment screen before submitting. The correction fee is non-refundable once paid, whether the application is approved or rejected.
            </p>

            {/* SECTION: Track status */}
            <h2 id="track-status" style={hStyle}>How to Track PAN Update Status</h2>
            <InfoTable
              caption="Ways to track your PAN correction application"
              headers={['Method', 'How']}
              rows={[
                ['Protean portal', 'Select PAN - New/Change Request and enter your acknowledgement number'],
                ['UTIITSL portal', 'Enter your application or PAN number, date of birth, and captcha'],
                ['SMS', 'Send NSDLPAN followed by your 15-digit acknowledgement number to 57575'],
                ['Email', 'Automatic status updates arrive at your registered email at each stage'],
                ['Customer support', 'Call Protean at 020-27218080 or UTIITSL at 033-40802999'],
              ]}
            />

            {/* SECTION: NRI */}
            <h2 id="nri-correction" style={hStyle}>PAN Card Correction for NRIs and Foreign Citizens</h2>
            <p style={pStyle}>
              NRIs, foreign citizens, and foreign companies use the same Protean or UTIITSL correction request, selecting the applicant category that matches their status: Individual, NRI, Foreign Citizen, Company, HUF, or Trust.
            </p>
            <p style={pStyle}>
              Supporting documents typically include a passport, OCI card, address proof from the country of residence, or taxpayer identification documents. Aadhaar-based OTP verification or e-KYC still applies wherever the applicant holds a valid Aadhaar.
            </p>

            {/* SECTION: PAN 2.0 */}
            <h2 id="pan-2-0" style={hStyle}>What Is PAN 2.0?</h2>
            <p style={pStyle}>
              PAN 2.0 is the government's upgraded PAN ecosystem, adding QR-code-enabled verification and a more unified, paperless processing system across correction and reprint requests.
            </p>
            <p style={pStyle}>
              PAN 2.0 does not change an existing holder's PAN number. Anyone who already has a PAN keeps using the same number while gaining access to the upgraded verification features.
            </p>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: PAN Card Update</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="pan-update-sidebar"
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
            </div>

            {/* Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>PAN Update Quick Reference</div>
              {([
                ['Correction form (individual)', 'PAN CR-01'],
                ['Correction form (entity)', 'PAN CR-02'],
                ['New PAN form (Indian individual)', 'Form 93'],
                ['New PAN form (foreign individual)', 'Form 95'],
                ['Fee (paperless, domestic)', 'Rs 101'],
                ['Fee (overseas dispatch)', 'Rs 1,011-1,017'],
                ['Processing time (domestic)', '~15 working days'],
                ['Protean helpline', '020-27218080'],
                ['UTIITSL helpline', '033-40802999'],
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
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Tax Calculators</div>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/pan-card-number-search', 'How to Know Your PAN Card Number'],
                ['/blogs/pan-card-download', 'PAN Card Download: Free e-PAN'],
                ['/blogs/section-87a-rebate', 'Section 87A Income Tax Rebate'],
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
        .pan-update-sidebar::-webkit-scrollbar { width: 5px; }
        .pan-update-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pan-update-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pan-update-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

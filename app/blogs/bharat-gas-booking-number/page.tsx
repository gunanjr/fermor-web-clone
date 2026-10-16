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
  title: 'Bharat Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS',
  description: 'Bharat Gas booking number for missed call (7710955555), WhatsApp SmartLine (1800-22-4344), SMS/IVRS (7715012345), and Hello BPCL app booking. Customer care, complaint numbers, OTP delivery rules, KYC, subsidy status, and booking limits.',
  alternates: { canonical: 'https://fermor.in/blogs/bharat-gas-booking-number' },
  openGraph: {
    title: 'Bharat Gas Booking Number: Every Official Method - Fermor',
    description: 'Missed call, WhatsApp, SMS, IVRS, and app booking numbers for Bharat Gas, verified against official BPCL sources, plus customer care, OTP delivery rules, and subsidy status check.',
    type: 'article',
    publishedTime: '2026-07-28T00:18:37+05:30',
    modifiedTime: '2026-07-28T00:18:37+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Bharat Gas', 'LPG', 'BPCL', 'Utility Services'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bharat Gas Booking Number - Fermor',
    description: 'Missed call 7710955555, WhatsApp 1800-22-4344, SMS/IVRS 7715012345. Every official Bharat Gas booking method, verified.',
  },
  keywords: [
    'bharat gas booking number', 'bharat gas booking', 'bharat gas', 'bharatgasbooking',
    'bharat gas number', 'bharat gas customer care number', 'bharat gas complaint number',
    'bharat gas agency near me', 'bharat gas near me', 'bpcl gas booking', 'bpcl lpg booking',
    'e bharat gas booking online', 'bharat gas booking online booking', 'bharat gas kyc',
    'bharat gas kyc online', 'my bharat gas', 'bharatgas online booking', 'bharat gas helpline number',
    'bharat gas customer service', 'bharat gas book whatsapp number', 'bharatgas new connection',
    'new bharat gas connection', 'bharat gas booking mobile number', 'bharat gas complaint online',
    'bharat gas service customer care number', 'bharat gas online gas booking number',
  ],
};

const faqItems = [
  { q: 'What is the Bharat Gas booking number?', a: 'The Bharat Gas booking number is 7710955555 for a missed call booking, or 7715012345 / 7718012345 for SMS and IVRS booking, both from your registered mobile number. WhatsApp booking runs through BPCL SmartLine at 1800-22-4344.' },
  { q: 'How do I book Bharat Gas with a missed call?', a: 'Give a missed call to 7710955555 from your registered mobile number. The call disconnects automatically after one or two rings, and a booking confirmation SMS arrives within a few minutes with your cash memo number and estimated delivery date.' },
  { q: 'How do I book Bharat Gas on WhatsApp?', a: 'Save 1800-22-4344 (BPCL SmartLine) and send "Hi" from your registered mobile number. The chatbot menu appears; select "Book Cylinder" and follow the prompts to complete the refill request and pay online if needed.' },
  { q: 'Can I book Bharat Gas without a registered mobile number?', a: 'No, missed call, SMS, IVRS, and WhatsApp booking all require your number to already be registered with your distributor. If your number is not registered, visit your distributor in person, use the Hello BPCL app or my.ebharatgas.com to update it, or ask your distributor to register it against your LPG Consumer ID.' },
  { q: 'What is the Bharat Gas customer care number?', a: 'The Bharat Gas customer care number is 1800-22-4344 (BPCL SmartLine), a 24x7 toll-free line for booking issues, complaints, and general queries across the retail, LPG, and lubricants divisions. For a gas leak emergency specifically, call 1906 instead.' },
  { q: 'What is the LPG gas leak emergency number?', a: '1906 is the dedicated 24x7 LPG emergency helpline for gas leak complaints, common to Bharat Gas, Indane, and HP Gas. Call it immediately if you smell gas, after first turning off the cylinder regulator and putting out any flames.' },
  { q: 'How many Bharat Gas cylinders can I book in a year?', a: 'The government subsidises 12 cylinders (14.2 kg) per financial year per household. You can still book beyond 12, but those refills are billed at the full non-subsidised rate, and BPCL rules also cap bookings at 2 per month and 15 per year overall, with extra verification required for cylinders beyond the subsidised limit.' },
  { q: 'Why was my Bharat Gas delivery cancelled or delayed?', a: 'Since May 1, 2026, OTP verification is mandatory at the point of delivery: if you cannot provide the OTP sent to your registered number, the delivery agent cannot hand over the cylinder. Other common causes are an unregistered or outdated mobile number, an inactive connection, or a mismatched LPG Consumer ID.' },
  { q: 'What is the 17-digit LPG Consumer ID?', a: 'The 17-digit LPG Consumer ID is the unique identifier for your specific gas connection, printed on your LPG passbook, consumer card, and delivery invoice. It is required for booking by IVRS or the app, for linking Aadhaar under the PAHAL subsidy scheme, and for any KYC update.' },
  { q: 'How do I complete Bharat Gas KYC?', a: 'Complete e-KYC through the Hello BPCL app or at my.ebharatgas.com using your registered mobile number, LPG Consumer ID, and Aadhaar-based OTP verification. You can also complete it in person at your distributor with your Aadhaar card and LPG passbook if the online option fails.' },
  { q: 'How do I check my Bharat Gas subsidy status?', a: 'Check subsidy status on my.ebharatgas.com under "Check PAHAL Status," or through the Hello BPCL app, by entering your LPG Consumer ID or registered mobile number. Subsidy is credited directly to your Aadhaar-linked bank account only after your connection is KYC-verified.' },
  { q: 'What is the Bharat Gas complaint number?', a: 'File a Bharat Gas complaint through BPCL SmartLine at 1800-22-4344, available 24x7 by phone or WhatsApp. Complaints can also be logged online at my.ebharatgas.com under the grievance or feedback section, or in person with your local distributor for delivery-specific issues.' },
  { q: 'How long does Bharat Gas delivery take after booking?', a: 'Delivery typically arrives within 1 to 3 working days in urban areas and 3 to 5 working days in rural areas. Booking as soon as your cylinder reaches the quarter mark, rather than waiting until it runs out, avoids being caught without gas during a delivery delay.' },
  { q: 'How do I find my nearest Bharat Gas agency?', a: 'Use the distributor locator on my.ebharatgas.com, or the Hello BPCL app\'s "Find Distributor" option, entering your city or pin code. Your existing distributor\'s name and contact number are also printed on your LPG passbook and on every delivery invoice.' },
  { q: 'What should I do if I receive a damaged or leaking cylinder?', a: 'Refuse the delivery if you notice damage before accepting it. If you already have it indoors, turn off the regulator knob immediately, extinguish any flames, move the cylinder to a well-ventilated outdoor space if it is safe to do so, and call the 1906 emergency helpline or your distributor right away.' },
  { q: 'How much does a new Bharat Gas connection cost?', a: 'A new domestic Bharat Gas connection requires a security deposit for the cylinder and regulator, which varies by cylinder size and city, plus the cost of the first refill. Apply through my.ebharatgas.com, the Hello BPCL app, or your nearest distributor with proof of identity, address, and a passport-size photo.' },
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
  headline: 'Bharat Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS and Online Booking, Every Official Method',
  url: 'https://fermor.in/blogs/bharat-gas-booking-number',
  datePublished: '2026-07-28T00:18:37+05:30',
  dateModified: '2026-07-28T00:18:37+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/bharat-gas-booking-number' },
  articleSection: 'Utility Services',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Bharat Gas Booking', description: 'The official channels through which Bharat Petroleum LPG customers can book a domestic cylinder refill' },
  ],
  keywords: 'bharat gas booking number, bharat gas booking, bpcl lpg booking, bharat gas customer care number, bharat gas complaint number',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Bharat Gas Booking Number', item: 'https://fermor.in/blogs/bharat-gas-booking-number' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book a Bharat Gas Cylinder by Missed Call',
  description: 'Step-by-step process to book a Bharat Gas LPG refill using the missed call booking number.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm your number is registered', text: 'Make sure the mobile number you are calling from is the one registered with your Bharat Gas distributor.' },
    { '@type': 'HowToStep', position: 2, name: 'Give a missed call to 7710955555', text: 'Call 7710955555 from your registered number. The call disconnects on its own after one or two rings; you are not charged for it.' },
    { '@type': 'HowToStep', position: 3, name: 'Wait for the confirmation SMS', text: 'A booking confirmation SMS arrives within a few minutes, with a cash memo number and estimated delivery date.' },
    { '@type': 'HowToStep', position: 4, name: 'Be available for OTP verification', text: 'Keep your phone reachable on delivery day. The delivery agent requires an OTP sent to your registered number before handing over the cylinder.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/bharat-gas-booking-number',
  name: 'Bharat Gas Booking Number: Every Official Method - Fermor',
  url: 'https://fermor.in/blogs/bharat-gas-booking-number',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T00:18:37+05:30',
  dateModified: '2026-07-28T00:18:37+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Bharat Gas Booking Number',
    description: 'The set of official phone numbers and digital channels Bharat Petroleum (BPCL) provides for domestic LPG customers to book a cylinder refill: missed call, WhatsApp, SMS, IVRS, app, and website.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Utility Services Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian households with a domestic Bharat Gas LPG connection',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#booking-numbers', name: 'Bharat Gas Booking Numbers' },
    { '@type': 'WebPageElement', cssSelector: '#missed-call', name: 'Missed Call Booking' },
    { '@type': 'WebPageElement', cssSelector: '#whatsapp', name: 'WhatsApp Booking' },
    { '@type': 'WebPageElement', cssSelector: '#sms-ivrs', name: 'SMS and IVRS Booking' },
    { '@type': 'WebPageElement', cssSelector: '#app-website', name: 'App and Website Booking' },
    { '@type': 'WebPageElement', cssSelector: '#prerequisites', name: 'Booking Prerequisites' },
    { '@type': 'WebPageElement', cssSelector: '#no-registered-number', name: 'Booking Without Registered Number' },
    { '@type': 'WebPageElement', cssSelector: '#otp-delivery', name: 'OTP Delivery Verification' },
    { '@type': 'WebPageElement', cssSelector: '#customer-care', name: 'Customer Care and Complaints' },
    { '@type': 'WebPageElement', cssSelector: '#booking-limits', name: 'Cylinder Booking Limits' },
    { '@type': 'WebPageElement', cssSelector: '#track-status', name: 'Track Delivery Status' },
    { '@type': 'WebPageElement', cssSelector: '#kyc-subsidy', name: 'KYC and Subsidy Status' },
    { '@type': 'WebPageElement', cssSelector: '#common-issues', name: 'Common Booking Issues' },
    { '@type': 'WebPageElement', cssSelector: '#damaged-cylinder', name: 'Damaged or Leaking Cylinder' },
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
  knowsAbout: ['LPG Booking India', 'BPCL Bharat Gas', 'Household Budgeting India', 'Personal Finance India', 'Utility Bill Management'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Phone numbers and booking procedures are subject to change by Bharat Petroleum Corporation Limited. Always verify current details on the official portal (<a href="https://my.ebharatgas.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>my.ebharatgas.com</a>) or with your local distributor before relying on any number listed here. Fermor is not affiliated with BPCL or Bharat Gas.
      </p>
    </div>
  );
}

export default function BharatGasBookingPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Bharat Gas Booking Number</li>
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
            <time dateTime="2026-07-28T00:18:37+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 28, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>10 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Bharat Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS and Online Booking
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Bharat Gas offers five official booking channels: missed call (7710955555), WhatsApp via BPCL SmartLine (1800-22-4344), SMS or IVRS (7715012345 or 7718012345), and the Hello BPCL app or website. Every method needs your mobile number already registered with your distributor.
            </p>

            {/* SECTION 1 */}
            <h2 id="booking-numbers" style={hStyle}>Bharat Gas Booking Numbers: Every Official Method</h2>
            <p style={pStyle}>
              All five booking channels reach the same backend system, so pick whichever is fastest for you. The table below is the complete list, verified against BPCL&apos;s own SmartLine page and cross-checked across independent sources.
            </p>
            <DataTable
              caption="Bharat Gas Booking Numbers, All Methods"
              headers={['Method', 'Number / Platform', 'What You Need', 'Confirmation']}
              rows={[
                ['Missed call', '7710955555', 'Registered mobile number', 'SMS within minutes'],
                ['WhatsApp (BPCL SmartLine)', '1800-22-4344', 'WhatsApp on registered number', 'Chat confirmation'],
                ['SMS', '7715012345 or 7718012345', 'Registered number, send "LPG"', 'SMS reply'],
                ['IVRS (voice call)', '7715012345 or 7718012345', 'Registered number, LPG ID', 'Voice + SMS'],
                ['App / website', 'Hello BPCL app, my.ebharatgas.com', 'Login with number or LPG ID', 'In-app confirmation'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="missed-call" style={hStyle}>Bharat Gas Booking by Missed Call: 7710955555</h2>
            <p style={pStyle}>
              Give a missed call to 7710955555 from your registered mobile number. The call disconnects on its own after one or two rings, so you are not charged, and a confirmation SMS with your cash memo number arrives within minutes.
            </p>
            <p style={pStyle}>
              This is the fastest method when your number is already registered and nothing about your order needs to change. It books your standard cylinder at your registered address; it cannot handle address changes or special requests.
            </p>

            {/* SECTION 3 */}
            <h2 id="whatsapp" style={hStyle}>Bharat Gas Booking on WhatsApp: BPCL SmartLine</h2>
            <p style={pStyle}>
              Save 1800-22-4344 and send &quot;Hi&quot; from your registered mobile number on WhatsApp. The BPCL SmartLine chatbot opens a menu; select &quot;Book Cylinder&quot; and follow the prompts through to payment.
            </p>
            <p style={pStyle}>
              SmartLine handles more than booking: the same number takes complaints, tracks delivery status, and answers general queries, all inside the same chat thread, which makes it the most useful single number to save.
            </p>

            {/* SECTION 4 */}
            <h2 id="sms-ivrs" style={hStyle}>Bharat Gas Booking by SMS and IVRS</h2>
            <p style={pStyle}>
              For SMS booking, text &quot;LPG&quot; to 7715012345 or 7718012345 from your registered number. For IVRS, call the same number and follow the voice menu, pressing the option for &quot;Book Cylinder&quot; when prompted and confirming your LPG Consumer ID.
            </p>
            <p style={pStyle}>
              Both numbers work identically across India: there is no separate state-wise IVRS number, despite that being a common search. Whichever of the two you dial or text, the booking lands in the same national system.
            </p>

            {/* SECTION 5 */}
            <h2 id="app-website" style={hStyle}>Bharat Gas Booking Online: Hello BPCL App and Website</h2>
            <p style={pStyle}>
              Download Hello BPCL from the Play Store or App Store, or go to <a href="https://my.ebharatgas.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>my.ebharatgas.com</a> directly. Log in with your registered mobile number or LPG Consumer ID, select &quot;Refill Booking,&quot; confirm your details, and pay online.
            </p>
            <p style={pStyle}>
              The app and website are the only channels that let you check subsidy status, complete KYC, update your registered number, and download past invoices in the same place, not just book a refill.
            </p>

            {/* SECTION 6 */}
            <h2 id="prerequisites" style={hStyle}>What You Need Before Booking a Bharat Gas Cylinder</h2>
            <p style={pStyle}>
              Every booking method checks the same three things before it accepts your request.
            </p>
            <BulletList items={[
              'Your mobile number must already be registered with your specific Bharat Gas distributor, not just with BPCL generally.',
              'Your 17-digit LPG Consumer ID, printed on your passbook, consumer card, or any past delivery invoice.',
              'Aadhaar linked to your LPG connection, required to receive PAHAL subsidy payments directly into your bank account.',
            ]} />

            {/* SECTION 7 */}
            <h2 id="no-registered-number" style={hStyle}>How to Book Bharat Gas Without a Registered Mobile Number</h2>
            <p style={pStyle}>
              None of the phone-based methods work if your number is not already registered, since the system identifies you by caller ID or sender number. You have three ways to fix that first.
            </p>
            <BulletList items={[
              'Visit your distributor in person with your LPG passbook and ask them to update your registered number.',
              'Use the Hello BPCL app or my.ebharatgas.com to update your number online, verified by Aadhaar-linked OTP.',
              'Submit a written request to your local distributor if you cannot access the app or website at all.',
            ]} />

            {/* SECTION 8 */}
            <h2 id="otp-delivery" style={hStyle}>OTP Delivery Verification: Why Your Cylinder Might Not Get Delivered</h2>
            <p style={pStyle}>
              Since May 1, 2026, an OTP-based Delivery Authentication Code is mandatory across Bharat Gas, Indane, and HP Gas. The delivery agent sends an OTP to your registered number on delivery day, and cannot hand over the cylinder without it.
            </p>
            <p style={pStyle}>
              If your phone is unreachable, switched off, or the number on file is outdated, the delivery is cancelled on the spot and has to be rebooked. Keep your registered number reachable on your expected delivery day, and update it in advance if it has changed.
            </p>
            <Callout>
              Standard refill gaps are 25 days in urban areas and 45 days in rural areas (some regions use a 35-day gap). Booking as soon as your cylinder hits the quarter mark, rather than waiting until it runs out, gives you enough buffer against a delayed or OTP-cancelled delivery.
            </Callout>

            {/* SECTION 9 */}
            <h2 id="customer-care" style={hStyle}>Bharat Gas Customer Care and Complaint Numbers</h2>
            <p style={pStyle}>
              BPCL SmartLine at 1800-22-4344 is the single toll-free number for customer care, complaints, and general queries, reachable 24x7 by phone or WhatsApp. It covers the retail, LPG, lubricants, and industrial divisions in one line.
            </p>
            <DataTable
              caption="Bharat Gas Customer Care and Emergency Numbers"
              headers={['Purpose', 'Number', 'Availability']}
              rows={[
                ['General customer care, booking, complaints', '1800-22-4344 (BPCL SmartLine)', '24x7, phone or WhatsApp'],
                ['LPG gas leak emergency', '1906', '24x7, all LPG providers'],
              ]}
            />
            <p style={pStyle}>
              State-wise distributor numbers exist separately for hyperlocal issues like a specific delivery delay; find yours printed on your LPG passbook or through the distributor locator on <a href="https://my.ebharatgas.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>my.ebharatgas.com</a>.
            </p>

            {/* SECTION 10 */}
            <h2 id="booking-limits" style={hStyle}>How Many Cylinders You Can Book: Subsidy Limit and Refill Gap</h2>
            <p style={pStyle}>
              The government subsidises 12 cylinders (14.2 kg) per financial year per household through the PAHAL scheme. You can still book more, but every cylinder beyond the 12th is billed at the full market rate.
            </p>
            <p style={pStyle}>
              BPCL also caps total bookings at 2 per month and 15 per year across both subsidised and non-subsidised refills, and asks for additional verification through the app for any cylinder beyond the subsidised limit, for instance if there is a wedding or family event at home.
            </p>

            <CalcCTA
              href="/calculators/monthly-budget-calculator"
              label="Monthly Budget Calculator"
              note="See exactly where your LPG spend fits against rent, groceries, and everything else in your monthly budget."
            />

            {/* SECTION 11 */}
            <h2 id="track-status" style={hStyle}>How to Track Your Bharat Gas Booking and Delivery Status</h2>
            <p style={pStyle}>
              Log in to <a href="https://my.ebharatgas.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>my.ebharatgas.com</a> or the Hello BPCL app and open the delivery status section to see your booking in real time. The same status is available by calling 1800-22-4344 or through the IVRS menu.
            </p>
            <p style={pStyle}>
              Expect delivery within 1 to 3 working days in urban areas and 3 to 5 working days in rural areas from the date of booking, not from the date your cylinder actually ran out.
            </p>

            {/* SECTION 12 */}
            <h2 id="kyc-subsidy" style={hStyle}>Bharat Gas KYC and Subsidy Status: PAHAL Scheme</h2>
            <p style={pStyle}>
              Complete e-KYC through the Hello BPCL app or <a href="https://my.ebharatgas.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>my.ebharatgas.com</a> using your registered number, LPG Consumer ID, and Aadhaar-based OTP. Without a completed KYC, subsidy payments under PAHAL (Direct Benefit Transfer for LPG) stop reaching your bank account.
            </p>
            <p style={pStyle}>
              Check your current subsidy status the same way, under &quot;Check PAHAL Status&quot; on the website or app. Subsidy amounts are credited directly to your Aadhaar-linked bank account after each subsidised refill, not deducted upfront from the cylinder price.
            </p>

            {/* SECTION 13 */}
            <h2 id="common-issues" style={hStyle}>Common Bharat Gas Booking Problems and How to Fix Them</h2>
            <p style={pStyle}>
              Most failed bookings trace back to one of five causes, each fixable without a distributor visit in most cases.
            </p>
            <BulletList items={[
              'Mobile number not registered: update it through the app or website before trying to book again.',
              'Inactive LPG connection: check status on my.ebharatgas.com, or call 1800-22-4344 to confirm.',
              'Wrong or outdated LPG Consumer ID entered during IVRS or app booking: cross-check the 17-digit ID on your passbook.',
              'Distributor-side delay: escalate directly to BPCL SmartLine at 1800-22-4344 if your distributor has not responded within the normal delivery window.',
              'Server downtime during peak hours: wait 15 to 20 minutes and retry, or switch to a different booking method (missed call instead of the app, for instance).',
            ]} />

            {/* SECTION 14 */}
            <h2 id="damaged-cylinder" style={hStyle}>What to Do If You Receive a Damaged or Leaking Cylinder</h2>
            <p style={pStyle}>
              Refuse the delivery on the spot if you notice damage before signing for it. Send it back with the delivery agent rather than accepting it and raising the issue later.
            </p>
            <p style={pStyle}>
              If you have already taken the cylinder indoors and then notice a leak, turn off the pressure regulator knob immediately, extinguish any flames in the kitchen, and move the cylinder outdoors only if it is safe to do so.
            </p>
            <p style={pStyle}>
              Call the 1906 emergency helpline or your distributor right away to arrange a replacement.
            </p>

            {/* FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Bharat Gas Booking Number</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="bharat-gas-sidebar"
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
                ['Missed call', '7710955555'],
                ['WhatsApp / SmartLine', '1800-22-4344'],
                ['SMS / IVRS', '7715012345'],
                ['Gas leak emergency', '1906'],
                ['Subsidised cylinders/year', '12'],
                ['Overall cap/year', '15'],
                ['Delivery, urban', '1 to 3 days'],
                ['Delivery, rural', '3 to 5 days'],
                ['Refill gap, urban', '25 days'],
                ['Refill gap, rural', '45 days'],
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
                <Link href="/calculators/monthly-budget-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Monthly Budget Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
                <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Emergency Fund Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/indane-gas-booking-number', 'Indane Gas Booking Number: Every Official Method'],
                ['/blogs/gst-number-search', 'GST Number Search: Verify Any GSTIN Online'],
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
        .bharat-gas-sidebar::-webkit-scrollbar { width: 5px; }
        .bharat-gas-sidebar::-webkit-scrollbar-track { background: transparent; }
        .bharat-gas-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .bharat-gas-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

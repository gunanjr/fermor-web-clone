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
  title: 'Indane Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS',
  description: 'Indane Gas booking number for missed call (8454955555), WhatsApp (7588888824), SMS/IVRS (7718955555), toll-free customer care, OTP delivery rules, the correct 17-digit LPG ID, eKYC deadline, and refill limits, verified against official IndianOil sources.',
  alternates: { canonical: 'https://fermor.in/blogs/indane-gas-booking-number' },
  openGraph: {
    title: 'Indane Gas Booking Number: Every Official Method - Fermor',
    description: 'Missed call, WhatsApp, SMS, IVRS, and app booking numbers for Indane Gas, verified against official IndianOil sources, plus customer care, OTP delivery rules, and the PMUY refill-gap rumor the government officially refuted.',
    type: 'article',
    publishedTime: '2026-08-25T13:07:34+05:30',
    modifiedTime: '2026-08-25T13:07:34+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Indane Gas', 'LPG', 'IndianOil', 'Utility Services'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indane Gas Booking Number - Fermor',
    description: 'Missed call 8454955555, WhatsApp 7588888824, SMS/IVRS 7718955555. Every official Indane Gas booking method, verified.',
  },
  keywords: [
    'indane gas booking number', 'indane gas booking', 'indane gas', 'indane booking number',
    'indane gas number', 'indane gas customer care number', 'indane gas complaint number',
    'indane gas agency near me', 'indane gas near me', 'iocl lpg booking', 'indane lpg booking',
    'indane gas booking online', 'indane gas kyc', 'indane gas kyc online', 'my indane',
    'indane online booking', 'indane gas helpline number', 'indane gas customer service',
    'indane gas book whatsapp number', 'indane new connection', 'new indane gas connection',
    'indane gas booking mobile number', 'indane gas complaint online',
    'indane gas service customer care number', 'indane gas online gas booking number',
    'indane gas missed call number', 'indane gas toll free number', 'indane 17 digit lpg id',
    'mylpg.co.in', 'indianoil one app',
  ],
};

const faqItems = [
  { q: 'What is the Indane gas booking number?', a: 'The Indane gas booking number is 8454955555 for a missed call booking, or 7718955555 for both SMS and IVRS booking, both from your registered mobile number. WhatsApp booking runs through 7588888824.' },
  { q: 'How do I book Indane gas with a missed call?', a: 'Give a missed call to 8454955555 from your registered mobile number. The call disconnects automatically after one or two rings, and a booking confirmation SMS arrives within a few minutes.' },
  { q: 'How do I book Indane gas on WhatsApp?', a: 'Save 7588888824 to your contacts and send "Hi" or "REFILL" from your registered mobile number. The chatbot menu appears; select the LPG Refill option and follow the prompts to complete the booking.' },
  { q: 'Can I book Indane gas without a registered mobile number?', a: 'No, missed call, SMS, IVRS, and WhatsApp booking all require your number to already be registered with your distributor. If it is not registered, visit your distributor in person, use the IndianOil One app or mylpg.co.in to update it, or ask your distributor to link it to your LPG ID.' },
  { q: 'What is the Indane gas customer care number?', a: 'The Indane gas customer care number is 1800-2333-555, a toll-free line open from 8 AM to 8 PM daily; calls between 8 PM and 8 AM route through an automated IVRS system based on urgency. For a gas leak emergency specifically, call 1906 instead.' },
  { q: 'What is the LPG gas leak emergency number?', a: '1906 is the dedicated 24x7 LPG emergency helpline for gas leak complaints, common to Indane, Bharat Gas, and HP Gas. Call it immediately if you smell gas, after first turning off the cylinder regulator and putting out any flames.' },
  { q: 'How many Indane gas cylinders can I book in a year?', a: 'The government subsidises 12 cylinders (14.2 kg) per financial year per household under the PAHAL direct benefit transfer scheme. You can still book beyond 12, but those refills are billed at the full market rate, and the subsidised quota does not carry forward to the next financial year.' },
  { q: 'Why was my Indane gas delivery cancelled or delayed?', a: 'Since May 1, 2026, a Delivery Authentication Code (an OTP sent to your registered number) is mandatory at the point of delivery: if you cannot provide it, the delivery agent cannot hand over the cylinder. Other common causes are an unregistered or outdated mobile number, an inactive connection, or a mismatched LPG ID.' },
  { q: 'Is the Indane LPG Consumer ID 16 digits or 17 digits?', a: 'It is 17 digits, not 16. The 17-digit LPG ID (also called the Consumer ID) is printed on your LPG passbook, subscription voucher, and delivery invoice, and is required for IVRS booking, KYC, and linking Aadhaar for subsidy. A shorter "16-digit" figure sometimes circulates online but does not match IndianOil\'s actual ID format.' },
  { q: 'Is the 45-day rural LPG refill rule different for PMUY connections?', a: 'No. In March 2026, the Ministry of Petroleum and Natural Gas officially refuted a circulating claim that refill timelines differed by connection type, 45 days for PMUY, 25 days for non-PMUY single-bottle, and 35 days for non-PMUY double-bottle. The government confirmed the actual rule is uniform: 25 days in urban areas and 45 days in rural areas, irrespective of connection type.' },
  { q: 'Is there a deadline to complete Indane gas eKYC?', a: 'No fixed deadline has been set by IndianOil or the central government. Union Petroleum Minister Hardeep Singh Puri stated directly that there is no deadline for eKYC compliance and that genuine consumers face no inconvenience, though completing it is still required to keep receiving PAHAL subsidy payments and to avoid being flagged during anti-fraud checks on bogus connections.' },
  { q: 'How do I complete Indane gas KYC?', a: 'Complete e-KYC through the IndianOil One app or mylpg.co.in using your registered mobile number, 17-digit LPG ID, and Aadhaar-based OTP verification. You can also complete it in person at your distributor with your Aadhaar card and LPG passbook if the online option does not work.' },
  { q: 'How do I check my Indane gas subsidy status?', a: 'Check subsidy status on mylpg.co.in or the IndianOil One app by entering your LPG ID or registered mobile number. Subsidy under PAHAL is credited directly to your Aadhaar-linked bank account after each subsidised refill, not deducted upfront from the cylinder price.' },
  { q: 'What is the Indane gas complaint number?', a: 'File an Indane gas complaint through the toll-free number 1800-2333-555, or the dedicated feedback and complaint short code 155233. Complaints can also be emailed to iocl.cocc@indianoil.in, or logged in person with your local distributor for delivery-specific issues.' },
  { q: 'How long does Indane gas delivery take after booking?', a: 'Delivery typically arrives within a few working days in urban areas and can take longer in rural areas depending on distributor load. Booking as soon as your cylinder reaches the quarter mark, rather than waiting until it runs out, gives a buffer against delivery delays or an OTP-verification failure at the door.' },
  { q: 'How do I find my nearest Indane gas distributor?', a: 'Use the distributor locator on the official IndianOil website (iocl.com), entering your state, city, and locality, then narrowing results with a search radius. Your existing distributor\'s name and contact number are also printed on your LPG passbook and every delivery invoice.' },
  { q: 'What should I do if I receive a damaged or leaking cylinder?', a: 'Refuse the delivery if you notice damage before accepting it. If you have already taken it indoors, turn off the regulator knob immediately, extinguish any flames, move the cylinder to a well-ventilated outdoor space only if it is safe to do so, and call the 1906 emergency helpline or your distributor right away.' },
  { q: 'How much does a new Indane gas connection cost?', a: 'A new domestic Indane connection requires a security deposit for the cylinder and regulator, which varies by cylinder size and city, plus the cost of the first refill. Apply through mylpg.co.in, the IndianOil One app, or your nearest distributor with proof of identity, address, and a passport-size photo.' },
  { q: 'What is the difference between SMS and IVRS booking for Indane gas?', a: 'Both use the same number, 7718955555. SMS booking means texting the keyword "REFILL" to that number; IVRS booking means calling the same number and following an automated voice menu. Indane runs both through one shared number, unlike some other LPG providers that use separate numbers for each.' },
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
  headline: 'Indane Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS and Online Booking, Every Official Method',
  url: 'https://fermor.in/blogs/indane-gas-booking-number',
  datePublished: '2026-08-25T13:07:34+05:30',
  dateModified: '2026-08-25T13:07:34+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/indane-gas-booking-number' },
  articleSection: 'Utility Services',
  isAccessibleForFree: true,
  about: [
    { '@type': 'Thing', name: 'Indane Gas Booking', description: 'The official channels through which Indian Oil Corporation LPG customers can book a domestic cylinder refill' },
  ],
  keywords: 'indane gas booking number, indane gas booking, iocl lpg booking, indane gas customer care number, indane gas complaint number',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Indane Gas Booking Number', item: 'https://fermor.in/blogs/indane-gas-booking-number' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Book an Indane Gas Cylinder by Missed Call',
  description: 'Step-by-step process to book an Indane Gas LPG refill using the missed call booking number.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm your number is registered', text: 'Make sure the mobile number you are calling from is the one registered with your Indane distributor.' },
    { '@type': 'HowToStep', position: 2, name: 'Give a missed call to 8454955555', text: 'Call 8454955555 from your registered number. The call disconnects on its own after one or two rings; you are not charged for it.' },
    { '@type': 'HowToStep', position: 3, name: 'Wait for the confirmation SMS', text: 'A booking confirmation SMS arrives within a few minutes, confirming your refill request.' },
    { '@type': 'HowToStep', position: 4, name: 'Be available for OTP verification', text: 'Keep your phone reachable on delivery day. The delivery agent requires an OTP sent to your registered number before handing over the cylinder.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/indane-gas-booking-number',
  name: 'Indane Gas Booking Number: Every Official Method - Fermor',
  url: 'https://fermor.in/blogs/indane-gas-booking-number',
  inLanguage: 'en-IN',
  datePublished: '2026-08-25T13:07:34+05:30',
  dateModified: '2026-08-25T13:07:34+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Indane Gas Booking Number',
    description: 'The set of official phone numbers and digital channels Indian Oil Corporation (IOCL) provides for domestic Indane LPG customers to book a cylinder refill: missed call, WhatsApp, SMS, IVRS, app, and website.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Utility Services Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian households with a domestic Indane Gas LPG connection',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#booking-numbers', name: 'Indane Gas Booking Numbers' },
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
  knowsAbout: ['LPG Booking India', 'IOCL Indane Gas', 'Household Budgeting India', 'Personal Finance India', 'Utility Bill Management'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> Phone numbers and booking procedures are subject to change by Indian Oil Corporation Limited. Always verify current details on the official portal (<a href="https://mylpg.co.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>mylpg.co.in</a> or <a href="https://iocl.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>iocl.com</a>) or with your local distributor before relying on any number listed here. Fermor is not affiliated with IOCL or Indane Gas.
      </p>
    </div>
  );
}

export default function IndaneGasBookingPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Indane Gas Booking Number</li>
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
            <time dateTime="2026-08-25T13:07:34+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Aug 25, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Indane Gas Booking Number: Missed Call, WhatsApp, SMS, IVRS and Online Booking
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Indane Gas offers four official booking channels: missed call (8454955555), WhatsApp (7588888824), and a single shared number for both SMS and IVRS (7718955555), plus the IndianOil One app and mylpg.co.in. Every method needs your mobile number already registered with your distributor.
            </p>

            {/* SECTION 1 */}
            <h2 id="booking-numbers" style={hStyle}>Indane Gas Booking Numbers: Every Official Method</h2>
            <p style={pStyle}>
              All four booking channels reach the same backend system, so pick whichever is fastest for you. The table below is the complete list, verified against IndianOil&apos;s own portal and cross-checked across independent sources.
            </p>
            <DataTable
              caption="Indane Gas Booking Numbers, All Methods"
              headers={['Method', 'Number / Platform', 'What You Need', 'Confirmation']}
              rows={[
                ['Missed call', '8454955555', 'Registered mobile number', 'SMS within minutes'],
                ['WhatsApp', '7588888824', 'WhatsApp on registered number, send "Hi"', 'Chat confirmation'],
                ['SMS', '7718955555', 'Registered number, send "REFILL"', 'SMS reply'],
                ['IVRS (voice call)', '7718955555', 'Registered number, LPG ID', 'Voice + SMS'],
                ['App / website', 'IndianOil One app, mylpg.co.in', 'Login with number or LPG ID', 'In-app confirmation'],
              ]}
            />

            {/* SECTION 2 */}
            <h2 id="missed-call" style={hStyle}>Indane Gas Booking by Missed Call: 8454955555</h2>
            <p style={pStyle}>
              Give a missed call to 8454955555 from your registered mobile number. The call disconnects on its own after one or two rings, so you are not charged, and a confirmation SMS arrives within minutes.
            </p>
            <p style={pStyle}>
              This is the fastest method when your number is already registered and nothing about your order needs to change. It books your standard cylinder at your registered address; it cannot handle address changes or special requests.
            </p>

            {/* SECTION 3 */}
            <h2 id="whatsapp" style={hStyle}>Indane Gas Booking on WhatsApp: 7588888824</h2>
            <p style={pStyle}>
              Save 7588888824 to your contacts and send &quot;Hi&quot; or &quot;REFILL&quot; from your registered mobile number on WhatsApp. The chatbot menu opens; select the LPG Refill option and follow the prompts through to confirmation.
            </p>
            <p style={pStyle}>
              WhatsApp is the easiest method to use without remembering an SMS keyword or navigating a voice menu, since the chatbot walks you through each step visually.
            </p>

            {/* SECTION 4 */}
            <h2 id="sms-ivrs" style={hStyle}>Indane Gas Booking by SMS and IVRS: One Number for Both</h2>
            <p style={pStyle}>
              Indane runs SMS and IVRS booking through the same number, 7718955555, which is simpler than providers that split the two across separate numbers. For SMS, text &quot;REFILL&quot; from your registered number; if it is your first time using SMS booking, send 7718955555 followed by a space and your 17-digit LPG ID instead.
            </p>
            <p style={pStyle}>
              For IVRS, call 7718955555 from your registered number and follow the automated voice prompts to confirm your refill request.
            </p>

            {/* SECTION 5 */}
            <h2 id="app-website" style={hStyle}>Indane Gas Booking Online: IndianOil One App and mylpg.co.in</h2>
            <p style={pStyle}>
              Download the IndianOil One app from the Play Store or App Store, or go to <a href="https://mylpg.co.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>mylpg.co.in</a> directly. Log in with your registered mobile number or LPG ID, select refill booking, confirm your details, and pay online.
            </p>
            <p style={pStyle}>
              The app and website are the only channels that let you check subsidy status, complete KYC, update your registered number, and find your nearest distributor in the same place, not just book a refill.
            </p>

            {/* SECTION 6 */}
            <h2 id="prerequisites" style={hStyle}>What You Need Before Booking an Indane Gas Cylinder</h2>
            <p style={pStyle}>
              Every booking method checks the same three things before it accepts your request.
            </p>
            <BulletList items={[
              'Your mobile number must already be registered with your specific Indane distributor, not just with IndianOil generally.',
              'Your 17-digit LPG ID (also called the Consumer ID), printed on your passbook, subscription voucher, or any past delivery invoice.',
              'Aadhaar linked to your LPG connection, required to receive PAHAL subsidy payments directly into your bank account.',
            ]} />

            {/* SECTION 7 */}
            <h2 id="no-registered-number" style={hStyle}>How to Book Indane Gas Without a Registered Mobile Number</h2>
            <p style={pStyle}>
              None of the phone-based methods work if your number is not already registered, since the system identifies you by caller ID or sender number. You have three ways to fix that first.
            </p>
            <BulletList items={[
              'Visit your distributor in person with your LPG passbook and ask them to update your registered number.',
              'Use the IndianOil One app or mylpg.co.in to update your number online, verified by Aadhaar-linked OTP.',
              'Call Indane customer care at 1800-2333-555 to book with assistance while your number update is in progress.',
            ]} />

            {/* SECTION 8 */}
            <h2 id="otp-delivery" style={hStyle}>OTP Delivery Verification: Why Your Cylinder Might Not Get Delivered</h2>
            <p style={pStyle}>
              Since May 1, 2026, an OTP-based Delivery Authentication Code is mandatory across Indane, Bharat Gas, and HP Gas. The delivery agent sends an OTP to your registered number on delivery day, and cannot hand over the cylinder without it.
            </p>
            <p style={pStyle}>
              If your phone is unreachable, switched off, or the number on file is outdated, the delivery is cancelled on the spot and has to be rebooked. Keep your registered number reachable on your expected delivery day, and update it in advance if it has changed.
            </p>
            <Callout>
              Standard refill gaps are 25 days in urban areas and 45 days in rural areas. In March 2026, the Ministry of Petroleum and Natural Gas officially refuted a circulating claim that this gap differed by connection type (45 days for PMUY, 25 days for non-PMUY single-bottle, 35 days for non-PMUY double-bottle). The confirmed rule is the same 25/45-day gap for every customer, PMUY or not, regardless of how many cylinders are on the connection.
            </Callout>

            {/* SECTION 9 */}
            <h2 id="customer-care" style={hStyle}>Indane Gas Customer Care and Complaint Numbers</h2>
            <p style={pStyle}>
              1800-2333-555 is the toll-free number for customer care and general queries, open 8 AM to 8 PM daily; calls outside that window route through an automated IVRS system by urgency.
            </p>
            <DataTable
              caption="Indane Gas Customer Care and Emergency Numbers"
              headers={['Purpose', 'Contact', 'Availability']}
              rows={[
                ['General customer care, booking issues', '1800-2333-555', '8 AM to 8 PM daily, IVRS after hours'],
                ['Feedback / complaint short code', '155233', 'Business hours'],
                ['Complaint email', 'iocl.cocc@indianoil.in', 'Email, response time varies'],
                ['LPG gas leak emergency', '1906', '24x7, all LPG providers'],
              ]}
            />
            <p style={pStyle}>
              Local distributor numbers exist separately for hyperlocal issues like a specific delivery delay; find yours printed on your LPG passbook or through the distributor locator on <a href="https://iocl.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>iocl.com</a>.
            </p>

            <CalcCTA
              href="/calculators/monthly-budget-calculator"
              label="Monthly Budget Calculator"
              note="See exactly where your LPG spend fits against rent, groceries, and everything else in your monthly budget."
            />

            {/* SECTION 10 */}
            <h2 id="booking-limits" style={hStyle}>How Many Cylinders You Can Book: Subsidy Limit and Refill Gap</h2>
            <p style={pStyle}>
              The government subsidises 12 cylinders (14.2 kg) per financial year per household through the PAHAL direct benefit transfer scheme, the same national scheme that applies uniformly across Indane, Bharat Gas, and HP Gas connections.
            </p>
            <p style={pStyle}>
              You can still book beyond 12 in a year, but every cylinder past the 12th is billed at the full, non-subsidised market rate. The subsidised quota resets at the start of each financial year and any unused portion does not carry forward.
            </p>

            {/* SECTION 11 */}
            <h2 id="track-status" style={hStyle}>How to Track Your Indane Gas Booking and Delivery Status</h2>
            <p style={pStyle}>
              Log in to <a href="https://mylpg.co.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>mylpg.co.in</a> or the IndianOil One app and open the booking history section to see your refill status in real time. The same status is available by calling 1800-2333-555.
            </p>
            <p style={pStyle}>
              Actual delivery time depends on your distributor&apos;s local load, typically faster in urban areas than rural ones. Booking from the date your cylinder starts running low, rather than waiting until it is empty, is the safest way to avoid a gap.
            </p>

            {/* SECTION 12 */}
            <h2 id="kyc-subsidy" style={hStyle}>Indane Gas KYC and Subsidy Status: PAHAL Scheme</h2>
            <p style={pStyle}>
              Complete e-KYC through the IndianOil One app or <a href="https://mylpg.co.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>mylpg.co.in</a> using your registered number, 17-digit LPG ID, and Aadhaar-based OTP verification. There is no fixed deadline for this; Petroleum Minister Hardeep Singh Puri stated directly that neither IndianOil nor the central government has set one, and that genuine consumers face no inconvenience either way.
            </p>
            <p style={pStyle}>
              That said, an incomplete KYC does stop PAHAL subsidy payments from reaching your bank account, and the process exists primarily to weed out bogus connections where commercial cylinders are fraudulently booked as domestic ones. Check your current subsidy status the same way, under the PAHAL status section on the website or app.
            </p>

            {/* SECTION 13 */}
            <h2 id="common-issues" style={hStyle}>Common Indane Gas Booking Problems and How to Fix Them</h2>
            <p style={pStyle}>
              Most failed bookings trace back to one of five causes, each fixable without a distributor visit in most cases.
            </p>
            <BulletList items={[
              'Mobile number not registered: update it through the app or website before trying to book again.',
              'Inactive LPG connection: check status on mylpg.co.in, or call 1800-2333-555 to confirm.',
              'Wrong or outdated LPG ID entered during IVRS or app booking: cross-check the 17-digit ID on your passbook.',
              'Distributor-side delay: escalate directly to 1800-2333-555 if your distributor has not responded within the normal delivery window.',
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
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Indane Gas Booking Number</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="indane-gas-sidebar"
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
                ['Missed call', '8454955555'],
                ['WhatsApp', '7588888824'],
                ['SMS / IVRS', '7718955555'],
                ['Customer care', '1800-2333-555'],
                ['Gas leak emergency', '1906'],
                ['Complaint short code', '155233'],
                ['LPG ID length', '17 digits'],
                ['Subsidised cylinders/year', '12'],
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
                ['/blogs/bharat-gas-booking-number', 'Bharat Gas Booking Number: Every Official Method'],
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
        .indane-gas-sidebar::-webkit-scrollbar { width: 5px; }
        .indane-gas-sidebar::-webkit-scrollbar-track { background: transparent; }
        .indane-gas-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .indane-gas-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

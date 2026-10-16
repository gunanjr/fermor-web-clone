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

const NFSA_HOME = 'https://nfsa.gov.in';
const NFSA_STATE = (code: string) => `https://nfsa.gov.in/State/${code}`;

export const metadata: Metadata = {
  title: 'Ration Card e-KYC: How to Complete It Online (2026)',
  description: 'Ration card e-KYC guide: complete it online, via Mera Ration, by face scan, or offline at a Fair Price Shop. 2026 deadline and status check inside.',
  alternates: { canonical: 'https://fermor.in/blogs/ration-card-ekyc' },
  openGraph: {
    title: 'Ration Card e-KYC: How to Complete It Online (2026) - Fermor',
    description: 'Complete ration card e-KYC online, by app, by face authentication, or offline. Deadline, status check, and links for all 35 states and UTs.',
    type: 'article',
    url: 'https://fermor.in/blogs/ration-card-ekyc',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ration Card e-KYC: How to Complete It Online (2026) - Fermor',
    description: 'Complete ration card e-KYC online, by app, or offline at a Fair Price Shop. Official state portal links for all 35 states and UTs.',
  },
};

const faqItems = [
  { q: 'What is ration card e-KYC?', a: 'Ration card e-KYC is the Aadhaar-based electronic Know Your Customer verification the government requires for every member listed on a ration card under the National Food Security Act. It confirms each beneficiary is a real, living person and not duplicated on another household\'s card, and it is now a condition for continuing to receive subsidised foodgrains under the Public Distribution System.' },
  { q: 'Is ration card e-KYC mandatory for every family member, or just the head of the household?', a: 'Every member listed on the ration card, not just the head of household, must complete e-KYC individually. A card can be marked partially unauthenticated if even one listed member has not completed verification, which can affect the entitlement calculated for that household.' },
  { q: 'How do I complete ration card e-KYC online?', a: 'Visit your state\'s official PDS portal, open the e-KYC or Aadhaar Seeding section, enter your ration card number, and verify with the OTP sent to your Aadhaar-linked mobile number. This route only works if your Aadhaar is already linked to your ration card and your mobile number is active.' },
  { q: 'How do I check my ration card e-KYC status online?', a: 'Go to your state\'s PDS portal, look for "e-KYC Status" or "Aadhaar Seeding Status," and enter your ration card number or Aadhaar number. The result shows which listed members are verified and which are still pending, member by member.' },
  { q: 'What is the Mera Ration app and how does it help with e-KYC?', a: 'Mera Ration is the Department of Food and Public Distribution\'s official mobile app. Its Aadhaar Seeding section lets you enter your ration card number to see the e-KYC status of every family member on the card, and it works as a fallback when a state PDS website is slow or unavailable.' },
  { q: 'Can I complete ration card e-KYC by face authentication without visiting a Fair Price Shop?', a: 'Yes. The Mera eKYC app, used together with UIDAI\'s Aadhaar FaceRD app, lets a beneficiary complete e-KYC from home on an Android smartphone using a face scan instead of a fingerprint or iris scan. This is the fastest option for anyone who cannot easily travel to a Fair Price Shop.' },
  { q: 'How do I complete ration card e-KYC offline?', a: 'Visit your nearest Fair Price Shop and ask the dealer to run the e-KYC process on the e-PoS (electronic Point of Sale) machine. You provide a fingerprint or iris scan, which is matched against your Aadhaar record to complete verification on the spot, at no cost.' },
  { q: 'What documents are needed for ration card e-KYC?', a: 'You need your Aadhaar card linked to the ration card, the physical ration card or its number, and an Aadhaar-linked mobile number if you are using the OTP-based online route. Offline at a Fair Price Shop, the dealer only needs your ration card number to pull up your household record before the biometric scan.' },
  { q: 'What was the deadline for ration card e-KYC in 2026?', a: 'The central government set April 30, 2026 as the target date for most states to complete e-KYC, though individual states set their own earlier cutoffs, Bihar at February 28 and Tamil Nadu at February 25, 2026 among them. Deadlines have been extended more than once in the past, so check your specific state\'s PDS portal for its current cutoff rather than assuming one national date applies everywhere.' },
  { q: 'What happens if I missed the ration card e-KYC deadline?', a: 'A ration card, or an individual member on it, that misses the deadline gets flagged as unauthenticated, which can suspend or cancel the subsidised foodgrain entitlement tied to that person or household. Completing e-KYC even after a missed deadline typically restores the entitlement once the verification goes through, so it is worth doing immediately rather than assuming the card is permanently lost.' },
  { q: 'Can I still complete e-KYC after the deadline has passed?', a: 'In most states, yes. The online portal, Mera Ration app, and Fair Price Shop biometric route generally stay open for late verification, since the government\'s priority is getting every genuine beneficiary verified, not permanently excluding late filers. Confirm with your state\'s PDS portal or local Fair Price Shop dealer if your card shows as suspended.' },
  { q: 'How does ration card e-KYC connect to One Nation One Ration Card (ONORC)?', a: 'Completed e-KYC is the technical foundation that makes ONORC portability work, since it confirms a beneficiary\'s identity centrally rather than only at their home Fair Price Shop. Once verified, a migrant worker or any beneficiary can draw their entitled foodgrains from any Fair Price Shop in India, not only the one linked to their original ration card.' },
  { q: 'How do I link Aadhaar to my ration card if it isn\'t linked yet?', a: 'On your state\'s PDS portal, look for "Link Aadhaar with Ration Card," then enter your ration card number, Aadhaar number, and registered mobile number, and verify with the OTP received. Once linked, you can proceed with the standard OTP-based e-KYC on the same portal.' },
  { q: 'Is "ration card e-KYC" the same as "rice card e-KYC"?', a: 'Yes. "Rice card" is a common colloquial term for the ration card in several states, since rice is the primary subsidised grain distributed under the Public Distribution System there. The verification process, portals, and deadlines are identical regardless of which term is used to search for it.' },
  { q: 'Does ration card e-KYC registration cost anything?', a: 'No. Ration card e-KYC is free everywhere, whether completed online through a state PDS portal, through the Mera Ration or Mera eKYC apps, or offline at a Fair Price Shop. No official channel charges a fee for this verification.' },
  { q: 'What if the e-KYC OTP doesn\'t arrive during verification?', a: 'The OTP only reaches the mobile number already linked to your Aadhaar and ration card, so an inactive or changed number will never receive it. Update your registered mobile number through your state\'s portal or visit the Fair Price Shop to complete e-KYC biometrically instead, which does not depend on OTP delivery.' },
  { q: 'Can I complete ration card e-KYC at a Common Service Centre (CSC) instead of a Fair Price Shop?', a: 'In several states, yes, a nearby Common Service Centre can carry out the same Aadhaar biometric verification as a Fair Price Shop\'s e-PoS machine. Availability varies by state, so check your state PDS portal or ask your local CSC operator whether ration card e-KYC is listed among their services.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on loans, taxes, investments, and government processes like this one. It combines free calculators with a growing set of guides on government schemes and verification processes that affect household finances.' },
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
  headline: 'Ration Card e-KYC: How to Complete It Online, by App, or Offline',
  url: 'https://fermor.in/blogs/ration-card-ekyc',
  datePublished: '2026-07-28T00:08:34+05:30',
  dateModified: '2026-07-28T00:08:34+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete ration card e-KYC guide: the Aadhaar-based verification mandatory under NFSA for every ration card member, how to complete it online via state PDS portals, through the Mera Ration app, by face authentication with Mera eKYC and Aadhaar FaceRD, or offline at a Fair Price Shop. Covers the April 2026 deadline, what happens after a missed deadline, ONORC portability, and official state-wise portal links for all 35 states and Union Territories.',
  articleSection: 'Government Schemes',
  keywords: 'ekyc ration card, ration card e kyc online, ration card ekyc, ration card e kyc, e kyc ration card, ration card ekyc online, ration card ekyc status, ration ekyc, e kyc for ration card, e kyc for ration card online, e ration card kyc, ekyc for ration card, ekyc ration, ration card e kyc app, ration card e kyc status, ration card ekyc app, ration card online kyc, rice card ekyc status, e kyc ration card aadhar card link, e kyc verification ration card, ekyc for ration card online, ration card e kyc registration, ration card e kyc verification',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Ration Card e-KYC', item: 'https://fermor.in/blogs/ration-card-ekyc' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Complete Ration Card e-KYC Online',
  description: 'Step-by-step process to complete Aadhaar-based e-KYC for a ration card using the state PDS portal.',
  totalTime: 'PT5M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm Aadhaar Is Linked', text: 'Check that your Aadhaar number is already linked to your ration card; e-KYC online only works if this link already exists.' },
    { '@type': 'HowToStep', position: 2, name: 'Open Your State PDS Portal', text: 'Go to your state\'s official Public Distribution System portal and find the e-KYC or Aadhaar Seeding section.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter Your Ration Card Number', text: 'Type in your ration card number and confirm your Aadhaar-linked mobile number is active.' },
    { '@type': 'HowToStep', position: 4, name: 'Verify the OTP', text: 'Enter the OTP sent to your registered mobile number to authenticate your Aadhaar details.' },
    { '@type': 'HowToStep', position: 5, name: 'Confirm e-KYC Completion', text: 'Once verified, the portal updates your e-KYC status, and you can recheck it anytime under the status section.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/ration-card-ekyc',
  name: 'Ration Card e-KYC: How to Complete It Online, by App, or Offline - Fermor',
  url: 'https://fermor.in/blogs/ration-card-ekyc',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T00:08:34+05:30',
  dateModified: '2026-07-28T00:08:34+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'e-KYC',
      alternateName: 'Electronic Know Your Customer',
      description: 'Aadhaar-based digital identity verification required for every member listed on a ration card under India\'s National Food Security Act, used to remove duplicate or ineligible beneficiaries from the Public Distribution System.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'ONORC',
      alternateName: 'One Nation One Ration Card',
      description: 'A Government of India scheme allowing a ration cardholder to draw subsidised foodgrains from any Fair Price Shop in the country, not only the one linked to their home state, once their identity is verified through e-KYC.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Ration cardholders and Public Distribution System beneficiaries in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Ration Card e-KYC Links' },
    { '@type': 'WebPageElement', cssSelector: '#deadline-2026', name: 'The 2026 e-KYC Deadline' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-ekyc', name: 'What Is Ration Card e-KYC' },
    { '@type': 'WebPageElement', cssSelector: '#who-needs', name: 'Who Needs to Complete e-KYC' },
    { '@type': 'WebPageElement', cssSelector: '#online-portal', name: 'Complete e-KYC Online via State Portal' },
    { '@type': 'WebPageElement', cssSelector: '#mera-ration-app', name: 'Complete e-KYC via Mera Ration App' },
    { '@type': 'WebPageElement', cssSelector: '#face-authentication', name: 'Complete e-KYC by Face Authentication' },
    { '@type': 'WebPageElement', cssSelector: '#offline-fps', name: 'Complete e-KYC Offline at a Fair Price Shop' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'Check e-KYC Status Online' },
    { '@type': 'WebPageElement', cssSelector: '#state-portals', name: 'State-Wise e-KYC Portals' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#onorc', name: 'e-KYC and ONORC Portability' },
    { '@type': 'WebPageElement', cssSelector: '#consequences', name: 'What Happens if You Don’t Complete e-KYC' },
    { '@type': 'WebPageElement', cssSelector: '#troubleshooting', name: 'Common e-KYC Problems and Fixes' },
    { '@type': 'WebPageElement', cssSelector: '#which-method', name: 'Which Method Should You Use' },
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
  knowsAbout: ['Ration Card e-KYC', 'Public Distribution System', 'National Food Security Act', 'One Nation One Ration Card', 'Aadhaar Verification', 'Fair Price Shop', 'Account Aggregator Framework'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and links directly to official state PDS portals and the National Food Security Act portal. Fermor is not affiliated with any state Food and Civil Supplies Department, does not process ration card applications or e-KYC, and never asks for your Aadhaar number, ration card number, or OTP. Deadlines, portal names, and app names reflect published government information as of the date above and can change or vary by state; always verify current details on your state's PDS portal or nfsa.gov.in before relying on them.
      </p>
    </div>
  );
}

const STATE_PORTALS: [string, string][] = [
  ['Andaman and Nicobar Islands', 'AN'],
  ['Andhra Pradesh', 'AP'],
  ['Arunachal Pradesh', 'AR'],
  ['Assam', 'AS'],
  ['Bihar', 'BR'],
  ['Chandigarh', 'CH'],
  ['Chhattisgarh', 'CG'],
  ['Dadra and Nagar Haveli and Daman and Diu', 'DN'],
  ['Delhi', 'DL'],
  ['Goa', 'GA'],
  ['Gujarat', 'GJ'],
  ['Haryana', 'HR'],
  ['Himachal Pradesh', 'HP'],
  ['Jammu and Kashmir', 'JK'],
  ['Jharkhand', 'JH'],
  ['Karnataka', 'KA'],
  ['Kerala', 'KL'],
  ['Ladakh', 'LH'],
  ['Lakshadweep', 'LD'],
  ['Madhya Pradesh', 'MP'],
  ['Maharashtra', 'MH'],
  ['Manipur', 'MN'],
  ['Meghalaya', 'ML'],
  ['Mizoram', 'MZ'],
  ['Nagaland', 'NL'],
  ['Odisha', 'OR'],
  ['Puducherry', 'PY'],
  ['Punjab', 'PB'],
  ['Rajasthan', 'RJ'],
  ['Sikkim', 'SK'],
  ['Tamil Nadu', 'TN'],
  ['Telangana', 'TL'],
  ['Tripura', 'TR'],
  ['Uttar Pradesh', 'UP'],
  ['Uttarakhand', 'UK'],
  ['West Bengal', 'WB'],
];

export default function RationCardEkycPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Ration Card e-KYC</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Government Schemes
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-07-28T00:08:34+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 28, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Ration Card e-KYC: How to Complete It Online, by App, or Offline
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Ration card e-KYC is the Aadhaar-based verification the government now requires for every person listed on a ration card, not just the head of the household, to keep receiving subsidised foodgrains under the Public Distribution System.
            </p>
            <p style={pStyle}>
              You can complete it online through your state's PDS portal, through the Mera Ration app, by a face scan using Mera eKYC, or offline at any Fair Price Shop, all free of cost.
            </p>
            <p style={pStyle}>
              Most states set April 30, 2026 as the completion deadline, which has already passed, so this guide leads with what that means for a card that is still unverified today.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Direct, official links for ration card e-KYC"
                headers={['Service', 'Link']}
                rows={[
                  ['National Food Security Act portal', <Link key="l1" href={NFSA_HOME} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>nfsa.gov.in</Link>],
                  ['State PDS portal directory', <Link key="l2" href="https://nfsa.gov.in/portal/ration_card_state_portals_aa" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>All state ration card portals</Link>],
                  ['Official app (OTP-based status and Aadhaar seeding)', 'Mera Ration (App Store and Google Play)'],
                  ['Official app (face authentication e-KYC)', 'Mera eKYC, used with UIDAI\'s Aadhaar FaceRD app'],
                  ['Offline verification', 'Nearest Fair Price Shop (FPS) e-PoS machine, or a Common Service Centre (CSC) where available'],
                ]}
              />
            </div>

            {/* SECTION: Deadline */}
            <h2 id="deadline-2026" style={hStyle}>The 2026 e-KYC Deadline: What It Means if You Missed It</h2>
            <p style={pStyle}>
              Most states worked toward a central government target of April 30, 2026 to complete ration card e-KYC, though the exact date varied: Bihar's cutoff was February 28 and Tamil Nadu's was February 25, 2026.
            </p>
            <p style={pStyle}>
              That national target has already passed as of this writing. Deadlines for this exercise have been pushed back more than once in earlier rounds, so treat any single date as a guide rather than a hard national rule, and check your own state's PDS portal for its current status.
            </p>
            <p style={pStyle}>
              A card or an individual member that missed the window is typically flagged unauthenticated rather than deleted outright, and most states keep the online portal, Mera Ration app, and Fair Price Shop route open for late verification, since the goal is getting genuine beneficiaries verified, not permanently excluding late filers.
            </p>

            {/* SECTION: What is e-KYC */}
            <h2 id="what-is-ekyc" style={hStyle}>What Is Ration Card e-KYC?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Ration card e-KYC (electronic Know Your Customer) is an Aadhaar-based digital verification that confirms every person named on a ration card is a real, correctly identified beneficiary under the Public Distribution System.
              </p>
            </div>
            <p style={pStyle}>
              Once a beneficiary completes Aadhaar-based OTP or biometric authentication, UIDAI shares basic demographic details, name, date of birth, address, gender, and photograph, with the state Food and Civil Supplies Department for validation.
            </p>
            <p style={pStyle}>
              State officers then compare that data against the existing PDS database entry to confirm the cardholder's identity and remove duplicate or fake entries, which is the same underlying goal as Aadhaar-based verification used for the <Link href="/blogs/epic-number-voter-id-card" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>EPIC number</Link> on a Voter ID card.
            </p>

            {/* SECTION: Who needs it */}
            <h2 id="who-needs" style={hStyle}>Who Needs to Complete e-KYC?</h2>
            <p style={pStyle}>
              Every individual named on the ration card needs to complete e-KYC separately, not just the head of household who typically manages the card.
            </p>
            <p style={pStyle}>
              This is a common point of confusion: a household where only the head of family completed verification can still show as partially unauthenticated, since the remaining members' entitlements depend on their own individual e-KYC status.
            </p>

            {/* SECTION: Online via state portal */}
            <h2 id="online-portal" style={hStyle}>How to Complete Ration Card e-KYC Online via State PDS Portal</h2>
            <p style={pStyle}>
              Online e-KYC only works if your Aadhaar is already linked to your ration card. If it isn't linked yet, do that first through the same portal's Aadhaar linking option before attempting e-KYC.
            </p>
            <NumberedSteps steps={[
              { title: 'Go to your state\'s official PDS portal', text: 'Use the state-wise links further down this page, or the national directory at nfsa.gov.in.' },
              { title: 'Open the e-KYC section', text: 'Look under "Ration Card Services," "e-Services," or "Update Details" on the homepage.' },
              { title: 'Enter your ration card number', text: 'Confirm that the mobile number linked to your Aadhaar is active before continuing.' },
              { title: 'Verify the OTP', text: 'Enter the OTP sent to your registered mobile number to confirm your Aadhaar details.' },
              { title: 'Confirm e-KYC completion', text: 'The portal updates your status once verification succeeds; recheck it anytime under the status section.' },
            ]} />

            {/* SECTION: Mera Ration app */}
            <h2 id="mera-ration-app" style={hStyle}>How to Complete e-KYC Using the Mera Ration App</h2>
            <p style={pStyle}>
              Mera Ration is the Department of Food and Public Distribution's own mobile app, and it works as a reliable fallback when a state portal is slow or temporarily unavailable.
            </p>
            <NumberedSteps steps={[
              { title: 'Download Mera Ration', text: 'Install it from the App Store or Google Play Store.' },
              { title: 'Open Aadhaar Seeding', text: 'Select this option from the app\'s home screen.' },
              { title: 'Enter your ration card number', text: 'Submit the number to pull up your household record.' },
              { title: 'Review each member\'s status', text: 'The app lists every family member on the card and shows whether their Aadhaar seeding and e-KYC is complete.' },
            ]} />

            {/* SECTION: Face authentication */}
            <h2 id="face-authentication" style={hStyle}>How to Complete e-KYC by Face Authentication</h2>
            <p style={pStyle}>
              Face authentication lets a beneficiary complete e-KYC entirely from home, with no fingerprint scanner and no visit to a Fair Price Shop.
            </p>
            <NumberedSteps steps={[
              { title: 'Install Mera eKYC and Aadhaar FaceRD', text: 'Both apps, from UIDAI and the food department respectively, are needed on an Android smartphone.' },
              { title: 'Open Mera eKYC and select your member', text: 'Choose the family member on the ration card who is completing verification.' },
              { title: 'Complete the face scan', text: 'Mera eKYC hands off to the Aadhaar FaceRD app, which captures and matches a live face scan against Aadhaar records.' },
              { title: 'Confirm completion', text: 'Once the scan succeeds, that member\'s e-KYC status updates automatically.' },
            ]} />

            <CalcCTA
              href="/calculators/rd-calculator"
              label="RD Calculator"
              note="Building even a small recurring deposit alongside subsidised food savings is a realistic first step toward a financial cushion. See what a modest monthly amount grows to."
            />

            {/* SECTION: Offline FPS */}
            <h2 id="offline-fps" style={hStyle}>How to Complete Ration Card e-KYC Offline at a Fair Price Shop</h2>
            <p style={pStyle}>
              Offline verification is the right choice when your state doesn't offer online e-KYC, or when your Aadhaar isn't linked to your ration card yet.
            </p>
            <NumberedSteps steps={[
              { title: 'Visit your nearest Fair Price Shop', text: 'Bring your ration card or its number and your Aadhaar card.' },
              { title: 'Ask the dealer to start e-KYC on the e-PoS machine', text: 'The dealer pulls up your household record using the ration card number.' },
              { title: 'Provide your fingerprint or iris scan', text: 'This biometric data is matched against your Aadhaar record through the e-PoS device.' },
              { title: 'Confirm completion', text: 'Once matched successfully, your e-KYC is marked complete at that shop.' },
            ]} />
            <p style={pStyle}>
              In several states, a Common Service Centre (CSC) can also run this same biometric verification, which is worth checking if the nearest Fair Price Shop has a long queue or a broken e-PoS device.
            </p>

            {/* SECTION: Check status */}
            <h2 id="check-status" style={hStyle}>How to Check Ration Card e-KYC Status Online</h2>
            <NumberedSteps steps={[
              { title: 'Go to your state\'s PDS portal', text: 'Use the state-wise directory further down this page.' },
              { title: 'Find the e-KYC or Aadhaar Seeding status option', text: 'This is usually labelled "e-KYC Status" or "Aadhaar Linking Status."' },
              { title: 'Enter your Aadhaar or ration card number', text: 'Type in whichever identifier the portal asks for.' },
              { title: 'Click Check Status', text: 'The screen confirms whether e-KYC is complete for each member, or still pending.' },
            ]} />

            {/* SECTION: State portals */}
            <h2 id="state-portals" style={hStyle}>State-Wise Ration Card e-KYC Portals</h2>
            <p style={pStyle}>
              Each link below routes through the National Food Security Act portal's own state directory, which stays current even when an individual state website changes its domain, a real risk given how often state government portals migrate.
            </p>
            <InfoTable
              caption="Official NFSA-routed e-KYC and ration card portal for every state and Union Territory"
              headers={['State / Union Territory', 'Portal']}
              rows={STATE_PORTALS.map(([name, code]) => [
                name,
                <Link key={code} href={NFSA_STATE(code)} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Open {name} portal</Link>,
              ])}
            />

            {/* SECTION: Documents */}
            <h2 id="documents" style={hStyle}>Documents Required for Ration Card e-KYC</h2>
            <BulletList items={[
              <span key="d1"><strong>Aadhaar card:</strong> linked to the ration card, since e-KYC is fundamentally an Aadhaar-based process.</span>,
              <span key="d2"><strong>Ration card or ration card number:</strong> needed to identify the household record on any portal, app, or at a Fair Price Shop.</span>,
              <span key="d3"><strong>Aadhaar-linked mobile number:</strong> required only for the OTP-based online route; not needed for biometric or face authentication.</span>,
            ]} />
            <p style={pStyle}>
              The same Aadhaar-based identity document also underpins financial KYC elsewhere, from opening a bank account to filing an <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>income tax return</Link>, so keeping your Aadhaar details current benefits more than just your ration card.
            </p>

            {/* SECTION: ONORC */}
            <h2 id="onorc" style={hStyle}>How e-KYC Powers One Nation One Ration Card (ONORC)</h2>
            <p style={pStyle}>
              Completed e-KYC is what makes ONORC portability technically possible, since it verifies a beneficiary's identity centrally rather than only at their home Fair Price Shop.
            </p>
            <p style={pStyle}>
              Once verified, a migrant worker or any beneficiary can draw their entitled foodgrains from any Fair Price Shop across India, not just the one tied to the state that originally issued their card.
            </p>
            <p style={pStyle}>
              This matters most for interstate migrant workers, who can now access subsidised grain in the state where they currently work without transferring their ration card or losing their original household's entitlement back home.
            </p>

            {/* SECTION: Consequences */}
            <h2 id="consequences" style={hStyle}>What Happens if You Don't Complete e-KYC</h2>
            <BulletList items={[
              'A member or card flagged unauthenticated risks temporary suspension of subsidised foodgrains for that person or household.',
              'Persistent non-verification can lead to cancellation of the ration card over time, not just a paused entitlement.',
              'Un-verified members cannot benefit from ONORC portability, since the scheme depends on a confirmed identity record.',
              'Restoring benefits after a missed deadline usually just requires completing e-KYC through any of the available methods; it is rarely a permanent loss if addressed promptly.',
            ]} />

            {/* SECTION: Troubleshooting */}
            <h2 id="troubleshooting" style={hStyle}>Common e-KYC Problems and How to Fix Them</h2>
            <InfoTable
              caption="Ration card e-KYC issues: cause and fix"
              headers={['Issue', 'Likely Cause', 'Fix']}
              rows={[
                ['Online e-KYC option not available', 'Some states haven’t enabled online e-KYC yet', 'Use the Mera Ration or Mera eKYC app, or visit a Fair Price Shop instead'],
                ['OTP never arrives', 'Aadhaar-linked mobile number is inactive or was changed', 'Update your mobile number on the state portal first, or use the biometric or face-authentication route, which doesn’t need OTP'],
                ['Portal shows Aadhaar not linked', 'Aadhaar was never seeded against this ration card', 'Complete Aadhaar linking on the same portal before attempting e-KYC'],
                ['One family member still shows unverified', 'e-KYC is tracked per person, not per card', 'That specific member needs to complete verification individually, through any available method'],
                ['e-PoS machine at the Fair Price Shop isn’t working', 'Device fault or network issue at that specific shop', 'Try a Common Service Centre if available, or a different nearby Fair Price Shop'],
                ['Card shows unauthenticated despite completing e-KYC', 'Processing delay between the FPS/app and the state database', 'Wait a few days and recheck status online; contact the local Food and Civil Supplies office if it persists beyond a week'],
              ]}
            />

            {/* SECTION: Which method */}
            <h2 id="which-method" style={hStyle}>Quick Reference: Which Method Should You Use?</h2>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Aadhaar already linked, mobile active:</strong> use your state's online PDS portal for the fastest OTP-based e-KYC.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>State portal slow or unavailable:</strong> use the Mera Ration app as a direct fallback.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>No fingerprint scanner nearby, but you have a smartphone:</strong> use Mera eKYC with Aadhaar FaceRD for face-based verification at home.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Aadhaar not linked yet, or no smartphone access:</strong> visit the nearest Fair Price Shop for biometric verification through the e-PoS machine.
              </li>
            </ol>

            <CalcCTA
              href="/calculators/ppf-calculator"
              label="PPF Calculator"
              note="A small, government-backed savings habit is worth building alongside subsidised essentials. See what regular PPF contributions grow to over time."
            />

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Ration Card e-KYC</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="ration-ekyc-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>e-KYC Quick Reference</div>
              {([
                ['2026 national target', 'April 30, 2026'],
                ['Cost', 'Free, all methods'],
                ['Verifies', 'Every listed member'],
                ['Online method', 'OTP via state PDS portal'],
                ['App (status/seeding)', 'Mera Ration'],
                ['App (face scan)', 'Mera eKYC + Aadhaar FaceRD'],
                ['Offline method', 'Fair Price Shop e-PoS'],
                ['Alternate offline', 'Common Service Centre (CSC)'],
                ['National directory', 'nfsa.gov.in'],
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
                <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#7A8087', marginBottom: 14 }}>Fermor Calculators</div>
                <Link href="/calculators/rd-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>RD Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>PPF Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/epic-number-voter-id-card', 'EPIC Number: Find Yours in Your Voter ID'],
                ['/blogs/gst-number-search', 'GST Number Search: Verify a GSTIN Online'],
              ] as [string, string][]).map(([href, title], i) => (
                <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i === 0 ? `1px solid ${C.border}` : 'none' }}>
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
        .ration-ekyc-sidebar::-webkit-scrollbar { width: 5px; }
        .ration-ekyc-sidebar::-webkit-scrollbar-track { background: transparent; }
        .ration-ekyc-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .ration-ekyc-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

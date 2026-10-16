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

const VOTERS_PORTAL   = 'https://voters.eci.gov.in';
const SEARCH_PORTAL   = 'https://electoralsearch.eci.gov.in';
const ECI_HOME        = 'https://www.eci.gov.in';
const FORM_6B_URL     = 'https://voters.eci.gov.in/formspdf/Form_6B_English.pdf';
const OLD_EPIC_URL    = 'https://old.eci.gov.in/e-epic/';

export const metadata: Metadata = {
  title: 'EPIC Number: What It Is and How to Find Yours (2026)',
  description: 'EPIC number guide: the 10-character Voter ID code explained, how to find it by name, mobile, or Aadhaar link, and download e-EPIC. Official ECI links only.',
  alternates: { canonical: 'https://fermor.in/blogs/epic-number-voter-id-card' },
  openGraph: {
    title: 'EPIC Number: What It Is and How to Find Yours (2026) - Fermor',
    description: 'What the EPIC number means, its 10-character format, and how to find or download it online through the official ECI portal.',
    type: 'article',
    url: 'https://fermor.in/blogs/epic-number-voter-id-card',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EPIC Number: What It Is and How to Find Yours (2026) - Fermor',
    description: 'Find your EPIC number by name, mobile, or Aadhaar link, and download your e-EPIC through the official ECI portal.',
  },
};

const faqItems = [
  { q: 'What is an EPIC number in a Voter ID card?', a: 'An EPIC number is the unique 10-character alphanumeric code the Election Commission of India assigns to every registered voter. EPIC stands for Electors Photo Identity Card. It confirms your entry on the electoral roll and is the credential you use to search the voter list, download e-EPIC, or update your voter details online.' },
  { q: 'What does an EPIC number look like?', a: 'An EPIC number has three uppercase letters followed by seven digits, for example ABC1234567. The letters identify the issuing state or constituency series, and the last of the seven digits works as a checksum, per ECI\'s own EPIC documentation.' },
  { q: 'How do I find my EPIC number online?', a: 'Go to electoralsearch.eci.gov.in and open the "Search by Details" tab. Enter your name, relative\'s name, date of birth or age, state, district, and assembly constituency, complete the captcha, and click Search. Your EPIC number appears in the results table next to your electoral roll entry.' },
  { q: 'How do I get my EPIC number by name if I don\'t remember any other details?', a: 'Search by Details only needs your name, gender, and state at minimum; district and constituency narrow the results faster but are not always required. If the search returns too many matches, add your father\'s or husband\'s name and approximate age to narrow it down.' },
  { q: 'Can I find my EPIC number using my Aadhaar card?', a: 'There is no direct "search by Aadhaar number" field on the public electoral roll search. If your Aadhaar is already linked to your voter record, logging in to voters.eci.gov.in with Aadhaar-based OTP opens your account directly and shows your EPIC number on your profile. If it isn\'t linked yet, use Search by Details or Search by Mobile instead, and link Aadhaar afterward through Form 6B.' },
  { q: 'Can I find my EPIC number using my mobile number?', a: 'Yes, if your mobile number is already registered against your voter record. Open the "Search by Mobile" tab on electoralsearch.eci.gov.in, select your state and language, enter the registered mobile number and captcha, and verify the OTP sent to that number. Your EPIC number and voter details load once the OTP is verified.' },
  { q: 'Does the Election Commission send the EPIC number by text message?', a: 'No. There is no SMS shortcode that texts back your EPIC number the way some other government services text back an account balance. The mobile-based route on the ECI portal sends an OTP for verification, not the EPIC number itself; you still retrieve the number from the on-screen search result after that OTP is verified.' },
  { q: 'What is the difference between Search by EPIC, Search by Details, and Search by Mobile?', a: 'Search by EPIC needs you to already know your EPIC number and is meant for looking up your polling station and constituency details, not for finding a number you don\'t have. Search by Details finds your EPIC using your name and personal details. Search by Mobile finds it using a mobile number already registered against your voter entry, verified with an OTP.' },
  { q: 'How do I download my Voter ID (e-EPIC) using my EPIC number?', a: 'Log in at voters.eci.gov.in with your mobile number, then open the e-EPIC Download tab. Choose the "EPIC No." option, enter your EPIC number and state, click Search, verify your details, click Send OTP, enter the OTP received on your registered mobile, and click Download.' },
  { q: 'What is the password for the e-EPIC PDF?', a: 'The downloaded e-EPIC PDF is protected with your date of birth in DDMMYYYY format as the password. For a voter born on 15 May 1992, the password to open the file is 15051992.' },
  { q: 'How do I check my voter ID application status if I don\'t have an EPIC number yet?', a: 'If you recently applied and don\'t have an EPIC number, use the Form Reference Number from your application acknowledgement instead. Enter it on the e-EPIC Download page in place of the EPIC number to check status and download once the application is approved.' },
  { q: 'What if my EPIC number search shows no results?', a: 'Double-check that your name, date of birth, and state exactly match your electoral roll entry, since even a spelling difference can return zero matches. If the polling station recently changed constituency boundaries or you moved without filing Form 8, your entry may now sit under a different district or assembly constituency than expected.' },
  { q: 'What if I don\'t receive the OTP while searching or downloading?', a: 'The OTP goes only to the mobile number already registered against your voter record, so a changed or unlinked number will never receive it. Update your mobile number through Form 8 under "Correction of Entries" on the portal, or visit your local Electoral Registration Officer for manual verification if the online route fails.' },
  { q: 'How do I link my Aadhaar number to my EPIC?', a: 'Submit Form 6B, "Letter of Information of Aadhaar Number for the Purpose of Electoral Roll Authentication," online at voters.eci.gov.in, through the Voter Helpline app, or on paper to your Booth Level Officer. You can also send an SMS in the format ECILINK, followed by your EPIC number and Aadhaar number, to 51969 or 166, or call the National Voter Helpline at 1950.' },
  { q: 'Is it mandatory to link Aadhaar with my EPIC number?', a: 'No. The Election Commission has stated that Aadhaar linking with the electoral roll is voluntary, following clarifications given to the Supreme Court. Voters can still search the roll, download e-EPIC, and vote without linking Aadhaar.' },
  { q: 'Why do some voters have the same EPIC number, and has this been fixed?', a: 'Identical EPIC numbers surfaced across different states because, before the ERONET platform existed, separate state election offices sometimes used the same alphanumeric numbering series under a decentralized, manual system dating back to 2005. The Election Commission has clarified this does not mean duplicate or fake voters, and has been reissuing unique EPIC numbers to every affected elector through the ERONET 2.0 upgrade.' },
  { q: 'What is a Unique Mobile Number in the electoral roll, and why does it matter?', a: 'It refers to the Election Commission\'s rule that only one mobile number can be linked to a single voter\'s EPIC record at a time. This prevents the same phone number from being used to verify multiple different voter entries, which is one of the safeguards behind OTP-based searches and e-EPIC downloads.' },
  { q: 'What is the Special Intensive Revision (SIR) and how does it affect my EPIC number?', a: 'SIR is a nationwide re-verification of electoral rolls the Election Commission has been carrying out across states and Union Territories, where every elector\'s existing details, including their EPIC number, are checked against a fresh enumeration form. If your state is under SIR, checking your EPIC number and confirming your entry on the draft roll is the fastest way to make sure you don\'t need to refile.' },
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
  headline: 'EPIC Number: What It Is and How to Find Yours in Your Voter ID Card',
  url: 'https://fermor.in/blogs/epic-number-voter-id-card',
  datePublished: '2026-07-27T23:14:01+05:30',
  dateModified: '2026-07-27T23:14:01+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete EPIC number guide: what the 10-character code means, its official checksum format, where it appears on old laminated cards, PVC cards, and e-EPIC PDFs, how to find it by name, mobile number, or Aadhaar link, how to download e-EPIC, Aadhaar linking via Form 6B, the 2025-26 duplicate EPIC resolution, and the ongoing Special Intensive Revision.',
  articleSection: 'Government Schemes',
  keywords: 'epic number, find epic number, get epic number, epic id card, epic id number, epic number check, find my epic number, my epic number, epic mobile number, find epic number by aadhar card, find epic number by mobile number, get epic number by name, linking aadhaar to epic, linking epic with aadhaar, sms epic number, unique mobile number epic, unique mobile number in eroll, voter id epic number, e-epic download',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'EPIC Number', item: 'https://fermor.in/blogs/epic-number-voter-id-card' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Find Your EPIC Number Online and Download e-EPIC',
  description: 'Step-by-step process to find an EPIC number using the official ECI electoral search portal and download e-EPIC.',
  totalTime: 'PT4M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the Electoral Search Portal', text: 'Go to electoralsearch.eci.gov.in, the official ECI portal for searching the electoral roll.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose a Search Method', text: 'Pick Search by Details (name and personal information) or Search by Mobile (registered mobile number and OTP), depending on what information you already have.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter Details and Search', text: 'Fill in the required fields, complete the captcha, and click Search. Verify the OTP if using the mobile route.' },
    { '@type': 'HowToStep', position: 4, name: 'Note Your EPIC Number', text: 'Your EPIC number appears in the results table along with your assembly constituency and polling station.' },
    { '@type': 'HowToStep', position: 5, name: 'Log In to Download e-EPIC', text: 'Go to voters.eci.gov.in, log in with your mobile number, and open the e-EPIC Download tab.' },
    { '@type': 'HowToStep', position: 6, name: 'Verify and Download', text: 'Enter your EPIC number and state, verify the OTP, then download the e-EPIC PDF. Open it using your date of birth in DDMMYYYY format as the password.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/epic-number-voter-id-card',
  name: 'EPIC Number: What It Is and How to Find Yours in Your Voter ID Card - Fermor',
  url: 'https://fermor.in/blogs/epic-number-voter-id-card',
  inLanguage: 'en-IN',
  datePublished: '2026-07-27T23:14:01+05:30',
  dateModified: '2026-07-27T23:14:01+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'EPIC',
      alternateName: 'Electors Photo Identity Card',
      description: 'A unique 10-character alphanumeric code the Election Commission of India assigns to every registered voter, used to search the electoral roll, download e-EPIC, and update voter details.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Electoral Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR',
      alternateName: 'Special Intensive Revision',
      description: 'A nationwide re-verification exercise the Election Commission of India runs to check every elector\'s details, including their EPIC number, against a fresh enumeration form.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Electoral Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian voters searching for or verifying their EPIC number and Voter ID details',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important EPIC Number Links' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'Special Intensive Revision 2026' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-epic', name: 'What Is an EPIC Number' },
    { '@type': 'WebPageElement', cssSelector: '#epic-format', name: 'EPIC Number Format' },
    { '@type': 'WebPageElement', cssSelector: '#where-to-find', name: 'Where to Find the EPIC Number' },
    { '@type': 'WebPageElement', cssSelector: '#find-online', name: 'How to Find EPIC Number Online' },
    { '@type': 'WebPageElement', cssSelector: '#find-by-mobile', name: 'Find EPIC Number by Mobile Number' },
    { '@type': 'WebPageElement', cssSelector: '#find-by-aadhaar', name: 'Find EPIC Number by Aadhaar' },
    { '@type': 'WebPageElement', cssSelector: '#download-e-epic', name: 'Download e-EPIC' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'Link Aadhaar with EPIC' },
    { '@type': 'WebPageElement', cssSelector: '#duplicate-epic', name: 'Duplicate EPIC Numbers' },
    { '@type': 'WebPageElement', cssSelector: '#troubleshooting', name: 'EPIC Number Not Found or OTP Issues' },
    { '@type': 'WebPageElement', cssSelector: '#uses', name: 'Uses of the EPIC Number' },
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
  knowsAbout: ['EPIC Number', 'Election Commission of India', 'Voter ID Card', 'Electoral Roll', 'Aadhaar Linking', 'KYC Documents India', 'Special Intensive Revision', 'Account Aggregator Framework'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and links directly to the Election Commission of India&apos;s official portals. Fermor is not affiliated with the ECI, does not process voter searches or applications, and never asks for your EPIC number, Aadhaar number, or OTP. Portal steps and contact details reflect the ECI&apos;s published information as of the date above and may change; always verify current details on eci.gov.in or voters.eci.gov.in before relying on them.
      </p>
    </div>
  );
}

export default function EpicNumberPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>EPIC Number</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Voter ID
            </span>
            <span style={{ color: C.border }}>&middot;</span>
            <time dateTime="2026-07-27T23:14:01+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 27, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>11 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            EPIC Number: What It Is and How to Find Yours in Your Voter ID Card
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              An EPIC number is the 10-character alphanumeric code the Election Commission of India assigns to every registered voter, and it is the single credential behind the Voter ID card, the electoral roll search, and the digital e-EPIC download.
            </p>
            <p style={pStyle}>
              You can find yours online in a few minutes using your name, a registered mobile number, or an Aadhaar link, all through the ECI&apos;s own portals.
            </p>
            <p style={pStyle}>
              This guide also covers what changed with the 2025-26 duplicate EPIC number cleanup and the ongoing Special Intensive Revision, both of which affect how current your EPIC record is right now.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Direct, official ECI links for EPIC number search and e-EPIC download"
                headers={['Service', 'Link']}
                rows={[
                  ['Search Electoral Roll (find EPIC number)', <Link key="l1" href={SEARCH_PORTAL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>electoralsearch.eci.gov.in</Link>],
                  ['Voters’ Service Portal (login, e-EPIC download)', <Link key="l2" href={VOTERS_PORTAL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>voters.eci.gov.in</Link>],
                  ['Aadhaar-EPIC Linking Form (Form 6B)', <Link key="l3" href={FORM_6B_URL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Download Form 6B</Link>],
                  ['Election Commission of India (official site)', <Link key="l4" href={ECI_HOME} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>eci.gov.in</Link>],
                  ['Official mobile app', 'Voter Helpline App (App Store and Google Play)'],
                  ['National Voter Helpline (toll-free)', '1950'],
                  ['Aadhaar link by SMS', 'ECILINK [EPIC number] [Aadhaar number] to 51969 or 166'],
                ]}
              />
            </div>

            {/* SECTION: SIR 2026 */}
            <h2 id="sir-2026" style={hStyle}>The 2026 Special Intensive Revision: Why Your EPIC Number Matters Right Now</h2>
            <p style={pStyle}>
              The Special Intensive Revision (SIR) is a nationwide re-verification of electoral rolls the Election Commission has been running across states and Union Territories, checking every elector&apos;s existing details, including their EPIC number, against a fresh enumeration form.
            </p>
            <p style={pStyle}>
              The enumeration form itself has three parts: Part 1 covers your existing EPIC details and photo, Part 2 covers family and address details, and Part 3 covers your previous SIR record along with a declaration and signature.
            </p>
            <p style={pStyle}>
              If your state is currently under SIR, the fastest way to avoid refiling paperwork is to confirm your EPIC number is correct and your name appears on the draft roll before the revision closes in your district.
            </p>

            {/* SECTION: What is EPIC */}
            <h2 id="what-is-epic" style={hStyle}>What Is an EPIC Number?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                An EPIC (Electors Photo Identity Card) number is a unique 10-character alphanumeric code the Election Commission of India issues to every registered voter. It confirms your enrollment on the electoral roll and your eligibility to vote.
              </p>
            </div>
            <p style={pStyle}>
              The EPIC number is what the electoral roll, the polling booth staff, and the e-EPIC download system all use to identify your specific voter record, out of nearly a billion entries on India&apos;s national electoral roll.
            </p>
            <p style={pStyle}>
              It is issued once, when your Voter ID application (Form 6) is approved, and stays the same even if you later update your address or photo through a correction form.
            </p>

            {/* SECTION: Format */}
            <h2 id="epic-format" style={hStyle}>EPIC Number Format: How to Read the 10 Characters</h2>
            <p style={pStyle}>
              Every EPIC number follows the same structure: three uppercase letters followed by seven digits, for example ABC1234567.
            </p>
            <InfoTable
              caption="Structure of a 10-character EPIC number"
              headers={['Position', 'What It Represents']}
              rows={[
                ['First 3 characters', 'A letter series (called the FUSN, or Functional Unique Serial Number, code by the ECI) tied to the state or Chief Electoral Officer office that issued the card'],
                ['Next 6 digits', 'A running serial number assigned within that letter series'],
                ['10th character', 'A checksum digit, used internally to validate the number is well-formed'],
              ]}
            />
            <p style={pStyle}>
              Before the ERONET database existed, different state offices sometimes issued the same letter-and-number series independently of each other, which is the root cause of the duplicate EPIC issue covered further down this page.
            </p>

            {/* SECTION: Where to find */}
            <h2 id="where-to-find" style={hStyle}>Where to Find Your EPIC Number on Different Voter ID Formats</h2>
            <p style={pStyle}>
              The exact spot depends on which version of the Voter ID you hold.
            </p>
            <InfoTable
              caption="EPIC number location by Voter ID card format"
              headers={['Voter ID Format', 'Where the EPIC Number Appears']}
              rows={[
                ['Old laminated card', 'Printed on the front, usually near the top, above or beside the photograph'],
                ['PVC card', 'Printed on the front, within the personal details section below the photograph'],
                ['e-EPIC (PDF)', 'On the first page, next to your name and personal details, and again in the QR code metadata'],
              ]}
            />

            <CalcCTA
              href="/calculators/personal-loan-eligibility-calculator"
              label="Personal Loan Eligibility Calculator"
              note="A Voter ID doubles as a valid KYC document for most loan applications. Check what you might qualify for once your documents are in order."
            />

            {/* SECTION: Find online */}
            <h2 id="find-online" style={hStyle}>How to Find Your EPIC Number Online: Step by Step</h2>
            <p style={pStyle}>
              The electoral roll search on electoralsearch.eci.gov.in has three tabs, and only two of them are actually useful for finding a number you don&apos;t already have.
            </p>
            <InfoTable
              caption="The three electoral roll search tabs and when to use each"
              headers={['Tab', 'What It Needs', 'Use It When']}
              rows={[
                ['Search by Details', 'Name, relative’s name, date of birth or age, gender, state, district, assembly constituency', 'You want to get your EPIC number by name and don’t have your card or a registered mobile handy'],
                ['Search by Mobile', 'State, language, registered mobile number, OTP', 'Your mobile number is already linked to your voter record'],
                ['Search by EPIC', 'Your EPIC number and state', 'You already know your EPIC number and want your polling station or constituency details, not the number itself'],
              ]}
            />
            <p style={pStyle}>
              To use Search by Details, the most common route when you don&apos;t have your card:
            </p>
            <NumberedSteps steps={[
              { title: 'Open the Search in Electoral Roll page', text: 'Go to electoralsearch.eci.gov.in and select the Search by Details tab.' },
              { title: 'Choose your state and language', text: 'Select these from the drop-down list at the top of the form.' },
              { title: 'Enter your personal details', text: 'Fill in your name, relative’s name, date of birth or age, gender, district, and assembly constituency exactly as they would appear on the roll.' },
              { title: 'Complete the captcha and search', text: 'Click Search once the captcha is entered correctly.' },
              { title: 'Read your EPIC number from the results', text: 'Your EPIC number appears in the results table alongside your polling station and constituency.' },
            ]} />

            {/* SECTION: Find by mobile */}
            <h2 id="find-by-mobile" style={hStyle}>Find Your EPIC Number by Mobile Number</h2>
            <p style={pStyle}>
              Search by Mobile works only if a mobile number is already registered against your voter record, and the ECI restricts each voter to one linked mobile number at a time.
            </p>
            <NumberedSteps steps={[
              { title: 'Open Search by Mobile', text: 'On electoralsearch.eci.gov.in, select the Search by Mobile tab.' },
              { title: 'Select state and language', text: 'Choose these from the drop-down list.' },
              { title: 'Enter your registered mobile number', text: 'Type the number you believe is linked to your voter record, and complete the captcha.' },
              { title: 'Verify the OTP', text: 'Enter the OTP sent to that number and submit.' },
              { title: 'View your EPIC number', text: 'Your voter details, including your EPIC number, load once the OTP is verified.' },
            ]} />
            <p style={pStyle}>
              There is no separate SMS shortcode that texts back your EPIC number on request. The mobile number in this flow is only used to verify you through an OTP; the number itself is still read off the on-screen result, not delivered by text.
            </p>

            {/* SECTION: Find by Aadhaar */}
            <h2 id="find-by-aadhaar" style={hStyle}>Find Your EPIC Number Using Your Aadhaar Card</h2>
            <p style={pStyle}>
              There is no direct &quot;search by Aadhaar number&quot; field on the public electoral roll search tool, so this route only works if your Aadhaar is already linked to your EPIC.
            </p>
            <p style={pStyle}>
              If it is linked, logging in to voters.eci.gov.in using Aadhaar-based OTP opens your voter account directly, and your EPIC number is shown on your profile without any separate search step.
            </p>
            <p style={pStyle}>
              If your Aadhaar isn&apos;t linked yet, use Search by Details or Search by Mobile to find your EPIC number first, then link Aadhaar afterward through Form 6B, covered in the next section.
            </p>

            {/* SECTION: Download e-EPIC */}
            <h2 id="download-e-epic" style={hStyle}>How to Download Your Voter ID (e-EPIC) Using Your EPIC Number</h2>
            <p style={pStyle}>
              Once you have your EPIC number, downloading the digital Voter ID takes under five minutes and costs nothing.
            </p>
            <NumberedSteps steps={[
              { title: 'Log in to the Voters’ Service Portal', text: 'Go to voters.eci.gov.in and click Login. First-time users sign up with their mobile number and an OTP; returning users can also use a saved password.' },
              { title: 'Open the e-EPIC Download tab', text: 'This appears on your dashboard once you’re logged in.' },
              { title: 'Choose EPIC No. or Form Reference No.', text: 'Use EPIC No. if you already have your Voter ID number, or Form Reference No. if you recently applied and are still waiting on a card.' },
              { title: 'Enter the number and select your state', text: 'Then click Search.' },
              { title: 'Verify your details and send OTP', text: 'Confirm the details shown match you, then click Send OTP.' },
              { title: 'Enter the OTP and verify', text: 'Type the OTP sent to your registered mobile and click Verify.' },
              { title: 'Download the e-EPIC', text: 'Click Download e-EPIC to save the PDF.' },
            ]} />
            <p style={pStyle}>
              The downloaded file is password-protected: the password is your date of birth in DDMMYYYY format. A voter born on 15 May 1992 would use 15051992 to open the PDF.
            </p>
            <p style={pStyle}>
              The Election Commission treats e-EPIC as carrying the same validity as the physical card for identification and voting, so a printed or on-screen copy works at the polling booth the same way the plastic card does.
            </p>

            {/* SECTION: Aadhaar linking */}
            <h2 id="aadhaar-linking" style={hStyle}>How to Link Aadhaar with Your EPIC Number</h2>
            <p style={pStyle}>
              Aadhaar-EPIC linking is handled through Form 6B, &quot;Letter of Information of Aadhaar Number for the Purpose of Electoral Roll Authentication,&quot; and remains voluntary, following the clarification the Election Commission gave the Supreme Court on this point.
            </p>
            <BulletList items={[
              <span key="ad1"><strong>Online:</strong> Submit Form 6B on <Link href={VOTERS_PORTAL} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>voters.eci.gov.in</Link>, entering your EPIC number and Aadhaar number.</span>,
              <span key="ad2"><strong>Voter Helpline App:</strong> The same Form 6B submission is available inside the ECI&apos;s official mobile app.</span>,
              <span key="ad3"><strong>SMS:</strong> Send ECILINK, followed by your EPIC number and Aadhaar number, to 51969 or 166.</span>,
              <span key="ad4"><strong>Phone:</strong> Call the National Voter Helpline at 1950 and provide your EPIC and Aadhaar details.</span>,
              <span key="ad5"><strong>In person:</strong> Hand a filled Form 6B to your local Booth Level Officer (BLO).</span>,
            ]} />

            {/* SECTION: Duplicate EPIC */}
            <h2 id="duplicate-epic" style={hStyle}>Duplicate EPIC Numbers: What the Election Commission Fixed in 2025-26</h2>
            <p style={pStyle}>
              Opposition parties, including West Bengal Chief Minister Mamata Banerjee and the Congress, flagged that many voters across different states shared identical EPIC numbers, raising questions about the electoral roll&apos;s integrity.
            </p>
            <p style={pStyle}>
              The Election Commission clarified that identical numbers across states came from a decentralized, manual numbering system different state offices used independently since 2005, before the ERONET database consolidated everything under one platform. It stated this does not indicate duplicate or fake voters.
            </p>
            <p style={pStyle}>
              The Commission committed to reissuing a fresh, unique EPIC number to every affected elector through the ERONET 2.0 upgrade, and has reported substantial progress resolving what it describes as a nearly 20-year-old numbering overlap.
            </p>

            {/* SECTION: Troubleshooting */}
            <h2 id="troubleshooting" style={hStyle}>What to Do if Your EPIC Number Is Not Found or OTP Fails</h2>
            <InfoTable
              caption="Common EPIC search and OTP issues: cause and fix"
              headers={['Issue', 'Likely Cause', 'Fix']}
              rows={[
                ['Search by Details returns no match', 'Name, DOB, or state doesn’t exactly match the roll, or your constituency changed', 'Re-check spelling carefully; try without district/constituency filters first, then narrow down'],
                ['Search by Mobile shows no record', 'Mobile number was never linked, or was linked to a different family member’s EPIC', 'Switch to Search by Details, then link this mobile number via Form 8 afterward'],
                ['OTP never arrives', 'Registered mobile number is inactive, changed, or was never updated on the roll', 'File Form 8 under Correction of Entries to update your mobile number, or visit your local ERO office'],
                ['e-EPIC download shows blank details', 'EPIC number entered doesn’t match the selected state', 'Recheck the state field; EPIC letter-series overlaps mean the same number string can exist in more than one state'],
                ['Portal slow or times out', 'Heavy traffic during an active SIR window in your state', 'Retry outside peak hours (early morning or late evening), or use the Voter Helpline App instead'],
              ]}
            />

            {/* SECTION: Uses */}
            <h2 id="uses" style={hStyle}>What You Need Your EPIC Number For</h2>
            <p style={pStyle}>
              The EPIC number comes up far more often than just on election day.
            </p>
            <BulletList items={[
              'Searching your name and polling station on the electoral roll.',
              'Downloading or reprinting your e-EPIC.',
              'Tracking a Voter ID application or correction request.',
              'Updating your address, photo, or other details through Form 8.',
              'Verifying your registration status during a Special Intensive Revision.',
              'Using your Voter ID as an identity and address proof for banking, loan, and investment KYC, where it is one of the documents accepted under RBI’s KYC framework.',
            ]} />
            <p style={pStyle}>
              Once your KYC documents, including your Voter ID, are in order for a new account or investment, the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP Calculator</Link> is a quick next step for deciding how much to invest monthly once the account itself is active.
            </p>

            {/* SECTION: Which method */}
            <h2 id="which-method" style={hStyle}>Quick Reference: Which Method Should You Use?</h2>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Have your card in hand:</strong> read the EPIC number directly off the front of the card, no portal needed.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Lost the card, remember your details:</strong> use Search by Details on electoralsearch.eci.gov.in with your name, DOB, and state.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Mobile number already linked:</strong> use Search by Mobile for a faster, OTP-verified lookup.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Aadhaar already linked:</strong> log in to voters.eci.gov.in with Aadhaar OTP to see your EPIC number on your profile directly.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Need a fresh digital copy:</strong> once you have the EPIC number, download e-EPIC from voters.eci.gov.in and open it with your DOB in DDMMYYYY format.
              </li>
            </ol>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: EPIC Number and Voter ID</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="epic-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>EPIC Quick Reference</div>
              {([
                ['EPIC length', '10 characters'],
                ['Format', '3 letters + 7 digits'],
                ['e-EPIC PDF password', 'DOB in DDMMYYYY'],
                ['Aadhaar link form', 'Form 6B'],
                ['Correction form', 'Form 8'],
                ['Aadhaar link by SMS', '51969 or 166'],
                ['Toll-free helpline', '1950'],
                ['Official app', 'Voter Helpline App'],
                ['Roll search portal', 'electoralsearch.eci.gov.in'],
                ['Services portal', 'voters.eci.gov.in'],
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
                <Link href="/calculators/personal-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Personal Loan Eligibility</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>SIP Calculator</span>
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
                ['/blogs/gst-number-search', 'GST Number Search: Verify a GSTIN Online'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date FY 2025-26'],
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
        .epic-sidebar::-webkit-scrollbar { width: 5px; }
        .epic-sidebar::-webkit-scrollbar-track { background: transparent; }
        .epic-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .epic-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { AnnapurnaLanguageSwitcher } from '../../../components/AnnapurnaLanguageSwitcher';

export const metadata: Metadata = {
  title: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal',
  description: 'Annapurna Bhandar Scheme 2026 full guide for West Bengal women: eligibility, how to apply online and offline, both instalment dates, status check, NPCI Aadhaar bank-seeding, the SIR 2026 exclusion rules, and why the scheme replaced Lakshmir Bhandar. Application closes 25 August 2026.',
  alternates: {
    canonical: 'https://fermor.in/blogs/annapurna-bhandar-2026',
    languages: {
      'en-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026',
      'bn-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-bn',
      'hi-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-hi',
      'ur-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-ur',
      'ne-IN': 'https://fermor.in/blogs/annapurna-bhandar-2026-ne',
      'x-default': 'https://fermor.in/blogs/annapurna-bhandar-2026',
    },
  },
  openGraph: {
    title: 'Annapurna Bhandar 2026: Online Apply, Status Check & Eligibility',
    description: '₹3,000 per month for eligible women in West Bengal via DBT. Both instalment dates, who can apply, who cannot, SIR 2026 exclusions, and payment guide.',
    type: 'article',
    publishedTime: '2026-06-28T19:20:00+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Annapurna Bhandar', 'West Bengal', 'Government Scheme', 'Women Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annapurna Bhandar 2026: Apply, Status & Eligibility',
    description: '₹3,000/month for WB women. Application closes Aug 25, 2026. Both instalment dates, eligibility, status check, form download.',
  },
  keywords: [
    'annapurna bhandar', 'annapurna bhandar 2026', 'annapurna bhandar status check',
    'annapurna bhandar online apply', 'annapurna bhandar portal', 'annapurna bhandar eligibility',
    'annapurna bhandar form', 'annapurna yojana west bengal', 'annapurna bhandar beneficiary list',
    'annapurna vandar', 'annopurna bhandar', 'annapurna bhandar application last date',
    'annapurna bhandar payment date', 'lakshmir bhandar annapurna bhandar',
    'annapurna bhandar status check online', 'wb annapurna scheme 2026',
    'annapurna bhandar 2nd instalment', 'annapurna bhandar second instalment date',
    'sir 2026 west bengal', 'matri shakti bharosa card', 'annapurna bhandar aadhaar seeding',
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal',
  description: 'Complete guide to the Annapurna Bhandar Scheme 2026 in West Bengal, covering eligibility, how to apply online and offline, both instalment dates, status check, NPCI Aadhaar bank-seeding, the SIR 2026 exclusion rules, beneficiary list, and the political origin of the scheme.',
  datePublished: '2026-06-28T19:20:00+05:30',
  dateModified: '2026-07-05T01:55:00+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  workTranslation: [
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026-bn', inLanguage: 'bn-IN', name: 'অন্নপূর্ণা ভান্ডার ২০২৬' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026-hi', inLanguage: 'hi-IN', name: 'अन्नपूर्णा भंडार 2026' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026-ur', inLanguage: 'ur-IN', name: 'انپورنا بھنڈار 2026' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/annapurna-bhandar-2026-ne', inLanguage: 'ne-IN', name: 'अन्नपूर्णा भण्डार २०२६' },
  ],
  about: [
    { '@type': 'Thing', name: 'Annapurna Bhandar Scheme', description: 'West Bengal government women welfare scheme providing ₹3,000 per month via DBT' },
    { '@type': 'Place', name: 'West Bengal', description: 'Indian state implementing the Annapurna Bhandar scheme' },
  ],
  keywords: 'annapurna bhandar 2026, annapurna bhandar status check, annapurna bhandar online apply, annapurna bhandar eligibility, annapurna bhandar portal, annapurna bhandar second instalment, sir 2026',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Annapurna Bhandar 2026', item: 'https://fermor.in/blogs/annapurna-bhandar-2026' },
  ],
};

const faqItems = [
  { q: 'What is the Annapurna Bhandar scheme?', a: 'Annapurna Bhandar is a West Bengal government welfare scheme that pays ₹3,000 per month to eligible women between ages 25 and 60 through Direct Bank Transfer (DBT). Launched on 3 June 2026, it replaced the Lakshmir Bhandar Scheme and grew from 28.26 lakh beneficiaries at first payment to over 1 crore within a month, on its way to a targeted 2 crore.' },
  { q: 'Why did West Bengal launch Annapurna Bhandar?', a: 'Annapurna Bhandar traces back to the Matri Shakti Bharosa Card, a guarantee card the BJP distributed during its Bhorosha\'r Shopoth campaign ahead of the April-May 2026 West Bengal assembly election. After the BJP won a landslide 207 of 294 seats, ending 15 years of TMC rule, Suvendu Adhikari was sworn in as the state\'s first-ever BJP Chief Minister on 9 May 2026, and the campaign guarantee was converted into this official DBT scheme, replacing the TMC-era Lakshmir Bhandar.' },
  { q: 'What is SIR 2026 and how does it affect Annapurna Bhandar eligibility?', a: 'SIR 2026 is the Special Intensive Revision of West Bengal\'s electoral rolls, an exercise that removed over 9 million voters from the rolls ahead of the 2026 assembly election. The same SIR data now determines which existing Lakshmir Bhandar beneficiaries are excluded from automatic migration to Annapurna Bhandar: anyone flagged as dead, shifted, deleted, or an absentee elector during SIR loses automatic migration and must reapply.' },
  { q: 'How to check Annapurna Bhandar application status?', a: 'Check your Annapurna Bhandar application status at socialregistry.wb.gov.in/citizen by entering your application number or Aadhaar number in the Status Check section. You can also check at the Duare Sarkar camp or gram panchayat office where you submitted the form.' },
  { q: 'How to apply online for Annapurna Bhandar 2026?', a: 'Apply online at socialregistry.wb.gov.in: click New Registration, enter your Aadhaar number, verify with OTP, fill in personal and bank details, upload documents (Aadhaar, bank passbook, voter ID, passport photo), and submit. Save the acknowledgement number for status tracking.' },
  { q: 'What is the last date to apply for Annapurna Bhandar 2026?', a: 'The last date to apply for Annapurna Bhandar 2026 is 25 August 2026. The application window opened on 27 May 2026, giving a 90-day window to apply online or offline.' },
  { q: 'Who is eligible for Annapurna Bhandar scheme?', a: 'To be eligible for Annapurna Bhandar, you must be a woman, a permanent resident of West Bengal, and between 25 and 60 years of age. You must not be an income taxpayer, a government employee (permanent or retired), or receive any salary or pension from the government or government-aided institutions.' },
  { q: 'How much money does Annapurna Bhandar give?', a: "Annapurna Bhandar gives ₹3,000 per month, totalling ₹36,000 per year, directly to the beneficiary's Aadhaar-linked bank account through DBT. Payments started from 3 June 2026." },
  { q: 'Will Lakshmir Bhandar beneficiaries automatically get Annapurna Bhandar?', a: 'Most existing Lakshmir Bhandar beneficiaries are automatically migrated to Annapurna Bhandar without a new application. Those marked ASDD (Absent, Shifted, Dead, or Duplicate) during voter slip distribution, removed during SIR 2026, or deleted after adjudication must apply fresh. One exception: beneficiaries deleted during SIR who have a pending CAA citizenship case before a tribunal continue receiving benefits.' },
  { q: 'How to download Annapurna Bhandar form?', a: 'Download the Annapurna Bhandar application form from socialregistry.wb.gov.in in English, Bengali, or Hindi. Physical forms are also distributed free at Duare Sarkar camps, gram panchayat offices, and municipal ward offices.' },
  { q: 'How to check Annapurna Bhandar beneficiary list?', a: 'The beneficiary list is at socialregistry.wb.gov.in/citizen under Beneficiary List. Search by district, block, and gram panchayat. Lists are also posted at gram panchayat offices and updated every 7 days per the Women and Child Welfare Department guidelines.' },
  { q: 'When is the Annapurna Bhandar payment date?', a: "Annapurna Bhandar payments began on 3 June 2026 and are made monthly via DBT to the beneficiary's Aadhaar-linked bank account. Check your bank passbook or the official portal for the exact monthly credit date." },
  { q: 'Can I apply offline for Annapurna Bhandar?', a: 'Yes. Collect the form from a Duare Sarkar camp, gram panchayat office, or municipal ward office, fill it in, attach photocopies of required documents, and submit it at the same office. Get a written acknowledgement with your application number.' },
  { q: 'What is the Annapurna Bhandar portal?', a: 'The Annapurna Bhandar portal is socialregistry.wb.gov.in, managed by the Women and Child Welfare Department of West Bengal. Citizens use socialregistry.wb.gov.in/citizen for applications, status checks, and beneficiary list verification.' },
  { q: 'Why was my Annapurna Bhandar application rejected?', a: 'Common rejection reasons include age outside the 25 to 60 range, being an income taxpayer, being a government employee or pensioner, Aadhaar not linked to a bank account, name mismatch between Aadhaar and bank records, or a duplicate application. Visit your gram panchayat office to get the specific reason and reapply after fixing the issue.' },
  { q: "Is Annapurna Bhandar the same as the Central Government's Annapurna Scheme?", a: "No. The Central Government's Annapurna Scheme, run under the National Social Assistance Programme since 1 April 2000, provides 10 kg of free food grain per month to destitute senior citizens above 65 years who qualify for the Indira Gandhi National Old Age Pension Scheme but are not yet receiving it. West Bengal's Annapurna Bhandar is a cash transfer of ₹3,000 per month for women aged 25 to 60. They share only the name." },
  { q: 'Is the Annapurna Bhandar benefit taxable?', a: 'Income taxpayers are not eligible for Annapurna Bhandar, so the question rarely applies. For non-taxpayer beneficiaries, the welfare payment is treated as a government welfare benefit, not taxable employment income.' },
  { q: 'Has the second Annapurna Bhandar instalment been credited?', a: 'Yes. The second instalment was credited on 1 July 2026 to around 1.1 to 1.3 crore women, up from 28.26 lakh women who received the first instalment on 3 June 2026. The second disbursement was announced at a programme at Netaji Indoor Stadium, Kolkata.' },
  { q: 'Is socialregistry.wb.gov.in the same as socialsecurity.wb.gov.in?', a: 'Yes, for practical purposes. socialsecurity.wb.gov.in redirects to socialregistry.wb.gov.in, which is the official portal for Annapurna Bhandar applications, status checks, and the beneficiary list. Use either address; both land on the same Citizen Portal.' },
  { q: 'What is the Annapurna Bhandar helpline number?', a: 'West Bengal has not published a dedicated helpline number or email address for Annapurna Bhandar. For application queries, status issues, or delayed payments, visit the nearest BDO office, municipality, municipal corporation, or Duare Sarkar camp in person.' },
  { q: 'Is there any fee to apply for Annapurna Bhandar?', a: 'No. The application is completely free: no fee for online or offline submission and no charges for collecting the form.' },
  { q: 'What if my Aadhaar is not linked to a mobile number?', a: 'You can apply offline at a Duare Sarkar camp or gram panchayat office without OTP verification. However, your bank account must still be Aadhaar-seeded for the DBT payment to reach you.' },
  { q: 'Can a widow apply for Annapurna Bhandar?', a: 'Yes, a widow can apply as long as she is aged 25 to 60, is a permanent West Bengal resident, is not an income taxpayer, and does not receive any government salary or pension.' },
  { q: 'Can I apply if I already receive other state welfare benefits?', a: 'Yes. Receiving other state welfare benefits does not automatically disqualify you. The specific exclusions are income taxpayers, government employees or pensioners, and employees of government-aided institutions.' },
  { q: 'What is the ASDD flag and why does it matter?', a: 'ASDD stands for Absent, Shifted, Dead, or Duplicate, a classification used during voter slip distribution under the Special Intensive Revision (SIR) 2026. If you were marked ASDD, you were removed from the Lakshmir Bhandar roll and will not be automatically migrated. Visit your BDO office with identity documents to get the flag cleared.' },
  { q: 'What if the name on my Aadhaar and voter ID do not match?', a: 'Correct the mismatch before applying, as both documents must show the same name. Update the name in Aadhaar via the UIDAI portal (uidai.gov.in) or at an Aadhaar enrolment centre. Once updated, apply for the scheme.' },
  { q: 'Can a woman who has turned 60 still apply?', a: 'No. The upper age limit is 60 years at the time of application. Women who have completed their 60th birthday are outside the eligible age range.' },
  { q: 'What happens if I turn 60 after already being enrolled?', a: 'Scheme rules on continued eligibility after crossing the age limit should be confirmed with the Women and Child Welfare Department directly. As per the current guidelines, the age condition applies at the point of application.' },
  { q: 'How long does it take for an application to get approved?', a: 'Verification timelines vary by district and block office workload. Typically, applications move through submitted, under verification, and verified stages within 2 to 4 weeks. If your status has not changed in 15 days, visit the gram panchayat to follow up.' },
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply Online for Annapurna Bhandar 2026',
  description: 'Step-by-step guide to apply online for the Annapurna Bhandar scheme on the Social Registry West Bengal portal',
  totalTime: 'PT20M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Open the portal', text: 'Visit the Social Registry West Bengal portal at socialregistry.wb.gov.in.' },
    { '@type': 'HowToStep', position: 2, name: 'Click New Registration', text: 'Select the Annapurna Bhandar scheme and click New Registration or Apply Now.' },
    { '@type': 'HowToStep', position: 3, name: 'Verify Aadhaar', text: 'Enter your 12-digit Aadhaar number and verify using the OTP sent to your Aadhaar-registered mobile number.' },
    { '@type': 'HowToStep', position: 4, name: 'Fill personal and bank details', text: 'Enter your name exactly as on Aadhaar, date of birth, full address, district, block, and gram panchayat or ward, and the bank account linked to your Aadhaar.' },
    { '@type': 'HowToStep', position: 5, name: 'Upload documents', text: 'Upload scanned copies of your Aadhaar card, bank passbook first page, voter ID, and a recent passport-size photograph.' },
    { '@type': 'HowToStep', position: 6, name: 'Submit and save acknowledgement', text: 'Review all details, submit the form, and save or print the acknowledgement slip with your application number.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/annapurna-bhandar-2026',
  name: 'Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility & Portal',
  url: 'https://fermor.in/blogs/annapurna-bhandar-2026',
  inLanguage: 'en-IN',
  datePublished: '2026-06-28T19:20:00+05:30',
  dateModified: '2026-07-05T01:55:00+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Annapurna Bhandar',
      alternateName: 'অন্নপূর্ণা ভান্ডার',
      description: 'Annapurna Bhandar is a West Bengal government women welfare scheme providing ₹3,000 per month through Direct Bank Transfer (DBT) to eligible women aged 25 to 60, launched on 3 June 2026.',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Government Welfare Scheme Terms',
        url: 'https://fermor.in/blogs',
      },
    },
    {
      '@type': 'DefinedTerm',
      name: 'SIR 2026',
      alternateName: 'Special Intensive Revision of Electoral Rolls 2026',
      description: 'An Election Commission exercise that revised West Bengal\'s voter rolls ahead of the 2026 assembly election, removing over 9 million voters. The same SIR data determines which Lakshmir Bhandar beneficiaries are excluded from automatic migration to Annapurna Bhandar.',
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Indian Government Welfare Scheme Terms',
        url: 'https://fermor.in/blogs',
      },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Women residents of West Bengal seeking government welfare benefits',
    geographicArea: { '@type': 'State', name: 'West Bengal', containedInPlace: { '@type': 'Country', name: 'India' } },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'What is Annapurna Bhandar' },
    { '@type': 'WebPageElement', cssSelector: '#instalments', name: 'Instalment Dates and Beneficiary Counts' },
    { '@type': 'WebPageElement', cssSelector: '#political-context', name: 'Why the Scheme Exists' },
    { '@type': 'WebPageElement', cssSelector: '#sir-2026', name: 'What Is SIR 2026' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#apply-online', name: 'How to Apply Online' },
    { '@type': 'WebPageElement', cssSelector: '#apply-offline', name: 'How to Apply Offline' },
    { '@type': 'WebPageElement', cssSelector: '#form-download', name: 'Form Download' },
    { '@type': 'WebPageElement', cssSelector: '#form-sections', name: 'What the Application Form Asks' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'Status Check' },
    { '@type': 'WebPageElement', cssSelector: '#status-meanings', name: 'Status Meanings' },
    { '@type': 'WebPageElement', cssSelector: '#beneficiary-list', name: 'Beneficiary List' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-migration', name: 'Lakshmir Migration' },
    { '@type': 'WebPageElement', cssSelector: '#aadhaar-linking', name: 'Aadhaar Linking' },
    { '@type': 'WebPageElement', cssSelector: '#rejection-reasons', name: 'Rejection Reasons' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'Scheme Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#central-scheme', name: 'Central Scheme Disambiguation' },
    { '@type': 'WebPageElement', cssSelector: '#financial-planning', name: 'Financial Planning' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors to act on those decisions.',
  knowsAbout: [
    'West Bengal Government Schemes',
    'DBT Direct Benefit Transfer India',
    'Women Welfare Schemes India',
    'SIR 2026 Electoral Rolls',
    'NPCI Aadhaar Seeding',
    'Personal Finance India',
    'Income Tax India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

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

const hStyle = {
  fontFamily: POPPINS,
  fontSize: 20,
  fontWeight: 600,
  color: C.dg,
  marginTop: 40,
  marginBottom: 14,
  letterSpacing: '-.015em',
} as React.CSSProperties;

const pStyle = {
  fontSize: 15.5,
  color: C.ink,
  lineHeight: 1.8,
  marginBottom: 20,
  fontFamily: INTER,
} as React.CSSProperties;

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Annapurna Bhandar 2026' },
  ];
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 6 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i < crumbs.length - 1 && crumb.href ? (
              <Link href={crumb.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12.5, color: C.ink3, textDecoration: 'none', fontFamily: INTER }}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" style={{ fontSize: 12.5, color: C.ink2, fontFamily: INTER }}>{crumb.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableWrap({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '20px 0', fontFamily: INTER }}>
      {label && (
        <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>{label}</span>
        </div>
      )}
      {children}
    </div>
  );
}

function SchemeHighlights() {
  const rows = [
    { label: 'Launched', value: '3 June 2026' },
    { label: 'Monthly Benefit', value: '₹3,000' },
    { label: 'Annual Benefit', value: '₹36,000' },
    { label: 'Eligible Age', value: '25 to 60 years' },
    { label: 'Who Benefits', value: 'Women of West Bengal' },
    { label: 'Nodal Authority', value: 'Women and Child Welfare Dept' },
    { label: 'Transfer Mode', value: 'DBT to Aadhaar-linked account' },
    { label: 'Application Opens', value: '27 May 2026' },
    { label: 'Application Closes', value: '25 August 2026' },
    { label: 'Official Portal', value: 'socialregistry.wb.gov.in' },
  ];
  return (
    <TableWrap label="Scheme at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, fontFamily: INTER, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: r.label === 'Application Closes' ? C.dg : C.dark, fontFamily: INTER, textAlign: 'right' as const }}>{r.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function InstalmentTable() {
  const rows = [
    { n: '1st Instalment', date: '3 June 2026', count: '28,25,769 women', amount: '₹3,000' },
    { n: '2nd Instalment', date: '1 July 2026', count: '~1.1 to 1.3 crore women', amount: '₹3,000' },
  ];
  return (
    <TableWrap label="Instalments Paid So Far">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 120px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Instalment</span>
            <span style={{ flex: '0 0 110px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Date</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Beneficiaries</span>
            <span style={{ flex: '0 0 90px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Amount</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.n} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 120px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER }}>{r.n}</span>
              <span style={{ flex: '0 0 110px', fontSize: 13, color: C.ink, fontFamily: INTER }}>{r.date}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.count}</span>
              <span style={{ flex: '0 0 90px', fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function StatusTable() {
  const rows = [
    { status: 'Submitted', meaning: 'Application received by the system', action: 'Wait for verification; check again in 7 days' },
    { status: 'Under Verification', meaning: 'Officials are checking your documents and eligibility', action: 'No action needed' },
    { status: 'Verified', meaning: 'Documents confirmed, approval in progress', action: 'Ensure your bank account is Aadhaar-linked' },
    { status: 'Approved', meaning: 'Enrolled as a beneficiary', action: 'Confirm Aadhaar seeding with your bank' },
    { status: 'Rejected', meaning: 'Application was not approved', action: 'Visit gram panchayat for the reason; fix and reapply' },
    { status: 'On Hold', meaning: 'A discrepancy in your records is blocking processing', action: 'Visit your gram panchayat or block office to resolve' },
    { status: 'Pending at BDO/SDO', meaning: 'Received but not yet reviewed by the verification officer', action: 'No action needed; check again after 15 to 30 days' },
    { status: 'Bank Account Invalid', meaning: 'The linked account is closed, a joint account, or the name does not match Aadhaar', action: 'Take your Aadhaar-linked passbook photocopy to the BDO office to fix it' },
    { status: 'Payment Not Received', meaning: 'Approved, but the amount has not been credited', action: 'Confirm Aadhaar-bank seeding, then visit the BDO office if still delayed' },
  ];
  return (
    <TableWrap label="Application Status Meanings">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 560 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 130px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Status</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>What It Means</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>What to Do</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.status} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 130px', fontSize: 13, fontWeight: 600, color: C.dg, fontFamily: INTER, lineHeight: 1.5 }}>{r.status}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.55, fontFamily: INTER }}>{r.meaning}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, lineHeight: 1.55, fontFamily: INTER }}>{r.action}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function LakshmirCompareTable() {
  const rows = [
    { feature: 'Launch Year', lm: '2021', ann: 'June 2026' },
    { feature: 'Monthly Benefit (final rate)', lm: '₹1,500 to ₹1,700', ann: '₹3,000 (all categories)' },
    { feature: 'Annual Benefit', lm: '₹18,000 to ₹20,400', ann: '₹36,000' },
    { feature: 'Eligible Age', lm: '25 to 60 years', ann: '25 to 60 years' },
    { feature: 'Transfer Method', lm: 'DBT', ann: 'DBT' },
    { feature: 'Current Status', lm: 'Discontinued', ann: 'Active' },
    { feature: 'Fresh Application', lm: 'Required', ann: 'Not required for most Lakshmir recipients' },
  ];
  return (
    <TableWrap label="Annapurna Bhandar vs Lakshmir Bhandar">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 520 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: '0 0 148px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Feature</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Lakshmir Bhandar</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.dg, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Annapurna Bhandar</span>
          </div>
          {rows.map((r, i) => (
            <div key={r.feature} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: '0 0 148px', fontSize: 13, color: C.ink3, fontFamily: INTER }}>{r.feature}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.lm}</span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: INTER }}>{r.ann}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function RejectionTable() {
  const rows = [
    { reason: 'Age outside 25 to 60 years', fix: 'Submit a birth certificate or school certificate to correct your recorded age at the gram panchayat' },
    { reason: 'Identified as an income taxpayer', fix: 'If you file but have zero net tax liability, check with the gram panchayat about whether you still qualify' },
    { reason: 'Government employee or pensioner', fix: 'If retired before the scheme launch and no longer receiving a pension, check eligibility at the block development office' },
    { reason: 'Aadhaar not linked to bank account', fix: 'Visit your bank branch with Aadhaar card and passbook and request Aadhaar seeding; then update your application on the portal' },
    { reason: 'Name mismatch (Aadhaar vs bank)', fix: 'Update your name in Aadhaar (via uidai.gov.in) or at the bank so both records match, then reapply' },
    { reason: 'Duplicate application submitted', fix: 'Only one application per Aadhaar is accepted; cancel the duplicate and keep one active application' },
    { reason: 'Not a permanent WB resident', fix: 'Update voter ID and address proof to reflect WB residency before reapplying' },
    { reason: 'ASDD flag from voter roll revision', fix: 'Visit the block development office with identity documents to get the flag cleared and apply fresh' },
  ];
  return (
    <TableWrap label="Common Rejection Reasons and Fixes">
      <div style={{ overflowX: 'auto' as const }}>
        <div style={{ minWidth: 500 }}>
          <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Rejection Reason</span>
            <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>How to Fix It</span>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
              <span style={{ flex: 1, fontSize: 13, color: C.ink, fontFamily: INTER, lineHeight: 1.55 }}>{r.reason}</span>
              <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.55 }}>{r.fix}</span>
            </div>
          ))}
        </div>
      </div>
    </TableWrap>
  );
}

function FormDownloads() {
  const forms = [
    { lang: 'English', native: null, href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20English%20Application%20Form.pdf' },
    { lang: 'Bengali', native: 'বাংলা', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Bengali%20Application%20Form.pdf' },
    { lang: 'Hindi', native: 'हिंदी', href: 'https://www.govtschemes.in/sites/default/files/2026-05/West%20Bengal%20Annapurna%20Bhandar%20Scheme%20Hindi%20Application%20Form.pdf' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '14px 0 20px' }}>
      {forms.map((f, i) => (
        <Link
          key={f.lang}
          href={f.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: i < forms.length - 1 ? `1px solid ${C.border}` : 'none',
            background: '#fff',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: 13.5, color: C.ink, fontFamily: INTER }}>
            Annapurna Bhandar Form{' '}
            <span style={{ color: C.ink3 }}>
              ({f.lang}{f.native ? ` / ${f.native}` : ''})
            </span>
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: C.dg, fontFamily: INTER, flexShrink: 0 }}>
            PDF
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.dg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'SIP Calculator', desc: 'See what ₹1,000–₹3,000/month grows to over 10 years', href: '/calculators/sip-calculator' },
    { label: 'PPF Calculator', desc: 'A guaranteed-return option for part of the ₹3,000 benefit', href: '/calculators/ppf-calculator' },
    { label: 'Emergency Fund Calculator', desc: 'How many months of expenses ₹3,000/month can build', href: '/calculators/emergency-fund-calculator' },
    { label: 'Income Tax Calculator', desc: 'Check whether you count as an income taxpayer', href: '/calculators/income-tax-calculator' },
    { label: 'Home Loan Eligibility', desc: 'How extra monthly income affects your loan eligibility', href: '/calculators/home-loan-eligibility-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </div>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/income-tax-slabs-fy-2025-26', label: 'Income Tax Slabs FY 2025-26: New and Old Regime Rates' },
    { href: '/blogs/epfo-8-25-percent-interest-rate-fy26', label: 'EPFO 8.25% Interest Rate: Credit Starts Now' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

function KeyDates() {
  const dates = [
    { label: 'Scheme launched', date: '3 Jun 2026' },
    { label: 'Application opens', date: '27 May 2026' },
    { label: 'Application closes', date: '25 Aug 2026', urgent: true },
    { label: 'First payment', date: '3 Jun 2026' },
    { label: 'List update cycle', date: 'Every 7 days' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Key Dates</span>
      </div>
      {dates.map((item, i) => (
        <div key={item.label} style={{ padding: '10px 16px', borderBottom: i < dates.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: item.urgent ? C.dg : C.dark, fontFamily: POPPINS }}>{item.date}</span>
        </div>
      ))}
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 13, marginBottom: 12, alignItems: 'flex-start', fontFamily: INTER }}>
      <span style={{
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: '#E9ECEE', border: '1px solid #D3D7DA',
        color: '#101214',
        fontSize: 11.5,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
      }}>{n}</span>
      <span style={{ fontSize: 15, color: C.ink, lineHeight: 1.65 }}>{children}</span>
    </div>
  );
}

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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> All scheme details are based on official information issued by the Women and Child Welfare Department, Government of West Bengal. Eligibility rules and application dates may change. Verify current information at wb.gov.in or your gram panchayat office before applying. This article is for informational purposes only.
      </p>
    </div>
  );
}

export default function AnnapurnaBhandarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      {/* Article header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: C.dg,
              fontFamily: INTER,
              background: C.paleDg,
              padding: '3px 10px',
              borderRadius: 4,
            }}>Government Schemes</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            Annapurna Bhandar 2026: Online Apply, Status Check, Eligibility and Portal
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            ₹3,000 per month for eligible women in West Bengal, paid via DBT. Two instalments have been credited so far, on 3 June and 1 July 2026, reaching over 1 crore women. Applications remain open until 25 August 2026.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime="2026-07-05T01:55:00+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 5, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>18 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties}
          className="article-grid"
        >

          {/* Article body */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              West Bengal launched the Annapurna Bhandar Scheme on 3 June 2026, replacing the Lakshmir Bhandar Scheme. Eligible women aged 25 to 60 receive ₹3,000 per month directly to their Aadhaar-linked bank account through DBT.
            </p>
            <p style={pStyle}>
              Two instalments have been paid so far, on 3 June and 1 July 2026, taking coverage from 28.26 lakh to over 1 crore women. Applications remain open online and offline until 25 August 2026.
            </p>

            <AnnapurnaLanguageSwitcher
              current="en"
              heading="This guide is available in 5 languages"
              subtext="Read it in whichever language you're most comfortable with. All five cover the same eligibility rules, dates, and steps."
            />

            <h2 id="what-is" style={hStyle}>What is the Annapurna Bhandar Scheme?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Annapurna Bhandar is a West Bengal government scheme that pays ₹3,000 a month to eligible women aged 25 to 60, through Direct Benefit Transfer to their Aadhaar-linked bank account, with no application fee.
              </p>
            </div>
            <p style={pStyle}>
              In Bengali it is written অন্নপূর্ণা ভান্ডার, and is also commonly spelled Annapurna Vandar or Annopurna Bhandar in search.
            </p>
            <p style={pStyle}>
              Annapurna Bhandar replaced the Lakshmir Bhandar Scheme, which paid ₹1,500 to ₹1,700 per month by the time it was phased out, roughly doubling the monthly benefit. Existing Lakshmir Bhandar beneficiaries do not need to apply again; most are automatically migrated.
            </p>

            <h2 id="instalments" style={hStyle}>Instalment Dates: How Many Women Have Been Paid So Far</h2>
            <p style={pStyle}>
              Two instalments have reached beneficiaries so far. The first credited 28,25,769 women on 3 June 2026. The second reached roughly 1.1 to 1.3 crore women on 1 July 2026, announced at a programme at Netaji Indoor Stadium in Kolkata.
            </p>
            <InstalmentTable />
            <p style={pStyle}>
              Coverage more than quadrupled within a month of launch. Around 1.6 crore applications have been received in total, of which about 26 lakh were rejected, mostly over citizenship or SIR-related deletion issues without a pending CAA tribunal case.
            </p>

            <h2 id="political-context" style={hStyle}>Why Annapurna Bhandar Exists: The Political Backstory</h2>
            <p style={pStyle}>
              Annapurna Bhandar exists because the BJP won West Bengal&apos;s April-May 2026 assembly election and turned a campaign guarantee into government policy. The BJP took 207 of 294 seats, ending 15 years of TMC rule under Mamata Banerjee.
            </p>
            <p style={pStyle}>
              Suvendu Adhikari was sworn in as West Bengal&apos;s first-ever BJP Chief Minister on 9 May 2026. During the campaign, the BJP had distributed a guarantee card called the Matri Shakti Bharosa Card under its Bhorosha&apos;r Shopoth (Pledge of Trust) manifesto, promising ₹3,000 a month to women. After forming the government, that card became the official Annapurna Bhandar DBT scheme, replacing the TMC-era Lakshmir Bhandar Scheme.
            </p>
            <p style={pStyle}>
              Knowing this origin matters for one practical reason: it explains why eligibility is tied so closely to voter roll data rather than only income or residency proof, which is covered next.
            </p>

            <h2 id="sir-2026" style={hStyle}>What Is SIR 2026 and Why It Affects Your Eligibility</h2>
            <p style={pStyle}>
              SIR 2026 is the Special Intensive Revision of West Bengal&apos;s electoral rolls, an Election Commission exercise carried out ahead of the 2026 assembly election. It removed more than 9 million voters from the rolls statewide.
            </p>
            <p style={pStyle}>
              That same SIR data is now the basis for deciding which existing Lakshmir Bhandar beneficiaries carry over to Annapurna Bhandar automatically. Anyone identified during SIR as dead, shifted, deleted, or an absentee elector, or later marked ASDD (Absent, Shifted, Dead, or Duplicate) during voter slip distribution, loses automatic migration and must apply fresh if still eligible.
            </p>
            <p style={pStyle}>
              One exception softens this: women deleted from the rolls during SIR who have since applied for citizenship under the CAA, and whose case is still pending before a tribunal, continue receiving benefits without interruption.
            </p>

            <h2 id="eligibility" style={hStyle}>Eligibility: Who Can and Cannot Apply</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              To qualify for Annapurna Bhandar, you must be a woman aged 25 to 60 and a permanent resident of West Bengal, and you must not be an income taxpayer or government employee. All three conditions must be true:
            </p>
            <BulletList
              items={[
                'You are a woman',
                'You are a permanent resident of West Bengal',
                'You are between 25 and 60 years of age',
              ]}
            />
            <p style={{ ...pStyle, marginBottom: 10 }}>You are <strong style={{ fontWeight: 700, color: C.dark }}>not eligible</strong> if any of the following applies:</p>
            <BulletList
              items={[
                <span key="e1">You are an income taxpayer (file and pay income tax). Not sure where you stand? Run your numbers through the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Calculator</Link> before applying.</span>,
                'You are a permanent or retired government employee',
                'You receive a salary or pension from the state or central government, panchayats, statutory bodies, local bodies, municipalities, or government-aided educational institutions',
                'You are a teaching or non-teaching employee at a government-aided educational institution in West Bengal',
              ]}
            />

            <h2 id="documents" style={hStyle}>Documents Required</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>These four documents are required for every application:</p>
            <BulletList
              items={[
                'Aadhaar card',
                'Bank passbook: first page showing account number and Aadhaar seeding status',
                'Voter ID card (proof of West Bengal residency)',
                'Recent passport-size photograph',
              ]}
            />
            <p style={pStyle}>Some offices may additionally ask for a ration card or a birth certificate or school leaving certificate as supporting proof of age. Carry photocopies of all documents when submitting offline.</p>

            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>Application closes 25 August 2026.</strong> The window opened on 27 May 2026, giving 90 days to apply. There is no confirmed second phase. Apply early to leave time for status corrections.
            </Callout>

            <h2 id="apply-online" style={hStyle}>How to Apply for Annapurna Bhandar Online</h2>
            <div style={{ margin: '18px 0 24px' }}>
              <Step n={1}>
                Visit the Social Registry West Bengal portal at{' '}
                <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in</Link>.
              </Step>
              <Step n={2}>Click <strong style={{ fontWeight: 600 }}>New Registration</strong> and select the Annapurna Bhandar scheme from the list.</Step>
              <Step n={3}>Enter your 12-digit Aadhaar number and verify using the OTP sent to your Aadhaar-registered mobile number. Your mobile must be linked to Aadhaar for this step.</Step>
              <Step n={4}>Fill in your personal details: name exactly as on your Aadhaar card, date of birth, full address, district, block, and gram panchayat or ward number.</Step>
              <Step n={5}>Enter your bank account number and IFSC code. This account must already be Aadhaar-seeded for DBT payments to arrive.</Step>
              <Step n={6}>Upload scanned copies or clear photos of your Aadhaar card, bank passbook first page, voter ID, and passport photograph.</Step>
              <Step n={7}>
                Review all details carefully, then submit. <strong style={{ fontWeight: 600 }}>Save or print the acknowledgement slip</strong>: it contains your application number, which is the only way to track your status online.
              </Step>
            </div>

            <h2 id="apply-offline" style={hStyle}>How to Apply Offline</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>If you cannot apply online, visit any of the following locations with your original documents and photocopies:</p>
            <BulletList
              items={[
                'Duare Sarkar camp (when active in your area)',
                'Gram panchayat office (rural areas)',
                'Municipal corporation or ward office (urban areas)',
              ]}
            />
            <p style={pStyle}>Collect the form at the office, fill it in block letters, attach document photocopies, and submit. Always ask for a written acknowledgement with your application number. Without it, you cannot track your status.</p>

            <h2 id="form-download" style={hStyle}>Annapurna Bhandar Form: Download</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              The application form is available as a direct PDF download in English, Bengali, and Hindi, or from the{' '}
              <Link href="https://socialregistry.wb.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Social Registry West Bengal portal</Link>{' '}
              itself. Physical forms are also available free at Nabanna, Duare Sarkar camps, gram panchayat offices, and municipal ward offices.
            </p>
            <FormDownloads />
            <p style={pStyle}>
              Fill the form in block letters. The name you enter must match your Aadhaar card exactly, including spelling. A mismatch is one of the most common reasons for rejection.
            </p>

            <h2 id="form-sections" style={hStyle}>What the Application Form Asks For</h2>
            <p style={pStyle}>
              The form is organised into seven sections covering your full household, not just your own details.
            </p>
            <BulletList
              items={[
                <span key="f1"><strong>Family identity:</strong> Head of Family details, Digital Ration Card household ID, family members, bank account and EPIC (voter ID) details for everyone in the household.</span>,
                <span key="f2"><strong>Ration card and food subsidy:</strong> whether the family holds a Digital Ration Card and lifts monthly ration from a Fair Price Shop.</span>,
                <span key="f3"><strong>Assets:</strong> house, landholdings, vehicles, and insurance owned by the family.</span>,
                <span key="f4"><strong>Income and profession:</strong> whether any family member pays income tax, holds a constitutional post, is an MP, MLA, or local body representative, is a government pensioner, or is GST-registered, plus PAN details and total annual family income.</span>,
                <span key="f5"><strong>Other identity documents:</strong> CAA application status, other ID cards, and details of any case pending before a tribunal related to SIR 2026 deletion.</span>,
                <span key="f6"><strong>Social status and dependents:</strong> children in the family attending school, and their vaccination status.</span>,
                <span key="f7"><strong>Declaration and consent:</strong> signature or thumb impression confirming everything entered is accurate.</span>,
              ]}
            />
            <p style={{ ...pStyle, marginBottom: 10 }}>Six points prevent the most common rejections and delays:</p>
            <BulletList
              items={[
                'Write your name and date of birth (DD/MM/YYYY) exactly as they appear on your Aadhaar card.',
                'Enter your permanent address with PIN code exactly as shown on your residence proof.',
                'Provide your active, Aadhaar-linked bank account number, bank name, and IFSC code.',
                'Fill in annual family income accurately, and attach an income certificate if the office asks for one.',
                'Read the declaration carefully before signing or adding a thumb impression.',
                'Double-check every entry for spelling mistakes or mismatches before submitting.',
              ]}
            />

            <h2 id="status-check" style={hStyle}>How to Check Your Annapurna Bhandar Application Status</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              Check your status at{' '}
              <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>socialregistry.wb.gov.in/citizen</Link>
              {' '}by entering your application number or Aadhaar number. The steps:
            </p>
            <div style={{ margin: '4px 0 16px' }}>
              <Step n={1}>Go to the citizen portal at socialregistry.wb.gov.in/citizen.</Step>
              <Step n={2}>Click <strong style={{ fontWeight: 600 }}>Application Status</strong> or <strong style={{ fontWeight: 600 }}>Check Status</strong> in the menu.</Step>
              <Step n={3}>Enter your application number (from the acknowledgement slip) or your Aadhaar number.</Step>
              <Step n={4}>Your current status will appear on screen. If it shows Rejected or On Hold, visit your gram panchayat for the specific reason.</Step>
            </div>
            <p style={pStyle}>
              Without internet access, check in person at the gram panchayat office or the Duare Sarkar camp where you applied. West Bengal has not published a dedicated Annapurna Bhandar helpline number or email; in-person visits to the BDO or municipal office remain the only channel for unresolved queries.
            </p>

            <h2 id="status-meanings" style={hStyle}>What Your Application Status Means</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>The portal shows one of seven statuses. Here is what each means and what to do next:</p>
            <StatusTable />

            <h2 id="beneficiary-list" style={hStyle}>How to Check the Annapurna Bhandar Beneficiary List</h2>
            <p style={pStyle}>
              The confirmed beneficiary list is at the{' '}
              <Link href="https://socialregistry.wb.gov.in/citizen/#/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Social Registry West Bengal citizen portal</Link>{' '}
              under the Beneficiary List section. Search by district, block, and gram panchayat or ward. Lists are also posted at gram panchayat offices and refreshed every 7 days per the Women and Child Welfare Department guidelines.
            </p>
            <p style={pStyle}>If your name does not appear after your status shows Approved, confirm with your gram panchayat. A common cause is a delay in data sync between the portal and the posted list.</p>

            <h2 id="lakshmir-migration" style={hStyle}>Lakshmir Bhandar Beneficiaries: Are You Automatically Enrolled?</h2>
            <p style={{ ...pStyle, marginBottom: 10 }}>
              Yes, most Lakshmir Bhandar beneficiaries are automatically migrated to Annapurna Bhandar without any new application. However, you will <strong style={{ fontWeight: 600 }}>not be migrated</strong> if you were:
            </p>
            <BulletList
              items={[
                'Removed during the Special Intensive Revision (SIR) 2026 of voter rolls',
                'Deleted in the second draft list after publication',
                'Deleted after adjudication',
                'Marked as ASDD (Absent, Shifted, Dead, or Duplicate) during voter slip distribution',
              ]}
            />
            <p style={pStyle}>
              One exception applies even within this list: if you were deleted during SIR but have a CAA citizenship application with a case still pending before a tribunal, you continue receiving benefits without a fresh application.
            </p>
            <p style={pStyle}>
              If you were a Lakshmir Bhandar recipient and have not received a payment after 3 June 2026, check your status on the portal or visit your gram panchayat immediately rather than assuming migration will happen automatically.
            </p>

            <h2 id="aadhaar-linking" style={hStyle}>Ensuring Your Aadhaar Is Linked for Payment</h2>
            <p style={pStyle}>Your bank account must be Aadhaar-seeded for DBT to reach you. If it is not seeded, the payment fails and shows as returned on the portal. NPCI&apos;s BASE (Bharat Aadhaar Seeding Enabler) tool lets you check and fix this yourself online, without a bank branch visit.</p>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>Check Which Account Is Currently Aadhaar-Linked</h3>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>
                Go to the official{' '}
                <Link href="https://www.npci.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>NPCI website</Link>.
              </Step>
              <Step n={2}>Open the Customer section and select Bharat Aadhaar Seeding Enabler (BASE).</Step>
              <Step n={3}>Click Aadhaar Mapped Status.</Step>
              <Step n={4}>Enter your Aadhaar number and captcha, then click Check Status.</Step>
              <Step n={5}>Enter the OTP sent to your Aadhaar-linked mobile number. Your currently linked bank name and DBT status appear on screen.</Step>
            </div>

            <h3 style={{ ...hStyle, fontSize: 16.5, marginTop: 24 }}>Change or Update the Linked Account</h3>
            <p style={{ ...pStyle, marginBottom: 6 }}>If the wrong account is linked, update it through the same BASE tool:</p>
            <div style={{ margin: '4px 0 20px' }}>
              <Step n={1}>On the NPCI BASE page, click Aadhaar Seeding/Deseeding.</Step>
              <Step n={2}>Enter your Aadhaar number and select Seeding.</Step>
              <Step n={3}>Choose your new bank from the list, then pick the seeding type: Fresh Seeding if no account was linked before, Movement within the same bank for a different account at the same bank, or Movement to another bank to switch banks entirely.</Step>
              <Step n={4}>Enter and confirm the new account number, accept the declaration, enter the captcha, and submit.</Step>
              <Step n={5}>Agree to the terms, then verify with the OTP sent to your Aadhaar-linked mobile to confirm.</Step>
            </div>
            <p style={pStyle}>The updated mapping becomes active for DBT once confirmed. You can also check seeding status through the myAadhaar portal under its Bank Seeding Status tab. If everything shows seeded correctly and payment still has not arrived, visit your gram panchayat to confirm the bank details recorded on your application match.</p>

            <h2 id="rejection-reasons" style={hStyle}>Common Reasons Annapurna Bhandar Applications Are Rejected</h2>
            <p style={pStyle}>
              The most common rejection reasons are name mismatch between Aadhaar and bank, age outside the 25 to 60 range, being identified as a government employee or pensioner, or Aadhaar not linked to a bank account. Here is the full list with fixes:
            </p>
            <RejectionTable />
            <p style={pStyle}>
              If your application is rejected, the specific reason is usually stated on the portal or can be obtained from the gram panchayat. Appeal by visiting the Block Development Office (BDO) with supporting documents. There is no fee for reapplication.
            </p>

            <h2 id="comparison" style={hStyle}>Annapurna Bhandar vs Lakshmir Bhandar: Key Differences</h2>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              The key difference is the monthly benefit amount: ₹3,000 under Annapurna Bhandar versus ₹1,500 to ₹1,700 under Lakshmir Bhandar by the time it was phased out. The eligible age range (25 to 60) and the DBT mechanism remain the same.
            </p>
            <LakshmirCompareTable />
            <p style={pStyle}>
              Annapurna Bhandar does not distinguish between general and SC/ST categories: all approved beneficiaries receive the same ₹3,000 per month.
            </p>

            <h2 id="central-scheme" style={hStyle}>Is This the Same as the Central Government&apos;s Annapurna Scheme?</h2>
            <p style={pStyle}>No. Two very different programs share the same name, which causes confusion across search results.</p>
            <p style={pStyle}>
              West Bengal&apos;s Annapurna Bhandar is a <strong style={{ fontWeight: 600 }}>cash transfer of ₹3,000 per month</strong> for women aged 25 to 60 under the Women and Child Welfare Department.
            </p>
            <p style={pStyle}>
              The Central Government&apos;s Annapurna Scheme, running under the National Social Assistance Programme since 1 April 2000, provides <strong style={{ fontWeight: 600 }}>10 kg of free food grain per month</strong> to destitute senior citizens above 65 years who qualify for the Indira Gandhi National Old Age Pension Scheme but are not yet receiving it. It is a food security scheme for an entirely different group, run through the Gram Panchayat rather than DBT. Anyone confirming their own income tax status before applying to either scheme can use the{' '}
              <Link href="/blogs/income-tax-slabs-fy-2025-26" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Slabs FY 2025-26 guide</Link>
              {' '}to check which slab, if any, applies.
            </p>
            <p style={{ ...pStyle, marginBottom: 6 }}>
              A third, unrelated Annapurna Bhandar operated in Rajasthan as a public-private retail initiative, not a cash scheme:
            </p>
            <TableWrap label="West Bengal vs Rajasthan: Same Name, Different Scheme">
              <div style={{ overflowX: 'auto' as const }}>
                <div style={{ minWidth: 520 }}>
                  <div style={{ display: 'flex', gap: 12, padding: '10px 16px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>
                    <span style={{ flex: '0 0 130px', fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Particulars</span>
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>West Bengal</span>
                    <span style={{ flex: 1, fontSize: 11, fontWeight: 700, color: C.ink, letterSpacing: '.05em', textTransform: 'uppercase' as const }}>Rajasthan</span>
                  </div>
                  {[
                    { p: 'Primary goal', wb: 'Direct financial assistance', rj: 'Upgrading fair price shops' },
                    { p: 'Nature', wb: 'DBT cash transfer', rj: 'Public-private retail model' },
                    { p: 'Beneficiaries', wb: 'Women aged 25 to 60', rj: 'NFSA-eligible households' },
                    { p: 'Benefit', wb: '₹3,000 per month', rj: 'Subsidised staples (oil, ghee, pulses)' },
                    { p: 'Launched', wb: '3 June 2026', rj: 'October 2015' },
                    { p: 'Status', wb: 'Active', rj: 'Discontinued, relaunch expected 2026' },
                  ].map((r, i, arr) => (
                    <div key={r.p} style={{ display: 'flex', gap: 12, padding: '11px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', alignItems: 'flex-start' }}>
                      <span style={{ flex: '0 0 130px', fontSize: 13, color: C.ink3, fontFamily: INTER }}>{r.p}</span>
                      <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.wb}</span>
                      <span style={{ flex: 1, fontSize: 13, color: C.ink2, fontFamily: INTER }}>{r.rj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TableWrap>

            <h2 id="financial-planning" style={hStyle}>What to Do with ₹3,000 per Month</h2>
            <p style={pStyle}>
              Use the ₹3,000 for household expenses first: groceries, medicine, school fees, utilities. That is the scheme&apos;s primary purpose, and for most families that is exactly where it goes.
            </p>
            <p style={pStyle}>
              If expenses are already covered, an emergency fund is the next priority before any investment. The{' '}
              <Link href="/calculators/emergency-fund-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Emergency Fund Calculator</Link>
              {' '}shows how many months of expenses ₹3,000 a month builds up, and how long it takes to reach a 3 to 6 month buffer.
            </p>
            <p style={pStyle}>
              For longer-term planning, setting aside ₹1,000 per month from the benefit into a mutual fund SIP can create a meaningful corpus over time. ₹1,000 per month over 10 years at an assumed 12% annual return grows to approximately ₹2.3 lakh. Use the{' '}
              <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>SIP Calculator</Link>
              {' '}to model different amounts and time periods, or the{' '}
              <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>PPF Calculator</Link>
              {' '}for a guaranteed-return alternative if market-linked risk is not something you want on this money.
            </p>
            <p style={pStyle}>
              If you and your spouse plan to apply for a home loan jointly, the Annapurna Bhandar benefit counts as regular income, which can improve the loan amount you qualify for. Use the{' '}
              <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Home Loan Eligibility Calculator</Link>
              {' '}to see how your combined household income affects your eligible loan.
            </p>

            

            {/* FAQ section */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <div className="faq-accordion" style={{ marginTop: 20, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
              {faqItems.map((item, i, arr) => (
                <details key={i} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                  <summary style={{
                    padding: '15px 18px',
                    cursor: 'pointer',
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: C.dark,
                    fontFamily: INTER,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#fff',
                    userSelect: 'none' as const,
                    lineHeight: 1.4,
                  }}>
                    <span style={{ paddingRight: 12 }}>{item.q}</span>
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
                  </summary>
                  <div style={{ padding: '0 18px 16px', background: '#fff' }}>
                    <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.75, fontFamily: INTER, margin: 0 }}>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="annapurna-sidebar"
            style={{
              position: 'sticky',
              top: 80,
              alignSelf: 'start',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
              paddingRight: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            {/* Ad banner */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyDates /></div>
            <div style={{ flexShrink: 0 }}><SchemeHighlights /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ height: 1, background: C.border, margin: '24px 0 0' }} />
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .annapurna-sidebar::-webkit-scrollbar { width: 5px; }
        .annapurna-sidebar::-webkit-scrollbar-track { background: transparent; }
        .annapurna-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .annapurna-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .faq-accordion details summary { list-style: none; }
        .faq-accordion details summary::-webkit-details-marker { display: none; }
        .faq-accordion details summary::marker { display: none; content: ''; }
        .faq-accordion .chevron { transition: transform 0.2s ease; }
        .faq-accordion details[open] .chevron { transform: rotate(180deg); }
        .faq-accordion details[open] summary { color: #101214; }
      `}</style>
    </>
  );
}

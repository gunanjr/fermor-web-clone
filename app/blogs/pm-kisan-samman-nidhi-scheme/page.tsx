import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { PMKisanLanguageSwitcher } from '../../../components/PMKisanLanguageSwitcher';

export const metadata: Metadata = {
  title: 'PM-KISAN Scheme: Eligibility, Rs 6,000 Benefit, eKYC, Status Check',
  description: 'Complete PM-KISAN (Pradhan Mantri Kisan Samman Nidhi) guide: Rs 6,000/year benefit in 3 installments, full eligibility and exclusion criteria, the three eKYC methods, how to register as a new farmer, how to check beneficiary status, the 23rd installment, and what to do if a payment is missed.',
  alternates: {
    canonical: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
    languages: {
      'en-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
      'hi-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi',
      'mr-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr',
      'te-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te',
      'pa-IN': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa',
      'x-default': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
    },
  },
  openGraph: {
    title: 'PM-KISAN Scheme: Eligibility, Benefit, eKYC and Status Check',
    description: 'Rs 6,000/year to landholding farmer families in three Rs 2,000 installments via DBT. Full eligibility, exclusion list, eKYC methods, registration, status check and what to do if a payment is missed.',
    type: 'article',
    publishedTime: '2026-09-28T17:27:38+05:30',
    authors: ['Fermor Analysis'],
    tags: ['PM-KISAN', 'Kisan Samman Nidhi', 'Government Scheme', 'Farmer Welfare', 'DBT India'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PM-KISAN Scheme: Eligibility, Benefit, eKYC and Status',
    description: 'Rs 6,000/year to farmer families in 3 installments via DBT. Full eligibility, exclusions, eKYC, registration and status check guide.',
  },
  keywords: [
    'pm kisan scheme', 'pm kisan samman nidhi', 'pradhan mantri kisan samman nidhi',
    'pm kisan status', 'pm kisan eligibility', 'pm kisan ekyc', 'pm kisan apply online',
    'pm kisan installment amount', 'pm kisan 24th installment', 'pm kisan 23rd installment',
    'kisan samman nidhi yojana', 'pm kisan beneficiary status', 'pm kisan registration',
    'pmkisan.gov.in', 'pm kisan exclusion list', 'pm kisan new farmer registration',
    'pm kisan ekyc pending', 'know your status pm kisan',
  ],
};

const PUBLISHED = '2026-06-28T00:00:00+05:30';
const UPDATED = '2026-09-28T17:27:38+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained',
  description: 'Complete guide to the PM-KISAN scheme: the Rs 6,000/year benefit paid in three installments, full eligibility and exclusion criteria, the three eKYC methods, how to register as a new farmer, how to check beneficiary and payment status, what to do if a payment is missed, the 23rd installment, taxability, and how PM-KISAN fits alongside other farmer welfare schemes.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  workTranslation: [
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-hi', inLanguage: 'hi-IN', name: 'पीएम-किसान सम्मान निधि योजना' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-mr', inLanguage: 'mr-IN', name: 'पीएम-किसान सन्मान निधी योजना' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-te', inLanguage: 'te-IN', name: 'పీఎం-కిసాన్ సమ్మాన్ నిధి పథకం' },
    { '@type': 'NewsArticle', url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme-pa', inLanguage: 'pa-IN', name: 'ਪੀਐਮ-ਕਿਸਾਨ ਸਨਮਾਨ ਨਿਧੀ ਯੋਜਨਾ' },
  ],
  about: [
    { '@type': 'Thing', name: 'Pradhan Mantri Kisan Samman Nidhi', description: 'Central Sector scheme of the Government of India paying Rs 6,000 a year to landholding farmer families via Direct Benefit Transfer' },
    { '@type': 'GovernmentOrganization', name: 'Ministry of Agriculture and Farmers Welfare', description: 'The Central Government ministry that administers PM-KISAN' },
  ],
  keywords: 'pm kisan scheme, pm kisan samman nidhi, pm kisan eligibility, pm kisan ekyc, pm kisan status, pm kisan exclusion list, pm kisan registration, 23rd installment',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'PM-KISAN Scheme', item: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme' },
  ],
};

const faqItems = [
  { q: 'What is the PM-KISAN scheme?', a: 'PM-KISAN, or Pradhan Mantri Kisan Samman Nidhi, is a Central Sector scheme run entirely by the Government of India that pays income support directly to landholding farmer families. It has been operational since 1 December 2018 under the Ministry of Agriculture and Farmers Welfare, and the money moves by Direct Benefit Transfer into Aadhaar-seeded bank accounts, with no state government funding involved.' },
  { q: 'How much does PM-KISAN pay, and how often?', a: 'PM-KISAN pays Rs 6,000 a year to each eligible farmer family, split into three equal installments of Rs 2,000 each, released roughly every four months. All three installments go through Direct Benefit Transfer straight to the farmer family\'s Aadhaar-seeded bank account.' },
  { q: 'Who is eligible for PM-KISAN?', a: 'Landholding farmer families, defined as a husband, wife and their minor children, are eligible for PM-KISAN, subject to the state or UT government\'s own land records identifying them as such. Eligibility is then narrowed by a specific list of exclusion categories covering institutional landholders, government employees and pensioners above a threshold, income tax payers, certain professionals, and a handful of other cases.' },
  { q: 'Who is excluded from PM-KISAN?', a: 'PM-KISAN excludes institutional land holders, families with a current or former constitutional post holder, MP, MLA, MLC, mayor or district panchayat chairperson, serving or retired government and PSU employees above the Multi-Tasking Staff/Class IV level, pensioners drawing Rs 10,000 or more a month, anyone who paid income tax in the last assessment year, and registered doctors, engineers, lawyers, chartered accountants and architects. Land bought on or after 1 February 2019, and land registered in a minor\'s name, are also excluded from the benefit.' },
  { q: 'What is PM-KISAN eKYC, and is it mandatory?', a: 'eKYC is a one-time identity verification every PM-KISAN beneficiary must complete to keep receiving installments, and it is mandatory: no future payment is released without it. It can be done by Aadhaar-linked mobile OTP on the portal or app, by biometric fingerprint or iris scan at a Common Service Centre, or through face authentication in the PM-KISAN mobile app.' },
  { q: 'How do I check my PM-KISAN eKYC status?', a: 'Check eKYC status under the beneficiary or eKYC status section of pmkisan.gov.in\'s Farmer Corner, where it shows as "Yes" or "Verified" once complete and "Pending" if it still needs to be done. A status update can take up to 24 hours to reflect after you complete eKYC.' },
  { q: 'How do I register as a new PM-KISAN farmer?', a: 'New farmers register through the "New Farmer Registration" option in the Farmer Corner section of pmkisan.gov.in, which is where the government hosts the current registration form rather than at any separate deep link. The PM-KISAN mobile app offers the same registration path for farmers who prefer to apply from a phone.' },
  { q: 'How do I check my PM-KISAN beneficiary or payment status?', a: 'Check status through "Know Your Status" in the Farmer Corner section of pmkisan.gov.in by entering your registration number or the mobile number and Aadhaar linked to your record. The PM-KISAN mobile app offers the same status check, and the Kisan e-Mitra chatbot can answer general eligibility and status queries.' },
  { q: 'Why did I not receive my PM-KISAN installment?', a: 'A missed installment is most often caused by pending eKYC, a bank account that is not Aadhaar-seeded, a mismatch between Aadhaar and bank records, or a land record that failed verification. Check your eKYC and beneficiary status first on pmkisan.gov.in, since the portal usually states the specific reason a payment did not go through.' },
  { q: 'What do I do if my PM-KISAN Aadhaar or bank details are wrong?', a: 'Use the "Edit Aadhaar Failure Records" option in the Farmer Corner section of pmkisan.gov.in to correct a name or detail mismatch that is blocking a payment. For a bank account change or an Aadhaar-seeding issue, visit your bank branch or the nearest Common Service Centre, since those corrections happen at the bank or CSC end, not on the portal itself.' },
  { q: 'When was the last PM-KISAN installment released, and when is the next one due?', a: 'The 23rd installment was released on 20 June 2026 from Hooghly, West Bengal, disbursing over Rs 18,880 crore to more than 9.44 crore farmers. The 24th installment is expected around October or November 2026, though the government has not officially confirmed a date yet.' },
  { q: 'Is the PM-KISAN Rs 6,000 benefit taxable?', a: 'PM-KISAN payments are generally treated as tax-exempt agricultural income support rather than taxable income, since they are direct income assistance to landholding farmer families. Farmers with other taxable income streams should confirm their specific tax position with a qualified tax advisor rather than relying on a general rule.' },
  { q: 'Can more than one member of a family receive PM-KISAN?', a: 'No. Only one member per eligible farmer family can receive the PM-KISAN benefit, and where multiple members of the same family are found registered, the extra registrations are removed from the beneficiary list. A "family" for this purpose means husband, wife and their minor children.' },
  { q: 'Does buying farmland today make me eligible for PM-KISAN?', a: 'Not automatically. PM-KISAN excludes any farmer whose land ownership was acquired on or after 1 February 2019, a cutoff the scheme itself set to prevent land transfers made purely to claim the benefit, so only land held before that date counts toward eligibility.' },
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

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
  name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained',
  url: 'https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme',
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Pradhan Mantri Kisan Samman Nidhi',
      alternateName: 'PM-KISAN',
      description: 'A Central Sector scheme of the Government of India, 100% Centrally funded and operational since 1 December 2018, providing income support of Rs 6,000 a year to landholding farmer families via Direct Benefit Transfer.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'eKYC (PM-KISAN)',
      description: 'A mandatory one-time identity verification for every PM-KISAN beneficiary, completed via Aadhaar OTP, biometric authentication at a Common Service Centre, or face authentication in the PM-KISAN mobile app.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Landholding farmer families across India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-pm-kisan', name: 'What Is PM-KISAN' },
    { '@type': 'WebPageElement', cssSelector: '#benefit-amount', name: 'Benefit Amount and Payment Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#funding', name: 'Who Funds PM-KISAN' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Who Is Eligible' },
    { '@type': 'WebPageElement', cssSelector: '#exclusions', name: 'Who Is Excluded' },
    { '@type': 'WebPageElement', cssSelector: '#ekyc', name: 'eKYC Methods' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-register', name: 'How to Register' },
    { '@type': 'WebPageElement', cssSelector: '#check-status', name: 'How to Check Status' },
    { '@type': 'WebPageElement', cssSelector: '#payment-issues', name: 'Missed Payment or eKYC Failure' },
    { '@type': 'WebPageElement', cssSelector: '#latest-installment', name: 'The 23rd Installment and What Is Next' },
    { '@type': 'WebPageElement', cssSelector: '#is-it-taxable', name: 'Is the Benefit Taxable' },
    { '@type': 'WebPageElement', cssSelector: '#growing-your-installment', name: 'Growing Your PM-KISAN Installments' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'PM-KISAN and Other Farmer Welfare Schemes' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'FAQ' },
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
  knowsAbout: ['Pradhan Mantri Kisan Samman Nidhi', 'PM-KISAN', 'Central Government Farmer Welfare Schemes', 'Direct Benefit Transfer', 'Personal Finance India'],
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
  amber:  '#A15C00',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em' };
const pStyle: React.CSSProperties = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER };

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'PM-KISAN Scheme' },
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

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '11px 15px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '10px 15px', borderBottom: `1px solid ${C.border}`, lineHeight: 1.55 };
const tdAltStyle: React.CSSProperties = { ...tdStyle, background: '#FAFAFA' };

function DataTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 24 }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, border: `1px solid ${C.border}`, borderRadius: 8 }}>
        <caption style={{ fontFamily: INTER, fontSize: 12, color: C.ink3, textAlign: 'left', marginBottom: 8, captionSide: 'top', paddingBottom: 8 }}>{caption}</caption>
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function KeyFacts() {
  const facts = [
    { label: 'Annual benefit', value: 'Rs 6,000' },
    { label: 'Installments', value: '3 x Rs 2,000' },
    { label: 'Operational since', value: '1 Dec 2018' },
    { label: 'Funding', value: '100% Central Govt' },
    { label: 'Payment mode', value: 'DBT' },
    { label: 'Latest installment', value: '23rd, 20 Jun 2026' },
  ];
  return (
    <TableWrap label="Quick Facts">
      {facts.map((item, i) => (
        <div key={item.label} style={{ padding: '11px 16px', borderBottom: i < facts.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink2, flexShrink: 0 }}>{item.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, fontFamily: POPPINS, textAlign: 'right' as const }}>{item.value}</span>
        </div>
      ))}
    </TableWrap>
  );
}

function FermorTools() {
  const tools = [
    { label: 'KVP Calculator', desc: 'Double your PM-KISAN savings over a fixed Kisan Vikas Patra term', href: '/calculators/kvp-calculator' },
    { label: 'Post Office MIS Calculator', desc: 'Turn saved installments into a monthly income stream', href: '/calculators/post-office-mis-calculator' },
    { label: 'Atal Pension Yojana Calculator', desc: 'Build a guaranteed pension alongside PM-KISAN support', href: '/calculators/atal-pension-yojana-calculator' },
    { label: 'Income Tax Calculator', desc: 'Check total tax liability if you have other taxable income', href: '/calculators/income-tax-calculator' },
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
    { href: '/blogs/annapurna-bhandar-2026', label: 'Annapurna Bhandar 2026: Eligibility, Apply, Status' },
    { href: '/blogs/jai-bangla-pension-scheme-2026', label: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount, Apply' },
    { href: '/blogs/epfo-login-uan-passbook', label: 'EPFO Login, UAN and PF Passbook Guide' },
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

function Disclaimer() {
  return (
    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32, fontFamily: INTER }}>
      <p style={{ fontSize: 11.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> This article is based on official government sources, including <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pmkisan.gov.in</a> and <a href="https://www.pib.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>pib.gov.in</a>, current as of publication. Eligibility rules, exclusion criteria, installment dates, and portal features can change; always confirm your specific status, documents, and deadlines directly on pmkisan.gov.in before acting. Fermor is not affiliated with the Government of India and this is not official guidance or tax advice.
      </p>
    </div>
  );
}

export default function PMKisanSchemePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <PageNav />
      <Breadcrumb />

      <div style={{ borderBottom: `1px solid ${C.border}`, background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Government Schemes</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 860 }}>
            PM-KISAN (Pradhan Mantri Kisan Samman Nidhi): Eligibility, Benefit, eKYC and Status Check Explained
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            A complete guide to the Rs 6,000-a-year PM-KISAN benefit: who qualifies, who is excluded, how eKYC works, how to register and check your status, and what to do if a payment goes missing.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated <time dateTime={UPDATED}>Sep 28, 2026</time></span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme, 100% funded by the Government of India, that pays Rs 6,000 a year to landholding farmer families in three installments of Rs 2,000 each. It has run since 1 December 2018 under the Ministry of Agriculture and Farmers Welfare, and every payment moves by Direct Benefit Transfer straight into an Aadhaar-seeded bank account, with no branch visit or intermediary involved.
            </p>
            <p style={pStyle}>
              This guide covers the full picture: exactly who qualifies and who is excluded, how eKYC works and why it blocks payment if skipped, how to register as a new farmer, how to check your status, what to do when an installment does not arrive, and where PM-KISAN sits alongside India's other farmer welfare schemes.
            </p>

            <PMKisanLanguageSwitcher
              current="en"
              heading="This guide is also available in Hindi, Marathi, Telugu and Punjabi"
              subtext="Read it in the language you're most comfortable with. Every version covers the same eligibility, eKYC, registration and status details."
            />

            <h2 id="what-is-pm-kisan" style={hStyle}>What is the PM-KISAN scheme?</h2>
            <p style={pStyle}>
              PM-KISAN is an income-support scheme run directly by the Central Government, with no state government contribution or intermediary layer. Per <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>, it is described as a Central Sector scheme with 100% funding from the Government of India, operational from 1 December 2018 and administered by the Ministry of Agriculture and Farmers Welfare.
            </p>
            <p style={pStyle}>
              The name translates roughly to the Prime Minister's Farmer Honour Fund, and the design is deliberately simple: identify landholding farmer families through existing state and UT land records, and pay them a fixed annual amount with no loan, subsidy, or paperwork-heavy claim process attached.
            </p>
            <BulletList items={[
              <span key={1}><strong>Central Sector scheme:</strong> entirely funded by the Central Government, unlike a Centrally Sponsored Scheme where states also contribute.</span>,
              <span key={2}><strong>Target group:</strong> landholding farmer families identified through state and UT government land records.</span>,
              <span key={3}><strong>Delivery mechanism:</strong> Direct Benefit Transfer into Aadhaar-seeded bank accounts, with no intermediary.</span>,
              <span key={4}><strong>Administering ministry:</strong> Ministry of Agriculture and Farmers Welfare, Government of India.</span>,
            ]} />
            <DataTable
              caption="PM-KISAN Scheme: Key Parameters"
              headers={['Parameter', 'Detail']}
              rows={[
                ['Scheme Name', 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)'],
                ['Scheme Type', 'Central Sector Scheme'],
                ['Funding', '100% Government of India'],
                ['Operational Since', '1 December 2018'],
                ['Annual Benefit', 'Rs 6,000 per farmer family'],
                ['Installments', '3 equal installments of Rs 2,000 each, roughly every four months'],
                ['Payment Mode', 'Direct Benefit Transfer (DBT) to Aadhaar-seeded bank account'],
                ['Target Group', 'Landholding farmer families, subject to exclusion criteria'],
                ['Official Portal', <a key="portal" href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>pmkisan.gov.in</a>],
              ]}
            />

            <h2 id="benefit-amount" style={hStyle}>Benefit amount and payment schedule</h2>
            <p style={pStyle}>
              PM-KISAN pays Rs 6,000 a year to each eligible farmer family, split into three equal installments of Rs 2,000 released roughly every four months. Every installment is credited directly to the beneficiary's Aadhaar-seeded bank account through Direct Benefit Transfer, so there is no cheque, cash disbursal, or in-person collection step at any point.
            </p>
            <BulletList items={[
              'Rs 6,000 per year, split into 3 installments of Rs 2,000 each.',
              'Installments are released on a roughly four-monthly cycle.',
              'Payment is made through Direct Benefit Transfer, directly into the farmer family\'s Aadhaar-seeded bank account.',
              'No fee, no loan component, and no repayment obligation attached to the benefit.',
            ]} />
            <p style={pStyle}>
              Rs 6,000 a year works out to Rs 500 a month on average, a modest but predictable amount that many families layer on top of other farm income. The Growing Your PM-KISAN Installments section further down this guide looks at where that money can realistically go if it is not needed immediately.
            </p>

            <h2 id="funding" style={hStyle}>Who funds PM-KISAN?</h2>
            <p style={pStyle}>
              PM-KISAN is funded 100% by the Government of India, with no financial contribution required from state governments. This makes it a Central Sector scheme, as distinct from a Centrally Sponsored Scheme, where the Centre and states typically split funding in a fixed ratio.
            </p>
            <DataTable
              caption="Central Sector Scheme vs Centrally Sponsored Scheme"
              headers={['Type', 'Funding Pattern']}
              rows={[
                ['Central Sector Scheme (PM-KISAN)', '100% Government of India'],
                ['Centrally Sponsored Scheme (general)', 'Shared between Centre and state governments'],
              ]}
            />

            <h2 id="eligibility" style={hStyle}>Who is eligible for PM-KISAN?</h2>
            <p style={pStyle}>
              Landholding farmer families are eligible for PM-KISAN, where a "family" is defined specifically as a husband, wife, and their minor children. State and UT governments identify eligible families from their own land ownership records, which is why the scheme has no separate national land registry of its own.
            </p>
            <p style={pStyle}>
              Landholding size alone does not decide eligibility the way it once did in the scheme's earliest version; what matters now is that the family holds cultivable land in the relevant state or UT records and does not fall into any of the exclusion categories covered next. Because the underlying records sit with the state, the same land data used for other agricultural schemes typically feeds PM-KISAN eligibility as well.
            </p>
            <BulletList items={[
              'A "farmer family" means husband, wife, and their minor children, treated as one unit for eligibility.',
              'Eligibility is determined from land ownership records maintained by the relevant state or UT government.',
              'Only one member per eligible family can actually receive the payment.',
              'Meeting the landholding definition is necessary but not sufficient: the exclusion list below can still disqualify an otherwise eligible family.',
            ]} />

            <h2 id="exclusions" style={hStyle}>Who is excluded from PM-KISAN</h2>
            <p style={pStyle}>
              PM-KISAN excludes a specific set of categories even when a family otherwise holds farmland, and this exclusion list is the single most important part of the scheme to check before assuming eligibility. Per pmkisan.gov.in, the following categories are not eligible for the benefit regardless of landholding status.
            </p>
            <BulletList items={[
              <span key={1}><strong>Institutional land holders:</strong> all farmland held by an institution rather than an individual family is excluded.</span>,
              <span key={2}><strong>Constitutional post holders and elected representatives:</strong> families where a member is or was President, Vice-President, Governor, or holder of a similar constitutional post, or a former or present minister, Member of Parliament, MLA, MLC, mayor of a municipal corporation, or chairperson of a district panchayat.</span>,
              <span key={3}><strong>Government and PSU employees:</strong> families with a serving or retired officer or employee of central or state government ministries, departments, public sector undertakings, government-attached offices, or autonomous institutions, plus regular employees of local bodies. Multi-Tasking Staff, Class IV, and Group D employees are specifically excepted and remain eligible.</span>,
              <span key={4}><strong>Higher-pension retirees:</strong> all retired pensioners drawing a monthly pension of Rs 10,000 or more, again with Multi-Tasking Staff, Class IV, and Group D employees excepted.</span>,
              <span key={5}><strong>Income tax payers:</strong> anyone who paid income tax in the last assessment year is excluded, regardless of landholding.</span>,
              <span key={6}><strong>Registered professionals:</strong> doctors, engineers, lawyers, chartered accountants, and architects registered with their professional bodies and practising.</span>,
              <span key={7}><strong>Land acquired after 1 February 2019:</strong> farmers who came into land ownership on or after this date, a cutoff the scheme set specifically to prevent land transfers made only to claim the benefit.</span>,
              <span key={8}><strong>Duplicate family registrations:</strong> if more than one member of the same family is registered, every registration beyond the single eligible one is removed.</span>,
              <span key={9}><strong>Land in a minor's name:</strong> land registered to a person under 18 is removed from the beneficiary list entirely.</span>,
            ]} />
            <Callout>
              If any family member falls into one of these categories, the whole family is excluded, not just that individual. Before assuming eligibility, confirm your specific case against the current exclusion list on <a href="https://pmkisan.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dg }}>pmkisan.gov.in</a>, since exclusion criteria are set by the government and can be refined over time.
            </Callout>

            <h2 id="ekyc" style={hStyle}>eKYC: the three ways to complete it</h2>
            <p style={pStyle}>
              eKYC is a mandatory one-time identity verification every PM-KISAN beneficiary must complete, and no future installment is released without it. The government offers three separate methods, so a farmer without steady internet access or an Aadhaar-linked phone still has a workable path to finish it.
            </p>
            <TableWrap label="PM-KISAN eKYC Methods">
              {[
                { method: 'OTP-based', detail: 'Done on the PM-KISAN portal or mobile app; requires an Aadhaar-linked, active mobile number to receive the OTP.' },
                { method: 'Biometric-based', detail: 'Done in person at a Common Service Centre (CSC) or SSK using a fingerprint or iris scan.' },
                { method: 'Face authentication', detail: 'Done directly inside the PM-KISAN mobile app using the phone\'s camera, no CSC visit or separate device needed.' },
              ].map((row, i, arr) => (
                <div key={row.method} style={{ padding: '13px 16px', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: INTER, marginBottom: 4 }}>{row.method}</div>
                  <div style={{ fontSize: 13, color: C.ink2, fontFamily: INTER, lineHeight: 1.6 }}>{row.detail}</div>
                </div>
              ))}
            </TableWrap>
            <p style={pStyle}>
              Status shows as "Yes" or "Verified" once eKYC is complete, and "Pending" if it still needs to be done, visible under the beneficiary or eKYC status section of pmkisan.gov.in. A fresh update can take up to 24 hours to reflect on the portal, so it is worth waiting a day before assuming a completed eKYC has failed to register.
            </p>

            <h2 id="how-to-register" style={hStyle}>How to register as a new farmer</h2>
            <p style={pStyle}>
              New farmer registration happens through the Farmer Corner section of pmkisan.gov.in, under the "New Farmer Registration" option, rather than at any separate standalone form URL. The same registration path is also available through the PM-KISAN mobile app on Google Play for farmers who prefer to apply from a phone.
            </p>
            <p style={pStyle}>
              The Farmer Corner is also where the government hosts the related self-service tools worth knowing about upfront: "Edit Aadhaar Failure Records" for correcting a rejected Aadhaar detail, an option to update your registered mobile number, refund request submission, and voluntary benefit surrender for anyone who no longer wants to receive the payment.
            </p>
            <BulletList items={[
              'New Farmer Registration: the entry point for anyone not yet enrolled.',
              'Edit Aadhaar Failure Records: fixes a name or detail mismatch blocking payment.',
              'Update mobile number: keeps OTP-based eKYC and status alerts working.',
              'Refund requests and voluntary benefit surrender: self-service options for specific edge cases.',
            ]} />
            <Callout>
              A specific deep-link URL for the registration form on pmkisan.gov.in returned an error page when checked directly for this article. Go to the pmkisan.gov.in homepage and open Farmer Corner from there rather than following an old bookmarked or third-party link, since government portal paths change without notice.
            </Callout>


            <h2 id="check-status" style={hStyle}>How to check your beneficiary and payment status</h2>
            <p style={pStyle}>
              Status checks run through the "Know Your Status" tool in the Farmer Corner section of pmkisan.gov.in, where entering your registration number, or your mobile number and Aadhaar number, brings up your current beneficiary and payment record. The same status check is available inside the PM-KISAN mobile app.
            </p>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Check Your PM-KISAN Status</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>Official "Know Your Status" tool on pmkisan.gov.in.</p>
              </div>
              <a className="fx-btn" href="https://pmkisan.gov.in/beneficiarystatus_new.aspx" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                Know Your Status
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              For a quicker general query rather than a full status lookup, PM-KISAN also runs a chatbot called Kisan e-Mitra, built to answer common eligibility and status questions without navigating the full portal.
            </p>

            <h2 id="payment-issues" style={hStyle}>What to do if a payment is missed or eKYC fails</h2>
            <p style={pStyle}>
              A missed PM-KISAN installment is most often caused by pending eKYC, a bank account that is not Aadhaar-seeded, a mismatch between Aadhaar and bank or land records, or a land record that failed the state's own verification step. Checking your eKYC and beneficiary status on pmkisan.gov.in is the right first move, since the portal usually states the specific reason a payment did not go through.
            </p>
            <BulletList items={[
              <span key={1}><strong>eKYC still pending:</strong> complete it via OTP, biometric CSC verification, or face authentication in the app, then allow up to 24 hours for the status to update.</span>,
              <span key={2}><strong>Aadhaar or bank detail mismatch:</strong> use "Edit Aadhaar Failure Records" in the Farmer Corner section of pmkisan.gov.in to correct the record.</span>,
              <span key={3}><strong>Bank account not Aadhaar-seeded:</strong> visit your bank branch to complete Aadhaar seeding, since this correction happens at the bank's end, not on the PM-KISAN portal.</span>,
              <span key={4}><strong>Land record verification pending:</strong> follow up with the local revenue or agriculture office that maintains the land records used for your eligibility check.</span>,
              <span key={5}><strong>No visible issue but payment still missing:</strong> a nearby Common Service Centre or your local agriculture office can look up the specific installment status on your behalf.</span>,
            ]} />

            <h2 id="latest-installment" style={hStyle}>The 23rd installment and what comes next</h2>
            <p style={pStyle}>
              The 23rd PM-KISAN installment was released on 20 June 2026 from Hooghly, West Bengal, disbursing over Rs 18,880 crore to more than 9.44 crore farmers in a single release. That scale, tens of millions of families paid in one coordinated transfer, is the scheme's own strongest evidence of DBT infrastructure working at a genuinely national level.
            </p>
            <p style={pStyle}>
              The 24th installment is expected around October or November 2026, following the scheme's usual roughly four-monthly cycle, though the government has not officially confirmed an exact date at the time of writing. Farmers due a payment in that window should make sure eKYC is complete and bank details are current well before then, since neither can be fixed retroactively once a disbursal cycle has already run.
            </p>

            <h2 id="is-it-taxable" style={hStyle}>Is the PM-KISAN benefit taxable?</h2>
            <p style={pStyle}>
              PM-KISAN payments are generally treated as tax-exempt agricultural income support rather than taxable income, consistent with how direct income assistance to landholding farmer families is typically handled. Farmers with other sources of taxable income, such as rent, a salary, or non-farm business income, should still confirm their overall tax position with a qualified tax advisor rather than relying on a general rule for their specific case.
            </p>
            <p style={pStyle}>
              A Rs 6,000-a-year benefit on its own, averaging Rs 500 a month, sits far below the basic exemption limit under either tax regime, so it does not create a standalone tax liability. Anyone with mixed income sources can still check their combined position using the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>.
            </p>

            <h2 id="growing-your-installment" style={hStyle}>Growing your PM-KISAN installments</h2>
            <p style={pStyle}>
              Rs 2,000 landing three times a year is a small but genuinely usable amount to build into a savings habit rather than spend as soon as it arrives, and a few post-office and government-backed instruments suit that rhythm well. Three are worth a direct look, all conservative, all government-linked, and all a natural fit for a farm household already comfortable with post office and DBT-style products.
            </p>
            <BulletList items={[
              <span key={1}>Kisan Vikas Patra is a post office savings certificate built for exactly this kind of household, doubling a lump sum over a fixed government-set term; run each year's installment through the <Link href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>KVP Calculator</Link> to see the maturity value.</span>,
              <span key={2}>The Post Office Monthly Income Scheme turns a lump sum into a fixed monthly payout, useful for a family that wants predictable income rather than a lump sum years later; check the numbers with the <Link href="/calculators/post-office-mis-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Post Office MIS Calculator</Link>.</span>,
              <span key={3}>Atal Pension Yojana is built specifically for workers in the unorganized sector, including farmers, to build a small guaranteed pension over time; the <Link href="/calculators/atal-pension-yojana-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Atal Pension Yojana Calculator</Link> shows what a modest regular contribution could grow into.</span>,
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>KVP Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See how a saved PM-KISAN installment could double under a Kisan Vikas Patra term.</p>
              </div>
              <Link className="fx-btn" href="/calculators/kvp-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            <h2 id="comparison" style={hStyle}>PM-KISAN and other farmer welfare schemes</h2>
            <p style={pStyle}>
              PM-KISAN is direct income support, not the whole of India's farmer welfare architecture, and several other Central schemes cover ground PM-KISAN deliberately does not. Pradhan Mantri Fasal Bima Yojana handles crop insurance with a subsidized farmer premium, the Kisan Credit Card gives farmers access to short-term crop loans at concessional interest, and Pradhan Mantri Kisan Maandhan Yojana is a separate voluntary pension scheme aimed at small and marginal farmers.
            </p>
            <p style={pStyle}>
              None of these are automatically bundled with PM-KISAN enrollment. Each has its own eligibility check and its own application process, so a PM-KISAN beneficiary who also wants crop insurance, a credit line, or a farmer pension has to apply for each scheme separately rather than assuming PM-KISAN registration covers them.
            </p>


            <h2 id="faq" style={hStyle}>Frequently asked questions</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }}>
                  <summary style={{
                    padding: '14px 18px',
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

          <aside
            className="pm-kisan-sidebar"
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
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: C.ink3, fontWeight: 500 }}>Advertisement</span>
            </div>

            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
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
        .pm-kisan-sidebar::-webkit-scrollbar { width: 5px; }
        .pm-kisan-sidebar::-webkit-scrollbar-track { background: transparent; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .pm-kisan-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

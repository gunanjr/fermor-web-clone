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
  title: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount, Apply, Status',
  description: 'Jai Bangla Pension Scheme 2026: eligibility, all 11 sub-schemes, ₹1,000 monthly pension, Form P download, how to apply, and West Bengal old age pension status check on the Samarth portal.',
  alternates: { canonical: 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026' },
  openGraph: {
    title: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount & Apply - Fermor',
    description: 'Complete guide to West Bengal\'s Jai Bangla Pension Scheme: sub-schemes, eligibility, ₹1,000 monthly pension, Form P, and status check.',
    type: 'article',
    url: 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount & Apply - Fermor',
    description: 'West Bengal\'s Jai Bangla Pension Scheme: eligibility, sub-schemes, pension amount, Form P download, and status check.',
  },
};

const PUBLISHED = '2026-07-05T22:09:11+05:30';

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Jai Bangla Pension Scheme 2026: Eligibility, Sub-Schemes, Amount, How to Apply, and Status Check',
  url: 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete guide to West Bengal\'s Jai Bangla Pension Scheme: all 11 sub-schemes, eligibility by category, the ₹1,000 monthly pension, Form P download, how to apply at BDO/SDO/KMC offices, and how to check application and payment status online.',
  articleSection: 'Government Schemes',
  keywords: 'jai bangla pension scheme, joy bangla pension scheme, jai bangla status check, wcd old age pension, taposili bandhu, jai johar, form p jai bangla, west bengal old age pension, samarth wb gov in, samarth portal west bengal',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const faqItems = [
  { q: 'What is the Jai Bangla Pension Scheme?', a: 'Jai Bangla (also spelt Joy Bangla) is West Bengal\'s umbrella pension platform, launched on 1 April 2020, that consolidates old-age, widow, disability, SC/ST, and occupation-specific pension programmes under one system. It pays ₹1,000 a month via Direct Benefit Transfer and covers over 82 lakh approved beneficiaries.' },
  { q: 'Who is eligible for the Jai Bangla Pension Scheme?', a: 'Eligibility depends on the sub-scheme, but applicants must generally be permanent residents of West Bengal, must not already receive another government pension for the same purpose, and must hold an active bank account for Direct Benefit Transfer. Age, caste, disability, widowhood, or occupation conditions apply on top of this depending on which sub-scheme is chosen.' },
  { q: 'What is the WCD Old Age Pension Scheme under Jai Bangla?', a: 'The WCD Old Age Pension Scheme pays ₹1,000 a month to West Bengal residents aged 60 and above. It is the single largest programme under the Jai Bangla umbrella, covering 35.74 lakh beneficiaries as of May 2026.' },
  { q: 'What is the difference between the WCD Old Age Pension Scheme and IGNOAPS?', a: 'The WCD Old Age Pension Scheme is funded entirely by the West Bengal state government, while IGNOAPS (Indira Gandhi National Old Age Pension Scheme) is a centrally sponsored scheme funded jointly by the Centre and the state. Both currently pay ₹1,000 a month, and Jai Bangla tracks both through the same beneficiary portal.' },
  { q: 'What is the difference between Joy Bangla and Jai Bangla?', a: 'None. Both names refer to the exact same West Bengal government pension scheme. "Jai Bangla" is the official name, while "Joy Bangla" is a common alternative transliteration of the same Bengali phrase.' },
  { q: 'Where can I download Form P for the Jai Bangla Pension Scheme?', a: 'Form P is available at the Samarth portal (samarth.wb.gov.in) and at every BDO office, SDO office, and Kolkata Municipal Corporation office. A copy of the standard West Bengal pension application form is also hosted on the government\'s S3WaaS document server.' },
  { q: 'How do I check the Jai Bangla old age pension status online?', a: 'Go to samarth.wb.gov.in and open Track Applicant Status. Select the relevant sub-scheme, enter your Beneficiary ID, Aadhaar number, or registered mobile number, and submit to view your application status, approval stage, and payment history.' },
  { q: 'Is jaibangla.wb.gov.in still the correct portal for Jai Bangla pension status?', a: 'No. The Jai Bangla status-check portal has moved to samarth.wb.gov.in as part of the West Bengal government\'s One Umbrella Scheme for social pensions. The old jaibangla.wb.gov.in address no longer resolves; use samarth.wb.gov.in for beneficiary search, application tracking, and payment history.' },
  { q: 'How much monthly pension does Jai Bangla provide?', a: 'Most Jai Bangla sub-schemes pay ₹1,000 per month, credited directly to the beneficiary\'s bank account through Direct Benefit Transfer, generally on or around the first of each month. Some older sources still quote ₹600 for schemes such as Taposili Bandhu; that figure is outdated and predates the scheme\'s harmonisation under Jai Bangla.' },
  { q: 'Is Jai Bangla pension income taxable?', a: 'A ₹1,000/month (₹12,000/year) state welfare pension sits far below the basic exemption limit under both tax regimes, so it does not create any income tax liability on its own. If a beneficiary has other taxable income, they should run their total income through an income tax calculator to confirm their overall liability.' },
  { q: 'What happens to Lakshmir Bhandar beneficiaries who turn 60?', a: 'Eligible Lakshmir Bhandar beneficiaries are automatically transitioned to the applicable Jai Bangla pension scheme, such as WCD Old Age Pension, Taposili Bandhu, or Jai Johar, once they turn 60. No fresh application is required; the shift is handled through government beneficiary databases.' },
  { q: 'Can I apply for Jai Bangla pension entirely online?', a: 'Application status tracking and backend processing run on the Samarth portal, but the initial application for most beneficiaries is still submitted physically: Form P, filled and attached with documents, is handed in at a BDO office, SDO office, KMC office, or a Duare Sarkar camp for verification.' },
  { q: 'What documents are required for the Jai Bangla Pension Scheme?', a: 'Common documents include Aadhaar card, voter ID, ration card, bank passbook, passport-size photographs, and age proof. Depending on the sub-scheme, applicants also need a caste certificate (Taposili Bandhu, Jai Johar), a disability certificate or UDID card (Manabik), a spouse\'s death certificate (Widow Pension), or occupational registration documents.' },
  { q: 'Which government department administers the Jai Bangla Pension Scheme?', a: 'The umbrella platform is coordinated by West Bengal\'s Department of Women & Child Development and Social Welfare. Two large sub-schemes sit with their own dedicated departments: Jai Johar (ST beneficiaries) is administered through the Tribal Development Department, and Taposili Bandhu (SC beneficiaries) through the Backward Classes Welfare Department.' },
  { q: 'How many sub-schemes does Jai Bangla cover?', a: 'Jai Bangla covers 11 sub-schemes: WCD Old Age Pension, WCD Widow Pension, Taposili Bandhu, Jai Johar, WCD Manabik, Lok Prasar Prakalpa Pension, and old-age pensions for farmers, fishermen, purohits, textile workers, and MSME workers. Each pays ₹1,000 a month to its respective beneficiary group.' },
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Jai Bangla Pension Scheme 2026', item: 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Apply for the Jai Bangla Pension Scheme',
  description: 'Step-by-step guide to apply for a Jai Bangla pension using Form P.',
  totalTime: 'PT15M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Get Form P', text: 'Download Form P from the Jai Bangla portal or collect it from the nearest BDO, SDO, or KMC office.' },
    { '@type': 'HowToStep', position: 2, name: 'Fill in Details', text: 'Enter personal details, bank account information, address, and select the applicable sub-scheme.' },
    { '@type': 'HowToStep', position: 3, name: 'Attach Documents', text: 'Attach Aadhaar, bank passbook, photographs, age proof, and any sub-scheme-specific document such as a caste or disability certificate.' },
    { '@type': 'HowToStep', position: 4, name: 'Submit the Form', text: 'Submit the completed form at your local BDO office, SDO office, KMC office, or a Duare Sarkar camp.' },
    { '@type': 'HowToStep', position: 5, name: 'Verification', text: 'The concerned authority verifies the application and supporting documents.' },
    { '@type': 'HowToStep', position: 6, name: 'Approval and Payment', text: 'Once approved, the monthly pension is credited directly to the beneficiary\'s bank account through Direct Benefit Transfer.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026',
  name: 'Jai Bangla Pension Scheme 2026: Eligibility, Amount, How to Apply, Status Check - Fermor',
  url: 'https://fermor.in/blogs/jai-bangla-pension-scheme-2026',
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Jai Bangla Pension Scheme',
      alternateName: 'Joy Bangla Prakalpa',
      description: 'West Bengal\'s umbrella state pension platform, launched 1 April 2020, consolidating old-age, widow, disability, SC/ST, and occupational pension programmes under one Direct Benefit Transfer system.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Direct Benefit Transfer (DBT)',
      description: 'A payment mechanism where government benefit amounts are credited directly into a beneficiary\'s bank account, eliminating intermediaries.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'West Bengal senior citizens, widows, persons with disabilities, SC/ST residents, and family members applying on their behalf',
    geographicArea: { '@type': 'State', name: 'West Bengal' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#overview', name: 'Scheme Overview' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-jai-bangla', name: 'What is Jai Bangla' },
    { '@type': 'WebPageElement', cssSelector: '#latest-updates', name: 'Latest Updates' },
    { '@type': 'WebPageElement', cssSelector: '#sub-schemes', name: 'Sub-Schemes Covered' },
    { '@type': 'WebPageElement', cssSelector: '#wcd-old-age-pension', name: 'WCD Old Age Pension' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Eligibility Criteria' },
    { '@type': 'WebPageElement', cssSelector: '#pension-amount', name: 'Pension Amount and Disbursement' },
    { '@type': 'WebPageElement', cssSelector: '#lakshmir-bhandar-transition', name: 'Lakshmir Bhandar to Jai Bangla Transition' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-apply', name: 'How to Apply' },
    { '@type': 'WebPageElement', cssSelector: '#status-check', name: 'Status Check' },
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
  description: 'Fermor is building the automated financial action layer for India, connecting people who have financial decisions to make with the right products, tools, and advisors.',
  knowsAbout: ['West Bengal Government Schemes', 'Jai Bangla Pension Scheme', 'Old Age Pension India', 'Direct Benefit Transfer', 'Personal Finance India'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.85, marginBottom: 22 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 21, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 48, marginBottom: 18, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16.5, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 28, marginBottom: 14 };

function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <div style={{ marginBottom: 24 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 13 }}>
          <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 8 }} />
          <span style={{ fontFamily: INTER, fontSize: 15.5, color: C.ink, lineHeight: 1.75 }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

const thStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.ink, padding: '11px 15px', textAlign: 'left', borderBottom: `2px solid ${C.border}`, borderRight: `1px solid ${C.border}`, background: C.paleDg, whiteSpace: 'nowrap' };
const tdStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 13.5, color: C.ink, padding: '10px 15px', borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}`, lineHeight: 1.55 };
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

function FaqAccordion({ items }: { items: typeof faqItems }) {
  return (
    <div className="faq-accordion" style={{ marginTop: 24, border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {items.map((item, i) => (
        <details key={i} style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none' }}>
          <summary style={{ padding: '17px 20px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: C.dark, fontFamily: INTER, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', userSelect: 'none', lineHeight: 1.4 }}>
            <span style={{ paddingRight: 12 }}>{item.q}</span>
            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div style={{ padding: '0 20px 18px', background: '#fff' }}>
            <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.8, fontFamily: INTER, margin: 0 }}>{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

function Disclaimer() {
  return (
    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 22, marginTop: 36, fontFamily: INTER }}>
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.65, margin: 0 }} itemProp="disclaimer">
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only. Scheme rules, pension amounts, and beneficiary figures are subject to revision by the Government of West Bengal. Always verify the latest details on the Samarth portal (samarth.wb.gov.in) or at your local BDO/SDO office. Fermor is not affiliated with the Government of West Bengal and this is not official guidance.
      </p>
    </div>
  );
}

function KeyFacts() {
  const facts = [
    { label: 'Monthly pension', value: '₹1,000' },
    { label: 'Launched', value: '1 Apr 2020' },
    { label: 'Sub-schemes', value: '11' },
    { label: 'Beneficiaries', value: '82.02 lakh+' },
    { label: 'April 2026 disbursement', value: '₹646.72 cr' },
    { label: 'Payment mode', value: 'DBT' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Quick Facts</span>
      </div>
      {facts.map((item, i) => (
        <div key={item.label} style={{ padding: '11px 16px', borderBottom: i < facts.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: C.ink2 }}>{item.label}</span>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: C.dark, fontFamily: POPPINS }}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function FermorTools() {
  const tools = [
    { label: 'SCSS Calculator', desc: 'Senior Citizen Savings Scheme returns on top of this pension', href: '/calculators/scss-calculator' },
    { label: 'FD Calculator', desc: 'Compare fixed deposit returns for retirement savings', href: '/calculators/fd-calculator' },
    { label: 'Pension Calculator', desc: 'Estimate a broader retirement pension corpus', href: '/calculators/pension-calculator' },
    { label: 'Income Tax Calculator', desc: 'Check total tax liability including any other income', href: '/calculators/income-tax-calculator' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Fermor Calculators</span>
      </div>
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '14px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
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
    { href: '/blogs/epfo-8-25-percent-interest-rate-fy26', label: 'EPFO 8.25% Interest Rate FY26' },
    { href: '/blogs/epfo-login-uan-passbook', label: 'EPFO Login, UAN and PF Passbook Guide' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase' as const, color: C.ink3 }}>Related Articles</span>
      </div>
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '14px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}

const SUB_SCHEMES = [
  ['WCD Old Age Pension', 'Senior citizens (60+)', '₹1,000'],
  ['WCD Widow Pension', 'Widows (18+)', '₹1,000'],
  ['Taposili Bandhu', 'SC senior citizens', '₹1,000'],
  ['Jai Johar', 'ST senior citizens', '₹1,000'],
  ['WCD Manabik', 'Persons with disabilities', '₹1,000'],
  ['Lok Prasar Prakalpa Pension', 'Folk artists', '₹1,000'],
  ['Old Age Pension for Farmers', 'Eligible farmers', '₹1,000'],
  ['Old Age Pension for Fishermen', 'Eligible fishermen', '₹1,000'],
  ['State Welfare Scheme for Purohits', 'Hindu priests', '₹1,000'],
  ['Textile Pension Scheme', 'Weavers and artisans', '₹1,000'],
  ['MSME Pension Scheme', 'Eligible MSME workers', '₹1,000'],
];

export default function JaiBanglaPensionSchemePage() {
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
            <ol style={{ display: 'flex', gap: 6, alignItems: 'center', listStyle: 'none', margin: 0, padding: 0, fontFamily: INTER, fontSize: 12.5, color: C.ink3, flexWrap: 'wrap' }}>
              <li><Link href="/" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Home</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Jai Bangla Pension Scheme 2026</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '40px 24px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Government Schemes
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime={PUBLISHED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Jul 5, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>9 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(23px, 3.3vw, 33px)', fontWeight: 700, color: C.dark, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 18, maxWidth: 880 }}>
            Jai Bangla Pension Scheme 2026: Eligibility, Sub-Schemes, Amount, How to Apply, and Status Check
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 80px' }}>
        <div className="article-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 52, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 17 }}>
              The Jai Bangla Pension Scheme is West Bengal&apos;s umbrella social security platform, paying ₹1,000 a month to senior citizens, widows, persons with disabilities, SC/ST beneficiaries, and several occupational groups. Launched on 1 April 2020, it now covers over 82 lakh beneficiaries through Direct Benefit Transfer.
            </p>

            {/* SECTION: Overview */}
            <h2 id="overview" style={hStyle}>Jai Bangla Pension Scheme: Overview</h2>
            <p style={pStyle}>
              Jai Bangla (also written Joy Bangla) is a single platform that replaced several separately administered West Bengal pension schemes. The table below summarises the scheme at a glance.
            </p>
            <DataTable
              caption="Jai Bangla Pension Scheme: Key Parameters"
              headers={['Parameter', 'Detail']}
              rows={[
                ['Scheme Name', 'Jai Bangla Pension Scheme (Joy Bangla Prakalpa)'],
                ['Launched', '1 April 2020'],
                ['Implemented By', 'Government of West Bengal, Department of Women & Child Development and Social Welfare'],
                ['Type', 'Umbrella scheme covering 11 sub-schemes'],
                ['Monthly Pension', '₹1,000'],
                ['Eligible Age', 'Varies by sub-scheme'],
                ['Payment Mode', 'Direct Benefit Transfer (DBT)'],
                ['Application', 'Form P, submitted offline; status tracked online'],
                ['Status Check', 'samarth.wb.gov.in (Samarth portal)'],
                ['Beneficiaries', '82.02 lakh+ approved (as of 27 May 2026)'],
              ]}
            />

            {/* SECTION: What is Jai Bangla */}
            <h2 id="what-is-jai-bangla" style={hStyle}>What is the Jai Bangla Pension Scheme?</h2>
            <p style={pStyle}>
              Jai Bangla is West Bengal&apos;s consolidated pension platform, introduced on 1 April 2020 to bring old-age, widow, disability, SC/ST, and occupation-specific pensions under one system instead of separate departmental schemes.
            </p>
            <BulletList items={[
              <span key={1}><strong>Unified platform:</strong> old-age, widow, disability, SC/ST, and occupational pensions are tracked through a single beneficiary database instead of separate departmental records.</span>,
              <span key={2}><strong>Direct Benefit Transfer:</strong> the pension amount is credited straight into the beneficiary&apos;s bank account, generally on or around the first of every month.</span>,
              <span key={3}><strong>Local delivery network:</strong> the scheme runs through district administrations, BDO offices, SDO offices, Kolkata Municipal Corporation offices, and Duare Sarkar camps.</span>,
            ]} />

            {/* SECTION: Latest Updates */}
            <h2 id="latest-updates" style={hStyle}>Latest Updates</h2>
            <p style={pStyle}>
              Jai Bangla has gone through several milestones since launch, most recently the automatic transition of ageing Lakshmir Bhandar beneficiaries into the scheme.
            </p>
            <DataTable
              caption="Jai Bangla Pension Scheme: Timeline"
              headers={['Date', 'Update']}
              rows={[
                ['1 April 2020', 'Jai Bangla Pension Scheme launched, consolidating multiple pension programmes under one platform'],
                ['1 April 2023', 'Automatic transition from Lakshmir Bhandar to eligible Jai Bangla pension schemes introduced'],
                ['February 2024', 'Lakshmir Bhandar assistance revised under the State Budget'],
                ['27 May 2026', 'Jai Bangla MIS records show more than 82 lakh approved beneficiaries'],
                ['2026', 'Status-check and application tracking migrated from jaibangla.wb.gov.in to the new Samarth portal (samarth.wb.gov.in), built under the state\'s One Umbrella Scheme for social pensions; the old address no longer resolves'],
                ['July 2026', 'Physical Form P submission remains the primary application channel; online status tracking continues on samarth.wb.gov.in'],
              ]}
            />

            {/* SECTION: Sub-schemes */}
            <h2 id="sub-schemes" style={hStyle}>Sub-Schemes Covered Under Jai Bangla</h2>
            <p style={pStyle}>
              Jai Bangla covers 11 distinct pension programmes, each serving a different beneficiary group at the same ₹1,000 monthly rate.
            </p>
            <DataTable
              caption="Jai Bangla Sub-Schemes and Target Groups"
              headers={['Sub-Scheme', 'Target Group', 'Monthly Pension']}
              rows={SUB_SCHEMES}
            />
            <p style={pStyle}>
              Per Jai Bangla MIS data dated 27 May 2026, the scheme covers 82.02 lakh approved beneficiaries across all 11 sub-schemes combined.
            </p>

            {/* SECTION: WCD Old Age Pension */}
            <h2 id="wcd-old-age-pension" style={hStyle}>West Bengal Old Age Pension Under Jai Bangla</h2>
            <p style={pStyle}>
              The West Bengal old age pension is officially the WCD Old Age Pension Scheme, paying ₹1,000 a month to permanent residents aged 60 and above. As of May 2026, it covers over 35.74 lakh beneficiaries, making it the largest single programme under the Jai Bangla umbrella.
            </p>
            <DataTable
              caption="WCD Old Age Pension Scheme: Key Features"
              headers={['Particulars', 'Details']}
              rows={[
                ['Scheme', 'WCD Old Age Pension Scheme'],
                ['Covered Under', 'Jai Bangla Pension Scheme'],
                ['Eligible Age', '60 years and above'],
                ['Monthly Pension', '₹1,000'],
                ['Payment Mode', 'Direct Benefit Transfer (DBT)'],
                ['Implementing Department', 'Department of Women & Child Development and Social Welfare'],
                ['Active Beneficiaries', '35.74 lakh (May 2026)'],
              ]}
            />
            <h3 style={h3Style}>How is WCD Old Age Pension Different from IGNOAPS?</h3>
            <p style={pStyle}>
              The WCD Old Age Pension Scheme is funded entirely by the West Bengal government, while IGNOAPS (Indira Gandhi National Old Age Pension Scheme) is centrally sponsored with state top-up. Both pay eligible beneficiaries ₹1,000 a month, and both are tracked through the same Jai Bangla portal, so the funding source rarely matters to the beneficiary in practice.
            </p>
            <DataTable
              caption="WCD Old Age Pension vs IGNOAPS"
              headers={['Scheme', 'Funding Pattern', 'Monthly Pension']}
              rows={[
                ['WCD Old Age Pension Scheme', 'Government of West Bengal', '₹1,000'],
                ['IGNOAPS (60-79 years)', 'Central Government + State top-up', '₹1,000'],
                ['IGNOAPS (80 years and above)', 'Central Government + State top-up', '₹1,000'],
              ]}
            />

            {/* SECTION: Eligibility */}
            <h2 id="eligibility" style={hStyle}>Eligibility Criteria</h2>
            <p style={pStyle}>
              Eligibility rules differ by sub-scheme, but every applicant must first satisfy a short list of common conditions before the scheme-specific ones apply.
            </p>
            <h3 style={h3Style}>Common Eligibility Conditions</h3>
            <BulletList items={[
              'Permanent resident of West Bengal and an Indian citizen.',
              'Not already receiving another government pension for the same purpose.',
              'Holds an active bank account for Direct Benefit Transfer.',
              'Aadhaar details updated wherever required for beneficiary verification.',
            ]} />
            <h3 style={h3Style}>Taposili Bandhu and Jai Johar</h3>
            <p style={pStyle}>
              Applicants must be 60 or above, belong to a Scheduled Caste (Taposili Bandhu) or Scheduled Tribe (Jai Johar), hold a valid caste certificate from a competent authority, and reside in West Bengal.
            </p>
            <h3 style={h3Style}>Manabik Scheme (Disability)</h3>
            <p style={pStyle}>
              Applicants need a disability of at least 40%, a valid disability certificate or UDID card, and West Bengal residency. There is no minimum age requirement under Manabik.
            </p>
            <h3 style={h3Style}>Widow Pension Scheme</h3>
            <p style={pStyle}>
              Applicants must be widows aged 18 or above, resident in West Bengal, and must meet the scheme&apos;s prescribed documentation requirements.
            </p>
            <h3 style={h3Style}>Occupational Pension Schemes</h3>
            <p style={pStyle}>
              Farmers, fishermen, artisans, textile workers, purohits, MSME workers, and folk artists (Lok Prasar Prakalpa) must submit the relevant occupational registration document issued by the competent authority for their category.
            </p>

            {/* SECTION: Pension Amount */}
            <h2 id="pension-amount" style={hStyle}>Pension Amount and Disbursement Schedule</h2>
            <p style={pStyle}>
              Most Jai Bangla sub-schemes pay ₹1,000 a month. Per Jai Bangla MIS data, ₹646.72 crore was disbursed across all sub-schemes during the April 2026 payment cycle.
            </p>
            <BulletList items={[
              'Payments are generally released on or around the first day of every month, integrated with the West Bengal Integrated Financial Management System (WBIFMS).',
              'The amount is credited directly to the beneficiary\'s bank account through Direct Benefit Transfer, with no manual disbursement.',
              'Some older sources still list ₹600 for schemes such as Taposili Bandhu. That figure predates the scheme\'s 2020 harmonisation under Jai Bangla; the current rate across most sub-schemes is ₹1,000.',
            ]} />
            <p style={pStyle}>
              ₹1,000 a month is a fixed floor, not a ceiling: many beneficiaries add a Senior Citizen Savings Scheme deposit or a bank fixed deposit on top of it. Run the numbers through the <Link href="/calculators/scss-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SCSS Calculator</Link> or the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> to see how much extra monthly income a modest lump sum can add.
            </p>

            {/* In-Content Promo Bar */}
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SCSS Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See the quarterly payout a Senior Citizen Savings Scheme deposit would add on top of this pension.</p>
              </div>
              <Link className="fx-btn" href="/calculators/scss-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            {/* SECTION: Lakshmir Bhandar Transition */}
            <h2 id="lakshmir-bhandar-transition" style={hStyle}>Lakshmir Bhandar to Jai Bangla Pension Transition</h2>
            <p style={pStyle}>
              West Bengal automatically transitions eligible Lakshmir Bhandar beneficiaries into the applicable Jai Bangla pension scheme once they turn 60, with no fresh application required.
            </p>
            <BulletList items={[
              'The shift is handled entirely through government beneficiary databases and verification systems.',
              'Depending on eligibility, a beneficiary may move to the Old Age Pension Scheme, Taposili Bandhu, or Jai Johar.',
              'This keeps social security support continuous once a beneficiary ages out of Lakshmir Bhandar\'s 25-60 eligibility window.',
            ]} />

            {/* SECTION: Documents Required */}
            <h2 id="documents-required" style={hStyle}>Documents Required for Jai Bangla Pension</h2>
            <p style={pStyle}>
              Most applicants need a common core set of documents, plus one additional document specific to their sub-scheme.
            </p>
            <DataTable
              caption="Documents Required by Category"
              headers={['Category', 'Documents Needed']}
              rows={[
                ['All applicants', 'Aadhaar card, voter ID, ration card, bank passbook, passport-size photographs, age proof'],
                ['Taposili Bandhu / Jai Johar', 'Caste certificate (SC or ST) from a competent authority'],
                ['Manabik Scheme', 'Disability certificate or UDID card'],
                ['Widow Pension', 'Death certificate of spouse'],
                ['Occupational pensions', 'Occupational registration document (farmer, fisherman, artisan, textile worker, purohit, MSME, or folk artist registration)'],
              ]}
            />
            <p style={pStyle}>
              A ₹1,000/month pension on its own stays well below the tax-free threshold, but beneficiaries with other income sources should confirm their total liability using the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>, and those planning a broader retirement income can size the full picture with the <Link href="/calculators/pension-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Pension Calculator</Link>.
            </p>

            {/* SECTION: How to Apply */}
            <h2 id="how-to-apply" style={hStyle}>How to Apply for Jai Bangla Pension</h2>
            <p style={pStyle}>
              Applications are submitted using Form P at a local government office. The process takes about 15 minutes to complete, excluding office queue time.
            </p>
            <div style={{ marginBottom: 24 }}>
              {[
                { title: 'Get Form P', text: 'Download Form P from the Jai Bangla portal, or collect a printed copy at the nearest BDO, SDO, or KMC office.' },
                { title: 'Fill in Your Details', text: 'Enter personal details, bank account information, address, and select the applicable sub-scheme.' },
                { title: 'Attach Documents', text: 'Attach Aadhaar, bank passbook, photographs, age proof, and any sub-scheme-specific document.' },
                { title: 'Submit the Form', text: 'Submit at your BDO office (rural areas), SDO office (urban areas), KMC office, or a Duare Sarkar camp.' },
                { title: 'Verification', text: 'The concerned authority verifies the application and the attached documents.' },
                { title: 'Approval and First Payment', text: 'Once approved, the pension is credited directly to the beneficiary\'s bank account through Direct Benefit Transfer.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 18, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, margin: '0 0 4px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 15, color: C.ink2, margin: 0, lineHeight: 1.7 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14.5, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Form P (Government of West Bengal)</p>
                <p style={{ fontFamily: INTER, fontSize: 13.5, color: C.ink2, margin: 0 }}>Official pension application form, hosted on the government&apos;s S3WaaS document server.</p>
              </div>
              <a className="fx-btn" href="https://cdn.s3waas.gov.in/s3aff1621254f7c1be92f64550478c56e6/uploads/2021/06/2021061818.pdf" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                Download Form P (PDF)
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </a>
            </div>
            <p style={pStyle}>
              Online submission is not yet the standard channel: initial applications are still predominantly submitted physically at BDO/SDO/KMC offices or Duare Sarkar camps, so that biometric and document verification can happen in person. The Samarth portal (samarth.wb.gov.in) handles digitisation and status tracking after that point.
            </p>

            {/* SECTION: Status Check */}
            <h2 id="status-check" style={hStyle}>West Bengal Old Age Pension Status Check</h2>
            <p style={pStyle}>
              Applicants can track their application and payment status on the official Jai Bangla beneficiary portal at any time after submission.
            </p>
            <BulletList items={[
              <span key={1}>Visit the <a href="https://samarth.wb.gov.in/track-applicant-public" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Samarth portal</a> and open Track Applicant Status.</span>,
              <span key={2}>Select the relevant sub-scheme from the dropdown, such as Taposili Bandhu, Jai Johar, WCD Old Age Pension, WCD Widow Pension, or WCD Manabik.</span>,
              <span key={3}>Enter your Beneficiary ID, Aadhaar number, or registered mobile number.</span>,
              <span key={4}>Submit the form to view application status, approval stage, and payment history.</span>,
            ]} />

            

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Jai Bangla Pension Scheme</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* SIDEBAR */}
          <aside
            className="jai-bangla-sidebar"
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

      <SiteFooter columns={DISCOVERY_COLUMNS} />

      <style>{`
        .jai-bangla-sidebar::-webkit-scrollbar { width: 5px; }
        .jai-bangla-sidebar::-webkit-scrollbar-track { background: transparent; }
        .jai-bangla-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .jai-bangla-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

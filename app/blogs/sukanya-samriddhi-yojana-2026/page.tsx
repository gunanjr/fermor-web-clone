import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';

export const metadata: Metadata = {
  title: 'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Rules',
  description: 'Complete Sukanya Samriddhi Yojana guide for 2026: current 8.2% interest rate, who can open an account, where to open it (post office vs SBI, HDFC, ICICI, Axis), documents required, deposit limits, the 15-year deposit and 21-year maturity rule, tax benefits, withdrawal rules, and how SSY compares to PPF and FD. Free to use.',
  alternates: {
    canonical: 'https://fermor.in/blogs/sukanya-samriddhi-yojana-2026',
  },
  openGraph: {
    title: 'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Rules',
    description: 'SSY pays 8.2% p.a., tax-free, for a girl child below 10. Full guide: eligibility, where to open, documents, deposit limits, maturity rules, tax benefits, and SSY vs PPF vs FD.',
    type: 'article',
    publishedTime: '2026-10-06T17:10:13+05:30',
    authors: ['Fermor Analysis'],
    tags: ['Sukanya Samriddhi Yojana', 'SSY', 'Government Scheme', 'Girl Child Savings', 'Post Office Schemes'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Rules',
    description: 'SSY pays 8.2% p.a., tax-free, for a girl child below 10. Eligibility, where to open, documents, deposit limits, maturity rules, and SSY vs PPF vs FD.',
  },
  keywords: [
    'sukanya samriddhi yojana', 'sukanya samriddhi yojana 2026', 'sukanya samriddhi yojana calculator',
    'sukanya samriddhi yojana interest rate', 'sukanya samriddhi yojana post office',
    'sukanya samriddhi yojana scheme', 'sukanya samriddhi yojana details', 'sukanya samriddhi yojana eligibility',
    'sukanya samriddhi yojana age limit', 'sukanya samriddhi yojana documents required',
    'sukanya samriddhi yojana account opening online', 'sbi sukanya samriddhi yojana',
    'hdfc bank sukanya samriddhi yojana', 'sukanya samriddhi yojana interest rate 2026',
    'sukanya samriddhi yojana benefits', 'post office sukanya samriddhi yojana monthly 1000',
    'sukanya samriddhi yojana kya hai', 'sukanya samriddhi yojana balance check',
  ],
};

const PUBLISHED = '2026-10-06T17:10:13+05:30';
const UPDATED = '2026-10-06T17:10:13+05:30';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Where to Open and Rules Explained',
  description: 'Complete guide to Sukanya Samriddhi Yojana: the current 8.2% interest rate, who qualifies and the two-girl-child limit, where to open an account (post office versus SBI, HDFC, ICICI, Axis, UCO, Bank of India), documents required, minimum and maximum deposit rules, how interest is calculated, the 15-year deposit and 21-year maturity structure, Section 80C and EEE tax treatment, balance and passbook checks, withdrawal and premature closure rules, common mistakes, and a comparison against PPF and fixed deposits.',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://fermor.in/blogs/sukanya-samriddhi-yojana-2026' },
  articleSection: 'Government Schemes',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'Sukanya Samriddhi Yojana', description: 'A government-backed small savings scheme for a girl child below 10 years, opened at a post office or authorised bank, currently paying 8.2% per annum compounded annually.' },
    { '@type': 'GovernmentOrganization', name: 'National Savings Institute', description: 'The Department of Economic Affairs body under the Ministry of Finance that administers Sukanya Samriddhi Yojana and other small savings schemes.' },
  ],
  keywords: 'sukanya samriddhi yojana, ssy interest rate, ssy eligibility, ssy calculator, ssy documents, ssy account opening, ssy maturity, ssy tax benefits',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Sukanya Samriddhi Yojana (SSY) 2026', item: 'https://fermor.in/blogs/sukanya-samriddhi-yojana-2026' },
  ],
};

const faqItems = [
  { q: 'What is Sukanya Samriddhi Yojana?', a: 'Sukanya Samriddhi Yojana (SSY) is a government-backed small savings scheme that lets a parent or legal guardian open a dedicated savings account for a girl child below 10 years of age at a post office or an authorised bank. It currently pays 8.2% per annum, compounded annually, and the entire maturity amount is tax-free under the EEE structure.' },
  { q: 'What is the current Sukanya Samriddhi Yojana interest rate in 2026?', a: 'The SSY interest rate is 8.2% per annum, compounded annually, for the July-September 2026 quarter (Q2 FY 2026-27). The rate has held at 8.2% since 1 January 2024 and is the highest among all government-backed small savings instruments, ahead of PPF at 7.1%.' },
  { q: 'Who is eligible to open a Sukanya Samriddhi Yojana account?', a: 'A natural or legal guardian can open an SSY account for a girl child who is an Indian resident and below 10 years of age at the time the account is opened. There is no lower age limit, so an account can be opened any time from birth until the girl turns 10.' },
  { q: 'How many Sukanya Samriddhi Yojana accounts can one family open?', a: 'A family can open SSY accounts for a maximum of two girl children, with a third account permitted only where the second or third birth results in twins or triplets. Only one account can be opened per girl child, and it cannot be opened jointly with anyone.' },
  { q: 'Where can I open a Sukanya Samriddhi Yojana account?', a: 'An SSY account can be opened at any India Post office or at an authorised commercial bank that offers the scheme, including SBI, HDFC Bank, ICICI Bank, Axis Bank, UCO Bank, and Bank of India. The post office and every authorised bank offer the same government-notified interest rate and rules, so the choice comes down to convenience rather than returns.' },
  { q: 'Does LIC offer Sukanya Samriddhi Yojana?', a: 'No. SSY accounts can only be opened at a post office or an authorised bank, not through LIC, which is a life insurance company rather than a banking or postal institution. LIC and other insurers sell separate child-focused insurance and investment plans that are sometimes confused with SSY but are not the same product.' },
  { q: 'What documents are required to open an SSY account?', a: 'You need the SSY account opening form, the girl child\'s birth certificate, and KYC documents (identity and address proof, such as Aadhaar or PAN) for the guardian opening the account. A passport-size photograph of the girl child and the initial deposit of at least Rs 250 are also required at the time of opening.' },
  { q: 'Can a Sukanya Samriddhi Yojana account be opened online?', a: 'Full online, paperless account opening is not uniformly available across every post office and bank; most SSY accounts are still opened in person with physical documents. Several banks now offer online SSY account opening for their existing net-banking customers, so check directly with the specific bank if opening online matters to you.' },
  { q: 'What is the minimum and maximum deposit allowed in SSY?', a: 'You can deposit a minimum of Rs 250 and a maximum of Rs 1,50,000 in a financial year, in multiples of Rs 50, either as a lump sum or in instalments. The full amount deposited qualifies for deduction under Section 80C of the Income Tax Act, within the overall Rs 1.5 lakh limit for that section.' },
  { q: 'How many years do I need to deposit money into an SSY account?', a: 'Deposits are required for 15 years from the date the account is opened. After that, no further deposits are needed, and the account simply continues to earn interest on the accumulated balance until it matures 21 years after it was opened.' },
  { q: 'When does a Sukanya Samriddhi Yojana account mature?', a: 'The account matures 21 years from the date it was opened, or when the girl marries after turning 18, whichever happens earlier. Unlike PPF, an SSY account does not earn further interest once it has matured and not been closed, so it is worth closing the account and withdrawing the amount at maturity rather than leaving it untouched.' },
  { q: 'Is the Sukanya Samriddhi Yojana maturity amount taxable?', a: 'No. SSY follows the EEE (Exempt-Exempt-Exempt) tax structure: your annual deposits qualify for an 80C deduction, the interest credited every year is tax-free, and the entire maturity amount, including all accumulated interest, is exempt from tax on withdrawal.' },
  { q: 'What happens if I miss a yearly deposit in SSY?', a: 'If the minimum deposit of Rs 250 is not made in a financial year, the account becomes classified as "irregular." It can be revived by paying the minimum deposit for every missed year plus a penalty of Rs 50 per missed year, any time before the account completes 15 years from opening.' },
  { q: 'Can I withdraw money from SSY before maturity?', a: 'Once the account holder turns 18, up to 50% of the balance as it stood at the end of the preceding financial year can be withdrawn for higher education or marriage expenses, on submission of proof such as an admission offer or marriage notice. Full premature closure is otherwise restricted to specific grounds: the girl\'s marriage after she turns 18, her death, or compassionate grounds such as a life-threatening medical condition, with the relevant authority\'s approval.' },
  { q: 'Does SSY offer a loan facility like PPF?', a: 'No. Unlike PPF, which allows a loan against the balance after the third year, SSY has no loan facility at all. The only ways to access funds before maturity are the partial withdrawal allowed once the girl turns 18, or one of the specific premature closure grounds.' },
  { q: 'How do I check my SSY account balance?', a: 'For an account opened at a post office, the balance is recorded in the physical passbook, updated at the branch counter; there is no single national online portal for post-office SSY balance checks the way EPFO has one for PF. For an account opened through a bank, the balance is usually visible through that bank\'s own net banking or mobile app, since the SSY account sits alongside your other accounts with that bank.' },
  { q: 'Is Sukanya Samriddhi Yojana better than PPF or a fixed deposit for a daughter\'s future?', a: 'SSY currently pays a higher rate than PPF (8.2% versus 7.1%) and is purpose-built for a girl child, with a fixed 21-year maturity timed around her higher education and marriage. A fixed deposit\'s interest is fully taxable as per your income slab, while SSY and PPF interest is entirely tax-free, though PPF stays open to any investor and offers more flexibility through 5-year extensions and a loan facility that SSY does not have.' },
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
  '@id': 'https://fermor.in/blogs/sukanya-samriddhi-yojana-2026',
  name: 'Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Where to Open and Rules Explained',
  url: 'https://fermor.in/blogs/sukanya-samriddhi-yojana-2026',
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: UPDATED,
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Sukanya Samriddhi Yojana',
      alternateName: 'SSY',
      description: 'A government-backed small savings scheme, opened at a post office or authorised bank for a girl child below 10, currently paying 8.2% per annum compounded annually with full tax exemption under Section 80C and the EEE structure.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'EEE Tax Status',
      description: 'A tax treatment, used by SSY and PPF, where the deposit, the interest earned, and the maturity amount are all exempt from income tax.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Government Welfare Scheme Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Parents and legal guardians of a girl child below 10, across India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-ssy', name: 'What Is Sukanya Samriddhi Yojana' },
    { '@type': 'WebPageElement', cssSelector: '#interest-rate', name: 'SSY Interest Rate 2026' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Who Is Eligible' },
    { '@type': 'WebPageElement', cssSelector: '#where-to-open', name: 'Where to Open an SSY Account' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#deposit-rules', name: 'Deposit Rules and Limits' },
    { '@type': 'WebPageElement', cssSelector: '#interest-calculation', name: 'How SSY Interest Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#maturity-tenure', name: 'Maturity and Tenure' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits', name: 'Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#balance-check', name: 'Checking Your Balance and Passbook' },
    { '@type': 'WebPageElement', cssSelector: '#comparison', name: 'SSY vs PPF vs Fixed Deposit' },
    { '@type': 'WebPageElement', cssSelector: '#withdrawal-rules', name: 'Withdrawal and Premature Closure' },
    { '@type': 'WebPageElement', cssSelector: '#mistakes', name: 'Common Mistakes to Avoid' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator', name: 'How to Use the SSY Calculator' },
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
  knowsAbout: ['Sukanya Samriddhi Yojana', 'SSY', 'Girl Child Savings Schemes', 'Post Office Small Savings Schemes', 'Public Provident Fund', 'Personal Finance India'],
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
    { label: 'Sukanya Samriddhi Yojana (SSY) 2026' },
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
    { label: 'Current rate', value: '8.2% p.a.' },
    { label: 'Min / Max deposit', value: 'Rs 250 / Rs 1.5L' },
    { label: 'Age limit', value: 'Below 10 years' },
    { label: 'Deposit period', value: '15 years' },
    { label: 'Maturity', value: '21 years' },
    { label: 'Tax status', value: 'EEE (80C)' },
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
    { label: 'SSY Calculator', desc: 'Project your exact maturity amount from your yearly deposit', href: '/calculators/ssy-calculator' },
    { label: 'PPF Calculator', desc: 'Compare SSY against the open-to-all Public Provident Fund', href: '/calculators/ppf-calculator' },
    { label: 'FD Calculator', desc: 'See how much less a taxable fixed deposit nets you', href: '/calculators/fd-calculator' },
    { label: 'Section 80C Calculator', desc: 'Check your total 80C usage across SSY and other instruments', href: '/calculators/section-80c-calculator' },
    { label: 'Child Education Planner', desc: 'Model your daughter\'s education costs against SSY maturity', href: '/calculators/child-education-planner-calculator' },
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
    { href: '/blogs/pm-kisan-samman-nidhi-scheme', label: 'PM-KISAN Scheme: Eligibility, Benefit, eKYC and Status' },
    { href: '/blogs/section-87a-rebate', label: 'Section 87A Rebate: Eligibility and How It Works' },
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
        <strong style={{ fontWeight: 600, color: C.ink3 }}>Note:</strong> This article is based on the official Sukanya Samriddhi Account Scheme page and interest rate notifications at <a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89" target="_blank" rel="noopener noreferrer" style={{ color: C.ink2 }}>nsiindia.gov.in</a>, current as of publication. Interest rates are revised quarterly by the government and can change; bank-specific procedures (online account opening, net banking access) vary by bank and branch, so always confirm the current rate and your bank or post office's specific process before acting. Fermor is not affiliated with the Government of India or any bank named here, and this is not official guidance or tax advice.
      </p>
    </div>
  );
}


export default function SukanyaSamriddhiYojanaPage() {
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
            Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Eligibility, Where to Open and Rules Explained
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 720, marginBottom: 22 }}>
            A complete guide to the 8.2% SSY scheme: who qualifies, where to open an account, documents needed, deposit limits, how the 15-year deposit and 21-year maturity structure works, tax benefits, and how SSY stacks up against PPF and fixed deposits.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Published <time dateTime={PUBLISHED}>Oct 6, 2026</time></span>
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
              Sukanya Samriddhi Yojana (SSY) is a government-backed small savings scheme that lets a parent or legal guardian open a dedicated account for a girl child below 10 years of age at a post office or an authorised bank. It currently pays 8.2% per annum, compounded annually, the highest rate among all government small savings instruments, and the entire maturity amount is exempt from tax.
            </p>
            <p style={pStyle}>
              This guide covers the full picture: who exactly qualifies, where you can open the account, the documents you need, how much you can deposit, how the interest and the 15-year deposit, 21-year maturity structure actually work, the tax benefits, how to check your balance, withdrawal rules, common mistakes, and where SSY sits against PPF and a fixed deposit.
            </p>

            <h2 id="what-is-ssy" style={hStyle}>What is Sukanya Samriddhi Yojana?</h2>
            <p style={pStyle}>
              Sukanya Samriddhi Yojana is a small savings scheme launched in January 2015 under the government's Beti Bachao, Beti Padhao campaign, designed to help parents build a dedicated corpus for a girl child's education and marriage. Per <a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>nsiindia.gov.in</a>, the account is opened in the name of a girl child and matures 21 years after it was opened, with deposits required only for the first 15 years.
            </p>
            <p style={pStyle}>
              The scheme is administered by the National Savings Institute under the Department of Economic Affairs, Ministry of Finance, and sold through the same post office and bank network as PPF, NSC, and the Kisan Vikas Patra. Like PPF, it follows the EEE (Exempt-Exempt-Exempt) tax model, which is the main reason it is so often compared to PPF rather than to a bank fixed deposit.
            </p>
            <BulletList items={[
              <span key={1}><strong>Who it is for:</strong> a girl child who is an Indian resident and below 10 years of age when the account is opened.</span>,
              <span key={2}><strong>Who opens it:</strong> a parent or legal guardian, on the girl's behalf.</span>,
              <span key={3}><strong>Where it is sold:</strong> any India Post office or an authorised bank offering the scheme.</span>,
              <span key={4}><strong>What it pays:</strong> 8.2% per annum, compounded annually, fully tax-free at maturity.</span>,
            ]} />
            <DataTable
              caption="Sukanya Samriddhi Yojana: Key Parameters"
              headers={['Parameter', 'Detail']}
              rows={[
                ['Scheme Name', 'Sukanya Samriddhi Yojana (SSY)'],
                ['Launched', 'January 2015, under Beti Bachao, Beti Padhao'],
                ['Who Can Open', 'Parent or legal guardian, for a girl child below 10'],
                ['Current Interest Rate', '8.2% p.a., compounded annually'],
                ['Minimum / Maximum Deposit', 'Rs 250 / Rs 1,50,000 per financial year'],
                ['Deposit Period', '15 years from account opening'],
                ['Maturity', '21 years from account opening'],
                ['Tax Treatment', 'EEE: deposit, interest, and maturity all tax-exempt'],
                ['Administered By', <a key="nsi" href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>National Savings Institute (nsiindia.gov.in)</a>],
              ]}
            />

            <h2 id="interest-rate" style={hStyle}>SSY interest rate 2026: how much does it pay?</h2>
            <p style={pStyle}>
              The Sukanya Samriddhi Yojana interest rate is 8.2% per annum, compounded annually, for the July-September 2026 quarter (Q2 FY 2026-27). This rate has held steady at 8.2% since 1 January 2024 across every quarter since, making SSY the highest-paying government-backed small savings scheme currently available, ahead of PPF at 7.1% and the 5-year NSC.
            </p>
            <p style={pStyle}>
              The government reviews and can revise small savings rates every quarter, so the 8.2% figure is not locked for the life of your account. When the scheme launched in December 2014, its first notified rate was 9.1% per annum, and the rate has moved several times since; the full quarter-by-quarter history is published on <a href="https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=179" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>nsiindia.gov.in's interest rate since inception page</a>.
            </p>
            <BulletList items={[
              'Interest is calculated monthly on the lowest balance between the 5th and the last day of the month, then credited to the account annually.',
              'A rate change applies to the balance going forward; it does not retroactively change interest already credited for past years.',
              'Because the rate can move every quarter, long-term maturity projections are estimates, not guarantees, unless the rate stays flat for the full tenure.',
            ]} />
            <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>SSY Calculator</p>
                <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See exactly how much your yearly deposit grows to by maturity at the current 8.2% rate.</p>
              </div>
              <Link className="fx-btn" href="/calculators/ssy-calculator" target="_blank" rel="noopener noreferrer"
                style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Open calculator
              </Link>
            </div>

            <h2 id="eligibility" style={hStyle}>Who is eligible to open an SSY account?</h2>
            <p style={pStyle}>
              A parent or legal guardian can open an SSY account for a girl child who is an Indian resident and below 10 years of age. There is no lower age limit, so the account can be opened any time from birth until the girl turns 10, and there is no restriction tied to the family's income.
            </p>
            <BulletList items={[
              <span key={1}><strong>Age limit:</strong> the girl must be below 10 years old at the time the account is opened; there is no minimum age.</span>,
              <span key={2}><strong>Residency:</strong> the girl child must be an Indian resident.</span>,
              <span key={3}><strong>Account limit per child:</strong> only one SSY account can be opened per girl child, and it cannot be held jointly.</span>,
              <span key={4}><strong>Account limit per family:</strong> a maximum of two accounts, for up to two girl children in the family, with a third allowed only if the second or third birth results in twins or triplets.</span>,
            ]} />
            <Callout>
              The two-account limit applies per family, not per parent, so it cannot be worked around by opening accounts through different guardians within the same household. Confirm your specific case with the branch before opening a second or third account.
            </Callout>

            <h2 id="where-to-open" style={hStyle}>Where to open an SSY account: post office vs banks</h2>
            <p style={pStyle}>
              An SSY account can be opened at any India Post office or at an authorised commercial bank that offers the scheme, and both channels pay the identical government-notified interest rate. Several major banks offer SSY accounts, including State Bank of India, HDFC Bank, ICICI Bank, Axis Bank, UCO Bank, and Bank of India, each with its own account opening form and branch process.
            </p>
            <p style={pStyle}>
              The choice between a post office and a bank comes down to convenience rather than returns, since the rate, deposit limits, and maturity rules are set centrally and apply identically everywhere. An account opened through a bank you already use for other products can be simpler to track, since it may appear alongside your other accounts in that bank's net banking or mobile app.
            </p>
            <BulletList items={[
              'India Post office: available at nearly every post office branch across the country, including rural areas without a nearby bank branch.',
              'Authorised banks: SBI, HDFC Bank, ICICI Bank, Axis Bank, UCO Bank, and Bank of India are among the banks offering SSY; check with your own bank, as the list of authorised banks can expand.',
              'LIC does not offer SSY: LIC is a life insurance company, not a bank or post office, so it cannot open an SSY account; any LIC child plan is a separate product.',
              'An existing account can be transferred free of cost between post offices and authorised banks anywhere in India, typically when a family relocates.',
            ]} />


            <h2 id="documents" style={hStyle}>Documents required to open an SSY account</h2>
            <p style={pStyle}>
              Opening an SSY account needs the scheme's own account opening form, the girl child's birth certificate, and standard KYC documents for the guardian. Most branches also ask for a passport-size photograph of the girl child and the initial deposit at the time of submission.
            </p>
            <BulletList items={[
              <span key={1}><strong>SSY account opening form:</strong> available at the branch counter or on the bank's website, filled in by the guardian.</span>,
              <span key={2}><strong>Birth certificate:</strong> of the girl child, to confirm age and identity.</span>,
              <span key={3}><strong>Guardian's KYC:</strong> identity proof (such as Aadhaar or PAN) and address proof for the parent or legal guardian opening the account.</span>,
              <span key={4}><strong>Photograph:</strong> a recent passport-size photograph of the girl child.</span>,
              <span key={5}><strong>Initial deposit:</strong> at least Rs 250, paid in cash, cheque, or demand draft at the time of opening.</span>,
            ]} />
            <p style={pStyle}>
              Full online, paperless account opening is not uniformly available at every branch; most SSY accounts are still opened in person with these physical documents. Some banks now let existing net-banking customers start the process online, so it is worth checking directly with your own bank if an online application matters to you.
            </p>

            <h2 id="deposit-rules" style={hStyle}>Deposit rules: how much can you put in?</h2>
            <p style={pStyle}>
              You can deposit a minimum of Rs 250 and a maximum of Rs 1,50,000 in a financial year, in multiples of Rs 50, either as a single lump sum or in several instalments through the year. The full amount deposited in a year qualifies for deduction under Section 80C of the Income Tax Act, within the overall Rs 1.5 lakh limit for that section.
            </p>
            <DataTable
              caption="SSY Deposit Limits"
              headers={['Rule', 'Detail']}
              rows={[
                ['Minimum deposit per year', 'Rs 250'],
                ['Maximum deposit per year', 'Rs 1,50,000'],
                ['Deposit multiples', 'Multiples of Rs 50'],
                ['Deposit mode', 'Lump sum or multiple instalments, any time in the financial year'],
                ['Section 80C deduction', 'Full deposited amount, within the overall Rs 1.5 lakh 80C limit'],
              ]}
            />
            <p style={pStyle}>
              If the minimum Rs 250 is not deposited in any financial year, the account is classified as "irregular." It can be revived by paying the minimum deposit for every missed year plus a penalty of Rs 50 per missed year, any time before the account completes 15 years from the date it was opened.
            </p>

            <h2 id="interest-calculation" style={hStyle}>How is SSY interest calculated?</h2>
            <p style={pStyle}>
              SSY interest is computed monthly on the lowest balance held between the 5th and the last day of each month, and that interest is then credited to the account once a year. Depositing early in the month, rather than on the last day, maximises the balance that qualifies for that month's interest calculation.
            </p>
            <p style={pStyle}>
              Because interest compounds annually on an account that keeps receiving fresh deposits for 15 years and then simply sits compounding for a further 6 years, the maturity value is driven far more by how early deposits start than by small differences in the yearly amount. To see the pure compounding effect in isolation, without the complexity of yearly deposits layered on top, the <Link href="/calculators/compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Compound Interest Calculator</Link> is a useful companion to the dedicated SSY calculator.
            </p>

            <h2 id="maturity-tenure" style={hStyle}>Maturity and tenure: the 15-year and 21-year rule</h2>
            <p style={pStyle}>
              SSY splits into two phases: 15 years of required deposits from the date the account is opened, followed by 6 more years where the balance simply earns interest with no further deposits needed, for a total maturity of 21 years. The account matures 21 years from the date it was opened, or when the girl marries after turning 18, whichever happens earlier.
            </p>
            <BulletList items={[
              <span key={1}><strong>Years 1 to 15:</strong> deposits of between Rs 250 and Rs 1,50,000 a year are required to keep the account regular.</span>,
              <span key={2}><strong>Years 16 to 21:</strong> no further deposits are needed; the existing balance continues to earn the prevailing SSY interest rate.</span>,
              <span key={3}><strong>At maturity (year 21):</strong> the full balance, including all accumulated interest, becomes payable and is entirely tax-free.</span>,
            ]} />
            <Callout>
              Unlike PPF, an SSY account does not earn further interest once it has matured and the balance is not withdrawn. It is worth closing the account and withdrawing the amount promptly at maturity rather than leaving it sitting untouched.
            </Callout>

            <h2 id="tax-benefits" style={hStyle}>Tax benefits: Section 80C and the EEE structure</h2>
            <p style={pStyle}>
              SSY follows the EEE (Exempt-Exempt-Exempt) tax structure: your annual deposit qualifies for an 80C deduction, the interest credited each year is tax-free, and the entire maturity amount, including all accumulated interest, is exempt from tax on withdrawal. This is the same tax treatment PPF gets, and it is one reason both schemes are frequently recommended together for long-term, risk-free savings.
            </p>
            <p style={pStyle}>
              The Section 80C deduction for SSY deposits sits within the same overall Rs 1.5 lakh annual limit shared with other instruments like PPF, ELSS mutual funds, life insurance premiums, and principal repayment on a home loan. If you are also claiming other 80C instruments in the same year, check your combined usage with the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link> before assuming the full SSY deposit will be deductible.
            </p>

            <h2 id="balance-check" style={hStyle}>Checking your SSY balance and passbook</h2>
            <p style={pStyle}>
              SSY does not have a single unified national online login the way EPFO offers for PF accounts. For an account opened at a post office, the balance is recorded in a physical passbook that gets updated at the branch counter, so checking it typically means a branch visit or asking the branch to update the book.
            </p>
            <p style={pStyle}>
              For an account opened through a bank rather than the post office, the balance is often visible through that bank's own net banking or mobile app, since the SSY account sits alongside your other accounts at that bank. If your account was opened through a bank and you cannot see it online, ask the branch directly whether SSY balance visibility is enabled for your specific account type.
            </p>

            <h2 id="comparison" style={hStyle}>SSY vs PPF vs fixed deposit: which is right for your daughter?</h2>
            <p style={pStyle}>
              SSY currently pays a higher rate than PPF, 8.2% against 7.1%, and is purpose-built for a girl child's education and marriage, maturing 21 years after the account is opened. The <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link> is open to any investor regardless of gender or age, has a shorter 15-year lock-in that can be extended indefinitely in 5-year blocks, and allows a loan against the balance after the third year, something SSY does not offer at all.
            </p>
            <p style={pStyle}>
              A fixed deposit's interest is fully taxable as per your income slab, while SSY and PPF interest and maturity proceeds are both completely tax-free. Run the numbers on the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> to compare directly: SSY pays a meaningfully higher post-tax return than most fixed deposits, but an FD can be broken any time with only a penalty, while SSY funds are locked until the girl turns 18 except for specific withdrawal purposes.
            </p>
            <DataTable
              caption="SSY vs PPF vs Fixed Deposit"
              headers={['Feature', 'SSY', 'PPF', 'Fixed Deposit']}
              rows={[
                ['Who can open it', 'Girl child below 10 only', 'Any Indian resident', 'Any Indian resident'],
                ['Current rate', '8.2% p.a.', '7.1% p.a.', 'Varies by bank and tenure'],
                ['Tax on interest', 'Tax-free', 'Tax-free', 'Fully taxable at slab rate'],
                ['Tenure', '21 years from opening', '15 years, extendable in 5-year blocks', 'Flexible, chosen upfront'],
                ['Loan facility', 'Not available', 'Available after 3rd year', 'Overdraft against FD, bank-dependent'],
                ['Premature exit', 'Restricted, specific grounds only', 'Partial withdrawal after year 5', 'Allowed, with penalty'],
              ]}
            />

            <h2 id="withdrawal-rules" style={hStyle}>Withdrawal and premature closure rules</h2>
            <p style={pStyle}>
              Once the account holder turns 18, up to 50% of the balance, as it stood at the end of the preceding financial year, can be withdrawn for higher education or marriage expenses, on submission of proof such as an admission offer or marriage notice. Outside of that partial withdrawal, SSY funds stay locked until maturity except under specific premature closure grounds.
            </p>
            <BulletList items={[
              <span key={1}><strong>Marriage:</strong> the account can be closed if the girl marries after turning 18, with the closure request made between one month before and three months after the marriage date.</span>,
              <span key={2}><strong>Death of the account holder:</strong> the account closes immediately, and the full balance with accrued interest is paid to the guardian on submission of a death certificate and closure documents.</span>,
              <span key={3}><strong>Compassionate grounds:</strong> such as a life-threatening medical condition, with the approval of the relevant authority.</span>,
              <span key={4}><strong>No loan facility:</strong> unlike PPF, there is no way to borrow against the SSY balance; the partial withdrawal and premature closure grounds above are the only ways to access funds early.</span>,
            ]} />

            <h2 id="mistakes" style={hStyle}>Common mistakes to avoid with SSY</h2>
            <p style={pStyle}>
              The most common SSY mistake is letting the account go irregular by missing the Rs 250 minimum deposit in a year, which then needs a penalty payment to fix. A second common mistake is assuming the account keeps earning interest indefinitely after maturity; it does not, so leaving the balance unclaimed after year 21 earns nothing further.
            </p>
            <BulletList items={[
              <span key={1}><strong>Missing the minimum deposit:</strong> even one missed year triggers the irregular-account penalty; a standing instruction or calendar reminder avoids this.</span>,
              <span key={2}><strong>Assuming a loan facility exists:</strong> SSY has none, unlike PPF; plan other liquidity sources for emergencies rather than counting on this account.</span>,
              <span key={3}><strong>Opening a third account without twins or triplets:</strong> only two accounts per family are allowed otherwise, and an unauthorised third account can be closed by the scheme's rules.</span>,
              <span key={4}><strong>Not withdrawing at maturity:</strong> the account earns no further interest once it matures, so a prompt withdrawal and closure avoids money sitting idle.</span>,
            ]} />

            <h2 id="how-to-use-calculator" style={hStyle}>How to use the SSY calculator to plan your deposits</h2>
            <p style={pStyle}>
              The <Link href="/calculators/ssy-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SSY Calculator</Link> projects your account's maturity value from three simple inputs, letting you test different yearly deposit amounts before committing to one.
            </p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Yearly investment:</strong> enter the amount you plan to deposit each year, between Rs 250 and Rs 1,50,000.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Girl's current age:</strong> set her current age to anchor the projection to her real maturity year.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Interest rate:</strong> the current 8.2% rate is pre-filled; adjust it only to model a different rate scenario.
              </li>
              <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                <strong style={{ color: C.ink }}>Read the result:</strong> the calculator shows the maturity value, total interest earned, and a year-by-year balance table for the full 21-year term.
              </li>
            </ol>
            <p style={pStyle}>
              If the SSY corpus alone looks short of your daughter's likely education costs, the <Link href="/calculators/child-education-planner-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Child Education Planner Calculator</Link> helps you work out how much more you would need to save elsewhere to close that gap.
            </p>


            <h2 id="faq" style={hStyle}>Frequently asked questions</h2>
            <div className="faq-accordion">
              {faqItems.map((item, i) => (
                <details key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 10, overflow: 'hidden' }} open={i === 0}>
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
            className="ssy-article-sidebar"
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
        .ssy-article-sidebar::-webkit-scrollbar { width: 5px; }
        .ssy-article-sidebar::-webkit-scrollbar-track { background: transparent; }
        .ssy-article-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .ssy-article-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

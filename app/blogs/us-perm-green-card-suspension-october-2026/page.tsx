import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';

const SLUG = 'us-perm-green-card-suspension-october-2026';
const PAGE_URL = `https://fermor.in/blogs/${SLUG}`;
const TITLE = 'US Suspends PERM Green Card Program for TCS, Infosys, Wipro, and Major IT Firms';
const PUBLISHED = '2026-10-09T15:40:00+05:30';
const MODIFIED = '2026-10-09T15:40:00+05:30';

export const metadata: Metadata = {
  title: 'US Suspends PERM Green Card Program for TCS, Infosys, Wipro (Oct 2026)',
  description:
    'The US Department of Labor froze PERM green card filings for TCS, Infosys, Wipro, HCL, Cognizant, Capgemini, Microsoft and Adobe on October 8, 2026. Market impact, TCS response, and visa strategy for affected H-1B workers.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'US Suspends PERM Green Card Program for TCS, Infosys, Wipro',
    description: 'Eight tech firms frozen from PERM filings on October 8, 2026. What it means for H-1B holders, pending green cards, and Nifty IT stocks.',
    type: 'article',
    publishedTime: PUBLISHED,
    authors: ['Fermor Analysis'],
    tags: ['PERM', 'H-1B', 'Green Card', 'TCS', 'Infosys', 'Wipro', 'Cognizant'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'US Suspends PERM Green Card Program for Indian IT Firms',
    description: 'TCS, Infosys, Wipro, HCL and Cognizant frozen from PERM filings. Market impact and H-1B worker strategy.',
  },
  keywords: [
    'us suspends perm green card program', 'tcs infosys wipro green card suspension',
    'us green card ban indian it companies', 'cognizant perm suspension news',
    'h1b visa perm freeze 2026', 'labor department tech visa fraud investigation',
    'what happens to pending perm applications', 'nifty it index fall october 2026',
    'it stocks market cap wiped out', 'h1b to green card process', 'perm green card',
    'eb2 niw', 'eb1a extraordinary ability', 'h1b visa transfer', 'ac21 h1b',
    'tcs green card', 'h1b perm suspension', 'us green card ban indian it',
  ],
};

const faqItems = [
  { q: 'What is PERM and why was it suspended?', a: 'PERM, the Permanent Labor Certification, is the first legal step required for US employers to sponsor foreign workers for employment-based green cards. On October 8, 2026, the US Department of Labor suspended PERM filings for eight major tech firms including TCS, Infosys, Wipro, HCL, and Cognizant, following a fraud investigation led by Labor Department Inspector General Anthony D\'Esposito.' },
  { q: 'Does this suspension cancel existing H-1B visas?', a: 'No. The PERM freeze does not cancel existing H-1B work visas or revoke already-approved green cards. Workers with existing labor certifications remain protected. The freeze only halts new PERM applications and pending filings from the suspended companies.' },
  { q: 'What happens to pending PERM applications?', a: 'New PERM applications from the suspended companies will not be accepted by the Department of Labor, and pending filings will not be processed. Workers relying on pending PERM applications should evaluate alternative pathways like EB-2 NIW, EB-1A, or H-1B transfers to unrestricted employers.' },
  { q: 'Can I transfer my H-1B visa to another company?', a: 'Yes. Under AC21 H-1B portability rules, if your employer\'s PERM is frozen, you can transfer to an unrestricted employer. If your I-140 has been approved for 180 or more days, your priority date remains valid for extensions with the new employer.' },
  { q: 'Which companies are affected by the PERM freeze?', a: 'Eight companies are suspended: Cognizant, suspended September 9, 2026, and TCS, Infosys, Wipro, HCL, Capgemini, Microsoft, and Adobe, all suspended October 8, 2026.' },
  { q: 'How did the market react to the PERM suspension?', a: 'The Nifty IT index fell approximately 3%, wiping out roughly Rs 55,000 crore in market capitalization in a single trading session. Infosys and Coforge led declines with around 6% drops each; TCS, Wipro, Mphasis and LTIMindtree fell up to 2.5%.' },
  { q: 'What is the EB-2 National Interest Waiver?', a: 'The EB-2 NIW is an alternative green card pathway for professionals with advanced degrees or exceptional ability who can prove their work has substantial merit and national importance to the US. This track bypasses employer sponsorship and PERM requirements entirely.' },
  { q: 'What did TCS say about the PERM suspension?', a: 'On October 9, 2026, TCS clarified that its PERM applications were in single digits over the last two years, limiting its direct exposure. The company said the suspension will not impact workforce strategy or client engagements, and reaffirmed plans to hire 15,000 local US professionals over the next five years.' },
  { q: 'What is AC21 and how does it protect my priority date?', a: 'AC21, the American Competitiveness in the Twenty-first Century Act, lets H-1B workers extend their status indefinitely once their I-140 immigrant petition has been approved for 180 or more days. Your priority date cannot be revoked due to an employer suspension once this threshold is met.' },
  { q: 'How long will the PERM suspension last?', a: 'The Department of Labor has not announced an end date. The suspension stays in effect pending the outcome of the ongoing fraud investigation led by Inspector General Anthony D\'Esposito and the White House Fraud Task Force.' },
  { q: 'Can I apply for EB-2 NIW while employed at a suspended company?', a: 'Yes. The EB-2 NIW is a self-petition that bypasses employer sponsorship entirely. You do not need your employer\'s participation or approval, and many affected employees are filing EB-2 NIW petitions independently while remaining employed.' },
  { q: 'What happens to H-4 dependent spouse work permits if my PERM is frozen?', a: 'An H-4 EAD remains valid if tied to an already-approved I-140 or a PERM pending past 365 days. If your primary H-1B extension stalls because of the freeze before reaching those thresholds, your spouse\'s work authorization can lapse when it is due for renewal.' },
  { q: 'Can an employee personally pay to expedite or appeal a frozen PERM application?', a: 'No. The PERM process is entirely employer-driven. Under federal law, 20 CFR 656.12, employers must pay all costs associated with labor certification. Employees cannot pay, expedite via premium processing, or personally appeal a Department of Labor suspension.' },
  { q: 'What happens if an employee receives an audit notification during this freeze?', a: 'If an application filed before the freeze is hit with an audit, the employer\'s legal counsel must still respond within the strict 30-day regulatory window. Failing to reply results in an automatic denial, which can lead to a formal finding of misrepresentation and bar the company from future filings.' },
  { q: 'Does this freeze affect standard H-1B visa extensions or amendments?', a: 'No. The suspension is strictly limited to the Department of Labor PERM framework. Routine H-1B amendments for changes in work location, and standard three-year renewals, continue to be processed by USCIS, provided the employee has not hit the maximum six-year limit.' },
  { q: 'What is the three-phase PERM process that gets frozen?', a: 'PERM runs through three phases: the Prevailing Wage Determination, which sets the minimum wage for the role; a mandatory 30-day domestic recruitment and job-search vetting period; and the ETA Form 9089 electronic filing. The suspension blocks the electronic filing system for the affected companies\' tax IDs, stopping both new submissions and active queues.' },
  { q: 'What is a "recruitment super-audit" under this investigation?', a: 'The White House Fraud Task Force can force a company to submit every resume it received during its mandatory 30-day local recruitment phase for a role. If a firm is found to have systematically rejected qualified US applicants on minor technicalities, it can face prosecution under 8 U.S.C. Section 1324b, the federal statute covering unfair immigration-related employment practices.' },
  { q: 'Is my priority date different from my PERM filing date?', a: 'Yes. Your priority date is normally the date your PERM application was filed (or, for EB-1 categories, the date your I-140 was filed). It determines your position in the green card queue by country of birth and category. The priority date is preserved once your I-140 is approved for 180 or more days, even if your employer is later suspended.' },
  { q: 'Can a suspended company withdraw my I-140 petition under pressure from this investigation?', a: 'An employer can technically withdraw an I-140, but if it has been approved for 180 or more days, your priority date remains valid under AC21 regardless of the withdrawal, and you can use that approval notice to port to a new employer. If the I-140 has been approved for fewer than 180 days, it carries more risk, since the priority date protection has not yet vested.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for Indian taxpayers, offering free calculators for income tax, loans, investments and insurance, and tools to help you understand and act on your financial decisions with clarity.' },
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: TITLE,
  description:
    'On October 8, 2026, the US Department of Labor suspended PERM green card filings for eight major technology companies: Cognizant, TCS, Infosys, Wipro, HCL, Capgemini, Microsoft and Adobe, wiping Rs 55,000 crore off the Nifty IT index in a single session.',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  articleSection: 'Markets & Current Affairs',
  isAccessibleForFree: true,
  inLanguage: 'en-IN',
  about: [
    { '@type': 'Thing', name: 'PERM Green Card Suspension', description: 'US Department of Labor freeze on Permanent Labor Certification filings for eight technology companies' },
    { '@type': 'Thing', name: 'H-1B Visa', description: 'US non-immigrant work visa for specialty occupations, commonly used by Indian IT professionals' },
    { '@type': 'Thing', name: 'Nifty IT Index', description: 'Index of Indian IT services companies listed on the NSE' },
  ],
  keywords: 'us suspends perm green card program, tcs infosys wipro green card suspension, h1b perm freeze 2026, cognizant perm suspension, nifty it index fall',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'US PERM Green Card Suspension', item: PAGE_URL },
  ],
};

const TOC_ITEMS = [
  { id: 'timeline', label: 'Timeline and investigation' },
  { id: 'companies', label: 'Which companies are suspended' },
  { id: 'what-is-suspended', label: 'What exactly is suspended' },
  { id: 'perm-mechanics', label: 'How a PERM audit and freeze works' },
  { id: 'market-impact', label: 'Market impact' },
  { id: 'tcs-response', label: 'TCS corporate response' },
  { id: 'worker-scenarios', label: 'What this means for H-1B workers' },
  { id: 'compliance-matrix', label: 'Compliance matrix by scenario' },
  { id: 'alternative-pathways', label: 'Alternative green card pathways' },
  { id: 'action-checklist', label: 'Action checklist' },
  { id: 'long-term', label: 'Long-term sector impact' },
  { id: 'faq', label: 'FAQs' },
];

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': PAGE_URL,
  name: TITLE,
  url: PAGE_URL,
  inLanguage: 'en-IN',
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
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
      name: 'PERM (Permanent Labor Certification)',
      description: 'The first legal step required for a US employer to sponsor a foreign worker for an employment-based green card, administered by the Department of Labor.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'US Immigration Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'AC21 Portability',
      description: 'Provisions of the American Competitiveness in the Twenty-first Century Act that let H-1B workers extend status and transfer employers while retaining their green card priority date.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'US Immigration Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: { '@type': 'Audience', audienceType: 'H-1B workers, Indian IT professionals, investors in Indian IT stocks', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    ...TOC_ITEMS.map(t => ({ '@type': 'WebPageElement', cssSelector: `#${t.id}`, name: t.label })),
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
  knowsAbout: [
    'US Immigration Policy', 'H-1B Visa', 'PERM Green Card Process', 'Indian IT Sector',
    'Nifty IT Index', 'Personal Finance India', 'Income Tax India', 'NRI Taxation',
  ],
};

const C = {
  dark: '#111111',
  dg: '#101214',
  ink: '#333333',
  ink2: '#555555',
  ink3: '#888888',
  border: '#E5E5E5',
  bg: '#F7F7F7',
  paleDg: '#f1f3f4',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

const hStyle = { fontFamily: POPPINS, fontSize: 20, fontWeight: 600, color: C.dg, marginTop: 40, marginBottom: 14, letterSpacing: '-.015em', scrollMarginTop: 80 } as React.CSSProperties;
const h3Style = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, marginTop: 24, marginBottom: 10 } as React.CSSProperties;
const pStyle = { fontSize: 15.5, color: C.ink, lineHeight: 1.8, marginBottom: 20, fontFamily: INTER } as React.CSSProperties;
const linkStyle = { color: C.dg, fontWeight: 600 } as React.CSSProperties;

const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, verticalAlign: 'middle' } as React.CSSProperties;
const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'left', lineHeight: 1.55 } as React.CSSProperties;
const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top', textAlign: 'right', lineHeight: 1.55 } as React.CSSProperties;

type Col = { label: string; num?: boolean };

function DataTable({ caption, cols, rows, minWidth = 520 }: { caption: string; cols: Col[]; rows: React.ReactNode[][]; minWidth?: number }) {
  return (
    <div style={{ overflowX: 'auto', margin: '20px 0', fontFamily: INTER, WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <table style={{ width: '100%', minWidth, borderCollapse: 'collapse', fontSize: 13, captionSide: 'bottom' }}>
        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 2px 0' }}>{caption}</caption>
        <thead>
          <tr>
            {cols.map(c => (
              <th key={c.label} scope="col" style={c.num ? { ...thS, textAlign: 'right' } : thS}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((cell, j) => (
                <td key={j} style={cols[j].num ? tdR : j === 0 ? { ...tdL, color: C.ink, fontWeight: 600 } : tdL}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function L({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</Link>;
}

function ExtL({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle}>{children}</a>;
}

function Breadcrumb() {
  const crumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'US PERM Green Card Suspension' },
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
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M4 2l4 4-4 4" stroke={C.ink3} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function TableOfContents() {
  return (
    <nav aria-label="Table of contents" style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', margin: '4px 0 28px', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>On this page</span>
      </div>
      <div style={{ padding: '10px 8px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2 }}>
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

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: C.ink3 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function KeyFacts() {
  const rows = [
    { label: 'Cognizant suspended', value: 'Sep 9, 2026' },
    { label: '7 more firms suspended', value: 'Oct 8, 2026' },
    { label: 'Nifty IT index fall', value: '~3%' },
    { label: 'Market cap wiped', value: 'Rs 55,000 cr' },
    { label: 'Infosys / Coforge fall', value: '~6%' },
    { label: 'TCS PERM filings (2yr)', value: 'Single digits' },
    { label: 'TCS US hiring plan', value: '15,000 / 5 yrs' },
  ];
  return (
    <SidebarCard title="Key Facts at a Glance">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink3, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{r.value}</span>
        </div>
      ))}
    </SidebarCard>
  );
}

function SuspendedCompanies() {
  const rows = [
    { label: 'Cognizant', value: 'Sep 9' },
    { label: 'TCS', value: 'Oct 8' },
    { label: 'Infosys', value: 'Oct 8' },
    { label: 'Wipro', value: 'Oct 8' },
    { label: 'HCL Technologies', value: 'Oct 8' },
    { label: 'Capgemini', value: 'Oct 8' },
    { label: 'Microsoft', value: 'Oct 8' },
    { label: 'Adobe', value: 'Oct 8' },
  ];
  return (
    <SidebarCard title="Suspended Companies (2026)">
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: '#fff', gap: 12 }}>
          <span style={{ fontSize: 12.5, color: C.ink2, flexShrink: 0 }}>{r.label}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.dg, textAlign: 'right' }}>{r.value}</span>
        </div>
      ))}
    </SidebarCard>
  );
}

function FermorTools() {
  const tools = [
    { label: 'Income Tax Calculator', desc: 'Compute total tax liability and compare regimes', href: '/calculators/income-tax-calculator' },
    { label: 'HRA Exemption Calculator', desc: 'Relevant for NRIs and returning H-1B workers', href: '/calculators' },
    { label: 'In-Hand Salary Calculator', desc: 'Take-home pay after deductions', href: '/calculators/in-hand-salary-calculator' },
    { label: 'Old vs New Tax Regime Calculator', desc: 'See which regime leaves more in hand', href: '/calculators/old-vs-new-tax-regime-calculator' },
  ];
  return (
    <SidebarCard title="Fermor Calculators">
      {tools.map((tool, i) => (
        <Link key={tool.href} href={tool.href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '13px 16px', borderBottom: i < tools.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.dark }}>{tool.label}</div>
            <div style={{ fontSize: 12, color: C.ink3, marginTop: 2 }}>{tool.desc}</div>
          </div>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      ))}
    </SidebarCard>
  );
}

function RelatedArticles() {
  const articles = [
    { href: '/blogs/sensex-nifty-crash-september-2026', label: 'Sensex, Nifty Crash: September 2026 Explained' },
    { href: '/blogs/accenture-shares-india-it-sector-q3-fy26', label: 'Accenture Shares and the India IT Sector Q3 FY26' },
    { href: '/blogs/sensex-nifty-market-crash-it-stocks-june-2026', label: 'Sensex, Nifty IT Stocks Crash: June 2026' },
    { href: '/blogs/tata-motors-pv-stock-crash-jlr-fy27-outlook', label: 'Tata Motors PV Stock Crash: JLR FY27 Outlook' },
    { href: '/blogs/world-gdp-ranking-2026', label: 'World GDP Ranking 2026' },
  ];
  return (
    <SidebarCard title="Related Articles">
      {articles.map((a, i) => (
        <Link key={a.href} href={a.href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '13px 16px', borderBottom: i < articles.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: '#fff' }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5 }}>{a.label}</span>
        </Link>
      ))}
    </SidebarCard>
  );
}

function BulletList({ items, mb = 20 }: { items: React.ReactNode[]; mb?: number }) {
  return (
    <ul style={{ margin: `0 0 ${mb}px`, padding: 0, listStyleType: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
          <span aria-hidden="true" style={{ flexShrink: 0, width: 7, height: 7, borderRadius: '50%', background: C.dg, display: 'block', marginTop: 9 }} />
          <span style={{ fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.7 }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', padding: '14px 20px', margin: '28px 0', fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '8px 0 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dg, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
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
            <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
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
      <p style={{ fontSize: 12.5, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for general information and is not immigration or legal advice. PERM suspension status, investigation outcomes and company statements can change quickly. Verify the current position with the{' '}
        <ExtL href="https://www.dol.gov">US Department of Labor</ExtL> or an independent immigration attorney before making decisions based on it. Fermor is not an immigration advisory firm.
      </p>
    </div>
  );
}

export default function USPERMGreenCardSuspensionPage() {
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
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, fontFamily: INTER, background: C.paleDg, padding: '3px 10px', borderRadius: 4 }}>Markets & Current Affairs</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 600, color: C.dark, lineHeight: 1.15, letterSpacing: '-.025em', marginBottom: 18, maxWidth: 840 }}>
            US Suspends PERM Green Card Program for TCS, Infosys, Wipro, and Major IT Firms
          </h1>
          <p style={{ fontFamily: INTER, fontSize: 17, color: C.ink2, lineHeight: 1.7, maxWidth: 700, marginBottom: 22 }}>
            The Department of Labor froze permanent labor certification filings for eight technology companies on October 8, 2026, following a federal fraud investigation. Here is what it means for H-1B workers, pending green cards, and Indian IT stocks.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <time dateTime={MODIFIED} style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Oct 9, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>18 min read</span>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Fermor Analysis</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '48px 52px', alignItems: 'start', padding: '44px 0 0' } as React.CSSProperties} className="article-grid">

          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>

            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              On October 8, 2026, the US Department of Labor suspended eight major technology companies, including Cognizant, TCS, Infosys, Wipro, and HCL, from the Permanent Labor Certification (PERM) program, the foundational legal step for employment-based green card sponsorship.
            </p>
            <p style={pStyle}>
              The freeze triggered an immediate market sell-off, wiping out roughly Rs 55,000 crore in Nifty IT market capitalization in a single session. It does not cancel existing H-1B visas, but it blocks new and pending PERM filings from the suspended firms. This guide covers the full timeline, market impact, TCS's corporate response, and the practical options available to affected H-1B workers.
            </p>

            <TableOfContents />

            <h2 id="timeline" style={hStyle}>Timeline and Federal Investigation</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Cognizant was suspended first, on September 9, 2026, over an H-1B and PERM fraud investigation. The freeze expanded to seven more firms on October 8, 2026, announced by Vice President JD Vance and Labor Secretary Keith Sonderling.
              </p>
            </div>
            <p style={pStyle}>
              The regulatory action began weeks before the broader announcement. Cognizant faced an isolated suspension on September 9, 2026, stemming from an active H-1B and PERM fraud investigation. The probe was led by Labor Department Inspector General Anthony D&apos;Esposito, working with the White House Fraud Task Force.
            </p>
            <p style={pStyle}>
              Following preliminary findings from that probe, the Department of Labor escalated the restriction on October 8, 2026. It now covers seven additional multinational technology and IT services providers.
            </p>
            <p style={pStyle}>
              The Department of Labor released cumulative tracking data for the suspended corporations. Since 2009, these firms collectively requested approximately three million foreign workers, securing over 230,000 H-1B approvals and exceeding 100,000 PERM certifications.
            </p>
            <p style={pStyle}>
              Labor Secretary Sonderling characterized this volume as hundreds of thousands of jobs diverted from the domestic American workforce.
            </p>

            <h2 id="companies" style={hStyle}>Which Companies Are Suspended</h2>
            <p style={pStyle}>Eight companies are currently suspended from PERM filings.</p>
            <DataTable
              caption="Companies suspended from PERM filings, with suspension date."
              minWidth={560}
              cols={[{ label: 'Company' }, { label: 'Suspension Date' }]}
              rows={[
                ['Cognizant', 'September 9, 2026'],
                ['TCS (Tata Consultancy Services)', 'October 8, 2026'],
                ['Infosys', 'October 8, 2026'],
                ['Wipro', 'October 8, 2026'],
                ['HCL Technologies', 'October 8, 2026'],
                ['Capgemini', 'October 8, 2026'],
                ['Microsoft', 'October 8, 2026'],
                ['Adobe', 'October 8, 2026'],
              ]}
            />

            <h2 id="what-is-suspended" style={hStyle}>What Exactly Is Suspended</h2>
            <p style={pStyle}>
              The freeze targets the Permanent Labor Certification (PERM) process, the foundational legal prerequisite for employers sponsoring foreign nationals for employment-based green cards. Under the directive, the Department of Labor will neither accept new PERM applications nor advance pending filings submitted by the listed companies.
            </p>
            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>What this does not do.</strong> The suspension does not invalidate existing H-1B visas, nor does it revoke previously approved green cards or completed permanent residency tracks. Employees who already hold an approved labor certification are not subject to immediate status changes. The freeze only halts new or transitional green card pipelines.
            </Callout>

            <h2 id="perm-mechanics" style={hStyle}>How a PERM Audit and Freeze Actually Works</h2>
            <p style={pStyle}>
              The suspension is not a single switch. It halts a three-phase Department of Labor vetting process that every PERM application must normally pass through before a green card sponsorship can begin.
            </p>
            <DataTable
              caption="The three phases of the PERM process, and what the freeze blocks at each stage."
              minWidth={700}
              cols={[{ label: 'Phase' }, { label: 'What It Normally Does' }, { label: 'Status Under the Freeze' }]}
              rows={[
                ['Phase 1: Prevailing Wage Determination', 'Sets the minimum wage the employer must offer for the role, based on occupation and geography', 'New wage determinations for frozen employers are not being calculated'],
                ['Phase 2: 30-day domestic recruitment', 'Employer must advertise the role domestically and document the search before filing', 'Recruitment records remain subject to audit even while new filings are frozen'],
                ['Phase 3: ETA Form 9089 electronic filing', 'The actual PERM application filed with the Department of Labor', 'Filing system blocks the Employer Identification Numbers of the suspended companies, halting both new submissions and movement on existing queues'],
              ]}
            />
            <Callout>
              <strong style={{ fontWeight: 700, color: C.dg }}>Recruitment super-audits.</strong> The White House Fraud Task Force can require a company to submit every resume it received during its mandatory 30-day recruitment window for a role. If a firm is found to have systematically rejected qualified US applicants on minor technicalities, it can face prosecution under 8 U.S.C. Section 1324b, the federal statute covering unfair immigration-related employment practices. This is the legal mechanism behind the fraud allegations, not just a paperwork delay.
            </Callout>

            <h2 id="market-impact" style={hStyle}>Market Impact: Rs 55,000 Crore Wiped Out</h2>
            <p style={pStyle}>
              The announcement triggered an immediate sell-off across Indian IT equities. The Nifty IT index dropped approximately 3% in a single trading session, wiping out roughly Rs 55,000 crore in aggregate market capitalization.
            </p>
            <DataTable
              caption="Single-session stock and index impact, October 8-9, 2026."
              minWidth={700}
              cols={[{ label: 'Company / Index' }, { label: 'Single-Session Fall' }, { label: 'Strategic Response' }]}
              rows={[
                ['Nifty IT Index', '~3%', 'Broad industry compliance recalibration'],
                ['Infosys & Coforge', '~6% each', 'Accelerated onsite talent diversification'],
                ['TCS', '~2.5%', 'Hiring 15,000 local US staff over 5 years'],
                ['Wipro, Mphasis, LTIMindtree', 'Up to 2.5%', 'Portfolio rebalancing and local hiring'],
              ]}
            />

            <PromoBar name="Income Tax Calculator" desc="Returning from a US assignment or planning a transfer? Work out your Indian tax liability before you decide." href="/calculators/income-tax-calculator" />

            <h2 id="tcs-response" style={hStyle}>Corporate Response: TCS Clarifies Minimal Exposure</h2>
            <p style={pStyle}>
              Tata Consultancy Services issued a formal clarification on October 9, 2026, stating its PERM application volume remained in single digits over the preceding two years, limiting its direct exposure. TCS said the suspension will not disrupt workforce strategy, project execution, or client engagements, and reaffirmed a commitment to hire 15,000 local professionals in the United States over the next five years.
            </p>
            <p style={pStyle}>
              As of October 9, 2026, formal statements from the other impacted firms, industry bodies like NASSCOM, or the Indian Ministry of External Affairs remain pending.
            </p>

            <h2 id="worker-scenarios" style={hStyle}>What This Means for H-1B Workers</h2>
            <p style={pStyle}>
              The practical impact on an individual H-1B worker depends heavily on where they stand in the green card process.
            </p>

            <h3 style={h3Style}>If you have an approved I-140</h3>
            <p style={pStyle}>
              Your priority date is protected under AC21 once your I-140 has been approved for 180 or more days. The PERM freeze cannot revoke it. You can extend your H-1B status indefinitely or transfer to another employer while keeping your place in the green card queue.
            </p>

            <h3 style={h3Style}>If your PERM application is still pending</h3>
            <p style={pStyle}>
              Your filing will not advance while the freeze is in effect. Three options exist: wait for the freeze to lift, transfer to an unrestricted employer and file a fresh PERM there, or apply for an EB-2 NIW or EB-1A green card pathway that bypasses PERM entirely.
            </p>

            <h3 style={h3Style}>If you are in years one to three of your H-1B</h3>
            <p style={pStyle}>
              You have more runway. The standard H-1B is valid for six years. If the freeze resolves before your fourth year, the delay may not matter much. If it extends longer, start evaluating external transfers before you approach the six-year limit without a green card path in place.
            </p>

            <h2 id="compliance-matrix" style={hStyle}>Compliance Matrix: Your Risk by Scenario</h2>
            <p style={pStyle}>
              The freeze does not treat every worker the same way. Where you fall in this matrix determines how urgently you need to act.
            </p>
            <DataTable
              caption="Risk level and required action by employee scenario."
              minWidth={760}
              cols={[{ label: 'Scenario' }, { label: 'Current Status' }, { label: 'Risk' }, { label: 'Suggested Action' }]}
              rows={[
                ['H-1B holder, years 1-3', 'Valid non-immigrant status', 'Low near-term, high long-term', 'Monitor the freeze; prepare a transfer plan before year 4'],
                ['Pending PERM, no I-140 filed', 'Administrative limbo, processing frozen', 'Critical', 'Transfer to an unrestricted employer, or pursue EB-2 NIW / EB-1A'],
                ['Approved I-140, under 180 days', 'Priority date established but not yet locked', 'Moderate', 'Maintain status; prepare an external transfer as a backup'],
                ['Approved I-140, 180+ days', 'Priority date permanently locked under AC21', 'Low', 'Extend H-1B indefinitely, or port to a new employer freely'],
                ['H-4 dependent spouse EAD', 'Valid only if tied to an approved I-140 or a PERM pending 365+ days', 'High if primary PERM is frozen', 'Track the primary worker’s status closely; renewal can lapse if thresholds are not met'],
              ]}
            />

            <h2 id="alternative-pathways" style={hStyle}>Alternative Visa and Green Card Pathways</h2>

            <h3 style={h3Style}>EB-2 National Interest Waiver</h3>
            <p style={pStyle}>
              Professionals with an advanced degree or exceptional ability can self-petition for an EB-2 green card under the National Interest Waiver, bypassing employer sponsorship and PERM entirely. The applicant must show the work has substantial merit and national importance to the US. Many tech professionals, researchers, and engineers qualify.
            </p>

            <h3 style={h3Style}>EB-1A Extraordinary Ability</h3>
            <p style={pStyle}>
              Tech leads and researchers who can document sustained national or international acclaim, original contributions, or high compensation can pursue an EB-1A green card without employer sponsorship or PERM. This category is typically reserved for industry leaders and published researchers.
            </p>

            <h3 style={h3Style}>L-1A intra-company transfer</h3>
            <p style={pStyle}>
              Managers or executives at firms with global operations can transfer to an international office for at least one continuous year, then return to the US on an L-1A visa. This can later convert to an EB-1C green card, which does not require PERM.
            </p>

            <h3 style={h3Style}>H-1B transfer under AC21 portability</h3>
            <p style={pStyle}>
              Even with a frozen PERM at your current employer, you can transfer your H-1B to a new, unrestricted employer under AC21. If you already have an approved I-140 or a PERM pending past 180 days, your priority date carries over, and the new employer can file a fresh PERM while you keep your place in the queue.
            </p>


            <h2 id="action-checklist" style={hStyle}>Action Checklist for Affected H-1B Workers</h2>
            <DataTable
              caption="Five-step action checklist for workers at suspended companies."
              minWidth={700}
              cols={[{ label: 'Step' }, { label: 'Action' }]}
              rows={[
                [<span style={{ whiteSpace: 'nowrap' }}>Step 1</span>, 'Request certified copies of your approved I-140, pending PERM filing, and H-1B approval notice from your employer’s immigration counsel.'],
                [<span style={{ whiteSpace: 'nowrap' }}>Step 2</span>, 'Calculate your H-1B timeline: how much of your six-year limit remains, and check for recapturable time spent outside the US.'],
                [<span style={{ whiteSpace: 'nowrap' }}>Step 3</span>, 'Clarify your status with HR: confirm whether your PERM is frozen or whether you already hold a protected, approved I-140.'],
                [<span style={{ whiteSpace: 'nowrap' }}>Step 4</span>, 'Consult independent immigration counsel to assess eligibility for EB-2 NIW, EB-1A, or an H-1B transfer.'],
                [<span style={{ whiteSpace: 'nowrap' }}>Step 5</span>, 'Explore transfer opportunities at unrestricted employers if the freeze looks indefinite, while your priority date stays intact.'],
              ]}
            />

            <h2 id="long-term" style={hStyle}>Long-Term Implications for the Tech Sector</h2>
            <p style={pStyle}>This enforcement action reshapes the financial and operational landscape for global IT service providers.</p>
            <BulletList
              items={[
                <span key="l1"><strong style={{ color: C.ink }}>Shift toward local onshoring:</strong> companies will accelerate hiring local US talent, following TCS&apos;s 15,000-hire commitment.</span>,
                <span key="l2"><strong style={{ color: C.ink }}>Margin compression:</strong> domestic US wages run significantly higher than visa-sponsored personnel costs, pressuring operating margins.</span>,
                <span key="l3"><strong style={{ color: C.ink }}>Nearshore diversification:</strong> firms will invest in nearshore hubs in Canada and Latin America to maintain delivery without visa dependencies.</span>,
                <span key="l4"><strong style={{ color: C.ink }}>Compliance overhead:</strong> tighter audit infrastructure becomes a cost of doing business across the sector.</span>,
              ]}
            />
            <p style={pStyle}>
              Workers weighing a return to India, whether permanent or as a contingency, can compare take-home pay and tax outcomes using the{' '}
              <L href="/calculators/old-vs-new-tax-regime-calculator">old vs new tax regime calculator</L>{' '}
              before making a decision.
            </p>


            <h2 id="faq" style={hStyle}>Frequently Asked Questions</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          <aside
            className="perm-sidebar"
            style={{ position: 'sticky', top: 80, alignSelf: 'start', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: 2, display: 'flex', flexDirection: 'column', gap: 20, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0 }}><KeyFacts /></div>
            <div style={{ flexShrink: 0 }}><SuspendedCompanies /></div>
            <nav aria-label="Related Calculators" style={{ flexShrink: 0 }}>
              <FermorTools />
            </nav>
            <div style={{ flexShrink: 0 }}><RelatedArticles /></div>
            <div style={{ padding: '16px 0', borderTop: `1px solid ${C.border}`, fontFamily: INTER, flexShrink: 0 }}>
              <Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13.5, fontWeight: 500, color: C.dg, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                More from Blogs
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </Link>
            </div>
          </aside>

        </div>
      </div>

      <div style={{ height: 48 }} />

      <SiteFooter />

      <style>{`
        .perm-sidebar::-webkit-scrollbar { width: 5px; }
        .perm-sidebar::-webkit-scrollbar-track { background: transparent; }
        .perm-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .perm-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @media (max-width: 900px) {
          .article-grid { grid-template-columns: 1fr !important; }
        }
        .toc-link:hover { background: #f4f5f6; color: #101214 !important; }
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

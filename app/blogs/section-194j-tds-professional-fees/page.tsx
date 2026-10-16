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

const INCOME_TAX_DEPT = 'https://www.incometax.gov.in';

export const metadata: Metadata = {
  title: 'Section 194J TDS: Professional Fees & 194JA/194JB (2026)',
  description: 'Section 194J guide: 10% and 2% TDS rates, Rs 50,000 per-category threshold, the 194JA vs 194JB filing codes explained, and its Section 393(1) renumbering.',
  alternates: { canonical: 'https://fermor.in/blogs/section-194j-tds-professional-fees' },
  openGraph: {
    title: 'Section 194J TDS: Professional Fees Rates & 194JA/194JB (2026) - Fermor',
    description: 'TDS on professional and technical fees under Section 194J: rates, the Rs 50,000 per-category threshold, and what 194JA/194JB actually mean.',
    type: 'article',
    url: 'https://fermor.in/blogs/section-194j-tds-professional-fees',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 194J TDS: Professional Fees Rates & 194JA/194JB (2026) - Fermor',
    description: 'TDS rates, threshold, and the 194JA vs 194JB filing code distinction under Section 194J.',
  },
};

const faqItems = [
  { q: 'What is Section 194J of the Income Tax Act?', a: 'Section 194J requires TDS deduction on payments to residents for professional fees, technical fees, royalty, non-compete fees, and director remuneration, at 10% for most categories and 2% for technical services, call centre payments, and cinematographic film royalty.' },
  { q: 'What is the current threshold limit under Section 194J?', a: 'TDS applies once payment in any single category, professional fees, technical fees, royalty, or non-compete fees, exceeds Rs 50,000 in a financial year. Budget 2025 raised this from Rs 30,000, effective April 1, 2025, but kept the test on an annual, per-category basis rather than switching to a monthly test.' },
  { q: 'Is the Rs 50,000 limit combined across all payment types, or separate for each?', a: 'Separate for each category. If a company pays Rs 45,000 as royalty and Rs 20,000 as technical service fees to the same person in a year, no TDS applies to either payment, since each category is tested against the Rs 50,000 threshold independently, not combined.' },
  { q: 'Is there a threshold for TDS on director remuneration under Section 194J?', a: 'No. Payments to a director as fees, commission, or remuneration, other than salary, attract TDS at 10% regardless of amount, with no minimum threshold at all.' },
  { q: 'What is the difference between Section 194J(a) and 194J(b)?', a: '194J(a) and 194J(b) are not separate legal sections; they are the nature-of-payment codes used on TDS returns and Form 26Q to distinguish the two rates within Section 194J. 194J(a), sometimes written 194JA, covers technical services, call centre payments, and cinematographic film royalty at 2%. 194J(b), or 194JB, covers professional services, other royalty, non-compete fees, and director remuneration at 10%.' },
  { q: 'What is Section 194JB of the Income Tax Act?', a: 'There is no standalone Section 194JB in the Income Tax Act. It is a TDS filing remark code representing the 10% professional-services category within Section 194J, used since the section was split into two reporting codes from August 7, 2020.' },
  { q: 'Which services count as professional services under Section 194J?', a: 'Medical, legal, architectural, and engineering services, along with any profession the CBDT has separately notified under Section 44AA, including film artists, company secretaries, accountancy, advertising, interior decoration, technical consultancy, authorised representatives, and information technology.' },
  { q: 'Are sportspersons and coaches covered under Section 194J?', a: 'Yes. The CBDT has separately notified sportspersons, commentators, event managers, anchors, umpires and referees, physiotherapists, coaches, trainers, team physicians, and sports columnists as covered professions for Section 194J purposes.' },
  { q: 'What counts as fees for technical services under Section 194J?', a: 'Managerial, technical, and consultancy services rendered to a client, excluding any payment the recipient treats as salary. Technical service specifically requires a human element; a Supreme Court ruling has held that services rendered entirely through automated systems or machines, without human involvement, do not qualify as fees for technical services.' },
  { q: 'What is royalty under Section 194J?', a: 'Payment for transferring or licensing rights to use an invention, patent, trademark, model, or design, for sharing technical, industrial, commercial, or scientific knowledge or experience, or for rights to scientific, literary, or artistic work, excluding consideration for the sale, exhibition, or distribution of cinematographic films, which is taxed separately at 2%.' },
  { q: 'Who is exempt from deducting TDS under Section 194J?', a: 'Individuals and HUFs carrying on business, with turnover up to Rs 1 crore in the preceding financial year, or carrying on a profession, with gross receipts up to Rs 50 lakh in the preceding year, are not required to deduct TDS under Section 194J. Payments used purely for personal purposes are also outside the section, even if the payer would otherwise be covered.' },
  { q: 'What happens if my payments cross the threshold partway through the year?', a: 'Once the cumulative payment in a category crosses Rs 50,000 in the financial year, TDS must be deducted on that payment and every subsequent payment in the same category for the rest of the year, not just on the amount above the threshold. Earlier payments already made before the threshold was crossed are not retroactively subject to TDS.' },
  { q: 'What is the TDS rate if the recipient does not provide a PAN?', a: 'If the recipient does not furnish a valid PAN, TDS is deducted at 20% under Section 206AA, regardless of whether the payment would otherwise attract the 10% or 2% rate.' },
  { q: 'What is the due date for depositing TDS under Section 194J?', a: 'TDS deducted in any month except March must be deposited by the 7th of the following month. TDS deducted in March must be deposited by April 30.' },
  { q: 'What happens if TDS under Section 194J is not deducted or deposited late?', a: '30% of the underlying expense is disallowed in the year it is claimed, though it becomes allowable again in the year the TDS is actually paid. Separately, interest applies: 1% per month for not deducting TDS when required, and 1.5% per month for deducting it but depositing it late.' },
  { q: 'Does Section 194J apply to a coach paid by a sports club?', a: 'Yes. Coaching services for sports activities are specifically notified as professional services under Section 194J, so a club paying a coach more than Rs 50,000 a year must deduct TDS at 10% on the full remuneration.' },
  { q: 'Is Section 194J relevant for freelancers and consultants filing ITR?', a: 'Yes. Freelancers and consultants receiving professional fees typically have TDS deducted under Section 194J by their clients, reflected in Form 26AS and Form 16A, which they should reconcile against their income while filing their return.' },
  { q: 'What is Section 393 of the Income Tax Act, 2025 and how does it relate to Section 194J?', a: 'Section 393(1) of the Income Tax Act, 2025 consolidates the TDS provisions currently spread across sections like 194J of the 1961 Act, including fees for professional and technical services, effective April 1, 2026. It applies from the tax season covering FY 2026-27 income, filed from 2027 onward, not the current AY 2026-27 filing season.' },
  { q: 'How do I verify TDS deducted from my professional fees?', a: 'Check Form 26AS or the Annual Information Statement on the income tax e-filing portal, or request Form 16A from the person who deducted the tax, which lists every TDS deduction made against your PAN for the quarter.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on tax provisions that affect freelancers, consultants, and professionals.' },
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
  headline: 'Section 194J TDS on Professional Fees and Technical Services',
  url: 'https://fermor.in/blogs/section-194j-tds-professional-fees',
  datePublished: '2026-07-29T23:53:18+05:30',
  dateModified: '2026-07-29T23:53:18+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete Section 194J guide covering the 10% and 2% TDS rates on professional fees, technical services, royalty, non-compete fees, and director remuneration, the Rs 50,000 per-category annual threshold raised from Rs 30,000 by Budget 2025, a clear explanation of the 194JA/194JB TDS filing remark codes (not separate legal sections), the CBDT-notified professions list, who is exempt, worked examples, and the Section 393(1) renumbering under the Income Tax Act 2025.',
  articleSection: 'Income Tax',
  keywords: '194j, tds for professional fees, section 194j, 194j income tax act, 194j limit, 194j tds, 194j tds limit, 194j tds rate, 194jb of income tax act, 194jb tds, sec 194j, section 194jb, tds for professional services, tds rate under section 194j, tds section 194j, tds under section 194j, 194ja of income tax act',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 194J TDS', item: 'https://fermor.in/blogs/section-194j-tds-professional-fees' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate TDS on Professional Fees Under Section 194J',
  description: 'Step-by-step process to determine whether TDS applies and calculate the amount on professional or technical fees.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm the payer must deduct', text: 'Individuals and HUFs below the tax audit turnover limits, or payments for purely personal use, are not covered by Section 194J.' },
    { '@type': 'HowToStep', position: 2, name: 'Identify the payment category', text: 'Professional fees, technical fees, royalty, non-compete fees, and director remuneration are each tested separately against the threshold.' },
    { '@type': 'HowToStep', position: 3, name: 'Check the Rs 50,000 threshold for that category', text: 'TDS applies once cumulative payments in that category for the year exceed Rs 50,000; director remuneration has no threshold at all.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply the correct rate', text: 'Use 2% for technical services, call centres, and film royalty, or 10% for professional services, other royalty, non-compete fees, and director remuneration.' },
    { '@type': 'HowToStep', position: 5, name: 'Confirm PAN and deposit on time', text: 'Deduct at 20% if PAN is missing, and deposit by the 7th of the following month, or April 30 for March deductions.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-194j-tds-professional-fees',
  name: 'Section 194J TDS on Professional Fees and Technical Services - Fermor',
  url: 'https://fermor.in/blogs/section-194j-tds-professional-fees',
  inLanguage: 'en-IN',
  datePublished: '2026-07-29T23:53:18+05:30',
  dateModified: '2026-07-29T23:53:18+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Section 194J',
      alternateName: 'TDS on Professional and Technical Fees',
      description: 'A provision of the Income Tax Act, 1961 requiring TDS on payments to residents for professional fees, technical fees, royalty, non-compete fees, and director remuneration, at 10% or 2% depending on category, once a Rs 50,000 per-category annual threshold is crossed.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Businesses, professionals, freelancers, and tax professionals dealing with professional or technical fee payments in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-194j', name: 'What Is Section 194J' },
    { '@type': 'WebPageElement', cssSelector: '#rates-threshold', name: 'Rates and Threshold' },
    { '@type': 'WebPageElement', cssSelector: '#194ja-194jb', name: '194JA vs 194JB Explained' },
    { '@type': 'WebPageElement', cssSelector: '#payments-covered', name: 'Payments Covered' },
    { '@type': 'WebPageElement', cssSelector: '#professional-services', name: 'Professional Services and Notified Professions' },
    { '@type': 'WebPageElement', cssSelector: '#technical-services', name: 'Technical Services' },
    { '@type': 'WebPageElement', cssSelector: '#royalty-noncompete', name: 'Royalty and Non-Compete Fees' },
    { '@type': 'WebPageElement', cssSelector: '#who-must-deduct', name: 'Who Must Deduct' },
    { '@type': 'WebPageElement', cssSelector: '#deposit-penalties', name: 'Deposit Deadlines and Penalties' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#section-393', name: 'Section 393 Renumbering' },
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
  knowsAbout: ['Section 194J', '194JA', '194JB', 'TDS on Professional Fees', 'Section 393', 'Account Aggregator Framework'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains Section 194J of the Income Tax Act, 1961 for general informational purposes and is not tax advice. TDS obligations depend on your specific payer category, payment type, and amount; verify your exact liability using the calculator linked on this page or consult a chartered accountant before deducting or filing. Figures reflect the law as of the date above and may change with future notifications.
      </p>
    </div>
  );
}

export default function Section194JPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 194J</li>
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
            <time dateTime="2026-07-29T23:53:18+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 29, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>12 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Section 194J: TDS on Professional Fees and Technical Services
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 194J requires TDS on professional fees, technical fees, royalty, non-compete fees, and director remuneration, at 10% for most categories and 2% for technical services.
            </p>
            <p style={pStyle}>
              TDS applies once payment in any single category exceeds Rs 50,000 in a financial year, a threshold Budget 2025 raised from Rs 30,000 while keeping the test on an annual, per-category basis.
            </p>
            <p style={pStyle}>
              This guide also clears up one of the most searched points of confusion: what 194JA and 194JB actually mean, since neither is a separate section of the law.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for TDS on professional fees"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Calculate TDS on professional fees and other payments', <Link key="l2" href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>TDS Calculator</Link>],
                ]}
              />
            </div>

            {/* SECTION: What is 194J */}
            <h2 id="what-is-194j" style={hStyle}>What Is Section 194J?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 194J mandates TDS on payments to residents for professional fees, technical fees, royalty, non-compete fees, and director remuneration, at rates of 10% or 2% depending on the specific category.
              </p>
            </div>
            <p style={pStyle}>
              Where the recipient does not furnish a PAN, TDS is deducted at 20% instead, under Section 206AA, regardless of which rate would otherwise apply. Payments used purely for personal purposes fall outside the section entirely.
            </p>

            {/* SECTION: Rates and threshold */}
            <h2 id="rates-threshold" style={hStyle}>TDS Rates and Threshold Under Section 194J</h2>
            <InfoTable
              caption="Section 194J TDS rates by nature of payment"
              headers={['Nature of Payment', 'TDS Rate', 'Threshold']}
              rows={[
                ['Fees for technical services', '2%', 'Rs 50,000 per year'],
                ['Payments to call centre operators', '2%', 'Rs 50,000 per year'],
                ['Royalty for sale, distribution, or exhibition of cinematographic films', '2%', 'Rs 50,000 per year'],
                ['Other royalty', '10%', 'Rs 50,000 per year'],
                ['Professional services and non-compete fees', '10%', 'Rs 50,000 per year'],
                ['Director fees, commission, or remuneration (non-salary)', '10%', 'Nil, no threshold'],
                ['Recipient does not furnish PAN', '20%', 'Same threshold as the underlying category'],
              ]}
            />
            <p style={pStyle}>
              Budget 2025 raised the general threshold from Rs 30,000 to Rs 50,000, effective April 1, 2025, but this limit applies separately to each category, not as one combined cap. A company paying Rs 45,000 in royalty and Rs 20,000 in technical fees to the same person in a year owes no TDS on either payment, since neither category individually crosses Rs 50,000.
            </p>
            <p style={pStyle}>
              Director remuneration is the one exception with no threshold at all: TDS at 10% applies from the first rupee, however small the payment.
            </p>

            {/* SECTION: 194JA vs 194JB */}
            <h2 id="194ja-194jb" style={hStyle}>194JA vs 194JB: What These Codes Actually Mean</h2>
            <p style={pStyle}>
              194JA and 194JB are not separate sections of the Income Tax Act. They are TDS return filing remark codes, used on Form 26Q and TRACES, that split Section 194J's own two rates into distinct reporting categories.
            </p>
            <InfoTable
              caption="194JA and 194JB filing codes explained"
              headers={['Code', 'Covers', 'Rate']}
              rows={[
                ['194J(a), commonly written 194JA', 'Technical services, call centre payments, cinematographic film royalty', '2%'],
                ['194J(b), commonly written 194JB', 'Professional services, other royalty, non-compete fees, director remuneration', '10%'],
              ]}
            />
            <p style={pStyle}>
              This split has been in effect since August 7, 2020, purely to make the two rates within Section 194J separately identifiable on TDS returns. There is no additional obligation, form, or deadline attached to either code beyond what Section 194J itself already requires.
            </p>

            <CalcCTA
              href="/calculators/tds-calculator"
              label="TDS Calculator"
              note="Work out the exact TDS amount on professional fees, technical services, rent, or contractor payments."
            />

            {/* SECTION: Payments covered */}
            <h2 id="payments-covered" style={hStyle}>Payments Covered Under Section 194J</h2>
            <BulletList items={[
              'Fees for professional services.',
              'Fees for technical services.',
              'Remuneration, fees, or commission paid to directors, excluding salary, such as sitting fees for board meetings.',
              'Royalty.',
              'Non-compete fees, paid for agreeing not to carry on a competing business or share technical know-how within a specified time and geography.',
            ]} />

            {/* SECTION: Professional services */}
            <h2 id="professional-services" style={hStyle}>Professional Services and CBDT-Notified Professions</h2>
            <p style={pStyle}>
              Professional services cover medical, legal, architectural, and engineering professions, along with any profession the CBDT has separately notified under Section 44AA.
            </p>
            <InfoTable
              caption="Professions notified by CBDT under Section 44AA and Section 194J"
              headers={['Category', 'Notified Professions']}
              rows={[
                ['Under Section 44AA', 'Film artists, company secretaries, accountancy, advertising, interior decoration, technical consultancy, authorised representatives, information technology'],
                ['Notified specifically for Section 194J', 'Sportspersons, commentators, event managers, anchors, umpires and referees, physiotherapists, coaches, trainers, team physicians, sports columnists'],
              ]}
            />

            {/* SECTION: Technical services */}
            <h2 id="technical-services" style={hStyle}>What Counts as Technical Services</h2>
            <p style={pStyle}>
              Fees for technical services means managerial, technical, or consultancy services, excluding any payment the recipient treats as salary.
            </p>
            <BulletList items={[
              'Technical: services involving technical expertise or expertise in technology.',
              'Managerial: running and managing the client\'s business.',
              'Consultancy: advisory services giving the client necessary advice for their business.',
            ]} />
            <p style={pStyle}>
              A Supreme Court ruling established that technical service requires a human element. Services delivered entirely through automated systems or machines, with no human involvement, do not qualify as fees for technical services under this section.
            </p>

            {/* SECTION: Royalty and non-compete */}
            <h2 id="royalty-noncompete" style={hStyle}>Royalty and Non-Compete Fees</h2>
            <p style={pStyle}>
              Royalty covers payment for transferring or licensing the use of an invention, patent, trademark, model, or design, for sharing technical, industrial, commercial, or scientific knowledge, or for rights to scientific, literary, or artistic work. It excludes consideration for the sale, exhibition, or distribution of cinematographic films, which is taxed separately at 2%.
            </p>
            <p style={pStyle}>
              Non-compete fees are payments made in cash or kind for an agreement restricting the recipient from sharing a licence, patent, trademark, know-how, or business information that could otherwise be used elsewhere for manufacturing or a competing service.
            </p>

            {/* SECTION: Who must deduct */}
            <h2 id="who-must-deduct" style={hStyle}>Who Must Deduct TDS Under Section 194J?</h2>
            <p style={pStyle}>
              Any person making a payment covered by Section 194J must deduct TDS, with two exceptions.
            </p>
            <BulletList items={[
              <span key="w1"><strong>Individuals and HUFs carrying on business:</strong> exempt if turnover did not exceed Rs 1 crore in the preceding financial year.</span>,
              <span key="w2"><strong>Individuals and HUFs carrying on a profession:</strong> exempt if gross receipts did not exceed Rs 50 lakh in the preceding financial year.</span>,
            ]} />
            <p style={pStyle}>
              Individuals and HUFs who fall outside Section 194J for this reason may still need to deduct tax under Section 194M for certain contractual or professional payments. Payments used purely for personal purposes are also outside Section 194J, even for a payer otherwise covered.
            </p>

            {/* SECTION: Deposit penalties */}
            <h2 id="deposit-penalties" style={hStyle}>Deposit Deadlines and Penalties</h2>
            <p style={pStyle}>
              TDS must be deducted at the earlier of passing the entry in the books of account or making the actual payment.
            </p>
            <InfoTable
              caption="TDS deposit deadlines and non-compliance consequences"
              headers={['Situation', 'Rule']}
              rows={[
                ['TDS deducted in any month except March', 'Deposit by the 7th of the following month'],
                ['TDS deducted in March', 'Deposit by April 30'],
                ['TDS not deducted when required', 'Interest at 1% per month from the date it should have been deducted to the actual deduction date, plus 30% of the underlying expense disallowed in that year, allowable again once TDS is paid'],
                ['TDS deducted but not deposited', 'Interest at 1.5% per month from the deduction date to the actual deposit date'],
              ]}
            />

            {/* SECTION: Worked examples */}
            <h2 id="worked-examples" style={hStyle}>Worked Examples</h2>
            <p style={pStyle}>
              Mr. Jay pays Mr. Veer for professional services in FY 2025-26: Rs 55,000 in April and Rs 22,000 in December. Whether TDS applies depends entirely on Mr. Jay's own tax audit status and the purpose of the service.
            </p>
            <InfoTable
              caption="TDS liability across three scenarios for the same payment pattern"
              headers={['Scenario', 'TDS Liability']}
              rows={[
                ['Mr. Jay is not liable for tax audit under Section 44AB', 'No TDS on either payment; he falls outside Section 194J entirely'],
                ['Mr. Jay is liable for tax audit, but the service was for personal purposes', 'No TDS; personal-purpose payments are outside Section 194J regardless of audit status'],
                ['Mr. Jay is liable for tax audit and the service was for business purposes', 'TDS at 10% on the April payment of Rs 55,000, since it alone crosses Rs 50,000, and also on the December payment of Rs 22,000, since the annual total for this category has already crossed the threshold'],
              ]}
            />
            <p style={pStyle}>
              A separate example: a badminton club pays Mr. Pravin, a resident coach, Rs 10 lakh a year. Coaching for sports activities is a CBDT-notified professional service under Section 194J, and the amount is well above Rs 50,000, so the club must deduct TDS at 10% on the full remuneration.
            </p>

            {/* SECTION: Section 393 */}
            <h2 id="section-393" style={hStyle}>Section 393 of the Income Tax Act, 2025</h2>
            <p style={pStyle}>
              Section 393(1) of the Income Tax Act, 2025 consolidates the TDS provisions currently spread across sections like 194J of the 1961 Act, including fees for professional and technical services, effective April 1, 2026.
            </p>
            <p style={pStyle}>
              This renumbering does not apply to the current ITR filing season, which covers income earned up to March 31, 2026 under the 1961 Act. It becomes relevant only for the tax season covering FY 2026-27 income, filed from 2027 onward.
            </p>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 194J</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s194j-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>194J Quick Reference</div>
              {([
                ['Rate: professional services', '10%'],
                ['Rate: technical services', '2%'],
                ['Threshold', 'Rs 50,000/year per category'],
                ['Director remuneration', 'No threshold'],
                ['No PAN rate', '20%'],
                ['194JA', '2% (technical) filing code'],
                ['194JB', '10% (professional) filing code'],
                ['Deposit due (non-March)', '7th of next month'],
                ['Deposit due (March)', 'April 30'],
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
                <Link href="/calculators/tds-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>TDS Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Section 80C Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/section-194i-tds-on-rent', 'Section 194I TDS on Rent'],
                ['/blogs/section-87a-rebate', 'Section 87A Income Tax Rebate'],
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
        .s194j-sidebar::-webkit-scrollbar { width: 5px; }
        .s194j-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s194j-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s194j-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

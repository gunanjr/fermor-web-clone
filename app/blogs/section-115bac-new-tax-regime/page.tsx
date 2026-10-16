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
  title: 'Section 115BAC New Tax Regime: Slabs, Deductions (2026)',
  description: 'Section 115BAC guide: FY 2025-26 new regime slabs, Rs 60,000 rebate, marginal relief, deductions allowed, and its renumbering to Section 202.',
  alternates: { canonical: 'https://fermor.in/blogs/section-115bac-new-tax-regime' },
  openGraph: {
    title: 'Section 115BAC New Tax Regime: Slabs, Deductions (2026) - Fermor',
    description: 'New tax regime slabs, rebate, marginal relief, and deductions allowed and disallowed under Section 115BAC for FY 2025-26.',
    type: 'article',
    url: 'https://fermor.in/blogs/section-115bac-new-tax-regime',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 115BAC New Tax Regime: Slabs, Deductions (2026) - Fermor',
    description: 'New tax regime slabs, Section 87A rebate, marginal relief, and what deductions Section 115BAC actually allows for FY 2025-26.',
  },
};

const faqItems = [
  { q: 'What is Section 115BAC of the Income Tax Act?', a: 'Section 115BAC is the provision that governs the new tax regime for individuals and Hindu Undivided Families, offering lower slab rates in exchange for giving up most deductions and exemptions available under the old regime. It has been the default tax regime since FY 2023-24, meaning it applies automatically unless a taxpayer actively opts out.' },
  { q: 'Is 80C available under Section 115BAC?', a: 'No. Section 80C deductions for investments in PPF, ELSS, life insurance premiums, and similar instruments are not available under the new tax regime. This is one of the most significant trade-offs of choosing Section 115BAC over the old regime.' },
  { q: 'Is HRA exempt under the new tax regime?', a: 'No. House Rent Allowance exemption is not available under Section 115BAC. Salaried employees who pay significant rent and would otherwise claim a large HRA exemption often find the old regime more beneficial specifically because of this.' },
  { q: 'What are the new tax regime slab rates for FY 2025-26 (AY 2026-27)?', a: 'Income up to Rs 4 lakh is taxed at nil, Rs 4-8 lakh at 5%, Rs 8-12 lakh at 10%, Rs 12-16 lakh at 15%, Rs 16-20 lakh at 20%, Rs 20-24 lakh at 25%, and income above Rs 24 lakh at 30%, under Section 115BAC.' },
  { q: 'How much income is tax-free under the new tax regime?', a: 'Up to Rs 12 lakh in taxable income is effectively tax-free for any resident individual because of the Section 87A rebate of up to Rs 60,000. Salaried individuals get a further Rs 75,000 standard deduction, pushing their effective tax-free gross salary to Rs 12.75 lakh.' },
  { q: 'What is marginal relief under the new tax regime, and how does it work?', a: 'Marginal relief prevents a taxpayer whose income crosses Rs 12 lakh by a small amount from owing a disproportionately large tax bill. For a taxable income of Rs 12,10,000, for example, the normal slab calculation gives Rs 61,500 in tax before cess, but marginal relief caps the tax at Rs 10,000, the exact amount by which income exceeds Rs 12 lakh, so the final tax with 4% cess works out to just Rs 10,400.' },
  { q: 'Which deductions are allowed under the new tax regime?', a: 'The new tax regime allows the standard deduction of Rs 75,000 for salaried individuals and pensioners, employer contribution to NPS under Section 80CCD(2) up to 14% of salary, the Agniveer Corpus Fund deduction under Section 80CCH(2), a family pension deduction of Rs 25,000, interest on a home loan for let-out property under Section 24 with no upper limit, and a few specific allowances such as transport allowance for specially-abled employees.' },
  { q: 'Which deductions are not allowed under the new tax regime?', a: 'Most Chapter VI-A deductions are disallowed, including Section 80C, 80D, 80E, 80G, and 80TTA/80TTB. House Rent Allowance, Leave Travel Allowance, interest on a home loan for a self-occupied property under Section 24, professional tax, and the employee\'s own contribution to NPS are also not deductible under Section 115BAC.' },
  { q: 'Can HUFs opt for the new tax regime?', a: 'Yes. Hindu Undivided Families are eligible for Section 115BAC on the same terms as individuals, with the same slab rates, rebate eligibility, and deduction restrictions.' },
  { q: 'How do I switch from the new tax regime to the old regime?', a: 'Salaried individuals with no business income simply select the old regime while filing their return each year, with no separate form required. Taxpayers with business or professional income must file Form 10-IEA to opt out of the new regime, and once filed, can only switch back to the new regime once in their lifetime.' },
  { q: 'Is Form 10-IEA required for salaried employees choosing the old regime?', a: 'No, not unless they have business or professional income. A purely salaried taxpayer opts for the old regime directly on the ITR form each year without filing Form 10-IEA at all; the form is mandatory only for those with income from business or profession.' },
  { q: 'Can I claim interest on a home loan under the new tax regime?', a: 'Only for a let-out property, where interest under Section 24 remains fully deductible with no cap under Section 115BAC. Interest on a home loan for a self-occupied or vacant property cannot be claimed at all under the new regime, unlike the old regime\'s Rs 2 lakh limit.' },
  { q: 'Has employer NPS contribution deduction increased under the new tax regime?', a: 'Yes. Since FY 2024-25, the deduction for an employer\'s contribution to an employee\'s NPS account under Section 80CCD(2) increased from 10% to 14% of salary plus dearness allowance, following an announcement in the 2024 Budget. This remains one of the few substantial deductions still available under Section 115BAC.' },
  { q: 'What is Section 202 and how does it relate to Section 115BAC?', a: 'Section 202 of the Income Tax Act, 2025 carries forward the exact same new tax regime provisions currently under Section 115BAC of the 1961 Act, just renumbered. Section 202 takes effect from April 1, 2026, but only applies from the tax season covering income earned in FY 2026-27 onward; the current AY 2026-27 filing season, covering income up to March 31, 2026, still falls under the 1961 Act and Section 115BAC.' },
  { q: 'What is the health and education cess on tax computed under Section 115BAC?', a: 'A 4% Health and Education Cess applies on top of the tax computed at the new regime slab rates, the same cess rate that applies under the old regime. Cess is calculated after the Section 87A rebate and any marginal relief has already been applied.' },
  { q: 'What is the surcharge rate under the new tax regime?', a: 'Surcharge under the new tax regime is capped at a maximum of 25%, for income exceeding Rs 2 crore, compared with a 37% maximum surcharge under the old regime. This lower surcharge ceiling is one reason very high earners sometimes prefer the new regime despite losing most deductions.' },
  { q: 'Are senior citizens given relaxed slab rates under the new tax regime?', a: 'No. Unlike the old regime, which raises the basic exemption limit for senior and super senior citizens, Section 115BAC applies the identical slab structure to every resident individual regardless of age. The age-based exemption benefit exists only in the old regime.' },
  { q: 'Which is better: the old tax regime or the new tax regime under Section 115BAC?', a: 'It depends entirely on how many deductions you actually claim. A taxpayer with minimal deductions, no home loan, and modest HRA generally saves more under the new regime\'s lower slabs; someone with a home loan on a self-occupied property, an active Section 80C investment routine, and high HRA often does better under the old regime. Comparing both regimes with your exact numbers on the Old vs New Tax Regime Calculator is the only reliable way to know for certain.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial calculator and information platform for India, built to help people make faster, clearer decisions on taxes, loans, and investments. It combines free calculators with guides on tax provisions and government processes that affect household finances.' },
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
  headline: 'Section 115BAC New Tax Regime: Slabs, Deductions, Exemptions and Benefits',
  url: 'https://fermor.in/blogs/section-115bac-new-tax-regime',
  datePublished: '2026-07-28T00:41:32+05:30',
  dateModified: '2026-07-28T00:41:32+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Complete Section 115BAC guide for FY 2025-26 (AY 2026-27): new tax regime slab rates, the Rs 60,000 Section 87A rebate and tax-free limit up to Rs 12.75 lakh for salaried individuals, marginal relief with a worked example, deductions allowed and disallowed, a full old-vs-new regime comparison table, Form 10-IEA switching rules, a verified worked tax calculation, the renumbering to Section 202 under the Income Tax Act 2025, and cess and surcharge treatment.',
  articleSection: 'Income Tax',
  keywords: '115bac, 115bac of income tax act, section 115bac, 115bac income tax, 115bac of income tax, income tax 115bac, section 115bac new tax regime, 115bac income tax act, income tax act 115bac, tax 115bac, taxation us 115bac, us 115bac of income tax act, new tax regime slabs, section 87a rebate, marginal relief new tax regime, form 10-iea',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Section 115BAC', item: 'https://fermor.in/blogs/section-115bac-new-tax-regime' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tax Under Section 115BAC New Tax Regime',
  description: 'Step-by-step process to calculate income tax liability under the new tax regime.',
  totalTime: 'PT3M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Start with gross salary or total income', text: 'Take your gross salary or total taxable income for the financial year.' },
    { '@type': 'HowToStep', position: 2, name: 'Subtract the standard deduction', text: 'Salaried individuals and pensioners subtract Rs 75,000; other allowed deductions such as Section 80CCD(2) also apply here.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply the slab rates', text: 'Apply the new regime slab rates (nil up to Rs 4 lakh, rising to 30% above Rs 24 lakh) to the resulting taxable income.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply Section 87A rebate or marginal relief', text: 'If taxable income is up to Rs 12 lakh, the rebate brings tax to nil; slightly above that, marginal relief caps the tax at the amount income exceeds Rs 12 lakh.' },
    { '@type': 'HowToStep', position: 5, name: 'Add 4% cess', text: 'Apply the Health and Education Cess to the tax remaining after rebate or marginal relief to arrive at the final tax payable.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/section-115bac-new-tax-regime',
  name: 'Section 115BAC New Tax Regime: Slabs, Deductions, Exemptions and Benefits - Fermor',
  url: 'https://fermor.in/blogs/section-115bac-new-tax-regime',
  inLanguage: 'en-IN',
  datePublished: '2026-07-28T00:41:32+05:30',
  dateModified: '2026-07-28T00:41:32+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'Section 115BAC',
      alternateName: 'New Tax Regime',
      description: 'A provision of the Income Tax Act, 1961 that offers individuals and HUFs lower income tax slab rates in exchange for giving up most deductions and exemptions, and has been the default tax regime since FY 2023-24.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
    {
      '@type': 'DefinedTerm',
      name: 'Section 87A',
      alternateName: 'Income Tax Rebate',
      description: 'A rebate provision that reduces tax liability to nil for resident individuals with taxable income up to Rs 12 lakh under the new tax regime, up to a maximum rebate of Rs 60,000.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/blogs' },
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, self-employed individuals, and HUFs filing income tax returns in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#important-links', name: 'Important Links' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-115bac', name: 'What Is Section 115BAC' },
    { '@type': 'WebPageElement', cssSelector: '#slab-rates', name: 'New Tax Regime Slab Rates' },
    { '@type': 'WebPageElement', cssSelector: '#rebate-marginal-relief', name: 'Rebate and Marginal Relief' },
    { '@type': 'WebPageElement', cssSelector: '#who-can-opt', name: 'Who Can Opt for Section 115BAC' },
    { '@type': 'WebPageElement', cssSelector: '#deductions-allowed', name: 'Deductions Allowed' },
    { '@type': 'WebPageElement', cssSelector: '#deductions-not-allowed', name: 'Deductions Not Allowed' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new-comparison', name: 'Old vs New Regime Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#house-property-losses', name: 'House Property and Business Losses' },
    { '@type': 'WebPageElement', cssSelector: '#switching-regimes', name: 'Switching Between Regimes' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Tax Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#section-202', name: 'Section 115BAC Becomes Section 202' },
    { '@type': 'WebPageElement', cssSelector: '#cess-surcharge', name: 'Cess and Surcharge' },
    { '@type': 'WebPageElement', cssSelector: '#which-regime', name: 'Which Regime Should You Choose' },
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
  knowsAbout: ['Section 115BAC', 'New Tax Regime', 'Section 87A Rebate', 'Income Tax Act 2025', 'Marginal Relief', 'Form 10-IEA', 'Account Aggregator Framework'],
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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article explains Section 115BAC of the Income Tax Act, 1961 for general informational purposes and is not tax advice. Tax outcomes depend on your complete income, deduction, and filing profile; verify your specific liability using the calculators linked on this page or consult a chartered accountant before filing. Figures reflect the law as of the date above and may change with future notifications.
      </p>
    </div>
  );
}

export default function Section115BACPage() {
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
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Section 115BAC</li>
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
            <time dateTime="2026-07-28T00:41:32+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Jul 28, 2026</time>
            <span style={{ color: C.border }}>&middot;</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>13 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Section 115BAC New Tax Regime: Slabs, Deductions, Exemptions and Benefits
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Section 115BAC of the Income Tax Act, 1961 governs the new tax regime, the default regime since FY 2023-24, which trades lower slab rates for giving up most deductions and exemptions.
            </p>
            <p style={pStyle}>
              For FY 2025-26 (AY 2026-27), taxable income up to Rs 12 lakh is effectively tax-free through the Section 87A rebate, and up to Rs 12.75 lakh for salaried individuals once the standard deduction is applied.
            </p>
            <p style={pStyle}>
              This guide covers the exact slabs, what you can and cannot deduct, a fully worked tax calculation, and how Section 115BAC is being renumbered under the new Income Tax Act, 2025.
            </p>

            {/* Important Links */}
            <div id="important-links" style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 28, background: C.bg }}>
              <p style={{ fontFamily: INTER, fontSize: 13, fontWeight: 700, color: C.dg, letterSpacing: '.04em', textTransform: 'uppercase', margin: '0 0 12px' }}>Important Links</p>
              <InfoTable
                caption="Official and calculator links for Section 115BAC"
                headers={['Resource', 'Link']}
                rows={[
                  ['Income Tax Department (e-filing portal)', <Link key="l1" href={INCOME_TAX_DEPT} target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>incometax.gov.in</Link>],
                  ['Compare old vs new regime for your income', <Link key="l2" href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Old vs New Tax Regime Calculator</Link>],
                  ['Full tax computation, both regimes', <Link key="l3" href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Income Tax Calculator</Link>],
                ]}
              />
            </div>

            {/* SECTION: What is 115BAC */}
            <h2 id="what-is-115bac" style={hStyle}>What Is Section 115BAC?</h2>
            <div style={{ borderLeft: `3px solid ${C.dg}`, paddingLeft: 16, marginBottom: 16 }}>
              <p style={{ fontFamily: INTER, fontSize: 15.5, fontWeight: 600, color: C.dark, lineHeight: 1.7, margin: 0 }}>
                Section 115BAC of the Income Tax Act, 1961 is the provision that sets out the new tax regime: lower slab rates for individuals and Hindu Undivided Families in exchange for giving up most deductions and exemptions available under the old regime.
              </p>
            </div>
            <p style={pStyle}>
              Introduced in Budget 2020 as an optional alternative, Section 115BAC was amended in Budget 2023 with revised slabs and made the default regime, meaning it applies automatically to every taxpayer who does not actively choose otherwise.
            </p>
            <p style={pStyle}>
              The trade-off is simplicity for scope: fewer documents, less tax planning, and a lower tax rate at most income levels, at the cost of losing HRA, most Chapter VI-A deductions, and interest deduction on a self-occupied home loan.
            </p>

            {/* SECTION: Slab rates */}
            <h2 id="slab-rates" style={hStyle}>New Tax Regime Slab Rates for FY 2025-26 (AY 2026-27)</h2>
            <p style={pStyle}>
              These are the slabs currently in force under Section 115BAC for the financial year ending March 31, 2026.
            </p>
            <InfoTable
              caption="Section 115BAC slab rates, FY 2025-26 (AY 2026-27)"
              headers={['Taxable Income', 'Tax Rate']}
              rows={[
                ['Up to Rs 4,00,000', 'Nil'],
                ['Rs 4,00,001 to Rs 8,00,000', '5%'],
                ['Rs 8,00,001 to Rs 12,00,000', '10%'],
                ['Rs 12,00,001 to Rs 16,00,000', '15%'],
                ['Rs 16,00,001 to Rs 20,00,000', '20%'],
                ['Rs 20,00,001 to Rs 24,00,000', '25%'],
                ['Above Rs 24,00,000', '30%'],
              ]}
            />
            <p style={pStyle}>
              Salaried individuals and pensioners also get a standard deduction of Rs 75,000 under the new regime, applied before these slabs, which is higher than the Rs 50,000 standard deduction available under the old regime.
            </p>

            {/* SECTION: Rebate and marginal relief */}
            <h2 id="rebate-marginal-relief" style={hStyle}>Section 87A Rebate and Marginal Relief</h2>
            <p style={pStyle}>
              A resident individual with taxable income up to Rs 12 lakh under the new regime pays zero tax, through a rebate of up to Rs 60,000 under Section 87A that fully cancels out the tax otherwise due at that income level.
            </p>
            <p style={pStyle}>
              Salaried individuals effectively get tax-free income up to Rs 12.75 lakh, since the Rs 75,000 standard deduction is subtracted before the Rs 12 lakh rebate threshold is checked.
            </p>
            <p style={pStyle}>
              Marginal relief protects taxpayers who cross this threshold by only a small margin. Take a taxable income of Rs 12,10,000: the slab calculation alone gives Rs 61,500 in tax before cess, but marginal relief caps the tax at Rs 10,000, exactly the amount by which income exceeds Rs 12 lakh. After the 4% cess, the final tax payable is Rs 10,400, not Rs 63,960.
            </p>

            {/* SECTION: Who can opt */}
            <h2 id="who-can-opt" style={hStyle}>Who Can Opt for Section 115BAC?</h2>
            <p style={pStyle}>
              Both individuals and Hindu Undivided Families can be taxed under Section 115BAC, including residents, non-residents, and senior citizens, all on the same slab structure.
            </p>
            <p style={pStyle}>
              Since it is the default regime, no active choice is needed to be taxed under it. A taxpayer who wants the old regime instead must choose it before the due date for filing the original return; once that due date passes, switching to the old regime for that year is no longer possible, even if it would have resulted in lower tax.
            </p>

            {/* SECTION: Deductions allowed */}
            <h2 id="deductions-allowed" style={hStyle}>Deductions and Exemptions Allowed Under Section 115BAC</h2>
            <BulletList items={[
              <span key="a1"><strong>Standard deduction:</strong> Rs 75,000 for salaried individuals and pensioners.</span>,
              <span key="a2"><strong>Employer's NPS contribution [Section 80CCD(2)]:</strong> up to 14% of salary plus dearness allowance.</span>,
              <span key="a3"><strong>Agniveer Corpus Fund [Section 80CCH(2)]:</strong> amount deposited or paid into the fund.</span>,
              <span key="a4"><strong>Additional employee cost [Section 80JJAA]:</strong> available to employers, not individual salaried taxpayers.</span>,
              <span key="a5"><strong>Interest on home loan for let-out property [Section 24]:</strong> fully deductible, with no upper limit.</span>,
              <span key="a6"><strong>Family pension deduction:</strong> Rs 25,000 or one-third of the pension, whichever is lower.</span>,
              <span key="a7"><strong>Gifts up to Rs 50,000</strong> and specific exemptions on gratuity, leave encashment, and voluntary retirement compensation.</span>,
              <span key="a8"><strong>Specific allowances:</strong> transport allowance for specially-abled employees, conveyance allowance for official travel, and daily allowances for duty travel, under defined conditions.</span>,
            ]} />

            {/* SECTION: Deductions not allowed */}
            <h2 id="deductions-not-allowed" style={hStyle}>Deductions and Exemptions Not Allowed Under Section 115BAC</h2>
            <BulletList items={[
              'Section 80C: PPF, ELSS, life insurance premiums, and other eligible investments.',
              'Section 80D: health insurance premiums.',
              'Section 80E, 80G, and 80TTA/80TTB: education loan interest, donations, and savings account interest.',
              'House Rent Allowance (HRA) and Leave Travel Allowance (LTA).',
              'Interest on a home loan for a self-occupied or vacant property, under Section 24.',
              'Employee\'s own contribution to NPS.',
              'Professional tax and entertainment allowance on salary.',
              'Additional depreciation and most scientific research or SEZ-linked deductions for businesses.',
            ]} />

            <CalcCTA
              href="/calculators/old-vs-new-tax-regime-calculator"
              label="Old vs New Tax Regime Calculator"
              note="See exactly which regime saves you more, using your real income, deductions, and HRA figures."
            />

            {/* SECTION: Old vs new comparison */}
            <h2 id="old-vs-new-comparison" style={hStyle}>Old vs New Tax Regime: Full Deduction Comparison</h2>
            <InfoTable
              caption="Deductions and exemptions: old regime vs new regime, FY 2025-26"
              headers={['Deduction / Exemption', 'Old Regime', 'New Regime']}
              rows={[
                ['Section 80C (PPF, NSC, ELSS, life insurance)', 'Up to Rs 1.5 lakh', 'Not available'],
                ['House Rent Allowance', 'Available (based on actuals)', 'Not available'],
                ['Standard deduction (salaried)', 'Rs 50,000', 'Rs 75,000'],
                ['Section 80D (health insurance)', 'Available', 'Not available'],
                ['Home loan interest, self-occupied (Section 24)', 'Up to Rs 2 lakh', 'Not available'],
                ['Section 80G (donations)', 'Available', 'Not available'],
                ['Leave Travel Allowance', 'Available', 'Not available'],
                ['Section 80E (education loan interest)', 'Available', 'Not available'],
                ['Section 80TTA/80TTB (savings interest)', 'Available', 'Not available'],
                ['Professional tax', 'Available', 'Not available'],
                ['Transport allowance (specially-abled)', 'Available', 'Available'],
                ['House property loss set-off against other income', 'Allowed', 'Not available'],
              ]}
            />

            {/* SECTION: House property losses */}
            <h2 id="house-property-losses" style={hStyle}>House Property and Business Loss Rules Under the New Regime</h2>
            <InfoTable
              caption="Loss set-off treatment: old regime vs new regime"
              headers={['Loss Type', 'Old Regime', 'New Regime']}
              rows={[
                ['Self-occupied property interest', 'Deductible up to Rs 2 lakh; loss can be set off', 'No deduction; no set-off'],
                ['Let-out property interest', 'Fully deductible; excess loss carried forward', 'Deductible only up to taxable rent; no carry-forward of excess'],
                ['Business loss / unabsorbed depreciation', 'Set-off and carry-forward allowed if conditions are met', 'Not allowed if linked to a deduction disallowed under the new regime'],
              ]}
            />

            {/* SECTION: Switching */}
            <h2 id="switching-regimes" style={hStyle}>How to Switch Between Old and New Tax Regime</h2>
            <p style={pStyle}>
              Since the new regime is the default, opting out works differently depending on whether you have business income.
            </p>
            <InfoTable
              caption="Switching regimes: salaried vs non-salaried taxpayers"
              headers={['Particulars', 'Salaried Taxpayer', 'Non-Salaried (Business Income)']}
              rows={[
                ['Opting out of new regime', 'Allowed', 'Allowed'],
                ['Action required', 'Select old regime while filing ITR', 'File Form 10-IEA'],
                ['Form 10-IEA applicability', 'Not applicable', 'Mandatory'],
                ['Filing frequency', 'Choose each year, no form needed', 'File once; remains valid for future years unless withdrawn'],
                ['Switching back to new regime', 'Allowed anytime', 'Allowed only once in a lifetime'],
              ]}
            />

            {/* SECTION: Worked example */}
            <h2 id="worked-example" style={hStyle}>Worked Example: Tax Calculation Under Section 115BAC</h2>
            <p style={pStyle}>
              Consider a salaried individual with a Rs 25,00,000 salary for FY 2025-26. After the Rs 75,000 standard deduction, taxable income under the new regime is Rs 24,25,000.
            </p>
            <InfoTable
              caption="Tax computation under the new regime for taxable income of Rs 24,25,000"
              headers={['Slab', 'Tax']}
              rows={[
                ['Up to Rs 4,00,000', 'Nil'],
                ['Rs 4,00,000 to Rs 8,00,000 (5%)', 'Rs 20,000'],
                ['Rs 8,00,000 to Rs 12,00,000 (10%)', 'Rs 40,000'],
                ['Rs 12,00,000 to Rs 16,00,000 (15%)', 'Rs 60,000'],
                ['Rs 16,00,000 to Rs 20,00,000 (20%)', 'Rs 80,000'],
                ['Rs 20,00,000 to Rs 24,00,000 (25%)', 'Rs 1,00,000'],
                ['Rs 24,00,000 to Rs 24,25,000 (30%)', 'Rs 7,500'],
                ['Tax before cess', 'Rs 3,07,500'],
                ['Add 4% Health and Education Cess', 'Rs 12,300'],
                ['Total tax under new regime', 'Rs 3,19,800'],
              ]}
            />
            <p style={pStyle}>
              Under the old regime, the same Rs 25,00,000 salary, after a Rs 50,000 standard deduction, gives a taxable income of Rs 24,50,000, taxed at nil up to Rs 2.5 lakh, 5% up to Rs 5 lakh, 20% up to Rs 10 lakh, and 30% above that. That works out to Rs 5,47,500 before cess, or Rs 5,69,400 with the 4% cess added.
            </p>
            <p style={pStyle}>
              This taxpayer saves Rs 2,49,600 by choosing the new regime, purely because the gap in slab rates outweighs the deductions given up at this income level and deduction profile.
            </p>

            {/* SECTION: Section 202 */}
            <h2 id="section-202" style={hStyle}>Section 115BAC Becomes Section 202 Under the Income Tax Act, 2025</h2>
            <p style={pStyle}>
              The Income Tax Act, 2025 renumbers Section 115BAC as Section 202, effective April 1, 2026, without changing the slab rates, rebate, or the deductions allowed and disallowed.
            </p>
            <p style={pStyle}>
              Section 202 does not apply to the current ITR filing season, which runs from April to July 2026 and covers income earned up to March 31, 2026, still governed by the 1961 Act. It becomes relevant only for the tax season covering FY 2026-27 income, filed from April 2027 onward.
            </p>
            <InfoTable
              caption="Section renumbering: Income Tax Act 1961 vs Income Tax Act 2025"
              headers={['Provision', 'Income Tax Act, 1961', 'Income Tax Act, 2025']}
              rows={[
                ['New tax regime', 'Section 115BAC', 'Section 202'],
                ['Rebate under new regime', 'Section 87A', 'Section 156'],
                ['VRS exemption', 'Section 10(10C)', 'Schedule'],
                ['Leave encashment exemption', 'Section 10(10AA)', 'Schedule'],
                ['SEZ exemption', 'Section 10AA', 'Schedule'],
                ['Additional depreciation', 'Section 32(1)(iia)', 'Section 32'],
              ]}
            />

            {/* SECTION: Cess and surcharge */}
            <h2 id="cess-surcharge" style={hStyle}>Health and Education Cess and Surcharge Under the New Regime</h2>
            <p style={pStyle}>
              A 4% Health and Education Cess applies on top of the tax computed at the new regime slab rates, after any Section 87A rebate or marginal relief has already reduced the base tax.
            </p>
            <p style={pStyle}>
              Surcharge under the new regime is capped at a maximum of 25%, applicable only above Rs 2 crore in income, compared with a 37% maximum surcharge under the old regime. This lower surcharge ceiling is a specific reason some very high earners choose the new regime despite losing most deductions.
            </p>

            {/* SECTION: Which regime */}
            <h2 id="which-regime" style={hStyle}>Which Regime Should You Choose?</h2>
            <p style={pStyle}>
              The new regime tends to win for taxpayers with few deductions: no home loan on a self-occupied property, modest or no HRA claim, and little invested toward Section 80C or 80D.
            </p>
            <p style={pStyle}>
              The old regime still wins for taxpayers actively using a home loan interest deduction, a full Section 80C investment routine, health insurance premiums, and a meaningful HRA exemption, since these can outweigh the new regime's lower slab rates.
            </p>
            <p style={pStyle}>
              Running your own numbers on the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> or the full <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, fontWeight: 600 }}>Income Tax Calculator</Link> is the only reliable way to know which regime actually saves you money this year.
            </p>

            {/* SECTION: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Section 115BAC</h2>
            <FaqAccordion items={faqItems} />

            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="s115bac-sidebar"
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
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>115BAC Quick Reference</div>
              {([
                ['Basic exemption', 'Rs 4 lakh'],
                ['Standard deduction', 'Rs 75,000'],
                ['Max rebate (87A)', 'Rs 60,000'],
                ['Tax-free up to (non-salaried)', 'Rs 12 lakh'],
                ['Tax-free up to (salaried)', 'Rs 12.75 lakh'],
                ['Top slab rate', '30% above Rs 24 lakh'],
                ['Cess', '4%'],
                ['Max surcharge', '25% (37% in old regime)'],
                ['Renumbered as', 'Section 202, from AY 2027-28'],
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
                <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Old vs New Tax Regime</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
                <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                  <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>HRA Calculator</span>
                  <span style={{ color: '#7A8087', fontSize: 16 }}>&rsaquo;</span>
                </Link>
              </div>
            </nav>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Is Better for You'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date FY 2025-26'],
                ['/blogs/income-tax-slabs-fy-2025-26', 'Income Tax Slabs FY 2025-26'],
                ['/blogs/section-10-income-tax-act-exemptions', 'Section 10 of Income Tax Act: Exemptions and Allowances'],
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
        .s115bac-sidebar::-webkit-scrollbar { width: 5px; }
        .s115bac-sidebar::-webkit-scrollbar-track { background: transparent; }
        .s115bac-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .s115bac-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

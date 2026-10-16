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
  green:  '#166534',
  paleDg: '#f1f3f4',
};
const INTER   = 'var(--font-inter), Inter, sans-serif';
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

export const metadata: Metadata = {
  title: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New & Old Regime Rates, Senior Citizen Slabs',
  description: 'Income tax slabs for FY 2025-26 (AY 2026-27): new tax regime slabs 0% up to ₹4L, 5% on ₹4-8L, 10% on ₹8-12L, then 15%, 20%, 25%, 30%. ₹12L income is tax-free via Section 87A rebate. Old regime, surcharge, cess, senior citizen slabs, worked examples, and which regime saves more.',
  alternates: { canonical: 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26' },
  openGraph: {
    title: 'Income Tax Slabs FY 2025-26 (AY 2026-27) - Fermor',
    description: 'New tax regime slabs, old regime rates, Section 87A rebate, marginal relief, surcharge, and worked examples for FY 2025-26.',
    type: 'article',
    url: 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Income Tax Slabs FY 2025-26 (AY 2026-27) - Fermor',
    description: 'New regime: ₹12L effectively tax-free. Old regime rates unchanged. Full guide with worked examples.',
  },
};

const newsArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New Tax Regime, Old Regime, Senior Citizen Rates and Worked Examples',
  url: 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26',
  datePublished: '2026-06-28T19:49:00+05:30',
  dateModified: '2026-09-28T17:44:46+05:30',
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  description: 'Income tax slabs for FY 2025-26: new regime, old regime, senior citizen slabs, Section 87A rebate, marginal relief, surcharge, cess, worked examples, and old vs new regime comparison.',
  articleSection: 'Income Tax',
  keywords: 'income tax slab for fy 2025-26, new tax regime slabs, income tax slab for ay 2026-27, tax slab fy 2025-26, new tax regime 2025, income tax rates india, section 87a rebate, income tax calculator',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the income tax slabs for FY 2025-26 under the new tax regime?',
      acceptedAnswer: { '@type': 'Answer', text: 'Under the new tax regime for FY 2025-26: 0% on income up to ₹4 lakh, 5% on ₹4-8 lakh, 10% on ₹8-12 lakh, 15% on ₹12-16 lakh, 20% on ₹16-20 lakh, 25% on ₹20-24 lakh, and 30% on income above ₹24 lakh. After the Section 87A rebate of ₹60,000, taxable income up to ₹12 lakh results in zero tax.' },
    },
    {
      '@type': 'Question',
      name: 'Is ₹12 lakh income tax-free in the new regime for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. If taxable income (after standard deduction) is up to ₹12 lakh, the Section 87A rebate fully covers the tax liability of ₹60,000, resulting in zero tax. For a salaried person, this means gross salary up to ₹12.75 lakh is effectively tax-free (₹12 lakh taxable after ₹75,000 standard deduction). For income above ₹12 lakh, no rebate is available.' },
    },
    {
      '@type': 'Question',
      name: 'What are the income tax slabs for FY 2025-26 under the old tax regime?',
      acceptedAnswer: { '@type': 'Answer', text: 'Under the old tax regime for FY 2025-26: 0% on income up to ₹2.5 lakh, 5% on ₹2.5-5 lakh, 20% on ₹5-10 lakh, and 30% on income above ₹10 lakh. Senior citizens (60-80 years) get 0% up to ₹3 lakh, super senior citizens (80+ years) get 0% up to ₹5 lakh.' },
    },
    {
      '@type': 'Question',
      name: 'Should I choose the new tax regime or old tax regime for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'For most salaried taxpayers under ₹15 lakh income, the new regime is better unless you have very high deductions (80C + HRA + 80D + NPS exceeding ₹4.5 lakh). For income up to ₹12.75 lakh, the new regime always wins (zero tax). For higher incomes, the break-even point for old regime deductions is typically ₹5-6 lakh in total deductions. Use the Old vs New Regime Calculator on Fermor to compare your specific situation.' },
    },
    {
      '@type': 'Question',
      name: 'What is the standard deduction for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'The standard deduction for FY 2025-26 is ₹75,000 under the new tax regime and ₹50,000 under the old tax regime. This deduction applies to salaried individuals and pensioners only, and is subtracted from gross salary before computing taxable income.' },
    },
    {
      '@type': 'Question',
      name: 'What is marginal relief in income tax?',
      acceptedAnswer: { '@type': 'Answer', text: 'Marginal relief ensures that when income marginally exceeds a threshold (like the ₹12 lakh 87A rebate limit), the additional tax payable does not exceed the additional income earned. For example, if taxable income is ₹12.1 lakh, the additional income over ₹12 lakh is ₹10,000. Without marginal relief, tax would be ₹67,500. With marginal relief, tax is capped at ₹10,000 plus cess.' },
    },
    {
      '@type': 'Question',
      name: 'What is the Section 87A rebate for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'Section 87A provides a tax rebate to reduce your tax liability to zero if your taxable income does not exceed the threshold. For the new tax regime in FY 2025-26, the rebate limit is ₹12 lakh taxable income (rebate amount up to ₹60,000). For the old tax regime, the rebate limit is ₹5 lakh taxable income (rebate amount up to ₹12,500).' },
    },
    {
      '@type': 'Question',
      name: 'What are the income tax slabs for senior citizens for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'Senior citizens (60-80 years) under the old regime: 0% up to ₹3 lakh, 5% on ₹3-5 lakh, 20% on ₹5-10 lakh, 30% above ₹10 lakh. Super senior citizens (80+ years) under old regime: 0% up to ₹5 lakh, 20% on ₹5-10 lakh, 30% above ₹10 lakh. Under the new tax regime, the same slabs apply to all individuals regardless of age.' },
    },
    {
      '@type': 'Question',
      name: 'What is the health and education cess rate for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'Health and Education Cess is 4% on the total income tax (including surcharge, if applicable) for FY 2025-26. This cess applies to all taxpayers under both the new and old tax regimes.' },
    },
    {
      '@type': 'Question',
      name: 'What are the income tax slabs for women in India for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'There are no separate income tax slabs for women in India for FY 2025-26. Women below 60 years of age pay the same income tax rates as male taxpayers under both the new and old tax regimes. The special lower slab for women (which existed before FY 2011-12) was abolished.' },
    },
    {
      '@type': 'Question',
      name: 'What are the income tax slabs for NRIs for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'NRIs (Non-Resident Indians) can only use the old tax regime for FY 2025-26 and are not eligible for the new tax regime. Under the old regime, NRIs are taxed at the standard slabs: 0% up to ₹2.5 lakh, 5% on ₹2.5-5 lakh, 20% on ₹5-10 lakh, and 30% above ₹10 lakh. NRIs are not eligible for the Section 87A rebate.' },
    },
    {
      '@type': 'Question',
      name: 'What is the LTCG and STCG tax rate for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'For FY 2025-26: Short-term capital gains (STCG) on listed equity shares and equity mutual funds (Section 111A) are taxed at 20%. Long-term capital gains (LTCG) on listed equity shares and equity mutual funds (Section 112A) above ₹1.25 lakh are taxed at 12.5%. LTCG on other assets (Section 112) are taxed at 12.5% without indexation. These rates apply under both new and old tax regimes.' },
    },
    {
      '@type': 'Question',
      name: 'How much tax do I pay on a ₹10 lakh salary in FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'For a ₹10 lakh salary under the new tax regime: after ₹75,000 standard deduction, taxable income is ₹9.25 lakh. Tax = ₹20,000 (5% on ₹4-8L) + ₹12,500 (10% on ₹8-9.25L) = ₹32,500. Since taxable income (₹9.25L) is under ₹12L, the full Section 87A rebate applies: net tax = ₹0. A ₹10 lakh salary is completely tax-free under the new regime for FY 2025-26.' },
    },
    {
      '@type': 'Question',
      name: 'Are income tax slabs changing for FY 2026-27 (AY 2027-28)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Union Budget 2026 did not announce changes to the income tax slab structure. The new tax regime slabs introduced in Budget 2025 (0% up to ₹4L, 5% on ₹4-8L, etc.) continue unchanged for FY 2026-27.' },
    },
    {
      '@type': 'Question',
      name: 'What is the income tax on crypto for FY 2025-26?',
      acceptedAnswer: { '@type': 'Answer', text: 'Income from Virtual Digital Assets (VDAs), including cryptocurrency and NFTs, is taxed at a flat 30% for FY 2025-26, plus 4% cess. No deductions are allowed except the cost of acquisition. Losses from VDA transactions cannot be set off against any other income, and cannot be carried forward to subsequent years.' },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Blogs', item: 'https://fermor.in/blogs' },
    { '@type': 'ListItem', position: 3, name: 'Income Tax Slabs FY 2025-26', item: 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Income Tax for FY 2025-26',
  description: 'Step-by-step process to calculate your income tax liability for FY 2025-26 under the new or old tax regime.',
  totalTime: 'PT10M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Calculate Gross Total Income', text: 'Add all income sources: salary, house property, business income, capital gains, and other sources.' },
    { '@type': 'HowToStep', position: 2, name: 'Deduct Standard Deduction', text: 'Subtract ₹75,000 (new regime) or ₹50,000 (old regime) as standard deduction if you are salaried or a pensioner.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply Chapter VI-A Deductions (Old Regime Only)', text: 'Under old regime, subtract eligible deductions: 80C (up to ₹1.5L), 80D, HRA, NPS 80CCD(1B), 80TTA, and others.' },
    { '@type': 'HowToStep', position: 4, name: 'Arrive at Taxable Income', text: 'Taxable Income = Gross Total Income minus all applicable deductions.' },
    { '@type': 'HowToStep', position: 5, name: 'Apply Tax Slab Rates', text: 'Apply the slab rates for the chosen regime progressively. Each slab rate applies only to income within that bracket.' },
    { '@type': 'HowToStep', position: 6, name: 'Check Section 87A Rebate', text: 'If taxable income is up to ₹12 lakh (new regime) or ₹5 lakh (old regime), apply the 87A rebate to reduce tax to zero.' },
    { '@type': 'HowToStep', position: 7, name: 'Add Surcharge if Applicable', text: 'If taxable income exceeds ₹50 lakh, add surcharge: 10% (₹50L-1Cr), 15% (₹1Cr-2Cr), 25% (₹2Cr-5Cr), 25% new / 37% old (above ₹5Cr).' },
    { '@type': 'HowToStep', position: 8, name: 'Add Health and Education Cess', text: 'Add 4% Health and Education Cess on the tax amount (including surcharge). This gives your final tax liability.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26',
  name: 'Income Tax Slabs FY 2025-26 (AY 2026-27): New Tax Regime and Old Regime Rates - Fermor',
  url: 'https://fermor.in/blogs/income-tax-slabs-fy-2025-26',
  inLanguage: 'en-IN',
  datePublished: '2026-06-28T19:49:00+05:30',
  dateModified: '2026-09-28T17:44:46+05:30',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor Analysis', url: 'https://fermor.in/blogs' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  about: [{
    '@type': 'DefinedTerm',
    name: 'Income Tax Slabs FY 2025-26',
    alternateName: 'AY 2026-27 Tax Slabs',
    description: 'Income tax slabs are the income brackets defined by the government with different tax rates. For FY 2025-26 under the new tax regime, slabs range from 0% (up to ₹4 lakh) to 30% (above ₹24 lakh) with a Section 87A rebate making income up to ₹12 lakh effectively tax-free.',
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/blogs' },
  }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried taxpayers, self-employed individuals, and senior citizens computing income tax for FY 2025-26',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', isAccessibleForFree: true, cssSelector: '.article-lead' },
    { '@type': 'WebPageElement', cssSelector: '#what-is', name: 'What are Income Tax Slabs' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-slabs', name: 'New Tax Regime Slabs FY 2025-26' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-slabs', name: 'Old Tax Regime Slabs FY 2025-26' },
    { '@type': 'WebPageElement', cssSelector: '#87a-rebate', name: 'Section 87A Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#marginal-relief', name: 'Marginal Relief' },
    { '@type': 'WebPageElement', cssSelector: '#standard-deduction', name: 'Standard Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#zero-tax-working', name: 'How Zero Tax on 12.75 Lakh Works' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-cess', name: 'Surcharge and Cess Rates' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen-slabs', name: 'Senior Citizen Tax Slabs' },
    { '@type': 'WebPageElement', cssSelector: '#budget-2026', name: 'Budget 2026 Tax Slab Changes' },
    { '@type': 'WebPageElement', cssSelector: '#regime-comparison', name: 'Old vs New Regime Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#income-comparison', name: 'Tax at Every Income Level' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-calculate', name: 'How to Calculate Income Tax' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Income Tax Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#slab-history', name: 'Historical Slab Changes' },
    { '@type': 'WebPageElement', cssSelector: '#special-rates', name: 'Special Tax Rates' },
    { '@type': 'WebPageElement', cssSelector: '#women-nri-huf', name: 'Tax Slabs for Women NRIs HUF' },
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
  knowsAbout: ['Income Tax India', 'New Tax Regime FY 2025-26', 'Section 87A Rebate', 'Personal Finance India', 'SEBI Regulations', 'Account Aggregator Framework'],
};

const pStyle: React.CSSProperties = { fontFamily: INTER, fontSize: 15, color: C.ink, lineHeight: 1.75, marginBottom: 16 };
const hStyle: React.CSSProperties = { fontFamily: POPPINS, fontSize: 20, fontWeight: 700, color: C.dg, lineHeight: 1.3, marginTop: 36, marginBottom: 14, letterSpacing: '-0.01em' };
const h3Style: React.CSSProperties = { fontFamily: POPPINS, fontSize: 16, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginTop: 24, marginBottom: 10 };

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

function TaxTable({ caption, headers, rows, highlightLast = false }: {
  caption: string;
  headers: string[];
  rows: (string | React.ReactNode)[][];
  highlightLast?: boolean;
}) {
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
          {rows.map((row, ri) => {
            const isLast = highlightLast && ri === rows.length - 1;
            return (
              <tr key={ri} style={isLast ? { background: C.paleDg, fontWeight: 700 } : {}}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ ...(ri % 2 === 1 ? tdAltStyle : tdStyle), borderRight: ci < row.length - 1 ? `1px solid ${C.border}` : 'none', fontWeight: isLast ? 700 : undefined }}>{cell}</td>
                ))}
              </tr>
            );
          })}
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

const faqItems = [
  { q: 'What is the income tax slab for FY 2025-26 under the new regime?', a: 'New regime slabs for FY 2025-26: 0% up to ₹4 lakh, 5% on ₹4-8 lakh, 10% on ₹8-12 lakh, 15% on ₹12-16 lakh, 20% on ₹16-20 lakh, 25% on ₹20-24 lakh, and 30% above ₹24 lakh. The Section 87A rebate eliminates tax entirely for taxable income up to ₹12 lakh.' },
  { q: 'Is ₹12 lakh income completely tax-free under the new regime?', a: 'Yes. If taxable income (after standard deduction) is exactly ₹12 lakh, the tax comes to ₹60,000 which is fully cancelled by the Section 87A rebate. For a salaried person, gross salary up to ₹12.75 lakh is tax-free: subtract ₹75,000 standard deduction to get ₹12 lakh taxable income.' },
  { q: 'Should I opt for new regime or old regime for FY 2025-26?', a: 'For income up to ₹12.75 lakh (salaried): always choose new regime (zero tax). For higher income, the new regime is better unless your total Chapter VI-A deductions (80C + HRA + 80D + NPS + others) exceed roughly ₹4.5-6 lakh depending on income level. Use Fermor\'s Old vs New Regime Calculator for a precise comparison.' },
  { q: 'What is the standard deduction for salaried employees in FY 2025-26?', a: 'Standard deduction is ₹75,000 under the new tax regime and ₹50,000 under the old tax regime for FY 2025-26. This flat deduction reduces gross salary before computing taxable income and applies automatically to all salaried individuals and pensioners.' },
  { q: 'How does marginal relief work in income tax?', a: 'Marginal relief prevents disproportionate tax when income crosses a threshold. Example: taxable income ₹12.1 lakh (just above the ₹12L rebate limit). Without relief: tax = ₹67,500 (including cess). Incremental income over ₹12L = ₹10,000. With marginal relief, tax cannot exceed ₹10,400 (₹10,000 + 4% cess).' },
  { q: 'What is Section 87A and how much rebate do I get?', a: 'Section 87A provides a rebate on income tax to reduce your liability to zero if taxable income is within the limit. For new regime (FY 2025-26): rebate up to ₹60,000 for taxable income up to ₹12 lakh. For old regime: rebate up to ₹12,500 for taxable income up to ₹5 lakh. If taxable income exceeds the limit even by ₹1, the rebate is not available.' },
  { q: 'Are income tax slabs different for women in FY 2025-26?', a: 'No. There are no separate income tax slabs for women in India for FY 2025-26. The same slabs apply regardless of gender. The gender-based differential that existed before FY 2011-12 was abolished.' },
  { q: 'What are the income tax slabs for NRIs for FY 2025-26?', a: 'NRIs cannot opt for the new tax regime. Under the old regime: 0% up to ₹2.5 lakh, 5% on ₹2.5-5 lakh, 20% on ₹5-10 lakh, 30% above ₹10 lakh. NRIs are not eligible for Section 87A rebate and cannot claim basic exemption on interest income from NRO accounts.' },
  { q: 'What is the tax on ₹15 lakh salary under the new regime?', a: 'For ₹15 lakh gross salary under new regime: taxable income = ₹15L - ₹75,000 (std ded) = ₹14.25 lakh. Tax: 0 (0-4L) + ₹20,000 (4-8L) + ₹40,000 (8-12L) + ₹33,750 (12-14.25L at 15%) = ₹93,750. Plus 4% cess = ₹97,500. No 87A rebate as taxable income exceeds ₹12 lakh.' },
  { q: 'How is income tax on crypto calculated for FY 2025-26?', a: 'Income from Virtual Digital Assets (VDA) including cryptocurrency is taxed at a flat 30% plus 4% cess, regardless of the holding period. Only the cost of acquisition is deductible. Losses from VDA transactions cannot be set off against other income and cannot be carried forward.' },
  { q: 'What is the surcharge on income tax above ₹50 lakh?', a: 'Surcharge rates for FY 2025-26: 10% on income between ₹50L and ₹1Cr, 15% on ₹1Cr to ₹2Cr, 25% on ₹2Cr to ₹5Cr. Above ₹5Cr: 25% under new regime, 37% under old regime. Surcharge is calculated on the base tax (before cess) and 4% cess is then added on the total of tax + surcharge.' },
  { q: 'Are tax slabs changing for FY 2026-27 (AY 2027-28)?', a: 'Union Budget 2026 did not announce changes to the income tax slab structure. The new tax regime slabs introduced in Budget 2025 remain unchanged for FY 2026-27: 0% up to ₹4L, 5% on ₹4-8L, 10% on ₹8-12L, 15% on ₹12-16L, 20% on ₹16-20L, 25% on ₹20-24L, and 30% above ₹24L.' },
];

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
        <strong style={{ color: C.ink2 }}>Disclaimer:</strong> This article is for informational purposes only and does not constitute tax advice. Income tax rules are subject to change. Always verify the latest provisions on the Income Tax Department&apos;s official website (incometax.gov.in) or consult a qualified chartered accountant before filing your return. Fermor is not a tax advisory firm.
      </p>
    </div>
  );
}

export default function IncomeTaxSlabsPage() {
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
              <li style={{ color: C.border }}>›</li>
              <li><Link href="/blogs" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3, textDecoration: 'none' }}>Blogs</Link></li>
              <li style={{ color: C.border }}>›</li>
              <li aria-current="page" style={{ color: C.ink2, fontWeight: 500 }}>Income Tax Slabs FY 2025-26</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article header */}
      <div style={{ background: '#fff', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '36px 24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ background: C.paleDg, color: C.dg, fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 6 }}>
              Income Tax
            </span>
            <span style={{ color: C.border }}>·</span>
            <time dateTime="2026-09-28T17:44:46+05:30" style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>Updated Sep 28, 2026</time>
            <span style={{ color: C.border }}>·</span>
            <span style={{ fontFamily: INTER, fontSize: 13, color: C.ink3 }}>14 min read</span>
          </div>
          <h1 style={{ fontFamily: POPPINS, fontSize: 'clamp(22px, 3.2vw, 32px)', fontWeight: 700, color: C.dark, lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: 16, maxWidth: 860 }}>
            Income Tax Slabs FY 2025-26 (AY 2026-27): New Tax Regime and Old Regime Rates, Senior Citizen Slabs, Worked Examples
          </h1>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '32px 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 48, alignItems: 'start' }}>

          {/* Article */}
          <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER, minWidth: 0 }}>
            <p className="article-lead" itemProp="description" style={{ ...pStyle, fontSize: 16.5 }}>
              Income tax slabs for FY 2025-26 (Assessment Year 2026-27) set the rate at which each rupee of your income is taxed. Under the new tax regime, income up to ₹12 lakh is effectively tax-free through the Section 87A rebate. For a salaried person, ₹12.75 lakh gross salary results in zero tax after the ₹75,000 standard deduction. This guide covers both regimes, worked examples at every income level, surcharge rates, senior citizen slabs, and a direct comparison of when each regime saves more.
            </p>

            {/* SECTION 1 */}
            <h2 id="what-is" style={hStyle}>What are Income Tax Slabs?</h2>
            <p style={pStyle}>
              Income tax slabs are the income ranges defined by the Income Tax Act, each taxed at a different rate. India uses a progressive tax system: the first portion of income is tax-free, and higher portions attract higher rates. Only the income within each bracket is taxed at that bracket&apos;s rate, not your total income. There are two parallel slab systems for FY 2025-26: the new tax regime (default from FY 2023-24) and the old tax regime (optional, requires explicit selection at the time of filing).
            </p>

            {/* SECTION 2 */}
            <h2 id="new-regime-slabs" style={hStyle}>New Tax Regime Slabs for FY 2025-26 (AY 2026-27)</h2>
            <p style={pStyle}>
              The new tax regime for FY 2025-26 has seven slabs, revised in Union Budget 2025 to make income up to ₹12 lakh effectively tax-free. This is the default regime for all taxpayers; you must actively opt out if you prefer the old regime. The <a href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Income Tax Department&apos;s slab reference for salaried individuals, AY 2026-27</a> lists these same rates.
            </p>
            <TaxTable
              caption="New Tax Regime: Income Tax Slabs for FY 2025-26"
              headers={['Taxable Income Slab', 'Tax Rate', 'Tax on Slab (approx.)']}
              rows={[
                ['Up to ₹4 lakh', '0%', '₹0'],
                ['₹4 lakh to ₹8 lakh', '5%', '₹20,000'],
                ['₹8 lakh to ₹12 lakh', '10%', '₹40,000'],
                ['₹12 lakh to ₹16 lakh', '15%', '₹60,000'],
                ['₹16 lakh to ₹20 lakh', '20%', '₹80,000'],
                ['₹20 lakh to ₹24 lakh', '25%', '₹1,00,000'],
                ['Above ₹24 lakh', '30%', 'On the excess'],
              ]}
            />
            <p style={pStyle}>
              Key features of the new tax regime: standard deduction of ₹75,000 for salaried individuals, Section 87A rebate of up to ₹60,000 for taxable income up to ₹12 lakh, and no deductions under Chapter VI-A (80C, 80D, HRA, etc.). The maximum surcharge under the new regime is capped at 25%.
            </p>

            {/* SECTION 3 */}
            <h2 id="old-regime-slabs" style={hStyle}>Old Tax Regime Slabs for FY 2025-26 (AY 2026-27)</h2>
            <p style={pStyle}>
              The old tax regime has three slabs and remains unchanged from prior years. It is only beneficial if you can claim large deductions (HRA, 80C, 80D, NPS, etc.) that significantly reduce your taxable income. TRACES, the TDS reconciliation portal run by the Income Tax Department, publishes the same <a href="https://traces61contents.tdscpc.gov.in/en/personal-income-tax.html" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>personal income tax slab rates</a> for FY 2025-26.
            </p>
            <TaxTable
              caption="Old Tax Regime: Income Tax Slabs for FY 2025-26"
              headers={['Taxable Income Slab', 'Tax Rate', 'Tax on Slab (approx.)']}
              rows={[
                ['Up to ₹2.5 lakh', '0%', '₹0'],
                ['₹2.5 lakh to ₹5 lakh', '5%', '₹12,500'],
                ['₹5 lakh to ₹10 lakh', '20%', '₹1,00,000'],
                ['Above ₹10 lakh', '30%', 'On the excess'],
              ]}
            />
            <p style={pStyle}>
              Under the old regime, you can claim deductions including Section 80C (up to ₹1.5 lakh), Section 80D (health insurance), <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>HRA exemption</Link>, <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>NPS contribution (80CCD(1B), up to ₹50,000)</Link>, standard deduction (₹50,000), home loan interest, and more. These reduce taxable income before applying slab rates.
            </p>

            {/* SECTION 4 */}
            <h2 id="87a-rebate" style={hStyle}>Section 87A Rebate: Who Gets Zero Tax and How</h2>
            <p style={pStyle}>
              Section 87A provides a direct rebate on your computed income tax, reducing it to zero if your taxable income is within the specified limit.
            </p>
            <TaxTable
              caption="Section 87A Rebate: New Regime vs Old Regime for FY 2025-26"
              headers={['Parameter', 'New Tax Regime', 'Old Tax Regime']}
              rows={[
                ['Taxable income limit for rebate', '₹12,00,000', '₹5,00,000'],
                ['Maximum rebate amount', '₹60,000', '₹12,500'],
                ['Effective salary for zero tax (salaried)', '₹12,75,000 gross', '₹5,50,000 gross (no other deductions)'],
                ['Tax on income at the limit', '₹60,000 (fully rebated)', '₹12,500 (fully rebated)'],
              ]}
            />
            <p style={pStyle}>
              Important: the 87A rebate is an all-or-nothing threshold. If taxable income exceeds the limit by even ₹1, the rebate is lost entirely. At ₹12.01 lakh taxable income under the new regime, tax jumps from ₹0 to approximately ₹60,750 (before marginal relief). This is where marginal relief becomes critical.
            </p>

            {/* SECTION 5 */}
            <h2 id="marginal-relief" style={hStyle}>Marginal Relief: How It Prevents Disproportionate Tax</h2>
            <p style={pStyle}>
              Marginal relief under the new regime ensures that when taxable income crosses ₹12 lakh, the additional tax payable does not exceed the additional income earned beyond ₹12 lakh. This applies at three thresholds: the ₹12L rebate limit and the ₹50L/₹1Cr surcharge thresholds.
            </p>
            <TaxTable
              caption="Marginal Relief Example: New Regime (FY 2025-26)"
              headers={['Taxable Income', 'Tax Without Relief', 'Incremental Income Over ₹12L', 'Tax After Marginal Relief']}
              rows={[
                ['₹12,00,000', '₹0 (rebate applied)', 'N/A', '₹0'],
                ['₹12,10,000', '₹67,600 (incl. cess)', '₹10,000', '₹10,400 (₹10,000 + 4% cess)'],
                ['₹12,25,000', '₹69,940 (incl. cess)', '₹25,000', '₹26,000 (₹25,000 + 4% cess)'],
                ['₹12,50,000', '₹73,840 (incl. cess)', '₹50,000', '₹52,000 (₹50,000 + 4% cess)'],
                ['₹12,75,000', '₹77,740 (incl. cess)', '₹75,000', '₹78,000 (₹75,000 + 4% cess)'],
              ]}
            />
            <p style={pStyle}>
              At around ₹12.75 lakh taxable income, the marginal relief and the normal tax calculation converge, and marginal relief no longer applies above that point.
            </p>

            {/* SECTION 6 */}
            <h2 id="standard-deduction" style={hStyle}>Standard Deduction for FY 2025-26: New and Old Regime</h2>
            <p style={pStyle}>
              The standard deduction is a flat deduction from gross salary before computing taxable income, available to all salaried employees and pensioners without any proof of expenditure.
            </p>
            <TaxTable
              caption="Standard Deduction Comparison for FY 2025-26"
              headers={['Regime', 'Standard Deduction', 'Who Gets It', 'Effective Tax-Free Salary (with 87A)']}
              rows={[
                ['New Tax Regime', '₹75,000', 'All salaried individuals and pensioners', '₹12,75,000 gross salary'],
                ['Old Tax Regime', '₹50,000', 'All salaried individuals and pensioners', '₹5,50,000 gross salary (no other deductions)'],
              ]}
            />
            <p style={pStyle}>
              The standard deduction under the new regime was increased from ₹50,000 to ₹75,000 in Budget 2024, and remains at ₹75,000 for FY 2025-26. This increase, combined with the revised slabs, is what makes ₹12.75 lakh salary completely tax-free.
            </p>

            {/* SECTION 7 */}
            <h2 id="zero-tax-working" style={hStyle}>How ₹12.75 Lakh Salary Becomes Tax-Free: Step-by-Step</h2>
            <p style={pStyle}>
              The zero-tax outcome at ₹12.75 lakh works because of three things together: revised slabs, higher standard deduction, and the 87A rebate. Here is the exact working:
            </p>
            <TaxTable
              caption="Tax Calculation for ₹12.75 Lakh Gross Salary (New Regime, FY 2025-26)"
              headers={['Step', 'Amount']}
              rows={[
                ['Gross Salary', '₹12,75,000'],
                ['Less: Standard Deduction (New Regime)', '₹75,000'],
                ['Taxable Income', '₹12,00,000'],
                ['Tax on ₹0 to ₹4L @ 0%', '₹0'],
                ['Tax on ₹4L to ₹8L @ 5%', '₹20,000'],
                ['Tax on ₹8L to ₹12L @ 10%', '₹40,000'],
                ['Total Tax Before Rebate', '₹60,000'],
                ['Less: Section 87A Rebate (taxable ≤ ₹12L)', '₹60,000'],
                ['Tax After Rebate', '₹0'],
                ['Health and Education Cess @ 4%', '₹0'],
              ]}
              highlightLast
            />
            <p style={pStyle}>
              A gross salary of ₹12,75,001 means taxable income becomes ₹12,00,001, which exceeds the ₹12L rebate limit by ₹1. The full ₹60,000 rebate is lost. However, marginal relief applies: the tax payable is capped at ₹1 (the incremental income), not the full ₹60,750.
            </p>

            <CalcCTA
              href="/calculators/income-tax-calculator"
              label="Income Tax Calculator for FY 2025-26"
              note="Enter your salary and deductions to compute your exact tax liability under both regimes."
            />

            {/* SECTION 8 */}
            <h2 id="surcharge-cess" style={hStyle}>Surcharge and Health and Education Cess for FY 2025-26</h2>
            <p style={pStyle}>
              Surcharge is an additional tax levied on income above ₹50 lakh. It is calculated on the base income tax (before cess). Health and Education Cess of 4% is then charged on the combined total of income tax plus surcharge.
            </p>
            <TaxTable
              caption="Surcharge Rates for FY 2025-26: New Regime vs Old Regime"
              headers={['Total Income', 'Surcharge Rate (New Regime)', 'Surcharge Rate (Old Regime)']}
              rows={[
                ['Up to ₹50 lakh', 'Nil', 'Nil'],
                ['₹50 lakh to ₹1 crore', '10%', '10%'],
                ['₹1 crore to ₹2 crore', '15%', '15%'],
                ['₹2 crore to ₹5 crore', '25%', '25%'],
                ['Above ₹5 crore', '25% (capped)', '37%'],
              ]}
            />
            <p style={pStyle}>
              The key difference: under the new regime, surcharge is capped at 25% for all income levels. Under the old regime, income above ₹5 crore attracts 37% surcharge, making the effective tax rate up to 42.74% (30% + 37% surcharge + 4% cess). This makes the new regime significantly better for very high earners.
            </p>

            {/* SECTION 9 */}
            <h2 id="senior-citizen-slabs" style={hStyle}>Income Tax Slabs for Senior Citizens and Super Senior Citizens FY 2025-26</h2>
            <p style={pStyle}>
              Senior citizen tax benefits apply only under the old tax regime. Under the new tax regime, the same slabs apply to all individuals regardless of age.
            </p>
            <h3 style={h3Style}>Senior Citizens (60 to 79 Years): Old Regime Only</h3>
            <TaxTable
              caption="Senior Citizen Tax Slabs FY 2025-26 (60 to 79 years, Old Regime)"
              headers={['Taxable Income Slab', 'Tax Rate']}
              rows={[
                ['Up to ₹3 lakh', '0%'],
                ['₹3 lakh to ₹5 lakh', '5%'],
                ['₹5 lakh to ₹10 lakh', '20%'],
                ['Above ₹10 lakh', '30%'],
              ]}
            />
            <h3 style={h3Style}>Super Senior Citizens (80 Years and Above): Old Regime Only</h3>
            <TaxTable
              caption="Super Senior Citizen Tax Slabs FY 2025-26 (80+ years, Old Regime)"
              headers={['Taxable Income Slab', 'Tax Rate']}
              rows={[
                ['Up to ₹5 lakh', '0%'],
                ['₹5 lakh to ₹10 lakh', '20%'],
                ['Above ₹10 lakh', '30%'],
              ]}
            />
            <p style={pStyle}>
              Senior and super senior citizens are not required to pay advance tax (under Section 207) if they have no business income. They are also not required to file ITR if their total income is below the basic exemption limit.
            </p>

            {/* SECTION 10 */}
            <h2 id="budget-2026" style={hStyle}>Budget 2026: Are Tax Slabs Changing for FY 2026-27?</h2>
            <p style={pStyle}>
              Union Budget 2026, presented on February 1, 2026, did not announce changes to the income tax slab structure. The new tax regime slabs introduced in Budget 2025 remain unchanged for FY 2026-27 (AY 2027-28): 0% up to ₹4 lakh, 5% on ₹4-8 lakh, 10% on ₹8-12 lakh, and the same structure through to 30% above ₹24 lakh. The Section 87A rebate limit of ₹12 lakh and the standard deduction of ₹75,000 also remain unchanged.
            </p>

            {/* SECTION 11 */}
            <h2 id="regime-comparison" style={hStyle}>New Regime vs Old Regime: Which Saves More for You?</h2>
            <p style={pStyle}>
              The new regime is better for most taxpayers, especially those with few deductions. The old regime is only advantageous when total eligible deductions are very high. Here is a framework:
            </p>
            <TaxTable
              caption="Old Regime vs New Regime: Feature Comparison"
              headers={['Feature', 'New Regime', 'Old Regime']}
              rows={[
                ['Default regime', 'Yes (from FY 2023-24)', 'No (opt-in required)'],
                ['Standard deduction', '₹75,000', '₹50,000'],
                ['Basic exemption limit', '₹4 lakh', '₹2.5 lakh'],
                ['Section 87A rebate limit', '₹12 lakh taxable', '₹5 lakh taxable'],
                ['Chapter VI-A deductions (80C, 80D, etc.)', 'Not allowed', 'Allowed'],
                ['HRA exemption', 'Not allowed', 'Allowed'],
                ['Home loan interest (self-occupied)', 'Not allowed', 'Up to ₹2 lakh'],
                ['NPS employer contribution (80CCD(2))', 'Allowed (14% of salary)', 'Allowed (10% of salary)'],
                ['Maximum surcharge', '25%', '37%'],
                ['Best for', 'Most salaried taxpayers', 'High-deduction taxpayers'],
              ]}
            />
            <p style={pStyle}>
              The break-even deduction amount (where old regime becomes equal to new regime) depends on your income level. Approximate deduction amounts needed for the old regime to match the new regime:
            </p>
            <TaxTable
              caption="Approximate Deductions Needed for Old Regime to Match New Regime"
              headers={['Gross Salary', 'New Regime Tax', 'Old Regime Tax (no deductions)', 'Additional Deductions Needed to Match New Regime']}
              rows={[
                ['₹8 lakh', '₹0', '₹65,000', 'Old regime cannot match (need ₹3.5L+ deductions for zero tax)'],
                ['₹10 lakh', '₹0', '₹1,06,600', 'Need deductions over ₹4.5L for zero tax; not feasible for most'],
                ['₹12 lakh', '₹0', '₹1,63,800', 'Need deductions over ₹7L; old regime cannot win'],
                ['₹15 lakh', '₹97,500', '₹2,57,400', 'Need ~₹5.5L in additional deductions beyond standard deduction'],
                ['₹20 lakh', '₹1,92,400', '₹4,13,400', 'Need ~₹7L+ in additional deductions; rarely achievable'],
                ['₹25 lakh', '₹3,18,500', '₹5,69,400', 'Need ~₹8L+ in additional deductions; rarely achievable'],
              ]}
            />

            <CalcCTA
              href="/calculators/old-vs-new-tax-regime-calculator"
              label="Old vs New Regime Calculator"
              note="Enter your deductions and compare exact tax liability under both regimes side by side."
            />

            {/* SECTION 12 */}
            <h2 id="income-comparison" style={hStyle}>Tax at Every Income Level: Old Regime vs New Regime Comparison</h2>
            <p style={pStyle}>
              The table below shows tax under both regimes for common salary levels, with standard deduction applied and no additional deductions under old regime. Salaried employees with HRA or 80C claims will have lower old regime tax.
            </p>
            <TaxTable
              caption="Income-Wise Tax Comparison: New Regime vs Old Regime (FY 2025-26, Salaried, No Additional Deductions)"
              headers={['Gross Salary', 'New Regime Tax', 'Old Regime Tax', 'New Regime Saving']}
              rows={[
                ['₹5 lakh', '₹0', '₹12,500', '₹12,500'],
                ['₹7 lakh', '₹0', '₹52,000', '₹52,000'],
                ['₹8 lakh', '₹0', '₹65,000', '₹65,000'],
                ['₹10 lakh', '₹0', '₹1,06,600', '₹1,06,600'],
                ['₹12 lakh', '₹0', '₹1,51,360', '₹1,51,360'],
                ['₹15 lakh', '₹97,500', '₹2,57,400', '₹1,59,900'],
                ['₹20 lakh', '₹1,92,400', '₹4,13,400', '₹2,21,000'],
                ['₹25 lakh', '₹3,18,500', '₹5,69,400', '₹2,50,900'],
                ['₹30 lakh', '₹4,75,800', '₹7,25,400', '₹2,49,600'],
                ['₹50 lakh', '₹10,99,800', '₹13,49,400', '₹2,49,600'],
              ]}
              highlightLast={false}
            />

            {/* SECTION 13 */}
            <h2 id="how-to-calculate" style={hStyle}>How to Calculate Income Tax for FY 2025-26: Step by Step</h2>
            <p style={pStyle}>
              Calculating your income tax for FY 2025-26 follows eight steps. The process is the same for both regimes, with different numbers applied at each step.
            </p>
            <div style={{ marginBottom: 20 }}>
              {[
                { title: 'Calculate Gross Total Income', text: 'Add all income: salary or business income, house property income, capital gains, and other sources.' },
                { title: 'Subtract Standard Deduction', text: 'Deduct ₹75,000 (new regime) or ₹50,000 (old regime) if you are salaried or a pensioner.' },
                { title: 'Apply Chapter VI-A Deductions (Old Regime Only)', text: 'Under old regime, subtract 80C (up to ₹1.5L), 80D, HRA exemption, 80CCD(1B) NPS (₹50,000), 80TTA, and other applicable deductions.' },
                { title: 'Arrive at Taxable Income', text: 'Taxable Income = Gross Total Income minus all applicable deductions.' },
                { title: 'Apply Slab Rates Progressively', text: 'Apply each slab rate only to the income within that bracket. Sum up to arrive at total income tax before rebate.' },
                { title: 'Apply Section 87A Rebate', text: 'If taxable income is within the limit (₹12L new regime, ₹5L old regime), subtract the rebate to reduce tax to zero.' },
                { title: 'Add Surcharge if Income Exceeds ₹50 Lakh', text: 'If total income exceeds ₹50 lakh, compute surcharge on the base income tax at the applicable rate.' },
                { title: 'Add 4% Health and Education Cess', text: 'Multiply (income tax + surcharge) by 1.04 to get your final tax liability for the year.' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</div>
                  <div style={{ paddingTop: 3 }}>
                    <p style={{ fontFamily: INTER, fontSize: 15, fontWeight: 600, color: C.dark, margin: '0 0 3px', lineHeight: 1.3 }}>{step.title}</p>
                    <p style={{ fontFamily: INTER, fontSize: 14.5, color: C.ink2, margin: 0, lineHeight: 1.65 }}>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SECTION 14 */}
            <h2 id="worked-examples" style={hStyle}>Income Tax Calculation: Worked Examples for FY 2025-26</h2>

            <h3 style={h3Style}>Example 1: Ms. Priya, ₹12.75 Lakh Salary (New Regime)</h3>
            <TaxTable
              caption="Tax Calculation: ₹12.75L Salary, New Regime, FY 2025-26"
              headers={['Item', 'Amount']}
              rows={[
                ['Gross Salary', '₹12,75,000'],
                ['Less: Standard Deduction', '₹75,000'],
                ['Taxable Income', '₹12,00,000'],
                ['Tax: ₹0 to ₹4L @ 0%', '₹0'],
                ['Tax: ₹4L to ₹8L @ 5%', '₹20,000'],
                ['Tax: ₹8L to ₹12L @ 10%', '₹40,000'],
                ['Tax Before Rebate', '₹60,000'],
                ['Less: Section 87A Rebate', '₹60,000'],
                ['Tax After Rebate', '₹0'],
                ['Health and Education Cess @ 4%', '₹0'],
              ]}
              highlightLast
            />

            <h3 style={h3Style}>Example 2: Mr. Arjun, ₹25 Lakh Salary, Comparing Both Regimes</h3>
            <TaxTable
              caption="Tax Calculation: ₹25L Salary, Both Regimes Compared, FY 2025-26"
              headers={['Item', 'New Regime', 'Old Regime (with deductions)']}
              rows={[
                ['Gross Salary', '₹25,00,000', '₹25,00,000'],
                ['Standard Deduction', '₹75,000', '₹50,000'],
                ['Section 80C', 'Not applicable', '₹1,50,000'],
                ['NPS 80CCD(1B)', 'Not applicable', '₹50,000'],
                ['Medical Insurance 80D', 'Not applicable', '₹25,000'],
                ['Taxable Income', '₹24,25,000', '₹22,25,000'],
                ['Tax on Slab', '₹3,06,250', '₹4,80,000'],
                ['Health and Education Cess @ 4%', '₹12,250', '₹19,200'],
              ]}
              highlightLast={false}
            />
            <TaxTable
              caption="Net Tax Comparison: Mr. Arjun, ₹25 Lakh Salary"
              headers={['Regime', 'Total Tax Payable', 'Savings vs Other Regime']}
              rows={[
                ['New Regime', '₹3,18,500', '₹1,80,700 more savings'],
                ['Old Regime (with deductions)', '₹4,99,200', 'Pays ₹1,80,700 more'],
              ]}
              highlightLast={false}
            />
            <p style={pStyle}>
              Even with ₹2.25 lakh in Chapter VI-A deductions, the new regime saves Mr. Arjun ₹1,80,700. He would need approximately ₹8 lakh in total deductions for the old regime to match the new regime at ₹25 lakh income.
            </p>

            {/* SECTION 15 */}
            <h2 id="slab-history" style={hStyle}>How Tax Slabs Have Changed: FY 2023-24, FY 2024-25, and FY 2025-26</h2>
            <p style={pStyle}>
              The new tax regime slabs have been revised in each budget to make lower and middle incomes progressively tax-free. The old tax regime slabs have not changed in over a decade.
            </p>
            <TaxTable
              caption="New Tax Regime Slab History: FY 2023-24 to FY 2025-26"
              headers={['Income Slab', 'FY 2023-24 Rate', 'FY 2024-25 Rate', 'FY 2025-26 Rate']}
              rows={[
                ['Up to ₹3 lakh', '0%', '0%', '(slab boundary changed in FY 2025-26)'],
                ['Up to ₹4 lakh', 'N/A', 'N/A', '0%'],
                ['₹3-6L / ₹3-7L / ₹4-8L', '5%', '5%', '5%'],
                ['₹6-9L / ₹7-10L / ₹8-12L', '10%', '10%', '10%'],
                ['₹9-12L / ₹10-12L / ₹12-16L', '15%', '15%', '15%'],
                ['₹12-15L / ₹12-15L / ₹16-20L', '20%', '20%', '20%'],
                ['₹15L+ / ₹15L+ / ₹20-24L', '30%', '30%', '25%'],
                ['Above ₹24L', 'N/A', 'N/A', '30%'],
                ['87A rebate limit', '₹7L (old: ₹5L)', '₹7L (old: ₹5L)', '₹12L (old: ₹5L)'],
                ['Standard deduction', '₹50K (new)', '₹75K (new), ₹50K (old)', '₹75K (new), ₹50K (old)'],
              ]}
            />

            {/* SECTION 16 */}
            <h2 id="special-rates" style={hStyle}>Special Tax Rates for FY 2025-26: Capital Gains, Crypto, and Lottery</h2>
            <p style={pStyle}>
              Some income types are taxed at special flat rates regardless of your income slab, under both the new and old tax regimes.
            </p>
            <TaxTable
              caption="Special Income Tax Rates for FY 2025-26"
              headers={['Income Type', 'Section', 'Tax Rate', 'Note']}
              rows={[
                ['STCG on listed equity and equity mutual funds', '111A', '20%', 'Applicable when STT is paid; increased from 15% in Budget 2024'],
                ['LTCG on listed equity and equity mutual funds', '112A', '12.5%', 'On gains above ₹1.25 lakh; no indexation benefit'],
                ['LTCG on other assets (debt funds, property, gold)', '112', '12.5%', 'Without indexation; effective from July 23, 2024'],
                ['Lottery, game shows, horse racing', '115BB', '30%', 'No deductions allowed; flat rate plus cess'],
                ['Virtual Digital Assets (crypto, NFTs)', '115BBH', '30%', 'Only cost of acquisition deductible; losses cannot be set off'],
                ['Anonymous donations to charitable trust', '115BBC', '30%', 'On the anonymous donation amount'],
              ]}
            />
            <div style={{ borderLeft: '3px solid #CCCCCC', background: '#FAFAFA', borderRadius: 4, padding: '12px 16px', marginBottom: 20 }}>
              <p style={{ fontFamily: INTER, fontSize: 14, color: C.ink2, margin: 0, lineHeight: 1.65 }}>
                <strong>Note on LTCG indexation:</strong> Budget 2024 removed the indexation benefit on LTCG for debt mutual funds, property, and gold (sold on or after July 23, 2024). The new rate is 12.5% without indexation. For property sold before July 23, 2024, the old rate of 20% with indexation applied.
              </p>
            </div>
            <p style={pStyle}>
              Use the <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dg, textDecoration: 'underline', textUnderlineOffset: 3 }}>Capital Gains Tax Calculator</Link> to estimate your exact STCG or LTCG liability on shares, mutual funds, property, or gold for FY 2025-26.
            </p>

            {/* SECTION 17 */}
            <h2 id="women-nri-huf" style={hStyle}>Income Tax Slabs for Women, NRIs, and HUFs in FY 2025-26</h2>
            <h3 style={h3Style}>Women Taxpayers</h3>
            <p style={pStyle}>
              Women below 60 years pay the same income tax slabs as male taxpayers for FY 2025-26. There are no separate, lower tax slabs for women. The differential treatment for women (which gave them a higher basic exemption) existed only until FY 2010-11 and was abolished in FY 2011-12.
            </p>
            <h3 style={h3Style}>Non-Resident Indians (NRIs)</h3>
            <BulletList items={[
              'NRIs can only use the old tax regime; the new tax regime is not available to them.',
              'Under old regime: 0% up to ₹2.5 lakh, 5% on ₹2.5-5L, 20% on ₹5-10L, 30% above ₹10L.',
              'NRIs are not eligible for the Section 87A rebate under either regime.',
              'NRI income taxable in India includes: salary for services rendered in India, house property income in India, capital gains on assets in India.',
              'NRO account interest is fully taxable. Interest on NRE and FCNR accounts is tax-exempt for NRIs.',
              'TDS applies at source for most NRI income streams before the NRI receives funds.',
            ]} />
            <h3 style={h3Style}>Hindu Undivided Families (HUFs)</h3>
            <p style={pStyle}>
              HUFs are taxed at the same slab rates as individual taxpayers (not at senior citizen or super senior citizen slabs). HUFs can choose between new and old tax regimes. Under the new regime, basic exemption is ₹4 lakh. Under old regime, basic exemption is ₹2.5 lakh. HUFs are eligible for the Section 87A rebate under both regimes (new: taxable ≤ ₹12L, old: taxable ≤ ₹5L).
            </p>

            {/* SECTION 18: FAQ */}
            <h2 id="faq" style={hStyle}>Frequently Asked Questions: Income Tax Slabs FY 2025-26</h2>
            <FaqAccordion items={faqItems} />


            <Disclaimer />
          </article>

          {/* Sidebar */}
          <aside
            className="tax-slabs-sidebar"
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
            {/* Tax Quick Reference */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 20px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>FY 2025-26 Quick Reference</div>
              {([
                ['Standard Deduction (New)', '₹75,000'],
                ['Standard Deduction (Old)', '₹50,000'],
                ['87A Rebate Limit (New)', '₹12L taxable income'],
                ['87A Rebate Limit (Old)', '₹5L taxable income'],
                ['Max Rebate (New)', '₹60,000'],
                ['Basic Exemption (New)', '₹4 lakh'],
                ['Basic Exemption (Old)', '₹2.5 lakh'],
                ['Cess on Tax', '4%'],
                ['Surcharge Starts From', '₹50 lakh income'],
                ['Max Surcharge (New)', '25%'],
                ['Max Surcharge (Old)', '37%'],
                ['Tax-Free Salary (New)', '₹12.75 lakh gross'],
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
              <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Income Tax Calculator</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
              <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>Old vs New Regime</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
              <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none', marginBottom: 8 }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>In-Hand Salary</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
              <Link href="/calculators/ctc-calculator" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'rgba(16,18,20,0.05)', borderRadius: 8, textDecoration: 'none' }}>
                <span style={{ fontFamily: INTER, fontSize: 13, fontWeight: 600, color: '#101214' }}>CTC to Take-Home</span>
                <span style={{ color: '#7A8087', fontSize: 16 }}>›</span>
              </Link>
            </div>
            </nav>

            {/* Key Dates */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px', marginBottom: 20 }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>ITR Deadlines AY 2026-27</div>
              {([
                ['July 31, 2026', 'Salaried individuals'],
                ['October 31, 2026', 'Audit cases and companies'],
                ['November 30, 2026', 'Transfer pricing cases'],
                ['December 31, 2026', 'Belated ITR filing'],
              ] as [string, string][]).map(([date, label], i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, fontWeight: 700, color: C.dg, minWidth: 90, flexShrink: 0 }}>{date}</span>
                  <span style={{ fontFamily: INTER, fontSize: 12.5, color: C.ink2 }}>{label}</span>
                </div>
              ))}
              <div style={{ marginTop: 12 }}>
                <Link href="/blogs/itr-filing-last-date" target="_blank" rel="noopener noreferrer" style={{ fontFamily: INTER, fontSize: 12.5, color: C.dg, fontWeight: 600, textDecoration: 'none' }}>
                  Full ITR deadline guide ›
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <div style={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 18px' }}>
              <div style={{ fontFamily: INTER, fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: C.dg, marginBottom: 14 }}>Related Articles</div>
              {([
                ['/blogs/old-vs-new-tax-regime', 'Old vs New Tax Regime: Which Is Better for You'],
                ['/blogs/itr-filing-last-date', 'ITR Filing Last Date FY 2025-26: Every Deadline You Need to Know'],
                ['/blogs/tds-rate-chart', 'TDS Rate Chart FY 2026-27: Every Section and Rate'],
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
        .tax-slabs-sidebar::-webkit-scrollbar { width: 5px; }
        .tax-slabs-sidebar::-webkit-scrollbar-track { background: transparent; }
        .tax-slabs-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .tax-slabs-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
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

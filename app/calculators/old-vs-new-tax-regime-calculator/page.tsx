import type { Metadata } from 'next';
import OldVsNewTaxRegimeClient from './OldVsNewTaxRegimeClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/old-vs-new-tax-regime-calculator`;
  return {
    title: 'Old vs New Tax Regime Calculator: Compare Tax Liability FY 2026-27',
    description:
      'Free old vs new tax regime calculator for India. Compare tax under the old regime (with deductions) and new regime (lower rates) for FY 2026-27, plus the exact breakeven deduction by income. Free to use.',
    keywords: [
      'old vs new tax regime calculator',
      'tax regime comparison calculator',
      'old tax regime calculator',
      'new tax regime calculator',
      'income tax slabs 2026-27',
      'section 87A rebate',
      'Form 10-IEA',
      'tax deduction comparison',
      'which tax regime is better',
      'old regime vs new regime',
      'tax liability calculator',
      'income tax calculator india',
      'new tax regime slab',
      'old tax regime slab',
      'tax saving calculator old vs new regime',
      'standard deduction new regime',
      '80C deduction tax regime',
      'HRA old regime',
      'home loan interest tax',
      'salary tax calculator old vs new regime',
      'nri tax regime india',
      'tax regime comparison fy26',
      'income tax old vs new',
      'tax planning 2026',
      'excel tax regime calculator',
      'breakeven deduction tax regime',
      'which regime is best for tax saving',
      'income tax india calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Old vs New Tax Regime Calculator: Compare Tax Liability FY 2026-27',
      description:
        'Compare your income tax under old and new regimes for FY 2026-27, plus the exact breakeven deduction level for your income. Free to use.',
      images: ['https://fermor.in/og-old-vs-new-tax-regime-calculator.png'],
    },
    openGraph: {
      title: 'Old vs New Tax Regime Calculator: Compare Tax Liability for FY 2026-27 - Fermor',
      description:
        'Compare your income tax under the old regime (with deductions under 80C, 80D, HRA, home loan) and the new regime (lower rates, standard deduction of 75,000). See the exact breakeven deduction by income. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/old-vs-new-tax-regime-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-old-vs-new-tax-regime-calculator.png', width: 1200, height: 630, alt: 'Fermor Old vs New Tax Regime Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-19';
const PAGE_DATE_PUBLISHED = '2026-06-10';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 200,
    height: 60,
  },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Income Tax India',
    'Old vs New Tax Regime',
    'Personal Finance India',
    'Tax Planning India',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Account Aggregator Framework',
    'HRA Exemption',
    'Section 80C Investments',
    'NRI Taxation',
    'Form 10-IEA',
    'Section 87A Rebate',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Old vs New Tax Regime Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/old-vs-new-tax-regime-calculator',
  description: 'Compare your income tax under the old regime (with deductions under 80C, 80D, HRA, home loan interest) and the new regime (lower rates with standard deduction of 75,000) for FY 2026-27. Free, browser-based.',
  featureList: [
    'Old regime tax calculation with deductions',
    'New regime tax calculation with lower rates',
    'Side-by-side tax comparison',
    'Section 87A rebate auto-application',
    'Quick income presets',
    'Take-home vs tax donut chart',
    'Breakeven deduction reference by income level',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Breakdown of taxable income components',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Old vs New Tax Regime Calculator', item: 'https://fermor.in/calculators/old-vs-new-tax-regime-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Old vs New Tax Regime',
  description: 'Step-by-step guide to compare income tax liability under the old and new tax regimes for FY 2026-27.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Old vs New Tax Regime Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your annual income',
      text: 'Enter your gross total income from salary for the financial year. This includes basic pay, allowances, bonuses, and any other taxable income.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add your Section 80C deductions',
      text: 'Enter your total investments under Section 80C: PPF, ELSS, EPF, life insurance premiums, tax-saving FDs, and other qualifying investments. Maximum deduction is Rs 1.5 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter other deductions',
      text: 'Add Section 80D health insurance premiums, HRA exemption amount, home loan interest under Section 24(b), and any other eligible deductions.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Compare the results',
      text: 'The calculator shows your tax liability under both regimes side by side, including the taxable income, tax before cess, cess amount, and total tax payable. The regime that saves you more is highlighted.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Check the breakeven deduction level',
      text: 'Compare your total deductions against the breakeven deduction table for your income level to see how close you are to the point where the other regime would win instead.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Old vs New Tax Regime',
  alternateName: 'Income Tax Regime Comparison',
  description: 'The two parallel income tax systems in India where the old regime offers higher rates with deductions and exemptions, and the new regime offers lower rates with minimal deductions.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Income_tax_in_India',
    'https://www.wikidata.org/wiki/Q6016781',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Old vs New Tax Regime Calculator: Compare Tax Liability FY 2026-27',
  description: 'Compare your income tax under the old regime (with deductions under 80C, 80D, HRA, home loan interest) and the new regime (lower rates with standard deduction of 75,000). Find which tax regime saves you more.',
  url: 'https://fermor.in/calculators/old-vs-new-tax-regime-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Old vs New Tax Regime', alternateName: 'Income Tax Regime Comparison' },
    { '@type': 'DefinedTerm', name: 'Section 87A' },
    { '@type': 'DefinedTerm', name: 'Section 80C' },
    { '@type': 'DefinedTerm', name: 'Breakeven Deduction Level' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, NRI taxpayers, tax professionals, individual taxpayers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-tax-regime',              name: 'What Is Old vs New Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-timeline',              name: "Timeline: How India's Tax Regimes Have Evolved" },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-comparison',            name: 'Old vs New Tax Regime Comparison Table' },
    { '@type': 'WebPageElement', cssSelector: '#which-regime-saves-more',          name: 'Which Tax Regime Saves More' },
    { '@type': 'WebPageElement', cssSelector: '#breakeven',                        name: 'Breakeven Deductions by Income' },
    { '@type': 'WebPageElement', cssSelector: '#tax-by-income-level',              name: 'New vs Old Regime Tax by Income Level' },
    { '@type': 'WebPageElement', cssSelector: '#when-old-regime-wins',             name: 'When to Choose the Old Regime vs the New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#max-deductions-case-study',        name: 'Case Study: Maximizing Deductions Under the Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-formula',               name: 'Old Regime Tax Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-formula',               name: 'New Regime Tax Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#section-87a-rebate',               name: 'Section 87A Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-comparison',             name: 'Surcharge on High Income: Old vs New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#how-switch-between-regimes',       name: 'How to Switch Between Tax Regimes' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-business-income',       name: 'Tax Regime for Freelancers and Business Owners' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-deductions',            name: 'Key Deductions Under Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#capital-gains-regime',             name: 'Capital Gains and Special-Rate Income' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-senior-citizens',       name: 'Tax Regime for Senior Citizens' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-for-nri',               name: 'Tax Regime for NRI Taxpayers' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes',                  name: 'Common Mistakes When Choosing a Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-limitations',           name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',                    name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                       name: 'How to Use This Tax Regime Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-glossary',              name: 'Tax Regime Glossary: Key Terms Explained' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                              name: 'Frequently Asked Questions' },
  ],
};

export default async function OldVsNewTaxRegimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <OldVsNewTaxRegimeClient />
    </>
  );
}

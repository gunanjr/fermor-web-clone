import type { Metadata } from 'next';
import PerformanceBonusClient from './PerformanceBonusClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/performance-bonus-tax-calculator`;
  return {
    title: 'Performance Bonus Tax Calculator: Net Bonus In-Hand India',
    description:
      'Free performance bonus tax calculator for India. See how much tax is deducted on your bonus, your net bonus in-hand, and effective tax rate. Supports old and new regime. Free to use.',
    keywords: [
      'bonus tax calculator',
      'performance bonus tax calculator',
      'bonus payment tax calculator',
      'bonus tax india',
      'tax on salary bonus calculator',
      'bonus and tax calculator',
      'bonus salary calculator',
      'bonus tax estimator',
      'bonus tax rates',
      'calculate tax on bonus india',
      'joining bonus tax calculator',
      'annual bonus tax calculator',
      'income tax calculator for bonus',
      'bonus net pay calculator',
      'tax calculator for bonus',
      'how much tax on bonus india',
      'net bonus calculator india',
      'bonus take home calculator',
      'tax on performance bonus india',
      'bonus income tax india',
      'effective tax rate bonus india',
      'bonus deduction calculator india',
      'bonus salary net in hand',
      'new regime bonus tax calculator',
      'old regime bonus tax calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Performance Bonus Tax Calculator: Net Bonus In-Hand India',
      description:
        'See how much tax is deducted on your bonus and what you actually take home. Supports old and new tax regime. Free for India.',
      images: ['https://fermor.in/og-performance-bonus-tax-calculator.png'],
    },
    openGraph: {
      title: 'Performance Bonus Tax Calculator: Net Bonus After Tax India - Fermor',
      description:
        'Free performance bonus tax calculator for India. See how much tax is deducted on your bonus, your net bonus in-hand, and effective tax rate. Supports old and new regime.',
      type: 'website',
      url: 'https://fermor.in/calculators/performance-bonus-tax-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-performance-bonus-tax-calculator.png', width: 1200, height: 630, alt: 'Fermor Performance Bonus Tax Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-08';
const PAGE_DATE_MODIFIED = '2026-07-16';

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
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Income Tax India',
    'Performance Bonus Taxation',
    'Salary Tax Calculation',
    'Old Tax Regime India',
    'New Tax Regime India',
    'Section 80C Deductions',
    'Section 80D Deductions',
    'Tax on Bonus India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const faqItems = [
  {
    q: 'Is performance bonus taxed differently than salary in India?',
    a: "No. Performance bonuses are taxed as part of your total salary income under the Income Tax Act. The bonus is added to your annual salary and taxed at the applicable slab rate. There is no flat tax on bonuses in India. The marginal rate that applies depends on your total income including the bonus.",
  },
  {
    q: 'How is tax calculated on a performance bonus in India?',
    a: "Tax on a bonus is the difference between total tax with the bonus and total tax without the bonus. If your salary is Rs 12 lakh and your bonus is Rs 2 lakh, total income becomes Rs 14 lakh. The additional tax paid on the incremental Rs 2 lakh is the tax on your bonus. Under the new tax regime, this marginal slice typically falls in the 15 to 20 per cent slab for most salaried employees.",
  },
  {
    q: 'What is the tax rate on a bonus in India 2025-26?',
    a: "Bonuses are taxed at the marginal slab rate applicable to your total income. Under the new tax regime for FY 2025-26, the slabs are 5% on Rs 4-8 lakh, 10% on Rs 8-12 lakh, 15% on Rs 12-16 lakh, 20% on Rs 16-20 lakh, 25% on Rs 20-24 lakh, and 30% above Rs 24 lakh. A 4% health and education cess applies. The effective bonus tax rate depends on where in the slabs your bonus income falls.",
  },
  {
    q: 'How much tax will be deducted on a Rs 2 lakh bonus?',
    a: "It depends on your base salary. For a Rs 12 lakh salary with a Rs 2 lakh bonus (total Rs 14 lakh) under the new regime, the tax on the bonus is approximately Rs 26,000 to Rs 31,200 (about 13 to 15.6% effective rate on the bonus). Under the old regime with standard deduction and typical 80C investments, it is roughly Rs 20,800 to Rs 26,000.",
  },
  {
    q: 'Can I reduce tax on my performance bonus?',
    a: "Under the old tax regime, you can reduce taxable income through Section 80C (up to Rs 1.5 lakh), Section 80D (up to Rs 25,000-50,000), NPS under 80CCD(1B) (up to Rs 50,000), and home loan interest under Section 24(b). These deductions lower the slab your bonus falls into. Under the new regime, these deductions are not available, but the slabs are more favourable at lower income levels.",
  },
  {
    q: 'Is joining bonus taxed the same way as a performance bonus?',
    a: "Yes. A joining bonus is taxed exactly like a performance bonus. It is added to your total salary income for the financial year and taxed at the applicable slab rate. If the joining bonus is paid in one lump sum and you have no prior employer income for that year, your effective rate may be lower than if it were paid mid-year after months of regular salary.",
  },
  {
    q: 'Which tax regime is better for bonus income?',
    a: "The new regime is typically better for employees with fewer deductions and income up to Rs 15-20 lakh. For higher earners with full 80C utilisation, NPS contributions, home loan interest, and HRA exemptions, the old regime can save more tax even after the bonus. Use this calculator to compare both regimes by toggling the regime selector.",
  },
  {
    q: 'Does the standard deduction apply to bonus income?',
    a: "Yes. The standard deduction of Rs 75,000 under the new regime (or Rs 50,000 under the old regime) applies to total salary income including bonus. It is deducted once from your combined salary and bonus income before computing taxable income.",
  },
  {
    q: 'Is TDS deducted on bonus by the employer?',
    a: "Yes. Employers deduct TDS (Tax Deducted at Source) on bonus payments. The TDS is calculated by annualising the bonus income and applying the marginal tax rate for the projected annual income. You can cross-check your employer's TDS computation using this calculator and adjust your Form 16 expectations accordingly.",
  },
  {
    q: 'What is the effective tax rate on a bonus?',
    a: "The effective tax rate on a bonus is the tax amount attributable to the bonus divided by the gross bonus amount, expressed as a percentage. It reflects the marginal rate at which the bonus income is taxed given your total salary. For most employees earning Rs 10-20 lakh, the effective bonus tax rate ranges from 10 to 20 per cent under the new regime.",
  },
  {
    q: 'How does a Rs 15 lakh salary bonus affect income tax?',
    a: "If your base salary is Rs 15 lakh and you receive a 15% bonus of Rs 2.25 lakh, your total income is Rs 17.25 lakh. Under the new regime, the tax on the bonus (the incremental tax) is approximately Rs 35,100 to Rs 45,000 depending on the exact slab structure. The effective rate on just the bonus portion is roughly 15 to 20 per cent.",
  },
  {
    q: 'Can a bonus push me into a higher tax bracket in India?',
    a: "Yes. A bonus can push income across a slab boundary, causing a portion of the bonus to be taxed at a higher rate. For example, if your salary sits just below Rs 12 lakh and your bonus takes you above it, the portion above Rs 12 lakh faces a 15% rate under the new regime instead of 10%. This calculator shows the exact tax impact at any income level.",
  },
  {
    q: 'What is Fermor?',
    a: "Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give clear answers to real financial questions. The product is an automated financial action system that connects real financial accounts through the Account Aggregator framework to close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site. The calculators earn trust. The action platform is the product.",
  },
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

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Performance Bonus Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/performance-bonus-tax-calculator',
  description: 'Calculate how much tax is deducted on your performance bonus, your net bonus in-hand, and the effective tax rate. Supports old and new tax regimes, Section 80C and 80D deductions, bonus as percentage or fixed amount.',
  featureList: [
    'Bonus Tax under Old Regime',
    'Bonus Tax under New Regime',
    'Bonus as Percentage of Salary or Fixed Amount',
    'Section 80C and 80D Deductions (Old Regime)',
    'Effective Tax Rate on Bonus',
    'Net Bonus In-Hand Calculator',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'You Keep vs Tax Donut Chart',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Performance Bonus Tax Calculator', item: 'https://fermor.in/calculators/performance-bonus-tax-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tax on Performance Bonus in India',
  description: 'Step-by-step guide to calculate the tax deducted on your bonus and your net bonus in-hand using the Fermor Performance Bonus Tax Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Performance Bonus Tax Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your annual base salary',
      text: 'Set the Annual Base Salary or CTC slider to your total annual salary before the bonus. The default is Rs 12 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter your bonus amount or percentage',
      text: 'Choose "% of Salary" to enter bonus as a percentage of salary, or "Fixed Amount" to enter the absolute bonus amount directly.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select your tax regime',
      text: 'Toggle between Old Regime and New Regime. The new tax regime is the default from FY 2024-25 onward.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add deductions if using old regime',
      text: 'Click "More settings" to enter Section 80C investments (up to Rs 1.5 lakh) and Section 80D premiums (up to Rs 1 lakh). These apply only under the old regime.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Read your results',
      text: 'The output panel shows your net bonus in-hand, tax on bonus, effective tax rate, and a donut chart showing how much of the bonus you keep versus pay as tax.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Performance Bonus',
  alternateName: 'Variable Pay',
  description: 'A performance bonus is additional compensation paid to an employee based on individual, team, or company performance targets, taxed as part of total salary income under Section 17 of the Income Tax Act.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Performance-related_pay',
    'https://www.wikidata.org/wiki/Q1635329',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Performance Bonus Tax Calculator: Net Bonus In-Hand India',
  description: 'Free performance bonus tax calculator for India. See how much tax is deducted on your bonus, your net bonus in-hand, and effective tax rate under old or new tax regime.',
  url: 'https://fermor.in/calculators/performance-bonus-tax-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  author: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fermor.in/fermor-schema-logo.png',
    },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Performance Bonus', alternateName: 'Variable Pay' },
    { '@type': 'DefinedTerm', name: 'Income Tax India' },
    { '@type': 'DefinedTerm', name: 'New Tax Regime' },
    { '@type': 'DefinedTerm', name: 'Old Tax Regime' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, Indian taxpayers, NRI employees, HR professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-bonus-tax-calculator', name: 'What Is a Performance Bonus Tax Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-bonus-taxed-india', name: 'How Is Bonus Taxed in India' },
    { '@type': 'WebPageElement', cssSelector: '#bonus-tax-old-vs-new-regime', name: 'Bonus Tax in Old Regime vs New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#joining-bonus-tax', name: 'Joining Bonus and Annual Bonus Tax Treatment' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-tax-on-bonus', name: 'How to Reduce Tax on Your Bonus' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function PerformanceBonusTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <PerformanceBonusClient />
    </>
  );
}

import type { Metadata } from 'next';
import EffectiveTaxRateCalculatorClient from './EffectiveTaxRateCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/effective-tax-rate-calculator`;

  return {
    title: 'Effective Tax Rate Calculator: Check True Tax Rate',
    description:
      'Free effective tax rate calculator for India. Check your actual tax rate compared to your marginal slab rate under new and old regimes. Free to use.',
    keywords: [
      'effective tax rate calculator',
      'true tax rate calculator',
      'calculate effective tax rate',
      'effective vs marginal tax rate',
      'average tax rate calculator',
      'income tax rate calculator',
      'true tax rate calculator india',
      'tax regime comparison calculator',
      'effective tax rate slabs',
      'surcharge and cess tax rate calculator',
      'how to calculate effective tax rate',
      'effective tax rate excel formula',
      'actual tax rate checker',
      'tax saving calculator effective rate',
      'salaried tax rate calculator',
      'new tax regime effective tax rate',
      'old tax regime average tax rate',
      'hni effective tax rate calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Effective Tax Rate Calculator - Fermor',
      description:
        'Calculate your true tax rate compared to your marginal tax slab under the old and new regimes. Free to use.',
      images: ['https://fermor.in/og-effective-tax-rate-calculator.png'],
    },
    openGraph: {
      title: 'Effective Tax Rate Calculator: Check True Tax Rate - Fermor',
      description:
        'Compute your actual effective tax rate by factoring in gross income, tax regimes, deductions, surcharges, and education cess. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/effective-tax-rate-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-effective-tax-rate-calculator.png', width: 1200, height: 630, alt: 'Fermor Effective Tax Rate Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-10';
const PAGE_DATE_MODIFIED = '2026-07-10';

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
  description: 'Fermor is building the automated financial action layer for India. The system that closes the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Effective Tax Rate',
    'Marginal Tax Rate',
    'Average Tax Rate',
    'Tax Slabs',
    'Tax Regimes',
    'Tax Planning India',
    'Surcharge and Cess',
    'Tax Deductions',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Effective Tax Rate Calculator', item: 'https://fermor.in/calculators/effective-tax-rate-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The effective tax rate is the actual percentage of your total gross income that you pay in income taxes. It is calculated by dividing your total annual tax liability (including surcharge and cess) by your total gross annual income.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the effective tax rate different from the marginal tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The marginal tax rate is the tax rate applied to the last rupee of your taxable income (such as 20% or 30% slabs). The effective tax rate is the overall average rate. Your effective tax rate is almost always lower than your marginal tax rate because lower portions of your income are taxed at 0%, 5%, 10%, etc., and deductions lower your taxable income.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate the effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Effective Tax Rate = (Total Tax Paid divided by Gross Annual Income) multiplied by 100. For example, if your gross annual income is Rs 15 lakh and your total tax liability is Rs 1.5 lakh, your effective tax rate is 10% (1,50,000 / 15,00,000 x 100).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average effective tax rate in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average effective tax rate varies greatly by income class. For middle-income earners earning up to Rs 12.75 lakh under the new tax regime, the effective tax rate can be 0% due to rebates and standard deductions. For high-income earners above Rs 5 crore, the effective rate approaches the marginal peak of 39% or 42.74%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I lower my effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can lower your effective tax rate by maximizing deductions under Section 80C, 80D, and NPS (under the old regime), claiming HRA and home loan exemptions, restructuring your salary components, or shifting to the new tax regime if it results in lower overall tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the effective tax rate include surcharge and cess?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a complete effective tax rate calculation must include the basic slab tax, any applicable surcharge, and the 4% health and education cess, as these are real tax payments that you make to the government.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the new tax regime affect my effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new tax regime has lower slab rates and a higher rebate limit (up to Rs 12 lakh taxable income has zero tax under 87A for FY 2026-27), which significantly reduces the effective tax rate for middle-income taxpayers without requiring locking funds in saving schemes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my effective tax rate lower than my tax slab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your effective tax rate is lower because of progressive tax slabs. For example, even if your marginal tax slab is 30%, the first Rs 4 lakh under the new regime is taxed at 0%, the next Rs 4 lakh at 5%, and so on. Additionally, deductions subtract from your taxable income, widening the gap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is surcharge included in the effective tax rate calculation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For high-income earners (exceeding Rs 50 lakh), surcharge is added to the basic tax, which increases the total tax paid and subsequently drives up the effective tax rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can tax deductions reduce my effective tax rate under the new regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the new regime, regular deductions like 80C and HRA are not allowed. However, standard deduction (Rs 75,000) and employer NPS contribution (under 80CCD(2)) are allowed, which help reduce the taxable income and effective tax rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Effective Tax Rate Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/effective-tax-rate-calculator',
  description: 'Determine your actual tax rate compared to your marginal tax slab under the old and new regimes in India.',
  featureList: [
    'Effective vs Marginal tax rate analysis',
    'New Regime vs Old Regime comparison',
    'Standard deduction and exemptions integrations',
    'Surcharge and cess calculations',
    'Tax Paid vs Take-Home Income donut chart',
    'Progressive slab tax contribution visualizer',
    'Multi-currency support',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check Your Effective Tax Rate',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Effective Tax Rate Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter gross annual income',
      text: 'Enter your total gross annual salary, business profits, interest, or house rent income.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select regime and age',
      text: 'Choose between the new and old tax regimes, and select your age group.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add eligible tax deductions',
      text: 'For the old regime, enter total deductions like 80C, 80D, or home loan interest to lower taxable income.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check your effective tax rate',
      text: 'Review the calculated true average tax rate, total tax amount, and final take-home income.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Effective Tax Rate',
  alternateName: 'Average Tax Rate',
  description: 'The actual percentage of gross income paid in taxes, calculated as total tax liability divided by gross income.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Tax Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Tax_rate#Effective',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Effective Tax Rate Calculator: Check True Tax Rate',
  url: 'https://fermor.in/calculators/effective-tax-rate-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Effective Tax Rate', alternateName: 'Average Tax Rate' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, salaried individuals, financial consultants, CAs',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-effective-rate', name: 'What Is the Effective Tax Rate?' },
    { '@type': 'WebPageElement', cssSelector: '#effective-vs-marginal', name: 'Effective vs Marginal Tax Rate' },
    { '@type': 'WebPageElement', cssSelector: '#calculation-formula', name: 'Effective Tax Rate Formula' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#regime-comparison', name: 'Effective Rates: New vs Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-lower', name: 'How to Lower Your Effective Tax Rate' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Effective Rate Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function EffectiveTaxRateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <EffectiveTaxRateCalculatorClient />
    </>
  );
}

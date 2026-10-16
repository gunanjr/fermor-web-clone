import type { Metadata } from 'next';
import LifeInsuranceCalculatorClient from './LifeInsuranceCalculatorClient';
import { FAQS } from './lifeInsuranceData';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/life-insurance-calculator';
  return {
    title: 'Life Insurance Premium Calculator: Cover & Affordability Estimator',
    description:
      'Free life insurance calculator for India. Calculate premiums, life cover needed, plan affordability, and compare term, endowment, ULIP. Zero agent markup.',
    keywords: [
      'life insurance calculator',
      'life cover calculator',
      'life cover amount calculator',
      'life insurance affordability calculator',
      'life insurance amount calculator',
      'life insurance benefit calculator',
      'life insurance calculator based on income',
      'life insurance calculator based on salary',
      'life insurance calculator by age',
      'life insurance calculator by income',
      'life insurance calculator by salary',
      'life insurance calculator india',
      'life insurance calculator with age',
      'life insurance cost calculator',
      'life insurance coverage calculator',
      'life insurance eligibility calculator',
      'life insurance investment calculator',
      'life insurance maturity calculator',
      'life insurance needs calculator',
      'life insurance online calculator',
      'life insurance payout calculator',
      'life insurance plan calculator',
      'life insurance plan premium calculator',
      'life insurance policy calculator',
      'life insurance policy premium calculator',
      'life insurance premium calculation calculator',
      'life insurance premium calculator',
      'life insurance premium calculator india',
      'life insurance quote calculator',
      'life insurance requirement calculator',
      'life insurance return calculator',
      'life insurance sum assured calculator',
      'life insurance sum assured calculator india',
      'life insurance tax benefit calculator',
      'life insurance tax calculator',
      'human life value calculator',
      'hlv calculator',
      'income replacement calculator',
      'term vs endowment calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Life Insurance Calculator: Life Cover & Premium Estimator - Fermor',
      description:
        'Calculate life insurance cover needed, compare term, endowment, ULIP plans, and estimate premiums using HLV and income replacement methods. Free for India.',
      images: ['https://fermor.in/og-life-insurance-calculator.png'],
    },
    openGraph: {
      title: 'Life Insurance Calculator: Life Cover & Premium Estimator - Fermor',
      description:
        'Free life insurance calculator for India. Calculate life cover needed, compare term, endowment, and ULIP premiums with HLV and expense methods. Free to use.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-life-insurance-calculator.png', width: 1200, height: 630, alt: 'Fermor Life Insurance Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-23';
const PAGE_DATE_PUBLISHED = '2026-06-25';

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
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Life Insurance',
    'Life Cover Amount',
    'Term Insurance',
    'Endowment Plans',
    'ULIP',
    'Whole Life Insurance',
    'Human Life Value',
    'Income Replacement Method',
    'IRDAI Regulations',
    'Claim Settlement Ratio',
    'Section 80C Tax Deduction',
    'Section 10(10D) Exemption',
    'Section 45 Insurance Act',
    'Personal Finance India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Life Insurance Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/life-insurance-calculator',
  featureList: [
    'Cover Needed Mode (Human Life Value and Expense Replacement calculations)',
    'Premium Estimator Mode with 50 Lakh, 1 Crore, 2 Crore Presets',
    'Plan Comparison Mode for Term, Endowment, ULIP, and Whole Life',
    'Gender-adjusted rates with 15% discount for women',
    'Smoker and Non-Smoker actuarial mortality loading',
    'Year-by-Year Policy Schedule with Stacked Bar Chart',
    'Section 80C and Section 10(10D) Tax Savings Projections',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Life Insurance Calculator', item: 'https://fermor.in/calculators/life-insurance-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Life Insurance Cover and Premium',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Life Insurance Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select Calculator Mode',
      text: 'Select Cover Needed to evaluate your total protection gap, Premium Estimator for policy pricing, or Plan Comparison to contrast Term, Endowment, ULIP, and Whole Life.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Age and Earnings Details',
      text: 'Input your annual income, monthly expenses, current age, and retirement horizon to model your economic earnings capacity.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set Debts, Savings, and Sum Assured',
      text: 'Account for outstanding loans, education costs, and existing investments, or select quick presets for 50 Lakh, 1 Crore, and 2 Crore cover.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyze Results and Policy Schedule',
      text: 'Review the recommended life cover, donut chart breakdown, Section 80C tax relief, and year-by-year schedule with the stacked bar chart.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Life Insurance',
  alternateName: 'Life Cover',
  description: 'A contract between an insurance policyholder and an insurer, where the insurer promises to pay a designated beneficiary a sum of money upon the death of an insured person or upon maturity.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Insurance & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Life_insurance',
    'https://www.wikidata.org/wiki/Q216315',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Life Insurance Calculator: Life Cover & Premium Estimator',
  description: 'Free life insurance calculator for India. Calculate life cover needed, compare term, endowment, and ULIP premiums. Free to use.',
  url: 'https://fermor.in/calculators/life-insurance-calculator',
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
    { '@type': 'DefinedTerm', name: 'Life Insurance', alternateName: 'Life Cover' },
    { '@type': 'DefinedTerm', name: 'Sum Assured' },
    { '@type': 'DefinedTerm', name: 'Human Life Value' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried professionals, self-employed earners, NRIs, families planning life insurance protection',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-life-insurance', name: 'What Is Life Insurance and How Does It Work in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-much-cover', name: 'How Much Life Insurance Cover Do You Need' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-by-salary', name: 'Life Insurance Calculator Based on Salary and Income' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-by-age', name: 'Life Insurance Calculator by Age' },
    { '@type': 'WebPageElement', cssSelector: '#plan-types-compared', name: 'Comparing Life Insurance Plans' },
    { '@type': 'WebPageElement', cssSelector: '#premium-calculation-formula', name: 'Life Insurance Premium Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#affordability-premium-pricing', name: 'Life Insurance Affordability & Premium Pricing' },
    { '@type': 'WebPageElement', cssSelector: '#life-stage-strategy', name: 'Life Insurance Strategy by Life Stage' },
    { '@type': 'WebPageElement', cssSelector: '#salaried-vs-self-employed', name: 'Financial and Medical Underwriting' },
    { '@type': 'WebPageElement', cssSelector: '#policy-riders', name: 'Life Insurance Policy Riders' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits', name: 'Tax Benefits Under Section 80C and Section 10(10D)' },
    { '@type': 'WebPageElement', cssSelector: '#claim-settlement-ratio', name: 'Claim Settlement Ratio and Section 45 3-Year Rule' },
    { '@type': 'WebPageElement', cssSelector: '#claim-settlement-process', name: 'Step-by-Step Guide to Filing and Settling a Death Claim' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Life Insurance Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function LifeInsuranceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LifeInsuranceCalculatorClient />
    </>
  );
}

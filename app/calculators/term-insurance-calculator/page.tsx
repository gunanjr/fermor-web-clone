import type { Metadata } from 'next';
import TermInsuranceCalculatorClient from './TermInsuranceCalculatorClient';
import { FAQS } from './termInsuranceData';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/term-insurance-calculator';
  return {
    title: 'Term Insurance Calculator: Premium & Sum Assured Estimator',
    description:
      'Free term insurance calculator for India. Calculate 1 Cr and 2 Cr term plan premiums, sum assured, and HLV coverage adequacy. Free to use.',
    keywords: [
      'term insurance calculator',
      '1 crore term insurance premium calculator',
      '2 crore term insurance premium calculator',
      '50 lakh term insurance premium calculator',
      'term insurance premium calculator',
      'how much term insurance cover do i need',
      'how much term insurance do i need',
      'how to calculate term insurance premium',
      'monthly term insurance premium calculator',
      'yearly term insurance premium calculator',
      'term insurance amount calculator',
      'term insurance benefits calculator',
      'term insurance calculator based on age',
      'term insurance calculator based on income',
      'term insurance calculator by age',
      'term insurance calculator for family',
      'term insurance calculator for salaried',
      'term insurance calculator for self employed',
      'term insurance calculator india',
      'term insurance calculator with age',
      'term insurance calculator with income',
      'term insurance cost calculator',
      'term insurance coverage calculator',
      'term insurance coverage calculator india',
      'term insurance death benefit calculator',
      'term insurance eligibility calculator',
      'term insurance maturity calculator',
      'term insurance online calculator',
      'term insurance payout calculator',
      'term insurance policy calculator',
      'term insurance premium calculation formula',
      'term insurance premium calculator for 1 crore',
      'term insurance premium calculator for 2 crore',
      'term insurance premium calculator for 50 lakh',
      'term insurance premium calculator india',
      'term insurance premium per month calculator',
      'term insurance quote calculator',
      'term insurance sum assured calculator',
      'term life insurance calculator',
      'term plan calculator',
      'term plan premium calculator',
      'human life value calculator',
      'hlv calculator',
      'term insurance for nri',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Term Insurance Calculator: Premium & Sum Assured Estimator - Fermor',
      description:
        'Calculate term plan premium, recommended sum assured, and coverage adequacy using HLV and income replacement methods. Free for India.',
      images: ['https://fermor.in/og-term-insurance-calculator.png'],
    },
    openGraph: {
      title: 'Term Insurance Calculator: Premium & Sum Assured Estimator - Fermor',
      description:
        'Calculate term plan premium, sum assured, and coverage adequacy using HLV and income replacement methods. Compare 1 Cr and 2 Cr rates across ages. Free for India.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-term-insurance-calculator.png', width: 1200, height: 630, alt: 'Fermor Term Insurance Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-22';
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
    'Term Insurance',
    'Term Life Insurance',
    'Sum Assured',
    'Human Life Value',
    'Income Replacement Method',
    'IRDAI Regulations',
    'Claim Settlement Ratio',
    'Section 80C Tax Deduction',
    'Section 10(10D) Exemption',
    'Section 45 Insurance Act',
    'Married Women Property Act',
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
  name: 'Term Insurance Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/term-insurance-calculator',
  featureList: [
    'Cover Needed Mode (Human Life Value and Income Replacement calculation)',
    'Premium Estimator Mode with 50 Lakh, 1 Crore, 2 Crore Presets',
    'Gender-adjusted pricing with 15% discount for women',
    'Smoker and Non-Smoker mortality rate simulation',
    'Year-by-Year Policy Schedule with Stacked Bar Chart',
    'Section 80C Tax Savings and Net Cost Projections',
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
    { '@type': 'ListItem', position: 3, name: 'Term Insurance Calculator', item: 'https://fermor.in/calculators/term-insurance-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Term Insurance Premium and Cover',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Term Insurance Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select Calculator Mode',
      text: 'Choose Cover Needed to determine how much life insurance your family needs, or Premium Estimator to calculate monthly and annual premium for a specific sum assured.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Age and Financial Details',
      text: 'Set your current age, target coverage term, and annual income or desired sum assured (with convenient presets for 50 Lakh, 1 Crore, and 2 Crore).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Specify Smoker Status and Payment Mode',
      text: 'Select your smoker status and payment frequency (monthly, quarterly, half-yearly, or yearly) to see accurate actuarial quotes.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review Results and Year-by-Year Schedule',
      text: 'Inspect your recommended cover, monthly premium outgo, donut chart breakdown, Section 80C tax savings, and full year-by-year amortization schedule.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Term Insurance',
  alternateName: 'Term Life Insurance',
  description: 'A pure life insurance product that provides financial protection for a fixed period. If the insured individual passes away during the policy term, the insurer pays the guaranteed sum assured to the designated nominee.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Insurance & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Term_life_insurance',
    'https://www.wikidata.org/wiki/Q1056581',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Term Insurance Calculator: Premium & Sum Assured Estimator',
  description: 'Free term insurance calculator for India. Calculate term plan premium, sum assured, and coverage adequacy using HLV and income replacement methods. Compare 1 Cr and 2 Cr rates across ages. Free to use.',
  url: 'https://fermor.in/calculators/term-insurance-calculator',
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
    { '@type': 'DefinedTerm', name: 'Term Insurance', alternateName: 'Term Life Insurance' },
    { '@type': 'DefinedTerm', name: 'Sum Assured' },
    { '@type': 'DefinedTerm', name: 'Human Life Value' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried professionals, self-employed earners, NRIs, families planning life insurance protection',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-term-insurance', name: 'What Is Term Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#term-insurance-formula', name: 'Term Insurance Premium Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#premium-rates-comparison', name: '1 Crore, 2 Crore, and 50 Lakh Premium Rates' },
    { '@type': 'WebPageElement', cssSelector: '#how-much-cover', name: 'How Much Term Insurance Cover Do You Need' },
    { '@type': 'WebPageElement', cssSelector: '#salaried-vs-self-employed', name: 'Term Insurance for Salaried vs Self-Employed' },
    { '@type': 'WebPageElement', cssSelector: '#term-plan-riders', name: 'Term Plan Riders and Add-On Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#term-vs-endowment-ulip', name: 'Term Insurance vs Endowment vs ULIP vs TROP' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits', name: 'Tax Benefits Under Section 80C and Section 10(10D)' },
    { '@type': 'WebPageElement', cssSelector: '#claim-settlement-ratio', name: 'Claim Settlement Ratio and Section 45 3-Year Rule' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-buy-term-insurance', name: 'When to Buy Term Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#term-insurance-by-age', name: 'Term Insurance Coverage by Age Group' },
    { '@type': 'WebPageElement', cssSelector: '#term-insurance-by-income', name: 'Term Insurance Strategy by Monthly Income' },
    { '@type': 'WebPageElement', cssSelector: '#term-insurance-self-employed-nri', name: 'Term Insurance for Self-Employed and NRI Investors' },
    { '@type': 'WebPageElement', cssSelector: '#term-insurance-mistakes', name: 'Common Term Insurance Mistakes to Avoid' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Term Insurance Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function TermInsuranceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <TermInsuranceCalculatorClient />
    </>
  );
}

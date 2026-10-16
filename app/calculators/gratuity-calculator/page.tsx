import type { Metadata } from 'next';
import GratuityCalculatorClient from './GratuityCalculatorClient';
import { FAQ_ITEMS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-25';
const PAGE_DATE_MODIFIED = '2026-09-09';

export const metadata: Metadata = {
  title: 'Gratuity Calculator: Calculate Gratuity Amount Online',
  description: 'Free gratuity calculator for India. Calculate gratuity payable under the Payment of Gratuity Act, 1972. Enter last drawn salary and years of service. Instant tax-free and taxable split. Free to use.',
  keywords: [
    'gratuity calculator',
    'end of service calculator',
    'severance pay calculator',
    'retirement payout calculator',
    'termination pay calculator',
    'gratuity computation',
    'calculate gratuity online',
    'eligibility for gratuity',
    'formula for gratuity',
    'gratuity rule',
    'calculate gratuity amount',
    'calculate the gratuity amount',
    'calculation of gratuity for private employees',
    'gratuity amount',
    'gratuity in salary',
    'retirement gratuity calculator',
    '5 year gratuity calculation',
    'calculate gratuity amount online',
    'calculate gratuity formula',
    'calculate my gratuity',
    'calculating gratuity in private companies',
    'calculation of gratuity as per gratuity act',
    'calculation of gratuity for central government employees',
    'calculation of gratuity in banks',
    'calculation of gratuity payment',
    'calculation of gratuity with example',
    'central government gratuity calculator',
    'company gratuity calculation',
    'company gratuity calculator',
    'dcrg calculation formula',
    'employee gratuity calculation',
    'gratuity act 1972 calculation',
    'gratuity amount after 5 years',
    'gratuity amount for 5 years',
    'gratuity calculation calculator',
    'gratuity calculation for 5 years',
    'gratuity calculation for it employees',
    'gratuity calculation in salary slip',
    'gratuity eligibility calculator',
    'gratuity exemption calculator',
    'gratuity formula calculator',
    'gratuity formula for central government employees',
    'gratuity fund calculation',
    'gratuity kaise nikale',
    'gratuity percentage calculation',
    'gratuity tax calculator',
    'gratuity year calculation',
    'lic gratuity calculator',
    'nps gratuity calculator',
    'private company gratuity calculation',
    'retirement gratuity calculation formula',
    'retirement gratuity formula',
    'rules for gratuity calculation',
    'salary for gratuity calculation',
    'staff gratuity calculation',
    '5 years gratuity amount',
    '10 year gratuity calculation',
    '10 years gratuity calculator',
    'gratuity calculation formula',
    'payment of gratuity act 1972',
    'gratuity act india',
    'tax free gratuity limit',
    'gratuity 25 lakh exemption',
    'gratuity for 10 years service',
    'gratuity for 15 years service',
    'gratuity for 20 years service',
    'central govt employees gratuity calculation',
    'dcrg calculation',
    'accenture gratuity calculator',
    'groww gratuity calculator',
  ],
  openGraph: {
    title: 'Gratuity Calculator: Calculate Gratuity Amount Online - Fermor',
    description: 'Calculate gratuity payable under the Payment of Gratuity Act, 1972. Tax-free and taxable split, accrual schedule, eligibility check. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/gratuity-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-gratuity-calculator.png', width: 1200, height: 630, alt: 'Fermor Gratuity Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gratuity Calculator: Calculate Gratuity Amount Online',
    description: 'Calculate your gratuity payout under the Gratuity Act 1972. Tax-free amount, taxable portion, accrual schedule. Free for India.',
    images: ['https://fermor.in/og-gratuity-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/gratuity-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Gratuity Calculation India',
    'Payment of Gratuity Act 1972',
    'DCRG Calculation',
    'Gratuity Tax Exemption',
    'Employee Benefits India',
    'Personal Finance India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Gratuity Calculator', item: 'https://fermor.in/calculators/gratuity-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Gratuity Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/gratuity-calculator',
  description: 'Calculate gratuity payable under the Payment of Gratuity Act, 1972. Shows tax-free amount, taxable portion, eligibility check, and year-wise accrual schedule from 5 to 30 years.',
  featureList: [
    'Gratuity calculation as per Payment of Gratuity Act 1972',
    'Six-month rounding rule applied automatically',
    'Tax-free vs taxable split (Rs 25 lakh exemption)',
    'Year-by-year gratuity accrual schedule (5 to 30 years)',
    'Eligibility indicator (eligible vs not eligible)',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
  name: 'How to Calculate Gratuity Amount',
  description: 'Step-by-step guide to calculate your gratuity payout under the Payment of Gratuity Act, 1972.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Gratuity Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your last drawn salary', text: 'Enter your monthly Basic Salary plus Dearness Allowance (DA). Do not include HRA, bonuses, or other allowances. This is the only salary figure used in the Gratuity Act formula.' },
    { '@type': 'HowToStep', position: 2, name: 'Set your years of service', text: 'Enter the total duration of your employment with the current employer. You can switch between years and months for precise input. The calculator automatically applies the 6-month rounding rule.' },
    { '@type': 'HowToStep', position: 3, name: 'Check eligibility', text: 'The calculator displays whether you meet the 5-year minimum service requirement. If you have more than 6 months beyond the last full year, it shows the rounded-up service used for calculation.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the output', text: 'See your total gratuity payable, the tax-free portion (up to Rs 25 lakhs), the taxable portion, and the percentage breakdown in the donut chart. Expand the accrual schedule to see how gratuity grows year by year.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Gratuity',
  alternateName: 'Payment of Gratuity',
  description: 'A one-time lump-sum payment made by an employer to an employee as recognition for long and continuous service, governed by the Payment of Gratuity Act, 1972 in India.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Employment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Gratuity',
    'https://www.wikidata.org/wiki/Q4544949',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Gratuity Calculator: Calculate Gratuity Amount Online',
  description: 'Free gratuity calculator. Calculate gratuity payable under the Payment of Gratuity Act, 1972 with tax split and accrual schedule.',
  url: 'https://fermor.in/calculators/gratuity-calculator',
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
    { '@type': 'DefinedTerm', name: 'Gratuity', alternateName: 'Payment of Gratuity Act 1972' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, HR professionals, CA and financial advisors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-gratuity', name: 'What Is Gratuity' },
    { '@type': 'WebPageElement', cssSelector: '#gratuity-formula', name: 'Gratuity Formula' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Gratuity Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#tax-treatment', name: 'Gratuity Tax Treatment' },
    { '@type': 'WebPageElement', cssSelector: '#private-vs-government', name: 'Private vs Government Gratuity' },
    { '@type': 'WebPageElement', cssSelector: '#accrual-schedule', name: 'Gratuity Accrual Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function GratuityCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <GratuityCalculatorClient />
    </>
  );
}

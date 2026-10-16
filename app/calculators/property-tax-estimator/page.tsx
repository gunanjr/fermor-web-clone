import type { Metadata } from 'next';
import PropertyTaxEstimatorClient from './PropertyTaxEstimatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-29';
const PAGE_DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: 'Property Tax Estimator: Municipal House Tax Calculator 2026',
  description: 'Free property tax estimator for India. Calculate municipal house tax across Mumbai (MCGM), Delhi (MCD), Bangalore (BBMP), Hyderabad (GHMC), Pune (PMC), and more. Free to use.',
  keywords: [
    'property tax estimator india',
    'municipal house tax calculator 2026',
    'bbmp property tax calculator bangalore',
    'mcd property tax calculator delhi',
    'mcgm property tax calculator mumbai',
    'ghmc property tax calculator hyderabad',
    'unit area value uav property tax formula',
    'property tax early bird discount rebate',
    'residential property tax rate per sq ft',
    'commercial property tax estimator india',
    'calculate house tax online 2026',
    'municipal property tax penalty rate',
  ],
  openGraph: {
    title: 'Property Tax Estimator: Municipal House Tax Calculator 2026 - Fermor',
    description: 'Calculate municipal property tax in Indian cities using Unit Area Value (UAV) formulas, early bird rebates, and age factors. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/property-tax-estimator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-property-tax-estimator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Tax Estimator - Fermor',
    description: 'Estimate municipal house tax, Unit Area Value, and early payment rebates across Indian cities. Free to use.',
    images: ['https://fermor.in/og-property-tax-estimator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/property-tax-estimator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Municipal Property Tax', 'Unit Area Value System', 'BBMP Property Tax', 'MCD Property Tax', 'Capital Value System', 'Early Payment Rebate', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Property Tax Estimator', item: 'https://fermor.in/calculators/property-tax-estimator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is property tax calculated in Indian municipal corporations?', acceptedAnswer: { '@type': 'Answer', text: 'Property tax in India is calculated using either the Unit Area Value (UAV) method or Capital Value system: Tax = Built-up Area × Base Unit Rate × Occupancy Factor × Building Age Factor × Tax Rate %.' } },
    { '@type': 'Question', name: 'What is Unit Area Value (UAV) method in property tax?', acceptedAnswer: { '@type': 'Answer', text: 'Unit Area Value assigns a per-square-foot annual rental rate based on location category, building age, and structure type to compute standardized municipal property tax.' } },
    { '@type': 'Question', name: 'Do municipal corporations offer early payment property tax rebates?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, most municipal bodies (such as BBMP Bangalore, MCD Delhi, and GHMC Hyderabad) offer a 5% early bird rebate on property tax if paid before April 30th or May 31st of the financial year.' } },
    { '@type': 'Question', name: 'Is property tax higher for rented properties than self-occupied?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, municipal corporations apply higher occupancy multipliers (typically 1.25x to 2.0x) for rented properties compared to self-occupied residential flats.' } },
    { '@type': 'Question', name: 'What happens if municipal property tax is paid late?', acceptedAnswer: { '@type': 'Answer', text: 'Late property tax payments attract simple interest penalties of 1% to 2% per month (12% to 24% per year) calculated from the due date until full clearance.' } },
    { '@type': 'Question', name: 'Is municipal property tax deductible from rental income under Section 24?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, property tax actually paid during the financial year is fully deductible from Gross Annual Rent under Section 24 of the Income Tax Act.' } },
    { '@type': 'Question', name: 'How does building age reduce municipal property tax?', acceptedAnswer: { '@type': 'Answer', text: 'Municipal corporations apply age depreciation factors (e.g. 1.0 for under 5 years, 0.9 for 5-10 years, 0.8 for 10-20 years) reducing property tax for older structures.' } },
    { '@type': 'Question', name: 'Can property tax be paid online across Indian cities?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, all major municipal corporations operate online portals (such as BBMP Online, MCD Online, MCGM Portal) where property owners pay via UPI, net banking, or debit card.' } },
    { '@type': 'Question', name: 'How to calculate property tax for a 1200 sq ft flat in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'For a 1200 sq ft flat in BBMP Zone B, annual property tax is computed using Unit Area Value formulas, typically amounting to approx Rs 3,200 to Rs 6,500 per year.' } },
    { '@type': 'Question', name: 'How does this property tax estimator work?', acceptedAnswer: { '@type': 'Answer', text: 'This estimator computes annual property tax payable, 5% early bird rebate savings, late payment penalty risks, and net payable amount based on built-up area and occupancy.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Property Tax Estimator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/property-tax-estimator',
  description: 'Estimate municipal house tax, Unit Area Value (UAV), early payment rebates, and late payment penalties across Indian cities.',
  featureList: ['Unit Area Value (UAV) formula engine', 'Built-up area in sq ft input', 'Self-occupied vs Rented occupancy factor', 'Building age depreciation factor', '5% early bird rebate calculation', 'Late payment penalty estimate', 'Donut chart tax breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Municipal Property Tax in India', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Property Tax Estimator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter built-up area', text: 'Input total covered built-up area in square feet.' },
    { '@type': 'HowToStep', position: 2, name: 'Select city base rate', text: 'Select municipal unit area rate per sq ft.' },
    { '@type': 'HowToStep', position: 3, name: 'Select occupancy and age', text: 'Choose Self-Occupied or Rented, and select building age group.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net property tax', text: 'View annual property tax payable, 5% early payment rebate, and half-yearly payouts.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Property Tax', alternateName: 'Municipal House Tax',
  description: 'An annual ad valorem municipal tax levied by local urban bodies on real estate property owners based on building area and valuation.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Municipal Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Property_tax'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Property Tax Estimator: Municipal House Tax Calculator 2026',
  url: 'https://fermor.in/calculators/property-tax-estimator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Property Tax', alternateName: 'Municipal House Tax' }],
  audience: { '@type': 'Audience', audienceType: 'Homeowners, property buyers, landlords, municipal taxpayers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-property-tax', name: 'What Is Municipal Property Tax?' },
    { '@type': 'WebPageElement', cssSelector: '#uav-formula', name: 'Unit Area Value (UAV) Property Tax Formula' },
    { '@type': 'WebPageElement', cssSelector: '#city-tax-table', name: 'Municipal Property Tax Rates in Major Indian Metros' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PropertyTaxEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PropertyTaxEstimatorClient />
    </>
  );
}

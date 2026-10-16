import type { Metadata } from 'next';
import RealEstateRoiClient from './RealEstateRoiClient';

const PAGE_DATE_PUBLISHED = '2026-07-28';
const PAGE_DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: 'Real Estate ROI Calculator: Rental Yield & Capital Gain',
  description: 'Free real estate ROI calculator for India. Calculate rental yield %, net cashflow, property capital appreciation, and total return on investment. Free to use.',
  keywords: [
    'real estate roi calculator',
    'property return on investment calculator india',
    'rental yield calculator india',
    'net rental yield calculator',
    'real estate total return calculator',
    'commercial property roi calculator',
    'residential real estate returns calculator',
    'rental cash flow calculator india',
    'house investment roi estimator',
    'real estate vs mutual fund return calculator',
    'mumbai rental yield calculator',
    'bangalore property roi calculator',
  ],
  openGraph: {
    title: 'Real Estate ROI Calculator: Rental Yield & Capital Gain - Fermor',
    description: 'Calculate real estate rental yields, annual maintenance costs, net cashflows, and total investment ROI in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/real-estate-roi-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-real-estate-roi-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate ROI Calculator - Fermor',
    description: 'Calculate gross & net rental yields, cashflow, capital growth, and total real estate ROI in India. Free to use.',
    images: ['https://fermor.in/og-real-estate-roi-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/real-estate-roi-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Real Estate ROI', 'Rental Yield India', 'Property Cash Flow', 'Section 24 Tax Deduction', 'Property Management Expenses', 'Real Estate Asset Allocation', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Real Estate ROI Calculator', item: 'https://fermor.in/calculators/real-estate-roi-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is real estate ROI in India?', acceptedAnswer: { '@type': 'Answer', text: 'Real estate ROI (Return on Investment) measures total gains from a property investment, combining net rental cashflow income and property capital value appreciation over time.' } },
    { '@type': 'Question', name: 'How to calculate rental yield in Indian cities?', acceptedAnswer: { '@type': 'Answer', text: 'Gross rental yield is calculated as: Gross Yield % = (Annual Rental Income / Property Purchase Price) × 100.' } },
    { '@type': 'Question', name: 'What is a good rental yield for residential property in India?', acceptedAnswer: { '@type': 'Answer', text: 'Average residential rental yields in major Indian metro cities range from 2.5% to 4.0% per year, whereas commercial property yields range between 7.0% and 9.5%.' } },
    { '@type': 'Question', name: 'What is the difference between gross yield and net rental yield?', acceptedAnswer: { '@type': 'Answer', text: 'Gross rental yield considers only annual rent vs property price. Net rental yield subtracts annual maintenance charges, property taxes, insurance, and vacancy losses from gross rent before dividing by price.' } },
    { '@type': 'Question', name: 'How does capital appreciation affect total real estate ROI?', acceptedAnswer: { '@type': 'Answer', text: 'Capital appreciation represents price growth of the property. In India, capital appreciation typically accounts for 60% to 80% of total long-term real estate returns.' } },
    { '@type': 'Question', name: 'How is rental income taxed under Section 24 of Income Tax Act?', acceptedAnswer: { '@type': 'Answer', text: 'Rental income is taxed under Income from House Property. Owners get a flat 30% standard deduction for maintenance, plus tax deductions on home loan interest under Section 24(b).' } },
    { '@type': 'Question', name: 'Can property management fees be deducted from rental yield?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, in net rental yield calculations, property manager commissions, society maintenance fees, and annual municipal property taxes must be deducted from gross rent.' } },
    { '@type': 'Question', name: 'How does home loan EMI affect real estate cash flow?', acceptedAnswer: { '@type': 'Answer', text: 'If a property is mortgaged, monthly home loan EMI reduces net cash flow. If monthly rent exceeds EMI and maintenance, the property generates positive cash flow.' } },
    { '@type': 'Question', name: 'Why are commercial property yields higher than residential yields in India?', acceptedAnswer: { '@type': 'Answer', text: 'Commercial properties carry longer lease commitments (5 to 9 years), triple-net lease terms, and higher tenant creditworthiness, yielding 7% to 9.5% compared to 3% for residential flats.' } },
    { '@type': 'Question', name: 'How does this real estate ROI calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes gross rental yield %, net rental yield %, total rupee cashflow, capital appreciation, total ROI %, and year-by-year cashflow projections.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Real Estate ROI Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/real-estate-roi-calculator',
  description: 'Calculate real estate rental yields, maintenance expenses, capital gains, and overall investment return on investment (ROI) in India.',
  featureList: ['Combined Rental + Appreciation mode', 'Pure Rental Yield mode', 'Gross vs Net yield breakdown', 'Annual maintenance and property tax inputs', 'Donut chart income split', 'Year-by-year cashflow schedule', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Real Estate ROI and Rental Yield', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Real Estate ROI Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter property purchase price', text: 'Input total property acquisition cost including agreement value.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter monthly rental income', text: 'Input expected or current monthly rent collected from tenant.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter annual expenses', text: 'Specify annual society maintenance, property taxes, and insurance.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net yield and total ROI', text: 'View net rental yield %, capital appreciation gain, and total investment ROI %.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Real Estate ROI', alternateName: 'Property Return on Investment',
  description: 'The overall percentage return earned on a property investment through combined net rental income and capital value growth.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Return_on_investment'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Real Estate ROI Calculator: Rental Yield & Capital Gain',
  url: 'https://fermor.in/calculators/real-estate-roi-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Real Estate ROI', alternateName: 'Property Return on Investment' }],
  audience: { '@type': 'Audience', audienceType: 'Property investors, landlords, real estate buyers, financial advisors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-real-estate-roi', name: 'What Is Real Estate ROI?' },
    { '@type': 'WebPageElement', cssSelector: '#rental-yield-formula', name: 'Rental Yield Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#city-yield-comparison', name: 'Residential vs Commercial Rental Yields in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function RealEstateRoiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <RealEstateRoiClient />
    </>
  );
}

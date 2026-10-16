import type { Metadata } from 'next';
import PropertyAppreciationClient from './PropertyAppreciationClient';

const PAGE_DATE_PUBLISHED = '2026-07-28';
const PAGE_DATE_MODIFIED = '2026-07-28';

export const metadata: Metadata = {
  title: 'Property Appreciation Calculator: Real Estate CAGR & Growth',
  description: 'Free property appreciation calculator for India. Calculate real estate CAGR, total capital gain, future property value, and annual return percentage. Free to use.',
  keywords: [
    'property appreciation calculator',
    'real estate cagr calculator',
    'property value growth calculator india',
    'real estate appreciation rate calculator',
    'house value appreciation calculator',
    'calculate property cagr india',
    'real estate capital gains calculator',
    'flat price appreciation calculator',
    'land price appreciation calculator',
    'commercial property appreciation estimator',
    'property investment return calculator',
    'real estate compound growth rate india',
    'mumbai property appreciation calculator',
    'bangalore real estate growth calculator',
  ],
  openGraph: {
    title: 'Property Appreciation Calculator: Real Estate CAGR & Growth - Fermor',
    description: 'Calculate property value appreciation, annual CAGR %, total profit gains, and future real estate returns in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/property-appreciation-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-property-appreciation-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Appreciation Calculator - Fermor',
    description: 'Calculate real estate CAGR %, capital gains, and future property value in India. Free to use.',
    images: ['https://fermor.in/og-property-appreciation-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/property-appreciation-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Property Appreciation Rate', 'Real Estate CAGR', 'Capital Gains Tax Sec 54', 'Stamp Duty and Registration', 'Real Estate Indexation', 'Indian Property Market', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Property Appreciation Calculator', item: 'https://fermor.in/calculators/property-appreciation-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is property appreciation rate in real estate?', acceptedAnswer: { '@type': 'Answer', text: 'Property appreciation rate is the annual percentage increase in the market value of a real estate asset over time due to inflation, demand, infrastructure development, and location quality.' } },
    { '@type': 'Question', name: 'How is real estate CAGR calculated in India?', acceptedAnswer: { '@type': 'Answer', text: 'Real estate Compound Annual Growth Rate (CAGR) is calculated using the formula: CAGR = (Final Property Value / Initial Purchase Price)^(1 / Holding Years) - 1.' } },
    { '@type': 'Question', name: 'What is the average real estate appreciation rate in India?', acceptedAnswer: { '@type': 'Answer', text: 'Average residential property appreciation in major Indian metro cities ranges between 6% and 10% CAGR over a 10 to 15 year holding period, with developing suburban corridors experiencing higher growth spikes.' } },
    { '@type': 'Question', name: 'Does property appreciation include rental income?', acceptedAnswer: { '@type': 'Answer', text: 'No, property appreciation measures only the capital price growth of the building or land. Total real estate ROI combines capital appreciation with net rental yield.' } },
    { '@type': 'Question', name: 'How does capital improvements impact property value?', acceptedAnswer: { '@type': 'Answer', text: 'Renovations, interior upgrades, structural extensions, and modern amenities directly increase a property\'s market value and add to the cost of acquisition for tax indexation calculations.' } },
    { '@type': 'Question', name: 'How are capital gains taxed on appreciated property in India?', acceptedAnswer: { '@type': 'Answer', text: 'Long Term Capital Gains (LTCG) on property held for over 24 months are taxed under the Income Tax Act with options under Section 54 to reinvest gains into another residential house for tax exemption.' } },
    { '@type': 'Question', name: 'What factors drive real estate appreciation in Indian cities?', acceptedAnswer: { '@type': 'Answer', text: 'Key drivers include metro line expansion, highway connectivity, commercial IT park developments, civic infrastructure upgrades, and local supply-demand dynamics.' } },
    { '@type': 'Question', name: 'Is land appreciation higher than apartment appreciation?', acceptedAnswer: { '@type': 'Answer', text: 'Generally, independent plots of land appreciate faster than apartment flats because land is a scarce asset that does not suffer structural building depreciation.' } },
    { '@type': 'Question', name: 'How to calculate future property value after 10 years?', acceptedAnswer: { '@type': 'Answer', text: 'Future Property Value is calculated using compound growth: Future Value = Current Purchase Price × (1 + Appreciation Rate %)^10.' } },
    { '@type': 'Question', name: 'How does this property appreciation calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes exact property CAGR %, total capital gains, capital return percentage, and projects future year-by-year property valuations based on your inputs.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Property Appreciation Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/property-appreciation-calculator',
  description: 'Calculate real estate Compound Annual Growth Rate (CAGR), capital gains, and future property value in India.',
  featureList: ['CAGR growth calculation mode', 'Future value projection mode', 'Renovation capital improvement cost factor', 'Year-by-year value growth schedule', 'Capital return percentage breakdown', 'Donut chart value split', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Property Appreciation and Real Estate CAGR', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Property Appreciation Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter initial purchase price', text: 'Input the original purchase price or agreement value of the property.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter current or target property value', text: 'Input current market valuation or projected future property price.' },
    { '@type': 'HowToStep', position: 3, name: 'Set holding period in years', text: 'Specify the investment duration between purchase and sale.' },
    { '@type': 'HowToStep', position: 4, name: 'Review CAGR and capital gains', text: 'View exact annual CAGR percentage, total rupee gain, and year-by-year value growth.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Property Appreciation', alternateName: 'Real Estate Price Growth',
  description: 'The increase in monetary market value of a real estate property over time due to economic factors and market demand.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Capital_appreciation'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Property Appreciation Calculator: Real Estate CAGR & Growth',
  url: 'https://fermor.in/calculators/property-appreciation-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Property Appreciation', alternateName: 'Real Estate Price Growth' }],
  audience: { '@type': 'Audience', audienceType: 'Homeowners, real estate investors, property buyers, financial planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-property-appreciation', name: 'What Is a Property Appreciation Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#appreciation-formula', name: 'Real Estate CAGR Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#city-appreciation-table', name: 'Average Property Appreciation Rates by Indian City' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PropertyAppreciationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PropertyAppreciationClient />
    </>
  );
}

import type { Metadata } from 'next';
import StateWiseStampDutyClient from './StateWiseStampDutyClient';

const PAGE_DATE_PUBLISHED = '2026-07-26';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'State-Wise Stamp Duty Calculator: 28 States & UTs Rates',
  description: 'Free state-wise stamp duty calculator for India. Calculate property stamp duty, registration charges, female buyer concessions, and metro cess across Maharashtra, Karnataka, Delhi, Tamil Nadu, Telangana, UP, and all 28 states. Free to use.',
  keywords: [
    'state wise stamp duty calculator',
    'stamp duty and registration charges calculator',
    'property stamp duty calculator india',
    'stamp duty maharashtra 2026',
    'stamp duty karnataka 2026',
    'stamp duty delhi 2026',
    'stamp duty tamil nadu 2026',
    'stamp duty telangana 2026',
    'stamp duty uttar pradesh 2026',
    'stamp duty haryana gurugram 2026',
    'female buyer stamp duty rebate india',
    'metro cess on property purchase',
    'shcil e stamping calculator',
    'ready reckoner rate vs agreement value',
    'section 56 2 x stamp duty tax penalty',
    'section 50c capital gains circle rate',
    'property registration fees cap india',
    'mumbai stamp duty and metro cess',
    'bengaluru flat stamp duty 5 percent',
    'hyderabad stamp duty and transfer duty',
    'chennai guideline value stamp duty',
    'noida greater noida stamp duty charges',
    'pune property registration calculator',
    'kolkata west bengal stamp duty rebate',
    'resale flat stamp duty calculation india',
    'joint ownership stamp duty calculation',
  ],
  openGraph: {
    title: 'State-Wise Stamp Duty Calculator: 28 States & UTs Rates - Fermor',
    description: 'Calculate state-wise stamp duty and registration fees across all 28 Indian states with gender rebates and urban cess. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/state-wise-stamp-duty-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-state-wise-stamp-duty-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'State-Wise Stamp Duty Calculator - Fermor',
    description: 'Calculate property stamp duty and registration charges across all Indian states. Free to use.',
    images: ['https://fermor.in/og-state-wise-stamp-duty-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/state-wise-stamp-duty-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: [
    'Indian Stamp Act 1899',
    'State Registration Acts',
    'E-Stamping SHCIL',
    'Circle Rates and Ready Reckoner Value',
    'Section 50C and Section 56(2)(x)',
    'Women Property Concessions',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'State-Wise Stamp Duty Calculator', item: 'https://fermor.in/calculators/state-wise-stamp-duty-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is stamp duty and why is it mandatory in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stamp duty is a statutory state tax levied under the Indian Stamp Act, 1899, required to validate property ownership transfer and ensure legal admissibility of the conveyance deed in court.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which state has the lowest stamp duty in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Delhi offers one of the lowest rates at 4% for female buyers, while several North-Eastern states maintain base rates around 3% to 4%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the stamp duty rate in Maharashtra (Mumbai/Pune)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Maharashtra, urban areas like Mumbai and Pune charge 6% (5% stamp duty plus 1% Metro Cess) for male buyers and 5% for female buyers, with registration capped at Rs 30,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the stamp duty rate in Karnataka (Bengaluru)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Karnataka charges 5% stamp duty plus 10% cess and 2% surcharge (effective 5.6%) for properties above Rs 45 Lakh, alongside a 2% registration fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do women buyers get a stamp duty discount in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, states like Delhi (4% vs 6%), Uttar Pradesh (1% rebate up to Rs 10,000), Haryana (5% vs 7%), and Maharashtra (1% concession for sole female ownership) provide preferential tax rebates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is stamp duty calculated on circle rate or market value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stamp duty is legally calculated on the higher of the actual transaction agreement value or the government circle rate (ready reckoner / guideline value).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax implication if property is sold below circle rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 50C and Section 56(2)(x) of the Income Tax Act, selling below circle rate (with tolerance beyond 10%) creates deemed taxable capital gains for the seller and deemed taxable other income for the buyer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is e-stamping and how is it done in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'E-stamping is a secure, tamper-proof electronic payment system managed by Stock Holding Corporation of India Limited (SHCIL) to generate digital stamp duty certificates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can stamp duty and registration fees be included in home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, RBI housing finance guidelines strictly prohibit commercial banks from funding stamp duty and registration fees within the sanctioned home loan principal amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is metro cess on property registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metro cess is an additional 1% surcharge levied by state governments (such as Maharashtra and Karnataka) to fund regional mass transit and metro railway infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this state-wise stamp duty calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator selects verified state rates, factors in gender rebates and urban metro cess, applies statutory registration caps, and computes total government transaction outlay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'State-Wise Stamp Duty Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/state-wise-stamp-duty-calculator',
  description: 'Calculate state-wise property stamp duty, registration charges, female buyer concessions, and metro cess in India.',
  featureList: [
    '28 Indian States & UTs rate matrix',
    'Buyer gender selector (Male, Female, Joint)',
    'Urban, Rural, and Municipal area toggles',
    'Statutory registration fee cap engine (Maharashtra, UP)',
    'Metro Cess 1% calculation',
    'Circle rate vs agreement value comparison',
    'Donut chart tax breakdown',
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
  name: 'How to Calculate State-Wise Stamp Duty and Registration Charges',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor State-Wise Stamp Duty Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select State and Location', text: 'Choose your state (e.g. Maharashtra, Karnataka, Delhi) and urban/rural classification.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter Property Agreement Value', text: 'Input the higher of agreed transaction value or government circle rate.' },
    { '@type': 'HowToStep', position: 3, name: 'Select Buyer Gender Ownership', text: 'Select Male, Female, or Joint ownership to apply eligible statutory rebates.' },
    { '@type': 'HowToStep', position: 4, name: 'Review Tax & Out-of-Pocket Outlay', text: 'View exact stamp duty amount, registration fee, metro cess, and total cash required.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Stamp Duty',
  alternateName: 'Property Conveyance Stamp Tax',
  description: 'A compulsory ad-valorem transaction tax levied by Indian state governments on property conveyance deeds and sale agreements to establish legal title and court admissibility.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Stamp_duty',
    'https://www.wikidata.org/wiki/Q1052674',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'State-Wise Stamp Duty Calculator: 28 States & UTs Rates',
  url: 'https://fermor.in/calculators/state-wise-stamp-duty-calculator',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Stamp Duty', alternateName: 'Property Conveyance Stamp Tax' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Home buyers, real estate investors, advocates, chartered accountants in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-stamp-duty', name: 'What Is Stamp Duty and Registration in India?' },
    { '@type': 'WebPageElement', cssSelector: '#state-wise-rates', name: 'State-Wise Stamp Duty and Registration Rates in India' },
    { '@type': 'WebPageElement', cssSelector: '#gender-and-urban-rebates', name: 'Gender Concessions and Urban/Rural Surcharges' },
    { '@type': 'WebPageElement', cssSelector: '#ready-reckoner-vs-agreement', name: 'Circle Rate vs Market Agreement Value: Section 56(2)(x) & 50C' },
    { '@type': 'WebPageElement', cssSelector: '#e-stamping-and-payment', name: 'E-Stamping and Digital Registration Process' },
    { '@type': 'WebPageElement', cssSelector: '#state-comparison-table', name: '28 States & UTs Stamp Duty Benchmark Matrix' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This State-Wise Stamp Duty Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function StateWiseStampDutyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <StateWiseStampDutyClient />
    </>
  );
}

import type { Metadata } from 'next';
import PropertyInvestmentReturnClient from './PropertyInvestmentReturnClient';

const PAGE_DATE_PUBLISHED = '2026-07-30';
const PAGE_DATE_MODIFIED = '2026-07-30';

export const metadata: Metadata = {
  title: 'Property Investment Return Calculator: Real Estate ROI & Cap Rate',
  description: 'Free property investment return calculator for India. Calculate real estate ROI, total net profit, rental yield, cap rate, and CAGR returns on residential or commercial property. Free to use.',
  keywords: [
    'property investment return calculator',
    'real estate roi calculator india 2026',
    'property cap rate calculator',
    'net rental yield calculator india',
    'commercial property return calculator',
    'real estate cagr calculator india',
    'calculate total profit on real estate',
    'property appreciation and rental return calculator',
    'equity multiple real estate calculator',
    'leveraged real estate return calculator',
    'calculate rental yield on flat india',
    'real estate vs mutual fund return calculator',
  ],
  openGraph: {
    title: 'Property Investment Return Calculator: Real Estate ROI & Cap Rate - Fermor',
    description: 'Calculate real estate ROI, total profit, net rental yield, cap rate, and annualized CAGR growth on Indian property investments. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/property-investment-return-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-property-investment-return-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Investment Return Calculator - Fermor',
    description: 'Calculate real estate ROI, rental yields, cap rates, and total net profit on Indian properties. Free to use.',
    images: ['https://fermor.in/og-property-investment-return-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/property-investment-return-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Real Estate ROI', 'Cap Rate', 'Net Operating Income (NOI)', 'Gross Rental Yield', 'Capital Appreciation CAGR', 'Equity Multiple', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Property Investment Return Calculator', item: 'https://fermor.in/calculators/property-investment-return-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is return on investment (ROI) in real estate?', acceptedAnswer: { '@type': 'Answer', text: 'Real estate ROI measures total financial gains earned from a property (net rental cashflow plus capital appreciation) expressed as a percentage of total initial capital invested.' } },
    { '@type': 'Question', name: 'What is Cap Rate in real estate investing?', acceptedAnswer: { '@type': 'Answer', text: 'Cap Rate (Capitalization Rate) is the ratio of Net Operating Income (NOI = Gross Rent minus Operating Expenses) to property acquisition price: Cap Rate = (NOI / Property Price) × 100.' } },
    { '@type': 'Question', name: 'What is a good rental yield in Indian cities?', acceptedAnswer: { '@type': 'Answer', text: 'In India, gross residential rental yield typically ranges between 2.5% to 4.5% per year, while commercial real estate yields range higher between 6.5% to 9.5% per year.' } },
    { '@type': 'Question', name: 'How is capital appreciation calculated for property in India?', acceptedAnswer: { '@type': 'Answer', text: 'Capital appreciation is the increase in property market value over time. Annualized CAGR return is calculated as: ((Final Valuation / Initial Price)^(1 / Holding Years) - 1) × 100.' } },
    { '@type': 'Question', name: 'What is Equity Multiple in property investments?', acceptedAnswer: { '@type': 'Answer', text: 'Equity Multiple is total cash distributions received plus sale proceeds divided by initial cash invested. An equity multiple of 2.0x means your initial investment doubled.' } },
    { '@type': 'Question', name: 'How do operating expenses affect net rental yields?', acceptedAnswer: { '@type': 'Answer', text: 'Operating expenses like property taxes, society maintenance fees, insurance, and vacancy periods reduce gross rent, resulting in net operating income (NOI).' } },
    { '@type': 'Question', name: 'Is real estate leverage (home loan) good for returns?', acceptedAnswer: { '@type': 'Answer', text: 'Using a home loan increases return on equity (ROE) if capital appreciation and rental yield exceed borrowing interest rates, but increases financial risk during market downturns.' } },
    { '@type': 'Question', name: 'How does capital gains tax impact property returns in India?', acceptedAnswer: { '@type': 'Answer', text: 'Long-term capital gains (LTCG) on property held over 24 months is taxed at 12.5% without indexation (or 20% with indexation for pre-2024 assets) under Budget 2024 provisions.' } },
    { '@type': 'Question', name: 'How to calculate total net profit on property sale?', acceptedAnswer: { '@type': 'Answer', text: 'Total Net Profit = Final Sale Value + Net Cumulative Rent Received - Purchase Price - Acquisition Costs (Stamp Duty/Reg) - Operating Expenses.' } },
    { '@type': 'Question', name: 'How does this property investment return calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes total profit, net rental yield, cap rate, equity multiple, and annualized CAGR returns based on property price, rental income, expenses, and holding tenure.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Property Investment Return Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/property-investment-return-calculator',
  description: 'Calculate real estate ROI, total net profit, rental yield, cap rate, equity multiple, and CAGR growth on property investments.',
  featureList: ['Property purchase price and down payment input', 'Monthly rental income & annual expense ratio', 'Capital appreciation rate % slider', 'Holding tenure from 1 to 30 years', 'Cap rate & net rental yield breakdown', 'Annualized CAGR return %', 'Donut chart wealth breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Real Estate Investment Returns', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Property Investment Return Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Property Price', text: 'Input property purchase price and stamp duty/registration costs.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter Rental Income & Expenses', text: 'Input monthly rental income collected and annual operating expenses.' },
    { '@type': 'HowToStep', position: 3, name: 'Set Appreciation & Holding Period', text: 'Set annual capital growth % and holding tenure in years.' },
    { '@type': 'HowToStep', position: 4, name: 'Review ROI and Cap Rate', text: 'View total net profit, cap rate, equity multiple, and annualized CAGR return.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Capitalization Rate (Cap Rate)', alternateName: 'Real Estate Cap Rate',
  description: 'A fundamental real estate valuation metric calculated by dividing Net Operating Income (NOI) by current property market value.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Capitalization_rate'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Property Investment Return Calculator: Real Estate ROI & Cap Rate',
  url: 'https://fermor.in/calculators/property-investment-return-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Capitalization Rate (Cap Rate)', alternateName: 'Real Estate Cap Rate' }],
  audience: { '@type': 'Audience', audienceType: 'Real estate investors, property buyers, landlords, CAs, wealth managers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-property-return', name: 'What Is Property Investment Return?' },
    { '@type': 'WebPageElement', cssSelector: '#real-estate-metrics-table', name: 'Real Estate Metrics and Formulas' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PropertyInvestmentReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PropertyInvestmentReturnClient />
    </>
  );
}

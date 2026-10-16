import type { Metadata } from 'next';
import InflationAdjustedReturnClient from './InflationAdjustedReturnClient';
import { INFLATION_RETURN_FAQS } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/inflation-adjusted-return-calculator`;
  return {
    title: 'Inflation Adjusted Return Calculator: Real Rate',
    description:
      'Free inflation adjusted return calculator for India. Use the Fisher equation to find real returns, purchasing power and inflation erosion. Free to use.',
    keywords: [
      'inflation adjusted return calculator',
      'real rate of return calculator',
      'inflation adjusted return formula',
      'nominal return vs real return',
      'real return calculator',
      'inflation adjusted rate of return',
      'purchasing power calculator',
      'inflation calculator india',
      'real rate of return india',
      'fisher equation calculator',
      'inflation effect on investments',
      'post inflation return calculator',
      'real vs nominal return india',
      'cpi adjusted return calculator',
      'inflation erosion calculator',
      'real return on investment calculator',
      'inflation adjusted mutual fund returns',
      'real rate calculator',
      'inflation adjusted investment return',
      'inflation impact calculator india',
      'rbi cpi inflation target calculator',
      'fd real rate of return india',
      'nifty 50 inflation adjusted return',
      'retirement corpus inflation erosion',
      'excel inflation adjusted return formula',
      'negative real rate of return india',
      'investment inflation calculator',
      'inflation adjusted rate of return calculator',
      'real return on investment calculator',
      'inflation adjusted investment calculator',
      'inflation adjusted returns calculator',
      'inflation adjusted roi calculator',
      'investment return after inflation',
      'investment returns after inflation',
      'investment return adjusted for inflation',
      'returns after inflation calculator',
      'real investment return calculator',
      'return adjusted for inflation calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Inflation Adjusted Return Calculator: Calculate Real Rate of Return',
      description:
        'Enter nominal return and inflation rate to find your real return. See how inflation reduces your purchasing power over time. Free for India.',
      images: ['https://fermor.in/og-inflation-adjusted-return-calculator.png'],
    },
    openGraph: {
      title: 'Inflation Adjusted Return Calculator: Calculate Real Rate of Return',
      description:
        'Enter nominal return and inflation rate to find your real return. See how inflation reduces your purchasing power over time. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/inflation-adjusted-return-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-inflation-adjusted-return-calculator.png', width: 1200, height: 630, alt: 'Fermor Inflation Adjusted Return Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-28';
const PAGE_DATE_PUBLISHED = '2026-07-01';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Inflation',
    'Real Returns',
    'Nominal Returns',
    'Fisher Equation',
    'Purchasing Power',
    'CPI',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'XIRR',
    'SIP Returns',
    'Financial Planning India',
    'NRI Investments',
    'Tax Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: INFLATION_RETURN_FAQS.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inflation Adjusted Return Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/inflation-adjusted-return-calculator',
  description: 'Calculate real rate of return after adjusting for inflation. Enter nominal return and inflation rate to see how much purchasing power your investment actually gains. Includes year-by-year breakdown of inflation erosion.',
  featureList: [
    'Real Rate of Return Calculator',
    'Inflation Adjusted Future Value',
    'Nominal vs Real Return Comparison',
    'Inflation Erosion Breakdown',
    'Year-by-Year Inflation Impact Table',
    'Donut chart: principal versus nominal gain',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y)',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Inflation Adjusted Return Calculator', item: 'https://fermor.in/calculators/inflation-adjusted-return-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Inflation Adjusted Return',
  description: 'Step-by-step guide to calculate real rate of return after adjusting for inflation using the Fisher equation.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Inflation Adjusted Return Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your initial investment amount',
      text: 'Enter the amount you invested or plan to invest. This is the starting principal.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter the nominal return rate',
      text: 'Enter the expected or actual nominal annual return rate. For a mutual fund, use its CAGR or XIRR. For an FD, use the interest rate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter the inflation rate',
      text: 'Enter an inflation assumption that suits your planning period. Test more than one scenario because future inflation is not known in advance.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select the investment time period',
      text: 'Choose how many years the investment will be held. Use the year presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y) or drag the slider.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Check your real return and inflation erosion',
      text: 'The calculator shows the nominal future value, real future value, real rate of return, and the amount of purchasing power lost to inflation. Expand the year-by-year table to see the impact of inflation in each year.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Inflation-Adjusted Return',
  alternateName: 'Real Rate of Return',
  description: 'The annualised rate of return on an investment after removing the effect of inflation. It is calculated using the Fisher equation: (1 + nominal rate) divided by (1 + inflation rate) minus 1. The real return reflects the actual increase in purchasing power.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Real_rate_of_return',
    'https://en.wikipedia.org/wiki/Fisher_equation',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Inflation Adjusted Return Calculator: Calculate Real Rate of Return',
  description: 'Free inflation adjusted return calculator for India. Enter nominal return and inflation rate to find your real return. See how inflation reduces your purchasing power over time.',
  url: 'https://fermor.in/calculators/inflation-adjusted-return-calculator',
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
    { '@type': 'DefinedTerm', name: 'Inflation-Adjusted Return', alternateName: 'Real Rate of Return' },
    { '@type': 'DefinedTerm', name: 'Nominal Return' },
    { '@type': 'DefinedTerm', name: 'Fisher Equation' },
    { '@type': 'DefinedTerm', name: 'Purchasing Power' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors, fixed deposit investors, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-inflation-adjusted-return', name: 'What Is Inflation Adjusted Return' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-adjusted-return-formula', name: 'Inflation Adjusted Return Formula' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-adjusted-return-excel', name: 'Inflation Adjusted Return in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-inflation-adjusted-calculator', name: 'Reverse Real Return Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#nominal-return-vs-real-return', name: 'Nominal Return vs Real Return' },
    { '@type': 'WebPageElement', cssSelector: '#fd-vs-equity-real-return', name: 'Real Return on Fixed Deposits vs Equities' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-erosion-retirement', name: 'Impact of Inflation Erosion on Retirement' },
    { '@type': 'WebPageElement', cssSelector: '#nri-real-return', name: 'Real Rate of Return for NRI Investors' },
    { '@type': 'WebPageElement', cssSelector: '#sip-inflation-adjusted-return', name: 'Inflation Adjusted Return for SIPs' },
    { '@type': 'WebPageElement', cssSelector: '#real-return-limitations', name: 'Limitations of Real Return Calculations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Inflation Adjusted Return Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#real-return-cheat-sheet', name: 'Real Return at Different Inflation Rates' },
    { '@type': 'WebPageElement', cssSelector: '#purchasing-power-loss', name: 'Purchasing Power of Rs 1 Lakh' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Fisher Equation Example' },
    { '@type': 'WebPageElement', cssSelector: '#fisher-exact-vs-approximate', name: 'Exact Fisher Equation versus Approximation' },
    { '@type': 'WebPageElement', cssSelector: '#required-return', name: 'Required Nominal Return' },
    { '@type': 'WebPageElement', cssSelector: '#post-tax-real-return', name: 'Post-Tax Real Return' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-assumption', name: 'Choosing an Inflation Assumption' },
    { '@type': 'WebPageElement', cssSelector: '#real-return-mistakes', name: 'Common Real-Return Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#who-should-use', name: 'Who Should Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#related-calculators', name: 'Related Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function InflationAdjustedReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <InflationAdjustedReturnClient />
    </>
  );
}

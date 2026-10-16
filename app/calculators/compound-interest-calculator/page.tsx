import type { Metadata } from 'next';
import CompoundInterestCalculatorClient from './CompoundInterestCalculatorClient';
import { FAQ_ITEMS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-07-15';
const PAGE_DATE_MODIFIED = '2026-09-10';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator India: Formula, Rupees & Growth',
  description: 'Free compound interest calculator for India. See monthly, quarterly, half-yearly, or yearly compounding growth in rupees, with a year-wise schedule. Free to use.',
  keywords: [
    'compound interest calculator',
    'compound interest calculator india',
    'compound interest calculator in indian rupees',
    'compound interest calculator in rupees',
    'monthly compound interest calculator',
    'monthly compound interest calculator india',
    'yearly compound calculator',
    'yearly compound interest calculator',
    'compound return calculator',
    'compound interest rate calculator',
    'complex interest calculator',
    'compound interest formula calculator',
    'quarterly compound interest calculator',
    'compound interest calculator with monthly compounding',
    'compound interest growth calculator',
    'compound interest calculator online',
    'compound interest calculator excel',
    'compound interest formula excel',
    'compound interest vs simple interest calculator',
    'daily compound interest calculator',
    'half yearly compound interest calculator',
    'compound interest calculator for investment',
    'compound annual growth rate calculator',
    'annual compound growth rate calculator',
    'compound growth rate calculator',
    'lump sum compound interest calculator',
    'lumpsum compound interest calculator',
    'sip compound interest calculator',
    'compound interest calculator on sip',
    'compound interest calculator for mutual fund',
    'power of compounding calculator',
    'compound interest calculator with formula',
    'how to calculate compound interest',
    'compound interest calculator india online',
  ],
  openGraph: {
    title: 'Compound Interest Calculator India: Formula, Rupees & Growth - Fermor',
    description: 'See how your money grows with monthly, quarterly, half-yearly, or yearly compounding. Year-wise growth schedule, in rupees. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/compound-interest-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-compound-interest-calculator.png', width: 1200, height: 630, alt: 'Fermor Compound Interest Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator India - Fermor',
    description: 'Calculate compound interest with monthly, quarterly, half-yearly, or yearly compounding. Free to use.',
    images: ['https://fermor.in/og-compound-interest-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/compound-interest-calculator',
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
    'Compound Interest',
    'Simple Interest',
    'Investment Planning',
    'Wealth Building',
    'Fixed Deposits',
    'Mutual Funds',
    'Retirement Planning',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Compound Interest Calculator', item: 'https://fermor.in/calculators/compound-interest-calculator' },
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
  name: 'Compound Interest Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/compound-interest-calculator',
  description: 'Calculate how a lump sum grows with compound interest, with yearly, half-yearly, quarterly, or monthly compounding and a year-wise growth schedule.',
  featureList: [
    'Yearly, half-yearly, quarterly, and monthly compounding',
    'Effective annual rate',
    'Rule of 72 doubling-time estimate',
    'Year-wise growth schedule',
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
  name: 'How to Calculate Compound Interest',
  description: 'Step-by-step guide to calculating compound interest on a lump sum using the Compound Interest Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Compound Interest Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the principal amount', text: 'Enter the lump sum you plan to invest, using the slider or by clicking the value to type an exact figure.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the rate of interest', text: 'Enter the expected annual return rate. For equity funds, 10 to 12% is a reasonable long-term assumption.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the time period', text: 'Choose the number of years the money stays invested. Longer periods increase the compounding effect sharply.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose compounding frequency', text: 'Select yearly, half-yearly, quarterly, or monthly compounding to match your investment.' },
    { '@type': 'HowToStep', position: 5, name: 'Review results', text: 'Read the maturity amount, total interest, effective annual rate, and doubling time, then expand the growth schedule for a year-by-year view.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Compound Interest',
  description: 'Interest calculated on the initial principal and on all interest accumulated from previous periods, causing an investment to grow at an accelerating rate over time.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Compound_interest',
    'https://www.wikidata.org/wiki/Q186429',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Compound Interest Calculator India',
  description: 'Free compound interest calculator for India. See how a lump sum grows with different compounding frequencies, in rupees.',
  url: 'https://fermor.in/calculators/compound-interest-calculator',
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
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, students, bank and mutual fund customers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-compound-interest', name: 'What Is Compound Interest' },
    { '@type': 'WebPageElement', cssSelector: '#ci-formula', name: 'Compound Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#ci-formula-excel', name: 'Compound Interest Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#ci-vs-si', name: 'Compound Interest vs Simple Interest' },
    { '@type': 'WebPageElement', cssSelector: '#compounding-frequency', name: 'How Compounding Frequency Changes Returns' },
    { '@type': 'WebPageElement', cssSelector: '#rule-of-72', name: 'The Rule of 72' },
    { '@type': 'WebPageElement', cssSelector: '#ci-indian-investments', name: 'Compound Interest in Popular Indian Investments' },
    { '@type': 'WebPageElement', cssSelector: '#ci-vs-sip', name: 'Compound Interest Calculator vs SIP Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#ci-tax', name: 'How Compound Interest Is Taxed in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CompoundInterestCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CompoundInterestCalculatorClient />
    </>
  );
}

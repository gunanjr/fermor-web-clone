import type { Metadata } from 'next';
import LumpsumCalculatorClient from './LumpsumCalculatorClient';
import { faqItems } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-20';
const PAGE_DATE_MODIFIED = '2026-09-09';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator: Mutual Fund Maturity & Returns',
  description: 'Free lumpsum calculator for India. Calculate mutual fund maturity value, returns, and SIP + lumpsum combined growth with a year-wise table. Free to use.',
  keywords: [
    'lumpsum calculator',
    'lump sum calculator',
    'lumpsum',
    'lumpsum amount',
    'lumpsum investment',
    'lumpsum investment calculator',
    'lump sum investment calculator',
    'lumpsum mutual fund calculator',
    'mutual fund lumpsum calculator',
    'mutual fund calculator lumpsum',
    'lumpsum calculator mutual fund',
    'lump sum mutual fund calculator',
    'mf lumpsum calculator',
    'mf lump sum calculator',
    'mf calculator lumpsum',
    'lumpsum mf calculator',
    'mutual fund lump sum calculator',
    'lumpsum return calculator',
    'return calculator lumpsum',
    'lumpsum maturity calculator',
    'lump sum maturity calculator',
    'mutual fund return calculator lumpsum',
    'calculate lumpsum return',
    'lumpsum returns',
    'lump sum amount calculator',
    'lump sum sip calculator',
    'sip lumpsum calculator',
    'sip and lumpsum calculator',
    'sip plus lumpsum calculator',
    'lump sum plus sip calculator',
    'lumpsum sip calculator',
    'lumpsum calculator sip',
    'sip with lumpsum calculator',
    'lumpsum sip investment',
    'lumpsum and sip',
    'lump sum investment plan',
    'lumpsum investment plans',
    'one time lump sum investment plan',
    'lump sum investment in mutual fund',
    'lumpsum investment in mutual fund',
    'lump sum amount investment in mutual fund',
    'best way to invest lump sum',
    'best investment for lump sum amount',
    'best investment for lump sum',
    'invest lumpsum amount in mutual fund',
    'invest lumpsum in mutual funds',
    'future value calculator lump sum',
    'future lump sum calculator',
    'lumpsum compound interest calculator',
    'lump sum compound interest calculator',
    'lump sum compounding calculator',
    'lumpsum compounding calculator',
    'compound interest lumpsum calculator',
    'lump sum interest calculator',
    'lumpsum interest calculator',
    'lump sum interest rate calculator',
    'lump sum cagr calculator',
    'cagr calculator lumpsum',
    'cagr lumpsum calculator',
    'lumpsum calculator with inflation',
    'lumpsum swp calculator',
    'lump sum ppf calculator',
    'ppf calculator lump sum',
    'sip calculator for lumpsum',
    'sip calculator with lump sum',
    'sip calculator lump sum amount',
    'yearly lumpsum calculator',
    'lumpsum calculator 40 years',
    'lumpsum calculator 50 years',
    'investment calculator lump sum',
    'calculate lump sum investment',
    'lump sum amount in mutual fund',
    'lumpsum calculator online',
    'online lumpsum calculator',
    'calculator lumpsum',
  ],
  openGraph: {
    title: 'Lumpsum Calculator: Mutual Fund Maturity & Returns - Fermor',
    description: 'Calculate mutual fund lumpsum returns, maturity amount, and year-wise corpus growth. Model SIP + lumpsum combined. Free, no sign-up required to calculate.',
    type: 'website',
    url: 'https://fermor.in/calculators/lumpsum-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-lumpsum-calculator.png', width: 1200, height: 630, alt: 'Fermor Lumpsum Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumpsum Calculator: Mutual Fund Maturity & Returns',
    description: 'Calculate lumpsum mutual fund returns and year-wise growth. Lumpsum vs SIP, and SIP + lumpsum combined. Free for India.',
    images: ['https://fermor.in/og-lumpsum-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/lumpsum-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Lumpsum Investment',
    'Mutual Fund Returns India',
    'SIP vs Lumpsum',
    'CAGR Calculation',
    'Rolling and Trailing Returns',
    'AMFI Guidelines',
    'SEBI Mutual Fund Regulations',
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
    { '@type': 'ListItem', position: 3, name: 'Lumpsum Calculator', item: 'https://fermor.in/calculators/lumpsum-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lumpsum Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/lumpsum-calculator',
  description: 'Calculate mutual fund lumpsum returns, maturity amount, and year-wise corpus growth. Also model SIP + lumpsum combined scenarios and reverse lumpsum targets.',
  featureList: [
    'Lumpsum maturity calculation (A = P x (1+r)^t)',
    'SIP + Lumpsum combined calculator',
    'Year-by-year corpus growth table',
    'CAGR-based projection',
    'Lumpsum vs SIP comparison',
    'Reverse lumpsum target calculation',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y)',
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
  name: 'How to Calculate Lumpsum Mutual Fund Returns',
  description: 'Step-by-step guide to calculate lumpsum investment returns, year-wise corpus growth, and SIP + lumpsum combined scenarios.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Lumpsum Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose Lumpsum or SIP + Lumpsum', text: 'Pick the Lumpsum tab for a single one-time investment, or the SIP + Lumpsum tab to model a lumpsum plus an ongoing monthly investment together.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your investment amount', text: 'Enter the one-time principal you plan to invest. In the combined tab, also enter the monthly SIP amount you plan to run alongside it.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the expected annual return', text: 'Enter the expected annual return rate. For equity index funds, 10 to 12% is a reasonable estimate. For actively managed flexicap funds, 12 to 15% may apply based on historical AMFI category data.' },
    { '@type': 'HowToStep', position: 4, name: 'Set the investment period', text: 'Enter the number of years you plan to stay invested, or use the year presets for quick comparison. Longer duration means more compounding impact.' },
    { '@type': 'HowToStep', position: 5, name: 'Review results and year-by-year table', text: 'See the maturity amount, estimated returns, and wealth gain. Expand the year-by-year growth table to see how your corpus builds over time.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Lumpsum Investment',
  alternateName: 'One-time Investment',
  description: 'A single, one-time investment of a large amount into a mutual fund or financial instrument, as opposed to periodic SIP investments, where the full corpus begins compounding immediately from the investment date.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Lump_sum',
    'https://www.wikidata.org/wiki/Q6700230',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Lumpsum Calculator: Mutual Fund Maturity & Returns',
  description: 'Free lumpsum calculator. Calculate mutual fund lumpsum returns, year-wise growth, and SIP + lumpsum combined scenarios.',
  url: 'https://fermor.in/calculators/lumpsum-calculator',
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
    { '@type': 'DefinedTerm', name: 'Lumpsum Investment', alternateName: 'One-time Mutual Fund Investment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-lumpsum', name: 'What Is a Lumpsum Investment' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-formula', name: 'Lumpsum Calculator Formula' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-formula-excel', name: 'Lumpsum Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-lumpsum', name: 'Reverse Lumpsum Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#types-of-returns', name: 'Types of Mutual Fund Returns' },
    { '@type': 'WebPageElement', cssSelector: '#sip-plus-lumpsum', name: 'SIP + Lumpsum Combined Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-vs-sip', name: 'Lumpsum vs SIP' },
    { '@type': 'WebPageElement', cssSelector: '#best-lump-sum-investment-plans', name: 'Best Lump Sum Investment Plans in India' },
    { '@type': 'WebPageElement', cssSelector: '#return-rate', name: 'What Return Rate to Use' },
    { '@type': 'WebPageElement', cssSelector: '#tax-on-lumpsum', name: 'Tax on Lumpsum Returns' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-for-stocks', name: 'Lumpsum Calculator for Stocks' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of the Lumpsum Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LumpsumCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <LumpsumCalculatorClient />
    </>
  );
}

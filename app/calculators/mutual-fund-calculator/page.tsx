import type { Metadata } from 'next';
import MutualFundCalculatorClient from './MutualFundCalculatorClient';
import { faqItems } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-14';
const PAGE_DATE_MODIFIED = '2026-09-15';

export const metadata: Metadata = {
  title: 'Mutual Fund Returns Calculator: SIP & Lumpsum',
  description: 'Free mutual fund returns calculator for India. Calculate SIP or lumpsum growth, view a year-by-year corpus table, and compare fund category returns. Free to use.',
  keywords: [
    'mutual fund calculator',
    'mutual fund returns calculator',
    'mutual fund return calculator',
    'mf calculator',
    'mutual fund interest calculator',
    'online mutual fund calculator',
    'mutual fund investment calculator',
    'mutual fund growth calculator',
    'mutual fund calculator india',
    'mutual funds return rate',
    'mutual fund sip calculator',
    'lumpsum mutual fund calculator',
    'mutual fund sip return calculator',
    'equity mutual fund calculator',
    'mutual fund maturity calculator',
    'mutual fund cagr calculator',
    'one time investment mutual fund calculator',
    'mutual fund calculator for 10 years',
    'direct mutual fund calculator',
    'mutual fund calculation formula',
    'best mutual fund calculator',
    'nri mutual fund calculator',
    'mutual fund estimator',
    'fund calculator',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/mutual-fund-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mutual Fund Returns Calculator: SIP & Lumpsum',
    description: 'Calculate mutual fund returns for SIP or lumpsum investments at any rate and duration. Year-by-year corpus table, fund category benchmarks, tax guide. Free for India.',
    images: ['https://fermor.in/og-mutual-fund-calculator.png'],
  },
  openGraph: {
    title: 'Mutual Fund Returns Calculator: SIP & Lumpsum',
    description: 'Calculate mutual fund returns for SIP or lumpsum investments at any rate and duration. Year-by-year corpus table, fund category benchmarks, tax guide. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/mutual-fund-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-mutual-fund-calculator.png', width: 1200, height: 630, alt: 'Fermor Mutual Fund Returns Calculator' }],
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Mutual Fund Returns',
    'SIP Returns',
    'Compound Annual Growth Rate',
    'Net Asset Value',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'Tax Planning India',
    'NRI Investments',
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
  name: 'Mutual Fund Returns Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/mutual-fund-calculator',
  description: 'Calculate mutual fund returns for lumpsum or SIP investments at any return rate and duration. Includes year-by-year growth table, fund category benchmarks, and tax guide. Free, browser-based, no sign-up.',
  featureList: [
    'Lumpsum Returns Calculator',
    'Monthly SIP Returns Calculator',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Fund category return benchmarks',
    'Duration up to 40 years',
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
    { '@type': 'ListItem', position: 3, name: 'Mutual Fund Returns Calculator', item: 'https://fermor.in/calculators/mutual-fund-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Mutual Fund Returns',
  description: 'Step-by-step guide to projecting mutual fund returns for a lumpsum or SIP investment using the mutual fund returns calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Mutual Fund Returns Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose Lumpsum or Monthly SIP', text: 'Select Lumpsum for a one-time investment or Monthly SIP for a fixed recurring monthly investment.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the investment amount', text: 'For lumpsum, enter the total amount. For SIP, enter the monthly instalment amount.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the expected return rate and duration', text: 'Enter an assumed annual return rate based on the fund category, and the number of years you plan to stay invested.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the projected corpus', text: 'The calculator shows the total value, amount invested, and estimated returns, with a year-by-year growth table available on expand.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Mutual Fund',
  alternateName: 'MF',
  description: 'A mutual fund pools money from multiple investors and invests it in stocks, bonds, or other securities, managed by a SEBI-registered asset management company on behalf of unit holders.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Mutual_fund',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mutual Fund Returns Calculator: SIP & Lumpsum',
  description: 'Free mutual fund returns calculator for India. Calculate SIP or lumpsum growth, view a year-by-year corpus table, and compare fund category returns.',
  url: 'https://fermor.in/calculators/mutual-fund-calculator',
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
    { '@type': 'DefinedTerm', name: 'Mutual Fund', alternateName: 'MF' },
    { '@type': 'DefinedTerm', name: 'SIP', alternateName: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'Lumpsum Investment' },
    { '@type': 'DefinedTerm', name: 'Net Asset Value', alternateName: 'NAV' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-mutual-fund-calculator', name: 'What Is a Mutual Fund Returns Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#mutual-fund-return-formula', name: 'Mutual Fund Return Formula: Lumpsum and SIP' },
    { '@type': 'WebPageElement', cssSelector: '#mutual-fund-formula-excel', name: 'Mutual Fund Return Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#sip-vs-lumpsum', name: 'SIP vs Lumpsum' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-mutual-fund-calculator', name: 'Reverse Calculation for a Target Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#mutual-fund-returns-by-category', name: 'Expected Returns by Fund Category' },
    { '@type': 'WebPageElement', cssSelector: '#mutual-fund-tax', name: 'Tax on Mutual Fund Returns' },
    { '@type': 'WebPageElement', cssSelector: '#direct-vs-regular-plans', name: 'Direct vs Regular Plans' },
    { '@type': 'WebPageElement', cssSelector: '#nav-and-expense-ratio', name: 'NAV and Expense Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function MutualFundCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <MutualFundCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import FDCalculatorClient from './FDCalculatorClient';
import { FAQ_ITEMS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-20';
const PAGE_DATE_MODIFIED = '2026-09-09';

export const metadata: Metadata = {
  title: 'FD Calculator: Fixed Deposit Maturity & Interest Calculator',
  description: 'Free FD calculator for India. Calculate fixed deposit maturity amount and total interest with quarterly compounding, plus a year-by-year growth schedule. Free to use.',
  keywords: [
    'fd calculator',
    'fixed deposit calculator',
    'fd interest calculator',
    'fixed deposit interest calculator',
    'fd maturity calculator',
    'fixed deposit maturity calculator',
    'fd return calculator',
    'term deposit calculator',
    'term deposit interest calculator',
    'term deposit rates calculator',
    'recurring deposit calculator',
    'fd calculator sbi',
    'fd calculator hdfc',
    'icici fd calculator',
    'axis bank fd calculator',
    'post office fd calculator',
    'bajaj fd calculator',
    'bajaj finance fd calculator',
    'sbi annuity deposit scheme calculator',
    'fd calculator for senior citizens',
    'fd interest rate calculator',
    'fd calculation formula',
    'how to calculate fd interest',
    'how to calculate fixed deposit maturity',
    'fixed deposit interest calculation',
    'fd compounding calculator',
    'fd monthly interest calculator',
    'fd yearly interest calculator',
    'online fd calculator',
    'fixed deposit calculator india',
    'fd calculator online',
    'tds on fd interest',
    'fd vs rd',
  ],
  openGraph: {
    title: 'FD Calculator: Fixed Deposit Maturity & Interest Calculator - Fermor',
    description: 'Calculate FD maturity amount and total interest with quarterly compounding. Year-by-year growth schedule. Free, no sign-up required to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/fd-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-fd-calculator.png', width: 1200, height: 630, alt: 'Fermor FD Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FD Calculator: Fixed Deposit Maturity & Interest - Fermor',
    description: 'Calculate FD maturity with quarterly compounding and a year-by-year growth schedule. Free to use.',
    images: ['https://fermor.in/og-fd-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/fd-calculator',
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
    'Fixed Deposit Interest Rates',
    'Quarterly Compounding',
    'Term Deposits',
    'Post Office Time Deposit',
    'TDS on FD Interest',
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
    { '@type': 'ListItem', position: 3, name: 'FD Calculator', item: 'https://fermor.in/calculators/fd-calculator' },
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
  name: 'FD Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/fd-calculator',
  description: 'Calculate fixed deposit maturity amount and total interest with quarterly compounding.',
  featureList: [
    'Quarterly compounding FD maturity calculation',
    'Effective annual yield',
    'Year-by-year growth schedule',
    'Year tenure presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 25Y)',
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
  name: 'How to Calculate Fixed Deposit Maturity Amount',
  description: 'Step-by-step guide to calculate FD maturity with quarterly compounding using the FD Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor FD Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your investment amount', text: 'Enter the lump sum you want to deposit. This is your FD principal.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the interest rate', text: 'Enter the annual interest rate quoted by your bank for the tenure you plan to choose.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the tenure', text: 'Set the FD tenure in years or months, or pick a year preset. Interest rates vary by tenure, so compare across periods before deciding.' },
    { '@type': 'HowToStep', position: 4, name: 'Review results', text: 'See the maturity amount, interest earned, and effective annual yield. Expand the growth schedule to see the year-by-year build-up.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Fixed Deposit',
  alternateName: 'FD',
  description: 'A financial instrument offered by Indian banks, NBFCs, and the Post Office where a lump sum is deposited for a fixed tenure at a predetermined interest rate, compounded quarterly in India.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Fixed_deposit',
    'https://www.wikidata.org/wiki/Q3075499',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'FD Calculator: Fixed Deposit Maturity and Interest Calculator',
  description: 'Free FD calculator. Calculate fixed deposit maturity and total interest with quarterly compounding.',
  url: 'https://fermor.in/calculators/fd-calculator',
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
    { '@type': 'DefinedTerm', name: 'Fixed Deposit', alternateName: 'FD' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, senior citizens, bank customers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-fd', name: 'What Is a Fixed Deposit' },
    { '@type': 'WebPageElement', cssSelector: '#fd-formula', name: 'FD Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#fd-formula-excel', name: 'FD Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#fd-rates', name: 'How Banks Structure FD Interest Rates' },
    { '@type': 'WebPageElement', cssSelector: '#tds', name: 'TDS on FD Interest' },
    { '@type': 'WebPageElement', cssSelector: '#tax-saving-fd', name: 'Tax Saving FD' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen', name: 'Senior Citizen FD Rates' },
    { '@type': 'WebPageElement', cssSelector: '#fd-vs-rd', name: 'FD vs RD' },
    { '@type': 'WebPageElement', cssSelector: '#fd-vs-market', name: 'FD vs Market-Linked Investments' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This FD Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function FDCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <FDCalculatorClient />
    </>
  );
}

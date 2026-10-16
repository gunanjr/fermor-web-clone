import type { Metadata } from 'next';
import CAGRCalculatorClient from './CAGRCalculatorClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/cagr-calculator`;
  return {
    title: 'CAGR Calculator: Compound Annual Growth Rate Calculator',
    description:
      'Free CAGR calculator for India. Calculate CAGR %, find future value of a lumpsum, or use the reverse CAGR calculator to find duration. Includes CAGR formula in Excel, year-by-year growth table, and benchmark comparison. Free to use.',
    keywords: [
      'cagr calculator',
      'compound annual growth rate calculator',
      'cagr formula',
      'reverse cagr calculator',
      'cagr growth rate calculator',
      'cagr calculation calculator',
      'compound growth rate calculator',
      'lumpsum cagr calculator',
      'cagr rate calculator',
      'cagr calculator online',
      'cagr formula excel',
      'monthly cagr calculator',
      'cagr equation',
      'compound annual growth formula',
      'calculate compound growth',
      'cagr calculator for stocks',
      'mutual fund cagr calculator',
      'cagr calculator india',
      'cagr calculation excel',
      'compound growth formula',
      '5 year cagr calculator',
      '10 year cagr calculator',
      'nri cagr calculator',
      'sip cagr calculator',
      'cagr calculator for sip investment',
      'cagr return calculator',
      'stock cagr calculator',
      'compound annual rate calculator',
      'cumulative annual growth rate calculator',
      'compound average growth rate calculator',
      'cagr calculator lumpsum',
      'cagr formula for sip',
      'cagr sip calculator',
      'lump sum cagr calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'CAGR Calculator: Compound Annual Growth Rate Calculator',
      description:
        'Calculate CAGR %, project future value, or reverse CAGR to find duration. CAGR formula in Excel, year-by-year table, benchmarks. Free for India.',
      images: ['https://fermor.in/og-cagr-calculator.png'],
    },
    openGraph: {
      title: 'CAGR Calculator: 3-in-1 Compound Annual Growth Rate Calculator',
      description:
        'Calculate CAGR %, project future value of a lumpsum, or use reverse CAGR to find duration. Includes CAGR formula in Excel, year-by-year table, benchmark comparison, and multi-currency support. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/cagr-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-cagr-calculator.png', width: 1200, height: 630, alt: 'Fermor CAGR Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-06-10';

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
    'Compound Annual Growth Rate',
    'Mutual Fund Returns',
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
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CAGR Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/cagr-calculator',
  description: 'Calculate CAGR %, find future investment value, or use reverse CAGR to find duration. Includes CAGR formula in Excel, year-by-year compounding table, benchmark comparison, and multi-currency support. Free, browser-based, no sign-up.',
  featureList: [
    'CAGR % Calculator',
    'Future Value Calculator',
    'Reverse CAGR Calculator (Duration)',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'CAGR benchmarks for Indian markets',
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
    { '@type': 'ListItem', position: 3, name: 'CAGR Calculator', item: 'https://fermor.in/calculators/cagr-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate CAGR',
  description: 'Step-by-step guide to calculate Compound Annual Growth Rate using the CAGR formula, this calculator, or Excel.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor CAGR Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Note your initial investment value',
      text: 'Record the starting value of your investment: the amount you originally invested (PV or Present Value).',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Find the final or current value',
      text: 'Note the current or ending value of the investment (FV or Future Value).',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Count the number of years',
      text: 'Determine how many years passed between your start date and end date. This is n in the formula.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Apply the CAGR formula',
      text: 'CAGR = (Final Value / Initial Value) to the power of (1 / n) minus 1. Multiply by 100 for the percentage. In Excel: =RRI(n, Start, End).',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'CAGR',
  alternateName: 'Compound Annual Growth Rate',
  description: 'The annualised rate of return that produces the same end result as the actual investment over the same time period, assuming profits are reinvested at the end of each year.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Compound_annual_growth_rate',
    'https://www.wikidata.org/wiki/Q2715042',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'CAGR Calculator: Compound Annual Growth Rate Calculator',
  description: 'Free CAGR calculator for India. Calculate CAGR %, project future value of a lumpsum, or use reverse CAGR to find duration. Includes year-by-year growth table, CAGR formula in Excel, and benchmark comparison.',
  url: 'https://fermor.in/calculators/cagr-calculator',
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
    { '@type': 'DefinedTerm', name: 'CAGR', alternateName: 'Compound Annual Growth Rate' },
    { '@type': 'DefinedTerm', name: 'XIRR' },
    { '@type': 'DefinedTerm', name: 'Mutual Fund Returns' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors, stock investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-cagr',        name: 'What Is CAGR' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-formula',        name: 'CAGR Formula' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-excel',          name: 'CAGR Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-cagr',        name: 'Reverse CAGR Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#monthly-cagr',        name: 'Monthly CAGR' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-cagr',        name: 'Lumpsum CAGR Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-vs-absolute-return', name: 'CAGR vs Absolute Return' },
    { '@type': 'WebPageElement', cssSelector: '#good-cagr-india',     name: 'Good CAGR for India' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-mutual-funds',   name: 'CAGR for Mutual Funds' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-stocks',         name: 'CAGR for Stocks' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-vs-xirr',        name: 'CAGR vs XIRR vs IRR' },
    { '@type': 'WebPageElement', cssSelector: '#why-this-calculator', name: 'Why Use This CAGR Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                 name: 'Frequently Asked Questions' },
  ],
};

export default async function CAGRCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CAGRCalculatorClient />
    </>
  );
}

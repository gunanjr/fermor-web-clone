import type { Metadata } from 'next';
import SimpleAndCompoundInterestCalculatorClient from './SimpleAndCompoundInterestCalculatorClient';
import { FAQ_ITEMS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-09-28';
const PAGE_DATE_MODIFIED = '2026-09-28';
const canonical = 'https://fermor.in/calculators/simple-and-compound-interest-calculator';

export const metadata: Metadata = {
  title: 'Simple and Compound Interest Calculator: Compare Instantly',
  description: 'Free simple and compound interest calculator for India. Compare SI vs CI side by side, convert between rates, and see year-by-year growth. Free to use.',
  keywords: [
    'simple compound interest calculator',
    'simple and compound interest calculator',
    'simple interest compound interest calculator',
    'simple interest and compound interest calculator',
    'compound and simple interest calculator',
    'simple to compound interest calculator',
    'compound vs simple interest calculator',
    'compound interest vs simple interest calculator',
    'simple versus compound interest calculator',
    'simple interest vs compound interest calculator',
    'simple interest vs compound calculator',
    'simple vs compound interest calculator',
    'interest calculator simple and compound',
    'simple interest vs compound interest loan calculator',
    'simple interest to compound interest calculator',
    'compound to simple interest calculator',
    'simple vs compound interest loan calculator',
    'simple interest vs compound interest emi calculator',
    'compound interest calculator vs simple',
    'difference between simple interest and compound interest calculator',
    'simple and compound interest emi calculator',
    'compound interest calculator simple',
    'simple and compound interest calculator online',
    'simple compound interest formula calculator',
    'simple compound interest calculator monthly',
    'simple interest rate to compound interest rate calculator',
    'compound interest to simple interest calculator',
    'difference between simple and compound interest calculator',
    'home loan simple interest vs compound interest calculator',
    'simple interest and compound interest calculator excel',
    'emi calculator simple interest and compound interest',
    'simple interest calculator vs compound interest',
    'compound interest and simple interest formula calculator',
    'simple interest and compound interest calculator india',
    'compound interest and simple interest calculator',
  ],
  alternates: { canonical },
  openGraph: {
    title: 'Simple and Compound Interest Calculator: Compare Instantly',
    description: 'Compare simple interest and compound interest on the same principal, rate, and time period, with a converter between simple and compound rates.',
    type: 'website', url: canonical, siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-simple-and-compound-interest-calculator.png', width: 1200, height: 630, alt: 'Simple and Compound Interest Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple and Compound Interest Calculator - Fermor',
    description: 'Compare simple interest and compound interest side by side, and convert between the two rates. Free for India.',
    images: ['https://fermor.in/og-simple-and-compound-interest-calculator.png'],
  },
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Simple Interest', 'Compound Interest', 'Fixed Deposits', 'Section 194A TDS',
    'Personal Finance India', 'Account Aggregator Framework', 'SEBI Regulations', 'RBI Regulations',
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Simple and Compound Interest Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: canonical,
  description: 'Compare simple interest and compound interest on the same principal, rate, and time period, with a year-by-year comparison chart and a rate converter between simple and compound rates.',
  featureList: [
    'Simple interest and compound interest calculated together',
    'Yearly, half-yearly, quarterly, and monthly compounding',
    'Simple-to-compound and compound-to-simple rate converter',
    'Year-by-Year Comparison chart and table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
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
    { '@type': 'ListItem', position: 3, name: 'Simple and Compound Interest Calculator', item: canonical },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Simple and Compound Interest',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Simple and Compound Interest Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the principal', text: 'Enter the amount you plan to invest or borrow.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the rate', text: 'Enter the annual interest rate, applied to both the simple and compound interest calculations.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the time period', text: 'Set the number of years, or pick a preset year button.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose compounding frequency', text: 'Select yearly, half-yearly, quarterly, or monthly for the compound interest side of the comparison.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the comparison', text: 'Review the simple interest total, the compound interest total, and the extra amount earned by compounding, then expand the Year-by-Year Comparison for the full schedule.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Compound Interest',
  alternateName: 'CI',
  description: 'Interest calculated on the principal plus all interest already earned in previous periods, compared here against simple interest, which is calculated only on the original principal.',
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
  name: 'Simple and Compound Interest Calculator',
  description: 'Free simple and compound interest calculator for India. Compare both methods on the same principal, rate, and time period, and convert between simple and compound rates.',
  url: canonical,
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
    { '@type': 'DefinedTerm', name: 'Simple Interest', alternateName: 'SI' },
    { '@type': 'DefinedTerm', name: 'Compound Interest', alternateName: 'CI' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, borrowers, NRI investors, students',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-the-difference', name: 'What Is the Difference Between Simple and Compound Interest' },
    { '@type': 'WebPageElement', cssSelector: '#simple-interest-formula', name: 'Simple Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#compound-interest-formula', name: 'Compound Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#convert-simple-compound-rate', name: 'Converting Between Simple and Compound Interest Rates' },
    { '@type': 'WebPageElement', cssSelector: '#which-grows-faster', name: 'Which Grows Faster: Simple or Compound Interest' },
    { '@type': 'WebPageElement', cssSelector: '#compounding-frequency-effect', name: 'How Compounding Frequency Affects the Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#simple-vs-compound-loans', name: 'Simple vs Compound Interest on Loans and EMIs' },
    { '@type': 'WebPageElement', cssSelector: '#where-each-is-used', name: 'Where Simple and Compound Interest Are Used in India' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formulas', name: 'Simple and Compound Interest Formulas in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SimpleAndCompoundInterestCalculatorPage() {
  const schemas = [organizationSchema, webPageSchema, faqSchema, calcSchema, breadcrumbSchema, howToSchema, definedTermSchema];
  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <SimpleAndCompoundInterestCalculatorClient />
    </>
  );
}

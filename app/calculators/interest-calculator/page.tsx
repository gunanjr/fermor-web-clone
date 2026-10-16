import type { Metadata } from 'next';
import InterestCalculatorClient from './InterestCalculatorClient';
import { faqItems } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-10';
const PAGE_DATE_MODIFIED = '2026-09-18';
const canonical = 'https://fermor.in/calculators/interest-calculator';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator: Formula, Rate & Total',
  description: 'Free simple interest calculator for India. Instant total amount, interest earned, and year-by-year growth. Reverse calculator included. Free to use.',
  keywords: [
    'simple interest calculator', 'interest calculator', 'simple interest calculator online',
    'interest rate calculator', 'interest calculator formula', 'interest calculator online',
    'bank interest calculator', 'daily interest calculator', 'monthly interest calculator',
    'monthly interest rate calculator', 'yearly interest calculator', 'annual interest calculator',
    'savings interest calculator', 'loan interest calculator', 'investment interest calculator',
    'interest calculation calculator', 'simple interest formula', 'simple interest calculator india',
    'simple interest calculator excel', 'simple interest vs compound interest calculator',
    'interest calculator for fd', 'reverse interest calculator', 'interest calculator for loan',
    'interest calculator simple interest', 'si calculator', 'si interest calculator',
    'principal interest rate time calculator', 'simple interest calculator for students',
    'simple interest calculator with steps', 'simple interest calculator for loan',
    'simple interest calculator formula',
  ],
  alternates: { canonical },
  openGraph: {
    title: 'Simple Interest Calculator: Formula, Rate & Total',
    description: 'Calculate simple interest, total amount, and year-by-year growth on any principal. Includes a reverse calculator to solve for rate or time.',
    type: 'website', url: canonical, siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-interest-calculator.png', width: 1200, height: 630, alt: 'Simple Interest Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Interest Calculator: Formula, Rate & Total - Fermor',
    description: 'Calculate simple interest, total amount, and year-by-year growth. Free for India.',
    images: ['https://fermor.in/og-interest-calculator.png'],
  },
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
  name: 'Simple Interest Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: canonical,
  description: 'Calculate simple interest, total amount, and year-by-year growth on any principal. Includes a reverse calculator for rate and time.',
  featureList: [
    'Simple Interest Calculator',
    'Reverse Calculator (solve for rate or time)',
    'Year-by-Year Growth Table with Bar Chart',
    'TDS on Interest Estimate',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
    { '@type': 'ListItem', position: 3, name: 'Simple Interest Calculator', item: canonical },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Simple Interest',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Simple Interest Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the principal', text: 'Enter the amount you are depositing, investing, or borrowing.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the rate', text: 'Enter the annual interest rate as a percentage.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the time period', text: 'Set the number of years the amount will earn or accrue interest.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the result', text: 'Review the total amount, interest earned, and the year-by-year growth table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Simple Interest',
  alternateName: 'SI',
  description: 'Interest calculated only on the original principal amount, at a fixed rate, without compounding.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Interest#Simple_interest',
    'https://www.wikidata.org/wiki/Q604737',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Simple Interest Calculator: Formula, Rate & Total',
  description: 'Free online simple interest calculator for India, with a reverse calculator, daily and monthly interest formulas, and current bank rate context.',
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
    { '@type': 'DefinedTerm', name: 'TDS', alternateName: 'Tax Deducted at Source' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, borrowers, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-simple-interest', name: 'What Is Simple Interest' },
    { '@type': 'WebPageElement', cssSelector: '#simple-interest-formula', name: 'Simple Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#simple-interest-excel', name: 'Simple Interest Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-simple-interest', name: 'Reverse Simple Interest Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#daily-monthly-interest', name: 'Daily, Monthly, and Annual Interest Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#simple-vs-compound', name: 'Simple Interest vs Compound Interest' },
    { '@type': 'WebPageElement', cssSelector: '#where-used', name: 'Where Simple Interest Is Used in India' },
    { '@type': 'WebPageElement', cssSelector: '#bank-interest-rates', name: 'Bank Interest Calculator: Savings and FD Rates' },
    { '@type': 'WebPageElement', cssSelector: '#loan-interest', name: 'Loan Interest Calculator: Which Loans Use Simple Interest' },
    { '@type': 'WebPageElement', cssSelector: '#tax-on-interest', name: 'Tax on Interest Income: TDS Under Section 194A' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function InterestCalculatorPage() {
  const schemas = [organizationSchema, webPageSchema, faqSchema, calcSchema, breadcrumbSchema, howToSchema, definedTermSchema];
  return (
    <>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <InterestCalculatorClient faqs={faqItems} />
    </>
  );
}

import type { Metadata } from 'next';
import MortgageCalculatorClient from './MortgageCalculatorClient';
import { FAQS } from './faqData';

export const metadata: Metadata = {
  title: 'Home Loan & Mortgage EMI Calculator India',
  description: 'Free home loan EMI calculator for India. Enter loan amount, rate and tenure for monthly EMI, total interest, amortization schedule and prepayment savings.',
  keywords: [
    'home loan emi calculator', 'home loan calculator', 'house loan emi calculator',
    'mortgage calculator', 'mortgage loan calculator', 'housing loan calculator',
    'loan emi calculator home loan', 'home loan interest calculator',
    'emi calculator home loan', 'home loan monthly emi calculator',
    'home loan emi cal', 'amortization calculator', 'home loan amortization calculator',
    'home loan amortization schedule india', 'amortization schedule',
    'mortgage emi calculator india', 'home loan eligibility calculator',
    'home loan prepayment calculator', 'emi calculator for home loan with prepayment',
    'home loan tenure calculator', 'property loan calculator',
    'property loan emi calculator', 'mortgage interest calculator',
    'home loan installment calculator', 'home loan monthly emi calculator',
    'home loan emi calculator with prepayment', 'mortgage loan interest calculator',
    'home loan amount calculator', 'bank home loan calculator',
    'housing loan interest calculator', 'housing loan emi calculator',
    'sbi home loan calculator', 'sbi home loan emi calculator',
    'hdfc home loan calculator', 'hdfc home loan emi calculator',
    'icici home loan calculator', 'icici home loan emi calculator',
    'axis bank home loan calculator', 'axis bank home loan emi calculator',
    'emi for 1 crore home loan', '1 crore home loan emi',
    'emi for 1.5 crore home loan', '1.5 crore home loan emi',
    '30 lakh home loan emi', '50 lakh home loan emi',
    '40 lakh home loan emi', '60 lakh home loan emi',
    'home loan repayment schedule', 'home loan repayment calendar',
    'home loan calculator formula', 'mortgage loan emi calculator india',
    'online home loan emi calculator', 'home loan calculation formula',
    '20 lakh home loan emi', '60 lakh home loan emi', '70 lakh home loan emi',
    '80 lakh home loan emi', '2 crore home loan emi', '5 crore home loan emi',
    '38 lakh home loan emi for 5 years', '70 lakh home loan emi for 15 years',
    '80 lakh home loan emi for 30 years', 'emi for 20 lakh home loan for 20 years',
    'pmay home loan subsidy calculator', 'home loan tax benefit calculator',
    'stamp duty and registration charges calculator', 'home loan processing fee calculator',
    'pnb home loan calculator', 'bank of baroda home loan calculator',
    'kotak home loan calculator', 'federal bank home loan calculator',
    'canara bank home loan calculator', 'union bank home loan calculator',
    'home loan foir calculator', 'mortgage calculator with taxes and insurance india',
    'emi per lakh calculator', 'home loan emi per lakh', 'emi per lakh chart india',
    'housing loan emi calculator', 'housing loan eligibility calculator',
    'calculate home loan eligibility', 'home loan eligibility calculator',
    'home loan interest rate calculator', 'housing loan interest rate calculator',
    'loan calculator home loan', 'loan emi calculator home loan',
    'home loan and emi calculator', 'home loan calculator emi calculator',
    'home loan monthly emi calculator', 'house loan calc',
    'mortgage and calculator', 'housing loan calculator',
    'check home loan eligibility', 'housing loan eligibility check',
    'home emi calculator', 'home loan emi', 'house loan emi',
    'property loan calculator', 'insurance on home loan premium calculator',
    'interest rates for property loans', 'home loan top up calculator',
    'home top up loan emi calculator', 'home loan pre emi calculator',
    'home loan amortization calculator india', 'house emi calculator',
    'house interest calculator', 'home loan estimator',
    'home loan installment calculator', 'home loan india calculator',
    'home loan calculator inr', 'loan calculator india home loan',
    'home loan formula', 'house loan payment calculator',
    'emi calculator for home loan', 'home loan calculator with principal and interest',
    'bank home loan calculator', 'home loan ca', 'home loan mortgage calculator',
  ],
  openGraph: {
    title: 'Home Loan & Mortgage EMI Calculator India',
    description: 'Free home loan EMI calculator. Enter loan amount, interest rate and tenure to get monthly EMI, total interest and a full amortization schedule. Built for Indian home buyers.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-mortgage-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan & Mortgage EMI Calculator India',
    description: 'Free home loan EMI calculator. Enter loan amount, interest rate and tenure to get monthly EMI, total interest and a full amortization schedule.',
    images: ['https://fermor.in/og-mortgage-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/mortgage-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home Loan EMI Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/mortgage-calculator',
  featureList: [
    'Home Loan EMI Calculator with year-by-year amortization',
    'Prepayment Savings Calculator: see interest saved and tenure reduction',
    'Home Loan Eligibility Calculator based on income and FOIR',
    'Interactive stacked bar chart for amortization visualization',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Advanced inputs: property tax and home insurance',
    'Loan term presets (5Y, 10Y, 15Y, 20Y, 30Y)',
    'LocalStorage persistence of all calculator inputs',
    'EMI lookup table for 24 loan amounts across 6 tenures',
    'Bank-by-bank interest rate comparison across 12 major lenders',
    'EMI per lakh borrowed and estimated loan payoff date',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2024-01-01',
  dateModified: '2026-09-11',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Mortgage Calculator', item: 'https://fermor.in/calculators/mortgage-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Home Loan EMI and Total Interest Cost',
  description: 'Use the free home loan EMI calculator to find your monthly payment, total interest, and amortization schedule in under 60 seconds.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Loan EMI Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Home Price',
      text: 'Enter the total purchase price of the property using the slider or by clicking the displayed value to type a precise number.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Down Payment',
      text: 'Set the percentage of the property value you plan to pay upfront. The calculator shows the rupee equivalent and automatically deducts it from the loan principal.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter Interest Rate',
      text: 'Enter the annual interest rate your bank has quoted. If comparing scenarios, use 7.5% as a mid-market benchmark for Indian home loans as of July 2026.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set Loan Tenure',
      text: 'Set the loan duration using the year or month toggle. Use the quick presets (5Y, 10Y, 15Y, 20Y, 30Y) to instantly compare how tenure affects your EMI and total interest.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Check Prepayment Savings and Loan Eligibility',
      text: 'Switch to the Prepayment tab to see how extra monthly payments cut your total interest and loan term. Use the Eligibility tab to calculate the maximum loan amount you qualify for based on your monthly income.',
    },
  ],
};

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
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system, connecting real financial accounts through the Account Aggregator framework to see the complete financial picture and automate decisions.',
  knowsAbout: [
    'Home Loan EMI Calculation',
    'Mortgage Amortization',
    'FOIR and Home Loan Eligibility',
    'RBI Repo Rate and MCLR',
    'CIBIL Credit Scoring',
    'Home Loan Tax Benefits India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Loan and Mortgage EMI Calculator India',
  url: 'https://fermor.in/calculators/mortgage-calculator',
  datePublished: '2024-01-01',
  dateModified: '2026-09-11',
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
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Mortgage', alternateName: 'Home Loan' },
    { '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' },
    { '@type': 'DefinedTerm', name: 'Amortization', alternateName: 'Loan Amortization Schedule' },
    { '@type': 'DefinedTerm', name: 'MCLR', alternateName: 'Marginal Cost of Funds Based Lending Rate' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home buyers, first-time home buyers, NRI home buyers, home loan borrowers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-emi', name: 'What Is a Home Loan EMI?' },
    { '@type': 'WebPageElement', cssSelector: '#emi-formula', name: 'Home Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#emi-excel', name: 'Home Loan EMI Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#emi-table', name: 'Home Loan EMI Table for Common Loan Amounts' },
    { '@type': 'WebPageElement', cssSelector: '#emi-by-tenure', name: 'EMI for a Specific Loan Amount Over a Specific Tenure' },
    { '@type': 'WebPageElement', cssSelector: '#emi-per-lakh', name: 'Home Loan EMI Per Lakh' },
    { '@type': 'WebPageElement', cssSelector: '#factors', name: 'What Affects Your Home Loan EMI?' },
    { '@type': 'WebPageElement', cssSelector: '#fixed-vs-floating', name: 'Fixed Rate vs Floating Rate Home Loans' },
    { '@type': 'WebPageElement', cssSelector: '#best-rates', name: 'Home Loan Interest Rates in India' },
    { '@type': 'WebPageElement', cssSelector: '#pmay', name: 'PMAY: Government Interest Subsidy on Home Loans' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits', name: 'Tax Benefits on a Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility', name: 'How Much Home Loan Can You Get?' },
    { '@type': 'WebPageElement', cssSelector: '#costs-beyond-emi', name: 'Costs of Buying a Home Beyond the EMI' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-emi', name: 'How to Reduce Your Home Loan EMI' },
    { '@type': 'WebPageElement', cssSelector: '#amortization', name: 'What Is a Home Loan Amortization Schedule?' },
    { '@type': 'WebPageElement', cssSelector: '#market-2026', name: 'State of the Indian Home Loan Market' },
    { '@type': 'WebPageElement', cssSelector: '#history', name: 'A Brief History of Home Loans in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Home Loan EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EMI',
  alternateName: 'Equated Monthly Instalment',
  description: 'EMI is the fixed monthly payment a borrower makes to a lender over the loan tenure, covering both principal repayment and interest on the outstanding balance.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Finance and Banking Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equated_monthly_installment',
    'https://www.wikidata.org/wiki/Q5393177',
  ],
};

export default function MortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <MortgageCalculatorClient />
    </>
  );
}

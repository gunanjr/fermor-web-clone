import type { Metadata } from 'next';
import HDFCHomeLoanCalculatorClient from './HDFCHomeLoanCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-14';
const PAGE_DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: 'HDFC Home Loan Calculator: Check EMI & Eligibility',
  description: 'Free HDFC home loan EMI calculator for India. Estimate monthly EMI at current 8.50% interest rate, check salary eligibility, and view yearly amortization.',
  keywords: [
    'hdfc home loan calculator',
    'hdfc home loan emi calculator',
    'hdfc home loan interest rate',
    'hdfc housing loan calculator',
    'hdfc housing loan emi calculator',
    'hdfc bank home loan calculator',
    'hdfc home loan eligibility',
    'hdfc home loan prepayment',
    'home loan emi calculator hdfc',
    'hdfc home loan interest rate calculator',
    'hdfc plot loan emi calculator',
    'hdfc home loan amortization schedule',
    'hdfc mortgage calculator',
    'hdfc loan calculator',
    'sbi vs hdfc home loan',
    'hdfc home loan interest rates 2026',
    'hdfc home loan eligibility check',
    'hdfc housing finance calculator',
    'hdfc bank loan emi calculator',
    'hdfc nri home loan calculator',
  ],
  openGraph: {
    title: 'HDFC Home Loan Calculator: Check EMI & Eligibility - Fermor',
    description: 'Calculate HDFC home loan EMI at 8.50% interest. Check salary eligibility and view a year-by-year amortization schedule with the prepayment impact.',
    type: 'website',
    url: 'https://fermor.in/calculators/hdfc-home-loan-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-hdfc-home-loan-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HDFC Home Loan Calculator - Fermor',
    description: 'Calculate HDFC home loan EMI and check salary eligibility online. Includes bank comparisons and prepayment interest savings.',
    images: ['https://fermor.in/og-hdfc-home-loan-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/hdfc-home-loan-calculator' },
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
    'HDFC Home Loan',
    'Home Loan EMI Calculation',
    'Housing Finance India',
    'Home Loan Prepayment',
    'HDFC Bank Home Loan Rates',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'HDFC Home Loan Calculator', item: 'https://fermor.in/calculators/hdfc-home-loan-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the current HDFC home loan interest rate?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank home loan interest rates start at 8.50% per annum for salaried borrowers as of 2026. The rate is linked to HDFC Bank\'s External Benchmark Lending Rate (EBLR) and is subject to quarterly resets based on policy rate shifts.' } },
    { '@type': 'Question', name: 'How is HDFC home loan EMI calculated?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC home loan EMI is calculated using the standard reducing-balance amortization formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the principal, r is the monthly interest rate, and n is the tenure in months.' } },
    { '@type': 'Question', name: 'What is the EMI for a Rs 50 lakh HDFC home loan for 20 years?', acceptedAnswer: { '@type': 'Answer', text: 'At the standard rate of 8.50% per annum for a 20-year tenure, the monthly EMI for a Rs 50 lakh HDFC home loan is approximately Rs 43,391. The total interest paid over the tenure is Rs 54.14 lakh.' } },
    { '@type': 'Question', name: 'What is the minimum down payment for HDFC home loan?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank requires a minimum down payment of 10% for property values up to Rs 30 lakh, 15% for values between Rs 30 lakh and Rs 75 lakh, and 20% for property values above Rs 75 lakh.' } },
    { '@type': 'Question', name: 'How much salary is required for a Rs 40 lakh home loan at HDFC Bank?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank uses a Fixed Obligation to Income Ratio (FOIR) of 50%. For a Rs 40 lakh loan at 8.50% for 20 years, the monthly EMI is Rs 34,713. To qualify, your net monthly take-home income must be at least Rs 69,426, assuming zero other outstanding obligations.' } },
    { '@type': 'Question', name: 'Does HDFC Bank charge a prepayment penalty?', acceptedAnswer: { '@type': 'Answer', text: 'No, HDFC Bank charges zero prepayment penalties on floating-rate home loans for individual borrowers, in compliance with RBI regulations. Prepayment charges are only applicable for corporate borrowers or fixed-rate loans.' } },
    { '@type': 'Question', name: 'Can NRIs apply for an HDFC home loan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, Non-Resident Indians (NRIs) can apply for HDFC home loans to purchase residential properties in India. The maximum tenure is typically capped at 15 years for NRIs, and repayment must be done via NRE or NRO accounts.' } },
    { '@type': 'Question', name: 'What is the maximum tenure for an HDFC home loan?', acceptedAnswer: { '@type': 'Answer', text: 'The maximum tenure offered by HDFC Bank for a regular home loan is 30 years for salaried individuals, subject to the borrower\'s age not exceeding 60 years or retirement age at maturity.' } },
    { '@type': 'Question', name: 'What is the difference between HDFC retail prime lending rate and EBLR?', acceptedAnswer: { '@type': 'Answer', text: 'Following HDFC\'s merger with HDFC Bank, loans are linked to the External Benchmark Lending Rate (EBLR) based on the RBI Repo Rate. Older loans linked to the Retail Prime Lending Rate (RPLR) are transitionable to EBLR for a nominal conversion fee.' } },
    { '@type': 'Question', name: 'How long does HDFC Bank take to sanction a home loan?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank typically takes 3 to 7 working days to issue a digital pre-approval sanction letter after document verification. Final disbursement depends on legal and technical clearance of the property, which can take an additional 10 to 15 days.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HDFC Home Loan Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/hdfc-home-loan-calculator',
  description: 'Calculate HDFC home loan EMI by property price, down payment, interest rate, and tenure. Includes loan eligibility checks, bank rate comparisons, and yearly amortization schedules.',
  featureList: [
    'Property price and down payment sliders',
    'Salary-based loan eligibility checker',
    'One-time lump sum prepayment impact estimator',
    'Yearly and monthly amortization schedules with stacked SVG bar chart',
    'Live bank interest rate comparison grid',
    'Multi-currency conversions (INR, USD, EUR, GBP)',
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
  name: 'How to Calculate HDFC Home Loan EMI',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor HDFC Home Loan Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter property price and down payment', text: 'Enter the ex-showroom property price and the down payment percentage. The loan principal is automatically derived.' },
    { '@type': 'HowToStep', position: 2, name: 'Provide the annual interest rate', text: 'Input the annual rate. The default starts at HDFC\'s base rate of 8.50%.' },
    { '@type': 'HowToStep', position: 3, name: 'Select tenure in years or months', text: 'Adjust the slider to choose a tenure up to 30 years.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the monthly payment and schedule', text: 'Check the computed EMI, total interest, and expand the amortization tab to see the stacked bar chart and yearly breakdown.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Home Loan',
  alternateName: 'Housing Loan',
  description: 'A secured loan provided by a bank or financial institution to purchase, construct, or renovate a residential property. The property is mortgaged as security until the loan is fully repaid.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Loan and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Mortgage_loan',
    'https://www.wikidata.org/wiki/Q184282',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HDFC Home Loan Calculator: Check EMI & Eligibility',
  url: 'https://fermor.in/calculators/hdfc-home-loan-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Home Loan', alternateName: 'Housing Loan' }],
  audience: { '@type': 'Audience', audienceType: 'Indian home buyers, NRI property buyers, first-time home buyers, mortgage borrowers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#hdfc-home-loan-rate', name: 'HDFC Home Loan Interest Rate Today' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-emi-by-amount', name: 'HDFC Home Loan EMI for Common Amounts' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-eligibility', name: 'How to Check HDFC Home Loan Eligibility Based on Salary' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-emi-formula', name: 'HDFC Home Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-excel-formula', name: 'HDFC Home Loan Amortization in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-hdfc-calculator', name: 'Reverse HDFC Home Loan Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-monthly-calculation', name: 'Monthly HDFC Home Loan Calculation and Reducing Balance' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-lumpsum-vs-sip', name: 'Lumpsum Down Payment vs Home Loan EMI' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-vs-sbi', name: 'HDFC Bank vs SBI Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-good-cibil', name: 'What Is a Good CIBIL Score for HDFC Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-reach', name: 'HDFC Home Loan for NRI Borrowers' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-charges', name: 'HDFC Home Loan Processing Fees and Charges' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-limitations', name: 'Limitations of HDFC Home Loan EMI Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This HDFC Home Loan Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HDFCHomeLoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HDFCHomeLoanCalculatorClient />
    </>
  );
}

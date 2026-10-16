import type { Metadata } from 'next';
import HomeLoanCalculatorClient from './HomeLoanCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'Home Loan Calculator: EMI, Interest Rates & Eligibility',
    description: 'Free home loan EMI calculator for India. Calculate monthly EMI for SBI, HDFC, ICICI and all major banks. Check eligibility, view amortization schedule. No sign-up required.',
    keywords: [
      'home loan calculator',
      'home loan emi calculator',
      'house loan emi calculator',
      'loan calculator home loan',
      'house loan calc',
      'home loan emi cal',
      'housing loan calculator',
      'home loan interest calculator',
      'sbi home loan calculator',
      'sbi housing loan calculator',
      'sbi home loan emi calculator',
      'hdfc home loan calculator',
      'hdfc home loan emi calculator',
      'hdfc housing loan calculator',
      'icici home loan calculator',
      'icici home loan emi calculator',
      'axis bank home loan calculator',
      'axis bank home loan emi calculator',
      'home loan eligibility calculator',
      'housing loan eligibility calculator',
      'home emi calculator',
      'home loan interest rate calculator',
      '30 lakh home loan emi',
      '40 lakh home loan emi',
      '50 lakh home loan emi',
      'emi for 1 crore home loan',
      'india home loan calculator',
      'online home loan emi calculator',
    ],
    alternates: {
      canonical: `https://fermor.in/calculators/home-loan-calculator`,
    },
    openGraph: {
      title: 'Home Loan Calculator: EMI, Interest Rates & Eligibility - Fermor',
      description: 'Free home loan EMI calculator for India. Calculate monthly EMI for SBI, HDFC, ICICI and all major banks. Check eligibility and view year-by-year amortization.',
      url: 'https://fermor.in/calculators/home-loan-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-home-loan-calculator.png', width: 1200, height: 630 }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Home Loan Calculator: EMI, Interest Rates & Eligibility - Fermor',
      description: 'Free home loan EMI calculator for India. Calculate monthly EMI for SBI, HDFC, ICICI and all major banks.',
      images: ['https://fermor.in/og-home-loan-calculator.png'],
    },
  };
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is home loan EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home loan EMI is calculated using the reducing-balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the loan amount (property price minus down payment), R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the loan tenure in months. All Indian banks use this method.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the EMI for a 30 lakh home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a Rs 30 lakh home loan at 8.5% per annum for 20 years, the EMI is approximately Rs 26,034 per month. At 8.25% (SBI rate), it is approximately Rs 25,561 per month. For a 30-year tenure at 8.5%, the EMI drops to Rs 23,064 but the total interest paid increases significantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the EMI for a 50 lakh home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a Rs 50 lakh home loan at 8.5% per annum for 20 years, the EMI is approximately Rs 43,391 per month. At SBI\'s current rate of 8.25%, the EMI is approximately Rs 42,601 per month. Over 20 years, you would pay approximately Rs 54 lakh in total interest on a Rs 50 lakh loan at 8.5%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current SBI home loan interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBI home loan interest rates start at 8.25% per annum as of June 2026 for salaried borrowers with CIBIL scores above 750. SBI links its home loan rates to the External Benchmark Lending Rate (EBLR), which moves with the RBI repo rate. Women borrowers get a 0.05% concession on the applicable rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can I get on a Rs 50,000 monthly salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 50,000 monthly salary, most banks will approve a home loan of approximately Rs 25 to 30 lakh, assuming no existing EMI obligations. This is based on a 50% FOIR (Fixed Obligation to Income Ratio), where your maximum home loan EMI cannot exceed Rs 25,000 per month. At 8.5% for 20 years, Rs 25,000 monthly EMI corresponds to a loan of approximately Rs 28.8 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can I get on a Rs 1 lakh monthly salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 1 lakh per month salary, most Indian banks will approve a home loan of approximately Rs 55 to 65 lakh, assuming no existing EMI obligations and a CIBIL score above 750. Using a 50% FOIR, the maximum EMI is Rs 50,000, which at 8.5% for 20 years supports a loan of approximately Rs 57.6 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum CIBIL score for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most major banks in India require a minimum CIBIL score of 700 to 750 for home loan approval. A score of 750 or above gets you the best interest rates. Scores between 650 and 699 may still get approval but at higher interest rates or with additional collateral requirements. Scores below 650 are usually rejected by mainstream banks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum down payment for a home loan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI guidelines, banks can fund up to 90% of the property value for loans up to Rs 30 lakh, up to 80% for loans between Rs 30 lakh and Rs 75 lakh, and up to 75% for loans above Rs 75 lakh. This means the minimum down payment is 10%, 20%, or 25% of the property value respectively. A higher down payment reduces your EMI and total interest cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does HDFC calculate home loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HDFC Bank uses the reducing-balance method to calculate home loan EMI, identical to the standard formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. HDFC links its home loan rates to the T-MCLR (Treasury MCLR), which is reset periodically. As of June 2026, HDFC home loan rates start at 8.35% per annum for salaried borrowers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to choose a 20-year or 30-year home loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A 20-year tenure is better if you can afford the higher EMI, because you pay significantly less total interest. A 30-year tenure lowers your monthly EMI by about 10-13% but increases total interest paid by 50% or more. For a Rs 30 lakh loan at 8.5%: 20-year EMI is Rs 26,034 (total interest: Rs 32.5 lakh) vs 30-year EMI of Rs 23,064 (total interest: Rs 53 lakh).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a home loan and a mortgage in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In India, the terms are often used interchangeably, but technically a home loan is money borrowed to purchase, construct, or renovate a home, where the property being purchased serves as collateral. A mortgage is the legal charge created on the property as security for the loan. All home loans create a mortgage on the property, but a mortgage loan can also refer to a loan against an already-owned property (loan against property or LAP).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I reduce my home loan EMI after taking the loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can reduce your home loan EMI by: (1) making a partial prepayment to reduce the outstanding principal (RBI mandates no prepayment penalty on floating-rate loans), (2) negotiating a rate reduction with your lender when the RBI cuts the repo rate, (3) doing a balance transfer to a lender offering a lower rate, or (4) increasing your tenure if the lender allows it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is FOIR and how does it affect my home loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FOIR stands for Fixed Obligation to Income Ratio. It is the percentage of your gross monthly income that goes toward all EMI payments, including the proposed home loan EMI. Most Indian banks cap FOIR at 50% for salaried borrowers, meaning your total EMI outflow cannot exceed half your monthly income. If you have existing EMIs (car loan, personal loan), they are included in the FOIR calculation, reducing the amount available for the home loan EMI.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tax benefits are available on home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the old tax regime: Section 80C allows deduction of up to Rs 1.5 lakh per year on principal repayment. Section 24(b) allows deduction of up to Rs 2 lakh per year on interest paid for a self-occupied property (no cap for let-out property). Section 80EEA allows an additional Rs 1.5 lakh deduction for first-time home buyers on loans sanctioned between April 2019 and March 2022. The new tax regime does not allow these deductions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators are free tools that give real answers to real financial questions without requiring sign-up or payment. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
      },
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home Loan EMI Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-loan-calculator',
  description: 'Calculate your home loan EMI instantly. Enter property price, down payment, rate, and tenure to get EMI, total interest, and year-by-year amortization. Supports SBI, HDFC, ICICI, and all major Indian lenders.',
  featureList: [
    'Home loan EMI calculation using reducing-balance method',
    'Year-by-year amortization schedule',
    'Loan eligibility checker based on monthly income and FOIR',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (5Y, 10Y, 15Y, 20Y, 25Y, 30Y)',
    'Down payment impact analysis',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2024-01-01',
  dateModified: '2026-06-25',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Loan Calculator', item: 'https://fermor.in/calculators/home-loan-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Home Loan EMI',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Loan EMI Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Property Price', text: 'Set the total property price using the slider or type the exact value. The calculator will auto-suggest a 20% down payment.' },
    { '@type': 'HowToStep', position: 2, name: 'Set Down Payment', text: 'Adjust the down payment percentage. The loan amount is automatically calculated as property price minus down payment.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter Interest Rate', text: 'Enter the interest rate quoted by your lender. Use the current SBI rate (8.25%) or HDFC rate (8.35%) as a benchmark.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose Loan Tenure', text: 'Select tenure in years or months using the preset buttons (5Y to 30Y). Longer tenure means lower EMI but higher total interest.' },
    { '@type': 'HowToStep', position: 5, name: 'Check Eligibility', text: 'Expand the Loan Eligibility section, enter your monthly income and existing EMI obligations to see the maximum loan you qualify for.' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Home Loan EMI Calculation',
    'Reducing Balance Method',
    'FOIR and Loan Eligibility',
    'Personal Finance India',
    'SBI Home Loan Rates',
    'HDFC Home Loan Rates',
    'RBI Repo Rate Linked Loans',
    'Account Aggregator Framework',
    'SEBI Regulations',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Loan Calculator: EMI, Interest Rates & Eligibility - Fermor',
  url: 'https://fermor.in/calculators/home-loan-calculator',
  datePublished: '2024-01-01',
  dateModified: '2026-06-25',
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
    { '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home buyers, first-time home loan applicants, NRI home loan seekers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#emi-calculator', name: 'What Is a Home Loan EMI Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#emi-formula', name: 'Home Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#emi-by-amount', name: 'Monthly EMI for Different Loan Amounts' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-home-loan', name: 'SBI Home Loan EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-home-loan', name: 'HDFC Bank Home Loan EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#down-payment', name: 'How Down Payment Reduces Your EMI' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Check Your Home Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
    { '@type': 'WebPageElement', cssSelector: '#disclaimer', name: 'Disclaimer' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EMI',
  alternateName: 'Equated Monthly Instalment',
  description: 'A fixed monthly payment made by a borrower to a lender on a specified date each calendar month, consisting of both the principal repayment and interest components calculated using the reducing-balance method.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equated_monthly_installment',
    'https://www.wikidata.org/wiki/Q5386086',
  ],
};

export default async function HomeLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <HomeLoanCalculatorClient />
    </>
  );
}

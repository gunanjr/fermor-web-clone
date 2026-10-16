import type { Metadata } from 'next';
import SBIHomeLoanCalculatorClient from './SBIHomeLoanCalculatorClient';

export const metadata: Metadata = {
  title: 'SBI Home Loan Calculator: EMI & Eligibility',
  description: 'Free SBI home loan calculator for India. Calculate EMI, interest, eligibility by salary, repayment schedule and prepayment savings online.',
  keywords: [
    'sbi home loan calculator', 'sbi housing loan calculator', 'sbi home loan emi calculator',
    'sbi bank home loan calculator', 'sbi loan calculator home loan', 'mortgage loan calculator sbi',
    'state bank of india home loan calculator', 'emi calculator in sbi', 'emi calculator state bank of india',
    'housing loan interest rate in sbi', 'sbi bank housing loan calculator', 'sbi home loan cal',
    'state bank of india housing loan calculator', 'state bank of india mortgage loan calculator',
    'sbi home loan emi table', 'sbi home loan installment calculator', 'sbi monthly emi calculator',
    'sbi mortgage loan emi calculator', 'sbi online housing loan emi calculator', 'loan calculator sbi',
    'house loan emi calculator sbi', 'home loan emi calculator sbi home loan',
    'home loan emi calculator state bank of india', 'state bank of india housing loan emi calculator',
    'state bank of india loan calculator', 'sbi home loan eligibility calculator',
    'sbi loan eligibility calculator', 'housing loan eligibility calculator sbi',
    'home eligibility calculator sbi', 'sbi home loan eligibility based on salary',
    'sbi home loan eligibility calculator based on salary', 'check home loan eligibility sbi',
    'sbi home loan interest rate calculator', 'sbi housing loan interest rate calculator',
    'sbi interest rate calculator for home loan', 'sbi home loan interest calculator',
    'home loan rate of interest sbi calculator', 'sbi loan emi calculator', 'sbi emi calculate',
    '20 lakh home loan emi for 10 years sbi', '25 lakh home loan emi for 10 years sbi',
    '15 lakh home loan emi for 20 years sbi', '20 lakh home loan emi for 20 years sbi',
    '25 lakh home loan emi for 20 years sbi', '30 lakh home loan emi for 20 years sbi',
    'home loan calculator sbi maxgain', 'home loan prepayment calculator sbi',
    'sbi home loan cibil check', 'sbi plot loan emi calculator', 'sbi home loan eligibility criteria',
    'sbi mortgage calculator', 'property loan calculator sbi', 'sbi home calculator',
    'sbi loan against property calculator', 'sbi home loan interest rate', 'sbi homeloan rate of interest',
    'rate of housing loan in sbi', 'housing loan interest in sbi', 'latest home loan interest rate sbi',
    'sbi home loan premium calculator', 'sbi home loan cibil check', 'house building loan interest rate in sbi',
  ],
  openGraph: {
    title: 'SBI Home Loan Calculator: EMI & Eligibility',
    description: 'Calculate SBI home loan EMI, interest, eligibility by salary and prepayment savings with a year-wise repayment schedule.',
    type: 'website',
    url: 'https://fermor.in/calculators/sbi-home-loan-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-sbi-home-loan-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SBI Home Loan Calculator: EMI & Eligibility',
    description: 'Calculate SBI home loan EMI at 8.40%, check eligibility based on salary, view month-wise amortization, and compare rates across banks.',
    images: ['https://fermor.in/og-sbi-home-loan-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/sbi-home-loan-calculator',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'SBI Home Loan Calculator', item: 'https://fermor.in/calculators/sbi-home-loan-calculator' },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SBI Home Loan Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/sbi-home-loan-calculator',
  description: 'Calculate SBI home loan EMI, check eligibility based on salary, and view full amortization schedule. Includes bank comparison across HDFC, ICICI, PNB, Axis, and Kotak.',
  featureList: [
    'SBI home loan EMI calculator with property price and down payment inputs',
    'Loan eligibility calculator based on monthly salary (FOIR 50%)',
    'Monthly and yearly amortization schedule with prepayment impact',
    'Bank comparison table across 6 major Indian banks',
    'Pre-computed EMI reference table for Rs 15L to Rs 1 Crore',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-06-20',
  dateModified: '2026-09-18',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "What is SBI's current home loan interest rate?",
      acceptedAnswer: { '@type': 'Answer', text: "SBI home loan rates start at 8.40% p.a. for salaried borrowers as of June 2026. Rates are linked to the RBI External Benchmark Lending Rate and are reviewed every quarter. Women borrowers receive an additional 0.05% concession on the applicable rate." },
    },
    {
      '@type': 'Question',
      name: 'How is SBI home loan EMI calculated?',
      acceptedAnswer: { '@type': 'Answer', text: "SBI uses the reducing-balance formula: EMI = P x R x (1+R)^N divided by [(1+R)^N - 1], where P is the loan amount, R is the monthly interest rate, and N is the total monthly instalments. For a Rs 30 lakh loan at 8.40% for 20 years, the monthly EMI is approximately Rs 25,839." },
    },
    {
      '@type': 'Question',
      name: 'What is the EMI for a Rs 20 lakh SBI home loan for 20 years?',
      acceptedAnswer: { '@type': 'Answer', text: "At SBI's current rate of 8.40%, the EMI for a Rs 20 lakh home loan for 20 years is approximately Rs 17,226 per month. Over 20 years, total interest paid is approximately Rs 21.3 lakh, making the total amount payable Rs 41.3 lakh." },
    },
    {
      '@type': 'Question',
      name: 'What is the EMI for a Rs 25 lakh SBI home loan for 20 years?',
      acceptedAnswer: { '@type': 'Answer', text: "At SBI's current rate of 8.40%, the EMI for a Rs 25 lakh home loan for 20 years is approximately Rs 21,533 per month. For a 10-year tenure on the same amount, the EMI rises to Rs 30,868 but total interest paid drops significantly." },
    },
    {
      '@type': 'Question',
      name: 'How much home loan can I get based on my salary at SBI?',
      acceptedAnswer: { '@type': 'Answer', text: "SBI uses a FOIR (Fixed Obligation to Income Ratio) of 50% of net monthly income to determine maximum EMI. For a net salary of Rs 1 lakh per month, maximum EMI eligibility is Rs 50,000. At 8.40% for 20 years, this translates to a loan eligibility of approximately Rs 58 lakh." },
    },
    {
      '@type': 'Question',
      name: "What is SBI's minimum down payment requirement?",
      acceptedAnswer: { '@type': 'Answer', text: "For properties up to Rs 75 lakh, SBI requires a minimum down payment of 10-15%. For properties above Rs 75 lakh and up to Rs 5 crore, the minimum is 20%. Plot loans require 25-35% down payment per SBI's Real Estate Loan guidelines." },
    },
    {
      '@type': 'Question',
      name: 'What is SBI MaxGain home loan and who should use it?',
      acceptedAnswer: { '@type': 'Answer', text: "SBI MaxGain is an overdraft home loan where surplus funds you park in the account reduce the principal on which daily interest is calculated. It is best for borrowers who receive annual bonuses, freelancers, or business owners with irregular but high income. Parking Rs 5 lakh in a MaxGain account on a Rs 50 lakh loan at 8.40% saves approximately Rs 42,000 in interest per year." },
    },
    {
      '@type': 'Question',
      name: 'What are the tax benefits on an SBI home loan?',
      acceptedAnswer: { '@type': 'Answer', text: "Under Section 24(b), you can claim a deduction of up to Rs 2 lakh per year on home loan interest for a self-occupied property. Under Section 80C, principal repayment of up to Rs 1.5 lakh per year is deductible. First-time buyers of properties up to Rs 45 lakh may also claim an additional Rs 1.5 lakh under Section 80EEA." },
    },
    {
      '@type': 'Question',
      name: "What CIBIL score does SBI require for a home loan?",
      acceptedAnswer: { '@type': 'Answer', text: "SBI requires a minimum CIBIL score of 700 for home loan approval. Borrowers above 750 get the best rates and fastest processing. Below 700 typically results in rejection or a significantly higher interest rate." },
    },
    {
      '@type': 'Question',
      name: 'What happens if I prepay my SBI home loan?',
      acceptedAnswer: { '@type': 'Answer', text: "SBI charges no prepayment penalty on floating-rate home loans per RBI guidelines. On a Rs 30 lakh loan at 8.40%, prepaying Rs 2 lakh in year one typically saves Rs 7-8 lakh in total interest and cuts 3-4 years off the tenure." },
    },
    {
      '@type': 'Question',
      name: 'What is pre-EMI on an SBI home loan?',
      acceptedAnswer: { '@type': 'Answer', text: "Pre-EMI is the interest paid on the disbursed amount during under-construction phases before the full loan is released. It covers only interest, not principal, so it is lower than the full EMI. Once full disbursement happens and possession is given, the regular EMI covering both principal and interest begins." },
    },
    {
      '@type': 'Question',
      name: 'Can I transfer my existing home loan to SBI?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes, SBI offers balance transfer for home loans from all major banks and NBFCs. The process requires 12 months of EMI statements, original loan documents, and property papers. SBI charges a processing fee of 0.25% of the outstanding loan amount for balance transfers." },
    },
    {
      '@type': 'Question',
      name: "What is SBI's home loan processing fee?",
      acceptedAnswer: { '@type': 'Answer', text: "SBI charges 0.35% of the loan amount as processing fee for regular home loans, subject to a minimum of Rs 2,000 and maximum of Rs 10,000. Balance transfer loans attract a 0.25% processing fee. SBI periodically waives this fee during festive campaigns." },
    },
    {
      '@type': 'Question',
      name: 'Does SBI offer home loans for plot purchase?',
      acceptedAnswer: { '@type': 'Answer', text: "Yes, SBI offers plot loans under its Real Estate Loan scheme, covering up to 75% of the plot cost. Plot loan rates are slightly higher than regular home loans, typically 8.70-9.00% p.a. The loan is available for residential plots only." },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer where users first encounter the product. The actual product connects real financial accounts through the RBI-regulated Account Aggregator framework and automates the financial decisions most people know they should make but never get around to: moving idle cash to liquid funds, paying advance tax, filling unused 80C deductions, and more.' },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate SBI Home Loan EMI',
  description: 'Step-by-step guide to using the Fermor SBI home loan EMI calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor SBI Home Loan Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter property price', text: 'Enter the total cost of the property you plan to purchase.' },
    { '@type': 'HowToStep', position: 2, name: 'Set your down payment', text: 'Adjust the down payment. SBI requires a minimum of 10-20% depending on the loan amount.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the interest rate', text: "Enter SBI's current home loan rate. The base rate for salaried borrowers is 8.40% p.a." },
    { '@type': 'HowToStep', position: 4, name: 'Choose loan tenure', text: 'Select your repayment period in years or months. SBI allows up to 30 years.' },
    { '@type': 'HowToStep', position: 5, name: 'Review your results', text: 'The calculator instantly shows monthly EMI, total interest, bank comparison, and year-by-year amortization.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/calculators/sbi-home-loan-calculator',
  url: 'https://fermor.in/calculators/sbi-home-loan-calculator',
  name: 'SBI Home Loan Calculator: EMI, Eligibility and Amortization Table',
  datePublished: '2026-06-20',
  dateModified: '2026-09-18',
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
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'SBI Home Loan', alternateName: 'State Bank of India Home Loan' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home loan borrowers, salaried professionals, NRI home buyers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  breadcrumb: breadcrumbSchema,
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#sbi-home-loan-rate', name: 'SBI Home Loan Interest Rate Today' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-emi-by-amount', name: 'SBI Home Loan EMI for Common Amounts' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-eligibility', name: 'SBI Home Loan Eligibility Based on Salary' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-emi-formula', name: 'SBI Home Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-maxgain', name: 'SBI MaxGain Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-tax-benefits', name: 'Tax Benefits on SBI Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-prepayment', name: 'How to Prepay SBI Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The goal is to close the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Home Loan EMI Calculation',
    'SBI Home Loan Products',
    'Indian Housing Finance',
    'Loan Amortization',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'RBI Monetary Policy',
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EMI',
  alternateName: 'Equated Monthly Instalment',
  description: 'EMI (Equated Monthly Instalment) is a fixed monthly payment made by a borrower to a lender, consisting of both principal repayment and interest, calculated using the reducing-balance method over a fixed loan tenure.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equated_monthly_installment',
    'https://www.wikidata.org/wiki/Q2100788',
  ],
};

export default function SBIHomeLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <SBIHomeLoanCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import OutstandingLoanCalculatorClient from './OutstandingLoanCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-13';
const PAGE_DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: 'Outstanding Loan Balance Calculator: Check Remaining Debt',
  description: 'Free outstanding loan balance calculator for India. Check your remaining loan balance, principal paid, and interest details. Free to use.',
  keywords: [
    'outstanding loan balance calculator',
    'remaining loan balance calculator',
    'loan balance calculator',
    'outstanding loan calculator',
    'outstanding balance calculator',
    'how to calculate outstanding loan balance',
    'home loan outstanding balance calculator',
    'personal loan outstanding balance calculator',
    'remaining loan amount calculator',
    'loan payoff calculator',
    'principal outstanding calculator',
    'check remaining loan balance',
    'outstanding balance formula',
    'outstanding loan balance in excel',
    'loan amortization schedule outstanding balance',
    'balance transfer outstanding calculator',
    'outstanding loan balance check',
    'car loan outstanding balance calculator',
    'unpaid loan balance calculator',
    'amortization remaining balance calculator',
    'outstanding balance calculator sbi',
    'outstanding balance calculator hdfc',
    'loan balance outstanding statement',
    'prepayment outstanding loan balance',
  ],
  openGraph: {
    title: 'Outstanding Loan Balance Calculator: Check Remaining Debt - Fermor',
    description: 'Check how much loan balance is remaining. Calculate principal paid, total interest paid, and remaining EMIs. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/outstanding-loan-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-outstanding-loan-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Outstanding Loan Balance Calculator - Fermor',
    description: 'Calculate remaining loan principal, interest paid, and outstanding balance after pre-payments. Free to use.',
    images: ['https://fermor.in/og-outstanding-loan-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/outstanding-loan-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Outstanding Loan Balance', 'Loan Amortization', 'Debt Paydown', 'Prepayment Savings', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Outstanding Loan Balance Calculator', item: 'https://fermor.in/calculators/outstanding-loan-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an outstanding loan balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The outstanding loan balance is the remaining principal amount of a loan that you still owe to the lender at any given point in time. It excludes future interest payments that have not yet accrued.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is outstanding loan balance calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Outstanding loan balance is calculated by taking the original principal and subtracting the sum of the principal portions of all EMIs paid up to that date. Since early EMIs are mostly interest, the outstanding balance reduces slowly during the first few years of a long-term loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the outstanding balance include interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The outstanding balance represents only the unpaid principal amount. If you decide to foreclosure or prepay the loan, this outstanding balance (plus any foreclosure charges) is the amount you must pay to close the loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does prepayment affect the outstanding loan balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Making a lump-sum prepayment reduces the outstanding principal balance directly. This either reduces your future monthly EMI amount (if you choose EMI reduction) or shortens the remaining loan tenure, saving you substantial interest costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the formula to calculate outstanding loan balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The outstanding balance after paying p months is calculated as: Bal = P × [ (1 + r)^n - (1 + r)^p ] / [ (1 + r)^n - 1 ], where P is the original principal, r is the monthly interest rate, and n is the total number of months in the loan tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I check my outstanding loan balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can check your outstanding balance by logging into your bank\'s online net banking portal, viewing your latest monthly loan statement, or requesting a provisional foreclosure statement from the lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there foreclosure charges for home loans in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI guidelines, commercial banks and NBFCs cannot charge foreclosure penalties or prepayment fees on floating-rate home loans issued to individual borrowers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my loan balance reduce so slowly in the early years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'During the initial phase of an amortization schedule, the outstanding principal is high, meaning a large portion of your EMI goes toward paying monthly interest. As the principal balance reduces, the interest component decreases, and more of your EMI goes toward principal repayment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Excel function for remaining loan balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can use the FV (Future Value) function in Excel to calculate the remaining balance after p payments: `=FV(rate/12, p, EMI, -Principal)`.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a loan balance transfer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A loan balance transfer is a process where you move your outstanding loan balance from your current bank to a new bank that offers a lower interest rate, helping you save money on interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Outstanding Loan Balance Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/outstanding-loan-calculator',
  description: 'Determine the remaining principal balance on any loan. Compute interest paid so far, remaining EMIs, and visualize the payoff progress with an amortization table.',
  featureList: [
    'Remaining principal balance tracker',
    'Accumulated interest and principal calculator',
    'Prepayment impact simulator',
    'Collapsible year-by-year amortization schedule',
    'Amortization stacked bar chart visualization',
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
  name: 'How to Calculate Outstanding Loan Balance',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Outstanding Loan Balance Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter original loan details',
      text: 'Provide the original loan principal amount, tenure, and interest rate.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Input payments made',
      text: 'Specify the number of EMIs you have already paid or the years/months elapsed.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add prepayment details (optional)',
      text: 'Enter any lump-sum prepayments you have made to see how they reduced the balance.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyze remaining balance and schedules',
      text: 'Review outstanding balance, principal vs interest splits, and year-by-year payment schedules.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Outstanding Balance',
  alternateName: 'Remaining Principal',
  description: 'The unpaid portion of the original loan principal, excluding future interest, that must be repaid to close the debt.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Balance_outstanding'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Outstanding Loan Balance Calculator: Check Remaining Debt',
  url: 'https://fermor.in/calculators/outstanding-loan-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Outstanding Balance', alternateName: 'Remaining Principal' }],
  audience: { '@type': 'Audience', audienceType: 'Indian home owners, bank borrowers, loan refinance candidates', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-outstanding-balance', name: 'What Is an Outstanding Loan Balance?' },
    { '@type': 'WebPageElement', cssSelector: '#outstanding-balance-formula', name: 'Outstanding Loan Balance Formula: The Exact Math' },
    { '@type': 'WebPageElement', cssSelector: '#excel-methods', name: 'Outstanding Balance Calculator in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#balance-by-loan-type', name: 'Outstanding Balance by Loan Type: Home, Car, Personal, Education' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-impact', name: 'How Prepayment Reduces Outstanding Balance' },
    { '@type': 'WebPageElement', cssSelector: '#outstanding-after-5y', name: 'Outstanding Balance After 5 Years: Quick Reference Table' },
    { '@type': 'WebPageElement', cssSelector: '#early-interest-breakdown', name: 'Outstanding Balance vs Principal Paid' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-check-balance', name: 'How to Check Outstanding Balance with Your Bank' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-foreclosure-rules', name: 'RBI Guidelines on Loan Foreclosure and Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#balance-transfer-viability', name: 'Outstanding Balance for Balance Transfer: When Does It Make Sense?' },
    { '@type': 'WebPageElement', cssSelector: '#formula-limitations', name: 'Limitations of the Outstanding Balance Formula' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Outstanding Loan Balance Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function OutstandingLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OutstandingLoanCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import LoanBalanceTransferCalculatorClient from './LoanBalanceTransferCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-15';
const PAGE_DATE_MODIFIED = '2026-07-15';

export const metadata: Metadata = {
  title: 'Loan Balance Transfer Calculator: Check Savings & Fees',
  description: 'Free loan balance transfer calculator for India. Estimate monthly EMI savings, total interest saved, processing fees, and break-even timeline.',
  keywords: [
    'loan balance transfer calculator',
    'home loan balance transfer calculator',
    'balance transfer calculator',
    'loan transfer calculator',
    'transfer home loan to another bank',
    'home loan transfer savings calculator',
    'personal loan balance transfer calculator',
    'loan balance transfer fee calculator',
    'break-even calculator balance transfer',
    'sbi home loan balance transfer calculator',
    'hdfc home loan transfer calculator',
    'icici home loan transfer calculator',
    'rbi balance transfer guidelines',
    'foreclosure charges balance transfer',
    'processing fee home loan transfer',
    'reduce loan emi balance transfer',
    'outstanding loan transfer calculator',
    'housing loan balance transfer calculator',
    'mortgage balance transfer calculator',
    'how to transfer loan to another bank',
  ],
  openGraph: {
    title: 'Loan Balance Transfer Calculator: Check Savings & Fees - Fermor',
    description: 'Calculate your exact net savings and break-even timeline when transferring an existing loan to a new bank. Compares EMIs, interest, processing fees, and foreclosure costs.',
    type: 'website',
    url: 'https://fermor.in/calculators/loan-balance-transfer-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-loan-balance-transfer-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Balance Transfer Calculator - Fermor',
    description: 'Calculate net savings, processing fee impacts, and break-even months for home and personal loan balance transfers in India.',
    images: ['https://fermor.in/og-loan-balance-transfer-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/loan-balance-transfer-calculator' },
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
    'Loan Balance Transfer',
    'Home Loan Transfer Savings',
    'Mortgage Refinancing India',
    'Prepayment and Foreclosure Rules',
    'Debt Management',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Balance Transfer Calculator', item: 'https://fermor.in/calculators/loan-balance-transfer-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a loan balance transfer?', acceptedAnswer: { '@type': 'Answer', text: 'A loan balance transfer is a process where a borrower transfers their outstanding loan principal from an existing bank to a new lender offering a lower interest rate or better repayment terms.' } },
    { '@type': 'Question', name: 'Does RBI permit foreclosure charges on home loan transfers?', acceptedAnswer: { '@type': 'Answer', text: 'Per RBI guidelines, banks and housing finance companies are prohibited from charging foreclosure or prepayment penalties on floating-rate home loans for individual borrowers.' } },
    { '@type': 'Question', name: 'What fees are involved in a home loan balance transfer?', acceptedAnswer: { '@type': 'Answer', text: 'Borrowers must pay processing fees to the new bank (usually 0.25% to 1% of the loan amount), legal and valuation charges, stamp duty on the new mortgage deed, and document retrieval fees to the old bank.' } },
    { '@type': 'Question', name: 'How do you calculate net savings from a balance transfer?', acceptedAnswer: { '@type': 'Answer', text: 'Calculate the difference in total interest payable between the current loan and the new loan over the remaining tenure. Subtract all transaction costs (processing fees, legal fees, stamp duty) to find the net savings.' } },
    { '@type': 'Question', name: 'What is the break-even period for a loan transfer?', acceptedAnswer: { '@type': 'Answer', text: 'The break-even period is the number of months required for your monthly EMI savings to recover the upfront fees and charges paid for the transfer.' } },
    { '@type': 'Question', name: 'Can I transfer a personal loan to another bank?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, personal loans can be transferred to another lender. However, unlike home loans, existing banks often levy foreclosure charges (typically 2% to 5%) on personal loans, which must be factored into your savings calculation.' } },
    { '@type': 'Question', name: 'When is a home loan balance transfer worth it?', acceptedAnswer: { '@type': 'Answer', text: 'A balance transfer is generally worth it if the interest rate difference is at least 0.50%, the remaining loan tenure is more than 5 years, and the upfront transfer fees are recovered in under 12 to 18 months.' } },
    { '@type': 'Question', name: 'Can I get a top-up loan during a balance transfer?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, most banks offer a top-up loan facility along with the balance transfer at interest rates similar to or slightly higher than the home loan rate, which can be used for home renovation or personal needs.' } },
    { '@type': 'Question', name: 'What documents are required for a loan transfer?', acceptedAnswer: { '@type': 'Answer', text: 'You need your original loan sanction letter, a list of documents held by the existing bank, an outstanding balance certificate, latest 3 months salary slips, 6 months bank statements, and property ownership deeds.' } },
    { '@type': 'Question', name: 'Does a balance transfer affect my CIBIL score?', acceptedAnswer: { '@type': 'Answer', text: 'A balance transfer requires a hard credit inquiry from the new lender, which may cause a temporary minor dip in your CIBIL score. However, long-term timely repayments on the new loan will improve your credit history.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Balance Transfer Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/loan-balance-transfer-calculator',
  description: 'Calculate net savings, processing fee impacts, and break-even months for home and personal loan balance transfers in India.',
  featureList: [
    'Outstanding loan amount and existing rate sliders',
    'Remaining tenure selector in years or months',
    'New interest rate and processing fee adjustments',
    'Prepayment/Foreclosure fee calculator',
    'Break-even timeline analysis',
    'Year-by-year side-by-side comparison tables',
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
  name: 'How to Calculate Loan Balance Transfer Savings',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Balance Transfer Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter current outstanding loan details', text: 'Input your remaining outstanding principal, existing annual rate, and remaining tenure.' },
    { '@type': 'HowToStep', position: 2, name: 'Provide the new loan offer details', text: 'Enter the lower interest rate offered by the new bank and the expected processing fee.' },
    { '@type': 'HowToStep', position: 3, name: 'Include existing bank foreclosure fees if any', text: 'Add foreclosure charges if you are transferring a personal or fixed-rate loan (0% for floating-rate home loans).' },
    { '@type': 'HowToStep', position: 4, name: 'Review net savings and break-even months', text: 'Evaluate the net savings (interest saved minus fees) and check how many months it takes to break even on transfer costs.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Loan Balance Transfer',
  alternateName: 'Refinancing',
  description: 'The process of moving an outstanding loan balance from one financial institution to another to benefit from a lower interest rate, lower EMIs, or better terms. Commonly used for home and personal loans.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking and Loan Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Refinancing',
    'https://www.wikidata.org/wiki/Q1057404',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Loan Balance Transfer Calculator: Check Savings & Fees',
  url: 'https://fermor.in/calculators/loan-balance-transfer-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Loan Balance Transfer', alternateName: 'Refinancing' }],
  audience: { '@type': 'Audience', audienceType: 'Home loan borrowers, personal loan borrowers, debt consolidators, mortgage holders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#transfer-basics', name: 'What Is a Loan Balance Transfer?' },
    { '@type': 'WebPageElement', cssSelector: '#savings-formula', name: 'How to Calculate Loan Transfer Savings' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-guidelines', name: 'RBI Guidelines on Foreclosure and Transfer Charges' },
    { '@type': 'WebPageElement', cssSelector: '#breakeven-analysis', name: 'Understanding the Break-Even Timeline' },
    { '@type': 'WebPageElement', cssSelector: '#fees-involved', name: 'All Hidden Fees in a Loan Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#home-vs-personal', name: 'Home Loan vs Personal Loan Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-transfer', name: 'When Does a Loan Balance Transfer Make Sense?' },
    { '@type': 'WebPageElement', cssSelector: '#transfer-step-by-step', name: 'Step-by-Step Loan Transfer Process in India' },
    { '@type': 'WebPageElement', cssSelector: '#document-checklist', name: 'Documents Required for a Loan Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#cibil-impact', name: 'How Balance Transfer Affects Your CIBIL Score' },
    { '@type': 'WebPageElement', cssSelector: '#topup-benefit', name: 'Top-Up Loan Benefits During Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of Loan Balance Transfer Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Loan Balance Transfer Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LoanBalanceTransferPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <LoanBalanceTransferCalculatorClient />
    </>
  );
}

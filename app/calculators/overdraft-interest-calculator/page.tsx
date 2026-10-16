import type { Metadata } from 'next';
import OverdraftInterestCalculatorClient from './OverdraftInterestCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-15';
const PAGE_DATE_MODIFIED = '2026-07-15';

export const metadata: Metadata = {
  title: 'Overdraft Interest Calculator: Check Daily OD Limit Interest',
  description: 'Free overdraft interest calculator for India. Estimate monthly OD limit interest charged on daily closing balances, utilize limit sliders, and view daily accrual tables.',
  keywords: [
    'overdraft interest calculator',
    'od interest calculator',
    'overdraft calculator',
    'overdraft limit calculator',
    'od limit interest calculator',
    'calculate overdraft interest daily',
    'bank overdraft interest calculator',
    'overdraft rate calculator',
    'loan against property od calculator',
    'working capital overdraft calculator',
    'cash credit interest calculator',
    'od account interest calculation formula',
    'daily balance overdraft calculator',
    'business overdraft calculator',
    'sbi overdraft interest calculator',
    'hdfc od interest calculator',
    'icici overdraft calculator',
    'calculate interest on credit line',
    'overdraft interest rate per day',
    'od vs cash credit interest',
  ],
  openGraph: {
    title: 'Overdraft Interest Calculator: Check Daily OD Limit Interest - Fermor',
    description: 'Calculate interest on your bank overdraft limit or credit line based on daily usage. Simulates transactions, deposits, withdrawals, and interest accrued.',
    type: 'website',
    url: 'https://fermor.in/calculators/overdraft-interest-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-overdraft-interest-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Overdraft Interest Calculator - Fermor',
    description: 'Calculate monthly interest on daily overdraft usage and credit lines in India with transactional simulators.',
    images: ['https://fermor.in/og-overdraft-interest-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/overdraft-interest-calculator' },
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
    'Overdraft Interest',
    'Working Capital Finance',
    'Cash Credit Account',
    'Daily Closing Balance Interest',
    'Credit Line Management',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Overdraft Interest Calculator', item: 'https://fermor.in/calculators/overdraft-interest-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is an overdraft (OD) limit?', acceptedAnswer: { '@type': 'Answer', text: 'An overdraft limit is a credit facility offered by banks that allows account holders to withdraw funds beyond their actual balance, up to a pre-approved credit ceiling.' } },
    { '@type': 'Question', name: 'How is overdraft interest calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Overdraft interest is calculated daily on the closing balance of the utilized amount using the formula: Daily Interest = (Utilized Amount x Annual Interest Rate) / (365 x 100). The accumulated daily interest is debited from the account at the end of the month.' } },
    { '@type': 'Question', name: 'What is the difference between overdraft and a term loan?', acceptedAnswer: { '@type': 'Answer', text: 'Unlike term loans where interest is charged on the entire sanctioned principal from day one, overdraft interest is only charged on the exact amount you withdraw and for the specific days you utilize it.' } },
    { '@type': 'Question', name: 'Are there any non-utilization charges on overdraft limits?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, some banks charge a nominal fee (non-utilization charge) if the average utilization of the overdraft limit falls below a certain threshold (e.g., 25% of the limit) during the quarter.' } },
    { '@type': 'Question', name: 'What is the difference between Overdraft and Cash Credit (CC)?', acceptedAnswer: { '@type': 'Answer', text: 'Cash Credit accounts are primarily for businesses to fund working capital against stock and receivables, whereas Overdrafts can be backed by fixed deposits, property, insurance policies, or offered as unsecured lines for individuals.' } },
    { '@type': 'Question', name: 'Does deposit of cash reduce my overdraft interest instantly?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, because overdraft interest is calculated on the daily closing balance, depositing funds instantly reduces the outstanding utilized balance for that day, thereby reducing your interest outgo for the month.' } },
    { '@type': 'Question', name: 'Can I get an overdraft limit against my Fixed Deposit (FD)?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, banks in India routinely offer overdraft limits (usually up to 90% or 95% of the FD value) against fixed deposits. The interest rate is typically 1.00% to 2.00% higher than the rate earned on the underlying FD.' } },
    { '@type': 'Question', name: 'What happens if I exceed my overdraft limit?', acceptedAnswer: { '@type': 'Answer', text: 'Exceeding the sanctioned overdraft limit is discouraged and may lead to transaction declines, additional over-limit penalty fees, and a negative impact on your business relationship or CIBIL score.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Overdraft Interest Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/overdraft-interest-calculator',
  description: 'Calculate daily interest accrued on your bank overdraft limit or business cash credit line. Simulates transaction impacts on daily closing balances.',
  featureList: [
    'Overdraft limit and annual interest rate sliders',
    'Average daily utilized amount input',
    'Interactive transaction ledger simulator (add deposits and withdrawals)',
    'Daily interest calculation breakdown table',
    'Utilized vs available credit limit donut chart',
    'Multi-currency display support (INR, USD, EUR, GBP)',
    'localStorage settings persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Overdraft Limit Interest',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Overdraft Interest Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Set overdraft limit and annual rate', text: 'Adjust the sliders to specify your sanctioned overdraft limit and the annual interest rate charged by the bank.' },
    { '@type': 'HowToStep', position: 2, name: 'Provide average daily outstanding balance', text: 'Set the average amount of limit you utilize on a daily basis.' },
    { '@type': 'HowToStep', position: 3, name: 'Input days utilized and view interest due', text: 'Select the number of days you utilized the overdraft to instantly view the monthly interest charged.' },
    { '@type': 'HowToStep', position: 4, name: 'Simulate specific transactions', text: 'Add custom transaction rows to see exactly how deposits and withdrawals affect daily closing balances and interest.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Overdraft',
  alternateName: 'OD Account',
  description: 'A credit facility that allows account holders to withdraw money even when their account balance is zero or insufficient, up to a pre-set limit. Interest is charged only on the utilized balance on a daily basis.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking and Working Capital Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Overdraft',
    'https://www.wikidata.org/wiki/Page3397',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Overdraft Interest Calculator: Check Daily OD Limit Interest',
  url: 'https://fermor.in/calculators/overdraft-interest-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Overdraft', alternateName: 'OD Account' }],
  audience: { '@type': 'Audience', audienceType: 'Business owners, working capital managers, cash credit borrowers, personal line of credit holders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#od-basics', name: 'What Is an Overdraft Interest Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#od-formula', name: 'Overdraft Account Interest Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#od-vs-loan', name: 'Difference Between Overdraft and Term Loan' },
    { '@type': 'WebPageElement', cssSelector: '#daily-closing-balance', name: 'Why Daily Closing Balance Matters' },
    { '@type': 'WebPageElement', cssSelector: '#od-types', name: 'Types of Overdraft Facilities in India' },
    { '@type': 'WebPageElement', cssSelector: '#cc-vs-od', name: 'Cash Credit (CC) vs Overdraft (OD) Accounts' },
    { '@type': 'WebPageElement', cssSelector: '#od-rates', name: 'Overdraft Interest Rates Today' },
    { '@type': 'WebPageElement', cssSelector: '#fd-od-benefit', name: 'Overdraft Against Fixed Deposits (FD)' },
    { '@type': 'WebPageElement', cssSelector: '#hidden-costs', name: 'Hidden Fees and Non-Utilization Charges' },
    { '@type': 'WebPageElement', cssSelector: '#avoid-overlimit', name: 'Common Overdraft Account Mistakes to Avoid' },
    { '@type': 'WebPageElement', cssSelector: '#reducing-interest', name: 'Tips to Reduce Your Overdraft Interest Outgo' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of Overdraft Interest Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Overdraft Interest Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function OverdraftInterestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <OverdraftInterestCalculatorClient />
    </>
  );
}

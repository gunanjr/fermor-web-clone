import type { Metadata } from 'next';
import AprToMonthlyRateClient from './AprToMonthlyRateClient';

const PAGE_DATE_PUBLISHED = '2026-07-24';
const PAGE_DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: 'APR to Monthly Interest Rate Calculator: Loan & Credit Card Rate',
  description: 'Free APR to monthly rate calculator for India. Convert Annual Percentage Rate (APR) to monthly interest rate, daily rate, and Effective Annual Rate (EAR). Free to use.',
  keywords: [
    'apr to monthly rate calculator',
    'annual percentage rate to monthly interest calculator',
    'apr to monthly interest rate formula',
    'credit card apr to monthly rate',
    'personal loan apr to monthly interest',
    'effective annual rate ear calculator',
    'daily interest rate from apr calculator',
    'monthly compounding interest rate converter',
    'convert annual rate to monthly interest india',
    'flat interest rate vs reducing apr calculator',
    'credit card 36% apr monthly rate',
    'home loan 8.5% apr monthly rate',
  ],
  openGraph: {
    title: 'APR to Monthly Interest Rate Calculator: Loan & Credit Card Rate - Fermor',
    description: 'Convert APR percentage into nominal monthly rate, effective annual rate (EAR), and rupee interest payouts in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/apr-to-monthly-rate-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-apr-to-monthly-rate-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APR to Monthly Interest Rate Calculator - Fermor',
    description: 'Convert APR percentage into nominal monthly interest, daily interest, and EAR in India. Free to use.',
    images: ['https://fermor.in/og-apr-to-monthly-rate-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/apr-to-monthly-rate-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Annual Percentage Rate APR', 'Monthly Interest Rate Conversion', 'Effective Annual Rate EAR', 'Credit Card Monthly Interest 3%', 'Reducing Balance Interest', 'Compounding Frequency', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'APR to Monthly Rate Calculator', item: 'https://fermor.in/calculators/apr-to-monthly-rate-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I convert APR to monthly interest rate?', acceptedAnswer: { '@type': 'Answer', text: 'To convert APR to nominal monthly interest rate, divide the Annual Percentage Rate by 12 (Monthly Rate % = APR / 12).' } },
    { '@type': 'Question', name: 'What is monthly interest rate on 36% APR credit card in India?', acceptedAnswer: { '@type': 'Answer', text: 'A credit card with 36% APR has a monthly interest rate of 3.0% per month (36% / 12 = 3.0% pm).' } },
    { '@type': 'Question', name: 'What is the difference between APR and Effective Annual Rate (EAR)?', acceptedAnswer: { '@type': 'Answer', text: 'APR is the simple annual nominal rate excluding intra-year compounding, whereas Effective Annual Rate (EAR) incorporates monthly or daily compounding frequency.' } },
    { '@type': 'Question', name: 'How is daily interest rate calculated from APR?', acceptedAnswer: { '@type': 'Answer', text: 'Daily interest rate is calculated by dividing APR by 365 days (Daily Rate % = APR / 365).' } },
    { '@type': 'Question', name: 'Why do Indian credit cards quote monthly rates like 3.5% pm?', acceptedAnswer: { '@type': 'Answer', text: 'Indian credit card issuers frequently quote monthly interest rates like 3.5% per month, which equals an Annual Percentage Rate (APR) of 42% p.a. (3.5% × 12).' } },
    { '@type': 'Question', name: 'Does APR include processing fees and loan charges?', acceptedAnswer: { '@type': 'Answer', text: 'Under RBI guidelines, total effective APR for personal and home loans includes the headline interest rate plus mandatory upfront processing fees and documentation charges annualized over loan tenure.' } },
    { '@type': 'Question', name: 'How does compounding frequency affect total interest paid?', acceptedAnswer: { '@type': 'Answer', text: 'More frequent compounding (e.g. daily compounding vs annual compounding) increases the Effective Annual Rate (EAR) and total interest payout on overdue balances.' } },
    { '@type': 'Question', name: 'How does this APR converter work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator converts your input APR percentage into nominal monthly rate, daily interest rate, effective annual rate (EAR), and calculates exact rupee interest amounts on your principal.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'APR to Monthly Rate Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/apr-to-monthly-rate-calculator',
  description: 'Convert Annual Percentage Rate (APR) into nominal monthly interest rate, daily rate, EAR, and rupee interest payouts.',
  featureList: ['Nominal monthly rate vs Compounded EAR mode toggle', 'APR to monthly % formula converter', 'Daily interest rate % and rupee payout estimator', 'Compounding frequency selector (Monthly, Daily, Quarterly)', 'Donut chart principal vs interest breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Convert APR to Monthly Interest Rate', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor APR to Monthly Rate Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Annual Percentage Rate (APR %)', text: 'Input annual loan rate or credit card APR (e.g., 18% or 36%).' },
    { '@type': 'HowToStep', position: 2, name: 'Enter Principal amount', text: 'Input loan or balance amount in rupees.' },
    { '@type': 'HowToStep', position: 3, name: 'Select compounding frequency', text: 'Choose compounding frequency (Monthly or Daily).' },
    { '@type': 'HowToStep', position: 4, name: 'Review monthly % and rupee interest', text: 'View exact nominal monthly rate, EAR %, and monthly rupee interest.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Annual Percentage Rate', alternateName: 'APR',
  description: 'The annualized cost of credit expressed as a percentage, representing simple annual interest rate charged on loans or credit card balances.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Banking Interest Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Annual_percentage_rate'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'APR to Monthly Interest Rate Calculator: Loan & Credit Card Rate',
  url: 'https://fermor.in/calculators/apr-to-monthly-rate-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Annual Percentage Rate', alternateName: 'APR' }],
  audience: { '@type': 'Audience', audienceType: 'Borrowers, credit card holders, financial analysts, loan applicants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-apr-calculator', name: 'What Is an APR to Monthly Rate Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#apr-conversion-formula', name: 'APR Conversion Formulas' },
    { '@type': 'WebPageElement', cssSelector: '#apr-conversion-table', name: 'Common APR to Monthly Rate Conversion Table' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function AprToMonthlyRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AprToMonthlyRateClient />
    </>
  );
}

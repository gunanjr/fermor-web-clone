import type { Metadata } from 'next';
import PropertyAffordabilityClient from './PropertyAffordabilityClient';

const PAGE_DATE_PUBLISHED = '2026-07-27';
const PAGE_DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: 'Property Affordability Calculator: House Budget Limit',
  description: 'Free property affordability calculator for India. Calculate max house budget by salary, down payment savings, FOIR, and CIBIL score. Free to use.',
  keywords: [
    'property affordability calculator',
    'house affordability calculator',
    'home affordability calculator',
    'how much house can i afford calculator',
    'property buying budget calculator',
    'home buying capacity calculator',
    'property affordability calculator india',
    'home loan affordability calculator',
    'house budget calculator based on salary',
    'down payment property affordability calculator',
    'sbi property affordability calculator',
    'hdfc house affordability calculator',
    'property budget calculator with existing emi',
    'joint applicant property affordability calculator',
    'stamp duty registration property budget calculator',
    'max home purchase price calculator',
    'real estate affordability calculator',
    'flat purchase affordability calculator',
    'house buying power calculator india',
    'how much property can i buy on 1 lakh salary',
    'how much property can i buy on 50k salary',
    'nri property affordability calculator',
    'first time home buyer budget calculator',
  ],
  openGraph: {
    title: 'Property Affordability Calculator: Max House Budget - Fermor',
    description: 'Check maximum property purchase price based on monthly salary, down payment savings, existing EMIs, and bank FOIR limits. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/property-affordability-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-property-affordability-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Affordability Calculator - Fermor',
    description: 'Calculate max property purchase budget by salary, savings, and bank loan limits. Free to use.',
    images: ['https://fermor.in/og-property-affordability-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/property-affordability-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Property Affordability', 'Home Loan Limit', 'Down Payment Savings', 'FOIR Calculation', 'Stamp Duty Charges', 'Registration Fees', 'SBI Home Loan', 'HDFC Home Loan', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Property Affordability Calculator', item: 'https://fermor.in/calculators/property-affordability-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is property affordability calculated in India?', acceptedAnswer: { '@type': 'Answer', text: 'Property affordability is calculated by adding your maximum eligible home loan amount (derived from monthly income and FOIR) to your total upfront down payment savings.' } },
    { '@type': 'Question', name: 'What is the 3x or 4x income rule for home buying?', acceptedAnswer: { '@type': 'Answer', text: 'The general rule of thumb suggests buying a property priced at no more than 3 to 4 times your gross annual income, ensuring home loan EMIs remain comfortably within 40% to 50% of take-home pay.' } },
    { '@type': 'Question', name: 'How much property can I afford on a Rs 1 lakh salary?', acceptedAnswer: { '@type': 'Answer', text: 'On a Rs 1 lakh monthly salary with no existing EMIs, 50% FOIR, 8.4% rate for 20 years, and Rs 15 lakh down payment, you can afford a property priced at approximately Rs 73.1 lakh.' } },
    { '@type': 'Question', name: 'How much cash is needed upfront besides the down payment?', acceptedAnswer: { '@type': 'Answer', text: 'Besides the 10% to 20% down payment, buyers must budget 5% to 7% for stamp duty and registration fees, 1% for legal/processing charges, and 5% to 10% for interiors.' } },
    { '@type': 'Question', name: 'How do existing EMIs affect property buying budget?', acceptedAnswer: { '@type': 'Answer', text: 'Every Rs 10,000 in existing monthly EMIs reduces your home loan capacity by approximately Rs 11.5 lakh at 8.4% interest for 20 years, lowering your maximum property budget by the same amount.' } },
    { '@type': 'Question', name: 'What is RBI\'s LTV norm for home loans?', acceptedAnswer: { '@type': 'Answer', text: 'Per RBI norms, banks fund up to 90% for property loans up to Rs 30 lakh, 80% for loans between Rs 30 lakh and Rs 75 lakh, and 75% for loans exceeding Rs 75 lakh.' } },
    { '@type': 'Question', name: 'How does a joint applicant increase property affordability?', acceptedAnswer: { '@type': 'Answer', text: 'Adding a working spouse or parent as a co-applicant combines your monthly incomes, increasing your available EMI capacity and raising property budget by 40% to 70%.' } },
    { '@type': 'Question', name: 'What is FOIR and how does it restrict house budget?', acceptedAnswer: { '@type': 'Answer', text: 'FOIR (Fixed Obligation to Income Ratio) caps total monthly EMI payments at 50% to 60% of take-home salary, limiting the maximum home loan you can qualify for.' } },
    { '@type': 'Question', name: 'Can self-employed individuals calculate property affordability here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Self-employed applicants should enter monthly net profit from recent ITRs. Banks typically apply a 40% to 50% FOIR for self-employed borrowers.' } },
    { '@type': 'Question', name: 'What CIBIL score is required for maximum property loan approval?', acceptedAnswer: { '@type': 'Answer', text: 'A CIBIL score of 750 or above qualifies for headline home loan rates (around 8.35% to 8.40%), maximizing your eligible loan and overall property budget.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Property Affordability Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/property-affordability-calculator',
  description: 'Calculate maximum home property budget based on monthly salary, down payment savings, existing loan EMIs, interest rate, tenure, and FOIR limit.',
  featureList: ['Property Affordability calculation', 'Max Eligible Loan & Down Payment analysis', 'FOIR and LTV constraint checks', 'Bank comparison table', 'Amortization schedule for eligible loan', 'Stamp duty & registration estimator', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Property Affordability', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Property Affordability Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter monthly take-home salary', text: 'Enter your net monthly income. Toggle co-applicant if buying jointly.' },
    { '@type': 'HowToStep', position: 2, name: 'Set down payment savings', text: 'Enter total liquid savings available for upfront property down payment.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter existing EMIs and interest rate', text: 'Include car or personal loan EMIs and set the expected home loan rate and tenure.' },
    { '@type': 'HowToStep', position: 4, name: 'Review max house budget', text: 'See your maximum affordable property price, eligible loan, and required upfront cash.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Property Affordability', alternateName: 'Home Buying Budget Limit',
  description: 'The maximum purchase price of a residential property a buyer can fund by combining their maximum eligible bank loan with upfront cash savings.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate and Mortgage Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Affordable_housing'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Property Affordability Calculator: House Budget Limit',
  url: 'https://fermor.in/calculators/property-affordability-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Property Affordability', alternateName: 'Home Buying Budget Limit' }],
  audience: { '@type': 'Audience', audienceType: 'Indian home buyers, real estate investors, salaried borrowers, NRI investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-affordability', name: 'What Is Property Affordability' },
    { '@type': 'WebPageElement', cssSelector: '#affordability-formula', name: 'Property Affordability Formula' },
    { '@type': 'WebPageElement', cssSelector: '#affordability-by-salary', name: 'Property Budget by Salary' },
    { '@type': 'WebPageElement', cssSelector: '#ltv-and-down-payment', name: 'RBI LTV Norms and Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#bank-comparison', name: 'Bank FOIR and Loan Limits' },
    { '@type': 'WebPageElement', cssSelector: '#stamp-duty-costs', name: 'Stamp Duty and Hidden Property Costs' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formula', name: 'Property Affordability Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes in House Budgeting' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-improve', name: 'How to Improve Property Affordability' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PropertyAffordabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PropertyAffordabilityClient />
    </>
  );
}

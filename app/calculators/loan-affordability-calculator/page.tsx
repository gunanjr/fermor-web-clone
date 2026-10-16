import type { Metadata } from 'next';
import LoanAffordabilityClient from './LoanAffordabilityClient';

const PAGE_URL = 'https://fermor.in/calculators/loan-affordability-calculator';
const PAGE_TITLE = 'Loan Affordability Calculator: How Much Can I Borrow?';
const PAGE_DESCRIPTION =
  'Free loan affordability calculator for India. See the maximum home, personal or car loan your salary supports, a comfortable budget, and RBI down payment rules.';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-24';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    'loan affordability calculator',
    'how much loan can i afford',
    'how much can i borrow',
    'how much can i afford to borrow',
    'loan amount calculator',
    'maximum loan amount calculator',
    'maximum loan calculator',
    'salary based loan calculator',
    'loan based on income',
    'loan amount based on income',
    'income based loan calculator',
    'income to loan ratio',
    'how much loan can i get based on salary',
    'borrowing capacity calculator',
    'borrowing power calculator',
    'loan capacity calculator',
    'loan qualification calculator',
    'home loan affordability calculator',
    'home affordability calculator',
    'house affordability calculator',
    'how much house can i afford',
    'mortgage affordability calculator',
    'how much home loan can i get on 40000 salary',
    'how much home loan can i get on 50000 salary',
    'personal loan on 60000 salary',
    'maximum tenure for home loan',
    'personal loan max tenure',
    'loan tenure affordability calculator',
    'affordable monthly payment calculator',
    'debt to income ratio calculator',
  ],
  openGraph: {
    title: `${PAGE_TITLE} - Fermor`,
    description: 'See the maximum home, personal or car loan your salary supports, a comfortable borrowing budget, and the RBI down payment limits for a home loan. Free for India.',
    type: 'website',
    url: PAGE_URL,
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-loan-affordability-calculator.png', width: 1200, height: 630, alt: 'Fermor Loan Affordability Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PAGE_TITLE} - Fermor`,
    description: 'Maximum loan your salary supports, a comfortable budget, and RBI down payment rules. Free for India.',
    images: ['https://fermor.in/og-loan-affordability-calculator.png'],
  },
  alternates: { canonical: PAGE_URL },
};

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  {
    q: 'How much loan can I afford on my salary?',
    a: 'Lenders first work out how much EMI your income can carry: monthly income multiplied by their FOIR limit, minus the EMIs you already pay. That EMI is then converted into a loan amount using the interest rate and tenure. At a 50% limit, a Rs 60,000 monthly income with no other EMIs supports Rs 30,000 a month, which is a home loan of about Rs 34.57 lakh at 8.5% for 20 years.',
  },
  {
    q: 'How much home loan can I get on a 40,000 salary?',
    a: 'At a 50% FOIR limit with no other EMIs, a Rs 40,000 monthly income supports an EMI of Rs 20,000. At 8.5% that is a home loan of about Rs 23.05 lakh over 20 years, Rs 24.84 lakh over 25 years and Rs 26.01 lakh over 30 years. With the 90% loan-to-value limit RBI allows on loans up to Rs 30 lakh, Rs 23.05 lakh can finance a property of about Rs 25.61 lakh.',
  },
  {
    q: 'How much home loan can I get on a 50,000 salary?',
    a: 'At a 50% FOIR limit with no other EMIs, Rs 50,000 a month supports an EMI of Rs 25,000, or a home loan of about Rs 28.81 lakh at 8.5% for 20 years. Stretching the tenure to 25 years raises it to about Rs 31.05 lakh, at the cost of much more interest.',
  },
  {
    q: 'How much home loan can I get on a 30,000 salary?',
    a: 'At a 50% FOIR limit with no other EMIs, Rs 30,000 a month supports an EMI of Rs 15,000, which is a home loan of about Rs 17.28 lakh at 8.5% for 20 years. Adding an earning co-applicant is usually the quickest way to raise that figure.',
  },
  {
    q: 'How much personal loan can I get on a 60,000 salary?',
    a: 'At a 50% FOIR limit with no other EMIs, Rs 60,000 a month supports an EMI of Rs 30,000. At 12% that is a personal loan ceiling of about Rs 9.03 lakh over 3 years or Rs 13.49 lakh over 5 years. Lenders also apply their own maximum loan amounts and credit checks, so the actual offer can be lower.',
  },
  {
    q: 'What is the maximum tenure for a home loan?',
    a: 'SBI offers home loans for up to 30 years, provided the loan is repaid by the time the borrower turns 70 (75 under some of its schemes). Other lenders set their own limits. Age matters as much as the product maximum: if a lender wants the loan closed by 60, a 45-year-old can get at most 15 years.',
  },
  {
    q: 'What is the maximum tenure for a personal loan?',
    a: 'It depends on the lender. SBI\'s Xpress Credit personal loan, for example, runs from 6 months to 6 years. A longer tenure lowers the EMI and raises the amount you can borrow, but adds interest, and personal loan rates are usually much higher than home loan rates.',
  },
  {
    q: 'What is the maximum tenure for a car loan?',
    a: 'SBI allows up to 7 years on a new car loan and up to 5 years on a used car. Other lenders publish their own limits. Because a car loses value over time, a shorter tenure keeps the outstanding loan closer to what the car is actually worth.',
  },
  {
    q: 'What is FOIR?',
    a: 'FOIR (Fixed Obligation to Income Ratio) is the share of monthly income that goes to all loan EMIs together, including the new loan. Each lender sets its own FOIR limit in its credit policy. This calculator uses 50% by default; you can change it under More settings to match a lender\'s actual limit.',
  },
  {
    q: 'What is the difference between loan affordability and loan eligibility?',
    a: 'Eligibility is the most a lender will lend you under its rules. Affordability is how much you can repay comfortably once rent, family expenses and savings are paid for. This calculator shows both: the lender maximum at your FOIR limit, and a lower amount at a comfort limit you choose.',
  },
  {
    q: 'How is the maximum loan amount calculated?',
    a: 'Step one: available EMI = monthly income x FOIR limit - existing EMIs. Step two: maximum loan = available EMI x [(1 + r)^n - 1] / [r x (1 + r)^n], where r is the monthly interest rate (annual rate / 12 / 100) and n is the tenure in months. At 8.5% for 240 months, every Rs 1 of EMI supports about Rs 115.23 of loan.',
  },
  {
    q: 'How do existing EMIs affect how much I can borrow?',
    a: 'Existing EMIs come out of the same FOIR limit before the new loan is sized. On a Rs 60,000 income at a 50% limit, a Rs 5,000 EMI on another loan cuts a 20-year, 8.5% home loan from Rs 34.57 lakh to Rs 28.81 lakh, and a Rs 10,000 EMI cuts it to Rs 23.05 lakh.',
  },
  {
    q: 'How much down payment do I need for a home loan?',
    a: 'RBI caps the loan-to-value ratio for housing loans at 90% for loans up to Rs 30 lakh, 80% for loans above Rs 30 lakh up to Rs 75 lakh, and 75% above Rs 75 lakh. So the minimum down payment is 10%, 20% or 25% of the property cost. Stamp duty and registration are generally not included in the cost the bank finances, so they are paid on top.',
  },
  {
    q: 'How much house can I afford?',
    a: 'Take the maximum loan and divide it by the loan-to-value ratio that applies to it. A Rs 60,000 monthly income supports a home loan of about Rs 34.57 lakh at 8.5% for 20 years. That falls in RBI\'s 80% band, so it can finance a property of about Rs 43.21 lakh with a down payment of about Rs 8.64 lakh, before stamp duty and registration.',
  },
  {
    q: 'Does a longer tenure increase how much I can borrow?',
    a: 'Yes, but with sharply falling returns. On a Rs 25,000 EMI at 8.5%, the loan rises from about Rs 20.16 lakh over 10 years to Rs 28.81 lakh over 20 years and Rs 32.51 lakh over 30 years. Total interest over those tenures rises from Rs 9.84 lakh to Rs 31.19 lakh to Rs 57.49 lakh.',
  },
  {
    q: 'How does the interest rate affect how much I can borrow?',
    a: 'A higher rate means each rupee of EMI supports less loan. On a Rs 25,000 EMI over 20 years, the maximum home loan is about Rs 31.03 lakh at 7.5%, Rs 28.81 lakh at 8.5% and Rs 25.91 lakh at 10%.',
  },
  {
    q: 'Should I borrow the maximum the lender offers?',
    a: 'Not necessarily. The lender maximum leaves no room for rate rises, job changes or new expenses. On a Rs 60,000 income, capping all EMIs at 40% instead of 50% lowers the 20-year home loan from Rs 34.57 lakh to Rs 27.66 lakh, but leaves Rs 36,000 a month for everything else instead of Rs 30,000.',
  },
  {
    q: 'How can I increase how much I can borrow?',
    a: 'Add an earning co-applicant, clear small existing loans, choose a longer tenure, or qualify for a lower rate with a strong credit history. Adding a co-applicant earning Rs 40,000 to a Rs 60,000 income raises a 20-year, 8.5% home loan at a 50% limit from about Rs 34.57 lakh to Rs 57.62 lakh.',
  },
  {
    q: 'Should I enter gross salary or take-home salary?',
    a: 'Lenders assess income in different ways, so the safest input is your regular monthly take-home pay without one-off bonuses. That gives a conservative figure. If a lender tells you it uses gross income, enter that instead and compare.',
  },
  {
    q: 'Can self-employed borrowers use this calculator?',
    a: 'Yes. Divide your recent annual income as shown in your income tax returns by 12 and enter the result as monthly income. Lenders assess self-employed income from documents such as ITRs and bank statements, and their FOIR limits for self-employed borrowers can differ from salaried ones.',
  },
  {
    q: 'Is there an official limit on how much of my income can go to EMIs?',
    a: 'For most retail loans, the limit is set by each lender\'s credit policy. RBI does apply a hard cap in one segment: under its 2022 microfinance framework, repayments on all loans of a household cannot exceed 50% of monthly household income.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: ['Loan Affordability', 'FOIR Calculation', 'Loan Eligibility', 'Loan to Value Ratio', 'Home Loans India', 'Personal Loans India', 'EMI Calculation', 'Account Aggregator Framework', 'RBI Regulations'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Affordability Calculator', item: PAGE_URL },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Loan Affordability Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  featureList: [
    'Maximum loan at the lender FOIR limit',
    'Comfortable loan at a personal EMI limit',
    'Home, personal and car loan modes',
    'Age-based tenure cap',
    'Property value and down payment under RBI LTV limits',
    'Loan to annual income ratio',
    'Principal vs interest donut chart and year-by-year repayment schedule',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate How Much Loan You Can Afford', totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Affordability Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick the loan type', text: 'Choose Home Loan, Personal Loan or Car Loan. Each sets a typical rate and a tenure limit you can change.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter income and existing EMIs', text: 'Enter your regular monthly take-home income and the total of all EMIs you already pay.' },
    { '@type': 'HowToStep', position: 3, name: 'Set rate and tenure', text: 'Enter the expected interest rate and the tenure you want. The tenure is capped by your age under More settings.' },
    { '@type': 'HowToStep', position: 4, name: 'Adjust FOIR and comfort limits', text: 'Under More settings, set the lender FOIR limit, your own comfort limit for EMIs, your age and the age by which the loan must close.' },
    { '@type': 'HowToStep', position: 5, name: 'Read both answers', text: 'Compare the lender maximum with the comfortable loan, and for a home loan check the property value and down payment under RBI LTV limits.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio',
  description: 'The share of monthly income that goes to all fixed loan obligations, including the new loan, which lenders use to decide the maximum EMI and loan amount they will approve.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Debt-to-income_ratio', 'https://www.wikidata.org/wiki/Q5248585'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  about: [
    { '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' },
    { '@type': 'DefinedTerm', name: 'LTV', alternateName: 'Loan to Value Ratio' },
  ],
  audience: { '@type': 'Audience', audienceType: 'Indian salaried and self-employed borrowers, first-time home buyers, personal and car loan applicants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-loan-affordability', name: 'What Is Loan Affordability' },
    { '@type': 'WebPageElement', cssSelector: '#how-lenders-decide', name: 'How Lenders Decide How Much You Can Borrow' },
    { '@type': 'WebPageElement', cssSelector: '#affordability-formula', name: 'Loan Affordability Formula' },
    { '@type': 'WebPageElement', cssSelector: '#loan-by-salary', name: 'How Much Loan Can I Get on My Salary' },
    { '@type': 'WebPageElement', cssSelector: '#home-loan-by-salary', name: 'Home Loan and Property Budget by Salary' },
    { '@type': 'WebPageElement', cssSelector: '#maximum-tenure', name: 'Maximum Loan Tenure by Loan Type and Age' },
    { '@type': 'WebPageElement', cssSelector: '#tenure-and-affordability', name: 'How Tenure Changes How Much You Can Borrow' },
    { '@type': 'WebPageElement', cssSelector: '#rate-and-affordability', name: 'How the Interest Rate Changes How Much You Can Borrow' },
    { '@type': 'WebPageElement', cssSelector: '#existing-emis', name: 'How Existing EMIs Reduce Your Borrowing Capacity' },
    { '@type': 'WebPageElement', cssSelector: '#foir-and-dti', name: 'FOIR and Debt-to-Income Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#down-payment-ltv', name: 'Home Loan Down Payment and RBI LTV Limits' },
    { '@type': 'WebPageElement', cssSelector: '#lender-max-vs-comfortable', name: 'Lender Maximum vs Comfortable Loan' },
    { '@type': 'WebPageElement', cssSelector: '#increase-borrowing', name: 'How to Increase How Much You Can Borrow' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Loan Affordability Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LoanAffordabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LoanAffordabilityClient faqs={faqItems} />
    </>
  );
}

import type { Metadata } from 'next';
import LoanEligibilityClient from './LoanEligibilityClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/loan-eligibility-calculator`;
  return {
    title: 'Loan Eligibility Calculator: How Much Loan Can I Get?',
    description: 'Free loan eligibility calculator for India. Calculate your loan eligibility based on monthly income, existing obligations, interest rate, and tenure. Check how much loan you qualify for. No sign-up required.',
    keywords: [
      'loan eligibility calculator',
      'how much loan can i get',
      'loan eligibility based on salary',
      'personal loan eligibility calculator',
      'loan amount calculator by income',
      'loan eligibility check',
      'emi eligibility calculator',
      'loan qualification calculator',
      'income based loan calculator',
      'home loan eligibility calculator',
      'car loan eligibility calculator',
      'education loan eligibility',
      'loan eligibility formula',
      'multipler loan eligibility calculator',
      'loan sanction amount calculator',
      'loan eligible amount',
      'salary loan eligibility calculator',
      'loan eligibility calculator india',
      'nri loan eligibility calculator',
      'how is loan eligibility calculated',
      'loan eligibility excel',
      'maximum loan amount calculator',
      'affordable loan calculator',
      'loan pre-qualification calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Loan Eligibility Calculator: How Much Loan Can I Get?',
      description: 'Calculate your loan eligibility based on monthly income, obligations, and tenure. See the maximum loan amount you qualify for. No sign-up required.',
      images: ['https://fermor.in/og-loan-eligibility-calculator.png'],
    },
    openGraph: {
      title: 'Loan Eligibility Calculator: How Much Loan Can I Get? - Fermor',
      description: 'Calculate your loan eligibility based on monthly income, existing obligations, interest rate, and tenure. Check how much loan you qualify for with this free tool. No sign-up required.',
      type: 'website',
      url: 'https://fermor.in/calculators/loan-eligibility-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-loan-eligibility-calculator.png', width: 1200, height: 630, alt: 'Fermor Loan Eligibility Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-19';
const PAGE_DATE_PUBLISHED = '2026-06-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Loan Eligibility',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'RBI Guidelines',
    'Credit Score India',
    'EMI Calculation',
    'Home Loans India',
    'Personal Loans India',
    'Financial Planning India',
    'NRI Loans',
    'CIBIL Score',
  ],
};

const faqs = [
  { q: 'How is loan eligibility calculated?', a: 'Loan eligibility is calculated using your monthly income, existing monthly obligations, the interest rate, and the loan tenure. Most lenders use the 50 per cent FOIR rule: your total monthly EMI payments including the proposed loan cannot exceed 50 per cent of your monthly income. The eligible loan amount is the maximum loan where the EMI fits within this limit.' },
  { q: 'What is the 50 per cent FOIR rule?', a: 'FOIR stands for Fixed Obligation to Income Ratio. Lenders typically cap your total EMIs at 40 to 55 per cent of your monthly income. This calculator uses 50 per cent as the standard. If your monthly income is Rs 1 lakh and you have existing EMI of Rs 10,000, your available capacity for new EMI is Rs 40,000 per month.' },
  { q: 'What factors affect loan eligibility?', a: 'The primary factors are: monthly income (higher income means higher eligibility), existing obligations (existing EMIs reduce availability), interest rate (higher rate means lower eligibility for same EMI), tenure (longer tenure increases eligibility), age (younger applicants get longer tenures), credit score (CIBIL score above 750 improves approval chances and rates), and the type of loan (secured loans like home loans have higher eligibility than unsecured personal loans).' },
  { q: 'How much personal loan can I get on a Rs 30,000 salary?', a: 'On a monthly salary of Rs 30,000 with no existing EMIs, at 12 per cent interest for 5 years, your eligible loan amount is approximately Rs 6.7 lakhs. The calculation: 50 per cent of Rs 30,000 is Rs 15,000 available for EMI. At 12 per cent for 60 months, this supports a loan of about Rs 6.7 lakhs. Actual eligibility depends on your credit score and the lender policies.' },
  { q: 'What is the multiplier method for loan eligibility?', a: 'Some lenders use a simple multiplier on your annual income instead of the FOIR method. For personal loans, the multiplier ranges from 10 to 27 times your monthly income depending on the lender and your employer profile. For example, a salary of Rs 50,000 per month with a multiplier of 15 gives eligibility of Rs 7.5 lakhs. FOIR-based calculation is more accurate and this calculator uses that method.' },
  { q: 'Does my CIBIL score affect loan eligibility?', a: 'Yes. A CIBIL score above 750 generally qualifies for the best interest rates and maximum loan amounts. Scores between 700 and 750 may still qualify but with higher interest rates. Scores below 650 often face rejection or significantly reduced eligibility. This calculator shows the maximum eligible amount based on income and obligations, but your actual sanctioned amount depends on your credit score and lender policies.' },
  { q: 'Can I increase my loan eligibility?', a: 'Yes. You can increase loan eligibility by: adding a co-applicant with income, extending the loan tenure, reducing existing debt by prepaying outstanding loans, increasing your income through other sources, or improving your credit score above 750. Adding a co-applicant can increase eligibility by 30 to 50 per cent depending on their income.' },
  { q: 'How does tenure affect loan eligibility?', a: 'Longer tenure reduces the EMI amount for the same loan, which increases your eligibility. For example, at 10 per cent interest, a 3-year tenure supports a loan of Rs 5 lakhs with EMI of Rs 16,134. The same EMI over 5 years supports a loan of Rs 7.6 lakhs. However, longer tenure means more total interest paid over the life of the loan.' },
  { q: 'What is the difference between loan eligibility and loan sanction?', a: 'Loan eligibility is the maximum amount you qualify for based on your income and obligations. Loan sanction is the amount the lender actually approves after verifying your documents, credit score, employment, and other factors. Sanctioned amount can be lower than eligibility if you have a low credit score, irregular income, or other risk factors identified during underwriting.' },
  { q: 'What is the home loan eligibility for a Rs 1 lakh salary?', a: 'On a monthly salary of Rs 1,00,000 with no existing EMIs, at 8.5 per cent interest for 20 years, your eligible home loan amount is approximately Rs 57 lakhs. The calculation: available EMI of Rs 50,000 per month at 8.5 per cent for 240 months supports a loan of approximately Rs 57 lakhs. Adding a co-applicant can increase this further.' },
  { q: 'Do NRIs have different loan eligibility criteria?', a: 'NRI loan eligibility is calculated similarly using your foreign income, but lenders apply a different FOIR percentage (typically 40 to 50 per cent of gross income) and may require higher down payments. NRIs also face currency risk assessment and need to provide income proof such as employment contract, salary slips, and bank statements from the foreign country.' },
  { q: 'What is the loan eligibility for self-employed individuals?', a: 'For self-employed individuals, lenders assess eligibility based on average net profit from the last 2 to 3 years of IT returns instead of monthly salary. The FOIR calculation uses the monthly equivalent income (average annual profit divided by 12). Self-employed applicants typically need to provide IT returns, GST filings, and CA-certified financial statements.' },
  { q: 'How is the eligible loan amount calculated in this tool?', a: 'This calculator uses the FOIR method. It takes your monthly income, subtracts existing monthly obligations, applies the FOIR percentage (default 50 per cent), and uses the resulting available EMI capacity along with the interest rate and tenure to calculate the maximum loan amount you can afford.' },
  { q: 'What is the formula for loan eligibility?', a: 'Eligible Loan Amount = Maximum Loan where EMI equals Available Monthly Capacity. Available Capacity = (Monthly Income x FOIR Percentage) minus Existing Monthly Obligations. EMI = Loan Amount x (Monthly Rate x (1 + Monthly Rate)^Tenure) / ((1 + Monthly Rate)^Tenure minus 1). The calculator solves for Loan Amount given the EMI capacity.' },
  { q: 'How does a longer tenure change loan eligibility in practice?', a: 'At 10 per cent interest, extending a loan from 5 years to 10 years increases eligibility by roughly 60 per cent for the same available monthly EMI, since the same monthly payment can support a larger principal when spread over more months. Total interest paid does increase, so this is a trade-off between eligibility and total cost.' },
  { q: 'How much does reducing existing EMI obligations improve eligibility?', a: 'At 10 per cent interest over a 10-year tenure, every Rs 1,000 reduction in existing monthly EMI obligations adds roughly Rs 75,000 to your loan eligibility, since that freed-up capacity becomes available for a new loan instead.' },
  { q: 'What documents do self-employed applicants need for loan eligibility assessment?', a: 'Self-employed applicants typically need 2 to 3 years of Income Tax Returns, GST filings, bank statements for the last 6 to 12 months, and a CA-certified profit and loss statement and balance sheet. Lenders often apply a more conservative FOIR, around 40 to 45 per cent, to account for income variability.' },
  { q: 'Do NRIs need a co-applicant to get a loan in India?', a: 'Most Indian banks require a resident Indian co-applicant for NRI loans, typically a parent or close relative, since the loan is disbursed and recovered within India. NRI home loans also usually require a higher down payment (lower loan-to-value ratio) than resident home loans.' },
  { q: 'Does the RBI regulate how lenders calculate loan eligibility?', a: 'The RBI does not mandate a specific FOIR percentage, but it does require banks and NBFCs to follow responsible lending norms that include verifying a borrower’s repayment capacity before sanctioning any loan. The specific FOIR threshold and multiplier used are commercial decisions made by each individual lender within this broader responsible-lending framework.' },
  { q: 'Can two people combine their income for a joint loan eligibility calculation?', a: 'Yes. Adding a co-applicant, typically a spouse or parent, combines both incomes for the FOIR calculation, which can increase eligibility by 30 to 50 per cent depending on the co-applicant’s income and existing obligations. This is especially common and encouraged for home loans.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Eligibility Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/loan-eligibility-calculator',
  description: 'Calculate your maximum loan eligibility based on monthly income, existing obligations, interest rate, and tenure. Includes FOIR calculation, EMI breakdown, and multi-currency support. Free, browser-based, no sign-up.',
  featureList: [
    'Loan Eligibility Calculator',
    'FOIR-based eligibility analysis',
    'EMI calculation for eligible amount',
    'Total interest and repayment projection',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Customisable FOIR percentage',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Eligibility Calculator', item: 'https://fermor.in/calculators/loan-eligibility-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Loan Eligibility',
  description: 'Step-by-step guide to calculate your maximum eligible loan amount using the FOIR method.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Eligibility Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your monthly income', text: 'Enter your total monthly income from salary, business, or other regular sources. This is the starting point for the eligibility calculation.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter existing monthly obligations', text: 'Enter the total EMI you already pay on existing loans, credit cards, or other monthly debt commitments.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the interest rate and tenure', text: 'Enter the expected interest rate and the loan tenure in years. Longer tenure increases eligibility but also increases total interest payable.' },
    { '@type': 'HowToStep', position: 4, name: 'Review your eligible loan amount', text: 'The calculator shows your maximum eligible loan amount based on the FOIR rule, along with the monthly EMI, total interest, and total repayment.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'FOIR',
  alternateName: 'Fixed Obligation to Income Ratio',
  description: 'The percentage of monthly income that goes towards fixed obligations like loan EMIs. Lenders typically cap this at 40 to 55 per cent for determining loan eligibility.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Debt-to-income_ratio', 'https://www.wikidata.org/wiki/Q212880'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Loan Eligibility Calculator: How Much Loan Can I Get?',
  description: 'Calculate your loan eligibility using the FOIR method based on monthly income, existing obligations, interest rate, and tenure.',
  url: 'https://fermor.in/calculators/loan-eligibility-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' }],
  audience: { '@type': 'Audience', audienceType: 'Indian loan seekers, salaried employees, self-employed, NRI borrowers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-loan-eligibility', name: 'What Is Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-formula', name: 'Loan Eligibility Formula' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-foir', name: 'FOIR Calculation Method' },
    { '@type': 'WebPageElement', cssSelector: '#factors-affecting-eligibility', name: 'Factors Affecting Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#improve-loan-eligibility', name: 'How to Improve Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-by-income', name: 'Loan Eligibility by Income' },
    { '@type': 'WebPageElement', cssSelector: '#home-loan-vs-personal-loan-eligibility', name: 'Home Loan vs Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-excel', name: 'Loan Eligibility in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-self-employed', name: 'Loan Eligibility for Self-Employed Applicants' },
    { '@type': 'WebPageElement', cssSelector: '#loan-eligibility-nri', name: 'Loan Eligibility for NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#limitations-of-loan-eligibility-calculators', name: 'Limitations of Loan Eligibility Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Loan Eligibility Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function LoanEligibilityCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LoanEligibilityClient faqs={faqs} />
    </>
  );
}

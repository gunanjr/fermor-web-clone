import type { Metadata } from 'next';
import LoanCalculatorClient from './LoanCalculatorClient';

export const metadata: Metadata = {
  title: 'Loan Calculator: EMI, Interest and Repayment Schedule',
  description: 'Free loan calculator for India. Calculate EMI, total interest, prepayment savings, and moratorium impact for any loan. Full amortization schedule. Free to use.',
  keywords: 'loan calculator, loan EMI calculator, loan repayment calculator, loan amount calculator, loan interest calculator, online loan calculator, EMI calculator online, bank loan calculator, term loan EMI calculator, loan foreclosure calculator, loan tenure calculator, moratorium calculator, installment loan calculator, personal loan calculator, top up loan calculator, loan eligibility calculator, flat rate EMI calculator, reducing balance EMI calculator, loan amortization schedule, EMI calculator India, loan calculator with prepayment, loan calculator with moratorium period',
  openGraph: {
    title: 'Loan Calculator: EMI, Interest and Repayment Schedule',
    description: 'Calculate loan EMI, total interest, prepayment savings, and moratorium impact with a full month-by-month amortization schedule.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/loan-calculator',
  },
};

const DATE_PUBLISHED = '2026-06-11';
const DATE_MODIFIED = '2026-09-11';

const faqItems = [
  {
    q: 'How is loan EMI calculated?',
    a: 'Loan EMI is calculated using the reducing-balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. P is the principal loan amount, R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the number of monthly instalments. The EMI stays fixed for the entire tenure, but the split between principal and interest changes every month as the outstanding balance falls.',
  },
  {
    q: 'What is the difference between a flat rate and a reducing balance rate?',
    a: 'In the flat rate method, interest is charged on the full original principal for the entire tenure, which makes the real cost of the loan much higher than the quoted rate suggests. In the reducing balance method, interest is charged only on the outstanding principal, which falls every month. Every bank and NBFC in India uses the reducing balance method for EMI-based personal, home, and car loans.',
  },
  {
    q: 'Does prepayment actually save interest on a loan?',
    a: 'Yes. Prepayment reduces your outstanding principal immediately, which cuts the interest charged on every EMI after that point. On a floating-rate loan, RBI rules bar lenders from charging a prepayment penalty. On a fixed-rate personal loan, lenders can still charge a penalty of roughly 2 to 5 percent of the prepaid amount, so check your loan agreement before prepaying.',
  },
  {
    q: 'What is a loan moratorium and how does it affect my EMI?',
    a: 'A moratorium is an agreed period during which you do not pay any EMI, usually granted during construction of a property or the study period of an education loan. Interest still accrues during this window and gets added to your principal, so your EMI after the moratorium ends is higher than if repayment had started immediately. Use the advanced settings in this calculator to see the exact EMI increase for your loan.',
  },
  {
    q: 'What happens if I miss an EMI payment?',
    a: 'Missing an EMI attracts a late payment fee, a penal charge on the overdue amount, and a negative mark on your credit report that most lenders can see within 30 to 45 days. If EMIs are missed for 90 days in a row, the loan is classified as a Non-Performing Asset and the lender can start legal recovery. Setting up auto-debit from your salary account is the simplest way to avoid this.',
  },
  {
    q: 'Can I change my loan tenure after taking the loan?',
    a: 'Most lenders allow tenure changes through a loan restructuring request. Extending the tenure lowers your EMI but raises total interest paid. Shortening the tenure raises your EMI but cuts total interest. Some lenders charge a nominal restructuring fee, and a tenure change usually triggers a fresh credit check.',
  },
  {
    q: 'What credit score do I need for a loan?',
    a: 'A CIBIL score of 750 or above gets you the best rates from nearly every lender in India. Scores between 700 and 749 usually still get approved, but at a higher interest rate. Below 700, approval becomes difficult with banks and you may need to look at NBFCs, which charge more. Paying every EMI on time is the single biggest factor in keeping your score above 750.',
  },
  {
    q: 'How much loan can I get based on my salary?',
    a: 'Most Indian lenders use FOIR, the Fixed Obligation to Income Ratio, and cap all your EMIs combined at 40 to 50 percent of gross monthly income. On a salary of Rs 80,000 with no existing EMIs, a lender working with a 40 percent FOIR would allow a total EMI of up to Rs 32,000. The exact figure depends on your income, existing loans, interest rate, and tenure, which the loan eligibility calculator checks directly.',
  },
  {
    q: 'What is a top-up loan?',
    a: 'A top-up loan is additional credit sanctioned over an existing loan, usually a home loan, once you have built up repayment history and the property value has appreciated. Because it rides on an existing secured loan, the interest rate on a top-up is typically lower than a fresh personal loan, and disbursal is faster since the lender already has your documents on file.',
  },
  {
    q: 'What documents are needed for a loan application?',
    a: 'Salaried applicants typically need PAN, Aadhaar, the last three months of salary slips, six months of bank statements, and Form 16. Self-employed applicants need two to three years of ITR filings, profit and loss statements, and business bank statements. Secured loans such as home or car loans additionally need property or vehicle documents.',
  },
  {
    q: 'How does loan processing fee affect the total cost?',
    a: 'Processing fee is a one-time charge, usually 0.5 to 2.5 percent of the loan amount, deducted upfront or added to the loan. It does not change your EMI but it does raise the effective cost of borrowing. This calculator adds processing fee to the total amount payable so you see the real cost of the loan, not just the EMI and interest.',
  },
  {
    q: 'What is the maximum loan tenure for a personal loan?',
    a: 'Personal loan tenure in India typically ranges from 12 to 60 months, with a handful of lenders going up to 84 months. Home loans go up to 30 years and car loans up to 7 years. A longer tenure lowers the EMI but increases total interest paid, so tenure should be chosen based on what EMI fits your monthly budget, not the lowest number on offer.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India that combines calculator tools and an eligibility engine to help people move from a financial question to a decision they can act on. The calculators, including this loan calculator, are free to use and show you exactly what a loan will cost before you apply. A free account lets you save your calculations.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/loan-calculator',
  description: 'Calculate monthly EMI, total interest, processing fee impact, prepayment savings, moratorium effect, and a full amortization schedule for any loan.',
  featureList: [
    'Monthly EMI calculation with reducing-balance formula',
    'Processing fee included in total cost of loan',
    'Prepayment and foreclosure savings calculator',
    'Moratorium period EMI impact calculator',
    'Month-by-month amortization schedule with stacked bar chart',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Calculator', item: 'https://fermor.in/calculators/loan-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Loan EMI',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter loan amount', text: 'Enter the principal amount you plan to borrow using the loan amount slider.' },
    { '@type': 'HowToStep', position: 2, name: 'Set interest rate', text: 'Set the annual interest rate quoted by your lender.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose tenure', text: 'Choose your loan tenure in months or years.' },
    { '@type': 'HowToStep', position: 4, name: 'Add processing fee', text: 'Add the processing fee percentage to see the true total cost of the loan.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your results', text: 'Read your monthly EMI, total interest, and total amount payable instantly, or open More settings to model prepayment or a moratorium period.' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Loan EMI Calculation',
    'Reducing Balance Interest',
    'Personal Finance India',
    'Credit Score and CIBIL',
    'RBI Lending Guidelines',
    'Loan Amortization',
    'Account Aggregator Framework',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Loan Calculator: EMI, Interest and Repayment Schedule',
  url: 'https://fermor.in/calculators/loan-calculator',
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
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
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried and self-employed borrowers, loan applicants',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-a-loan', name: 'What Is a Loan?' },
    { '@type': 'WebPageElement', cssSelector: '#emi-formula', name: 'Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#emi-excel', name: 'Loan EMI Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-loan-calculator', name: 'Reverse Loan Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#flat-vs-reducing', name: 'Flat Rate vs Reducing Balance' },
    { '@type': 'WebPageElement', cssSelector: '#types-of-loans', name: 'Types of Loan EMI Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#amortization-schedule', name: 'Loan Repayment Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-foreclosure', name: 'Prepayment and Foreclosure' },
    { '@type': 'WebPageElement', cssSelector: '#moratorium', name: 'Loan Moratorium' },
    { '@type': 'WebPageElement', cssSelector: '#factors-affecting-emi', name: 'Factors Affecting EMI' },
    { '@type': 'WebPageElement', cssSelector: '#credit-score', name: 'Credit Score for Loan Approval' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EMI',
  alternateName: 'Equated Monthly Instalment',
  description: 'EMI is the fixed monthly payment a borrower makes to a lender to repay a loan, covering both principal and interest, calculated so the loan is fully repaid by the end of the agreed tenure.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equated_monthly_installment',
    'https://www.wikidata.org/wiki/Q65090815',
  ],
};

export default function LoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LoanCalculatorClient />
    </>
  );
}

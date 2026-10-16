import type { Metadata } from 'next';
import LoanPrepaymentCalculatorClient from './LoanPrepaymentCalculatorClient';

const PAGE_URL = 'https://fermor.in/calculators/loan-prepayment-calculator';
const PAGE_TITLE = 'Loan Prepayment Calculator: Interest Saved & Reduce EMI';
const PAGE_DESCRIPTION =
  'Free loan prepayment calculator for India. See interest saved from monthly or lump sum prepayment, and compare reduce tenure vs reduce EMI. Free to use.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      'loan prepayment calculator',
      'prepayment calculator',
      'loan early repayment calculator',
      'emi prepayment calculator',
      'prepayment personal loan calculator',
      'loan calculator with extra payments',
      'emi calculator with prepayment',
      'prepayment emi reduction calculator',
      'personal loan prepayment calculator india',
      'car loan prepayment calculator',
      'personal loan prepayment calculator',
      'loan part payment calculator',
      'preclosure home loan calculator',
      'preclosure of personal loan calculator',
      'housing loan prepayment calculator',
      'home loan prepayment calculator',
      'mortgage prepayment calculator',
      'early loan repayment calculator',
      'loan prepayment calculator india',
      'personal loan lump sum repayment calculator',
      'home loan prepayment calculator reduce tenure',
      'home loan prepayment calculator reduce emi',
      'emi calculator with prepayment schedule',
      'emi calculator with prepayment option',
      'loan pre closure calculation',
      'lump sum loan repayment calculator',
      'prepayment vs investment calculator',
      'loan tenure reduction calculator',
      'car loan part prepayment calculator',
    ],
    alternates: { canonical: PAGE_URL },
    twitter: {
      card: 'summary_large_image',
      title: `${PAGE_TITLE} - Fermor`,
      description: 'See interest saved from a monthly extra or lump sum prepayment, and compare reduce tenure vs reduce EMI. Free for India.',
      images: ['https://fermor.in/og-loan-prepayment-calculator.png'],
    },
    openGraph: {
      title: `${PAGE_TITLE} - Fermor`,
      description: 'Calculate interest saved by prepaying a home, personal, car or education loan. Monthly extra or lump sum, reduce tenure or reduce EMI, side-by-side original vs prepaid comparison. Free for India.',
      type: 'website',
      url: PAGE_URL,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-loan-prepayment-calculator.png', width: 1200, height: 630, alt: 'Fermor Loan Prepayment Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-24';
const PAGE_DATE_PUBLISHED = '2026-06-30';

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  {
    q: 'How does prepaying a loan save interest?',
    a: 'A prepayment reduces the outstanding principal immediately, and interest is charged on that reduced balance every month after. Less balance means less interest in every remaining EMI, for the rest of the loan. A prepayment made early saves more than the same amount paid later, because it stays out of the interest calculation for longer.',
  },
  {
    q: 'What is the difference between prepayment, part payment and preclosure?',
    a: 'Prepayment and part payment mean the same thing: paying extra toward principal while the loan continues. Preclosure (also called foreclosure) means paying off the entire outstanding balance at once and closing the loan before its scheduled end date. Both reduce interest; preclosure ends the loan immediately, prepayment only shortens it or lowers the EMI.',
  },
  {
    q: 'Is there a prepayment penalty on loans in India?',
    a: 'Not on floating-rate loans to individuals for non-business purposes. RBI barred banks from charging this since May 2014 and extended the same rule to NBFCs in August 2019. The RBI Pre-payment Charges on Loans Directions, 2025 apply it to all such loans, and to MSEs, sanctioned or renewed from 1 January 2026. Fixed-rate loans, including most personal loans, can still carry a charge.',
  },
  {
    q: 'What are typical prepayment or foreclosure charges on a fixed-rate loan?',
    a: 'Charges vary by lender and loan type, commonly 2% to 5% of the outstanding principal, plus GST. Some lenders taper the charge down the longer the loan has run; for example, a car loan foreclosed within a year can carry a higher charge than one foreclosed after two years. Check your loan\'s Key Facts Statement for the exact figure.',
  },
  {
    q: 'Should I prepay my loan or invest the money instead?',
    a: 'Compare the loan rate with the after-tax return you expect from investing. Prepaying is a guaranteed, risk-free return equal to the loan rate. On a Rs 30 lakh loan at 8.5% for 20 years, prepaying Rs 5,000 a month saves Rs 11.73 lakh in interest over 15 years, while the same amount invested in equity at a 12% CAGR would show a gain of about Rs 16.23 lakh, before tax and market risk.',
  },
  {
    q: 'What is the difference between reduce tenure and reduce EMI after a prepayment?',
    a: 'Reduce tenure keeps the EMI the same and shortens how long the loan runs. Reduce EMI keeps the original end date and lowers the monthly payment instead. Reduce tenure always saves more total interest for the same prepayment, because it stops paying interest on that amount sooner rather than spreading a smaller saving across the full remaining term.',
  },
  {
    q: 'Which saves more: reducing EMI or reducing tenure?',
    a: 'Reducing tenure saves more interest for an identical prepayment. On a Rs 30 lakh loan at 8.5% for 20 years, a Rs 5 lakh prepayment in the third year saves Rs 12.80 lakh in interest if the tenure is cut, versus Rs 4.75 lakh if the EMI is cut instead and the original end date is kept. Reduce EMI is worth choosing only when the lower monthly payment itself is the priority.',
  },
  {
    q: 'What is the difference between lump sum and monthly extra prepayment?',
    a: 'A lump sum prepayment is a single large payment, for example from a bonus, that cuts the principal at once. A monthly extra prepayment adds a smaller fixed amount to every EMI going forward. Both work; monthly extra is easier to sustain from a regular salary, while a lump sum has a bigger one-time impact if the amount is large.',
  },
  {
    q: 'How much can I save by prepaying a home loan early?',
    a: 'For a Rs 30 lakh home loan at 8.5% for 20 years, an extra Rs 5,000 a month from year one saves Rs 11.73 lakh in interest and shortens the loan by 6 years 4 months. A one-time Rs 5 lakh prepayment in year 3 saves Rs 12.80 lakh, more than the same amount would save if paid in year 10 (Rs 5.88 lakh), because more interest is still ahead of it.',
  },
  {
    q: 'When is the best time to prepay a loan?',
    a: 'As early as possible. On a 20-year loan at 8.5%, about 81.6% of the very first EMI is interest, and interest still makes up roughly 77% of every EMI paid across the first five years. A prepayment in year 3 of that loan saves more than double what the same amount saves in year 10, because it removes principal while the interest share is still highest.',
  },
  {
    q: 'Does prepaying reduce my EMI or my loan tenure?',
    a: 'You choose. Reducing tenure keeps the EMI fixed and closes the loan sooner, saving the most total interest. Reducing EMI keeps the original tenure and lowers the monthly payment, which helps if cash flow is tight now. This calculator lets you toggle between both for a lump sum prepayment.',
  },
  {
    q: 'Can I make a part payment without closing the whole loan?',
    a: 'Yes, that is what a prepayment or part payment is. The loan continues at a lower balance. Many lenders set a minimum part-payment amount and some allow it only after a minimum number of EMIs, so check your loan agreement or Key Facts Statement for the exact rules.',
  },
  {
    q: 'How does loan prepayment affect the amortization schedule?',
    a: 'The outstanding balance drops on the date of the prepayment, so every EMI after that date carries less interest and more principal than it would have. If the tenure is reduced, the schedule simply ends earlier. If the EMI is reduced, the schedule runs the same number of months but each EMI is smaller.',
  },
  {
    q: 'Should I prepay a personal loan or a home loan first?',
    a: 'Compare the interest rate, not just the loan type. Personal loans typically run at 11% to 24%, well above a home loan\'s 8% to 10%, so the same rupee prepaid on a personal loan usually earns a higher guaranteed return. A home loan\'s much longer remaining tenure can still produce a bigger absolute rupee saving from an equal prepayment, so check both angles with this calculator before deciding.',
  },
  {
    q: 'What are the tax implications of prepaying a home loan?',
    a: 'Prepaying cuts the interest you pay in future years, which can reduce your Section 24(b) claim if your interest was already close to the Rs 2 lakh annual cap. It also reduces the principal available for the Section 80C claim in later years. Under the new tax regime, neither deduction applies to a self-occupied home, so this is not a factor.',
  },
  {
    q: 'Can I prepay a car loan or a two-wheeler loan?',
    a: 'Yes, though many lenders limit part payments on vehicle loans. HDFC Bank, for example, allows two part payments over the car loan, no more than one a year, each up to 25% of the outstanding principal. Fixed-rate vehicle loans often carry a foreclosure charge that steps down the longer the loan has run.',
  },
  {
    q: 'Is there a prepayment calculator with extra payments for any loan type?',
    a: 'Yes, this calculator works for home, personal, car, education and business term loans; only the amount, rate and tenure need to change. It supports both a recurring extra monthly payment and a one-time lump sum, unlike calculators built for a single loan type.',
  },
  {
    q: 'How do I calculate loan preclosure or foreclosure charges?',
    a: 'Foreclosure charges are usually a percentage of the outstanding principal at closure, commonly 2% to 5% plus GST, and apply mainly to fixed-rate loans since floating-rate loans to individuals carry no such charge by law. Check the exact percentage and any minimum lock-in period in your loan agreement or Key Facts Statement before paying. For a fixed-rate loan, enter the charge under More settings in this calculator to see the net saving.',
  },
  {
    q: 'Does a prepayment always reduce the total number of EMIs?',
    a: 'Only if you choose to reduce tenure. In reduce-tenure mode, yes, fewer EMIs remain because the fixed EMI clears a smaller balance sooner. In reduce-EMI mode, the number of EMIs stays the same as originally scheduled; only the EMI amount drops.',
  },
  {
    q: 'What happens if I prepay more than the outstanding balance?',
    a: 'You cannot prepay more than what you owe. Most lenders cap a part payment at the outstanding principal at that time; anything beyond it either gets refunded or is not accepted. This calculator caps a lump sum prepayment at the remaining balance for the same reason.',
  },
  {
    q: 'Can NRIs prepay a home loan taken in India?',
    a: 'Yes. NRIs can prepay through NRE, NRO or FCNR accounts, subject to the lender\'s process and RBI\'s foreign exchange rules on remittances. The prepayment mechanics, interest savings and any applicable charges work exactly as they would for a resident borrower.',
  },
  {
    q: 'Is loan prepayment better than a fixed deposit?',
    a: 'A prepayment gives a guaranteed return equal to the loan rate, which is usually higher than a comparable fixed deposit rate and is not taxed the way FD interest is. An FD keeps the money liquid and accessible; a prepayment locks the saving into the loan, since it cannot be withdrawn back out later.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 200,
    height: 60,
  },
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Loan Prepayment',
    'Loan Foreclosure',
    'EMI Reduction',
    'Loan Repayment India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'RBI Regulations',
    'Debt Management',
  ],
};

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
  name: 'Loan Prepayment Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  featureList: [
    'Interest Saved from Monthly Extra or Lump Sum Prepayment',
    'Reduce Tenure vs Reduce EMI Comparison',
    'Original vs Prepaid Side-by-Side Comparison',
    'Loan Age Input for an Already-Running Loan',
    'Prepayment Charge Input with Net Saving After Charge',
    'Year-by-Year Amortization Comparison with Bar Chart',
    'Works for Home, Personal, Car and Education Loans',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Prepayment Calculator', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Loan Prepayment Savings',
  description: 'Calculate how much interest a monthly extra payment or a lump sum prepayment saves, and compare reducing tenure against reducing EMI.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Prepayment Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter loan details', text: 'Input the loan amount, annual interest rate and original tenure. If the loan is already running, set how many years have passed under Loan Age, and for a fixed-rate loan enter the prepayment charge.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose Monthly Extra or Lump Sum', text: 'Pick Monthly Extra for a recurring additional payment, or Lump Sum for a one-time payment tied to a specific EMI number.' },
    { '@type': 'HowToStep', position: 3, name: 'For a lump sum, pick Reduce Tenure or Reduce EMI', text: 'Reduce Tenure keeps the EMI fixed and shortens the loan. Reduce EMI keeps the original end date and lowers the EMI instead.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the savings', text: 'Check interest saved, the new tenure or new EMI, and the side-by-side original vs prepaid comparison.' },
    { '@type': 'HowToStep', position: 5, name: 'Open the amortization comparison', text: 'Expand the comparison section to see the year-by-year original and prepaid schedules with a bar chart.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Loan Prepayment',
  alternateName: 'Prepayment',
  description: 'Loan prepayment is any payment made toward a loan above the scheduled EMI, which reduces the outstanding principal directly and lowers total interest and either the tenure or the EMI.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Finance and Banking Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Prepayment_of_loan',
    'https://www.wikidata.org/wiki/Q7240643',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  author: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fermor.in/fermor-schema-logo.png',
    },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Loan Prepayment', alternateName: 'Prepayment' },
    { '@type': 'DefinedTerm', name: 'Loan Foreclosure', alternateName: 'Preclosure' },
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home loan borrowers, personal loan borrowers, car loan borrowers, loan prepayment planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-prepayment', name: 'What Is Loan Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-vs-preclosure', name: 'Prepayment vs Preclosure vs Foreclosure' },
    { '@type': 'WebPageElement', cssSelector: '#how-prepayment-saves-interest', name: 'How Prepayment Saves Interest' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-benefits', name: 'Benefits of Loan Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-tenure-vs-emi', name: 'Reduce Tenure vs Reduce EMI' },
    { '@type': 'WebPageElement', cssSelector: '#best-time-to-prepay', name: 'Best Time to Prepay a Loan' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-charges', name: 'Prepayment and Foreclosure Charges in India' },
    { '@type': 'WebPageElement', cssSelector: '#personal-vs-home-loan', name: 'Personal Loan vs Home Loan: Which to Prepay First' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-vs-investment', name: 'Prepayment vs Investment' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-by-loan-type', name: 'Prepayment by Loan Type' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Prepayment Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Loan Prepayment Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function LoanPrepaymentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LoanPrepaymentCalculatorClient faqs={faqItems} />
    </>
  );
}

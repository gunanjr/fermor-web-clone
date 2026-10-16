import type { Metadata } from 'next';
import CreditHealthScoreClient from './CreditHealthScoreClient';

export const metadata: Metadata = {
  title: 'Credit Health Score Calculator: Estimate Your Score Range',
  description:
    'Free credit health score calculator for India. Estimate your CIBIL score range from payment history, credit utilization, and credit mix. Free to use.',
  keywords: [
    'credit health score calculator',
    'credit score calculator',
    'cibil score calculator',
    'credit rating calculator',
    'cibil calculator',
    'credit check calculator',
    'check your cibil score',
    'find cibil score',
    'cibil score check free',
    'check the cibil score free',
    'cibil rating check free',
    'my cibil score check',
    'check my cibil score free',
    'check your cibil score free',
    'cibil score check online',
    'cibil score check online free',
    'online credit score check',
    'calculate my credit score',
    'credit score finder',
    'credit score estimator',
    'calculate your credit score',
    'credit score generator',
    'cibil score check for home loan',
    'check cibil score for home loan',
    'home loan cibil score check',
    'personal cibil score check',
    'credit card cibil score check',
    'loan cibil score check',
    'best cibil score check',
    'i want to check my cibil score',
    'cibil score check kaise karen',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/credit-health-score-calculator' },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Health Score Calculator: Estimate Your Score Range',
    description: 'Estimate your CIBIL score range from your payment history, credit utilization, and credit mix. Free for India.',
    images: ['https://fermor.in/og-credit-health-score-calculator.png'],
  },
  openGraph: {
    title: 'Credit Health Score Calculator: Estimate Your Score Range',
    description:
      'Estimate your credit score range based on payment history, credit utilization, credit age, credit mix, and recent inquiries, the same factors CIBIL actually weighs. Not a bureau score check. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/credit-health-score-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-credit-health-score-calculator.png', width: 1200, height: 630, alt: 'Fermor Credit Health Score Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-08-04';
const PAGE_DATE_PUBLISHED = '2026-07-24';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'CIBIL Score',
    'Credit Score Factors',
    'Credit Utilization Ratio',
    'Credit Bureau Regulations India',
    'RBI Free Credit Report Rules',
    'Personal Loan Eligibility',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Personal Finance India',
  ],
};

const faqItems = [
  {
    q: 'What is a CIBIL score?',
    a: 'A CIBIL score is a 3-digit number between 300 and 900, calculated by TransUnion CIBIL, one of four credit bureaus licensed by the RBI in India, based on your credit history: how you have repaid loans and credit cards over time. Lenders use it to judge how likely you are to repay a new loan on time.',
  },
  {
    q: 'What is a good CIBIL score?',
    a: 'A score of 750 to 900 is considered excellent and gets the best interest rates and fastest approvals. 650 to 749 is considered good and generally qualifies for most loans. 550 to 649 is fair, with fewer lenders willing to approve and higher rates when they do. 300 to 549 is poor and usually means an unpaid default or serious delinquency on record.',
  },
  {
    q: 'How is CIBIL score calculated?',
    a: 'CIBIL weighs five factors: payment history (about 35%), credit utilization (about 30%), length of credit history (about 15%), credit mix between secured and unsecured credit (about 10%), and recent credit inquiries (about 10%). The exact algorithm is proprietary and not published in full, but these weights are the commonly cited breakdown from CIBIL and major lenders.',
  },
  {
    q: 'How can I check my real CIBIL score for free?',
    a: 'The RBI requires all four credit bureaus, including CIBIL, to give every individual one free full credit report and score check per calendar year. Get your real, official score directly at cibil.com/freecibilscore. This calculator estimates a likely range from your financial behavior; it does not pull your actual bureau score.',
  },
  {
    q: 'Does checking my own CIBIL score lower it?',
    a: 'No. Checking your own score, called a soft inquiry, has no effect on your CIBIL score no matter how often you do it. Only a hard inquiry, triggered when a lender checks your score because you applied for a loan or credit card, can have a small, temporary effect.',
  },
  {
    q: 'What is credit utilization ratio and why does it matter?',
    a: 'Credit utilization ratio is the percentage of your total available credit card limit that you are currently using. Keeping it under 30% across all your cards is the widely cited threshold for a healthy score; consistently maxing out cards, even if you pay on time, signals higher risk to lenders and pulls your score down.',
  },
  {
    q: 'How does payment history affect my credit score?',
    a: 'Payment history is the single largest factor in a CIBIL score, at roughly 35% weight. A single payment more than 30 days late can stay on your credit report for years and meaningfully lower your score, while a long streak of on-time EMI and credit card payments is the most reliable way to build a strong score over time.',
  },
  {
    q: 'What is a good credit mix?',
    a: 'A good credit mix means holding both secured credit (a home loan or car loan, backed by collateral) and unsecured credit (a credit card or personal loan, not backed by collateral), rather than only one type. Lenders read a mix as evidence you can manage different kinds of credit responsibly, though it carries a smaller weight (about 10%) than payment history or utilization.',
  },
  {
    q: 'How many credit inquiries are too many?',
    a: 'More than 3 to 4 hard inquiries (loan or credit card applications) within a 6-month window is generally seen as a sign of credit hunger and can lower your score, even if every application is later approved. Spacing out applications, and only applying when you actually intend to take the loan or card, protects this part of your score.',
  },
  {
    q: 'What CIBIL score do I need for a home loan?',
    a: 'Most Indian lenders require a minimum CIBIL score of around 700 to approve a home loan, but a score of 750 or above is what actually gets you the best interest rate and fastest processing. Below 700, approval becomes harder and, where it happens, usually comes with a higher rate or a co-applicant requirement.',
  },
  {
    q: 'What CIBIL score do I need for a personal loan?',
    a: 'Banks generally look for 750 or above for their best personal loan rates, while NBFCs and fintech lenders sometimes approve applicants in the 650 to 700 range, typically at a higher interest rate to offset the added risk. Below 650, approval odds drop sharply at most lenders.',
  },
  {
    q: 'Can this calculator show my exact CIBIL score?',
    a: 'No, and no calculator that is not connected to a credit bureau can. This tool estimates a likely range using the same factors CIBIL weighs, based on what you enter, but it has no access to your actual credit report. For your real, exact score, use the free official check at cibil.com/freecibilscore.',
  },
  {
    q: 'How long does it take to improve a credit score?',
    a: 'Meaningful improvement typically takes 4 to 6 months of consistent on-time payments and lower credit utilization to show up, since bureaus update records monthly and lenders report data with some lag. Recovering from a serious default or settlement can take much longer, often 1 to 2 years of clean repayment history.',
  },
  {
    q: 'What is the difference between CIBIL, Experian, Equifax, and CRIF High Mark?',
    a: 'These are the four credit bureaus licensed by the RBI to operate in India. Each collects data independently from banks and lenders, so your score can differ slightly across all four, sometimes by 20 to 50 points, even though they use broadly similar factors. CIBIL is the oldest and most widely referenced by Indian lenders, but many banks also check one or more of the other three.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Credit Health Score Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/credit-health-score-calculator',
  description: 'Estimate a likely credit score range using the same five factors CIBIL weighs: payment history, credit utilization, credit history length, credit mix, and recent inquiries. Not a bureau score check.',
  featureList: [
    'Payment History Assessment',
    'Credit Utilization Ratio Slider',
    'Credit History Length Input',
    'Credit Mix Assessment',
    'Recent Inquiries Assessment',
    'Estimated Score Range (not a single fabricated number)',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
    { '@type': 'ListItem', position: 3, name: 'Credit Health Score Calculator', item: 'https://fermor.in/calculators/credit-health-score-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Credit Score Range',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Credit Health Score Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Rate your payment history', text: 'Select how many times you have missed or been late on an EMI or credit card payment in the last 2 years.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your credit utilization', text: 'Set the percentage of your total credit card limit you typically use.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter credit history length and mix', text: 'Set how many years you have held credit, and whether you hold both secured and unsecured credit.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter recent inquiries and read your estimate', text: 'Select how many new loan or card applications you made in the last 6 months, then read your estimated score range and band.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'CIBIL Score',
  alternateName: 'Credit Information Bureau (India) Limited Score',
  description: 'A 3-digit number between 300 and 900 representing an individual\'s creditworthiness in India, calculated by TransUnion CIBIL from repayment history, credit utilization, credit age, credit mix, and recent credit inquiries.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Credit_score',
    'https://www.wikidata.org/wiki/Q1104637',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Credit Health Score Calculator: Estimate Your Score Range',
  description: 'Estimate a likely CIBIL score range from payment history, credit utilization, credit history length, credit mix, and recent inquiries.',
  url: 'https://fermor.in/calculators/credit-health-score-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'CIBIL Score', alternateName: 'Credit Score' },
    { '@type': 'DefinedTerm', name: 'Credit Utilization Ratio' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail borrowers, loan applicants, credit card holders, first-time credit users',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-credit-health-score', name: 'What Is a Credit Health Score' },
    { '@type': 'WebPageElement', cssSelector: '#calculation-formula', name: 'How This Estimate Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#score-ranges', name: 'CIBIL Score Ranges' },
    { '@type': 'WebPageElement', cssSelector: '#payment-history', name: 'Payment History' },
    { '@type': 'WebPageElement', cssSelector: '#credit-utilization', name: 'Credit Utilization Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#credit-history-length', name: 'Credit History Length' },
    { '@type': 'WebPageElement', cssSelector: '#credit-mix', name: 'Credit Mix' },
    { '@type': 'WebPageElement', cssSelector: '#new-inquiries', name: 'New Credit Inquiries' },
    { '@type': 'WebPageElement', cssSelector: '#score-by-loan-type', name: 'Score Requirements by Loan Type' },
    { '@type': 'WebPageElement', cssSelector: '#check-real-score', name: 'How to Check Your Real CIBIL Score Free' },
    { '@type': 'WebPageElement', cssSelector: '#improve-score', name: 'How to Improve Your Score' },
    { '@type': 'WebPageElement', cssSelector: '#bureau-comparison', name: 'CIBIL vs Experian vs Equifax vs CRIF' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CreditHealthScoreCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CreditHealthScoreClient />
    </>
  );
}

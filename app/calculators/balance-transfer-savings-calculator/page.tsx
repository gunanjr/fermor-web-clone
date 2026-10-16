import type { Metadata } from 'next';
import BalanceTransferSavingsCalculatorClient from './BalanceTransferSavingsCalculatorClient';
import { balanceTransferFaqs } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/balance-transfer-savings-calculator`;
  return {
    title: 'Balance Transfer Calculator: Savings & Break-Even',
    description:
      'Free balance transfer calculator for India. Compare loan transfer interest, EMI savings, fees and break-even for home, personal and credit card loans.',
    keywords: [
      'balance transfer calculator',
      'balance transfer savings calculator',
      'home loan balance transfer calculator',
      'loan balance transfer calculator',
      'balance transfer calculator India',
      'loan balance transfer calculator India',
      'loan transfer calculator',
      'loan transfer calculator online',
      'balance transfer calculator online',
      'personal loan balance transfer calculator',
      'credit card balance transfer calculator',
      'balance transfer EMI calculator',
      'balance transfer EMI savings calculator',
      'balance transfer interest calculator',
      'balance transfer interest savings calculator',
      'loan transfer savings calculator',
      'loan transfer savings',
      'balance transfer savings',
      'home loan transfer calculator',
      'personal loan transfer calculator',
      'balance transfer benefit calculator',
      'balance transfer break even calculator',
      'balance transfer processing fee calculator',
      'home loan balance transfer benefit calculator',
      'loan balance transfer EMI calculator',
      'credit card balance transfer fee calculator',
      'home loan transfer savings calculator india',
      'personal loan balance transfer benefit calculator',
      'outstanding loan transfer calculator',
      'balance transfer break-even calculator',
      'balance transfer savings India',
      'balance transfer calculator for NRI',
      'balance transfer calculator Excel',
      'balance transfer vs prepayment',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Balance Transfer Calculator: Savings & Break-Even',
      description:
        'Compare loan interest, EMI savings, transfer charges and break-even for home, personal and credit card loans in India.',
      images: ['https://fermor.in/og-balance-transfer-savings-calculator.png'],
    },
    openGraph: {
      title: 'Balance Transfer Calculator: Savings & Break-Even',
      description:
        'Free balance transfer calculator for India. Compare loan transfer interest, EMI savings, fees and break-even for home, personal and credit card loans.',
      type: 'website',
      url: 'https://fermor.in/calculators/balance-transfer-savings-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-balance-transfer-savings-calculator.png', width: 1200, height: 630, alt: 'Fermor Balance Transfer Savings Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-28';
const PAGE_DATE_PUBLISHED = '2026-06-25';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Balance Transfer',
    'Loan Transfer',
    'Home Loan Balance Transfer',
    'Personal Loan Transfer',
    'Credit Card Balance Transfer',
    'RBI Guidelines',
    'Interest Rate',
    'EMI',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: balanceTransferFaqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Balance Transfer Savings Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/balance-transfer-savings-calculator',
  description: 'Compare current loan interest, EMI savings, transfer charges and break-even for home loans, personal loans and credit card balances.',
  featureList: [
    'Balance Transfer Savings Calculator',
    'Break-even Calculator',
    'Home Loan Transfer Analysis',
    'Personal Loan Transfer Analysis',
    'Credit Card Balance Transfer Analysis',
    'EMI Comparison (Current vs New)',
    'Total Interest Saved Calculation',
    'Net Savings After Fees',
    'Processing Fee with GST Calculator',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Balance Transfer Savings Calculator', item: 'https://fermor.in/calculators/balance-transfer-savings-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use a Balance Transfer Savings Calculator',
  description: 'Step-by-step guide to calculate whether a balance transfer saves you money by comparing current loan costs with new loan costs including processing fees.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Balance Transfer Savings Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your current loan details',
      text: 'Enter your outstanding loan balance, current interest rate, and remaining tenure. Select the loan type (home loan, personal loan, or credit card). These are the baseline figures your current loan is running on.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter the new loan offer details',
      text: 'Enter the new interest rate offered by the lender you are considering for the balance transfer. Also enter the processing fee as a percentage of the loan amount.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Review the EMI and interest comparison',
      text: 'The calculator shows your current EMI versus the new EMI, current total interest versus new total interest, the total interest saved, and the net savings after deducting the processing fee (with GST if applicable).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check the break-even period',
      text: 'Switch to the Break-even Calculator tab to see how many months it takes for your monthly EMI savings to recover the total processing fee. If the break-even period is well within your remaining tenure, the balance transfer makes financial sense.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Balance Transfer',
  alternateName: 'Loan Transfer',
  description: 'The process of transferring an outstanding loan balance from one lender to another, typically to take advantage of a lower interest rate, better terms, or reduced EMI. Common for home loans, personal loans, and credit card debt.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Loan & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Balance_transfer',
    'https://www.wikidata.org/wiki/Q16966960',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Balance Transfer Calculator: Savings & Break-Even',
  description: 'Free balance transfer calculator for India. Compare loan interest, EMI savings, transfer charges and break-even for home, personal and credit card loans.',
  url: 'https://fermor.in/calculators/balance-transfer-savings-calculator',
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
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Balance Transfer', alternateName: 'Loan Transfer' },
    { '@type': 'DefinedTerm', name: 'Home Loan Balance Transfer' },
    { '@type': 'DefinedTerm', name: 'Personal Loan Transfer' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian borrowers, home loan customers, personal loan customers, credit card holders',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#quick-answer',                  name: 'Balance Transfer Calculator Quick Answer' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-balance-transfer',       name: 'What Is a Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#how-balance-transfer-works',      name: 'How Balance Transfer Works' },
    { '@type': 'WebPageElement', cssSelector: '#balance-transfer-savings',        name: 'Balance Transfer Savings Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-transfer',                name: 'When to Consider a Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#transfer-fees',                   name: 'Balance Transfer Fees and Charges' },
    { '@type': 'WebPageElement', cssSelector: '#balance-transfer-vs-top-up',      name: 'Balance Transfer vs Loan Top-Up' },
    { '@type': 'WebPageElement', cssSelector: '#limitations',                     name: 'Limitations of Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                      name: 'How to Use This Balance Transfer Savings Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example',                  name: 'Balance Transfer Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#balance-transfer-formula',        name: 'Balance Transfer Formula' },
    { '@type': 'WebPageElement', cssSelector: '#break-even-guide',               name: 'Break-Even Period Guide' },
    { '@type': 'WebPageElement', cssSelector: '#transfer-process',               name: 'Steps to Complete a Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#current-lender-rate-reset',       name: 'Ask Your Current Lender About a Rate Reset' },
    { '@type': 'WebPageElement', cssSelector: '#transfer-costs',                  name: 'Balance Transfer Costs' },
    { '@type': 'WebPageElement', cssSelector: '#loan-types',                      name: 'Balance Transfer by Loan Type' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits',                    name: 'Tax Treatment After a Home Loan Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes',                 name: 'Common Balance Transfer Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                             name: 'Frequently Asked Questions' },
    { '@type': 'WebPageElement', cssSelector: '#related-calculators',             name: 'Related Calculators' },
  ],
};

export default async function BalanceTransferSavingsCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <BalanceTransferSavingsCalculatorClient />
    </>
  );
}

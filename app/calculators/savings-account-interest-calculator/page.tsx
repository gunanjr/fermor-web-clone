import type { Metadata } from 'next';
import SavingsAccountInterestClient from './SavingsAccountInterestClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/savings-account-interest-calculator`;
  return {
    title: 'Savings Account Interest Calculator: Daily Interest Calculator',
    description:
      'Free savings account interest calculator for India. Calculate interest using the daily balance method. Compare SBI, HDFC, IDFC First Bank, post office savings, NSC, and Sukanya Samriddhi rates. Instant results.',
    keywords: [
      'savings account interest calculator',
      'daily balance interest calculator',
      'savings interest rate calculator',
      'savings account calculator india',
      'interest on savings account calculator',
      'savings account interest rate india',
      'monthly interest calculator savings',
      'savings account return calculator',
      'sbi savings account interest calculator',
      'hdfc savings account interest calculator',
      'daily interest calculator savings account',
      'savings account calculator',
      'calculate interest on savings account',
      'savings account interest calculation formula',
      'daily balance method interest calculator',
      'savings interest earnings calculator',
      'savings account compound interest calculator',
      'bank savings interest calculator',
      'savings account interest rate calculator india',
      'savings account yearly interest calculator',
      'savings account interest monthly calculation',
      'savings account interest income calculator',
      'nsc interest rate',
      'nsc interest calculator',
      'post office savings account interest rate',
      'post office savings calculator',
      'sukanya samriddhi account calculator',
      'sukanya samriddhi interest calculator',
      'sukanya samriddhi account interest rate 2025',
      'idfc first bank savings account interest rate',
      'axis bank savings account interest rate',
      'small finance bank savings rate',
      'au bank savings account interest rate',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Savings Account Interest Calculator: Daily Interest Calculator',
      description:
        'Calculate interest on your savings account using the daily balance method. See monthly and annual earnings with compound interest. Free for India.',
      images: ['https://fermor.in/og-savings-account-interest-calculator.png'],
    },
    openGraph: {
      title: 'Savings Account Interest Calculator: Daily Balance Method Calculator',
      description:
        'Free savings account interest calculator for India. Calculate interest earnings on your savings account using the daily balance method. See monthly and annual interest with compound interest.',
      type: 'website',
      url: 'https://fermor.in/calculators/savings-account-interest-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-savings-account-interest-calculator.png', width: 1200, height: 630, alt: 'Fermor Savings Account Interest Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-08';
const PAGE_DATE_PUBLISHED = '2026-06-25';

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
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Savings Account',
    'Interest Rate',
    'RBI Repo Rate',
    'Personal Finance India',
    'Account Aggregator Framework',
    'Daily Balance Method',
    'Compound Interest',
    'Section 80TTA',
    'Indian Banking Products',
    'Financial Planning India',
    'Fixed Deposit',
    'Tax Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.a,
    },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Savings Account Interest Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/savings-account-interest-calculator',
  description: 'Calculate interest on your savings account using the daily balance method. See monthly and annual interest earnings with compound interest, effective annual rate, and year-by-year growth. Free to use.',
  featureList: [
    'Savings Account Interest Calculator',
    'Daily Balance Method Calculation',
    'Monthly and Annual Interest Earnings',
    'Compound Interest Projection',
    'Year-by-Year Growth Table',
    'Compounding Frequency Options (Daily, Monthly, Quarterly, Annually)',
    'Effective Annual Rate (EAR) Calculation',
    'Multiple Currency Support',
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
    { '@type': 'ListItem', position: 3, name: 'Savings Account Interest Calculator', item: 'https://fermor.in/calculators/savings-account-interest-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Savings Account Interest',
  description: 'Step-by-step guide to calculate interest on your savings account using the daily balance method and compound interest formula.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Savings Account Interest Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your account balance',
      text: 'Enter the amount you currently have in your savings account. This is the principal amount on which interest will be calculated.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'Enter the annual interest rate offered by your bank. Current savings account rates in India range from 2.5% to 4% for major banks and up to 7% for small finance banks.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose the time period',
      text: 'Select how long you want to calculate interest for. Use the year or month toggle and choose from preset options like 6 months, 1 year, 3 years, 5 years, or 10 years.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select compounding frequency',
      text: 'Choose how often interest compounds. Daily compounding matches how banks actually calculate interest. Quarterly is how banks typically credit it. Monthly and annual options let you compare different compounding methods.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Savings Account',
  alternateName: 'Savings Account Interest',
  description: 'A savings account is a deposit account held at a bank that pays interest on the deposited amount. In India, savings account interest is calculated using the daily balance method as mandated by RBI.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Savings_account',
    'https://en.wikipedia.org/wiki/Interest_rate',
    'https://www.wikidata.org/wiki/Q11546',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Savings Account Interest Calculator: Daily Interest Calculator',
  description: 'Free savings account interest calculator for India. Calculate interest on your savings account using the daily balance method. See monthly and annual interest earnings with compound interest.',
  url: 'https://fermor.in/calculators/savings-account-interest-calculator',
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
    { '@type': 'DefinedTerm', name: 'Savings Account', alternateName: 'Savings Account Interest' },
    { '@type': 'DefinedTerm', name: 'Interest Rate' },
    { '@type': 'DefinedTerm', name: 'Daily Balance Method' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, savers, NRI investors, personal finance enthusiasts',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-savings-interest',        name: 'What Is Savings Account Interest' },
    { '@type': 'WebPageElement', cssSelector: '#savings-interest-formula',         name: 'Savings Account Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#daily-balance-method',             name: 'Daily Balance Method Explained' },
    { '@type': 'WebPageElement', cssSelector: '#interest-calculation-example',     name: 'Interest Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#savings-vs-fd',                    name: 'Savings Account vs Fixed Deposit' },
    { '@type': 'WebPageElement', cssSelector: '#current-rates',                    name: 'Current Savings Account Interest Rates' },
    { '@type': 'WebPageElement', cssSelector: '#savings-interest-tax',             name: 'Tax on Savings Account Interest' },
    { '@type': 'WebPageElement', cssSelector: '#compound-vs-simple-interest',      name: 'Compound Interest vs Simple Interest' },
    { '@type': 'WebPageElement', cssSelector: '#benefits',                         name: 'Benefits of Using This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',                    name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#savings-by-life-stage',            name: 'Savings Account Strategy by Life Stage' },
    { '@type': 'WebPageElement', cssSelector: '#account-types',                    name: 'Savings Account Types' },
    { '@type': 'WebPageElement', cssSelector: '#emergency-fund-sizing',            name: 'Emergency Fund Sizing' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-switch-banks',             name: 'When to Switch Banks' },
    { '@type': 'WebPageElement', cssSelector: '#limitations',                      name: 'Limitations of Savings Account Interest' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                       name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                              name: 'Frequently Asked Questions' },
  ],
};

export default async function SavingsAccountInterestCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <SavingsAccountInterestClient />
    </>
  );
}

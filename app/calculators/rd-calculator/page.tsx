import type { Metadata } from 'next';
import RDCalculatorClient from './RDCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/rd-calculator`;
  return {
    title: 'Recurring Deposit Maturity Calculator: RD Interest Calculator',
    description:
      'Free Recurring Deposit maturity calculator for India. Calculate RD maturity amount, total interest earned, and investment breakdown with quarterly compounding. Includes RD vs FD comparison, year-by-year growth table, and multi-currency support. No sign-up required.',
    keywords: [
      'recurring deposit calculator',
      'rd calculator',
      'rd maturity calculator',
      'recurring deposit maturity calculator',
      'rd interest calculator',
      'recurring deposit interest calculator',
      'rd calculator online',
      'monthly rd calculator',
      'rd return calculator',
      'rd maturity amount calculator',
      'rd formula',
      'recurring deposit formula',
      'rd calculator india',
      'recurring deposit calculator india',
      'post office rd calculator',
      'bank rd calculator',
      'rd vs fd calculator',
      'recurring deposit quarterly compounding',
      'rd maturity value',
      'nri rd calculator',
      '5 year rd calculator',
      '10 year rd calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Recurring Deposit Maturity Calculator: RD Interest Calculator',
      description:
        'Calculate RD maturity amount and total interest with quarterly compounding. Compare RD vs FD, year-by-year breakdown. Free for India.',
      images: ['https://fermor.in/og-rd-calculator.png'],
    },
    openGraph: {
      title: 'Recurring Deposit Maturity Calculator: RD Interest & Returns',
      description:
        'Calculate your RD maturity amount and total interest earned using the Indian quarterly compounding formula. Includes year-by-year breakdown, RD vs FD comparison, and multi-currency support. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/rd-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-rd-calculator.png', width: 1200, height: 630, alt: 'Fermor RD Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-06-25';
const PAGE_DATE_PUBLISHED = '2026-06-10';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Recurring Deposit',
    'Fixed Deposit',
    'Personal Finance India',
    'Account Aggregator Framework',
    'RBI Regulations',
    'Quarterly Compounding',
    'Indian Savings Products',
    'Post Office Savings',
    'Bank Deposits',
    'Financial Planning India',
    'NRI Investments',
    'Tax Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an RD Calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An RD calculator is a financial tool that computes the maturity amount of a Recurring Deposit account. It uses the RD formula with quarterly compounding to calculate how much each monthly deposit earns over the full tenure, showing the total invested amount, total interest earned, and final maturity value.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is RD interest calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RD interest is calculated using quarterly compounding. Each monthly deposit earns interest from the month it is deposited until the end of the tenure. The formula is A = P x (1 + R/400)^(4 x t), applied to every deposit and summed. R is the annual interest rate and t is the time in years each deposit remains in the account. Most Indian banks and post offices follow this quarterly compounding method approved by RBI.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TDS applicable on RD interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, interest earned on a Recurring Deposit is fully taxable. If the total interest income from all deposits with a bank exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens), the bank deducts TDS at 10%. If PAN is not provided, TDS is deducted at 20%. The interest is added to your income and taxed as per your income tax slab.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum and maximum tenure for an RD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tenure for a Recurring Deposit typically ranges from 6 months to 10 years across most Indian banks and the Post Office. Some banks allow tenure in multiples of 3 months within this range. The Post Office RD has a fixed tenure of 5 years with an option to extend for another 5 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum monthly deposit for an RD account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum monthly deposit varies by institution. The Post Office RD requires a minimum of Rs 100 per month. Most banks set the minimum between Rs 500 and Rs 1,000 per month. There is no upper limit, though amounts above Rs 10 lakh may require additional documentation as per RBI anti-money laundering norms.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I close my RD before the maturity date?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most banks allow premature closure of an RD account. However, a penalty typically applies, usually a 1% to 2% reduction in the applicable interest rate for the period the deposit was held. Some banks do not allow closure within the first 3 to 6 months of opening the account.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is better, RD or FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FD is better if you have a lump sum amount to invest at one time, as FDs typically offer slightly higher interest rates. RD is better if you want to build a corpus through monthly savings without the discipline of investing a lump sum. For salaried individuals creating a saving habit, RD is more practical. Both carry similar risk levels as they are fixed-income products.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which bank offers the highest RD interest rate in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Among major banks, small finance banks like AU Small Finance Bank and Equitas Small Finance Bank offer RD rates between 7.5% and 9%, depending on tenure. Among large private banks, Yes Bank and Axis Bank frequently offer competitive rates. The Post Office RD currently pays 6.7% per annum, compounded quarterly. Rates are updated periodically and vary by deposit tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRIs open an RD account in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, NRIs can open an RD account in India, typically through an NRO (Non-Resident Ordinary) account or NRE (Non-Resident External) account. Interest earned on an NRE RD account is tax-free in India. Interest on an NRO RD account is taxable. The currency selector in this calculator allows NRIs to view maturity amounts in their preferred currency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does quarterly compounding work in RD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quarterly compounding means interest is calculated and added to the deposit balance every 3 months. In an RD, each monthly deposit earns compound interest that is recalculated every quarter. The formula uses N=4 (four compounding periods per year). This is the standard method prescribed by the Indian Banks Association and used across all banks and the Post Office.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have multiple RD accounts at the same time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can hold multiple RD accounts simultaneously with the same bank or across different banks. Each account operates independently. Some investors use multiple RDs to stagger maturities, so they receive payouts at different points in time rather than one large lump sum at the end of a single RD.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I miss an RD monthly payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Missing an RD instalment typically results in a penalty. Most banks charge a default fee ranging from Rs. 1 to Rs. 5 per Rs. 100 of the missed instalment. If too many instalments are missed, the RD account may be converted to a savings account or closed prematurely. Some banks offer a grace period of a few days before imposing the penalty.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the RD interest rate fixed once the account is opened?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The rate that applies on the day you open the RD stays fixed for the entire tenure, regardless of how the bank changes its rates afterward. This works in your favor if rates fall after you open the account, and against you if rates rise, since you cannot switch to the new, higher rate without closing and reopening the RD.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I take a loan against my RD account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most banks allow a loan or overdraft against an RD, typically up to 80 to 90% of the deposit value accumulated so far. This is a useful way to access funds for a short-term need without breaking the RD and losing the interest benefit or paying a premature withdrawal penalty.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required to open an RD account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Opening an RD needs standard KYC documents: proof of identity such as a PAN card or Aadhaar, proof of address, and a recent photograph. Most banks and the Post Office also let you open an RD entirely online through net banking or a mobile app if you already hold a savings account with them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does an RD qualify for tax deduction like a tax-saving FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A regular RD does not qualify for deduction under Section 80C, unlike a 5-year tax-saving fixed deposit. The interest earned on an RD is also fully taxable at your income tax slab rate. If the tax deduction is the priority, a tax-saving FD, PPF, or ELSS is the appropriate instrument instead of an RD.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Recurring Deposit Maturity Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/rd-calculator',
  description: 'Calculate RD maturity amount, total interest, and investment breakdown with quarterly compounding. Includes year-by-year growth table, RD vs FD comparison, and multi-currency support. Free, browser-based, no sign-up.',
  featureList: [
    'RD Maturity Calculator',
    'Total Interest Earned',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Quarterly compounding (RBI standard)',
    'Tenure presets and toggle (years/months)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Recurring Deposit Maturity Amount',
  description: 'Step-by-step guide to calculate RD maturity using the recurring deposit formula, this calculator, or Excel.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor RD Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Determine your monthly deposit amount',
      text: 'Decide how much you want to invest every month. Most Indian banks allow a minimum of Rs 500 per month.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Check the applicable RD interest rate',
      text: 'Find the current RD interest rate offered by your bank. Major Indian banks offer between 6.5% and 8.5% per annum.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose the investment tenure',
      text: 'Select the number of months or years you want to invest. RD tenures typically range from 6 months to 10 years.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Apply the RD maturity formula',
      text: 'Enter these values into the calculator: monthly deposit, interest rate, and tenure. The calculator applies quarterly compounding to each monthly deposit and sums them to give the exact maturity amount.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'RD',
  alternateName: 'Recurring Deposit',
  description: 'A savings product offered by Indian banks and post offices where account holders deposit a fixed amount every month for a predetermined tenure, earning interest compounded quarterly.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Recurring_deposit',
    'https://www.wikidata.org/wiki/Q7303039',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Recurring Deposit Maturity Calculator: RD Interest Calculator',
  description: 'Free RD maturity calculator for India. Calculate RD maturity amount, total interest, and investment breakdown with quarterly compounding. Includes year-by-year growth table and RD vs FD comparison.',
  url: 'https://fermor.in/calculators/rd-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'RD', alternateName: 'Recurring Deposit' },
    { '@type': 'DefinedTerm', name: 'Quarterly Compounding' },
    { '@type': 'DefinedTerm', name: 'Fixed Deposit' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, salaried individuals, fixed-income investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-rd', name: 'What Is a Recurring Deposit' },
    { '@type': 'WebPageElement', cssSelector: '#rd-formula', name: 'RD Formula and Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#rd-vs-fd', name: 'RD vs FD Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#quarterly-compounding', name: 'Quarterly Compounding in RD' },
    { '@type': 'WebPageElement', cssSelector: '#rd-taxation', name: 'RD Taxation in India' },
    { '@type': 'WebPageElement', cssSelector: '#good-rd-rate', name: 'Current RD Interest Rates in India' },
    { '@type': 'WebPageElement', cssSelector: '#rd-limitations', name: 'Limitations of RD' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This RD Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Recurring Deposit Maturity Calculator", item: 'https://fermor.in/calculators/rd-calculator' },
  ],
};

export default async function RDCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <RDCalculatorClient />
    </>
  );
}

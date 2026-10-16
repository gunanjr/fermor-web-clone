import type { Metadata } from 'next';
import FDMaturityCalculatorClient from './FDMaturityCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-15';
const PAGE_DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: 'FD Maturity Calculator: Check Fixed Deposit Return & TDS',
  description: 'Free FD maturity calculator for India. Estimate compound interest earned on your Fixed Deposits, evaluate senior citizen rates, and calculate TDS deductions.',
  keywords: [
    'fd maturity calculator',
    'fd calculator',
    'fixed deposit calculator',
    'fd maturity value calculator',
    'fd interest calculator',
    'fd double scheme calculator',
    'post office fd calculator',
    'sbi fd maturity calculator',
    'hdfc fixed deposit calculator',
    'icici fd calculator',
    'senior citizen fd calculator',
    'quarterly compounding fd calculator',
    'monthly interest payout fd calculator',
    'fd tds calculator',
    'tds on fd interest calculator',
    'fixed deposit interest rate today',
    '5 year tax saving fd calculator',
    'reinvestment deposit scheme calculator',
    'simple interest fd calculator',
    'how to calculate fd maturity amount',
  ],
  openGraph: {
    title: 'FD Maturity Calculator: Check Fixed Deposit Return & TDS - Fermor',
    description: 'Calculate the maturity amount and interest earned on your Fixed Deposit. Compares compounding frequencies, handles senior citizen interest boosts, and factors in TDS rules.',
    type: 'website',
    url: 'https://fermor.in/calculators/fd-maturity-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-fd-maturity-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FD Maturity Calculator - Fermor',
    description: 'Calculate FD interest, senior citizen boosts, and TDS deductions on Fixed Deposits in India.',
    images: ['https://fermor.in/og-fd-maturity-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/fd-maturity-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Fixed Deposit Maturity',
    'Quarterly Compounding',
    'TDS on FD Interest',
    'Senior Citizen Deposits',
    'Tax Saving FD Guidelines',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'FD Maturity Calculator', item: 'https://fermor.in/calculators/fd-maturity-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is FD maturity value calculated?', acceptedAnswer: { '@type': 'Answer', text: 'For compound interest FDs, maturity value is calculated using the formula: A = P x (1 + r/n)^(n x t), where P is the principal, r is the annual rate, n is the compounding frequency per year, and t is the tenure in years. In India, most bank FDs compound quarterly (n = 4).' } },
    { '@type': 'Question', name: 'What is the compounding frequency for Indian bank FDs?', acceptedAnswer: { '@type': 'Answer', text: 'By default, Indian banks calculate compound interest on Fixed Deposits on a quarterly basis. However, banks also offer options for monthly payout (discounted interest rate), half-yearly payout, or simple interest payouts for tenures under 6 months.' } },
    { '@type': 'Question', name: 'Is interest earned on Fixed Deposits taxable?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, interest earned on Fixed Deposits is fully taxable under the head "Income from Other Sources" at your applicable income tax slab rates.' } },
    { '@type': 'Question', name: 'What are the TDS rules for Fixed Deposit interest?', acceptedAnswer: { '@type': 'Answer', text: 'Banks deduct Tax Deducted at Source (TDS) at 10% if your annual FD interest income exceeds Rs 40,000 (Rs 50,000 for senior citizens). If you have not submitted your PAN card, TDS is deducted at a penalty rate of 20%.' } },
    { '@type': 'Question', name: 'How can I avoid TDS deductions on my FD?', acceptedAnswer: { '@type': 'Answer', text: 'If your total annual taxable income is below the exemption limit, you can submit Form 15G (for individuals under 60) or Form 15H (for senior citizens aged 60 and above) to the bank at the start of the financial year to request zero TDS.' } },
    { '@type': 'Question', name: 'Do senior citizens get higher interest rates on FDs?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, almost all banks in India offer a standard interest rate premium of 0.50% p.a. to senior citizens (aged 60 and above) and up to 0.75% to 0.80% p.a. to super senior citizens (aged 80 and above).' } },
    { '@type': 'Question', name: 'What is a tax-saving Fixed Deposit?', acceptedAnswer: { '@type': 'Answer', text: 'A tax-saving FD has a mandatory lock-in period of 5 years. Deposits up to Rs 1.5 lakh per financial year qualify for tax deductions under Section 80C of the Income Tax Act. Premature withdrawals or loans against tax-saving FDs are not permitted.' } },
    { '@type': 'Question', name: 'Can I withdraw my Fixed Deposit prematurely?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, most banks permit premature withdrawals on standard FDs, but they usually charge a penalty of 0.50% to 1.00% on the interest rate applicable for the actual period the deposit remained with the bank.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FD Maturity Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/fd-maturity-calculator',
  description: 'Calculate the maturity amount and interest earned on your Fixed Deposit in India. Compares compounding frequencies, handles senior citizen interest boosts, and factors in TDS rules.',
  featureList: [
    'Deposit principal, rate, and tenure sliders',
    'Custom compounding frequencies (monthly, quarterly, half-yearly, yearly, simple interest)',
    'Senior citizen rate boost presets',
    'TDS calculation based on PAN and tax status',
    'Year-by-year balance growth schedule table',
    'Principal vs interest earned donut chart',
    'Multi-currency display support (INR, USD, EUR, GBP)',
    'localStorage settings persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Fixed Deposit Maturity Amount',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor FD Maturity Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter deposit principal and interest rate', text: 'Specify the amount you plan to deposit and the annual interest rate offered by the bank.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose customer category and compounding frequency', text: 'Select whether you qualify as a regular citizen or senior citizen, and choose the compounding frequency (default is quarterly).' },
    { '@type': 'HowToStep', position: 3, name: 'Set tenure in years, months, or days', text: 'Adjust the tenure sliders to match the exact lock-in period of your Fixed Deposit.' },
    { '@type': 'HowToStep', position: 4, name: 'Review maturity value and TDS estimates', text: 'Analyze the total interest earned, estimated TDS deductions, and view the year-by-year growth table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Fixed Deposit',
  alternateName: 'FD',
  description: 'A financial instrument provided by banks or post offices that offers investors a guaranteed rate of interest higher than a regular savings account until a given maturity date. Requires lock-in of principal.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Savings and Deposit Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Time_deposit',
    'https://www.wikidata.org/wiki/Q1333796',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'FD Maturity Calculator: Check Fixed Deposit Return & TDS',
  url: 'https://fermor.in/calculators/fd-maturity-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Fixed Deposit', alternateName: 'FD' }],
  audience: { '@type': 'Audience', audienceType: 'Fixed deposit savers, senior citizen investors, retail depositors, tax planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#fd-basics', name: 'What Is an FD Maturity Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#fd-formula', name: 'Fixed Deposit Maturity Value Formulas' },
    { '@type': 'WebPageElement', cssSelector: '#compounding-frequency', name: 'Impact of Compounding Frequency' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen-boost', name: 'Senior Citizen FD Rates and Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#tds-rules', name: 'Income Tax and TDS Rules on FD Interest' },
    { '@type': 'WebPageElement', cssSelector: '#avoid-tds', name: 'How to Avoid TDS: Form 15G and 15H' },
    { '@type': 'WebPageElement', cssSelector: '#tax-saving-fd', name: '5-Year Tax Saving Fixed Deposits' },
    { '@type': 'WebPageElement', cssSelector: '#premature-withdrawal', name: 'Premature Withdrawal Penalties' },
    { '@type': 'WebPageElement', cssSelector: '#post-office-fd', name: 'Post Office Fixed Deposits (POTD)' },
    { '@type': 'WebPageElement', cssSelector: '#fd-vs-debt-fund', name: 'Fixed Deposit vs Debt Mutual Funds' },
    { '@type': 'WebPageElement', cssSelector: '#reinvestment-scheme', name: 'Reinvestment Deposit Schemes vs Cumulative FDs' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of FD Maturity Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This FD Maturity Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function FDMaturityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <FDMaturityCalculatorClient />
    </>
  );
}

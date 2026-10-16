import type { Metadata } from 'next';
import PPFCalculatorClient from './PPFCalculatorClient';
import { FAQ_ITEMS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-06-20';
const PAGE_DATE_MODIFIED = '2026-09-10';

export const metadata: Metadata = {
  title: 'PPF Calculator: Public Provident Fund Maturity & Returns',
  description: 'Free PPF calculator for India. Calculate Public Provident Fund maturity amount, total interest, and year-wise balance at the current 7.1% rate, with support for an existing balance. Free to use.',
  keywords: [
    'ppf calculator',
    'public provident fund calculator',
    'personal provident fund calculator',
    'ppf cal',
    'public provident fund ppf calculator',
    'ppf calculator online',
    'ppf calculator india',
    'best ppf calculator',
    'ppf maturity calculator',
    'ppf maturity amount calculator',
    'ppf maturity',
    'ppf maturity amount',
    'ppf account calculator',
    'ppf plan calculator',
    'ppf return calculator',
    'ppf savings calculator',
    'ppf yearly investment',
    'ppf investment calculator',
    'ppf investment calculation',
    'ppf interest rate calculator',
    'public provident fund interest rate calculator',
    'ppf interest calculator',
    'public provident fund interest calculator',
    'ppf compound interest calculator',
    'ppf compounding calculator',
    'compound interest calculator ppf',
    'ppf calculator formula',
    'formula for ppf calculation',
    'ppf calculator with existing balance',
    'ppf calculator with current balance',
    'ppf one time investment calculator',
    'ppf calculator one time investment',
    'one time ppf calculator',
    'ppf calculator for one time investment',
    'ppf lumpsum calculator',
    'ppf calculator monthly',
    'monthly investment in ppf calculator',
    'ppf calculator for monthly investment',
    'ppf calculator year wise',
    'ppf calculator yearly',
    'ppf calculation chart',
    'ppf chart for 15 years',
    '15 year ppf calculator',
    'ppf calculator for 15 years',
    'ppf 15 years calculator',
    'ppf maturity calculator for 15 years',
    'ppf calculator for 10 years',
    'ppf calculator for 25 years',
    'ppf 20 years calculator',
    'ppf 30 years calculator',
    'ppf calculator with extension',
    'ppf calculator with extension of 5 years',
    'ppf extension calculator',
    'ppf calculator post office',
    'post ppf calculator',
    'post office public provident fund calculator',
    'post office ppf scheme 15 years calculator',
    'post office ppf account calculator',
    'post office ppf interest rate calculator',
    'india post ppf calculator',
    'ppf minor account calculator',
    'ppf pension calculator',
    'ppf pension scheme calculator',
    'ppf retirement calculator',
    'ppf for retirement',
    'nps vs ppf calculator',
    'nps ppf calculator',
    'pf and vpf calculator',
    'vpf calculator',
    'vpf interest rate calculator',
    'voluntary provident fund calculator',
    'ppf loan calculator',
    'ppf withdrawal calculator',
    'ppf account interest rate',
    'if i invest 5000 per month in ppf calculator',
    'ppf 5000 per month calculator',
    'ppf calculator with variable interest rate',
    'ppf calculator with variable amount',
    'sbi ppf calculator',
    'hdfc ppf calculator',
    'icici ppf calculator',
    'pnb ppf calculator',
    'ppf calculator pnb',
    'yes bank ppf calculator',
    'ppf calculator sip',
    'ppf sip calculator',
    'sip ppf calculator',
    'ppf fund calculator',
    'ppf scheme calculator',
    'public provident fund scheme calculator',
    'calculation of ppf account',
    'does ppf gives compound interest',
    'ppf calculator excel',
  ],
  openGraph: {
    title: 'PPF Calculator: Public Provident Fund Maturity & Returns - Fermor',
    description: 'Calculate PPF maturity amount, total interest, and year-wise balance at 7.1%. 15-year and extended tenures, with an existing-balance option. Free, no sign-up required to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/ppf-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-ppf-calculator.png', width: 1200, height: 630, alt: 'Fermor PPF Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PPF Calculator: Public Provident Fund Maturity & Returns',
    description: 'Calculate PPF maturity at the current 7.1% rate. Year-wise balance, 15-year lock-in, EEE tax-free. Free for India.',
    images: ['https://fermor.in/og-ppf-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/ppf-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Public Provident Fund',
    'PPF Interest Rates India',
    'Section 80C Investments',
    'EEE Tax-Free Investments',
    'Post Office Savings Schemes',
    'Personal Finance India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'PPF Calculator', item: 'https://fermor.in/calculators/ppf-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PPF Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/ppf-calculator',
  description: 'Calculate PPF maturity amount, total interest, and year-wise balance at any contribution, existing balance, and rate. Supports 15-year and extended 20/25/30/35/40-year tenures.',
  featureList: [
    'PPF maturity calculation with annual compounding',
    'Existing PPF balance input',
    'One-time investment modelling',
    'Yearly and monthly contribution toggle',
    'Year-by-year balance growth table',
    'EEE tax benefit display',
    'Extension tenure presets (15Y to 40Y)',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate PPF Maturity Amount',
  description: 'Step-by-step guide to calculate PPF maturity and year-wise balance using the PPF Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor PPF Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your existing PPF balance', text: 'Enter your current PPF balance if you already have an account, or leave it at zero for a fresh account or a one-time investment.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your investment', text: 'Enter your deposit, toggling between yearly and monthly, up to the Rs 1.5 lakh annual limit.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the interest rate', text: 'The current PPF rate of 7.1% is pre-filled. Adjust it only to model a different rate scenario for planning purposes.' },
    { '@type': 'HowToStep', position: 4, name: 'Set the tenure', text: 'Set the investment period, minimum 15 years. Use the presets to model a 5-year extension after maturity.' },
    { '@type': 'HowToStep', position: 5, name: 'Review results and year-by-year table', text: 'See total maturity amount, total interest earned, and the invested-vs-interest split. Expand the year-by-year table to see exactly how the balance grows each year.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'PPF',
  alternateName: 'Public Provident Fund',
  description: 'A long-term savings scheme backed by the Government of India with a 15-year lock-in, EEE tax treatment (exempt on contribution, interest, and maturity), and interest rate set quarterly by the Ministry of Finance.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Public_Provident_Fund_(India)',
    'https://www.wikidata.org/wiki/Q7255613',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'PPF Calculator: Public Provident Fund Maturity and Returns',
  description: 'Free PPF calculator. Calculate Public Provident Fund maturity amount, year-wise balance, and total interest at 7.1%.',
  url: 'https://fermor.in/calculators/ppf-calculator',
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
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'PPF', alternateName: 'Public Provident Fund' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, salaried employees, tax planners, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-ppf', name: 'What Is PPF' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-formula', name: 'PPF Maturity Formula' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-interest-rate', name: 'Current PPF Interest Rate' },
    { '@type': 'WebPageElement', cssSelector: '#contribution-rules', name: 'PPF Contribution Rules' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits', name: 'PPF Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#withdrawal-rules', name: 'PPF Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-loan', name: 'Loan Against PPF' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-extension', name: 'Extending PPF After Maturity' },
    { '@type': 'WebPageElement', cssSelector: '#where-to-open', name: 'Where to Open a PPF Account' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-vs-epf-vpf', name: 'PPF vs EPF vs VPF' },
    { '@type': 'WebPageElement', cssSelector: '#ppf-vs-nps', name: 'PPF vs NPS for Retirement' },
    { '@type': 'WebPageElement', cssSelector: '#one-time-investment', name: 'Modelling a One-Time PPF Investment' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This PPF Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PPFCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PPFCalculatorClient />
    </>
  );
}

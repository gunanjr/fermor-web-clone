import type { Metadata } from 'next';
import LoanAgainstPropertyClient from './LoanAgainstPropertyClient';

const PAGE_DATE_PUBLISHED = '2026-08-17';
const PAGE_DATE_MODIFIED = '2026-08-17';

export const metadata: Metadata = {
  title: 'Loan Against Property Calculator: LAP EMI & Eligibility',
  description:
    'Free loan against property calculator for India. Calculate LAP EMI, max LTV borrowing limit (50-70%), interest costs, and bank rates. Free to use.',
  keywords: [
    'loan against property calculator',
    'lap calculator',
    'loan against property emi calculator',
    'lap eligibility calculator',
    'loan against property interest rate',
    'sbi loan against property calculator',
    'hdfc loan against property calculator',
    'icici loan against property calculator',
    'property mortgage loan calculator',
    'loan against commercial property calculator',
    'max ltv loan against property india',
    'mortgage loan emi calculator india',
    'loan against residential property calculator',
    'lap tenure calculator',
    'bajaj housing loan against property',
    'bank of baroda lap calculator',
    'axis bank loan against property',
    'property valuation loan eligibility',
    'lap vs home loan calculator',
    'lap vs personal loan interest rate',
    'rbi ltv guidelines loan against property',
    'loan against property processing fee calculator',
    'cibil score for loan against property',
    'mortgage loan amortization schedule india',
    'lap balance transfer calculator',
    'loan against property tax benefits section 24',
  ],
  openGraph: {
    title: 'Loan Against Property Calculator: LAP EMI & Eligibility - Fermor',
    description:
      'Calculate Loan Against Property (LAP) EMI, maximum LTV sanction limit (50-70%), and total interest across top Indian lenders. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/loan-against-property-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-loan-against-property-calculator.png', width: 1200, height: 630, alt: 'Fermor Loan Against Property Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loan Against Property Calculator - Fermor',
    description:
      'Calculate LAP EMI, LTV sanction limit (50-70%), and bank interest rates in India. Free to use.',
    images: ['https://fermor.in/og-loan-against-property-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/loan-against-property-calculator',
  },
};

/* ─── Schemas ─────────────────────────────────────────────────── */

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
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description:
    'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Loan Against Property',
    'LAP EMI Calculation',
    'Loan-to-Value Ratio',
    'RBI LTV Guidelines',
    'Mortgage Loans India',
    'Commercial Property Loan',
    'Residential Property LAP',
    'CIBIL Score for LAP',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Against Property Calculator', item: 'https://fermor.in/calculators/loan-against-property-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a Loan Against Property (LAP)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Loan Against Property (LAP) is a secured loan offered by banks and Housing Finance Companies (HFCs) where you pledge a fully constructed residential, commercial, or industrial property as collateral. Lenders sanction 50% to 70% of the property market value as a loan amount at lower interest rates than personal loans.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much loan can I get against a property worth 1 Crore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a property with a market value of Rs 1 Crore, Indian banks typically sanction 50% to 65% for residential properties (Rs 50 Lakh to Rs 65 Lakh) and 40% to 50% for commercial properties (Rs 40 Lakh to Rs 50 Lakh), subject to income eligibility and FOIR limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current Loan Against Property interest rate in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LAP interest rates in India currently range between 8.75% and 12.50% per annum for salaried individuals and self-employed borrowers, depending on lender policy, CIBIL score (750+ gets best rates), and property type.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum tenure for a Loan Against Property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum tenure for LAP in India is typically 15 to 20 years (or up to age 65 for salaried borrowers and age 70 for self-employed individuals). Longer tenure lowers monthly EMI but increases overall interest costs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is LAP EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LAP EMI is calculated using the reducing-balance formula: EMI = [P x r x (1+r)^n] / [(1+r)^n - 1], where P is principal loan amount, r is monthly interest rate, and n is tenure in months.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is tax benefit available on Loan Against Property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tax benefit on LAP depends on end-use. If LAP proceeds are used for business expansion, interest paid can be claimed as a business expense under Section 37(1). If used to purchase or construct another residential house, interest up to Rs 2 Lakh can be claimed under Section 24(b). No tax benefit applies if used for personal expenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'What property documents are required for LAP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Key property documents include original title deed, approved building plan, occupancy certificate (OC), possession letter, latest property tax receipts, and NOC from the housing society or authority.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Home Loan and Loan Against Property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A home loan is taken to buy or construct a new house (LTV up to 80-90%, lower interest rates, 30-year tenure). A Loan Against Property pledges an existing owned property to raise funds for any end-use (LTV 50-70%, slightly higher interest, 15-20 year tenure).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get LAP on a plot of land or vacant land?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most major banks do not offer LAP on vacant agricultural or unapproved residential plots. LAPs are primarily offered on fully constructed residential houses, apartments, office spaces, and commercial shops with clear title deeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What CIBIL score is required for Loan Against Property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CIBIL score of 750 or above is ideal for LAP approval at competitive interest rates starting around 8.75% to 9.50%. Scores between 650 and 749 may still qualify but at higher interest rates (10.5% to 13%).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the processing fee for LAP in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Processing fees for LAP generally range between 0.50% and 1.50% of the loan amount, plus applicable GST (18%). Some banks cap processing fees at Rs 25,000 to Rs 50,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. All calculators are free to use, and a free account is available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Loan Against Property Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/loan-against-property-calculator',
  description:
    'Calculate Loan Against Property (LAP) EMI, LTV sanction limits (50-70%), total interest, and year-by-year amortization schedule for residential and commercial properties in India.',
  featureList: [
    'Property Valuation & LTV Sanction Limit Calculator',
    'LAP Monthly EMI & Total Payback Computation',
    'Residential vs Commercial Property LTV Tiers',
    'Donut Chart: Principal vs Total Interest Split',
    'Stacked Bar Chart Year-by-Year Amortization Schedule',
    'Multi-currency Support (INR, USD, EUR, GBP)',
    'Year Presets (5Y, 10Y, 15Y, 20Y)',
    'localStorage Persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Loan Against Property EMI and LTV',
  description: 'Step-by-step guide to calculate your LAP EMI, maximum loan sanction limit, and repayment schedule.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Against Property Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter property market value',
      text: 'Enter the estimated current market value of your residential, commercial, or industrial property.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Loan-to-Value (LTV) percentage',
      text: 'Set the LTV ratio. Most banks offer 50% to 65% for residential properties and 40% to 50% for commercial units.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set interest rate and tenure',
      text: 'Input the expected LAP annual interest rate (e.g. 9.5%) and select tenure in years (up to 20 years).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review EMI, total interest, and amortization schedule',
      text: 'Check your monthly EMI, total interest payable, donut chart split, and expand the stacked bar chart amortization schedule.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'LAP',
  alternateName: 'Loan Against Property',
  description:
    'A secured loan where an existing residential, commercial, or industrial property is pledged as collateral to obtain a high-value loan at lower interest rates than unsecured loans.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking and Loan Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Mortgage_loan',
    'https://www.wikidata.org/wiki/Q185387',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Loan Against Property Calculator: LAP EMI & Eligibility',
  description:
    'Free loan against property calculator for India. Calculate LAP EMI, max LTV borrowing limit (50-70%), interest costs, and bank rates. Free to use.',
  url: 'https://fermor.in/calculators/loan-against-property-calculator',
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
    { '@type': 'DefinedTerm', name: 'LAP', alternateName: 'Loan Against Property' },
    { '@type': 'DefinedTerm', name: 'LTV Ratio' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Property owners, business owners, self-employed professionals, salaried borrowers in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-lap', name: 'What Is a Loan Against Property' },
    { '@type': 'WebPageElement', cssSelector: '#lap-formula', name: 'Loan Against Property EMI and LTV Formula' },
    { '@type': 'WebPageElement', cssSelector: '#ltv-limits-table', name: 'LTV Limits by Property Type in India' },
    { '@type': 'WebPageElement', cssSelector: '#bank-rates-table', name: 'Top Indian Bank LAP Interest Rates & Fees' },
    { '@type': 'WebPageElement', cssSelector: '#lap-vs-home-vs-personal', name: 'LAP vs Home Loan vs Personal Loan' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits-lap', name: 'Tax Treatment of Loan Against Property' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-criteria', name: 'LAP Eligibility Requirements' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LoanAgainstPropertyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <LoanAgainstPropertyClient />
    </>
  );
}

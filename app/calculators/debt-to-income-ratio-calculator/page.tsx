import type { Metadata } from 'next';
import DebtToIncomeClient from './DebtToIncomeClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/debt-to-income-ratio-calculator`;
  return {
    title: 'Debt-to-Income Ratio Calculator: DTI & FOIR',
    description:
      'Free debt-to-income ratio calculator for India. Calculate your DTI or FOIR from monthly income and debt, see your loan approval category, and check whether a new EMI would still fit. Free to use.',
    keywords: [
      'debt to income ratio calculator',
      'dti calculator',
      'debt to income ratio',
      'dti ratio calculator',
      'calculate debt to income ratio',
      'debt to income ratio formula',
      'dti formula',
      'what is a good debt to income ratio',
      'foir calculator',
      'fixed obligation to income ratio',
      'dti for home loan',
      'dti for personal loan',
      'dti for car loan',
      'debt to income ratio calculator india',
      'dti calculator india',
      'how to calculate debt to income ratio',
      'how to calculate dti ratio',
      'dti ratio calculator for mortgage',
      '28 36 rule',
      'front end dti',
      'back end dti',
      'dti vs foir',
      'how to lower dti',
      'debt to income percentage calculator',
      'monthly debt to income ratio calculator',
      'home loan debt to income ratio calculator',
      'loan eligibility dti calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Debt-to-Income Ratio Calculator: DTI & FOIR',
      description:
        'Calculate your DTI or FOIR from monthly income and debt. See your loan approval category and check a new EMI before you apply. Free for India, no sign-up.',
      images: ['https://fermor.in/og-debt-to-income-ratio-calculator.png'],
    },
    openGraph: {
      title: 'Debt-to-Income Ratio Calculator: DTI & FOIR - Fermor',
      description:
        'Free debt-to-income ratio calculator for India. Add your monthly income and debt payments to calculate DTI/FOIR, see your loan approval likelihood, and check whether a proposed new EMI still fits. No sign-up required.',
      type: 'website',
      url: 'https://fermor.in/calculators/debt-to-income-ratio-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-debt-to-income-ratio-calculator.png', width: 1200, height: 630, alt: 'Fermor Debt-to-Income Ratio Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = new Date().toISOString().split('T')[0];
const PAGE_DATE_PUBLISHED = '2026-06-22';

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
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Debt-to-Income Ratio',
    'FOIR (Fixed Obligation to Income Ratio)',
    'Loan Eligibility',
    'Loan Underwriting India',
    'Personal Finance India',
    'CIBIL Score',
    'Home Loan India',
    'Personal Loan India',
    'Car Loan India',
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
  name: 'Debt-to-Income Ratio Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/debt-to-income-ratio-calculator',
  description: 'Calculate your debt-to-income ratio (DTI/FOIR) from monthly income and debt payments. Includes a DTI category, remaining income, maximum recommended new debt, a before/after comparison for a proposed new loan, and multi-currency support. Free, browser-based, no sign-up.',
  featureList: [
    'DTI / FOIR Calculation',
    'Loan approval category (Excellent to Very High)',
    'New Loan Impact: DTI before vs after a proposed EMI',
    'Maximum recommended new debt (36% guideline)',
    'Itemised debt inputs (housing, vehicle, personal, education, credit card, other)',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Debt-to-Income Ratio Calculator', item: 'https://fermor.in/calculators/debt-to-income-ratio-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Debt-to-Income Ratio',
  description: 'Step-by-step guide to calculate your DTI (FOIR) ratio using monthly income and debt payments, including checking a proposed new EMI.',
  totalTime: 'PT5M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Debt-to-Income Ratio Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your gross monthly income',
      text: 'Use a quick preset or the slider for your gross monthly income before tax and deductions.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add up all monthly debt payments',
      text: 'Enter housing, vehicle, and personal loan EMIs on the main screen. Open More Settings for education loan, credit card minimum payment, and other EMIs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Apply the DTI formula',
      text: 'DTI = (Total Monthly Debt / Gross Monthly Income) x 100. The calculator applies this automatically and shows your category from Excellent to Very High.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check a proposed new loan',
      text: 'Enter a Proposed New Loan / EMI amount in More Settings, then open New Loan Impact to compare your DTI before and after that loan against typical lender thresholds by loan type.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'DTI (Debt-to-Income Ratio)',
  alternateName: 'Debt-to-Income Ratio',
  description: 'The percentage of gross monthly income that goes toward debt payments. Calculated by dividing total monthly debt obligations by gross monthly income and multiplying by 100.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Loan & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Debt-to-income_ratio',
    'https://www.wikidata.org/wiki/Q212880',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Debt-to-Income Ratio Calculator: DTI and FOIR',
  description: 'Free debt-to-income ratio calculator for India. Calculate DTI/FOIR from monthly income and debt payments, see your loan approval category, and check a proposed new EMI against your current DTI.',
  url: 'https://fermor.in/calculators/debt-to-income-ratio-calculator',
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
    { '@type': 'DefinedTerm', name: 'DTI', alternateName: 'Debt-to-Income Ratio' },
    { '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' },
    { '@type': 'DefinedTerm', name: 'Loan Eligibility' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian borrowers, home loan applicants, personal loan seekers, car loan applicants, credit card users',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-dti',            name: 'What Is Debt-to-Income Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#dti-formula',            name: 'DTI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#front-end-back-end',     name: 'Front-End vs Back-End DTI: The 28/36 Rule' },
    { '@type': 'WebPageElement', cssSelector: '#good-dti-ratio',         name: 'What Is a Good DTI Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#dti-vs-foir',            name: 'DTI vs FOIR Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#dti-vs-debt-to-credit',  name: 'DTI vs Debt-to-Credit Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#how-lenders-use-dti',    name: 'How Lenders Use DTI to Decide Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#dti-self-employed',      name: 'DTI for Self-Employed and Business Owners' },
    { '@type': 'WebPageElement', cssSelector: '#joint-dti',              name: 'How Joint Applications and Co-Applicants Affect DTI' },
    { '@type': 'WebPageElement', cssSelector: '#checking-new-emi',       name: 'Checking Whether You Can Afford a New EMI' },
    { '@type': 'WebPageElement', cssSelector: '#dti-by-loan-type',       name: 'DTI Benchmarks by Loan Type' },
    { '@type': 'WebPageElement', cssSelector: '#dti-by-income-level',    name: 'DTI Across Income Levels: A Reference Table' },
    { '@type': 'WebPageElement', cssSelector: '#improve-dti',            name: 'How to Improve Your DTI Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes',        name: 'Common Mistakes When Calculating DTI' },
    { '@type': 'WebPageElement', cssSelector: '#dti-limitations',        name: 'Limitations of DTI Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',          name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',             name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#dti-glossary',           name: 'DTI Glossary: Key Terms Explained' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                    name: 'Frequently Asked Questions' },
  ],
};

export default async function DebtToIncomeRatioCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <DebtToIncomeClient />
    </>
  );
}

import type { Metadata } from 'next';
import Form16TaxCalculatorClient from './Form16TaxCalculatorClient';
import { FAQS } from './faqs';

const PAGE_DATE_PUBLISHED = '2026-07-08';
const PAGE_DATE_MODIFIED = '2026-07-16';

export const metadata: Metadata = {
  title: 'Form 16 Tax Calculator: Compute Tax from TDS Certificate',
  description: 'Free Form 16 tax calculator for India. Enter salary from Form 16 Part B and TDS from Part A to compute your refund or balance tax. Free to use.',
  keywords: [
    'form 16 tax calculator',
    'form 16',
    'form 16 meaning',
    'income tax form 16',
    'traces form 16',
    'itr form 16',
    'tds form 16',
    'form 16 kya hai',
    'form 16 format',
    'form 16 for loan',
    'form 16 verification',
    'form 16 download',
    'form 16 calculator',
    'form 16 salary certificate',
    'form 16 income tax return',
    'form 16 tax computation',
    'how to calculate tax from form 16',
    'how to use form 16 for itr',
    'form 16 part a part b',
    'form 16 tds certificate',
    'form 16 employer certificate',
    'form 16 for home loan',
    'form 16 for bank loan',
    'form 16 verification on traces',
    'form 16 vs form 16a',
    'form 16 vs form 16b',
    'income tax calculator from form 16',
    'form 16 refund calculator',
    'form 16 itr filing',
    'form 16 what is it',
    'form 16 details',
    'form 16 sample',
    'form 16 salary slip',
    'form 16 from employer',
    'form 16 due date',
    'form 16 issue date',
    'form 16 for self employed',
    'form 16 meaning in hindi',
    'form 16 kaise banaye',
    'form 16 kab milta hai',
    'tds certificate form 16',
    'salary tds calculator',
    'employer tds certificate',
    'income tax from salary certificate',
    'form 16 income tax refund',
    'form 16 itr 1',
    'traces tds certificate download',
    'form 26as vs form 16',
    'annual information statement form 16',
  ],
  openGraph: {
    title: 'Form 16 Tax Calculator: Compute Tax from TDS Certificate - Fermor',
    description: 'Use your Form 16 to estimate income tax liability, refund, or balance tax due for FY 2025-26. Enter Part A TDS and Part B salary details. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/form16-tax-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-form16-tax-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form 16 Tax Calculator - Fermor',
    description: 'Compute income tax refund or balance due from your Form 16 Part A and Part B. Free for India FY 2025-26.',
    images: ['https://fermor.in/og-form16-tax-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/form16-tax-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Form 16 TDS Certificate', 'Income Tax Computation from Salary', 'TRACES Form 16 Verification', 'TDS on Salary Section 192', 'ITR Filing with Form 16', 'Form 16 Part A and Part B', 'Tax Refund from Form 16', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Form 16 Tax Calculator', item: 'https://fermor.in/calculators/form16-tax-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Form 16 Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/form16-tax-calculator',
  description: 'Calculate income tax from Form 16. Enter gross salary from Part B, TDS deducted from Part A, and deductions to compute your tax liability and refund or balance due for FY 2025-26.',
  featureList: [
    'Form 16 Part A TDS input',
    'Form 16 Part B salary and deductions input',
    'Old vs New regime toggle',
    'Professional tax and standard deduction auto-applied',
    'Section 80C, 80D, HRA, NPS deductions',
    'Refund or balance tax due computation',
    'Multi-currency support',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Income Tax from Form 16',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Form 16 Tax Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter gross salary from Form 16 Part B', text: 'Open Form 16 Part B and enter the gross salary figure shown in the salary breakup schedule. This is your total income from employment before any deductions.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter TDS from Form 16 Part A', text: 'From Form 16 Part A, enter the total TDS deposited by your employer. This is the sum of quarterly TDS deposits as certified by TRACES.' },
    { '@type': 'HowToStep', position: 3, name: 'Select old or new tax regime', text: 'Select the regime applicable to you. For FY 2025-26, the new regime is the default. If you submitted deduction declarations to your employer, the old regime may have been applied.' },
    { '@type': 'HowToStep', position: 4, name: 'Add deductions (old regime)', text: 'If you are on the old regime, enter deductions claimed under Section 80C, 80D, HRA, home loan interest, professional tax, and NPS as shown in Form 16 Part B or separately computed.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your refund or balance due', text: 'The calculator shows your taxable income, tax liability, TDS already paid, and the net refund or balance tax due before filing your ITR.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Form 16',
  alternateName: 'TDS Certificate for Salary',
  description: 'Form 16 is a TDS certificate issued by employers under Section 203 of the Income Tax Act, 1961. Part A contains quarterly TDS deposit details as certified by TRACES, and Part B contains a detailed salary breakup and deduction computation.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Tax_Deducted_at_Source',
    'https://www.wikidata.org/wiki/Q15262427',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Form 16 Tax Calculator: Compute Tax from TDS Certificate',
  url: 'https://fermor.in/calculators/form16-tax-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Form 16', alternateName: 'TDS Certificate for Salary' }],
  audience: { '@type': 'Audience', audienceType: 'Indian salaried employees, ITR filers, HR professionals, CAs and tax advisors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-form16', name: 'What Is Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#form16-parts', name: 'Form 16 Part A and Part B' },
    { '@type': 'WebPageElement', cssSelector: '#form16-calculation', name: 'How to Calculate Tax from Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#form16-itr', name: 'Form 16 for ITR Filing' },
    { '@type': 'WebPageElement', cssSelector: '#form16-home-loan', name: 'Form 16 for Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#form16-traces', name: 'Form 16 Verification on TRACES' },
    { '@type': 'WebPageElement', cssSelector: '#form16-format', name: 'Form 16 Format' },
    { '@type': 'WebPageElement', cssSelector: '#form16-vs', name: 'Form 16 vs Form 16A vs Form 16B' },
    { '@type': 'WebPageElement', cssSelector: '#form16-regime', name: 'Old vs New Regime from Form 16' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Form 16 Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function Form16TaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <Form16TaxCalculatorClient />
    </>
  );
}

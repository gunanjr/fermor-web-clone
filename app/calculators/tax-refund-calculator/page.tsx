import type { Metadata } from 'next';
import TaxRefundCalculatorClient from './TaxRefundCalculatorClient';
import { FAQS } from './faqs';

const PAGE_DATE_PUBLISHED = '2026-07-08';
const PAGE_DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: 'Tax Refund Calculator: Estimate Your Income Tax Refund',
  description: 'Free income tax refund calculator for India FY 2025-26. Estimate your refund or balance tax due. Compare old vs new regime. Free to use.',
  keywords: [
    'tax refund calculator',
    'income tax refund calculator',
    'tax return calculator',
    'refund calculator',
    'estimate my tax return',
    'income tax return calculator',
    'tax rebate calculator',
    'income tax refund estimator',
    'predict my tax return',
    'turbotax tax calculator india',
    'income tax calculator refund',
    'tax refund estimator india',
    'income tax refund 2025-26',
    'income tax refund fy 2025-26',
    'income tax refund ay 2026-27',
    'tds refund calculator',
    'how to calculate income tax refund',
    'income tax refund amount calculator',
    'how much tax refund will i get',
    'income tax refund india',
    'itr refund calculator',
    'how to estimate tax refund india',
    'tax refund calculator india 2025',
    'itr refund estimator',
    'income tax refund status calculator',
    'old regime vs new regime refund',
    'section 87a rebate calculator',
    'section 80c refund calculator',
    'tax refund after tds',
    'advance tax refund calculator',
    'self assessment tax calculator',
    'income tax slab calculator 2025-26',
    'new tax regime calculator',
    'old tax regime calculator',
    'refund under new tax regime',
    'income tax refund salaried employee',
    'how to get income tax refund',
    'income tax return refund calculator',
    'tax refund for salaried employees india',
    'form 16 refund calculator',
    'tax refund calculator with deductions',
    'income tax refund for nri',
    'income tax refund amount',
    'when is income tax refund credited',
    'income tax refund time',
    'income tax refund online',
    'check income tax refund',
    'income tax refund 2026',
    'tax return estimator',
    'irs refund calculator india equivalent',
  ],
  openGraph: {
    title: 'Tax Refund Calculator: Estimate Your Income Tax Refund - Fermor',
    description: 'Estimate your income tax refund or balance tax due for FY 2025-26. Compare old and new tax regime, enter deductions, and see your refund instantly. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/tax-refund-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-tax-refund-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax Refund Calculator India - Fermor',
    description: 'Estimate your FY 2025-26 income tax refund or balance due. Old vs new regime comparison. Free to use.',
    images: ['https://fermor.in/og-tax-refund-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/tax-refund-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Income Tax India', 'Tax Refund Calculation', 'Section 87A Rebate', 'Old vs New Tax Regime', 'TDS on Salary', 'Section 80C Deductions', 'Section 80D Deductions', 'Form 16 TDS Certificate', 'ITR Filing India', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Tax Refund Calculator', item: 'https://fermor.in/calculators/tax-refund-calculator' },
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
  name: 'Tax Refund Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/tax-refund-calculator',
  description: 'Estimate your income tax refund or balance tax due for FY 2025-26. Supports old and new tax regimes, deductions under 80C, 80D, HRA, NPS, and TDS already deducted by employer.',
  featureList: [
    'Old vs New Tax Regime comparison',
    'Section 87A rebate calculation',
    'Deductions under 80C, 80D, HRA, NPS',
    'TDS deducted by employer input',
    'Advance tax and self-assessment tax input',
    'Refund or balance tax due result',
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
  name: 'How to Calculate Your Income Tax Refund',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Tax Refund Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your gross annual salary', text: 'Enter your total CTC or gross salary before any deductions. Use the slider or click the value to type an exact figure.' },
    { '@type': 'HowToStep', position: 2, name: 'Select your tax regime', text: 'Choose old or new tax regime for FY 2025-26. The new regime applies a Rs 75,000 standard deduction; the old regime applies Rs 50,000.' },
    { '@type': 'HowToStep', position: 3, name: 'Add deductions (old regime only)', text: 'Under the old regime, enter deductions claimed under Section 80C, 80D, HRA exemption, home loan interest, NPS, and any other allowable deductions. These reduce your taxable income.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter TDS and advance tax paid', text: 'Enter the total TDS deducted by your employer (from Form 16 Part A) and any advance tax or self-assessment tax you paid during the year.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your refund or balance due', text: 'The calculator shows your gross tax, cess, net tax liability, and either the refund amount (if tax paid exceeds liability) or the balance tax you owe.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Income Tax Refund',
  alternateName: 'IT Refund',
  description: 'A repayment by the Income Tax Department when TDS deducted by an employer or advance tax paid exceeds the actual tax liability computed at the time of filing an ITR.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Tax_refund',
    'https://www.wikidata.org/wiki/Q215592',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Tax Refund Calculator: Estimate Your Income Tax Refund',
  url: 'https://fermor.in/calculators/tax-refund-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Income Tax Refund', alternateName: 'IT Refund' }],
  audience: { '@type': 'Audience', audienceType: 'Indian salaried employees, self-employed individuals, NRI taxpayers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-refund', name: 'What Is an Income Tax Refund' },
    { '@type': 'WebPageElement', cssSelector: '#refund-formula', name: 'Tax Refund Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#regime-comparison', name: 'Old vs New Regime Refund' },
    { '@type': 'WebPageElement', cssSelector: '#tax-slabs', name: 'Income Tax Slabs FY 2025-26' },
    { '@type': 'WebPageElement', cssSelector: '#deductions', name: 'Deductions That Maximize Your Refund' },
    { '@type': 'WebPageElement', cssSelector: '#tds-salary', name: 'TDS on Salary and Refund' },
    { '@type': 'WebPageElement', cssSelector: '#refund-timeline', name: 'Income Tax Refund Timeline' },
    { '@type': 'WebPageElement', cssSelector: '#refund-status', name: 'How to Check Refund Status' },
    { '@type': 'WebPageElement', cssSelector: '#refund-delay', name: 'Why Is Your Refund Delayed' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Tax Refund Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function TaxRefundCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <TaxRefundCalculatorClient />
    </>
  );
}

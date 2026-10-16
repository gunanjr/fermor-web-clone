import type { Metadata } from 'next';
import RentalIncomeTaxClient from './RentalIncomeTaxClient';

const PAGE_DATE_PUBLISHED = '2026-07-29';
const PAGE_DATE_MODIFIED = '2026-07-29';

export const metadata: Metadata = {
  title: 'Rental Income Tax Calculator: Section 24 Deductions FY 2026-27',
  description: 'Free rental income tax calculator for India. Calculate Net Annual Value (NAV), Section 24(a) 30% standard deduction, home loan interest deduction, and net tax liability. Free to use.',
  keywords: [
    'rental income tax calculator',
    'income from house property calculator india',
    'section 24 standard deduction calculator',
    'section 24b home loan interest rental deduction',
    'net annual value nav property tax calculator',
    'tax on rent received india 2026',
    'commercial property rental tax calculator',
    'residential rental income tax slab calculator',
    '30 percent standard deduction on rental income',
    'set off house property loss rental income',
    'income tax on house rent received calculator',
    'old vs new tax regime rental income',
  ],
  openGraph: {
    title: 'Rental Income Tax Calculator: Section 24 Deductions FY 2026-27 - Fermor',
    description: 'Calculate tax on rental income in India: Gross Annual Value, municipal tax deductions, 30% standard deduction, home loan interest, and net tax payable. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/rental-income-tax-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-rental-income-tax-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Income Tax Calculator - Fermor',
    description: 'Calculate income from house property, Section 24 30% standard deduction, and net tax payable in India. Free to use.',
    images: ['https://fermor.in/og-rental-income-tax-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/rental-income-tax-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Income from House Property', 'Section 24(a) Standard Deduction', 'Section 24(b) Interest Deduction', 'Gross Annual Value', 'Municipal Tax Deduction', 'Income Tax Act 1961', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Rental Income Tax Calculator', item: 'https://fermor.in/calculators/rental-income-tax-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is rental income taxed under Indian Income Tax Act?', acceptedAnswer: { '@type': 'Answer', text: 'Rental income is taxed under the head Income from House Property. Gross annual rent is reduced by municipal taxes paid, followed by a flat 30% standard deduction under Section 24(a) and home loan interest under Section 24(b).' } },
    { '@type': 'Question', name: 'What is the Section 24(a) standard deduction on rental income?', acceptedAnswer: { '@type': 'Answer', text: 'Section 24(a) grants a flat 30% standard deduction on Net Annual Value (NAV) of let-out property. This deduction is allowed regardless of your actual expenditure on repairs, painting, or maintenance.' } },
    { '@type': 'Question', name: 'Can municipal property taxes be deducted from rental income?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, municipal property taxes paid by the property owner during the financial year can be fully deducted from Gross Annual Rent to arrive at Net Annual Value (NAV).' } },
    { '@type': 'Question', name: 'How much home loan interest is deductible on let-out property?', acceptedAnswer: { '@type': 'Answer', text: 'For let-out property, the entire home loan interest paid during the year is deductible under Section 24(b). However, set-off of net loss under house property against other income (salary/business) is capped at Rs 2 Lakh per financial year.' } },
    { '@type': 'Question', name: 'Is rental income taxable under New Tax Regime Section 115BAC?', acceptedAnswer: { '@type': 'Answer', text: 'Under the New Tax Regime, rental income is still entitled to municipal tax deduction and Section 24(a) 30% standard deduction. However, loss under house property cannot be set off against salary or business income.' } },
    { '@type': 'Question', name: 'Is TDS deducted on rental income in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, under Section 194I, if annual rent paid by a corporate tenant exceeds Rs 2.4 Lakh, TDS is deducted at 10%. For individual tenants paying rent over Rs 50,000/month, TDS is 5% under Section 194IB.' } },
    { '@type': 'Question', name: 'What happens if a property remains vacant for part of the year?', acceptedAnswer: { '@type': 'Answer', text: 'If a property is vacant during part of the year, Gross Annual Value is based on actual rent received for the occupied period, providing relief for vacancy loss.' } },
    { '@type': 'Question', name: 'Are maintenance fees paid to society deductible from rent?', acceptedAnswer: { '@type': 'Answer', text: 'If society maintenance is paid directly by the tenant or included in rent, only the net rent retained by the landlord is considered Gross Annual Value.' } },
    { '@type': 'Question', name: 'How to calculate net taxable income from rented house?', acceptedAnswer: { '@type': 'Answer', text: 'Taxable Rental Income = (Gross Rent - Municipal Taxes) - 30% Standard Deduction - Home Loan Interest Paid.' } },
    { '@type': 'Question', name: 'How does this rental income tax calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes Gross Annual Value, NAV, Section 24(a) 30% deduction, Section 24(b) interest deduction, net taxable rental income, and income tax payable.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Rental Income Tax Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/rental-income-tax-calculator',
  description: 'Calculate income from house property, Section 24 standard deductions, home loan interest deductions, and net tax liability on rent in India.',
  featureList: ['Gross Annual Value calculation', 'Municipal tax deduction', 'Section 24(a) 30% flat standard deduction', 'Section 24(b) home loan interest deduction', 'Tax slab comparison (New vs Old Regime)', 'Donut chart tax breakdown', 'After-tax net rental yield', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Tax on Rental Income in India', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Rental Income Tax Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter monthly rent collected', text: 'Input monthly rent received from tenant.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter municipal property tax', text: 'Input annual municipal taxes paid during the financial year.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter home loan interest', text: 'Input annual home loan interest paid for the rented property.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net taxable income and tax', text: 'View 30% standard deduction, net taxable rental income, and tax payable.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Income from House Property', alternateName: 'Section 24 Rental Income Tax',
  description: 'A head of income under the Indian Income Tax Act, 1961, regulating taxation of rental income earned from real estate properties.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Income_tax_in_India'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Rental Income Tax Calculator: Section 24 Deductions FY 2026-27',
  url: 'https://fermor.in/calculators/rental-income-tax-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Income from House Property', alternateName: 'Section 24 Rental Income Tax' }],
  audience: { '@type': 'Audience', audienceType: 'Landlords, property owners, CAs, taxpayers, real estate investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-rental-income-tax', name: 'What Is Rental Income Tax?' },
    { '@type': 'WebPageElement', cssSelector: '#section-24-rules', name: 'Section 24 Deductions and Computation Rules' },
    { '@type': 'WebPageElement', cssSelector: '#tax-slab-table', name: 'Tax Impact on Rental Income by Tax Slab' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function RentalIncomeTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <RentalIncomeTaxClient />
    </>
  );
}

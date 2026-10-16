import type { Metadata } from 'next';
import NPSTaxBenefitClient from './NPSTaxBenefitClient';
import { NPS_FAQS } from './faqData';

const PAGE_DATE_PUBLISHED = '2026-07-06';
const PAGE_DATE_MODIFIED = '2026-10-14';

export const metadata: Metadata = {
  title: 'NPS Tax Benefit Calculator: Free 80CCD Deduction Calculator India',
  description: 'Free NPS tax benefit calculator. Calculate tax savings under 80CCD(1), 80CCD(1B), and 80CCD(2) for salaried and self-employed taxpayers. Know how much NPS saves in tax. Free to use.',
  keywords: [
    'nps tax benefit',
    'nps tax benefit calculator',
    'nps tax saving',
    'nps tax exemption',
    'nps deduction',
    'nps deduction in new tax regime',
    'nps exemption in new tax regime',
    'nps in new tax regime',
    '80ccd deduction',
    '80ccd 1b',
    '80ccd 2 deduction',
    '80ccd 1 deduction',
    '80ccd 1b deduction',
    '80ccd nps',
    'nps 80ccd 1b',
    'nps 80ccd 2',
    'nps employer contribution tax benefit',
    'employer contribution to nps',
    'nps deduction under new tax regime',
    'national pension scheme tax benefit',
    'national pension scheme tax exemption',
    'national pension scheme deduction',
    'nps for tax saving',
    'nps contribution tax benefit',
    'nps section',
    'nps new tax regime',
    'corporate nps tax benefit',
    'nps deduction section',
    'nps comes under which section of income tax',
    'nps is tax free',
    'nps itr section',
    'nps scheme benefits',
    'tax planning',
    'nps tax calculator',
    'nps tax',
    'nps benefit',
    'nps benefits tax',
  ],
  openGraph: {
    title: 'NPS Tax Benefit Calculator: 80CCD(1), 80CCD(1B), 80CCD(2) - Fermor',
    description: 'Calculate your NPS tax savings under 80CCD(1), 80CCD(1B), and 80CCD(2). Covers salaried, government, and self-employed taxpayers. Works for both old and new tax regimes. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/nps-tax-benefit-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-nps-tax-benefit-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPS Tax Benefit Calculator - Fermor',
    description: 'Free NPS tax benefit calculator. Calculate 80CCD(1), 80CCD(1B), and 80CCD(2) deductions and total tax saved.',
    images: ['https://fermor.in/og-nps-tax-benefit-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/nps-tax-benefit-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['NPS Tax Benefits', 'Section 80CCD', '80CCD(1B)', '80CCD(2)', 'National Pension System', 'Old Tax Regime', 'New Tax Regime', 'Employer NPS Contribution', 'Self-employed NPS', 'Income Tax India'],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: NPS_FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'NPS Tax Benefit Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/nps-tax-benefit-calculator',
  description: 'Free NPS tax benefit calculator for India. Calculate tax deductions under 80CCD(1), 80CCD(1B), and 80CCD(2) for salaried, government, and self-employed taxpayers. Supports both old and new tax regimes.',
  featureList: ['80CCD(1) Own Contribution Deduction', '80CCD(1B) Extra Rs 50,000 Deduction', '80CCD(2) Employer Contribution Deduction', 'Old vs New Regime Comparison', 'Salaried / Government / Self-employed Modes', 'Tax Saved Calculation with Donut Chart', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate NPS Tax Benefit', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor NPS Tax Benefit Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your annual income', text: 'Enter your annual gross income and basic salary. Basic salary is used to calculate the 80CCD(1) and 80CCD(2) percentage limits.' },
    { '@type': 'HowToStep', position: 2, name: 'Select employment type', text: 'Select Salaried Private, Salaried Government, or Self-employed. This determines the 80CCD(1) percentage limit (10% for salaried, 20% for self-employed) and the 80CCD(2) employer limit (14% for government employees and for any employee in the new regime, 10% for private employees in the old regime).' },
    { '@type': 'HowToStep', position: 3, name: 'Enter your NPS contributions', text: 'Enter your own annual NPS contribution and additional voluntary contribution under 80CCD(1B). For salaried employees, also enter the employer contribution amount.' },
    { '@type': 'HowToStep', position: 4, name: 'Select tax regime', text: 'Choose old or new tax regime. Under the new regime, only the employer contribution (80CCD(2)) is deductible.' },
    { '@type': 'HowToStep', position: 5, name: 'Review your NPS tax savings', text: 'The result panel shows deductions under each section, total NPS deduction, and total tax saved broken down by 80CCD section.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Section 80CCD', alternateName: 'NPS Deduction',
  description: 'Section 80CCD of the Income Tax Act covers tax deductions for National Pension System (NPS) contributions. 80CCD(1): own contribution within 80C limit. 80CCD(1B): extra Rs 50,000 deduction for own NPS contribution. 80CCD(2): employer NPS contribution, available under both regimes.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/National_Pension_System_(India)'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'NPS Tax Benefit Calculator: 80CCD(1), 80CCD(1B), 80CCD(2) India',
  url: 'https://fermor.in/calculators/nps-tax-benefit-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'NPS Tax Benefits', alternateName: '80CCD Deduction' }],
  audience: { '@type': 'Audience', audienceType: 'Indian taxpayers, salaried employees, government employees, self-employed professionals', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-nps-tax-benefit', name: 'What Are NPS Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#80ccd1', name: 'Section 80CCD(1): Own Contribution Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#80ccd1b', name: 'Section 80CCD(1B): Extra Rs 50,000 Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#80ccd2', name: 'Section 80CCD(2): Employer Contribution Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#nps-limits-table', name: 'NPS Tax Deduction Limits Table' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new-regime', name: 'NPS Benefits in Old vs New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'NPS Tax Savings: Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#govt-vs-private', name: 'Government vs Private Employee NPS Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#self-employed-nps', name: 'Self-Employed NPS Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#claim-itr', name: 'How to Claim NPS Deduction in ITR' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "NPS Tax Benefit Calculator", item: 'https://fermor.in/calculators/nps-tax-benefit-calculator' },
  ],
};

export default function NPSTaxBenefitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <NPSTaxBenefitClient />
    </>
  );
}

import type { Metadata } from 'next';
import HRACalculatorClient from './HRACalculatorClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/hra-calculator`;
  return {
    title: 'HRA Calculator: House Rent Allowance Exemption under Section 10(13A)',
    description:
      'Free HRA calculator for India. Calculate your HRA exemption under Section 10(13A) of the Income Tax Act. Metro and non-metro options. Find your tax-saving HRA exemption. Free to use.',
    keywords: [
      'HRA calculator',
      'house rent allowance exemption',
      'Section 10 13A',
      'HRA exemption calculator',
      'HRA metro vs non-metro',
      'HRA tax benefit',
      'HRA formula',
      'rent receipt',
      'landlord PAN',
      'salary HRA component',
      'hra exemption section 10 13a',
      'hra calculation formula',
      'hra for metro cities',
      'hra for non metro cities',
      'hra tax exemption india',
      'hra calculator salaried',
      'rent paid hra exemption',
      'hra basic salary percentage',
      'hra claim without rent',
      'hra deduction old regime',
      'nri hra exemption',
      'hra calculator excel',
      'house rent allowance tax',
      'hra exemption limit',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'HRA Calculator: House Rent Allowance Exemption under Section 10(13A)',
      description:
        'Calculate your HRA exemption under Section 10(13A). Metro and non-metro options. Free for India.',
      images: ['https://fermor.in/og-hra-calculator.png'],
    },
    openGraph: {
      title: 'HRA Calculator: House Rent Allowance Exemption under Section 10(13A) - Fermor',
      description:
        'Calculate your HRA exemption under Section 10(13A) of the Income Tax Act. Enter your basic salary, HRA received, rent paid, and city type. See your exact HRA exemption, taxable HRA, and annual tax saving. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/hra-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-hra-calculator.png', width: 1200, height: 630, alt: 'Fermor HRA Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-19';
const PAGE_DATE_PUBLISHED = '2026-06-10';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'HRA Exemption',
    'Section 10(13A)',
    'House Rent Allowance',
    'Income Tax India',
    'Personal Finance India',
    'Tax Planning India',
    'Salary Components',
    'Rent Receipt Requirements',
    'Metro vs Non-Metro HRA',
    'SEBI Regulations',
    'Account Aggregator Framework',
    'Landlord PAN Rules',
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
  name: 'HRA Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/hra-calculator',
  description: 'Calculate your HRA exemption under Section 10(13A) of the Income Tax Act. Enter basic salary, HRA received, rent paid, and city type. Shows exempt HRA, taxable HRA, and annual tax saving. Free, browser-based.',
  featureList: [
    'HRA exemption calculation',
    'Metro and non-metro city support',
    'Three-pronged exemption formula with optional Dearness Allowance',
    'Exempt vs taxable HRA donut chart',
    'Taxable HRA display',
    'Annual tax saving estimate',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'HRA Calculator', item: 'https://fermor.in/calculators/hra-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate HRA Exemption',
  description: 'Step-by-step guide to calculate your House Rent Allowance exemption under Section 10(13A).',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor HRA Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your monthly basic salary',
      text: 'Enter your basic salary per month as shown in your salary slip. Basic salary is the foundation for HRA, PF, and gratuity calculations.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter HRA received and rent paid',
      text: 'Enter the monthly HRA amount your employer pays you and the actual monthly rent you pay for your accommodation.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select your city type',
      text: 'Choose between metro (Delhi, Mumbai, Chennai, Kolkata) or non-metro for all other cities. Metro cities qualify for 50 per cent of basic as the upper limit, non-metro for 40 per cent.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'See your HRA exemption',
      text: 'The calculator shows your monthly exempt HRA, taxable HRA, and annual tax saving. The exemption is the least of three amounts as per the Section 10(13A) formula.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'HRA',
  alternateName: 'House Rent Allowance',
  description: 'A salary component paid by employers to cover rented accommodation costs, partially exempt from income tax under Section 10(13A) based on rent paid, basic salary, and city type.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/House_rent_allowance',
    'https://www.wikidata.org/wiki/Q5913737',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'HRA Calculator: House Rent Allowance Exemption under Section 10(13A)',
  description: 'Calculate your HRA exemption under Section 10(13A) with metro and non-metro options. Free for India.',
  url: 'https://fermor.in/calculators/hra-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'HRA', alternateName: 'House Rent Allowance' },
    { '@type': 'DefinedTerm', name: 'Section 10(13A)' },
    { '@type': 'DefinedTerm', name: 'Metro HRA' },
    { '@type': 'DefinedTerm', name: 'Dearness Allowance' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, tax planners, HRA claimants, NRI employees',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-hra-exemption',          name: 'What Is HRA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#hra-conditions',                 name: 'Conditions for Claiming HRA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#hra-exemption-formula',          name: 'HRA Exemption Formula' },
    { '@type': 'WebPageElement', cssSelector: '#hra-excel-formula',              name: 'HRA Exemption Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#metro-vs-non-metro',             name: 'Metro vs Non-Metro HRA' },
    { '@type': 'WebPageElement', cssSelector: '#hra-metro-satellite-towns',      name: 'Does Gurgaon, Noida, or Navi Mumbai Count as Metro' },
    { '@type': 'WebPageElement', cssSelector: '#hra-govt-employees',             name: 'HRA for Government Employees: X, Y, Z City Classification' },
    { '@type': 'WebPageElement', cssSelector: '#hra-calculation-example',        name: 'HRA Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#hra-binding-constraint',         name: 'Which Part of the Formula Applies to You' },
    { '@type': 'WebPageElement', cssSelector: '#hra-reference-table',            name: 'HRA Exemption Reference Table by Basic Salary' },
    { '@type': 'WebPageElement', cssSelector: '#hra-tax-savings-by-slab',        name: 'How Much Does HRA Actually Save You in Tax' },
    { '@type': 'WebPageElement', cssSelector: '#hra-rent-receipts',              name: 'Rent Receipts and Landlord PAN' },
    { '@type': 'WebPageElement', cssSelector: '#hra-documents-checklist',        name: 'Documents Required for HRA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#hra-mid-year-change',            name: 'HRA Exemption When Salary or City Changes Mid-Year' },
    { '@type': 'WebPageElement', cssSelector: '#hra-and-old-regime',             name: 'HRA Under the Old Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#hra-with-home-loan',             name: 'HRA When You Also Have a Home Loan' },
    { '@type': 'WebPageElement', cssSelector: '#hra-rent-to-parents',            name: 'Can You Pay Rent to Parents and Claim HRA' },
    { '@type': 'WebPageElement', cssSelector: '#hra-vs-80gg',                    name: 'HRA vs Section 80GG' },
    { '@type': 'WebPageElement', cssSelector: '#hra-self-employed',              name: 'Can Self-Employed Individuals Claim HRA' },
    { '@type': 'WebPageElement', cssSelector: '#hra-for-nri',                    name: 'HRA for NRI Employees' },
    { '@type': 'WebPageElement', cssSelector: '#hra-mistakes',                   name: 'Common HRA Claim Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-limitations',         name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',                  name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                     name: 'How to Use This HRA Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#hra-glossary',                   name: 'HRA Glossary: Key Terms Explained' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                             name: 'Frequently Asked Questions' },
  ],
};

export default async function HRAPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <HRACalculatorClient />
    </>
  );
}

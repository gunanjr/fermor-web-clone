import type { Metadata } from 'next';
import ProfessionalTaxCalculatorClient from './ProfessionalTaxCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/professional-tax-calculator`;
  return {
    title: 'Professional Tax Calculator: State-Wise PT Calculator',
    description:
      'Free professional tax calculator for India. Calculate professional tax for all Indian states (Karnataka, Maharashtra, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, West Bengal, etc.). No sign-up required.',
    keywords: [
      'professional tax calculator',
      'professional tax india',
      'state wise professional tax',
      'professional tax calculation',
      'pt calculator online',
      'professional tax slab',
      'professional tax by state',
      'karnataka professional tax',
      'maharashtra professional tax',
      'tamil nadu professional tax',
      'andhra pradesh professional tax',
      'telangana professional tax',
      'gujarat professional tax',
      'west bengal professional tax',
      'professional tax deduction',
      'professional tax exemption',
      'professional tax limit',
      'professional tax eligibility',
      'professional tax on salary',
      'professional tax rates 2025',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Professional Tax Calculator: State-Wise PT Calculator',
      description:
        'Free professional tax calculator for India. Calculate PT for all Indian states. No sign-up required.',
      images: ['https://fermor.in/og-professional-tax-calculator.png'],
    },
    openGraph: {
      title: 'Professional Tax Calculator: State-Wise PT Calculator - Fermor',
      description:
        'Free professional tax calculator for India. Calculate professional tax for all Indian states (Karnataka, Maharashtra, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, West Bengal, etc.). No sign-up required.',
      type: 'website',
      url: 'https://fermor.in/calculators/professional-tax-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-professional-tax-calculator.png', width: 1200, height: 630, alt: 'Fermor Professional Tax Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-06-30';
const PAGE_DATE_PUBLISHED = '2026-06-30';

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
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Professional Tax India',
    'State Wise PT',
    'Salary Taxation India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Indian Tax System',
    'Payroll Compliance India',
    'TDS Rules India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is professional tax in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional tax is a state-level tax levied on individuals earning income through employment, profession, or trade. It is collected by the state government and the rate varies by state. The maximum professional tax payable in any state is Rs 2,500 per year as per Article 276 of the Constitution of India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which states levy professional tax in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional tax is levied by Andhra Pradesh, Karnataka, Maharashtra, Tamil Nadu, Telangana, Gujarat, West Bengal, Madhya Pradesh, Assam, Kerala, Meghalaya, Odisha, Tripura, Bihar, Jharkhand, and Sikkim. Union territories and some states like Delhi, Haryana, Punjab, Rajasthan, Uttar Pradesh do not levy professional tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum professional tax per year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum professional tax per financial year is Rs 2,500 as per Article 276 of the Constitution of India. This is the upper limit set by the Constitution. Individual states have their own slab rates within this limit. Karnataka is Rs 2,400, Maharashtra is Rs 2,500, Tamil Nadu is Rs 2,185, Andhra Pradesh is Rs 2,080, Telangana is Rs 2,080, Gujarat is Rs 1,200, West Bengal is Rs 2,500.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is exempt from paying professional tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exemptions vary by state but typically include: individuals earning below the threshold (e.g., below Rs 15,000/month in Karnataka, Rs 7,500/month in Maharashtra), senior citizens, physically disabled persons, women in some states, parents of children with disabilities, and defence personnel in some states. Check your specific state rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is professional tax deducted from salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Employers deduct professional tax from the employee\'s monthly salary and deposit it with the state government. The deduction happens at source, similar to TDS. The employer is responsible for registration and timely payment to the state tax department, typically on a monthly or annual basis depending on the state.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is professional tax applicable on pension income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional tax is generally not applicable on pension income since pensioners are not engaged in any profession, employment, or trade. However, if a pensioner takes up re-employment or consultancy work, professional tax may apply on that income.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is professional tax applicable for freelancers and self-employed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, freelancers and self-employed professionals are liable to pay professional tax in states where it is applicable. They must register themselves with the state commercial tax department and pay the tax directly. The rates and slabs are different from salaried employees in some states.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is professional tax deductible under the Income Tax Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, professional tax paid during the financial year is deductible from gross salary income under Section 16(iii) of the Income Tax Act, 1961. This deduction is available under both the old and new tax regimes. There is no upper limit on this deduction: the actual amount paid is deductible.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if an employee works in a different state than the employer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional tax is typically deducted based on the state where the employee works (the place of posting), not where the employer is headquartered. If the employee works in Karnataka but the company is registered in Maharashtra, Karnataka PT rules apply. If the employee works from home in a state without PT, no PT is deducted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the penalty for non-payment of professional tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Penalties for non-payment vary by state. Generally, late payment attracts interest of 1-2% per month, and non-registration can result in a penalty of Rs 5,000 to Rs 10,000. Employers who fail to deduct or deposit PT on time face higher penalties, including potential legal action under state tax laws.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the professional tax for Karnataka for 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Karnataka has three slabs: up to Rs 15,000/month salary has nil PT, Rs 15,001 to Rs 25,000 has Rs 150/month (Rs 1,800/year), above Rs 25,000 has Rs 200/month (Rs 2,400/year). The annual maximum is Rs 2,400.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the professional tax for Maharashtra for 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maharashtra has multiple slabs. For salaried employees earning above Rs 10,000/month, the professional tax is Rs 200/month (Rs 2,500/year). Those earning below Rs 10,000/month pay Rs 175/month in the first 6 months and Rs 200/month thereafter. Some categories like women and senior citizens may have different rules.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Professional Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/professional-tax-calculator',
  description: 'Calculate professional tax for all Indian states. Input monthly salary and select your state to see the applicable professional tax amount. Free, browser-based, no sign-up.',
  featureList: [
    'State-Wise Professional Tax Calculation',
    'All PT-Levying States Covered (Karnataka, Maharashtra, Tamil Nadu, AP, Telangana, Gujarat, West Bengal, etc.)',
    'Monthly and Annual PT Display',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Section 16(iii) Tax Deduction Info',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Professional Tax Calculator', item: 'https://fermor.in/calculators/professional-tax-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Professional Tax',
  description: 'Step-by-step guide to calculate your professional tax liability based on monthly salary and state of employment.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Professional Tax Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your monthly gross salary',
      text: 'Input your monthly gross salary. Professional tax is calculated based on the slab applicable to your salary bracket in your state.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select your state from the dropdown',
      text: 'Choose the state where you work. Professional tax rates vary by state and are deducted based on your place of employment.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'The calculator shows your monthly and annual PT amount',
      text: 'View your monthly professional tax deduction and the total annual amount. The results panel also shows the Section 16(iii) tax benefit.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the annual PT deduction under Section 16(iii)',
      text: 'The professional tax you pay is deductible from your gross salary under Section 16(iii) of the Income Tax Act, reducing your taxable income.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Professional Tax',
  alternateName: 'PT',
  description: 'A state-level tax on employment, profession, and trade in India, capped at Rs 2,500 per year under Article 276 of the Constitution.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Professional_tax',
    'https://www.wikidata.org/wiki/Q7248066',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Professional Tax Calculator: State-Wise PT Calculator',
  description: 'Free professional tax calculator for India. Calculate professional tax for all Indian states (Karnataka, Maharashtra, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, West Bengal, etc.). No sign-up required.',
  url: 'https://fermor.in/calculators/professional-tax-calculator',
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
    { '@type': 'DefinedTerm', name: 'Professional Tax', alternateName: 'PT' },
    { '@type': 'DefinedTerm', name: 'Section 16', alternateName: 'Section 16(iii) Deduction' },
    { '@type': 'DefinedTerm', name: 'State Tax', alternateName: 'State-Level Taxation' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, freelancers, HR professionals, payroll managers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-professional-tax', name: 'What Is Professional Tax' },
    { '@type': 'WebPageElement', cssSelector: '#professional-tax-by-state', name: 'Professional Tax by State' },
    { '@type': 'WebPageElement', cssSelector: '#pt-calculation', name: 'How Professional Tax Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#pt-exemptions', name: 'Professional Tax Exemptions' },
    { '@type': 'WebPageElement', cssSelector: '#pt-tax-benefits', name: 'Tax Benefits Under Section 16(iii)' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Professional Tax Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function ProfessionalTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <ProfessionalTaxCalculatorClient />
    </>
  );
}

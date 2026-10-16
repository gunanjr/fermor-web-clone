import type { Metadata } from 'next';
import { headers } from 'next/headers';
import IncomeTax12LakhClient from './IncomeTax12LakhClient';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'tax' : region;
  const canonical = `https://fermor.in/${canonicalPath}/income-tax-on-12-lakh-salary`;
  return {
    title: 'Income Tax on 12 Lakh Salary: Zero Tax in 2025-26',
    description:
      'Income tax on 12 lakh salary 2025-26. Zero tax in new regime after 87A rebate. Old regime tax Rs 1,56,000. Monthly in-hand Rs 93,800. No sign-up required.',
    keywords: [
      'income tax on 12 lakh salary',
      '12 lpa in hand salary',
      '12 lakh salary tax 2025-26',
      'tax on 12 lakh income india',
      '12 lpa take home salary',
      'income tax 12 lpa new regime',
      '12 lakh ctc in hand salary',
      'tax calculation 12 lakh salary',
      '12 lpa salary breakup',
      'how much tax on 12 lakh salary',
      'income tax on 12 lpa old regime',
      '12 lakh salary monthly in hand',
      'income tax calculator 12 lakh',
      '12 lpa income tax 2025',
      'old vs new regime 12 lpa',
      'section 87a rebate 12 lakh',
      'zero tax 12 lakh salary new regime',
      '12 lpa net salary india',
      'income tax on 12 lakh salary bangalore',
      'income tax on 12 lakh salary delhi',
      '12 lakh annual salary in hand',
      'income tax 12 lpa calculator',
      'take home salary 12 lpa india',
      '12 lakh salary excel calculation',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Income Tax on 12 Lakh Salary: Zero Tax in New Regime 2025-26',
      description:
        'Income tax on Rs 12 lakh salary is zero under new regime after Section 87A rebate. Old regime: Rs 1,56,000. Monthly in-hand: Rs 93,800.',
      images: ['https://fermor.in/og-income-tax-12-lakh.png'],
    },
    openGraph: {
      title: 'Income Tax on 12 Lakh Salary: Zero Tax in 2025-26 - Fermor',
      description:
        'Complete FY 2025-26 income tax breakdown for Rs 12 lakh annual salary. New regime: zero tax after Section 87A rebate. Old regime: Rs 1,56,000. Monthly in-hand salary Rs 93,800. Old vs new regime comparison with all deduction scenarios.',
      type: 'website',
      url: 'https://fermor.in/tax/income-tax-on-12-lakh-salary',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-income-tax-12-lakh.png', width: 1200, height: 630, alt: 'Income Tax on 12 Lakh Salary 2025-26' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-06-22';
const PAGE_DATE_MODIFIED  = '2026-06-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India — the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Income Tax India',
    'Old vs New Tax Regime',
    'Section 87A Rebate',
    'Salary Taxation India',
    'Standard Deduction',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Personal Finance India',
    'Tax Planning India',
    'ITR Filing India',
    'Account Aggregator Framework',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much income tax do I pay on a 12 lakh salary in FY 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the new tax regime in FY 2025-26, income tax on a Rs 12 lakh annual salary is zero. After the standard deduction of Rs 75,000, taxable income is Rs 11,25,000. Tax at new regime slabs is Rs 52,500. Section 87A provides a full rebate for net taxable income up to Rs 12,00,000, wiping out the entire Rs 52,500. Under the old regime with no deductions, the tax is Rs 1,56,000 including 4% cess.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the in-hand salary for 12 LPA in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The monthly in-hand salary for 12 LPA under the new tax regime is approximately Rs 93,800, assuming 50% basic salary. This accounts for employee PF of Rs 6,000 per month (12% of Rs 50,000 basic) and professional tax of Rs 200 per month. Income tax TDS is zero under the new regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is 12 LPA exempt from income tax in the new regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, 12 LPA is effectively tax-free under the new tax regime for FY 2025-26. The standard deduction reduces gross salary to Rs 11,25,000 taxable income. Tax on this is Rs 52,500. Section 87A provides a rebate of up to Rs 60,000 for net taxable income up to Rs 12 lakh, wiping the full liability to zero. The zero-tax threshold at gross salary level is Rs 12,75,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Section 87A rebate for 12 lakh income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 87A of the Income Tax Act 1961 provides a rebate of up to Rs 60,000 for resident individuals whose net taxable income does not exceed Rs 12,00,000 under the new regime in FY 2025-26. For a 12 LPA salary, taxable income is Rs 11,25,000 and tax is Rs 52,500. The full Rs 52,500 is rebated, resulting in zero final tax and zero cess.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose old or new regime for 12 LPA salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new regime is better for virtually every 12 LPA earner in FY 2025-26 because Section 87A delivers zero tax. Under the old regime, even with 80C maxed at Rs 1,50,000 plus Rs 25,000 in 80D plus Rs 75,000 in NPS 80CCD(1B), the tax is approximately Rs 73,320 including cess. The new regime saves at least Rs 73,320 per year at this income level.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much PF is deducted for a 12 lakh salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a 12 LPA salary with basic pay of Rs 50,000 per month, the employee PF deduction under the Employees Provident Fund Act 1952 is Rs 6,000 per month (12% of basic) and Rs 72,000 per year. The employer contributes an equal Rs 6,000 per month, which is part of CTC but not deducted from take-home pay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the income tax for 12 lakh salary under the old regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the old regime with no Chapter VI-A deductions beyond the standard deduction, the tax on Rs 12 lakh salary is Rs 1,56,000. Taxable income is Rs 11,25,000. Tax: 5% on Rs 2.5-5L = Rs 12,500; 20% on Rs 5-10L = Rs 1,00,000; 30% on Rs 10-11.25L = Rs 37,500. Total before cess: Rs 1,50,000. 4% cess: Rs 6,000. Final: Rs 1,56,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does 12 LPA salary attract surcharge?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Surcharge applies only when total income exceeds Rs 50 lakh. A Rs 12 lakh salary is well below this threshold, so no surcharge applies under either regime. Only the 4% health and education cess applies. Under the new regime with the Section 87A rebate, both tax and cess are zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the TDS per month for a 12 LPA salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TDS on a 12 LPA salary under the new regime is zero per month since annual tax liability is nil after the Section 87A rebate. Under the old regime with no deductions, TDS is approximately Rs 13,000 per month (Rs 1,56,000 divided by 12). Employers compute TDS based on the regime you declare at the start of the financial year.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to calculate income tax on 12 lakh salary in Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In Excel, place taxable income (Rs 11,25,000 after standard deduction) in A1. New regime tax formula: =MAX(0,(MIN(A1,800000)-400000)*0.05)+MAX(0,(MIN(A1,1200000)-800000)*0.1). This gives Rs 52,500 for Rs 11,25,000 taxable income. Add a Section 87A check: =IF(A1<=1200000,0,[formula]*1.04) to get zero final tax for 12 LPA.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is 12 LPA in-hand salary in Bangalore or Delhi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly in-hand for 12 LPA in Bangalore is approximately Rs 93,800 (professional tax Rs 200/month). In Delhi, there is no professional tax, so in-hand is approximately Rs 94,000. In Mumbai, professional tax depends on the month but averages Rs 200/month, giving approximately Rs 93,800. Income tax is zero under new regime in all cities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the zero-tax salary limit in FY 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The zero-tax limit for gross salary under the new regime in FY 2025-26 is Rs 12,75,000. The standard deduction of Rs 75,000 reduces this to exactly Rs 12,00,000 taxable income, which is the Section 87A rebate ceiling. Above Rs 12,75,000 gross salary, taxable income exceeds Rs 12,00,000 and the rebate no longer covers the full tax liability.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators and tax guides are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Income Tax on 12 Lakh Salary Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/tax/income-tax-on-12-lakh-salary',
  description: 'Pre-computed income tax breakdown for Rs 12 lakh annual salary in FY 2025-26. New regime: zero tax after Section 87A rebate. Old regime: Rs 1,56,000. Monthly in-hand salary and old vs new regime comparison.',
  featureList: [
    'New Regime Tax Breakdown FY 2025-26',
    'Old Regime Tax Computation',
    'Section 87A Rebate Applied',
    'Old vs New Regime Comparison',
    'Tax Impact by Deduction Level Table',
    'Monthly In-Hand Salary Breakup',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Tax',  item: 'https://fermor.in/tax' },
    { '@type': 'ListItem', position: 3, name: 'Income Tax on 12 Lakh Salary', item: 'https://fermor.in/tax/income-tax-on-12-lakh-salary' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Income Tax on 12 Lakh Salary in FY 2025-26',
  description: 'Step-by-step method to compute income tax on Rs 12 lakh annual salary under new and old tax regimes.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Income Tax Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Start with gross salary', text: 'Begin with total annual CTC or gross salary. For this example: Rs 12,00,000.' },
    { '@type': 'HowToStep', position: 2, name: 'Apply standard deduction', text: 'Subtract the standard deduction of Rs 75,000 (applicable under both regimes in FY 2025-26). Net salary: Rs 11,25,000.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply the new regime tax slabs', text: 'New regime FY 2025-26 slabs: 0% on Rs 0-4L, 5% on Rs 4-8L (Rs 20,000), 10% on Rs 8-11.25L (Rs 32,500). Total: Rs 52,500.' },
    { '@type': 'HowToStep', position: 4, name: 'Apply Section 87A rebate', text: 'Since taxable income (Rs 11,25,000) is below Rs 12,00,000, Section 87A provides a full rebate. Tax after rebate: Rs 0.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Section 87A Rebate',
  alternateName: 'Income Tax Rebate under Section 87A',
  description: 'A rebate under the Income Tax Act 1961 that reduces tax liability to zero for resident individuals with net taxable income not exceeding Rs 12,00,000 under the new regime in FY 2025-26.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Income Tax Terms',
    url: 'https://fermor.in/tax',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Income_tax_in_India',
    'https://www.wikidata.org/wiki/Q751437',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Income Tax on 12 Lakh Salary: Zero Tax in 2025-26',
  description: 'Complete FY 2025-26 income tax breakdown for Rs 12 lakh annual salary. New regime: zero tax. Old regime: Rs 1,56,000. Monthly in-hand salary Rs 93,800.',
  url: 'https://fermor.in/tax/income-tax-on-12-lakh-salary',
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
    { '@type': 'DefinedTerm', name: 'Income Tax', alternateName: 'Indian Income Tax Act 1961' },
    { '@type': 'DefinedTerm', name: 'Section 87A', alternateName: 'Tax Rebate 87A' },
    { '@type': 'DefinedTerm', name: 'New Tax Regime', alternateName: 'Default Tax Regime FY 2025-26' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees, taxpayers, financial planners in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-income-tax',   name: 'What Is Income Tax on a 12 Lakh Salary' },
    { '@type': 'WebPageElement', cssSelector: '#tax-formula',          name: 'Income Tax Formula' },
    { '@type': 'WebPageElement', cssSelector: '#excel-calculation',    name: 'Income Tax in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-breakdown', name: 'New Regime Tax Breakdown' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-breakdown', name: 'Old Regime Tax Breakdown' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new',          name: 'Old vs New Regime Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#section-87a',         name: 'Section 87A Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#with-deductions',     name: 'Tax with Deductions' },
    { '@type': 'WebPageElement', cssSelector: '#in-hand-salary',      name: 'In-Hand Salary for 12 LPA' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',          name: 'How to Use the Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#limitations',         name: 'When These Tax Numbers May Not Apply' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                 name: 'Frequently Asked Questions' },
  ],
};

export default async function IncomeTax12LakhPage() {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <IncomeTax12LakhClient region={region} />
    </>
  );
}

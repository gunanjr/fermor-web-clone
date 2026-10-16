import type { Metadata } from 'next';
import InHandSalaryCalculatorClient from './InHandSalaryCalculatorClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/in-hand-salary-calculator`;
  return {
    title: 'In-Hand Salary Calculator: Calculate Take-Home Pay from CTC',
    description:
      'Free in-hand salary calculator for India. Calculate your monthly take-home salary from your CTC with PF, professional tax, and income tax deductions. Detailed salary breakup. Free to use.',
    keywords: [
      'in-hand salary calculator',
      'inhand salary calculator',
      'take-home salary calculator',
      'CTC to in-hand salary',
      'salary breakup calculator',
      'PF deduction calculator',
      'professional tax India',
      'TDS on salary',
      'gross salary vs net salary',
      'India salary structure',
      'monthly take-home pay',
      'in hand salary from ctc',
      'ctc calculator',
      'salary calculator india',
      'basic salary percentage',
      'hra component salary',
      'employee pf calculation',
      'net salary calculator',
      'salary structure india',
      'nri salary calculator',
      'take home salary calculator india',
      'excel salary calculator',
      'ctc breakup calculator',
      'gratuity in ctc',
      'salary deduction calculator',
      'monthly salary calculator',
      'online salary calculator',
      'in hand pay calculator',
      'net pay calculator',
      'salary tax calculator',
      'ctc meaning in salary',
      'gross salary meaning',
      'annual income calculator',
      '28000 ctc in hand salary',
      '20000 ctc in hand salary',
      '40000 in hand salary per month',
      'salary calculation formula',
      '8th pay commission salary calculator',
      '7th pay commission salary calculator',
      'pay calculator india',
      'monthly income calculator',
      'online income tax calculator',
      'salary increase calculator',
      'old vs new tax regime salary',
      'take home pay calculator india',
      'salary after tax india',
      'net pay india',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'In-Hand Salary Calculator: Calculate Take-Home Pay from CTC',
      description:
        'Calculate your monthly in-hand salary from your CTC. PF, professional tax, and TDS deductions. Free for India.',
      images: ['https://fermor.in/og-in-hand-salary-calculator.png'],
    },
    openGraph: {
      title: 'In-Hand Salary Calculator: Calculate Take-Home Pay from CTC - Fermor',
      description:
        'Calculate your monthly in-hand salary from your CTC with all deductions. Enter your CTC, adjust basic pay percentage, HRA, and other allowances. See the complete salary breakup including PF, professional tax, and income tax. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/in-hand-salary-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-in-hand-salary-calculator.png', width: 1200, height: 630, alt: 'Fermor In-Hand Salary Calculator' }],
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
    'In-Hand Salary',
    'CTC Structure',
    'PF Deduction',
    'Professional Tax',
    'Income Tax TDS',
    'Personal Finance India',
    'Salary Breakup',
    'HRA Component',
    'Gratuity Calculation',
    'NRI Salary Tax',
    'SEBI Regulations',
    'Account Aggregator Framework',
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
  name: 'In-Hand Salary Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/in-hand-salary-calculator',
  description: 'Calculate your monthly take-home salary from your CTC with all deductions including PF, professional tax, and income tax. Detailed salary breakup. Free, browser-based.',
  featureList: [
    'CTC to in-hand salary conversion',
    'Old regime vs new regime automatic tax calculation',
    'Salary breakup with all components',
    'PF deduction calculation',
    'Professional tax deduction',
    'Section 80C deduction support for old regime',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Adjustable basic and HRA percentages',
    'Tax regime comparison showing monthly savings',
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
    { '@type': 'ListItem', position: 3, name: 'In-Hand Salary Calculator', item: 'https://fermor.in/calculators/in-hand-salary-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate In-Hand Salary from CTC',
  description: 'Step-by-step guide to calculate your monthly take-home salary from your CTC.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor In-Hand Salary Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your annual CTC',
      text: 'Enter your total annual Cost to Company as mentioned in your offer letter or latest salary revision.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set basic salary percentage',
      text: 'Set the basic salary percentage of your CTC. The typical range is 40-50 per cent. Basic salary determines your PF, gratuity, and HRA.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Adjust HRA and other allowances',
      text: 'Set the HRA percentage of your CTC. Add any other annual allowances like special allowance, conveyance, or medical allowance.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select tax regime and review',
      text: 'Select New Regime or Old Regime. The calculator automatically computes your estimated monthly income tax and shows total deductions, final in-hand salary, and which regime saves you more per month.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'In-Hand Salary',
  alternateName: 'Take-Home Salary',
  description: 'The actual amount credited to an employee bank account each month after deducting PF, professional tax, income tax, and other deductions from gross salary.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Net_pay',
    'https://www.wikidata.org/wiki/Q1153747',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'In-Hand Salary Calculator: Calculate Take-Home Pay from CTC',
  description: 'Calculate your monthly in-hand salary from your CTC with all deductions including PF, professional tax, and income tax. Free for India.',
  url: 'https://fermor.in/calculators/in-hand-salary-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'In-Hand Salary', alternateName: 'Take-Home Salary' },
    { '@type': 'DefinedTerm', name: 'CTC' },
    { '@type': 'DefinedTerm', name: 'PF Deduction' },
    { '@type': 'DefinedTerm', name: 'Marginal Relief' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, job seekers, NRI employees, HR professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-in-hand-salary',          name: 'What Is In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#in-hand-salary-formula',          name: 'In-Hand Salary Formula' },
    { '@type': 'WebPageElement', cssSelector: '#salary-breakup-example',          name: 'Salary Breakup Example' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-vs-gross-vs-net',             name: 'CTC vs Gross Salary vs Net Salary' },
    { '@type': 'WebPageElement', cssSelector: '#pf-and-professional-tax',         name: 'PF and Professional Tax Deductions' },
    { '@type': 'WebPageElement', cssSelector: '#salary-components-explained',     name: 'Salary Components Explained' },
    { '@type': 'WebPageElement', cssSelector: '#income-tax-on-salary',            name: 'Income Tax on Salary' },
    { '@type': 'WebPageElement', cssSelector: '#fy-vs-ay',                        name: 'Financial Year vs Assessment Year' },
    { '@type': 'WebPageElement', cssSelector: '#tax-slabs',                       name: 'Income Tax Slabs for Salaried Employees' },
    { '@type': 'WebPageElement', cssSelector: '#marginal-relief',                 name: 'Marginal Relief Near the Rs 12 Lakh Threshold' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new-regime',               name: 'Old Regime vs New Regime Salary Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#gratuity-ctc',                    name: 'Gratuity in CTC' },
    { '@type': 'WebPageElement', cssSelector: '#8th-pay-commission',              name: '8th Pay Commission Salary' },
    { '@type': 'WebPageElement', cssSelector: '#different-ctc-slabs',             name: 'Salary Breakup for Different CTC Slabs' },
    { '@type': 'WebPageElement', cssSelector: '#common-salary-breakup',           name: 'Monthly In-Hand Salary Reference Table' },
    { '@type': 'WebPageElement', cssSelector: '#job-salary-india',                name: 'Salary Breakup by Job Role in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-read-payslip',             name: 'How to Read Your Payslip' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                      name: 'How to Use This In-Hand Salary Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#maximize-in-hand-salary',         name: 'How to Maximize In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#limitations',                     name: 'Limitations of In-Hand Salary Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                             name: 'Frequently Asked Questions' },
  ],
};

export default async function InHandSalaryPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <InHandSalaryCalculatorClient />
    </>
  );
}

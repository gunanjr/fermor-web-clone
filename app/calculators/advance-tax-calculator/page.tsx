import type { Metadata } from 'next';
import AdvanceTaxClient from './AdvanceTaxClient';

const PAGE_DATE_PUBLISHED = '2026-08-18';
const PAGE_DATE_MODIFIED = '2026-08-18';

export const metadata: Metadata = {
  title: 'Advance Tax Calculator: Calculate Quarterly Due Dates & Interest',
  description:
    'Free advance tax calculator for India FY 2025-26 & FY 2026-27. Compute quarterly due dates, Section 234B & 234C interest penalties, and TDS credits. Free to use.',
  keywords: [
    'advance tax calculator',
    'advance tax due dates',
    'section 234c interest calculator',
    'section 234b interest calculator',
    'advance tax schedule fy 2025 26',
    'advance tax calculator for salaried',
    'advance tax calculator self employed',
    'advance tax interest penalty calculation',
    'quarterly advance tax percentage',
    'advance tax limit 10000',
    'section 44ad advance tax due date',
    'income tax advance tax calculator india',
    'advance tax 15 june 15 sept 15 dec 15 march',
    'how to calculate advance tax',
    'advance tax penalty formula',
    'advance tax payment online challan 280',
    'tds credit advance tax calculation',
    'presumptive tax advance tax 100 percent',
    'senior citizen advance tax exemption',
    'income tax calculator',
    'advance tax liability calculator',
    'tds deduction advance tax shortfall',
    'corporate advance tax calculator',
    'freelancer advance tax calculator',
  ],
  openGraph: {
    title: 'Advance Tax Calculator: Quarterly Schedule & Section 234B/234C - Fermor',
    description:
      'Calculate quarterly advance tax installments (15%, 45%, 75%, 100%) and Section 234B/234C interest penalty in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/advance-tax-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-advance-tax-calculator.png', width: 1200, height: 630, alt: 'Fermor Advance Tax Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advance Tax Calculator - Fermor',
    description:
      'Compute quarterly advance tax due dates, installment amounts, and Section 234B/234C interest penalties in India. Free to use.',
    images: ['https://fermor.in/og-advance-tax-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/advance-tax-calculator',
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
    'Advance Tax India',
    'Section 208 Advance Tax Obligation',
    'Section 211 Quarterly Installment Percentages',
    'Section 234C Deferment Interest',
    'Section 234B Default Interest',
    'Presumptive Taxation Section 44AD',
    'Income Tax Act 1961',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Advance Tax Calculator', item: 'https://fermor.in/calculators/advance-tax-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is liable to pay Advance Tax in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 208 of the Income Tax Act, any taxpayer (salaried, self-employed, freelancer, business, or company) whose estimated net tax liability for the financial year after deducting TDS/TCS is Rs 10,000 or more must pay advance tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the quarterly advance tax due dates and percentage limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advance tax must be paid in 4 quarterly installments: 15% of estimated tax by 15th June, 45% cumulative by 15th September, 75% cumulative by 15th December, and 100% cumulative by 15th March. Taxpayers under presumptive scheme Section 44AD/44ADA pay 100% in a single installment by 15th March.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Section 234C interest penalty calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 234C levies simple interest at 1% per month for deferment of quarterly installments. Interest is charged on the shortfall between the required mandatory percentage and actual tax paid for 3 months each for Q1, Q2, and Q3, and for 1 month for Q4. No 234C interest applies if payment reaches 12% by June 15 or 36% by September 15.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Section 234B interest penalty calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 234B charges 1% per month simple interest if total advance tax paid before 31st March is less than 90% of assessed net tax liability. Interest is calculated from 1st April of the assessment year until the date of actual tax payment or ITR filing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are senior citizens exempt from advance tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Resident senior citizens aged 60 years or above who do not have any income from business or profession are fully exempt from paying advance tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do salaried employees need to pay advance tax?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Salaried employees generally do not need to pay advance tax if their employer deducts full TDS under Section 192. However, if a salaried employee has extra income from interest, capital gains, dividend, or rental income where TDS was not deducted, and net tax liability exceeds Rs 10,000, advance tax must be paid.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to pay advance tax online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advance tax can be paid online through the Income Tax e-filing portal (e-Pay Tax service) or net banking using Challan 280 (Minor Head 100: Advance Tax) under Assessment Year 2026-27 or FY 2025-26.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if capital gains occur after advance tax due dates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If unexpected capital gains or dividend income arise after the 15th June or 15th September due dates, no Section 234C interest penalty applies provided the taxpayer pays full advance tax on such capital gains in the remaining subsequent installments or by 31st March.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is advance tax paid credited during ITR filing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Advance tax payments reflect in Form 26AS and Annual Information Statement (AIS). During ITR filing, total advance tax paid is deducted from gross tax payable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can advance tax be paid after 15th March?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any tax paid on or before 31st March of the financial year is treated as advance tax. Payments made after 31st March are treated as self-assessment tax under Section 140A.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the penalty for not paying advance tax at all?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Failing to pay advance tax attracts interest under Section 234B (1% per month for overall shortfall under 90%) and Section 234C (1% per month for quarterly deferments), adding 3% to 12% in extra interest cost upon filing ITR.',
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
  name: 'Advance Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/advance-tax-calculator',
  description:
    'Calculate quarterly advance tax installments (15%, 45%, 75%, 100%), due dates, TDS credit deductions, and Section 234B and 234C interest penalties for India.',
  featureList: [
    'Quarterly Advance Tax Schedule (June 15, Sept 15, Dec 15, March 15)',
    'Section 234C Quarterly Deferment Interest Calculation',
    'Section 234B Overall Shortfall Interest Calculation',
    'Presumptive Scheme Section 44AD/44ADA Toggle',
    'Senior Citizen Exemption Check',
    'TDS and TCS Credit Deduction Offset',
    'Stacked Bar Chart Quarterly Payment Schedule Visualizer',
    'Multi-currency Support',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Advance Tax Due and Interest Penalty',
  description: 'Step-by-step guide to compute quarterly advance tax obligations and interest under Section 234B and 234C.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Advance Tax Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Annual Taxable Income & Deductions',
      text: 'Input estimated annual taxable income across salary, business/freelance profits, capital gains, and interest income.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Input Total Tax Liability & TDS Credit',
      text: 'Enter gross estimated tax liability and subtract total TDS/TCS deducted by employer, clients, or banks.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Input Actual Paid Installments',
      text: 'Enter amounts paid in Q1, Q2, Q3, and Q4 advance tax challans.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Analyze Quarterly Schedule & Interest Penalties',
      text: 'Review quarterly installment due dates, mandatory targets, Section 234C quarterly deferment interest, and Section 234B default interest.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Advance Tax',
  alternateName: 'Pay As You Earn Tax',
  description:
    'Income tax paid in advance in quarterly installments during the financial year in which income is earned, rather than in a lump sum at the end of the year.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Income Tax Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Advance_tax',
    'https://www.wikidata.org/wiki/Q112845512',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Advance Tax Calculator: Calculate Quarterly Due Dates & Interest',
  description:
    'Free advance tax calculator for India FY 2025-26 & FY 2026-27. Compute quarterly due dates, Section 234B & 234C interest penalties, and TDS credits. Free to use.',
  url: 'https://fermor.in/calculators/advance-tax-calculator',
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
    { '@type': 'DefinedTerm', name: 'Advance Tax' },
    { '@type': 'DefinedTerm', name: 'Section 234C' },
    { '@type': 'DefinedTerm', name: 'Section 234B' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, freelancers, self-employed professionals, corporate accountants, CAs',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-advance-tax', name: 'What Is Advance Tax' },
    { '@type': 'WebPageElement', cssSelector: '#due-dates-table', name: 'Quarterly Due Dates and Percentages Table' },
    { '@type': 'WebPageElement', cssSelector: '#section-234c-formula', name: 'Section 234C Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#section-234b-formula', name: 'Section 234B Interest Formula' },
    { '@type': 'WebPageElement', cssSelector: '#taxpayers-comparison', name: 'Salaried vs Freelancer vs Presumptive Taxpayers' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function AdvanceTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AdvanceTaxClient />
    </>
  );
}

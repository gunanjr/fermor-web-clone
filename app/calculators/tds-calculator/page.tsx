import type { Metadata } from 'next';
import TDSCalculatorClient from './TDSCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/tds-calculator`;

  return {
    title: 'TDS Calculator: Tax Deducted at Source Calculator',
    description:
      'Free TDS calculator for India. Calculate TDS rates and deductions for salary, professional fees, rent, commission, and contractor payments under latest tax laws. Free to use.',
    keywords: [
      'tds calculator',
      'tax deducted at source calculator',
      'calculate tds online',
      'tds rate calculator',
      'tds on salary calculator',
      'tds on professional fees calculator',
      'tds on rent calculator',
      'tds section 194j calculator',
      'tds section 194c calculator',
      'tds rate chart fy 2026-27',
      'how to calculate tds in excel',
      'tds without pan calculator',
      'section 194ia tds calculator',
      'tds refund calculator',
      'form 26as tds check',
      'tds return filing calendar',
      'individual tds rates',
      'tds rate domestic company',
      'online tds deduction tool',
      'nri tds calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'TDS Calculator: Tax Deducted at Source Calculator',
      description:
        'Calculate TDS rates and deductions for salary, rent, contractors, and professional fees. Free for Indian taxpayers.',
      images: ['https://fermor.in/og-tds-calculator.png'],
    },
    openGraph: {
      title: 'TDS Calculator: Tax Deducted at Source Calculator - Fermor',
      description:
        'Check TDS sections and compute precise deductions based on PAN status, payment type, and payee category. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/tds-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-tds-calculator.png', width: 1200, height: 630, alt: 'Fermor TDS Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-10';
const PAGE_DATE_MODIFIED = '2026-07-29';

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
  description: 'Fermor is building the automated financial action layer for India. The system that closes the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Tax Deducted at Source',
    'TDS Sections',
    'TDS Return Filing',
    'Form 26AS',
    'Form 16',
    'Income Tax Act India',
    'Section 192',
    'Section 194J',
    'Section 194C',
    'Section 194I',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'TDS Calculator', item: 'https://fermor.in/calculators/tds-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is TDS (Tax Deducted at Source)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TDS (Tax Deducted at Source) is a system introduced by the Income Tax Department where the person making specified payments (like salary, rent, commission, professional fees, interest) deducts tax at the source before transferring the remaining balance to the payee. The deducted tax is directly deposited with the government on behalf of the payee.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the common TDS sections and rates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common TDS sections include: Section 192 for salary (slab rates), Section 194C for contractors (1% for individuals, 2% for companies), Section 194J for professional fees (10% or 2%), Section 194I for rent on land/building (10%), and Section 194A for interest other than securities (10%).',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to TDS if PAN is not provided?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 206AA, if the payee does not provide their Permanent Account Number (PAN) to the deductor, TDS is deducted at a much higher penalty rate, which is typically a flat 20% (or the rate specified in the Act, whichever is higher).',
      },
    },
    {
      '@type': 'Question',
      name: 'How is TDS on salary calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TDS on salary (under Section 192) is calculated by estimating the employee\'s total taxable annual income after considering applicable exemptions (like HRA, LTA) and deductions (like Section 80C, 80D). The annual tax liability is computed using the active tax slabs and divided by 12 to deduct tax monthly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I claim a refund for excess TDS deducted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the total TDS deducted is higher than your actual annual income tax liability, you can claim a refund from the Income Tax Department by filing your annual Income Tax Return (ITR). Once verified, the department will refund the excess tax with interest to your pre-validated bank account.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Form 26AS and how is it related to TDS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Form 26AS is a consolidated annual tax statement generated by the Income Tax Department. It shows all TDS credits, tax collected at source (TCS), advance tax paid, and self-assessment tax deposited against your PAN. Payees should verify that all TDS entries in Form 26AS match their transaction receipts before filing ITR.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the due dates for filing TDS returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TDS returns must be filed quarterly by the deductor: Q1 (April to June) due by July 31st, Q2 (July to September) due by October 31st, Q3 (October to December) due by January 31st, and Q4 (January to March) due by May 31st.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is TDS applicable on rent payments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under Section 194I, any payer other than an individual or HUF exempt from tax audit must deduct TDS at 10% (land, building, furniture) or 2% (plant, machinery, equipment) once monthly rent exceeds Rs 50,000, a threshold Budget 2025 raised from the earlier annual test of Rs 2,40,000. Individuals and HUFs not subject to tax audit instead fall under Section 194-IB, which requires 2% TDS (reduced from 5% effective October 1, 2024) once monthly rent exceeds Rs 50,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Section 194J TDS rate for professional fees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 194J, TDS is deducted at 10% on professional fees, technical fees, royalties, or non-compete fees. A concessionary rate of 2% applies to technical fees, call center operations, or royalty payments in the nature of cinematographic films.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Section 194C TDS rate for contractors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 194C, TDS on contractor payments is deducted at 1% if the payee is an individual or HUF, and at 2% if the payee is a partnership firm, LLP, company, or local authority. Surcharge and cess do not apply to payments made to residents.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'TDS Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/tds-calculator',
  description: 'Calculate Tax Deducted at Source (TDS) amounts, base rates, and net payouts under different sections of the Income Tax Act in India.',
  featureList: [
    'Support for Section 194J, 194C, 194I, 194A, 194H, and 192',
    'PAN status toggle (Standard vs 20% penalty rate)',
    'Payee category support (Individual vs Corporate rates)',
    'Detailed TDS vs Net Payout breakdown',
    'Donut chart representation',
    'Quarterly filing reminders and table charts',
    'Multi-currency support',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tax Deducted at Source (TDS)',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor TDS Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select payment section',
      text: 'Choose the relevant section of the Income Tax Act corresponding to your payment type (e.g., Professional Fees, Contractor, Rent).',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter gross payment amount',
      text: 'Specify the total gross bill or invoice amount before deducting TDS.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Toggle PAN availability',
      text: 'Indicate whether the payee has provided a valid PAN card, as missing PAN triggers a 20% penalty deduction rate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review TDS and Payout',
      text: 'See the exact TDS amount deducted and the net payable payout to the payee.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'TDS',
  alternateName: 'Tax Deducted at Source',
  description: 'An income tax deduction mechanism where the payer deducts a small percentage of tax at the source of transaction on behalf of the payee.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Tax Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Tax_Deducted_at_Source',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'TDS Calculator: Tax Deducted at Source Calculator',
  url: 'https://fermor.in/calculators/tds-calculator',
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
    { '@type': 'DefinedTerm', name: 'TDS', alternateName: 'Tax Deducted at Source' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian business owners, self-employed professionals, contractors, landlords, CAs',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-tds', name: 'What Is TDS?' },
    { '@type': 'WebPageElement', cssSelector: '#tds-sections', name: 'TDS Rates and Sections Chart' },
    { '@type': 'WebPageElement', cssSelector: '#missing-pan', name: 'Impact of Missing PAN: Section 206AA' },
    { '@type': 'WebPageElement', cssSelector: '#payout-math', name: 'TDS Payout Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#salary-tds', name: 'How TDS is Calculated on Salary' },
    { '@type': 'WebPageElement', cssSelector: '#quarterly-returns', name: 'TDS Return Due Dates' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use the TDS Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function TDSCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <TDSCalculatorClient />
    </>
  );
}

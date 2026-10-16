import type { Metadata } from 'next';
import LeaveEncashmentTaxCalculatorClient from './LeaveEncashmentTaxCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/leave-encashment-tax-calculator`;
  return {
    title: 'Leave Encashment Tax Calculator: Section 10(10AA) Exemption',
    description:
      'Free leave encashment tax calculator for India. Calculate tax exemption on accumulated leaves under Section 10(10AA) with the Rs 25 lakh cap. Free to use.',
    keywords: [
      'leave encashment tax calculator',
      'leave encashment calculator',
      'leave encashment exemption calculator',
      'section 10 10aa exemption calculator',
      'calculate leave encashment tax exemption',
      'leave encashment limit calculator',
      'statutory leave encashment limit 25 lakh',
      'earned leave encashment calculator',
      'retirement leave encashment tax exemption',
      'leave encashment taxability private employee',
      'how to calculate taxable leave encashment',
      '10 months average salary leave encashment',
      'leave encashment calculator excel',
      'tax on leave encashment resignation',
      'government employee leave encashment tax exemption',
      'leave balance encashment rules',
      'new tax regime leave encashment exemption',
      'nri leave encashment tax calculator',
      'leave encashment formula and calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Leave Encashment Tax Calculator: Section 10(10AA) Exemption',
      description:
        'Calculate your Section 10(10AA) leave encashment tax exemption with the Rs 25 lakh limit. Supports private and government sectors. Free to use.',
      images: ['https://fermor.in/og-leave-encashment-tax-calculator.png'],
    },
    openGraph: {
      title: 'Leave Encashment Tax Calculator: Section 10(10AA) Exemption',
      description:
        'Free leave encashment tax calculator for India. Calculate exemption under Section 10(10AA), verify the Rs 25 lakh statutory limit, and see tax slab details. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/leave-encashment-tax-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-leave-encashment-tax-calculator.png', width: 1200, height: 630, alt: 'Fermor Leave Encashment Tax Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-07';
const PAGE_DATE_PUBLISHED = '2026-07-07';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what to do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions.',
  knowsAbout: [
    'Leave Encashment Exemption',
    'Section 10(10AA)',
    'Income Tax Act 1961',
    'Old Tax Regime',
    'New Tax Regime',
    'Retirement Planning India',
    'Tax Optimization',
    'Chartered Accountants India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is leave encashment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leave encashment is a lump-sum amount paid by employers to employees in exchange for their unused accumulated leaves, paid either during service, at retirement, or upon resignation. Tax treatment depends on when it is received and the sector of the employee.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax exemption limit for leave encashment at retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For private sector employees, the maximum tax-free limit under Section 10(10AA) is Rs 25 lakh (increased from Rs 3 lakh in Budget 2023). For government employees, leave encashment received at retirement is 100% tax-free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is leave encashment received during service tax-exempt?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Any leave encashment received while you are still actively employed with the company is fully taxable under your regular income tax slabs for both private and government employees. Exemption applies only at retirement or resignation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the leave cap limit per year under Section 10(10AA)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the income tax rules, leave entitlement is capped at 30 days per completed year of service. If your employer provides 40 days of leave per year, the exemption calculation must still cap your total earned leaves at 30 days per year of service.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the cash equivalent of leave balance calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cash equivalent equals the capped leave balance (in days) divided by 30, multiplied by the average monthly salary of the last 10 months. For tax exemption purposes, the leave balance must be computed using the 30-day annual cap limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What elements are included in the average monthly salary for leave encashment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Salary for Section 10(10AA) includes basic salary, dearness allowance (DA) if it forms part of retirement benefits, and commission based on a fixed percentage of turnover. Other allowances are excluded.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim leave encashment exemption under the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The leave encashment tax exemption under Section 10(10AA) is one of the few deductions retained under the new tax regime. Both regimes provide this exemption for private and government employees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum statutory limit for private employees in FY 2026-27?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The statutory limit is Rs 25,00,000. This limit applies to the lifetime total leave encashment exemptions claimed by a private sector employee across all employers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is leave encashment taxable on resignation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leave encashment received upon resignation is treated the same as retirement under Section 10(10AA). Private employees can claim exemption up to the least of the four limits, capped at Rs 25 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the calculator compute the capped leave balance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The calculator computes total leaves earned based on the completed years of service capped at 30 days per year. It then subtracts leaves taken (deduced from your actual leave balance vs leaves allowed) to find the capped leave balance.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Leave Encashment Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/leave-encashment-tax-calculator',
  description: 'Calculate leave encashment tax exemption at retirement or resignation under Section 10(10AA) with the Rs 25 lakh statutory limit and progressive slabs.',
  featureList: ['Section 10(10AA) four-point limit evaluation', 'Government vs private sector mode', 'Capped leave entitlement calculator', 'Donut chart analysis', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Leave Encashment Tax Exemption',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Leave Encashment Tax Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select employee type', text: 'Select private sector or government. Government employees receive automatic full exemption.' },
    { '@type': 'HowToStep', position: 2, name: 'Input leave encashment received', text: 'Enter the total leave encashment amount paid by your employer.' },
    { '@type': 'HowToStep', position: 3, name: 'Input average monthly salary', text: 'Enter the average monthly basic + DA salary of the last 10 months.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter service and leave balance details', text: 'Enter completed years of service, your actual leave balance, and the annual leave limit allowed by your employer.' },
    { '@type': 'HowToStep', position: 5, name: 'Review tax-exempt and taxable amounts', text: 'Review the tax-free exempt amount, the taxable portion, and the estimated tax savings.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Leave Encashment',
  alternateName: 'Privilege Leave Encashment',
  description: 'Compensation paid by employers for unused accumulated leaves, qualifying for tax exemption under Section 10(10AA) of the Income Tax Act, 1961.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Taxation Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Leave_encashment'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Leave Encashment Tax Calculator', item: 'https://fermor.in/calculators/leave-encashment-tax-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Leave Encashment Tax Calculator: Section 10(10AA) Exemption',
  url: 'https://fermor.in/calculators/leave-encashment-tax-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Leave Encashment', alternateName: 'Privilege Leave Encashment' }],
  audience: { '@type': 'Audience', audienceType: 'Private Employees, Government Employees, Retirees, Chartered Accountants, HR Specialists', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-leave-encashment', name: 'What Is a Leave Encashment Tax Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#tax-treatment', name: 'Tax Treatment of Leave Encashment: Government vs Private Employees' },
    { '@type': 'WebPageElement', cssSelector: '#leave-entirement', name: 'Capped Annual Leave Entitlement Under Section 10(10AA)' },
    { '@type': 'WebPageElement', cssSelector: '#average-salary', name: 'Understanding the 10-Month Average Salary Capping' },
    { '@type': 'WebPageElement', cssSelector: '#statutory-limit', name: 'The Lifetime Statutory Exemption Cap of Rs 25 Lakh' },
    { '@type': 'WebPageElement', cssSelector: '#active-service', name: 'Taxability of Leave Encashment During Active Service' },
    { '@type': 'WebPageElement', cssSelector: '#resignation-vs-retirement', name: 'Leave Encashment Rules for Resignations vs Retirements' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regimes', name: 'Tax Exemption Under Old and New Tax Regimes' },
    { '@type': 'WebPageElement', cssSelector: '#capping-rules-table', name: 'In-Context Detailed Table of Section 10(10AA) Capping Rules' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required', name: 'Documents and Proofs Required for Section 10(10AA) Claims' },
    { '@type': 'WebPageElement', cssSelector: '#maximize-exemption', name: 'How to Maximize Your Tax-Free Leave Encashment Payout' },
    { '@type': 'WebPageElement', cssSelector: '#encashment-vs-gratuity', name: 'Difference Between Leave Encashment and Gratuity Exemptions' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use the Leave Encashment Tax Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LeaveEncashmentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <LeaveEncashmentTaxCalculatorClient />
    </>
  );
}

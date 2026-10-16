import type { Metadata } from 'next';
import LTACalculatorClient from './LTACalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/lta-calculator`;
  return {
    title: 'LTA Calculator: Leave Travel Allowance Exemption Calculator',
    description:
      'Free LTA calculator for India. Calculate your Leave Travel Allowance tax exemption under Section 10(5) for air, rail, or bus travel. Free to use.',
    keywords: [
      'lta calculator',
      'leave travel allowance calculator',
      'lta tax exemption calculator',
      'section 10 5 exemption calculator',
      'calculate lta tax exemption',
      'lta exemption limit calculator',
      'lta carry forward rules',
      'lta tax calculator india',
      'lta travel allowance calculator',
      'lta exemption calculation',
      'leave travel allowance exemption calculation',
      'lta air travel rules',
      'lta fare limit rules',
      'lta calculator excel',
      'lta block years calculator',
      'section 10 5 rules',
      'family definition for lta',
      'lta exemption block years',
      'nri lta tax calculator',
      'professional lta calculator',
      'lta tax calculator',
      'lta calculator online',
      'lta exemption calculator',
      'lta calculator for fy 2020 21',
      'lta calculator for fy 2021 22',
      'lifetime allowance calculator hmrc',
      'hmrc lifetime allowance calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'LTA Calculator: Leave Travel Allowance Exemption Calculator',
      description:
        'Calculate your Section 10(5) LTA tax exemption for travel within India. Checks air, rail, and bus fare limits. Free to use.',
      images: ['https://fermor.in/og-lta-calculator.png'],
    },
    openGraph: {
      title: 'LTA Calculator: Leave Travel Allowance Exemption Calculator',
      description:
        'Free Leave Travel Allowance calculator for India. Calculate LTA tax exemption under Section 10(5), check class limits, and view carry forward rules. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/lta-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-lta-calculator.png', width: 1200, height: 630, alt: 'Fermor LTA Calculator' }],
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
    'Leave Travel Allowance',
    'LTA Exemption',
    'Section 10(5) Exemption',
    'Income Tax Act 1961',
    'Old Tax Regime',
    'Tax Planning India',
    'Sal salaried employee deductions',
    'CAs India',
    'Financial blueprints',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Leave Travel Allowance (LTA)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Leave Travel Allowance (LTA) is an allowance paid by employers to employees to cover travel expenses incurred while on leave with family within India. It qualifies for a tax exemption under Section 10(5) of the Income Tax Act. The exemption is only available under the old tax regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum tax exemption under Section 10(5)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum tax exemption is the actual cost of air, rail, or public transport tickets incurred by the employee for themselves and their family by the shortest route. Exemption is capped at the lower of the actual ticket expenses, the LTA component received, or the class-specific fare limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the travel class restrictions for LTA exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Travel class limits apply: for air travel, only economy class fare of the national carrier is exempt; for rail, AC First Class fare is exempt; for other recognized public transport, first class or deluxe class fare qualifies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many times can I claim LTA tax exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LTA tax exemption can be claimed for only 2 journeys in a block of 4 calendar years. The current block is 2022-2025, and the next block is 2026-2029. If you do not claim LTA in a block, you can carry forward 1 journey to the first year of the next block.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is considered family for LTA exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Family includes your spouse, up to two children (born on or after October 1, 1998, with exceptions for twins/multiple births), and parents, brothers, or sisters who are wholly or mainly dependent on you.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim LTA exemption under the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. LTA exemption is completely scrapped under the new tax regime. You can only claim this exemption if you stay in the old tax regime and have LTA as a component in your CTC.',
      },
    },
    {
      '@type': 'Question',
      name: 'What expenses are excluded from LTA exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only travel fare (air, train, or bus tickets) is eligible for exemption. Expenses for hotel stays, local sightseeing, meals, taxi fares, or other incidental expenses are completely excluded and remain taxable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I carry forward an unclaimed LTA journey?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you have not claimed LTA for one or both journeys in a 4-year block, you can carry forward one journey to the next block. However, you must perform the carry-over journey in the first calendar year of the new block.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is international travel eligible for LTA tax exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Section 10(5) restricts LTA exemption to travel within the geographical boundaries of India. The origin, destination, and transit of the journey must all be within India.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to submit physical bills to claim LTA exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Employers are required by the Income Tax Department to collect and verify proof of travel (such as boarding passes, air tickets, or train tickets) before granting the LTA exemption. Keep all original tickets safely.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LTA Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/lta-calculator',
  description: 'Calculate your Leave Travel Allowance (LTA) tax exemption under Section 10(5) based on travel fare, class limits, LTA allowance, and income tax slab under the old regime.',
  featureList: ['Section 10(5) fare limit validation', 'Air, rail, and public transport modes', 'Tax savings estimation', 'Donut chart visualization', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate LTA Tax Exemption',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor LTA Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your annual salary', text: 'Enter your gross annual salary to estimate your marginal tax bracket.' },
    { '@type': 'HowToStep', position: 2, name: 'Input LTA component', text: 'Enter the annual LTA component designated in your salary package (CTC).' },
    { '@type': 'HowToStep', position: 3, name: 'Input travel expenses', text: 'Enter the actual ticket fare spent on eligible journeys within India.' },
    { '@type': 'HowToStep', position: 4, name: 'Select travel mode and block limit', text: 'Choose the transport mode and verify that the journey fits within the 2-journey limit per 4-year block.' },
    { '@type': 'HowToStep', position: 5, name: 'Review your exemption and tax saved', text: 'Review the tax-exempt amount, the taxable LTA balance, and your calculated tax savings.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'LTA',
  alternateName: 'Leave Travel Allowance',
  description: 'An allowance paid to salaried employees in India to cover travel expenses while on leave, qualifying for tax exemption under Section 10(5) of the Income Tax Act.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Taxation Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Leave_Travel_Allowance'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'LTA Calculator', item: 'https://fermor.in/calculators/lta-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'LTA Calculator: Leave Travel Allowance Exemption Calculator',
  url: 'https://fermor.in/calculators/lta-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'LTA', alternateName: 'Leave Travel Allowance' }],
  audience: { '@type': 'Audience', audienceType: 'Salaried Employees, Indian Taxpayers, HR Managers, Chartered Accountants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-lta', name: 'What Is an LTA Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#lta-exemption-rules', name: 'Section 10(5) LTA Exemption Rules and Limitations' },
    { '@type': 'WebPageElement', cssSelector: '#travel-class-limitations', name: 'Travel Class Limitations for LTA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#how-calculator-works', name: 'How the LTA Exemption Calculator Works' },
    { '@type': 'WebPageElement', cssSelector: '#carry-forward', name: 'Carry Forward of Unclaimed LTA Journey' },
    { '@type': 'WebPageElement', cssSelector: '#family-rules', name: 'LTA Rules for Family Members and Dependents' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new', name: 'LTA Exemption in Old vs New Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#fy-comparison', name: 'LTA Calculator for FY 2020-21 vs FY 2021-22' },
    { '@type': 'WebPageElement', cssSelector: '#lta-vs-hmrc', name: 'Difference Between Indian LTA and HMRC Lifetime Allowance' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required', name: 'Documents and Proofs Required for LTA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#block-years', name: 'Eligible Journeys and Block Years (2022-2025 and 2026-2029)' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes When Claiming LTA Exemption' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This LTA Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LTACalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <LTACalculatorClient />
    </>
  );
}

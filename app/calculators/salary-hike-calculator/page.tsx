import type { Metadata } from 'next';
import SalaryHikeCalculatorClient from './SalaryHikeCalculatorClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/salary-hike-calculator`;
  return {
    title: 'Salary Hike Calculator: New Salary & Hike %',
    description:
      'Free salary hike calculator for India. Find your new salary from a hike percentage, or the exact hike percentage from your old and new salary. Free to use.',
    keywords: [
      'salary hike calculator',
      'salary increment calculator',
      'salary hike percentage calculator',
      'new salary after hike calculator',
      'salary increase calculator',
      'salary increase calculator with current and new salary',
      'how to calculate salary hike',
      'how to calculate salary hike percentage',
      'how to calculate new salary after hike',
      'salary hike calculation formula',
      'salary increment percentage formula',
      'appraisal calculator',
      'promotion calculator',
      'salary percentage increase',
      'hike percentage calculator',
      'real salary growth',
      'inflation adjusted salary',
      'salary calculator india',
      'ctc hike calculator',
      'monthly increase calculator',
      'average salary hike in india',
      'revised salary calculator',
      'increment percentage calculator'
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Salary Hike Calculator - New Salary & Hike % - Fermor',
      description:
        'Estimate your revised salary, monthly increase, and real inflation-adjusted growth after an appraisal or promotion.',
      images: ['https://fermor.in/og-salary-hike-calculator.png'],
    },
    openGraph: {
      title: 'Salary Hike Calculator - New Salary & Hike % - Fermor',
      description:
        'Estimate your revised salary, monthly increase, annual increase, and real percentage growth after an appraisal or promotion. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/salary-hike-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-salary-hike-calculator.png', width: 1200, height: 630, alt: 'Fermor Salary Hike Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = new Date().toISOString().split('T')[0];
const PAGE_DATE_PUBLISHED = new Date().toISOString().split('T')[0];

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
  description: 'Fermor is building the automated financial action layer for India - the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Salary Appraisals',
    'Salary Hike Calculation',
    'Inflation Adjusted Growth',
    'Real Salary Growth',
    'Personal Finance India',
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
  name: 'Salary Hike Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/salary-hike-calculator',
  description: 'Calculate your new salary from a hike percentage or amount, or find the exact hike percentage from your old and new salary. Includes monthly increase and real inflation-adjusted growth. Free, browser-based, no sign-up required to use the calculator.',
  featureList: [
    'New Salary from Hike Percentage or Fixed Amount',
    'Reverse Mode: Hike Percentage from Old and New Salary',
    'Donut Chart of Original Salary vs Hike Amount',
    'Multi-Year Salary Growth Projection with Chart and Table',
    'Monthly Increase Calculation',
    'Real Growth (Inflation Adjusted) Calculation',
    'Salary Hike Matrix',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Salary Hike Calculator', item: 'https://fermor.in/calculators/salary-hike-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Salary Hike',
  description: 'Step-by-step guide to calculating your new salary and actual growth after an increment.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Salary Hike Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your Current Salary',
      text: 'Input your current annual CTC or gross salary into the calculator.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose a Calculation Mode',
      text: 'Use "By % Hike" or "By Fixed Amount" to find your new salary, or "By New Salary" to work out the exact hike percentage from an offer or appraisal letter.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Adjust for Inflation (Optional)',
      text: 'Enter the current inflation rate in the advanced settings to see your real purchasing power growth.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the Results',
      text: 'Check the new annual salary, the monthly increase amount, and the inflation-adjusted real growth.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Salary Hike',
  alternateName: 'Salary Increment',
  description: 'The percentage or fixed amount by which an employee\'s compensation increases during an appraisal or job change.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Wage',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Salary Hike Calculator – New Salary and Hike Percentage',
  description: 'Calculate revised salary, monthly increase, and percentage growth from a hike, or work out the exact hike percentage from an old and new salary, with inflation-adjusted real growth.',
  url: 'https://fermor.in/calculators/salary-hike-calculator',
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
    { '@type': 'DefinedTerm', name: 'Salary Hike', alternateName: 'Salary Increment' },
    { '@type': 'DefinedTerm', name: 'Real Salary Growth' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian professionals, salaried employees, job seekers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-salary-hike',  name: 'What Is a Salary Hike?' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-use',          name: 'When to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#salary-hike-formula',  name: 'Salary Hike Formula: New Salary and Hike Percentage' },
    { '@type': 'WebPageElement', cssSelector: '#partial-year-hike',    name: 'Partial-Year and Mid-Cycle Hikes' },
    { '@type': 'WebPageElement', cssSelector: '#salary-hike-excel',    name: 'Salary Hike Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#hike-impact-breakdown', name: 'How a Salary Hike Actually Reaches Your Bank Account' },
    { '@type': 'WebPageElement', cssSelector: '#epf-wage-ceiling-hike', name: 'Does a Hike Always Increase Your PF Contribution?' },
    { '@type': 'WebPageElement', cssSelector: '#good-salary-hike',     name: 'What Is a Good Salary Hike in India?' },
    { '@type': 'WebPageElement', cssSelector: '#how-companies-decide', name: 'How Companies Decide Your Salary Hike' },
    { '@type': 'WebPageElement', cssSelector: '#appraisal-cycles',     name: 'Appraisal Cycles in India: When Companies Give Hikes' },
    { '@type': 'WebPageElement', cssSelector: '#da-vs-private-hike',   name: 'Dearness Allowance vs a Private-Sector Salary Hike' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-growth',     name: 'Inflation and Real Salary Growth' },
    { '@type': 'WebPageElement', cssSelector: '#switch-vs-stay',       name: 'Job Switch vs Staying: A Multi-Year Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes',      name: 'Common Mistakes When Calculating a Salary Hike' },
    { '@type': 'WebPageElement', cssSelector: '#reading-increment-letter', name: 'How to Read Your Increment or Offer Letter' },
    { '@type': 'WebPageElement', cssSelector: '#salary-negotiation',   name: 'Tips for Negotiating a Salary Hike' },
    { '@type': 'WebPageElement', cssSelector: '#compa-ratio-example',  name: 'Using Compa-Ratio to Argue for a Bigger Hike' },
    { '@type': 'WebPageElement', cssSelector: '#raise-ask-script',     name: 'How to Ask for a Raise: A Sample Script' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',        name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-calculate',     name: 'How to Use This Salary Hike Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#salary-hike-matrix',   name: 'Salary Hike Examples by CTC Level' },
    { '@type': 'WebPageElement', cssSelector: '#salary-hike-glossary', name: 'Salary Hike Glossary: Key Terms Explained' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                  name: 'Frequently Asked Questions' },
  ],
};

export default async function SalaryHikeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <SalaryHikeCalculatorClient />
    </>
  );
}



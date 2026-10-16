import type { Metadata } from 'next';
import PercentageCalculatorClient from './PercentageCalculatorClient';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'calculators' : region;
  const canonical = `https://fermor.in/${canonicalPath}/percentage-calculator`;
  return {
    title: 'Percentage Calculator: Find Percent, Change, Difference',
    description:
      'Free percentage calculator for India. Calculate percentage of a number, percentage change, reverse percentage, percentage difference. Instant results. Free to use.',
    keywords: [
      'percentage calculator',
      'percentage calculator online',
      'percentage change calculator',
      'percentage difference calculator',
      'reverse percentage calculator',
      'calculate percentage of a number',
      'percent increase calculator',
      'what percent of calculator',
      'percentage formula',
      'percentage calculator india',
      'find percentage',
      'percentage increase decrease calculator',
      ' gst percentage calculator',
      'discount percentage calculator',
      'markup percentage calculator',
      'percentage point difference',
      'compound percentage calculator',
      'percentage calculator excel',
      'online percentage tool',
      'quick percentage calculator',
      'percentage calculator for students',
      'emission percentage calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Percentage Calculator: Find Percent, Change, Difference',
      description:
        'Calculate percentage of a number, percentage change, reverse percentage, percentage difference. Instant results. Free for India.',
      images: ['https://fermor.in/og-percentage-calculator.png'],
    },
    openGraph: {
      title: 'Percentage Calculator: 7-in-1 Percent, Change, Difference Calculator',
      description:
        'Calculate percentage of a number, percentage change, reverse percentage, percentage difference, and more. Instant results with interactive inputs. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/percentage-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-percentage-calculator.png', width: 1200, height: 630, alt: 'Fermor Percentage Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-16';
const PAGE_DATE_PUBLISHED = '2026-07-16';

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
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Percentage Calculations',
    'Percentage Change',
    'Percentage Difference',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'GST Calculations',
    'Investment Returns',
    'Financial Planning India',
    'NRI Investments',
    'Tax Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you calculate a percentage of a number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply the number by the percentage and divide by 100. For example, 15% of 200 = (15 x 200) / 100 = 30. In decimal form: 0.15 x 200 = 30.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you find what percent one number is of another?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the part by the whole and multiply by 100. For example, 30 out of 200 = (30 / 200) x 100 = 15%. This is the most common percentage calculation in everyday use.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate percentage increase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Percentage increase = ((New Value - Original Value) / Original Value) x 100. For example, if your salary goes from 50,000 to 60,000: ((60,000 - 50,000) / 50,000) x 100 = 20% increase.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate percentage decrease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Percentage decrease = ((Original Value - New Value) / Original Value) x 100. For example, if a stock falls from 1,200 to 960: ((1,200 - 960) / 1,200) x 100 = 20% decrease.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between percentage change and percentage difference?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Percentage change measures growth or decline relative to a starting value: ((New - Old) / Old) x 100. Percentage difference measures the gap relative to the average of two values: |V1 - V2| / ((V1 + V2)/2) x 100. Change is directional (up or down); difference is symmetric (same result regardless of order).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you reverse a percentage increase to find the original value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the new value by (1 + percentage/100). For example, if 250 is 25% more than the original: 250 / 1.25 = 200. The original value was 200 before the 25% increase.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is percentage used in Indian GST calculations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GST rates in India are 5%, 12%, 18%, or 28%. To find GST on a product priced at 1,000 at 18% GST: 1,000 x 0.18 = 180. Total price = 1,000 + 180 = 1,180. To find the pre-GST price from a GST-inclusive amount: 1,180 / 1.18 = 1,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate discount percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Discount % = ((Original Price - Sale Price) / Original Price) x 100. For example, a shirt marked 2,000 sold for 1,400: ((2,000 - 1,400) / 2,000) x 100 = 30% discount.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is percentage point vs percent difference?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A percentage point is the arithmetic difference between two percentages. If a mutual fund returned 12% last year and 15% this year, the return increased by 3 percentage points (not 3%). The percentage increase in the return itself is ((15 - 12) / 12) x 100 = 25%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate CAGR using percentages?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CAGR is a special type of percentage calculation that measures annualised growth: CAGR = ((Final Value / Initial Value)^(1/n) - 1) x 100, where n is the number of years. Use the CAGR Calculator for this computation, or the XIRR Calculator for SIPs with multiple cash flows.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate percentage from a fraction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Multiply the fraction by 100. For example, 3/4 = 0.75 x 100 = 75%. To convert a percentage to a fraction: divide by 100 and simplify. 45% = 45/100 = 9/20. This conversion is useful for comparing exam scores, understanding investment ratios, and reading financial statements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a percentage be negative or greater than 100%?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, both are mathematically valid. A negative percentage represents a decrease (a portfolio down 12% for the year), and a percentage over 100% simply means the new value is more than double the original (a stock up 150% has tripled). Neither case breaks the standard percentage formula, it only changes how the result should be read in context.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do you calculate a percentage of a percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Convert both percentages to decimals and multiply them, then convert back to a percentage. For example, 20% of 50% is 0.20 x 0.50 = 0.10, or 10%. This comes up when applying a discount on top of an already-discounted price, or calculating an effective tax rate after multiple deductions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a weighted average percentage?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A weighted average percentage accounts for the size of each component, not just its individual rate. For a portfolio with 60% in an asset returning 10% and 40% in an asset returning 4%, the weighted average return is (0.60 x 10%) + (0.40 x 4%) = 7.6%, not the simple average of 7%. This is the correct way to combine returns, interest rates, or scores across unequal-sized groups.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Percentage Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/percentage-calculator',
  description: 'Calculate percentage of a number, percentage change, reverse percentage, percentage difference, and more. Instant results with interactive inputs. Free for India.',
  featureList: [
    'Percentage of a Number',
    'What Percent Is This',
    'Find the Whole',
    'Increase by a Percentage',
    'Reverse a Percentage',
    'Percentage Difference',
    'Percentage Change',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Percentage Calculator', item: 'https://fermor.in/calculators/percentage-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Percentage',
  description: 'Step-by-step guide to calculate percentage, percentage change, and percentage difference.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Percentage Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select the percentage operation',
      text: 'Choose what you need: find a percentage of a number, calculate percentage change between two values, or reverse a percentage to find the original.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter your values',
      text: 'Type or use the sliders to input the relevant numbers. For percentage change, enter both the original and new values.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Read the result',
      text: 'The percentage is calculated instantly. The result shows the percentage value, along with a visual breakdown of the split.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Use the currency selector if needed',
      text: 'Switch between INR, USD, EUR, and other currencies to see amounts in your preferred currency. Useful for NRI investors.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Percentage',
  alternateName: 'Percent',
  description: 'A ratio expressed as a fraction of 100, denoted by the % symbol, used to express proportional relationships across finance, commerce, and statistics.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Percentage',
    'https://www.wikidata.org/wiki/Q11229',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Percentage Calculator: Find Percent, Change, Difference',
  description: 'Free percentage calculator for India. Calculate percentage of a number, percentage change, reverse percentage, percentage difference. Instant results.',
  url: 'https://fermor.in/calculators/percentage-calculator',
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
    { '@type': 'DefinedTerm', name: 'Percentage', alternateName: 'Percent' },
    { '@type': 'DefinedTerm', name: 'Percentage Change' },
    { '@type': 'DefinedTerm', name: 'Percentage Difference' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, students, professionals, small business owners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-percentage', name: 'What Is a Percentage' },
    { '@type': 'WebPageElement', cssSelector: '#percentage-formula', name: 'The Percentage Formula' },
    { '@type': 'WebPageElement', cssSelector: '#percentage-change-vs-difference', name: 'Percentage Change vs Difference' },
    { '@type': 'WebPageElement', cssSelector: '#gst-percentage', name: 'Percentage in GST Calculations' },
    { '@type': 'WebPageElement', cssSelector: '#discount-percentage', name: 'Discount and Markup Percentages' },
    { '@type': 'WebPageElement', cssSelector: '#percentage-point', name: 'Percentage Points vs Percent' },
    { '@type': 'WebPageElement', cssSelector: '#common-percentages', name: 'Common Percentages in India' },
    { '@type': 'WebPageElement', cssSelector: '#percentage-ratios', name: 'Percentage Ratios Every Investor Should Track' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function PercentageCalculatorPage() {
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
      <PercentageCalculatorClient region={region} />
    </>
  );
}

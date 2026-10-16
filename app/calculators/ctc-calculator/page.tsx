import type { Metadata } from 'next';
import CTCCalculatorClient from './CTCCalculatorClient';
import { faqItems } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/ctc-calculator`;
  return {
    title: 'CTC Calculator: Salary Breakup & In-Hand Pay',
    description:
      'Free CTC calculator for India. See your salary breakup, monthly in-hand pay under old or new tax regime, and compare two job offers. Free to use.',
    keywords: [
      'ctc calculator',
      'in hand salary calculator',
      'cost to company calculator',
      'ctc calculator india',
      'salary breakup calculator',
      'ctc breakup calculator',
      'ctc to in hand salary calculator',
      'ctc calculator new tax regime',
      'ctc calculator old tax regime',
      'ctc calculator old vs new tax regime',
      'ctc formula',
      'ctc calculation formula',
      'take home salary calculator',
      'monthly salary calculator',
      'salary structure india',
      'pf deduction calculator',
      'professional tax deduction',
      'employer pf vs employee pf',
      'salary hike calculator',
      'gross salary calculator',
      'net salary calculator',
      'basic salary calculator',
      'hra calculation',
      'offer comparison calculator',
      'monthly take home pay',
      'ctc vs in hand salary calculator'
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'CTC Calculator - Salary Breakup & In-Hand Pay - Fermor',
      description:
        'Estimate your in-hand salary, salary breakup, and monthly take-home pay from your annual CTC. Free CTC calculator for India.',
      images: ['https://fermor.in/og-ctc-calculator.png'],
    },
    openGraph: {
      title: 'CTC Calculator - Salary Breakup & In-Hand Pay - Fermor',
      description:
        'Estimate your in-hand salary, salary breakup, employer contributions, deductions, and monthly take-home pay from your annual CTC. Multi-currency support. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/ctc-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-ctc-calculator.png', width: 1200, height: 630, alt: 'Fermor CTC Calculator' }],
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
    'Cost to Company',
    'In-Hand Salary',
    'Salary Breakup',
    'PF Deductions',
    'Gratuity',
    'Professional Tax',
    'Old vs New Tax Regime',
    'Personal Finance India',
    'Account Aggregator Framework',
    'Tax Planning India',
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
  name: 'CTC Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/ctc-calculator',
  description: 'Calculate your in-hand salary, monthly take-home pay, and salary breakup from your annual CTC with automatic income tax under the old or new regime. Multi-currency support and a two-offer comparison mode. Free, browser-based, no sign-up required to use the calculator.',
  featureList: [
    'CTC to In-Hand Salary Calculation',
    'Salary Breakup (Basic, HRA, Special Allowance, Employer PF, Gratuity)',
    'Metro vs Non-Metro HRA',
    'Automatic Old vs New Tax Regime TDS Calculation',
    'Employer vs Employee PF Breakdown',
    'Professional Tax and Deductions',
    'Offer Comparison Mode',
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
    { '@type': 'ListItem', position: 3, name: 'CTC Calculator', item: 'https://fermor.in/calculators/ctc-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate In-Hand Salary from CTC',
  description: 'Step-by-step guide to calculating your monthly take-home pay from your Cost to Company (CTC).',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor CTC Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your Annual CTC',
      text: 'Input the total Cost to Company (CTC) offered by your employer in the calculator.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Basic Salary, City Type, and Tax Regime',
      text: 'Choose your basic salary percentage, metro or non-metro city for HRA, and old or new tax regime for automatic income tax calculation.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Adjust More Settings',
      text: 'Expand More Settings to fine-tune variable pay, Employee PF percentage, Professional Tax, and old-regime deductions like Section 80C.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the Salary Breakdown',
      text: 'Check the estimated monthly in-hand salary, gross salary, and see the full salary structure chart to understand your cash flow.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'CTC',
  alternateName: 'Cost to Company',
  description: 'The total expense a company incurs on an employee in a year, including gross salary, employer PF contributions, gratuity, and other non-cash benefits.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Cost_to_company',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'CTC Calculator – Salary Breakup and In-Hand Pay from Cost to Company',
  description: 'Calculate in-hand salary, salary breakup, employer contributions, and monthly take-home pay from an annual CTC, with automatic income tax under the old or new regime and a two-offer comparison mode.',
  url: 'https://fermor.in/calculators/ctc-calculator',
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
    { '@type': 'DefinedTerm', name: 'CTC', alternateName: 'Cost to Company' },
    { '@type': 'DefinedTerm', name: 'In-Hand Salary' },
    { '@type': 'DefinedTerm', name: 'Gratuity' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian professionals, salaried employees, job seekers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-ctc',        name: 'What Is CTC?' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-vs-in-hand',     name: 'Difference Between CTC and In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-formula',        name: 'CTC Formula: How to Calculate In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#salary-structure',   name: 'How Salary Structure Works' },
    { '@type': 'WebPageElement', cssSelector: '#lta-and-allowances', name: 'Leave Travel Allowance (LTA) and Other Common Salary Components' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-structuring-differences', name: 'Why Two Offers With the Same CTC Give Different In-Hand Pay' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-by-career-stage', name: 'CTC Structure by Career Stage' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-govt-vs-private', name: 'Government and PSU CTC Structure vs Private Sector' },
    { '@type': 'WebPageElement', cssSelector: '#employer-vs-employee-pf', name: 'Employer vs Employee PF, and Gratuity' },
    { '@type': 'WebPageElement', cssSelector: '#epf-wage-ceiling',   name: 'CTC and the EPF Wage Ceiling' },
    { '@type': 'WebPageElement', cssSelector: '#basic-pct-impact',   name: 'How Basic Salary Percentage Affects Your Take-Home' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regime-impact',  name: 'Old vs New Tax Regime: Impact on Your In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#variable-pay-reliability', name: 'How Much of Your Variable Pay Should You Count On' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-offer-letter-checklist', name: 'Understanding Your Offer Letter' },
    { '@type': 'WebPageElement', cssSelector: '#salary-negotiation', name: 'How To Negotiate Salary Offers' },
    { '@type': 'WebPageElement', cssSelector: '#negotiation-case-study', name: 'A Full Negotiation Case Study' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-mistakes',       name: 'Common Mistakes When Evaluating a CTC Offer' },
    { '@type': 'WebPageElement', cssSelector: '#example-breakups',   name: 'Example Salary Breakups by CTC Tier' },
    { '@type': 'WebPageElement', cssSelector: '#calculator-limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#key-takeaways',      name: 'Key Takeaways' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-calculate',   name: 'How to Use This CTC Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-glossary',       name: 'CTC Glossary: Key Terms Explained' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                name: 'Frequently Asked Questions' },
  ],
};

export default async function CTCCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CTCCalculatorClient />
    </>
  );
}

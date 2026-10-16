import type { Metadata } from 'next';
import EPSCalculatorClient from './EPSCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/eps-calculator`;
  return {
    title: 'EPS Pension Calculator: Calculate Monthly EPS 95 Pension',
    description:
      'Free EPS pension calculator for India. Estimate your monthly pension under EPS-95, view early or deferred pension rates, and calculate higher pension options. Free to use.',
    keywords: [
      'eps pension calculator',
      'eps calculator',
      'epf pension calculator',
      'eps 95 pension calculator',
      'eps higher pension calculator',
      'calculate monthly eps pension',
      'eps pension calculator online',
      'epfo pension calculator',
      'employees pension scheme calculator',
      'eps pension contribution limits',
      'early retirement eps pension',
      'deferred eps pension bonus',
      'eps 2 year bonus service',
      'eps pension formula',
      'section 10 10d pension',
      'higher pension option calculation',
      'eps withdrawal benefit calculator',
      'employees provident fund pension calculator',
      'pensionable salary eps cap',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'EPS Pension Calculator: Calculate Monthly EPS 95 Pension',
      description:
        'Calculate your monthly pension under EPS-95. Supports standard basic caps, higher pension options, and early/deferred age options. Free to use.',
      images: ['https://fermor.in/og-eps-calculator.png'],
    },
    openGraph: {
      title: 'EPS Pension Calculator: Calculate Monthly EPS 95 Pension',
      description:
        'Free EPS pension calculator for India. Estimate your monthly pension under EPS-95, view early or deferred pension rates, and check higher pension options. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/eps-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-eps-calculator.png', width: 1200, height: 630, alt: 'Fermor EPS Pension Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-08';
const PAGE_DATE_PUBLISHED = '2026-07-08';

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
    'Employees Pension Scheme',
    'EPS 95',
    'Employees Provident Fund',
    'EPFO Regulations',
    'Retirement Planning India',
    'Tax Planning India',
    'Chartered Accountants India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Employees&apos; Pension Scheme (EPS)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Employees&apos; Pension Scheme (EPS) is a social security scheme introduced by the EPFO in 1995. It provides a structured monthly pension to organized sector employees after retirement at age 58.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the EPS monthly pension calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The statutory pension formula is: (Pensionable Salary multiplied by Pensionable Service) divided by 70. Pensionable salary is capped at Rs 15,000 per month, and pensionable service is capped at 35 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum pension possible under standard EPS rules?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the standard capped basic salary of Rs 15,000 and the maximum pensionable service of 35 years, the maximum pension is (15,000 multiplied by 35) divided by 70, which equals Rs 7,500 per month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Am I eligible for EPS pension if I have worked for less than 10 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A minimum of 10 completed years of eligible service is mandatory to qualify for a regular monthly pension. If your service is less than 10 years, you cannot claim a pension; you can only withdraw a lump-sum accumulation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 2-year service bonus in EPS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If an employee completes 20 or more years of eligible service under the scheme, they receive a bonus of 2 additional years added to their calculated pensionable service, subject to the total pensionable service cap of 35 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw my EPS pension early?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can opt for an early reduced pension from age 50 to 57, provided you have completed 10 years of service. However, the pension amount is reduced by 4% for every year you are short of age 58.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I defer my EPS pension after age 58?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you defer your pension to age 59 or 60, your pension amount will increase by 4% for each deferred year. Deferring to age 60 provides an 8% increase in your monthly pension payout.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the higher pension option under the Supreme Court ruling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Supreme Court in November 2022 allowed eligible employees to opt for a pension based on their actual basic salary rather than the statutory cap of Rs 15,000. This increases the pension payout but requires transferring past employer EPF balances to the EPS fund.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EPS pension taxable under the Income Tax Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Monthly pension received under EPS is treated as salary income and is fully taxable under your applicable income tax slabs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the employee contribute directly to the EPS fund?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Salaried employees contribute 12% of their basic salary entirely to the EPF. The employer contributes 12%, out of which 8.33% goes to the EPS (capped at Rs 1,250 per month under standard rules) and the remaining 3.67% goes to the EPF.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EPS Pension Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/eps-calculator',
  description: 'Calculate monthly EPS pension payouts under EPS-95 with standard caps, higher pension options, and early/deferred pension calculations.',
  featureList: ['Statutory pension formula evaluation', 'Capped vs actual pensionable salary toggles', '2-year service bonus logic', 'Early/deferred pension scaling', 'Donut chart visualization', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Monthly EPS Pension',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor EPS Pension Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select pension cap mode', text: 'Toggle standard capped salary (Rs 15,000) or actual basic salary.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter average basic salary', text: 'Input the average monthly basic + DA salary of the last 60 months of service.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter service tenure', text: 'Input completed years of service under EPFO.' },
    { '@type': 'HowToStep', position: 4, name: 'Select retirement age', text: 'Set pension commencement age (50 to 60) to compute early or deferred rate adjustments.' },
    { '@type': 'HowToStep', position: 5, name: 'Review pension estimate', text: 'View estimated monthly pension, lifetime corpus, and final pensionable service.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Employees Pension Scheme',
  alternateName: 'EPS 95',
  description: 'A social security scheme created by EPFO to provide a regular monthly pension to organized sector employees in India upon retirement.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Pension Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Employees%27_Provident_Fund_Organisation#Employees&apos;_Pension_Scheme'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'EPS Pension Calculator', item: 'https://fermor.in/calculators/eps-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'EPS Pension Calculator: Calculate Monthly EPS 95 Pension',
  url: 'https://fermor.in/calculators/eps-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Employees Pension Scheme', alternateName: 'EPS 95' }],
  audience: { '@type': 'Audience', audienceType: 'PF Members, Retirees, Chartered Accountants, HR Payroll Specialists', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-eps', name: 'What Is the EPS Pension Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Eligibility Criteria for Employees Pension Scheme (EPS)' },
    { '@type': 'WebPageElement', cssSelector: '#pension-formula', name: 'Formula for Calculating Monthly EPS Pension' },
    { '@type': 'WebPageElement', cssSelector: '#salary-cap', name: 'The Rs 15,000 Pensionable Salary Cap Explained' },
    { '@type': 'WebPageElement', cssSelector: '#service-bonus', name: 'What Is the 2-Year Service Bonus in EPS' },
    { '@type': 'WebPageElement', cssSelector: '#early-pension', name: 'Early Pension Rules: Reduction Rates for Ages 50 to 57' },
    { '@type': 'WebPageElement', cssSelector: '#deferred-pension', name: 'Deferred Pension Rules: Bonus Rates for Ages 59 and 60' },
    { '@type': 'WebPageElement', cssSelector: '#higher-option', name: 'Higher EPS Pension Option: Supreme Court Ruling Explained' },
    { '@type': 'WebPageElement', cssSelector: '#epf-vs-eps', name: 'Difference Between EPF and EPS Contributions' },
    { '@type': 'WebPageElement', cssSelector: '#nominee-rules', name: 'Pension Options for Nominees, Spouses, and Children' },
    { '@type': 'WebPageElement', cssSelector: '#documents', name: 'Documents and Forms Required to Claim EPS Pension' },
    { '@type': 'WebPageElement', cssSelector: '#taxability', name: 'Taxability of EPS Pension Income under the Income Tax Act' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This EPS Pension Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function EPSCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <EPSCalculatorClient />
    </>
  );
}

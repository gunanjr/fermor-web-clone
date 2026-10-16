import type { Metadata } from 'next';
import EPFCalculatorClient from './EPFCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/epf-calculator`;
  return {
    title: 'EPF Pension Calculator: Employee Provident Fund Maturity & Pension',
    description:
      'Free EPF calculator for retirement planning. Calculate EPF maturity, pension amount, total interest earned, and year-by-year growth. EPF rate: 8.25%. Current EPF balance tracking. Free to use.',
    keywords: [
      'epf pension calculator',
      'calculate epf pension',
      'epf pension amount calculator',
      'epf maturity calculator',
      'epf calculator',
      'employee provident fund calculator',
      'pf pension calculator',
      'epf calculator for retirement',
      'epf pension calculator after retirement',
      'epf pension calculator for private employees',
      'epf interest calculator',
      'retirement calculator epf',
      'pf pension amount calculator',
      'epf contribution calculator',
      'calculate eps pension',
      'pf retirement calculator',
      'provident fund calculator india',
      'epf calculation formula',
      'epf balance calculator',
      'epf maturity amount calculator',
      'epf calculator with current balance',
      'epf rate calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'EPF Calculator: Employee Provident Fund Maturity Calculator',
      description:
        'Calculate EPF maturity, total interest, and year-by-year growth. Current rate 8.25%. Employer + employee contributions. Free for India.',
      images: ['https://fermor.in/og-epf-calculator.png'],
    },
    openGraph: {
      title: 'EPF Calculator: Employee Provident Fund Maturity Calculator',
      description:
        'Calculate your EPF maturity amount, total interest earned, and year-by-year growth. Includes current 8.25% EPF rate, employer and employee contributions, and multi-currency support. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/epf-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-epf-calculator.png', width: 1200, height: 630, alt: 'Fermor EPF Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-24';
const PAGE_DATE_PUBLISHED = '2026-06-30';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Employee Provident Fund (EPF)',
    'Employee Pension Scheme (EPS)',
    'EPF Interest Rate and Calculation',
    'EPF Maturity Amount',
    'Pension Amount Calculation',
    'Retirement Planning India',
    'EPFO Regulations',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Tax-Free Withdrawal Rules',
    'Financial Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I calculate my EPF pension amount after retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your EPF pension is calculated from the EPS (Employee Pension Scheme) portion of your employer contribution. Monthly pension = (Pensionable Salary × Pensionable Service) / 70. Pensionable salary is capped at Rs 15,000 per month. If you have 20 years of service at an average salary of Rs 50,000, your monthly pension would be approximately (Rs 15,000 × 20) / 70 = Rs 4,286 per month.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current EPF interest rate for 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The current EPF interest rate for FY 2025-26 is 8.25% per annum, as declared by the EPFO and notified by the Ministry of Labour and Employment. This rate applies to all EPF accounts for the financial year ending March 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is EPF maturity amount calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF maturity is calculated using monthly compounding on the combined employee and employer contributions. Employee contributes 12% of basic salary. Employer contributes 12% of basic, split as 8.33% to EPS (Employee Pension Scheme) and 3.67% to EPF. The EPF portion (15.67% of basic) earns interest at the declared annual rate, compounded monthly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much pension will I get from EPF at retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF pension comes from the EPS portion (8.33% of employer contribution). Monthly pension is calculated as (Average Pensionable Salary × Pensionable Service) / 70. The pensionable salary is capped at Rs 15,000 per month and maximum pensionable service is 35 years. Maximum monthly pension is Rs 7,500. You receive both this pension and lump-sum maturity from the EPF account.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the employee contribution to EPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The employee contribution to EPF is 12% of basic salary (plus dearness allowance if applicable). This is deducted from the employee\'s salary every month and deposited in the EPF account.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the employer contribution to EPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The employer contributes 12% of basic salary. Of this, 8.33% goes to the Employee Pension Scheme (EPS) and 3.67% goes to the EPF account. The EPS portion is capped at Rs 1,250 per month (8.33% of Rs 15,000).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw my EPF before retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, partial withdrawals are allowed for specific purposes: medical emergencies, home purchase/construction, marriage, education, and unemployment for more than 2 months. Full withdrawal is allowed after retirement at age 58 or if unemployed for 2+ months. TDS applies if withdrawal is before 5 years of continuous service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EPF taxable on withdrawal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF withdrawal is tax-free if you have completed 5 years of continuous service. If withdrawn before 5 years, the amount is taxable in the year of withdrawal. The employer\'s contribution and interest thereon are taxed as salary, while the employee\'s contribution is taxed under Section 80C if claimed earlier. TDS at 10% applies on premature withdrawals above Rs 50,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between EPF and VPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF (Employee Provident Fund) is the mandatory 12% contribution from both employee and employer. VPF (Voluntary Provident Fund) allows employees to contribute more than 12% of basic salary voluntarily, up to 100% of basic. VPF earns the same interest rate as EPF (8.25% currently) but the employer does not match VPF contributions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can private employees get EPF pension?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, private employees in registered establishments get EPF pension. The EPS (Employee Pension Scheme) is part of the EPF system. However, establishments with less than 20 employees may not be covered under EPS. The pension formula remains the same: (Pensionable Salary × Pensionable Service) / 70. Verify your employer\'s registration status on the EPFO portal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to EPF after retirement at 58?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At age 58, you can withdraw your entire EPF corpus tax-free if you have completed 5 years of service. You receive both the EPF lump sum maturity amount and a monthly pension from the EPS portion. The pension is lifelong and your family receives a portion if you pass away. The withdrawal is tax-free but still counts as income for ITR purposes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, free to use. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EPF Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/epf-calculator',
  description: 'Calculate EPF maturity amount, total interest, and year-by-year growth. Includes current 8.25% EPF rate, employer and employee contribution breakdown, and multi-currency support. Free to use, browser-based.',
  featureList: [
    'EPF Maturity Amount Calculator',
    'EPF Pension Amount Calculator',
    'Employee + Employer Contribution Breakdown',
    'EPS Pension Calculation with Age & Service',
    'Year-by-Year Growth Table and Charts',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Current EPF rate: 8.25%',
    'Retirement Planning with Lump Sum + Pension',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'EPF Calculator', item: 'https://fermor.in/calculators/epf-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate EPF Maturity',
  description: 'Step-by-step guide to calculate your Employee Provident Fund maturity amount using the EPF formula and current interest rate.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor EPF Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your basic salary',
      text: 'Input your monthly basic salary. EPF contributions are calculated as a percentage of basic salary plus dearness allowance.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set your age and retirement age',
      text: 'Enter your current age and expected retirement age (typically 58 in India). This determines the number of contribution years.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter current EPF balance if any',
      text: 'If you have an existing EPF balance from previous employment, enter it to get an accurate maturity projection.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View your EPF maturity',
      text: 'The calculator shows your total maturity amount, total contributions (employee + employer), total interest earned, and a year-by-year growth table.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EPF',
  alternateName: 'Employee Provident Fund',
  description: 'A mandatory retirement savings scheme in India where both employee and employer contribute 12% of basic salary, earning government-declared interest (currently 8.25% for FY 2025-26).',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Employees%27_Provident_Fund_Organisation',
    'https://www.wikidata.org/wiki/Q1349512',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'EPF Calculator: Employee Provident Fund Maturity Calculator',
  description: 'Free EPF calculator for India. Calculate your Employee Provident Fund maturity amount, total interest earned, and year-by-year growth. Includes current 8.25% EPF rate and multi-currency support.',
  url: 'https://fermor.in/calculators/epf-calculator',
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
    { '@type': 'DefinedTerm', name: 'EPF', alternateName: 'Employee Provident Fund Pension and Maturity' },
    { '@type': 'DefinedTerm', name: 'EPS', alternateName: 'Employee Pension Scheme Calculation' },
    { '@type': 'DefinedTerm', name: 'VPF', alternateName: 'Voluntary Provident Fund' },
    { '@type': 'DefinedTerm', name: 'Pension Amount', alternateName: 'Monthly Pension After Retirement' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, NRI investors, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-epf', name: 'What Is EPF' },
    { '@type': 'WebPageElement', cssSelector: '#epf-formula', name: 'EPF Formula' },
    { '@type': 'WebPageElement', cssSelector: '#epf-contributions', name: 'EPF Contributions Breakdown' },
    { '@type': 'WebPageElement', cssSelector: '#epf-vs-vpf', name: 'EPF vs VPF' },
    { '@type': 'WebPageElement', cssSelector: '#epf-withdrawal-rules', name: 'EPF Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#epf-taxation', name: 'EPF Taxation' },
    { '@type': 'WebPageElement', cssSelector: '#epf-interest-calculation', name: 'EPF Interest Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#epf-benefits', name: 'EPF Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This EPF Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function EPFCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EPFCalculatorClient />
    </>
  );
}
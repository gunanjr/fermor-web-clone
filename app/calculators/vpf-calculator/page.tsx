import type { Metadata } from 'next';
import VPFCalculatorClient from './VPFCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/vpf-calculator`;
  return {
    title: 'VPF Calculator: Voluntary Provident Fund & EPF Maturity',
    description:
      'Free VPF calculator for India. Calculate voluntary provident fund maturity at 8.25%, combined EPF+VPF corpus, and interest rate history. Free to use.',
    keywords: [
      'vpf calculator',
      'voluntary provident fund calculator',
      'vpf calculator online',
      'vpf interest rate calculator',
      'vpf maturity calculator',
      'vpf interest calculator',
      'vpf return calculator',
      'vpf tax calculator',
      'vpf vs epf calculator',
      'epf calculator with vpf',
      'pf calculator with vpf',
      'voluntary pf calculator india',
      'vpf contribution calculator',
      'vpf withdrawal rules',
      'vpf tax benefits',
      'vpf interest rate 2025-26',
      'vpf interest rate history',
      'vpf maturity amount calculator',
      'vpf contribution limit',
      'vpf calculator excel',
      'vpf calculation excel',
      'vpf vs ppf calculator',
      'vpf vs nps which is better',
      'vpf for nri',
      'vpf employer contribution',
      'vpf tax exemption 80c',
      'vpf maximum contribution',
      'vpf interest calculation formula',
      'epf vpf combined maturity',
      'voluntary provident fund interest rate',
      'vpf section 80c deduction',
      'vpf withdrawal before retirement',
      'reverse vpf calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'VPF Calculator: Voluntary Provident Fund & EPF Maturity - Fermor',
      description:
        'Calculate VPF maturity with voluntary contributions above 12% EPF. Current rate 8.25%. Combined EPF+VPF projection with interest rate history. Free for India.',
      images: ['https://fermor.in/og-vpf-calculator.png'],
    },
    openGraph: {
      title: 'VPF Calculator: Voluntary Provident Fund & EPF Maturity - Fermor',
      description:
        'Calculate your Voluntary Provident Fund maturity with additional voluntary contributions over and above the mandatory 12% EPF. Includes current 8.25% interest rate, year-wise rate history, year-by-year growth, and EPF + VPF combined projection. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/vpf-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-vpf-calculator.png', width: 1200, height: 630, alt: 'Fermor VPF Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-08-16';
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
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Voluntary Provident Fund',
    'VPF Interest Rate',
    'Retirement Planning India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'Tax Planning India',
    'NRI Investments',
    'Financial Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is VPF and how does it differ from EPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VPF (Voluntary Provident Fund) allows employees to contribute more than the mandatory 12% of basic salary to their EPF account, up to 100% of basic salary. Unlike EPF, the employer does not match VPF contributions. VPF earns the same interest rate as EPF (currently 8.25%) and follows the same withdrawal and tax rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum VPF contribution allowed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contribute up to 100% of your basic salary (plus dearness allowance) to VPF voluntarily. This is in addition to the mandatory 12% EPF contribution. There is no separate upper limit for VPF other than the 100% of basic salary cap.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the employer contribute to VPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The employer does not match VPF contributions. The employer\'s 12% contribution is fixed: 3.67% goes to EPF and 8.33% goes to EPS (capped at Rs 1,250/month). VPF is entirely funded by the employee.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current VPF interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VPF earns the same interest rate as EPF, which is 8.25% per annum for FY 2025-26, as declared by the EPFO. The rate is reviewed annually by the government.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VPF eligible for Section 80C deduction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, VPF contributions are eligible for deduction under Section 80C up to the overall limit of Rs 1.5 lakh per financial year. This limit is combined with EPF employee contribution, PPF, ELSS, life insurance premiums, and other 80C investments.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw VPF before retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, VPF follows the same withdrawal rules as EPF. Partial withdrawals are allowed for medical emergencies, home purchase, marriage, education, and unemployment. Full withdrawal is allowed at retirement (age 58) or after 2 months of unemployment. TDS applies if withdrawn before 5 years of continuous service.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VPF better than PPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VPF currently offers 8.25% interest vs PPF\'s 7.1%, and both have EEE tax status. However, PPF has a 15-year lock-in with partial withdrawal from year 7, while VPF is linked to employment and can be withdrawn on job change or unemployment. VPF has no separate limit beyond 100% of basic, while PPF is capped at Rs 1.5 lakh/year. For salaried employees with high basic salary, VPF often allows larger contributions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to start VPF contribution?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Submit a written request to your employer/HR department specifying the VPF contribution percentage (above 12% of basic). The employer will deduct the additional amount from your salary and deposit it in your EPF account. You can start, stop, or modify VPF contributions at the beginning of any financial year, subject to employer policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to VPF when changing jobs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VPF is part of your EPF account and transfers along with it using your UAN (Universal Account Number). The accumulated VPF balance, along with EPF balance, moves to the new employer. You can also withdraw the full amount if unemployed for 2+ months, subject to tax rules.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRI invest in VPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRIs cannot open new VPF/EPF accounts. If you were a member before becoming an NRI, your existing account continues to earn interest but no fresh contributions can be made. The corpus can be withdrawn or left to compound at the declared rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between VPF and PPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VPF is linked to employment and has the same rate as EPF (8.25%). PPF is a separate government savings scheme with a 15-year lock-in, current rate 7.1%, and annual contribution cap of Rs 1.5 lakh. VPF can be withdrawn on job change or unemployment, while PPF allows partial withdrawal from year 7. Both are EEE tax status.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use a regular EPF calculator for VPF, or do I need a separate tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A plain EPF calculator only projects the mandatory 12% employee and 3.67% employer contribution, so it will understate your actual balance if you have elected VPF. This calculator adds the voluntary VPF percentage on top of standard EPF and shows both the combined maturity and the separate employee, employer, and voluntary contribution figures in one projection.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is VPF interest calculated month by month?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPFO calculates interest monthly on the running balance but credits it once a year. Each month, the opening balance plus that month\'s contribution earns interest at one-twelfth of the annual declared rate. The current rate of 8.25% works out to roughly 0.688% per month. This calculator compounds on that same monthly basis rather than approximating with a flat annual formula.',
      },
    },
    {
      '@type': 'Question',
      name: 'What was the VPF interest rate in 2020, 2021, and 2022?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPFO declared 8.50% for FY 2019-20 and FY 2020-21, then cut the rate to 8.10% for FY 2021-22, the lowest since 1977-78. FY 2022-23 was 8.15%. The rate has held at 8.25% since FY 2023-24.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a separate VPF tax calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A dedicated VPF tax calculator is not necessary for most employees, since VPF interest is fully tax-free (EEE status) as long as combined EPF and VPF employee contribution stays under Rs 2.5 lakh a year, and the account has 5 years of continuous service. Above that threshold, interest on the excess becomes taxable at your income tax slab rate with TDS deducted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'VPF Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/vpf-calculator',
  description: 'Calculate VPF maturity with voluntary contributions above mandatory 12% EPF. Includes current 8.25% rate, combined EPF+VPF projection, year-by-year growth table, and multi-currency support. Free, browser-based, no sign-up.',
  featureList: [
    'VPF Maturity Calculator',
    'Combined EPF + VPF Projection',
    'Voluntary Contribution Slider (up to 100% of basic)',
    'Year-by-Year Growth Table',
    'VPF/EPF Interest Rate History (FY 2015-16 to FY 2025-26)',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Current VPF/EPF rate: 8.25%',
    'Section 80C limit tracker',
    'Rs 2.5 lakh taxable interest threshold advisory',
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
    { '@type': 'ListItem', position: 3, name: 'VPF Calculator', item: 'https://fermor.in/calculators/vpf-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate VPF Maturity',
  description: 'Step-by-step guide to calculate your Voluntary Provident Fund maturity amount with voluntary contributions above mandatory EPF.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor VPF Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your basic salary',
      text: 'Input your monthly basic salary. Both EPF (12% mandatory) and VPF (voluntary, up to 100% of basic) are calculated on basic salary.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set your VPF contribution percentage',
      text: 'Choose how much extra you want to contribute voluntarily, from 0% to 100% of basic salary, over and above the mandatory 12% EPF.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter your age and retirement age',
      text: 'Set your current age and expected retirement age (typically 58). This determines the contribution period.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View combined EPF + VPF maturity',
      text: 'The calculator shows your total maturity (EPF + VPF), split of contributions, total interest earned, and year-by-year growth table.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'VPF',
  alternateName: 'Voluntary Provident Fund',
  description: 'A voluntary extension of EPF allowing employees to contribute up to 100% of basic salary voluntarily, earning the same government-declared interest rate (currently 8.25%) with identical tax treatment.',
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
  name: 'VPF Calculator: Voluntary Provident Fund & EPF Maturity',
  description: 'Free VPF calculator for India. Calculate your Voluntary Provident Fund maturity with additional voluntary contributions over and above the mandatory 12% EPF. Includes current 8.25% interest rate, year-wise rate history, and multi-currency support.',
  url: 'https://fermor.in/calculators/vpf-calculator',
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
    { '@type': 'DefinedTerm', name: 'VPF', alternateName: 'Voluntary Provident Fund' },
    { '@type': 'DefinedTerm', name: 'EPF', alternateName: 'Employee Provident Fund' },
    { '@type': 'DefinedTerm', name: 'Section 80C' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, NRI investors, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-vpf', name: 'What Is VPF' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-formula', name: 'VPF Formula' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-interest-rate-history', name: 'VPF Interest Rate History' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-by-salary', name: 'VPF Maturity by Salary' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-calculator-excel', name: 'VPF Calculator in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-vpf-calculator', name: 'Reverse VPF Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-vs-epf', name: 'VPF vs EPF' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-vs-ppf', name: 'VPF vs PPF' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-vs-nps', name: 'VPF vs NPS' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-tax-benefits', name: 'VPF Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-withdrawal', name: 'VPF Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#vpf-limitations', name: 'Limitations of VPF' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This VPF Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function VPFCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <VPFCalculatorClient />
    </>
  );
}
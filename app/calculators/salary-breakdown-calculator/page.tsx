import type { Metadata } from 'next';
import SalaryBreakdownCalculatorClient from './SalaryBreakdownCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/salary-breakdown-calculator`;
  return {
    title: 'Salary Breakdown Calculator: Monthly In-Hand Salary from CTC',
    description:
      'Free salary breakdown calculator for India. Convert annual CTC into monthly basic salary, HRA, EPF, and net monthly in-hand take-home pay. Free to use.',
    keywords: [
      'salary breakdown calculator',
      'salary calculator',
      'monthly salary breakdown calculator',
      'ctc to in hand salary calculator',
      'calculate monthly in hand salary',
      'ctc breakdown calculator',
      'basic salary calculator',
      'hra calculation in ctc',
      'take home salary calculator india',
      'salary deduction calculator',
      'epf employee contribution calculator',
      'professional tax state rules',
      'gratuity calculation in ctc',
      'salary structure calculator excel',
      'monthly ctc component breakdown',
      'special allowance calculator',
      'new tax regime take home calculator',
      'nri salary breakdown calculator',
      'gross to net salary calculator',
      'payroll breakdown calculator',
      'income breakdown calculator',
      'annual salary breakdown calculator',
      'break down my salary',
      'break down salary',
      'break down yearly salary into monthly',
      'breakdown of salary package',
      'cost to company salary breakdown',
      'pay breakdown calculator',
      'paycheck breakdown calculator',
      'salary breakdown monthly',
      'salary breakdown per month',
      'wage breakdown calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Salary Breakdown Calculator: Monthly In-Hand Salary from CTC',
      description:
        'Convert annual CTC into basic, HRA, EPF, allowances, taxes, and final monthly in-hand take-home pay. Free to use.',
      images: ['https://fermor.in/og-salary-breakdown-calculator.png'],
    },
    openGraph: {
      title: 'Salary Breakdown Calculator: Monthly In-Hand Salary from CTC',
      description:
        'Free salary breakdown calculator for India. Convert annual CTC into basic, HRA, allowances, EPF, gratuity, taxes, and final take-home salary. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/salary-breakdown-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-salary-breakdown-calculator.png', width: 1200, height: 630, alt: 'Fermor Salary Breakdown Calculator' }],
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
    'Salary Breakdown',
    'Cost to Company',
    'In-Hand Salary',
    'Income Tax Act 1961',
    'Old Tax Regime',
    'New Tax Regime',
    'EPF Contributions',
    'Gratuity Act',
    'Tax Optimization',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Cost to Company (CTC)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Cost to Company (CTC) is the total annual amount an employer spends on hiring and maintaining an employee. It includes direct payouts like basic salary and allowances, indirect benefits like employer PF contributions, and statutory components like gratuity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between CTC and in-hand salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CTC is the total expenditure of the employer, whereas in-hand salary is the actual take-home money you receive in your bank account each month. In-hand is computed by subtracting employer benefits (PF, gratuity) and deductions (employee PF, professional tax, income tax) from the CTC.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Basic Salary and how is it decided?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Basic Salary is the core component of your salary structure, typically forming 40 per cent to 50 per cent of your total CTC. Most other salary allowances, dearness allowance, and retirement benefits like EPF and gratuity are calculated as a direct percentage of basic salary.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is HRA structured in the CTC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'House Rent Allowance (HRA) is typically set at 40 per cent of basic salary for non-metro cities and 50 per cent of basic salary for metro cities. HRA qualifies for tax exemptions under Section 10(13A) of the Income Tax Act if you live in rented accommodation and pay rent.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the employer EPF contribution cap?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under EPFO rules, employers contribute 12 per cent of basic salary to the employee pension and provident fund. This contribution can optionally be capped at 12 per cent of the statutory basic salary ceiling of Rs 15,000 per month (which equals Rs 1,800 per month).',
      },
    },
    {
      '@type': 'Question',
      name: 'How is gratuity calculated inside CTC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Employers accrue gratuity at 4.81 per cent of basic salary (equivalent to 15 days of salary for every year of completed service). Even though gratuity is only payable after 5 years of continuous service, it is shown as an annual benefit deduction in your CTC structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Special Allowance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Special Allowance is a balancing component in your CTC structure. After accounting for basic, HRA, employer PF, and gratuity, the remaining portion of the CTC is designated as special allowance, which is fully taxable for the employee.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Professional Tax (PT)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional Tax is a state-level tax levied on salaried employees, capped by the Constitution of India at a maximum of Rs 2,500 per year (typically Rs 200 per month). States like Maharashtra, Karnataka, and West Bengal levy PT, while others do not.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which tax regime is used to calculate tax in this breakdown?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The calculator estimates income tax based on either the new regime (the default regime with Rs 75,000 standard deduction and rebate up to Rs 12 lakh) or the old regime (with Rs 50,000 standard deduction and Rs 1.5 lakh 80C PF deduction).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does uncapping PF affect in-hand salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Uncapping PF means contributing 12 per cent of your actual basic salary rather than capping it at Rs 1,800. This increases your retirement savings but reduces your monthly in-hand take-home salary.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Salary Breakdown Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/salary-breakdown-calculator',
  description: 'Calculate detailed salary breakdown from annual CTC, monthly components, deductions, and take-home pay under old and new tax regimes.',
  featureList: ['Monthly salary component breakdown', 'Capped vs uncapped EPF toggle', 'State professional tax presets', 'Progressive tax regime estimation', 'Donut chart analysis', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Check Monthly In-Hand Salary from CTC',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Salary Breakdown Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your annual CTC', text: 'Enter your total annual Cost to Company (CTC).' },
    { '@type': 'HowToStep', position: 2, name: 'Adjust Basic and HRA share', text: 'Set basic salary percentage (default 50%) and HRA share (default 50% of basic).' },
    { '@type': 'HowToStep', position: 3, name: 'Select EPF and Professional Tax options', text: 'Select capped or uncapped EPF mode, and choose whether Professional Tax applies in your state.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose tax regime', text: 'Toggle old or new tax regime for income tax calculations.' },
    { '@type': 'HowToStep', position: 5, name: 'Review component breakdown and take-home salary', text: 'View monthly and annual breakdown of basic, HRA, allowance, benefits, deductions, and net monthly in-hand salary.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Cost to Company',
  alternateName: 'CTC',
  description: 'The total annualized cost incurred by an employer on hiring and maintaining an employee, combining salary, benefits, allowances, and statutory retirement contributions.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Employment Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Cost_to_company'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Salary Breakdown Calculator', item: 'https://fermor.in/calculators/salary-breakdown-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Salary Breakdown Calculator: Monthly In-Hand Salary from CTC',
  url: 'https://fermor.in/calculators/salary-breakdown-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Cost to Company', alternateName: 'CTC' }],
  audience: { '@type': 'Audience', audienceType: 'Salaried Employees, Job Seekers, HR Professionals, Finance Managers, CAs', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-salary-breakdown', name: 'What Is a Salary Breakdown Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#ctc-vs-gross-vs-net', name: 'Difference between CTC, Gross Salary, and Net In-Hand Salary' },
    { '@type': 'WebPageElement', cssSelector: '#basic-component', name: 'Basic Salary Component in Your Payroll Breakdown Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#hra-calculation', name: 'Understanding House Rent Allowance (HRA) Calculations' },
    { '@type': 'WebPageElement', cssSelector: '#epf-rules', name: 'Employer vs Employee EPF Contribution Rules' },
    { '@type': 'WebPageElement', cssSelector: '#gratuity-accrual', name: 'Accruing Gratuity in the Cost to Company Salary Breakdown' },
    { '@type': 'WebPageElement', cssSelector: '#special-allowance', name: 'Role of Special Allowance as a Balancing Component' },
    { '@type': 'WebPageElement', cssSelector: '#professional-tax', name: 'Professional Tax Slabs by State in India' },
    { '@type': 'WebPageElement', cssSelector: '#tax-slabs', name: 'Estimated Income Tax Slabs: Old vs New Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#yearly-to-monthly', name: 'How to Break Down Yearly Salary into Monthly Take-Home' },
    { '@type': 'WebPageElement', cssSelector: '#customizing-settings', name: 'Customizing Your Paycheck Breakdown Calculator Settings' },
    { '@type': 'WebPageElement', cssSelector: '#deductions-and-benefits', name: 'Common Payroll Deductions and Benefits inside CTC' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This CTC Breakdown Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SalaryBreakdownCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SalaryBreakdownCalculatorClient />
    </>
  );
}

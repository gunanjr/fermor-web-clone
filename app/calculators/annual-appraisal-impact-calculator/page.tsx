import type { Metadata } from 'next';
import AnnualAppraisalClient from './AnnualAppraisalClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/annual-appraisal-impact-calculator`;
  return {
    title: 'Annual Appraisal Impact Calculator: Salary Hike Take-Home Calculator',
    description:
      'Free annual appraisal impact calculator for India. See exactly how much of your salary hike goes to taxes vs your actual take-home increase. Supports new and old tax regime. Free to use.',
    keywords: [
      'annual appraisal impact calculator',
      'salary hike calculator',
      'appraisal impact on take home',
      'salary increment tax calculator',
      'appraisal tax impact',
      'hike calculator',
      'salary hike tax impact india',
      'effective salary hike calculator',
      'take home after appraisal',
      'salary increase tax calculator india',
      'annual increment calculator',
      'appraisal impact india',
      'salary hike take home calculator',
      'increment impact calculator',
      'appraisal calculator india',
      'how much tax on salary hike',
      'salary appraisal tax calculator',
      'net salary after hike',
      'effective hike after tax india',
      'salary increment net take home',
      'hike percentage calculator india',
      'salary raise tax impact',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Annual Appraisal Impact Calculator: Salary Hike Take-Home Calculator',
      description:
        'Find out how much of your salary hike actually lands in your pocket. Supports new and old tax regime. Free for India.',
      images: ['https://fermor.in/og-annual-appraisal-impact-calculator.png'],
    },
    openGraph: {
      title: 'Annual Appraisal Impact Calculator: How Much of Your Hike Do You Keep? - Fermor',
      description:
        'Free appraisal impact calculator for India. See your effective take-home increase, how much goes to tax, and your real effective hike percentage under new and old regime.',
      type: 'website',
      url: 'https://fermor.in/calculators/annual-appraisal-impact-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-annual-appraisal-impact-calculator.png', width: 1200, height: 630, alt: 'Fermor Annual Appraisal Impact Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-08';
const PAGE_DATE_MODIFIED  = '2026-07-08';

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
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Income Tax India',
    'Salary Hike Tax Impact',
    'Old Tax Regime',
    'New Tax Regime',
    'Appraisal Impact Calculator',
    'Personal Finance India',
    'Section 80C Investments',
    'Section 80D Health Insurance',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Annual Increment Calculator',
  ],
};

const faqItems = [
  {
    q: 'What is an annual appraisal impact calculator?',
    a: 'An annual appraisal impact calculator shows the real take-home increase from a salary hike after accounting for income tax. When your CTC goes up, a portion of the increment falls in a higher tax slab, so the actual monthly benefit in your bank account is always lower than the gross increment. This calculator computes the exact tax on the increment and shows your effective monthly gain.',
  },
  {
    q: 'Why is my effective hike lower than the announced percentage?',
    a: 'The announced hike percentage applies to your gross CTC. But your increment is taxed at the marginal rate, which is the rate applicable to the highest slice of your income. If your total income crosses Rs 10 lakh, the top portion is taxed at 30% plus 4% cess under the old regime. So a 15% hike on a Rs 12 lakh CTC adds Rs 1.8 lakh gross, but after 30% tax on the incremental slice, you actually pocket significantly less. The effective hike percentage is always lower than the announced figure.',
  },
  {
    q: 'How does a salary hike affect my income tax?',
    a: 'A salary hike increases your taxable income. The additional tax depends entirely on which tax slab the increment falls into. Income between Rs 7 lakh and Rs 10 lakh (new regime) is taxed at 10 to 15%. Income above Rs 10 lakh gets taxed at higher rates up to 30%. Only the portion of the increment that crosses a slab boundary gets taxed at the higher rate. The tax on your pre-hike income stays the same.',
  },
  {
    q: 'Should I choose old regime or new regime after an appraisal?',
    a: "The new tax regime is usually better after an appraisal if your 80C and 80D investments are small or fully utilized. If you have significant deductions (Rs 1.5 lakh in 80C, home loan interest, HRA), the old regime can still come out ahead. The key rule: if your total deductions and the standard deduction together exceed the regime's break-even point (roughly Rs 3.75 lakh in deductions for someone in the 30% slab), stick to old regime. Use this calculator with both regime options to compare.",
  },
  {
    q: 'How is tax calculated on a salary increment?',
    a: "Tax on the increment is calculated as the difference between your new CTC's annual tax and your current CTC's annual tax. Both figures are computed after applying the relevant standard deduction, Section 80C, and Section 80D deductions if you are on old regime. The difference is the additional tax you will pay because of the hike. Dividing this by 12 gives the monthly TDS increase.",
  },
  {
    q: 'What is the standard deduction in the new tax regime?',
    a: 'The standard deduction in the new tax regime is Rs 75,000 per year for salaried employees. Under the old regime, the standard deduction is Rs 50,000. The new regime does not allow additional deductions for 80C, 80D, HRA, or home loan interest beyond the standard deduction.',
  },
  {
    q: 'What is the Section 87A rebate and does it apply to my hike?',
    a: "The Section 87A rebate is a full tax waiver for incomes up to a certain threshold. Under the new tax regime, if your taxable income (after standard deduction) is Rs 12 lakh or below, you pay zero tax. Under the old regime, the rebate applies if taxable income is Rs 5 lakh or below. After an appraisal, if your income crosses these thresholds, you lose the rebate entirely and your tax jumps significantly. This calculator accounts for the 87A rebate correctly.",
  },
  {
    q: 'How do Section 80C and 80D deductions affect my post-appraisal tax?',
    a: 'Under the old regime, 80C allows up to Rs 1.5 lakh in deductions for ELSS, PPF, EPF, life insurance, and similar instruments. Section 80D allows up to Rs 25,000 for health insurance (Rs 50,000 for senior citizens). These deductions lower your taxable income, which reduces both the tax before and after the hike. If your investments already max out 80C, an additional rupee of income after the hike is fully taxable at your marginal rate.',
  },
  {
    q: 'What is the effective hike percentage after tax?',
    a: "The effective hike percentage is the net annual take-home benefit as a percentage of your current CTC. It is always lower than the announced hike. For example, if your CTC goes from Rs 12 lakh to Rs 13.8 lakh (a 15% hike) and Rs 45,000 of the Rs 1.8 lakh increment goes to tax, your net benefit is Rs 1.35 lakh. As a percentage of the original Rs 12 lakh CTC, that's an effective hike of 11.25%.",
  },
  {
    q: 'How does appraisal affect my monthly TDS?',
    a: "Your employer calculates TDS (Tax Deducted at Source) monthly based on your projected annual income. After an appraisal takes effect, the employer recalculates TDS from the effective month. The monthly TDS increases by approximately one-twelfth of the additional annual tax. This calculator shows both the annual additional tax and the monthly take-home change so you can plan your cash flow.",
  },
  {
    q: 'Can I negotiate my salary structure to reduce the tax on my hike?',
    a: "Yes. Requesting a higher component for tax-free allowances (LTA, meal coupons, NPS employer contribution) instead of raw basic pay can reduce the taxable portion of the increment. The employer's NPS contribution under Section 80CCD(2) is deductible up to 10% of basic salary under both regimes. Structuring the hike partly through NPS rather than basic can meaningfully reduce the tax bite on the increment.",
  },
  {
    q: 'What is the tax rate on increments above Rs 10 lakh (new regime)?',
    a: 'Under the new regime for FY 2025-26, income between Rs 12 lakh and Rs 16 lakh is taxed at 15%. Income between Rs 16 lakh and Rs 20 lakh is taxed at 20%. Income between Rs 20 lakh and Rs 24 lakh is taxed at 25%. Income above Rs 24 lakh is taxed at 30%. All tax is subject to 4% health and education cess. The calculator applies these slabs correctly to determine tax on the incremental income.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site. The calculators earn trust. The action platform is the product.',
  },
];

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
  name: 'Annual Appraisal Impact Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/annual-appraisal-impact-calculator',
  description: 'Calculate your real take-home increase after a salary hike. See monthly benefit, additional tax, effective hike percentage, and TDS impact under old and new tax regime. Free, browser-based.',
  featureList: [
    'Monthly Take-Home Increase After Appraisal',
    'Tax on Increment Calculation',
    'Effective Hike Percentage vs Announced Hike',
    'Old Regime and New Regime Comparison',
    'Section 80C and 80D Deduction Support',
    'Donut Chart: Amount Kept vs Amount Lost to Tax',
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
    { '@type': 'ListItem', position: 3, name: 'Annual Appraisal Impact Calculator', item: 'https://fermor.in/calculators/annual-appraisal-impact-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Real Take-Home After a Salary Hike',
  description: 'Step-by-step guide to computing the actual monthly benefit from an appraisal after income tax under the Indian tax regime.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Annual Appraisal Impact Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your current CTC',
      text: 'Type or use the slider to set your current annual CTC before the appraisal. The calculator defaults to Rs 12 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set your appraisal hike percentage',
      text: 'Enter the announced hike percentage you received (e.g., 15%). The calculator immediately shows your new CTC.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select your tax regime',
      text: "Choose old regime or new regime. If you are on old regime, click More settings to enter your 80C and 80D investments for an accurate tax calculation.",
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review your effective hike and monthly benefit',
      text: "The result panel shows your monthly take-home increase, the tax on your increment, your effective hike percentage after tax, and a donut chart showing what fraction of the increment you actually keep.",
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Compare old and new regime',
      text: "Toggle between old and new regime to see which results in a higher net take-home after the appraisal. This helps you decide whether to switch regimes when the hike takes effect.",
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Annual Appraisal',
  alternateName: 'Salary Appraisal',
  description: 'An annual appraisal is the yearly review process in which an employer evaluates employee performance and revises the salary, typically expressed as a percentage increase over the current CTC.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Employment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Performance_appraisal',
    'https://www.wikidata.org/wiki/Q627646',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Annual Appraisal Impact Calculator: Salary Hike Take-Home Calculator',
  description: 'Free annual appraisal impact calculator for India. Calculate your real monthly take-home increase after a salary hike, how much goes to tax, and your effective hike percentage under old and new tax regime.',
  url: 'https://fermor.in/calculators/annual-appraisal-impact-calculator',
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
    { '@type': 'DefinedTerm', name: 'Annual Appraisal', alternateName: 'Salary Hike' },
    { '@type': 'DefinedTerm', name: 'Income Tax India' },
    { '@type': 'DefinedTerm', name: 'Effective Hike Percentage' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Salaried employees in India, Indian IT professionals, NRI employees, HR professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-appraisal-impact',   name: 'What Is an Annual Appraisal Impact Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-hike-affects-tax',        name: 'How a Salary Hike Affects Your Income Tax' },
    { '@type': 'WebPageElement', cssSelector: '#effective-vs-announced-hike', name: 'Why Your Effective Hike Is Less Than the Announced Percentage' },
    { '@type': 'WebPageElement', cssSelector: '#tax-slab-and-hike',           name: 'How Your Tax Slab Determines the Real Value of Your Hike' },
    { '@type': 'WebPageElement', cssSelector: '#old-vs-new-regime-hike',      name: 'Old Regime vs New Regime After an Appraisal' },
    { '@type': 'WebPageElement', cssSelector: '#appraisal-tds',               name: 'How Appraisal Affects Your Monthly TDS' },
    { '@type': 'WebPageElement', cssSelector: '#maximize-take-home',          name: 'How to Maximize Take-Home After an Appraisal' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                  name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                         name: 'Frequently Asked Questions' },
  ],
};

export default async function AnnualAppraisalImpactCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <AnnualAppraisalClient />
    </>
  );
}

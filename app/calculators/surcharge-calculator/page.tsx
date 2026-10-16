import type { Metadata } from 'next';
import SurchargeCalculatorClient from './SurchargeCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/surcharge-calculator`;

  return {
    title: 'Income Tax Surcharge Calculator: FY 2026-27',
    description:
      'Free income tax surcharge calculator for India. Check FY 2026-27 surcharge rates, marginal relief and the capital gains cap for both regimes. Free to use.',
    keywords: [
      'income tax surcharge calculator',
      'surcharge calculator',
      'surcharge calculator fy 2026-27',
      'income tax surcharge calculator india',
      'marginal relief surcharge calculator',
      'new tax regime surcharge calculator',
      'old tax regime surcharge calculator',
      'surcharge rates india',
      'surcharge on capital gains calculator',
      'surcharge on dividend income calculator',
      'surcharge calculator for individual',
      'calculate surcharge marginal relief',
      'marginal relief formula surcharge',
      'surcharge rates fy 2026-27',
      'surcharge rates ay 2027-28',
      'surcharge cap on capital gains',
      'surcharge on 1 crore income',
      'surcharge on 2 crore income',
      'surcharge on 5 crore income',
      'how to calculate surcharge in excel',
      'surcharge vs cess',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Income Tax Surcharge Calculator: FY 2026-27',
      description:
        'Calculate surcharge rates, check marginal relief limits, and compare new and old tax regimes. Free for Indian taxpayers.',
      images: ['https://fermor.in/og-surcharge-calculator.png'],
    },
    openGraph: {
      title: 'Income Tax Surcharge Calculator: FY 2026-27 - Fermor',
      description:
        'Check your surcharge rates and compute marginal relief limits under new and old tax regimes. Supports surcharge caps on dividend and capital gains. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/surcharge-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-surcharge-calculator.png', width: 1200, height: 630, alt: 'Fermor Surcharge Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-10';
const PAGE_DATE_MODIFIED = '2026-10-12';

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
  description: 'Fermor is building the automated financial action layer for India. The system that closes the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Income Tax Surcharge',
    'Marginal Relief',
    'New Tax Regime Slabs',
    'Old Tax Regime Slabs',
    'Capital Gains Surcharge Cap',
    'Dividend Income Tax',
    'Individual Surcharge Rates',
    'Section 87A Rebate',
    'Health and Education Cess',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Income Tax Surcharge Calculator', item: 'https://fermor.in/calculators/surcharge-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is surcharge in income tax?',
    a: 'Surcharge is an extra levy on the income tax payable, charged only when total income crosses Rs 50 lakh. It is a percentage of the tax, not of your income. Health and education cess of 4% is then added on top of tax plus surcharge.',
  },
  {
    q: 'When does surcharge apply?',
    a: 'Surcharge applies when total income exceeds Rs 50 lakh in a financial year. The rate steps up at Rs 1 crore, Rs 2 crore and Rs 5 crore. Income exactly on a threshold is placed in the lower band, so Rs 50 lakh itself attracts no surcharge.',
  },
  {
    q: 'What are the surcharge rates under the new tax regime?',
    a: 'The new regime charges 10% above Rs 50 lakh, 15% above Rs 1 crore and 25% above Rs 2 crore. The 25% rate is the ceiling, so incomes above Rs 5 crore pay no more. The Income Tax Department confirms the 25% cap for taxpayers who opt for the new regime.',
  },
  {
    q: 'What are the surcharge rates under the old tax regime?',
    a: 'The old regime charges 10% above Rs 50 lakh, 15% above Rs 1 crore, 25% above Rs 2 crore and 37% above Rs 5 crore. The 37% band is the main reason the old regime costs more at very high incomes.',
  },
  {
    q: 'Is surcharge calculated on income or on tax?',
    a: 'Surcharge is calculated on the tax, not on the income. If your tax before surcharge is Rs 11,10,000 and the rate is 10%, the gross surcharge is Rs 1,11,000. Marginal relief may then reduce it.',
  },
  {
    q: 'What is marginal relief on surcharge?',
    a: 'Marginal relief stops the extra tax from surcharge exceeding the extra income above a threshold. Without it, earning Rs 1 over Rs 50 lakh could cost over Rs 1 lakh in surcharge. With it, the added tax and surcharge never exceed the income above the threshold.',
  },
  {
    q: 'How is marginal relief calculated?',
    a: 'Compute tax plus surcharge at your income and at the threshold. Add the income above the threshold to the threshold figure. If your tax plus surcharge is higher, the difference is the relief. At Rs 51 lakh under the new regime it is Rs 41,000.',
  },
  {
    q: 'Up to what income does marginal relief apply at Rs 50 lakh?',
    a: 'Under the new regime, marginal relief at the Rs 50 lakh threshold lasts until taxable income of about Rs 51.62 lakh. Under the old regime it lasts until about Rs 51.96 lakh. Above that, the full 10% surcharge applies.',
  },
  {
    q: 'How much is the surcharge on Rs 1 crore income?',
    a: 'On Rs 1 crore of taxable income the surcharge is 10% under both regimes, because Rs 1 crore itself is in the lower band. Under the new regime the surcharge is Rs 2,58,000 on tax of Rs 25,80,000. Total tax with cess is Rs 29,51,520.',
  },
  {
    q: 'How much is the surcharge on Rs 2 crore income?',
    a: 'On Rs 2 crore of taxable income the surcharge is 15%. Under the new regime that is Rs 8,37,000 on tax of Rs 55,80,000, giving total tax of Rs 66,73,680 with cess. Rs 2 crore itself is still in the 15% band.',
  },
  {
    q: 'How much is the surcharge on Rs 5 crore income?',
    a: 'On Rs 5 crore of taxable income the surcharge is 25% under both regimes. Under the new regime it is Rs 36,45,000 on tax of Rs 1,45,80,000. Total tax with cess is Rs 1,89,54,000, an effective rate of 37.91%.',
  },
  {
    q: 'What is the highest surcharge rate in India?',
    a: 'The highest surcharge rate is 37% under the old regime for income above Rs 5 crore. Under the new regime it is capped at 25%. On dividends and eligible capital gains the cap is 15% under both regimes.',
  },
  {
    q: 'What is the surcharge cap on capital gains and dividends?',
    a: 'The surcharge on tax payable on dividend income and on gains taxed under Sections 111A, 112 and 112A is capped at 15%. These sections cover equity short-term gains, long-term gains on other assets and equity long-term gains. The Income-tax Act, 2025 renumbers them from 1 April 2026.',
  },
  {
    q: 'Does the 15% cap apply to all capital gains?',
    a: 'No, the cap covers only the gains taxed under Sections 111A, 112 and 112A, and dividends. Short-term gains taxed at slab rates, such as on gold or unlisted shares, get the full surcharge. Check which section your gain falls under.',
  },
  {
    q: 'Is surcharge charged before or after cess?',
    a: 'Surcharge comes first. Health and education cess of 4% is charged on the sum of tax and surcharge, after any marginal relief. Cess itself has no marginal relief.',
  },
  {
    q: 'What is the maximum effective tax rate with surcharge?',
    a: 'The maximum effective rate is 39% under the new regime and 42.744% under the old regime. These come from the 30% top slab, the 25% or 37% surcharge, and 4% cess: 30% x 1.25 x 1.04 and 30% x 1.37 x 1.04.',
  },
  {
    q: 'Which regime is better for very high incomes?',
    a: 'On the same taxable income, the new regime is cheaper at very high incomes because its surcharge is capped at 25%. At Rs 6 crore the effective rate is 38.09% under the new regime and 42.30% under the old. The old regime can still win if deductions are large.',
  },
  {
    q: 'Does surcharge apply to NRIs?',
    a: 'Yes, non-resident individuals pay surcharge at the same rates and thresholds as residents. The slab rates and exemptions available to them can differ, so the base tax may differ even when the surcharge rate is the same.',
  },
  {
    q: 'Does surcharge apply to HUFs?',
    a: 'Yes, a Hindu Undivided Family pays surcharge at the same rates and thresholds as an individual. The same 15% cap applies to its dividend and eligible capital gains income.',
  },
  {
    q: 'What is the surcharge for partnership firms and LLPs?',
    a: 'Partnership firms and LLPs pay a flat 12% surcharge when total income exceeds Rs 1 crore. There is no 10%, 15% or 25% ladder for them. Marginal relief is available around the Rs 1 crore threshold.',
  },
  {
    q: 'How do I calculate surcharge in Excel?',
    a: 'Use nested IF on total income to pick the rate, then multiply by the tax: =Tax*IF(Inc<=5000000,0,IF(Inc<=10000000,0.1,IF(Inc<=20000000,0.15,IF(Inc<=50000000,0.25,0.37)))). Cap the last rate at 0.25 for the new regime, then subtract marginal relief.',
  },
  {
    q: 'How does this calculator tax capital gains and dividends?',
    a: 'It taxes that income at the rate you set, defaulting to 12.5%, the rate on equity long-term gains above the Rs 1.25 lakh exemption. Change it to 20% for equity short-term gains or to your slab rate for dividends. The surcharge on it is capped at 15%.',
  },
  {
    q: 'Can I reduce my surcharge legally?',
    a: 'You can compare both regimes, claim every eligible deduction under the old regime, and plan when large capital gains are realised, since the 15% cap makes gains cheaper than salary at the top. Surcharge itself cannot be waived.',
  },
  {
    q: 'Did Budget 2026 change surcharge rates?',
    a: 'No change to surcharge rates or the new-regime slabs was announced for FY 2026-27, so the rates on this page continue. The Income-tax Act, 2025 takes effect from 1 April 2026 and renumbers sections, and the tax year replaces the assessment year in its wording.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
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
  name: 'Income Tax Surcharge Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/surcharge-calculator',
  description: 'Calculate income tax surcharge rates and marginal relief under new and old regimes in India.',
  featureList: [
    'New Regime Surcharge rates',
    'Old Regime Surcharge rates',
    'Marginal Relief computation',
    'Dividend and Capital Gains surcharge capping at 15%',
    'Side-by-side regime comparison',
    'Base tax vs Surcharge donut chart',
    'Multi-currency support',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Income Tax Surcharge',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Income Tax Surcharge Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your regular taxable income',
      text: 'Enter your annual taxable income from salary, house property, business, or other sources.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter investment or special income',
      text: 'Enter capital gains or dividend income and the tax rate that applies to it. The surcharge on this income is capped at 15%.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select regime and age',
      text: 'Choose between the new and old tax regimes. Under the old regime, also enter your deductions and select your age group.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review surcharge and marginal relief',
      text: 'Examine the calculated surcharge, marginal relief savings, and effective tax rates.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Surcharge',
  alternateName: 'Income Tax Surcharge',
  description: 'An additional charge levied on the amount of income tax payable when the taxpayer\'s taxable income exceeds Rs 50 lakh.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Tax Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Surcharge',
    'https://www.wikidata.org/wiki/Q120510907',
    'https://www.incometaxindia.gov.in/w/what-is-surcharge-and-how-it-is-computed-',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Income Tax Surcharge Calculator: FY 2026-27',
  url: 'https://fermor.in/calculators/surcharge-calculator',
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
    { '@type': 'DefinedTerm', name: 'Surcharge', alternateName: 'Income Tax Surcharge' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, HNIs, CAs, tax planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-surcharge', name: 'What Is Income Tax Surcharge?' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-rates', name: 'Surcharge Rates in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-surcharge-is-calculated', name: 'How Surcharge Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#marginal-relief', name: 'What Is Marginal Relief?' },
    { '@type': 'WebPageElement', cssSelector: '#marginal-relief-limits', name: 'Marginal Relief Limits by Threshold' },
    { '@type': 'WebPageElement', cssSelector: '#calculation-example', name: 'Worked Surcharge Example' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-by-income', name: 'Surcharge by Income Level' },
    { '@type': 'WebPageElement', cssSelector: '#regime-comparison', name: 'Surcharge: New vs Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#special-income', name: 'Surcharge on Capital Gains and Dividends' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-vs-cess', name: 'Surcharge, Cess and the Peak Tax Rate' },
    { '@type': 'WebPageElement', cssSelector: '#who-pays-surcharge', name: 'Who Pays Surcharge' },
    { '@type': 'WebPageElement', cssSelector: '#age-and-surcharge', name: 'Does Age Change the Surcharge' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-tds-advance-tax', name: 'Surcharge and TDS or Advance Tax' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-in-excel', name: 'Surcharge Calculator in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Surcharge Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SurchargeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SurchargeCalculatorClient faqItems={faqItems} />
    </>
  );
}

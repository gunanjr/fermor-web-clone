import type { Metadata } from 'next';
import PresentValueCalculatorClient from './PresentValueCalculatorClient';

export const metadata: Metadata = {
  title: 'Present Value Calculator: Discount to Today',
  description: 'Free present value calculator for India. Discount a future sum of money to its present value using any rate. See how inflation and returns affect the purchasing power of future money. Free to use.',
  keywords: [
    'present value calculator',
    'present value',
    'pv calculator',
    'present value calculator online',
    'find present value calculator',
    'future value calculator',
    'discount rate calculator',
    'net present value calculator',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/present-value-calculator' },
  openGraph: {
    title: 'Present Value Calculator: Discount to Today - Fermor',
    description: 'Discount a future sum of money to its present value using any rate of return. See exactly how the discount rate and time period change the answer. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/present-value-calculator',
    siteName: 'Fermor',
  },
};

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-09-15';

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
    'Present Value',
    'Time Value of Money',
    'Discount Rate',
    'Net Present Value',
    'Retirement Planning India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Indian Investment Products',
    'Financial Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is present value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Present value (PV) is the current worth of a future amount of money, discounted at a specific rate. It tells you how much you need to invest today to reach a future goal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the present value formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PV = FV / (1 + r)^n, where FV is the future amount, r is the annual discount rate, and n is the number of years. A higher discount rate or longer period reduces the present value.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is present value different from future value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Future value compounds today's money forward. Present value discounts future money backward. They are mathematically inverse concepts using the same formula rearranged.",
      },
    },
    {
      '@type': 'Question',
      name: 'What discount rate should I use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use your expected investment return. For equity, roughly 10 to 12 percent is common. For inflation-adjusted calculations, 5 to 6 percent reflects long-run Indian inflation. The rate you choose changes the present value significantly. Higher rates give lower present values.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does a higher discount rate lower the present value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A higher discount rate assumes your money could earn more elsewhere, so less needs to be set aside today to reach the same future amount. At a 12 percent discount rate, Rs. 1 crore in 15 years is worth about Rs. 18.3 lakh today. At 6 percent, the same Rs. 1 crore is worth about Rs. 41.7 lakh today, since a lower assumed return means more capital is needed now.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is net present value (NPV) and how is it different from present value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Present value discounts a single future amount to today. Net present value goes a step further: it sums the present value of multiple cash flows, both inflows and outflows, across different time periods, and is commonly used to evaluate whether an investment or project is worthwhile. The NPV Calculator handles multi-cash-flow scenarios that this calculator does not.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can present value be used for retirement or education planning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes, though usually in reverse. Most people work forward with a goal amount using a calculator like the Goal Planning Calculator or SIP Calculator to find the monthly investment needed. Present value is more useful for checking whether a lump sum offered today (such as a settlement, bonus, or insurance payout) is fairly priced against an equivalent future amount.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does inflation affect present value calculations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Inflation is one valid choice of discount rate, but not the only one. Using an inflation rate as the discount rate tells you what a future rupee is worth in today's purchasing power. Using an expected investment return instead tells you how much capital you would need to invest today to reach that future amount. These give different answers because inflation and investment returns are usually not the same number.",
      },
    },
    {
      '@type': 'Question',
      name: "Is present value the same as a bond's price?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A bond's fair price is calculated using the same present value principle, applied to each future coupon payment and the final principal repayment, each discounted back to today at the bond's yield. This calculator handles a single future amount rather than a stream of coupon payments, so it approximates the concept rather than pricing a bond directly.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does the government use present value to calculate a commuted pension?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Under the CCS (Commutation of Pension) Rules, 1981, a central government employee can commute up to 40 percent of their monthly pension for an immediate lump sum. That lump sum is the present value of the pension given up, calculated using an official age-based commutation factor table published by the Department of Pension and Pensioners' Welfare, since a younger retiree is expected to draw the pension for more years.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is present value used in motor accident compensation claims in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Indian courts convert a victim\'s future lost income into a present lump sum compensation using a "multiplier method," standardised by the Supreme Court in Sarla Verma v. Delhi Transport Corporation (2009). The multiplier, based on the victim\'s age, approximates the present value of the income they would have earned over their remaining working years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a commuted pension lump sum taxable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 10(10A) of the Income Tax Act, the commuted portion of a pension is fully tax-exempt for government employees. For non-government employees, it is exempt up to one-third of the commuted value if gratuity is also received, or one-half if it is not, with the balance taxed as regular income.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does IRDAI use present value to set life insurance surrender values?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Under IRDAI's October 2024 Master Circular, a policy's Special Surrender Value must be at least the present value of the paid-up sum assured, future benefits, and bonuses. Insurers must discount those future amounts at a rate capped at the 10-year G-Sec yield plus 0.5 percentage points, reviewed annually, so the discount rate cap directly protects how much a policyholder receives on early exit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Does present value apply to my NPS annuity purchase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. PFRDA requires a share of an NPS corpus, 40 percent for government employees and 20 percent for other subscribers under current rules, to be used to buy an annuity at retirement rather than withdrawn as a lump sum. The annuity provider prices that commitment using the present value of the future monthly pension payments it will owe you.',
      },
    },
    {
      '@type': 'Question',
      name: "What is EPFO's Table D and how does it relate to present value?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Table D is the factor table EPFO uses to calculate the lump sum withdrawal benefit for an EPS member who exits before completing 10 years of service. The factor scales with completed years of service and pensionable salary, working like a simplified present-value multiplier rather than paying out the exact contributions made.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between present value and discounted cash flow (DCF)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Present value and discounted cash flow use the identical underlying math: discounting a future amount back to today using a chosen rate. "Present value" typically refers to discounting a single future sum, while "DCF" usually refers to discounting an entire series of future cash flows, such as a business\'s projected profits over several years, and summing them, which is closer to what net present value (NPV) does.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor Present Value Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Discount a future amount to its present value using any rate of return. Free to use.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate the Present Value of a Future Amount',
  description: 'Step-by-step guide to discount a future sum of money to its present value.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Present Value Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the future amount',
      text: 'Input the sum of money you will have, need, or have been offered at a future date.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the discount rate',
      text: 'Enter the annual rate used to discount that future amount back to today, matched to what the money would realistically earn elsewhere.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the time period',
      text: 'Enter the number of years between today and the future date.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View the present value',
      text: 'The calculator instantly shows the present value, the discount amount, and a donut chart of the split between the two.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Present Value',
  alternateName: 'PV',
  description: 'The current worth of a future sum of money, discounted at a specific rate of return, based on the time value of money.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Present_value',
    'https://www.wikidata.org/wiki/Q187131',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Present Value Calculator', item: 'https://fermor.in/calculators/present-value-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Present Value Calculator: Discount to Today',
  description: 'Free present value calculator for India. Discount a future sum of money to its present value using any rate of return.',
  url: 'https://fermor.in/calculators/present-value-calculator',
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
    { '@type': 'DefinedTerm', name: 'Present Value', alternateName: 'PV' },
    { '@type': 'DefinedTerm', name: 'Future Value', alternateName: 'FV' },
    { '@type': 'DefinedTerm', name: 'Net Present Value', alternateName: 'NPV' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian investors, retirement planners, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-present-value', name: 'What is present value' },
    { '@type': 'WebPageElement', cssSelector: '#pv-formula', name: 'The present value formula' },
    { '@type': 'WebPageElement', cssSelector: '#pv-worked-example', name: 'Worked example' },
    { '@type': 'WebPageElement', cssSelector: '#choosing-discount-rate', name: 'Choosing the right discount rate' },
    { '@type': 'WebPageElement', cssSelector: '#pv-in-indian-law', name: 'Present value in Indian government schemes and law' },
    { '@type': 'WebPageElement', cssSelector: '#pv-vs-fv', name: 'Present value versus future value' },
    { '@type': 'WebPageElement', cssSelector: '#pv-real-world-uses', name: 'Practical situations where present value matters' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this calculator' },
    { '@type': 'WebPageElement', cssSelector: '#pv-limitations', name: 'Limitations of this calculator' },
    { '@type': 'WebPageElement', cssSelector: '#pv-common-mistakes', name: 'Common mistakes when calculating present value' },
    { '@type': 'WebPageElement', cssSelector: '#pv-real-vs-nominal', name: 'Real versus nominal discount rates' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PresentValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PresentValueCalculatorClient />
    </>
  );
}

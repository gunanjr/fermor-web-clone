import type { Metadata } from 'next';
import GoalPlanningCalculatorClient from './GoalPlanningCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/goal-planning-calculator';
  return {
    title: 'Goal Planning Calculator: Goal-Based SIP & Lumpsum Planner',
    description:
      'Free goal planning calculator for India. Find the monthly SIP or lumpsum needed for any financial goal, factoring in existing savings. Includes worked SIP tables and goal benchmarks. Free to use.',
    keywords: [
      'goal planning calculator',
      'goal sip calculator',
      'goal calculator',
      'financial goal planner',
      'goal planner calculator',
      'goal based sip calculator',
      'financial goal calculator',
      'financial planning calculator',
      'financial goal planner calculator',
      'sip goal planner',
      'goal calculator sip',
      'goal planner',
      'sip goal planner calculator',
      'goal planning',
      'sip calculator goal',
      'sip calculator goal based',
      'multi goal sip',
      'goal calculator mutual fund',
      'goal planning sip calculator',
      'goal sip',
      'sip goal',
      'multi goal sip plan',
      'goal based investment calculator',
      'goal based sip',
      'sip goal calculator',
      'money goal calculator',
      'sip calculator for goal',
      'sip calculator with goal',
      'goal amount calculator',
      'goal planner india',
      'mutual fund goal planner',
      'sip goal based calculator',
      'goal oriented sip calculator',
      'mf goal calculator',
      'mutual fund goal calculator',
      'goal based financial planning calculator',
      'investment plan calculator',
      'monthly investment plan calculator',
      'sip investment calculator',
      'lumpsum sip investment calculator',
      'savings plan calculator',
      '10 year investment plan calculator',
      'goals calculator',
      'saving goal calculator',
      'savings target calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Goal Planning Calculator: Goal-Based SIP & Lumpsum Planner',
      description:
        'Find the monthly SIP or one-time lumpsum needed to reach any financial goal, accounting for savings you already have. Free for India.',
      images: ['https://fermor.in/og-goal-planning-calculator.png'],
    },
    openGraph: {
      title: 'Goal Planning Calculator: Goal-Based SIP & Lumpsum Planner',
      description:
        'Find the monthly SIP or one-time lumpsum needed to reach any financial goal, accounting for savings you already have. Includes worked SIP tables, goal benchmarks for India, and year-by-year progress. Free to use.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-goal-planning-calculator.png', width: 1200, height: 630, alt: 'Fermor Goal Planning Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-06-15';
const PAGE_DATE_MODIFIED = '2026-09-15';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Goal-Based Financial Planning',
    'Systematic Investment Plan',
    'Mutual Fund Returns',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'Retirement Planning',
    'Financial Planning India',
    'NRI Investments',
    'Tax Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a goal planning calculator?', acceptedAnswer: { '@type': 'Answer', text: 'A goal planning calculator, also called a financial goal planner or goal-based SIP calculator, works out the monthly SIP or lumpsum needed today to reach a target amount by a future date. Enter the target, an expected return, and a time horizon, and it solves for the missing number.' } },
    { '@type': 'Question', name: 'How is the required monthly SIP calculated?', acceptedAnswer: { '@type': 'Answer', text: 'The calculator uses the annuity-due formula: Monthly SIP = Target / [((1 + i)^n minus 1) / i times (1 + i)], where i is the monthly return rate and n is the number of months. This assumes each instalment compounds monthly and is invested at the start of the month.' } },
    { '@type': 'Question', name: 'What if I already have some savings toward this goal?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the amount in the Existing Savings slider. The calculator projects that amount forward at your assumed return rate, subtracts it from the target, and solves the SIP or lumpsum only for the remaining gap.' } },
    { '@type': 'Question', name: 'Should I use a monthly SIP or a one-time lumpsum for my goal?', acceptedAnswer: { '@type': 'Answer', text: 'Use the SIP tab if you are investing from ongoing income. Use the Lumpsum tab if you have a bonus, inheritance, or sale proceeds to deploy today. The Lumpsum tab shows what a one-time investment needs to be for the same goal, rate, and time horizon.' } },
    { '@type': 'Question', name: 'Can I plan for more than one financial goal at a time?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator solves one goal at a time. For multiple goals such as a house down payment and a child\'s education, run the calculation separately for each goal at its own target, return rate, and horizon, then add the resulting monthly SIP figures together.' } },
    { '@type': 'Question', name: 'What return rate should I assume for goal planning?', acceptedAnswer: { '@type': 'Answer', text: 'For equity mutual funds, 10 to 12 percent is a common long-term assumption. For debt funds, PPF, or FDs, use 6 to 8 percent. For a balanced portfolio, 8 to 10 percent is reasonable. These are historical ranges, not guaranteed returns.' } },
    { '@type': 'Question', name: 'Does this calculator account for inflation?', acceptedAnswer: { '@type': 'Answer', text: 'No. The target amount is treated in today\'s rupees. If your goal is several years away, inflate the target first using the Inflation Calculator, since a goal worth Rs 10 lakh today needs roughly Rs 18 lakh in 10 years at 6 percent inflation.' } },
    { '@type': 'Question', name: 'How much SIP do I need for Rs 1 crore in 15 years?', acceptedAnswer: { '@type': 'Answer', text: 'At a 12 percent assumed annual return, reaching Rs 1 crore in 15 years needs a monthly SIP of roughly Rs 21,000. At 10 percent, the same goal needs about Rs 24,900 a month.' } },
    { '@type': 'Question', name: 'What is the difference between a goal calculator and a regular SIP calculator?', acceptedAnswer: { '@type': 'Answer', text: 'A regular SIP calculator starts from a fixed monthly amount and projects what it grows to. A goal-based SIP calculator works backward from a fixed target amount and solves for the monthly investment required to reach it.' } },
    { '@type': 'Question', name: 'Can I use this calculator for retirement planning?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Enter your desired retirement corpus as the target, your expected long-term return, and the years remaining until retirement. For a dedicated retirement worksheet that also factors in post-retirement withdrawals, use the Retirement Calculator.' } },
    { '@type': 'Question', name: 'Can I use this for a child\'s education or wedding goal?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Education and wedding costs both rise with inflation, so estimate the future cost first rather than using today\'s fee or cost figure as the target. A private engineering degree costing Rs 15 lakh today could cost over Rs 28.5 lakh in 12 years at 5.5 percent education inflation.' } },
    { '@type': 'Question', name: 'What is a step-up SIP and does this calculator support it?', acceptedAnswer: { '@type': 'Answer', text: 'A step-up SIP increases the monthly instalment every year, usually in line with salary growth, which reaches the same goal with a lower starting SIP. This calculator assumes a flat monthly SIP throughout. For a step-up projection, use the dedicated Step-Up SIP Calculator.' } },
    { '@type': 'Question', name: 'Why does the required SIP change so much with the return rate?', acceptedAnswer: { '@type': 'Answer', text: 'A goal further out gives compounding more years to work, and a higher return rate compounds faster within those years. For a Rs 50 lakh goal in 10 years, the required SIP is about Rs 27,600 a month at 8 percent but only about Rs 22,300 a month at 12 percent.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Goal Planning Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/goal-planning-calculator',
  description: 'Calculate the monthly SIP or one-time lumpsum needed to reach a financial goal, accounting for existing savings, with a year-by-year progress table and multi-currency support.',
  featureList: [
    'Monthly SIP calculator for a target goal',
    'Lumpsum calculator for a target goal',
    'Existing savings adjustment',
    'Year-by-year goal progress table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Time horizon presets',
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
    { '@type': 'ListItem', position: 3, name: 'Goal Planning Calculator', item: 'https://fermor.in/calculators/goal-planning-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Plan a Financial Goal with a Goal-Based SIP Calculator',
  description: 'Step-by-step guide to finding the monthly SIP or lumpsum needed to reach a financial goal.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Goal Planning Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Set your target amount', text: 'Enter the corpus you need at the end of the horizon, in today\'s rupees or already inflation-adjusted.' },
    { '@type': 'HowToStep', position: 2, name: 'Set an expected return', text: 'Enter the annual return you expect from the asset class you plan to invest in.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the time horizon', text: 'Enter the number of years until you need the money, or use a preset.' },
    { '@type': 'HowToStep', position: 4, name: 'Add existing savings', text: 'Enter any amount already set aside for this goal so the calculator nets it off the target.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the required SIP or lumpsum', text: 'Switch between the Monthly SIP tab and the Lumpsum tab to see either required investment method.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Goal-Based Financial Planning',
  alternateName: 'Goal Planning',
  description: 'A financial planning method that starts from a specific future target amount and works backward to determine the savings or investment required today to reach it by a set date.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: ['https://en.wikipedia.org/wiki/Financial_plan'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Goal Planning Calculator: Goal-Based SIP & Lumpsum Planner',
  description: 'Free goal planning calculator for India. Find the monthly SIP or lumpsum needed for any financial goal, factoring in existing savings.',
  url: 'https://fermor.in/calculators/goal-planning-calculator',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Goal-Based Financial Planning', alternateName: 'Goal Planning' },
    { '@type': 'DefinedTerm', name: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'Lumpsum Investment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors, first-time SIP investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-goal-planning', name: 'What Is a Goal Planning Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#goal-planning-formula', name: 'Goal Planning Formula' },
    { '@type': 'WebPageElement', cssSelector: '#existing-savings', name: 'How Existing Savings Reduce Your SIP' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples', name: 'Monthly SIP for Common Goal Amounts' },
    { '@type': 'WebPageElement', cssSelector: '#return-rate', name: 'Choosing the Right Return Rate' },
    { '@type': 'WebPageElement', cssSelector: '#goal-planning-india', name: 'Goal Planning for Common Life Goals in India' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes in Goal Planning' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function GoalPlanningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <GoalPlanningCalculatorClient />
    </>
  );
}

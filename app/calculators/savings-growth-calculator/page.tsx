import type { Metadata } from 'next';
import SavingsGrowthCalculatorClient from './SavingsGrowthCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/savings-growth-calculator';
  return {
    title: 'Savings Growth Calculator: Savings Growth Tracker',
    description:
      'Free savings growth calculator for India. Track how your savings grow with regular contributions, compound interest, and step-up deposits. Year-by-year breakdown. Free to use.',
    keywords: [
      'savings growth calculator',
      'savings growth tracker',
      'savings calculator',
      'savings account growth calculator',
      'monthly savings growth calculator',
      'savings projection calculator',
      'savings accumulation calculator',
      'long term savings calculator',
      'savings tracker calculator',
      'savings rate of return calculator',
      'compound savings calculator',
      'regular savings calculator',
      'savings plan calculator',
      'savings goal calculator',
      'how much will my savings grow calculator',
      'savings interest growth calculator',
      'savings balance growth calculator',
      'savings corpus calculator',
      'savings wealth calculator',
      'savings return calculator',
      'calculate savings growth over time',
      'savings over 10 years calculator',
      'savings over 20 years calculator',
      'savings over 30 years calculator',
      'savings growth rate calculator',
      'investment savings calculator',
      'monthly deposit growth calculator',
      'step up savings calculator',
      'savings growth with contributions',
      'savings compound interest calculator india',
      'savings account balance calculator',
      'savings target calculator',
      'future savings calculator',
      'savings projection india',
      'savings growth india',
      'bank savings growth calculator',
      'fd savings growth calculator',
      'savings and investment calculator',
      'long term wealth calculator',
      'savings maturity calculator',
      'savings amount calculator',
      'savings return projection',
      'calculate future savings value',
      'savings growth estimator',
      'savings fund calculator',
      'savings accumulation india',
      'compounding savings calculator',
      'annual savings growth calculator',
      'savings goal tracker',
      'personal savings calculator india',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Savings Growth Calculator: Savings Growth Tracker',
      description:
        'Track how your savings grow with regular contributions and compound interest. Year-by-year breakdown, step-up deposits, and goal comparison. Free India savings tracker.',
      images: ['https://fermor.in/og-savings-growth-calculator.png'],
    },
    openGraph: {
      title: 'Savings Growth Calculator: Savings Growth Tracker',
      description:
        'Free savings growth calculator for India. Project how your savings grow with monthly deposits, step-up contributions, compound interest, and inflation adjustment. Includes year-by-year table and goal comparison.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-savings-growth-calculator.png', width: 1200, height: 630, alt: 'Savings Growth Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-21';
const PAGE_DATE_MODIFIED  = '2026-07-21';

const faqItems = [
  {
    q: 'How do I calculate savings growth over time?',
    a: 'Savings growth over time is calculated using the future value of an annuity formula: FV = PMT x ((1 + r)^n - 1) / r, where PMT is your monthly deposit, r is the monthly interest rate (annual rate / 12), and n is the total number of months. For a starting balance, add the future value of a lump sum: FV_lump = P x (1 + r)^n. Together, these two formulas give your total corpus at any point in time. The savings growth calculator on this page applies both formulas simultaneously and shows the year-by-year breakdown.',
  },
  {
    q: 'How much will Rs 10,000 per month savings grow to in 20 years?',
    a: 'Rs 10,000 per month saved at 7% annual interest compounded monthly over 20 years grows to approximately Rs 52.4 lakh. At 10% annual interest, the same Rs 10,000 monthly grows to approximately Rs 76.6 lakh. At 12% (equity mutual fund long-term average), it grows to approximately Rs 99.9 lakh -- nearly Rs 1 crore. The difference between 7% (FD rate) and 12% (equity SIP) over 20 years on Rs 10,000 monthly is Rs 47.5 lakh, purely from the higher compounding rate.',
  },
  {
    q: 'How much should I save each month to reach Rs 1 crore?',
    a: 'To reach Rs 1 crore at 12% annual return: in 10 years, you need to save Rs 43,470 per month. In 15 years, Rs 19,800 per month. In 20 years, Rs 10,010 per month. In 25 years, Rs 5,320 per month. In 30 years, Rs 2,860 per month. The required monthly saving halves roughly every 5 years at 12% CAGR because of the exponential nature of compounding. Starting early is the most powerful lever to reduce the monthly savings burden.',
  },
  {
    q: 'What is a step-up savings plan?',
    a: 'A step-up savings plan increases your monthly savings amount by a fixed percentage each year, typically 5% to 15%. This mirrors how salaries typically grow and allows your savings rate to keep pace with income growth without requiring a large monthly commitment upfront. A Rs 5,000 monthly SIP stepped up by 10% each year becomes Rs 5,500 in year 2, Rs 6,050 in year 3, and Rs 12,969 in year 10. Over 20 years, a step-up SIP substantially outperforms a flat SIP started at the final year\'s higher amount.',
  },
  {
    q: 'How does inflation affect savings growth?',
    a: 'Inflation reduces the real purchasing power of your savings. If your savings earn 7% annually and inflation runs at 5%, your real return is approximately 1.9% using the Fisher equation: Real Return = (1 + nominal) / (1 + inflation) - 1. For long-term goals like retirement, always calculate the inflation-adjusted corpus required. A retirement goal of Rs 5 crore in today\'s terms becomes Rs 8.14 crore in 15 years at 5% inflation. Use the inflation-adjusted mode in this savings tracker to account for this.',
  },
  {
    q: 'What is the difference between savings growth and SIP returns?',
    a: 'Savings growth in this calculator refers to depositing a fixed amount each month into an interest-bearing account (like a savings account, FD, or RD) at a fixed guaranteed rate. SIP (Systematic Investment Plan) returns are for mutual fund investments where the rate of return is not fixed and varies with market performance. A 7% savings account has guaranteed growth; a 12% SIP assumes equity market returns that may fluctuate year to year. The savings growth calculator is best for modeling guaranteed-rate instruments. For SIP, use the dedicated SIP Calculator.',
  },
  {
    q: 'How does compound interest grow savings faster than simple interest?',
    a: 'With simple interest, interest is earned only on the principal. With compound interest, interest is earned on the principal plus all previously earned interest. On Rs 1,00,000 at 7% over 10 years: simple interest gives Rs 70,000 total interest (Rs 1,70,000). Compound interest (annually) gives Rs 96,715 total interest (Rs 1,96,715). The difference grows exponentially over longer periods: over 30 years, compound interest on Rs 1,00,000 at 7% gives Rs 6,61,227 versus Rs 2,10,000 with simple interest.',
  },
  {
    q: 'Should I use a savings account or FD for long-term savings?',
    a: 'For long-term savings (3 years or more), an FD offers significantly higher rates (6.5% to 7.75%) compared to savings accounts (2.7% to 7%). The key differences: savings accounts offer full liquidity with penalty-free withdrawal, while FDs charge premature withdrawal penalties of 0.5% to 1%. For an emergency fund, a savings account or liquid fund is better. For a goal-based savings target 2 to 5 years away, an FD ladder strategy locks in higher rates while maintaining periodic liquidity.',
  },
  {
    q: 'How much do I need to save for a house down payment?',
    a: 'A typical home in a Tier-1 Indian city costs Rs 80 lakh to Rs 2 crore. Banks finance 75% to 80% of the property value, requiring a down payment of 20% to 25%. For a Rs 1 crore property, you need Rs 20-25 lakh down payment plus Rs 3-5 lakh for registration, stamp duty, and legal costs. Saving Rs 25,000 per month for 5 years at 7% annual interest gives approximately Rs 18.1 lakh. Saving Rs 40,000 monthly for the same period gives Rs 29 lakh. Use the savings tracker to set a target date and find the required monthly contribution.',
  },
  {
    q: 'What is the Rule of 72 for savings?',
    a: 'The Rule of 72 estimates how many years it takes to double your savings: Years to double = 72 / Annual Interest Rate. At 7% annual interest: 72 / 7 = approximately 10.3 years. At 12%: 72 / 12 = 6 years. At 3% (typical savings account): 72 / 3 = 24 years. This rule only applies to lump-sum amounts without additional deposits. For savings with monthly contributions, the doubling happens much faster because new money is being added continuously.',
  },
  {
    q: 'How does starting balance affect savings growth?',
    a: 'An existing starting balance has a disproportionate impact on long-term savings because it compounds from day one while new contributions are added gradually. Rs 5,00,000 starting balance at 8% for 20 years grows to Rs 23.3 lakh from that balance alone. Adding Rs 10,000 monthly for the same 20 years at 8% adds Rs 58.9 lakh. The combined corpus is Rs 82.2 lakh. Without the starting balance (just Rs 10,000 monthly at 8%): Rs 58.9 lakh. The starting balance contributed Rs 23.3 lakh in growth on Rs 5 lakh invested -- a 4.66x multiplication.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform providing free financial calculators and a financial eligibility engine. The savings growth tracker is part of a suite of 525+ calculators covering savings, SIP, home loans, tax, and retirement planning. Fermor is free at fermor.in.',
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

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Savings Growth Tracker by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/savings-growth-calculator',
  featureList: [
    'Savings corpus projection with starting balance and monthly deposits',
    'Step-Up Savings: annual percentage increase in monthly contribution',
    'Goal Tracker: set a target amount and see if you reach it',
    'Inflation-adjusted real value projection',
    'Year-by-year growth table with interest vs principal split',
    'Compounding frequency: monthly, quarterly, annual',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Donut chart: contributions vs interest earned split',
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
    { '@type': 'ListItem', position: 3, name: 'Savings Growth Calculator', item: 'https://fermor.in/calculators/savings-growth-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Track Savings Growth Using This Calculator',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Savings Growth Tracker' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter starting balance', text: 'Enter any existing savings balance. This is the lump sum that starts compounding from day one. If you are starting from zero, enter 0.' },
    { '@type': 'HowToStep', position: 2, name: 'Set monthly contribution', text: 'Enter the amount you plan to add to savings each month. Use the Step-Up toggle to increase this by a fixed percentage each year to model salary-linked savings increases.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose interest rate and compounding', text: 'Enter the annual interest rate. Choose monthly compounding for savings accounts and RDs (as credited by Indian banks), or quarterly for FDs. Set your time horizon using year presets.' },
    { '@type': 'HowToStep', position: 4, name: 'Set a savings goal (optional)', text: 'Enable the Goal Tracker and enter a target amount (e.g., Rs 50 lakh for a house down payment). The calculator shows whether you will reach this goal within your time horizon and by what year you cross it.' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system.',
  knowsAbout: ['Savings Growth', 'Compound Interest', 'Step-Up SIP', 'Fixed Deposit India', 'Personal Finance India', 'Inflation Adjustment', 'SEBI Regulations', 'AMFI Guidelines'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Savings Growth Calculator: Savings Growth Tracker',
  url: 'https://fermor.in/calculators/savings-growth-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Savings Growth', alternateName: 'Savings Accumulation' },
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
    { '@type': 'DefinedTerm', name: 'Step-Up Savings' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian savers, goal-based investors, young professionals, families planning for education or retirement',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#how-savings-grow', name: 'How Savings Grow with Compound Interest' },
    { '@type': 'WebPageElement', cssSelector: '#monthly-savings-corpus', name: 'Monthly Savings Corpus at Different Rates' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-savings', name: 'What Is a Step-Up Savings Plan?' },
    { '@type': 'WebPageElement', cssSelector: '#savings-vs-sip', name: 'Savings Account vs SIP: Which Grows Faster?' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-savings', name: 'How Inflation Affects Your Savings' },
    { '@type': 'WebPageElement', cssSelector: '#savings-goals-india', name: 'Common Savings Goals for Indians' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Savings Growth Tracker' },
    { '@type': 'WebPageElement', cssSelector: '#faq-section', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Savings Growth',
  alternateName: 'Savings Accumulation',
  description: 'Savings growth is the increase in the value of a savings corpus over time due to compound interest earned on both the principal amount and regular contributions.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Personal Finance Terms India', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Compound_interest', 'https://www.wikidata.org/wiki/Q208189'],
};

const schemas = [faqSchema, webAppSchema, breadcrumbSchema, howToSchema, organizationSchema, webPageSchema, definedTermSchema];

export default function SavingsGrowthCalculatorPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <SavingsGrowthCalculatorClient faqItems={faqItems} />
    </>
  );
}

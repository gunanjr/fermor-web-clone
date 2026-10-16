import type { Metadata } from 'next';
import MonthlyInvestmentClient from './MonthlyInvestmentClient';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'calculators' : region;
  const canonical = `https://fermor.in/${canonicalPath}/monthly-investment-calculator`;
  return {
    title: 'Monthly Investment Calculator: How Much to Invest',
    description:
      'Free monthly investment calculator for India. Find out exactly how much you need to invest each month to reach your financial goal. Supports step-up SIPs, inflation adjustment, and delay impact analysis.',
    keywords: [
      'monthly investment calculator',
      'how much to invest monthly',
      'monthly investment required',
      'reverse sip calculator',
      'goal based investment calculator',
      'monthly sip calculator',
      'how much to save monthly',
      'monthly investment for 1 crore',
      'monthly investment plan',
      'sip required for goal',
      'monthly investment india',
      'target corpus calculator',
      'monthly savings calculator',
      'step up sip calculator',
      'inflation adjusted investment',
      'goal based sip calculator',
      'monthly investment calculator for retirement',
      'monthly investment calculator for child education',
      'how much sip needed for target amount',
      'monthly investment calculator excel',
      'monthly investment calculator with inflation',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Monthly Investment Calculator: How Much to Invest Every Month',
      description:
        'Find exactly how much you need to invest monthly to reach your financial goal. Supports step-up SIPs, inflation, and delay impact.',
      images: ['https://fermor.in/og-monthly-investment-calculator.png'],
    },
    openGraph: {
      title: 'Monthly Investment Calculator: How Much to Invest Every Month',
      description:
        'Reverse-engineer your financial goals. Enter your target corpus, time horizon, and expected returns to find your exact monthly investment requirement. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/monthly-investment-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-monthly-investment-calculator.png', width: 1200, height: 630, alt: 'Fermor Monthly Investment Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-17';
const PAGE_DATE_PUBLISHED = '2026-07-16';

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
  description: 'Fermor is building the automated financial action layer for India, connecting real financial accounts through the Account Aggregator framework and closing the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Monthly Investment Planning',
    'SIP Calculator',
    'Goal Based Investing',
    'Personal Finance India',
    'Compound Interest',
    'Financial Planning India',
    'Step-Up SIP',
    'Inflation Adjustment',
    'Mutual Fund Investments',
    'Retirement Planning',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const faqs = [
  {
    q: 'What is a Monthly Investment Calculator?',
    a: 'A Monthly Investment Calculator is a reverse-engineered SIP calculator. Instead of telling you what your monthly investment will grow into, you input your end goal, time horizon, and expected return rate, and it tells you exactly how much you need to invest every month to reach that target.',
  },
  {
    q: 'How much should I invest every month?',
    a: 'The required monthly investment depends on three factors: the size of your goal, your time horizon, and your expected rate of return. A 1 Crore goal might need around 43,000 per month over 10 years at 12% annual returns, but only about 10,000 per month if you have 20 years.',
  },
  {
    q: 'How does the duration impact my monthly investment?',
    a: 'Time is the biggest factor in compound interest. Increasing your investment duration by just a few years can drastically reduce the monthly amount you need. Starting 5 years earlier can cut your required SIP by nearly half for the same goal.',
  },
  {
    q: 'What is Goal Inflation Adjustment?',
    a: 'The cost of things increases over time. A house that costs 1 Crore today might cost 1.8 Crore in 10 years at 6% inflation. Enabling Goal Inflation Adjustment inflates your target corpus to its future value before calculating your required monthly investment.',
  },
  {
    q: 'What is the Annual Step-Up?',
    a: 'An Annual Step-Up assumes you increase your monthly SIP by a fixed percentage every year as your salary grows. A 10% annual step-up on a 20,000 SIP means 22,000 in year two, 24,200 in year three, and so on. This lets you start with a smaller amount today and still hit your goal.',
  },
  {
    q: 'How does delaying by one year affect my investment?',
    a: 'Delaying your start by even one year can increase your required monthly investment by 10 to 20 percent, depending on the time horizon. The calculator shows the exact cost of delay for your specific goal and return assumptions.',
  },
  {
    q: 'What return rate should I assume for my calculations?',
    a: 'For conservative planning, use 8% for debt-heavy portfolios and 10 to 12% for balanced equity-heavy portfolios. The Nifty 50 has delivered roughly 11 to 13% CAGR over 10-year periods historically. Use the Return Rate Scenarios section in the calculator to compare 8%, 12%, and 15% side by side.',
  },
  {
    q: 'How do current savings affect the required monthly investment?',
    a: 'If you already have savings, the calculator compounds them at your expected return rate and subtracts the future value from your target. This reduces the gap your monthly SIP needs to fill, lowering your required investment.',
  },
  {
    q: 'What is the difference between this and a regular SIP calculator?',
    a: 'A regular SIP calculator takes your monthly investment as input and shows the future value. This calculator works in reverse: you give it the goal, and it finds the required monthly investment. Both use the same compound interest formula, just solving for different unknowns.',
  },
  {
    q: 'Can I use this for retirement planning?',
    a: 'Yes. Set your retirement corpus as the target, your years until retirement as the duration, and your expected post-retirement or pre-retirement return rate. The calculator will show the monthly investment needed. Use the inflation adjustment to account for rising living costs over your working years.',
  },
  {
    q: 'Does this calculator account for tax?',
    a: 'No. The calculator uses pre-tax return assumptions. Actual returns on equity mutual funds are subject to capital gains tax, and debt instruments are taxed differently. Use this as a planning baseline and consult a CA for tax-adjusted projections.',
  },
  {
    q: 'What is a realistic monthly investment amount for a 1 Crore goal?',
    a: 'At 12% expected annual returns over 10 years, you need approximately 43,041 per month. Over 15 years, it drops to about 19,819. Over 20 years, roughly 10,009. The Time on Goals table in the calculator shows these comparisons for your specific assumptions.',
  },
  {
    q: 'Can I use this calculator for goals other than retirement?',
    a: 'Any financial goal works: a house down payment, children\u2019s education, wedding expenses, or building an emergency corpus. Enter the future cost of the goal as your target, set the time horizon, and the calculator gives you the monthly investment needed.',
  },
  {
    q: 'How much does a step-up SIP reduce my starting monthly investment?',
    a: 'For a 1 Crore goal over 10 years at 12% returns, a flat SIP needs about 43,041 per month, while a 10% annual step-up lowers the starting amount to roughly 29,636, a reduction of about 31%. The instalment then grows by 10% every year, so later contributions make up the difference.',
  },
  {
    q: 'How much do existing savings reduce my required SIP?',
    a: 'Existing savings are compounded forward to your goal date at your expected return rate, and that future value is subtracted from your target. For a 1 Crore goal over 10 years at 12%, 10 lakh in existing savings grows to about 31.06 lakh, cutting the required monthly SIP from 43,041 to roughly 29,673.',
  },
  {
    q: 'What happens if I ignore the Goal Inflation Adjustment toggle?',
    a: 'Leaving it off assumes your target corpus never changes in nominal terms, which understates what you actually need. A 1 Crore goal 15 years away is really worth about 2.4 Crore in future rupees at 6% inflation, which raises the required monthly SIP from 19,819 to roughly 47,496.',
  },
  {
    q: 'What return rate should I use for a house down payment goal?',
    a: 'Since a down payment goal usually has a short 3 to 7 year horizon, a debt-leaning assumption of 7 to 9% is more appropriate than an equity-heavy assumption, since there is less time to recover from a bad market year before you need the money.',
  },
  {
    q: 'Can this calculator handle a wedding or education fund goal?',
    a: 'Yes, any target amount and time horizon works. For weddings, a 3 to 8 year horizon with a 7 to 9% conservative assumption is typical. For a child’s education, a longer 10 to 18 year horizon allows a more balanced 10 to 12% assumption, similar to what the Education Corpus Calculator uses.',
  },
  {
    q: 'Why does my required SIP look different from a plain SIP calculator’s reverse math?',
    a: 'Both use the identical compound interest formula, so the numbers should match exactly for the same inputs. A mismatch usually means a different compounding assumption (monthly versus annual) or a different existing-savings and step-up configuration between the two tools, not an error in either calculator.',
  },
  {
    q: 'Does the required monthly investment change if I invest quarterly instead of monthly?',
    a: 'This calculator solves specifically for a monthly instalment. A quarterly investment of the same annual total generally requires a slightly higher per-instalment amount, since the money invested compounds for fewer, larger sub-periods rather than smaller, more frequent monthly deposits.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. The calculators are the distribution layer: free tools that answer real financial questions with clear math. The product being built is an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing and doing.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Monthly Investment Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/monthly-investment-calculator',
  description: 'Find exactly how much you need to invest each month to reach your financial goals. Supports goal inflation adjustment, step-up SIPs, delay impact analysis, and return rate scenario comparison.',
  featureList: [
    'Required Monthly Investment Calculator',
    'Goal Inflation Adjustment',
    'Annual Step-Up SIP',
    'Delay Impact Analysis',
    'Return Rate Scenarios (8%, 12%, 15%)',
    'Time on Goals Comparison Table',
    'Goal Achievement Timeline Chart',
    'Multi-currency support',
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
    { '@type': 'ListItem', position: 3, name: 'Monthly Investment Calculator', item: 'https://fermor.in/calculators/monthly-investment-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Required Monthly Investment',
  description: 'Step-by-step guide to find out how much you need to invest every month to reach a financial goal.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Monthly Investment Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Set your target corpus',
      text: 'Enter the future value of your financial goal. Use the preset buttons for 10 Lakh, 50 Lakh, 1 Crore, or 5 Crore, or type a custom amount.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Choose your investment duration',
      text: 'Set how many years you have until you need the money. Longer durations reduce the monthly amount required.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set your expected annual return',
      text: 'Enter the annual return rate you expect from your investments. 12% is a common assumption for equity-heavy portfolios in India.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Read your required monthly investment',
      text: 'The calculator shows the exact amount you need to invest every month. Check the Return Rate Scenarios section to compare different market conditions.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Monthly Investment',
  alternateName: 'Required Monthly SIP',
  description: 'The fixed amount an investor must contribute every month to a mutual fund or investment vehicle to reach a specific financial target within a given time horizon, assuming a stated rate of annual return.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Systematic_investment_plan',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Monthly Investment Calculator: How Much to Invest Every Month',
  description: 'Free monthly investment calculator for India. Find out exactly how much you need to invest each month to reach your financial goal with step-up SIPs, inflation adjustment, and delay impact analysis.',
  url: 'https://fermor.in/calculators/monthly-investment-calculator',
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
    { '@type': 'DefinedTerm', name: 'Monthly Investment', alternateName: 'Required Monthly SIP' },
    { '@type': 'DefinedTerm', name: 'SIP' },
    { '@type': 'DefinedTerm', name: 'Goal Based Investing' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, goal-based investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-monthly-investment-calculator', name: 'What Is a Monthly Investment Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#required-sip-formula', name: 'Required SIP Formula' },
    { '@type': 'WebPageElement', cssSelector: '#required-sip-for-common-goals', name: 'Monthly Investment for Common Goals' },
    { '@type': 'WebPageElement', cssSelector: '#return-rate-sensitivity', name: 'Return Rate Sensitivity' },
    { '@type': 'WebPageElement', cssSelector: '#how-duration-impacts-contributions', name: 'How Duration Impacts Contributions' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-and-inflation', name: 'Step-Up SIP and Inflation-Adjusted Goals' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-worked-example', name: 'Step-Up SIP Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#existing-savings-offset', name: 'How Existing Savings Reduce Required Investment' },
    { '@type': 'WebPageElement', cssSelector: '#goal-inflation-worked-example', name: 'Why Ignoring Inflation Understates Requirement' },
    { '@type': 'WebPageElement', cssSelector: '#monthly-investment-by-goal-type', name: 'Monthly Investment by Goal Type' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function MonthlyInvestmentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <MonthlyInvestmentClient faqs={faqs} />
    </>
  );
}

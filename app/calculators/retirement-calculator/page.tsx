import type { Metadata } from 'next';
import RetirementCalculatorClient from './RetirementCalculatorClient';

export const metadata: Metadata = {
  title: 'Retirement Calculator India: How Much You Need',
  description: 'Find out exactly how much you need to retire in India. Enter your age, expenses and return expectations to get your target corpus and the exact monthly SIP to reach it. Inflation-adjusted. Free to use.',
  keywords: [
    'retirement calculator',
    'retirement planning',
    'retirement',
    'pension calculator',
    'pension',
    'financial goal planning',
    'financial planning',
    'retirement corpus calculator',
    'retirement calculator india',
  ],
  openGraph: {
    title: 'Retirement Calculator India: Corpus & Monthly SIP',
    description: 'Enter age, monthly expenses and return rate to instantly see your retirement corpus target and the monthly SIP needed to reach it, adjusted for inflation.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/retirement-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a good retirement corpus in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A "good" corpus entirely depends on your post-retirement monthly expenses. Generally, financial advisors recommend accumulating 25 to 30 times your annual post-retirement expenses. Our calculator does this math for you by factoring in inflation to give you an exact target figure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does inflation affect my retirement savings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Inflation reduces the purchasing power of your money over time. Assuming an average inflation of 6%, something that costs Rs. 50,000 today will cost nearly Rs. 1,60,000 in 20 years. Your retirement planning must account for both pre-retirement and post-retirement inflation to ensure your money does not run out.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this retirement calculator work out my corpus and monthly SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The calculator first inflates your current monthly expenses to their value at retirement age using the 6% inflation assumption, then finds the present value of a growing annuity for your years in retirement, growing each year with inflation and discounted at the 7% post-retirement return. That present value is your target corpus. The monthly SIP is then the amount that, invested every month at your chosen pre-retirement return until retirement, grows to exactly that corpus, using the standard SIP future value formula.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where should I invest for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your investment strategy should ideally shift as you age. In your 20s and 30s, you can afford to be "Aggressive" with high allocations in equity mutual funds. As you near retirement (in your 50s), shifting a significant portion to "Safe" assets like FDs, PPF, and debt funds is recommended to protect your accumulated wealth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is EPF alone enough for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Employee Provident Fund is an excellent tax-saving and fixed-income instrument, but relying on it alone is rarely enough because of inflation and rising healthcare costs. Supplementing EPF with equity investments, such as mutual funds through SIPs, is usually needed to build a corpus large enough to sustain your expenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a retirement calculator and a pension calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A retirement calculator like this one works out the total corpus you need to fund your own expenses after you stop working, and the monthly SIP to build it. A pension calculator is narrower: it estimates the payout from a specific pension product, such as NPS or the Atal Pension Yojana, based on your contributions to that scheme. Most people need the broader retirement calculation first, since a pension is usually only one part of total retirement income.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much of my income should I save for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A commonly used starting point is saving at least 15 to 20% of your income towards retirement, increasing this share as your income grows. The exact figure depends more on how many years you have left until retirement and your desired lifestyle than on a single fixed rule, which is why calculating your specific target corpus is more useful than following a generic percentage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does NPS count towards my retirement corpus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The National Pension System (NPS) is one of the main retirement-specific investment vehicles in India, alongside EPF, PPF, and mutual fund SIPs. Any amount you already hold or plan to contribute to NPS should be counted as part of your total retirement savings when working out how much more you still need to save.',
      },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I assume for retirement planning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The right assumption depends on how your money is actually invested. A portfolio mostly in equity mutual funds has historically supported a higher long-term assumption than one mostly in fixed-income instruments like PPF or FDs. This calculator lets you pick between a Safe, Balanced, or Aggressive investment style, each using a different assumed return, so the projection matches how you actually plan to invest.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I retire before age 60 in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, nothing prevents early retirement, but retiring earlier means your savings have fewer years to grow and need to last more years in retirement, both of which significantly increase the monthly SIP required today. Anyone targeting early retirement should treat the corpus and monthly savings figures from a calculator like this as a minimum, and revisit them regularly as actual returns and expenses become clearer.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current EPF interest rate for FY 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPFO has notified an 8.25% interest rate on EPF deposits for FY 2025-26, the third year in a row at this level, with interest credited to member accounts by mid-July 2026. This is the rate used by the EPF Calculator for projecting your provident fund balance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the current PPF interest rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PPF currently earns 7.1% per annum, a rate that has stayed unchanged since the April-June 2020 quarter, the longest stable run in the scheme\'s history. The government reviews and notifies small savings rates, including PPF, every quarter, so check the PPF Calculator for the rate applicable when you actually invest.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many times can I withdraw partially from my NPS account before retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PFRDA rules allow up to three partial withdrawals over the life of an NPS account, and only after you have been a member for at least three years. Each withdrawal is capped at 25% of your own contributions and is limited to specific purposes such as a child\'s higher education or marriage, or buying or building a home.',
      },
    },
    {
      '@type': 'Question',
      name: 'Has the government changed the retirement age for central government employees?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The standard retirement age for central government employees remains 60 years under Fundamental Rule 56(a), and as of 2026 there is no official proposal to raise it to 62. Specific categories such as judges, teachers, and doctors can have different, department-specific retirement ages, but 60 remains the general benchmark this calculator uses by default.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is all my EPF interest tax-free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not entirely. Interest earned on your own EPF and VPF contributions is tax-free only up to Rs. 2.5 lakh combined per year; interest on contributions above that threshold is taxed as regular income, with TDS deducted. This mainly affects high earners who elect a large voluntary PF contribution on top of the mandatory 12%.',
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
  name: 'Fermor Retirement Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate the retirement corpus needed and the monthly SIP required to reach it, accounting for inflation and lifestyle.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Retirement Corpus and Monthly SIP Needed',
  description: 'Use Fermor\'s free retirement calculator to find out how much you need to retire and how to get there.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Your Current Age and Retirement Age',
      text: 'Set how many years you have left until you plan to retire.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Monthly Expenses',
      text: 'Enter your current monthly expenses. The calculator adjusts these for inflation to estimate your post-retirement needs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set Return and Inflation Rates',
      text: 'Enter the expected annual return on your investments and the expected inflation rate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Get Your Corpus Target and Monthly SIP',
      text: 'The calculator shows your total retirement corpus needed and the exact monthly SIP required to reach it from today.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Retirement Calculator", item: 'https://fermor.in/calculators/retirement-calculator' },
  ],
};

export default function RetirementCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <RetirementCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import MoneyDoublingClient from './MoneyDoublingClient';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  
  return {
    title: 'Money Doubling Calculator: Time to Double Money',
    description: 'Free money doubling calculator for India. Find out how long your investment takes to double at a given return rate, using the exact compound growth formula. Free to use.',
    keywords: [
      'money doubling calculator', 'money double calculator', 'investment doubling calculator',
      'rule of 72 vs actual doubling time', 'how many years to double money calculator',
      'compound interest doubling calculator', 'double your money calculator india',
      'time to double investment calculator', 'money doubling formula calculator',
      'fd doubling time calculator', 'sip doubling time calculator', 'doubling period calculator',
      'money doubling calculator online', 'years to double money at interest rate',
      'double money in how many years calculator', 'investment growth doubling calculator',
      'money doubling calculator for fd', 'money doubling calculator for mutual funds',
      'exact doubling time calculator', 'compound growth doubling calculator',
    ],
    alternates: {
      canonical: `https://fermor.in/${region === 'in' ? 'calculators' : region}/money-doubling-calculator`,
    },
  };
}

const faqs = [
  {
    q: 'What is a Money Doubling Calculator?',
    a: 'A Money Doubling Calculator determines exactly how long it takes for your initial investment to grow to twice its original value based on a specific rate of return and compounding frequency.'
  },
  {
    q: 'How does compound growth affect doubling time?',
    a: 'Compound growth accelerates the doubling process because you earn returns not just on your initial principal, but also on accumulated returns from previous periods. Higher compounding frequencies (like monthly vs annually) reduce the time needed to double.'
  },
  {
    q: 'What is the Rule of 72?',
    a: 'The Rule of 72 is a mental math shortcut used to estimate doubling time. Divide 72 by the annual return rate. For example, at 12% return, 72/12 = 6 years. While useful, it is an approximation, whereas the calculator provides exact mathematics.'
  },
  {
    q: 'How does compounding frequency impact the results?',
    a: 'The more frequently your returns compound, the faster your money grows. An investment compounding monthly will double slightly faster than the exact same investment compounding annually at the same nominal rate.'
  },
  {
    q: 'How does inflation affect my doubled money?',
    a: 'Inflation reduces the purchasing power of your money over time. Even if your nominal investment doubles, its real value (what you can actually buy with it) will be lower depending on the inflation rate during that period.'
  },
  {
    q: 'What return rate should I use for the calculation?',
    a: 'Use a realistic rate based on the asset class. Fixed deposits offer 6-8%, equity mutual funds historically deliver 10-14% over long periods, and direct equity varies widely. Overestimating returns leads to misleading doubling-time estimates.'
  },
  {
    q: 'How do taxes affect the money doubling timeline?',
    a: 'Capital gains taxes reduce your effective return, which extends the doubling time. In India, equity gains above Rs 1.25 lakh in a year are taxed at 12.5% (LTCG), while short-term gains are taxed at 20%. The calculator lets you factor this in under Advanced Settings.'
  },
  {
    q: 'Can I use this calculator for SIP investments?',
    a: 'This calculator computes doubling time for a lump-sum investment. For regular monthly SIP contributions, use the SIP Calculator or the Monthly Investment Calculator, which model periodic contributions differently.'
  },
  {
    q: 'What is the difference between nominal and real returns?',
    a: 'Nominal return is the stated percentage growth before adjusting for inflation. Real return is what remains after subtracting inflation. For example, a 12% return with 6% inflation gives a real return of roughly 6%. The calculator\'s Real Return toggle applies the Fisher equation for precision.'
  },
  {
    q: 'How accurate is the Rule of 72 compared to exact math?',
    a: 'The Rule of 72 is most accurate around 8-10% returns. At very low rates (under 4%) or very high rates (above 20%), it can be off by several months. The Rule of 114 applies to tripling, and the Rule of 144 to quadrupling. The calculator shows both the rule estimate and the exact figure side by side.'
  },
  {
    q: 'Does this calculator account for additional contributions?',
    a: 'No, this calculator computes the time for a single lump-sum investment to reach a target multiple. For scenarios involving regular monthly or annual contributions, use the SIP Calculator or Future Value Calculator.'
  },
  {
    q: 'What is a realistic doubling time for Indian equity investments?',
    a: 'Based on historical Nifty 50 data, Indian equity has delivered roughly 12-14% annualised returns over long periods. At 12%, money doubles in about 6.1 years. At 14%, it takes roughly 5.3 years. These are long-term averages and individual outcomes will vary.'
  },
  {
    q: 'How long does it take to double money in a PPF account?',
    a: 'At the PPF rate of 7.1% (held steady for the July-September 2026 quarter), a lumpsum in PPF takes roughly 10.1 years to double with annual compounding. PPF is government-backed, so this is one of the few doubling-time estimates on this page that is not dependent on market performance.'
  },
  {
    q: 'How long does money take to double in a bank fixed deposit?',
    a: 'At a general-public FD rate of around 6.5%, money takes roughly 11 years to double. Senior citizens typically get an extra 0.5% on FD rates, which shortens this slightly. FD interest is also fully taxable at the depositor\'s income slab rate, which further slows real doubling time once tax is factored in.'
  },
  {
    q: 'Is gold a good way to double your money?',
    a: 'Gold has historically averaged close to 9% annualised returns over long periods, implying a doubling time of roughly 8 years, but this is a historical average, not a guaranteed or fixed rate like PPF. Gold prices can be flat or fall for extended stretches, so actual doubling time varies far more than for a fixed-income instrument.'
  },
  {
    q: 'How much longer does tripling or quadrupling money take compared to doubling?',
    a: 'Quadrupling takes almost exactly twice as long as doubling, since quadrupling is mathematically the same as doubling twice in a row. At 12% annual return, doubling takes 6.12 years while quadrupling takes 12.23 years. Tripling falls in between at 9.69 years, estimated by the Rule of 114 shortcut.'
  },
  {
    q: 'Does capital gains tax significantly delay doubling time?',
    a: 'Yes. A 12% pre-tax return taxed at a flat 12.5% works out closer to a 10.5% effective return, which stretches doubling time from 6.12 years to about 6.94 years, nearly 10 months longer. The Advanced Settings tax slider in this calculator lets you see this effect directly for your own rate and tax assumption.'
  },
  {
    q: 'Can debt mutual funds double money faster than fixed deposits?',
    a: 'Debt mutual funds have historically returned somewhat more than bank FDs, roughly 7-8% versus 6-6.5%, which shortens doubling time by a year or more. However, debt mutual funds bought after April 2023 lost the LTCG indexation benefit and are now taxed at the investor\'s slab rate regardless of holding period, similar to FD interest.'
  },
  {
    q: 'What is the fastest way to double money safely in India?',
    a: 'There is a direct trade-off between speed and safety. Government-backed instruments like PPF and bank FDs double money in 10-11 years with no market risk, while equity mutual funds have historically doubled money in roughly 6 years but with year-to-year volatility and no guaranteed return. There is no option that is both the fastest and risk-free.'
  },
  {
    q: 'Does the amount I invest change how long it takes to double?',
    a: 'No. Doubling time depends only on the return rate and compounding frequency, not on the principal amount. Rs 10,000 and Rs 10 lakh invested at the same 12% annual rate both take exactly 6.12 years to double, since the doubling-time formula is a ratio (target multiple to rate), not a function of the starting amount.'
  },
  {
    q: 'What return rate do I need to double my money in 5 years?',
    a: 'To double money in exactly 5 years with annual compounding, you need an annual return of about 14.87%. This is achievable with equity over some periods but is well above what fixed-income instruments like PPF or FDs offer, so a 5-year doubling target generally requires taking on market risk.'
  },
  {
    q: 'Does compounding frequency matter more at high or low interest rates?',
    a: 'The absolute gap in days between annual and monthly compounding is similar across rates, roughly 110-115 days whether the rate is 5% or 20%. But as a share of the total doubling time, the difference matters far more at higher rates: at 20%, that gap is about 8% of the total time to double, versus about 2% at 5%.'
  },
  {
    q: 'How long does it take to double money in a Recurring Deposit (RD)?',
    a: 'An RD involves a fixed monthly contribution rather than a single lumpsum, so it does not have one doubling time the way a lumpsum does since each instalment starts compounding on a different date. This calculator models lumpsum investments only; for a recurring monthly contribution, use the SIP Calculator to see when the total corpus reaches a given multiple of total invested.'
  },
  {
    q: 'What is a realistic doubling time to plan for retirement savings?',
    a: 'A diversified retirement portfolio blending equity and debt might realistically average 9-11% over decades, implying a doubling time of roughly 6.5-8 years. Retirement planning generally benefits more from starting early and staying consistent than from chasing the fastest possible doubling time, since a 30-40 year horizon allows several doubling cycles to compound on each other.'
  },
  {
    q: 'Is there a difference between the Rule of 72 and the Rule of 70?',
    a: 'Both estimate doubling time by dividing a constant by the interest rate. The Rule of 72 is more commonly used because 72 divides evenly by more small numbers (2, 3, 4, 6, 8, 9, 12), making the mental math easier, while the Rule of 70 is occasionally used in academic or continuous-compounding contexts. For typical annual compounding at 6-10% rates, the Rule of 72 is marginally more accurate.'
  },
  {
    q: 'Why does my doubling time change when I switch the compounding frequency dropdown?',
    a: 'Switching from annual to monthly compounding at the same stated rate shortens doubling time slightly, because interest starts earning its own interest sooner. The calculator recalculates instantly using the exact logarithmic formula for whichever frequency you select, so the change you see reflects a real mathematical difference, not just a display adjustment.'
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a free financial calculator platform for India, covering loans, taxes, investments, and retirement planning.'
  }
];

const referenceTable = [
  { rate: '4%', years: '17.67 Years' },
  { rate: '6%', years: '11.90 Years' },
  { rate: '8%', years: '9.01 Years' },
  { rate: '10%', years: '7.27 Years' },
  { rate: '12%', years: '6.12 Years' },
  { rate: '15%', years: '4.96 Years' },
  { rate: '18%', years: '4.19 Years' },
  { rate: '24%', years: '3.22 Years' },
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
  name: 'Fermor Money Doubling Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Estimate exactly how long it takes to double your investment using compound growth, considering inflation, taxes, and compounding frequency.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  dateModified: '2026-09-17',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Money Doubling Calculator', item: 'https://fermor.in/calculators/money-doubling-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Money Doubling Calculator',
  description: 'Step-by-step guide to estimate how long it takes for your investment to double.',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your investment amount', text: 'Input your initial lump-sum investment amount using the slider or text field.' },
    { '@type': 'HowToStep', position: 2, name: 'Set expected return rate', text: 'Adjust the annual return rate based on the asset class you are investing in.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose target multiple', text: 'Select whether you want to double (2x), triple (3x), or quadruple (4x) your money.' },
    { '@type': 'HowToStep', position: 4, name: 'Select compounding frequency', text: 'Pick annual, semi-annual, quarterly, or monthly compounding to match your investment type.' },
    { '@type': 'HowToStep', position: 5, name: 'Review your results', text: 'The calculator shows the exact time to reach your target, a growth chart, and milestone breakdowns.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Money Doubling Calculator',
  description: 'Free online calculator to estimate how long it takes for your investment to double using compound growth.',
  url: 'https://fermor.in/calculators/money-doubling-calculator',
  dateModified: '2026-09-17',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  hasPart: [
    { '@type': 'WebApplication', name: 'Money Doubling Calculator', applicationCategory: 'FinanceApplication' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-money-doubling-calculator', name: 'What Is a Money Doubling Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#doubling-time-formula', name: 'Doubling Time Formula' },
    { '@type': 'WebPageElement', cssSelector: '#rule-of-72-vs-exact', name: 'Rule of 72 vs Exact Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#compounding-frequency-impact', name: 'Impact of Compounding Frequency' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-and-real-returns', name: 'Inflation and Real Returns' },
    { '@type': 'WebPageElement', cssSelector: '#doubling-time-by-investment-type', name: 'Doubling Time by Investment Type' },
    { '@type': 'WebPageElement', cssSelector: '#tripling-quadrupling-money', name: 'Time to Triple or Quadruple Your Money' },
    { '@type': 'WebPageElement', cssSelector: '#capital-gains-tax-effect', name: 'How Capital Gains Tax Changes Doubling Time' },
    { '@type': 'WebPageElement', cssSelector: '#sip-vs-lumpsum-doubling', name: 'SIP vs Lumpsum Doubling' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  knowsAbout: [
    'Financial Calculators',
    'Investment Planning',
    'Compound Interest',
    'Money Doubling',
    'Rule of 72',
    'Indian Finance',
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Money Doubling Time',
  description: 'The number of years required for an investment to reach a specified multiple of its initial value through compound growth.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Fermor Financial Glossary',
    url: 'https://fermor.in/learn',
  },
  sameAs: 'https://en.wikipedia.org/wiki/Rule_of_72',
};

export default async function MoneyDoublingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <MoneyDoublingClient faqs={faqs} referenceTable={referenceTable} />
    </>
  );
}

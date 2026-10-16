import type { Metadata } from 'next';
import StepUpSIPClient from './StepUpSIPClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/step-up-sip-calculator`;
  return {
    title: 'Step-Up SIP Calculator: Estimate Returns with Annual Top-Up',
    description:
      'Free step-up SIP calculator for India. See how a yearly SIP increase grows your corpus, total invested and wealth gain against a flat SIP. Free to use.',
    keywords: [
      'step up sip calculator',
      'step up sip',
      'step-up sip calculator',
      'sip step up calculator',
      'step up sip mutual fund',
      'sip top up calculator',
      'annual step up sip',
      'step up sip returns',
      'step up sip formula',
      'step up sip calculator india',
      'sip calculator with annual increase',
      'step up sip plan',
      'step up sip vs normal sip',
      'step up sip wealth creation',
      'sip step up calculator online',
      'step up sip investment',
      'yearly step up sip',
      'step up sip corpus calculator',
      'step up sip return calculator',
      'mutual fund step up sip',
      'sip with annual top up calculator',
      'step up sip growth calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Step-Up SIP Calculator: Estimate Returns with Annual Top-Up',
      description:
        'Calculate how much your SIP grows when you increase the investment amount by a fixed percentage every year. Free for India.',
      images: ['https://fermor.in/og-step-up-sip-calculator.png'],
    },
    openGraph: {
    title: 'Step-Up SIP Calculator: Estimate Returns with Annual Top-Up - Fermor',
      description:
        'Free step-up SIP calculator for India. Calculate how much your SIP grows when you increase the investment amount by a fixed percentage every year. See corpus, total invested, and wealth gain.',
      type: 'website',
      url: 'https://fermor.in/calculators/step-up-sip-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-step-up-sip-calculator.png', width: 1200, height: 630, alt: 'Fermor Step-Up SIP Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-10-12';
const PAGE_DATE_PUBLISHED = '2026-07-01';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Systematic Investment Plan',
    'Step-Up SIP',
    'Mutual Funds India',
    'Rupee Cost Averaging',
    'AMFI Guidelines',
    'SEBI Regulations',
    'Personal Finance India',
    'SIP Returns',
    'XIRR',
    'Wealth Creation India',
    'Long-Term Investing India',
    'Power of Compounding',
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is a step-up SIP?',
    a: 'A step-up SIP is a systematic investment plan where the monthly contribution rises by a fixed percentage every year. You start with a base amount and the plan increases it on a schedule, so your investment keeps pace with your income. The extra money invested in later years compounds alongside everything invested earlier.',
  },
  {
    q: 'How does a step-up SIP work?',
    a: 'A step-up SIP keeps the monthly amount fixed within each year and raises it at the start of the next year by your chosen percentage. A Rs 10,000 SIP with a 10% step-up runs at Rs 10,000 in year 1, Rs 11,000 in year 2 and Rs 12,100 in year 3. Each instalment is invested at the fund NAV on its date, so the corpus compounds month by month.',
  },
  {
    q: 'What is the step-up SIP formula?',
    a: 'The corpus is S x A x the sum of g^k x (1 + i)^(12 x (n - 1 - k)) for k = 0 to n - 1. S is the starting SIP, g is 1 plus the step-up rate, n is the years, i is the monthly rate and A is ((1 + i)^12 - 1) / i. The calculator iterates month by month and gets the same result.',
  },
  {
    q: 'What is a good step-up percentage for SIP?',
    a: 'A step-up of 10% a year is a sensible default because it is close to typical salary growth for Indian salaried workers. If your income grows faster, 15% to 20% builds the corpus much faster, but only if you can sustain it. A step-up you abandon in year four is worth less than a smaller one you keep for twenty years.',
  },
  {
    q: 'How much more does a step-up SIP earn than a normal SIP?',
    a: 'Over 20 years at 12%, a Rs 10,000 SIP with a 10% annual step-up grows to about Rs 1.85 crore, against about Rs 91.1 lakh for a flat Rs 10,000 SIP. The step-up plan invests Rs 68.73 lakh in total, against Rs 24 lakh for the flat plan. So the corpus doubles, but you also invest nearly three times as much money.',
  },
  {
    q: 'How much will a Rs 5,000 monthly step-up SIP grow to in 15 years?',
    a: 'A Rs 5,000 monthly SIP with a 10% annual step-up grows to about Rs 40.98 lakh in 15 years at a 12% return. The total invested is about Rs 19.06 lakh, and the monthly SIP reaches Rs 18,987 in year 15. A flat Rs 5,000 SIP over the same period reaches about Rs 23.57 lakh on Rs 9 lakh invested.',
  },
  {
    q: 'How much will a Rs 10,000 monthly step-up SIP grow to in 10 years?',
    a: 'A Rs 10,000 monthly SIP with a 10% annual step-up grows to about Rs 32.38 lakh in 10 years at a 12% return. The total invested is about Rs 19.12 lakh. A flat Rs 10,000 SIP over the same 10 years reaches about Rs 22.19 lakh on Rs 12 lakh invested.',
  },
  {
    q: 'How long does a step-up SIP take to reach Rs 1 crore?',
    a: 'A Rs 10,000 SIP with a 10% annual step-up reaches Rs 1 crore in 17 years at a 12% return. The same Rs 10,000 as a flat SIP takes 21 years. The step-up saves four years because the later, larger instalments still have time to compound.',
  },
  {
    q: 'Is a step-up SIP better than a bigger flat SIP?',
    a: 'A bigger flat SIP is more efficient if you can afford it from day one. A flat Rs 20,255 a month for 20 years matches the Rs 1.85 crore from a Rs 10,000 step-up plan, with Rs 48.6 lakh invested instead of Rs 68.7 lakh. The step-up wins on affordability: it starts at half the outlay.',
  },
  {
    q: 'Can I start a step-up SIP in mutual funds in India?',
    a: 'Yes, most AMCs and major investment platforms in India offer a step-up or top-up option while you register a SIP. You choose the step-up amount or percentage and how often it applies, usually once a year. Check the SIP form or the platform settings, since not every scheme or platform offers every frequency.',
  },
  {
    q: 'Which mutual fund schemes offer step-up SIP?',
    a: 'Step-up is a facility of the AMC or platform, not a feature of one scheme, so most open-ended equity, hybrid and debt schemes that accept SIPs support it. Large-cap, flexicap, mid-cap, small-cap and index funds all qualify. Check the SIP terms of your fund on the AMC site or at amfiindia.com.',
  },
  {
    q: 'What is the difference between step-up SIP and top-up SIP?',
    a: 'In India the two terms are used interchangeably, and both mean a SIP whose amount increases on a schedule. Some platforms use "top-up" for a fixed rupee increase and "step-up" for a percentage increase. Manually raising a SIP whenever you remember is a different thing, and it depends on your discipline rather than a standing instruction.',
  },
  {
    q: 'Can I step up my SIP by a fixed rupee amount instead of a percentage?',
    a: 'Many platforms allow a fixed rupee step-up, such as Rs 500 more every year. This calculator models a percentage step-up. A fixed Rs 500 on a Rs 10,000 SIP is a 5% step-up in the first year, and the percentage shrinks every year after that, so a percentage step-up grows the corpus faster over the long run.',
  },
  {
    q: 'Can I change the step-up percentage later?',
    a: 'It depends on the platform and the AMC. Some let you edit the step-up on an active SIP, while others need you to cancel the SIP and register a new one with the revised percentage. Confirm the process before you start, since cancelling and restarting can reset the instalment dates.',
  },
  {
    q: 'What happens if I stop a step-up SIP midway?',
    a: 'The units you already hold remain invested and keep moving with the market, and future instalments are not processed. You can redeem whenever you choose, subject to any exit load or an ELSS lock-in. Stopping early costs you the large late-year instalments that drive most of the step-up advantage.',
  },
  {
    q: 'How do I calculate step-up SIP returns using XIRR?',
    a: 'List every monthly instalment with its date as a negative cash flow, using the stepped-up amount for each year, and add the final redemption value as a positive one. Then apply XIRR in Excel or Google Sheets. It gives your annualised return on the actual dated cash flows, the right check against the return you assumed.',
  },
  {
    q: 'What is the minimum amount for a step-up SIP?',
    a: 'Minimum SIP amounts vary by scheme, from Rs 100 in some funds to Rs 500 or Rs 1,000 in many others. The step-up only raises the amount from there, so it never breaks the minimum. This calculator accepts a starting SIP from Rs 500 a month.',
  },
  {
    q: 'Why does this calculator show a different result from other SIP calculators?',
    a: 'This calculator uses an effective monthly rate, (1 + r)^(1/12) - 1, with each instalment invested at month end. Many calculators divide the annual rate by 12, which gives a higher corpus. For Rs 10,000 with a 10% step-up over 20 years, the effective method gives Rs 1.85 crore and r/12 gives Rs 1.97 crore.',
  },
  {
    q: 'How is a step-up SIP taxed?',
    a: 'Each instalment is a separate purchase, so the holding period is counted per instalment. For equity funds, gains on units held over 12 months are taxed at 12.5% above Rs 1.25 lakh a financial year, and gains within 12 months at 20%. Check the Income Tax Department site for current rates before you redeem.',
  },
  {
    q: 'Is the step-up SIP return guaranteed?',
    a: 'No. The return rate in the calculator is an assumption, and a mutual fund can return less, or lose money, over any period. A SIP does not guarantee a profit, and SEBI requires mutual fund investments to carry a market-risk warning. Test a lower return rate to see how much margin your goal has.',
  },
  {
    q: 'Is a step-up SIP suitable for a home down payment goal?',
    a: 'It can be, if the goal is more than about five years away and you can accept equity market risk. For shorter horizons, a falling market close to the purchase date can cut the corpus when you need it. The Down Payment Planner Calculator works backwards from a target and an inflation-adjusted price to a monthly step-up SIP.',
  },
  {
    q: 'What is a step-up SIP calculator?',
    a: 'A step-up SIP calculator projects the corpus of a SIP whose monthly amount rises by a fixed percentage every year. This one takes the starting SIP, the annual step-up, the expected return and the period. It returns the final corpus, the total invested, the wealth gain and a comparison with a flat SIP of the same starting amount.',
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
  name: 'Step-Up SIP Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/step-up-sip-calculator',
  description: 'Calculate how much your SIP grows when you increase the investment amount by a fixed percentage every year. Compare step-up SIP vs normal SIP, see year-by-year growth, total invested, and wealth gain. Free to use.',
  featureList: [
    'Step-Up SIP Corpus Projection',
    'Normal SIP Comparison',
    'Year-by-Year Growth Table',
    'Annual Step-Up Percentage Slider',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y)',
    'Donut chart: invested vs wealth gain',
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
    { '@type': 'ListItem', position: 3, name: 'Step-Up SIP Calculator', item: 'https://fermor.in/calculators/step-up-sip-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Step-Up SIP Calculator',
  description: 'Step-by-step guide to calculate step-up SIP returns, compare with normal SIP, and plan your wealth creation journey.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Step-Up SIP Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your monthly SIP amount',
      text: 'Set the base monthly investment amount you want to start with. Use the slider or click the value to type a precise number. The typical range is Rs 500 to Rs 5,00,000.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the annual step-up percentage',
      text: 'Choose the percentage by which your monthly SIP amount will increase every year. The default is 10%, which is the most common recommendation matching average salary growth in India.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the expected annual return rate',
      text: 'Enter the expected annual return rate for your mutual fund investments. A 10 to 12% rate is the standard assumption for equity-oriented funds over the long term in India.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Choose the investment period',
      text: 'Select how many years you plan to continue the step-up SIP. Longer periods dramatically increase the final corpus due to compounding and the effect of larger contributions in later years.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Review the results',
      text: 'The calculator shows your total invested amount, final corpus, and wealth gain. Compare the step-up SIP result with a normal SIP to see how much extra the annual top-up generates. Expand the year-by-year table for a detailed breakdown.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Step-Up SIP',
  alternateName: 'Top-Up SIP',
  description: 'A systematic investment plan where the monthly contribution amount increases by a fixed percentage every year, allowing investors to align their investments with income growth.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Systematic_investment_plan',
    'https://www.wikidata.org/wiki/Q7663766',
    'https://www.amfiindia.com/investor-corner/knowledge-center/what-is-sip.html',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Step-Up SIP Calculator: Estimate Returns with Annual Top-Up',
  description: 'Free step-up SIP calculator for India. Calculate how much your SIP grows when you increase the investment amount by a fixed percentage every year. See corpus, total invested, and wealth gain.',
  url: 'https://fermor.in/calculators/step-up-sip-calculator',
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
    { '@type': 'DefinedTerm', name: 'Step-Up SIP', alternateName: 'Top-Up SIP' },
    { '@type': 'DefinedTerm', name: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'Mutual Fund Returns' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, salaried professionals, long-term wealth creators',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-step-up-sip', name: 'What Is a Step-Up SIP' },
    { '@type': 'WebPageElement', cssSelector: '#how-step-up-sip-works', name: 'How Step-Up SIP Works' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-formula', name: 'Step-Up SIP Formula' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-vs-normal-sip', name: 'Step-Up SIP vs Normal SIP' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-by-tenure', name: 'Step-Up SIP Returns by Tenure and Return Rate' },
    { '@type': 'WebPageElement', cssSelector: '#choosing-step-up-percentage', name: 'Choosing a Step-Up Percentage' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-in-excel', name: 'Step-Up SIP Calculator in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-step-up-sip', name: 'Reverse Step-Up SIP Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-vs-top-up-sip', name: 'Step-Up SIP vs Top-Up SIP' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-tax', name: 'Step-Up SIP Taxation' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-risks', name: 'Limitations of Step-Up SIP' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],

};

export default async function StepUpSIPCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <StepUpSIPClient faqItems={faqItems} />
    </>
  );
}

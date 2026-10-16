import type { Metadata } from 'next';
import RuleOf114Client from './RuleOf114Client';

import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  
  return {
    title: 'Rule of 114 Calculator: Estimate How Long Investments Take to Triple',
    description: 'Free Rule of 114 calculator for India. Estimate how many years it takes for your investment to triple based on the expected annual return rate. Includes exact math comparison, quick reference table, and worked examples.',
    keywords: [
      'rule of 114 calculator',
      'rule of 114',
      'investment tripling time calculator',
      'years to triple investment',
      'rule of 72 rule of 114',
      'compound interest tripling calculator',
      'lumpsum tripling calculator',
      'investment growth calculator',
      'rule of 114 formula',
      'how long to triple money',
      'rule of 114 india',
      'financial planning calculator',
      'rule of 144 calculator',
      'wealth tripling calculator',
      'investment time calculator',
      'rule of 114 vs rule of 72',
      'triple your money calculator',
      'rule of 114 fd calculator',
      'rule of 114 sip calculator',
      'quick maths investment trick',
      'rule of 114 vs rule of 110',
      'ppf tripling time calculator',
      'fd tripling time calculator',
      'rule of 114 examples india',
      'tripling time by return rate',
    ],
    alternates: {
      canonical: `https://fermor.in/${region === 'in' ? 'calculators' : region}/rule-of-114-calculator`,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Rule of 114 Calculator: Estimate How Long Investments Take to Triple',
      description: 'Free Rule of 114 calculator. Find how many years your investment takes to triple at any annual return rate.',
    },
    openGraph: {
      title: 'Rule of 114 Calculator: Estimate How Long Investments Take to Triple',
      description: 'Free Rule of 114 calculator for India. Estimate how many years it takes for your investment to triple. Includes exact math comparison and worked examples.',
      type: 'website',
      url: 'https://fermor.in/calculators/rule-of-114-calculator',
      siteName: 'Fermor',
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-06-10';

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
    'Rule of 114',
    'Rule of 72',
    'Compound Interest',
    'Personal Finance India',
    'Investment Planning',
    'Lumpsum Investing',
    'Financial Planning India',
    'Wealth Creation',
    'Time Value of Money',
    'SEBI Regulations',
    'Indian Investment Products',
    'NRI Investments',
  ],
};

const faqs = [
  {
    q: 'What is the Rule of 114?',
    a: 'The Rule of 114 is a mental math shortcut that estimates how many years it takes for a lumpsum investment to triple in value. Divide 114 by the expected annual interest rate and you get the approximate number of years required. At 8%, 114 / 8 = 14.25 years. At 12%, 114 / 12 = 9.5 years.'
  },
  {
    q: 'How does the Rule of 114 differ from the Rule of 72?',
    a: 'The Rule of 72 estimates how long it takes an investment to double (72 / rate). The Rule of 114 estimates how long it takes to triple (114 / rate). There is also the Rule of 144 for quadrupling (144 / rate). All three assume compound interest and work best between 5% and 15% annual returns.'
  },
  {
    q: 'Is the Rule of 114 accurate?',
    a: 'The Rule of 114 provides a close approximation for interest rates between 5% and 15%. At 10%, the rule gives 11.4 years while the exact mathematical formula gives 11.53 years. The difference is small enough for mental math, but the calculator on this page shows the exact figure alongside the estimate for precision.'
  },
  {
    q: 'Can I use the Rule of 114 for SIPs?',
    a: 'No. The Rule of 114 is designed for lumpsum investments where a single amount compounds over time without further additions. For SIPs where you add money regularly, the math is different because each instalment compounds for a different duration. Use a SIP calculator or XIRR calculator for systematic investments.'
  },
  {
    q: 'Does inflation affect the Rule of 114?',
    a: 'Yes. If you want to know how long it takes to triple your purchasing power, use the real rate of return (nominal interest rate minus inflation) instead of the nominal rate. For example, if your investment earns 10% but inflation is 6%, the real return is about 4%, and 114 / 4 = 28.5 years to triple in real terms.'
  },
  {
    q: 'What is the Rule of 144?',
    a: 'The Rule of 144 estimates how many years it takes for an investment to quadruple. Divide 114 by the annual rate to get tripling time, then divide 144 by the annual rate to get quadrupling time. At 10%, 114 / 10 = 11.4 years to triple and 144 / 10 = 14.4 years to quadruple.'
  },
  {
    q: 'What is the exact formula behind the Rule of 114?',
    a: 'The exact formula uses logarithms: Years to Triple = ln(3) / ln(1 + r), where r is the annual return expressed as a decimal. The Rule of 114 is a linear approximation of this logarithmic formula. The approximation works because ln(3) is approximately 1.0986, and 114 is close enough to 100 * ln(3) for typical interest rates.'
  },
  {
    q: 'At what interest rate does the Rule of 114 work best?',
    a: 'The Rule of 114 is most accurate between 6% and 12% annual returns. At 8%, the rule gives 14.25 years while the exact answer is 14.27 years. At 15%, the approximation starts to drift more noticeably. For very high rates above 20%, use the exact logarithmic formula instead.'
  },
  {
    q: 'How does the Rule of 114 compare to actual compound interest?',
    a: 'The Rule of 114 assumes annual compounding. If your investment compounds monthly or quarterly, the actual time to triple will be shorter because compounding frequency accelerates growth. The calculator on this page shows both the Rule of 114 estimate and the exact mathematical result for comparison.'
  },
  {
    q: 'Can I use the Rule of 114 for retirement planning?',
    a: 'The Rule of 114 helps you set realistic expectations. If you need your corpus to triple before retirement and expect 10% returns, you know it takes roughly 11.4 years. Combined with the Rule of 72 for doubling, you can quickly map out a timeline: double in about 7.2 years, triple in about 11.4 years, quadruple in about 14.4 years.'
  },
  {
    q: 'What is the difference between the Rule of 114 and exact compound interest math?',
    a: 'The Rule of 114 is a quick estimate using simple division. The exact formula uses natural logarithms: ln(3) / ln(1 + rate). The rule gives 11.4 years at 10% while the exact answer is 11.53 years. For financial planning at the concept level, the rule is fast and close enough. For precise goal planning, use the calculator above which shows both numbers.'
  },
  {
    q: 'What types of investments can I evaluate with the Rule of 114?',
    a: 'Any lumpsum investment with an expected annual compound return: equity mutual fund lumpsum, fixed deposits, PPF, NPS, stocks held long term, or real estate appreciation estimates. The rule works best when the return rate is relatively stable and predictable, which is why it suits debt instruments and index funds more than volatile individual stocks.'
  },
  {
    q: 'Does the Rule of 114 work for any interest rate?',
    a: 'Mathematically the rule works at any positive rate, but its accuracy varies. Between 6% and 12%, the estimate stays very close to the exact logarithmic answer. Below 4% or above 18%, the gap widens enough that the exact figure this calculator shows should be used instead of the rounded rule.'
  },
  {
    q: 'What is the difference between the Rule of 114 and the Rule of 110?',
    a: 'Both are approximations of the same logarithmic tripling formula, built around a different rounded constant. The Rule of 114 is tuned to be more accurate in the 8% to 12% range where most Indian investors plan, while the Rule of 110 undershoots less at higher double-digit rates closer to 15% to 18%. Neither constant is universally more correct; each fits a different part of the return curve better.'
  },
  {
    q: 'How does the accuracy drift affect my planning?',
    a: 'Because the Rule of 114 increasingly understates tripling time as the return rises, relying on it alone for high-return assumptions can make a plan look faster than it really is. At 16%, the rule gives 7.1 years while the exact answer is about 7.4 years. Over a multi-decade retirement or education plan, small annual gaps like this compound into a meaningful difference in outcome.'
  },
  {
    q: 'Is a faster tripling time always better?',
    a: 'No. A shorter tripling time usually means a higher assumed return, and higher returns carry a higher risk of falling short, not a guarantee of the result. Use the Rule of 114 to compare realistic options rather than to chase the fastest number, and check any return assumption above 15% to 18% against SEBI-registered product disclosures before trusting it.'
  },
  {
    q: 'How does this calculator go beyond the basic Rule of 114 formula?',
    a: 'Beyond the plain 114-divided-by-rate shortcut, this calculator also computes the exact logarithmic tripling time, shows the gap between the two as an accuracy check, projects the actual amount your investment would reach, and charts the year-by-year growth path until tripling.'
  },
  {
    q: 'What return should I use in the calculator?',
    a: 'Use a return you can realistically sustain for the full period, not a best-case scenario. Common starting assumptions are 6% to 7% for fixed deposits and PPF, 8% to 10% for balanced or hybrid funds, and 10% to 12% for diversified equity funds over the long term, based on typical AMFI category return disclosures. Adjust downward for a margin of safety.'
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
  name: 'Rule of 114 Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/rule-of-114-calculator',
  description: 'Estimate how many years it takes for your investment to triple based on the expected annual return rate using the Rule of 114. Includes exact math comparison and multi-currency support.',
  featureList: [
    'Rule of 114 time-to-triple estimate',
    'Exact logarithmic calculation',
    'Growth projection chart',
    'Quick reference table',
    'Multi-currency support',
    'Investment amount projection',
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
    { '@type': 'ListItem', position: 3, name: 'Rule of 114 Calculator', item: 'https://fermor.in/calculators/rule-of-114-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Rule of 114 Calculator',
  description: 'Step-by-step guide to estimate how many years it takes for your investment to triple using the Rule of 114.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Rule of 114 Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Set the annual return rate',
      text: 'Move the slider or type your expected annual return rate. Common assumptions: 8% for balanced funds, 10% for large-cap equity, 12% for diversified equity.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter your investment amount (optional)',
      text: 'Type the lumpsum amount you plan to invest. The calculator projects the tripled value. Leave blank to see only the time estimate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Read the result',
      text: 'The dark result box shows the Rule of 114 estimate. Below it, the calculator also shows the exact mathematical answer for comparison, plus a summary sentence of the projection.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the growth chart and reference table',
      text: 'The growth timeline chart visualises how your investment compounds over time until it triples. The quick reference table shows years to triple for common interest rates from 4% to 20%.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Rule of 114',
  alternateName: 'Investment Tripling Rule',
  description: 'A mental math shortcut that estimates the number of years required for a lumpsum investment to triple in value by dividing 114 by the expected annual rate of return.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Rule_of_72',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Rule of 114 Calculator: Estimate How Long Investments Take to Triple',
  description: 'Free Rule of 114 calculator for India. Estimate how many years it takes for your investment to triple. Includes exact math comparison, quick reference table, and worked examples.',
  url: 'https://fermor.in/calculators/rule-of-114-calculator',
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
    { '@type': 'DefinedTerm', name: 'Rule of 114' },
    { '@type': 'DefinedTerm', name: 'Rule of 72' },
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, lumpsum investors, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-rule-of-114', name: 'What Is the Rule of 114' },
    { '@type': 'WebPageElement', cssSelector: '#where-the-number-comes-from', name: 'Where the Rule of 114 Number Comes From' },
    { '@type': 'WebPageElement', cssSelector: '#rule-of-114-formula', name: 'Rule of 114 Formula' },
    { '@type': 'WebPageElement', cssSelector: '#rule-72-vs-114', name: 'Rule of 72 vs Rule of 114' },
    { '@type': 'WebPageElement', cssSelector: '#tripling-time-by-investment', name: 'Tripling Time by Investment Type' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#real-world-examples', name: 'Real Rule of 114 Examples From India' },
    { '@type': 'WebPageElement', cssSelector: '#ways-to-use-well', name: 'Six Ways to Use the Rule of 114 Well' },
    { '@type': 'WebPageElement', cssSelector: '#key-facts', name: 'Key Rule of 114 Facts' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
    { '@type': 'WebPageElement', cssSelector: '#pairs-with-calculators', name: 'Which Calculators Pair With the Rule of 114' },
  ],
};

export default async function RuleOf114Page() {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <RuleOf114Client region={region} faqs={faqs} />
    </>
  );
}

import type { Metadata } from 'next';
import InflationClient from './InflationClient';

import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonical = `https://fermor.in/${region === 'in' ? 'calculators' : region}/inflation-calculator`;

  return {
    title: 'Inflation Calculator India: Future Value & Impact',
    description: 'Free inflation calculator for India. Estimate future purchasing power, inflation-adjusted value, and the long-term impact of inflation on your savings. Free to use.',
    keywords: [
      'inflation calculator', 'inflation calculator india', 'inflation adjusted value calculator',
      'future value inflation calculator', 'purchasing power calculator', 'inflation impact calculator',
      'calculator inflation rate', 'cost of living calculator india', 'inflation calculator online',
      'inflation calculator for retirement planning', 'real value of money calculator',
      'inflation adjusted return calculator', 'future cost calculator india', 'inflation calculator excel',
      'how does inflation affect savings calculator', 'inflation calculator for education cost',
      'inflation calculator for goal planning', 'cpi inflation calculator',
      'money value calculator over time', 'inflation calculator nri', 'what will my money be worth calculator',
      'historical inflation calculator', 'money inflation calculator', 'inflation adjusted calculator',
      'calculate inflation rate india', 'real vs nominal return calculator', 'rbi inflation rate calculator',
      'inflation calculator 2026', 'rupee inflation calculator', 'dollar inflation calculator',
      'us inflation calculator', 'inflation calculator usd', 'reverse inflation calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Inflation Calculator India: Future Value & Impact - Fermor',
      description: 'Calculate future cost, purchasing power loss, and real vs nominal returns. Current India CPI inflation 4.82% (Aug 2026). Free for India.',
      images: ['https://fermor.in/og-inflation-calculator.png'],
    },
    openGraph: {
      title: 'Inflation Calculator India: Future Value & Impact - Fermor',
      description: 'Estimate future purchasing power, inflation-adjusted value, and the long-term impact of inflation on your savings. Includes India CPI history, RBI inflation targeting, and real vs nominal return comparisons. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/inflation-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-inflation-calculator.png', width: 1200, height: 630, alt: 'Fermor Inflation Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-20';
const PAGE_DATE_MODIFIED = '2026-09-18';

const faqs = [
  {
    q: 'What is inflation?',
    a: 'Inflation is the rate at which the general level of prices for goods and services rises, and consequently, the purchasing power of currency falls. It means that a unit of currency (like Rs 1) buys less today than it did in the past.',
  },
  {
    q: 'How does inflation affect my savings?',
    a: 'If you keep your savings in cash or in a bank account that pays an interest rate lower than the inflation rate, the real value of your money decreases over time. You will be able to buy fewer goods and services with the same amount of money in the future.',
  },
  {
    q: 'What is the difference between nominal and real return?',
    a: 'Nominal return is the raw percentage increase in your investment without considering inflation. Real return is the nominal return minus the inflation rate. Real return tells you how much your purchasing power has actually increased.',
  },
  {
    q: 'How can I beat inflation?',
    a: 'To beat inflation, you need to invest your money in assets that provide a return higher than the inflation rate over the long term, after tax. Historically, equity mutual funds, real estate, and gold have been used by investors to outpace inflation.',
  },
  {
    q: 'Why does long-term planning matter when dealing with inflation?',
    a: 'Inflation compounds over time. A 6% inflation rate might not seem like much in a single year, but over 10 or 20 years, it can severely erode the value of your savings. Long-term planning ensures that your retirement corpus and investments are adjusted for future costs, not just today\'s costs.',
  },
  {
    q: 'What is the current inflation rate in India?',
    a: 'India\'s CPI inflation was 4.82% in August 2026, up from 4.44% in July and 4.38% in June, driven mainly by food and energy prices, per Ministry of Statistics (MOSPI) data. The Reserve Bank of India targets 4% inflation with a tolerance band of plus or minus 2 percentage points.',
  },
  {
    q: 'How does inflation impact retirement planning?',
    a: 'Inflation is the biggest threat to retirement planning. At a 6% inflation rate, the cost of living roughly doubles every 12 years. A retirement corpus that looks adequate today may fall well short in 20-30 years if inflation is not factored into the projection.',
  },
  {
    q: 'What is the difference between CPI and WPI inflation?',
    a: 'CPI (Consumer Price Index) measures price changes from the consumer\'s perspective and is what the RBI uses for monetary policy decisions. WPI (Wholesale Price Index) measures price changes at the wholesale or producer level, before goods reach retail shelves, and is not used for inflation targeting.',
  },
  {
    q: 'How does inflation affect different asset classes differently?',
    a: 'Equities tend to outperform inflation over the long term because companies can raise prices. Real estate and gold historically keep pace with or beat inflation. Fixed deposits and bonds often struggle to beat inflation after tax. Cash and savings accounts typically lose purchasing power over time.',
  },
  {
    q: 'Can deflation be worse than inflation?',
    a: 'Yes. Deflation, or falling prices, can lead to reduced consumer spending, business contraction, and economic recession, since buyers delay purchases expecting further price drops. Japan\'s "lost decades" of deflation are a well-known example. Moderate inflation of 2-4% is considered healthy for economic growth.',
  },
  {
    q: 'How accurate is this inflation calculator?',
    a: 'This calculator uses the standard compound growth formula for inflation projections. The accuracy depends on the inflation rate you input. For long-term planning, a 5-6% rate reflecting India\'s recent range provides a realistic baseline. Actual future inflation may vary significantly from any assumed rate.',
  },
  {
    q: 'What is the RBI\'s inflation target and how does it control inflation?',
    a: 'The RBI targets CPI inflation at 4%, with a tolerance band of 2% to 6%, under the flexible inflation targeting framework set by the government. It controls inflation mainly through the repo rate: raising the repo rate makes borrowing costlier and slows demand, while cutting it does the opposite. The repo rate stood at 5.25% as of the August 2026 Monetary Policy Committee meeting.',
  },
  {
    q: 'How is India\'s CPI basket weighted?',
    a: 'India\'s Consumer Price Index gives the largest weight to food and beverages, at roughly 39-40% of the all-India basket, followed by miscellaneous items (transport, health, education, recreation) at about 28%, housing at around 10%, and fuel and light at about 6.8%. The exact weights differ slightly between rural and urban baskets, per MOSPI.',
  },
  {
    q: 'What is core inflation and why does it matter?',
    a: 'Core inflation strips out food and fuel prices from headline CPI because those categories are the most volatile, swinging with monsoon harvests and global crude prices. Economists and the RBI watch core inflation to judge underlying, persistent price pressure in the economy, separate from short-term shocks.',
  },
  {
    q: 'Do EPF and PPF returns beat inflation?',
    a: 'EPF currently pays 8.25% and PPF pays 7.1% per annum, both tax-free under EEE status. Against CPI inflation in the 4.5-5% range, both instruments deliver a positive real return before considering the compounding effect, making them reasonable long-term debt allocations, though they are unlikely to outpace inflation by as wide a margin as equity over 15-20 year horizons.',
  },
  {
    q: 'Is there a separate calculator for real GDP or salary inflation adjustment?',
    a: 'This calculator handles any rupee amount, including salary or cost figures, using the same compound formula. For fund or portfolio returns specifically, run the nominal CAGR through the CAGR Calculator first, then use this calculator\'s inflation rate to convert it to a real, inflation-adjusted return.',
  },
  {
    q: 'How do I use this inflation calculator for 2026?',
    a: 'Enter the current amount, an inflation rate reflecting 2026 conditions (India\'s CPI inflation was 4.82% in August 2026), and the number of years to project. The calculator compounds that rate forward each year and shows the future cost, so a 2026 starting point simply means using this year\'s figures as your inputs.',
  },
  {
    q: 'Is there a separate rupee or dollar inflation calculator?',
    a: 'This calculator works in any currency. Set the currency selector to INR for a rupee inflation calculator, or to USD for a dollar-based projection, then enter the local inflation rate for that currency\'s economy, since Indian and US inflation rates differ and should not be swapped.',
  },
  {
    q: 'What is a reverse inflation calculator?',
    a: 'A reverse inflation calculator works backward from a present-day amount to estimate what it was worth in an earlier year, using PV = FV / (1 + r)^n. It answers "what was this amount worth N years ago" rather than "what will it be worth N years from now."',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Inflation',
    'Consumer Price Index',
    'Purchasing Power',
    'Real Returns',
    'RBI Monetary Policy',
    'Retirement Planning India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Inflation Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/inflation-calculator',
  description: 'Measure how inflation affects purchasing power over time. Estimate future costs, real vs nominal wealth, and inflation-adjusted value. Free, browser-based, no sign-up.',
  featureList: [
    'Future Cost Calculator',
    'Purchasing Power Loss Calculator',
    'Real vs Nominal Wealth Projection',
    'Year-by-Year Growth Table',
    'India CPI Inflation Rate History',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
    { '@type': 'ListItem', position: 3, name: 'Inflation Calculator', item: 'https://fermor.in/calculators/inflation-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate the Impact of Inflation',
  description: 'Step-by-step guide to measuring how inflation affects the future cost and purchasing power of your money.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Inflation Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the current amount', text: 'Enter the amount of money or price whose future value you want to calculate.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the inflation rate', text: 'Enter the expected annual inflation rate. India\'s recent CPI inflation has ranged between 4.5% and 6.5%.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose the time period', text: 'Set the number of years into the future you want to project.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the results', text: 'See the future cost, the purchasing power loss, and, with advanced settings, real vs nominal wealth if you invest.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Inflation',
  alternateName: 'CPI Inflation',
  description: 'The rate at which the general level of prices for goods and services rises, causing the purchasing power of a currency to fall.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Inflation',
    'https://www.wikidata.org/wiki/Q41207',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Inflation Calculator India: Future Value & Impact',
  description: 'Free online inflation calculator for India. Measure how inflation affects your purchasing power over time, with current CPI data and RBI inflation targeting context.',
  url: 'https://fermor.in/calculators/inflation-calculator',
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
    { '@type': 'DefinedTerm', name: 'Inflation', alternateName: 'CPI Inflation' },
    { '@type': 'DefinedTerm', name: 'CPI', alternateName: 'Consumer Price Index' },
    { '@type': 'DefinedTerm', name: 'Real Return' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-inflation', name: 'What Is Inflation' },
    { '@type': 'WebPageElement', cssSelector: '#how-inflation-affects-purchasing-power', name: 'How Inflation Affects Purchasing Power' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-formula', name: 'Inflation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-formula-excel', name: 'Inflation Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-inflation-calculator', name: 'Reverse Inflation Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-much-return-to-beat-inflation', name: 'How Much Return Do You Need to Beat Inflation' },
    { '@type': 'WebPageElement', cssSelector: '#real-vs-nominal-return', name: 'Real Return vs Nominal Return' },
    { '@type': 'WebPageElement', cssSelector: '#india-historical-inflation', name: "India's Historical Inflation Rate" },
    { '@type': 'WebPageElement', cssSelector: '#rbi-inflation-targeting', name: 'RBI Inflation Targeting and the Repo Rate' },
    { '@type': 'WebPageElement', cssSelector: '#cpi-basket-weights', name: "How India's CPI Basket Is Weighted" },
    { '@type': 'WebPageElement', cssSelector: '#core-vs-headline-inflation', name: 'Core Inflation vs Headline Inflation' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-and-fixed-income', name: 'Inflation and EPF, PPF Real Returns' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-and-mutual-funds', name: 'Inflation and Mutual Fund Returns' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Inflation Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Inflation Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function InflationPage() {
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
      <InflationClient region={region} faqs={faqs} />
    </>
  );
}

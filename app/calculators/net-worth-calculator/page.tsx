import type { Metadata } from 'next';
import NetWorthClient from './NetWorthClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/net-worth-calculator`;
  return {
    title: 'Net Worth Calculator: Calculate Your Net Worth in India',
    description: 'Free net worth calculator for India. Add your assets and subtract liabilities to see your exact net worth. Includes donut chart, breakdown by category, and liquid net worth tracking.',
    keywords: [
      'net worth calculator',
      'net worth calculator india',
      'calculate net worth',
      'personal net worth calculator',
      'net worth tracker',
      'asset liability calculator',
      'financial health calculator',
      'net worth formula',
      'what is my net worth',
      'net worth calculator online',
      'net worth calculation formula',
      'total assets minus liabilities',
      'net worth excel',
      'net worth tracker india',
      'personal finance net worth',
      'nri net worth calculator',
      'retirement net worth',
      'net worth by age india',
      'average net worth india',
      'how to calculate net worth',
      'net worth statement',
      'wealth calculator',
      'financial independence net worth',
      'net worth tracker free',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Net Worth Calculator: Calculate Your Net Worth in India',
      description: 'Calculate your net worth by adding all assets and subtracting liabilities. See your asset-liability ratio, liquid net worth, and category breakdown with visual charts.',
      images: ['https://fermor.in/og-net-worth-calculator.png'],
    },
    openGraph: {
      title: 'Net Worth Calculator: Calculate Your Net Worth in India - Fermor',
      description: 'Calculate your net worth by adding all assets and subtracting liabilities. See your asset-liability ratio, liquid net worth, and category breakdown with visual charts.',
      type: 'website',
      url: 'https://fermor.in/calculators/net-worth-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-net-worth-calculator.png', width: 1200, height: 630, alt: 'Fermor Net Worth Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-23';
const PAGE_DATE_PUBLISHED = '2026-06-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Net Worth',
    'Personal Finance India',
    'Account Aggregator Framework',
    'Assets and Liabilities',
    'Financial Planning India',
    'Wealth Management India',
    'Investment Tracking',
    'Retirement Planning',
    'NRI Financial Planning',
    'Debt Management',
    'Financial Independence',
    'Indian Investment Products',
  ],
};

const faqs = [
  { q: 'What is net worth?', a: 'Net worth is the difference between what you own (assets) and what you owe (liabilities). Net worth = Total Assets minus Total Liabilities. A positive net worth means your assets exceed your debts. A negative net worth means you owe more than you own. It is the single most comprehensive measure of your financial health.' },
  { q: 'How is net worth calculated?', a: 'Net worth is calculated by adding all your assets and subtracting all your liabilities. Assets include cash in bank accounts, investments (stocks, mutual funds, PPF, EPF, NPS), property (home value minus any mortgage), vehicles, and other valuable items. Liabilities include home loan, personal loan, car loan, education loan, credit card debt, and any other money you owe.' },
  { q: 'What is a good net worth by age in India?', a: 'There is no official government dataset breaking down net worth by age in India, so any specific age-bracket figure is an illustrative planning heuristic rather than a verified statistic. A more grounded reference point: the RBI Household Finance Committee report (2017) found the average urban Indian household held roughly Rs 27.2 lakh in net worth as of 2018. Your personal progress toward your own goals matters more than any age-based comparison.' },
  { q: 'Should I include my home in net worth?', a: 'Yes, include your home at its current market value minus any outstanding home loan. However, your primary residence is not an income-generating asset, so financial independence calculations often exclude it. For a complete net worth picture, include it at fair market value. Update the value annually based on comparable property prices in your area.' },
  { q: 'What assets should I include in net worth?', a: 'Include all assets: savings account balances, fixed deposits, stocks, mutual funds, PPF, EPF, NPS, gold, real estate (at market value), vehicles, and any other valuable possessions. Do not include small personal items like clothing or electronics unless they are exceptionally valuable. Be realistic about market values rather than purchase prices.' },
  { q: 'What liabilities should I include in net worth?', a: 'Include all debts: home loan outstanding, personal loan, car loan, education loan, credit card balances, loans against fixed deposits or insurance, and any money borrowed from family or friends that you intend to repay. Do not include monthly bills like utility payments or rent that are not accumulated debts.' },
  { q: 'How often should I calculate my net worth?', a: 'Quarterly is ideal for most people. Monthly tracking works if you are actively working on debt reduction or building wealth. Annual tracking is the minimum recommended frequency. Regular tracking helps you see whether your financial decisions are moving you in the right direction and catches problems early.' },
  { q: 'What is the difference between net worth and liquid net worth?', a: 'Net worth includes all assets including illiquid ones like your home and vehicles. Liquid net worth only includes assets that can be converted to cash quickly within 30 days: savings, FDs, stocks, mutual funds, EPF. Liquid net worth is a better measure of your financial flexibility and emergency preparedness. Most financial planners recommend tracking both.' },
  { q: 'What is a negative net worth and should I worry?', a: 'A negative net worth means your total liabilities exceed your total assets. This is common for young professionals who have student loans, a home loan, or a car loan and have not yet accumulated significant assets. It is not necessarily a crisis if you have a stable income and a plan to reduce debt. Track your net worth quarterly to ensure the trend is moving toward positive territory.' },
  { q: 'How can I increase my net worth?', a: 'Increase net worth by: increasing your savings rate (save at least 20 per cent of income), investing savings in assets that appreciate (equity mutual funds, PPF, NPS, real estate), reducing high-interest debt (credit cards, personal loans), avoiding lifestyle inflation when your income grows, and tracking your net worth regularly to stay motivated. Every rupee saved and invested is a step toward a higher net worth.' },
  { q: 'Should couples combine net worth?', a: 'Most financial planners recommend tracking individual net worth separately and a combined household net worth. This helps both partners understand their financial position and work toward shared goals. For married couples in India, joint assets like the family home and joint investments should be split or counted fully based on how you manage finances.' },
  { q: 'Is net worth the same as wealth?', a: 'Net worth is a snapshot of your financial position at a given point in time. Wealth is a broader concept that includes your net worth plus your earning potential, financial knowledge, and the quality of your financial systems. A high net worth from inheritance is different from a high net worth built through consistent saving and investing.' },
  { q: 'What does the RBI Household Finance Committee report say about Indian household wealth?', a: 'The RBI-commissioned Household Finance Committee report (2017) found the average urban Indian household held a net worth of roughly Rs 27.2 lakh as of 2018, made up of approximately 64% real estate, 11% gold and jewellery, 17% financial assets, and 8% other physical assets. It also found only about 23% of households were actively saving or planning for retirement, a notably low figure.' },
  { q: 'Why is real estate such a large share of Indian household net worth?', a: 'The RBI Household Finance Committee report found real estate accounts for roughly 64% of average urban Indian household assets, far higher than in most developed economies, reflecting a cultural preference for property ownership and historically limited penetration of financial market instruments among Indian households.' },
  { q: 'How should NRIs track net worth across two currencies?', a: 'Pick one reporting currency and convert every Indian and foreign asset and liability using a consistent exchange rate snapshot each quarter, rather than the rate on the day of each individual entry. This avoids exchange rate movements alone distorting the reported net worth trend from quarter to quarter.' },
  { q: 'Should NRE and NRO account balances count toward net worth?', a: 'Yes. NRE and NRO account balances, Indian property, and any Indian home loan should be included in an NRI’s net worth calculation on the same basis as a resident’s, converted into the chosen reporting currency at a consistent exchange rate.' },
  { q: 'What percentage of Indians actively save for retirement, according to RBI data?', a: 'The RBI Household Finance Committee report (2017) found only about 23% of Indian households were actively saving or planning for retirement, meaning most households have no explicit plan for old-age income even though real estate and gold dominate their asset holdings.' },
  { q: 'Is a house purchased with a home loan a net-worth-positive move?', a: 'It depends on the down payment and market value. Buying a home increases assets by the property value but also adds a liability equal to the loan amount, so the immediate effect on net worth equals only the down payment plus any principal already repaid, not the full property price.' },
  { q: 'Does gold count differently from other assets in net worth?', a: 'No, gold is valued like any other asset at its current market value, though it tends to be less liquid than stocks or mutual funds since converting jewellery to cash usually involves a discount for making charges. Investment-grade gold (coins, bars, sovereign gold bonds) is more straightforward to value and liquidate than jewellery.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.' },
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

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Net Worth Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/net-worth-calculator',
  description: 'Calculate your net worth by adding all assets and subtracting liabilities. See asset-liability ratio, liquid net worth, category breakdown with donut chart. Multi-currency support for Indian investors and NRIs.',
  featureList: [
    'Net Worth Calculation',
    'Asset category breakdown',
    'Liability category breakdown',
    'Asset-liability ratio',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Liquid net worth display',
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
    { '@type': 'ListItem', position: 3, name: 'Net Worth Calculator', item: 'https://fermor.in/calculators/net-worth-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Net Worth',
  description: 'Step-by-step guide to calculate your personal net worth by adding assets and subtracting liabilities.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Net Worth Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Add your cash and bank balances', text: 'Enter the total balance in your savings accounts, fixed deposits, and cash in hand.' },
    { '@type': 'HowToStep', position: 2, name: 'Add your investments', text: 'Enter the current value of your stocks, mutual funds, PPF, EPF, NPS, and other investments.' },
    { '@type': 'HowToStep', position: 3, name: 'Add your property and assets', text: 'Enter the market value of your home, other real estate, vehicles, gold, and other valuable assets.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter your liabilities and see your net worth', text: 'Enter all your loans and debts. The calculator subtracts total liabilities from total assets to show your net worth.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Net Worth',
  alternateName: 'Personal Net Worth',
  description: 'The difference between total assets owned and total liabilities owed, representing an individual financial position at a given point in time.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Personal Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Net_worth', 'https://www.wikidata.org/wiki/Q180436'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Net Worth Calculator: Calculate Your Net Worth in India',
  description: 'Calculate your net worth by adding all assets (cash, investments, property) and subtracting liabilities (loans, credit cards) in this free online calculator.',
  url: 'https://fermor.in/calculators/net-worth-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Net Worth', alternateName: 'Personal Net Worth' }],
  audience: { '@type': 'Audience', audienceType: 'Indian individuals, couples, NRI investors, financial planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-net-worth', name: 'What Is Net Worth' },
    { '@type': 'WebPageElement', cssSelector: '#net-worth-formula', name: 'Net Worth Formula' },
    { '@type': 'WebPageElement', cssSelector: '#what-to-include', name: 'What to Include in Net Worth' },
    { '@type': 'WebPageElement', cssSelector: '#net-worth-by-age', name: 'Net Worth by Age in India' },
    { '@type': 'WebPageElement', cssSelector: '#improve-net-worth', name: 'How to Improve Your Net Worth' },
    { '@type': 'WebPageElement', cssSelector: '#liquid-vs-total-net-worth', name: 'Liquid vs Total Net Worth' },
    { '@type': 'WebPageElement', cssSelector: '#net-worth-tracking', name: 'Net Worth Tracking Frequency' },
    { '@type': 'WebPageElement', cssSelector: '#nri-net-worth-tracking', name: 'Net Worth Tracking for NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#net-worth-limitations', name: 'Limitations of Net Worth' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Net Worth Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function NetWorthCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <NetWorthClient faqs={faqs} />
    </>
  );
}

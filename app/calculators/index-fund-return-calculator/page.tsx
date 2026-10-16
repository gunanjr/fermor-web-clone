import type { Metadata } from 'next';
import IndexFundReturnCalculatorClient from './IndexFundReturnCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-10-13';

export const metadata: Metadata = {
  title: 'Index Fund Return Calculator: Lumpsum, SIP and CAGR',
  description: 'Free index fund return calculator for India. Project lumpsum and SIP growth after expense ratio and tax, or find CAGR from NAV. Free to use.',
  keywords: [
    'index fund return calculator',
    'index fund calculator',
    'calculate index fund returns',
    'index fund sip calculator',
    'index mutual fund calculator',
    'nifty index fund calculator',
    'nifty 50 index fund calculator',
    'index fund investment calculator',
    'index fund growth calculator',
    'index fund compound interest calculator',
    'index fund lumpsum calculator',
    'index fund cagr calculator',
    'index fund returns after expense ratio',
    'index fund returns after tax',
    'index fund expense ratio impact',
    'index fund vs active fund',
    'index fund vs etf',
    'index fund tracking error',
    'index fund tax india',
    'index fund ltcg calculator',
    'nifty 50 sip returns',
    'sip 5000 per month for 10 years',
    'sip 5000 per month for 20 years',
    'average mutual fund return',
    'sensex index fund calculator',
    'index fund step up sip calculator',
    'how to calculate index fund returns',
    'index fund future value calculator',
    'passive fund return calculator',
    'index fund maturity calculator',
  ],
  openGraph: {
    title: 'Index Fund Return Calculator: Lumpsum, SIP and CAGR - Fermor',
    description: 'Project index fund growth after expense ratio and tax with a lumpsum, a step-up SIP or purchase and current NAV. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/index-fund-return-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-index-fund-return-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Index Fund Return Calculator - Fermor',
    description: 'Lumpsum, SIP and NAV-based index fund returns after expense ratio and tax. Free to use.',
    images: ['https://fermor.in/og-index-fund-return-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/index-fund-return-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Index Fund Returns', 'CAGR Calculation', 'Nifty 50 Index', 'Sensex Index', 'Expense Ratio', 'Tracking Error', 'Passive Investing India', 'Index Fund Taxation', 'LTCG Tax', 'SIP Investing', 'Lumpsum Investment', 'Mutual Fund Returns'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Index Fund Return Calculator', item: 'https://fermor.in/calculators/index-fund-return-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is an index fund return calculator?',
    a: 'An index fund return calculator projects what an index fund investment grows to, after the fund\'s expense ratio and, here, after tax. You can run a lumpsum, a SIP with an optional yearly step-up, or work out the return from a purchase NAV and a current NAV.',
  },
  {
    q: 'How are index fund returns calculated?',
    a: 'The index fund NAV is already net of the expense ratio, so the yearly return is the index return minus the expense ratio. A 12% index with a 0.2% expense ratio gives 11.8% a year. Compound that over the years you hold.',
  },
  {
    q: 'How is index fund CAGR calculated?',
    a: 'CAGR = (current NAV / purchase NAV) ^ (1 / years) - 1. If a NAV grows from Rs 100 to Rs 200 in 5 years, the CAGR is (200 / 100) ^ (1 / 5) - 1, which is 14.87% a year.',
  },
  {
    q: 'What return should I assume for an index fund?',
    a: 'No return is guaranteed, so use a planning range. On Rs 1 lakh for 10 years at a 0.2% expense ratio, an index return of 8%, 10%, 12% and 14% gives Rs 2,11,928, Rs 2,54,697, Rs 3,05,083 and Rs 3,64,269. Test the low end too.',
  },
  {
    q: 'How much will Rs 1 lakh grow to in an index fund in 10 years?',
    a: 'At a 12% index return and a 0.2% expense ratio, Rs 1 lakh becomes Rs 3,05,083 in 10 years. Without the expense ratio it would be Rs 3,10,585, so the fee costs Rs 5,502. After 12.5% long-term capital gains tax, you keep Rs 2,95,073.',
  },
  {
    q: 'How much will Rs 5,000 a month grow to in 10 years?',
    a: 'A Rs 5,000 monthly SIP for 10 years invests Rs 6,00,000 and grows to Rs 10,98,057 at a 12% index return and a 0.2% expense ratio. After tax on the gain you keep Rs 10,51,142.',
  },
  {
    q: 'How much will Rs 5,000 a month grow to in 20 years?',
    a: 'A Rs 5,000 monthly SIP for 20 years invests Rs 12,00,000 and grows to Rs 44,48,044 on the same assumptions. The gain is Rs 32,48,044, and after tax you keep Rs 40,57,380.',
  },
  {
    q: 'How much does the expense ratio reduce index fund returns?',
    a: 'On Rs 1 lakh for 20 years at a 12% index return, a 0.2% expense ratio costs Rs 33,873, or 3.5% of the final value. A 1% ratio costs Rs 1,58,398, or 16.4%. The gap widens every year you stay invested.',
  },
  {
    q: 'What is a good expense ratio for an index fund?',
    a: 'Lower is better when two funds track the same index, because the fee is the main difference between them. Compare the ratio in each scheme factsheet and choose the direct plan, which has no distributor commission.',
  },
  {
    q: 'What is tracking difference and tracking error?',
    a: 'Tracking difference is the fund return minus the index return over a period, usually a little below zero because of costs. Tracking error is how much that gap varies from day to day. Both should be small for a good index fund.',
  },
  {
    q: 'Does an index fund beat an active fund?',
    a: 'It does when the active fund does not out-earn its extra cost. An active fund charging 1.5% against an index fund at 0.2% must beat the index by 1.3% a year just to match it. Check each fund\'s record against its own benchmark.',
  },
  {
    q: 'Are index fund returns taxable in India?',
    a: 'Yes. For equity index funds sold on or after 23 July 2024, gains on units held more than 12 months are taxed at 12.5% above Rs 1.25 lakh in a year, and gains on units held 12 months or less at 20%. Rates exclude surcharge and cess.',
  },
  {
    q: 'How does this calculator work out the tax?',
    a: 'It taxes the gain you would book if you sold everything at the end. On Rs 1 lakh grown to Rs 3,05,083, the gain is Rs 2,05,083. The part above Rs 1.25 lakh, Rs 80,083, is taxed at 12.5%, which is Rs 10,010.',
  },
  {
    q: 'How are SIP gains taxed?',
    a: 'Each instalment has its own holding period, and units are sold oldest first. Gains on instalments paid in the last 12 months are short-term at 20%, and older gains are long-term at 12.5% above Rs 1.25 lakh. The SIP tab splits them this way.',
  },
  {
    q: 'Is one year of holding long-term?',
    a: 'No. A gain is long-term only when you hold the units for more than 12 months. Selling after exactly 12 months is short-term. This calculator treats a 1-year holding as short-term and anything longer as long-term.',
  },
  {
    q: 'What is the difference between a Nifty 50 and a Sensex index fund?',
    a: 'A Nifty 50 index fund tracks the NSE index of 50 large companies, and a Sensex index fund tracks the BSE index of 30. Both hold large-cap leaders and their returns are usually close. Check the index factsheets on NSE and BSE.',
  },
  {
    q: 'What is the difference between an index fund and an ETF?',
    a: 'An index fund is bought and sold at the end-of-day NAV through a fund house and supports small SIPs. An ETF trades on the exchange at market price, needs a demat account and costs brokerage. Both track an index.',
  },
  {
    q: 'Can I lose money in an index fund?',
    a: 'Yes. An index fund falls when its index falls, and over a short period you can end below what you put in. Equity index returns are not guaranteed over any period. Plan for the low case, not just the average one.',
  },
  {
    q: 'What happens to an index fund in a market crash?',
    a: 'It falls with the index, because it holds the same stocks in the same weights, and it recovers with the index too. A SIP buys more units when prices are low, which is why long SIPs are common with index funds.',
  },
  {
    q: 'Should I invest a lumpsum or a SIP in an index fund?',
    a: 'A lumpsum puts all the money to work at once. A SIP spreads the purchase over months and years from your income. Use the Lumpsum and SIP tabs with the same return and compare the results.',
  },
  {
    q: 'Does a step-up SIP help in an index fund?',
    a: 'Yes, it raises the amount each year in line with your income. A Rs 10,000 SIP with a 10% yearly step-up for 20 years invests Rs 68,73,000 and grows to Rs 1,81,11,959 at 12% and a 0.2% expense ratio.',
  },
  {
    q: 'How does the calculator compound a SIP?',
    a: 'It converts the net yearly return into an effective monthly rate, (1 + r) ^ (1 / 12) - 1, and adds each instalment at month end. Calculators that divide the yearly rate by 12 show a somewhat higher result.',
  },
  {
    q: 'Can I use this calculator for an ETF?',
    a: 'Yes, for the return maths, but an ETF also costs brokerage and has a market price that can differ from NAV. The ETF Return Calculator handles those extras. The expense ratio here is the fund\'s ongoing charge.',
  },
  {
    q: 'What does this calculator not include?',
    a: 'It leaves out exit load, STT, brokerage, stamp duty, surcharge and cess, and it assumes the index return is steady every year. Real returns vary year to year, so treat the result as a planning estimate.',
  },
  {
    q: 'How do I calculate index fund returns in Excel?',
    a: 'For a lumpsum use =PV*(1+(Index-ER))^Years. For a SIP use =FV((1+(Index-ER))^(1/12)-1, Years*12, -SIP). For CAGR use =(End/Start)^(1/Years)-1. Enter the rates as decimals, such as 0.12.',
  },
  {
    q: 'What is the minimum SIP for an index fund?',
    a: 'It depends on the scheme, and many index funds accept small monthly SIPs. Check the scheme information document. This calculator accepts a SIP from Rs 500 a month.',
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
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Index Fund Return Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/index-fund-return-calculator',
  description: 'Project index fund growth with a lumpsum, a SIP with an optional yearly step-up, or a purchase and current NAV. Results are net of the expense ratio and show tax at 12.5% long-term and 20% short-term equity rates.',
  featureList: ['Lumpsum, SIP and purchase-NAV tabs', 'Net return after the expense ratio', 'Cost of the expense ratio against a no-fee fund', 'Capital gains tax at 12.5% long-term above Rs 1.25 lakh and 20% short-term', 'First-in-first-out tax split for SIP instalments', 'Step-up SIP with a yearly increase', 'CAGR and absolute return from NAV', 'Donut chart of what you keep against fee cost', 'Year-by-year chart and table', 'Multi-currency symbol selector', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the Index Fund Return Calculator', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Index Fund Return Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick a tab', text: 'Choose Lumpsum for a one-time investment, SIP for a monthly investment with an optional yearly step-up, or From NAV to find the return from a purchase NAV and a current NAV.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the amount', text: 'Enter the lumpsum or the monthly SIP. For the From NAV tab, enter the amount invested, the NAV you bought at and the NAV today.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the index return and expense ratio', text: 'Enter the yearly return you expect from the index and the fund expense ratio from the scheme factsheet. The fund return is the index return minus the expense ratio.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose the holding period', text: 'Set the number of years, using the presets for common horizons.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the result', text: 'Review the value, the cost of the expense ratio, the tax and the after-tax value, then open the dropdown for the year-by-year chart and table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Index Fund', alternateName: 'Passive index fund',
  description: 'A mutual fund that holds the securities of a market index, such as the Nifty 50, in the same weights, so that its return follows the index return less the fund expense ratio.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Investment and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Index_fund', 'https://www.wikidata.org/wiki/Q1195348'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Index Fund Return Calculator: Lumpsum, SIP and CAGR',
  url: 'https://fermor.in/calculators/index-fund-return-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Index Fund', alternateName: 'Passive index fund' }],
  audience: { '@type': 'Audience', audienceType: 'Indian retail investors, passive investing enthusiasts, SIP investors, first-time mutual fund investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-index-fund-return', name: 'What Is Index Fund Return' },
    { '@type': 'WebPageElement', cssSelector: '#how-index-fund-returns-are-calculated', name: 'How Index Fund Returns Are Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-worked-example', name: 'Lumpsum Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#sip-worked-example', name: 'SIP Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#expense-ratio-impact', name: 'Expense Ratio Impact' },
    { '@type': 'WebPageElement', cssSelector: '#index-vs-active', name: 'Index Fund vs Active Fund' },
    { '@type': 'WebPageElement', cssSelector: '#index-fund-tax', name: 'Index Fund Tax in India' },
    { '@type': 'WebPageElement', cssSelector: '#nifty-vs-sensex', name: 'Nifty 50 vs Sensex Index Funds' },
    { '@type': 'WebPageElement', cssSelector: '#index-fund-vs-etf', name: 'Index Fund vs ETF' },
    { '@type': 'WebPageElement', cssSelector: '#tracking-difference', name: 'Tracking Difference and Tracking Error' },
    { '@type': 'WebPageElement', cssSelector: '#index-fund-limits', name: 'Limits of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#index-fund-in-excel', name: 'Index Fund Returns in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function IndexFundReturnCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <IndexFundReturnCalculatorClient faqItems={faqItems} />
    </>
  );
}

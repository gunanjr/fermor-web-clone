import type { Metadata } from 'next';
import ETFReturnCalculatorClient from './ETFReturnCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-10-13';

export const metadata: Metadata = {
  title: 'ETF Return Calculator: Returns, SIP and ETF vs Mutual Fund',
  description: 'Free ETF return calculator for India. Find returns from buy and current price, ETF SIP growth and ETF vs mutual fund, after charges and tax. Free to use.',
  keywords: [
    'etf return calculator',
    'etf calculator',
    'etf sip calculator',
    'etf compound calculator',
    'etf savings calculator',
    'etf growth calculator',
    'etf investment calculator',
    'etf returns after tax',
    'etf cagr calculator',
    'etf vs mutual fund calculator',
    'etf vs index fund',
    'etf expense ratio impact',
    'etf brokerage calculator',
    'etf tracking error',
    'etf capital gains tax india',
    'gold etf return calculator',
    'nifty etf calculator',
    'how to calculate etf returns',
    'etf return formula',
    'etf future value calculator',
    'etf profit calculator',
    'exchange traded fund calculator',
    'etf lumpsum calculator',
    'etf monthly investment calculator',
    'etf return in excel',
    'etf price return calculator',
    'etf absolute return calculator',
    'etf vs mutual fund returns',
    'etf investment india',
    'etf tax calculator',
  ],
  openGraph: {
    title: 'ETF Return Calculator: Returns, SIP and ETF vs Mutual Fund - Fermor',
    description: 'Work out ETF returns from prices, project an ETF SIP, and compare an ETF with a mutual fund after charges and tax. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/etf-return-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-etf-return-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ETF Return Calculator - Fermor',
    description: 'ETF returns, SIP growth and ETF vs mutual fund after charges and tax. Free to use.',
    images: ['https://fermor.in/og-etf-return-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/etf-return-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['ETF Returns', 'Exchange Traded Funds', 'CAGR Calculation', 'ETF vs Mutual Fund', 'Expense Ratio', 'Tracking Error', 'ETF SIP', 'Capital Gains Tax', 'LTCG Tax', 'Passive Investing India'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'ETF Return Calculator', item: 'https://fermor.in/calculators/etf-return-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is an ETF return calculator?',
    a: 'An ETF return calculator works out what an ETF investment earns after brokerage and tax. You can enter a buy price and a current price, project a monthly SIP, or compare an ETF with a mutual fund over the same period.',
  },
  {
    q: 'How is ETF return calculated?',
    a: 'Absolute return is (current price - buy price) / buy price. For a yearly figure use CAGR = (current price / buy price) ^ (1 / years) - 1. A price that rises from Rs 100 to Rs 180 in 5 years is an 80% absolute return and 12.47% a year.',
  },
  {
    q: 'How is ETF CAGR calculated?',
    a: 'CAGR = (current price / buy price) ^ (1 / years) - 1. If a unit bought at Rs 100 is worth Rs 200 after 5 years, the CAGR is (200 / 100) ^ (1 / 5) - 1, which is 14.87% a year.',
  },
  {
    q: 'What is the difference between ETF price and NAV?',
    a: 'NAV is the value of the fund\'s holdings per unit, and the price is what the unit trades at on the exchange. The two are usually close but can differ. This calculator uses the prices you actually paid and expect to receive.',
  },
  {
    q: 'How much will Rs 1 lakh grow to in an ETF in 10 years?',
    a: 'At a 12% index return, a 0.10% expense ratio and 0.10% charges on the buy and the sale, Rs 1 lakh becomes Rs 3,07,208 in 10 years. After 12.5% long-term capital gains tax of Rs 10,276 you keep Rs 2,96,932.',
  },
  {
    q: 'How much will Rs 5,000 a month grow to in an ETF in 10 years?',
    a: 'A Rs 5,000 monthly ETF SIP for 10 years invests Rs 6,00,000 and grows to Rs 11,01,631 after charges, at a 12% index return and a 0.10% expense ratio. After tax of Rs 47,354 you keep Rs 10,54,277.',
  },
  {
    q: 'How much will Rs 5,000 a month grow to in an ETF in 20 years?',
    a: 'On the same assumptions, 20 years invests Rs 12,00,000 and grows to Rs 44,92,703 after charges. The gain is Rs 32,92,703, and after tax of Rs 3,96,238 you keep Rs 40,96,466.',
  },
  {
    q: 'What is an ETF SIP calculator?',
    a: 'An ETF SIP calculator projects what regular monthly purchases of an ETF grow to. The SIP tab here compounds each instalment at the effective monthly rate, takes off the charge on every purchase and on the final sale, and then works out tax.',
  },
  {
    q: 'Can I do a SIP in an ETF?',
    a: 'Yes, in two ways. Some brokers offer an ETF SIP feature, and otherwise you can buy units by hand each month. Each purchase is a separate trade with its own brokerage, so check what your broker charges.',
  },
  {
    q: 'Can I use this as an ETF growth or compound calculator?',
    a: 'Yes. The lumpsum comparison and the SIP tab both compound a yearly return over the years you choose, and the schedule shows the value at the end of each year. The From Price tab shows growth between two actual prices.',
  },
  {
    q: 'How much does the expense ratio reduce ETF returns?',
    a: 'On Rs 1 lakh for 20 years at 12%, a 0.05% ratio costs Rs 8,576, a 0.5% ratio costs Rs 82,571 and a 1% ratio costs Rs 1,58,398. The ratio is already inside the NAV, so you never see it as a separate bill.',
  },
  {
    q: 'How do brokerage and charges affect ETF returns?',
    a: 'Charges are paid on the buy and again on the sale. On Rs 1 lakh for 10 years at 12%, charges of 0.10% on each trade lower the final value from Rs 3,07,823 to Rs 3,07,208, and 0.50% lowers it to Rs 3,04,752.',
  },
  {
    q: 'What are tracking difference and tracking error?',
    a: 'Tracking difference is the ETF return minus the index return over a period. Tracking error is how much that gap moves. A good ETF has a small difference, usually a little below zero, and a low error.',
  },
  {
    q: 'Is an ETF better than a mutual fund?',
    a: 'It depends on cost and what the mutual fund earns. With a 12% return on both, an ETF at a 0.10% ratio turns Rs 1 lakh into Rs 3,07,208 in 10 years against Rs 2,83,942 for a mutual fund at a 1% ratio, a gap of Rs 23,265.',
  },
  {
    q: 'How much must a mutual fund beat an ETF by?',
    a: 'With a 1% ratio against the ETF\'s 0.10%, and 0.10% charges on each ETF trade, the mutual fund must earn about 12.88% before costs to match an ETF earning 12%. That is roughly 0.88% a year of extra performance.',
  },
  {
    q: 'What is the difference between an ETF and an index fund?',
    a: 'An ETF trades on the exchange at a live price and needs a demat account. An index fund is bought at the end-of-day NAV from a fund house and suits small SIPs. The Index Fund Return Calculator covers that side.',
  },
  {
    q: 'Are ETF returns taxable in India?',
    a: 'Yes. For equity ETFs sold on or after 23 July 2024, gains on units held more than 12 months are taxed at 12.5% above Rs 1.25 lakh in a year, and gains on units held 12 months or less at 20%. Rates exclude surcharge and cess.',
  },
  {
    q: 'How does this calculator work out the tax?',
    a: 'It taxes the gain after your buy and sale charges. On Rs 1 lakh that ends at Rs 3,07,208, the gain is Rs 2,07,208. The part above Rs 1.25 lakh, Rs 82,208, is taxed at 12.5%, which is Rs 10,276.',
  },
  {
    q: 'What if I sell within a year?',
    a: 'The gain is short-term and taxed at 20% with no exemption. Take 1,000 units bought at Rs 100 and sold at Rs 130 after one year with 0.10% charges. The taxable gain is Rs 29,770 and the tax is Rs 5,954.',
  },
  {
    q: 'How are gold and debt ETFs taxed?',
    a: 'They follow different rules from equity ETFs. This calculator applies the equity rate, so for a gold or debt ETF use the figures before tax and check the current rules on incometaxindia.gov.in.',
  },
  {
    q: 'Do ETF dividends count in this calculator?',
    a: 'No. The calculator tracks price growth only. Many ETFs reinvest dividends into the NAV and some pay them out, so check the scheme document. Payouts are taxable in your hands at your slab rate.',
  },
  {
    q: 'What return should I assume for an ETF?',
    a: 'No return is guaranteed, so test a range. On Rs 1 lakh for 10 years, an index return of 8%, 10%, 12% and 14% gives Rs 2,13,474, Rs 2,56,512, Rs 3,07,208 and Rs 3,66,748 before tax.',
  },
  {
    q: 'Can I lose money in an ETF?',
    a: 'Yes. An ETF falls when the index it tracks falls, and over a short period you can end below what you put in. A price that falls from Rs 100 to Rs 70 over 3 years is a loss of 11.21% a year.',
  },
  {
    q: 'What is the minimum investment in an ETF?',
    a: 'The price of one unit, since ETFs trade like shares. You can buy a single unit through a broker. You need a demat and trading account, which an index fund does not require.',
  },
  {
    q: 'What is an ETF premium or discount?',
    a: 'When the market price is above the NAV the ETF trades at a premium, and below it, a discount. Liquid ETFs stay close to NAV. Check the gap before you place a large order.',
  },
  {
    q: 'Which ETF is the best?',
    a: 'Fermor does not rank funds. Compare the expense ratio, tracking difference, trading volume and the index each ETF follows in the scheme factsheet, and choose the lowest cost for the index you want.',
  },
  {
    q: 'How do I calculate ETF returns in Excel?',
    a: 'For absolute return use =(Current-Buy)/Buy. For CAGR use =(Current/Buy)^(1/Years)-1. For a SIP use =FV((1+(Index-ER))^(1/12)-1, Years*12, -SIP). Enter rates as decimals, such as 0.12.',
  },
  {
    q: 'What does this calculator not include?',
    a: 'It leaves out dividends, the bid-ask spread, surcharge, cess and separate DP charges, and it assumes a steady return every year. Charges are one percentage you set. Treat the result as a planning estimate.',
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
  name: 'ETF Return Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/etf-return-calculator',
  description: 'Work out ETF returns from a buy price and a current price, project an ETF SIP, or compare an ETF with a mutual fund. Results are net of brokerage and charges and show tax at 12.5% long-term and 20% short-term equity rates.',
  featureList: ['From Price, SIP and ETF vs Mutual Fund tabs', 'Absolute return and CAGR from buy and current price', 'Brokerage and charges on the buy and the sale', 'Capital gains tax at 12.5% long-term above Rs 1.25 lakh and 20% short-term', 'First-in-first-out tax split for SIP instalments', 'Mutual fund return needed to match the ETF', 'Donut chart of amount invested against gain', 'Year-by-year chart and table', 'Multi-currency symbol selector', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the ETF Return Calculator', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor ETF Return Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick a tab', text: 'Choose From Price to find the return between a buy price and a current price, SIP for a monthly investment, or ETF vs Mutual Fund to compare the two over the same years.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the amounts', text: 'Enter the units and the two prices, or the monthly SIP, or the lumpsum for the comparison.' },
    { '@type': 'HowToStep', position: 3, name: 'Set the costs', text: 'Enter the expense ratio from the scheme factsheet and the brokerage and other charges you pay on each trade.' },
    { '@type': 'HowToStep', position: 4, name: 'Choose the holding period', text: 'Set the number of years, using the presets for common horizons. Holdings of more than 12 months are taxed as long-term.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the result', text: 'Review the value, the charges, the tax and the value after tax, then open the dropdown for the year-by-year chart and table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Exchange-Traded Fund', alternateName: 'ETF',
  description: 'An investment fund whose units trade on a stock exchange at a live price and that usually tracks an index, so its return follows the index return less the fund expense ratio.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Investment and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Exchange-traded_fund', 'https://www.wikidata.org/wiki/Q845477'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'ETF Return Calculator: Returns, SIP and ETF vs Mutual Fund',
  url: 'https://fermor.in/calculators/etf-return-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Exchange-Traded Fund', alternateName: 'ETF' }],
  audience: { '@type': 'Audience', audienceType: 'Indian retail investors, passive investing enthusiasts, SIP investors, demat account holders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-etf-return', name: 'What Is ETF Return' },
    { '@type': 'WebPageElement', cssSelector: '#how-etf-returns-are-calculated', name: 'How ETF Returns Are Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#etf-price-example', name: 'ETF Return From Price Example' },
    { '@type': 'WebPageElement', cssSelector: '#etf-sip-example', name: 'ETF SIP Example' },
    { '@type': 'WebPageElement', cssSelector: '#etf-growth-over-time', name: 'ETF Growth Over Time' },
    { '@type': 'WebPageElement', cssSelector: '#etf-expense-ratio-impact', name: 'Expense Ratio Impact' },
    { '@type': 'WebPageElement', cssSelector: '#etf-charges-impact', name: 'Brokerage and Charges Impact' },
    { '@type': 'WebPageElement', cssSelector: '#etf-vs-mutual-fund', name: 'ETF vs Mutual Fund' },
    { '@type': 'WebPageElement', cssSelector: '#etf-vs-index-fund', name: 'ETF vs Index Fund' },
    { '@type': 'WebPageElement', cssSelector: '#etf-tax', name: 'ETF Tax in India' },
    { '@type': 'WebPageElement', cssSelector: '#etf-limits', name: 'Limits of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#etf-in-excel', name: 'ETF Returns in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function ETFReturnCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ETFReturnCalculatorClient faqItems={faqItems} />
    </>
  );
}

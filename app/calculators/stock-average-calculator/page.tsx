import type { Metadata } from 'next';
import StockAverageClient from './StockAverageClient';

export const metadata: Metadata = {
  title: 'Stock Average Calculator: Average Buy Price & Cost Basis',
  description: 'Free stock average calculator for India. Find your average buy price, unrealized P&L and the shares needed to reach a target average. Free to use.',
  keywords: [
    'stock average calculator',
    'share average calculator',
    'stock calculator average',
    'average calculator stock',
    'stock market average calculator',
    'stock average price calculator',
    'average share price calculator',
    'average calculator share',
    'average cost of shares calculator',
    'averaging stock price calculator',
    'find average share price',
    'share market average calculator',
    'stock average calculator zerodha',
    'stock average down calculator',
    'average buy price calculator',
    'average calculator for stocks',
    'average calculator share market',
    'average calculator stock market',
    'average price calculation stock',
    'average share price formula',
    'average stock price formula',
    'average traded price calculation',
    'average traded price formula',
    'weighted average share price',
    'f&o average calculator',
    'nifty average calculator',
    'equity average calculator',
    'stock average calculator groww',
    'stock average calculator online',
    'stock average calculator formula',
    'share average down calculator',
    'shares average down calculator',
    'average down calculator for stocks',
    'average cost per share calculator',
    'cost basis calculator india',
    'stock averaging down calculator india',
    'weighted average cost of shares',
    'ATP average traded price',
    'equity lot average calculator',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/stock-average-calculator',
  },
  openGraph: {
    title: 'Stock Average Calculator: Average Buy Price & Cost Basis - Fermor',
    description: 'Calculate weighted average buy price, total invested, unrealized P&L and break-even for any stock. Add multiple lots and see your cost basis instantly.',
    type: 'website',
    url: 'https://fermor.in/calculators/stock-average-calculator',
    images: [{ url: 'https://fermor.in/og-stock-average-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stock Average Calculator - Fermor',
    description: 'Weighted average buy price, unrealized P&L, break-even price. Add multiple purchase lots. Free to use.',
    images: ['https://fermor.in/og-stock-average-calculator.png'],
  },
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is a stock average calculator?',
    a: 'A stock average calculator finds your weighted average buy price when you bought the same stock at different prices. It divides the total amount invested by the total shares held. It also shows your unrealized profit or loss and the price at which you break even.',
  },
  {
    q: 'How is the average share price calculated?',
    a: 'Average price = sum of (quantity x price) for every lot / total shares. For 100 shares at Rs 450, 50 at Rs 380 and 75 at Rs 420, you invested Rs 95,500 in 225 shares. The average is Rs 424.44.',
  },
  {
    q: 'What does averaging down mean?',
    a: 'Averaging down means buying more shares after the price has fallen, which lowers your average cost. Buy 100 shares at Rs 500, then 100 more at Rs 400, and your average becomes Rs 450. Your break-even price drops by Rs 50.',
  },
  {
    q: 'How many shares do I need to buy to reach a target average?',
    a: 'Shares needed = (target x shares held - amount invested) / (buy price - target). With 200 shares bought at Rs 1,200 and the price at Rs 980, you need 167 more shares to reach an average of Rs 1,100. The target must sit between your average and the buy price.',
  },
  {
    q: 'Can I lower my average by buying at a higher price?',
    a: 'No. Buying above your current average always raises it, and buying below always lowers it. To reach a target average below your current one, you must buy at a price below that target.',
  },
  {
    q: 'When should I average down on a stock?',
    a: 'Average down only if the business is intact and the fall comes from market-wide selling or a temporary event. Do not add if earnings, margins or debt are getting structurally worse. Decide the maximum you will hold in the stock before you buy more.',
  },
  {
    q: 'Does averaging down reduce risk?',
    a: 'No. It lowers your break-even price but raises your total exposure to one stock. If the price keeps falling, you lose on a larger position. Averaging down in a company with deteriorating fundamentals increases risk rather than reducing it.',
  },
  {
    q: 'What is the break-even price of a stock holding?',
    a: 'The break-even price equals your weighted average buy price. Selling at that price gives zero profit or loss before brokerage, taxes and other charges. To break even after charges, add them to each lot price before you enter it.',
  },
  {
    q: 'How much must a stock rise to recover from a fall?',
    a: 'A fall of 20% needs a rise of 25% to get back to the starting price, and a fall of 50% needs a rise of 100%. The deeper the fall, the larger the rise needed, which is why averaging down can shorten the road back.',
  },
  {
    q: 'What is ATP (Average Traded Price)?',
    a: 'ATP is the volume-weighted average price of all trades in a stock during a session: total value traded divided by total volume traded. It describes the market on that day, not your own purchases. Your average buy price is a different number.',
  },
  {
    q: 'How does the SEBI open offer price relate to volume-weighted price?',
    a: 'For an open offer under the SEBI takeover regulations, the offer price is the highest of several parameters. One of them is the volume-weighted average market price over the 60 trading days before the public announcement.',
  },
  {
    q: 'Does the average buy price decide my capital gains tax?',
    a: 'No. The average is for tracking your position. For demat shares, income tax reporting instructions use first-in-first-out to match sold shares to purchase lots and to measure the holding period. Your broker tax report applies this automatically.',
  },
  {
    q: 'What is the difference between FIFO and average cost?',
    a: 'FIFO sells your oldest lot first, so each sale carries that lot price and holding period. The average cost method gives every share the same blended price. Use average cost to track a position and FIFO to work out tax.',
  },
  {
    q: 'What are the tax rates on equity share gains in India?',
    a: 'For listed equity shares sold on or after 23 July 2024, gains on shares held over 12 months are taxed at 12.5% on the amount above Rs 1.25 lakh in a year. Gains on shares sold within 12 months are taxed at 20%. Rates exclude surcharge and cess.',
  },
  {
    q: 'What is grandfathering for shares bought before 1 February 2018?',
    a: 'For listed equity shares bought before 1 February 2018, the cost of acquisition for long-term gains is the higher of the actual cost and the lower of the 31 January 2018 market value and the sale price. This can raise your cost and cut your taxable gain.',
  },
  {
    q: 'Does this calculator include brokerage and charges?',
    a: 'No. It uses the prices you enter. To include brokerage, STT, stamp duty and GST, add them to the price of each lot, so the price reflects your all-in cost per share.',
  },
  {
    q: 'Can I use this calculator for F&O positions?',
    a: 'You can average the entry price of futures with the same formula by entering contracts as quantity. Margin and leverage change the risk, because a loss on the larger position grows faster than in cash equity. This page does not model margin.',
  },
  {
    q: 'Can I use it for ETFs and mutual fund SIP units?',
    a: 'Yes. For an ETF, enter each purchase as a lot. For a mutual fund SIP, enter units and the NAV on each instalment date as quantity and price. The result is your average cost per unit.',
  },
  {
    q: 'Does it work with Zerodha, Groww and other brokers?',
    a: 'Yes, the calculator works with any broker. Copy the quantity and price of each buy from your trade history or holdings statement, then enter them as lots. It is not connected to any broker account.',
  },
  {
    q: 'How do I calculate unrealized P&L on my holding?',
    a: 'Unrealized P&L = (current price - average buy price) x shares held. With an average of Rs 424.44, a price of Rs 440 and 225 shares, the gain is Rs 3,500, or 3.66% on Rs 95,500 invested.',
  },
  {
    q: 'Why is my broker average different from this calculator?',
    a: 'Brokers can include charges in the average, or adjust it for splits, bonus shares and demergers. If a corporate action occurred, adjust each older lot quantity and price to match before entering it here.',
  },
  {
    q: 'How is averaging down different from rupee cost averaging?',
    a: 'Rupee cost averaging buys a fixed amount at regular intervals whatever the price, as in a SIP. Averaging down is a one-off decision to buy more after a fall. The first is a plan, the second a judgement about one stock.',
  },
  {
    q: 'How many purchase lots can I add?',
    a: 'You can add up to 10 lots. If you have more purchases, combine lots you bought at similar prices into one by adding the quantities and averaging the prices. Your entries are saved in your browser on this device.',
  },
  {
    q: 'How do I calculate the average price in Excel?',
    a: 'Use =SUMPRODUCT(quantities, prices)/SUM(quantities). With quantities in B2:B4 and prices in C2:C4, the formula is =SUMPRODUCT(B2:B4,C2:C4)/SUM(B2:B4). For 100 at Rs 450, 50 at Rs 380 and 75 at Rs 420 it returns 424.44.',
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
  name: 'Stock Average Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/stock-average-calculator',
  description: 'Calculate weighted average purchase price, total amount invested, unrealized P&L, and break-even price for any stock or equity instrument with multiple purchase lots.',
  featureList: [
    'Weighted average buy price calculation',
    'Multiple purchase lot support (up to 10 lots)',
    'Unrealized P&L amount and percentage',
    'Break-even price display',
    'Transaction summary table with lot breakdown',
    'What-if averaging scenario with your own quantity and price',
    'Donut chart of value held vs gain or loss',
    'Shares needed to reach a target average price',
    'Multi-currency symbol selector',
    'localStorage persistence of all inputs',
    'Works with trade history from any broker',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-07-02',
  dateModified: '2026-10-12',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Average Stock Purchase Price',
  description: 'Compute your weighted average buy price, P&L, and break-even using the Fermor Stock Average Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Stock Average Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Add Your Purchase Lots',
      text: 'Enter the quantity and price per share for each purchase transaction. The calculator starts with three example rows. Add up to 10 lots or remove rows you do not need.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Current Market Price',
      text: 'Type the current market price per share to calculate your unrealized P&L and portfolio value. You can find the current price on NSE India, BSE India, or your broker app.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Optionally Add Stock Name',
      text: 'Enter the stock ticker or company name for display purposes. This label appears in the results panel and transaction summary table.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Read Your Results',
      text: 'The results panel shows your weighted average buy price, total shares, total invested, current value, unrealized P&L, and break-even price. Enter a planned quantity and price to see your new average, or a target average to see how many shares you need.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Stock Average Calculator', item: 'https://fermor.in/calculators/stock-average-calculator' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions.',
  knowsAbout: [
    'Stock Average Price Calculation',
    'Weighted Average Cost Basis',
    'Equity Portfolio Management India',
    'Average Traded Price ATP',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Capital Gains India',
    'Cost Basis FIFO Method',
    'Averaging Down Stocks',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Stock Average Calculator: Average Buy Price & Cost Basis - Fermor',
  url: 'https://fermor.in/calculators/stock-average-calculator',
  datePublished: '2026-07-02',
  dateModified: '2026-10-12',
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
    {
      '@type': 'DefinedTerm',
      name: 'Weighted Average Cost',
      alternateName: 'Average Buy Price',
      description: 'Weighted average cost is the total amount invested divided by total shares held, representing the blended purchase price per share across multiple transactions.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Equity and Investment Terms', url: 'https://fermor.in/calculators' },
      sameAs: [
        'https://en.wikipedia.org/wiki/Cost_basis',
        'https://www.wikidata.org/wiki/Q5174756',
      ],
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail equity investors, traders, NRI investors, and portfolio trackers computing average stock purchase price',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-stock-averaging', name: 'What Is Stock Averaging' },
    { '@type': 'WebPageElement', cssSelector: '#average-price-formula', name: 'Average Price Formula and Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#shares-for-target-average', name: 'Shares Needed to Reach a Target Average' },
    { '@type': 'WebPageElement', cssSelector: '#averaging-down-vs-up', name: 'Averaging Down vs Averaging Up' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: Averaging Down' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-average-down', name: 'When to Average Down and When Not To' },
    { '@type': 'WebPageElement', cssSelector: '#recovery-after-a-fall', name: 'How Much a Stock Must Rise to Recover' },
    { '@type': 'WebPageElement', cssSelector: '#atp-average-traded-price', name: 'ATP Average Traded Price Explained' },
    { '@type': 'WebPageElement', cssSelector: '#fifo-vs-average-cost', name: 'FIFO vs Average Cost Method and Tax' },
    { '@type': 'WebPageElement', cssSelector: '#fo-averaging', name: 'F&O Averaging' },
    { '@type': 'WebPageElement', cssSelector: '#broker-trade-history', name: 'Using Broker Trade History' },
    { '@type': 'WebPageElement', cssSelector: '#stock-average-in-excel', name: 'Stock Average in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Stock Averaging',
  alternateName: 'Weighted Average Cost Basis',
  description: 'Stock averaging is the practice of buying additional shares of a stock at different price levels to achieve a lower or higher blended average cost per share, computed as total amount invested divided by total shares held.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Equity Investment Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Dollar_cost_averaging',
    'https://www.wikidata.org/wiki/Q1267212',
  ],
};

export default function StockAverageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <StockAverageClient faqItems={faqItems} />
    </>
  );
}

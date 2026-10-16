import type { Metadata } from 'next';
import DividendYieldCalculatorClient from './DividendYieldCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-10-12';

export const metadata: Metadata = {
  title: 'Dividend Yield Calculator: Calculate Stock Dividend Returns',
  description: 'Free dividend yield calculator for India. Find dividend yield, yield on cost, post-tax yield and dividend income with TDS for any stock. Free to use.',
  keywords: [
    'dividend yield calculator',
    'dividend calculator',
    'stock dividend calculator',
    'dividend yield formula',
    'dividend yield meaning',
    'dividend per share calculator',
    'annual dividend calculator',
    'dividend income calculator',
    'itc dividend yield',
    'coal india dividend yield',
    'hdfc bank dividend yield',
    'reliance dividend yield',
    'highest dividend paying stocks in india',
    'dividend yield stocks india',
    'best dividend stocks india',
    'dividend yield tax india',
    'tds on dividends',
    'dividend income tax',
    'dividend yield vs growth',
    'dividend payout ratio',
    'sector wise dividend yield india',
    'forward dividend yield',
    'trailing dividend yield',
    'monthly dividend income calculator',
    'dividend investing india',
    'dividend aristocrats india',
    'dividend yield calculator india',
    'how to calculate dividend yield',
    'dividend return calculator',
    'dividend per share',
  ],
  openGraph: {
    title: 'Dividend Yield Calculator: Calculate Stock Dividend Returns - Fermor',
    description: 'Calculate dividend yield, yield on cost, post-tax yield, TDS and dividend income growth for dividend-paying stocks in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/dividend-yield-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-dividend-yield-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dividend Yield Calculator - Fermor',
    description: 'Calculate dividend yield percentage and dividend income from Indian stocks. Free to use.',
    images: ['https://fermor.in/og-dividend-yield-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/dividend-yield-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Dividend Yield', 'Dividend Investing', 'Stock Market India', 'NSE India', 'BSE India', 'SEBI Regulations', 'Dividend Distribution Tax', 'TDS on Dividends', 'ITC Dividend', 'Coal India Dividend', 'HDFC Bank Dividend', 'Reliance Dividend', 'Dividend Payout Ratio', 'P/E Ratio', 'Total Return Investing'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Dividend Yield Calculator', item: 'https://fermor.in/calculators/dividend-yield-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is dividend yield?',
    a: 'Dividend yield is the annual dividend per share divided by the current share price, shown as a percentage. It measures the cash income a stock pays for every rupee of price. It ignores any change in the share price itself.',
  },
  {
    q: 'How is dividend yield calculated?',
    a: 'Dividend yield (%) = annual dividend per share / current share price x 100. A stock that pays Rs 20 a year and trades at Rs 500 has a yield of 4%. Use the dividends paid over the last 12 months for the trailing yield.',
  },
  {
    q: 'What is a good dividend yield for Indian stocks?',
    a: 'There is no single good number. Compare the yield with fixed deposit rates and with the same company in earlier years. A very high yield can come from a falling price, so check that earnings still cover the dividend.',
  },
  {
    q: 'What is yield on cost?',
    a: 'Yield on cost is the annual dividend divided by the price you paid, not today\'s price. If you bought at Rs 400 and the stock now pays Rs 20, your yield on cost is 5%, against 4% for a new buyer at Rs 500.',
  },
  {
    q: 'What is post-tax dividend yield?',
    a: 'Post-tax yield is the yield left after income tax on the dividend. At the 30% slab plus 4% cess, tax takes 31.2% of the dividend, so a 4% yield becomes 2.75%. At the 20% slab, it becomes 3.17%.',
  },
  {
    q: 'What is the difference between forward and trailing dividend yield?',
    a: 'Trailing yield uses dividends actually paid in the last 12 months. Forward yield uses the latest declared dividend projected for a year. Trailing yield is confirmed, while forward yield assumes the company pays the same again.',
  },
  {
    q: 'Does dividend yield change when the share price changes?',
    a: 'Yes, yield moves opposite to price. A Rs 20 dividend gives 4% at Rs 500, 5% at Rs 400 and 3.2% at Rs 625. The dividend can stay the same while the yield changes every day.',
  },
  {
    q: 'What is the difference between dividend yield and dividend growth?',
    a: 'Yield is today\'s income relative to price. Dividend growth is how fast the payout rises over time. A stock can have a low yield and fast growth, or a high yield with a flat payout.',
  },
  {
    q: 'Does a 1% yield with high growth beat a 5% yield?',
    a: 'Only after many years. On Rs 1 lakh, a 1% yield growing 15% a year earns less each year until year 13 and less in total until year 20. A flat 5% yield earns Rs 5,000 every year.',
  },
  {
    q: 'How is dividend income taxed in India?',
    a: 'Dividends are added to your income and taxed at your slab rate under Income from Other Sources, plus 4% cess. Dividend Distribution Tax was abolished from 1 April 2020, so companies no longer pay the tax before the payout.',
  },
  {
    q: 'What is the TDS on dividends?',
    a: 'A company deducts TDS at 10% when dividends paid to a resident in a financial year exceed Rs 10,000. The threshold was Rs 5,000 until 31 March 2025. The rate is 20% if PAN is not furnished, and 20% for non-residents subject to tax treaties.',
  },
  {
    q: 'Is TDS on dividend my final tax?',
    a: 'No, TDS is only an advance. You report the dividend in your return, pay tax at your slab rate and claim credit for the TDS. At the 30% slab on Rs 25,000, tax is Rs 7,800 and TDS is Rs 2,500, so Rs 5,300 is due.',
  },
  {
    q: 'What is the dividend payout ratio?',
    a: 'The payout ratio is dividends paid divided by net profit, as a percentage. A company that earns Rs 1,000 crore and pays Rs 600 crore has a 60% payout. A ratio near or above 100% means the dividend may not last.',
  },
  {
    q: 'Is dividend yield the same as total return?',
    a: 'No, total return adds the price change to the dividend. On Rs 5 lakh at a 4% yield for 5 years, dividends are Rs 1 lakh. If the price falls 5% a year, the price loses Rs 1,13,110 and the total return is minus Rs 13,110.',
  },
  {
    q: 'How do I calculate monthly dividend income?',
    a: 'Multiply the investment by the yield, then divide by 12. Rs 5 lakh at a 4% yield pays Rs 20,000 a year, or about Rs 1,667 a month before tax. Real payouts arrive in lumps, usually once or twice a year.',
  },
  {
    q: 'What is the ex-dividend date?',
    a: 'The ex-dividend date is the first day the stock trades without the right to the declared dividend. Buy before it to receive the dividend. With T+1 settlement the ex-date and the record date fall on the same day.',
  },
  {
    q: 'What is a special dividend?',
    a: 'A special dividend is a one-off payout outside the regular cycle, often from asset sales or surplus cash. It lifts the trailing yield for a year. Leave it out when you estimate the income you can expect each year.',
  },
  {
    q: 'Can dividend yield be negative?',
    a: 'No, a dividend is either paid or not, so the yield is zero or positive. A company that pays nothing has a 0% yield. A lower or cut dividend shows up as a lower yield.',
  },
  {
    q: 'Which sectors pay higher dividends in India?',
    a: 'Government-owned energy, mining and utility companies, along with mature FMCG firms, tend to pay more of their profit out. IT, pharma and fast-growing private banks usually keep more. Check each company, since the pattern changes.',
  },
  {
    q: 'What are the dividend yields of ITC, Coal India, HDFC Bank and Reliance?',
    a: 'Yield changes every trading day, so any fixed figure goes stale. Take the latest dividend per share from the NSE or BSE corporate announcements, enter today\'s price in the calculator and read the yield. The sector table shows which names tend to sit higher.',
  },
  {
    q: 'Are mutual fund dividends taxed the same way?',
    a: 'Mutual fund IDCW payouts are also added to your income and taxed at your slab rate. TDS on them falls under a separate provision from company dividends, with a Rs 10,000 threshold. Check the current rates before you invest.',
  },
  {
    q: 'How do I calculate dividend yield in Excel?',
    a: 'Enter the annual dividend per share in B1 and the price in B2, then use =B1/B2 and format the cell as a percentage. For yield on cost, divide by your buy price instead of the current price.',
  },
  {
    q: 'Does this calculator include surcharge on dividend tax?',
    a: 'No. It applies your slab rate plus 4% cess to the dividend. Surcharge applies only above Rs 50 lakh of total income, where dividend surcharge is capped at 15%. The Surcharge Calculator covers that case.',
  },
  {
    q: 'Is a high dividend yield always a good sign?',
    a: 'No. A yield can be high because the price has fallen after bad news, or because the payout is more than profit can support. Check that earnings and cash flow cover the dividend before you buy a stock for its yield.',
  },
  {
    q: 'How often do Indian companies pay dividends?',
    a: 'Most pay once or twice a year. The board can declare an interim dividend during the year, and shareholders approve a final dividend at the annual general meeting. Some companies declare interim dividends more than once.',
  },
  {
    q: 'Where can I find the dividend per share of a company?',
    a: 'Check the corporate announcements on the NSE or BSE website, or the dividend history in the annual report. Add the interim and final dividends declared for the year to get the annual dividend per share.',
  },
  {
    q: 'Does the share price fall when a dividend is paid?',
    a: 'The price usually adjusts down by about the dividend amount on the ex-dividend date, because that cash leaves the company. Your total wealth is about the same, but part of it moves from the share price into taxable cash.',
  },
  {
    q: 'Is it better to invest for dividends or for growth?',
    a: 'It depends on your need for income and your slab. Dividends are taxed at your slab rate, up to 31.2% with cess at the 30% slab, while long-term equity gains are taxed at 12.5% above Rs 1.25 lakh. Growth is often more tax-efficient for high earners.',
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
  name: 'Dividend Yield Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/dividend-yield-calculator',
  description: 'Calculate dividend yield percentage, annual dividend income, and total return from dividend-paying stocks. Switch between Dividend Yield % and Dividend Income modes for Indian stocks.',
  featureList: ['Dividend yield percentage calculator', 'Yield on cost from your own buy price', 'Post-tax yield at your slab rate with 4% cess', 'TDS on dividends and tax due at filing', 'Dividend income projection with annual dividend growth', 'Year-by-year dividend income chart and table', 'Yield at different share prices', 'Multi-currency symbol selector', 'localStorage persistence', 'Donut chart of dividend kept vs tax'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Dividend Yield and Dividend Income', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Dividend Yield Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Switch between modes', text: 'Choose Dividend Yield % to calculate the yield of a stock, or Dividend Income to project how much you will earn from an investment.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the stock details', text: 'In Dividend Yield % mode, enter the annual dividend per share, the current share price and the number of shares. Add your buy price and tax slab for yield on cost and post-tax figures.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter investment details', text: 'In Dividend Income mode, enter your investment amount, the expected dividend yield and the holding period. Add dividend growth and your tax slab for a realistic projection.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the results and chart', text: 'Check the yield, yield on cost, post-tax yield, TDS and net income, and the donut chart of dividend kept versus tax. Open the dropdown for the price ladder or the year-by-year schedule.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Dividend Yield',
  description: 'A financial ratio that shows how much a company pays out in dividends each year relative to its stock price, calculated as annual dividend per share divided by current share price.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Stock Market Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Dividend_yield', 'https://www.wikidata.org/wiki/Q2706107'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Dividend Yield Calculator: Calculate Stock Dividend Returns',
  url: 'https://fermor.in/calculators/dividend-yield-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Dividend Yield' }],
  audience: { '@type': 'Audience', audienceType: 'Indian stock market investors, dividend income seekers, retail investors, portfolio managers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-dividend-yield', name: 'What Is Dividend Yield' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-yield-formula', name: 'Dividend Yield Formula' },
    { '@type': 'WebPageElement', cssSelector: '#yield-on-cost', name: 'Yield on Cost' },
    { '@type': 'WebPageElement', cssSelector: '#post-tax-yield', name: 'Post-Tax Dividend Yield' },
    { '@type': 'WebPageElement', cssSelector: '#forward-vs-trailing', name: 'Forward vs Trailing Dividend Yield' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-yield-vs-growth', name: 'Dividend Yield vs Dividend Growth' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-yield-vs-total-return', name: 'Dividend Yield vs Total Return' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-yield-vs-payout', name: 'Dividend Yield vs Payout Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#sector-yields', name: 'Dividends by Sector in India' },
    { '@type': 'WebPageElement', cssSelector: '#indian-context', name: 'Dividend Yield in the Indian Context' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-tax', name: 'Dividend Tax and TDS in India' },
    { '@type': 'WebPageElement', cssSelector: '#ex-dividend-date', name: 'Ex-Dividend Date' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-yield-in-excel', name: 'Dividend Yield in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DividendYieldCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DividendYieldCalculatorClient faqItems={faqItems} />
    </>
  );
}

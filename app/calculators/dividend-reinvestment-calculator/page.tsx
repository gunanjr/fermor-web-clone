import type { Metadata } from 'next';
import DividendReinvestmentCalculatorClient from './DividendReinvestmentCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-10-12';

export const metadata: Metadata = {
  title: 'Dividend Reinvestment (DRIP) Calculator: DRIP vs Cash',
  description: 'Free DRIP calculator for India. Compare reinvesting dividends with taking cash, after tax, with year-by-year value and share count. Free to use.',
  keywords: [
    'dividend reinvestment calculator',
    'drip calculator',
    'dividend reinvestment plan calculator',
    'drip calculator india',
    'stock dividend reinvestment calculator',
    'dividend compounding calculator',
    'reinvest dividends calculator',
    'drip plan calculator',
    'dividend growth calculator',
    'dividend reinvestment calculator india',
    'share dividend reinvestment calculator',
    'drip investment calculator',
    'dividend calculator with reinvestment',
    'drip return calculator',
    'dividend reinvestment plan india',
    'drip stocks india',
    'best drip stocks india',
    'companies offering dividend reinvestment india',
    'drip vs cash dividend',
    'drip vs sip',
    'power of dividend reinvestment',
    'dividend compounding effect',
    'dividend reinvestment benefits',
    'how does drip work',
    'drip tax implications india',
    'dividend reinvestment calculator with growth',
    'dividend reinvestment calculator lumpsum',
    'drip calculator free',
    'dividend investment calculator',
    'drip portfolio calculator',
  ],
  openGraph: {
    title: 'Dividend Reinvestment (DRIP) Calculator: See the Compounding Effect - Fermor',
    description: 'Compare total returns with and without dividend reinvestment. See how DRIP compounds your wealth over time. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/dividend-reinvestment-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-dividend-reinvestment-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dividend Reinvestment (DRIP) Calculator - Fermor',
    description: 'See the compounding effect of reinvesting dividends versus taking cash. Free DRIP calculator for India.',
    images: ['https://fermor.in/og-dividend-reinvestment-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/dividend-reinvestment-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Dividend Reinvestment', 'DRIP', 'Dividend Compounding', 'Stock Dividends India', 'NSE Dividend Stocks', 'BSE Dividend Stocks', 'Dividend Yield', 'Dividend Growth Investing', 'Compounding Effect', 'Portfolio Building'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Dividend Reinvestment Calculator', item: 'https://fermor.in/calculators/dividend-reinvestment-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is a DRIP calculator?',
    a: 'A DRIP calculator shows what happens to your investment when you reinvest dividends instead of taking them as cash. It compares the two paths over the same period, using the same yield, dividend growth, price growth and tax rate.',
  },
  {
    q: 'What is dividend reinvestment?',
    a: 'Dividend reinvestment means using the cash dividend to buy more shares of the same company. More shares earn more dividends next year, which buy more shares again. That repeating cycle is the compounding.',
  },
  {
    q: 'How does this calculator compare DRIP with cash dividends?',
    a: 'It counts the cash you receive in the no-DRIP case, not only the shares. On Rs 1 lakh at a 3% yield and 8% price growth, the no-DRIP total after 10 years is Rs 2,15,892 in shares plus Rs 43,460 in cash, or Rs 2,59,352.',
  },
  {
    q: 'What is the difference between DRIP and cash dividends?',
    a: 'With cash dividends, you receive money and decide what to do with it. With DRIP, the same money buys more shares automatically. Tax is identical either way, because the dividend is taxable in the year it is paid.',
  },
  {
    q: 'Does India have dividend reinvestment plans for stocks?',
    a: 'Company-run DRIPs are rare for listed Indian shares. Most investors take the cash dividend and buy more shares themselves, and some brokers offer tools that do this. Mutual funds offer a formal reinvestment option.',
  },
  {
    q: 'How do I reinvest dividends in India?',
    a: 'Wait for the dividend to reach your bank account, then place a buy order for the same company through your broker. Each purchase is a fresh lot with its own date and price. Keep the contract notes for tax.',
  },
  {
    q: 'Can I reinvest dividends in mutual funds?',
    a: 'Yes. Mutual funds offer an IDCW reinvestment option, where the declared payout buys more units at the NAV. The growth option never pays out, so it compounds the same way without a yearly tax on each payout.',
  },
  {
    q: 'Is a reinvested dividend taxable?',
    a: 'Yes. A dividend is taxed at your slab rate in the year it is paid, whether you reinvest it or spend it. Reinvesting does not defer the tax. Tax on the shares you buy with it arises later, when you sell.',
  },
  {
    q: 'What is the TDS on dividends?',
    a: 'A company deducts 10% when dividends paid to a resident in a year exceed Rs 10,000, and 20% if PAN is not furnished. The limit was Rs 5,000 until 31 March 2025. TDS is only an advance, and your slab rate decides the final tax.',
  },
  {
    q: 'How does DRIP change my cost basis?',
    a: 'Every reinvestment is a new purchase with its own price and date. When you sell, first-in-first-out matches the oldest lots first. Track each lot, since the holding period decides whether gains are short-term or long-term.',
  },
  {
    q: 'How much does DRIP add over 10 years?',
    a: 'On Rs 1 lakh at a 3% yield, with dividends and the price both growing 8% a year, DRIP ends at Rs 2,83,942 against Rs 2,59,352 for cash dividends. The gain from reinvesting is Rs 24,590 before tax.',
  },
  {
    q: 'How much does DRIP add over 20 years?',
    a: 'On the same assumptions, 20 years gives Rs 8,06,231 with DRIP and Rs 6,03,382 without, an advantage of Rs 2,02,850. The gain rises faster than the years do, because each reinvested rupee compounds too.',
  },
  {
    q: 'Does a higher dividend yield increase the DRIP advantage?',
    a: 'Yes, strongly. At 8% growth over 20 years, a 1% yield adds Rs 48,583, a 3% yield adds Rs 2,02,850 and a 5% yield adds Rs 4,57,403. A bigger payout leaves more cash to reinvest.',
  },
  {
    q: 'What if the dividend does not grow?',
    a: 'The advantage is smaller. With a flat 3% dividend yield on cost and 8% price growth, 10 years gives an advantage of Rs 17,591, against Rs 24,590 when the dividend grows 8% a year with the price.',
  },
  {
    q: 'What happens to DRIP if the share price falls?',
    a: 'Reinvested dividends buy more shares at lower prices, which helps if the price later recovers. If the price keeps falling, you hold more of a falling stock. At a 10% yearly fall, Rs 1 lakh becomes Rs 79,308 with DRIP and Rs 78,328 without.',
  },
  {
    q: 'How does tax change the DRIP advantage?',
    a: 'Tax shrinks the amount reinvested. At the 30% slab plus 4% cess, the 10-year advantage on Rs 1 lakh falls from Rs 24,590 to Rs 15,095, and DRIP ends at Rs 2,60,887.',
  },
  {
    q: 'Is DRIP better than a SIP?',
    a: 'They do different jobs. DRIP compounds dividends from shares you already own. A SIP adds fresh money from your income on a schedule. Many investors use a SIP to build the position and reinvest its dividends.',
  },
  {
    q: 'Is DRIP better than the growth option of a mutual fund?',
    a: 'For most long-term investors the growth option is simpler and avoids tax on each payout. IDCW reinvestment is taxed every time a payout is declared, even though you never receive the cash.',
  },
  {
    q: 'When does DRIP not make sense?',
    a: 'It does not suit you if you need the income to live on, or if one stock already makes up too much of your portfolio. It also loses its point when the stock looks overpriced. Reinvest only where you would buy anyway.',
  },
  {
    q: 'How is DRIP different from a bonus issue?',
    a: 'A bonus issue gives free shares and does not trigger tax at that point. A dividend is cash, taxed in your hands, which you then use to buy shares. The share count rises in both cases, but the price adjusts down for a bonus.',
  },
  {
    q: 'What is the DRIP formula?',
    a: 'New shares = old shares + (dividend per share x old shares x (1 - tax rate)) / share price at reinvestment. Repeat each year. Value is shares times price, and the cash case keeps the same shares and holds the net dividends.',
  },
  {
    q: 'How is the annual return with DRIP calculated?',
    a: 'It is (final value / starting investment) ^ (1 / years) - 1. On Rs 1 lakh ending at Rs 2,83,942 after 10 years before tax, that is 11.00% a year, against 10.00% for the cash path.',
  },
  {
    q: 'How often should I reinvest dividends?',
    a: 'Reinvest as each dividend arrives. This calculator reinvests once a year at the year-end price, which is a simplification. Real payouts come once or twice a year, so the difference is small.',
  },
  {
    q: 'What yield on cost does DRIP give me over time?',
    a: 'Yield on cost rises when the dividend per share grows, and DRIP lifts it further by adding shares. Your payout can grow faster than the company\'s dividend per share. The Dividend Yield Calculator shows yield on cost.',
  },
  {
    q: 'Does this calculator include brokerage and charges?',
    a: 'No. It reinvests the full net dividend. Brokerage, stamp duty and other charges on each small purchase reduce the result slightly, and they matter more when dividends are small.',
  },
  {
    q: 'Does this calculator include surcharge?',
    a: 'No. It applies your slab rate plus 4% cess to the dividend. Surcharge applies above Rs 50 lakh of total income, and dividend surcharge is capped at 15%. The Surcharge Calculator covers that case.',
  },
  {
    q: 'Does reinvesting guarantee a higher return?',
    a: 'No. Reinvesting adds more shares, so it magnifies whatever the price does. It raises the final value only when the dividends are sound and the price holds. Dividends can be cut, and the price can fall.',
  },
  {
    q: 'What is a good dividend yield for a DRIP strategy?',
    a: 'There is no fixed number. A moderate yield that the company can sustain and grow is usually better than a very high yield that may be cut. Check the payout ratio and earnings before you commit.',
  },
  {
    q: 'Can I use this for a diversified portfolio?',
    a: 'Yes. Enter the blended dividend yield, dividend growth and price growth for the whole portfolio. The result is an average view, so it will not match a single stock exactly.',
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
  name: 'Dividend Reinvestment (DRIP) Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/dividend-reinvestment-calculator',
  description: 'Calculate the compounding effect of reinvesting dividends versus taking cash dividends. Enter initial investment, dividend yield, dividend growth rate, share price appreciation, and investment horizon to compare portfolio values with and without DRIP.',
  featureList: ['DRIP vs cash dividend comparison that counts the cash received', 'Tax on dividends at your slab rate plus 4% cess', 'Share count growth under DRIP', 'Annual return with and without DRIP', 'Year-by-year schedule with chart and table', 'Dividend growth and share price growth inputs', 'Donut chart of gain from dividends vs price growth', 'Multi-currency symbol selector', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the Dividend Reinvestment Calculator', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Dividend Reinvestment (DRIP) Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your initial investment', text: 'Enter the total amount you plan to invest in dividend-paying stocks as a lumpsum.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the annual dividend yield', text: 'Enter the dividend yield on the price you pay. Check the latest dividend per share and price on NSE or BSE.' },
    { '@type': 'HowToStep', position: 3, name: 'Add dividend growth rate (optional)', text: 'Enter how fast the dividend per share grows each year. Match it to price growth to hold the yield steady.' },
    { '@type': 'HowToStep', position: 4, name: 'Set share price appreciation and investment horizon', text: 'Enter the expected annual share price growth, the number of years and your tax slab rate.' },
    { '@type': 'HowToStep', position: 5, name: 'Compare DRIP vs cash dividend results', text: 'Review the value with DRIP, the no-DRIP total of shares plus cash, and the advantage. Open the dropdown for the year-by-year chart and table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Dividend Reinvestment Plan (DRIP)', alternateName: 'DRIP',
  description: 'A plan where cash dividends paid by a company are automatically used to purchase additional shares of the same company, allowing investors to compound their holdings over time without additional capital outlay.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Investment and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Dividend_reinvestment_plan', 'https://www.wikidata.org/wiki/Q4364406'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Dividend Reinvestment (DRIP) Calculator: See the Compounding Effect',
  url: 'https://fermor.in/calculators/dividend-reinvestment-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Dividend Reinvestment Plan', alternateName: 'DRIP' }],
  audience: { '@type': 'Audience', audienceType: 'Indian stock market investors, dividend investors, long-term wealth builders, NRI investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-drip', name: 'What Is Dividend Reinvestment' },
    { '@type': 'WebPageElement', cssSelector: '#how-drip-is-calculated', name: 'How DRIP Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#drip-worked-example', name: 'Worked DRIP Example' },
    { '@type': 'WebPageElement', cssSelector: '#drip-vs-cash', name: 'DRIP vs Cash Dividends' },
    { '@type': 'WebPageElement', cssSelector: '#power-of-compounding', name: 'DRIP Advantage Over Time' },
    { '@type': 'WebPageElement', cssSelector: '#yield-effect', name: 'How Dividend Yield Changes the Advantage' },
    { '@type': 'WebPageElement', cssSelector: '#drip-in-india', name: 'Dividend Reinvestment in India' },
    { '@type': 'WebPageElement', cssSelector: '#drip-tax-implications', name: 'DRIP Tax in India' },
    { '@type': 'WebPageElement', cssSelector: '#drip-vs-sip', name: 'DRIP vs SIP' },
    { '@type': 'WebPageElement', cssSelector: '#drip-risks', name: 'Risks and Limits of DRIP' },
    { '@type': 'WebPageElement', cssSelector: '#drip-in-excel', name: 'DRIP in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DividendReinvestmentCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DividendReinvestmentCalculatorClient faqItems={faqItems} />
    </>
  );
}

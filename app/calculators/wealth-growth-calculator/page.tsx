import type { Metadata } from 'next';
import WealthGrowthCalculatorClient from './WealthGrowthCalculatorClient';

export const metadata: Metadata = {
  title: 'Wealth Growth Calculator: SIP, CAGR & Investment Growth',
  description: 'Free wealth growth calculator for India. Project how monthly SIP and existing wealth grow over time, with a contribution vs returns breakdown.',
  keywords: [
    'wealth growth calculator', 'growth calculator', 'wealth', 'wealth management',
    'wealth management companies', 'wealth management firms', 'wealth management services',
    'wealth creation', 'financial advisory', 'financial manager',
    'cagr calculator', 'cagr formula', 'cagr equation', 'compound annual growth rate calculator',
    'compound growth rate calculator', 'compound growth formula', 'compound growth rate formula',
    'compound annual growth', 'compound annual growth formula', 'cumulative annual growth rate calculator',
    'calculator for cagr', 'cagr calculation calculator', 'cagr growth calculator', 'cagr rate calculator',
    'annual compound growth rate formula', 'formula for compounding growth',
    'mutual fund return calculator', 'mutual fund investment return calculator',
    'investment return calculator', 'rate of return calculator', 'rate of return calculator sip',
    'return calculator sip', 'sip investment return calculator', 'stock return calculator',
    'stock investment return calculator', 'compound interest calculator', 'wealth accumulation calculator',
    'sip growth calculator', 'investment growth calculator india', 'step up sip calculator',
    'lumpsum calculator', 'xirr calculator', 'real return calculator', 'elss calculator',
    'mid cap mutual funds', 'large cap mutual funds', 'growth fund', 'small cap fund returns',
    'rule of 72 calculator', 'crorepati sip calculator', 'wealth growth per month calculator',
  ],
  openGraph: {
    title: 'Wealth Growth Calculator: SIP, CAGR & Investment Growth',
    description: 'Project how your monthly investments and existing wealth grow over time. See the exact year your returns overtake your contributions.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-wealth-growth-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wealth Growth Calculator: SIP, CAGR & Investment Growth',
    description: 'Project how your monthly investments and existing wealth grow over time, with a full contribution vs returns breakdown.',
    images: ['https://fermor.in/og-wealth-growth-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/wealth-growth-calculator' },
};

const faqs = [
  { q: 'How does compounding work in wealth building?', a: 'Compounding is the process where your investment returns start earning returns of their own. When you reinvest your gains, the investment base grows larger each year, leading to exponential growth. After 10-15 years, returns often exceed your total contributions, which is exactly what this calculator projects for your own numbers.' },
  { q: 'What return should I expect for long-term wealth creation?', a: 'For long-term wealth creation (10+ years), equity-oriented investments have historically delivered 12-15% annual returns in India. A conservative planning assumption of 12% p.a. is reasonable. For shorter timeframes (under 5 years), lower returns of 8-10% are more realistic. Debt investments typically yield 6-8% annually.' },
  { q: 'Is it better to invest a lump sum or monthly SIP?', a: 'Both approaches have merit. A monthly SIP helps average out market volatility and builds investment discipline. A lump sum can work well if you already have a large amount available and the market is fairly valued. For most investors, a regular monthly investment combined with any existing wealth already held provides the best results.' },
  { q: 'How does existing wealth affect my growth?', a: 'Existing wealth accelerates growth because it starts compounding immediately from day one. Even a modest existing corpus can significantly boost your final maturity amount over longer timeframes. An existing Rs 5 lakh growing at 12% for 20 years becomes approximately Rs 54.46 lakh on its own, before any new monthly investment is added.' },
  { q: 'What asset allocation is best for wealth growth?', a: 'For long-term wealth growth, a predominantly equity-based allocation, 65-80% in equity mutual funds or stocks, has historically delivered the best returns. The remaining portion can sit in debt instruments for stability. As you approach your goal, gradually shifting toward safer assets helps protect accumulated wealth.' },
  { q: 'What is the CAGR formula and how is it different from absolute return?', a: 'CAGR (Compound Annual Growth Rate) is calculated as (Ending Value / Beginning Value)^(1/years) - 1, and it expresses growth as a smoothed annual rate. Absolute return just shows total percentage gain over the whole period, with no adjustment for how long it took. A 100% absolute return over 10 years is a very different outcome from the same 100% over 2 years, and CAGR is what makes that comparable.' },
  { q: 'How do I calculate compound annual growth rate?', a: 'Divide the final value by the starting value, raise the result to the power of 1 divided by the number of years, then subtract 1. For an investment that grew from Rs 5 lakh to Rs 15 lakh over 10 years, CAGR is (15/5)^(1/10) - 1, approximately 11.6%. Use the CAGR Calculator above to compute this instantly for any two values and time period.' },
  { q: 'What is a good CAGR for a mutual fund in India?', a: 'A CAGR of 12-15% over a 10-year or longer period is considered strong for a diversified equity mutual fund in India. Large cap funds typically post 10-13%, while mid and small cap funds can range higher, 12-18%, with correspondingly higher volatility. Always check a fund\'s CAGR over multiple market cycles, not just the last 1-2 years.' },
  { q: 'What is the formula for compound growth?', a: 'The general compound growth formula is Final Value = Initial Value x (1 + rate)^time. For monthly investments (a SIP) rather than a single starting value, the formula extends to a series: FV = P x [((1+r)^n - 1) / r] x (1+r), where P is the monthly amount, r is the monthly rate, and n is the number of months.' },
  { q: 'How much do I need to invest monthly to become a crorepati?', a: 'At 12% annual returns, investing approximately Rs 10,000 a month for 20 years builds a corpus of nearly Rs 1 crore (Rs 99.91 lakh). Over 15 years at the same rate, you would need closer to Rs 20,000 a month. The exact figure depends heavily on your assumed return rate and time horizon, both of which you can adjust in the calculator above.' },
  { q: 'What is the difference between a wealth manager and a financial advisor?', a: 'A financial advisor typically helps with specific goals like tax planning, insurance, or a single investment decision. A wealth manager takes a broader view, coordinating investments, tax, estate planning, and insurance together, usually for clients with a larger investable corpus. In practice, the terms overlap significantly and the right question is what services a specific professional actually offers, not the job title.' },
  { q: 'What do wealth management companies charge in India?', a: 'Wealth management services in India typically charge 0.5-2% of assets under management annually, or a flat retainer fee for advisory-only services. Some charge a percentage of returns generated instead. Always ask for the fee structure in writing before committing, since a 1.5% annual fee compounds into a very large amount over 20-30 years.' },
  { q: 'When should I hire a wealth management service instead of investing on my own?', a: 'Professional wealth management starts to earn its fee once your investable corpus crosses roughly Rs 25-50 lakh, or once you are coordinating multiple goals, tax brackets, and asset classes at the same time. Below that, a well-chosen SIP into 2-3 diversified funds, reviewed once or twice a year, captures most of the same growth without the fee drag.' },
  { q: 'What is the best mutual fund category for long-term wealth growth?', a: 'There is no single best category. Flexi cap and large and mid cap funds offer a balance of growth and stability for most long-term investors. Small cap funds offer higher growth potential with much higher volatility, suited to investors with a 10-15 year horizon and a high risk tolerance. Most long-term portfolios combine 2-3 categories rather than relying on one.' },
  { q: 'Are small cap funds better than large cap funds for wealth growth?', a: 'Small cap funds have historically delivered higher long-term returns (13-18% CAGR) than large cap funds (10-13% CAGR), but with much sharper drawdowns during market corrections, sometimes losing 30-40% in a single bad year. Large cap funds are more stable but grow more slowly. The right mix depends on your time horizon and how much volatility you can tolerate without panic-selling.' },
  { q: 'How is SIP return calculated?', a: 'SIP return uses the future value of an annuity formula: FV = P x [((1+r)^n - 1) / r] x (1+r), where P is the monthly SIP amount, r is the monthly return rate, and n is the number of months invested. This calculator applies this exact formula, combined with any existing lumpsum wealth, to project your total corpus.' },
  { q: 'What is XIRR and how is it different from CAGR?', a: 'XIRR (Extended Internal Rate of Return) calculates the annualised return for a series of irregular cash flows, such as multiple SIP instalments and withdrawals on different dates. CAGR only works cleanly for a single lumpsum invested once and withdrawn once. For most real SIP portfolios with monthly instalments, XIRR is the more accurate return measure. Use the XIRR Calculator to compute it for your actual investment dates.' },
  { q: 'How much tax do I pay on mutual fund wealth growth?', a: 'Equity mutual fund gains held over 1 year are taxed as long-term capital gains at 12.5%, but only on gains above Rs 1.25 lakh in a financial year. Gains held under 1 year are taxed at 20% as short-term capital gains. Debt mutual funds are taxed at your income slab rate regardless of holding period, under current rules.' },
  { q: 'What is the Rule of 72?', a: 'The Rule of 72 estimates how many years an investment takes to double: divide 72 by the annual return rate. At 12%, money doubles in approximately 6 years. At 8%, it takes about 9 years. It is a quick mental-math shortcut, accurate within a few months for rates between 6% and 20%.' },
  { q: 'How does inflation affect my wealth growth?', a: 'Inflation erodes the purchasing power of your future corpus even as the rupee figure grows. A corpus of Rs 1 crore in 20 years will not buy what Rs 1 crore buys today. At 6% average inflation, real purchasing power is typically 40-45% lower than the nominal figure over a 20-year horizon. Use the Real Return Calculator to see your projection in today\'s rupees.' },
  { q: 'What is a step-up SIP and how much extra wealth does it build?', a: 'A step-up SIP increases your monthly investment by a fixed percentage every year, usually matching salary growth. A Rs 10,000 monthly SIP with a 10% annual step-up builds approximately Rs 1.99 crore over 20 years at 12% returns, nearly double the Rs 99.91 lakh a flat SIP of the same starting amount builds over the same period.' },
  { q: 'Can I lose money in a wealth growth investment?', a: 'Yes, if invested in market-linked instruments like equity mutual funds or stocks, short-term losses are common and expected. Historically, diversified equity investments have delivered positive returns over any 10-15 year rolling period in India, but there is no guarantee for any specific future period. This calculator assumes a constant return rate for planning purposes; real returns fluctuate year to year.' },
  { q: 'What is the minimum amount to start building wealth through SIP?', a: 'Most Indian mutual funds allow SIPs starting from Rs 500 a month. There is no meaningful minimum beyond what a fund house requires; starting small and increasing the amount as income grows (a step-up approach) is a proven strategy for building wealth without straining your budget early on.' },
  { q: 'How long does it take to double my money at 12% returns?', a: 'Using the Rule of 72, money doubles in approximately 6 years at a 12% annual return. This applies to a lumpsum invested once; a monthly SIP takes longer to double in total value early on, since new contributions keep entering at the original, undiscounted amount.' },
  { q: 'What is ELSS and how does it help wealth growth?', a: 'ELSS (Equity Linked Savings Scheme) is a mutual fund category that combines equity market growth with a Section 80C tax deduction of up to Rs 1.5 lakh a year under the old tax regime. It carries a mandatory 3-year lock-in, the shortest among 80C options, and invests predominantly in equity, giving it the same long-term growth potential as other diversified equity funds.' },
  { q: 'Should I stop my SIP when the market falls?', a: 'No. Stopping a SIP during a market fall means missing the chance to buy units at lower prices, which is the entire mechanism that makes SIPs effective at averaging out volatility. Unless your income situation has genuinely changed, continuing (or even increasing) contributions during a downturn typically improves long-term outcomes.' },
  { q: 'What is the difference between growth and dividend (IDCW) mutual fund options?', a: 'In the growth option, all gains are reinvested and reflected in a rising NAV, maximising the compounding effect. In the dividend (now called IDCW) option, gains are periodically paid out in cash, reducing the NAV each time and interrupting compounding. For long-term wealth growth, the growth option almost always builds a larger corpus than the IDCW option at the same fund and return rate.' },
  { q: 'What is Fermor?', a: 'Fermor is an Indian fintech platform built to close the gap between knowing what to do with money and actually doing it. It provides 500+ free financial calculators and a financial eligibility engine that matches users with loans and investments they qualify for. Available free at fermor.in.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wealth Growth Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/wealth-growth-calculator',
  description: 'Project how regular investments and existing wealth grow over time with detailed year-by-year contribution vs returns breakdowns.',
  featureList: [
    'Wealth growth projection combining existing wealth and monthly SIP contributions',
    'Exact monthly-compounding future value formula (annuity due)',
    'Year-by-year contribution vs returns bar chart and table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Mutual fund category return reference table',
    'Rule of 72 doubling-time reference',
    'LocalStorage persistence of all calculator inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2024-01-01',
  dateModified: '2026-09-16',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Wealth Growth Calculator', item: 'https://fermor.in/calculators/wealth-growth-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Project Your Wealth Growth',
  description: 'Use the free wealth growth calculator to project your investment corpus, contribution vs returns split, and the year compounding overtakes your contributions.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Wealth Growth Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Monthly Investment', text: 'Enter how much you invest every month, or plan to invest, using the slider or by clicking the value to type a precise number.' },
    { '@type': 'HowToStep', position: 2, name: 'Set Expected Return', text: 'Set the annual return rate. Use 10-13% for large cap equity, 12-16% for mid or small cap funds, or a fund\'s actual CAGR if you have checked it.' },
    { '@type': 'HowToStep', position: 3, name: 'Set Investment Period', text: 'Set how many years you plan to stay invested.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter Existing Wealth', text: 'Enter any lumpsum you already hold so it compounds alongside your new monthly contributions.' },
    { '@type': 'HowToStep', position: 5, name: 'Review Year-by-Year Growth', text: 'Expand the year-by-year panel to see the bar chart and table showing exactly when returns overtake contributions.' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Wealth Growth and Compounding', 'CAGR and Investment Returns', 'SIP and Step-Up SIP Planning',
    'Mutual Fund Categories India', 'Capital Gains Tax on Mutual Funds', 'Personal Finance India',
    'Account Aggregator Framework', 'SEBI Regulations', 'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Wealth Growth Calculator: SIP, CAGR and Investment Growth Projection',
  url: 'https://fermor.in/calculators/wealth-growth-calculator',
  datePublished: '2024-01-01',
  dateModified: '2026-09-16',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'CAGR', alternateName: 'Compound Annual Growth Rate' },
    { '@type': 'DefinedTerm', name: 'SIP', alternateName: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'Compounding', alternateName: 'Compound Growth' },
    { '@type': 'DefinedTerm', name: 'XIRR', alternateName: 'Extended Internal Rate of Return' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, first-time SIP investors, long-term wealth builders',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-wealth-growth', name: 'What Is Wealth Growth?' },
    { '@type': 'WebPageElement', cssSelector: '#wealth-growth-formula', name: 'Wealth Growth Formula: How Compounding Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#power-of-compounding', name: 'The Power of Compounding' },
    { '@type': 'WebPageElement', cssSelector: '#cagr-vs-wealth-growth', name: 'CAGR vs Wealth Growth: What Is the Difference?' },
    { '@type': 'WebPageElement', cssSelector: '#corpus-per-1000', name: 'Wealth Growth Per Rs 1,000 Invested Monthly' },
    { '@type': 'WebPageElement', cssSelector: '#existing-wealth-impact', name: 'Impact of Existing Wealth on Your Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#returns-by-fund-category', name: 'Historical Returns by Mutual Fund Category' },
    { '@type': 'WebPageElement', cssSelector: '#sip-vs-stepup-vs-lumpsum', name: 'SIP vs Step-Up SIP vs Lumpsum' },
    { '@type': 'WebPageElement', cssSelector: '#rule-of-72', name: 'Rule of 72: Quick Way to Estimate Doubling Time' },
    { '@type': 'WebPageElement', cssSelector: '#real-return', name: 'Real (Inflation-Adjusted) Wealth Growth' },
    { '@type': 'WebPageElement', cssSelector: '#tax-efficiency', name: 'Tax Efficiency and Wealth Growth' },
    { '@type': 'WebPageElement', cssSelector: '#diy-vs-wealth-management', name: 'DIY Wealth Growth vs Professional Wealth Management' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes That Slow Wealth Growth' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Wealth Growth Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'CAGR',
  alternateName: 'Compound Annual Growth Rate',
  description: 'CAGR is the annualised rate at which an investment would have grown if it had grown at a steady rate every year, calculated as (Ending Value / Beginning Value)^(1/years) - 1.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Finance and Investing Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Compound_annual_growth_rate', 'https://www.wikidata.org/wiki/Q4237525'],
};

export default function WealthGrowthPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <WealthGrowthCalculatorClient faqs={faqs} />
    </>
  );
}

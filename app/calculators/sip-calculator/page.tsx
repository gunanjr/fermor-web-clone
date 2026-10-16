import type { Metadata } from 'next';
import SIPCalculatorClient from './SIPCalculatorClient';

export const metadata: Metadata = {
  title: 'SIP Calculator: SIP & Lumpsum Returns, Maturity Value',
  description: 'Free SIP calculator for India with a Lumpsum mode. Calculate SIP maturity amount, estimated returns, and year-wise growth using the exact monthly-compounding formula AMCs use. Free to use.',
  keywords: [
    'sip calculator', 'sip calculator online', 'sip return calculator', 'sip investment calculator',
    'mutual fund sip calculator', 'sip compound interest calculator', 'compound interest sip calculator',
    'sip compounding calculator', 'sip interest rate', 'sip maturity calculator', 'sip calculator for 10 years',
    'sip calculator for 15 years', 'sip calculator for 20 years', 'sip calculator for 5 years',
    'sip calculator for 25 years', 'sip calculator for 30 years', 'monthly sip calculator',
    'best sip calculator', 'best sip return calculator', 'sip calculator with existing corpus',
    'sip calculator with initial investment', '1 cr sip calculator', 'sip calculator for 1 crore',
    'lumpsum calculator', 'one time investment calculator', 'invest mutual fund calculator',
    'calculate return on mutual fund sip', 'calculate sip maturity value', 'sip planner',
    'sip investment planner', 'average return on sip', 'current sip interest rate',
    'xirr calculator', 'elss sip calculator', 'step up sip calculator', 'sip vs lumpsum calculator',
    'rupee cost averaging', 'sip formula', 'sip calculation formula', 'nifty 50 sip calculator',
    'index fund sip calculator', 'small cap sip calculator', 'mid cap sip calculator',
    'large cap sip calculator', 'sip return calculator online', 'sip maturity value calculator',
    'sip growth calculator', 'sip corpus calculator', 'future value of sip calculator',
    'mutual fund returns calculator', 'sip calculator mutual fund', 'sip calculator fixed deposit',
    'sip vs fd', 'sip interest rate calculation formula', 'mutual fund investment calculator',
    'sip calculator for 60 years', 'sip calculator more than 30 years', 'monthly sip investment calculator',
  ],
  openGraph: {
    title: 'SIP Calculator: SIP & Lumpsum Returns, Maturity Value',
    description: 'Calculate SIP and lumpsum mutual fund returns using the exact monthly-compounding formula AMCs use, with year-by-year growth charts.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-sip-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIP Calculator: SIP & Lumpsum Returns, Maturity Value',
    description: 'Calculate SIP and lumpsum mutual fund returns using the exact monthly-compounding formula AMCs use.',
    images: ['https://fermor.in/og-sip-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/sip-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is SIP maturity amount calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SIP maturity amount is calculated using M = P x [((1 + i)^n - 1) / i] x (1 + i), where M is the maturity amount, P is the monthly SIP instalment, n is the number of instalments, and i is the monthly rate derived as i = (1 + r)^(1/12) - 1. Dividing the annual rate by 12 gives an approximate figure. The compound conversion used here matches how mutual fund NAVs actually compound.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum SIP amount in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most AMCs set the floor at Rs 500 per month, though a few accept Rs 100. SEBI requires every open-ended mutual fund to offer a monthly SIP option. There is no upper limit. ELSS (tax-saving) fund SIPs typically start at Rs 500 per month as well.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is SIP better than a lumpsum investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither is universally better. Lumpsum wins when the full amount is invested near a market low, since more money compounds from day one. SIP smooths out volatility through rupee cost averaging and does not require timing the market. Switch to the Lumpsum tab on this calculator to compare both against your own numbers.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a Step-up SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Step-up SIP increases your monthly instalment by a fixed percentage every year. A flat Rs 10,000 SIP at 12% for 20 years builds roughly Rs 91.99 lakh. The same SIP with a 10% annual step-up crosses Rs 1.6 crore over the same period, because contributions rise alongside typical salary growth. Use the Step-Up SIP Calculator to model this.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is rupee cost averaging?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You invest a fixed rupee amount every month regardless of the fund NAV. A falling NAV buys more units with that same amount; a rising NAV buys fewer. Over time your average purchase cost per unit tends to land lower than the average NAV across the period, without needing to predict market direction.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are SIP returns guaranteed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The return rate entered into this calculator is an assumption, not a commitment from any AMC. Equity mutual funds can lose value in the short term. Historical category averages for diversified equity funds have run roughly 12-15% p.a. over rolling 10-year periods, but that history does not guarantee future results. Always check a fund\'s actual trailing returns on a source like AMFI or Value Research before assuming a rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I pause or stop my SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most AMCs let you pause a SIP for 1-3 months through their website or the broker app you used to start it. You can stop permanently at any time by cancelling the NACH mandate, with no penalty. Stopping the SIP does not touch units already bought; they stay invested and continue compounding until you redeem them.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is SIP taxed in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tax applies only when units are redeemed, and each monthly instalment is treated as a separate purchase. For equity funds, units held under 12 months attract 20% STCG. Units held 12 months or more get gains up to Rs 1.25 lakh per year tax-free, with 12.5% LTCG above that. For debt funds bought after April 2023, all gains are taxed at the investor\'s income slab rate regardless of holding period.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is XIRR and how is it different from the return rate shown here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator projects a maturity value from a single assumed annual return, compounded monthly. Your real SIP has dozens of cash flows on different dates, so your actual portfolio statement reports XIRR, the single annualised rate that reconciles every instalment\'s date and amount against the current value. For long-running SIPs the two figures can differ by 1-3%. Use the XIRR Calculator to compute it from your own transaction dates.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an ELSS SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ELSS (Equity Linked Savings Scheme) is an equity mutual fund with a 3-year lock-in per instalment and a Section 80C deduction of up to Rs 1.5 lakh per year. The lock-in applies to each instalment separately, not from the date the SIP started. Five years into an ELSS SIP, only units bought more than 3 years ago are redeemable; the rest stay locked.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much monthly SIP is needed to build Rs 1 crore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At an assumed 12% p.a. return, reaching Rs 1 crore needs approximately Rs 44,636 per month over 10 years, Rs 21,011 over 15 years, Rs 10,871 over 20 years, or Rs 3,246 over 30 years. Longer tenure sharply reduces the monthly commitment because a larger share of the corpus comes from compounding rather than fresh contributions. Enter your own target and rate on this calculator to see the exact figure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SIP have a fixed interest rate like an FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. A Fixed Deposit pays a guaranteed, pre-declared interest rate set by the bank. A SIP invests in a mutual fund scheme whose NAV moves with the market, so the rate you enter here is a return assumption, not a guaranteed rate. There is no such product as an "SIP with FD-like fixed interest" in Indian mutual funds; a debt fund SIP carries lower volatility than equity but still has no guaranteed rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I start a SIP with an existing lumpsum already invested?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Click "More settings" in the SIP tab of this calculator and enter your existing corpus. The calculator grows that amount at the same assumed rate over the same tenure and adds it to your fresh monthly SIP contributions to show the combined maturity value.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good SIP tenure: 10, 20, or 30 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Longer tenure compounds far more than it costs in patience. A Rs 10,000 monthly SIP at 12% grows to roughly Rs 22.4 lakh in 10 years but Rs 3.08 crore in 30 years, because the wealth-gained share of the corpus keeps rising each year. Match the tenure to a real financial goal (retirement, a child\'s education) rather than picking a round number, and only assume tenures beyond 30-40 years for planning purposes since few individual investors realistically run a SIP that long.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform that helps people take real financial action, not just read financial information. It offers 500+ free financial calculators and a financial eligibility engine that tells users what loans and investment products they actually qualify for. Fermor is built in India and available at fermor.in.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SIP & Lumpsum Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/sip-calculator',
  featureList: [
    'SIP maturity calculator using the exact monthly-compounding formula',
    'Lumpsum mode for one-time mutual fund investments',
    'Option to add an existing corpus alongside a fresh SIP',
    'Year-by-year growth chart with stacked bar visualization',
    'Wealth multiplier and monthly SIP needed to reach Rs 1 crore',
    'Multi-currency support',
    'LocalStorage persistence of all calculator inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2024-01-01',
  dateModified: '2026-09-09',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'SIP Calculator', item: 'https://fermor.in/calculators/sip-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate SIP and Lumpsum Mutual Fund Returns',
  description: 'Use the free SIP calculator to find your maturity amount, estimated returns, and year-wise growth in under 60 seconds.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor SIP Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose SIP or Lumpsum',
      text: 'Pick the SIP tab for a recurring monthly investment or the Lumpsum tab for a one-time investment.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter the Investment Amount',
      text: 'Enter your monthly SIP amount, or your one-time lumpsum amount, using the slider or by clicking the displayed value to type a precise figure.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the Expected Return Rate',
      text: 'Enter the annual return rate you expect the fund to deliver. Check the fund\'s actual historical trailing returns on AMFI or the fund house\'s own factsheet before assuming a rate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set the Investment Period',
      text: 'Set the tenure in years using the slider or the year presets. The calculator shows maturity amount, total invested, and estimated returns instantly.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Check the Year-Wise Growth Schedule',
      text: 'Open the Growth Schedule section to see the bar chart and table showing how much of your corpus each year comes from contributions versus wealth gained.',
    },
  ],
};

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
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The eligibility engine and marketplace are the action system.',
  knowsAbout: [
    'Systematic Investment Plan (SIP)',
    'Mutual Fund Returns',
    'Rupee Cost Averaging',
    'XIRR and CAGR',
    'ELSS and Section 80C',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Capital Gains Tax on Mutual Funds',
    'Personal Finance India',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SIP Calculator: SIP and Lumpsum Mutual Fund Returns',
  url: 'https://fermor.in/calculators/sip-calculator',
  datePublished: '2024-01-01',
  dateModified: '2026-09-09',
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
    { '@type': 'DefinedTerm', name: 'SIP', alternateName: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'XIRR', alternateName: 'Extended Internal Rate of Return' },
    { '@type': 'DefinedTerm', name: 'ELSS', alternateName: 'Equity Linked Savings Scheme' },
    { '@type': 'DefinedTerm', name: 'Rupee Cost Averaging', alternateName: 'Cost Averaging' },
    { '@type': 'DefinedTerm', name: 'Lumpsum Investment', alternateName: 'One-Time Investment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian mutual fund investors, first-time SIP investors, retirement planners, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-sip', name: 'What Is a SIP?' },
    { '@type': 'WebPageElement', cssSelector: '#sip-formula', name: 'How Is SIP Return Calculated?' },
    { '@type': 'WebPageElement', cssSelector: '#sip-vs-lumpsum', name: 'SIP vs Lumpsum: Which Should You Choose?' },
    { '@type': 'WebPageElement', cssSelector: '#types-of-sip', name: 'Types of SIP' },
    { '@type': 'WebPageElement', cssSelector: '#rupee-cost-averaging', name: 'What Is Rupee Cost Averaging?' },
    { '@type': 'WebPageElement', cssSelector: '#average-sip-returns', name: 'What Returns Can You Expect From a SIP?' },
    { '@type': 'WebPageElement', cssSelector: '#sip-amount-table', name: 'SIP Calculator Table: Rs 1,000 to Rs 25,000 per Month' },
    { '@type': 'WebPageElement', cssSelector: '#sip-by-rate', name: 'How the Return Rate Changes Your SIP Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#sip-for-1-crore', name: 'Monthly SIP Needed to Build Rs 1 Crore' },
    { '@type': 'WebPageElement', cssSelector: '#minimum-sip', name: 'Minimum SIP Amount and How to Start' },
    { '@type': 'WebPageElement', cssSelector: '#sip-taxation', name: 'How Is SIP Taxed in India?' },
    { '@type': 'WebPageElement', cssSelector: '#xirr-vs-cagr', name: 'XIRR vs CAGR: Which Applies to Your SIP?' },
    { '@type': 'WebPageElement', cssSelector: '#elss-sip', name: 'ELSS SIP and the Section 80C Lock-In' },
    { '@type': 'WebPageElement', cssSelector: '#sip-mistakes', name: 'Common SIP Mistakes to Avoid' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This SIP and Lumpsum Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'SIP',
  alternateName: 'Systematic Investment Plan',
  description: 'A SIP is a method of investing a fixed amount of money at regular intervals, typically monthly, into a mutual fund scheme. It applies rupee cost averaging automatically, buying more units when the NAV is low and fewer when it is high.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Finance and Investing Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: ['https://en.wikipedia.org/wiki/Dollar_cost_averaging'],
};

export default function SIPCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <SIPCalculatorClient />
    </>
  );
}

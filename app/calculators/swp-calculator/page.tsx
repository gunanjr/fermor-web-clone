import type { Metadata } from 'next';
import SWPCalculatorClient from './SWPCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-06-20';
const PAGE_DATE_MODIFIED = '2026-09-09';

export const metadata: Metadata = {
  title: 'SWP Calculator: Plan Withdrawals with Step-Up & Inflation',
  description: 'Free SWP calculator for India. Model step-up and inflation-adjusted withdrawals, see how long your mutual fund corpus lasts, and find your safe withdrawal rate. Free to use.',
  keywords: [
    'swp calculator',
    'systematic withdrawal plan calculator',
    'swp cal',
    'swp calculator sbi',
    'swp calculator with inflation',
    'best swp calculator',
    'best swp plans calculator',
    'hdfc swp calculator',
    'swp mutual fund calculator',
    'swp plan calculator',
    'sip and swp calculator',
    'swp calculator groww',
    'sip swp calculator',
    'swp calculator hdfc',
    'groww swp calculator',
    'sbi systematic withdrawal plan calculator',
    'step up swp calculator',
    'swp calculator online',
    'swp return calculator',
    'swp in mutual fund calculator',
    'swp calculator icici',
    'systematic withdrawal calculator',
    'cleartax swp calculator',
    'groww calculator swp',
    'icici swp calculator',
    'lic swp calculator',
    'lumpsum swp calculator',
    'swp lumpsum calculator',
    'mf swp calculator',
    'mutual fund calculator swp',
    'sip plus swp calculator',
    'sip with swp calculator',
    'swp calculator aditya birla',
    'swp calculator advisorkhoj',
    'swp calculator axis bank',
    'swp calculator cleartax',
    'swp calculator excel',
    'swp calculator for mutual fund',
    'swp calculator in excel',
    'swp calculator in mutual fund',
    'swp calculator sbi mutual fund',
    'swp calculator upstox',
    'swp calculator with annual increase',
    'swp groww calculator',
    'swp hdfc calculator',
    'swp in groww',
    'swp investment calculator',
    'swp sip calculator',
    'swp tax calculator',
    'zerodha swp calculator',
    'advanced swp calculator',
    'annual swp calculator',
    'axis swp calculator',
    'swp calculator icici bank',
    'star swp calculator',
    'swp mutual fund return calculator',
    'retirement swp calculator',
    'monthly withdrawal mutual fund calculator',
    'corpus depletion calculator',
    'safe withdrawal rate calculator india',
    'swp retirement income calculator',
    'how long will my money last calculator',
    'swp plan mutual fund',
    'swp calculator app',
    'swp calculator kotak',
    'kotak swp calculator',
    'uti swp calculator',
    'nippon india swp calculator',
    'canara robeco swp calculator',
    'tata swp calculator',
  ],
  openGraph: {
    title: 'SWP Calculator: Systematic Withdrawal Plan with Step-Up & Inflation - Fermor',
    description: 'Calculate how long your mutual fund corpus lasts with monthly SWP withdrawals, model step-up and inflation-adjusted withdrawals, and find your safe withdrawal rate. Free.',
    type: 'website',
    url: 'https://fermor.in/calculators/swp-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-swp-calculator.png', width: 1200, height: 630, alt: 'Fermor SWP Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SWP Calculator: Systematic Withdrawal Plan Calculator',
    description: 'Calculate SWP sustainability, model step-up and inflation-adjusted withdrawals, and find your safe withdrawal rate. Free for India.',
    images: ['https://fermor.in/og-swp-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/swp-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Systematic Withdrawal Plan',
    'SWP Mutual Fund India',
    'Retirement Income Planning',
    'Safe Withdrawal Rate',
    'Step-Up SWP',
    'AMFI Guidelines',
    'Personal Finance India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'SWP Calculator', item: 'https://fermor.in/calculators/swp-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an SWP in mutual funds?',
      acceptedAnswer: { '@type': 'Answer', text: 'SWP (Systematic Withdrawal Plan) lets you withdraw a fixed amount from your mutual fund investment at regular intervals, usually monthly. SWPs are used by retirees to generate regular income while the remaining corpus continues to earn returns. The fund redeems units each month at the prevailing NAV to fund the withdrawal.' },
    },
    {
      '@type': 'Question',
      name: 'How does an SWP calculator work?',
      acceptedAnswer: { '@type': 'Answer', text: 'An SWP calculator takes your initial corpus, expected annual return rate, monthly withdrawal amount, and time period, then simulates the balance month by month: the withdrawal is deducted first, and the remaining balance earns a return at one-twelfth the annual rate. The calculator shows how long your money lasts, total withdrawals made, and the final remaining balance.' },
    },
    {
      '@type': 'Question',
      name: 'What is a safe SWP withdrawal rate in India?',
      acceptedAnswer: { '@type': 'Answer', text: 'A safe withdrawal rate for a 25 to 30 year retirement in India is typically 4 to 6% per year of the initial corpus. On a Rs 1 crore corpus at a 10% return, the sustainable monthly withdrawal is about Rs 83,333, calculated as annual return divided by 12. Withdrawing above the sustainable rate for your assumed return draws down the principal itself.' },
    },
    {
      '@type': 'Question',
      name: 'Can I run out of money with an SWP?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. If your monthly withdrawal consistently exceeds the monthly return on the remaining corpus, the balance shrinks and eventually reaches zero. A Rs 50 lakh corpus at 10% return supports a monthly withdrawal of approximately Rs 41,600 indefinitely. Withdrawing Rs 60,000 a month from the same corpus depletes it in about 12 years.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between SWP and the dividend (IDCW) option?',
      acceptedAnswer: { '@type': 'Answer', text: 'In an SWP, you redeem units at a fixed amount you control, making it predictable for retirement planning. In the dividend option, now called IDCW (Income Distribution cum Capital Withdrawal), the fund house distributes returns at its discretion, and payouts are not guaranteed. SEBI regulations require these distributions to be paid from realised profits. SWPs give investors more control and generally better tax efficiency.' },
    },
    {
      '@type': 'Question',
      name: 'Is SWP taxable?',
      acceptedAnswer: { '@type': 'Answer', text: 'SWP withdrawals are treated as unit redemptions and taxed on the gain portion. For equity mutual funds, units held 12 months or more are taxed at 12.5% as long-term capital gains, with the first Rs 1.25 lakh per year exempt. Units held under 12 months are taxed at 20% as short-term gains. For debt funds, all gains are taxed at your income slab rate per the Finance Act 2023.' },
    },
    {
      '@type': 'Question',
      name: 'How much corpus do I need to withdraw Rs 50,000 a month forever?',
      acceptedAnswer: { '@type': 'Answer', text: 'To withdraw Rs 50,000 a month indefinitely, your annual return needs to at least match your annual withdrawal. The formula is corpus equals annual withdrawal divided by expected return rate. At 8% return: about Rs 75 lakh. At 10%: about Rs 60 lakh. At 12%: about Rs 50 lakh.' },
    },
    {
      '@type': 'Question',
      name: 'Which mutual funds are commonly used for SWP?',
      acceptedAnswer: { '@type': 'Answer', text: 'Balanced advantage funds, equity savings funds, and conservative hybrid funds are commonly used for SWP because they carry lower volatility than pure equity funds while delivering higher returns than debt funds. Pure equity funds can also work for SWP over long horizons. For withdrawal periods under 3 years, liquid or short-duration debt funds reduce NAV volatility risk. Consult a SEBI-registered investment adviser for fund selection.' },
    },
    {
      '@type': 'Question',
      name: 'What happens to an SWP during a market downturn?',
      acceptedAnswer: { '@type': 'Answer', text: 'During a market downturn, the NAV of the fund falls, so each monthly SWP redeems more units to meet the fixed withdrawal amount, accelerating corpus depletion. Some retirees keep 12 to 24 months of withdrawal amount in liquid funds and pause equity SWP during a fall, a method known as the bucket strategy.' },
    },
    {
      '@type': 'Question',
      name: 'What is a step-up SWP and how does it model inflation?',
      acceptedAnswer: { '@type': 'Answer', text: 'A step-up SWP increases the monthly withdrawal amount every year by a fixed percentage, so income keeps pace with rising costs. Setting the step-up rate equal to the expected inflation rate is the standard way to model an inflation-adjusted SWP. For example, starting at Rs 30,000 a month and stepping up 6% annually, the monthly withdrawal reaches approximately Rs 50,700 by year 10 and approximately Rs 90,800 by year 20. This calculator supports step-up SWP modelling in the More Settings panel.' },
    },
    {
      '@type': 'Question',
      name: 'Can I combine SIP and SWP in one financial plan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, this is the standard lifecycle approach: accumulate a corpus through SIP for 20 to 30 years, then switch to SWP in retirement to draw income from it. Some investors run a smaller SIP in one fund while starting SWP in another as a transition, 2 to 3 years before retirement.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between an SWP and a lumpsum withdrawal?',
      acceptedAnswer: { '@type': 'Answer', text: 'A lumpsum withdrawal redeems the entire investment at once, triggering capital gains tax on the full gain in a single year and stopping compounding on that money immediately. An SWP redeems only what is needed each period, spreading tax across withdrawals and years while the rest of the corpus keeps compounding, which makes it more tax-efficient for anyone drawing regular income.' },
    },
    {
      '@type': 'Question',
      name: 'How do I find the sustainable withdrawal rate for my own corpus?',
      acceptedAnswer: { '@type': 'Answer', text: 'Divide your expected annual return rate by 12 and multiply by your corpus to get the monthly withdrawal your corpus can sustain indefinitely. This calculator displays this figure automatically in the results panel as the sustainable monthly withdrawal, recalculated live as the corpus or return rate changes.' },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform built for India with free calculators covering loans, investments, tax, and retirement planning.' },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SWP Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/swp-calculator',
  description: 'Calculate how long your mutual fund corpus lasts with systematic monthly withdrawals. Model a step-up SWP that grows with inflation, and find your sustainable withdrawal rate.',
  featureList: [
    'SWP corpus depletion simulation',
    'Step-up SWP with annual withdrawal increase',
    'Inflation-modelled withdrawal escalation',
    'Year-by-year corpus tracking table',
    'Sustainable (perpetual) withdrawal rate finder',
    'Effective withdrawal rate display',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate SWP Sustainability for Retirement',
  description: 'Step-by-step guide to calculating how long your investment corpus will last under a Systematic Withdrawal Plan, including a step-up option for inflation.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor SWP Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your initial corpus', text: 'Enter your total invested amount or retirement corpus that you want to fund your SWP from. This is the starting balance before any withdrawals begin.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the expected return rate', text: 'Enter the annual return rate you expect from your mutual fund investment. Balanced advantage funds typically deliver 8-10%, while equity funds may deliver 10-12% over long periods.' },
    { '@type': 'HowToStep', position: 3, name: 'Set your monthly withdrawal amount', text: 'Enter the fixed amount you want to withdraw each month. The calculator shows how long this withdrawal is sustainable and what corpus remains at the end of the period.' },
    { '@type': 'HowToStep', position: 4, name: 'Turn on step-up for inflation, if needed', text: 'Open More Settings and set an annual step-up percentage to model a withdrawal that increases every year, for example to keep pace with inflation.' },
    { '@type': 'HowToStep', position: 5, name: 'Review corpus depletion and sustainability', text: 'See the year-wise corpus table, total withdrawals over the period, and final remaining balance. If the corpus depletes too quickly, reduce the monthly withdrawal or the step-up rate, or increase the expected return.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'SWP',
  alternateName: 'Systematic Withdrawal Plan',
  description: 'A mutual fund facility that allows investors to withdraw a fixed amount at regular intervals from their investment, commonly used to generate retirement income while the remaining corpus continues to earn returns.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Systematic_withdrawal_plan',
    'https://www.wikidata.org/wiki/Q7662396',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SWP Calculator: Systematic Withdrawal Plan Calculator for India',
  description: 'Free SWP calculator. Calculate how long your mutual fund corpus lasts with systematic monthly withdrawals, model step-up and inflation-adjusted withdrawals, and find your safe withdrawal rate.',
  url: 'https://fermor.in/calculators/swp-calculator',
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
    { '@type': 'DefinedTerm', name: 'SWP', alternateName: 'Systematic Withdrawal Plan' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Retirees, near-retirement investors, mutual fund investors, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-swp', name: 'What Is an SWP' },
    { '@type': 'WebPageElement', cssSelector: '#swp-formula', name: 'How SWP Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#safe-withdrawal-rate', name: 'Safe Withdrawal Rate India' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-swp', name: 'Step-Up SWP and Inflation' },
    { '@type': 'WebPageElement', cssSelector: '#sip-swp-strategy', name: 'Combining SIP and SWP' },
    { '@type': 'WebPageElement', cssSelector: '#swp-vs-lumpsum', name: 'SWP vs Lumpsum Withdrawal' },
    { '@type': 'WebPageElement', cssSelector: '#swp-vs-dividend', name: 'SWP vs Dividend Option' },
    { '@type': 'WebPageElement', cssSelector: '#swp-tax', name: 'SWP Tax Treatment' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SWPCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SWPCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import LiquidFundVsFDClient from './LiquidFundVsFDClient';

export const metadata: Metadata = {
  title: 'Liquid Fund vs FD Calculator: Compare Post-Tax Returns',
  description:
    'Free liquid fund vs FD calculator for India. Compare fixed deposit maturity and liquid fund returns after tax, with real SBI, HDFC, ICICI, Axis FD rates. Free to use.',
  keywords: [
    'liquid fund vs fd calculator',
    'fixed deposit calculator',
    'fd calculator',
    'fd rate calculator',
    'fd interest calculator',
    'fd interest rate calculator',
    'fixed deposit interest calculator',
    'fixed deposit rate calculator',
    'fd return calculator',
    'fixed deposit return calculator',
    'sbi fixed deposit calculator',
    'fd calculator sbi',
    'fd calculator hdfc',
    'hdfc fixed deposit calculator',
    'hdfc fd calculator',
    'icici fd calculator',
    'icici fixed deposit calculator',
    'axis bank fd calculator',
    'axis fixed deposit calculator',
    'post office fd calculator',
    'postal fixed deposit calculator',
    'fd interest rates sbi',
    'fixed deposit interest rate sbi',
    'hdfc fixed deposit interest rate',
    'fd interest rates hdfc',
    'fd rates icici bank',
    'fd interest rates icici',
    'fd rates axis bank',
    'liquid fund calculator',
    'liquid fund vs fixed deposit',
    'liquid mutual fund vs fd',
    'is liquid fund better than fd',
    'liquid fund returns calculator',
    'liquid fund taxation india',
    'best liquid funds 2026',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/liquid-fund-vs-fd-calculator' },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquid Fund vs FD Calculator: Compare Post-Tax Returns',
    description: 'Compare fixed deposit maturity and liquid fund returns after tax with real bank FD rates. Free for India.',
    images: ['https://fermor.in/og-liquid-fund-vs-fd-calculator.png'],
  },
  openGraph: {
    title: 'Liquid Fund vs FD Calculator: Compare Post-Tax Returns',
    description:
      'Compare fixed deposit maturity against liquid fund returns, post-tax, using real SBI, HDFC, ICICI, and Axis Bank FD rates. Includes year-by-year growth table. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/liquid-fund-vs-fd-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-liquid-fund-vs-fd-calculator.png', width: 1200, height: 630, alt: 'Fermor Liquid Fund vs FD Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-07-22';
const PAGE_DATE_PUBLISHED = '2026-07-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Fixed Deposit Interest Rates',
    'Liquid Mutual Funds',
    'Debt Mutual Fund Taxation',
    'RBI Repo Rate',
    'DICGC Deposit Insurance',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Personal Finance India',
    'NRI Investments',
  ],
};

const faqItems = [
  {
    q: 'What is a liquid fund?',
    a: 'A liquid fund is a debt mutual fund that invests in money market instruments and debt securities with a maturity of up to 91 days, such as treasury bills, commercial paper, and certificates of deposit. Liquid funds aim for capital safety and easy withdrawal rather than high returns, and are typically used to park money for a few weeks to a few years.',
  },
  {
    q: 'What is the difference between a liquid fund and a fixed deposit?',
    a: 'A fixed deposit pays a fixed, guaranteed interest rate locked in at the time of booking, with a penalty for early withdrawal. A liquid fund has no fixed rate, its NAV moves daily with the underlying portfolio, and it can usually be redeemed within one working day with no lock-in beyond a small exit load in the first week. FD returns are certain; liquid fund returns are variable but historically stable.',
  },
  {
    q: 'Is a liquid fund better than an FD?',
    a: 'Neither is universally better. FDs suit money you will not touch before maturity and want a guaranteed, known return on. Liquid funds suit money you may need on short notice, since redemption is faster and there is no fixed penalty for early exit beyond a small graded charge in the first 7 days. Since April 2023, both are taxed at your income slab rate, so the old tax advantage liquid funds had over FDs no longer applies.',
  },
  {
    q: 'How is liquid fund return taxed in India?',
    a: 'For units bought on or after April 1, 2023, gains from liquid funds (a debt-oriented scheme) are added to your total income and taxed at your applicable income tax slab rate, regardless of how long you held the units. There is no LTCG rate and no indexation benefit for these units, per the Finance Act 2023 amendment to Section 50AA of the Income Tax Act.',
  },
  {
    q: 'How is FD interest taxed in India?',
    a: 'FD interest is added to your total income every year it accrues and taxed at your income tax slab rate. Banks deduct TDS at 10% if interest from one bank exceeds Rs 40,000 in a financial year (Rs 50,000 for senior citizens), or 20% if PAN is not furnished. TDS is not a final tax; you settle the actual liability when filing your return.',
  },
  {
    q: 'Does a liquid fund have a tax advantage over FD anymore?',
    a: 'No. Before April 2023, debt funds held over 3 years qualified for 20% LTCG with indexation, which usually beat FD taxation. That benefit was removed for units bought on or after April 1, 2023. Both FD interest and liquid fund gains are now taxed at your slab rate, so taxation is no longer a reason to prefer one over the other for new investments.',
  },
  {
    q: 'What is the SBI FD interest rate right now?',
    a: 'SBI fixed deposit interest rate is 6.80% for a 1-year tenure, 7.00% for 2 years, 6.75% for 3 years, and 6.50% for 5 years, as of July 2026. Senior citizens get an additional 0.50% on every tenure. Rates change periodically with RBI policy, so confirm the current rate on the SBI website before booking.',
  },
  {
    q: 'What is the HDFC Bank FD interest rate right now?',
    a: 'HDFC Bank fixed deposit interest rate is 7.00% per annum across 1-year, 2-year, 3-year, and 5-year tenures, as of July 2026. Senior citizens get an additional 0.50%, taking the senior citizen rate to 7.50% across these tenures.',
  },
  {
    q: 'What is the ICICI Bank FD interest rate right now?',
    a: 'ICICI Bank fixed deposit interest rate is 6.90% for 1 year and 7.00% for 2, 3, and 5-year tenures, as of July 2026. Senior citizens get an additional 0.50% on all tenures.',
  },
  {
    q: 'How do I calculate FD maturity amount?',
    a: 'Indian bank FDs compound quarterly by default: Maturity Value = Principal x (1 + Rate/4/100)^(4 x Years). For a Rs 5 lakh deposit at 6.80% for 1 year, maturity works out to Rs 5,34,877, an interest of Rs 34,877. The calculator above does this automatically for any amount, rate, and tenure.',
  },
  {
    q: 'What is the exit load on a liquid fund?',
    a: 'Most liquid funds charge a small graded exit load only if redeemed within 7 days of investment, typically starting around 0.0070% of NAV for a same-day exit and reducing to zero by day 7. There is no exit load at all after 7 days, unlike an FD, which usually cuts 0.5-1% off the applicable rate for any premature withdrawal, however long the deposit was held.',
  },
  {
    q: 'Can I withdraw a liquid fund without any penalty?',
    a: 'Yes, after the first 7 days from investment, liquid funds can be redeemed at any time with zero exit load, and the money is typically credited within one working day (T+1). This is faster and cheaper than breaking a fixed deposit early, which almost always costs a rate reduction regardless of how long it has been held.',
  },
  {
    q: 'Is a liquid fund as safe as a fixed deposit?',
    a: 'They carry different kinds of protection, not the same one. A bank FD is insured up to Rs 5 lakh per depositor per bank under DICGC, a government-backed guarantee. A liquid fund carries no deposit insurance, but is regulated by SEBI, holds a diversified portfolio of short-maturity debt, and marks its holdings to market daily, which limits how much any single default can affect the fund.',
  },
  {
    q: 'What is the minimum investment for a liquid fund compared to an FD?',
    a: 'Most liquid funds accept an initial investment as low as Rs 500 to Rs 1,000, with no fixed tenure. Bank FDs usually require a minimum of Rs 1,000 to Rs 10,000 depending on the bank, and must be booked for a fixed tenure chosen upfront.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Liquid Fund vs FD Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/liquid-fund-vs-fd-calculator',
  description: 'Compare fixed deposit maturity value against liquid fund returns, before and after tax, using real current FD rates from SBI, HDFC, ICICI, and Axis Bank. Includes year-by-year growth table and multi-currency support.',
  featureList: [
    'FD Maturity Calculator (quarterly compounding)',
    'Liquid Fund Return Calculator (daily compounding)',
    'Post-Tax Comparison at Your Income Slab',
    'Real Current Bank FD Rates (SBI, HDFC, ICICI, Axis)',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Tenure presets (1M, 3M, 6M, 1Y, 3Y, 5Y)',
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
    { '@type': 'ListItem', position: 3, name: 'Liquid Fund vs FD Calculator', item: 'https://fermor.in/calculators/liquid-fund-vs-fd-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Liquid Fund and FD Returns',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Liquid Fund vs FD Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your investment amount', text: 'Input the lump sum you plan to invest, either in a fixed deposit or a liquid fund.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the tenure', text: 'Choose how long you plan to stay invested, from 1 month to 5 years, using the slider or a preset.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter the FD rate and expected liquid fund return', text: 'Adjust the FD interest rate to match your bank, and the liquid fund return to match a fund you are considering. Defaults are pre-filled with real current rates.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the post-tax comparison', text: 'The calculator shows maturity value, gain, tax payable, and post-tax value for both options side by side, along with which one wins for your inputs.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Liquid Fund',
  alternateName: 'Liquid Mutual Fund',
  description: 'A liquid fund is a debt mutual fund scheme that invests in money market instruments with a residual maturity of up to 91 days, prioritising capital safety and same-day-or-next-day redemption over high returns.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Money_market_fund',
    'https://www.wikidata.org/wiki/Q1780947',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Liquid Fund vs FD Calculator: Compare Post-Tax Returns',
  description: 'Compare fixed deposit maturity value against liquid fund returns, before and after tax, using real current bank FD rates.',
  url: 'https://fermor.in/calculators/liquid-fund-vs-fd-calculator',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Liquid Fund', alternateName: 'Liquid Mutual Fund' },
    { '@type': 'DefinedTerm', name: 'Fixed Deposit', alternateName: 'FD' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors, bank depositors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-liquid-fund', name: 'What Is a Liquid Fund' },
    { '@type': 'WebPageElement', cssSelector: '#fd-maturity-formula', name: 'FD Maturity Formula' },
    { '@type': 'WebPageElement', cssSelector: '#liquid-fund-formula', name: 'Liquid Fund Return Formula' },
    { '@type': 'WebPageElement', cssSelector: '#fd-rates-comparison', name: 'FD Interest Rates Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#liquid-fund-vs-fd', name: 'Liquid Fund vs FD Returns' },
    { '@type': 'WebPageElement', cssSelector: '#taxation-comparison', name: 'Taxation Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#liquidity-comparison', name: 'Liquidity Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#safety-comparison', name: 'Safety Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#when-liquid-fund', name: 'When to Choose a Liquid Fund' },
    { '@type': 'WebPageElement', cssSelector: '#when-fd', name: 'When to Choose an FD' },
    { '@type': 'WebPageElement', cssSelector: '#post-office-comparison', name: 'Post Office FD Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function LiquidFundVsFDCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LiquidFundVsFDClient />
    </>
  );
}

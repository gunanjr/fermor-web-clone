import type { Metadata } from 'next';
import NPSCalculatorClient from './NPSCalculatorClient';

export const metadata: Metadata = {
  title: 'NPS Calculator: Pension, Maturity Corpus & Tax Savings',
  description: 'Free NPS calculator for India. Get your pension, maturity corpus, and 80CCD tax savings in seconds. Built for govt and private employees. Free to use.',
  keywords: [
    'nps calculator', 'national pension system calculator', 'nps pension calculator',
    'calculate nps pension', 'calculation of national pension scheme', 'calculator for nps',
    'nps one time investment calculator', 'govt nps calculator', 'nps monthly pension calculator',
    'nps tax calculator', 'nps tax benefit calculator', 'govt employee nps calculator',
    'nps calculator for government employees', 'nps calculator for central government employees',
    'nps calculator for state government employees', 'central government nps calculator',
    'nps calculator with increasing contribution', 'nps calculator with existing balance',
    'nps withdrawal calculator', 'nps voluntary retirement calculator', 'calculate pension in nps',
    'nps retirement calculator', 'national pension scheme calculator', 'nps scheme calculator',
    'nps amount calculator', 'new pension scheme calculator', 'national pension calculator',
    'national pension plan calculator', 'national pension fund calculator',
    'national pension scheme pension calculator', 'nps pension scheme calculator',
    'best nps calculator', 'nps calculator online', 'nps annuity calculator',
    'nps return calculator', 'nps calculator for govt employees', 'nps investment calculator',
    'nps maturity calculator', 'nps maturity amount', 'nps tier 1 calculator', 'nps tier 2 calculator',
    'nps calculator lumpsum', 'nps corpus calculator', 'nps corpus', 'what is nps corpus',
    'pran calculator', 'nps calculation formula', 'nps formula calculator', 'nps contribution calculator',
    'nps calculator yearly', 'nps calculator pension', 'nps planner', 'nps sip calculator',
    'corporate nps calculator', 'nps age wise chart',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/nps-calculator',
  },
  openGraph: {
    type: 'website',
    url: 'https://fermor.in/calculators/nps-calculator',
    title: 'NPS Calculator: Pension, Maturity Corpus & Tax Savings - Fermor',
    description: 'Free NPS calculator for India. Get your exact pension, maturity corpus, and 80CCD tax savings in seconds. Built for govt employees, private sector, and NRIs.',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-nps-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NPS Calculator: Pension, Maturity Corpus & Tax Savings - Fermor',
    description: 'Free NPS calculator for India. Project your NPS corpus, monthly pension, and tax-free lump sum at retirement. With year-by-year growth table.',
    images: ['https://fermor.in/og-nps-calculator.png'],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'NPS Calculator', item: 'https://fermor.in/calculators/nps-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is NPS corpus calculated at retirement?',
      acceptedAnswer: { '@type': 'Answer', text: 'NPS corpus is calculated by compounding monthly contributions (employee and employer) at the expected annual return rate, month by month, until retirement. The formula is FV = M x [((1 + r)^n - 1) / r] x (1 + r), where M is the total monthly contribution, r is the monthly return rate (annual rate divided by 12), and n is the number of months. At retirement, at least 40% must be used to purchase an annuity and up to 60% can be withdrawn as a tax-free lump sum.' },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I use for the NPS calculator?',
      acceptedAnswer: { '@type': 'Answer', text: 'Return rate depends on your NPS scheme. Life Cycle 75 (high equity) has delivered approximately 12-13% CAGR over the past 10 years. Life Cycle 50 (moderate) has returned 10-11%. Life Cycle 25 (conservative) and Central Government scheme have returned 8-9%. Use 10% as a reasonable base case for long-term planning. NPS returns are market-linked and not guaranteed.' },
    },
    {
      '@type': 'Question',
      name: 'What happens to NPS corpus at age 60?',
      acceptedAnswer: { '@type': 'Answer', text: 'At age 60, you must use at least 40% of your NPS corpus to purchase an annuity from an IRDAI-registered life insurer. This annuity provides a monthly pension for life. The remaining 60% can be withdrawn as a lump sum, which is completely tax-free under the Finance Act 2019. You can also annuitise more than 40% if you prefer a higher pension over the lump sum.' },
    },
    {
      '@type': 'Question',
      name: 'What are the NPS tax benefits under 80CCD?',
      acceptedAnswer: { '@type': 'Answer', text: 'NPS offers three separate deductions. Section 80CCD(1) allows deduction up to 10% of salary within the Rs 1.5 lakh 80C limit. Section 80CCD(1B) provides an exclusive additional deduction of Rs 50,000 per year for NPS, over and above the 80C limit. Section 80CCD(2) allows employer contributions up to 10% of salary (14% for central government) without any upper monetary limit. Total possible NPS deductions can exceed Rs 2 lakh for a salaried person.' },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum NPS contribution per year?',
      acceptedAnswer: { '@type': 'Answer', text: 'For NPS Tier I, the minimum contribution is Rs 500 per deposit and Rs 1,000 per financial year. There is no maximum contribution limit. For NPS Tier II (voluntary savings account), the minimum initial contribution is Rs 250. NPS Tier II does not provide tax benefits but allows unrestricted withdrawals.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Auto Choice and Active Choice in NPS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Auto Choice (Lifecycle Fund) automatically adjusts your equity-debt allocation based on age. Life Cycle 75 starts at 75% equity till age 35 and reduces to 15% by age 55. Life Cycle 50 starts at 50% equity and reduces to 10%. Life Cycle 25 starts at 25% equity and reduces to 5%. Active Choice lets you set your own allocation: up to 75% in Equity, up to 100% in Corporate Bonds, and up to 100% in Government Securities, totalling 100%.' },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw from NPS before age 60?',
      acceptedAnswer: { '@type': 'Answer', text: 'Partial withdrawals are allowed after 3 years of NPS account opening for specific purposes: higher education or marriage of children, purchase or construction of a residential house, treatment of critical illness, or disability. Maximum withdrawal is 25% of your own contributions, with up to 3 withdrawals across the entire tenure. Premature exit before age 60 requires 80% of corpus to be annuitised; only 20% can be withdrawn as lump sum.' },
    },
    {
      '@type': 'Question',
      name: 'Is NPS better than PPF for retirement?',
      acceptedAnswer: { '@type': 'Answer', text: 'NPS offers market-linked returns with historically higher long-term returns (10-13% CAGR in equity schemes vs PPF at 7.1% for FY26). NPS also provides Rs 50,000 additional tax deduction under 80CCD(1B) that PPF does not. However, 40% of NPS corpus must be annuitised and the pension is taxable, while PPF maturity is 100% tax-free. NPS suits investors seeking higher growth; PPF suits risk-averse investors wanting guaranteed, tax-free returns.' },
    },
    {
      '@type': 'Question',
      name: 'What annuity rate should I use for NPS pension calculation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Annuity rates from Indian life insurers for NPS (Annuity for Life with Return of Purchase Price at 60 years) currently range from 6.0% to 6.75% per annum. This rate is locked at the time of annuity purchase and depends on the insurer, age at purchase, and annuity variant. At 6.5%, a Rs 40 lakh annuity corpus provides approximately Rs 21,667 per month. The monthly pension from annuity is fully taxable.' },
    },
    {
      '@type': 'Question',
      name: 'What is the NPS annuity ratio and can I change it?',
      acceptedAnswer: { '@type': 'Answer', text: 'The annuity ratio is the percentage of your NPS corpus used to purchase an annuity. Per PFRDA guidelines, the minimum annuity ratio is 40% for subscribers retiring at or after age 60. For premature exit before 60, the minimum is 80%. You can choose a higher annuity ratio (up to 100%) if you prefer a larger monthly pension.' },
    },
    {
      '@type': 'Question',
      name: 'How does the NPS calculator for government employees differ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Government employees have a default contribution of 10% of their basic salary plus DA, while the government contributes 14%. The default investment scheme is the Central Government or State Government scheme, which predominantly invests in government securities and corporate bonds, generating historical returns of 8.5% to 9%.' },
    },
    {
      '@type': 'Question',
      name: 'What is the National Pension Scheme formula?',
      acceptedAnswer: { '@type': 'Answer', text: 'The National Pension Scheme uses a standard compound interest formula for regular SIP investments: FV = M x [((1 + r)^n - 1) / r] x (1 + r), where M is the total monthly contribution (employee + employer), r is the expected monthly rate of return, and n is the total number of months until retirement.' },
    },
    {
      '@type': 'Question',
      name: 'Can NRI investors open an NPS account?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, NRI, OCI, and PIO cardholders between 18 and 70 years of age are eligible to open an NPS account. Contributions can be made from a NRO or NRE account. However, the account will be closed and all proceeds repatriated if the subscriber becomes a citizen of another country. NRI investors should consult a tax adviser since the tax treatment of NPS in their country of residence may differ.' },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate NPS pension for central or state government employees?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select Government as your sector and pick the Central Government or State Government scheme. The calculator applies the default 10% employee and 14% employer contribution split used across most government payrolls, along with the historical 8.5% CAGR for that scheme. Adjust the monthly contribution slider if your basic pay plus DA differs from the default.' },
    },
    {
      '@type': 'Question',
      name: 'Is there an NPS calculator for a lumpsum or one-time investment?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Set the monthly contribution slider to a low value or zero, then enter your one-time deposit amount in the Existing NPS Corpus field under More settings. The calculator compounds that lumpsum alone at your chosen return rate through to retirement, without adding further monthly contributions.' },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate my NPS maturity amount?',
      acceptedAnswer: { '@type': 'Answer', text: 'The NPS maturity amount is the total corpus shown at your selected retirement age, before any split into lump sum and annuity. Enter your monthly contribution, current age, retirement age, and expected return rate, and the calculator displays the maturity corpus instantly at the top of the results panel.' },
    },
    {
      '@type': 'Question',
      name: 'What is NPS Tier 2, and does this calculator support it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tier II is a voluntary NPS savings account with no lock-in and no tax deduction, separate from the retirement-focused Tier I account. This calculator projects Tier I, since that is the account with the 80CCD tax benefits and the compounding relevant to retirement planning. Tier II withdrawals are unrestricted and do not need a maturity projection.' },
    },
    {
      '@type': 'Question',
      name: 'What is a PRAN number, and does it affect the calculation?',
      acceptedAnswer: { '@type': 'Answer', text: 'PRAN, or Permanent Retirement Account Number, is the unique identifier issued by the Central Recordkeeping Agency when you open an NPS account. It is used to log in and track your actual contributions and corpus on the CRA or NPS Trust portal. It has no bearing on the projection formula used by this calculator.' },
    },
    {
      '@type': 'Question',
      name: 'Can I calculate NPS with a yearly step-up in contribution?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Annual Contribution Increment field under More settings raises your monthly contribution by a fixed percentage every year, compounding on top of the previous year\'s amount. Setting it to 5% or 10% reflects a typical annual salary increment being applied to your NPS deduction.' },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fermor is building the automated financial action layer for India. The goal is to close the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The actual product connects real financial accounts through the RBI-regulated Account Aggregator framework and automates actions like moving idle cash to liquid funds, paying advance tax, and filling unused 80C deductions.' },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NPS Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/nps-calculator',
  description: 'Calculate NPS retirement corpus, monthly pension from annuity, and tax-free lump sum. Supports annual contribution increment, configurable annuity ratio (40-100%), and year-by-year growth table.',
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-06-20',
  dateModified: '2026-09-10',
  inLanguage: 'en-IN',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  featureList: [
    'Monthly NPS contribution calculation with annual increment',
    'Official NPS scheme selection and expected return rates',
    'Deferment age and variable retirement age support',
    'Desired pension shortfall and surplus analysis',
    'Configurable annuity ratio (40-100%)',
    'Configurable annuity rate (4-9%)',
    'Existing NPS corpus compounding',
    'Year-by-year corpus growth table',
    'Monthly pension estimate from annuity',
    'Multi-currency display for NRI investors',
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate NPS Corpus and Pension',
  description: 'Use the Fermor NPS Calculator to project your National Pension System corpus at retirement, monthly pension, and lump sum withdrawal.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor NPS Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select Subscriber Sector and Scheme', text: 'Choose your employment sector (Government or Non-Government) and your investment scheme. The calculator will automatically apply the historical benchmark return rate for that scheme.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter monthly contributions', text: 'Enter your monthly NPS contribution and your employer contribution separately.' },
    { '@type': 'HowToStep', position: 3, name: 'Set your age', text: 'Enter your current age and desired retirement age (between 40 and 75).' },
    { '@type': 'HowToStep', position: 4, name: 'Adjust advanced settings', text: 'Click More settings to enter existing NPS corpus, deferment age, desired monthly pension, annual contribution increment, annuity ratio (minimum 40%), and expected annuity rate.' },
    { '@type': 'HowToStep', position: 5, name: 'Review results', text: 'See total corpus at retirement, lump sum withdrawal, annuity corpus, estimated monthly pension, and any pension shortfall. Switch to Year-by-Year for the annual compounding breakdown.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fermor.in/calculators/nps-calculator',
  url: 'https://fermor.in/calculators/nps-calculator',
  name: 'NPS Calculator: Calculate NPS Corpus, Pension and Lump Sum',
  datePublished: '2026-06-20',
  dateModified: '2026-09-10',
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  about: [
    { '@type': 'DefinedTerm', name: 'NPS', alternateName: 'National Pension System' },
    { '@type': 'DefinedTerm', name: 'Annuity', alternateName: 'Monthly Pension from NPS' },
  ],
  audience: { '@type': 'Audience', audienceType: 'Indian salaried professionals, government employees, NRI investors, self-employed, retirement planners', geographicArea: { '@type': 'Country', name: 'India' } },
  breadcrumb: breadcrumbSchema,
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-nps', name: 'What Is NPS?' },
    { '@type': 'WebPageElement', cssSelector: '#nps-corpus-formula', name: 'NPS Corpus Calculation: How the Formula Works' },
    { '@type': 'WebPageElement', cssSelector: '#nps-tax-benefits', name: 'NPS Tax Benefits: How to Save Up to Rs 2 Lakh Per Year' },
    { '@type': 'WebPageElement', cssSelector: '#nps-vs-ppf', name: 'NPS vs PPF: What Is the Difference?' },
    { '@type': 'WebPageElement', cssSelector: '#nps-return-rates', name: 'What Is a Good NPS Return Rate for Planning?' },
    { '@type': 'WebPageElement', cssSelector: '#nps-schemes', name: 'NPS Schemes: Auto Choice and Active Choice' },
    { '@type': 'WebPageElement', cssSelector: '#nps-annuity', name: 'NPS Annuity: How Your Monthly Pension Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#nps-govt-employees', name: 'NPS Calculator for Government Employees' },
    { '@type': 'WebPageElement', cssSelector: '#nps-lumpsum-vs-sip', name: 'NPS One-Time Investment vs Monthly SIP Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#nps-withdrawal', name: 'NPS Withdrawal Rules: Partial and Premature Exit' },
    { '@type': 'WebPageElement', cssSelector: '#nps-tier1-vs-tier2', name: 'NPS Tier 1 vs Tier 2: Which One Does This Calculator Cover?' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This NPS Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, closing the gap between knowing what to do with money and actually doing it.',
  knowsAbout: [
    'NPS Calculation', 'National Pension System', 'PFRDA Regulations',
    'Annuity Calculation', 'Income Tax 80CCD', 'Retirement Planning India',
    'NPS Schemes Auto Choice Active Choice', 'Personal Finance India',
    'Account Aggregator Framework', 'SEBI Regulations', 'RBI Monetary Policy',
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'NPS',
  alternateName: 'National Pension System',
  description: 'NPS (National Pension System) is a voluntary, market-linked retirement savings scheme regulated by PFRDA. Available to all Indian citizens aged 18-70, NPS invests in equity, corporate bonds, and government securities. At retirement, 60% of corpus can be withdrawn tax-free; the remaining 40% must purchase an annuity.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Financial and Retirement Planning Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/National_Pension_System', 'https://www.npstrust.org.in'],
};

export default function NPSCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <NPSCalculatorClient />
    </>
  );
}

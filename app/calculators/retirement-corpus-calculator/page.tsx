import type { Metadata } from 'next';
import RetirementCorpusCalculatorClient from './RetirementCorpusCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-08';
const PAGE_DATE_MODIFIED  = '2026-09-16';
const CANONICAL = 'https://fermor.in/calculators/retirement-corpus-calculator';

export const metadata: Metadata = {
  title: 'Retirement Corpus Calculator: How Much Do You Need to Retire in India?',
  description: 'Free retirement corpus calculator for India. Calculate how much money you need to retire, accounting for inflation, life expectancy, and post-retirement returns. Instant results.',
  keywords: [
    'retirement corpus calculator',
    'calculating retirement corpus',
    'retirement corpus calculator with inflation',
    'nps corpus calculator',
    'pension corpus calculator',
    'retirement corpus meaning',
    'how to calculate retirement corpus',
    'retirement corpus formula',
    'how much corpus needed to retire',
    'retirement planning calculator india',
    'retirement fund calculator india',
    'how much to save for retirement india',
    'retirement savings calculator',
    'how much money needed to retire india',
    'monthly expenses retirement calculator',
    'inflation adjusted retirement calculator',
    'corpus required for retirement',
    'retirement planning calculator',
    'how to plan retirement in india',
    'post retirement corpus calculator',
    'fire retirement calculator india',
    'early retirement calculator india',
    'pension calculator india',
    'how much money do i need to retire',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Retirement Corpus Calculator: How Much Do You Need to Retire? - Fermor',
    description: 'Calculate your required retirement corpus accounting for inflation, life expectancy, and post-retirement returns. Free calculator for India.',
    url: CANONICAL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Corpus Calculator: How Much Do You Need to Retire? - Fermor',
    description: 'Calculate your required retirement corpus accounting for inflation, life expectancy, and post-retirement returns. Free calculator for India.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  sameAs: ['https://fermor.in'],
  knowsAbout: ['Retirement Planning', 'Retirement Corpus', 'NPS', 'Pension Planning', 'Financial Calculators', 'India Retirement Planning'],
};

const faqs = [
  { q: 'What is retirement corpus?', a: 'Retirement corpus is the total investable wealth you need to accumulate before retirement to fund all your expenses for the rest of your life without depleting the principal. It is calculated as the present value of a growing annuity that funds monthly expenses from retirement until death, adjusted for inflation and post-retirement investment returns.' },
  { q: 'How much retirement corpus do I need in India?', a: 'A common shortcut is 25-30 times your annual expenses at retirement. For Rs 50,000/month expenses at retirement, you need approximately Rs 1.5-1.8 crore. The accurate figure depends on your inflation assumption, life expectancy, and post-retirement return rate. Use this calculator to get your specific number.' },
  { q: 'How is retirement corpus calculated?', a: 'Corpus = Monthly Expense at Retirement x [(1 - (1+g)^n / (1+r)^n) / (r-g)], where g is the monthly inflation rate, r is the monthly post-retirement return rate, and n is retirement duration in months. This growing annuity formula is more accurate than the 25x rule because it accounts for both ongoing inflation and investment returns simultaneously.' },
  { q: 'Does this calculator account for inflation?', a: 'Yes, at two stages. First, it inflates your current monthly expenses to retirement date using the inflation rate you set. Second, the growing annuity formula assumes those expenses continue rising at inflation throughout retirement while the corpus earns post-retirement returns. This dual inflation adjustment is what makes the result accurate.' },
  { q: 'What is a safe withdrawal rate in India?', a: 'For 25-30 year retirements in India, a 3-3.5% annual safe withdrawal rate is more appropriate than the US 4% rule, due to structurally higher inflation. At 3%, Rs 1 crore corpus supports Rs 2.5 lakh annual withdrawal (Rs 20,800/month) sustainably. For FIRE scenarios covering 40+ years, plan at 2.5-3%.' },
  { q: 'What is a realistic post-retirement return to assume in India?', a: 'A balanced post-retirement portfolio (60% debt, 40% equity) has returned 8-10% historically in India. SCSS (Senior Citizens Savings Scheme) at 8.2% p.a. provides a reliable debt anchor. Use 8% as a conservative baseline; a more aggressive portfolio earning 10% would extend the same corpus further.' },
  { q: 'What is the difference between NPS corpus and retirement corpus?', a: 'NPS corpus is the amount accumulated in your National Pension System account. Retirement corpus is total investable wealth from ALL sources combined: NPS, EPF, PPF, mutual funds, FDs, and real estate. NPS contributes one part of the whole. Under 2026 PFRDA rules, non-government subscribers can withdraw up to 80% of NPS as a lump sum, with a 20% minimum annuitized.' },
  { q: 'How does life expectancy affect the corpus needed?', a: 'Planning for age 90 instead of 80 can require 30-40% more corpus, because the money must last 10 additional years. India\'s life expectancy has crossed 70, and medical advances mean many current 30-year-olds may live to 85-95. Planning for at least 25-30 years post-retirement is prudent to avoid outliving your savings.' },
  { q: 'What is the FIRE corpus for early retirement in India?', a: 'FIRE (Financial Independence, Retire Early) corpus in India is typically 30-33 times annual expenses at retirement, using a conservative 3% safe withdrawal rate to cover 40-50 years. For Rs 80,000/month (Rs 9.6 lakh/year) expenses, FIRE corpus is approximately Rs 2.9-3.2 crore.' },
  { q: 'Should I include EPF in my retirement corpus calculation?', a: 'Yes. This calculator gives your total corpus target from all sources. Subtract your expected EPF corpus (employer + employee contributions compounded to retirement) from the total to find how much you must build separately through NPS, PPF, and mutual funds. The gap is the number your monthly SIP must address.' },
  { q: 'What monthly savings are needed to build retirement corpus?', a: 'To build Rs 3 crore over 25 years at 12% CAGR (equity mutual funds benchmark), you need approximately Rs 17,000/month SIP. For Rs 5 crore in the same period, approximately Rs 28,000/month. Starting 5 years earlier reduces the required SIP by 35-40%, making early action the single most powerful lever in retirement planning.' },
  { q: 'Is Rs 1 crore enough to retire in India?', a: 'Rs 1 crore supports roughly Rs 20,000-33,000/month expenses at a 3-4% sustainable withdrawal rate. For a metro couple with Rs 80,000+ monthly expenses, that same Rs 80,000 becomes approximately Rs 2.6 lakh/month at retirement after 25 years of 6% inflation, making Rs 1 crore far short. Most households need Rs 3-8 crore depending on age, city, and expense level.' },
  { q: 'How does NPS help build retirement corpus?', a: 'NPS offers a unique tax advantage: contributions up to Rs 1.5 lakh qualify for Section 80CCD(1) deduction, with an additional Rs 50,000 under Section 80CCD(1B), saving Rs 15,600/year in tax for 30% bracket payers. Under 2026 PFRDA rules, up to 80% of the corpus can be a lump sum (though only 60% stays tax-free under Section 10(12A)), while a 20% minimum funds an annuity at roughly 5.7-8.1% p.a.' },
  { q: 'What is the growing annuity formula for retirement planning?', a: 'Growing annuity present value = PMT x [(1 - (1+g)^n / (1+r)^n) / (r-g)], where PMT is the first payment (expense at retirement), g is the periodic growth rate (monthly inflation), r is the periodic discount rate (monthly post-retirement return), and n is the number of periods (retirement months). When r equals g exactly, the formula simplifies to PV = PMT x n.' },
  { q: 'Is gratuity included in this calculator\'s corpus target?', a: 'Not automatically. Gratuity is calculated separately as Last Drawn Salary x 15 x Years of Service / 26 under the Payment of Gratuity Act, and is tax-exempt up to Rs 20 lakh for private-sector employees under Section 10(10) of the Income Tax Act. Add your expected gratuity amount to Existing Retirement Corpus if you are within a few years of retirement.' },
  { q: 'What interest rate does EPF currently pay?', a: 'EPF currently pays 8.25% per annum, as notified by the EPFO, credited annually to your account balance. This rate is reviewed each financial year and can change, so use it as a current anchor rather than a fixed assumption for decades ahead.' },
  { q: 'How do the 2026 NPS withdrawal rules change my retirement corpus planning?', a: 'PFRDA now allows non-government NPS subscribers to withdraw up to 80% of their corpus as a lump sum, up from the earlier 60%, with only a 20% minimum required to fund an annuity. Income tax law still only exempts 60% of the withdrawal under Section 10(12A), so plan for slab-rate tax on any lump sum beyond that.' },
  { q: 'What is the Senior Citizen Savings Scheme and how does it fit my retirement plan?', a: 'The Senior Citizen Savings Scheme (SCSS) is a government-backed fixed-income option for retirees aged 60+, paying 8.2% per annum for the July-September 2026 quarter as notified by the Finance Ministry. Many retirees use it as the guaranteed, quarterly-payout debt anchor of their post-retirement portfolio.' },
  { q: 'What is the Unified Pension Scheme and does it change my required corpus?', a: 'The Unified Pension Scheme (UPS), effective 1 April 2025, is an option under NPS exclusively for existing Central Government employees, assuring 50% of the last 12 months\' average basic pay after 25 years of service, per PFRDA. It does not apply to private-sector employees, whose required corpus still depends on the savings and annuity model this calculator projects.' },
  { q: 'Is Pradhan Mantri Vaya Vandana Yojana (PMVVY) still available for new retirees?', a: 'No. PMVVY closed to new subscriptions on 31 March 2023 and has not reopened. Existing PMVVY policyholders continue receiving their guaranteed pension for the remainder of their 10-year term, but new retirees should look at SCSS or annuity plans instead for a guaranteed-income debt anchor.' },
  { q: 'What interest rate does PPF currently pay?', a: 'PPF currently pays 7.1% per annum for the July-September 2026 quarter, as notified by the Finance Ministry, a rate unchanged since April 2020. Interest, contributions, and maturity are all tax-free under PPF\'s Exempt-Exempt-Exempt (EEE) status.' },
  { q: 'What is Voluntary Provident Fund (VPF) and should I use it for retirement?', a: 'VPF lets you contribute above the mandatory 12% EPF rate into the same EPFO account, currently earning 8.25% per annum. It is a low-risk way to boost your retirement corpus, though interest on combined EPF+VPF contributions above Rs 2.5 lakh a year becomes taxable under Budget 2021 rules.' },
  { q: 'Can I claim retirement savings deductions under the new tax regime?', a: 'Mostly no. Deductions for PPF, VPF, and the extra Rs 50,000 NPS deduction under Section 80CCD(1B) are only available under the old tax regime. Only your employer\'s NPS contribution under Section 80CCD(2) remains deductible under the new regime.' },
  { q: 'Is EPF withdrawal always tax-free?', a: 'No. EPF and VPF withdrawals are tax-free only after 5 years of continuous service; withdrawing earlier makes the amount taxable at your slab rate. If you change jobs, transfer your EPF account instead of withdrawing to keep your continuous-service clock running.' },
  { q: 'What is the tax-free limit on EPF and VPF contributions for government employees?', a: 'For government employees, interest on combined EPF and VPF contributions becomes taxable above Rs 5 lakh per financial year, compared to Rs 2.5 lakh for private-sector employees with an employer contribution, under Budget 2021 rules.' },
  { q: 'Should I prioritize PPF, VPF, or NPS for retirement savings?', a: 'All three are government-backed and tax-efficient, but they differ: PPF has a fixed 15-year lock-in at 7.1%, VPF earns the EPF rate (8.25%) with more flexibility on amount, and NPS adds a market-linked equity option plus the extra Rs 50,000 deduction under Section 80CCD(1B). Many savers use a combination rather than just one.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor Retirement Corpus Calculator',
  url: CANONICAL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate how much retirement corpus you need in India, accounting for inflation, life expectancy, and post-retirement investment returns using the growing annuity formula.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  featureList: [
    'Inflation-adjusted expense projection',
    'Growing annuity formula for accurate corpus calculation',
    'Adjustable retirement age and life expectancy',
    'Post-retirement return rate customisation',
    'Monthly SIP required to reach corpus',
    'Accumulated corpus vs corpus needed gap',
  ],
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Retirement Corpus Calculator', item: CANONICAL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Retirement Corpus in India',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter current monthly expenses', text: 'Enter your current household monthly expenses. The calculator inflates these to retirement date.' },
    { '@type': 'HowToStep', position: 2, name: 'Set your current and retirement age', text: 'Enter your current age and target retirement age. The gap determines your savings horizon.' },
    { '@type': 'HowToStep', position: 3, name: 'Set life expectancy', text: 'Enter how long you expect to live. Planning for 85-90 is recommended to avoid outliving your money.' },
    { '@type': 'HowToStep', position: 4, name: 'Adjust advanced settings', text: 'Set inflation rate and post-retirement return rate in More Settings.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your required corpus', text: 'The calculator shows total corpus needed, monthly expenses at retirement, and the monthly savings gap.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Retirement Corpus',
  description: 'The total investable wealth required at retirement to fund all future living expenses for the rest of one\'s life, calculated using a growing annuity formula that accounts for inflation and post-retirement investment returns.',
  inDefinedTermSet: 'https://en.wikipedia.org/wiki/Retirement_planning',
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Retirement Corpus Calculator: How Much Do You Need to Retire in India?',
  url: CANONICAL,
  description: 'Calculate your required retirement corpus in India accounting for current expenses, inflation, life expectancy, and post-retirement returns.',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  hasPart: [
    { '@type': 'WebPageElement', name: 'Retirement Corpus Calculator', cssSelector: '#retirement-corpus-calculator' },
    { '@type': 'WebPageElement', name: 'What is retirement corpus', cssSelector: '#what-is-retirement-corpus' },
    { '@type': 'WebPageElement', name: 'How corpus is calculated', cssSelector: '#how-corpus-is-calculated' },
    { '@type': 'WebPageElement', name: 'Safe withdrawal rate India', cssSelector: '#safe-withdrawal-rate' },
    { '@type': 'WebPageElement', name: 'FIRE corpus India', cssSelector: '#fire-corpus' },
    { '@type': 'WebPageElement', name: 'NPS and retirement corpus', cssSelector: '#nps-retirement-corpus' },
    { '@type': 'WebPageElement', name: 'Retirement corpus by age table', cssSelector: '#corpus-by-age-table' },
    { '@type': 'WebPageElement', name: 'How to use this calculator', cssSelector: '#how-to-use' },
    { '@type': 'WebPageElement', name: 'Gratuity as part of retirement corpus', cssSelector: '#gratuity-in-corpus' },
    { '@type': 'WebPageElement', name: 'EPFO interest rate', cssSelector: '#epfo-rate' },
    { '@type': 'WebPageElement', name: 'Senior Citizen Savings Scheme', cssSelector: '#scss-retirement' },
    { '@type': 'WebPageElement', name: 'Unified Pension Scheme for government employees', cssSelector: '#ups-govt-employees' },
    { '@type': 'WebPageElement', name: 'PPF as a tax-free retirement anchor', cssSelector: '#ppf-anchor' },
    { '@type': 'WebPageElement', name: 'Voluntary Provident Fund tax threshold', cssSelector: '#vpf-threshold' },
    { '@type': 'WebPageElement', name: 'Old vs new tax regime and retirement savings', cssSelector: '#tax-regime-retirement' },
    { '@type': 'WebPageElement', name: 'EPF and VPF withdrawal timing', cssSelector: '#epf-withdrawal-timing' },
    { '@type': 'WebPageElement', name: 'FAQ', cssSelector: '#faq' },
  ],
};

export default async function RetirementCorpusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <RetirementCorpusCalculatorClient faqs={faqs} />
    </>
  );
}

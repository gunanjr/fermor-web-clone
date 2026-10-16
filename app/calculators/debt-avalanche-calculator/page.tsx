import type { Metadata } from 'next';
import DebtAvalancheClient from './DebtAvalancheClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-25';

export const metadata: Metadata = {
  title: 'Debt Avalanche Calculator: Payoff Plan by Highest Rate',
  description: 'Free debt avalanche calculator for India. Add your debts, see the payoff order, total interest saved, and month-by-month balance decline. Free to use.',
  keywords: [
    'debt avalanche calculator',
    'avalanche calculator',
    'avalanche method calculator',
    'avalanche debt payoff calculator',
    'avalanche debt method calculator',
    'avalanche method debt calculator',
    'avalanche payoff calculator',
    'credit card avalanche calculator',
    'debt avalanche calculator excel',
    'free debt avalanche calculator',
    'loan avalanche calculator',
    'debt avalanche method calculator india',
    'debt avalanche vs snowball calculator',
    'debt avalanche payoff plan',
    'highest interest rate debt payoff calculator',
    'multiple debt payoff calculator',
    'debt payoff calculator india',
    'credit card debt payoff calculator',
    'personal loan avalanche calculator',
    'debt reduction calculator avalanche',
    'debt elimination calculator',
    'how to pay off debt fastest calculator',
    'debt snowball vs avalanche calculator',
    'minimum payment avalanche calculator',
    'debt free calculator india',
    'debt payoff calculator',
    'debt payoff planner',
    'debt payoff strategy calculator',
    'debt reduction calculator',
    'debt repayment calculator',
    'debt repayment schedule',
    'multiple debt calculator',
    'multiple debt payoff calculator',
    'how to pay off debt',
    'how to pay off multiple debts',
    'debt payoff timeline calculator',
    'debt payoff date calculator',
    'minimum payment debt calculator',
    'monthly debt payment calculator',
    'debt free calculator',
    'how to pay off credit card debt',
    'credit card payoff calculator',
    'debt avalanche formula',
    'how does the debt avalanche method work',
    'pay highest interest debt first',
    'debt payoff strategy',
    'debt repayment strategy',
    'debt payment calculator',
    'personal debt payoff calculator',
    'debt avalanche calculator with multiple debts',
  ],
  openGraph: {
    title: 'Debt Avalanche Calculator: Payoff Plan by Highest Rate - Fermor',
    description: 'Enter your debts and see the avalanche payoff order, total interest paid, and months to debt-free. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/debt-avalanche-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-debt-avalanche-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Avalanche Calculator - Fermor',
    description: 'See your avalanche debt payoff order, total interest, and months to debt-free. Free to use.',
    images: ['https://fermor.in/og-debt-avalanche-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/debt-avalanche-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Debt Avalanche Method',
    'Debt Snowball Method',
    'Credit Card Interest India',
    'Personal Loan Repayment',
    'FOIR Calculation',
    'Account Aggregator Framework',
    'RBI Lending Guidelines',
    'Debt-to-Income Ratio',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Debt Avalanche Calculator', item: 'https://fermor.in/calculators/debt-avalanche-calculator' },
  ],
};

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  { q: 'What is the debt avalanche method?', a: 'The debt avalanche method is a repayment strategy where you pay the minimum on every debt, then direct every extra rupee toward the debt with the highest interest rate first. Once that debt is paid off, its full payment rolls onto the debt with the next-highest rate. This order minimizes the total interest paid across all debts.' },
  { q: 'Is this debt payoff calculator free to use?', a: 'Yes. This debt avalanche calculator is free, requires no sign-up, and runs entirely in the browser. Enter your debts, balances, interest rates, and minimum payments to see your full payoff schedule, updated instantly as you edit any number.' },
  { q: 'How is the debt avalanche method different from debt snowball?', a: 'Avalanche sorts debts by interest rate, highest first, which mathematically minimizes total interest paid. Snowball sorts debts by balance, smallest first, which delivers faster psychological wins by clearing accounts sooner. Avalanche saves more money. Snowball builds momentum through visible progress.' },
  { q: 'Does the avalanche method save more money than snowball?', a: 'Yes, in almost every case, though the gap varies with how spread out the rates are. On three debts totalling Rs 4.3 lakh at 36%, 14% and 9% with Rs 10,000 extra a month, avalanche saves about Rs 3,481 over snowball. On a wider rate spread, such as a 40% card against a 9% car loan, the same monthly budget saves closer to Rs 13,700.' },
  { q: 'Does avalanche also pay off debt faster than snowball?', a: 'Usually not by much. Total time to debt-free depends mainly on total balance, total minimum payments and extra budget, not the payoff order, so avalanche and snowball often finish in the same number of months. What differs is total interest paid and, separately, which single debt disappears first: snowball clears an account sooner for a psychological win, avalanche does not.' },
  { q: 'How do I calculate debt avalanche by hand?', a: 'List every debt with its balance, annual interest rate, and minimum payment. Sort the list by interest rate from highest to lowest. Pay the minimum on every debt and add all spare budget to the top debt. When that debt reaches zero, add its old payment to the next debt on the list and repeat until every balance is zero.' },
  { q: 'How does the debt avalanche method work, in plain terms?', a: 'It works by always paying highest interest debt first. Every debt gets its minimum payment so nothing defaults, and every rupee left over goes to whichever debt currently charges the most interest. That target changes automatically as debts get paid off, but the rule itself never does.' },
  { q: 'How do I pay off credit card debt fastest?', a: 'List every card by its rate, pay the minimum on all of them, and send every extra rupee to the card with the highest rate first. Since Indian card rates typically run 36% to 42%, a card almost always sits at the top of the avalanche order above any other loan type, so this is usually the fastest way to clear it.' },
  { q: 'Can I use debt avalanche for credit cards only?', a: 'Yes. Credit card avalanche works the same way: list every card by its annual percentage rate, pay minimums on all of them, and put extra money toward the card charging the highest rate, typically 36% to 42% in India. This usually produces the fastest interest savings because card rates sit far above other loan types.' },
  { q: 'Is there a debt avalanche calculator in Excel?', a: 'Excel can model debt avalanche with a month-by-month amortization table for each debt, but it requires manual formulas for re-ranking debts as balances change and rolling freed-up payments forward. This calculator does the same simulation automatically in the browser, with no spreadsheet setup required.' },
  { q: 'How many months does it take to pay off debt with avalanche?', a: 'It depends on total balances, interest rates, minimum payments, and how much extra you add each month. On Rs 4.3 lakh across three debts (36%, 14% and 9%) with Rs 10,000 extra a month, the calculator\'s own simulation clears every balance in 24 months; the exact figure for your numbers shows the moment you enter them.' },
  { q: 'What if my minimum payment does not cover the interest?', a: 'The balance grows every month instead of shrinking, and that debt is never paid off at that payment level. For example, a Rs 1 lakh balance at 42% charges about Rs 3,500 of interest a month; a Rs 2,000 minimum payment cannot even cover that, let alone reduce the balance. The calculator flags any debt in this state so you know it needs a higher minimum payment or immediate extra budget.' },
  { q: 'Should I use debt avalanche or debt snowball?', a: 'Choose avalanche if minimizing total interest paid matters most to you and you can stay disciplined without frequent milestones. Choose snowball if you have struggled to stick with a payoff plan before and need the motivation of clearing smaller accounts quickly, even at a higher total interest cost.' },
  { q: 'Does paying extra always go to the highest-rate debt?', a: 'Under the pure avalanche method, yes. Every rupee above the combined minimum payments goes to the debt with the current highest interest rate. As soon as that debt is fully paid, the freed-up amount, including its old minimum, redirects to the next highest-rate debt still outstanding.' },
  { q: 'What is a good debt free calculator for multiple debts?', a: 'A useful debt free calculator should simulate every debt month by month, not just estimate an average payoff date, since minimum payments and rates differ per account. This calculator runs that full simulation for up to six debts at once and shows the exact month each one clears.' },
  { q: 'How do I pay off multiple debts at once?', a: 'Pay the minimum on every debt so none of them default, then send every rupee of spare budget to one target debt at a time, chosen either by highest rate (avalanche) or smallest balance (snowball). Paying a little extra toward several debts at once, instead of concentrating it on one, is slower and costs more in total interest.' },
  { q: 'What is a debt payoff timeline calculator?', a: 'A debt payoff timeline calculator shows the specific month each debt reaches zero and the total time to become fully debt-free, not just a single combined estimate. This calculator lists the payoff month for every debt individually, in the order avalanche clears them, plus a chart of the balance left on each debt over time.' },
  { q: 'Can I use this as a debt consolidation comparison tool?', a: 'This calculator models paying debts in their current form. To compare that against consolidating everything into one lower-rate loan, use the dedicated Debt Consolidation Calculator, which is built specifically for that comparison, then come back here to see the avalanche order on your existing debts as the alternative.' },
  { q: 'Does the debt avalanche method work for a home loan too?', a: 'Yes, a home loan can be included as one of the debts if you are weighing it against credit cards or personal loans. In practice, home loans sit at the bottom of most avalanche orders since mortgage rates are far lower than unsecured debt, so they are usually the last debt paid down.' },
  { q: 'How much interest can I save by increasing my extra payment?', a: 'Extra payment has a large, non-linear effect. On Rs 4.3 lakh across three debts at 36%, 14% and 9%, moving from Rs 5,000 to Rs 10,000 extra a month cuts total interest from about Rs 88,347 to Rs 62,488, and moving to Rs 20,000 cuts it further to about Rs 40,064, roughly halving the payoff time along the way.' },
  { q: 'Is debt avalanche worth it for a small interest rate gap?', a: 'The savings are real but modest when rates are close together. Avalanche and snowball are functionally similar once every debt sits within a few percentage points of the others; the method matters far more when at least one debt, typically a credit card, charges a much higher rate than the rest.' },
  { q: 'Can I switch from snowball to avalanche partway through?', a: 'Yes. Re-enter your current balances, rates and minimum payments as they stand today and the calculator recalculates the avalanche order from that point forward. Switching methods partway does not undo progress already made; it only changes which debt gets the extra money going forward.' },
  { q: 'Does this calculator account for credit card minimum payment rules?', a: 'No. Many Indian credit card minimum payments are set as a percentage of the outstanding balance rather than a fixed rupee amount, so the true minimum falls as the balance falls. Enter your card\'s current minimum payment as a fixed number for this simulation; if your card\'s minimum drops over time, actual results will differ slightly from what is shown here.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Debt Avalanche Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/debt-avalanche-calculator',
  description: 'Calculate your debt avalanche payoff plan by entering multiple debts with balances, interest rates, and minimum payments. Shows payoff order, total interest, total months to debt-free, and a per-debt balance chart.',
  featureList: ['Dynamic multi-debt input list', 'Highest-rate-first payoff simulation', 'Per-debt payoff breakdown table', 'Total interest and total months to debt-free', 'Stacked per-debt balance chart (monthly, quarterly or yearly)', 'Principal vs interest donut chart', 'Multi-currency support (INR, USD, EUR, GBP)', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Your Debt Avalanche Payoff Plan', totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Debt Avalanche Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'List every debt', text: 'Add each debt with its name, outstanding balance, annual interest rate, and current minimum monthly payment.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your extra monthly budget', text: 'Add the extra amount you can put toward debt every month beyond the combined minimums.' },
    { '@type': 'HowToStep', position: 3, name: 'Let the calculator sort by rate', text: 'The calculator automatically ranks your debts from highest interest rate to lowest, the order avalanche follows.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the payoff order and totals', text: 'See which debt clears first, total months to debt-free, total interest paid, and total amount paid across the whole plan.' },
    { '@type': 'HowToStep', position: 5, name: 'Open the payoff schedule', text: 'Expand Payoff Schedule to see the balance left on each debt over time, the per-debt table of months and interest paid, and the balance at the end of each plan year.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Debt Avalanche Method', alternateName: 'Avalanche Debt Payoff Method',
  description: 'A debt repayment strategy that directs all extra available payment toward the debt with the highest interest rate first, while paying minimums on every other debt, in order to minimize total interest paid.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Debt_snowball_method', 'https://www.wikidata.org/wiki/Q5248580'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Debt Avalanche Calculator: Payoff Plan by Highest Rate',
  url: 'https://fermor.in/calculators/debt-avalanche-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Debt Avalanche Method', alternateName: 'Avalanche Debt Payoff Method' }],
  audience: { '@type': 'Audience', audienceType: 'Indian borrowers, credit card holders, personal loan holders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-avalanche', name: 'What Is the Debt Avalanche Method' },
    { '@type': 'WebPageElement', cssSelector: '#how-avalanche-works', name: 'How the Debt Avalanche Method Works' },
    { '@type': 'WebPageElement', cssSelector: '#avalanche-formula', name: 'Debt Avalanche Formula and Simulation' },
    { '@type': 'WebPageElement', cssSelector: '#avalanche-vs-snowball', name: 'Debt Avalanche vs Debt Snowball' },
    { '@type': 'WebPageElement', cssSelector: '#who-should-use', name: 'Who Should Use Avalanche vs Snowball' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-avalanche', name: 'Credit Card Avalanche Method' },
    { '@type': 'WebPageElement', cssSelector: '#extra-payment-impact', name: 'How Extra Payment Changes Your Payoff' },
    { '@type': 'WebPageElement', cssSelector: '#minimum-payment-trap', name: 'The Minimum Payment Trap' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Avalanche Method Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#excel-vs-calculator', name: 'Debt Avalanche Calculator vs Excel' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DebtAvalanchePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DebtAvalancheClient faqs={faqItems} />
    </>
  );
}

import type { Metadata } from 'next';
import DebtSnowballClient from './DebtSnowballClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: 'Debt Snowball Calculator: Payoff Plan for Multiple Debts',
  description: 'Free debt snowball calculator for India. Add multiple debts, see your payoff order, debt-free date, schedule and interest vs avalanche. Free to use.',
  keywords: [
    'debt snowball calculator',
    'debt snowball method calculator',
    'debt snowball payoff calculator',
    'debt snowball calculator with multiple debts',
    'debt snowball payment calculator',
    'debt snowball method',
    'debt snowball plan',
    'debt snowball payoff plan',
    'debt snowball strategy',
    'debt snowball formula',
    'how does the debt snowball method work',
    'pay smallest debt first',
    'debt snowball vs avalanche',
    'debt snowball vs avalanche calculator',
    'debt payoff calculator',
    'debt payoff strategy calculator',
    'debt payoff planner',
    'debt payoff planner calculator',
    'debt payoff date calculator',
    'debt payoff time calculator',
    'debt repayment calculator',
    'debt repayment plan calculator',
    'debt repayment schedule',
    'debt repayment strategy',
    'debt payoff strategy',
    'multiple debt payoff calculator',
    'multiple debt calculator',
    'how to pay off multiple debts',
    'how to pay off debt',
    'debt free calculator',
    'debt reduction calculator',
    'debt elimination calculator',
    'debt payment calculator',
    'monthly debt payment calculator',
    'extra debt payment calculator',
    'debt interest calculator',
    'loan debt payoff calculator',
    'credit card debt payoff calculator',
    'credit card payoff calculator',
    'credit card debt interest calculator',
    'how to pay off credit card debt',
    'debt snowball spreadsheet',
    'debt snowball calculator india',
  ],
  openGraph: {
    title: 'Debt Snowball Calculator: Payoff Plan for Multiple Debts - Fermor',
    description: 'Add your debts and see the snowball payoff order, debt-free date, repayment schedule and interest compared with avalanche. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/debt-snowball-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-debt-snowball-calculator.png', width: 1200, height: 630, alt: 'Fermor Debt Snowball Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Snowball Calculator - Fermor',
    description: 'See your snowball payoff order, debt-free date and interest compared with avalanche. Free to use.',
    images: ['https://fermor.in/og-debt-snowball-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/debt-snowball-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Debt Snowball Method',
    'Debt Avalanche Method',
    'Credit Card Debt India',
    'Personal Loan Repayment',
    'Loan Prepayment Rules',
    'CIBIL Score',
    'RBI Credit Card Directions',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Debt Snowball Calculator', item: 'https://fermor.in/calculators/debt-snowball-calculator' },
  ],
};

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  { q: 'What is the debt snowball method?', a: 'The debt snowball method is a repayment plan where you pay the minimum on every debt and put all spare money on the smallest balance first. When that debt is cleared, its payment rolls onto the next smallest balance, so the amount attacking each debt keeps growing until everything is paid off.' },
  { q: 'How does the debt snowball method work?', a: 'List your debts from smallest balance to largest, pay every minimum, and send all extra money to the smallest one. When it clears, add its full payment to the next debt. Your total monthly payment stays the same throughout, but more of it goes to one target debt after each payoff.' },
  { q: 'How does this debt snowball calculator work?', a: 'It runs a month-by-month simulation of up to six debts. Each month it adds interest to every balance, pays every minimum, then sends the rest of your fixed monthly budget to the smallest open balance. It reports the payoff order, the month each debt clears, your debt-free date and total interest.' },
  { q: 'What is the debt snowball formula?', a: 'There is no single closed-form formula because the target debt changes after each payoff. Each month: monthly budget equals all minimums plus extra; interest equals balance times annual rate divided by 12 and by 100; and the snowball pool, which is the budget minus minimums paid, goes to the smallest open balance.' },
  { q: 'Debt snowball vs avalanche: which is better?', a: 'Avalanche always costs the same or less in interest. Snowball clears its first account sooner, which helps many people stick with the plan. On this page\'s default debts the gap is only Rs 542. With a Rs 2 lakh card at 40% behind two small loans, snowball costs about Rs 19,789 more.' },
  { q: 'Does the debt snowball pay off debt faster than avalanche?', a: 'Not usually in total months. With the same monthly budget, both methods tend to finish within a month of each other. What differs is total interest and which debt disappears first. In one simulated example, snowball cleared its first debt in month 5 while avalanche took until month 15.' },
  { q: 'Why pay the smallest debt first?', a: 'Paying the smallest debt first closes whole accounts quickly, and that visible progress keeps people going. A 2012 study by Gal and McShane in the Journal of Marketing Research found that closing individual debt accounts predicted eliminating debt overall, regardless of the size of the balances closed.' },
  { q: 'How much extra should I pay toward debt each month?', a: 'As much as your budget can sustain every month without new borrowing. On the default Rs 5.95 lakh of debt, rolling minimums alone takes 37 months, Rs 5,000 extra takes 28 months, and Rs 10,000 extra takes 23 months. Treat the extra amount as a fixed bill, not a leftover.' },
  { q: 'How do I calculate my debt payoff date?', a: 'Count the months your snowball plan needs to clear the last balance and add them to the current month. The calculator does this automatically and shows the debt-free month and year, plus the month each individual debt is cleared.' },
  { q: 'How do I pay off credit card debt with the snowball method?', a: 'List every card by outstanding balance, pay each card\'s minimum amount due, and send all extra money to the smallest balance. Stop new spending on the cards while you do it. With three cards totalling Rs 1.95 lakh, Rs 5,000 extra a month cut payoff from 35 months to 18 in the calculator\'s simulation.' },
  { q: 'Can I use this as a credit card payoff calculator?', a: 'Yes. Enter each card as a separate debt with its balance, annual rate and current minimum amount due. Note that a real card\'s minimum usually falls as the balance falls, while this calculator keeps the amount you enter fixed, so treat card results as a close estimate.' },
  { q: 'How do I pay off multiple debts at once?', a: 'Pay the minimum on every debt so none go overdue, then concentrate every spare rupee on one target at a time: the smallest balance for snowball or the highest rate for avalanche. Spreading extra money thinly across all debts delays every payoff.' },
  { q: 'What happens when a debt is paid off in the snowball method?', a: 'Its entire payment, the old minimum plus any extra that was going to it, moves to the next smallest debt. If a debt clears partway through a month, the leftover money goes to the next debt that same month. This is the snowball effect.' },
  { q: 'What if my minimum payment does not cover the interest?', a: 'That balance grows each month until the snowball reaches it. The calculator flags any debt where the minimum is at or below the monthly interest. For credit cards, RBI rules require the minimum amount due to be set so it does not cause negative amortization.' },
  { q: 'Should I include my home loan in the debt snowball?', a: 'Usually not. Dave Ramsey\'s version of the plan covers all debt except the house. A home loan has a long tenure and a lower rate, and in the old tax regime its interest can qualify for a Section 24(b) deduction. Clear consumer debt first, then decide on home loan prepayment.' },
  { q: 'Are there prepayment charges if I pay loans off early?', a: 'Under the RBI Pre-payment Charges on Loans Directions, 2025, lenders cannot charge prepayment fees on floating-rate loans to individuals for non-business purposes sanctioned or renewed on or after 1 January 2026. Fixed-rate loans may carry charges, so check your Key Facts Statement.' },
  { q: 'Should I build an emergency fund before starting the debt snowball?', a: 'A small starter buffer is sensible. Without one, a single repair or medical bill tends to go back on a card, undoing months of progress. Keep a modest cash reserve, run the snowball, then build the full emergency fund once high-interest debt is gone.' },
  { q: 'Does the debt snowball hurt my CIBIL score?', a: 'It generally helps. Paying every minimum on time protects your payment history, and paying down cards lowers credit utilization. Closing a paid-off card removes its limit and can raise utilization on remaining cards, so keeping an old fee-free card open is often better.' },
  { q: 'Is there a free debt snowball spreadsheet I can use instead?', a: 'You can build one in Excel or Google Sheets with a block of columns per debt: opening balance, interest, minimum paid, snowball payment and closing balance. The tricky part is passing leftover money to the next debt the month a target clears. This calculator handles that automatically.' },
  { q: 'Is debt consolidation better than the debt snowball?', a: 'It depends on the rate you can get. Consolidation replaces several debts with one loan, which helps only if the new rate and fees are lower than what you pay now. The snowball keeps your existing debts. The Debt Consolidation Calculator compares the two options directly.' },
  { q: 'How long does the debt snowball method take?', a: 'It depends on total debt, rates and your monthly budget. The default example here, Rs 5.95 lakh across a card, a bike loan, a personal loan and a car loan with Rs 24,550 a month, is debt-free in 28 months with Rs 85,452 in total interest.' },
  { q: 'Can I switch from snowball to avalanche partway through?', a: 'Yes. Re-enter your current balances, rates and minimums and follow the new order from that month. Progress already made is not lost. Many people clear one or two small debts with the snowball for momentum, then switch to avalanche for the large high-rate balances.' },
  { q: 'Who created the debt snowball method?', a: 'The term was popularized by American personal finance author Dave Ramsey through his books and radio show, where it forms the debt step of his plan. The practice of ordering debts and redirecting freed payments existed before he named it.' },
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
  name: 'Debt Snowball Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/debt-snowball-calculator',
  description: 'Plan a debt snowball payoff for up to six debts. Enter balances, interest rates, minimum payments and an extra monthly amount to see the payoff order, debt-free date, total interest, a year-by-year repayment schedule and a comparison with the avalanche method and minimum payments.',
  featureList: [
    'Up to 6 debts with balance, rate and minimum payment',
    'Smallest-balance-first month-by-month simulation with same-month rollover',
    'Debt-free date and payoff month for every debt',
    'Snowball vs avalanche vs minimums-only comparison',
    'Interest and time saved against paying minimums only',
    'Stacked per-debt balance chart',
    'Year-by-year repayment schedule and per-debt breakdown',
    'Principal vs interest donut chart',
    'Flags minimum payments that do not cover interest',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the Debt Snowball Calculator', totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Debt Snowball Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Add your debts', text: 'Enter a name, outstanding balance, annual interest rate and minimum payment or EMI for each debt, up to six.' },
    { '@type': 'HowToStep', position: 2, name: 'Set your extra payment', text: 'Open More settings and choose how much you can pay above the combined minimums each month.' },
    { '@type': 'HowToStep', position: 3, name: 'Read your payoff plan', text: 'See the debt-free date, total interest, the order debts clear and the month each one closes.' },
    { '@type': 'HowToStep', position: 4, name: 'Compare methods', text: 'Check the interest and time saved against paying minimums only, and the interest gap against the avalanche method.' },
    { '@type': 'HowToStep', position: 5, name: 'Open the schedule', text: 'Expand Debt Repayment Schedule for the balance chart, the method comparison and the year-by-year table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Debt Snowball Method', alternateName: 'Debt Snowball',
  description: 'A debt repayment strategy that pays the minimum on every debt and directs all extra money to the smallest balance first. Each cleared debt\'s payment rolls onto the next smallest balance until every debt is paid off.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Debt_snowball_method', 'https://www.wikidata.org/wiki/Q5248580'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Debt Snowball Calculator: Payoff Plan for Multiple Debts',
  url: 'https://fermor.in/calculators/debt-snowball-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Debt Snowball Method', alternateName: 'Debt Snowball' }],
  audience: { '@type': 'Audience', audienceType: 'Indian borrowers with multiple debts, credit card holders, personal loan holders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-debt-snowball', name: 'What Is the Debt Snowball Method' },
    { '@type': 'WebPageElement', cssSelector: '#how-snowball-works', name: 'How Does the Debt Snowball Method Work' },
    { '@type': 'WebPageElement', cssSelector: '#snowball-formula', name: 'Debt Snowball Formula and Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: A Debt Snowball Payoff Plan' },
    { '@type': 'WebPageElement', cssSelector: '#snowball-vs-avalanche', name: 'Debt Snowball vs Avalanche: Which Saves More' },
    { '@type': 'WebPageElement', cssSelector: '#does-snowball-work', name: 'Does the Debt Snowball Actually Work' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-pay-off-debt', name: 'How to Pay Off Debt: A 7-Step Snowball Plan' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-snowball', name: 'How to Pay Off Credit Card Debt with the Snowball' },
    { '@type': 'WebPageElement', cssSelector: '#extra-payment-impact', name: 'How Extra Payment Changes Your Debt-Free Date' },
    { '@type': 'WebPageElement', cssSelector: '#debts-to-include', name: 'Which Debts Should Go in Your Snowball' },
    { '@type': 'WebPageElement', cssSelector: '#snowball-excel', name: 'Debt Snowball in Excel or Google Sheets' },
    { '@type': 'WebPageElement', cssSelector: '#credit-score-impact', name: 'Does the Debt Snowball Affect Your CIBIL Score' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Debt Snowball Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Debt Snowball Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DebtSnowballCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DebtSnowballClient faqs={faqItems} />
    </>
  );
}

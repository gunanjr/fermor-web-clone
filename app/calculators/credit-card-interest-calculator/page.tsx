import type { Metadata } from 'next';
import CreditCardInterestClient from './CreditCardInterestClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: 'Credit Card Interest Calculator: Interest, GST and Payoff',
  description: 'Free credit card interest calculator for India. See monthly and daily interest with GST, the minimum due trap and the payment that clears your card.',
  keywords: [
    'credit card interest calculator',
    'credit card interest rate calculator',
    'credit card payoff calculator',
    'credit card minimum payment calculator',
    'credit card debt payoff calculator',
    'how to calculate credit card interest',
    'credit card apr calculator',
    'credit card apr interest calculator',
    'credit card interest and payment calculator',
    'credit card balance interest calculator',
    'credit card balance calculator',
    'credit card payment calculator',
    'credit card monthly payment calculator',
    'credit card finance charge calculator',
    'credit card interest charge calculator',
    'credit card interest cost calculator',
    'credit card debt interest calculator',
    'credit card debt calculator',
    'credit card debt repayment calculator',
    'credit card interest repayment calculator',
    'credit card interest formula',
    'credit card interest calculation formula',
    'how credit card interest works',
    'credit card daily interest calculator',
    'credit card daily interest rate calculator',
    'credit card average daily balance calculator',
    'average daily balance calculator',
    'credit card monthly interest calculator',
    'credit card annual interest calculator',
    'credit card interest per month calculator',
    'credit card interest per day calculator',
    'interest on credit card balance',
    'credit card payoff date calculator',
    'how much interest will i pay on my credit card',
    'how much interest does a credit card charge',
    'credit card interest savings calculator',
    'credit card payment interest calculator',
    'credit card payoff interest calculator',
    'credit card interest calculator with payments',
    'gst on credit card interest',
    'credit card interest calculator india',
  ],
  openGraph: {
    title: 'Credit Card Interest Calculator: Interest, GST and Payoff - Fermor',
    description: 'See the interest and GST on your credit card balance, how long the minimum due takes, and the payment that clears it by your date. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/credit-card-interest-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-credit-card-interest-calculator.png', width: 1200, height: 630, alt: 'Fermor Credit Card Interest Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Interest Calculator - Fermor',
    description: 'Interest and GST on your card balance, the minimum due trap, and the payment that clears it. Free to use.',
    images: ['https://fermor.in/og-credit-card-interest-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/credit-card-interest-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Credit Card Interest',
    'Revolving Credit',
    'Minimum Amount Due',
    'GST on Financial Services',
    'RBI Credit Card Directions',
    'Annual Percentage Rate',
    'Credit Card Debt India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Credit Card Interest Calculator', item: 'https://fermor.in/calculators/credit-card-interest-calculator' },
  ],
};

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  { q: 'How is credit card interest calculated in India?', a: 'Interest is charged on the balance you carry past the due date at your card\'s monthly rate, accrued daily and billed once a month. 18% GST is added on the interest. On a Rs 1,00,000 balance at 3.5% a month, that is Rs 3,500 of interest plus Rs 630 of GST.' },
  { q: 'What is the credit card interest formula?', a: 'Monthly interest = balance × monthly rate. GST = monthly interest × 18%. For a daily figure, daily rate = monthly rate × 12 ÷ 365, and interest per day = balance × daily rate. APR = monthly rate × 12.' },
  { q: 'How do I calculate credit card interest per month?', a: 'Multiply the balance you carry by the monthly rate on your statement, then add 18% GST. Rs 50,000 at 3.5% a month is Rs 1,750 of interest and Rs 2,065 with GST.' },
  { q: 'How do I calculate credit card interest per day?', a: 'Convert the monthly rate to a daily one by multiplying by 12 and dividing by 365. At 3.5% a month the daily rate is about 0.115%, so Rs 1,00,000 costs about Rs 115 a day, or about Rs 136 with GST.' },
  { q: 'What is the average daily balance method?', a: 'It adds your balance on each day of the billing cycle and divides by the number of days. Ten days at Rs 50,000, ten at Rs 30,000 and ten at Rs 40,000 give an average of Rs 40,000, which at 3.5% a month is about Rs 1,381 of interest for a 30-day cycle.' },
  { q: 'What is the credit card interest rate in India?', a: 'Most Indian cards charge about 2.5% to 3.75% a month on balances carried forward, roughly 30% to 45% a year. The exact rate is in your card\'s Most Important Terms and Conditions (MITC) and on your statement.' },
  { q: 'What is the difference between monthly rate, APR and effective annual rate?', a: 'APR is the monthly rate times 12, so 3.5% a month is 42%. The effective annual rate adds compounding: (1.035)^12 minus 1 is 51.1%. With 18% GST on interest, the effective annual cost rises to 62.5%.' },
  { q: 'Is GST charged on credit card interest?', a: 'Yes. Interest and other card charges attract 18% GST, shown as a separate line on your statement. GST applies to the interest, not to the balance or your purchases.' },
  { q: 'How much interest will I pay on my credit card?', a: 'It depends on the balance, rate and how fast you repay. Rs 1,00,000 at 3.5% a month with GST costs Rs 28,829 in interest and GST if cleared in 12 months, but Rs 3,72,861 if you pay only a 5% minimum due.' },
  { q: 'Does paying the minimum amount due avoid interest?', a: 'No. The minimum due keeps your account current and avoids a late fee, but interest and GST still apply to everything you leave unpaid. The only way to pay no interest on purchases is to clear the full statement balance by the due date.' },
  { q: 'How is the minimum amount due calculated?', a: 'It varies by issuer. Some set it at a share of the total due, often 5%, with a floor of about Rs 200. Others, such as SBI Card, charge all interest, GST and fees plus 2% of the remaining balance. Your statement and MITC show the rule for your card.' },
  { q: 'How long does it take to pay off a credit card with minimum payments?', a: 'Often decades. Rs 1,00,000 at 3.5% a month with GST takes 28 years 5 months on a 5% minimum, and 16 years 6 months on an interest-plus-2% minimum, assuming no new spending.' },
  { q: 'How much should I pay to clear my credit card in 12 months?', a: 'For Rs 1,00,000 at 3.5% a month with GST, a fixed Rs 10,736 a month clears it in 12 months with Rs 28,829 of interest and GST. Choose Pay by date in the calculator for your own balance and timeline.' },
  { q: 'Do I lose the interest-free period if I pay only part of the bill?', a: 'Usually, yes. The interest-free period applies only when you pay the full statement balance. Leave any amount unpaid and most issuers charge interest from the transaction date, including on new purchases, until the balance is cleared.' },
  { q: 'Is interest on cash withdrawals different?', a: 'Yes. Cash taken out on a credit card has no interest-free period, so interest starts on the day of withdrawal. Most issuers also charge a cash advance fee, with GST on that fee. Your MITC lists the rate and fee.' },
  { q: 'What happens if I pay my credit card bill late?', a: 'Under RBI rules, a late fee applies and the account is reported past due only if payment is more than three days late. Late charges apply to the amount still outstanding after the due date, and interest continues on any unpaid balance.' },
  { q: 'Can a bank charge interest on unpaid fees and GST?', a: 'No. The RBI Credit Card and Debit Card Directions, 2022 bar issuers from capitalising unpaid charges, levies and taxes to charge or compound interest on them.' },
  { q: 'Is EMI conversion cheaper than paying card interest?', a: 'Often, because the EMI rate is usually lower than the card\'s revolving rate. Add the processing fee and GST before deciding, and note that the converted amount usually stays blocked against your card limit until repaid.' },
  { q: 'Does a balance transfer reduce credit card interest?', a: 'It can, if the new rate and any transfer fee cost less than the interest you would otherwise pay. Compare the total cost over the months you expect to take to repay.' },
  { q: 'What is a credit card finance charge?', a: 'A finance charge is the interest your issuer adds for carrying a balance past the due date. On Indian statements it usually appears as finance charges or interest, followed by a separate GST line.' },
  { q: 'Does credit card interest affect my CIBIL score?', a: 'Interest itself is not reported, but what causes it can be. A large revolving balance raises your credit utilization, and a missed payment is reported as past due. Both can weigh on your score.' },
  { q: 'Can I switch from paying the minimum to a fixed payment?', a: 'Yes. Keeping a fixed payment, even one only slightly above your first minimum, clears the balance far faster. On Rs 1,00,000 at 3.5% with GST, Rs 5,384 a month clears it in 36 months, against 28 years on a 5% minimum.' },
  { q: 'What is revolving credit?', a: 'Revolving credit lets you borrow up to a limit, repay any amount above the minimum, and borrow again. A credit card is the most common example. Whatever you do not repay rolls into the next month with interest.' },
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
  name: 'Credit Card Interest Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/credit-card-interest-calculator',
  description: 'Calculate credit card interest and 18% GST on a balance, month by month. Compare paying the minimum due, a fixed monthly payment, or the payment that clears the card by a chosen date, with total interest, total paid and a payoff schedule.',
  featureList: [
    'Interest and GST this month, per day and as an APR',
    'Three repayment plans: minimum due, fixed payment, pay off by date',
    'Two minimum due rules: % of total due, or interest plus % of balance',
    'Optional 18% GST on interest',
    'Required monthly payment for a chosen payoff date',
    'Payment plans compared: minimum due vs 12, 24 and 36 months',
    'Month-by-month or year-by-year payoff schedule',
    'Stacked bar chart of balance repaid vs interest',
    'Flags payments that do not cover monthly charges',
    'Balance vs interest donut chart',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Credit Card Interest', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Credit Card Interest Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your balance and rate', text: 'Use the outstanding balance and the monthly interest rate from your statement.' },
    { '@type': 'HowToStep', position: 2, name: 'Read this month\'s charges', text: 'The box under the rate shows interest with GST for this month, per day and as an APR.' },
    { '@type': 'HowToStep', position: 3, name: 'Pick a repayment plan', text: 'Choose minimum due, a fixed monthly payment, or a payoff date in months.' },
    { '@type': 'HowToStep', position: 4, name: 'Match your card\'s rules', text: 'Open More settings to set how your minimum due works and whether GST is included.' },
    { '@type': 'HowToStep', position: 5, name: 'Open the Payoff Schedule', text: 'Compare plans side by side and see where each payment goes.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Credit Card Interest', alternateName: ['Credit Card Finance Charge', 'Revolving Credit Interest'],
  description: 'The charge a card issuer adds on any balance not paid in full by the due date, quoted as a monthly rate and accrued daily on the outstanding balance. In India, 18% GST applies on the interest.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Credit_card_interest', 'https://www.wikidata.org/wiki/Q5183765'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Credit Card Interest Calculator: Interest, GST and Payoff',
  url: 'https://fermor.in/calculators/credit-card-interest-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Credit Card Interest', alternateName: 'Credit Card Finance Charge' }],
  audience: { '@type': 'Audience', audienceType: 'Indian credit card holders carrying a balance', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-credit-card-interest', name: 'What Is Credit Card Interest' },
    { '@type': 'WebPageElement', cssSelector: '#how-credit-card-interest-works', name: 'How Credit Card Interest Works in India' },
    { '@type': 'WebPageElement', cssSelector: '#interest-formula', name: 'Credit Card Interest Formula: How to Calculate It' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: Interest on a Rs 1 Lakh Balance' },
    { '@type': 'WebPageElement', cssSelector: '#average-daily-balance', name: 'Average Daily Balance Method, Step by Step' },
    { '@type': 'WebPageElement', cssSelector: '#apr-vs-monthly-rate', name: 'Monthly Rate vs APR vs Effective Annual Rate' },
    { '@type': 'WebPageElement', cssSelector: '#interest-by-balance', name: 'How Much Interest Will You Pay on Your Balance' },
    { '@type': 'WebPageElement', cssSelector: '#minimum-payment-trap', name: 'The Minimum Payment Trap' },
    { '@type': 'WebPageElement', cssSelector: '#payoff-plans', name: 'How Much Should You Pay to Clear Your Card' },
    { '@type': 'WebPageElement', cssSelector: '#interest-vs-emi', name: 'Card Interest vs EMI Conversion vs a Personal Loan' },
    { '@type': 'WebPageElement', cssSelector: '#cash-withdrawals', name: 'Cash Withdrawals on a Credit Card' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-rules', name: 'RBI Rules on Card Interest, Minimum Due and Late Fees' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-interest', name: 'How to Reduce Credit Card Interest' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Credit Card Interest Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Credit Card Interest Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CreditCardInterestCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CreditCardInterestClient faqs={faqItems} />
    </>
  );
}

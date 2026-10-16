import type { Metadata } from 'next';
import CreditUtilizationClient from './CreditUtilizationClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: 'Credit Utilization Calculator: Card Utilization Ratio',
  description: 'Free credit utilization calculator for India. See your card utilization ratio per card and overall, what to pay down and the limit you need. Free to use.',
  keywords: [
    'credit utilization calculator',
    'credit utilization ratio calculator',
    'credit card utilization calculator',
    'credit card utilization ratio calculator',
    'credit utilization ratio',
    'credit card utilization',
    'credit card utilization ratio',
    'credit utilization percentage calculator',
    'credit card utilization percentage calculator',
    'credit utilization rate calculator',
    'credit card utilization rate calculator',
    'credit utilization percentage',
    'credit card utilization percentage',
    'total credit utilization calculator',
    'credit utilization calculator by card',
    '30 percent credit utilization calculator',
    'credit utilization formula',
    'credit utilization ratio formula',
    'how to calculate credit utilization',
    'how is credit utilization calculated',
    'how to calculate credit card utilization',
    'credit utilization example',
    'credit utilization and credit score',
    'credit card utilization and credit score',
    'credit card limit calculator',
    'credit card balance calculator',
    'available credit calculator',
    'credit usage calculator',
    'credit card usage calculator',
    'credit card usage ratio',
    'credit utilisation calculator',
    'credit utilization cibil score',
    'good credit utilization ratio',
  ],
  openGraph: {
    title: 'Credit Utilization Calculator: Card Utilization Ratio - Fermor',
    description: 'Add your credit cards to see your utilization ratio per card and overall, what to pay down to reach 30%, and the credit limit you need. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/credit-utilization-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-credit-utilization-calculator.png', width: 1200, height: 630, alt: 'Fermor Credit Utilization Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Utilization Calculator - Fermor',
    description: 'See your credit card utilization ratio per card and overall, and what to pay down to reach 30%. Free to use.',
    images: ['https://fermor.in/og-credit-utilization-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/credit-utilization-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Credit Utilization Ratio',
    'CIBIL Score',
    'Credit Card Limits',
    'Credit Information Reporting in India',
    'RBI Credit Card Directions',
    'Debt-to-Income Ratio',
    'Credit Card Debt India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Credit Utilization Calculator', item: 'https://fermor.in/calculators/credit-utilization-calculator' },
  ],
};

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  { q: 'What is credit utilization ratio?', a: 'Credit utilization ratio is the share of your credit card limit that you are using, shown as a percentage. It is measured for each card and across all your cards. If you owe Rs 30,000 on a card with a Rs 1,00,000 limit, your credit card utilization is 30%.' },
  { q: 'How do you calculate credit utilization?', a: 'Add up the outstanding balances on all your cards, add up their credit limits, divide the total balance by the total limit and multiply by 100. For one card, divide its balance by its own limit. Rs 1,30,000 owed across cards with Rs 3,40,000 of limits gives 38.2%.' },
  { q: 'What is the credit utilization formula?', a: 'Credit utilization ratio = total outstanding balance ÷ total credit limit × 100. The same formula works card by card. To find what to pay down to reach a target, use total balance minus target % × total limit.' },
  { q: 'How is credit utilization calculated across multiple cards?', a: 'Add all balances and all limits first, then divide. Do not average each card\'s percentage, because that ignores how large each limit is. On this calculator\'s default cards, the correct overall figure is 38.2% while a simple average of the card percentages would be 47.8%.' },
  { q: 'What is a good credit utilization ratio?', a: 'Under 30% is widely treated as good and under 10% as excellent. These are common guidelines rather than official bureau bands. For the strongest position, keep both your overall ratio and every individual card under your target.' },
  { q: 'What is the 30 percent credit utilization rule?', a: 'It means keeping what you owe under 30% of your credit limit, on each card and overall. On a Rs 1,00,000 limit that is a balance of Rs 30,000 or less. It is a lending guideline, not an RBI regulation.' },
  { q: 'How does credit utilization affect my CIBIL score?', a: 'A high ratio signals a rising debt burden and can pull your CIBIL score down, while a low ratio supports it. Bureaus do not publish exact weights, and utilization is weighed alongside payment history, account age, credit mix and recent applications.' },
  { q: 'Does utilization matter if I pay my card in full every month?', a: 'It can. The balance a lender reports may be captured before your payment arrives, so a large statement balance can show up as high utilization even if you never pay interest. Paying big purchases before the statement date keeps the reported figure lower.' },
  { q: 'How often is credit utilization reported to credit bureaus in India?', a: 'Since 1 July 2026, RBI\'s amended credit information reporting rules require lenders to send a full file as on the last day of each month plus changed accounts as on the 9th, 16th and 23rd. Before that, reporting was fortnightly from January 2025 and monthly before 2025.' },
  { q: 'Should I pay my credit card before the statement date?', a: 'If you want lower reported utilization, yes. Paying a large purchase before the statement is generated means a smaller balance is on record. Paying only by the due date avoids interest but may leave the higher statement balance on your report for that cycle.' },
  { q: 'How much credit card limit do I need?', a: 'Divide your usual balance by your target ratio. To keep a Rs 30,000 balance at 30% you need a Rs 1,00,000 limit, and for 10% you need Rs 3,00,000. The calculator shows the extra limit your cards need for any target from 5% to 50%.' },
  { q: 'Does a credit limit increase lower my utilization?', a: 'Yes, if your spending stays the same. A Rs 40,000 balance is 40% of a Rs 1,00,000 limit but 26.7% of a Rs 1,50,000 limit. If the extra room leads to extra spending, the ratio climbs back up.' },
  { q: 'Does closing a credit card increase my utilization?', a: 'Usually, yes. Closing a card removes its limit from your total. With Rs 40,000 owed on one card and a second unused card, both with Rs 1,00,000 limits, utilization is 20%. Close the unused card and it becomes 40%.' },
  { q: 'Why does one maxed-out card matter if my overall ratio is low?', a: 'Your credit report lists every card\'s balance and limit, so lenders can see a single card near its limit. Rs 9,000 on a Rs 10,000 card plus an unused Rs 2,00,000 card is only 4.3% overall, but one card is at 90%.' },
  { q: 'Is 0% credit utilization good?', a: 'Not necessarily. A card you never use adds little evidence of how you handle credit. Light, regular use that is paid on time usually works better than no use at all.' },
  { q: 'Can credit card utilization go above 100%?', a: 'Only with your consent. Under the RBI Credit Card and Debit Card Directions, 2022, issuers must not let your sanctioned limit be breached without your explicit consent, and you can switch over-limit use on or off. The calculator marks such a card as Over limit.' },
  { q: 'Does converting a purchase to EMI reduce my utilization?', a: 'Usually not. Most issuers block the converted amount against your limit and release it as each EMI is paid, so available credit comes back gradually. EMI conversion mainly changes the interest cost, not the utilization.' },
  { q: 'What is available credit and how is it calculated?', a: 'Available credit is your credit limit minus your outstanding balance. On a Rs 1,00,000 limit with Rs 62,000 owed, available credit is Rs 38,000. The calculator shows it for each card and in total.' },
  { q: 'Do loans count in credit utilization?', a: 'The ratio this calculator measures applies to revolving credit such as credit cards, where you can borrow again up to a limit. Term loans with EMIs are judged mainly on repayment record and the amount still outstanding.' },
  { q: 'Is credit utilization the same as debt-to-income ratio?', a: 'No. Credit utilization compares card balances with card limits and appears in your credit report. Debt-to-income ratio compares all monthly debt payments with monthly income, and lenders use it to judge affordability. Both matter for a loan application.' },
  { q: 'How quickly does lowering utilization improve my score?', a: 'The new balance first has to reach the bureau through the lender\'s reporting, which now happens several times a month. How much the score moves then depends on the rest of your profile, so there is no fixed timeline.' },
  { q: 'Does checking my own credit utilization or report hurt my score?', a: 'No. Using this calculator never touches your credit report. Checking your own credit report is a soft enquiry and does not affect your score. Hard enquiries happen when you apply for new credit.' },
  { q: 'Is credit utilisation the same as credit utilization?', a: 'Yes. Utilisation is the British and Indian English spelling and utilization is the American spelling. The formula, the 30% guideline and the effect on your score are the same.' },
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
  name: 'Credit Utilization Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/credit-utilization-calculator',
  description: 'Calculate your credit utilization ratio across up to six credit cards. Shows overall and per-card utilization, available credit, the pay-down needed to reach a target overall and on every card, the credit limit needed for that target, and the effect of a limit increase or new card.',
  featureList: [
    'Up to 6 credit cards with balance and limit',
    'Overall and per-card utilization ratio',
    'Adjustable target utilization from 5% to 50%',
    'Pay-down to reach the target overall and on every card',
    'Credit limit needed for the target at current balances',
    'Limit increase or new card what-if',
    'Available credit per card and in total',
    'Per-card utilization chart',
    'Balance limits at 10%, 30%, 50%, 75% and 100%',
    'Used vs available donut chart',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Credit Utilization Ratio', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Credit Utilization Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Add your cards', text: 'Enter a name, the outstanding balance and the credit limit for each card, up to six.' },
    { '@type': 'HowToStep', position: 2, name: 'Read your overall ratio', text: 'The dark box shows total utilization and its rating, with the donut splitting used and available credit.' },
    { '@type': 'HowToStep', position: 3, name: 'Check the pay-down rows', text: 'See what to pay to reach your target overall, and what it takes to get every card under it.' },
    { '@type': 'HowToStep', position: 4, name: 'Set your target and limit', text: 'Open More settings to change the target from 30% and test a limit increase or new card.' },
    { '@type': 'HowToStep', position: 5, name: 'Open Utilization by Card', text: 'Compare each card in the chart, then use the tables for card-level payments and balance limits.' },
  ],
};

// No Wikipedia article or Wikidata item exists for credit utilization (checked 2026-09-26),
// so no sameAs is set rather than pointing at a different concept.
const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Credit Utilization Ratio', alternateName: ['Credit Utilisation Ratio', 'Credit Card Utilization Ratio'],
  description: 'The percentage of available credit card limit currently in use, calculated as total outstanding balance divided by total credit limit, multiplied by 100. It is measured for each card and across all cards.',
  url: 'https://fermor.in/calculators/credit-utilization-calculator#what-is-utilization',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Credit Utilization Calculator: Card Utilization Ratio',
  url: 'https://fermor.in/calculators/credit-utilization-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Credit Utilization Ratio', alternateName: 'Credit Utilisation Ratio' },
    { '@type': 'DefinedTerm', name: 'CIBIL Score' },
  ],
  audience: { '@type': 'Audience', audienceType: 'Indian credit card holders, CIBIL score builders, loan applicants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-utilization', name: 'What Is Credit Utilization Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#utilization-formula', name: 'Credit Utilization Formula: How to Calculate It' },
    { '@type': 'WebPageElement', cssSelector: '#utilization-examples', name: 'Credit Utilization Examples' },
    { '@type': 'WebPageElement', cssSelector: '#per-card-vs-overall', name: 'Per-Card vs Overall Utilization' },
    { '@type': 'WebPageElement', cssSelector: '#good-utilization-ratio', name: 'What Is a Good Credit Utilization Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#thirty-percent-rule', name: 'The 30 Percent Credit Utilization Rule by Credit Limit' },
    { '@type': 'WebPageElement', cssSelector: '#credit-limit-needed', name: 'Credit Card Limit Calculator: How Much Limit Do You Need' },
    { '@type': 'WebPageElement', cssSelector: '#utilization-cibil-score', name: 'Credit Utilization and Your CIBIL Score' },
    { '@type': 'WebPageElement', cssSelector: '#reporting-frequency', name: 'When Is Credit Utilization Reported to Bureaus' },
    { '@type': 'WebPageElement', cssSelector: '#lower-utilization', name: 'How to Lower Your Credit Utilization' },
    { '@type': 'WebPageElement', cssSelector: '#closing-and-over-limit', name: 'Closing a Card and Going Over the Limit' },
    { '@type': 'WebPageElement', cssSelector: '#utilization-vs-dti', name: 'Credit Utilization vs Debt-to-Income Ratio' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Credit Utilization Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#utilization-limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Credit Utilization Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CreditUtilizationCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CreditUtilizationClient faqs={faqItems} />
    </>
  );
}

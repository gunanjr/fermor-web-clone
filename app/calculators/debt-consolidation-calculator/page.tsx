import type { Metadata } from 'next';
import DebtConsolidationClient from './DebtConsolidationClient';

const PAGE_DATE_PUBLISHED = '2026-07-10';
const PAGE_DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: 'Debt Consolidation Calculator: Merge Loans, Save More',
  description: 'Free debt consolidation calculator for India. Combine credit cards and loans into one EMI. See monthly savings and total interest saved. Free to use.',
  keywords: [
    'debt consolidation calculator',
    'debt consolidation loan calculator',
    'bill consolidation loan calculator',
    'credit consolidation calculator',
    'debt consolidation estimate',
    'debt consolidation loan estimator',
    'bill consolidation calculator',
    'debt consolidation',
    'personal debt consolidation loan',
    'credit card consolidation loan',
    'credit card debt consolidation loan',
    'debt consolidation interest rates',
    'consolidation loan calculator',
    'debt consolidation banks',
    'bank debt consolidation loan',
    'debt consolidation payment calculator',
    'personal debt consolidation',
    'debt consolidation monthly payment calculator',
    'credit card consolidation calculator',
    'debt management program calculator',
    'personal loan debt consolidation calculator',
    'free debt consolidation calculator',
    'consolidate credit card debt',
    'debt consolidation india',
    'credit card debt consolidation india',
    'debt consolidation emi calculator',
    'how to consolidate debt india',
    'debt consolidation loan sbi',
    'debt consolidation loan hdfc',
    'consolidation loan interest rate india',
  ],
  openGraph: {
    title: 'Debt Consolidation Calculator: Merge Loans, Save More - Fermor',
    description: 'See exactly how much you save by consolidating credit cards and high-rate loans into one personal loan. Live monthly savings, total interest saved, and break-even period. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/debt-consolidation-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-debt-consolidation-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Consolidation Calculator - Fermor',
    description: 'Combine multiple debts into one lower-rate loan. See monthly savings, total interest saved, and break-even period. Free to use.',
    images: ['https://fermor.in/og-debt-consolidation-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/debt-consolidation-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Debt Consolidation', 'Personal Loan India', 'Credit Card Debt', 'CIBIL Score', 'Balance Transfer', 'EMI Calculator', 'Debt Management India', 'RBI Repo Rate', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Debt Consolidation Calculator', item: 'https://fermor.in/calculators/debt-consolidation-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is debt consolidation?', acceptedAnswer: { '@type': 'Answer', text: 'Debt consolidation is the process of combining multiple loans and credit card balances into a single new loan, typically at a lower interest rate. Instead of paying 3 to 5 separate EMIs with different due dates, a borrower takes one personal loan, pays off all existing debts, and makes a single monthly payment on the consolidation loan.' } },
    { '@type': 'Question', name: 'How does a debt consolidation calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'A debt consolidation calculator takes your current debt balances, interest rates, and monthly payments, then computes the new EMI at a single lower rate. It shows monthly savings (difference between current total EMI and new EMI), total interest saved over the life of the consolidation loan, and how many months until the 1% processing fee is recovered.' } },
    { '@type': 'Question', name: 'Is debt consolidation a good idea in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, debt consolidation is a good idea in India when your existing debts include credit cards at 36% to 42% p.a. or personal loans at 18% to 24% p.a. Replacing them with a personal loan at 10.5% to 14% p.a. typically saves 40% to 60% of remaining interest while reducing the monthly EMI. The break-even period on the processing fee is usually under 3 months.' } },
    { '@type': 'Question', name: 'What is the interest rate for debt consolidation loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'Personal loan rates for debt consolidation in India range from 10.50% to 14% p.a. from major banks such as HDFC Bank (10.50%), SBI (11.45%), ICICI Bank (10.75%), and Axis Bank (11.25%) for salaried borrowers with a CIBIL score above 750. NBFC rates typically start at 14% to 18%.' } },
    { '@type': 'Question', name: 'Which debts can be consolidated?', acceptedAnswer: { '@type': 'Answer', text: 'Credit card balances, personal loans, consumer durable loans, and buy-now-pay-later debt can all be consolidated into a single personal loan. Home loans and car loans at 8% to 10% p.a. should not be included because a personal loan at 12% to 14% would increase rather than reduce the interest cost on those debts.' } },
    { '@type': 'Question', name: 'How much can I save by consolidating debt?', acceptedAnswer: { '@type': 'Answer', text: 'Savings depend on the gap between your current weighted average rate and the consolidation rate. Consolidating Rs 3.3 lakh of credit card and personal loan debt from a weighted average rate of 26% into a loan at 12% for 3 years reduces monthly payments from Rs 13,000 to Rs 10,961 and saves approximately Rs 89,400 in total interest over the repayment period.' } },
    { '@type': 'Question', name: 'Does debt consolidation hurt your credit score?', acceptedAnswer: { '@type': 'Answer', text: 'Debt consolidation causes a minor credit score dip of 5 to 10 points initially from the hard inquiry on your credit report. Over 6 to 12 months, closing high-utilization card accounts and making regular EMI payments on the consolidation loan typically improves the score by 30 to 60 points, producing a net positive outcome.' } },
    { '@type': 'Question', name: 'What is the difference between debt consolidation and balance transfer?', acceptedAnswer: { '@type': 'Answer', text: 'Debt consolidation uses a personal loan to pay off multiple debt types (cards, personal loans, consumer loans) and is suitable for large balances and longer tenures up to 5 years. A balance transfer moves a credit card balance to another card with a lower or 0% introductory rate for 3 to 12 months and works best for purely card debt that can be cleared within the promotional window.' } },
    { '@type': 'Question', name: 'Can I consolidate credit card debt with a personal loan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Personal loans are the most common instrument for credit card debt consolidation in India. A Rs 3 lakh card balance at 36% p.a. replaced with a personal loan at 12% for 3 years saves over Rs 80,000 in interest and converts unpredictable minimum-payment obligations into a fixed monthly EMI.' } },
    { '@type': 'Question', name: 'What is the minimum CIBIL score for a debt consolidation loan?', acceptedAnswer: { '@type': 'Answer', text: 'Most banks require a minimum CIBIL score of 700 to approve a personal loan for debt consolidation. A score of 750 or above qualifies for the best rates, typically 10.50% to 11.25%. Scores between 650 and 700 face rates of 14% to 18%, which still beats credit card rates of 36% to 42% but reduces the total saving.' } },
    { '@type': 'Question', name: 'Which bank offers the best debt consolidation loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank offers the most competitive consolidation loan rate at 10.50% p.a. for top-tier salaried borrowers. SBI and ICICI Bank follow at 11.45% and 10.75% respectively. Bajaj Finance often processes approvals faster with pre-approved offers at rates starting from 11% p.a. The best lender for any individual depends on their salary account, CIBIL score, and employer category.' } },
    { '@type': 'Question', name: 'How long does debt consolidation take?', acceptedAnswer: { '@type': 'Answer', text: 'A debt consolidation loan is typically disbursed within 2 to 7 working days of approval for salaried borrowers with pre-approved offers. Applications with full documentation at a lender where you maintain your salary account often complete in 24 to 48 hours. Total debt clearance happens immediately upon disbursement when funds are used to close the existing accounts.' } },
    { '@type': 'Question', name: 'What documents do I need for a debt consolidation loan?', acceptedAnswer: { '@type': 'Answer', text: 'You need PAN, Aadhaar, the last 3 months of salary slips, 6 months of bank statements, Form 16, and statements of all debts you intend to consolidate showing the outstanding balance. Some banks also require the latest credit card statements and a letter requesting foreclosure of existing loans.' } },
    { '@type': 'Question', name: 'Is it better to pay off debt or consolidate?', acceptedAnswer: { '@type': 'Answer', text: 'Paying off debt in full is better if you have savings earning less than your current debt interest rate and the savings are sufficient to close the debt. Consolidation is better when you are juggling multiple high-rate debts that cannot be cleared with available savings, when monthly cash flow is the constraint, or when the total interest saving exceeds what you would earn by keeping those funds invested.' } },
    { '@type': 'Question', name: 'What is the processing fee for a debt consolidation loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'Processing fees for personal loans used in debt consolidation range from 0.5% to 2% of the loan amount. At 1%, a Rs 3 lakh consolidation loan carries a Rs 3,000 fee. This calculator includes a break-even calculation showing how many months of EMI savings are needed to recover that fee, typically 1 to 3 months for credit card consolidation scenarios.' } },
    { '@type': 'Question', name: 'Can self-employed borrowers get a debt consolidation loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but banks apply stricter criteria. Self-employed applicants need 3 years of ITR showing stable net profit, 2 years of GST returns, and CA-certified financials. FOIR is usually capped at 40% to 45%. Rates are typically 0.5% to 1% higher than for salaried borrowers with equivalent credit profiles.' } },
    { '@type': 'Question', name: 'What happens to credit cards after debt consolidation?', acceptedAnswer: { '@type': 'Answer', text: 'After consolidation, it is advisable to close high-fee credit cards to avoid accumulating new balances on accounts that are now paid off. However, keeping one card with a low credit limit active and paying it off monthly helps maintain credit utilization metrics and the age of your credit history, both of which support your CIBIL score.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them any time. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Debt Consolidation Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/debt-consolidation-calculator',
  description: 'Calculate how much you save by consolidating multiple credit cards and personal loans into a single lower-rate loan. Shows monthly savings, total interest saved, new EMI, and break-even period on the processing fee.',
  featureList: ['Multi-debt entry with editable name, balance, rate, and EMI', 'Live monthly savings calculation', 'Total interest savings vs current repayment', 'Break-even period on 1% processing fee', 'Donut chart: principal vs current total interest', 'Current vs new total repayment comparison bars', 'Before vs after summary table', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the Debt Consolidation Calculator', totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Debt Consolidation Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your current debts', text: 'Add each loan or credit card with its outstanding balance, annual interest rate, and current monthly EMI. The calculator comes pre-filled with a typical 3-debt scenario: two credit cards at 36-42% and a personal loan at 18%.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the consolidation loan rate', text: 'Enter the interest rate your bank has quoted for a personal loan, or use the benchmark rates in the article below. The slider covers 7% to 24% p.a.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose the tenure', text: 'Select 12, 24, 36, 48, or 60 months. Shorter tenures save more total interest; longer tenures reduce the monthly EMI. The break-even calculation updates automatically.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the results', text: 'See monthly savings, total interest saved, the new EMI, and how many months until the processing fee is recovered. Use the before vs after table below the calculator to compare total repayment under both scenarios.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Debt Consolidation', alternateName: 'Debt Consolidation Loan',
  description: 'The practice of combining multiple high-interest loans and credit card balances into a single new loan at a lower interest rate, reducing monthly payments and total interest cost.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: 'https://en.wikipedia.org/wiki/Debt_consolidation',
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Debt Consolidation Calculator: Merge Loans, Save More',
  url: 'https://fermor.in/calculators/debt-consolidation-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Debt Consolidation', alternateName: 'Debt Consolidation Loan' }],
  audience: { '@type': 'Audience', audienceType: 'Indian borrowers with multiple loans, credit card users, personal finance seekers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-debt-consolidation', name: 'What Is Debt Consolidation' },
    { '@type': 'WebPageElement', cssSelector: '#how-consolidation-saves-money', name: 'How Debt Consolidation Saves Money' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-consolidate', name: 'When Should You Consolidate Debt' },
    { '@type': 'WebPageElement', cssSelector: '#which-debts-to-consolidate', name: 'Which Debts to Include in Consolidation' },
    { '@type': 'WebPageElement', cssSelector: '#consolidation-interest-rates', name: 'Debt Consolidation Loan Interest Rates in India' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-consolidation', name: 'Consolidating Credit Card Debt' },
    { '@type': 'WebPageElement', cssSelector: '#debt-consolidation-vs-balance-transfer', name: 'Debt Consolidation vs Balance Transfer' },
    { '@type': 'WebPageElement', cssSelector: '#impact-on-credit-score', name: 'Impact on Credit Score' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DebtConsolidationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DebtConsolidationClient />
    </>
  );
}

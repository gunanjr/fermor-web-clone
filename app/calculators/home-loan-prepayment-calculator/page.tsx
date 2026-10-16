import type { Metadata } from 'next';
import HomeLoanPrepaymentClient from './HomeLoanPrepaymentClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: 'Home Loan Prepayment Calculator: Interest Savings & Tenure',
  description: 'Free prepayment calculator for home loans. Calculate exact interest savings and tenure reduction. Compare reduce-tenure vs reduce-EMI. Works with SBI, HDFC, ICICI, Axis. Free to use.',
  keywords: [
    'home loan prepayment calculator',
    'mortgage prepayment calculator',
    'home loan emi calculator with prepayment',
    'emi calculator for home loan with prepayment',
    'home loan part prepayment calculator',
    'homeloan prepayment calculator',
    'housing loan prepayment calculator',
    'mortgage loan prepayment calculator',
    'home loan emi prepayment calculator',
    'prepayment calculator hdfc',
    'sbi home loan prepayment calculator',
    'icici home loan part prepayment calculator',
    'home loan prepayment calculator sbi',
    'home loan prepayment calculator reduce tenure',
    'emi with prepayment calculator',
    'hdfc home loan prepayment calculator',
    'home loan pre payment calculator',
    'loan emi calculator prepayment',
    'prepayment of home loan',
    'home loan calculator excel with prepayment',
    'home loan prepayment benefit calculator',
    'part prepayment calculator',
    'lump sum prepayment home loan',
    'home loan interest saving calculator',
    'prepayment impact calculator',
  ],
  openGraph: {
    title: 'Home Loan Prepayment Calculator - Fermor',
    description: 'Calculate interest savings from prepayment. Compare reduce-tenure vs reduce-EMI. Free calculator for SBI, HDFC, ICICI, Axis home loans.',
    type: 'website',
    url: 'https://fermor.in/calculators/home-loan-prepayment-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-home-loan-prepayment-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Loan Prepayment Calculator - Fermor',
    description: 'Calculate interest savings from prepayment. Compare reduce-tenure vs reduce-EMI modes instantly.',
    images: ['https://fermor.in/og-home-loan-prepayment-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/home-loan-prepayment-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: [
    'Home Loan Prepayment',
    'Mortgage Prepayment Calculator',
    'SBI Home Loan',
    'HDFC Home Loan',
    'ICICI Home Loan',
    'Loan Tenure Reduction',
    'EMI Reduction',
    'Home Loan Interest Savings',
    'RBI Prepayment Guidelines',
    'Floating Rate Home Loans',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Loan Prepayment Calculator', item: 'https://fermor.in/calculators/home-loan-prepayment-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is home loan prepayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home loan prepayment is paying a lump sum toward the outstanding principal on top of your regular EMI. The outstanding balance drops immediately, which means less interest accrues in subsequent months. On a Rs 50 lakh loan at 8.5% for 20 years, the original EMI is Rs 43,391 and total interest is Rs 54.1 lakh. Prepaying Rs 5 lakh at month 12 reduces principal to Rs 44.4 lakh, cutting total interest to Rs 45.9 lakh, a saving of Rs 8.2 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I reduce tenure or EMI when prepaying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reduce tenure if your current EMI is manageable and your goal is to close the loan early. You save more interest because the loan ends sooner. Reduce EMI if you need lower monthly outgo or have better investment opportunities. For a Rs 50 lakh loan at 8.5% with a Rs 5 lakh prepayment at month 12, reducing tenure saves Rs 8.2 lakh in interest; reducing EMI saves Rs 6.6 lakh because the tenure stays the same.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are home loan prepayment charges?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI guidelines effective October 2019, banks cannot charge prepayment penalties on floating-rate home loans to individual borrowers. SBI, HDFC Bank, ICICI Bank, Axis Bank, and LIC HFL all charge zero on part or full prepayment of floating-rate loans. Fixed-rate home loans typically carry a 2% penalty on the prepaid amount. Always confirm with your lender before paying.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I save by prepaying my home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Savings depend on loan amount, interest rate, remaining tenure, and prepayment timing. On a Rs 50 lakh loan at 8.5% for 20 years, prepaying Rs 5 lakh at month 12 saves approximately Rs 8.2 lakh in interest and cuts tenure by about 4 years. Prepaying Rs 10 lakh at the same time saves approximately Rs 16 lakh. A Rs 1 crore loan with a Rs 20 lakh prepayment at month 12 saves around Rs 32 lakh. Use this calculator to see exact savings for your loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the best time to prepay a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The earlier in the tenure, the more you save. In the first 5 years of an 8.5% home loan, over 70% of each EMI is interest. A Rs 5 lakh prepayment at month 12 saves Rs 8.2 lakh. The same Rs 5 lakh at month 60 saves roughly Rs 5.1 lakh, and at month 120 saves only about Rs 2.8 lakh. Front-loading prepayments maximizes interest savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is partial or part prepayment of home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Part prepayment is paying a lump sum toward the outstanding principal while the loan continues. The loan continues at either a shorter tenure (same EMI) or a lower EMI (same tenure). Unlike full prepayment which closes the loan entirely, part prepayment keeps the loan active while reducing overall interest cost. Both are penalty-free on floating-rate loans per RBI guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I prepay SBI home loan without penalty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SBI charges zero prepayment penalty on floating-rate home loans for individual borrowers. You can prepay any amount at any time, multiple times per year, at no cost. SBI does not enforce a minimum prepayment amount, though branches may informally prefer at least one EMI. Contact your SBI branch to confirm current operational procedures.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does prepayment reduce home loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you prepay, the outstanding principal drops immediately. Your EMI stays the same, but a higher portion of each subsequent EMI goes toward principal because interest is charged on the lower balance. The loan reaches zero balance faster, cutting the effective tenure. The new tenure is calculated by solving for the number of months needed to repay the post-prepayment balance at your unchanged EMI and rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum prepayment amount for HDFC Bank?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HDFC Bank does not publish a fixed minimum for part-prepayments on floating-rate loans. Most branches process prepayments starting from one EMI equivalent, which typically ranges from Rs 10,000 to Rs 1 lakh depending on your loan size. For maximum clarity, call HDFC Bank customer care at 1800-202-6161 to confirm the current operational minimum for your specific loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it better to invest or prepay a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compare your effective loan cost against post-tax investment returns. At 8.5% interest with no Section 24(b) benefit (new tax regime), prepaying gives a guaranteed 8.5% return. If your investments earn more than 8.5% post-tax consistently, invest instead. Most equity SIPs earn above 8.5% over 10 years, but not all years do. If uncertain, prepaying a floating-rate loan at 8-9% is a risk-free return.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make multiple prepayments on my home loan per year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. RBI guidelines do not restrict the number of prepayments per year on floating-rate loans. You can make multiple part-prepayments in a single year without penalty. Individual banks may have operational requirements such as advance notice or processing time between prepayments. Check with your lender for their current process and whether they combine multiple small prepayments into one processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home loan prepayment affect my CIBIL score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Part prepayment does not negatively affect your CIBIL score. It shows reduced loan liability, which can slightly improve your profile over time since it indicates timely payments and financial discipline. Closing a loan early (full prepayment) also does not hurt your score. Your CIBIL score stays positive as long as all EMIs are paid on time throughout the loan period.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I process a home loan prepayment with my bank?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Visit your bank branch with your loan account number, bank passbook, and cheque or net banking authorization. Most banks accept prepayment via net banking (fastest, instant) or cheque at the branch. Provide the amount and specify whether you want to reduce tenure or EMI. The bank will immediately recalculate your loan and issue a revised amortization schedule within 2-3 business days.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which bank offers the best home loan interest rate in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of September 2026, SBI floating-rate home loans start at approximately 8.25%, HDFC Bank at 8.35%, and ICICI Bank at 8.40%. The 15-basis-point difference between SBI and ICICI results in approximately Rs 1.3 lakh higher total interest over 20 years on a Rs 50 lakh loan. Compare base rate, spread, rate-pass-through speed, and reset frequency before choosing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are common mistakes people make with home loan prepayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not prepaying in the first 5 years when interest cost is highest. Prepaying when emergency funds are low, risking personal loan debt. Prepaying fixed-rate loans without factoring in the 2% penalty. Confusing reduce-tenure with reduce-EMI and choosing the wrong mode for their cash flow. Using prepayment calculator results without verifying final numbers with the actual lender.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform with 500+ free financial calculators and a financial eligibility engine that matches users with loans and investments they qualify for. All calculators are free with no sign-up. Available at fermor.in.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home Loan Prepayment Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-loan-prepayment-calculator',
  description: 'Calculate interest savings and tenure reduction from a lump-sum home loan prepayment. Compare reduce-tenure vs reduce-EMI modes. Supports SBI, HDFC, ICICI rates.',
  featureList: [
    'Lump-sum prepayment interest savings',
    'Reduce tenure vs reduce EMI mode comparison',
    'Year-by-year amortization schedule',
    'Stacked bar chart for principal vs interest',
    'Before and after prepayment comparison',
    'Multi-currency support',
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
  name: 'How to Calculate Home Loan Prepayment Savings',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Loan Prepayment Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your original loan details', text: 'Enter the original loan amount, annual interest rate, and original loan tenure in years.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter prepayment details', text: 'Enter the lump-sum prepayment amount you plan to make.' },
    { '@type': 'HowToStep', position: 3, name: 'Set prepayment month', text: 'Open More settings and set the month of prepayment (e.g., 12 for after 1 year).' },
    { '@type': 'HowToStep', position: 4, name: 'Choose prepayment mode', text: 'Toggle between Reduce Tenure (same EMI, shorter loan) and Reduce EMI (same tenure, lower monthly payment).' },
    { '@type': 'HowToStep', position: 5, name: 'View your savings', text: 'See how much interest you save, how many months are cut, and compare before and after amortization schedules.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Prepayment',
  alternateName: 'Part Prepayment',
  description: 'Payment of an amount in addition to the regular EMI toward the outstanding principal of a loan. In floating-rate home loans in India, prepayment carries no penalty per RBI guidelines.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Prepayment_of_loan'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Loan Prepayment Calculator: Save Interest & Reduce Tenure',
  url: 'https://fermor.in/calculators/home-loan-prepayment-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Prepayment', alternateName: 'Part Prepayment of Home Loan' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home loan borrowers, existing home owners, first-time buyers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-prepayment', name: 'What Is Home Loan Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-calculation', name: 'How Prepayment Saves Interest: The Math' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-tenure-vs-emi', name: 'Reduce Tenure vs Reduce EMI' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-charges', name: 'Home Loan Prepayment Charges: Bank Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#best-time-to-prepay', name: 'Best Time to Make a Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#interest-rate-strategy', name: 'Home Loan Interest Rates: Choosing Between Banks' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-strategy', name: 'Prepayment Strategy: How Much Should You Prepay' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Prepayment Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-mistakes', name: 'Common Mistakes to Avoid When Prepaying' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-process-prepayment', name: 'Step-by-Step Guide to Processing a Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#multiple-prepayments', name: 'Strategy for Multiple Prepayments Over Time' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HomeLoanPrepaymentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomeLoanPrepaymentClient />
    </>
  );
}

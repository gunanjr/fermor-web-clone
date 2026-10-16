import type { Metadata } from 'next';
import PersonalLoanCalculatorClient from './PersonalLoanCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-06-20';
const PAGE_DATE_MODIFIED = '2026-06-25';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator: Calculate EMI & Interest',
  description: 'Free personal loan EMI calculator for India. Calculate monthly EMI, view amortization schedule, compare SBI/HDFC/ICICI rates, check eligibility. Free to use.',
  keywords: [
    'personal loan emi calculator',
    'calculate emi for personal loan',
    'personal loan calculator',
    'pl loan emi calculator',
    'emi calculator personal loan',
    'personal loan interest rate calculator',
    'monthly emi calculator for personal loan',
    'emi loan calculator personal loan',
    'personal loan emi cal',
    'emi cal for personal loan',
    'calculating emi for personal loan',
    'loan emi calculator for personal loan',
    'personal loan and emi calculator',
    'calculate emi loan',
    'best personal loans calculator',
    'unsecured loan calculator',
    'online loan calculator',
    'loan repayment calculator',
    'loan installment calculator',
    'personal loan eligibility calculator',
    'personal loan interest calculator',
    'personal loan rate calculator',
    'loan amortization schedule',
    'loan repayment schedule',
    '1 lakh personal loan emi',
    '50000 personal loan calculator',
    '50000 loan emi calculator',
    '20000 loan emi calculator',
    'personal loan amount',
    'sbi personal loan calculator',
    'sbi personal loan emi calculator',
    'hdfc personal loan calculator',
    'hdfc personal loan emi calculator',
    'hdfc personal loan interest rate',
    'icici personal loan calculator',
    'icici personal loan emi calculator',
    'axis bank personal loan calculator',
    'axis personal loan calculator',
    'bajaj finserv emi calculator',
    'kotak personal loan calculator',
    'personal loan interest rate sbi',
    'interest rate of sbi for personal loan',
    'sbi personal loan interest percentage',
    'hdfc bank personal loan calculator',
    'icici bank personal loan calculator',
    'personal loan emi calculator state bank of india',
    'state bank of india personal loan calculator',
  ].join(', '),
  openGraph: {
    title: 'Personal Loan EMI Calculator: Calculate EMI, Compare Bank Rates',
    description: 'Free personal loan EMI calculator. Compare SBI, HDFC, ICICI, Axis interest rates, view amortization schedule, check FOIR eligibility, and calculate true loan cost.',
    type: 'website',
    url: 'https://fermor.in/calculators/personal-loan-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-personal-loan-calculator.png', width: 1200, height: 630, alt: 'Fermor Personal Loan EMI Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan EMI Calculator: Calculate EMI & Compare Bank Rates',
    description: 'Calculate personal loan EMI, compare SBI/HDFC/ICICI rates, view amortization, check eligibility. Free for India.',
    images: ['https://fermor.in/og-personal-loan-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/personal-loan-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 200,
    height: 60,
  },
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Personal Loan EMI',
    'Loan Amortization',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'RBI Lending Guidelines',
    'FOIR Calculation',
    'Unsecured Lending India',
    'Bank Interest Rate Comparison',
    'Loan Eligibility Assessment',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Personal Loan EMI Calculator', item: 'https://fermor.in/calculators/personal-loan-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the EMI for a 1 Lakh personal loan for 5 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At 11% p.a., the EMI for a Rs 1 Lakh personal loan over 5 years (60 months) is Rs 2,174 per month. The total interest payable is Rs 30,455, making the total repayment Rs 1,30,455.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is personal loan EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Personal loan EMI is calculated using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1], where P is the principal amount, R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the loan tenure in months. For example, Rs 5 lakh at 11% for 3 years gives EMI = Rs 16,369.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which bank has the lowest personal loan interest rate in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of June 2026, HDFC Bank and Axis Bank offer among the lowest starting rates at approximately 10.50% p.a. for personal loans. SBI starts at 11.45%, ICICI at 10.65%, and Kotak Mahindra at 10.99%. Actual rates depend on credit score, employer category, income, and existing relationship with the bank.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a personal loan require collateral?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, a personal loan is an unsecured loan. You do not need to pledge any asset or collateral such as gold, property, or fixed deposits. Lenders approve personal loans based on creditworthiness, income, employment stability, and repayment capacity.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I prepay my personal loan without penalty?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI guidelines, banks cannot charge prepayment or foreclosure penalties on floating-rate personal loans. For fixed-rate loans, banks may charge up to 2-5% of the outstanding principal as a prepayment fee. Most personal loans in India are on floating rates, so prepayment is typically penalty-free after the initial lock-in period of 6-12 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What credit score is needed for a personal loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most banks require a minimum CIBIL score of 700 to approve a personal loan. A score above 750 qualifies you for the best interest rates and higher loan amounts. Scores between 650-700 may get approval at higher rates. Below 650, approval is unlikely from major banks, though some NBFCs may consider applications with additional documentation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the EMI for a 5 Lakh personal loan for 3 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At 11% p.a., the EMI for a Rs 5 Lakh personal loan for 3 years (36 months) is Rs 16,369 per month. Total interest payable is Rs 89,291, making the total repayment Rs 5,89,291.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is FOIR and how does it affect loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FOIR (Fixed Obligation to Income Ratio) is the percentage of your monthly income that goes towards existing EMIs and loan obligations. Banks use FOIR to determine how much additional EMI you can afford. Most banks cap FOIR at 40-55% for personal loans. For example, if your monthly income is Rs 75,000 and existing EMIs are Rs 10,000, your available EMI capacity is Rs 27,500 (at 50% FOIR), which determines your maximum eligible loan amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to reduce personal loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Five ways to reduce personal loan EMI: (1) Choose a longer tenure, which spreads the principal over more months. (2) Negotiate a lower interest rate by maintaining a credit score above 750. (3) Transfer the loan to a bank offering a lower rate (balance transfer). (4) Make part-prepayments to reduce outstanding principal. (5) Compare rates from multiple banks before applying.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does taking a personal loan affect my credit score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Applying triggers a hard inquiry, causing a small temporary dip, and multiple applications in a short window compound this. Once approved, on-time EMI payments build positive repayment history and can improve your score over time, while a missed or late EMI has a larger negative effect and is reported to credit bureaus within the same cycle.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is personal loan interest tax deductible?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Personal loan interest is generally not tax deductible under the Income Tax Act. However, if the loan is used for specific purposes, deductions may apply: home renovation (Section 24, up to Rs 30,000 per year), business purposes (deductible as business expense), or purchase of assets used for business. The principal repayment is not deductible in any case.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required for a personal loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard documents for a personal loan: (1) Identity proof: Aadhaar, PAN, passport, or voter ID. (2) Address proof: Aadhaar, utility bill, or rent agreement. (3) Income proof: 3-6 months salary slips and bank statements for salaried applicants; ITR for 2-3 years for self-employed. (4) Employment proof: offer letter or employer ID. (5) Passport-size photographs. Requirements vary by bank.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the EMI amount change during the loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For fixed-rate personal loans, the EMI remains constant throughout the tenure. The split between principal and interest changes each month, but the total payment stays the same. For floating-rate loans, the EMI may change when the bank revises its lending rate linked to the RBI repo rate. Most banks adjust the tenure rather than the EMI when rates change.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum personal loan amount and tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Maximum personal loan amounts vary by bank: SBI offers up to Rs 20 lakh, HDFC Bank up to Rs 40 lakh, ICICI Bank up to Rs 50 lakh, and Axis Bank up to Rs 40 lakh for salaried individuals. Maximum tenure is typically 5-7 years (60-84 months). Higher amounts require higher income, better credit scores, and may need an existing banking relationship.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to calculate personal loan EMI in Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the PMT function in Excel: =PMT(rate/12, tenure_months, -principal). For a Rs 5 lakh loan at 11% for 5 years: =PMT(11%/12, 60, -500000) returns Rs 10,871. The negative sign on the principal is required. For Google Sheets, the same formula works. You can also use the manual formula: =P*(R*(1+R)^N)/((1+R)^N-1) where R is the monthly rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the processing fee for a personal loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Processing fees range from 0.5% to 3% of the loan amount, plus 18% GST on the fee. SBI charges up to 1.5%, HDFC Bank up to 2.5%, ICICI Bank up to 2.25%, and Axis Bank up to 2%. Some banks waive processing fees during festive seasons. The fee is deducted upfront from the disbursed amount, so factor it into your borrowing calculations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Personal Loan EMI Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/personal-loan-calculator',
  description: 'Calculate monthly EMI for personal loans with FOIR eligibility check, 10-bank interest rate comparison, prepayment savings tool, true cost calculator, and full amortization schedule. Free, browser-based, no sign-up.',
  featureList: [
    'Instant Personal Loan EMI Calculation',
    'Interactive Loan Amortization Schedule (Yearly + Monthly)',
    'Prepayment and Interest Savings Calculator',
    'Loan Affordability and FOIR Eligibility Check',
    'True Loan Cost Calculator (Processing Fee + GST)',
    'Live Bank Interest Rate Comparison (SBI, HDFC, ICICI, Axis, Kotak)',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'EMI Quick Reference Chart (Rs 50K to Rs 50 Lakh)',
    'localStorage persistence for returning users',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Personal Loan EMI',
  description: 'Step-by-step guide to calculate your personal loan EMI using this calculator or the EMI formula.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Personal Loan EMI Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the loan amount',
      text: 'Use the slider or type in the exact loan amount you wish to borrow. The calculator supports amounts from Rs 10,000 to Rs 50 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'Adjust the interest rate slider to match the rate offered by your bank. You can compare rates from SBI, HDFC, ICICI, Axis, and Kotak in the sidebar.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose the loan tenure',
      text: 'Select the repayment period in years (1-7) or months (12-84). A longer tenure reduces your monthly EMI but increases total interest paid.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View your EMI and cost breakdown',
      text: 'The calculator instantly shows your monthly EMI, total interest, and total amount payable with a principal vs interest donut chart. Expand the amortization section to see the year-by-year or month-by-month repayment schedule.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Explore prepayment and eligibility tools',
      text: 'Use the Prepayment tool to see how extra monthly payments reduce your tenure and interest. Use the Affordability Check to verify if the EMI fits within the 50% FOIR rule based on your income.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'EMI',
  alternateName: 'Equated Monthly Instalment',
  description: 'A fixed payment amount made by a borrower to a lender at a specified date each calendar month, used to pay off both principal and interest over the loan tenure.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equated_monthly_installment',
    'https://www.wikidata.org/wiki/Q5384060',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Personal Loan EMI Calculator: Calculate EMI and Interest Rate',
  description: 'Free personal loan EMI calculator for India. Calculate monthly EMI, compare SBI/HDFC/ICICI rates, view amortization schedule, check FOIR eligibility, and find true loan cost.',
  url: 'https://fermor.in/calculators/personal-loan-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  author: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fermor.in/fermor-schema-logo.png',
    },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Personal Loan' },
    { '@type': 'DefinedTerm', name: 'Loan Amortization' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Personal loan borrowers, salaried professionals, NRI investors, small business owners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-emi-calculator', name: 'What Is a Personal Loan EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#emi-formula', name: 'Personal Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#emi-formula-excel', name: 'EMI Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#bank-comparison', name: 'Bank Interest Rate Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#emi-chart', name: 'EMI Quick Reference Chart' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility', name: 'Loan Eligibility and FOIR' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-guide', name: 'Prepayment and Interest Savings' },
    { '@type': 'WebPageElement', cssSelector: '#true-cost', name: 'True Cost of Personal Loan' },
    { '@type': 'WebPageElement', cssSelector: '#amortization-guide', name: 'Amortization Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#loan-comparison', name: 'Personal Loan vs Other Loans' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PersonalLoanCalculatorClient />
    </>
  );
}

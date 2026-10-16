import type { Metadata } from 'next';
import CarLoanEligibilityClient from './CarLoanEligibilityClient';

const PAGE_DATE_PUBLISHED = '2026-07-13';
const PAGE_DATE_MODIFIED = '2026-09-11';

export const metadata: Metadata = {
  title: 'Car Loan Eligibility Calculator: Check Your Limit by Salary',
  description: 'Free car loan eligibility calculator for India. Check how much car loan you qualify for by salary, FOIR, and CIBIL score. Compare SBI, HDFC, ICICI rates.',
  keywords: [
    'car loan eligibility calculator',
    'car loan eligibility calculator based on salary',
    'vehicle loan eligibility calculator',
    'auto loan eligibility calculator',
    'check car loan eligibility',
    'check car loan eligibility online',
    'car loan eligibility based on salary',
    'car eligibility calculator',
    'eligibility for a car loan',
    'maximum car loan eligibility',
    'car loan amount eligibility calculator',
    'car loan emi eligibility calculator',
    'car loan foir calculator',
    'sbi car loan eligibility calculator',
    'hdfc car loan eligibility calculator',
    'icici car loan eligibility calculator',
    'axis bank car loan eligibility calculator',
    'check my car loan eligibility',
    'car loan eligibility for salaried',
    'car loan eligibility based on age',
    'car loan eligibility with existing loan',
    'car loan eligibility calculator self employed',
    'used car loan eligibility calculator',
    'used car loan eligibility check',
    'second hand car loan eligibility',
    'how much car loan can i get on 30000 salary',
    'how much car loan can i get on 40000 salary',
    'how much car loan can i get on 50000 salary',
    'how much car loan can i get on 60000 salary',
    'how much car loan can i get on my salary',
    'how much do i qualify for a car loan',
    'car loan eligibility criteria',
    'car loan amount eligibility',
    'vehicle loan eligibility calculator sbi',
  ],
  openGraph: {
    title: 'Car Loan Eligibility Calculator: Check Your Limit by Salary - Fermor',
    description: 'Check your car loan eligibility based on salary, existing EMIs, credit score, and age. Compare rates across top lenders. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/car-loan-eligibility-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-car-loan-eligibility-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Loan Eligibility Calculator - Fermor',
    description: 'Check car loan eligibility by salary, existing obligations, and CIBIL score. Compare SBI, HDFC, ICICI auto loan rates. Free to use.',
    images: ['https://fermor.in/og-car-loan-eligibility-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/car-loan-eligibility-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Car Loan Eligibility', 'Vehicle Loan India', 'FOIR Calculation', 'SBI Car Loan', 'HDFC Car Loan', 'CIBIL Score Auto Loan', 'Car Loan Down Payment', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Car Loan Eligibility Calculator', item: 'https://fermor.in/calculators/car-loan-eligibility-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is car loan eligibility calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lenders use the Fixed Obligation to Income Ratio, or FOIR, method. They cap your total monthly debt payments, including the new car EMI and any existing EMIs, at 45% to 55% of net monthly income. Whatever capacity remains is reverse calculated into a maximum loan amount at the chosen interest rate and tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the car loan eligibility formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eligible Loan = Available EMI x [1 - (1 + r)^-n] / r, where r is the monthly interest rate and n is the tenure in months. Available EMI is your FOIR-based EMI capacity minus any existing EMIs you already pay.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much car loan can I get on Rs 30,000 salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 30,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the eligible EMI capacity is Rs 15,000 a month, which works out to a maximum car loan of approximately Rs 7.27 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much car loan can I get on Rs 40,000 salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 40,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 20,000 a month, which qualifies for a maximum car loan of approximately Rs 9.69 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much car loan can I get on Rs 50,000 salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 50,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 25,000 a month, which qualifies for a maximum car loan of approximately Rs 12.11 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a car loan eligibility calculator based on salary work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "It takes your net monthly salary, applies the bank's FOIR cap (typically 50%), subtracts any existing EMIs, and reverse calculates the loan amount that fits inside the remaining EMI capacity at your chosen interest rate and tenure.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum salary required for a car loan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most public and private banks need a net monthly income of Rs 20,000 to Rs 25,000 for salaried applicants, and annual ITR of Rs 3 lakh to Rs 4 lakh for self-employed applicants.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I check my car loan eligibility online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your net monthly income, existing EMIs, preferred tenure, and interest rate into a calculator like this one. It applies the FOIR formula instantly and shows your eligible loan amount, no paperwork or bank visit required at this stage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What CIBIL score is required for a car loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CIBIL score of 750 or above gets you the lowest interest rates and fastest approval. A score of 650 to 749 still qualifies but at a higher rate, while scores below 650 make approval difficult without a co-applicant.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does existing loan EMI reduce my car loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Existing EMIs are subtracted directly from your FOIR-based EMI capacity. If your income supports a Rs 20,000 EMI but you already pay Rs 5,000 toward a personal loan, only the remaining Rs 15,000 counts toward your car loan eligibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum tenure for a car loan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'New car loans typically go up to 7 years, or 84 months. Used car loans are usually capped at 5 years, or tied to the age of the vehicle, whichever comes first.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can self-employed individuals get a car loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lenders assess net profit from the last two years of ITR, business bank statement cash flows, and business vintage, and typically apply a slightly tighter FOIR of 45% to 50% than they do for salaried applicants.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the loan-to-value (LTV) ratio for a car loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For new cars, banks finance 85% to 90% of the on-road price. The remaining 10% to 15% has to come from your own down payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does age affect car loan eligibility?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You need to be at least 21 years old to apply, and the loan tenure must end before you turn 60 if salaried, or 65 if self-employed. A borrower closer to that age ceiling gets offered a shorter tenure, which lowers the eligible loan amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a car loan FOIR calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FOIR stands for Fixed Obligation to Income Ratio. A FOIR calculator applies the bank\'s debt-to-income cap to your salary and existing EMIs to work out how much more EMI, and therefore how much more loan, you can take on. This calculator applies that same FOIR logic automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is used car loan eligibility calculated differently from a new car loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The FOIR formula stays the same, but used car loans carry shorter tenures (3 to 5 years), interest rates 2 to 4 percentage points higher, and a lower LTV cap of 70% to 80% of the vehicle's assessed value. All three reduce the eligible loan amount compared to a new car at the same salary.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much car loan can I get on Rs 1 lakh salary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a Rs 1,00,000 monthly salary with no existing EMIs, at 8.75% interest for 5 years and 50% FOIR, the EMI capacity is Rs 50,000 a month, which qualifies for a maximum car loan of approximately Rs 24.23 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account lets you save your results and revisit them later. Fermor is building an automated financial action system on top of the Account Aggregator framework to connect real accounts to real decisions.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Car Loan Eligibility Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/car-loan-eligibility-calculator',
  description: 'Calculate eligible car loan amounts based on monthly income, existing EMIs, tenure, interest rate, and CIBIL score. Compare options across top lenders.',
  featureList: [
    'Income-based auto loan eligibility',
    'CIBIL score interest rate auto-adjustment',
    'Employment type toggle with customized FOIR limits',
    'Bank-by-bank eligible amount comparison',
    'On-road affordable car price estimation',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
  name: 'How to Check Car Loan Eligibility',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Car Loan Eligibility Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Provide monthly income',
      text: 'Enter your net take-home salary or self-employed monthly profit.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add existing EMIs',
      text: 'Enter any monthly payments you are currently paying for other loans.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select tenure and interest rate',
      text: 'Specify how many years you want the loan for and input the target interest rate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Verify credit score and parameters',
      text: 'Select your CIBIL score band to adjust rates, choose down payment ratio, and check affordable car brackets.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'FOIR',
  alternateName: 'Fixed Obligation to Income Ratio',
  description: 'A metric used by financial institutions to assess a borrower\'s repayment capacity by comparing total monthly debt obligations to net monthly income.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Debt-to-income_ratio'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Car Loan Eligibility Calculator: Check Your Limit',
  url: 'https://fermor.in/calculators/car-loan-eligibility-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio' }],
  audience: { '@type': 'Audience', audienceType: 'Indian car buyers, auto borrowers, self-employed professionals', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-car-loan-eligibility', name: 'What Is Car Loan Eligibility?' },
    { '@type': 'WebPageElement', cssSelector: '#how-banks-calculate', name: 'How Banks Calculate Car Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-by-salary', name: 'Car Loan Eligibility by Salary' },
    { '@type': 'WebPageElement', cssSelector: '#self-employed-criteria', name: 'Car Loan Eligibility for Self-Employed Applicants' },
    { '@type': 'WebPageElement', cssSelector: '#lender-comparison', name: 'Car Loan Eligibility Comparison by Lender' },
    { '@type': 'WebPageElement', cssSelector: '#cibil-score-impact', name: 'How CIBIL Score Affects Car Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#new-vs-used-car', name: 'New Car vs Used Car Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-guidelines', name: 'RBI Guidelines on Vehicle Finance' },
    { '@type': 'WebPageElement', cssSelector: '#excel-method', name: 'How to Calculate Car Loan Eligibility in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#down-payment-affects', name: 'How Down Payment Affects Your Affordability' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Eligibility Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-improve', name: 'How to Improve Your Car Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CarLoanEligibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CarLoanEligibilityClient />
    </>
  );
}

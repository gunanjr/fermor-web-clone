import type { Metadata } from 'next';
import EducationLoanEligibilityClient from './EducationLoanEligibilityClient';

const PAGE_DATE_PUBLISHED = '2026-07-13';
const PAGE_DATE_MODIFIED = '2026-07-13';

export const metadata: Metadata = {
  title: 'Education Loan Eligibility Calculator: Check Study Loan Limit',
  description: 'Free education loan eligibility calculator for India. Check study loan limits for India or abroad by course fees, co-applicant income, and collateral. Free to use.',
  keywords: [
    'education loan eligibility calculator',
    'study loan eligibility calculator',
    'sbi education loan eligibility calculator',
    'education loan eligibility abroad',
    'student loan eligibility calculator',
    'how much education loan can i get',
    'education loan eligibility criteria',
    'education loan without collateral eligibility',
    'abroad education loan eligibility calculator',
    'education loan eligibility calculator based on salary',
    'education loan eligibility salary',
    'hdfc education loan eligibility calculator',
    'axis bank education loan eligibility',
    'vidya lakshmi education loan eligibility',
    'check study loan eligibility',
    'education loan max limit calculator',
    'student loan limit calculator',
    'non collateral education loan eligibility',
    'education loan calculator',
    'study loan calculator',
    'sbi scholar loan eligibility',
    'education loan calculator sbi',
    'student loan eligibility check',
    'education loan co applicant eligibility',
  ],
  openGraph: {
    title: 'Education Loan Eligibility Calculator: Check Study Loan Limit - Fermor',
    description: 'Check study loan eligibility for domestic or study abroad courses. Assess limits by fee structure, co-applicant salary, and collateral status. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/education-loan-eligibility-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-education-loan-eligibility-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Loan Eligibility Calculator - Fermor',
    description: 'Check education loan eligibility for India or abroad. Learn about collateral caps, co-applicant requirements, and interest rates. Free to use.',
    images: ['https://fermor.in/og-education-loan-eligibility-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/education-loan-eligibility-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Education Loan Eligibility', 'Study Abroad Finance', 'Vidya Lakshmi Portal', 'Co-applicant Income', 'Education Loan Collateral', 'Moratorium Interest', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Education Loan Eligibility Calculator', item: 'https://fermor.in/calculators/education-loan-eligibility-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is education loan eligibility calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Education loan eligibility is calculated based on three primary factors: the total course cost (fees and living expenses), the co-applicant\'s repayment capacity (monthly income and existing debts using the FOIR method), and whether collateral is offered. For loans above Rs 7.5 lakh, banks typically require collateral like property, fixed deposits, or liquid securities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the limit for an education loan without collateral in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Indian Banks\' Association (IBA) guidelines, education loans up to Rs 7.5 lakh do not require collateral or a third-party guarantee, and are backed by the Credit Guarantee Fund Scheme for Education Loans (CGFSEL). Lenders may extend higher non-collateral limits (up to Rs 20 lakh to Rs 40 lakh) for premier institutions like IITs, IIMs, or top global universities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can be a co-applicant for an education loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A co-applicant (or co-borrower) must be a close relative who has a stable income source. Eligible co-applicants include parents, siblings, spouse, or parent-in-law. The lender evaluates their monthly salary or business income to check repayment capability.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the moratorium period work for education loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The moratorium period (or repayment holiday) spans the course duration plus an additional 6 months to 1 year, during which the student is not required to pay EMIs. However, simple interest is charged by the bank during this period and added to the principal before regular monthly EMIs begin.',
      },
    },
    {
      '@type': 'Question',
      name: 'What interest rates apply to education loans in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Education loan interest rates generally range from 8.0% to 13.0% p.a. depending on the institution, course location, co-applicant\'s CIBIL score, and collateral provided. Public sector banks like SBI usually offer rates near 8.15% to 9.5%, while NBFCs range from 10.5% to 13%.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there any interest subsidy scheme for education loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The Central Sector Interest Subsidy Scheme (CSIS) offers full interest subsidies during the moratorium period for students from Economically Weaker Sections (EWS) with annual family income up to Rs 4.5 lakh, pursuing professional or technical courses in India.',
      },
    },
    {
      '@type': 'Question',
      name: 'What expenses are covered under a study loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Education loans cover tuition fees, hostel or accommodation rent, exam fees, laboratory fees, cost of books/equipment, travel expenses for study abroad, and purchase of a computer required for the course.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum repayment tenure for education loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per IBA norms, the maximum repayment tenure after the moratorium period ends is up to 15 years, regardless of the loan amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get an education loan for studying abroad?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Lenders fund up to Rs 1.5 crore or more for studies abroad, covering tuition fees and international living costs. Secured options are preferred, but non-collateral products exist for top-tier global universities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Vidya Lakshmi portal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vidya Lakshmi is a single-window portal developed by the Ministry of Finance and NSDL, enabling students to view, compare, and apply for education loans across multiple banks with a single Common Education Loan Application Form (CELAF).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Education Loan Eligibility Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/education-loan-eligibility-calculator',
  description: 'Evaluate eligible study loan amounts for domestic or study abroad courses. Calculate moratorium interest, co-applicant EMI limits, and collateral requirements.',
  featureList: [
    'Domestic and abroad education loan limit checks',
    'Collateral-based regulatory cap filters',
    'Co-applicant FOIR repayment calculation',
    'Moratorium period interest compounder',
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
  name: 'How to Check Education Loan Eligibility',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Education Loan Eligibility Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select course location and details',
      text: 'Select whether the course is in India or Abroad, and input the total course fee.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Provide co-applicant details',
      text: 'Enter the co-applicant net monthly income and any current debt EMIs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Specify collateral and credit rating',
      text: 'Indicate if you are offering collateral, and select the co-applicant\'s CIBIL score band.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the eligible limit and moratorium values',
      text: 'Verify maximum eligible loan amount, moratorium interest buildup, and projected post-study monthly EMIs.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Moratorium Period',
  alternateName: 'Repayment Holiday',
  description: 'A designated timeframe during and immediately after a course where the student is not obligated to make loan repayments, though interest accumulates.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Moratorium_(law)'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Education Loan Eligibility Calculator: Check Study Loan Limit',
  url: 'https://fermor.in/calculators/education-loan-eligibility-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Moratorium Period', alternateName: 'Repayment Holiday' }],
  audience: { '@type': 'Audience', audienceType: 'Indian students, study abroad aspirants, parents, co-borrowers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-education-loan-eligibility', name: 'What Is Education Loan Eligibility?' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-criteria', name: 'Education Loan Eligibility Criteria in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-banks-decide', name: 'How Banks Decide Education Loan Limits' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-by-fee', name: 'Education Loan Eligibility by Fee' },
    { '@type': 'WebPageElement', cssSelector: '#lender-rates-comparison', name: 'Education Loan Eligibility by Bank: Rate and Limit Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-scholar-loan', name: 'SBI Education Loan: Vidya Lakshmi and Scholar Loan' },
    { '@type': 'WebPageElement', cssSelector: '#studying-abroad-eligibility', name: 'Education Loan for Studying Abroad' },
    { '@type': 'WebPageElement', cssSelector: '#collateral-vs-non-collateral', name: 'Collateral vs Non-Collateral Education Loans' },
    { '@type': 'WebPageElement', cssSelector: '#csis-scheme', name: 'Central Government Interest Subsidy Scheme (CSIS)' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formula', name: 'Education Loan Eligibility in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#moratorium-mechanics', name: 'Education Loan Moratorium Period: How It Works' },
    { '@type': 'WebPageElement', cssSelector: '#documents-checklist', name: 'Documents Required for Education Loan' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-improve-eligibility', name: 'How to Improve Education Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function EducationLoanEligibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <EducationLoanEligibilityClient />
    </>
  );
}

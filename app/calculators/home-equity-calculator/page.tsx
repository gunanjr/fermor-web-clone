import type { Metadata } from 'next';
import HomeEquityClient from './HomeEquityClient';

const PAGE_DATE_PUBLISHED = '2026-07-30';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'Home Equity Calculator: Calculate Property Equity & Top-up Loan',
  description: 'Free home equity calculator for India. Calculate current home equity value, loan-to-value (LTV) ratio, borrowable top-up home loan limit, and 5-year projected equity growth. Free to use.',
  keywords: [
    'home equity calculator',
    'calculate home equity value india',
    'property equity calculator 2026',
    'home loan top up calculator india',
    'loan to value ltv ratio calculator',
    'borrowable home equity loan calculator',
    'how to calculate home equity in india',
    'home loan principal payoff equity',
    'property market value vs home loan balance',
    'mortgage equity calculator india',
    'refinance home loan top up amount',
    'top up home loan interest rate calculator',
    'section 24b tax deduction top up loan',
    'home equity line of credit india',
    'calculate net equity real estate india',
    'home equity growth schedule 5 years',
    'sbi home loan top up eligibility calculator',
    'hdfc top up home loan calculator',
    'negative equity mortgage calculator india',
  ],
  openGraph: {
    title: 'Home Equity Calculator: Calculate Property Equity & Top-up Loan - Fermor',
    description: 'Calculate net home equity value, LTV ratio, borrowable top-up home loan limit, and projected 5-year equity growth. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/home-equity-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-home-equity-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Equity Calculator - Fermor',
    description: 'Calculate net home equity, LTV %, top-up loan availability, and projected equity growth. Free to use.',
    images: ['https://fermor.in/og-home-equity-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/home-equity-calculator' },
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
    'Home Equity',
    'Loan-to-Value (LTV) Ratio',
    'Top-up Home Loan',
    'Home Loan Amortization',
    'Property Market Valuation',
    'Section 24(b) Tax Deduction',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Equity Calculator', item: 'https://fermor.in/calculators/home-equity-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is home equity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home equity is the portion of your property that you truly own unencumbered by debt: Net Equity = Current Market Value minus Outstanding Home Loan Balance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does home equity grow over time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home equity increases in two ways: through property market value appreciation and by reducing your outstanding mortgage principal with monthly home loan EMI payments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Loan-to-Value (LTV) ratio in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LTV ratio is the percentage of property value financed by a bank: LTV % = (Outstanding Loan Balance / Current Market Value) × 100. RBI caps initial home loan LTV between 75% to 90% depending on property value.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much top-up loan can I get against home equity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Indian banks (like SBI, HDFC Bank, ICICI Bank) sanction top-up home loans up to an 80% combined LTV limit: Borrowable Top-up = (Current Market Value × 80%) minus Outstanding Home Loan Balance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use home equity for home renovation or debt consolidation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, top-up home loans backed by home equity offer substantially lower interest rates (typically 8.75% to 9.5%) than unsecured personal loans (11% to 18%) and can fund renovation, higher education, or high-cost debt consolidation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What interest rates apply to top-up home loans in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Top-up home loan interest rates are typically 0.25% to 0.75% higher than standard home loan rates, usually ranging between 8.75% to 9.75% per annum.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to home equity if property prices drop?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If market property prices drop significantly, your home equity decreases. If prices fall below your remaining loan balance, it leads to negative equity (an underwater mortgage).',
      },
    },
    {
      '@type': 'Question',
      name: 'How does paying extra principal build home equity faster?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Making partial home loan prepayments reduces principal outstanding immediately, which directly increases your net home equity and lowers total interest paid.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a home equity top-up loan tax-deductible under Section 24?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Interest paid on a top-up loan is tax-deductible up to Rs 30,000 per year under Section 24(b) if used for repairs or renovation, or up to Rs 2 Lakh if used for property construction or acquisition.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are required to apply for a top-up home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banks require property valuation reports, updated income slips, 6 months bank statements, and a clean track record of timely home loan EMI payments for at least 12 to 24 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this home equity calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator computes current net equity, LTV percentage, borrowable top-up loan limit, and projects 5-year equity growth based on market value, loan balance, and appreciation rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home Equity Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-equity-calculator',
  description: 'Calculate net home equity value, LTV percentage, borrowable top-up home loan limit, and 5-year projected equity growth.',
  featureList: [
    'Current property market value input',
    'Outstanding home loan balance input',
    'Annual property appreciation rate % slider',
    'Home loan interest rate % & remaining tenure',
    'Current LTV ratio calculation',
    'Borrowable top-up loan limit at 80% LTV',
    'Donut chart equity split',
    '5-year projected equity schedule',
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
  name: 'How to Calculate Home Equity and Top-Up Loan Availability',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Equity Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Market Value', text: 'Input current estimated market value of your property.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter Loan Balance', text: 'Input remaining home loan principal balance.' },
    { '@type': 'HowToStep', position: 3, name: 'Set Appreciation & Loan Terms', text: 'Input expected property growth rate %, interest rate %, and remaining tenure.' },
    { '@type': 'HowToStep', position: 4, name: 'Review Equity and Top-Up Limit', text: 'View net equity in Rupees and %, current LTV %, and borrowable top-up loan limit.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Home Equity',
  alternateName: 'Property Equity',
  description: 'The real unencumbered financial value of a property owned by the homeowner after deducting outstanding mortgage debt.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Home_equity',
    'https://www.wikidata.org/wiki/Q1198538',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Equity Calculator: Calculate Property Equity & Top-up Loan',
  url: 'https://fermor.in/calculators/home-equity-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Home Equity', alternateName: 'Property Equity' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Homeowners, mortgage borrowers, real estate investors in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-home-equity', name: 'What Is Home Equity and How Does It Work in India?' },
    { '@type': 'WebPageElement', cssSelector: '#how-equity-grows', name: 'How Home Equity Grows: Appreciation vs Amortization' },
    { '@type': 'WebPageElement', cssSelector: '#ltv-and-topup-limits', name: 'Loan-to-Value (LTV) Ratios and Top-Up Loan Limits' },
    { '@type': 'WebPageElement', cssSelector: '#topup-vs-personal-loans', name: 'Top-Up Home Loan vs Personal Loan vs Gold Loan' },
    { '@type': 'WebPageElement', cssSelector: '#tax-benefits-topup', name: 'Tax Deductions on Top-Up Home Loans Under Section 24(b)' },
    { '@type': 'WebPageElement', cssSelector: '#projected-equity-table', name: '5-Year Home Equity Growth and Amortization Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Home Equity Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HomeEquityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomeEquityClient />
    </>
  );
}

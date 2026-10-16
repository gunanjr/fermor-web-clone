import type { Metadata } from 'next';
import DownPaymentPlannerClient from './DownPaymentPlannerClient';

const PAGE_DATE_PUBLISHED = '2026-07-28';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'Down Payment Planner Calculator: Save for House Purchase',
  description: 'Free home down payment planner for India. Calculate inflation-adjusted target house price, required 20% down payment, and monthly SIP to buy your dream home. Free to use.',
  keywords: [
    'down payment planner calculator',
    'home down payment savings calculator india',
    'house down payment sip planner',
    'calculate down payment for home loan india',
    'home buying savings target calculator',
    'property down payment requirement india',
    'flat down payment calculator',
    'rbi 20 percent down payment rule',
    'monthly sip to save for house down payment',
    'inflation adjusted home buying target calculator',
    'mumbai house down payment planner',
    'bangalore flat down payment calculator',
    'delhi ncr home down payment target',
    'how to save 20 percent down payment for flat',
    'epf withdrawal for house purchase down payment',
    'stamp duty and registration cash required india',
    'rbi ltv ratio caps home loan 2026',
    'mutual fund sip for house down payment',
    'down payment formula with inflation',
    'first time home buyer down payment planner',
    'hyderabad flat purchase down payment',
    'pune property down payment calculator',
    'chennai house savings calculator',
    'real estate price inflation down payment impact',
    'savings gap for home purchase calculator',
    'down payment corpus goal planning india',
  ],
  openGraph: {
    title: 'Down Payment Planner Calculator: Save for House Purchase - Fermor',
    description: 'Calculate inflation-adjusted home price targets, required 20% down payment, and monthly SIP savings in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/down-payment-planner-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-down-payment-planner-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Down Payment Planner Calculator - Fermor',
    description: 'Plan your home down payment target with property inflation and monthly SIP growth in India. Free to use.',
    images: ['https://fermor.in/og-down-payment-planner-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/down-payment-planner-calculator' },
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
    'Home Down Payment',
    'RBI Loan-to-Value (LTV) Norms',
    'Property Price Inflation',
    'SIP Investment for Goal',
    'Home Loan Eligibility',
    'EPF Withdrawal Rules',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Down Payment Planner Calculator', item: 'https://fermor.in/calculators/down-payment-planner-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much down payment is required for a home loan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI guidelines, banks finance up to 75% to 90% of a property agreement value depending on loan size, requiring home buyers to contribute at least 10% to 25% upfront as an equity down payment.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does property price inflation impact down payment goals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Property price inflation (typically 5% to 8% per annum in Indian metropolitan hubs) compounds future house prices, meaning a 20% down payment target grows significantly larger each year purchase is delayed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best investment asset to accumulate a home down payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For horizons under 3 years, conservative arbitrage funds or multi-asset debt funds protect capital. For 3 to 7 year horizons, hybrid balanced advantage or flexicap equity mutual fund SIPs provide optimal inflation-adjusted growth.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does down payment include stamp duty and registration charges?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, commercial banks are prohibited by RBI from financing stamp duty (4% to 7%) or registration fees (1%). Home buyers must fund all statutory taxes entirely from out-of-pocket cash savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw EPF balance for a house down payment in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, under Paragraph 68B of the EPF Scheme, employees with at least 5 years of continuous service can withdraw up to 90% of their provident fund balance for acquiring or constructing a residential house.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is monthly SIP calculated for a down payment target?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly SIP is calculated using the Future Value annuity formula: Monthly SIP = Net Savings Gap × [ r / ((1 + r)^n - 1) ], where r is the monthly expected return rate and n is the total investment horizon in months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are RBI Loan-to-Value (LTV) ratio limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RBI mandates maximum LTV caps: 90% for loans up to Rs 30 Lakh, 80% for loans between Rs 30 Lakh and Rs 75 Lakh, and 75% for loans above Rs 75 Lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is paying a higher down payment beneficial for home loan borrowers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, paying a higher down payment lowers loan principal, reduces monthly EMI burden, improves loan approval terms, and saves lakhs of rupees in cumulative interest over a 20-year tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to calculate down payment for a 1 Crore flat in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a 1 Crore flat with an 80% LTV bank loan, the 20% down payment is Rs 20 Lakh. Additionally, budget approx 6% (Rs 6 Lakh) for stamp duty and registration plus Rs 3 Lakh for builder deposits and legal fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 3-20-30-40 rule of home buying?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 3-20-30-40 rule advises: property price under 3x annual household income, at least 20% down payment saved, monthly EMI under 30% of gross salary, and holding 40% of property value in liquid net worth.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this down payment planner calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator projects inflation-adjusted house price, total down payment required, net savings gap after compounding existing savings, and exact monthly SIP needed to reach your target on schedule.',
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
  name: 'Down Payment Planner Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/down-payment-planner-calculator',
  description: 'Plan home down payment savings in India, incorporating property price inflation, existing savings, and monthly SIP goal calculation.',
  featureList: [
    'Target Down Payment SIP mode',
    'Time to Goal mode',
    'Property price inflation adjustment',
    'Existing savings offset',
    'RBI LTV ratio percentage customization',
    'Donut chart capital breakdown',
    'Year-by-year savings schedule',
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
  name: 'How to Plan Your Home Down Payment Savings',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Down Payment Planner Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Target House Price', text: 'Input current agreement price of your desired property.' },
    { '@type': 'HowToStep', position: 2, name: 'Set Down Payment % and Timeline', text: 'Select target down payment percentage (typically 20%) and target buying horizon in years.' },
    { '@type': 'HowToStep', position: 3, name: 'Input Inflation and Existing Savings', text: 'Enter expected real estate price growth and current accumulated savings dedicated to home purchase.' },
    { '@type': 'HowToStep', position: 4, name: 'Review Monthly SIP Target', text: 'View inflation-adjusted target down payment, savings gap, and required monthly mutual fund SIP.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Home Down Payment',
  alternateName: 'Upfront Property Equity Contribution',
  description: 'The initial upfront cash payment made by a property purchaser towards the agreement price of a home, representing the equity share not financed by a mortgage loan.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Down_payment',
    'https://www.wikidata.org/wiki/Q1198463',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Down Payment Planner Calculator: Save for House Purchase',
  url: 'https://fermor.in/calculators/down-payment-planner-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Home Down Payment', alternateName: 'Upfront Property Equity Contribution' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'First-time home buyers, salaried employees, real estate investors in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-down-payment', name: 'What Is a Home Down Payment?' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-ltv-norms', name: 'RBI Loan-to-Value (LTV) Caps and Down Payment Mandates' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-impact', name: 'Property Price Inflation and The Compounding Down Payment Gap' },
    { '@type': 'WebPageElement', cssSelector: '#sip-formula', name: 'Monthly SIP Down Payment Formula' },
    { '@type': 'WebPageElement', cssSelector: '#out-of-pocket-expenses', name: 'Out-of-Pocket Expenses Beyond the Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#epf-withdrawal', name: 'Utilizing EPF and Financial Assets for Home Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#city-wise-matrix', name: 'Down Payment Planning Matrix Across Indian Metros' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Down Payment Planner Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DownPaymentPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DownPaymentPlannerClient />
    </>
  );
}

import type { Metadata } from 'next';
import HomeBuyingTotalCostClient from './HomeBuyingTotalCostClient';

const PAGE_DATE_PUBLISHED = '2026-07-28';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'Home Buying Total Cost Calculator: Hidden Fees & Cash Needed',
  description: 'Free home buying total cost calculator for India. Calculate all-inclusive property price including stamp duty, registration, GST, corpus fund, interiors, and upfront cash needed. Free to use.',
  keywords: [
    'home buying total cost calculator',
    'total cost of buying a flat in india',
    'hidden costs of buying house in india',
    'upfront cash needed for house purchase india',
    'stamp duty and registration cost calculator',
    'gst on under construction flat calculator',
    'property interior budget planner india',
    'society maintenance corpus fund calculator',
    'all inclusive house price calculator',
    'mumbai flat total cost calculator',
    'bangalore property total purchase cost',
    'delhi ncr home buying hidden expenses',
    'home loan down payment and stamp duty cash',
    'legal advocate fees property purchase india',
    'builder corpus fund deposit calculator',
    'bank home loan processing fee calculator',
    'out of pocket house buying calculator',
    'hyderabad flat purchase total cost',
    'pune real estate total acquisition cost',
    'chennai property buying hidden fees',
    'rbi ltv ratio and stamp duty out of pocket',
    'home loan 80 percent agreement value calculation',
    'flat interior budget estimator india',
    'under construction flat total cost breakdown',
    'ready to move flat GST exemption calculator',
    'home purchase budget calculator india',
  ],
  openGraph: {
    title: 'Home Buying Total Cost Calculator: Hidden Fees & Cash Needed - Fermor',
    description: 'Calculate all-inclusive home buying costs: agreement price, stamp duty, registration, GST, society corpus fund, legal fees, and interiors in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/home-buying-total-cost-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-home-buying-total-cost-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Buying Total Cost Calculator - Fermor',
    description: 'Calculate total house purchase cost and upfront cash required in India. Free to use.',
    images: ['https://fermor.in/og-home-buying-total-cost-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/home-buying-total-cost-calculator' },
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
    'Home Buying Hidden Costs',
    'Stamp Duty and Registration',
    'GST on Real Estate',
    'Society Maintenance Deposit',
    'Bank Loan Processing Fees',
    'Interior Renovation Budget',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Buying Total Cost Calculator', item: 'https://fermor.in/calculators/home-buying-total-cost-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What hidden costs are involved in buying a house in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Beyond the base agreement price, home buyers must fund statutory stamp duty (4% to 7%), registration fees (1%), GST on under-construction flats (1% to 5%), society corpus sinking deposits, legal search fees, bank processing fees, and interior woodwork expenses.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much upfront cash is needed to buy a house in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home buyers typically require 25% to 35% of total property value in liquid cash to finance the mandatory 20% down payment plus non-fundable taxes, registration charges, and possession deposits.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GST applicable on ready-to-move-in flats in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, GST is not applicable on completed residential properties that have received a valid Occupancy Certificate (OC) or Completion Certificate from municipal authorities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the GST rate on under-construction flats?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GST is levied at 1% without Input Tax Credit (ITC) for affordable housing (carpet area up to 60/90 sqm and value up to Rs 45 Lakh) and 5% without ITC for standard residential projects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a bank home loan cover stamp duty and interior costs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, under RBI directives, commercial banks are prohibited from adding stamp duty, registration charges, or interior fitout costs into the sanctioned home loan principal amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a builder society maintenance corpus fund?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A corpus fund is a one-time non-refundable deposit (typically Rs 1 Lakh to Rs 3 Lakh) collected by builders at handover and transferred to the RWA to fund long-term structural repairs.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does legal verification and title search cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Independent advocate verification and 30-year title search generally cost between Rs 15,000 and Rs 35,000 depending on location and documentation complexity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average cost of residential interiors per sq ft in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Basic modular kitchen and wardrobes cost Rs 800 to Rs 1,200 per sq ft, standard full-home interiors cost Rs 1,300 to Rs 1,800 per sq ft, and premium luxury finishes exceed Rs 2,200 per sq ft.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to calculate total home purchase cost for an 80 Lakh flat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For an 80 Lakh flat, budget approx Rs 4.8L stamp duty (6%), Rs 80k registration (1%), Rs 2L society corpus, Rs 25k legal fee, and Rs 6L interiors, totaling approx Rs 93.85 Lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is bank home loan processing fee in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank home loan processing charges range from 0.25% to 0.50% of the loan amount, typically capped between Rs 5,000 and Rs 25,000 plus 18% GST.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this home buying total cost calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator aggregates agreement price, state stamp duty, registration, GST, builder deposits, advocate fees, and interior budgets to compute all-inclusive acquisition cost and total out-of-pocket cash.',
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
  name: 'Home Buying Total Cost Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-buying-total-cost-calculator',
  description: 'Calculate all-inclusive home buying costs and upfront cash requirements in India including stamp duty, registration, GST, and interiors.',
  featureList: [
    'All-Inclusive Cost Breakdown mode',
    'Out-of-Pocket Cash Needed mode',
    'State-wise stamp duty & registration inputs',
    'GST under-construction rate selector',
    'Society corpus fund deposit calculation',
    'Interior decoration budget planner',
    'Donut chart expense split',
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
  name: 'How to Calculate Total House Purchase Cost and Upfront Cash',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Buying Total Cost Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Base Agreement Price', text: 'Input quoted builder price or agreed resale property value.' },
    { '@type': 'HowToStep', position: 2, name: 'Select State and Construction Status', text: 'Choose your state for stamp duty rates and select under-construction or ready-to-move-in.' },
    { '@type': 'HowToStep', position: 3, name: 'Customize Ancillary & Interior Budgets', text: 'Adjust society corpus, legal fee, and interior furnishing budget per sq ft.' },
    { '@type': 'HowToStep', position: 4, name: 'Review Total Outlay and Cash Needed', text: 'View all-inclusive property acquisition cost, bank loan eligibility, and net out-of-pocket cash.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Total Home Acquisition Cost',
  alternateName: 'All-Inclusive Property Purchase Outlay',
  description: 'The aggregate financial capital required to purchase a residential property, including agreement value, statutory taxes, registration, builder deposits, legal fees, and interior outfitting.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Real_estate_transaction',
    'https://www.wikidata.org/wiki/Q2511456',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Buying Total Cost Calculator: Hidden Fees & Cash Needed',
  url: 'https://fermor.in/calculators/home-buying-total-cost-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Total Home Acquisition Cost', alternateName: 'All-Inclusive Property Purchase Outlay' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Home buyers, real estate investors, NRI property buyers in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-total-home-cost', name: 'What Is the Total Cost of Buying a House in India?' },
    { '@type': 'WebPageElement', cssSelector: '#upfront-cash-rule', name: 'The 25% to 35% Upfront Cash Rule for Home Buyers' },
    { '@type': 'WebPageElement', cssSelector: '#statutory-taxes', name: 'Statutory Taxes: Stamp Duty, Registration, & Metro Cess' },
    { '@type': 'WebPageElement', cssSelector: '#gst-regulations', name: 'GST Rules on Under-Construction vs Ready-to-Move Flats' },
    { '@type': 'WebPageElement', cssSelector: '#ancillary-builder-charges', name: 'Builder & Society Ancillary Charges and Deposits' },
    { '@type': 'WebPageElement', cssSelector: '#interior-furnishing-budget', name: 'Interior Renovation and Furnishing Budget Guidelines' },
    { '@type': 'WebPageElement', cssSelector: '#all-inclusive-breakdown-table', name: 'All-Inclusive Home Acquisition Cost Breakdown Table' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Home Buying Total Cost Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HomeBuyingTotalCostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomeBuyingTotalCostClient />
    </>
  );
}

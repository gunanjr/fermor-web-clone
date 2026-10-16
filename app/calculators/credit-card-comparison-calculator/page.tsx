import type { Metadata } from 'next';
import CreditCardComparisonClient from './CreditCardComparisonClient';

const PAGE_DATE_PUBLISHED = '2026-07-24';
const PAGE_DATE_MODIFIED = '2026-07-24';

export const metadata: Metadata = {
  title: 'Credit Card Comparison Calculator: Net Rewards & Fee Savings',
  description: 'Free credit card comparison calculator for India. Compare two credit cards side-by-side on cashback, reward points, annual fees, and net savings. Free to use.',
  keywords: [
    'credit card comparison calculator',
    'compare credit cards india',
    'credit card reward comparison calculator',
    'sbi cashback vs amazon pay icici calculator',
    'hdfc regalia vs axis atlas calculator',
    'flipkart axis vs sbi cashback comparison',
    'credit card annual fee vs reward calculator',
    'best cashback credit card calculator',
    'credit card side by side comparison tool',
    'reward point redemption value calculator',
    'lounge access credit card value estimator',
  ],
  openGraph: {
    title: 'Credit Card Comparison Calculator: Net Rewards & Fee Savings - Fermor',
    description: 'Compare two credit cards side-by-side on annual cashback, reward points, renewal fees, and net value in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/credit-card-comparison-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-credit-card-comparison-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Card Comparison Calculator - Fermor',
    description: 'Compare two credit cards side-by-side on cashback, annual fees, and net reward savings in India. Free to use.',
    images: ['https://fermor.in/og-credit-card-comparison-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/credit-card-comparison-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Credit Card Comparison India', 'Cashback vs Rewards', 'Annual Fee vs Milestone Reversal', 'Lounge Access Valuation', 'Reward Point Conversion Rate', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Credit Card Comparison Calculator', item: 'https://fermor.in/calculators/credit-card-comparison-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I compare two credit cards in India effectively?', acceptedAnswer: { '@type': 'Answer', text: 'To compare credit cards effectively, evaluate net annual returns by subtracting annual renewal fees from projected annual cashback and reward point value based on your actual spending habits.' } },
    { '@type': 'Question', name: 'Is a paid credit card better than a lifetime free credit card?', acceptedAnswer: { '@type': 'Answer', text: 'A paid credit card with an annual fee is better if the additional cashback and benefits (like airport lounge access, golf access, or accelerated online rewards) significantly exceed the fee amount.' } },
    { '@type': 'Question', name: 'What is reward point conversion rate in credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Reward point conversion rate is the monetary cash value of 1 reward point when redeemed for statement credit, catalog vouchers, air miles, or hotel points (typically ranging from Rs 0.20 to Rs 1.00 per point).' } },
    { '@type': 'Question', name: 'How do milestone bonus rewards work on premium credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Milestone bonus rewards grant extra reward points, flight vouchers, or annual fee waivers when you achieve specific annual spend targets (such as Rs 1 Lakh, Rs 2.5 Lakh, or Rs 4 Lakh spend in a year).' } },
    { '@type': 'Question', name: 'What is airport lounge access valuation on credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Complimentary airport lounge access in India is valued at roughly Rs 1,000 to Rs 1,500 per visit, providing complimentary food, beverages, and comfortable seating before flights.' } },
    { '@type': 'Question', name: 'How does this credit card comparison calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes gross annual cashback/rewards for two cards based on your monthly spending profile, subtracts respective annual fees, factors in milestone waivers, and displays side-by-side net monetary value.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Credit Card Comparison Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/credit-card-comparison-calculator',
  description: 'Compare two credit cards side-by-side on cashback, reward points, annual fees, and net annual savings in India.',
  featureList: ['Side-by-side card comparison mode', 'Custom reward rate & annual fee inputs', 'Net reward winner badge indicator', 'Fee milestone reversal tracker', 'Donut chart reward comparison', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Compare Two Credit Cards Side-by-Side', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Credit Card Comparison Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter estimated monthly spend', text: 'Input total expected monthly expenditure on your credit cards.' },
    { '@type': 'HowToStep', position: 2, name: 'Set Card A reward rate and fee', text: 'Input Card A reward percentage and annual renewal fee.' },
    { '@type': 'HowToStep', position: 3, name: 'Set Card B reward rate and fee', text: 'Input Card B reward percentage and annual renewal fee.' },
    { '@type': 'HowToStep', position: 4, name: 'Compare net annual monetary value', text: 'View net annual savings difference and identify the winning credit card.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Net Credit Card Reward Value', alternateName: 'Net Card Return',
  description: 'The net annual monetary profit from a credit card calculated as total annual reward earnings minus the annual renewal fee.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Credit Card Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Credit_card_rewards_program'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Credit Card Comparison Calculator: Net Rewards & Fee Savings',
  url: 'https://fermor.in/calculators/credit-card-comparison-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Net Credit Card Reward Value', alternateName: 'Net Card Return' }],
  audience: { '@type': 'Audience', audienceType: 'Credit card applicants, financial planners, reward enthusiasts', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-card-comparison', name: 'What Is a Credit Card Comparison Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#comparison-formula', name: 'Net Reward Comparison Formula' },
    { '@type': 'WebPageElement', cssSelector: '#card-ranking-table', name: 'Popular Card Combinations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CreditCardComparisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CreditCardComparisonClient />
    </>
  );
}

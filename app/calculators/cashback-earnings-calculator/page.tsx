import type { Metadata } from 'next';
import CashbackEarningsClient from './CashbackEarningsClient';

const PAGE_DATE_PUBLISHED = '2026-07-24';
const PAGE_DATE_MODIFIED = '2026-08-04';

export const metadata: Metadata = {
  title: 'Cashback Earnings Calculator: Monthly & Annual Rewards',
  description: 'Free cashback earnings calculator for India. Calculate monthly credit card cashback rewards, annual fee waivers, and net return rates. Free to use.',
  keywords: [
    'cashback earnings calculator',
    'credit card cashback calculator',
    'hsbc cashback credit card calculator',
    'amazon pay icici cashback calculator',
    'sbi cashback credit card calculator',
    'axis ace cashback calculator',
    'flipkart axis credit card cashback calculator',
    'swiggy hdfc cashback calculator',
    'monthly credit card rewards calculator',
    'annual fee waiver milestone calculator',
    'credit card cashback rate india',
    'online shopping cashback calculator',
    'utility bill payment cashback estimator',
    'fuel surcharge waiver calculator',
    'calculate credit card rewards',
    'credit card statement credit calculator',
    'cashback vs reward points calculator',
    'best cashback credit card india',
    'credit card fee waiver calculator',
    'hDFC millennia cashback calculator',
    'rupay upi cashback calculator',
    'credit card reward return rate',
    'annual net cashback calculator',
    'credit card spend milestone calculator',
    'online vs offline cashback calculator',
  ],
  openGraph: {
    title: 'Cashback Earnings Calculator: Monthly & Annual Rewards - Fermor',
    description: 'Calculate monthly credit card cashback, annual reward gains, and fee waiver milestones across Indian credit cards. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/cashback-earnings-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-cashback-earnings-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cashback Earnings Calculator - Fermor',
    description: 'Calculate monthly credit card cashback, annual reward gains, and net return rates in India. Free to use.',
    images: ['https://fermor.in/og-cashback-earnings-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/cashback-earnings-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: ['Credit Card Cashback India', 'SBI Cashback Credit Card', 'Amazon Pay ICICI Card', 'Flipkart Axis Bank Card', 'Annual Fee Waiver Milestone', 'Merchant Category Code MCC', 'Account Aggregator Framework', 'RBI Guidelines'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Cashback Earnings Calculator', item: 'https://fermor.in/calculators/cashback-earnings-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is credit card cashback calculated in India?', acceptedAnswer: { '@type': 'Answer', text: 'Credit card cashback is calculated by multiplying category spend amounts by the card designated cashback percentage (such as 5% on online shopping or 1% on offline purchases).' } },
    { '@type': 'Question', name: 'Which credit card offers the highest cashback in India?', acceptedAnswer: { '@type': 'Answer', text: 'Cards like SBI Cashback Credit Card (5% flat online), Amazon Pay ICICI Card (5% for Prime users), and Swiggy HDFC Card offer top cashback rates up to monthly capping limits.' } },
    { '@type': 'Question', name: 'Is cashback credited directly to bank account or statement?', acceptedAnswer: { '@type': 'Answer', text: 'Most cashback credit cards automatically credit accumulated cashback directly into your monthly statement balance, reducing your net payable bill.' } },
    { '@type': 'Question', name: 'What is monthly capping on cashback credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Monthly capping is the maximum upper limit of cashback an account can earn in a billing cycle, such as Rs 5,000 max monthly cashback on SBI Cashback Card.' } },
    { '@type': 'Question', name: 'How does annual fee waiver work on cashback credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Most premium cashback cards reverse or waive annual renewal fees if your total annual spend exceeds a specific milestone, typically Rs 1 Lakh to Rs 3.5 Lakh per year.' } },
    { '@type': 'Question', name: 'Are fuel and utility bill spends eligible for cashback?', acceptedAnswer: { '@type': 'Answer', text: 'Many cards exclude fuel, wallet loads, rent, and government transactions from standard cashback, though specialized cards offer 1% to 5% on utility bill payments.' } },
    { '@type': 'Question', name: 'Is cashback earned on credit cards taxable in India?', acceptedAnswer: { '@type': 'Answer', text: 'Cashback received as a discount or statement credit on personal credit card spending is generally considered a purchase discount and is not subject to income tax under Section 56(2)(x).' } },
    { '@type': 'Question', name: 'What is the difference between reward points and direct cashback?', acceptedAnswer: { '@type': 'Answer', text: 'Direct cashback is credited as real currency statement credit, whereas reward points must be manually redeemed for vouchers, catalog products, or air miles.' } },
    { '@type': 'Question', name: 'Can I earn cashback on UPI transactions with RuPay credit cards?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, RuPay credit cards linked to UPI apps earn 0.5% to 3% cashback or reward points on UPI merchant scan-and-pay transactions.' } },
    { '@type': 'Question', name: 'How does this cashback calculator estimate total earnings?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator splits your monthly expenses into online, grocery, dining, and utility categories, applies card reward rates, checks monthly capping and fee waiver milestones, and projects net annual earnings.' } },
    { '@type': 'Question', name: 'What happens if I carry a balance while earning cashback?', acceptedAnswer: { '@type': 'Answer', text: 'Carrying a revolving credit card balance incurs interest rates of 36% to 42% annually, which far exceeds any 5% cashback earned. Always pay monthly bills in full.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Cashback Earnings Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/cashback-earnings-calculator',
  description: 'Calculate monthly and annual credit card cashback rewards, fee waiver milestones, and net return rates in India.',
  featureList: ['Category spend split mode vs Total spend mode', '5% online shopping cashback calculator', 'Utility bill and dining reward estimator', 'Annual fee waiver milestone tracker', 'Net annual reward return rate %', 'Donut chart earnings breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Monthly and Annual Credit Card Cashback', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Cashback Earnings Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter monthly online shopping spend', text: 'Input monthly spend on Amazon, Flipkart, Myntra, etc.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter grocery, dining, and utility bill spends', text: 'Enter monthly spending across food delivery, dining, and utilities.' },
    { '@type': 'HowToStep', position: 3, name: 'Set card cashback structure and annual fee', text: 'Select card cashback rate (e.g. 5% online) and annual renewal fee.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net annual cashback earnings', text: 'View total monthly cashback, net annual earnings, and fee waiver status.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Credit Card Cashback Rate', alternateName: 'Statement Credit Return %',
  description: 'The percentage of transaction spend credited back to a credit card statement balance as real monetary rewards.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Credit Card Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Cashback_reward_program'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Cashback Earnings Calculator: Monthly & Annual Rewards',
  url: 'https://fermor.in/calculators/cashback-earnings-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Credit Card Cashback Rate', alternateName: 'Statement Credit Return %' }],
  audience: { '@type': 'Audience', audienceType: 'Credit card users, shoppers, reward optimizers, financial planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-cashback-calculator', name: 'What Is a Cashback Earnings Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#cashback-formula', name: 'Credit Card Cashback Formula' },
    { '@type': 'WebPageElement', cssSelector: '#top-cashback-cards-table', name: 'Popular Indian Cashback Cards Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-maximize-cashback', name: 'How to Maximize Credit Card Cashback in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CashbackEarningsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CashbackEarningsClient />
    </>
  );
}

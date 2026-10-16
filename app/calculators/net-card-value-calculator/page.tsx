import type { Metadata } from 'next';
import NetCardValueClient from './NetCardValueClient';

const PAGE_DATE_PUBLISHED = '2026-07-27';
const PAGE_DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: 'Net Card Value Calculator: True Credit Card Value',
  description: 'Free net credit card value calculator for India. Calculate real annual rewards, lounge perks, fee waivers, and net return rates. Free to use.',
  keywords: [
    'net card value calculator',
    'credit card net value calculator',
    'credit card reward value calculator',
    'credit card fee waiver calculator',
    'credit card annual fee calculator',
    'credit card cashback value calculator',
    'true cost of credit card calculator',
    'hdfc regalia gold net value',
    'sbi cashback card net reward calculator',
    'axis atlas reward calculator',
    'icici sapphiro card net value',
    'hdfc infinia net reward yield',
    'credit card milestone reward calculator',
    'credit card lounge access value calculator',
    'credit card annual fee vs reward calculator',
    'best credit card value calculator india',
    'credit card return on spend calculator',
    'credit card reward point to rupee calculator',
    'credit card net reward rate calculator',
    'credit card profitability calculator',
    'is credit card annual fee worth it calculator',
    'nri credit card value calculator',
    'premium credit card reward calculator',
  ],
  openGraph: {
    title: 'Net Card Value Calculator: True Credit Card Value - Fermor',
    description: 'Calculate the true net annual value of your credit card after annual fees, fee waiver milestones, category rewards, and lounge access perks. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/net-card-value-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-net-card-value-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Card Value Calculator - Fermor',
    description: 'Calculate true net credit card value after annual fees, milestone perks, and cashback. Free to use.',
    images: ['https://fermor.in/og-net-card-value-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/net-card-value-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Net Card Value', 'Credit Card Rewards', 'Cashback Calculation', 'Annual Fee Waiver', 'Milestone Perks', 'Lounge Access Value', 'Reward Rate Yield', 'SBI Cashback Card', 'HDFC Regalia Gold', 'Axis Atlas', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Net Card Value Calculator', item: 'https://fermor.in/calculators/net-card-value-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is net card value for a credit card?', acceptedAnswer: { '@type': 'Answer', text: 'Net card value is the total monetary benefit earned from a credit card over one year (cashback, reward points, lounge access, milestone vouchers) minus the effective annual fee paid after applying fee waivers.' } },
    { '@type': 'Question', name: 'How do you calculate net credit card reward return rate?', acceptedAnswer: { '@type': 'Answer', text: 'Net reward return rate is calculated by dividing your Net Annual Card Value (total perks minus fee paid) by your total annual spend, then multiplying by 100 to get a net percentage yield.' } },
    { '@type': 'Question', name: 'How does an annual fee waiver threshold work?', acceptedAnswer: { '@type': 'Answer', text: 'Most premium Indian credit cards waive the upcoming year\'s annual fee if your total spend in the preceding 12 months meets or exceeds a specified threshold, such as Rs 2 lakh for HDFC Regalia Gold or Rs 10 lakh for HDFC Infinia.' } },
    { '@type': 'Question', name: 'What is the monetary value of airport lounge access?', acceptedAnswer: { '@type': 'Answer', text: 'Domestic airport lounge access in India is typically valued at Rs 800 to Rs 1,200 per visit based on walk-in rates, while international lounge access via Priority Pass or DreamFolks is valued at Rs 2,000 to Rs 3,000 per visit.' } },
    { '@type': 'Question', name: 'Is SBI Cashback Card worth the Rs 999 annual fee?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. SBI Cashback offers 5% cashback on online spends up to Rs 5,000 monthly. Spending Rs 20,000 monthly online yields Rs 12,000 annual cashback, far exceeding the Rs 999 fee, which is also waived on Rs 2 lakh annual spend.' } },
    { '@type': 'Question', name: 'How do milestone bonuses affect credit card value?', acceptedAnswer: { '@type': 'Answer', text: 'Milestone bonuses provide extra reward points, flight tickets, or brand vouchers when you reach specific annual spend milestones, effectively boosting your overall return rate by 1% to 3% on targeted spend tiers.' } },
    { '@type': 'Question', name: 'Should I keep a credit card if the net annual value is negative?', acceptedAnswer: { '@type': 'Answer', text: 'If a credit card generates negative net annual value and offers no non-monetary benefits like credit history length or emergency protection, you should consider upgrading, downgrading to a lifetime free card, or closing it.' } },
    { '@type': 'Question', name: 'What is a good net reward rate for an Indian credit card?', acceptedAnswer: { '@type': 'Answer', text: 'A net reward rate of 1.5% to 3% is considered good for general spending cards, while specialized cashback or travel cards like SBI Cashback, Axis Atlas, or HDFC Infinia can deliver net returns between 4% and 10% on optimized spend.' } },
    { '@type': 'Question', name: 'How does GST affect credit card annual fees?', acceptedAnswer: { '@type': 'Answer', text: 'Credit card annual fees in India attract 18% GST. A nominal fee of Rs 1,000 costs Rs 1,180 in total, which must be factored into your net annual fee calculation.' } },
    { '@type': 'Question', name: 'What is a lifetime free (LTF) credit card?', acceptedAnswer: { '@type': 'Answer', text: 'A lifetime free credit card charges zero joining fee and zero annual recurring fee unconditionally, ensuring every rupee of reward or cashback earned is 100% net profit.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Net Card Value Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/net-card-value-calculator',
  description: 'Calculate the true net annual value of your credit card based on annual fees, spend milestones, cashback %, fee waiver thresholds, and lounge access perks.',
  featureList: ['Net Annual Card Value calculation', 'Fee waiver threshold detection', 'Category cashback and reward point conversion', 'Lounge access and milestone perk valuation', 'Donut chart benefit breakdown', 'Top Indian credit cards benchmark table', 'Spend-to-value schedule table', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Net Credit Card Value', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Net Card Value Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter annual fee and GST', text: 'Enter the card annual fee. The calculator automatically checks if your annual spend qualifies for a fee waiver.' },
    { '@type': 'HowToStep', position: 2, name: 'Set monthly spend and category reward rate', text: 'Enter your average net monthly card spend and average cashback or reward point percentage rate.' },
    { '@type': 'HowToStep', position: 3, name: 'Add lounge access and milestone perk values', text: 'Include the monetary value of airport lounge visits, milestone flight/gift vouchers, and renewal perks.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net card value and return rate', text: 'See your total annual monetary benefit, effective fee paid, net profit, and net return percentage on total spend.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Net Card Value', alternateName: 'Net Credit Card Return Rate',
  description: 'The net annual financial gain derived from a credit card after deducting effective annual fees and GST from total cashback, reward points, and milestone benefits.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Credit Card and Banking Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Credit_card_rewards_program'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Net Card Value Calculator: True Credit Card Value',
  url: 'https://fermor.in/calculators/net-card-value-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Net Card Value', alternateName: 'Net Credit Card Return Rate' }],
  audience: { '@type': 'Audience', audienceType: 'Indian credit card users, premium cardholders, reward maximizers, NRI investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-net-value', name: 'What Is Net Card Value' },
    { '@type': 'WebPageElement', cssSelector: '#net-value-formula', name: 'Net Card Value Formula' },
    { '@type': 'WebPageElement', cssSelector: '#fee-waiver-rules', name: 'Annual Fee Waiver Thresholds' },
    { '@type': 'WebPageElement', cssSelector: '#card-comparison', name: 'Top Credit Cards Net Value Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#lounge-milestone-perks', name: 'Valuing Lounge Access and Milestones' },
    { '@type': 'WebPageElement', cssSelector: '#cashback-vs-reward-points', name: 'Cashback vs Reward Points Net Value' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formula', name: 'Net Card Value Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#spend-table', name: 'Spend vs Net Value Table' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes in Credit Card Valuation' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-improve', name: 'How to Maximize Net Card Value' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function NetCardValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <NetCardValueClient />
    </>
  );
}

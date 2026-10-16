import type { Metadata } from 'next';
import ChildInsuranceClient from './ChildInsuranceClient';

const PAGE_DATE_PUBLISHED = '2026-07-23';
const PAGE_DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: 'Child Insurance Calculator: Education Goal & Life Cover',
  description: 'Free child insurance calculator for India. Estimate future child education corpus, required term life cover sum assured, and monthly SIP investment needed. Free to use.',
  keywords: [
    'child insurance calculator',
    'child education insurance calculator',
    'child plan calculator',
    'child education planning calculator',
    'lic child plan calculator',
    'lic amritbaal calculator',
    'lic siip child plan calculator',
    'child marriage goal calculator',
    'future education cost calculator india',
    'child term insurance sum assured calculator',
    'education inflation calculator india',
    'child plan monthly sip calculator',
    'hdfc life child plan calculator',
    'icici pru smart kid calculator',
    'sbi life child insurance calculator',
    'how much child insurance do i need',
    'higher education cost calculator for child',
    'child wealth creation calculator',
  ],
  openGraph: {
    title: 'Child Insurance Calculator: Education Goal & Life Cover - Fermor',
    description: 'Calculate future education corpus, required life insurance sum assured, and monthly SIP needed for your child in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/child-insurance-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-child-insurance-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Insurance Calculator - Fermor',
    description: 'Calculate future education corpus, required life insurance cover, and monthly SIP for your child. Free to use.',
    images: ['https://fermor.in/og-child-insurance-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/child-insurance-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Child Insurance Plans', 'Child Education Planning', 'Education Inflation India', 'Waiver of Premium Benefit', 'Child ULIP Plans', 'Term Insurance Sum Assured', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Child Insurance Calculator', item: 'https://fermor.in/calculators/child-insurance-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much cover is needed in a child insurance plan in India?', acceptedAnswer: { '@type': 'Answer', text: 'A child insurance plan should provide a sum assured equal to the inflation-adjusted future cost of higher education plus any outstanding parent liabilities, typically between Rs 50 lakh and Rs 1.5 crore for private higher education.' } },
    { '@type': 'Question', name: 'What is education inflation rate in India?', acceptedAnswer: { '@type': 'Answer', text: 'Education inflation in India averages 10% to 12% annually, which means college tuition fees double approximately every 6 to 7 years.' } },
    { '@type': 'Question', name: 'What is Waiver of Premium (WOP) benefit in child insurance plans?', acceptedAnswer: { '@type': 'Answer', text: 'Waiver of Premium is a critical feature where, upon the tragic demise of the parent during the policy term, all future premiums are waived by the insurer while the policy continues and pays the target corpus at maturity.' } },
    { '@type': 'Question', name: 'Is pure term insurance plus equity mutual funds better than traditional child plans?', acceptedAnswer: { '@type': 'Answer', text: 'Financially, combining a term insurance policy on the breadwinning parent with a dedicated equity SIP (like Nifty 50 or Flexi Cap funds) generally yields higher net returns and lower expense ratios than traditional child endowment plans.' } },
    { '@type': 'Question', name: 'How much will college education cost in India in 15 years?', acceptedAnswer: { '@type': 'Answer', text: 'An engineering or MBA course costing Rs 15 lakh today will cost approximately Rs 62.6 lakh in 15 years assuming a 10% annual education inflation rate.' } },
    { '@type': 'Question', name: 'What is the ideal age to start a child insurance or education fund?', acceptedAnswer: { '@type': 'Answer', text: 'Starting at birth or before the child turns 3 years old gives a 15 to 18 year compounding runway, dramatically lowering the required monthly investment compared to starting when the child is 10 years old.' } },
    { '@type': 'Question', name: 'Are child plan maturity proceeds tax-free under Section 10(10D)?', acceptedAnswer: { '@type': 'Answer', text: 'Maturity benefits from traditional child life insurance plans issued with annual premium up to Rs 5 lakh are tax-exempt under Section 10(10D), subject to prevailing tax rules.' } },
    { '@type': 'Question', name: 'Can I take a partial withdrawal from a child insurance plan for school fees?', acceptedAnswer: { '@type': 'Answer', text: 'Child ULIP plans permit partial withdrawals after a 5-year lock-in period for educational milestones like school admission or coaching fees.' } },
    { '@type': 'Question', name: 'Should the insurance policy be bought on the child or the parent?', acceptedAnswer: { '@type': 'Answer', text: 'The life insurance cover must always be taken on the earning parent, who is the financial provider. Insuring a minor child provides no financial risk protection to the family.' } },
    { '@type': 'Question', name: 'How does this child insurance calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator inflates today\'s education cost to its future value at your selected inflation rate, computes the required life cover sum assured, and shows the exact monthly SIP needed to reach the goal.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Child Insurance Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/child-insurance-calculator',
  description: 'Calculate inflation-adjusted child education corpus, required term insurance sum assured, and monthly SIP investment needed.',
  featureList: ['Education vs Marriage goal planning tabs', 'Education inflation adjustment (10% default)', 'Required term insurance sum assured estimator', 'Monthly SIP and lumpsum investment required', 'Waiver of premium coverage guidance', 'Donut chart investment breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Child Education Corpus and Insurance Requirement', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Child Insurance Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter child current and target age', text: 'Enter your child\'s current age and the target milestone age (e.g. 18 for college).' },
    { '@type': 'HowToStep', position: 2, name: 'Set today cost and education inflation', text: 'Enter current expense in today\'s money and expected education inflation rate.' },
    { '@type': 'HowToStep', position: 3, name: 'Set expected investment return', text: 'Choose expected annual return rate for your investment portfolio.' },
    { '@type': 'HowToStep', position: 4, name: 'Review future goal corpus and monthly SIP', text: 'See the total inflation-adjusted future goal value, recommended term cover, and required monthly SIP.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Child Insurance Plan', alternateName: 'Child Education Insurance',
  description: 'An insurance-cum-investment plan designed to fund a child\'s future education and life milestones even in the absence of the parent.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Insurance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Life_insurance'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Child Insurance Calculator: Education Goal & Life Cover',
  url: 'https://fermor.in/calculators/child-insurance-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Child Insurance Plan', alternateName: 'Child Education Insurance' }],
  audience: { '@type': 'Audience', audienceType: 'Indian parents, young couples, financial planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-child-insurance', name: 'What Is a Child Insurance Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#education-cost-formula', name: 'Child Education Cost Inflation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#term-plus-sip-strategy', name: 'Term Plan + Equity Mutual Fund Strategy' },
    { '@type': 'WebPageElement', cssSelector: '#future-cost-table', name: 'Future Education Cost Projections' },
    { '@type': 'WebPageElement', cssSelector: '#waiver-of-premium', name: 'Waiver of Premium Benefit' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function ChildInsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <ChildInsuranceClient />
    </>
  );
}

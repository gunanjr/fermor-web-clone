import type { Metadata } from 'next';
import HomeDownPaymentCalculatorClient from './HomeDownPaymentCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-14';
const PAGE_DATE_MODIFIED = '2026-07-14';

export const metadata: Metadata = {
  title: 'Home Down Payment Calculator: Save for a House in India',
  description: 'Free home down payment calculator. Plan your house savings timeline, calculate monthly savings needed with compound growth, and check future loan EMI.',
  keywords: [
    'home down payment calculator',
    'down payment calculator',
    'house down payment calculator',
    'how to save for home down payment',
    'minimum down payment for home loan',
    'rbi down payment rules',
    'home loan down payment calculator',
    'down payment savings plan',
    'mortgage down payment calculator',
    'down payment vs loan amount',
    'save for down payment timeline',
    'average down payment on a house',
    'first time home buyer down payment',
    'down payment calculator india',
    'house purchase savings calculator',
    'down payment compound growth calculator',
    'stamp duty and registration calculator',
    'epf withdrawal for down payment',
    'pmay down payment subsidy',
    'flat purchase down payment calculator',
  ],
  openGraph: {
    title: 'Home Down Payment Calculator: Save for a House in India - Fermor',
    description: 'Estimate down payment targets, savings schedules, monthly deposit goals, and expected home loan EMIs. Optimize your home buying plan with compound growth.',
    type: 'website',
    url: 'https://fermor.in/calculators/home-down-payment-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-home-down-payment-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Down Payment Calculator - Fermor',
    description: 'Calculate monthly savings needed to purchase your dream home. See savings timelines, compound interest gains, and future loan EMIs.',
    images: ['https://fermor.in/og-home-down-payment-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/home-down-payment-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Home Down Payment',
    'House Purchase Savings',
    'RBI LTV Rules',
    'Compound Savings',
    'Home Loan EMI Planning',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Down Payment Calculator', item: 'https://fermor.in/calculators/home-down-payment-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a home down payment?', acceptedAnswer: { '@type': 'Answer', text: 'A home down payment is the upfront cash amount a homebuyer pays toward the purchase price of a property. The remaining balance is typically financed through a mortgage or home loan.' } },
    { '@type': 'Question', name: 'What is the minimum down payment required in India?', acceptedAnswer: { '@type': 'Answer', text: 'Per RBI guidelines, the minimum down payment is 10% for property values up to Rs 30 lakh, 15% for values between Rs 30 lakh and Rs 75 lakh, and 20% for property values above Rs 75 lakh.' } },
    { '@type': 'Question', name: 'How do you calculate down payment savings targets?', acceptedAnswer: { '@type': 'Answer', text: 'Calculate the total target (Property Price x Down Payment %) plus transaction costs (stamp duty and registration, usually 5% to 8%). Subtract your current savings to find the net savings gap.' } },
    { '@type': 'Question', name: 'Where should I save money for a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'For timelines under 2 years, low-risk debt instruments like fixed deposits (FDs), recurring deposits (RDs), or arbitrage funds are recommended. For timelines over 3 years, conservative hybrid funds or equity savings mutual funds can be considered.' } },
    { '@type': 'Question', name: 'Does the down payment include stamp duty and registration?', acceptedAnswer: { '@type': 'Answer', text: 'No, banks do not include stamp duty, registration, or brokerage fees in the property value for loan calculations. You must fund these additional transaction costs (typically 6% to 10% of the property value) entirely out of pocket.' } },
    { '@type': 'Question', name: 'Can I withdraw my EPF balance for a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, EPFO rules allow you to withdraw up to 90% of your accumulated EPF balance for housing acquisition, provided you have completed at least 3 years of membership.' } },
    { '@type': 'Question', name: 'How does compound interest help save for a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'Investing your monthly savings in return-generating assets compound your capital over time, meaning a significant portion of your final down payment target is funded by interest earnings rather than active savings.' } },
    { '@type': 'Question', name: 'What happens if I pay a larger down payment?', acceptedAnswer: { '@type': 'Answer', text: 'A larger down payment reduces the required loan principal, which decreases your monthly EMI and substantially lowers the total interest paid over the life of the loan.' } },
    { '@type': 'Question', name: 'Can a home down payment be paid using personal loans?', acceptedAnswer: { '@type': 'Answer', text: 'It is highly discouraged. Borrowing your down payment using high-interest personal loans increases your debt-to-income ratio, which can lead banks to reject your primary home loan application.' } },
    { '@type': 'Question', name: 'Is PMAY down payment subsidy still active?', acceptedAnswer: { '@type': 'Answer', text: 'The Credit Linked Subsidy Scheme (CLSS) under PMAY for MIG categories has expired, but state-level subsidies and benefits for Economically Weaker Sections (EWS) and LIG categories remain active under modified terms.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Home Down Payment Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-down-payment-calculator',
  description: 'Plan your down payment savings timeline. Estimate monthly savings targets, compound investment growth, stamp duty costs, and future home loan EMIs.',
  featureList: [
    'Property price and target down payment percentage sliders',
    'Current savings and investment rate of return adjustments',
    'Monthly savings needed calculation with compound growth',
    'Yearly savings timeline schedule with interest breakdown',
    'Estimated home loan EMI and total cost calculator',
    'Multi-currency conversions (INR, USD, EUR, GBP)',
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
  name: 'How to Calculate Your Home Down Payment Goal',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Down Payment Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter target property price and down payment percentage', text: 'Adjust the sliders for the home value and down payment (RBI suggests 20%).' },
    { '@type': 'HowToStep', position: 2, name: 'Provide current savings and savings timeline', text: 'Input what you have saved today and select the timeline in months or years.' },
    { '@type': 'HowToStep', position: 3, name: 'Input expected interest rate / return', text: 'Specify the expected rate of return on your savings portfolio (e.g., 7% for debt/mutual funds).' },
    { '@type': 'HowToStep', position: 4, name: 'Review monthly goal and future loan details', text: 'Review the required monthly deposit and the estimated loan EMI for the remaining property cost.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Down Payment',
  alternateName: 'Home Down Payment',
  description: 'The initial upfront portion of the total purchase price paid in cash by the buyer at the time of purchasing an asset, such as a home. The balance is usually covered by a loan.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Real Estate and Mortgage Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Down_payment',
    'https://www.wikidata.org/wiki/Q2512686',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Down Payment Calculator: Save for a House in India',
  url: 'https://fermor.in/calculators/home-down-payment-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Down Payment', alternateName: 'Home Down Payment' }],
  audience: { '@type': 'Audience', audienceType: 'First-time home buyers, real estate investors, savings planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#dp-requirements', name: 'Minimum Down Payment Requirements in India' },
    { '@type': 'WebPageElement', cssSelector: '#dp-target-calculation', name: 'How to Calculate Your Target Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#dp-vs-loan-amount', name: 'Down Payment vs Loan Amount' },
    { '@type': 'WebPageElement', cssSelector: '#how-much-dp', name: 'How Much Should You Put Down on a House' },
    { '@type': 'WebPageElement', cssSelector: '#savings-strategies', name: 'Down Payment Savings Strategies for Indian Buyers' },
    { '@type': 'WebPageElement', cssSelector: '#compound-advantage', name: 'The Compound Interest Advantage in Savings' },
    { '@type': 'WebPageElement', cssSelector: '#dp-timeline-table', name: 'Home Down Payment Timeline Table' },
    { '@type': 'WebPageElement', cssSelector: '#dp-affects-loan-rate', name: 'How Your Down Payment Affects Home Loan Interest Rates' },
    { '@type': 'WebPageElement', cssSelector: '#hidden-costs', name: 'Hidden Costs of Buying a Home in India' },
    { '@type': 'WebPageElement', cssSelector: '#gov-schemes', name: 'Government Schemes Supporting First-Time Buyers' },
    { '@type': 'WebPageElement', cssSelector: '#epf-withdrawal', name: 'Using Your Employee Provident Fund (EPF) for Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#pitfalls', name: 'Common Pitfalls to Avoid When Saving for a Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Down Payment Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HomeDownPaymentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomeDownPaymentCalculatorClient />
    </>
  );
}

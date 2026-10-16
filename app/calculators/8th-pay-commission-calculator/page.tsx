import type { Metadata } from 'next';
import EighthPayCommissionClient from './EighthPayCommissionClient';

export const metadata: Metadata = {
  title: '8th Pay Commission Calculator: Salary & Pension Hike',
  description:
    'Free 8th Pay Commission calculator for India. Estimate salary and pension hike by fitment factor, pay level, and city (HRA). Free to use.',
  keywords: [
    '8th pay commission calculator',
    '8th pay commission salary calculator',
    '8th pay commission pension calculator',
    '8th pay commission fitment factor calculator',
    '8th pay commission pay matrix',
    '8th pay commission pay matrix calculator',
    '8th pay commission salary slab',
    '8th pay commission latest news',
    'fitment factor calculator',
    '8th cpc calculator',
    '8th pay commission da calculator',
    '8th pay commission hra calculator',
    'central government salary calculator 2026',
    '8th pay commission salary hike calculator',
    '8th pay commission arrears calculator',
    '8th pay commission implementation date calculator',
    'pay commission calculator india',
    '8th pay commission basic pay calculator',
    '8th pay commission pension hike calculator',
    'central govt employee salary calculator',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/8th-pay-commission-calculator' },
  twitter: {
    card: 'summary_large_image',
    title: '8th Pay Commission Calculator: Salary & Pension Hike',
    description: 'Estimate your projected salary and pension hike under the 8th Pay Commission by fitment factor, pay level, and city. Free for India.',
    images: ['https://fermor.in/og-8th-pay-commission-calculator.png'],
  },
  openGraph: {
    title: '8th Pay Commission Calculator: Salary & Pension Hike',
    description:
      'Estimate your projected salary and pension hike under the 8th Pay Commission using your current basic pay, a fitment factor scenario, and city classification. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/8th-pay-commission-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-8th-pay-commission-calculator.png', width: 1200, height: 630, alt: 'Fermor 8th Pay Commission Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-09-28';
const PAGE_DATE_PUBLISHED = '2026-07-28';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    '8th Central Pay Commission',
    '7th Pay Commission Pay Matrix',
    'Fitment Factor',
    'Dearness Allowance',
    'House Rent Allowance',
    'Central Government Pension Rules',
    'National Pension System',
    'Personal Finance India',
  ],
};

const faqItems = [
  { q: 'When will the 8th Pay Commission be implemented?', a: 'The 8th Pay Commission was formally constituted on November 3, 2025, with an 18-month tenure to submit its recommendations, putting the final report around mid-2027. January 1, 2026 is the official reference date the Terms of Reference point to, so if implementation happens after the report is submitted and accepted, arrears would apply retrospectively to that date.' },
  { q: 'What is the fitment factor in the 8th Pay Commission?', a: 'The fitment factor is the multiplier applied to your current basic pay to arrive at the revised basic pay under the new pay commission. The 7th Pay Commission used a fitment factor of 2.57; for the 8th, employee federations have proposed factors as high as 2.86 to 3.83, but the government has not accepted or finalised any figure yet.' },
  { q: 'Is the 8th Pay Commission applicable to state government employees?', a: 'No, the 8th Pay Commission covers only central government employees and pensioners directly. Most state governments historically adopt a similar revised pay structure after their own independent review and cabinet approval, typically with a delay of one to two years after the central recommendations are implemented.' },
  { q: 'How much will pension increase after the 8th Pay Commission?', a: 'There is no confirmed pension increase figure yet, since it depends on the final fitment factor the government approves. Pensioner associations have proposed raising the minimum pension to 67% of Last Pay Drawn and introducing an age-based enhancement up to 100% of Last Pay Drawn for pensioners aged 90 and above, but these remain unapproved proposals under consultation.' },
  { q: 'Is the 8th Pay Commission applicable to bank employees?', a: 'No. Public sector bank employees have their pay revised separately under agreements negotiated through the Indian Banks\' Association (IBA), not through the Central Pay Commission process that applies to central government departments.' },
  { q: 'How much will salaries increase under the 8th Pay Commission?', a: 'The exact increase depends entirely on the final fitment factor and revised HRA and DA structure, none of which the government has approved yet. Using the calculator on this page with different fitment factor scenarios shows a realistic range for your own pay level, since even the same fitment factor produces very different rupee increases depending on your current basic pay.' },
  { q: 'Will Dearness Allowance become zero under the 8th Pay Commission?', a: 'Yes, but only from the date of implementation. DA continues to be revised twice a year under the existing mechanism until then; once the new pay structure takes effect, the existing DA is absorbed into the revised basic pay and the DA rate resets to zero, with future DA increases starting fresh from that new base.' },
  { q: 'Why is there a delay in implementing the 8th Pay Commission?', a: 'The delay reflects the scale of the exercise: the Commission is still collecting workforce data from ministries and departments (extended to July 31, 2026), running regional consultations with employee and pensioner federations across multiple cities, and has an 18-month mandate from its November 2025 constitution before it needs to submit recommendations at all.' },
  { q: 'Is the fitment factor applicable to pensioners as well?', a: 'Yes, in principle. Historically, past pay commissions have applied the same or a closely related fitment factor to revise pensions alongside serving employee pay, and the 8th Pay Commission\'s Terms of Reference explicitly include pension revision for those who retired on or before December 31, 2025.' },
  { q: 'How do I check my revised salary using a fitment factor calculator?', a: 'Enter your current basic pay or select your 7th CPC pay level, choose a fitment factor scenario (conservative, moderate, or the employee union proposal), and select your city classification for HRA. The calculator on this page shows your projected revised basic pay, DA, HRA, and total gross salary side by side with your current figures.' },
  { q: 'Can higher allowances compensate for a lower fitment factor?', a: 'Not entirely. The fitment factor determines your revised basic pay, which is the base figure used to calculate Dearness Allowance, House Rent Allowance, and several other allowances. A lower fitment factor produces a lower basic pay and therefore a lower overall salary revision, even when specific allowances are increased separately.' },
  { q: 'What is the current Dearness Allowance rate for central government employees?', a: 'Dearness Allowance stands at 60% of basic pay and pension, effective from January 1, 2026, after the Union Cabinet approved a 2% increase from the earlier 58%. This DA revision is a routine, separate process from the 8th Pay Commission and does not indicate that the new pay structure has been implemented.' },
  { q: 'What are the current HRA rates for central government employees?', a: 'House Rent Allowance is 30% of basic pay in X-classified cities, 20% in Y-classified cities, and 10% in Z-classified cities. These rates already reflect the automatic revision that applies once DA crosses 50%, which happened in January 2024, and remain in effect at the current 60% DA level.' },
  { q: 'Will there be arrears when the 8th Pay Commission is implemented?', a: 'Likely yes, if implementation happens after the January 1, 2026 reference date, which looks probable given the Commission\'s 18-month mandate running to around mid-2027. Arrears would cover the gap between the reference date and the actual notification date, paid as a lump sum once the government approves the final recommendations, though eligibility and exact amounts depend entirely on the final notification.' },
  { q: 'How many employees and pensioners does the 8th Pay Commission cover?', a: 'The Commission\'s review is expected to affect roughly 50 lakh central government employees and 69 lakh pensioners, based on figures cited alongside the Cabinet\'s approval of its Terms of Reference.' },
  { q: 'Is Dearness Allowance being merged with basic pay under the 8th Pay Commission?', a: 'No standalone merger proposal is currently under consideration, according to the government\'s own clarification to employee unions. What does happen at implementation is different: the DA percentage accumulated up to that point gets absorbed into the newly calculated basic pay through the fitment factor, after which DA itself resets to zero and starts accruing again from the new base.' },
  { q: 'What is the 8th Pay Commission pay matrix?', a: 'The pay matrix is the table structure, carried forward in concept from the 7th Pay Commission, that maps every pay level (Level 1 through Level 18) to a basic pay figure and its progression through annual increments. The 8th Pay Commission is expected to publish a revised matrix once the fitment factor and any structural changes are finalised; until then, only the 7th CPC matrix is official.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '8th Pay Commission Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/8th-pay-commission-calculator',
  description: 'Estimate projected salary and pension hikes under the 8th Pay Commission using fitment factor scenarios, 7th CPC pay level, and city HRA classification. Multi-currency support.',
  featureList: [
    'Salary Hike Calculator by Fitment Factor',
    'Pension Hike Calculator',
    '7th CPC Pay Level Presets (Level 1-18)',
    'Full Pay Matrix Table at Selected Fitment Factor',
    'City-wise HRA Classification (X/Y/Z)',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: '8th Pay Commission Calculator', item: 'https://fermor.in/calculators/8th-pay-commission-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your 8th Pay Commission Salary Hike',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor 8th Pay Commission Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select your pay level or basic pay', text: 'Choose your 7th CPC pay level to auto-fill the standard basic pay, or enter your exact basic pay directly.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose a fitment factor scenario', text: 'Pick conservative, moderate, or the employee union proposal, or set a custom value between 1.83 and 3.83.' },
    { '@type': 'HowToStep', position: 3, name: 'Select your city classification', text: 'Choose X, Y, or Z to apply the correct House Rent Allowance percentage.' },
    { '@type': 'HowToStep', position: 4, name: 'Review your projected salary or pension', text: 'Switch between the Salary and Pension tabs to see your current versus projected gross figures and the hike percentage.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: '8th Pay Commission',
  alternateName: '8th Central Pay Commission',
  description: 'A commission constituted by the Government of India to review and revise the pay, pension, and allowance structure of central government employees, formally constituted on November 3, 2025 under Justice Ranjana Prakash Desai.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Pay_Commission',
    'https://www.wikidata.org/wiki/Q7175405',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '8th Pay Commission Calculator: Salary & Pension Hike',
  description: 'Estimate your projected salary and pension hike under the 8th Pay Commission using your current basic pay, a fitment factor scenario, and city classification.',
  url: 'https://fermor.in/calculators/8th-pay-commission-calculator',
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
  about: [
    { '@type': 'DefinedTerm', name: '8th Pay Commission', alternateName: '8th Central Pay Commission' },
    { '@type': 'DefinedTerm', name: 'Fitment Factor' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Central government employees, pensioners, and family pensioners in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#status-update', name: '8th Pay Commission Status' },
    { '@type': 'WebPageElement', cssSelector: '#fitment-factor-formula', name: 'Fitment Factor Formula' },
    { '@type': 'WebPageElement', cssSelector: '#fitment-scenarios', name: 'Fitment Factor Scenarios' },
    { '@type': 'WebPageElement', cssSelector: '#timeline', name: '8th Pay Commission Timeline' },
    { '@type': 'WebPageElement', cssSelector: '#da-hra-current', name: 'Current DA and HRA Rates' },
    { '@type': 'WebPageElement', cssSelector: '#pension-reform', name: 'Pension Reform Proposals' },
    { '@type': 'WebPageElement', cssSelector: '#arrears', name: '8th Pay Commission Arrears' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function EighthPayCommissionCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EighthPayCommissionClient />
    </>
  );
}

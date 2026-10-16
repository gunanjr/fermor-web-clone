import type { Metadata } from 'next';
import BikeInsuranceClient from './BikeInsuranceClient';

export const metadata: Metadata = {
  title: 'Bike Insurance Calculator: Two Wheeler Premium Estimate',
  description:
    'Free bike insurance calculator for India. Estimate third-party and comprehensive two wheeler insurance premium with IDV, NCB, and GST. Free to use.',
  keywords: [
    'bike insurance calculator',
    'bike insurance',
    'two wheeler insurance',
    '2 wheeler insurance',
    'bike insurance online',
    'two wheeler insurance online',
    'two wheeler insurance policy',
    'motorcycle insurance',
    'scooty insurance',
    'cheap bike insurance',
    'best bike insurance',
    'best two wheeler insurance',
    'third party bike insurance',
    'third party two wheeler insurance',
    '3rd party bike insurance',
    'insurance policy for bike',
    'new bike insurance',
    'bike insurance price',
    'two wheeler insurance price',
    'idv in bike insurance',
    'bike insurance premium calculator',
    'two wheeler insurance premium calculator',
    'icici lombard bike insurance',
    'hdfc ergo bike insurance',
    'bike insurance bajaj allianz',
    'bike insurance tata aig',
    'digit bike insurance',
    'acko bike insurance',
    'reliance two wheeler insurance',
    'honda activa insurance',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/bike-insurance-calculator' },
  twitter: {
    card: 'summary_large_image',
    title: 'Bike Insurance Calculator: Two Wheeler Premium Estimate',
    description: 'Estimate your two wheeler insurance premium using IRDAI third-party rates, IDV, NCB, and 18% GST. Free for India.',
    images: ['https://fermor.in/og-bike-insurance-calculator.png'],
  },
  openGraph: {
    title: 'Bike Insurance Calculator: Two Wheeler Premium Estimate',
    description:
      'Estimate your bike or scooter insurance premium using IRDAI\'s fixed third-party rates by engine cc, your bike\'s IDV, No Claim Bonus, and 18% GST. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/bike-insurance-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-bike-insurance-calculator.png', width: 1200, height: 630, alt: 'Fermor Bike Insurance Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-07-22';
const PAGE_DATE_PUBLISHED = '2026-07-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'IRDAI Third-Party Motor Insurance Rates',
    'Two Wheeler Insurance',
    'Insured Declared Value (IDV)',
    'No Claim Bonus',
    'GST on Insurance',
    'Motor Vehicles Act',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Personal Finance India',
  ],
};

const faqItems = [
  {
    q: 'Is bike insurance mandatory in India?',
    a: 'Yes. At minimum, third-party bike insurance is legally mandatory under Section 146 of the Motor Vehicles Act, 1988 for every two-wheeler on Indian roads. Riding without at least a valid third-party policy is a punishable offence, with fines that increase for repeat violations.',
  },
  {
    q: 'What is the third-party bike insurance premium for my cc?',
    a: 'IRDAI fixes the third-party premium by engine capacity, not by insurer, so it is identical everywhere. The last officially confirmed 1-year rates, effective since April 2022, are Rs 538 for up to 75cc, Rs 714 for 75-150cc, Rs 1,366 for 150-350cc, and Rs 2,804 above 350cc. A revision has reportedly been under review since 2025 but was not confirmed at the time of writing, so verify the current rate before buying.',
  },
  {
    q: 'What is IDV in bike insurance?',
    a: 'IDV (Insured Declared Value) is the maximum amount your insurer will pay if your bike is stolen or damaged beyond repair. It is calculated as the manufacturer\'s ex-showroom price minus depreciation based on the bike\'s age, and it is the figure your own-damage premium is calculated on.',
  },
  {
    q: 'How is IDV calculated based on the age of my bike?',
    a: 'IRDAI mandates a fixed depreciation schedule: 5% for a bike up to 6 months old, 15% for 6 months to 1 year, 20% for 1-2 years, 30% for 2-3 years, 40% for 3-4 years, and 50% for 4-5 years. Beyond 5 years, the IDV is mutually agreed between insurer and owner rather than fixed by a schedule.',
  },
  {
    q: 'What is No Claim Bonus (NCB) in bike insurance?',
    a: 'NCB is a discount on your own-damage premium for every consecutive claim-free year, starting at 20% after 1 year, rising to 25% after 2 years, 35% after 3 years, 45% after 4 years, and capping at 50% from 5 years onward. NCB belongs to you as the rider, not the vehicle, so it transfers if you sell your bike and insure a new one.',
  },
  {
    q: 'Does NCB reduce my third-party premium?',
    a: 'No. NCB only applies to the own-damage portion of a comprehensive policy. The third-party premium is a flat, IRDAI-fixed amount by engine cc and does not change with your claim history.',
  },
  {
    q: 'What is the difference between third-party and comprehensive bike insurance?',
    a: 'Third-party insurance covers only damage or injury you cause to another person or their property, and is the legal minimum. Comprehensive insurance adds own-damage cover for your own bike, protecting against accidents, theft, fire, and natural calamities, at a materially higher premium.',
  },
  {
    q: 'How much GST applies to bike insurance premium?',
    a: 'GST on motor insurance, including two-wheeler insurance, is 18%, applied on top of the total premium (third-party plus own-damage, after any NCB discount). This rate is unchanged even after the 2025-26 GST rate reforms that reduced GST on individual life and health insurance.',
  },
  {
    q: 'What is a good own-damage premium rate to expect?',
    a: 'Own-damage premium typically runs 2-3% of your bike\'s IDV per year, though the exact rate is set by each insurer individually and is not fixed by IRDAI the way third-party premium is. A higher IDV means a higher own-damage premium, since the insurer is on the hook for a larger payout in a total loss.',
  },
  {
    q: 'How can I reduce my bike insurance premium?',
    a: 'Build your No Claim Bonus by avoiding small claims you can pay out of pocket, choose a voluntary deductible if your insurer offers one, and set the IDV honestly rather than inflating it, since a higher IDV means a higher own-damage premium for a benefit you will rarely fully use. Comparing quotes across insurers before renewal also helps, since own-damage rates are not standardised.',
  },
  {
    q: 'What are common bike insurance add-ons?',
    a: 'Zero depreciation cover removes the deduction for wear-and-tear on plastic and rubber parts during a claim. Engine protection cover pays for water ingress or oil leakage damage not covered by a standard policy. Roadside assistance covers towing, fuel delivery, and minor on-spot repairs. Each add-on increases the premium and is optional on top of a comprehensive policy.',
  },
  {
    q: 'Which insurers sell two-wheeler insurance in India?',
    a: 'Two-wheeler insurance is sold by general insurers including ICICI Lombard, HDFC Ergo, Bajaj Allianz, Tata AIG, Reliance General, Digit, Acko, National Insurance, United India Insurance, New India Assurance, and SBI General, among others, all regulated by IRDAI. Aggregators like Policybazaar compare quotes across these insurers rather than being insurers themselves.',
  },
  {
    q: 'Can I renew bike insurance online?',
    a: 'Yes. Every major insurer and aggregator offers online renewal, where you enter your registration number and existing policy details, and the system pulls your NCB and prior claim history to generate a renewal quote. Renewing before your existing policy lapses preserves your accumulated NCB.',
  },
  {
    q: 'What happens if my bike insurance lapses?',
    a: 'If a comprehensive policy lapses, you lose the accumulated No Claim Bonus on renewal in most cases, and driving without at least third-party cover is a legal offence with fines. Insurers may also require a fresh vehicle inspection before issuing a new policy after a long lapse.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bike Insurance Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/bike-insurance-calculator',
  description: 'Estimate two-wheeler insurance premium using IRDAI\'s fixed third-party rates by engine cc, IDV depreciation, No Claim Bonus, and 18% GST. Covers third-party and comprehensive policies.',
  featureList: [
    'Third-Party Premium (IRDAI fixed rate by cc)',
    'Comprehensive Premium (Third-Party + Own Damage)',
    'IDV Calculator with Age-Based Depreciation',
    'No Claim Bonus (NCB) Discount',
    '18% GST Calculation',
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
    { '@type': 'ListItem', position: 3, name: 'Bike Insurance Calculator', item: 'https://fermor.in/calculators/bike-insurance-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Bike Insurance Premium',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Bike Insurance Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your bike\'s ex-showroom price', text: 'This is the base value your Insured Declared Value (IDV) is calculated from.' },
    { '@type': 'HowToStep', position: 2, name: 'Select engine cc bracket and vehicle age', text: 'Engine cc sets your fixed third-party premium; vehicle age sets the IDV depreciation percentage.' },
    { '@type': 'HowToStep', position: 3, name: 'Select claim-free years and policy type', text: 'Claim-free years set your No Claim Bonus discount on own damage; choose third-party only or comprehensive.' },
    { '@type': 'HowToStep', position: 4, name: 'Read the estimated premium', text: 'The calculator shows third-party premium, own-damage premium after NCB, GST, and the total estimated annual premium.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'IDV',
  alternateName: 'Insured Declared Value',
  description: 'The maximum sum an insurer will pay for a total loss or theft of a vehicle, calculated as the manufacturer\'s ex-showroom price reduced by an IRDAI-mandated depreciation percentage based on the vehicle\'s age.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Vehicle_insurance',
    'https://www.wikidata.org/wiki/Q1417186',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Bike Insurance Calculator: Two Wheeler Premium Estimate',
  description: 'Estimate two-wheeler insurance premium using IRDAI\'s fixed third-party rates by engine cc, IDV depreciation, No Claim Bonus, and 18% GST.',
  url: 'https://fermor.in/calculators/bike-insurance-calculator',
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
    { '@type': 'DefinedTerm', name: 'IDV', alternateName: 'Insured Declared Value' },
    { '@type': 'DefinedTerm', name: 'NCB', alternateName: 'No Claim Bonus' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian two-wheeler owners, bike and scooter riders, first-time vehicle owners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-bike-insurance', name: 'What Is Bike Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#premium-formula', name: 'Bike Insurance Premium Formula' },
    { '@type': 'WebPageElement', cssSelector: '#tp-rates-by-cc', name: 'Third-Party Rates by CC' },
    { '@type': 'WebPageElement', cssSelector: '#idv-depreciation', name: 'IDV and Depreciation' },
    { '@type': 'WebPageElement', cssSelector: '#ncb-slabs', name: 'No Claim Bonus Slabs' },
    { '@type': 'WebPageElement', cssSelector: '#tp-vs-comprehensive', name: 'Third-Party vs Comprehensive' },
    { '@type': 'WebPageElement', cssSelector: '#premium-by-model', name: 'Premium by Popular Bike Models' },
    { '@type': 'WebPageElement', cssSelector: '#gst-on-insurance', name: 'GST on Bike Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-premium', name: 'How to Reduce Your Premium' },
    { '@type': 'WebPageElement', cssSelector: '#addons', name: 'Bike Insurance Add-ons' },
    { '@type': 'WebPageElement', cssSelector: '#where-to-buy', name: 'Where to Buy Bike Insurance' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function BikeInsuranceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <BikeInsuranceClient />
    </>
  );
}

import type { Metadata } from 'next';
import CarInsuranceClient from './CarInsuranceClient';

const PAGE_DATE_PUBLISHED = '2026-07-23';
const PAGE_DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: 'Car Insurance Calculator: Premium & IDV Estimator',
  description: 'Free car insurance calculator for India. Calculate Insured Declared Value (IDV), own damage premium, third party rates, and NCB discount. Free to use.',
  keywords: [
    'car insurance calculator',
    'car insurance premium calculator',
    'idv calculator car insurance',
    'car insurance third party calculator',
    'comprehensive car insurance calculator',
    'ncb calculator car insurance',
    'car insurance price calculator india',
    'zero dep car insurance calculator',
    'policybazaar car insurance calculator',
    'acko car insurance calculator',
    'digit car insurance calculator',
    'hdfc ergo car insurance calculator',
    'icici lombard car insurance calculator',
    'sbi general car insurance calculator',
    'car insurance depreciation calculator',
    'irdai third party rates car insurance',
    'new car insurance premium calculator',
    'old car insurance calculator',
  ],
  openGraph: {
    title: 'Car Insurance Calculator: Premium & IDV Estimator - Fermor',
    description: 'Estimate car insurance premium, IDV depreciation, third party rates, and NCB savings across top insurers in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/car-insurance-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-car-insurance-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Car Insurance Calculator - Fermor',
    description: 'Estimate car insurance premium, IDV depreciation, third party rates, and NCB savings in India. Free to use.',
    images: ['https://fermor.in/og-car-insurance-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/car-insurance-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Car Insurance India', 'IDV Calculation', 'IRDAI Third Party Rates', 'No Claim Bonus NCB', 'Zero Depreciation Add-on', 'Motor Insurance GST', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Car Insurance Calculator', item: 'https://fermor.in/calculators/car-insurance-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is IDV in car insurance and how is it calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Insured Declared Value (IDV) is the maximum sum insured payable by the insurer in case of total loss or theft of the vehicle. It is calculated by deducting age-based depreciation from the manufacturer\'s ex-showroom price.' } },
    { '@type': 'Question', name: 'What are IRDAI third-party car insurance rates for 2026?', acceptedAnswer: { '@type': 'Answer', text: 'IRDAI mandates fixed third-party rates based on engine cubic capacity: Rs 2,094 for cars under 1000cc, Rs 3,416 for 1000cc to 1500cc, and Rs 7,897 for cars above 1500cc.' } },
    { '@type': 'Question', name: 'How does No Claim Bonus (NCB) discount work in car insurance?', acceptedAnswer: { '@type': 'Answer', text: 'No Claim Bonus is a discount on the Own Damage premium component awarded for claim-free policy years, escalating from 20% after year 1 up to a maximum cap of 50% after 5 consecutive claim-free years.' } },
    { '@type': 'Question', name: 'What is Zero Depreciation (Bumper to Bumper) add-on cover?', acceptedAnswer: { '@type': 'Answer', text: 'Zero Depreciation cover ensures that the insurance company pays 100% of plastic, rubber, glass, and metal part replacement costs during accident repairs without deducting standard depreciation.' } },
    { '@type': 'Question', name: 'Is Third Party car insurance mandatory in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, under the Motor Vehicles Act 1988, every motor vehicle driving on Indian public roads must hold at least a valid Third Party liability insurance policy.' } },
    { '@type': 'Question', name: 'What is the difference between Comprehensive and Third-Party car insurance?', acceptedAnswer: { '@type': 'Answer', text: 'Third Party insurance only covers legal liability for injury or property damage caused to third parties. Comprehensive insurance covers both third-party liability and Own Damage losses to your own car from accidents, theft, or natural disasters.' } },
    { '@type': 'Question', name: 'How much GST is charged on car insurance premiums in India?', acceptedAnswer: { '@type': 'Answer', text: 'A Goods and Services Tax (GST) rate of 18% is applied to both Own Damage and Third Party motor insurance premium components in India.' } },
    { '@type': 'Question', name: 'Can No Claim Bonus (NCB) be transferred to a new car?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, NCB belongs to the car owner, not the vehicle. You can obtain an NCB certificate from your previous insurer and transfer your accumulated NCB discount to a newly purchased vehicle policy.' } },
    { '@type': 'Question', name: 'What depreciation rate is applied to car parts during insurance claims?', acceptedAnswer: { '@type': 'Answer', text: 'Standard depreciation rates applied without Zero Dep cover are: 50% for rubber, nylon, and plastic parts; 30% for fibreglass parts; 50% for batteries; and 0% to 50% for metal parts based on vehicle age.' } },
    { '@type': 'Question', name: 'How does this car insurance calculator estimate premiums?', acceptedAnswer: { '@type': 'Answer', text: 'This calculator computes IDV based on vehicle age, determines tariff-based Own Damage premium, deducts NCB discounts, adds mandatory IRDAI third-party rates and chosen add-ons, and applies 18% GST.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Car Insurance Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/car-insurance-calculator',
  description: 'Calculate car insurance premium, IDV depreciation schedule, IRDAI third-party rates, and NCB discount across top Indian insurers.',
  featureList: ['Comprehensive vs Third Party mode toggle', 'IDV age-based depreciation calculator', 'IRDAI engine CC slab third party rates', 'No Claim Bonus (NCB 0-50%) discount calculator', 'Zero Dep and Engine Protect add-on estimator', '18% GST breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Car Insurance Premium and IDV', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Car Insurance Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter ex-showroom price and car age', text: 'Input your car\'s manufacturer price and select vehicle age in years.' },
    { '@type': 'HowToStep', position: 2, name: 'Select engine capacity (CC)', text: 'Choose engine CC category (<1000cc, 1000-1500cc, >1500cc, or Electric).' },
    { '@type': 'HowToStep', position: 3, name: 'Select No Claim Bonus (NCB %)', text: 'Select accumulated NCB percentage from previous claim-free policy years.' },
    { '@type': 'HowToStep', position: 4, name: 'Select add-on covers and view premium', text: 'Toggle Zero Dep or Engine Protect add-ons to see total premium with 18% GST.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Insured Declared Value', alternateName: 'Car Insurance IDV',
  description: 'The maximum sum insured for a motor vehicle policy, calculated after deducting age-based depreciation from the manufacturer price.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Motor Insurance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Vehicle_insurance_in_India'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Car Insurance Calculator: Premium & IDV Estimator',
  url: 'https://fermor.in/calculators/car-insurance-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Insured Declared Value', alternateName: 'Car Insurance IDV' }],
  audience: { '@type': 'Audience', audienceType: 'Car owners, new car buyers, motor policy renewal applicants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-car-insurance', name: 'What Is a Car Insurance Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#idv-formula', name: 'IDV & Premium Calculation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#third-party-rates-table', name: 'IRDAI Mandatory Third-Party Rates' },
    { '@type': 'WebPageElement', cssSelector: '#ncb-table', name: 'No Claim Bonus (NCB) Slab Matrix' },
    { '@type': 'WebPageElement', cssSelector: '#add-ons-guide', name: 'Essential Car Insurance Add-ons' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function CarInsurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CarInsuranceClient />
    </>
  );
}

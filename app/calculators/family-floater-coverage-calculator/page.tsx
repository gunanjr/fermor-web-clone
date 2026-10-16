import type { Metadata } from 'next';
import FamilyFloaterCoverageClient from './FamilyFloaterCoverageClient';

const PAGE_DATE_PUBLISHED = '2026-07-23';
const PAGE_DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: 'Family Floater Coverage Calculator: Ideal Health Sum Insured',
  description: 'Free family floater coverage calculator for India. Estimate ideal health insurance sum insured, super top-up requirement, and Section 80D tax savings. Free to use.',
  keywords: [
    'family floater coverage calculator',
    'health insurance coverage calculator',
    'family floater sum insured calculator',
    'health insurance requirement calculator',
    'how much health insurance do i need family',
    'family health insurance calculator india',
    'super top up coverage calculator',
    'ideal health insurance cover calculator',
    'section 80d tax savings calculator',
    'star health family floater calculator',
    'hdfc ergo family floater calculator',
    'niva bupa family floater calculator',
    'care health insurance calculator',
    'family floater premium estimator',
    'medical inflation health insurance calculator',
    'corporate health insurance top up calculator',
    'senior citizen family floater calculator',
    'health insurance sum insured formula',
    'best health insurance cover for family of 4',
    'family floater vs individual health insurance calculator',
  ],
  openGraph: {
    title: 'Family Floater Coverage Calculator: Ideal Health Sum Insured - Fermor',
    description: 'Calculate optimal health insurance sum insured for your family based on age, city tier, corporate cover, and medical inflation. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/family-floater-coverage-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-family-floater-coverage-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Floater Coverage Calculator - Fermor',
    description: 'Calculate optimal health insurance sum insured for your family based on age, city tier, and Section 80D limits. Free to use.',
    images: ['https://fermor.in/og-family-floater-coverage-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/family-floater-coverage-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Family Floater Health Insurance', 'Section 80D Tax Deduction', 'Super Top Up Health Insurance', 'Medical Inflation India', 'IRDAI Health Insurance Guidelines', 'Sum Insured Calculation', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Family Floater Coverage Calculator', item: 'https://fermor.in/calculators/family-floater-coverage-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much family floater cover is enough for a family of 4 in India?', acceptedAnswer: { '@type': 'Answer', text: 'For a family of four in a metro city, a base family floater cover of Rs 15 lakh to Rs 25 lakh paired with a super top-up policy of Rs 50 lakh to Rs 1 crore is recommended to protect against modern tertiary treatment costs and 14% annual medical inflation.' } },
    { '@type': 'Question', name: 'What is a family floater health insurance policy?', acceptedAnswer: { '@type': 'Answer', text: 'A family floater policy is a single health insurance policy where the overall sum insured is shared among all covered family members, allowing any member to draw up to the full limit for hospitalisation expenses.' } },
    { '@type': 'Question', name: 'How does city tier affect health insurance sum insured calculation?', acceptedAnswer: { '@type': 'Answer', text: 'Metro (Tier 1) cities like Mumbai, Delhi, and Bengaluru have ICU and surgical costs roughly 40% to 60% higher than Tier 2 or Tier 3 towns, requiring a higher base sum insured for families residing in or seeking treatment in metros.' } },
    { '@type': 'Question', name: 'Is corporate health insurance enough for a family?', acceptedAnswer: { '@type': 'Answer', text: 'Corporate health insurance is rarely sufficient because standard employer policies cap cover at Rs 3 lakh to Rs 5 lakh, end immediately upon job transition or retirement, and often carry co-pay or sub-limit clauses.' } },
    { '@type': 'Question', name: 'What is a super top-up policy and why is it recommended?', acceptedAnswer: { '@type': 'Answer', text: 'A super top-up health insurance policy provides high additional coverage at a low premium once total hospital bills in a policy year exceed a specified deductible threshold, such as Rs 10 lakh or Rs 15 lakh.' } },
    { '@type': 'Question', name: 'How does age of the oldest member impact family floater premium?', acceptedAnswer: { '@type': 'Answer', text: 'Health insurance premiums for family floater plans are computed primarily based on the age of the oldest family member, jumping significantly once the oldest member crosses 45, 55, or 60 years.' } },
    { '@type': 'Question', name: 'How much tax can I save under Section 80D for family health insurance?', acceptedAnswer: { '@type': 'Answer', text: 'Under Section 80D of the Income Tax Act, you can claim up to Rs 25,000 per financial year for health insurance premiums paid for self, spouse, and children, plus an additional Rs 25,000 (or Rs 50,000 if parents are senior citizens) for parents.' } },
    { '@type': 'Question', name: 'Should senior citizen parents be included in a family floater policy?', acceptedAnswer: { '@type': 'Answer', text: 'Senior citizen parents should generally have a separate health insurance policy because including a 65-year-old in a floater with young adults sharply increases the premium for the entire family and risks consuming the shared sum insured.' } },
    { '@type': 'Question', name: 'What is medical inflation rate in India?', acceptedAnswer: { '@type': 'Answer', text: 'Medical inflation in India averages 12% to 14% annually, which is more than double general CPI inflation, meaning healthcare costs double approximately every 5 to 6 years.' } },
    { '@type': 'Question', name: 'How does restore or recharge benefit work in family floater plans?', acceptedAnswer: { '@type': 'Answer', text: 'Restore benefit automatically reinstates 100% of your sum insured if it gets exhausted by a claim during the policy year, ensuring other family members remain covered for subsequent illness or hospitalization.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Family Floater Coverage Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/family-floater-coverage-calculator',
  description: 'Calculate the ideal health insurance sum insured and super top-up cover for your family based on age, location tier, corporate cover, and medical inflation.',
  featureList: ['Family size and age-based risk calculation', 'City tier cost adjustment', 'Super top-up deductible planner', 'Corporate cover gap analysis', 'Section 80D tax benefit estimation', 'Donut chart coverage breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Ideal Family Floater Health Insurance Coverage', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Family Floater Coverage Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select family structure and age', text: 'Select the number of adults, children, and senior parents to cover, and specify the age of the oldest member.' },
    { '@type': 'HowToStep', position: 2, name: 'Select city tier and corporate cover', text: 'Choose Metro (Tier 1) or Tier 2/3 location and enter any existing employer health cover.' },
    { '@type': 'HowToStep', position: 3, name: 'Review recommended sum insured', text: 'The calculator estimates the optimal base floater cover required for major hospitalisations.' },
    { '@type': 'HowToStep', position: 4, name: 'Calculate super top-up and Section 80D savings', text: 'See how adding a super top-up policy expands total protection up to Rs 1 Crore economically while maximizing Section 80D tax deductions.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Family Floater Health Insurance', alternateName: 'Family Floater Plan',
  description: 'A single health insurance policy that covers all family members under a single shared sum insured pool.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Health Insurance Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Health_insurance_in_India'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Family Floater Coverage Calculator: Ideal Health Sum Insured',
  url: 'https://fermor.in/calculators/family-floater-coverage-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Family Floater Health Insurance', alternateName: 'Family Floater Plan' }],
  audience: { '@type': 'Audience', audienceType: 'Indian families, salaried professionals, parents, self-employed individuals', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-family-floater', name: 'What Is Family Floater Health Insurance?' },
    { '@type': 'WebPageElement', cssSelector: '#coverage-formula', name: 'Family Floater Coverage Formula' },
    { '@type': 'WebPageElement', cssSelector: '#city-tier-impact', name: 'City Tier Impact on Hospital Bills' },
    { '@type': 'WebPageElement', cssSelector: '#super-top-up-strategy', name: 'Super Top-Up Strategy' },
    { '@type': 'WebPageElement', cssSelector: '#section-80d-deduction', name: 'Section 80D Tax Benefit' },
    { '@type': 'WebPageElement', cssSelector: '#corporate-vs-personal', name: 'Corporate vs Personal Cover' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function FamilyFloaterCoveragePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <FamilyFloaterCoverageClient />
    </>
  );
}

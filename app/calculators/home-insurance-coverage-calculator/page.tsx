import type { Metadata } from 'next';
import HomeInsuranceCoverageClient from './HomeInsuranceCoverageClient';

const PAGE_DATE_PUBLISHED = '2026-07-24';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'Home Insurance Coverage Calculator: Structure & Content Cover',
  description: 'Free home insurance coverage calculator for India. Calculate structure reconstruction cost, household contents sum insured, and annual premium. Free to use.',
  keywords: [
    'home insurance coverage calculator',
    'home insurance sum insured calculator',
    'house insurance calculator india',
    'property insurance premium calculator',
    'building reconstruction cost calculator',
    'home contents insurance calculator',
    'hdfc ergo home insurance calculator',
    'icici lombard home insurance calculator',
    'sbi general home insurance calculator',
    'bajaj allianz home insurance calculator',
    'bharat griha raksha policy calculator',
    'home insurance rate per sq ft india',
    'fire and burglary home insurance calculator',
    'structure and contents insurance estimator',
    'irdai standard home insurance policy rules',
    'apartment reconstruction cost per sq ft',
    'tenant contents insurance calculator india',
    'jewellery and valuables home insurance cover',
    'earthquake and flood property insurance india',
    'mumbai flat home insurance calculator',
    'bangalore property insurance sum insured',
    'delhi ncr home insurance premium rate',
    'home loan bank mandatory property insurance',
    'building vs land value insurance calculation',
    'agreed value basis home insurance flat',
    'home insurance gst calculation 18 percent',
  ],
  openGraph: {
    title: 'Home Insurance Coverage Calculator: Structure & Content Cover - Fermor',
    description: 'Calculate home insurance reconstruction cost, contents coverage, and annual premium across top property insurers in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/home-insurance-coverage-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-home-insurance-coverage-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Insurance Coverage Calculator - Fermor',
    description: 'Calculate home insurance reconstruction cost, contents coverage, and annual premium in India. Free to use.',
    images: ['https://fermor.in/og-home-insurance-coverage-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/home-insurance-coverage-calculator' },
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
    'Home Insurance India',
    'Bharat Griha Raksha Policy',
    'Structure Reconstruction Cost',
    'Household Contents Sum Insured',
    'Fire and Special Perils Cover',
    'Property Insurance GST',
    'IRDAI General Insurance Regulations',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Home Insurance Coverage Calculator', item: 'https://fermor.in/calculators/home-insurance-coverage-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is home insurance sum insured calculated in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home insurance structure sum insured is calculated by multiplying total built-up area in square feet by the current local construction cost per square foot, strictly excluding the land value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does home insurance cover the land value of a property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, home insurance policies cover only the cost of reconstructing the building structure and replacing household contents, as plot land cannot be destroyed by fire, flood, or earthquake.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average construction cost per sq ft for home insurance in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Construction cost per square foot ranges between Rs 1,800 and Rs 3,500 depending on quality of construction, city tier, and architectural finishes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Bharat Griha Raksha policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bharat Griha Raksha is a standard home insurance policy mandated by IRDAI that offers automatic coverage for home structure and contents against 14 natural and man-made perils including fire, flood, cyclone, and earthquake.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does home insurance cost annually in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home insurance is highly affordable in India, typically costing between Rs 1,500 and Rs 4,500 per year for a Rs 50 lakh structure cover with Rs 10 lakh contents protection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is covered under household contents insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Contents insurance covers furniture, electronic appliances, kitchen equipment, clothing, personal belongings, and optional jewellery against burglary, fire, and water damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can tenants buy home insurance in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, tenants can purchase a contents-only home insurance policy to safeguard their furniture, electronics, and personal valuables without insuring the building structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is earthquake and flood cover included in home insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, standard Bharat Griha Raksha policies in India automatically cover natural calamities including floods, earthquakes, landslides, cyclones, and storms without extra rider fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is agreed value basis in home insurance for apartments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agreed value basis is an option available for multi-story flats where the insurer agrees to pay a fixed pre-determined sum insured in case of total collapse of the apartment building.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between individual home insurance and society master policy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A housing society master policy covers common infrastructure (elevators, staircases, clubhouse, facade), while an individual policy covers the internal flat structure, fixtures, modular fittings, and personal contents.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this home insurance coverage calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator computes structure reconstruction value from built-up area and rate per sq ft, adds contents sum insured, applies insurer tariff rates, and adds 18% GST to estimate annual premium.',
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
  name: 'Home Insurance Coverage Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/home-insurance-coverage-calculator',
  description: 'Calculate home insurance structure reconstruction cost, contents sum insured, and annual premium in India.',
  featureList: [
    'Building structure and contents mode toggle',
    'Construction cost per sq ft estimator',
    'Valuables and jewellery add-on calculator',
    'Bharat Griha Raksha policy premium breakdown',
    '18% GST estimate',
    'Donut chart coverage split',
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
  name: 'How to Calculate Home Insurance Coverage and Premium',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Home Insurance Coverage Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter Built-Up Area', text: 'Input total covered area of the flat or house in square feet.' },
    { '@type': 'HowToStep', position: 2, name: 'Select Construction Quality', text: 'Choose standard, premium, or luxury construction cost per sq ft.' },
    { '@type': 'HowToStep', position: 3, name: 'Add Household Contents', text: 'Input estimated value of furniture, electronics, appliances, and jewellery.' },
    { '@type': 'HowToStep', position: 4, name: 'Review Sum Insured & Premium', text: 'View total sum insured, premium breakdown under Bharat Griha Raksha, and GST.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Home Insurance',
  alternateName: 'Bharat Griha Raksha Property Insurance',
  description: 'A property insurance policy providing financial indemnity against physical loss or damage to residential building structures and household contents caused by natural perils, fire, and burglary.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Home_insurance',
    'https://www.wikidata.org/wiki/Q1198460',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Home Insurance Coverage Calculator: Structure & Content Cover',
  url: 'https://fermor.in/calculators/home-insurance-coverage-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Home Insurance', alternateName: 'Bharat Griha Raksha Property Insurance' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Homeowners, tenants, apartment buyers in India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-home-insurance', name: 'What Is Home Insurance and How Is Sum Insured Determined?' },
    { '@type': 'WebPageElement', cssSelector: '#structure-vs-land-value', name: 'Structure Reconstruction Value vs Property Market Value' },
    { '@type': 'WebPageElement', cssSelector: '#bharat-griha-raksha', name: 'Bharat Griha Raksha: IRDAI Standard Policy & 14 Inbuilt Perils' },
    { '@type': 'WebPageElement', cssSelector: '#contents-and-valuables', name: 'Household Contents, Valuables & Jewellery Cover Guidelines' },
    { '@type': 'WebPageElement', cssSelector: '#home-vs-society-insurance', name: 'Individual Home Insurance vs Housing Society Master Policy' },
    { '@type': 'WebPageElement', cssSelector: '#reconstruction-rates-table', name: 'Reconstruction Cost Benchmarks Across Indian Tiers' },
    { '@type': 'WebPageElement', cssSelector: '#claim-settlement-process', name: 'Step-by-Step Claim Settlement Process & Documentation' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Home Insurance Coverage Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function HomeInsuranceCoveragePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <HomeInsuranceCoverageClient />
    </>
  );
}

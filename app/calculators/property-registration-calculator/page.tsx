import type { Metadata } from 'next';
import PropertyRegistrationClient from './PropertyRegistrationClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/property-registration-calculator`;
  return {
    title: 'Property Registration Cost Calculator: Stamp Duty + Fees',
    description:
      'Calculate total property registration cost including stamp duty, registration charges, GST, and legal fees across 14 Indian states. Free to use.',
    keywords: [
      'property registration cost calculator',
      'stamp duty registration calculator',
      'property registration fee calculator',
      'land registration fee calculator',
      'land registration charges calculator',
      'calculate land registration fees',
      'flat registration fee calculator',
      'house registration charges calculator',
      'property registration charges calculator',
      'stamp duty and registration fee calculator',
      'stamp duty and registration fees calculator',
      'calculate stamp duty and registration',
      'registration charges calculator',
      'property purchase cost calculator',
      'home buying cost calculator',
      'total cost of buying property india',
      'property buying cost breakdown',
      'stamp duty on property registration',
      'registration fees for property',
      'property registration process india',
      'igr stamp duty calculator',
      'kaveri stamp duty',
      'registration charges on property purchase',
      'gst on under construction property',
      'property registration india 2026',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Property Registration Cost Calculator: Stamp Duty + Fees',
      description:
        'Calculate total property registration cost including stamp duty, registration charges, GST, and legal fees across 14 Indian states. Free to use.',
      images: ['https://fermor.in/og-property-registration-calculator.png'],
    },
    openGraph: {
      title: 'Property Registration Cost Calculator: Stamp Duty + All Fees',
      description:
        'Free calculator for total property registration cost in India. Covers stamp duty, registration charges, GST on under-construction properties, legal fees, and franking charges for 14 states.',
      type: 'website',
      url: 'https://fermor.in/calculators/property-registration-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-property-registration-calculator.png', width: 1200, height: 630, alt: 'Fermor Property Registration Cost Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-15';
const PAGE_DATE_MODIFIED  = '2026-07-15';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 200,
    height: 60,
  },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system that connects real financial accounts and automates the decisions people know they should make but never get around to.',
  knowsAbout: [
    'Property Registration India',
    'Stamp Duty Calculation',
    'GST on Under-Construction Property',
    'Home Loan Eligibility',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Real Estate Taxation',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is property registration cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Property registration cost is the total upfront expense to legally transfer a property into your name, above the property price. It includes stamp duty (4-8% of property value), registration charges (0.5-3%), GST on under-construction properties (1-12%), legal fees (approximately 0.5%), franking charges (Rs 300 in select states), and miscellaneous municipal fees. On a Rs 1 crore property in Maharashtra, total registration costs typically reach Rs 6.8-7 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is property registration cost calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Property registration cost = Stamp Duty + Registration Charges + GST (only on under-construction property) + Legal Fees + Franking Charges + Miscellaneous Fees. Stamp duty is 4-8% of the property value or circle rate (whichever is higher). Registration charges are typically 1%, capped in some states. GST is 1% for affordable housing and 5% for other under-construction residential properties. Use this calculator to get an exact state-wise breakup.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the stamp duty on property registration in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stamp duty on property registration ranges from 4% to 8% depending on the state. Maharashtra charges 6% for male buyers and 5% for female buyers. Delhi charges 6% for men and 4% for women. Karnataka uses a tiered structure: 2% up to Rs 20 lakh, 3% up to Rs 45 lakh, and 5% above Rs 45 lakh. Tamil Nadu charges a flat 7%. Telangana and Andhra Pradesh charge 5%. Kerala has the highest rate at 8%.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the registration charges on a property purchase?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Registration charges are the fee paid to the sub-registrar office to record the property sale deed. Most states charge 1% of property value. Maharashtra caps registration at Rs 30,000. Delhi caps it at Rs 2 lakh. Haryana charges a flat Rs 50,000. Madhya Pradesh charges 3%, which is among the highest in India. Tamil Nadu charges 4% on the first Rs 30,000 and 1% above that.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the land registration fee in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Land registration fee is the charge paid to the sub-registrar office to officially transfer land ownership on government records. In most Indian states this fee is 1% of the land value. Maharashtra caps the fee at Rs 30,000. Some states like Madhya Pradesh charge 3%. The fee is paid at the time of executing and registering the sale deed at the sub-registrar office.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a flat registration fee calculator used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A flat registration fee calculator estimates the total cost to register an apartment or flat, covering stamp duty, registration charges, and GST where applicable. The inputs are the flat\'s agreement value (or ready reckoner rate if higher), the state, the buyer\'s gender (for concessions), and whether the flat is under-construction or ready to move in. This property registration cost calculator covers all these inputs for 14 Indian states.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are house registration charges in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'House registration charges include stamp duty plus registration fees, together typically 5-10% of property value. On a Rs 50 lakh house, stamp duty and registration together range from Rs 2.5 lakh (Gujarat, 5.9%) to Rs 5 lakh (Kerala, 10%). Adding legal fees and miscellaneous costs brings the total to Rs 2.8-5.5 lakh on a Rs 50 lakh property.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is GST applicable on property registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'GST applies only on under-construction properties, not on ready-to-move-in properties registered after receiving the Occupancy Certificate. For affordable under-construction residential housing (value up to Rs 45 lakh), GST is 1%. For other under-construction residential property (above Rs 45 lakh), GST is 5%. Commercial under-construction properties attract 12% GST. Buying a ready-to-move-in property eliminates GST entirely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do women buyers get lower stamp duty in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Most Indian states offer 1-2% stamp duty concession for female property buyers. Delhi reduces stamp duty from 6% to 4% for women, saving Rs 2 lakh on a Rs 1 crore property. Maharashtra reduces from 6% to 5%. Uttar Pradesh from 7% to 5%. Haryana and Punjab also offer 2% concessions. Karnataka, Tamil Nadu, Gujarat, and Telangana do not differentiate by gender.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the total cost of buying a property in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The total cost of buying a property is the property price plus all upfront transaction costs. On a Rs 1 crore ready-to-move-in flat in Maharashtra for a male buyer: stamp duty Rs 6 lakh, registration Rs 30,000, legal fees Rs 50,000, miscellaneous Rs 10,300. Total registration cost: approximately Rs 6.9 lakh. With a 20% down payment of Rs 20 lakh, total upfront cash needed is approximately Rs 26.9 lakh before the home loan begins.',
      },
    },
    {
      '@type': 'Question',
      name: 'What documents are needed for property registration in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Property registration requires: sale deed executed on stamp paper, Aadhaar and PAN card of buyer and seller, address proof, encumbrance certificate (EC) from the sub-registrar, NOC from builder or housing society, property card or index-II extract, and two witnesses with identity proof. The buyer and seller (or their power of attorney holder) must appear in person at the sub-registrar office.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are franking charges in property registration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Franking charges are a nominal fee (Rs 300) collected by authorized banks and financial institutions to physically stamp property documents as proof of stamp duty payment. Franking is applicable in states like Maharashtra, Karnataka, and Gujarat and is charged before formal registration at the sub-registrar office.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I reduce property registration cost legally?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective legal ways to reduce property registration cost are: (1) Register in a female buyer\'s name to save 1-2% stamp duty in most states. (2) Buy a ready-to-move-in property to eliminate GST. (3) Choose a property below Rs 45 lakh to qualify for 1% GST instead of 5% on under-construction. (4) Claim stamp duty as a deduction under Section 80C of the Income Tax Act (up to Rs 1.5 lakh under the old regime). (5) Choose a state with lower rates if you have flexibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform providing 500+ free financial calculators across personal finance, loans, investments, and tax planning. The property registration cost calculator, home loan EMI calculator, income tax calculator, and GST calculator are among the most-used tools. A free account lets you save your calculations.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Property Registration Cost Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/property-registration-calculator',
  description: 'Calculate total property registration cost including stamp duty, registration charges, GST, legal fees, and franking charges across 14 Indian states. State comparison table, donut chart breakdown, and multi-currency support. Free to use.',
  featureList: [
    'Full Breakdown: Itemized stamp duty, registration, GST, legal fees, franking, and miscellaneous',
    'State Comparison: Compare total registration cost across 8 states for the same property',
    'Gender-specific stamp duty concessions for all states',
    'GST calculation for under-construction vs ready-to-move-in properties',
    'Total cost of purchase including 20% down payment and home loan',
    'Multi-currency support (INR, USD, EUR, GBP)',
    '4-segment donut chart for visual cost breakdown',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Property Registration Cost Calculator', item: 'https://fermor.in/calculators/property-registration-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Property Registration Cost in India',
  description: 'Step-by-step guide to calculating total property registration cost including stamp duty, registration charges, and GST using this calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Property Registration Cost Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the property value',
      text: 'Use the slider or type your property\'s agreement value (or ready reckoner rate if higher). The calculator supports values from Rs 10 lakh to Rs 5 crore.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select your state',
      text: 'Choose from 14 major Indian states. The calculator instantly applies that state\'s stamp duty rate, registration charge rate or cap, and franking rules.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set property type, status, and buyer gender',
      text: 'Select residential or commercial, ready-to-move-in or under-construction, and buyer gender. These inputs determine GST applicability and gender-specific stamp duty concessions.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the itemized breakdown',
      text: 'The output panel shows stamp duty, registration charges, GST, legal fees, franking, and miscellaneous charges individually, with a total registration cost and total cost of purchase.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Compare across states',
      text: 'Switch to the State Comparison tab to see total registration cost for 8 major states side by side, helping you understand the financial difference of buying in different cities.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Property Registration',
  alternateName: 'Property Registration in India',
  description: 'The legal process of recording the transfer of ownership of real estate in the government register maintained by the sub-registrar, involving payment of stamp duty and registration charges as prescribed by the relevant state government.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Real Estate and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Land_registration',
    'https://www.wikidata.org/wiki/Q1281406',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Property Registration Cost Calculator: Stamp Duty + Fees',
  description: 'Free property registration cost calculator for India. Calculate stamp duty, registration charges, GST, and legal fees across 14 states with state comparison table.',
  url: 'https://fermor.in/calculators/property-registration-calculator',
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
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Property Registration', alternateName: 'Land Registration India' },
    { '@type': 'DefinedTerm', name: 'Stamp Duty' },
    { '@type': 'DefinedTerm', name: 'GST on Property' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home buyers, property investors, first-time buyers, NRI property buyers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-property-registration-cost',  name: 'What is Property Registration Cost' },
    { '@type': 'WebPageElement', cssSelector: '#how-registration-cost-is-calculated', name: 'How Registration Cost is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#stamp-duty-vs-registration-charges',  name: 'Stamp Duty vs Registration Charges' },
    { '@type': 'WebPageElement', cssSelector: '#state-wise-property-registration-costs', name: 'State-wise Property Registration Costs' },
    { '@type': 'WebPageElement', cssSelector: '#gst-on-under-construction-property',  name: 'GST on Under-Construction Property' },
    { '@type': 'WebPageElement', cssSelector: '#legal-fees-and-other-costs',          name: 'Legal Fees and Other Costs' },
    { '@type': 'WebPageElement', cssSelector: '#women-buyer-concessions',              name: 'Women Buyer Concessions' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-reduce-registration-cost',     name: 'How to Reduce Registration Cost' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required-property-registration', name: 'Documents Required' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example-1-crore-property',     name: 'Worked Example Rs 1 Crore Property' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator',               name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                                 name: 'Frequently Asked Questions' },
  ],
};

export default async function PropertyRegistrationCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <PropertyRegistrationClient />
    </>
  );
}

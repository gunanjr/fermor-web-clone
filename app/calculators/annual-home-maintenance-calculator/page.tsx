import type { Metadata } from 'next';
import AnnualHomeMaintenanceClient from './AnnualHomeMaintenanceClient';

const PAGE_DATE_PUBLISHED = '2026-07-29';
const PAGE_DATE_MODIFIED = '2026-08-21';

export const metadata: Metadata = {
  title: 'Annual Home Maintenance Calculator: 1% Rule & Society Sinking Fund',
  description: 'Free annual home maintenance calculator for India. Estimate society maintenance fees, 1% property value rule, sinking reserve funds, and painting costs. Free to use.',
  keywords: [
    'annual home maintenance calculator',
    'house maintenance cost calculator india',
    'one percent property maintenance rule',
    'flat society maintenance fee calculator per sq ft',
    'sinking fund calculation housing society',
    'annual house painting cost calculator india',
    'apartment maintenance charge estimator 2026',
    'villa home maintenance cost per square foot',
    'home repair emergency reserve fund calculator',
    'gated community society charges estimator',
    'calculate monthly maintenance fund home',
    'property upkeep expenses india',
    'gst on society maintenance charges india',
    'rwa maintenance bill calculation rules',
    'flat sinking fund vs maintenance charges',
    'home maintenance reserve sip planner',
    'property painting budget calculator india',
    'mumbai society maintenance calculator',
    'bangalore flat maintenance cost estimator',
    'home repair contingency fund calculator',
  ],
  openGraph: {
    title: 'Annual Home Maintenance Calculator: 1% Rule & Society Sinking Fund - Fermor',
    description: 'Calculate total annual home maintenance, monthly society charges, sinking reserves, and routine repair costs for apartments and villas in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/annual-home-maintenance-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-annual-home-maintenance-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annual Home Maintenance Calculator - Fermor',
    description: 'Estimate society maintenance fees, 1% rule upkeep expenses, and emergency repair reserves in India. Free to use.',
    images: ['https://fermor.in/og-annual-home-maintenance-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/annual-home-maintenance-calculator' },
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
    'Home Maintenance Expenses',
    '1% Rule of Home Maintenance',
    'Housing Society Maintenance Charges',
    'Sinking Fund',
    'Property Upkeep Reserve',
    'RWA Bye-Laws',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Annual Home Maintenance Calculator', item: 'https://fermor.in/calculators/annual-home-maintenance-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the 1% rule of annual home maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 1% rule states that homeowners should budget approximately 1% of their property purchase value each year for ongoing repairs, painting, routine servicing, and structural maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does housing society maintenance cost per sq ft in Indian cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apartment society maintenance charges range from Rs 2.50 to Rs 4.50 per sq ft per month for basic societies, and Rs 5.00 to Rs 12.00 per sq ft per month for luxury gated societies with clubhouses and swimming pools.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a sinking fund in housing society maintenance bill?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A sinking fund is a mandatory reserve collected by cooperative housing societies (minimum 0.25% of flat construction cost per year) for major long-term repairs like building repainting, lift replacement, and structural waterproofing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should an Indian home be repainted?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Exterior building repainting is conducted every 5 to 7 years, while interior repainting is typically done every 4 to 6 years, costing between Rs 15 to Rs 40 per sq ft of wall area.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are society maintenance charges subject to GST in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if monthly maintenance charges collected by a RWA or housing society exceed Rs 7,500 per flat per month and the society annual turnover exceeds Rs 20 Lakh, GST is applicable at 18% on the entire maintenance bill.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do independent houses cost more to maintain than apartments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, independent houses and villas require 1.5% to 2% of property value per year because structural repairs, roof waterproofing, water tank cleaning, and security are paid entirely by the individual owner.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much emergency maintenance fund should a homeowner keep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Financial planners recommend keeping an emergency home repair reserve equal to at least 1 year of total maintenance budget (typically Rs 50,000 to Rs 1.5 Lakh).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is home insurance included in annual maintenance budget?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, comprehensive home insurance (Bharat Griha Raksha policy) costs approx Rs 2,500 to Rs 6,000 per year for a Rs 1 Crore property covering structure and contents.',
      },
    },
    {
      '@type': 'Question',
      name: 'How to calculate monthly home maintenance reserve needed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Monthly Maintenance Reserve = (Society Charges + Routine Repairs + Annual Insurance + Sinking Fund Reserve) / 12.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the square footage rule for home maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The square footage rule suggests saving Rs 15 to Rs 30 per square foot of built-up area annually for routine home repairs and preventative servicing in Indian residential properties.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does building age affect home maintenance expenses?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Properties under 5 years old require standard maintenance (1.0x multiplier), buildings between 5 and 15 years require 1.25x upkeep due to appliance and plumbing wear, while buildings over 15 years old need 1.5x to 2.0x for major structural and pipeline retrofits.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does this annual home maintenance calculator work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator estimates monthly society charges, annual repair reserves, sinking fund contributions, home insurance premiums, and total monthly SIP needed to fund home upkeep.',
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
  name: 'Annual Home Maintenance Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/annual-home-maintenance-calculator',
  description: 'Estimate housing society maintenance charges, 1% rule repair reserves, sinking funds, and monthly home maintenance SIP needed in India.',
  featureList: [
    'Property value or built-up area input',
    'Apartment vs Independent villa selector',
    'Gated society amenity level customization',
    'Building age multiplier (New, Mid, Old)',
    'Sinking fund and painting reserve calculation',
    'Monthly home maintenance reserve SIP',
    'Donut chart expense breakdown',
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
  name: 'How to Calculate Annual Home Maintenance Expenses',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Annual Home Maintenance Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter property value and area', text: 'Input total property purchase price and built-up area in square feet.' },
    { '@type': 'HowToStep', position: 2, name: 'Select property type', text: 'Choose Apartment in Gated Society or Independent Villa.' },
    { '@type': 'HowToStep', position: 3, name: 'Select building age and luxury level', text: 'Choose building age group and society amenity level.' },
    { '@type': 'HowToStep', position: 4, name: 'Review maintenance budget', text: 'View monthly society bill, annual repair reserve, sinking fund, and total monthly SIP needed.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Home Maintenance Reserve',
  alternateName: 'Sinking Fund & Property Upkeep',
  description: 'An annual financial reserve allocated for routine home servicing, society maintenance, structural repairs, and building repainting.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Real Estate Terms', url: 'https://fermor.in/calculators' },
  sameAs: [
    'https://en.wikipedia.org/wiki/Home_maintenance',
    'https://www.wikidata.org/wiki/Q1198539',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Annual Home Maintenance Calculator: 1% Rule & Society Sinking Fund',
  url: 'https://fermor.in/calculators/annual-home-maintenance-calculator',
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
  about: [{ '@type': 'DefinedTerm', name: 'Home Maintenance Reserve', alternateName: 'Sinking Fund & Property Upkeep' }],
  audience: {
    '@type': 'Audience',
    audienceType: 'Homeowners, property buyers, landlords, society committee members',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-home-maintenance', name: 'What Is Home Maintenance Planning?' },
    { '@type': 'WebPageElement', cssSelector: '#one-percent-rule', name: 'The 1% vs 2% Property Maintenance Rule' },
    { '@type': 'WebPageElement', cssSelector: '#society-maintenance-methods', name: 'Housing Society Maintenance Calculation Methods' },
    { '@type': 'WebPageElement', cssSelector: '#sinking-fund-regulations', name: 'Sinking Fund and Building Painting Reserve Norms' },
    { '@type': 'WebPageElement', cssSelector: '#gst-on-maintenance', name: 'GST on Housing Society Maintenance Bills' },
    { '@type': 'WebPageElement', cssSelector: '#maintenance-breakdown-table', name: 'Annual Home Maintenance Cost Breakdown' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Annual Home Maintenance Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function AnnualHomeMaintenancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AnnualHomeMaintenanceClient />
    </>
  );
}

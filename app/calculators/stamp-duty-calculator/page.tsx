import type { Metadata } from 'next';
import StampDutyClient from './StampDutyClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/stamp-duty-calculator`;
  return {
    title: 'Stamp Duty Calculator India: State-wise Rates 2026',
    description:
      'Free stamp duty calculator for India. Calculate stamp duty and registration charges across all states with state-wise rate comparison, GST on under-construction property, and women buyer concessions. Free to use.',
    keywords: [
      'stamp duty calculator',
      'stamp duty calculator india',
      'stamp duty and registration charges calculator',
      'calculate stamp duty and registration',
      'stamp duty estimate',
      'calculate stamp duty online',
      'property stamp duty calculator',
      'stamp duty on property',
      'stamp duty on flat purchase',
      'calculate stamp duty and registration charges',
      'stamp duty and registration fee calculator',
      'stamp duty and registration fees calculator',
      'stamp duty for property registration',
      'stamp duty on home loan',
      'stamp duty rates',
      'property registration charges calculator',
      'registration stamp duty calculator',
      'land registration fee calculator',
      'gift deed stamp duty calculator',
      'leave and license stamp duty calculator',
      'kaveri online stamp duty calculator',
      'stamp duty on commercial property',
      'stamp duty percentage',
      'stamp duty cost',
      'stamp duty how much',
      'stamp duty value of property',
      'stamp duty india 2026',
      'property registration charges india',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Stamp Duty Calculator India: State-wise Rates 2026',
      description:
        'Calculate stamp duty and registration charges across all Indian states. GST on under-construction property, women buyer concessions, state comparison. Free to use.',
      images: ['https://fermor.in/og-stamp-duty-calculator.png'],
    },
    openGraph: {
      title: 'Stamp Duty Calculator India: State-wise Rates 2026',
      description:
        'Free stamp duty and registration charges calculator for India. State-wise rates for all 23 major states, GST on under-construction property, women buyer concessions, and side-by-side state comparison. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/stamp-duty-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-stamp-duty-calculator.png', width: 1200, height: 630, alt: 'Fermor Stamp Duty Calculator India' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-15';
const PAGE_DATE_PUBLISHED = '2026-07-15';

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
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Compound Annual Growth Rate',
    'Mutual Fund Returns',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Stamp Duty India',
    'Property Registration Charges',
    'Real Estate Taxation India',
    'GST on Property',
    'Home Loan India',
  ],
};

const faqItems = [
  {
    q: 'What is stamp duty on property in India?',
    a: 'Stamp duty on property in India is a state-levied tax paid by the buyer at the time of property registration, calculated as a percentage of the property value or the circle rate, whichever is higher. It is a legal requirement under the Indian Stamp Act and varies by state, property type, and buyer category. The rate ranges from 2% (Karnataka on affordable homes) to 8.25% (Assam) across Indian states in 2026.',
  },
  {
    q: 'What are the stamp duty rates in India state-wise?',
    a: 'Stamp duty rates in India vary by state. Maharashtra charges 6% (5% for women) on residential property. Delhi charges 6% (4% for women). Karnataka charges 2% to 5% based on value tier. Tamil Nadu charges 7%. Gujarat charges 4.9% on all property types. West Bengal charges 4% to 6% based on value tier. Kerala charges 8%. Haryana charges 7% (5% for women). Full state-wise rates are available in the calculator and comparison table above.',
  },
  {
    q: 'How is stamp duty calculated on property purchase?',
    a: 'Stamp duty is calculated by multiplying the applicable percentage by the property value or the government-determined circle rate, whichever is higher. For example, on a Rs 75 lakh property in Maharashtra, stamp duty for a male buyer = 6% of Rs 75,00,000 = Rs 4,50,000. Registration charges are calculated separately, typically at 1% of the property value subject to state-specific caps. GST at 1% or 5% applies only to under-construction properties.',
  },
  {
    q: 'What is the difference between stamp duty and registration charges?',
    a: 'Stamp duty is a state tax paid on the legal document transferring property ownership, while registration charges are the fee paid to the Sub-Registrar office to officially record the sale deed in government records. Stamp duty rates range from 2% to 8.25% of property value. Registration charges are typically 1% of property value, with state-specific caps (Maharashtra caps at Rs 30,000; Delhi caps at Rs 2,00,000 for residential). Both are paid at the time of property registration.',
  },
  {
    q: 'Do women get a concession on stamp duty in India?',
    a: 'Yes, many Indian states offer a concession on stamp duty for women buyers. Delhi reduces stamp duty from 6% to 4% for women. Maharashtra reduces it from 6% to 5%. Rajasthan reduces it from 6% to 5%. Himachal Pradesh reduces it from 6% to 4%. Uttarakhand reduces it from 5% to 3.75%. Haryana reduces it from 7% to 5%. Punjab reduces it from 7% to 5%. Kerala, Tamil Nadu, Gujarat, Telangana, Andhra Pradesh, and Jharkhand apply the same rate regardless of gender.',
  },
  {
    q: 'Is stamp duty applicable on under-construction property?',
    a: 'Yes, stamp duty is applicable on under-construction property at the same rate as ready-to-move-in property. However, GST is additionally applicable only on under-construction properties: 1% on affordable housing (property value up to Rs 45 lakh) and 5% on all other under-construction residential and commercial properties. Ready-to-move-in property registered with Occupancy Certificate is fully exempt from GST per the GST Council notification.',
  },
  {
    q: 'How much GST do I pay on an under-construction flat?',
    a: 'GST on an under-construction flat is 1% for affordable housing (property value up to Rs 45 lakh) and 5% for all other properties (above Rs 45 lakh). These are the effective rates after the input tax credit (ITC) adjustment per the GST Council notification effective April 1, 2019. On a Rs 75 lakh under-construction property, GST = 5% of Rs 75,00,000 = Rs 3,75,000. Ready-to-move flats with Occupancy Certificate attract zero GST.',
  },
  {
    q: 'What is the stamp duty on a home loan?',
    a: 'Stamp duty on a home loan is the tax paid on the loan agreement, separate from the stamp duty on the property itself. The stamp duty on the loan agreement is typically Rs 200 to Rs 500 as a flat amount in most Indian states, though some states charge a percentage of the loan amount. The significantly larger cost is the stamp duty on the sale deed, which is what this calculator computes: a percentage of the property value paid at registration.',
  },
  {
    q: 'Can stamp duty be included in my home loan?',
    a: 'Stamp duty and registration charges cannot normally be financed as part of the main home loan amount from regulated lenders, since the RBI requires that the loan-to-value (LTV) ratio be calculated against the property value, not including transaction costs. However, some banks offer a separate personal top-up loan specifically for stamp duty and registration. Check with your lender for current options, as this varies by bank policy.',
  },
  {
    q: 'Is stamp duty tax deductible in India?',
    a: 'Stamp duty and registration charges paid for a residential property are tax-deductible under Section 80C of the Income Tax Act, up to a combined limit of Rs 1.5 lakh per year, but only under the old tax regime. No deduction is available under the new tax regime. The deduction is allowed in the year the payment is made. This deduction is on top of the deduction for principal repayment on home loans, and the combined 80C limit of Rs 1.5 lakh applies to all eligible investments and payments together.',
  },
  {
    q: 'How to pay stamp duty online in India?',
    a: 'Stamp duty can be paid online through three methods. e-Stamping via SHCIL (Stock Holding Corporation of India) is accepted in most states: visit shcilestamp.com, select the state, fill the details, and print the e-stamp. Franking is available through authorized banks. Online payment portals: Maharashtra uses https://igrmaharashtra.gov.in, Karnataka uses kaveri.karnataka.gov.in (Kaveri Online Services), and most states have a similar portal on their Inspector General of Registration website.',
  },
  {
    q: 'What documents are required for property registration?',
    a: 'Documents required for property registration in India include: the original sale deed prepared on stamp paper of appropriate value, identity proof (Aadhaar, PAN) of both buyer and seller, address proof, passport-size photographs of both parties, encumbrance certificate, and property tax receipts. For home loan cases, the bank sends a representative with the original title documents. The Sub-Registrar may also require a map or layout plan depending on the state.',
  },
  {
    q: 'What is circle rate and how does it affect stamp duty?',
    a: 'Circle rate (also called guidance value, ready reckoner rate, or floor area rate depending on the state) is the minimum property value set by the government for stamp duty purposes. Stamp duty is calculated on the higher of the actual sale price or the circle rate. If you buy a property for Rs 50 lakh but the circle rate puts the value at Rs 60 lakh, stamp duty is paid on Rs 60 lakh. Circle rates are set area-wise and updated periodically by state governments.',
  },
  {
    q: 'Are there stamp duty exemptions for first-time homebuyers in India?',
    a: 'There is no universal stamp duty exemption for first-time buyers at the national level in India. However, some states offer concessions: Maharashtra has reduced stamp duty for women buyers and offered time-limited reductions during COVID. Some states exempt properties transferred between direct family members (gift deeds between blood relatives). Under PMAY, there is no direct stamp duty exemption but interest subsidy is available. Check with your state\'s Sub-Registrar office for current exemptions.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform that provides 500+ free financial calculators covering loans, tax, investing, and retirement planning. It also has a financial eligibility engine that matches users with loans and investments they qualify for. Available free at fermor.in.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Stamp Duty Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/stamp-duty-calculator',
  featureList: [
    'State-wise stamp duty rates for 23 major Indian states',
    'Gender-based stamp duty concessions for women buyers',
    'GST calculation on under-construction property',
    'Registration charges with state-specific caps',
    'Stamp Duty vs State Comparison table for 10 major states',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Property type selection: Residential, Commercial, Agricultural',
    'Under-construction vs Ready-to-Move property toggle',
    'Total upfront cost breakdown with donut chart',
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
    { '@type': 'ListItem', position: 3, name: 'Stamp Duty Calculator', item: 'https://fermor.in/calculators/stamp-duty-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Stamp Duty and Registration Charges in India',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Stamp Duty Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Property Value',
      text: 'Use the property value slider to set the purchase price of the property, from Rs 5 lakh to Rs 5 crore. You can also click the displayed value to type an exact amount.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Your State',
      text: 'Choose the state where the property is located from the dropdown. The calculator applies the correct stamp duty rate for that state automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Property Type and Buyer Category',
      text: 'Select Residential, Commercial, or Agricultural for property type. Select Male or Female for buyer category, as many states offer lower rates for women buyers.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select Property Status',
      text: 'Toggle between Ready to Move and Under Construction. GST at 1% or 5% is added only for under-construction properties per GST Council rules.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'View Your Breakdown',
      text: 'The output panel shows stamp duty amount, registration charges, GST if applicable, and total upfront cost. Switch to the State Comparison tab to see rates across 10 major states for your property value.',
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Stamp Duty Calculator India: State-wise Rates 2026',
  url: 'https://fermor.in/calculators/stamp-duty-calculator',
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
    { '@type': 'DefinedTerm', name: 'Stamp Duty', alternateName: 'Property Stamp Duty India' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home buyers, property investors, NRI investors, first-time home buyers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-stamp-duty', name: 'What is stamp duty on property in India?' },
    { '@type': 'WebPageElement', cssSelector: '#stamp-duty-rates-by-state', name: 'Stamp duty rates by state in India 2026' },
    { '@type': 'WebPageElement', cssSelector: '#how-stamp-duty-is-calculated', name: 'How stamp duty is calculated on property purchase' },
    { '@type': 'WebPageElement', cssSelector: '#registration-vs-stamp-duty', name: 'Registration charges vs stamp duty' },
    { '@type': 'WebPageElement', cssSelector: '#women-buyer-concession', name: 'Women buyer stamp duty concession by state' },
    { '@type': 'WebPageElement', cssSelector: '#under-construction-gst', name: 'Stamp duty on under-construction property and GST' },
    { '@type': 'WebPageElement', cssSelector: '#stamp-duty-exemptions', name: 'Stamp duty exemptions and concessions in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-pay-stamp-duty', name: 'How to pay stamp duty online in India' },
    { '@type': 'WebPageElement', cssSelector: '#stamp-duty-home-loan', name: 'Stamp duty on home loan' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked example: Rs 75 lakh property in Maharashtra' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this stamp duty calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently asked questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Stamp Duty',
  alternateName: 'Property Stamp Duty',
  description: 'Stamp duty is a state government tax levied on legal instruments including property sale deeds in India, calculated as a percentage of the property value or government circle rate, whichever is higher.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Property and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Stamp_duty',
    'https://www.wikidata.org/wiki/Q1777301',
  ],
};

export default async function StampDutyCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <StampDutyClient faqItems={faqItems} />
    </>
  );
}

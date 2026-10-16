import type { Metadata } from 'next';
import RentVsBuyClient from './RentVsBuyClient';

const PAGE_DATE_PUBLISHED = '2026-07-27';
const PAGE_DATE_MODIFIED = '2026-07-27';

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator: House Decision India',
  description: 'Free rent vs buy calculator for India. Compare net wealth from buying a house vs renting and investing in mutual funds over any time horizon. Free to use.',
  keywords: [
    'rent vs buy calculator',
    'should i rent or buy a house calculator',
    'rent vs buy calculator india',
    'is buying better than renting calculator',
    'rent vs buy wealth comparison',
    'home loan vs rent calculator',
    'renting vs home buying decision calculator',
    'buying house vs sip mutual funds calculator',
    'rent vs buy calculator bangalore',
    'rent vs buy calculator mumbai',
    'rent vs buy calculator gurgaon ncr',
    'rent vs buy mathematical model',
    'property appreciation vs sip returns calculator',
    'rent vs buy calculator excel',
    'rent vs buy financial decision tool',
    'buying flat vs renting flat comparison',
    'rent vs buy after tax benefits calculator',
    'hra vs home loan tax savings calculator',
    'nri rent vs buy calculator india',
    'real estate vs equity investment calculator',
  ],
  openGraph: {
    title: 'Rent vs Buy Calculator: Financial Decision Tool - Fermor',
    description: 'Compare long-term net wealth between buying a home with a mortgage versus renting and investing monthly savings into equity SIPs. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/rent-vs-buy-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-rent-vs-buy-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator - Fermor',
    description: 'Compare net wealth of buying a home vs renting and investing savings in SIPs. Free to use.',
    images: ['https://fermor.in/og-rent-vs-buy-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/rent-vs-buy-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Rent vs Buy', 'Property Appreciation', 'SIP Mutual Funds', 'Home Loan EMI', 'Rental Yield', 'Opportunity Cost', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Rent vs Buy Calculator', item: 'https://fermor.in/calculators/rent-vs-buy-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How does a rent vs buy calculator work?', acceptedAnswer: { '@type': 'Answer', text: 'A rent vs buy calculator compares the financial net worth achieved over N years by buying a property (down payment, EMI, property appreciation, maintenance) against renting (monthly rent, 5% annual escalation, investing the down payment and monthly EMI savings in mutual funds).' } },
    { '@type': 'Question', name: 'When is renting financially better than buying a house in India?', acceptedAnswer: { '@type': 'Answer', text: 'Renting is often financially superior when rental yields are low (2% to 3.5%) and expected equity SIP returns (11% to 13%) significantly outpace property appreciation (5% to 7%) over a 10 to 15 year horizon.' } },
    { '@type': 'Question', name: 'When is buying a house better than renting?', acceptedAnswer: { '@type': 'Answer', text: 'Buying wins when you plan to stay in the property long-term (15+ years), when property appreciation matches or exceeds loan rates, or when emotional stability and inflation-hedged housing security outweigh pure investment arbitrage.' } },
    { '@type': 'Question', name: 'What is the opportunity cost of down payment?', acceptedAnswer: { '@type': 'Answer', text: 'The opportunity cost is the compounding return you give up by locking cash into a home down payment instead of investing it in higher-yielding assets like equity mutual funds.' } },
    { '@type': 'Question', name: 'How does rent escalation impact the decision?', acceptedAnswer: { '@type': 'Answer', text: 'Rent in Indian tier-1 cities typically escalates by 5% to 10% annually or every 11 months, gradually reducing the monthly savings gap between renting and a fixed home loan EMI.' } },
    { '@type': 'Question', name: 'How do tax benefits under Section 24(b) and 80C affect buying?', acceptedAnswer: { '@type': 'Answer', text: 'Home loan interest deduction up to Rs 2 lakh under Section 24(b) (old regime) reduces effective borrowing cost, boosting the net financial return of buying for high-tax-bracket buyers.' } },
    { '@type': 'Question', name: 'Does HRA tax exemption favor renting?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Salaried employees under the old tax regime can claim HRA tax exemption on rent paid, lowering effective rental cost and making renting more attractive.' } },
    { '@type': 'Question', name: 'What annual property appreciation rate is realistic in Indian metro cities?', acceptedAnswer: { '@type': 'Answer', text: 'Historical real estate price CAGR in top Indian metros (Mumbai, Bengaluru, NCR, Pune) has averaged between 5% and 8% per annum over 10-year rolling periods.' } },
    { '@type': 'Question', name: 'What investment return rate should be used for rent savings?', acceptedAnswer: { '@type': 'Answer', text: 'A conservative estimate of 11% to 12% CAGR is standard for diversified Nifty 50 or broad-market equity mutual fund SIPs over a 10+ year investment horizon.' } },
    { '@type': 'Question', name: 'Is property maintenance included in the buy calculation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Annual maintenance, society charges, property tax, and repairs are estimated at 0.5% to 1.0% of the property value per year.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Rent vs Buy Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/rent-vs-buy-calculator',
  description: 'Compare net wealth outcomes between buying a home with a mortgage versus renting and investing monthly savings into equity mutual funds.',
  featureList: ['Rent vs Buy net wealth comparison', 'Property appreciation modeling', 'SIP return & opportunity cost simulation', 'Year-by-year wealth schedule table', 'Donut chart final asset split', 'Tax benefit & HRA inclusion', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Compare Renting vs Buying a Home', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Rent vs Buy Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter target property price and monthly rent', text: 'Enter the price of the home you want to buy and the current rent for a similar home.' },
    { '@type': 'HowToStep', position: 2, name: 'Set expected property growth and SIP return rate', text: 'Enter expected real estate appreciation % and SIP return %.' },
    { '@type': 'HowToStep', position: 3, name: 'Set horizon and loan rate', text: 'Set investment duration (years) and home loan interest rate.' },
    { '@type': 'HowToStep', position: 4, name: 'Review net wealth outcome', text: 'Compare total net worth achieved by buying vs renting & investing side-by-side.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Rent vs Buy Decision', alternateName: 'Housing Opportunity Cost Model',
  description: 'A financial comparison model that measures net asset creation from home ownership against renting and investing the cost differential in financial assets.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Personal Finance and Housing Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Opportunity_cost'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Rent vs Buy Calculator: House Decision India',
  url: 'https://fermor.in/calculators/rent-vs-buy-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Rent vs Buy Decision', alternateName: 'Housing Opportunity Cost Model' }],
  audience: { '@type': 'Audience', audienceType: 'Indian home buyers, tenants, financial planners, NRI investors', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-rent-vs-buy', name: 'What Is Rent vs Buy Decision' },
    { '@type': 'WebPageElement', cssSelector: '#mathematical-model', name: 'Rent vs Buy Mathematical Model' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example' },
    { '@type': 'WebPageElement', cssSelector: '#opportunity-cost', name: 'Opportunity Cost of Down Payment' },
    { '@type': 'WebPageElement', cssSelector: '#year-by-year-table', name: 'Year-by-Year Wealth Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#rental-yield-impact', name: 'Rental Yield Impact' },
    { '@type': 'WebPageElement', cssSelector: '#tax-impact', name: 'Tax Impact: Section 24b vs HRA' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formula', name: 'Rent vs Buy Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes in Rent vs Buy Analysis' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-decide', name: 'How to Make Your Decision' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function RentVsBuyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <RentVsBuyClient />
    </>
  );
}

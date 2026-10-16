import type { Metadata } from 'next';
import RealReturnCalculatorClient from './RealReturnCalculatorClient';

const PAGE_DATE = '2026-09-16';
const CANONICAL = 'https://fermor.in/calculators/real-return-calculator';

export const metadata: Metadata = {
  title: 'Real Return Calculator: Rental Yield & Property ROI Calculator India',
  description: 'Free real return calculator for India. Calculate rental yield, property ROI, property appreciation, cash-on-cash return, and inflation-adjusted real return on real estate investment. Free, instant results.',
  keywords: [
    'real return calculator',
    'calculating rental yield',
    'roi calculator real estate',
    'rental property roi calculator',
    'property appreciation calculator',
    'real estate return on investment calculator',
    'roi rental property calculator',
    'real estate rate of return calculator',
    'real estate return calculator',
    'return on rental investment calculator',
    'formula for real rate of return',
    'real return on investment formula',
    'return on investment rental calculator',
    'roi in real estate investment',
    'property roi calculator',
    'investment property roi calculator',
    'rental property return calculator',
    'real rate of return calculator',
    'yield calculation property',
    'property return calculator',
    'cash flow rental calculator',
    'roi real estate formula',
    'yield on rental property',
    'rental rate of return calculator',
    'irr calculator real estate',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Real Return Calculator: Rental Yield & Property ROI - Fermor',
    description: 'Calculate gross rental yield, net yield, property appreciation ROI, and inflation-adjusted real return on any Indian real estate investment.',
    url: CANONICAL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Return Calculator: Rental Yield & Property ROI - Fermor',
    description: 'Calculate gross rental yield, net yield, property appreciation ROI, and inflation-adjusted real return on any Indian real estate investment.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  sameAs: ['https://fermor.in'],
  knowsAbout: ['Real Estate Investment', 'Rental Yield Calculation', 'Property ROI', 'Real Return', 'Financial Calculators', 'India Real Estate'],
};

const faqs = [
  { q: 'How is rental yield calculated in India?', a: 'Gross rental yield = (Annual Rent / Property Value) x 100. A property worth Rs 80 lakh earning Rs 24,000/month has gross yield = (2,88,000 / 80,00,000) x 100 = 3.6%. Net yield deducts maintenance, vacancy, and property tax to give actual return in hand.' },
  { q: 'What is a good rental yield in India?', a: 'A gross rental yield of 3-4% is typical for metro cities like Mumbai, Delhi, and Bengaluru. Tier-2 cities often yield 4-6%. Net yields are 1-2 percentage points lower after costs. Yields above 5% gross in a metro location are considered above average for Indian real estate.' },
  { q: 'How do I calculate ROI on a rental property?', a: 'ROI = (Net Annual Rent + Capital Appreciation) / Total Investment x 100. This calculator computes this automatically over any holding period, combining cumulative net rental income and property appreciation at exit.' },
  { q: 'What is the real return on property investment?', a: 'Real return is the nominal CAGR adjusted for inflation using the Fisher equation: Real Return = [(1 + Nominal CAGR) / (1 + Inflation)] - 1. If your property delivers 12% nominal return and inflation is 6%, your real return is approximately 5.66%.' },
  { q: 'How does property appreciation affect ROI?', a: 'Appreciation is typically the dominant return driver in Indian metro markets. A 7% annual appreciation on a Rs 1 crore property generates Rs 7 lakh capital gain per year, far exceeding the Rs 2.5-3 lakh typical rental income. The donut chart above shows this split.' },
  { q: 'What costs reduce net rental yield?', a: 'Key deductions: property maintenance (0.5-1.5% annually), vacancy (8-12% of gross rent for each empty month), management fees (8-10% if using an agent), municipal taxes (0.1-0.3%). This calculator bundles these as a single annual cost percentage in "More Settings."' },
  { q: 'Is property a better investment than mutual funds in India?', a: 'Both have delivered 10-13% nominal CAGR historically. Property offers leverage and LTCG tax shelter; mutual funds offer liquidity and no transaction costs. The real return after inflation and costs averages 4-6% for both over 15-year periods.' },
  { q: 'What property appreciation rate should I assume in India?', a: 'Conservative: 6% for mature metros. Moderate: 8% for growth corridors and Tier-2 cities. Optimistic: 10-12% for emerging markets. The RBI House Price Index shows 7.3% national average CAGR from 2010-2024. Use 7% as a balanced base assumption.' },
  { q: 'How do I calculate cash-on-cash return for a leveraged property?', a: 'Cash-on-cash = Annual Net Cash Flow / Total Cash Invested. For a Rs 80 lakh property with Rs 20 lakh down and Rs 60 lakh loan at 8.5%, EMI is about Rs 52,000/month. If rent is Rs 25,000 and costs are Rs 3,000, monthly cash flow is negative Rs 30,000. Negative cash-on-cash is common in Indian metros where rental yields fall below loan rates.' },
  { q: 'Is rental income taxable in India?', a: 'Yes. Rental income is taxable under "Income from House Property." A 30% standard deduction is allowed on net annual value, plus full home loan interest deduction. TDS of 2% applies under Section 194-IB if monthly rent exceeds Rs 50,000, effective from 1 October 2024. Rental income is added to your total income and taxed at slab rates.' },
  { q: 'What is the formula for real rate of return?', a: 'Real rate of return = [(1 + Nominal Return) / (1 + Inflation Rate)] - 1. With 11% nominal and 6% inflation: (1.11 / 1.06) - 1 = 4.72%. The common approximation (11% - 6% = 5%) overstates by 0.28 percentage points, which compounds into a large error over 10-20 year horizons.' },
  { q: 'How is property ROI different from rental yield?', a: 'Yield measures only annual rental income relative to property value (a snapshot). ROI includes both rental income AND capital appreciation over a full holding period. A property with 3% gross yield and 8% annual appreciation delivers roughly 11% total annual ROI, making yield alone very misleading for investment decisions.' },
  { q: 'How is IRR different from simple ROI for real estate?', a: 'Simple ROI divides total profit by investment, ignoring time value of money. IRR is the annualised return that equates all cash inflows (rent and sale proceeds) to the initial outflow. This calculator shows CAGR, which closely approximates IRR when annual rental income is reinvested.' },
  { q: 'Is home loan interest fully deductible on a rental property?', a: 'Yes, and without any cap. Under Section 24(b), self-occupied property limits interest deduction to Rs 2 lakh a year, but a let-out property has no ceiling at all, the full interest paid against rental income can be claimed. This makes leveraged rental property more tax-efficient than the cash flow numbers alone suggest.' },
  { q: 'How do I check if a property project is RERA-registered?', a: 'Any project larger than 500 square metres or with more than 8 apartments must be registered with the state RERA authority under the Real Estate (Regulation and Development) Act, 2016. Search the project name on your state RERA website before booking. Registration means the promoter must deposit 70% of buyer funds in escrow for construction.' },
  { q: 'What happens if I sell my property below the circle rate?', a: 'Under Section 50C, capital gains are computed using the higher of the actual sale price or the stamp duty (circle rate) value, unless the gap is within a 10% tolerance band. The same difference can also be taxed as income in the buyer\'s hands under Section 56(2)(x), so both parties are affected.' },
  { q: 'Do I pay GST when buying a property?', a: 'Only on under-construction property: 5% GST without input tax credit, or 1% for affordable housing (up to 60 sq m carpet area in metros, priced at Rs 45 lakh or below). A ready-to-move property (paid for after the completion certificate) and any resale property sold by an individual owner attract no GST.' },
  { q: 'Is TDS different when renting from an NRI landlord?', a: 'Yes, significantly higher. Tenants must deduct TDS at 30% (31.2% with cess) under Section 195 from the first rupee of rent paid to an NRI landlord, with no minimum threshold, compared to 2% above Rs 50,000/month for resident landlords under Section 194-IB. A lower rate needs a Section 197 certificate or DTAA relief arranged by the NRI landlord in advance.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor Real Return Calculator',
  url: CANONICAL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate gross rental yield, net rental yield, property ROI, and inflation-adjusted real return on Indian real estate investments.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  featureList: [
    'Gross and net rental yield',
    'Property appreciation ROI',
    'Total return over holding period',
    'Inflation-adjusted real return (Fisher equation)',
    'Year-by-year value projection',
    'Old and new tax regime comparison',
  ],
  dateModified: PAGE_DATE,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Real Return Calculator', item: CANONICAL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Real Return on Property Investment',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter property value', text: 'Input the purchase price of the property including stamp duty and registration cost.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter monthly rent', text: 'Enter the expected or current monthly rent receivable from the property.' },
    { '@type': 'HowToStep', position: 3, name: 'Set holding period', text: 'Enter the number of years you plan to hold the property before selling.' },
    { '@type': 'HowToStep', position: 4, name: 'Adjust advanced assumptions', text: 'Set annual appreciation rate, cost % (maintenance + vacancy), and inflation rate in More Settings.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your results', text: 'The calculator shows gross yield, net yield, property value at exit, total ROI, and real (inflation-adjusted) return.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Real Return on Investment',
  description: 'The inflation-adjusted return on an investment calculated using the Fisher equation: Real Return = [(1 + Nominal Return) / (1 + Inflation Rate)] - 1. It measures the true increase in purchasing power.',
  inDefinedTermSet: 'https://en.wikipedia.org/wiki/Real_versus_nominal_value_(economics)',
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Real Return Calculator: Rental Yield & Property ROI Calculator India',
  url: CANONICAL,
  description: 'Calculate gross rental yield, net rental yield, property appreciation ROI, and inflation-adjusted real return on Indian real estate.',
  datePublished: PAGE_DATE,
  dateModified: PAGE_DATE,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  hasPart: [
    { '@type': 'WebPageElement', name: 'Rental Yield Calculator', cssSelector: '#rental-yield-calculator' },
    { '@type': 'WebPageElement', name: 'What is rental yield', cssSelector: '#what-is-rental-yield' },
    { '@type': 'WebPageElement', name: 'How property ROI is calculated', cssSelector: '#how-property-roi-calculated' },
    { '@type': 'WebPageElement', name: 'Real vs nominal return', cssSelector: '#real-vs-nominal-return' },
    { '@type': 'WebPageElement', name: 'City-wise rental yields India', cssSelector: '#city-wise-rental-yields' },
    { '@type': 'WebPageElement', name: 'Property vs mutual funds', cssSelector: '#property-vs-mutual-funds' },
    { '@type': 'WebPageElement', name: 'Tax on rental income', cssSelector: '#tax-on-rental-income' },
    { '@type': 'WebPageElement', name: 'Common ROI mistakes', cssSelector: '#common-roi-mistakes' },
    { '@type': 'WebPageElement', name: 'Home loan interest deduction on let-out property', cssSelector: '#home-loan-interest-letout' },
    { '@type': 'WebPageElement', name: 'RERA registration', cssSelector: '#rera-registration' },
    { '@type': 'WebPageElement', name: 'Circle rate and capital gains', cssSelector: '#circle-rate-capital-gains' },
    { '@type': 'WebPageElement', name: 'GST on property purchase', cssSelector: '#gst-property-purchase' },
    { '@type': 'WebPageElement', name: 'NRI rental TDS', cssSelector: '#nri-rental-tds' },
    { '@type': 'WebPageElement', name: 'How to use this calculator', cssSelector: '#how-to-use' },
    { '@type': 'WebPageElement', name: 'FAQ', cssSelector: '#faq' },
  ],
};

export default async function RealReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <RealReturnCalculatorClient faqs={faqs} />
    </>
  );
}

import type { Metadata } from 'next';
import BikeLoanEMIClient from './BikeLoanEMIClient';

const PAGE_DATE_PUBLISHED = '2026-07-10';
const PAGE_DATE_MODIFIED = '2026-07-10';

export const metadata: Metadata = {
  title: 'Bike Loan EMI Calculator: Two-Wheeler EMI Instantly',
  description: 'Free bike loan EMI calculator for India. Calculate two-wheeler EMI by amount, rate, and tenure. Compare SBI, HDFC, ICICI rates. Free to use.',
  keywords: [
    'bike loan emi calculator',
    'bike emi calculator',
    'two wheeler loan emi calculator',
    'motorcycle loan emi calculator',
    'bike loan calculator',
    'royal enfield classic 350 emi calculator',
    'hunter 350 emi calculator',
    'royal enfield hunter 350 emi calculator',
    'tvs raider emi calculator',
    'hero splendor plus emi calculator',
    'classic 350 emi calculator',
    'pulsar 150 emi calculator',
    'royal enfield emi calculator',
    'bullet 350 emi calculator',
    'honda activa 6g emi calculator',
    'splendor emi calculator',
    'r15 v4 emi calculator',
    'duke 200 emi calculator',
    'bike emi calculator with down payment',
    'bike loan interest rate calculator',
    'two wheeler emi calculator',
    'scooty emi calculator',
    '2 wheeler loan emi calculator',
    'bike loan interest rates',
    'hdfc bike loan interest rate',
    'royal enfield standard 350 emi calculator',
    'royal enfield bullet 350 emi calculator',
    'pulsar n160 emi calculator',
    'ns 160 emi calculator',
    'yamaha r15 v4 down payment and emi',
  ],
  openGraph: {
    title: 'Bike Loan EMI Calculator: Two-Wheeler EMI Instantly - Fermor',
    description: 'Calculate bike loan EMI for any two-wheeler in India. Supports down payment, processing fee, and bank comparison. See RE Classic 350, Hunter 350, Pulsar, Activa EMIs instantly.',
    type: 'website',
    url: 'https://fermor.in/calculators/bike-loan-emi-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-bike-loan-emi-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bike Loan EMI Calculator - Fermor',
    description: 'Calculate two-wheeler loan EMI by price, down payment, rate, and tenure. Compare SBI, HDFC, ICICI rates. Free to use.',
    images: ['https://fermor.in/og-bike-loan-emi-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/bike-loan-emi-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Bike Loan EMI', 'Two-Wheeler Loan', 'Royal Enfield EMI', 'Honda Activa EMI', 'Hero Splendor EMI', 'Bike Loan Interest Rates', 'Down Payment for Bike Loan', 'SBI Two-Wheeler Loan', 'HDFC Bike Loan', 'Bajaj Finance Two-Wheeler Loan', 'Loan Amortization'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Bike Loan EMI Calculator', item: 'https://fermor.in/calculators/bike-loan-emi-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the EMI for a Rs 1.5 lakh bike loan?', acceptedAnswer: { '@type': 'Answer', text: 'At 9% interest for 3 years with a Rs 1.5 lakh loan, the monthly EMI is approximately Rs 4,770. Use the calculator above to adjust the rate and tenure for your specific lender offer.' } },
    { '@type': 'Question', name: 'What is the Royal Enfield Classic 350 EMI?', acceptedAnswer: { '@type': 'Answer', text: 'The Royal Enfield Classic 350 costs approximately Rs 1.96 lakh ex-showroom Delhi. With a standard 20% down payment of Rs 39,200, the loan amount is Rs 1,56,800. At 9% interest for 3 years, the EMI is approximately Rs 4,987 per month.' } },
    { '@type': 'Question', name: 'What is the Royal Enfield Hunter 350 EMI?', acceptedAnswer: { '@type': 'Answer', text: 'The Royal Enfield Hunter 350 is priced at approximately Rs 1.50 lakh ex-showroom Delhi. With 20% down payment of Rs 30,000, the loan is Rs 1,20,000. At 9% for 3 years, the EMI is approximately Rs 3,817 per month.' } },
    { '@type': 'Question', name: 'What is the Bullet 350 EMI?', acceptedAnswer: { '@type': 'Answer', text: 'The Royal Enfield Bullet 350 costs approximately Rs 1.77 lakh ex-showroom Delhi. With 20% down payment of Rs 35,400, the loan is Rs 1,41,600. At 9% for 3 years, the EMI is approximately Rs 4,503 per month.' } },
    { '@type': 'Question', name: 'What is the Hero Splendor Plus EMI?', acceptedAnswer: { '@type': 'Answer', text: 'The Hero Splendor Plus costs approximately Rs 78,000 ex-showroom Delhi. With 20% down payment of Rs 15,600, the loan is Rs 62,400. At 9% interest for 3 years, the EMI is approximately Rs 1,985 per month.' } },
    { '@type': 'Question', name: 'What is the Honda Activa 6G EMI?', acceptedAnswer: { '@type': 'Answer', text: 'The Honda Activa 6G is priced at approximately Rs 87,000 ex-showroom Delhi. With 20% down payment of Rs 17,400, the loan is Rs 69,600. At 9% for 3 years, the EMI is approximately Rs 2,214 per month.' } },
    { '@type': 'Question', name: 'What is the bike loan interest rate at HDFC Bank?', acceptedAnswer: { '@type': 'Answer', text: 'HDFC Bank offers two-wheeler loans starting at 9.25% per annum for qualified borrowers. The rate you receive depends on your CIBIL score, income, employer category, and the specific bike model financed.' } },
    { '@type': 'Question', name: 'What is the bike loan interest rate at SBI?', acceptedAnswer: { '@type': 'Answer', text: 'SBI offers two-wheeler loans starting at approximately 9.00% per annum. Public sector banks like SBI and Bank of Baroda typically offer the lowest bike loan rates in India, particularly for government employees and existing account holders.' } },
    { '@type': 'Question', name: 'How much down payment is required for a bike loan?', acceptedAnswer: { '@type': 'Answer', text: 'Most banks and NBFCs require a minimum 10% down payment on bike loans, with 20% as the typical standard. A higher down payment reduces the principal, lowers the EMI, and can secure a better interest rate. Bajaj Finance and Hero FinCorp sometimes offer lower down payment options for high-CIBIL borrowers.' } },
    { '@type': 'Question', name: 'Can I get a bike loan with no down payment?', acceptedAnswer: { '@type': 'Answer', text: 'Some dealers and NBFCs offer 100% financing (zero down payment) for borrowers with a CIBIL score above 750 and stable salaried income. The interest rate on such loans is typically 1-2% higher than standard loans. This is more common at manufacturer-backed finance arms like Honda Financing Services.' } },
    { '@type': 'Question', name: 'What documents are needed for a bike loan?', acceptedAnswer: { '@type': 'Answer', text: 'Salaried applicants need PAN, Aadhaar, the last 3 months of salary slips, and 6 months of bank statements. Self-employed applicants need ITR for 2 years, 6 months of bank statements, and proof of business existence such as a GST registration or shop license.' } },
    { '@type': 'Question', name: 'What is the maximum tenure for a bike loan?', acceptedAnswer: { '@type': 'Answer', text: 'The maximum tenure for a two-wheeler loan in India is 5 years (60 months) at most banks and NBFCs. Some lenders cap at 4 years for used bikes or models over 3 years old. A shorter tenure means a higher EMI but less total interest paid.' } },
    { '@type': 'Question', name: 'How is bike loan EMI calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Bike loan EMI is calculated using the standard amortization formula: EMI = P x r x (1+r)^n divided by ((1+r)^n - 1), where P is the loan principal, r is the monthly interest rate (annual rate divided by 1200), and n is the tenure in months. At 9% for 3 years on Rs 1 lakh, the EMI is approximately Rs 3,180.' } },
    { '@type': 'Question', name: 'How to reduce bike loan EMI?', acceptedAnswer: { '@type': 'Answer', text: 'Pay a larger down payment to reduce the principal, improve your CIBIL score above 750 to qualify for a lower rate, extend the tenure to 4 or 5 years, or choose a more affordable bike model. Making a one-time prepayment of even Rs 10,000-20,000 in the first year reduces both tenure and total interest significantly.' } },
    { '@type': 'Question', name: 'What is the difference between ex-showroom and on-road price for a bike?', acceptedAnswer: { '@type': 'Answer', text: 'The ex-showroom price is what the manufacturer charges the dealer. The on-road price adds registration (typically 8-12% depending on the state), 5-year mandatory third-party insurance, and dealer handling charges. Banks typically sanction loans on the ex-showroom price only, so on-road extras come from your own funds.' } },
    { '@type': 'Question', name: 'Which bank offers the lowest bike loan EMI in India?', acceptedAnswer: { '@type': 'Answer', text: 'Bajaj Finance at 8.99% and SBI at 9.00% offer some of the lowest two-wheeler loan rates in India as of 2026. At 9% for 3 years, the EMI per lakh borrowed is approximately Rs 3,180. The bank comparison table in the calculator above computes the exact EMI at each lender for your specific loan amount and tenure.' } },
    { '@type': 'Question', name: 'Can I prepay a bike loan before the tenure ends?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, most lenders allow bike loan prepayment after a lock-in period of 6 to 12 months. Some charge a prepayment penalty of 2-5% on the outstanding balance. Bajaj Finance and Hero FinCorp often allow zero foreclosure charges after 12 EMIs. Prepaying even one year early can save 15-25% of the total interest on a 3-year loan.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Bike Loan EMI Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/bike-loan-emi-calculator',
  description: 'Calculate two-wheeler loan EMI by bike price, down payment, interest rate, and tenure. Includes quick bike model selector, bank comparison table, and year-by-year amortization schedule.',
  featureList: ['Quick bike model selector with 12 popular models', 'Down payment percentage and amount slider', 'Processing fee adjustment', 'Real-time bank comparison table', 'Year-by-year amortization schedule with bar chart', 'Donut chart showing principal vs interest split', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Bike Loan EMI', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Bike Loan EMI Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select a bike model or enter a custom price', text: 'Click a bike model pill to auto-fill the price, or move the bike price slider to set any amount from Rs 50,000 to Rs 10,00,000.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the down payment percentage', text: 'Move the down payment slider from 0% to 50%. The calculator shows both the percentage and the rupee amount, and derives the loan amount automatically.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter the interest rate and tenure', text: 'Set the annual interest rate between 7% and 24%, then choose your tenure from 1 to 5 years using the year preset buttons.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the EMI, bank comparison, and amortization schedule', text: 'See the monthly EMI, total interest, and total payment instantly. Compare EMI across SBI, HDFC, ICICI, and other lenders. Expand the amortization schedule for a year-by-year breakdown.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'EMI', alternateName: 'Equated Monthly Instalment',
  description: 'A fixed monthly payment made to repay a loan over a set period. Each EMI contains a portion of the principal and the interest accrued for that month.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
  sameAs: 'https://en.wikipedia.org/wiki/Equated_monthly_installment',
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Bike Loan EMI Calculator: Two-Wheeler EMI Instantly',
  url: 'https://fermor.in/calculators/bike-loan-emi-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' }],
  audience: { '@type': 'Audience', audienceType: 'Indian two-wheeler buyers, first-time bike buyers, Royal Enfield buyers, commuter bike buyers', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-bike-loan-emi', name: 'What Is a Bike Loan EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#bike-loan-emi-formula', name: 'Bike Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#bike-loan-interest-rates', name: 'Bike Loan Interest Rates in India 2026' },
    { '@type': 'WebPageElement', cssSelector: '#bike-emi-by-model', name: 'EMI for Popular Bikes in India' },
    { '@type': 'WebPageElement', cssSelector: '#down-payment-guide', name: 'Down Payment Guide for Bike Loans' },
    { '@type': 'WebPageElement', cssSelector: '#royal-enfield-emi', name: 'Royal Enfield EMI Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#hero-honda-emi', name: 'Hero and Honda Bike EMI' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-reduce-bike-emi', name: 'How to Reduce Bike Loan EMI' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function BikeLoanEMIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <BikeLoanEMIClient />
    </>
  );
}

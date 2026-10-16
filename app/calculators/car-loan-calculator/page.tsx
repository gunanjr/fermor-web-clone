import type { Metadata } from 'next';
import CarLoanCalculatorClient from './CarLoanCalculatorClient';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator: Calculate Your Car Loan EMI',
  description: 'Free car loan EMI calculator for India. Enter car price, down payment, interest rate, and tenure to get monthly EMI, total interest payable, and year-wise amortization schedule for your car loan.',
  keywords: 'car loan calculator, car loan EMI calculator, auto loan calculator, vehicle loan calculator, car loan EMI India, car finance calculator',
  openGraph: {
    title: 'Car Loan EMI Calculator: Calculate Your Car Loan EMI',
    description: 'Free car loan EMI calculator for India. Enter car price, down payment, interest rate, and tenure to get monthly EMI, total interest, and amortization schedule.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/car-loan-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is car loan EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Car loan EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the loan amount, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the number of monthly instalments. Indian banks use the reducing-balance method for car loans.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum down payment for a car loan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most lenders require a minimum down payment of 20% of the car\'s on-road price. Some banks may go as low as 15% for customers with excellent credit scores, while others may ask for 25–30% for used cars. A higher down payment reduces your loan amount and monthly EMI.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good credit score for a car loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CIBIL score of 750 or above is considered good for a car loan. Scores above 800 get the best interest rates and faster approval. If your score is below 700, you may still get a loan but at a higher interest rate or with a larger down payment requirement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose a shorter or longer car loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A shorter tenure (3–4 years) means a higher EMI but significantly lower total interest. A longer tenure (6–8 years) reduces your monthly payment but increases the total interest paid over the loan term. Choose a tenure that balances your monthly budget with total cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I prepay my car loan without charges?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RBI regulations allow foreclosure of floating-rate car loans without any prepayment penalty for individual borrowers. For fixed-rate loans, some lenders may charge 2–4% prepayment fees. Always check the loan agreement before signing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum car loan tenure in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum tenure for a new car loan in India is typically 7 to 8 years, depending on the lender. Used car loans usually have shorter tenures of up to 5 years. A longer tenure reduces your monthly EMI but increases the total interest outgo.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does down payment affect the total cost of my car?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A higher down payment reduces the loan amount, which lowers your monthly EMI and the total interest paid over the loan term. For example, putting 40% down instead of 20% on a ₹10 lakh car can save you over ₹1 lakh in interest over a 7-year loan at 9% p.a.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor Car Loan Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate monthly car loan EMI with amortization schedule. Free tool for Indian car buyers.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Car Loan EMI Calculator", item: 'https://fermor.in/calculators/car-loan-calculator' },
  ],
};

export default function CarLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }}
      />
      <CarLoanCalculatorClient />
    </>
  );
}



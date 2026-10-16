import type { Metadata } from 'next';
import EMICalculatorClient from './EMICalculatorClient';


export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: 'EMI Calculator: Calculate Your Loan EMI Instantly',
    description: 'Free EMI calculator for home loans, car loans, and personal loans in India. Enter loan amount, interest rate, and tenure to get your exact monthly EMI, total interest payable, and year-wise amortization schedule.',
    alternates: {
      canonical: `https://fermor.in/calculators/emi-calculator`,
    },
  };
}


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EMI is calculated using the formula: EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P is the principal loan amount, R is the monthly interest rate (annual rate ÷ 12 ÷ 100), and N is the number of monthly instalments. Banks in India use this reducing-balance method: your EMI stays fixed but the split between interest and principal shifts every month.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does paying a higher down payment reduce EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A higher down payment reduces the principal (P) you borrow. Since EMI is directly proportional to the principal, a lower loan amount means a lower EMI for the same rate and tenure. For example, putting 30% down instead of 10% on a home loan can reduce your monthly outflow significantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I choose a shorter or longer loan tenure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A shorter tenure means higher EMIs but significantly less total interest paid. A longer tenure gives you breathing room each month but costs more over time. Run both scenarios in this calculator to see the exact trade-off for your loan amount and rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my EMI if the RBI cuts the repo rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For floating-rate loans linked to an external benchmark (like the repo rate), a rate cut typically lowers your interest rate within a few months. Your lender may reduce your EMI or shorten your loan tenure: check your loan agreement for how they pass on the benefit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is prepaying a loan always a good idea?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prepayment saves you interest but has an opportunity cost: that money could instead earn returns in a mutual fund or FD. Compare your loan interest rate against potential investment returns. If your loan rate is 9% and a conservative investment yields 7%, prepayment wins. But if you expect 12-14% from equities, the math shifts.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an amortization schedule?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An amortization schedule shows how each EMI payment is split between principal repayment and interest for every month or year of the loan. In the early months, most of your EMI goes toward interest. As the principal reduces, the interest component shrinks and more of each payment goes toward principal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between a fixed and floating rate loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A fixed-rate loan keeps the same interest rate from start to finish, so your EMI never changes. A floating-rate loan has a rate tied to benchmark rates set by the RBI: your EMI can go up or down over the loan period. Fixed rates offer certainty; floating rates carry risk but can benefit you when rates fall.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor EMI Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate monthly EMI for home loans, car loans, and personal loans with amortization schedule.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Loan EMI in India',
  description: 'Use Fermor\'s free EMI calculator to find the monthly installment on any loan in seconds.',
  totalTime: 'PT30S',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Loan Amount',
      text: 'Enter the principal loan amount you want to borrow.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Annual Interest Rate',
      text: 'Enter the annual interest rate quoted by your bank or NBFC.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose Loan Tenure',
      text: 'Set the loan tenure in years or months.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Read Your EMI',
      text: 'The calculator instantly shows your fixed monthly EMI, total interest payable, and a full year-wise amortization breakdown.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "EMI Calculator", item: 'https://fermor.in/calculators/emi-calculator' },
  ],
};

export default async function EMICalculatorPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <EMICalculatorClient />
    </>
  );
}

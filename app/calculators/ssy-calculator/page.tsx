import type { Metadata } from 'next';
import SSYCalculatorClient from './SSYCalculatorClient';


export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: 'SSY Calculator: Sukanya Samriddhi Yojana Maturity Value & Interest',
    description: 'Calculate SSY maturity amount for your Sukanya Samriddhi Yojana account. See total deposits, interest earned, and a year-wise growth schedule at the current 8.2% rate. Free to use.',
    keywords: [
      'ssy calculator',
      'sukanya samriddhi yojana calculator',
      'sukanya samriddhi calculator',
      'calculate ssy maturity amount',
      'sukanya yojana interest rate',
      'sukanya samriddhi yojana',
      'sukanya samriddhi account',
      'sukanya samriddhi yojana interest rate',
      'sukanya samriddhi yojana online apply',
    ],
    alternates: {
      canonical: `https://fermor.in/calculators/ssy-calculator`,
    },
  };
}


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the SSY interest rate for FY 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Sukanya Samriddhi Yojana interest rate is 8.2% per annum for FY 2025-26, compounded annually. The government reviews and announces the SSY rate every quarter, though it has remained at 8.2% since April 2023, the highest rate among all government-backed small savings schemes, ahead of PPF (7.1%) and the 5-year NSC (7.7%).',
      },
    },
    {
      '@type': 'Question',
      name: 'Who is eligible to open an SSY account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A parent or legal guardian can open an SSY account for a girl child who is an Indian resident and below 10 years of age. The account can be opened any time from birth until the girl turns 10. A family can open SSY accounts for a maximum of two girl children, with a third account allowed only in the case of twins or triplets.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I deposit in an SSY account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can deposit a minimum of ₹250 and a maximum of ₹1,50,000 in a financial year, in multiples of ₹50. Deposits can be made as a lump sum or in instalments throughout the year. The full amount deposited qualifies for deduction under Section 80C of the Income Tax Act, within the overall ₹1.5 lakh limit.',
      },
    },
    {
      '@type': 'Question',
      name: 'For how many years do I need to make deposits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Deposits are required for 15 years from the date the account is opened. After that, no further deposits are needed, and the account continues to earn interest on the accumulated balance until it matures, 21 years after it was opened.',
      },
    },
    {
      '@type': 'Question',
      name: 'When does an SSY account mature, and can I withdraw early?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The account matures 21 years from the date of opening, or when the girl marries after turning 18, whichever is earlier. Partial withdrawal of up to 50% of the balance (as it stood at the end of the preceding financial year) is allowed once the girl turns 18, for higher education or marriage expenses, on submission of proof.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the maturity amount from SSY taxable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. SSY follows the EEE (Exempt-Exempt-Exempt) tax structure. Your annual deposits qualify for an 80C deduction, the interest credited each year is tax-free, and the entire maturity amount, including all accumulated interest, is exempt from tax on withdrawal.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I miss a yearly deposit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If the minimum deposit of ₹250 is not made in a financial year, the account becomes "irregular". It can be revived by paying the minimum deposit for each missed year plus a penalty of ₹50 per year, any time before the account completes 15 years from opening.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can the SSY account be transferred?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. An SSY account can be transferred free of cost between post offices and authorised banks anywhere in India, typically when the family relocates. The account number, balance, and deposit history carry over to the new branch without affecting the maturity timeline.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can an NRI open or continue an SSY account?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. SSY is open only to a girl child who is an Indian resident. If the account holder becomes an NRI after the account was opened, the account must be closed, since the scheme rules require continued Indian residency for it to stay active.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I open an SSY account or apply online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most banks that offer SSY let an existing customer open the account through net banking or their mobile app once KYC is already on file. Opening one at a post office still requires visiting the branch in person with the required documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I open more than one SSY account for the same girl child?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Only one SSY account is allowed per girl child. A family can open accounts for a maximum of two girl children, with a third account permitted only if the second delivery resulted in twins or triplets, or if the first delivery itself resulted in three girls.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can grandparents open an SSY account for a granddaughter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only a parent or a legal guardian can open an SSY account, not a grandparent unless they are the girl\'s legally appointed guardian. A grandparent can still contribute money toward the deposits; they just cannot be the account-opening applicant unless they hold legal guardianship.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to the SSY account if the girl child dies before maturity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The account is closed immediately on the death of the account holder. The balance, including interest accrued up to the date of death, is paid out to the guardian on submission of a death certificate and the required closure documents at the post office or bank branch.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SSY offer a loan facility against the balance, like PPF does?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Unlike PPF, which allows a loan against the balance after the third year, SSY has no loan facility. The only way to access funds before maturity is the partial withdrawal allowed once the girl turns 18, or one of the specific premature closure grounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor SSY Calculator',
  url: 'https://fermor.in/calculators/ssy-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description: 'Calculate the maturity value of a Sukanya Samriddhi Yojana (SSY) account based on yearly investment, interest rate, and the girl child\'s current age.',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Sukanya Samriddhi Yojana Calculator", item: 'https://fermor.in/calculators/ssy-calculator' },
  ],
};

export default async function SSYCalculatorPage() {
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
      <SSYCalculatorClient />
    </>
  );
}

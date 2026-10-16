import type { Metadata } from 'next';
import CapitalGainsCalculatorClient from './CapitalGainsCalculatorClient';


export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: 'Capital Gains Tax Calculator: Calculate LTCG & STCG India FY 2025-26',
    description: 'Free capital gains tax calculator for India. Enter buy price, sell price, and holding period to calculate capital gains. Rs 1.25 lakh exemption applied automatically, 12.5% LTCG and 20% STCG on equity and mutual funds.',
    keywords: [
      'capital gains tax calculator',
      'calculate capital gains',
      'capital gains tax rate',
      'free capital gains calculator',
      'capital gains tax',
      'capital gains tax on real estate',
      'income tax calculator',
      'tax calculator',
    ],
    alternates: {
      canonical: `https://fermor.in/calculators/capital-gains-calculator`,
    },
  };
}


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the capital gains tax rate on shares and equity mutual funds in FY 2025-26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For listed equity shares and equity-oriented mutual funds where securities transaction tax (STT) has been paid, short-term capital gains (holding period of 12 months or less) are taxed at 20%, and long-term capital gains (holding period of more than 12 months) are taxed at 12.5% on the amount exceeding ₹1.25 lakh in a financial year. These rates apply to transfers made on or after 23 July 2024.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the holding period calculated for shares and mutual funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The holding period runs from the day after the date of purchase, or allotment in the case of mutual fund units, to the date of sale, both included. For listed equity shares and equity mutual funds, a holding period of more than 12 months qualifies as long term. If you invested through a SIP, each instalment has its own purchase date and is treated as a separate investment for this purpose.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Rs 1.25 lakh LTCG exemption, and does it apply every year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Long-term capital gains from listed equity shares and equity mutual funds up to Rs 1.25 lakh in a financial year are exempt from tax. This exemption is available afresh every financial year and applies to your total long-term equity gains for the year, not per investment. Only the amount above Rs 1.25 lakh is taxed at 12.5%.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I set off a capital loss against capital gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Short-term capital losses can be set off against both short-term and long-term capital gains in the same year. Long-term capital losses can only be set off against long-term capital gains. Any loss that cannot be set off in the current year can be carried forward for up to 8 assessment years, provided you file your income tax return on time.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are gains on debt mutual funds taxed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For debt mutual funds purchased on or after 1 April 2023, all gains are treated as short-term capital gains regardless of how long you hold the units, and are taxed at your applicable income tax slab rate. The indexation benefit and the concept of long-term holding no longer apply to these funds.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about shares or mutual funds I bought before 31 January 2018?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For listed equity shares and equity mutual funds acquired on or before 31 January 2018, the cost of acquisition for LTCG purposes is the higher of the actual cost and the lower of the fair market value on 31 January 2018 and the actual sale price. This grandfathering provision protects gains that had already accrued before LTCG tax was reintroduced in 2018.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to pay advance tax on capital gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if your total tax liability for the year, including tax on capital gains, exceeds Rs 10,000. Since capital gains are often unpredictable, the tax on them can be paid in the remaining advance tax instalments after the gain arises, without attracting interest for the instalments that fell due earlier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this calculator applicable to property, gold, or unlisted shares?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This calculator is built for listed equity shares and equity-oriented mutual funds, taxed at 20% short term or 12.5% long term above the Rs 1.25 lakh exemption. Property, gold, debt funds, and unlisted shares follow different holding-period thresholds and tax rules, so the results shown here would not be accurate for those assets.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do intraday trading gains count as capital gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Buying and selling the same share on the same day without taking delivery is treated as speculative business income, not a capital gain. It is taxed under "Income from Business or Profession" at your applicable slab rate, and this calculator does not apply to it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which ITR form do I use to report capital gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Capital gains are reported in Schedule CG of ITR-2 if you have no business or professional income, or ITR-3 if you do. ITR-1 (Sahaj) cannot be used in a year you have any capital gains to report, even if the tax payable is zero after the exemption.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to report capital gains in my ITR if no tax is due after the exemption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The ₹1.25 lakh LTCG exemption reduces the tax payable to zero, but the gain itself still has to be disclosed in Schedule CG of your return. Not reporting it, even when no tax is owed, can trigger a mismatch notice since your broker or fund house also reports the transaction to the tax department.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I have both short-term and long-term capital gains in the same year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Each gain is computed and taxed separately based on its own holding period. Short-term gains from equity are taxed at 20%, long-term gains above the ₹1.25 lakh exemption at 12.5%, and both figures are reported under their own heads in Schedule CG before being added to your total tax liability for the year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is cess or surcharge added on top of the capital gains tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A 4% Health and Education Cess is added on top of the capital gains tax computed at 12.5% or 20%. A surcharge may also apply if your total income crosses the relevant threshold, at rates that depend on your total income slab, not just the capital gain itself. This calculator shows the base tax before cess and surcharge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the cost of acquisition calculated for bonus or rights shares?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bonus shares allotted after 1 April 2001 have a cost of acquisition of zero, since you did not pay anything for them, so the entire sale proceeds count as gain. Rights shares are treated like a normal purchase, with the cost of acquisition being the price you actually paid to subscribe to them.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost basis for shares I received as a gift or inheritance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For gifted or inherited shares, the cost of acquisition is the amount the previous owner originally paid, not the value on the date you received them. The holding period also carries over: it is calculated from the previous owner\'s original purchase date, not the date of the gift or inheritance.',
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
  name: 'Fermor Capital Gains Tax Calculator',
  url: 'https://fermor.in/calculators/capital-gains-calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  description: 'Calculate long-term and short-term capital gains tax on listed equity shares and equity mutual funds, including the Rs 1.25 lakh LTCG exemption for FY 2025-26.',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Capital Gains Tax in India (FY 2025-26)',
  description: 'Use Fermor\'s free calculator to find your LTCG or STCG tax on listed shares and equity mutual funds in seconds.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Purchase Value',
      text: 'Enter the total price you paid to acquire the shares or mutual fund units, including any brokerage paid at the time of purchase.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter Sale Value',
      text: 'Enter the total amount received when you sold the investment.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add Transfer Expenses',
      text: 'Enter brokerage, STT, or other costs paid at the time of sale.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select Holding Period',
      text: 'Choose "More than 1 year" for LTCG (taxed at 12.5%) or "Up to 1 year" for STCG (taxed at 20%).',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Read Your Tax',
      text: 'The calculator instantly shows your capital gains tax payable, with the ₹1.25 lakh annual LTCG exemption applied automatically.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Capital Gains Tax Calculator", item: 'https://fermor.in/calculators/capital-gains-calculator' },
  ],
};

export default async function CapitalGainsCalculatorPage() {
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
      <CapitalGainsCalculatorClient />
    </>
  );
}

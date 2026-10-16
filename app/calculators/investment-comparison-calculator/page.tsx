import type { Metadata } from 'next';
import InvestmentComparisonClient from './InvestmentComparisonClient';

import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';

  return {
    title: 'Investment Comparison Calculator: FD vs SIP vs PPF',
    description: 'Free investment comparison calculator for India. Compare FD, SIP, PPF, NPS, gold, and real estate side-by-side on projected wealth and returns. Free to use.',
    keywords: [
      'investment comparison calculator', 'fd vs sip calculator', 'fd vs ppf calculator', 'sip vs ppf calculator',
      'fd vs sip vs ppf calculator', 'best investment calculator india', 'compare investment returns calculator',
      'gold vs fd calculator', 'gold vs mutual fund calculator', 'real estate vs mutual fund calculator',
      'nps vs ppf calculator', 'investment returns comparison calculator india', 'which investment gives best returns',
      'fd vs sip vs ppf vs nps calculator', 'investment comparison tool india', 'best investment option calculator',
      'compare fd sip ppf nps gold calculator', 'long term investment comparison calculator',
      'investment growth comparison calculator', 'compare returns of different investments',
    ],
    alternates: {
      canonical: `https://fermor.in/${region === 'in' ? 'calculators' : region}/investment-comparison-calculator`,
    },
  };
}

const faqs = [
  {
    q: 'Why should I compare different investments?',
    a: 'Comparing investments helps you understand the opportunity cost of your money. A difference of just 2-3% in annual returns can lead to a massive difference in final wealth over 10-20 years due to the power of compounding.',
  },
  {
    q: 'What is the most profitable investment option?',
    a: 'Historically, equity-based investments like SIPs in mutual funds have delivered higher long-term returns (12-15% p.a.) compared to traditional instruments like FDs or PPF. However, higher returns come with higher short-term volatility.',
  },
  {
    q: 'How does this calculator project future wealth?',
    a: 'The calculator uses the compound interest formula: A = P(1 + r/n)^(nt), where P is the principal amount, r is the annual interest rate, n is the compounding frequency, and t is the time in years.',
  },
  {
    q: 'Is investing in real estate better than mutual funds?',
    a: 'Real estate requires a large capital outlay, is highly illiquid, and has location-dependent returns. Mutual funds offer high liquidity, allow small investments (SIPs), and provide diversification.',
  },
  {
    q: 'Why are Fixed Deposits (FD) considered safer?',
    a: 'FD returns are predetermined and not linked to market performance. In India, bank deposits up to 5 lakh are insured by DICGC, making them practically risk-free, though they often struggle to beat inflation.',
  },
  {
    q: 'Does Gold consistently beat inflation?',
    a: 'Gold is traditionally seen as a hedge against inflation. Historically, gold in India has provided returns of around 8-9% annually, which typically beats inflation. However, gold does not generate passive income unless invested in Sovereign Gold Bonds (SGBs).',
  },
  {
    q: 'What is the difference between nominal and real returns?',
    a: 'Nominal return is the raw percentage increase in your investment. Real return is the nominal return minus the inflation rate. If your FD gives 7% but inflation is 6%, your real return is only 1%.',
  },
  {
    q: 'Why does a 1% difference in returns matter so much?',
    a: 'Because of compound interest. A 10 Lakh investment at 8% for 20 years grows to 46.6 Lakh. At 9%, it grows to 56 Lakh. That single percentage point difference generates nearly 10 Lakh in extra wealth.',
  },
  {
    q: 'Should I put all my money in the highest returning option?',
    a: 'No. Asset allocation is critical. A balanced portfolio includes equities for growth (SIP, NPS), debt for stability (FD, PPF), and gold for hedging. This reduces overall risk while maintaining decent returns.',
  },
  {
    q: 'Are the returns shown guaranteed?',
    a: 'No. Only fixed-income instruments like FDs and PPF offer guaranteed returns. Returns for SIPs (mutual funds), Gold, Real Estate, and NPS are market-linked and the percentages used are expected historical averages.',
  },
  {
    q: 'How does taxation affect my final returns?',
    a: 'Taxes reduce your effective returns. FD interest is taxed at your income slab rate. PPF is completely tax-free (EEE status). Equity mutual funds have a 12.5% LTCG tax over 1.25 Lakh.',
  },
  {
    q: 'What is the lock-in period for these investments?',
    a: 'FDs can range from 7 days to 10 years. PPF has a 15-year lock-in. NPS is locked until retirement (age 60). Open-ended mutual funds and Gold are highly liquid with no lock-in.',
  },
  {
    q: 'Is NPS a good alternative to mutual funds?',
    a: 'NPS is an excellent retirement-focused product offering an additional 50,000 tax deduction under Sec 80CCD(1B). However, it lacks liquidity due to strict lock-in rules until age 60.',
  },
  {
    q: 'How often should I review my investment choices?',
    a: 'You should review your portfolio at least once a year or when there is a major life event. Rebalance your portfolio if one asset class has grown significantly more than others.',
  },
  {
    q: 'Are bank fixed deposits actually risk-free?',
    a: 'Not entirely. FD principal and interest at an insured bank are protected by DICGC, a wholly-owned RBI subsidiary, only up to Rs 5 lakh per depositor per bank. Amounts above that limit at a single bank carry real risk if the bank fails, so large FD holdings are sometimes split across multiple banks to stay within the insured limit at each.',
  },
  {
    q: 'Who regulates mutual funds in India, and are they insured like a bank deposit?',
    a: 'The Securities and Exchange Board of India (SEBI) regulates mutual funds, and AMFI is the industry body that fund registrars operate under. Unlike a bank FD, a mutual fund investment is not insured. Its value is market-linked and can fall, though regulation ensures the fund can only invest according to its stated strategy.',
  },
  {
    q: 'What is the maximum tax deduction I can claim across these investments?',
    a: 'Contributions to PPF and EPF count toward the combined Rs 1.5 lakh Section 80C limit. NPS offers an additional Rs 50,000 deduction under Section 80CCD(1B), taking the maximum combined deduction to Rs 2 lakh. This only applies if you choose the old tax regime, since 80CCD(1B) is not available under the new regime.',
  },
  {
    q: 'Is equity mutual fund LTCG really tax-free up to a limit?',
    a: 'Yes, up to a point. Long-term capital gains on equity mutual funds and listed shares are exempt up to Rs 1.25 lakh in a financial year. Gains above that threshold are taxed at 12.5 percent, following the rate and exemption limit set in the 2024 Budget.',
  },
  {
    q: 'How liquid is real estate compared to the other options here?',
    a: 'Real estate is by far the least liquid option in this comparison. Selling a property can take months, involves significant transaction costs (stamp duty, registration, brokerage), and cannot be partially liquidated the way a mutual fund unit or an FD can be broken. Treat it as a long-term, illiquid allocation, not a source of emergency funds.',
  },
  {
    q: 'How should I choose between these options based on my time horizon?',
    a: 'As a general guide: under 3 years, prioritize capital protection with FDs or liquid funds. 3 to 7 years, mix FDs or short-duration debt with a smaller equity SIP allocation. 7 to 15 years, SIPs and PPF both fit well. 15-plus years or retirement-focused goals, SIPs and NPS can absorb the most volatility for potentially the highest long-term growth.',
  },
  {
    q: 'Does this calculator automatically adjust for taxes and inflation?',
    a: 'No. The projected values shown are pre-tax, nominal figures at the return rate you enter for each instrument. To see the real, inflation-adjusted picture, or the post-tax outcome, those need to be worked out separately using the assumed inflation rate and the tax treatment specific to each instrument.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fermor Investment Comparison Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Compare FD, SIP, PPF, NPS, Gold and Real Estate investments side-by-side. Calculate projected wealth, returns and growth.',
  url: 'https://fermor.in/calculators/investment-comparison-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  dateModified: '2026-07-15',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Investment Comparison Calculator', item: 'https://fermor.in/calculators/investment-comparison-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Investment Comparison Calculator',
  description: 'Step-by-step guide to comparing different investment options side-by-side.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter Investment Amount',
      text: 'Enter the lumpsum amount you plan to invest.',
    },
    {
      '@type': 'HowToStep',
      name: 'Set Investment Duration',
      text: 'Choose how many years you plan to stay invested.',
    },
    {
      '@type': 'HowToStep',
      name: 'Adjust Return Rates',
      text: 'Review and adjust the expected annual return rates for each investment type (FD, SIP, PPF, NPS, Gold, Real Estate, Custom).',
    },
    {
      '@type': 'HowToStep',
      name: 'Review Comparison Results',
      text: 'See the projected wealth for each investment type, ranked from highest to lowest, with a detailed comparison matrix.',
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Investment Comparison Calculator',
  description: 'Free online investment comparison calculator for India. Compare FD, SIP, PPF, NPS, Gold and Real Estate side-by-side.',
  url: 'https://fermor.in/calculators/investment-comparison-calculator',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  hasPart: [
    { '@type': 'WebApplication', name: 'Investment Comparison Calculator' },
    { '@type': 'FAQPage' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  knowsAbout: [
    'Investment Comparison',
    'Fixed Deposits',
    'Mutual Funds',
    'PPF',
    'NPS',
    'Gold Investment',
    'Real Estate Investment',
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Investment Comparison',
  description: 'The process of evaluating different investment options side-by-side to determine which best suits your financial goals and risk tolerance.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Fermor Financial Glossary',
  },
};

export default async function InvestmentComparisonPage() {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <InvestmentComparisonClient region={region} faqs={faqs} />
    </>
  );
}

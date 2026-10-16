import type { Metadata } from 'next';
import XIRRCalculatorClient from './XIRRCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/xirr-calculator';
  return {
    title: 'XIRR Calculator: Extended Internal Rate of Return',
    description: 'Free XIRR calculator for India. Enter your SIP amount, frequency, duration, and final portfolio value to instantly calculate your annualised XIRR return. Supports monthly, quarterly, half-yearly, and yearly investments. Free to use.',
    keywords: [
      'xirr calculator',
      'xirr calculator online',
      'mutual fund xirr calculator',
      'xirr',
      'xirr formula',
      'xirr vs cagr',
      'xirr vs irr',
      'sip xirr calculator',
      'xirr calculator excel',
      'extended internal rate of return calculator',
    ],
    alternates: { canonical },
    openGraph: {
      title: 'XIRR Calculator: Extended Internal Rate of Return - Fermor',
      description: 'Calculate the annualised XIRR return on your SIP or recurring investment portfolio, accounting for the exact date of every instalment. Includes a year-by-year growth table. Free for India.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-11';
const PAGE_DATE_PUBLISHED = '2026-09-11';

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
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'XIRR',
    'Extended Internal Rate of Return',
    'Mutual Fund Returns',
    'SIP Returns',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'Financial Planning India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is XIRR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'XIRR stands for Extended Internal Rate of Return. It is the single annualised rate of return that, when applied to each individual cash flow on its specific date, produces a net present value of zero across all transactions. XIRR is used to measure the actual return on investments where cash flows occur at multiple, different points in time, such as monthly SIP instalments and systematic withdrawal plans.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between XIRR and CAGR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CAGR measures the annualised return of a single lumpsum investment between one fixed start date and one fixed end date. It is only valid when there is a single cash inflow and a single cash outflow. XIRR handles multiple cash flows on different dates. For any SIP portfolio where investments are made monthly or quarterly over several years, XIRR is the correct measure of return. CAGR would give an inaccurate answer in that scenario.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between XIRR and IRR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IRR assumes cash flows occur at evenly spaced, regular intervals, typically at the end of each year. XIRR removes that restriction and allows cash flows to occur on any specific calendar date. For SIP investments where the exact transaction date matters, XIRR is more precise than IRR. In Microsoft Excel, XIRR requires both a values column and a corresponding dates column, while IRR only requires a values column.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do mutual fund returns use XIRR and not CAGR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Because each SIP instalment is invested on a different date, it has a different time horizon. A monthly SIP running for five years has 60 different investment dates. CAGR cannot account for this timing because it is designed for a single initial investment. XIRR accounts for every instalment date individually, making it the only mathematically accurate way to measure the total return on a multi-instalment portfolio.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a higher XIRR always better?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generally yes, a higher XIRR indicates a better annualised return. However, XIRR does not measure risk or volatility. A portfolio with a high XIRR may have experienced sharp drawdowns during the holding period. When comparing two investments, XIRR should be evaluated alongside other metrics such as standard deviation and maximum drawdown to assess risk-adjusted performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can XIRR be negative?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If the final portfolio value is less than what you would have earned at a zero percent return, the XIRR will be negative. This occurs when your portfolio has declined in value and the current worth is lower than the present value of all the invested amounts. Negative XIRR indicates that the investment has destroyed value on an annualised basis after accounting for the timing of each instalment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What XIRR is considered good for a SIP in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For equity mutual fund SIPs in India, an XIRR of 12 to 15 percent over a 10-year period is generally considered good. The Nifty 50 has delivered approximately 11 to 13 percent annualised returns over 10-year periods. Smallcap and midcap fund SIPs have historically produced 15 to 20 percent XIRR over long periods, accompanied by higher volatility. Debt fund SIPs typically generate 6 to 8 percent XIRR.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do mutual fund CAS statements calculate XIRR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Consolidated Account Statements from CAMS or KFintech calculate XIRR by treating every purchase transaction, including SIP instalments, switch-ins, and additional lumpsum purchases, as a negative cash flow on its transaction date. The current portfolio value is treated as a positive cash flow on the date of the statement. The XIRR function then finds the single rate that makes the net present value of all those cash flows equal to zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can XIRR be calculated without a calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'XIRR cannot be solved algebraically for portfolios with more than a few cash flows. It requires iterative numerical computation using methods such as Newton-Raphson. In practice, investors use the XIRR function in Microsoft Excel, Google Sheets, or an online calculator to compute the result. The formula in Excel is =XIRR(values, dates), where values is a column of cash flows with investments as negative numbers and the current value as a positive number.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the XIRR formula in Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Excel syntax is =XIRR(values, dates, [guess]). The values range must contain the investment amounts as negative numbers and the final portfolio value as a positive number. The dates range must contain the corresponding date for each cash flow in the format DD-MM-YYYY or DD/MM/YYYY. The optional guess parameter is the starting estimate for the rate, defaulting to 0.1 (10 percent). Example: =XIRR(B2:B38, C2:C38) calculates the XIRR for 37 cash flows listed in column B with corresponding dates in column C.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does SEBI require mutual funds to send me a statement showing my actual returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SEBI mandates a Consolidated Account Statement for every investor who has made at least one transaction in a month, sent by the registrar on or before the 10th of the following month. If no transaction occurred, a statement is still sent half-yearly. This statement is the official, regulator-mandated record of your holdings and returns across all your mutual fund folios.',
      },
    },
    {
      '@type': 'Question',
      name: "Is the XIRR shown in my mutual fund CAS the same as this calculator's result?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It should match closely if you enter the same instalment amount, frequency, duration, and current value. Small differences can appear if your actual SIP amount changed partway through, if you made additional lumpsum purchases or partial withdrawals, or if your registrar rounds the exact transaction dates slightly differently than the evenly spaced dates this calculator assumes.',
      },
    },
    {
      '@type': 'Question',
      name: "Does a mutual fund scheme's risk level affect how I should read its XIRR?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. SEBI requires every scheme to disclose a Riskometer rating, updated monthly, ranging up to "Very High Risk." A scheme with a high XIRR but a Very High risk rating carried more volatility to get there than one with a similar XIRR at a lower risk level. XIRR alone does not show that difference, so check the scheme\'s current risk label alongside its return.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I compare the XIRR of two different types of mutual funds fairly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Only within the same category. SEBI's scheme categorisation rules group every mutual fund into one of five broad categories (equity, debt, hybrid, solution-oriented, and other) and standardised sub-categories within them, specifically so similar schemes can be compared on a like-for-like basis. Comparing the XIRR of an equity fund against a debt fund is not a fair comparison, since they carry fundamentally different risk and return profiles.",
      },
    },
    {
      '@type': 'Question',
      name: 'Who regulates how mutual funds in India calculate and report returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Securities and Exchange Board of India (SEBI) is the statutory regulator for mutual funds, setting the rules for account statements, risk disclosure, and scheme categorisation. The Association of Mutual Funds in India (AMFI) is the industry body that mutual fund registrars like CAMS and KFintech operate under when generating the statements investors receive.',
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
  name: 'Fermor XIRR Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate XIRR for your SIP or recurring investment portfolio. Supports monthly, quarterly, half-yearly, and yearly frequencies. Includes year-by-year growth table. Free to use.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate XIRR for a SIP Portfolio',
  description: 'Step-by-step guide to calculate the annualised XIRR return on a SIP or recurring investment portfolio.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor XIRR Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your instalment amount',
      text: 'Input the fixed amount you invest in each instalment, whether it is a monthly SIP or any other recurring investment.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select your investment frequency',
      text: 'Choose whether you invest monthly, quarterly, half-yearly, or yearly.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter your investment duration and final portfolio value',
      text: 'Set the total number of years you have been investing, and enter the current or maturity value of your portfolio.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'View your XIRR and year-by-year growth',
      text: 'The calculator instantly shows your annualised XIRR, total gain, absolute return, and a year-by-year breakdown of how your portfolio compounded.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'XIRR',
  alternateName: 'Extended Internal Rate of Return',
  description: 'The annualised rate of return that makes the net present value of all cash flows, including investments on their specific dates and the final portfolio value, equal to zero.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Internal_rate_of_return',
    'https://www.wikidata.org/wiki/Q507477',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'XIRR Calculator', item: 'https://fermor.in/calculators/xirr-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'XIRR Calculator: Extended Internal Rate of Return',
  description: 'Free XIRR calculator for India. Calculate the annualised XIRR return on a SIP or recurring investment portfolio, accounting for the exact date of every instalment.',
  url: 'https://fermor.in/calculators/xirr-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  author: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: {
      '@type': 'ImageObject',
      url: 'https://fermor.in/fermor-schema-logo.png',
    },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'XIRR', alternateName: 'Extended Internal Rate of Return' },
    { '@type': 'DefinedTerm', name: 'CAGR', alternateName: 'Compound Annual Growth Rate' },
    { '@type': 'DefinedTerm', name: 'IRR', alternateName: 'Internal Rate of Return' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian mutual fund investors, SIP investors, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-xirr', name: 'What is XIRR' },
    { '@type': 'WebPageElement', cssSelector: '#how-xirr-helps', name: 'How can this XIRR calculator help you' },
    { '@type': 'WebPageElement', cssSelector: '#xirr-formula', name: 'The XIRR formula' },
    { '@type': 'WebPageElement', cssSelector: '#xirr-worked-example', name: 'Worked example of XIRR calculation' },
    { '@type': 'WebPageElement', cssSelector: '#xirr-vs-cagr', name: 'XIRR versus CAGR' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-use-xirr', name: 'When should you use XIRR' },
    { '@type': 'WebPageElement', cssSelector: '#xirr-in-excel', name: 'How to calculate XIRR in Microsoft Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this XIRR calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function XIRRCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <XIRRCalculatorClient />
    </>
  );
}

import type { Metadata } from 'next';
import FutureValueCalculatorClient from './FutureValueCalculatorClient';

export const metadata: Metadata = {
  title: 'Future Value Calculator: FV of Lumpsum & SIP Investments',
  description: 'Free future value calculator for India. Find the FV of a lumpsum, an SIP, or both, with yearly, half-yearly, quarterly or monthly compounding. Free to use.',
  keywords: [
    'future value calculator',
    'fv calculator',
    'future value calculator india',
    'future value',
    'sip future value calculator',
    'lumpsum future value calculator',
    'future value calculator for retirement',
    'time value of money calculator',
    'future value calculator with monthly contributions',
    'compound interest future value calculator',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/future-value-calculator' },
  openGraph: {
    title: 'Future Value Calculator: FV of Lumpsum & SIP Investments - Fermor',
    description: 'Project the future value of a lumpsum, an SIP, or both together, with your choice of compounding frequency. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/future-value-calculator',
    siteName: 'Fermor',
  },
};

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-09-15';

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
    'Future Value',
    'Time Value of Money',
    'Compound Interest',
    'SIP Investments',
    'Lumpsum Investments',
    'Retirement Planning India',
    'Account Aggregator Framework',
    'SEBI Regulations',
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
      name: 'What is future value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Future value (FV) is what a sum of money invested today, or invested regularly, will grow to by a specific future date at an assumed rate of return. It is the core calculation behind every long-term investment plan, from an SIP to a retirement corpus.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the future value formula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a lumpsum: FV = PV × (1 + r/m)^(m×n), where PV is the initial amount, r is the annual rate, m is the compounding frequency, and n is the number of years. For an SIP: FV = P × [((1 + i)^t − 1) / i] × (1 + i), where P is the monthly amount, i is the monthly rate, and t is the number of months.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an FV calculator used for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An FV calculator, sometimes searched as an "fv calculator" or "future value calculator online", projects what a lumpsum, an SIP, or a combination of both will be worth at a future date. It removes the need to work out compound interest by hand across dozens of years.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate the future value of an SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter the monthly SIP amount, the expected annual return, and the investment tenure in this calculator, leaving the lumpsum field at zero. The SIP future value formula compounds each monthly instalment separately from the date it is invested, since each contribution has a different amount of time left to grow.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate the future value of a lumpsum mutual fund investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter the one-time amount in the Lumpsum Investment field and leave the Monthly Addition field at zero. The calculator applies FV = PV × (1 + r/m)^(m×n) using the compounding frequency you select, giving the projected value of a single mutual fund or FD investment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I assume for equity mutual funds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A commonly used long-term planning range for diversified equity mutual funds is 10 to 12 percent per year, based on historical category averages published by AMFI. Actual returns vary by fund and by market cycle, and past performance is not a guarantee of future returns.',
      },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I use for debt funds or fixed deposits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Debt funds and bank fixed deposits typically fall in the 6 to 8 percent range, closer to prevailing interest rates than to equity-style growth. A balanced or hybrid portfolio, mixing equity and debt, is often modelled at 8 to 10 percent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does compounding frequency change the future value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. More frequent compounding, such as monthly instead of yearly, produces a slightly higher future value for the same nominal annual rate, because interest is added back into the principal more often. This calculator lets you switch the lumpsum compounding between yearly, half-yearly, quarterly, and monthly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is future value the same as maturity value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'They describe the same idea in different contexts. "Maturity value" is usually the term used by a bank FD or insurance policy for the amount paid out at the end of the term, while "future value" is the general financial term for the same projected number.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is future value different from present value?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Future value compounds an amount of money forward in time to see what it will grow to. Present value works in the opposite direction: it discounts a future amount backward to see what it is worth today. The Present Value Calculator handles that reverse calculation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this as a future value calculator for retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, by entering your current retirement savings as the lumpsum, your monthly SIP or NPS contribution as the monthly addition, and your years left to retirement as the time period. For working backward from a target retirement corpus to the required monthly investment, the Goal Planning Calculator or Retirement Calculator is a better fit.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the future value of Rs 5,000 invested monthly for 20 years at 12 percent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At a 12 percent annual return compounded monthly, an SIP of Rs 5,000 a month for 20 years (240 instalments) grows to approximately Rs 45.99 lakh, against a total investment of Rs 12 lakh. The remaining roughly Rs 33.99 lakh comes purely from compounding.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is the future value of an SIP different from a lumpsum of the same total amount?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A lumpsum starts compounding on the full amount from day one, while an SIP invests smaller amounts every month, each of which has less time left to grow. Over the same period and rate, a lumpsum almost always produces a higher future value than an SIP that adds up to the same total invested amount, purely because more of the lumpsum money has been compounding for longer.',
      },
    },
    {
      '@type': 'Question',
      name: "Does inflation reduce the future value shown by this calculator?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No, the future value shown here is in nominal rupees, not adjusted for inflation. To see what that future amount is worth in today's purchasing power, use the Real Return Calculator to convert the nominal return into an inflation-adjusted real return first.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between future value and compound interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compound interest is the mechanism, interest calculated on both the principal and previously earned interest. Future value is the outcome, the total amount an investment grows to once compound interest has been applied over the full period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can this calculator handle a lumpsum and an SIP together?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enter both a lumpsum amount and a monthly addition, and the calculator projects each separately, using the compounding frequency you select for the lumpsum and monthly compounding for the SIP, then adds the two figures together for the total future value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my bank RD or FD show a slightly different maturity value than this calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banks typically compound fixed and recurring deposits quarterly, and some apply day-count conventions that differ slightly from a clean monthly or yearly model. Selecting quarterly compounding in this calculator gets closest to how most Indian bank FDs actually compound.',
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
  name: 'Fermor Future Value Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Project the future value of a lumpsum, an SIP, or both together, with a choice of compounding frequency. Free to use.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate the Future Value of a Lumpsum or SIP',
  description: 'Step-by-step guide to project the future value of an investment using this calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Future Value Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the lumpsum investment',
      text: 'Input a one-time amount invested today. Leave this at zero for an SIP-only projection.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter the monthly SIP addition',
      text: 'Input a fixed amount invested every month for the full tenure. Leave this at zero for a lumpsum-only projection.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the expected return rate',
      text: 'Enter the annual growth rate assumed for the investment, matched to the type of product it is held in.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Set the time period and compounding',
      text: 'Enter the number of years the money stays invested, and choose how often the lumpsum compounds: yearly, half-yearly, quarterly, or monthly.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'View the future value',
      text: 'The calculator instantly shows the total future value, total invested, total returns, and a year-by-year growth schedule.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Future Value',
  alternateName: 'FV',
  description: 'What a sum of money invested today, or invested regularly, will be worth at a specified future date, based on an assumed rate of compound growth.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Future_value',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Future Value Calculator', item: 'https://fermor.in/calculators/future-value-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Future Value Calculator: FV of Lumpsum & SIP Investments',
  description: 'Free future value calculator for India. Find the FV of a lumpsum, an SIP, or both, with yearly, half-yearly, quarterly or monthly compounding.',
  url: 'https://fermor.in/calculators/future-value-calculator',
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
    { '@type': 'DefinedTerm', name: 'Future Value', alternateName: 'FV' },
    { '@type': 'DefinedTerm', name: 'Present Value', alternateName: 'PV' },
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian investors, retirement planners, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-future-value', name: 'What is future value' },
    { '@type': 'WebPageElement', cssSelector: '#fv-formula', name: 'The future value formula' },
    { '@type': 'WebPageElement', cssSelector: '#fv-worked-example', name: 'Worked example' },
    { '@type': 'WebPageElement', cssSelector: '#lumpsum-vs-sip', name: 'Lumpsum versus SIP' },
    { '@type': 'WebPageElement', cssSelector: '#fv-compounding-frequency', name: 'How compounding frequency changes future value' },
    { '@type': 'WebPageElement', cssSelector: '#fv-choosing-return-rate', name: 'Choosing a realistic return rate' },
    { '@type': 'WebPageElement', cssSelector: '#fv-in-indian-planning', name: 'Future value in Indian retirement and savings planning' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this calculator' },
    { '@type': 'WebPageElement', cssSelector: '#fv-limitations', name: 'Limitations of this calculator' },
    { '@type': 'WebPageElement', cssSelector: '#fv-common-mistakes', name: 'Common mistakes when projecting future value' },
    { '@type': 'WebPageElement', cssSelector: '#fv-vs-pv', name: 'Future value versus present value' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function FutureValuePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <FutureValueCalculatorClient />
    </>
  );
}

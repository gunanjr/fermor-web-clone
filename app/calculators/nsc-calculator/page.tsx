import type { Metadata } from 'next';
import NSCCalculatorClient from './NSCCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED  = '2026-09-26';

export const metadata: Metadata = {
  title: 'NSC Calculator: National Savings Certificate Maturity & Returns',
  description:
    'NSC calculator: Calculate maturity amount, year-wise interest, and 80C tax deductions at 7.7% rate. Free national savings certificate calculator for India.',
  keywords: [
    'nsc calculator',
    'national savings certificate calculator',
    'nsc calculator post office',
    'nsc interest calculator',
    'calculate nsc maturity amount',
    'nsc maturity calculator',
    'nsc savings calculator',
    'national saving certificate calculator',
    'national savings certificate interest calculator',
    'nsc interest rate calculator',
    'nsc return calculator',
    'post office nsc calculator',
    'nsc tax calculator',
    'nsc calculator year wise',
    'nsc calculator income tax',
    'nsc scheme calculator',
    'nsc post office interest rate calculator',
    'national savings scheme calculator',
    'nsc interest calculator post office',
    'nsc yearly interest calculator',
    'nsc 5 year interest calculator',
    'nsc investment calculator',
    'nsc fixed deposit calculator',
    'return on nsc',
    'post office nsc interest rate calculator',
    'nsc calculator 2024',
    'nsc calculator 2023',
    'nsc calculator online',
    'nsc for 5 years interest rate',
    'nsc bond calculator',
    'india post nsc calculator',
    'nsc tax benefit calculator',
  ],
  openGraph: {
    title: 'NSC Calculator: Calculate Maturity Amount & 80C Tax Benefits',
    description:
      'Free NSC calculator. Calculate National Savings Certificate maturity, year-wise interest breakdown, and Section 80C tax deductions at 7.7% rate.',
    type: 'website',
    url: 'https://fermor.in/calculators/nsc-calculator',
    siteName: 'Fermor',
    images: [
      {
        url: 'https://fermor.in/og-nsc-calculator.png',
        width: 1200,
        height: 630,
        alt: 'NSC Calculator by Fermor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSC Calculator: Calculate Maturity & 80C Tax Benefits',
    description:
      'Calculate NSC maturity amount at 7.7%, year-wise interest, and 80C deductions. See post-tax returns instantly. Free for India.',
    images: ['https://fermor.in/og-nsc-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/nsc-calculator',
  },
};

/* ─── Schema: Organization ──────────────────────────────────── */
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
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description:
    'Fermor is building the automated financial action layer for India. Free calculators are the distribution layer. The product is the action system connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'National Savings Certificate',
    'NSC Interest Rates India',
    'Section 80C Investments',
    'Post Office Savings Schemes',
    'Small Savings Schemes India',
    'Personal Finance India',
    'Account Aggregator Framework',
  ],
};

/* ─── Schema: BreadcrumbList ────────────────────────────────── */
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'NSC Calculator', item: 'https://fermor.in/calculators/nsc-calculator' },
  ],
};

/* ─── Schema: FAQPage ────────────────────────────────────────── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the NSC interest rate in 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The NSC interest rate is 7.7% per annum for Q1 FY 2025-26 (April to June 2025), as notified by the Ministry of Finance. The rate applies to new NSC purchases and is reviewed quarterly. It has remained at 7.7% since January 2024. Any change is announced through an official gazette notification.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is NSC interest calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NSC uses annual compounding. Maturity Amount = Principal x (1 + rate/100)^5. At 7.7%, Rs 1 lakh grows to Rs 1,45,039 in 5 years. Year 1 interest is Rs 7,700, year 2 is Rs 8,293 (on Rs 1,07,700), and each subsequent year is calculated on the prior year closing balance. No interest is paid out during the tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NSC interest taxable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "NSC interest for years 1 through 4 is deemed to be reinvested and qualifies for Section 80C deduction in those years. Only year 5 interest is taxable, reported as income from other sources in the financial year of maturity. The initial investment also qualifies for 80C deduction in the year of purchase.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maturity period of NSC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NSC VIII Issue has a fixed 5-year maturity. The 10-year NSC IX Issue was discontinued in December 2015. There is no option to change or extend the tenure. Each certificate matures exactly 5 years from the purchase date and must be presented to the post office for redemption.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum investment in NSC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no maximum investment limit in NSC. The minimum purchase is Rs 1,000, and you can invest in multiples of Rs 100. However, only Rs 1.5 lakh per financial year across all Section 80C instruments qualifies for tax deduction. Investment beyond this amount still earns 7.7% but without additional tax benefit.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does Rs 1 lakh grow in NSC in 5 years?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rs 1 lakh invested in NSC at 7.7% grows to Rs 1,45,039 in 5 years, earning Rs 45,039 in total interest. For a 30% bracket investor, the year 5 interest (approximately Rs 10,360) is taxable, making the post-tax maturity approximately Rs 1,41,931.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NSC better than FD or PPF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NSC at 7.7% beats most 5-year bank FDs (typically 6.5-7.5%) on rate. Unlike FDs, NSC has no TDS on compounded interest. PPF at 7.1% is fully tax-free (EEE), making it more efficient for 20-30% bracket investors on a 15-year view. For a 5-year horizon with no investment cap and investors in 0-10% tax slabs, NSC is a strong choice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw NSC before maturity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NSC does not permit premature withdrawal under normal circumstances. Exceptions include death of the holder, a court order, or forfeiture by a pledgee (bank that lent against the certificate). There is no penalty for early exit because early exit is not allowed. Plan the 5-year lock-in carefully before purchasing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the tax benefits of NSC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NSC provides Section 80C deductions in two forms. First, the initial investment qualifies for 80C in the year of purchase. Second, the interest for years 1 through 4 is deemed reinvested and also qualifies for 80C deduction in those respective years. Only year 5 interest falls outside 80C and is taxable as income from other sources.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRI invest in NSC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'NRIs cannot purchase NSC. The scheme is open only to Indian residents. Existing NSC certificates held by someone who later becomes an NRI can be retained until maturity, but no new purchases are allowed after acquiring NRI status. HUFs are also ineligible for NSC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NSC be used as collateral for a loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, NSC certificates can be pledged with banks and scheduled cooperative societies as loan collateral. The bank sends a lien request to the post office, which records it on the certificate. Once the loan is repaid, the lien is removed. SBI and most public sector banks accept NSC pledges for secured loans.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free with no sign-up required. The NSC Calculator, like every tool on Fermor, is designed to give specific numbers for your actual situation. Fermor is building tools to close the gap between knowing what to do with money and actually doing it.',
      },
    },
  ],
};

/* ─── Schema: WebApplication ────────────────────────────────── */
const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'NSC Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/nsc-calculator',
  description:
    'Calculate National Savings Certificate maturity amount, year-wise interest schedule, Section 80C deductions, and post-tax returns at the current 7.7% rate.',
  featureList: [
    'NSC maturity calculation with annual compounding',
    'Year-by-year interest schedule with 80C eligibility',
    'Post-tax maturity based on income tax slab',
    'Total 80C deduction (investment + years 1-4 interest)',
    'Multi-certificate scaling',
    'Financial year labels on interest schedule',
    'localStorage persistence for returning users',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified:  PAGE_DATE_MODIFIED,
};

/* ─── Schema: HowTo ─────────────────────────────────────────── */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate NSC Maturity Amount',
  description:
    'Step-by-step guide to calculate your NSC maturity, year-wise interest, and Section 80C tax benefits using the NSC Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor NSC Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the investment amount',
      text: 'Enter the face value of each NSC certificate. The minimum is Rs 1,000. You can enter any amount to model how different investment sizes grow over 5 years.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Verify the interest rate',
      text: 'The current NSC rate of 7.7% is pre-filled. You can adjust this to model future rate changes or compare scenarios, though the actual rate for new purchases is set by the Ministry of Finance each quarter.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the number of certificates',
      text: 'If you are purchasing multiple certificates, increase this slider. Total maturity and interest scale proportionally. This is useful if you are planning to buy NSCs for multiple family members.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select your tax slab',
      text: 'Choose your income tax slab to see post-tax maturity. The calculator taxes only year 5 interest (not 80C eligible), while years 1-4 interest is shown as 80C deductible.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Review results and year-wise schedule',
      text: 'See total maturity, interest earned, and Section 80C deduction available over 5 years. Expand the year-wise schedule to see exactly which year\'s interest qualifies for 80C and which is taxable.',
    },
  ],
};

/* ─── Schema: DefinedTerm ────────────────────────────────────── */
const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'NSC',
  alternateName: 'National Savings Certificate',
  description:
    'A 5-year fixed-income savings instrument issued by India Post under the Government Savings Certificates Act, 1959. Interest compounds annually at 7.7% (Q1 FY 2025-26) and is paid at maturity. Both the initial investment and years 1-4 reinvested interest qualify for Section 80C deduction.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/National_Savings_Certificates_(India)',
    'https://www.wikidata.org/wiki/Q6979965',
  ],
};

/* ─── Schema: WebPage ────────────────────────────────────────── */
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'NSC Calculator: National Savings Certificate Maturity and Returns',
  description:
    'Free NSC calculator. Calculate National Savings Certificate maturity, year-wise interest, and Section 80C deductions at 7.7%.',
  url: 'https://fermor.in/calculators/nsc-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified:  PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author:    { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  about: [
    {
      '@type': 'DefinedTerm',
      name: 'NSC',
      alternateName: 'National Savings Certificate',
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, salaried employees, tax planners, post office savings scheme investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-nsc',             name: 'What Is the National Savings Certificate' },
    { '@type': 'WebPageElement', cssSelector: '#nsc-interest-calculation', name: 'How NSC Interest Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#nsc-tax-benefits',         name: 'NSC Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#nsc-vs-ppf-fd',            name: 'NSC vs PPF vs FD Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#nsc-rules',                name: 'NSC Withdrawal, Transfer, and Nomination Rules' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',               name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                      name: 'Frequently Asked Questions' },
  ],
};

/* ─── Page ───────────────────────────────────────────────────── */
export default function NSCCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <NSCCalculatorClient />
    </>
  );
}

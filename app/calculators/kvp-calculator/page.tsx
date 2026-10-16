import type { Metadata } from 'next';
import KVPCalculatorClient from './KVPCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED  = '2026-09-24';

export const metadata: Metadata = {
  title: 'KVP Interest Rate Calculator: 7.5% Maturity & Doubling',
  description: 'Calculate KVP maturity at 7.5% interest. Post office Kisan Vikas Patra calculator with year-wise breakdown, tax treatment, and doubling period. Free.',
  keywords: [
    'kvp interest rate calculator',
    'kisan vikas patra interest rate',
    'post office kvp interest rate',
    'kvp interest rate 2025',
    'kisan vikas patra calculator',
    'kvp maturity calculator',
    'kvp doubling calculator',
    'post office kvp calculator',
    'kisan vikas patra scheme calculator',
    'kvp interest calculator year wise',
    'kvp calculator 2025',
    'kisan vikas patra interest calculator',
    'kvp tax calculator',
    'kvp interest rate vs fd',
    'kisan vikas patra maturity amount',
    'kvp doubling period',
    'post office kisan vikas patra interest rate',
    'kvp vs nsc calculator',
    'kvp yearly interest breakdown',
    'kvp certificate calculator',
    'kvp compounding calculator',
    'india post kvp interest',
    'kvp interest calculator income tax',
    'kisan vikas patra vs fd calculator',
    'post office savings kvp calculator',
  ],
  openGraph: {
    title: 'KVP Interest Rate Calculator: 7.5% Maturity & Doubling - Fermor',
    description: 'Calculate KVP maturity at 7.5% interest rate. Year-wise breakdown, tax implications, and doubling period for Kisan Vikas Patra. Free.',
    type: 'website',
    url: 'https://fermor.in/calculators/kvp-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-kvp-calculator.png', width: 1200, height: 630, alt: 'KVP Interest Rate Calculator - Fermor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KVP Interest Rate Calculator: 7.5% Doubling Period',
    description: 'Calculate your KVP maturity at current 7.5% interest. See year-wise interest breakdown and tax treatment. Post office calculator for India.',
    images: ['https://fermor.in/og-kvp-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/kvp-calculator',
  },
};

/* ─── Schemas ─────────────────────────────────────────────────── */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is a financial platform built for India. Free calculators are the distribution layer; the product is the action system connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Kisan Vikas Patra',
    'Post Office Small Savings Schemes',
    'KVP Interest Rates India',
    'India Post Savings Certificates',
    'Personal Finance India',
    'Section 80C Investments',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'KVP Calculator', item: 'https://fermor.in/calculators/kvp-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the KVP interest rate in 2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Kisan Vikas Patra interest rate is 7.5% per annum for Q1 FY 2025-26 (April to June 2025), as notified by the Ministry of Finance. At this rate, KVP doubles your money in 115 months (9 years 7 months). The rate is reviewed quarterly alongside all post office small savings rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'In how many months does KVP double money?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At the current 7.5% rate, KVP doubles your money in 115 months, which is 9 years and 7 months. The doubling period is calculated as: months = ceil(ln(2) / ln(1 + r/100) x 12). At 8%, it drops to 108 months (9 years). At 6.9%, it is 120 months (10 years). The doubling period changes every time the government revises the KVP interest rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Kisan Vikas Patra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kisan Vikas Patra (KVP) is a Post Office savings certificate issued by the Department of Posts, Government of India. It guarantees to double the invested amount at maturity. First introduced in 1988, discontinued in 2011, and relaunched in November 2014 with KYC requirements. Open to resident Indians, joint holders (up to 3 adults), and trusts. NRIs are not eligible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is KVP interest taxable?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, KVP interest is fully taxable as income from other sources under the Income Tax Act, 1961. There is no TDS at the post office on KVP interest during the tenure, but TDS at 10% applies on the maturity payout if interest exceeds Rs 10,000. Investors must declare KVP interest on an accrual basis every year in their ITR, even though physical payment happens only at maturity.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum investment in KVP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The minimum investment in KVP is Rs 1,000, and subsequent amounts must be in multiples of Rs 100. There is no upper limit. For investments of Rs 10 lakh and above, PAN card details are mandatory. For investments above Rs 50,000, full KYC (Aadhaar and PAN) is required as per India Post guidelines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I withdraw KVP before maturity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Premature encashment of KVP is allowed after a lock-in period of 2.5 years (30 months) from the date of issue. Before 30 months, withdrawal is only permitted in cases of death, court order, or forfeiture by a pledgee. After 30 months, interest earned up to the date of withdrawal is paid, but it will be less than the full maturity amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a maximum limit for KVP investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, there is no maximum investment limit for KVP. An investor can purchase any number of KVP certificates for any amount above Rs 1,000. However, KVP does not offer Section 80C benefits and the interest is fully taxable, so large investments in high tax brackets may not be as efficient as alternatives like PPF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does KVP give Section 80C tax benefit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, KVP investments do not qualify for deduction under Section 80C of the Income Tax Act. This is a key difference from NSC, where investments qualify for 80C up to Rs 1.5 lakh per year. KVP was excluded from 80C benefits as part of its redesign when it was relaunched in 2014.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRI invest in KVP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Non-Resident Indians (NRIs) cannot invest in Kisan Vikas Patra. KVP is available only to resident Indian individuals, joint holders (maximum three adults), and trusts. HUFs are also not eligible. This restriction applies across all post offices and authorised banks offering KVP.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is KVP better than FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KVP and bank FDs serve different purposes. KVP offers a sovereign-backed guaranteed doubling at 7.5% over 115 months. Bank FDs offer flexible tenures with rates from 6.5% to 7.8%. Both have fully taxable interest. KVP has a longer lock-in (30 months) than most FDs. For investors wanting long-term certainty without needing 80C benefits, KVP is a strong alternative to FDs above 5 years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can KVP be used as loan collateral?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, KVP certificates can be pledged as collateral for loans from banks and financial institutions. A lien is marked on the certificate at the issuing post office or bank. The loan amount is typically 80-90% of the face value or surrender value, depending on the lender\'s policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. All calculators are free with no sign-up required. Fermor is building an automated financial action system that connects real financial accounts through the Account Aggregator framework.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'KVP Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/kvp-calculator',
  description: 'Calculate Kisan Vikas Patra maturity amount, doubling period, and year-wise balance schedule at any investment amount and interest rate.',
  featureList: [
    'KVP maturity calculation with annual compounding',
    'Auto-computed doubling period from interest rate',
    'Maturity date calculation',
    'Year-by-year balance growth table',
    'Multi-certificate support',
    'Doubling period reference table',
    'localStorage persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate KVP Maturity Amount',
  description: 'Step-by-step guide to calculate your Kisan Vikas Patra maturity amount and doubling period using the KVP Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor KVP Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the investment amount',
      text: 'Enter the amount per KVP certificate. The minimum is Rs 1,000. If you plan to invest Rs 5 lakh, enter Rs 5,00,000 as the certificate amount or use multiple certificates.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'The default is 7.5%, the current Q1 FY 2025-26 rate set by the Ministry of Finance. Adjust to model other scenarios. The doubling period updates automatically when you change the rate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Set the number of certificates',
      text: 'KVP certificates are individual instruments. If you want Rs 5 lakh split across 5 certificates of Rs 1 lakh each, set certificates to 5 and the investment amount to Rs 1,00,000.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the output panel',
      text: 'See the maturity amount, total profit, maturity date, and CAGR. The "Your money doubles in" panel shows the exact months and the target maturity date. Expand the year-wise table for the annual compounding breakdown.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'KVP',
  alternateName: 'Kisan Vikas Patra',
  description: 'A post office savings certificate issued by the Government of India that guarantees to double the invested amount at maturity. Interest is compounded annually. At 7.5% per annum, the doubling period is 115 months (9 years 7 months). KVP does not qualify for Section 80C deduction and interest is fully taxable.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Kisan_Vikas_Patra',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'KVP Calculator: Kisan Vikas Patra Maturity and Doubling Period',
  description: 'Free KVP calculator for India. Calculate Kisan Vikas Patra maturity amount and doubling period at 7.5%. Year-wise balance schedule. Free to use.',
  url: 'https://fermor.in/calculators/kvp-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
    logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' },
  },
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', 'article p:first-of-type', '.article-lead'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'KVP', alternateName: 'Kisan Vikas Patra' },
    { '@type': 'DefinedTerm', name: 'Post Office Small Savings Schemes' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, post office savings investors, conservative savers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-kvp',               name: 'What Is Kisan Vikas Patra' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-doubling-calculation',  name: 'How KVP Doubles Your Money' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-doubling-period',       name: 'KVP Doubling Period Table' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-tax-treatment',         name: 'KVP Tax Treatment' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-interest-rates-history', name: 'KVP Interest Rates Through 2014-2025' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-tax-example',           name: 'KVP Tax Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#kvp-vs-alternatives',       name: 'KVP vs NSC vs FD Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                       name: 'Frequently Asked Questions' },
  ],
};

export default function KVPCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <KVPCalculatorClient />
    </>
  );
}

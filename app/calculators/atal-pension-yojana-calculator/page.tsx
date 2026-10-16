import type { Metadata } from 'next';
import AtalPensionYojanaClient from './AtalPensionYojanaClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-26';

export const metadata: Metadata = {
  title: 'Atal Pension Yojana (APY) Calculator: Monthly Contribution',
  description: 'Free Atal Pension Yojana calculator for India. Find your exact APY monthly contribution by entry age and pension slab. Works for SBI, all banks, and post office accounts.',
  keywords: [
    'atal pension yojana calculator',
    'atal pension calculator',
    'atal pension yojana pension calculator',
    'apy scheme calculator',
    'apy calculator sbi',
    'apy pension calculator',
    'atal pension scheme calculator',
    'atal pension yojana calculator in post office',
    'atal pension yojana calculator sbi',
    'atal pension yojana maturity amount',
    'atal pension yojana scheme calculator',
    'apy contribution chart',
    'apy monthly contribution chart',
    'age calculator for atal pension yojana',
    'apy nps calculator',
    'atal pension yojana calculator chart',
    'atal pension yojana age calculator',
    'atal pension plan calculator',
    'atal pension premium calculator',
    'apy calculator online',
    'apy chart pdf',
    'atal pension yojana eligibility',
    'apy 1000 pension chart',
    'apy 5000 pension chart',
    'atal pension yojana interest rate',
    'atal pension yojana tax benefit',
    'atal pension yojana withdrawal rules',
    'apy account opening online',
    'atal pension yojana for nri',
    'atal pension yojana vs nps',
  ],
  openGraph: {
    title: 'Atal Pension Yojana (APY) Calculator: Monthly Contribution - Fermor',
    description: 'Calculate your exact APY monthly contribution by entry age and pension slab (Rs 1000 to Rs 5000). Works for SBI, all banks, and post office accounts. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/atal-pension-yojana-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-atal-pension-yojana-calculator.png', width: 1200, height: 630, alt: 'Fermor Atal Pension Yojana Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atal Pension Yojana (APY) Calculator: Monthly Contribution',
    description: 'Find your exact APY monthly contribution by entry age and pension slab. Works for SBI, all banks, and post office. Free for India.',
    images: ['https://fermor.in/og-atal-pension-yojana-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/atal-pension-yojana-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Atal Pension Yojana',
    'PFRDA Regulations',
    'National Pension System',
    'Retirement Planning India',
    'Section 80CCD Tax Benefits',
    'Personal Finance India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Atal Pension Yojana Calculator', item: 'https://fermor.in/calculators/atal-pension-yojana-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the Atal Pension Yojana calculator work?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Atal Pension Yojana calculator is a lookup table, not a formula. PFRDA fixes the exact monthly contribution for every combination of entry age (18 to 40) and desired monthly pension (Rs 1,000 to Rs 5,000) at age 60. Enter your age and target pension, and the calculator returns the fixed contribution amount along with total years and total amount you will pay until 60.' },
    },
    {
      '@type': 'Question',
      name: 'What is the APY monthly contribution chart?',
      acceptedAnswer: { '@type': 'Answer', text: 'The APY monthly contribution chart is the official PFRDA table mapping entry age to the contribution required for each pension slab. For example, joining at 18 for a Rs 1,000 monthly pension costs Rs 42 per month, while the same pension joined at 40 costs Rs 291 per month. The earlier you join, the lower your monthly contribution for the same guaranteed pension.' },
    },
    {
      '@type': 'Question',
      name: 'Is the Atal Pension Yojana calculator the same for SBI, other banks, and post office?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. APY is a Government of India scheme regulated by PFRDA, and the contribution chart is identical regardless of which bank or post office holds the account. SBI, HDFC Bank, ICICI Bank, all nationalised banks, and India Post all use the same fixed contribution table set by PFRDA. There is no SBI-specific or post-office-specific APY rate.' },
    },
    {
      '@type': 'Question',
      name: 'What is the maturity amount under Atal Pension Yojana?',
      acceptedAnswer: { '@type': 'Answer', text: 'APY does not produce a lumpsum maturity amount like PPF or NPS. Instead, it guarantees a fixed monthly pension for life starting at age 60, ranging from Rs 1,000 to Rs 5,000 depending on the slab chosen. If the subscriber dies after 60, the spouse continues to receive the same pension, and on the spouse death, the nominee receives the accumulated corpus, which is a fixed amount between Rs 1.7 lakh and Rs 8.5 lakh depending on the slab.' },
    },
    {
      '@type': 'Question',
      name: 'Who is eligible for Atal Pension Yojana?',
      acceptedAnswer: { '@type': 'Answer', text: 'Any Indian citizen between 18 and 40 years of age with a savings bank account or post office savings account is eligible for APY. The subscriber must not be an income taxpayer under current PFRDA rules (this restriction was added from October 2022) and must not already be covered under any other statutory social security scheme like EPF or NPS government co-contribution schemes.' },
    },
    {
      '@type': 'Question',
      name: 'What happens if I miss an APY contribution?',
      acceptedAnswer: { '@type': 'Answer', text: 'A penalty of Rs 1 to Rs 10 per month is charged depending on the contribution slab if a payment is missed. The account is frozen after a continuous default period, deactivated after a longer default, and closed if contributions remain unpaid beyond 24 months from the due date, with the accumulated corpus returned to the subscriber.' },
    },
    {
      '@type': 'Question',
      name: 'Can I exit Atal Pension Yojana before age 60?',
      acceptedAnswer: { '@type': 'Answer', text: 'Premature exit is allowed only in exceptional circumstances such as the death of the subscriber or a terminal illness. In these cases, the accumulated corpus (the subscriber contribution plus government co-contribution, if any, plus accrued interest) is paid out. Voluntary exit before 60 for any other reason is not permitted under PFRDA APY guidelines.' },
    },
    {
      '@type': 'Question',
      name: 'What is the tax benefit on Atal Pension Yojana contributions?',
      acceptedAnswer: { '@type': 'Answer', text: 'APY contributions qualify for deduction under Section 80CCD(1B) of the Income Tax Act, up to Rs 50,000 per year. This deduction is separate from and in addition to the Rs 1.5 lakh limit under Section 80C. The pension received after 60 is taxed as regular income in the year it is received.' },
    },
    {
      '@type': 'Question',
      name: 'How is Atal Pension Yojana different from NPS?',
      acceptedAnswer: { '@type': 'Answer', text: 'APY guarantees a fixed monthly pension set in advance, with contribution amounts fixed by PFRDA based on entry age. NPS is market-linked: the corpus depends on fund performance and the pension is not guaranteed in advance. APY is designed for low-income, unorganised-sector workers with a maximum pension of Rs 5,000 per month, while NPS has no upper cap on pension and is suited to higher earners seeking market-linked growth.' },
    },
    {
      '@type': 'Question',
      name: 'How do I apply for Atal Pension Yojana online?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can apply through your bank net banking portal (SBI, HDFC, ICICI, and most banks have an APY section under government schemes), through the eNPS portal using Aadhaar-based e-KYC, or by visiting a bank branch or post office in person with your savings account passbook and Aadhaar.' },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum APY pension I can get at age 60?',
      acceptedAnswer: { '@type': 'Answer', text: 'The maximum guaranteed monthly pension under Atal Pension Yojana is Rs 5,000, available by choosing the highest contribution slab matched to your entry age. The five available slabs are Rs 1,000, Rs 2,000, Rs 3,000, Rs 4,000, and Rs 5,000 per month.' },
    },
    {
      '@type': 'Question',
      name: 'Can I change my pension slab after opening an APY account?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, subscribers can upgrade or downgrade their pension slab once a year, typically during April. The monthly contribution adjusts based on your current age and the new slab, per the official PFRDA chart. Any difference in past contributions is collected or refunded with applicable interest or charges.' },
    },
    {
      '@type': 'Question',
      name: 'What is a PRAN and can I switch banks?',
      acceptedAnswer: { '@type': 'Answer', text: 'PRAN (Permanent Retirement Account Number) is your unique 12-digit identifier issued at APY account opening and linked to your Aadhaar. Yes, you can switch to a different bank by submitting a Transfer Request Form. The central recordkeeping agency transfers all your APY account records under your PRAN within 3 to 5 working days, and you continue without losing your account history.' },
    },
    {
      '@type': 'Question',
      name: 'Can I pay APY contributions quarterly or half-yearly?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, PFRDA allows contribution payment on monthly, quarterly, or half-yearly frequency. The total annual amount remains the same regardless of frequency. Quarterly payment means paying 3 months worth at once, half-yearly means 6 months worth. Monthly auto-debit is most common and recommended to avoid penalties for missed months.' },
    },
    {
      '@type': 'Question',
      name: 'What happens to APY pension during inflation?',
      acceptedAnswer: { '@type': 'Answer', text: 'APY pension amounts are fixed for life and do not adjust for inflation. A Rs 5,000 pension in 2045 will have the same nominal value in 2065, but its purchasing power will decrease significantly due to inflation. This is why using APY as a supplementary retirement income rather than the sole source is recommended.' },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform built for India. All calculators are free with no sign-up required. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Atal Pension Yojana Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/atal-pension-yojana-calculator',
  description: 'Calculate your exact APY monthly contribution using the official PFRDA contribution chart, based on entry age and desired pension slab from Rs 1,000 to Rs 5,000.',
  featureList: [
    'Official PFRDA contribution lookup table',
    'Entry age slider (18 to 40)',
    'Pension slab selector (Rs 1,000 to Rs 5,000)',
    'Years already contributed adjustment',
    'Total contribution and pension value donut chart',
    'Multi-currency support (INR, USD, EUR, GBP)',
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
  name: 'How to Calculate Atal Pension Yojana Monthly Contribution',
  description: 'Step-by-step guide to find your exact APY monthly contribution using the Atal Pension Yojana Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Atal Pension Yojana Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Set your entry age', text: 'Move the slider to your current age between 18 and 40. The earlier you join, the lower your monthly contribution for the same pension.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose your desired monthly pension', text: 'Select Rs 1,000, Rs 2,000, Rs 3,000, Rs 4,000, or Rs 5,000 as the guaranteed monthly pension you want starting at age 60.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust years already contributed', text: 'If you already hold an APY account, enter how many years you have already contributed to see your remaining tenure and remaining total outlay.' },
    { '@type': 'HowToStep', position: 4, name: 'Review your results', text: 'See the fixed monthly contribution from the official PFRDA chart, years remaining, total amount you will pay, and the corpus paid to your nominee on death after 60.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'APY',
  alternateName: 'Atal Pension Yojana',
  description: 'A government-backed pension scheme regulated by PFRDA that guarantees a fixed monthly pension of Rs 1,000 to Rs 5,000 from age 60, with the required monthly contribution fixed by entry age under an official PFRDA chart.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Atal_Pension_Yojana',
    'https://www.wikidata.org/wiki/Q55633891',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Atal Pension Yojana (APY) Calculator: Monthly Contribution by Age',
  description: 'Free Atal Pension Yojana calculator. Find your exact APY monthly contribution by entry age and pension slab, using the official PFRDA chart.',
  url: 'https://fermor.in/calculators/atal-pension-yojana-calculator',
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
    cssSelector: ['h1', 'h2', 'article p:first-of-type'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'APY', alternateName: 'Atal Pension Yojana' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, unorganised sector workers, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-apy', name: 'What Is Atal Pension Yojana' },
    { '@type': 'WebPageElement', cssSelector: '#apy-eligibility', name: 'APY Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#apy-contribution-chart', name: 'APY Contribution Chart' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-apply', name: 'How to Apply for APY' },
    { '@type': 'WebPageElement', cssSelector: '#apy-contribution-frequency', name: 'APY Contribution Frequency' },
    { '@type': 'WebPageElement', cssSelector: '#apy-account-freezing', name: 'APY Account Freezing Rules' },
    { '@type': 'WebPageElement', cssSelector: '#apy-exit-rules', name: 'APY Premature Exit Rules' },
    { '@type': 'WebPageElement', cssSelector: '#apy-tax-benefit', name: 'APY Tax Benefit' },
    { '@type': 'WebPageElement', cssSelector: '#apy-death-corpus', name: 'APY Survivor Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#apy-pran-account', name: 'APY PRAN and Account Portability' },
    { '@type': 'WebPageElement', cssSelector: '#apy-formula', name: 'APY Contribution Formula' },
    { '@type': 'WebPageElement', cssSelector: '#apy-excel-formula', name: 'APY Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-apy-calculator', name: 'Reverse APY Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#apy-vs-nps', name: 'APY vs NPS' },
    { '@type': 'WebPageElement', cssSelector: '#apy-limitations', name: 'Limitations of Atal Pension Yojana' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function AtalPensionYojanaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AtalPensionYojanaClient />
    </>
  );
}

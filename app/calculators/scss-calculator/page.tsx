import type { Metadata } from 'next';
import SCSSCalculatorClient from './SCSSCalculatorClient';

const PAGE_DATE_PUBLISHED = '2026-07-01';
const PAGE_DATE_MODIFIED = '2026-09-24';

export const metadata: Metadata = {
  title: 'SCSS Calculator: Interest & Maturity at 8.2%',
  description: 'SCSS calculator for India. Calculate quarterly interest, maturity amount, tax implications, and year-wise returns at current 8.2% rate from India Post. Free, no sign-up required.',
  keywords: [
    'scss calculator',
    'scss scheme calculator',
    'scss interest calculator',
    'scss monthly calculator',
    'senior citizen savings scheme calculator',
    'scss maturity calculator',
    'scss return calculator',
    'scss quarterly interest calculator',
    'scss interest rate calculator',
    'post office scss calculator',
    'senior citizen scheme post office calculator',
    'sbi scss calculator',
    'scss 2025 calculator',
    'scss interest rate 2025',
    'css monthly income calculator',
    'scss scheme interest calculator',
    'scss interest calculator post office',
    'senior citizens saving scheme calculator',
    'css return calculator india',
    'scss eligibility calculator',
  ],
  openGraph: {
    title: 'SCSS Calculator: Interest & Maturity at 8.2% - Fermor',
    description: 'Calculate SCSS quarterly interest, maturity amount, and tax at 8.2%. Year-wise breakdown. Free India Post SCSS calculator.',
    type: 'website',
    url: 'https://fermor.in/calculators/scss-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-scss-calculator.png', width: 1200, height: 630, alt: 'SCSS Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SCSS Calculator: Interest & Maturity at 8.2%',
    description: 'Calculate quarterly interest, maturity amount, and tax implications at current SCSS rate. Free India Post calculator.',
    images: ['https://fermor.in/og-scss-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/scss-calculator',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. Free financial calculators covering savings, investments, loans, and tax planning.',
  knowsAbout: [
    'Senior Citizen Savings Scheme',
    'SCSS Interest Rates India',
    'Post Office Small Savings Schemes',
    'Section 80C Investments',
    'Retirement Income Planning India',
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
    { '@type': 'ListItem', position: 3, name: 'SCSS Calculator', item: 'https://fermor.in/calculators/scss-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the SCSS interest rate in 2025?',
      acceptedAnswer: { '@type': 'Answer', text: 'The SCSS interest rate for Q1 FY 2025-26 (April to June 2025) is 8.2% per annum, as notified by the Ministry of Finance. Interest is paid quarterly on the first working day of each quarter. The rate has been 8.2% since April 2023, the highest among post office small savings schemes.' },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum investment in SCSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'The maximum deposit limit in SCSS is Rs 30 lakh (Rs 30,00,000) per individual. This cap was doubled from Rs 15 lakh to Rs 30 lakh in February 2023 per the Finance Act 2023. You can hold multiple SCSS accounts, but the combined balance must not exceed Rs 30 lakh.' },
    },
    {
      '@type': 'Question',
      name: 'Is SCSS interest taxable?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, SCSS interest is fully taxable as per your income tax slab under "Income from Other Sources". TDS is deducted at 10% if aggregate interest exceeds Rs 50,000 in a financial year. Senior citizens with total income below the taxable limit can submit Form 15H to prevent TDS deduction.' },
    },
    {
      '@type': 'Question',
      name: 'Can I extend SCSS after 5 years?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. SCSS can be extended once for 3 additional years after the initial 5-year tenure. The extension request must be submitted within one year of the maturity date. The interest rate during extension is the rate prevailing at the time of extension, not the original rate. After the 8-year total period, no further extension is permitted.' },
    },
    {
      '@type': 'Question',
      name: 'Who is eligible for SCSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Indian residents aged 60 years and above can open SCSS at any time. Retired civilian government employees aged 55 to 60 can invest within one month of receiving retirement benefits. Retired defence personnel are eligible at age 50 and above. NRIs, HUFs, and PIOs are not eligible.' },
    },
    {
      '@type': 'Question',
      name: 'How often is SCSS interest paid?',
      acceptedAnswer: { '@type': 'Answer', text: 'SCSS interest is paid quarterly on the first working day of April, July, October, and January each year. The interest is credited directly to your linked savings account. SCSS does not compound interest; it is a simple interest scheme. Uncollected interest does not earn any additional return.' },
    },
    {
      '@type': 'Question',
      name: 'Can I open SCSS in a bank or only post office?',
      acceptedAnswer: { '@type': 'Answer', text: 'SCSS is available at all post offices and 24 authorised banks including SBI, HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda, PNB, Canara Bank, Bank of India, and others. The interest rate, government guarantee, and scheme terms are identical across all institutions. The choice depends purely on convenience.' },
    },
    {
      '@type': 'Question',
      name: 'What happens on premature closure of SCSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Premature closure is not allowed in the first year. After 1 year but before 2 years, 1.5% of the deposit amount is deducted as penalty. After 2 years from the date of opening, 1% is deducted. On the death of the account holder, the nominee or legal heir can close the account without any penalty.' },
    },
    {
      '@type': 'Question',
      name: 'Can NRIs invest in SCSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. Non-Resident Indians (NRIs) are not eligible to open an SCSS account. PIOs and HUFs are also excluded. If an account holder becomes an NRI after opening the account, the account can be held until maturity but cannot be extended. New deposits after acquiring NRI status are not permitted.' },
    },
    {
      '@type': 'Question',
      name: 'Is SCSS better than FD for senior citizens?',
      acceptedAnswer: { '@type': 'Answer', text: 'SCSS at 8.2% beats most senior citizen bank FD rates (typically 7.0% to 7.8%) and carries a sovereign government guarantee versus DICGC cover of only Rs 5 lakh per bank for FDs. SCSS also qualifies for Section 80C deduction on the deposit. The limitation is the Rs 30 lakh cap and the fact that only one deposit per account is allowed.' },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum investment in SCSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'The minimum deposit in SCSS is Rs 1,000. Further deposits must be in multiples of Rs 1,000. Only one lump-sum deposit is permitted per account at the time of opening. To invest additional amounts, you must open a separate SCSS account, subject to the combined Rs 30 lakh ceiling across all your SCSS accounts.' },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform built for India, providing 500+ free financial calculators with no sign-up required. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and help people close the gap between financial planning and actual financial action.' },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SCSS Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/scss-calculator',
  description: 'Calculate Senior Citizen Savings Scheme maturity amount, quarterly interest payout, annual interest income, and total returns at any deposit amount and rate. Supports 5-year and 8-year extended tenures.',
  featureList: [
    'SCSS maturity amount calculation with simple interest',
    'Quarterly interest payout display',
    'Annual interest income calculation',
    'Year-wise interest payout table',
    'Tenure toggle: 5 years and 8 years extended',
    'Account type: Single and Joint',
    'Investor age input for maturity age display',
    'Donut chart showing invested vs interest',
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
  name: 'How to Calculate SCSS Maturity Amount and Quarterly Interest',
  description: 'Step-by-step guide to calculate your Senior Citizen Savings Scheme maturity amount and quarterly interest payout using the SCSS Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor SCSS Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your investment amount',
      text: 'Enter the lump-sum amount you plan to deposit in SCSS. The minimum is Rs 1,000 and the maximum is Rs 30 lakh per individual. SCSS allows only one deposit per account, so enter your total planned amount.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'The current SCSS rate of 8.2% p.a. is pre-filled. You can adjust this to model future rate scenarios. The Ministry of Finance reviews and notifies the rate each quarter. The actual rate at the time of deposit applies for the full tenure.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select your tenure',
      text: 'Toggle between 5 Years (standard tenure) and 8 Years (Extended). The extension option is available once after the initial 5-year period, for an additional 3 years, at the prevailing rate at the time of extension.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Choose account type and enter your age',
      text: 'Select Single or Joint account. For joint accounts, the first holder must be 60 or above and the second holder must be the spouse. Enter your age to see at what age the scheme will mature.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Review results and year-wise interest table',
      text: 'The results panel shows maturity amount, quarterly payout, annual interest income, and total interest earned. Expand the Year-wise Interest Payout table to see the annual interest, cumulative interest, and balance for each year of the tenure.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'SCSS',
  alternateName: 'Senior Citizen Savings Scheme',
  description: 'A government-backed savings scheme for Indian residents aged 60 and above, offering 8.2% p.a. interest paid quarterly, with a 5-year tenure extendable by 3 years, maximum deposit of Rs 30 lakh, available through India Post and authorised banks.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Senior_Citizen_Savings_Scheme',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SCSS Calculator: Senior Citizen Savings Scheme Returns and Interest - Fermor',
  description: 'Free SCSS calculator for India. Calculate Senior Citizen Savings Scheme maturity amount, quarterly interest payout, and total returns at 8.2%.',
  url: 'https://fermor.in/calculators/scss-calculator',
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
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'SCSS', alternateName: 'Senior Citizen Savings Scheme' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Senior citizens, retirees, retirement planners, financial advisors India',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-scss', name: 'What Is the Senior Citizen Savings Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#scss-interest-calculation', name: 'How SCSS Interest Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#scss-vs-fd', name: 'SCSS vs FD Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#scss-tax-treatment', name: 'Tax Treatment of SCSS Interest' },
    { '@type': 'WebPageElement', cssSelector: '#scss-eligibility', name: 'SCSS Eligibility and Account Rules' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This SCSS Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SCSSCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SCSSCalculatorClient />
    </>
  );
}

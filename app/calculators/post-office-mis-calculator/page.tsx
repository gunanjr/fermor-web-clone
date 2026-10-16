import type { Metadata } from 'next';
import PostOfficeMISClient from './PostOfficeMISClient';

export const metadata: Metadata = {
  title: 'Post Office MIS Calculator: Monthly Income Scheme',
  description:
    'Free Post Office MIS calculator for India. Calculate monthly income at 7.4%, 5-year maturity, and MIS + RD reinvestment returns. Free to use.',
  keywords: [
    'post office mis calculator',
    'post office monthly income scheme calculator',
    'pomis calculator',
    'post mis calculator',
    'post office monthly income plan calculator',
    'mis calculator post office',
    'india post mis calculator',
    'india post monthly income scheme calculator',
    'post office mis interest rate calculator',
    'interest rate for mis in post office',
    'interest on mis post office',
    'mis interest rate in post office calculator',
    'post office mis calculator in excel',
    'mis and rd post office calculator',
    'mis plus rd calculator',
    'post office rd monthly income scheme calculator',
    'post office monthly income scheme for senior citizens calculator',
    'pomis scheme calculator',
    'mis maturity calculator',
    'post office mis premature closure calculator',
    'post office monthly income scheme interest rate 2026',
  ],
  alternates: { canonical: 'https://fermor.in/calculators/post-office-mis-calculator' },
  twitter: {
    card: 'summary_large_image',
    title: 'Post Office MIS Calculator: Monthly Income Scheme',
    description: 'Calculate monthly income from Post Office MIS at 7.4%, with an optional MIS + RD reinvestment projection. Free for India.',
    images: ['https://fermor.in/og-post-office-mis-calculator.png'],
  },
  openGraph: {
    title: 'Post Office MIS Calculator: Monthly Income Scheme',
    description:
      'Calculate your Post Office Monthly Income Scheme payout at the current 7.4% rate, over the fixed 5-year tenure, with an optional MIS + RD reinvestment projection. Free for India.',
    type: 'website',
    url: 'https://fermor.in/calculators/post-office-mis-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-post-office-mis-calculator.png', width: 1200, height: 630, alt: 'Fermor Post Office MIS Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-07-22';
const PAGE_DATE_PUBLISHED = '2026-07-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Post Office Monthly Income Scheme',
    'Post Office Savings Schemes',
    'Post Office Recurring Deposit',
    'Small Savings Scheme Interest Rates',
    'Retirement Income Planning',
    'Ministry of Finance Quarterly Rate Notifications',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Personal Finance India',
  ],
};

const faqItems = [
  {
    q: 'What is the Post Office Monthly Income Scheme (MIS)?',
    a: 'Post Office MIS is a government-backed savings scheme that pays a fixed monthly income on a lump sum deposit, currently at 7.4% per annum, over a fixed 5-year tenure. The principal is returned in full at maturity, and the monthly payout is calculated on the original deposit, not compounded within the scheme.',
  },
  {
    q: 'What is the current Post Office MIS interest rate?',
    a: 'The Post Office MIS interest rate is 7.4% per annum for the April-June 2026 quarter, fixed for the full 5-year term of the account once opened. The rate is reviewed every quarter by the Ministry of Finance and can change for accounts opened in a later quarter.',
  },
  {
    q: 'What is the maximum amount I can invest in Post Office MIS?',
    a: 'The maximum investment is Rs 9 lakh for a single account and Rs 15 lakh for a joint account, with each joint holder\'s effective share capped at Rs 9 lakh. The minimum investment is Rs 1,000, in multiples of Rs 100 thereafter.',
  },
  {
    q: 'How is the Post Office MIS monthly income calculated?',
    a: 'Monthly income equals your deposit multiplied by the annual interest rate, divided by 12. On a Rs 9 lakh deposit at 7.4%, that works out to Rs 5,550 a month for 60 months, a total payout of Rs 3,33,000 over the 5-year term, with the original Rs 9 lakh returned separately at maturity.',
  },
  {
    q: 'Can I reinvest my Post Office MIS monthly income into an RD?',
    a: 'Yes, many investors deposit their MIS payout into a Post Office Recurring Deposit each month rather than spending it, effectively compounding an otherwise non-compounding scheme. On a Rs 9 lakh MIS at 7.4% with the payout reinvested into an RD at the current 6.7% rate, the RD portion alone grows to approximately Rs 3,96,080 by year 5, on top of the Rs 9 lakh MIS principal.',
  },
  {
    q: 'What happens if I withdraw from Post Office MIS before 5 years?',
    a: 'Withdrawal is not permitted before 1 year under any circumstance. Between 1 and 3 years, a 2% deduction is made from the principal before refund. Between 3 and 5 years, the deduction reduces to 1% of the principal. After 5 years, the full principal is returned with no deduction.',
  },
  {
    q: 'Is Post Office MIS interest taxable?',
    a: 'Yes, the entire monthly interest is added to your total income and taxed at your applicable income tax slab rate. The post office does not deduct TDS on MIS interest, but this does not make it tax-free; you must declare it while filing your return.',
  },
  {
    q: 'Does Post Office MIS qualify for Section 80C deduction?',
    a: 'No. Unlike 5-year tax-saving bank FDs, NSC, or PPF, the amount invested in Post Office MIS does not qualify for a deduction under Section 80C. It is a pure income-generating scheme, not a tax-saving one.',
  },
  {
    q: 'What is the difference between Post Office MIS and a bank FD?',
    a: 'An FD compounds interest (usually quarterly) and pays it out at maturity or on a chosen payout frequency you select, while MIS pays a fixed sum every month by design and does not compound within the scheme. MIS has a fixed 5-year tenure and a Rs 9 lakh (single) investment cap; FDs have flexible tenures and generally no upper investment limit.',
  },
  {
    q: 'What is the difference between Post Office MIS and Senior Citizen Savings Scheme (SCSS)?',
    a: 'SCSS is restricted to individuals aged 60 and above (55+ for retirees under superannuation or VRS), pays a higher rate, and has an investment cap of Rs 30 lakh with quarterly payouts. MIS has no age restriction, pays monthly rather than quarterly, and caps the investment at Rs 9 lakh single or Rs 15 lakh joint.',
  },
  {
    q: 'Can I open a joint Post Office MIS account?',
    a: 'Yes, up to three adults can jointly hold an MIS account. The Rs 15 lakh joint limit applies to the account as a whole, and each joint holder\'s individual share is capped at Rs 9 lakh. Income is typically split equally among joint holders for tax purposes unless agreed otherwise.',
  },
  {
    q: 'How do I open a Post Office MIS account?',
    a: 'Visit any India Post branch with your identity proof, address proof, PAN card, and passport-size photographs, and fill in the MIS account opening form. You can also transfer funds from an existing post office savings account. A nomination facility is available and recommended at account opening.',
  },
  {
    q: 'Can NRIs invest in Post Office MIS?',
    a: 'No. NRIs are not eligible to open a new Post Office MIS account. If a resident Indian account holder later becomes an NRI, the existing account must be closed, since the scheme is restricted to resident Indian citizens.',
  },
  {
    q: 'What happens to Post Office MIS at maturity?',
    a: 'At the end of the 5-year term, the original principal is returned in full, either credited to a linked savings account or paid out directly. Many investors reinvest the matured principal into a fresh MIS account at whatever rate is current at that time, or move it to another scheme.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Post Office MIS Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/post-office-mis-calculator',
  description: 'Calculate Post Office Monthly Income Scheme payout at the current 7.4% rate over the fixed 5-year tenure, with an optional MIS plus RD reinvestment projection. Multi-currency support.',
  featureList: [
    'MIS Monthly Income Calculator',
    'Single vs Joint Account Limits',
    'MIS + RD Reinvestment Projection',
    'Year-by-Year Growth Table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Current rate: 7.4% (Apr-Jun 2026)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Post Office MIS Calculator', item: 'https://fermor.in/calculators/post-office-mis-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Post Office MIS Monthly Income',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Post Office MIS Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose account type', text: 'Select single (up to Rs 9 lakh) or joint (up to Rs 15 lakh) account.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your deposit amount', text: 'Input the lump sum you plan to invest, within the applicable limit.' },
    { '@type': 'HowToStep', position: 3, name: 'Check the interest rate', text: 'The rate defaults to the current 7.4% (Apr-Jun 2026); adjust it if a new quarterly rate has been notified.' },
    { '@type': 'HowToStep', position: 4, name: 'Toggle MIS + RD reinvestment (optional)', text: 'Turn this on to see the combined maturity value if the monthly payout is redirected into a Post Office RD instead of spent.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'MIS',
  alternateName: 'Post Office Monthly Income Scheme',
  description: 'A government-backed savings scheme offered through India Post that pays a fixed monthly income on a lump sum deposit over a 5-year term, with the principal returned in full at maturity.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/India_Post',
    'https://www.wikidata.org/wiki/Q1585975',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Post Office MIS Calculator: Monthly Income Scheme',
  description: 'Calculate Post Office Monthly Income Scheme payout at the current rate over the fixed 5-year tenure, with an optional MIS plus RD reinvestment projection.',
  url: 'https://fermor.in/calculators/post-office-mis-calculator',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'MIS', alternateName: 'Post Office Monthly Income Scheme' },
    { '@type': 'DefinedTerm', name: 'RD', alternateName: 'Recurring Deposit' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, retirees, senior citizens, conservative savers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-mis', name: 'What Is Post Office MIS' },
    { '@type': 'WebPageElement', cssSelector: '#mis-formula', name: 'MIS Monthly Income Formula' },
    { '@type': 'WebPageElement', cssSelector: '#mis-by-deposit', name: 'MIS Monthly Income by Deposit Amount' },
    { '@type': 'WebPageElement', cssSelector: '#mis-plus-rd', name: 'MIS Plus RD Reinvestment' },
    { '@type': 'WebPageElement', cssSelector: '#mis-vs-fd', name: 'MIS vs Bank FD' },
    { '@type': 'WebPageElement', cssSelector: '#mis-vs-scss', name: 'MIS vs SCSS' },
    { '@type': 'WebPageElement', cssSelector: '#premature-withdrawal', name: 'Premature Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#mis-taxation', name: 'MIS Taxation' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PostOfficeMISCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <PostOfficeMISClient />
    </>
  );
}

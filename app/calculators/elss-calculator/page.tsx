import type { Metadata } from 'next';
import ELSSClient from './ELSSClient';
import { headers } from 'next/headers';

const canonical = 'https://fermor.in/calculators/elss-calculator';
const PAGE_DATE_MODIFIED = '2026-09-18';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalUrl = `https://fermor.in/${region === 'in' ? 'calculators' : region}/elss-calculator`;

  return {
    title: 'ELSS Calculator: Estimate SIP & Tax Savings',
    description: 'Free ELSS calculator for India. Estimate SIP or lumpsum returns, Section 80C tax savings and 3-year lock-in value online.',
    keywords: [
      'elss calculator',
      'elss calculator india',
      'elss calculator online',
      'elss sip calculator',
      'elss sip returns calculator',
      'elss lumpsum calculator',
      'elss mutual fund calculator',
      'elss returns calculator',
      'elss investment calculator',
      'elss tax saving calculator',
      'elss tax savings calculator',
      'elss tax benefit calculator',
      'elss maturity calculator',
      'elss 3 year returns calculator',
      'elss lock in period calculator',
      'equity linked savings scheme calculator',
      'section 80c elss calculator',
      'elss vs ppf calculator',
      'elss calculator 2026',
      'tax saving mutual fund calculator',
      'best elss fund calculator',
      'elss investment returns calculator',
      'elss monthly sip calculator',
      'elss lump sum returns calculator',
      'elss vs ppf',
      'ELSS calculator live returns',
      'elss return calculator india',
      'elss fund returns calculator',
      'tax saver mutual fund calculator',
      'best elss calculator',
      'elss return calculator',
      'elss funds calculator',
      'elss tax calculator',
      'elss lump sum calculator',
      'elss mutual fund sip calculator',
      'elss mutual fund return calculator',
      'elss sip return calculator',
      'elss calculator with inflation',
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: 'ELSS Calculator: Estimate SIP & Tax Savings',
      description: 'Estimate ELSS returns, tax savings and maturity value with a free India-focused calculator.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-elss-calculator.png', width: 1200, height: 630, alt: 'Fermor ELSS Calculator' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ELSS Calculator: Estimate SIP & Tax Savings',
      description: 'Use the ELSS calculator to estimate returns, tax savings and lock-in value for Indian investors.',
      images: ['https://fermor.in/og-elss-calculator.png'],
    },
  };
}

const faqs = [
  {
    q: 'What is ELSS?',
    a: 'ELSS is an Equity Linked Savings Scheme, a mutual fund category that invests mainly in equities and gives a tax deduction under Section 80C of the Income Tax Act.',
  },
  {
    q: 'What is the ELSS lock-in period?',
    a: 'Each ELSS SIP instalment has a 3-year lock-in. This is the shortest lock-in among the common Section 80C tax-saving options.',
  },
  {
    q: 'How much tax can I save with ELSS?',
    a: 'The maximum deduction is Rs 1.5 lakh in a financial year under Section 80C. In the 30% tax bracket, that could save about Rs 46,800 when the 4% cess is included.',
  },
  {
    q: 'Can I invest more than Rs 1.5 lakh in ELSS?',
    a: 'Yes. There is no cap on investment amount, but only up to Rs 1.5 lakh of ELSS investment can reduce your taxable income in a year.',
  },
  {
    q: 'Which is better, ELSS SIP or lumpsum?',
    a: 'SIP is usually better for most investors because it reduces timing risk. Lumpsum helps when you already have a large amount ready to invest and are comfortable with market timing risk.',
  },
  {
    q: 'What return can I expect from ELSS?',
    a: 'ELSS returns vary because the funds invest in equities. Long-term returns can range from roughly 10% to 14% annually, but there is no guarantee and short-term performance can be volatile.',
  },
  {
    q: 'How is ELSS different from PPF?',
    a: 'ELSS offers higher growth potential but has market risk and a 3-year lock-in. PPF is safer, has a 15-year lock-in, and pays a fixed government-set rate.',
  },
  {
    q: 'What happens after 3 years in ELSS?',
    a: 'The units become redeemable after the 3-year lock-in ends. You can withdraw, switch, or stay invested. Long-term capital gains above Rs 1.25 lakh in a year are taxed at 12.5% for equity holdings.',
  },
  {
    q: 'Is ELSS taxable on maturity?',
    a: 'ELSS is not tax-free on maturity like PPF. Since every ELSS unit is automatically long-term by the time its 3-year lock-in ends, gains are taxed as long-term capital gains: 12.5% on total equity LTCG above Rs 1.25 lakh in a financial year, combined across all your equity shares and equity mutual funds. Gains up to that combined threshold are tax-free.',
  },
  {
    q: 'Is ELSS suitable for first-time investors?',
    a: 'It can be suitable if the investment horizon is at least 5 years and the investor can handle market volatility. It is not a good fit for very short-term goals or ultra-conservative portfolios.',
  },
  {
    q: 'Can NRIs invest in ELSS?',
    a: 'Yes, NRIs can invest in ELSS through eligible bank accounts and investment routes, subject to the same consolidation and compliance rules that apply to foreign investors.',
  },
  {
    q: 'Does ELSS have a fixed interest rate?',
    a: 'No. ELSS is an equity mutual fund, not a fixed-interest instrument like a bank FD or PPF. Its returns come from the market value of the stocks the fund holds, so they move up or down with the equity market and are never a guaranteed or pre-set rate.',
  },
  {
    q: 'Does this calculator account for inflation?',
    a: 'Yes. Open More Settings and set an expected inflation rate to see the inflation-adjusted corpus alongside the nominal projected corpus. This shows the real purchasing power of your ELSS maturity value, since a large nominal number can still buy less in the future if inflation runs high over the investment period.',
  },
  {
    q: 'How does this calculator estimate ELSS tax savings?',
    a: 'It assumes the eligible ELSS investment is within the Rs 1.5 lakh Section 80C limit and applies the selected income tax slab rate plus 4% cess to estimate the tax saved in year one.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is building the automated financial action layer for India. The calculators are free tools that help people understand the math before they move into product decisions, savings, or tax planning.',
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
  name: 'ELSS Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: canonical,
  description: 'Estimate ELSS SIP or lumpsum returns, Section 80C tax savings, and projected maturity value for Indian investors.',
  featureList: [
    'ELSS SIP calculator',
    'ELSS lumpsum calculator',
    'Section 80C tax savings estimate',
    '3-year lock-in tracker',
    'Year-by-year return projection',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Fermor',
    url: 'https://fermor.in',
  },
  datePublished: '2026-09-17',
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'ELSS Calculator', item: 'https://fermor.in/calculators/elss-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to use the ELSS calculator',
  description: 'Step-by-step guide to estimating ELSS SIP returns and tax savings under Section 80C.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor ELSS Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Pick SIP or lumpsum',
      text: 'Choose whether you want to invest monthly through SIP or as a one-time lumpsum amount.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter investment details',
      text: 'Add the monthly investment, total investable amount, expected return rate, and investment tenure.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add tax details',
      text: 'Enter your tax slab and any other Section 80C investments already committed elsewhere.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the output',
      text: 'Check the projected corpus, tax saved, and year-by-year ELSS growth estimate before investing.',
    },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'ELSS Calculator: SIP Returns and Tax Savings',
  description: 'Free ELSS calculator for India. Estimate SIP returns, lumpsum value, Section 80C tax savings and 3-year lock-in outcomes.',
  url: canonical,
  datePublished: '2026-09-17',
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
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, equity investors, salaried professionals',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-elss', name: 'What Is ELSS' },
    { '@type': 'WebPageElement', cssSelector: '#best-tax-saving-options-80c', name: 'Best Tax Saving Options Under 80C' },
    { '@type': 'WebPageElement', cssSelector: '#tax-saving-worked-example', name: 'How Much Tax Does ELSS Save' },
    { '@type': 'WebPageElement', cssSelector: '#elss-lock-in-example', name: 'How the 3-Year Lock-in Works' },
    { '@type': 'WebPageElement', cssSelector: '#advantages-and-risks', name: 'Advantages and Risks of ELSS Funds' },
    { '@type': 'WebPageElement', cssSelector: '#elss-vs-ppf', name: 'ELSS vs PPF' },
    { '@type': 'WebPageElement', cssSelector: '#elss-taxation', name: 'ELSS Taxation' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The goal is to close the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'ELSS Mutual Funds',
    'Section 80C Tax Saving',
    'Tax Planning India',
    'Mutual Fund Investments',
    'Equity Linked Savings Scheme',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'ELSS',
  alternateName: 'Equity Linked Savings Scheme',
  description: 'A type of mutual fund in India that invests primarily in equity and offers tax deduction under Section 80C of the Income Tax Act.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Equity_Linked_Savings_Scheme',
    'https://www.wikidata.org/wiki/Q16897873',
  ],
};

export default async function ELSSPage() {
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
      <ELSSClient region={region} faqs={faqs} />
    </>
  );
}

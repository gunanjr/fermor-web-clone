import type { Metadata } from 'next';
import PortfolioReturnClient from './PortfolioReturnClient';
import { PORTFOLIO_RETURN_FAQS } from './faqData';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/portfolio-return-calculator`;
  return {
    title: 'Portfolio Return Calculator: Weighted Return',
    description:
      'Portfolio return calculator for India: calculate weighted return across stocks, mutual funds, FDs, EPF and gold. See allocation and contribution. Free to use.',
    keywords: [
      'portfolio return calculator',
      'stock portfolio return calculator',
      'portfolio xirr calculator',
      'portfolio roi calculator',
      'portfolio performance calculator',
      'portfolio calculator',
      'portfolio cagr calculator',
      'investment return calculator',
      'investment portfolio calculator',
      'weighted portfolio return calculator',
      'investment portfolio return calculator',
      'portfolio rate of return calculator',
      'blended portfolio return calculator',
      'overall portfolio return calculator',
      'multi asset portfolio return calculator',
      'average portfolio return calculator',
      'portfolio performance calculator',
      'investment return calculator India',
      'portfolio return formula',
      'weighted average return calculator',
      'mutual fund portfolio return calculator',
      'stock portfolio return calculator',
      'fd ppf epf portfolio calculator',
      'portfolio weighted return',
      'asset allocation return calculator',
      'portfolio contribution calculator',
      'return on investment portfolio',
      'blended rate of return',
      'calculate portfolio return with multiple investments',
      'portfolio return percentage calculator',
      'portfolio return calculator India',
      'portfolio return calculator for NRI',
      'portfolio return calculator in Excel',
      'expected portfolio return calculator',
      'real return after inflation calculator',
      'post-tax portfolio return calculator',
      'asset allocation return calculator India',
      'portfolio return vs XIRR',
      'portfolio return vs CAGR',
      'weighted average investment return',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Portfolio Return Calculator: Weighted Return',
      description:
        'Calculate a blended return across your investments. Compare asset weights, return assumptions and each holding’s contribution.',
      images: ['https://fermor.in/og-portfolio-return-calculator.png'],
    },
    openGraph: {
      title: 'Portfolio Return Calculator: Weighted Portfolio Return',
      description:
        'Calculate the weighted return of a multi-asset portfolio. Review allocation, individual return assumptions and each holding’s contribution.',
      type: 'website',
      url: 'https://fermor.in/calculators/portfolio-return-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-portfolio-return-calculator.png', width: 1200, height: 630, alt: 'Fermor Portfolio Return Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-29';
const PAGE_DATE_PUBLISHED = '2026-07-01';

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
  description: 'Fermor is building the financial action layer for India, connecting financial tools, eligibility and products.',
  knowsAbout: [
    'Portfolio Return',
    'Portfolio Management',
    'Asset Allocation',
    'Mutual Funds India',
    'Stock Investing India',
    'Fixed Deposits India',
    'Public Provident Fund',
    'Employee Provident Fund',
    'Weighted Average Return',
    'Personal Finance India',
    'NPS',
    'Gold Investment India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PORTFOLIO_RETURN_FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Portfolio Return Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/portfolio-return-calculator',
  description: 'Calculate the weighted average return of your investment portfolio. Add up to 8 investments : FD, mutual funds, stocks, EPF, PPF, real estate, gold, NPS : with amounts and return rates. View per-investment breakdown, allocation snapshot, and contribution analysis.',
  featureList: [
    'Add up to 8 investments with custom names',
    'Weighted average portfolio return calculation',
    'Per-investment contribution percentage',
    'Portfolio allocation donut chart',
    'Breakdown table with amounts, returns, and weight',
    'Preset investment types (FD, Mutual Funds, Stocks, EPF, PPF, etc.)',
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
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Portfolio Return Calculator', item: 'https://fermor.in/calculators/portfolio-return-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Weighted Portfolio Return',
  description: 'Step-by-step guide to calculate the weighted average return of your investment portfolio using the Fermor Portfolio Return Calculator.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Portfolio Return Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Add your investments',
      text: 'Click "Add investment" or use the preset buttons for common asset types (FD, Mutual Funds, Stocks, EPF, PPF, Real Estate, Gold, NPS). Up to 8 investments can be added.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter the invested amount',
      text: 'For each investment, enter the current market value or the amount you have invested. Use the slider or click the value to type a precise number.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter the annual return rate',
      text: 'Enter the annual return percentage for each investment. Use trailing returns for actual analysis or expected returns for forward-looking planning.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the results',
      text: 'The calculator displays your total invested amount, weighted average portfolio return percentage, and a detailed per-investment breakdown table.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Analyse the allocation',
      text: 'View the donut chart to see how your portfolio is allocated. The breakdown table shows each investment contribution and its percentage of the total portfolio.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Portfolio Return',
  alternateName: 'Weighted Average Portfolio Return',
  description: 'The weighted average rate of return earned on a collection of investments. It is calculated by summing the product of each investment weight (proportion of total portfolio) and its respective rate of return.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Rate_of_return#Portfolio_return',
    'https://www.wikidata.org/wiki/Q7317751',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Portfolio Return Calculator: Weighted Portfolio Return',
  description: 'Calculate weighted portfolio return across stocks, mutual funds, fixed deposits, EPF, PPF, gold and other investments. Review return assumptions, allocation, contribution, inflation and method limitations.',
  url: 'https://fermor.in/calculators/portfolio-return-calculator',
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
    { '@type': 'DefinedTerm', name: 'Portfolio Return', alternateName: 'Weighted Average Portfolio Return' },
    { '@type': 'DefinedTerm', name: 'Asset Allocation' },
    { '@type': 'DefinedTerm', name: 'Investment Portfolio' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, stock investors, NRIs, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#quick-answer',                 name: 'Portfolio Return Quick Answer' },
    { '@type': 'WebPageElement', cssSelector: '#what-is-portfolio-return',        name: 'What Is Portfolio Return' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-calculate',                name: 'How to Calculate Weighted Average Portfolio Return' },
    { '@type': 'WebPageElement', cssSelector: '#why-portfolio-return-matters',    name: 'Why Portfolio Return Matters' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',                      name: 'How to Use This Portfolio Return Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#portfolio-formula',              name: 'Portfolio Return Formula and Variables' },
    { '@type': 'WebPageElement', cssSelector: '#worked-examples',                name: 'Worked Portfolio Return Examples' },
    { '@type': 'WebPageElement', cssSelector: '#allocation-sensitivity',         name: 'Allocation and Blended Return' },
    { '@type': 'WebPageElement', cssSelector: '#real-and-tax-return',            name: 'Real and Post-Tax Return' },
    { '@type': 'WebPageElement', cssSelector: '#return-methods',                 name: 'Portfolio Return vs CAGR and XIRR' },
    { '@type': 'WebPageElement', cssSelector: '#weighted-return-limitations',    name: 'Limitations of Weighted Portfolio Return' },
    { '@type': 'WebPageElement', cssSelector: '#rebalancing',                    name: 'Portfolio Rebalancing' },
    { '@type': 'WebPageElement', cssSelector: '#benchmarks',                     name: 'Portfolio Benchmarks' },
    { '@type': 'WebPageElement', cssSelector: '#related-calculators',            name: 'Related Investment Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                             name: 'Frequently Asked Questions' },
  ],
};

export default async function PortfolioReturnCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <PortfolioReturnClient />
    </>
  );
}

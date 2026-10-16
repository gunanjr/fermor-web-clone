import type { Metadata } from 'next';
import StockReturnCalculatorClient from './StockReturnCalculatorClient';
import { STOCK_RETURN_FAQS } from './stockReturnFaq';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-09-29';

export const metadata: Metadata = {
  title: 'Stock Return Calculator India: Total Return, CAGR & Dividends',
  description: 'Free stock return calculator for India. Calculate NSE/BSE total return with dividends, stock CAGR and gains. Compare price return with dividend-adjusted return.',
  keywords: [
    'stock return calculator',
    'returns calculator',
    'stock investment return calculator',
    'stock profit calculator',
    'share return calculator',
    'share profit calculator',
    'investment return calculator',
    'roi calculator investment',
    'stock return calculator india',
    'stock investment calculator',
    'stock market return calculator',
    'stock market profit calculator',
    'share market return calculator',
    'stock returns',
    'stock market returns',
    'annualized return calculator',
    'stock cagr calculator',
    'cagr return calculator',
    'stock profit calculator india',
    'stock gains calculator',
    'share investment calculator',
    'share market returns calculator',
    'equity investment calculator',
    'roi calculator stocks',
    'investment profit calculator',
    'investment gain calculator',
    'historical stock return calculator',
    'historical returns calculator',
    'historical stock returns',
    'stock performance calculator',
    'stock profit calculator with dividends',
    'stock return calculator with dividends',
    'dividend return calculator',
    'total stock return calculator',
    'buy and hold return calculator',
    'stock total return calculator',
    'stock annualized return calculator',
    'stock return calculator india',
    'calculate stock return',
    'stock return formula',
    'total return calculator stocks',
    'stock total return formula',
    'dividend adjusted return calculator',
    'stock return rate calculator',
    'equity return calculator',
    'stock cagr calculator',
    'holding period return calculator',
    'stock annual return calculator',
    'yearly stock return calculator',
    'average stock return calculator',
    'common stock return calculator',
    'stock total return',
    'stock rate of return calculator',
    'total shareholder return calculator',
    'total equity return calculator',
    'total return on stock calculator',
    'annualized total return calculator stocks',
    'stock market return calculator',
    'calculate total return on stock with dividends',
    'stock price return calculator',
    'stock return percentage calculator',
    'nse stock return calculator',
    'bse stock return calculator',
    'indian stock return calculator',
  ],
  openGraph: {
    title: 'Stock Return Calculator: Total Return & CAGR - Fermor',
    description: 'Calculate NSE/BSE stock returns including dividends, CAGR and holding-period return. Compare price appreciation with total return.',
    type: 'website',
    url: 'https://fermor.in/calculators/stock-return-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-stock-return-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stock Return Calculator - Fermor',
    description: 'Calculate total stock return including dividends, annualized CAGR, and holding period return. Free for Indian stock investors.',
    images: ['https://fermor.in/og-stock-return-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/stock-return-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Stock Return', 'Total Return', 'Dividend Adjusted Return', 'CAGR', 'Holding Period Return', 'Stock Market India', 'NSE', 'BSE', 'SEBI', 'Equity Investing', 'Dividend Investing', 'Price Return', 'Annualized Return'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Stock Return Calculator', item: 'https://fermor.in/calculators/stock-return-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: STOCK_RETURN_FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Stock Return Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/stock-return-calculator',
  description: 'Calculate stock total return including dividends, annualized return (CAGR), dividend-adjusted return, and holding period return. Supports dividend-adjusted total return calculation with a donut chart showing price vs dividend contribution.',
  featureList: ['Total Return calculation including dividends', 'Annualized Return (CAGR) calculator', 'Dividend-adjusted return calculation', 'Price Return vs Dividend Return donut chart', 'Holding period return display', 'Multi-currency support', 'localStorage persistence', 'Share count and holding period inputs'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Stock Return', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Stock Return Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the initial purchase price', text: 'Enter the price per share at which you bought the stock. This is the starting value for the return calculation.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the current or selling price', text: 'Enter the current market price or the price at which you sold the stock. This is the ending value used to calculate price appreciation.' },
    { '@type': 'HowToStep', position: 3, name: 'Add total dividends received per share', text: 'Enter the total dividends per share received during the holding period. This ensures the calculation captures the full total return, not just price appreciation.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter the holding period and review results', text: 'Enter the number of years you held the stock. The calculator shows total return %, annualized CAGR, the donut chart split between price and dividend return, and all supporting metrics.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Total Shareholder Return', alternateName: 'TSR',
  description: 'The total return earned by a shareholder from both stock price appreciation and dividend income, expressed as a percentage over a specified holding period.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Stock Market Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Total_shareholder_return'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Stock Return Calculator India: Total Return, CAGR and Dividends',
  url: 'https://fermor.in/calculators/stock-return-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Total Shareholder Return', alternateName: 'TSR' }],
  audience: { '@type': 'Audience', audienceType: 'Indian stock investors, equity traders, dividend investors, long-term shareholders', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-stock-return', name: 'What Is Stock Return' },
    { '@type': 'WebPageElement', cssSelector: '#stock-return-step-by-step', name: 'How to Calculate Stock Return Step by Step' },
    { '@type': 'WebPageElement', cssSelector: '#good-stock-return-india', name: 'What Is a Good Stock Return in India' },
    { '@type': 'WebPageElement', cssSelector: '#stock-return-after-tax', name: 'Stock Return After Tax in India' },
    { '@type': 'WebPageElement', cssSelector: '#corporate-actions-and-return', name: 'How Corporate Actions Affect Stock Return' },
    { '@type': 'WebPageElement', cssSelector: '#total-return-vs-xirr', name: 'Total Return vs XIRR' },
    { '@type': 'WebPageElement', cssSelector: '#common-stock-return-mistakes', name: 'Common Stock Return Calculation Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#stock-return-vs-investments', name: 'Stock Return vs Other Investments' },
    { '@type': 'WebPageElement', cssSelector: '#who-should-use-stock-return-calculator', name: 'Who Should Use This Stock Return Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#related-stock-calculators', name: 'Related Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#stock-return-formula', name: 'Stock Return Formula' },
    { '@type': 'WebPageElement', cssSelector: '#price-return-vs-total-return', name: 'Stock Return vs Total Return vs Price Return' },
    { '@type': 'WebPageElement', cssSelector: '#total-return-formula', name: 'Total Return Formula' },
    { '@type': 'WebPageElement', cssSelector: '#annualized-return-cagr', name: 'Annualized Return (CAGR) for Stocks' },
    { '@type': 'WebPageElement', cssSelector: '#stock-return-calculator-indian', name: 'Stock Return Calculator for Indian Stocks' },
    { '@type': 'WebPageElement', cssSelector: '#dividend-adjusted-return-calculation', name: 'Dividend-Adjusted Return Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#holding-period-return', name: 'Holding Period Return' },
    { '@type': 'WebPageElement', cssSelector: '#arithmetic-vs-geometric', name: 'Arithmetic vs Geometric Average Return' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function StockReturnCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <StockReturnCalculatorClient />
    </>
  );
}

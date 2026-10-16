import type { Metadata } from 'next';
import AssetAllocationClient from './AssetAllocationClient';
import { assetAllocationFaqItems } from './assetAllocationFaq';

export const metadata: Metadata = {
  title: 'Asset Allocation Calculator: India Portfolio Planner',
  description: 'Free asset allocation calculator for India. Compare age and risk-based equity, debt, gold and cash splits. Track rebalancing and drift. Free to use.',
  keywords: [
    'asset allocation calculator',
    'asset allocation calculator india',
    'portfolio allocation calculator',
    'portfolio asset allocation calculator',
    'portfolio diversification calculator',
    'asset allocation calculator by age',
    'asset allocation by age calculator',
    'asset allocation based on age',
    'asset allocation by risk profile',
    'risk based asset allocation calculator',
    'portfolio rebalancing calculator',
    'investment allocation calculator',
    'investment portfolio allocation calculator',
    'investment portfolio calculator',
    'asset allocation tool',
    'portfolio allocation tool',
    'asset allocation planner',
    'equity debt allocation calculator',
    'equity allocation calculator',
    'stock bond allocation calculator',
    'portfolio sector allocation calculator',
    'stock allocation calculator',
    'mutual fund allocation calculator',
    'mutual fund asset allocation calculator',
    'portfolio mix calculator',
    'asset allocation return calculator',
    'optimal asset allocation calculator',
    'percentage allocation calculator',
    'retirement asset allocation calculator',
    'mutual fund asset allocation calculator',
    'best asset allocation calculator',
    'fund allocation calculator',
    'portfolio allocation by age india',
    '110 minus age rule',
    'asset allocation india',
    'equity debt gold allocation',
    'how to allocate portfolio india',
    'portfolio rebalancing india',
    'asset allocation nri',
    'how to diversify portfolio india',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/asset-allocation-calculator',
  },
  openGraph: {
    title: 'Asset Allocation Calculator: India Portfolio Planner - Fermor',
    description: 'Compare an age-based allocation with your current portfolio, then review the indicative return and rebalancing plan.',
    type: 'website',
    url: 'https://fermor.in/calculators/asset-allocation-calculator',
    images: [{ url: 'https://fermor.in/og-asset-allocation-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asset Allocation Calculator - Fermor',
    description: 'Compare age-based equity, debt, gold and cash allocations. Review portfolio drift and an indicative rebalancing plan.',
    images: ['https://fermor.in/og-asset-allocation-calculator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: assetAllocationFaqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Asset Allocation Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/asset-allocation-calculator',
  description: 'Compare age- and risk-based asset allocation with current holdings and review an illustrative rebalancing plan.',
  featureList: [
    'Age-based equity allocation using the 110 minus age rule',
    'Conservative, Moderate and Aggressive risk profiles',
    'Current and recommended allocation comparison',
    'Year-by-year illustrative allocation impact table',
    'Weighted expected return and rebalancing action plan',
    'Multi-currency support (INR, USD, EUR, GBP)',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-07-02',
  dateModified: '2026-09-29',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Asset Allocation Calculator',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Asset Allocation Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter age and risk profile', text: 'Choose an age and a risk profile to calculate an indicative equity allocation.' },
    { '@type': 'HowToStep', position: 2, name: 'Set portfolio size', text: 'Enter the portfolio value used to convert the target percentages into amounts.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter current holdings', text: 'Add current values for equity, debt, gold, international equity, real estate and cash.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the comparison', text: 'Compare current and recommended allocations, indicative returns and rebalancing actions.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Asset Allocation Calculator', item: 'https://fermor.in/calculators/asset-allocation-calculator' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions.',
  knowsAbout: [
    'Asset Allocation',
    'Portfolio Diversification',
    'Portfolio Rebalancing',
    'Equity Mutual Funds India',
    'Debt Funds India',
    'Sovereign Gold Bonds',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Asset Allocation Calculator: India Portfolio Planner - Fermor',
  url: 'https://fermor.in/calculators/asset-allocation-calculator',
  datePublished: '2026-07-02',
  dateModified: '2026-09-29',
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
    {
      '@type': 'DefinedTerm',
      name: 'Asset Allocation',
      alternateName: 'Portfolio Asset Allocation',
      description: 'Asset allocation is the strategy of dividing an investment portfolio among different asset categories such as equity, debt, gold, and cash to balance risk and return according to an investor\'s time horizon and risk tolerance.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Investment and Finance Terms', url: 'https://fermor.in/calculators' },
      sameAs: [
        'https://en.wikipedia.org/wiki/Asset_allocation',
        'https://www.wikidata.org/wiki/Q751576',
      ],
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, NRI investors, mutual fund investors planning portfolio diversification and rebalancing',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-asset-allocation', name: 'What is Asset Allocation' },
    { '@type': 'WebPageElement', cssSelector: '#110-minus-age-rule', name: '110 Minus Age Rule Explained' },
    { '@type': 'WebPageElement', cssSelector: '#asset-classes-india', name: 'Six Major Asset Classes in India' },
    { '@type': 'WebPageElement', cssSelector: '#risk-profiles', name: 'Conservative Moderate Aggressive Profiles' },
    { '@type': 'WebPageElement', cssSelector: '#asset-allocation-formula', name: 'Asset Allocation Formula' },
    { '@type': 'WebPageElement', cssSelector: '#asset-allocation-by-age-india', name: 'Asset Allocation by Age in India' },
    { '@type': 'WebPageElement', cssSelector: '#asset-allocation-goal-horizon', name: 'Asset Allocation by Goal Horizon' },
    { '@type': 'WebPageElement', cssSelector: '#best-investment-instruments', name: 'Investment Instruments by Asset Class' },
    { '@type': 'WebPageElement', cssSelector: '#tax-treatment-rebalancing', name: 'Tax Treatment of Portfolio Rebalancing' },
    { '@type': 'WebPageElement', cssSelector: '#rebalancing-example', name: 'Rebalancing Example with Numbers' },
    { '@type': 'WebPageElement', cssSelector: '#allocation-diversification-location', name: 'Asset Allocation vs Diversification vs Asset Location' },
    { '@type': 'WebPageElement', cssSelector: '#asset-allocation-strategies', name: 'Asset Allocation Strategies Compared' },
    { '@type': 'WebPageElement', cssSelector: '#life-events-review', name: 'Life Events That Trigger an Allocation Review' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-rebalance', name: 'How to Rebalance a Portfolio' },
    { '@type': 'WebPageElement', cssSelector: '#diversification-benefits', name: 'Why Diversification Reduces Risk' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Asset Allocation Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#model-portfolios-by-age', name: 'Model Portfolios by Age' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
    { '@type': 'WebPageElement', cssSelector: '#related-calculators', name: 'Related Calculators' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Asset Allocation',
  alternateName: 'Portfolio Asset Allocation',
  description: 'Asset allocation is the investment strategy of dividing a portfolio among different asset categories such as equity, debt, gold, real estate, and cash, with the goal of optimizing risk-adjusted returns based on an investor\'s goals, time horizon, and risk tolerance.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Asset_allocation',
    'https://www.wikidata.org/wiki/Q751576',
  ],
};

export default function AssetAllocationCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <AssetAllocationClient />
    </>
  );
}

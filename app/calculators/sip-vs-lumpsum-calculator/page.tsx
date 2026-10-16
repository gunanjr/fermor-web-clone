import type { Metadata } from 'next';
import SIPVsLumpsumClient from './SIPVsLumpsumClient';

const PAGE_DATE_PUBLISHED = '2026-08-18';
const PAGE_DATE_MODIFIED = '2026-08-18';

export const metadata: Metadata = {
  title: 'SIP vs Lumpsum Calculator: Compare Returns Side by Side',
  description:
    'Free SIP vs Lumpsum calculator for India. Compare monthly SIP growth versus one-time lumpsum returns, wealth gain, and XIRR. Free to use.',
  keywords: [
    'sip vs lumpsum calculator',
    'sip vs lumpsum return comparison',
    'mutual fund sip vs lumpsum calculator',
    'lumpsum vs sip calculator india',
    'is sip better than lumpsum',
    'sip or lumpsum which is better',
    'sip vs lumpsum growth chart',
    'sip vs lumpsum excel formula',
    'equity mutual fund sip vs lumpsum',
    'nifty 50 sip vs lumpsum return',
    'rupee cost averaging vs lumpsum',
    'sip vs lumpsum market crash comparison',
    'xirr vs cagr sip lumpsum',
    'sip calculator',
    'lumpsum calculator',
    'mutual fund return comparison calculator',
    'sip vs lumpsum tax treatment stcg ltcg',
    'sip vs lumpsum returns over 10 years',
    'sip vs lumpsum returns over 5 years',
    'sip vs lumpsum returns in bull market',
    'sip vs lumpsum returns in bear market',
    'mutual fund calculator india',
    'sip lumpsum wealth comparison',
    'systematic investment plan vs one time investment',
    'sip vs lumpsum calculator groww zerodha etmoney',
    'best investment method mutual funds india',
  ],
  openGraph: {
    title: 'SIP vs Lumpsum Calculator: Compare Returns Side by Side - Fermor',
    description:
      'Compare SIP vs Lumpsum returns, wealth accumulation, and XIRR CAGR for equity mutual funds in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/sip-vs-lumpsum-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-sip-vs-lumpsum-calculator.png', width: 1200, height: 630, alt: 'Fermor SIP vs Lumpsum Calculator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIP vs Lumpsum Calculator - Fermor',
    description:
      'Compare monthly SIP accumulation versus one-time lumpsum investment returns in India. Free to use.',
    images: ['https://fermor.in/og-sip-vs-lumpsum-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/sip-vs-lumpsum-calculator',
  },
};

/* ─── Schemas ─────────────────────────────────────────────────── */

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
    'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'SIP vs Lumpsum',
    'Systematic Investment Plan',
    'Lumpsum Mutual Fund Investment',
    'Rupee Cost Averaging',
    'XIRR Return Calculation',
    'CAGR Return Calculation',
    'Equity Mutual Funds India',
    'Account Aggregator Framework',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'SIP vs Lumpsum Calculator', item: 'https://fermor.in/calculators/sip-vs-lumpsum-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is SIP better than Lumpsum investment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Neither is universally better; it depends on market conditions and capital availability. Lumpsum investments generate higher total returns in rising bull markets because 100% of capital compounds immediately. SIP is superior during volatile or falling markets due to rupee cost averaging, which buys more units when prices fall and lowers risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the main difference between SIP and Lumpsum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In a Lumpsum investment, you deposit a single one-time capital amount upfront. In a SIP (Systematic Investment Plan), you invest a fixed amount regularly at monthly or quarterly intervals. Lumpsum returns are measured using CAGR, while SIP returns are measured using XIRR to account for multiple cash flows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which generates higher returns over 10 years, SIP or Lumpsum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Assuming a constant annual compound growth rate of 12% p.a. over 10 years, a one-time Lumpsum of Rs 12 Lakh grows to Rs 37.27 Lakh (a gain of Rs 25.27 Lakh). A monthly SIP of Rs 10,000 (totaling Rs 12 Lakh invested over 10 years) grows to Rs 23.23 Lakh (a gain of Rs 11.23 Lakh). Lumpsum yields higher absolute wealth because all capital earns compound interest from day one.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I invest a large bonus as Lumpsum or via STP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When receiving a large lump sum (such as an annual bonus or property sale proceeds), financial advisors recommend investing the amount in a liquid or overnight mutual fund and setting up a Systematic Transfer Plan (STP) to transfer fixed monthly amounts into equity funds over 6 to 12 months. This mitigates market timing risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does rupee cost averaging work in a SIP?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rupee cost averaging means you buy more mutual fund units when Net Asset Value (NAV) falls during market dips and fewer units when NAV rises during market highs. Over time, this lowers your average cost per unit without needing to time the market.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is SIP return calculated compared to Lumpsum return?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lumpsum return is calculated using the CAGR formula: (Final / Initial)^(1/Years) - 1. SIP return is calculated using XIRR (Extended Internal Rate of Return), which solves for the discount rate that makes the net present value of all monthly cash outflows equal to the final corpus value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are tax rules different for SIP vs Lumpsum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. For equity mutual funds in India, Long-Term Capital Gains (LTCG) tax of 12.5% applies to gains above Rs 1.25 Lakh per fiscal year. In a Lumpsum investment, the 1-year holding period for LTCG is counted from the single purchase date. In a SIP, each monthly installment is treated as an independent investment with its own 1-year holding period.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I do both SIP and Lumpsum in the same mutual fund folio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Investors can maintain an active monthly SIP in a mutual fund scheme and simultaneously make lump-sum top-up investments into the same scheme whenever market corrections occur.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to SIP vs Lumpsum during a market crash?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If a market crash occurs right after investing, a Lumpsum investment suffers an immediate paper loss on the full principal. A SIP continues investing at lower NAV levels during the crash, lowering the overall break-even price and generating faster recovery when markets bounce back.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum amount for SIP and Lumpsum in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Indian mutual fund houses allow monthly SIPs starting at Rs 100 or Rs 500 per month. Minimum initial Lumpsum investment limits typically range from Rs 1,000 to Rs 5,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which mutual fund category is best for SIP vs Lumpsum?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SIP is highly recommended for volatile high-beta categories like small-cap funds, mid-cap funds, and sectoral equity funds. Lumpsum is suitable for large-cap index funds, hybrid funds, and debt funds during high interest rate cycles.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform for India. All calculators are free to use, and a free account is available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SIP vs Lumpsum Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/sip-vs-lumpsum-calculator',
  description:
    'Compare SIP and lumpsum mutual fund investment returns side by side. Calculate final corpus, total wealth gain, XIRR vs CAGR, and year-by-year growth table.',
  featureList: [
    'Side-by-side SIP vs Lumpsum Return Comparison',
    'Equal Total Capital Outlay Mode',
    'Monthly SIP vs One-Time Lumpsum Equivalent Mode',
    'Donut Chart Corpus Breakdown Visualizer',
    'Year-by-Year Growth Comparison Schedule Table',
    'Multi-currency Support (INR, USD, EUR, GBP)',
    'Year Presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y)',
    'localStorage Persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare SIP vs Lumpsum Returns',
  description: 'Step-by-step guide to compare monthly SIP accumulation versus one-time lumpsum mutual fund growth.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor SIP vs Lumpsum Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select Comparison Mode',
      text: 'Choose whether to compare equal total capital outlay or evaluate monthly SIP against a single lumpsum deposit.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Investment Amounts',
      text: 'Input your monthly SIP installment amount or one-time lumpsum investment amount.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Input Expected Rate of Return and Tenure',
      text: 'Set expected annual CAGR percentage (e.g. 12% p.a.) and tenure in years (e.g. 10 years).',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Compare Corpus, Wealth Gain, and Schedule',
      text: 'Analyze side-by-side final corpus values, total wealth gain differences, donut chart split, and year-wise growth breakdown.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Rupee Cost Averaging',
  alternateName: 'SIP Averaging Benefit',
  description:
    'An investment strategy where a fixed rupee amount is invested at regular intervals regardless of market fluctuations, purchasing more units when prices are low and fewer units when prices are high.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Mutual Fund Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Dollar_cost_averaging',
    'https://www.wikidata.org/wiki/Q1235706',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SIP vs Lumpsum Calculator: Compare Returns Side by Side',
  description:
    'Free SIP vs Lumpsum calculator for India. Compare monthly SIP growth versus one-time lumpsum returns, wealth gain, and XIRR. Free to use.',
  url: 'https://fermor.in/calculators/sip-vs-lumpsum-calculator',
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
    { '@type': 'DefinedTerm', name: 'SIP', alternateName: 'Systematic Investment Plan' },
    { '@type': 'DefinedTerm', name: 'Lumpsum' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-sip-vs-lumpsum', name: 'What Is SIP vs Lumpsum' },
    { '@type': 'WebPageElement', cssSelector: '#formulas-compared', name: 'SIP and Lumpsum Formulas Compared' },
    { '@type': 'WebPageElement', cssSelector: '#comparison-table', name: 'SIP vs Lumpsum Return Breakdown Table' },
    { '@type': 'WebPageElement', cssSelector: '#market-cycles', name: 'SIP vs Lumpsum in Bull and Bear Markets' },
    { '@type': 'WebPageElement', cssSelector: '#tax-rules', name: 'Tax Treatment Differences Section 112A' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function SIPVsLumpsumPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <SIPVsLumpsumClient />
    </>
  );
}

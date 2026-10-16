import type { Metadata } from 'next';
import STCGCalculatorClient from './STCGCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/stcg-calculator`;
  return {
    title: 'STCG Calculator: Short-Term Capital Gains Tax Calculator',
    description:
      'Free STCG calculator for India. Estimate short-term capital gains tax on stocks, mutual funds, gold, and property under Finance Act 2024. Free to use.',
    keywords: [
      'stcg calculator',
      'short term capital gains calculator',
      'stcg tax calculator',
      'equity stcg tax rate 20 percent',
      'calculate short term capital gains tax',
      'stcg calculator online',
      'stcg holding period limit calculator',
      'short term capital gains on property',
      'debt mutual fund stcg calculator',
      'gold stcg tax calculator',
      'stcg tax calculation formula',
      'carry forward short term capital loss',
      'stcg tax rate section 111a',
      'stcg offset rules',
      'capital gains tax calculator india',
      'stcg tax slabs property sale',
      'nri stcg calculator',
      'short term capital loss set off rules',
      'finance act 2024 capital gains changes',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'STCG Calculator: Short-Term Capital Gains Tax Calculator',
      description:
        'Calculate STCG tax on shares, mutual funds, property, and gold with the latest Budget 2024 rates (20% on equity). Free to use.',
      images: ['https://fermor.in/og-stcg-calculator.png'],
    },
    openGraph: {
      title: 'STCG Calculator: Short-Term Capital Gains Tax Calculator',
      description:
        'Free STCG calculator for India. Estimate short-term capital gains tax on stocks, mutual funds, gold, and property under Finance Act 2024. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/stcg-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-stcg-calculator.png', width: 1200, height: 630, alt: 'Fermor STCG Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-08';
const PAGE_DATE_PUBLISHED = '2026-07-08';

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
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what to do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions.',
  knowsAbout: [
    'Short-Term Capital Gains',
    'STCG Tax Rates',
    'Finance Act 2024 Revisions',
    'Capital Gains Tax',
    'Section 111A Taxation',
    'Mutual Fund Tax',
    'Property Sale Tax',
    'Chartered Accountants India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are Short-Term Capital Gains (STCG)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Short-Term Capital Gains (STCG) are profits earned from the sale of a capital asset (such as equity shares, mutual funds, gold, or real estate) held for a relatively short duration. The holding period that defines an asset as short-term varies between 12 and 36 months depending on the asset class.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the STCG tax rate on equity shares under the Finance Act 2024?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the Finance Act 2024 changes (effective July 23, 2024), the STCG tax rate on listed equity shares and equity-oriented mutual funds (covered under Section 111A) has been increased from 15% to 20%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are short-term gains on debt mutual funds taxed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For debt mutual funds purchased on or after April 1, 2023, short-term capital gains are added directly to your total income and taxed according to your individual income tax slab rates, regardless of the holding period.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the holding period for real estate to qualify as STCG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For immovable property (land or building), gains are classified as short-term if the asset is held for 24 months or less. If held for more than 24 months, it is treated as Long-Term Capital Gains (LTCG).',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there any basic exemption limit for STCG in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no special basic exemption for STCG. If your total income (including STCG) is below the basic tax exemption limit (Rs 7 lakh under the new tax regime, or Rs 2.5/3 lakh under the old regime), you may not have to pay tax. Otherwise, STCG is taxed fully at the statutory rate (20% for equity) or slab rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I deduct transfer expenses when calculating STCG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Brokerage, registry fees, stamp duty, commission, and other direct expenses incurred solely in connection with the transfer or sale of the asset can be deducted from the sale price to compute net capital gains.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is STCG on gold and jewelry taxed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Short-term capital gains on physical gold, jewelry, or digital gold (held for 36 months or less) are added to your gross total income and taxed at your regular slab rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can short-term capital losses be offset against other gains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Short-term capital losses (STCL) can be offset or set off against both short-term capital gains (STCG) and long-term capital gains (LTCG) in the same financial year. Unabsorbed losses can be carried forward for up to 8 assessment years.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim Chapter VI-A deductions against equity STCG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Chapter VI-A deductions (such as Section 80C, 80D, etc.) are strictly not allowed as deductions against special-rate capital gains like equity STCG under Section 111A.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the holding period for equity shares to qualify as STCG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For listed equity shares and equity-oriented mutual funds, the holding period is 12 months or less to qualify as short-term. If held for more than 12 months, the gains are treated as LTCG.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'STCG Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/stcg-calculator',
  description: 'Calculate short-term capital gains tax on shares, mutual funds, gold, and real estate in India under the Finance Act 2024 rates.',
  featureList: ['Finance Act 2024 20% equity STCG calculation', 'Slab-based gold and real estate STCG logic', 'Holding period limit checks', 'Donut chart analysis', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Short-Term Capital Gains Tax',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor STCG Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select asset class', text: 'Choose from equity/shares, debt funds, real estate, or gold.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter cost of acquisition', text: 'Input the original purchase price of the asset.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter full sale price', text: 'Input the sale price received for the asset.' },
    { '@type': 'HowToStep', position: 4, name: 'Input holding period and expenses', text: 'Provide the holding duration in months and any brokerage or transfer expenses incurred.' },
    { '@type': 'HowToStep', position: 5, name: 'Review calculated tax and gains', text: 'Review the calculated STCG tax, cess additions, and net post-tax profits.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Short-Term Capital Gains',
  alternateName: 'STCG',
  description: 'Profits realized from the transfer of a capital asset held for a short period, subject to progressive slabs or specific statutory rates (e.g. 20% for listed equity).',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Taxation Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Capital_gains_tax_in_India'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'STCG Calculator', item: 'https://fermor.in/calculators/stcg-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'STCG Calculator: Short-Term Capital Gains Tax Calculator',
  url: 'https://fermor.in/calculators/stcg-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Short-Term Capital Gains', alternateName: 'STCG' }],
  audience: { '@type': 'Audience', audienceType: 'Investors, Property Sellers, Tax Consultants, Chartered Accountants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-stcg', name: 'What Is a Short-Term Capital Gains (STCG) Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#stcg-vs-ltcg', name: 'Difference Between STCG and LTCG Tax Rates' },
    { '@type': 'WebPageElement', cssSelector: '#holding-period', name: 'Holding Period Criteria for STCG Across Asset Classes' },
    { '@type': 'WebPageElement', cssSelector: '#equity-stcg', name: 'STCG Tax Rates on Equity Shares and Mutual Funds (Section 111A)' },
    { '@type': 'WebPageElement', cssSelector: '#budget-changes', name: 'Finance Act 2024: The 20% Equity STCG Rate Explained' },
    { '@type': 'WebPageElement', cssSelector: '#debt-taxation', name: 'Tax Treatment of STCG on Debt Mutual Funds' },
    { '@type': 'WebPageElement', cssSelector: '#gold-taxation', name: 'STCG Rules and Tax slabs for Gold and Jewelry Investments' },
    { '@type': 'WebPageElement', cssSelector: '#property-taxation', name: 'Short-Term Capital Gains on Real Estate Sales' },
    { '@type': 'WebPageElement', cssSelector: '#rates-table', name: 'In-Context Detailed Table of STCG Holding Periods and Tax Rates' },
    { '@type': 'WebPageElement', cssSelector: '#deductions', name: 'Eligible Deductions and Expenses Allowed to Lower STCG' },
    { '@type': 'WebPageElement', cssSelector: '#optimization', name: 'Tax-Saving Strategies to Optimize STCG Liabilities' },
    { '@type': 'WebPageElement', cssSelector: '#loss-rules', name: 'Set-Off and Carry Forward of Short-Term Capital Losses (STCL)' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This STCG Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function STCGCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <STCGCalculatorClient />
    </>
  );
}

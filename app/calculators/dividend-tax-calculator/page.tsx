import type { Metadata } from 'next';
import DividendTaxCalculatorClient from './DividendTaxCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/dividend-tax-calculator`;
  return {
    title: 'Dividend Tax Calculator: Calculate TDS and Slab-rate Tax',
    description:
      'Free dividend tax calculator for India. Estimate your income tax on dividend payouts, calculate TDS under Section 194/195, and check interest expense deductions. Free to use.',
    keywords: [
      'dividend tax calculator',
      'dividend tax calculator india',
      'calculate tax on dividends',
      'tds on dividend income',
      'section 194 tds dividend shares',
      'dividend tax calculator online',
      'section 57 interest deduction dividend',
      'dividend taxation for nri shares',
      'dividend tax double taxation relief dtaa',
      'form 15g 15h tds dividend exemption',
      'income from other sources dividend tax',
      'how to calculate taxable dividends',
      'dividend yield tax impact calculator',
      'advance tax on dividend income rules',
      'dividend tax rate budget changes',
      'report dividend income in itr',
      'nri dividend tds rate section 195',
      'interest expense deduction cap 20 percent',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Dividend Tax Calculator: Calculate TDS and Slab-rate Tax',
      description:
        'Calculate tax on stock and mutual fund dividends. Covers standard resident TDS, NRI rates, and Section 57(i) interest expense limits. Free to use.',
      images: ['https://fermor.in/og-dividend-tax-calculator.png'],
    },
    openGraph: {
      title: 'Dividend Tax Calculator: Calculate TDS and Slab-rate Tax',
      description:
        'Free dividend tax calculator for India. Estimate your income tax on dividend payouts, calculate TDS under Section 194/195, and check interest expense deductions. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/dividend-tax-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-dividend-tax-calculator.png', width: 1200, height: 630, alt: 'Fermor Dividend Tax Calculator' }],
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
    'Dividend Taxation',
    'Sec 194 TDS',
    'Section 57 Deductions',
    'Income from Other Sources',
    'DTAA Relief',
    'Tax Planning India',
    'Chartered Accountants India',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How is dividend income taxed in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dividend income is fully taxable in the hands of the shareholder under the head &quot;Income from Other Sources&quot; at your applicable progressive income tax slab rates. The Dividend Distribution Tax (DDT) previously paid by companies has been abolished since April 1, 2020.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the TDS rate on dividend income for resident individuals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For resident individuals, companies deduct Tax Deducted at Source (TDS) at a rate of 10% under Section 194 if the total dividend paid by a company exceeds Rs 5,000 in a financial year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there any way to prevent TDS on dividends for residents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If your total annual taxable income is below the basic exemption limit, you can submit Form 15G (for individuals below 60) or Form 15H (for senior citizens above 60) to the company to prevent TDS deductions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are dividends taxed for Non-Resident Indians (NRIs)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For Non-Resident Indians (NRIs), companies deduct TDS at a flat rate of 20% (plus applicable cess and surcharges) under Section 195. NRIs can optionally claim benefits under the Double Taxation Avoidance Agreement (DTAA) if the tax rate in their country of residence is lower.',
      },
    },
    {
      '@type': 'Question',
      name: 'What expenses can be deducted to reduce tax on dividend income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 57(i) of the Income Tax Act, the only deduction allowed is the interest expense incurred on capital borrowed to buy the shares. This deduction is strictly capped at a maximum of 20% of the dividend income. Brokerage or transaction fees cannot be claimed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does double taxation apply to NRI dividend income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, dividend income may be subject to tax in both India and the NRI&apos;s country of residence. However, NRIs can claim Double Taxation Avoidance Agreement (DTAA) relief to reduce the tax rate or claim tax credits in their home country.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to pay advance tax on dividend income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Since companies do not declare dividends on a predictable schedule, advance tax interest (under Section 234C) is not charged on dividend income if you pay the remaining tax in the subsequent advance tax instalments after the dividend is declared.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is dividend tax different under the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tax rate on dividend income remains the same under both regimes (taxed at slab rates). However, because the tax slabs are different between the Old and New Tax Regimes, your final dividend tax liability will depend on which regime you select.',
      },
    },
    {
      '@type': 'Question',
      name: 'What ITR form is used to report dividend income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Dividend income must be reported under the head &quot;Income from Other Sources&quot; in ITR-1, ITR-2, or ITR-3. You must provide a quarterly breakdown of the dividend received to correctly compute advance tax liabilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I offset stock trading losses against dividend income?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Stock trading losses are classified under the head &quot;Capital Gains&quot; and cannot be offset against dividend income, which is categorized under &quot;Income from Other Sources&quot;.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Dividend Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/dividend-tax-calculator',
  description: 'Calculate income tax and TDS on dividend income in India, accounting for resident/NRI status and Section 57 interest capping.',
  featureList: ['Resident vs NRI TDS calculations', 'Section 57(i) 20% interest expense deduction capping', 'Slab-based dividend taxation scaling', 'Donut chart analysis', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Dividend Income Tax',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Dividend Tax Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select residency status', text: 'Toggle Resident Individual or NRI status to apply correct TDS rates.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter annual dividend income', text: 'Input total dividend income received during the financial year.' },
    { '@type': 'HowToStep', position: 3, name: 'Input interest expense', text: 'Input interest paid on capital borrowed to buy the shares, if any.' },
    { '@type': 'HowToStep', position: 4, name: 'Select tax slab', text: 'Toggle your marginal income tax slab rate.' },
    { '@type': 'HowToStep', position: 5, name: 'Review calculated tax and TDS details', text: 'Review total tax, TDS deducted, net bank payout, and post-tax dividend.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Dividend Taxation',
  description: 'The process of levying income tax on dividend distributions to shareholders, taxed at slab rates in India since April 2020.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Taxation Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Dividend_tax'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Dividend Tax Calculator', item: 'https://fermor.in/calculators/dividend-tax-calculator' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Dividend Tax Calculator: Calculate TDS and Slab-rate Tax',
  url: 'https://fermor.in/calculators/dividend-tax-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Dividend Taxation' }],
  audience: { '@type': 'Audience', audienceType: 'Stock Investors, Mutual Fund Shareholders, NRIs, Chartered Accountants', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-dividend-tax', name: 'What Is a Dividend Tax Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#ddt-abolition', name: 'Abolition of Dividend Distribution Tax (DDT)' },
    { '@type': 'WebPageElement', cssSelector: '#taxation-shareholder', name: 'Taxation of Dividends in the Hands of Shareholders' },
    { '@type': 'WebPageElement', cssSelector: '#tds-rules', name: 'Tax Deducted at Source (TDS) Rules on Dividend Income' },
    { '@type': 'WebPageElement', cssSelector: '#tds-thresholds', name: 'TDS Threshold Limits and Form 15G / Form 15H Submissions' },
    { '@type': 'WebPageElement', cssSelector: '#section-57', name: 'Section 57(i): Eligible Interest Expense Deductions Against Dividends' },
    { '@type': 'WebPageElement', cssSelector: '#nri-taxation', name: 'Tax Rates on Dividend Income for Non-Resident Indians (NRIs)' },
    { '@type': 'WebPageElement', cssSelector: '#dtaa-benefits', name: 'Double Taxation Avoidance Agreement (DTAA) Benefits for NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#tax-regimes', name: 'Dividend Taxation under Old vs New Tax Regimes' },
    { '@type': 'WebPageElement', cssSelector: '#summary-table', name: 'Detailed Summary Table of Indian Dividend Tax Regulations' },
    { '@type': 'WebPageElement', cssSelector: '#itr-filing', name: 'Reporting Dividend Income in ITR-1, ITR-2, and ITR-3 Filing' },
    { '@type': 'WebPageElement', cssSelector: '#advance-tax', name: 'Advance Tax Liabilities on Dividend Income Payouts' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Dividend Tax Calculator Online' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function DividendTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <DividendTaxCalculatorClient />
    </>
  );
}

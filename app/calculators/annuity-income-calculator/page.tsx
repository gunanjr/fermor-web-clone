import type { Metadata } from 'next';
import AnnuityIncomeClient from './AnnuityIncomeClient';

const PAGE_DATE_PUBLISHED = '2026-07-23';
const PAGE_DATE_MODIFIED = '2026-07-23';

export const metadata: Metadata = {
  title: 'Annuity Income Calculator: Monthly Pension & Payout',
  description: 'Free annuity income calculator for India. Calculate guaranteed monthly pension payouts from NPS or lump sum corpus across LIC, HDFC Life, and ICICI Pru. Free to use.',
  keywords: [
    'annuity income calculator',
    'annuity pension calculator',
    'monthly annuity calculator',
    'nps annuity calculator',
    'lic annuity rate calculator',
    'lic jeevan akshay calculator',
    'lic shanti annuity calculator',
    'immediate annuity calculator',
    'deferred annuity calculator',
    'annuity return of purchase price calculator',
    'hdfc life annuity calculator',
    'icici pru annuity calculator',
    'sbi life annuity calculator',
    'how much pension on 1 crore annuity',
    'how much pension on 50 lakh annuity',
    'annuity taxability calculator india',
    'joint life annuity calculator',
    'annuity interest rate comparison india',
    'retirement annuity payout calculator',
    'senior citizen annuity income calculator',
  ],
  openGraph: {
    title: 'Annuity Income Calculator: Monthly Pension & Payout - Fermor',
    description: 'Calculate guaranteed monthly pension payouts from your retirement lump sum or NPS corpus across top annuity providers in India. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/annuity-income-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-annuity-income-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Annuity Income Calculator - Fermor',
    description: 'Calculate guaranteed monthly pension payouts from your retirement lump sum or NPS corpus in India. Free to use.',
    images: ['https://fermor.in/og-annuity-income-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/annuity-income-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Annuity Plans India', 'NPS Annuity Rates', 'LIC Jeevan Akshay VII', 'Immediate Annuity', 'Deferred Annuity', 'Income Tax on Pension', 'Account Aggregator Framework'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Annuity Income Calculator', item: 'https://fermor.in/calculators/annuity-income-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much monthly pension do I get on Rs 1 crore annuity in India?', acceptedAnswer: { '@type': 'Answer', text: 'At a typical current annuity rate of 7.0% per annum with return of purchase price, a Rs 1 crore lump sum purchase price generates approximately Rs 58,333 per month in guaranteed lifelong pension.' } },
    { '@type': 'Question', name: 'What is an annuity plan?', acceptedAnswer: { '@type': 'Answer', text: 'An annuity plan is a contract with a life insurance provider where you pay a lump sum purchase price in exchange for regular guaranteed income payouts for life or a specified period.' } },
    { '@type': 'Question', name: 'What is the difference between immediate annuity and deferred annuity?', acceptedAnswer: { '@type': 'Answer', text: 'An immediate annuity starts paying monthly or annual pension income immediately after paying the lump sum, whereas a deferred annuity starts paying pension after a deferment period of 1 to 10 years.' } },
    { '@type': 'Question', name: 'How much pension do I get from NPS annuity component at age 60?', acceptedAnswer: { '@type': 'Answer', text: 'PFRDA mandates that at least 40% of your NPS retirement corpus must be converted into an annuity plan. On a Rs 1 crore NPS corpus, Rs 40 lakh invested in annuity at 7% gives roughly Rs 23,333 per month.' } },
    { '@type': 'Question', name: 'What is annuity with return of purchase price (ROPP)?', acceptedAnswer: { '@type': 'Answer', text: 'In an annuity with return of purchase price, you receive guaranteed pension for life, and upon the death of the annuitant, the 100% original lump sum purchase price is refunded to your nominee.' } },
    { '@type': 'Question', name: 'Is annuity income taxable in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, annuity income received periodically is fully taxable as income from other sources and added to your total annual income, taxed at your applicable income tax slab rate under both old and new regimes.' } },
    { '@type': 'Question', name: 'What is a joint life annuity policy?', acceptedAnswer: { '@type': 'Answer', text: 'A joint life annuity pays guaranteed pension for as long as either you or your spouse is alive, with 100% or 50% pension continuing to the surviving spouse after the death of the primary annuitant.' } },
    { '@type': 'Question', name: 'Which life insurance company offers the highest annuity rates in India?', acceptedAnswer: { '@type': 'Answer', text: 'Annuity rates vary between 6.5% and 7.8% depending on entry age, annuity option, and provider among LIC of India, HDFC Life, ICICI Prudential Life, SBI Life, and Max Life.' } },
    { '@type': 'Question', name: 'Does annuity rate change over time once locked in?', acceptedAnswer: { '@type': 'Answer', text: 'No, once an immediate annuity plan is purchased, the annuity rate and pension amount are locked guaranteed for life and cannot be reduced by the insurance company.' } },
    { '@type': 'Question', name: 'How does deferment period increase annuity income?', acceptedAnswer: { '@type': 'Answer', text: 'Deferring annuity payouts by 5 to 10 years allows your initial corpus to compound during the deferment phase, yielding significantly higher annuity rates and monthly payouts when payments begin.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Annuity Income Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/annuity-income-calculator',
  description: 'Calculate guaranteed monthly pension and total lifetime annuity income from retirement or NPS corpus across LIC, HDFC Life, and ICICI Prudential.',
  featureList: ['Immediate vs Deferred annuity mode comparison', 'Return of Purchase Price payout analysis', 'Joint life spouse pension option', 'Frequency toggle (Monthly, Quarterly, Annual)', 'Taxable pension calculation', 'Donut chart lifetime return breakdown', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Monthly Annuity Pension Income', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Annuity Income Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter purchase price corpus', text: 'Enter your available lump sum retirement corpus or NPS annuity investment amount.' },
    { '@type': 'HowToStep', position: 2, name: 'Select annuity rate and option', text: 'Input expected annual annuity rate and choose option (Life Annuity or Return of Purchase Price).' },
    { '@type': 'HowToStep', position: 3, name: 'Choose payout frequency', text: 'Select monthly, quarterly, half-yearly, or annual pension payout frequency.' },
    { '@type': 'HowToStep', position: 4, name: 'Review monthly pension and lifetime return', text: 'See your guaranteed monthly pension amount and total lifetime payouts over your retirement horizon.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Annuity Plan', alternateName: 'Retirement Pension Annuity',
  description: 'A financial product offered by life insurers that pays guaranteed regular income in exchange for an initial lump-sum investment.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Retirement Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Annuity'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Annuity Income Calculator: Monthly Pension & Payout',
  url: 'https://fermor.in/calculators/annuity-income-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Annuity Plan', alternateName: 'Retirement Pension Annuity' }],
  audience: { '@type': 'Audience', audienceType: 'Indian retirees, NPS subscribers, senior citizens, financial planners', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-annuity', name: 'What Is an Annuity Income Calculator?' },
    { '@type': 'WebPageElement', cssSelector: '#annuity-formula', name: 'Annuity Pension Formula' },
    { '@type': 'WebPageElement', cssSelector: '#immediate-vs-deferred', name: 'Immediate vs Deferred Annuity' },
    { '@type': 'WebPageElement', cssSelector: '#annuity-options-table', name: 'Annuity Options Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#taxation-on-annuity', name: 'Income Tax on Pension Annuity' },
    { '@type': 'WebPageElement', cssSelector: '#provider-rates', name: 'Top Annuity Providers in India' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function AnnuityIncomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AnnuityIncomeClient />
    </>
  );
}

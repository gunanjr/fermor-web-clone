import type { Metadata } from 'next';
import NewTaxRegimeClient from './NewTaxRegimeClient';

const PAGE_DATE_PUBLISHED = '2026-07-03';
const PAGE_DATE_MODIFIED = '2026-10-13';

export const metadata: Metadata = {
  title: 'New Tax Regime Calculator: FY 2026-27 Tax and Rebate',
  description: 'Free new tax regime calculator for FY 2026-27. See tax, 87A rebate, surcharge, cess and take-home on any salary, for residents and NRIs. Free to use.',
  keywords: [
    'new tax regime calculator',
    'new regime tax calculator',
    'income tax calculator new regime',
    'tax calculator new regime',
    'tax calculation as per new regime',
    'new tax regime',
    'new tax regime slabs 2026-27',
    'new regime tax calculator fy 2026-27',
    '87a rebate calculator',
    '87a rebate new regime',
    'section 115bac calculator',
    '80ccd 2 deduction',
    'employer nps deduction new regime',
    'standard deduction new regime',
    'marginal relief new regime',
    'new regime surcharge',
    'new regime tax on 12 lakh',
    'new regime tax on 15 lakh',
    'new regime tax on 20 lakh',
    '7 lakh income tax',
    'new tax regime for nri',
    'income tax calculator 2026-27',
    'tax calculator salary new regime',
    'new regime take home salary',
    'new tax regime vs old tax regime',
    'income tax slab 2026-27',
    'tax payable after tds calculator',
    'income tax refund calculator new regime',
    'new regime tax on 50 lakh',
    'new regime marginal tax rate',
  ],
  openGraph: {
    title: 'New Tax Regime Calculator: FY 2026-27 Tax and Rebate - Fermor',
    description: 'Work out tax under the new regime with the standard deduction, employer NPS, 87A rebate, surcharge and cess. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/new-tax-regime-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-new-tax-regime-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Tax Regime Calculator - Fermor',
    description: 'Tax, 87A rebate, surcharge, cess and take-home under the new regime. Free to use.',
    images: ['https://fermor.in/og-new-tax-regime-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/new-tax-regime-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['New Tax Regime', 'Section 115BAC', 'Section 87A Rebate', 'Income Tax Slabs', 'Standard Deduction', 'Employer NPS 80CCD(2)', 'Surcharge and Cess', 'Marginal Relief', 'TDS on Salary', 'NRI Taxation'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'New Tax Regime Calculator', item: 'https://fermor.in/calculators/new-tax-regime-calculator' },
  ],
};

const faqItems: { q: string; a: string }[] = [
  {
    q: 'What is a new tax regime calculator?',
    a: 'A new tax regime calculator works out your income tax under Section 115BAC. It applies the standard deduction, any employer NPS deduction, the slab rates, the Section 87A rebate, surcharge and 4% cess, then shows what you owe after the tax you have already paid.',
  },
  {
    q: 'What are the new tax regime slabs for FY 2026-27?',
    a: 'Nil up to Rs 4 lakh, 5% from Rs 4 to 8 lakh, 10% from Rs 8 to 12 lakh, 15% from Rs 12 to 16 lakh, 20% from Rs 16 to 20 lakh, 25% from Rs 20 to 24 lakh and 30% above Rs 24 lakh. The slabs are the same as for FY 2025-26.',
  },
  {
    q: 'How is income tax calculated under the new regime?',
    a: 'Add your salary and other income, then subtract the Rs 75,000 standard deduction and any employer NPS deduction to get taxable income. Apply the slab rates, then the 87A rebate if you qualify, then surcharge, then 4% cess.',
  },
  {
    q: 'Is income up to Rs 12 lakh tax-free under the new regime?',
    a: 'Taxable income up to Rs 12 lakh pays no tax for a resident, because the Section 87A rebate of up to Rs 60,000 cancels the slab tax. A salaried person with a Rs 75,000 standard deduction pays nothing on a gross salary up to Rs 12,75,000.',
  },
  {
    q: 'How much tax do I pay on Rs 12 lakh salary?',
    a: 'Nothing. A Rs 12 lakh salary less the Rs 75,000 standard deduction leaves Rs 11,25,000 taxable. The slab tax is Rs 52,500, and the 87A rebate cancels all of it, so the tax and the monthly TDS are both zero.',
  },
  {
    q: 'How much tax do I pay on Rs 15 lakh salary?',
    a: 'Rs 97,500, which is 6.50% of the salary. Taxable income is Rs 14,25,000. The slab tax is Rs 20,000 on Rs 4 to 8 lakh, Rs 40,000 on Rs 8 to 12 lakh and Rs 33,750 on the next Rs 2,25,000, which totals Rs 93,750. Cess adds Rs 3,750.',
  },
  {
    q: 'How much tax do I pay on Rs 20 lakh salary?',
    a: 'Rs 1,92,400, which is 9.62% of the salary. Taxable income is Rs 19,25,000 and the slab tax is Rs 1,85,000. Cess adds Rs 7,400. Your take-home after tax is Rs 18,07,600 a year.',
  },
  {
    q: 'How much tax do I pay on Rs 50 lakh salary?',
    a: 'Rs 10,99,800, which is 22.00% of the salary. Taxable income is Rs 49,25,000, which is under the Rs 50 lakh surcharge limit, so only 4% cess is added to the Rs 10,57,500 slab tax.',
  },
  {
    q: 'How much tax do I pay on Rs 7 lakh income?',
    a: 'Nothing, for a resident. A Rs 7 lakh salary leaves Rs 6,25,000 taxable after the standard deduction. The slab tax is Rs 11,250 and the 87A rebate cancels it. Rs 7 lakh of other income with no salary has a slab tax of Rs 15,000, which the rebate also cancels.',
  },
  {
    q: 'What is the Section 87A rebate under the new regime?',
    a: 'It is a rebate of up to Rs 60,000 for a resident individual whose taxable income does not exceed Rs 12 lakh. It cancels the slab tax up to that limit. It is not available to a non-resident.',
  },
  {
    q: 'What is marginal relief under the new regime?',
    a: 'It stops tax from jumping past the extra income once you cross Rs 12 lakh. At a taxable income of Rs 12,10,000 the slab tax is Rs 61,500, but relief limits the tax to the Rs 10,000 above the limit, so you pay Rs 10,400 with cess.',
  },
  {
    q: 'Where does marginal relief stop?',
    a: 'It stops where the slab tax equals the income above Rs 12 lakh, at a taxable income of about Rs 12,70,588, or a salary of about Rs 13.46 lakh. Until then each extra rupee costs 1.04 rupees in tax and cess.',
  },
  {
    q: 'What is the standard deduction under the new regime?',
    a: 'It is Rs 75,000 for salaried individuals and pensioners, and it is deducted before the slab rates apply. Business and professional income gets no standard deduction.',
  },
  {
    q: 'Is employer NPS deductible under the new regime?',
    a: 'Yes. An employer\'s contribution to NPS is deductible under Section 80CCD(2) up to 14% of basic salary plus DA. On a Rs 20 lakh salary with a 50% basic, a Rs 2 lakh contribution is capped at Rs 1,40,000 and cuts the tax from Rs 1,92,400 to Rs 1,63,280.',
  },
  {
    q: 'Which deductions are not allowed under the new regime?',
    a: 'Section 80C, 80D, HRA, LTA and interest on a self-occupied home loan are not allowed. The standard deduction and the employer NPS deduction are. Use the Old vs New Tax Regime Calculator to see whether your deductions beat the lower new-regime rates.',
  },
  {
    q: 'How does surcharge work under the new regime?',
    a: 'Surcharge is added to the tax at 10% when income is above Rs 50 lakh, 15% above Rs 1 crore and 25% above Rs 2 crore. The new regime caps it at 25%. The old regime goes up to 37%.',
  },
  {
    q: 'What is marginal relief on surcharge?',
    a: 'It stops the extra tax and surcharge from exceeding the income above a surcharge limit. At a taxable income of Rs 50,50,000 the raw surcharge is Rs 1,09,500, relief takes off Rs 74,500, and the surcharge is Rs 35,000.',
  },
  {
    q: 'How much tax do I pay on Rs 55 lakh salary?',
    a: 'Rs 13,81,380, which is 25.12% of the salary. Taxable income is Rs 54,25,000, the slab tax is Rs 12,07,500, surcharge at 10% is Rs 1,20,750 and cess is Rs 53,130.',
  },
  {
    q: 'What is health and education cess?',
    a: 'It is 4% added to your tax plus surcharge. On a slab tax of Rs 93,750, cess is Rs 3,750. It is added after the rebate and surcharge.',
  },
  {
    q: 'Does the new regime apply to NRIs?',
    a: 'Yes, an NRI is taxed on income earned or received in India at the same slabs. The 87A rebate is only for residents, so an NRI with a Rs 12 lakh salary pays Rs 54,600 while a resident pays nothing.',
  },
  {
    q: 'Is the new regime the default?',
    a: 'Yes. Under Section 115BAC the new regime applies unless you opt out. Salaried individuals can choose each year. Individuals with business income can return to the old regime only once, so check the current rules before opting out.',
  },
  {
    q: 'How do I enter other income such as interest?',
    a: 'Add it in the Other Income field. The calculator taxes it at the slab rates along with your salary. Interest of Rs 1 lakh on a Rs 12 lakh salary raises taxable income to Rs 12,25,000 and the tax to Rs 26,000.',
  },
  {
    q: 'What is the tax payable after TDS?',
    a: 'It is your total tax minus the tax already paid through TDS and advance tax. On a Rs 25 lakh salary the total tax is Rs 3,19,800, so with Rs 2,00,000 already paid you owe Rs 1,19,800. A negative figure is a refund.',
  },
  {
    q: 'What is my marginal tax rate?',
    a: 'It is the tax on your next rupee, including cess. It is 15.60% at Rs 15 lakh, 20.80% at Rs 20 lakh, 31.20% at Rs 25 lakh and 34.32% at Rs 55 lakh. The calculator shows it for your income.',
  },
  {
    q: 'Does this calculator include capital gains?',
    a: 'No. All income entered is taxed at slab rates. Capital gains on shares and mutual funds have their own rates, so use the Capital Gains Calculator for them and add the result to your tax.',
  },
  {
    q: 'How do I calculate new regime tax in Excel?',
    a: 'Use a slab table with SUMPRODUCT. For example =SUMPRODUCT((T>Lower)*(T-Lower)*(Rate-PrevRate)), where T is taxable income. Then apply the rebate with =IF(T<=1200000,0,MIN(Tax,T-1200000)), and add 4% cess.',
  },
  {
    q: 'What does this calculator not include?',
    a: 'It leaves out capital gains at special rates, house property losses, deductions under the old regime, the new Income-tax Act section numbers and any later change to the slabs. Treat the result as an estimate.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'New Tax Regime Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/new-tax-regime-calculator',
  description: 'Calculate income tax under the new tax regime for FY 2026-27 with the standard deduction, employer NPS under 80CCD(2), slab tax, Section 87A rebate with marginal relief, surcharge with marginal relief and cess, for residents and NRIs.',
  featureList: ['Slab tax with the Rs 75,000 standard deduction', 'Employer NPS deduction capped at 14% of basic salary', 'Section 87A rebate and marginal relief for residents', 'Surcharge with marginal relief and 4% cess', 'Resident and NRI treatment', 'Tax payable or refund after TDS and advance tax', 'Effective and marginal tax rate', 'Monthly tax and take-home', 'Slab-wise breakdown chart and table', 'Multi-currency symbol selector', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Use the New Tax Regime Calculator', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor New Tax Regime Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose your residential status', text: 'Select Resident or NRI. The Section 87A rebate applies to residents only.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your salary', text: 'Enter your gross annual salary and the share of it that is basic salary plus DA, which sets the cap on the employer NPS deduction.' },
    { '@type': 'HowToStep', position: 3, name: 'Add NPS and other income', text: 'Enter the employer NPS contribution made on your behalf and any other income such as interest or rent.' },
    { '@type': 'HowToStep', position: 4, name: 'Enter tax already paid', text: 'Enter the TDS and advance tax already paid to see what you still owe or the refund due.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the result', text: 'Review the total tax, the rebate, the surcharge, the effective and marginal rates and the take-home, then open the dropdown for the slab-wise chart and table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'New Tax Regime', alternateName: 'Section 115BAC regime',
  description: 'The default income tax regime for individuals in India, with lower slab rates, a standard deduction and a Section 87A rebate up to Rs 12 lakh of taxable income, and without most exemptions and deductions such as 80C, HRA and 80D.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Income_tax_in_India', 'https://www.wikidata.org/wiki/Q2723740'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'New Tax Regime Calculator: FY 2026-27 Tax and Rebate',
  url: 'https://fermor.in/calculators/new-tax-regime-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'New Tax Regime', alternateName: 'Section 115BAC regime' }],
  audience: { '@type': 'Audience', audienceType: 'Indian salaried employees, NRIs, taxpayers, finance professionals', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-new-tax-regime', name: 'What Is the New Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#how-new-regime-tax-is-calculated', name: 'How New Regime Tax Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-slabs', name: 'New Regime Slabs for FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#tax-on-salary-examples', name: 'Tax on Different Salaries' },
    { '@type': 'WebPageElement', cssSelector: '#section-87a-rebate', name: 'Section 87A Rebate and Marginal Relief' },
    { '@type': 'WebPageElement', cssSelector: '#standard-deduction', name: 'Standard Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#employer-nps', name: 'Employer NPS Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-and-cess', name: 'Surcharge and Cess' },
    { '@type': 'WebPageElement', cssSelector: '#nri-new-regime', name: 'New Regime for NRIs' },
    { '@type': 'WebPageElement', cssSelector: '#deductions-allowed', name: 'Deductions Allowed and Not Allowed' },
    { '@type': 'WebPageElement', cssSelector: '#old-or-new', name: 'Old or New Regime' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-limits', name: 'Limits of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-in-excel', name: 'New Regime Tax in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function NewTaxRegimeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <NewTaxRegimeClient faqItems={faqItems} />
    </>
  );
}

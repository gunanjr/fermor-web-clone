import type { Metadata } from 'next';
import IncomeTaxCalculatorClient from './IncomeTaxCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {

  return {
    title: 'Income Tax Calculator FY 2026-27: New Regime vs Old Regime',
    description: 'Free income tax calculator for FY 2026-27 (AY 2027-28). Compare new and old regime instantly. Zero tax up to ₹12.75L salary. HRA, 80C, NPS deductions, monthly take-home, slab breakdown. No sign-up required.',
    keywords: [
      'income tax calculator',
      'income tax calculator 2026-27',
      'income tax calculator fy 2026-27',
      'income tax calculator india',
      'income tax calculator for salaried',
      'new regime vs old regime calculator',
      'income tax on salary india',
      'how to calculate income tax',
      'income tax slab 2026-27',
      'income tax ay 2027-28',
      'zero tax 12 lakh salary',
      'income tax 12 lakh salary',
      'income tax 15 lakh salary',
      'income tax 20 lakh salary',
      'income tax 10 lakh salary',
      'section 87a rebate calculator',
      'hra exemption calculator',
      'income tax new regime calculator',
      'old tax regime calculator',
      'income tax deductions 80c 80d',
      'income tax calculator online free',
      'income tax calculator excel india',
      'income tax calculator nri',
      'income tax 25 lakh salary',
      'income tax calculator fy 2025-26',
      'income tax slab ay 2026-27',
      'income tax on 12.75 lakh salary',
    ],
    alternates: {
      canonical: `https://fermor.in/calculators/income-tax-calculator`,
    },
    openGraph: {
      title: 'Income Tax Calculator FY 2026-27: New Regime vs Old Regime - Fermor',
      description: 'Free income tax calculator for India. Compare new and old regime, compute HRA, 80C, NPS deductions, monthly in-hand salary. Updated for Budget 2025-26.',
      type: 'website',
      url: 'https://fermor.in/calculators/income-tax-calculator',
      images: [{ url: 'https://fermor.in/og-income-tax-calculator.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Income Tax Calculator FY 2026-27 - Fermor',
      description: 'Compare new vs old regime, compute HRA, monthly take-home and break-even deductions instantly. Free, no sign-up.',
      images: ['https://fermor.in/og-income-tax-calculator.png'],
    },
  };
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much income tax do I pay on a salary of ₹12 lakh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the new tax regime for FY 2026-27, a salaried person with a gross salary of ₹12 lakh pays zero income tax. After the standard deduction of ₹75,000, taxable income is ₹11.25 lakh, resulting in a slab tax of ₹52,500, which is fully covered by the Section 87A rebate. For a gross salary of ₹12.75 lakh, taxable income is exactly ₹12 lakh and slab tax is ₹60,000, exactly the rebate limit, resulting in zero net tax.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the new tax regime income tax slabs for FY 2026-27?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For FY 2026-27 (AY 2027-28), the new tax regime slabs are: up to ₹4 lakh at 0%; ₹4L to ₹8L at 5%; ₹8L to ₹12L at 10%; ₹12L to ₹16L at 15%; ₹16L to ₹20L at 20%; ₹20L to ₹24L at 25%; above ₹24L at 30%. These slabs are unchanged from FY 2025-26.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the new tax regime better than the old tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new regime is better for most salaried individuals. Income up to ₹12.75 lakh gross salary is zero-tax under the new regime. The old regime becomes beneficial only when Chapter VI-A deductions (80C + 80D + HRA + home loan interest) exceed approximately ₹3-5 lakh depending on income level. At ₹15 lakh income, the old regime needs roughly ₹3.75 lakh in deductions to match the new regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the income tax on a ₹15 lakh salary for FY 2026-27?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the new tax regime, a gross salary of ₹15 lakh results in taxable income of ₹14.25 lakh (after ₹75,000 standard deduction). Tax: ₹20,000 (₹4-8L at 5%) + ₹40,000 (₹8-12L at 10%) + ₹33,750 (₹12-14.25L at 15%) = ₹93,750. Plus 4% cess = ₹97,500 total. The taxable income exceeds ₹12 lakh so no Section 87A rebate applies.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the standard deduction for salaried employees in FY 2026-27?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standard deduction for salaried employees is ₹75,000 under the new tax regime and ₹50,000 under the old tax regime for FY 2026-27. This deduction applies automatically to all salaried individuals and pensioners without any proof of expenditure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch from the old tax regime to the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Salaried individuals can switch between the old and new regime every year at the time of filing their ITR by July 31. However, individuals with business or professional income can switch from the new regime back to the old regime only once in their lifetime by filing Form 10-IEA.',
      },
    },
    {
      '@type': 'Question',
      name: 'What deductions are allowed under the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the new tax regime, the allowed deductions are: standard deduction of ₹75,000 for salaried employees, employer NPS contribution under Section 80CCD(2) (up to 14% of basic salary), and home loan interest on let-out property. Sections 80C, 80D, HRA exemption, and home loan interest for self-occupied property are not available.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Section 87A rebate for FY 2026-27?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 87A provides a full tax rebate for resident individuals whose computed income tax does not exceed ₹60,000 under the new regime, making taxable income up to ₹12 lakh (₹12.75 lakh gross salary) completely tax-free. Under the old regime, the rebate limit is ₹12,500, covering taxable income up to ₹5 lakh. If taxable income exceeds the threshold by even ₹1, the entire rebate is lost.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is income tax calculated on salary in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Income tax on salary is calculated in eight steps: (1) Compute gross salary. (2) Subtract exempt allowances like HRA (old regime only). (3) Subtract standard deduction (₹75,000 new regime, ₹50,000 old regime). (4) Subtract Chapter VI-A deductions (80C, 80D, etc.) for old regime only. (5) Apply slab tax rates to taxable income. (6) Apply Section 87A rebate if eligible. (7) Add surcharge if income exceeds ₹50 lakh. (8) Add 4% Health and Education Cess on (tax + surcharge).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the effective tax rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The effective tax rate is the percentage of total gross income paid as tax, distinct from the marginal rate on the last rupee. For ₹20 lakh taxable income under the new regime, the marginal rate is 20% but the effective rate is approximately 10.4% because lower income slabs are taxed at 0%, 5%, 10%, and 15%. This calculator shows both the effective rate and total tax in the results panel.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework, provides a complete financial picture, and automates decisions most people know they should make but never get around to. Fermor is free to use. No sign-up required for calculators.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is HRA exemption calculated under the old tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HRA exemption under Section 10(13A) is the minimum of three values: (1) actual HRA received from employer, (2) 50% of basic salary for metro cities (Mumbai, Delhi, Kolkata, Chennai) or 40% for non-metro cities, (3) actual rent paid minus 10% of basic salary. If any of these values is zero, no exemption is available. HRA exemption is not available under the new tax regime.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Income Tax Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/income-tax-calculator',
  description: 'Calculate income tax for FY 2026-27 under both new and old regime. Instant regime comparison with live slab breakdown, HRA calculator, monthly take-home, and break-even deduction analysis.',
  featureList: [
    'New Tax Regime vs Old Tax Regime comparison',
    'FY 2026-27, FY 2025-26, and FY 2024-25 support',
    'HRA exemption calculator (metro and non-metro)',
    'Section 80C, 80D, 80E, NPS, home loan deductions',
    'Live slab visualizer with colour-coded breakdown',
    'Monthly take-home salary calculation',
    'Break-even deduction analysis',
    'Section 87A rebate detection',
    'Surcharge and cess calculation',
    'Income from salary, rental, digital assets, FD interest',
    'Senior citizen and super senior citizen slab support',
    'LocalStorage persistence of all inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2024-06-01',
  dateModified: '2026-06-29',
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Income Tax for FY 2026-27 (New vs Old Regime)',
  description: 'Compare old and new income tax regimes instantly with Fermor free calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Income Tax Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Your Annual Income',
      text: 'Enter your gross annual salary using the log-scale slider or type an exact value. Add other income sources like interest income, rental income, or digital asset gains.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Financial Year and Age',
      text: 'Choose FY 2026-27, FY 2025-26, or FY 2024-25. Select your age category (below 60, senior citizen 60-80, or super senior citizen 80+) to apply the correct old regime slabs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add Deductions (Old Regime)',
      text: 'Enter 80C investments (up to ₹1.5L), health insurance 80D, HRA details, NPS contributions, home loan interest, education loan interest under 80E, and other eligible deductions.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Compare Both Regimes and Check Monthly Take-Home',
      text: 'The calculator shows exact tax under both regimes side by side. Click the regime that saves more to see the detailed slab breakdown, monthly TDS, and estimated monthly in-hand salary.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Income Tax Calculator', item: 'https://fermor.in/calculators/income-tax-calculator' },
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
    'Income Tax India',
    'New Tax Regime FY 2026-27',
    'Section 87A Rebate',
    'HRA Exemption Calculation',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Income Tax Act 2025',
    'Budget 2025 Tax Changes',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Income Tax Calculator FY 2026-27: New Regime vs Old Regime - Fermor',
  url: 'https://fermor.in/calculators/income-tax-calculator',
  datePublished: '2024-06-01',
  dateModified: '2026-06-29',
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
      name: 'Income Tax',
      alternateName: 'Income Tax India FY 2026-27',
      description: "Income tax is a direct tax levied by the Government of India on an individual's total income, computed under the Income Tax Act 2025 using progressive slab rates under either the new tax regime or the old tax regime.",
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax and Personal Finance Terms', url: 'https://fermor.in/calculators' },
      sameAs: [
        'https://en.wikipedia.org/wiki/Income_tax_in_India',
        'https://www.wikidata.org/wiki/Q1331870',
      ],
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried taxpayers, self-employed individuals, NRI investors, and chartered accountants computing income tax liability for FY 2026-27',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-income-tax', name: 'What is Income Tax' },
    { '@type': 'WebPageElement', cssSelector: '#how-income-tax-is-calculated', name: 'How Income Tax is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-slabs', name: 'New Tax Regime Slabs FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-slabs', name: 'Old Tax Regime Slabs FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#87a-rebate', name: 'Section 87A Rebate' },
    { '@type': 'WebPageElement', cssSelector: '#new-vs-old-regime', name: 'New Regime vs Old Regime Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-deductions', name: 'Old Regime Deductions' },
    { '@type': 'WebPageElement', cssSelector: '#hra-exemption', name: 'HRA Exemption Calculation' },
    { '@type': 'WebPageElement', cssSelector: '#income-tax-worked-examples', name: 'Income Tax Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#monthly-take-home', name: 'Monthly Take-Home Salary' },
    { '@type': 'WebPageElement', cssSelector: '#surcharge-cess', name: 'Surcharge and Education Cess' },
    { '@type': 'WebPageElement', cssSelector: '#budget-2025-changes', name: 'Budget 2025 Key Changes' },
    { '@type': 'WebPageElement', cssSelector: '#income-by-salary-level', name: 'Income Tax by Salary Level' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Income Tax',
  alternateName: 'Income Tax in India',
  description: 'Income tax is a direct tax levied by the Government of India on the total income of an individual during a financial year, computed under the Income Tax Act 2025 using progressive slab rates.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Income Tax Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Income_tax_in_India',
    'https://www.wikidata.org/wiki/Q1331870',
  ],
};

export default async function IncomeTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <IncomeTaxCalculatorClient />
    </>
  );
}

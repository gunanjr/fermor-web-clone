import type { Metadata } from 'next';
import TaxSavingCalculatorClient from './TaxSavingCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/tax-saving-calculator`;
  return {
    title: 'Tax Saving Calculator: Calculate Section 80C 80D Tax Savings for 2026',
    description:
      'Free tax saving calculator for India. Calculate how much you can save on taxes under Section 80C, 80D, NPS, home loan deductions. Compare old vs new regime. See tax savings across income brackets. Expert strategies included.',
    keywords: [
      'tax saving calculator',
      'tax saving calculator india',
      'tax saving calculator 2026',
      'how to calculate tax saving',
      'tax saving calculation formula',
      'section 80c calculator',
      'section 80d calculator',
      'tax saving investments',
      'tax deduction calculator',
      'tax exemption calculator',
      '80c deduction calculator',
      'tax saving strategy',
      'nps tax saving calculator',
      'home loan tax benefit calculator',
      'health insurance tax deduction calculator',
      'tax saving by income bracket',
      'affordability tax saving',
      'tax saving eligibility',
      'tax saving tips salaried employees',
      'section 80c 80d 80ccd calculator',
      'old regime vs new regime calculator',
      'professional tax calculator',
      'income tax saving options',
      'maximum tax deduction india',
      'tax liability reduction calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Tax Saving Calculator: Section 80C 80D Tax Savings Calculator',
      description:
        'Calculate how much you can save on taxes under Section 80C, 80D, NPS, home loan. Compare old vs new regime savings. Free for India.',
      images: ['https://fermor.in/og-tax-saving-calculator.png'],
    },
    openGraph: {
      title: 'Tax Saving Calculator: Section 80C 80D Tax Savings Calculator',
      description:
        'Calculate how much you can save on taxes under Section 80C, 80D, NPS, home loan, and other tax-saving investments. Compare old vs new regime savings. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/tax-saving-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-tax-saving-calculator.png', width: 1200, height: 630, alt: 'Fermor Tax Saving Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-23';
const PAGE_DATE_PUBLISHED = '2026-06-30';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Tax Saving India',
    'Section 80C',
    'Income Tax India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Indian Tax System',
    'Tax Planning India',
    'NRI Taxation',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much tax can I save under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum deduction under Section 80C of the Income Tax Act is Rs 1.5 lakh per financial year. Investing the full amount in eligible instruments like PPF, EPF, ELSS, tax-saving FDs, NSC, or life insurance premiums reduces your taxable income by Rs 1.5 lakh, saving up to Rs 46,800 in tax (under the old regime at the 30% slab plus cess).',
      },
    },
    {
      '@type': 'Question',
      name: 'What investments qualify for Section 80C deduction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80C covers: Employee Provident Fund (EPF), Public Provident Fund (PPF), Equity Linked Savings Scheme (ELSS), tax-saving Fixed Deposits (5-year lock-in), National Savings Certificate (NSC), life insurance premiums, Sukanya Samriddhi Yojana (SSY), Senior Citizens Savings Scheme (SCSS), tuition fees for children, principal repayment on home loan, and stamp duty/registration charges on property purchase.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax saving under Section 80D for health insurance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80D allows deduction for health insurance premiums paid. For individuals below 60: up to Rs 25,000 for self/family, plus up to Rs 25,000 for parents (Rs 50,000 if parents are senior citizens). For senior citizens (self or parents): up to Rs 50,000. Preventive health check-ups (up to Rs 5,000) are included within these limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I save with NPS under Section 80CCD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under Section 80CCD(1B), an additional deduction of up to Rs 50,000 is available exclusively for NPS (National Pension System) contributions, over and above the Rs 1.5 lakh Section 80C limit. This means the total tax-saving potential through retirement contributions can reach Rs 2 lakh per year (Rs 1.5 lakh under 80C + Rs 50,000 under 80CCD(1B)).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between old and new tax regime for tax saving?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the old tax regime, you can claim deductions and exemptions (80C, 80D, HRA, LTA, etc.) to reduce taxable income. The new tax regime (default since FY 2023-24) offers lower tax rates but disallows most deductions and exemptions. The choice depends on how much you invest in tax-saving instruments. The old regime is generally better if you have total deductions exceeding Rs 2.5-3 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim both 80C and 80CCD(1B) deductions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Section 80C provides up to Rs 1.5 lakh deduction, and Section 80CCD(1B) provides an additional up to Rs 50,000 deduction for NPS contributions. These are separate limits, so you can claim both in the same financial year if you have invested accordingly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax saving on home loan interest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the old tax regime, Section 24(b) allows deduction of up to Rs 2 lakh per year on home loan interest for a self-occupied property (no upper limit for let-out properties). Section 80EEA provides an additional Rs 1.5 lakh deduction for first-time home buyers on affordable housing. Principal repayment qualifies under Section 80C (up to Rs 1.5 lakh). None of these deductions are available under the new tax regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much tax can I save by investing in ELSS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ELSS (Equity Linked Savings Scheme) qualifies for Section 80C deduction up to Rs 1.5 lakh. At the 30% tax slab, investing Rs 1.5 lakh in ELSS saves Rs 46,800 in tax (including 4% cess). ELSS has the shortest lock-in period of 3 years among all 80C options and offers potential for equity-linked returns.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRIs claim tax-saving deductions in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, NRIs can claim most tax-saving deductions available to residents, including Section 80C (through PPF, ELSS, NPS, life insurance, etc.), Section 80D (health insurance for parents in India), and Section 80CCD(1B) (NPS). However, deductions under Section 80G (donations) and others may have restrictions. Income earned abroad is not eligible for these deductions: only Indian-source income.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I do not invest in tax-saving instruments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you do not invest in tax-saving instruments and opt for the old tax regime, you pay higher tax on the full income. However, under the new tax regime (default since FY 2023-24), you do not need to invest in tax-saving instruments since deductions are not available. The new regime offers lower tax rates without requiring any tax-saving investments: the tradeoff is no deductions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum total tax deduction possible in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the old tax regime, maximum deductions can reach approximately Rs 5-6 lakh per year: Rs 1.5 lakh under 80C, Rs 50,000 under 80CCD(1B), Rs 50,000 under 80D, Rs 2 lakh under 24(b) home loan interest, and various other deductions (80E for education loan, 80G for donations, etc.). Under the new regime, most of these deductions are not available.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is the deduction under Section 80E for education loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80E allows a deduction for interest paid on education loans for higher studies. There is no upper limit on the deduction amount. The deduction is available for a maximum of 8 years or until the interest is fully paid, whichever is earlier. The loan must be for the individual, spouse, children, or legal guardian. Principal repayment of education loan does not qualify under any section.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax saving if my annual salary is Rs 25 lakh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At Rs 25 lakh salary under the old regime, your tax is Rs 4.70 lakh (30% slab + 4% cess). With maximum deductions of Rs 5-6 lakh (80C, 80CCD, 80D, Section 24), your tax reduces to approximately Rs 2.74 lakh, saving Rs 1.96 lakh per year. Under the new regime (no deductions), you pay Rs 3.52 lakh. The old regime saves more if you have substantial investments. Use the calculator to compare both regimes for your specific deduction amount.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the deadline to invest for tax saving deductions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tax-saving investments must be made before March 31 of the financial year to claim deductions for that fiscal year. The financial year in India runs from April 1 to March 31. For example, investments made up to March 31, 2026 qualify for deductions in FY 2025-26. Some investments like 80C and 80D require proof of investment while filing the income tax return (ITR) by the due date (usually July 31).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can salaried employees claim higher tax deductions than business owners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, Section 80C, 80D, and 80CCD deductions are available to both salaried employees and business owners. However, business owners also get deductions for business expenses under Section 37. Salaried employees get HRA and LTA exemptions (if eligible), while business owners deduct all business-related costs. Section 80C limit is Rs 1.5 lakh for all individuals regardless of income source or profession.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is tax saving investment mandatory if I use the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, tax-saving investments are not mandatory under the new regime since deductions like 80C and 80D are not allowed. You simply pay tax at the specified slabs without claiming any deductions or exemptions. Most taxpayers automatically fall under the new regime by default (since FY 2023-24), but you can choose the old regime if you have substantial deductions. The new regime is beneficial if you have low investments but high income.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best tax-saving investment if I have Rs 1.5 lakh to invest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best choice depends on your risk appetite and timeline. PPF (15-year lock-in, 7.1% return, safe) is ideal for conservative investors. ELSS (3-year lock-in, equity-based, 10-15% historical return) suits growth-oriented investors. NPS provides additional deduction of Rs 50,000 beyond 80C for retirement planning. EPF is mandatory for most salaried employees. A mix of PPF (60%) and ELSS (40%) balances safety and growth. Consult a SEBI-registered advisor for personalized recommendations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can self-employed professionals claim tax-saving deductions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, self-employed professionals can claim all Section 80C, 80D, 80CCD(1B), and other tax-saving deductions, just like salaried employees. Self-employed individuals also benefit from additional business expense deductions under Section 37 and home office deduction under Section 30 or 37. The key difference is that business expenses are deducted before calculating taxable income, separate from personal deductions like 80C and 80D.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the tax saving if I invest only Rs 50,000 in Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'At the 30% tax slab, investing Rs 50,000 in Section 80C saves Rs 15,600 in tax (including 4% cess). At the 20% slab, the saving is Rs 10,400. At the 5% slab, the saving is Rs 2,600. The actual tax saved depends on your income level and the tax slab applicable. Use the calculator to enter your specific income and deduction amount to see your exact tax saving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is NPS better than PPF for tax-saving and returns?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both serve different purposes. PPF offers fixed 7.1% return and allows full withdrawal at age 60 tax-free. NPS offers market-linked returns (7-10% historical average for conservative funds) and provides an additional deduction of Rs 50,000 under 80CCD(1B). At maturity, NPS requires 40% annuity purchase (taxable), while 60% can be withdrawn tax-free. For higher income earners maximizing deductions, NPS + PPF combination is optimal. Use the NPS Calculator and PPF Calculator to compare based on your retirement goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Tax Saving Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/tax-saving-calculator',
  description: 'Calculate how much you can save on taxes under Section 80C, 80D, NPS, home loan, and other tax-saving instruments. Compare tax saving across income slabs. Free, browser-based, no sign-up.',
  featureList: [
    'Section 80C Deduction Calculator',
    'Section 80D Health Insurance Deduction',
    'NPS Additional Deduction (80CCD(1B))',
    'Home Loan Tax Benefit Calculator',
    'Old vs New Regime Tax Saving Comparison',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Tax Saving Calculator', item: 'https://fermor.in/calculators/tax-saving-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tax Savings',
  description: 'Step-by-step guide to calculate your tax savings using the Tax Saving Calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Tax Saving Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your annual taxable income',
      text: 'Input your gross total income from all sources before any deductions.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter your Section 80C investments',
      text: 'Add up EPF, PPF, ELSS, life insurance premiums, tuition fees, and other 80C-eligible investments, up to Rs 1.5 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter Section 80D health insurance premiums',
      text: 'Add health insurance premiums paid for self, family, and parents, up to Rs 25,000-1,00,000 depending on age.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add NPS and home loan interest',
      text: 'Enter additional NPS contributions under Section 80CCD(1B) and home loan interest under Section 24(b).',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Toggle tax regime and view your results',
      text: 'Switch between the old regime (with deductions) and new regime (lower rates, no deductions) to see your total tax liability, tax saved, and effective tax rate.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Section 80C',
  alternateName: '80C Deduction',
  description: 'Section 80C of the Income Tax Act, 1961 allows deductions of up to Rs 1.5 lakh per financial year for specified investments and expenses such as PPF, EPF, ELSS, NSC, life insurance premiums, and tuition fees.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Section_80C',
    'https://www.wikidata.org/wiki/Q7442975',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Tax Saving Calculator: Section 80C 80D Tax Savings Calculator',
  description: 'Free tax saving calculator for India. Calculate how much you can save on taxes under Section 80C, 80D, NPS, home loan, and other tax-saving investments. Compare old vs new regime savings.',
  url: 'https://fermor.in/calculators/tax-saving-calculator',
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
    { '@type': 'DefinedTerm', name: 'Section 80C', alternateName: '80C Deduction' },
    { '@type': 'DefinedTerm', name: 'Section 80D', alternateName: 'Health Insurance Deduction' },
    { '@type': 'DefinedTerm', name: 'NPS', alternateName: 'National Pension System' },
    { '@type': 'DefinedTerm', name: 'ELSS', alternateName: 'Equity Linked Savings Scheme' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, salaried employees, NRI investors, tax planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-tax-saving', name: 'What Is Tax Saving in India' },
    { '@type': 'WebPageElement', cssSelector: '#section-80c', name: 'Section 80C Deductions' },
    { '@type': 'WebPageElement', cssSelector: '#section-80d', name: 'Section 80D Health Insurance Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#nps-tax-benefit', name: 'NPS Tax Benefit Under Section 80CCD(1B)' },
    { '@type': 'WebPageElement', cssSelector: '#home-loan-tax-benefit', name: 'Home Loan Tax Benefits' },
    { '@type': 'WebPageElement', cssSelector: '#tax-calculation-formula', name: 'Tax Saving Calculation Formula with Worked Examples' },
    { '@type': 'WebPageElement', cssSelector: '#tax-by-income', name: 'Comparing Tax Savings Across Income Brackets' },
    { '@type': 'WebPageElement', cssSelector: '#tax-strategies', name: 'Tax Saving Strategies by Age & Life Stage' },
    { '@type': 'WebPageElement', cssSelector: '#budget-2026', name: 'Budget 2026 Tax Updates & Changes' },
    { '@type': 'WebPageElement', cssSelector: '#regime-slabs', name: 'Old vs New Tax Regime: Full Slab Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#section-80d-limits', name: 'Section 80D Limits at a Glance' },
    { '@type': 'WebPageElement', cssSelector: '#key-limits', name: 'Key Deduction Limits at a Glance' },
    { '@type': 'WebPageElement', cssSelector: '#documents-checklist', name: 'Documents Required to Claim These Deductions' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Mistakes in Tax Planning' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Tax Saving Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function TaxSavingCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <TaxSavingCalculatorClient />
    </>
  );
}

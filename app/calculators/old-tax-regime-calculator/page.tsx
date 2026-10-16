import type { Metadata } from 'next';
import OldTaxRegimeClient from './OldTaxRegimeClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/old-tax-regime-calculator`;
  return {
    title: 'Old Tax Regime Calculator: Free Online Tax Calculator India',
    description:
      'Free old tax regime calculator for India. Calculate your income tax under the old tax regime for FY 2026-27 with Section 80C, 80D, HRA, NPS, and home loan deductions. Free to use.',
    keywords: [
      'old tax regime calculator',
      'old regime income tax calculator',
      'tax calculation under old regime',
      'income tax calculator old regime',
      'old regime tax slab calculator',
      'old regime tax calculation',
      'tax calculator old regime',
      'income tax calculation under old regime',
      'tax calculation old regime',
      'old regime tax calculator online',
      'tax calculation as per old regime',
      'tax calculator for old regime',
      'old tax regime tax calculator',
      'online tax calculator old regime',
      'income tax slab old regime calculator',
      'tax calculation on salary old regime',
      'it calculator old regime',
      'itr calculator old regime',
      'tax computation under old regime',
      'income tax calculator with old regime',
      'old regime calculation',
      'old tax regime salary calculator',
      'old vs new tax regime calculator',
      'new vs old tax regime calculator',
      'old and new tax regime calculator',
      'compare old and new tax regime calculator',
      'old regime income tax slabs',
      'calculate tax as per old regime',
      'calculate income tax old regime',
      'new tax regime calculator',
      'new regime tax calculator',
      'income tax calculator new regime',
      'tax calculator new regime',
      'hra exemption calculator',
      'advance tax calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Old Tax Regime Calculator: Free Online Tax Calculator India',
      description:
        'Calculate your income tax under the old tax regime for FY 2026-27 with 80C, 80D, HRA, NPS, home loan deductions. Free to use.',
      images: ['https://fermor.in/og-old-tax-regime-calculator.png'],
    },
    openGraph: {
      title: 'Old Tax Regime Calculator: Free Online Tax Calculator India',
      description:
        'Calculate your income tax under the old tax regime for FY 2026-27 with Section 80C, 80D, HRA, NPS, and home loan deductions. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/old-tax-regime-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-old-tax-regime-calculator.png', width: 1200, height: 630, alt: 'Fermor Old Tax Regime Calculator' }],
    },
  };
}

const PAGE_DATE = '2026-07-16';

const faqItems = [
  {
    q: 'What is the old tax regime in India?',
    a: 'The old tax regime is the traditional income tax system under the Income Tax Act that allows taxpayers to claim various deductions and exemptions in exchange for higher slab rates. It includes deductions under Section 80C (up to Rs 1.5 lakh), 80D (health insurance), HRA exemption under Section 10(13A), home loan interest under Section 24(b), NPS under 80CCD(1B), and several other exemptions that reduce taxable income.',
  },
  {
    q: 'What are the old tax regime slabs for FY 2026-27?',
    a: 'The old tax regime slabs for FY 2026-27 depend on age. For individuals below 60: up to Rs 2.5 lakh (nil), Rs 2.5-5 lakh (5%), Rs 5-10 lakh (20%), above Rs 10 lakh (30%). For senior citizens (60-80): up to Rs 3 lakh (nil), Rs 3-5 lakh (5%), Rs 5-10 lakh (20%), above Rs 10 lakh (30%). For super senior citizens (80+): up to Rs 5 lakh (nil), Rs 5-10 lakh (20%), above Rs 10 lakh (30%).',
  },
  {
    q: 'What deductions are available under the old tax regime?',
    a: 'The old tax regime offers a wide range of deductions: Section 80C up to Rs 1.5 lakh (PPF, ELSS, EPF, life insurance, NSC, tax-saving FDs, tuition fees, home loan principal), 80D for health insurance (up to Rs 25,000 for self/family, Rs 50,000 for senior citizens), 80CCD(1B) for NPS (up to Rs 50,000), Section 24(b) for home loan interest (up to Rs 2 lakh), HRA exemption, standard deduction of Rs 50,000, and others like 80E (education loan), 80G (donations), and 80TTA (savings account interest).',
  },
  {
    q: 'How is tax calculated under the old tax regime?',
    a: 'Tax under the old regime is calculated by: (1) computing gross total income from salary, business, capital gains, house property, and other sources, (2) subtracting exemptions like HRA and standard deduction of Rs 50,000, (3) subtracting Chapter VI-A deductions (80C, 80D, 80CCD(1B), 80E, 80G, etc.), (4) subtracting home loan interest under Section 24(b) up to Rs 2 lakh, (5) applying the applicable slab rates based on age, (6) applying Section 87A rebate if taxable income is Rs 5 lakh or less, (7) adding surcharge if income exceeds Rs 50 lakh, and (8) adding 4% health and education cess.',
  },
  {
    q: 'Is the old tax regime better for salaried employees?',
    a: 'The old tax regime is generally better for salaried employees who have significant deductions and exemptions. If your total deductions (80C, 80D, HRA, home loan interest, NPS) exceed approximately Rs 3-4 lakh, the old regime typically results in lower tax. It is especially beneficial for those paying HRA in metro cities, paying home loan interest, or making full use of Section 80C and 80D limits.',
  },
  {
    q: 'Can I claim HRA exemption under the old tax regime?',
    a: 'Yes, HRA exemption under Section 10(13A) is available under the old tax regime. The exemption is the minimum of three amounts: actual HRA received from employer, 50% of basic salary for metro cities (40% for non-metros), and actual rent paid minus 10% of basic salary. This can substantially reduce taxable income for salaried employees living in rented accommodation.',
  },
  {
    q: 'What is Section 87A rebate under the old tax regime?',
    a: 'Under the old tax regime, Section 87A provides a rebate of up to Rs 12,500 if the total taxable income does not exceed Rs 5 lakh. The rebate equals the lower of the actual tax payable or Rs 12,500. This effectively makes income up to Rs 5 lakh tax-free under the old regime. Note that the rebate limit is significantly lower than the Rs 60,000 rebate available under the new regime for incomes up to Rs 12 lakh.',
  },
  {
    q: 'What is the maximum 80C deduction under the old regime?',
    a: 'The maximum deduction under Section 80C is Rs 1.5 lakh per financial year. This covers investments in PPF, ELSS mutual funds, EPF, tax-saving fixed deposits (5-year), NSC, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees for up to two children, and principal repayment of home loan. An additional Rs 50,000 deduction is available under Section 80CCD(1B) for NPS contributions, over and above the Rs 1.5 lakh 80C limit.',
  },
  {
    q: 'Can I switch from the old regime to the new regime?',
    a: 'Yes, salaried individuals can switch between the old and new tax regimes each financial year. The choice is made at the time of filing the ITR. However, if you have business or professional income, the choice is a one-time decision and you cannot switch back once you opt for the new regime, unless you cease to have business income.',
  },
  {
    q: 'What is the standard deduction under the old tax regime?',
    a: 'The standard deduction under the old tax regime is Rs 50,000 for salaried employees and pensioners. This replaces the earlier transport allowance (Rs 19,200) and medical reimbursement (Rs 15,000). The standard deduction under the new regime is higher at Rs 75,000 for FY 2026-27.',
  },
  {
    q: 'How does home loan tax benefit work under the old regime?',
    a: 'Under the old tax regime, home loan borrowers get two tax benefits: principal repayment up to Rs 1.5 lakh is deductible under Section 80C, and interest payment up to Rs 2 lakh is deductible under Section 24(b) for a self-occupied property. For let-out properties, the entire interest is deductible without any upper limit, though it is subject to the house property income computation rules.',
  },
  {
    q: 'What is the maximum income to pay zero tax under the old regime?',
    a: 'Under the old regime, taxable income up to Rs 5 lakh results in zero tax liability after the Section 87A rebate of Rs 12,500. For salaried employees with the standard deduction of Rs 50,000 and some 80C investments, the actual salary that results in zero tax can be higher. For example, a salaried individual earning Rs 7.5 lakh with Rs 1.5 lakh in 80C investments and Rs 50,000 standard deduction would have a taxable income of Rs 5.5 lakh, resulting in tax of approximately Rs 15,600 after rebate, which is still relatively low.',
  },
  {
    q: 'Is Section 80C available under the old tax regime?',
    a: 'Yes, Section 80C is available only under the old tax regime. You can claim up to Rs 1.5 lakh for EPF, PPF, ELSS, life insurance, tuition fees and home loan principal. NPS adds a separate Rs 50,000 under Section 80CCD(1B).',
  },
  {
    q: 'How much tax do I pay on Rs 10 lakh income under the old regime?',
    a: 'With only the Rs 50,000 standard deduction, tax on Rs 10 lakh is Rs 1,06,600 including cess. Taxable income is Rs 9.5 lakh, slab tax is Rs 1,02,500 and cess adds Rs 4,100. Every extra deduction you claim lowers this figure.',
  },
  {
    q: 'How much tax do I pay on Rs 12 lakh income under the old regime?',
    a: 'With only the standard deduction, tax on Rs 12 lakh is Rs 1,63,800 including cess. Adding a Rs 1.5 lakh Section 80C investment cuts it to Rs 1,17,000. That is a saving of Rs 46,800 at the 30 per cent slab.',
  },
  {
    q: 'What is the basic exemption limit under the old tax regime?',
    a: 'The basic exemption limit under the old regime depends on age. It is Rs 2.5 lakh below 60, Rs 3 lakh for senior citizens aged 60 to 80, and Rs 5 lakh for those above 80. Income up to the limit attracts no tax.',
  },
  {
    q: 'Is the Section 87A rebate available above Rs 5 lakh under the old regime?',
    a: 'No, the Section 87A rebate is lost once taxable income crosses Rs 5 lakh under the old regime. The rebate is capped at Rs 12,500 and there is no marginal relief above the limit. Deductions can bring taxable income back under Rs 5 lakh.',
  },
  {
    q: 'Does health and education cess apply under the old tax regime?',
    a: 'Yes, a 4 per cent health and education cess applies to the total of slab tax and surcharge. It is added after the Section 87A rebate. The calculator shows cess as a separate line in the result panel.',
  },
  {
    q: 'How does surcharge work under the old tax regime?',
    a: 'Surcharge applies only when total income exceeds Rs 50 lakh under the old regime. The rates are 10 per cent above Rs 50 lakh, 15 per cent above Rs 1 crore, 25 per cent above Rs 2 crore and 37 per cent above Rs 5 crore. Cess is then charged on tax plus surcharge.',
  },
  {
    q: 'Can senior citizens claim extra deductions under the old regime?',
    a: 'Yes, senior citizens get a higher exemption limit and a few extra deductions under the old regime. Section 80TTB allows up to Rs 50,000 on interest from deposits, and Section 80D allows a higher health insurance limit. These benefits are not available under the new regime.',
  },
  {
    q: 'Do I need to tell my employer which regime I choose?',
    a: 'Yes, you should declare your regime to your employer at the start of the financial year so TDS is deducted correctly. Salaried taxpayers can still switch regimes when filing the return. The final tax is settled in the ITR.',
  },
  {
    q: 'Can I claim HRA on rent paid to my parents under the old regime?',
    a: 'Yes, rent paid to parents qualifies for HRA exemption if the payment is genuine and documented. Your parents must declare the rent as income in their own return. Keep rent receipts and bank transfer proofs ready.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product connects real financial accounts through the Account Aggregator framework and automates financial decisions. All calculators on Fermor are free to use.',
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
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Old Tax Regime Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/old-tax-regime-calculator',
  description: 'Calculate income tax under the old tax regime for FY 2026-27. Features Section 80C, 80D, HRA, NPS, home loan interest deductions, age-based slabs, and comprehensive deduction management.',
  featureList: [
    'Old Tax Regime computation with age-based slabs',
    'Section 80C, 80D, 80CCD(1B) deduction support',
    'HRA exemption calculator (metro and non-metro)',
    'Home loan interest deduction under Section 24(b)',
    'Section 87A rebate detection',
    'Surcharge and cess calculation',
    'Monthly TDS estimation',
    'Multi-currency support',
    'LocalStorage persistence of all inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE,
  dateModified: PAGE_DATE,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Tax Under the Old Tax Regime',
  description: 'Calculate your income tax under India old tax regime for FY 2026-27 with deductions using Fermor free calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Old Tax Regime Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Your Annual Income',
      text: 'Enter your gross annual salary from your Form 16 and add any other income from interest, rental income, freelance earnings, or capital gains.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Select Age Category',
      text: 'Choose your age category: below 60 years (general taxpayer), senior citizen (60 to 80 years), or super senior citizen (80 years and above). This determines which tax slabs apply under the old regime.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add Your Deductions and Exemptions',
      text: 'Enter Section 80C investments (PPF, ELSS, EPF, life insurance, etc.), health insurance premiums under 80D, HRA details if living on rent, home loan interest, NPS contributions, and other applicable deductions like 80E and 80G.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review Your Tax Liability',
      text: 'The calculator shows total tax, effective tax rate, Section 87A rebate (if applicable), surcharge, cess, and monthly TDS. A deduction break down shows how each deduction contributed to reducing your tax.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Old Tax Regime Calculator', item: 'https://fermor.in/calculators/old-tax-regime-calculator' },
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
    'Old Tax Regime India',
    'Income Tax India',
    'Section 80C Deductions',
    'HRA Exemption',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'Income Tax Act',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Old Tax Regime Calculator FY 2026-27: Free Online Tax Calculator',
  url: 'https://fermor.in/calculators/old-tax-regime-calculator',
  datePublished: PAGE_DATE,
  dateModified: PAGE_DATE,
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
      name: 'Old Tax Regime',
      alternateName: 'Old Tax Regime India FY 2026-27',
      description: 'The old tax regime is the traditional income tax system that allows taxpayers to claim deductions under Section 80C, 80D, HRA exemption, and other Chapter VI-A deductions while being taxed at higher progressive slab rates.',
      inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Income Tax and Personal Finance Terms', url: 'https://fermor.in/calculators' },
      sameAs: [
        'https://en.wikipedia.org/wiki/Income_tax_in_India',
        'https://www.wikidata.org/wiki/Q1331870',
      ],
    },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried taxpayers, senior citizens, self-employed individuals, and chartered accountants computing old regime tax liability for FY 2026-27',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-old-tax-regime', name: 'What Is the Old Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-slabs', name: 'Old Tax Regime Slabs FY 2026-27' },
    { '@type': 'WebPageElement', cssSelector: '#section-87a-rebate', name: 'Section 87A Rebate Under Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#old-regime-deductions', name: 'Old Regime Deductions Overview' },
    { '@type': 'WebPageElement', cssSelector: '#tax-calculation', name: 'Tax Calculation Under Old Regime' },
    { '@type': 'WebPageElement', cssSelector: '#new-vs-old-regime', name: 'Old Regime vs New Regime Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#maximize-savings', name: 'How to Maximize Old Regime Tax Savings' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use-calculator', name: 'How to Use the Old Tax Regime Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Old Tax Regime',
  alternateName: 'Old Tax Regime India',
  description: 'The old tax regime is the pre-2020 income tax system that allows full deductions and exemptions under the Income Tax Act, including Section 80C, 80D, HRA, and home loan benefits.',
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

export default async function OldTaxRegimeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <OldTaxRegimeClient />
    </>
  );
}

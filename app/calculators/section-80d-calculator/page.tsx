import type { Metadata } from 'next';
import Section80DClient from './Section80DClient';

const PAGE_DATE_PUBLISHED = '2026-07-06';
const PAGE_DATE_MODIFIED = '2026-07-06';

export const metadata: Metadata = {
  title: 'Section 80D Calculator: Free Health Insurance Tax Deduction Calculator India',
  description: 'Free Section 80D calculator for India. Calculate health insurance tax deduction for self, family, and parents. Know your 80D limit: Rs 25,000, Rs 50,000, or Rs 1 lakh. Free to use.',
  keywords: [
    'section 80d calculator',
    'section 80d',
    '80d deduction',
    '80d deduction limit',
    '80d in income tax',
    'deduction under 80d',
    'deduction under section 80d',
    'tax deduction under section 80d',
    '80d medical insurance',
    'health insurance 80d',
    '80d tax benefit',
    '80d limit',
    '80d max limit',
    '80d for senior citizen',
    '80d deduction for senior citizen',
    'preventive health checkup 80d',
    'preventive health checkup deduction',
    '80d exemption',
    '80d medical expenditure',
    '80d deduction in new tax regime',
    '80d in new tax regime',
    '80d new tax regime',
    'health insurance tax benefit 80d',
    'mediclaim insurance 80d',
    'section 80d of income tax act 1961',
    'medical expenditure for senior citizen parents',
    'sec 80d',
    '80d section income tax',
    'health insurance 80d limit',
    '80 d tax benefit',
    '80d benefit',
    'tax planning',
    'income tax deduction',
    '80d deductions',
    'mediclaim deduction',
    '80 d deduction',
    '80 d income tax',
    '80 d of income tax act',
    '80d deduction in respect of health insurance premia',
    '80d deduction limit for parents',
    '80d deduction list',
    '80d exemption limit',
    '80d income tax act',
    '80d max deduction',
    '80d section of income tax act',
    '80d tax deduction',
    '80d tax exemption',
    '80d tax exemption limit',
    '80c and 80d',
    '80d of income tax act 1961',
  ],
  openGraph: {
    title: 'Section 80D Calculator: Health Insurance Tax Deduction - Fermor',
    description: 'Calculate your Section 80D health insurance tax deduction. Supports self+family, parents, senior citizens, preventive checkup, and uninsured parents medical expenditure. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/section-80d-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-section-80d-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Section 80D Calculator - Fermor',
    description: 'Free 80D deduction calculator. Calculate health insurance tax savings for self, family, and parents under old tax regime.',
    images: ['https://fermor.in/og-section-80d-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/section-80d-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India.',
  knowsAbout: ['Section 80D', 'Health Insurance Tax Deduction', 'Preventive Health Checkup', 'Senior Citizen Tax Benefit', 'Old Tax Regime', 'Income Tax India', 'Mediclaim Deduction', 'Medical Expenditure Deduction'],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is Section 80D of the Income Tax Act?', acceptedAnswer: { '@type': 'Answer', text: 'Section 80D of the Income Tax Act, 1961 allows individuals and HUFs to claim a deduction for health insurance premiums paid for self, spouse, children, and parents. The deduction is available only under the old tax regime. The maximum deduction ranges from Rs 25,000 to Rs 1 lakh depending on whether you or your parents are senior citizens (60 years or above).' } },
    { '@type': 'Question', name: 'What is the maximum deduction under Section 80D?', acceptedAnswer: { '@type': 'Answer', text: 'The maximum deduction under Section 80D is Rs 1 lakh per year: Rs 50,000 for self+family (if you or spouse is 60+) plus Rs 50,000 for parents (if parents are 60+). If neither you nor your parents are senior citizens, the combined maximum is Rs 50,000 (Rs 25,000 + Rs 25,000). Preventive health checkup of up to Rs 5,000 is included within these limits.' } },
    { '@type': 'Question', name: 'Can I claim 80D deduction for health insurance for parents?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can claim 80D deduction for health insurance premiums paid for your parents, whether they are dependent on you or not. If your parents are below 60 years, the limit is Rs 25,000. If they are 60 or above (senior citizens), the limit is Rs 50,000. This is in addition to the deduction for your own and your family premium.' } },
    { '@type': 'Question', name: 'What is the 80D deduction limit for senior citizens?', acceptedAnswer: { '@type': 'Answer', text: 'For senior citizens (individuals aged 60 or above), the Section 80D deduction limit is Rs 50,000 per year. This higher limit applies separately for your own/family coverage (if you or your spouse is 60+) and for your coverage for parents (if parents are 60+). The combined maximum for both brackets at senior citizen rates is Rs 1 lakh.' } },
    { '@type': 'Question', name: 'Is preventive health checkup deductible under Section 80D?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A preventive health checkup of up to Rs 5,000 per year qualifies for deduction under Section 80D. Crucially, this Rs 5,000 is part of (not in addition to) the overall limit of Rs 25,000 or Rs 50,000. So if you have paid Rs 20,000 in insurance premiums, you can claim an additional Rs 5,000 for preventive checkup to reach Rs 25,000 total.' } },
    { '@type': 'Question', name: 'What is Section 80D deduction for uninsured senior citizen parents?', acceptedAnswer: { '@type': 'Answer', text: 'If your parents are senior citizens (60+) and do not have health insurance, you can claim a deduction of up to Rs 50,000 for actual medical expenses incurred for them under Section 80D. This is specifically for medical expenditure when no insurance premium has been paid. Cash payments for these expenses are not allowed. The expenditure must be through digital payment methods per CBDT rules.' } },
    { '@type': 'Question', name: 'Can I claim 80D deduction under the new tax regime?', acceptedAnswer: { '@type': 'Answer', text: 'No. Section 80D deductions for health insurance premiums are not available under the new tax regime. If you opt for the new tax regime (which has lower slab rates and no deductions), you cannot claim any deduction under Section 80D. The deduction is only available if you file under the old tax regime.' } },
    { '@type': 'Question', name: 'What is the 80D deduction limit for non-senior citizen parents?', acceptedAnswer: { '@type': 'Answer', text: 'If your parents are below 60 years of age, the deduction limit for their health insurance premium under Section 80D is Rs 25,000 per year. This is separate from the Rs 25,000 limit for your own and your family (spouse and children) health insurance. Combined, you can claim up to Rs 50,000 if neither you nor your parents are senior citizens.' } },
    { '@type': 'Question', name: 'How do I claim Section 80D when filing my ITR?', acceptedAnswer: { '@type': 'Answer', text: 'To claim Section 80D deduction in your ITR, enter the premium amounts in the respective fields under "Deductions under Chapter VI-A" in ITR-1 or ITR-2. Keep your insurance premium receipts and policy documents ready. For preventive health checkup, the actual bills suffice. For senior citizen medical expenditure for parents, digital payment proofs are required. The employer does not always reflect 80D in Form 16. You must claim it directly in your ITR.' } },
    { '@type': 'Question', name: 'Does cash payment qualify for 80D deduction?', acceptedAnswer: { '@type': 'Answer', text: 'Health insurance premiums paid in cash do not qualify for Section 80D deduction. All premium payments must be made through non-cash modes such as cheque, demand draft, credit card, debit card, net banking, or UPI. Only preventive health checkup expenses up to Rs 5,000 may be paid in cash and still be eligible for deduction.' } },
    { '@type': 'Question', name: 'Can I claim 80D for my spouse and children?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Rs 25,000 (or Rs 50,000 for senior citizens) limit for self+family under Section 80D covers health insurance premiums paid for yourself, your spouse, and your dependent children. Non-dependent children are not covered. The premium can be under one family floater plan or individual plans; both qualify.' } },
    { '@type': 'Question', name: 'What is the difference between 80C and 80D?', acceptedAnswer: { '@type': 'Answer', text: 'Section 80C allows deductions for investments and expenses like PPF, ELSS, EPF, NSC, and tuition fees, up to Rs 1.5 lakh. Section 80D specifically covers health insurance premiums and medical expenditure for senior citizen parents, with a separate limit of Rs 25,000 to Rs 1 lakh. The 80D limit is over and above the 80C limit. Claiming 80D does not reduce your 80C capacity.' } },
    { '@type': 'Question', name: 'Can I claim Section 80D for my in-laws?', acceptedAnswer: { '@type': 'Answer', text: 'No, Section 80D covers your own parents but not the parents of your spouse. Your spouse can claim it for their own parents in their own return. Each taxpayer claims only for the people the section allows.' } },
    { '@type': 'Question', name: 'Does a top-up or super top-up health policy qualify under Section 80D?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, the premium paid for a top-up or super top-up health policy qualifies under Section 80D. It counts toward the same overall limit as your base policy. Pay the premium by a non-cash mode to claim it.' } },
    { '@type': 'Question', name: 'Is the Section 80D limit per policy or per person?', acceptedAnswer: { '@type': 'Answer', text: 'The Section 80D limit applies per category, not per policy. One limit covers you, your spouse and children together, and a separate limit covers your parents. Multiple policies in the same category share one limit.' } },
    { '@type': 'Question', name: 'How is 80D deduction handled for a multi-year health insurance premium?', acceptedAnswer: { '@type': 'Answer', text: 'For a multi-year policy paid upfront, the deduction is spread across the years of cover. Each year you claim a proportionate share of the premium. The annual limit of Rs 25,000 or Rs 50,000 still applies.' } },
    { '@type': 'Question', name: 'Can a HUF claim Section 80D?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, a Hindu Undivided Family can claim Section 80D for premium paid on any of its members. The limit is Rs 25,000, or Rs 50,000 if the insured member is a senior citizen. Payment must be made from HUF funds.' } },
    { '@type': 'Question', name: 'Can I claim Section 80D on a group health policy paid by my employer?', acceptedAnswer: { '@type': 'Answer', text: 'No, premium paid by your employer is not available as your Section 80D deduction. You can claim only the premium you pay from your own money. Any extra personal policy you buy remains eligible.' } },
    { '@type': 'Question', name: 'Which documents do I need to claim Section 80D?', acceptedAnswer: { '@type': 'Answer', text: 'Keep the premium receipt, the policy document and proof of non-cash payment. Contributions to the Central Government Health Scheme also qualify under Section 80D. Preventive checkup bills are enough for that portion.' } },
    { '@type': 'Question', name: 'Is there a higher 80D limit for super senior citizens above 80?', acceptedAnswer: { '@type': 'Answer', text: 'No, the Section 80D limit stays at Rs 50,000 for all senior citizens aged 60 and above. Super senior citizens with no insurance can claim medical expenses up to the same Rs 50,000. There is no separate higher slab for age 80 and above.' } },
    { '@type': 'Question', name: 'How much tax does Section 80D save?', acceptedAnswer: { '@type': 'Answer', text: 'The saving depends on your tax slab. A Rs 50,000 deduction saves Rs 15,600 at the 30 per cent slab and Rs 10,400 at the 20 per cent slab, both including 4 per cent cess. Use the calculator to see the exact saving for your income.' } },
    { '@type': 'Question', name: 'Can I claim the full premium if I buy a health policy in March?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, you can claim the full premium paid within the financial year, even if you buy the policy in March. The deduction depends on payment date, not on how many months the cover ran. The limit of Rs 25,000 or Rs 50,000 still applies.' } },
    { '@type': 'Question', name: 'What is Fermor?', acceptedAnswer: { '@type': 'Answer', text: 'Fermor is a financial platform for India with free calculators for tax planning, loans, investments, and retirement. A free account is available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and execute the financial decisions most people know they should make but never get around to.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Section 80D Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/section-80d-calculator',
  description: 'Free Section 80D health insurance tax deduction calculator. Calculate deductions for self+family and parents under old tax regime, with support for senior citizens, preventive health checkup, and uninsured senior medical expenditure for parents.',
  featureList: ['Self + Family Premium Deduction', 'Parents Premium Deduction', 'Senior Citizen Higher Limit (Rs 50,000)', 'Preventive Health Checkup (Rs 5,000)', 'Uninsured Senior Parents Medical Expenditure', 'Tax Saved Calculation (Old Regime)', 'Donut Chart: Tax Saved vs Tax Paid', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Calculate Section 80D Tax Deduction', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Section 80D Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your annual income', text: 'Enter your gross annual income from all sources for the financial year under the old tax regime.' },
    { '@type': 'HowToStep', position: 2, name: 'Add self and family premium', text: 'Enter the health insurance premium you paid for yourself, spouse, and dependent children. Select if you or your spouse is 60 or above. This raises the limit to Rs 50,000.' },
    { '@type': 'HowToStep', position: 3, name: 'Add parents premium or medical expenditure', text: 'Enter the health insurance premium for your parents. If your parents are 60+ and uninsured, toggle to medical expenditure mode and enter actual medical expenses (up to Rs 50,000).' },
    { '@type': 'HowToStep', position: 4, name: 'Add preventive health checkup amount', text: 'Enter the amount paid for preventive health checkup (up to Rs 5,000). This is included within the main limit, not additional.' },
    { '@type': 'HowToStep', position: 5, name: 'Review your tax savings', text: 'The result panel shows your total 80D deduction, tax saved, and the breakdown between self+family and parents deduction.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'Section 80D', alternateName: '80D Deduction',
  description: 'Section 80D of the Income Tax Act, 1961 allows individuals to claim tax deduction on health insurance premiums paid for self, spouse, children, and parents. The limit is Rs 25,000 for non-senior and Rs 50,000 for senior citizens (60+). Only available under the old tax regime.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Tax Terms', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Income_Tax_Act,_1961'],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Section 80D Calculator: Health Insurance Tax Deduction India',
  url: 'https://fermor.in/calculators/section-80d-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Section 80D', alternateName: '80D Deduction' }],
  audience: { '@type': 'Audience', audienceType: 'Indian taxpayers, salaried employees, self-employed individuals, senior citizens', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-80d', name: 'What Is Section 80D' },
    { '@type': 'WebPageElement', cssSelector: '#80d-limits', name: 'Section 80D Deduction Limits' },
    { '@type': 'WebPageElement', cssSelector: '#who-can-claim', name: 'Who Can Claim 80D' },
    { '@type': 'WebPageElement', cssSelector: '#how-80d-calculated', name: 'How 80D Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#preventive-checkup', name: 'Preventive Health Checkup Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen-80d', name: 'Section 80D for Senior Citizens' },
    { '@type': 'WebPageElement', cssSelector: '#uninsured-parents', name: 'Medical Expenditure for Uninsured Senior Parents' },
    { '@type': 'WebPageElement', cssSelector: '#new-regime-80d', name: 'Section 80D in New Tax Regime' },
    { '@type': 'WebPageElement', cssSelector: '#claim-itr', name: 'How to Claim 80D in ITR' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: "Section 80D Calculator", item: 'https://fermor.in/calculators/section-80d-calculator' },
  ],
};

export default function Section80DPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <Section80DClient />
    </>
  );
}

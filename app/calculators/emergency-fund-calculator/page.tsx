import type { Metadata } from 'next';
import EmergencyFundCalculatorClient from './EmergencyFundCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/emergency-fund-calculator`;
  return {
    title: 'Emergency Fund Calculator: How Much to Save for Emergencies',
    description:
      'Free emergency fund calculator for India. Calculate how much you need in your emergency fund based on monthly expenses, current savings, and coverage period. Includes corpus gap analysis and savings progress tracker.',
    keywords: [
      'emergency fund calculator',
      'emergency fund calculator india',
      'emergency savings calculator',
      'how much emergency fund do i need',
      'rainy day fund calculator',
      'emergency corpus calculator',
      'emergency fund goal calculator',
      '3 month emergency fund calculator',
      '6 month emergency fund calculator',
      'emergency fund savings calculator',
      'emergency fund target calculator',
      'financial safety net calculator',
      'emergency savings goal calculator',
      'emergency fund planner india',
      'emergency fund gap calculator',
      'monthly expenses emergency fund',
      'job loss fund calculator',
      'emergency fund tracker',
      'ideal emergency fund india',
      'financial emergency calculator',
      'emergency fund amount calculator',
      'emergency fund recommendation',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Emergency Fund Calculator: How Much to Save for Emergencies',
      description:
        'Calculate your ideal emergency fund target based on monthly expenses and coverage period. Free for India.',
      images: ['https://fermor.in/og-emergency-fund-calculator.png'],
    },
    openGraph: {
      title: 'Emergency Fund Calculator: How Much to Save for Emergencies',
      description:
        'Free emergency fund calculator for India. Calculate your emergency fund target, track your savings progress, and find out how much more you need to save. Includes corpus gap analysis.',
      type: 'website',
      url: 'https://fermor.in/calculators/emergency-fund-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-emergency-fund-calculator.png', width: 1200, height: 630, alt: 'Fermor Emergency Fund Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-16';
const PAGE_DATE_PUBLISHED = '2026-07-06';

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
    'Emergency Fund',
    'Emergency Savings',
    'Personal Finance India',
    'Financial Planning',
    'Rainy Day Fund',
    'Debt Management',
    'Income Protection',
    'Budgeting India',
    'Contingency Fund',
    'Liquid Savings',
  ],
};

const faqs = [
  { q: 'How much emergency fund do I need in India?', a: 'Financial planners recommend 3 to 6 months of essential living expenses for most salaried individuals. For single-income households or self-employed professionals, 6 to 12 months is more appropriate. A 30-year-old salaried employee in Mumbai with monthly expenses of Rs 50,000 should target an emergency fund of Rs 1.5 to Rs 3 lakh. The exact number depends on your job stability, number of income earners, and monthly essential costs.' },
  { q: 'What expenses should I include in my emergency fund calculation?', a: 'Include only essential expenses: rent or home loan EMI, groceries and household supplies, utility bills (electricity, water, internet), insurance premiums, school or college fees, minimum loan EMIs, and essential transport costs. Exclude discretionary spending like dining out, OTT subscriptions, travel, and entertainment. A good rule is to look at your bank statement from the last 3 months and identify which expenses you could not cut even during a crisis.' },
  { q: 'Where should I keep my emergency fund in India?', a: 'Keep your emergency fund in instruments that offer instant liquidity and zero risk of capital loss. The best options are a high-interest savings account (offering 3 to 7% interest), a liquid mutual fund, or a sweep-in fixed deposit that automatically converts to a savings account when funds fall below a threshold. Avoid equity-linked instruments, long-term FDs with penalty for early withdrawal, and real estate for this portion of your savings.' },
  { q: 'What is the 50-30-20 rule and how does it relate to emergency savings?', a: 'The 50-30-20 rule allocates 50% of income to needs, 30% to wants, and 20% to savings and debt repayment. The 20% savings portion should prioritise building a 3 to 6 month emergency fund before investing in long-term goals like retirement. Under this framework, a person earning Rs 60,000 per month should save Rs 12,000 monthly, with the first Rs 1.5 to Rs 3 lakh of savings directed entirely to the emergency fund before starting other investments.' },
  { q: 'How is emergency fund different from a sinking fund?', a: 'An emergency fund covers unexpected, unplanned expenses like job loss, medical emergencies, or urgent home repairs. A sinking fund is planned savings for a known future expense like annual insurance premiums, car maintenance, or a vacation. Emergency funds typically target 3 to 12 months of expenses. Sinking funds are smaller and tied to specific, predictable costs.' },
  { q: 'Should I use my emergency fund to pay off debt?', a: 'Generally no, unless the debt is at a very high interest rate like credit card debt above 30% per annum. The emergency fund is your financial safety net. Using it to pay off debt leaves you vulnerable to the next unexpected expense, which would then force you to take on more high-interest debt. A better approach is to pay minimum EMIs from your regular income and use any surplus above the emergency fund target to accelerate debt repayment.' },
  { q: 'How often should I review my emergency fund?', a: 'Review your emergency fund at least once a year or whenever you have a major life change: a job switch, marriage, childbirth, buying a home, or a significant increase or decrease in expenses. Inflation erodes the purchasing power of your emergency corpus. If your monthly expenses rise from Rs 40,000 to Rs 50,000, a 6-month fund needs to increase from Rs 2.4 lakh to Rs 3 lakh. Set a calendar reminder to review and top up annually.' },
  { q: 'What is the difference between an emergency fund and a contingency fund?', a: 'The terms are often used interchangeably, but a contingency fund is typically a smaller amount set aside for minor unexpected expenses like a phone repair or a medical copayment, usually Rs 10,000 to Rs 50,000. An emergency fund is larger, covering 3 to 12 months of essential expenses to handle major disruptions like job loss or a medical emergency. Most financial planners suggest having both: a small contingency buffer plus a full emergency fund.' },
  { q: 'Can I invest my emergency fund in mutual funds?', a: 'Only liquid mutual funds and overnight funds are suitable for emergency funds. These funds invest in money market instruments with maturities of up to 91 days and offer instant redemption on most platforms. Avoid equity mutual funds, mid-cap or small-cap funds, sectoral funds, and credit risk funds. While the returns are higher, the volatility and withdrawal timelines make them unsuitable for money you might need at short notice.' },
  { q: 'How much emergency fund does a self-employed person need in India?', a: 'Self-employed individuals and freelancers should target 9 to 12 months of essential expenses because their income is less predictable than salaried employees. A freelancer earning an average of Rs 80,000 per month with essential expenses of Rs 45,000 should aim for an emergency fund of Rs 4.05 to Rs 5.4 lakh. The fund should be larger if the nature of the work has seasonal fluctuations or if the industry is cyclical.' },
  { q: 'Should I factor health insurance into my emergency fund planning?', a: 'Yes. An adequate health insurance policy reduces the size of the emergency fund you need because a major medical expense is the most common reason people deplete their savings. If you have a family health insurance cover of Rs 10 lakh or more, your emergency fund can focus on income replacement rather than medical costs. Without adequate health insurance, your emergency fund should be at the higher end of the 6 to 12 month range.' },
  { q: 'What is the emergency fund rule for retirees in India?', a: 'Retirees should maintain a larger emergency fund of 12 to 24 months of expenses because they no longer have employment income to fall back on. A retired couple in a metro city with monthly expenses of Rs 35,000 should have Rs 4.2 to Rs 8.4 lakh in liquid savings. The fund should be in a savings account or sweep-in FD that earns some interest while remaining fully accessible. Health insurance becomes even more critical for retirees to prevent medical expenses from draining the emergency corpus.' },
  { q: 'Does inflation affect my emergency fund?', a: 'Yes. Review and top up your emergency fund annually to account for inflation. If your essential expenses rise 6% per year, a Rs 3 lakh emergency fund today needs to be Rs 3.18 lakh next year to maintain the same purchasing power. Set an annual calendar reminder to adjust your target fund amount.' },
  { q: 'How does an emergency fund differ for a couple with dependents versus a single person?', a: 'A single person with no dependents can often manage with the lower end of the 3 to 6 month range, since only their own expenses need covering. A couple with children or elderly parents to support should target the higher end, or more, since a job loss or medical event affects more people who depend on the same income.' },
  { q: 'Can I rely on a credit card instead of an emergency fund?', a: 'No. A credit card is a source of debt, not savings, and Indian credit card interest typically runs 36 to 45% per annum on unpaid balances. Relying on credit during a job loss or medical emergency, when income may already be disrupted, risks turning a temporary setback into long-term high-interest debt.' },
  { q: 'What is the difference between an emergency fund and term insurance?', a: 'An emergency fund is liquid savings you draw down for any short-term disruption, from job loss to a car repair, and it remains yours whether or not anything goes wrong. Term insurance pays a lump sum only if the insured person dies, replacing lost income for dependents. The two are complementary: an emergency fund covers near-term shocks, term insurance protects against the loss of the earner entirely.' },
  { q: 'Should NRIs maintain an emergency fund in India, abroad, or both?', a: 'NRIs with financial dependents or ongoing expenses in India (an EMI, aging parents, a property) should keep a rupee emergency fund in an NRE or NRO account for those specific obligations. A separate emergency fund in the country of residence covers day-to-day living costs there, since currency conversion and international transfer delays make a single fund impractical for both.' },
  { q: 'Is my emergency fund safe if the bank fails?', a: 'Up to Rs 5 lakh per depositor per bank is protected. The Deposit Insurance and Credit Guarantee Corporation (DICGC), an RBI subsidiary, insures both principal and interest up to this limit. If your emergency fund is larger than Rs 5 lakh, split it across two banks so the entire amount stays covered.' },
  { q: 'Can I withdraw from my EPF instead of building a separate emergency fund?', a: 'Only partially, and it should not replace a liquid emergency fund. Under EPFO rules effective from October 2025, members can withdraw up to 75% of their EPF balance after one month of unemployment, with the remaining 25% locked until 12 months of continued unemployment. The withdrawal process also takes days, so it works as a backup layer, not a first line of defense.' },
  { q: 'Is the interest my emergency fund earns taxable?', a: 'Yes, savings account and FD interest is taxable, though a portion is deductible under the old regime. Section 80TTA allows a deduction of up to Rs 10,000 on savings account interest for individuals below 60, while Section 80TTB raises this to Rs 50,000 for senior citizens and also covers FD and RD interest. Neither deduction applies under the new tax regime.' },
  { q: 'Can I use an overdraft against my FD instead of keeping a separate emergency fund?', a: 'An overdraft against FD lets you borrow up to 90% of the FD value at about 1 to 2% above the FD rate, without breaking the deposit, and is a reasonable backup facility. It still requires an existing FD to lien against and a same-day approval step, so it works better alongside a liquid emergency fund than as a full replacement for one.' },
  { q: 'How much emergency fund should I have if I am on a variable or commission-based income?', a: 'Aim for 9 to 12 months of essential expenses, similar to self-employed professionals, since a variable or commission-based income can swing sharply month to month. Build the fund during higher-earning months rather than spreading contributions evenly, so a slow month does not force you to skip saving entirely.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Emergency Fund Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/emergency-fund-calculator',
  description: 'Calculate the ideal emergency fund size based on monthly expenses, current savings, and coverage period. Includes corpus gap analysis, savings progress tracker, and coverage recommendation.',
  featureList: [
    'Emergency Fund Target Calculator',
    'Corpus Gap Analysis',
    'Savings Progress Tracker',
    'Coverage Period Recommendation',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (3M, 6M, 9M, 12M)',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Emergency Fund Calculator', item: 'https://fermor.in/calculators/emergency-fund-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Emergency Fund Target',
  description: 'Step-by-step guide to calculate how much emergency fund you need based on your monthly expenses and coverage period.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Emergency Fund Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Calculate your monthly essential expenses',
      text: 'Add up your essential monthly costs: rent or EMI, groceries, utilities, insurance premiums, loan EMIs, school fees, and transport. Exclude discretionary spending like dining out and entertainment.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Decide your coverage period',
      text: 'Choose how many months of expenses you want your emergency fund to cover. Salaried employees with stable jobs can choose 3 to 6 months. Self-employed professionals should choose 6 to 12 months.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter your current emergency savings',
      text: 'Add up the money you already have in accessible savings accounts, liquid funds, or sweep-in FDs. Enter this amount to see if you have a gap or a surplus.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check your results and take action',
      text: 'The calculator shows your target fund and the gap you need to fill. Set up a monthly auto-transfer to your emergency savings account until you reach the target.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Emergency Fund',
  alternateName: 'Emergency Savings',
  description: 'A readily accessible corpus of money set aside to cover unexpected expenses or income disruptions such as job loss, medical emergencies, or urgent home repairs. Financial planners typically recommend 3 to 6 months of essential living expenses for salaried individuals and 6 to 12 months for self-employed professionals.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Personal Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Emergency_fund',
    'https://www.wikidata.org/wiki/Q5375751',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Emergency Fund Calculator: How Much to Save for Emergencies',
  description: 'Free emergency fund calculator for India. Calculate your emergency fund target based on monthly expenses, current savings, and coverage period. Includes corpus gap analysis.',
  url: 'https://fermor.in/calculators/emergency-fund-calculator',
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
    { '@type': 'DefinedTerm', name: 'Emergency Fund', alternateName: 'Emergency Savings' },
    { '@type': 'DefinedTerm', name: 'Contingency Fund' },
    { '@type': 'DefinedTerm', name: 'Rainy Day Fund' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, self-employed professionals, freelancers, retirees, families',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-emergency-fund', name: 'What Is an Emergency Fund' },
    { '@type': 'WebPageElement', cssSelector: '#how-much-emergency-fund', name: 'How Much Emergency Fund Do You Need' },
    { '@type': 'WebPageElement', cssSelector: '#where-to-keep-emergency-fund', name: 'Where to Keep Your Emergency Fund' },
    { '@type': 'WebPageElement', cssSelector: '#emergency-fund-vs-savings', name: 'Emergency Fund vs Other Savings' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-build-emergency-fund', name: 'How to Build an Emergency Fund' },
    { '@type': 'WebPageElement', cssSelector: '#dicgc-insurance', name: 'Is Your Emergency Fund Safe in a Bank' },
    { '@type': 'WebPageElement', cssSelector: '#epf-emergency-access', name: 'Can You Use Your EPF as an Emergency Fund' },
    { '@type': 'WebPageElement', cssSelector: '#tax-on-emergency-fund-interest', name: 'Is Interest on Your Emergency Fund Taxable' },
    { '@type': 'WebPageElement', cssSelector: '#emergency-fund-vs-overdraft', name: 'Emergency Fund vs Overdraft Against Fixed Deposit' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Emergency Fund Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function EmergencyFundCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EmergencyFundCalculatorClient faqs={faqs} />
    </>
  );
}

import type { Metadata } from 'next';
import MonthlyBudgetCalculatorClient from './MonthlyBudgetCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/monthly-budget-calculator';
  return {
    title: 'Monthly Budget Calculator: 50/30/20 Budget Planner',
    description:
      'Free monthly budget calculator for India. Apply the 50/30/20 rule, track expenses, and find your savings rate. Covers needs, wants, and savings categories. Free to use.',
    keywords: [
      'monthly budget calculator',
      'budget calculator',
      '50/30/20 rule calculator',
      'budget planner',
      'income budget calculator',
      'expense tracker calculator',
      'personal budget calculator',
      'family budget calculator',
      'monthly expense calculator',
      'budget planning calculator',
      'zero-based budget calculator',
      'budget allocation calculator',
      'monthly income expense calculator',
      'savings rate calculator',
      'disposable income calculator',
      'monthly savings calculator',
      'household budget calculator',
      'budget breakdown calculator',
      'salary budget calculator',
      'take-home pay budget calculator',
      'monthly expenditure calculator',
      'budget allocator',
      '50 30 20 calculator',
      'needs wants savings calculator',
      'essential expenses calculator',
      '50 30 20 budget rule india',
      'personal finance budget india',
      'monthly spending plan calculator',
      'budget vs actual calculator',
      'monthly cash flow calculator',
      'income expense calculator',
      'budget tracker india',
      'salary allocation calculator',
      'weekly budget calculator',
      'annual budget calculator',
      'zero based budgeting calculator',
      'personal budget planner india',
      'money management calculator',
      'budget deficit calculator',
      'budget surplus calculator',
      'spending tracker calculator',
      'monthly finance calculator',
      'expense ratio calculator',
      'cost of living calculator india',
      'household expense calculator india',
      '50 percent needs calculator',
      'wants spending calculator',
      'savings percentage calculator',
      'disposable income calculator india',
      'income minus expenses calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Monthly Budget Calculator: 50/30/20 Budget Planner',
      description:
        'Apply the 50/30/20 budget rule, track needs vs wants, and find your savings rate. Free monthly budget planner for India.',
      images: ['https://fermor.in/og-monthly-budget-calculator.png'],
    },
    openGraph: {
      title: 'Monthly Budget Calculator: 50/30/20 Budget Planner',
      description:
        'Free monthly budget calculator for India. Apply the 50/30/20 rule, track expenses vs budget, and calculate your savings rate. Three modes: rule-based, custom budget, and budget vs actual.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-monthly-budget-calculator.png', width: 1200, height: 630, alt: 'Monthly Budget Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-21';
const PAGE_DATE_MODIFIED  = '2026-07-22';

const faqItems = [
  {
    q: 'What is the 50/30/20 budgeting rule?',
    a: 'The 50/30/20 rule is a personal budgeting framework that divides your after-tax monthly income into three categories: 50% for needs (rent, groceries, utilities, loan EMIs), 30% for wants (dining out, entertainment, travel, subscriptions), and 20% for savings and investments (SIP, PPF, emergency fund). It was popularized by US Senator Elizabeth Warren and works well for Indian middle-class incomes between Rs 30,000 and Rs 2,00,000 per month.',
  },
  {
    q: 'How do I make a monthly budget in India?',
    a: 'To make a monthly budget in India: (1) List your monthly take-home salary after EPF and income tax deductions. (2) Categorize all monthly expenses into needs (fixed and essential) and wants (discretionary). (3) Subtract total expenses from income to find your savings potential. (4) Allocate at least 20% to savings: SIP for wealth creation, liquid fund or sweep FD for emergency fund, and EPF/PPF for retirement. Review your budget every quarter and after any income change.',
  },
  {
    q: 'What percentage of salary should go to rent in India?',
    a: 'Financial advisors in India recommend keeping rent below 25% to 30% of your take-home monthly salary. For a Rs 50,000 take-home salary, this means rent below Rs 12,500 to Rs 15,000. In metro cities like Mumbai or Bengaluru, rents often exceed 35-40% for many earners, which compresses the budget in other categories. If your rent exceeds 30%, reduce discretionary spending proportionally to maintain a minimum 10-15% savings rate.',
  },
  {
    q: 'What is a good savings rate on a monthly salary in India?',
    a: 'A savings rate of 20% or above is considered good for Indian salaried professionals. However, the right savings rate depends on your age and financial goals. In your 20s, even 10-15% invested in SIP earns substantial compounding over 30 years. In your 30s, aim for 20-25% if you have home loan EMIs. In your 40s, target 30-35% to build sufficient retirement corpus. The government provides tax incentives through EPF, PPF, and Section 80C investments to boost effective savings rates.',
  },
  {
    q: 'How much should I save from Rs 50,000 salary?',
    a: 'From a Rs 50,000 take-home salary, the 50/30/20 rule suggests saving Rs 10,000 per month. Over 20 years at 12% CAGR (equity mutual fund SIP), Rs 10,000 monthly grows to approximately Rs 99 lakh. Prioritize in this order: (1) Rs 3,000 to emergency fund until you have 6 months of expenses saved; (2) Rs 3,500 to SIP in an index fund; (3) Rs 1,500 to PPF; (4) Rs 2,000 flexible. This simple allocation addresses emergency preparedness, long-term wealth, and tax efficiency.',
  },
  {
    q: 'What is zero-based budgeting?',
    a: 'Zero-based budgeting assigns every rupee of income a specific purpose until income minus all allocations equals zero. Unlike the 50/30/20 rule (which sets proportions), zero-based budgeting starts from scratch each month and justifies every expense. The process: list total monthly income, list all expenses and savings allocations, adjust until the sum equals zero. It is more disciplined than 50/30/20 but also more time-consuming. Good for people with irregular income or those trying to aggressively reduce spending.',
  },
  {
    q: 'What expenses count as needs in India?',
    a: 'In India, needs include: housing (rent or home loan EMI), groceries and food, electricity and water bills, mobile and internet bills, public transport or fuel, insurance premiums (health, term, vehicle), children\'s school fees, domestic help salary, loan EMIs on existing debt, and essential medicines. Items like OTT subscriptions, restaurant meals, gym memberships, online shopping, vacations, and entertainment are wants, not needs -- even if they feel essential.',
  },
  {
    q: 'How do I track my monthly expenses in India?',
    a: 'The most practical methods for tracking monthly expenses in India are: (1) Bank statement download + category tagging in a spreadsheet (manual but complete); (2) UPI apps like Google Pay or PhonePe show monthly summaries; (3) Account Aggregator apps that pull statements from all bank accounts with RBI-certified consent; (4) this budget calculator\'s Budget vs Actual tab where you set budget targets and enter actuals monthly. Review expenses monthly and identify which "want" categories are over budget.',
  },
  {
    q: 'What is the 50/30/20 rule for Rs 75,000 salary?',
    a: 'For a Rs 75,000 monthly take-home salary: Needs = Rs 37,500 (rent + groceries + bills + insurance + EMIs), Wants = Rs 22,500 (dining, entertainment, travel, lifestyle), Savings = Rs 15,000 (SIP, PPF, emergency fund). Practical allocation: SIP Rs 7,500 in equity index fund + Rs 3,000 PPF + Rs 3,000 emergency fund/liquid fund + Rs 1,500 term insurance premium. At 12% CAGR over 25 years, Rs 15,000 monthly SIP grows to approximately Rs 2.5 crore.',
  },
  {
    q: 'Can I save 30% of my salary in India?',
    a: 'Yes, saving 30% of your take-home salary is achievable for Indian earners in the Rs 75,000 and above range if they keep housing costs below 25%, avoid lifestyle inflation after salary hikes, and minimize discretionary expenses. For a Rs 1,00,000 take-home: Rs 30,000 savings monthly over 25 years at 12% CAGR = approximately Rs 5 crore. The challenge is the early career phase when rent, EMIs, and starting-salary constraints make 30% savings difficult. Start at whatever rate is possible and increase by 1% annually.',
  },
  {
    q: 'How much should EMI be as a percentage of salary?',
    a: 'RBI and most Indian banks use FOIR (Fixed Obligations to Income Ratio) and recommend keeping total EMIs (home loan + car loan + personal loan + credit card) below 40-50% of gross monthly income. However, for personal finance health, keeping EMIs below 35% of take-home salary is safer. For a Rs 75,000 take-home, total EMIs should not exceed Rs 26,250. If your home loan EMI alone is Rs 30,000, you are at 40% FOIR and have little room for other debt or savings.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform providing free financial calculators and a financial eligibility engine. The monthly budget calculator is part of a suite of 525+ calculators covering savings, SIP, home loans, tax, and retirement planning. Fermor is free at fermor.in.',
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

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Monthly Budget Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/monthly-budget-calculator',
  featureList: [
    '50/30/20 Budget Rule Calculator',
    'Custom Budget Builder with itemized categories',
    'Budget vs Actual Tracker with variance analysis',
    'Needs / Wants / Savings donut chart',
    'Surplus and deficit indicator',
    'Monthly savings rate calculator',
    'Budget allocation by income level',
    'Multi-currency support',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Monthly Budget Calculator', item: 'https://fermor.in/calculators/monthly-budget-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Make a Monthly Budget Using the 50/30/20 Rule',
  totalTime: 'PT3M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Monthly Budget Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your take-home income', text: 'Enter your monthly take-home salary after all deductions including EPF, professional tax, and income tax TDS. This is the amount credited to your bank account each month.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose your budgeting method', text: 'Select the 50/30/20 tab for a rule-based automatic split, or Custom Budget to enter itemized expenses across 11 categories. Use Budget vs Actual to compare your plan against what you actually spent.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust the splits to match your situation', text: 'In the 50/30/20 tab, drag the sliders to change needs, wants, and savings percentages. The total always stays at 100%. Enter real expense amounts in the Custom Budget tab.' },
    { '@type': 'HowToStep', position: 4, name: 'Read your surplus or deficit', text: 'The output shows total income, total expenses, surplus or deficit amount, and savings rate. A positive surplus means money available to invest. A deficit means expenses exceed income and categories need trimming.' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer.',
  knowsAbout: ['Personal Budgeting', '50/30/20 Rule', 'Zero-Based Budgeting', 'Monthly Savings India', 'Income Tax India', 'Personal Finance India', 'SEBI Regulations', 'AMFI Guidelines'],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Monthly Budget Calculator: 50/30/20 Budget Planner',
  url: 'https://fermor.in/calculators/monthly-budget-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Monthly Budget', alternateName: '50/30/20 Budget' },
    { '@type': 'DefinedTerm', name: 'Personal Finance', alternateName: 'Household Budget' },
    { '@type': 'DefinedTerm', name: 'Savings Rate' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian salaried employees, working professionals, families, first-time earners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-50-30-20', name: 'What Is the 50/30/20 Budget Rule?' },
    { '@type': 'WebPageElement', cssSelector: '#india-budget-examples', name: 'Monthly Budget Examples for Indian Salaries' },
    { '@type': 'WebPageElement', cssSelector: '#needs-vs-wants', name: 'Needs vs Wants in India' },
    { '@type': 'WebPageElement', cssSelector: '#zero-based-budgeting', name: 'Zero-Based Budgeting vs 50/30/20' },
    { '@type': 'WebPageElement', cssSelector: '#savings-rate', name: 'What Is a Good Savings Rate for Indians?' },
    { '@type': 'WebPageElement', cssSelector: '#budget-mistakes', name: 'Common Budget Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Budget Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq-section', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Monthly Budget',
  alternateName: '50/30/20 Rule',
  description: 'A monthly budget is a plan that allocates income across needs, wants, and savings categories for a single calendar month. The 50/30/20 rule is the most widely used budgeting framework in India and globally.',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Personal Finance Terms India', url: 'https://fermor.in/calculators' },
  sameAs: ['https://en.wikipedia.org/wiki/Budget', 'https://www.wikidata.org/wiki/Q1053804'],
};

const schemas = [faqSchema, webAppSchema, breadcrumbSchema, howToSchema, organizationSchema, webPageSchema, definedTermSchema];

export default function MonthlyBudgetCalculatorPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <MonthlyBudgetCalculatorClient faqItems={faqItems} />
    </>
  );
}

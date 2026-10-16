import type { Metadata } from 'next';
import PersonalLoanEligibilityClient from './PersonalLoanEligibilityClient';

const PAGE_DATE_PUBLISHED = '2026-06-25';
const PAGE_DATE_MODIFIED  = '2026-09-23';

export const metadata: Metadata = {
  title: 'Personal Loan Eligibility Calculator: Check by Salary & CIBIL',
  description: 'Free personal loan eligibility calculator. Check max loan by salary, CIBIL score, and EMIs. Compare 9 banks live, FOIR-adjusted. Free to use.',
  keywords: [
    'personal loan eligibility calculator',
    'how much personal loan can i get',
    'personal loan eligibility based on salary',
    'personal loan eligibility for 15000 salary',
    'personal loan eligibility for 27000 salary',
    'personal loan eligibility for 30000 salary',
    'personal loan eligibility for 50000 salary',
    'personal loan eligibility for 70000 salary',
    'sbi personal loan eligibility calculator',
    'hdfc personal loan eligibility calculator',
    'hdfc bank personal loan eligibility calculator',
    'icici personal loan eligibility calculator',
    'axis bank personal loan eligibility calculator',
    'kotak personal loan eligibility calculator',
    'bajaj finserv personal loan eligibility calculator',
    'personal loan eligibility checker',
    'personal loan eligibility check online',
    'eligibility checker loan',
    'personal loan eligibility hdfc',
    'check loan eligibility hdfc',
    'personal loan eligibility sbi',
    'personal loan eligibility icici',
    'check my personal loan eligibility',
    'salary based personal loan eligibility',
    'cibil score based personal loan eligibility',
    'hdfc bank personal loan eligibility check',
    'sbi personal loan eligibility check online',
    'bajaj finance personal loan eligibility calculator',
    'tata capital personal loan eligibility calculator',
    'indusind bank personal loan eligibility calculator',
    'personal loan emi eligibility calculator',
    'online personal loan eligibility calculator',
    'nri personal loan eligibility',
    'self employed personal loan eligibility',
    'personal loan eligibility by income',
    'foir based personal loan calculator',
  ],
  openGraph: {
    title: 'Personal Loan Eligibility Calculator: Check By Salary & CIBIL - Fermor',
    description: 'Check how much personal loan you can get on your salary. Live bank-wise eligibility comparison across 9 lenders, CIBIL-adjusted. Free to use.',
    type: 'website',
    url: 'https://fermor.in/calculators/personal-loan-eligibility-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-personal-loan-eligibility-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan Eligibility Calculator - Fermor',
    description: 'Check max eligible personal loan amount based on salary, CIBIL score, and existing EMIs. Compare 9 banks live.',
    images: ['https://fermor.in/og-personal-loan-eligibility-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/personal-loan-eligibility-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system.',
  knowsAbout: [
    'Personal Loan Eligibility',
    'FOIR Fixed Obligation to Income Ratio',
    'CIBIL Credit Score',
    'Personal Finance India',
    'Loan Amortization',
    'SEBI Regulations',
    'RBI Guidelines',
    'Indian Banking Products',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Personal Loan Eligibility Calculator', item: 'https://fermor.in/calculators/personal-loan-eligibility-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How is personal loan eligibility calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Personal loan eligibility is calculated using the FOIR (Fixed Obligation to Income Ratio) method. Available EMI = (Net Monthly Salary x FOIR%) minus Existing EMIs. The eligible loan is the maximum principal whose EMI equals the available EMI at the given rate and tenure. At Rs 50,000 salary, 50% FOIR, 11% rate, 5 years: available EMI is Rs 25,000 and the eligible loan is approximately Rs 11.50 lakhs.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 27,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 27,000 monthly salary with no existing EMIs, at 11% for 5 years and 50% FOIR, personal loan eligibility is approximately Rs 6.21 lakhs. The available EMI is Rs 13,500 per month. With a CIBIL score above 750, Axis Bank or HDFC Bank at lower rates can push this to approximately Rs 6.35 lakhs.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 15,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 15,000 monthly salary with no existing EMIs, at 11% for 5 years, eligibility is approximately Rs 3.45 lakhs. Only SBI Xpress Credit accepts Rs 15,000 salary among major banks. Most private banks require Rs 25,000 minimum salary.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 30,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 30,000 monthly salary with no existing EMIs, at 11% for 5 years, personal loan eligibility is approximately Rs 6.90 lakhs. With a CIBIL score above 750, HDFC Bank at 10.5% offers approximately Rs 7.00 lakhs. SBI caps at 24 times monthly salary, giving a ceiling of Rs 7.2 lakhs.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 50,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 50,000 monthly salary with no existing EMIs, at 11% for 5 years, eligibility is approximately Rs 11.50 lakhs. With a CIBIL score above 750, HDFC Bank at 10.5% offers approximately Rs 11.63 lakhs. ICICI Bank at 30x multiplier offers up to Rs 15 lakhs subject to FOIR validation.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 70,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 70,000 monthly salary with no existing obligations, at 11% for 5 years, eligibility is approximately Rs 16.09 lakhs. With CIBIL above 750 at HDFC (10.5%), eligibility rises to approximately Rs 16.28 lakhs. ICICI Bank at 30x multiplier gives a ceiling of Rs 21 lakhs.' } },
    { '@type': 'Question', name: 'How much personal loan can I get on Rs 1,00,000 salary?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 1,00,000 monthly salary with no existing obligations, at 11% for 5 years, eligibility is approximately Rs 23.00 lakhs. ICICI Bank at 30x multiplier offers up to Rs 30 lakhs (subject to Rs 50 lakh cap), while SBI caps at Rs 20 to 30 lakhs.' } },
    { '@type': 'Question', name: 'What CIBIL score is required for a personal loan?', acceptedAnswer: { '@type': 'Answer', text: 'Most major banks require a minimum CIBIL score of 750 for personal loan approval at the best rates. Scores between 700 and 749 may get approved at 1 to 3% higher rates. Scores between 650 and 699 face rejection at tier-1 banks. Scores below 650 are rejected by nearly all regulated lenders.' } },
    { '@type': 'Question', name: 'Does my employer affect my personal loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, significantly. Banks categorize employers into tiers: Tier A (central government, PSUs, top MNCs) gets the highest multipliers (up to 30x) and lowest rates. Tier B (listed private companies) gets standard multipliers (up to 24x). Tier C (unlisted small companies) gets the lowest multipliers (10x to 15x) and highest rates.' } },
    { '@type': 'Question', name: 'What is the maximum tenure for a personal loan?', acceptedAnswer: { '@type': 'Answer', text: 'The standard maximum tenure for a personal loan is 5 years (60 months) across most Indian banks. SBI and HDFC Bank offer up to 6 years for select salary account holders. Some lenders like Bajaj Finserv offer up to 8 years. Longer tenure reduces monthly EMI but increases total interest cost.' } },
    { '@type': 'Question', name: 'How do existing EMIs affect personal loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'Existing EMIs directly reduce your FOIR headroom. On Rs 50,000 salary with a 50% FOIR cap, maximum total EMI is Rs 25,000. If you already pay Rs 10,000 in car loan EMI, your available capacity for a new personal loan is Rs 15,000. At 11% for 5 years, that supports a loan of approximately Rs 6.90 lakhs instead of Rs 11.50 lakhs.' } },
    { '@type': 'Question', name: 'Can self-employed individuals get personal loans?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but eligibility criteria are stricter. Self-employed applicants need ITRs for the last 2 to 3 years, minimum 3 years of business continuity, a CIBIL score above 700, and GST registration. Banks use the average net profit from ITRs as the income base and apply a lower FOIR of 40 to 45%. Interest rates are 1 to 2% higher than for salaried applicants.' } },
    { '@type': 'Question', name: 'What is the SBI personal loan eligibility for salaried employees?', acceptedAnswer: { '@type': 'Answer', text: 'SBI Xpress Credit is available to salaried employees with a minimum net monthly income of Rs 15,000. Eligibility is up to 24 times net monthly income, capped at Rs 20 to 30 lakhs depending on employer category. Central and state government employees get preferential rates starting at 11.15%.' } },
    { '@type': 'Question', name: 'What is ICICI Bank personal loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'ICICI Bank offers personal loans to salaried applicants with minimum monthly income of Rs 25,000. The salary multiplier goes up to 30 times, with a maximum loan of Rs 50 lakhs, the highest among major banks. Interest rates start at 10.75% for CIBIL 750+. Existing ICICI salary account holders get pre-approved offers with zero documentation.' } },
    { '@type': 'Question', name: 'What is Axis Bank personal loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'Axis Bank requires a minimum monthly salary of Rs 25,000. The salary multiplier is up to 27 times with a maximum loan of Rs 40 lakhs. Interest rates start at 10.49%, one of the lowest among major banks, for CIBIL 750+. Axis Burgundy and Prestige customers get higher multipliers.' } },
    { '@type': 'Question', name: 'How can I improve my personal loan eligibility?', acceptedAnswer: { '@type': 'Answer', text: 'To improve personal loan eligibility: close small existing loans first (each Rs 5,000 EMI freed adds roughly Rs 2.76 lakhs eligibility at 11% for 5 years), maintain CIBIL above 750, apply at your salary account bank, extend tenure from 3 to 5 years, and add a co-applicant to combine incomes.' } },
    { '@type': 'Question', name: 'What documents are required for a personal loan?', acceptedAnswer: { '@type': 'Answer', text: 'For salaried applicants: PAN, Aadhaar, last 3 months salary slips, 6 months bank statements, and Form 16. For self-employed: PAN, Aadhaar, ITRs for 2 to 3 years, CA-certified P&L statement, and GST registration. Pre-approved loans for existing bank customers require zero documentation.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Personal Loan Eligibility Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/personal-loan-eligibility-calculator',
  description: 'Calculate max eligible personal loan amount based on salary, existing EMIs, and credit score. Live comparison across SBI, HDFC, ICICI, Axis, Kotak, and 5 more banks. Amortization schedule included.',
  featureList: [
    'FOIR-based eligibility calculation',
    'Salary multiplier method cross-check',
    'CIBIL score impact analysis',
    'Employment type adjustment (salaried / self-employed)',
    '9-bank live rate comparison',
    'Month-by-month amortization schedule',
    'Multi-currency support',
    'LocalStorage settings persistence',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-06-25', dateModified: '2026-09-23',
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Check Personal Loan Eligibility', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Personal Loan Eligibility Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Select employment type', text: 'Choose Salaried or Self-Employed. For self-employed, enter average monthly net profit from your last ITR.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter your monthly income', text: 'Enter your net take-home monthly salary (after taxes and deductions).' },
    { '@type': 'HowToStep', position: 3, name: 'Add existing EMIs', text: 'Enter total existing EMIs you pay each month across all loans and credit cards.' },
    { '@type': 'HowToStep', position: 4, name: 'Select your CIBIL score range', text: 'Choose your CIBIL credit score range. This adjusts the interest rate and eligible amount across all 9 banks in real time.' },
    { '@type': 'HowToStep', position: 5, name: 'Adjust tenure and FOIR', text: 'Optionally adjust tenure (1 to 7 years) and FOIR cap (30 to 65%) to model different scenarios.' },
    { '@type': 'HowToStep', position: 6, name: 'View results and amortization', text: 'See the maximum eligible loan amount, EMI, and total interest. Click "View Amortization Schedule" for the full month-by-month breakdown.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org', '@type': 'DefinedTerm',
  name: 'FOIR', alternateName: 'Fixed Obligation to Income Ratio',
  description: 'The percentage of net monthly income allocated to all fixed obligations including loan EMIs. For personal loans in India, lenders typically cap FOIR at 40 to 55% of net monthly income.',
  sameAs: 'https://en.wikipedia.org/wiki/Debt-to-income_ratio',
  inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'Indian Loan and Finance Terms', url: 'https://fermor.in/calculators' },
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Personal Loan Eligibility Calculator: Check By Salary & CIBIL',
  url: 'https://fermor.in/calculators/personal-loan-eligibility-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Personal Loan' }, { '@type': 'DefinedTerm', name: 'FOIR' }],
  audience: { '@type': 'Audience', audienceType: 'Indian borrowers, salaried professionals, self-employed individuals', geographicArea: { '@type': 'Country', name: 'India' } },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-eligibility',    name: 'What Is a Personal Loan Eligibility Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-formula',    name: 'Personal Loan Eligibility Formula' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-by-salary',  name: 'Personal Loan Eligibility by Salary' },
    { '@type': 'WebPageElement', cssSelector: '#eligibility-criteria',   name: 'Personal Loan Eligibility Criteria in India' },
    { '@type': 'WebPageElement', cssSelector: '#sbi-eligibility',        name: 'SBI Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#hdfc-eligibility',       name: 'HDFC Bank Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#icici-eligibility',      name: 'ICICI Bank Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#axis-eligibility',       name: 'Axis Bank Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#credit-score',           name: 'Credit Score Impact on Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#self-employed-eligibility', name: 'Self-Employed Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#nri-eligibility',        name: 'NRI Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#excel-formula',          name: 'Excel Formula for Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#documents-required',     name: 'Documents Required for Personal Loan' },
    { '@type': 'WebPageElement', cssSelector: '#improve-eligibility',    name: 'How to Improve Personal Loan Eligibility' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',             name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                    name: 'Frequently Asked Questions' },
  ],
};

export default function PersonalLoanEligibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <PersonalLoanEligibilityClient />
    </>
  );
}

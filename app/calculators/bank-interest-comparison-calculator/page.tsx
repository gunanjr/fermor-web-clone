import type { Metadata } from 'next';
import BankInterestComparisonClient from './BankInterestComparisonClient';

export const metadata: Metadata = {
  title: 'Bank Interest Rate Comparison: FD, Home Loan & More',
  description:
    'Compare bank interest rates and fixed deposit interest rate across India. Compare fd rates, savings, home loan, personal and gold loan rates.',
  keywords: [
    'bank interest rates',
    'fixed deposit interest rate',
    'best fixed deposit rates',
    'best fixed deposit interest rates',
    'sbi fixed deposit interest rate',
    'hdfc fixed deposit interest rate',
    'hdfc fixed deposit rates',
    'icici bank fixed deposit rates',
    'axis bank fixed deposit rates',
    'kotak fixed deposit rates',
    'bank fixed deposit rates',
    'savings account interest rates',
    'best savings account',
    'hdfc savings account interest rate',
    'sbi savings account interest rate',
    'icici savings account interest rate',
    'home loan interest rate all bank',
    'sbi home loan interest rate',
    'hdfc home loan interest rate',
    'icici home loan interest rate',
    'axis bank home loan interest rate',
    'bank of baroda home loan interest rate',
    'sbi personal loan interest rate',
    'hdfc personal loan interest rate',
    'icici personal loan interest rate',
    'axis bank personal loan interest rate',
    'sbi gold loan interest rate',
    'hdfc gold loan interest rate',
    'icici gold loan interest rate',
    'bank of baroda gold loan interest rate',
    'fd rate comparison',
    'compare bank interest rates',
    'interest rate comparison india',
    'best fd rates india 2026',
    'post office fixed deposit interest rate',
    'indusind bank fixed deposit rates',
    'yes bank fixed deposit rates',
    'idfc savings account interest rate',
    'compare fd rates',
    'fd interest rate calculator',
    'bank interest rate comparison india',
    'fixed deposit calculator india',
    'savings account interest rates comparison',
    'best bank interest rates for savings accounts',
    'compare bank savings interest rates',
    'compare savings interest rates',
    'bank savings rates comparison',
    'savings account rates compare',
    'savings bank account comparison',
    'compare current account interest rates',
    'fixed deposit rates comparison',
    'fixed deposit comparison',
    'deposit interest rate comparison',
    'compare deposit interest rates',
    'nre fixed deposit interest rates comparison',
    'compare bank home loan rates',
    'compare bank home loan interest rates',
    'bank home loan rates comparison',
    'compare bank loan interest rates',
    'bank loan rates comparison',
    'best interest rate bank accounts',
    'best bank to have a savings account',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/bank-interest-comparison-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bank Interest Rate Comparison: FD, Home Loan & More',
    description:
      'Compare FD rates, savings account, home loan, personal loan and gold loan interest rates across 12 major Indian banks. Calculate actual returns.',
    images: ['https://fermor.in/og-bank-interest-comparison-calculator.png'],
  },
  openGraph: {
    title: 'Bank Interest Rate Comparison: FD, Home Loan & More',
    description:
      'Compare FD rates, savings account, home loan, personal loan and gold loan interest rates across 12 major Indian banks. Calculate actual returns.',
    type: 'website',
    url: 'https://fermor.in/calculators/bank-interest-comparison-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-bank-interest-comparison-calculator.png', width: 1200, height: 630, alt: 'Bank Interest Rate Comparison Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-07-22';
const PAGE_DATE_PUBLISHED = '2026-07-15';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Which bank offers the highest fixed deposit interest rate in India in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes Bank offers the highest fixed deposit interest rate among major banks at 7.75% p.a. for 1-year and 2-year deposits as of July 2026. IDFC First Bank follows at 7.50% for 1Y, 2Y and 3Y deposits. Post Office NSC (National Savings Certificate) offers 7.70% for 3-year deposits, which is the single highest rate for that tenure across all comparable instruments.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is SBI fixed deposit interest rate in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBI fixed deposit interest rate as of July 2026 is 6.80% for 1-year deposits, 7.00% for 2-year deposits, 6.75% for 3-year deposits, and 6.50% for 5-year deposits. Senior citizens get an additional 0.50% on all tenures, making the senior citizen SBI FD rate 7.30% for 1-year, 7.50% for 2-year, 7.25% for 3-year, and 7.00% for 5-year deposits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is HDFC fixed deposit interest rate in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HDFC Bank fixed deposit interest rate is 7.00% p.a. for 1-year, 2-year, 3-year, and 5-year deposits as of July 2026. Senior citizens get an extra 0.50%, making the senior citizen HDFC FD rate 7.50% across all major tenures. HDFC applies quarterly compounding on all FD products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best fixed deposit rates in India right now?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best fixed deposit rates in India as of July 2026 are: Yes Bank at 7.75% (1Y and 2Y), IDFC First Bank at 7.50% (1Y, 2Y, 3Y), Post Office NSC at 7.70% (3Y), and IndusInd Bank at 7.25% across all tenures. For senior citizens, these rates improve by 0.50-0.80%, making Yes Bank the best at 8.25% for 1-year deposits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the savings account interest rate of Yes Bank and IDFC First Bank?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes Bank offers 7.00% savings account interest rate on balances up to Rs 1 crore, the highest among major banks. IDFC First Bank also offers 7.00% savings account interest rate up to Rs 1 crore. Kotak Mahindra Bank offers 4.00% for balances above Rs 1 lakh, while IndusInd Bank and Post Office Savings also offer 4.00% flat. SBI and PNB offer the lowest savings rates at 2.70%.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which bank has the lowest home loan interest rate in India in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank of Baroda offers the lowest home loan interest rate at 7.15% p.a. as of July 2026, following the RBI repo rate cuts to 5.25%. SBI follows at 7.25% (EBLR-linked). Bank of India offers 7.30% and HDFC Bank offers 7.35%. These are floating rates linked to external benchmarks and subject to revision each quarter based on RBI policy changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the SBI home loan interest rate in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBI home loan interest rate is 7.25% p.a. as of July 2026 for salaried borrowers with a CIBIL score above 750. The rate is linked to SBI\'s External Benchmark Lending Rate (EBLR), which is based on the RBI repo rate of 5.25%. Women borrowers get a 0.05% concession. The rate includes a spread that banks adjust for creditworthiness.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cheapest personal loan interest rate in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SBI offers the cheapest personal loan interest rate among major banks at 10.30% p.a. as of July 2026. PNB follows at 10.40%, Axis Bank and IndusInd Bank at 10.49%, and HDFC Bank at 10.50%. Yes Bank is the most expensive among the compared banks at 11.99%. Rates vary based on employment type, income, CIBIL score, and employer category.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the gold loan interest rate across banks and NBFCs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bank gold loan interest rates are significantly lower than NBFC rates. SBI, Canara Bank, and PNB offer gold loans at 8.75% p.a. Bank of Baroda offers 8.80%, ICICI Bank at 9.00%, and HDFC Bank and Axis Bank at 9.50%. Muthoot Finance and Manappuram charge 12.00% p.a. The higher NBFC rate is offset by faster processing and higher loan-to-value ratios.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do senior citizens get higher FD interest rates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, senior citizens (age 60 and above) get an additional 0.50% per annum on fixed deposits at most major banks. PNB offers the highest senior citizen bonus at 0.80%, making its senior FD rate 7.60% for 1-year deposits versus 6.80% for general customers. Post Office NSC does not offer a senior citizen premium. The bonus is automatic on production of age proof.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the RBI repo rate affect bank FD and loan interest rates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The RBI repo rate directly influences bank lending rates and indirectly influences deposit rates. Since 2025, RBI cut the repo rate by 125 basis points to 5.25%, which caused home loan rates to fall from around 8.5% to 7.15-7.90%. FD rates have also declined as banks reduced deposit costs to protect margins. In a falling rate environment, locking in long-tenure FDs at current rates is prudent.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is TDS on bank FD interest in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Banks deduct TDS at 10% on FD interest if total interest from one bank in a financial year exceeds Rs 40,000 (Rs 50,000 for senior citizens). If PAN is not provided, TDS is deducted at 20%. Submit Form 15G (general) or Form 15H (senior citizens) at the beginning of the financial year to avoid TDS if your total income is below the taxable limit. TDS does not change the applicable tax slab; it is just advance tax collection.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better: Post Office FD or bank FD?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post Office NSC (National Savings Certificate) offers 7.70% for 3-year tenure, which is the highest among all comparable instruments and beats most private and public sector banks. The key differences are: NSC investments qualify for Section 80C deduction up to Rs 1.5 lakh, while bank FDs qualify only for 5-year tax-saving FDs. NSC is backed by the Government of India with sovereign guarantee. Bank FDs are insured only up to Rs 5 lakh per bank under DICGC.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is FD maturity amount calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FD maturity amount uses quarterly compounding: A = P x (1 + r/4)^(4t), where P is the principal amount, r is the annual interest rate (as a decimal), and t is the tenure in years. For a Rs 5 lakh FD at 7.75% for 1 year: A = 5,00,000 x (1 + 0.0775/4)^4 = 5,00,000 x (1.019375)^4 = approximately Rs 5,40,048. The interest earned is Rs 40,048, which is above the Rs 40,000 TDS threshold and therefore subject to 10% TDS.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform that provides free financial calculators and a financial eligibility engine that matches users with loans and investments they qualify for. The bank interest rate comparison calculator is part of a suite of 525+ calculators covering FD, SIP, home loans, tax, and retirement planning. Available free at fermor.in.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate are the bank interest rates shown in this calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The rates shown reflect published rates from respective banks as of July 2026, following the RBI repo rate reduction cycle that brought the policy rate to 5.25%. Bank interest rates change periodically, and the rates shown are for general/non-senior customers on standard deposit products. Always verify the current rate on the bank\'s official website or branch before investing, as banks revise rates without notice.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I compare FD rates for senior citizens in this calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The FD tab has a "Senior Citizen" toggle that adds the bank-specific senior citizen premium (typically 0.50%, and 0.80% at PNB) to the base rate. This lets you see both the adjusted maturity amount and the rank order, which can change because different banks offer different senior citizen bonuses. Post Office NSC does not have a senior citizen premium and maintains the same rate.',
      },
    },
  ],
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Bank Interest Rate Comparison Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/bank-interest-comparison-calculator',
  featureList: [
    'FD interest rate comparison across 12 banks',
    'Savings account interest rate comparison',
    'Home loan interest rate and EMI comparison',
    'Personal loan interest rate and EMI comparison',
    'Gold loan interest rate comparison',
    'Senior citizen FD rate toggle',
    'Top 3 bank rate donut chart visualization',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Bank ranking from best to worst rate',
    'Comparison vs best rate for every bank',
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
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Bank Interest Rate Comparison',
      item: 'https://fermor.in/calculators/bank-interest-comparison-calculator',
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Bank Interest Rates Using This Calculator',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Bank Interest Rate Comparison Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Select product type',
      text: 'Choose the financial product tab: FD Rates, Savings Account, Home Loan, Personal Loan, or Gold Loan at the top of the calculator card.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter investment or loan amount',
      text: 'Use the amount slider or click the value button to type in your exact deposit or loan amount. Each tab has a preset range suited to that product.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select tenure',
      text: 'Click the tenure pill that matches your investment period (1Y, 2Y, 3Y, 5Y for FD; 5Y to 30Y for home loans, etc.). Gold loans support 6-month to 3-year tenures.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Toggle senior citizen (FD only)',
      text: 'On the FD tab, switch on the Senior Citizen toggle if you are 60 years or above to see higher FD rates with the applicable senior citizen bonus at each bank.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Read the ranked comparison',
      text: 'The results table shows all banks ranked from best to worst, with exact maturity amounts or EMIs calculated for your inputs. The top-ranked bank is highlighted. Use the donut chart to compare the top 3 rates visually.',
    },
  ],
};

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
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description:
    'Fermor is building the automated financial action layer for India, closing the gap between knowing what to do with money and actually doing it. The calculators are the distribution layer. The product is the action system.',
  knowsAbout: [
    'Fixed Deposit Interest Rates India',
    'Bank Interest Rate Comparison',
    'Home Loan Interest Rates India',
    'Personal Loan Rates India',
    'Gold Loan Interest Rates',
    'Savings Account Interest Rates',
    'RBI Monetary Policy',
    'Senior Citizen FD Rates',
    'TDS on FD Interest',
    'AMFI Guidelines',
    'SEBI Regulations',
    'Personal Finance India',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Bank Interest Rate Comparison Calculator: FD, Home Loan, Savings, Personal Loan, Gold Loan',
  url: 'https://fermor.in/calculators/bank-interest-comparison-calculator',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
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
    { '@type': 'DefinedTerm', name: 'Fixed Deposit Interest Rate', alternateName: 'FD Rate' },
    { '@type': 'DefinedTerm', name: 'Savings Account Interest Rate', alternateName: 'Savings Rate' },
    { '@type': 'DefinedTerm', name: 'Home Loan Interest Rate', alternateName: 'Home Loan Rate' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian bank customers, retail investors, senior citizens, home loan borrowers, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#highest-fd-rates', name: 'Which bank offers the highest FD interest rate in India?' },
    { '@type': 'WebPageElement', cssSelector: '#fd-comparison-table', name: 'FD interest rates comparison across banks' },
    { '@type': 'WebPageElement', cssSelector: '#savings-account-rates', name: 'Savings account interest rates comparison' },
    { '@type': 'WebPageElement', cssSelector: '#home-loan-rates', name: 'Home loan interest rates across banks' },
    { '@type': 'WebPageElement', cssSelector: '#personal-loan-rates', name: 'Personal loan interest rates comparison' },
    { '@type': 'WebPageElement', cssSelector: '#gold-loan-rates', name: 'Gold loan interest rates: banks vs NBFCs' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen-fd-rates', name: 'Senior citizen FD rates' },
    { '@type': 'WebPageElement', cssSelector: '#post-office-vs-bank', name: 'Post office vs bank FD comparison' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-repo-rate-effect', name: 'How RBI repo rate affects bank interest rates' },
    { '@type': 'WebPageElement', cssSelector: '#tds-on-interest', name: 'TDS on bank interest' },
    { '@type': 'WebPageElement', cssSelector: '#maximize-fd-returns', name: 'How to maximize FD returns' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this bank interest rate comparison tool' },
    { '@type': 'WebPageElement', cssSelector: '#faq-section', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Fixed Deposit Interest Rate',
  alternateName: 'FD Rate',
  description:
    'The fixed deposit interest rate is the guaranteed annual return a bank pays on a lump sum deposit locked in for a specified tenure, expressed as a percentage per annum and compounded quarterly in India.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Banking and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Time_deposit',
    'https://www.wikidata.org/wiki/Q1437378',
  ],
};

const schemas = [faqSchema, webAppSchema, breadcrumbSchema, howToSchema, organizationSchema, webPageSchema, definedTermSchema];

export default function BankInterestComparisonPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BankInterestComparisonClient />
    </>
  );
}

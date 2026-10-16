import type { Metadata } from 'next';
import FloatingVsFixedClient from './FloatingVsFixedClient';

export const metadata: Metadata = {
  title: 'Floating vs Fixed Rate Calculator: Home Loan Comparison',
  description: 'Compare total interest cost of floating vs fixed rate home loans. Includes rate-change scenario, break-even analysis, and EMI comparison. Free to use.',
  keywords: [
    'floating vs fixed rate home loan calculator',
    'compare home loan interest rates',
    'fixed vs floating rate comparison',
    'home loan rate comparison',
    'floating rate home loan calculator',
    'fixed rate home loan calculator',
    'home loan interest rate all bank',
    'compare mortgage rates',
    'mortgage rate comparison india',
    'floating rate vs fixed rate which is better',
    'home loan fixed vs floating',
    'floating interest rate calculator',
    'fixed interest rate calculator',
    'home loan comparison calculator',
    'emi comparison floating fixed',
    'floating vs fixed home loan india',
    'home loan rate type comparison',
    'which is better fixed or floating home loan',
    'floating rate emi calculator',
    'fixed rate emi calculator',
    'home loan interest comparison india',
    'rbi repo rate home loan impact',
    'break even rate home loan',
    'home loan type comparison tool',
    'floating rate risk home loan india',
    'fixed rate premium home loan',
    'home loan emi change after rate hike',
    'mclr vs fixed rate home loan',
  ],
  openGraph: {
    title: 'Floating vs Fixed Rate Calculator: Home Loan Comparison - Fermor',
    description: 'Compare total interest cost of floating vs fixed rate home loans in India. Includes rate-change scenario and break-even analysis.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-floating-vs-fixed-rate-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floating vs Fixed Rate Calculator: Home Loan Comparison - Fermor',
    description: 'Compare floating vs fixed rate home loan total interest. Includes rate-change scenario and break-even analysis.',
    images: ['https://fermor.in/og-floating-vs-fixed-rate-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/floating-vs-fixed-rate-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between floating and fixed rate home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A floating rate home loan has an interest rate that changes with market benchmarks like the RBI repo rate, while a fixed rate home loan locks the rate for the entire tenure. Floating rates in India are currently lower because they follow the RBI benchmark directly. Fixed rates trade that lower starting rate for certainty: your EMI stays the same regardless of what the RBI does.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better: floating or fixed rate home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Floating rate is better when interest rates are falling or expected to stay stable, as the rate adjusts down automatically and saves interest. Fixed rate is better when rates are rising and you want EMI certainty over the full tenure. In India as of mid-2026, most borrowers are on floating rates linked to RLLR after the RBI cut the repo rate by 125 basis points through 2025, bringing the repo rate to 5.25%.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do floating rate home loans work in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Floating rate home loans in India are linked to an external benchmark, usually the RBI repo rate via the bank\'s RLLR (Repo Linked Lending Rate). When the RBI cuts or hikes the repo rate, the bank must pass on the change within 3 months per RBI guidelines. Your EMI changes at the next reset date. Banks cannot charge prepayment penalties on floating rate home loans per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are current floating home loan interest rates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As of July 2026, floating home loan rates start at approximately 7.15% from Punjab National Bank and Bank of Baroda for prime borrowers with CIBIL scores above 750. SBI\'s RLLR-linked rate starts at 7.25%, HDFC Bank at 7.35%, and ICICI Bank at 7.90%. These rates followed the RBI\'s repo rate cuts that brought the repo rate to 5.25% from 6.50% through 2025.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are current fixed home loan interest rates in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fixed rate home loans in India typically carry a premium of 1.5 to 2.5 percentage points over floating rates because lenders price in future rate-rise risk. As of July 2026, fixed rate home loans range from 8.5% to 10% per annum from major banks. Few banks offer truly fixed rates for the full tenure; most products called "fixed" are actually fixed only for 3 to 5 years before converting to floating.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the RBI repo rate affect floating rate home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When the RBI cuts the repo rate, banks must reduce their RLLR within 3 months, which reduces the floating home loan rate proportionally. The RBI cut rates by 125 basis points through 2025, so a borrower on a 8.5% RLLR-linked loan in early 2025 would have seen the rate drop to around 7.25% by year-end. Rate hikes work the same way in reverse: a 50 basis point repo rate hike adds roughly 50 basis points to the floating loan rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I switch from fixed to floating rate home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, most lenders allow switching from a fixed rate to a floating rate loan for a conversion fee of 0.5 to 1% of the outstanding principal. The reverse switch (floating to fixed) is also permitted but less common. Evaluate whether the rate difference after accounting for conversion fees justifies the switch. For a Rs 50 lakh outstanding loan, a 1% fee is Rs 50,000, which you need to recover through interest savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the break-even rate for floating vs fixed home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The break-even rate is the floating rate at which the total interest cost equals the total interest cost of a fixed rate loan. If your fixed rate is 9.25% and your floating rate stays below the break-even rate for the entire tenure, floating wins. If the floating rate rises above the break-even level for a significant period, fixed wins. Use this calculator\'s break-even analysis to find the exact threshold for your loan inputs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is prepayment penalty charged on floating rate home loans in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13, banks and housing finance companies cannot charge prepayment penalties on floating rate home loans taken by individual borrowers. You can make lump-sum or extra monthly payments at zero cost. Fixed rate loans may carry prepayment charges of 2 to 4% of the outstanding amount, which is an important additional cost when comparing rate types.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is floating rate home loan EMI calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Floating rate home loan EMI is calculated the same way as any EMI: EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the outstanding principal, r is the monthly rate, and n is the remaining tenure in months. When the floating rate changes, the bank recalculates the EMI based on the new rate and the outstanding principal at that point. This calculator shows the EMI for phase 1 (first 36 months) and phase 2 (after the expected rate change).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is RLLR in home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RLLR (Repo Linked Lending Rate) is the external benchmark rate Indian banks use for floating home loans, calculated as the RBI repo rate plus the bank\'s spread. Per RBI guidelines effective October 2019, all new floating rate retail loans must be linked to an external benchmark like the repo rate rather than MCLR. RLLR is more transparent and passes on RBI rate changes faster and more completely than MCLR did.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much higher is a fixed rate compared to floating in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fixed rate home loans in India typically carry a premium of 1.5 to 2.5 percentage points over prevailing floating rates. In July 2026, when floating rates start at 7.15%, fixed rates begin around 8.5 to 8.75%. This premium compensates the lender for committing to a rate despite future market uncertainty. Over a 20-year tenure, even a 1.5% rate premium significantly increases total interest paid.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens to my EMI when the floating rate rises?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When a floating rate rises, most lenders increase the EMI amount rather than extending the tenure, though some lenders extend tenure as the default. The new EMI is recalculated using the standard EMI formula applied to the outstanding principal at the time of the rate change, the new rate, and the remaining months. This calculator shows you the exact new EMI after a 1% rate rise scenario starting at year 3.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform that gives people the tools to take real financial action. It offers 500+ free calculators covering home loans, investments, tax, and retirement, and a financial eligibility engine that matches users to products they qualify for. Free to use at fermor.in.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Floating vs Fixed Rate Home Loan Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/floating-vs-fixed-rate-calculator',
  featureList: [
    'Floating rate EMI calculation with two-phase rate-change scenario',
    'Fixed rate EMI calculation for full tenure',
    'Total interest comparison: floating vs fixed',
    'Winner badge showing which option saves more and by how much',
    'Break-even rate analysis: threshold above which fixed becomes cheaper',
    'Donut chart comparing floating vs fixed total interest',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Tenure presets (5Y, 10Y, 15Y, 20Y, 25Y, 30Y)',
    'LocalStorage persistence of all calculator inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-07-14',
  dateModified: '2026-08-04',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Floating vs Fixed Rate Calculator', item: 'https://fermor.in/calculators/floating-vs-fixed-rate-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Floating vs Fixed Rate Home Loans',
  description: 'Use this calculator to compare the total interest cost of a floating rate vs fixed rate home loan and find the break-even rate.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Floating vs Fixed Rate Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Loan Amount',
      text: 'Set your home loan amount using the slider or click the value to type an exact figure. The default is Rs 75 lakh, which is a common mid-range home loan in India.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set Floating Rate Inputs',
      text: 'Enter your current floating rate and the rate you expect after 3 years. The 3-year period simulates a realistic rate-change scenario. Use your lender\'s current RLLR-linked rate as the starting rate.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter the Fixed Rate',
      text: 'Enter the fixed rate your lender has quoted. This is compared against the floating rate scenario over the full tenure.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Select Loan Tenure',
      text: 'Choose your loan duration using the preset buttons (5Y to 30Y) or the slider. The calculator recalculates instantly for any tenure.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Read the Comparison and Break-Even Rate',
      text: 'The output panel shows EMIs for both options, total interest for each, the winner badge with savings amount, and the break-even floating rate above which fixed becomes the cheaper choice.',
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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system, connecting real financial accounts through the Account Aggregator framework to see the complete financial picture and automate decisions.',
  knowsAbout: [
    'Floating Rate Home Loans India',
    'Fixed Rate Home Loans India',
    'Home Loan EMI Calculation',
    'RBI Repo Rate and RLLR',
    'Home Loan Interest Rate Comparison',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Floating vs Fixed Rate Home Loan Comparison Calculator',
  url: 'https://fermor.in/calculators/floating-vs-fixed-rate-calculator',
  datePublished: '2026-07-14',
  dateModified: '2026-08-04',
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
    { '@type': 'DefinedTerm', name: 'Floating Rate Home Loan', alternateName: 'Variable Rate Home Loan' },
    { '@type': 'DefinedTerm', name: 'Fixed Rate Home Loan', alternateName: 'Fixed Interest Home Loan' },
    { '@type': 'DefinedTerm', name: 'RLLR', alternateName: 'Repo Linked Lending Rate' },
    { '@type': 'DefinedTerm', name: 'Break-Even Rate', alternateName: 'Rate Crossover Point' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home buyers, first-time home buyers, NRI home buyers, home loan borrowers comparing rate types',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#floating-vs-fixed-difference', name: 'Difference Between Floating and Fixed Rate Home Loans' },
    { '@type': 'WebPageElement', cssSelector: '#floating-rate-how-it-works', name: 'How Floating Rate Home Loans Work in India' },
    { '@type': 'WebPageElement', cssSelector: '#current-rates', name: 'Current Home Loan Interest Rates: Floating vs Fixed' },
    { '@type': 'WebPageElement', cssSelector: '#when-floating-better', name: 'When Floating Rate Is Better Than Fixed Rate' },
    { '@type': 'WebPageElement', cssSelector: '#when-fixed-better', name: 'When Fixed Rate Is Better Than Floating Rate' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-repo-rate', name: 'How the RBI Repo Rate Affects Floating Rate Home Loans' },
    { '@type': 'WebPageElement', cssSelector: '#switch-fixed-floating', name: 'Can I Switch From Fixed to Floating Rate?' },
    { '@type': 'WebPageElement', cssSelector: '#break-even-analysis', name: 'Break-Even Analysis: At What Rate Does Fixed Become Worth It?' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: Rs 75 Lakh Loan Comparison' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Floating vs Fixed Rate Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Floating Rate Home Loan',
  alternateName: 'Variable Rate Home Loan',
  description: 'A floating rate home loan has an interest rate linked to an external benchmark like the RBI repo rate, so the rate and EMI change whenever the benchmark rate changes.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Finance and Banking Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Adjustable-rate_mortgage',
    'https://www.wikidata.org/wiki/Q4688116',
  ],
};

export default function FloatingVsFixedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <FloatingVsFixedClient />
    </>
  );
}

import type { Metadata } from 'next';
import FDLadderingClient from './FDLadderingClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/fd-laddering-calculator`;
  return {
    title: 'FD Calculator: Fixed Deposit & Laddering Strategy',
    description:
      'Free fd calculator for India. Calculate fixed deposit maturity, interest earned, and monthly payouts. Compare bank FD rates and build a laddering strategy for steady liquidity.',
    keywords: [
      'fd calculator',
      'fixed deposit calculator',
      'fd interest calculator',
      'fd rate calculator',
      'fd return calculator',
      'fixed deposit interest calculator',
      'fd monthly interest calculator',
      'fixed deposit return calculator',
      'fd interest calculator sbi',
      'fd calculator hdfc',
      'fd calculator sbi',
      'sbi fixed deposit calculator',
      'hdfc fixed deposit calculator',
      'icici fd calculator',
      'axis bank fd calculator',
      'post office fd calculator',
      'fd calculator for hdfc bank',
      'fd calculator for icici bank',
      'fd rates in hdfc bank',
      'fd interest rates sbi',
      'hdfc fixed deposit interest rate',
      'fd interest rates hdfc',
      'fixed deposit interest calculator hdfc',
      'fd rate calculator hdfc',
      'fd rate calculator icici',
      'fd laddering strategy',
      'fd ladder calculator',
      'fd laddering calculator',
      'fixed deposit laddering',
      'fd interest rates calculator',
      'fixed deposit interest rate calculator',
      'sbi fd interest rates calculator',
      'recurring deposit calculator',
      'fd maturity calculator',
      'compound interest fd calculator',
      'fd monthly payout calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'FD Calculator: Fixed Deposit & Laddering Strategy',
      description:
        'Calculate FD maturity, interest earned, and monthly payouts. Compare SBI, HDFC, ICICI rates. Build a laddering strategy for steady annual liquidity.',
      images: ['https://fermor.in/og-fd-laddering-calculator.png'],
    },
    openGraph: {
      title: 'FD Calculator: Fixed Deposit & Laddering Strategy - Fermor',
      description:
        'Free fixed deposit calculator with cumulative and non-cumulative modes. Compare bank FD rates across SBI, HDFC, ICICI, Axis, and more. Build an FD ladder for annual liquidity. Free to use.',
      type: 'website',
      url: 'https://fermor.in/calculators/fd-laddering-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-fd-laddering-calculator.png', width: 1200, height: 630, alt: 'Fermor FD Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-08-04';
const PAGE_DATE_PUBLISHED = '2026-07-15';

const faqItems = [
  {
    q: 'What is a fixed deposit (FD) calculator?',
    a: 'A fixed deposit calculator computes the maturity amount and total interest earned on a bank FD based on principal, interest rate, tenure, and compounding frequency. Enter your deposit amount, choose the rate and tenure, and the calculator instantly shows maturity value using the compound interest formula A = P x (1 + r/n)^(n x t), where r is the annual rate, n is compounding frequency per year, and t is tenure in years.',
  },
  {
    q: 'How is FD interest calculated in India?',
    a: 'Indian banks calculate FD interest using the compound interest formula for cumulative FDs: A = P x (1 + r/n)^(n x t). Most banks compound quarterly (n = 4), which is the RBI standard. Non-cumulative FDs pay simple interest periodically. For a Rs 1 lakh FD at 7% compounded quarterly for 1 year, maturity = 1,00,000 x (1 + 0.07/4)^4 = Rs 1,07,186.',
  },
  {
    q: 'What is the difference between cumulative and non-cumulative FD?',
    a: 'Cumulative FDs reinvest the interest back into the deposit so it compounds over time, delivering a higher maturity amount. Non-cumulative FDs pay interest monthly or quarterly as cash, making them suitable for retirees needing regular income. At 7% for 3 years, a Rs 1 lakh cumulative FD matures at Rs 1,22,987, while a non-cumulative FD returns just the principal at maturity with periodic payouts totalling Rs 21,000.',
  },
  {
    q: 'What is FD laddering and why does it work?',
    a: 'FD laddering splits a lump sum into multiple FDs with staggered maturities (1 year, 2 years, 3 years, etc.) so a portion matures every year. This gives steady liquidity without breaking FDs early, reduces interest rate risk, and typically earns more than a single short-term FD because longer tranches get better rates. A Rs 5 lakh ladder across 5 years earns more total interest than parking Rs 5 lakh in a single 1-year FD renewed repeatedly.',
  },
  {
    q: 'What is the current FD interest rate in SBI?',
    a: 'SBI fixed deposit rates as of July 2026 are 6.80% for 1 year, 7.00% for 2 years, 6.75% for 3 years, and 6.50% for 5 years. Senior citizens get an additional 0.50% across all tenures, bringing the 2-year senior citizen rate to 7.50%.',
  },
  {
    q: 'Which bank gives the highest FD interest rate in India in 2026?',
    a: 'Among major banks in July 2026, Yes Bank offers 7.75% for 1-year and 2-year FDs, the highest among mainstream banks. IndusInd Bank and IDFC First Bank offer 7.25% to 7.50% across most tenures. Small finance banks and cooperative banks may offer higher rates but carry higher credit risk.',
  },
  {
    q: 'How is TDS deducted on FD interest?',
    a: 'Banks deduct TDS at 10% when FD interest exceeds Rs 40,000 per year (Rs 50,000 for senior citizens). If your total income is below the taxable limit, submit Form 15G (below 60 years) or Form 15H (above 60 years) to your bank at the start of each financial year to avoid TDS. Submitting the form does not exempt you from declaring the income in your ITR.',
  },
  {
    q: 'Can I break an FD before maturity?',
    a: 'Yes. Banks allow premature FD withdrawal, but most levy a penalty of 0.5% to 1% on the applicable rate. If you invested at 7% for 3 years and break after 1 year, the rate applied may be 6.80% minus 1% penalty, giving only 5.80% on your actual holding period. This is why the FD ladder works better than a single long FD: each tranche can mature on schedule without premature-withdrawal penalties.',
  },
  {
    q: 'What is the FD interest rate for senior citizens?',
    a: 'Senior citizens (aged 60 and above) receive an additional 0.25% to 0.80% interest above regular rates at most Indian banks. SBI, HDFC Bank, and ICICI Bank offer a standard 0.50% extra. PNB offers up to 0.80% additional for certain tenures. The Senior Citizen Savings Scheme (SCSS) from the post office offers 8.20% per annum, higher than most bank FDs.',
  },
  {
    q: 'Is post office FD better than bank FD?',
    a: 'Post office time deposits are backed by the central government, making them safer than bank FDs (which are insured only up to Rs 5 lakh per bank under DICGC). Rates as of July 2026: post office NSC earns 7.10% for 1 year and 7.70% for 3 years. IDFC First Bank and Yes Bank offer comparable or higher rates but without the sovereign guarantee.',
  },
  {
    q: 'How do I calculate FD monthly interest?',
    a: 'Monthly interest on a non-cumulative FD = P x r / 12, where r is the annual rate as a decimal. For a Rs 2 lakh FD at 7% p.a., monthly payout = 2,00,000 x 0.07 / 12 = Rs 1,167. The principal is returned at maturity. This calculator shows the exact monthly payout in the FD Calculator tab when you switch to Non-Cumulative mode.',
  },
  {
    q: 'What is the FD maturity formula?',
    a: 'Cumulative FD: A = P x (1 + r/n)^(n x t). P = principal, r = annual interest rate as a decimal, n = compounding frequency per year (4 for quarterly, 12 for monthly, 1 for annual), t = tenure in years. For tenures in days, use t = days / 365. Non-cumulative: maturity amount = P (principal returned). Interest paid periodically = P x r / 12 (monthly) or P x r / 4 (quarterly).',
  },
  {
    q: 'FD vs RD vs PPF: which is right for my goal?',
    a: 'FD suits lump-sum parking for 7 days to 10 years with guaranteed returns. RD suits monthly savers who want to accumulate a corpus through regular deposits. PPF offers the highest post-tax return (7.10% p.a., EEE status) but locks money for 15 years. FD beats PPF for short tenures. PPF beats FD for long-term goals in the 30% tax bracket due to tax-free maturity. RD bridges the two for disciplined monthly saving.',
  },
  {
    q: 'How to build an FD ladder with Rs 5 lakh?',
    a: 'Divide Rs 5 lakh into five equal parts of Rs 1 lakh each. Invest tranche 1 in a 1-year FD, tranche 2 in a 2-year FD, and so on up to tranche 5 in a 5-year FD. As each tranche matures annually, reinvest at the then-current 5-year rate. After 5 years, all tranches are on a 5-year cycle at the highest available rate, giving a Rs 1 lakh payout every year plus the compounded corpus.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer providing free tools that give real answers to real financial questions. The product is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with money and actually doing it. Fermor is free to use at fermor.in.',
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
  name: 'FD Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/fd-laddering-calculator',
  description: 'Calculate fixed deposit maturity, interest earned, monthly payouts, and effective annual yield. Build an FD ladder to get liquidity every year. Compare bank rates across SBI, HDFC, ICICI, Axis, and more.',
  featureList: [
    'FD Calculator (Cumulative and Non-Cumulative)',
    'FD Ladder Calculator (5-tranche laddering strategy)',
    'Bank FD Rate Comparison Table (12 banks)',
    'Year-by-Year Growth Table',
    'Donut Chart: Principal vs Interest',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Tenure presets (7D, 15D, 1M, 3M, 6M, 1Y, 2Y, 3Y, 5Y)',
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
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'FD Laddering Calculator', item: 'https://fermor.in/calculators/fd-laddering-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Fixed Deposit Returns',
  description: 'Step-by-step guide to calculate FD maturity amount, interest earned, and build an FD ladder using this calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor FD Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter principal amount',
      text: 'Use the slider or click the amount button to enter your deposit amount, from Rs 10,000 to Rs 50 lakh.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'Drag the rate slider or click to type the exact rate. Use the bank rate table below to find the current rate for your chosen bank.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose tenure and compounding',
      text: 'Select a tenure preset (7D to 5Y) and pick your compounding frequency: Monthly, Quarterly (default for most banks), or Annually.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Switch to Non-Cumulative if needed',
      text: 'Toggle to Non-Cumulative to see monthly interest payouts instead of a lump-sum maturity. Suitable for retirees needing regular income.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Try the FD Ladder tab',
      text: 'Switch to the FD Ladder tab, enter your total investment, and see how splitting across 5 tranches earns more than a single FD while giving Rs 1 lakh+ every year.',
    },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Fixed Deposit India',
    'FD Interest Rates',
    'FD Laddering Strategy',
    'Bank Interest Rates India',
    'RBI Regulations',
    'Personal Finance India',
    'Tax on FD Interest',
    'Senior Citizen FD Rates',
    'Post Office Savings Schemes',
    'Account Aggregator Framework',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'FD Calculator: Fixed Deposit & Laddering Strategy',
  url: 'https://fermor.in/calculators/fd-laddering-calculator',
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
    { '@type': 'DefinedTerm', name: 'FD', alternateName: 'Fixed Deposit' },
    { '@type': 'DefinedTerm', name: 'FD Laddering', alternateName: 'Fixed Deposit Laddering Strategy' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, senior citizens, NRI investors, retirees',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-fd-calculator', name: 'What is a Fixed Deposit Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#fd-interest-calculation', name: 'How FD Interest is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#fd-rates-2026', name: 'FD Interest Rates 2026' },
    { '@type': 'WebPageElement', cssSelector: '#cumulative-vs-noncumulative', name: 'Cumulative vs Non-Cumulative FD' },
    { '@type': 'WebPageElement', cssSelector: '#fd-laddering', name: 'What is FD Laddering' },
    { '@type': 'WebPageElement', cssSelector: '#fd-ladder-example', name: 'How to Build an FD Ladder' },
    { '@type': 'WebPageElement', cssSelector: '#senior-citizen-fd', name: 'Senior Citizen FD Rates' },
    { '@type': 'WebPageElement', cssSelector: '#post-office-fd', name: 'Post Office FD vs Bank FD' },
    { '@type': 'WebPageElement', cssSelector: '#tax-on-fd', name: 'Tax on FD Interest' },
    { '@type': 'WebPageElement', cssSelector: '#fd-vs-rd-vs-ppf', name: 'FD vs RD vs PPF' },
    { '@type': 'WebPageElement', cssSelector: '#breaking-fd-early', name: 'Breaking FD Early' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Fixed Deposit',
  alternateName: 'FD',
  description: 'A fixed deposit is a financial instrument offered by Indian banks and post offices that provides a higher rate of interest than a savings account for a fixed tenure ranging from 7 days to 10 years.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Fixed_deposit',
    'https://www.wikidata.org/wiki/Q1437040',
  ],
};

export default async function FDLadderingCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <FDLadderingClient faqItems={faqItems} />
    </>
  );
}

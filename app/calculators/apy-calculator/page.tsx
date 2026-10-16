import type { Metadata } from 'next';
import APYCalculatorClient from './APYCalculatorClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonical = 'https://fermor.in/calculators/apy-calculator';
  return {
    title: 'APY Calculator: Annual Percentage Yield Calculator',
    description:
      'Free APY calculator for India. Calculate annual percentage yield, convert APY to APR, compare savings account interest rates. Daily, monthly, quarterly compounding. Free to use.',
    keywords: [
      'apy calculator',
      'annual percentage yield calculator',
      'apy calculator savings',
      'apy calculator savings account',
      'savings account interest calculator',
      'interest calculator savings',
      'savings interest rate calculator',
      'apy calculator monthly',
      'savings rates comparison',
      'calculate interest earned on savings account',
      'apy percentage calculator',
      'bank apy calculator',
      'apy and interest rate calculator',
      'bank savings interest calculator',
      'savings interest calculator apy',
      'apy to interest rate calculator',
      'apy rate calculator',
      'apy calculator online',
      'calculate bank interest on savings account',
      'apy return calculator',
      'compare savings interest rates',
      'apy yield calculator',
      'apy calculator daily',
      'compare bank interest rates on savings accounts',
      'compare savings interest rates calculator',
      'apy to apr calculator',
      'apr to apy calculator',
      'compound apy calculator',
      'apy compound interest calculator',
      'daily apy calculator',
      'monthly apy savings calculator',
      'apy earnings calculator',
      'calculate apy earnings',
      'apy monthly interest calculator',
      'calculate interest based on apy',
      'apy per month calculator',
      'free apy calculator',
      'simple apy calculator',
      'apy formula',
      'apy formula calculator',
      'apy compounded daily',
      '5 apy calculator',
      '4 apy calculator',
      '4.5 apy calculator',
      '4.15 apy calculator',
      '4.75 apy calculator',
      '4.30 apy calculator',
      '4.25 apy calculator',
      '4.35 apy calculator',
      '4.50 apy calculator',
      '4.60 apy calculator',
      '4.65 apy calculator',
      '4.10 apy calculator',
      '4.0 apy calculator',
      '4.05 apy calculator',
      '4.1 apy calculator',
      '4.3 apy calculator',
      '4.4 apy calculator',
      '4.6 apy calculator',
      '3.5 apy calculator',
      '3.75 apy calculator',
      '3.30 apy calculator',
      '3.25 apy calculator',
      '3.50 apy calculator',
      '3.85 apy calculator',
      '3.40 apy calculator',
      '3.3 apy calculator',
      '3.10 apy calculator',
      '3.15 apy calculator',
      '3.6 apy calculator',
      '3.9 apy calculator',
      '3 apy calculator',
      '5.75 apy calculator',
      '5.00 apy calculator',
      '5 percent apy calculator',
      '4 percent apy calculator',
      '3 percent apy calculator',
      '2.5 apy calculator',
      '2.75 apy calculator',
      '2.35 apy calculator',
      '2.15 apy calculator',
      '2 apy calculator',
      '2.70 apy calculator',
      '2.55 apy calculator',
      '2.50 apy calculator',
      '2.30 apy calculator',
      '2.25 apy calculator',
      '2.20 apy calculator',
      '2.10 apy calculator',
      '2.85 apy calculator',
      '2.8 apy calculator',
      '2.3 apy calculator',
      '2.1 apy calculator',
      '2 percent apy calculator',
      '1.5 apy calculator',
      '1.75 apy calculator',
      '1.90 apy calculator',
      '1.85 apy calculator',
      '1.70 apy calculator',
      '1.65 apy calculator',
      '1.60 apy calculator',
      '1.50 apy calculator',
      '1.40 apy calculator',
      '1.30 apy calculator',
      '1.25 apy calculator',
      '1.20 apy calculator',
      '1.10 apy calculator',
      '1.08 apy calculator',
      '1.05 apy calculator',
      '1.01 apy calculator',
      '1.00 apy calculator',
      '1.0 apy calculator',
      '1 apy calculator',
      '1 percent apy calculator',
      '0.5 apy calculator',
      '0.75 apy calculator',
      '0.50 apy calculator',
      '0.30 apy calculator',
      '0.25 apy calculator',
      '0.10 apy calculator',
      '10 apy calculator',
      '7 day apy calculator',
      'apy to monthly rate',
      'savings account interest rate calculator',
      'bank savings interest rates calculator',
      'savings account rates compare',
      'best bank account interest rates',
      'interest rate to apy conversion',
      'compare bank savings rates',
      'apy investment calculator',
      'savings growth calculator',
      'savings return calculator',
      'bank account interest calculator',
      'savings account growth calculator',
      'apy earning calculator',
      'apy account calculator',
      'calculate my apy',
      'apy to monthly calculator',
      'compute apy',
      'estimate apy',
      'apy yearly calculator',
      'annual apy calculator',
      '5 year apy calculator',
      '1 year apy calculator',
      'hysa apy calculator',
      'interest and apy calculator',
      'savings apy comparison',
      'apy comparison calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'APY Calculator: Annual Percentage Yield Calculator',
      description:
        'Calculate APY, convert APY to APR, compare savings rates. Daily, monthly, quarterly compounding. Free India savings calculator.',
      images: ['https://fermor.in/og-apy-calculator.png'],
    },
    openGraph: {
      title: 'APY Calculator: Annual Percentage Yield Calculator',
      description:
        'Free APY calculator for India. Calculate annual percentage yield, convert APY to APR, compare savings account interest rates across compounding frequencies. Free to use.',
      type: 'website',
      url: canonical,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-apy-calculator.png', width: 1200, height: 630, alt: 'APY Calculator' }],
    },
  };
}

const PAGE_DATE_PUBLISHED = '2026-07-21';
const PAGE_DATE_MODIFIED  = '2026-07-22';

const faqItems = [
  {
    q: 'What is APY in banking?',
    a: 'APY (Annual Percentage Yield) is the real rate of return earned on a savings deposit or investment, taking into account the effect of compounding interest. Unlike the nominal interest rate, APY accounts for how frequently interest compounds within a year. A savings account offering 4% nominal interest compounded daily has an APY of approximately 4.08%, because each day\'s interest earns additional interest.',
  },
  {
    q: 'What is the difference between APY and APR?',
    a: 'APY (Annual Percentage Yield) measures how much you earn on a deposit after compounding. APR (Annual Percentage Rate) measures the simple annual cost of a loan without compounding. On a savings account offering 4.5% nominal interest compounded daily, the APY is 4.603%. On a loan with 12% APR compounded monthly, the effective annual rate is 12.68%. In India, RBI mandates APR disclosure on all retail loans under the Fair Lending Practices Code.',
  },
  {
    q: 'How is APY calculated?',
    a: 'APY is calculated using the formula: APY = (1 + r/n)^n - 1, where r is the nominal annual interest rate (as a decimal) and n is the number of compounding periods per year. For daily compounding with a 4% nominal rate: APY = (1 + 0.04/365)^365 - 1 = 4.081%. For monthly compounding: APY = (1 + 0.04/12)^12 - 1 = 4.074%. More frequent compounding always produces a higher APY for the same nominal rate.',
  },
  {
    q: 'What does 4.5% APY mean on a savings account?',
    a: 'A 4.5% APY means that for every Rs 1,00,000 deposited, you earn Rs 4,500 in interest over one year after compounding. If the account compounds daily, the effective daily rate is approximately 0.01232% and the nominal rate used to produce 4.5% APY would be about 4.402%. At the end of one year, Rs 1,00,000 grows to Rs 1,04,500. Yes Bank and IDFC First Bank currently offer savings account rates near this level in India.',
  },
  {
    q: 'What is a good APY for a savings account in India?',
    a: 'As of July 2026, a good APY for a savings account in India is above 4%. Most public sector banks like SBI and PNB offer only 2.70% to 3.00%. HDFC Bank and ICICI Bank offer 2.50% to 3.50%. The highest rates come from small finance banks and a few private banks: IDFC First Bank and Yes Bank offer 7.00% on balances below Rs 1 crore. AU Small Finance Bank offers up to 7.25% on higher balances. These rates far exceed the inflation rate of approximately 4% as of mid-2026.',
  },
  {
    q: 'What does 5% APY mean?',
    a: 'A 5% APY means your deposit earns a real annual return of 5% after all compounding effects. On Rs 1,00,000, you earn Rs 5,000 in one year. On Rs 10,00,000, you earn Rs 50,000. Over 10 years, Rs 1,00,000 at 5% APY grows to approximately Rs 1,62,889. In India, fixed deposits from small finance banks and select private banks occasionally offer 5% and above, particularly for tenures of 1 to 3 years.',
  },
  {
    q: 'What is the highest APY savings account in India?',
    a: 'As of July 2026, IDFC First Bank and Yes Bank offer the highest savings account APY at 7.00% per annum on balances below Rs 1 crore. AU Small Finance Bank offers 7.25% on certain high-value tiers. These rates are substantially above the RBI repo rate of 5.25%, reflecting the deposit-gathering strategy of newer private banks and small finance banks. Rates can change with RBI monetary policy and should be verified on each bank\'s official website before depositing.',
  },
  {
    q: 'How does compounding frequency affect APY?',
    a: 'At a nominal rate of 4.5%, compounding annually gives APY of exactly 4.500%, monthly gives 4.594%, daily gives 4.603%, and continuously gives 4.603%. The difference between monthly and daily compounding is only 0.009 percentage points on a 4.5% nominal rate. For a Rs 10,00,000 deposit held 10 years, daily vs annual compounding at 4.5% nominal produces a Rs 4,680 difference in total interest. In India, savings accounts use daily balance calculation (mandated by RBI in 2010), while FDs typically use quarterly compounding.',
  },
  {
    q: 'Is APY the same as compound interest?',
    a: 'APY is not the same as compound interest, but it expresses the result of compound interest as a standardised annual return. Compound interest is the process of earning interest on previously earned interest. APY is the metric that standardises different compounding frequencies into one comparable annual percentage, making it possible to compare a daily-compounding savings account against a quarterly-compounding FD on equal terms. APY is always equal to or greater than the nominal interest rate.',
  },
  {
    q: 'What is the daily APY formula?',
    a: 'To calculate interest earned on a given day using APY: Daily Interest = Principal x (APY / 365). For a Rs 1,00,000 balance at 4% APY: Daily Interest = 1,00,000 x (0.04 / 365) = Rs 10.96 per day. Over 365 days, this totals Rs 4,000 -- exactly 4% of principal, as expected. Note that savings account interest is calculated on the daily closing balance using the nominal rate, not the APY. The APY is the annualised effective rate that results from the compounding of those daily calculations.',
  },
  {
    q: 'How do I calculate monthly interest from APY?',
    a: 'To find approximate monthly interest from APY: Monthly Rate = (1 + APY/100)^(1/12) - 1. For a 4.5% APY: Monthly Rate = (1.045)^(1/12) - 1 = 0.3675%. On Rs 1,00,000: Monthly Interest = 1,00,000 x 0.003675 = Rs 367.50. Over 12 months, this compounds to Rs 4,500 -- the full 4.5% APY. This is why the APY calculator shows a monthly effective rate alongside the annual rate.',
  },
  {
    q: 'What is APY on a fixed deposit (CD) in India?',
    a: 'Indian fixed deposits use quarterly compounding under RBI guidelines. For a 1-year FD at 7.00% nominal rate, the effective APY is: APY = (1 + 0.07/4)^4 - 1 = 7.186%. For a 5-year FD at 6.50% nominal rate: APY = (1 + 0.065/4)^4 - 1 = 6.648%. The effective APY always exceeds the stated rate for compounding more frequent than once a year. HDFC Bank currently offers 7.00% nominal (approximately 7.186% effective APY) on 1-year to 5-year FDs.',
  },
  {
    q: 'What does 4% APY mean if compounded daily?',
    a: 'At 4% APY compounded daily, the nominal daily rate is APY/365 = 0.010959% per day. On Rs 5,00,000: Daily interest = Rs 5,00,000 x 0.00010959 = Rs 54.79 per day. Annual interest = Rs 54.79 x 365 = Rs 20,000, which is exactly 4% of Rs 5,00,000. For compounding to apply meaningfully, the interest must be credited to the account and reinvested -- which is how savings accounts (credited quarterly) and reinvested FDs work.',
  },
  {
    q: 'How does 7-day APY work?',
    a: 'A 7-day APY, used mainly for money market funds and liquid funds in the US, annualises the return earned over the most recent 7 days. The formula is: 7-Day APY = ((1 + 7-day return)^(365/7)) - 1. In India, liquid funds and overnight funds report returns as annualised 1-day or 7-day yields. As of July 2026, leading liquid funds in India yield approximately 7.00% to 7.50% on a 7-day annualised basis, well above savings account rates.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform providing free financial calculators and a financial eligibility engine. The APY calculator is part of a suite of 525+ calculators covering savings, SIP, home loans, tax, and retirement planning. Fermor is free to use at fermor.in.',
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
  name: 'APY Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/apy-calculator',
  featureList: [
    'APY Calculator with principal, rate, and tenure',
    'APY to APR Converter (daily, monthly, quarterly, semi-annual, annual)',
    'APR to APY Converter',
    'Savings Rate Comparison (multiple APY rates side by side)',
    'Year-by-year growth table',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (1Y, 3Y, 5Y, 10Y, 20Y, 30Y)',
    'Donut chart: principal vs interest split',
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
    { '@type': 'ListItem', position: 3, name: 'APY Calculator', item: 'https://fermor.in/calculators/apy-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Annual Percentage Yield (APY)',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor APY Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your principal', text: 'Type in or slide to your deposit amount. The calculator supports Rs 10,000 to Rs 50,00,000.' },
    { '@type': 'HowToStep', position: 2, name: 'Set the APY rate', text: 'Enter the APY offered by your bank. Current rates range from 2.70% (SBI savings) to 7.00% (IDFC First, Yes Bank) and up to 7.75% for select FDs.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose tenure and compounding', text: 'Select your investment period using year presets (1Y through 30Y) and choose compounding frequency: daily, monthly, quarterly, semi-annual, or annual.' },
    { '@type': 'HowToStep', position: 4, name: 'Read results', text: 'The output shows total interest earned, total corpus, monthly interest, effective APY, and a year-by-year growth table. Use the Comparison tab to compare up to 6 different APY rates.' },
  ],
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description:
    'Fermor is building the automated financial action layer for India, closing the gap between knowing what to do with money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework.',
  knowsAbout: [
    'Annual Percentage Yield',
    'Compound Interest',
    'Savings Account Interest Rates India',
    'Fixed Deposit Returns',
    'APY to APR Conversion',
    'RBI Monetary Policy',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'APY Calculator: Annual Percentage Yield Calculator',
  url: 'https://fermor.in/calculators/apy-calculator',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [
    { '@type': 'DefinedTerm', name: 'Annual Percentage Yield', alternateName: 'APY' },
    { '@type': 'DefinedTerm', name: 'Annual Percentage Rate', alternateName: 'APR' },
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian savers, retail investors, NRI investors, fixed deposit holders',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-apy', name: 'What Is APY?' },
    { '@type': 'WebPageElement', cssSelector: '#apy-formula', name: 'APY Formula' },
    { '@type': 'WebPageElement', cssSelector: '#apy-vs-apr', name: 'APY vs APR' },
    { '@type': 'WebPageElement', cssSelector: '#compounding-effect', name: 'How Compounding Frequency Affects APY' },
    { '@type': 'WebPageElement', cssSelector: '#india-savings-rates', name: 'Best APY Savings Accounts in India' },
    { '@type': 'WebPageElement', cssSelector: '#fd-apy', name: 'APY for Fixed Deposits' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This APY Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#apy-limitations', name: 'Limitations of APY' },
    { '@type': 'WebPageElement', cssSelector: '#faq-section', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'APY',
  alternateName: 'Annual Percentage Yield',
  description:
    'Annual Percentage Yield (APY) is the real rate of return on a deposit or investment that accounts for the effect of compounding interest within a year, expressed as a percentage.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Annual_percentage_yield',
    'https://www.wikidata.org/wiki/Q4774059',
  ],
};

const schemas = [faqSchema, webAppSchema, breadcrumbSchema, howToSchema, organizationSchema, webPageSchema, definedTermSchema];

export default function APYCalculatorPage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <APYCalculatorClient faqItems={faqItems} />
    </>
  );
}

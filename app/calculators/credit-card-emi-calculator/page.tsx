import type { Metadata } from 'next';
import CreditCardEMIClient from './CreditCardEMIClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/credit-card-emi-calculator`;
  return {
    title: 'Credit Card EMI Calculator: Calculate Credit Card EMI in India',
    description:
      'Free credit card EMI calculator for India. Calculate your monthly EMI on credit card purchases, total interest payable, and total repayment. Compare credit card EMI vs full payment. No sign-up required.',
    keywords: [
      'credit card emi calculator',
      'credit card emi',
      'emi on credit card',
      'credit card monthly payment calculator',
      'credit card interest calculator',
      'credit card emi charges',
      'credit card conversion to emi',
      'credit card emi rate',
      'hdfc credit card emi calculator',
      'sbi credit card emi calculator',
      'icici credit card emi calculator',
      'axis bank credit card emi calculator',
      'credit card emi calculator india',
      'credit card emi formula',
      'credit card emi interest rate',
      'credit card processing fee emi',
      'credit card emi foreclosure',
      'credit card emi vs personal loan',
      'credit card emi minimum amount',
      'credit card emi conversion charges',
      'credit card emi cibil score',
      'credit card emi calculator hdfc',
      'credit card emi calculator sbi',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Credit Card EMI Calculator: Calculate Credit Card EMI in India',
      description:
        'Calculate monthly EMI on credit card purchases, total interest payable, and total repayment. Compare credit card EMI vs full payment. Free for India.',
      images: ['https://fermor.in/og-credit-card-emi-calculator.png'],
    },
    openGraph: {
      title: 'Credit Card EMI Calculator: Calculate Monthly Credit Card EMI in India',
      description:
        'Free credit card EMI calculator for India. Calculate monthly EMI on credit card purchases, total interest payable, and total repayment. Compare EMI vs full payment. No sign-up required.',
      type: 'website',
      url: 'https://fermor.in/calculators/credit-card-emi-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-credit-card-emi-calculator.png', width: 1200, height: 630, alt: 'Fermor Credit Card EMI Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-19';
const PAGE_DATE_PUBLISHED = '2026-06-22';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://fermor.in/fermor-schema-logo.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://fermor.in',
    'https://fermor.in/about',
  ],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Credit Card EMI',
    'Personal Finance India',
    'RBI Guidelines',
    'Credit Card Interest',
    'CIBIL Score',
    'Credit Card Debt India',
    'Credit Card Conversion',
    'Reducing Balance Method',
  ],
};

const faqs = [
  {
    q: 'How is credit card EMI calculated?',
    a: 'Credit card EMI is calculated using the reducing balance method with the formula EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]. P is the purchase amount, r is the monthly interest rate (annual rate divided by 12 and then 100), and n is the number of monthly instalments. Most Indian banks including HDFC, SBI, ICICI, and Axis use this standard formula for credit card EMI conversion.',
  },
  {
    q: 'What is the typical credit card EMI interest rate in India?',
    a: 'Credit card EMI interest rates in India range from 12% to 36% per annum depending on the bank and card type. Major banks like HDFC, SBI, ICICI, and Axis typically charge 18% to 30% per annum for standard EMI conversions. Promotional 0% EMI offers carry no interest but may include a processing fee.',
  },
  {
    q: 'Does credit card EMI affect my credit score?',
    a: 'Yes, credit card EMI affects your CIBIL score. Regular on-time EMI payments build a positive credit history and improve your score. However, missed EMI payments are reported as defaults and can significantly damage your score. Converting a large purchase to EMI also increases your credit utilisation ratio, which may temporarily reduce your score until the outstanding balance reduces.',
  },
  {
    q: 'Can I prepay my credit card EMI?',
    a: 'Yes, most Indian banks allow credit card EMI prepayment or foreclosure. Banks typically charge a foreclosure fee of Rs 100 to Rs 500 plus GST. Some banks also collect the remaining interest or charge a percentage of the outstanding amount as a prepayment penalty. Check the specific foreclosure terms with your bank before converting a purchase to EMI.',
  },
  {
    q: 'Is it better to pay in full or convert to EMI?',
    a: 'Paying in full is always cheaper because credit card EMI charges interest at 12% to 36% per annum plus a processing fee. Only convert to EMI if you cannot pay the full amount by the due date. Converting to EMI is still better than paying only the minimum due, because the EMI interest rate is lower than the standard retail interest rate of 36% to 48% that applies to unpaid credit card balances.',
  },
  {
    q: 'What happens if I miss a credit card EMI payment?',
    a: 'Missing a credit card EMI payment triggers a late payment fee of up to Rs 1,300 depending on the outstanding amount, but only once the payment is more than 3 days overdue under RBI rules effective October 2024. The missed payment is reported to credit bureaus including CIBIL, Experian, and Equifax, which damages your credit score. The bank may also charge interest on the overdue amount at the standard retail interest rate.',
  },
  {
    q: 'Credit card EMI vs personal loan: which is better?',
    a: 'A personal loan is generally better for large expenses exceeding 12 months because personal loan interest rates in India range from 10% to 24% per annum, significantly lower than credit card EMI rates of 18% to 36%. For small purchases under Rs 50,000 with short tenures of 3 to 6 months, credit card EMI is more convenient as it requires no separate application or documentation.',
  },
  {
    q: 'What is credit card EMI conversion?',
    a: 'Credit card EMI conversion is a facility offered by Indian banks that allows you to convert a credit card purchase of Rs 2,500 or more into monthly instalments at a specified interest rate. You can initiate the conversion through the bank mobile app, net banking, or by calling customer support. It can be done at the time of purchase (point-of-sale EMI) or after the transaction has been billed.',
  },
  {
    q: 'What processing fees do banks charge for credit card EMI?',
    a: 'Most Indian banks charge a one-time processing fee for credit card EMI conversion ranging from Rs 99 to Rs 999 plus GST, depending on the purchase amount and tenure. Some banks waive the processing fee during promotional offers. The fee is added to the first EMI instalment and is non-refundable even if you prepay the loan.',
  },
  {
    q: 'What is the minimum amount for credit card EMI?',
    a: 'The minimum amount for credit card EMI conversion in India is typically Rs 2,500 to Rs 5,000 per transaction, varying by bank. Some banks also require the total amount to meet a minimum threshold after accounting for any down payment. Check the exact minimum with your card issuer, since it can differ by card variant.',
  },
  {
    q: 'Why does my credit card EMI differ from my statement?',
    a: 'Your credit card EMI differs from the statement amount because the EMI includes both principal repayment and interest charges. The statement shows your total outstanding including all EMIs plus any additional purchases made in the billing cycle. Each EMI consists of a principal component and an interest component. Processing fees, GST, and late fees can also cause variations between expected and billed amounts.',
  },
  {
    q: 'Does RBI cap how much banks can charge for credit card EMI?',
    a: 'RBI does not cap the EMI interest rate itself, since that is a commercial decision by the card issuer, but it does cap the late payment fee (Rs 100 to Rs 1,300 by slab), mandate a 3-day grace period before a payment is reported overdue, and require issuers to publish their APR and EMI terms transparently under the Master Directions on Credit Card and Debit Card Issuance and Conduct.',
  },
  {
    q: 'What is the RBI 3-day grace period rule for credit card payments?',
    a: 'Effective October 2024, RBI rules state that a credit card payment can only be reported as overdue to credit bureaus, or attract a late payment fee, if it remains unpaid for more than 3 days past the due date. This gives cardholders a short buffer against being penalised for a payment that clears just after the due date.',
  },
  {
    q: 'Can a bank auto-enrol me into an EMI conversion scheme?',
    a: 'No. RBI rules give cardholders the right to opt out of any EMI or loan conversion scheme offered by the card issuer. A bank cannot convert a purchase to EMI, or auto-enrol a cardholder into a standing EMI facility, without explicit consent.',
  },
  {
    q: 'How does credit card EMI show up on my credit utilisation?',
    a: 'The moment a purchase is converted to EMI, the full outstanding principal is blocked against your credit limit, exactly like an unpaid purchase. If this pushes your utilisation above roughly 30% of your total limit, it can temporarily lower your CIBIL score even while you are repaying on schedule.',
  },
  {
    q: 'What are HDFC SmartEMI, SBI Flexipay, and similar bank EMI facilities?',
    a: 'These are bank-specific brand names for the same underlying credit card EMI conversion facility. HDFC calls it SmartEMI, SBI Card calls it Flexipay, and ICICI offers EMI on Call. The conversion window (how long after a purchase you can still convert it) and exact rates differ by bank, but the reducing-balance EMI math is the same across all of them.',
  },
  {
    q: 'Is 0% or no-cost EMI on credit cards actually free?',
    a: 'No-cost EMI usually means the interest component is offset by a discount from the merchant or brand at the time of purchase, effectively built into the listed price, rather than the bank waiving interest outright. A processing fee may still apply, and GST is charged on that fee. Read the terms carefully, since "no-cost" describes the net effect, not the absence of any interest calculation.',
  },
  {
    q: 'Can I convert only part of a credit card bill to EMI?',
    a: 'Most banks allow you to select which individual transactions above the minimum EMI threshold to convert, rather than converting the entire bill. This lets you convert a single large purchase while paying the rest of the statement in full, avoiding unnecessary interest on smaller transactions.',
  },
  {
    q: 'Does converting to EMI change my credit card due date?',
    a: 'No. Your card’s billing cycle and due date stay the same. The EMI instalment for that month simply becomes part of your regular monthly statement, added alongside any other purchases made in that billing cycle.',
  },
  {
    q: 'What documents are needed for credit card EMI conversion?',
    a: 'None. Unlike a personal loan, credit card EMI conversion requires no separate application, income proof, or documentation, since it uses your existing approved credit limit. The conversion can typically be completed in the bank app within a few taps.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer free tools that give real answers to real financial questions with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Credit Card EMI Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/credit-card-emi-calculator',
  description: 'Calculate monthly EMI on credit card purchases, total interest payable, total processing fee, and total repayment. Includes processing fee input, month presets, and effective annual rate. Free, browser-based, no sign-up.',
  featureList: [
    'Monthly EMI Calculator',
    'Total Interest Payable',
    'Total Processing Fee',
    'Total Repayment Amount',
    'Effective Annual Rate',
    'Month presets (3M, 6M, 9M, 12M, 18M, 24M)',
    'Processing fee input',
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
    { '@type': 'ListItem', position: 3, name: 'Credit Card EMI Calculator', item: 'https://fermor.in/calculators/credit-card-emi-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Credit Card EMI',
  description: 'Step-by-step guide to calculate your monthly credit card EMI using the reducing balance formula and this calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Credit Card EMI Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the purchase amount',
      text: 'Enter the total purchase amount you want to convert to EMI. This is the principal amount on which EMI will be calculated.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Enter your credit card interest rate',
      text: 'Enter the annual interest rate charged by your bank for credit card EMI conversion. Typical rates range from 12% to 36% per annum.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Select the repayment tenure',
      text: 'Choose the number of months over which you want to repay the amount. Options range from 3 to 60 months. Use the month presets for quick selection.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review your EMI and total repayment',
      text: 'The calculator will show your monthly EMI, total interest payable, processing fee, total repayment amount, and the effective annual rate.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Credit Card EMI',
  alternateName: 'Credit Card Equated Monthly Instalment',
  description: 'A fixed monthly payment made by a credit cardholder to repay a purchase converted to instalments, including both principal and interest, calculated using the reducing balance method.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Credit_card',
    'https://www.wikidata.org/wiki/Q161380',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Credit Card EMI Calculator: Calculate Credit Card EMI in India',
  description: 'Free credit card EMI calculator for India. Calculate monthly EMI on credit card purchases, total interest payable, and total repayment. Compare credit card EMI vs full payment.',
  url: 'https://fermor.in/calculators/credit-card-emi-calculator',
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
    { '@type': 'DefinedTerm', name: 'Credit Card EMI', alternateName: 'Credit Card Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Personal Finance India' },
    { '@type': 'DefinedTerm', name: 'Credit Card Interest' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail consumers, credit card users, personal finance seekers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-credit-card-emi', name: 'What Is Credit Card EMI' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-formula', name: 'Credit Card EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-calculation', name: 'Credit Card EMI Calculation Example' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-vs-personal-loan', name: 'Credit Card EMI vs Personal Loan' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-charges', name: 'Credit Card EMI Charges and Fees' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-foreclosure', name: 'Credit Card EMI Foreclosure and Prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-rbi-rules', name: 'RBI Rules That Protect Credit Card EMI Users' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-bank-comparison', name: 'How Major Indian Banks Structure EMI Conversion' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-cibil-impact', name: 'How Credit Card EMI Affects Your CIBIL Score' },
    { '@type': 'WebPageElement', cssSelector: '#credit-card-emi-limitations', name: 'Limitations of Credit Card EMI' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function CreditCardEMICalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <CreditCardEMIClient faqs={faqs} />
    </>
  );
}

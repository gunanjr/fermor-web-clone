import type { Metadata } from 'next';
import LoanAmortizationCalculatorClient from './LoanAmortizationCalculatorClient';

const PAGE_URL = 'https://fermor.in/calculators/loan-amortization-calculator';
const PAGE_TITLE = 'Loan Amortization Calculator: EMI Amortization Schedule';
const PAGE_DESCRIPTION =
  'Free loan amortization calculator for India. Monthly and yearly EMI schedule, first EMI breakup, prepayment savings and moratorium interest. Free to use.';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
      'loan amortization calculator',
      'amortization calculator',
      'amortization schedule',
      'loan amortization schedule',
      'amortization schedule calculator',
      'emi amortization schedule',
      'emi calculator with amortization schedule',
      'loan repayment schedule',
      'loan payment schedule',
      'loan repayment calculator',
      'loan schedule calculator',
      'amortization calculator india',
      'loan amortization schedule india',
      'home loan amortization calculator',
      'home loan amortization schedule',
      'personal loan amortization calculator',
      'personal loan amortization schedule',
      'car loan amortization calculator',
      'auto loan amortization calculator',
      'mortgage amortization calculator',
      'amortization formula',
      'loan amortization formula',
      'how loan amortization works',
      'how to calculate loan payments',
      'first emi breakup',
      'principal and interest calculator',
      'loan interest and principal calculator',
      'early loan payoff calculator',
      'extra payment loan calculator',
      'loan payoff calculator',
      'emi calculator with moratorium',
      'moratorium interest calculator',
      'broken period interest calculation',
      'loan amortization schedule excel',
      '5 year loan amortization schedule',
      'term loan repayment schedule',
      'monthly loan payment calculator',
    ],
    alternates: { canonical: PAGE_URL },
    twitter: {
      card: 'summary_large_image',
      title: `${PAGE_TITLE} - Fermor`,
      description: 'See how every EMI splits into principal and interest. Yearly and monthly schedule, first EMI breakup, prepayment savings and moratorium support. Free for India.',
      images: ['https://fermor.in/og-loan-amortization-calculator.png'],
    },
    openGraph: {
      title: `${PAGE_TITLE} - Fermor`,
      description: 'See how every EMI splits into principal and interest. Yearly and monthly amortization schedule, first EMI breakup, extra-payment and early payoff savings, and moratorium interest. Free for India.',
      type: 'website',
      url: PAGE_URL,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-loan-amortization-calculator.png', width: 1200, height: 630, alt: 'Fermor Loan Amortization Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-24';
const PAGE_DATE_PUBLISHED = '2026-06-30';

/* Single source of truth: rendered in the visible FAQ and in the FAQPage schema. */
const faqItems = [
  {
    q: 'What is a loan amortization schedule?',
    a: 'A loan amortization schedule is a table that lists every EMI of a loan with its interest portion, principal portion and the balance left after the payment. The EMI stays fixed, but the interest share falls and the principal share rises each month. For a Rs 10 lakh loan at 9% for 5 years, the first EMI of Rs 20,758 carries Rs 7,500 of interest, while the last carries only Rs 155.',
  },
  {
    q: 'How does loan amortization work?',
    a: 'Each month, interest is charged on the outstanding balance at one-twelfth of the annual rate. The EMI pays that interest first, and the rest reduces the principal. Because the balance keeps falling, the interest in each EMI falls too, so more of every later EMI goes to principal until the balance reaches zero on the final EMI.',
  },
  {
    q: 'What is the loan amortization formula?',
    a: 'The EMI formula is EMI = P x R x (1+R)^N / [(1+R)^N - 1], where P is the loan amount, R is the monthly rate (annual rate / 12 / 100) and N is the number of monthly EMIs. Within each month, interest = opening balance x R, principal = EMI - interest, and closing balance = opening balance - principal.',
  },
  {
    q: 'How do I calculate my monthly loan payment?',
    a: 'Convert the annual rate to a monthly rate, convert the tenure to months, and apply the EMI formula. For Rs 10 lakh at 9% for 5 years, R = 0.0075, N = 60 and (1.0075)^60 = 1.565681, so EMI = 10,00,000 x 0.0075 x 1.565681 / 0.565681 = Rs 20,758. As a shortcut, the EMI at 9% for 20 years is about Rs 900 per lakh borrowed.',
  },
  {
    q: 'What is the first EMI breakup of a loan?',
    a: 'The interest in the first EMI equals the full loan amount multiplied by the monthly rate, and the rest of the EMI is principal. On a Rs 50 lakh home loan at 8.5% for 20 years, the first EMI of Rs 43,391 is Rs 35,417 interest (81.6%) and Rs 7,974 principal. On a Rs 5 lakh personal loan at 12% for 3 years, interest is 30.1% of the first EMI.',
  },
  {
    q: 'Why is more interest paid in the early years of a loan?',
    a: 'Interest is charged on the outstanding balance, and the balance is highest at the start. With a fixed EMI, a bigger slice goes to interest in the early months and a smaller slice to principal. On a 20-year home loan at 8.5%, principal overtakes interest only at EMI 143, almost 12 years into the loan.',
  },
  {
    q: 'How much of my loan is repaid halfway through the tenure?',
    a: 'Less than half on most long loans. On a Rs 50 lakh loan at 8.5% for 20 years, half the principal is cleared only at EMI 166, about 13.8 years in. On a Rs 10 lakh loan at 9% for 5 years, the halfway point comes at EMI 34, because short loans are far less interest-heavy.',
  },
  {
    q: 'Can I use this as a home loan amortization calculator in India?',
    a: 'Yes. Enter the sanctioned amount, the rate on your sanction letter and the tenure in years. The yearly schedule shows interest and principal for each loan year, which helps with Section 24(b) and Section 80C planning, and the monthly view lists every EMI. For a pre-EMI phase on an under-construction home, set a moratorium under More settings and choose Pay monthly.',
  },
  {
    q: 'Does this work for personal loan and car loan amortization?',
    a: 'Yes. The EMI math is identical for personal, car, two-wheeler, education and business term loans repaid in equal monthly instalments. A Rs 5 lakh personal loan at 12% for 3 years has an EMI of Rs 16,607 and costs Rs 97,858 in interest. A Rs 8 lakh car loan at 9% for 5 years has the same EMI of Rs 16,607 and costs Rs 1,96,401.',
  },
  {
    q: 'How do extra payments change the amortization schedule?',
    a: 'Extra payments go straight to principal, so the balance falls faster, every later EMI carries less interest, and the loan closes early with the EMI unchanged. On a Rs 50 lakh loan at 8.5% for 20 years, paying Rs 5,000 extra every month closes the loan in 187 EMIs instead of 240 and saves Rs 13,89,250 in interest.',
  },
  {
    q: 'How much interest can I save by paying off a loan early?',
    a: 'It depends on how early you pay and how much. A Rs 5 lakh prepayment on a Rs 50 lakh, 20-year loan at 8.5% saves Rs 16,03,691 if made with EMI 12, Rs 13,19,639 with EMI 36, and Rs 5,71,382 with EMI 120. Use the One-Time Prepayment setting in this calculator to test your own timing.',
  },
  {
    q: 'After a prepayment, should I reduce EMI or tenure?',
    a: 'Reducing tenure saves more interest. On a Rs 50 lakh, 20-year loan at 8.5%, a Rs 5 lakh prepayment after 36 EMIs saves Rs 13,19,639 if the EMI is kept and the tenure shortened, but only Rs 4,46,858 if the tenure is kept and the EMI cut to Rs 38,750. A lower EMI makes sense mainly when monthly cash flow is tight.',
  },
  {
    q: 'Are there prepayment charges on loans in India?',
    a: 'Not on floating-rate loans to individuals for non-business purposes. RBI barred prepayment penalties on floating-rate term loans to individual borrowers in May 2014, and its Pre-payment Charges on Loans Directions, 2025 apply the rule to all such loans sanctioned or renewed from 1 January 2026, for part and full prepayment. Fixed-rate loans can still carry a charge under the lender\'s policy.',
  },
  {
    q: 'How is interest calculated during a moratorium period?',
    a: 'No EMI is due during a moratorium, but interest accrues on the amount disbursed. If it is added to the loan, the EMI is calculated on the higher balance: Rs 10 lakh at 10.5% with a 24-month moratorium accrues Rs 2,10,000, raising the 10-year EMI from Rs 13,493 to Rs 16,327. Paying the interest monthly (Rs 8,750 here) keeps the EMI at Rs 13,493 and saves Rs 1,30,036.',
  },
  {
    q: 'What is broken period interest?',
    a: 'Broken period interest is the interest for the days between loan disbursement and the start of the first full EMI cycle. It is commonly calculated as loan amount x annual rate x days / 365, so Rs 30 lakh at 8.5% for 24 days works out to Rs 16,767. Lenders usually collect it upfront or add it to the first EMI.',
  },
  {
    q: 'How do I make a loan amortization schedule in Excel?',
    a: 'Use =PMT(rate/12, months, -loan) for the EMI, =IPMT(rate/12, n, months, -loan) for the interest in EMI n, and =PPMT(rate/12, n, months, -loan) for the principal. For a manual sheet, use five columns: EMI number, opening balance, interest (opening balance x rate / 12), principal (EMI - interest) and closing balance, then fill down until the balance reaches zero.',
  },
  {
    q: 'What is the difference between reducing balance and flat rate?',
    a: 'A reducing-balance rate charges interest on the outstanding amount, which falls every month. A flat rate charges interest on the original amount for the full tenure. On Rs 5 lakh for 3 years, 10% reducing costs Rs 80,809 in interest, while 10% flat costs Rs 1,50,000, the same as a reducing rate of about 17.92%.',
  },
  {
    q: 'How do I find the outstanding balance on my loan?',
    a: 'The closing balance after any EMI in the schedule is your outstanding principal at that point. On a Rs 10 lakh loan at 9% for 5 years, the balance is Rs 8,34,170 after 12 EMIs, Rs 6,52,784 after 24 and Rs 4,54,383 after 36. A lender statement can differ slightly because of rounding and the actual days in each month.',
  },
  {
    q: 'What does a 5-year loan amortization schedule look like?',
    a: 'A 5-year schedule has 60 EMIs grouped into five years. For Rs 10 lakh at 9%, you pay Rs 2,49,100 each year. Interest falls from Rs 83,270 in year 1 to Rs 67,714, Rs 50,699, Rs 32,088 and finally Rs 11,730 in year 5, while principal rises from Rs 1,65,830 to Rs 2,37,370.',
  },
  {
    q: 'What is negative amortization?',
    a: 'Negative amortization happens when the payment is smaller than the interest due, so unpaid interest is added to the balance and the loan grows instead of shrinking. For floating-rate EMI personal loans, RBI requires lenders to ensure that extending the tenure after a rate rise does not cause negative amortization. A moratorium with capitalised interest raises the balance the same way, but only before EMIs begin.',
  },
  {
    q: 'Is the lender required to give me an amortization schedule?',
    a: 'Yes, for new loans. RBI requires banks and NBFCs to give a Key Facts Statement for all retail and MSME term loans sanctioned on or after 1 October 2024, and the KFS must include the Annual Percentage Rate and the amortisation schedule for the full tenure. Floating-rate EMI personal loans also get a quarterly statement showing principal and interest recovered, the EMI and EMIs left.',
  },
  {
    q: 'How does a floating interest rate change my amortization schedule?',
    a: 'When the rate resets, the lender either raises the EMI or extends the tenure, and the schedule is recalculated from the balance on that date. On a Rs 50 lakh, 20-year loan at 8.5%, a 0.5% increase after 36 EMIs raises the EMI by Rs 1,426 if the tenure stays the same, or adds about 17 EMIs if the EMI stays the same.',
  },
  {
    q: 'How much of my home loan EMI is tax deductible?',
    a: 'Under the old tax regime, interest on a self-occupied home is deductible up to Rs 2 lakh a year under Section 24(b), and principal counts toward the Rs 1.5 lakh Section 80C limit. The new regime allows neither for a self-occupied home. On a Rs 50 lakh loan at 8.5% for 20 years, first-year interest is Rs 4,21,182, so only Rs 2 lakh of it is deductible.',
  },
  {
    q: 'Is a shorter or longer loan tenure better?',
    a: 'A shorter tenure costs less in total and a longer one costs less each month. Rs 50 lakh at 8.5% costs Rs 24.39 lakh in interest over 10 years and Rs 54.14 lakh over 20 years, with EMIs of Rs 61,993 and Rs 43,391. Many borrowers pick a tenure with a comfortable EMI and then prepay to shorten it.',
  },
  {
    q: 'Why does my bank\'s schedule differ from this calculator?',
    a: 'Small differences usually come from rounding and day counts. Lenders often round the EMI up to the next rupee, some compute interest on the actual days in each month instead of one-twelfth of the annual rate, and broken period interest or fees may be added. The gap should be a few rupees a month. A bigger gap usually means a different rate or tenure.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

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
  description: 'Fermor is building the automated financial action layer for India. The system closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Loan Amortization',
    'Amortization Schedule',
    'EMI Calculation',
    'Loan Prepayment',
    'Moratorium Interest',
    'Home Loans India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'RBI Regulations',
    'Credit Management',
  ],
};

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
  name: 'Loan Amortization Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: PAGE_URL,
  description: PAGE_DESCRIPTION,
  featureList: [
    'Monthly EMI with reducing-balance formula',
    'Yearly and Monthly Amortization Schedule',
    'Stacked Bar Chart of Principal vs Interest by Year',
    'Principal vs Interest Donut Chart',
    'First EMI Interest and Principal Breakup',
    'Extra Monthly Payment and One-Time Prepayment',
    'Interest Saved and EMIs Saved from Prepayment',
    'Moratorium Period with Capitalised or Monthly-Paid Interest',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Tenure presets (1Y, 3Y, 5Y, 10Y, 15Y, 20Y, 30Y) with years or months input',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Loan Amortization Calculator', item: PAGE_URL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Create a Loan Amortization Schedule',
  description: 'Build a month-by-month loan amortization schedule with the EMI split into principal and interest, including extra payments and a moratorium.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Loan Amortization Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter the loan amount', text: 'Set the amount borrowed, from Rs 10,000 to Rs 5 crore, with the slider or by clicking the value and typing it.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter the interest rate', text: 'Enter the annual interest rate from your sanction letter or loan offer, between 1% and 30%.' },
    { '@type': 'HowToStep', position: 3, name: 'Choose the tenure', text: 'Pick the repayment period in years or months, or use the 1Y to 30Y presets.' },
    { '@type': 'HowToStep', position: 4, name: 'Add prepayments or a moratorium', text: 'Under More settings, add an extra monthly payment, a one-time prepayment with the EMI number it is paid with, or a moratorium period with interest added to the loan or paid monthly.' },
    { '@type': 'HowToStep', position: 5, name: 'Read the results', text: 'Check the monthly EMI, total interest, total amount payable, the interest in the first EMI, the number of EMIs and the interest saved by prepaying.' },
    { '@type': 'HowToStep', position: 6, name: 'Open the amortization schedule', text: 'Expand Loan Amortization Schedule to see the principal vs interest bar chart and switch between the yearly and monthly tables.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Loan Amortization',
  alternateName: 'Amortization Schedule',
  description: 'Loan amortization is the repayment of a loan through equal periodic instalments, each covering that period\'s interest on the outstanding balance plus part of the principal, until the balance reaches zero.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Amortization_schedule',
    'https://www.wikidata.org/wiki/Q2254409',
    'https://en.wikipedia.org/wiki/Amortizing_loan',
    'https://www.wikidata.org/wiki/Q4747796',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
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
    cssSelector: ['h1', 'h2', '.article-lead'],
  },
  about: [
    { '@type': 'DefinedTerm', name: 'Loan Amortization', alternateName: 'Amortization Schedule' },
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Loan Prepayment' },
    { '@type': 'DefinedTerm', name: 'Moratorium Period' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian borrowers, home loan and personal loan customers, car and education loan borrowers, financial planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-loan-amortization', name: 'What Is Loan Amortization' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-use', name: 'When to Use a Loan Amortization Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#amortization-formula', name: 'Loan Amortization Formula' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked Example: Rs 10 Lakh at 9% for 5 Years' },
    { '@type': 'WebPageElement', cssSelector: '#yearly-schedule', name: '5-Year Loan Amortization Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#first-emi-breakup', name: 'First EMI Breakup' },
    { '@type': 'WebPageElement', cssSelector: '#read-amortization-schedule', name: 'How to Read an Amortization Schedule' },
    { '@type': 'WebPageElement', cssSelector: '#amortization-by-loan-type', name: 'Amortization by Loan Type' },
    { '@type': 'WebPageElement', cssSelector: '#tenure-vs-interest', name: 'Loan Tenure vs Total Interest' },
    { '@type': 'WebPageElement', cssSelector: '#emi-per-lakh', name: 'Monthly Loan Payment per Rs 1 Lakh' },
    { '@type': 'WebPageElement', cssSelector: '#extra-payments', name: 'Extra Payments and Early Loan Payoff' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-emi-or-tenure', name: 'Reduce EMI or Reduce Tenure' },
    { '@type': 'WebPageElement', cssSelector: '#moratorium-pre-emi', name: 'Moratorium, Pre-EMI and Broken Period Interest' },
    { '@type': 'WebPageElement', cssSelector: '#reducing-vs-flat', name: 'Reducing Balance vs Flat Rate' },
    { '@type': 'WebPageElement', cssSelector: '#amortization-excel', name: 'Loan Amortization Schedule in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#home-loan-tax', name: 'Home Loan Amortization and Income Tax' },
    { '@type': 'WebPageElement', cssSelector: '#rbi-rules', name: 'RBI Rules on Repayment Schedules' },
    { '@type': 'WebPageElement', cssSelector: '#common-mistakes', name: 'Common Loan Amortization Mistakes' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Loan Amortization Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function LoanAmortizationCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <LoanAmortizationCalculatorClient faqs={faqItems} />
    </>
  );
}

import type { Metadata } from 'next';
import EMIReductionClient from './EMIReductionClient';

export const metadata: Metadata = {
  title: 'EMI Reduction Calculator: Prepayment Impact on Home Loan',
  description: 'Free EMI reduction calculator for India. Enter loan details and a prepayment amount to see your new lower EMI or reduced tenure and total interest saved.',
  keywords: [
    'emi reduction calculator',
    'home loan tenure reduction calculator',
    'emi tenure reduction calculator',
    'prepayment emi reduction calculator',
    'loan tenure reduction calculator',
    'home loan emi reduction calculator',
    'home loan emi reduction',
    'emi tenure reduction',
    'emi amount reduction',
    'home loan tenure reduction',
    'prepayment calculator home loan',
    'home loan prepayment emi calculator',
    'reduce emi after prepayment',
    'reduce tenure after prepayment',
    'lump sum prepayment home loan',
    'prepayment impact home loan',
    'home loan interest saved calculator',
    'outstanding principal calculator',
    'emi reduction after part payment',
    'home loan part payment calculator',
    'reduce home loan tenure calculator',
    'interest saved prepayment calculator',
    'home loan part prepayment savings',
    'part payment emi reduction',
    'home loan prepayment india',
    'floating rate home loan prepayment',
    'rbi prepayment rules home loan',
    'emi reduction formula india',
  ],
  openGraph: {
    title: 'EMI Reduction Calculator: Prepayment Impact on Home Loan - Fermor',
    description: 'See exactly how a lump-sum prepayment lowers your home loan EMI or cuts your tenure. Calculates outstanding principal, new EMI, months saved, and total interest saved.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-emi-reduction-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMI Reduction Calculator: Prepayment Impact on Home Loan - Fermor',
    description: 'See how a lump-sum prepayment lowers your home loan EMI or cuts your tenure. Free calculator for India.',
    images: ['https://fermor.in/og-emi-reduction-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/emi-reduction-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an EMI reduction calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An EMI reduction calculator shows how a lump-sum prepayment on your home loan changes your monthly instalment or remaining tenure. You enter your original loan details, the number of months already paid, and the prepayment amount. The calculator then computes your new lower EMI (Option A: same remaining tenure) or your new shorter tenure (Option B: same original EMI), along with total interest saved under each scenario.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a lump-sum prepayment reduce your home loan EMI?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When you make a lump-sum prepayment, it reduces the outstanding principal on your home loan. Your bank then recalculates your EMI using the same reducing-balance formula but with the lower principal. Because interest is charged on the outstanding balance each month, a smaller balance means a smaller interest component in each instalment, resulting in a lower EMI for the same remaining tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the formula to calculate the new EMI after prepayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The new EMI after prepayment is calculated using the standard formula: New EMI = New Principal x r x (1+r)^n / ((1+r)^n - 1), where r = annual rate / 12 / 100 and n = remaining months (total tenure minus months already paid). New Principal = Outstanding balance minus prepayment amount. The outstanding balance after k months is: P x (1+r)^k minus EMI x ((1+r)^k minus 1) / r.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I reduce EMI or reduce tenure after prepayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reducing tenure after prepayment saves significantly more total interest than reducing EMI, because you eliminate all future months of interest accrual. Reducing EMI is better if you need immediate cash flow relief. For a Rs 50 lakh loan at 8.5% with a Rs 5 lakh prepayment, reducing tenure saves about Rs 17.56 lakh in interest while reducing EMI saves only about Rs 5.41 lakh, since in the latter case you still pay 240 instalments on the lower balance.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does EMI reduce after a Rs 5 lakh prepayment on a Rs 50 lakh home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a Rs 50 lakh home loan at 8.5% for 20 years, the original EMI is approximately Rs 43,392. A Rs 5 lakh prepayment at origination reduces the outstanding principal to Rs 45 lakh. Option A (reduce EMI): new EMI falls to approximately Rs 39,053, a reduction of Rs 4,339 per month. Option B (reduce tenure): same EMI of Rs 43,392 is paid for only 188 months instead of 240, saving 52 months and approximately Rs 17.56 lakh in total interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I reduce my home loan EMI without making a prepayment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can reduce your home loan EMI without prepayment through a balance transfer to a lender offering a lower interest rate, which reduces the interest component of each instalment. You can also request a tenure extension from your existing bank, which spreads the remaining principal over more months and lowers the monthly payment. A drop in the RBI repo rate also automatically reduces EMIs on floating-rate loans linked to the EBLR benchmark.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the RBI rule on prepayment charges for home loans?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Per RBI circular DBOD.No.Dir.BC.28/13.03.00/2012-13, banks and housing finance companies cannot levy prepayment or foreclosure charges on floating-rate home loans. This means most home loan borrowers in India can prepay any amount, at any time, at zero cost. Fixed-rate home loans may carry prepayment charges of 2 to 4 percent of the outstanding amount, but floating-rate borrowers face no such charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I calculate the outstanding home loan principal after N months?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Outstanding principal after k months = P x (1+r)^k minus EMI x ((1+r)^k minus 1) / r, where P is the original principal, r is the monthly interest rate (annual rate divided by 12 divided by 100), EMI is the original equated monthly instalment, and k is the number of months already paid. At month zero the outstanding equals the full principal; it decreases slowly in early years and faster in later years as more of each EMI goes toward principal.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many months does a Rs 5 lakh prepayment save on a 20-year Rs 50 lakh home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a Rs 50 lakh home loan at 8.5% for 20 years, a Rs 5 lakh prepayment at origination reduces the remaining tenure from 240 months to approximately 188 months when the original EMI is kept unchanged. This saves 52 months, or about 4 years and 4 months, and reduces total interest paid from approximately Rs 54.14 lakh to approximately Rs 36.58 lakh, a saving of Rs 17.56 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a prepayment penalty on home loans in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No prepayment penalty applies to floating-rate home loans in India. The Reserve Bank of India (RBI) banned such charges on floating-rate retail loans in 2012. Fixed-rate home loans may have prepayment charges, typically 2 to 4 percent of the outstanding balance on the date of prepayment. Before making a lump-sum payment, confirm with your lender whether your loan is on a floating or fixed rate and check your loan agreement for any applicable charges.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the best time to make a prepayment on a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time to make a prepayment on a home loan is in the early years of the tenure, when the outstanding balance is highest and each rupee of prepayment reduces the most interest. In the first few years, around 70 to 80 percent of each EMI goes toward interest. A prepayment in year 1 saves more total interest than the same amount prepaid in year 10, because it eliminates interest charges over a longer remaining period. If you have surplus funds, prioritize prepayment before the midpoint of your loan tenure.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum prepayment amount for a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most Indian banks and housing finance companies accept prepayments equivalent to at least one or two months of EMI. There is typically no regulatory minimum, but lenders may set their own internal thresholds. SBI, HDFC Bank, and ICICI Bank generally accept any prepayment amount above the minimum stated in the loan agreement. Check your sanction letter or call your branch to confirm the exact minimum for your loan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between part payment and foreclosure of a home loan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A part payment (also called a prepayment) is a lump-sum amount paid toward the outstanding principal in addition to your regular EMI; the loan continues with either a reduced EMI or shorter tenure. Foreclosure means paying off the entire remaining outstanding principal in one payment to close the loan account entirely. Both are free of charge on floating-rate home loans per RBI guidelines. Part payments give you flexibility; foreclosure gives you complete closure and eliminates all future interest.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is an Indian fintech platform providing 500 plus free financial calculators and a financial eligibility engine that matches users with loans and investment products they qualify for. Fermor is built in India and available free at fermor.in.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'EMI Reduction Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/emi-reduction-calculator',
  featureList: [
    'Option A: Reduce EMI after prepayment (same remaining tenure)',
    'Option B: Reduce Tenure after prepayment (same original EMI)',
    'Outstanding principal calculator (balance after N months)',
    'Interest saved calculation for both options',
    'Months and years saved with tenure reduction',
    'Donut chart: original interest vs interest saved',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Tenure presets (5Y, 10Y, 15Y, 20Y, 25Y, 30Y)',
    'LocalStorage persistence of all calculator inputs',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-07-14',
  dateModified: '2026-07-14',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'EMI Reduction Calculator', item: 'https://fermor.in/calculators/emi-reduction-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate EMI Reduction After Prepayment',
  description: 'Use the free EMI reduction calculator to find your new lower EMI or shorter tenure after a lump-sum prepayment on your home loan.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor EMI Reduction Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter loan amount',
      text: 'Enter the original principal amount of your home loan using the slider or by clicking the displayed value to type a precise number in rupees.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set annual interest rate',
      text: 'Set the annual interest rate your bank charges. For floating-rate loans linked to EBLR, use the current rate shown in your latest bank statement.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose total loan tenure',
      text: 'Select your original loan tenure in years using the presets (5Y, 10Y, 15Y, 20Y, 25Y, 30Y) or the slider. Use the same tenure that appears in your loan sanction letter.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Enter months already paid',
      text: 'Enter how many EMIs you have already paid. If this is a fresh loan and you are planning a prepayment at origination, leave it at zero. The calculator uses this to compute your current outstanding principal.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Enter prepayment amount and compare options',
      text: 'Enter the lump-sum amount you plan to prepay. Switch between the Reduce EMI tab (to see your new lower monthly instalment) and the Reduce Tenure tab (to see how many months you cut off your loan and how much interest you save). Choose the option that fits your cash flow and financial goals.',
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
    'Home Loan EMI Calculation',
    'Loan Prepayment Strategy',
    'Outstanding Principal Calculation',
    'RBI Prepayment Regulations',
    'Home Loan Tenure Reduction',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'EMI Reduction Calculator: Prepayment Impact on Home Loan',
  url: 'https://fermor.in/calculators/emi-reduction-calculator',
  datePublished: '2026-07-14',
  dateModified: '2026-07-14',
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
    { '@type': 'DefinedTerm', name: 'Prepayment', alternateName: 'Lump-sum Loan Prepayment' },
    { '@type': 'DefinedTerm', name: 'EMI', alternateName: 'Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Tenure Reduction', alternateName: 'Home Loan Tenure Reduction after Prepayment' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian home loan borrowers, first-time home buyers, NRI borrowers planning prepayment',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-emi-reduction', name: 'What is an EMI reduction after prepayment?' },
    { '@type': 'WebPageElement', cssSelector: '#how-prepayment-reduces-emi', name: 'How prepayment reduces your home loan EMI' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-emi-vs-tenure', name: 'Reduce EMI vs reduce tenure: which is better?' },
    { '@type': 'WebPageElement', cssSelector: '#emi-reduction-formula', name: 'EMI reduction formula' },
    { '@type': 'WebPageElement', cssSelector: '#reduce-without-prepayment', name: 'How to reduce your home loan EMI without prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#prepayment-charges-rbi', name: 'Prepayment charges and RBI rules' },
    { '@type': 'WebPageElement', cssSelector: '#interest-saved', name: 'How much interest does prepayment save?' },
    { '@type': 'WebPageElement', cssSelector: '#worked-example', name: 'Worked example: Rs 50 lakh loan prepayment' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to use this EMI reduction calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faqs', name: 'Frequently asked questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Prepayment',
  alternateName: 'Lump-sum Loan Prepayment',
  description: 'A prepayment is a lump-sum amount paid toward a loan principal in addition to the regular EMI, which reduces the outstanding balance and results in either a lower monthly instalment or a shorter loan tenure.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Finance and Banking Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Prepayment_of_loan',
    'https://www.wikidata.org/wiki/Q7240601',
  ],
};

export default function EMIReductionCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EMIReductionClient />
    </>
  );
}

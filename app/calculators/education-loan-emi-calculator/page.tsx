import type { Metadata } from 'next';
import EducationLoanEMIClient from './EducationLoanEMIClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/education-loan-emi-calculator`;
  return {
    title: 'Education Loan EMI Calculator: Calculate Education Loan EMI in India',
    description:
      'Free education loan EMI calculator for India. Calculate your monthly EMI on education loans, total interest payable, and total repayment. Includes moratorium period and multi-currency support. No sign-up required.',
    keywords: [
      'education loan emi calculator',
      'education loan calculator india',
      'student loan calculator',
      'education loan emi',
      'study loan calculator',
      'education loan interest calculator',
      'abroad education loan calculator',
      'education loan repayment calculator',
      'higher education loan calculator',
      'student loan emi calculator',
      'education loan moratorium period calculator',
      'education loan monthly payment calculator',
      'education loan amortization calculator',
      'education loan calculator with moratorium',
      'calculate education loan emi',
      'education loan interest rate calculator',
      'student loan repayment calculator india',
      'study abroad loan calculator',
      'education loan calculator sbi',
      'education loan calculator online',
      'education loan eligibility calculator',
      'nri education loan calculator',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Education Loan EMI Calculator: Calculate Education Loan EMI in India',
      description:
        'Calculate education loan EMI, total interest payable, and total repayment. Includes moratorium period and multi-currency support. Free for India.',
      images: ['https://fermor.in/og-education-loan-emi-calculator.png'],
    },
    openGraph: {
      title: 'Education Loan EMI Calculator: Calculate Education Loan EMI in India',
      description:
        'Calculate monthly EMI on education loans, total interest payable, and total repayment with moratorium period support. Includes Section 80E tax benefit analysis and multi-currency support. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/education-loan-emi-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-education-loan-emi-calculator.png', width: 1200, height: 630, alt: 'Fermor Education Loan EMI Calculator' }],
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
    'Education Loan EMI',
    'Personal Finance India',
    'RBI Guidelines',
    'Education Loan India',
    'Student Finance',
    'Higher Education Loans',
    'Account Aggregator Framework',
    'Section 80E Tax Benefits',
    'Indian Education Loan Schemes',
  ],
};

const faqs = [
  {
    q: 'How is education loan EMI calculated?',
    a: 'Education loan EMI is calculated using the standard EMI formula: EMI = P x r x (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments. If there is a moratorium period, interest accrued during that period is added to the principal before EMI calculation begins.',
  },
  {
    q: 'What is the moratorium period for education loans?',
    a: 'The moratorium period for education loans in India is the duration during which the borrower is not required to make any principal repayments. It typically covers the course duration plus 6 to 12 months, or until the borrower secures employment, whichever is earlier. Interest continues to accrue during this period and is capitalized into the loan principal when repayment begins.',
  },
  {
    q: 'How is interest calculated during the moratorium period?',
    a: 'Interest during the moratorium period is calculated as simple interest on the loan amount. The formula is: Interest = Loan Amount x Annual Interest Rate x (Moratorium Period in Months / 12). This accrued interest is added to the principal at the start of the repayment period, and the EMI is then calculated on the total capitalized amount.',
  },
  {
    q: 'What is the interest rate on education loans in India?',
    a: 'Education loan interest rates in India typically range from 8% to 15% per annum, depending on the bank or NBFC, the loan amount, the course, and the borrower or co-applicant credit profile. Public sector banks like SBI offer education loans starting around 8% to 10% for amounts up to Rs 7.5 lakh, while private banks and NBFCs may charge 11% to 15%.',
  },
  {
    q: 'What is the Section 80E tax benefit for education loans?',
    a: 'Section 80E of the Income Tax Act allows a deduction for the entire interest paid on an education loan for higher studies. There is no upper limit on the deduction amount, and it is available for a maximum of 8 years or until the interest is fully paid, whichever is earlier. The loan must be taken from a bank or approved financial institution for the education of the individual, spouse, children, or a student for whom the individual is the legal guardian.',
  },
  {
    q: 'Can I prepay my education loan?',
    a: 'Yes, most banks and NBFCs in India allow prepayment of education loans. Many lenders do not charge prepayment penalties on floating-rate education loans, as per RBI guidelines. Fixed-rate loans may have prepayment charges of 2% to 5% of the outstanding amount. Prepaying can significantly reduce the total interest burden, especially if done early in the repayment tenure.',
  },
  {
    q: 'What happens if I default on an education loan?',
    a: 'Defaulting on an education loan negatively impacts your credit score and CIBIL report. The lender may classify the account as a non-performing asset after 90 days of non-payment. The lender can initiate recovery proceedings, report the default to credit bureaus, and the co-borrower or guarantor becomes liable. Defaulting can also affect future loan eligibility and the borrower ability to get visas for some countries.',
  },
  {
    q: 'Education loan vs personal loan for studies - what is the difference?',
    a: 'Education loans offer lower interest rates (8% to 15%), longer repayment tenures up to 15 years, and a moratorium period covering the course duration plus 6 to 12 months. Personal loans for studies have higher interest rates (12% to 24%), shorter tenures of 1 to 5 years, no moratorium period, and immediate repayment starting from the next month. Education loans also offer tax benefits under Section 80E, while personal loans do not.',
  },
  {
    q: 'What is the maximum education loan amount?',
    a: 'Education loan amounts in India vary by lender and course. For studies in India, loans typically range from Rs 10 lakh to Rs 40 lakh. For studies abroad, loans can go up to Rs 1.5 crore or more depending on the institution, course, and collateral provided. Under the SBI Scholar Loan scheme, loans up to Rs 1.5 crore are available for premier institutions. Many NBFCs like Avanse and HDFC Credila offer loans up to Rs 1 crore without collateral and up to Rs 3 crore with collateral.',
  },
  {
    q: 'Do I need collateral for an education loan?',
    a: 'Collateral requirements for education loans in India depend on the loan amount. Under the Indian Banks Association guidelines, loans up to Rs 4 lakh require no collateral and no margin. Loans from Rs 4 lakh to Rs 7.5 lakh also require no collateral. Loans above Rs 7.5 lakh typically require collateral in the form of property, fixed deposits, or a third-party guarantee. Some private NBFCs offer unsecured education loans without collateral but at higher interest rates.',
  },
  {
    q: 'What is the repayment tenure for education loans?',
    a: 'Education loan repayment tenures in India typically range from 5 to 15 years after the moratorium period ends. Public sector banks generally offer tenures of 10 to 15 years, while private lenders may offer up to 10 years. The actual tenure offered depends on the loan amount and the borrower repayment capacity. A longer tenure reduces the EMI amount but increases the total interest payable over the life of the loan.',
  },
  {
    q: 'What is the interest subsidy on education loans?',
    a: 'The Central Sector Interest Subsidy Scheme (CSIS) provides a full interest subsidy on education loans during the moratorium period for students from economically weaker families with an annual family income of up to Rs 4.5 lakh. The subsidy covers the interest accrued during the course period and the 1-year grace period after the course ends. This scheme applies to loans taken from scheduled banks for professional or technical courses in India.',
  },
  {
    q: 'What is the PM-Vidyalakshmi Scheme?',
    a: 'Launched in November 2024, PM-Vidyalakshmi is the Government of India’s unified education loan portal at pmvidyalaxmi.co.in. It lets students submit one Common Education Loan Application Form to up to three lenders at once, compare offers side by side, and access collateral-free loans with a credit guarantee and interest subvention for students admitted to Quality Higher Education Institutions.',
  },
  {
    q: 'What is the Vidya Lakshmi portal, and is it still active?',
    a: 'Vidya Lakshmi was the earlier government single-window education loan portal. It has effectively been replaced and expanded by the PM-Vidyalakshmi Scheme launched in November 2024, which is now the current official portal for applying to multiple lenders through one application.',
  },
  {
    q: 'What documents are required for an education loan?',
    a: 'Typical requirements include proof of admission, academic records, identity and address proof, income proof for the co-applicant, and a cost sheet from the institution showing tuition, accommodation, and other expenses. Loans above Rs 7.5 lakh also require collateral documents such as property papers or fixed deposit receipts.',
  },
  {
    q: 'Can an NRI or a student studying abroad get an Indian education loan?',
    a: 'Yes, but most Indian banks require a resident Indian co-applicant, usually a parent, since the loan is disbursed and recovered in India. Interest rates for study-abroad loans typically run 0.5 to 1 percentage point higher than domestic study loans, and margin money requirements are usually higher too, around 15% of the total cost for overseas study versus about 5% for studies in India.',
  },
  {
    q: 'What is margin money in an education loan?',
    a: 'Margin money is the portion of the total course cost the borrower must fund independently rather than through the loan. For loans above Rs 4 lakh, banks typically require about 5% margin for studies in India and about 15% for studies abroad, meaning the loan does not cover 100% of the total cost above these thresholds.',
  },
  {
    q: 'Does paying interest during the moratorium period actually save money?',
    a: 'Yes, substantially. On a Rs 10 lakh loan at 10.5% with a 24-month moratorium, servicing the simple interest as it accrues instead of letting it capitalise into the principal saves roughly Rs 1,30,000 in total cost over the loan tenure, since the EMI is then calculated on the original Rs 10 lakh rather than an inflated capitalised amount.',
  },
  {
    q: 'How much does choosing a shorter repayment tenure save on total interest?',
    a: 'Shortening the tenure raises the EMI but lowers total interest paid, since less time means less compounding. On a capitalised principal of roughly Rs 12.1 lakh at 10.5%, moving from a 12-year to a 7-year tenure raises the EMI by about 38% but cuts total interest by roughly 37%, a favourable trade for anyone who can afford the higher monthly payment.',
  },
  {
    q: 'Is an education loan balance transfer worth it?',
    a: 'It can be, if another lender offers a meaningfully lower rate. A 1 percentage point rate cut on a Rs 15 lakh loan with 8 years remaining saves approximately Rs 76,000 in total interest, which typically outweighs any processing fee charged for the transfer.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, with no sign-up required. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it. Fermor is not a comparison site or a content platform. The calculators earn trust. The action platform is the product.',
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
  name: 'Education Loan EMI Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/education-loan-emi-calculator',
  description: 'Calculate monthly EMI on education loans, total interest payable, and total repayment. Includes moratorium period support, multi-currency conversion, and Section 80E tax benefit reference. Free, browser-based, no sign-up.',
  featureList: [
    'Education Loan EMI Calculation',
    'Moratorium Period Support (0 to 48 months)',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'Year presets (5Y, 7Y, 10Y, 12Y, 15Y, 20Y)',
    'Capitalised interest during moratorium display',
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
    { '@type': 'ListItem', position: 3, name: 'Education Loan EMI Calculator', item: 'https://fermor.in/calculators/education-loan-emi-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Education Loan EMI',
  description: 'Step-by-step guide to calculate education loan EMI using the Fermor calculator, including the moratorium period impact.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Education Loan EMI Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the loan amount',
      text: 'Enter the total education loan amount you need. This includes tuition fees, accommodation, and other education-related expenses.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the interest rate',
      text: 'Enter the annual interest rate offered by your bank or NBFC. Education loan rates in India typically range from 8% to 15% per annum.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Choose the repayment tenure',
      text: 'Select the number of years over which you want to repay the loan. Typical education loan tenures range from 5 to 15 years after the moratorium period.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the EMI and total repayment',
      text: 'The calculator shows your monthly EMI after the moratorium period, the total interest payable, and the total repayment amount. Adjust any input to compare scenarios.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Education Loan EMI',
  alternateName: 'Education Loan Equated Monthly Instalment',
  description: 'The fixed monthly payment a borrower makes to repay an education loan after the moratorium period ends, including both principal and interest components.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Education Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Student_loan',
    'https://www.wikidata.org/wiki/Q668202',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Education Loan EMI Calculator: Calculate Education Loan EMI in India',
  description: 'Free education loan EMI calculator for India. Calculate monthly EMI on education loans, total interest payable, and total repayment including moratorium period. No sign-up required.',
  url: 'https://fermor.in/calculators/education-loan-emi-calculator',
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
    { '@type': 'DefinedTerm', name: 'Education Loan EMI', alternateName: 'Education Loan Equated Monthly Instalment' },
    { '@type': 'DefinedTerm', name: 'Moratorium Period' },
    { '@type': 'DefinedTerm', name: 'Student Loan' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian students, parents of students, NRI students, higher education loan borrowers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-education-loan-emi', name: 'What Is Education Loan EMI' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-emi-formula', name: 'Education Loan EMI Formula' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-moratorium', name: 'How Moratorium Period Affects Your EMI' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-tax-benefits', name: 'Education Loan Tax Benefits Under Section 80E' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-vs-personal-loan', name: 'Education Loan vs Personal Loan for Studies' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-repayment-strategies', name: 'Education Loan Repayment Strategies' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-govt-schemes', name: 'Government Schemes That Reduce Education Loan Cost' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-documents-nri', name: 'Documents Required and NRI Considerations' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-emi-limitations', name: 'Limitations of Education Loan EMI Calculators' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function EducationLoanEMICalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EducationLoanEMIClient faqs={faqs} />
    </>
  );
}

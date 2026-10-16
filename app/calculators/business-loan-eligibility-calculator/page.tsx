import type { Metadata } from 'next';
import BusinessLoanEligibilityClient from './BusinessLoanEligibilityClient';

const PAGE_DATE_PUBLISHED = '2026-06-25';
const PAGE_DATE_MODIFIED = '2026-09-23';

export const metadata: Metadata = {
  title: 'Business Loan Eligibility Calculator by Turnover',
  description: 'Free business loan eligibility calculator. Check max loan amount by turnover, net profit, CIBIL score, and MSME status. Secured and unsecured options.',
  keywords: [
    'business loan eligibility calculator',
    'how much business loan can i get',
    'working capital loan eligibility calculator',
    'how to calculate business loan eligibility',
    'business loan calculator',
    'commercial loan eligibility calculator',
    'business loan eligibility check online',
    'msme loan eligibility calculator',
    'unsecured business loan eligibility calculator',
    'secured business loan eligibility calculator',
    'business loan eligibility based on turnover',
    'business loan emi calculator',
    'business loan eligibility calculator hdfc',
    'icici business loan eligibility calculator',
    'sbi business loan eligibility calculator',
    'business loan eligibility check',
    'small business loan calculator',
    'msme loan eligibility check',
    'working capital loan calculator',
    'mudra loan eligibility calculator',
    'business loan eligibility hdfc bank',
    'how much loan can i get for business',
    'gst based business loan calculator',
    'emi calculator business loan',
  ],
  openGraph: {
    title: 'Business Loan Eligibility Calculator by Turnover - Fermor',
    description: 'Free business loan eligibility calculator. Check max loan amount by turnover, net profit, CIBIL score, and MSME status. Secured and unsecured options.',
    type: 'website',
    url: 'https://fermor.in/calculators/business-loan-eligibility-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-business-loan-eligibility-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Loan Eligibility Calculator by Turnover - Fermor',
    description: 'Calculate max business loan amount by turnover, net profit, CIBIL score, and MSME status instantly.',
    images: ['https://fermor.in/og-business-loan-eligibility-calculator.png'],
  },
  alternates: { canonical: 'https://fermor.in/calculators/business-loan-eligibility-calculator' },
};

const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Business Loan Eligibility Calculator', item: 'https://fermor.in/calculators/business-loan-eligibility-calculator' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much business loan can I get?', acceptedAnswer: { '@type': 'Answer', text: 'Your business loan eligibility depends on your annual turnover and net profit. Unsecured loans are typically 10-15% of annual turnover (maximum). For example, on a Rs 50 Lakh turnover, you can get Rs 5-7.5 Lakh unsecured. Secured loans (with collateral) can be 30-50% of turnover or based on collateral value, whichever is lower.' } },
    { '@type': 'Question', name: 'How is business loan eligibility calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Banks use two methods: the Turnover Method (10-15% of annual gross turnover for unsecured loans) and the Profit/DSCR Method (based on net profit from ITR). Your eligible loan is the lower of the two amounts. This ensures you have enough cash flow to pay the monthly EMI without financial stress.' } },
    { '@type': 'Question', name: 'How much business loan can I get on 1 Crore turnover?', acceptedAnswer: { '@type': 'Answer', text: 'On Rs 1 Crore annual turnover, you can typically qualify for Rs 10-15 Lakh unsecured business loan, assuming your net profit is healthy and CIBIL score is above 700. For secured loans (with property as collateral), you could get Rs 30-50 Lakh or more depending on the collateral value.' } },
    { '@type': 'Question', name: 'What is the minimum turnover required for a business loan?', acceptedAnswer: { '@type': 'Answer', text: 'For unsecured business loans from private banks like HDFC or ICICI, the minimum annual turnover is Rs 40 Lakh. For smaller businesses with Rs 10-20 Lakh turnover, government-backed Mudra loans or MSME schemes are a better fit, with loans up to Rs 10 Lakh available.' } },
    { '@type': 'Question', name: 'What documents do I need for a business loan?', acceptedAnswer: { '@type': 'Answer', text: 'Required documents include: Identity and address proof of all promoters, business registration certificate (GST or Udyam registration), last 2-3 years of audited ITRs with P&L statements and balance sheets, last 6-12 months of current account bank statements, and (for term loans) a business plan or project report.' } },
    { '@type': 'Question', name: 'What DSCR do banks require?', acceptedAnswer: { '@type': 'Answer', text: 'Debt Service Coverage Ratio (DSCR) of 1.25 or higher is the standard bank requirement. This means your monthly profit must be at least 1.25 times your total monthly debt obligations (including the new loan EMI). If you have monthly profit of Rs 1 Lakh and existing EMIs of Rs 40,000, your maximum new EMI is Rs 60,000.' } },
    { '@type': 'Question', name: 'Do MSMEs get better business loan rates?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Registered MSMEs under Udyam registration get preferential rates under government schemes like CGTMSE (Credit Guarantee Scheme for Micro and Small Enterprises), which offers collateral-free loans up to Rs 5 Crore at lower rates, typically 1-2% cheaper than standard unsecured loans.' } },
    { '@type': 'Question', name: 'Can I get a business loan with bad credit?', acceptedAnswer: { '@type': 'Answer', text: 'Banks typically require a CIBIL score of 700-750+, so bad credit makes it harder. However, if your business shows strong profit and GST compliance, some lenders like Mudra, NBFC platforms, or government schemes may approve loans even with lower credit scores. Expect higher interest rates though.' } },
    { '@type': 'Question', name: 'How long does business loan approval take?', acceptedAnswer: { '@type': 'Answer', text: 'Unsecured business loans typically take 2-5 days for approval after you submit documents, since the decision is based purely on financials. Secured loans (with collateral) take 15-30 days because the bank must appraise the collateral property. Mudra loans are the fastest, often approved in 1-2 days.' } },
    { '@type': 'Question', name: 'What is the maximum business loan amount I can get?', acceptedAnswer: { '@type': 'Answer', text: 'For unsecured loans, the maximum is typically Rs 25-50 Lakh depending on turnover. For secured loans, there is no fixed cap. The limit depends on your collateral value, DSCR, and business vintage. Some businesses can access Rs 1 Crore or more in secured loans.' } },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication',
  name: 'Business Loan Eligibility Calculator by Fermor', applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/business-loan-eligibility-calculator',
  description: 'Calculate max eligible business loan based on annual turnover, net profit from ITR, and MSME status. Compare secured and unsecured options.',
  featureList: ['Turnover-based analysis', 'Profit (DSCR) based analysis', 'Secured vs Unsecured toggle', 'MSME scheme considerations', 'Multi-currency support', 'localStorage persistence'],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED,
};

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo',
  name: 'How to Check Business Loan Eligibility', totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Business Loan Eligibility Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your annual turnover', text: 'Enter your business gross annual turnover/sales.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter net profit', text: 'Enter the annual net profit as reported in your latest ITR.' },
    { '@type': 'HowToStep', position: 3, name: 'Add existing EMIs', text: 'Enter total business EMIs you already pay.' },
    { '@type': 'HowToStep', position: 4, name: 'Select loan type', text: 'Toggle between Secured (with collateral) and Unsecured (no collateral) as this heavily impacts eligibility.' },
    { '@type': 'HowToStep', position: 5, name: 'View your eligible amount', text: 'See the maximum loan you qualify for based on the stricter of the turnover or profit methods.' },
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org', '@type': 'WebPage',
  name: 'Business Loan Eligibility Calculator: Check by Turnover & Profit',
  url: 'https://fermor.in/calculators/business-loan-eligibility-calculator',
  datePublished: PAGE_DATE_PUBLISHED, dateModified: PAGE_DATE_MODIFIED, inLanguage: 'en-IN',
  isPartOf: { '@type': 'WebSite', name: 'Fermor', url: 'https://fermor.in' },
  author: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in', logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png' } },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', 'article p:first-of-type'] },
  about: [{ '@type': 'DefinedTerm', name: 'Business Loan' }],
  audience: { '@type': 'Audience', audienceType: 'Indian MSMEs, business owners, entrepreneurs', geographicArea: { '@type': 'Country', name: 'India' } },
};

export default function BusinessLoanEligibilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <BusinessLoanEligibilityClient />
    </>
  );
}

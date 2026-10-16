import type { Metadata } from 'next';
import Section80CClient from './Section80CClient';

export async function generateMetadata(): Promise<Metadata> {
  const canonicalPath = 'calculators';
  const canonical = `https://fermor.in/${canonicalPath}/section-80c-calculator`;
  return {
    title: 'Section 80C Calculator: Online Tax Savings Calculator India',
    description:
      'Free Section 80C calculator for India. Calculate how much tax you can save by investing in PPF, ELSS, EPF, NSC, and other 80C instruments under the old tax regime.',
    keywords: [
      'section 80c calculator',
      '80c deduction calculator',
      'tax saving calculator',
      'income tax calculator 80c',
      'section 80c tax saving',
      '80c investment calculator',
      'ppf tax saving calculator',
      'elss tax saving calculator',
      '80c limit 1.5 lakh',
      'nps 80ccd 1b calculator',
      'section 80c tax deduction',
      'old tax regime calculator',
      'tax saving instruments india',
      '80c eligible investments',
      'tax planning calculator',
      'income tax deduction 80c',
      'ppf calculator 80c',
      'nsc tax saving calculator',
      'sukanya samriddhi tax calculator',
      'section 80c ppf',
      'home loan principal 80c',
      'tuition fee 80c deduction',
      '80c life insurance deduction',
      'scss tax deduction calculator',
      'section 80c',
      '80c deductions',
      '80c limit',
      '80c deduction list',
      'deduction under 80c',
      'deduction under section 80c',
      'section 80c of income tax act',
      '80c of income tax act',
      '80c income tax',
      '80 c deduction',
      '80c and 80d',
      '80c in new tax regime',
      '80c deduction in new tax regime',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Section 80C Calculator: Online Tax Savings Calculator India',
      description:
        'Calculate how much tax you can save by investing in PPF, ELSS, EPF, NSC, and other 80C instruments under the old tax regime.',
      images: ['https://fermor.in/og-section-80c-calculator.png'],
    },
    openGraph: {
      title: 'Section 80C Calculator: Online Tax Savings Calculator India',
      description:
        'Calculate how much tax you can save by investing in PPF, ELSS, EPF, NSC, and other 80C instruments under the old tax regime. Includes NPS 80CCD(1B) additional deduction.',
      type: 'website',
      url: 'https://fermor.in/calculators/section-80c-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-section-80c-calculator.png', width: 1200, height: 630, alt: 'Fermor Section 80C Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-07-06';
const PAGE_DATE_PUBLISHED = '2026-07-06';

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
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system: connecting real financial accounts through the Account Aggregator framework, seeing the complete financial picture, and automating the decisions most people know they should make but never get around to.',
  knowsAbout: [
    'Section 80C',
    'Tax Saving Investments',
    'Income Tax India',
    'PPF',
    'ELSS',
    'EPF',
    'NSC',
    'NPS',
    'Sukanya Samriddhi Yojana',
    'Tax Planning India',
    'Old Tax Regime',
    'New Tax Regime',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Section 80C of the Income Tax Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80C of the Income Tax Act, 1961 allows individual taxpayers to claim a deduction of up to Rs 1.5 lakh per financial year for specified investments and expenses. These include EPF, PPF, ELSS, NSC, tax-saving fixed deposits, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees for children, and principal repayment of home loans. The deduction is only available under the old tax regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum deduction under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The maximum deduction under Section 80C is Rs 1.5 lakh (Rs 1,50,000) per financial year. This limit covers all 80C-eligible investments and expenses combined. An additional Rs 50,000 deduction is available under Section 80CCD(1B) for NPS contributions, bringing the total potential deduction from retirement-related contributions to Rs 2 lakh.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which investments are eligible under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Eligible investments under Section 80C include: EPF (Employee Provident Fund), PPF (Public Provident Fund), ELSS (Equity Linked Savings Scheme), tax-saving fixed deposits with 5-year lock-in, NSC (National Savings Certificate), life insurance premiums, Sukanya Samriddhi Yojana, Senior Citizens Savings Scheme, 5-year post office time deposit, and principal repayment of home loan. Tuition fees for up to two children are also eligible.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim Section 80C deduction under the new tax regime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Section 80C deductions are not available under the new tax regime. The Section 80C deduction is only available under the old tax regime, which allows taxpayers to claim deductions for specified investments and expenses up to Rs 1.5 lakh per year.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Section 80CCD(1B) and how is it different from 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80CCD(1B) is an additional deduction specifically for NPS contributions, over and above the Rs 1.5 lakh limit of Section 80C. You can claim up to Rs 50,000 per year under this section. Combined with Section 80C, an individual investing in NPS can claim total deductions of up to Rs 2 lakh per year. Section 80CCD(1B) is also only available under the old tax regime.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much tax can I save by investing Rs 1.5 lakh under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tax saved depends on your marginal tax rate. At the 5% slab, investing Rs 1.5 lakh saves Rs 7,800 (including 4% cess). At the 20% slab, it saves Rs 31,200. At the 30% slab, it saves Rs 46,800. If you also claim Rs 50,000 under Section 80CCD(1B), the total saving at the 30% slab increases to Rs 62,400.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the lock-in period for ELSS under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ELSS (Equity Linked Savings Scheme) has the shortest lock-in period among all Section 80C investments at just 3 years. This makes it the most liquid 80C-eligible option. After 3 years, you can withdraw the entire amount with no further lock-in. Historically, ELSS has delivered 10-15% CAGR over long periods, though returns are market-linked and not guaranteed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim home loan principal repayment under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the principal portion of your home loan EMI qualifies for deduction under Section 80C, subject to the overall limit of Rs 1.5 lakh. This is separate from the interest deduction under Section 24(b), which allows up to Rs 2 lakh for self-occupied property. To claim principal repayment under 80C, you must not transfer the property within 5 years of possession.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is PPF a good investment for Section 80C tax saving?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PPF is one of the most popular Section 80C investments because it offers a government-guaranteed return (currently 7.1%), tax-free interest, and tax-free maturity proceeds under the EEE (Exempt-Exempt-Exempt) category. The lock-in period is 15 years, with partial withdrawals allowed from year 7. PPF interest is set by the government quarterly and revised along with other small savings schemes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does tuition fee for children qualify under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, tuition fees paid for the education of up to two children qualify for deduction under Section 80C. This includes fees paid to any school, college, university, or other educational institution in India. The deduction is limited to the actual fees paid, not exceeding the overall Section 80C limit of Rs 1.5 lakh. Admission fees, examination fees, and development fees are included, but donations or capitation fees are not eligible.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I invest more than Rs 1.5 lakh under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your total 80C-eligible investments and expenses exceed Rs 1.5 lakh in a financial year, the excess amount does not qualify for any additional tax deduction. The deduction is capped at Rs 1.5 lakh regardless of how much you invest above this limit. Any surplus investments still earn their regular returns (interest, maturity proceeds, etc.) but provide no extra tax benefit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can NRIs claim Section 80C deductions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, NRIs can claim Section 80C deductions on their Indian income that is taxable in India. Eligible investments include NRE/NRO fixed deposits with 5-year lock-in, life insurance policies issued in India, PPF (if opened while resident), and EPF contributions. Tuition fees paid for children in Indian institutions also qualify. NRI taxpayers should evaluate whether the old or new tax regime is more beneficial given their specific income profile.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Section 80C and 80G?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 80C provides deductions for investments and specified expenses (like PPF, ELSS, tuition fees) up to Rs 1.5 lakh per year. Section 80G provides deductions for donations made to specified charitable funds and institutions, with varying deduction rates (50% or 100%) and qualifying limits. Unlike 80C, 80G donations have no overall cap of Rs 1.5 lakh but individual donation limits apply based on the specific fund.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which investment is best under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best Section 80C investment depends on your time horizon and risk appetite. PPF and tax-saving fixed deposits suit guaranteed returns, while ELSS suits long-term equity exposure with the shortest 3-year lock-in. Compare each option against your goal before choosing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim Section 80C for both EPF and PPF in the same year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, you can invest in EPF and PPF together, but the combined deduction is capped at Rs 1.5 lakh. Your EPF contribution usually uses up part of the limit before you invest anything else. Check your salary slip to see how much is already covered.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is life insurance premium eligible under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, life insurance premiums qualify under Section 80C within limits. For policies issued after 1 April 2012, the premium must not exceed 10 per cent of the sum assured. Term plans, endowment plans and ULIPs can all qualify if the condition is met.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a 5-year tax-saving fixed deposit eligible under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, a 5-year tax-saving fixed deposit with a bank or post office qualifies under Section 80C. The deposit is locked in for 5 years with no premature withdrawal. The interest earned is fully taxable each year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I claim Section 80C for my spouse or children?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, for certain investments made in their names. PPF, life insurance and Sukanya Samriddhi deposits for your spouse or children qualify, and so do tuition fees for up to two children. Investments made for your parents do not qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Sukanya Samriddhi Yojana eligible under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, deposits into a Sukanya Samriddhi account qualify under Section 80C. The account is opened for a girl child, and deposits are allowed up to Rs 1.5 lakh a year. The interest and maturity amount are tax-free.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my employer EPF contribution count under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, only your own contribution to the Employees Provident Fund counts under Section 80C. The employer share is not part of your deduction. Voluntary contributions through VPF are eligible within the Rs 1.5 lakh cap.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I show Section 80C investments to my employer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Submit investment proofs to your employer when asked, usually between December and February. Employers adjust TDS based on the proofs you give. If you miss the deadline, you can still claim the deduction when filing your ITR.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are stamp duty and registration charges eligible under Section 80C?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, stamp duty and registration fees paid to buy a house qualify under Section 80C. The deduction is allowed in the year of payment and counts toward the Rs 1.5 lakh limit. It applies only to residential property.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Section 80C limit higher for senior citizens?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No, the Section 80C limit is Rs 1.5 lakh for every individual regardless of age. Senior citizens can use the Senior Citizens Savings Scheme as an eligible instrument. Their higher benefits come from the exemption limit and other sections.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fermor is a financial platform built for India. The calculators are free tools that give real answers to real financial questions. A free account is available to save results and access them any time. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Section 80C Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/section-80c-calculator',
  description: 'Calculate tax savings from PPF, ELSS, EPF, NSC, and other 80C-eligible investments under the old tax regime. Includes NPS 80CCD(1B) additional deduction calculation.',
  featureList: [
    'Section 80C Tax Savings Calculation',
    'NPS 80CCD(1B) Additional Deduction',
    'Donut Chart: Tax Saved vs Tax Paid',
    '80C Investment Options Reference Table',
    'Currency Support (INR, USD, EUR, GBP)',
    'Other Deductions Support (80D, Home Loan Interest)',
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
    { '@type': 'ListItem', position: 3, name: 'Section 80C Calculator', item: 'https://fermor.in/calculators/section-80c-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Section 80C Calculator',
  description: 'Step-by-step guide to calculate your tax savings under Section 80C using the Fermor calculator.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Section 80C Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter your annual income',
      text: 'Enter your gross total income from all sources for the financial year.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add your Section 80C investments',
      text: 'Enter the total amount you have invested in 80C-eligible instruments like PPF, ELSS, EPF, NSC, life insurance, and tuition fees.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enter NPS and other deductions',
      text: 'Add your NPS contribution under Section 80CCD(1B) and other deductions like health insurance premiums (80D) and home loan interest.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review your tax savings',
      text: 'The result panel shows your tax saved, total tax with 80C deductions, your optimal 80C investment amount, and a donut chart visualising the proportion of tax saved versus tax paid.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Section 80C',
  alternateName: '80C Deduction',
  description: 'Section 80C of the Income Tax Act, 1961 allows individual taxpayers to claim a deduction of up to Rs 1.5 lakh per financial year for specified investments and expenses including PPF, ELSS, EPF, NSC, life insurance premiums, Sukanya Samriddhi Yojana, tuition fees, and home loan principal repayment.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Tax & Investment Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Income_Tax_Act,_1961#Section_80C',
    'https://www.wikidata.org/wiki/Q24928706',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Section 80C Calculator: Free Online Tax Savings Calculator India',
  description: 'Free Section 80C calculator for India. Calculate how much tax you can save by investing in PPF, ELSS, EPF, NSC, and other 80C instruments under the old tax regime. Includes NPS 80CCD(1B) deduction.',
  url: 'https://fermor.in/calculators/section-80c-calculator',
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
    { '@type': 'DefinedTerm', name: 'Section 80C', alternateName: '80C Deduction' },
    { '@type': 'DefinedTerm', name: 'Tax Saving Investments India' },
    { '@type': 'DefinedTerm', name: 'PPF' },
    { '@type': 'DefinedTerm', name: 'ELSS' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian taxpayers, salaried employees, investors, NRI taxpayers',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-section-80c', name: 'What Is Section 80C' },
    { '@type': 'WebPageElement', cssSelector: '#section-80c-limit', name: 'Section 80C Deduction Limit' },
    { '@type': 'WebPageElement', cssSelector: '#eligible-investments', name: 'Eligible Investments Under Section 80C' },
    { '@type': 'WebPageElement', cssSelector: '#section-80c-vs-80ccd', name: 'Section 80C vs 80CCD(1B) vs 80CCD(2)' },
    { '@type': 'WebPageElement', cssSelector: '#tax-savings-calculation', name: 'Tax Savings Calculation Under Section 80C' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-maximize', name: 'How to Maximize Your Section 80C Tax Savings' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use the Section 80C Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function Section80CPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <Section80CClient />
    </>
  );
}

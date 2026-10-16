import type { Metadata } from 'next';
import EducationCorpusCalculatorClient from './EducationCorpusCalculatorClient';

const PAGE_DATE_MODIFIED = '2026-09-16';
const PAGE_DATE_PUBLISHED = '2026-07-08';
const CANONICAL = 'https://fermor.in/calculators/education-corpus-calculator';

export const metadata: Metadata = {
  title: 'Education Corpus Calculator: Future Child Education Cost India',
  description: 'Free education corpus calculator for India. Calculate the future cost of your child\'s higher education based on current fees and education inflation. Free, instant results.',
  keywords: [
    'education corpus calculator',
    'child education fund calculator',
    'future education cost calculator india',
    'education inflation calculator',
    'child education planning calculator',
    'education cost calculator india',
    'higher education cost calculator',
    'college cost calculator india',
    'education savings calculator',
    'child future education calculator',
    'engineering education cost calculator',
    'mba cost calculator india',
    'foreign education cost calculator',
    'study abroad cost calculator',
    'education fund planning calculator',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Education Corpus Calculator: Future Child Education Cost - Fermor',
    description: 'Calculate how much corpus you need for your child\'s education. Plan for inflation-adjusted future costs.',
    url: CANONICAL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Education Corpus Calculator: Future Child Education Cost - Fermor',
    description: 'Calculate how much corpus you need for your child\'s education. Plan for inflation-adjusted future costs.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  sameAs: ['https://fermor.in'],
  knowsAbout: ['Education Planning India', 'Education Inflation', 'Child Education Fund', 'Section 80E', 'Sukanya Samriddhi Yojana', 'Financial Calculators'],
};

const faqs = [
  { q: 'How is education corpus calculated?', a: 'The calculator projects today\'s education cost to the future using the formula: Future Cost = Current Cost x (1 + Education Inflation Rate)^Years to Education. Years to education is the gap between your child\'s current age and the planned education start age.' },
  { q: 'Why is education inflation higher than general inflation?', a: 'Education costs in India have historically risen at 10-12% annually at private institutions, well above general CPI inflation. This is driven by rising faculty salaries, infrastructure investment, and rising demand for quality seats. Premier institutions have seen fee hikes of 15-20% in some years.' },
  { q: 'What is the official government-measured education inflation rate in India?', a: 'MOSPI\'s Consumer Price Index tracks an education services sub-group separately from headline CPI. This official figure has run close to 3.5-4.5% recently, lower than the 10-12% figure commonly used for private college fee planning, because the CPI basket is dominated by lower-cost government and budget private schools, not premier institutions.' },
  { q: 'What education costs should I include in the current cost?', a: 'Include tuition fees, hostel accommodation, books, and any other major recurring expenses for the full course. For a 4-year engineering degree at a private college, current fees might be Rs 4-8 lakh total. For an MBA at a top institution, it could be Rs 20-25 lakh. Be realistic with the current cost figure.' },
  { q: 'Can I use this for foreign education planning?', a: 'Yes, but adjust the current cost to reflect international fees in Indian Rupees and use a higher inflation rate (12-15%) since foreign tuition and living costs typically rise faster than domestic. Also budget separately for currency fluctuation between INR and the destination country\'s currency.' },
  { q: 'Is education loan interest tax deductible?', a: 'Yes. Under Section 80E, the full interest paid on an education loan is deductible with no upper limit, for up to 8 years from the year repayment starts or until the interest is fully paid, whichever is earlier. Only interest qualifies, not principal repayment.' },
  { q: 'Can I use Sukanya Samriddhi Yojana for my daughter\'s education?', a: 'Yes, for a girl child under 10. SSY currently pays 8.2% per annum, and up to 50% of the balance can be withdrawn once she turns 18 or completes class 10, specifically for education expenses. Use the Sukanya Samriddhi Yojana Calculator to project the maturity value.' },
  { q: 'How is education corpus different from a child education plan?', a: 'The education corpus is the total amount you need to accumulate. A child education plan is a financial product, like a mutual fund SIP or an insurance-linked plan, designed to help you reach that corpus. This calculator determines the target corpus first.' },
  { q: 'How much does an engineering degree cost in India today?', a: 'A 4-year B.Tech at a private engineering college typically costs Rs 4-10 lakh total in fees, depending on the institution and branch. Government IITs and NITs cost far less, around Rs 8-10 lakh total including hostel, but admission is far more competitive.' },
  { q: 'How much does an MBA cost in India today?', a: 'A 2-year MBA at a top-tier private business school (ISB, top private universities) can run Rs 20-30 lakh total. Government-run IIMs are more affordable relative to their ranking, typically Rs 15-25 lakh for the full 2-year program including hostel.' },
  { q: 'How much does medical education (MBBS) cost in India today?', a: 'A government medical college MBBS seat costs Rs 1-6 lakh for the full 5.5-year course. A private medical college seat can cost Rs 50 lakh to over Rs 1 crore for the same duration, making early planning especially important for private medical seats.' },
  { q: 'Should I invest in an SIP or a fixed deposit for education corpus?', a: 'For a horizon beyond 7-10 years, an equity-oriented SIP has historically outpaced education inflation better than fixed deposits, which typically yield 6-7.5%. For a horizon under 5 years, shift toward debt instruments and FDs to protect the corpus from market volatility close to the goal date.' },
  { q: 'What happens if I fall short of the education corpus target?', a: 'An education loan can bridge the gap, with the interest fully deductible under Section 80E. Many families use a combination: the accumulated corpus covers 60-70% of costs, with an education loan covering the remainder, keeping loan EMIs manageable after the course.' },
  { q: 'Does the calculator account for multi-year course fees paid annually?', a: 'The calculator projects the total course cost to a single future value at the start of education. For a multi-year course, fees are usually paid annually, so treat the projected figure as the total corpus needed at admission, with later-year fees also rising with inflation from that point.' },
  { q: 'How often should I revisit my education corpus plan?', a: 'Review annually, or whenever there is a major change: a shift in your child\'s intended field of study, a new school announcement of fee structure, or a significant change in your own income. Education inflation assumptions should also be revisited every few years against actual fee trends.' },
  { q: 'What if my child chooses a different education path than planned?', a: 'A well-built corpus targeting a mid-range private college estimate usually has enough flexibility to cover a government college (lower cost) or fall slightly short for an ultra-premium private or foreign option. Keep the corpus in liquid or semi-liquid instruments as the education date approaches so it can be redirected easily.' },
  { q: 'How does currency fluctuation affect foreign education planning?', a: 'The Rupee has depreciated against the US Dollar and other major currencies over most long-term periods, which compounds on top of the destination country\'s own tuition inflation. For foreign education goals, many planners build in an additional 2-3% a year specifically for currency depreciation, separate from tuition inflation.' },
  { q: 'Can grandparents contribute to an education corpus?', a: 'Yes, and it is common in Indian families. Gifts from grandparents to grandchildren are not taxable in the grandchild\'s hands under the Income Tax Act, since grandparents qualify as relatives. Any income earned on money gifted directly to a minor child is still clubbed with the parent\'s income for tax purposes, per Section 64(1A).' },
  { q: 'Is an education loan itself taxable as income?', a: 'No. An education loan is a liability, not income, so it is never taxed when disbursed. Only the interest saved (via the Section 80E deduction) reduces your taxable income during the repayment years.' },
  { q: 'What is PM-Vidyalaxmi and who can use it?', a: 'PM-Vidyalaxmi is a central government scheme offering collateral-free, guarantor-free education loans up to Rs 7.5 lakh, backed by a 75% credit guarantee, for students admitted to any of 1,425 listed Quality Higher Education Institutions. Eligible lower-income students also get interest support during the study period. Management quota and NRI quota admissions do not qualify.' },
  { q: 'When does an education loan require collateral in India?', a: 'Under the IBA Model Education Loan Scheme, loans up to Rs 4 lakh need no collateral or guarantor, loans between Rs 4 lakh and Rs 7.5 lakh accept a third-party guarantee with no tangible collateral, and loans above Rs 7.5 lakh require tangible collateral such as property or a fixed deposit.' },
  { q: 'Can I claim a tax deduction for school tuition fees separately from an education loan?', a: 'Yes. Actual tuition fees for up to two children are deductible under Section 80C, within the overall Rs 1.5 lakh combined limit, separate from the Section 80E loan interest deduction. If both parents pay tax, each can claim for up to two children. This is only available under the old tax regime.' },
  { q: 'Are there government scholarships that can reduce my education corpus target?', a: 'Yes. The National Scholarship Portal brings together 140+ central and state scholarship schemes covering Class 1 through PhD, including merit, minority, SC/ST/OBC/EWS, and disability categories. Applications typically open each June with most deadlines around October 31. Even a scholarship covering 10-20% of fees meaningfully reduces the corpus you need to save.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform for India. Every calculator is free to use, and a free account is available to save your results and access them later. Fermor is building an automated financial action system using the Account Aggregator framework to connect real accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.q, acceptedAnswer: { '@type': 'Answer', text: faq.a } })),
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Education Corpus Calculator by Fermor',
  url: CANONICAL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Calculate the future cost of your child\'s education considering education inflation, with a donut chart showing today\'s cost versus inflation growth.',
  featureList: [
    'Future education cost projection',
    'Education inflation adjustment (compound formula)',
    'Today\'s cost vs inflation growth split',
    'Multi-currency support',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'Education Corpus Calculator', item: CANONICAL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Child\'s Future Education Corpus',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your child\'s current age', text: 'Input your child\'s current age in years.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter education start age', text: 'Input the age at which higher education is expected to begin, typically 18.' },
    { '@type': 'HowToStep', position: 3, name: 'Enter current education cost', text: 'Enter today\'s total cost for the intended course, including tuition and accommodation.' },
    { '@type': 'HowToStep', position: 4, name: 'Set the education inflation rate', text: 'Adjust the expected annual education inflation rate, typically 8-12% for Indian private institutions.' },
    { '@type': 'HowToStep', position: 5, name: 'Read your results', text: 'The calculator shows the future education cost, years to education, and the split between today\'s cost and inflation growth.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Education Corpus',
  description: 'The total amount needed at the start of a child\'s higher education, calculated by projecting today\'s education cost forward using a compound education inflation rate.',
  inDefinedTermSet: 'https://en.wikipedia.org/wiki/Inflation',
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Education Corpus Calculator: Future Child Education Cost India',
  url: CANONICAL,
  description: 'Calculate the future cost of your child\'s higher education based on today\'s fees and expected education inflation.',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-education-corpus', name: 'What Is Education Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#education-corpus-formula', name: 'How the Future Cost Is Calculated' },
    { '@type': 'WebPageElement', cssSelector: '#education-inflation-rate-india', name: 'Education Inflation Rate in India' },
    { '@type': 'WebPageElement', cssSelector: '#education-cost-by-course', name: 'Education Cost by Course' },
    { '@type': 'WebPageElement', cssSelector: '#section-80e-education-loan', name: 'Section 80E Education Loan Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#sukanya-samriddhi-education', name: 'Sukanya Samriddhi Yojana for Education' },
    { '@type': 'WebPageElement', cssSelector: '#foreign-education-planning', name: 'Foreign Education Planning' },
    { '@type': 'WebPageElement', cssSelector: '#pm-vidyalaxmi-scheme', name: 'PM-Vidyalaxmi Collateral-Free Education Loans' },
    { '@type': 'WebPageElement', cssSelector: '#education-loan-collateral-rules', name: 'Education Loan Collateral Rules' },
    { '@type': 'WebPageElement', cssSelector: '#section-80c-tuition-fees', name: 'Section 80C Tuition Fees Deduction' },
    { '@type': 'WebPageElement', cssSelector: '#national-scholarship-portal', name: 'National Scholarship Portal' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function EducationCorpusPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <EducationCorpusCalculatorClient faqs={faqs} />
    </>
  );
}

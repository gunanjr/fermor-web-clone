import type { Metadata } from 'next';
import ChildEducationPlannerClient from './ChildEducationPlannerClient';

const PAGE_DATE_MODIFIED = '2026-09-16';
const PAGE_DATE_PUBLISHED = '2026-07-08';
const CANONICAL = 'https://fermor.in/calculators/child-education-planner-calculator';

export const metadata: Metadata = {
  title: 'Child Education Planner Calculator: Monthly SIP & Corpus Goal',
  description: 'Free child education planner calculator for India. Calculate the monthly SIP needed to reach your child\'s education corpus goal, with shortfall and surplus tracking. Free, instant results.',
  keywords: [
    'child education plan calculator',
    'education savings calculator india',
    'monthly sip for child education',
    'child education fund planner',
    'child education planner calculator',
    'education corpus sip calculator',
    'child future planning calculator',
    'child education investment calculator',
    'sip for education goal calculator',
    'education planning calculator india',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Child Education Planner Calculator: Monthly SIP & Corpus Goal - Fermor',
    description: 'Plan your child\'s education fund with monthly SIP investments. Calculate the monthly investment needed to reach your education corpus goal.',
    url: CANONICAL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Child Education Planner Calculator: Monthly SIP & Corpus Goal - Fermor',
    description: 'Plan your child\'s education fund with monthly SIP investments. Calculate the monthly investment needed to reach your education corpus goal.',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: 'https://fermor.in/fermor-schema-logo.png',
  sameAs: ['https://fermor.in'],
  knowsAbout: ['Child Education Planning', 'SIP Investment', 'Education Inflation', 'Sukanya Samriddhi Yojana', 'Section 80E', 'Financial Calculators'],
};

const faqs = [
  { q: 'How much should I invest monthly for my child\'s education?', a: 'The amount depends on the current cost of the education goal, the years until your child starts, and your expected investment return. As a rule of thumb, an engineering degree costing Rs 5-8 lakh today with 13 years to go needs roughly Rs 5,000-8,000 per month at 12% returns. An MBA costing Rs 20 lakh today needs Rs 15,000-25,000 per month.' },
  { q: 'What is the best investment option for child education?', a: 'For long-term goals of 10+ years, a diversified equity mutual fund portfolio via SIP has the best return potential. For medium-term goals of 5-10 years, consider balanced advantage or aggressive hybrid funds. For short-term goals under 5 years, stick with debt funds or fixed deposits. Traditional child education insurance plans typically underperform due to high charges.' },
  { q: 'How does inflation affect education planning?', a: 'Education inflation in India has historically run 10-12% per year, well above general inflation. A course costing Rs 5 lakh today at 5-year-old age with college starting at 18 could cost Rs 17-20 lakh by then at 10% inflation. Underestimating this compounding effect is the most common planning mistake.' },
  { q: 'Should I use insurance plans for education savings?', a: 'Generally no. Child education insurance plans combine insurance with investment but typically invest in debt instruments with high commissions, netting just 5-7%. A separate term insurance plan for protection, plus an equity mutual fund SIP for growth, usually delivers both better cover and a larger corpus.' },
  { q: 'Can I include scholarships in my education plan?', a: 'Yes, but be conservative. If your child is likely to qualify for merit-based scholarships, you can reduce the target corpus by the expected amount, but it is safer to plan for the full cost and treat any scholarship as a bonus that lowers your actual outlay.' },
  { q: 'How is this calculator different from the plain Education Corpus Calculator?', a: 'The Education Corpus Calculator only computes the future cost target. This planner goes further: it also projects your actual SIP and existing savings forward using monthly compounding, and tells you whether you are on track or facing a shortfall, along with the additional monthly SIP needed to close any gap.' },
  { q: 'What return rate should I assume for an education SIP?', a: 'For a horizon of 10+ years in equity-oriented mutual funds, 10-12% is a reasonable planning assumption based on long-term historical averages, though returns are never guaranteed. For a horizon under 5 years, use 6-8%, closer to debt fund and fixed deposit returns, since equity volatility close to the goal date is riskier.' },
  { q: 'What happens if I am short on my education goal close to the start date?', a: 'A shortfall close to the education start date can be covered by an education loan, since Section 80E allows the full interest to be deducted with no upper limit for up to 8 years. Many families also allow a slightly lower-tier institution or a partial gap year to bridge the difference.' },
  { q: 'Can I use PPF or Sukanya Samriddhi Yojana for education planning?', a: 'Yes. PPF and Sukanya Samriddhi Yojana (for girl children) are strong options for education planning due to their tax-free, government-backed returns. SSY currently pays 8.2% and allows a partial withdrawal at 18 or after class 10 specifically for education. Their lower returns compared to equity may require higher monthly contributions.' },
  { q: 'Does this calculator account for multiple children?', a: 'No, this calculator plans for one child and one education goal at a time. For multiple children, run the calculator separately for each child\'s age and target cost, then add the required monthly SIPs together to see your total combined commitment.' },
  { q: 'How accurate is the monthly compounding used in this calculator?', a: 'The calculator compounds returns monthly on the running balance, adding each month\'s SIP before applying that month\'s return, the same method used by actual mutual fund NAV accrual. This is more accurate than a flat annual approximation, which can meaningfully understate the true corpus over a long horizon.' },
  { q: 'Should I increase my SIP amount every year?', a: 'Yes, if your income grows. A step-up SIP that increases 5-10% annually, in line with salary growth, closes the gap between education inflation (10-12%) and a flat monthly SIP much faster than keeping the same amount for the entire horizon. Use the Wealth Growth Calculator to model a step-up scenario separately.' },
  { q: 'Is the money in the projected corpus taxable?', a: 'Returns from equity mutual funds held over a year are taxed as long-term capital gains at 12.5% above a Rs 1.25 lakh annual exemption (per Budget 2024 rules). Debt fund gains are taxed at your income slab rate regardless of holding period. SSY and PPF interest and maturity proceeds remain fully tax-free.' },
  { q: 'What if my child chooses not to pursue higher education?', a: 'A corpus built through mutual fund SIPs remains liquid and can be redirected to any other financial goal, retirement, a home down payment, or your child\'s other needs, without penalty. This is a key advantage over education-specific insurance products, which often carry surrender charges or lock-ins tied to a fixed purpose.' },
  { q: 'How often should I review this plan?', a: 'Review at least once a year, and immediately after any major change: a job change affecting your SIP capacity, a shift in your child\'s intended field of study, or a significant market correction affecting the projected corpus. Rebalance from equity to debt as the education start date approaches, typically starting 3-5 years out.' },
  { q: 'Can grandparents or other relatives contribute to this fund?', a: 'Yes. Gifts from grandparents to grandchildren are not taxable in the grandchild\'s hands, since grandparents qualify as relatives under the Income Tax Act. Any investment income earned on money gifted directly to a minor child is still clubbed with a parent\'s income under Section 64(1A) for tax purposes.' },
  { q: 'What is PM-Vidyalaxmi and how does it help bridge a shortfall?', a: 'PM-Vidyalaxmi offers collateral-free, guarantor-free education loans up to Rs 7.5 lakh, backed by a 75% government credit guarantee, for students admitted to designated Quality Higher Education Institutions. It is a useful bridge if your accumulated corpus falls short of the actual cost at admission time.' },
  { q: 'Does the calculator include tuition tax benefits under Section 80C?', a: 'No, this calculator focuses purely on the savings and corpus projection. Separately, actual tuition fees paid for up to two children are deductible under Section 80C within the overall Rs 1.5 lakh limit, on top of any 80E loan interest deduction, but only under the old tax regime.' },
  { q: 'What is the difference between contributions and returns in the donut chart?', a: 'Contributions are the total money you actually put in, your existing corpus plus every monthly SIP payment. Returns are the additional growth generated purely by compounding on top of those contributions. Over a long horizon, returns typically become the larger share of the final corpus.' },
  { q: 'Does a step-up SIP really make a big difference for education planning?', a: 'Yes. A flat Rs 10,000/month SIP at 12% for 20 years grows to roughly Rs 1 crore, but the same SIP with a 10% annual step-up grows to roughly Rs 2.4 crore, nearly 2.4 times more. Since education costs themselves rise 10-12% a year, a step-up SIP tracks that inflation far better than a flat monthly amount.' },
  { q: 'How is the final education corpus taxed when I withdraw it?', a: 'Equity mutual fund gains held over 12 months are taxed at 12.5% above a Rs 1.25 lakh annual exemption (Budget 2024 rules). Gains held under 12 months are taxed at 20%. Spreading the withdrawal over 2-3 years around the admission date, rather than redeeming everything at once, can reduce the tax compared to a single lump-sum withdrawal.' },
  { q: 'If a grandparent gifts money for my child\'s education, who pays tax on it?', a: 'The gift itself is not taxed since grandparents are relatives under the Income Tax Act. Any investment income earned on that money, interest, dividends, or capital gains, is clubbed with the income of whichever parent has the higher total income under Section 64(1A), with a small Rs 1,500 per child annual exemption against that clubbed income.' },
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
  name: 'Child Education Planner Calculator by Fermor',
  url: CANONICAL,
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  description: 'Plan monthly SIP investments to reach your child\'s education corpus goal, with monthly-compounding projection, shortfall/surplus tracking, and a year-by-year growth chart.',
  featureList: [
    'Future education cost projection',
    'Monthly-compounding SIP projection',
    'Shortfall and surplus tracking',
    'Additional required SIP calculation',
    'Year-by-year growth bar chart',
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
    { '@type': 'ListItem', position: 3, name: 'Child Education Planner Calculator', item: CANONICAL },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Plan a Monthly SIP for Your Child\'s Education',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter child details', text: 'Input your child\'s current age, education start age, current education cost, and expected education inflation.' },
    { '@type': 'HowToStep', position: 2, name: 'Enter savings and returns', text: 'Click "Savings & returns" to enter any existing corpus, expected investment return, and your planned monthly SIP.' },
    { '@type': 'HowToStep', position: 3, name: 'Check shortfall or surplus', text: 'The calculator shows whether your plan is on track or facing a shortfall, and the additional monthly SIP needed if short.' },
    { '@type': 'HowToStep', position: 4, name: 'Review the year-by-year growth', text: 'Expand the growth table to see the full year-by-year projection and how much of the final corpus comes from contributions versus returns.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Child Education Plan',
  description: 'A systematic investment plan, typically a monthly SIP, designed to accumulate a target corpus by the time a child begins higher education, accounting for education inflation and expected investment returns.',
  inDefinedTermSet: 'https://en.wikipedia.org/wiki/Systematic_investment_plan',
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Child Education Planner Calculator: Monthly SIP & Corpus Goal',
  url: CANONICAL,
  description: 'Plan your monthly SIP investments to reach your child\'s education corpus goal. See how much you need to save and whether you are on track.',
  datePublished: PAGE_DATE_PUBLISHED,
  dateModified: PAGE_DATE_MODIFIED,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.article-lead'] },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-child-education-plan', name: 'What Is a Child Education Plan' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-plan-education-costs', name: 'How to Plan for Education Costs' },
    { '@type': 'WebPageElement', cssSelector: '#sip-formula-education', name: 'The SIP Growth Formula' },
    { '@type': 'WebPageElement', cssSelector: '#insurance-vs-mutual-fund-education', name: 'Insurance vs Mutual Fund for Education' },
    { '@type': 'WebPageElement', cssSelector: '#ssy-for-girl-child', name: 'Sukanya Samriddhi Yojana for a Girl Child' },
    { '@type': 'WebPageElement', cssSelector: '#section-80e-loan-bridge', name: 'Bridging a Shortfall With an Education Loan' },
    { '@type': 'WebPageElement', cssSelector: '#scholarships-education-plan', name: 'Scholarships and Education Planning' },
    { '@type': 'WebPageElement', cssSelector: '#step-up-sip-education', name: 'Step-Up SIP for Education Planning' },
    { '@type': 'WebPageElement', cssSelector: '#ltcg-tax-education-corpus', name: 'LTCG Tax on the Education Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#minor-child-income-clubbing', name: 'Minor Child Income Clubbing' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function ChildEducationPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <ChildEducationPlannerClient faqs={faqs} />
    </>
  );
}

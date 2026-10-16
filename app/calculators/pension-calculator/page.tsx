import type { Metadata } from 'next';
import PensionCalculatorClient from './PensionCalculatorClient';

export const metadata: Metadata = {
  title: 'Pension Calculator: Retirement Corpus & Monthly Pension India',
  description: 'Free pension calculator for India. Project your retirement corpus and monthly pension from your savings, existing corpus, and expected returns. Includes annuity split, shortfall check, and year-by-year growth table.',
  keywords: [
    'pension calculator',
    'pension calculator india',
    'retirement pension calculator',
    'monthly pension calculator',
    'nps pension calculator',
    'retirement corpus calculator',
    'annuity calculator india',
    'retirement income calculator',
    'pension plan calculator',
    'epf pension calculator',
    'nps annuity calculator',
    'retirement benefits calculator india',
    'how much pension will i get',
    'pension corpus calculator',
    'retirement savings calculator india',
  ],
  alternates: {
    canonical: 'https://fermor.in/calculators/pension-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pension Calculator: Retirement Corpus & Monthly Pension',
    description: 'Project your retirement corpus and monthly pension based on your savings, existing corpus, and expected returns. Free for India.',
    images: ['https://fermor.in/og-pension-calculator.png'],
  },
  openGraph: {
    title: 'Pension Calculator: Retirement Corpus & Monthly Pension - Fermor',
    description: 'Project your retirement corpus and monthly pension with a year-by-year growth table. Compare against your desired pension goal.',
    type: 'website',
    url: 'https://fermor.in/calculators/pension-calculator',
    siteName: 'Fermor',
    images: [{ url: 'https://fermor.in/og-pension-calculator.png', width: 1200, height: 630, alt: 'Fermor Pension Calculator' }],
  },
};

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-09-04';

const faqs = [
  { q: 'What is a pension calculator?', a: 'A pension calculator estimates how much retirement corpus you will accumulate based on your current age, retirement age, monthly savings, existing corpus, and expected return rate. It then shows the monthly pension you can expect once a portion of that corpus is converted into an annuity.' },
  { q: 'What is the difference between a pension calculator and a retirement calculator?', a: 'A pension calculator focuses on building a corpus through regular contributions and shows the resulting monthly pension from an annuity. A retirement calculator typically works backwards from your desired lifestyle to tell you how large a corpus you need, without necessarily modeling the annuity split.' },
  { q: 'How is the monthly pension calculated?', a: 'At retirement, a portion of your corpus is used to purchase an annuity, which pays a guaranteed monthly income. The monthly pension is calculated as corpus multiplied by the annuity ratio and the annuity rate, divided by 12. The remaining corpus is available as a lump sum.' },
  { q: 'What annuity rate should I assume?', a: 'Annuity rates from Indian providers such as LIC currently range from roughly 5.7% to 8.1% per annum depending on the annuity type and your age at purchase, per rates published by annuity service providers. This calculator defaults to 6%, a conservative estimate within that range.' },
  { q: 'How does the annual increment affect my corpus?', a: 'An annual increment means you increase your monthly contribution by a fixed percentage each year, mirroring salary growth. At a 10% increment, a starting SIP of Rs 10,000 becomes Rs 11,000 in year 2 and Rs 12,100 in year 3, which meaningfully boosts the final corpus over a long career.' },
  { q: 'What is a good monthly pension target?', a: 'A common benchmark is 60 to 80% of your pre-retirement monthly income. If you earn Rs 1,00,000 per month today, targeting a pension of Rs 60,000 to Rs 80,000 per month in today\'s value is a reasonable starting point before adjusting for inflation.' },
  { q: 'Should I include my EPF and NPS in this calculation?', a: 'Yes. Add your combined monthly retirement contributions (EPF employee share, NPS, voluntary PPF, and any dedicated retirement SIP) as your monthly investment, and add your current EPF, PPF, and NPS balances to Existing Retirement Corpus for a complete picture.' },
  { q: 'How do the 2026 NPS withdrawal rules affect my annuity ratio?', a: 'PFRDA now allows non-government NPS subscribers to withdraw up to 80% of their corpus as a lump sum, down from a mandatory 40% annuity, with only 20% minimum required to be annuitized. Income tax law under Section 10(12A) still only exempts 60% of the withdrawal, so the extra lump sum beyond that is taxed at your slab rate.' },
  { q: 'Is my pension income taxable?', a: 'The lump sum withdrawn from NPS is tax-exempt up to 60% of the corpus under Section 10(12A). The monthly pension you receive from the annuity itself is fully taxable at your income tax slab rate in the year you receive it, regardless of which scheme the annuity was purchased through.' },
  { q: 'What is EPS and does it add to my pension?', a: 'The Employees\' Pension Scheme (EPS) is a separate EPFO scheme funded by 8.33% of the employer\'s EPF contribution, capped at a wage ceiling, and pays a defined monthly pension after 10 years of service from age 58. It is distinct from EPF savings and should be counted as a separate, additional income source, not part of this calculator\'s SIP-based corpus.' },
  { q: 'What happens to my pension if I stop contributing early?', a: 'Your corpus stops growing from new contributions but continues to earn returns on the existing balance until retirement age. Enter your planned stop date as your retirement age with a shorter contribution period, or reduce Monthly Investment to zero from that point to see the lower resulting corpus and pension.' },
  { q: 'How does inflation affect my monthly pension target?', a: 'The desired pension figure you enter should already reflect what that amount would need to be at retirement, not today\'s value. At 6% inflation, a Rs 50,000 monthly need today equals roughly Rs 1.34 lakh in 17 years, so adjust your target upward before comparing it against the projected pension.' },
  { q: 'What is the difference between an annuity and an SWP for retirement income?', a: 'An annuity is a fixed, guaranteed monthly payout for life, typically from an insurer, but it stops growing and the payout rate is locked in. A Systematic Withdrawal Plan (SWP) draws down a mutual fund corpus on your own schedule, which keeps the balance invested and can grow, but carries market risk that an annuity does not.' },
  { q: 'What is a reasonable expected return before retirement?', a: 'A diversified, equity-heavy portfolio has historically returned 10 to 12% CAGR over long periods in India, while a conservative debt-heavy mix returns closer to 7 to 9%. Use a lower rate as you approach retirement to reflect a typical shift toward safer assets.' },
  { q: 'How accurate is this pension projection?', a: 'This is a deterministic projection using a single assumed return rate every year, which real markets do not deliver. Treat the output as a planning estimate, not a guarantee, and revisit your inputs periodically as your income, savings rate, and market conditions change.' },
  { q: 'Can I withdraw my full NPS corpus at retirement?', a: 'Only if your total NPS corpus is Rs 5 lakh or less, in which case PFRDA allows a full lump sum withdrawal with no mandatory annuity. Above that threshold, at least 20% of the corpus must still be used to purchase an annuity under the 2026 PFRDA rules.' },
  { q: 'Should I use a higher or lower annuity ratio in this calculator?', a: 'A higher annuity ratio means more guaranteed monthly income but a smaller lump sum, while a lower ratio (down to the 20% regulatory minimum for larger NPS corpora) maximizes your lump sum for other investments like an SWP. Adjust the Annuity Ratio slider to see the tradeoff directly.' },
  { q: 'What is the Atal Pension Yojana and how is it different from this calculator?', a: 'The Atal Pension Yojana is a Central Government guaranteed pension scheme for the unorganized sector, open to those aged 18 to 40, paying a fixed pension of Rs 1,000 to Rs 5,000 per month for life from age 60, as notified by PFRDA. Unlike the market-linked corpus this calculator projects, APY\'s pension amount is fixed and guaranteed by the government regardless of investment returns.' },
  { q: 'How is the EPS pension different from my EPF balance?', a: 'The Employees\' Pension Scheme (EPS) is a separate EPFO scheme funded by 8.33% of the employer\'s contribution and 1.16% from the Central Government, paying a defined monthly pension using the formula Pensionable Salary times Pensionable Service divided by 70, after 10 years of service. Your EPF balance is a different, separate savings pot; EPS should be added as an additional income source, not included in this calculator\'s corpus.' },
  { q: 'What is the Unified Pension Scheme and does it apply to me?', a: 'The Unified Pension Scheme (UPS), effective 1 April 2025, is an option under NPS exclusively for existing Central Government employees, offering an assured payout of 50% of the last 12 months\' average basic pay after 25 years of service, per PFRDA. It does not apply to private-sector employees or the general public using this calculator, whose retirement income depends on the corpus and annuity modeled here instead.' },
  { q: 'What is Fermor?', a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system.',
  knowsAbout: [
    'Pension Planning',
    'Retirement Corpus Calculation',
    'National Pension System',
    'Employees Pension Scheme',
    'Annuity Products India',
    'Retirement Planning India',
    'Personal Finance India',
    'Account Aggregator Framework',
    'PFRDA Regulations',
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pension Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/pension-calculator',
  description: 'Project your retirement corpus and monthly pension in India based on current savings, existing corpus, expected returns, and annual increments, with an annuity split and a year-by-year growth table.',
  featureList: [
    'Retirement corpus projection with monthly compounding',
    'Monthly pension estimate from an adjustable annuity ratio and rate',
    'Shortfall or surplus check against a desired pension target',
    'Year-by-year growth bar chart and table',
    'Annual contribution increment modeling',
    'Multi-currency support',
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
    { '@type': 'ListItem', position: 3, name: 'Pension Calculator', item: 'https://fermor.in/calculators/pension-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Estimate Your Monthly Pension',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Pension Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter your ages and savings', text: 'Enter your current age, target retirement age, monthly investment, and annual increment in contributions.' },
    { '@type': 'HowToStep', position: 2, name: 'Add existing corpus and return rate', text: 'Under Advanced settings, add your existing retirement corpus (EPF, PPF, NPS balances) and your expected annual return before retirement.' },
    { '@type': 'HowToStep', position: 3, name: 'Set your annuity ratio and target', text: 'Adjust the annuity ratio to reflect how much of your corpus you plan to annuitize, and enter your desired monthly pension in retirement-age value.' },
    { '@type': 'HowToStep', position: 4, name: 'Read your results', text: 'The calculator shows your projected total corpus, monthly pension, and whether that meets your target, plus a year-by-year growth table.' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Pension',
  description: 'A pension is a regular income paid to a person after retirement, typically funded by contributions made during their working years and converted into an annuity or periodic payout at retirement.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Pension',
    'https://www.wikidata.org/wiki/Q16325196',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Pension Calculator: Retirement Corpus & Monthly Pension',
  url: 'https://fermor.in/calculators/pension-calculator',
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
    { '@type': 'DefinedTerm', name: 'Pension' },
    { '@type': 'DefinedTerm', name: 'Annuity' },
    { '@type': 'DefinedTerm', name: 'National Pension System' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, salaried employees, NPS subscribers, retirement planners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-pension-calculator', name: 'What Is a Pension Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#how-it-helps', name: 'How This Pension Calculator Helps You' },
    { '@type': 'WebPageElement', cssSelector: '#annuity-explained', name: 'How the Annuity Split Works' },
    { '@type': 'WebPageElement', cssSelector: '#nps-2026-rules', name: 'The 2026 NPS Withdrawal Rules' },
    { '@type': 'WebPageElement', cssSelector: '#taxation', name: 'How Your Pension Is Taxed' },
    { '@type': 'WebPageElement', cssSelector: '#assumptions', name: 'Key Assumptions Explained' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of This Projection' },
    { '@type': 'WebPageElement', cssSelector: '#eps', name: 'EPS: The Employees Pension Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#atal-pension-yojana', name: 'Atal Pension Yojana' },
    { '@type': 'WebPageElement', cssSelector: '#scss', name: 'Senior Citizen Savings Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#ups', name: 'The Unified Pension Scheme' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default function PensionCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <PensionCalculatorClient faqs={faqs} />
    </>
  );
}

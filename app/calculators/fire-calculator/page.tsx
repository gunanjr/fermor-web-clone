import type { Metadata } from 'next';
import FIRECalculatorClient from './FIRECalculatorClient';

export const metadata: Metadata = {
  title: 'FIRE Calculator India: FIRE Number, Lean, Fat & Coast',
  description: 'Free FIRE calculator for India. Calculate Lean FIRE (20x), Standard FIRE (25x), Fat FIRE (40x), Coast FIRE, and Barista FIRE with Indian inflation and SIP step-up. Free to use.',
  keywords: [
    'fire calculator', 'fire number calculator', 'financial independence retire early calculator',
    'retire early calculator india', 'lean fire calculator', 'fat fire calculator',
    'coast fire calculator', 'barista fire calculator', 'fire retirement calculator',
    'fire corpus calculator india', 'fire calculator india', 'fire movement india',
    'fire number india', 'fire investing', 'fire retire early', 'fire calculator retirement',
    'financial independence retire early india', 'early retirement plan india',
    'retirement corpus calculator', 'how to calculate fire number', 'fire number formula',
    '25x rule retirement india', '4 percent rule india', 'financial independence calculator india',
    'fire financial independence retire early', 'retire early', 'fire movement',
  ],
  openGraph: {
    title: 'FIRE Calculator India: FIRE Number, Lean, Fat & Coast - Fermor',
    description: 'Calculate your Lean FIRE, Standard FIRE (25x), Fat FIRE, and Coast FIRE numbers with Indian inflation. Free FIRE calculator with SIP step-up and milestone timeline.',
    type: 'website',
    images: [{ url: 'https://fermor.in/og-fire-calculator.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Calculator India: FIRE Number, Lean, Fat & Coast - Fermor',
    description: 'Calculate your FIRE number adjusted for Indian inflation with SIP step-up, Coast FIRE, and milestone tracking.',
    images: ['https://fermor.in/og-fire-calculator.png'],
  },
  alternates: {
    canonical: 'https://fermor.in/calculators/fire-calculator',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a FIRE number and how is it calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Your FIRE number is the total corpus you need to retire and live off investment returns indefinitely. The standard formula is Annual Expenses at Retirement multiplied by 25. The 25x multiplier comes from the 4% rule, which states that a diversified portfolio can sustain a 4% annual withdrawal for 30 or more years. This calculator adjusts your current monthly expenses for inflation over the years until your target retirement age before applying the multiplier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the 4% rule valid for FIRE planning in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The 4% rule was derived from US market data and US inflation rates of 2-3%. India runs consistently higher inflation (5-7% CPI average over the last decade per RBI data), which means a 4% withdrawal rate is more aggressive here. Many Indian FIRE planners use a 3-3.5% withdrawal rate, corresponding to a 28x-33x multiplier. Using 25x (4% withdrawal) is the minimum target, not an upper bound.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Lean FIRE, Barista FIRE, and Fat FIRE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lean FIRE (20x multiplier) targets a frugal retirement with minimal expenses. Barista FIRE (12.5x multiplier) is semi-retirement where part-time work covers roughly half your costs and the corpus covers the other half at a 4% withdrawal rate. Fat FIRE (40x multiplier) is for those who want a high-spending retirement with a large safety buffer, using only a 2.5% withdrawal rate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Coast FIRE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coast FIRE is the amount you need invested today such that, without any additional contributions, it grows to your standard FIRE number by your target retirement age. Once you hit Coast FIRE, you could theoretically stop contributing to retirement savings and still retire on time. This milestone is particularly valuable for young earners who want to know when their investments are self-sustaining.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does inflation affect FIRE planning in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Inflation is the most underestimated variable in FIRE planning. At 6% inflation, expenses double roughly every 12 years. If you spend Rs 50,000 per month today and plan to retire in 17 years, your monthly expense at retirement will be around Rs 1.35 lakh. Your FIRE number is calculated on this inflation-adjusted figure, not today's spending. Planning with Indian inflation (6-7%) rather than a 2-3% Western assumption changes your FIRE number dramatically.",
      },
    },
    {
      '@type': 'Question',
      name: 'Should my home be included in my FIRE corpus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Only if you plan to sell it or rent it out for income. An owned home reduces your monthly expense by eliminating rent, which lowers your FIRE number. But the home itself is not part of your investable corpus unless you intend to monetize it. Most Indian FIRE planners exclude the primary residence from corpus calculations and treat rent elimination as a benefit that reduces the required FIRE number.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does EPF or NPS affect my FIRE number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EPF and NPS are accumulation vehicles that contribute to your retirement corpus. Your projected EPF balance and NPS corpus at retirement should be counted as part of your investable assets. Add these projected values to the Existing Investments field in this calculator to get a more accurate picture of whether you are on track for FIRE.',
      },
    },
    {
      '@type': 'Question',
      name: 'What risks does a FIRE number not account for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "A FIRE number is a projection, not a guarantee. Key risks include: sequence-of-returns risk (a major market fall in the first few years of retirement is far more damaging than one later), healthcare cost inflation (which often runs at 10-14% in India), longevity risk (outliving a 25-30 year projection), and large one-time expenses like home repairs. Building a 15-20% buffer above your calculated FIRE number is standard practice.",
      },
    },
    {
      '@type': 'Question',
      name: 'At what age should I start planning for FIRE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Starting at 22 versus 30 gives you 8 extra years of compounding. At 12% annual return, money doubles roughly every 6 years. Starting earlier means dramatically less monthly saving required to reach the same corpus. Even beginning at 35 with aggressive saving and investment discipline can significantly pull forward a traditional retirement age.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I retire on Rs 5 crore in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "At a 4% withdrawal rate, a Rs 5 crore corpus generates Rs 20 lakh per year, or about Rs 1.67 lakh per month in withdrawal capacity. Whether that is enough depends on your current expenses and when you retire. If you are retiring 15-20 years from now, your inflation-adjusted monthly expenses at that point will be significantly higher than today. Use this calculator to find what your inflation-adjusted expenses will be at your target retirement age, then check whether Rs 5 crore covers 25 times that figure.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is the annual SIP step-up and why does it matter for FIRE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A step-up means increasing your SIP by a fixed percentage each year. At 10% step-up, a starting SIP of Rs 15,000 becomes Rs 16,500 in year 2, Rs 18,150 in year 3, and so on. Over a 17-year horizon, a 10% annual step-up can roughly double the final corpus compared to a flat SIP at the same starting amount. This mirrors typical salary growth and is one of the most powerful levers in FIRE planning.',
      },
    },
    {
      '@type': 'Question',
      name: 'What return rate should I use after retirement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Post-retirement portfolios typically shift toward fixed income, reducing equity exposure. A 60/40 equity-debt mix might return 8-9%. Using a lower post-retirement return (8%) than the accumulation rate (12%) is more realistic and builds in a margin for sequence-of-returns risk.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Barista FIRE and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Barista FIRE (the name comes from working a low-stress part-time job like a barista while your corpus is partially invested) is when your corpus covers roughly 50-60% of your expenses at a 4% withdrawal rate, and part-time income covers the rest. The 12.5x multiplier reflects that only half your expenses come from the corpus. It lets you leave a high-pressure career early without needing a full 25x corpus.",
      },
    },
    {
      '@type': 'Question',
      name: 'How much should I save monthly to reach my FIRE number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on your current corpus, years to retirement, and expected return, but the calculator solves for this directly: enter your target retirement age and it shows the SIP needed to close the gap. As a rule of thumb, at a 12% return, money roughly doubles every 6 years (the Rule of 72), so starting 6 years earlier can cut the required monthly SIP nearly in half for the same target corpus.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are withdrawals from my FIRE corpus taxed in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Equity mutual fund gains held over 12 months are taxed as long-term capital gains at 12.5% on amounts above Rs 1.25 lakh per financial year, under the Finance (No. 2) Act, 2024. Debt fund gains are taxed at your income slab rate regardless of holding period. Structuring withdrawals through a Systematic Withdrawal Plan (SWP) spreads redemptions across years, which helps use the Rs 1.25 lakh exemption repeatedly instead of triggering a large one-time gain.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I use an SWP or lump sum withdrawal after reaching FIRE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Systematic Withdrawal Plan (SWP) that pays out monthly is generally better than lump sum withdrawals for a FIRE corpus, since it keeps the remaining balance invested and compounding while you draw a fixed income. Lump sum withdrawals also crystallize capital gains tax in one year rather than spreading it, which typically means a higher effective tax rate than staggered SWP redemptions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do the 2026 NPS withdrawal rules affect FIRE planning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PFRDA now allows non-government NPS subscribers to withdraw up to 80% of the corpus as a lump sum at exit, up from the earlier 60% cap, with a minimum of 20% still mandatorily annuitized. Tax law under Section 10(12A) has not been updated to match: only 60% of the withdrawal remains tax-free, so the additional 20% lump sum is taxed at your income slab rate. Factor this into your post-FIRE cash flow if NPS is part of your corpus.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does health insurance factor into a FIRE plan in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Once you leave a salaried job, employer-provided group health cover typically ends, so a standalone family floater policy becomes essential before you retire early. Healthcare cost inflation in India runs at 10-14% annually, well above general CPI, which means a policy sized for today's medical costs will fall short 15-20 years into retirement. Most FIRE planners budget a separate health insurance premium line item and a medical emergency buffer outside the core FIRE corpus.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is Fermor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.",
      },
    },
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FIRE Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/fire-calculator',
  description: 'Calculate your FIRE number for financial independence and early retirement in India. Outputs Lean FIRE (20x), Standard FIRE (25x), Barista FIRE, Fat FIRE (40x), and Coast FIRE with Indian inflation adjustment, SIP step-up, and major life expense planning.',
  featureList: [
    'Standard FIRE Number (25x multiplier)',
    'Lean FIRE (20x), Fat FIRE (40x), Barista FIRE (12.5x)',
    'Coast FIRE calculation',
    'Annual SIP step-up simulation',
    'Wealth trajectory chart with accumulation and withdrawal phases',
    'FIRE milestone timeline',
    'Age-based asset allocation suggestion',
    'Major life expense planning with inflation adjustment',
    'Post-retirement corpus drawdown simulation',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  publisher: { '@type': 'Organization', name: 'Fermor', url: 'https://fermor.in' },
  datePublished: '2026-06-16',
  dateModified: '2026-09-15',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://fermor.in' },
    { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://fermor.in/calculators' },
    { '@type': 'ListItem', position: 3, name: 'FIRE Calculator', item: 'https://fermor.in/calculators/fire-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your FIRE Number',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor FIRE Calculator' }],
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Enter monthly expenses', text: 'Enter your current monthly household expenses including rent, food, utilities, EMIs, insurance, and lifestyle spending. Exclude savings and investments from this figure.' },
    { '@type': 'HowToStep', position: 2, name: 'Set ages and SIP', text: 'Enter your current age, target retirement age, and life expectancy. Enter your current monthly SIP amount and total existing investable assets including mutual funds, EPF, and NPS balances.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust advanced settings', text: 'Click More settings to enter your annual SIP step-up rate, expected pre-retirement return, inflation rate, post-retirement return, and add any major planned life expenses such as a home purchase or education costs.' },
    { '@type': 'HowToStep', position: 4, name: 'Read your FIRE results', text: 'The calculator outputs your FIRE number (25x), Lean FIRE (20x), Fat FIRE (40x), Coast FIRE, and whether your current SIP trajectory puts you on track to retire at your target age. The wealth chart and milestone timeline show your path step by step.' },
  ],
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Fermor',
  url: 'https://fermor.in',
  logo: { '@type': 'ImageObject', url: 'https://fermor.in/fermor-schema-logo.png', width: 512, height: 512 },
  sameAs: ['https://fermor.in', 'https://fermor.in/about'],
  description: 'Fermor is building the automated financial action layer for India: the system that closes the gap between knowing what you should do with your money and actually doing it. The calculators are the distribution layer. The product is the action system.',
  knowsAbout: [
    'Financial Independence Retire Early',
    'FIRE Number Calculation',
    'Retirement Planning India',
    'SIP Investment Planning',
    'Coast FIRE and Lean FIRE',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'FIRE Calculator India: Calculate Your FIRE Number',
  url: 'https://fermor.in/calculators/fire-calculator',
  datePublished: '2026-06-16',
  dateModified: '2026-09-15',
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
    { '@type': 'DefinedTerm', name: 'FIRE', alternateName: 'Financial Independence, Retire Early' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, early retirement planners, NRI investors',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-fire', name: 'What Is FIRE?' },
    { '@type': 'WebPageElement', cssSelector: '#fire-number-formula', name: 'The FIRE Number Formula' },
    { '@type': 'WebPageElement', cssSelector: '#fire-variants', name: 'FIRE Variants' },
    { '@type': 'WebPageElement', cssSelector: '#four-percent-rule-india', name: 'The 4% Rule in India' },
    { '@type': 'WebPageElement', cssSelector: '#fire-by-expense', name: 'FIRE Number by Monthly Expense' },
    { '@type': 'WebPageElement', cssSelector: '#inflation-fire', name: 'How Inflation Changes Your FIRE Number' },
    { '@type': 'WebPageElement', cssSelector: '#fire-corpus', name: 'What Counts in Your FIRE Corpus' },
    { '@type': 'WebPageElement', cssSelector: '#fire-risks', name: 'Risks the FIRE Number Does Not Capture' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#fire-faq', name: 'Frequently Asked Questions' },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'FIRE',
  alternateName: 'Financial Independence, Retire Early',
  description: 'FIRE (Financial Independence, Retire Early) is a financial movement focused on achieving financial independence and retiring well before the traditional retirement age by aggressively saving and investing until a portfolio generates enough returns to cover annual living expenses indefinitely using a 4% withdrawal rate.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment and Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/FIRE_movement',
    'https://www.wikidata.org/wiki/Q55647788',
  ],
};

export default function FIRECalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <FIRECalculatorClient />
    </>
  );
}

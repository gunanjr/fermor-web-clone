import type { Metadata } from 'next';
import RuleOf72Client from './RuleOf72Client';
import { headers } from 'next/headers';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'calculators' : region;
  const canonical = `https://fermor.in/${canonicalPath}/rule-of-72-calculator`;
  return {
    title: 'Rule of 72 Calculator: Estimate How Long Investments Take to Double',
    description:
      'Free Rule of 72 calculator for India. Estimate how many years it takes for your investment to double at any annual return rate. Includes exact math comparison, growth chart, and quick reference table.',
    keywords: [
      'rule of 72 calculator',
      'rule of 72 formula',
      'investment doubling time calculator',
      'how long to double money',
      'compound interest doubling calculator',
      'rule of 72 india',
      'investment growth calculator',
      'doubling time calculator',
      '72 divided by interest rate',
      'mental math finance',
      'rule of 72 vs rule of 114',
      'inflation calculator rule of 72',
      'mutual fund doubling calculator',
      'fd doubling calculator',
      'wealth growth estimate',
      'rule of 72 sip calculator',
      'rule of 72 fd calculator',
      'quick doubling time trick',
      'rule of 72 accuracy calculator',
      'rule of 72 formula excel',
      'rule of 114 calculator',
      'rule of 144 calculator',
      'reverse rule of 72',
      'return rate needed to double money',
      'rule of 70 vs rule of 72',
    ],
    alternates: { canonical },
    twitter: {
      card: 'summary_large_image',
      title: 'Rule of 72 Calculator: Estimate Investment Doubling Time',
      description:
        'Estimate how many years it takes for your investment to double. Quick reference table, exact math comparison, and growth chart. Free for India.',
      images: ['https://fermor.in/og-rule-of-72-calculator.png'],
    },
    openGraph: {
      title: 'Rule of 72 Calculator: Estimate Investment Doubling Time',
      description:
        'Estimate how many years it takes for your investment to double at any annual return rate. Includes exact math comparison, growth chart, and quick reference table. Free for India.',
      type: 'website',
      url: 'https://fermor.in/calculators/rule-of-72-calculator',
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-rule-of-72-calculator.png', width: 1200, height: 630, alt: 'Fermor Rule of 72 Calculator' }],
    },
  };
}

const PAGE_DATE_MODIFIED = '2026-09-15';
const PAGE_DATE_PUBLISHED = '2026-07-16';

const faqs = [
  {
    q: 'What is the Rule of 72?',
    a: 'The Rule of 72 is a quick mental math shortcut used in finance to estimate how many years it will take for an investment to double in value at a fixed annual rate of compound interest. Divide 72 by the annual interest rate and you get the approximate number of years to double.',
  },
  {
    q: 'How accurate is the Rule of 72?',
    a: 'The Rule of 72 is most accurate for interest rates between 6% and 10%. At 8% it estimates 9 years, which matches the exact calculation almost perfectly. At very low rates (1 to 2%) or very high rates (20%+) the approximation drifts by a few months, but it remains a reliable mental estimate.',
  },
  {
    q: 'Why 72 and not 69.3?',
    a: 'The mathematically exact number for continuous compounding is 69.3. But 72 is far easier to work with mentally because it divides evenly by 1, 2, 3, 4, 6, 8, 9, and 12. This convenience outweighs the small loss in precision for everyday financial estimation.',
  },
  {
    q: 'Does the Rule of 72 work for simple interest?',
    a: 'No. The Rule of 72 only applies to compound interest. For simple interest, the doubling time is simply 100 divided by the interest rate. At 8% simple interest, your money doubles in 12.5 years, not 9.',
  },
  {
    q: 'Can I use the Rule of 72 for inflation?',
    a: 'Yes. The Rule of 72 works in reverse for inflation too. At 6% inflation, your purchasing power halves in roughly 12 years (72 / 6 = 12). At 8% inflation, it takes about 9 years for your money to lose half its real value.',
  },
  {
    q: 'What is the Rule of 114?',
    a: 'The Rule of 114 estimates how long it takes for an investment to triple. Divide 114 by the annual interest rate. At 12% return, 114 / 12 = 9.5 years to triple your money. It is the tripling counterpart to the Rule of 72\'s doubling estimate.',
  },
  {
    q: 'What is the Rule of 144?',
    a: 'The Rule of 144 estimates how long it takes for an investment to quadruple. Divide 144 by the annual interest rate. At 12% return, 144 / 12 = 12 years to quadruple. It follows the same logic as the Rule of 72 and the Rule of 114.',
  },
  {
    q: 'How do I use the Rule of 72 to compare investments?',
    a: 'Compare the doubling time of different investments by dividing 72 by each rate. An FD at 7% doubles in about 10.3 years. A mutual fund averaging 12% doubles in about 6 years. The shorter doubling time means faster wealth accumulation, assuming returns stay consistent.',
  },
  {
    q: 'Does the Rule of 72 work for EMIs or SIPs?',
    a: 'No. The Rule of 72 applies to a lump sum invested once and left to compound. For regular monthly contributions like SIPs or EMIs, the compounding dynamics are different. Use a SIP calculator or EMI calculator for those scenarios.',
  },
  {
    q: 'What is the exact formula behind the Rule of 72?',
    a: 'The exact doubling time formula is: Years = ln(2) / ln(1 + r/100), where r is the annual interest rate. The Rule of 72 replaces ln(2) / ln(1 + r/100) with 72 / r as an approximation. The natural log of 2 is approximately 0.693, which is close to 0.72 when scaled to percentage terms.',
  },
  {
    q: 'How does compounding frequency affect the Rule of 72?',
    a: 'The Rule of 72 assumes annual compounding. If interest compounds monthly or quarterly, the effective annual rate is slightly higher, meaning money doubles a little faster than the Rule of 72 predicts. The approximation still works well for most personal finance scenarios.',
  },
  {
    q: 'What is a good return rate to use with the Rule of 72?',
    a: 'For Indian equity mutual funds, 10 to 12% long-term average is a common assumption. For bank FDs, 6 to 7.5%. For PPF, 7.1%. For NPS, 8 to 10%. These rates give you a realistic doubling timeline for each asset class.',
  },
  {
    q: 'How do I find the return rate I need to double my money in a set number of years?',
    a: 'Use the Rule of 72 in reverse: divide 72 by the number of years you have. If you want your money to double in 10 years, you need 72 / 10 = 7.2% annual return. The calculator above has a Rate Needed toggle that does this calculation directly, including for tripling and quadrupling.',
  },
  {
    q: 'What is the Rule of 70?',
    a: 'The Rule of 70 is a close cousin of the Rule of 72 that divides 70 instead of 72 by the growth rate. It is slightly more accurate at lower growth rates (under 6 to 8%) and is more commonly used in economics for population or GDP doubling time, while the Rule of 72 remains the standard for investment and interest rate calculations because 72 divides evenly by more whole numbers.',
  },
  {
    q: 'What return rate should I assume for PPF, EPF, or NPS?',
    a: 'PPF pays 7.1% per annum as notified by the Ministry of Finance for the July-September 2026 quarter, a rate unchanged since April 2020. EPF pays 8.25% as notified by the EPFO. NPS Tier I has historically returned 8 to 10% CAGR depending on the equity-debt mix chosen, though this is market-linked and not guaranteed. PPF and EPF rates are government-set and revised periodically; always check the current quarter rate before planning.',
  },
  {
    q: 'Does the Rule of 72 apply to credit card or loan debt?',
    a: 'Yes. The Rule of 72 works on any compounding rate, including debt you owe. Indian credit card issuers typically charge 36 to 45% APR on unpaid balances, disclosed under the RBI Master Direction on Credit Card and Debit Card Issuance. At 42% APR, an unpaid balance roughly doubles in under 2 years (72 / 42), which is why revolving credit card debt compounds against you just as fast as an investment compounds for you.',
  },
  {
    q: 'What is the difference between nominal and real return in the Rule of 72?',
    a: 'Nominal return is the stated rate before adjusting for inflation. Real return is what your purchasing power actually grows by, roughly nominal return minus inflation. If your investment returns 12% nominally and inflation runs at 6%, your real return is closer to 6%, so your purchasing power doubles in about 12 years (72 / 6), not the 6 years the nominal rate alone would suggest.',
  },
  {
    q: 'Does my Rule of 72 estimate account for taxes?',
    a: 'No, the Rule of 72 uses whatever return rate you enter, and that figure is only as accurate as your assumption about taxes. If you enter a pre-tax FD rate, the true post-tax doubling time is longer once annual slab-rate tax on interest is factored in. Equity mutual fund gains face a lighter 12.5% long-term capital gains tax only above Rs 1.25 lakh per year, while PPF and EPF are fully tax-exempt (EEE), so their quoted rate already reflects the real doubling time.',
  },
  {
    q: 'Who invented the Rule of 72?',
    a: "The earliest known written record of the Rule of 72 is Italian mathematician Luca Pacioli's 1494 book Summa de Arithmetica, Geometria, Proportioni et Proportionalita. Pacioli stated the rule without proving it, which historians take as a sign it was already in informal use before he documented it. Pacioli is also widely credited as the father of modern double-entry accounting.",
  },
  {
    q: 'Does the Rule of 72 estimate include fees and expense ratios?',
    a: 'No. The Rule of 72 only uses the gross return rate you enter. Mutual fund expense ratios, demat and brokerage charges, and exit loads all reduce your actual return below the headline rate, which means the real doubling time is usually somewhat longer than the Rule of 72 estimate unless you enter a rate that is already net of fees.',
  },
  {
    q: 'Does a SIP invested for the Rule of 72 doubling period actually double?',
    a: 'No. At 12% annual return, a lump sum doubles in 6 years, but a monthly SIP of the same amount running for those same 6 years grows to only about 1.47 times the total amount contributed, not 2 times. This is because SIP contributions made near the end of the period have barely any time to compound, unlike a lump sum that compounds for the full duration from day one.',
  },
  {
    q: 'What happens if my investment loses money instead of growing?',
    a: 'The Rule of 72 formula breaks down at a zero or negative return rate: dividing 72 by zero or a negative number gives an undefined or negative result, which has no real meaning. The Rule of 72 only applies to a positive, compounding growth rate. It cannot estimate recovery time after a loss, since recovering from a loss requires a higher percentage gain than the percentage that was lost.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform for India. The calculators are the distribution layer, free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
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
  description: 'Fermor is building the automated financial action layer for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product is the action system built on the Account Aggregator framework.',
  knowsAbout: [
    'Rule of 72',
    'Compound Interest',
    'Investment Doubling Time',
    'Personal Finance India',
    'Account Aggregator Framework',
    'SEBI Regulations',
    'AMFI Guidelines',
    'Indian Investment Products',
    'Financial Planning India',
    'Wealth Building',
    'Inflation Impact',
    'Mutual Fund Returns',
  ],
};

const calcSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Rule of 72 Calculator by Fermor',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/rule-of-72-calculator',
  description: 'Estimate how many years it takes for your investment to double based on the expected annual return rate using the Rule of 72. Includes exact math comparison, growth chart, and quick reference table.',
  featureList: [
    'Rule of 72 Doubling Time Estimate',
    'Reverse Calculation: Required Return Rate for a Target Time Horizon',
    'Rule of 114 (Tripling) and Rule of 144 (Quadrupling) Modes',
    'Exact Mathematical Comparison',
    'Projected Growth Chart',
    'Quick Reference Table (4% to 20%)',
    'Multi-currency support',
    'Inflation Impact Estimate',
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
    { '@type': 'ListItem', position: 3, name: 'Rule of 72 Calculator', item: 'https://fermor.in/calculators/rule-of-72-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use the Rule of 72',
  description: 'Step-by-step guide to estimate how long your investment takes to double using the Rule of 72.',
  totalTime: 'PT1M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor Rule of 72 Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify your expected annual return rate',
      text: 'Determine the annual return rate of your investment. For example, a bank FD might offer 7%, while an equity mutual fund might average 12% over the long term.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Divide 72 by the interest rate',
      text: 'Take the number 72 and divide it by your annual return rate. At 8% return: 72 / 8 = 9. This means your money doubles in approximately 9 years.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Compare with the exact calculation',
      text: 'For more precision, the exact formula uses natural logarithms: Years = ln(2) / ln(1 + r/100). At 8%, the exact answer is 9.006 years, which is almost identical to the Rule of 72 estimate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Apply the result to your financial planning',
      text: 'Use the doubling time to plan milestones. If you need Rs 40 lakh for a goal and currently have Rs 10 lakh, you need your money to double twice. At 12% return, each doubling takes 6 years, so plan for roughly 12 years.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'Rule of 72',
  description: 'A mental math shortcut to estimate how many years it takes for an investment to double in value at a given annual compound interest rate. Formula: Years to Double = 72 / Annual Interest Rate.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Rule_of_72',
    'https://www.wikidata.org/wiki/Q264016',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Rule of 72 Calculator: Estimate Investment Doubling Time',
  description: 'Free Rule of 72 calculator for India. Estimate how many years it takes for your investment to double at any annual return rate. Includes exact math comparison, growth chart, and quick reference table.',
  url: 'https://fermor.in/calculators/rule-of-72-calculator',
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
    { '@type': 'DefinedTerm', name: 'Rule of 72' },
    { '@type': 'DefinedTerm', name: 'Compound Interest' },
    { '@type': 'DefinedTerm', name: 'Investment Doubling Time' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian retail investors, mutual fund investors, FD investors, financial planning beginners',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-rule-of-72', name: 'What Is the Rule of 72' },
    { '@type': 'WebPageElement', cssSelector: '#how-formula-works', name: 'How the Formula Works' },
    { '@type': 'WebPageElement', cssSelector: '#reverse-rule-of-72', name: 'Finding the Return Rate You Need' },
    { '@type': 'WebPageElement', cssSelector: '#when-useful', name: 'When the Rule of 72 Is Useful' },
    { '@type': 'WebPageElement', cssSelector: '#rule-of-114-144', name: 'Rule of 72 vs Rule of 114 vs Rule of 144' },
    { '@type': 'WebPageElement', cssSelector: '#accuracy', name: 'How Accurate Is the Rule of 72' },
    { '@type': 'WebPageElement', cssSelector: '#indian-investments', name: 'Doubling Time for Common Indian Investments' },
    { '@type': 'WebPageElement', cssSelector: '#sip-vs-lumpsum', name: 'Does the Rule of 72 Work for SIPs' },
    { '@type': 'WebPageElement', cssSelector: '#taxation', name: 'Pre-Tax vs Post-Tax Doubling Time' },
    { '@type': 'WebPageElement', cssSelector: '#limitations', name: 'Limitations of the Rule of 72' },
    { '@type': 'WebPageElement', cssSelector: '#history', name: 'The History of the Rule of 72' },
    { '@type': 'WebPageElement', cssSelector: '#investing-lifetime', name: 'How Many Times Will Your Money Double in Your Lifetime' },
    { '@type': 'WebPageElement', cssSelector: '#vs-cagr', name: 'Rule of 72 vs CAGR' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use', name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq', name: 'Frequently Asked Questions' },
  ],
};

export default async function RuleOf72Page() {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calcSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      <RuleOf72Client region={region} faqs={faqs} />
    </>
  );
}

import type { Metadata } from 'next';
import NPVClient from './NPVClient';
import { headers } from 'next/headers';

const canonical = 'https://fermor.in/calculators/npv-calculator';
const PAGE_DATE_MODIFIED = '2026-09-18';
const PAGE_DATE_PUBLISHED = '2026-09-17';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const region = headersList.get('x-region') || 'in';
  const canonicalPath = region === 'in' ? 'calculators' : region;
  const canonicalUrl = `https://fermor.in/${canonicalPath}/npv-calculator`;
  return {
    title: 'NPV Calculator Online: Estimate Net Present Value',
    description: 'Free NPV calculator for India. Estimate net present value, discount future cash flows, compare investments and review project value online.',
    keywords: [
      'npv calculator',
      'net present value calculator',
      'npv calculator online',
      'npv calculator india',
      'npv formula',
      'net present value formula',
      'discounted cash flow calculator',
      'investment appraisal calculator',
      'capital budgeting calculator',
      'project valuation calculator',
      'npv and irr calculator',
      'npv calculator with cash flows',
      'npv calculator with discount rate',
      'npv calculator with initial investment',
      'npv calculator for investment',
      'npv calculator for projects',
      'npv formula calculator',
      'npv financial calculator',
      'npv project calculator',
      'npv investment calculator',
      'present value calculator',
      'future value calculator',
      'dcf calculator',
      'project evaluation calculator',
      'discount rate calculator',
      'npv vs irr calculator',
      'npv calculator excel',
      'calculate npv online',
      'net present value calculation',
      'npv calculator free',
      'npv calculation calculator',
      'net present value calculator online',
    ],
    alternates: { canonical: canonicalUrl },
    twitter: {
      card: 'summary_large_image',
      title: 'NPV Calculator Online: Estimate Net Present Value',
      description: 'Calculate NPV, compare project cash flows, and estimate value creation for investments in India.',
      images: ['https://fermor.in/og-npv-calculator.png'],
    },
    openGraph: {
      title: 'NPV Calculator Online: Estimate Net Present Value',
      description: 'Evaluate investments with a free NPV calculator for India. Test discount rates, cash flows, and project value in minutes.',
      type: 'website',
      url: canonicalUrl,
      siteName: 'Fermor',
      images: [{ url: 'https://fermor.in/og-npv-calculator.png', width: 1200, height: 630, alt: 'Fermor NPV Calculator' }],
    },
  };
}

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
  description: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it.',
  knowsAbout: [
    'Net Present Value',
    'Discounted Cash Flow',
    'Capital Budgeting',
    'Investment Analysis',
    'Internal Rate of Return',
    'Time Value of Money',
    'Corporate Finance India',
    'Financial Planning India',
    'SEBI Regulations',
    'Project Evaluation',
  ],
};

const faqs = [
  {
    q: 'What is net present value?',
    a: 'Net present value is the difference between the present value of future cash inflows and the initial investment required today. A positive NPV means a project is expected to create value after accounting for the time value of money.',
  },
  {
    q: 'How do you calculate NPV?',
    a: 'You discount each future cash flow using the chosen discount rate and add the discounted values together. Then you subtract the initial investment. The formula is NPV = sum of cash flow divided by (1 + r)^t minus the initial investment.',
  },
  {
    q: 'What is a good NPV?',
    a: 'A good NPV is any value above zero. If the NPV is positive, the project is expected to earn more than the required return. A negative NPV usually means the project is unlikely to create value at the current discount rate.',
  },
  {
    q: 'What is the NPV formula?',
    a: 'The standard formula is NPV = C0 + C1/(1+r)^1 + C2/(1+r)^2 + ... + Cn/(1+r)^n. Here, C0 is the initial investment, r is the discount rate, and n is the year of each cash flow.',
  },
  {
    q: 'What does a negative NPV mean?',
    a: 'A negative NPV means the present value of future cash inflows is lower than the investment cost. In practical terms, the project may not earn enough to cover the required rate of return.',
  },
  {
    q: 'How is NPV different from IRR?',
    a: 'NPV tells you the rupee value created by a project. IRR tells you the percentage return at which the project breaks even. Investors often use both, but NPV is usually the stronger choice for comparing projects of different sizes.',
  },
  {
    q: 'What is the discount rate in NPV?',
    a: 'The discount rate reflects the required return or cost of capital. In Indian project analysis, it often matches the expected return from a similar investment or the company cost of capital.',
  },
  {
    q: 'What is the NPV of a project with equal cash flows?',
    a: 'For the same annual cash flow each year, you can use the annuity formula to estimate the present value of those steady inflows. Then subtract the upfront investment to get the NPV.',
  },
  {
    q: 'Can I use NPV for SIP or mutual fund planning?',
    a: 'Yes. NPV is used in business and project evaluation, while SIP planning often uses expected return assumptions and future value calculations. The same time value of money logic applies to both.',
  },
  {
    q: 'What is terminal value in NPV?',
    a: 'Terminal value is the estimated value of a project after the explicit forecast period. In a discounted cash flow model, it often represents a large share of a project or company value.',
  },
  {
    q: 'How do inflation and taxes affect NPV?',
    a: 'Inflation reduces the real value of future cash flows. Taxes also affect the actual cash available to the investor. A realistic NPV model should use after-tax cash flows and a matching nominal or real discount rate.',
  },
  {
    q: 'What is the difference between an NPV calculator and a DCF calculator?',
    a: 'A discounted cash flow (DCF) calculator is the broader tool: it discounts a series of future cash flows to their present value. NPV is one specific output of a DCF analysis, calculated as that present value minus the initial investment. Every NPV calculation is a DCF calculation, but a DCF model can also be used to value a business or a bond without computing NPV at all.',
  },
  {
    q: 'Can I calculate NPV in Excel?',
    a: 'Yes. Excel has a built-in NPV function, but it only discounts the cash flows you list starting one period ahead. Subtract the initial investment (Year 0) separately: =NPV(rate, cash_flow_range) - initial_investment. Entering the initial investment inside the NPV range double-discounts it and understates the result.',
  },
  {
    q: 'Is a higher or lower NPV better?',
    a: 'A higher NPV is better, since it means the project is expected to create more value in today\'s rupees. Between two mutually exclusive projects, the one with the higher NPV is generally the better choice, even if the other has a shorter payback period or a higher percentage return.',
  },
  {
    q: 'At what discount rate does NPV equal zero?',
    a: 'NPV equals zero at the project\'s internal rate of return (IRR). By definition, IRR is the discount rate at which the present value of a project\'s cash inflows exactly equals its initial investment, so NPV neither creates nor destroys value at that specific rate.',
  },
  {
    q: 'How do I find the discount rate to use for a project?',
    a: 'Estimate your weighted average cost of capital (WACC) if you are a company funding the project with a mix of debt and equity, or use your own required rate of return for a personal investment. Many Indian corporate projects default to 10% to 15% absent a precise WACC calculation.',
  },
  {
    q: 'What is the formula for the present value of an annuity?',
    a: 'For a series of equal cash flows, the present value formula is PV = C x [1 - (1 + r)^-n] / r, where C is the fixed cash flow per period, r is the discount rate, and n is the number of periods. This avoids discounting each identical cash flow separately.',
  },
  {
    q: 'What is the Profitability Index shown in the results?',
    a: 'The Profitability Index (PI) is the present value of a project\'s cash flows divided by its initial investment. A PI above 1 means the project is value-creating per rupee invested, which matches a positive NPV, but PI also lets you compare projects of very different sizes on a per-rupee basis, something NPV alone cannot do.',
  },
  {
    q: 'What discount rate should I use for an NPV calculation?',
    a: 'Use your cost of capital, typically the weighted average cost of capital (WACC) for a company, or your personal required rate of return for an individual investment. Indian corporate projects commonly use a discount rate of 10% to 15%, reflecting a spread over the RBI repo rate and equity risk.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is building the automated financial action layer for India. The calculators are free tools that help people make decisions with real numbers before they connect their financial accounts.',
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
  name: 'Fermor NPV Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: 'https://fermor.in/calculators/npv-calculator',
  description: 'Evaluate investments, projects, and cash flows using discount rates and future cash flow projections. Includes year-by-year DCF table, NPV vs IRR comparison, and multi-currency support. Free, browser-based.',
  featureList: [
    'Net Present Value (NPV) calculation',
    'Manual and auto-growth cash flow modes',
    'Terminal value and inflation adjustment',
    'Year-by-year discounted cash flow table',
    'Cash flow vs present value bar chart',
    'Multi-currency support (INR, USD, EUR, GBP)',
    'NPV interpretation and investment verdict',
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
    { '@type': 'ListItem', position: 3, name: 'NPV Calculator', item: 'https://fermor.in/calculators/npv-calculator' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate NPV',
  description: 'Step-by-step guide to calculate Net Present Value using the NPV formula or this calculator.',
  totalTime: 'PT2M',
  tool: [{ '@type': 'HowToTool', name: 'Fermor NPV Calculator' }],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter the initial investment',
      text: 'Input the upfront cost of the project or investment. This is the cash outflow at Year 0.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set the discount rate',
      text: 'Enter the discount rate, which represents your required rate of return or cost of capital. A typical range for Indian corporate projects is 10 to 15 percent.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Define project cash flows',
      text: 'Enter annual cash inflows for each year of the project duration. Use manual entry for irregular cash flows, or auto-growth mode for a fixed growth rate.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Review the NPV result',
      text: 'The calculator discounts each cash flow to present value and subtracts the initial investment. A positive NPV means the project creates value; a negative NPV means it destroys value.',
    },
  ],
};

const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  name: 'NPV',
  alternateName: 'Net Present Value',
  description: 'The difference between the present value of cash inflows and the present value of cash outflows over a period of time, used to evaluate the profitability of an investment.',
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'Indian Investment & Finance Terms',
    url: 'https://fermor.in/calculators',
  },
  sameAs: [
    'https://en.wikipedia.org/wiki/Net_present_value',
    'https://www.wikidata.org/wiki/Q191493',
  ],
};

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'NPV Calculator: Net Present Value Calculator Online',
  description: 'Free NPV calculator for India. Evaluate investments, projects, and cash flows using discount rates and future cash flow projections. Year-by-year DCF table, NPV vs IRR, multi-currency support.',
  url: 'https://fermor.in/calculators/npv-calculator',
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
    { '@type': 'DefinedTerm', name: 'NPV', alternateName: 'Net Present Value' },
    { '@type': 'DefinedTerm', name: 'IRR', alternateName: 'Internal Rate of Return' },
    { '@type': 'DefinedTerm', name: 'Discounted Cash Flow' },
    { '@type': 'DefinedTerm', name: 'Time Value of Money' },
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'Indian investors, corporate finance professionals, MBA students, startup founders',
    geographicArea: { '@type': 'Country', name: 'India' },
  },
  hasPart: [
    { '@type': 'WebPageElement', cssSelector: '#what-is-npv',          name: 'What Is Net Present Value' },
    { '@type': 'WebPageElement', cssSelector: '#how-npv-works',        name: 'How NPV Works' },
    { '@type': 'WebPageElement', cssSelector: '#npv-formula',          name: 'NPV Formula' },
    { '@type': 'WebPageElement', cssSelector: '#npv-annuity',          name: 'NPV for Equal Annual Cash Flows' },
    { '@type': 'WebPageElement', cssSelector: '#npv-excel',            name: 'NPV Formula in Excel' },
    { '@type': 'WebPageElement', cssSelector: '#discount-rate',        name: 'How to Choose a Discount Rate for NPV' },
    { '@type': 'WebPageElement', cssSelector: '#npv-vs-irr',           name: 'NPV vs IRR' },
    { '@type': 'WebPageElement', cssSelector: '#npv-vs-payback',       name: 'NPV vs Payback Period' },
    { '@type': 'WebPageElement', cssSelector: '#dcf-and-npv',          name: 'Discounted Cash Flow and NPV' },
    { '@type': 'WebPageElement', cssSelector: '#when-to-use-npv',      name: 'When to Use NPV' },
    { '@type': 'WebPageElement', cssSelector: '#limitations',          name: 'Limitations of NPV' },
    { '@type': 'WebPageElement', cssSelector: '#how-to-use',           name: 'How to Use This Calculator' },
    { '@type': 'WebPageElement', cssSelector: '#faq',                  name: 'Frequently Asked Questions' },
  ],
};

export default async function NPVPage() {
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
      <NPVClient region={region} faqs={faqs} />
    </>
  );
}

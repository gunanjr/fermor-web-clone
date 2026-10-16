export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single source of truth for the Simple and Compound Interest Calculator FAQ.
 * Consumed by page.tsx (FAQPage JSON-LD) and SimpleAndCompoundInterestCalculatorClient.tsx
 * (visible accordion) so the two never drift out of sync.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What is the difference between simple interest and compound interest?',
    a: 'Simple interest is calculated only on the original principal for every period, so the interest amount stays the same each year. Compound interest is calculated on the principal plus all interest already earned, so it grows faster with every additional year the money stays invested.',
  },
  {
    q: 'How do I calculate simple interest and compound interest together?',
    a: 'Enter the same principal, rate, and time period once in the calculator above. It applies the simple interest formula (P x R x T / 100) and the compound interest formula (P x (1 + r/n)^(n x t)) to the identical inputs, so you see both results and the exact rupee difference side by side.',
  },
  {
    q: 'Which is better, simple interest or compound interest?',
    a: 'For an investment or deposit, compound interest earns you more money at the same stated rate, because interest earns further interest. For a loan, compound (or reducing-balance) interest generally costs more than simple interest over the same tenure, so which one is "better" depends on whether you are earning or paying.',
  },
  {
    q: 'How do I convert a simple interest rate to an equivalent compound interest rate?',
    a: 'Use the rate converter in the "Converting Between Simple and Compound Interest Rates" section below. It solves the equation (1 + compound rate)^years = 1 + (simple rate x years / 100) for the compound rate, so both methods produce the same total return over the same period.',
  },
  {
    q: 'Does compound interest always earn more than simple interest at the same rate?',
    a: 'Yes, for any tenure longer than one compounding period, compound interest produces a higher total than simple interest at the identical rate and principal. Over exactly one year with annual compounding, the two methods give the same result, since there is no prior interest yet to compound.',
  },
  {
    q: 'How much more does compound interest earn than simple interest over 10 years?',
    a: 'It depends on the rate and compounding frequency, but the gap is substantial at typical Indian savings rates. At 8% per annum with annual compounding, Rs 1,00,000 earns Rs 80,000 as simple interest over 10 years versus about Rs 1,15,893 as compound interest, a difference of roughly Rs 35,893.',
  },
  {
    q: 'Do home loans in India use simple interest or compound interest?',
    a: 'Most home loans use a reducing-balance method, which behaves like interest compounded monthly on the outstanding principal after each EMI. A small number of short-term or flat-rate loan products quote simple interest instead, which usually costs more than the quoted rate suggests once converted to an effective annual rate.',
  },
  {
    q: 'What is the formula for simple interest?',
    a: 'Simple Interest (I) equals Principal x Rate x Time / 100, where the rate is the annual percentage and time is in years. Total Amount equals Principal plus Simple Interest.',
  },
  {
    q: 'What is the formula for compound interest?',
    a: 'The compound interest maturity value is A = P x (1 + r/n)^(n x t), where P is the principal, r is the annual rate as a decimal, n is the number of times interest compounds per year, and t is the time in years. Compound Interest equals A minus P.',
  },
  {
    q: 'Can I calculate simple interest and compound interest in Excel?',
    a: 'Yes. Simple interest is =Principal*Rate*Years/100, and compound interest is =Principal*(1+Rate/N)^(N*Years), where N is the compounding frequency per year. Both formulas are covered with worked examples in the "Simple and Compound Interest Formulas in Excel" section below.',
  },
  {
    q: 'Which Indian investments use simple interest and which use compound interest?',
    a: 'Savings accounts typically calculate interest daily on a simple basis and credit it quarterly, while fixed deposits, PPF, EPF, and recurring deposits compound at yearly, half-yearly, or quarterly frequency. Short-term NBFC loans, some car loans, and the education loan moratorium period commonly use simple interest instead.',
  },
  {
    q: 'Does compounding frequency change how much compound interest earns?',
    a: 'Yes. At the same stated annual rate, monthly compounding produces a higher maturity value than yearly compounding, because interest gets added to the principal sooner and starts earning its own interest sooner. The difference is small over a few years and becomes meaningful over a decade or more, and the calculator above lets you switch frequency to see the exact effect on your own numbers.',
  },
  {
    q: 'Is this simple and compound interest calculator free to use?',
    a: 'Yes, the calculator is free to use with no limit on how many times you run it. An optional free account lets you save your calculation and return to it later, and the site carries advertising to support that free access.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is building the automated financial action layer for India, the system that closes the gap between knowing what you should do with your money and actually doing it. The 500-plus free calculators, including this one, are the distribution layer; the product underneath connects real financial accounts through the Account Aggregator framework to automate the financial decisions people already know they should make.',
  },
];

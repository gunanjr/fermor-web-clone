export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single source of truth for the Compound Interest Calculator FAQ.
 * Consumed by page.tsx (FAQPage JSON-LD) and CompoundInterestCalculatorClient.tsx (visible accordion)
 * so the two never drift out of sync.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What is compound interest?',
    a: 'Compound interest is interest calculated on the principal plus all interest already earned in earlier periods. Simple interest only ever applies to the original principal. Albert Einstein is widely quoted as calling compounding the eighth wonder of the world, and the effect genuinely does accelerate the longer money stays invested.',
  },
  {
    q: 'How do I calculate compound interest in Indian rupees?',
    a: 'Enter your principal, annual rate, tenure, and compounding frequency in the calculator above. The result box, growth schedule, and every table on this page display in rupees by default, and the currency selector at the top of the input panel switches to USD, EUR, or GBP if needed.',
  },
  {
    q: 'What is the difference between compound interest and complex interest?',
    a: '"Complex interest" is not a real financial term. It is a common misspelling of compound interest, the method where interest is calculated on principal plus previously earned interest rather than on the principal alone.',
  },
  {
    q: 'Does this calculator handle monthly SIP investments?',
    a: 'No. This calculator compounds a single lump sum you enter once. A monthly SIP adds a fresh contribution every month, each compounding for a different length of time, which needs a different formula entirely. Use the SIP Calculator for recurring monthly investments, or the Lumpsum Calculator to compare a one-time investment against an SIP over the same period.',
  },
  {
    q: 'What is the Rule of 72?',
    a: 'The Rule of 72 estimates how many years it takes an investment to double: divide 72 by the annual return rate. At 10% annual returns, money doubles in roughly 7.2 years; at 12%, in about 6 years. It is a quick mental shortcut, not a substitute for the exact calculation above.',
  },
  {
    q: 'What is a good compound annual growth rate for Indian investments?',
    a: 'For large-cap equity mutual funds, 10 to 12% annualised is a reasonable long-term planning assumption over 10-plus years. Debt funds and fixed deposits typically run 6 to 8%. PPF and EPF currently sit around 7 to 8%, set by the government each quarter. To check the actual annualised growth rate an existing investment has delivered, use the CAGR Calculator.',
  },
  {
    q: 'How is compound interest taxed in India?',
    a: 'Fixed deposit interest is added to your income and taxed at your slab rate, with TDS deducted once annual interest crosses Rs 40,000 (Rs 50,000 for senior citizens). Equity mutual fund gains held over 12 months are taxed as LTCG at 12.5% above a Rs 1.25 lakh exemption; gains held under 12 months are taxed as STCG at 20%.',
  },
  {
    q: 'How much will 1 lakh grow in 10 years at 12% compound interest?',
    a: 'At 12% annual compound interest, Rs 1 lakh grows to roughly Rs 3.11 lakh in 10 years with yearly compounding, or about Rs 3.30 lakh with monthly compounding. The gap of nearly Rs 19,000 comes entirely from the more frequent compounding, not a higher rate.',
  },
  {
    q: 'What is the difference between simple and compound interest on 10 lakh for 5 years?',
    a: 'At 10% per annum, simple interest on Rs 10 lakh for 5 years gives exactly Rs 5 lakh in interest. Compound interest, compounded yearly, gives approximately Rs 6.11 lakh. The extra Rs 1.11 lakh is interest earned on interest that had already accumulated in prior years.',
  },
  {
    q: 'Does a lump sum compound differently from an SIP investment?',
    a: 'Yes. A lump sum starts compounding on the full amount from day one. An SIP installment compounds only from the month it is invested, so the first installment compounds the longest and the last one barely compounds at all. A lump sum of Rs 1.2 lakh and a Rs 10,000 monthly SIP invested over the same year will not produce the same return even at an identical rate.',
  },
  {
    q: 'Which compounds faster: monthly, quarterly, or yearly?',
    a: 'For the same principal, rate, and tenure, monthly compounding always produces the highest maturity value, followed by quarterly, then half-yearly, then yearly. The gap is small at short tenures and low rates but widens as either tenure or rate increases. Switch the frequency toggle above to see the exact difference on your own numbers.',
  },
  {
    q: 'Can I use this calculator for FD or RD compound interest?',
    a: 'You can use it to understand how compounding frequency affects any lump-sum deposit, including an FD. For an FD-specific result with quarterly compounding built in by default, plus TDS and senior citizen options, use the FD Calculator. For a recurring monthly deposit like an RD, use the RD Calculator instead.',
  },
  {
    q: 'How often should I review a compound interest investment?',
    a: 'For long-horizon holdings like PPF, EPF, or equity mutual funds, checking every six months is enough. For a fixed deposit, there is nothing to review until maturity. Compounding rewards patience, and frequent checking mostly just invites emotional decisions that interrupt it.',
  },
];

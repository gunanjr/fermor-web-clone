export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single source of truth for the FD Calculator FAQ.
 * Consumed by page.tsx (FAQPage JSON-LD) and FDCalculatorClient.tsx (visible accordion)
 * so the two never drift out of sync.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How is FD interest calculated in India?',
    a: 'Banks in India calculate FD interest using the quarterly compounding formula: A = P x (1 + R/400)^(4T), where P is the principal, R is the annual interest rate in percent, and T is the tenure in years. Interest earned each quarter is added to the principal, so every following quarter earns interest on a slightly larger base.',
  },
  {
    q: 'What is the difference between an FD and a term deposit?',
    a: 'A term deposit and a fixed deposit are the same product under different names. Banks and the Post Office in India generally call it a fixed deposit or time deposit, while some NBFCs and international banking contexts use the term "term deposit." Both involve a lump sum locked in at a fixed rate for a fixed period.',
  },
  {
    q: 'What is TDS on FD interest?',
    a: 'Under Section 194A of the Income Tax Act, banks deduct 10% TDS if your annual FD interest income from a single bank exceeds Rs 40,000 (Rs 50,000 for senior citizens). If PAN is not submitted, TDS is deducted at 20%. Interest is taxable at your slab rate whether or not TDS was deducted, so it must be reported in your ITR either way.',
  },
  {
    q: 'Is FD interest fully taxable?',
    a: 'Yes. FD interest is added to your total annual income and taxed at your applicable income tax slab rate under "Income from Other Sources." There is no flat or concessional rate on FD interest. Senior citizens can claim a deduction of up to Rs 50,000 on interest income under Section 80TTB.',
  },
  {
    q: 'Can I break an FD before maturity?',
    a: 'Most banks allow premature withdrawal but apply a penalty, typically a 0.5% to 1.0% reduction on the interest rate actually paid. Tax-saving FDs with a 5-year lock-in do not permit premature withdrawal under any circumstance. Some banks offer specific no-penalty FD products; check the terms before opening one.',
  },
  {
    q: 'What is Form 15G or Form 15H for FD?',
    a: 'Form 15G (for individuals below 60) and Form 15H (for senior citizens) are self-declaration forms submitted to your bank confirming your total annual income is below the taxable limit. Filing either form at the start of the financial year stops the bank from deducting TDS on your FD interest.',
  },
  {
    q: 'What is a tax-saving FD?',
    a: 'A tax-saving FD has a mandatory 5-year lock-in and qualifies for a deduction of up to Rs 1.5 lakh per year under Section 80C. The interest earned is still fully taxable at your slab rate. Premature withdrawal and loans against a tax-saving FD are not permitted during the lock-in period.',
  },
  {
    q: 'How do senior citizens get a higher FD rate?',
    a: 'Most banks add a fixed premium, commonly 0.25% to 0.75% per annum, to the standard FD rate for depositors aged 60 and above. Some banks offer an additional premium for super senior citizens aged 80 and above. The premium applies automatically once the account is opened in the senior citizen category with valid age proof.',
  },
  {
    q: 'What is a Post Office Fixed Deposit?',
    a: 'The Post Office Time Deposit (POTD) is a government-backed fixed deposit available in 1, 2, 3, and 5-year tenures. Interest is compounded quarterly but paid out annually rather than added back to the principal, and the 5-year POTD qualifies for the Section 80C deduction. Rates are set by the Ministry of Finance and revised each quarter.',
  },
  {
    q: 'How is a recurring deposit different from an FD?',
    a: 'A fixed deposit requires a one-time lump-sum investment at the start. A recurring deposit (RD) involves fixed monthly installments over the chosen tenure instead. An FD suits savers who already have a lump sum; an RD suits those building savings from monthly income. Both are compounded quarterly and covered under the same DICGC deposit insurance.',
  },
  {
    q: 'What is an NBFC or corporate FD, such as a Bajaj Finance FD?',
    a: 'An NBFC or corporate FD is a fixed deposit issued by a non-banking finance company rather than a bank, and Bajaj Finance is one of the larger issuers in India. NBFC FDs typically pay a higher rate than bank FDs, but they are not covered by DICGC insurance, so the credit rating of the issuer (from CRISIL, ICRA, or CARE) matters more than it does with a bank FD.',
  },
  {
    q: 'What is the SBI Annuity Deposit Scheme?',
    a: 'The SBI Annuity Deposit Scheme is a separate product from a standard SBI fixed deposit. You deposit a lump sum and receive fixed monthly payouts combining principal and interest over a chosen tenure of 36, 60, 84, or 120 months, rather than one final maturity payout. It suits depositors who want a regular monthly income stream instead of a lump sum at the end.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. All calculators are free to use, with a free account available to save your results. Fermor is building an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

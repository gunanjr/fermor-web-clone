// Single source of truth for FAQs: consumed by page.tsx (FAQPage JSON-LD)
// and InterestCalculatorClient.tsx (visible accordion).
export const faqItems = [
  {
    q: 'What is the formula for simple interest?',
    a: 'Simple Interest = P x R x T / 100, where P is the principal amount, R is the annual interest rate, and T is the time in years. Total Amount = P + Simple Interest.',
  },
  {
    q: 'What is a simple interest calculator?',
    a: 'A simple interest calculator computes the interest earned or owed on a principal amount using a fixed annual rate over a fixed period, without compounding. Enter the principal, rate, and time, and it returns the interest and total amount instantly.',
  },
  {
    q: 'How do I calculate daily interest?',
    a: 'Daily interest is calculated as Principal x Annual Rate x Number of Days / (100 x 365). Some banks use a 360-day year for certain products, which produces a slightly higher daily rate than the 365-day convention.',
  },
  {
    q: 'How do I calculate monthly interest?',
    a: 'Monthly interest is calculated as Principal x Annual Rate x Number of Months / (100 x 12). For a single month, divide the annual rate by 12 and apply it to the principal.',
  },
  {
    q: 'How does simple interest differ from compound interest?',
    a: 'Simple interest is calculated only on the original principal, so the interest earned each year is constant. Compound interest earns interest on both the principal and previously accumulated interest, so it grows faster the longer the money is invested.',
  },
  {
    q: 'What types of loans in India use simple interest?',
    a: 'Simple interest is common on short-term personal loans, some car loans, education loans during the moratorium period, and many microfinance and peer-to-peer lending products. Most long-tenure home loans and credit card balances use reducing-balance (compound-style) interest instead.',
  },
  {
    q: 'Is interest on a savings account or FD taxed in India?',
    a: 'Yes. Interest from savings accounts, fixed deposits, and recurring deposits is taxable at your income tax slab rate under "Income from Other Sources". Banks deduct TDS under Section 194A once your interest from that bank crosses the threshold in a financial year.',
  },
  {
    q: 'What is the TDS threshold on interest income?',
    a: 'For FY 2025-26, banks and post offices deduct 10% TDS once interest paid to one depositor crosses Rs 50,000 a year for individuals below 60, and Rs 1,00,000 a year for senior citizens. For interest from non-bank payers, the threshold is Rs 10,000. TDS is 20% if PAN is not furnished.',
  },
  {
    q: 'Can I use this calculator to find the interest rate or time period instead of the interest?',
    a: 'Yes. The Reverse Simple Interest Calculator section on this page lets you solve for the rate, the time period, or the principal itself, whichever value you do not already know, using the same formula rearranged.',
  },
  {
    q: 'Is this calculator useful for class 7 to 10 maths?',
    a: 'Yes. The same formula, I = P x R x T / 100, applies whether the numbers are textbook-sized (a few thousand rupees) or real-world sized (lakhs). Enter the values from a homework problem to check your own manual calculation, or use the Reverse Simple Interest section to check answers for problems that ask you to find the rate, time, or principal instead of the interest.',
  },
  {
    q: 'Which banks offer the best FD and savings account interest rates right now?',
    a: 'As of September 2026, SBI pays 2.50% on savings accounts and 6.25% to 6.75% on a 1-year FD depending on age, while HDFC Bank FDs go up to 7.4% on select tenures. Rates change without notice, so confirm the current rate on the bank\'s own page before depositing.',
  },
  {
    q: 'Is simple interest better for borrowers or lenders?',
    a: 'Simple interest generally benefits borrowers, since the total interest paid over time is lower than an equivalent compound-interest loan. For lenders and savers, compound interest produces higher returns, which is why fixed deposits and long-term investments typically compound instead.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

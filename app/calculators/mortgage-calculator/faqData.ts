/* ── FAQ data ──────────────────────────────────────────── */
/* Shared source of truth: the visible FAQ accordion (MortgageCalculatorClient.tsx) */
/* and the FAQPage JSON-LD schema (page.tsx) both derive from this single array. */
export const FAQS = [
  {
    q: 'Is a housing loan EMI calculator the same as a home loan EMI calculator?',
    a: '"Housing loan" and "home loan" are interchangeable terms in India for a loan used to buy, construct, or renovate residential property, so a housing loan EMI calculator and a home loan EMI calculator compute the exact same figure. If you want to calculate home loan eligibility rather than an EMI on a loan amount you already know, use the Loan Eligibility tab above or the dedicated housing loan eligibility calculator for a fuller CIBIL and employment-type breakdown.',
  },
  {
    q: 'What is a mortgage and how does it work?',
    a: 'A mortgage is a loan used to purchase property, where the property itself serves as collateral. You borrow a lump sum from a lender and repay it through fixed monthly EMIs over a chosen tenure, typically 15 to 30 years. Each EMI covers both interest on the outstanding balance and a portion of the principal. If you default, the lender has the legal right to foreclose on the property.',
  },
  {
    q: 'How is home loan EMI calculated?',
    a: 'Home loan EMI uses the reducing-balance formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]. P is the loan principal (property price minus down payment), R is the monthly interest rate (annual rate divided by 12 divided by 100), and N is the tenure in months. The EMI remains fixed throughout the loan, but the split between principal and interest shifts each month as the balance reduces.',
  },
  {
    q: 'What is a good down payment percentage for a home loan?',
    a: 'A down payment of 20% is the most practical benchmark in India. It keeps your loan amount within the range where most banks offer standard processing, and it significantly reduces your EMI and total interest. Going above 20% makes sense when you have surplus savings earning less than your loan rate. Going below 20% is generally not advisable because the larger loan increases both your EMI burden and total interest cost.',
  },
  {
    q: 'How does the loan tenure affect my home loan EMI?',
    a: 'A longer tenure reduces your monthly EMI but substantially increases total interest paid. For a Rs 50 lakh loan at 7.5%, a 20-year tenure gives an EMI of about Rs 40,280 and total interest of about Rs 46.67 lakh. Extending to 30 years drops the EMI to Rs 34,961 but pushes total interest to over Rs 75.86 lakh. The amortization table in this calculator shows the exact tradeoff for your inputs.',
  },
  {
    q: 'What credit score do I need for a home loan?',
    a: 'A CIBIL score of 750 or above is generally needed to access the best rates from major Indian lenders. Scores between 700 and 749 typically get approval but at a 0.1-0.3% rate premium. Scores below 700 often face rejection or significantly higher rates. Improve your score by clearing existing dues, reducing credit card utilization below 30%, and avoiding multiple loan applications in a short period.',
  },
  {
    q: 'Can I make extra payments toward my home loan?',
    a: 'Yes. Per RBI guidelines, banks cannot levy prepayment charges on floating-rate home loans. This means you can pay any extra amount, at any time, at zero cost. The Prepayment tab in this calculator shows exactly how much interest you save and how many months you cut off your loan term by adding even a small extra monthly payment.',
  },
  {
    q: 'What are the tax benefits of a home loan in India?',
    a: 'Under the old tax regime, you can claim three deductions. Section 80C covers principal repayment up to Rs 1.5 lakh per year. Section 24(b) covers interest paid up to Rs 2 lakh per year on a self-occupied property (no cap for let-out properties). Section 80EEA provides an additional Rs 1.5 lakh deduction for first-time buyers on affordable housing with stamp duty up to Rs 45 lakh. None of these apply under the new default tax regime.',
  },
  {
    q: 'How much home loan can I get on my salary?',
    a: 'The standard approach is the FOIR (Fixed Obligation to Income Ratio) test: most banks allow up to 40% of gross monthly income toward all EMIs combined. If your gross income is Rs 80,000 and you have no existing loans, your maximum eligible home loan EMI is Rs 32,000. Use the Eligibility tab in this calculator to get the exact figure based on your income, existing obligations, and preferred rate and tenure.',
  },
  {
    q: 'What is pre-EMI on a home loan?',
    a: 'Pre-EMI is interest-only payment during the construction phase of an under-construction property. The bank disburses the loan in stages as construction progresses. During this period, you pay only interest on the amount disbursed. Full EMIs (principal + interest) begin after the final disbursement. Choosing to start full EMIs immediately from the first tranche reduces your total interest cost but increases near-term cash outflow.',
  },
  {
    q: 'What is a home loan balance transfer?',
    a: 'A balance transfer moves your outstanding home loan to a new lender offering a lower interest rate. The new lender pays off your current lender and opens a fresh loan at the reduced rate. This is worth considering when the rate difference is at least 0.5% and you have more than 5 years of tenure remaining. Factor in the new lender\'s processing fee (typically 0.5 to 1% of the outstanding amount) when calculating actual savings.',
  },
  {
    q: 'What is FOIR and how does it affect eligibility?',
    a: 'FOIR (Fixed Obligation to Income Ratio) is the proportion of gross monthly income a bank allocates toward all fixed loan obligations including the proposed home loan. Most Indian banks set FOIR between 40% and 50%. A higher income, a lower existing debt burden, or a longer tenure all improve eligibility. The Eligibility tab calculates your maximum loan using a conservative 40% FOIR, which is what most major lenders apply.',
  },
  {
    q: 'What is the difference between MCLR and repo-linked home loans?',
    a: 'MCLR (Marginal Cost of Funds Based Lending Rate) is an internal bank benchmark that changes based on the bank\'s cost of funds. Repo-linked loans (RLLR) are directly tied to the RBI repo rate, meaning rate cuts pass through faster and more transparently. Since October 2019, all new floating-rate retail loans from banks are mandated to be linked to external benchmarks like the repo rate, not MCLR, per RBI guidelines.',
  },
  {
    q: 'Can self-employed people get a home loan?',
    a: 'Yes, self-employed individuals can get home loans in India. Banks typically ask for 2-3 years of ITR filings, profit and loss statements, balance sheets, and bank statements showing consistent income. HDFC Bank, LIC Housing Finance, and ICICI Bank are generally considered self-employed friendly. Interest rates for self-employed borrowers may be 0.1-0.25% higher than for salaried applicants at the same CIBIL score.',
  },
  {
    q: 'When do I start repaying the principal on my home loan?',
    a: 'Principal repayment begins with the first EMI from the moment regular repayment starts. However, in the early months, most of each EMI goes toward interest because the outstanding balance is at its highest. For a 20-year loan at 7.5%, approximately 78% of your first EMI is interest and only 22% is principal. By month 120 (year 10), the split narrows to close to 50-50. The amortization table in this calculator shows the exact monthly split.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian fintech platform built to close the gap between knowing what to do with money and actually doing it. It provides 500+ free financial calculators and a financial eligibility engine that matches users with loans and investments they qualify for. Available free at fermor.in.',
  },
  {
    q: 'What is the EMI for a Rs 1 crore home loan?',
    a: 'For a Rs 1 crore home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 80,559. At SBI\'s current rate of 7.25% for 20 years, the EMI is approximately Rs 79,038. At 30 years and 7.5%, the EMI drops to Rs 69,921 but total interest paid rises from Rs 93.34 lakh to Rs 1.52 crore. Use the calculator above and set loan amount to Rs 1 crore to check the exact EMI for any rate and tenure combination.',
  },
  {
    q: 'What is the EMI for a Rs 1.5 crore home loan?',
    a: 'For a Rs 1.5 crore home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 1,20,839. To qualify for this loan at 40% FOIR with no existing EMIs, you need a gross monthly income of at least Rs 3.02 lakh. At 30 years and the same rate, the EMI drops to Rs 1,04,882, saving Rs 15,957 per month but adding approximately Rs 87.56 lakh in total interest compared to a 20-year tenure.',
  },
  {
    q: 'What is the current SBI home loan interest rate?',
    a: 'SBI\'s home loan interest rate starts at 7.25% p.a. as of July 2026 for salaried borrowers with a CIBIL score above 750, following the RBI\'s repo rate cuts through 2025 that brought the repo rate down to 5.25%. Rates are linked to SBI\'s EBLR (External Benchmark Lending Rate), which adjusts quarterly based on the RBI repo rate. Women borrowers receive a 0.05% concession, bringing the effective rate to 7.20%. Set the rate slider in this calculator to 7.25% to see your SBI-specific EMI.',
  },
  {
    q: 'How is a home loan amortization schedule useful?',
    a: 'A home loan amortization schedule shows exactly how much of each payment goes toward principal and how much toward interest, along with the outstanding balance after every payment. In the early years of a 7.5% loan, about 78% of each EMI is interest. By year 10, the split narrows to close to 50-50. Knowing this helps you time lump-sum prepayments for maximum impact: a prepayment in year 3 saves more interest than the same payment in year 15.',
  },
  {
    q: 'What is the EMI for a Rs 30 lakh home loan?',
    a: 'For a Rs 30 lakh home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 24,168. Total repayment over 240 months is approximately Rs 58 lakh, of which Rs 28 lakh is interest. At SBI\'s 7.25% rate, the EMI is approximately Rs 23,711. Over 30 years at 7.5%, the EMI falls to Rs 20,976 but total interest rises to approximately Rs 45.5 lakh.',
  },
  {
    q: 'What is the EMI for a Rs 50 lakh home loan?',
    a: 'For a Rs 50 lakh home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 40,280. At 15 years, the EMI rises to Rs 46,351 but total interest is significantly lower. At 30 years, EMI drops to Rs 34,961 but total interest paid exceeds Rs 75.86 lakh, versus Rs 46.67 lakh for a 20-year tenure. Each 0.25% change in rate adjusts the EMI by approximately Rs 761 on a Rs 50 lakh loan.',
  },
  {
    q: 'What is the EMI per lakh for a home loan in India?',
    a: 'EMI per lakh is the monthly payment on every Rs 1 lakh borrowed, and it scales linearly to any loan size. At 7.5% for 20 years, EMI per lakh is Rs 806, so a Rs 40 lakh loan costs 40 x Rs 806 = Rs 32,240 a month. At 7.25% (SBI) for 20 years, it is Rs 790 per lakh. Multiply the per-lakh figure by the number of lakhs to estimate any loan amount instantly.',
  },
  {
    q: 'What is the EMI for a Rs 20 lakh home loan?',
    a: 'For a Rs 20 lakh home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 16,112. Total repayment over 240 months is approximately Rs 38.67 lakh, of which Rs 18.67 lakh is interest. At 30 years, the EMI falls to Rs 13,984 but total interest rises to approximately Rs 30.34 lakh.',
  },
  {
    q: 'What is the EMI for a Rs 40 lakh home loan?',
    a: 'For a Rs 40 lakh home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 32,224. Total repayment over 240 months is approximately Rs 77.34 lakh, of which Rs 37.34 lakh is interest. At 30 years, EMI drops to Rs 27,969 but total interest paid rises to approximately Rs 60.69 lakh.',
  },
  {
    q: 'What is the EMI for a Rs 38 lakh home loan for 5 years?',
    a: 'For a Rs 38 lakh home loan at 7.5% for a 5-year tenure, the monthly EMI is approximately Rs 76,144. Because the tenure is short, total interest is only about Rs 7.69 lakh, far lower than the same loan spread over 20 or 30 years, but the monthly outflow is significantly higher.',
  },
  {
    q: 'What is the EMI for a Rs 60 lakh home loan?',
    a: 'For a Rs 60 lakh home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 48,336. Total repayment over 240 months is approximately Rs 1.16 crore, of which Rs 56.01 lakh is interest. At 30 years, EMI drops to Rs 41,953 but total interest rises to approximately Rs 91.03 lakh.',
  },
  {
    q: 'What is the EMI for a Rs 70 lakh home loan for 15 years?',
    a: 'For a Rs 70 lakh home loan at 7.5% for a 15-year tenure, the monthly EMI is approximately Rs 64,891. Total repayment over 180 months is approximately Rs 1.17 crore, of which Rs 46.80 lakh is interest, considerably less than the same loan spread over 20 or 25 years.',
  },
  {
    q: 'What is the EMI for a Rs 80 lakh home loan for 30 years?',
    a: 'For a Rs 80 lakh home loan at 7.5% for a 30-year tenure, the monthly EMI is approximately Rs 55,937. Total repayment over 360 months is approximately Rs 2.01 crore, of which Rs 1.21 crore is interest, more than the original loan amount. A shorter 20-year tenure raises the EMI to Rs 64,447 but cuts total interest to approximately Rs 74.67 lakh.',
  },
  {
    q: 'What is the EMI for a Rs 2 crore home loan?',
    a: 'For a Rs 2 crore home loan at 7.5% for 20 years, the monthly EMI is approximately Rs 1,61,119. Total repayment over 240 months is approximately Rs 3.87 crore, of which Rs 1.87 crore is interest. To qualify at 40% FOIR with no existing EMIs, you need a gross monthly income of at least Rs 4.03 lakh.',
  },
  {
    q: 'Can I get a 40-year or 50-year home loan in India?',
    a: 'No. RBI-regulated banks and housing finance companies in India cap home loan tenure at 30 years, and most also require the loan to be fully repaid before the borrower turns 70. Tenures of 40 or 50 years are a US mortgage feature and are not offered by Indian lenders. If you are searching for this, you likely want the longest tenure actually available here: 30 years, which gives the lowest possible EMI for a given loan amount.',
  },
  {
    q: 'Does my home loan EMI include property tax and home insurance?',
    a: 'No, not by default. Unlike a US mortgage, which often bundles principal, interest, property tax, and insurance into one escrowed payment (PITI), an Indian home loan EMI covers only principal and interest. Property tax is paid separately to your municipal authority, and home insurance is optional and paid separately to the insurer, though some lenders let you add it to the loan. Use "More settings" in the calculator above to see property tax and insurance as a combined monthly figure alongside your EMI.',
  },
  {
    q: 'What is PMAY and how does it reduce my home loan EMI?',
    a: 'Pradhan Mantri Awas Yojana (PMAY) is a central government scheme that gives eligible first-time home buyers an interest subsidy on their home loan. The subsidy is credited upfront to the loan account, which reduces the effective principal and therefore the EMI, rather than being paid out as a separate rebate. Eligibility depends on income category and property value caps that are revised periodically, so check the official PMAY portal or your lender for current terms before applying.',
  },
  {
    q: 'What extra costs should I budget for beyond the EMI when buying a home in India?',
    a: 'Beyond the EMI, budget for stamp duty (3-8% of property value, varies by state), registration charges (around 1%), GST on under-construction property (1-5%, nil on ready-to-move-in homes), loan processing fees (0.25-1% of loan amount), legal and valuation fees (Rs 5,000-15,000), and home insurance. On a Rs 75 lakh property, stamp duty and registration alone can add Rs 3-6.75 lakh upfront.',
  },
];

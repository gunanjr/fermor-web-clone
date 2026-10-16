export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single source of truth for the PPF Calculator FAQ.
 * Consumed by page.tsx (FAQPage JSON-LD) and PPFCalculatorClient.tsx (visible accordion)
 * so the two never drift out of sync.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'How is PPF maturity amount calculated?',
    a: 'PPF uses annual compounding on a balance that grows with each year\'s deposit: closing balance = (opening balance + that year\'s deposit) x (1 + rate). Repeating this for every year of the tenure gives the maturity amount. The calculator above runs this exact year-by-year loop, so the figure it shows matches the expandable growth table below it.',
  },
  {
    q: 'What is the current PPF interest rate?',
    a: 'The PPF interest rate is 7.1% per annum, compounded annually. The Ministry of Finance reviews and announces small savings scheme rates every quarter, and PPF has held at 7.1% since April 2020. The rate is identical across every bank and post office since it is set by the central government, not by individual institutions.',
  },
  {
    q: 'What is the minimum and maximum PPF contribution per year?',
    a: 'The minimum annual PPF deposit is Rs 500 per financial year, and the maximum is Rs 1.5 lakh under Section 80C. Any amount deposited above Rs 1.5 lakh in a financial year earns no interest and gets no tax deduction on the excess. You can deposit in one lump sum or spread it across up to 12 instalments a year.',
  },
  {
    q: 'Can I open more than one PPF account, or a PPF account for my child?',
    a: 'No, an individual can hold only one PPF account in their own name; a second account is treated as irregular and earns no interest. A parent or legal guardian can separately open a PPF account for a minor child, but the combined deposit across the guardian\'s own account and the minor\'s account cannot exceed Rs 1.5 lakh in a financial year.',
  },
  {
    q: 'What is the PPF lock-in period, and when can I withdraw?',
    a: 'PPF has a mandatory 15-year lock-in from the date the account is opened, not from the date of the first deposit. Partial withdrawal is allowed from the 7th financial year onward, capped at the lower of 50% of the balance at the end of the 4th preceding year or 50% of the balance at the end of the immediately preceding year. Full withdrawal is only possible at maturity.',
  },
  {
    q: 'Is PPF interest and maturity amount tax-free?',
    a: 'Yes. PPF follows the EEE (Exempt-Exempt-Exempt) structure: your annual deposit up to Rs 1.5 lakh is deductible under Section 80C, the interest credited each year is tax-free, and the full maturity amount you receive after 15 years is also tax-free. No other 80C instrument offers this three-way exemption with a sovereign guarantee.',
  },
  {
    q: 'Can I extend my PPF account after 15 years?',
    a: 'Yes, in blocks of 5 years, with two options. Extension with contribution lets you keep depositing and claiming Section 80C benefit; you must file Form H within one year of maturity to choose this. Extension without contribution lets the existing balance keep earning interest while you withdraw up to once a year, with no fresh deposits.',
  },
  {
    q: 'How is PPF interest calculated on a monthly basis?',
    a: 'PPF interest is computed on the lowest balance in the account between the 5th and the last day of each calendar month, but it is credited to the account only once, at the end of the financial year (31 March). A deposit made on or before the 5th of a month earns interest from that month; a deposit made after the 5th only starts earning from the following month.',
  },
  {
    q: 'Where can I open a PPF account?',
    a: 'PPF accounts are available at any post office and most nationalised and private banks, including SBI, HDFC Bank, ICICI Bank, Axis Bank, PNB, Canara Bank, Bank of Baroda, Union Bank of India, Bank of India, and Indian Bank. The interest rate, deposit limits, and rules are identical everywhere since PPF is a central government scheme, not a bank product.',
  },
  {
    q: 'Can I take a loan against my PPF account?',
    a: 'Yes, between the 3rd and 6th financial year from account opening. The loan is capped at 25% of the balance at the end of the 2nd year preceding the year you apply, and carries an interest rate of 1% per annum above the prevailing PPF rate. You cannot apply for a fresh loan while an earlier one is outstanding.',
  },
  {
    q: 'What is the difference between PPF and EPF?',
    a: 'EPF is a mandatory retirement scheme for salaried employees, funded by both employee and employer contributions and managed through the EPFO. PPF is entirely voluntary and open to any resident individual, including the self-employed, with no employer component. For a maturity estimate on employer-linked EPF balances, use the EPF Calculator.',
  },
  {
    q: 'What is the difference between PPF and VPF?',
    a: 'VPF (Voluntary Provident Fund) is an optional top-up on top of the mandatory 12% EPF contribution already deducted from a salaried employee\'s basic pay, and it earns the EPF rate, currently 8.25%. PPF is a separate, standalone government scheme open to anyone, salaried or not, at its own 7.1% rate. The two are not interchangeable; check contribution options on the VPF Calculator.',
  },
  {
    q: 'Is PPF or NPS better for retirement?',
    a: 'PPF gives a fixed, sovereign-guaranteed return with fully tax-free maturity and no restriction on how you use the corpus. NPS invests in market-linked equity and debt, historically offering higher long-term growth potential, but 40% of the NPS corpus must go into an annuity at retirement, and that annuity income is taxable. Many investors hold both: PPF for a guaranteed, liquid-at-maturity core, NPS for market exposure and the extra Rs 50,000 deduction under Section 80CCD(1B).',
  },
  {
    q: 'How much will Rs 5,000 a month in PPF grow to in 15 years?',
    a: 'Rs 5,000 a month works out to Rs 60,000 a year. At the current 7.1% rate over 15 years, that builds to a maturity amount of roughly Rs 16.3 lakh, against a total deposit of Rs 9 lakh, so interest earned is close to Rs 7.3 lakh, all of it tax-free. Enter Rs 60,000 as the annual investment above, or switch the toggle to monthly, to see the exact figure and year-by-year table.',
  },
  {
    q: 'Can I use this calculator for a one-time PPF investment?',
    a: 'Yes. Set the annual investment to zero and enter your one-time deposit in the Existing PPF Balance field. The calculator then compounds that single amount for the full tenure with no further deposits, which is how a genuine one-time investment behaves inside a real PPF account.',
  },
  {
    q: 'Can NRIs open or continue a PPF account?',
    a: 'NRIs cannot open a new PPF account. A resident Indian who later becomes an NRI can continue an existing PPF account until its original 15-year maturity at the same terms as a resident account, but cannot extend it further as an NRI once that maturity date is reached.',
  },
  {
    q: 'What happens if I miss a PPF contribution in a year?',
    a: 'The account becomes inactive if the minimum Rs 500 deposit is not made in a financial year. To reactivate it, you pay a penalty of Rs 50 for each year of default, along with the minimum Rs 500 deposit due for every missed year. The account remains open and continues earning interest; only new deposits are blocked until it is reactivated.',
  },
];

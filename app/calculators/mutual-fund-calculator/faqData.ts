export interface FAQItem {
  q: string;
  a: string;
}

export const faqItems: FAQItem[] = [
  {
    q: 'What is a mutual fund returns calculator?',
    a: 'A mutual fund returns calculator projects how much a lumpsum or monthly SIP investment could grow over a chosen period at an assumed annual return rate. Enter the amount, the expected return, and the duration, and it applies the standard compound interest formula for lumpsum or the SIP formula for monthly investments. The output is an estimate for planning purposes, not a guaranteed outcome, since actual fund performance depends on the market.',
  },
  {
    q: 'What is a mutual fund?',
    a: 'A mutual fund pools money from many investors and invests it in stocks, bonds, or other securities on their behalf, managed by a SEBI-registered asset management company. Each investor owns units of the fund, and the value of those units moves with the value of the underlying portfolio. Mutual funds in India are regulated by the Securities and Exchange Board of India under the SEBI Mutual Fund Regulations.',
  },
  {
    q: 'What is the difference between SIP and lumpsum in this calculator?',
    a: 'Lumpsum mode calculates growth on a single, one-time investment using compound interest. SIP mode calculates growth on a fixed amount invested every month, using the SIP compounding formula that accounts for each instalment entering the market on a different date. Toggle between the two modes at the top of the calculator to switch which formula runs.',
  },
  {
    q: 'What return rate should I use for the calculation?',
    a: 'The rate depends on the fund category you plan to invest in. Large-cap equity funds in India have delivered roughly 11 to 14 percent annualised returns over the last 10 years, per AMFI historical NAV data. Mid-cap and small-cap funds have returned 14 to 22 percent with much higher volatility. Debt funds have returned 6 to 8 percent. Use the lower end of a category range for conservative planning, and never base your assumption on a single recent year.',
  },
  {
    q: 'Is lumpsum or SIP better for mutual funds?',
    a: 'Neither is universally better. A lumpsum invested at a market low tends to outperform SIP for the same period, since the full amount compounds from day one. SIP spreads purchases across different NAV levels, which removes the need to time the market and suits salaried investors with monthly surplus income. Most retail investors in India use SIP because it matches how income actually arrives.',
  },
  {
    q: 'How do I calculate mutual fund returns manually?',
    a: 'For a lumpsum, multiply the invested amount by (1 plus the annual rate as a decimal) raised to the power of the number of years. For a SIP, convert the annual rate to a monthly rate using (1 plus annual rate)^(1/12) minus 1, then apply that monthly rate to each instalment over the investment period using the standard SIP formula. Both formulas are shown in full further down this page.',
  },
  {
    q: 'What is a good mutual fund return in India?',
    a: 'For equity mutual funds, a 10-year CAGR above 12 percent is considered strong for large-cap funds and above 15 percent for mid-cap or flexi-cap funds. For hybrid funds, 9 to 12 percent is a reasonable benchmark. For debt funds, anything above the current repo rate of 5.5 percent after expenses is competitive. Compare a fund against its own category average and its benchmark index, not against a fixed number.',
  },
  {
    q: 'What is the minimum investment in a mutual fund?',
    a: 'Most equity and debt mutual funds in India accept lumpsum investments starting at Rs 500 or Rs 1,000. SIPs can start from as little as Rs 100 per month in some schemes. SEBI requires every open-ended mutual fund to offer a monthly SIP option, which keeps the entry point accessible regardless of income level.',
  },
  {
    q: 'How are mutual fund returns taxed in India?',
    a: 'Equity funds held for more than 12 months are taxed at 12.5 percent on long-term capital gains above Rs 1.25 lakh per financial year. Equity funds sold within 12 months are taxed at 20 percent as short-term capital gains. Debt funds purchased on or after 1 April 2023 are taxed at your income slab rate regardless of holding period, with no indexation benefit.',
  },
  {
    q: 'What is NAV in mutual funds?',
    a: 'NAV, or Net Asset Value, is the per-unit price of a mutual fund scheme. It is calculated once a day by dividing the total value of the fund portfolio by the number of outstanding units. You buy units at the NAV applicable on your investment date and redeem at the NAV applicable on your redemption date. Unlike a stock price, NAV does not move during the trading day.',
  },
  {
    q: 'Can I lose money in a mutual fund?',
    a: 'Yes. Equity mutual funds carry market risk and can lose value during downturns, with no capital guarantee. In March 2020, large-cap equity funds fell 30 to 40 percent within weeks before recovering over the following year. Debt funds can also lose value if interest rates rise sharply or a bond in the portfolio defaults. Every mutual fund discloses this risk in its scheme information document.',
  },
  {
    q: 'What is the difference between direct and regular mutual fund plans?',
    a: 'A regular plan is sold through a distributor who earns a commission, which is built into a slightly higher expense ratio. A direct plan is bought straight from the fund house or a SEBI-registered platform with no distributor commission. The expense ratio gap, typically 0.5 to 1 percent a year, compounds into a meaningfully larger corpus difference over a 10 to 20 year horizon.',
  },
  {
    q: 'What is the expense ratio of a mutual fund?',
    a: 'The expense ratio is the annual fee an asset management company charges to run a fund, shown as a percentage of average assets under management. Index funds typically charge 0.05 to 0.20 percent. Actively managed equity funds charge up to 1.05 percent under SEBI\'s expense ratio caps for large funds. The fee is already deducted before the NAV is published, so it never appears as a separate line item in your statement.',
  },
  {
    q: 'How long should I stay invested in equity mutual funds?',
    a: 'A minimum holding period of five years is generally recommended for equity mutual funds, and ten years reduces the chance of a negative outcome further. Every rolling 10-year period on the Nifty 50 between 2000 and 2024 has delivered a positive return, including periods that started at a market peak. A longer horizon gives compounding more time to work and reduces the effect of any single bad year.',
  },
  {
    q: 'Does this calculator work for one-time and monthly investments in the same run?',
    a: 'This calculator projects one mode at a time: pick Lumpsum for a single one-time amount, or Monthly SIP for a recurring monthly contribution. To model both together, run the lumpsum calculation and the SIP calculation separately at the same rate and duration, then add the two resulting corpus figures.',
  },
  {
    q: 'What is an index fund and does this calculator apply to it?',
    a: 'An index fund is a mutual fund that replicates a market index like the Nifty 50 or Sensex instead of being actively managed, which keeps its expense ratio low, typically under 0.20 percent. This calculator applies to index funds the same way it applies to any other equity fund: enter your expected return, based on the index\'s historical CAGR, and the duration.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions, free to use. The product being built is an automated financial action system that uses the Account Aggregator framework to connect real financial accounts and close the gap between knowing what you should do with your money and actually doing it.',
  },
];

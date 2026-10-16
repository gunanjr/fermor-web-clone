export const faqItems = [
  {
    q: 'What is CAGR?',
    a: 'CAGR stands for Compound Annual Growth Rate. It is the annualised rate at which an investment grew from its starting value to its ending value over a given number of years, assuming profits were reinvested each year. SEBI mandates that mutual funds in India report performance using CAGR for all periods of one year and above.',
  },
  {
    q: 'What is the CAGR formula?',
    a: 'CAGR = (Final Value / Initial Value) ^ (1 / n) minus 1, where n is the number of years. For example, Rs 1 lakh grows to Rs 2 lakh in 5 years: (2,00,000 / 1,00,000)^(1/5) minus 1 = 14.87% per annum. Multiply the result by 100 to get the percentage.',
  },
  {
    q: 'How to calculate CAGR in Excel?',
    a: 'Three methods work in Excel. Direct formula: =((End/Start)^(1/Years))-1. POWER function: =POWER(End/Start,1/Years)-1. RRI function (easiest): =RRI(Years,Start,End), which returns the CAGR directly. For a 5-year CAGR with start value in A2 and end value in B2, type =RRI(5,A2,B2) and format the cell as a percentage.',
  },
  {
    q: 'What is a reverse CAGR calculator?',
    a: 'A reverse CAGR calculator solves the formula for a different unknown. Instead of finding the rate, it finds either how many years it takes to reach a target at a given CAGR, or what the future value will be at a given CAGR and time period. The duration formula is: n = log(Final Value / Initial Value) divided by log(1 + CAGR). The Reverse CAGR tab in this calculator handles this calculation.',
  },
  {
    q: 'What is monthly CAGR and how to calculate it?',
    a: 'Monthly CAGR is the equivalent monthly growth rate for a given annual CAGR. Formula: Monthly CAGR = (1 + Annual CAGR)^(1/12) minus 1. Example: 12% annual CAGR = (1.12)^(1/12) minus 1 = 0.9489% per month. To calculate from monthly data directly: (Final Value / Initial Value)^(1 / total months) minus 1.',
  },
  {
    q: 'What is the difference between CAGR and absolute return?',
    a: 'Absolute return ignores time. If Rs 1 lakh became Rs 2 lakh, the absolute return is 100%, whether it took 2 years or 20. CAGR adjusts for the holding period. A 100% gain over 5 years is a CAGR of 14.87% per year. The same gain over 10 years is only 7.18% per year. Use CAGR when comparing investments with different holding periods.',
  },
  {
    q: 'What is considered a good CAGR for investments in India?',
    a: 'Bank FDs deliver 6 to 7.5% CAGR. PPF earns 7.1%. EPF earns 8.25%. The Nifty 50 has returned approximately 11 to 13% CAGR over a 10-year period. Diversified equity mutual funds have historically returned 12 to 16% CAGR over long periods. For retirement planning, 10 to 12% is a commonly used long-term equity assumption in India.',
  },
  {
    q: 'What is a lumpsum CAGR calculator?',
    a: 'A lumpsum CAGR calculator measures the annualised return on a single one-time investment. Enter the initial amount, the final value, and the number of years. The result is the CAGR. This is different from SIP returns, which require XIRR because money is deployed at multiple dates across the investment period.',
  },
  {
    q: 'Can NRI investors use this CAGR calculator?',
    a: 'Yes. This calculator includes a multi-currency toggle that converts all amounts to your preferred currency including USD, EUR, GBP, and others. NRI investors can enter their Indian investment values in rupees and switch to their resident country currency to see the equivalent amounts. The CAGR percentage itself does not change with the currency, but seeing the amounts in a familiar currency helps with planning.',
  },
  {
    q: 'Is CAGR the same as IRR?',
    a: 'No. CAGR applies to a single lumpsum investment with one start date and one end date. IRR handles multiple cash flows at different points in time. For a single lumpsum with no interim transactions, CAGR and IRR give the same result. For SIP investments or portfolios with multiple transactions, use XIRR.',
  },
  {
    q: 'When should I use XIRR instead of CAGR?',
    a: 'Use XIRR whenever money moves in or out at multiple dates, such as monthly SIP instalments, partial withdrawals, or dividend reinvestments. CAGR is only valid for a single initial investment and a single ending value with no transactions in between. The returns shown on your mutual fund statement or broker app for a SIP portfolio are always XIRR.',
  },
  {
    q: 'Can CAGR be negative?',
    a: 'Yes. If the final value is lower than the initial investment, CAGR is negative. For example, Rs 1 lakh falling to Rs 70,000 over 4 years gives CAGR = (70,000/1,00,000)^(1/4) minus 1 = negative 8.15% per year, meaning the investment lost value on average every year.',
  },
  {
    q: 'What are the limitations of CAGR?',
    a: 'CAGR does not reflect year-to-year volatility. Two funds can have the same 10-year CAGR but very different journeys. It cannot handle intermediate cash flows. It is sensitive to the specific start and end dates selected. And it does not account for the level of risk involved in generating the return.',
  },
  {
    q: 'What is the CAGR of Nifty 50?',
    a: 'The Nifty 50 has delivered approximately 13.5% CAGR over 20 years, approximately 11.5 to 12% CAGR over 10 years, and approximately 14 to 16% CAGR over 5 years, per NSE India price return data. Total returns including dividend reinvestment run roughly 1.5% higher annually than these price-return figures.',
  },
  {
    q: 'What is a good 5-year CAGR for a mutual fund in India?',
    a: 'The Nifty 50 has historically delivered approximately 14 to 16% CAGR over 5-year periods. A large-cap fund beating 14% on a 5-year trailing basis has beaten its benchmark. Midcap funds at 18 to 22% CAGR over 5 years are considered strong performers, though 5-year windows are more volatile than 10-year windows.',
  },
  {
    q: 'Can I use this as a CAGR calculator for SIP investments?',
    a: 'Not directly. CAGR only works for a single lumpsum with one entry date and one exit date. A SIP has a different entry date for every instalment, so SEBI-regulated platforms report SIP performance as XIRR, not CAGR. Use the CAGR Calculator for a one-time investment and the XIRR Calculator for a SIP portfolio.',
  },
  {
    q: 'How is CAGR different from average annual growth rate (AAGR)?',
    a: 'AAGR is the arithmetic average of year-on-year percentage changes. CAGR is the geometrically compounded rate from start to finish. For volatile returns, CAGR is always lower than or equal to AAGR and is the more accurate measure of actual wealth growth. Returns of plus 30%, minus 20%, plus 40% give an AAGR of 16.67% but a CAGR of only 13.35%.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. The calculators are the distribution layer: free tools that give real answers to real financial questions. The product being built is an automated financial action system using the Account Aggregator framework to connect real financial accounts and close the gap between knowing what to do with your money and actually doing it.',
  },
];

export const INFLATION_RETURN_FAQS = [
  {
    q: 'What is inflation adjusted return?',
    a: 'Inflation adjusted return, also called real return, is the annual investment return after accounting for inflation. It measures the change in purchasing power rather than the change in the account balance. A 12% nominal return with 6% inflation produces a 5.66% real return under the Fisher equation.',
  },
  {
    q: 'What is the formula for inflation adjusted return?',
    a: 'The exact formula is ((1 + nominal return) / (1 + inflation rate)) - 1, with both rates expressed as decimals. At 12% nominal return and 6% inflation, the calculation is (1.12 / 1.06) - 1 = 5.66%. This is more accurate than subtracting inflation from the nominal rate.',
  },
  {
    q: 'What is nominal return versus real return?',
    a: 'Nominal return is the stated investment gain before inflation. Real return adjusts that gain for the change in prices and shows how purchasing power changed. An investment can earn a positive nominal return while producing a negative real return if its return is lower than inflation.',
  },
  {
    q: 'How do I calculate inflation adjusted return in Excel?',
    a: 'If the nominal rate is in A1 and inflation is in A2, enter =((1+A1)/(1+A2))-1 and format the result as a percentage. For a real future value, put principal in A3 and years in A4, then use =A3*((1+A1)/(1+A2))^A4. Enter rates as percentages, such as 12% and 6%.',
  },
  {
    q: 'What is a good real rate of return in India?',
    a: 'A suitable real return depends on the investment, its risk and the time horizon. A positive real return means purchasing power is growing, but it does not by itself show whether the risk was appropriate. Compare like-for-like periods and account for tax, fees and volatility before judging an investment.',
  },
  {
    q: 'How does inflation erode investment returns?',
    a: 'Inflation reduces what a future balance can buy, and the effect compounds over time. At 12% nominal return and 6% inflation, Rs 10 lakh grows to about Rs 96.5 lakh nominally over 20 years, worth about Rs 30.1 lakh in today’s money. The difference is about Rs 66.4 lakh of purchasing power.',
  },
  {
    q: 'What inflation rate should I use for financial planning in India?',
    a: 'Choose an assumption that fits the goal and review it periodically. India’s CPI target is 4% with a tolerance band of 2% to 6%, as set by the RBI; this is a policy target, not a forecast for your personal expenses. Education, healthcare and housing costs can rise at a different pace from headline CPI.',
  },
  {
    q: 'Why is the Fisher equation more accurate than subtracting inflation?',
    a: 'The Fisher equation adjusts the growth factors for both the investment and prices. Simple subtraction ignores the interaction between the two rates and overstates the real return. At 12% nominal return and 6% inflation, subtraction gives 6%, while the exact real return is 5.66%.',
  },
  {
    q: 'Can my investment have a negative real return?',
    a: 'Yes. A negative real return occurs when inflation outpaces the investment return. For example, a savings rate of 3.5% with 6% inflation gives a real return of about -2.36% before tax. The balance rises in rupees, but its purchasing power falls.',
  },
  {
    q: 'How does inflation adjusted return affect retirement planning?',
    a: 'Retirement projections should distinguish future rupees from today’s purchasing power. At 6% inflation, Rs 5 crore received in 25 years has purchasing power of about Rs 1.16 crore today. Use consistent nominal or real assumptions when comparing a retirement goal with expected investment growth.',
  },
  {
    q: 'Are mutual fund returns shown as inflation adjusted?',
    a: 'No. Published mutual fund CAGR and XIRR figures are nominal unless a source explicitly labels them as inflation-adjusted. To estimate a real return, use the same-period nominal return and inflation rate in the Fisher equation. Past performance does not guarantee future returns.',
  },
  {
    q: 'What is the difference between real return and absolute return?',
    a: 'Absolute return is the total percentage gain or loss over a holding period, without annualising it or adjusting for inflation. Real return is an annual rate adjusted for inflation. For multi-date investments such as SIPs, calculate the cash-flow return first, then adjust it for inflation over a matching period.',
  },
  {
    q: 'How does this calculator use the Fisher equation?',
    a: 'The calculator divides one plus the nominal return by one plus the inflation rate, then subtracts one. It compounds that exact real rate over the selected number of years to estimate today’s purchasing-power value. Results assume constant annual rates and do not automatically account for tax or fees.',
  },
  {
    q: 'What is a good real rate of return?',
    a: 'There is no single real return that is good for every investor or goal. A positive real return means purchasing power increased, while a higher expected return usually involves greater uncertainty. Compare returns with an appropriate benchmark and consider taxes, costs, volatility and the period measured.',
  },
  {
    q: 'Is a 6% inflation adjusted return good?',
    a: 'A 6% real return means purchasing power grows by about 6% a year under the stated assumptions. Whether that is suitable depends on the asset risk, investment period and your ability to tolerate losses. Check whether the figure is before tax and fees, and compare it with a relevant benchmark over the same dates.',
  },
  {
    q: 'What is the difference between real return and nominal return?',
    a: 'Nominal return measures the change in an investment balance before adjusting for rising prices. Real return adjusts that rate for inflation and shows the change in purchasing power. If a deposit earns 7% while inflation is 6%, its exact real return is about 0.94% before tax, not 1%.',
  },
  {
    q: 'How do I calculate real return after tax?',
    a: 'First reduce the nominal return for the applicable tax and costs, then apply the Fisher equation to that net rate and inflation. The tax calculation depends on the asset, holding period, income and rules in force. Use current official guidance for the tax step; this estimate does not calculate individual liability or replace professional advice.',
  },
  {
    q: 'How do I calculate inflation adjusted return for SIP?',
    a: 'Calculate the SIP’s money-weighted return using its dated contributions and current value, commonly with XIRR. Then adjust that annualised nominal return for inflation over the matching period using the Fisher equation. A simple lumpsum real-return calculation does not model the timing of monthly contributions.',
  },
  {
    q: 'Can I use this calculator for gold, real estate or PPF?',
    a: 'Yes, if you enter a return for the same period and on a comparable basis. Include rental income and relevant costs when assessing property, and use a total-return measure for gold or market investments. PPF rates change by quarter, so verify the applicable rate from an official source before using it.',
  },
  {
    q: 'What inflation rate should I assume for retirement in India?',
    a: 'Use a planning assumption that reflects the retiree’s likely expenses, then test lower and higher scenarios. RBI’s 4% CPI target and 2% to 6% tolerance band are policy settings, not a promise about future inflation. Healthcare, housing and other personal costs may rise faster than headline CPI, so review assumptions as the goal approaches.',
  },
  {
    q: 'How much will Rs 1 crore be worth in 20 years at 6% inflation?',
    a: 'At 6% annual inflation, Rs 1 crore in 20 years would have purchasing power of about Rs 31.2 lakh in today’s money. The calculation is Rs 1 crore divided by 1.06 raised to 20. It assumes inflation stays constant each year; actual prices will move unevenly and may differ from this projection.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor provides financial calculators and tools that help people understand financial choices and take practical next steps. Its calculators are the discovery layer of a broader platform designed to connect users with suitable financial products and services.',
  },
] as const;
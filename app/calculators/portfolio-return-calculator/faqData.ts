export const PORTFOLIO_RETURN_FAQS = [
  {
    q: 'What is portfolio return?',
    a: 'Portfolio return is the blended rate of return across a group of investments. Each investment is weighted by its share of the total portfolio value.',
  },
  {
    q: 'How do I calculate weighted average portfolio return?',
    a: 'Divide each investment value by the total portfolio value, multiply that weight by its annual return, and add the results. For example, equal amounts earning 7% and 12% produce a weighted return of 9.5%.',
  },
  {
    q: 'What is the portfolio return formula?',
    a: 'Portfolio return equals the sum of each investment weight multiplied by its return rate: Rp = sum of (wi x ri). The weight is the investment value divided by total portfolio value.',
  },
  {
    q: 'What is a good portfolio return in India?',
    a: 'There is no single good return for every Indian investor. The right comparison depends on the assets held, the measurement period, inflation, taxes, risk and the goal the portfolio must fund.',
  },
  {
    q: 'How is portfolio return different from CAGR?',
    a: 'CAGR annualises the start and end values of one investment over a period. A weighted portfolio return combines the stated return rates of several assets using their current portfolio weights.',
  },
  {
    q: 'Should I use XIRR or weighted portfolio return for SIPs?',
    a: 'Use XIRR to measure returns when investments or withdrawals happened on different dates. Weighted portfolio return does not account for the timing of cash flows.',
  },
  {
    q: 'Does this portfolio calculator show future value?',
    a: 'No. It calculates a weighted annual return from the amounts and rates you enter. It does not project a future portfolio value or model deposits, withdrawals, fees or taxes.',
  },
  {
    q: 'How do I calculate stock portfolio return?',
    a: 'Enter each stock holding’s current value and return rate for the same period. The calculator weights each rate by the holding’s share of the total portfolio value.',
  },
  {
    q: 'How do I calculate portfolio return in Excel?',
    a: 'Use =SUMPRODUCT(amounts, returns)/SUM(amounts), with amounts and decimal-form return rates in matching rows. Format the result as a percentage.',
  },
  {
    q: 'Can portfolio return be higher than my best-performing investment?',
    a: 'No, not when all weights are non-negative and add to 100%. A weighted average stays between the lowest and highest return rates entered.',
  },
  {
    q: 'How do I calculate real return after inflation?',
    a: 'Use the exact formula: real return = (1 + nominal return) / (1 + inflation rate) - 1. For a 9.5% nominal return and 6% inflation, the result is about 3.3%.',
  },
  {
    q: 'Does this calculator show post-tax portfolio return?',
    a: 'No. The result is a pre-tax weighted return based on your inputs. Tax depends on the asset, account, holding period and rules in force, so check current official guidance or consult a tax professional.',
  },
  {
    q: 'How do I calculate portfolio return when I have SIPs?',
    a: 'Use XIRR for cash flows invested on different dates. You can enter that XIRR as an asset return here for a blended snapshot, but this calculator will not independently calculate the SIP cash flows.',
  },
  {
    q: 'Should I enter invested amount or current value?',
    a: 'Use current value when you want each asset’s present portfolio weight. Use invested amount only if your purpose is to weight returns by original cost rather than current allocation.',
  },
  {
    q: 'How often should I recalculate portfolio return?',
    a: 'Recalculate after a material deposit, withdrawal or allocation change, and during your regular portfolio review. Use the same measurement period for every asset.',
  },
  {
    q: 'Should dividends and interest be included in portfolio return?',
    a: 'Include total returns that account for income distributions as well as price changes when that is the measure you want to compare. Do not mix total returns for one asset with price-only returns for another.',
  },
  {
    q: 'Can NRIs use this investment portfolio calculator?',
    a: 'Yes. The calculator supports multiple display currencies. Currency conversion changes how amounts are displayed, not the return rates or the tax treatment that may apply to an NRI.',
  },
  {
    q: 'What if one investment has a negative return?',
    a: 'Enter a negative rate if the input allows it. Its weighted contribution will reduce the portfolio return in proportion to its share of the total value.',
  },
  {
    q: 'Is weighted average return the same as a simple average?',
    a: 'No. A simple average gives every return rate equal influence. A weighted average reflects the amount held in each asset.',
  },
  {
    q: 'What is asset allocation return?',
    a: 'It is the blended return implied by the portfolio’s asset weights and the return assumption or measured return for each asset class.',
  },
  {
    q: 'Does portfolio return measure portfolio risk?',
    a: 'No. Return is a rate of gain or loss, while risk describes uncertainty and possible variation in outcomes. This calculator does not measure volatility or downside risk.',
  },
  {
    q: 'Should I include my emergency fund in portfolio return?',
    a: 'Include it only if you want a return for all financial assets. For an investment-only view, keep emergency cash separate and label the scope clearly.',
  },
  {
    q: 'Should I include my home in the calculation?',
    a: 'Include property only when it belongs in the portfolio analysis you are doing. For an investment property, consider rental income, expenses, transaction costs and appreciation consistently.',
  },
  {
    q: 'What return should I enter for gold or real estate?',
    a: 'Use a return measured or assumed over the same period as the other holdings. For rented property, account for rental income and relevant costs rather than entering price appreciation alone.',
  },
  {
    q: 'What is the difference between portfolio ROI and portfolio return?',
    a: 'ROI often means total gain relative to cost over a stated period. Portfolio return can mean an annualised or weighted rate, so specify the period and method before comparing the figures.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is a financial platform built for India. Its calculators help people understand financial choices, while its broader platform is being built to connect eligibility, products and financial actions.',
  },
];
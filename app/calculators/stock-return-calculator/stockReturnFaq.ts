export const STOCK_RETURN_FAQS = [
  {
    q: 'How is stock return calculated?',
    a: 'Stock return is the gain or loss divided by the original investment, expressed as a percentage. With a purchase price of ₹500, a current price of ₹820 and ₹45 in dividends per share, price return is 64%, dividend return is 9%, and total return is 73%. For 100 shares, the total gain is ₹36,500 before costs and tax.',
  },
  {
    q: 'What is the difference between price return and total return for stocks?',
    a: 'Price return measures only the change in a share price, while total return also counts dividends received. A share bought for ₹500 and now worth ₹820 has a 64% price return. Add ₹45 of dividends per share and total return becomes 73%, before costs and tax. Total return is the better measure when comparing dividend-paying shares.',
  },
  {
    q: 'How do I calculate annualized return (CAGR) for stocks?',
    a: 'Calculate stock CAGR by raising the ratio of ending value to beginning value to the power of one divided by the number of years, then subtracting one. With ₹500 invested and a final value of ₹865 after five years, CAGR is (865/500)^(1/5) - 1, or about 11.59% a year. This assumes dividends are added at the end, not reinvested when paid.',
  },
  {
    q: 'What is a good stock return in India?',
    a: 'A good stock return should exceed inflation and compare favourably with an FD and a suitable equity benchmark over the same period, after allowing for risk and costs. There is no guaranteed target return for an individual share. Long-term equity expectations of 10% to 15% CAGR are planning assumptions, not promises; actual outcomes can be much lower or negative.',
  },
  {
    q: 'What is the CAGR of Nifty 50 including dividends?',
    a: 'Use the Nifty 50 Total Return Index (TRI) to measure index performance including reinvested dividends. The price index excludes dividends, so it will not represent the full return. The latest 10-year and 20-year figures change with the measurement date; verify the relevant period in the latest NSE Indices factsheet instead of relying on an undated figure.',
  },
  {
    q: 'What is total shareholder return (TSR)?',
    a: 'Total shareholder return combines share-price change and dividends over a holding period. The simple formula is (ending price - beginning price + dividends received) / beginning price. Companies and investors use TSR to describe the value delivered to shareholders. It does not automatically include dividend reinvestment, taxes, brokerage or the timing of interim cash flows.',
  },
  {
    q: 'What is holding period return (HPR) for stocks?',
    a: 'Holding period return is the total gain or loss over the full period, without annualising it. In an illustrative Bajaj Finance example, 30 shares bought at ₹4,000, sold at ₹5,200, and paid ₹30 each in dividends produce a 30.75% HPR. Over two years, the equivalent CAGR is (1.3075)^(1/2) - 1, or 14.35% a year.',
  },
  {
    q: 'How do I calculate dividend-adjusted return?',
    a: 'Dividend-adjusted return adds all dividends per share received to the ending share price before measuring the gain against the purchase price. The formula is ((ending price + dividends - purchase price) / purchase price) × 100. For ₹500, ₹820 and ₹45 in dividends, the result is 73%. This simple method does not model when dividends were paid or reinvested.',
  },
  {
    q: 'What is the difference between arithmetic and geometric average return for stocks?',
    a: 'The arithmetic average is the sum of yearly returns divided by the number of years; the geometric average accounts for compounding. For returns of +50%, -30% and +20%, the arithmetic average is 13.33%, while CAGR is (1.5 × 0.7 × 1.2)^(1/3) - 1, or 8.01%. CAGR better describes the growth rate of money across the full period.',
  },
  {
    q: 'How do I calculate annualized stock return?',
    a: 'First calculate total return, then convert it to a yearly rate with CAGR: (1 + total return)^(1 / years) - 1. For a 73% total return over five years, annualised return is (1.73)^(1/5) - 1, or about 11.59%. Enter the purchase price, current price, dividends and holding period, then select the Annualized Return tab above.',
  },
  {
    q: 'What tools are used for stock return calculation in India?',
    a: 'Investors can use this calculator for price return, total return and CAGR, broker statements for realised holdings, and spreadsheets for dated cash flows. Excel and Google Sheets support XIRR for irregular purchases and dividend dates. NSE and BSE publish corporate-action and market information; verify adjusted prices and dividend history against official records before using a result.',
  },
  {
    q: 'Are stock returns taxable in India?',
    a: 'Yes. For listed equity shares where STT conditions are met, short-term gains on holdings of 12 months or less are generally taxed at 20%; long-term gains after 12 months are generally taxed at 12.5% above the ₹1.25 lakh annual exemption. Dividends are taxed at the investor’s slab rate, and cess may apply. Rules can change, so check current Income Tax Department guidance or consult a CA.',
  },
  {
    q: 'What is the difference between stock return and mutual fund return?',
    a: 'A stock return belongs to one company’s share and includes its price change and dividends. A mutual fund return reflects changes in the scheme’s NAV, after fund expenses, across a diversified portfolio. Compare funds with an appropriate benchmark and period; use a total-return benchmark when dividends matter. A fund’s past return does not predict what it will earn next.',
  },
  {
    q: 'How does a stock split affect return calculation?',
    a: 'A stock split changes the share count and per-share price but does not create a gain by itself. After a 1:5 split, 100 shares bought at ₹1,000 become 500 shares with an adjusted cost of ₹200 each. Use split-adjusted prices and quantities on both dates. Include dividends on a consistent per-share basis and account separately for costs and taxes.',
  },
  {
    q: 'What is the return on Infosys stock over the last 5 years?',
    a: 'The five-year Infosys return depends on the exact start and end dates, corporate actions, dividends and whether dividends are reinvested. No live return figure is stated here. For a defensible calculation, use split-adjusted historical prices and the company’s dividend announcements for the chosen dates, then enter those inputs above. The calculator’s ₹500, ₹820 and ₹45 example is hypothetical, not Infosys performance data.',
  },
  {
    q: 'What is Fermor?',
    a: 'Fermor is an Indian financial product platform that starts with practical tools for decisions about money and connects users with relevant financial products and services. Its calculators are free to use, and a free account lets users save results. Fermor is not a stockbroker or investment adviser, and calculator results are not a recommendation to buy or sell securities.',
  },
  {
    q: 'How do I calculate stock return in Excel?',
    a: 'For a simple weighted-free holding return, enter purchase price in A2, current price in B2 and total dividends per share in C2, then use =((B2+C2-A2)/A2). Format the result as a percentage. For multiple dated buys, sells and dividends, use Excel’s XIRR with cash flows and dates; a single CAGR formula cannot account for their timing.',
  },
] as const;

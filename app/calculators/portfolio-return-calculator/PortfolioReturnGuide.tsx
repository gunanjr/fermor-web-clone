import Link from 'next/link';

const C = {
  dark: '#101214',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  border: '#e3e6e8',
};

const p: React.CSSProperties = { fontSize: 15, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px' };
const h2: React.CSSProperties = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' };
const h3: React.CSSProperties = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '18px 0 8px' };
const th: React.CSSProperties = { padding: '10px 14px', fontSize: 13, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', borderBottom: `1px solid ${C.border}`, whiteSpace: 'nowrap' };
const td: React.CSSProperties = { padding: '10px 14px', fontSize: 13, color: C.ink2, borderBottom: `1px solid ${C.border}`, verticalAlign: 'top' };
const table: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 };
const sec: React.CSSProperties = { margin: '0 0 40px' };

function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={table}>
        <thead><tr>{headers.map(header => <th key={header} scope="col" style={th}>{header}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, index) => <tr key={`${row[0]}-${index}`}>
            {row.map((cell, cellIndex) => <td key={cellIndex} style={cellIndex === 0 ? { ...td, fontWeight: 600, color: C.ink } : td}>{cell}</td>)}
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return <section style={sec}><h2 id={id} style={h2}>{title}</h2><p style={p}>{intro}</p>{children}</section>;
}

function PromoBar({ href, name, blurb }: { href: string; name: string; blurb: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '16px 18px', margin: '0 0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
      <div><p style={{ fontSize: 14, fontWeight: 700, color: C.dark, margin: '0 0 4px' }}>{name}</p><p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>{blurb}</p></div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 600, padding: '9px 16px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap' }}>Open calculator</Link>
    </div>
  );
}

export default function PortfolioReturnGuide({ mobile }: { mobile: boolean }) {
  const linkStyle: React.CSSProperties = { color: C.dark, fontWeight: 600 };
  const calculatorCards = [
    ['/calculators/cagr-calculator', 'CAGR Calculator', 'Annualise a single investment from start to end.'],
    ['/calculators/xirr-calculator', 'XIRR Calculator', 'Measure SIPs and irregular dated cash flows.'],
    ['/calculators/sip-calculator', 'SIP Calculator', 'Estimate the value of monthly investments.'],
    ['/calculators/lumpsum-calculator', 'Lumpsum Calculator', 'Model a one-time investment over time.'],
    ['/calculators/fd-calculator', 'FD Calculator', 'Estimate fixed deposit maturity value.'],
    ['/calculators/ppf-calculator', 'PPF Calculator', 'Model PPF contributions and maturity.'],
    ['/calculators/epf-calculator', 'EPF Calculator', 'Estimate provident fund accumulation.'],
    ['/calculators/inflation-calculator', 'Inflation Calculator', 'Compare purchasing power across years.'],
    ['/calculators/income-tax-calculator', 'Income Tax Calculator', 'Compare income tax under the available regimes.'],
  ];

  return (
    <>
      <nav aria-label="On this page" style={{ margin: '0 0 28px', padding: '16px 18px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.white }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, margin: '0 0 10px' }}>On this page</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 16px' }}>
          {[
            ['quick-answer', 'Quick answer'], ['portfolio-formula', 'Formula'], ['worked-examples', 'Worked examples'],
            ['allocation-sensitivity', 'Allocation impact'], ['future-value-examples', 'Compounding'], ['real-and-tax-return', 'Inflation and tax'],
            ['return-methods', 'Return methods'], ['weighted-return-limitations', 'Limitations'], ['rebalancing', 'Rebalancing'],
            ['benchmarks', 'Benchmarks'], ['related-calculators', 'Related calculators'], ['faq', 'FAQs'],
          ].map(([id, label]) => <a key={id} href={`#${id}`} style={{ fontSize: 13, color: C.dark, textDecoration: 'underline', textUnderlineOffset: 3 }}>{label}</a>)}
        </div>
      </nav>

      <Section id="quick-answer" title="Portfolio Return Calculator: Quick Answer" intro="Portfolio return is the sum of each investment weight multiplied by its return rate.">
        <p style={{ ...p, margin: 0 }}>For example, equal values in an FD earning an assumed 7% and a mutual fund earning an assumed 12% produce a weighted return of 9.5% before fees, taxes and inflation.</p>
      </Section>

      <Section id="portfolio-formula" title="Portfolio Return Formula and Variables" intro="The weighted average method accounts for both the size of each holding and its return rate.">
        <div style={{ overflowX: 'auto', marginBottom: 14 }}>
          <table style={table}>
            <thead><tr><th scope="col" style={th}>Symbol</th><th scope="col" style={th}>Meaning</th><th scope="col" style={th}>Example</th></tr></thead>
            <tbody>
              <tr><td style={{ ...td, fontWeight: 700, color: C.ink }}>wi</td><td style={td}>Value of investment i divided by total portfolio value</td><td style={td}>0.50</td></tr>
              <tr><td style={{ ...td, fontWeight: 700, color: C.ink }}>ri</td><td style={td}>Annual return rate entered for investment i</td><td style={td}>12%</td></tr>
              <tr><td style={{ ...td, fontWeight: 700, color: C.ink }}>Rp</td><td style={td}>Weighted portfolio return</td><td style={td}>9.5%</td></tr>
            </tbody>
          </table>
        </div>
        <p style={p}><code>Rp = sum (wi x ri)</code>. Each asset&apos;s contribution percentage is its weighted return contribution divided by the total portfolio return.</p>
        <p style={{ ...p, margin: 0 }}>With non-negative weights that add to 100%, a weighted average cannot exceed the highest input rate or fall below the lowest.</p>
      </Section>

      <Section id="worked-examples" title="Three Portfolio Return Examples" intro="These Rs 10 lakh examples show the arithmetic using assumed annual returns, not forecasts or current market offers.">
        <h3 style={h3}>Conservative illustration</h3>
        <DataTable headers={['Asset', 'Amount', 'Weight', 'Return', 'Contribution']} rows={[
          ['FD', 'Rs 4,00,000', '40%', '7.0%', '2.80%'], ['Debt mutual fund', 'Rs 2,00,000', '20%', '7.5%', '1.50%'],
          ['Equity mutual fund', 'Rs 3,00,000', '30%', '12.0%', '3.60%'], ['Gold', 'Rs 1,00,000', '10%', '9.0%', '0.90%'],
          ['Portfolio', 'Rs 10,00,000', '100%', '', '8.80%'],
        ]} />
        <h3 style={h3}>Balanced illustration</h3>
        <DataTable headers={['Asset', 'Amount', 'Weight', 'Return', 'Contribution']} rows={[
          ['Equity mutual funds', 'Rs 4,00,000', '40%', '12.0%', '4.80%'], ['EPF', 'Rs 2,00,000', '20%', '8.25%', '1.65%'],
          ['PPF', 'Rs 1,50,000', '15%', '7.1%', '1.07%'], ['FD', 'Rs 1,50,000', '15%', '7.0%', '1.05%'],
          ['Gold', 'Rs 1,00,000', '10%', '9.0%', '0.90%'], ['Portfolio', 'Rs 10,00,000', '100%', '', '9.47%'],
        ]} />
        <h3 style={h3}>Equity-heavy illustration</h3>
        <DataTable headers={['Asset', 'Amount', 'Weight', 'Return', 'Contribution']} rows={[
          ['Direct stocks', 'Rs 3,00,000', '30%', '14.0%', '4.20%'], ['Equity mutual funds', 'Rs 4,00,000', '40%', '12.0%', '4.80%'],
          ['Real estate', 'Rs 1,00,000', '10%', '8.0%', '0.80%'], ['Gold', 'Rs 1,00,000', '10%', '9.0%', '0.90%'],
          ['PPF', 'Rs 1,00,000', '10%', '7.1%', '0.71%'], ['Portfolio', 'Rs 10,00,000', '100%', '', '11.41%'],
        ]} />
        <p style={{ ...p, margin: 0 }}>In the equity-heavy example, stocks and equity funds form 70% of the value and contribute about 79% of the weighted return. That is a concentration observation, not an allocation recommendation.</p>
      </Section>

      <Section id="allocation-sensitivity" title="How Asset Allocation Changes Blended Return" intro="With an assumed FD return of 7% and equity return of 12%, each 10-point shift from FD to equity raises the weighted result by 0.5 percentage points.">
        <DataTable headers={['Equity share', 'FD share', 'Portfolio return']} rows={[
          ['20%', '80%', '8.0%'], ['40%', '60%', '9.0%'], ['50%', '50%', '9.5%'], ['60%', '40%', '10.0%'], ['80%', '20%', '11.0%'],
        ]} />
        <p style={{ ...p, margin: 0 }}>The table isolates return arithmetic. It does not show volatility, possible losses or whether an allocation suits a particular goal.</p>
      </Section>

      <Section id="future-value-examples" title="What Rs 10 Lakh Could Become" intro="These compound-growth examples assume one initial investment, annual compounding, no later deposits or withdrawals, and no tax.">
        <DataTable headers={['Annual return assumption', 'After 10 years', 'After 20 years', 'Rule of 72 estimate']} rows={[
          ['7.0%', 'Rs 19.7 lakh', 'Rs 38.7 lakh', '10.3 years'], ['9.5%', 'Rs 24.8 lakh', 'Rs 61.4 lakh', '7.6 years'], ['12.0%', 'Rs 31.1 lakh', 'Rs 96.5 lakh', '6 years'],
        ]} />
        <p style={{ ...p, margin: 0 }}>At these assumptions, 7% versus 9.5% produces a difference of about Rs 22.7 lakh after 20 years. This calculator reports a weighted return, not future value.</p>
      </Section>

      <Section id="real-and-tax-return" title="Nominal, Real and Post-Tax Portfolio Return" intro="A nominal return does not account for inflation or tax, so it can differ from the gain in purchasing power or the amount retained after tax.">
        <h3 style={h3}>Real return after inflation</h3>
        <p style={p}>Use: real return = ((1 + nominal return) / (1 + inflation)) - 1. A 9.5% nominal return and 6% inflation give about 3.3% real return.</p>
        <h3 style={h3}>Tax treatment depends on the asset and current rules</h3>
        <p style={p}>The table is a prompt for what to verify, not tax advice or a complete statement of current law.</p>
        <DataTable headers={['Asset', 'What to check']} rows={[
          ['FD interest', 'Tax reporting and applicable slab treatment for your circumstances.'],
          ['Listed equity and equity funds', 'Holding period, transaction type and current capital-gains provisions.'],
          ['Debt funds', 'Acquisition date and applicable tax provisions.'],
          ['Gold and property', 'Asset type, holding period, cost basis and transaction details.'],
          ['PPF and EPF', 'Current scheme rules and contribution limits.'],
          ['NPS', 'Conditions for deductions, withdrawals and annuity treatment.'],
        ]} />
        <p style={{ ...p, margin: 0 }}>Check the <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Department</a>, <a href="https://www.epfo.gov.in/" target="_blank" rel="noopener noreferrer" style={linkStyle}>EPFO</a>, <a href="https://www.nsiindia.gov.in/" target="_blank" rel="noopener noreferrer" style={linkStyle}>National Savings Institute</a>, <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={linkStyle}>RBI</a> and <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer" style={linkStyle}>SEBI</a> for current information.</p>
      </Section>

      <Section id="return-methods" title="Portfolio Return vs CAGR, XIRR and Absolute Return" intro="Use a return measure that matches the number of assets and the timing of the cash flows.">
        <DataTable headers={['Measure', 'Best suited to', 'Multiple assets?', 'Cash-flow timing?']} rows={[
          ['Absolute return', 'Total gain over a period', 'Not by itself', 'No'], ['CAGR', 'One lump sum from start to end', 'No', 'No'],
          ['XIRR', 'SIPs and irregular dated cash flows', 'As one cash-flow series', 'Yes'], ['Weighted portfolio return', 'Blended snapshot of holdings', 'Yes', 'No'],
        ]} />
        <p style={p}>Use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>CAGR Calculator</Link> for a lump sum and the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>XIRR Calculator</Link> for dated contributions. Use this calculator for a weighted snapshot.</p>
        <PromoBar href="/calculators/xirr-calculator" name="Measuring SIP or irregular investment returns?" blurb="XIRR accounts for the dates and amounts of cash flows." />
      </Section>

      <Section id="weighted-return-limitations" title="Limitations of the Weighted Average Method" intro="A weighted average is useful for comparing a snapshot, but it does not reconstruct how your money moved over time.">
        <ul style={{ ...p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}>Weights drift as prices and balances change, so the result can shift even when no new money is added.</li>
          <li style={{ marginBottom: 8 }}>Deposits and withdrawals are not timed. Use XIRR when cash-flow dates affect the result.</li>
          <li style={{ marginBottom: 8 }}>Return periods must match. Avoid mixing a one-year stock return with a five-year fund return without stating the difference.</li>
          <li style={{ marginBottom: 8 }}>An expected return is an assumption, not a promise. Equity outcomes vary from year to year.</li>
          <li style={{ marginBottom: 8 }}>This result does not measure volatility, liquidity, concentration risk or suitability.</li>
          <li>For property, account consistently for rent, costs, taxes and transaction expenses as well as changes in price.</li>
        </ul>
      </Section>

      <Section id="illustrative-allocations" title="Sample Asset Mixes for Illustration" intro="These examples demonstrate the arithmetic at different equity weights; they are not advice by age or life stage.">
        <DataTable headers={['Example only', 'Equity', 'Debt', 'Gold', 'Assumed return']} rows={[
          ['Early career', '75%', '15%', '10%', '11.0%'], ['Mid-career', '55%', '35%', '10%', '10.0%'],
          ['Capital preservation focus', '35%', '55%', '10%', '9.0%'], ['Retirement income focus', '20%', '75%', '5%', '8.1%'],
        ]} />
        <p style={{ ...p, margin: 0 }}>For arithmetic only, these rows assume 12% for equity, 7% for debt and 9% for gold. Actual outcomes vary, and a suitable allocation depends on goals, time horizon and capacity for loss.</p>
      </Section>

      <Section id="portfolio-mistakes" title="Common Portfolio Return Calculation Mistakes" intro="Input mismatches can make a blended figure look more precise than the information behind it.">
        <ul style={{ ...p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}>Using purchase cost instead of current value when measuring today&apos;s allocation.</li>
          <li style={{ marginBottom: 8 }}>Leaving out EPF, PPF or NPS when measuring the whole investment portfolio.</li>
          <li style={{ marginBottom: 8 }}>Mixing pre-tax and post-tax rates, or returns from different periods.</li>
          <li style={{ marginBottom: 8 }}>Treating a strong one-year equity return as a long-term assumption.</li>
          <li style={{ marginBottom: 8 }}>Ignoring fund expenses, brokerage or property costs excluded from the return data.</li>
          <li style={{ marginBottom: 8 }}>Including a self-occupied home without deciding whether personal-use assets belong in the analysis.</li>
          <li>Not reviewing allocation drift after a major market move or contribution.</li>
        </ul>
      </Section>

      <Section id="rebalancing" title="Rebalancing and Return Drift" intro="Rebalancing restores target weights after prices move, while changing weights also alter the portfolio's blended return.">
        <p style={p}>Start with Rs 5 lakh in an FD at an assumed 7% and Rs 5 lakh in a fund at an assumed 12%. The initial weighted return is 9.5%; after one year, the illustrative values are Rs 5.35 lakh and Rs 5.60 lakh, changing the weights to about 48.9% and 51.1%.</p>
        <p style={p}>Common review methods include a regular calendar check, a threshold for how far an allocation can drift, or directing new contributions to underweight assets. Each method has different tax, cost and risk effects.</p>
        <ul style={{ ...p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}><strong>Calendar review:</strong> check the mix at a regular interval.</li>
          <li style={{ marginBottom: 8 }}><strong>Threshold review:</strong> review after a holding moves beyond a chosen allocation band.</li>
          <li><strong>Cash-flow review:</strong> direct new money toward underweight assets before selling.</li>
        </ul>
      </Section>

      <Section id="benchmarks" title="Benchmarks for Portfolio Return" intro="Compare a portfolio with a benchmark that reflects its asset mix and covers the same dates.">
        <DataTable headers={['Portfolio exposure', 'Possible comparison']} rows={[
          ['Indian equity-heavy', 'Nifty 50 TRI or Nifty 500 TRI'], ['Balanced equity and debt', 'A relevant CRISIL hybrid index'],
          ['Debt-heavy', 'A suitable CRISIL debt index or deposit rate'], ['Gold allocation', 'Domestic gold price series for the same period'],
        ]} />
        <p style={{ ...p, margin: 0 }}>For equity, use a Total Return Index where possible because it includes dividends. Confirm each benchmark&apos;s methodology before comparing performance.</p>
      </Section>

      <Section id="portfolio-return-steps" title="How to Calculate Portfolio Return: Four Steps" intro="A manual weighted-return calculation needs each holding's value and a comparable return rate.">
        <ol style={{ ...p, paddingLeft: 22 }}>
          <li style={{ marginBottom: 8 }}>List the holdings and decide whether to weight by current value or original investment.</li>
          <li style={{ marginBottom: 8 }}>Enter an annual return rate for each asset using the same period and return basis.</li>
          <li style={{ marginBottom: 8 }}>Divide each amount by the total to find its portfolio weight.</li>
          <li>Multiply each weight by its rate and add the contributions.</li>
        </ol>
        <p style={{ ...p, margin: 0 }}>The calculator performs these steps and lets you change amounts to compare hypothetical allocations.</p>
      </Section>

      <section style={sec}>
        <h2 id="related-calculators" style={h2}>Related Investment Calculators</h2>
        <p style={p}>Choose a tool based on the calculation you need.</p>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 10 }}>
          {calculatorCards.map(([href, name, detail]) => <Link key={name} href={href} target="_blank" rel="noopener noreferrer" style={{ padding: '14px 16px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.white, textDecoration: 'none' }}><span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{name}</span><span style={{ display: 'block', fontSize: 12.5, color: C.ink2 }}>{detail}</span></Link>)}
        </div>
      </section>

      <section style={{ ...sec, marginBottom: 44 }}>
      </section>
    </>
  );
}
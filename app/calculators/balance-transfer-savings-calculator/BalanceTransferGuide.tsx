import Link from 'next/link';

const C = {
  dark: '#101214',
  lime: '#a6dbc4',
  ink: '#16140F',
  ink2: '#50565c',
  ink3: '#7a8087',
  white: '#ffffff',
  border: '#e3e6e8',
};

const sectionStyle = { margin: '0 0 44px' } as const;
const headingStyle = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as const;
const paragraphStyle = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as const;
const headerCellStyle = {
  padding: '9px 14px',
  fontSize: 12,
  fontWeight: 700,
  color: C.ink,
  background: '#f4f5f6',
  textAlign: 'left' as const,
  border: `1px solid ${C.border}`,
  whiteSpace: 'nowrap' as const,
};
const bodyCellStyle = {
  padding: '10px 14px',
  fontSize: 13.5,
  color: C.ink2,
  border: `1px solid ${C.border}`,
  verticalAlign: 'top' as const,
};

type GuideTableProps = {
  caption: string;
  headers: string[];
  rows: string[][];
};

function GuideTable({ caption, headers, rows }: GuideTableProps) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16, WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
        <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' }}>
          {caption}
        </caption>
        <thead>
          <tr>{headers.map(header => <th key={header} scope="col" style={headerCellStyle}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row[0]} style={{ borderBottom: `1px solid ${C.border}` }}>
              {row.map((cell, index) => <td key={`${row[0]}-${index}`} style={index === 0 ? { ...bodyCellStyle, fontWeight: 600, color: C.ink } : bodyCellStyle}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const inlineLinkStyle = { color: C.dark, fontWeight: 600 } as const;

export function BalanceTransferGuide() {
  return (
    <>
      <section style={sectionStyle}>
        <h2 style={headingStyle} id="worked-example">Worked Example: ₹50 Lakh Home Loan Transfer from 9.50% to 8.00%</h2>
        <p style={paragraphStyle}>With the same ₹50 lakh balance and 15-year tenure, the lower rate reduces the EMI and total interest in this illustrative calculation.</p>
        <GuideTable
          caption="Illustrative home loan comparison. Both options use a ₹50 lakh balance and 15-year remaining tenure."
          headers={['Item', 'Current loan at 9.50%', 'After transfer at 8.00%']}
          rows={[
            ['Outstanding balance', '₹50,00,000', '₹50,00,000'],
            ['Remaining tenure', '15 years', '15 years'],
            ['Monthly EMI', '₹52,211', '₹47,783'],
            ['Total interest', '₹43,98,022', '₹36,00,869'],
          ]}
        />
        <ul style={{ margin: '0 0 16px', paddingLeft: 22, listStyleType: 'disc' }}>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Gross interest saved: ₹7,97,153, about 18% of the current loan interest.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Processing fee at 0.50%: ₹25,000. GST at 18%: ₹4,500. Total fee: ₹29,500.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Net savings after the processing fee and GST: ₹7,67,653.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Monthly EMI reduction: about ₹4,429. Break-even: ₹29,500 divided by ₹4,429, or about 6.7 months.</li>
        </ul>
        <p style={{ ...paragraphStyle, margin: 0 }}>Under these assumptions, the processing fee is recovered in about 7 months. This estimate excludes legal, valuation, mortgage documentation, insurance and foreclosure charges.</p>
        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginTop: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Home Loan Calculator</p>
            <p style={{ fontSize: 13, color: C.ink2, margin: 0 }}>Compare the repayment schedule at a different rate or tenure.</p>
          </div>
          <Link className="fx-btn" href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
        </div>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="balance-transfer-formula">Balance Transfer Formula</h2>
        <p style={paragraphStyle}>The calculator compares reducing-balance EMIs over the same remaining tenure, then subtracts the processing fee and entered GST from estimated interest savings.</p>
        <pre style={{ overflowX: 'auto', padding: '16px 18px', margin: '0 0 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, color: C.ink, fontSize: 13, lineHeight: 1.8, whiteSpace: 'pre-wrap' }}><code>{`EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
r = annual interest rate / 12 / 100
n = remaining tenure in months
Total interest = (EMI × n) - P
Interest saved = current total interest - new total interest
Fee including GST = P × fee percentage × (1 + GST rate / 100)
Net savings = interest saved - fee including GST
Break-even months = fee including GST / monthly EMI savings`}</code></pre>
        <p style={{ ...paragraphStyle, margin: 0 }}>Here, P is the outstanding principal. The formula assumes the same tenure for both loans and a fixed rate throughout the comparison. Floating rates can change, and the calculator does not include other transfer costs or prepayment penalties.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="break-even-guide">Break-Even Period: How to Read It</h2>
        <p style={paragraphStyle}>Break-even estimates how long the monthly EMI reduction takes to recover the processing fee and its GST.</p>
        <p style={paragraphStyle}>Compare that period with both the remaining tenure and the time you expect to keep the loan. A planned sale or large prepayment can change whether the transfer pays off.</p>
        <GuideTable
          caption="Illustrative break-even guide, not a lender rule."
          headers={['Break-even period', 'How to assess it']}
          rows={[
            ['Under 12 months', 'A shorter recovery period can be favourable if you will keep the loan beyond break-even and all costs are counted.'],
            ['12 to 24 months', 'Compare the recovery period with your expected time in the loan and any planned prepayment.'],
            ['More than half the remaining tenure', 'There may be little time left to benefit after recovering the fee. Recheck the full repayment totals.'],
          ]}
        />
        <p style={{ ...paragraphStyle, margin: 0 }}>A break-even result is only as complete as the costs entered. Add other lender charges to your own comparison before deciding.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="transfer-process">Step-by-Step: How to Do a Balance Transfer</h2>
        <p style={paragraphStyle}>A transfer starts with a written comparison and ends with a checked repayment schedule.</p>
        <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Get your current loan details:</strong> confirm the current rate, outstanding balance, repayment schedule and foreclosure terms.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Compare written offers:</strong> enter the proposed rate and fee here, and check benchmark and spread reset clauses.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Ask your current lender about a rate reduction:</strong> compare its revised terms and fee before applying to another lender.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Apply with the new lender:</strong> submit the documents it requests for identity, income, loan and property checks.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Review the sanction letter:</strong> check the approved rate, tenure, charges and any legal or technical valuation requirements.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Coordinate settlement:</strong> get the foreclosure statement from your current lender and confirm how the new lender will pay the balance.</li>
          <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Close the old account:</strong> collect the applicable no-dues confirmation and original property documents, then verify the new loan schedule.</li>
        </ol>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="current-lender-rate-reset">Should You Ask Your Current Bank to Reduce the Rate Instead?</h2>
        <p style={paragraphStyle}>Ask your current lender whether it offers a rate-conversion or reset option before starting a full transfer.</p>
        <p style={{ ...paragraphStyle, margin: 0 }}>A reset may involve less paperwork than moving the loan, but the fee varies by lender. Compare the revised rate, reset fee and remaining repayment schedule with the new lender's complete written offer.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="transfer-costs">Hidden Costs and Things to Check Before You Transfer</h2>
        <p style={paragraphStyle}>Request a written list of every charge because the displayed calculator result includes only the processing fee and its GST.</p>
        <ul style={{ margin: 0, paddingLeft: 22, listStyleType: 'disc' }}>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Processing fee and applicable GST.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Legal review and property valuation charges.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Stamp duty or registration costs on new mortgage documents, where applicable.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Any prepayment charge under the current loan terms and applicable RBI directions.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>A promotional rate that may reset, plus the benchmark and spread used afterward.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Insurance changes or re-issuance costs connected with the loan.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Credit-report enquiries made during the application process.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="loan-types">Balance Transfer for Different Loan Types</h2>
        <p style={paragraphStyle}>The comparison changes by loan type because repayment terms, fees and prepayment conditions differ.</p>
        <h3 style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' }}>Home loan</h3>
        <p style={paragraphStyle}>Compare the same outstanding balance and remaining tenure, then include property, legal and mortgage-document costs from the lender's quote. The <Link href="/calculators/home-loan-calculator" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>Home Loan Calculator</Link> can help compare EMI scenarios, while the <Link href="/calculators/home-loan-eligibility-calculator" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>Home Loan Eligibility Calculator</Link> estimates borrowing eligibility.</p>
        <h3 style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' }}>Personal loan</h3>
        <p style={paragraphStyle}>Check the existing agreement for foreclosure conditions and compare the new loan's total repayment, not only its EMI. The <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>EMI Calculator</Link> can compare the proposed schedule.</p>
        <h3 style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' }}>Credit card</h3>
        <p style={{ ...paragraphStyle, margin: 0 }}>Check the transfer offer's fee, promotional terms and rate after the offer period, then confirm the repayment deadline with the issuer. The <Link href="/calculators/credit-card-emi-calculator" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>Credit Card EMI Calculator</Link> helps compare instalment costs.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="tax-benefits">Tax Benefits After a Home Loan Balance Transfer</h2>
        <p style={paragraphStyle}>A transfer does not by itself determine whether home-loan deductions remain available.</p>
        <p style={paragraphStyle}>Interest under Section 24(b) and principal repayment under Section 80C may qualify subject to the loan purpose, property use, documentation and applicable tax regime. Review current conditions on the <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>Income Tax Department website</a>, and verify your case with a CA.</p>
        <p style={{ ...paragraphStyle, margin: 0 }}>The <Link href="/calculators/tax-saving-calculator" target="_blank" rel="noopener noreferrer" style={inlineLinkStyle}>Tax Saving Calculator</Link> can help review eligible deductions. Tax rules change, so verify the current rules before relying on an estimate.</p>
      </section>

      <section style={sectionStyle}>
        <h2 style={headingStyle} id="common-mistakes">Common Balance Transfer Mistakes to Avoid</h2>
        <p style={paragraphStyle}>A lower quoted EMI does not prove that a transfer reduces your total cost.</p>
        <ul style={{ margin: 0, paddingLeft: 22, listStyleType: 'disc' }}>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Comparing EMI alone and ignoring processing fees, GST and other costs.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Using the original loan amount instead of the current outstanding balance.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Overlooking a reset clause, benchmark or rate spread in the new offer.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Transferring close to the end of the loan without checking the break-even period.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Accepting a longer tenure because the EMI is lower, without comparing total interest.</li>
          <li style={{ ...paragraphStyle, marginBottom: 8 }}>Applying elsewhere before asking the current lender about a rate reset.</li>
        </ul>
      </section>

    </>
  );
}

export function RelatedBalanceTransferCalculators() {
  const calculators = [
    { href: '/calculators/home-loan-calculator', label: 'Home Loan Calculator', detail: 'Compare EMI and repayment totals.' },
    { href: '/calculators/home-loan-eligibility-calculator', label: 'Home Loan Eligibility Calculator', detail: 'Estimate borrowing eligibility.' },
    { href: '/calculators/emi-calculator', label: 'EMI Calculator', detail: 'Check a proposed loan schedule.' },
    { href: '/calculators/credit-card-emi-calculator', label: 'Credit Card EMI Calculator', detail: 'Compare card instalment costs.' },
    { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator', detail: 'Review potential tax deductions.' },
  ];

  return (
    <section style={{ margin: '0 0 36px' }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }} id="related-calculators">Related Calculators</h2>
      <p style={paragraphStyle}>Use these tools to compare loan costs and related tax questions.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 10 }}>
        {calculators.map(({ href, label, detail }) => (
          <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', background: C.white, textDecoration: 'none' }}>
            <span style={{ display: 'block', color: C.dark, fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{label}</span>
            <span style={{ color: C.ink2, fontSize: 12.5, lineHeight: 1.6 }}>{detail}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

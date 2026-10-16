'use client';

import { PageNav } from '../../../src/components/common/PageNav';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { useCurrency } from '../../../src/hooks/useCurrency';
import {
  C, INTER, Slider, SplitDonut, StackedBars, Legend, SplitBar, StatRow, ResultBox,
  CollapsibleSchedule, SidebarList, StickySidebar, PromoBar, FAQAccordion, tableStyles,
  type FaqItem, type NavItem,
} from '../../../src/components/calculators/CalcUi';
import { calcNewRegime, type Residency } from './newRegimeMath';

const defaultSettings = {
  residency: 'resident' as Residency,
  salary: 1200000,
  basicPct: 50,
  employerNps: 0,
  otherIncome: 0,
  taxesPaid: 0,
};

const POPULAR: NavItem[] = [
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/hra-calculator',                   label: 'HRA Calculator' },
  { href: '/calculators/nps-calculator',                   label: 'NPS Calculator' },
  { href: '/calculators/surcharge-calculator',             label: 'Surcharge Calculator' },
  { href: '/calculators/capital-gains-calculator',         label: 'Capital Gains Calculator' },
];
const MORE: NavItem[] = [
  { href: '/calculators/tds-calculator',              label: 'TDS Calculator' },
  { href: '/calculators/professional-tax-calculator', label: 'Professional Tax Calculator' },
  { href: '/tax',                                     label: 'Income Tax by Salary' },
  { href: '/blogs/section-87a-rebate',                label: 'Section 87A Rebate Guide' },
  { href: '/blogs/section-115bac-new-tax-regime',     label: 'Section 115BAC Guide' },
];

export default function NewTaxRegimeClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { settings, updateSettings } = useCalculatorSettings('new-tax-regime-v2', defaultSettings);
  const { selectedCurrency, convertCurrency, rates } = useCurrency();
  const { residency, salary, basicPct, employerNps, otherIncome, taxesPaid } = settings;

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Amounts are typed in the selected currency, so the selector changes the symbol only and never converts.
  const sym = selectedCurrency?.symbol || '₹';
  const isInr = (selectedCurrency?.code || 'INR') === 'INR';
  const selectedCurrencyRate = isInr ? 1 : rates?.rates[selectedCurrency.code];
  const toInr = (amount: number) => selectedCurrencyRate && selectedCurrencyRate > 0 ? amount / selectedCurrencyRate : amount;
  const locale = isInr ? 'en-IN' : 'en-US';
  const money0 = (n: number) => `${n < 0 ? '-' : ''}${sym}${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.abs(n))}`;
  const moneyShort = (n: number) => {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (isInr && abs >= 1e7) return `${sign}${sym}${(abs / 1e7).toFixed(2)} Cr`;
    if (isInr && abs >= 1e5) return `${sign}${sym}${(abs / 1e5).toFixed(2)} L`;
    return money0(n);
  };
  const moneyInr0 = (amount: number) => money0(convertCurrency(amount));
  const moneyInrShort = (amount: number) => moneyShort(convertCurrency(amount));
  const pct = (n: number) => `${n.toFixed(2)}%`;

  const r = useMemo(
    () => calcNewRegime({
      salary: toInr(salary),
      basicShare: basicPct / 100,
      employerNps: toInr(employerNps),
      otherIncome: toInr(otherIncome),
      taxesPaid: toInr(taxesPaid),
      residency,
    }),
    [salary, basicPct, employerNps, otherIncome, taxesPaid, residency, selectedCurrency.code, selectedCurrencyRate],
  );
  const hasResult = r.grossIncome > 0;
  const isResident = residency === 'resident';

  const taxShare = r.grossIncome > 0 ? Math.min(1, r.totalTax / r.grossIncome) : 0;
  const taxPct = Math.round(taxShare * 100);
  const keepPct = 100 - taxPct;
  const splitLabels = { dark: `Take-home ${keepPct}%`, lime: `Tax ${taxPct}%` };

  const rebateStatus = !isResident
    ? 'Not available to NRIs'
    : r.taxable <= 1200000 ? 'Applies, tax is nil' : r.rebate > 0 ? 'Marginal relief applies' : 'Income above the limit';

  const { th: thS, thR, tdL, tdR, table: tbl, box: tableBox, caption: capS } = tableStyles;
  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', scrollMarginTop: 80 } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const pre = { fontFamily: 'monospace', fontSize: 13, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', margin: '0 0 16px', overflowX: 'auto', lineHeight: 1.8, color: C.ink } as React.CSSProperties;
  const li = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const infoBox = { marginTop: 4, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 } as React.CSSProperties;
  const infoTop = { display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 } as React.CSSProperties;
  const infoRow = { display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: C.ink2 } as React.CSSProperties;
  const amber = '#B45309';

  const resultRows: ReadonlyArray<readonly [string, string]> = [
    ['Gross income', moneyInr0(r.grossIncome)],
    ['Taxable income', moneyInr0(r.taxable)],
    ['Slab tax before rebate', moneyInr0(r.slabTax)],
    [r.rebate > 0 && r.taxable > 1200000 ? 'Marginal relief on the rebate limit' : 'Section 87A rebate', (r.rebate > 0 ? `-${moneyInr0(r.rebate)}` : moneyInr0(0))],
    [`Surcharge${r.surchargeRate > 0 ? ` (${Math.round(r.surchargeRate * 100)}%)` : ''}`, moneyInr0(r.surcharge)],
    ['Health and education cess (4%)', moneyInr0(r.cess)],
    ['Effective tax rate', pct(r.effectiveRate)],
    ['Tax on your next rupee', pct(r.marginalRate)],
    ['Take-home per month', moneyInr0(r.takeHome / 12)],
    [r.balance >= 0 ? 'Tax still to pay after TDS' : 'Refund due after TDS', moneyInr0(Math.abs(r.balance))],
  ];

  const toggleBtn = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '9px 6px', fontFamily: INTER, fontSize: 13, cursor: 'pointer', border: 'none',
    background: active ? C.white : 'transparent', color: active ? C.ink : C.ink3, fontWeight: active ? 600 : 400, transition: 'all 0.12s',
  });

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>New Tax Regime Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Income tax under the new regime for FY 2026-27, with the standard deduction, employer NPS, Section 87A rebate, surcharge and cess
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="New Tax Regime Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {mobile ? <div /> : <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: mobile ? 18 : 24 }}>
                    <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Residential Status</p>
                    <div role="radiogroup" aria-label="Residential status" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['resident', 'nri'] as const).map(rs => (
                        <button key={rs} type="button" role="radio" aria-checked={residency === rs} onClick={() => updateSettings({ residency: rs })} style={toggleBtn(residency === rs)}>
                          {rs === 'resident' ? 'Resident of India' : 'Non-Resident (NRI)'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider id="ntr-salary" label="Gross Annual Salary" value={salary} min={0} max={20000000} step={25000} fmt={v => (v === 0 ? money0(0) : moneyShort(v))} onChange={v => updateSettings({ salary: v })} compact={mobile} />
                  <Slider id="ntr-basic" label="Basic Salary plus DA (% of Gross)" value={basicPct} min={10} max={100} step={5} fmt={v => `${v}%`} onChange={v => updateSettings({ basicPct: v })} compact={mobile} />
                  <Slider id="ntr-nps" label="Employer NPS Contribution (80CCD(2))" value={employerNps} min={0} max={5000000} step={5000} fmt={v => (v === 0 ? money0(0) : moneyShort(v))} onChange={v => updateSettings({ employerNps: v })} compact={mobile} />
                  <Slider id="ntr-other" label="Other Income (Interest, Rent and so on)" value={otherIncome} min={0} max={10000000} step={5000} fmt={v => (v === 0 ? money0(0) : moneyShort(v))} onChange={v => updateSettings({ otherIncome: v })} compact={mobile} />
                  <Slider id="ntr-paid" label="Tax Already Paid (TDS and Advance Tax)" value={taxesPaid} min={0} max={10000000} step={5000} fmt={v => (v === 0 ? money0(0) : moneyShort(v))} onChange={v => updateSettings({ taxesPaid: v })} compact={mobile} />

                  <div style={infoBox}>
                    <div style={infoTop}><span>Deductions applied</span><span>{moneyInrShort(r.standardDeduction + r.npsDeduction)}</span></div>
                    <div style={{ ...infoRow, marginBottom: 2 }}><span>NPS deduction limit (14% of basic)</span><span>{moneyInrShort(r.npsCap)}</span></div>
                    <div style={infoRow}><span>Section 87A rebate</span><span>{rebateStatus}</span></div>
                  </div>
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  {hasResult ? (
                    <>
                      <ResultBox mobile={mobile} label="Total tax for the year" value={moneyInr0(r.totalTax)} ariaLabel={`Total tax: ${moneyInr0(r.totalTax)}`} />
                      {resultRows.map(([label, value]) => <StatRow key={label} label={label} value={value} mobile={mobile} />)}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <SplitDonut fraction={1 - taxShare} centerLabel="Tax" centerValue={`${taxPct}%`}
                          ariaLabel={`Tax is ${taxPct}% of gross income and take-home ${keepPct}%`} />
                      </div>
                      <div style={{ marginBottom: mobile ? 8 : 16, width: '100%', order: mobile ? 2 : -1 }}>
                        <Legend order={0} labels={splitLabels} />
                      </div>
                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <SplitBar fraction={1 - taxShare} labels={splitLabels}
                          ariaLabel={`Take-home is ${keepPct}% of gross income and tax ${taxPct}%`} />
                      </div>
                    </>
                  ) : (
                    <p style={{ color: C.ink3, fontSize: 14, margin: '80px 0' }}>Enter a salary or other income to see the tax.</p>
                  )}
                </div>
              </div>

              {hasResult && r.slabs.length > 0 && (
                <CollapsibleSchedule id="ntr-slab-schedule" mobile={mobile} title="Slab-Wise Tax Breakdown" subtitle="Tax in each slab, before rebate, surcharge and cess"
                  badge={`${moneyInr0(r.taxable)} taxable`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Tax in the slab', lime: 'Unfilled part of the slab' }} />
                    </div>
                    <StackedBars ariaLabel="Tax in each slab of the new regime"
                      bars={r.slabs.map(s => ({ label: `${Math.round(s.rate * 100)}%`, dark: s.tax, lime: Number.isFinite(s.to) ? Math.max(0, (s.to - s.from) * s.rate - s.tax) : 0 }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        Taxable income of {moneyInr0(r.taxable)} split across the new regime slabs. Rebate, surcharge and cess are applied after this.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Slab</th>
                          <th style={thR} scope="col">Rate</th>
                          <th style={thR} scope="col">Income in slab</th>
                          <th style={thR} scope="col">Tax</th>
                        </tr>
                      </thead>
                      <tbody>
                        {r.slabs.map((s, i) => (
                          <tr key={s.from} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>
                              {s.to === Infinity ? `Above ${moneyInrShort(s.from)}` : `${moneyInrShort(s.from)} to ${moneyInrShort(s.to)}`}
                            </td>
                            <td style={tdR}>{Math.round(s.rate * 100)}%</td>
                            <td style={tdR}>{moneyInr0(s.income)}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: s.tax > 0 ? amber : C.ink }}>{moneyInr0(s.tax)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>Total slab tax</td>
                          <td style={tdR} />
                          <td style={{ ...tdR, fontWeight: 700 }}>{moneyInr0(r.taxable)}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{moneyInr0(r.slabTax)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CollapsibleSchedule>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-new-tax-regime">What Is the New Tax Regime?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The new tax regime is the default way an individual is taxed in India under Section 115BAC. It has lower slab rates and a Section 87A rebate that makes taxable income up to Rs 12 lakh tax-free. In return it gives up most deductions, such as 80C, 80D and HRA.
                  </p>
                </div>
                <p style={p}>
                  The slabs are the same for FY 2025-26 and FY 2026-27. Salaried people also get a Rs 75,000 standard deduction.
                </p>
                <p style={p}>
                  Fermor&apos;s <Link href="/blogs/section-115bac-new-tax-regime" target="_blank" rel="noopener noreferrer" style={lnk}>Section 115BAC guide</Link> explains who can opt out and how to file under each regime.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-new-regime-tax-is-calculated">How Is Tax Calculated Under the New Regime?</h2>
                <p style={p}>
                  Subtract the standard deduction and any employer NPS from your income, apply the slabs, then take off the rebate and add surcharge and cess.
                </p>
                <pre style={pre}>
{`Taxable income = Salary + Other income - Standard deduction - Employer NPS
Slab tax = tax on taxable income at the new regime slab rates
Tax after rebate = 0 up to Rs 12 lakh (residents), else slab tax with marginal relief
Surcharge = 10% / 15% / 25% of tax above Rs 50 lakh / 1 crore / 2 crore
Total tax = (Tax after rebate + Surcharge) x 1.04`}
                </pre>
                <p style={p}>
                  The Cess of 4% is added last, on the tax plus surcharge. Tax already paid through TDS or advance tax is then taken off.
                </p>
                <p style={p}>
                  The <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Calculator</Link> covers more income types.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-slabs">What Are the New Tax Regime Slabs for FY 2026-27?</h2>
                <p style={p}>
                  The new regime has seven slabs, from nil up to Rs 4 lakh to 30% above Rs 24 lakh.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>New regime slabs for FY 2025-26 and FY 2026-27, before rebate, surcharge and cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Taxable income</th><th style={thR} scope="col">Rate</th><th style={thR} scope="col">Tax on the full slab</th><th style={thR} scope="col">Cumulative tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to Rs 4,00,000', 'Nil', 'Rs 0', 'Rs 0'],
                        ['Rs 4,00,001 to Rs 8,00,000', '5%', 'Rs 20,000', 'Rs 20,000'],
                        ['Rs 8,00,001 to Rs 12,00,000', '10%', 'Rs 40,000', 'Rs 60,000'],
                        ['Rs 12,00,001 to Rs 16,00,000', '15%', 'Rs 60,000', 'Rs 1,20,000'],
                        ['Rs 16,00,001 to Rs 20,00,000', '20%', 'Rs 80,000', 'Rs 2,00,000'],
                        ['Rs 20,00,001 to Rs 24,00,000', '25%', 'Rs 1,00,000', 'Rs 3,00,000'],
                        ['Above Rs 24,00,000', '30%', '30% of the excess', 'Rs 3,00,000 plus 30%'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={{ ...tdR, fontWeight: 700 }}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Check the latest rates on <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>incometaxindia.gov.in</a>, since a Budget can change them.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-on-salary-examples">How Much Tax Do You Pay on Different Salaries?</h2>
                <p style={p}>
                  A resident salaried person pays nothing up to Rs 12,75,000, and Rs 97,500 on Rs 15 lakh.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Resident, salaried, Rs 75,000 standard deduction, no NPS or other income. Tax includes surcharge and cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Gross salary</th><th style={thR} scope="col">Taxable income</th><th style={thR} scope="col">Total tax</th><th style={thR} scope="col">Effective rate</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 7,00,000', 'Rs 6,25,000', 'Rs 0', '0.00%'],
                        ['Rs 10,00,000', 'Rs 9,25,000', 'Rs 0', '0.00%'],
                        ['Rs 12,00,000', 'Rs 11,25,000', 'Rs 0', '0.00%'],
                        ['Rs 12,75,000', 'Rs 12,00,000', 'Rs 0', '0.00%'],
                        ['Rs 13,00,000', 'Rs 12,25,000', 'Rs 26,000', '2.00%'],
                        ['Rs 15,00,000', 'Rs 14,25,000', 'Rs 97,500', '6.50%'],
                        ['Rs 18,00,000', 'Rs 17,25,000', 'Rs 1,50,800', '8.38%'],
                        ['Rs 20,00,000', 'Rs 19,25,000', 'Rs 1,92,400', '9.62%'],
                        ['Rs 25,00,000', 'Rs 24,25,000', 'Rs 3,19,800', '12.79%'],
                        ['Rs 30,00,000', 'Rs 29,25,000', 'Rs 4,75,800', '15.86%'],
                        ['Rs 50,00,000', 'Rs 49,25,000', 'Rs 10,99,800', '22.00%'],
                        ['Rs 75,00,000', 'Rs 74,25,000', 'Rs 20,67,780', '27.57%'],
                        ['Rs 1,00,00,000', 'Rs 99,25,000', 'Rs 29,25,780', '29.26%'],
                        ['Rs 2,00,00,000', 'Rs 1,99,25,000', 'Rs 66,46,770', '33.23%'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A Rs 20 lakh salary leaves Rs 18,07,600 a year after tax. The <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>In-Hand Salary Calculator</Link> adds PF and other deductions.
                </p>
              </div>

              <PromoBar name="Old vs New Tax Regime Calculator" desc="Enter your deductions and see which regime leaves you with less tax." href="/calculators/old-vs-new-tax-regime-calculator" />

              <div style={sec}>
                <h2 style={h2} id="section-87a-rebate">What Is the Section 87A Rebate and Marginal Relief?</h2>
                <p style={p}>
                  The Section 87A rebate cancels the whole slab tax, up to Rs 60,000, for a resident whose taxable income is Rs 12 lakh or less.
                </p>
                <p style={p}>
                  Just above the limit, marginal relief caps the tax at the income over Rs 12 lakh. At a taxable income of Rs 12,10,000 the slab tax is Rs 61,500, but you pay Rs 10,000 plus cess, which is Rs 10,400.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Tax just above the rebate limit. Resident, salaried, Rs 75,000 standard deduction.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Gross salary</th><th style={thR} scope="col">Taxable income</th><th style={thR} scope="col">Total tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 12,75,000', 'Rs 12,00,000', 'Rs 0'],
                        ['Rs 12,76,000', 'Rs 12,01,000', 'Rs 1,040'],
                        ['Rs 12,80,000', 'Rs 12,05,000', 'Rs 5,200'],
                        ['Rs 13,00,000', 'Rs 12,25,000', 'Rs 26,000'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Relief ends at a salary of about Rs 13.46 lakh, where the tax reaches about Rs 73,400. Until then every extra rupee costs Rs 1.04. The <Link href="/blogs/section-87a-rebate" target="_blank" rel="noopener noreferrer" style={lnk}>Section 87A guide</Link> covers the rebate in both regimes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="standard-deduction">What Is the Standard Deduction Under the New Regime?</h2>
                <p style={p}>
                  The standard deduction is Rs 75,000 for salaried individuals and pensioners, and it comes off before the slabs apply.
                </p>
                <p style={p}>
                  Business and professional income gets no standard deduction. In the calculator it applies only when you enter a salary.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="employer-nps">How Does Employer NPS Reduce Tax Under the New Regime?</h2>
                <p style={p}>
                  An employer&apos;s NPS contribution is deductible under Section 80CCD(2) up to 14% of basic salary plus DA.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 20 lakh salary, basic plus DA at 50%, resident.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Item</th><th style={thR} scope="col">No NPS</th><th style={thR} scope="col">Rs 2,00,000 NPS</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['NPS deduction allowed', 'Rs 0', 'Rs 1,40,000'],
                        ['Taxable income', 'Rs 19,25,000', 'Rs 17,85,000'],
                        ['Total tax', 'Rs 1,92,400', 'Rs 1,63,280'],
                        ['Tax saved', 'Rs 0', 'Rs 29,120'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The cap is 14% of the Rs 10 lakh basic, which is Rs 1,40,000, so the extra Rs 60,000 earns no deduction. See the <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>NPS Calculator</Link> for the corpus.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-and-cess">How Do Surcharge and Cess Work Under the New Regime?</h2>
                <p style={p}>
                  Surcharge is 10% of the tax above Rs 50 lakh, 15% above Rs 1 crore and 25% above Rs 2 crore, and cess is 4% on top.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Surcharge under the new regime. The top rate is capped at 25%.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Total income</th><th style={thR} scope="col">Surcharge</th><th style={thR} scope="col">Top rate with cess</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to Rs 50 lakh', 'Nil', '31.20%'],
                        ['Rs 50 lakh to Rs 1 crore', '10%', '34.32%'],
                        ['Rs 1 crore to Rs 2 crore', '15%', '35.88%'],
                        ['Above Rs 2 crore', '25%', '39.00%'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Marginal relief applies at each limit. At a taxable income of Rs 50,50,000 the raw surcharge is Rs 1,09,500, relief takes off Rs 74,500, and the surcharge is Rs 35,000.
                </p>
                <p style={p}>
                  The <Link href="/calculators/surcharge-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Surcharge Calculator</Link> compares both regimes at high incomes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nri-new-regime">How Is an NRI Taxed Under the New Regime?</h2>
                <p style={p}>
                  An NRI pays tax on income from India at the same slabs, but gets no Section 87A rebate.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Salaried, Rs 75,000 standard deduction, no other income.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Gross salary</th><th style={thR} scope="col">Resident tax</th><th style={thR} scope="col">NRI tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 12,00,000', 'Rs 0', 'Rs 54,600'],
                        ['Rs 15,00,000', 'Rs 97,500', 'Rs 97,500'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The difference disappears once income is high enough that the rebate no longer applies. Your residential status for the year decides which column you fall in.
                </p>
              </div>

              <PromoBar name="Income Tax Calculator" desc="Add more income types and see your full tax for the year." href="/calculators/income-tax-calculator" />

              <div style={sec}>
                <h2 style={h2} id="deductions-allowed">Which Deductions Are Allowed Under the New Regime?</h2>
                <p style={p}>
                  The new regime allows only a few deductions, and the standard deduction and the employer NPS deduction are the main ones.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Common deductions under the new regime.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Deduction</th><th style={thS} scope="col">New regime</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Standard deduction, Rs 75,000', 'Allowed for salary and pension'],
                        ['Employer NPS, 80CCD(2)', 'Allowed up to 14% of basic plus DA'],
                        ['Section 80C (PPF, ELSS, EPF and so on)', 'Not allowed'],
                        ['Section 80D, health insurance', 'Not allowed'],
                        ['HRA and LTA', 'Not allowed'],
                        ['Interest on a self-occupied home loan', 'Not allowed'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Find the HRA you would lose with the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>HRA Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-or-new">Should You Choose the Old or the New Regime?</h2>
                <p style={p}>
                  Choose the new regime when your old-regime deductions would not offset its lower rates, and compare both on your own numbers.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Few deductions:</strong> the new regime usually wins, and the rebate makes income up to Rs 12.75 lakh tax-free for salaried residents.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Many deductions:</strong> large 80C, 80D, HRA and home loan claims can still favour the old regime.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Switching:</strong> salaried individuals can choose each year, while business income allows a return to the old regime only once.</li>
                </ul>
                <p style={p}>
                  Run both with the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Old vs New Tax Regime Calculator</Link>, and read the <Link href="/blogs/old-vs-new-tax-regime" target="_blank" rel="noopener noreferrer" style={lnk}>regime comparison guide</Link> for the rules.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-limits">What Does This Calculator Leave Out?</h2>
                <p style={p}>
                  It treats everything you enter as income taxed at the slab rates.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Capital gains:</strong> gains on shares and funds at special rates are not included. Use the <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Capital Gains Calculator</Link>.</li>
                  <li style={li}><strong style={{ color: C.ink }}>House property:</strong> rental income, the 30% deduction and loan interest on let-out property are not modelled.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Law changes:</strong> the Income-tax Act, 2025 applies from 1 April 2026 and renumbers sections. A Budget can also change rates. Check <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>incometaxindia.gov.in</a>.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Employer TDS:</strong> your employer may deduct differently from your final tax, which is why the paid-tax field shows a balance or refund.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-in-excel">How Do You Calculate New Regime Tax in Excel?</h2>
                <p style={p}>
                  Put the slab table in a range and use SUMPRODUCT, then apply the rebate and cess.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Excel and Google Sheets formulas. T is taxable income.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Step</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Taxable income', '=MAX(0, Salary+Other-75000-MIN(NPS, 0.14*Basic))'],
                        ['Slab tax', '=SUMPRODUCT((T>Lower)*(T-Lower)*(Rate-PrevRate))'],
                        ['After rebate', '=IF(T<=1200000, 0, MIN(Slab, T-1200000))'],
                        ['Total tax', '=AfterRebate*1.04'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Rate and PrevRate are the slab rate and the one below it. The sheet matches this calculator for a resident with income under Rs 50 lakh.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This New Tax Regime Calculator</h2>
                <p style={p}>There are five inputs and one toggle. Adjust them and the result updates at once.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Residential Status:</strong> choose Resident or NRI, since only residents get the 87A rebate.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Salary and Basic Share:</strong> enter your gross salary and what share of it is basic plus DA.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Employer NPS and Other Income:</strong> add the contribution made for you and any interest or rent.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Tax Already Paid:</strong> enter your TDS and advance tax to see what is left to pay or refunded.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Open the dropdown for the slab-wise chart and table. Your entries are saved in this browser.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQAccordion items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All figures on this page are estimates from the inputs you enter and the rules for FY 2025-26 and FY 2026-27 as understood at the time of writing. Rates, limits and section numbers can change with a Budget or a new Act. This calculator is for education and planning and is not tax advice. Consult a Chartered Accountant before you file.
                </p>
              </div>

            </article>
          </div>

          <StickySidebar className="ntr-sidebar" mobile={mobile}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </StickySidebar>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

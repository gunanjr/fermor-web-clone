'use client';

import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import {
  C, INTER, Slider, SplitDonut, StackedBars, Legend, SplitBar, StatRow, ResultBox,
  CollapsibleSchedule, SidebarList, StickySidebar, PromoBar, FAQAccordion, tableStyles,
  type FaqItem, type NavItem,
} from '../../../src/components/calculators/CalcUi';
import { calcYield, calcIncome, dividendTaxRate, TDS_THRESHOLD } from './dividendMath';

type Tab = 'yield' | 'income';

const defaultSettings = {
  activeTab: 'yield' as Tab,
  annualDividend: 20,
  sharePrice: 500,
  shares: 100,
  buyPrice: 400,
  slab: 30,
  investmentAmount: 500000,
  dividendYield: 3,
  holdingPeriod: 5,
  growth: 8,
};

/** Share-price multiples used for the "yield at different prices" ladder. */
const PRICE_MULTIPLES = [0.6, 0.7, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 2] as const;
const TAB_LABELS: ReadonlyArray<readonly [Tab, string]> = [['yield', 'Dividend Yield %'], ['income', 'Dividend Income']];

const TAX_SNAPSHOT = [
  { label: 'TDS threshold per company', value: 'Rs 10,000' },
  { label: 'TDS rate (resident)', value: '10%' },
  { label: 'TDS rate without PAN', value: '20%' },
  { label: 'Dividend Distribution Tax', value: 'Ended Apr 2020' },
] as const;

const POPULAR: NavItem[] = [
  { href: '/calculators/stock-return-calculator',          label: 'Stock Return Calculator' },
  { href: '/calculators/dividend-reinvestment-calculator', label: 'Dividend Reinvestment (DRIP) Calculator' },
  { href: '/calculators/stock-average-calculator',         label: 'Stock Average Calculator' },
  { href: '/calculators/income-tax-calculator',            label: 'Income Tax Calculator' },
  { href: '/calculators/tds-calculator',                   label: 'TDS Calculator' },
  { href: '/calculators/cagr-calculator',                  label: 'CAGR Calculator' },
  { href: '/calculators/fd-calculator',                    label: 'FD Calculator' },
];
const MORE: NavItem[] = [
  { href: '/calculators/dividend-tax-calculator',     label: 'Dividend Tax Calculator' },
  { href: '/calculators/capital-gains-calculator',    label: 'Capital Gains Calculator' },
  { href: '/calculators/surcharge-calculator',        label: 'Surcharge Calculator' },
  { href: '/calculators/xirr-calculator',             label: 'XIRR Calculator' },
  { href: '/calculators/portfolio-return-calculator', label: 'Portfolio Return Calculator' },
];

function TaxSnapshot() {
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Dividend Tax Snapshot</span>
      </div>
      {TAX_SNAPSHOT.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < TAX_SNAPSHOT.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DividendYieldCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { settings, updateSettings } = useCalculatorSettings('dividend-yield', defaultSettings);
  const { selectedCurrency } = useCurrency();
  const { activeTab, annualDividend, sharePrice, shares, buyPrice, slab, investmentAmount, dividendYield, holdingPeriod, growth } = settings;

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
  const locale = isInr ? 'en-IN' : 'en-US';
  const money = (n: number, dec = 2) => `${n < 0 ? '-' : ''}${sym}${new Intl.NumberFormat(locale, { maximumFractionDigits: dec, minimumFractionDigits: dec }).format(Math.abs(n))}`;
  const money0 = (n: number) => money(n, 0);
  const moneyShort = (n: number) => {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (isInr && abs >= 1e7) return `${sign}${sym}${(abs / 1e7).toFixed(2)} Cr`;
    if (isInr && abs >= 1e5) return `${sign}${sym}${(abs / 1e5).toFixed(2)} L`;
    return `${sign}${sym}${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(abs)}`;
  };
  const pct = (n: number) => `${n.toFixed(2)}%`;

  const yieldResult = useMemo(
    () => calcYield({ dps: annualDividend, price: sharePrice, shares, buyPrice, slabPct: slab }),
    [annualDividend, sharePrice, shares, buyPrice, slab],
  );
  const incomeResult = useMemo(
    () => calcIncome({ invest: investmentAmount, yieldPct: dividendYield, years: holdingPeriod, growthPct: growth, slabPct: slab }),
    [investmentAmount, dividendYield, holdingPeriod, growth, slab],
  );
  const priceLadder = useMemo(() => PRICE_MULTIPLES.map(multiple => {
    const price = Math.max(1, Math.round((sharePrice * multiple) / 5) * 5);
    const yieldPct = (annualDividend / price) * 100;
    return { price, yieldPct, postTaxPct: yieldPct * (1 - dividendTaxRate(slab)), holdingValue: price * shares, isCurrent: multiple === 1 };
  }), [sharePrice, annualDividend, slab, shares]);

  const isYield = activeTab === 'yield';
  const keptAmount = isYield ? yieldResult.netIncome : incomeResult.totalNet;
  const taxAmount = isYield ? yieldResult.taxAtSlab : incomeResult.totalTax;
  const grossAmount = keptAmount + taxAmount;
  const keptFraction = grossAmount > 0 ? keptAmount / grossAmount : 1;
  const keptPct = Math.round(keptFraction * 100);
  const taxPct = 100 - keptPct;
  const lastIncomeRow = incomeResult.rows[incomeResult.rows.length - 1];

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
  const green = '#166534';
  const amber = '#B45309';

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1, border: 'none', cursor: 'pointer', fontFamily: INTER, fontSize: 13, background: 'transparent',
    padding: mobile ? '13px 6px' : '15px 20px', color: active ? C.dark : C.ink3, fontWeight: active ? 700 : 400,
    borderBottom: active ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s',
  });

  const resultRows: ReadonlyArray<readonly [string, string]> = isYield ? [
    ['Yield on your buy price', pct(yieldResult.yocPct)],
    ['Post-tax yield', pct(yieldResult.postTaxYieldPct)],
    ['Annual dividend income', money(yieldResult.annualIncome)],
    ['TDS deducted by the company', money(yieldResult.tds)],
    ['Tax at slab rate plus cess', money(yieldResult.taxAtSlab)],
    ['Net income after tax', money(yieldResult.netIncome)],
    ['Tax due at filing after TDS', money(Math.max(0, yieldResult.taxDueAtFiling))],
    ['Net income per month', money(yieldResult.monthlyNet)],
  ] : [
    ['Total dividend over the period', moneyShort(incomeResult.totalGross)],
    ['Tax at slab rate plus cess', moneyShort(incomeResult.totalTax)],
    ['Net dividend after tax', moneyShort(incomeResult.totalNet)],
    ['Yield on cost in the final year', pct(incomeResult.finalYocPct)],
    ['Net income per month in year 1', money0(incomeResult.monthlyNetYear1)],
    ['Investment plus net dividends', moneyShort(investmentAmount + incomeResult.totalNet)],
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Dividend Yield Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Dividend yield, yield on cost, post-tax yield, TDS and dividend income growth for stocks in India
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Dividend Yield Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div role="tablist" aria-label="Dividend calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {TAB_LABELS.map(([id, label]) => (
                  <button key={id} type="button" id={`tab-${id}`} role="tab" aria-selected={activeTab === id} aria-controls={`panel-${id}`}
                    onClick={() => updateSettings({ activeTab: id })} style={tabStyle(activeTab === id)}>{label}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Inputs */}
                <div id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`}
                  style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {mobile ? <div /> : <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    <CurrencySelector theme="light" />
                  </div>

                  {isYield ? (
                    <>
                      <Slider id="dy-dps" label={`Annual Dividend Per Share (${sym})`} value={annualDividend} min={0.5} max={500} step={0.5} fmt={v => money(v, 1)} onChange={v => updateSettings({ annualDividend: v })} compact={mobile} />
                      <Slider id="dy-price" label={`Current Share Price (${sym})`} value={sharePrice} min={10} max={50000} step={5} fmt={money0} onChange={v => updateSettings({ sharePrice: v })} compact={mobile} />
                      <Slider id="dy-shares" label="Shares Held" value={shares} min={1} max={10000} step={1} fmt={v => v.toLocaleString(locale)} onChange={v => updateSettings({ shares: v })} compact={mobile} />
                      <Slider id="dy-buy" label={`Your Average Buy Price (${sym})`} value={buyPrice} min={10} max={50000} step={5} fmt={money0} onChange={v => updateSettings({ buyPrice: v })} compact={mobile} />
                      <Slider id="dy-slab" label="Your Tax Slab Rate" value={slab} min={0} max={30} step={5} fmt={v => `${v}%`} onChange={v => updateSettings({ slab: v })} compact={mobile} />
                      <div style={infoBox}>
                        <div style={infoTop}><span>Value of your holding</span><span>{moneyShort(sharePrice * shares)}</span></div>
                        <div style={{ ...infoRow, marginBottom: 2 }}><span>Dividend per year</span><span>{moneyShort(yieldResult.annualIncome)}</span></div>
                        <div style={infoRow}><span>TDS on dividends</span><span>{yieldResult.annualIncome > TDS_THRESHOLD ? 'Applies, above Rs 10,000' : 'Not cut, under Rs 10,000'}</span></div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider id="dy-inv" label="Investment Amount" value={investmentAmount} min={10000} max={10000000} step={10000} fmt={moneyShort} onChange={v => updateSettings({ investmentAmount: v })} compact={mobile} />
                      <Slider id="dy-yield" label="Dividend Yield on Cost (%)" value={dividendYield} min={0.1} max={20} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ dividendYield: v })} compact={mobile} />
                      <Slider id="dy-years" label="Holding Period" value={holdingPeriod} min={1} max={30} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ holdingPeriod: v })} compact={mobile} />
                      <Slider id="dy-growth" label="Annual Dividend Growth" value={growth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ growth: v })} compact={mobile} />
                      <Slider id="dy-slab2" label="Your Tax Slab Rate" value={slab} min={0} max={30} step={5} fmt={v => `${v}%`} onChange={v => updateSettings({ slab: v })} compact={mobile} />
                      <div style={infoBox}>
                        <div style={infoTop}><span>Dividend in year 1</span><span>{moneyShort(incomeResult.year1Gross)}</span></div>
                        <div style={infoRow}><span>Dividend in year {holdingPeriod}</span><span>{moneyShort(lastIncomeRow ? lastIncomeRow.gross : 0)}</span></div>
                      </div>
                    </>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  <ResultBox mobile={mobile}
                    label={isYield ? 'Dividend Yield' : 'Dividend in Year 1'}
                    value={isYield ? pct(yieldResult.yieldPct) : money0(incomeResult.year1Gross)}
                    ariaLabel={isYield ? `Dividend yield: ${pct(yieldResult.yieldPct)}` : `Year 1 dividend: ${money0(incomeResult.year1Gross)}`} />
                  {resultRows.map(([label, value]) => <StatRow key={label} label={label} value={value} mobile={mobile} />)}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <SplitDonut fraction={keptFraction} centerLabel="You keep" centerValue={`${keptPct}%`}
                      ariaLabel={`You keep ${keptPct}% of the dividend after tax and ${taxPct}% goes to tax`} />
                  </div>
                  <div style={{ marginBottom: mobile ? 8 : 16, width: '100%', order: mobile ? 2 : -1 }}>
                    <Legend order={0} labels={{ dark: `You keep ${keptPct}%`, lime: `Tax ${taxPct}%` }} />
                  </div>
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <SplitBar fraction={keptFraction} labels={{ dark: `You keep ${keptPct}%`, lime: `Tax ${taxPct}%` }}
                      ariaLabel={`You keep ${keptPct}% of the dividend and ${taxPct}% goes to tax`} />
                  </div>
                </div>
              </div>

              {/* Collapsible: price ladder or year-by-year schedule */}
              {isYield ? (
                <CollapsibleSchedule key="ladder" id="dy-ladder" mobile={mobile} title="Yield at Different Share Prices" subtitle="Same dividend, different prices" badge={`${priceLadder.length} prices`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <StackedBars ariaLabel="Dividend yield at different share prices"
                      bars={priceLadder.map(l => ({ label: money0(l.price), dark: l.yieldPct, lime: 0, highlight: l.isCurrent }))} />
                    <p style={{ fontSize: 11.5, color: C.ink3, margin: '8px 0 0' }}>The lime bar is your current share price.</p>
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 520, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>Yield on a dividend of {money(annualDividend, 1)} a year at the share price shown.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Share price</th>
                          <th style={thR} scope="col">Dividend yield</th>
                          <th style={thR} scope="col">Post-tax yield</th>
                          <th style={thR} scope="col">Value of {shares.toLocaleString(locale)} shares</th>
                        </tr>
                      </thead>
                      <tbody>
                        {priceLadder.map((l, i) => (
                          <tr key={l.price} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: l.isCurrent ? 700 : 400, color: l.isCurrent ? C.dark : C.ink2 }}>{money0(l.price)}{l.isCurrent ? ' (current)' : ''}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{pct(l.yieldPct)}</td>
                            <td style={tdR}>{pct(l.postTaxPct)}</td>
                            <td style={tdR}>{moneyShort(l.holdingValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleSchedule>
              ) : (
                <CollapsibleSchedule key="schedule" id="dy-schedule" mobile={mobile} title="Year-by-Year Dividend Income" subtitle={`Dividend grows ${growth}% a year`} badge={`${holdingPeriod} yr · ${growth}% growth`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Net dividend', lime: 'Tax' }} />
                    </div>
                    <StackedBars ariaLabel="Net dividend and tax for each year" bars={incomeResult.rows.map(r => ({ label: String(r.year), dark: r.net, lime: r.tax }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>Dividend on {moneyShort(investmentAmount)} invested, growing {growth}% a year, taxed at the {slab}% slab plus cess.</caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={thR} scope="col">Yield on cost</th>
                          <th style={thR} scope="col">Dividend</th>
                          <th style={thR} scope="col">Tax</th>
                          <th style={thR} scope="col">Net dividend</th>
                          <th style={thR} scope="col">Cumulative net</th>
                        </tr>
                      </thead>
                      <tbody>
                        {incomeResult.rows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={tdR}>{pct(r.yocPct)}</td>
                            <td style={{ ...tdR, color: green, fontWeight: 600 }}>{money0(r.gross)}</td>
                            <td style={{ ...tdR, color: amber }}>{money0(r.tax)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.net)}</td>
                            <td style={tdR}>{money0(r.cumNet)}</td>
                          </tr>
                        ))}
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
                <h2 style={h2} id="what-is-dividend-yield">What Is Dividend Yield?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Dividend yield is the annual dividend per share divided by the current share price, shown as a percentage. A stock that pays Rs 20 a year and trades at Rs 500 yields 4%, so it returns 4 paise in cash for every rupee of price. It ignores any change in the share price itself.
                  </p>
                </div>
                <p style={p}>
                  Your return from a stock has two parts: the dividend and the change in price. Yield measures only the first.
                </p>
                <p style={p}>
                  Yield moves whenever the price moves, even if the dividend stays the same. Use it to compare income stocks, and use the <Link href="/calculators/stock-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Stock Return Calculator</Link> for the full picture.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dividend-yield-formula">What Is the Dividend Yield Formula?</h2>
                <p style={p}>
                  Dividend yield equals the annual dividend per share divided by the share price, multiplied by 100.
                </p>
                <pre style={pre}>
{`Dividend yield (%) = Annual dividend per share / Share price x 100

Rs 20 / Rs 500 x 100 = 4.00%`}
                </pre>
                <p style={p}>
                  Use the dividends paid over the last 12 months for the trailing yield. The same Rs 20 dividend gives a different yield at each price.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Yield on an annual dividend of Rs 20 at different share prices.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Share price</th><th style={thR} scope="col">Dividend yield</th></tr>
                    </thead>
                    <tbody>
                      {[['Rs 200', '10.00%'], ['Rs 250', '8.00%'], ['Rs 300', '6.67%'], ['Rs 400', '5.00%'], ['Rs 500', '4.00%'], ['Rs 625', '3.20%'], ['Rs 800', '2.50%'], ['Rs 1,000', '2.00%']].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="yield-on-cost">What Is Yield on Cost?</h2>
                <p style={p}>
                  Yield on cost is the annual dividend divided by the price you paid, not today&apos;s price.
                </p>
                <p style={p}>
                  A new buyer at Rs 500 gets a 4% yield on a Rs 20 dividend. If you bought at Rs 400, your yield on cost is 5%. When the dividend grows, your yield on cost rises while the market yield stays tied to the price.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Bought at Rs 400, current price Rs 500, as the annual dividend grows.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Annual dividend</th><th style={thR} scope="col">Yield on cost</th><th style={thR} scope="col">Yield at Rs 500</th></tr>
                    </thead>
                    <tbody>
                      {[['Rs 20', '5.00%', '4.00%'], ['Rs 24', '6.00%', '4.80%'], ['Rs 28', '7.00%', '5.60%']].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{b}</td><td style={tdR}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Work out your own buy price with the <Link href="/calculators/stock-average-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Stock Average Calculator</Link> if you bought in several lots.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="post-tax-yield">What Is Post-Tax Dividend Yield?</h2>
                <p style={p}>
                  Post-tax yield is the yield left after income tax, and it is lower than the headline figure for every taxpayer above the exemption limit.
                </p>
                <pre style={pre}>
{`Post-tax yield = Yield x (1 - slab rate x 1.04)

4% x (1 - 0.30 x 1.04) = 4% x 0.688 = 2.75%`}
                </pre>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>A 4% dividend yield after tax at each slab rate, including 4% cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Slab rate</th><th style={thR} scope="col">Tax on dividend</th><th style={thR} scope="col">Post-tax yield</th></tr>
                    </thead>
                    <tbody>
                      {[['0%', '0.0%', '4.00%'], ['5%', '5.2%', '3.79%'], ['10%', '10.4%', '3.58%'], ['20%', '20.8%', '3.17%'], ['30%', '31.2%', '2.75%']].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="forward-vs-trailing">What Is the Difference Between Forward and Trailing Yield?</h2>
                <p style={p}>
                  Trailing yield uses dividends paid in the last 12 months, and forward yield uses the latest declared dividend projected for a year.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Trailing yield against forward yield.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Metric</th><th style={thS} scope="col">Trailing yield</th><th style={thS} scope="col">Forward yield</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['What it uses', 'Dividends paid in the last 12 months', 'Latest dividend projected for a year'],
                        ['Reliability', 'Confirmed payments', 'Assumes the same payout again'],
                        ['Best for', 'Judging past income', 'Estimating the next 12 months'],
                        ['Weakness', 'Includes one-off special dividends', 'Misses a later cut or suspension'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Most portals show trailing yield. Strip out special dividends before you plan on an income stream.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dividend-yield-vs-growth">Is a Low Yield With High Dividend Growth Better?</h2>
                <p style={p}>
                  A low yield with fast growth wins only after many years. On Rs 1 lakh, a 1% yield growing 15% a year earns less each year until year 13 and less in total until year 20.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 560 }}>
                    <caption style={capS}>Rs 1 lakh invested. Stock A yields 1% and its dividend grows 15% a year. Stock B yields a flat 5%. Before tax, with the price unchanged.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Year</th><th style={thR} scope="col">A: dividend that year</th><th style={thR} scope="col">B: dividend that year</th><th style={thR} scope="col">A: total so far</th><th style={thR} scope="col">B: total so far</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 1,749', 'Rs 5,000', 'Rs 6,742', 'Rs 25,000'],
                        ['10', 'Rs 3,518', 'Rs 5,000', 'Rs 20,304', 'Rs 50,000'],
                        ['13', 'Rs 5,350', 'Rs 5,000', 'Rs 34,352', 'Rs 65,000'],
                        ['15', 'Rs 7,076', 'Rs 5,000', 'Rs 47,580', 'Rs 75,000'],
                        ['20', 'Rs 14,232', 'Rs 5,000', 'Rs 1,02,444', 'Rs 1,00,000'],
                        ['25', 'Rs 28,625', 'Rs 5,000', 'Rs 2,12,793', 'Rs 1,25,000'],
                      ].map(([a, b, c, d, e]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={tdR}>{d}</td><td style={tdR}>{e}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Stock A&apos;s yield on cost reaches 3.52% in year 10 and passes 5% in year 13. Growth is only worth waiting for if the company can keep it up.
                </p>
              </div>

              <PromoBar name="Dividend Reinvestment (DRIP) Calculator" desc="See how reinvesting every dividend changes your final corpus against taking the cash." href="/calculators/dividend-reinvestment-calculator" />

              <div style={sec}>
                <h2 style={h2} id="dividend-yield-vs-total-return">How Does Dividend Yield Differ From Total Return?</h2>
                <p style={p}>
                  Total return adds the price change to the dividend, so a high yield can still lose money if the price falls faster.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Rs 5 lakh in a stock yielding 4% for 5 years, with the dividend steady at Rs 20,000 a year.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Scenario</th><th style={thR} scope="col">Dividends</th><th style={thR} scope="col">Price change</th><th style={thR} scope="col">Total return</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Price rises 10% a year', 'Rs 1,00,000', '+Rs 3,05,255', '+Rs 4,05,255', green],
                        ['Price unchanged', 'Rs 1,00,000', 'Rs 0', '+Rs 1,00,000', green],
                        ['Price falls 5% a year', 'Rs 1,00,000', '-Rs 1,13,110', '-Rs 13,110', amber],
                      ].map(([a, b, c, d, col]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, color: col }}>{c}</td><td style={{ ...tdR, color: col, fontWeight: 700 }}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Turn a multi-year result into a yearly rate with the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>CAGR Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dividend-yield-vs-payout">What Is the Dividend Payout Ratio?</h2>
                <p style={p}>
                  The payout ratio is dividends paid divided by net profit, and it shows how much of the earnings reach shareholders.
                </p>
                <pre style={pre}>
{`Payout ratio (%) = Total dividends / Net profit x 100

Rs 600 crore / Rs 1,000 crore x 100 = 60%`}
                </pre>
                <p style={p}>
                  A high yield with a payout near 100% is fragile, because a profit dip forces a cut. A moderate payout leaves room to keep paying.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="sector-yields">Which Sectors Pay Higher Dividends in India?</h2>
                <p style={p}>
                  Companies with steady cash flow and little need to reinvest pay out more, and fast-growing companies keep more.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>General payout tendency by sector. Check each company, since the pattern changes.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Sector</th><th style={thS} scope="col">Payout tendency</th><th style={thS} scope="col">Reason</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Government-owned energy and mining', 'Higher', 'The government is the majority shareholder and takes dividends'],
                        ['Utilities and power', 'Moderate to higher', 'Regulated, steady cash flow'],
                        ['Mature FMCG', 'Moderate to higher', 'Strong cash flow, limited capital needs'],
                        ['IT services', 'Moderate', 'Pays dividends and often buys back shares'],
                        ['Private banks', 'Lower', 'Profit funds loan growth and capital needs'],
                        ['Pharma', 'Lower to moderate', 'Research and capacity spending'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="indian-context">How Do ITC, Coal India, HDFC Bank and Reliance Compare on Dividends?</h2>
                <p style={p}>
                  Their yields differ because their payout policies differ, and each yield changes daily with the price.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>ITC:</strong> a cash-rich company that pays regular dividends and has added special dividends in some years.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Coal India:</strong> the Government of India is the majority shareholder, and the company has a record of high payouts.</li>
                  <li style={li}><strong style={{ color: C.ink }}>HDFC Bank:</strong> keeps most profit to fund loan growth, so its yield is usually lower than government-owned peers.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Reliance Industries:</strong> pays a modest dividend against its price while spending on telecom, retail and energy.</li>
                </ul>
                <p style={p}>
                  Take the latest dividend per share from the <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>NSE India</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>BSE India</a> corporate announcements and enter it above.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dividend-tax">How Is Dividend Income Taxed in India?</h2>
                <p style={p}>
                  Dividends are added to your income and taxed at your slab rate, plus 4% cess. Dividend Distribution Tax ended on 1 April 2020, so the company no longer pays tax before the payout.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>TDS rate:</strong> a company deducts 10% when dividends paid to you in a year exceed Rs 10,000. The limit was Rs 5,000 until 31 March 2025.</li>
                  <li style={li}><strong style={{ color: C.ink }}>No PAN:</strong> the rate rises to 20%.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Non-residents:</strong> TDS is 20%, subject to the tax treaty with their country.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Below the limit:</strong> no TDS is cut, but the dividend is still taxable and must be reported.</li>
                </ul>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Rs 25,000 of dividends from one company, taxed at the 30% slab plus 4% cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Step</th><th style={thR} scope="col">Amount</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Dividend declared', 'Rs 25,000'],
                        ['TDS deducted at 10%', 'Rs 2,500'],
                        ['Dividend received in your bank', 'Rs 22,500'],
                        ['Tax at 30% slab plus cess (31.2%)', 'Rs 7,800'],
                        ['Tax still due at filing', 'Rs 5,300'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={tdL}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The Income-tax Act, 2025 groups the TDS provisions in section 393 from 1 April 2026. Check the current limits on the <a href="https://www.incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Department</a> site, and see the <Link href="/blogs/tds-rate-chart" target="_blank" rel="noopener noreferrer" style={lnk}>TDS rate chart</Link>.
                </p>
              </div>

              <PromoBar name="Dividend Tax Calculator" desc="Work out the tax and TDS on a dividend payout at your slab rate." href="/calculators/dividend-tax-calculator" />

              <div style={sec}>
                <h2 style={h2} id="ex-dividend-date">What Is the Ex-Dividend Date?</h2>
                <p style={p}>
                  The ex-dividend date is the first day a stock trades without the right to the declared dividend.
                </p>
                <p style={p}>
                  Buy before that date to receive the dividend, and buy on or after it to miss this payout. With T+1 settlement in India, the ex-date and the record date fall on the same day.
                </p>
                <p style={p}>
                  The price usually adjusts down by about the dividend on the ex-date, so the payout is not free money. High earners should also check the <Link href="/calculators/surcharge-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Surcharge Calculator</Link>, since dividend surcharge is capped at 15%.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dividend-yield-in-excel">How Do You Calculate Dividend Yield in Excel?</h2>
                <p style={p}>
                  Divide the dividend by the price and format the cell as a percentage.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Layout for a dividend yield sheet in Excel or Google Sheets.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Cell</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['B1', 'Annual dividend per share', 'Enter 20'],
                        ['B2', 'Current share price', 'Enter 500'],
                        ['B3', 'Dividend yield', '=B1/B2'],
                        ['B4', 'Your buy price', 'Enter 400'],
                        ['B5', 'Yield on cost', '=B1/B4'],
                        ['B6', 'Post-tax yield at the 30% slab', '=B3*(1-0.3*1.04)'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Dividend Yield Calculator</h2>
                <p style={p}>The calculator has two tabs, each with its own inputs.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Dividend Yield %:</strong> enter the dividend per share, the price and the shares you hold. The yield and income update instantly.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Buy price and slab:</strong> add your average buy price for yield on cost and your tax slab for post-tax figures.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Dividend Income:</strong> enter the amount, the expected yield, the holding period, the dividend growth and your slab.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Dropdown:</strong> open it for the yield at different prices, or the year-by-year income with a chart.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Your entries are saved in this browser. The currency selector changes the symbol, and amounts are not converted.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQAccordion items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All figures on this page are for education and planning only. Dividend yields change with market prices, and past dividends do not guarantee future ones. Tax is estimated at your slab rate plus 4% cess and does not include surcharge or other adjustments. This calculator does not provide investment or tax advice. Consult a SEBI-registered adviser or a Chartered Accountant before you invest.
                </p>
              </div>

            </article>
          </div>

          <StickySidebar className="div-yield-sidebar" mobile={mobile}>
            <div style={{ flexShrink: 0 }}><TaxSnapshot /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </StickySidebar>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

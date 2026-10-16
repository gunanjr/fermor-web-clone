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
  C, INTER, Slider, PresetPills, SplitDonut, StackedBars, Legend, SplitBar, StatRow, ResultBox,
  CollapsibleSchedule, SidebarList, StickySidebar, PromoBar, FAQAccordion, tableStyles,
  type FaqItem, type NavItem,
} from '../../../src/components/calculators/CalcUi';
import { calcFromPrice, calcSip, calcEtfVsMf, LTCG_EXEMPTION } from './etfMath';

type TabId = 'price' | 'sip' | 'compare';

const defaultSettings = {
  activeTab: 'price' as TabId,
  units: 1000,
  buyPrice: 100,
  currentPrice: 180,
  priceYears: 5,
  monthlySip: 5000,
  lumpsum: 100000,
  indexReturn: 12,
  expenseRatio: 0.1,
  mfReturn: 12,
  mfExpense: 1,
  years: 10,
  chargePct: 0.1,
};

const TAB_LABELS: ReadonlyArray<readonly [TabId, string]> = [
  ['price', 'From Price'],
  ['sip', 'SIP'],
  ['compare', 'ETF vs Mutual Fund'],
];

const YEAR_PRESETS = [5, 10, 15, 20, 25, 30] as const;
const PRICE_YEAR_PRESETS = [1, 3, 5, 7, 10, 15] as const;

const POPULAR: NavItem[] = [
  { href: '/calculators/sip-calculator',                 label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',             label: 'Lumpsum Calculator' },
  { href: '/calculators/index-fund-return-calculator',   label: 'Index Fund Return Calculator' },
  { href: '/calculators/cagr-calculator',                label: 'CAGR Calculator' },
  { href: '/calculators/step-up-sip-calculator',         label: 'Step-Up SIP Calculator' },
  { href: '/calculators/mutual-fund-calculator',         label: 'Mutual Fund Calculator' },
  { href: '/calculators/capital-gains-calculator',       label: 'Capital Gains Calculator' },
];
const MORE: NavItem[] = [
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/portfolio-return-calculator',      label: 'Portfolio Return Calculator' },
  { href: '/calculators/real-return-calculator',           label: 'Real Return Calculator' },
  { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
  { href: '/calculators/sip-vs-lumpsum-calculator',        label: 'SIP vs Lumpsum Calculator' },
];

export default function ETFReturnCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { settings, updateSettings } = useCalculatorSettings('etf-return-v2', defaultSettings);
  const { selectedCurrency, convertCurrency } = useCurrency();
  const ltcgExemption = convertCurrency(LTCG_EXEMPTION);
  const { activeTab, units, buyPrice, currentPrice, priceYears, monthlySip, lumpsum, indexReturn, expenseRatio, mfReturn, mfExpense, years, chargePct } = settings;

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
  const money0 = (n: number) => `${n < 0 ? '-' : ''}${sym}${new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(Math.abs(n))}`;
  const money2 = (n: number) => `${sym}${new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)}`;
  const moneyShort = (n: number) => {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (isInr && abs >= 1e7) return `${sign}${sym}${(abs / 1e7).toFixed(2)} Cr`;
    if (isInr && abs >= 1e5) return `${sign}${sym}${(abs / 1e5).toFixed(2)} L`;
    return money0(n);
  };
  const pct = (n: number) => `${n.toFixed(2)}%`;

  const isPrice = activeTab === 'price';
  const isSip = activeTab === 'sip';
  const isCompare = activeTab === 'compare';

  const px = useMemo(() => calcFromPrice(units, buyPrice, currentPrice, priceYears, chargePct, ltcgExemption), [units, buyPrice, currentPrice, priceYears, chargePct, ltcgExemption]);
  const sip = useMemo(() => calcSip(monthlySip, indexReturn, expenseRatio, years, chargePct, ltcgExemption), [monthlySip, indexReturn, expenseRatio, years, chargePct, ltcgExemption]);
  const cmp = useMemo(
    () => calcEtfVsMf({ invest: lumpsum, etfReturnPct: indexReturn, etfExpensePct: expenseRatio, mfReturnPct: mfReturn, mfExpensePct: mfExpense, years, chargePct }, ltcgExemption),
    [lumpsum, indexReturn, expenseRatio, mfReturn, mfExpense, years, chargePct, ltcgExemption],
  );

  const netRate = indexReturn - expenseRatio;
  const mfNetRate = mfReturn - mfExpense;
  const feeShareOfReturn = indexReturn > 0 ? Math.min(100, (expenseRatio / indexReturn) * 100) : 0;
  const c = Math.max(0, chargePct) / 100;

  // One shape for the active tab keeps the result panel and the donut free of branching.
  const view = isPrice
    ? { has: px.invested > 0, invested: px.invested, value: px.currentValue, gain: px.gain }
    : isSip
      ? { has: sip.rows.length > 0, invested: sip.invested, value: sip.netProceeds, gain: sip.gain }
      : { has: cmp.rows.length > 0, invested: lumpsum, value: cmp.etfFinal, gain: cmp.etfFinal - lumpsum };

  const gainShare = view.value > 0 ? Math.max(0, view.gain) / view.value : 0;
  const gainPct = Math.round(gainShare * 100);
  const investedPct = 100 - gainPct;
  const splitLabels = { dark: `Invested ${investedPct}%`, lime: `Gain ${gainPct}%` };

  const heldYears = isPrice ? priceYears : years;
  const heldLong = heldYears > 1;
  const taxLabel = heldLong ? 'Long-term tax (12.5% above Rs 1.25 lakh)' : 'Short-term tax (20%)';

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

  const resultRows: ReadonlyArray<readonly [string, string]> = isPrice ? [
    ['Amount invested', moneyShort(px.invested)],
    ['Gain before charges', moneyShort(px.gain)],
    ['Absolute return', pct(px.absoluteReturnPct)],
    ['Yearly return (CAGR)', pct(px.cagrPct)],
    ['Brokerage and charges, buy and sell', moneyShort(px.totalCharges)],
    [taxLabel, moneyShort(px.tax)],
    ['Value after charges and tax', moneyShort(px.afterTaxValue)],
    ['Yearly return after charges and tax', pct(px.netCagrPct)],
  ] : isSip ? [
    ['Total invested', moneyShort(sip.invested)],
    ['Gain before tax', moneyShort(sip.gain)],
    ['Value with no charges', moneyShort(sip.noChargeValue)],
    ['Cost of brokerage and charges', moneyShort(sip.chargeCost)],
    ['Tax, long-term and short-term parts', moneyShort(sip.tax)],
    ['Value after tax', moneyShort(sip.afterTaxValue)],
    ['Net yearly return of the fund', pct(netRate)],
  ] : [
    ['Mutual fund value', moneyShort(cmp.mfFinal)],
    [cmp.etfWins ? 'ETF lead over the mutual fund' : 'Mutual fund lead over the ETF', moneyShort(Math.abs(cmp.difference))],
    ['ETF tax', moneyShort(cmp.etfTax)],
    ['Mutual fund tax', moneyShort(cmp.mfTax)],
    ['ETF value after tax', moneyShort(cmp.etfAfterTax)],
    ['Mutual fund value after tax', moneyShort(cmp.mfAfterTax)],
    ['Mutual fund return needed to match', pct(cmp.requiredMfReturnPct)],
    ['ETF yearly return after charges and tax', pct(cmp.etfAfterTaxCagrPct)],
    ['Mutual fund yearly return after tax', pct(cmp.mfAfterTaxCagrPct)],
    ['ETF brokerage and charges, buy and sell', moneyShort(cmp.etfCharges)],
  ];

  const sipRows = sip.rows.map(r => ({ year: r.year, invested: r.invested, value: r.value * (1 - c), noCharge: r.noChargeValue }));

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>ETF Return Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            ETF returns from prices, ETF SIP growth and ETF against mutual fund in India, after brokerage, charges and tax
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="ETF Return Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div role="tablist" aria-label="ETF calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
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

                  {isPrice && (
                    <>
                      <Slider id="etf-units" label="Units Held" value={units} min={1} max={50000} step={1} fmt={v => v.toLocaleString(locale)} onChange={v => updateSettings({ units: v })} compact={mobile} />
                      <Slider id="etf-buy" label={`Buy Price per Unit (${sym})`} value={buyPrice} min={1} max={1000} step={0.5} fmt={money2} onChange={v => updateSettings({ buyPrice: v })} compact={mobile} />
                      <Slider id="etf-cur" label={`Current Price per Unit (${sym})`} value={currentPrice} min={1} max={2000} step={0.5} fmt={money2} onChange={v => updateSettings({ currentPrice: v })} compact={mobile} />
                      <Slider id="etf-price-years" label="Years Held" value={priceYears} min={1} max={30} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ priceYears: v })} compact={mobile} />
                      <PresetPills options={PRICE_YEAR_PRESETS} current={priceYears} onChange={v => updateSettings({ priceYears: v })} suffix="Y" ariaLabel="Years held presets" />
                      <Slider id="etf-charges-p" label="Brokerage and Charges per Trade (%)" value={chargePct} min={0} max={1} step={0.01} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ chargePct: v })} compact={mobile} />
                    </>
                  )}

                  {isSip && (
                    <>
                      <Slider id="etf-sip" label="Monthly ETF Investment" value={monthlySip} min={500} max={200000} step={500} fmt={moneyShort} onChange={v => updateSettings({ monthlySip: v })} compact={mobile} />
                      <Slider id="etf-index-s" label="Index Return per Year (%)" value={indexReturn} min={1} max={25} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ indexReturn: v })} compact={mobile} />
                      <Slider id="etf-er-s" label="Expense Ratio (%)" value={expenseRatio} min={0} max={2} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ expenseRatio: v })} compact={mobile} />
                      <Slider id="etf-years-s" label="SIP Duration" value={years} min={1} max={40} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                      <PresetPills options={YEAR_PRESETS} current={years} onChange={v => updateSettings({ years: v })} suffix="Y" ariaLabel="SIP duration presets" />
                      <Slider id="etf-charges-s" label="Brokerage and Charges per Trade (%)" value={chargePct} min={0} max={1} step={0.01} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ chargePct: v })} compact={mobile} />
                    </>
                  )}

                  {isCompare && (
                    <>
                      <Slider id="etf-lumpsum" label="Lumpsum Investment" value={lumpsum} min={10000} max={10000000} step={10000} fmt={moneyShort} onChange={v => updateSettings({ lumpsum: v })} compact={mobile} />
                      <Slider id="etf-index-c" label="ETF Return per Year (%)" value={indexReturn} min={1} max={25} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ indexReturn: v })} compact={mobile} />
                      <Slider id="etf-er-c" label="ETF Expense Ratio (%)" value={expenseRatio} min={0} max={2} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ expenseRatio: v })} compact={mobile} />
                      <Slider id="etf-mf-return" label="Mutual Fund Return per Year (%)" value={mfReturn} min={1} max={25} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ mfReturn: v })} compact={mobile} />
                      <Slider id="etf-mf-er" label="Mutual Fund Expense Ratio (%)" value={mfExpense} min={0} max={2.5} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ mfExpense: v })} compact={mobile} />
                      <Slider id="etf-years-c" label="Holding Period" value={years} min={1} max={40} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                      <Slider id="etf-charges-c" label="ETF Brokerage and Charges per Trade (%)" value={chargePct} min={0} max={1} step={0.01} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ chargePct: v })} compact={mobile} />
                    </>
                  )}

                  {isPrice && (
                    <div style={infoBox}>
                      <div style={infoTop}><span>Price multiple</span><span>{buyPrice > 0 ? `${(currentPrice / buyPrice).toFixed(2)}x` : '0.00x'}</span></div>
                      <div style={{ ...infoRow, marginBottom: 2 }}><span>Cost of the units</span><span>{moneyShort(units * buyPrice)}</span></div>
                      <div style={infoRow}><span>Tax treatment</span><span>{heldLong ? 'Long-term, 12.5%' : 'Short-term, 20%'}</span></div>
                    </div>
                  )}
                  {isSip && (
                    <div style={infoBox}>
                      <div style={infoTop}><span>Fund return per year</span><span>{pct(netRate)}</span></div>
                      <div style={{ ...infoRow, marginBottom: 2 }}><span>Expense ratio takes</span><span>{feeShareOfReturn.toFixed(1)}% of the index return</span></div>
                      <div style={infoRow}><span>Tax treatment</span><span>Long-term and short-term, FIFO</span></div>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  {view.has ? (
                    <>
                      <ResultBox mobile={mobile}
                        label={isPrice ? 'Value today' : isSip ? 'Value after charges' : 'ETF value after charges'}
                        value={moneyShort(view.value)} ariaLabel={`${isCompare ? 'ETF value' : 'Value'}: ${money0(view.value)}`} />
                      {resultRows.map(([label, value]) => <StatRow key={label} label={label} value={value} mobile={mobile} />)}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <SplitDonut fraction={1 - gainShare} centerLabel="Gain" centerValue={`${gainPct}%`}
                          ariaLabel={`Gain is ${gainPct}% of the final value and the amount invested ${investedPct}%`} />
                      </div>
                      <div style={{ marginBottom: mobile ? 8 : 16, width: '100%', order: mobile ? 2 : -1 }}>
                        <Legend order={0} labels={splitLabels} />
                      </div>
                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <SplitBar fraction={1 - gainShare} labels={splitLabels}
                          ariaLabel={`Amount invested is ${investedPct}% of the final value and gain ${gainPct}%`} />
                      </div>
                    </>
                  ) : (
                    <p style={{ color: C.ink3, fontSize: 14, margin: '80px 0' }}>Enter an amount and a holding period to see the result.</p>
                  )}
                </div>
              </div>

              {view.has && isPrice && px.rows.length > 0 && (
                <CollapsibleSchedule id="etf-price-schedule" mobile={mobile} title="Year-by-Year Growth Schedule" subtitle="Steady yearly growth between the two prices"
                  badge={`${priceYears} yr · ${pct(px.cagrPct)} a year`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Amount invested', lime: 'Gain' }} />
                    </div>
                    <StackedBars ariaLabel="Amount invested and gain in each year"
                      bars={px.rows.map(r => ({ label: String(r.year), dark: px.invested, lime: Math.max(0, r.value - px.invested) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {units.toLocaleString(locale)} units bought at {money2(buyPrice)} and priced at {money2(currentPrice)} after {priceYears} {priceYears === 1 ? 'year' : 'years'}. Values are before charges and tax.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={thR} scope="col">Value</th>
                          <th style={thR} scope="col">Gain</th>
                          <th style={thR} scope="col">Return so far</th>
                        </tr>
                      </thead>
                      <tbody>
                        {px.rows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.value)}</td>
                            <td style={{ ...tdR, color: r.value - px.invested >= 0 ? green : amber, fontWeight: 600 }}>{money0(r.value - px.invested)}</td>
                            <td style={tdR}>{pct(((r.value - px.invested) / px.invested) * 100)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleSchedule>
              )}

              {view.has && isSip && (
                <CollapsibleSchedule id="etf-schedule" mobile={mobile} title="Year-by-Year Growth Schedule" subtitle="Amount invested and gain, with the cost of charges"
                  badge={`${years} yr · ${pct(netRate)} net`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Amount invested', lime: 'Gain' }} />
                    </div>
                    <StackedBars ariaLabel="Amount invested and gain in each year"
                      bars={sipRows.map(r => ({ label: String(r.year), dark: r.invested, lime: Math.max(0, r.value - r.invested) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {money0(monthlySip)} a month, index return {indexReturn.toFixed(1)}%, expense ratio {expenseRatio.toFixed(2)}%, charges {chargePct.toFixed(2)}% per trade. Values are after the sale charge.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={thR} scope="col">Invested</th>
                          <th style={thR} scope="col">Value</th>
                          <th style={thR} scope="col">Gain</th>
                          <th style={thR} scope="col">No-charge value</th>
                          <th style={thR} scope="col">Charge cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sipRows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={tdR}>{money0(r.invested)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.value)}</td>
                            <td style={{ ...tdR, color: r.value - r.invested >= 0 ? green : amber, fontWeight: 600 }}>{money0(r.value - r.invested)}</td>
                            <td style={tdR}>{money0(r.noCharge)}</td>
                            <td style={{ ...tdR, color: amber }}>{money0(r.noCharge - r.value)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleSchedule>
              )}

              {view.has && isCompare && (
                <CollapsibleSchedule id="etf-compare-schedule" mobile={mobile} title="Year-by-Year Comparison" subtitle="ETF and mutual fund value in each year, before tax"
                  badge={`${years} yr · ${pct(netRate)} vs ${pct(mfNetRate)}`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Lower of the two values', lime: 'Gap between them' }} />
                    </div>
                    <StackedBars ariaLabel="The lower of the ETF and mutual fund values, and the gap between them, in each year"
                      bars={cmp.rows.map(r => ({ label: String(r.year), dark: Math.min(r.etfValue, r.mfValue), lime: Math.abs(r.etfValue - r.mfValue) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {moneyShort(lumpsum)} lumpsum. ETF values are after the buy and sale charge, and mutual fund values carry no charge.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={thR} scope="col">ETF value</th>
                          <th style={thR} scope="col">Mutual fund value</th>
                          <th style={thR} scope="col">ETF lead</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cmp.rows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.etfValue)}</td>
                            <td style={tdR}>{money0(r.mfValue)}</td>
                            <td style={{ ...tdR, fontWeight: 600, color: r.etfValue - r.mfValue >= 0 ? green : amber }}>{money0(r.etfValue - r.mfValue)}</td>
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
                <h2 style={h2} id="what-is-etf-return">What Is ETF Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    ETF return is the gain on an exchange-traded fund between the price you pay for its units and the price you sell them at. It is cut by brokerage, charges and tax, and the fund&apos;s expense ratio is already inside the price. An ETF that follows an index earns that index return less its running cost.
                  </p>
                </div>
                <p style={p}>
                  An ETF trades on the exchange like a share, so you need a demat account to hold it. Every buy and every sale carries a charge.
                </p>
                <p style={p}>
                  The calculator counts those charges and the tax, which a plain price change leaves out. The <Link href="/calculators/index-fund-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Index Fund Return Calculator</Link> does the same for the fund-house route.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-etf-returns-are-calculated">How Are ETF Returns Calculated?</h2>
                <p style={p}>
                  Absolute return is the price change as a share of the buy price, and CAGR turns it into a yearly rate.
                </p>
                <pre style={pre}>
{`Absolute return = (Current price - Buy price) / Buy price
CAGR = (Current price / Buy price) ^ (1 / Years) - 1
Net yearly return = Index return - Expense ratio
Monthly rate = (1 + Net return) ^ (1 / 12) - 1
Taxable gain = Sale value - Sale charge - (Cost + Buy charge)`}
                </pre>
                <p style={p}>
                  The SIP tab adds each instalment at month end at the effective monthly rate. Dividing the yearly rate by 12 would overstate the result slightly.
                </p>
                <p style={p}>
                  The <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>CAGR Calculator</Link> turns any start and end value into a yearly rate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-price-example">Example: 1,000 Units Bought at Rs 100 and Now at Rs 180</h2>
                <p style={p}>
                  1,000 units bought at Rs 100 and worth Rs 180 after 5 years earn 80% in total and 12.47% a year, before charges and tax.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>1,000 units, 5 years, charges of 0.10% on each trade, equity tax rates from 23 July 2024.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Item</th><th style={thR} scope="col">Amount</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Amount invested', 'Rs 1,00,000'],
                        ['Value today', 'Rs 1,80,000'],
                        ['Gain before charges', 'Rs 80,000'],
                        ['Absolute return', '80.00%'],
                        ['Yearly return (CAGR)', '12.47%'],
                        ['Charges, buy Rs 100 and sale Rs 180', 'Rs 280'],
                        ['Taxable gain after charges', 'Rs 79,720'],
                        ['Long-term tax', 'Rs 0'],
                        ['Value after charges and tax', 'Rs 1,79,820'],
                        ['Yearly return after charges and tax', '12.43%'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  No tax is due because the Rs 79,720 gain is under the Rs 1.25 lakh yearly exemption. Charges trim the yearly return by only 0.04 percentage points here.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-sip-example">ETF SIP Example: Rs 5,000 a Month for 10 and 20 Years</h2>
                <p style={p}>
                  A Rs 5,000 monthly ETF SIP at a 12% index return and a 0.10% expense ratio grows to Rs 11,01,631 in 10 years and Rs 44,92,703 in 20 years, after charges.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Rs 5,000 a month, 12% index return, 0.10% expense ratio, charges of 0.10% on each trade.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">Invested</th><th style={thR} scope="col">Value</th><th style={thR} scope="col">Tax</th><th style={thR} scope="col">After tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 3,00,000', 'Rs 3,99,940', 'Rs 733', 'Rs 3,99,208'],
                        ['10', 'Rs 6,00,000', 'Rs 11,01,631', 'Rs 47,354', 'Rs 10,54,277'],
                        ['15', 'Rs 9,00,000', 'Rs 23,32,739', 'Rs 1,63,742', 'Rs 21,68,997'],
                        ['20', 'Rs 12,00,000', 'Rs 44,92,703', 'Rs 3,96,238', 'Rs 40,96,466'],
                        ['25', 'Rs 15,00,000', 'Rs 82,82,335', 'Rs 8,32,442', 'Rs 74,49,893'],
                        ['30', 'Rs 18,00,000', 'Rs 1,49,31,199', 'Rs 16,26,050', 'Rs 1,33,05,149'],
                      ].map(([a, b, c2, d, e]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c2}</td><td style={{ ...tdR, color: amber }}>{d}</td><td style={tdR}>{e}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 20-year gain is Rs 32,92,703 on Rs 12,00,000 invested. A Rs 10,000 SIP for 10 years invests Rs 12,00,000 and ends at Rs 20,92,930 after tax.
                </p>
                <p style={p}>
                  Brokers differ on ETF SIPs, so check whether yours buys units for you. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>SIP Calculator</Link> shows the same plan for a mutual fund.
                </p>
              </div>

              <PromoBar name="Step-Up SIP Calculator" desc="Raise your monthly investment each year and see the corpus build faster." href="/calculators/step-up-sip-calculator" />

              <div style={sec}>
                <h2 style={h2} id="etf-growth-over-time">How Does a Lumpsum ETF Investment Grow Over Time?</h2>
                <p style={p}>
                  Rs 1 lakh in an ETF at a 12% index return becomes Rs 3,07,208 in 10 years and Rs 9,45,655 in 20 years, after the buy and sale charge.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh lumpsum, 12% index return, 0.10% expense ratio, charges of 0.10% on each trade.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">ETF value</th><th style={thR} scope="col">Tax</th><th style={thR} scope="col">After tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 1,75,098', 'Rs 0', 'Rs 1,75,098'],
                        ['10', 'Rs 3,07,208', 'Rs 10,276', 'Rs 2,96,932'],
                        ['15', 'Rs 5,38,992', 'Rs 39,249', 'Rs 4,99,743'],
                        ['20', 'Rs 9,45,655', 'Rs 90,082', 'Rs 8,55,573'],
                        ['25', 'Rs 16,59,140', 'Rs 1,79,268', 'Rs 14,79,873'],
                        ['30', 'Rs 29,10,942', 'Rs 3,35,743', 'Rs 25,75,199'],
                      ].map(([a, b, c2, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={{ ...tdR, color: amber }}>{c2}</td><td style={tdR}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The return you assume matters most. Over 10 years, 8%, 10%, 12% and 14% give Rs 2,13,474, Rs 2,56,512, Rs 3,07,208 and Rs 3,66,748 before tax.
                </p>
                <p style={p}>
                  Compare a one-time investment with a SIP using the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Lumpsum Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-expense-ratio-impact">How Much Does the Expense Ratio Reduce ETF Returns?</h2>
                <p style={p}>
                  A 0.05% expense ratio costs 0.9% of the final value over 20 years, and a 1% ratio costs 16.4%.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh for 20 years at a 12% index return, before charges and tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Expense ratio</th><th style={thR} scope="col">Final value</th><th style={thR} scope="col">Lost to the ratio</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['0.05%', 'Rs 9,56,053', 'Rs 8,576'],
                        ['0.1%', 'Rs 9,47,549', 'Rs 17,080'],
                        ['0.2%', 'Rs 9,30,756', 'Rs 33,873'],
                        ['0.5%', 'Rs 8,82,058', 'Rs 82,571'],
                        ['1%', 'Rs 8,06,231', 'Rs 1,58,398'],
                        ['1.5%', 'Rs 7,36,623', 'Rs 2,28,006'],
                      ].map(([a, b, c2]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={{ ...tdR, color: amber }}>{c2}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The ratio is taken from the NAV every day, so no bill ever arrives. Read it in the scheme factsheet on <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>AMFI India</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-charges-impact">How Do Brokerage and Charges Affect ETF Returns?</h2>
                <p style={p}>
                  Charges cost an ETF investor little on a long holding and more on frequent trading.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh for 10 years at a 12% index return and a 0.10% expense ratio, before tax. The charge applies to the buy and to the sale.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Charge per trade</th><th style={thR} scope="col">Final value</th><th style={thR} scope="col">Lost to charges</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['0%', 'Rs 3,07,823', 'Rs 0'],
                        ['0.05%', 'Rs 3,07,515', 'Rs 308'],
                        ['0.1%', 'Rs 3,07,208', 'Rs 615'],
                        ['0.25%', 'Rs 3,06,286', 'Rs 1,537'],
                        ['0.5%', 'Rs 3,04,752', 'Rs 3,071'],
                      ].map(([a, b, c2]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={{ ...tdR, color: amber }}>{c2}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Set the charge to your broker&apos;s real rate, including statutory levies. A SIP pays it on every instalment, so small monthly amounts feel it more.
                </p>
              </div>

              <PromoBar name="Capital Gains Calculator" desc="Work out the exact tax when you sell ETF units held over different periods." href="/calculators/capital-gains-calculator" />

              <div style={sec}>
                <h2 style={h2} id="etf-vs-mutual-fund">Is an ETF Better Than a Mutual Fund?</h2>
                <p style={p}>
                  An ETF beats a mutual fund when its lower cost outweighs the extra return the mutual fund earns.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Rs 1 lakh, 12% return on both, ETF ratio 0.10% with 0.10% charges per trade, mutual fund ratio 1%. Before tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">ETF value</th><th style={thR} scope="col">Mutual fund</th><th style={thR} scope="col">ETF lead</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 1,75,098', 'Rs 1,68,506', 'Rs 6,592'],
                        ['10', 'Rs 3,07,208', 'Rs 2,83,942', 'Rs 23,265'],
                        ['15', 'Rs 5,38,992', 'Rs 4,78,459', 'Rs 60,533'],
                        ['20', 'Rs 9,45,655', 'Rs 8,06,231', 'Rs 1,39,424'],
                        ['25', 'Rs 16,59,140', 'Rs 13,58,546', 'Rs 3,00,594'],
                        ['30', 'Rs 29,10,942', 'Rs 22,89,230', 'Rs 6,21,712'],
                      ].map(([a, b, c2, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={tdR}>{c2}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  To match the ETF, the mutual fund must earn about 12.88% before its ratio, or roughly 0.88% a year more. Some active funds manage that for a few years, and few hold it for decades.
                </p>
                <p style={p}>
                  Try your own numbers on the third tab, or use the <Link href="/calculators/mutual-fund-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Mutual Fund Calculator</Link> for a plain projection.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-vs-index-fund">What Is the Difference Between an ETF and an Index Fund?</h2>
                <p style={p}>
                  An ETF is traded on the exchange at a live price, and an index fund is bought at the day&apos;s NAV from a fund house.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>ETF against index fund.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">ETF</th><th style={thS} scope="col">Index fund</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Price', 'Live market price', 'End-of-day NAV'],
                        ['Account', 'Demat and trading account', 'Mutual fund folio'],
                        ['SIP', 'Through a broker feature or by hand', 'Easy, small amounts'],
                        ['Extra costs', 'Brokerage and spread', 'None beyond the ratio'],
                        ['Price gap to NAV', 'Possible premium or discount', 'None'],
                      ].map(([a, b, c2]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c2}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Both follow an index, so the choice is about convenience and cost. Run the fund-house version in the <Link href="/calculators/index-fund-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Index Fund Return Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-tax">How Are ETF Gains Taxed in India?</h2>
                <p style={p}>
                  Equity ETFs pay 12.5% on long-term gains above Rs 1.25 lakh a year and 20% on short-term gains, for sales on or after 23 July 2024.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Capital gains tax on equity ETFs, before surcharge and cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Holding</th><th style={thS} scope="col">Type</th><th style={thS} scope="col">Rate</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['12 months or less', 'Short-term', '20% on the gain'],
                        ['More than 12 months', 'Long-term', '12.5% on gains above Rs 1.25 lakh a year'],
                        ['Dividends', 'Income', 'Taxed at your slab rate'],
                        ['Gold and debt ETFs', 'Separate rules', 'Check the current rules before you sell'],
                      ].map(([a, b, c2]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c2}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The tax here is on the gain after charges. Confirm the rules on <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>incometaxindia.gov.in</a>, and see the <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Capital Gains Calculator</Link> for a full sale.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-limits">What Does This Calculator Leave Out?</h2>
                <p style={p}>
                  It tracks price growth with one steady return, and real prices rise and fall.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Dividends:</strong> payouts are not added. Check whether your ETF reinvests or pays them out.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Spread:</strong> the gap between the buy and sell quote is not modelled. Liquid ETFs keep it small.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Charges and tax:</strong> costs are one percentage you set, and surcharge, cess and separate DP charges are not included.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Fund data:</strong> prices, NAVs and returns of real ETFs are not stored here. Check the fund house and the exchange for current figures.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="etf-in-excel">How Do You Calculate ETF Returns in Excel?</h2>
                <p style={p}>
                  Use a simple ratio for the price change and the FV function for a SIP.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Excel and Google Sheets formulas. Enter rates as decimals, such as 0.12.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Result</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Absolute return', '=(Current-Buy)/Buy'],
                        ['CAGR', '=(Current/Buy)^(1/Years)-1'],
                        ['Lumpsum value', '=PV*(1+(Index-ER))^Years'],
                        ['SIP value', '=FV((1+(Index-ER))^(1/12)-1, Years*12, -SIP)'],
                        ['Long-term tax', '=MAX(0, Gain-125000)*0.125'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The SIP formula matches this calculator when charges are zero. The <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>XIRR Calculator</Link> handles uneven purchase dates.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This ETF Return Calculator</h2>
                <p style={p}>There are three tabs. Pick one, adjust the sliders and the result updates at once.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>From Price:</strong> enter the units, the buy price, the current price, the years held and your charges.</li>
                  <li style={li}><strong style={{ color: C.ink }}>SIP:</strong> enter the monthly amount, the index return, the expense ratio, the years and your charges.</li>
                  <li style={li}><strong style={{ color: C.ink }}>ETF vs Mutual Fund:</strong> enter a lumpsum and the return and expense ratio of each fund.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Read the result:</strong> the dark box shows the value, and the rows show the charges, tax and value after tax.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Open the dropdown for the year-by-year chart and table. Your entries are saved in this browser.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQAccordion items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All figures on this page are projections from the rates you enter. ETF prices are not guaranteed and can fall as well as rise. Tax is estimated at equity rates for sales on or after 23 July 2024 and excludes surcharge, cess, dividends and the bid-ask spread. This calculator is for education and planning and is not investment or tax advice. Consult a SEBI-registered adviser or a Chartered Accountant before you invest.
                </p>
              </div>

            </article>
          </div>

          <StickySidebar className="etf-sidebar" mobile={mobile}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </StickySidebar>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

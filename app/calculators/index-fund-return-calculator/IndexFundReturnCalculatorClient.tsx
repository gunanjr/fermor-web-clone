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
import { calcLumpsum, calcSip, calcFromNav, netReturnPct, LTCG_EXEMPTION } from './indexFundMath';

type TabId = 'lumpsum' | 'sip' | 'nav';

const defaultSettings = {
  activeTab: 'lumpsum' as TabId,
  lumpsum: 100000,
  monthlySip: 5000,
  stepUp: 0,
  indexReturn: 12,
  expenseRatio: 0.2,
  years: 10,
  navInvest: 100000,
  buyNav: 100,
  currentNav: 200,
  navYears: 5,
};

const TAB_LABELS: ReadonlyArray<readonly [TabId, string]> = [
  ['lumpsum', 'Lumpsum'],
  ['sip', 'SIP'],
  ['nav', 'From NAV'],
];

const YEAR_PRESETS = [5, 10, 15, 20, 25, 30] as const;
const NAV_YEAR_PRESETS = [1, 3, 5, 7, 10, 15] as const;

const POPULAR: NavItem[] = [
  { href: '/calculators/sip-calculator',              label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',          label: 'Lumpsum Calculator' },
  { href: '/calculators/etf-return-calculator',       label: 'ETF Return Calculator' },
  { href: '/calculators/cagr-calculator',             label: 'CAGR Calculator' },
  { href: '/calculators/step-up-sip-calculator',      label: 'Step-Up SIP Calculator' },
  { href: '/calculators/mutual-fund-calculator',      label: 'Mutual Fund Calculator' },
  { href: '/calculators/capital-gains-calculator',    label: 'Capital Gains Calculator' },
];
const MORE: NavItem[] = [
  { href: '/calculators/xirr-calculator',                      label: 'XIRR Calculator' },
  { href: '/calculators/portfolio-return-calculator',          label: 'Portfolio Return Calculator' },
  { href: '/calculators/real-return-calculator',               label: 'Real Return Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator',            label: 'SIP vs Lumpsum Calculator' },
  { href: '/calculators/compound-interest-calculator',         label: 'Compound Interest Calculator' },
];

export default function IndexFundReturnCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { settings, updateSettings } = useCalculatorSettings('index-fund-return-v2', defaultSettings);
  const { selectedCurrency, convertCurrency } = useCurrency();
  const ltcgExemption = convertCurrency(LTCG_EXEMPTION);
  const { activeTab, lumpsum, monthlySip, stepUp, indexReturn, expenseRatio, years, navInvest, buyNav, currentNav, navYears } = settings;

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
  const moneyShort = (n: number) => {
    const abs = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (isInr && abs >= 1e7) return `${sign}${sym}${(abs / 1e7).toFixed(2)} Cr`;
    if (isInr && abs >= 1e5) return `${sign}${sym}${(abs / 1e5).toFixed(2)} L`;
    return money0(n);
  };
  const pct = (n: number) => `${n.toFixed(2)}%`;

  const isLumpsum = activeTab === 'lumpsum';
  const isSip = activeTab === 'sip';
  const isNav = activeTab === 'nav';

  const lump = useMemo(() => calcLumpsum(lumpsum, indexReturn, expenseRatio, years, ltcgExemption), [lumpsum, indexReturn, expenseRatio, years, ltcgExemption]);
  const sip = useMemo(() => calcSip(monthlySip, stepUp, indexReturn, expenseRatio, years, ltcgExemption), [monthlySip, stepUp, indexReturn, expenseRatio, years, ltcgExemption]);
  const nav = useMemo(() => calcFromNav(navInvest, buyNav, currentNav, navYears, ltcgExemption), [navInvest, buyNav, currentNav, navYears, ltcgExemption]);

  const netRate = netReturnPct(indexReturn, expenseRatio);
  const feeShareOfReturn = indexReturn > 0 ? Math.min(100, (expenseRatio / indexReturn) * 100) : 0;

  // One shape for the active tab keeps the result panel and the donut free of branching.
  const view = isLumpsum
    ? { has: lump.rows.length > 0, invested: lumpsum, value: lump.finalValue, gain: lump.gain, tax: lump.tax, after: lump.afterTaxValue }
    : isSip
      ? { has: sip.rows.length > 0, invested: sip.invested, value: sip.finalValue, gain: sip.gain, tax: sip.tax, after: sip.afterTaxValue }
      : { has: nav.units > 0, invested: navInvest, value: nav.currentValue, gain: nav.gain, tax: nav.tax, after: nav.afterTaxValue };

  const gainShare = view.value > 0 ? Math.max(0, view.gain) / view.value : 0;
  const gainPct = Math.round(gainShare * 100);
  const investedPct = 100 - gainPct;
  const splitLabels = { dark: `Invested ${investedPct}%`, lime: `Gain ${gainPct}%` };

  const heldLong = (isNav ? navYears : years) > 1;

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

  const resultRows: ReadonlyArray<readonly [string, string]> = isLumpsum ? [
    ['Amount invested', moneyShort(lumpsum)],
    ['Gain before tax', moneyShort(lump.gain)],
    ['Value with no expense ratio', moneyShort(lump.noFeeValue)],
    ['Cost of the expense ratio', moneyShort(lump.feeCost)],
    [heldLong ? 'Long-term tax (12.5% above Rs 1.25 lakh)' : 'Short-term tax (20%)', moneyShort(lump.tax)],
    ['Value after tax', moneyShort(lump.afterTaxValue)],
    ['Net yearly return', pct(lump.netCagrPct)],
  ] : isSip ? [
    ['Total invested', moneyShort(sip.invested)],
    ['Gain before tax', moneyShort(sip.gain)],
    ['Value with no expense ratio', moneyShort(sip.noFeeValue)],
    ['Cost of the expense ratio', moneyShort(sip.feeCost)],
    ['Tax, long-term and short-term parts', moneyShort(sip.tax)],
    ['Value after tax', moneyShort(sip.afterTaxValue)],
    ['SIP in the final year', `${money0(sip.finalYearSip)} a month`],
  ] : [
    ['Amount invested', moneyShort(navInvest)],
    ['Units bought', nav.units.toLocaleString(locale, { maximumFractionDigits: 3 })],
    ['Gain before tax', moneyShort(nav.gain)],
    ['Absolute return', pct(nav.absoluteReturnPct)],
    ['Yearly return (CAGR)', pct(nav.cagrPct)],
    [heldLong ? 'Long-term tax (12.5% above Rs 1.25 lakh)' : 'Short-term tax (20%)', moneyShort(nav.tax)],
    ['Value after tax', moneyShort(nav.afterTaxValue)],
  ];

  const scheduleRows = isLumpsum
    ? lump.rows.map(r => ({ year: r.year, invested: lumpsum, value: r.netValue, noFee: r.noFeeValue, sip: 0 }))
    : sip.rows.map(r => ({ year: r.year, invested: r.invested, value: r.value, noFee: r.noFeeValue, sip: r.monthlySip }));

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Index Fund Return Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Lumpsum, SIP and NAV-based index fund returns in India, after the expense ratio and capital gains tax
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Index Fund Return Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div role="tablist" aria-label="Index fund calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
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

                  {isLumpsum && (
                    <>
                      <Slider id="if-lumpsum" label="Lumpsum Investment" value={lumpsum} min={10000} max={10000000} step={10000} fmt={moneyShort} onChange={v => updateSettings({ lumpsum: v })} compact={mobile} />
                      <Slider id="if-index-l" label="Index Return per Year (%)" value={indexReturn} min={1} max={25} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ indexReturn: v })} compact={mobile} />
                      <Slider id="if-er-l" label="Expense Ratio (%)" value={expenseRatio} min={0} max={2.5} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ expenseRatio: v })} compact={mobile} />
                      <Slider id="if-years-l" label="Holding Period" value={years} min={1} max={40} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                      <PresetPills options={YEAR_PRESETS} current={years} onChange={v => updateSettings({ years: v })} suffix="Y" ariaLabel="Holding period presets" />
                    </>
                  )}

                  {isSip && (
                    <>
                      <Slider id="if-sip" label="Monthly SIP" value={monthlySip} min={500} max={200000} step={500} fmt={moneyShort} onChange={v => updateSettings({ monthlySip: v })} compact={mobile} />
                      <Slider id="if-stepup" label="Yearly Step-Up" value={stepUp} min={0} max={25} step={1} fmt={v => `${v}%`} onChange={v => updateSettings({ stepUp: v })} compact={mobile} />
                      <Slider id="if-index-s" label="Index Return per Year (%)" value={indexReturn} min={1} max={25} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ indexReturn: v })} compact={mobile} />
                      <Slider id="if-er-s" label="Expense Ratio (%)" value={expenseRatio} min={0} max={2.5} step={0.05} fmt={v => `${v.toFixed(2)}%`} onChange={v => updateSettings({ expenseRatio: v })} compact={mobile} />
                      <Slider id="if-years-s" label="SIP Duration" value={years} min={1} max={40} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                      <PresetPills options={YEAR_PRESETS} current={years} onChange={v => updateSettings({ years: v })} suffix="Y" ariaLabel="SIP duration presets" />
                    </>
                  )}

                  {isNav && (
                    <>
                      <Slider id="if-nav-invest" label="Amount Invested" value={navInvest} min={10000} max={10000000} step={10000} fmt={moneyShort} onChange={v => updateSettings({ navInvest: v })} compact={mobile} />
                      <Slider id="if-buy-nav" label={`Purchase NAV (${sym})`} value={buyNav} min={1} max={1000} step={0.5} fmt={v => money0(v)} onChange={v => updateSettings({ buyNav: v })} compact={mobile} />
                      <Slider id="if-cur-nav" label={`Current NAV (${sym})`} value={currentNav} min={1} max={2000} step={0.5} fmt={v => money0(v)} onChange={v => updateSettings({ currentNav: v })} compact={mobile} />
                      <Slider id="if-nav-years" label="Years Held" value={navYears} min={1} max={30} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ navYears: v })} compact={mobile} />
                      <PresetPills options={NAV_YEAR_PRESETS} current={navYears} onChange={v => updateSettings({ navYears: v })} suffix="Y" ariaLabel="Years held presets" />
                    </>
                  )}

                  {!isNav ? (
                    <div style={infoBox}>
                      <div style={infoTop}><span>Fund return per year</span><span>{pct(netRate)}</span></div>
                      <div style={{ ...infoRow, marginBottom: 2 }}><span>Expense ratio takes</span><span>{feeShareOfReturn.toFixed(1)}% of the index return</span></div>
                      <div style={infoRow}><span>Tax treatment</span><span>{heldLong ? 'Long-term, 12.5%' : 'Short-term, 20%'}</span></div>
                    </div>
                  ) : (
                    <div style={infoBox}>
                      <div style={infoTop}><span>NAV multiple</span><span>{buyNav > 0 ? `${(currentNav / buyNav).toFixed(2)}x` : '0.00x'}</span></div>
                      <div style={{ ...infoRow, marginBottom: 2 }}><span>Units you hold</span><span>{buyNav > 0 ? (navInvest / buyNav).toLocaleString(locale, { maximumFractionDigits: 2 }) : '0'}</span></div>
                      <div style={infoRow}><span>Tax treatment</span><span>{heldLong ? 'Long-term, 12.5%' : 'Short-term, 20%'}</span></div>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  {view.has ? (
                    <>
                      <ResultBox mobile={mobile} label={isNav ? 'Current value' : 'Fund value at the end'} value={moneyShort(view.value)} ariaLabel={`Fund value: ${money0(view.value)}`} />
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

              {view.has && isNav && nav.rows.length > 0 && (
                <CollapsibleSchedule id="if-nav-schedule" mobile={mobile} title="Year-by-Year Growth Schedule" subtitle="Steady yearly growth between the two NAVs"
                  badge={`${navYears} yr · ${pct(nav.cagrPct)} a year`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Amount invested', lime: 'Gain' }} />
                    </div>
                    <StackedBars ariaLabel="Amount invested and gain in each year"
                      bars={nav.rows.map(r => ({ label: String(r.year), dark: navInvest, lime: Math.max(0, r.value - navInvest) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {moneyShort(navInvest)} bought at a NAV of {money0(buyNav)} and now at {money0(currentNav)} after {navYears} {navYears === 1 ? 'year' : 'years'}. Values are before tax.
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
                        {nav.rows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.value)}</td>
                            <td style={{ ...tdR, color: r.value - navInvest >= 0 ? green : amber, fontWeight: 600 }}>{money0(r.value - navInvest)}</td>
                            <td style={tdR}>{pct(((r.value - navInvest) / navInvest) * 100)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleSchedule>
              )}

              {view.has && !isNav && (
                <CollapsibleSchedule id="if-schedule" mobile={mobile} title="Year-by-Year Growth Schedule" subtitle="Amount invested and gain, with the cost of the expense ratio"
                  badge={`${years} yr · ${pct(netRate)} net`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Amount invested', lime: 'Gain' }} />
                    </div>
                    <StackedBars ariaLabel="Amount invested and gain in each year"
                      bars={scheduleRows.map(r => ({ label: String(r.year), dark: r.invested, lime: Math.max(0, r.value - r.invested) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: isSip ? 760 : 640, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {isLumpsum ? `${moneyShort(lumpsum)} lumpsum` : `${money0(monthlySip)} a month, ${stepUp}% yearly step-up`}, index return {indexReturn.toFixed(1)}%, expense ratio {expenseRatio.toFixed(2)}%.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          {isSip && <th style={thR} scope="col">Monthly SIP</th>}
                          <th style={thR} scope="col">Invested</th>
                          <th style={thR} scope="col">Fund value</th>
                          <th style={thR} scope="col">Gain</th>
                          <th style={thR} scope="col">No-fee value</th>
                          <th style={thR} scope="col">Fee cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleRows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            {isSip && <td style={tdR}>{money0(r.sip)}</td>}
                            <td style={tdR}>{money0(r.invested)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.value)}</td>
                            <td style={{ ...tdR, color: r.value - r.invested >= 0 ? green : amber, fontWeight: 600 }}>{money0(r.value - r.invested)}</td>
                            <td style={tdR}>{money0(r.noFee)}</td>
                            <td style={{ ...tdR, color: amber }}>{money0(r.noFee - r.value)}</td>
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
                <h2 style={h2} id="what-is-index-fund-return">What Is Index Fund Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Index fund return is the gain on a fund that holds the stocks of a market index in the same weights as the index itself. It follows the index return less the fund&apos;s expense ratio, since the fund buys and tracks the index rather than picking stocks. The fund tries to match the index as closely as it can, not beat it.
                  </p>
                </div>
                <p style={p}>
                  The expense ratio is already taken out of the NAV every day. So a 12% index and a 0.2% ratio gives a fund return of about 11.8% a year.
                </p>
                <p style={p}>
                  Index funds are the low-cost route into the market, and they suit long SIPs. The <Link href="/calculators/etf-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>ETF Return Calculator</Link> covers the exchange-traded version of the same idea.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-index-fund-returns-are-calculated">How Are Index Fund Returns Calculated?</h2>
                <p style={p}>
                  The calculator takes the index return, subtracts the expense ratio and compounds the result over the years you hold.
                </p>
                <pre style={pre}>
{`Net yearly return = Index return - Expense ratio
Lumpsum value = Amount x (1 + Net return) ^ Years
Monthly rate = (1 + Net return) ^ (1 / 12) - 1
SIP value = each instalment grown at the monthly rate, paid at month end
CAGR from NAV = (Current NAV / Purchase NAV) ^ (1 / Years) - 1`}
                </pre>
                <p style={p}>
                  The SIP uses the effective monthly rate, not the yearly rate divided by 12. Dividing by 12 slightly overstates the result.
                </p>
                <p style={p}>
                  Tax is worked out on the gain you would book if you sold everything at the end. The <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>CAGR Calculator</Link> turns any start and end value into a yearly rate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lumpsum-worked-example">Lumpsum Example: Rs 1 Lakh at 12% for 10 Years</h2>
                <p style={p}>
                  Rs 1 lakh at a 12% index return and a 0.2% expense ratio becomes Rs 3,05,083 in 10 years, and Rs 2,95,073 after tax.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh lumpsum, 12% index return, 0.2% expense ratio, equity tax rates from 23 July 2024.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">Fund value</th><th style={thR} scope="col">Tax</th><th style={thR} scope="col">After tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 1,74,666', 'Rs 0', 'Rs 1,74,666'],
                        ['10', 'Rs 3,05,083', 'Rs 10,010', 'Rs 2,95,073'],
                        ['15', 'Rs 5,32,877', 'Rs 38,485', 'Rs 4,94,392'],
                        ['20', 'Rs 9,30,756', 'Rs 88,220', 'Rs 8,42,537'],
                        ['25', 'Rs 16,25,718', 'Rs 1,75,090', 'Rs 14,50,628'],
                        ['30', 'Rs 28,39,580', 'Rs 3,26,822', 'Rs 25,12,757'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={{ ...tdR, color: amber }}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 5-year gain of Rs 74,666 is under the Rs 1.25 lakh exemption, so no tax is due. Ten years gives a net yearly return of 11.80%.
                </p>
                <p style={p}>
                  The index return you assume matters more than any other input. At a 0.2% expense ratio over 10 years, 8%, 10%, 12% and 14% give Rs 2,11,928, Rs 2,54,697, Rs 3,05,083 and Rs 3,64,269.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="sip-worked-example">SIP Example: Rs 5,000 a Month for 10 and 20 Years</h2>
                <p style={p}>
                  A Rs 5,000 monthly SIP at a 12% index return and a 0.2% expense ratio grows to Rs 10,98,057 in 10 years and Rs 44,48,044 in 20 years.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Rs 5,000 a month, no step-up, 12% index return, 0.2% expense ratio.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">Invested</th><th style={thR} scope="col">Fund value</th><th style={thR} scope="col">Tax</th><th style={thR} scope="col">After tax</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 3,00,000', 'Rs 3,99,779', 'Rs 754', 'Rs 3,99,025'],
                        ['10', 'Rs 6,00,000', 'Rs 10,98,057', 'Rs 46,915', 'Rs 10,51,142'],
                        ['15', 'Rs 9,00,000', 'Rs 23,17,714', 'Rs 1,61,872', 'Rs 21,55,842'],
                        ['20', 'Rs 12,00,000', 'Rs 44,48,044', 'Rs 3,90,663', 'Rs 40,57,380'],
                        ['25', 'Rs 15,00,000', 'Rs 81,69,010', 'Rs 8,18,284', 'Rs 73,50,726'],
                        ['30', 'Rs 18,00,000', 'Rs 1,46,68,283', 'Rs 15,93,193', 'Rs 1,30,75,090'],
                      ].map(([a, b, c, d, e]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td><td style={{ ...tdR, color: amber }}>{d}</td><td style={tdR}>{e}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The 20-year gain is Rs 32,48,044 on Rs 12,00,000 invested. The last 12 months of instalments are taxed as short-term at 20%, and the older ones as long-term.
                </p>
                <p style={p}>
                  A step-up lifts the result sharply. Rs 10,000 a month with a 10% yearly step-up for 20 years invests Rs 68,73,000 and grows to Rs 1,81,11,959.
                </p>
              </div>

              <PromoBar name="Step-Up SIP Calculator" desc="Raise your SIP every year and see the corpus build faster." href="/calculators/step-up-sip-calculator" />

              <div style={sec}>
                <h2 style={h2} id="expense-ratio-impact">How Much Does the Expense Ratio Reduce Your Return?</h2>
                <p style={p}>
                  A 0.2% expense ratio costs 3.5% of the final value over 20 years, and a 1% ratio costs 16.4%.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh for 20 years at a 12% index return, before tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Expense ratio</th><th style={thR} scope="col">Final value</th><th style={thR} scope="col">Lost to fees</th><th style={thR} scope="col">Share lost</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['0%', 'Rs 9,64,629', 'Rs 0', '0.00%'],
                        ['0.1%', 'Rs 9,47,549', 'Rs 17,080', '1.77%'],
                        ['0.2%', 'Rs 9,30,756', 'Rs 33,873', '3.51%'],
                        ['0.5%', 'Rs 8,82,058', 'Rs 82,571', '8.56%'],
                        ['1%', 'Rs 8,06,231', 'Rs 1,58,398', '16.42%'],
                        ['1.5%', 'Rs 7,36,623', 'Rs 2,28,006', '23.64%'],
                        ['2%', 'Rs 6,72,750', 'Rs 2,91,879', '30.26%'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={{ ...tdR, color: amber }}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The cost compounds because every fee rupee also stops earning. Choose the direct plan and compare the ratio in the scheme factsheet on <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>AMFI India</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="index-vs-active">Does an Index Fund Beat an Active Fund?</h2>
                <p style={p}>
                  An index fund wins whenever the active fund fails to out-earn its extra cost, and the extra cost is the bar it must clear.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Yearly outperformance an active fund needs over an index fund charging 0.2%, before tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Active fund ratio</th><th style={thR} scope="col">Index fund ratio</th><th style={thR} scope="col">Needs to beat the index by</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['1.0%', '0.2%', '0.8% a year'],
                        ['1.5%', '0.2%', '1.3% a year'],
                        ['2.0%', '0.2%', '1.8% a year'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, fontWeight: 700 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Some active funds clear that bar for a few years, and few do it for decades. Judge each fund against its own benchmark, not against a peer.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="index-fund-tax">How Are Index Fund Gains Taxed in India?</h2>
                <p style={p}>
                  Equity index funds pay 12.5% on long-term gains above Rs 1.25 lakh a year and 20% on short-term gains, for sales on or after 23 July 2024.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Capital gains tax on equity-oriented index funds, before surcharge and cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Holding</th><th style={thS} scope="col">Type</th><th style={thS} scope="col">Rate</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['12 months or less', 'Short-term', '20% on the gain'],
                        ['More than 12 months', 'Long-term', '12.5% on gains above Rs 1.25 lakh a year'],
                        ['Dividends (IDCW plans)', 'Income', 'Taxed at your slab rate'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Confirm the current rules on <a href="https://incometaxindia.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>incometaxindia.gov.in</a>. The <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Capital Gains Calculator</Link> handles a sale in detail.
                </p>
              </div>

              <PromoBar name="Lumpsum Calculator" desc="Compare a one-time investment with the SIP result on the same return." href="/calculators/lumpsum-calculator" />

              <div style={sec}>
                <h2 style={h2} id="nifty-vs-sensex">What Is the Difference Between Nifty 50 and Sensex Index Funds?</h2>
                <p style={p}>
                  A Nifty 50 fund tracks the 50-company NSE index, and a Sensex fund tracks the 30-company BSE index.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Nifty 50 and Sensex index funds compared.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">Nifty 50</th><th style={thS} scope="col">Sensex</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Exchange', 'NSE', 'BSE'],
                        ['Companies', '50', '30'],
                        ['Segment', 'Large caps', 'Large caps'],
                        ['Typical overlap', 'High with the Sensex', 'High with the Nifty 50'],
                        ['Fund choice', 'More schemes', 'Fewer schemes'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Returns are usually close, so cost and tracking quality decide. Read each index factsheet on <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>NSE India</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>BSE India</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="index-fund-vs-etf">What Is the Difference Between an Index Fund and an ETF?</h2>
                <p style={p}>
                  An index fund is bought at the day&apos;s NAV from a fund house, and an ETF is bought on the exchange at the market price.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                    <caption style={capS}>Index fund against ETF.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">Index fund</th><th style={thS} scope="col">ETF</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Price', 'End-of-day NAV', 'Live market price'],
                        ['Account', 'Mutual fund folio', 'Demat and trading account'],
                        ['SIP', 'Easy, small amounts', 'Possible with a broker'],
                        ['Extra costs', 'None beyond the ratio', 'Brokerage and spread'],
                        ['Trading', 'Once a day', 'Through market hours'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Both track an index, so the choice is about convenience. Use the <Link href="/calculators/etf-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>ETF Return Calculator</Link> to include brokerage.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tracking-difference">What Are Tracking Difference and Tracking Error?</h2>
                <p style={p}>
                  Tracking difference is the fund return minus the index return, and tracking error is how much that gap moves.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Tracking difference:</strong> usually a little below zero, because the fund pays costs the index does not.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Tracking error:</strong> the spread of the daily gap. A low figure means the fund copies the index closely.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Where to find them:</strong> the scheme factsheet and the fund house disclosures on <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>AMFI India</a>.</li>
                </ul>
                <p style={p}>
                  This calculator treats the expense ratio as the whole gap. Real funds can differ by a little more or less.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="index-fund-limits">What Does This Calculator Leave Out?</h2>
                <p style={p}>
                  It assumes a steady index return every year, and real returns rise and fall.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Charges:</strong> exit load, STT, stamp duty and brokerage are not included.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Tax:</strong> surcharge and cess are not included, and the Rs 1.25 lakh exemption is applied once to the final sale.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Inflation:</strong> values are in future rupees. The <Link href="/calculators/real-return-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Real Return Calculator</Link> adjusts for it.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Fund data:</strong> NAVs, returns and ratios of real funds are not stored here. Check the fund house for current figures.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="index-fund-in-excel">How Do You Calculate Index Fund Returns in Excel?</h2>
                <p style={p}>
                  Subtract the expense ratio from the index return, then use the FV function for a SIP.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Excel and Google Sheets formulas. Enter rates as decimals, such as 0.12.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Result</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Net yearly return', '=Index-ER'],
                        ['Lumpsum value', '=PV*(1+(Index-ER))^Years'],
                        ['SIP value', '=FV((1+(Index-ER))^(1/12)-1, Years*12, -SIP)'],
                        ['CAGR from NAV', '=(End/Start)^(1/Years)-1'],
                        ['Long-term tax', '=MAX(0, Gain-125000)*0.125'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The SIP formula matches this calculator when there is no step-up. The <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>SIP Calculator</Link> gives a quick check.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Index Fund Calculator</h2>
                <p style={p}>There are three tabs. Pick one, adjust the sliders and the result updates at once.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Lumpsum:</strong> enter the amount, the index return, the expense ratio and the years.</li>
                  <li style={li}><strong style={{ color: C.ink }}>SIP:</strong> enter the monthly amount and an optional yearly step-up, then the same three inputs.</li>
                  <li style={li}><strong style={{ color: C.ink }}>From NAV:</strong> enter the amount, the NAV you bought at, the NAV today and the years held.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Read the result:</strong> the dark box shows the fund value, and the rows show the fee cost, tax and value after tax.</li>
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
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All figures on this page are projections from the rates you enter. Index returns are not guaranteed and can be negative over any period. Tax is estimated at equity rates for sales on or after 23 July 2024 and excludes surcharge, cess, exit load and other charges. This calculator is for education and planning and is not investment or tax advice. Consult a SEBI-registered adviser or a Chartered Accountant before you invest.
                </p>
              </div>

            </article>
          </div>

          <StickySidebar className="indexfund-sidebar" mobile={mobile}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </StickySidebar>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

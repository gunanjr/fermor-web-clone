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
  C, INTER, Slider, PresetPills, SplitDonut, StackedBars, Legend, SplitBar, StatRow, ResultBox,
  CollapsibleSchedule, SidebarList, StickySidebar, PromoBar, FAQAccordion, tableStyles,
  type FaqItem, type NavItem,
} from '../../../src/components/calculators/CalcUi';
import { calcDrip } from './dripMath';

const defaultSettings = {
  initialInvestment: 100000,
  dividendYield: 3,
  dividendGrowth: 8,
  years: 10,
  priceAppreciation: 8,
  slab: 30,
};

const YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 30] as const;

const POPULAR: NavItem[] = [
  { href: '/calculators/dividend-yield-calculator',   label: 'Dividend Yield Calculator' },
  { href: '/calculators/stock-average-calculator',    label: 'Stock Average Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/cagr-calculator',             label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator',              label: 'SIP Calculator' },
  { href: '/calculators/stock-return-calculator',     label: 'Stock Return Calculator' },
  { href: '/calculators/lumpsum-calculator',          label: 'Lumpsum Calculator' },
];
const MORE: NavItem[] = [
  { href: '/calculators/dividend-tax-calculator',     label: 'Dividend Tax Calculator' },
  { href: '/calculators/xirr-calculator',             label: 'XIRR Calculator' },
  { href: '/calculators/step-up-sip-calculator',      label: 'Step-Up SIP Calculator' },
  { href: '/calculators/wealth-growth-calculator',    label: 'Wealth Growth Calculator' },
  { href: '/calculators/portfolio-return-calculator', label: 'Portfolio Return Calculator' },
];

export default function DividendReinvestmentCalculatorClient({ faqItems }: { faqItems: FaqItem[] }) {
  const { settings, updateSettings } = useCalculatorSettings('drip-calculator', defaultSettings);
  const { selectedCurrency } = useCurrency();
  const { initialInvestment, dividendYield, dividendGrowth, years, priceAppreciation, slab } = settings;

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

  const result = useMemo(
    () => calcDrip({ invest: initialInvestment, yieldPct: dividendYield, divGrowthPct: dividendGrowth, apprPct: priceAppreciation, years, slabPct: slab }),
    [initialInvestment, dividendYield, dividendGrowth, priceAppreciation, years, slab],
  );
  const hasResult = result.rows.length > 0;
  const startShares = initialInvestment / 100;
  const finalRow = result.rows[result.rows.length - 1];

  const dividendPct = Math.round(result.dividendGainShare * 100);
  const pricePct = 100 - dividendPct;
  const gainLabels = { dark: `Price growth ${pricePct}%`, lime: `Dividends ${dividendPct}%` };

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

  const resultRows: ReadonlyArray<readonly [string, string]> = [
    ['Without DRIP (shares plus cash)', moneyShort(result.noDripFinal)],
    ['DRIP advantage', `${moneyShort(result.advantage)} (${pct(result.advantagePct)})`],
    ['Cash kept without DRIP', moneyShort(finalRow ? finalRow.noDripCash : 0)],
    ['Dividends paid, before tax', moneyShort(result.totalGross)],
    ['Tax paid on dividends', moneyShort(result.totalTax)],
    ['Net dividends reinvested', moneyShort(result.totalNetReinvested)],
    ['Share count after DRIP', `${result.shareMultiple.toFixed(2)}x`],
    ['Yearly return with DRIP', pct(result.dripCagrPct)],
    ['Yearly return without DRIP', pct(result.noDripCagrPct)],
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Dividend Reinvestment (DRIP) Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare reinvesting dividends with taking them as cash, after tax, with the cash you receive counted
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Dividend Reinvestment Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {mobile ? <div /> : <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider id="drip-initial" label="Initial Investment" value={initialInvestment} min={10000} max={10000000} step={10000} fmt={moneyShort} onChange={v => updateSettings({ initialInvestment: v })} compact={mobile} />
                  <Slider id="drip-yield" label="Dividend Yield on Your Price (%)" value={dividendYield} min={0} max={15} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ dividendYield: v })} compact={mobile} />
                  <Slider id="drip-div-growth" label="Annual Dividend Growth" value={dividendGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ dividendGrowth: v })} compact={mobile} />
                  <Slider id="drip-appr" label="Share Price Growth per Year" value={priceAppreciation} min={-10} max={30} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={v => updateSettings({ priceAppreciation: v })} compact={mobile} />
                  <Slider id="drip-years" label="Investment Horizon" value={years} min={1} max={30} step={1} fmt={v => `${v} yr`} onChange={v => updateSettings({ years: v })} compact={mobile} />
                  <PresetPills options={YEAR_PRESETS} current={years} onChange={v => updateSettings({ years: v })} suffix="Y" ariaLabel="Horizon presets" />
                  <Slider id="drip-slab" label="Your Tax Slab Rate" value={slab} min={0} max={30} step={5} fmt={v => `${v}%`} onChange={v => updateSettings({ slab: v })} compact={mobile} />

                  <div style={infoBox}>
                    <div style={infoTop}><span>Dividend in year 1</span><span>{moneyShort(initialInvestment * dividendYield / 100)}</span></div>
                    <div style={{ ...infoRow, marginBottom: 2 }}><span>After tax in year 1</span><span>{moneyShort((initialInvestment * dividendYield / 100) * (1 - (slab / 100) * 1.04))}</span></div>
                    <div style={infoRow}><span>Yield stays level when</span><span>growth equals price growth</span></div>
                  </div>
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  {hasResult ? (
                    <>
                      <ResultBox mobile={mobile} label="With DRIP" value={moneyShort(result.dripFinal)} ariaLabel={`Value with DRIP: ${money0(result.dripFinal)}`} />
                      {resultRows.map(([label, value]) => <StatRow key={label} label={label} value={value} mobile={mobile} />)}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <SplitDonut fraction={1 - result.dividendGainShare} centerLabel="From dividends" centerValue={`${dividendPct}%`}
                          ariaLabel={`Dividends make up ${dividendPct}% of the total gain and price growth ${pricePct}%`} />
                      </div>
                      <div style={{ marginBottom: mobile ? 8 : 16, width: '100%', order: mobile ? 2 : -1 }}>
                        <Legend order={0} labels={gainLabels} />
                      </div>
                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <SplitBar fraction={1 - result.dividendGainShare} labels={gainLabels}
                          ariaLabel={`Price growth is ${pricePct}% of the gain and dividends ${dividendPct}%`} />
                      </div>
                    </>
                  ) : (
                    <p style={{ color: C.ink3, fontSize: 14, margin: '80px 0' }}>Enter an investment amount to see the result.</p>
                  )}
                </div>
              </div>

              {hasResult && (
                <CollapsibleSchedule id="drip-schedule" mobile={mobile} title="Year-by-Year DRIP Schedule" subtitle="Value with DRIP against shares plus cash" badge={`${years} yr · ${dividendYield.toFixed(1)}% yield`}>
                  <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                    <div style={{ marginBottom: 10 }}>
                      <Legend order={0} labels={{ dark: 'Without DRIP (shares plus cash)', lime: 'Extra from DRIP' }} />
                    </div>
                    <StackedBars ariaLabel="Value without DRIP and the extra value from DRIP in each year"
                      bars={result.rows.map(r => ({ label: String(r.year), dark: r.noDripTotal, lime: Math.max(0, r.advantage) }))} />
                  </div>
                  <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                    <table style={{ minWidth: 760, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ ...capS, padding: '8px 14px' }}>
                        {moneyShort(initialInvestment)} invested, {dividendYield.toFixed(1)}% yield, dividend growth {dividendGrowth.toFixed(1)}%, price growth {priceAppreciation.toFixed(1)}%, {slab}% slab plus cess.
                      </caption>
                      <thead>
                        <tr>
                          <th style={thS} scope="col">Year</th>
                          <th style={thR} scope="col">Share count</th>
                          <th style={thR} scope="col">Dividend</th>
                          <th style={thR} scope="col">Tax</th>
                          <th style={thR} scope="col">Reinvested</th>
                          <th style={thR} scope="col">With DRIP</th>
                          <th style={thR} scope="col">Without DRIP</th>
                          <th style={thR} scope="col">Advantage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.rows.map((r, i) => (
                          <tr key={r.year} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{r.year}</td>
                            <td style={tdR}>{(r.shares / startShares).toFixed(3)}x</td>
                            <td style={{ ...tdR, color: green, fontWeight: 600 }}>{money0(r.grossDividend)}</td>
                            <td style={{ ...tdR, color: amber }}>{money0(r.tax)}</td>
                            <td style={tdR}>{money0(r.netReinvested)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money0(r.dripValue)}</td>
                            <td style={tdR}>{money0(r.noDripTotal)}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: r.advantage >= 0 ? green : amber }}>{money0(r.advantage)}</td>
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
                <h2 style={h2} id="what-is-drip">What Is Dividend Reinvestment (DRIP)?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Dividend reinvestment is using the cash dividend a company pays to buy more of its shares instead of spending it. Next year the larger holding earns a larger dividend, which buys still more shares, so the holding compounds. It adds growth, not a tax saving.
                  </p>
                </div>
                <p style={p}>
                  Take 100 shares at Rs 1,000 that pay Rs 30 a share. The Rs 3,000 dividend buys 3 more shares, and next year you collect on 103.
                </p>
                <p style={p}>
                  Dividends are taxed whether you reinvest or not, so DRIP adds growth and not a tax saving. See the <Link href="/calculators/dividend-yield-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Dividend Yield Calculator</Link> for the yield on your own price.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-drip-is-calculated">How Is the Value With and Without DRIP Calculated?</h2>
                <p style={p}>
                  The calculator tracks shares year by year. Each year it pays the dividend, takes off tax and buys shares at that year&apos;s price.
                </p>
                <pre style={pre}>
{`Dividend = shares held x dividend per share
Net dividend = dividend x (1 - slab rate x 1.04)
New shares = net dividend / share price at year end
Value with DRIP = shares held x share price

Without DRIP: the shares stay the same and net dividends are kept as cash.
Value without DRIP = original shares x price + cash received`}
                </pre>
                <p style={p}>
                  Counting the cash makes the comparison fair. Comparing DRIP with the shares alone would credit DRIP with money you actually received.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-worked-example">Worked Example: Rs 1 Lakh for 10 Years</h2>
                <p style={p}>
                  Rs 1 lakh at a 3% yield, with the dividend and the price both growing 8% a year, ends at Rs 2,83,942 with DRIP and Rs 2,59,352 without.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Before tax. Dividend and share price both grow 8% a year, so the yield stays at 3%.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Item</th><th style={thR} scope="col">With DRIP</th><th style={thR} scope="col">Without DRIP</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Value of shares', 'Rs 2,83,942', 'Rs 2,15,892'],
                        ['Cash dividends received', 'Rs 0', 'Rs 43,460'],
                        ['Total wealth', 'Rs 2,83,942', 'Rs 2,59,352'],
                        ['Share count', '1.32 times the start', '1.00 times the start'],
                        ['Return a year', '11.00%', '10.00%'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={tdR}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The advantage is Rs 24,590. A check that ignores the cash would show Rs 68,050, which overstates it almost threefold.
                </p>
                <p style={p}>
                  At the 30% slab plus cess, the same case ends at Rs 2,60,887 against Rs 2,45,793, an advantage of Rs 15,095.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-vs-cash">What Is the Difference Between DRIP and Cash Dividends?</h2>
                <p style={p}>
                  The company pays the same dividend either way, and only what you do with it differs.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>DRIP against cash dividends.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">DRIP</th><th style={thS} scope="col">Cash dividends</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Cash in hand', 'None, the dividend buys shares', 'Paid into your bank account'],
                        ['Share count', 'Rises with each reinvestment', 'Stays the same'],
                        ['Growth', 'Dividends compound', 'Only the price compounds'],
                        ['Tax on the dividend', 'Due in the year paid', 'Due in the year paid'],
                        ['Tax lots', 'A new lot for each purchase', 'One lot'],
                        ['Suits', 'Long-term growth', 'Investors who need income'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="power-of-compounding">How Does the DRIP Advantage Grow Over Time?</h2>
                <p style={p}>
                  The advantage grows faster than the years do, from about Rs 4,000 at 5 years to over Rs 9 lakh at 30.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 480 }}>
                    <caption style={capS}>Rs 1 lakh, 3% yield, dividend and price both growing 8% a year, before tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Years</th><th style={thR} scope="col">With DRIP</th><th style={thR} scope="col">Without DRIP</th><th style={thR} scope="col">Advantage</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['5', 'Rs 1,68,506', 'Rs 1,64,533', 'Rs 3,973'],
                        ['10', 'Rs 2,83,942', 'Rs 2,59,352', 'Rs 24,590'],
                        ['15', 'Rs 4,78,459', 'Rs 3,98,673', 'Rs 79,786'],
                        ['20', 'Rs 8,06,231', 'Rs 6,03,382', 'Rs 2,02,850'],
                        ['25', 'Rs 13,58,546', 'Rs 9,04,165', 'Rs 4,54,381'],
                        ['30', 'Rs 22,89,230', 'Rs 13,46,115', 'Rs 9,43,114'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={tdR}>{c}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The <Link href="/calculators/compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Compound Interest Calculator</Link> shows the same effect on a plain rate of return.
                </p>
              </div>

              <PromoBar name="Dividend Yield Calculator" desc="Find the yield, yield on cost and post-tax yield of the stock you plan to reinvest in." href="/calculators/dividend-yield-calculator" />

              <div style={sec}>
                <h2 style={h2} id="yield-effect">How Does Dividend Yield Change the Advantage?</h2>
                <p style={p}>
                  A higher yield leaves more cash to reinvest, so the advantage rises sharply with the yield.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Rs 1 lakh for 20 years, dividend and price both growing 8% a year, before tax.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Dividend yield</th><th style={thR} scope="col">With DRIP</th><th style={thR} scope="col">Without DRIP</th><th style={thR} scope="col">Advantage</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['1%', 'Rs 5,60,441', 'Rs 5,11,858', 'Rs 48,583'],
                        ['3%', 'Rs 8,06,231', 'Rs 6,03,382', 'Rs 2,02,850'],
                        ['5%', 'Rs 11,52,309', 'Rs 6,94,906', 'Rs 4,57,403'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={{ ...tdR, fontWeight: 700 }}>{b}</td><td style={tdR}>{c}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If the dividend does not grow, the advantage is smaller. At a flat 3% on cost and 8% price growth, 10 years gives Rs 17,591.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-in-india">Can You Use DRIP in India?</h2>
                <p style={p}>
                  Company-run DRIPs are rare for listed Indian shares, so most investors reinvest by hand.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Shares:</strong> take the cash dividend and place a buy order for the same company. Some brokers offer tools that do this for you.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Mutual funds:</strong> the IDCW reinvestment option buys more units at the NAV with each payout.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Growth option:</strong> a growth plan never pays out and compounds without a tax event on each payout.</li>
                </ul>
                <p style={p}>
                  Reinvest only in a company you would buy anyway, and check the latest dividend on <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>NSE India</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer" style={lnk}>BSE India</a>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-tax-implications">How Is a Reinvested Dividend Taxed in India?</h2>
                <p style={p}>
                  A dividend is taxed at your slab rate plus 4% cess in the year it is paid, and reinvesting it does not defer the tax.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Tax rules that apply to a DRIP strategy.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Item</th><th style={thS} scope="col">Rule</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Dividend', 'Taxed at your slab rate under Income from Other Sources'],
                        ['TDS', '10% when dividends from one company exceed Rs 10,000 in a year, and 20% without PAN'],
                        ['Reinvested shares', 'Each purchase is a new lot with its own price and date'],
                        ['Sale within 12 months', 'Short-term gain taxed at 20% on listed equity'],
                        ['Sale after 12 months', 'Long-term gain taxed at 12.5% above Rs 1.25 lakh a year'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Rates are for sales on or after 23 July 2024, before surcharge and cess. The <Link href="/calculators/dividend-tax-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Dividend Tax Calculator</Link> works out the tax on a payout.
                </p>
              </div>

              <PromoBar name="CAGR Calculator" desc="Turn the final value of a DRIP holding into a yearly rate of return." href="/calculators/cagr-calculator" />

              <div style={sec}>
                <h2 style={h2} id="drip-vs-sip">What Is the Difference Between DRIP and SIP?</h2>
                <p style={p}>
                  DRIP reinvests dividends from shares you already own, and a SIP invests fresh money on a schedule.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>DRIP against SIP.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">DRIP</th><th style={thS} scope="col">SIP</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Money source', 'Dividends from your holding', 'Fresh money from your income'],
                        ['Timing', 'When the company pays', 'On the dates you set'],
                        ['Asset', 'The same company', 'Usually a mutual fund'],
                        ['Purpose', 'Compound an existing position', 'Build a new position'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdL}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Plan the building phase with the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>SIP Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-risks">What Are the Risks and Limits of DRIP?</h2>
                <p style={p}>
                  DRIP magnifies what the share does, so it helps when the dividend and price hold and hurts when they do not.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Concentration:</strong> reinvesting in one company makes it a larger part of your portfolio each year.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Dividend cuts:</strong> a lower payout leaves less to reinvest. Check that earnings cover the dividend.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Falling prices:</strong> at a 10% yearly fall, Rs 1 lakh becomes Rs 79,308 with DRIP and Rs 78,328 without.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Costs:</strong> brokerage and charges on small purchases reduce the result, and this calculator ignores them.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="drip-in-excel">How Do You Calculate DRIP in Excel?</h2>
                <p style={p}>
                  Build one row per year and carry the share count forward.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                    <caption style={capS}>Column layout for a DRIP sheet in Excel or Google Sheets.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Column</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['A', 'Year', 'Fill down from 1'],
                        ['B', 'Share price at year end', '=100*(1+Appr)^A2'],
                        ['C', 'Dividend per share', '=Yield*100*(1+Growth)^(A2-1)'],
                        ['D', 'Shares at start', '=E1 (previous row)'],
                        ['E', 'Shares at end', '=D2+D2*C2*(1-Slab*1.04)/B2'],
                        ['F', 'Value with DRIP', '=E2*B2'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Start with shares equal to the investment divided by 100. Yield, Growth, Appr and Slab are decimals, such as 0.03.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This DRIP Calculator</h2>
                <p style={p}>The calculator has six inputs. Adjust them and the result updates at once.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Initial Investment:</strong> the amount you put into the stock or portfolio.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Dividend Yield:</strong> the yield on the price you pay.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Dividend Growth and Price Growth:</strong> set both to the same rate to keep the yield level.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Horizon and Tax Slab:</strong> pick the years and your slab. Use the presets for quick horizons.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The dark box shows the value with DRIP. Open the dropdown for the year-by-year chart and table. Your entries are saved in this browser.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQAccordion items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All figures on this page are projections from the rates you enter. Dividends can be cut, prices can fall, and past dividends do not guarantee future ones. Tax is estimated at your slab rate plus 4% cess and excludes surcharge, brokerage and other charges. This calculator is for education and planning and is not investment or tax advice. Consult a SEBI-registered adviser or a Chartered Accountant before you invest.
                </p>
              </div>

            </article>
          </div>

          <StickySidebar className="drip-sidebar" mobile={mobile}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
          </StickySidebar>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

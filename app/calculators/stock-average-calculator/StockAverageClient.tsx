'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import Link from 'next/link';
import { calcPosition, averageAfterBuy, sharesForTarget, type PurchaseLot } from './stockMath';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark:     '#101214',
  lime:     '#a6dbc4',
  lime2:    '#2d9970',
  paleLime: '#f4f5f6',
  ink:      '#16140F',
  ink2:     '#50565c',
  ink3:     '#7a8087',
  white:    '#ffffff',
  bg:       '#f6f7f8',
  border:   '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

const DEFAULT_LOTS: PurchaseLot[] = [
  { id: '1', qty: 100, price: 450 },
  { id: '2', qty: 50,  price: 380 },
  { id: '3', qty: 75,  price: 420 },
];

const defaultSettings = {
  lots: DEFAULT_LOTS,
  currentPrice: 440,
  stockName: '',
  planQty: 100,
  planPrice: 0,
  targetAvg: 430,
};

/* ─── Donut: single track + single overlay arc ───────────────── */
function DonutChart({ invested, pnl, pnlPct }: { invested: number; pnl: number; pnlPct: number }) {
  if (invested <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const isProfit = pnl >= 0;
  const currentValue = invested + pnl;
  // Profit: dark = invested share of today's value. Loss: dark = value still held share of invested.
  const darkFrac = isProfit
    ? (currentValue > 0 ? invested / currentValue : 1)
    : Math.max(0, currentValue / invested);
  const dArc = Math.min(1, darkFrac) * circ;
  const label = pnl === 0 ? 'Return' : isProfit ? 'Gain' : 'Loss';
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`${isProfit ? 'Unrealized gain' : 'Unrealized loss'} of ${Math.abs(pnlPct).toFixed(1)}% on invested amount`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${dArc} ${circ - dArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{label}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 25, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>
        {`${pnlPct >= 0 ? '+' : '-'}${Math.abs(pnlPct).toFixed(1)}%`}
      </text>
    </svg>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '12px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </nav>
  );
}

const POPULAR_CALCS = [
  { href: '/calculators/cagr-calculator',                  label: 'CAGR Calculator' },
  { href: '/calculators/capital-gains-calculator',         label: 'Capital Gains Calculator' },
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/investment-comparison-calculator', label: 'Investment Comparison' },
  { href: '/calculators/sip-calculator',                   label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',               label: 'Lumpsum Calculator' },
  { href: '/calculators/fd-calculator',                    label: 'FD Calculator' },
];
const MORE_CALCS = [
  { href: '/calculators/portfolio-return-calculator',  label: 'Portfolio Return Calculator' },
  { href: '/calculators/stcg-calculator',              label: 'STCG Calculator' },
  { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
  { href: '/calculators/goal-planning-calculator',     label: 'Goal Planning Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
];

/* ─── FAQ (items passed from page.tsx, the single source) ────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ─── CA CTA (exact standard component) ──────────────────────── */

/* ─── In-content promo bar ───────────────────────────────────── */
function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '0 0 44px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function StockAverageClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const { settings, updateSettings } = useCalculatorSettings('stock-average', defaultSettings);
  const { selectedCurrency } = useCurrency();
  const [showLots, setShowLots] = useState(false);

  const lots: PurchaseLot[]  = (settings.lots as PurchaseLot[]) ?? DEFAULT_LOTS;
  const currentPrice: number = (settings.currentPrice as number) ?? 440;
  const stockName: string    = (settings.stockName as string) ?? '';
  const planQty: number      = (settings.planQty as number) ?? 100;
  const planPrice: number    = (settings.planPrice as number) ?? 0;
  const targetAvg: number    = (settings.targetAvg as number) ?? 0;

  const setLots         = (v: PurchaseLot[]) => updateSettings({ lots: v });
  const setCurrentPrice = (v: number) => updateSettings({ currentPrice: v });
  const setStockName    = (v: string) => updateSettings({ stockName: v });
  const setPlanQty      = (v: number) => updateSettings({ planQty: v });
  const setPlanPrice    = (v: number) => updateSettings({ planPrice: v });
  const setTargetAvg    = (v: number) => updateSettings({ targetAvg: v });

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Prices are entered in the selected currency, so the selector changes the symbol only.
  const sym = selectedCurrency?.symbol || '₹';
  const isInr = (selectedCurrency?.code || 'INR') === 'INR';
  const loc = isInr ? 'en-IN' : 'en-US';
  const money = (n: number, dec = 2) => `${n < 0 ? '-' : ''}${sym}${new Intl.NumberFormat(loc, { maximumFractionDigits: dec, minimumFractionDigits: dec }).format(Math.abs(n))}`;
  const moneyShort = (n: number) => {
    const a = Math.abs(n);
    const s = n < 0 ? '-' : '';
    if (isInr && a >= 1e7) return `${s}${sym}${(a / 1e7).toFixed(2)} Cr`;
    if (isInr && a >= 1e5) return `${s}${sym}${(a / 1e5).toFixed(2)} L`;
    return `${s}${sym}${new Intl.NumberFormat(loc, { maximumFractionDigits: 0 }).format(a)}`;
  };

  const pos = useMemo(() => calcPosition(lots, currentPrice), [lots, currentPrice]);
  const buyPrice = planPrice > 0 ? planPrice : currentPrice;
  const hasPos = pos.totalShares > 0;
  const newAvg = hasPos && planQty > 0 && buyPrice > 0 ? averageAfterBuy(pos.totalShares, pos.totalInvested, planQty, buyPrice) : 0;
  const needShares = hasPos && targetAvg > 0 && buyPrice > 0 ? sharesForTarget(pos.totalShares, pos.totalInvested, buyPrice, targetAvg) : null;
  const validLots = lots.filter(l => l.qty > 0 && l.price > 0).length;
  const heldValue = pos.totalInvested + pos.pnl;
  const darkFrac = pos.totalInvested <= 0 ? 1
    : pos.pnl >= 0 ? (heldValue > 0 ? pos.totalInvested / heldValue : 1)
    : Math.max(0, heldValue / pos.totalInvested);
  const darkPct = Math.round(Math.min(1, darkFrac) * 100);
  const limePct = 100 - darkPct;
  const darkName = pos.pnl >= 0 ? 'Invested' : 'Value held';
  const limeName = pos.pnl >= 0 ? 'Gain' : 'Loss';

  function updateLot(id: string, field: 'qty' | 'price', value: number) {
    setLots(lots.map(l => l.id === id ? { ...l, [field]: value } : l));
  }
  function addLot() {
    if (lots.length >= 10) return;
    setLots([...lots, { id: Date.now().toString(), qty: 0, price: 0 }]);
  }
  function removeLot(id: string) {
    if (lots.length <= 1) return;
    setLots(lots.filter(l => l.id !== id));
  }

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', scrollMarginTop: 80 } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const thS = { padding: '10px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'right', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const tdC = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const thR = { ...thS, textAlign: 'right' } as React.CSSProperties;
  const thC = { ...thS, textAlign: 'center' } as React.CSSProperties;
  const tableBox = { overflowX: 'auto', maxWidth: '100%', marginBottom: 12 } as React.CSSProperties;
  const tbl = { width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 } as React.CSSProperties;
  const pre = { fontFamily: 'monospace', fontSize: 13, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', margin: '0 0 16px', overflowX: 'auto', lineHeight: 1.8, color: C.ink } as React.CSSProperties;
  const li = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const green = '#166534';
  const lbl = { fontSize: 12, fontWeight: 600, color: C.ink3, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 7 } as React.CSSProperties;
  const field = { width: '100%', boxSizing: 'border-box', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontWeight: 600, color: C.ink, outline: 'none', fontFamily: INTER, background: C.white } as React.CSSProperties;

  const statRows: { label: string; value: string }[] = [
    { label: 'Total shares', value: hasPos ? pos.totalShares.toLocaleString(loc) : '--' },
    { label: 'Total invested', value: hasPos ? money(pos.totalInvested) : '--' },
    { label: 'Current value', value: hasPos && currentPrice > 0 ? money(pos.currentValue) : '--' },
    { label: 'Unrealized P&L', value: hasPos && currentPrice > 0 ? money(pos.pnl) : '--' },
    { label: 'Unrealized P&L %', value: hasPos && currentPrice > 0 ? `${pos.pnlPct >= 0 ? '+' : ''}${pos.pnlPct.toFixed(2)}%` : '--' },
    { label: `Average after buying ${planQty > 0 ? planQty.toLocaleString(loc) : '0'} more`, value: newAvg > 0 ? money(newAvg) : '--' },
    { label: `Shares to buy for ${targetAvg > 0 ? money(targetAvg) : 'target'} average`, value: needShares !== null ? needShares.toLocaleString(loc) : (targetAvg > 0 && hasPos ? 'Not reachable' : '--') },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Stock Average Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Weighted average buy price, unrealized P&L and break-even across multiple purchase lots, plus shares needed to reach a target average
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Stock Average Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label htmlFor="stk-name" style={lbl}>Stock Name / Symbol (optional)</label>
                    <input id="stk-name" type="text" value={stockName} onChange={e => setStockName(e.target.value)}
                      placeholder="e.g. RELIANCE, HDFC Bank" style={field} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ ...lbl, marginBottom: 0 }}>Purchase Lots ({lots.length}/10)</span>
                    <div style={{ display: 'flex', gap: 20 }}>
                      <span style={{ fontSize: 11, color: C.ink3, fontWeight: 500 }}>Qty</span>
                      <span style={{ fontSize: 11, color: C.ink3, fontWeight: 500, minWidth: 80, textAlign: 'right' }}>Price ({sym})</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                    {lots.map((lot, idx) => (
                      <div key={lot.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 11, color: C.ink3, minWidth: 16, textAlign: 'center', flexShrink: 0 }}>{idx + 1}</span>
                        <input type="number" min={0} value={lot.qty || ''} placeholder="Qty" aria-label={`Lot ${idx + 1} quantity`}
                          onChange={e => updateLot(lot.id, 'qty', Math.max(0, parseFloat(e.target.value) || 0))}
                          style={{ ...field, flex: 1, minWidth: 0, width: 'auto', padding: '8px 10px', fontSize: 13, textAlign: 'right' }} />
                        <span style={{ fontSize: 12, color: C.ink3, flexShrink: 0 }}>@</span>
                        <input type="number" min={0} value={lot.price || ''} placeholder="Price" aria-label={`Lot ${idx + 1} price per share`}
                          onChange={e => updateLot(lot.id, 'price', Math.max(0, parseFloat(e.target.value) || 0))}
                          style={{ ...field, flex: 1.4, minWidth: 0, width: 'auto', padding: '8px 10px', fontSize: 13, textAlign: 'right' }} />
                        <button onClick={() => removeLot(lot.id)} disabled={lots.length <= 1} aria-label={`Remove lot ${idx + 1}`}
                          style={{ padding: '6px 8px', border: `1px solid ${C.border}`, borderRadius: 6, background: C.white, color: lots.length <= 1 ? C.ink3 : C.ink2, cursor: lots.length <= 1 ? 'not-allowed' : 'pointer', flexShrink: 0, opacity: lots.length <= 1 ? 0.4 : 1, minWidth: 32, minHeight: 32 }}>
                          <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <button onClick={addLot} disabled={lots.length >= 10} aria-label="Add purchase lot"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: `1px solid ${C.border}`, borderRadius: 8, background: C.white, color: lots.length >= 10 ? C.ink3 : C.ink2, fontSize: 12.5, fontWeight: 600, cursor: lots.length >= 10 ? 'not-allowed' : 'pointer', fontFamily: INTER, opacity: lots.length >= 10 ? 0.5 : 1, alignSelf: 'flex-start', marginBottom: 22 }}>
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Add lot{lots.length >= 10 ? ' (max 10)' : ''}
                  </button>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginBottom: 20 }}>
                    <label htmlFor="stk-cmp" style={lbl}>Current Market Price ({sym} per share)</label>
                    <input id="stk-cmp" type="number" min={0} value={currentPrice || ''} placeholder="0"
                      onChange={e => setCurrentPrice(Math.max(0, parseFloat(e.target.value) || 0))} style={field} />
                    <p style={{ fontSize: 11, color: C.ink3, margin: '6px 0 0' }}>
                      Check the live price on <a href="https://www.nseindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3 }}>NSE India</a> or <a href="https://www.bseindia.com" target="_blank" rel="noopener noreferrer" style={{ color: C.ink3 }}>BSE India</a>.
                    </p>
                  </div>

                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                    <span style={lbl}>Plan Another Purchase</span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                      <div>
                        <label htmlFor="stk-pq" style={{ fontSize: 12, color: C.ink2, display: 'block', marginBottom: 5 }}>Shares to buy</label>
                        <input id="stk-pq" type="number" min={0} value={planQty || ''} placeholder="0"
                          onChange={e => setPlanQty(Math.max(0, parseFloat(e.target.value) || 0))} style={field} />
                      </div>
                      <div>
                        <label htmlFor="stk-pp" style={{ fontSize: 12, color: C.ink2, display: 'block', marginBottom: 5 }}>At price (blank = current)</label>
                        <input id="stk-pp" type="number" min={0} value={planPrice || ''} placeholder={currentPrice ? String(currentPrice) : '0'}
                          onChange={e => setPlanPrice(Math.max(0, parseFloat(e.target.value) || 0))} style={field} />
                      </div>
                    </div>
                    <label htmlFor="stk-target" style={{ fontSize: 12, color: C.ink2, display: 'block', marginBottom: 5 }}>Target average price</label>
                    <input id="stk-target" type="number" min={0} value={targetAvg || ''} placeholder="0"
                      onChange={e => setTargetAvg(Math.max(0, parseFloat(e.target.value) || 0))} style={field} />
                    {needShares === null && targetAvg > 0 && hasPos && (
                      <p style={{ fontSize: 12, color: C.ink2, margin: '8px 0 0', lineHeight: 1.6, borderLeft: `3px solid ${C.ink3}`, paddingLeft: 10 }}>
                        A target of {money(targetAvg)} cannot be reached by buying at {money(buyPrice)}. To lower your average, buy below the target. To raise it, buy above.
                      </p>
                    )}
                  </div>

                  {hasPos && (
                    <div style={{ marginTop: 20, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                        <span>Total amount invested</span><span>{moneyShort(pos.totalInvested)}</span>
                      </div>
                      <div style={{ fontSize: 12, color: C.ink2 }}>
                        {pos.totalShares.toLocaleString(loc)} shares across {validLots} lot{validLots !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0 }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, gap: 10 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      {stockName ? `${stockName} average` : 'Average buy price'}
                    </span>
                    <span aria-live="polite" aria-label={`Average buy price: ${money(pos.avgPrice)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {hasPos ? money(pos.avgPrice) : '--'}
                    </span>
                  </div>

                  {statRows.map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink, textAlign: 'right' }}>{value}</span>
                    </div>
                  ))}

                  {hasPos && currentPrice > 0 && (
                    <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11.5, color: C.ink3 }}>{darkName} {darkPct}%</span>
                        <span style={{ fontSize: 11.5, color: C.ink3 }}>{limeName} {limePct}%</span>
                      </div>
                      <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`${darkName} is ${darkPct}% and ${limeName.toLowerCase()} is ${limePct}%`}>
                        <div style={{ height: '100%', width: `${darkPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    {hasPos && currentPrice > 0 ? <DonutChart invested={pos.totalInvested} pnl={pos.pnl} pnlPct={pos.pnlPct} /> : <div style={{ height: 212 }} />}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>{darkName} {darkPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>{limeName} {limePct}%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Lot-by-lot breakdown: collapsible */}
              {pos.lots.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowLots(v => !v)} aria-expanded={showLots} aria-controls="stk-lots"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0, textAlign: 'left' }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Lot-by-Lot Breakdown</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Share of each purchase in your average</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {pos.lots.length} lot{pos.lots.length !== 1 ? 's' : ''} · avg {money(pos.avgPrice)}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showLots ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showLots && (
                    <div id="stk-lots" style={{ borderTop: `1px solid ${C.border}` }}>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 520, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Each purchase lot, its share of the total and its gain or loss against the current price.</caption>
                        <thead>
                          <tr>
                            <th style={thS} scope="col">Lot</th>
                            <th style={thR} scope="col">Quantity</th>
                            <th style={thR} scope="col">Price</th>
                            <th style={thR} scope="col">Amount</th>
                            <th style={thR} scope="col">Share of total</th>
                            <th style={thR} scope="col">Vs current price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pos.lots.map((lot, i) => {
                            const diff = currentPrice > 0 ? ((currentPrice - lot.price) / lot.price) * 100 : null;
                            return (
                              <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Buy {i + 1}</td>
                                <td style={tdR}>{lot.qty.toLocaleString(loc)}</td>
                                <td style={tdR}>{money(lot.price)}</td>
                                <td style={tdR}>{money(lot.amount)}</td>
                                <td style={tdR}>{lot.pctOfTotal.toFixed(1)}%</td>
                                <td style={{ ...tdR, color: diff === null ? C.ink3 : diff >= 0 ? green : '#B45309' }}>{diff === null ? '--' : `${diff >= 0 ? '+' : ''}${diff.toFixed(2)}%`}</td>
                              </tr>
                            );
                          })}
                          <tr style={{ background: '#f4f5f6' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>Total / average</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{pos.totalShares.toLocaleString(loc)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money(pos.avgPrice)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{money(pos.totalInvested)}</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>100%</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{currentPrice > 0 && pos.avgPrice > 0 ? `${pos.pnlPct >= 0 ? '+' : ''}${pos.pnlPct.toFixed(2)}%` : '--'}</td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-stock-averaging">What Is Stock Averaging?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Stock averaging is buying more of the same stock at different prices, so your cost per share becomes a blend of every purchase. That blended cost is total money invested divided by total shares held. It is your break-even price and the base for your unrealized profit or loss.
                  </p>
                </div>
                <p style={p}>
                  Anyone who has bought a stock twice is already averaging. The question is whether the second buy followed a plan or a hope.
                </p>
                <p style={p}>
                  The average sets your unrealized profit or loss at any price. It is a tracking number, though, and it does not decide your tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="average-price-formula">How Is the Average Share Price Calculated?</h2>
                <p style={p}>
                  The average share price is the sum of quantity times price for every lot, divided by the total quantity.
                </p>
                <pre style={pre}>
{`Average price = SUM(quantity x price) / SUM(quantity)

Lot 1:  100 shares @ Rs 450 = Rs 45,000
Lot 2:   50 shares @ Rs 380 = Rs 19,000
Lot 3:   75 shares @ Rs 420 = Rs 31,500

Invested = Rs 95,500    Shares = 225
Average  = 95,500 / 225 = Rs 424.44`}
                </pre>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>The default lots in the calculator above.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Lot</th><th style={thR} scope="col">Quantity</th><th style={thR} scope="col">Price</th><th style={thR} scope="col">Amount</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Buy 1', '100', 'Rs 450.00', 'Rs 45,000'],
                        ['Buy 2', '50', 'Rs 380.00', 'Rs 19,000'],
                        ['Buy 3', '75', 'Rs 420.00', 'Rs 31,500'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={tdL}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                      <tr style={{ background: '#f4f5f6' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>Total / average</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>225</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 424.44</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 95,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  At Rs 440 the 225 shares are worth Rs 99,000, so the unrealized gain is Rs 3,500, or 3.66%. Order of purchase does not change the result.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="shares-for-target-average">How Many Shares Do You Need to Buy to Reach a Target Average?</h2>
                <p style={p}>
                  Divide the gap between your target and your current cost by the gap between the buy price and the target.
                </p>
                <pre style={pre}>
{`Shares to buy = (target x shares held - amount invested) / (buy price - target)

The buy price must be below the target to lower the average,
and above the target to raise it.`}
                </pre>
                <p style={p}>
                  Take 200 shares bought at Rs 1,200 (Rs 2,40,000 invested), with the price now at Rs 980. The table shows what each target costs.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Shares are rounded up to whole shares. Charges not included.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Target average</th><th style={thR} scope="col">Shares to buy at Rs 980</th><th style={thR} scope="col">Extra cost</th><th style={thR} scope="col">Total invested</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 1,150', '59', 'Rs 57,820', 'Rs 2,97,820'],
                        ['Rs 1,100', '167', 'Rs 1,63,660', 'Rs 4,03,660'],
                        ['Rs 1,050', '429', 'Rs 4,20,420', 'Rs 6,60,420'],
                        ['Rs 1,000', '2,000', 'Rs 19,60,000', 'Rs 22,00,000'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{b}</td><td style={tdR}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Each step toward the buy price costs far more than the last. Getting from Rs 1,050 to Rs 1,000 takes 1,571 more shares.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="averaging-down-vs-up">What Is the Difference Between Averaging Down and Averaging Up?</h2>
                <p style={p}>
                  Averaging down means buying after a fall, which lowers your average. Averaging up means buying after a rise, which raises it.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 520 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Averaging down, no second buy and averaging up on 100 shares bought at Rs 500.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Scenario</th><th style={thR} scope="col">First buy</th><th style={thR} scope="col">Second buy</th><th style={thR} scope="col">Average</th><th style={thS} scope="col">Effect</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Averaging down', '100 @ Rs 500', '100 @ Rs 400', 'Rs 450', 'Break-even falls by Rs 50'],
                        ['No second buy', '100 @ Rs 500', 'None', 'Rs 500', 'Break-even unchanged'],
                        ['Averaging up', '100 @ Rs 500', '100 @ Rs 600', 'Rs 550', 'Break-even rises by Rs 50'],
                      ].map(([a, b, c, d, e]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={{ ...tdR, fontWeight: 700 }}>{d}</td><td style={tdL}>{e}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Averaging up is common in trend-following, where you add to winners. Averaging down suits a fall driven by the market, not the company.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-example">Worked Example: Averaging Down After a Correction</h2>
                <p style={p}>
                  Buying 300 more shares at Rs 980 cuts the average on 200 shares bought at Rs 1,200 to Rs 1,068.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Averaging down after a correction: 200 shares at Rs 1,200 and 300 shares at Rs 980.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Transaction</th><th style={thR} scope="col">Qty</th><th style={thR} scope="col">Price</th><th style={thR} scope="col">Amount</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Buy 1 (January)', '200', 'Rs 1,200', 'Rs 2,40,000'],
                        ['Buy 2 (March, price Rs 980)', '300', 'Rs 980', 'Rs 2,94,000'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={tdL}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={tdR}>{d}</td></tr>
                      ))}
                      <tr style={{ background: '#f4f5f6' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>Total / average</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>500</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 1,068</td>
                        <td style={{ ...tdR, fontWeight: 700 }}>Rs 5,34,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  If the stock recovers to Rs 1,100, the gain is (1,100 minus 1,068) times 500, which is Rs 16,000. Without the second buy you would still be down Rs 20,000.
                </p>
                <p style={p}>
                  From Rs 980, the stock must rise 22.45% to reach Rs 1,200 but only 8.98% to reach Rs 1,068. Measure the true annualised return with the <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>XIRR Calculator</Link>.
                </p>
              </div>

              <PromoBar name="XIRR Calculator" desc="Measure your return across several purchase and sale dates, not just the average price." href="/calculators/xirr-calculator" />

              <div style={sec}>
                <h2 style={h2} id="when-to-average-down">When Does Averaging Down Make Sense?</h2>
                <p style={p}>
                  Averaging down makes sense when the business is unchanged and the fall comes from market-wide selling or a temporary event.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Add when:</strong> earnings and cash flow are stable, and your reason for buying still holds.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Do not add when:</strong> earnings fall for several quarters, debt grows faster than revenue, or the sector faces structural change.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Set a limit first:</strong> decide the largest share of your portfolio this stock may take before you add.</li>
                </ul>
                <p style={p}>
                  Averaging down lowers your break-even but raises your exposure to one company. It does not lower risk.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="recovery-after-a-fall">How Much Must a Stock Rise to Recover From a Fall?</h2>
                <p style={p}>
                  The rise needed to recover is always larger than the fall, and it grows quickly as the fall deepens.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Rise needed = 1 / (1 - fall) - 1.</caption>
                    <thead>
                      <tr><th style={thC} scope="col">Fall from your price</th><th style={thC} scope="col">Rise needed to break even</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['10%', '11.11%'],
                        ['20%', '25.00%'],
                        ['30%', '42.86%'],
                        ['40%', '66.67%'],
                        ['50%', '100.00%'],
                        ['60%', '150.00%'],
                      ].map(([a, b]) => (
                        <tr key={a}><td style={{ ...tdC, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdC}>{b}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A lower average shrinks the rise you need. That is the case for averaging down, and the cost of it is a bigger position.
                </p>
                <p style={p}>
                  To turn a holding period into a yearly return, use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>CAGR Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="atp-average-traded-price">What Is ATP (Average Traded Price)?</h2>
                <p style={p}>
                  ATP is the volume-weighted average price of every trade in a stock during a session: total value traded divided by total volume traded.
                </p>
                <p style={p}>
                  It describes the market on one day, not your own purchases. Your average buy price is a separate number.
                </p>
                <p style={p}>
                  Volume-weighted prices also matter in takeovers. Under the <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={lnk}>SEBI</a> takeover regulations, an open offer price is the highest of several parameters, one being the 60-trading-day volume-weighted average market price.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fifo-vs-average-cost">FIFO vs Average Cost: Which One Decides Your Tax?</h2>
                <p style={p}>
                  First-in-first-out decides your tax, and the average cost is only for tracking. For demat shares, income tax reporting instructions match sold shares to the oldest purchase lots.
                </p>
                <p style={p}>
                  Say you sell 100 of the default 225 shares at Rs 440. FIFO uses the Rs 450 lot and shows a loss of Rs 1,000. The average method uses Rs 424.44 and shows a gain of Rs 1,556.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Sales on or after 23 July 2024, before surcharge and cess. Check the Income Tax Department site for current rates.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Equity shares (listed)</th><th style={thS} scope="col">Held</th><th style={thR} scope="col">Tax rate</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Short-term gain', 'Up to 12 months', '20%'],
                        ['Long-term gain', 'Over 12 months', '12.5% above Rs 1.25 lakh a year'],
                      ].map(([a, b, c]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={tdR}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Shares bought before 1 February 2018 get a grandfathered cost, which can cut the taxable gain. Work out the tax with the <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Capital Gains Calculator</Link>.
                </p>
              </div>

              <PromoBar name="Capital Gains Calculator" desc="Work out short-term and long-term tax on a sale, lot by lot." href="/calculators/capital-gains-calculator" />

              <div style={sec}>
                <h2 style={h2} id="fo-averaging">How Does F&O Averaging Differ From Equity Averaging?</h2>
                <p style={p}>
                  F&O averaging uses the same formula, but leverage makes the same move far riskier than in cash equity.
                </p>
                <p style={p}>
                  For futures, enter contracts as quantity and the entry price as price. The result is your average entry.
                </p>
                <p style={p}>
                  Adding to a losing futures position increases leveraged exposure, so a further fall hurts more. This page does not model margin, expiry or options premium decay.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="broker-trade-history">How Do You Get Your Lots From a Broker?</h2>
                <p style={p}>
                  Copy the quantity and price of each buy from your broker trade history or holdings statement, and enter each one as a lot.
                </p>
                <p style={p}>
                  The calculator works with any broker and is not connected to an account. If a split, bonus or demerger happened, adjust older lots first. A 1:1 bonus doubles the quantity and halves the price.
                </p>
                <p style={p}>
                  To include charges, add brokerage, STT and stamp duty to each lot price. Compare your result with a benchmark in the <Link href="/calculators/investment-comparison-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Investment Comparison Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="stock-average-in-excel">How Do You Calculate the Average Price in Excel?</h2>
                <p style={p}>
                  Use SUMPRODUCT to multiply each quantity by its price, then divide by the total quantity.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>With the default lots, D2 is 95,500, D3 is 225 and D4 is 424.44.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Cell</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['B2:B4', 'Quantity of each lot', 'Enter 100, 50, 75'],
                        ['C2:C4', 'Price of each lot', 'Enter 450, 380, 420'],
                        ['D2', 'Total invested', '=SUMPRODUCT(B2:B4,C2:C4)'],
                        ['D3', 'Total shares', '=SUM(B2:B4)'],
                        ['D4', 'Average buy price', '=D2/D3'],
                        ['D5', 'Unrealized P&L at price P', '=(P-D4)*D3'],
                      ].map(([a, b, f]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{a}</td><td style={tdL}>{b}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{f}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Add a row for every new buy and extend the ranges. The sheet should match this calculator exactly.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use-calculator">How to Use This Stock Average Calculator</h2>
                <p style={p}>The calculator takes your purchase lots, a current price and two optional planning inputs.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Add purchase lots:</strong> enter quantity and price for each buy. Use up to 10 lots, or clear the examples and add your own.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Enter the current price:</strong> the result panel then shows current value and unrealized P&L.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Plan a purchase:</strong> enter shares and a price to see your new average. Leave the price blank to use the current price.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Set a target average:</strong> the calculator shows how many shares you need to buy to reach it.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Your entries are saved in this browser, so the page shows your last calculation next time. The currency selector changes the symbol shown.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. The average buy price and unrealized P&L are arithmetic outputs of the figures you enter. They do not include brokerage, STT, exchange fees, GST or other charges, and they do not decide your capital gains tax. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered investment adviser or a Chartered Accountant before making investment or tax decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.stock-avg-sidebar::-webkit-scrollbar{width:5px}.stock-avg-sidebar::-webkit-scrollbar-track{background:transparent}.stock-avg-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.stock-avg-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="stock-avg-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR_CALCS} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE_CALCS} /></div>
            </div>
          </aside>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

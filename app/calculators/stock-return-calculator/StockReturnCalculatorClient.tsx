'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect, useId } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { STOCK_RETURN_FAQS } from './stockReturnFaq';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

type Mode = 'total-return' | 'annualized';

function calcTotalReturnPct(initialPrice: number, finalPrice: number, dividendPerShare: number) {
  if (initialPrice <= 0) return 0;
  return ((finalPrice + dividendPerShare - initialPrice) / initialPrice) * 100;
}

function calcCAGR(initialPrice: number, finalPrice: number, dividendPerShare: number, years: number) {
  if (initialPrice <= 0 || years <= 0) return 0;
  const totalValue = finalPrice + dividendPerShare;
  if (totalValue <= 0 || initialPrice <= 0) return 0;
  return (Math.pow(totalValue / initialPrice, 1 / years) - 1) * 100;
}

function calcPriceReturnPct(initialPrice: number, finalPrice: number) {
  if (initialPrice <= 0) return 0;
  return ((finalPrice - initialPrice) / initialPrice) * 100;
}

/* ── Slider ────────────────────────────────────────────── */
function Slider({ label, id: idProp, value, min, max, step, display, onChange, compact, suffix }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  display: string; onChange: (v: number) => void; compact?: boolean; suffix?: string;
}) {
  const autoId = useId();
  const inputId = idProp || autoId;
  const rangeId = `${inputId}-range`;
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const commit = () => { setEditing(false); const n = parseFloat(raw.replace(/[^0-9.]/g, '')); if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n))); };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 8 : 14 }}>
        {label ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label> : <span />}
        {editing ? (
          <div style={{ position: 'relative' }}>
            <input id={inputId} autoFocus value={raw} aria-label={`Enter ${label} value`}
              onChange={e => setRaw(e.target.value)} onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
              style={{ fontSize: 14, fontWeight: 700, textAlign: suffix ? 'left' : 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 130, outline: 'none', color: C.dark, fontFamily: INTER }} />
            {suffix && <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: C.ink3, pointerEvents: 'none', fontWeight: 700 }}>{suffix}</span>}
          </div>
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${display}. Click to edit.`}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.dark, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center', transition: 'border-color 0.15s' }}>
            {display}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 20, height: 20, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 2px 8px rgba(16,18,20,0.22)', pointerEvents: 'none', zIndex: 1 }} />
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          onChange={e => onChange(+e.target.value)}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <span style={{ fontSize: 11, color: C.ink3 }}>{min}{suffix || ''}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{max}{suffix || ''}</span>
      </div>
    </div>
  );
}

/* ── DonutChart ────────────────────────────────────────── */
function DonutChart({ priceReturn, dividendReturn }: { priceReturn: number; dividendReturn: number }) {
  const total = Math.abs(priceReturn) + Math.abs(dividendReturn);
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (Math.abs(priceReturn) / total) * circ;
  const pPct = Math.round((Math.abs(priceReturn) / total) * 100);
  const positive = priceReturn >= 0;
  return (
    <svg role="img" aria-label={`Return split: ${pPct}% price return, ${100 - pPct}% dividend return`}
      width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Price Return</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: positive ? '#166534' : '#B45309', fontFamily: INTER }}>{positive ? '' : '-'}{pPct}%</text>
    </svg>
  );
}

/* ── SidebarList ───────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 14, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/cagr-calculator',                  label: 'CAGR Calculator' },
  { href: '/calculators/xirr-calculator',                  label: 'XIRR Calculator' },
  { href: '/calculators/sip-calculator',                   label: 'SIP Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  { href: '/calculators/lumpsum-calculator',               label: 'Lumpsum Calculator' },
  { href: '/calculators/dividend-reinvestment-calculator', label: 'Dividend Reinvestment Calculator' },
  { href: '/calculators/dividend-yield-calculator',        label: 'Dividend Yield Calculator' },
];
const MORE = [
  { href: '/calculators/etf-return-calculator',     label: 'ETF Return Calculator' },
  { href: '/calculators/mutual-fund-calculator',    label: 'Mutual Fund Calculator' },
  { href: '/calculators/portfolio-return-calculator', label: 'Portfolio Return Calculator' },
  { href: '/calculators/fd-calculator',             label: 'FD Calculator' },
  { href: '/calculators/ppf-calculator',            label: 'PPF Calculator' },
];

/* ── FAQ ───────────────────────────────────────────────── */
const FAQS = STOCK_RETURN_FAQS;

function ArticleTable({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: 16 }}>
      <table style={{ width: '100%', minWidth: 520, borderCollapse: 'collapse', fontSize: 13 }}>
        {caption && <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>{caption}</caption>}
        <thead>
          <tr>{headers.map(header => <th key={header} scope="col" style={{ padding: '10px 12px', fontSize: 13, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', border: `1px solid ${C.border}` }}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} style={{ background: rowIndex % 2 === 0 ? C.white : '#fafafa' }}>
              {row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`} style={{ padding: '10px 12px', fontSize: 13, color: cellIndex === 0 ? C.ink : C.ink2, fontWeight: cellIndex === 0 ? 600 : 400, border: `1px solid ${C.border}`, verticalAlign: 'top' }}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ════════════════════════════════════════════════════════ */

export default function StockReturnCalculatorClient() {
  const defaultSettings = {
    mode: 'total-return' as Mode,
    initialPrice: 500,
    finalPrice: 820,
    dividendPerShare: 45,
    numShares: 100,
    holdingPeriod: 5,
  };
  const { settings, updateSettings } = useCalculatorSettings('stock-return', defaultSettings);
  const { mode, initialPrice, finalPrice, dividendPerShare, numShares, holdingPeriod } = settings;

  const setMode = (v: Mode) => updateSettings({ mode: v });
  const setInitialPrice = (v: number) => updateSettings({ initialPrice: v });
  const setFinalPrice = (v: number) => updateSettings({ finalPrice: v });
  const setDividendPerShare = (v: number) => updateSettings({ dividendPerShare: v });
  const setNumShares = (v: number) => updateSettings({ numShares: v });
  const setHoldingPeriod = (v: number) => updateSettings({ holdingPeriod: v });

  const [mobile, setMobile] = useState(false);
  useLayoutEffect(() => { const chk = () => setMobile(window.innerWidth < 1024); chk(); window.addEventListener('resize', chk); return () => window.removeEventListener('resize', chk); }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  // Math
  const totalReturnPct = calcTotalReturnPct(initialPrice, finalPrice, dividendPerShare);
  const priceReturnPct = calcPriceReturnPct(initialPrice, finalPrice);
  const cagr = calcCAGR(initialPrice, finalPrice, dividendPerShare, holdingPeriod);
  const totalGainPerShare = (finalPrice + dividendPerShare) - initialPrice;
  const priceGainPerShare = finalPrice - initialPrice;
  const totalAbsoluteGain = totalGainPerShare * numShares;
  const totalInvested = initialPrice * numShares;
  const totalValue = (finalPrice + dividendPerShare) * numShares;
  const dividendTotal = dividendPerShare * numShares;

  const priceReturnAbs = priceGainPerShare * numShares;
  const dividendReturnAbs = dividendPerShare * numShares;
  const totalReturnAbs = priceReturnAbs + dividendReturnAbs;

  const pricePctOfReturn = Math.abs(totalReturnAbs) > 0 ? Math.round((Math.abs(priceReturnAbs) / Math.abs(totalReturnAbs)) * 100) : 50;
  const dividendPctOfReturn = 100 - pricePctOfReturn;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Stock Return Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate total return including dividends, annualized return (CAGR), and dividend-adjusted return for Indian stocks on NSE and BSE.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'total-return' as Mode, label: 'Total Return', desc: 'Calculate total return % including dividends and CAGR' },
                  { id: 'annualized' as Mode, label: 'Annualized Return', desc: 'Calculate CAGR annualized return for stocks' },
                ]).map(tab => (
                  <button key={tab.id}
                    role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => setMode(tab.id)}
                    title={tab.desc}
                    style={{
                      flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === tab.id ? 700 : 400,
                      color: mode === tab.id ? C.dark : C.ink3,
                      borderBottom: mode === tab.id ? `2.5px solid ${C.dark}` : '2.5px solid transparent',
                      transition: 'all 0.15s', fontFamily: INTER,
                    }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Inputs */}
                <div role="tabpanel" id={`panel-${mode}`} style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider id="initial-price" label="Purchase Price Per Share" value={initialPrice} min={1} max={50000} step={1}
                    display={fmtIN(initialPrice)} onChange={setInitialPrice} compact />

                  <Slider id="final-price" label="Current or Selling Price" value={finalPrice} min={1} max={100000} step={1}
                    display={fmtIN(finalPrice)} onChange={setFinalPrice} compact />

                  <Slider id="dividend-per-share" label="Total Dividends Per Share" value={dividendPerShare} min={0} max={5000} step={1}
                    display={fmtIN(dividendPerShare)} onChange={setDividendPerShare} compact />

                  {mode === 'total-return' && (
                    <Slider id="num-shares" label="Number of Shares" value={numShares} min={1} max={100000} step={1}
                      display={`${numShares.toLocaleString('en-IN')}`} onChange={setNumShares} compact />
                  )}

                  <Slider id="holding-period" label="Holding Period (Years)" value={holdingPeriod} min={1} max={50} step={1}
                    display={`${holdingPeriod} yrs`} onChange={setHoldingPeriod} compact />
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Donut */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 16 : 20 }}>
                    <DonutChart priceReturn={priceReturnAbs} dividendReturn={dividendReturnAbs} />
                  </div>
                  {/* Legend */}
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: mobile ? 12 : 20 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Price Return</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Dividend Return</span>
                    </div>
                  </div>

                  {/* Primary result: Total Return or CAGR */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.dark }}>
                      {mode === 'total-return' ? 'Total Return' : 'Annualized Return (CAGR)'}
                    </span>
                    <span aria-live="polite" style={{ fontSize: mobile ? 20 : 26, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>
                      {mode === 'total-return' ? `${totalReturnPct.toFixed(2)}%` : `${cagr.toFixed(2)}%`}
                    </span>
                  </div>

                  {/* Stat rows */}
                  {mode === 'total-return' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>Annualized Return (CAGR)</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: '#166534' }}>{cagr.toFixed(2)}%</span>
                    </div>
                  )}
                  {mode === 'annualized' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>Total Return</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{totalReturnPct.toFixed(2)}%</span>
                    </div>
                  )}

                  {[
                    { label: 'Price Return', value: `${priceReturnPct.toFixed(2)}%` },
                    { label: 'Dividend Return', value: `${totalReturnPct - priceReturnPct >= 0 ? (totalReturnPct - priceReturnPct).toFixed(2) : '0.00'}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {mode === 'total-return' && [
                    { label: 'Total Investment', value: fmtC(totalInvested) },
                    { label: 'Total Value', value: fmtC(totalValue) },
                    { label: 'Total Gain', value: fmtC(totalAbsoluteGain) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Price Return {pricePctOfReturn}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Dividend Return {dividendPctOfReturn}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pricePctOfReturn}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.7, margin: '-20px 0 24px' }}>
              With the default inputs, the donut chart shows how much of your total gain came from price appreciation (88%) versus dividends (12%). Return percentages in the result card are calculated on your original investment.
            </p>

            <div style={{ marginBottom: 24 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ════════════════════ ARTICLE ════════════════════ */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={{ margin: '0 0 44px' }} id="what-is-stock-return">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is Stock Return?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Stock return is the percentage gain or loss an investor earns from buying and holding a stock over a given period. It has two components: price appreciation and dividend income.
                  </p>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  When you buy a stock on the NSE or BSE, total return depends on the share-price change and any dividends the company pays. Price return alone leaves out that cash income. Use the same holding period for the price and dividend figures.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  A share-price chart usually shows price return, not dividends received. For index comparisons, use a Total Return Index (TRI), which includes dividends; check the methodology and period shown by the data provider.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Use the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> alongside this tool to compare stock returns with other asset classes.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="stock-return-step-by-step">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How to Calculate Stock Return Step by Step (Using the Calculator's Default Values)</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>The default example starts with 100 shares bought at ₹500, now priced at ₹820, with ₹45 in total dividends per share over five years.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Investment: ₹500 × 100 = ₹50,000.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Current value: ₹820 × 100 = ₹82,000.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Dividends received: ₹45 × 100 = ₹4,500.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Total value including dividends: ₹82,000 + ₹4,500 = ₹86,500.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Total gain: ₹86,500 - ₹50,000 = ₹36,500.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Price return: (₹820 - ₹500) / ₹500 = 64%.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Dividend return: ₹45 / ₹500 = 9%.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Total return: 64% + 9% = 73%.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>CAGR: (₹865 / ₹500)^(1/5) - 1 = approximately 11.59% a year.</li>
                </ol>
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7, margin: 0 }}>This matches the result shown in the calculator above.</p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="good-stock-return-india">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>What Is a Good Stock Return in India?</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>A good stock return beats inflation and compares well with a suitable benchmark over the same period, after considering risk, taxes and costs.</p>
                <ArticleTable headers={['Benchmark', 'What it represents', 'How to use it']} rows={[
                  ['Fixed deposit', 'Illustrative 6% to 7% pre-tax; [verify current rate]', 'Compare with a similar period and account for tax at your slab.'],
                  ['Inflation (CPI)', 'Consumer price changes; an illustrative 4% to 6% range is not a forecast.', 'Use the official CPI series for the same dates to estimate purchasing-power growth.'],
                  ['Nifty 50 TRI', '[verify latest 10-year and 20-year CAGR from NSE Indices factsheet]', 'A broad large-company equity benchmark that includes dividends.'],
                  ['Nifty 500 TRI', '[verify latest 10-year and 20-year CAGR from NSE Indices factsheet]', 'A broader listed-equity benchmark that includes dividends.'],
                  ['Gold', 'Domestic gold-price return over the matching dates.', 'Include costs and taxes; gold does not produce company dividends.'],
                ]} />
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: 0 }}>
                  Use the same start date, end date and return type for each comparison. Check current deposit rates with the <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a>, inflation releases from <a href="https://www.mospi.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>MoSPI</a>, and index data from <a href="https://www.niftyindices.com/reports/historical-data" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NSE Indices</a>. Equity returns can be negative, even over long periods.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="stock-return-after-tax">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Stock Return After Tax in India</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>The calculator shows pre-tax returns, while your final proceeds depend on holding period, STT conditions, other gains and your tax position.</p>
                <ArticleTable headers={['Income or gain', 'General treatment for resident individuals']} rows={[
                  ['Listed equity STCG', 'Generally 20% for holdings of 12 months or less where the applicable STT conditions are met.'],
                  ['Listed equity LTCG', 'Generally 12.5% on aggregate eligible gains above ₹1.25 lakh in a financial year for transfers on or after 23 July 2024.'],
                  ['Dividends', 'Taxed at the recipient’s applicable income-tax slab rate. TDS is generally 10% when aggregate dividends exceed ₹10,000 in a financial year; [verify current threshold].'],
                  ['Health and education cess', 'Generally 4% of income tax, before any applicable surcharge.'],
                ]} />
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px' }}>
                  <strong>Illustrative after-tax example:</strong> The default shares produce ₹32,000 in price gains and ₹4,500 in dividends. Assuming the ₹32,000 qualifies for the annual LTCG exemption, no other eligible gains use that exemption, and dividends fall in a 30% slab, dividend tax plus 4% cess is ₹1,404. Approximate gain after this tax is ₹35,096, before transaction charges.
                </p>
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: 0 }}>
                  Rates and thresholds can change through legislation. Confirm current treatment with the <a href="https://www.incometax.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Department</a> or a CA. The <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Capital Gains Calculator</Link> can estimate eligible equity gains.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '16px 0 8px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>Capital Gains Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Estimate eligible equity gains using holding period and exemption rules.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={{ margin: '0 0 44px' }} id="corporate-actions-and-return">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How Stock Splits, Bonus Shares and Rights Issues Affect Your Return</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>Corporate actions change your share count or cost basis, so adjust both sides of a return calculation instead of comparing unadjusted prices.</p>
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: '0 0 12px' }}>In a 1:5 split, 100 shares bought at ₹1,000 become 500 shares with an adjusted cost of ₹200 each; the total cost remains ₹1,00,000. A 1:1 bonus issue doubles the share count and halves the adjusted cost per share. A rights issue requires including the additional subscription amount and shares in the investment calculation.</p>
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: 0 }}>Use split- and bonus-adjusted historical prices from <a href="https://www.nseindia.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NSE</a>, <a href="https://www.bseindia.com/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>BSE</a> or your broker. For dividends paid before a split, divide the total rupee dividend by the adjusted share count when converting it to a per-share figure for the current share basis.</p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="total-return-vs-xirr">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Total Return vs XIRR: When CAGR Is Not Enough</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>CAGR works for one investment made at the start and valued at the end; XIRR is better when purchases, sales or dividends happen on different dates.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>1 April: invest ₹10,000.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>1 October: invest another ₹10,000 and receive a ₹200 dividend.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>31 March: value the shares and dividend cash at ₹22,000; use XIRR with each dated cash flow to annualise the result.</li>
                </ol>
                <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.8, margin: '0 0 16px' }}>In Excel or Google Sheets, use XIRR(cash_flows, dates), with investments entered as negative cash flows and proceeds or dividends as positive flows. A single end-value CAGR would ignore when the second purchase and dividend occurred.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>XIRR Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Annualise returns when your investments and cash flows have different dates.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={{ margin: '0 0 44px' }} id="common-stock-return-mistakes">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Common Mistakes When Calculating Stock Returns</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 12px' }}>Most return errors come from omitting cash flows, costs or the dates behind the calculation.</p>
                <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Ignoring dividends understates the total return of a dividend-paying share.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Comparing holding-period returns across different durations hides the annual growth rate.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Unadjusted prices after splits or bonus issues distort both share count and cost.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Brokerage, STT, stamp duty, exchange charges, DP charges and taxes reduce proceeds.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>An arithmetic average does not show compounded growth; use CAGR for a single start and end value.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Dividends paid on different dates need separate cash-flow dates if you reinvest or calculate XIRR.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Absolute return is the whole-period gain, not the annualised return.</li>
                </ul>
              </div>

              <div style={{ margin: '0 0 44px' }} id="stock-return-vs-investments">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Stock Return vs Other Investments</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>On the same ₹50,000 starting amount, the calculator’s illustrative stock example ends at ₹86,500, compared with about ₹70,128 for a 7% compounded FD over five years.</p>
                <ArticleTable headers={['Illustration', 'Assumption', 'Value after five years']} rows={[
                  ['Stock example', '73% total return, including ₹4,500 dividends; no tax or costs.', '₹86,500'],
                  ['Fixed deposit', '7% annual compounding, before tax.', 'About ₹70,128'],
                  ['Inflation reference', '5% annual inflation; amount needed to match purchasing power.', 'About ₹63,814'],
                ]} />
                <p style={{ fontSize: 13, color: C.ink3, lineHeight: 1.7, margin: 0 }}>Illustrative only. The stock example is not a forecast, and the FD and inflation assumptions are not current quotes. Equity values can fall, while deposit tax treatment depends on the investor.</p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="who-should-use-stock-return-calculator">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Who Should Use This Calculator?</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 12px' }}>This calculator is useful when you need a quick pre-tax return estimate for a single share or holding.</p>
                <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Long-term investors comparing a holding with an index or deposit benchmark.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Dividend investors separating price appreciation from cash income.</li>
                  <li style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7 }}>Traders reviewing completed positions, and CAs or advisers preparing client discussions.</li>
                </ul>
              </div>

              <div style={{ margin: '0 0 44px' }} id="related-stock-calculators">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Related Calculators</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>These calculators cover annualised growth, dividends, portfolios, cash flows and tax questions that sit beside a stock return estimate.</p>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                  {[
                    ['/calculators/cagr-calculator', 'CAGR Calculator', 'Annualise a single investment’s start and end values.'],
                    ['/calculators/dividend-yield-calculator', 'Dividend Yield Calculator', 'Compare annual dividend income with a share price.'],
                    ['/calculators/dividend-reinvestment-calculator', 'Dividend Reinvestment Calculator', 'Model the effect of reinvesting cash dividends.'],
                    ['/calculators/portfolio-return-calculator', 'Portfolio Return Calculator', 'Calculate a weighted return across multiple holdings.'],
                    ['/calculators/sip-calculator', 'SIP Calculator', 'Project regular monthly investments.'],
                    ['/calculators/xirr-calculator', 'XIRR Calculator', 'Annualise a series of dated investments and proceeds.'],
                    ['/calculators/capital-gains-calculator', 'Capital Gains Calculator', 'Estimate eligible gains and tax for investments.'],
                  ].map(([href, title, description]) => (
                    <Link key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 16px', color: C.ink, textDecoration: 'none' }}>
                      <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{title}</span>
                      <span style={{ display: 'block', fontSize: 12.5, lineHeight: 1.6, color: C.ink2 }}>{description}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div style={{ margin: '0 0 44px' }} id="stock-return-formula">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Stock Return Formula: Price Return and Total Return</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>The stock return formula has two versions depending on whether dividends are included.</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 14 }}>Price Return Formula</p>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Price Return = ((Final Price - Initial Price) / Initial Price) x 100
                  </code>
                </div>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <p style={{ fontWeight: 700, margin: '0 0 8px', fontSize: 14 }}>Total Return Formula (With Dividends)</p>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Total Return = ((Final Price + Total Dividends - Initial Price) / Initial Price) x 100
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap', width: 140 }} scope="col">Variable</th><th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' }} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Initial Price', 'Price per share when you bought the stock'],
                        ['Final Price', 'Price per share at sale or current market price'],
                        ['Total Dividends', 'Sum of all dividends per share received'],
                        ['Total Return', 'Overall return including dividends (in %)'],
                        ['Price Return', 'Return from price change alone (in %)'],
                      ].map(([v, m]) => (
                        <tr key={v as string}><td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' }}>{v}</td><td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' }}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Worked example:</strong> You bought shares of HDFC Bank at Rs 1,200 per share. Two years later, the price is Rs 1,500, and you received Rs 60 in total dividends per share. Price return = (1,500 - 1,200) / 1,200 x 100 = 25%. Total return = (1,500 + 60 - 1,200) / 1,200 x 100 = 30%. Dividends added 5 percentage points to the total.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="price-return-vs-total-return">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Stock Return vs Total Return vs Price Return</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Price return measures only the change in the stock price. Total return includes dividends, interest, and any other cash flows received from the investment during the holding period. Total Shareholder Return (TSR) is the industry standard for measuring total return on equities.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  For a stock that pays no dividend during the period, price return and total return are identical. Otherwise, total return adds the cash dividends received per share. The share-price change and dividend figures must cover the same dates.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Price return vs total return for Indian stocks with a 3-year holding period.</caption>
                    <thead><tr>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Metric</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Price Return</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Total Return</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Illustrative holding', '64%', '73%'],
                      ].map((row, i) => (
                        <tr key={row[0] as string} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, textAlign: 'left', border: `1px solid ${C.border}` }}>{row[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', border: `1px solid ${C.border}` }}>{row[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 700, textAlign: 'left', border: `1px solid ${C.border}` }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  A larger dividend payment creates a larger gap between price return and total return, all else being equal. Use a TRI when comparing an equity investment with an index so that dividend income is not omitted from the benchmark.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="total-return-formula">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Total Return Formula: With Dividends</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The total return formula captures every rupee your investment generated. It is the only formula that tells you what you actually earned, not what the stock price alone suggests.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    Total Return (%) = ((Final Price - Purchase Price + Dividends Per Share) / Purchase Price) x 100
                  </code>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Worked example using the default inputs:</strong> Purchase price ₹500, current price ₹820, and total dividends of ₹45 per share over five years.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Illustrative per-share return breakdown over five years using the calculator defaults.</caption>
                    <thead><tr>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Component</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Per Share</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Return %</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['Purchase Price', '₹500', '-'],
                        ['Current Price', '₹820', '-'],
                        ['Price Gain', '₹320', '64%'],
                        ['Dividends Received', '₹45', '9%'],
                        ['Total Return', '₹365', '73%'],
                      ].map((row, i) => (
                        <tr key={row[0] as string} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: i === 4 ? C.dark : C.ink2, fontWeight: i === 4 ? 700 : 400, textAlign: 'left', border: `1px solid ${C.border}`, verticalAlign: 'middle' }}>{row[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'right', border: `1px solid ${C.border}`, verticalAlign: 'middle' }}>{row[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 700, textAlign: 'right', border: `1px solid ${C.border}`, verticalAlign: 'middle' }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The <Link href="/calculators/dividend-yield-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Dividend Yield Calculator</Link> can help you estimate the dividend component separately.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="annualized-return-cagr">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Annualized Return (CAGR) for Stocks</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Annualized return, also called Compound Annual Growth Rate (CAGR), converts the total return into a per-year rate assuming the investment grew at a steady pace each year. This is the standard metric for comparing stock returns across different holding periods.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    CAGR = ((Final Price + Total Dividends) / Purchase Price) ^ (1 / Years) - 1
                  </code>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Worked example using the defaults:</strong> The final value per share, including dividends, is ₹865. Over five years, CAGR = (₹865 / ₹500)^(1/5) - 1 = approximately 11.59% a year. This annualised result makes it easier to compare the holding with another investment measured over a different period.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> provides the same calculation for any asset, not just stocks.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="stock-return-calculator-indian">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Stock Return Calculator for Indian Stocks: Practical Examples</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The calculator above works for any stock listed on NSE or BSE. Here are two realistic scenarios to show how the inputs translate into results.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Illustrative holding:</strong> 100 shares bought at ₹500 cost ₹50,000. At ₹820 per share, with ₹45 in dividends per share, the current value plus cash dividends is ₹86,500 and the total gain is ₹36,500.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Dividend comparison:</strong> In that example, price appreciation contributes ₹32,000 of the ₹36,500 total gain, while dividends contribute ₹4,500. The result is an illustration, not a past or expected return for a listed company.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="dividend-adjusted-return-calculation">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Dividend-Adjusted Return Calculation</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Dividend-adjusted return is another name for a simple total return calculation that adds cash dividends to price appreciation. It is not the same as a dividend-reinvestment return, which accounts for the dates when dividends bought additional shares.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    Dividend-Adjusted Return (%) = ((Final Price + Sum of All Dividends) - Initial Price) / Initial Price x 100
                  </code>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  For stocks that pay dividends quarterly or annually, the total dividend amount is the sum of all dividend payments per share during the holding period. This calculator accepts the total dividend per share figure directly. Track your dividends using the <Link href="/calculators/dividend-reinvestment-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Dividend Reinvestment Calculator</Link> to see how reinvested dividends would have grown your portfolio further.
                </p>
              </div>

              <div style={{ margin: '0 0 44px' }} id="holding-period-return">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Holding Period Return (HPR)</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Holding Period Return (HPR) is the total return earned over the entire time you held the stock, expressed as a simple percentage without annualizing. It answers the question: what did I earn overall.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    HPR = (Ending Value - Beginning Value + Income) / Beginning Value x 100
                  </code>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  <strong>Illustrative Bajaj Finance example:</strong> Suppose 30 shares cost ₹4,000 each and are later sold for ₹5,200 each, with ₹30 per share in dividends. The ₹1,20,000 investment becomes ₹1,56,900, so HPR is 30.75%; over two years, CAGR is (1.3075)^(1/2) - 1 = 14.35% a year.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Holding period return vs annualized return for different holding periods, same stock performance.</caption>
                    <thead><tr>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Holding Period</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">HPR</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Annualized (CAGR)</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['1 year', '30.75%', '30.75%'],
                        ['2 years', '30.75%', '14.35%'],
                        ['3 years', '30.75%', '9.32%'],
                        ['5 years', '30.75%', '5.52%'],
                      ].map((row, i) => (
                        <tr key={row[0] as string} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, textAlign: 'left', border: `1px solid ${C.border}` }}>{row[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{row[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 700, textAlign: 'right', border: `1px solid ${C.border}` }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ margin: '0 0 44px' }} id="arithmetic-vs-geometric">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Arithmetic vs Geometric Average Return for Stocks</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  The arithmetic average adds each year's return and divides by the number of years. The geometric average (CAGR) accounts for compounding, which means it reflects what an investor actually earned.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 2px 0' }}>Arithmetic mean vs geometric mean (CAGR) for different annual return sequences.</caption>
                    <thead><tr>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Yearly Returns</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Arithmetic Avg</th>
                      <th style={{ padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'right', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}` }} scope="col">Geometric Avg (CAGR)</th>
                    </tr></thead>
                    <tbody>
                      {[
                        ['+20%, +20%', '20.00%', '20.00%'],
                        ['+30%, -10%, +15%', '11.67%', '10.40%'],
                        ['+40%, -20%, +10%, +10%', '10.00%', '7.89%'],
                        ['+50%, -30%, +20%', '13.33%', '8.01%'],
                        ['+15%, +15%, +15%', '15.00%', '15.00%'],
                      ].map((row, i) => (
                        <tr key={row[0] as string} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, textAlign: 'left', border: `1px solid ${C.border}` }}>{row[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{row[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: '#166534', fontWeight: 700, textAlign: 'right', border: `1px solid ${C.border}` }}>{row[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  When volatility is zero, both averages are identical. As volatility increases, the gap between arithmetic and geometric averages widens. The geometric average (CAGR) is always lower than or equal to the arithmetic average. This is why fund fact sheets show CAGR, not simple average returns, for periods over one year.
                </p>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Compare the weighted snapshot of several holdings with the <Link href="/calculators/portfolio-return-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Portfolio Return Calculator</Link>; it does not calculate volatility.
                </p>
              </div>

              

              <div style={{ margin: '0 0 44px' }} id="how-to-use">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>How to Use This Stock Return Calculator</h2>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>The calculator has two modes to match what you want to measure. Pick the tab that answers your question.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the purchase price per share:</strong> this is the price you paid when you bought the stock. If you bought at multiple prices, use the average cost per share.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the current or selling price:</strong> the market price today, or the price at which you sold the stock.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add total dividends received per share:</strong> sum up all dividends paid per share during your holding period. Check NSE India or your broker for the exact dividend history.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the holding period in years:</strong> the number of full or partial years you held the stock. Switch to the Annualized Return tab to see the CAGR directly.
                  </li>
                </ol>
                <p style={{ fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' }}>
                  Click any input value to type a precise number. The donut chart shows how much of your total return came from price appreciation versus dividends. Use the currency selector to convert all amounts to USD, EUR, GBP, or other currencies if you track your portfolio in a foreign currency.
                </p>
              </div>

              <div style={{ margin: '0 0 40px' }} id="faq">
                <h2 style={{ fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' }}>Frequently Asked Questions</h2>
                <FAQ />
              </div>


              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 8px' }}>Calculation arithmetic checked against the examples shown above.</p>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All figures on this page are indicative estimates based on the inputs you provide. Stock returns depend on market conditions, company performance, and economic factors that this calculator does not evaluate. Past returns do not guarantee future performance. Rates and tax rules mentioned here are indicative and may change. Verify current details with RBI, SEBI and the Income Tax Department before making decisions. This tool is for education and planning only, not financial advice or a recommendation to buy, sell or hold a security. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <aside style={{
            position: mobile ? 'static' : 'sticky',
            top: 20,
            alignSelf: 'start',
            maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
            overflowY: mobile ? 'visible' : 'auto',
            paddingRight: mobile ? 0 : 4,
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <SidebarList title="Popular Calculators" items={POPULAR} />
                <SidebarList title="More Tools" items={MORE} />
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/stock-return-calculator|Stock Returns', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} />
    </div>
  );
}

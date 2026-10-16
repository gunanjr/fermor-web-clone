'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import { FAQBox } from '@/components/common/FAQBox';

const C = {
  dark:      '#101214',
  lime:      '#a6dbc4',
  lime2:     '#2d9970',
  paleLime:  '#f4f5f6',
  ink:       '#16140F',
  ink2:      '#50565c',
  ink3:      '#7a8087',
  white:     '#ffffff',
  bg:        '#f6f7f8',
  border:    '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';

/* ─── UI Components ─────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={inputId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label} value`}
            style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 7, padding: compact ? '6px 10px' : '7px 12px', width: 120, outline: 'none', color: C.ink, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: compact ? '5px 12px' : '6px 14px', cursor: 'pointer', fontFamily: INTER, minWidth: compact ? 88 : 105, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#AAAAAA')}
            onMouseOut={e => (e.currentTarget.style.borderColor = C.border)}>
            {fmt(value)}
          </button>
        )}
      </div>
      <div style={{ position: 'relative', height: 24, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 'auto 0', height: 4, borderRadius: 99, background: `linear-gradient(to right, ${C.dark} ${pct}%, ${C.border} ${pct}%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translate(-50%,-50%)', width: 18, height: 18, borderRadius: '50%', background: C.white, border: `2.5px solid ${C.dark}`, boxShadow: '0 1px 6px rgba(16,18,20,0.18)', pointerEvents: 'none', zIndex: 1 }} />
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(+e.target.value)}
          aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
          style={{ position: 'absolute', inset: 0, width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, margin: 0 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

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

function FAQ({ faqs }: { faqs: {q: string, a: string}[] }) {
  return <FAQBox items={faqs} />;
}


function InflationBarChart({ rows }: { rows: { year: number; base: number; impact: number }[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => r.base + r.impact));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year purchasing power vs inflation impact on cost of goods"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = row.base + row.impact;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const progress = rows.length > 1 ? i / (rows.length - 1) : 0;
        const visualBase = row.base * (1 + progress * 0.5);
        const baseH = total > 0 ? (Math.min(visualBase, total) / total) * totalH : 0;
        const impactH = totalH - baseH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={impactH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - baseH} width={barW} height={baseH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 30 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 20 ? 7 : 9, fill: C.ink3, fontFamily: INTER }}>
                {row.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

export default function InflationClient({ region = 'in', faqs }: { region?: string, faqs: any[] }) {
  const defaultSettings = { amount: 100000, inflationRate: 6, years: 10, monthlyContrib: 0, returnRate: 0, isRealMode: false };
  const { settings, updateSettings } = useCalculatorSettings('inflation-calculator', defaultSettings);
  const { amount, inflationRate, years, monthlyContrib, returnRate, isRealMode } = settings;
  const setAmount = (v: number) => updateSettings({ amount: v });
  const setInflationRate = (v: number) => updateSettings({ inflationRate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setMonthlyContrib = (v: number) => updateSettings({ monthlyContrib: v });
  const setReturnRate = (v: number) => updateSettings({ returnRate: v });
  const setIsRealMode = (v: boolean) => updateSettings({ isRealMode: v });
      
  // Advanced Settings
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);
      
  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Core calculations
  const futureCostOfGoods = amount * Math.pow(1 + inflationRate / 100, years);
  const purchasingPowerLossPct = (1 - (amount / futureCostOfGoods)) * 100;
  const amountToMaintainPurchasingPower = futureCostOfGoods;
  
  // Investment projection
  let futureNominalWealth = amount;
  for (let i = 0; i < years; i++) {
    futureNominalWealth = futureNominalWealth * (1 + returnRate / 100) + (monthlyContrib * 12);
  }
  const futureRealWealth = futureNominalWealth / Math.pow(1 + inflationRate / 100, years);

  const POPULAR = [
    { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
    { href: '/calculators/nps-calculator',     label: 'NPS Calculator' },
    { href: '/calculators/ppf-calculator',     label: 'PPF Calculator' },
    { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
    { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  ];
  const MORE = [
    { href: '/calculators/fd-calculator',                label: 'FD Calculator' },
    { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
    { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
    { href: '/calculators/emi-calculator',               label: 'EMI Calculator' },
    { href: '/calculators/vpf-calculator',               label: 'VPF Calculator' },
  ];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Inflation Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate future cost, purchasing power loss, and real vs nominal wealth. Current India CPI inflation: 4.82% (August 2026).
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>
            {/* CALCULATOR CARD */}
            <section aria-label="Inflation Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Current Amount" value={amount} min={1000} max={10000000} step={1000} fmt={fmtC} onChange={setAmount} compact={mobile} />
                      <Slider label="Annual Inflation Rate" value={inflationRate} min={0} max={20} step={0.5} fmt={v => `${v}%`} onChange={setInflationRate} compact={mobile} />
                      <Slider label="Time Period" value={years} min={1} max={50} step={1} fmt={v => `${v} yrs`} onChange={setYears} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Future Cost of Goods</span>
                          <span>{fmtC(amountToMaintainPurchasingPower)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                          <span>Current Value: {fmtC(amount)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.dark, fontWeight: 600 }}>
                          <span>Inflation Impact: {purchasingPowerLossPct.toFixed(1)}%</span>
                        </div>
                      </div>

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Monthly Contribution" value={monthlyContrib} min={0} max={1000000} step={1000} fmt={fmtC} onChange={setMonthlyContrib} compact={mobile} />
                      <Slider label="Expected Return Rate" value={returnRate} min={0} max={30} step={0.5} fmt={v => `${v}%`} onChange={setReturnRate} compact={mobile} />

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '12px 16px', borderRadius: 8, marginBottom: 24 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink2 }}>Chart Mode</span>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 6, overflow: 'hidden' }}>
                          <button onClick={() => setIsRealMode(false)} style={{ padding: '6px 12px', fontSize: 12, fontWeight: isRealMode ? 400 : 600, border: 'none', background: !isRealMode ? C.white : 'transparent', color: !isRealMode ? C.ink : C.ink3, cursor: 'pointer', fontFamily: INTER }}>Nominal</button>
                          <button onClick={() => setIsRealMode(true)} style={{ padding: '6px 12px', fontSize: 12, fontWeight: isRealMode ? 600 : 400, border: 'none', background: isRealMode ? C.white : 'transparent', color: isRealMode ? C.ink : C.ink3, cursor: 'pointer', fontFamily: INTER }}>Real</button>
                        </div>
                      </div>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Add a monthly contribution and expected return rate to see nominal vs real wealth growth alongside rising costs.
                      </p>

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Cost of {fmtIN(amount)} in {years} Years
                    </span>
                    <span aria-live="polite" aria-label={`Future cost: ${fmtIN(amountToMaintainPurchasingPower)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(amountToMaintainPurchasingPower)}
                    </span>
                  </div>

                  {[
                    { label: 'Current Amount', value: fmtC(amount) },
                    { label: 'Annual Inflation Rate', value: `${inflationRate}%` },
                    { label: 'Future Cost of Goods', value: fmtC(amountToMaintainPurchasingPower) },
                    { label: 'Purchasing Power Loss', value: `${purchasingPowerLossPct.toFixed(1)}%` },
                    { label: 'Inflation Impact', value: fmtC(amountToMaintainPurchasingPower - amount) },
                    { label: 'Time Period', value: `${years} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut Chart: order -1 renders it above the dark box on desktop, order 1 drops it below on mobile */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    {(() => {
                      const futureCost = amountToMaintainPurchasingPower;
                      const purchasingPower = amount;
                      const total = futureCost;
                      if (total === 0) return null;
                      const R = 80, sw = 20, cx = 106, cy = 106;
                      const circ = 2 * Math.PI * R;
                      const pArc = (purchasingPower / total) * circ;
                      const pPct = Math.round((purchasingPower / total) * 100);
                      return (
                        <svg width="212" height="212" viewBox="0 0 212 212" role="img" aria-label={`Purchasing power vs future cost: ${pPct}% today, ${100 - pPct}% inflation impact`} style={{ display: 'block' }}>
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
                          <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
                            strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
                            style={{ transition: 'stroke-dasharray 0.4s ease' }} />
                          <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Today</text>
                          <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
                        </svg>
                      );
                    })()}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Today ({fmtC(amount)})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>In {years} Yrs ({fmtC(amountToMaintainPurchasingPower)})</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Today {Math.round((amount / amountToMaintainPurchasingPower) * 100)}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Inflation Impact {100 - Math.round((amount / amountToMaintainPurchasingPower) * 100)}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Purchasing power is ${Math.round((amount / amountToMaintainPurchasingPower) * 100)}% of future cost`}>
                      <div style={{ height: '100%', width: `${Math.round((amount / amountToMaintainPurchasingPower) * 100)}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-by-year growth accordion */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowTable(v => !v)}
                  aria-expanded={showTable} aria-controls="inflation-growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Inflation Growth</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding at {inflationRate}%</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {years} yr · {inflationRate}% rate
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div id="inflation-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Purchasing Power (Today&apos;s Value)</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Inflation Impact</span>
                        </div>
                      </div>
                      <InflationBarChart rows={Array.from({ length: years + 1 }).map((_, i) => {
                        const cost = amount * Math.pow(1 + inflationRate / 100, i);
                        return { year: new Date().getFullYear() + i, base: amount, impact: cost - amount };
                      })} />
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0 4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                          style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                      </div>
                    )}
                    <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 600, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Year-by-year cost of goods, purchasing power loss, and wealth projection</caption>
                        <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                          <tr style={{ background: '#f4f5f6', borderBottom: `1px solid ${C.border}` }}>
                            <th scope="col" style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.ink, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Year</th>
                            <th scope="col" style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Cost of Goods</th>
                            <th scope="col" style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Purchasing Power Loss</th>
                            {returnRate > 0 && <th scope="col" style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Nominal Wealth</th>}
                            {returnRate > 0 && <th scope="col" style={{ padding: '10px 14px', fontSize: 11, fontWeight: 700, color: C.ink, textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Real Wealth</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: years + 1 }).map((_, i) => {
                            const cost = amount * Math.pow(1 + inflationRate / 100, i);
                            const loss = (1 - (amount / cost)) * 100;

                            let nomW = amount;
                            for (let j = 0; j < i; j++) nomW = nomW * (1 + returnRate / 100) + (monthlyContrib * 12);
                            const realW = nomW / Math.pow(1 + inflationRate / 100, i);

                            return (
                              <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{new Date().getFullYear() + i}</td>
                                <td style={{ padding: '11px 14px', fontWeight: 600, color: C.ink }}>{fmtIN(cost)}</td>
                                <td style={{ padding: '11px 14px', fontWeight: 500, color: C.ink3 }}>{loss.toFixed(1)}%</td>
                                {returnRate > 0 && <td style={{ padding: '11px 14px', fontWeight: 500, color: C.ink2 }}>{fmtIN(nomW)}</td>}
                                {returnRate > 0 && <td style={{ padding: '11px 14px', fontWeight: 600, color: C.dark }}>{fmtIN(realW)}</td>}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
                const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const };
                const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const };
                return (
                  <>
                    <div style={sec} id="what-is-inflation">
                      <h2 style={h2}>What Is Inflation?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Inflation is the rate at which the general level of prices for goods and services rises, reducing how much a fixed amount of money can buy. It is reported in India as the Consumer Price Index (CPI), published monthly by the Ministry of Statistics and Programme Implementation (MOSPI).
                        </p>
                      </div>
                      <p style={p}>
                        Inflation is the invisible tax that erodes the purchasing power of your money over time. When inflation occurs, every rupee you own buys a smaller percentage of a good or service than it did a year earlier, even though the number of rupees in your account has not changed.
                      </p>
                      <p style={p}>
                        The Reserve Bank of India (RBI) targets CPI inflation at 4%, with a tolerance band of plus or minus 2 percentage points, meaning it aims to keep inflation between 2% and 6% through its monetary policy decisions, primarily by adjusting the repo rate.
                      </p>
                    </div>

                    <div style={sec} id="how-inflation-affects-purchasing-power">
                      <h2 style={h2}>How Inflation Affects Purchasing Power</h2>
                      <p style={p}>
                        If you keep Rs 1,00,000 in cash for 10 years and inflation averages 6% annually, you will still have exactly Rs 1,00,000 in nominal terms. It would now take approximately Rs 1,79,000 to buy what Rs 1,00,000 bought 10 years earlier.
                      </p>
                      <p style={p}>
                        Your money has effectively lost close to 44% of its purchasing power without a single rupee being spent or stolen. This is why a cash balance, or any account earning less than the inflation rate, carries a real financial cost even though the balance itself never falls.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Future cost of common expenses at 6% average inflation over 10 and 20 years</caption>
                          <thead><tr><th scope="col" style={thS}>Expense</th><th scope="col" style={{ ...thS, textAlign: 'right' as const }}>Cost Today</th><th scope="col" style={{ ...thS, textAlign: 'right' as const }}>In 10 Years</th><th scope="col" style={{ ...thS, textAlign: 'right' as const }}>In 20 Years</th></tr></thead>
                          <tbody>
                            {[
                              ['A cup of coffee', 150, 269, 481],
                              ['Monthly rent', 25000, 44771, 80178],
                              ['A small car', 800000, 1432678, 2565708],
                            ].map((r, i) => (
                              <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={tdL}>{r[0]}</td>
                                <td style={tdR}>{fmtIN(r[1] as number)}</td>
                                <td style={tdR}>{fmtIN(r[2] as number)}</td>
                                <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(r[3] as number)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        Figures assume a flat 6% annual inflation rate applied to today&apos;s illustrative prices, not a live price feed. Use the calculator above with your own item cost and rate for a precise number.
                      </p>
                    </div>

                    <div style={sec} id="inflation-formula">
                      <h2 style={h2}>Inflation Formula: How to Calculate Future Cost</h2>
                      <p style={p}>
                        The future cost of an item under inflation follows the same compound growth formula used for investment returns, just applied to prices instead of wealth.
                      </p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 15, color: C.dark, fontWeight: 700 }}>
                        FV = PV × (1 + r)^n
                      </div>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Inflation formula variables</caption>
                          <thead><tr><th scope="col" style={thS}>Variable</th><th scope="col" style={thS}>Meaning</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>FV</td><td style={tdL}>Future cost of the item or amount</td></tr>
                            <tr><td style={tdL}>PV</td><td style={tdL}>Present cost or amount today</td></tr>
                            <tr><td style={tdL}>r</td><td style={tdL}>Annual inflation rate, as a decimal</td></tr>
                            <tr><td style={tdL}>n</td><td style={tdL}>Number of years</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Worked example: a family&apos;s monthly grocery bill of ₹15,000 today, at 6% average inflation, becomes ₹15,000 × (1.06)^10 = approximately ₹26,863 in 10 years, an increase of almost 79% without any change in what the family actually buys.
                      </p>
                    </div>

                    <div style={sec} id="inflation-formula-excel">
                      <h2 style={h2}>Inflation Formula in Excel: Two Methods</h2>
                      <p style={p}>
                        Both methods below give the identical answer; use whichever function you already have memorised.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Excel formulas for future cost under inflation</caption>
                          <thead><tr><th scope="col" style={thS}>Method</th><th scope="col" style={thS}>Excel Formula</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>Direct formula</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=PV*(1+rate)^years</td></tr>
                            <tr><td style={tdL}>FV function</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=FV(rate, years, 0, -PV)</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div style={sec} id="reverse-inflation-calculator">
                      <h2 style={h2}>Reverse Inflation Calculator: What Was an Amount Worth in the Past?</h2>
                      <p style={p}>
                        A reverse inflation calculator answers a different question from the one above. Instead of projecting a cost forward, it discounts a present-day amount backward to find its value in an earlier year.
                      </p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 15, color: C.dark, fontWeight: 700 }}>
                        PV = FV / (1 + r)^n
                      </div>
                      <p style={p}>
                        Worked example: Rs 1,00,000 today, discounted back 10 years at an average 6% inflation rate, was worth roughly Rs 55,839 in purchasing-power terms a decade ago. Run the same formula on a dollar or rupee figure from any starting year by entering your own historical average rate above.
                      </p>
                      <p style={p}>
                        This calculator uses one flat rate you supply, not a stored series of historical CPI index values.
                      </p>
                      <p style={p}>
                        For an India-specific historical CPI series by month or year, cross-check the rate you use here against <a href="https://www.mospi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>MOSPI</a>&apos;s published CPI data before relying on the output for a specific past year.
                      </p>
                    </div>

                    <div style={sec} id="how-much-return-to-beat-inflation">
                      <h2 style={h2}>How Much Return Do You Need to Beat Inflation?</h2>
                      <p style={p}>
                        To beat inflation, your investment&apos;s nominal return must exceed the inflation rate, and by a meaningful margin once tax is accounted for.
                      </p>
                      <p style={p}>
                        At 6% inflation, a fixed deposit paying 7% nominal interest sounds fine until you subtract tax. For someone in the 30% tax bracket, the post-tax return drops to about 4.9%, which is below inflation.
                      </p>
                      <p style={p}>
                        That investor is losing real purchasing power despite seeing a positive return on the statement.
                      </p>
                      <p style={p}>
                        Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> to check whether a target monthly investment, growing at an assumed rate, actually outpaces the inflation rate you enter here over the same time horizon.
                      </p>
                    </div>

                    <div style={sec} id="real-vs-nominal-return">
                      <h2 style={h2}>Real Return vs Nominal Return: What Is the Difference?</h2>
                      <p style={p}>
                        Nominal return is the raw percentage your investment grew by, before adjusting for inflation. Real return is what that growth is actually worth in terms of purchasing power, calculated as the nominal return minus the inflation rate.
                      </p>
                      <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 15, color: C.dark, fontWeight: 700 }}>
                        Real Return ≈ Nominal Return − Inflation Rate
                      </div>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Nominal vs real return by asset type at 6% inflation</caption>
                          <thead><tr><th scope="col" style={thS}>Asset</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Typical Nominal Return</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Approx. Real Return</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>Savings account</td><td style={tdR}>3.0-3.5%</td><td style={tdR}>Negative</td></tr>
                            <tr><td style={tdL}>Bank Fixed Deposit</td><td style={tdR}>6.5-7.5%</td><td style={tdR}>0-1.5%</td></tr>
                            <tr><td style={tdL}>PPF</td><td style={tdR}>7.1%</td><td style={tdR}>~1%</td></tr>
                            <tr><td style={tdL}>Equity mutual funds (long term)</td><td style={tdR}>11-13%</td><td style={tdR}>5-7%</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                        Figures are broad, commonly-cited ranges for illustration, not a guarantee. Actual returns vary by product, tenure, and market conditions, and fixed deposit and PPF returns shown are pre-tax.
                      </p>
                    </div>

                    <div style={sec} id="india-historical-inflation">
                      <h2 style={h2}>India&apos;s Historical Inflation Rate: What Counts as Normal?</h2>
                      <p style={p}>
                        India&apos;s CPI inflation has moved in a wide range over the last few years. Retail inflation was 6.2% in FY2020-21 as the pandemic disrupted supply chains, then climbed back to 6.7% in FY2022-23.
                      </p>
                      <p style={p}>
                        It eased to 5.4% in FY2023-24 and 4.6% in FY2024-25, touched an eight-year low of 1.6% in July 2025, then rose again to 4.82% in August 2026, per <a href="https://www.mospi.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>MOSPI</a> data.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>India CPI inflation by financial year, plus recent monthly prints</caption>
                          <thead><tr><th scope="col" style={thS}>Period</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>CPI Inflation</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>FY2020-21</td><td style={tdR}>6.2%</td></tr>
                            <tr><td style={tdL}>FY2022-23</td><td style={tdR}>6.7%</td></tr>
                            <tr><td style={tdL}>FY2023-24</td><td style={tdR}>5.4%</td></tr>
                            <tr><td style={tdL}>FY2024-25</td><td style={tdR}>4.6%</td></tr>
                            <tr><td style={tdL}>July 2025 (monthly, 8-year low)</td><td style={tdR}>1.6%</td></tr>
                            <tr><td style={tdL}>May 2026 (monthly)</td><td style={tdR}>3.93%</td></tr>
                            <tr><td style={tdL}>June 2026 (monthly)</td><td style={tdR}>4.38%</td></tr>
                            <tr><td style={tdL}>July 2026 (monthly)</td><td style={tdR}>4.44%</td></tr>
                            <tr><td style={tdL}>August 2026 (monthly, latest)</td><td style={tdR}>4.82%</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        For long-term planning, use a rate somewhere between India&apos;s recent range of 4.5% and 6.5% as a starting assumption. A single month&apos;s figure can be skewed by a temporary food or fuel price shock.
                      </p>
                      <p style={p}>
                        The August 2026 uptick was driven largely by food and beverage prices at 5.95% and transport costs at 4.6%, per MOSPI&apos;s monthly CPI release.
                      </p>
                    </div>

                    <div style={sec} id="rbi-inflation-targeting">
                      <h2 style={h2}>RBI Inflation Targeting and the Repo Rate</h2>
                      <p style={p}>
                        The Reserve Bank of India controls inflation mainly through the repo rate, the rate at which it lends short-term funds to commercial banks. Raising the repo rate makes borrowing costlier across the economy, which cools demand and slows price rises. Cutting it does the opposite.
                      </p>
                      <p style={p}>
                        Under the flexible inflation targeting framework agreed with the government, the RBI&apos;s Monetary Policy Committee (MPC) targets 4% CPI inflation with a tolerance band of 2% to 6%.
                      </p>
                      <p style={p}>
                        The repo rate stood at 5.25% as of the MPC&apos;s August 2026 meeting, per the <a href="https://www.rbi.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI</a>&apos;s policy statement.
                      </p>
                      <p style={p}>
                        A rate cut generally makes fixed deposits and savings accounts less attractive relative to inflation, since bank deposit rates tend to move with the repo rate. Check the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> to see how a specific deposit rate compares against the inflation rate entered here.
                      </p>
                    </div>

                    <div style={sec} id="cpi-basket-weights">
                      <h2 style={h2}>How India&apos;s CPI Basket Is Weighted</h2>
                      <p style={p}>
                        India&apos;s Consumer Price Index is built from a weighted basket of goods and services, and food carries the largest single weight in that basket.
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Approximate weight of major groups in India&apos;s all-India CPI basket</caption>
                          <thead><tr><th scope="col" style={thS}>CPI Group</th><th scope="col" style={{ ...thS, textAlign: 'right' }}>Approx. Weight</th></tr></thead>
                          <tbody>
                            <tr><td style={tdL}>Food and beverages</td><td style={tdR}>~39-40%</td></tr>
                            <tr><td style={tdL}>Miscellaneous (transport, health, education, recreation)</td><td style={tdR}>~28%</td></tr>
                            <tr><td style={tdL}>Housing</td><td style={tdR}>~10%</td></tr>
                            <tr><td style={tdL}>Fuel and light</td><td style={tdR}>~6.8%</td></tr>
                            <tr><td style={tdL}>Clothing and footwear, pan/tobacco/intoxicants (remainder)</td><td style={tdR}>~15%</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Because food carries such a large weight, a poor monsoon or a spike in vegetable prices can move headline CPI noticeably even when every other category is stable.
                      </p>
                      <p style={p}>
                        Urban and rural CPI baskets, published separately by MOSPI, use slightly different weights to reflect different spending patterns.
                      </p>
                    </div>

                    <div style={sec} id="core-vs-headline-inflation">
                      <h2 style={h2}>Core Inflation vs Headline Inflation</h2>
                      <p style={p}>
                        Headline inflation is the full CPI number, including food and fuel. Core inflation strips food and fuel out of that number, since both are volatile and swing with monsoon output and global crude prices rather than underlying demand conditions.
                      </p>
                      <p style={p}>
                        The RBI and most economists watch core inflation as a better read on persistent, demand-driven price pressure in the economy.
                      </p>
                      <p style={p}>
                        A high headline number driven purely by a vegetable price spike is treated differently from a high core number, which signals broader pressure across services, housing, and manufactured goods.
                      </p>
                    </div>

                    <div style={sec} id="inflation-and-fixed-income">
                      <h2 style={h2}>Inflation and EPF, PPF Real Returns</h2>
                      <p style={p}>
                        EPF currently pays 8.25% and PPF pays 7.1% per annum, both under EEE tax status, meaning contributions, interest, and withdrawal are all tax-free.
                      </p>
                      <p style={p}>
                        Against CPI inflation in the 4.5% to 5% range, both deliver a positive real return, though a narrower one than what equity has historically delivered over 15-20 year horizons.
                      </p>
                      <p style={p}>
                        Run your own EPF projection through the <Link href="/calculators/vpf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>VPF Calculator</Link> or <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>PPF Calculator</Link>, then apply the inflation rate here to the maturity amount to see its value in today&apos;s purchasing power.
                      </p>
                    </div>

                    <div style={sec} id="inflation-and-mutual-funds">
                      <h2 style={h2}>Inflation and Mutual Fund Returns in India</h2>
                      <p style={p}>
                        Equity mutual funds are the asset class most commonly used in India to outpace inflation over long periods. The companies they hold can raise prices as their own costs rise, passing inflation through to revenue and, over time, to earnings and share prices.
                      </p>
                      <p style={p}>
                        Debt mutual funds and fixed deposits struggle to do the same, since their return is fixed at the time of investment regardless of what inflation does afterward.
                      </p>
                      <p style={p}>
                        Run a fund&apos;s actual historical return through the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link>, then subtract the inflation rate for that period from this calculator, to see the real return an investor actually earned, not just the headline number in a fund factsheet.
                      </p>
                    </div>

                    <div style={sec} id="limitations">
                      <h2 style={h2}>Limitations of This Inflation Calculator</h2>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Assumes a constant rate:</strong> real-world inflation varies year to year. A single flat assumption smooths over years that may run well above or below it.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Uses one economy-wide number:</strong> your own personal inflation rate depends on your spending mix. Education and healthcare costs in India have historically risen faster than the headline CPI, while some categories rise slower.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Does not model lifestyle inflation:</strong> the calculator projects the same basket of goods forward. It does not account for spending more as income rises, which is a separate, real effect on a household budget.
                      </p>
                      <p style={p}>
                        <strong style={{ color: C.ink }}>Pre-tax investment comparisons:</strong> the real-return figures shown do not deduct tax on investment gains, which further reduces the real, in-hand return an investor keeps.
                      </p>
                    </div>

                    <div style={sec} id="how-to-use">
                      <h2 style={h2}>How to Use This Inflation Calculator</h2>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter the current amount:</strong> the price or sum of money you want to project forward.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set the inflation rate:</strong> use India&apos;s recent 4.5-6.5% range, or a category-specific rate if you have one.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Choose the time period:</strong> the number of years into the future you are projecting.</li>
                        <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Open Advanced Settings for investing:</strong> add a monthly contribution and expected return rate to see nominal vs real wealth growth side by side against rising costs.</li>
                      </ol>
                    </div>

                    

                    <div style={sec} id="faq">
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ faqs={faqs} />
                    </div>

                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> This calculator projects future cost and purchasing power using a single, user-supplied inflation rate assumption applied uniformly across the projection period. It does not predict actual future inflation, which varies year to year and depends on factors including monetary policy, global commodity prices, and domestic supply conditions. Real return figures shown are indicative and do not account for tax on investment gains. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.inflation-sidebar::-webkit-scrollbar{width:5px}.inflation-sidebar::-webkit-scrollbar-track{background:transparent}.inflation-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.inflation-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="inflation-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

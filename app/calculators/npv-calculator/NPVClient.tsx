'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
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

/* ─── Slider (matches VPF exactly: white/border colors, full ARIA) */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = ((value - min) / (max - min)) * 100;
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'slider';
  const rangeId = `${inputId}-range`;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.-]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>{label}</label>
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
        <input id={rangeId} type="range" min={min} max={max} step={step} value={value}
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

const POPULAR = [
  { href: '/calculators/sip-calculator',     label: 'SIP Calculator' },
  { href: '/calculators/cagr-calculator',    label: 'CAGR Calculator' },
  { href: '/calculators/lumpsum-calculator', label: 'Lumpsum Calculator' },
  { href: '/calculators/nps-calculator',     label: 'NPS Calculator' },
  { href: '/calculators/ppf-calculator',     label: 'PPF Calculator' },
  { href: '/calculators/swp-calculator',     label: 'SWP Calculator' },
];
const MORE = [
  { href: '/calculators/compound-interest-calculator',   label: 'Compound Interest Calculator' },
  { href: '/calculators/inflation-calculator',           label: 'Inflation Calculator' },
  { href: '/calculators/rule-of-72-calculator',          label: 'Rule of 72 Calculator' },
  { href: '/calculators/interest-calculator',            label: 'Simple Interest Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Donut Chart (matches VPF geometry exactly) ────────────────*/
function DonutChart({ a, b, aLabel }: { a: number; b: number; aLabel: string }) {
  const total = a + b;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const aArc = (a / total) * circ;
  const aPct = Math.round((a / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`${aLabel} is ${aPct}% of the combined total`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${aArc} ${circ - aArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>{aLabel}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{aPct}%</text>
    </svg>
  );
}

/* ─── Grouped bar chart: cash flow vs present value, per year ──── */
function NPVBarChart({ cashFlows }: { cashFlows: { year: number; cf: number; pv: number }[] }) {
  if (cashFlows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...cashFlows.map(d => Math.max(d.cf, d.pv)), 1);
  const slot = (W - PADL) / cashFlows.length;
  const barW = Math.max(3, Math.min(14, slot * 0.32));
  const gap = (slot - barW * 2 - 4) / 2;
  return (
    <svg role="img" aria-label="Year-by-year cash flow versus discounted present value"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {cashFlows.map((d, i) => {
        const cfH = (Math.max(0, d.cf) / maxVal) * H;
        const pvH = (Math.max(0, d.pv) / maxVal) * H;
        const x = PADL + i * slot + gap;
        return (
          <g key={d.year}>
            <rect x={x} y={H - cfH} width={barW} height={cfH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x + barW + 4} y={H - pvH} width={barW} height={pvH} fill={CHART_PAIR.primary} rx={2} />
            {cashFlows.length <= 20 && (
              <text x={x + barW + 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: cashFlows.length > 12 ? 8 : 9, fill: C.ink3, fontFamily: INTER }}>
                {d.year}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

const YEAR_PRESETS = [1, 3, 5, 7, 10];

/* ─── Main ───────────────────────────────────────────────────── */
export default function NPVClient({ region = 'in', faqs }: { region?: string; faqs: { q: string; a: string }[] }) {
  const defaultSettings = {
    initialInvestment: 100000, discountRate: 10, years: 5, mode: 'manual' as 'manual' | 'auto',
    manualCFs: [30000, 35000, 40000, 45000, 50000], autoYear1CF: 30000, autoGrowthRate: 5,
    terminalValue: 0, inflationRate: 0,
  };
  const { settings, updateSettings } = useCalculatorSettings('npv-calculator', defaultSettings);
  const { initialInvestment, discountRate, years, mode, manualCFs, autoYear1CF, autoGrowthRate, terminalValue, inflationRate } = settings;

  const setInitialInvestment = (v: number) => updateSettings({ initialInvestment: v });
  const setDiscountRate      = (v: number) => updateSettings({ discountRate: v });
  const setYears             = (v: number) => updateSettings({ years: v });
  const setMode              = (v: 'manual' | 'auto') => updateSettings({ mode: v });
  const setManualCFs         = (v: number[] | ((prev: number[]) => number[])) =>
    updateSettings({ manualCFs: typeof v === 'function' ? v(settings.manualCFs) : v });
  const setAutoYear1CF       = (v: number) => updateSettings({ autoYear1CF: v });
  const setAutoGrowthRate    = (v: number) => updateSettings({ autoGrowthRate: v });
  const setTerminalValue     = (v: number) => updateSettings({ terminalValue: v });
  const setInflationRate     = (v: number) => updateSettings({ inflationRate: v });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [mobile, setMobile] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  // Keep the manual cash-flow array in sync with the selected duration
  useEffect(() => {
    setManualCFs((prev: number[]) => {
      if (prev.length === years) return prev;
      const arr = [...prev];
      while (arr.length < years) arr.push(arr[arr.length - 1] || 0);
      return arr.slice(0, years);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [years]);

  const effectiveDiscountRate = ((1 + discountRate / 100) * (1 + inflationRate / 100)) - 1;

  const cashFlows = useMemo(() => {
    const cfs: { year: number; cf: number; pv: number }[] = [];
    for (let i = 1; i <= years; i++) {
      let cf = mode === 'manual' ? (manualCFs[i - 1] || 0) : autoYear1CF * Math.pow(1 + autoGrowthRate / 100, i - 1);
      if (i === years) cf += terminalValue;
      const pv = cf / Math.pow(1 + effectiveDiscountRate, i);
      cfs.push({ year: i, cf, pv });
    }
    return cfs;
  }, [years, mode, manualCFs, autoYear1CF, autoGrowthRate, terminalValue, effectiveDiscountRate]);

  const totalFutureCashFlows = cashFlows.reduce((s, r) => s + r.cf, 0);
  const presentValueOfCashFlows = cashFlows.reduce((s, r) => s + r.pv, 0);
  const npv = presentValueOfCashFlows - initialInvestment;
  const verdict = npv > 0 ? 'Value creating' : npv < 0 ? 'Value destroying' : 'Break-even';
  const profitabilityIndex = initialInvestment > 0 ? presentValueOfCashFlows / initialInvestment : 0;

  const discountedPaybackYears = useMemo(() => {
    let cum = 0;
    for (const cf of cashFlows) {
      const prevCum = cum;
      cum += cf.pv;
      if (cum >= initialInvestment) {
        const remaining = initialInvestment - prevCum;
        const frac = cf.pv > 0 ? remaining / cf.pv : 0;
        return (cf.year - 1) + frac;
      }
    }
    return null;
  }, [cashFlows, initialInvestment]);

  const donutTotal = Math.abs(presentValueOfCashFlows) + Math.abs(initialInvestment);
  const pvPct = donutTotal > 0 ? Math.round((Math.abs(presentValueOfCashFlows) / donutTotal) * 100) : 0;
  const investPct = 100 - pvPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            NPV Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Estimate the net present value of an investment from its initial outlay, expected cash flows, and discount rate. See whether a project is expected to create value.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="NPV Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div role="tabpanel" style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Slider label="Initial Investment" id="npv-investment" value={initialInvestment} min={1000} max={10000000} step={1000} fmt={fmtC} onChange={setInitialInvestment} compact={mobile} />
                      <Slider label="Discount Rate" id="npv-rate" value={discountRate} min={0} max={30} step={0.5} fmt={v => `${v}%`} onChange={setDiscountRate} compact={mobile} />

                      <div style={{ marginBottom: mobile ? 18 : 30 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 14 }}>
                          <label htmlFor="npv-years-range" style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>Project Duration</label>
                          <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: C.ink }}>{years} yr</span>
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {YEAR_PRESETS.map(y => (
                            <button key={y} onClick={() => setYears(y)}
                              style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                                color: years === y ? C.ink : C.ink3,
                                border: `${years === y ? 1.5 : 1}px solid ${years === y ? C.ink : C.border}`,
                                fontWeight: years === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s' }}>
                              {y}Y
                            </button>
                          ))}
                        </div>
                        <input id="npv-years-range" type="range" min={1} max={15} step={1} value={years}
                          onChange={e => setYears(+e.target.value)}
                          aria-label="Project Duration" aria-valuenow={years} aria-valuemin={1} aria-valuemax={15}
                          style={{ width: '100%', marginTop: 10, accentColor: C.dark }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 20 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink2 }}>Cash Flow Mode</span>
                        <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {(['manual', 'auto'] as const).map(m => (
                            <button key={m} onClick={() => setMode(m)}
                              style={{ padding: '6px 14px', border: 'none', background: mode === m ? C.white : 'transparent',
                                color: mode === m ? C.ink : C.ink3, fontWeight: mode === m ? 600 : 400,
                                cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                              {m === 'manual' ? 'Manual' : 'Auto Growth'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {mode === 'manual' ? (
                        <div className="npv-cf-list" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, maxHeight: 190, overflowY: 'auto', paddingRight: 4, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
                          {manualCFs.map((cf, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <label htmlFor={`npv-cf-${i}`} style={{ fontSize: 13, color: C.ink2 }}>Year {i + 1} Cash Flow</label>
                              <input
                                id={`npv-cf-${i}`}
                                type="number"
                                value={cf}
                                aria-label={`Year ${i + 1} cash flow`}
                                onChange={e => {
                                  const next = [...manualCFs];
                                  next[i] = Number(e.target.value);
                                  setManualCFs(next);
                                }}
                                style={{ width: 110, textAlign: 'right', padding: '6px 10px', borderRadius: 7, border: `1px solid ${C.border}`, background: C.white, fontFamily: INTER, fontSize: 13, outline: 'none', color: C.ink }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ marginBottom: 8 }}>
                          <Slider label="Year 1 Cash Flow" id="npv-y1cf" value={autoYear1CF} min={0} max={5000000} step={5000} fmt={fmtC} onChange={setAutoYear1CF} compact={mobile} />
                          <Slider label="Annual Growth Rate" id="npv-growth" value={autoGrowthRate} min={-20} max={50} step={1} fmt={v => `${v}%`} onChange={setAutoGrowthRate} compact={mobile} />
                        </div>
                      )}

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Terminal Value (End of Project)" id="npv-terminal" value={terminalValue} min={0} max={10000000} step={10000} fmt={fmtC} onChange={setTerminalValue} compact={mobile} />
                      <Slider label="Inflation Adjustment" id="npv-inflation" value={inflationRate} min={0} max={15} step={0.5} fmt={v => `${v}%`} onChange={setInflationRate} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Terminal value is added to the final year&apos;s cash flow. Inflation adjustment raises the effective discount rate so the result reflects a real, inflation-aware NPV.
                      </p>
                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>
                      Net Present Value
                    </span>
                    <span aria-live="polite" aria-label={`Net present value: ${npv < 0 ? 'negative ' : ''}${fmtIN(Math.abs(npv))}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {npv < 0 ? '-' : ''}{fmtIN(Math.abs(npv))}
                    </span>
                  </div>

                  {[
                    { label: 'Verdict', value: verdict },
                    { label: 'PV of Cash Flows', value: fmtC(presentValueOfCashFlows) },
                    { label: 'Total Future Cash Flows', value: fmtC(totalFutureCashFlows) },
                    { label: 'Initial Investment', value: fmtC(initialInvestment) },
                    { label: 'Profitability Index', value: profitabilityIndex.toFixed(2) },
                    { label: 'Discounted Payback', value: discountedPaybackYears !== null ? `${discountedPaybackYears.toFixed(1)} yrs` : `Beyond ${years} yrs` },
                    { label: 'Project Duration', value: `${years} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart a={Math.abs(presentValueOfCashFlows)} b={Math.abs(initialInvestment)} aLabel="PV of inflows" />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>PV of Inflows {pvPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Initial Outlay {investPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Present value of inflows is ${pvPct}% of the combined total`}>
                      <div style={{ height: '100%', width: `${pvPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Discounted cash flow schedule */}
              {cashFlows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="npv-dcf-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Discounted Cash Flow Schedule</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Discounted at {discountRate}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} yr · {discountRate}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="npv-dcf-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Cash Flow</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Present Value</span>
                          </div>
                        </div>
                        <NPVBarChart cashFlows={cashFlows} />
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Year-by-year cash flow, discount factor, and present value</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Cash Flow', 'Discount Factor', 'Present Value'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderTop: `1px solid ${C.border}`, background: '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>0 (Today)</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>-{fmtIN(initialInvestment)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink3 }}>1.0000</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>-{fmtIN(initialInvestment)}</td>
                            </tr>
                            {cashFlows.map((d, i) => {
                              const discountFactor = 1 / Math.pow(1 + effectiveDiscountRate, d.year);
                              return (
                                <tr key={i} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{d.year}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(d.cf)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink3 }}>{discountFactor.toFixed(4)}</td>
                                  <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{fmtIN(d.pv)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-npv">What Is Net Present Value (NPV)?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Net present value is the difference between the present value of a project&apos;s future cash inflows and the initial investment required today. A positive NPV means the project is expected to create value.
                  </p>
                </div>
                <p style={p}>
                  NPV is the standard capital budgeting metric because it converts every future rupee into today&apos;s terms before comparing it against the upfront cost. This makes projects of different lengths and cash flow shapes directly comparable.
                </p>
                <p style={p}>
                  A rupee received five years from now is worth less than a rupee today, since today&apos;s rupee can be invested and earn a return in the meantime. NPV discounts every future cash flow to account for exactly that.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-npv-works">How NPV Works: The Time Value of Money</h2>
                <p style={p}>
                  The calculator discounts each year&apos;s expected cash flow back to today using the discount rate, then adds every discounted value together. Subtracting the initial investment from that sum gives the NPV.
                </p>
                <p style={p}>
                  A higher discount rate shrinks the present value of distant cash flows faster than near-term ones, which is why a project with cash flows loaded toward later years is more sensitive to the discount rate you choose.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="npv-formula">NPV Formula: How to Calculate It</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    NPV = Sum of [Cash Flow(t) / (1 + r)^t] - Initial Investment
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>NPV formula variables</caption>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Cash Flow(t)', 'Net cash inflow expected in year t'],
                        ['r', 'Discount rate, as a decimal'],
                        ['t', 'Year number of each cash flow'],
                        ['Initial Investment', 'Upfront cash outflow at Year 0'],
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Worked example: a small manufacturing unit invests Rs 1,00,000 in a new machine, expecting cash flows of Rs 30,000, Rs 35,000, Rs 40,000, Rs 45,000, and Rs 50,000 over the next 5 years. The owner discounts these at a 10% cost of capital.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Full year-by-year NPV computation: Rs 1,00,000 investment, 10% discount rate</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Year</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Cash Flow</th>
                        <th style={thS} scope="col">Computation</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Present Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['0', '-1,00,000', '-1,00,000', '-1,00,000'],
                        ['1', '30,000', '30,000 / (1.10)^1', '27,273'],
                        ['2', '35,000', '35,000 / (1.10)^2', '28,926'],
                        ['3', '40,000', '40,000 / (1.10)^3', '30,053'],
                        ['4', '45,000', '45,000 / (1.10)^4', '30,736'],
                        ['5', '50,000', '50,000 / (1.10)^5', '31,046'],
                      ].map((row, i, arr) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i === 0 ? '#fafafa' : i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{row[2]}</td>
                          <td style={tdR}>{row[3]}</td>
                        </tr>
                      ))}
                      <tr style={{ borderTop: `2px solid ${C.border}`, background: '#f4f5f6' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.ink }} colSpan={3}>NPV (sum of present values)</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>48,033</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The NPV of approximately Rs 48,033 is positive, so the machine purchase is expected to create value at a 10% cost of capital.
                </p>
                <p style={p}>
                  Small rounding differences between a manual calculation and a spreadsheet are normal, and come from how many decimal places each step keeps.
                </p>
              </div>

              <div style={sec} id="npv-annuity">
                <h2 style={h2}>NPV for Equal Annual Cash Flows (Annuity Shortcut)</h2>
                <p style={p}>
                  When every year&apos;s cash flow is identical, the annuity formula finds the present value in one step instead of discounting each year separately.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700 }}>
                  PV = C x [1 - (1 + r)^-n] / r
                </div>
                <p style={p}>
                  Worked example: a fixed cash inflow of Rs 10,000 a year for 5 years, discounted at 12%, has a present value of Rs 10,000 x [1 - (1.12)^-5] / 0.12, which works out to approximately Rs 36,048.
                </p>
                <p style={p}>
                  Against an initial investment of Rs 1,00,000, that gives an NPV of approximately -Rs 63,952, a value-destroying result at this rate and cash flow level. Use the Auto Growth mode above with a 0% growth rate to model this same equal-cash-flow scenario directly in the calculator.
                </p>
              </div>

              <div style={sec} id="npv-excel">
                <h2 style={h2}>NPV Formula in Excel: Two Methods</h2>
                <p style={p}>
                  Excel&apos;s built-in NPV function discounts a range of future cash flows, but does not include the initial investment. Subtract it separately.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Excel formulas for NPV</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">Excel Formula</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>NPV function</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=NPV(rate, cash_flow_range) - initial_investment</td></tr>
                      <tr style={{ background: '#fafafa' }}><td style={tdL}>Manual sum</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=SUMPRODUCT(cash_flows/(1+rate)^years) - initial_investment</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                  A common mistake is including the initial investment inside the NPV range, which double-discounts it and understates the result. Keep it out of the range and subtract it once at the end.
                </p>
              </div>

              <div style={sec} id="discount-rate">
                <h2 style={h2}>How to Choose a Discount Rate for NPV</h2>
                <p style={p}>
                  The discount rate should reflect the return you could reasonably expect from an alternative investment of similar risk, often called the cost of capital.
                </p>
                <p style={p}>
                  Indian corporate projects commonly use a weighted average cost of capital (WACC) in the 10% to 15% range, which sits several points above the RBI repo rate to account for business and equity risk.
                </p>
                <p style={p}>
                  A personal investment decision can instead use your own required rate of return, such as the return you expect from an equity mutual fund.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="npv-vs-irr">NPV vs IRR: What Is the Difference?</h2>
                <p style={p}>
                  NPV tells you the rupee value a project is expected to add. IRR tells you the discount rate at which the project&apos;s NPV would equal exactly zero.
                </p>
                <p style={p}>
                  Both are useful, but NPV is usually the stronger choice when comparing projects of different sizes, since a high IRR on a small project can add less absolute value than a lower IRR on a much larger one.
                </p>
              </div>

              <div style={sec} id="npv-vs-payback">
                <h2 style={h2}>NPV vs Payback Period</h2>
                <p style={p}>
                  Payback period tells you how long it takes to recover the initial investment in nominal terms. It ignores both the time value of money and any cash flows that arrive after the payback point.
                </p>
                <p style={p}>
                  NPV accounts for both, which makes it the more complete measure when comparing the actual profitability of two projects rather than just how quickly each returns its own capital.
                </p>
                <p style={p}>
                  The Discounted Payback figure in the results above uses discounted, not nominal, cash flows, so it already corrects for the time value of money that a plain payback calculation ignores.
                </p>
              </div>

              <div style={sec} id="dcf-and-npv">
                <h2 style={h2}>Discounted Cash Flow (DCF) and NPV: How They Relate</h2>
                <p style={p}>
                  Discounted cash flow, or DCF, is the general technique of converting a series of future cash flows into their present value. NPV is one specific output of a DCF analysis: the present value of inflows minus the initial investment.
                </p>
                <p style={p}>
                  A DCF model can also be used without computing NPV at all, for example to value a company or a bond by discounting its expected future cash flows to a single present-day price.
                </p>
              </div>

              <div style={sec} id="when-to-use-npv">
                <h2 style={h2}>When to Use NPV</h2>
                <p style={p}>
                  NPV suits capital budgeting decisions: business expansion, machinery purchases, real estate investment, and any case with a large upfront cost followed by several years of expected cash inflows.
                </p>
                <p style={p}>
                  Run the same expected return through the <Link href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CAGR Calculator</Link> if you want a single annualised growth rate instead of a rupee value, or the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> for regular monthly investment planning rather than a one-time project outlay.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of NPV</h2>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Sensitive to the discount rate:</strong> a small change in the assumed rate can flip a project from value-creating to value-destroying, especially over longer horizons.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Depends on cash flow estimates:</strong> NPV is only as reliable as the future cash flow projections fed into it, which are themselves uncertain.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Ignores project scale:</strong> a large project can show a bigger NPV than a small one purely from size, even if the small project is more efficient per rupee invested.
                </p>
                <p style={p}>
                  The Profitability Index shown in the results above (present value of cash flows divided by initial investment) corrects for this. A PI above 1 means the project is value-creating per rupee invested, and it compares across project sizes better than NPV alone.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the initial investment:</strong> the upfront cash outflow for the project at Year 0.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the discount rate:</strong> your cost of capital or required rate of return.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Choose Manual or Auto Growth:</strong> enter each year&apos;s cash flow by hand, or set a Year 1 figure and a growth rate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Open More Settings for terminal value or inflation:</strong> add a terminal value at project end or adjust for inflation.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. NPV depends entirely on the discount rate and cash flow figures you enter, both of which are estimates about the future. This calculator is for educational and planning purposes only and does not constitute financial or investment advice. Consult a SEBI-registered investment adviser or a qualified finance professional before making capital budgeting decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .npv-sidebar::-webkit-scrollbar { width: 5px; }
            .npv-sidebar::-webkit-scrollbar-track { background: transparent; }
            .npv-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .npv-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            .npv-cf-list::-webkit-scrollbar { width: 4px; }
            .npv-cf-list::-webkit-scrollbar-track { background: transparent; }
            .npv-cf-list::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .npv-cf-list::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="npv-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20, alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>

        </div>
      </div>

      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}


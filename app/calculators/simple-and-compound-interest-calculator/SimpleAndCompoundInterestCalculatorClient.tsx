'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { FAQ_ITEMS } from './faqData';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ───────────────────────────────────────────────── */
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

/* ─── Constants ─────────────────────────────────────────────── */
const MIN_PRINCIPAL = 1000;
const MAX_PRINCIPAL = 10000000;
const MIN_RATE = 0.5;
const MAX_RATE = 30;
const MIN_YEARS = 1;
const MAX_YEARS = 30;
const YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 30];

type Frequency = 'yearly' | 'half-yearly' | 'quarterly' | 'monthly';
const FREQ_N: Record<Frequency, number> = { yearly: 1, 'half-yearly': 2, quarterly: 4, monthly: 12 };
const FREQ_LABEL: Record<Frequency, string> = { yearly: 'Yearly', 'half-yearly': 'Half-Yearly', quarterly: 'Quarterly', monthly: 'Monthly' };

/* ─── Math (single source of truth for calculator, table, and article examples) ── */
function calcSimple(p: number, r: number, t: number) {
  const interest = (p * r * t) / 100;
  return { interest, total: p + interest };
}

function compoundMaturity(p: number, r: number, n: number, t: number): number {
  if (t <= 0) return p;
  if (r === 0) return p;
  return p * Math.pow(1 + r / 100 / n, n * t);
}

/** Equivalent annually-compounded rate that produces the same total as a simple rate over the same years. */
function siRateToEquivalentCiRate(siRatePct: number, years: number): number {
  if (years <= 0) return 0;
  const factor = 1 + (siRatePct * years) / 100;
  if (factor <= 0) return 0;
  return (Math.pow(factor, 1 / years) - 1) * 100;
}

/** Equivalent simple rate that produces the same total as an annually-compounded rate over the same years. */
function ciRateToEquivalentSiRate(ciRatePct: number, years: number): number {
  if (years <= 0) return 0;
  const factor = Math.pow(1 + ciRatePct / 100, years);
  return ((factor - 1) * 100) / years;
}

interface ComparisonRow { year: number; siInterest: number; siTotal: number; ciInterest: number; ciTotal: number; diff: number }
function buildComparisonSchedule(p: number, r: number, n: number, t: number): ComparisonRow[] {
  const rows: ComparisonRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= t; y++) {
    const siInterest = (p * r * y) / 100;
    const siTotal = p + siInterest;
    const ciTotal = compoundMaturity(p, r, n, y);
    const ciInterest = ciTotal - p;
    rows.push({ year: startYear + y - 1, siInterest, siTotal, ciInterest, ciTotal, diff: ciTotal - siTotal });
  }
  return rows;
}

/* ─── Donut (Principal vs Compound Interest, the primary output split) ── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img"
      aria-label={`Compound interest maturity split: ${pPct}% principal, ${100 - pPct}% interest earned`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Comparison line chart: Simple Interest Total vs Compound Interest Total, by year ── */
function ComparisonChart({ rows }: { rows: ComparisonRow[] }) {
  if (rows.length < 2) return null;
  const W = 800, H = 200, PADL = 4, PADR = 4, PADB = 22, PADT = 8;
  const maxVal = Math.max(...rows.map(r => Math.max(r.siTotal, r.ciTotal)));
  const minVal = Math.min(rows[0].siTotal, rows[0].ciTotal);
  const span = maxVal - minVal || 1;
  const xFor = (i: number) => PADL + (i / (rows.length - 1)) * (W - PADL - PADR);
  const yFor = (v: number) => PADT + (1 - (v - minVal) / span) * (H - PADT - PADB);
  const siPath = rows.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(r.siTotal).toFixed(1)}`).join(' ');
  const ciPath = rows.map((r, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i).toFixed(1)} ${yFor(r.ciTotal).toFixed(1)}`).join(' ');
  const last = rows[rows.length - 1];
  return (
    <svg role="img" width="100%" viewBox={`0 0 ${W} ${H + PADB}`} style={{ display: 'block', overflow: 'visible' }}
      aria-label={`Year by year comparison from ${rows[0].year} to ${last.year}: simple interest total rising to ${Math.round(last.siTotal)}, compound interest total rising to ${Math.round(last.ciTotal)}`}>
      <line x1={PADL} y1={H} x2={W - PADR} y2={H} stroke={C.border} strokeWidth={1} />
      <path d={siPath} fill="none" stroke={C.dark} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 5" />
      <path d={ciPath} fill="none" stroke={C.lime2} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={xFor(rows.length - 1)} cy={yFor(last.siTotal)} r={4} fill={C.dark} />
      <circle cx={xFor(rows.length - 1)} cy={yFor(last.ciTotal)} r={4} fill={C.lime2} />
      <text x={PADL} y={H + 16} textAnchor="start" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>{rows[0].year}</text>
      <text x={W - PADR} y={H + 16} textAnchor="end" style={{ fontSize: 10, fill: C.ink3, fontFamily: INTER }}>{last.year}</text>
    </svg>
  );
}

/* ─── Slider (colorless input panel per CLAUDE.md rule 17) ────── */
function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const rangeId = `${inputId}-range`;
  const pct = ((value - min) / (max - min)) * 100;
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 14 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 13.5 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label}`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '7px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 14, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '7px 16px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 108, textAlign: 'center', transition: 'border-color 0.15s' }}
            onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.borderColor = '#AAAAAA'}
            onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.borderColor = C.border}>
            {fmt(value)}
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
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }} aria-hidden="true">{fmt(max)}</span>
      </div>
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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
  { href: '/calculators/interest-calculator',           label: 'Simple Interest Calculator' },
  { href: '/calculators/compound-interest-calculator',  label: 'Compound Interest Calculator' },
  { href: '/calculators/fd-calculator',                  label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',                  label: 'RD Calculator' },
  { href: '/calculators/cagr-calculator',                label: 'CAGR Calculator' },
  { href: '/calculators/sip-calculator',                 label: 'SIP Calculator' },
  { href: '/calculators/income-tax-calculator',          label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Interest Calculator' },
  { href: '/calculators/credit-card-interest-calculator', label: 'Credit Card Interest Calculator' },
  { href: '/calculators/bank-interest-comparison-calculator', label: 'Bank Interest Comparison Calculator' },
  { href: '/calculators/money-doubling-calculator',      label: 'Money Doubling Calculator' },
  { href: '/calculators/emi-calculator',                  label: 'EMI Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* ─── CA CTA (exact copy per CLAUDE.md standard component) ─────── */

/* ─── Rate converter: solve for the equivalent SI or CI rate ────*/
function RateConverter({ fmtPct }: { fmtPct: (n: number) => string }) {
  const [mode, setMode] = useState<'si-to-ci' | 'ci-to-si'>('si-to-ci');
  const [rate, setRate] = useState('10');
  const [years, setYears] = useState('5');
  const rn = parseFloat(rate) || 0;
  const yn = parseFloat(years) || 0;

  const eqRate = mode === 'si-to-ci' ? siRateToEquivalentCiRate(rn, yn) : ciRateToEquivalentSiRate(rn, yn);
  const resultLabel = mode === 'si-to-ci' ? 'Equivalent compound rate (annual)' : 'Equivalent simple rate (annual)';

  const fieldStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '8px 12px', width: '100%', outline: 'none', fontFamily: INTER };
  const labelStyle: React.CSSProperties = { fontSize: 12.5, color: C.ink2, marginBottom: 6, display: 'block' };

  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px', marginBottom: 16 }}>
      <div role="group" aria-label="Conversion direction" style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {(['si-to-ci', 'ci-to-si'] as const).map(opt => (
          <button key={opt} onClick={() => setMode(opt)} aria-pressed={mode === opt}
            style={{ padding: '7px 14px', borderRadius: 8, border: `${mode === opt ? 1.5 : 1}px solid ${mode === opt ? C.ink : C.border}`, background: C.white, color: mode === opt ? C.ink : C.ink3, fontSize: 13, fontWeight: mode === opt ? 700 : 500, cursor: 'pointer', fontFamily: INTER }}>
            {opt === 'si-to-ci' ? 'Simple → Compound' : 'Compound → Simple'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 18 }}>
        <div>
          <label htmlFor="rc-rate" style={labelStyle}>{mode === 'si-to-ci' ? 'Simple Rate % p.a.' : 'Compound Rate % p.a.'}</label>
          <input id="rc-rate" type="number" value={rate} onChange={e => setRate(e.target.value)} style={fieldStyle} />
        </div>
        <div>
          <label htmlFor="rc-years" style={labelStyle}>Time in Years</label>
          <input id="rc-years" type="number" value={years} onChange={e => setYears(e.target.value)} style={fieldStyle} />
        </div>
      </div>

      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#50565C', fontWeight: 600 }}>{resultLabel}</span>
        <span aria-live="polite" style={{ fontSize: 20, fontWeight: 800, color: '#1F7A58' }}>{fmtPct(eqRate)}</span>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function SimpleAndCompoundInterestCalculatorClient() {
  const defaultSettings = { principal: 100000, rate: 8, years: 10, frequency: 'yearly' as Frequency };
  const { settings, updateSettings } = useCalculatorSettings('simple-and-compound-interest-calculator', defaultSettings);
  const { principal, rate, years, frequency } = settings;
  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setFrequency = (v: Frequency) => updateSettings({ frequency: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtPct = (n: number) => `${n.toFixed(2)}%`;

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const n = FREQ_N[frequency as Frequency];

  const si = useMemo(() => calcSimple(principal, rate, years), [principal, rate, years]);
  const ciTotal = useMemo(() => compoundMaturity(principal, rate, n, years), [principal, rate, n, years]);
  const ciInterest = Math.max(0, ciTotal - principal);
  const extraFromCompounding = Math.max(0, ciInterest - si.interest);

  const principalPct = ciTotal > 0 ? Math.round((principal / ciTotal) * 100) : 0;
  const interestPct = 100 - principalPct;

  const schedule = useMemo(() => buildComparisonSchedule(principal, rate, n, years), [principal, rate, n, years]);

  const h2  = { fontSize: 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <style>{`
        .sci-sidebar::-webkit-scrollbar { width: 5px; }
        .sci-sidebar::-webkit-scrollbar-track { background: transparent; }
        .sci-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .sci-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
        @keyframes sciSwipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
      `}</style>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Simple and Compound Interest Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Enter one principal, rate, and time period to see simple interest and compound interest calculated side by side, with the exact rupee difference between the two.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '46px 46px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Principal Amount" id="sci-principal" value={principal} min={MIN_PRINCIPAL} max={MAX_PRINCIPAL} step={1000}
                    fmt={v => fmtC(v)} onChange={setPrincipal} compact={mobile} />
                  <Slider label="Rate of Interest (p.a.)" id="sci-rate" value={rate} min={MIN_RATE} max={MAX_RATE} step={0.1}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Time Period" id="sci-years" value={years} min={MIN_YEARS} max={MAX_YEARS} step={1}
                    fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: -22, marginBottom: 32 }}>
                    {YEAR_PRESETS.map(y => (
                      <button key={y} onClick={() => setYears(y)}
                        aria-label={`Set time period to ${y} years`}
                        style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                          color: years === y ? C.ink : C.ink3,
                          border: `${years === y ? 1.5 : 1}px solid ${years === y ? C.ink : C.border}`,
                          fontWeight: years === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                          fontFamily: INTER, transition: 'all 0.15s' }}>
                        {y}Y
                      </button>
                    ))}
                  </div>

                  <div>
                    <div style={{ marginBottom: mobile ? 10 : 14 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Compounding Frequency <span style={{ color: C.ink3, fontWeight: 400 }}>(for compound interest)</span></label>
                    </div>
                    <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(Object.keys(FREQ_N) as Frequency[]).map(f => (
                        <button key={f} onClick={() => setFrequency(f)}
                          aria-pressed={frequency === f}
                          style={{ flex: 1, padding: mobile ? '8px 4px' : '8px 10px', border: 'none', background: frequency === f ? C.white : 'transparent', color: frequency === f ? C.ink : C.ink3, fontFamily: INTER, fontSize: mobile ? 11 : 13, fontWeight: frequency === f ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                          {FREQ_LABEL[f]}
                        </button>
                      ))}
                    </div>
                    <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.6, margin: '10px 0 0' }}>
                      Simple interest never compounds, so this toggle only changes the compound interest side of the comparison.
                    </p>
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '46px 46px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Dual-metric dark box: compound total (primary) vs simple total (secondary) */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '14px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#50565C' }}>Compound interest total</div>
                      <div style={{ fontSize: 12, color: '#7A8087' }}>Simple interest total</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div aria-live="polite" aria-label={`Compound interest total: ${fmtIN(ciTotal)}`} style={{ fontSize: mobile ? 22 : 27, fontWeight: 800, color: '#1F7A58', lineHeight: 1, letterSpacing: '-0.02em' }}>{fmtIN(ciTotal)}</div>
                      <div aria-label={`Simple interest total: ${fmtIN(si.total)}`} style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>{fmtIN(si.total)}</div>
                    </div>
                  </div>

                  {[
                    { label: 'Principal invested', value: fmtC(principal) },
                    { label: 'Simple interest earned', value: fmtC(si.interest) },
                    { label: 'Compound interest earned', value: fmtC(ciInterest) },
                    { label: 'Extra earned by compounding', value: fmtC(extraFromCompounding) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 20, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={principal} interest={ciInterest} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 20, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Compound interest {interestPct}%</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-by-year comparison */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)} aria-expanded={showTable} aria-controls="sci-comparison"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '18px 46px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-by-Year Comparison</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Simple vs compound total, {FREQ_LABEL[frequency as Frequency].toLowerCase()} compounding</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {schedule.length} yr
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="sci-comparison" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 46px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 14, height: 2.5, background: C.dark, borderRadius: 2 }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Simple interest total</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 14, height: 2.5, background: C.lime2, borderRadius: 2 }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Compound interest total</span>
                          </div>
                        </div>
                        <ComparisonChart rows={schedule} />
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'sciSwipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'], marginTop: mobile ? 0 : 16 }}>
                        <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Year-by-year simple interest total, compound interest total, and the difference between them</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Simple Interest Total', 'Compound Interest Total', 'Extra from Compounding'].map((hd, i) => (
                                <th key={hd} style={{ padding: '10px 14px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{hd}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(row.siTotal)}</td>
                                <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.ciTotal)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.diff)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div id="what-is-the-difference" style={sec}>
                <h2 style={h2}>What Is the Difference Between Simple and Compound Interest?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Simple interest is calculated only on the original principal for every period. Compound interest is calculated on the principal plus all interest already earned, so the gap between the two widens every additional year.
                  </p>
                </div>
                <p style={p}>
                  At the same rate and principal, the two methods give an identical result for exactly one year of annual compounding. From the second year onward, compound interest pulls ahead, since it starts earning interest on interest that simple interest never accounts for.
                </p>
                <p style={p}>
                  This calculator runs both formulas on the identical principal, rate, and time period you enter above, so you can see the exact rupee gap rather than estimating it.
                </p>
              </div>

              <div id="simple-interest-formula" style={sec}>
                <h2 style={h2}>Simple Interest Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Simple Interest (I) = P x R x T / 100<br />
                    Total Amount (A) = P + I
                  </code>
                </div>
                <p style={p}>
                  P is the principal, R is the annual rate as a percentage, and T is the time in years. Worked example: {fmtC(principal)} at {rate.toFixed(1)}% for {years} {years === 1 ? 'year' : 'years'} earns simple interest of {fmtIN(si.interest)}, for a total amount of {fmtIN(si.total)}.
                </p>
              </div>

              <div id="compound-interest-formula" style={sec}>
                <h2 style={h2}>Compound Interest Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    A = P x (1 + r/n)^(n x t)<br />
                    Compound Interest = A - P
                  </code>
                </div>
                <p style={p}>
                  r is the annual rate as a decimal, n is the number of times interest compounds per year, and t is the time in years. The same {fmtC(principal)} at {rate.toFixed(1)}% for {years} {years === 1 ? 'year' : 'years'}, compounded {FREQ_LABEL[frequency as Frequency].toLowerCase()}, grows to {fmtIN(ciTotal)}, a compound interest of {fmtIN(ciInterest)}.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  That is {fmtIN(extraFromCompounding)} more than the {fmtIN(si.interest)} the same money would earn as simple interest over the same period.
                </p>
              </div>

              <div id="convert-simple-compound-rate" style={sec}>
                <h2 style={h2}>Converting Between Simple and Compound Interest Rates</h2>
                <p style={p}>
                  A simple rate and a compound rate are not directly comparable numbers, because they measure growth differently over the same period. The converter below solves for the annually-compounded rate that produces the same total return as a given simple rate, or the reverse, over the same number of years.
                </p>
                <RateConverter fmtPct={fmtPct} />
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 13.5, color: C.dark, fontWeight: 700, lineHeight: 1.8 }}>
                  Compound rate = [(1 + Simple rate x Years / 100)^(1/Years) - 1] x 100<br />
                  Simple rate = [(1 + Compound rate/100)^Years - 1] x 100 / Years
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Worked example: a 10% simple rate over 5 years is equivalent to an annually-compounded rate of about {fmtPct(siRateToEquivalentCiRate(10, 5))}, since compounding needs a lower stated rate to reach the same total. Run the same 10% as a compound rate over 5 years instead, and it converts back to an equivalent simple rate of about {fmtPct(ciRateToEquivalentSiRate(10, 5))}.
                </p>
              </div>

              <div id="which-grows-faster" style={sec}>
                <h2 style={h2}>Which Grows Faster: Simple or Compound Interest?</h2>
                <p style={p}>
                  Compound interest always grows faster than simple interest at the same rate, and the advantage compounds itself: the longer the tenure, the wider the gap becomes in both rupee and percentage terms.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Rs 1,00,000 at 10% per annum, simple interest total vs annually-compounded total, by tenure</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Tenure</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Simple Interest Total</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Compound Interest Total</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Gap</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[5, 10, 20, 30].map((t, i) => {
                        const siT = calcSimple(100000, 10, t).total;
                        const ciT = compoundMaturity(100000, 10, 1, t);
                        return (
                          <tr key={t} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={tdL}>{t} years</td>
                            <td style={tdR}>{fmtIN(Math.round(siT))}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(Math.round(ciT))}</td>
                            <td style={tdR}>{fmtIN(Math.round(ciT - siT))}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The gap at 5 years is a fraction of what it becomes by 30 years, purely from interest earning further interest each additional year. Adjust the tenure slider in the calculator above to see this same widening effect on your own numbers.
                </p>
              </div>

              <div id="compounding-frequency-effect" style={sec}>
                <h2 style={h2}>How Compounding Frequency Affects the Comparison</h2>
                <p style={p}>
                  A higher compounding frequency at the same stated annual rate produces a larger compound interest total, since interest gets added to the principal sooner and starts earning its own interest sooner. Simple interest does not change at all when you switch frequency, because it never compounds in the first place.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Rs 1,00,000 at 8% per annum for 10 years: compound interest total by compounding frequency, against a fixed simple interest total</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Frequency</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Compound Interest Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Object.keys(FREQ_N) as Frequency[]).map((f, i) => (
                        <tr key={f} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{FREQ_LABEL[f]}</td>
                          <td style={tdR}>{fmtIN(Math.round(compoundMaturity(100000, 8, FREQ_N[f], 10)))}</td>
                        </tr>
                      ))}
                      <tr style={{ background: '#fafafa' }}>
                        <td style={{ ...tdL, fontStyle: 'italic' }}>Simple interest (any frequency)</td>
                        <td style={{ ...tdR, fontStyle: 'italic' }}>{fmtIN(calcSimple(100000, 8, 10).total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="simple-vs-compound-loans" style={sec}>
                <h2 style={h2}>Simple vs Compound Interest on Loans and EMIs</h2>
                <p style={p}>
                  Most home loans, car loans, and personal loans in India use a reducing-balance method, which recalculates interest on the outstanding principal after every EMI payment. This behaves like interest compounded monthly, not like simple interest.
                </p>
                <p style={p}>
                  Some short-term NBFC loans, flat-rate car loans, and the moratorium period on education loans instead quote a simple or flat interest rate. A flat-rate loan usually costs more than its quoted rate suggests once converted to an effective annual rate, since simple interest is charged on the original amount even as the balance is repaid down.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Run an actual home loan or personal loan through the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> for the real reducing-balance schedule, rather than relying on either formula on this page for a loan.
                </p>
              </div>

              {/* In-content promo bar */}
              <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>FD Calculator</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Run a real fixed deposit through quarterly compounding, TDS, and senior citizen rates.</p>
                </div>
                <Link className="fx-btn" href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer"
                  style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
              </div>

              <div id="where-each-is-used" style={sec}>
                <h2 style={h2}>Where Simple and Compound Interest Are Used in India</h2>
                <h3 style={h3}>Products that compound</h3>
                <p style={p}>
                  Fixed deposits, recurring deposits, PPF, EPF, and most bank savings accounts compound at yearly, half-yearly, quarterly, or daily-then-credited frequency. For a savings account with the exact daily-balance method, use the <Link href="/calculators/savings-account-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Savings Account Interest Calculator</Link>.
                </p>
                <h3 style={h3}>Products that use simple interest</h3>
                <p style={{ ...p, margin: 0 }}>
                  Short-term personal loans, flat-rate car loans, the education loan moratorium period, and many microfinance and peer-to-peer lending products quote simple interest. It stays predictable and easy to verify by hand, which is why lenders on short, fixed-term products often prefer it.
                </p>
              </div>

              <div id="excel-formulas" style={sec}>
                <h2 style={h2}>Simple and Compound Interest Formulas in Excel</h2>
                <p style={p}>
                  Both formulas translate directly into a spreadsheet, with cells for principal, rate, years, and compounding frequency.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 8 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Excel formulas, where P, R, N, and T reference the cells holding principal, annual rate, compounding frequency, and years</caption>
                    <thead><tr><th style={thS} scope="col">Result</th><th style={thS} scope="col">Excel Formula</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Simple interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=P*R*T/100</td></tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}><td style={tdL}>Simple interest total amount</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=P+(P*R*T/100)</td></tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Compound interest total amount</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=P*(1+R/N)^(N*T)</td></tr>
                      <tr style={{ background: '#fafafa' }}><td style={tdL}>Compound interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=P*(1+R/N)^(N*T)-P</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="how-to-use" style={sec}>
                <h2 style={h2}>How to Use This Calculator</h2>
                <p style={p}>The calculator needs four inputs:</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Principal Amount', text: 'enter the amount you plan to invest or borrow, using the slider or by clicking the value to type an exact figure.' },
                    { label: 'Rate of Interest', text: 'enter the annual rate that applies to both the simple and compound interest calculations.' },
                    { label: 'Time Period', text: 'set the number of years, or pick one of the preset year buttons.' },
                    { label: 'Compounding Frequency', text: 'choose yearly, half-yearly, quarterly, or monthly for the compound interest side only, since simple interest never compounds.' },
                  ].map((it, i) => (
                    <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                      <strong style={{ color: C.ink }}>{it.label}:</strong> {it.text}
                    </li>
                  ))}
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  Both totals, the interest earned under each method, and the extra amount from compounding update instantly. Expand Year-by-Year Comparison to see the gap widen year by year in both a chart and a table.
                </p>
              </div>

              <div id="limitations" style={sec}>
                <h2 style={h2}>Limitations of This Calculator</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { t: 'Uses one rate for both methods.', d: 'Real products rarely quote the same headline rate for a simple-interest loan and a compounding deposit. Use this rate as a like-for-like comparison, not as two real product quotes.' },
                    { t: 'Assumes a single, one-time principal.', d: 'It does not model recurring monthly contributions. For a monthly SIP, use the SIP Calculator or Step-Up SIP Calculator instead.' },
                    { t: 'Assumes a constant rate for the entire tenure.', d: 'Real rates on FDs, PPF, EPF, and loans can change between renewal or reset cycles.' },
                    { t: 'Does not calculate tax or TDS.', d: 'Interest income is taxable at your slab rate, with TDS deducted once thresholds under Section 194A are crossed. Use the Interest Calculator or FD Calculator for a version with TDS built in.' },
                  ].map((it, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{it.t}</p>
                      <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7, margin: 0 }}>{it.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              

              <div id="faq" style={sec}>
                <h2 style={h2}>Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only, based on the principal, rate, tenure, and compounding frequency you enter. This calculator applies one rate to both methods for comparison purposes and does not reflect the actual rates any specific bank or lender quotes, does not account for tax or TDS, and does not model loan reducing-balance schedules. It is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making financial decisions.
                </p>
              </div>

            </article>

          </div>

          {/* SIDEBAR */}
          <aside
            className="sci-sidebar"
            aria-label="Related calculators"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: mobile ? 'static' : 'sticky',
              top: 20,
              alignSelf: 'start',
              maxHeight: mobile ? 'none' : 'calc(100vh - 40px)',
              overflowY: mobile ? 'visible' : 'auto',
              paddingRight: mobile ? 0 : 2,
              scrollbarWidth: 'thin',
              scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <nav aria-label="Related Calculators" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </nav>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/interest-calculator|Simple Interest', '/calculators/compound-interest-calculator|Compound Interest', '/calculators/fd-calculator|FD', '/calculators/rd-calculator|RD', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/loan-calculator|Loan', '/calculators/income-tax-calculator|Income Tax'] },
        { hd: 'Topics', links: ['/calculators/fd-calculator|Fixed Deposits', '/calculators/emi-calculator|Loans', '/calculators/income-tax-calculator|Tax', '/calculators/sip-calculator|Mutual Funds'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

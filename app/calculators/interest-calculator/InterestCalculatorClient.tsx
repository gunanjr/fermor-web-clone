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

/* ─── Simple Interest math ───────────────────────────────────── */
interface YearRow {
  year: number;
  interestCum: number;
  total: number;
}

function calcSimple(p: number, r: number, t: number) {
  const interest = (p * r * t) / 100;
  const total = p + interest;
  return { interest, total };
}

function buildSimpleSchedule(p: number, r: number, t: number): YearRow[] {
  const rows: YearRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= t; y++) {
    const interestCum = (p * r * y) / 100;
    rows.push({ year: startYear + y - 1, interestCum, total: p + interestCum });
  }
  return rows;
}

/* ─── Bar Chart (Principal vs cumulative Interest, per year) ───── */
function BarChart({ rows, principal }: { rows: YearRow[]; principal: number }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxAnnual = Math.max(...rows.map(r => principal + r.interestCum));
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year principal and cumulative interest"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const total = principal + row.interestCum;
        const totalH = maxAnnual > 0 ? (total / maxAnnual) * H : 0;
        const principalH = total > 0 ? (principal / total) * totalH : 0;
        const interestH = totalH - principalH;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={interestH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - principalH} width={barW} height={principalH} fill={CHART_PAIR.primary} rx={2} />
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

/* ─── Donut Chart (matches VPF geometry exactly) ────────────────*/
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal ${pPct}% of total amount, interest ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

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
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 36 }}>
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
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/fd-calculator',                label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',                label: 'RD Calculator' },
  { href: '/calculators/savings-account-interest-calculator', label: 'Savings Account Interest Calculator' },
  { href: '/calculators/emi-calculator',               label: 'EMI Calculator' },
  { href: '/calculators/loan-calculator',              label: 'Loan Calculator' },
  { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
];
const MORE = [
  { href: '/calculators/simple-and-compound-interest-calculator', label: 'Simple vs Compound Interest' },
  { href: '/calculators/credit-card-interest-calculator', label: 'Credit Card Interest Calculator' },
  { href: '/calculators/overdraft-interest-calculator',   label: 'Overdraft Interest Calculator' },
  { href: '/calculators/bank-interest-comparison-calculator', label: 'Bank Interest Comparison Calculator' },
  { href: '/calculators/inflation-calculator',         label: 'Inflation Calculator' },
  { href: '/calculators/sip-calculator',               label: 'SIP Calculator' },
];

/* ─── Reverse solver: solve for Rate, Time, or Principal ────────*/
function ReverseSolver({ fmtC }: { fmtC: (n: number) => string }) {
  const [solveFor, setSolveFor] = useState<'rate' | 'time' | 'principal'>('rate');
  const [p, setP] = useState('100000');
  const [i, setI] = useState('40000');
  const [r, setR] = useState('8');
  const [t, setT] = useState('5');

  const pn = parseFloat(p) || 0;
  const inN = parseFloat(i) || 0;
  const rn = parseFloat(r) || 0;
  const tn = parseFloat(t) || 0;

  let resultLabel = '';
  let resultValue = '';
  if (solveFor === 'rate') {
    const rate = pn > 0 && tn > 0 ? (100 * inN) / (pn * tn) : 0;
    resultLabel = 'Rate of Interest';
    resultValue = `${rate.toFixed(2)}% p.a.`;
  } else if (solveFor === 'time') {
    const time = pn > 0 && rn > 0 ? (100 * inN) / (pn * rn) : 0;
    resultLabel = 'Time Period';
    resultValue = `${time.toFixed(2)} years`;
  } else {
    const princ = rn > 0 && tn > 0 ? (100 * inN) / (rn * tn) : 0;
    resultLabel = 'Principal Amount';
    resultValue = fmtC(princ);
  }

  const fieldStyle: React.CSSProperties = { fontSize: 14, fontWeight: 600, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: '8px 12px', width: '100%', outline: 'none', fontFamily: INTER };
  const labelStyle: React.CSSProperties = { fontSize: 12.5, color: C.ink2, marginBottom: 6, display: 'block' };

  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 12, padding: '20px 22px', marginBottom: 16 }}>
      <div role="group" aria-label="Solve for" style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {(['rate', 'time', 'principal'] as const).map(opt => (
          <button key={opt} onClick={() => setSolveFor(opt)} aria-pressed={solveFor === opt}
            style={{ padding: '7px 14px', borderRadius: 8, border: `${solveFor === opt ? 1.5 : 1}px solid ${solveFor === opt ? C.ink : C.border}`, background: C.white, color: solveFor === opt ? C.ink : C.ink3, fontSize: 13, fontWeight: solveFor === opt ? 700 : 500, cursor: 'pointer', fontFamily: INTER, textTransform: 'capitalize' }}>
            Solve for {opt === 'rate' ? 'Rate' : opt === 'time' ? 'Time' : 'Principal'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14, marginBottom: 18 }}>
        {solveFor !== 'principal' && (
          <div>
            <label htmlFor="rs-principal" style={labelStyle}>Principal (P)</label>
            <input id="rs-principal" type="number" value={p} onChange={e => setP(e.target.value)} style={fieldStyle} />
          </div>
        )}
        <div>
          <label htmlFor="rs-interest" style={labelStyle}>Interest Earned (I)</label>
          <input id="rs-interest" type="number" value={i} onChange={e => setI(e.target.value)} style={fieldStyle} />
        </div>
        {solveFor !== 'rate' && (
          <div>
            <label htmlFor="rs-rate" style={labelStyle}>Rate % p.a. (R)</label>
            <input id="rs-rate" type="number" value={r} onChange={e => setR(e.target.value)} style={fieldStyle} />
          </div>
        )}
        {solveFor !== 'time' && (
          <div>
            <label htmlFor="rs-time" style={labelStyle}>Time in Years (T)</label>
            <input id="rs-time" type="number" value={t} onChange={e => setT(e.target.value)} style={fieldStyle} />
          </div>
        )}
      </div>

      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#50565C', fontWeight: 600 }}>{resultLabel}</span>
        <span aria-live="polite" style={{ fontSize: 20, fontWeight: 800, color: '#1F7A58' }}>{resultValue}</span>
      </div>
    </div>
  );
}

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  return <FAQBox items={faqs} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function InterestCalculatorClient({ faqs }: { faqs: { q: string; a: string }[] }) {
  const defaultSettings = { principal: 100000, rate: 8, years: 5, tdsRate: 10 };
  const { settings, updateSettings } = useCalculatorSettings('interest-calculator', defaultSettings);
  const { principal, rate, years, tdsRate } = settings;

  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate      = (v: number) => updateSettings({ rate: v });
  const setYears     = (v: number) => updateSettings({ years: v });
  const setTdsRate   = (v: number) => updateSettings({ tdsRate: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const schedule = useMemo(() => buildSimpleSchedule(principal, rate, years), [principal, rate, years]);
  const result = useMemo(() => calcSimple(principal, rate, years), [principal, rate, years]);

  const tdsAmount = tdsRate > 0 ? (result.interest * tdsRate) / 100 : 0;
  const netInterest = result.interest - tdsAmount;

  const principalPct = result.total > 0 ? Math.round((principal / result.total) * 100) : 0;
  const interestPct = 100 - principalPct;

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
            Simple Interest Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate simple interest, total amount, and year-by-year growth on any principal. Includes a reverse calculator for rate and time.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            <section aria-label="Simple Interest Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

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
                      <Slider label="Principal Amount" id="si-principal" value={principal} min={1000} max={10000000} step={1000} fmt={fmtC} onChange={setPrincipal} compact={mobile} />
                      <Slider label="Rate of Interest (p.a.)" id="si-rate" value={rate} min={0.1} max={30} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />
                      <Slider label="Time Period" id="si-years" value={years} min={1} max={40} step={1} fmt={v => `${v} yr`} onChange={setYears} compact={mobile} />

                      <div style={{ marginTop: 8, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                          <span>Total Amount</span>
                          <span>{fmtC(result.total)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.ink2 }}>
                          <span>Principal + Interest: {fmtC(principal)} + {fmtC(result.interest)}</span>
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
                      <Slider label="TDS Rate on Interest" id="si-tds" value={tdsRate} min={0} max={30} step={1} fmt={v => `${v}%`} onChange={setTdsRate} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 24px' }}>
                        Banks deduct 10% TDS on interest once it crosses Rs 50,000 a year (Rs 1,00,000 for senior citizens) under Section 194A. Set this to 0% if your interest stays below the threshold or the interest is not bank-paid.
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
                      Total Amount
                    </span>
                    <span aria-live="polite" aria-label={`Total amount: ${fmtIN(result.total)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtIN(result.total)}
                    </span>
                  </div>

                  {[
                    { label: 'Principal Invested', value: fmtC(principal) },
                    { label: 'Interest Earned', value: fmtC(result.interest) },
                    ...(tdsRate > 0 ? [
                      { label: `TDS Deducted (${tdsRate}%)`, value: fmtC(tdsAmount) },
                      { label: 'Net Interest After TDS', value: fmtC(netInterest) },
                    ] : []),
                    { label: 'Time Period', value: `${years} years` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={principal} interest={result.interest} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Principal {principalPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Interest {interestPct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${principalPct}% of total amount`}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Year-by-year table */}
              {schedule.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable(v => !v)}
                    aria-expanded={showTable} aria-controls="si-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Simple interest at {rate}%</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {years} yr · {rate}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="si-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Principal</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Interest (Cumulative)</span>
                          </div>
                        </div>
                        <BarChart rows={schedule} principal={principal} />
                      </div>
                      {mobile && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                            style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                          <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                        </div>
                      )}
                      <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                        <table style={{ minWidth: 500, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Year-by-year principal, cumulative interest, and total amount</caption>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Principal', 'Interest (Cumulative)', 'Total Amount'].map((h, i) => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {schedule.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2, textAlign: 'right' }}>{fmtIN(principal)}</td>
                                <td style={{ padding: '11px 14px', color: '#166534', fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.interestCum)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.total)}</td>
                              </tr>
                            ))}
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
                <h2 style={h2} id="what-is-simple-interest">What Is Simple Interest?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Simple interest is interest calculated only on the original principal amount, at a fixed annual rate, for the full time period. It does not compound.
                  </p>
                </div>
                <p style={p}>
                  Unlike compound interest, simple interest never earns interest on interest. The amount you earn or owe each year stays exactly the same, since it is always calculated against the same original principal.
                </p>
                <p style={p}>
                  This makes simple interest predictable and easy to verify by hand, which is why it remains common on short-term loans and certain bonds in India, even though most savings products now use compounding.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="simple-interest-formula">Simple Interest Formula: How to Calculate It</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Simple Interest (I) = P x R x T / 100<br />
                    Total Amount (A) = P + I
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Simple interest formula variables</caption>
                    <thead><tr><th style={thS} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['P', 'Principal amount invested or borrowed'],
                        ['R', 'Annual interest rate, as a percentage'],
                        ['T', 'Time period, in years'],
                        ['I', 'Simple interest earned or payable'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Worked example: a principal of Rs 1,00,000 at 8% annual simple interest for 5 years earns I = 1,00,000 x 8 x 5 / 100 = Rs 40,000. The total amount at the end of 5 years is Rs 1,40,000.
                </p>
                <p style={p}>
                  A smaller textbook-style example, the kind that shows up in class 7 to 10 maths: Rs 15,000 invested at 5% for 2 years earns I = 15,000 x 5 x 2 / 100 = Rs 1,500, for a total amount of Rs 16,500. The formula does not change with the size of the numbers.
                </p>
              </div>

              <div style={sec} id="simple-interest-excel">
                <h2 style={h2}>Simple Interest Formula in Excel</h2>
                <p style={p}>
                  Enter the principal, rate, and time in separate cells, then multiply them directly. There is no dedicated Excel function for simple interest, unlike compound interest&apos;s FV function.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Excel formula for simple interest and total amount</caption>
                    <thead><tr><th style={thS} scope="col">Result</th><th style={thS} scope="col">Excel Formula</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Simple interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=Principal*Rate*Years/100</td></tr>
                      <tr style={{ background: '#fafafa' }}><td style={tdL}>Total amount</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=Principal+(Principal*Rate*Years/100)</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec} id="reverse-simple-interest">
                <h2 style={h2}>Reverse Simple Interest Calculator: Solve for Rate, Time, or Principal</h2>
                <p style={p}>
                  A reverse calculator rearranges the same formula to find the rate, the time period, or the principal itself, when the interest earned is already known. Pick what you want to solve for and enter the other three values.
                </p>
                <ReverseSolver fmtC={fmtC} />
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '16px 20px', margin: '0 0 16px', fontFamily: 'monospace', fontSize: 14, color: C.dark, fontWeight: 700 }}>
                  R = 100 x I / (P x T)<br />
                  T = 100 x I / (P x R)<br />
                  P = 100 x I / (R x T)
                </div>
                <p style={p}>
                  Worked example: if Rs 1,00,000 earned Rs 40,000 interest over 5 years, the rate is R = 100 x 40,000 / (1,00,000 x 5) = 8% per annum. The same rearrangement finds the time period or the principal if either is the unknown instead.
                </p>
              </div>

              <div style={sec} id="daily-monthly-interest">
                <h2 style={h2}>Daily, Monthly, and Annual Interest Calculation</h2>
                <p style={p}>
                  The annual simple interest formula scales down directly for shorter periods, by substituting days or months for years in the same equation.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Interest formulas by period, using the annual rate R</caption>
                    <thead><tr><th style={thS} scope="col">Period</th><th style={thS} scope="col">Formula</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Daily interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>P x R x Days / (100 x 365)</td></tr>
                      <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Monthly interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>P x R x Months / (100 x 12)</td></tr>
                      <tr><td style={tdL}>Annual (yearly) interest</td><td style={{ ...tdL, fontFamily: 'monospace' }}>P x R x Years / 100</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Some banks use a 360-day year convention on specific products instead of 365, which produces a marginally higher daily rate. Confirm which convention applies before relying on a daily figure for a real deposit or loan.
                </p>
              </div>

              <div style={sec} id="simple-vs-compound">
                <h2 style={h2}>Simple Interest vs Compound Interest: What Is the Difference?</h2>
                <p style={p}>
                  Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus all previously accumulated interest, so the gap between the two widens every year.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Rs 1,00,000 at 8% per annum over 10 years: simple vs annually-compounded interest</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Interest Earned</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Total Amount</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Simple interest</td><td style={tdR}>Rs 80,000</td><td style={tdR}>Rs 1,80,000</td></tr>
                      <tr style={{ background: '#fafafa' }}><td style={tdL}>Compound interest (annual)</td><td style={{ ...tdR, fontWeight: 700, color: C.dark }}>Rs 1,15,893</td><td style={{ ...tdR, fontWeight: 700, color: C.dark }}>Rs 2,15,893</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Compounding earns roughly 45% more interest than simple interest at the same rate and tenure, purely from interest earning further interest each year. Run the same principal through the <Link href="/calculators/compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Compound Interest Calculator</Link> to compare exact figures at your own rate and tenure, or use the <Link href="/calculators/simple-and-compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Simple and Compound Interest Calculator</Link> to see both totals side by side in one place.
                </p>
              </div>

              <div style={sec} id="where-used">
                <h2 style={h2}>Where Simple Interest Is Used in India</h2>
                <p style={p}>
                  Simple interest appears most often on short-tenure or fixed-term products where the lender wants a predictable, easy-to-verify cost.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Short-term personal loans:</strong> many NBFCs quote simple interest on loans under 12 months.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Car loans:</strong> some lenders use a flat (simple interest style) rate rather than a reducing balance.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Education loan moratorium:</strong> interest accrues as simple interest during the study period before EMIs begin.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Microfinance and peer-to-peer lending:</strong> many small-ticket loans use simple interest for transparency.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Late payment penalties:</strong> overdue balances on utility bills and some credit facilities accrue simple interest.</li>
                </ol>
                <p style={p}>
                  Most home loans and credit card balances instead use a reducing-balance method that behaves like compound interest. Check the <Link href="/calculators/emi-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EMI Calculator</Link> for those.
                </p>
              </div>

              <div style={sec} id="bank-interest-rates">
                <h2 style={h2}>Bank Interest Calculator: Savings and FD Rates</h2>
                <p style={p}>
                  Savings account interest in India is usually simple interest, calculated daily on the closing balance and credited quarterly. Fixed deposits generally compound instead, but the underlying comparison still starts from the same rate a bank quotes.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Indicative savings and 1-year FD rates, September 2026</caption>
                    <thead><tr><th style={thS} scope="col">Bank</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Savings Account</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">1-Year FD (General)</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>SBI</td><td style={tdR}>2.50%</td><td style={tdR}>6.25%</td></tr>
                      <tr style={{ background: '#fafafa' }}><td style={tdL}>HDFC Bank</td><td style={tdR}>up to 3.5%*</td><td style={tdR}>up to 7.4%*</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: 12.5, color: C.ink3, margin: 0 }}>
                  *HDFC figures are the top of the bank&apos;s published range across balance slabs and tenures, not a flat rate. Rates change without notice; confirm the current published rate before depositing. Run the exact deposit through the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link>.
                </p>
              </div>

              <div style={sec} id="loan-interest">
                <h2 style={h2}>Loan Interest Calculator: Which Loans Use Simple Interest</h2>
                <p style={p}>
                  A loan quoted as simple or flat interest charges the same interest amount every period, calculated on the original loan amount rather than the reducing balance.
                </p>
                <p style={p}>
                  This makes a flat-rate loan cost more than its quoted rate suggests, since a reducing-balance loan of the same nominal rate charges less interest as the balance falls.
                </p>
                <p style={p}>
                  Always convert a flat rate to its effective reducing-balance rate before comparing loan offers, or run both through the <Link href="/calculators/loan-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Loan Calculator</Link>.
                </p>
              </div>

              <div style={sec} id="tax-on-interest">
                <h2 style={h2}>Tax on Interest Income: TDS Under Section 194A</h2>
                <p style={p}>
                  Interest from savings accounts, fixed deposits, and recurring deposits is taxable at your income tax slab rate under &quot;Income from Other Sources&quot;. Banks deduct TDS once interest from that bank crosses a threshold in a financial year, per <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 194A</a> of the Income Tax Act.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Section 194A TDS thresholds, FY 2025-26 onward</caption>
                    <thead><tr><th style={thS} scope="col">Payer / Depositor</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Threshold</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">TDS Rate</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Bank or post office, individual under 60</td><td style={tdR}>Rs 50,000/year</td><td style={tdR}>10%</td></tr>
                      <tr style={{ background: '#fafafa', borderBottom: `1px solid ${C.border}` }}><td style={tdL}>Bank or post office, senior citizen (60+)</td><td style={tdR}>Rs 1,00,000/year</td><td style={tdR}>10%</td></tr>
                      <tr><td style={tdL}>Other payers (non-bank)</td><td style={tdR}>Rs 10,000/year</td><td style={tdR}>10%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The Finance Bill 2025 raised these thresholds from Rs 40,000 and Rs 50,000 respectively, effective 1 April 2025. TDS rises to 20% if PAN is not linked to the account. TDS is not the final tax; report the full interest amount in your return and claim the TDS credit.
                </p>
              </div>

              <div style={sec} id="limitations">
                <h2 style={h2}>Limitations of This Calculator</h2>
                <p style={p}>
                  <strong style={{ color: C.ink }}>No compounding:</strong> this calculator assumes pure simple interest. Most savings, FD, and RD products actually compound, so use the Compound Interest Calculator for those.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Flat annual rate:</strong> it applies one rate for the full period. A real loan or deposit rate can change mid-term if it is linked to a floating benchmark.
                </p>
                <p style={p}>
                  <strong style={{ color: C.ink }}>Pre-tax figures by default:</strong> TDS is only reflected once you set a TDS rate in More Settings. Actual tax owed depends on your total income and slab.
                </p>
              </div>

              <div style={sec} id="how-to-use">
                <h2 style={h2}>How to Use This Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the principal:</strong> the amount you are depositing, investing, or borrowing.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter the rate:</strong> the annual interest rate as a percentage.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set the time period:</strong> the number of years the amount will earn or accrue interest.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Open More Settings for TDS:</strong> set a TDS rate to see net interest after tax deduction.
                  </li>
                </ol>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ faqs={faqs} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Bank rates, TDS thresholds, and tax rules change and may not reflect the figures shown here at the time you use this calculator. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making financial decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .interest-sidebar::-webkit-scrollbar { width: 5px; }
            .interest-sidebar::-webkit-scrollbar-track { background: transparent; }
            .interest-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .interest-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="interest-sidebar"
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

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/fd-calculator|FD', '/calculators/emi-calculator|EMI', '/calculators/loan-calculator|Loan', '/calculators/ppf-calculator|PPF', '/calculators/income-tax-calculator|Income Tax'] },
        { hd: 'Topics', links: ['/calculators/fd-calculator|Fixed Deposits', '/calculators/emi-calculator|Loans', '/calculators/income-tax-calculator|Tax', '/calculators/sip-calculator|Mutual Funds'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

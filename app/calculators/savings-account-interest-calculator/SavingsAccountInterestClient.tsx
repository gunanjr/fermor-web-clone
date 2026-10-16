'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { faqItems } from './faqData';
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

type CompFreq = 'daily' | 'monthly' | 'quarterly' | 'annually';

const COMP_OPTIONS: { value: CompFreq; label: string; n: number }[] = [
  { value: 'daily',     label: 'Daily',     n: 365 },
  { value: 'monthly',   label: 'Monthly',   n: 12 },
  { value: 'quarterly', label: 'Quarterly', n: 4 },
  { value: 'annually',  label: 'Annually',  n: 1 },
];

function compoundInterest(P: number, r: number, t: number, n: number) {
  const amount = P * Math.pow(1 + (r / 100) / n, n * t);
  return amount;
}

function calcEAR(r: number, n: number) {
  return (Math.pow(1 + (r / 100) / n, n) - 1) * 100;
}

/* ─── Slider ─────────────────────────────────────────────────── */
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

/* ─── Time presets ───────────────────────────────────────────── */
function TimePresets({ value, unit, onChange }: { value: number; unit: 'yr' | 'mo'; onChange: (v: number, u: 'yr' | 'mo') => void }) {
  const presets = unit === 'yr'
    ? [{ v: 1, l: '1Y' }, { v: 3, l: '3Y' }, { v: 5, l: '5Y' }, { v: 10, l: '10Y' }]
    : [{ v: 6, l: '6mo' }, { v: 12, l: '1Y' }, { v: 36, l: '3Y' }, { v: 60, l: '5Y' }];

  return (
    <div role="group" aria-label="Time period presets" style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: -22, marginBottom: 20 }}>
      {presets.map(p => {
        const active = value === p.v;
        return (
          <button key={p.l} onClick={() => onChange(p.v, unit)} aria-pressed={active}
            style={{ fontSize: 11.5, fontWeight: active ? 700 : 500, color: active ? C.white : C.ink3, background: active ? C.dark : 'transparent', border: `1px solid ${active ? C.dark : C.border}`, borderRadius: 99, padding: '3px 9px', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
            {p.l}
          </button>
        );
      })}
    </div>
  );
}

/* ─── Savings Snapshot ───────────────────────────────────────── */
function SavingsSnapshot() {
  const rows = [
    { label: 'SBI savings rate',         value: '2.7%' },
    { label: 'IDFC First Bank (high)',    value: '7%' },
    { label: 'Post office savings rate',  value: '4%' },
    { label: 'Section 80TTA deduction',   value: 'Rs 10,000' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Savings Quick Facts</span>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ padding: '11px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${C.border}` : 'none', background: C.white, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12.5, color: C.ink2 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Related Reads ──────────────────────────────────────────── */
function RelatedReads() {
  const links = [
    { href: '/blogs/sukanya-samriddhi-yojana-interest-rate-2025', label: 'Sukanya Samriddhi Yojana: Interest Rate and Rules 2025' },
    { href: '/blogs/nsc-national-savings-certificate-interest-rate-2025', label: 'NSC Interest Rate 2025: Maturity, Tax Benefits Explained' },
  ];
  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER }}>
      <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Related Reads</span>
      </div>
      {links.map((l, i) => (
        <Link key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '13px 16px', borderBottom: i < links.length - 1 ? `1px solid ${C.border}` : 'none', textDecoration: 'none', background: C.white }}>
          <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.5, display: 'block', fontFamily: INTER }}>{l.label}</span>
        </Link>
      ))}
    </div>
  );
}

/* ─── Donut ──────────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Principal ${pPct}% of maturity amount, interest ${100 - pPct}%`}
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

/* ─── Year-by-year growth chart (stacked: principal + interest) ── */
function SavingsGrowthChart({ rows, principal }: { rows: { year: number; value: number; gain: number }[]; principal: number }) {
  if (rows.length === 0) return null;
  const W = 800, H = 200, PADL = 16, PADR = 8, PADB = 28;
  const maxVal = Math.max(...rows.map(r => r.value));
  const effectiveW = W - PADL - PADR;
  const slot = effectiveW / rows.length;
  const barW = Math.max(5, Math.min(28, slot * 0.65));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year savings balance growth showing principal (dark) and earned interest (lime) stacking"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="interestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: C.lime2, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: C.lime, stopOpacity: 0.8 }} />
        </linearGradient>
      </defs>
      {rows.map((row, i) => {
        const totalH = (row.value / maxVal) * H;
        const prinH = (Math.min(principal, row.value) / maxVal) * H;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={totalH - prinH} fill="url(#interestGrad)" rx={1} />
            <rect x={x} y={H - prinH} width={barW} height={prinH} fill={CHART_PAIR.primary} rx={1} />
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W - PADR} y2={H} stroke={C.border} strokeWidth={1.5} />
    </svg>
  );
}

/* ─── Sidebar list ───────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </div>
  );
}

const POPULAR = [
  { href: '/calculators/fd-calculator',                    label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',                    label: 'RD Calculator' },
  { href: '/calculators/ppf-calculator',                   label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',     label: 'Compound Interest Calculator' },
  { href: '/calculators/interest-rate-calculator',         label: 'Interest Rate Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/emi-calculator',           label: 'EMI Calculator' },
  { href: '/calculators/retirement-calculator',    label: 'Retirement Calculator' },
  { href: '/calculators/inflation-calculator',     label: 'Inflation Calculator' },
  { href: '/calculators/emergency-fund-calculator', label: 'Emergency Fund Calculator' },
];

/* ─── FAQ (single-sourced from faqData.ts) ──────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function SavingsAccountInterestClient({ region = 'in' }: { region?: string }) {
  const [balance,   setBalance]   = useState(100000);
  const [rate,      setRate]      = useState(3);
  const [timeYr,    setTimeYr]    = useState(1);
  const [timeMode,  setTimeMode]  = useState<'yr' | 'mo'>('yr');
  const [timeMo,    setTimeMo]    = useState(12);
  const [compFreq,  setCompFreq]  = useState<CompFreq>('daily');
  const [showTable, setShowTable] = useState(false);
  const [hydrated,  setHydrated]  = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fermor-savings-account-interest-v1');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.balance   !== undefined) setBalance(p.balance);
        if (p.rate      !== undefined) setRate(p.rate);
        if (p.timeYr    !== undefined) setTimeYr(p.timeYr);
        if (p.timeMode  !== undefined) setTimeMode(p.timeMode);
        if (p.timeMo    !== undefined) setTimeMo(p.timeMo);
        if (p.compFreq  !== undefined) setCompFreq(p.compFreq);
        if (p.showTable !== undefined) setShowTable(p.showTable);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('fermor-savings-account-interest-v1', JSON.stringify({ balance, rate, timeYr, timeMode, timeMo, compFreq, showTable }));
    } catch {}
  }, [hydrated, balance, rate, timeYr, timeMode, timeMo, compFreq, showTable]);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const years = timeMode === 'yr' ? timeYr : timeMo / 12;
  const comp = COMP_OPTIONS.find(c => c.value === compFreq)!;
  const totalMonths = timeMode === 'yr' ? timeYr * 12 : timeMo;

  const result = useMemo(() => {
    if (balance <= 0 || rate <= 0 || years <= 0) return null;
    const maturity = compoundInterest(balance, rate, years, comp.n);
    const interest = maturity - balance;
    const ear = calcEAR(rate, comp.n);
    return { interest, maturity, ear, principal: balance };
  }, [balance, rate, years, comp.n]);

  const growthRows = useMemo(() => {
    if (!result) return [];
    const totalYrs = Math.min(Math.ceil(years), 50);
    const startYear = new Date().getFullYear();
    return Array.from({ length: totalYrs }, (_, idx) => {
      const y = idx + 1;
      const value = compoundInterest(balance, rate, y, comp.n);
      const gain = value - balance;
      return { year: startYear + y, value, gain, returnPct: ((value / balance) - 1) * 100 };
    });
  }, [result, balance, rate, comp.n, years]);

  const prinPct = result ? Math.round((result.principal / result.maturity) * 100) : 100;
  const intPct = 100 - prinPct;

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 15.5, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const bul = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const mono = { fontFamily: 'monospace', background: '#f4f5f6', padding: '2px 7px', borderRadius: 4, fontSize: 13.5, color: C.dark } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Savings Account Interest Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate interest on your savings account using the daily balance method. See monthly and annual interest earnings with compound interest.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Savings Account Interest Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Account Balance" id="savings-balance" value={balance} min={500} max={5000000} step={1000} fmt={fmtC} onChange={setBalance} compact={mobile} />
                  <Slider label="Interest Rate (p.a.)" id="savings-rate" value={rate} min={1} max={8} step={0.1} fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />

                  {/* Time period */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 14 }}>
                      <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400 }}>Time period</label>
                      <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3 }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTimeMode(m)}
                            style={{ padding: mobile ? '4px 10px' : '5px 14px', borderRadius: 6, border: 'none', background: timeMode === m ? C.white : 'transparent', color: timeMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: timeMode === m ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {timeMode === 'yr'
                      ? <Slider label="" value={timeYr} min={1} max={50} step={1} fmt={v => `${v} Yr`} onChange={v => { setTimeYr(v); setTimeMo(v * 12); }} compact={mobile} />
                      : <Slider label="" value={timeMo} min={1} max={600} step={1} fmt={v => `${v} Mo`} onChange={v => { setTimeMo(v); setTimeYr(Math.round(v / 12)); }} compact={mobile} />}
                    <TimePresets value={timeMode === 'yr' ? timeYr : timeMo} unit={timeMode} onChange={(v, u) => { if (u === 'yr') { setTimeYr(v); setTimeMo(v * 12); } else { setTimeMo(v); setTimeYr(Math.round(v / 12)); } }} />
                  </div>

                  {/* Compounding frequency */}
                  <div style={{ marginBottom: mobile ? 18 : 36 }}>
                    <label style={{ fontSize: mobile ? 13.5 : 14, color: C.ink2, fontWeight: 400, display: 'block', marginBottom: 10 }}>Compounding Frequency</label>
                    <div style={{ display: 'flex', background: '#f4f5f6', borderRadius: 8, padding: 3, gap: 0 }}>
                      {COMP_OPTIONS.map(c => (
                        <button key={c.value} onClick={() => setCompFreq(c.value)}
                          style={{ flex: 1, padding: mobile ? '6px 6px' : '8px 12px', borderRadius: 6, border: 'none', background: compFreq === c.value ? C.white : 'transparent', color: compFreq === c.value ? C.ink : C.ink3, fontFamily: INTER, fontSize: mobile ? 11.5 : 12.5, fontWeight: 600, cursor: 'pointer', boxShadow: compFreq === c.value ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {result ? (
                    <>
                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Total Interest</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Total interest earned: ${fmtIN(result.interest)}`}>
                          {fmtIN(result.interest)}
                        </span>
                      </div>

                      <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 16 : 20 }}>
                        <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Maturity Amount</span>
                        <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                          aria-live="polite" aria-label={`Maturity amount: ${fmtIN(result.maturity)}`}>
                          {fmtIN(result.maturity)}
                        </span>
                      </div>

                      {[
                        { label: 'Principal',      value: fmtC(result.principal) },
                        { label: 'Total Interest', value: fmtC(result.interest) },
                        { label: 'Effective Annual Rate', value: `${result.ear.toFixed(2)}%` },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                          <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                          <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                        </div>
                      ))}

                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                        <DonutChart principal={result.principal} interest={result.interest} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Principal {prinPct}%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 12, color: C.ink2 }}>Interest {intPct}%</span>
                        </div>
                      </div>

                      <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Principal {prinPct}%</span>
                          <span style={{ fontSize: 11.5, color: C.ink3 }}>Interest {intPct}%</span>
                        </div>
                        <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Principal is ${prinPct}% of maturity amount`}>
                          <div style={{ height: '100%', width: `${prinPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                        </div>
                      </div>

                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, color: C.ink3, fontSize: 14 }}>
                      Adjust inputs to see result
                    </div>
                  )}
                </div>
              </div>

              {/* Year-by-year table */}
              {result && growthRows.length > 0 && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowTable((v: boolean) => !v)}
                    aria-expanded={showTable} aria-controls="growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Year-by-Year Growth Table</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Compounding breakdown</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {Math.ceil(years)} {timeMode === 'yr' ? 'yr' : 'mo'} · {rate.toFixed(1)}% rate
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showTable && (
                    <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '20px 18px' : '28px 44px 20px' }}>
                        {/* Chart Section */}
                        <SavingsGrowthChart rows={growthRows} principal={balance} />
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 14, marginBottom: 24 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 12, height: 12, borderRadius: 2, background: C.dark }} aria-hidden="true" />
                            <span style={{ fontSize: 13, fontWeight: 500, color: C.ink2 }}>Principal</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                            <div style={{ width: 12, height: 12, borderRadius: 2, background: C.lime2 }} aria-hidden="true" />
                            <span style={{ fontSize: 13, fontWeight: 500, color: C.ink2 }}>Interest Earned</span>
                          </div>
                        </div>
                      </div>

                      {/* Data Table Section */}
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
                        <table style={{ minWidth: '100%', width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6', borderBottom: `2px solid ${C.border}` }}>
                              {['Year', 'Opening Balance', 'Interest Earned', 'Closing Balance', 'Rate'].map(h => (
                                <th key={h} style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 700, color: C.ink, fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', ...(h === 'Year' && { textAlign: 'left' }) }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {growthRows.map((row, i) => {
                              const opening = i === 0 ? balance : growthRows[i - 1].value;
                              return (
                                <tr key={row.year} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                  <td style={{ padding: '13px 16px', fontWeight: 700, color: C.ink, textAlign: 'left' }}>{row.year}</td>
                                  <td style={{ padding: '13px 16px', color: C.ink2, textAlign: 'right' }}>{fmtIN(opening)}</td>
                                  <td style={{ padding: '13px 16px', color: C.ink, fontWeight: 600, textAlign: 'right' }}>{fmtIN(Math.abs(row.gain))}</td>
                                  <td style={{ padding: '13px 16px', color: C.ink, fontWeight: 600, textAlign: 'right' }}>{fmtIN(row.value)}</td>
                                  <td style={{ padding: '13px 16px', color: C.ink2, textAlign: 'right' }}>{rate.toFixed(2)}%</td>
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

            {/* ── WAITLIST ── */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-savings-interest">What Is Savings Account Interest?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Savings account interest is the amount a bank pays you for keeping money in your savings account, calculated as a percentage of your balance on a daily basis. In India, banks use the daily balance method as mandated by the Reserve Bank of India since April 2010.
                  </p>
                </div>
                <p style={p}>
                  Banks lend your savings and return a portion of earnings as interest. The RBI's repo rate acts as the benchmark, and banks typically adjust savings rates within weeks of repo changes.
                </p>
                <p style={p}>
                  Rates range from 2.5% to 4% at major banks, up to 6% at small finance and digital banks. Rates can change anytime at the bank's discretion.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="savings-interest-formula">Savings Account Interest Formula: Daily Balance Method</h2>
                <p style={p}>The daily balance method uses this formula to calculate interest:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>
                    Daily Interest = (Daily Balance x Rate of Interest) / 365
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Variables used in the daily balance interest formula</caption>
                    <thead><tr><th style={{ ...thS, width: 140 }} scope="col">Variable</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Daily Balance', 'Closing balance in the account at end of day'],
                        ['Rate of Interest', 'Annual interest rate offered by the bank (e.g., 3%)'],
                        ['365', 'Number of days in a year (366 in a leap year)'],
                        ['Daily Interest', 'Interest earned for that single day'],
                      ].map(([v, m]) => (
                        <tr key={v as string}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For compound interest projections over longer periods, this calculator uses: <code style={mono}>A = P x (1 + r/n)^(n x t)</code>, where A is the maturity amount, P is the principal (account balance), r is the annual interest rate, n is the number of compounding periods per year, and t is the time in years. Daily compounding with n=365 most closely reflects how Indian banks calculate interest.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="daily-balance-method">Daily Balance Method Explained</h2>
                <p style={p}>
                  Under the daily balance method, interest is calculated on your account's closing balance each day. This replaced the monthly balance method, which only counted your lowest balance between the 10th and last day of each month.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Daily balance method replaced monthly balance method per RBI mandate (April 2010)</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">How it works</th><th style={thS} scope="col">Impact on depositor</th></tr></thead>
                    <tbody>
                      {[
                        ['Daily Balance (current)', 'Interest on each day\'s closing balance', 'Better for depositors. Every rupee earns interest every day.'],
                        ['Monthly Balance (old)', 'Interest on the lowest balance between 10th and last day', 'Worse for depositors. Mid-month deposits earned no interest that month.'],
                      ].map(([m, h, i]) => (
                        <tr key={m as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>{m}</td>
                          <td style={tdR}>{h}</td>
                          <td style={tdL}>{i}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  In April 2010, the RBI made daily balance mandatory for all banks. Now, money deposited on any day starts earning interest immediately, rather than waiting for the next calculation cycle.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="interest-calculation-example">Interest Calculation Example with Real Numbers</h2>
                <p style={p}>
                  For Rs 1,00,000 at 3% per annum: daily rate is 0.008219%, earning Rs 8.22 per day. Over a quarter, that's Rs 739; over a year, Rs 2,956.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Interest calculation for Rs 1,00,000 at 3% per annum</caption>
                    <thead><tr><th style={thS} scope="col">Period</th><th style={thS} scope="col">Daily Interest</th><th style={thS} scope="col">Quarterly Total</th><th style={thS} scope="col">Yearly Total</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 1,00,000 at 3%', 'Rs 8.22', 'Rs 739', 'Rs 2,956'],
                        ['Rs 5,00,000 at 3%', 'Rs 41.10', 'Rs 3,699', 'Rs 14,795'],
                        ['Rs 10,00,000 at 3.5%', 'Rs 95.89', 'Rs 8,630', 'Rs 34,521'],
                        ['Rs 25,00,000 at 4%', 'Rs 273.97', 'Rs 24,658', 'Rs 98,630'],
                      ].map(([p, d, q, y]) => (
                        <tr key={p as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{p}</td>
                          <td style={tdR}>{d}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{q}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{y}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  With daily compounding at 3%, Rs 1,00,000 grows to Rs 1,03,045 in year 1 (Rs 3,045 interest) and Rs 1,16,183 in year 5 (Rs 16,183 total interest).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="savings-vs-fd">Savings Account vs Fixed Deposit</h2>
                <p style={p}>
                  A savings account is designed for everyday transactions and offers complete liquidity with lower interest rates. A fixed deposit locks your money for a fixed period and offers significantly higher returns. The choice depends on whether you need immediate access to your money or can afford to lock it away.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Savings account vs fixed deposit: key differences</caption>
                    <thead><tr><th style={thS} scope="col">Feature</th><th style={thS} scope="col">Savings Account</th><th style={thS} scope="col">Fixed Deposit</th></tr></thead>
                    <tbody>
                      {[
                        ['Interest rate', '2.5% to 4%', '6% to 7.5%'],
                        ['Liquidity', 'Full, withdraw anytime', 'Locked for the tenure'],
                        ['Interest calculation', 'Daily balance, credited quarterly', 'Quarterly compounding, paid at maturity'],
                        ['Minimum balance', 'Rs 0 to Rs 10,000 (MAB)', 'Rs 1,000 to Rs 10,000'],
                        ['Tenure', 'No fixed tenure', '7 days to 10 years'],
                        ['Tax', 'Taxable under 80TTA (Rs 10k deduction)', 'TDS at 10% if interest exceeds Rs 40k'],
                        ['Insurance cover', 'Up to Rs 5 lakh per bank (DICGC)', 'Up to Rs 5 lakh per bank (DICGC)'],
                        ['Best for', 'Emergency funds and daily expenses', 'Surplus savings and specific goals'],
                      ].map(([f, s, fd]) => (
                        <tr key={f as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, whiteSpace: 'nowrap' }}>{f}</td>
                          <td style={tdR}>{s}</td>
                          <td style={tdR}>{fd}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For the same principal of Rs 1,00,000 over 1 year, a savings account at 3% earns approximately Rs 3,000 in interest. A fixed deposit at 7% earns approximately Rs 7,000. The difference becomes more pronounced over longer periods.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>FD Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Compare your savings account returns against fixed deposit rates. Enter the same balance and tenure to see the interest difference.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="current-rates">Current Savings Account Interest Rates in India</h2>
                <p style={p}>
                  Savings account interest rates vary across banks. Here are the current rates offered by major Indian banks as of June 2026. Rates are subject to change based on RBI monetary policy and individual bank decisions.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, textAlign: 'left', paddingTop: 6 }}>Rates as of June 2026; subject to change based on RBI policy</caption>
                    <thead><tr><th style={thS} scope="col">Bank</th><th style={thS} scope="col">Interest Rate (p.a.)</th><th style={thS} scope="col">Balance Tier</th></tr></thead>
                    <tbody>
                      {[
                        ['State Bank of India (SBI)', '2.70%', 'Below Rs 50 crore'],
                        ['HDFC Bank', '2.50%', 'Up to Rs 50 lakh'],
                        ['HDFC Bank', '3.00%', 'Above Rs 50 lakh'],
                        ['ICICI Bank', '2.50%', 'Up to Rs 50 lakh'],
                        ['ICICI Bank', '3.00%', 'Above Rs 50 lakh'],
                        ['Axis Bank', '2.50%', 'Up to Rs 50 lakh'],
                        ['Axis Bank', '3.00%', 'Above Rs 50 lakh'],
                        ['Kotak Mahindra Bank', '3.00%', 'Up to Rs 10 lakh'],
                        ['Kotak Mahindra Bank', '3.50%', 'Above Rs 10 lakh'],
                        ['Yes Bank', '3.25%', 'Up to Rs 1 crore'],
                        ['AU Small Finance Bank', '5.00%', 'Up to Rs 1 lakh'],
                        ['AU Small Finance Bank', '6.00%', 'Above Rs 1 crore'],
                        ['Equitas Small Finance Bank', '5.50%', 'All balances'],
                        ['Jana Small Finance Bank', '6.00%', 'Up to Rs 1 lakh'],
                        ['Post Office Savings Account', '4.00%', 'All balances'],
                      ].map(([b, r, t]) => (
                        <tr key={`${b}-${t}` as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{b}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{r}</td>
                          <td style={tdL}>{t}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Small finance banks and post office savings accounts offer higher rates than traditional commercial banks. However, deposits with all scheduled commercial banks and small finance banks are covered by DICGC insurance up to Rs 5 lakh per depositor per bank. The post office savings account is backed by the Government of India.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="savings-interest-tax">Tax on Savings Account Interest (Section 80TTA)</h2>
                <p style={p}>
                  Interest on savings accounts is taxable as income and must be reported in your annual tax return. However, banks do not deduct TDS on savings interest, unlike fixed deposits (TDS applies above Rs 40,000 annually for non-seniors).
                </p>
                <p style={p}>
                  Under <strong>Section 80TTA</strong>, individuals and HUFs can claim a deduction of up to Rs 10,000 per financial year on interest income from savings accounts. This Rs 10,000 is the aggregate interest from all savings accounts held across banks and post offices. Any interest above Rs 10,000 is added to your total income and taxed as per your applicable income tax slab rate.
                </p>
                <p style={p}>
                  For senior citizens, <strong>Section 80TTB</strong> provides a higher deduction of up to Rs 50,000 per financial year on interest income from deposits, which includes savings accounts, fixed deposits, and recurring deposits. This makes savings accounts particularly tax-efficient for senior citizens with significant deposit holdings.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of Savings Account Interest</h2>
                <div>
                  {[
                    ['Low returns compared to inflation', 'With savings account rates between 2.5% and 4%, the real return after adjusting for inflation (typically 4% to 6% in India) is often negative. Your money grows slower than the cost of living, effectively losing purchasing power over time.'],
                    ['Interest rate volatility', 'Banks can change savings account interest rates at any time based on RBI repo rate decisions. Unlike fixed deposits where the rate is locked for the tenure, savings account rates fluctuate with the monetary policy cycle.'],
                    ['Taxable income', 'Interest above Rs 10,000 per year (Rs 50,000 for senior citizens) is fully taxable as per your income tax slab. For someone in the 30% tax bracket, the effective post-tax return on a 3% savings account drops to approximately 2.1%.'],
                    ['Not suitable for long-term savings', 'For goals that are 3 to 5 years away, instruments like fixed deposits, debt funds, or PPF offer significantly better returns with minimal additional risk. Keeping large sums in savings accounts for extended periods means leaving money on the table.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="compound-vs-simple-interest">Compound Interest vs Simple Interest: Why Banks Use Daily Compounding</h2>
                <p style={p}>
                  Many assume savings account interest is simple interest. In reality, Indian banks use compound interest: earned interest is added back to principal and earns interest itself.
                </p>
                <p style={p}>
                  Simple interest: Rs 1,00,000 at 3% earns Rs 15,000 over 5 years. Compound (daily): Rs 16,183 over 5 years—8% more. The gap widens with higher rates and longer time.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Simple vs compound interest: Rs 1,00,000 at 3% p.a.</caption>
                    <thead><tr><th style={thS} scope="col">Method</th><th style={thS} scope="col">After 1 Year</th><th style={thS} scope="col">After 5 Years</th><th style={thS} scope="col">Difference</th></tr></thead>
                    <tbody>
                      {[
                        ['Simple Interest', 'Rs 1,03,000', 'Rs 1,15,000', '+0%'],
                        ['Compound (Annual)', 'Rs 1,03,000', 'Rs 1,15,927', '+0.8%'],
                        ['Compound (Quarterly)', 'Rs 1,03,023', 'Rs 1,16,055', '+0.9%'],
                        ['Compound (Daily)', 'Rs 1,03,045', 'Rs 1,16,183', '+1.1%'],
                      ].map(([m, yr1, yr5, diff]) => (
                        <tr key={m as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{m}</td>
                          <td style={tdR}>{yr1}</td>
                          <td style={tdR}>{yr5}</td>
                          <td style={tdR}>{diff}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  This is why the RBI mandated daily balance method compounding in 2010. It ensures depositors benefit from compound interest at the most granular level, so even single-day deposits earn interest. This calculator always uses compound interest, reflecting actual bank mechanics.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="benefits">Benefits of Using a Savings Account Interest Calculator</h2>
                <div>
                  {[
                    ['Know your exact earnings', 'Rather than guessing or using approximate mental math, a calculator shows the exact interest you will earn across different balances, rates, and time horizons. This precision helps you plan with confidence.'],
                    ['Compare banks and rates instantly', 'Enter the same balance and timeframe for different banks to see which offers the highest maturity amount. The compounding frequency option lets you see how quarterly vs daily compounding impacts your returns.'],
                    ['Decide between savings and fixed deposits', 'Run the numbers side-by-side: savings account at 3% vs FD at 7% for the same balance. See how much higher the FD return is and decide if locking money for 1-5 years is worth the extra return for your situation.'],
                    ['Plan around the 80TTA tax deduction limit', 'If you earn Rs 15,000 in interest annually, only Rs 5,000 is taxable (the Rs 10,000 deduction applies). This calculator helps you forecast interest to decide if you need multiple accounts or should move surplus cash to FDs.'],
                    ['Understand compounding frequency impact', 'See in real numbers how daily compounding generates more return than monthly or quarterly. For large balances, even small differences compound into meaningful gains over 5-10 years.'],
                    ['Evaluate rate changes', 'When your bank announces a rate cut from 3% to 2.5%, run both scenarios to quantify the exact impact on your money over 1-3 years. This keeps you informed for refinancing decisions.'],
                  ].map(([title, text], i) => (
                    <div key={i} style={{ ...bul, marginBottom: 14, gap: 0, flexDirection: 'column' as const }}>
                      <strong style={{ fontSize: 15, color: C.ink, marginBottom: 4 }}>{title}</strong>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="key-takeaways">Key Takeaways: Maximizing Savings Account Returns</h2>
                <div>
                  {[
                    'Daily balance method compounding is real compound interest, not simple interest. Every day your money earns interest on the principal plus previously earned interest.',
                    'Savings account rates in India range from 2.5% to 6% depending on the bank. Small finance banks and digital banks typically pay more than traditional banks, but have lower DICGC coverage (Rs 5 lakh vs unlimited for banks).',
                    'The 80TTA deduction caps taxable interest at Rs 10,000/year for individuals. If you earn more, only the excess is taxed. Senior citizens get Rs 50,000 under 80TTB, a major tax advantage.',
                    'Use a savings account for emergency funds (liquidity is crucial), but do not leave large surplus cash earning 3% when a fixed deposit pays 7%. Calculate the interest difference over 3-5 years to make the trade-off clear.',
                    'Compounding frequency matters. Daily compounding at 3% yields about 8% more interest over 5 years than annual compounding at the same rate. This calculator shows the exact difference.',
                    'Current rates as of June 2026 are volatile. Always check your bank\'s website for the latest rates before large deposits. Set a reminder to review rates annually and switch banks if a competitor offers 0.5% more.',
                  ].map((point, i) => (
                    <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 20, fontWeight: 700, color: C.dark, lineHeight: '1.3', marginTop: '-2px' }}>•</span>
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="savings-by-life-stage">Savings Account Strategy by Life Stage</h2>
                <p style={p}>
                  Your savings account strategy should evolve as your career, income, and financial responsibilities change. Here's how to optimize for each stage:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Savings account strategy by career stage</caption>
                    <thead><tr><th style={thS} scope="col">Life Stage</th><th style={thS} scope="col">Target Savings Balance</th><th style={thS} scope="col">Strategy</th></tr></thead>
                    <tbody>
                      {[
                        ['Early career (age 22-30)', '3-6 months expenses', 'Build emergency fund first. Keep salary increases in savings initially, then move surplus to FDs/equity for long-term growth. Rate matters less; access matters more.'],
                        ['Mid-career (age 30-45)', '6-12 months expenses', 'Split: part stays liquid in savings for true emergencies, larger portions move to FD ladder (6mo, 1yr, 2yr) for 6-7.5% returns. Savings account is only for genuinely liquid funds.'],
                        ['Peak earning (age 45-55)', '12+ months expenses', 'Emergency fund is comfortable. Minimize savings account balance; deploy most capital to FDs, bonds, and tax-efficient instruments (PPF, ELSS). Savings account is a temporary parking spot, not a long-term home for money.'],
                        ['Pre-retirement (age 55-60)', '12-24 months expenses', 'Build large liquid buffer from 80TTB deduction (Rs 50k/year interest on deposits). Ladder FDs to mature around retirement date. Savings account holds only immediate 3-month needs.'],
                      ].map(([stage, target, strategy]) => (
                        <tr key={stage as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{stage}</td>
                          <td style={tdR}>{target}</td>
                          <td style={tdL}>{strategy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="account-types">Savings Account Types: Regular, Premium, and Digital Variants</h2>
                <p style={p}>
                  Not all savings accounts are equal. Banks offer tiered accounts targeting different customer segments. Understanding the differences helps you pick the right fit for your needs.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Account Type</th><th style={thS} scope="col">Interest Rate</th><th style={thS} scope="col">Minimum Balance</th><th style={thS} scope="col">Best For</th></tr></thead>
                    <tbody>
                      {[
                        ['Regular Savings', '2.5-3%', 'Rs 0-10,000', 'General purpose, salary accounts, frequent transactions'],
                        ['Premium/Super Saver', '3-4%', 'Rs 25,000-1 lakh', 'Higher balances, fewer withdrawals, domestic income'],
                        ['Digital Bank Account', '4-7%', 'Rs 0-5,000', 'Tech-savvy users, comfort with app-only banking, no branch'],
                        ['Senior Citizen Account', '2.5-3% (same)', 'Varies', 'Below 60: regular rates. Above 60: same interest, but 80TTB deduction worth much more'],
                      ].map(([type, rate, minBal, bestFor]) => (
                        <tr key={type as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{type}</td>
                          <td style={tdR}>{rate}</td>
                          <td style={tdL}>{minBal}</td>
                          <td style={tdL}>{bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Most working professionals benefit from a regular account (if salary is credited there, you keep minimum balance free of penalty) and a premium digital account with a small-finance bank for earning the 5-6% rate on excess emergency cash. Do not keep large balances in the 2.5% regular account if you can move them to a 7% FD.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="emergency-fund-sizing">Emergency Fund Sizing: How Much to Keep in Savings</h2>
                <p style={p}>
                  Financial experts recommend 3-12 months of living expenses in an emergency fund. But how much should live in your savings account (immediate access) vs a fixed deposit (higher return, but locked)?
                </p>
                <p style={p}>
                  <strong>Rule of thumb:</strong> Keep 1-3 months of expenses in your savings account (fully liquid, zero withdrawal friction). Keep the remaining 6-9 months in a FD ladder or high-yield savings alternative.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 16 }}>
                  <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 8px' }}>Worked Example:</p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: '0 0 8px', lineHeight: 1.6 }}>
                    Monthly expenses: Rs 60,000. Emergency fund target: Rs 6,00,000 (10 months).
                  </p>
                  <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0, lineHeight: 1.6 }}>
                    Breakdown: Rs 1,50,000 in savings account (2.5 months, instant access) + Rs 4,50,000 in FD at 7% (7.5 months, earn Rs 31,500/year). This way you have full emergency coverage and earn meaningful interest on the locked portion.
                  </p>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-to-switch-banks">When to Switch Banks for a Better Savings Rate</h2>
                <p style={p}>
                  Your current bank cuts rates from 3% to 2.5%. Should you switch? The answer depends on how much is in savings and how much you'll earn from the rate difference.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ textAlign: 'left', fontSize: 12, color: C.ink3, marginBottom: 6, captionSide: 'top' as const }}>Annual interest at different balances and rate differences</caption>
                    <thead><tr><th style={thS} scope="col">Savings Balance</th><th style={thS} scope="col">Rate 1</th><th style={thS} scope="col">Rate 2</th><th style={thS} scope="col">Annual Difference</th><th style={thS} scope="col">Worth Switching?</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 1 lakh', '3%', '2.5%', 'Rs 500', 'No (friction outweighs gain)'],
                        ['Rs 10 lakh', '3%', '2.5%', 'Rs 5,000', 'Maybe (if painless)'],
                        ['Rs 50 lakh', '3%', '2.5%', 'Rs 25,000', 'Yes (meaningful gain)'],
                        ['Rs 1 crore', '3%', '5%', 'Rs 2,00,000', 'Absolutely (huge difference)'],
                      ].map(([bal, r1, r2, diff, worth]) => (
                        <tr key={bal as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{bal}</td>
                          <td style={tdR}>{r1}</td>
                          <td style={tdR}>{r2}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{diff}</td>
                          <td style={tdL}>{worth}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Key consideration: the time cost of switching (KYC, fund transfer delays, relearning a new app) should not exceed the annual interest gain. For balances under Rs 10 lakh, stay put unless your rate dropped by 1% or more. For over Rs 50 lakh in savings, track rates quarterly and jump if a new bank offers 0.5% or more.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Savings Account Interest Calculator</h2>
                <p style={p}>This calculator projects the interest earnings on your savings account balance over time. Here is how to use each input:</p>

                <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12, listStyleType: 'decimal' }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Account Balance:</strong> enter the amount you currently hold in your savings account. The slider ranges from Rs 500 to Rs 50,00,000. Click the value to type a precise number.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Interest Rate:</strong> set the annual interest rate offered by your bank. Typical Indian savings account rates range from 1% to 8%. Most major banks offer between 2.5% and 4%.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Time Period:</strong> choose between years or months using the toggle. Use the preset buttons (6mo, 1Y, 3Y, 5Y, 10Y) to switch common durations instantly.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compounding Frequency:</strong> select how often interest compounds. Daily compounding (n=365) most accurately reflects how Indian banks calculate savings account interest. Monthly, quarterly, and annual options let you compare different methods.
                  </li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The dark result boxes show your total interest earned and the maturity amount. The donut chart visualises the proportion of principal versus interest earnings. Expand the year-by-year table to see how compounding builds your balance at each milestone. The Effective Annual Rate (EAR) shows the true annual return accounting for compounding frequency.
                </p>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only and are based on the inputs provided. Actual interest earned may vary based on the exact daily balance, the day of deposit and withdrawal, leap years, and any changes in interest rates by the bank during the calculation period. The calculator assumes a constant interest rate throughout the selected period. This calculator is for educational and planning purposes and does not constitute financial advice. Consult a SEBI-registered financial adviser before making investment decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .sai-sidebar::-webkit-scrollbar { width: 5px; }
            .sai-sidebar::-webkit-scrollbar-track { background: transparent; }
            .sai-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .sai-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside
            aria-label="Related calculators"
            className="sai-sidebar"
            style={{
              display: 'flex', flexDirection: 'column', gap: 16,
              position: 'sticky', top: 24, maxHeight: 'calc(100vh - 48px)',
              overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent',
            } as React.CSSProperties}
          >
            <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
            </div>
            <div style={{ flexShrink: 0 }}><SavingsSnapshot /></div>
            <div style={{ flexShrink: 0 }}>
              <nav aria-label="Popular calculators">
                <SidebarList title="Popular Calculators" items={POPULAR} />
              </nav>
            </div>
            <div style={{ flexShrink: 0 }}>
              <nav aria-label="More calculators">
                <SidebarList title="More Calculators" items={MORE} />
              </nav>
            </div>
            <div style={{ flexShrink: 0 }}><RelatedReads /></div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/fd-calculator|FD', '/calculators/rd-calculator|RD', '/calculators/ppf-calculator|PPF', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/fd-calculator|Fixed Deposits', '/calculators/savings-account-interest-calculator|Savings Accounts', '/calculators/home-loan-calculator|Home Loans', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

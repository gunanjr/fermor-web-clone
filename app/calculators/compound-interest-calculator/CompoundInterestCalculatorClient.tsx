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

/* ─── Constants ─────────────────────────────────────────────── */
const MIN_PRINCIPAL = 1000;
const MAX_PRINCIPAL = 100000000;
const MIN_RATE = 0.5;
const MAX_RATE = 30;
const MIN_YEARS = 1;
const MAX_YEARS = 40;
const YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 30];

type Frequency = 'yearly' | 'half-yearly' | 'quarterly' | 'monthly';
const FREQ_N: Record<Frequency, number> = { yearly: 1, 'half-yearly': 2, quarterly: 4, monthly: 12 };
const FREQ_LABEL: Record<Frequency, string> = { yearly: 'Yearly', 'half-yearly': 'Half-Yearly', quarterly: 'Quarterly', monthly: 'Monthly' };

/* ─── Math (single source of truth for headline result, table, and article examples) ── */
function compoundMaturity(principal: number, annualRatePct: number, n: number, years: number): number {
  if (years <= 0) return principal;
  if (annualRatePct === 0) return principal;
  return principal * Math.pow(1 + annualRatePct / 100 / n, n * years);
}

interface GrowthRow { year: number; opening: number; interest: number; closing: number }
function buildGrowthSchedule(principal: number, annualRatePct: number, n: number, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  let balance = principal;
  for (let y = 1; y <= years; y++) {
    const opening = balance;
    const closing = compoundMaturity(principal, annualRatePct, n, y);
    rows.push({ year: startYear + y - 1, opening, interest: closing - opening, closing });
    balance = closing;
  }
  return rows;
}

/* ─── Donut ─────────────────────────────────────────────────── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (principal / total) * circ;
  const pPct = Math.round((principal / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img"
      aria-label={`Maturity split: ${pPct}% principal, ${100 - pPct}% interest earned`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
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
    <div style={{ marginBottom: compact ? 18 : 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label}`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label}: ${fmt(value)}. Click to edit.`}
            style={{ fontSize: compact ? 13 : 15, fontWeight: 700, color: C.ink, background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, padding: compact ? '6px 12px' : '8px 18px', cursor: 'pointer', fontFamily: INTER, letterSpacing: '-0.01em', minWidth: compact ? 90 : 110, textAlign: 'center' }}
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
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(min)}</span>
        <span style={{ fontSize: 11, color: C.ink3 }}>{fmt(max)}</span>
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

/* sip-calculator and lumpsum-calculator go first: the article repeatedly sends readers
   there to distinguish recurring investments from the single lump sum this page compounds. */
const POPULAR = [
  { href: '/calculators/sip-calculator',           label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',       label: 'Lumpsum Calculator' },
  { href: '/calculators/cagr-calculator',          label: 'CAGR Calculator' },
  { href: '/calculators/fd-calculator',            label: 'FD Calculator' },
  { href: '/calculators/rd-calculator',            label: 'RD Calculator' },
  { href: '/calculators/step-up-sip-calculator',   label: 'Step-Up SIP Calculator' },
  { href: '/calculators/swp-calculator',           label: 'SWP Calculator' },
];
const MORE = [
  { href: '/calculators/interest-calculator',   label: 'Simple Interest Calculator' },
  { href: '/calculators/simple-and-compound-interest-calculator', label: 'Simple vs Compound Interest' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/home-loan-calculator',  label: 'Home Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator',   label: 'Mortgage Calculator' },
  { href: '/calculators/gratuity-calculator',   label: 'Gratuity Calculator' },
  { href: '/calculators/car-loan-calculator',   label: 'Car Loan EMI Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* ─── CA CTA (exact copy per CLAUDE.md standard component) ─────── */

export default function CompoundInterestCalculatorClient() {
  const defaultSettings = { principal: 100000, rate: 10, years: 10, frequency: 'yearly' as Frequency };
  const { settings, updateSettings } = useCalculatorSettings('compound-interest-calculator', defaultSettings);
  const { principal, rate, years, frequency } = settings;
  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setFrequency = (v: Frequency) => updateSettings({ frequency: v });

  const [mobile, setMobile] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const n = FREQ_N[frequency as Frequency];

  const maturity = useMemo(() => compoundMaturity(principal, rate, n, years), [principal, rate, n, years]);
  const totalInterest = Math.max(0, maturity - principal);
  const principalPct = maturity > 0 ? Math.round((principal / maturity) * 100) : 0;
  const interestPct = 100 - principalPct;
  const effectiveAnnualRate = (Math.pow(1 + rate / 100 / n, n) - 1) * 100;
  const doublingYears = rate > 0 ? 72 / rate : 0;

  const growthRows = useMemo(() => buildGrowthSchedule(principal, rate, n, years), [principal, rate, n, years]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* Sidebar scrollbar styles */}
      <style>{`
        .compound-int-sidebar::-webkit-scrollbar { width: 5px; }
        .compound-int-sidebar::-webkit-scrollbar-track { background: transparent; }
        .compound-int-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .compound-int-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Compound Interest Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate how a lump sum grows with yearly, half-yearly, quarterly, or monthly compounding, with a full year-wise growth schedule in rupees.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Principal Amount" id="ci-principal" value={principal} min={MIN_PRINCIPAL} max={MAX_PRINCIPAL} step={1000}
                    fmt={v => fmtC(v)} onChange={setPrincipal} compact={mobile} />
                  <Slider label="Rate of Interest (p.a.)" id="ci-rate" value={rate} min={MIN_RATE} max={MAX_RATE} step={0.1}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Time Period" id="ci-years" value={years} min={MIN_YEARS} max={MAX_YEARS} step={1}
                    fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />

                  {years <= MAX_YEARS && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: -22, marginBottom: 40 }}>
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
                  )}

                  {/* Compounding frequency toggle (border-only, no fill colors per input panel rule) */}
                  <div>
                    <div style={{ marginBottom: mobile ? 10 : 16 }}>
                      <label style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Compounding Frequency</label>
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
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Maturity highlight box */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Maturity Amount</span>
                    <span aria-live="polite" aria-label={`Maturity amount: ${fmtIN(maturity)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(maturity)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Principal invested', value: fmtC(principal) },
                    { label: 'Total interest earned', value: fmtC(totalInterest) },
                    { label: 'Effective annual rate', value: `${effectiveAnnualRate.toFixed(2)}%` },
                    { label: 'Time to double (Rule of 72)', value: `${doublingYears.toFixed(1)} yrs` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={principal} interest={totalInterest} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Principal amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest earned</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Principal {principalPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {interestPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${principalPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise growth schedule toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSchedule(v => !v)} aria-expanded={showSchedule} aria-controls="ci-growth-schedule"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-wise Growth Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Compounded {FREQ_LABEL[frequency as Frequency]})</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {growthRows.length} yr
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showSchedule && (
                  <div id="ci-growth-schedule" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '10px 24px' }}>
                        Year-by-year opening balance, interest earned, and closing balance for {fmtC(principal)} at {rate.toFixed(1)}% p.a., compounded {FREQ_LABEL[frequency as Frequency].toLowerCase()}.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Opening Balance', 'Interest Earned', 'Closing Balance'].map(h => (
                            <th key={h} scope="col" style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {growthRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                            <td style={{ padding: '13px 24px', color: '#166534', fontWeight: 600 }}>{fmtIN(row.interest)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closing)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              {(() => {
                const h2 = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
                const h3 = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
                const p  = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
                const sec = { margin: '0 0 40px' } as React.CSSProperties;
                const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const };
                const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'left' as const } as React.CSSProperties;
                const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'middle' as const, textAlign: 'right' as const } as React.CSSProperties;

                return (
                  <>
                    {/* 1: What is compound interest */}
                    <div id="what-is-compound-interest" style={sec}>
                      <h2 style={h2}>What Is Compound Interest?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Compound interest is interest calculated on the original principal plus all interest earned in previous periods. It is expressed as an annual percentage rate, applied at a chosen frequency such as yearly, quarterly, or monthly.
                        </p>
                      </div>
                      <p style={p}>
                        Simple interest only ever grows on the original amount. Compound interest grows on a rising base each period, so the same rate produces a steadily larger rupee return every year the money stays invested.
                      </p>
                      <p style={p}>
                        Most long-term Indian investment products, from PPF and EPF to fixed deposits and mutual funds, rely on this mechanism. Understanding how it behaves at different rates and frequencies is the starting point for any long-term financial plan.
                      </p>
                    </div>

                    {/* 2: Formula */}
                    <div id="ci-formula" style={sec}>
                      <h2 style={h2}>Compound Interest Formula: How to Calculate It</h2>
                      <p style={p}>The maturity value of a compounding investment is calculated as:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        A = P &times; (1 + r/n)^(n &times; t)
                      </p>
                      <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Variables used in the compound interest formula above.</caption>
                          <thead>
                            <tr>
                              <th style={{ ...thS, width: 60 }} scope="col">Symbol</th>
                              <th style={thS} scope="col">Meaning</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              ['A', 'The maturity amount: principal plus all interest earned'],
                              ['P', 'The principal, your original lump-sum investment'],
                              ['r', 'The annual interest rate, in decimal form (10% = 0.10)'],
                              ['n', 'Number of times interest compounds per year'],
                              ['t', 'Total time the money stays invested, in years'],
                            ].map(([v, m]) => (
                              <tr key={v}>
                                <td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{v}</td>
                                <td style={tdL}>{m}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <h3 style={h3}>Worked example</h3>
                      <p style={p}>
                        {fmtC(100000)} at 10% per annum for 10 years grows to roughly {fmtIN(Math.round(compoundMaturity(100000, 10, 1, 10)))} with yearly compounding, or about {fmtIN(Math.round(compoundMaturity(100000, 10, 12, 10)))} with monthly compounding. Enter the same numbers above to verify.
                      </p>
                    </div>

                    {/* 3: Excel formula */}
                    <div id="ci-formula-excel" style={sec}>
                      <h2 style={h2}>Compound Interest Formula in Excel: Three Methods</h2>
                      <p style={p}>The same maturity value can be built in a spreadsheet three different ways.</p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Three equivalent Excel methods for compound interest, where P, R, N, and T reference the cells holding principal, annual rate, compounding frequency, and years.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Method</th>
                              <th style={thS} scope="col">Formula</th>
                              <th style={thS} scope="col">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>Direct formula</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=P*(1+R/N)^(N*T)</td>
                              <td style={tdL}>Matches the formula above exactly.</td>
                            </tr>
                            <tr>
                              <td style={tdL}>POWER function</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=P*POWER(1+R/N,N*T)</td>
                              <td style={tdL}>Identical result, more readable in a shared workbook.</td>
                            </tr>
                            <tr>
                              <td style={tdL}>RRI function</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=RRI(N*T,P,A)</td>
                              <td style={tdL}>Solves for the compound rate per period given P, a known maturity value A, and total periods.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 4: CI vs SI */}
                    <div id="ci-vs-si" style={sec}>
                      <h2 style={h2}>Compound Interest vs Simple Interest: What Is the Difference?</h2>
                      <p style={p}>
                        Simple interest is calculated only on the original principal for every period, using A = P &times; (1 + r &times; t). Compound interest recalculates on principal plus prior interest, so the gap between the two widens every additional year.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Rs 10 lakh at 10% p.a. for 5 years, simple vs compound (yearly) interest.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Method</th>
                              <th style={{ ...thS, textAlign: 'right' }} scope="col">Total Interest</th>
                              <th style={{ ...thS, textAlign: 'right' }} scope="col">Maturity Value</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>Simple interest</td>
                              <td style={tdR}>{fmtIN(500000)}</td>
                              <td style={tdR}>{fmtIN(1500000)}</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Compound interest</td>
                              <td style={tdR}>{fmtIN(Math.round(compoundMaturity(1000000, 10, 1, 5) - 1000000))}</td>
                              <td style={tdR}>{fmtIN(Math.round(compoundMaturity(1000000, 10, 1, 5)))}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        The extra amount from compounding, about {fmtIN(Math.round(compoundMaturity(1000000, 10, 1, 5) - 1000000 - 500000))} in this example, is interest earned on interest that had already accumulated in earlier years. The <Link href="/calculators/simple-and-compound-interest-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Simple and Compound Interest Calculator</Link> runs both formulas on your own numbers side by side and includes a converter between simple and compound rates.
                      </p>
                    </div>

                    {/* 5: Compounding frequency */}
                    <div id="compounding-frequency" style={sec}>
                      <h2 style={h2}>How Compounding Frequency Changes Your Returns</h2>
                      <p style={p}>
                        More frequent compounding produces a higher maturity value at the same stated annual rate, because interest gets added to the principal sooner and starts earning its own interest sooner. The gap is small over a few years but becomes meaningful over a decade or more.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Rs 1,00,000 at 8% p.a. for 10 years, by compounding frequency.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Frequency</th>
                              <th style={{ ...thS, textAlign: 'right' }} scope="col">Maturity Value</th>
                              <th style={{ ...thS, textAlign: 'right' }} scope="col">Effective Annual Rate</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(Object.keys(FREQ_N) as Frequency[]).map(f => {
                              const nn = FREQ_N[f];
                              const mv = compoundMaturity(100000, 8, nn, 10);
                              const eff = (Math.pow(1 + 8 / 100 / nn, nn) - 1) * 100;
                              return (
                                <tr key={f}>
                                  <td style={tdL}>{FREQ_LABEL[f]}</td>
                                  <td style={tdR}>{fmtIN(Math.round(mv))}</td>
                                  <td style={tdR}>{eff.toFixed(2)}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Switch the frequency toggle in the calculator above to see this same effect on your own principal, rate, and tenure.
                      </p>
                    </div>

                    {/* 6: Rule of 72 */}
                    <div id="rule-of-72" style={sec}>
                      <h2 style={h2}>The Rule of 72: How Fast Your Money Doubles</h2>
                      <p style={p}>
                        The Rule of 72 estimates how many years it takes an investment to double at a given annual rate: divide 72 by the rate. It is a quick mental approximation, accurate mainly for rates between roughly 6% and 20%.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Approximate doubling time at common annual rates, using 72 divided by the rate.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Annual Rate</th>
                              <th style={{ ...thS, textAlign: 'right' }} scope="col">Approx. Years to Double</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[6, 8, 10, 12, 15].map(rt => (
                              <tr key={rt}>
                                <td style={tdL}>{rt}%</td>
                                <td style={tdR}>{(72 / rt).toFixed(1)} yrs</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        The calculator above shows this exact figure, computed precisely rather than approximated, in the "Time to double" result row.
                      </p>
                    </div>

                    {/* 7: Indian investments */}
                    <div id="ci-indian-investments" style={sec}>
                      <h2 style={h2}>Compound Interest in Popular Indian Investments</h2>
                      <h3 style={h3}>PPF (Public Provident Fund)</h3>
                      <p style={p}>
                        PPF compounds annually and currently offers a government-declared rate revised every quarter, typically around 7 to 8%. The 15-year lock-in makes it a natural fit for long-horizon compounding, and interest is tax-free under Section 80C.
                      </p>
                      <h3 style={h3}>EPF (Employees' Provident Fund)</h3>
                      <p style={p}>
                        EPF compounds annually at a rate the government declares each year, generally in the 8 to 8.5% range. Both employer and employee contributions compound over the full service period.
                      </p>
                      <h3 style={h3}>Fixed Deposits</h3>
                      <p style={p}>
                        Most Indian banks compound FD interest quarterly. Use the <Link href="/calculators/fd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Calculator</Link> for a version with quarterly compounding, TDS, and senior citizen rates already built in.
                      </p>
                      <h3 style={h3}>Mutual Funds and Equity</h3>
                      <p style={{ ...p, margin: 0 }}>
                        Equity mutual funds grow through capital appreciation rather than a stated compounding rate, and returns are never guaranteed. Their long-term annualised growth is still best understood as a compounding process, which is why fund houses quote a CAGR rather than a fixed interest rate.
                      </p>
                    </div>

                    {/* In-content promo bar 1 */}
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>CAGR Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Check the actual annualised growth rate an existing mutual fund or stock investment has delivered.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/cagr-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    {/* 8: CI vs SIP */}
                    <div id="ci-vs-sip" style={sec}>
                      <h2 style={h2}>Compound Interest Calculator vs SIP Calculator: Which One to Use</h2>
                      <p style={p}>
                        This calculator compounds a single lump sum you enter once. It does not add a fresh contribution every month, so it is the wrong tool for a recurring SIP.
                      </p>
                      <p style={p}>
                        A monthly SIP compounds each installment separately, from the month it was invested, so the first installment compounds far longer than the last. Use the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> for recurring investments, or the <Link href="/calculators/step-up-sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Step-Up SIP Calculator</Link> if your monthly amount increases every year.
                      </p>
                      <p style={p}>
                        If you already have a lump sum ready and want to compare it against investing the same money as an SIP instead, the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Lumpsum Calculator</Link> runs that comparison directly.
                      </p>
                    </div>

                    {/* 9: Tax */}
                    <div id="ci-tax" style={sec}>
                      <h2 style={h2}>How Compound Interest Is Taxed in India</h2>
                      <p style={p}>
                        Fixed deposit interest is added to your total income and taxed at your slab rate, with TDS deducted once annual interest from one bank crosses Rs 40,000 (Rs 50,000 for senior citizens). PPF and EPF interest is fully tax-exempt under Section 80C rules.
                      </p>
                      <p style={p}>
                        Equity mutual fund gains held over 12 months are taxed as long-term capital gains at 12.5%, above a Rs 1.25 lakh annual exemption. Gains held under 12 months are taxed as short-term capital gains at 20%. Confirm your exact liability with the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>.
                      </p>
                    </div>

                    {/* 10: How to use */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This Calculator</h2>
                      <p style={p}>The calculator needs four inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          { label: 'Principal Amount', text: 'enter the lump sum you plan to invest, using the slider or by clicking the value to type an exact figure.' },
                          { label: 'Rate of Interest', text: 'enter the expected annual return. For equity funds, 10 to 12% is a reasonable long-term assumption.' },
                          { label: 'Time Period', text: 'set the number of years the money stays invested, or pick one of the preset year buttons.' },
                          { label: 'Compounding Frequency', text: 'choose yearly, half-yearly, quarterly, or monthly to match your actual investment.' },
                        ].map((it, i) => (
                          <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{it.label}:</strong> {it.text}
                          </li>
                        ))}
                      </ol>
                      <p style={{ ...p, margin: 0 }}>
                        The maturity amount, interest earned, effective annual rate, and doubling time update instantly. Expand the growth schedule to see the year-by-year build-up.
                      </p>
                    </div>

                    {/* 11: Limitations */}
                    <div id="limitations" style={sec}>
                      <h2 style={h2}>Limitations of This Calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                          { t: 'Assumes a single, one-time investment.', d: 'It does not model recurring monthly contributions. For an SIP, use the SIP Calculator or Step-Up SIP Calculator instead.' },
                          { t: 'Assumes a constant rate for the entire tenure.', d: 'Real rates on FDs, PPF, and EPF can change between renewal cycles. A market-linked investment will not return a fixed rate at all.' },
                          { t: 'Does not calculate tax or TDS.', d: 'Use the Income Tax Calculator or FD Calculator for a version with TDS and slab-rate tax built in.' },
                          { t: 'Effective annual rate assumes no withdrawals.', d: 'Any partial withdrawal or premature closure during the tenure will change the actual return realised versus what this calculator shows.' },
                        ].map((it, i) => (
                          <div key={i}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{it.t}</p>
                            <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7, margin: 0 }}>{it.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    

                    {/* 12: FAQ */}
                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>

                    {/* 13: Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only, based on the principal, rate, tenure, and compounding frequency you enter. This calculator does not account for tax, TDS, or any fees, and past interest rates do not guarantee future rates. This tool is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <aside
            className="compound-int-sidebar"
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
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/rd-calculator|RD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

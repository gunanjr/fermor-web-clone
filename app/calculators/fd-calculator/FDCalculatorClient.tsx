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
const MIN_PRINCIPAL = 5000;
const MAX_PRINCIPAL = 10000000;
const MIN_RATE = 1;
const MAX_RATE = 15;
const MIN_TENURE_YEARS = 1;
const MAX_TENURE_YEARS = 25;
const TENURE_YEAR_PRESETS = [1, 3, 5, 10, 15, 20, 25];

/* ─── Math (single source of truth for both the headline result and the growth schedule) ── */
interface GrowthRow {
  year: number;
  openingBal: number;
  interestEarned: number;
  closingBal: number;
}

function fdMaturityAmount(principal: number, annualRatePct: number, tenureYears: number): number {
  const quarterlyRate = annualRatePct / 100 / 4;
  const quarters = tenureYears * 4;
  return principal * Math.pow(1 + quarterlyRate, quarters);
}

function buildGrowthSchedule(principal: number, annualRatePct: number, totalMonths: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  let balance = principal;
  const startYear = new Date().getFullYear();
  const totalYears = Math.ceil(totalMonths / 12);
  for (let y = 0; y < totalYears; y++) {
    const opening = balance;
    const monthsThisYear = Math.min(12, totalMonths - y * 12);
    const yearsThisYear = monthsThisYear / 12;
    const closing = fdMaturityAmount(opening, annualRatePct, yearsThisYear);
    rows.push({ year: startYear + y, openingBal: opening, interestEarned: closing - opening, closingBal: closing });
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
      aria-label={`Deposit split: ${pPct}% invested amount, ${100 - pPct}% interest earned`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Principal</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 28, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
  );
}

/* ─── Slider ─────────────────────────────────────────────────── */
function Slider({ label, id, value, min, max, step, fmt, onChange, compact }: {
  label: string; id?: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'slider');
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
        {label
          ? <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
          : <span />}
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
            aria-label={`Enter ${label || 'value'}`}
            style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', background: C.white, border: `1.5px solid ${C.dark}`, borderRadius: 8, padding: compact ? '6px 10px' : '8px 14px', width: 120, outline: 'none', color: C.dark, fontFamily: INTER }} />
        ) : (
          <button onClick={() => { setRaw(String(value)); setEditing(true); }}
            aria-label={`${label || 'Value'}: ${fmt(value)}. Click to edit.`}
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
          aria-label={label || 'Value'} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}
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

/* fd-maturity-calculator and fd-laddering-calculator go first: they are the calculators
   this page's own article links to for TDS/senior-citizen and laddering respectively. */
const POPULAR = [
  { href: '/calculators/fd-maturity-calculator', label: 'FD Maturity Calculator (with TDS)' },
  { href: '/calculators/rd-calculator',           label: 'RD Calculator' },
  { href: '/calculators/fd-laddering-calculator', label: 'FD Laddering Calculator' },
  { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
  { href: '/calculators/lumpsum-calculator',      label: 'Lumpsum Calculator' },
  { href: '/calculators/swp-calculator',          label: 'SWP Calculator' },
  { href: '/calculators/gratuity-calculator',     label: 'Gratuity Calculator' },
];
const MORE = [
  { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
  { href: '/calculators/home-loan-calculator',          label: 'Home Loan EMI Calculator' },
  { href: '/calculators/mortgage-calculator',           label: 'Mortgage Calculator' },
  { href: '/calculators/car-loan-calculator',           label: 'Car Loan EMI Calculator' },
  { href: '/calculators/compound-interest-calculator',  label: 'Compound Interest Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* ─── CA CTA (exact copy per CLAUDE.md standard component) ─────── */

export default function FDCalculatorClient() {
  const defaultSettings = { principal: 100000, rate: 7.1, tenureYr: 5, tenureMode: 'yr', tenureMo: 60 };
  const { settings, updateSettings } = useCalculatorSettings('fd-calculator', defaultSettings);
  const { principal, rate, tenureYr, tenureMode, tenureMo } = settings;
  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setTenureYr = (v: number) => updateSettings({ tenureYr: v });
  const setTenureMode = (v: 'yr' | 'mo') => updateSettings({ tenureMode: v });
  const setTenureMo = (v: number) => updateSettings({ tenureMo: v });

  const [mobile, setMobile] = useState(false);
  const [showAmort, setShowAmort] = useState(false);

  const { formatCurrency, convertCurrency } = useCurrency();

  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const months = tenureMode === 'yr' ? tenureYr * 12 : tenureMo;
  const tenureYears = months / 12;

  const maturityAmount = useMemo(
    () => Math.round(fdMaturityAmount(principal, rate, tenureYears)),
    [principal, rate, tenureYears]
  );

  const interestEarned = Math.max(0, maturityAmount - principal);
  const principalPct = maturityAmount > 0 ? Math.round((principal / maturityAmount) * 100) : 0;
  const interestPct = 100 - principalPct;

  // Effective annual yield: the true annualised return once quarterly compounding is accounted for.
  const effectiveAnnualYield = useMemo(() => {
    if (principal <= 0 || tenureYears <= 0) return 0;
    return (Math.pow(maturityAmount / principal, 1 / tenureYears) - 1) * 100;
  }, [maturityAmount, principal, tenureYears]);

  const growthRows = useMemo(() => buildGrowthSchedule(principal, rate, months), [principal, rate, months]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* Sidebar scrollbar styles */}
      <style>{`
        .fd-sidebar::-webkit-scrollbar { width: 5px; }
        .fd-sidebar::-webkit-scrollbar-track { background: transparent; }
        .fd-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .fd-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>FD Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate fixed deposit maturity amount and total interest with quarterly compounding, the same method Indian banks and the Post Office use.</p>
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
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Fixed Deposit Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Total Investment" id="fd-principal" value={principal} min={MIN_PRINCIPAL} max={MAX_PRINCIPAL} step={5000}
                    fmt={v => fmtC(v)} onChange={setPrincipal} compact={mobile} />
                  <Slider label="Rate of Interest (p.a.)" id="fd-rate" value={rate} min={MIN_RATE} max={MAX_RATE} step={0.05}
                    fmt={v => `${v.toFixed(2)}%`} onChange={setRate} compact={mobile} />

                  {/* Tenure + toggle (no fill colors, border only, per input panel color rules) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label htmlFor="fd-tenure-range" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Time Period</label>
                      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                        {(['yr', 'mo'] as const).map(m => (
                          <button key={m} onClick={() => setTenureMode(m)}
                            style={{ padding: mobile ? '4px 10px' : '5px 14px', border: 'none', background: tenureMode === m ? C.white : 'transparent', color: tenureMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: tenureMode === m ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                            {m === 'yr' ? 'Years' : 'Months'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {tenureMode === 'yr'
                      ? <Slider label="" id="fd-tenure" value={tenureYr} min={MIN_TENURE_YEARS} max={MAX_TENURE_YEARS} step={1} fmt={v => `${v} Yr`} onChange={v => { setTenureYr(v); setTenureMo(v * 12); }} compact={mobile} />
                      : <Slider label="" id="fd-tenure" value={tenureMo} min={12} max={300} step={1} fmt={v => `${v} Mo`} onChange={v => { setTenureMo(v); setTenureYr(Math.round(v / 12)); }} compact={mobile} />}

                    {tenureMode === 'yr' && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                        {TENURE_YEAR_PRESETS.map(y => (
                          <button key={y} onClick={() => { setTenureYr(y); setTenureMo(y * 12); }}
                            aria-label={`Set tenure to ${y} years`}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: tenureYr === y ? C.ink : C.ink3,
                              border: `${tenureYr === y ? 1.5 : 1}px solid ${tenureYr === y ? C.ink : C.border}`,
                              fontWeight: tenureYr === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {y}Y
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  {/* Maturity highlight box */}
                  <div style={{ width: '100%', background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.dark }}>Maturity Amount</span>
                    <span aria-live="polite" aria-label={`Maturity amount: ${fmtIN(maturityAmount)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: C.dark, letterSpacing: '-0.02em' }}>{fmtIN(maturityAmount)}</span>
                  </div>

                  {/* Stat rows */}
                  {[
                    { label: 'Invested amount', value: fmtC(principal) },
                    { label: 'Est. returns (interest)', value: fmtC(interestEarned) },
                    { label: 'Effective annual yield', value: `${effectiveAnnualYield.toFixed(2)}%` },
                    { label: 'Total value', value: fmtC(maturityAmount) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart principal={principal} interest={interestEarned} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Invested amount</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest earned</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {principalPct}%</span>
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
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="fd-growth-schedule"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Growth Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Compounded Quarterly)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {growthRows.length} yr &middot; {months} mo
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="fd-growth-schedule" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '10px 24px' }}>
                        Year-by-year opening balance, interest earned, and closing balance for a {fmtC(principal)} deposit at {rate.toFixed(2)}% p.a.
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
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.openingBal)}</td>
                            <td style={{ padding: '13px 24px', color: '#166534', fontWeight: 600 }}>{fmtIN(row.interestEarned)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.closingBal)}</td>
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
                    {/* 1: What is a Fixed Deposit */}
                    <div id="what-is-fd" style={sec}>
                      <h2 style={h2}>What Is a Fixed Deposit (FD)?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          A Fixed Deposit (FD) is a financial instrument offered by banks, NBFCs, and the Post Office where a lump sum is deposited for a fixed tenure at a predetermined interest rate. It is expressed as an annual percentage rate, compounded quarterly.
                        </p>
                      </div>
                      <p style={p}>
                        Unlike a savings account, the rate on an FD is locked in the day it is opened and does not change for the rest of the tenure, regardless of what happens to market rates afterward. This makes it one of the most predictable investment options available to Indian savers.
                      </p>
                      <p style={p}>
                        FDs are also called term deposits or time deposits, especially by NBFCs and the Post Office. Most Indian banks compound the interest quarterly, adding each quarter&apos;s interest to the principal before the next quarter is calculated.
                      </p>
                      <p style={p}>
                        Deposits at scheduled commercial banks, including small finance banks, are insured up to Rs 5 lakh per depositor per bank under the <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RBI-regulated</a> DICGC scheme.
                      </p>
                    </div>

                    {/* 2: Formula */}
                    <div id="fd-formula" style={sec}>
                      <h2 style={h2}>FD Formula: How to Calculate Maturity Amount</h2>
                      <p style={p}>Indian banks calculate FD interest with quarterly compounding, using this formula:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        A = P &times; (1 + R/400)^(4 &times; T)
                      </p>
                      <p style={p}>
                        Here A is the maturity amount, P is the principal you invest, R is the annual rate in percent, and T is the tenure in years.
                      </p>
                      <p style={p}>
                        Dividing by 400 converts the annual rate into a quarterly decimal. Interest is added to the principal every three months, so later quarters earn interest on a slightly larger base than earlier ones.
                      </p>
                      <h3 style={h3}>Worked example</h3>
                      <p style={p}>
                        Rs 1,00,000 at 7.10% p.a. for 5 years, compounded quarterly, grows to approximately {fmtIN(Math.round(fdMaturityAmount(100000, 7.1, 5)))}, a total interest of roughly {fmtIN(Math.round(fdMaturityAmount(100000, 7.1, 5)) - 100000)}. Enter these numbers in the calculator above to verify.
                      </p>
                    </div>

                    {/* 3: Excel formula */}
                    <div id="fd-formula-excel" style={sec}>
                      <h2 style={h2}>FD Formula in Excel: Three Methods</h2>
                      <p style={p}>The same quarterly compounding maturity value can be built in a spreadsheet three different ways.</p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Three equivalent Excel methods for FD maturity with quarterly compounding.</caption>
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
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=P*(1+R/400)^(4*T)</td>
                              <td style={tdL}>P, R, T reference the cells holding principal, rate, and years.</td>
                            </tr>
                            <tr>
                              <td style={tdL}>POWER function</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=P*POWER(1+R/400,4*T)</td>
                              <td style={tdL}>Identical result; POWER() is more readable in a shared workbook.</td>
                            </tr>
                            <tr>
                              <td style={tdL}>FV function</td>
                              <td style={{ ...tdL, fontFamily: 'monospace' }}>=-FV(R/400,4*T,0,P)</td>
                              <td style={tdL}>Excel&apos;s built-in future value function; the leading minus sign flips the sign convention FV() uses for outflows.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 4: How rates are structured (no invented current numbers) */}
                    <div id="fd-rates" style={sec}>
                      <h2 style={h2}>How Banks Structure FD Interest Rates</h2>
                      <p style={p}>
                        Banks publish FD rates as a table of tenure buckets, and the highest rate rarely sits on the shortest or longest tenure. It is usually in the 1 to 3-year range instead.
                      </p>
                      <p style={p}>
                        Small finance banks and NBFCs generally price FDs higher than large banks to attract deposits, but NBFC FDs are not DICGC-insured, so the issuer&apos;s credit rating matters more there.
                      </p>
                      <p style={p}>
                        Rates change with every RBI policy cycle. Confirm the current rate with your bank, then use the slider above with that rate to see the actual maturity value.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>
                            Where to check the current quoted rate before entering it into the calculator above. Rates shown on official pages change frequently and are not reproduced here.
                          </caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Issuer</th>
                              <th style={thS} scope="col">Type</th>
                              <th style={thS} scope="col">DICGC insured</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'SBI', type: 'Public sector bank', insured: 'Yes' },
                              { name: 'HDFC Bank', type: 'Private bank', insured: 'Yes' },
                              { name: 'ICICI Bank', type: 'Private bank', insured: 'Yes' },
                              { name: 'Axis Bank', type: 'Private bank', insured: 'Yes' },
                              { name: 'Post Office (POTD)', type: 'Government-backed', insured: 'Sovereign guarantee' },
                              { name: 'Bajaj Finance', type: 'NBFC (corporate FD)', insured: 'No, rated by CRISIL/ICRA instead' },
                            ].map(row => (
                              <tr key={row.name}>
                                <td style={tdL}>{row.name}</td>
                                <td style={tdL}>{row.type}</td>
                                <td style={tdL}>{row.insured}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 5: TDS */}
                    <div id="tds" style={sec}>
                      <h2 style={h2}>TDS on FD Interest: Rules You Should Know</h2>
                      <p style={p}>
                        Banks deduct 10% TDS under Section 194A once your total FD interest from that bank crosses Rs 40,000 in a financial year, or Rs 50,000 for senior citizens. Without a PAN on file, the deduction rate rises to 20%.
                      </p>
                      <p style={p}>
                        TDS is only a withholding, not the final tax. The full interest is still taxable at your slab rate, and any gap versus the TDS deducted is settled when you file your return; check the exact figure with the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link>.
                      </p>
                      <p style={p}>
                        If your total income is below the taxable limit, filing Form 15G (below 60) or 15H (60 and above) stops the deduction at source. For TDS estimated against your own deposit, PAN status, and age bracket, use the <Link href="/calculators/fd-maturity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Maturity Calculator</Link>.
                      </p>
                    </div>

                    {/* 6: Tax-saving FD */}
                    <div id="tax-saving-fd" style={sec}>
                      <h2 style={h2}>Tax-Saving FD</h2>
                      <p style={p}>
                        A tax-saving FD is a 5-year fixed deposit that qualifies for a deduction of up to Rs 1.5 lakh per year under Section 80C of the Income Tax Act. It carries a mandatory 5-year lock-in with no premature withdrawal option, and no loan can be taken against it during that period.
                      </p>
                      <p style={p}>
                        The interest earned is still fully taxable at your slab rate; only the principal invested gets the 80C benefit, not the interest. Most major banks, including SBI, HDFC, ICICI, and Axis Bank, offer tax-saving FDs at their standard 5-year FD rate.
                      </p>
                    </div>

                    {/* 7: Senior citizen */}
                    <div id="senior-citizen" style={sec}>
                      <h2 style={h2}>Senior Citizen FD Rates</h2>
                      <p style={p}>
                        Banks add a fixed premium, commonly 0.25% to 0.75% per annum, for depositors aged 60 and above, sometimes more for super senior citizens aged 80 and above. It applies once the account is opened in the senior citizen category with valid age proof.
                      </p>
                      <p style={p}>
                        Senior citizens can also claim a deduction of up to Rs 50,000 on FD interest under Section 80TTB, separate from the Section 80C deduction available on a tax-saving FD. For an FD calculator with a built-in senior citizen toggle and TDS estimate, use the <Link href="/calculators/fd-maturity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Maturity Calculator</Link>.
                      </p>
                    </div>

                    {/* 8: FD vs RD */}
                    <div id="fd-vs-rd" style={sec}>
                      <h2 style={h2}>FD vs RD: What Is the Difference?</h2>
                      <p style={p}>
                        An FD requires a one-time lump-sum deposit at the start of the tenure. A Recurring Deposit (RD) instead takes a fixed installment every month over the same tenure, which suits savers building capital from monthly income rather than investing a lump sum already on hand.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>FD and RD compared on the factors that matter most when choosing between them.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Factor</th>
                              <th style={thS} scope="col">Fixed Deposit</th>
                              <th style={thS} scope="col">Recurring Deposit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>Investment style</td>
                              <td style={tdL}>One lump sum at the start</td>
                              <td style={tdL}>Fixed monthly installment</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Best suited for</td>
                              <td style={tdL}>Savers with a lump sum on hand</td>
                              <td style={tdL}>Savers building capital from salary</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Compounding</td>
                              <td style={tdL}>Quarterly, on the full principal</td>
                              <td style={tdL}>Quarterly, on the growing balance</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Deposit insurance</td>
                              <td style={tdL}>DICGC up to Rs 5 lakh per bank</td>
                              <td style={tdL}>DICGC up to Rs 5 lakh per bank</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Use the <Link href="/calculators/rd-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>RD Calculator</Link> to work out the maturity value of monthly installments instead of a lump sum. If you have a large sum to deploy but want to reduce reinvestment risk from a single rate, the <Link href="/calculators/fd-laddering-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>FD Laddering Calculator</Link> splits it across staggered tenures instead of one FD.
                      </p>
                    </div>

                    {/* In-content promo bar */}
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>FD Maturity Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>Add PAN status and age bracket to see the exact TDS deducted on your deposit.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/fd-maturity-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    {/* 9: What is a good FD rate / market comparison */}
                    <div id="fd-vs-market" style={sec}>
                      <h2 style={h2}>FD vs Market-Linked Investments</h2>
                      <p style={p}>
                        An FD returns a fixed, guaranteed rate regardless of markets, which is both its appeal and its limitation. A mutual fund SIP can return more over the long run, but with no guarantee, and can be negative in a given year.
                      </p>
                      <p style={p}>
                        FDs suit money you cannot afford to see shrink, such as an emergency fund. For long-term goals, compare the numbers with the <Link href="/calculators/sip-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>SIP Calculator</Link> or the <Link href="/calculators/lumpsum-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Lumpsum Calculator</Link> before deciding.
                      </p>
                    </div>

                    {/* 10: How to use */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This FD Calculator</h2>
                      <p style={p}>The calculator needs three inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          { label: 'Total Investment', text: 'enter the lump sum you plan to deposit, using the slider or by clicking the value to type an exact figure.' },
                          { label: 'Rate of Interest', text: 'enter the annual rate your bank has quoted for the tenure you plan to choose.' },
                          { label: 'Time Period', text: 'set the tenure in years or months using the toggle, or pick one of the preset year buttons.' },
                          { label: 'Review the result', text: 'read the maturity amount, interest earned, and effective annual yield, then expand the growth schedule to see the year-by-year build-up.' },
                        ].map((it, i) => (
                          <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{it.label}:</strong> {it.text}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 11: Limitations */}
                    <div id="limitations" style={sec}>
                      <h2 style={h2}>Limitations of This FD Calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                          { t: 'Assumes a constant rate for the full tenure.', d: 'Banks do not revise the rate on an existing FD mid-tenure, so this holds true in practice, but it will not reflect a premature-withdrawal penalty if you break the deposit early.' },
                          { t: 'Does not calculate TDS.', d: 'This page keeps the calculation to principal, rate, and tenure. Use the FD Maturity Calculator for a version with PAN status, age bracket, and TDS built in.' },
                          { t: 'Assumes standard quarterly compounding.', d: 'A small number of niche FD products compound monthly or annually instead. Confirm the compounding frequency stated in your bank\'s FD certificate before relying on this result for a non-standard product.' },
                          { t: 'Does not account for reinvestment risk.', d: 'The maturity amount assumes the rate holds for the entire tenure. If you plan to renew the FD partway through at a different rate, calculate each leg separately.' },
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
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only, based on the principal, rate, and tenure you enter. Actual FD returns depend on the exact terms of the deposit certificate issued by your bank or the Post Office, including compounding frequency, premature-withdrawal terms, and applicable TDS. This calculator does not account for TDS, and past interest rates do not guarantee future rates. This tool is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <aside
            className="fd-sidebar"
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

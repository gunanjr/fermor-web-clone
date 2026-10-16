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
const MIN_EXISTING = 0;
const MAX_EXISTING = 5000000;
const MIN_ANNUAL = 0;
const MAX_ANNUAL = 150000;
const MIN_MONTHLY = 0;
const MAX_MONTHLY = 12500;
const MIN_RATE = 1;
const MAX_RATE = 15;
const MIN_YEARS = 15;
const MAX_YEARS = 50;
const YEAR_PRESETS = [15, 20, 25, 30, 35, 40];

/* ─── Math (single source of truth for both the headline result and the growth table) ── */
interface GrowthRow {
  year: number;
  opening: number;
  deposited: number;
  interest: number;
  closing: number;
}

function calcPPF(existing: number, annual: number, ratePct: number, years: number): number {
  const r = ratePct / 100;
  let balance = existing;
  for (let y = 1; y <= years; y++) {
    balance = (balance + annual) * (1 + r);
  }
  return balance;
}

function buildPPFGrowth(existing: number, annual: number, ratePct: number, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const r = ratePct / 100;
  let balance = existing;
  for (let y = 1; y <= years; y++) {
    const opening = balance;
    const interest = Math.round((opening + annual) * r);
    const closing = Math.round((opening + annual) * (1 + r));
    rows.push({ year: y, opening: Math.round(opening), deposited: annual, interest, closing });
    balance = closing;
  }
  return rows;
}

/* ─── Donut ─────────────────────────────────────────────────── */
function DonutChart({ invested, returns: ret }: { invested: number; returns: number }) {
  const total = invested + ret;
  if (total <= 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc = (invested / total) * circ;
  const pPct = Math.round((invested / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img"
      aria-label={`Deposit split: ${pPct}% invested amount, ${100 - pPct}% interest earned`}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Invested</text>
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
    <div style={{ marginBottom: compact ? 18 : 32 }}>
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

const POPULAR = [
  { href: '/calculators/vpf-calculator',        label: 'VPF Calculator' },
  { href: '/calculators/epf-calculator',        label: 'EPF Calculator' },
  { href: '/calculators/nps-calculator',        label: 'NPS Calculator' },
  { href: '/calculators/ssy-calculator',        label: 'SSY Calculator' },
  { href: '/calculators/nsc-calculator',        label: 'NSC Calculator' },
  { href: '/calculators/fd-calculator',         label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/sip-calculator',               label: 'SIP Calculator' },
  { href: '/calculators/section-80c-calculator',       label: 'Section 80C Calculator' },
  { href: '/calculators/income-tax-calculator',        label: 'Income Tax Calculator' },
  { href: '/calculators/compound-interest-calculator', label: 'Compound Interest Calculator' },
  { href: '/calculators/gratuity-calculator',          label: 'Gratuity Calculator' },
];

/* ─── FAQ ───────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={FAQ_ITEMS} />;
}

/* ─── CA CTA (exact copy per CLAUDE.md standard component) ─────── */

export default function PPFCalculatorClient() {
  const defaultSettings = { existing: 0, annual: 150000, monthly: 12500, contribMode: 'yearly' as 'yearly' | 'monthly', rate: 7.1, years: 15 };
  const { settings, updateSettings } = useCalculatorSettings('ppf-calculator', defaultSettings);
  const { existing, annual, monthly, contribMode, rate, years } = settings;
  const setExisting = (v: number) => updateSettings({ existing: v });
  const setRate = (v: number) => updateSettings({ rate: v });
  const setYears = (v: number) => updateSettings({ years: v });
  const setContribMode = (v: 'yearly' | 'monthly') => updateSettings({ contribMode: v });

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

  const maturity = useMemo(() => calcPPF(existing, annual, rate, years), [existing, annual, rate, years]);
  const invested = existing + annual * years;
  const returns = maturity - invested;
  const invPct = maturity > 0 ? Math.round((invested / maturity) * 100) : 0;
  const returnsPct = 100 - invPct;

  const growthRows = useMemo(() => buildPPFGrowth(existing, annual, rate, years), [existing, annual, rate, years]);

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      {/* Sidebar scrollbar styles */}
      <style>{`
        .ppf-sidebar::-webkit-scrollbar { width: 5px; }
        .ppf-sidebar::-webkit-scrollbar-track { background: transparent; }
        .ppf-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
        .ppf-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
      `}</style>

      {/* NAV */}
      <PageNav />

      {/* BODY */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>PPF Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate Public Provident Fund maturity amount, year-wise balance, and total interest at the current 7.1% rate, with support for an existing balance and one-time deposits.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '16px 18px' : '48px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>PPF Details</p>
                    ) : (
                      <div />
                    )}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Existing PPF Balance" id="ppf-existing" value={existing} min={MIN_EXISTING} max={MAX_EXISTING} step={10000}
                    fmt={v => fmtC(v)} onChange={setExisting} compact={mobile} />

                  {/* Contribution amount + toggle (no fill colors, border only, per input panel color rules) */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label htmlFor="ppf-contrib-range" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Investment</label>
                      <div style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                        {(['yearly', 'monthly'] as const).map(m => (
                          <button key={m} onClick={() => setContribMode(m)}
                            style={{ padding: mobile ? '4px 10px' : '5px 14px', border: 'none', background: contribMode === m ? C.white : 'transparent', color: contribMode === m ? C.ink : C.ink3, fontFamily: INTER, fontSize: 13, fontWeight: contribMode === m ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s' }}>
                            {m === 'yearly' ? 'Yearly' : 'Monthly'}
                          </button>
                        ))}
                      </div>
                    </div>
                    {contribMode === 'yearly'
                      ? <Slider label="" id="ppf-contrib" value={annual} min={MIN_ANNUAL} max={MAX_ANNUAL} step={500} fmt={v => fmtC(v)}
                          onChange={v => updateSettings({ annual: v, monthly: Math.round(v / 12) })} compact={mobile} />
                      : <Slider label="" id="ppf-contrib" value={monthly} min={MIN_MONTHLY} max={MAX_MONTHLY} step={500} fmt={v => `${fmtC(v)}/mo`}
                          onChange={v => updateSettings({ monthly: v, annual: v * 12 })} compact={mobile} />}
                  </div>

                  <Slider label="PPF Interest Rate (p.a.)" id="ppf-rate" value={rate} min={MIN_RATE} max={MAX_RATE} step={0.1}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: mobile ? 10 : 16 }}>
                      <label htmlFor="ppf-years-range" style={{ fontSize: mobile ? 14 : 15, color: C.ink2, fontWeight: 400 }}>Investment Period</label>
                    </div>
                    <Slider label="" id="ppf-years" value={years} min={MIN_YEARS} max={MAX_YEARS} step={1} fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                      {YEAR_PRESETS.map(y => (
                        <button key={y} onClick={() => setYears(y)}
                          aria-label={`Set tenure to ${y} years`}
                          style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                            color: years === y ? C.ink : C.ink3,
                            border: `${years === y ? 1.5 : 1}px solid ${years === y ? C.ink : C.border}`,
                            fontWeight: years === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                            fontFamily: INTER, transition: 'all 0.15s' }}>
                          {y}Y
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
                    { label: 'Total invested', value: fmtC(invested) },
                    { label: 'Total interest earned', value: fmtC(returns) },
                    { label: 'Total value', value: fmtC(maturity) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  {/* Donut */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={returns} />
                  </div>

                  {/* Legend */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Total invested</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Interest earned</span>
                    </div>
                  </div>

                  {/* Split bar */}
                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {invPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Interest {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${invPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise growth schedule toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowAmort(v => !v)} aria-expanded={showAmort} aria-controls="ppf-growth-schedule"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Year-wise PPF Balance</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {years} Yr
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showAmort ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showAmort && (
                  <div id="ppf-growth-schedule" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '10px 24px' }}>
                        Year-by-year opening balance, deposit, interest earned, and closing balance at {rate.toFixed(1)}% p.a.
                      </caption>
                      <thead>
                        <tr style={{ background: '#f4f5f6' }}>
                          {['Year', 'Opening Balance', 'Deposited', 'Interest Earned', 'Closing Balance'].map(h => (
                            <th key={h} scope="col" style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {growthRows.map((row, i) => (
                          <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.opening)}</td>
                            <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.deposited)}</td>
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

                return (
                  <>
                    {/* 1: What is PPF */}
                    <div id="what-is-ppf" style={sec}>
                      <h2 style={h2}>What Is PPF?</h2>
                      <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                        <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                          Public Provident Fund (PPF) is a long-term savings scheme run by the Government of India under the PPF Act. It pays a sovereign-guaranteed interest rate and gives full tax exemption on the deposit, the interest, and the maturity amount.
                        </p>
                      </div>
                      <p style={p}>
                        The account carries a 15-year lock-in from the date it is opened, during which the balance compounds once a year. After maturity, it can be extended indefinitely in 5-year blocks.
                      </p>
                      <p style={p}>
                        Any resident Indian can open a PPF account at a post office or most nationalised and private banks, with no employer involvement required, unlike EPF.
                      </p>
                    </div>

                    {/* 2: Formula */}
                    <div id="ppf-formula" style={sec}>
                      <h2 style={h2}>PPF Maturity Formula</h2>
                      <p style={p}>PPF interest is compounded annually on a balance that includes each year&apos;s fresh deposit:</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, fontFamily: 'monospace', margin: '0 0 16px', padding: '12px 0' }}>
                        Closing balance = (Opening balance + Deposit) &times; (1 + r)
                      </p>
                      <p style={p}>
                        Here r is the PPF interest rate as a decimal. Running this step for every year of the tenure, starting from any existing balance, produces the maturity amount.
                      </p>
                      <h3 style={h3}>Worked example</h3>
                      <p style={p}>
                        Depositing Rs 1.5 lakh a year for 15 years at 7.1%, with no opening balance, matures to approximately {fmtIN(Math.round(calcPPF(0, 150000, 7.1, 15)))}. Total deposits are Rs 22.5 lakh, so interest earned is close to {fmtIN(Math.round(calcPPF(0, 150000, 7.1, 15)) - 2250000)}, all of it tax-free. Enter these numbers above, or use the presets, to verify.
                      </p>
                    </div>

                    {/* 3: Interest rate */}
                    <div id="ppf-interest-rate" style={sec}>
                      <h2 style={h2}>Current PPF Interest Rate</h2>
                      <p style={p}>
                        The PPF rate is 7.1% per annum, compounded annually, and has held there since April 2020. The Ministry of Finance reviews small savings scheme rates every quarter and can revise this figure, so confirm the current rate before relying on the calculator&apos;s output for a real decision.
                      </p>
                      <p style={p}>
                        The rate is set centrally and applies identically at every post office and every bank offering PPF; no institution can offer a higher or lower rate on its own.
                      </p>
                    </div>

                    {/* 4: Contribution rules */}
                    <div id="contribution-rules" style={sec}>
                      <h2 style={h2}>PPF Contribution Rules</h2>
                      <p style={p}>
                        The minimum deposit is Rs 500 and the maximum is Rs 1.5 lakh per financial year, in a lump sum or up to 12 instalments. Amounts above Rs 1.5 lakh earn no interest and get no Section 80C benefit on the excess.
                      </p>
                      <p style={p}>
                        An individual can hold only one PPF account. A parent or guardian can separately open one for a minor child, but the combined deposit across both accounts still cannot cross Rs 1.5 lakh a year.
                      </p>
                    </div>

                    {/* 5: Tax benefits */}
                    <div id="tax-benefits" style={sec}>
                      <h2 style={h2}>PPF Tax Benefits</h2>
                      <p style={p}>
                        PPF follows the EEE, Exempt-Exempt-Exempt, structure. The deposit up to Rs 1.5 lakh is deductible under Section 80C, the interest credited each year is tax-free, and the maturity amount is tax-free too.
                      </p>
                      <p style={p}>
                        Compare the 80C benefit against your other deductions on the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link> before deciding how much of the Rs 1.5 lakh limit to route into PPF.
                      </p>
                    </div>

                    {/* 6: Withdrawal rules */}
                    <div id="withdrawal-rules" style={sec}>
                      <h2 style={h2}>PPF Withdrawal Rules</h2>
                      <p style={p}>
                        Full withdrawal is only available at the 15-year maturity. Partial withdrawal opens up from the 7th financial year, capped at the lower of two limits tied to your balance in earlier years.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Partial withdrawal limit by year, once eligible from year 7 onward.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Withdrawal allowed from</th>
                              <th style={thS} scope="col">Maximum amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>7th financial year onward</td>
                              <td style={tdL}>Lower of 50% of balance at end of 4th preceding year, or 50% of balance at end of immediately preceding year</td>
                            </tr>
                            <tr>
                              <td style={tdL}>One withdrawal per financial year</td>
                              <td style={tdL}>No cap on frequency beyond one withdrawal; amount capped as above</td>
                            </tr>
                            <tr>
                              <td style={tdL}>At 15-year maturity</td>
                              <td style={tdL}>Full balance, tax-free</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 7: Loan */}
                    <div id="ppf-loan" style={sec}>
                      <h2 style={h2}>Loan Against PPF</h2>
                      <p style={p}>
                        A loan against PPF is available between the 3rd and 6th financial year from account opening, capped at 25% of the balance at the end of the 2nd preceding year.
                      </p>
                      <p style={p}>
                        The loan carries an interest rate 1% above the prevailing PPF rate, and a fresh loan cannot be taken while an earlier one is outstanding.
                      </p>
                    </div>

                    {/* 8: Extension */}
                    <div id="ppf-extension" style={sec}>
                      <h2 style={h2}>Extending PPF After Maturity</h2>
                      <p style={p}>
                        After 15 years, the account can be extended in blocks of 5 years, with or without further deposits. Extending with deposits requires filing Form H within a year of maturity, and continues to qualify for Section 80C.
                      </p>
                      <p style={p}>
                        Extending without deposits lets the balance keep compounding at the prevailing rate while allowing one withdrawal a year. Set the tenure above to 20, 25, or 30 years to see either extension modelled.
                      </p>
                    </div>

                    {/* 9: Where to open */}
                    <div id="where-to-open" style={sec}>
                      <h2 style={h2}>Where to Open a PPF Account</h2>
                      <p style={p}>
                        PPF is available at any post office and most nationalised and private banks. The rate, deposit limits, and withdrawal rules are identical everywhere since PPF is a central government scheme, not a bank-specific product.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>Common places to open a PPF account. All carry the same government-set rate.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Provider</th>
                              <th style={thS} scope="col">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: 'India Post Office', type: 'Government postal network' },
                              { name: 'State Bank of India (SBI)', type: 'Public sector bank' },
                              { name: 'HDFC Bank', type: 'Private bank' },
                              { name: 'ICICI Bank', type: 'Private bank' },
                              { name: 'Punjab National Bank (PNB)', type: 'Public sector bank' },
                              { name: 'Bank of Baroda', type: 'Public sector bank' },
                              { name: 'Union Bank of India', type: 'Public sector bank' },
                              { name: 'Bank of India', type: 'Public sector bank' },
                              { name: 'Canara Bank', type: 'Public sector bank' },
                              { name: 'Indian Bank', type: 'Public sector bank' },
                            ].map(row => (
                              <tr key={row.name}>
                                <td style={tdL}>{row.name}</td>
                                <td style={tdL}>{row.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 10: PPF vs EPF vs VPF */}
                    <div id="ppf-vs-epf-vpf" style={sec}>
                      <h2 style={h2}>PPF vs EPF vs VPF</h2>
                      <p style={p}>
                        These three are often confused because all three are government-linked, tax-advantaged savings instruments, but they serve different people.
                      </p>
                      <p style={p}>
                        EPF is mandatory for salaried employees, with both employee and employer contributing, currently earning 8.25%. VPF is a voluntary top-up on top of the mandatory EPF contribution, earning the same rate. PPF is entirely separate and voluntary, open to anyone including the self-employed, at its own 7.1% rate.
                      </p>
                      <p style={p}>
                        For an EPF balance projection, use the <Link href="/calculators/epf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPF Calculator</Link>. To model topping up your EPF with a voluntary contribution, use the <Link href="/calculators/vpf-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>VPF Calculator</Link>.
                      </p>
                    </div>

                    {/* In-content promo bar */}
                    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 40, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>NPS Calculator</p>
                        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>See the market-linked side of retirement planning alongside PPF&apos;s fixed, guaranteed return.</p>
                      </div>
                      <Link className="fx-btn" href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer"
                        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                    </div>

                    {/* 11: PPF vs NPS */}
                    <div id="ppf-vs-nps" style={sec}>
                      <h2 style={h2}>PPF vs NPS for Retirement</h2>
                      <p style={p}>
                        PPF gives a fixed, government-guaranteed return with no restriction on how the maturity amount is used. NPS invests in market-linked equity and debt with historically higher long-term growth potential, but at maturity, 40% of the corpus must go into an annuity, and that annuity income is taxable.
                      </p>
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginBottom: 8 }}>
                          <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: '8px 0 0' }}>PPF and NPS compared on the factors that matter most for retirement planning.</caption>
                          <thead>
                            <tr>
                              <th style={thS} scope="col">Factor</th>
                              <th style={thS} scope="col">PPF</th>
                              <th style={thS} scope="col">NPS</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={tdL}>Returns</td>
                              <td style={tdL}>Fixed, government-set (7.1%)</td>
                              <td style={tdL}>Market-linked, not guaranteed</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Lock-in</td>
                              <td style={tdL}>15 years, extendable</td>
                              <td style={tdL}>Until age 60, with limited exit options</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Maturity access</td>
                              <td style={tdL}>Full amount, tax-free</td>
                              <td style={tdL}>60% lump sum, 40% mandatory annuity</td>
                            </tr>
                            <tr>
                              <td style={tdL}>Extra tax deduction</td>
                              <td style={tdL}>Within Section 80C limit</td>
                              <td style={tdL}>Additional Rs 50,000 under 80CCD(1B)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p style={p}>
                        Many investors use both: PPF as the safe, tax-free core of a retirement portfolio, and NPS for equity exposure plus the extra 80CCD(1B) deduction. Compare a full projection on the <Link href="/calculators/nps-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Calculator</Link>.
                      </p>
                    </div>

                    {/* 12: One-time investment */}
                    <div id="one-time-investment" style={sec}>
                      <h2 style={h2}>Modelling a One-Time PPF Investment</h2>
                      <p style={p}>
                        A pure one-time investment, deposit once and let it compound with no further contributions, is modelled by setting Investment to zero and entering your deposit under Existing PPF Balance instead.
                      </p>
                      <p style={p}>
                        The calculator then compounds that single amount for the full tenure, matching how a real PPF account behaves if you stop making fresh deposits after the first year.
                      </p>
                    </div>

                    {/* 13: How to use */}
                    <div id="how-to-use" style={sec}>
                      <h2 style={h2}>How to Use This PPF Calculator</h2>
                      <p style={p}>The calculator takes four inputs:</p>
                      <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {[
                          { label: 'Existing PPF Balance', text: 'enter your current balance if you already have an account, or leave it at zero for a fresh account.' },
                          { label: 'Investment', text: 'enter your deposit, toggling between yearly and monthly, up to the Rs 1.5 lakh annual limit.' },
                          { label: 'PPF Interest Rate', text: 'the current 7.1% rate is pre-filled; adjust it only to model a different rate scenario.' },
                          { label: 'Investment Period', text: 'set the tenure in years, minimum 15, or pick a preset to model an extension.' },
                        ].map((it, i) => (
                          <li key={i} style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                            <strong style={{ color: C.ink }}>{it.label}:</strong> {it.text}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* 14: Limitations */}
                    <div id="limitations" style={sec}>
                      <h2 style={h2}>Limitations of This PPF Calculator</h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                          { t: 'Assumes deposits are made at the start of each year.', d: 'A real PPF account earns interest on the minimum monthly balance, so depositing after the 5th of a month delays that month\'s interest. Deposit before the 5th of April each year to match this calculator most closely.' },
                          { t: 'Assumes a constant rate for the full tenure.', d: 'The government can revise the PPF rate every quarter. This calculator holds the rate you enter fixed for the whole period, so treat long tenures as an estimate, not a guarantee.' },
                          { t: 'Does not model partial withdrawals.', d: 'Any withdrawal taken during the tenure reduces the compounding base going forward. This tool shows uninterrupted growth only.' },
                        ].map((it, i) => (
                          <div key={i}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, margin: '0 0 4px' }}>{it.t}</p>
                            <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.7, margin: 0 }}>{it.d}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    

                    {/* 15: FAQ */}
                    <div id="faq" style={sec}>
                      <h2 style={h2}>Frequently Asked Questions</h2>
                      <FAQ />
                    </div>

                    {/* Secondary plain-text CA mention, separate from the colored CTA boxes above */}

                    {/* 16: Disclaimer */}
                    <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                        <strong>Disclaimer:</strong> All calculations on this page are indicative only, based on the existing balance, contribution, rate, and tenure you enter. Actual PPF returns depend on the government-notified rate for each quarter and the exact timing of your deposits. This tool is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a chartered accountant before making investment decisions.
                      </p>
                    </div>
                  </>
                );
              })()}
            </article>

          </div>

          {/* SIDEBAR */}
          <aside
            className="ppf-sidebar"
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
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/income-tax-calculator|Income Tax', '/calculators/capital-gains-calculator|Capital Gains', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/ssy-calculator|SSY', '/calculators/nps-calculator|NPS', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/nps-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

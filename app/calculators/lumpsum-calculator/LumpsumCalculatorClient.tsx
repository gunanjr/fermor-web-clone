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
import { faqItems } from './faqData';
import { FAQBox } from '@/components/common/FAQBox';

/* ─── Palette ────────────────────────────────────────────────── */
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

type Mode = 'lumpsum' | 'combined';

/* ─── Math ──────────────────────────────────────────────────── */
function calcLumpsum(principal: number, annualRate: number, years: number): number {
  if (annualRate === 0) return principal;
  return principal * Math.pow(1 + annualRate / 100, years);
}

function calcSIP(monthly: number, annualRate: number, months: number): number {
  if (months === 0) return 0;
  if (annualRate === 0) return monthly * months;
  const i = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
}

interface GrowthRow {
  year: number;
  invested: number;
  wealthGained: number;
  totalValue: number;
}

function buildLumpsumGrowth(principal: number, annualRate: number, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= years; y++) {
    const val = annualRate === 0 ? principal : principal * Math.pow(1 + annualRate / 100, y);
    rows.push({ year: startYear + y - 1, invested: principal, wealthGained: val - principal, totalValue: val });
  }
  return rows;
}

function buildCombinedGrowth(principal: number, sipAmount: number, annualRate: number, years: number): GrowthRow[] {
  const rows: GrowthRow[] = [];
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= years; y++) {
    const lumpsumVal = calcLumpsum(principal, annualRate, y);
    const sipVal = calcSIP(sipAmount, annualRate, y * 12);
    const invested = principal + sipAmount * y * 12;
    const total = lumpsumVal + sipVal;
    rows.push({ year: startYear + y - 1, invested, wealthGained: total - invested, totalValue: total });
  }
  return rows;
}

/* ─── Table style constants ────────────────────────────────── */
const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const, verticalAlign: 'middle' as const };
const tdL: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'left' };
const tdR: React.CSSProperties = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}`, verticalAlign: 'middle', textAlign: 'right' };
const tdC: React.CSSProperties = { ...tdL, textAlign: 'center' };

/* ─── Donut - two-tone ring with center label ───────────────── */
function DonutChart({ invested, returns: ret }: { invested: number; returns: number }) {
  const total = invested + ret;
  if (total === 0) return null;
  const R = 82, sw = 22, cx = 108, cy = 108;
  const circ = 2 * Math.PI * R;
  const pArc  = (invested / total) * circ;
  const pPct  = Math.round((invested / total) * 100);
  return (
    <svg width="216" height="216" viewBox="0 0 216 216" style={{ display: 'block' }} role="img" aria-label={`Invested amount is ${pPct}% of the maturity value, returns are ${100 - pPct}%`}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 16 }}>
        <label htmlFor={editing ? inputId : rangeId} style={{ fontSize: compact ? 14 : 15, color: C.ink2, fontWeight: 400 }}>{label}</label>
        {editing ? (
          <input id={inputId} autoFocus value={raw} onChange={e => setRaw(e.target.value)}
            aria-label={`Enter ${label} value`}
            onBlur={commit} onKeyDown={e => e.key === 'Enter' && commit()}
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

/* ─── Year presets ──────────────────────────────────────────── */
function YearPresets({ current, onChange }: { current: number; onChange: (v: number) => void }) {
  const opts = [1, 3, 5, 10, 15, 20, 30];
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }} role="group" aria-label="Investment period presets">
      {opts.map(y => (
        <button key={y} onClick={() => onChange(y)}
          aria-pressed={current === y}
          style={{ padding: '4px 10px', fontSize: 12, background: C.white,
            color: current === y ? C.ink : C.ink3,
            border: `${current === y ? 1.5 : 1}px solid ${current === y ? C.ink : C.border}`,
            fontWeight: current === y ? 700 : 500, borderRadius: 6, cursor: 'pointer',
            fontFamily: INTER, transition: 'all 0.15s' }}>
          {y}Y
        </button>
      ))}
    </div>
  );
}

/* ─── Sidebar list ──────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
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
    </nav>
  );
}

const POPULAR = [
  { href: '/calculators/sip-calculator',          label: 'SIP Calculator' },
  { href: '/calculators/sip-vs-lumpsum-calculator', label: 'SIP vs Lumpsum Calculator' },
  { href: '/calculators/xirr-calculator',         label: 'XIRR Calculator' },
  { href: '/calculators/swp-calculator',          label: 'SWP Calculator' },
  { href: '/calculators/cagr-calculator',         label: 'CAGR Calculator' },
  { href: '/calculators/elss-calculator',         label: 'ELSS Calculator' },
  { href: '/calculators/fd-calculator',           label: 'FD Calculator' },
];
const MORE = [
  { href: '/calculators/wealth-growth-calculator', label: 'Wealth Growth Calculator' },
  { href: '/calculators/ppf-calculator',          label: 'PPF Calculator' },
  { href: '/calculators/rule-of-72-calculator',   label: 'Rule of 72 Calculator' },
  { href: '/calculators/step-up-sip-calculator',  label: 'Step-up SIP Calculator' },
  { href: '/calculators/index-fund-return-calculator', label: 'Index Fund Return Calculator' },
];

/* ─── FAQ (single source of truth: faqItems imported from page.tsx) ── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── In-content promo bar ──────────────────────────────────── */
function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

/* ─── CA CTA (standard component, used twice per CLAUDE.md rule 23) ── */

interface CalcSettings {
  mode: Mode;
  principal: number;
  sipAmount: number;
  rate: number;
  years: number;
}

export default function LumpsumCalculatorClient() {
  const defaultSettings: CalcSettings = { mode: 'lumpsum', principal: 500000, sipAmount: 10000, rate: 12, years: 10 };
  const { settings, updateSettings } = useCalculatorSettings<CalcSettings>('lumpsum-calculator', defaultSettings);
  const { mode, principal, sipAmount, rate, years } = settings;

  const setMode      = (v: Mode) => updateSettings({ mode: v });
  const setPrincipal = (v: number) => updateSettings({ principal: v });
  const setSipAmount = (v: number) => updateSettings({ sipAmount: v });
  const setRate      = (v: number) => updateSettings({ rate: v });
  const setYears     = (v: number) => updateSettings({ years: v });

  const [mobile, setMobile] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { invested, maturity, returns: est } = useMemo(() => {
    if (mode === 'lumpsum') {
      const m = calcLumpsum(principal, rate, years);
      return { invested: principal, maturity: m, returns: m - principal };
    }
    const lumpsumVal = calcLumpsum(principal, rate, years);
    const sipVal = calcSIP(sipAmount, rate, years * 12);
    const inv = principal + sipAmount * years * 12;
    const total = lumpsumVal + sipVal;
    return { invested: inv, maturity: total, returns: total - inv };
  }, [mode, principal, sipAmount, rate, years]);

  const pPct = maturity > 0 ? Math.round((invested / maturity) * 100) : 0;
  const returnsPct = 100 - pPct;

  const growthRows = useMemo(
    () => mode === 'lumpsum' ? buildLumpsumGrowth(principal, rate, years) : buildCombinedGrowth(principal, sipAmount, rate, years),
    [mode, principal, sipAmount, rate, years]
  );

  const h2  = { fontSize: mobile ? 18 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const h3  = { fontSize: 16, fontWeight: 600, color: C.ink, margin: '0 0 6px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 40px' } as React.CSSProperties;
  const bullet = { display: 'flex', gap: 10, marginBottom: 10, fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const linkStyle = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const defBlock = { borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Lumpsum Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>Calculate mutual fund lumpsum returns, maturity amount, and year-wise corpus growth. Model a SIP and lumpsum together in one projection.</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="Lumpsum Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>

              {/* Tabs */}
              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                {([
                  { id: 'lumpsum',  label: 'Lumpsum' },
                  { id: 'combined', label: 'SIP + Lumpsum' },
                ] as { id: Mode; label: string }[]).map(tab => (
                  <button key={tab.id} id={`tab-${tab.id}`} role="tab" aria-selected={mode === tab.id} aria-controls={`panel-${tab.id}`}
                    onClick={() => { setMode(tab.id); setShowTable(false); }}
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

                {/* Input panel */}
                <div role="tabpanel" id={`panel-${mode}`} aria-labelledby={`tab-${mode}`} style={{ padding: mobile ? '16px 18px' : '44px 48px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile ? (
                      <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Investment Details</p>
                    ) : <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <Slider label="Lumpsum Investment Amount" id="lumpsum-principal" value={principal} min={5000} max={50000000} step={5000}
                    fmt={v => fmtC(v)} onChange={setPrincipal} compact={mobile} />

                  {mode === 'combined' && (
                    <Slider label="Monthly SIP Amount" id="lumpsum-sip" value={sipAmount} min={500} max={500000} step={500}
                      fmt={v => fmtC(v)} onChange={setSipAmount} compact={mobile} />
                  )}

                  <Slider label="Expected Return Rate (p.a.)" id="lumpsum-rate" value={rate} min={1} max={40} step={0.5}
                    fmt={v => `${v.toFixed(1)}%`} onChange={setRate} compact={mobile} />
                  <Slider label="Investment Period" id="lumpsum-years" value={years} min={1} max={40} step={1}
                    fmt={v => `${v} Yr`} onChange={setYears} compact={mobile} />
                  <YearPresets current={years} onChange={setYears} />

                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, color: C.ink, fontWeight: 700 }}>
                      {mode === 'lumpsum' ? 'Formula: A = P × (1 + r)^t' : 'Lumpsum A = P × (1 + r)^t, SIP compounded monthly'}
                      <span style={{ color: C.ink2, fontWeight: 400, marginLeft: 6 }}>annual compounding</span>
                    </div>
                  </div>
                </div>

                {/* Results panel */}
                <div style={{ padding: mobile ? '16px 18px' : '44px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: mobile ? '12px 16px' : '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: '#50565C' }}>Maturity Amount</span>
                    <span style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}
                      aria-live="polite" aria-label={`Maturity amount: ${fmtIN(maturity)}`}>{fmtIN(maturity)}</span>
                  </div>

                  {[
                    { label: mode === 'lumpsum' ? 'Invested amount' : 'Total invested', value: fmtC(invested) },
                    { label: 'Est. returns',    value: fmtC(est) },
                    { label: 'Total value',     value: fmtC(maturity) },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '15px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 24, order: mobile ? 1 : -1 }}>
                    <DonutChart invested={invested} returns={est} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 22, marginBottom: mobile ? 8 : 28, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>{mode === 'lumpsum' ? 'Invested amount' : 'Total invested'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Est. returns</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Invested {pPct}%</span>
                      <span style={{ fontSize: 12, color: C.ink3 }}>Returns {returnsPct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Invested is ${pPct}% of maturity value`}>
                      <div style={{ height: '100%', width: `${pPct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>

                </div>
              </div>

              {/* Year-wise growth schedule toggle */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowTable(v => !v)}
                  aria-expanded={showTable} aria-controls="growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '16px 20px' : '20px 48px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 14 : 15, fontWeight: 700, color: C.ink }}>Your Growth Schedule</span>
                    {!mobile && <span style={{ fontSize: 13, color: C.ink3, marginLeft: 10 }}>(Yearly breakdown)</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 8 : 12, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {years} Yr
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                      style={{ transform: showTable ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showTable && (
                  <div id="growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
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
                      <table style={{ minWidth: 400, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 24px' }}>
                          Year-wise {mode === 'lumpsum' ? 'lumpsum' : 'SIP + lumpsum'} growth at {rate.toFixed(1)}% p.a., annual compounding.
                        </caption>
                        <thead>
                          <tr style={{ background: '#f4f5f6' }}>
                            {['Year', mode === 'lumpsum' ? 'Principal' : 'Total Invested', 'Returns', 'Total Value'].map(h => (
                              <th key={h} style={{ padding: '12px 24px', textAlign: 'left', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {growthRows.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '13px 24px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.invested)}</td>
                              <td style={{ padding: '13px 24px', color: '#166534', fontWeight: 600 }}>{fmtIN(row.wealthGained)}</td>
                              <td style={{ padding: '13px 24px', color: C.ink2 }}>{fmtIN(row.totalValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SAVE RESULTS */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ARTICLE */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              {/* 1 */}
              <div style={sec}>
                <h2 style={h2} id="what-is-lumpsum">What Is a Lumpsum Investment?</h2>
                <div style={defBlock}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    A lumpsum investment is a single, one-time payment into a mutual fund scheme, as opposed to an SIP where the same total amount is spread across monthly instalments.
                  </p>
                </div>
                <p style={p}>
                  Most investors make a lumpsum investment when they receive a cash windfall: a year-end bonus, an inheritance, proceeds from a property sale, or the maturity payout of an FD or insurance policy. The full principal starts compounding on day one.
                </p>
                <p style={p}>
                  Under{' '}
                  <a href="https://www.amfiindia.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>AMFI</a>{' '}
                  guidelines issued by{' '}
                  <a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>SEBI</a>, mutual fund performance for periods over one year is reported as CAGR, the same annualised rate this calculator uses for its lumpsum projections. A Rs 10,00,000 lumpsum at 11% for 15 years grows to approximately Rs 47,84,589 on this basis.
                </p>
              </div>

              {/* 2 */}
              <div style={sec}>
                <h2 style={h2} id="lumpsum-formula">Lumpsum Calculator Formula: How Maturity Value Is Calculated</h2>
                <p style={p}>The calculator uses the standard compound interest formula with annual compounding:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>A = P × (1 + r)^t</code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Variables used in the lumpsum maturity formula.</caption>
                    <thead><tr><th style={{ ...thS, width: 90 }} scope="col">Symbol</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['A', 'Maturity value: total corpus at the end of the tenure'],
                        ['P', 'Principal: your one-time investment amount'],
                        ['r', 'Expected annual return rate, as a decimal (12% = 0.12)'],
                        ['t', 'Investment duration in years'],
                      ].map(([sym, meaning]) => (
                        <tr key={sym}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark, fontFamily: 'monospace' }}>{sym}</td>
                          <td style={tdL}>{meaning}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Worked example: Rs 5,00,000 invested for 10 years at an expected 12% annual return. A = 5,00,000 × (1.12)^10 = <strong>Rs 15,52,924</strong>. The investor put in Rs 5,00,000 and earns Rs 10,52,924 in returns, all from a single entry that compounded untouched for a decade.
                </p>
              </div>

              {/* 3 */}
              <div style={sec}>
                <h2 style={h2} id="lumpsum-formula-excel">Lumpsum Formula in Excel: Three Methods</h2>
                <p style={p}>The same maturity value can be built in a spreadsheet using any of these three formulas, all of which return an identical result for the Rs 5,00,000 example above.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Three equivalent Excel formulas for lumpsum maturity value.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Method</th>
                        <th style={thS} scope="col">Formula</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={tdL}>Direct formula</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=5000000*(1+0.12)^10</td></tr>
                      <tr><td style={tdL}>POWER function</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=500000*POWER(1.12,10)</td></tr>
                      <tr><td style={tdL}>FV function</td><td style={{ ...tdL, fontFamily: 'monospace' }}>=-FV(0.12,10,0,500000)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The FV function needs a negative sign because Excel treats the investment as a cash outflow. All three return Rs 15,52,924.
                </p>
              </div>

              {/* 4 */}
              <div style={sec}>
                <h2 style={h2} id="reverse-lumpsum">Reverse Lumpsum Calculator: How Much to Invest Today for a Target Corpus</h2>
                <p style={p}>
                  A reverse lumpsum calculation answers a different question: how much should I invest today to reach a specific goal amount? The formula rearranges the maturity equation to solve for principal:
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 700, color: C.dark }}>P = A / (1 + r)^t</code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Lumpsum required today to reach a target corpus, at the stated return rate.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Target corpus</th>
                        <th style={thS} scope="col">Duration</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Return rate</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Lumpsum needed today</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 1 crore', '10 years', '12%', 'Rs 32,19,732'],
                        ['Rs 1 crore', '15 years', '12%', 'Rs 18,26,963'],
                        ['Rs 1 crore', '20 years', '12%', 'Rs 10,36,668'],
                        ['Rs 1 crore', '25 years', '12%', 'Rs 5,88,233'],
                        ['Rs 50 lakh', '10 years', '10%', 'Rs 19,27,716'],
                        ['Rs 50 lakh', '15 years', '10%', 'Rs 11,96,960'],
                        ['Rs 25 lakh', '5 years', '8%', 'Rs 17,01,458'],
                        ['Rs 10 lakh', '3 years', '7%', 'Rs 8,16,298'],
                      ].map(row => (
                        <tr key={row[0] + row[1]}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdL}>{row[1]}</td>
                          <td style={tdR}>{row[2]}</td>
                          <td style={tdR}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  A shorter horizon or a lower expected return both push the required lumpsum up, since there is less time for compounding to do the work. To sanity-check how long any amount takes to double at a given rate, the{' '}
                  <Link href="/calculators/rule-of-72-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Rule of 72 Calculator</Link> gives a quick mental-math estimate.
                </p>
              </div>

              {/* 5 */}
              <div style={sec}>
                <h2 style={h2} id="types-of-returns">Types of Mutual Fund Returns: Absolute, Annualised, Trailing and Rolling</h2>
                <p style={p}>
                  Mutual fund fact sheets quote returns in several different formats, and confusing one for another is the most common mistake investors make when comparing funds.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Return types used to report mutual fund and lumpsum performance in India.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Return type</th>
                        <th style={thS} scope="col">What it measures</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Absolute return', 'Total percentage gain over the full holding period, with no adjustment for time. (Current value − investment) / investment × 100.'],
                        ['Total return', 'Absolute return that also includes dividends or IDCW payouts reinvested along the way.'],
                        ['Annualised return (CAGR)', 'The single yearly rate that would produce the same growth. (End value / start value)^(1/years) − 1.'],
                        ['Point-to-point return', 'Return measured between two fixed calendar dates, useful for comparing a specific past window.'],
                        ['Trailing return', 'Return measured backward from today over a fixed window, such as trailing 1-year or trailing 5-year, the most commonly quoted figure on fund fact sheets.'],
                        ['Rolling return', 'The average of returns calculated across many overlapping periods through history, which smooths out the bias of picking one lucky or unlucky start date.'],
                      ].map(([type, desc]) => (
                        <tr key={type}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{type}</td>
                          <td style={tdL}>{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For a lumpsum specifically, CAGR and the annualised return are the same number, since there is only one cash flow date. SIP portfolios need XIRR instead of CAGR, because multiple instalments go in on different dates. Use the{' '}
                  <Link href="/calculators/xirr-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>XIRR Calculator</Link> for SIP or staggered investment returns.
                </p>
              </div>

              {/* Promo bar 1 */}
              <PromoBar name="SIP vs Lumpsum Calculator" desc="Compare the same total amount invested as a lumpsum against a monthly SIP, side by side." href="/calculators/sip-vs-lumpsum-calculator" />

              {/* 6 */}
              <div style={{ ...sec, marginTop: 24 }}>
                <h2 style={h2} id="sip-plus-lumpsum">SIP + Lumpsum Combined Calculator: What It Measures</h2>
                <p style={p}>
                  The SIP + Lumpsum tab above models a common real-world scenario: investing a lumpsum now while also continuing a regular monthly SIP. It adds the lumpsum maturity value to the SIP maturity value, both compounding at the same expected annual return over the same period.
                </p>
                <p style={p}>
                  For example, a Rs 3,00,000 lumpsum combined with a Rs 10,000 monthly SIP, both running at 12% for 10 years, grows to a Rs 9,31,754 lumpsum component plus a Rs 22,40,359 SIP component, for a combined maturity value of roughly Rs 31,72,113 on a total investment of Rs 15,00,000.
                </p>
                <p style={p}>
                  This combined mode is useful right after receiving a windfall: it shows what happens if you invest part of it immediately and keep your existing SIP running, rather than treating the two as separate, unrelated decisions.
                </p>
              </div>

              {/* 7 */}
              <div style={sec}>
                <h2 style={h2} id="lumpsum-vs-sip">Lumpsum vs SIP: Which Is Better?</h2>
                <p style={p}>
                  Lumpsum wins on paper when the market rises steadily from your entry date, because every rupee gets the maximum possible time to compound. SIP wins on risk management, because it spreads your entry across many market levels instead of betting on one date.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Same total investment of Rs 12,00,000 over 10 years at 12% p.a., lumpsum vs SIP.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Mode</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Total invested</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Maturity value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td style={tdL}>Lumpsum (day one)</td><td style={tdR}>Rs 12,00,000</td><td style={tdR}>Rs 37,27,018</td></tr>
                      <tr><td style={tdL}>SIP (Rs 10,000/month)</td><td style={tdR}>Rs 12,00,000</td><td style={tdR}>Rs 22,40,359</td></tr>
                    </tbody>
                  </table>
                </div>
                <h3 style={h3}>When lumpsum makes more sense</h3>
                <p style={p}>
                  Lumpsum works best after a genuine market correction, or when you have a large idle sum and a holding period of 7 years or more, since a longer runway gives the full amount more time to compound.
                </p>
                <h3 style={h3}>When SIP makes more sense</h3>
                <p style={p}>
                  SIP suits investors putting away money from monthly income, or anyone unsure whether current valuations are high. If you want to project both a lumpsum and an ongoing SIP together instead of choosing one, the{' '}
                  <Link href="/calculators/wealth-growth-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>Wealth Growth Calculator</Link> models existing wealth plus new SIP contributions in one place.
                </p>
              </div>

              {/* 8 */}
              <div style={sec}>
                <h2 style={h2} id="best-lump-sum-investment-plans">Best Lump Sum Investment Plans in India</h2>
                <p style={p}>
                  The right lump sum investment plan depends mainly on the time horizon and how much volatility you can tolerate before the money is needed.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Common lump sum investment options for Indian investors, by typical historical return range.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Option</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">Typical return</th>
                        <th style={thS} scope="col">Lock-in</th>
                        <th style={thS} scope="col">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Equity index funds (Nifty 50, Sensex)', '10-12%', 'None', 'Long-term goals, 7+ years'],
                        ['Flexicap / multicap active funds', '12-15%', 'None', 'Long-term with active risk tolerance'],
                        ['ELSS', '12-15%', '3 years', 'Section 80C tax saving plus equity exposure'],
                        ['Debt mutual funds', '6-8%', 'None', 'Goals under 3 years'],
                        ['Fixed deposits', '6.5-7.5%', 'As chosen', 'Capital safety, short-term parking'],
                        ['PPF', '7.1%', '15 years', 'Guaranteed, tax-free long-term goals'],
                        ['NPS', '9-12% (market-linked)', 'Till retirement', 'Retirement corpus with tax benefit'],
                      ].map(row => (
                        <tr key={row[0]}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                          <td style={tdL}>{row[2]}</td>
                          <td style={tdL}>{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Rates for FD, PPF and equity are historical or government-declared figures and change over time. Check current PPF rates on the{' '}
                  <Link href="/calculators/ppf-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>PPF Calculator</Link>, and if the 80C limit also matters to your decision, the{' '}
                  <Link href="/calculators/elss-calculator" target="_blank" rel="noopener noreferrer" style={linkStyle}>ELSS Calculator</Link> shows the tax-adjusted comparison.
                </p>
              </div>

              {/* 9 */}
              <div style={sec}>
                <h2 style={h2} id="return-rate">What Return Rate Should You Use for a Lumpsum Investment?</h2>
                <p style={p}>
                  Use a rate based on the asset class you are actually going to invest in, not a round number. Historical category averages, per AMFI category data and NSE India index data, give a reasonable starting point.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 11.5, color: C.ink3, padding: '8px 0 0' }}>Historical 10-year category CAGR ranges by asset class. Past performance does not guarantee future returns.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Asset class</th>
                        <th style={{ ...thS, textAlign: 'right' }} scope="col">10-year CAGR range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Nifty 50 / Sensex index funds', '10-12%'],
                        ['Large-cap active funds', '10-13%'],
                        ['Flexicap / multicap funds', '12-15%'],
                        ['Midcap funds', '13-17%'],
                        ['Smallcap funds', '14-19%'],
                        ['Hybrid / balanced advantage funds', '9-12%'],
                        ['Debt mutual funds', '6-8%'],
                        ['Bank fixed deposits', '6.5-7.5%'],
                      ].map(row => (
                        <tr key={row[0]}>
                          <td style={tdL}>{row[0]}</td>
                          <td style={tdR}>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For planning purposes, run the calculator at your assumed rate, then run it again 2 to 3 percentage points lower. The gap between the two maturity values tells you how much buffer your plan actually needs.
                </p>
              </div>

              {/* 10 */}
              <div style={sec}>
                <h2 style={h2} id="tax-on-lumpsum">Tax on Lumpsum Mutual Fund Returns in India</h2>
                <p style={p}>
                  Equity mutual fund units held under 12 months are taxed at 20% short-term capital gains (STCG). Units held 12 months or more are taxed at 12.5% long-term capital gains (LTCG), with the first Rs 1.25 lakh of gains in a financial year exempt.
                </p>
                <p style={p}>
                  Debt mutual funds bought after April 2023 are taxed differently: all gains are added to your income and taxed at your slab rate, regardless of how long you hold the units, per current{' '}
                  <a href="https://www.incometax.gov.in" target="_blank" rel="noopener noreferrer" style={linkStyle}>Income Tax Department</a> rules. ELSS funds qualify for a Section 80C deduction at the time of investment but carry a mandatory 3-year lock-in.
                </p>
              </div>

              {/* 11 */}
              <div style={sec}>
                <h2 style={h2} id="lumpsum-for-stocks">Lumpsum Calculator for Stocks and Index Funds</h2>
                <p style={p}>
                  The same formula applies to a single stock purchase, not just mutual funds. Buying Rs 2,00,000 of Reliance Industries shares and holding for 8 years at an assumed 13% CAGR would project to A = 2,00,000 × (1.13)^8, or approximately Rs 5,31,689.
                </p>
                <p style={p}>
                  For an actual stock, that projected rate should come from the stock's own historical CAGR, not a fund category average, and note that this is a price-return estimate. It excludes dividends, which the total return figure would include separately.
                </p>
              </div>

              {/* 12 */}
              <div style={sec}>
                <h2 style={h2} id="limitations">Limitations of the Lumpsum Calculator</h2>
                {[
                  ['It assumes a constant annual return.', 'Real markets do not grow in a straight line. A 12% assumption smooths over years of 30% gains and years of 15% losses into one average, which is useful for planning but not a forecast.'],
                  ['It does not account for expense ratio or exit load.', 'Actual mutual fund returns are net of a fund’s expense ratio, and an exit load applies if you redeem before the fund’s minimum holding period. Both reduce your real return slightly below the projected figure.'],
                  ['It shows nominal value, not inflation-adjusted value.', 'The maturity amount shown is what your account will show, not what that amount will be able to buy in the future. Subtract an assumed inflation rate before comparing the result against a real-world goal.'],
                  ['It does not model taxes on redemption.', 'The maturity value shown is pre-tax. Actual take-home proceeds depend on the STCG or LTCG rate applicable at the time you redeem, covered in the tax section above.'],
                ].map(([title, body]) => (
                  <p key={title} style={p}><strong style={{ color: C.ink }}>{title}</strong> {body}</p>
                ))}
              </div>

              {/* Promo bar 2 */}
              <PromoBar name="SWP Calculator" desc="Already have a lumpsum invested? Model a monthly withdrawal plan against it for retirement income." href="/calculators/swp-calculator" />

              {/* 13 */}
              <div style={{ ...sec, marginTop: 24 }}>
                <h2 style={h2} id="how-to-use">How to Use This Lumpsum Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Choose a tab:</strong> pick Lumpsum for a single one-time investment, or SIP + Lumpsum to add a monthly SIP alongside it.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Enter your investment amount:</strong> the one-time principal, and, in the combined tab, the monthly SIP amount.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Set the expected return rate and duration:</strong> use the sliders, or click a value to type it exactly. Year presets are available for quick comparison.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Review the results:</strong> the maturity amount, invested vs returns split, and the donut chart update instantly as you adjust any input.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}><strong style={{ color: C.ink }}>Open the growth schedule:</strong> expand Your Growth Schedule to see the year-by-year breakdown of principal, returns, and total value.</li>
                </ol>
              </div>

              

              {/* 14 */}
              <div style={sec}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Projected returns are based on a constant annual rate you supply and do not predict actual future performance. Past performance of any investment does not guarantee future results. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser before making investment decisions.
                </p>
              </div>

            </article>

          </div>

          {/* SIDEBAR */}
          <style>{`.lumpsum-sidebar::-webkit-scrollbar{width:5px}.lumpsum-sidebar::-webkit-scrollbar-track{background:transparent}.lumpsum-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.lumpsum-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="lumpsum-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/percentage-calculator|%', '/calculators/gst-calculator|GST', '/calculators/loan-calculator|Loan', '/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/mortgage-calculator|Mortgage', '/calculators/car-loan-calculator|Car Loan', '/calculators/fd-calculator|FD', '/calculators/compound-interest-calculator|Compound Int.', '/calculators/gratuity-calculator|Gratuity'] },
        { hd: 'Topics', links: ['/#|Mutual Funds', '/#|Home Loans', '/#|Fixed Deposits', '/#|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

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
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
import {
  computeSurcharge, slabTax, NEW_SLABS, OLD_SLABS, NEW_STD_DEDUCTION, OLD_STD_DEDUCTION,
  type Regime, type AgeGroup, type Slab,
} from './surchargeMath';
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
    <div style={{ marginBottom: compact ? 18 : 30 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: compact ? 10 : 12 }}>
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

/* ─── Donut: single track + single overlay arc ───────────────── */
function DonutChart({ baseTax, surcharge }: { baseTax: number; surcharge: number }) {
  const total = baseTax + surcharge;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const bArc = (baseTax / total) * circ;
  const sPct = Math.round((surcharge / total) * 1000) / 10;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Base tax ${(100 - sPct).toFixed(1)}% of tax before cess, surcharge ${sPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${bArc} ${circ - bArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Surcharge</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{sPct}%</text>
    </svg>
  );
}

/* ─── Stacked bar chart: base tax and surcharge as % of income ── */
function BarChart({ rows }: { rows: { label: string; basePct: number; surPct: number }[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const max = Math.max(...rows.map(r => r.basePct + r.surPct), 1);
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(8, Math.min(34, slot * 0.66));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Base tax and surcharge as a percentage of income at different income levels"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((r, i) => {
        const total = r.basePct + r.surPct;
        const totalH = (total / max) * H;
        const baseH = total > 0 ? (r.basePct / total) * totalH : 0;
        const surH = totalH - baseH;
        const x = PADL + i * slot + gap;
        return (
          <g key={r.label}>
            <rect x={x} y={H - totalH} width={barW} height={surH} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - baseH} width={barW} height={baseH} fill={CHART_PAIR.primary} rx={2} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" style={{ fontSize: 9, fill: C.ink3, fontFamily: INTER }}>{r.label}</text>
          </g>
        );
      })}
      <line x1={PADL} y1={H} x2={W} y2={H} stroke={C.border} strokeWidth={1} />
    </svg>
  );
}

const LADDER: { label: string; income: number }[] = [
  { label: '40L', income: 4000000 }, { label: '50L', income: 5000000 }, { label: '51L', income: 5100000 },
  { label: '55L', income: 5500000 }, { label: '75L', income: 7500000 }, { label: '1Cr', income: 10000000 },
  { label: '1.01Cr', income: 10100000 }, { label: '1.5Cr', income: 15000000 }, { label: '2Cr', income: 20000000 },
  { label: '2.01Cr', income: 20100000 }, { label: '3Cr', income: 30000000 }, { label: '5Cr', income: 50000000 },
  { label: '10Cr', income: 100000000 },
];

function lakhLabel(n: number): string {
  if (n === Infinity) return '';
  if (n >= 10000000) return `Rs ${(n / 10000000).toString()} crore`;
  return `Rs ${(n / 100000).toString()} lakh`;
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
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/capital-gains-calculator', label: 'Capital Gains Tax Calculator' },
  { href: '/calculators/effective-tax-rate-calculator', label: 'Effective Tax Rate Calculator' },
  { href: '/calculators/tds-calculator', label: 'TDS Calculator' },
  { href: '/calculators/hra-calculator', label: 'HRA Calculator' },
  { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator' },
];
const MORE = [
  { href: '/calculators/dividend-tax-calculator', label: 'Dividend Tax Calculator' },
  { href: '/calculators/new-tax-regime-calculator', label: 'New Tax Regime Calculator' },
  { href: '/calculators/advance-tax-calculator', label: 'Advance Tax Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/professional-tax-calculator', label: 'Professional Tax Calculator' },
];

/* ─── FAQ (items passed from page.tsx, the single source) ────── */
function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return <FAQBox items={items} />;
}

/* ─── CA CTA (exact standard component) ──────────────────────── */

/* ─── In-content promo bar ───────────────────────────────────── */
function PromoBar({ name, desc, href }: { name: string; desc: string; href: string }) {
  return (
    <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', margin: '0 0 44px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>{name}</p>
        <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>{desc}</p>
      </div>
      <Link className="fx-btn" href={href} target="_blank" rel="noopener noreferrer"
        style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
    </div>
  );
}

const defaultSettings = {
  regularIncome: 12000000,
  specialIncome: 2000000,
  specialRate: 12.5,
  deductions: 150000,
  regime: 'new',
  age: 'below60',
};

/* ─── Main ───────────────────────────────────────────────────── */
export default function SurchargeCalculatorClient({ faqItems }: { faqItems: { q: string; a: string }[] }) {
  const { settings, updateSettings } = useCalculatorSettings('surcharge-calculator', defaultSettings);
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);
  const [showLadder, setShowLadder] = useState(false);
  const [showSlabs, setShowSlabs] = useState(false);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 768);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { regularIncome, specialIncome, specialRate, deductions, regime, age } = settings;
  const setRegularIncome = (v: number) => updateSettings({ regularIncome: v });
  const setSpecialIncome = (v: number) => updateSettings({ specialIncome: v });
  const setSpecialRate   = (v: number) => updateSettings({ specialRate: v });
  const setDeductions    = (v: number) => updateSettings({ deductions: v });
  const setRegime        = (v: string) => updateSettings({ regime: v });
  const setAge           = (v: string) => updateSettings({ age: v });

  const isInr = (selectedCurrency?.code || 'INR') === 'INR';
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));
  const fmtS = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtIN = (n: number) => {
    if (!isInr) return fmtS(n);
    if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
    if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
    return `₹${Math.round(n).toLocaleString('en-IN')}`;
  };

  const isNew = regime === 'new';

  const r = useMemo(() => {
    const stdDed = isNew ? NEW_STD_DEDUCTION : OLD_STD_DEDUCTION;
    const taxableRegular = Math.max(0, regularIncome - stdDed - (isNew ? 0 : deductions));
    const res = computeSurcharge({
      taxableRegular, special: specialIncome, specialRate: specialRate / 100,
      regime: regime as Regime, age: age as AgeGroup,
    });
    return { ...res, taxableRegular };
  }, [regularIncome, specialIncome, specialRate, deductions, regime, age, isNew]);

  const surchargePct = r.baseTax + r.surcharge > 0 ? Math.round((r.surcharge / (r.baseTax + r.surcharge)) * 100) : 0;
  const basePct = 100 - surchargePct;

  const ladder = useMemo(() => LADDER.map(l => {
    const x = computeSurcharge({ taxableRegular: l.income, special: 0, specialRate: specialRate / 100, regime: regime as Regime, age: age as AgeGroup });
    return { ...l, ...x, basePct: (x.baseTax / l.income) * 100, surPct: (x.surcharge / l.income) * 100 };
  }), [regime, age, specialRate]);

  const slabRows = useMemo(() => {
    const slabs: Slab[] = isNew ? NEW_SLABS : OLD_SLABS[age as AgeGroup];
    return slabs.map(sl => {
      const inSlab = Math.max(0, Math.min(r.taxableRegular, sl.max) - sl.min);
      return {
        range: sl.max === Infinity ? `Above ${lakhLabel(sl.min)}` : sl.min === 0 ? `Up to ${lakhLabel(sl.max)}` : `${lakhLabel(sl.min)} to ${lakhLabel(sl.max)}`,
        rate: sl.rate, inSlab, tax: inSlab * sl.rate,
      };
    });
  }, [r.taxableRegular, isNew, age]);
  const slabTotal = slabTax(r.taxableRegular, isNew ? NEW_SLABS : OLD_SLABS[age as AgeGroup]);

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px', scrollMarginTop: 80 } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const lnk = { color: C.dark, fontWeight: 600 } as React.CSSProperties;
  const thS = { padding: '10px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left', verticalAlign: 'middle', textTransform: 'uppercase', letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'left', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, textAlign: 'right', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const tdC = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'center', verticalAlign: 'middle', border: `1px solid ${C.border}` } as React.CSSProperties;
  const thR = { ...thS, textAlign: 'right' } as React.CSSProperties;
  const thC = { ...thS, textAlign: 'center' } as React.CSSProperties;
  const tableBox = { overflowX: 'auto', maxWidth: '100%', marginBottom: 12 } as React.CSSProperties;
  const tbl = { width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 } as React.CSSProperties;
  const pre = { fontFamily: 'monospace', fontSize: 13, background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 16px', margin: '0 0 16px', overflowX: 'auto', lineHeight: 1.8, color: C.ink } as React.CSSProperties;
  const li = { fontSize: 15, color: C.ink2, lineHeight: 1.75 } as React.CSSProperties;
  const green = '#166534';

  const toggleBtn = (active: boolean): React.CSSProperties => ({
    flex: 1, padding: '9px 8px', border: 'none', background: active ? C.white : 'transparent',
    color: active ? C.ink : C.ink3, fontWeight: active ? 600 : 400, cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s',
  });

  const bandLabel = r.regRate === 0 ? 'Nil' : `${(r.regRate * 100).toFixed(0)}%`;
  const headroom = r.nextThreshold > 0 ? r.nextThreshold - r.totalIncome : 0;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Income Tax Surcharge Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your income tax surcharge and marginal relief for FY 2026-27 (AY 2027-28), under both regimes
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Income Tax Surcharge Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label id="regime-label" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Tax Regime</label>
                    <div role="group" aria-labelledby="regime-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['new', 'old'] as const).map(x => (
                        <button key={x} onClick={() => setRegime(x)} aria-pressed={regime === x} style={toggleBtn(regime === x)}>
                          {x === 'new' ? 'New Regime' : 'Old Regime'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider id="sur-regular" label="Annual Regular Income" value={regularIncome} min={2500000} max={100000000} step={100000} fmt={fmtIN} onChange={setRegularIncome} compact={mobile} />
                  <Slider id="sur-special" label="Capital Gains & Dividend Income" value={specialIncome} min={0} max={50000000} step={50000} fmt={fmtIN} onChange={setSpecialIncome} compact={mobile} />
                  <Slider id="sur-rate" label="Tax Rate on Capital Gains & Dividends" value={specialRate} min={10} max={30} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setSpecialRate} compact={mobile} />

                  {!isNew && (
                    <>
                      <Slider id="sur-ded" label="Total Deductions (80C, HRA, etc.)" value={deductions} min={0} max={5000000} step={10000} fmt={fmtIN} onChange={setDeductions} compact={mobile} />
                      <div style={{ marginBottom: 20 }}>
                        <label id="age-label" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Age Group</label>
                        <div role="group" aria-labelledby="age-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                          {[
                            { key: 'below60', label: 'Below 60' },
                            { key: 'senior', label: '60 to 80' },
                            { key: 'superSenior', label: 'Above 80' },
                          ].map(g => (
                            <button key={g.key} onClick={() => setAge(g.key)} aria-pressed={age === g.key} style={toggleBtn(age === g.key)}>{g.label}</button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ marginTop: 4, padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                      <span>Total taxable income</span>
                      <span>{fmtIN(r.totalIncome)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: C.ink2, marginBottom: 2 }}>
                      <span>Surcharge band on regular tax</span>
                      <span>{bandLabel}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, color: C.ink2 }}>
                      <span>{r.nextThreshold > 0 ? 'Room before the next band' : 'Next band'}</span>
                      <span>{r.nextThreshold > 0 ? fmtIN(headroom) : 'Top band reached'}</span>
                    </div>
                    <div style={{ borderTop: `1px solid ${C.border}`, marginTop: 12, paddingTop: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Surcharge bands</div>
                      {[
                        { label: 'Up to Rs 50 lakh', rate: 'Nil' },
                        { label: 'Rs 50 lakh to Rs 1 crore', rate: '10%' },
                        { label: 'Rs 1 crore to Rs 2 crore', rate: '15%' },
                        { label: 'Rs 2 crore to Rs 5 crore', rate: '25%' },
                        { label: 'Above Rs 5 crore', rate: isNew ? '25%' : '37%' },
                      ].map((b, i) => {
                        const active = i === (r.totalIncome <= 5000000 ? 0 : r.totalIncome <= 10000000 ? 1 : r.totalIncome <= 20000000 ? 2 : r.totalIncome <= 50000000 ? 3 : 4);
                        return (
                          <div key={b.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 12, padding: '4px 0', color: active ? C.ink : C.ink3, fontWeight: active ? 700 : 400 }}>
                            <span>{b.label}{active ? ' (you)' : ''}</span>
                            <span>{b.rate}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Surcharge Payable</span>
                      {r.relief > 0 && <span style={{ fontSize: 11, color: '#101214' }}>After marginal relief</span>}
                    </div>
                    <span aria-live="polite" aria-label={`Surcharge payable: ${fmtC(r.surcharge)}`}
                      style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {fmtC(r.surcharge)}
                    </span>
                  </div>

                  {[
                    { label: 'Base tax before surcharge', value: fmtS(r.baseTax) },
                    { label: 'Surcharge rate (regular income)', value: `${(r.regRate * 100).toFixed(0)}%` },
                    { label: 'Surcharge rate (gains & dividends)', value: `${(r.specRate * 100).toFixed(0)}%` },
                    { label: 'Surcharge before relief', value: fmtS(r.rawSurcharge) },
                    { label: 'Marginal relief', value: fmtS(r.relief) },
                    { label: 'Health & education cess (4%)', value: fmtS(r.cess) },
                    { label: 'Total tax', value: fmtS(r.totalTax) },
                    { label: 'Effective tax rate', value: `${r.effectiveRate.toFixed(2)}%` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart baseTax={r.baseTax} surcharge={r.surcharge} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 16, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Base tax {basePct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Surcharge {surchargePct}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Base tax {basePct}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Surcharge {surchargePct}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: CHART_PAIR.secondary, overflow: 'hidden' }} role="img" aria-label={`Base tax is ${basePct}% of tax before cess`}>
                      <div style={{ height: '100%', width: `${basePct}%`, background: CHART_PAIR.primary, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Surcharge at Different Incomes: collapsible */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowLadder(v => !v)} aria-expanded={showLadder} aria-controls="sur-ladder"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Surcharge at Different Incomes</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Tax and surcharge from Rs 40 lakh to Rs 10 crore</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {ladder.length} income levels
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showLadder ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                {showLadder && (
                  <div id="sur-ladder" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Base tax % of income</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Surcharge % of income</span>
                        </div>
                      </div>
                      <BarChart rows={ladder.map(l => ({ label: l.label, basePct: l.basePct, surPct: l.surPct }))} />
                    </div>
                    {mobile && (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 0 4px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: 'swipeHint 1.6s ease-in-out infinite' }}>
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <p style={{ fontSize: 11.5, color: C.ink3, margin: 0, fontFamily: INTER }}>Swipe to see all columns</p>
                      </div>
                    )}
                    <style>{`@keyframes swipeHint { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }`}</style>
                    <div style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 700, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>
                          Regular taxable income only, under the selected regime. Total tax includes 4% cess.
                        </caption>
                        <thead>
                          <tr>
                            <th style={thS} scope="col">Taxable income</th>
                            <th style={thR} scope="col">Base tax</th>
                            <th style={thR} scope="col">Surcharge before relief</th>
                            <th style={thR} scope="col">Marginal relief</th>
                            <th style={thR} scope="col">Surcharge payable</th>
                            <th style={thR} scope="col">Total tax</th>
                            <th style={thR} scope="col">Effective rate</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ladder.map((l, i) => (
                            <tr key={l.label} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>{fmtIN(l.income)}</td>
                              <td style={tdR}>{fmtS(l.baseTax)}</td>
                              <td style={tdR}>{fmtS(l.rawSurcharge)}</td>
                              <td style={{ ...tdR, color: l.relief > 0 ? '#166534' : C.ink3 }}>{fmtS(l.relief)}</td>
                              <td style={{ ...tdR, color: '#B45309' }}>{fmtS(l.surcharge)}</td>
                              <td style={{ ...tdR, fontWeight: 700 }}>{fmtS(l.totalTax)}</td>
                              <td style={tdR}>{l.effectiveRate.toFixed(2)}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Slab-wise Tax Breakdown: collapsible */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSlabs(v => !v)} aria-expanded={showSlabs} aria-controls="sur-slabs"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Slab-wise Tax Breakdown</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>How your base tax is built</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {isNew ? 'New' : 'Old'} regime
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showSlabs ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                {showSlabs && (
                  <div id="sur-slabs" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ overflowX: 'auto', maxWidth: '100%', WebkitOverflowScrolling: 'touch' as React.CSSProperties['WebkitOverflowScrolling'] }}>
                      <table style={{ minWidth: 480, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                        <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 14px', textAlign: 'left' }}>
                          Slab tax on your taxable regular income of {fmtIN(r.taxableRegular)}, before the Section 87A rebate and surcharge.
                        </caption>
                        <thead>
                          <tr>
                            <th style={thS} scope="col">Slab</th>
                            <th style={thR} scope="col">Rate</th>
                            <th style={thR} scope="col">Income in slab</th>
                            <th style={thR} scope="col">Tax</th>
                          </tr>
                        </thead>
                        <tbody>
                          {slabRows.map((sl, i) => (
                            <tr key={sl.range} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{sl.range}</td>
                              <td style={tdR}>{(sl.rate * 100).toFixed(0)}%</td>
                              <td style={tdR}>{fmtS(sl.inSlab)}</td>
                              <td style={{ ...tdR, fontWeight: sl.tax > 0 ? 700 : 500 }}>{fmtS(sl.tax)}</td>
                            </tr>
                          ))}
                          <tr style={{ background: '#f4f5f6' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.ink }} colSpan={3}>Slab tax on regular income</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{fmtS(slabTotal)}</td>
                          </tr>
                          <tr>
                            <td style={tdL} colSpan={3}>Tax after Section 87A rebate</td>
                            <td style={tdR}>{fmtS(r.regularTaxAmt)}</td>
                          </tr>
                          <tr>
                            <td style={tdL} colSpan={3}>Tax on gains and dividends at {specialRate.toFixed(1)}%</td>
                            <td style={tdR}>{fmtS(r.specialTaxAmt)}</td>
                          </tr>
                          <tr style={{ background: '#f4f5f6' }}>
                            <td style={{ ...tdL, fontWeight: 700, color: C.ink }} colSpan={3}>Base tax before surcharge</td>
                            <td style={{ ...tdR, fontWeight: 700 }}>{fmtS(r.baseTax)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>


            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-surcharge">What Is Income Tax Surcharge?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Income tax surcharge is an extra levy on the tax you owe, charged only when total income crosses Rs 50 lakh. It is a percentage of the tax, not of the income, and rises in steps at Rs 1 crore, Rs 2 crore and Rs 5 crore. The new regime caps it at 25%, and gains and dividends at 15%.
                  </p>
                </div>
                <p style={p}>
                  Surcharge is charged after basic tax and before cess. The order is tax on slabs, surcharge on that tax, then 4% cess on both.
                </p>
                <p style={p}>
                  The Income Tax Department sets out the <a href="https://www.incometaxindia.gov.in/w/what-is-surcharge-and-how-it-is-computed-" target="_blank" rel="noopener noreferrer" style={lnk}>surcharge rules for individuals</a> on its own site.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-rates">What Are the Surcharge Rates for FY 2026-27 (AY 2027-28)?</h2>
                <p style={p}>
                  Surcharge is 10%, 15%, 25% or 37% of tax depending on total income, and the new regime caps it at 25%.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Individuals and HUFs. Income exactly on a threshold is taxed in the lower band.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Total income</th><th style={thC} scope="col">New regime</th><th style={thC} scope="col">Old regime</th><th style={thC} scope="col">Gains and dividends</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Up to Rs 50 lakh', 'Nil', 'Nil', 'Nil'],
                        ['Above Rs 50 lakh to Rs 1 crore', '10%', '10%', '10%'],
                        ['Above Rs 1 crore to Rs 2 crore', '15%', '15%', '15%'],
                        ['Above Rs 2 crore to Rs 5 crore', '25%', '25%', '15% (capped)'],
                        ['Above Rs 5 crore', '25% (capped)', '37%', '15% (capped)'],
                      ].map(([a, b, c, d]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdC}>{b}</td><td style={tdC}>{c}</td><td style={tdC}>{d}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Budget 2026 left surcharge rates and the new-regime slabs unchanged for FY 2026-27. The Income-tax Act, 2025 applies from 1 April 2026 and renumbers sections.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-surcharge-is-calculated">How Is Surcharge Calculated?</h2>
                <p style={p}>
                  Surcharge is the tax on your income multiplied by the rate for your income band, less any marginal relief.
                </p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Taxable income:</strong> subtract the standard deduction and, under the old regime, your deductions from regular income. Add capital gains and dividends.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Base tax:</strong> apply the slabs to regular income and the special rate to gains and dividends.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Surcharge:</strong> multiply regular tax by the band rate and tax on gains and dividends by the band rate capped at 15%.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Relief and cess:</strong> deduct marginal relief, then add 4% cess on tax plus surcharge.</li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="marginal-relief">What Is Marginal Relief on Surcharge?</h2>
                <p style={p}>
                  Marginal relief caps the extra tax caused by crossing a threshold at the extra income earned above it.
                </p>
                <p style={p}>
                  Without it, Rs 1 of income above Rs 50 lakh would trigger over Rs 1 lakh of surcharge. With it, tax plus surcharge can rise only as much as income does.
                </p>
                <pre style={pre}>
{`Relief = (Tax + Surcharge at your income)
       - (Tax + Surcharge at the threshold + income above the threshold)

Applied only when the result is positive.`}
                </pre>
                <p style={p}>
                  This calculator takes the income above the threshold off regular income first, then off gains and dividends, to find the tax at the threshold.
                </p>
              </div>

              <PromoBar name="Old vs New Tax Regime Calculator" desc="Compare total tax under both regimes, including surcharge, before you choose." href="/calculators/old-vs-new-tax-regime-calculator" />

              <div style={sec}>
                <h2 style={h2} id="marginal-relief-limits">Until What Income Does Marginal Relief Last?</h2>
                <p style={p}>
                  Relief lasts until the surcharge is smaller than the income above the threshold, which is within about Rs 2 lakh of Rs 50 lakh and Rs 1 crore.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Regular taxable income only, below age 60. Largest relief is the relief at Rs 1 above the threshold.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Threshold</th><th style={thS} scope="col">Regime</th><th style={thR} scope="col">Relief ends at about</th><th style={thR} scope="col">Largest relief</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 50 lakh', 'New', 'Rs 51.62 lakh', 'Rs 1.08 lakh'],
                        ['Rs 50 lakh', 'Old', 'Rs 51.96 lakh', 'Rs 1.31 lakh'],
                        ['Rs 1 crore', 'New', 'Rs 101.97 lakh', 'Rs 1.29 lakh'],
                        ['Rs 1 crore', 'Old', 'Rs 102.15 lakh', 'Rs 1.41 lakh'],
                        ['Rs 2 crore', 'New', 'Rs 208.93 lakh', 'Rs 5.58 lakh'],
                        ['Rs 2 crore', 'Old', 'Rs 209.30 lakh', 'Rs 5.81 lakh'],
                        ['Rs 5 crore', 'New', 'None, rate is 25% on both sides', 'Nil'],
                        ['Rs 5 crore', 'Old', 'Rs 530.18 lakh', 'Rs 17.77 lakh'],
                      ].map(([t, g, e, m]) => (
                        <tr key={t + g}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td><td style={tdL}>{g}</td><td style={tdR}>{e}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculation-example">Worked Example: Surcharge on Rs 51 Lakh Taxable Income</h2>
                <p style={p}>
                  On Rs 51 lakh of taxable income under the new regime, marginal relief cuts the surcharge from Rs 1,11,000 to Rs 70,000.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>New regime slabs for FY 2026-27. The extra Rs 1 lakh of income raises total tax by Rs 1,04,000 including cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Step</th><th style={thR} scope="col">Amount</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Tax on Rs 51,00,000 under new slabs', 'Rs 11,10,000'],
                        ['Surcharge at 10%', 'Rs 1,11,000'],
                        ['Tax plus surcharge at your income', 'Rs 12,21,000'],
                        ['Tax at Rs 50,00,000 (no surcharge)', 'Rs 10,80,000'],
                        ['Income above the threshold', 'Rs 1,00,000'],
                        ['Maximum allowed (Rs 10,80,000 + Rs 1,00,000)', 'Rs 11,80,000'],
                        ['Marginal relief (Rs 12,21,000 minus Rs 11,80,000)', 'Rs 41,000'],
                        ['Surcharge payable (Rs 1,11,000 minus Rs 41,000)', 'Rs 70,000'],
                        ['Cess at 4% on Rs 11,80,000', 'Rs 47,200'],
                        ['Total tax', 'Rs 12,27,200'],
                      ].map(([s, a], i) => (
                        <tr key={s}><td style={{ ...tdL, fontWeight: i === 9 ? 700 : 400, color: i === 9 ? C.ink : C.ink2 }}>{s}</td><td style={{ ...tdR, fontWeight: 700 }}>{a}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-by-income">How Much Surcharge Do You Pay at Different Incomes?</h2>
                <p style={p}>
                  Surcharge rises with income, and the effective tax rate on Rs 5 crore under the new regime is 37.91%.
                </p>
                <p style={p}>
                  Check any income against the <Link href="/calculators/effective-tax-rate-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Effective Tax Rate Calculator</Link>.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 640 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>New regime, regular income only, below age 60. Total tax includes 4% cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Taxable income</th><th style={thR} scope="col">Base tax</th><th style={thR} scope="col">Relief</th><th style={thR} scope="col">Surcharge</th><th style={thR} scope="col">Total tax</th><th style={thR} scope="col">Effective</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 50 lakh', 'Rs 10,80,000', 'Nil', 'Nil', 'Rs 11,23,200', '22.46%'],
                        ['Rs 51 lakh', 'Rs 11,10,000', 'Rs 41,000', 'Rs 70,000', 'Rs 12,27,200', '24.06%'],
                        ['Rs 52 lakh', 'Rs 11,40,000', 'Nil', 'Rs 1,14,000', 'Rs 13,04,160', '25.08%'],
                        ['Rs 60 lakh', 'Rs 13,80,000', 'Nil', 'Rs 1,38,000', 'Rs 15,78,720', '26.31%'],
                        ['Rs 1 crore', 'Rs 25,80,000', 'Nil', 'Rs 2,58,000', 'Rs 29,51,520', '29.52%'],
                        ['Rs 1.01 crore', 'Rs 26,10,000', 'Rs 63,500', 'Rs 3,28,000', 'Rs 30,55,520', '30.25%'],
                        ['Rs 2 crore', 'Rs 55,80,000', 'Nil', 'Rs 8,37,000', 'Rs 66,73,680', '33.37%'],
                        ['Rs 2.01 crore', 'Rs 56,10,000', 'Rs 4,95,500', 'Rs 9,07,000', 'Rs 67,77,680', '33.72%'],
                        ['Rs 5 crore', 'Rs 1,45,80,000', 'Nil', 'Rs 36,45,000', 'Rs 1,89,54,000', '37.91%'],
                      ].map(([a, b, c, d, e, f]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={tdR}>{c}</td><td style={tdR}>{d}</td><td style={{ ...tdR, fontWeight: 700 }}>{e}</td><td style={tdR}>{f}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="regime-comparison">How Does Surcharge Differ Between the New and Old Regime?</h2>
                <p style={p}>
                  Surcharge is identical up to Rs 5 crore, and above that the old regime adds a 37% band the new regime does not have.
                </p>
                <div style={tableBox}>
                  <table style={{ ...tbl, minWidth: 560 }}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Same taxable income under both regimes, no deductions beyond the amount shown. Total tax includes 4% cess.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Taxable income</th><th style={thR} scope="col">New: total tax</th><th style={thR} scope="col">New: effective</th><th style={thR} scope="col">Old: total tax</th><th style={thR} scope="col">Old: effective</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 1 crore', 'Rs 29,51,520', '29.52%', 'Rs 32,17,500', '32.17%'],
                        ['Rs 2 crore', 'Rs 66,73,680', '33.37%', 'Rs 69,51,750', '34.76%'],
                        ['Rs 3 crore', 'Rs 1,11,54,000', '37.18%', 'Rs 1,14,56,250', '38.19%'],
                        ['Rs 5 crore', 'Rs 1,89,54,000', '37.91%', 'Rs 1,92,56,250', '38.51%'],
                        ['Rs 10 crore', 'Rs 3,84,54,000', '38.45%', 'Rs 4,24,76,850', '42.48%'],
                      ].map(([a, b, c, d, e]) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td><td style={tdR}>{b}</td><td style={{ ...tdR, color: green, fontWeight: 700 }}>{c}</td><td style={tdR}>{d}</td><td style={tdR}>{e}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The old regime can still win if deductions are large, so run both in the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Old vs New Tax Regime Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="special-income">Is Surcharge Capped on Capital Gains and Dividends?</h2>
                <p style={p}>
                  Yes, surcharge on tax on dividends and on gains under Sections 111A, 112 and 112A is capped at 15%, even when total income is above Rs 2 crore.
                </p>
                <p style={p}>
                  The cap covers equity short-term gains, long-term gains on other assets and equity long-term gains. Gains taxed at slab rates get the full surcharge.
                </p>
                <p style={p}>
                  Take Rs 2 crore of regular income and Rs 1 crore of long-term gains at 12.5% under the new regime. Surcharge is Rs 13,95,000 on regular tax at 25% plus Rs 1,87,500 on gains at 15%, which is Rs 15,82,500.
                </p>
                <p style={p}>
                  Without the cap, the gains would attract Rs 3,12,500 of surcharge. Work out the gain itself in the <Link href="/calculators/capital-gains-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Capital Gains Calculator</Link>.
                </p>
              </div>

              <PromoBar name="Dividend Tax Calculator" desc="See how much tax a dividend payout attracts at your slab rate before surcharge." href="/calculators/dividend-tax-calculator" />

              <div style={sec}>
                <h2 style={h2} id="surcharge-vs-cess">How Do Surcharge and Cess Set the Peak Tax Rate?</h2>
                <p style={p}>
                  The peak effective rate is 39% under the new regime and 42.744% under the old regime.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>Peak rate = 30% x (1 + surcharge) x 1.04.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Component</th><th style={thC} scope="col">New regime</th><th style={thC} scope="col">Old regime</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['Top slab rate', '30%', '30%'],
                        ['Highest surcharge', '25%', '37%'],
                        ['Rate with surcharge', '37.5%', '41.1%'],
                        ['Health and education cess', '4%', '4%'],
                        ['Peak effective rate', '39.000%', '42.744%'],
                      ].map(([a, b, c], i) => (
                        <tr key={a}><td style={{ ...tdL, fontWeight: i === 4 ? 700 : 400, color: i === 4 ? C.ink : C.ink2 }}>{a}</td><td style={{ ...tdC, fontWeight: i === 4 ? 700 : 400 }}>{b}</td><td style={{ ...tdC, fontWeight: i === 4 ? 700 : 400 }}>{c}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Cess is charged on tax plus surcharge, so it grows with the surcharge. Cess has no marginal relief.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="who-pays-surcharge">Who Pays Surcharge?</h2>
                <p style={p}>
                  Individuals, HUFs and NRIs pay surcharge on the same thresholds, and the 15% cap works the same for all of them.
                </p>
                <p style={p}>
                  Partnership firms and LLPs pay a flat 12% when income exceeds Rs 1 crore. Surcharge does not depend on age, but age changes the old-regime slabs and so the base tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="age-and-surcharge">Does Your Age Change the Surcharge?</h2>
                <p style={p}>
                  No, surcharge rates are the same for every age group. Age changes the old-regime slabs, which set the base tax the surcharge is charged on.
                </p>
                <p style={p}>
                  Under the old regime, the exemption limit is Rs 2.5 lakh below 60, Rs 3 lakh from 60 to 80 and Rs 5 lakh above 80. The new regime has one set of slabs for everyone.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-tds-advance-tax">How Does Surcharge Affect TDS and Advance Tax?</h2>
                <p style={p}>
                  Both include surcharge once your estimated income is above Rs 50 lakh. An employer deducts TDS on salary using your estimated total income for the year.
                </p>
                <p style={p}>
                  Advance tax is due on the tax payable including surcharge and cess. Estimate it with the <Link href="/calculators/advance-tax-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Advance Tax Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-in-excel">How Do You Calculate Surcharge in Excel?</h2>
                <p style={p}>
                  Pick the rate with a nested IF on total income, multiply it by the tax, and subtract marginal relief.
                </p>
                <div style={tableBox}>
                  <table style={tbl}>
                      <caption style={{ captionSide: 'bottom', fontSize: 12, color: C.ink3, padding: '8px 0 0', textAlign: 'left' }}>For the new regime, cap the last rate at 0.25. Special-rate income needs its own 15% cap.</caption>
                    <thead>
                      <tr><th style={thS} scope="col">Cell</th><th style={thS} scope="col">Content</th><th style={thS} scope="col">Formula</th></tr>
                    </thead>
                    <tbody>
                      {[
                        ['B1', 'Total taxable income', 'Enter amount'],
                        ['B2', 'Tax before surcharge', 'Slab tax on the income'],
                        ['B3', 'Surcharge rate (old regime)', '=IF(B1<=5000000,0,IF(B1<=10000000,0.1,IF(B1<=20000000,0.15,IF(B1<=50000000,0.25,0.37))))'],
                        ['B4', 'Surcharge before relief', '=B2*B3'],
                        ['B5', 'Total at the threshold', 'Tax at threshold + surcharge at threshold + (B1 - threshold)'],
                        ['B6', 'Surcharge payable', '=B4-MAX(0,B2+B4-B5)'],
                      ].map(([c, a, f]) => (
                        <tr key={c}><td style={{ ...tdL, fontWeight: 700, color: C.ink }}>{c}</td><td style={tdL}>{a}</td><td style={{ ...tdL, fontFamily: 'monospace', fontSize: 12.5 }}>{f}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Compare your sheet with the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={lnk}>Income Tax Calculator</Link> to confirm the base tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Surcharge Calculator</h2>
                <p style={p}>The calculator has up to six inputs. Adjust the sliders and the result updates instantly.</p>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={li}><strong style={{ color: C.ink }}>Tax Regime:</strong> choose the new or old regime. The new regime applies the Rs 75,000 standard deduction, the old regime Rs 50,000.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Annual Regular Income:</strong> enter salary, business or other income before deductions.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Capital Gains and Dividends:</strong> enter that income and the tax rate on it. The default 12.5% is the equity long-term rate.</li>
                  <li style={li}><strong style={{ color: C.ink }}>Deductions and Age:</strong> under the old regime, enter deductions and your age group.</li>
                </ol>
                <p style={{ ...p, margin: 0 }}>
                  The result panel shows surcharge payable, marginal relief, cess, total tax and the effective rate. The currency selector converts every amount.
                </p>
              </div>


              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ items={faqItems} />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations on this page are indicative only. Capital gains and dividends are taxed at the single rate you enter, and the calculator does not model every deduction, exemption or special rate. Tax rules and surcharge rates can change in the Budget. This calculator is for educational and planning purposes and does not constitute tax advice. Consult a qualified Chartered Accountant before making tax decisions.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.surcharge-sidebar::-webkit-scrollbar{width:5px}.surcharge-sidebar::-webkit-scrollbar-track{background:transparent}.surcharge-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.surcharge-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="surcharge-sidebar" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ flexShrink: 0 }}><SidebarList title="Popular Calculators" items={POPULAR} /></div>
              <div style={{ flexShrink: 0 }}><SidebarList title="More Calculators" items={MORE} /></div>
            </div>
          </aside>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

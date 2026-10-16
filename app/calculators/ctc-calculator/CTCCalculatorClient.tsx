'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useLayoutEffect } from 'react';
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

type CityType = 'metro' | 'nonmetro';
type Regime = 'new' | 'old';

const CTC_PRESETS = [240000, 360000, 480000, 600000, 900000, 1200000, 1800000, 2400000];

/* ─── Income Tax Calculation (FY 2026-27, same engine as In-Hand Salary Calculator) ─── */
function calcAnnualTax(annualGross: number, regime: Regime, d80C = 0, d80D = 0, homeLoanInt = 0): number {
  if (regime === 'new') {
    const taxable = Math.max(0, annualGross - 75000);
    let tax = 0;
    const slabs: [number, number, number][] = [
      [0, 400000, 0], [400000, 800000, 0.05], [800000, 1200000, 0.10],
      [1200000, 1600000, 0.15], [1600000, 2000000, 0.20], [2000000, 2400000, 0.25],
    ];
    for (const [lo, hi, rate] of slabs) {
      if (taxable > lo) tax += (Math.min(taxable, hi) - lo) * rate;
    }
    if (taxable > 2400000) tax += (taxable - 2400000) * 0.30;
    if (taxable <= 1200000) { tax = 0; }
    else { tax = Math.min(tax, taxable - 1200000); }
    return Math.round(tax * 1.04);
  } else {
    const deductible = 50000 + Math.min(d80C, 150000) + Math.min(d80D, 25000) + Math.min(homeLoanInt, 200000);
    const taxable = Math.max(0, annualGross - deductible);
    let tax = 0;
    if (taxable > 250000) tax += (Math.min(taxable, 500000) - 250000) * 0.05;
    if (taxable > 500000) tax += (Math.min(taxable, 1000000) - 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
    if (taxable <= 500000) tax = 0;
    return Math.round(tax * 1.04);
  }
}

/* ─── CTC Breakup Calculation ────────────────────────────────── */
function calcSalary(
  ctc: number, basicPct: number, cityType: CityType, pfPct: number, profTax: number,
  variablePct: number, taxRegime: Regime, d80C = 0, d80D = 0, homeLoanInt = 0
) {
  const variableAnnual = Math.round(ctc * variablePct / 100);
  const fixedCtcMonthly = (ctc - variableAnnual) / 12;
  const basicMonthly = Math.round(fixedCtcMonthly * basicPct / 100);
  const hraMonthly = Math.round(basicMonthly * (cityType === 'metro' ? 0.5 : 0.4));
  const employerPfMonthly = Math.round(basicMonthly * 0.12);
  const gratuityMonthly = Math.round(basicMonthly * 0.0481);
  const grossMonthly = Math.round(fixedCtcMonthly - employerPfMonthly - gratuityMonthly);
  const specialMonthly = Math.max(0, grossMonthly - basicMonthly - hraMonthly);
  const employeePfMonthly = Math.round(basicMonthly * pfPct / 100);
  const annualTaxableGross = grossMonthly * 12 + variableAnnual;
  const tdsAnnual = calcAnnualTax(annualTaxableGross, taxRegime, d80C, d80D, homeLoanInt);
  const tdsMonthly = Math.round(tdsAnnual / 12);
  const totalDeductionsMonthly = employeePfMonthly + profTax + tdsMonthly;
  const inHandMonthly = grossMonthly - totalDeductionsMonthly;
  const annualTakeHome = inHandMonthly * 12 + variableAnnual;
  const inHandPct = Math.max(1, Math.min(99, Math.round((inHandMonthly / (fixedCtcMonthly + variableAnnual / 12)) * 100)));
  return {
    basicMonthly, hraMonthly, specialMonthly, employerPfMonthly, gratuityMonthly, grossMonthly,
    employeePfMonthly, profTaxMonthly: profTax, tdsMonthly, totalDeductionsMonthly,
    inHandMonthly, annualTakeHome, variableAnnual, fixedCtcMonthly, inHandPct,
  };
}

/* ─── Donut Chart: In-Hand vs Deductions (VPF geometry: one track, one overlay arc) ─── */
function DonutChart({ inHandPct }: { inHandPct: number }) {
  const dedPct = 100 - inHandPct;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const iArc = (inHandPct / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`In-hand ${inHandPct}% of monthly CTC, deductions ${dedPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#2d9970" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${iArc} ${circ - iArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>In-Hand</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{inHandPct}%</text>
    </svg>
  );
}

/* ─── N-Year CTC Growth Projection (VPF pattern: collapsible stacked bar chart + table) ─── */
interface CTCYear { year: number; ctc: number; grossMonthly: number; deductionsMonthly: number; inHandMonthly: number; }

function buildCTCProjection(
  baseCtc: number, basicPct: number, cityType: CityType, pfPct: number, profTax: number,
  variablePct: number, taxRegime: Regime, d80C: number, d80D: number, homeLoanInt: number,
  growthPct: number, years: number
): CTCYear[] {
  const rows: CTCYear[] = [];
  const rate = Math.max(0, growthPct) / 100;
  for (let y = 1; y <= years; y++) {
    const ctcY = baseCtc * Math.pow(1 + rate, y);
    const r = calcSalary(ctcY, basicPct, cityType, pfPct, profTax, variablePct, taxRegime, d80C, d80D, homeLoanInt);
    rows.push({ year: y, ctc: ctcY, grossMonthly: r.grossMonthly, deductionsMonthly: r.totalDeductionsMonthly, inHandMonthly: r.inHandMonthly });
  }
  return rows;
}

function CTCGrowthChart({ rows }: { rows: CTCYear[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => r.inHandMonthly + r.deductionsMonthly), 1);
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.6));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label={`In-hand versus deductions over ${rows.length} years`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const inHandH = (row.inHandMonthly / maxVal) * H;
        const totalH = ((row.inHandMonthly + row.deductionsMonthly) / maxVal) * H;
        const dedH = Math.max(0, totalH - inHandH);
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={H - totalH} width={barW} height={dedH} fill="#2d9970" rx={2} />
            <rect x={x} y={H - inHandH} width={barW} height={inHandH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 20 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 12 ? 8 : 9, fill: C.ink3, fontFamily: INTER }}>
                Y{row.year}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
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

/* ─── Pill toggle (City Type / Tax Regime) ──────────────────── */
function PillToggle<T extends string>({ label, value, options, onChange, compact }: {
  label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; compact?: boolean;
}) {
  return (
    <div style={{ marginBottom: compact ? 18 : 28 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>{label}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map(opt => (
          <button key={opt.value} onClick={() => onChange(opt.value)} aria-pressed={value === opt.value}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 8, border: `1.5px solid ${value === opt.value ? C.dark : C.border}`,
              background: value === opt.value ? C.dark : C.white, color: value === opt.value ? C.lime : C.ink2,
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s',
            }}>
            {opt.label}
          </button>
        ))}
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
  { href: '/calculators/in-hand-salary-calculator',        label: 'In-Hand Salary Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/income-tax-calculator',             label: 'Income Tax Calculator' },
  { href: '/calculators/hra-calculator',                    label: 'HRA Calculator' },
  { href: '/calculators/gratuity-calculator',               label: 'Gratuity Calculator' },
  { href: '/calculators/salary-hike-calculator',            label: 'Salary Hike Calculator' },
  { href: '/calculators/sip-calculator',                    label: 'SIP Calculator' },
];
const MORE = [
  { href: '/calculators/epf-calculator',                    label: 'EPF Calculator' },
  { href: '/calculators/xirr-calculator',                   label: 'XIRR Calculator' },
  { href: '/calculators/compound-interest-calculator',      label: 'Compound Interest Calculator' },
  { href: '/calculators/emi-calculator',                    label: 'EMI Calculator' },
  { href: '/calculators/ppf-calculator',                    label: 'PPF Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function CTCCalculatorClient({ region = 'in' }: { region?: string }) {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGrowth, setShowGrowth] = useState(false);

  const defaultSettings = {
    mode: 'calculator' as 'calculator' | 'comparison',
    ctc1: 1200000, basicPct1: 50, variablePct1: 0,
    ctc2: 1500000, basicPct2: 50, variablePct2: 10,
    cityType: 'metro' as CityType,
    taxRegime: 'new' as Regime,
    pfPct: 12, profTax: 200,
    d80C: 0, d80D: 0, homeLoanInt: 0,
    ctcGrowth: 8, projectionYears: 5,
  };
  const { settings, updateSettings } = useCalculatorSettings('ctc-calculator', defaultSettings);
  const {
    mode, ctc1, basicPct1, variablePct1, ctc2, basicPct2, variablePct2,
    cityType, taxRegime, pfPct, profTax, d80C, d80D, homeLoanInt,
    ctcGrowth, projectionYears,
  } = settings;

  const setMode         = (v: 'calculator' | 'comparison') => updateSettings({ mode: v });
  const setCtc1         = (v: number) => updateSettings({ ctc1: v });
  const setBasicPct1    = (v: number) => updateSettings({ basicPct1: v });
  const setVariablePct1 = (v: number) => updateSettings({ variablePct1: v });
  const setCtc2         = (v: number) => updateSettings({ ctc2: v });
  const setBasicPct2    = (v: number) => updateSettings({ basicPct2: v });
  const setVariablePct2 = (v: number) => updateSettings({ variablePct2: v });
  const setCityType     = (v: CityType) => updateSettings({ cityType: v });
  const setTaxRegime    = (v: Regime) => updateSettings({ taxRegime: v });
  const setPfPct        = (v: number) => updateSettings({ pfPct: v });
  const setProfTax      = (v: number) => updateSettings({ profTax: v });
  const setD80C         = (v: number) => updateSettings({ d80C: v });
  const setD80D         = (v: number) => updateSettings({ d80D: v });
  const setHomeLoanInt  = (v: number) => updateSettings({ homeLoanInt: v });
  const setCtcGrowth    = (v: number) => updateSettings({ ctcGrowth: v });
  const setProjectionYears = (v: number) => updateSettings({ projectionYears: v });

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtSigned = (n: number) => {
    const rounded = Math.round(n);
    return rounded === 0 ? fmtIN(0) : rounded < 0 ? `-${fmtIN(Math.abs(rounded))}` : fmtIN(rounded);
  };

  const res1 = calcSalary(ctc1, basicPct1, cityType, pfPct, profTax, variablePct1, taxRegime, d80C, d80D, homeLoanInt);
  const res2 = calcSalary(ctc2, basicPct2, cityType, pfPct, profTax, variablePct2, taxRegime, d80C, d80D, homeLoanInt);
  const dedPct = 100 - res1.inHandPct;

  const ctcProjection = buildCTCProjection(ctc1, basicPct1, cityType, pfPct, profTax, variablePct1, taxRegime, d80C, d80D, homeLoanInt, ctcGrowth, projectionYears);

  const Row = ({ label, value, sub }: { label: string; value: string; sub?: boolean }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
      <span style={{ fontSize: 13, color: sub ? C.ink3 : C.ink2 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: sub ? 500 : 700, color: sub ? C.ink3 : C.ink }}>{value}</span>
    </div>
  );

  const SectionLabel = ({ label }: { label: string }) => (
    <div style={{ fontSize: 10.5, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase' as const, padding: '12px 0 4px', width: '100%' }}>
      {label}
    </div>
  );

  const h2  = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p   = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const } as React.CSSProperties;
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  const comparisonDiff = res2.inHandMonthly - res1.inHandMonthly;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>CTC Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Break your annual CTC into basic, HRA, and deductions, see your monthly in-hand salary under the old or new tax regime, and compare two job offers side by side.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            <section aria-label="CTC Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div role="tablist" aria-label="Calculator mode" style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                <button role="tab" id="tab-calculator" aria-selected={mode === 'calculator'} aria-controls="panel-calculator" onClick={() => setMode('calculator')}
                  style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === 'calculator' ? 700 : 400, color: mode === 'calculator' ? C.dark : C.ink3, borderBottom: mode === 'calculator' ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                  CTC to In-Hand
                </button>
                <button role="tab" id="tab-comparison" aria-selected={mode === 'comparison'} aria-controls="panel-comparison" onClick={() => setMode('comparison')}
                  style={{ flex: 1, padding: mobile ? '13px 6px' : '15px 20px', background: 'none', border: 'none', cursor: 'pointer', fontSize: mobile ? 12.5 : 13.5, fontWeight: mode === 'comparison' ? 700 : 400, color: mode === 'comparison' ? C.dark : C.ink3, borderBottom: mode === 'comparison' ? `2.5px solid ${C.dark}` : '2.5px solid transparent', transition: 'all 0.15s', fontFamily: INTER }}>
                  Offer Comparison
                </button>
              </div>

              {mode === 'calculator' ? (
                <div id="panel-calculator" role="tabpanel" aria-labelledby="tab-calculator" style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                  {/* Input panel */}
                  <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                      {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                      {mobile && <div />}
                      <CurrencySelector theme="light" />
                    </div>

                    {!showAdvanced ? (
                      <>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} role="group" aria-label="Quick CTC presets">
                          {CTC_PRESETS.map(v => (
                            <button key={v} onClick={() => setCtc1(v)} aria-pressed={ctc1 === v}
                              style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                                color: ctc1 === v ? C.ink : C.ink3,
                                border: `${ctc1 === v ? 1.5 : 1}px solid ${ctc1 === v ? C.ink : C.border}`,
                                fontWeight: ctc1 === v ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                                fontFamily: INTER, transition: 'all 0.15s' }}>
                              {v >= 10000000 ? `${v / 10000000}Cr` : `${(v / 100000).toString().replace(/\.0$/, '')}L`}
                            </button>
                          ))}
                        </div>
                        <Slider label="Annual CTC" id="ctc-annual" value={ctc1} min={200000} max={50000000} step={50000} fmt={fmtC} onChange={setCtc1} compact={mobile} />
                        <Slider label="Basic Salary (% of CTC)" id="ctc-basic-pct" value={basicPct1} min={20} max={70} step={1} fmt={v => `${v}%`} onChange={setBasicPct1} compact={mobile} />
                        <PillToggle label="City Type" value={cityType} onChange={setCityType} compact={mobile}
                          options={[{ value: 'metro', label: 'Metro' }, { value: 'nonmetro', label: 'Non-Metro' }]} />
                        <PillToggle label="Tax Regime" value={taxRegime} onChange={setTaxRegime} compact={mobile}
                          options={[{ value: 'new', label: 'New Regime' }, { value: 'old', label: 'Old Regime' }]} />

                        <div style={{ padding: '12px 16px', background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, marginBottom: 24 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: C.ink, fontWeight: 700, marginBottom: 4 }}>
                            <span>Fixed CTC (Monthly)</span>
                            <span>{fmtC(res1.fixedCtcMonthly)}</span>
                          </div>
                          <div style={{ fontSize: 12, color: C.ink2 }}>Basic + HRA + Special Allowance + Employer PF + Gratuity, excluding variable pay</div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button onClick={() => setShowAdvanced(true)}
                            style={{ fontSize: 12, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                            More settings
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Slider label="Variable Pay (% of CTC)" id="ctc-variable-pct" value={variablePct1} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setVariablePct1} compact={mobile} />
                        <Slider label="Employee PF (% of Basic)" id="ctc-pf-pct" value={pfPct} min={0} max={20} step={0.5} fmt={v => `${v}%`} onChange={setPfPct} compact={mobile} />
                        <Slider label="Professional Tax (Monthly)" id="ctc-prof-tax" value={profTax} min={0} max={5000} step={50} fmt={fmtC} onChange={setProfTax} compact={mobile} />
                        {taxRegime === 'old' && (
                          <>
                            <Slider label="Section 80C Investments" id="ctc-80c" value={d80C} min={0} max={150000} step={5000} fmt={fmtC} onChange={setD80C} compact={mobile} />
                            <Slider label="Health Insurance 80D" id="ctc-80d" value={d80D} min={0} max={50000} step={1000} fmt={fmtC} onChange={setD80D} compact={mobile} />
                            <Slider label="Home Loan Interest (Sec 24b)" id="ctc-homeloan" value={homeLoanInt} min={0} max={200000} step={5000} fmt={fmtC} onChange={setHomeLoanInt} compact={mobile} />
                          </>
                        )}
                        <Slider label="Annual CTC Growth" id="ctc-growth" value={ctcGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setCtcGrowth} compact={mobile} />
                        <Slider label="Projection Years" id="ctc-years" value={projectionYears} min={2} max={15} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                          CTC growth and projection years feed the N-Year CTC &amp; Take-Home Growth chart below the calculator.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <button onClick={() => setShowAdvanced(false)}
                            style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
                            Back
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Result panel */}
                  <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                        <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>Monthly In-Hand</div>
                        <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{taxRegime === 'new' ? 'New Regime' : 'Old Regime'} · {cityType === 'metro' ? 'Metro' : 'Non-Metro'}</div>
                      </div>
                      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                        <div aria-live="polite" aria-label={`Monthly In-Hand: ${fmtIN(res1.inHandMonthly)}`} style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}>{fmtIN(res1.inHandMonthly)}</div>
                        <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>per month</div>
                      </div>
                    </div>

                    <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: mobile ? '8px 12px' : '10px 14px', textAlign: 'center', marginBottom: 16, width: '100%' }}>
                      <span style={{ fontSize: 12.5, color: C.ink3 }}>Annual take-home{variablePct1 > 0 ? ' (incl. variable pay)' : ''}: <strong style={{ color: C.ink }}>{fmtC(res1.annualTakeHome)}</strong></span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: mobile ? 0 : 0, order: mobile ? 1 : -1 }}>
                      <DonutChart inHandPct={res1.inHandPct} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16, order: mobile ? 2 : -1, width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>In-Hand {res1.inHandPct}%</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 3, background: '#2d9970' }} aria-hidden="true" />
                        <span style={{ fontSize: 12, color: C.ink2 }}>Deductions {dedPct}%</span>
                      </div>
                    </div>

                    <SectionLabel label="Earnings" />
                    <Row label="Basic Salary" value={fmtC(res1.basicMonthly)} />
                    <Row label="HRA" value={fmtC(res1.hraMonthly)} />
                    <Row label="Special Allowance" value={fmtC(res1.specialMonthly)} />
                    <Row label="Gross Salary" value={fmtC(res1.grossMonthly)} />

                    <SectionLabel label="Deductions" />
                    <Row label="Employee PF" value={`-${fmtC(res1.employeePfMonthly)}`} sub />
                    <Row label="Professional Tax" value={`-${fmtC(res1.profTaxMonthly)}`} sub />
                    <Row label={`Income Tax TDS (${taxRegime === 'new' ? 'New' : 'Old'} Regime)`} value={res1.tdsMonthly > 0 ? `-${fmtC(res1.tdsMonthly)}` : 'Nil'} sub />
                    <Row label="Total Deductions" value={`-${fmtC(res1.totalDeductionsMonthly)}`} />
                  </div>
                </div>
              ) : (
                <div id="panel-comparison" role="tabpanel" aria-labelledby="tab-comparison" style={{ padding: mobile ? '20px 18px' : '40px 44px' }}>
                  <div style={{ display: 'flex', gap: mobile ? 8 : 16, flexWrap: 'wrap', marginBottom: 28 }}>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <PillToggle label="City Type (applies to both offers)" value={cityType} onChange={setCityType}
                        options={[{ value: 'metro', label: 'Metro' }, { value: 'nonmetro', label: 'Non-Metro' }]} />
                    </div>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <PillToggle label="Tax Regime (applies to both offers)" value={taxRegime} onChange={setTaxRegime}
                        options={[{ value: 'new', label: 'New Regime' }, { value: 'old', label: 'Old Regime' }]} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 24 : 32, marginBottom: 24 }}>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 16 }}>Offer 1</h3>
                      <Slider label="Annual CTC" id="ctc-cmp-ctc1" value={ctc1} min={200000} max={50000000} step={50000} fmt={fmtC} onChange={setCtc1} compact={true} />
                      <Slider label="Basic Salary (% of CTC)" id="ctc-cmp-basic1" value={basicPct1} min={20} max={70} step={1} fmt={v => `${v}%`} onChange={setBasicPct1} compact={true} />
                      <Slider label="Variable Pay (% of CTC)" id="ctc-cmp-var1" value={variablePct1} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setVariablePct1} compact={true} />
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', padding: '16px', borderRadius: 10, color: '#101214' }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Monthly In-Hand</div>
                        <div aria-live="polite" style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58' }}>{fmtIN(res1.inHandMonthly)}</div>
                        <div style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>Annual take-home: {fmtC(res1.annualTakeHome)}</div>
                      </div>
                    </div>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: C.dark, marginBottom: 16 }}>Offer 2</h3>
                      <Slider label="Annual CTC" id="ctc-cmp-ctc2" value={ctc2} min={200000} max={50000000} step={50000} fmt={fmtC} onChange={setCtc2} compact={true} />
                      <Slider label="Basic Salary (% of CTC)" id="ctc-cmp-basic2" value={basicPct2} min={20} max={70} step={1} fmt={v => `${v}%`} onChange={setBasicPct2} compact={true} />
                      <Slider label="Variable Pay (% of CTC)" id="ctc-cmp-var2" value={variablePct2} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setVariablePct2} compact={true} />
                      <div style={{ background: '#F4F5F6', border: '1px solid #E3E6E8', padding: '16px', borderRadius: 10, color: '#101214' }}>
                        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Monthly In-Hand</div>
                        <div aria-live="polite" style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58' }}>{fmtIN(res2.inHandMonthly)}</div>
                        <div style={{ fontSize: 13, marginTop: 8, opacity: 0.9 }}>Annual take-home: {fmtC(res2.annualTakeHome)}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', marginBottom: 24, textAlign: 'center' }}>
                    <span style={{ fontSize: 14, color: C.ink, fontWeight: 600 }}>
                      {comparisonDiff === 0
                        ? 'Both offers give the same monthly in-hand pay.'
                        : `Offer ${comparisonDiff > 0 ? 2 : 1} pays ${fmtC(Math.abs(comparisonDiff))} more per month in-hand.`}
                    </span>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', padding: '12px 0', fontSize: 12, color: C.ink3, textAlign: 'left' }}>
                        Full component-by-component comparison of both offers, monthly figures.
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col" style={thS}>Component</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Offer 1</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Offer 2</th>
                          <th scope="col" style={{ ...thS, textAlign: 'right' }}>Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Basic Salary', res1.basicMonthly, res2.basicMonthly],
                          ['HRA', res1.hraMonthly, res2.hraMonthly],
                          ['Special Allowance', res1.specialMonthly, res2.specialMonthly],
                          ['Gross Salary', res1.grossMonthly, res2.grossMonthly],
                          ['Employee PF', -res1.employeePfMonthly, -res2.employeePfMonthly],
                          ['Professional Tax', -res1.profTaxMonthly, -res2.profTaxMonthly],
                          ['Income Tax TDS', -res1.tdsMonthly, -res2.tdsMonthly],
                        ].map(([label, v1, v2]) => (
                          <tr key={label as string}>
                            <td style={tdL}>{label}</td>
                            <td style={tdR}>{fmtSigned(v1 as number)}</td>
                            <td style={tdR}>{fmtSigned(v2 as number)}</td>
                            <td style={tdR}>{fmtSigned((v2 as number) - (v1 as number))}</td>
                          </tr>
                        ))}
                        <tr style={{ background: C.paleLime }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Monthly In-Hand</td>
                          <td style={{ ...tdR, fontWeight: 800, color: C.dark }}>{fmtIN(res1.inHandMonthly)}</td>
                          <td style={{ ...tdR, fontWeight: 800, color: C.dark }}>{fmtIN(res2.inHandMonthly)}</td>
                          <td style={{ ...tdR, fontWeight: 800, color: C.dark }}>{fmtSigned(comparisonDiff)}</td>
                        </tr>
                        <tr style={{ background: C.bg }}>
                          <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Annual Take-Home</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(res1.annualTakeHome)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(res2.annualTakeHome)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtSigned(res2.annualTakeHome - res1.annualTakeHome)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {mode === 'calculator' && (
                <div style={{ borderTop: `1px solid ${C.border}` }}>
                  <button onClick={() => setShowGrowth(v => !v)}
                    aria-expanded={showGrowth} aria-controls="ctc-growth-table"
                    style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>N-Year CTC &amp; Take-Home Growth</span>
                      {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>If your CTC keeps growing every year</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                        {projectionYears} yr &middot; {ctcGrowth.toFixed(1)}%/yr
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true" style={{ transform: showGrowth ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {showGrowth && (
                    <div id="ctc-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
                      <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                        <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>In-Hand</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <div style={{ width: 10, height: 10, borderRadius: 2, background: '#2d9970' }} aria-hidden="true" />
                            <span style={{ fontSize: 11.5, color: C.ink2 }}>Deductions</span>
                          </div>
                        </div>
                        <CTCGrowthChart rows={ctcProjection} />
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
                        <table style={{ minWidth: 560, width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr style={{ background: '#f4f5f6' }}>
                              {['Year', 'Projected CTC', 'Gross (Monthly)', 'Deductions (Monthly)', 'In-Hand (Monthly)'].map(h => (
                                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {ctcProjection.map((row, i) => (
                              <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                                <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.ctc)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtIN(row.grossMonthly)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink2 }}>-{fmtIN(row.deductionsMonthly)}</td>
                                <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 700 }}>{fmtIN(row.inHandMonthly)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ padding: mobile ? '16px' : '20px 44px 28px' }}>
                        <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                          At {ctcGrowth.toFixed(1)}% annual CTC growth, your monthly in-hand goes from {fmtIN(res1.inHandMonthly)} today to about {fmtIN(ctcProjection[ctcProjection.length - 1]?.inHandMonthly ?? res1.inHandMonthly)} by year {projectionYears}, holding your basic percentage, city, and tax regime constant throughout. Deductions grow faster than in-hand pay once your income crosses into a higher tax slab, so the gap between the two bars typically widens in the later years, not just the early ones.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              <div style={sec}>
                <h2 style={h2} id="what-is-ctc">What Is CTC?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    CTC (Cost to Company) is the total annual expense a company incurs on an employee, expressed as a single headline figure in an offer letter.
                  </p>
                </div>
                <p style={p}>
                  The CTC bundles your direct salary components with the company&apos;s own statutory contributions on your behalf, such as employer PF and the gratuity provision. It often includes variable pay or a joining bonus that is not guaranteed. None of these employer-side amounts land in your bank account each month.
                </p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 10, padding: '18px 20px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontFamily: INTER, fontSize: 14, fontWeight: 600, color: C.dark, margin: '0 0 3px' }}>In-Hand Salary Calculator</p>
                    <p style={{ fontFamily: INTER, fontSize: 13, color: C.ink2, margin: 0 }}>A more detailed breakdown of net take-home, with perquisite income and RSU support.</p>
                  </div>
                  <Link className="fx-btn" href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontFamily: INTER, fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Open calculator</Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-vs-in-hand">Difference Between CTC and In-Hand Salary</h2>
                <p style={p}>
                  CTC is the total cost to the employer. In-hand salary is the amount credited to your bank account every month. Getting from one to the other means subtracting both employer-side contributions and your own statutory deductions.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Difference between CTC, gross salary, and in-hand salary</caption>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Includes</th><th style={thS} scope="col">Excludes</th></tr></thead>
                    <tbody>
                      {[
                        ['CTC', 'Basic + HRA + Special Allowance + Employer PF + Gratuity + Variable Pay', 'Nothing, it is the total cost'],
                        ['Gross Salary', 'Basic + HRA + Special Allowance', 'Employer PF, Gratuity provision'],
                        ['In-Hand Salary', 'Gross Salary minus deductions', 'Employee PF, Professional Tax, Income Tax TDS'],
                      ].map(([t, incl, excl]) => (
                        <tr key={t}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink, textAlign: 'left' }}>{t}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{incl}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{excl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-formula">CTC Formula: How to Calculate In-Hand Salary</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 13.5, color: C.dark, lineHeight: 1.8, display: 'block' }}>
                    Gross Salary = CTC minus Employer PF minus Gratuity Provision<br />
                    In-Hand Salary = Gross Salary minus (Employee PF + Professional Tax + Income Tax TDS)
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Worked example: CTC of Rs 12,00,000, metro city, 50% basic, new regime, no variable pay</caption>
                    <thead><tr><th style={thS} scope="col">Step</th><th style={thS} scope="col">Formula</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly Amount</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic Salary', '50% of CTC (fixed)', 'Rs 50,000'],
                        ['HRA', '50% of Basic (metro)', 'Rs 25,000'],
                        ['Employer PF', '12% of Basic', 'Rs 6,000'],
                        ['Gratuity Provision', '4.81% of Basic', 'Rs 2,405'],
                        ['Gross Salary', 'CTC/12 minus Employer PF minus Gratuity', 'Rs 91,595'],
                        ['Special Allowance', 'Gross minus Basic minus HRA', 'Rs 16,595'],
                        ['Employee PF', '12% of Basic', 'Rs 6,000'],
                        ['Professional Tax', 'State-set, example Rs 200', 'Rs 200'],
                        ['Income Tax TDS', 'New regime, nil under Rs 12L taxable', 'Nil'],
                        ['In-Hand Salary', 'Gross minus all deductions', 'Rs 85,395'],
                      ].map((r, i, arr) => (
                        <tr key={i} style={{ background: i === arr.length - 1 ? C.paleLime : i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: i === arr.length - 1 ? 700 : 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: i === arr.length - 1 ? 700 : 500, color: i === arr.length - 1 ? C.dark : C.ink }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Enter your own CTC, basic percentage, city type, and regime in the calculator above to run this same formula against your actual offer.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-structure">How Salary Structure Works</h2>
                <p style={p}>
                  An Indian salary structure has three main fixed components. Basic pay is the foundation, usually 40 to 50 per cent of the fixed CTC. House Rent Allowance (HRA) is set as a percentage of basic, conventionally 50 per cent in metro cities (Delhi, Mumbai, Kolkata, Chennai) and 40 per cent elsewhere.
                </p>
                <p style={p}>
                  After basic, HRA, employer PF, and the gratuity provision are allocated, whatever remains of the fixed CTC becomes special allowance, which is fully taxable. Some employers also carve out Leave Travel Allowance or meal coupons from this remainder, which the calculator above does not model separately.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link> to work out your exact tax-exempt HRA amount from your actual rent paid, rather than the flat percentage this calculator uses for a quick estimate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="lta-and-allowances">Leave Travel Allowance (LTA) and Other Common Salary Components</h2>
                <p style={p}>
                  Beyond basic, HRA, and special allowance, many offer letters list a handful of smaller named components. None of these change the core CTC-to-in-hand math this calculator performs, but each has its own rules worth knowing.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={thS} scope="col">How It Works</th></tr></thead>
                    <tbody>
                      {[
                        ['Leave Travel Allowance (LTA)', 'Tax-exempt under the old regime for actual domestic travel cost, twice in a block of four calendar years, on submission of travel proof. Fully taxable if unclaimed or under the new regime.'],
                        ['Meal Coupons / Food Allowance', 'A small tax-efficient component (commonly up to Rs 2,200 a month under older rules) provided as meal vouchers or a food card, available only under the old regime in most company policies.'],
                        ['Conveyance / Transport Allowance', 'A fixed monthly travel allowance, largely folded into special allowance and fully taxable in most current salary structures.'],
                        ['Telephone or Internet Reimbursement', 'A reimbursement-based component requiring actual bills, tax-free up to the reimbursed amount since it is treated as a business expense rather than income.'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, textAlign: 'left' }}>{r[0]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  This calculator folds all of these into the single special allowance figure for simplicity. If your offer letter itemises LTA, meal coupons, or reimbursements separately, your actual take-home may be marginally more tax-efficient than the calculator's estimate, since some of these carry small exemptions the flat special-allowance treatment does not model.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-structuring-differences">Why Two Offers With the Same CTC Give Different In-Hand Pay</h2>
                <p style={p}>
                  A common source of confusion: two people compare offer letters with an identical headline CTC and end up with noticeably different monthly in-hand salaries. The gap almost always comes from how each company structures the fixed CTC internally, not from any error in either offer.
                </p>
                {[
                  ['A higher basic percentage:', 'A company that sets basic at 60% of fixed CTC provisions more employer PF and gratuity out of the same total, leaving less as gross salary, even though the headline CTC number is identical to an offer with basic at 40%.'],
                  ['A bigger variable or bonus component:', 'One offer might guarantee the full CTC as fixed pay, while another loads 15-20% into a performance bonus. Both can quote the same annual CTC, but the guaranteed monthly cash flow is very different.'],
                  ['Industry convention:', 'IT services and startups commonly run leaner basic percentages (35-45%) with a larger special allowance, while traditional manufacturing and PSU-linked employers often run basic closer to 50-60% of CTC, following older compensation norms.'],
                  ['A one-time joining bonus folded into year-one CTC:', 'A signing bonus inflates the first year\'s CTC without changing the ongoing monthly structure, so a like-for-like comparison should look at year-two CTC, not year-one, once the joining bonus has already been paid out.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  Use the Basic Salary slider above to test your own offer's actual basic percentage rather than assuming the calculator's 50% default matches your specific company.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-by-career-stage">CTC Structure by Career Stage: Fresher vs Mid-Level vs Leadership</h2>
                <p style={p}>
                  The typical shape of a compensation package changes noticeably as seniority rises, not just its total size.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Career Stage</th><th style={thS} scope="col">Typical Variable Pay</th><th style={thS} scope="col">Common Extras</th></tr></thead>
                    <tbody>
                      {[
                        ['Fresher / 0-2 years', '0-10% of CTC', 'Mostly fixed pay, minimal or no variable component, no ESOPs'],
                        ['Mid-level / 3-8 years', '10-20% of CTC', 'Performance bonus becomes standard, occasional ESOP grants at product companies'],
                        ['Senior / 8-15 years', '15-25% of CTC', 'Larger annual bonus target, ESOP or RSU grants more common, sometimes a retention bonus'],
                        ['Leadership / 15+ years', '20-40%+ of CTC', 'Significant equity component, deferred bonus structures, executive perquisites folded into CTC'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, textAlign: 'left' }}>{r[0]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[1]}</td>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  As variable pay grows with seniority, the gap between headline CTC and guaranteed monthly in-hand widens too, which is why senior candidates should scrutinise the fixed-versus-variable split even more carefully than the CTC total itself. Use the Variable Pay slider in More Settings above to model this for your own level.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-govt-vs-private">Government and PSU CTC Structure vs Private Sector</h2>
                <p style={p}>
                  This calculator models a private-sector salary structure. Government and PSU compensation works differently in ways that matter if you are comparing an offer across both worlds.
                </p>
                {[
                  ['Pay follows a fixed Pay Matrix, not a negotiated CTC:', 'Central government employees are placed on a Pay Level under the 7th Pay Commission, with Basic Pay set by the matrix rather than negotiated as a percentage of a headline CTC figure.'],
                  ['HRA follows the X/Y/Z city classification:', 'Government HRA is 24%, 16%, or 8% of Basic plus DA depending on city class, a different system from the 50%/40% metro ceiling this calculator and Section 10(13A) use for private-sector exemption.'],
                  ['Dearness Allowance adds a separate, regularly revised layer:', 'DA is revised twice a year against an inflation index and paid on top of Basic Pay, something with no real equivalent in a typical private-sector CTC structure.'],
                  ['Variable pay is essentially absent:', 'Government and most PSU compensation has little to no performance-linked bonus component, unlike the private-sector variable pay this calculator lets you model.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  See the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link>&apos;s government employee section for the full X/Y/Z city classification table.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="employer-vs-employee-pf">Employer vs Employee PF, and Gratuity</h2>
                <p style={p}>
                  The Employees&apos; Provident Fund requires a 12 per cent contribution from both employer and employee on basic salary, both usually bundled into the CTC. Employer PF is deducted from CTC before your gross salary is calculated. Employee PF is then deducted from your gross salary before you receive your in-hand pay.
                </p>
                <p style={p}>
                  Gratuity, provisioned at 4.81 per cent of basic under the Payment of Gratuity Act, works the same way as employer PF: it sits inside your CTC and reduces your gross salary, but you only receive it as a lump sum after 5 years of continuous service. Use the <Link href="/calculators/gratuity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Gratuity Calculator</Link> to estimate the payout amount.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="epf-wage-ceiling">CTC and the EPF Wage Ceiling: Why Employer PF May Not Be 12% of Your Full Basic</h2>
                <p style={p}>
                  Statutory EPF law sets a wage ceiling of Rs 15,000 a month. Above this, mandatory 12% employer contribution technically applies only to Rs 15,000, not your full basic salary, unless your employer chooses to contribute on the actual higher basic.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Employer PF at a basic salary of Rs 60,000 a month, capped versus uncapped.</caption>
                    <thead><tr><th style={thS} scope="col">Approach</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Employer PF (Monthly)</th></tr></thead>
                    <tbody>
                      {[
                        ['Capped at statutory wage ceiling (12% of Rs 15,000)', 1800],
                        ['Uncapped, on full basic (12% of Rs 60,000)', 7200],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, textAlign: 'left' }}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(r[1] as number)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  In practice, most mid-size and large Indian employers voluntarily contribute on the full actual basic rather than capping at the statutory ceiling, since it is a low-cost retention benefit and this calculator assumes that common practice (12% of your full basic). If your specific employer caps employer PF at the statutory ceiling instead, your real gross salary, and therefore your real in-hand pay, will be slightly higher than this calculator shows, since less of your CTC is diverted into employer PF. Check your payslip's actual employer PF line if your basic salary is well above Rs 15,000 a month.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="basic-pct-impact">How Basic Salary Percentage Affects Your Take-Home</h2>
                <p style={p}>
                  A higher basic percentage is not automatically better. It raises statutory benefits like PF and gratuity, but it also raises the amount deducted from your own paycheck every month, since employee PF is calculated on basic too.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>
                      Live comparison at your current CTC of {fmtC(ctc1)}, {cityType === 'metro' ? 'metro' : 'non-metro'} city, {taxRegime === 'new' ? 'new' : 'old'} regime, across different basic-salary percentages.
                    </caption>
                    <thead><tr><th style={thS} scope="col">Basic %</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Basic (Monthly)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Employee PF</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly In-Hand</th></tr></thead>
                    <tbody>
                      {[30, 40, 50, 60].map(pct => {
                        const r = calcSalary(ctc1, pct, cityType, pfPct, profTax, variablePct1, taxRegime, d80C, d80D, homeLoanInt);
                        return (
                          <tr key={pct} style={{ borderBottom: `1px solid ${C.border}`, background: pct === basicPct1 ? C.paleLime : '#fafafa' }}>
                            <td style={{ ...tdL, fontWeight: 700 }}>{pct}%{pct === basicPct1 ? ' (current)' : ''}</td>
                            <td style={tdR}>{fmtIN(r.basicMonthly)}</td>
                            <td style={tdR}>-{fmtIN(r.employeePfMonthly)}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(r.inHandMonthly)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Under the new regime specifically, where HRA is not exempt from tax anyway, a lower basic percentage usually wins on pure monthly cash flow, since it means less compulsory PF deduction with no offsetting tax benefit. Under the old regime, a higher basic can partly pay for itself through a bigger HRA exemption if you pay meaningful rent, so the comparison is closer. Either way, a higher basic and gratuity provision does build a larger retirement corpus over time, so this is a cash-flow-versus-long-term-savings trade-off, not a simple "lower is always better" rule.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-impact">Old vs New Tax Regime: Impact on Your In-Hand Salary</h2>
                <p style={p}>
                  The tax regime you choose changes only the Income Tax TDS line in your salary breakup, but at higher CTC levels that line is large enough to shift your monthly in-hand pay noticeably. Toggle the Tax Regime switch in the calculator above to see both outcomes for your own CTC.
                </p>
                <p style={p}>
                  Under the new regime, taxable income up to Rs 12 lakh (after the Rs 75,000 standard deduction) pays no tax at all under Section 87A, which is why most salaried employees below roughly Rs 12.75 lakh CTC pay zero TDS regardless of regime choice. Above that level, the old regime only wins once your Section 80C, 80D, HRA exemption, and home loan interest deductions together clear a breakeven point that rises with income. For the full slab-by-slab comparison and a breakeven table across income levels, use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="variable-pay-reliability">How Much of Your Variable Pay Should You Actually Count On?</h2>
                <p style={p}>
                  Variable pay is part of CTC but not guaranteed, and treating the full target amount as certain income is one of the most common ways an offer looks better on paper than it turns out in practice.
                </p>
                {[
                  ['It is a target, not a guarantee:', 'A "20% variable pay" figure is the maximum payout at 100% of both individual and company performance. Actual payouts commonly land at 70-90% of target in a normal year, and can fall further in a weak year for the company.'],
                  ['Company performance multipliers apply on top of individual rating:', 'Even a top individual performance rating is usually multiplied by a company-wide performance factor, so your actual payout depends on business results you do not control.'],
                  ['Payout frequency affects cash flow planning:', 'Quarterly variable pay smooths out income, while a single annual payout concentrates it into one month, which matters for monthly budgeting even if the annual total is identical.'],
                  ['A conservative estimate is safer for financial planning:', 'For budgeting and loan eligibility purposes, treat only the fixed CTC as reliable income, and plan around 60-70% of target variable pay actually arriving, adjusting upward only once you have a track record with a specific employer.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
                <p style={{ ...p, margin: 0 }}>
                  Set the Variable Pay slider above to your realistic expected payout, not the headline target, to see a more honest in-hand estimate.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-offer-letter-checklist">Understanding Your Offer Letter: What to Check Beyond the CTC Number</h2>
                <p style={p}>
                  The headline CTC figure on page one is the easiest number to misread. Check these before comparing an offer to your current salary or to another offer.
                </p>
                {[
                  ['Fixed vs variable split:', 'Find the guaranteed fixed-pay line separately from the total CTC. A large variable or bonus component is not guaranteed income even though it is counted in the CTC total.'],
                  ['Joining bonus and its claw-back clause:', 'A signing bonus inflates year-one CTC and often comes with a clause requiring repayment if you leave before a set period, commonly 12 to 24 months.'],
                  ['Basic salary percentage:', 'A lower basic percentage means lower PF and gratuity, but also a smaller HRA exemption if you are on the old regime. Ask for the exact basic figure, not just the CTC total.'],
                  ['Notice period and buyout terms:', 'A longer notice period at your current job, or a required buyout to leave early, affects how quickly you can actually start a new offer and whether a counter-offer at your current employer is worth negotiating instead.'],
                  ['ESOPs or deferred stock:', 'Equity grants are sometimes included in a CTC figure at a notional value. They are not cash, vest over several years, and their eventual value is not guaranteed.'],
                  ['Relocation and other one-time allowances:', 'A one-time relocation or joining allowance is not part of your ongoing monthly compensation, even if it is bundled into the offer letter\'s CTC presentation.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-negotiation">How To Negotiate Salary Offers</h2>
                <p style={p}>
                  When negotiating an offer, focus on the fixed components rather than the headline CTC. A high CTC skewed towards variable pay or a one-time joining bonus produces a lower guaranteed monthly in-hand salary than a lower CTC with a stronger fixed component.
                </p>
                <p style={p}>
                  Ask HR for the exact basic salary and special allowance figures rather than accepting the CTC total alone. A higher basic salary raises your guaranteed monthly income and also increases statutory benefits like gratuity and PF, which are both calculated as a percentage of basic. Run both offers through the Offer Comparison tab above before deciding.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  If you are evaluating an appraisal or counter-offer at your current employer instead of a new offer, the <Link href="/calculators/salary-hike-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Salary Hike Calculator</Link> shows your real in-hand increase after accounting for the higher tax bracket.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="negotiation-case-study">A Full Negotiation Case Study: Before and After</h2>
                <p style={p}>
                  A candidate is offered Rs 13,00,000 CTC (metro, 50% basic, new regime) and successfully negotiates it up to Rs 14,50,000, an 11.5% increase on paper.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Computed using this calculator's own formula, metro city, 50% basic, new regime, no variable pay.</caption>
                    <thead><tr><th style={thS} scope="col">Figure</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Original Offer (Rs 13L)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Negotiated (Rs 14.5L)</th></tr></thead>
                    <tbody>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: C.white }}>
                        <td style={{ ...tdL, textAlign: 'left' }}>Monthly Gross Salary</td>
                        <td style={tdR}>{fmtIN(99228)}</td>
                        <td style={tdR}>{fmtIN(110677)}</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#fafafa' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.dark, textAlign: 'left' }}>Monthly In-Hand</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(92528)}</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(98623)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The 11.5% CTC increase translates to about {fmtIN(6095)} more in monthly in-hand pay, or {fmtIN(73140)} more a year, a 6.6% increase in actual take-home. The in-hand percentage gain is smaller than the CTC percentage gain because the extra amount pushes more of the increase through employer PF, gratuity, employee PF, and tax, not because anything went wrong in the negotiation. This is the same gap that shows up throughout this page between a CTC number and a take-home number, just applied to a real negotiation outcome.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-mistakes">Common Mistakes When Evaluating a CTC Offer</h2>
                {[
                  ['Treating CTC as take-home pay:', 'CTC includes employer PF, gratuity provisioning, and often variable pay, none of which land in your account every month. Use this calculator\'s in-hand figure, not the CTC number, when budgeting.'],
                  ['Comparing two offers by CTC alone:', 'As covered above, identical CTC figures can hide very different basic percentages, variable splits, and fixed-pay guarantees. Compare fixed pay and in-hand salary directly, not just the total.'],
                  ['Ignoring how basic percentage affects deductions:', 'A higher basic percentage is not free money: it raises your own PF deduction along with the benefits, as shown in the basic-percentage table above.'],
                  ['Assuming the same CTC repeats next year:', 'A joining bonus, one-time relocation allowance, or an unusually rich year-one variable target can all make year-one CTC higher than what a stable, ongoing year actually looks like.'],
                  ['Forgetting professional tax and regime choice change the final number:', 'Professional tax is a small but real monthly deduction that varies by state, and the tax regime you select changes the TDS line materially at higher CTC levels. Both are easy to overlook when mentally estimating in-hand pay.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="example-breakups">Example Salary Breakups by CTC Tier</h2>
                <p style={p}>
                  The table below shows the actual in-hand salary at common CTC levels under the new tax regime, assuming a metro city, 50 per cent basic salary, 12 per cent employee PF, and Rs 200 monthly professional tax.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', padding: '12px 0', fontSize: 12, color: C.ink3, textAlign: 'left' }}>
                      Estimated monthly figures for common CTC tiers, metro city, 50% basic salary, 12% employee PF, new tax regime, no variable pay.
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" style={thS}>Annual CTC</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly Gross</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Employee PF</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Prof. Tax</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly TDS</th>
                        <th scope="col" style={{ ...thS, textAlign: 'right' }}>Monthly In-Hand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[300000, 500000, 800000, 1000000, 1500000, 2000000, 3000000].map(c => {
                        const r = calcSalary(c, 50, 'metro', 12, 200, 0, 'new');
                        return (
                          <tr key={c}>
                            <td style={{ ...tdL, fontWeight: 600 }}>{fmtC(c)}</td>
                            <td style={tdR}>{fmtIN(r.grossMonthly)}</td>
                            <td style={tdR}>{fmtIN(r.employeePfMonthly)}</td>
                            <td style={tdR}>{fmtIN(r.profTaxMonthly)}</td>
                            <td style={tdR}>{r.tdsMonthly > 0 ? fmtIN(r.tdsMonthly) : 'Nil'}</td>
                            <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtIN(r.inHandMonthly)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculator-limitations">Limitations of This Calculator</h2>
                {[
                  ['Basic, HRA, and special allowance are modeled as flat percentages:', 'Real salary structures sometimes carve out Leave Travel Allowance, meal coupons, or other named allowances separately. This calculator folds everything beyond basic and HRA into a single special allowance figure.'],
                  ['HRA exemption is not computed here:', 'The calculator shows the HRA component of your salary, not the tax-exempt portion of it. Use the HRA Calculator for the actual Section 10(13A) exemption based on your real rent paid.'],
                  ['Old-regime deductions are user-entered totals:', 'Section 80C, 80D, and home loan interest figures you enter in More Settings are not independently validated against their statutory caps or your actual proof of investment.'],
                  ['Professional tax uses a single monthly figure:', 'Actual professional tax slabs and annual caps vary by state. The default and any value you enter is a flat estimate, not a state-specific slab calculation.'],
                  ['Employer PF assumes 12% of full basic, not the statutory wage ceiling:', 'As covered in the EPF Wage Ceiling section above, this matches common employer practice but not every company. If your employer caps employer PF at the Rs 15,000 statutory wage ceiling instead, your real gross and in-hand pay will be slightly higher than shown here.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="key-takeaways">Key Takeaways</h2>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>CTC is never the amount that reaches your bank account. Employer PF, gratuity provisioning, and often variable pay are all counted in CTC but never appear as monthly cash flow.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Two offers with an identical CTC can produce meaningfully different in-hand pay, driven by basic percentage, variable split, and industry convention, not by any error in either offer.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>A higher basic salary percentage is a trade-off, not a free upgrade: it builds a larger PF and gratuity corpus over time but usually reduces monthly take-home cash flow today, especially under the new tax regime.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Below roughly Rs 12.75 lakh CTC, the tax regime choice barely matters since the new regime's Section 87A rebate already brings tax to nil. Above that, check both regimes explicitly rather than assuming the new regime always wins.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-calculate">How to Use This CTC Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your Annual CTC:</strong> input the total Cost to Company offered by your employer, or pick a quick preset.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Set Basic Salary, City Type, and Tax Regime:</strong> these three drive HRA, PF, gratuity, and your income tax automatically.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Open More Settings:</strong> fine-tune variable pay, employee PF percentage, professional tax, and old-regime deductions if applicable.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review the breakdown:</strong> the result panel shows your full monthly figures, and the N-Year CTC &amp; Take-Home Growth chart projects how they change over time.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Use Offer Comparison for two offers:</strong> switch tabs to compare two CTCs side by side under the same city and regime assumptions.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-glossary">CTC Glossary: Key Terms Explained</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['CTC (Cost to Company)', 'The total annual cost an employer bears for an employee: fixed pay, variable pay, employer PF, gratuity provisioning, and other benefits combined.'],
                        ['Fixed CTC', 'CTC minus any variable or bonus component, the guaranteed portion of your total package.'],
                        ['Basic Salary', 'The core, non-allowance component of pay that HRA, employer PF, employee PF, and gratuity are all calculated as a percentage of.'],
                        ['Gross Salary', 'Fixed CTC minus employer PF and gratuity provisioning; the salary figure before your own deductions are subtracted.'],
                        ['Special Allowance', 'The fully taxable remainder of gross salary once basic and HRA are allocated.'],
                        ['In-Hand / Net Salary', 'Gross salary minus employee PF, professional tax, and income tax TDS; the amount actually credited to your bank account.'],
                        ['Employer PF vs Employee PF', 'Employer PF is the company\'s own 12% contribution, part of CTC but never paid to you directly. Employee PF is your own 12% contribution, deducted from gross salary.'],
                        ['Gratuity', 'A lump-sum benefit under the Payment of Gratuity Act, provisioned at 4.81% of basic inside CTC, paid out only after 5 years of continuous service.'],
                        ['Professional Tax', 'A small state-levied monthly tax on salaried income, varying by state, deducted directly from gross salary.'],
                      ].map((r) => (
                        <tr key={r[0]} style={{ background: C.white }}>
                          <td style={{ ...tdL, fontWeight: 600, whiteSpace: 'nowrap' }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. The CTC Calculator provides an estimate based on standard Indian salary structure conventions and statutory deduction rules. Actual in-hand salary may vary based on your company&apos;s specific policies, optional allowances, and your individual tax situation. This calculator is for educational and planning purposes only and does not constitute financial or tax advice. Consult a qualified tax professional or your HR department before making financial decisions.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.ctc-sidebar::-webkit-scrollbar{width:5px}.ctc-sidebar::-webkit-scrollbar-track{background:transparent}.ctc-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.ctc-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="ctc-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                  {[
                    ['Employee PF', '12% of basic salary'],
                    ['Employer PF', '12% of basic (in CTC, not paid to you)'],
                    ['Gratuity provision', '4.81% of basic (in CTC)'],
                    ['HRA (metro)', '50% of basic salary'],
                    ['HRA (non-metro)', '40% of basic salary'],
                    ['Max professional tax', 'Rs 2,500/year'],
                  ].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <SidebarList title="Popular Calculators" items={POPULAR} />
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/in-hand-salary-calculator|In-Hand Salary', '/calculators/old-vs-new-tax-regime-calculator|Old vs New Tax Regime', '/calculators/hra-calculator|HRA', '/calculators/gratuity-calculator|Gratuity', '/calculators/income-tax-calculator|Income Tax', '/calculators/sip-calculator|SIP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

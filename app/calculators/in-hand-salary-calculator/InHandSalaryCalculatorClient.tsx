'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useLayoutEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { pipeColumns } from '../../../src/components/common/footerLinks';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
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

const CTC_PRESETS = [240000, 360000, 480000, 600000, 900000, 1200000, 1800000, 2400000];

/* ─── Income Tax Calculation ─────────────────────────────────── */
function calcAnnualTax(annualGross: number, regime: 'new' | 'old', d80C: number, d80D: number = 0, homeLoanInt: number = 0): number {
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

/* ─── Donut Chart ────────────────────────────────────────────── */
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

/* ─── N-Year In-Hand Salary Growth (VPF pattern: collapsible stacked bar chart + table) ─── */
interface InHandYear { year: number; ctc: number; grossMonthly: number; deductionsMonthly: number; inHandMonthly: number; }

function buildInHandProjection(
  baseCtc: number, basicPct: number, hraPct: number, otherAllowances: number, pfPct: number, profTax: number,
  taxRegime: 'new' | 'old', deductions80C: number, variablePct: number, perquisite: number, deductions80D: number, homeLoanInt: number,
  growthPct: number, years: number
): InHandYear[] {
  const rows: InHandYear[] = [];
  const rate = Math.max(0, growthPct) / 100;
  for (let y = 1; y <= years; y++) {
    const ctcY = baseCtc * Math.pow(1 + rate, y);
    const variableAnnual = Math.round(ctcY * variablePct / 100);
    const fixedCtcMonthly = (ctcY - variableAnnual) / 12;
    const basicMonthly = Math.round(fixedCtcMonthly * basicPct / 100);
    const employerPfMonthly = Math.round(basicMonthly * 0.12);
    const gratuityMonthly = Math.round(basicMonthly * 0.0481);
    const grossMonthly = Math.round(fixedCtcMonthly - employerPfMonthly - gratuityMonthly + otherAllowances / 12);
    const pfMonthly = Math.round(basicMonthly * pfPct / 100);
    const annualTaxableGross = grossMonthly * 12 + variableAnnual + perquisite;
    const autoAnnualTax = calcAnnualTax(annualTaxableGross, taxRegime, deductions80C, deductions80D, homeLoanInt);
    const autoMonthlyTax = Math.round(autoAnnualTax / 12);
    const totalDed = pfMonthly + profTax + autoMonthlyTax;
    rows.push({ year: y, ctc: ctcY, grossMonthly, deductionsMonthly: totalDed, inHandMonthly: grossMonthly - totalDed });
  }
  return rows;
}

function InHandGrowthChart({ rows }: { rows: InHandYear[] }) {
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
  { href: '/calculators/ctc-calculator',                     label: 'CTC Calculator' },
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator',   label: 'Old vs New Tax Regime' },
  { href: '/calculators/hra-calculator',                     label: 'HRA Calculator' },
  { href: '/calculators/gratuity-calculator',                label: 'Gratuity Calculator' },
  { href: '/calculators/salary-hike-calculator',             label: 'Salary Hike Calculator' },
  { href: '/calculators/sip-calculator',                     label: 'SIP Calculator' },
];
const MORE = [
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
  { href: '/calculators/percentage-calculator',              label: 'Percentage Calculator' },
  { href: '/calculators/gst-calculator',                     label: 'GST Calculator' },
  { href: '/calculators/ppf-calculator',                     label: 'PPF Calculator' },
  { href: '/calculators/compound-interest-calculator',       label: 'Compound Interest Calculator' },
];

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function InHandSalaryCalculatorClient() {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showGrowth, setShowGrowth] = useState(false);

  const defaultSettings = {
    ctc: 1200000, basicPct: 40, hraPct: 20, otherAllowances: 0,
    pfPct: 12, profTax: 200, taxRegime: 'new' as 'new' | 'old',
    deductions80C: 0, variablePct: 0, perquisite: 0,
    deductions80D: 0, homeLoanInt: 0,
    ctcGrowth: 8, projectionYears: 5,
  };
  const { settings, updateSettings } = useCalculatorSettings('in-hand-salary-calculator', defaultSettings);
  const { ctc, basicPct, hraPct, otherAllowances, pfPct, profTax, taxRegime, deductions80C, variablePct, perquisite, deductions80D, homeLoanInt, ctcGrowth, projectionYears } = settings;

  const setCtc             = (v: number) => updateSettings({ ctc: v });
  const setBasicPct        = (v: number) => updateSettings({ basicPct: v });
  const setHraPct          = (v: number) => updateSettings({ hraPct: v });
  const setOtherAllowances = (v: number) => updateSettings({ otherAllowances: v });
  const setPfPct           = (v: number) => updateSettings({ pfPct: v });
  const setProfTax         = (v: number) => updateSettings({ profTax: v });
  const setTaxRegime       = (v: 'new' | 'old') => updateSettings({ taxRegime: v });
  const setDeductions80C   = (v: number) => updateSettings({ deductions80C: v });
  const setVariablePct     = (v: number) => updateSettings({ variablePct: v });
  const setPerquisite      = (v: number) => updateSettings({ perquisite: v });
  const setDeductions80D   = (v: number) => updateSettings({ deductions80D: v });
  const setHomeLoanInt     = (v: number) => updateSettings({ homeLoanInt: v });
  const setCtcGrowth       = (v: number) => updateSettings({ ctcGrowth: v });
  const setProjectionYears = (v: number) => updateSettings({ projectionYears: v });

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));

  /* Correct CTC breakdown: employer PF and gratuity are inside CTC but NOT in gross salary */
  const variableAnnual    = Math.round(ctc * variablePct / 100);
  const fixedCtcMonthly   = (ctc - variableAnnual) / 12;
  const basicMonthly      = Math.round(fixedCtcMonthly * basicPct / 100);
  const hraMonthly        = Math.round(fixedCtcMonthly * hraPct / 100);
  const employerPfMonthly = Math.round(basicMonthly * 0.12);
  const gratuityMonthly   = Math.round(basicMonthly * 0.0481);
  const grossMonthly      = Math.round(fixedCtcMonthly - employerPfMonthly - gratuityMonthly + otherAllowances / 12);
  const otherAllowMonthly = Math.max(0, grossMonthly - basicMonthly - hraMonthly);
  const pfMonthly         = Math.round(basicMonthly * pfPct / 100);

  /* Tax on full annual income (fixed gross + variable + perquisite) */
  const annualTaxableGross = grossMonthly * 12 + variableAnnual + perquisite;
  const autoAnnualTax      = calcAnnualTax(annualTaxableGross, taxRegime, deductions80C, deductions80D, homeLoanInt);
  const autoMonthlyTax     = Math.round(autoAnnualTax / 12);

  const otherRegime     = taxRegime === 'new' ? 'old' : 'new';
  const otherAnnualTax  = calcAnnualTax(annualTaxableGross, otherRegime, deductions80C, deductions80D, homeLoanInt);
  const otherMonthlyTax = Math.round(otherAnnualTax / 12);
  const monthlySaving   = otherMonthlyTax - autoMonthlyTax;

  const totalDed  = pfMonthly + profTax + autoMonthlyTax;
  const inHand    = grossMonthly - totalDed;
  const inHandPct = Math.max(1, Math.min(99, Math.round((inHand / (ctc / 12)) * 100)));
  const dedPct    = 100 - inHandPct;

  const inHandProjection = buildInHandProjection(ctc, basicPct, hraPct, otherAllowances, pfPct, profTax, taxRegime, deductions80C, variablePct, perquisite, deductions80D, homeLoanInt, ctcGrowth, projectionYears);

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
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>

      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            In-Hand Salary Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your monthly take-home salary from CTC with automatic income tax under old or new regime. Full salary breakup with PF, professional tax, and net pay.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="In-Hand Salary Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} role="group" aria-label="Quick CTC presets">
                        {CTC_PRESETS.map(v => (
                          <button key={v} onClick={() => setCtc(v)}
                            aria-pressed={ctc === v}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: ctc === v ? C.ink : C.ink3,
                              border: `${ctc === v ? 1.5 : 1}px solid ${ctc === v ? C.ink : C.border}`,
                              fontWeight: ctc === v ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {v >= 10000000 ? `${v / 10000000}Cr` : `${(v / 100000).toString().replace(/\.0$/, '')}L`}
                          </button>
                        ))}
                      </div>
                      <Slider label="Annual CTC" id="salary-ctc" value={ctc} min={200000} max={50000000} step={50000} fmt={v => fmtC(v)} onChange={setCtc} compact={mobile} />
                      <Slider label="Basic Salary (% of CTC)" id="salary-basic" value={basicPct} min={20} max={70} step={1} fmt={v => `${v}%`} onChange={setBasicPct} compact={mobile} />
                      <Slider label="HRA (% of CTC)" id="salary-hra" value={hraPct} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setHraPct} compact={mobile} />
                      <Slider label="Variable Pay (% of CTC)" id="salary-variable" value={variablePct} min={0} max={50} step={1} fmt={v => `${v}%`} onChange={setVariablePct} compact={mobile} />

                      {/* Tax Regime Toggle */}
                      <div style={{ marginBottom: mobile ? 18 : 28 }}>
                        <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>Tax Regime</p>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {(['new', 'old'] as const).map(regime => (
                            <button key={regime} onClick={() => setTaxRegime(regime)}
                              aria-pressed={taxRegime === regime}
                              style={{
                                flex: 1, padding: '9px 0', borderRadius: 8, border: `1.5px solid ${taxRegime === regime ? C.dark : C.border}`,
                                background: taxRegime === regime ? C.dark : C.white, color: taxRegime === regime ? C.lime : C.ink2,
                                fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: INTER, transition: 'all 0.15s',
                              }}>
                              {regime === 'new' ? 'New Regime' : 'Old Regime'}
                            </button>
                          ))}
                        </div>
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
                      <Slider label="Other Allowances (Annual)" id="salary-other" value={otherAllowances} min={0} max={5000000} step={10000} fmt={v => fmtC(v)} onChange={setOtherAllowances} compact={mobile} />
                      <Slider label="Employee PF (% of Basic)" id="salary-pf" value={pfPct} min={0} max={20} step={0.5} fmt={v => `${v}%`} onChange={setPfPct} compact={mobile} />
                      <Slider label="Professional Tax (Monthly)" id="salary-prof" value={profTax} min={0} max={5000} step={50} fmt={v => fmtC(v)} onChange={setProfTax} compact={mobile} />
                      <Slider label="Perquisite Income (Annual)" id="salary-perq" value={perquisite} min={0} max={5000000} step={50000} fmt={v => fmtC(v)} onChange={setPerquisite} compact={mobile} />
                      {taxRegime === 'old' && (
                        <>
                          <Slider label="Section 80C Investments" id="salary-80c" value={deductions80C} min={0} max={150000} step={5000} fmt={v => fmtC(v)} onChange={setDeductions80C} compact={mobile} />
                          <Slider label="Health Insurance 80D" id="salary-80d" value={deductions80D} min={0} max={50000} step={1000} fmt={v => fmtC(v)} onChange={setDeductions80D} compact={mobile} />
                          <Slider label="Home Loan Interest (Sec 24b)" id="salary-homeloan" value={homeLoanInt} min={0} max={200000} step={5000} fmt={v => fmtC(v)} onChange={setHomeLoanInt} compact={mobile} />
                        </>
                      )}
                      <Slider label="Annual CTC Growth" id="salary-ctc-growth" value={ctcGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setCtcGrowth} compact={mobile} />
                      <Slider label="Projection Years" id="salary-years" value={projectionYears} min={2} max={15} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                        CTC growth and projection years feed the N-Year In-Hand Salary Growth chart below the calculator.
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
                  {/* Dark box */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>In-Hand Salary</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{taxRegime === 'new' ? 'New Regime' : 'Old Regime'}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`In-hand salary: ${fmtC(inHand)} per month`}>
                        {fmtC(inHand)}
                      </div>
                      <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>per month</div>
                    </div>
                  </div>

                  <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: mobile ? '8px 12px' : '10px 14px', textAlign: 'center', marginBottom: 8, width: '100%' }}>
                    <span style={{ fontSize: 12.5, color: C.ink3 }}>Annual take-home: <strong style={{ color: C.ink }}>{fmtC(Math.round(inHand * 12))}</strong></span>
                  </div>

                  {monthlySaving > 0 && (
                    <div style={{ background: '#F0FBE4', border: '1px solid #C6E99A', borderRadius: 8, padding: '8px 14px', textAlign: 'center', marginBottom: 8, width: '100%' }}>
                      <span style={{ fontSize: 12.5, color: '#1f7a58', fontWeight: 600 }}>
                        You save {fmtC(monthlySaving)}/month vs {otherRegime === 'new' ? 'New' : 'Old'} Regime
                      </span>
                    </div>
                  )}
                  {monthlySaving < 0 && (
                    <div style={{ background: '#FFF8EC', border: '1px solid #F5D78A', borderRadius: 8, padding: '8px 14px', textAlign: 'center', marginBottom: 8, width: '100%' }}>
                      <span style={{ fontSize: 12.5, color: '#7A5C0A', fontWeight: 600 }}>
                        Switch to {otherRegime === 'new' ? 'New' : 'Old'} Regime to save {fmtC(Math.abs(monthlySaving))}/month
                      </span>
                    </div>
                  )}

                  {/* Donut: order -1 = top on desktop, order 1 = bottom on mobile */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 0, order: mobile ? 1 : -1 }}>
                    <DonutChart inHandPct={inHandPct} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 4, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>In-Hand {inHandPct}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: '#2d9970' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Deductions {dedPct}%</span>
                    </div>
                  </div>

                  {/* Earnings */}
                  <SectionLabel label="Earnings" />
                  <Row label="Basic Salary" value={fmtC(basicMonthly)} />
                  <Row label="HRA" value={fmtC(hraMonthly)} />
                  <Row label="Special Allowance" value={fmtC(otherAllowMonthly)} />
                  {variablePct > 0 && <Row label="Variable Pay (avg/month)" value={fmtC(Math.round(variableAnnual / 12))} />}
                  <Row label="Gross Salary" value={fmtC(grossMonthly)} />

                  {/* Deductions */}
                  <SectionLabel label="Deductions" />
                  <Row label="Employee PF" value={`-${fmtC(pfMonthly)}`} sub />
                  <Row label="Professional Tax" value={`-${fmtC(profTax)}`} sub />
                  <Row label={`Income Tax TDS (${taxRegime === 'new' ? 'New' : 'Old'} Regime)`} value={autoMonthlyTax > 0 ? `-${fmtC(autoMonthlyTax)}` : 'Nil'} sub />
                  <Row label="Total Deductions" value={`-${fmtC(totalDed)}`} />
                </div>
              </div>

              {/* N-Year In-Hand Salary Growth (collapsible, VPF pattern) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowGrowth(v => !v)}
                  aria-expanded={showGrowth} aria-controls="in-hand-growth-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>N-Year In-Hand Salary Growth</span>
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
                  <div id="in-hand-growth-table" style={{ borderTop: `1px solid ${C.border}` }}>
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
                      <InHandGrowthChart rows={inHandProjection} />
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
                          {inHandProjection.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(Math.round(row.ctc))}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.grossMonthly)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>-{fmtC(row.deductionsMonthly)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 700 }}>{fmtC(row.inHandMonthly)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: mobile ? '16px' : '20px 44px 28px' }}>
                      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        At {ctcGrowth.toFixed(1)}% annual CTC growth, your monthly in-hand goes from {fmtC(inHand)} today to about {fmtC(inHandProjection[inHandProjection.length - 1]?.inHandMonthly ?? inHand)} by year {projectionYears}, holding your basic percentage, HRA percentage, and tax regime constant throughout. Deductions grow faster than in-hand pay once your income crosses into a higher tax slab, so the gap between the two bars typically widens in the later years.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Waitlist */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-in-hand-salary">What Is In-Hand Salary?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    In-hand salary, also called take-home pay or net salary, is the amount that actually gets credited to your bank account each month after all deductions are subtracted from your gross salary. It is what you keep, not what your employer spends on you.
                  </p>
                </div>
                <p style={p}>
                  Your CTC (Cost to Company) includes employer-side costs like employer PF contribution, gratuity, and insurance premiums that you never receive directly. This is why your in-hand salary is typically 15-25 per cent lower than your monthly CTC equivalent. Understanding the gap between CTC and in-hand pay is essential when evaluating job offers or planning your monthly budget.
                </p>
                <p style={p}>
                  The three main deductions from your gross salary are: Employee Provident Fund (12 per cent of basic), Professional Tax (state-dependent, up to Rs 2,500 per year), and Income Tax TDS (based on your tax regime and applicable slab rates). The calculator above computes TDS automatically under either the old or new regime.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="in-hand-salary-formula">In-Hand Salary Formula and Calculation</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    In-Hand Salary = Gross Salary minus (Employee PF + Professional Tax + Income Tax TDS)
                  </code>
                </div>
                <p style={p}>
                  Gross salary is the sum of basic salary, HRA, special allowances, and any other allowances paid by the employer. It excludes employer-side costs like employer PF, gratuity, and insurance premiums.
                </p>
                <p style={p}>
                  <strong>Example:</strong> CTC of Rs 12,00,000 per year. Basic salary at 40 per cent = Rs 40,000 per month. HRA at 20 per cent = Rs 20,000 per month. Employer PF (12 per cent of basic) = Rs 4,800. Gratuity (4.81 per cent of basic) = Rs 1,924. Gross salary = Rs 12,00,000 minus Rs 4,800 minus Rs 1,924 per month = Rs 93,276 per month. Special allowance = Rs 33,276. Employee PF at 12 per cent of basic = Rs 4,800. Professional Tax = Rs 200. Income Tax TDS (new regime, FY 2026-27) = Nil (annual gross Rs 11,19,312 is below Rs 12 lakh rebate threshold). In-hand salary = Rs 88,276 per month.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-breakup-example">Salary Breakup Example (CTC Rs 12,00,000)</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Sample salary breakup for CTC of Rs 12,00,000 per annum</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Monthly (Rs)</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">% of CTC</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic Salary', '40,000', '40.0%'],
                        ['HRA', '20,000', '20.0%'],
                        ['Special Allowance', '33,276', '33.3%'],
                        ['Employer PF (12% basic, in CTC)', '4,800', '4.8%'],
                        ['Gratuity (4.81% basic, in CTC)', '1,924', '1.9%'],
                        ['Gross Salary', '93,276', '93.3%'],
                        ['Employee PF (12% of basic)', '-4,800', '-4.8%'],
                        ['Professional Tax', '-200', '-0.2%'],
                        ['Income Tax TDS (new regime)', 'Nil', '0%'],
                        ['In-Hand Salary', '88,276', '88.3%'],
                      ].map((r, i) => {
                        const isTotal = r[0] === 'In-Hand Salary' || r[0] === 'Gross Salary';
                        return (
                          <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: isTotal ? C.ink : C.ink2, fontWeight: isTotal ? 700 : 400, border: `1px solid ${C.border}` }}>{r[0]}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: isTotal ? C.ink : C.ink2, fontWeight: isTotal ? 700 : 400, textAlign: 'right', border: `1px solid ${C.border}` }}>Rs {r[1]}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: isTotal ? C.ink : C.ink2, fontWeight: isTotal ? 700 : 400, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[2]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="ctc-vs-gross-vs-net">CTC vs Gross Salary vs Net Salary</h2>
                <p style={p}>
                  These three terms represent different amounts. CTC is the total employer cost, gross salary is what you earn before deductions, and net salary (in-hand) is what you actually receive.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Difference between CTC, gross salary, and net salary</caption>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Includes</th><th style={thS} scope="col">Excludes</th></tr></thead>
                    <tbody>
                      {[
                        ['CTC', 'Basic + HRA + Allowances + Employer PF + Gratuity + Bonus + Insurance', 'Nothing (it is the total cost)'],
                        ['Gross Salary', 'Basic + HRA + Allowances + Bonus', 'Employer PF, Gratuity, Insurance'],
                        ['Net Salary (In-Hand)', 'Gross Salary minus Deductions', 'Employee PF, Professional Tax, Income Tax TDS'],
                      ].map(([t, incl, excl]) => (
                        <tr key={t as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td>
                          <td style={tdR}>{incl}</td>
                          <td style={tdL}>{excl}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="pf-and-professional-tax">PF and Professional Tax Deductions</h2>
                <p style={p}>
                  Employee Provident Fund (EPF) is a mandatory retirement savings scheme regulated by the <a href="https://epfindia.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>EPFO</a>. The employee contributes 12 per cent of basic salary. The employer contributes 12 per cent of basic, split into 8.33 per cent towards EPS (Employee Pension Scheme) and 3.67 per cent towards EPF. The EPF account earns interest at a rate set annually by the EPFO, which was 8.25 per cent for FY 2025-26.
                </p>
                <p style={p}>
                  Professional tax is a state-level tax on salaried employees. The maximum amount across states is Rs 2,500 per year. The table below shows the rate for major states.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>State-wise professional tax rates for salaried employees (2025)</caption>
                    <thead><tr><th style={thS} scope="col">State</th><th style={thS} scope="col">Monthly Professional Tax</th><th style={thS} scope="col">Threshold</th></tr></thead>
                    <tbody>
                      {[
                        ['Karnataka', 'Rs 200/month', 'Salary above Rs 15,000'],
                        ['Maharashtra', 'Rs 175-300/month', 'Based on salary slab'],
                        ['Tamil Nadu', 'Up to Rs 208/month', 'Salary above Rs 21,000'],
                        ['West Bengal', 'Rs 110-200/month', 'Based on salary slab'],
                        ['Telangana', 'Rs 150-200/month', 'Based on salary slab'],
                        ['Andhra Pradesh', 'Rs 150-200/month', 'Based on salary slab'],
                        ['Gujarat', 'Rs 200/month', 'Salary above Rs 12,000'],
                        ['Madhya Pradesh', 'Rs 208/month', 'Salary above Rs 25,000'],
                        ['Delhi', 'Nil', 'No professional tax'],
                        ['Haryana', 'Nil', 'No professional tax'],
                        ['Rajasthan', 'Nil', 'No professional tax'],
                        ['Uttar Pradesh', 'Nil', 'No professional tax'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}` }}>{r[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Use the <Link href="/calculators/gratuity-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Gratuity Calculator</Link> to estimate your gratuity amount and understand how it fits into your overall compensation structure.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="salary-components-explained">Salary Components Explained</h2>
                <p style={p}>A typical Indian salary structure includes these components:</p>
                <div>
                  {[
                    ['Basic Salary:', 'The core component, typically 40-50 per cent of CTC. It determines PF, gratuity, and HRA calculations. A higher basic means higher retirement benefits but also higher PF deductions.'],
                    ['House Rent Allowance (HRA):', 'Paid to cover rental expenses. Company policy sets the percentage of basic; it varies widely and is not fixed by law. Tax exemption under Section 10(13A), old regime only, is the smallest of: actual HRA received, rent paid minus 10 per cent of basic, or 50 per cent of basic in a metro city (40 per cent elsewhere).'],
                    ['Special Allowance:', 'The balancing figure that makes up the difference between CTC and the sum of other components. Fully taxable.'],
                    ['Performance Bonus:', 'Variable pay based on individual and company performance. Typically 10-20 per cent of CTC. Taxed in the year of receipt.'],
                    ['Employer PF:', '12 per cent of basic paid by the employer. Not deducted from your salary. It is an additional cost to the company and part of your CTC.'],
                    ['Gratuity:', '4.81 per cent of basic salary. Paid when you leave after 5 years of service. It is an employer cost, not deducted from your pay.'],
                  ].map(([title, text]) => (
                    <div key={title as string} style={{ marginBottom: 14 }}>
                      <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                      <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                    </div>
                  ))}
                </div>
                <p style={{ ...p, marginTop: 6, marginBottom: 0 }}>
                  Use the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link> to work out your exact exemption from your actual rent and basic salary, or the <Link href="/calculators/ctc-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CTC Calculator</Link> for a full breakdown of every component from your offer letter figure.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="income-tax-on-salary">Income Tax on Salary: TDS Calculation</h2>
                <p style={p}>
                  Income tax on salary is deducted at source (TDS) by your employer every month based on your estimated annual tax liability. Your employer asks you to declare expected investments and choose between the old and new tax regime at the start of the financial year.
                </p>
                <p style={p}>
                  The calculator above automatically computes your estimated TDS based on the regime you select. Under the new regime for FY 2026-27, salary up to Rs 12,75,000 (after standard deduction of Rs 75,000) is effectively tax-free due to the rebate under Section 87A. Use the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link> for a detailed comparison with all deduction inputs.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="fy-vs-ay">Financial Year vs Assessment Year</h2>
                <p style={p}>
                  The Financial Year (FY) is the 12-month period, April to March, in which you actually earn your salary. The Assessment Year (AY) is the year immediately after, when that income is assessed and taxed. Salary earned between April 2026 and March 2027 falls in FY 2026-27, and is assessed and filed as AY 2027-28.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Your monthly TDS is deducted during the financial year based on your employer's estimate of your full-year tax. You reconcile the exact figure, and claim any refund or pay any shortfall, when you file your income tax return for that year in the following assessment year.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-slabs">Income Tax Slabs for Salaried Employees, FY 2026-27</h2>
                <p style={p}>
                  Your monthly TDS is computed by applying these slab rates to your annual taxable income, then dividing by 12. The old and new regime slabs are structured very differently, which is why the same salary can produce very different take-home pay depending on which one you pick.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>New tax regime slab rates, FY 2026-27. Standard deduction Rs 75,000. Section 87A rebate makes tax nil up to Rs 12,00,000 taxable income.</caption>
                    <thead><tr><th style={thS} scope="col">Taxable Income Slab</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['Up to Rs 4,00,000', 'Nil'],
                        ['Rs 4,00,001 to Rs 8,00,000', '5%'],
                        ['Rs 8,00,001 to Rs 12,00,000', '10%'],
                        ['Rs 12,00,001 to Rs 16,00,000', '15%'],
                        ['Rs 16,00,001 to Rs 20,00,000', '20%'],
                        ['Rs 20,00,001 to Rs 24,00,000', '25%'],
                        ['Above Rs 24,00,000', '30%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Old tax regime slab rates, FY 2026-27 (unchanged for several years). Standard deduction Rs 50,000. Section 87A rebate makes tax nil up to Rs 5,00,000 taxable income.</caption>
                    <thead><tr><th style={thS} scope="col">Taxable Income Slab</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['Up to Rs 2,50,000', 'Nil'],
                        ['Rs 2,50,001 to Rs 5,00,000', '5%'],
                        ['Rs 5,00,001 to Rs 10,00,000', '20%'],
                        ['Above Rs 10,00,000', '30%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  A 4 per cent health and education cess is added on top of the slab tax in both regimes. Toggle the regime switch in the calculator above to see exactly which slabs your own salary falls into.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="marginal-relief">Marginal Relief Near the Rs 12 Lakh Threshold</h2>
                <p style={p}>
                  Without a safeguard, a taxpayer earning Rs 12,00,001 would owe tax on the full slab structure while someone earning Rs 12,00,000 pays nothing, a sudden cliff of tens of thousands of rupees for one extra rupee of income. Marginal relief under Section 87A prevents this: it caps your tax at the amount your taxable income exceeds Rs 12,00,000 by, until the relief tapers out.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Marginal relief worked examples, new regime, FY 2026-27 (before 4% cess)</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Taxable Income</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax Without Relief</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Tax With Marginal Relief</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Relief Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 12,00,000', 'Rs 60,000', 'Nil', 'Rs 60,000'],
                        ['Rs 12,10,000', 'Rs 61,500', 'Rs 10,000', 'Rs 51,500'],
                        ['Rs 12,40,000', 'Rs 66,000', 'Rs 40,000', 'Rs 26,000'],
                        ['Rs 12,70,000', 'Rs 70,500', 'Rs 70,000', 'Rs 500'],
                        ['Rs 12,75,000', 'Rs 71,250', 'Rs 71,250', 'Nil (relief fully phased out)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[2]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Relief shrinks as taxable income rises past Rs 12 lakh and disappears entirely by about Rs 12,75,000, the point at which the ordinary slab tax itself no longer exceeds the income above the threshold. This is also why Rs 12,75,000 gross salary, not a round Rs 12,00,000 or Rs 13,00,000, is the figure quoted as the effective tax-free ceiling for salaried employees.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-vs-new-regime">Old Regime vs New Regime: Which Gives Higher In-Hand Salary?</h2>
                <p style={p}>
                  The new regime gives higher in-hand salary for most salaried employees below roughly Rs 15 lakh CTC. Above that, the old regime only wins if you combine several deductions at once: 80C, 80D, home loan interest, and HRA exemption together, not any single one alone.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Old vs New Regime annual tax comparison, FY 2026-27. Assumes 40% basic. Old regime claims full Section 80C (Rs 1.5L), Section 80D (Rs 25K), home loan interest (Rs 2L), and HRA exemption of about 50% of basic for a metro renter. New regime claims only the standard deduction.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Annual CTC</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">New Regime Tax</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Old Regime Tax (full deductions)</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Better Regime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 6 LPA',  'Nil',        'Nil',       'Same'],
                        ['Rs 9 LPA',  'Nil',        'Nil',       'Same'],
                        ['Rs 12 LPA', 'Nil',        'Nil',       'Same'],
                        ['Rs 15 LPA', 'Rs 81,766',  'Rs 49,221', 'Old Regime'],
                        ['Rs 18 LPA', 'Rs 1,25,625','Rs 94,945', 'Old Regime'],
                        ['Rs 20 LPA', 'Rs 1,64,428','Rs 1,29,642','Old Regime'],
                        ['Rs 25 LPA', 'Rs 2,74,794','Rs 2,43,953','Old Regime'],
                        ['Rs 30 LPA', 'Rs 4,12,863','Rs 3,58,263','Old Regime'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}` }}>{r[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[2]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: r[3] === 'New Regime' ? '#1f7a58' : r[3] === 'Old Regime' ? '#7A4F0A' : C.ink2, fontWeight: 600, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Claiming only Section 80C, without HRA exemption or home loan interest, is not enough to flip the result at any of these income levels. The new regime still wins even at Rs 30 lakh CTC on 80C alone, because its lower slab rates and higher standard deduction outweigh a single Rs 1.5 lakh deduction. The old regime needs the combination shown above to compete.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  For the exact breakeven deduction level at your specific income, see the <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Tax Regime Calculator</Link>, which includes a full breakeven table by income level. Switch the regime toggle in the calculator above to see your own numbers instantly.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="gratuity-ctc">Gratuity in CTC: What It Means for Your Take-Home</h2>
                <p style={p}>
                  Gratuity is a lump sum payment made by the employer when an employee leaves after completing 5 years of continuous service. It is calculated at 15 days of last drawn basic salary for each completed year of service, which works out to approximately 4.81 per cent of basic salary per year.
                </p>
                <p style={p}>
                  Since gratuity is an employer cost included in your CTC, it reduces the amount available for your gross salary. Job seekers evaluating offers should look at the gross salary (what they actually earn before deductions) rather than the CTC, as gratuity and employer PF are benefits they receive only at exit or retirement.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="8th-pay-commission">8th Pay Commission Salary Calculator</h2>
                <p style={p}>
                  The 8th Pay Commission was constituted by the Union Cabinet in January 2025 to revise the pay structure for approximately 50 lakh central government employees and 65 lakh pensioners, with implementation expected from January 2026. The commission will recommend revised basic pay, allowances, and pension norms.
                </p>
                <p style={p}>
                  Previous commissions used a fitment factor to revise basic pay. The 7th Pay Commission, implemented from January 2016, used a fitment factor of 2.57 and raised the minimum basic from Rs 7,000 to Rs 18,000. Once the 8th Pay Commission announces its revised pay levels, central government employees can enter the new basic pay in the calculator above to estimate their revised in-hand salary including DA, HRA, and TA.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Current 7th CPC pay levels with approximate in-hand salary (including DA at current rates, HRA for X-class city)</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Pay Level</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Entry Basic Pay (7th CPC)</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Approx. Monthly In-Hand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Level 1 (Group D)',             'Rs 18,000',  'Rs 25,000-28,000'],
                        ['Level 4 (LDC / Postal Asst.)', 'Rs 25,500',  'Rs 34,000-39,000'],
                        ['Level 6 (UDC / Steno Grade D)', 'Rs 35,400', 'Rs 46,000-53,000'],
                        ['Level 7 (Inspector / ASO)',     'Rs 44,900',  'Rs 57,000-66,000'],
                        ['Level 10 (Section Officer)',    'Rs 56,100',  'Rs 71,000-84,000'],
                        ['Level 12 (Under Secretary)',    'Rs 78,800',  'Rs 96,000-1,12,000'],
                        ['Level 13 (Deputy Secretary)',   'Rs 1,23,100','Rs 1,48,000-1,70,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.dark, fontWeight: 600, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  DA and HRA add significantly to the basic pay for central government employees. DA is revised twice a year and is currently around 55 per cent of basic (as of 2025). HRA for X-class cities (Delhi, Mumbai, Chennai, Kolkata, Bengaluru, Hyderabad) is 27 per cent of basic.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="different-ctc-slabs">Salary Breakup for Different CTC Slabs</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Typical salary breakup at different CTC levels (monthly), new regime, FY 2026-27</caption>
                    <thead><tr><th style={thS} scope="col">Component</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">CTC Rs 6 L</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">CTC Rs 12 L</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">CTC Rs 25 L</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic Salary', 'Rs 20,000', 'Rs 40,000', 'Rs 83,333'],
                        ['HRA', 'Rs 10,000', 'Rs 20,000', 'Rs 41,667'],
                        ['Special Allowance', 'Rs 16,638', 'Rs 33,276', 'Rs 69,325'],
                        ['Gross Salary', 'Rs 46,638', 'Rs 93,276', 'Rs 1,94,325'],
                        ['Employee PF (12% of basic)', '-Rs 2,400', '-Rs 4,800', '-Rs 10,000'],
                        ['Professional Tax', '-Rs 200', '-Rs 200', '-Rs 200'],
                        ['Income Tax TDS (New Regime)', 'Nil', 'Nil', '-Rs 22,900'],
                        ['In-Hand Salary', 'Rs 44,038', 'Rs 88,276', 'Rs 1,61,225'],
                      ].map((r, i) => {
                        const isTotal = r[0] === 'In-Hand Salary' || r[0] === 'Gross Salary';
                        return (
                          <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: isTotal ? C.ink : C.ink2, fontWeight: isTotal ? 700 : 400, border: `1px solid ${C.border}` }}>{r[0]}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[1]}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[2]}</td>
                            <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[3]}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-salary-breakup">In-Hand Salary for Common Monthly CTC Amounts</h2>
                <p style={p}>
                  The table below shows estimated in-hand salary for common monthly CTC amounts, calculated using 40 per cent basic salary, 12 per cent EPF, and Rs 200 professional tax. For example, a CTC of Rs 20,000 a month works out to Rs 2.4 LPA a year, with in-hand of about Rs 17,495. A CTC of Rs 40,000 a month is Rs 4.8 LPA, with in-hand of about Rs 35,190. Income tax is nil for annual CTC up to Rs 12.75 lakh under the new regime for FY 2026-27, where the full Section 87A rebate applies.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Estimated in-hand salary. Assumes 40% basic, 12% EPF, Rs 200 professional tax, new regime FY 2026-27. Enter your actual CTC in the calculator above for a precise breakup.</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Monthly CTC</th>
                        <th style={thS} scope="col">Annual CTC</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Basic/Month</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">EPF Deduction</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Est. Monthly In-Hand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Rs 20,000',  '2.4 LPA', 'Rs 8,000',  'Rs 960',   'Rs 17,495'],
                        ['Rs 25,000',  '3 LPA',   'Rs 10,000', 'Rs 1,200', 'Rs 21,919'],
                        ['Rs 28,000',  '3.36 LPA','Rs 11,200', 'Rs 1,344', 'Rs 24,573'],
                        ['Rs 30,000',  '3.6 LPA', 'Rs 12,000', 'Rs 1,440', 'Rs 26,343'],
                        ['Rs 40,000',  '4.8 LPA', 'Rs 16,000', 'Rs 1,920', 'Rs 35,190'],
                        ['Rs 50,000',  '6 LPA',   'Rs 20,000', 'Rs 2,400', 'Rs 44,038'],
                        ['Rs 75,000',  '9 LPA',   'Rs 30,000', 'Rs 3,600', 'Rs 66,157'],
                        ['Rs 1,00,000','12 LPA',  'Rs 40,000', 'Rs 4,800', 'Rs 88,276'],
                        ['Rs 1,50,000','18 LPA',  'Rs 60,000', 'Rs 7,200', 'Rs 1,21,426'],
                        ['Rs 2,00,000','24 LPA',  'Rs 80,000', 'Rs 9,600', 'Rs 1,55,873'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 600, border: `1px solid ${C.border}` }}>{r[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[2]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[3]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.dark, fontWeight: 700, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[4]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  These are estimates. Actual in-hand depends on your exact salary structure, the state you work in (professional tax varies), and whether you choose old or new regime. For salaries above Rs 12.75 lakh annual, income tax applies and reduces in-hand further.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="job-salary-india">Typical In-Hand Salary by Job Role in India</h2>
                <p style={p}>
                  The table below shows approximate in-hand monthly salary ranges for common job profiles in India, based on average CTC ranges in the industry for 2025. Actual in-hand varies with company structure, city, and tax situation.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Approximate in-hand salary ranges for common roles in India (2025)</caption>
                    <thead>
                      <tr>
                        <th style={thS} scope="col">Job Role</th>
                        <th style={thS} scope="col">Experience</th>
                        <th style={thS} scope="col">Typical CTC (LPA)</th>
                        <th style={{ ...thS, textAlign: 'right' as const }} scope="col">Est. Monthly In-Hand</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Software Engineer',         '0-2 years',  'Rs 4-8 LPA',   'Rs 28,000-55,000'],
                        ['Software Engineer',         '3-5 years',  'Rs 10-18 LPA', 'Rs 68,000-1,20,000'],
                        ['Data Analyst',              '0-2 years',  'Rs 4-7 LPA',   'Rs 28,000-48,000'],
                        ['Data Scientist',            '2-5 years',  'Rs 10-20 LPA', 'Rs 68,000-1,35,000'],
                        ['Product Manager',           '2-5 years',  'Rs 15-30 LPA', 'Rs 1,00,000-2,00,000'],
                        ['Chartered Accountant',      '0-2 years',  'Rs 6-10 LPA',  'Rs 42,000-68,000'],
                        ['DevOps Engineer',           '2-4 years',  'Rs 8-15 LPA',  'Rs 55,000-1,00,000'],
                        ['Digital Marketing Manager', '2-5 years',  'Rs 6-12 LPA',  'Rs 42,000-82,000'],
                        ['Machine Learning Engineer', '2-5 years',  'Rs 12-25 LPA', 'Rs 80,000-1,65,000'],
                        ['Bank PO (SBI)',              'Entry level','Rs 8-11 LPA',  'Rs 55,000-75,000'],
                        ['Civil Engineer',            '2-5 years',  'Rs 5-10 LPA',  'Rs 35,000-68,000'],
                        ['Graphic Designer',          '1-3 years',  'Rs 3-7 LPA',   'Rs 22,000-48,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[0]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[1]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}` }}>{r[2]}</td>
                          <td style={{ padding: '10px 14px', fontSize: 13.5, color: C.dark, fontWeight: 600, textAlign: 'right', border: `1px solid ${C.border}` }}>{r[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  For the most accurate tax calculation on any of these salary levels, use the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> to determine exact annual liability and then input the monthly TDS in the calculator above.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-read-payslip">How to Read Your Payslip</h2>
                <p style={p}>
                  Every Indian payslip separates Earnings from Deductions, the same split shown in the result panel above. Matching your actual payslip against that structure is the fastest way to spot-check whether your salary is set up the way you think it is.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>What each payslip line means, and where it comes from</caption>
                    <thead><tr><th style={thS} scope="col">Payslip Line</th><th style={thS} scope="col">Side</th><th style={thS} scope="col">Where It Comes From</th></tr></thead>
                    <tbody>
                      {[
                        ['Basic Salary', 'Earnings', 'Fixed percentage of CTC set by your employer, usually 40-50%'],
                        ['House Rent Allowance', 'Earnings', 'Set by company policy as a percentage of basic'],
                        ['Special Allowance / Other Allowances', 'Earnings', 'The balancing figure: CTC minus every other named component'],
                        ['Gross Earnings / Gross Pay', 'Total', 'Sum of all earnings lines above, before any deduction'],
                        ['Provident Fund (PF)', 'Deductions', '12% of basic salary, sent to your EPFO account'],
                        ['Professional Tax', 'Deductions', 'Fixed state-set amount, zero in several states'],
                        ['Income Tax / TDS', 'Deductions', 'Your annual estimated tax liability divided across the months left in the financial year'],
                        ['Net Pay / Take-Home', 'Total', 'Gross Earnings minus all deduction lines: the amount credited to your account'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                          <td style={tdL}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Employer PF contribution and gratuity provision usually do not appear as payslip lines at all, since they are paid into your EPF account or held in provision rather than credited to you directly each month. If your payslip's Gross Pay is noticeably lower than your CTC divided by 12, this is almost always why.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This In-Hand Salary Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your CTC:</strong> enter your annual Cost to Company as per your offer letter or latest salary revision.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Adjust components:</strong> set your basic salary percentage (typically 40-50 per cent of CTC) and HRA percentage (typically 20-25 per cent of CTC).
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Select your tax regime:</strong> choose New Regime or Old Regime. The calculator automatically computes your monthly TDS. If you switch regimes, the result updates instantly and shows how much you save vs the other regime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>More settings:</strong> click More settings to enter other allowances, employee PF percentage, professional tax, and (for old regime) your Section 80C investments for a more accurate tax estimate.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review the breakdown:</strong> the result panel shows gross salary, individual deductions, auto-calculated TDS, and final in-hand monthly amount.
                  </li>
                </ol>
                <p style={p}>
                  Click any value in the slider to type a precise number. The currency selector converts all amounts to USD, EUR, GBP, and other currencies for NRI users. Your inputs are saved automatically and restored the next time you visit.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="maximize-in-hand-salary">How to Maximize Your Monthly In-Hand Salary</h2>
                <p style={p}>
                  Three practical approaches work for most salaried employees in India. Each targets a different part of the salary structure.
                </p>
                {[
                  ['Restructure your salary with tax-free components:', 'Ask HR to include NPS employer contribution (exempt up to 10 per cent of basic salary under Section 80CCD(2)), meal coupons (Rs 2,200/month tax-free), and Leave Travel Allowance (LTA) in your salary structure. These components reduce taxable income without changing your CTC.'],
                  ['Choose the right tax regime every year:', 'Run both regimes in the calculator above before each financial year begins. The new regime is typically better below Rs 12-15 LPA. Above Rs 15 LPA with full 80C and home loan deductions, the old regime saves more. The break-even point shifts as your salary and investments change.'],
                  ['Maximize Section 80CCD(1B) for NPS:', 'Under the old regime, contributing Rs 50,000 to NPS gives an additional deduction over and above the Rs 1.5 lakh Section 80C limit. At the 30 per cent tax slab, this saves Rs 15,600 per year (Rs 1,300/month more in hand). This deduction is available even under the new regime via employer NPS contribution under 80CCD(2).'],
                  ['Request a higher basic salary if you have a home loan:', 'HRA exemption is calculated on basic salary. A higher basic means a higher HRA component and potentially higher HRA exemption under the old regime, which reduces taxable income. This only helps if you live in rented accommodation.'],
                ].map(([title, text]) => (
                  <div key={title as string} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="limitations">What This Calculator Covers</h2>
                <p style={p}>
                  This calculator addresses the four most common gaps in basic salary estimators. Here is what is supported and what remains out of scope.
                </p>
                {[
                  ['Correct CTC-to-gross conversion (supported):', 'Employer PF (12 per cent of basic) and gratuity (4.81 per cent of basic) are subtracted from CTC before computing your gross salary. This typically reduces gross by 6-7 per cent of CTC, making the in-hand estimate significantly more accurate than calculators that treat full CTC as gross.'],
                  ['Variable pay (supported):', 'Use the Variable Pay slider to specify what percentage of your CTC is performance bonus or quarterly incentive. The fixed gross is computed on the remaining CTC, while variable income is included in your annual tax calculation, giving a more accurate TDS estimate.'],
                  ['Old regime deductions (supported):', 'The More Settings panel for the old regime includes Section 80C (up to Rs 1.5 lakh), Section 80D health insurance (up to Rs 25,000), and home loan interest under Section 24b (up to Rs 2 lakh). NPS 80CCD(1B) is not yet a separate slider; enter it under 80C if you wish to approximate.'],
                  ['Perquisite income / ESOP and RSU (supported):', 'Enter your annual perquisite income in More Settings. RSU vesting is taxed as salary in the year of vesting at the fair market value minus exercise price. Enter the expected annual vesting value and the calculator includes it in your annual tax computation.'],
                ].map(([title, text]) => (
                  <div key={title as string} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              

              <div style={{ margin: '0 0 44px' }}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Actual in-hand salary depends on your specific salary structure, employer policies, applicable professional tax rates by state, and individual income tax liability under the applicable slab rates for the financial year. Tax calculations are estimates based on standard deductions and the regime selected; they do not account for all exemptions and deductions. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult your HR department or a SEBI-registered financial adviser for precise salary breakdowns and tax planning.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.in-hand-sidebar::-webkit-scrollbar{width:5px}.in-hand-sidebar::-webkit-scrollbar-track{background:transparent}.in-hand-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.in-hand-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="in-hand-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                  {[
                    ['Employee PF', '12% of basic salary'],
                    ['Employer PF', '12% of basic (in CTC, not deducted)'],
                    ['Gratuity provision', '~4.81% of basic (in CTC)'],
                    ['Max professional tax', 'Rs 2,500/year'],
                    ['New regime tax-free salary', 'Up to Rs 12.75L CTC'],
                    ['HRA exemption (metro)', 'Up to 50% of basic'],
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

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/sip-calculator|SIP', '/calculators/lumpsum-calculator|Lumpsum', '/calculators/cagr-calculator|CAGR', '/calculators/swp-calculator|SWP', '/calculators/emi-calculator|EMI', '/calculators/fd-calculator|FD', '/calculators/ppf-calculator|PPF', '/calculators/xirr-calculator|XIRR', '/calculators/compound-interest-calculator|Compound Int.'] },
        { hd: 'Topics', links: ['/calculators/sip-calculator|Mutual Funds', '/calculators/home-loan-calculator|Home Loans', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

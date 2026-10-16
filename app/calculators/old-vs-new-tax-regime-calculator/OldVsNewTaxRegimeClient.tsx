'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useLayoutEffect } from 'react';
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

/* ─── Donut Chart ────────────────────────────────────────────── */
function DonutChart({ takeHome, tax }: { takeHome: number; tax: number }) {
  const total = takeHome + tax;
  if (total <= 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const pArc = (takeHome / total) * circ;
  const pPct = Math.round((takeHome / total) * 100);
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Take-home pay is ${pPct}% of gross income under the better regime, tax is ${100 - pPct}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${pArc} ${circ - pArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Take-Home</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{pPct}%</text>
    </svg>
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
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
  { href: '/calculators/new-tax-regime-calculator',          label: 'New Tax Regime Calculator' },
  { href: '/calculators/old-tax-regime-calculator',          label: 'Old Tax Regime Calculator' },
  { href: '/calculators/hra-calculator',                     label: 'HRA Calculator' },
  { href: '/calculators/in-hand-salary-calculator',          label: 'In-Hand Salary Calculator' },
  { href: '/calculators/ctc-calculator',                     label: 'CTC Calculator' },
  { href: '/calculators/section-80c-calculator',             label: 'Section 80C Calculator' },
];
const MORE = [
  { href: '/calculators/section-80d-calculator',             label: 'Section 80D Calculator' },
  { href: '/calculators/nps-tax-benefit-calculator',         label: 'NPS Tax Benefit Calculator' },
  { href: '/calculators/gratuity-calculator',                label: 'Gratuity Calculator' },
  { href: '/calculators/capital-gains-calculator',           label: 'Capital Gains Calculator' },
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
];

const INCOME_PRESETS = [500000, 700000, 1000000, 1200000, 1500000, 2000000, 2500000, 3000000];

/* ─── Tax calculations ──────────────────────────────────────── */
function calcTaxNew(income: number) {
  const sd = 75000;
  const taxable = Math.max(0, income - sd);
  let tax = 0;
  const slabs: [number, number][] = [
    [400000, 0], [800000, 0.05], [1200000, 0.1], [1600000, 0.15],
    [2000000, 0.2], [2400000, 0.25], [Infinity, 0.3],
  ];
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable > prev) {
      const slice = Math.min(taxable, limit) - prev;
      tax += slice * rate;
    }
    prev = limit;
  }
  if (taxable <= 1200000) { tax = 0; }
  else { tax = Math.min(tax, taxable - 1200000); }
  return { tax: Math.round(tax), taxable, cess: Math.round(tax * 0.04), total: Math.round(tax * 1.04) };
}

function calcTaxOld(income: number, deductions: number) {
  const sd = 50000;
  const taxable = Math.max(0, income - sd - deductions);
  let tax = 0;
  const slabs: [number, number][] = [
    [250000, 0], [500000, 0.05], [1000000, 0.2], [Infinity, 0.3],
  ];
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxable > prev) {
      const slice = Math.min(taxable, limit) - prev;
      tax += slice * rate;
    }
    prev = limit;
  }
  if (taxable <= 500000) tax = 0;
  return { tax, taxable, cess: tax * 0.04, total: tax * 1.04 };
}

/* ─── N-Year Regime Projection (VPF pattern: collapsible bar chart + table) ─── */
interface RegimeYear { year: number; income: number; newTax: number; oldTax: number; winner: 'New' | 'Old'; }

function buildRegimeProjection(baseIncome: number, deductions: number, growthPct: number, years: number): RegimeYear[] {
  const rows: RegimeYear[] = [];
  const rate = Math.max(0, growthPct) / 100;
  for (let y = 1; y <= years; y++) {
    const incomeY = baseIncome * Math.pow(1 + rate, y);
    const nt = calcTaxNew(incomeY).total;
    const ot = calcTaxOld(incomeY, deductions).total;
    rows.push({ year: y, income: incomeY, newTax: nt, oldTax: ot, winner: nt < ot ? 'New' : 'Old' });
  }
  return rows;
}

function RegimeProjectionChart({ rows }: { rows: RegimeYear[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const maxVal = Math.max(...rows.map(r => Math.max(r.newTax, r.oldTax)), 1);
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(3, Math.min(14, slot * 0.32));
  const gapBetween = Math.max(1, barW * 0.18);
  const groupW = barW * 2 + gapBetween;
  const groupOffset = (slot - groupW) / 2;
  return (
    <svg role="img" aria-label={`New versus old regime tax over ${rows.length} years`}
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const newH = (row.newTax / maxVal) * H;
        const oldH = (row.oldTax / maxVal) * H;
        const x = PADL + i * slot + groupOffset;
        return (
          <g key={row.year}>
            <rect x={x} y={H - newH} width={barW} height={newH} fill={CHART_PAIR.primary} rx={2} />
            <rect x={x + barW + gapBetween} y={H - oldH} width={barW} height={oldH} fill={CHART_PAIR.secondary} rx={2} />
            {rows.length <= 20 && (
              <text x={x + groupW / 2} y={H + 14} textAnchor="middle"
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

/* ─── FAQ ────────────────────────────────────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────── */

export default function OldVsNewTaxRegimeClient() {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showProjection, setShowProjection] = useState(false);

  const defaultSettings = { income: 1200000, ded80C: 150000, ded80D: 25000, hraExempt: 0, homeLoan: 0, otherDed: 0, growthRate: 8, projectionYears: 5 };
  const { settings, updateSettings } = useCalculatorSettings('old-vs-new-tax-regime-calculator', defaultSettings);
  const { income, ded80C, ded80D, hraExempt, homeLoan, otherDed, growthRate, projectionYears } = settings;
  const setIncome = (v: any) => updateSettings({ income: typeof v === 'function' ? v(settings.income) : v });
  const setDed80C = (v: any) => updateSettings({ ded80C: typeof v === 'function' ? v(settings.ded80C) : v });
  const setDed80D = (v: any) => updateSettings({ ded80D: typeof v === 'function' ? v(settings.ded80D) : v });
  const setHraExempt = (v: any) => updateSettings({ hraExempt: typeof v === 'function' ? v(settings.hraExempt) : v });
  const setHomeLoan = (v: any) => updateSettings({ homeLoan: typeof v === 'function' ? v(settings.homeLoan) : v });
  const setOtherDed = (v: any) => updateSettings({ otherDed: typeof v === 'function' ? v(settings.otherDed) : v });
  const setGrowthRate = (v: any) => updateSettings({ growthRate: typeof v === 'function' ? v(settings.growthRate) : v });
  const setProjectionYears = (v: any) => updateSettings({ projectionYears: typeof v === 'function' ? v(settings.projectionYears) : v });
          
  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtC = (n: number) => formatCurrency(convertCurrency(n));

  const totalDed = ded80C + ded80D + hraExempt + homeLoan + otherDed;
  const newRegime = useMemo(() => calcTaxNew(income), [income]);
  const oldRegime = useMemo(() => calcTaxOld(income, totalDed), [income, totalDed]);
  const better = newRegime.total < oldRegime.total ? 'New' : 'Old';
  const savings = Math.abs(newRegime.total - oldRegime.total);
  const betterTotalTax = better === 'New' ? newRegime.total : oldRegime.total;
  const takeHomeBetter = Math.max(0, income - betterTotalTax);

  const projection = useMemo(() => buildRegimeProjection(income, totalDed, growthRate, projectionYears), [income, totalDed, growthRate, projectionYears]);
  const sumOptimal = projection.reduce((s, r) => s + Math.min(r.newTax, r.oldTax), 0);
  const sumStickWithCurrent = projection.reduce((s, r) => s + (better === 'New' ? r.newTax : r.oldTax), 0);
  const lockInCost = Math.max(0, sumStickWithCurrent - sumOptimal);
  const projectionFlips = projection.some(r => r.winner !== better);

  const Row = ({ label, newVal, oldVal, highlight }: { label: string; newVal: string; oldVal: string; highlight?: boolean }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${C.border}`, width: '100%', gap: 8 }}>
      <span style={{ fontSize: 12.5, color: C.ink2, flex: 1 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 500, color: better === 'New' && highlight ? '#1f7a58' : C.ink, textAlign: 'right', minWidth: 80 }}>{newVal}</span>
      <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 500, color: better === 'Old' && highlight ? '#1f7a58' : C.ink, textAlign: 'right', minWidth: 80 }}>{oldVal}</span>
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
            Old vs New Tax Regime Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Compare your income tax under the old regime with deductions and the new regime with lower rates for FY 2026-27
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Old vs New Tax Regime Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

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
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} role="group" aria-label="Quick income presets">
                        {INCOME_PRESETS.map(v => (
                          <button key={v} onClick={() => setIncome(v)}
                            aria-pressed={income === v}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: income === v ? C.ink : C.ink3,
                              border: `${income === v ? 1.5 : 1}px solid ${income === v ? C.ink : C.border}`,
                              fontWeight: income === v ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {v >= 10000000 ? `${v / 10000000}Cr` : `${v / 100000}L`}
                          </button>
                        ))}
                      </div>
                      <Slider label="Annual Income" id="tax-income" value={income} min={100000} max={50000000} step={10000} fmt={v => fmtC(v)} onChange={setIncome} compact={mobile} />
                      <Slider label="Section 80C (PPF, ELSS, EPF)" id="tax-80c" value={ded80C} min={0} max={150000} step={1000} fmt={v => fmtC(v)} onChange={setDed80C} compact={mobile} />
                      <Slider label="Section 80D (Health Insurance)" id="tax-80d" value={ded80D} min={0} max={100000} step={1000} fmt={v => fmtC(v)} onChange={setDed80D} compact={mobile} />
                      <Slider label="HRA Exemption (Annual)" id="tax-hra" value={hraExempt} min={0} max={500000} step={5000} fmt={v => fmtC(v)} onChange={setHraExempt} compact={mobile} />
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setShowAdvanced(true)}
                          style={{ fontSize: 12, fontWeight: 700, color: C.dark, background: C.paleLime, border: `1px solid ${C.lime2}`, borderRadius: 7, padding: '6px 14px', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5 }}>
                          More settings
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Slider label="Home Loan Interest (Sec 24b)" id="tax-home" value={homeLoan} min={0} max={500000} step={5000} fmt={v => fmtC(v)} onChange={setHomeLoan} compact={mobile} />
                      <Slider label="Other Deductions" id="tax-other" value={otherDed} min={0} max={500000} step={5000} fmt={v => fmtC(v)} onChange={setOtherDed} compact={mobile} />
                      <Slider label="Expected Annual Income Growth" id="tax-growth" value={growthRate} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setGrowthRate} compact={mobile} />
                      <Slider label="Projection Years" id="tax-years" value={projectionYears} min={2} max={15} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                        Income growth and projection years feed the N-Year Tax Regime Projection below the calculator, which tracks which regime wins as your income rises.
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <button onClick={() => setShowAdvanced(false)}
                          style={{ fontSize: 12, fontWeight: 600, color: C.ink2, background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>
                          Basic
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  {/* Dark hero */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>{better} Regime Wins</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>Annual tax saving</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`${better} regime saves ${fmtC(Math.round(savings))}`}>
                        {fmtC(Math.round(savings))}
                      </div>
                      <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>per year</div>
                    </div>
                  </div>

                  {/* Regime cards - winner gets dark, loser gets light */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, width: '100%', marginBottom: 12 }}>
                    {[
                      { label: 'New Regime', value: newRegime.total, isWinner: better === 'New' },
                      { label: 'Old Regime', value: oldRegime.total, isWinner: better === 'Old' },
                    ].map(({ label, value, isWinner }) => (
                      <div key={label} style={{ background: isWinner ? '#F4F5F6' : '#FFFFFF', border: `1.5px solid ${isWinner ? '#101214' : C.border}`, borderRadius: 10, padding: mobile ? '10px 12px' : '14px 16px', textAlign: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.ink3, marginBottom: 5, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{label}</div>
                        <div style={{ fontSize: mobile ? 17 : 21, fontWeight: 800, color: isWinner ? '#1F7A58' : '#101214' }}>{fmtC(Math.round(value))}</div>
                        {isWinner && <div style={{ fontSize: 11, fontWeight: 600, color: '#1F7A58', marginTop: 3 }}>Lower Tax</div>}
                      </div>
                    ))}
                  </div>

                  {/* Visual comparison bar */}
                  {(() => {
                    const maxTax = Math.max(newRegime.total, oldRegime.total, 1);
                    const newW = Math.round((newRegime.total / maxTax) * 100);
                    const oldW = Math.round((oldRegime.total / maxTax) * 100);
                    return (
                      <div style={{ width: '100%', marginBottom: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                          <span style={{ fontSize: 11, color: C.ink3 }}>New Regime</span>
                          <span style={{ fontSize: 11, color: C.ink3 }}>Old Regime</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          <div style={{ height: 8, borderRadius: 99, background: C.border, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${newW}%`, background: better === 'New' ? C.dark : '#B2C4B0', borderRadius: 99, transition: 'width 0.4s ease' }} />
                          </div>
                          <div style={{ height: 8, borderRadius: 99, background: C.border, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${oldW}%`, background: better === 'Old' ? C.dark : '#B2C4B0', borderRadius: 99, transition: 'width 0.4s ease' }} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Column headers */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingBottom: 6, borderBottom: `2px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.ink3, flex: 1 }}></span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: better === 'New' ? C.dark : C.ink3, minWidth: 80, textAlign: 'right' }}>NEW</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: better === 'Old' ? C.dark : C.ink3, minWidth: 80, textAlign: 'right' }}>OLD</span>
                  </div>
                  <Row label="Total Deductions (80C+80D+HRA...)" newVal="N/A" oldVal={fmtC(Math.round(totalDed))} />
                  <Row label="Taxable Income" newVal={fmtC(Math.round(newRegime.taxable))} oldVal={fmtC(Math.round(oldRegime.taxable))} />
                  <Row label="Tax (before cess)" newVal={fmtC(Math.round(newRegime.tax))} oldVal={fmtC(Math.round(oldRegime.tax))} />
                  <Row label="Total Tax (incl. cess)" newVal={fmtC(Math.round(newRegime.total))} oldVal={fmtC(Math.round(oldRegime.total))} highlight />

                  {/* Donut: take-home vs tax under the better regime */}
                  <div style={{ order: mobile ? 1 : -1, marginBottom: mobile ? 0 : 16 }}>
                    <DonutChart takeHome={takeHomeBetter} tax={betterTotalTax} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 16, marginBottom: mobile ? 16 : 20, marginTop: mobile ? 12 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary, display: 'inline-block' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Take-home ({better} regime)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary, display: 'inline-block' }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Tax ({better} regime)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* N-Year Tax Regime Projection (collapsible, VPF pattern) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowProjection(v => !v)}
                  aria-expanded={showProjection} aria-controls="regime-projection-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>N-Year Tax Regime Projection</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>If your income keeps growing every year</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {projectionYears} yr &middot; {growthRate.toFixed(1)}%/yr
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showProjection ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showProjection && (
                  <div id="regime-projection-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>New Regime Tax</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Old Regime Tax</span>
                        </div>
                      </div>
                      <RegimeProjectionChart rows={projection} />
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
                            {['Year', 'Projected Income', 'New Regime Tax', 'Old Regime Tax', 'Winner'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {projection.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(Math.round(row.income))}</td>
                              <td style={{ padding: '11px 14px', color: row.winner === 'New' ? '#1f7a58' : C.ink2, fontWeight: row.winner === 'New' ? 700 : 500 }}>{fmtC(Math.round(row.newTax))}</td>
                              <td style={{ padding: '11px 14px', color: row.winner === 'Old' ? '#1f7a58' : C.ink2, fontWeight: row.winner === 'Old' ? 700 : 500 }}>{fmtC(Math.round(row.oldTax))}</td>
                              <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 600 }}>{row.winner}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: mobile ? '16px' : '20px 44px 28px' }}>
                      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        {projectionFlips
                          ? `At ${growthRate.toFixed(1)}% annual income growth, the winning regime changes at least once over the next ${projectionYears} years. Re-checking your regime choice each year instead of sticking with today's ${better} regime the whole time saves about ${fmtC(Math.round(lockInCost))} in total tax over this period.`
                          : `At ${growthRate.toFixed(1)}% annual income growth, the ${better} regime stays ahead for all ${projectionYears} projected years, so re-checking your choice every year would not change the outcome here.`}
                        {' '}Deductions are held constant in rupee terms across the projection; if your Section 80C, 80D, or HRA claims are also likely to grow, re-run this with an updated deduction figure.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Waitlist */}
            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-tax-regime">What Is the Old vs New Tax Regime?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    The old vs new tax regime refers to India&apos;s two parallel income tax systems: the old regime with higher tax rates but full access to deductions and exemptions, and the new regime with lower slab rates but minimal deductions introduced in Budget 2020 and made the default from FY 2023-24.
                  </p>
                </div>
                <p style={p}>
                  Under the old regime, salaried employees can claim deductions under Section 80C (PPF, ELSS, EPF, life insurance), Section 80D (health insurance), HRA exemption under Section 10(13A), and home loan interest under Section 24(b). The standard deduction is Rs 50,000.
                </p>
                <p style={p}>
                  Under the new regime, slab rates are significantly lower but most deductions are eliminated. The standard deduction of Rs 75,000 is the only major deduction available. Section 87A provides a full rebate for taxable income up to Rs 12 lakh under the new regime from FY 2025-26, making tax nil for that bracket.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-timeline">Timeline: How India&apos;s Tax Regimes Have Evolved</h2>
                <p style={p}>
                  The new regime has changed in almost every Budget since it was introduced, which is why an old article or a friend&apos;s advice from a couple of years ago can easily be out of date.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">When</th><th style={thS} scope="col">What Changed</th></tr></thead>
                    <tbody>
                      {[
                        ['Budget 2020 (FY 2020-21)', 'The new tax regime is introduced as a purely optional alternative, with lower slab rates but almost no exemptions or deductions. The old regime remains the default.'],
                        ['Budget 2023 (FY 2023-24)', 'The new regime becomes the default regime. The Section 87A rebate threshold under the new regime rises from Rs 5 lakh to Rs 7 lakh taxable income, and the standard deduction is extended to the new regime for the first time.'],
                        ['Budget 2025 (FY 2025-26)', 'The Section 87A rebate threshold under the new regime rises again, to Rs 12 lakh taxable income. The standard deduction increases to Rs 75,000, and the slab structure is revised into the seven-slab format shown in the comparison table above.'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r[0]}</td>
                          <td style={tdL}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  The old regime&apos;s slab rates and deduction limits, by contrast, have stayed largely unchanged across these same Budgets, which is part of why the comparison keeps shifting in the new regime&apos;s favour for most salaried taxpayers over time.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-comparison">Old vs New Tax Regime Comparison Table</h2>
                <p style={p}>The table below shows the income tax slab rates under both regimes for FY 2026-27.</p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Income tax slab comparison for FY 2026-27</caption>
                    <thead><tr><th style={thS} scope="col">Income Slab</th><th style={thS} scope="col">New Regime Rate</th><th style={thS} scope="col">Old Regime Rate</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 0 to Rs 2,50,000', '0%', '0%'],
                        ['Rs 2,50,001 to Rs 4,00,000', '0%', '5%'],
                        ['Rs 4,00,001 to Rs 5,00,000', '0%*', '5%'],
                        ['Rs 5,00,001 to Rs 8,00,000', '5%', '20%'],
                        ['Rs 8,00,001 to Rs 10,00,000', '10%', '20%'],
                        ['Rs 10,00,001 to Rs 12,00,000', '10%', '30%'],
                        ['Rs 12,00,001 to Rs 16,00,000', '15%', '30%'],
                        ['Rs 16,00,001 to Rs 20,00,000', '20%', '30%'],
                        ['Rs 20,00,001 to Rs 24,00,000', '25%', '30%'],
                        ['Above Rs 24,00,000', '30%', '30%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0, fontSize: 13, color: C.ink3 }}>* Section 87A rebate makes tax nil for taxable income up to Rs 12,00,000 under the new regime (FY 2025-26 onwards) and Rs 5,00,000 under the old regime. Marginal relief applies just above the threshold. Standard deduction: Rs 75,000 (new) / Rs 50,000 (old).</p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="which-regime-saves-more">Which Tax Regime Saves More for You?</h2>
                <p style={p}>
                  The answer depends entirely on how much you can claim as deductions relative to your income. Below the breakeven deduction level for your income band, shown in the table below, the new regime is cheaper. Above it, the old regime wins.
                </p>
                <p style={p}>
                  <strong>Scenario 1:</strong> Rs 12 lakh annual income with Rs 2 lakh in deductions. Old regime tax works out to Rs 1,06,600. New regime tax is nil, because taxable income after the Rs 75,000 standard deduction is Rs 11,25,000, under the Rs 12 lakh Section 87A rebate threshold. The new regime saves the full Rs 1,06,600.
                </p>
                <p style={p}>
                  <strong>Scenario 2:</strong> Rs 18 lakh annual income with Rs 4.5 lakh in deductions. Old regime tax is Rs 2,10,600. New regime tax is Rs 1,50,800. The new regime still wins here, by Rs 59,800, because Rs 4.5 lakh falls well short of the roughly Rs 6.4 lakh breakeven deduction level at this income.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  <strong>Scenario 3:</strong> Rs 20 lakh annual income with Rs 8 lakh in deductions (a maxed-out 80C, a large home loan interest claim, and high metro HRA). Old regime tax is Rs 1,63,800 against Rs 1,92,400 under the new regime, so the old regime now saves Rs 28,600, since Rs 8 lakh clears the roughly Rs 7.08 lakh breakeven level for this income.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="breakeven">Breakeven Deductions: When Does the Old Regime Win?</h2>
                <p style={p}>
                  This table shows the deduction level at which both regimes cost exactly the same, at each income level. Claim more than the figure shown and the old regime wins; claim less and the new regime is cheaper.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Breakeven deduction level by gross annual income, FY 2026-27</caption>
                    <thead><tr><th style={thS} scope="col">Gross Annual Income</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Breakeven Deduction Level</th></tr></thead>
                    <tbody>
                      {[
                        ['Up to Rs 12,00,000', 'New regime always wins (tax is nil)'],
                        ['Rs 13,00,000', 'Rs 6,87,500'],
                        ['Rs 14,00,000', 'Rs 5,18,750'],
                        ['Rs 15,00,000', 'Rs 5,43,750'],
                        ['Rs 16,00,000', 'Rs 5,68,750'],
                        ['Rs 18,00,000', 'Rs 6,41,670'],
                        ['Rs 20,00,000', 'Rs 7,08,330'],
                        ['Rs 22,00,000', 'Rs 7,54,170'],
                        ['Rs 24,00,000 and above', 'Rs 8,00,000 (flat)'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, textAlign: 'right' as const }}>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Income here means gross income before the standard deduction, counting only income taxed at slab rates. The Rs 13 lakh figure looks like an outlier next to Rs 14 lakh because Rs 12-13 lakh sits right at the edge of the new regime&apos;s Section 87A rebate cliff, where marginal relief changes the comparison sharply.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Above roughly Rs 24 lakh, the breakeven flattens at Rs 8 lakh and stays there no matter how much higher income goes, since both regimes are then taxing every additional rupee at their top 30 per cent slab and only the fixed gap between the two standard deductions and rebate structures remains. See the full worked breakdown, with two independently verified examples, in the <Link href="/blogs/old-vs-new-tax-regime" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>old vs new tax regime guide</Link>.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-by-income-level">New vs Old Regime Tax by Income Level</h2>
                <p style={p}>
                  For a quick reference without entering your own numbers, this table assumes a modest Rs 2,00,000 in old-regime deductions, a level well short of the breakeven point at every income shown, so the new regime wins throughout.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Total tax (including 4% cess) at Rs 2,00,000 old-regime deductions, FY 2026-27.</caption>
                    <thead><tr><th style={thS} scope="col">Annual Income</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">New Regime Tax</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Old Regime Tax</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">New Regime Saves</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 8,00,000', 0, 23400],
                        ['Rs 10,00,000', 0, 65000],
                        ['Rs 12,00,000', 0, 106600],
                        ['Rs 15,00,000', 97500, 195000],
                        ['Rs 18,00,000', 150800, 288600],
                        ['Rs 20,00,000', 192400, 351000],
                        ['Rs 25,00,000', 319800, 507000],
                        ['Rs 30,00,000', 475800, 663000],
                        ['Rs 50,00,000', 1099800, 1287000],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={{ ...tdL, fontWeight: 600 }}>{r[0]}</td>
                          <td style={tdR}>{fmtC(r[1] as number)}</td>
                          <td style={tdR}>{fmtC(r[2] as number)}</td>
                          <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtC((r[2] as number) - (r[1] as number))}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: '16px 0 0' }}>
                  Note that the gap between the two regimes stops growing above Rs 25 lakh here (staying fixed at Rs 1,87,200) for the same reason the breakeven table flattens above Rs 24 lakh income: both regimes are taxing every additional rupee at the same 30 per cent top slab. If your deductions are closer to Rs 6-8 lakh rather than Rs 2 lakh, re-check your own numbers in the calculator above rather than relying on this table, since a higher deduction total can flip the winner entirely.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="when-old-regime-wins">When to Choose the Old Regime vs the New Regime</h2>
                <p style={p}>
                  The new regime wins by default for most salaried employees because it needs no paperwork and no proof of investment. The old regime only pulls ahead once you can genuinely claim several of the following at the same time.
                </p>
                <ul style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'disc', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>High rent in a metro city:</strong> HRA exemption under Section 10(13A) can run into several lakhs a year for tenants in Delhi, Mumbai, Kolkata, or Chennai. Use the <Link href="/calculators/hra-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>HRA Calculator</Link> to work out your exact exemption.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Section 80C fully utilised:</strong> EPF, PPF, ELSS, and life insurance premiums adding up to the full Rs 1.5 lakh limit. Check the exact tax saved on the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Home loan interest on a self-occupied property:</strong> up to Rs 2 lakh a year under Section 24(b), only available in the old regime.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Health insurance premiums:</strong> Section 80D allows Rs 25,000 for self and family, rising to Rs 1 lakh if you are also covering senior citizen parents. See the <Link href="/calculators/section-80d-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80D Calculator</Link>.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Voluntary NPS contribution:</strong> an additional Rs 50,000 deduction under Section 80CCD(1B), on top of the 80C limit. The <Link href="/calculators/nps-tax-benefit-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>NPS Tax Benefit Calculator</Link> breaks this down by employment type.
                  </li>
                </ul>
                <p style={{ ...p, margin: 0 }}>
                  If you want the full CTC-to-take-home picture, including employer PF and NPS contributions, before deciding, the <Link href="/calculators/ctc-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>CTC Calculator</Link> and <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link> break down every component separately.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="max-deductions-case-study">Case Study: Maximizing Deductions Under the Old Regime</h2>
                <p style={p}>
                  Here is what happens when every deduction from the list above is genuinely claimed together, at Rs 15,00,000 annual income.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Old-regime deduction stack at Rs 15,00,000 annual income, fully maximized.</caption>
                    <thead><tr><th style={thS} scope="col">Deduction</th><th style={{ ...thS, textAlign: 'right' as const }} scope="col">Amount Claimed</th></tr></thead>
                    <tbody>
                      {[
                        ['Section 80C (PPF, ELSS, EPF, life insurance)', 150000],
                        ['Section 80D (health insurance, self and family)', 25000],
                        ['HRA exemption (high metro rent)', 200000],
                        ['Section 24(b) home loan interest', 200000],
                        ['Section 80CCD(1B) voluntary NPS', 50000],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={tdR}>{fmtC(r[1] as number)}</td>
                        </tr>
                      ))}
                      <tr style={{ borderBottom: `1px solid ${C.border}`, background: '#f4f5f6' }}>
                        <td style={{ ...tdL, fontWeight: 700, color: C.dark }}>Total deductions claimed</td>
                        <td style={{ ...tdR, fontWeight: 700, color: C.dark }}>{fmtC(625000)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  With the Rs 50,000 standard deduction added, taxable income drops to Rs 8,25,000 under the old regime, giving a total tax of {fmtC(80600)} including cess. Under the new regime, the same Rs 15,00,000 income (after only the Rs 75,000 standard deduction) produces a taxable income of Rs 14,25,000 and a total tax of {fmtC(97500)}.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Fully maximizing every major deduction at once makes the old regime win here, by {fmtC(97500 - 80600)}. This is close to the ceiling of what old-regime deductions can realistically achieve at this income; most taxpayers claim only some of these at once, which is why the breakeven table above shows a much smaller Rs 5,43,750 threshold needed to win at Rs 15 lakh, not the full Rs 6,25,000 used in this case study.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-regime-formula">Old Regime Tax Calculation Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Taxable Income = Gross Income minus Standard Deduction (Rs 50,000) minus Section 80C (max Rs 1,50,000) minus 80D minus HRA exemption minus Section 24(b) minus Other Deductions
                  </code>
                </div>
                <p style={p}>
                  Apply the old regime slab rates to the taxable income. If taxable income is Rs 3,00,000 to Rs 5,00,000, the tax is 5 per cent of the amount above Rs 2,50,000. From Rs 5,00,001 to Rs 10,00,000, it is 20 per cent of the amount above Rs 5,00,000 plus Rs 12,500. Above Rs 10,00,000, it is 30 per cent of the amount above Rs 10,00,000 plus Rs 1,12,500. Add 4 per cent cess on the total tax.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="new-regime-formula">New Regime Tax Calculation Formula</h2>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, color: C.dark }}>
                    Taxable Income = Gross Income minus Standard Deduction (Rs 75,000)
                  </code>
                </div>
                <p style={p}>
                  Apply the new regime slab rates: nil up to Rs 4,00,000, 5 per cent from Rs 4,00,001 to Rs 8,00,000, 10 per cent from Rs 8,00,001 to Rs 12,00,000, 15 per cent from Rs 12,00,001 to Rs 16,00,000, 20 per cent from Rs 16,00,001 to Rs 20,00,000, 25 per cent from Rs 20,00,001 to Rs 24,00,000, and 30 per cent above Rs 24,00,000. Add 4 per cent cess. If taxable income is Rs 12,00,000 or less, tax is nil under the new regime due to Section 87A rebate (FY 2025-26 onwards).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="section-87a-rebate">Section 87A Rebate Explained</h2>
                <p style={p}>
                  Section 87A of the Income Tax Act provides a rebate that reduces the tax payable to zero for taxpayers below certain income thresholds. Under the new regime from FY 2025-26, tax is nil if taxable income is up to Rs 12,00,000 (the full rebate is up to Rs 60,000, and marginal relief applies just above this threshold). Under the old regime, the rebate threshold remains Rs 5,00,000.
                </p>
                <p style={p}>
                  For a salaried employee, the Rs 75,000 standard deduction under the new regime means someone with gross salary up to Rs 12,75,000 pays zero income tax. If your taxable income is slightly above Rs 12 lakh, marginal relief limits your tax to the excess over Rs 12 lakh rather than the full slab tax, preventing a cliff effect.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Use this <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> for a more detailed breakdown including cess and marginal relief calculations.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="surcharge-comparison">Surcharge on High Income: Old vs New Regime</h2>
                <p style={p}>
                  Above Rs 50 lakh, an additional surcharge applies on top of the 30 per cent slab rate, and this is where the old and new regimes diverge the most at the top end.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Surcharge rates by income slab, applied on the income tax amount before cess.</caption>
                    <thead><tr><th style={thS} scope="col">Taxable Income</th><th style={thS} scope="col">New Regime Surcharge</th><th style={thS} scope="col">Old Regime Surcharge</th></tr></thead>
                    <tbody>
                      {[
                        ['Above Rs 50,00,000 up to Rs 1,00,00,000', '10%', '10%'],
                        ['Above Rs 1,00,00,000 up to Rs 2,00,00,000', '15%', '15%'],
                        ['Above Rs 2,00,00,000 up to Rs 5,00,00,000', '25%', '25%'],
                        ['Above Rs 5,00,00,000', '25% (capped)', '37%'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  Capping the new regime&apos;s surcharge at 25 per cent above Rs 5 crore, instead of the old regime&apos;s 37 per cent, brings the maximum possible effective tax rate (slab rate plus surcharge plus 4 per cent cess) down to about 39 per cent under the new regime, against about 42.74 per cent under the old regime. Marginal relief applies at each surcharge threshold too, so income just above a slab does not jump straight to the higher surcharge on the entire amount. This calculator does not add surcharge to its result; treat the numbers above as a manual adjustment for income beyond Rs 50 lakh.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-switch-between-regimes">How to Switch Between Tax Regimes</h2>
                <p style={p}>
                  Switching between regimes depends on your income type. Salaried employees without business or professional income can switch freely between the old and new regime every financial year. You simply choose the regime at the time of filing your income tax return (ITR) that gives you the lower tax liability.
                </p>
                <p style={p}>
                  If you have business or professional income, you can opt for the new regime and switch back to the old regime only once in your lifetime. To switch back, you must file Form 10-IEA before the due date of filing your ITR for that assessment year. Once you switch back, you cannot opt for the new regime again.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The new regime has been the default regime since FY 2023-24. If you want the old regime, you must explicitly opt for it by selecting it in your ITR form or informing your employer for TDS calculation purposes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-business-income">Tax Regime for Freelancers and Business Owners</h2>
                <p style={p}>
                  The regime choice works differently once income includes business or professional earnings, not just salary.
                </p>
                {[
                  ['No standard deduction on business income:', 'The Rs 75,000 (new regime) or Rs 50,000 (old regime) standard deduction applies only to salary income. A freelancer or business owner with no salary component gets no standard deduction under either regime.'],
                  ['The one-time switch-back rule actually applies here:', 'As covered above, a taxpayer with business or professional income who opts into the new regime can switch back to the old regime only once in their lifetime, using Form 10-IEA, and loses access to the new regime permanently once they do. Salaried taxpayers with no business income face no such restriction.'],
                  ['Presumptive taxation is a separate choice from the regime:', 'Schemes like Section 44AD (business) and Section 44ADA (profession) let eligible taxpayers declare a fixed percentage of turnover or receipts as taxable profit instead of tracking every expense. Opting into a presumptive scheme is independent of choosing the old or new tax regime; both choices exist on separate tracks.'],
                  ['Advance tax obligations do not disappear:', 'Salaried employees mostly experience tax through employer TDS. A freelancer or business owner is generally required to pay advance tax in quarterly instalments through the year regardless of which regime they choose, since there is no employer to deduct it upfront.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-regime-deductions">Key Deductions Under the Old Tax Regime</h2>
                <p style={p}>
                  The old regime allows these major deductions that can significantly reduce your taxable income:
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Key deductions available under the old tax regime</caption>
                    <thead><tr><th style={thS} scope="col">Section</th><th style={thS} scope="col">Maximum Deduction</th><th style={thS} scope="col">Common Investments</th></tr></thead>
                    <tbody>
                      {[
                        ['Section 80C', 'Rs 1,50,000', 'PPF, ELSS, EPF, life insurance, tax-saving FD, NSC'],
                        ['Section 80D', 'Rs 25,000 (self) / Rs 50,000 (senior)', 'Health insurance premiums'],
                        ['Section 24(b)', 'Rs 2,00,000', 'Home loan interest on self-occupied property'],
                        ['Section 10(13A)', 'Depends on rent paid', 'HRA exemption for rented accommodation'],
                        ['Section 80E', 'No limit', 'Education loan interest (8 years)'],
                        ['Section 80G', '50% or 100% of donation', 'Charitable donations to approved funds'],
                      ].map(([s, m, c]) => (
                        <tr key={s as string} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{s}</td>
                          <td style={tdR}>{m}</td>
                          <td style={tdL}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="capital-gains-regime">Capital Gains and Special-Rate Income: Does the Regime Choice Apply?</h2>
                <p style={p}>
                  No. The old-versus-new choice only changes how income taxed at slab rates is computed. It does not touch income that the Income Tax Act taxes at its own fixed rate regardless of regime.
                </p>
                <p style={p}>
                  Capital gains on the sale of equity shares, mutual funds, and other capital assets are taxed under Sections 111A (short-term) and 112/112A (long-term), at rates set specifically for capital gains, not the slab rates shown in the comparison table above. Lottery winnings, game show prize money, and similar income under Section 115BB are taxed at a flat rate the same way.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  In practice, this means a taxpayer with both salary income and capital gains needs two separate calculations: the regime choice on this page for the salary portion, and the applicable capital gains rate, unaffected by that choice, on the gains portion. Check the current capital gains rates on the <Link href="/calculators/income-tax-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Income Tax Calculator</Link> before combining the two.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-senior-citizens">Tax Regime for Senior Citizens</h2>
                <p style={p}>
                  Age-based benefits exist only in the old regime. The new regime uses the same slab structure for every taxpayer regardless of age, which changes the comparison for anyone above 60.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Basic exemption limit (income taxed at nil) by age category, before any deductions or rebate.</caption>
                    <thead><tr><th style={thS} scope="col">Age Category</th><th style={thS} scope="col">Old Regime Exemption</th><th style={thS} scope="col">New Regime Exemption</th></tr></thead>
                    <tbody>
                      {[
                        ['Below 60 years', 'Rs 2,50,000', 'Rs 4,00,000'],
                        ['Senior citizen (60 to 80 years)', 'Rs 3,00,000', 'Rs 4,00,000'],
                        ['Super senior citizen (80 years and above)', 'Rs 5,00,000', 'Rs 4,00,000'],
                      ].map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          <td style={tdL}>{r[0]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[1]}</td>
                          <td style={{ ...tdR, fontWeight: 600 }}>{r[2]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  The higher old-regime exemption only matters below the Section 87A rebate threshold, since new-regime tax is already nil up to Rs 12 lakh taxable income regardless of age. Where it does matter is Section 80D: senior citizens can claim up to Rs 50,000 in health insurance premiums under the old regime, against Rs 25,000 for taxpayers below 60.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A resident senior citizen (60 or above) with no income from business or profession is exempt from paying advance tax under Section 207(2) and can pay the full amount at the time of filing the return instead.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-for-nri">Tax Regime for NRI Taxpayers</h2>
                <p style={p}>
                  NRI taxpayers in India are subject to the same income tax slab rates as resident individuals for income earned or received in India. The choice between old and new regimes applies to NRIs as well. However, specific provisions under Sections 115A through 115F may provide concessional tax rates for certain types of investment income earned by NRIs.
                </p>
                <p style={p}>
                  NRI income from NRE account interest is tax-free in India. NRO account interest is taxable. Capital gains from the sale of Indian assets are taxed at applicable rates. NRIs should carefully evaluate which regime works better given their specific income composition and available deductions.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The multi-currency selector in this calculator converts all amounts to USD, EUR, GBP, or other currencies, making it easier for NRI users to understand their Indian tax liability in their resident currency. Use the <Link href="/calculators/in-hand-salary-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>In-Hand Salary Calculator</Link> to compute your actual take-home pay after tax deductions.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Mistakes When Choosing a Tax Regime</h2>
                {[
                  ['Assuming last year\'s regime choice carries forward:', 'A salaried employee re-declares (or re-confirms) a regime preference with their employer at the start of every financial year for TDS purposes, and can still pick differently at ITR filing time. Nothing carries forward automatically the way it does for business-income taxpayers under the one-time Form 10-IEA rule.'],
                  ['Not informing the employer, leading to over-deduction:', 'If you do not declare a regime preference, the employer deducts TDS under the default new regime. If the old regime actually suits you better, you only get the difference back as a refund after filing your return, not through the year as extra take-home pay.'],
                  ['Comparing only slab rates and ignoring cess and surcharge:', 'A 30% slab rate is never the final number. A flat 4% cess applies to every tax bill, and income above Rs 50 lakh adds a surcharge on top, which can move the effective rate several points higher than the headline slab suggests.'],
                  ['Double-counting the standard deduction:', 'The standard deduction is a single fixed figure (Rs 75,000 new, Rs 50,000 old), not a per-component allowance. It is not added on top of Section 80C or HRA, it is a separate, automatic deduction from gross salary before any other deduction is applied.'],
                  ['Missing HRA documentation under the old regime:', 'Rent receipts and, above Rs 1 lakh in annual rent, the landlord\'s PAN are required to support an HRA claim. A claim without this paperwork risks being disallowed if the return is picked up for scrutiny, even if the exemption was calculated correctly.'],
                  ['Business-income taxpayers opting into the new regime without checking the one-time-switch rule:', 'Once a taxpayer with business or professional income switches from the new regime back to the old regime using Form 10-IEA, they cannot opt into the new regime again while that business income continues. Salaried taxpayers with no business income do not face this restriction.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="calculator-limitations">Limitations of This Calculator</h2>
                {[
                  ['No surcharge on income above Rs 50 lakh:', 'The result shown is slab tax plus 4% cess only. If your taxable income exceeds Rs 50 lakh, add the surcharge from the table above manually before comparing the two regimes.'],
                  ['No age-based exemption for senior citizens:', 'The old-regime calculation here uses the below-60 exemption limit of Rs 2,50,000. Senior and super senior citizens should adjust their expected old-regime tax down slightly using the exemption limits in the Senior Citizens section above.'],
                  ['80C, 80D, and HRA are entered as totals, not re-validated:', 'The calculator applies whatever deduction figures you enter as old-regime deductions. It does not independently check that your Section 80C entry stays within the Rs 1.5 lakh cap or that your HRA entry matches the actual Section 10(13A) formula; use the linked calculators for each section to get an accurate figure first.'],
                  ['Marginal relief is modeled only at the Section 87A cliff:', 'The nil-tax cutoff at Rs 12 lakh (new) and Rs 5 lakh (old) taxable income is handled correctly, but marginal relief at the surcharge thresholds (Rs 50 lakh, Rs 1 crore, Rs 2 crore, Rs 5 crore) is not modeled, since the calculator does not compute surcharge at all.'],
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
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Up to roughly Rs 12.75 lakh gross salary, the new regime is unbeatable: the Section 87A rebate brings tax to nil, and no deduction total under the old regime can go lower than zero.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Between Rs 13 lakh and Rs 20 lakh, the choice depends on your actual deductions. Check your income against the breakeven table above rather than assuming either regime wins by default.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Above Rs 24 lakh, the breakeven deduction level flattens at a fixed Rs 8 lakh, so the decision stops depending on exactly how high your income is and depends only on whether you can clear that fixed deduction bar.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Salaried employees without business income can re-run this comparison every year at ITR filing time. There is no lock-in, so it is worth checking again whenever your rent, home loan, or investment mix changes.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Tax Regime Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your annual income:</strong> use a quick preset or enter your gross total income from salary for the financial year.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add 80C, 80D, and HRA:</strong> enter your Section 80C investments (PPF, ELSS, EPF), Section 80D health insurance premiums, and HRA exemption if you pay rent.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>More details:</strong> click More settings to enter home loan interest and other deductions.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Compare:</strong> the result panel shows your tax under both regimes side by side, the winner highlighted, and a donut chart of take-home pay versus tax under the better regime.
                  </li>
                </ol>
                <p style={p}>
                  Click any input value to type a precise number. Use the currency selector to view amounts in USD, EUR, GBP, or other currencies. All calculations include the applicable Section 87A rebate and 4 per cent health and education cess.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="tax-regime-glossary">Tax Regime Glossary: Key Terms Explained</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['Gross Total Income', 'The sum of income from all heads (salary, house property, capital gains, business, other sources) before any deduction is applied.'],
                        ['Taxable Income', 'Gross Total Income minus the standard deduction and, under the old regime, any Chapter VI-A deductions claimed. Slab rates apply to this figure.'],
                        ['Standard Deduction', 'A fixed deduction from salary income requiring no proof or investment: Rs 75,000 under the new regime, Rs 50,000 under the old regime.'],
                        ['Rebate (Section 87A)', 'A provision that reduces tax payable to nil below a taxable-income threshold: Rs 12 lakh under the new regime, Rs 5 lakh under the old regime.'],
                        ['Marginal Relief', 'A cap that limits tax to the amount by which income exceeds a rebate or surcharge threshold, so crossing the threshold by a small amount does not create a disproportionately large tax jump.'],
                        ['Surcharge', 'An additional charge on the income tax amount itself (not on income) for taxable income above Rs 50 lakh, ranging from 10% to 37% under the old regime and capped at 25% under the new regime.'],
                        ['Cess', 'A flat 4% Health and Education Cess added to income tax plus surcharge, applicable under both regimes.'],
                        ['Assessment Year vs Financial Year', 'The Financial Year (FY) is the year income is earned (April to March). The Assessment Year (AY) is the following year, in which that income is assessed and the return is filed.'],
                        ['Form 10-IEA', 'The form a taxpayer with business or professional income files to opt out of the new regime and use the old regime instead, a one-time-per-lifetime choice for such taxpayers.'],
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

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }} itemProp="disclaimer">
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Tax liability depends on individual circumstances, applicable exemptions, and specific provisions of the Income Tax Act. This calculator is for educational and planning purposes only and does not constitute financial advice. Consult a SEBI-registered investment adviser or a qualified chartered accountant before making tax decisions.
                </p>
              </div>

              {/* Tax Guides by Salary */}
              <div style={{ marginTop: 36 }}>
                <h2 style={h2}>Income Tax Breakdown by Salary Level</h2>
                <p style={{ fontSize: 14, color: C.ink2, margin: '0 0 14px', lineHeight: 1.7 }}>
                  Each guide below has a complete slab-by-slab computation, old vs new regime comparison, and monthly in-hand salary for that specific salary level.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
                  {[
                    { lakh: 3, slug: 'income-tax-on-3-lakh-salary', zero: true },
                    { lakh: 4, slug: 'income-tax-on-4-lakh-salary', zero: true },
                    { lakh: 5, slug: 'income-tax-on-5-lakh-salary', zero: true },
                    { lakh: 6, slug: 'income-tax-on-6-lakh-salary', zero: true },
                    { lakh: 7, slug: 'income-tax-on-7-lakh-salary', zero: true },
                    { lakh: 8, slug: 'income-tax-on-8-lakh-salary', zero: true },
                    { lakh: 9, slug: 'income-tax-on-9-lakh-salary', zero: true },
                    { lakh: 10, slug: 'income-tax-on-10-lakh-salary', zero: true },
                    { lakh: 11, slug: 'income-tax-on-11-lakh-salary', zero: true },
                    { lakh: 12, slug: 'income-tax-on-12-lakh-salary', zero: true },
                    { lakh: 13, slug: 'income-tax-on-13-lakh-salary', zero: false },
                    { lakh: 14, slug: 'income-tax-on-14-lakh-salary', zero: false },
                    { lakh: 15, slug: 'income-tax-on-15-lakh-salary', zero: false },
                    { lakh: 18, slug: 'income-tax-on-18-lakh-salary', zero: false },
                    { lakh: 20, slug: 'income-tax-on-20-lakh-salary', zero: false },
                    { lakh: 25, slug: 'income-tax-on-25-lakh-salary', zero: false },
                    { lakh: 30, slug: 'income-tax-on-30-lakh-salary', zero: false },
                    { lakh: 35, slug: 'income-tax-on-35-lakh-salary', zero: false },
                    { lakh: 40, slug: 'income-tax-on-40-lakh-salary', zero: false },
                    { lakh: 50, slug: 'income-tax-on-50-lakh-salary', zero: false },
                    { lakh: 60, slug: 'income-tax-on-60-lakh-salary', zero: false },
                    { lakh: 75, slug: 'income-tax-on-75-lakh-salary', zero: false },
                    { lakh: 100, slug: 'income-tax-on-100-lakh-salary', zero: false },
                  ].map(({ lakh, slug, zero }) => (
                    <a key={lakh} href={`/tax/${slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 13px', background: C.white, border: `1px solid ${C.border}`, borderRadius: 8, textDecoration: 'none', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>Rs {lakh}L</span>
                      {zero
                        ? <span style={{ fontSize: 11, fontWeight: 700, color: '#1f7a58', background: '#f4f5f6', borderRadius: 99, padding: '2px 7px' }}>Zero</span>
                        : <span style={{ fontSize: 11, color: C.ink3 }}>View</span>}
                    </a>
                  ))}
                </div>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.old-vs-new-sidebar::-webkit-scrollbar{width:5px}.old-vs-new-sidebar::-webkit-scrollbar-track{background:transparent}.old-vs-new-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.old-vs-new-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside className="old-vs-new-sidebar" aria-label="Related calculators" style={{ position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden', fontFamily: INTER, background: C.white }}>
                <div style={{ background: C.bg, padding: '10px 16px', borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.ink3 }}>Quick Facts</span>
                </div>
                <div style={{ padding: '4px 16px' }}>
                  {[
                    ['New regime rebate', 'Up to Rs 60,000, income to Rs 12L'],
                    ['Old regime rebate', 'Up to Rs 12,500, income to Rs 5L'],
                    ['Standard deduction (new)', 'Rs 75,000'],
                    ['Standard deduction (old)', 'Rs 50,000'],
                    ['Tax-free salary (new)', 'Up to Rs 12.75L'],
                    ['Breakeven at Rs 15L income', 'Rs 5.44L deductions'],
                    ['Breakeven at Rs 20L income', 'Rs 7.08L deductions'],
                  ].map(([label, val], i, arr) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, padding: '9px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                      <span style={{ fontSize: 12.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: C.dark, textAlign: 'right' }}>{val}</span>
                    </div>
                  ))}
                </div>
                <Link href="/blogs/old-vs-new-tax-regime" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', padding: '11px 16px', fontSize: 12.5, fontWeight: 600, color: C.dark, textDecoration: 'none', borderTop: `1px solid ${C.border}`, background: '#f4f5f6' }}>
                  Full breakeven guide with worked examples &rarr;
                </Link>
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

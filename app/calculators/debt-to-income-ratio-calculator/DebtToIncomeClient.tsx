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

/* ─── Slider (exact VPF pattern) ────────────────────────────────── */
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

/* ─── Donut Chart: Debt vs Income (exact VPF geometry: one track, one overlay arc) ─── */
function DonutChart({ debtPct }: { debtPct: number }) {
  const shown = Math.max(0, Math.min(100, debtPct));
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const dArc = (shown / 100) * circ;
  return (
    <svg width="212" height="212" viewBox="0 0 212 212" role="img"
      aria-label={`Debt is ${Math.round(debtPct)}% of monthly income`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${dArc} ${circ - dArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>DTI</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 27, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{Math.round(debtPct)}%</text>
    </svg>
  );
}

/* ─── N-Year DTI Projection: income grows, debt held flat (VPF stacked-bar pattern) ─── */
interface DTIYear { year: number; income: number; debt: number; dti: number; category: string; }

function categoryOf(v: number): string {
  if (v < 15) return 'Excellent';
  if (v < 25) return 'Good';
  if (v < 36) return 'Fair';
  if (v < 43) return 'High';
  return 'Very High';
}

function buildDTIProjection(baseIncome: number, debt: number, growthPct: number, years: number): DTIYear[] {
  const rows: DTIYear[] = [];
  const rate = Math.max(0, growthPct) / 100;
  const startYear = new Date().getFullYear();
  for (let y = 1; y <= years; y++) {
    const income = baseIncome * Math.pow(1 + rate, y);
    const dti = income > 0 ? Math.min(100, (debt / income) * 100) : 0;
    rows.push({ year: startYear + y, income, debt, dti, category: categoryOf((debt / income) * 100) });
  }
  return rows;
}

function DTIProjectionChart({ rows }: { rows: DTIYear[] }) {
  if (rows.length === 0) return null;
  const W = 800, H = 160, PADL = 8, PADB = 20;
  const slot = (W - PADL) / rows.length;
  const barW = Math.max(4, Math.min(30, slot * 0.72));
  const gap = (slot - barW) / 2;
  return (
    <svg role="img" aria-label="Year-by-year DTI as income grows, debt held constant"
      viewBox={`0 0 ${W} ${H + PADB}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {rows.map((row, i) => {
        const debtH = (row.dti / 100) * H;
        const x = PADL + i * slot + gap;
        return (
          <g key={row.year}>
            <rect x={x} y={0} width={barW} height={H} fill={CHART_PAIR.secondary} rx={2} />
            <rect x={x} y={H - debtH} width={barW} height={debtH} fill={CHART_PAIR.primary} rx={2} />
            {rows.length <= 20 && (
              <text x={x + barW / 2} y={H + 14} textAnchor="middle"
                style={{ fontSize: rows.length > 12 ? 8 : 9, fill: C.ink3, fontFamily: INTER }}>
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

/* ─── Sidebar list (exact VPF pattern) ──────────────────────────── */
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
  { href: '/calculators/loan-eligibility-calculator',        label: 'Loan Eligibility Calculator' },
  { href: '/calculators/emi-calculator',                     label: 'EMI Calculator' },
  { href: '/calculators/home-loan-calculator',               label: 'Home Loan Calculator' },
  { href: '/calculators/personal-loan-calculator',           label: 'Personal Loan Calculator' },
  { href: '/calculators/car-loan-calculator',                label: 'Car Loan Calculator' },
  { href: '/calculators/credit-card-emi-calculator',         label: 'Credit Card EMI Calculator' },
  { href: '/calculators/home-loan-eligibility-calculator',   label: 'Home Loan Eligibility Calculator' },
];
const MORE = [
  { href: '/calculators/loan-calculator',                    label: 'Loan Calculator' },
  { href: '/calculators/education-loan-emi-calculator',      label: 'Education Loan EMI Calculator' },
  { href: '/calculators/in-hand-salary-calculator',          label: 'In-Hand Salary Calculator' },
  { href: '/calculators/ctc-calculator',                     label: 'CTC Calculator' },
  { href: '/calculators/income-tax-calculator',              label: 'Income Tax Calculator' },
];

/* ─── FAQ (single-sourced from faqData.ts) ──────────────────────── */
function FAQ() {
  return <FAQBox items={faqItems} />;
}

/* ─── Main ───────────────────────────────────────────────────────── */
export default function DebtToIncomeClient() {
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showNewLoan, setShowNewLoan] = useState(false);

  const INCOME_PRESETS = [30000, 50000, 75000, 100000, 150000, 200000, 300000];

  const defaultSettings = {
    income: 100000, housingDebt: 20000, vehicleDebt: 0, personalLoan: 0,
    eduDebt: 0, creditCard: 0, otherDebt: 0, proposedEMI: 10000,
    incomeGrowth: 8, projectionYears: 8,
  };
  const { settings, updateSettings } = useCalculatorSettings('debt-to-income-ratio-calculator', defaultSettings);
  const { income, housingDebt, vehicleDebt, personalLoan, eduDebt, creditCard, otherDebt, proposedEMI, incomeGrowth, projectionYears } = settings;

  const setIncome       = (v: number) => updateSettings({ income: v });
  const setHousingDebt  = (v: number) => updateSettings({ housingDebt: v });
  const setVehicleDebt  = (v: number) => updateSettings({ vehicleDebt: v });
  const setPersonalLoan = (v: number) => updateSettings({ personalLoan: v });
  const setEduDebt      = (v: number) => updateSettings({ eduDebt: v });
  const setCreditCard   = (v: number) => updateSettings({ creditCard: v });
  const setOtherDebt    = (v: number) => updateSettings({ otherDebt: v });
  const setProposedEMI  = (v: number) => updateSettings({ proposedEMI: v });
  const setIncomeGrowth = (v: number) => updateSettings({ incomeGrowth: v });
  const setProjectionYears = (v: number) => updateSettings({ projectionYears: v });

  const { formatCurrency, convertCurrency } = useCurrency();
  const fmtIN = (n: number) => formatCurrency(convertCurrency(n));
  const fmtC  = (n: number) => formatCurrency(convertCurrency(n), true);
  const fmtSigned = (n: number) => {
    const rounded = Math.round(n);
    return rounded === 0 ? fmtIN(0) : rounded < 0 ? `-${fmtIN(Math.abs(rounded))}` : fmtIN(rounded);
  };

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const totalDebt = housingDebt + vehicleDebt + personalLoan + eduDebt + creditCard + otherDebt;
  const dti = income > 0 ? (totalDebt / income) * 100 : 0;
  const remaining = income - totalDebt;
  const maxNew = Math.max(0, (0.36 * income) - totalDebt);
  const debtAfterNewLoan = totalDebt + proposedEMI;

  const dtiProjection = buildDTIProjection(income, debtAfterNewLoan, incomeGrowth, projectionYears);

  const category = (v: number) => {
    if (v < 15) return 'Excellent';
    if (v < 25) return 'Good';
    if (v < 36) return 'Fair';
    if (v < 43) return 'High';
    return 'Very High';
  };

  const frontEndDTI = income > 0 ? (housingDebt / income) * 100 : 0;

  const BAND_BOUNDARIES = [15, 25, 36, 43];
  const nextWorseBoundary = BAND_BOUNDARIES.find(b => dti < b);
  const roomStat = nextWorseBoundary !== undefined
    ? { label: 'Room Before Next DTI Band', value: fmtC(Math.max(0, (nextWorseBoundary / 100) * income - totalDebt)) }
    : { label: 'Debt to Cut to Reach High Band', value: fmtC(Math.max(0, totalDebt - 0.43 * income)) };

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
            Debt-to-Income Ratio Calculator
          </h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Calculate your DTI (or FOIR) ratio from your monthly income and debt payments, see how lenders would view your application, and check whether a new loan EMI would still fit.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR ── */}
            <section aria-label="Debt-to-Income Ratio Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{showAdvanced ? 'More Settings' : 'Inputs'}</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }} role="group" aria-label="Quick income presets">
                        {INCOME_PRESETS.map(v => (
                          <button key={v} onClick={() => setIncome(v)} aria-pressed={income === v}
                            style={{ padding: '4px 10px', fontSize: 12, background: C.white,
                              color: income === v ? C.ink : C.ink3,
                              border: `${income === v ? 1.5 : 1}px solid ${income === v ? C.ink : C.border}`,
                              fontWeight: income === v ? 700 : 500, borderRadius: 6, cursor: 'pointer',
                              fontFamily: INTER, transition: 'all 0.15s' }}>
                            {fmtC(v)}
                          </button>
                        ))}
                      </div>
                      <Slider label="Monthly Income" id="dti-income" value={income} min={5000} max={5000000} step={5000} fmt={fmtC} onChange={setIncome} compact={mobile} />
                      <Slider label="Housing (Home Loan EMI or Rent)" id="dti-housing" value={housingDebt} min={0} max={500000} step={1000} fmt={fmtC} onChange={setHousingDebt} compact={mobile} />
                      <Slider label="Vehicle Loan EMI" id="dti-vehicle" value={vehicleDebt} min={0} max={200000} step={1000} fmt={fmtC} onChange={setVehicleDebt} compact={mobile} />
                      <Slider label="Personal Loan EMI" id="dti-personal" value={personalLoan} min={0} max={200000} step={1000} fmt={fmtC} onChange={setPersonalLoan} compact={mobile} />

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <Slider label="Education Loan EMI" id="dti-edu" value={eduDebt} min={0} max={100000} step={1000} fmt={fmtC} onChange={setEduDebt} compact={mobile} />
                      <Slider label="Credit Card Minimum Payment" id="dti-credit" value={creditCard} min={0} max={100000} step={500} fmt={fmtC} onChange={setCreditCard} compact={mobile} />
                      <Slider label="Other EMIs" id="dti-other" value={otherDebt} min={0} max={200000} step={1000} fmt={fmtC} onChange={setOtherDebt} compact={mobile} />
                      <Slider label="Proposed New Loan / EMI" id="dti-proposed" value={proposedEMI} min={0} max={300000} step={1000} fmt={fmtC} onChange={setProposedEMI} compact={mobile} />
                      <Slider label="Annual Income Growth" id="dti-growth" value={incomeGrowth} min={0} max={20} step={0.5} fmt={v => `${v.toFixed(1)}%`} onChange={setIncomeGrowth} compact={mobile} />
                      <Slider label="Projection Years" id="dti-years" value={projectionYears} min={2} max={15} step={1} fmt={v => `${v} yr`} onChange={setProjectionYears} compact={mobile} />
                      <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                        These feed the N-Year DTI Projection below the calculator, showing how DTI changes as your income grows while your current EMIs (plus any proposed new one) stay fixed.
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
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 8 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
                      <div style={{ fontSize: mobile ? 13 : 14, fontWeight: 600, color: '#50565C' }}>DTI Ratio</div>
                      <div style={{ fontSize: mobile ? 12 : 13, color: '#7A8087' }}>{category(dti)}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 6 }}>
                      <div style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', lineHeight: 1 }}
                        aria-live="polite" aria-label={`DTI ratio: ${dti.toFixed(1)} percent, category ${category(dti)}`}>
                        {dti.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: mobile ? 13 : 15, fontWeight: 700, color: '#101214', lineHeight: 1 }}>of income</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 16, order: mobile ? 1 : -1 }}>
                    <DonutChart debtPct={dti} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 16, order: mobile ? 2 : -1, width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Debt</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Remaining</span>
                    </div>
                  </div>

                  {[
                    { label: 'Monthly Income', value: fmtC(income) },
                    { label: 'Total Monthly Debt', value: fmtC(totalDebt) },
                    { label: 'Front-End DTI (Housing Only)', value: `${frontEndDTI.toFixed(1)}%` },
                    { label: 'Remaining Income', value: fmtSigned(remaining) },
                    { label: 'DTI Category', value: category(dti) },
                    { label: 'Max Recommended New Debt (36% rule)', value: fmtC(maxNew) },
                    roomStat,
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '10px 0' : '13px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12.5 : 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Debt {Math.round(Math.min(100, dti))}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Remaining {Math.round(Math.max(0, 100 - dti))}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: C.lime2, overflow: 'hidden' }} role="img" aria-label={`Debt is ${Math.round(dti)}% of monthly income`}>
                      <div style={{ height: '100%', width: `${Math.max(0, Math.min(100, dti))}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* N-Year DTI Projection (collapsible, VPF pattern) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowNewLoan(v => !v)}
                  aria-expanded={showNewLoan} aria-controls="dti-projection-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>N-Year DTI Projection</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Income growing at {incomeGrowth.toFixed(1)}%, EMIs held flat</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#f4f5f6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {projectionYears} yr &middot; {incomeGrowth.toFixed(1)}%/yr
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showNewLoan ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showNewLoan && (
                  <div id="dti-projection-table" style={{ borderTop: `1px solid ${C.border}` }}>
                    <div style={{ padding: mobile ? '16px 16px 0' : '24px 44px 0' }}>
                      <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.primary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Debt Share of Income</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 2, background: CHART_PAIR.secondary }} aria-hidden="true" />
                          <span style={{ fontSize: 11.5, color: C.ink2 }}>Remaining Income</span>
                        </div>
                      </div>
                      <DTIProjectionChart rows={dtiProjection} />
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
                            {['Year', 'Projected Income (Monthly)', 'Debt (Held Flat)', 'DTI', 'Category'].map(h => (
                              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: C.ink3, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }} scope="col">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {dtiProjection.map((row, i) => (
                            <tr key={row.year} style={{ borderTop: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#fafafa' }}>
                              <td style={{ padding: '11px 14px', fontWeight: 700, color: C.dark }}>{row.year}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.income)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{fmtC(row.debt)}</td>
                              <td style={{ padding: '11px 14px', color: C.ink, fontWeight: 700 }}>{row.dti.toFixed(1)}%</td>
                              <td style={{ padding: '11px 14px', color: C.ink2 }}>{row.category}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div style={{ padding: mobile ? '16px' : '20px 44px 28px' }}>
                      <p style={{ fontSize: 12.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        This assumes your monthly EMIs{proposedEMI > 0 ? ', including the proposed new one,' : ''} stay fixed at {fmtC(debtAfterNewLoan)} while your income grows at {incomeGrowth.toFixed(1)}% a year, a reasonable assumption since most EMIs are a fixed amount for a fixed tenure. Your DTI improves on its own over time purely from income growth, as long as you do not take on additional new debt beyond what is modeled here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <div style={{ marginBottom: 40 }}><SaveResultsCard mobile={mobile} /></div>

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-dti">What Is Debt-to-Income Ratio?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    Debt-to-Income Ratio (DTI) is the percentage of your gross monthly income that goes toward paying debt obligations each month. It is the primary metric lenders use to judge whether you can afford a new loan.
                  </p>
                </div>
                <p style={p}>
                  Every time you apply for a home loan, a car loan, a personal loan, or a credit card, the lender calculates your DTI, which Indian banks and NBFCs usually call FOIR (Fixed Obligation to Income Ratio). If the ratio exceeds their threshold, the application is typically declined regardless of your credit score.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  A lower ratio means more of your income is free to service new debt, which makes you a lower-risk borrower in the lender's underwriting model.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-formula">DTI Formula: How to Calculate Debt-to-Income Ratio</h2>
                <p style={p}>The formula is a single division:</p>
                <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '14px 18px', marginBottom: 16 }}>
                  <code style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: C.dark }}>
                    DTI = (Total Monthly Debt Payments / Gross Monthly Income) x 100
                  </code>
                </div>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={{ ...thS, width: 160 }} scope="col">Component</th><th style={thS} scope="col">What It Includes</th></tr></thead>
                    <tbody>
                      {[
                        ['Total Monthly Debt', 'Home loan EMI or rent, car loan EMI, personal loan EMI, education loan EMI, credit card minimum payment, and other EMIs'],
                        ['Gross Monthly Income', 'Salary before tax and deductions, freelance income, rental income, and other regular income'],
                      ].map(([v, m]) => (
                        <tr key={v}><td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{v}</td><td style={tdR}>{m}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  <strong>Worked example:</strong> monthly income of Rs 1,50,000, with Rs 35,000 in home loan EMI, Rs 8,000 in car loan EMI, and a Rs 3,000 credit card minimum payment. Total monthly debt is Rs 46,000. DTI = (46,000 / 1,50,000) x 100 = 30.7%, a Fair rating by most lenders.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="front-end-back-end">Front-End vs Back-End DTI: The 28/36 Rule</h2>
                <p style={p}>
                  Front-end DTI (the housing ratio) counts only housing costs: home loan EMI or rent, property tax, and home insurance. Back-end DTI counts every monthly debt payment, housing included.
                </p>
                <p style={p}>
                  <strong>Worked example</strong> at Rs 1,50,000 monthly income: housing costs Rs 35,000, car EMI Rs 8,000, personal loan Rs 5,000, credit card minimum Rs 3,000. Front-end DTI = 35,000 / 1,50,000 = 23.3%. Back-end DTI = (35,000 + 8,000 + 5,000 + 3,000) / 1,50,000 = 34.0%.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  The 28/36 rule, common in US mortgage underwriting, caps front-end at 28% and back-end at 36%. Indian lenders do not formally use this rule, but their FOIR policies follow the same logic with different numbers, usually a single combined limit between 40% and 55% depending on the loan type.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="good-dti-ratio">What Is a Good DTI Ratio?</h2>
                <p style={p}>
                  A DTI below 36% is considered good. Below 15% is excellent. Between 25% and 36% is fair. Between 36% and 43% is high. Above 43% is very high and most lenders will reject the application outright.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">DTI Range</th><th style={thS} scope="col">Category</th><th style={thS} scope="col">Loan Approval Likelihood</th></tr></thead>
                    <tbody>
                      {[
                        ['Below 15%', 'Excellent', 'Very high approval chances, top-tier rates'],
                        ['15% to 25%', 'Good', 'Strong approval, standard rates'],
                        ['25% to 36%', 'Fair', 'Approved in most cases, may see rate adjustments'],
                        ['36% to 43%', 'High', 'Approval challenges, limited lender options'],
                        ['Above 43%', 'Very High', 'Likely rejection without debt reduction'],
                      ].map(([r, c, l]) => (
                        <tr key={r} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{r}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{c}</td>
                          <td style={tdL}>{l}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  These bands are general guidance, not a fixed pass or fail line. Indian lenders work with FOIR limits between 40% and 55%, and the exact cutoff depends on the loan type, your credit score, and the specific lender's internal policy.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-vs-foir">DTI vs FOIR: What Is the Difference?</h2>
                <p style={p}>
                  DTI and FOIR (Fixed Obligation to Income Ratio) measure the same thing: the share of monthly income already committed to debt payments. The calculation is identical. FOIR is simply the term Indian banks, housing finance companies, and NBFCs use; DTI is the international term.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Aspect</th><th style={thS} scope="col">DTI</th><th style={thS} scope="col">FOIR</th></tr></thead>
                    <tbody>
                      {[
                        ['Full form', 'Debt-to-Income Ratio', 'Fixed Obligation to Income Ratio'],
                        ['Region', 'International (US, Europe)', 'India'],
                        ['Formula', 'Total Debt / Income x 100', 'Total Fixed Obligations / Income x 100'],
                        ['Typical threshold', '36% (28/36 rule, US)', '40% to 55%, per lender policy'],
                        ['Used by', 'Global lenders, mortgage underwriters', 'Indian banks, NBFCs, HFCs'],
                      ].map(([a, b, c]) => (
                        <tr key={a} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{a}</td>
                          <td style={tdR}>{b}</td>
                          <td style={tdR}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-vs-debt-to-credit">DTI vs Debt-to-Credit Ratio: Don't Confuse These Two</h2>
                <p style={p}>
                  Debt-to-income ratio and debt-to-credit ratio sound similar but measure different things, and mixing them up is a common mistake.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Metric</th><th style={thS} scope="col">What It Measures</th><th style={thS} scope="col">Used For</th></tr></thead>
                    <tbody>
                      {[
                        ['Debt-to-Income Ratio (DTI)', 'Monthly debt payments divided by monthly income', 'Loan and credit application underwriting'],
                        ['Debt-to-Credit Ratio (Credit Utilisation)', 'Outstanding credit card balance divided by total credit card limit', 'A factor in your CIBIL and other credit scores'],
                      ].map(([m, w, u]) => (
                        <tr key={m} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{m}</td>
                          <td style={tdL}>{w}</td>
                          <td style={tdL}>{u}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  A borrower can have a comfortable DTI while still carrying a high debt-to-credit ratio on one card, since the two are calculated from entirely different numbers. This calculator computes DTI only; check your credit card statement or credit report for your debt-to-credit figure.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-lenders-use-dti">How Lenders Use DTI to Decide Your Loan Eligibility</h2>
                <p style={p}>
                  DTI is usually the first filter in a lender's underwriting process, calculated before the file goes to a detailed credit assessment.
                </p>
                {[
                  ['FOIR threshold check:', 'The lender compares your FOIR after the new EMI to their internal policy limit for that loan type. Exceeding it typically means an automatic decline or a reduced sanction amount, independent of your credit score.'],
                  ['Loan amount sizing:', 'For secured loans like home loans, lenders often work backward from the maximum FOIR to determine the highest EMI, and therefore the highest loan amount, you can be offered.'],
                  ['Combined with credit score:', 'A borrower can clear the FOIR check and still be declined on credit score, and vice versa. Lenders in India generally require both a FOIR within policy and a CIBIL score above a set minimum, commonly around 700 to 750.'],
                  ['Stated vs verified income:', 'Salaried applicants usually verify income through payslips and Form 16. Self-employed applicants often go through a more detailed income assessment, which can change the income figure the lender actually uses for the FOIR calculation.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-self-employed">DTI for Self-Employed and Business Owners</h2>
                <p style={p}>
                  Self-employed applicants go through the same DTI formula, but getting to the income figure the lender actually uses takes more work than for a salaried applicant.
                </p>
                {[
                  ['Income is averaged, not a single payslip:', 'Lenders typically average net profit (after tax) across the last 2 to 3 years of ITR filings, rather than using the most recent year alone, to smooth out year-to-year business fluctuations.'],
                  ['Business debt can be counted separately:', 'Existing business loans, overdraft facilities, and working capital loans may be assessed alongside personal debt, depending on how the applicant\'s finances are structured and whether the business is a proprietorship.'],
                  ['A CA-certified income statement is often required:', 'Beyond ITRs and bank statements, many lenders ask for a CA-certified profit and loss statement to confirm the declared income before finalising the FOIR calculation.'],
                  ['FOIR limits tend to be stricter:', 'Because verified income carries more uncertainty than a fixed salary, several lenders apply a slightly lower FOIR ceiling, or require a lower loan-to-value ratio, for self-employed applicants on the same loan type.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="joint-dti">How Joint Applications and Co-Applicants Affect DTI</h2>
                <p style={p}>
                  Adding a co-applicant combines both income and both debt into a single household DTI, which can meaningfully change the outcome.
                </p>
                <p style={p}>
                  <strong>Worked example:</strong> Applicant 1 earns Rs 70,000 a month with Rs 28,000 in existing debt, a solo DTI of 40% (High). Applicant 2, a spouse, earns Rs 50,000 with Rs 5,000 in debt. Applying jointly combines both: income of Rs 1,20,000 and debt of Rs 33,000, a joint DTI of 27.5%, moving the category from High to Fair.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  This works in both directions. A co-applicant with a strong income and low debt improves the combined DTI, while a co-applicant who brings more debt than income can push the combined ratio higher than either applicant's individual number. Most lenders require the co-applicant to also meet minimum credit score requirements, not just contribute income.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="checking-new-emi">Checking Whether You Can Afford a New EMI</h2>
                <p style={p}>
                  Before applying for a new loan, add the proposed EMI to your current debt and recalculate DTI using your existing income. Set the Proposed New Loan / EMI field in More Settings above and the N-Year DTI Projection section will factor it into every year shown.
                </p>
                <p style={p}>
                  <strong>Worked example:</strong> monthly income of Rs 1,00,000, current debt of Rs 33,000 (home EMI Rs 25,000 plus car EMI Rs 8,000), a current DTI of 33% (Fair). A proposed new personal loan EMI of Rs 15,000 would take total debt to Rs 48,000, a DTI of 48%, moving the category to Very High and putting the application at real risk of rejection at most lenders.
                </p>
                <p style={{ ...p, margin: 0 }}>
                  Running this check before applying, rather than after a rejection, avoids a hard credit inquiry that can itself have a small, temporary effect on your credit score.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-by-loan-type">DTI Benchmarks by Loan Type in India</h2>
                <p style={p}>
                  Lenders adjust their FOIR limits by loan type, based on tenure, whether the loan is secured, and how the loan is typically used.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>Typical FOIR ceilings used by Indian lenders. Approximate; varies by lender and applicant profile.</caption>
                    <thead><tr><th style={thS} scope="col">Loan Type</th><th style={thS} scope="col">Typical Max FOIR</th><th style={thS} scope="col">Notes</th></tr></thead>
                    <tbody>
                      {[
                        ['Home Loan', '50% to 55%', 'Long tenure (20-30 years), secured by property, most lenient FOIR'],
                        ['Personal Loan', '40% to 50%', 'Unsecured, shorter tenure (1-5 years), stricter thresholds'],
                        ['Car Loan', '45% to 50%', 'Secured by the vehicle, moderate tenure (3-7 years)'],
                        ['Education Loan', '45% to 55%', 'Some lenders factor in future earning potential'],
                        ['Credit Card', '40% to 50%', 'Issuers check both DTI and credit utilisation together'],
                      ].map(([t, m, n]) => (
                        <tr key={t} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{t}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{m}</td>
                          <td style={tdL}>{n}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-by-income-level">DTI Across Income Levels: A Reference Table</h2>
                <p style={p}>
                  The same rupee amount of debt lands in a completely different DTI category depending on income. This table holds monthly debt fixed at Rs 30,000 and varies only income, to show how much category alone depends on the income side of the formula.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, marginTop: 6, padding: '0 2px' }}>DTI at a fixed Rs 30,000 monthly debt, across income levels.</caption>
                    <thead><tr><th style={thS} scope="col">Monthly Income</th><th style={thS} scope="col">DTI at Rs 30,000 Debt</th><th style={thS} scope="col">Category</th></tr></thead>
                    <tbody>
                      {[
                        ['Rs 50,000', '60.0%', 'Very High'],
                        ['Rs 75,000', '40.0%', 'High'],
                        ['Rs 1,00,000', '30.0%', 'Fair'],
                        ['Rs 1,50,000', '20.0%', 'Good'],
                        ['Rs 2,00,000', '15.0%', 'Good'],
                        ['Rs 3,00,000', '10.0%', 'Excellent'],
                      ].map(([inc, d, c]) => (
                        <tr key={inc} style={{ borderBottom: `1px solid ${C.border}` }}>
                          <td style={{ ...tdL, fontWeight: 600, color: C.ink }}>{inc}</td>
                          <td style={{ ...tdR, fontWeight: 700 }}>{d}</td>
                          <td style={tdL}>{c}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ ...p, margin: 0 }}>
                  The same Rs 30,000 in monthly debt swings from Very High at Rs 50,000 income to Excellent at Rs 3,00,000 income. This is why DTI is always calculated fresh for each applicant rather than judged from the debt amount alone.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="improve-dti">How to Improve Your DTI Ratio</h2>
                <p style={p}>
                  There are exactly two ways to lower DTI: reduce monthly debt, or increase monthly income. Every practical strategy falls into one of these two categories.
                </p>
                {[
                  ['Pay off credit card balances:', 'The minimum payment on a credit card is calculated as a percentage of the outstanding balance, so paying it down reduces both total debt and the monthly minimum, improving DTI immediately.'],
                  ['Prepay high-interest loans:', 'A lump-sum prepayment on a personal loan or consumer loan reduces the outstanding principal. Choosing reduced EMI over reduced tenure at the time of prepayment lowers your monthly obligation and your DTI.'],
                  ['Avoid taking new EMIs:', 'Every new EMI adds to monthly debt. Until DTI is comfortably below 36%, financing a purchase through cash or a debit card instead of a new EMI keeps DTI from climbing further.'],
                  ['Increase your income:', 'A raise, a side income, or rental income all increase the denominator in the DTI formula. Even a modest income increase can move DTI from a high category to a fair one.'],
                  ['Refinance existing loans:', 'If rates have dropped since a loan was taken, refinancing can lower the EMI on the same outstanding balance, directly reducing monthly debt.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="common-mistakes">Common Mistakes When Calculating DTI</h2>
                <p style={p}>
                  <strong>Worked example of the most common one:</strong> income Rs 80,000, home EMI Rs 20,000, car EMI Rs 6,000. Leaving out a Rs 4,000 credit card minimum payment gives a DTI of 32.5% (Fair). Including it gives 37.5% (High), a different category entirely from one omitted line.
                </p>
                {[
                  ['Forgetting a debt line entirely:', 'Credit card minimum payments and smaller personal loans are the two most commonly left out, and both push the real DTI higher than the number a borrower expects.'],
                  ['Using net (take-home) income instead of gross income:', 'The standard DTI formula uses gross income before tax and deductions. Using net income instead understates the denominator and overstates DTI.'],
                  ['Excluding rent when there is no home loan:', 'Rent is a genuine fixed monthly obligation for financial planning purposes, even though some lenders do not count it in a formal FOIR calculation since it has no credit bureau record.'],
                  ['Comparing DTI across lenders as if it were one fixed number:', 'Each lender sets its own FOIR ceiling. A DTI that clears one bank\'s policy can still be declined by a more conservative lender for the same loan type.'],
                ].map(([title, text]) => (
                  <div key={title} style={{ marginBottom: 14 }}>
                    <strong style={{ fontSize: 15, color: C.ink }}>{title}</strong>{' '}
                    <span style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>{text}</span>
                  </div>
                ))}
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-limitations">Limitations of DTI Ratio</h2>
                {[
                  ['Ignores living expenses:', 'DTI measures debt against income only. It does not account for utility bills, groceries, insurance premiums, or other non-debt costs, so two borrowers with identical DTI can have very different amounts of disposable income left over.'],
                  ['Does not capture assets or savings:', 'A borrower with substantial fixed deposits and a DTI of 40% is often a safer credit risk than a borrower with no savings and a DTI of 30%, but DTI alone does not reflect that financial cushion.'],
                  ['Varies by lender:', 'One bank may accept a DTI of 42% that another declines. DTI is not a universal pass or fail threshold, which is why shopping across lenders can matter.'],
                  ['This calculator\'s "max recommended new debt" figure assumes a flat 36% back-end threshold:', 'Real lender policy for a specific loan type may be higher or lower than 36%, so treat that figure as a general planning guide, not a lender-specific pre-approval number.'],
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
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>DTI below 36% is the general "good" line, but Indian lenders work in FOIR terms with limits typically between 40% and 55% depending on the loan type.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Forgetting one debt line, most often a credit card minimum payment, is the single most common calculation mistake and can shift the result into a different lending category entirely.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>Checking DTI with a proposed new EMI added, before applying, avoids a rejected application and an unnecessary hard credit inquiry.</li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>DTI and debt-to-credit ratio (credit utilisation) are different metrics used for different purposes: one for loan underwriting, the other as a factor in your credit score.</li>
                </ul>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This DTI Calculator</h2>
                <ol style={{ margin: '0 0 16px', paddingLeft: 24, listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Enter your monthly income:</strong> use a quick preset or the slider for your gross monthly income before tax.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Add your debt payments:</strong> housing, vehicle, and personal loan are on the main screen; open More Settings for education loan, credit card minimum, and other EMIs.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Review your DTI:</strong> the result panel shows your ratio, category, remaining income, and the maximum new debt a flat 36% threshold would allow.
                  </li>
                  <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                    <strong style={{ color: C.ink }}>Project ahead:</strong> in More Settings, set a Proposed New Loan / EMI, an expected annual income growth rate, and a number of years, then open N-Year DTI Projection to see how your DTI evolves.
                  </li>
                </ol>
              </div>

              <div style={sec}>
                <h2 style={h2} id="dti-glossary">DTI Glossary: Key Terms Explained</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${C.border}`, fontSize: 13 }}>
                    <thead><tr><th style={thS} scope="col">Term</th><th style={thS} scope="col">Meaning</th></tr></thead>
                    <tbody>
                      {[
                        ['DTI (Debt-to-Income Ratio)', 'Total monthly debt payments divided by gross monthly income, expressed as a percentage.'],
                        ['FOIR (Fixed Obligation to Income Ratio)', 'The Indian banking term for the same calculation as DTI.'],
                        ['Front-End DTI', 'The share of income going only to housing costs: EMI or rent, property tax, and home insurance.'],
                        ['Back-End DTI', 'The share of income going to all monthly debt payments combined, housing included.'],
                        ['Gross Monthly Income', 'Income before tax and deductions, the denominator in the DTI formula.'],
                        ['Debt-to-Credit Ratio', 'Outstanding credit card balance divided by total credit limit, a different metric used in credit scoring.'],
                        ['Underwriting', 'The lender\'s process of assessing an application, including the DTI/FOIR check, before approving a loan.'],
                      ].map((r) => (
                        <tr key={r[0]} style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
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
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> This DTI calculator is for educational and planning purposes only. DTI thresholds vary across lenders and are one of several factors considered during loan approval, including CIBIL score, employment history, and asset profile. Results are indicative and do not constitute loan pre-approval, financial advice, or a guarantee of loan sanction. Consult a SEBI-registered financial adviser or your lender for a definitive eligibility assessment.
                </p>
              </div>

            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`.dti-sidebar::-webkit-scrollbar{width:5px}.dti-sidebar::-webkit-scrollbar-track{background:transparent}.dti-sidebar::-webkit-scrollbar-thumb{background:#C4C9C4;border-radius:99px}.dti-sidebar::-webkit-scrollbar-thumb:hover{background:#9FA59F}`}</style>
          <aside aria-label="Related calculators" className="dti-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: 16, position: mobile ? 'static' : 'sticky', top: 20, alignSelf: 'start', maxHeight: mobile ? 'none' : 'calc(100vh - 40px)', overflowY: mobile ? 'visible' : 'auto', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <SidebarList title="Popular Calculators" items={POPULAR} />
            <SidebarList title="More Calculators" items={MORE} />
          </aside>

        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter legalNote="Results are indicative. Not financial advice." columns={pipeColumns([
              { hd: 'Calculators', links: ['/calculators/emi-calculator|EMI', '/calculators/home-loan-calculator|Home Loan', '/calculators/personal-loan-calculator|Personal Loan', '/calculators/car-loan-calculator|Car Loan', '/calculators/loan-eligibility-calculator|Loan Eligibility', '/calculators/sip-calculator|SIP', '/calculators/fd-calculator|FD', '/calculators/income-tax-calculator|Income Tax'] },
              { hd: 'Topics',      links: ['/calculators/home-loan-calculator|Home Loans', '/calculators/emi-calculator|EMIs', '/calculators/fd-calculator|Fixed Deposits', '/calculators/retirement-calculator|Retirement'] },
              { hd: 'Company',     links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
        ])} />
    </div>
  );
}

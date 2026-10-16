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
import { FAQBox } from '@/components/common/FAQBox';
import { NPS_FAQS } from './faqData';

const C = {
  dark: '#101214', lime: '#a6dbc4', lime2: '#2d9970', paleLime: '#f4f5f6',
  ink: '#16140F', ink2: '#50565c', ink3: '#7a8087', white: '#ffffff',
  bg: '#f6f7f8', border: '#e3e6e8',
};
const INTER = 'var(--font-inter), Inter, sans-serif';
const STORAGE_KEY = 'fermor-nps-tax-benefit-v1';

type EmpType = 'private' | 'govt' | 'self';
type Regime = 'old' | 'new';

interface State {
  income: number;
  basicSalary: number;
  empType: EmpType;
  ownContrib: number;
  extraContrib1B: number;
  employerContrib: number;
  regime: Regime;
}

const DEFAULT: State = {
  income: 1200000,
  basicSalary: 600000,
  empType: 'private',
  ownContrib: 50000,
  extraContrib1B: 50000,
  employerContrib: 60000,
  regime: 'old',
};

/* ── Tax Calculation ──────────────────────────────────────────── */
function calcOldRegimeTax(income: number, totalDeductions: number): number {
  const standardDed = 50000;
  const taxable = Math.max(0, income - standardDed - totalDeductions);
  let tax = 0;
  if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
  if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
  if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;
  if (taxable <= 500000) tax = 0;
  return Math.round(tax * 1.04);
}

function calcNewRegimeTax(income: number, ccd2Deduction: number): number {
  const standardDed = 75000;
  const taxable = Math.max(0, income - standardDed - ccd2Deduction);
  let tax = 0;
  if (taxable > 400000) tax += Math.min(taxable - 400000, 400000) * 0.05;
  if (taxable > 800000) tax += Math.min(taxable - 800000, 400000) * 0.10;
  if (taxable > 1200000) tax += Math.min(taxable - 1200000, 400000) * 0.15;
  if (taxable > 1600000) tax += Math.min(taxable - 1600000, 400000) * 0.20;
  if (taxable > 2000000) tax += Math.min(taxable - 2000000, 400000) * 0.25;
  if (taxable > 2400000) tax += (taxable - 2400000) * 0.30;
  if (taxable <= 1200000) tax = 0;
  return Math.round(tax * 1.04);
}

/* ── Slider ────────────────────────────────────────────────────── */
function Slider({ label, value, min, max, step, fmt, onChange, compact, id }: {
  label: string; value: number; min: number; max: number; step: number;
  fmt: (v: number) => string; onChange: (v: number) => void; compact?: boolean; id?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [raw, setRaw] = useState('');
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  const commit = () => {
    setEditing(false);
    const n = parseFloat(raw.replace(/[^0-9.]/g, ''));
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div style={{ marginBottom: compact ? 18 : 32 }}>
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
        <input type="range" id={inputId} min={min} max={max} step={step} value={value}
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

/* ── Toggle ────────────────────────────────────────────────────── */
function Toggle({ options, value, onChange, label }: {
  options: { value: string; label: string }[];
  value: string; onChange: (v: string) => void; label: string;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 14, color: C.ink2, fontWeight: 400, margin: '0 0 10px' }}>{label}</p>
      <div role="radiogroup" aria-label={label} style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
        {options.map(opt => {
          const active = value === opt.value;
          return (
            <button key={opt.value} role="radio" aria-checked={active}
              onClick={() => onChange(opt.value)}
              style={{ flex: 1, padding: '10px 8px', fontSize: 12.5, fontWeight: active ? 600 : 400, color: active ? C.ink : C.ink3, background: active ? C.white : 'transparent', border: 'none', cursor: 'pointer', fontFamily: INTER, transition: 'all 0.12s' }}>
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Donut Chart ───────────────────────────────────────────────── */
function DonutChart({ savedPct }: { savedPct: number }) {
  const paidPct = 100 - savedPct;
  const R = 78, sw = 20, cx = 104, cy = 104;
  const circ = 2 * Math.PI * R;
  const sArc = (savedPct / 100) * circ;
  return (
    <svg width="208" height="208" viewBox="0 0 208 208" role="img"
      aria-label={`NPS tax saved ${savedPct.toFixed(0)}% of total tax without NPS, remaining tax ${paidPct.toFixed(0)}%`}
      style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${sArc} ${circ - sArc}`} strokeDashoffset={circ / 4}
        style={{ transition: 'stroke-dasharray 0.4s ease' }} />
      <text x={cx} y={cy - 8} textAnchor="middle" style={{ fontSize: 11, fill: C.ink3, fontFamily: INTER }}>Saved</text>
      <text x={cx} y={cy + 18} textAnchor="middle" style={{ fontSize: 26, fontWeight: 800, fill: C.dark, fontFamily: INTER }}>{savedPct.toFixed(0)}%</text>
    </svg>
  );
}

/* ── Sidebar List ──────────────────────────────────────────────── */
function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, flexShrink: 0 }}>
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
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/nps-calculator', label: 'NPS Maturity Calculator' },
  { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator' },
];
const MORE = [
  { href: '/calculators/ppf-calculator', label: 'PPF Calculator' },
  { href: '/calculators/epf-calculator', label: 'EPF Calculator' },
  { href: '/calculators/hra-calculator', label: 'HRA Calculator' },
  { href: '/calculators/in-hand-salary-calculator', label: 'In-Hand Salary Calculator' },
  { href: '/calculators/elss-calculator', label: 'ELSS Calculator' },
];

/* ── FAQ ───────────────────────────────────────────────────────── */
const FAQS = NPS_FAQS;

function FAQ() {
  return <FAQBox items={FAQS} />;
}

/* ── Main Component ────────────────────────────────────────────── */
export default function NPSTaxBenefitClient() {
  const [state, setState] = useState<State>(DEFAULT);
  const [mobile, setMobile] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const { formatCurrency, convertCurrency } = useCurrency();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState({ ...DEFAULT, ...JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);

  useLayoutEffect(() => {
    const chk = () => setMobile(window.innerWidth < 1024);
    chk(); window.addEventListener('resize', chk);
    return () => window.removeEventListener('resize', chk);
  }, []);

  const set = (k: keyof State, v: unknown) => setState(p => ({ ...p, [k]: v }));
  const fmtC = (n: number) => formatCurrency(convertCurrency(n), true);

  const result = useMemo(() => {
    const { income, basicSalary, empType, ownContrib, extraContrib1B, employerContrib, regime } = state;

    // 80CCD(1) limits
    const ccd1Pct = empType === 'self' ? 0.20 : 0.10;
    const ccd1PctLimit = Math.round(basicSalary * ccd1Pct);
    const ccd1MaxWithin80C = 150000;
    const ccd1Deduction = empType === 'self'
      ? Math.min(ownContrib, ccd1PctLimit, ccd1MaxWithin80C)
      : Math.min(ownContrib, ccd1PctLimit, ccd1MaxWithin80C);

    // 80CCD(1B) extra deduction
    const ccd1bDeduction = regime === 'old' ? Math.min(extraContrib1B, 50000) : 0;

    // 80CCD(2) employer deduction
    const ccd2PctLimit = empType === 'govt' || regime === 'new' ? 0.14 : 0.10;
    const ccd2Max = empType === 'self' ? 0 : Math.round(basicSalary * ccd2PctLimit);
    const ccd2Deduction = empType === 'self' ? 0 : Math.min(employerContrib, ccd2Max);

    const totalNPSDeduction = (regime === 'old' ? ccd1Deduction : 0) + ccd1bDeduction + ccd2Deduction;

    // Tax calculations
    let taxWithout: number, taxWith: number;
    if (regime === 'old') {
      taxWithout = calcOldRegimeTax(income, 0);
      taxWith = calcOldRegimeTax(income, totalNPSDeduction);
    } else {
      taxWithout = calcNewRegimeTax(income, 0);
      taxWith = calcNewRegimeTax(income, ccd2Deduction);
    }

    const taxOnly = (d: number) => regime === 'old' ? calcOldRegimeTax(income, d) : calcNewRegimeTax(income, d);
    const savedBy = (d: number) => d > 0 ? Math.max(0, taxWithout - taxOnly(d)) : 0;
    const sectionRows = [
      { label: '80CCD(1) Own Contribution', ded: regime === 'old' ? ccd1Deduction : 0, saved: regime === 'old' ? savedBy(ccd1Deduction) : 0 },
      { label: '80CCD(1B) Extra Deduction', ded: ccd1bDeduction, saved: savedBy(ccd1bDeduction) },
      { label: '80CCD(2) Employer Contribution', ded: ccd2Deduction, saved: savedBy(ccd2Deduction) },
    ];
    const taxSaved = Math.max(0, taxWithout - taxWith);
    const savedPct = taxWithout > 0 ? Math.min(100, (taxSaved / taxWithout) * 100) : 0;

    return {
      ccd1Deduction: regime === 'old' ? ccd1Deduction : 0,
      ccd1PctLimit,
      ccd1bDeduction,
      ccd2Deduction,
      ccd2Max,
      totalNPSDeduction,
      taxWithout,
      taxWith,
      taxSaved,
      savedPct,
      sectionRows,
    };
  }, [state]);

  const h2 = { fontSize: mobile ? 17 : 20, fontWeight: 700, color: C.ink, margin: '0 0 12px' } as React.CSSProperties;
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.85, margin: '0 0 16px' } as React.CSSProperties;
  const sec = { margin: '0 0 44px' } as React.CSSProperties;

  const empTypeLabel = { private: 'Salaried Private', govt: 'Salaried Government', self: 'Self-employed' }[state.empType];

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>

        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            NPS Tax Benefit Calculator
          </h1>
          <p style={{ fontSize: 14.5, color: C.ink3, margin: 0 }}>
            Calculate your NPS tax deduction under Section 80CCD(1), 80CCD(1B), and 80CCD(2) for old and new tax regimes
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>

            {/* ── CALCULATOR CARD ── */}
            <section aria-label="NPS Tax Benefit Calculator" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 16px rgba(16,18,20,0.06)', marginBottom: 40 }}>

              <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1fr)' }}>

                {/* Input panel */}
                <div style={{ padding: mobile ? '24px 18px' : '40px 44px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    {!mobile && <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Inputs</p>}
                    {mobile && <div />}
                    <CurrencySelector theme="light" />
                  </div>

                  {!showAdvanced ? (
                    <>
                      <Toggle label="Tax Regime"
                        options={[{ value: 'old', label: 'Old Regime' }, { value: 'new', label: 'New Regime' }]}
                        value={state.regime}
                        onChange={v => set('regime', v as Regime)} />

                      <Toggle label="Employment Type"
                        options={[{ value: 'private', label: 'Private' }, { value: 'govt', label: 'Government' }, { value: 'self', label: 'Self-employed' }]}
                        value={state.empType}
                        onChange={v => set('empType', v as EmpType)} />

                      <Slider label="Annual Gross Income" id="nps-income" value={state.income} min={300000} max={50000000} step={50000} fmt={fmtC} onChange={v => set('income', v)} compact={mobile} />

                      {state.empType !== 'self' && (
                        <Slider label="Annual Basic Salary" id="nps-basic" value={state.basicSalary} min={100000} max={30000000} step={50000} fmt={fmtC} onChange={v => set('basicSalary', v)} compact={mobile} />
                      )}

                      {state.empType !== 'self' && (
                        <Slider
                          label={`Employer NPS Contribution (80CCD(2) limit: Rs ${result.ccd2Max.toLocaleString('en-IN')})`}
                          id="nps-employer"
                          value={state.employerContrib}
                          min={0}
                          max={state.empType === 'govt' ? Math.round(state.basicSalary * 0.20) : Math.round(state.basicSalary * 0.15)}
                          step={5000}
                          fmt={fmtC}
                          onChange={v => set('employerContrib', v)}
                          compact={mobile} />
                      )}

                      {state.regime === 'new' && state.empType === 'self' && (
                        <div style={{ background: '#FFF4E5', border: '1px solid #FFD8A8', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: '#A15C00', marginBottom: 20 }}>
                          Under the new tax regime, self-employed NPS contributions have no tax benefit. Only employer contributions (80CCD(2)) are deductible, which does not apply to self-employed individuals.
                        </div>
                      )}

                      <button onClick={() => setShowAdvanced(true)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        More settings
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    </>
                  ) : (
                    <>
                      {state.empType === 'self' && (
                        <div style={{ background: '#f4f5f6', border: `1px solid ${C.border}`, borderRadius: 8, padding: '10px 14px', marginBottom: 28, fontSize: 13, color: C.ink2 }}>
                          <strong>Self-employed:</strong> Your 80CCD(1) limit is 20% of gross income (Rs {Math.round(state.income * 0.20).toLocaleString('en-IN')}).
                        </div>
                      )}

                      {state.regime === 'old' && (
                        <Slider
                          label={`Own NPS Contribution (80CCD(1) limit: Rs ${Math.round(state.empType === 'self' ? state.income * 0.20 : state.basicSalary * 0.10).toLocaleString('en-IN')})`}
                          id="nps-own"
                          value={state.ownContrib}
                          min={0}
                          max={150000}
                          step={5000}
                          fmt={fmtC}
                          onChange={v => set('ownContrib', v)}
                          compact={mobile} />
                      )}

                      {state.regime === 'old' && (
                        <Slider label="Additional NPS Contribution 80CCD(1B) (max Rs 50,000)" id="nps-1b" value={state.extraContrib1B} min={0} max={50000} step={1000} fmt={fmtC} onChange={v => set('extraContrib1B', v)} compact={mobile} />
                      )}

                      {state.regime === 'new' && (
                        <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: '0 0 20px' }}>
                          80CCD(1) and 80CCD(1B) own-contribution deductions are not available under the new tax regime. Only 80CCD(2) employer contributions apply.
                        </p>
                      )}

                      <button onClick={() => setShowAdvanced(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: C.dark, background: 'none', border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 14px', cursor: 'pointer', fontFamily: INTER, fontWeight: 600 }}>
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        Back
                      </button>
                    </>
                  )}
                </div>

                {/* Result panel */}
                <div style={{ padding: mobile ? '24px 18px' : '40px 44px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 10, padding: mobile ? '12px 16px' : '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', marginBottom: 20, gap: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Tax Saved</span>
                      <p style={{ fontSize: mobile ? 22 : 28, fontWeight: 800, color: '#1F7A58', margin: '4px 0 0', letterSpacing: '-0.02em' }} aria-live="polite">
                        {fmtC(result.taxSaved)}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, fontWeight: 600, color: '#50565C' }}>Total NPS Deduction</span>
                      <p style={{ fontSize: mobile ? 18 : 22, fontWeight: 700, color: '#101214', margin: '4px 0 0', opacity: 0.9 }} aria-live="polite">
                        {fmtC(result.totalNPSDeduction)}
                      </p>
                    </div>
                  </div>

                  {[
                    { label: `80CCD(1) Own Contribution${state.regime === 'new' ? ' (not available in new regime)' : ''}`, value: fmtC(result.ccd1Deduction) },
                    { label: `80CCD(1B) Extra Deduction${state.regime === 'new' ? ' (not available in new regime)' : ''}`, value: fmtC(result.ccd1bDeduction) },
                    { label: `80CCD(2) Employer Contribution (limit Rs ${fmtC(result.ccd2Max)})`, value: fmtC(result.ccd2Deduction) },
                    { label: 'Tax without NPS', value: fmtC(result.taxWithout) },
                    { label: 'Tax with NPS', value: fmtC(result.taxWith) },
                    { label: 'Regime', value: state.regime === 'old' ? 'Old Regime' : 'New Regime' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '9px 0' : '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: mobile ? 12 : 13, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: mobile ? 12.5 : 14, fontWeight: 700, color: C.ink }}>{value}</span>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: mobile ? 16 : 0, marginBottom: mobile ? 0 : 12, order: mobile ? 1 : -1 }}>
                    <DonutChart savedPct={result.savedPct} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: mobile ? 8 : 14, order: mobile ? 2 : -1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Saved {result.savedPct.toFixed(0)}%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 12, color: C.ink2 }}>Paid {(100 - result.savedPct).toFixed(0)}%</span>
                    </div>
                  </div>

                  <div style={{ width: '100%', marginTop: mobile ? 8 : 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Saved {result.savedPct.toFixed(0)}%</span>
                      <span style={{ fontSize: 11.5, color: C.ink3 }}>Paid {(100 - result.savedPct).toFixed(0)}%</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 99, background: C.lime2, overflow: 'hidden' }} role="img" aria-label={`NPS tax saved is ${result.savedPct.toFixed(0)}% of tax without NPS`}>
                      <div style={{ height: '100%', width: `${result.savedPct}%`, background: C.dark, borderRadius: 99, transition: 'width 0.4s ease' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section-wise tax saving (collapsible strip) */}
              <div style={{ borderTop: `1px solid ${C.border}` }}>
                <button onClick={() => setShowSchedule(v => !v)}
                  aria-expanded={showSchedule} aria-controls="nps-section-table"
                  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: mobile ? '14px 20px' : '18px 44px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: INTER, gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, color: C.ink }}>Section-Wise Tax Saving</span>
                    {!mobile && <span style={{ fontSize: 12.5, color: C.ink3, marginLeft: 8 }}>Tax saved by each NPS section</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: C.dark, background: '#F4F5F6', border: `1px solid ${C.border}`, padding: '3px 9px', borderRadius: 20, whiteSpace: 'nowrap' }}>
                      {state.regime === 'old' ? 'Old regime' : 'New regime'}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.ink3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      aria-hidden="true" style={{ transform: showSchedule ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                {showSchedule && (
                  <div id="nps-section-table" style={{ borderTop: `1px solid ${C.border}`, overflowX: 'auto' }}>
                    <table style={{ width: '100%', minWidth: 460, borderCollapse: 'collapse', fontSize: 13 }}>
                      <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: 12, color: C.ink3, padding: mobile ? '8px 20px 14px' : '8px 44px 16px' }}>Each saving is measured on its own, so the rows can differ slightly from the total</caption>
                      <thead>
                        <tr style={{ background: '#F4F5F6' }}>
                          {['NPS Section', 'Deduction', 'Tax Saved'].map((h, i) => (
                            <th key={h} scope="col" style={{ padding: mobile ? '10px 20px' : '10px 44px', textAlign: i === 0 ? 'left' : 'right', fontWeight: 700, color: C.ink, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.sectionRows.map((r, i) => (
                          <tr key={r.label} style={{ borderBottom: `1px solid ${C.border}`, background: i % 2 === 0 ? C.white : '#FAFAFA' }}>
                            <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 700, color: C.ink }}>{r.label}</td>
                            <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', color: C.ink2 }}>{fmtC(r.ded)}</td>
                            <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.dark }}>{fmtC(r.saved)}</td>
                          </tr>
                        ))}
                        <tr style={{ background: '#F4F5F6' }}>
                          <td style={{ padding: mobile ? '12px 20px' : '12px 44px', fontWeight: 800, color: C.ink }}>Total</td>
                          <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 700, color: C.ink }}>{fmtC(result.totalNPSDeduction)}</td>
                          <td style={{ padding: mobile ? '12px 20px' : '12px 44px', textAlign: 'right', fontWeight: 800, color: C.dark }}>{fmtC(result.taxSaved)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* Save Results */}
            <SaveResultsCard mobile={mobile} />

            

            {/* ── ARTICLE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>

              <div style={sec}>
                <h2 style={h2} id="what-is-nps-tax-benefit">What Are NPS Tax Benefits?</h2>
                <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                    NPS offers tax benefits under three sections: 80CCD(1) for your own contribution, 80CCD(1B) for an extra Rs 50,000, and 80CCD(2) for your employer contribution. Together they can cut taxable income by up to Rs 2 lakh from your own money, plus the employer deduction.
                  </p>
                </div>
                <p style={p}>
                  NPS is regulated by the <a href="https://www.pfrda.org.in" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Pension Fund Regulatory and Development Authority (PFRDA)</a>. Both Tier-I (retirement-focused, locked-in) and Tier-II (flexible, liquid) accounts exist, but tax benefits apply only to Tier-I contributions for most taxpayers.
                </p>
                <p style={p}>
                  The tax benefit structure makes NPS one of the most tax-efficient investment products available in India, especially for salaried employees in the 30% tax slab whose employers offer corporate NPS, and for self-employed professionals with high gross incomes.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="80ccd1">Section 80CCD(1): Own Contribution Deduction</h2>
                <p style={p}>
                  Section 80CCD(1) allows a deduction for your own contribution to NPS Tier-I. The limit is 10% of basic salary + DA for salaried employees or 20% of gross total income for self-employed individuals. This deduction is counted within the overall Rs 1.5 lakh Section 80C limit.
                </p>
                <p style={p}>
                  If EPF, PPF, ELSS or life insurance already fill your Rs 1.5 lakh 80C limit, extra NPS under 80CCD(1) adds no tax benefit. Many salaried employees with a basic above Rs 50,000 a month fill most of the limit through EPF alone.
                </p>
                <p style={p}>
                  Under the new tax regime, Section 80CCD(1) is not available. The deduction applies only when you file under the old regime.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="80ccd1b">Section 80CCD(1B): The Extra Rs 50,000 NPS Deduction</h2>
                <p style={p}>
                  Section 80CCD(1B) is the most widely recommended NPS benefit. It allows an additional deduction of up to Rs 50,000 per year for voluntary NPS contributions, completely separate from and over the Rs 1.5 lakh Section 80C limit. This means even if your 80C bucket is completely full, you can still reduce your taxable income by Rs 50,000 by contributing to NPS.
                </p>
                <p style={p}>
                  At the 30% tax slab (income above Rs 10 lakh), this Rs 50,000 deduction saves Rs 15,600 in tax (Rs 50,000 × 31.2% including 4% cess). A salaried employee investing Rs 4,167 per month in NPS through SIP-like auto-debit can save Rs 15,600 annually, the equivalent of getting more than 3 months' contribution back as tax savings.
                </p>
                <p style={p}>
                  This deduction is only available under the old tax regime and requires the contribution to be to an NPS Tier-I account. Use the <Link href="/calculators/section-80c-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Section 80C Calculator</Link> alongside this calculator to plan your complete deduction strategy.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="80ccd2">Section 80CCD(2): Employer Contribution Deduction</h2>
                <p style={p}>
                  Section 80CCD(2) covers the deduction for your employer's contribution to your NPS Tier-I account. This is the most valuable NPS deduction from a net-benefit perspective because it is available under both the old and new tax regimes, and it does not count toward the Rs 1.5 lakh 80C limit or the Rs 50,000 80CCD(1B) cap.
                </p>
                <p style={p}>
                  The limit is 14% of basic + DA for government employees, and for any employee who chooses the new regime. Private sector employees in the old regime get 10%.
                </p>
                <p style={p}>
                  For employees on the new tax regime (which has no 80C, 80D, or HRA deductions), 80CCD(2) is often the one remaining tax deduction available, making corporate NPS particularly valuable in the new regime context.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="nps-limits-table">NPS Tax Deduction Limits at a Glance</h2>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', padding: '8px 0 0' }}>NPS tax deduction limits by section</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        {['Section', 'Who Benefits', 'Limit', 'Available in New Regime?'].map(h => (
                          <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, border: `1px solid ${C.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['80CCD(1)', 'Salaried / Self-employed', '10% of basic (salaried) or 20% of gross (self-employed), within Rs 1.5L 80C cap', 'No'],
                        ['80CCD(1B)', 'All NPS contributors', 'Rs 50,000 (over and above 80C limit)', 'No'],
                        ['80CCD(2)', 'Salaried employees with employer NPS', '14% of basic+DA (govt, or any employee in new regime); 10% for private in old regime. No absolute cap', 'Yes'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ padding: '10px 14px', color: j === 0 ? C.dark : C.ink2, fontWeight: j === 0 ? 700 : 400, borderBottom: `1px solid ${C.border}` }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* In-Content Promo Bar */}
              <div style={{ marginBottom: 44, display: 'flex', background: '#f6f7f8', border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
                <div style={{ flex: 1, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: '0 0 2px', fontFamily: INTER }}>
                      Should you be in old regime or new regime?
                    </p>
                    <p style={{ fontSize: 13, color: C.ink3, margin: 0, fontFamily: INTER }}>
                      Compare both regimes with your NPS and all other deductions.
                    </p>
                  </div>
                  <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 12.5, fontWeight: 700, color: C.dark, background: C.lime, padding: '9px 18px', borderRadius: 8, textDecoration: 'none', fontFamily: INTER, whiteSpace: 'nowrap' }}>
                    Open calculator
                  </Link>
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="old-vs-new-regime">NPS Tax Benefits in Old vs New Regime</h2>
                <p style={p}>
                  The old regime allows all three NPS deductions. The new regime allows only 80CCD(2), the employer contribution. For employees with a large employer NPS contribution, that keeps the new regime competitive.
                </p>
                <p style={p}>
                  For employees without corporate NPS (employer does not contribute to NPS), the new regime provides zero NPS benefit, making the old regime the only option if NPS is a significant part of the tax-planning strategy. Self-employed individuals on the new regime also lose all NPS tax benefit, since there is no employer.
                </p>
                <p style={p}>
                  The crossover depends on your total deductions. Rs 1.5 lakh in 80C, Rs 50,000 in 80CCD(1B) and Rs 75,000 in 80D add up to Rs 2.75 lakh, which often beats the new regime. The <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>Old vs New Regime Calculator</Link> computes this for your exact numbers.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="worked-examples">NPS Tax Savings: Worked Examples</h2>
                <p style={p}>
                  Consider Priya, a private sector software engineer with an annual income of Rs 18 lakh, basic salary of Rs 9 lakh, and already maxed out 80C at Rs 1.5 lakh through EPF and ELSS.
                </p>
                <div style={{ overflowX: 'auto', marginBottom: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, border: `1px solid ${C.border}` }}>
                    <caption style={{ captionSide: 'bottom', fontSize: 11.5, color: C.ink3, textAlign: 'left', padding: '8px 0 0' }}>NPS tax savings worked example: Priya, Rs 18L income, private sector</caption>
                    <thead>
                      <tr style={{ background: '#f4f5f6' }}>
                        {['Deduction', 'Amount', 'Tax Saved (30% slab)'].map(h => (
                          <th key={h} scope="col" style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: C.ink, border: `1px solid ${C.border}` }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['80CCD(1) in 80C (already maxed)', 'Rs 0 extra benefit', 'Rs 0 additional'],
                        ['80CCD(1B) extra voluntary contribution', 'Rs 50,000', 'Rs 15,600'],
                        ['80CCD(2) employer 10% of Rs 9L basic', 'Rs 90,000', 'Rs 28,080'],
                        ['Total additional NPS benefit', 'Rs 1,40,000', 'Rs 43,680'],
                      ].map((row, i) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? C.white : '#fafafa' }}>
                          {row.map((cell, j) => (
                            <td key={j} style={{ padding: '10px 14px', color: j === 0 ? C.ink2 : C.ink, fontWeight: j > 0 ? 600 : 400, borderBottom: `1px solid ${C.border}` }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={p}>
                  Priya saves Rs 43,680 in additional tax through NPS beyond her standard 80C savings. Her employer NPS contribution itself costs her nothing extra. It is part of her CTC, making 80CCD(2) effectively free tax optimization.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="govt-vs-private">Government vs Private Employee NPS Benefits</h2>
                <p style={p}>
                  Government employees who joined after January 2004 are covered by NPS, and the government contributes 14% of basic + DA. On a basic of Rs 60,000 a month that is Rs 8,400 a month (Rs 1,00,800 a year), all deductible under 80CCD(2).
                </p>
                <p style={p}>
                  Private sector employees get 10% in the old regime and 14% in the new regime.
                </p>
                <p style={p}>
                  Private sector employees can lobby their employer to offer corporate NPS as part of the CTC structure, since it reduces their taxable income through 80CCD(2) without any cash outflow above the CTC. Many large Indian corporations now structure a portion of CTC as employer NPS contribution for this reason.
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="self-employed-nps">Self-Employed NPS Tax Benefits</h2>
                <p style={p}>
                  Self-employed professionals (doctors, lawyers, consultants, freelancers) can open an NPS Tier-I account through any Point of Presence (PoP) or online through <a href="https://enps.nsdl.com" target="_blank" rel="noopener noreferrer" style={{ color: C.dark, fontWeight: 600 }}>eNPS</a>. The 80CCD(1) limit for self-employed is 20% of gross income versus 10% for salaried: a meaningful difference at high incomes.
                </p>
                <p style={p}>
                  A self-employed individual earning Rs 30 lakh gross can contribute Rs 6 lakh to NPS under 80CCD(1), of which Rs 1.5 lakh qualifies within the 80C limit. The remaining Rs 50,000 under 80CCD(1B) brings total NPS deduction to Rs 2 lakh. At the 30% slab, this saves Rs 62,400 in tax, more than any other Rs 2 lakh investment can deliver in equivalent deduction.
                </p>
                <p style={p}>
                  There is no 80CCD(2) benefit for self-employed (no employer), so the maximum own-contribution deduction is Rs 2 lakh: Rs 1.5 lakh within 80C + Rs 50,000 under 80CCD(1B).
                </p>
              </div>

              <div style={sec}>
                <h2 style={h2} id="claim-itr">How to Claim NPS Deduction When Filing Your ITR</h2>
                <p style={p}>
                  NPS deductions require you to actively claim them in your ITR. They are not automatically computed. Your employer may reflect 80CCD(1) and 80CCD(2) in Form 16 if they have structured your salary accordingly, but 80CCD(1B) voluntary contributions almost always need to be claimed manually.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                  {[
                    { num: '1', title: 'Download your NPS statement:', text: 'Log in to your NPS account on the NSDL or CAMS portal. Download the annual contribution statement showing total contributions in each financial year.' },
                    { num: '2', title: 'Check Form 16:', text: 'If your employer contributes to NPS, verify that 80CCD(2) appears in Part B of your Form 16. If missing, report the correct amount in your ITR regardless.' },
                    { num: '3', title: 'Fill deductions in ITR:', text: 'In ITR-1 or ITR-2, navigate to "Deductions under Chapter VI-A." Enter 80CCD(1) under Section 80C, then separately enter 80CCD(1B) and 80CCD(2) in their respective fields.' },
                    { num: '4', title: 'Keep documentation:', text: 'Retain your PRAN statement, contribution receipts, and Form 16 for 6 years. CBDT may seek documentation during scrutiny assessment.' },
                  ].map(({ num, title, text }) => (
                    <div key={num} style={{ display: 'flex', gap: 12 }}>
                      <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#E9ECEE', border: '1px solid #D3D7DA', color: '#101214', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{num}</div>
                      <p style={{ fontSize: 14.5, color: C.ink2, lineHeight: 1.7, margin: 0 }}>
                        <strong style={{ color: C.ink }}>{title}</strong> {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={sec}>
                <h2 style={h2} id="how-to-use">How to Use This Calculator</h2>
                <p style={p}>
                  Select your tax regime and employment type, then enter your annual gross income and basic salary. Basic salary sets the percentage limits for 80CCD(1) and 80CCD(2).
                </p>
                <p style={p}>
                  In the old regime, add your own contribution and the 80CCD(1B) amount. Salaried users also enter the employer's annual NPS contribution.
                </p>
                <p style={p}>
                  The result panel shows each deduction section separately, your total NPS deduction, and the total tax saved. The donut chart shows NPS tax savings as a percentage of what you would have paid without any NPS contribution. For new regime users, only 80CCD(2) appears in the calculation since the other sections are not available.
                </p>
              </div>

              

              <div style={sec}>
                <h2 style={h2} id="faq">Frequently Asked Questions</h2>
                <FAQ />
              </div>

              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 8 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong style={{ fontWeight: 600 }}>Disclaimer:</strong> All calculations are indicative only and NPS rules, slabs and limits change with each Union Budget. Consult a qualified Chartered Accountant for personalised advice.
                </p>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <style>{`
            .nps-tb-sidebar::-webkit-scrollbar { width: 5px; }
            .nps-tb-sidebar::-webkit-scrollbar-track { background: transparent; }
            .nps-tb-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
            .nps-tb-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
          `}</style>
          <aside className="nps-tb-sidebar" aria-label="Related calculators and tools"
            style={{ display: 'flex', flexDirection: 'column', gap: 16, overflowY: mobile ? 'visible' : 'auto', position: mobile ? 'static' : 'sticky', top: 24, maxHeight: mobile ? 'none' : 'calc(100vh - 100px)', paddingRight: mobile ? 0 : 2, scrollbarWidth: 'thin', scrollbarColor: '#C4C9C4 transparent' } as React.CSSProperties}>
            <div style={{ flexShrink: 0 }}><SidebarList title="Tax Calculators" items={POPULAR} /></div>
            <div style={{ flexShrink: 0 }}><SidebarList title="More Tools" items={MORE} /></div>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <SiteFooter columns={pipeColumns([
        { hd: 'Calculators', links: ['/calculators/nps-calculator|NPS Calculator', '/calculators/section-80c-calculator|Section 80C', '/calculators/section-80d-calculator|Section 80D', '/calculators/income-tax-calculator|Income Tax', '/calculators/ppf-calculator|PPF', '/calculators/epf-calculator|EPF'] },
        { hd: 'Topics', links: ['/calculators/nps-calculator|NPS', '/calculators/old-tax-regime-calculator|Tax Planning', '/calculators/retirement-calculator|Retirement', '/calculators/sip-calculator|Investments'] },
        { hd: 'Company', links: ['/about|About', '/privacy|Privacy Policy', '/terms|Terms of Use', '/contact|Contact'] },
      ])} legalNote="Results are indicative. Not financial advice." />
    </div>
  );
}

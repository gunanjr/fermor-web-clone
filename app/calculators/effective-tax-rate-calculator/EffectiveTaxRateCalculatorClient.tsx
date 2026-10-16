'use client';

import { CHART_PAIR } from '../../../src/theme/chartPalette';
import { useState, useMemo, useEffect } from 'react';
import { useCalculatorSettings } from '../../../src/hooks/useCalculatorSettings';
import { SaveResultsCard } from '../../../src/components/common/SaveResultsCard';
import Link from 'next/link';
import { useCurrency } from '../../../src/hooks/useCurrency';
import { CurrencySelector } from '../../../src/components/common/CurrencySelector';
import { SiteFooter } from '../../../src/components/common/SiteFooter';
import { PageNav } from '../../../src/components/common/PageNav';
import { DISCOVERY_COLUMNS } from '../../../src/components/common/footerLinks';
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
const POPPINS = 'var(--font-poppins), Poppins, sans-serif';

interface Slab { min: number; max: number; rate: number; label: string }

const NEW_SLABS: Slab[] = [
  { min: 0,       max: 400000,   rate: 0,    label: 'Up to ₹4L' },
  { min: 400000,  max: 800000,   rate: 0.05, label: '₹4L - ₹8L' },
  { min: 800000,  max: 1200000,  rate: 0.10, label: '₹8L - ₹12L' },
  { min: 1200000, max: 1600000,  rate: 0.15, label: '₹12L - ₹16L' },
  { min: 1600000, max: 2000000,  rate: 0.20, label: '₹16L - ₹20L' },
  { min: 2000000, max: 2400000,  rate: 0.25, label: '₹20L - ₹24L' },
  { min: 2400000, max: Infinity, rate: 0.30, label: 'Above ₹24L' },
];

const OLD_SLABS: Record<string, Slab[]> = {
  below60: [
    { min: 0,       max: 250000,   rate: 0,    label: 'Up to ₹2.5L' },
    { min: 250000,  max: 500000,   rate: 0.05, label: '₹2.5L - ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
  senior: [
    { min: 0,       max: 300000,   rate: 0,    label: 'Up to ₹3L' },
    { min: 300000,  max: 500000,   rate: 0.05, label: '₹3L - ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
  superSenior: [
    { min: 0,       max: 500000,   rate: 0,    label: 'Up to ₹5L' },
    { min: 500000,  max: 1000000,  rate: 0.20, label: '₹5L - ₹10L' },
    { min: 1000000, max: Infinity, rate: 0.30, label: 'Above ₹10L' },
  ],
};

function slabTaxCalc(income: number, slabs: Slab[]): number {
  let tax = 0;
  for (const s of slabs) {
    if (income <= s.min) break;
    const taxable = Math.min(income, s.max) - s.min;
    tax += taxable * s.rate;
  }
  return tax;
}

function getSurcharge(tax: number, income: number, isNew: boolean): number {
  if (income > 50000000) return tax * (isNew ? 0.25 : 0.37);
  if (income > 20000000) return tax * 0.25;
  if (income > 10000000) return tax * 0.15;
  if (income > 5000000)  return tax * 0.10;
  return 0;
}

/* ─── Slider Component ────────────────────────────────────────── */
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

/* ─── Donut Chart Component ──────────────────────────────────── */
function DonutChart({ takeHome, taxPaid }: { takeHome: number; taxPaid: number }) {
  const total = takeHome + taxPaid;
  if (total === 0) return null;
  const R = 80, sw = 20, cx = 106, cy = 106;
  const circ = 2 * Math.PI * R;
  const payPct = (takeHome / total) * 100;
  const taxPct = (taxPaid / total) * 100;
  const payArc = (takeHome / total) * circ;
  const taxArc = circ - payArc;

  return (
    <svg role="img" aria-label={`Income split: ${payPct.toFixed(1)}% take-home, ${taxPct.toFixed(1)}% tax paid`} width="212" height="212" viewBox="0 0 212 212" style={{ display: 'block' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#fafafa" strokeWidth={sw} />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.primary} strokeWidth={sw}
        strokeDasharray={`${payArc} ${circ}`} strokeDashoffset={0} transform="rotate(-90 106 106)" />
      {taxPaid > 0 && (
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={CHART_PAIR.secondary} strokeWidth={sw}
          strokeDasharray={`${taxArc} ${circ}`} strokeDashoffset={-payArc} transform="rotate(-90 106 106)" />
      )}
      <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: 19, fontWeight: 800, fill: C.ink, fontFamily: INTER }}>
        {taxPct.toFixed(1)}%
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" style={{ fontSize: 10, color: C.ink3, fill: C.ink3, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: INTER }}>
        Effective Tax
      </text>
    </svg>
  );
}

const defaultSettings = {
  grossIncome: 1500000,
  deductions: 200000,
  regime: 'new',
  age: 'below60',
};

const POPULAR = [
  { href: '/calculators/income-tax-calculator', label: 'Income Tax Calculator' },
  { href: '/calculators/old-vs-new-tax-regime-calculator', label: 'Old vs New Tax Regime' },
  { href: '/calculators/surcharge-calculator', label: 'Income Tax Surcharge' },
  { href: '/calculators/tds-calculator', label: 'TDS Calculator' },
  { href: '/calculators/capital-gains-calculator', label: 'Capital Gains Tax Calculator' },
  { href: '/calculators/tax-saving-calculator', label: 'Tax Saving Calculator' },
];

const MORE = [
  { href: '/calculators/professional-tax-calculator', label: 'Professional Tax Calculator' },
  { href: '/calculators/dividend-tax-calculator', label: 'Dividend Tax Calculator' },
  { href: '/calculators/hra-calculator', label: 'HRA Calculator' },
  { href: '/calculators/section-80c-calculator', label: 'Section 80C Calculator' },
  { href: '/calculators/section-80d-calculator', label: 'Section 80D Calculator' },
];

export default function EffectiveTaxRateCalculatorClient() {
  const { settings, updateSettings, isLoaded } = useCalculatorSettings('effective-tax-rate-calculator', defaultSettings);
  const { formatCurrency, convertCurrency, selectedCurrency } = useCurrency();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { grossIncome, deductions, regime, age } = settings;

  const setGrossIncome = (v: number) => updateSettings({ grossIncome: v });
  const setDeductions = (v: number) => updateSettings({ deductions: v });
  const setRegime = (v: string) => updateSettings({ regime: v });
  const setAge = (v: string) => updateSettings({ age: v });

  // Calculations
  const results = useMemo(() => {
    const isNew = regime === 'new';
    const slabs = isNew ? NEW_SLABS : (OLD_SLABS[age] ?? OLD_SLABS.below60);
    
    // Slabs and deduction logic
    const stdDed = isNew ? 75000 : 50000;
    const taxableIncome = Math.max(0, grossIncome - stdDed - (isNew ? 0 : deductions));
    
    const baseSlabTax = slabTaxCalc(taxableIncome, slabs);
    
    // Rebate under 87A
    let rebate = 0;
    if (isNew) {
      rebate = baseSlabTax <= 60000 ? baseSlabTax : 0;
    } else {
      rebate = taxableIncome <= 500000 ? baseSlabTax : 0;
    }

    const taxAfterRebate = Math.max(0, baseSlabTax - rebate);
    const surcharge = getSurcharge(taxAfterRebate, taxableIncome, isNew);
    const cess = (taxAfterRebate + surcharge) * 0.04;
    const totalTax = Math.round(taxAfterRebate + surcharge + cess);
    const netTakeHome = Math.max(0, grossIncome - totalTax);
    
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

    // Marginal tax rate finding
    let marginalRate = 0;
    for (const s of slabs) {
      if (taxableIncome > s.min) {
        marginalRate = s.rate * 100;
      }
    }

    return {
      taxableIncome,
      baseSlabTax,
      rebate,
      surcharge,
      cess,
      totalTax,
      netTakeHome,
      effectiveRate,
      marginalRate,
    };
  }, [grossIncome, deductions, regime, age]);

  // Currency Formatter
  const currencyCode = selectedCurrency?.code || 'INR';
  const fmtC = (val: number) => formatCurrency(val);
  const fmtIN = (val: number) => {
    if (currencyCode !== 'INR') return fmtC(val);
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} Lakh`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const h2s = { fontSize: mobile ? 18 : 22, fontWeight: 700, color: C.ink, margin: '32px 0 16px', fontFamily: POPPINS, scrollMarginTop: 80 };
  const p = { fontSize: 15, color: C.ink2, lineHeight: 1.7, margin: '0 0 16px' };
  const tableS = { width: '100%', borderCollapse: 'collapse' as const, fontSize: 13, marginBottom: 24, fontFamily: INTER };
  const thS = { padding: '9px 14px', fontSize: 11.5, fontWeight: 700, color: C.ink, background: '#f4f5f6', textAlign: 'left' as const, textTransform: 'uppercase' as const, letterSpacing: '0.05em', border: `1px solid ${C.border}`, whiteSpace: 'nowrap' as const };
  const tdL = { padding: '10px 14px', fontSize: 13.5, color: C.ink2, border: `1px solid ${C.border}`, verticalAlign: 'top' as const } as React.CSSProperties;
  const tdR = { padding: '10px 14px', fontSize: 13.5, color: C.ink, fontWeight: 500, border: `1px solid ${C.border}`, verticalAlign: 'top' as const, textAlign: 'right' as const } as React.CSSProperties;

  if (!isLoaded) return null;

  return (
    <div style={{ fontFamily: INTER, background: C.bg, minHeight: '100vh' }}>
      <PageNav />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: mobile ? '20px 16px 60px' : '32px 28px 80px' }}>
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: mobile ? 26 : 34, fontWeight: 800, color: C.ink, margin: '0 0 6px', letterSpacing: '-0.025em' }}>Effective Tax Rate Calculator</h1>
          <p className="article-lead" style={{ fontSize: 14.5, color: C.ink3, margin: 0, maxWidth: mobile ? '100%' : 800 }}>
            Check your true average tax rate compared to your marginal tax slab under the old and new regimes.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 340px', gap: 24, alignItems: 'start' }}>
          <div style={{ minWidth: 0 }}>
            {/* ── CALCULATOR CARD ── */}
            <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 24px rgba(16,18,20,0.07)', marginBottom: 36 }}>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr' }}>
                {/* Inputs */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', borderRight: mobile ? 'none' : `1px solid ${C.border}`, borderBottom: mobile ? `1px solid ${C.border}` : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: C.ink3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>Income & Tax Profile</p>
                    <CurrencySelector theme="light" />
                  </div>

                  {/* Regime Toggle */}
                  <div style={{ marginBottom: 24 }}>
                    <label id="regime-label" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Tax Regime</label>
                    <div role="group" aria-labelledby="regime-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {(['new', 'old'] as const).map(r => (
                        <button key={r} onClick={() => setRegime(r)} aria-pressed={regime === r}
                          style={{ flex: 1, padding: '9px 10px', border: 'none', background: regime === r ? C.white : 'transparent',
                            color: regime === r ? C.ink : C.ink3, fontWeight: regime === r ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 13, transition: 'all 0.15s' }}>
                          {r === 'new' ? 'New Regime (FY 2026-27)' : 'Old Regime'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Slider id="income" label="Gross Annual Income" value={grossIncome} min={100000} max={50000000} step={10000}
                    fmt={fmtIN} onChange={setGrossIncome} compact />

                  {regime === 'old' && (
                    <Slider id="deductions" label="Total Deductions (80C, 80D, HRA etc.)" value={deductions} min={0} max={1500000} step={5000}
                      fmt={fmtIN} onChange={setDeductions} compact />
                  )}

                  {/* Age Group Selector */}
                  <div style={{ marginBottom: 18 }}>
                    <label id="age-label" style={{ display: 'block', fontSize: 13.5, color: C.ink2, fontWeight: 500, marginBottom: 8 }}>Age Group</label>
                    <div role="group" aria-labelledby="age-label" style={{ display: 'flex', border: `1px solid ${C.border}`, borderRadius: 8, overflow: 'hidden' }}>
                      {[
                        { key: 'below60', label: '< 60 Years' },
                        { key: 'senior', label: '60 - 80 Years' },
                        { key: 'superSenior', label: '80+ Years' },
                      ].map(g => (
                        <button key={g.key} onClick={() => setAge(g.key)} aria-pressed={age === g.key}
                          style={{ flex: 1, padding: '9px 6px', border: 'none', background: age === g.key ? C.white : 'transparent',
                            color: age === g.key ? C.ink : C.ink3, fontWeight: age === g.key ? 600 : 400,
                            cursor: 'pointer', fontFamily: INTER, fontSize: 12.5, transition: 'all 0.15s' }}>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Results Panel */}
                <div style={{ padding: mobile ? '20px 18px' : '40px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ order: mobile ? 1 : -1, marginBottom: 24 }}>
                    <DonutChart takeHome={results.netTakeHome} taxPaid={results.totalTax} />
                  </div>
                  <div style={{ order: mobile ? 2 : -1, display: 'flex', gap: 20, marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.primary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Take-Home Pay</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <div style={{ width: 11, height: 11, borderRadius: 3, background: CHART_PAIR.secondary }} aria-hidden="true" />
                      <span style={{ fontSize: 13, color: C.ink2 }}>Tax Paid</span>
                    </div>
                  </div>

                  {/* Primary result: Effective Tax Rate */}
                  <div style={{ width: '100%', background: '#F4F5F6', border: '1px solid #E3E6E8', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: '#50565C' }}>Effective Tax Rate</span>
                    </div>
                    <span aria-live="polite" aria-label={`Effective Tax Rate: ${results.effectiveRate.toFixed(2)}%`} style={{ fontSize: 24, fontWeight: 800, color: '#1F7A58', letterSpacing: '-0.02em' }}>
                      {results.effectiveRate.toFixed(2)}%
                    </span>
                  </div>

                  {/* Breakdown details */}
                  {[
                    { label: 'Gross Annual Income', value: fmtC(grossIncome) },
                    { label: 'Taxable Income', value: fmtC(results.taxableIncome) },
                    { label: 'Basic Slab Tax', value: fmtC(results.baseSlabTax) },
                    { label: 'Section 87A Rebate', value: fmtC(results.rebate), highlight: results.rebate > 0 },
                    { label: 'Surcharge Amount', value: fmtC(results.surcharge) },
                    { label: 'Health & Education Cess', value: fmtC(results.cess) },
                    { label: 'Total Tax Liability', value: fmtC(results.totalTax) },
                    { label: 'Marginal Slab Rate', value: `${results.marginalRate.toFixed(0)}%` },
                    { label: 'Net Take-Home Pay', value: fmtC(results.netTakeHome) },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: `1px solid ${C.border}`, width: '100%' }}>
                      <span style={{ fontSize: 13.5, color: C.ink2 }}>{label}</span>
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: highlight ? C.lime2 : C.ink }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist and CTA Area */}
            <SaveResultsCard mobile={mobile} />


            {/* ── ARTICLE PROSE ── */}
            <article itemScope itemType="https://schema.org/Article" style={{ fontFamily: INTER }}>
              
              <h2 id="what-is-effective-rate" style={h2s}>What Is the Effective Tax Rate?</h2>
              <div style={{ borderLeft: `3px solid ${C.lime2}`, paddingLeft: 16, marginBottom: 16 }}>
                <p style={{ fontSize: 15.5, fontWeight: 600, color: C.ink, lineHeight: 1.7, margin: 0 }}>
                  The Effective Tax Rate is the actual average percentage of your total gross income that you pay in income taxes. It is calculated by dividing your total annual tax liability by your gross annual income.
                </p>
              </div>
              <p style={p}>
                This rate gives a realistic picture of your tax burden. Many taxpayers confuse their marginal tax slab (such as 30%) with their true tax rate. In reality, due to progressive tax slabs, standard deductions, and tax rebates, the average rate paid on your total income is usually much lower.
              </p>
              <p style={p}>
                For instance, under the new regime in India, even if your salary falls in the 15% marginal slab bracket, your effective tax rate could be less than 5% because the first Rs 7.75 lakh (including the standard deduction) has a zero tax liability.
              </p>

              <h2 id="effective-vs-marginal" style={h2s}>Effective Tax Rate vs Marginal Tax Rate</h2>
              <p style={p}>
                Understanding the difference between these two rates is essential for smart tax planning:
              </p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Marginal Tax Rate:</strong> the tax rate applied to the last rupee of your income. For example, if you earn Rs 25 lakh, your marginal tax slab rate is 30% under both regimes.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Effective Tax Rate:</strong> the overall average rate. For the same Rs 25 lakh income under the new regime, your total tax liability is around Rs 3.9 lakh, making your effective tax rate only 15.6%.
                </li>
              </ul>

              <h2 id="calculation-formula" style={h2s}>Effective Tax Rate Formula</h2>
              <p style={p}>
                The mathematical formula to compute the effective tax rate is:
              </p>
              <div style={{ background: '#fafafa', padding: '16px 20px', borderRadius: 8, border: `1px solid ${C.border}`, fontFamily: 'Courier, monospace', fontSize: 13.5, color: C.ink, marginBottom: 16 }}>
                Effective Tax Rate (%) = (Total Tax Paid / Gross Annual Income) * 100
              </div>
              <p style={p}>
                Total tax paid must include the basic slab tax, any applicable surcharge, and the 4% health and education cess.
              </p>

              <h2 id="worked-example" style={h2s}>Worked Calculation Example: Rs 15 Lakh Salary</h2>
              <p style={p}>
                Let us look at a worked example for an income of Rs 15,00,000 under the New Regime:
              </p>
              <table style={tableS}>
                <caption>Step-by-Step Calculation of Effective Tax Rate</caption>
                <thead>
                  <tr>
                    <th style={thS} scope="col">Step</th>
                    <th style={thS} scope="col">New Regime Value (Rs)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdL}>Gross Salary Income</td>
                    <td style={tdR}>15,00,000</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Standard Deduction</td>
                    <td style={tdR}>75,000</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Taxable Net Income (Rs 15L minus Rs 75,000)</td>
                    <td style={tdR}>14,25,000</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Basic Slab Tax</td>
                    <td style={tdR}>93,750</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Section 87A Rebate</td>
                    <td style={tdR}>0</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Health & Education Cess (4%)</td>
                    <td style={tdR}>3,750</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Total Tax Liability (Tax + Cess)</td>
                    <td style={tdR}>97,500</td>
                  </tr>
                  <tr>
                    <td style={tdL}>Effective Tax Rate (Rs 97,500 / Rs 15L * 100)</td>
                    <td style={tdR}>6.50%</td>
                  </tr>
                </tbody>
              </table>

              <h2 id="regime-comparison" style={h2s}>Effective Tax Rates: New vs Old Regime</h2>
              <p style={p}>
                The new tax regime generally offers a lower effective tax rate for individuals who do not invest heavily in tax-saving instruments. However, if you claim significant tax breaks (like Section 24(b) home loan interest, HRA, and Section 80C), the old tax regime might yield a lower effective tax rate.
              </p>
              <p style={p}>
                You can run a complete comparative analysis using our <Link href="/calculators/old-vs-new-tax-regime-calculator" target="_blank" rel="noopener noreferrer">Old vs New Tax Regime Calculator</Link> to find the break-even point where switching regimes makes sense.
              </p>

              <h2 id="how-to-lower" style={h2s}>How to Lower Your Effective Tax Rate</h2>
              <ol style={{ margin: '0 0 16px', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Claim all exemptions:</strong> maximize allowances like HRA, LTA, and phone reimbursements.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Maximize deductions:</strong> utilize the full Rs 1.5 lakh limit under Section 80C and Rs 50,000 under Section 80CCD(1B) for NPS.
                </li>
                <li style={{ fontSize: 15, color: C.ink2, lineHeight: 1.75 }}>
                  <strong style={{ color: C.ink }}>Select correct regime:</strong> evaluate both regimes periodically as your income changes to choose the one with the lowest effective rate.
                </li>
              </ol>

              

              <h2 id="faq" style={h2s}>Frequently Asked Questions</h2>
              <FAQBox items={[
                  { q: 'Is effective tax rate different from marginal tax rate?', a: 'Yes. The marginal rate applies to the last bracket of your income, whereas the effective rate is the average rate paid on your entire gross income.' },
                  { q: 'Does standard deduction lower my effective tax rate?', a: 'Yes. The standard deduction directly reduces your taxable income, lowering your basic tax liability and thereby decreasing your effective tax rate.' },
                  { q: 'Why is my effective tax rate 0% under the new regime?', a: 'If your total taxable income is up to Rs 12 lakh, the Section 87A rebate reduces your slab tax liability to zero, yielding an effective tax rate of 0%.' },
                  { q: 'How does capital gains tax affect my effective tax rate?', a: 'Capital gains are taxed at special flat rates (such as 12.5% or 20%), which are blended with your regular slab tax to calculate your final combined effective tax rate.' },
                  { q: 'Can non-residents use this calculator?', a: 'Yes. NRIs can use it, though they should select their appropriate residency status as tax rebates under Section 87A are not available to non-resident taxpayers.' },
                  { q: 'Is surcharge included in the effective tax rate?', a: 'Yes, surcharge and cess are real tax liabilities and are included in the total tax paid to determine the effective rate.' },
                  { q: 'What is a good effective tax rate for individual taxpayers?', a: 'A lower rate is always better. For salaries up to Rs 15 lakh, an effective tax rate below 10% is typical. For salaries above Rs 50 lakh, the rate rises towards 25% due to surcharge.' },
                  { q: 'How does employer NPS contribution help?', a: 'Employer contributions under Section 80CCD(2) are deductible up to 14% of salary under the new regime, which lowers taxable income and reduces your effective tax rate.' },
                  { q: 'Can a home loan reduce my effective tax rate?', a: 'Yes. Under the old regime, claiming interest up to Rs 2 lakh under Section 24(b) reduces your taxable income, lowering your overall tax liability and effective rate.' },
                  { q: 'How often should I compute my effective tax rate?', a: 'You should compute it at the beginning of the financial year to choose the optimal tax regime, and at the end when filing returns to verify calculations.' }
              ]} />

              {/* Disclaimer */}
              <div itemProp="disclaimer" style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, marginTop: 32 }}>
                <p style={{ fontSize: 12, color: C.ink3, lineHeight: 1.65, margin: 0 }}>
                  <strong>Disclaimer:</strong> All calculations on this page are indicative only. Effective tax rate is a mathematical ratio of tax liability to gross income. Actual tax computations are subject to final ITR filing and assessment by the Income Tax Department. Consult a SEBI-registered tax advisor before planning tax structures.
                </p>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <aside className="effective-rate-sidebar" style={{
            position: 'sticky',
            top: 88,
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            scrollbarWidth: 'thin',
            scrollbarColor: '#C4C9C4 transparent',
          } as React.CSSProperties}>
            <style>{`
              .effective-rate-sidebar::-webkit-scrollbar { width: 5px; }
              .effective-rate-sidebar::-webkit-scrollbar-track { background: transparent; }
              .effective-rate-sidebar::-webkit-scrollbar-thumb { background: #C4C9C4; border-radius: 99px; }
              .effective-rate-sidebar::-webkit-scrollbar-thumb:hover { background: #9FA59F; }
            `}</style>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="Popular Calculators" items={POPULAR} />
            </div>

            <div style={{ flexShrink: 0 }}>
              <SidebarList title="More Calculators" items={MORE} />
            </div>
          </aside>

        </div>
      </div>
      <SiteFooter columns={DISCOVERY_COLUMNS} />
    </div>
  );
}

function SidebarList({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12 }}>
      <div style={{ padding: '16px 20px', borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      {items.map(({ href, label }, i) => (
        <Link key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ padding: '13px 20px', borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none', fontSize: 13.5, color: C.ink2, transition: 'all 0.12s' }}
            onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = C.paleLime; (e.currentTarget as HTMLElement).style.color = C.dark; }}
            onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = C.ink2; }}>
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
}
